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
  // Doctors (not admin): their own department, both centres — on screen only; their clinic work is untouched.
  function docScope() {
    var u = user();
    if (!u || isAdmin() || String(u.role || '') !== 'Doctor') return null;
    var d = deptKey(u.dept);
    return d ? { dept: d, centre: 'ALL', doctor: true } : null;
  }
  function anyScope() { return scope() || docScope(); }
  function storeCentre(name) { var s = String(name || ''); return /\bCHD\b/i.test(s) ? 'CHD' : /\bRPR\b/i.test(s) ? 'RPR' : (s ? 'RPR' : ''); }
  function storeDept(name) {
    // a department set by admin for this store (Move store to department) comes first
    try { var o = window.__bmhStoreDeptOverride && window.__bmhStoreDeptOverride(name); if (o) return o; } catch (e) {}
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
    if (sc.centre !== 'ALL' && c !== sc.centre) return false;
    var d = storeDept(st) || itemDept(item);
    return d === sc.dept;
  }
  function storeInScope(name, sc) {
    sc = sc || anyScope(); if (!sc) return true;
    if (sc.centre !== 'ALL' && storeCentre(name) !== sc.centre) return false;
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
    return d === sc.dept && (sc.centre === 'ALL' || !row.centre || centreKey(row.centre) === sc.centre);
  }
  function withScopedLists(fn, self, args) {
    var sc = anyScope();
    if (!sc) return fn.apply(self, args);
    if (!sc.doctor) prune();
    var saved = {}, guards = {}, invSaved = null, arr = inv();
    if (sc.doctor && arr) {
      invSaved = arr.slice();
      var keepI = arr.filter(function (r) { return inScope(r, sc); });
      arr.length = 0; keepI.forEach(function (r) { arr.push(r); });
    }
    SWAP.forEach(function (k) {
      var a = window[k]; if (!Array.isArray(a)) return;
      saved[k] = a.slice();
      var keep = a.filter(function (r) { return rowInScope(r, sc); });
      a.length = 0; keep.forEach(function (r) { a.push(r); });
    });
    ['saveBmhFinancials', 'queueBmhFinancialsRemoteSync', 'saveInventoryStockToStorage'].forEach(function (f) { guards[f] = window[f]; window[f] = function () {}; });
    try { return fn.apply(self, args); }
    finally {
      if (invSaved) { arr.length = 0; invSaved.forEach(function (r) { arr.push(r); }); }
      Object.keys(guards).forEach(function (f) { window[f] = guards[f]; });
      Object.keys(saved).forEach(function (k) { var a = window[k]; a.length = 0; saved[k].forEach(function (r) { a.push(r); }); });
    }
  }
  ['renderInventoryPurchaseLog', 'renderInventoryUsageLog', 'renderInventoryTodayEntries', 'renderInventoryIndents', 'renderInventoryTransfers',
    'renderInventoryStoreStock', 'renderInventoryPoAlerts', 'renderStockList', '_renderStockListNow', 'renderInventoryExpiryCheck'].forEach(function (name) {
    var orig = window[name];
    if (typeof orig !== 'function') return;
    var w = function () { return withScopedLists(orig, this, arguments); };
    if (orig._bmhPerfWrapped) w._bmhPerfWrapped = true;
    window[name] = w;
  });
  var origStores = window.bmhInventoryStoreOptions;
  if (typeof origStores === 'function') {
    window.bmhInventoryStoreOptions = function () {
      var list = (origStores.apply(this, arguments) || []).slice();
      // every store that holds stock (as in Current Stock) is offered too, even if missing from the saved store list
      try {
        var low = function (x) { return String(x || '').trim().toLowerCase().replace(/\s+/g, ' '); };
        var have = {}; list.forEach(function (x) { have[low(x)] = 1; });
        var hid = {}; try { (loadInventoryHiddenStoreLocations() || []).forEach(function (x) { hid[low(x)] = 1; }); } catch (e) {}
        (inv() || []).forEach(function (r) {
          var st = r && String(r.store || '').trim(); if (!st) return;
          var k = low(st); if (have[k] || hid[k]) return;
          have[k] = 1; list.push(st);
        });
      } catch (e) {}
      var sc = anyScope();
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
    // never saved from here: on a fresh browser the saved list may not have loaded yet, and saving would overwrite it
    if (added) { try { bmhPopulateInventorySelectors(); } catch (e) {} }
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
    var sc = anyScope();
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
      window.__bmhScopedDeleteOK = !!anyScope();
      try { return orig.apply(this, arguments); } finally { window.__bmhScopedDeleteOK = false; }
    };
  });
  window.bmhInvScopedDeleteAllowed = function () { return !!window.__bmhScopedDeleteOK && !!anyScope(); };

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

  // ── recently added stock (inventory page) and login notice ──
  function esc(x) { return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function tsOf(r) { return Date.parse(r.ts || r.date || r.createdAt || '') || 0; }
  function fmt(ms) { try { return new Date(ms).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }
  function recentPurchases(sc, sinceMs) {
    return (window.BMH_PURCHASES || []).filter(function (r) { return r && tsOf(r) > sinceMs && rowInScope(r, sc); }).sort(function (a, b) { return tsOf(b) - tsOf(a); });
  }
  function purchaseRowsHtml(rows) {
    return rows.slice(0, 40).map(function (r) {
      return '<div style="padding:6px 0;border-bottom:1px solid var(--g5,#eee);font-size:12px;display:flex;gap:8px;justify-content:space-between"><div><b>' + esc(r.itemName || '') + '</b><div style="font-size:10.5px;color:#666">' + esc([r.store, r.vendor, r.batchNo ? 'Batch ' + r.batchNo : '', r.exp ? 'Exp ' + r.exp : ''].filter(Boolean).join(' · ')) + '</div></div><div style="text-align:right;white-space:nowrap"><b>+' + esc(r.qty || '') + '</b><div style="font-size:10.5px;color:#666">' + esc(fmt(tsOf(r))) + '</div></div></div>';
    }).join('');
  }
  function addRecentCard(page, sc) {
    var old = page.querySelector('#bmh-inv-recent'); if (old) old.remove();
    var rows = recentPurchases(sc, Date.now() - 14 * 864e5);
    var col = page.querySelector('.g32 > .col'); if (!col) return;
    col.insertAdjacentHTML('afterbegin', '<div class="card" id="bmh-inv-recent"><div class="card-hd"><div><div class="card-title">🆕 Recently added stock — ' + DEPTS[sc.dept] + '</div><div class="card-sub">Last 14 days' + (sc.centre !== 'ALL' ? ' · ' + sc.centre : ' · both centres') + '</div></div></div>'
      + (rows.length ? '<div style="max-height:260px;overflow:auto">' + purchaseRowsHtml(rows) + '</div>' : '<div style="font-size:12px;color:var(--g1);padding:6px 0">No stock added in the last 14 days.</div>') + '</div>');
  }
  function userSlug() { var u = user() || {}; return String(u.username || u.name || 'user').toLowerCase().replace(/[^a-z0-9]+/g, '_'); }
  function seenKey() { return 'bmh_inv_seen_' + userSlug(); }
  function getSeen() {
    var local = 0; try { local = Number(localStorage.getItem(seenKey()) || 0); } catch (e) {}
    if (!window.FBDB) return Promise.resolve(local);
    return window.FBDB.ref('inventorySeen/' + userSlug()).once('value').then(function (s) { return Math.max(local, Number(s.val() || 0)); }).catch(function () { return local; });
  }
  function setSeen(ms) {
    try { localStorage.setItem(seenKey(), String(ms)); } catch (e) {}
    if (window.FBDB) window.FBDB.ref('inventorySeen/' + userSlug()).set(ms).catch(function () {});
  }
  var noticeFor = '';
  function loginNotice() {
    var sc = docScope(); var u = user();
    if (!sc || !u || !u.name) return;
    if (noticeFor === u.name) return;
    if (!(window.BMH_PURCHASES || []).length) return;   // wait until stock records have loaded
    noticeFor = u.name;
    getSeen().then(function (seen) {
      var since = seen || (Date.now() - 3 * 864e5);
      var rows = recentPurchases(sc, since);
      if (!rows.length) { if (!seen) setSeen(Date.now()); return; }
      var ov = document.createElement('div'); ov.id = 'bmh-inv-notice';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,20,40,.45);z-index:4200;display:flex;align-items:center;justify-content:center;padding:16px';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:440px;width:100%;padding:16px 18px;max-height:80vh;display:flex;flex-direction:column">'
        + '<div style="font-size:15px;font-weight:900;color:#1A3C6E">📦 New stock added — ' + DEPTS[sc.dept] + '</div><div style="font-size:11.5px;color:#666;margin:2px 0 8px">' + rows.length + ' item' + (rows.length > 1 ? 's' : '') + ' since ' + esc(fmt(since)) + '</div>'
        + '<div style="overflow:auto;flex:1">' + purchaseRowsHtml(rows) + '</div>'
        + '<div style="display:flex;gap:8px;margin-top:10px"><button class="btn btn-gray" style="flex:1" id="bmh-inv-dismiss">Dismiss</button>'
        + (document.querySelector('.ni[onclick*="nav(\'inventory\'"]') ? '<button class="btn btn-gold" style="flex:1" id="bmh-inv-view">View in inventory</button>' : '') + '</div></div>';
      document.body.appendChild(ov);
      var close = function () { setSeen(Date.now()); ov.remove(); };
      ov.querySelector('#bmh-inv-dismiss').onclick = close;
      var v = ov.querySelector('#bmh-inv-view');
      if (v) v.onclick = function () { close(); try { nav('inventory', document.querySelector('.ni[onclick*="nav(\'inventory\'"]')); } catch (e) {} };
    });
  }
  // ── tracking: medicine-wise and patient-wise movement (doctor / admin only) ──
  function addTrackCard(page, ds) {
    if (page.querySelector('#bmh-inv-track')) return;
    var col = page.querySelector('.g32 > .col'); if (!col) return;
    col.insertAdjacentHTML('beforeend', '<div class="card" id="bmh-inv-track"><div class="card-hd"><div><div class="card-title">🔎 Track stock movement</div><div class="card-sub">' + (ds ? DEPTS[ds.dept] + ' · ' : '') + 'Search a medicine / item, or a patient (BMSH ID or name)</div></div></div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap"><input type="text" id="bmh-track-q" placeholder="e.g. Ceftriaxone or BMSH-123456 or Mandeep" style="flex:1;min-width:200px" oninput="bmhInvTrack()"><select id="bmh-track-days" onchange="bmhInvTrack()"><option value="30">Last 30 days</option><option value="90">Last 3 months</option><option value="365">Last 12 months</option><option value="0">All time</option></select></div>'
      + '<div id="bmh-track-out" style="margin-top:8px;font-size:12px;color:var(--g1)">Type at least 3 letters.</div></div>');
  }
  window.bmhInvTrack = function () {
    var q = String((document.getElementById('bmh-track-q') || {}).value || '').trim().toLowerCase();
    var days = Number((document.getElementById('bmh-track-days') || {}).value || 0);
    var out = document.getElementById('bmh-track-out'); if (!out) return;
    if (q.length < 3) { out.innerHTML = 'Type at least 3 letters.'; return; }
    var ds = docScope(); var since = days ? Date.now() - days * 864e5 : 0;
    var rows = (window.BMH_INVENTORY_USAGE || []).filter(function (r) {
      if (!r || (since && tsOf(r) < since)) return false;
      if (ds && !rowInScope(r, ds)) return false;
      return [r.itemName, r.barcode, r.bmhId, r.patientName, r.procedure].some(function (x) { return String(x || '').toLowerCase().indexOf(q) >= 0; });
    }).sort(function (a, b) { return tsOf(b) - tsOf(a); });
    if (!rows.length) { out.innerHTML = 'No usage found.'; return; }
    var byItem = {}, byPt = {};
    rows.forEach(function (r) {
      var ik = r.itemName || r.barcode; byItem[ik] = byItem[ik] || { qty: 0, pts: {} }; byItem[ik].qty += Number(r.qty || 1); byItem[ik].pts[r.bmhId || r.patientName] = 1;
      var pk = (r.bmhId || '') + '|' + (r.patientName || ''); byPt[pk] = (byPt[pk] || 0) + Number(r.qty || 1);
    });
    var sum = '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">' + Object.keys(byItem).slice(0, 8).map(function (k) { return '<span style="background:#eef3fb;border-radius:8px;padding:3px 8px;color:#1A3C6E"><b>' + esc(k) + '</b>: ' + byItem[k].qty + ' to ' + Object.keys(byItem[k].pts).length + ' patient' + (Object.keys(byItem[k].pts).length > 1 ? 's' : '') + '</span>'; }).join('') + '</div>';
    out.innerHTML = sum + '<div style="max-height:320px;overflow:auto"><table style="width:100%;border-collapse:collapse;font-size:11.5px;color:#111"><thead><tr style="background:var(--g6,#f3f4f6)"><th style="text-align:left;padding:4px">Date</th><th style="text-align:left;padding:4px">Patient</th><th style="text-align:left;padding:4px">Item</th><th style="padding:4px">Qty</th><th style="text-align:left;padding:4px">Where / why</th></tr></thead><tbody>'
      + rows.slice(0, 300).map(function (r) { return '<tr style="border-bottom:1px solid #eee"><td style="padding:4px;white-space:nowrap">' + esc(fmt(tsOf(r))) + '</td><td style="padding:4px">' + esc(r.patientName || '') + '<div style="font-size:10px;color:#666">' + esc(r.bmhId || '') + '</div></td><td style="padding:4px">' + esc(r.itemName || '') + '</td><td style="padding:4px;text-align:center">' + esc(r.qty || 1) + '</td><td style="padding:4px">' + esc([r.store, r.procedure, r.source].filter(Boolean).join(' · ')) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  };

  // ── stock ledger: how an item's stock came down (or up) to today's level, date by date ──
  function nk(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
  function itemGroups(q, ds) {
    var g = {};
    (inv() || []).forEach(function (it) {
      if (!it || !(it.name || it.barcode)) return;
      if (ds && !inScope(it, ds)) return;
      var hay = [it.name, it.genericName, it.barcode, it.company].map(nk).join(' ');
      if (hay.indexOf(q) < 0) return;
      var k = nk(it.name || it.barcode);
      var x = g[k] || (g[k] = { key: k, name: it.name || it.barcode, items: [], barcodes: {}, stock: 0, stores: {} });
      x.items.push(it); if (it.barcode) x.barcodes[it.barcode] = 1; x.stock += Math.max(0, Number(it.stock) || 0); if (it.store) x.stores[it.store] = 1;
    });
    return Object.keys(g).map(function (k) { return g[k]; }).sort(function (a, b) { return (a.key.indexOf(q) === 0 ? 0 : 1) - (b.key.indexOf(q) === 0 ? 0 : 1) || a.name.localeCompare(b.name); });
  }
  function belongs(r, grp) { return !!r && ((r.barcode && grp.barcodes[r.barcode]) || nk(r.itemName) === grp.key); }
  function movements(grp, ds) {
    var mv = [];
    var inS = function (store) { return !ds || storeInScope(store, ds); };
    (window.BMH_PURCHASES || []).forEach(function (p) {
      if (!belongs(p, grp) || (ds && !rowInScope(p, ds))) return;
      var q = Number(p.qty) || 0; if (!q) return;
      var ret = q < 0 || /^RET/.test(String(p.id || ''));
      mv.push({ t: tsOf(p), d: q, kind: ret ? 'return' : 'in', what: ret ? 'Returned to vendor' + (p.vendor ? ' — ' + p.vendor : '') + (p.reason ? ' (' + p.reason + ')' : '') : 'Stock added' + (p.vendor ? ' — ' + p.vendor : '') + (p.invoiceNo ? ' · Inv ' + p.invoiceNo : ''), where: p.store || '', by: p.user || p.by || '' });
    });
    (window.BMH_INVENTORY_USAGE || []).forEach(function (u) {
      if (!belongs(u, grp) || (ds && !rowInScope(u, ds))) return;
      var q = Number(u.qty) || 0; if (!q) return;
      mv.push({ t: tsOf(u), d: -q, kind: 'use', what: (u.patientName || u.bmhId || 'Patient') + (u.bmhId && u.patientName ? ' (' + u.bmhId + ')' : ''), why: [u.procedure, u.source === 'ipd' ? 'IPD' : ''].filter(Boolean).join(' · '), where: u.store || '', by: u.user || u.by || '' });
    });
    (window.BMH_INVENTORY_REMOVALS || []).forEach(function (r) {
      if (!belongs(r, grp) || (ds && !rowInScope(r, ds))) return;
      var q = Number(r.qty) || 0; if (!q) return;
      mv.push({ t: tsOf(r), d: -q, kind: 'out', what: 'Removed' + (r.reason ? ' — ' + r.reason : ''), where: r.store || '', by: r.user || '' });
    });
    (window.BMH_INVENTORY_TRANSFERS || []).forEach(function (r) {
      if (!belongs(r, grp)) return;
      var q = Number(r.qty) || 0; if (!q) return;
      if (r.kind === 'indent-receive') { // stock received on an indent (from Pharmacy): only added to the department
        if (inS(r.toStore)) mv.push({ t: tsOf(r), d: q, kind: 'in', what: 'Received from ' + (r.fromStore || 'Pharmacy') + (r.indentNo ? ' · Indent ' + r.indentNo : ''), where: r.toStore || '', by: r.user || '' });
        return;
      }
      var a = inS(r.fromStore), b = inS(r.toStore);
      if (!a && !b) return;
      var d = a && b ? 0 : (b ? q : -q);
      mv.push({ t: tsOf(r), d: d, kind: 'move', what: 'Moved ' + q + ': ' + (r.fromStore || '?') + ' → ' + (r.toStore || '?'), where: '', by: r.user || '' });
    });
    mv.sort(function (a, b) { return a.t - b.t; });
    // walk back from today's stock to find the balance after each entry
    var bal = grp.stock;
    for (var i = mv.length - 1; i >= 0; i--) { mv[i].bal = bal; bal -= mv[i].d; }
    return { list: mv, start: bal };
  }
  function dShort(ms) { try { return new Date(ms).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }); } catch (e) { return ''; } }
  function ledgerData(grp, ds, since) {
    var m = movements(grp, ds);
    var inP = m.list.filter(function (x) { return !since || x.t >= since; });
    var opening = inP.length ? inP[0].bal - inP[0].d : grp.stock;
    var sum = function (k) { return inP.filter(function (x) { return k(x); }).reduce(function (t, x) { return t + Math.abs(x.d); }, 0); };
    return { grp: grp, list: inP, opening: opening, added: sum(function (x) { return x.d > 0 && x.kind === 'in'; }) + sum(function (x) { return x.d > 0 && x.kind === 'move'; }), used: sum(function (x) { return x.kind === 'use'; }), removed: sum(function (x) { return x.d < 0 && x.kind !== 'use'; }), pts: Object.keys(inP.filter(function (x) { return x.kind === 'use'; }).reduce(function (o, x) { o[x.what] = 1; return o; }, {})).length, gap: m.start < 0 };
  }
  var DCOL = { in: '#1a8c3c', move: '#555', use: '#b71c1c', out: '#b55a00', return: '#b55a00' };
  function ledgerHtml(L) {
    var g = L.grp;
    var head = '<div style="border:1px solid #dfe5ef;border-radius:10px;padding:9px 11px;margin-bottom:10px;background:#fbfcfe">'
      + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:180px"><div style="font-size:13.5px;font-weight:900;color:#1A3C6E">' + esc(g.name) + '</div><div style="font-size:10.5px;color:#666">' + esc(Object.keys(g.stores).join(', ')) + '</div></div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;font-size:11px">'
      + pill('Opening', L.opening, '#1A3C6E') + pill('Added', '+' + L.added, '#1a8c3c') + pill('Used', '−' + L.used + (L.pts ? ' (' + L.pts + ' pt)' : ''), '#b71c1c') + (L.removed ? pill('Removed / returned', '−' + L.removed, '#b55a00') : '') + pill('Now', g.stock, '#111') + '</div></div>';
    if (!L.list.length) return head + '<div style="font-size:11.5px;color:#888;margin-top:6px">No movement in this period — stock has stayed at ' + g.stock + '.</div></div>';
    var rows = L.list.slice().reverse().map(function (x) {
      return '<tr style="border-bottom:1px solid #eee"><td style="padding:3px 5px;white-space:nowrap">' + esc(fmt(x.t)) + '</td><td style="padding:3px 5px">' + esc(x.what) + (x.why ? '<div style="font-size:10px;color:#666">' + esc(x.why) + '</div>' : '') + '</td><td style="padding:3px 5px;font-size:10.5px;color:#666">' + esc(x.where) + '</td><td style="padding:3px 5px;text-align:right;font-weight:800;color:' + (DCOL[x.kind] || '#111') + '">' + (x.d > 0 ? '+' : x.d < 0 ? '−' : '') + Math.abs(x.d || 0) + '</td><td style="padding:3px 5px;text-align:right;font-weight:800">' + x.bal + '</td></tr>';
    }).join('');
    return head + '<div style="max-height:300px;overflow:auto;margin-top:6px"><table style="width:100%;border-collapse:collapse;font-size:11.5px;color:#111"><thead><tr style="background:#f1f4f9"><th style="text-align:left;padding:3px 5px">Date</th><th style="text-align:left;padding:3px 5px">Patient / entry</th><th style="text-align:left;padding:3px 5px">Store</th><th style="text-align:right;padding:3px 5px">Qty</th><th style="text-align:right;padding:3px 5px">Balance</th></tr></thead><tbody>' + rows
      + '<tr style="background:#f6f7fa"><td style="padding:3px 5px" colspan="4"><b>Opening stock</b> (start of period)</td><td style="padding:3px 5px;text-align:right;font-weight:900">' + L.opening + '</td></tr></tbody></table></div>'
      + (L.gap ? '<div style="font-size:10.5px;color:#b55a00;margin-top:4px">Some older stock changes were made without a record (e.g. a stock count edited by hand), so the earliest balances are approximate.</div>' : '') + '</div>';
  }
  function pill(l, v, c) { return '<span style="background:#fff;border:1px solid #e3e6ee;border-radius:8px;padding:2px 7px"><span style="color:#666">' + l + '</span> <b style="color:' + c + '">' + esc(v) + '</b></span>'; }
  var lastPrint = null;
  function periodLabel(days) { return days ? 'Last ' + (days === 30 ? '30 days' : days === 90 ? '3 months' : days === 365 ? '12 months' : days + ' days') : 'All time'; }
  window.bmhInvTrackPrint = function () {
    if (!lastPrint) return;
    var P = lastPrint, hosp = 'Baweja Multispeciality Hospital';
    try { hosp = getHospitalDetailValue('Hospital Name', hosp); } catch (e) {}
    var blocks = '';
    P.ledgers.forEach(function (L) {
      blocks += '<div class="it"><b>' + esc(L.grp.name) + '</b> — Opening ' + L.opening + ' · Added +' + L.added + ' · Used −' + L.used + (L.removed ? ' · Removed −' + L.removed : '') + ' · <b>Now ' + L.grp.stock + '</b></div>';
      blocks += '<div class="e o"><span>Opening stock</span><b>' + L.opening + '</b></div>';
      L.list.forEach(function (x) {
        blocks += '<div class="e"><span class="dt">' + esc(dShort(x.t)) + '</span> <span class="q ' + x.kind + '">' + (x.d > 0 ? '+' : x.d < 0 ? '−' : '·') + Math.abs(x.d || 0) + '</span> ' + esc(x.what) + (x.why ? ' <i>' + esc(x.why) + '</i>' : '') + ' <b class="b">= ' + x.bal + '</b></div>';
      });
    });
    if (!P.ledgers.length) {
      P.usage.forEach(function (r) { blocks += '<div class="e"><span class="dt">' + esc(dShort(tsOf(r))) + '</span> <span class="q use">−' + esc(r.qty || 1) + '</span> ' + esc(r.itemName || '') + ' — ' + esc(r.patientName || '') + ' ' + esc(r.bmhId || '') + (r.procedure ? ' <i>' + esc(r.procedure) + '</i>' : '') + '</div>'; });
    }
    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Stock movement</title><style>'
      + '@page{size:A4;margin:9mm}*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;font-size:9.5px;color:#111}'
      + 'h1{font-size:13px;margin:0}.sub{font-size:9.5px;color:#555;margin:2px 0 6px;border-bottom:1.5px solid #1A3C6E;padding-bottom:4px}'
      + '.cols{column-count:3;column-gap:6mm;column-rule:1px solid #ddd}.it{break-inside:avoid;background:#eef1f6;border-radius:3px;padding:3px 4px;margin:0 0 3px;font-size:9.5px}'
      + '.e{break-inside:avoid;padding:1.5px 0;border-bottom:1px dotted #ccc;line-height:1.25}.e.o{display:flex;justify-content:space-between;font-weight:700}.dt{color:#555}.q{font-weight:800}.q.in{color:#1a7a35}.q.use{color:#b71c1c}.q.out,.q.return{color:#a35400}.b{float:right}i{color:#666}'
      + '</style></head><body><h1>' + esc(hosp) + ' — Stock movement</h1><div class="sub">Search: "' + esc(P.q) + '" · ' + esc(P.period) + ' · Printed ' + esc(dShort(Date.now())) + '</div><div class="cols">' + blocks + '</div></body></html>';
    try { safePrint(html); } catch (e) { var w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); w.print(); } }
  };
  var baseTrack = window.bmhInvTrack;
  window.bmhInvTrack = function () {
    baseTrack.apply(this, arguments);
    try {
      var q = nk((document.getElementById('bmh-track-q') || {}).value || '');
      var days = Number((document.getElementById('bmh-track-days') || {}).value || 0);
      var out = document.getElementById('bmh-track-out'); if (!out || q.length < 3) { lastPrint = null; return; }
      var ds = docScope(); var since = days ? Date.now() - days * 864e5 : 0;
      var looksPatient = /^bmsh/i.test(q);
      var gs = looksPatient ? [] : itemGroups(q, ds);
      var ledgers = gs.slice(0, 3).map(function (g) { return ledgerData(g, ds, since); });
      var more = gs.length > 3 ? '<div style="font-size:11px;color:#666;margin-bottom:6px">' + gs.length + ' items match — showing the first 3. Pick one: ' + gs.slice(0, 12).map(function (g) { return '<a href="#" style="margin-right:6px" onclick="var i=document.getElementById(\'bmh-track-q\');i.value=this.textContent;bmhInvTrack();return false">' + esc(g.name) + '</a>'; }).join('') + '</div>' : '';
      var usage = (window.BMH_INVENTORY_USAGE || []).filter(function (r) {
        if (!r || (since && tsOf(r) < since)) return false;
        if (ds && !rowInScope(r, ds)) return false;
        return [r.itemName, r.barcode, r.bmhId, r.patientName, r.procedure].some(function (x) { return nk(x).indexOf(q) >= 0; });
      }).sort(function (a, b) { return tsOf(a) - tsOf(b); });
      lastPrint = { q: q, period: periodLabel(days), ledgers: ledgers, usage: usage };
      var bar = '<div style="display:flex;justify-content:flex-end;margin-bottom:6px"><button type="button" class="btn btn-outline btn-xs" onclick="bmhInvTrackPrint()">🖨️ Print (3 columns)</button></div>';
      if (ledgers.length) {
        out.innerHTML = bar + more + ledgers.map(ledgerHtml).join('') + '<details style="margin-top:4px"><summary style="cursor:pointer;font-size:11.5px;font-weight:800;color:#1A3C6E">Patient-wise list</summary>' + out.innerHTML + '</details>';
      } else if (usage.length) {
        out.innerHTML = bar + out.innerHTML;
      }
    } catch (e) { console.warn('[inv-track]', e); }
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
    var ds = docScope();
    if (ds && !page.querySelector('.bmh-scope-tag')) {
      var t2 = page.querySelector('.card .card-title');
      if (t2) t2.insertAdjacentHTML('beforeend', ' <span class="bmh-scope-tag" style="font-size:11px;font-weight:800;background:#eef3fb;color:#1A3C6E;border-radius:10px;padding:2px 9px;margin-left:6px">' + DEPTS[ds.dept] + ' stock — both centres</span>');
      page.querySelectorAll('.ptab').forEach(function (t) { if (/inv-ocr/.test(t.getAttribute('onclick') || '')) t.style.display = 'none'; });
    }
    if (sc || ds) addRecentCard(page, sc || ds);
    if (ds || isAdmin()) addTrackCard(page, ds);
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
    setInterval(function () { try { if (scope()) prune(); } catch (e) {} try { loginNotice(); } catch (e) {} }, 4000);
    setTimeout(function () { try { ensureChdStores(); } catch (e) {} }, 15000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.bmhInvScope = { scope: scope, inScope: inScope, storeInScope: storeInScope, storeCentre: storeCentre, storeDept: storeDept, deptKey: deptKey, prune: prune, pinHash: pinHash, sha256: sha256 };
})();
