/* BMH — department + centre inventory logins, and department delete PINs.
 * A login with role "Inventory", Department = Eye / OBG / Psychiatry / Skin and Centre = Chandigarh or Ropar
 * (set in Settings → Logins) sees and works on ONLY that department's stock at that centre.
 * Older inventory logins (e.g. "Pharmacy / Store", or Both Centres) and admin see everything, as before.
 *
 * Stores: a store belongs to the centre written in its name (… CHD / … RPR). Shared places without a centre
 * in the name (Labour Room, OBG OT, Eye OT, Minor OT, Procedure Room) are Ropar stock; CHD versions are added,
 * empty, and can be removed from the store list by admin (existing 🗑 next to Store).
 * Department of a store comes from its name (Eye…, OBG… / Labour Room, PSY…, Skin…); Minor OT / Procedure Room
 * use the item's own department.
 *
 * Delete PINs: admin sets one PIN per department (stored encrypted at settings/inventory/deletePins).
 * A department inventory login can delete its own stock rows only after entering its department PIN.
 * Admin deletion keeps working exactly as before.
 *
 * Shared records (purchases, usage, transfers…) are never trimmed — only what is shown on screen is filtered.
 */
(function () {
  'use strict';
  var DEPTS = { ophtho: 'Eye', obg: 'OBG', psych: 'Psychiatry', skin: 'Skin' };
  var SHARED = ['Labour Room', 'OBG OT', 'Eye OT', 'Minor OT', 'Procedure Room'];

  function user() { try { return CURRENT_USER || null; } catch (e) { return window.CURRENT_USER || null; } }
  function isAdmin() { var u = user(); try { return !!(u && (u.isAdmin || (typeof isAdminUser === 'function' && isAdminUser()))); } catch (e) { return !!(u && u.isAdmin); } }
  function deptKey(text) {
    var s = String(text || '').toLowerCase();
    if (/psy|neuro/.test(s)) return 'psych';
    if (/\beye\b|oph|optom/.test(s)) return 'ophtho';
    if (/obg|gyn|obst|labou?r/.test(s)) return 'obg';
    if (/skin|derm|cosm/.test(s)) return 'skin';
    return '';
  }
  function centreKey(c) { var s = String(c || '').toUpperCase(); return /CHD|CHANDIGARH/.test(s) ? 'CHD' : /RPR|ROPAR|RUPNAGAR/.test(s) ? 'RPR' : ''; }
  // Scope of a dedicated department inventory login (null = sees everything)
  function scope() {
    var u = user();
    if (!u || isAdmin() || String(u.role || '') !== 'Inventory') return null;
    var d = deptKey(u.dept), c = centreKey(u.centre);
    return d && c ? { dept: d, centre: c } : null;
  }
  function storeCentre(name) { var s = String(name || ''); return /\bCHD\b/i.test(s) ? 'CHD' : /\bRPR\b/i.test(s) ? 'RPR' : (s ? 'RPR' : ''); }
  function storeDept(name) {
    var s = String(name || '').toLowerCase();
    if (/^eye|eye ot/.test(s)) return 'ophtho';
    if (/^obg|labou?r room/.test(s)) return 'obg';
    if (/^psy/.test(s)) return 'psych';
    if (/^skin/.test(s)) return 'skin';
    return '';
  }
  function itemDept(item) { try { return normalizeDeptKeyForQueue(item.dept || '') || deptKey(item.dept); } catch (e) { return deptKey(item.dept); } }
  function inScope(item, sc) {
    sc = sc || scope(); if (!sc) return true; if (!item) return false;
    var st = item.store || item.toStore || item.fromStore || '';
    var c = st ? storeCentre(st) : (centreKey(item.centre) || 'RPR');
    if (c !== sc.centre) return false;
    var d = storeDept(st) || itemDept(item);
    return d === sc.dept;
  }
  function storeInScope(name, sc) {
    sc = sc || scope(); if (!sc) return true;
    if (storeCentre(name) !== sc.centre) return false;
    var d = storeDept(name);
    return !d || d === sc.dept;
  }

  // ── keep a department login's working stock list to its own stock ──
  function inv() { try { return INVENTORY; } catch (e) { return null; } }
  function prune() {
    var sc = scope(), arr = inv(); if (!sc || !arr) return 0;
    var n = 0;
    for (var i = arr.length - 1; i >= 0; i--) {
      if (!inScope(arr[i], sc)) {
        var it = arr[i]; arr.splice(i, 1); n++;
        try { if (BCMAP && it && it.barcode && BCMAP[it.barcode] === it) delete BCMAP[it.barcode]; } catch (e) {}
      }
    }
    return n;
  }
  var origApply = window.bmhApplyInventoryMergedRow;
  if (typeof origApply === 'function') {
    window.bmhApplyInventoryMergedRow = function (row) {
      var r = origApply.apply(this, arguments);
      try {
        var sc = scope();
        if (sc && row && row.barcode && !inScope(row, sc)) {
          var arr = inv(), k = String(row.barcode);
          var idx = arr ? arr.findIndex(function (x) { return String(x.barcode || '') === k; }) : -1;
          if (idx > -1) arr.splice(idx, 1);
          try { if (BCMAP && BCMAP[k]) delete BCMAP[k]; } catch (e) {}
        }
      } catch (e) {}
      return r;
    };
  }

  // ── show only own records in the lists (shared records are left untouched) ──
  var SWAP = ['BMH_PURCHASES', 'BMH_INVENTORY_USAGE', 'BMH_INVENTORY_TRANSFERS', 'BMH_INVENTORY_INDENTS', 'BMH_INVENTORY_REMOVALS'];
  function rowInScope(row, sc) {
    if (!row) return false;
    if (row.fromStore || row.toStore) return (!!row.fromStore && storeInScope(row.fromStore, sc) && (storeDept(row.fromStore) || itemDept(row)) === sc.dept) || (!!row.toStore && storeInScope(row.toStore, sc) && (storeDept(row.toStore) || itemDept(row)) === sc.dept);
    if (row.store) return inScope({ store: row.store, dept: row.dept }, sc);
    var d = itemDept(row);
    return d === sc.dept && (!row.centre || centreKey(row.centre) === sc.centre);
  }
  function withScopedLists(fn, self, args) {
    var sc = scope();
    if (!sc) return fn.apply(self, args);
    prune();
    var saved = {}, guards = {};
    SWAP.forEach(function (k) {
      var a = window[k]; if (!Array.isArray(a)) return;
      saved[k] = a.slice();
      var keep = a.filter(function (r) { return rowInScope(r, sc); });
      a.length = 0; keep.forEach(function (r) { a.push(r); });
    });
    ['saveBmhFinancials', 'queueBmhFinancialsRemoteSync'].forEach(function (f) { guards[f] = window[f]; window[f] = function () {}; });
    try { return fn.apply(self, args); }
    finally {
      Object.keys(guards).forEach(function (f) { window[f] = guards[f]; });
      Object.keys(saved).forEach(function (k) { var a = window[k]; a.length = 0; saved[k].forEach(function (r) { a.push(r); }); });
    }
  }
  ['renderInventoryPurchaseLog', 'renderInventoryUsageLog', 'renderInventoryTodayEntries', 'renderInventoryIndents', 'renderInventoryTransfers',
    'renderInventoryStoreStock', 'renderInventoryPoAlerts', 'renderStockList', 'renderInventoryExpiryCheck'].forEach(function (name) {
    var orig = window[name];
    if (typeof orig !== 'function') return;
    var w = function () { return withScopedLists(orig, this, arguments); };
    if (orig._bmhPerfWrapped) w._bmhPerfWrapped = true;
    window[name] = w;
  });
  var origStores = window.bmhInventoryStoreOptions;
  if (typeof origStores === 'function') {
    window.bmhInventoryStoreOptions = function () {
      var list = origStores.apply(this, arguments) || [];
      var sc = scope();
      return sc ? list.filter(function (s) { return storeInScope(s, sc); }) : list;
    };
  }

  // ── CHD versions of shared stores (added once, empty; admin can remove any) ──
  function ensureChdStores() {
    if (!isAdmin()) return;
    try { if (localStorage.getItem('bmh_store_split_chd_v1') === '1') return; } catch (e) {}
    var list = window.BMH_STORE_LOCATIONS || [];
    var hidden = []; try { hidden = loadInventoryHiddenStoreLocations() || []; } catch (e) {}
    var low = function (s) { return String(s || '').trim().toLowerCase(); };
    var added = 0;
    SHARED.forEach(function (s) {
      var name = s + ' CHD';
      if (list.some(function (x) { return low(x) === low(name); }) || hidden.some(function (x) { return low(x) === low(name); })) return;
      list.push(name); added++;
    });
    window.BMH_STORE_LOCATIONS = list;
    if (added) { try { saveInventoryStoreLocations(); } catch (e) {} try { bmhPopulateInventorySelectors(); } catch (e) {} }
    try { localStorage.setItem('bmh_store_split_chd_v1', '1'); } catch (e) {}
  }

  // ── department delete PINs ──
  // small synchronous SHA-256 (PINs are checked at the moment of deleting)
  function sha256(ascii) {
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    var mp = Math.pow, max = mp(2, 32), res = '', words = [], bl = ascii.length * 8, hash = [], k = [], pc = 0, isC = {};
    for (var c = 2; pc < 64; c++) { if (!isC[c]) { for (var i = 0; i < 313; i += c) isC[i] = c; hash[pc] = (mp(c, .5) * max) | 0; k[pc++] = (mp(c, 1 / 3) * max) | 0; } }
    hash = hash.slice(0, 8);
    ascii += '\x80'; while (ascii.length % 64 - 56) ascii += '\x00';
    for (i = 0; i < ascii.length; i++) { var j = ascii.charCodeAt(i); words[i >> 2] |= j << ((3 - i) % 4) * 8; }
    words[words.length] = ((bl / max) | 0); words[words.length] = bl;
    for (j = 0; j < words.length;) {
      var w = words.slice(j, j += 16), oh = hash; hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = hash[0], e = hash[4];
        var t1 = hash[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0);
        var t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(t1 + t2) | 0].concat(hash); hash[4] = (hash[4] + t1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oh[i]) | 0;
    }
    for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) { var b = (hash[i] >> (j * 8)) & 255; res += ((b < 16) ? 0 : '') + b.toString(16); }
    return res;
  }
  function pinHash(pin, salt) { var h = salt + '|' + pin; for (var i = 0; i < 1500; i++) h = sha256(h + salt); return h; }
  var PINS = {};
  function loadPins() {
    if (!window.FBDB) return;
    window.FBDB.ref('settings/inventory/deletePins').once('value').then(function (s) { PINS = s.val() || {}; }).catch(function () {});
  }
  var origRequire = window.bmhRequireInventoryDeletePin;
  var validUntil = 0;
  window.bmhRequireInventoryDeletePin = function () {
    if (isAdmin() || !window.__bmhScopedDeleteOK) return origRequire.apply(this, arguments);
    var sc = scope();
    if (!sc) return origRequire.apply(this, arguments);
    if (Date.now() < validUntil) return true;
    var rec = PINS[sc.dept];
    if (!rec || !rec.hash) { try { showToast('No delete PIN set for ' + DEPTS[sc.dept] + ' yet — ask the admin to set it', 'w'); } catch (e) {} loadPins(); return false; }
    var pin = window.prompt('Enter the ' + DEPTS[sc.dept] + ' inventory delete PIN');
    if (pin == null) return false;
    if (pinHash(String(pin).trim(), rec.salt) !== rec.hash) { try { showToast('Incorrect delete PIN', 'w'); } catch (e) {} return false; }
    validUntil = Date.now() + 10 * 60e3;
    try { showToast('Delete PIN accepted for 10 minutes', 's'); } catch (e) {}
    return true;
  };
  ['deleteInventoryItemsPrompt', 'deleteInventoryStockRow', 'deleteInventoryIolGroup'].forEach(function (name) {
    var orig = window[name]; if (typeof orig !== 'function') return;
    window[name] = function () {
      window.__bmhScopedDeleteOK = !!scope();
      try { return orig.apply(this, arguments); } finally { window.__bmhScopedDeleteOK = false; }
    };
  });
  window.bmhInvScopedDeleteAllowed = function () { return !!window.__bmhScopedDeleteOK && !!scope(); };

  // Admin: set the department delete PINs
  window.bmhOpenDeletePins = function () {
    if (!isAdmin()) { try { showToast('Only admin can set delete PINs', 'w'); } catch (e) {} return; }
    var old = document.getElementById('bmh-delpin-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'bmh-delpin-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,20,40,.5);z-index:5000;display:flex;align-items:center;justify-content:center;padding:16px';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:380px;width:100%;padding:16px 18px">'
      + '<div style="font-size:15px;font-weight:900;color:#1A3C6E;margin-bottom:4px">🔐 Department delete PINs</div>'
      + '<div style="font-size:11.5px;color:#555;margin-bottom:10px">Used when a department inventory login deletes its own stock. Admin deletion still uses the admin PIN.</div>'
      + Object.keys(DEPTS).map(function (d) { return '<div style="font-size:12px;margin:3px 0">' + DEPTS[d] + ': <b>' + (PINS[d] && PINS[d].hash ? 'set ✓' : 'not set') + '</b></div>'; }).join('')
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px"><div class="form-group" style="margin:0;grid-column:1/-1"><label class="fl">Department</label><select id="bmh-dp-dept">' + Object.keys(DEPTS).map(function (d) { return '<option value="' + d + '">' + DEPTS[d] + '</option>'; }).join('') + '</select></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">New PIN</label><input type="password" inputmode="numeric" id="bmh-dp-1" autocomplete="off"></div><div class="form-group" style="margin:0"><label class="fl">Repeat PIN</label><input type="password" inputmode="numeric" id="bmh-dp-2" autocomplete="off"></div></div>'
      + '<div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-gray" style="flex:1" onclick="document.getElementById(\'bmh-delpin-ov\').remove()">Close</button><button class="btn btn-gold" style="flex:1" id="bmh-dp-save">Save PIN</button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#bmh-dp-save').onclick = function () {
      var d = ov.querySelector('#bmh-dp-dept').value, a = ov.querySelector('#bmh-dp-1').value.trim(), b = ov.querySelector('#bmh-dp-2').value.trim();
      if (!/^\d{4,6}$/.test(a)) { try { showToast('PIN must be 4–6 digits', 'w'); } catch (e) {} return; }
      if (a !== b) { try { showToast('The two PINs do not match', 'w'); } catch (e) {} return; }
      var salt = Math.random().toString(36).slice(2) + Date.now().toString(36);
      var rec = { salt: salt, hash: pinHash(a, salt), setAt: new Date().toISOString(), setBy: (user() || {}).name || 'Admin' };
      var done = function () { PINS[d] = rec; try { showToast(DEPTS[d] + ' delete PIN saved ✓', 's'); } catch (e) {} window.bmhOpenDeletePins(); };
      if (window.FBDB) window.FBDB.ref('settings/inventory/deletePins/' + d).set(rec).then(done, function () { try { showToast('Could not save — check connection', 'w'); } catch (e) {} });
      else done();
    };
  };

  // ── page adjustments when the inventory page opens ──
  function adjustPage() {
    var page = document.getElementById('pg-inventory'); if (!page) return;
    var sc = scope();
    // admin button for delete PINs
    if (isAdmin() && !page.querySelector('.bmh-delpin-btn')) {
      var hd = page.querySelector('.card .card-hd');
      if (hd) hd.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn-outline btn-xs bmh-delpin-btn" style="margin-left:auto" onclick="bmhOpenDeletePins()">🔐 Delete PINs</button>');
    }
    // department login: own banner, own department preselected, no hospital ledger tab
    if (sc) {
      var title = page.querySelector('.card .card-title');
      if (title && !page.querySelector('.bmh-scope-tag')) title.insertAdjacentHTML('beforeend', ' <span class="bmh-scope-tag" style="font-size:11px;font-weight:800;background:#eef3fb;color:#1A3C6E;border-radius:10px;padding:2px 9px;margin-left:6px">' + DEPTS[sc.dept] + ' · ' + (sc.centre === 'CHD' ? 'Chandigarh' : 'Ropar') + ' stock only</span>');
      page.querySelectorAll('.ptab').forEach(function (t) { if (/inv-ocr/.test(t.getAttribute('onclick') || '')) t.style.display = 'none'; });
      var dsel = document.getElementById('inv-in-dept');
      if (dsel && [].some.call(dsel.options, function (o) { return o.value === sc.dept; })) { dsel.value = sc.dept; }
      prune();
    }
  }
  var origInit = window.initInventory;
  if (typeof origInit === 'function') {
    window.initInventory = function () { var r = origInit.apply(this, arguments); try { ensureChdStores(); adjustPage(); } catch (e) { console.warn('[inv-scope]', e); } return r; };
  }
  function start() {
    loadPins();
    setInterval(function () { try { if (scope()) prune(); } catch (e) {} }, 4000);
    setTimeout(function () { try { ensureChdStores(); } catch (e) {} }, 15000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.bmhInvScope = { scope: scope, inScope: inScope, storeInScope: storeInScope, storeCentre: storeCentre, storeDept: storeDept, deptKey: deptKey, prune: prune, pinHash: pinHash, sha256: sha256 };
})();
