/* BMH — measure database reads made without a Firebase sign-in (v4.8, measurement only).
 *
 * Before the database rules can allow only signed-in sessions, every read the HMS makes must happen after the
 * silent Firebase sign-in. This file changes nothing; it only counts, on each computer, the reads (on / once /
 * direct web reads) and writes (shown as w:<area>) started while the browser is not signed in to Firebase, by data area and by whether an HMS
 * login was active (before login = the login screen; during login = screens that started before the silent
 * sign-in finished). Every 5 minutes it saves the counts to security/authWatch/<day>/<device>.
 *
 * Off switch (this browser only): localStorage.setItem('bmh_auth_watch_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_auth_watch_off') === '1') return; } catch (e) {}
  if (!window.firebase || !firebase.database || !firebase.database.Query || window.__bmhAuthWatch) return;
  window.__bmhAuthWatch = true;

  function dayKey() { var d = new Date(Date.now() + 5.5 * 3600e3); return d.toISOString().slice(0, 10); }
  function signedIn() { try { return !!(firebase.auth && firebase.auth().currentUser); } catch (e) { return false; } }
  function hmsUser() { var u = window.CURRENT_USER; return u && u.username ? String(u.username) : ''; }
  function rootOf(path) { var p = String(path || '').replace(/^\/+/, '').split('/')[0]; return p || '(root)'; }
  function pathOf(ref) { try { return decodeURIComponent(new URL(ref.toString()).pathname).replace(/^\/+/, ''); } catch (e) { return ''; } }
  function deviceId() { try { return localStorage.getItem('bmh_device_id') || 'nostore'; } catch (e) { return 'nostore'; } }

  var T = { day: dayKey(), pre: {}, during: {}, ok: 0 };
  function count(path) {
    if (T.day !== dayKey()) { flush(); T = { day: dayKey(), pre: {}, during: {}, ok: 0 }; }
    var r = /^w:/.test(path) ? path : rootOf(path);
    if (r === '.info' || r === 'w:.info') return;
    if (signedIn()) { T.ok++; return; }
    var bucket = hmsUser() ? T.during : T.pre;
    bucket[r] = (bucket[r] || 0) + 1;
  }

  var Q = firebase.database.Query.prototype;
  ['on', 'once'].forEach(function (m) {
    var orig = Q[m];
    Q[m] = function () { try { count(pathOf(this)); } catch (e) {} return orig.apply(this, arguments); };
  });
  var R = firebase.database.Reference.prototype;
  ['on', 'once'].forEach(function (m) {
    if (!Object.prototype.hasOwnProperty.call(R, m)) return; // already counted through Query
    var orig = R[m];
    R[m] = function () { try { count(pathOf(this)); } catch (e) {} return orig.apply(this, arguments); };
  });
  ['set', 'update', 'push', 'remove', 'transaction'].forEach(function (m) {
    var orig = R[m]; if (typeof orig !== 'function') return;
    R[m] = function () { try { count('w:' + rootOf(pathOf(this))); } catch (e) {} return orig.apply(this, arguments); };
  });
  if (typeof window.fetch === 'function') {
    var of = window.fetch;
    window.fetch = function (input) {
      try {
        var u = typeof input === 'string' ? input : (input && input.url) || '';
        if (/firebasedatabase\.app\/|firebaseio\.com\//.test(u) && !/[?&]auth=/.test(u)) count(u.replace(/^https:\/\/[^/]+\//, '').replace(/\.json.*$/, ''));
      } catch (e) {}
      return of.apply(this, arguments);
    };
  }

  function flush() {
    try {
      if (!window.FBDB) return;
      var any = Object.keys(T.pre).length || Object.keys(T.during).length || T.ok;
      if (!any) return;
      window.FBDB.ref('security/authWatch/' + T.day + '/' + deviceId()).update({
        login: hmsUser(), pre: T.pre, during: T.during, signedInReads: T.ok,
        at: new Date().toISOString(), app: (function () { try { var sc = document.querySelector('script[src*="js/legacy.js?v="]'); var m = sc && /\?v=([^"'&\s>]+)/.exec(sc.getAttribute('src')); return m ? m[1] : ''; } catch (e) { return ''; } })()
      }).catch(function () {});
    } catch (e) {}
  }
  setInterval(flush, 5 * 60e3);
  window.addEventListener('pagehide', flush);
  window.BMH_AUTH_WATCH = { totals: function () { return JSON.parse(JSON.stringify(T)); }, flush: flush };
})();
