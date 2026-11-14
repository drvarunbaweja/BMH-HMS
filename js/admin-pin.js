/* BMH — Admin PIN (6 digits) for admin logins.
 * Changing the password of an admin login (Dr Varun's or any other admin), removing its admin rights, disabling it or
 * deleting it needs the 6-digit Admin PIN. Only Dr Varun's own admin login (drvarun) can create or change the PIN.
 * The PIN itself is never stored: only a salted PBKDF2-SHA256 hash at security/adminPin.
 * Also: nobody can delete or disable a login of their own (any of their aliases), so an admin cannot lock himself out.
 * Off switch (this browser): localStorage.setItem('bmh_admin_pin_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_admin_pin_off') === '1') return; } catch (e) {}
  var OWNER = ['drvarun', 'drvarun@bawejahospital.com'];
  var PATH = 'security/adminPin';
  var ITER = 120000;
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function me() { try { return CURRENT_USER || null; } catch (e) { return null; } }
  function udb() { try { return USER_DB || {}; } catch (e) { return window.USER_DB || {}; } }
  function low(s) { return String(s || '').trim().toLowerCase(); }
  function isOwnerSession() { var u = me(); return !!(u && u.isAdmin && OWNER.indexOf(low(u.username)) >= 0); }
  function isProtected(uname) {
    var k = low(uname); if (OWNER.indexOf(k) >= 0 || OWNER.indexOf(k.replace(/_/g, '.')) >= 0) return true;
    var p = udb()[uname] || udb()[k]; return !!(p && (p.isAdmin === true || String(p.role || '') === 'Admin'));
  }
  function samePerson(uname) {
    var u = me(); if (!u) return false;
    if (low(uname) === low(u.username)) return true;
    var p = udb()[uname]; if (!p) return false;
    return !!(u.isAdmin && p.isAdmin && low(p.name) && low(p.name) === low(u.name));
  }
  function ref(p) { return window.FBDB ? window.FBDB.ref(p) : null; }

  // ── hashing ──
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function unhex(h) { var a = new Uint8Array(h.length / 2); for (var i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i * 2, 2), 16); return a; }
  function derive(pin, saltHex, iter) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveBits']).then(function (k) {
      return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unhex(saltHex), iterations: iter || ITER }, k, 256);
    }).then(hex);
  }
  function getStored() { var r = ref(PATH); if (!r) return Promise.reject(new Error('Not connected')); return r.once('value').then(function (s) { return s.val(); }); }

  // ── lock-out after 5 wrong PINs (15 min, this browser) ──
  var LK = 'bmh_admin_pin_fail';
  function fails() { try { return JSON.parse(localStorage.getItem(LK) || '{"n":0,"t":0}'); } catch (e) { return { n: 0, t: 0 }; } }
  function setFails(o) { try { localStorage.setItem(LK, JSON.stringify(o)); } catch (e) {} }
  function locked() { var f = fails(); return f.n >= 5 && Date.now() - f.t < 15 * 60000; }

  // ── PIN box ──
  function pinBox(title, sub, fields) {
    return new Promise(function (resolve) {
      var old = document.getElementById('apin-ov'); if (old) old.remove();
      var ov = document.createElement('div'); ov.id = 'apin-ov';
      ov.style.cssText = 'position:fixed;inset:0;z-index:99990;background:rgba(10,20,40,.55);display:flex;align-items:center;justify-content:center;padding:14px';
      var inp = 'width:100%;box-sizing:border-box;font-size:22px;letter-spacing:10px;text-align:center;padding:9px;border:1.5px solid #cfd6e2;border-radius:10px;margin-top:4px';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:340px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.35)">'
        + '<div style="font-size:15px;font-weight:900">🔐 ' + title + '</div><div style="font-size:12px;color:#555;margin:4px 0 10px">' + sub + '</div>'
        + fields.map(function (f, i) { return '<label style="display:block;font-size:11px;font-weight:800;color:#555;margin-top:8px">' + f + '<input id="apin-' + i + '" type="password" inputmode="numeric" autocomplete="off" maxlength="6" style="' + inp + '"></label>'; }).join('')
        + '<div id="apin-err" style="color:#c0392b;font-size:12px;font-weight:700;min-height:16px;margin-top:6px"></div>'
        + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:6px"><button type="button" class="btn btn-gray btn-sm" id="apin-no">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="apin-ok">OK</button></div></div>';
      document.body.appendChild(ov);
      var vals = function () { return fields.map(function (_, i) { return String(document.getElementById('apin-' + i).value || '').replace(/\D/g, ''); }); };
      var done = function (v) { ov.remove(); resolve(v); };
      document.getElementById('apin-no').onclick = function () { done(null); };
      document.getElementById('apin-ok').onclick = function () {
        var v = vals(); var bad = v.filter(function (x) { return x.length !== 6; }).length;
        if (bad) { document.getElementById('apin-err').textContent = 'Enter all 6 digits'; return; }
        done(v);
      };
      fields.forEach(function (_, i) { document.getElementById('apin-' + i).addEventListener('keydown', function (e) { if (e.key === 'Enter') document.getElementById('apin-ok').click(); }); });
      setTimeout(function () { var a = document.getElementById('apin-0'); if (a) a.focus(); }, 30);
    });
  }

  function createPin(isChange) {
    if (!isOwnerSession()) { toast('Only Dr Varun\'s admin login can set the Admin PIN', 'w'); return Promise.resolve(false); }
    return pinBox(isChange ? 'New Admin PIN' : 'Set the Admin PIN', 'Choose a 6-digit PIN. It will be needed to change an admin password, remove admin rights, or disable/delete an admin login. Only you should know it.', ['New 6-digit PIN', 'Enter it again']).then(function (v) {
      if (!v) return false;
      if (v[0] !== v[1]) { toast('The two PINs do not match — not saved', 'w'); return false; }
      if (/^(\d)\1{5}$/.test(v[0]) || '0123456789'.indexOf(v[0]) >= 0 || '9876543210'.indexOf(v[0]) >= 0) { toast('Please choose a less obvious PIN (not 111111 / 123456)', 'w'); return false; }
      var salt = hex(crypto.getRandomValues(new Uint8Array(16)));
      return derive(v[0], salt).then(function (h) {
        var u = me() || {};
        return ref(PATH).set({ salt: salt, hash: h, iter: ITER, setAt: new Date().toISOString(), setBy: u.name || u.username || '' });
      }).then(function () { setFails({ n: 0, t: 0 }); toast('Admin PIN saved ✓', 's'); return true; })
        .catch(function (e) { toast('Could not save the PIN: ' + (e && e.message || 'error'), 'e'); return false; });
    });
  }

  // resolves true when the PIN is right
  function askPin(why) {
    if (locked()) { toast('Too many wrong PINs — try again in 15 minutes', 'w'); return Promise.resolve(false); }
    return getStored().then(function (st) {
      if (!st || !st.hash || !st.salt) {
        if (isOwnerSession()) {
          toast('No Admin PIN yet — please set one first', 'i');
          return createPin(false);
        }
        toast('The Admin PIN has not been set up yet — only Dr Varun can do this', 'w');
        return false;
      }
      return pinBox('Admin PIN needed', why, ['6-digit Admin PIN']).then(function (v) {
        if (!v) return false;
        return derive(v[0], st.salt, st.iter).then(function (h) {
          if (h === st.hash) { setFails({ n: 0, t: 0 }); return true; }
          var f = fails(); f.n = (Date.now() - f.t > 15 * 60000 ? 0 : f.n) + 1; f.t = Date.now(); setFails(f);
          toast('Wrong Admin PIN' + (f.n >= 5 ? ' — locked for 15 minutes' : ' (' + (5 - f.n) + ' tries left)'), 'w');
          return false;
        });
      });
    }).catch(function (e) { toast('Could not check the Admin PIN: ' + (e && e.message || 'offline'), 'w'); return false; });
  }
  window.bmhAdminPinAsk = askPin;
  window.bmhAdminPinChange = function () {
    if (!isOwnerSession()) { toast('Only Dr Varun\'s admin login can change the Admin PIN', 'w'); return; }
    getStored().then(function (st) {
      if (!st || !st.hash) return createPin(false);
      return askPin('Enter the current Admin PIN to change it.').then(function (ok) { if (ok) return createPin(true); });
    }).catch(function () { toast('Could not reach the database', 'w'); });
  };

  // ── guards ──
  function guard(name, need) {
    var orig = window[name]; if (typeof orig !== 'function' || orig._apin) return;
    var w = function () {
      var self = this, args = arguments, why = need.apply(this, args);
      if (why === false) return;            // blocked outright
      if (!why) return orig.apply(self, args);
      askPin(why).then(function (ok) { if (ok) orig.apply(self, args); });
    };
    w._apin = true; window[name] = w;
  }
  // own password change, when the signed-in login is an admin login
  guard('changeMyPassword', function () {
    var u = me(); if (!u || !isProtected(u.username)) return '';
    var nw = (document.getElementById('cpw-new') || {}).value || '';
    return nw ? 'Changing an admin password needs the Admin PIN.' : '';
  });
  // Settings → Logins → Edit: new password or admin rights removed on an admin login
  guard('saveEditUser', function () {
    var uname = (document.getElementById('eu-username') || {}).value || '';
    if (!isProtected(uname)) return '';
    var newpw = (document.getElementById('eu-newpw') || {}).value || '';
    var adminBox = document.getElementById('eu-is-admin');
    var dropAdmin = adminBox && !adminBox.checked;
    if (dropAdmin && samePerson(uname)) { toast('You cannot remove admin rights from your own login', 'w'); return false; }
    if (newpw || dropAdmin) return (newpw ? 'Changing the password of an admin login' : 'Removing admin rights') + ' needs the Admin PIN.';
    return '';
  });
  function deleteGuard(kind) {
    return function (uname, flag) {
      if (kind === 'disable' && !flag) return '';
      if (samePerson(uname)) { toast('You cannot ' + kind + ' your own login', 'w'); return false; }
      return isProtected(uname) ? (kind === 'delete' ? 'Deleting' : 'Disabling') + ' an admin login needs the Admin PIN.' : '';
    };
  }
  function install() {
    guard('bmhDeleteLogin', deleteGuard('delete'));
    guard('setUserDisabled', deleteGuard('disable'));
    addButton();
  }
  // "🔐 Admin PIN" button next to Change Password (Dr Varun's admin login only)
  function addButton() {
    var cur = document.getElementById('cpw-current'); if (!cur) return;
    var box = cur.closest('.card') || cur.parentNode; if (!box) return;
    var b = document.getElementById('apin-btn');
    if (!isOwnerSession()) { if (b) b.remove(); return; }
    if (b) return;
    b = document.createElement('button'); b.type = 'button'; b.id = 'apin-btn'; b.className = 'btn btn-outline btn-sm';
    b.style.marginTop = '8px'; b.textContent = '🔐 Set / change Admin PIN';
    b.onclick = function () { window.bmhAdminPinChange(); };
    box.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install); else install();
  setInterval(function () { try { install(); } catch (e) {} }, 3000);
})();
