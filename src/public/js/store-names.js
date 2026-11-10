/* BMH — one store, one name: "Eye RPR", "Eye Rpr" and "eye rpr" are the same store.
 *  • Store names are matched without regard to capitals / spaces. Every stock line (on screen and whenever it is saved)
 *    uses the store's spelling from the store list, so Stock In adds to the same store everywhere.
 *  • Adding a store whose name already exists (in any capitals) shows a warning and picks the existing store instead.
 *  • Admin: "Merge same-name stores" (Inventory → Stock In → ✏️ next to Store, or bmhMergeSameNameStores()) saves the
 *    single spelling on the stock lines and records that still carry another spelling, after a confirmation.
 */
(function () {
  'use strict';
  function key(v) { return String(v || '').trim().replace(/\s+/g, ' ').toLowerCase(); }
  function trim(v) { return String(v || '').trim().replace(/\s+/g, ' '); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function inv() { try { return INVENTORY || []; } catch (e) { return []; } }
  function isAdmin() { var u = null; try { u = CURRENT_USER; } catch (e) {} try { return !!(u && (u.isAdmin || (typeof isAdminUser === 'function' && isAdminUser()))); } catch (e) { return !!(u && u.isAdmin); } }

  // the spelling to use for a store: the store list's spelling; otherwise the most used spelling on stock lines
  var CANON = {}, built = 0;
  function build() {
    var m = {}, counts = {};
    inv().forEach(function (r) { var s = trim(r && r.store); if (!s) return; var k = key(s); counts[k] = counts[k] || {}; counts[k][s] = (counts[k][s] || 0) + 1; });
    Object.keys(counts).forEach(function (k) { var best = '', n = -1; Object.keys(counts[k]).forEach(function (s) { if (counts[k][s] > n || (counts[k][s] === n && /[A-Z]{2,}/.test(s))) { best = s; n = counts[k][s]; } }); m[k] = best; });
    var seenList = {};
    (window.BMH_STORE_LOCATIONS || []).forEach(function (s) { s = trim(s); var k = key(s); if (!s || seenList[k]) return; seenList[k] = 1; m[k] = s; }); // the store list's spelling wins
    CANON = m; built = Date.now();
  }
  function canon(s) { var t = trim(s); if (!t) return s; if (!built || Date.now() - built > 5000) build(); return CANON[key(t)] || t; }
  window.bmhCanonicalStoreName = canon;

  // rows whose saved spelling differs (kept only in memory, for the admin merge)
  var differs = new Set();
  function fixRow(r, field) { if (!r || !r[field]) return false; var c = canon(r[field]); if (c && c !== r[field]) { r[field] = c; return true; } return false; }
  function tidyList() {
    var l = window.BMH_STORE_LOCATIONS; if (!Array.isArray(l)) return false;
    var seen = {}, out = [], changed = false;
    l.forEach(function (s) { var t = trim(s), k = key(t); if (!t) return; if (seen[k]) { changed = true; return; } seen[k] = 1; out.push(t); });
    if (changed) window.BMH_STORE_LOCATIONS = out;
    return changed;
  }
  var listDup = false;
  function canonicalizeAll() {
    if (tidyList()) listDup = true;
    build();
    inv().forEach(function (r) { if (fixRow(r, 'store')) differs.add(r); });
  }
  window.bmhStoreNameReport = function () { canonicalizeAll(); return { stockLines: differs.size, listDuplicates: listDup }; };

  var origNorm = window.normalizeInventoryRecord;
  if (typeof origNorm === 'function') {
    window.normalizeInventoryRecord = function (item) {
      var r = origNorm.apply(this, arguments);
      try { if (item && item.store) { var c = canon(item.store); if (c !== item.store) item.store = c; } } catch (e) {}
      return r;
    };
  }
  ['renderStockList', 'renderInventoryStoreStock', 'bmhPopulateInventorySelectors'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { try { canonicalizeAll(); } catch (e) {} return o.apply(this, arguments); };
  });
  var origOptions = window.bmhInventoryStoreOptions;
  if (typeof origOptions === 'function') {
    window.bmhInventoryStoreOptions = function () {
      var list = origOptions.apply(this, arguments) || [], seen = {}, out = [];
      list.forEach(function (s) { var c = canon(s), k = key(c); if (!k || seen[k]) return; seen[k] = 1; out.push(c); });
      return out;
    };
  }

  // adding a store: warn if it already exists in any capitals
  window.addInventoryStorePrompt = function () {
    var raw = prompt('New store / location name');
    var name = trim(raw); if (!name) return;
    var all = (window.BMH_STORE_LOCATIONS || []).concat(inv().map(function (r) { return r && r.store; }));
    var hit = all.find(function (s) { return s && key(s) === key(name); });
    var sel = document.getElementById('inv-in-store');
    if (hit) {
      hit = canon(hit);
      alert('A store called "' + hit + '" already exists.\n\nCapital and small letters do not make a different store, so "' + name + '" was not added.\nThe existing store has been selected.');
      if (sel) { try { bmhPopulateInventorySelectors(); } catch (e) {} sel.value = hit; }
      return;
    }
    try { name = normalizeInventoryTextValue(name); } catch (e) {}
    window.BMH_STORE_LOCATIONS = window.BMH_STORE_LOCATIONS || [];
    window.BMH_STORE_LOCATIONS.push(name);
    try { window._bmhInventoryHiddenStoreLocations = (loadInventoryHiddenStoreLocations() || []).filter(function (v) { return key(v) !== key(name); }); saveInventoryHiddenStoreLocations(); } catch (e) {}
    try { saveInventoryStoreLocations(); } catch (e) {}
    try { bmhPopulateInventorySelectors(); } catch (e) {}
    if (sel) sel.value = name;
    toast('Store added ✓', 's');
  };

  // admin: save the single spelling everywhere it differs
  window.bmhMergeSameNameStores = function () {
    if (!isAdmin()) { toast('Only admin can merge stores', 'w'); return; }
    canonicalizeAll();
    var fin = 0;
    ['BMH_PURCHASES', 'BMH_INVENTORY_USAGE'].forEach(function (n) { (window[n] || []).forEach(function (r) { if (fixRow(r, 'store')) fin++; }); });
    (window.BMH_INVENTORY_TRANSFERS || []).forEach(function (r) { if (fixRow(r, 'fromStore')) fin++; if (fixRow(r, 'toStore')) fin++; });
    (window.BMH_INVENTORY_INDENTS || []).forEach(function (r) { if (fixRow(r, 'requestStore')) fin++; if (fixRow(r, 'sourceStore')) fin++; });
    var rows = Array.from(differs);
    if (!rows.length && !fin && !listDup) { toast('No stores with the same name in different capitals ✓', 's'); return; }
    var groups = {}; rows.forEach(function (r) { groups[r.store] = (groups[r.store] || 0) + 1; });
    var msg = 'Merge stores that differ only in capital letters?\n\n'
      + Object.keys(groups).map(function (s) { return '• ' + s + ' — ' + groups[s] + ' stock line' + (groups[s] === 1 ? '' : 's'); }).join('\n')
      + (fin ? '\n• ' + fin + ' purchase / usage / transfer / indent record' + (fin === 1 ? '' : 's') : '')
      + (listDup ? '\n• duplicate names removed from the store list' : '')
      + '\n\nOnly the store name is changed; quantities stay the same.';
    if (!confirm(msg)) return;
    try { if (rows.length) bmhSyncInventoryRowsToCloud(rows); } catch (e) { rows.forEach(function (r) { try { saveInventoryToFirebase(r); } catch (e2) {} }); }
    try { saveInventoryStockToStorage(); } catch (e) {}
    if (fin) { try { saveBmhFinancials(); } catch (e) {} }
    if (listDup) { try { saveInventoryStoreLocations(); } catch (e) {} listDup = false; }
    differs.clear();
    try { bmhPopulateInventorySelectors(); renderStockList && renderStockList(); renderInventoryStoreStock && renderInventoryStoreStock(); } catch (e) {}
    toast('Stores merged ✓ — ' + rows.length + ' stock line' + (rows.length === 1 ? '' : 's') + ' updated', 's');
  };
})();
