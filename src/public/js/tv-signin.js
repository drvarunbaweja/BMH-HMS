/* BMH — Queue TV sign-in (v190). Lets each queue display TV sign in once with the TV login, so the TVs keep
 * working after the database rules are tightened to signed-in users only.
 *  • Today the TVs work exactly as before: nothing is required. A small "TV sign-in" button sits in the bottom
 *    corner until the TV is signed in; after that only a small green dot shows. Clicking the dot shows who is
 *    signed in and lets you change the TV password or sign out.
 *  • The TV login is "tv". The first time anyone signs in with "tv", the TV account is created with the password
 *    typed (Dr Varun: 123456). No password is kept in the code or the database; Firebase keeps it.
 *  • The TV stays signed in after restarts (the browser remembers it).
 *  • When the rules are tightened, REQUIRED below is switched on so an unsigned TV shows the sign-in box by itself.
 * Off switch (this TV's browser): localStorage.setItem('bmh_tv_signin_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_tv_signin_off') === '1') return; } catch (e) {}
  var VER = 'v190';
  var REQUIRED = false;
  var DOMAIN = 'hms-login.bawejahospital.com';
  var TV_LOGIN = 'tv';

  function low(s) { return String(s || '').trim().toLowerCase(); }
  function keyOf(u) { return low(u).replace(/[^a-z0-9]/g, function (c) { return '-' + c.charCodeAt(0).toString(16) + '-'; }); }
  function emailOf(u) { return keyOf(u) + '@' + DOMAIN; }
  function fbPw(p) { p = String(p || ''); if (!p) return ''; return p.length >= 6 ? p : 'bmh~' + p + '~hms'; }
  function nameOf(email) { var k = String(email || '').split('@')[0]; return k.replace(/-([0-9a-f]+)-/g, function (m, h) { return String.fromCharCode(parseInt(h, 16)); }); }
  function auth() { try { return (window.firebase && firebase.apps && firebase.apps.length && firebase.auth) ? firebase.auth() : null; } catch (e) { return null; } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var ui = null;
  function badge(user) {
    if (!ui) {
      ui = document.createElement('button'); ui.type = 'button'; ui.id = 'tvs-badge';
      ui.style.cssText = 'position:fixed;right:10px;bottom:10px;z-index:2147483000;border:0;border-radius:16px;cursor:pointer;font:600 12px Segoe UI,Arial,sans-serif;opacity:.75';
      ui.onclick = function () { openBox(); };
      document.body.appendChild(ui);
    }
    if (user) { ui.textContent = ''; ui.title = 'Signed in as ' + nameOf(user.email); ui.style.width = '12px'; ui.style.height = '12px'; ui.style.padding = '0'; ui.style.background = '#22c55e'; }
    else { ui.textContent = '🔒 TV sign-in'; ui.title = ''; ui.style.width = ''; ui.style.height = ''; ui.style.padding = '6px 12px'; ui.style.background = 'rgba(255,255,255,.85)'; ui.style.color = '#0b1a2e'; }
  }

  function closeBox() { var b = document.getElementById('tvs-box'); if (b) b.remove(); }
  function openBox(force) {
    closeBox();
    var a = auth(); var u = a && a.currentUser;
    var box = document.createElement('div'); box.id = 'tvs-box';
    box.style.cssText = 'position:fixed;inset:0;z-index:2147483001;background:rgba(2,8,20,.78);display:flex;align-items:center;justify-content:center;font-family:Segoe UI,Arial,sans-serif';
    var inner = u
      ? '<div style="font-size:20px;font-weight:800;margin-bottom:6px">TV signed in</div><div style="margin-bottom:14px;color:#334">Login: <b>' + esc(nameOf(u.email)) + '</b></div>' +
        '<div style="font-weight:700;margin:8px 0 4px">Change TV password</div>' +
        '<input id="tvs-old" type="password" placeholder="Current password" style="width:100%;padding:10px;margin-bottom:8px;font-size:16px;box-sizing:border-box">' +
        '<input id="tvs-new" type="password" placeholder="New password (6+ characters)" style="width:100%;padding:10px;margin-bottom:8px;font-size:16px;box-sizing:border-box">' +
        '<div id="tvs-msg" style="min-height:20px;color:#b91c1c;margin-bottom:8px"></div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap"><button id="tvs-chg" type="button" style="flex:1;padding:10px;font-size:15px;font-weight:700">Change password</button>' +
        '<button id="tvs-out" type="button" style="padding:10px;font-size:15px">Sign out</button><button id="tvs-x" type="button" style="padding:10px;font-size:15px">Close</button></div>'
      : '<div style="font-size:20px;font-weight:800;margin-bottom:12px">Queue TV sign-in</div>' +
        '<input id="tvs-user" type="text" value="' + TV_LOGIN + '" autocapitalize="off" autocomplete="username" style="width:100%;padding:10px;margin-bottom:8px;font-size:16px;box-sizing:border-box">' +
        '<input id="tvs-pass" type="password" placeholder="Password" autocomplete="current-password" style="width:100%;padding:10px;margin-bottom:8px;font-size:16px;box-sizing:border-box">' +
        '<div id="tvs-msg" style="min-height:20px;color:#b91c1c;margin-bottom:8px"></div>' +
        '<div style="display:flex;gap:8px"><button id="tvs-go" type="button" style="flex:1;padding:10px;font-size:15px;font-weight:700">Sign in</button>' +
        (force ? '' : '<button id="tvs-x" type="button" style="padding:10px;font-size:15px">Close</button>') + '</div>';
    box.innerHTML = '<div style="background:#fff;color:#0b1a2e;border-radius:14px;padding:20px;width:min(420px,92vw)">' + inner + '</div>';
    document.body.appendChild(box);
    var msg = box.querySelector('#tvs-msg');
    var x = box.querySelector('#tvs-x'); if (x) x.onclick = closeBox;
    if (!u) {
      var go = box.querySelector('#tvs-go'); var pass = box.querySelector('#tvs-pass');
      pass.addEventListener('keydown', function (e) { if (e.key === 'Enter') go.click(); });
      setTimeout(function () { try { pass.focus(); } catch (e) {} }, 50);
      go.onclick = function () {
        var name = low(box.querySelector('#tvs-user').value); var pw = fbPw(pass.value);
        if (!name || !pw) { msg.textContent = 'Enter the login and password.'; return; }
        var A = auth(); if (!A) { msg.textContent = 'Not connected yet. Please wait a moment and try again.'; return; }
        go.disabled = true; msg.style.color = '#334'; msg.textContent = 'Signing in…';
        var email = emailOf(name);
        A.signInWithEmailAndPassword(email, pw).catch(function (e) {
          var c = (e && e.code) || '';
          var maybeNew = name === TV_LOGIN && (c === 'auth/user-not-found' || c === 'auth/invalid-credential' || c === 'auth/invalid-login-credentials');
          if (!maybeNew) throw e;
          return A.createUserWithEmailAndPassword(email, pw).catch(function (e2) {
            if (e2 && e2.code === 'auth/email-already-in-use') throw { code: 'auth/wrong-password' };
            throw e2;
          });
        }).then(function () { closeBox(); }).catch(function (e) {
          go.disabled = false; msg.style.color = '#b91c1c';
          var c = (e && e.code) || '';
          msg.textContent = c === 'auth/network-request-failed' ? 'No internet. Please check and try again.'
            : c === 'auth/too-many-requests' ? 'Too many tries. Please wait a few minutes.'
            : 'Wrong login or password.';
        });
      };
    } else {
      box.querySelector('#tvs-out').onclick = function () { var A = auth(); if (A) A.signOut().then(closeBox, closeBox); };
      box.querySelector('#tvs-chg').onclick = function () {
        var A = auth(); var cur = A && A.currentUser; if (!cur) return;
        var oldPw = fbPw(box.querySelector('#tvs-old').value), newPw = box.querySelector('#tvs-new').value;
        if (String(newPw).length < 6) { msg.textContent = 'New password must be at least 6 characters.'; return; }
        msg.style.color = '#334'; msg.textContent = 'Changing…';
        cur.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(cur.email, oldPw))
          .then(function () { return cur.updatePassword(newPw); })
          .then(function () { msg.style.color = '#15803d'; msg.textContent = 'Password changed. Use the new password on the other TVs.'; })
          .catch(function (e) { msg.style.color = '#b91c1c'; msg.textContent = (e && e.code) === 'auth/network-request-failed' ? 'No internet.' : 'Current password is wrong.'; });
      };
    }
  }

  function start() {
    var A = auth();
    if (!A) { setTimeout(start, 500); return; }
    try { A.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () {}); } catch (e) {}
    A.onAuthStateChanged(function (user) {
      badge(user);
      if (!user && REQUIRED && !document.getElementById('tvs-box')) openBox(true);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.__bmhTvSignin = { ver: VER, emailOf: emailOf, open: openBox };
})();
