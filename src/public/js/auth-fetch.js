/* BMH — direct database reads carry the Firebase sign-in (v4.6, approved by Dr Varun 26 Nov).
 *
 * A few screens read the database by its web address instead of through the Firebase library: Bills & History
 * (transactions, saved bills, deleted bills), Practice Growth (transactions, OT cases, follow-ups, payments…) and a
 * few others. Those reads did not send the sign-in, so they would be refused once the database rules allow only
 * signed-in staff. This adds the sign-in (?auth=<token>) to every such read.
 *
 * Nothing else changes: if no one is signed in to Firebase yet, or the token can't be had within 4 s, the read
 * goes out exactly as before. Reads to any other address are untouched.
 *
 * Off switch (this browser only): localStorage.setItem('bmh_auth_fetch_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_auth_fetch_off') === '1') return; } catch (e) {}
  if (typeof window.fetch !== 'function' || window.fetch.__bmhAuth) return;
  var orig = window.fetch;
  var stats = { withToken: 0, without: 0 };

  function dbBase() {
    try { return String(window.firebase.app().options.databaseURL || '').replace(/\/$/, ''); } catch (e) { return ''; }
  }
  function isDbUrl(u) {
    var base = dbBase();
    if (base && u.indexOf(base + '/') === 0) return true;
    return /^https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.firebasedatabase\.app\//i.test(u) || /^https:\/\/[a-z0-9-]+\.firebaseio\.com\//i.test(u);
  }
  function token() {
    try {
      var u = window.firebase && firebase.auth && firebase.auth().currentUser;
      if (!u) return Promise.resolve(null);
      return Promise.race([
        u.getIdToken().catch(function () { return null; }),
        new Promise(function (r) { setTimeout(function () { r(null); }, 4000); })
      ]);
    } catch (e) { return Promise.resolve(null); }
  }

  var wrapped = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (typeof input !== 'string' || !isDbUrl(url) || /[?&]auth=/.test(url)) return orig.apply(this, arguments);
    var self = this, args = arguments;
    return token().then(function (t) {
      if (!t) { stats.without++; return orig.apply(self, args); }
      stats.withToken++;
      var u2 = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'auth=' + encodeURIComponent(t);
      return orig.call(self, u2, init);
    });
  };
  wrapped.__bmhAuth = true;
  window.fetch = wrapped;
  window.BMH_AUTH_FETCH = { stats: function () { return Object.assign({}, stats); } };
})();
