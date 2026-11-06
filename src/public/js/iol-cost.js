/* BMH — IOL cost price (Settings → Surgery Packs → IOL / Implant Catalogue).
 * • Adds a "Cost price" next to the MRP for each IOL (in the catalogue list, the Edit IOL screen and Add IOL).
 * • Cost prices are hidden from everyone (shown as ₹ ••••). Only an admin can see, enter or edit them, after entering
 *   the IOL cost PIN; the unlock lasts 20 minutes, then locks again.
 * • The PIN is created by the admin the first time. Cost prices are stored ENCRYPTED with that PIN
 *   (AES-GCM, key derived from the PIN), so even someone reading the database cannot see them without the PIN.
 *   If the PIN is forgotten, the saved costs cannot be recovered and the PIN has to be reset (which clears them).
 * Nothing else is changed: MRP, inventory and billing work as before.
 */
(function () {
  'use strict';
  var UNLOCK_MS = 20 * 60e3, ITER = 150000, CHECK = 'BMH-IOL-COST-OK';
  var key = null, until = 0, meta = null, items = {}, loaded = false, loading = null, timer = null;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function isAdmin() { try { return typeof isAdminUser === 'function' ? !!isAdminUser() : !!(CURRENT_USER && CURRENT_USER.isAdmin); } catch (e) { return false; } }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) { return ''; } }
  function cat() { try { return IOL_CATALOG || []; } catch (e) { return []; } }
  function nameKey(n) { return encodeURIComponent(String(n || '').trim().toLowerCase().replace(/\s+/g, ' ')).replace(/\./g, '%2E'); }
  function unlocked() { return !!key && Date.now() < until; }
  function minsLeft() { return Math.max(0, Math.ceil((until - Date.now()) / 60e3)); }
  var te = new TextEncoder(), td = new TextDecoder();
  function b64(buf) { var s = '', a = new Uint8Array(buf); for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]); return btoa(s); }
  function unb64(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function derive(pin, saltB64) {
    return crypto.subtle.importKey('raw', te.encode(String(pin)), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: unb64(saltB64), iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function enc(k, text) { var iv = crypto.getRandomValues(new Uint8Array(12)); return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, te.encode(String(text))).then(function (ct) { return { iv: b64(iv), ct: b64(ct) }; }); }
  function dec(k, o) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(o.iv) }, k, unb64(o.ct)).then(function (pt) { return td.decode(pt); }); }
  // storage: Firebase iolCostPrices/{meta, items}; this device keeps an encrypted copy as a fallback
  function ref(p) { return window.FBDB ? window.FBDB.ref('iolCostPrices' + (p ? '/' + p : '')) : null; }
  function local() { try { return JSON.parse(localStorage.getItem('bmh_iol_cost_enc') || 'null'); } catch (e) { return null; } }
  function saveLocal() { try { localStorage.setItem('bmh_iol_cost_enc', JSON.stringify({ meta: meta, items: items })); } catch (e) {} }
  function load(force) {
    if (loaded && !force) return Promise.resolve();
    if (loading) return loading;
    var l = local(); if (l) { meta = l.meta || meta; items = l.items || items; }
    var r = ref();
    loading = (r ? r.once('value').then(function (s) { var v = s.val(); if (v) { meta = v.meta || null; items = v.items || {}; saveLocal(); } }).catch(function () {}) : Promise.resolve())
      .then(function () { loaded = true; loading = null; });
    return loading;
  }
  // decrypted values for this unlock only (kept in memory, never written in plain form)
  var plain = {};
  function decryptAll() {
    plain = {};
    return Promise.all(Object.keys(items).map(function (k) {
      return dec(key, items[k]).then(function (v) { plain[k] = v; }).catch(function () {});
    }));
  }
  function lock(silent) { key = null; until = 0; plain = {}; if (timer) { clearInterval(timer); timer = null; } refreshUi(); if (!silent) toast('IOL cost prices locked', 'i'); }
  function startTimer() { if (timer) clearInterval(timer); timer = setInterval(function () { if (!unlocked()) lock(true); else refreshUi(); }, 30e3); }
  function refreshUi() { try { if (typeof renderIolCatalogList === 'function') renderIolCatalogList(); } catch (e) {} decorateEditor(); decorateAdd(); }

  // ── PIN dialog ──
  function pinDialog(create) {
    return new Promise(function (resolve) {
      var old = document.getElementById('iolc-pin'); if (old) old.remove();
      var ov = document.createElement('div'); ov.id = 'iolc-pin';
      ov.style.cssText = 'position:fixed;inset:0;z-index:10100;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:360px;width:100%;padding:16px;box-shadow:0 18px 50px rgba(0,0,0,.3)">'
        + '<div style="font-size:15px;font-weight:900">🔒 IOL cost prices</div>'
        + '<div style="font-size:12px;color:#555;margin:4px 0 10px">' + (create ? 'Create the IOL cost PIN (4–8 digits). Only someone with this PIN can see or change IOL cost prices. Keep it safe — if it is forgotten, saved costs cannot be recovered.' : 'Enter the IOL cost PIN. Costs stay visible for 20 minutes.') + '</div>'
        + '<input id="iolc-p1" type="password" inputmode="numeric" autocomplete="off" placeholder="PIN" style="width:100%;padding:9px;border:1px solid #ccc;border-radius:8px;font-size:16px;letter-spacing:4px;margin-bottom:8px">'
        + (create ? '<input id="iolc-p2" type="password" inputmode="numeric" autocomplete="off" placeholder="Repeat PIN" style="width:100%;padding:9px;border:1px solid #ccc;border-radius:8px;font-size:16px;letter-spacing:4px;margin-bottom:8px">' : '')
        + '<div id="iolc-err" style="color:#c62828;font-size:12px;min-height:16px"></div>'
        + '<div style="display:flex;justify-content:space-between;gap:8px;margin-top:6px">' + (create ? '<span></span>' : '<button type="button" class="btn btn-xs btn-outline" id="iolc-reset" style="color:#c62828">Forgot PIN — reset</button>')
        + '<span style="display:flex;gap:8px"><button type="button" class="btn btn-gray btn-sm" id="iolc-cancel">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="iolc-ok">' + (create ? 'Create PIN' : 'Unlock') + '</button></span></div></div>';
      document.body.appendChild(ov);
      var p1 = ov.querySelector('#iolc-p1'), err = ov.querySelector('#iolc-err');
      setTimeout(function () { try { p1.focus(); } catch (e) {} }, 50);
      var done = function (v) { ov.remove(); resolve(v); };
      ov.querySelector('#iolc-cancel').onclick = function () { done(null); };
      var rs = ov.querySelector('#iolc-reset'); if (rs) rs.onclick = function () { done({ reset: true }); };
      var go = function () {
        var a = String(p1.value || '').trim();
        if (!/^\d{4,8}$/.test(a)) { err.textContent = 'PIN must be 4 to 8 digits'; return; }
        if (create) { var b = String(ov.querySelector('#iolc-p2').value || '').trim(); if (a !== b) { err.textContent = 'The two PINs do not match'; return; } }
        done({ pin: a, err: err, ov: ov });
      };
      ov.querySelector('#iolc-ok').onclick = go;
      ov.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    });
  }
  window.bmhIolCostUnlock = function () {
    if (!isAdmin()) { toast('Only admin can see or change IOL cost prices', 'w'); return Promise.resolve(false); }
    if (!(window.crypto && crypto.subtle)) { toast('This browser cannot unlock cost prices', 'w'); return Promise.resolve(false); }
    if (unlocked()) return Promise.resolve(true);
    return load(true).then(function () {
      var create = !meta || !meta.salt || !meta.check;
      return pinDialog(create).then(function (r) {
        if (!r) return false;
        if (r.reset) return resetPin();
        if (create) {
          var salt = b64(crypto.getRandomValues(new Uint8Array(16)));
          return derive(r.pin, salt).then(function (k) {
            return enc(k, CHECK).then(function (chk) {
              meta = { salt: salt, check: chk, iter: ITER, createdAt: new Date().toISOString(), by: who() };
              items = {};
              saveLocal();
              var rr = ref(); var p = rr ? rr.set({ meta: meta, items: {} }) : Promise.resolve();
              return Promise.resolve(p).then(function () { key = k; until = Date.now() + UNLOCK_MS; startTimer(); refreshUi(); toast('IOL cost PIN created — unlocked for 20 minutes ✓', 's'); return true; });
            });
          });
        }
        return derive(r.pin, meta.salt).then(function (k) {
          return dec(k, meta.check).then(function (v) {
            if (v !== CHECK) throw new Error('bad');
            key = k; until = Date.now() + UNLOCK_MS;
            return decryptAll().then(function () { startTimer(); refreshUi(); toast('IOL cost prices unlocked for 20 minutes ✓', 's'); return true; });
          });
        }).catch(function () { toast('Wrong PIN', 'w'); return false; });
      });
    });
  };
  function resetPin() {
    if (!confirm('Reset the IOL cost PIN?\n\nAll saved IOL cost prices will be erased (they cannot be read without the old PIN). You will create a new PIN and enter the costs again.')) return Promise.resolve(false);
    meta = null; items = {}; plain = {}; saveLocal();
    var rr = ref(); var p = rr ? rr.remove() : Promise.resolve();
    return Promise.resolve(p).catch(function () {}).then(function () { loaded = false; return window.bmhIolCostUnlock(); });
  }
  window.bmhIolCostLock = function () { lock(false); };
  function setCost(name, value) {
    if (!unlocked()) return Promise.resolve(false);
    var k = nameKey(name); if (!k) return Promise.resolve(false);
    var v = String(value == null ? '' : value).trim();
    if (v === '' || !(Number(v) > 0)) {
      delete items[k]; delete plain[k]; saveLocal();
      var r0 = ref('items/' + k); return Promise.resolve(r0 ? r0.remove() : null).catch(function () {}).then(function () { return true; });
    }
    var n = String(Math.round(Number(v) * 100) / 100);
    return enc(key, n).then(function (o) {
      o.at = new Date().toISOString(); o.by = who();
      items[k] = o; plain[k] = n; saveLocal();
      var r = ref('items/' + k); return Promise.resolve(r ? r.set(o) : null).catch(function () {}).then(function () { return true; });
    });
  }
  function moveCost(oldName, newName) {
    var a = nameKey(oldName), b = nameKey(newName);
    if (!a || !b || a === b || !items[a]) return Promise.resolve();
    items[b] = items[a]; delete items[a];
    if (plain[a] != null) { plain[b] = plain[a]; delete plain[a]; }
    saveLocal();
    var ra = ref('items/' + a), rb = ref('items/' + b);
    return Promise.all([rb ? rb.set(items[b]) : null, ra ? ra.remove() : null]).catch(function () {});
  }
  function costText(name) {
    var k = nameKey(name);
    if (unlocked()) return plain[k] != null ? '₹' + Number(plain[k]).toLocaleString('en-IN') : '—';
    return items[k] ? '₹ ••••' : '₹0';
  }

  // ── catalogue list ──
  var origList = window.renderIolCatalogList;
  if (typeof origList === 'function') {
    window.renderIolCatalogList = function () {
      var r = origList.apply(this, arguments);
      try {
        var el = document.getElementById('set-iol-list'); if (!el) return r;
        if (!loaded) load().then(function () { if (loaded) { try { origList(); } catch (e) {} decorateList(); } });
        decorateList();
      } catch (e) { console.warn('[iol-cost]', e); }
      return r;
    };
  }
  function decorateList() {
    var el = document.getElementById('set-iol-list'); if (!el) return;
    var rows = cat();
    [].forEach.call(el.querySelectorAll('button[onclick^="editIolCatalogRow("]'), function (b) {
      var i = Number((b.getAttribute('onclick').match(/\((\d+)\)/) || [])[1]);
      var row = rows[i]; if (!row) return;
      var box = b.previousElementSibling; if (!box || box.querySelector('.iolc-cost')) return;
      box.insertAdjacentHTML('beforeend', '<div class="iolc-cost" style="font-size:11px;font-weight:800;color:' + (unlocked() ? '#6a1b9a' : '#888') + '">Cost ' + esc(costText(row.name)) + '</div>');
    });
    var bar = document.getElementById('iolc-bar');
    if (!bar) {
      bar = document.createElement('div'); bar.id = 'iolc-bar';
      bar.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:11.5px;margin-bottom:8px;padding:7px 10px;border-radius:8px;background:#f5f0fb;border:1px solid #e1d3f2';
      el.insertBefore(bar, el.firstChild);
    }
    bar.innerHTML = unlocked()
      ? '<span style="flex:1">🔓 <b>Cost prices visible</b> — locks in ' + minsLeft() + ' min</span><button type="button" class="btn btn-xs btn-outline" onclick="bmhIolCostLock()">Lock now</button>'
      : '<span style="flex:1">🔒 Cost prices are hidden.' + (isAdmin() ? ' Admin can unlock with the IOL cost PIN to see or edit them.' : ' Only the admin can see them.') + '</span>' + (isAdmin() ? '<button type="button" class="btn btn-xs btn-gold" onclick="bmhIolCostUnlock()">Unlock (admin PIN)</button>' : '');
  }

  // ── Edit IOL screen ──
  var editing = { i: -1, name: '' };
  function costField(prefix) {
    var id = prefix + '-cost';
    if (unlocked()) return '<div class="form-group" style="margin:0" data-iolc="1"><label class="fl">Cost price (₹) — admin only</label><input id="' + id + '" type="number" min="0" step="0.01" placeholder="Cost price" style="font-size:12px"></div>';
    return '<div class="form-group" style="margin:0" data-iolc="1"><label class="fl">Cost price (₹)</label><div style="display:flex;gap:6px;align-items:center"><input id="' + id + '" value="" placeholder="Hidden" disabled style="font-size:12px;flex:1;background:#f3f3f3"><button type="button" class="btn btn-xs btn-outline" onclick="bmhIolCostUnlock()"' + (isAdmin() ? '' : ' disabled') + '>🔒 ' + (isAdmin() ? 'Unlock' : 'Admin only') + '</button></div></div>';
  }
  function decorateEditor() {
    var m = document.getElementById('iol-catalog-edit-modal'); if (!m || m.style.display === 'none') return;
    var price = document.getElementById('iol-edit-price'); if (!price) return;
    var grp = price.closest('.form-group');
    var old = m.querySelector('[data-iolc]'); if (old) old.remove();
    grp.insertAdjacentHTML('afterend', costField('iol-edit'));
    var lab = grp.querySelector('label'); if (lab) lab.textContent = 'MRP (₹)';
    var c = document.getElementById('iol-edit-cost');
    if (c && unlocked()) { var k = nameKey(editing.name); c.value = plain[k] != null ? plain[k] : ''; }
  }
  var origOpenEd = window.openIolCatalogEditor;
  if (typeof origOpenEd === 'function') {
    window.openIolCatalogEditor = function (i) {
      var r = origOpenEd.apply(this, arguments);
      editing = { i: i, name: (cat()[i] || {}).name || '' };
      try { load().then(decorateEditor); decorateEditor(); } catch (e) {}
      return r;
    };
  }
  var origSaveEd = window.saveIolCatalogEditor;
  if (typeof origSaveEd === 'function') {
    window.saveIolCatalogEditor = function (i) {
      var c = document.getElementById('iol-edit-cost');
      var costVal = c && !c.disabled ? c.value : null;
      var oldName = (cat()[i] || {}).name || editing.name;
      var r = origSaveEd.apply(this, arguments);
      var newName = (cat()[i] || {}).name || oldName;
      moveCost(oldName, newName).then(function () {
        if (costVal !== null && unlocked()) return setCost(newName, costVal).then(function () { refreshUi(); });
        refreshUi();
      });
      return r;
    };
  }
  // ── Add IOL screen ──
  function decorateAdd() {
    var price = document.getElementById('iol-add-price'); if (!price) return;
    var m = document.getElementById('m-add-iol'); if (!m) return;
    var grp = price.closest('.form-group'); if (!grp) return;
    var lab = grp.querySelector('label'); if (lab) lab.textContent = 'MRP (₹)';
    var old = m.querySelector('[data-iolc]'); var keep = old && old.querySelector('input') ? old.querySelector('input').value : '';
    if (old) old.remove();
    grp.insertAdjacentHTML('afterend', costField('iol-add'));
    var c = document.getElementById('iol-add-cost'); if (c && !c.disabled && keep) c.value = keep;
  }
  var origOpenM = window.openM;
  if (typeof origOpenM === 'function') {
    window.openM = function (id) { var r = origOpenM.apply(this, arguments); if (id === 'm-add-iol') { try { decorateAdd(); var c = document.getElementById('iol-add-cost'); if (c && !c.disabled) c.value = ''; } catch (e) {} } return r; };
  }
  var origAdd = window.addIolFromModal;
  if (typeof origAdd === 'function') {
    window.addIolFromModal = function () {
      var name = String((document.getElementById('iol-add-name') || {}).value || '').trim();
      var c = document.getElementById('iol-add-cost');
      var costVal = c && !c.disabled ? c.value : null;
      var before = cat().length;
      var r = origAdd.apply(this, arguments);
      if (name && cat().length > before && costVal && unlocked()) setCost(name, costVal).then(function () { refreshUi(); });
      if (c) c.value = '';
      return r;
    };
  }
  window.bmhIolCost = { unlocked: unlocked, load: load, costText: costText };
})();
