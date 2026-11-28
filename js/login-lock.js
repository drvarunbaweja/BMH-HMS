/* BMH — admin login lock + "sign out my login on all other computers" (v213, Dr Varun 27 Nov).
 *
 * 1. Only its own password opens drvarun.
 *    Before, the login check also accepted the shared default password and the per-login default for EVERY login,
 *    and the old password written in the code. Now drvarun opens only with the password saved in Settings
 *    (userSettings, the one Dr Varun set). Other logins are unchanged.
 * 2. Sign out a login everywhere.
 *    Every signed-in page listens to a tiny value `security/signOut/<login>` (a time). When it is set, every page
 *    of that login signed in before that time is signed out and must sign in again. Settings shows the button
 *    "Sign out my login on all other computers" (admin logins): it sets that time and keeps this page signed in.
 *
 * Off switch (this browser only): localStorage.setItem('bmh_login_lock_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_login_lock_off') === '1') return; } catch (e) {}
  if (window.__bmhLoginLock) return;
  window.__bmhLoginLock = true;

  var STRICT = ['drvarun']; // logins that open only with their own saved password
  // v4.4 (Dr Varun 28 Nov): other Dr Varun logins open only with the drvarun password
  var ALIAS = { 'drvarun@bawejahospital.com': 'drvarun' };
  // pages of these logins that were signed in before v4.4 (no mark) are signed out when they load it — staff were
  // using them with the shared default; a sign-in with the drvarun password from v4.4 on carries the mark
  var MARK = 'bmh_session_lock216';
  var SKEY = 'bmh_session_at';
  var stats = { strictChecks: 0, strictRejects: 0, signedOut: 0 };

  function db() { return window.FBDB || null; }
  function keyOf(u) { return String(u || '').trim().toLowerCase().replace(/[.#$\[\]\/]/g, '_'); }
  function uname() { var u = window.CURRENT_USER; return u && (u.username || '') ? String(u.username).toLowerCase() : ''; }
  var OFFSET = 0;
  function serverNow() { return Date.now() + OFFSET; }

  // ── 1. strict password ──
  function wrapPasswordCheck() {
    var orig = window.isAcceptedLoginPassword;
    if (typeof orig !== 'function' || orig.__bmhStrict) return false;
    var w = function (user, profile, pass) {
      var u = String(user || '').trim().toLowerCase();
      if (ALIAS[u]) {
        stats.strictChecks++;
        var udb = null; try { udb = (typeof USER_DB !== 'undefined') ? USER_DB : window.USER_DB; } catch (e) { udb = window.USER_DB; }
        var tp = udb && udb[ALIAS[u]];
        var okA = !!(tp && tp.pwChangedAt && typeof tp.pw === 'string' && tp.pw !== '' && pass === tp.pw);
        if (!okA) stats.strictRejects++;
        return okA;
      }
      if (STRICT.indexOf(u) < 0) return orig.apply(this, arguments);
      stats.strictChecks++;
      // only the password saved from Settings (it carries pwChangedAt); never a default, never the old built-in one
      var ok = !!(profile && profile.pwChangedAt && typeof profile.pw === 'string' && profile.pw !== '' && pass === profile.pw);
      if (!ok) stats.strictRejects++;
      return ok;
    };
    w.__bmhStrict = true;
    window.isAcceptedLoginPassword = w;
    return true;
  }

  // ── 2a. when was this page signed in (by typing the password) ──
  function wrapLogin() {
    var orig = window.loginUser;
    if (typeof orig !== 'function' || orig.__bmhLock) return false;
    var w = function () {
      var t0 = serverNow(), before = uname();
      // note the sign-in time before signing in, so a sign-out set earlier can never catch this new sign-in
      if (!before) { try { sessionStorage.setItem(SKEY, String(t0)); sessionStorage.setItem(MARK, '1'); } catch (e) {} }
      var r = orig.apply(this, arguments);
      var n = 0, iv = setInterval(function () {
        n++;
        var now = uname();
        if (now && (now !== before || n === 1 && !before)) { try { sessionStorage.setItem(SKEY, String(t0)); } catch (e) {} listen(); clearInterval(iv); }
        else if (n > 60) clearInterval(iv);
      }, 500);
      return r;
    };
    w.__bmhLock = true;
    window.loginUser = w;
    return true;
  }
  function hasMark() { try { return sessionStorage.getItem(MARK) === '1'; } catch (e) { return false; } }
  function sessionAt() { try { return Number(sessionStorage.getItem(SKEY) || 0) || 0; } catch (e) { return 0; } }

  // ── 2b. listen for "sign out everywhere" for the current login ──
  var listening = '', ref = null, cb = null;
  function listen() {
    var u = uname();
    if (u === listening) return;
    if (ref && cb) { try { ref.off('value', cb); } catch (e) {} }
    ref = null; cb = null; listening = u;
    if (!u || !db()) return;
    ref = db().ref('security/signOut/' + keyOf(u));
    cb = function (s) {
      var t = Number(s && s.val ? s.val() : 0) || 0;
      if (uname() !== u) return;
      if (ALIAS[u] && !hasMark()) { signOutHere(); return; }
      if (!t) return;
      if (t > sessionAt()) signOutHere();
    };
    ref.on('value', cb, function () {});
  }
  function signOutHere() {
    stats.signedOut++;
    try { sessionStorage.removeItem(SKEY); sessionStorage.removeItem(MARK); } catch (e) {}
    try { if (typeof window.logoutUser === 'function') window.logoutUser(); } catch (e) { console.warn('[login-lock] sign out', e); }
    listening = '';
    setTimeout(function () {
      try { if (typeof window.showLoginErr === 'function') window.showLoginErr('This login was signed out on all computers by the administrator. Please sign in again.'); } catch (e) {}
    }, 300);
  }

  // ── 2c. the button in Settings ──
  function signOutOthers(btn) {
    var u = uname(); if (!u || !db()) return;
    if (btn) { btn.disabled = true; btn.textContent = 'Signing out other computers…'; }
    // keep this page signed in: its time is set just after the new sign-out time
    try { sessionStorage.setItem(SKEY, String(serverNow() + 60000)); } catch (e) {}
    var r = db().ref('security/signOut/' + keyOf(u));
    // the button also signs out the other logins that open with this login's password
    Object.keys(ALIAS).forEach(function (a) { if (ALIAS[a] === u) { try { db().ref('security/signOut/' + keyOf(a)).set(firebase.database.ServerValue.TIMESTAMP); } catch (e) {} } });
    r.set(firebase.database.ServerValue.TIMESTAMP).then(function () {
      return r.once('value');
    }).then(function (s) {
      var t = Number(s.val()) || serverNow();
      try { sessionStorage.setItem(SKEY, String(t + 1)); } catch (e) {}
      if (typeof window.showToast === 'function') window.showToast('✅ Signed out ' + u + ' on all other computers. They need the password to sign in again.', 's');
      if (btn) { btn.textContent = 'Done — other computers signed out'; }
      try { if (typeof window.fbPush === 'function') window.fbPush('auditLog', { user: (window.CURRENT_USER || {}).name || u, action: 'SIGN_OUT_OTHER_COMPUTERS', login: u, timestamp: new Date().toISOString() }); } catch (e) {}
    }).catch(function (e) {
      console.warn('[login-lock]', e);
      if (typeof window.showToast === 'function') window.showToast('Could not sign out other computers — check the internet and try again.', 'e');
      if (btn) { btn.disabled = false; btn.textContent = 'Sign out my login on all other computers'; }
    });
  }
  function addButton() {
    var u = window.CURRENT_USER;
    if (!u || !u.isAdmin) return;
    var anchor = document.getElementById('cpw-confirm');
    if (!anchor || document.getElementById('bmh-signout-others')) return;
    var box = anchor.closest('.card') || anchor.parentNode;
    if (!box) return;
    var wrap = document.createElement('div');
    wrap.style.cssText = 'margin-top:14px;padding-top:12px;border-top:1px solid var(--g3,#ddd)';
    wrap.innerHTML = '<div style="font-size:12px;color:var(--g1,#666);margin-bottom:6px">Signed in on a computer you don\'t use? This signs your login out everywhere except here. They will need your password to sign in again.</div>';
    var b = document.createElement('button');
    b.id = 'bmh-signout-others'; b.type = 'button'; b.className = 'btn btn-o';
    b.textContent = 'Sign out my login on all other computers';
    b.addEventListener('click', function () { signOutOthers(b); });
    wrap.appendChild(b);
    box.appendChild(wrap);
  }

  function boot() {
    try {
      if (db()) db().ref('.info/serverTimeOffset').on('value', function (s) { OFFSET = Number(s.val()) || 0; });
    } catch (e) {}
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var a = wrapPasswordCheck(), b = wrapLogin();
      if ((window.isAcceptedLoginPassword && window.isAcceptedLoginPassword.__bmhStrict && window.loginUser && window.loginUser.__bmhLock) || tries > 120) clearInterval(iv);
    }, 250);
    wrapPasswordCheck(); wrapLogin();
    setInterval(function () { listen(); addButton(); }, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

  window.BMH_LOGIN_LOCK = { stats: function () { return Object.assign({ listening: listening, sessionAt: sessionAt() }, stats); } };
})();
