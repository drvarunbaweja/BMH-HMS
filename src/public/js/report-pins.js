/* BMH — Reports PINs (Dr Varun's admin login only).
 * One PIN box beside "Centre" in Reports. It shows four places but accepts up to six digits.
 *   • 4-digit PIN → "Inventory deletion allowed in <centre selected>" (Chandigarh, Ropar, or both centres) for 30 minutes
 *     on this computer. Inventory deletions anywhere in the HMS are refused unless allowed this way for that centre.
 *   • 6-digit PIN → shows Practice Growth, Daily Summary, Financial, Statistics and "Total Eye" in Surgery / Procedure
 *     until locked, logged out, or 8 hours. Without it those are hidden from every login.
 * Both PINs are set once (first use) and stored only as salted hashes at security/reportPins.
 * Off switch (this browser): localStorage.setItem('bmh_report_pins_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_report_pins_off') === '1') return; } catch (e) {}
  var PATH = 'security/reportPins', ITER = 120000, FIN_MS = 8 * 3600000, INV_MS = 30 * 60000;
  var SK_FIN = 'bmh_rp_fin', SK_INV = 'bmh_rp_inv';
  var FIN_TABS = ['rep-daily', 'rep-financial', 'rep-stats', 'rep-growth', 'rep-referrals'];
  function me() { try { return CURRENT_USER || null; } catch (e) { return window.CURRENT_USER || null; } }
  function uname() { var u = me(); return String(u && u.username || '').toLowerCase().split('@')[0]; }
  function isOwner() { var u = me(); return !!(u && (u.isAdmin === true || String(u.role || '').toLowerCase() === 'admin') && uname() === 'drvarun'); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function ss(k, v) { try { if (v === undefined) return JSON.parse(sessionStorage.getItem(k) || 'null'); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }
  function live(k) { var o = ss(k); return o && o.user === uname() && o.until > Date.now() ? o : null; }
  function ref(p) { return window.FBDB ? window.FBDB.ref(p) : null; }
  function cName(c) { return c === 'CHD' ? 'Chandigarh' : c === 'RPR' ? 'Ropar' : c; }

  // ── hashing ──
  function hex(b) { return Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join(''); }
  function unhex(h) { var a = new Uint8Array(h.length / 2); for (var i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i * 2, 2), 16); return a; }
  function derive(pin, salt, iter) {
    return crypto.subtle.importKey('raw', new TextEncoder().encode(String(pin)), 'PBKDF2', false, ['deriveBits'])
      .then(function (k) { return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unhex(salt), iterations: iter || ITER }, k, 256); }).then(hex);
  }
  function mk(pin) { var salt = hex(crypto.getRandomValues(new Uint8Array(16))); return derive(pin, salt).then(function (h) { return { salt: salt, hash: h, iter: ITER }; }); }
  var stored = null, storedAt = 0;
  function getStored() {
    if (stored && Date.now() - storedAt < 60000) return Promise.resolve(stored);
    var r = ref(PATH); if (!r) return Promise.reject(new Error('Not connected'));
    return r.once('value').then(function (s) { stored = s.val(); storedAt = Date.now(); return stored; });
  }

  // ── state used by the rest of the HMS ──
  window.bmhReportFinUnlocked = function () { return !!live(SK_FIN); };
  function invCentres() { var o = live(SK_INV); return o ? o.centres : []; }
  function lockAll(silent) { ss(SK_FIN, null); ss(SK_INV, null); try { window.bmhPracticeGrowth && bmhPracticeGrowth.lock(); } catch (e) {} apply(); drawBar(); if (!silent) toast('Reports locked', 'i'); }
  window.bmhReportPinsLock = lockAll;

  // ── unlocking ──
  var tries = 0, waitUntil = 0;
  function tryPin(pin) {
    pin = String(pin || '').replace(/\D/g, '');
    if (Date.now() < waitUntil) { toast('Too many wrong tries — wait a minute', 'w'); return; }
    if (pin.length !== 4 && pin.length !== 6) { toast('Wrong PIN', 'w'); return; }
    getStored().then(function (st) {
      var rec = st && (pin.length === 4 ? st.p4 : st.p6);
      if (!rec) { toast('Wrong PIN', 'w'); return; }
      return derive(pin, rec.salt, rec.iter).then(function (h) {
        if (h !== rec.hash) { tries++; if (tries >= 5) { tries = 0; waitUntil = Date.now() + 60000; } toast('Wrong PIN', 'w'); return; }
        tries = 0;
        if (pin.length === 4) {
          var sel = (document.getElementById('rep-centre') || {}).value || '';
          var centres = sel ? [sel] : ['CHD', 'RPR'];
          ss(SK_INV, { user: uname(), until: Date.now() + INV_MS, centres: centres });
          var msg = 'Inventory deletion allowed in ' + (sel ? cName(sel) : 'both centres');
          toast(msg, 's'); setMsg(msg + ' (30 minutes on this computer)', '#1a8c3c');
        } else {
          ss(SK_FIN, { user: uname(), until: Date.now() + FIN_MS });
          try { window.bmhPracticeGrowth && bmhPracticeGrowth.grant(FIN_MS); } catch (e) {}
          apply(); toast('Financial reports shown', 's');
        }
        drawBar();
      });
    }).catch(function () { toast('Could not check the PIN — check the internet', 'w'); });
  }
  // check a PIN without unlocking anything here (used by Bills & History → delete bills). Resolves true / false.
  window.bmhReportPinVerify = function (pin, len) {
    pin = String(pin || '').replace(/\D/g, '');
    if (Date.now() < waitUntil) { toast('Too many wrong tries — wait a minute', 'w'); return Promise.resolve(false); }
    if (pin.length !== len) { toast('Wrong PIN', 'w'); return Promise.resolve(false); }
    return getStored().then(function (st) {
      var rec = st && (len === 4 ? st.p4 : st.p6);
      if (!rec) { toast(st ? 'Wrong PIN' : 'The report PINs have not been set yet', 'w'); return false; }
      return derive(pin, rec.salt, rec.iter).then(function (h) {
        if (h !== rec.hash) { tries++; if (tries >= 5) { tries = 0; waitUntil = Date.now() + 60000; } toast('Wrong PIN', 'w'); return false; }
        tries = 0; return true;
      });
    }).catch(function () { toast('Could not check the PIN — check the internet', 'w'); return false; });
  };
  function setupPins() {
    if (!isOwner()) return;
    var old = document.getElementById('rp-setup-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'rp-setup-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:99990;background:rgba(10,20,40,.55);display:flex;align-items:center;justify-content:center;padding:14px';
    var f = function (id, lab, n) { return '<label style="display:block;font-size:11px;font-weight:800;color:#555;margin-top:8px">' + lab + '<input id="' + id + '" type="password" inputmode="numeric" autocomplete="off" maxlength="' + n + '" style="width:100%;box-sizing:border-box;font-size:20px;letter-spacing:8px;text-align:center;padding:7px;border:1.5px solid #cfd6e2;border-radius:10px;margin-top:3px"></label>'; };
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:360px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.35)">'
      + '<div style="font-size:15px;font-weight:900">🔐 Set the report PINs</div><div style="font-size:12px;color:#555;margin:4px 0 6px">4 digits: allows inventory deletion in the centre chosen. 6 digits: shows the financial reports. Only you should know them.</div>'
      + f('rp-a1', '4-digit PIN', 4) + f('rp-a2', '4-digit PIN again', 4) + f('rp-b1', '6-digit PIN', 6) + f('rp-b2', '6-digit PIN again', 6)
      + '<div id="rp-err" style="color:#c0392b;font-size:12px;font-weight:700;min-height:16px;margin-top:6px"></div>'
      + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:6px"><button type="button" class="btn btn-gray btn-sm" id="rp-no">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="rp-ok">Save</button></div></div>';
    document.body.appendChild(ov);
    var v = function (id) { return String(document.getElementById(id).value || '').replace(/\D/g, ''); };
    var err = function (t) { document.getElementById('rp-err').textContent = t; };
    document.getElementById('rp-no').onclick = function () { ov.remove(); };
    document.getElementById('rp-ok').onclick = function () {
      var a = v('rp-a1'), b = v('rp-b1');
      if (a.length !== 4) return err('The first PIN must be exactly 4 digits');
      if (a !== v('rp-a2')) return err('The two 4-digit PINs do not match');
      if (b.length !== 6) return err('The second PIN must be exactly 6 digits');
      if (b !== v('rp-b2')) return err('The two 6-digit PINs do not match');
      if (b.slice(0, 4) === a) return err('The 6-digit PIN must not start with the 4-digit PIN');
      if (/^(\d)\1+$/.test(a) || /^(\d)\1+$/.test(b) || '0123456789'.indexOf(b) >= 0 || '0123456789'.indexOf(a) >= 0) return err('Please choose less obvious PINs');
      err('Saving…');
      Promise.all([mk(a), mk(b)]).then(function (x) {
        var u = me() || {};
        return ref(PATH).set({ p4: x[0], p6: x[1], setAt: new Date().toISOString(), setBy: u.name || u.username || '' });
      }).then(function () { stored = null; ov.remove(); toast('Report PINs saved ✓', 's'); drawBar(); })
        .catch(function (e) { err('Could not save: ' + (e && e.message || 'error')); });
    };
    setTimeout(function () { var x = document.getElementById('rp-a1'); if (x) x.focus(); }, 30);
  }
  function changePins() {
    if (!isOwner()) return;
    if (!window.bmhReportFinUnlocked()) { toast('Enter the current 6-digit PIN first, then change', 'i'); return; }
    if (!confirm('Replace both report PINs with new ones?')) return;
    setupPins();
  }

  // ── the PIN box beside "Centre" ──
  var msgText = '', msgColor = '';
  function setMsg(t, c) { msgText = t; msgColor = c; var m = document.getElementById('rp-msg'); if (m) { m.textContent = t; m.style.color = c; } }
  function drawBar() {
    var sel = document.getElementById('rep-centre'); if (!sel || !sel.parentNode) return;
    var bar = document.getElementById('rp-bar');
    if (!isOwner()) { if (bar) bar.remove(); return; }
    if (!bar) {
      bar = document.createElement('span'); bar.id = 'rp-bar';
      bar.style.cssText = 'display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;margin-left:6px';
      sel.parentNode.insertBefore(bar, sel.nextSibling);
    }
    getStored().then(function (st) {
      var fin = window.bmhReportFinUnlocked(), inv = invCentres();
      var invTxt = inv.length ? 'Inventory deletion allowed in ' + (inv.length > 1 ? 'both centres' : cName(inv[0])) : '';
      if (!msgText && invTxt) { msgText = invTxt; msgColor = '#1a8c3c'; }
      if (!inv.length && /^Inventory deletion/.test(msgText)) msgText = '';
      bar.innerHTML = (st && st.p4 && st.p6
        ? '<span style="font-size:13px">🔐</span><input id="rp-pin" type="password" inputmode="numeric" autocomplete="off" maxlength="6" placeholder="____" title="PIN" style="width:4.4em;font-size:15px;letter-spacing:4px;text-align:center;padding:2px 4px;border:1px solid var(--g4);border-radius:8px">'
          + '<button type="button" class="btn btn-xs btn-outline" id="rp-go">OK</button>'
          + (fin || inv.length ? '<button type="button" class="btn btn-xs btn-gray" id="rp-lock">🔒 Lock</button>' : '')
          + (fin ? '<a href="javascript:void 0" id="rp-change" style="font-size:10.5px">change PINs</a>' : '')
        : '<button type="button" class="btn btn-xs btn-outline" id="rp-setup">🔐 Set report PINs</button>')
        + '<span id="rp-msg" style="font-size:11.5px;font-weight:800;color:' + (msgColor || 'var(--g1)') + '">' + (msgText || '') + '</span>';
      var inp = document.getElementById('rp-pin');
      if (inp) {
        var go = function () { var v = inp.value; inp.value = ''; tryPin(v); };
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
        document.getElementById('rp-go').onclick = go;
      }
      var l = document.getElementById('rp-lock'); if (l) l.onclick = function () { msgText = ''; lockAll(); };
      var c = document.getElementById('rp-change'); if (c) c.onclick = changePins;
      var s = document.getElementById('rp-setup'); if (s) s.onclick = setupPins;
    }).catch(function () { bar.innerHTML = '<span style="font-size:11px;color:var(--g1)">🔐 PIN box needs the internet</span>'; });
  }

  // ── show / hide the financial tabs ──
  function tabFor(id) { var t = document.getElementById(id === 'rep-growth' ? 'rep-growth-tab' : '_none'); if (t) return t; return document.querySelector('#pg-reports .ptabs .ptab[onclick*="\'' + id + '\'"]'); }
  function apply() {
    var page = document.getElementById('pg-reports'); if (!page) return;
    var show = window.bmhReportFinUnlocked();
    var activeHidden = false;
    FIN_TABS.forEach(function (id) {
      var t = tabFor(id), c = document.getElementById(id);
      if (t) { t.style.display = show ? '' : 'none'; if (!show && t.classList.contains('active')) activeHidden = true; }
      if (c && !show) { if (c.classList.contains('active')) activeHidden = true; c.classList.remove('active'); c.style.display = 'none'; }
      else if (c && show) c.style.display = '';
    });
    if (activeHidden) {
      var first = Array.prototype.filter.call(page.querySelectorAll('.ptabs .ptab'), function (t) { return t.style.display !== 'none'; })[0];
      if (first) first.click();
    }
    var src = document.getElementById('rep-surg-source');
    if (src) {
      var o = src.querySelector('option[value="eye-total"]');
      if (o && !show) { if (src.value === 'eye-total') { src.value = 'ot'; var el = document.getElementById('rep-surgery-result'); if (el) el.innerHTML = ''; } o.remove(); }
    }
  }

  // ── inventory deletion needs the 4-digit unlock for that centre ──
  function centreOfRow(r) {
    if (!r) return '';
    var t = [r.dept, r.store, (function () { try { return bmhDeptLabel(r.dept || ''); } catch (e) { return ''; } })()].join(' ');
    var chd = /chd|chandigarh/i.test(t), rpr = /rpr|ropar|rupnagar/i.test(t);
    return chd && !rpr ? 'CHD' : rpr && !chd ? 'RPR' : '';
  }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  var ctx = null;
  function withCtx(name, rowsOf) {
    var orig = window[name]; if (typeof orig !== 'function' || orig._rp) return;
    var w = function () { var prev = ctx; try { ctx = rowsOf.apply(null, arguments).map(centreOfRow); } catch (e) { ctx = null; } try { return orig.apply(this, arguments); } finally { ctx = prev; } };
    w._rp = true; window[name] = w;
  }
  function byBarcodes(list) { var set = {}; (Array.isArray(list) ? list : [list]).forEach(function (b) { set[String(b)] = 1; }); return inv().filter(function (r) { return r && set[String(r.barcode)]; }); }
  function install() {
    withCtx('deleteInventoryStockRow', function (bc) { return byBarcodes(bc); });
    withCtx('deleteInventoryItemsPrompt', function (bcs) { return byBarcodes(bcs || []); });
    withCtx('deleteInventoryIolGroup', function (co, br, pw, store) { return inv().filter(function (r) { return r && String(r.store || '') === String(store || ''); }); });
    withCtx('bmhDeleteStockSubheading', function (dept, store) { return inv().filter(function (r) { return r && String(r.dept || '') === String(dept) && String(r.store || '') === String(store); }); });
    if (!window.bmhRequireInventoryDeletePin || !window.bmhRequireInventoryDeletePin._rp) {
      var g = function () {
        var u = me(); if (!(u && (u.isAdmin || (typeof isAdminUser === 'function' && isAdminUser())))) { toast('Only admin can delete inventory records', 'w'); return false; }
        var allowed = invCentres(); if (!allowed.length) { alert('Inventory deletion is locked.\n\nDr Varun can allow it from Reports: choose the centre, then enter the 4-digit PIN.'); return false; }
        var need = (ctx && ctx.length ? ctx : [(function () { try { return getEffectiveCentre(); } catch (e) { return ''; } })()]).map(function (c) { return c || ''; });
        var bad = need.filter(function (c) { return c ? allowed.indexOf(c) < 0 : allowed.length < 2; });
        if (bad.length) { alert('Inventory deletion is allowed only in ' + allowed.map(cName).join(' and ') + ' right now.\n\nThis item belongs to ' + (bad[0] ? cName(bad[0]) : 'both centres / an unknown centre') + '. Nothing was deleted.'); return false; }
        return true;
      };
      g._rp = true; window.bmhRequireInventoryDeletePin = g;
    }
  }

  // ── keep everything in step (login changes, tabs added later by other modules) ──
  var lastUser = null;
  function tick() {
    try {
      var u = uname();
      if (lastUser !== null && u !== lastUser) { ss(SK_FIN, null); ss(SK_INV, null); msgText = ''; }
      lastUser = u;
      install(); apply();
      if (!document.getElementById('rp-bar') === isOwner()) drawBar();
      else if (isOwner() && !invCentres().length && /^Inventory deletion/.test(msgText)) { msgText = ''; drawBar(); }
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick); else tick();
  setInterval(tick, 1500);
})();
