/* BMH — Silent Firebase sign-in behind every HMS login (Phase 2, step 1).
 * When the HMS accepts a login, this file quietly signs the same login in to a matching Firebase account
 * (created on first use). Staff see nothing. If the Firebase sign-in fails, the HMS carries on exactly as before:
 * nothing is blocked by this file. Each browser saves a small check-in record at security/signinCheck so
 * Dr Varun's admin login can see which logins and devices have signed in (Settings → "Sign-in check").
 * One Firebase account per HMS login name (drvarun and drvarun@bawejahospital.com are separate accounts
 * because the HMS keeps a separate password for each name).
 * Does not touch billing, payments, inventory or patient search. Passwords are never written to the database.
 * Off switch (this browser): localStorage.setItem('bmh_fb_signin_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_fb_signin_off') === '1') return; } catch (e) {}
  var VER = 'v189';
  var DOMAIN = 'hms-login.bawejahospital.com';
  var PATH = 'security/signinCheck';
  var OWNER = ['drvarun', 'drvarun@bawejahospital.com'];
  var state = { email: '', pw: '', busy: false, lastTry: 0, last: null };

  function low(s) { return String(s || '').trim().toLowerCase(); }
  function me() { try { return CURRENT_USER || window.CURRENT_USER || null; } catch (e) { return window.CURRENT_USER || null; } }
  function udb() { try { return USER_DB || {}; } catch (e) { return window.USER_DB || {}; } }
  function auth() { try { return (window.firebase && typeof firebase.auth === 'function') ? firebase.auth() : null; } catch (e) { return null; } }
  function isOwnerSession() { var u = me(); return !!(u && u.isAdmin && OWNER.indexOf(low(u.username)) >= 0); }
  // Login name -> safe, collision-free key (letters and digits kept, everything else as -hex-)
  function keyOf(uname) {
    return low(uname).replace(/[^a-z0-9]/g, function (c) { return '-' + c.charCodeAt(0).toString(16) + '-'; });
  }
  function emailOf(uname) { return keyOf(uname) + '@' + DOMAIN; }
  function deviceId() {
    try {
      var d = localStorage.getItem('bmh_device_id');
      if (!d) { d = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); localStorage.setItem('bmh_device_id', d); }
      return d;
    } catch (e) { return 'nostore'; }
  }
  function deviceLabel() {
    var ua = navigator.userAgent || '';
    var os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iPhone/iPad' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'Mac' : /Linux/i.test(ua) ? 'Linux' : 'Other';
    var br = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
    return os + ' ' + br;
  }
  function reasonText(code) {
    var m = {
      'out-of-step': 'Password out of step with the Firebase account',
      'auth/weak-password': 'Password shorter than 6 characters',
      'auth/network-request-failed': 'No internet at the time',
      'auth/too-many-requests': 'Too many attempts; will retry',
      'auth/operation-not-allowed': 'Email/Password sign-in is switched off in Firebase',
      'no-password': 'No password available on this device yet (will sign in at next login)',
      'no-sdk': 'Firebase sign-in file did not load'
    };
    return m[code] || String(code || 'Unknown');
  }
  function record(uname, ok, code) {
    state.last = { login: uname, ok: ok, code: code || '' };
    try {
      if (!window.FBDB || !uname) return;
      var a = auth(); var u = a && a.currentUser;
      var prof = udb()[uname] || udb()[low(uname)] || {};
      var row = {
        login: String(uname), name: String(prof.name || (me() && me().name) || ''), centre: String((me() && me().centre) || prof.centre || ''),
        device: deviceLabel(), ok: !!ok, reason: ok ? '' : reasonText(code), uid: ok && u ? u.uid : '',
        at: new Date().toISOString(), ver: VER
      };
      window.FBDB.ref(PATH + '/' + deviceId() + '/' + keyOf(uname)).set(row).catch(function () {});
    } catch (e) {}
  }
  function ready(a) {
    return new Promise(function (res) {
      var done = false; var off = null;
      try { off = a.onAuthStateChanged(function () { if (done) return; done = true; try { if (off) off(); } catch (e) {} res(); }); } catch (e) { res(); }
      setTimeout(function () { if (!done) { done = true; res(); } }, 6000);
    });
  }
  function notFound(c) { return c === 'auth/user-not-found' || c === 'auth/invalid-credential' || c === 'auth/invalid-login-credentials' || c === 'auth/wrong-password'; }

  // Sign this HMS login in to its Firebase account. typed = password just typed at the login screen (may be '').
  // v189: Firebase refuses passwords shorter than 6 characters. For the Firebase sign-in only, a short HMS password
  // (e.g. the attendance staff starting password) is quietly lengthened in a fixed way, so staff keep typing exactly
  // what they type today. Passwords of 6+ characters are used unchanged, so existing Firebase accounts are unaffected.
  function fbPw(p) { p = String(p || ''); if (!p) return ''; return p.length >= 6 ? p : 'bmh~' + p + '~hms'; }

  function signIn(uname, typed) {
    var a = auth();
    if (!uname) return Promise.resolve();
    if (!a) { record(uname, false, 'no-sdk'); return Promise.resolve(); }
    if (state.busy) return Promise.resolve();
    state.busy = true; state.lastTry = Date.now();
    var email = emailOf(uname);
    var prof = udb()[uname] || udb()[low(uname)] || {};
    var cands = [];
    [prof.pw, typed].forEach(function (p) { p = fbPw(p); if (p && cands.indexOf(p) < 0) cands.push(p); });
    return ready(a).then(function () {
      var cur = a.currentUser;
      if (cur && low(cur.email) === email) { state.email = email; if (!state.pw && cands.length) state.pw = cands[0]; record(uname, true); return; }
      if (!cands.length) { record(uname, false, 'no-password'); return; }
      // A different login was signed in on this browser: sign it out first so identities never mix.
      var pre = cur ? a.signOut().catch(function () {}) : Promise.resolve();
      var i = 0; var lastCode = '';
      function next() {
        if (i >= cands.length) return create();
        var p = cands[i++];
        return a.signInWithEmailAndPassword(email, p).then(function () { state.email = email; state.pw = p; record(uname, true); })
          .catch(function (e) { lastCode = (e && e.code) || 'error'; if (notFound(lastCode)) return next(); record(uname, false, lastCode); });
      }
      function create() {
        var p = cands.filter(function (x) { return x.length >= 6; })[0];
        if (!p) { record(uname, false, 'auth/weak-password'); return; }
        return a.createUserWithEmailAndPassword(email, p).then(function () { state.email = email; state.pw = p; record(uname, true); })
          .catch(function (e) { var c = (e && e.code) || 'error'; record(uname, false, c === 'auth/email-already-in-use' ? 'out-of-step' : c); });
      }
      return pre.then(next);
    }).catch(function (e) { record(uname, false, (e && e.code) || 'error'); })
      .then(function () { state.busy = false; });
  }

  // Keep the Firebase password in step when this login changes its own password in this browser.
  function syncPassword() {
    var u = me(); var a = auth(); if (!u || !a || state.busy) return;
    var cur = a.currentUser; var uname = u.username; var email = emailOf(uname);
    var prof = udb()[uname] || {}; var want = fbPw(prof.pw);
    if (!cur || low(cur.email) !== email) {
      // Retry only for passing problems (no internet, not ready yet); never hammer a password that is out of step.
      var c = state.last && state.last.code;
      var passing = !state.last || state.last.ok || c === 'auth/network-request-failed' || c === 'auth/too-many-requests' || c === 'no-password' || c === 'no-sdk';
      if (passing && Date.now() - state.lastTry > 5 * 60 * 1000) signIn(uname, '');
      return;
    }
    if (!want || want.length < 6 || !state.pw || state.email !== email || want === state.pw) return;
    state.busy = true;
    var old = state.pw;
    var cred = firebase.auth.EmailAuthProvider.credential(email, old);
    cur.reauthenticateWithCredential(cred).then(function () { return cur.updatePassword(want); })
      .then(function () { state.pw = want; record(uname, true); })
      .catch(function (e) { state.pw = want; record(uname, false, 'out-of-step'); })
      .then(function () { state.busy = false; });
  }

  // Hook: run after the HMS has accepted a login (or restored a session).
  function wrap() {
    var orig = window.activateUserSession;
    if (typeof orig !== 'function' || orig.__bmhFbSignin) return;
    var w = function (user, profile, opts) {
      var out = orig.apply(this, arguments);
      try {
        var typed = ''; try { var pi = document.getElementById('lg-pass'); typed = pi ? String(pi.value || '') : ''; } catch (e) {}
        var uname = (me() && me().username) || user;
        setTimeout(function () { try { signIn(uname, typed); } catch (e) {} }, 1500);
      } catch (e) {}
      return out;
    };
    w.__bmhFbSignin = true;
    window.activateUserSession = w;
  }

  // ── Sign-in check list (Dr Varun's admin login only) ──
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  window.bmhSigninCheck = function () {
    if (!isOwnerSession() || !window.FBDB) return;
    window.FBDB.ref(PATH).once('value').then(function (snap) {
      var val = snap.val() || {}; var rows = [];
      Object.keys(val).forEach(function (d) { Object.keys(val[d] || {}).forEach(function (k) { var r = val[d][k] || {}; r._d = d; rows.push(r); }); });
      rows.sort(function (x, y) { return String(y.at || '').localeCompare(String(x.at || '')); });
      var ok = rows.filter(function (r) { return r.ok; }).length;
      var html = '<div style="background:#fff;border-radius:10px;max-width:880px;width:94%;max-height:86vh;overflow:auto;padding:16px">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><b>Sign-in check — ' + rows.length + ' login/device pairs, ' + ok + ' signed in, ' + (rows.length - ok) + ' not</b>'
        + '<button type="button" class="btn btn-outline btn-sm" id="fbsc-close">Close</button></div>'
        + '<table style="width:100%;border-collapse:collapse;font-size:12px"><tr style="text-align:left;border-bottom:1px solid #ddd"><th>Login</th><th>Name</th><th>Centre</th><th>Device</th><th>Signed in</th><th>Reason if not</th><th>Last seen</th></tr>'
        + rows.map(function (r) {
          var t = ''; try { t = new Date(r.at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) {}
          return '<tr style="border-bottom:1px solid #f0f0f0"><td>' + esc(r.login) + '</td><td>' + esc(r.name) + '</td><td>' + esc(r.centre) + '</td><td>' + esc(r.device) + ' <span style="color:#999">' + esc(String(r._d).slice(-4)) + '</span></td><td>' + (r.ok ? '✅ Yes' : '❌ No') + '</td><td>' + esc(r.reason) + '</td><td>' + esc(t) + '</td></tr>';
        }).join('') + '</table>'
        + (rows.length ? '' : '<div style="padding:16px;color:#888;text-align:center">No check-ins yet</div>') + '</div>';
      var ov = document.getElementById('fbsc-ov'); if (ov) ov.remove();
      ov = document.createElement('div'); ov.id = 'fbsc-ov';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100001;display:flex;align-items:center;justify-content:center';
      ov.innerHTML = html; document.body.appendChild(ov);
      ov.addEventListener('click', function (e) { if (e.target === ov || e.target.id === 'fbsc-close') ov.remove(); });
    }).catch(function () { try { showToast('Could not load the sign-in check list', 'w'); } catch (e) {} });
  };
  function addButton() {
    var cur = document.getElementById('cpw-current'); if (!cur) return;
    var box = cur.closest('.card') || cur.parentNode; if (!box) return;
    var b = document.getElementById('fbsc-btn');
    if (!isOwnerSession()) { if (b) b.remove(); return; }
    if (b) return;
    b = document.createElement('button'); b.type = 'button'; b.id = 'fbsc-btn'; b.className = 'btn btn-outline btn-sm';
    b.style.marginTop = '8px'; b.style.marginLeft = '6px'; b.textContent = '🛡️ Sign-in check';
    b.onclick = function () { window.bmhSigninCheck(); };
    box.appendChild(b);
  }

  function install() { wrap(); addButton(); }
  // If a session was already restored before this file loaded, sign in for it once.
  function catchUp() { var u = me(); if (u && u.username && !state.last && !state.busy) signIn(u.username, ''); }
  window.bmhFbSigninStatus = function () { var a = auth(); return { last: state.last, signedInAs: a && a.currentUser ? a.currentUser.email : null }; };
  window.__bmhFbSigninTest = { keyOf: keyOf, emailOf: emailOf, signIn: signIn, syncPassword: syncPassword, state: state };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install); else install();
  setTimeout(catchUp, 5000);
  setInterval(function () { try { install(); syncPassword(); } catch (e) {} }, 30000);
  setInterval(function () { try { addButton(); } catch (e) {} }, 3000);
})();
