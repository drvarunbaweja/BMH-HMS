/* BMH — IPD nursing sign-in (PIN) and fresh entry forms.
 * - Each nursing staff member has ONE PIN, saved centrally (ipdNursePins/<name>) so it works on every
 *   computer and phone. Old PINs saved on a single device are moved to the central store the first time
 *   they are used.
 * - On computers the PIN is asked every time an entry is saved.
 * - On a staff member's own phone they can tick "Keep me signed in on this phone"; then the PIN is not
 *   asked again on that phone until they press "Sign out".
 * - Nursing entry forms open blank, with a line showing the last recorded parameters (who and when).
 * Only the nursing sign-in and the entry forms change; saved IPD data keeps its existing format.
 */
(function () {
  'use strict';
  var DEVICE_KEY = 'bmh_ipd_nurse_device_v1';
  var ITER = 120000;

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function slug(name) { return String(name || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
  function toast(msg, tone) { try { if (typeof showToast === 'function') showToast(msg, tone || 'i'); } catch (e) {} }
  function isOwnPhoneCapable() {
    try { return window.matchMedia('(pointer:coarse)').matches && Math.min(window.screen.width, window.screen.height) < 820; } catch (e) { return false; }
  }
  function deviceNurse() {
    try { var raw = localStorage.getItem(DEVICE_KEY); var o = raw ? JSON.parse(raw) : null; return o && o.name ? o.name : ''; } catch (e) { return ''; }
  }
  function setDeviceNurse(name) {
    try { if (name) localStorage.setItem(DEVICE_KEY, JSON.stringify({ name: name, at: new Date().toISOString() })); else localStorage.removeItem(DEVICE_KEY); } catch (e) {}
  }
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function unhex(h) { var a = new Uint8Array(h.length / 2); for (var i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i * 2, 2), 16); return a; }
  function hashPin(pin, saltHex, iter) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveBits']).then(function (key) {
      return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: unhex(saltHex), iterations: iter, hash: 'SHA-256' }, key, 256);
    }).then(hex);
  }
  function readCentral(name) {
    if (!window.FBDB) return Promise.resolve(null);
    return Promise.race([
      window.FBDB.ref('ipdNursePins/' + slug(name)).once('value').then(function (s) { return s.val(); }),
      new Promise(function (_, rej) { setTimeout(function () { rej(new Error('timeout')); }, 8000); })
    ]);
  }
  function writeCentral(name, pin) {
    var salt = hex(crypto.getRandomValues(new Uint8Array(16)));
    return hashPin(pin, salt, ITER).then(function (hash) {
      var rec = { name: name, salt: salt, hash: hash, iter: ITER, setAt: new Date().toISOString() };
      return window.FBDB ? window.FBDB.ref('ipdNursePins/' + slug(name)).set(rec).then(function () { return rec; }) : rec;
    });
  }
  function localPin(name) {
    try { return typeof ipdNursePinKey === 'function' ? (localStorage.getItem(ipdNursePinKey(name)) || '') : ''; } catch (e) { return ''; }
  }

  // ── PIN dialog ──
  function pinDialog(name, mode) {
    // mode: 'enter' | 'create'
    return new Promise(function (resolve) {
      var old = document.getElementById('bmh-ipd-pin-ov'); if (old) old.remove();
      var phone = isOwnPhoneCapable();
      var ov = document.createElement('div');
      ov.id = 'bmh-ipd-pin-ov';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,20,40,.55);z-index:5000;display:flex;align-items:center;justify-content:center;padding:16px';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:340px;width:100%;padding:18px 18px 14px;box-shadow:0 10px 40px rgba(0,0,0,.3);font-family:inherit">'
        + '<div style="font-size:15px;font-weight:900;color:#1A3C6E;margin-bottom:2px">' + (mode === 'create' ? 'Create your PIN' : 'Enter your PIN') + '</div>'
        + '<div style="font-size:12px;color:#555;margin-bottom:12px">' + esc(name) + (mode === 'create' ? ' — choose a 4 digit PIN. You will use the same PIN on every computer and phone.' : '') + '</div>'
        + '<input id="bmh-ipd-pin-1" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="4 digit PIN" style="width:100%;font-size:20px;letter-spacing:8px;text-align:center;padding:10px;border:1.5px solid #c9d3e3;border-radius:10px;margin-bottom:8px">'
        + (mode === 'create' ? '<input id="bmh-ipd-pin-2" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="Re-enter PIN" style="width:100%;font-size:20px;letter-spacing:8px;text-align:center;padding:10px;border:1.5px solid #c9d3e3;border-radius:10px;margin-bottom:8px">' : '')
        + (phone ? '<label style="display:flex;gap:8px;align-items:center;font-size:12px;color:#333;margin:4px 0 10px"><input type="checkbox" id="bmh-ipd-pin-keep" checked> Keep me signed in on this phone</label>' : '')
        + '<div id="bmh-ipd-pin-err" style="font-size:12px;color:#c62828;min-height:16px;margin-bottom:6px"></div>'
        + '<div style="display:flex;gap:8px"><button type="button" id="bmh-ipd-pin-cancel" class="btn btn-gray" style="flex:1">Cancel</button><button type="button" id="bmh-ipd-pin-ok" class="btn btn-gold" style="flex:1">OK</button></div>'
        + '</div>';
      document.body.appendChild(ov);
      var i1 = ov.querySelector('#bmh-ipd-pin-1'), i2 = ov.querySelector('#bmh-ipd-pin-2'), err = ov.querySelector('#bmh-ipd-pin-err');
      var done = function (v) { ov.remove(); resolve(v); };
      var ok = function () {
        var a = String(i1.value || '').trim();
        if (!/^\d{4}$/.test(a)) { err.textContent = 'PIN must be exactly 4 digits'; return; }
        if (mode === 'create' && a !== String(i2.value || '').trim()) { err.textContent = 'The two PINs do not match'; return; }
        done({ pin: a, keep: !!(ov.querySelector('#bmh-ipd-pin-keep') || {}).checked, setError: function (m) { err.textContent = m; } });
      };
      ov.querySelector('#bmh-ipd-pin-ok').onclick = ok;
      ov.querySelector('#bmh-ipd-pin-cancel').onclick = function () { done(null); };
      [i1, i2].forEach(function (el) { if (el) el.addEventListener('keydown', function (e) { if (e.key === 'Enter') ok(); }); });
      setTimeout(function () { try { i1.focus(); } catch (e) {} }, 50);
    });
  }

  var lockUntil = {};
  // Ask for (or create) the PIN of `name`. Resolves true/false.
  function verifyNurse(name) {
    name = String(name || '').trim();
    if (!name) return Promise.resolve(false);
    if (lockUntil[name] && Date.now() < lockUntil[name]) { toast('Too many wrong PINs — wait a minute', 'w'); return Promise.resolve(false); }
    return readCentral(name).catch(function () { return 'offline'; }).then(function (rec) {
      if (rec === 'offline') { toast('No connection — could not check PIN. Try again.', 'w'); return false; }
      var legacy = localPin(name);
      var mode = rec && rec.hash ? 'enter' : (legacy ? 'enter' : 'create');
      var attempt = function (tries) {
        return pinDialog(name, mode).then(function (r) {
          if (!r) return false;
          var check;
          if (rec && rec.hash) check = hashPin(r.pin, rec.salt, rec.iter || ITER).then(function (h) { return h === rec.hash; });
          else if (legacy) check = Promise.resolve(r.pin === legacy).then(function (okk) { if (okk) return writeCentral(name, r.pin).then(function () { return true; }, function () { return true; }); return false; });
          else check = writeCentral(name, r.pin).then(function () { toast('PIN created for ' + name + ' ✓', 's'); return true; });
          return check.then(function (good) {
            if (good) {
              if (r.keep && isOwnPhoneCapable()) setDeviceNurse(name);
              return true;
            }
            if (tries >= 4) { lockUntil[name] = Date.now() + 60000; toast('Incorrect PIN — locked for 1 minute', 'w'); return false; }
            toast('Incorrect PIN', 'w');
            return attempt(tries + 1);
          });
        });
      };
      return attempt(0);
    });
  }

  function selectedNurse(selectId) {
    var sel = document.getElementById(selectId) || document.getElementById('ipdm-nurse-select') || document.getElementById('pn-nurse');
    return String(sel && sel.value || '').trim();
  }
  // Gate before saving: phone with remembered nurse → no PIN; otherwise ask PIN every time.
  function gate(selectId) {
    var name = selectedNurse(selectId);
    if (!name) { toast('Select nursing staff first', 'w'); return Promise.resolve(''); }
    if (deviceNurse() === name) return Promise.resolve(name);
    return verifyNurse(name).then(function (ok) { return ok ? name : ''; });
  }
  function runWithNurse(selectId, fn) {
    if (window.__bmhIpdGateBusy) return;
    window.__bmhIpdGateBusy = true;
    gate(selectId).then(function (name) {
      if (!name) return;
      window._ipdAuthenticatedNurse = name;
      try { fn(); } finally {
        if (deviceNurse() !== name) window._ipdAuthenticatedNurse = '';
      }
    }).catch(function (e) { console.warn('[ipd-nursing]', e); toast('Could not save — please try again', 'w'); })
      .then(function () { window.__bmhIpdGateBusy = false; });
  }

  // ── fresh forms + previous parameters line ──
  function lastRecordedLine(p) {
    var v = (p && Array.isArray(p.vitalSigns) && p.vitalSigns[0]) || null;
    if (!v) return '<div class="bmh-ipd-prev" style="font-size:11.5px;color:#555;background:#f4f6fa;border:1px dashed #c9d3e3;border-radius:8px;padding:7px 10px;margin-bottom:10px">No parameters recorded yet for this admission.</div>';
    var bits = [['BP', v.bp], ['Pulse', v.pulse], ['Temp', v.temp], ['SpO2', v.spo2], ['RR', v.rr], ['Pain', v.pain]].filter(function (x) { return String(x[1] == null ? '' : x[1]).trim(); })
      .map(function (x) { return '<b>' + x[0] + '</b> ' + esc(x[1]); });
    var when = '';
    try { when = v.recordedAt ? new Date(v.recordedAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''; } catch (e) {}
    return '<div class="bmh-ipd-prev" style="font-size:11.5px;color:#333;background:#f4f6fa;border:1px dashed #c9d3e3;border-radius:8px;padding:7px 10px;margin-bottom:10px">'
      + '<span style="font-weight:900;color:#1A3C6E">Previous:</span> ' + (bits.join(' · ') || '—')
      + '<span style="color:#666"> — ' + esc([v.by, when].filter(Boolean).join(', ')) + '</span></div>';
  }
  function signedInBar(hostSel) {
    var dn = deviceNurse();
    if (!dn || !isOwnPhoneCapable()) return '';
    return '<div class="bmh-ipd-signed" style="font-size:11.5px;color:#1a8c3c;margin:-4px 0 10px">Signed in on this phone as <b>' + esc(dn) + '</b> · <a href="#" onclick="bmhIpdNurseSignOut();return false" style="color:#c62828">Sign out</a></div>';
  }
  function presetNurse(selectId) {
    var el = document.getElementById(selectId);
    var dn = deviceNurse();
    if (el && dn && isOwnPhoneCapable()) {
      if (![].some.call(el.options, function (o) { return o.value === dn; })) return;
      el.value = dn;
      window._ipdAuthenticatedNurse = dn;
    }
    try { setIPDNursingEntryEnabled(!!(el && el.value)); } catch (e) {}
  }

  var origRender = window.renderIPDMonitoringSheet;
  if (typeof origRender === 'function') {
    window.renderIPDMonitoringSheet = function (id) {
      origRender.apply(this, arguments);
      try {
        var host = document.getElementById('ipd-monitor-body');
        var p = (window.IPD_PATIENTS || (typeof IPD_PATIENTS !== 'undefined' ? IPD_PATIENTS : []) || []).find(function (x) { return x.id === id; });
        if (!host || !p) return;
        ['ipdm-bp', 'ipdm-pulse', 'ipdm-temp', 'ipdm-spo2', 'ipdm-rr', 'ipdm-pain'].forEach(function (fid) { var el = document.getElementById(fid); if (el) el.value = ''; });
        var vit = host.querySelector('[data-ipdm-vitals]');
        if (vit && !host.querySelector('.bmh-ipd-prev')) vit.insertAdjacentHTML('beforebegin', lastRecordedLine(p));
        var sel = document.getElementById('ipdm-nurse-select');
        if (sel && sel.parentElement && sel.parentElement.parentElement) sel.parentElement.parentElement.insertAdjacentHTML('afterend', signedInBar());
        presetNurse('ipdm-nurse-select');
      } catch (e) { console.warn('[ipd-nursing] render', e); }
    };
  }

  function prepNoteModal() {
    try {
      var p = window.activeIPDPatient || (typeof activeIPDPatient !== 'undefined' ? activeIPDPatient : null);
      var modal = document.getElementById('m-ipd-note');
      if (!modal) return;
      var now = new Date();
      var d = document.getElementById('pn-date'); if (d) d.value = typeof todayKey === 'function' ? todayKey() : now.toISOString().slice(0, 10);
      var t = document.getElementById('pn-time'); if (t) t.value = now.toTimeString().slice(0, 5);
      ['pn-bp', 'pn-pulse', 'pn-temp', 'pn-spo2', 'pn-rr', 'pn-pain', 'pn-text', 'pn-orders'].forEach(function (fid) { var el = document.getElementById(fid); if (el) el.value = ''; });
      var meds = document.getElementById('pn-meds-list'); if (meds) { meds.innerHTML = ''; try { addProgressNoteMedicineRow(); } catch (e) {} }
      modal.querySelectorAll('.bmh-ipd-prev,.bmh-ipd-signed').forEach(function (n) { n.remove(); });
      var bpEl = document.getElementById('pn-bp');
      var row = bpEl && bpEl.closest('.fg');
      if (row && p) row.insertAdjacentHTML('beforebegin', lastRecordedLine(p));
      var nurseSel = document.getElementById('pn-nurse');
      if (nurseSel) { nurseSel.value = ''; var grp = nurseSel.closest('.form-group'); if (grp) grp.insertAdjacentHTML('afterend', signedInBar()); }
      presetNurse('pn-nurse');
    } catch (e) { console.warn('[ipd-nursing] note modal', e); }
  }
  var origOpenM = window.openM;
  if (typeof origOpenM === 'function') {
    window.openM = function (id) {
      var r = origOpenM.apply(this, arguments);
      if (id === 'm-ipd-note') prepNoteModal();
      return r;
    };
  }

  // Selecting a name only enables the form; the PIN is asked when saving.
  window.onIPDNurseSelected = function (el) {
    var name = String(el && el.value || '').trim();
    window._ipdAuthenticatedNurse = (name && deviceNurse() === name) ? name : '';
    try { setIPDNursingEntryEnabled(!!name); } catch (e) {}
    var otherId = el && el.id === 'pn-nurse' ? 'ipdm-nurse-select' : 'pn-nurse';
    var other = document.getElementById(otherId);
    if (other && name && [].some.call(other.options || [], function (o) { return o.value === name; })) other.value = name;
  };

  // Save actions go through the PIN gate first.
  [['saveIPDMonitorVitals', 'ipdm-nurse-select'], ['saveIPDMonitoringSheet', 'ipdm-nurse-select'], ['saveProgressNote', 'pn-nurse']].forEach(function (pair) {
    var orig = window[pair[0]];
    if (typeof orig !== 'function') return;
    window[pair[0]] = function () { var args = arguments, self = this; runWithNurse(pair[1], function () { orig.apply(self, args); }); };
  });
  var origComplete = window.completeIPDInstruction;
  if (typeof origComplete === 'function') {
    window.completeIPDInstruction = function () {
      var args = arguments, self = this;
      var selId = document.getElementById('ipdm-nurse-select') && document.getElementById('ipdm-nurse-select').value ? 'ipdm-nurse-select' : 'pn-nurse';
      runWithNurse(selId, function () { origComplete.apply(self, args); });
    };
  }

  window.bmhIpdNurseSignOut = function () {
    setDeviceNurse('');
    window._ipdAuthenticatedNurse = '';
    ['ipdm-nurse-select', 'pn-nurse'].forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ''; });
    document.querySelectorAll('.bmh-ipd-signed').forEach(function (n) { n.remove(); });
    try { setIPDNursingEntryEnabled(false); } catch (e) {}
    toast('Signed out on this phone ✓', 's');
  };

  // Admin PIN reset: same as before, and also clears the central PIN.
  window.resetIPDNursePin = function () {
    var admin = (typeof CURRENT_USER !== 'undefined' && CURRENT_USER && CURRENT_USER.isAdmin);
    if (!admin) { toast('Admin access required', 'w'); return; }
    var name = String((document.getElementById('admin-nurse-pin-select') || {}).value || '').trim();
    if (!name) { toast('Select nursing staff', 'w'); return; }
    if (!confirm('Reset PIN for ' + name + '? They will create a new 4 digit PIN the next time they save an entry.')) return;
    try { localStorage.removeItem(ipdNursePinKey(name)); } catch (e) {}
    if (deviceNurse() === name) setDeviceNurse('');
    if (window._ipdAuthenticatedNurse === name) window._ipdAuthenticatedNurse = '';
    var done = function () {
      try { fbPush('auditLog', { user: CURRENT_USER.name || 'Admin', role: 'Admin', action: 'RESET_IPD_NURSE_PIN', item: name, timestamp: new Date().toISOString() }).catch(function () {}); } catch (e) {}
      toast('PIN reset for ' + name + ' ✓', 's');
    };
    if (window.FBDB) window.FBDB.ref('ipdNursePins/' + slug(name)).remove().then(done, function () { toast('Could not reset PIN — check connection', 'w'); });
    else done();
  };

  window.bmhIpdNursing = { verifyNurse: verifyNurse, deviceNurse: deviceNurse, isOwnPhoneCapable: isOwnPhoneCapable, gate: gate };
})();
