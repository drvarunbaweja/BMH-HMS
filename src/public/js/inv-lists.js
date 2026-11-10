/* BMH — Inventory → Stock In: one ✏️ button per list (Department, Category, Vendor, Trade name, Company, Store,
 * Generic name) opens a pop-up to Add, Rename or Remove entries, instead of the one-line prompts.
 * The existing + / − buttons are left as they were.
 *  • Rename also updates the stock lines saved under the old name (the count is shown before you confirm).
 *    A department login only changes its own department's stock. Renaming a store to an existing store's name
 *    merges the two (same as the existing store rename).
 *  • Remove only takes the entry off the suggestion list. No stock, bill or record is deleted.
 *    (Removing a vendor here does NOT delete vendor bills; renaming vendors is done in Vendors → Merge similar names.)
 *  • Rename / Remove: admin and inventory logins. Others can add and look.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function user() { try { return CURRENT_USER || null; } catch (e) { return null; } }
  function isAdmin() { var u = user(); try { return !!(u && (u.isAdmin || (typeof isAdminUser === 'function' && isAdminUser()))); } catch (e) { return !!(u && u.isAdmin); } }
  function canEdit() { var u = user(); return isAdmin() || !!(u && String(u.role || '') === 'Inventory'); }
  function inv() { try { return INVENTORY || []; } catch (e) { return []; } }
  function cmp(v) { try { return normalizeInventoryCompareText(v || ''); } catch (e) { return String(v || '').trim().toLowerCase().replace(/\s+/g, ' '); } }
  function clean(v) { try { return normalizeInventoryTextValue(v || ''); } catch (e) { return String(v || '').trim().replace(/\s+/g, ' '); } }
  function trim(v) { return String(v || '').trim().replace(/\s+/g, ' '); }
  function mem() { try { return loadInventoryOcrMemory(); } catch (e) { return {}; } }
  function saveMem() { try { saveInventoryOcrMemory(); } catch (e) {} }
  function refresh() {
    ['bmhPopulateInventorySelectors', 'renderInventoryImportDatalists', 'renderStockList', 'renderInventoryStoreStock'].forEach(function (f) { try { if (typeof window[f] === 'function') window[f](); } catch (e) {} });
  }
  function syncRows(rows) {
    if (!rows.length) return;
    var ts = new Date().toISOString(); rows.forEach(function (r) { r.updatedAt = ts; });
    try { bmhSyncInventoryRowsToCloud(rows); } catch (e) { rows.forEach(function (r) { try { saveInventoryToFirebase(r); } catch (e2) {} }); }
    try { saveInventoryStockToStorage(); } catch (e) {}
  }
  function rowsWhere(fields, name) { var k = cmp(name); return inv().filter(function (r) { return r && fields.some(function (f) { return cmp(r[f]) === k && k; }); }); }
  function units(rows) { return rows.reduce(function (t, r) { return t + Math.max(0, Number(r.stock) || 0); }, 0); }
  function catalogHas(name, field) { try { var k = cmp(name); return (IOL_CATALOG || []).some(function (c) { return c && cmp(c[field]) === k; }); } catch (e) { return false; } }
  function memRename(bucket, from, to) {
    var m = mem(); m[bucket] = Array.isArray(m[bucket]) ? m[bucket] : [];
    var k = cmp(from), had = false;
    m[bucket] = m[bucket].filter(function (v) { if (cmp(v) === k) { had = true; return false; } return true; });
    if (to && !m[bucket].some(function (v) { return cmp(v) === cmp(to); })) m[bucket].push(to);
    return had;
  }
  function memRemove(bucket, name) { var m = mem(); var k = cmp(name); m[bucket] = (m[bucket] || []).filter(function (v) { return cmp(v) !== k; }); }
  function hideProduct(name) { var m = mem(); m.hiddenProducts = Array.isArray(m.hiddenProducts) ? m.hiddenProducts : []; if (!m.hiddenProducts.some(function (v) { return cmp(v) === cmp(name); })) m.hiddenProducts.push(clean(name)); }
  function unhideProduct(name) { var m = mem(); m.hiddenProducts = (m.hiddenProducts || []).filter(function (v) { return cmp(v) !== cmp(name); }); }

  // Make sure the saved store list from the cloud is in before saving it (never overwrite a newer list)
  function freshStores() {
    if (!window.FBDB) return Promise.resolve();
    return window.FBDB.ref('settings/inventory/storeLocations').once('value').then(function (s) {
      var v = s.val(); var rows = Array.isArray(v) ? v : (v && Array.isArray(v.rows) ? v.rows : []);
      var have = {}; (window.BMH_STORE_LOCATIONS || []).forEach(function (x) { have[cmp(x)] = 1; });
      rows.forEach(function (x) { x = trim(x); if (x && !have[cmp(x)]) { have[cmp(x)] = 1; window.BMH_STORE_LOCATIONS.push(x); } });
    }).catch(function () {});
  }

  var KINDS = {
    store: {
      title: 'Stores / locations', one: 'store', fields: ['store'],
      list: function () { try { return bmhInventoryStoreOptions(); } catch (e) { return window.BMH_STORE_LOCATIONS || []; } },
      add: function (name) {
        name = trim(name);
        return freshStores().then(function () {
          window.BMH_STORE_LOCATIONS = window.BMH_STORE_LOCATIONS || [];
          if (!window.BMH_STORE_LOCATIONS.some(function (x) { return cmp(x) === cmp(name); })) window.BMH_STORE_LOCATIONS.push(name);
          try { window._bmhInventoryHiddenStoreLocations = (loadInventoryHiddenStoreLocations() || []).filter(function (v) { return cmp(v) !== cmp(name); }); saveInventoryHiddenStoreLocations(); } catch (e) {}
          try { saveInventoryStoreLocations(); } catch (e) {}
        });
      },
      rename: function (from, to) {
        return freshStores().then(function () {
          var r = bmhApplyInventoryStoreHeadingChange([from], trim(to));
          return (r && r.touchedRows) ? r.touchedRows.length : 0;
        });
      },
      remove: function (name) {
        return freshStores().then(function () {
          window.BMH_STORE_LOCATIONS = (window.BMH_STORE_LOCATIONS || []).filter(function (x) { return cmp(x) !== cmp(name); });
          var hidden = (loadInventoryHiddenStoreLocations() || []).slice();
          if (!hidden.some(function (x) { return cmp(x) === cmp(name); })) hidden.push(name);
          window._bmhInventoryHiddenStoreLocations = hidden;
          try { saveInventoryHiddenStoreLocations(); } catch (e) {}
          try { saveInventoryStoreLocations(); } catch (e) {}
        });
      },
      removeNote: 'Stock kept in this store stays saved; the store just stops being offered in the lists.'
    },
    category: {
      title: 'Categories', one: 'category', fields: ['cat'],
      list: function () { try { return bmhInventoryCategoryOptions(); } catch (e) { return window.BMH_INVENTORY_CATEGORIES || []; } },
      saveList: function () { try { localStorage.setItem('bmh_inventory_categories', JSON.stringify(window.BMH_INVENTORY_CATEGORIES || [])); } catch (e) {} },
      add: function (name) { name = clean(name); var l = window.BMH_INVENTORY_CATEGORIES = window.BMH_INVENTORY_CATEGORIES || []; if (!l.some(function (x) { return cmp(x) === cmp(name); })) l.push(name); this.saveList(); },
      rename: function (from, to) {
        to = trim(to);
        var l = (window.BMH_INVENTORY_CATEGORIES || []).filter(function (x) { return cmp(x) !== cmp(from); });
        if (!l.some(function (x) { return cmp(x) === cmp(to); })) l.push(to);
        window.BMH_INVENTORY_CATEGORIES = l; this.saveList();
        var rows = rowsWhere(['cat'], from); rows.forEach(function (r) { r.cat = to; }); syncRows(rows); return rows.length;
      },
      remove: function (name) { window.BMH_INVENTORY_CATEGORIES = (window.BMH_INVENTORY_CATEGORIES || []).filter(function (x) { return cmp(x) !== cmp(name); }); this.saveList(); },
      removeNote: 'If stock still uses this category it keeps showing in the list until those stock lines are renamed.'
    },
    trade: {
      title: 'Trade names', one: 'trade name', fields: ['name'],
      list: function () { try { return inventoryKnownProductNames(); } catch (e) { return []; } },
      add: function (name) { name = clean(name); var m = mem(); m.products = Array.isArray(m.products) ? m.products : []; if (!m.products.some(function (x) { return cmp(x) === cmp(name); })) m.products.push(name); unhideProduct(name); saveMem(); },
      rename: function (from, to) {
        to = clean(to);
        memRename('products', from, to); memRename('barcodes', from, ''); unhideProduct(to); hideProduct(from);
        var m = mem(); m.products = m.products || []; if (!m.products.some(function (x) { return cmp(x) === cmp(to); })) m.products.push(to);
        saveMem();
        var rows = rowsWhere(['name'], from); rows.forEach(function (r) { r.name = to; }); syncRows(rows); return rows.length;
      },
      remove: function (name) { memRemove('products', name); memRemove('barcodes', name); hideProduct(name); saveMem(); },
      removeNote: 'Stock lines keep their name; the name stops being suggested.'
    },
    company: {
      title: 'Companies', one: 'company', fields: ['company', 'iolCompany'],
      list: function () { try { return inventoryKnownCompanyNames(); } catch (e) { return []; } },
      locked: function (name) { return catalogHas(name, 'mfr') ? 'From the IOL catalogue (Settings → Surgery pack)' : ''; },
      add: function (name) { memRename('companies', name, clean(name)); saveMem(); },
      rename: function (from, to) {
        to = clean(to); memRename('companies', from, to); saveMem();
        var rows = rowsWhere(['company', 'iolCompany'], from);
        rows.forEach(function (r) { if (cmp(r.company) === cmp(from)) r.company = to; if (cmp(r.iolCompany) === cmp(from)) r.iolCompany = to; });
        syncRows(rows); return rows.length;
      },
      remove: function (name) { memRemove('companies', name); saveMem(); },
      removeNote: 'Names that also come from stock lines or vendor bills keep showing.'
    },
    generic: {
      title: 'Generic names', one: 'generic name', fields: ['genericName'],
      list: function () {
        var s = {}, out = [];
        var push = function (v) { v = clean(v); if (v && !s[cmp(v)]) { s[cmp(v)] = 1; out.push(v); } };
        try { inventoryKnownBrandNames().forEach(push); } catch (e) {}
        inv().forEach(function (r) { if (r && r.genericName) push(r.genericName); });
        return out;
      },
      locked: function (name) { return catalogHas(name, 'name') ? 'IOL brand from the IOL catalogue (Settings → Surgery pack)' : ''; },
      add: function (name) { memRename('brands', name, clean(name)); saveMem(); },
      rename: function (from, to) {
        to = clean(to); memRename('brands', from, to); saveMem();
        var rows = rowsWhere(['genericName'], from); rows.forEach(function (r) { r.genericName = to; }); syncRows(rows); return rows.length;
      },
      remove: function (name) { memRemove('brands', name); saveMem(); },
      removeNote: 'Stock lines keep their generic name; it stops being suggested.'
    },
    vendor: {
      title: 'Vendors (suggestions)', one: 'vendor', fields: ['vendor'], noRename: true,
      list: function () { try { return inventoryKnownVendorNames(); } catch (e) { return []; } },
      add: function (name) { try { learnInventoryOcrValue('vendor', name); } catch (e) { memRename('vendors', name, clean(name)); saveMem(); } },
      remove: function (name) { memRemove('vendors', name); saveMem(); },
      removeNote: 'Only removes the suggestion. Vendor bills and payments are not touched.'
    },
    dept: {
      title: 'Departments', one: 'department', fields: ['dept'], byValue: true,
      list: function () { try { return loadInventoryDeptRows().map(function (r) { return r.label + ' [' + r.value + ']'; }); } catch (e) { return []; } },
      code: function (entry) { var m = /\[([^\]]+)\]$/.exec(entry); return m ? m[1] : entry; },
      label: function (entry) { return String(entry).replace(/\s*\[[^\]]+\]$/, ''); },
      add: function (name) {
        var label = trim(name), code = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        var rows = loadInventoryDeptRows().slice(); if (!code || rows.some(function (r) { return r.value === code; })) { toast('That department already exists', 'w'); return; }
        rows.push({ value: code, label: label }); saveInventoryDeptRows(rows); try { bmhPopulateInventoryDeptSelects(); } catch (e) {}
      },
      rename: function (from, to) { // the display name only; stock keeps its department code
        var code = this.code(from), rows = loadInventoryDeptRows().map(function (r) { return r.value === code ? { value: r.value, label: trim(to) } : r; });
        saveInventoryDeptRows(rows); try { bmhPopulateInventoryDeptSelects(); } catch (e) {} return 0;
      },
      remove: function (entry) {
        var code = this.code(entry), rows = loadInventoryDeptRows(); if (rows.length <= 1) { toast('Keep at least one department', 'w'); return; }
        saveInventoryDeptRows(rows.filter(function (r) { return r.value !== code; })); try { bmhPopulateInventoryDeptSelects(); } catch (e) {}
      },
      count: function (entry) { var code = this.code(entry); return inv().filter(function (r) { return r && String(r.dept || '') === code; }); },
      removeNote: 'Stock lines keep their department code.'
    }
  };

  var S = { kind: '', q: '', editing: '' };
  function css() {
    if (document.getElementById('ivl-css')) return;
    var s = document.createElement('style'); s.id = 'ivl-css';
    s.textContent = '#ivl-ov{position:fixed;inset:0;z-index:4850;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:14px}'
      + '#ivl-box{background:#fff;border-radius:14px;max-width:620px;width:100%;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 12px 40px rgba(0,0,0,.3)}'
      + '#ivl-box input{padding:8px;border:1px solid #cfd6e2;border-radius:8px;font-size:13px;box-sizing:border-box}'
      + '#ivl-list{overflow:auto;padding:0 16px 12px}#ivl-list .r{display:flex;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid #f0f0f0;font-size:13px}'
      + '#ivl-list .r .n{flex:1;min-width:0}#ivl-list .r small{display:block;color:#777;font-size:11px}'
      + '.ivl-pen{background:var(--gold,#C9A227);color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:10px;cursor:pointer;font-weight:900;line-height:1;padding:0}';
    document.head.appendChild(s);
  }
  function entries() {
    var K = KINDS[S.kind], list = K.list() || [], q = cmp(S.q);
    var seen = {}, out = [];
    list.forEach(function (n) { n = trim(n); if (!n || seen[cmp(n)]) return; seen[cmp(n)] = 1; if (!q || cmp(n).indexOf(q) >= 0) out.push(n); });
    return out.sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); });
  }
  function usage(K, n) { return K.count ? K.count(n) : rowsWhere(K.fields, n); }
  function deptName(d) { if (!d) return 'No department'; try { var r = loadInventoryDeptRows().find(function (x) { return x.value === d; }); if (r) return r.label; } catch (e) {} return d; }
  function draw() {
    var K = KINDS[S.kind], box = document.getElementById('ivl-box'); if (!K || !box) return;
    var list = entries(), ed = canEdit();
    var shown = list.slice(0, 300);
    document.getElementById('ivl-list').innerHTML = (shown.length ? shown.map(function (n) {
      var rows = usage(K, n), lock = K.locked ? K.locked(n) : '';
      var info = rows.length ? rows.length + ' stock line' + (rows.length === 1 ? '' : 's') + ' · ' + units(rows) + ' units' : 'not used by any stock line';
      if (S.editing === n) {
        return '<div class="r"><div class="n"><input type="text" id="ivl-ren" value="' + esc(K.byValue ? K.label(n) : n) + '" style="width:100%"><small>Renaming "' + esc(n) + '"' + (rows.length && !K.byValue ? ' — ' + rows.length + ' stock line' + (rows.length === 1 ? '' : 's') + ' will change to the new name' : '') + '</small></div>'
          + '<button type="button" class="btn btn-xs btn-gray" data-a="cancel">Cancel</button><button type="button" class="btn btn-xs btn-blue" data-a="saveren" data-n="' + esc(n) + '">Save</button></div>';
      }
      return '<div class="r"><div class="n"><b>' + esc(n) + '</b><small>' + esc(info) + (lock ? ' · ' + esc(lock) : '') + '</small></div>'
        + (ed && !lock && !K.noRename ? '<button type="button" class="btn btn-xs btn-outline" data-a="ren" data-n="' + esc(n) + '">✏️ Rename</button>' : '')
        + (S.kind === 'store' && isAdmin() && typeof window.bmhMoveStoreToDept === 'function' ? '<button type="button" class="btn btn-xs btn-outline" data-a="dept" data-n="' + esc(n) + '" title="Move this store to another department">🏷 ' + esc(deptName(window.bmhStoreDeptOf(n))) + '</button>' : '')
        + (ed && !lock ? '<button type="button" class="btn btn-xs btn-gray" data-a="del" data-n="' + esc(n) + '">Remove</button>' : '') + '</div>';
    }).join('') : '<div style="padding:14px;color:#777;font-size:12.5px">Nothing found.</div>')
      + (list.length > shown.length ? '<div style="padding:8px;color:#777;font-size:11.5px">Showing 300 of ' + list.length + ' — type to search.</div>' : '');
    document.getElementById('ivl-count').textContent = list.length + ' entr' + (list.length === 1 ? 'y' : 'ies');
    Array.prototype.forEach.call(document.querySelectorAll('#ivl-list [data-a]'), function (b) { b.onclick = function () { act(b.getAttribute('data-a'), b.getAttribute('data-n')); }; });
    var ren = document.getElementById('ivl-ren'); if (ren) { ren.focus(); ren.select(); ren.onkeydown = function (e) { if (e.key === 'Enter') act('saveren', S.editing); if (e.key === 'Escape') act('cancel'); }; }
  }
  function done(msg) { refresh(); toast(msg, 's'); S.editing = ''; draw(); }
  function act(a, n) {
    var K = KINDS[S.kind];
    if (a === 'ren') { S.editing = n; draw(); return; }
    if (a === 'cancel') { S.editing = ''; draw(); return; }
    if (a === 'dept') { window.bmhMoveStoreToDept(n); var iv = setInterval(function () { if (!document.getElementById('dl-ov')) { clearInterval(iv); draw(); } }, 500); return; }
    if (!canEdit()) { toast('Only admin and inventory logins can change these lists', 'w'); return; }
    if (a === 'saveren') {
      var to = trim((document.getElementById('ivl-ren') || {}).value);
      if (!to) { toast('Type the new name', 'w'); return; }
      var same = K.byValue ? trim(K.label(n)) === to : to === n;
      if (same) { S.editing = ''; draw(); return; }
      var rows = usage(K, n);
      var exists = !K.byValue && (K.list() || []).some(function (x) { return cmp(x) === cmp(to) && cmp(x) !== cmp(n); });
      var msg = 'Rename "' + n + '" to "' + to + '"?' + (rows.length && !K.byValue ? '\n\n' + rows.length + ' stock line' + (rows.length === 1 ? '' : 's') + ' (' + units(rows) + ' units) will be changed to the new name.' : '')
        + (exists ? '\n\n"' + to + '" already exists — the two will be combined.' : '');
      if (!confirm(msg)) return;
      Promise.resolve(K.rename(n, to)).then(function (c) { done('Renamed ✓' + (c ? ' · ' + c + ' stock line' + (c === 1 ? '' : 's') + ' updated' : '')); }, function (e) { console.warn('[inv-lists]', e); toast('Could not rename', 'w'); });
      return;
    }
    if (a === 'del') {
      var r2 = usage(K, n);
      if (!confirm('Remove "' + n + '" from the ' + K.one + ' list?' + (r2.length ? '\n\n' + r2.length + ' stock line' + (r2.length === 1 ? '' : 's') + ' use it. ' : '\n\n') + (K.removeNote || ''))) return;
      Promise.resolve(K.remove(n)).then(function () { done('Removed from the list ✓'); }, function () { toast('Could not remove', 'w'); });
    }
  }
  function add() {
    var inp = document.getElementById('ivl-add'), v = trim(inp && inp.value); if (!v) { toast('Type a name to add', 'w'); return; }
    var K = KINDS[S.kind];
    if (!K.byValue && (K.list() || []).some(function (x) { return cmp(x) === cmp(v); })) { toast('"' + v + '" is already in the list', 'w'); return; }
    Promise.resolve(K.add(v)).then(function () { inp.value = ''; done('Added ✓'); });
  }
  window.bmhInvListOpen = function (kind) {
    if (!KINDS[kind]) return; css(); S = { kind: kind, q: '', editing: '' };
    var old = document.getElementById('ivl-ov'); if (old) old.remove();
    var K = KINDS[kind], ov = document.createElement('div'); ov.id = 'ivl-ov';
    ov.innerHTML = '<div id="ivl-box"><div style="padding:14px 16px 8px;display:flex;justify-content:space-between;align-items:center;gap:8px">'
      + '<div><div style="font-size:15px;font-weight:900">✏️ ' + esc(K.title) + '</div><div id="ivl-count" style="font-size:11.5px;color:#777"></div></div>'
      + '<button type="button" class="btn btn-gray btn-sm" id="ivl-x">Close</button></div>'
      + '<div style="padding:0 16px 8px;display:flex;gap:6px"><input type="text" id="ivl-add" placeholder="New ' + esc(K.one) + '" style="flex:1"><button type="button" class="btn btn-blue btn-sm" id="ivl-addb">+ Add</button></div>'
      + '<div style="padding:0 16px 8px"><input type="text" id="ivl-q" placeholder="🔍 Search" style="width:100%"></div>'
      + (kind === 'vendor' && isAdmin() ? '<div style="padding:0 16px 8px;font-size:11.5px;color:#555">To rename a vendor everywhere (bills, payments, stock), use <a href="#" id="ivl-vm">Vendors → Merge similar names</a>.</div>' : '')
      + (kind === 'dept' ? '<div style="padding:0 16px 8px;font-size:11.5px;color:#555">Renaming changes the name shown; stock keeps the same department.</div>' : '')
      + (kind === 'store' && isAdmin() && typeof window.bmhMergeSameNameStores === 'function' ? '<div style="padding:0 16px 8px"><button type="button" class="btn btn-xs btn-outline" id="ivl-samename">🔤 Merge same-name stores (e.g. Eye RPR / Eye Rpr)</button></div>' : '')
      + (kind === 'store' && isAdmin() && typeof window.bmhFixStoreDeptMismatch === 'function' ? '<div style="padding:0 16px 8px"><button type="button" class="btn btn-xs btn-outline" id="ivl-deptfix">🏷 Fix stock lines saved in the wrong department</button></div>' : '')
      + (!canEdit() ? '<div style="padding:0 16px 8px;font-size:11.5px;color:#9a6b00">Rename / Remove: admin and inventory logins only.</div>' : '')
      + '<div id="ivl-list"></div></div>';
    document.body.appendChild(ov);
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    document.getElementById('ivl-x').onclick = function () { ov.remove(); };
    document.getElementById('ivl-addb').onclick = add;
    document.getElementById('ivl-add').onkeydown = function (e) { if (e.key === 'Enter') add(); };
    document.getElementById('ivl-q').oninput = function () { S.q = this.value; S.editing = ''; draw(); };
    var df = document.getElementById('ivl-deptfix'); if (df) df.onclick = function () { window.bmhFixStoreDeptMismatch(); draw(); };
    var sn = document.getElementById('ivl-samename'); if (sn) sn.onclick = function () { window.bmhMergeSameNameStores(); draw(); };
    var vm = document.getElementById('ivl-vm'); if (vm) vm.onclick = function (e) { e.preventDefault(); ov.remove(); try { bmhOpenVendorMerge(); } catch (er) {} };
    draw();
  };

  // ── a ✏️ button next to the + / − buttons of each Stock In list ──
  var MAP = { addInventoryDeptPrompt: 'dept', addInventoryCategoryPrompt: 'category', addInventoryVendorPrompt: 'vendor', addInventoryBarcodePrompt: 'trade', addInventoryCompanyPrompt: 'company', addInventoryStorePrompt: 'store', addInventoryBrandPrompt: 'generic' };
  function addButtons() {
    var tab = document.getElementById('inv-in'); if (!tab) return false;
    css();
    Object.keys(MAP).forEach(function (fn) {
      var b = tab.querySelector('button[onclick^="' + fn + '("]'); if (!b || !b.parentNode || b.parentNode.querySelector('.ivl-pen')) return;
      var p = document.createElement('button'); p.type = 'button'; p.className = 'ivl-pen'; p.title = 'Edit list (add / rename / remove)'; p.textContent = '✏️';
      p.onclick = function () { window.bmhInvListOpen(MAP[fn]); };
      b.parentNode.appendChild(p);
    });
    return true;
  }
  if (!addButtons()) { var t = 0, iv = setInterval(function () { if (addButtons() || ++t > 40) clearInterval(iv); }, 1500); }
})();
