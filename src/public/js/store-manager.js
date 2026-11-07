/* BMH — Store manager (Inventory → stock list → store "Edit" / "Edit store heading").
 * Instead of the one-line prompt, "Edit" opens a panel with tabs:
 *   • Details  — store name (rename everywhere), in-charge, phone, room / location, notes (admin).
 *   • Stock    — every item in the store with batch / expiry / stock; tick items, set quantities, then
 *                Transfer to another store, or Return to vendor (uses the existing transfer and return steps,
 *                so stock, vendor bills and records are updated exactly as before).
 *   • Merge    — pick duplicate store heads (similar names are listed first) and merge them into one name (admin).
 * Nothing else changes; the old functions are still used underneath.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function isAdmin() { try { return !!(CURRENT_USER && CURRENT_USER.isAdmin) || (typeof isAdminUser === 'function' && !!isAdminUser()); } catch (e) { return false; } }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) { return ''; } }
  function cmp(s) { try { return normalizeInventoryCompareText(s); } catch (e) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); } }
  function trimName(s) { return String(s || '').trim().replace(/\s+/g, ' '); }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function centreOf(s) { try { return window.bmhInvScope ? bmhInvScope.storeCentre(s) : ''; } catch (e) { return ''; } }
  function deptOf(s) { try { return window.bmhInvScope ? bmhInvScope.storeDept(s) : ''; } catch (e) { return ''; } }
  var DEPTN = { ophtho: 'Eye', obg: 'OBG', psych: 'Psychiatry', skin: 'Skin' };
  function allStores() {
    var names = [];
    try { names = bmhCollectInventoryStoreNames(); } catch (e) { names = (window.BMH_STORE_LOCATIONS || []).slice(); inv().forEach(function (r) { if (r && r.store) names.push(r.store); }); }
    var seen = {}, out = [];
    names.forEach(function (n) { n = trimName(n); var k = cmp(n); if (n && k && !seen[k]) { seen[k] = 1; out.push(n); } });
    // department / centre logins only see their own stores
    try { if (window.bmhInvScope && bmhInvScope.scope && bmhInvScope.scope()) out = out.filter(function (n) { return bmhInvScope.storeInScope(n); }); } catch (e) {}
    return out.sort(function (a, b) { return a.localeCompare(b); });
  }
  function rowsOf(store) { var k = cmp(store); return inv().filter(function (r) { return r && cmp(r.store || '') === k; }); }
  function units(store) { return rowsOf(store).reduce(function (t, r) { return t + Math.max(0, Number(r.stock) || 0); }, 0); }
  // ── store details (saved in the cloud) ──
  var DET = {};
  try { DET = JSON.parse(localStorage.getItem('bmh_store_details_v1') || '{}') || {}; } catch (e) { DET = {}; }
  function dkey(name) { return encodeURIComponent(cmp(name)).replace(/\./g, '%2E'); }
  function saveDet() { try { localStorage.setItem('bmh_store_details_v1', JSON.stringify(DET)); } catch (e) {} }
  var detLoaded = false;
  function loadDet() {
    if (detLoaded || !window.FBDB) return Promise.resolve();
    return window.FBDB.ref('settings/inventory/storeDetails').once('value').then(function (s) { var v = s.val(); if (v) { DET = v; saveDet(); } detLoaded = true; }).catch(function () {});
  }
  function putDet(name, obj) {
    var k = dkey(name); DET[k] = obj; saveDet();
    if (window.FBDB) { try { window.FBDB.ref('settings/inventory/storeDetails/' + k).set(obj).catch(function () {}); } catch (e) {} }
  }
  function moveDet(from, to) {
    var a = dkey(from), b = dkey(to); if (a === b || !DET[a]) return;
    var merged = Object.assign({}, DET[a], DET[b] || {}); delete DET[a]; saveDet();
    putDet(to, merged);
    if (window.FBDB) { try { window.FBDB.ref('settings/inventory/storeDetails/' + a).remove().catch(function () {}); } catch (e) {} }
  }
  // similar store names: same words ignoring spaces / case / punctuation, but never across CHD and RPR
  function looseKey(n) { return String(n || '').toLowerCase().replace(/\b(store|room|stock)\b/g, ' ').replace(/[^a-z0-9]+/g, ''); }
  function similar(a, b) {
    if (centreOf(a) !== centreOf(b)) return false;
    var x = looseKey(a), y = looseKey(b);
    if (!x || !y) return false;
    if (x === y) return true;
    return (x.length >= 4 && y.indexOf(x) === 0) || (y.length >= 4 && x.indexOf(y) === 0);
  }

  var S = { store: '', tab: 'details' };
  function chip(t, bg, c) { return '<span style="font-size:11px;font-weight:800;background:' + bg + ';color:' + c + ';border-radius:10px;padding:2px 9px">' + esc(t) + '</span>'; }
  function header() {
    var st = S.store, c = centreOf(st), d = deptOf(st), rows = rowsOf(st);
    var items = rows.filter(function (r) { return Number(r.stock) > 0; }).length;
    return '<div style="display:flex;gap:10px;align-items:flex-start;flex-wrap:wrap">'
      + '<div style="flex:1;min-width:200px"><div style="font-size:11px;font-weight:900;color:#666;text-transform:uppercase;letter-spacing:.4px">Store</div><div style="font-size:18px;font-weight:900;color:var(--bmh-blue,#1A3C6E)">' + esc(st) + '</div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">' + (c ? chip(c === 'CHD' ? 'Chandigarh' : 'Ropar', '#eef3fb', '#1A3C6E') : '') + (d ? chip(DEPTN[d] || d, '#f5f0fb', '#6a1b9a') : '') + chip(units(st) + ' units · ' + items + ' items', '#eef7f0', '#1a7a35') + '</div></div>'
      + '<button type="button" class="btn btn-gray btn-sm" onclick="bmhStoreMgrClose()">Close</button></div>'
      + '<div style="display:flex;gap:6px;margin:12px 0 10px;border-bottom:1px solid #e3e6ee">'
      + tabBtn('details', '📝 Details') + tabBtn('stock', '📦 Stock · transfer / return') + tabBtn('merge', '🔗 Merge duplicates') + '</div>';
  }
  function tabBtn(k, label) { var on = S.tab === k; return '<button type="button" onclick="bmhStoreMgrTab(\'' + k + '\')" style="border:0;background:' + (on ? '#fff' : 'transparent') + ';border-bottom:3px solid ' + (on ? '#D4A017' : 'transparent') + ';padding:8px 12px;font-weight:' + (on ? 900 : 700) + ';font-size:12.5px;color:' + (on ? '#1A3C6E' : '#666') + ';cursor:pointer">' + label + '</button>'; }

  // ── Details tab ──
  function detailsHtml() {
    var d = DET[dkey(S.store)] || {}, adm = isAdmin(), dis = adm ? '' : ' disabled';
    var f = function (id, label, val, ph, wide) { return '<div class="form-group" style="margin:0;' + (wide ? 'grid-column:1/-1' : '') + '"><label class="fl">' + label + '</label><input id="smg-' + id + '" value="' + esc(val || '') + '" placeholder="' + esc(ph || '') + '"' + dis + '></div>'; };
    return '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px">'
      + f('name', 'Store name', S.store, '', true)
      + f('incharge', 'In-charge', d.inCharge, 'e.g. Sister Simran')
      + f('phone', 'Phone / extension', d.phone, '')
      + f('location', 'Room / location', d.location, 'e.g. 1st floor, OT complex')
      + f('notes', 'Notes', d.notes, 'Opening hours, key with…', true)
      + '</div>'
      + '<div style="font-size:11px;color:#666;margin-top:8px">Centre and department are read from the name — add "CHD" for Chandigarh stores (stores without CHD / RPR count as Ropar), and start with Eye / OBG / Psy / Skin for a department store.</div>'
      + (d.updatedAt ? '<div style="font-size:10.5px;color:#888;margin-top:4px">Last saved ' + esc(new Date(d.updatedAt).toLocaleString('en-IN')) + (d.by ? ' by ' + esc(d.by) : '') + '</div>' : '')
      + (adm ? '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" class="btn btn-gold btn-sm" onclick="bmhStoreMgrSaveDetails()">💾 Save details</button></div>' : '<div style="font-size:11.5px;color:#b55a00;margin-top:10px">Only admin can change store details.</div>');
  }
  window.bmhStoreMgrSaveDetails = function () {
    if (!isAdmin()) return;
    var g = function (id) { return trimName((document.getElementById('smg-' + id) || {}).value || ''); };
    var name = g('name'); if (!name) { toast('Store name cannot be empty', 'w'); return; }
    var old = S.store;
    if (cmp(name) !== cmp(old) || name !== old) {
      var clash = allStores().find(function (n) { return cmp(n) === cmp(name) && cmp(n) !== cmp(old); });
      if (clash && !confirm('"' + clash + '" already exists. Saving will MERGE "' + old + '" into it. Continue?')) return;
      try { var r = bmhApplyInventoryStoreHeadingChange(clash ? [old, clash] : [old], name); if (r && r.changed === false && cmp(name) !== cmp(old)) { toast('Could not rename the store', 'w'); return; } } catch (e) { console.warn(e); toast('Could not rename the store', 'w'); return; }
      moveDet(old, name);
      S.store = name;
    }
    putDet(name, { name: name, inCharge: g('incharge'), phone: g('phone'), location: g('location'), notes: g('notes'), updatedAt: new Date().toISOString(), by: who() });
    toast('Store details saved ✓', 's');
    draw();
  };

  // ── Stock tab ──
  function stockHtml() {
    var rows = rowsOf(S.store).filter(function (r) { return Number(r.stock) > 0; }).sort(function (a, b) { return String(a.name || '').localeCompare(String(b.name || '')) || String(a.exp || '').localeCompare(String(b.exp || '')); });
    var q = cmp((document.getElementById('smg-q') || {}).value || S.q || '');
    var shown = q ? rows.filter(function (r) { return cmp([r.name, r.barcode, r.batchNo, r.cat, r.vendor].join(' ')).indexOf(q) >= 0; }) : rows;
    var targets = allStores().filter(function (n) { return cmp(n) !== cmp(S.store); });
    if (!rows.length) return '<div style="padding:16px;text-align:center;color:#888">No stock in this store.</div>';
    var today = new Date().toISOString().slice(0, 7);
    var body = shown.map(function (r) {
      var exp = String(r.exp || ''), soon = exp && exp.slice(0, 7) <= today;
      return '<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:5px"><input type="checkbox" class="smg-c" data-b="' + esc(r.barcode) + '" style="width:17px;height:17px;margin:0"></td>'
        + '<td style="padding:5px"><b>' + esc(r.name || r.barcode) + '</b><div style="font-size:10.5px;color:#666">' + esc([r.cat, r.power ? r.power + ' D' : '', r.batchNo ? 'Batch ' + r.batchNo : '', r.vendor].filter(Boolean).join(' · ')) + '</div></td>'
        + '<td style="padding:5px;white-space:nowrap;color:' + (soon ? '#c62828;font-weight:800' : '#333') + '">' + esc(exp || '—') + '</td>'
        + '<td style="padding:5px;text-align:right;font-weight:800">' + esc(r.stock) + '</td>'
        + '<td style="padding:5px;text-align:right"><input type="number" class="smg-qty" data-b="' + esc(r.barcode) + '" min="1" max="' + esc(r.stock) + '" value="' + esc(r.stock) + '" ></td></tr>';
    }).join('');
    return '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px"><input id="smg-q" value="' + esc(S.q || '') + '" placeholder="Search item / batch / vendor" oninput="bmhStoreMgrSearch(this.value)" style="flex:1;min-width:180px"><label style="font-size:12px;display:flex;gap:6px;align-items:center;cursor:pointer"><input type="checkbox" id="smg-all" style="width:auto;margin:0" onchange="document.querySelectorAll(\'.smg-c\').forEach(function(c){c.checked=document.getElementById(\'smg-all\').checked})"> Select all shown</label></div>'
      + '<div style="max-height:44vh;overflow:auto;border:1px solid #eee;border-radius:8px"><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr style="background:#f3f5f9;position:sticky;top:0"><th></th><th style="text-align:left;padding:5px">Item</th><th style="text-align:left;padding:5px">Expiry</th><th style="text-align:right;padding:5px">In stock</th><th style="text-align:right;padding:5px">Qty to move</th></tr></thead><tbody>' + (body || '<tr><td colspan="5" style="padding:10px;text-align:center;color:#888">Nothing matches</td></tr>') + '</tbody></table></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-top:12px">'
      + '<div style="border:1px solid #dfe5ef;border-radius:10px;padding:10px"><div style="font-weight:900;font-size:12.5px;margin-bottom:6px">➡️ Transfer ticked items</div><select id="smg-to" style="margin-bottom:8px"><option value="">Choose store…</option>' + targets.map(function (n) { return '<option value="' + esc(n) + '">' + esc(n) + (centreOf(n) && centreOf(n) !== centreOf(S.store) ? ' (other centre)' : '') + '</option>'; }).join('') + '</select><button type="button" class="btn btn-blue btn-sm" style="width:100%" onclick="bmhStoreMgrTransfer()">Transfer</button></div>'
      + '<div style="border:1px solid #f0d9c0;border-radius:10px;padding:10px"><div style="font-weight:900;font-size:12.5px;margin-bottom:6px">↩️ Return ticked items to vendor</div><input id="smg-reason" placeholder="Reason — expired / damaged / excess / wrong supply" style="margin-bottom:8px"><button type="button" class="btn btn-sm" style="width:100%;background:#b55a00;color:#fff" onclick="bmhStoreMgrReturn()">Return to vendor</button><div style="font-size:10.5px;color:#666;margin-top:5px">Reduces the vendor\'s bill, same as Inventory → Return.</div></div>'
      + '</div>';
  }
  window.bmhStoreMgrSearch = function (v) { S.q = v; var box = document.getElementById('smg-body'); if (!box) return; var pos = v.length; box.innerHTML = stockHtml(); var i = document.getElementById('smg-q'); if (i) { i.focus(); try { i.setSelectionRange(pos, pos); } catch (e) {} } };
  function picked() {
    return [].filter.call(document.querySelectorAll('.smg-c'), function (c) { return c.checked; }).map(function (c) {
      var b = c.getAttribute('data-b');
      var row = inv().find(function (r) { return r && String(r.barcode) === b && cmp(r.store || '') === cmp(S.store); });
      var qEl = [].find.call(document.querySelectorAll('.smg-qty'), function (x) { return x.getAttribute('data-b') === b; });
      var qty = Math.floor(Number(qEl && qEl.value) || 0);
      return { row: row, qty: qty };
    }).filter(function (x) { return x.row; });
  }
  function check(list) {
    if (!list.length) { toast('Tick at least one item', 'w'); return false; }
    var bad = list.find(function (x) { return !(x.qty > 0) || x.qty > (Number(x.row.stock) || 0); });
    if (bad) { toast('Check the quantity for ' + (bad.row.name || bad.row.barcode) + ' (1 to ' + bad.row.stock + ')', 'w'); return false; }
    return true;
  }
  window.bmhStoreMgrTransfer = function () {
    var to = (document.getElementById('smg-to') || {}).value || '';
    if (!to) { toast('Choose the store to transfer to', 'w'); return; }
    var list = picked(); if (!check(list)) return;
    var other = centreOf(to) && centreOf(to) !== centreOf(S.store);
    if (!confirm('Transfer ' + list.length + ' item' + (list.length === 1 ? '' : 's') + ' from "' + S.store + '" to "' + to + '"' + (other ? ' (OTHER CENTRE)' : '') + '?\n\n' + list.map(function (x) { return '• ' + (x.row.name || x.row.barcode) + ' × ' + x.qty; }).join('\n'))) return;
    var ok = 0;
    list.forEach(function (x) { try { var r = applyInventoryRowsStoreMove([x.row], to, x.qty); if (r && r.ok) ok++; } catch (e) { console.warn(e); } });
    toast(ok + ' item' + (ok === 1 ? '' : 's') + ' transferred to ' + to + ' ✓', ok ? 's' : 'w');
    draw();
  };
  window.bmhStoreMgrReturn = function () {
    var list = picked(); if (!check(list)) return;
    var reason = trimName((document.getElementById('smg-reason') || {}).value || '');
    if (!reason) { toast('Enter the reason for the return', 'w'); return; }
    if (!confirm('Return to vendor from "' + S.store + '"?\n\n' + list.map(function (x) { return '• ' + (x.row.name || x.row.barcode) + ' × ' + x.qty + (x.row.vendor ? ' → ' + x.row.vendor : ''); }).join('\n') + '\n\nReason: ' + reason)) return;
    var sel = document.getElementById('inv-ret-store'), item = document.getElementById('inv-ret-item'), qty = document.getElementById('inv-ret-qty'), ven = document.getElementById('inv-ret-vendor'), rea = document.getElementById('inv-ret-reason');
    if (!sel || !item || !qty || !rea) { toast('Return screen not available here', 'w'); return; }
    var ok = 0;
    list.forEach(function (x) {
      var store = String(x.row.store || '');
      if (![].some.call(sel.options, function (o) { return o.value === store; })) { var o = document.createElement('option'); o.value = store; o.textContent = store; sel.appendChild(o); }
      var before = Number(x.row.stock) || 0;
      sel.value = store; item.value = String(x.row.barcode || x.row.name); qty.value = String(x.qty); if (ven) ven.value = ''; rea.value = reason;
      try { saveInventoryReturn(); } catch (e) { console.warn(e); }
      if ((Number(x.row.stock) || 0) < before) ok++;
    });
    toast(ok + ' item' + (ok === 1 ? '' : 's') + ' returned to vendor ✓', ok ? 's' : 'w');
    draw();
  };

  // ── Merge tab ──
  function mergeHtml() {
    if (!isAdmin()) return '<div style="padding:12px;color:#b55a00">Only admin can merge stores.</div>';
    var others = allStores().filter(function (n) { return cmp(n) !== cmp(S.store); });
    var sim = others.filter(function (n) { return similar(n, S.store); });
    var rest = others.filter(function (n) { return sim.indexOf(n) < 0; });
    var row = function (n, hint) { return '<label style="display:flex;gap:10px;align-items:center;padding:7px 6px;border-bottom:1px solid #f0f0f0;cursor:pointer;font-size:12.5px"><input type="checkbox" class="smg-m" value="' + esc(n) + '" style="width:17px;height:17px;margin:0"> <span style="flex:1"><b>' + esc(n) + '</b>' + (hint ? ' <span style="font-size:10.5px;color:#b55a00;font-weight:800">looks like a duplicate</span>' : '') + '</span><span style="font-size:11px;color:#666">' + (centreOf(n) || '') + ' · ' + units(n) + ' units</span></label>'; };
    return '<div style="font-size:12px;color:#555;margin-bottom:8px">Tick the store heads that are the same as <b>' + esc(S.store) + '</b>. Their stock and all records (purchases, usage, transfers) move under one name.</div>'
      + '<div style="max-height:38vh;overflow:auto;border:1px solid #eee;border-radius:8px">' + (sim.length ? sim.map(function (n) { return row(n, true); }).join('') : '') + rest.map(function (n) { return row(n, false); }).join('') + '</div>'
      + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px"><label class="fl" style="margin:0">Keep the name</label><input id="smg-keep" value="' + esc(S.store) + '" style="flex:1;min-width:200px"><button type="button" class="btn btn-gold btn-sm" onclick="bmhStoreMgrMerge()">🔗 Merge ticked</button></div>';
  }
  window.bmhStoreMgrMerge = function () {
    if (!isAdmin()) return;
    var pick = [].filter.call(document.querySelectorAll('.smg-m'), function (c) { return c.checked; }).map(function (c) { return c.value; });
    if (!pick.length) { toast('Tick the store heads to merge', 'w'); return; }
    var keep = trimName((document.getElementById('smg-keep') || {}).value || S.store);
    var all = [S.store].concat(pick);
    var centres = Array.from(new Set(all.map(centreOf).filter(Boolean)));
    if (!confirm('Merge ' + all.map(function (n) { return '"' + n + '"'; }).join(', ') + ' into "' + keep + '"?' + (centres.length > 1 ? '\n\n⚠ These stores are in DIFFERENT centres (' + centres.join(' & ') + ').' : '') + '\n\nAll stock and records move under "' + keep + '".')) return;
    try {
      var r = bmhApplyInventoryStoreHeadingChange(all, keep);
      if (r && r.changed === false) { toast('Store names already matched', 'w'); return; }
    } catch (e) { console.warn(e); toast('Could not merge the stores', 'w'); return; }
    all.forEach(function (n) { moveDet(n, keep); });
    S.store = keep; S.tab = 'stock';
    toast('Stores merged into ' + keep + ' ✓', 's');
    draw();
  };

  // ── panel ──
  function draw() {
    var ov = document.getElementById('smg-ov'); if (!ov) return;
    var inner = ov.querySelector('#smg-inner');
    inner.innerHTML = header() + '<div id="smg-body">' + (S.tab === 'stock' ? stockHtml() : S.tab === 'merge' ? mergeHtml() : detailsHtml()) + '</div>';
  }
  window.bmhStoreMgrTab = function (k) { S.tab = k; draw(); };
  window.bmhStoreMgrClose = function () { var ov = document.getElementById('smg-ov'); if (ov) ov.remove(); };
  function pickStore() {
    return new Promise(function (resolve) {
      var list = allStores();
      var ov = document.createElement('div'); ov.id = 'smg-pick';
      ov.style.cssText = 'position:fixed;inset:0;z-index:4800;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:14px';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:420px;width:100%;max-height:80vh;display:flex;flex-direction:column;padding:14px"><div style="font-size:15px;font-weight:900;margin-bottom:8px">Choose a store</div><div style="overflow:auto;flex:1">'
        + list.map(function (n, i) { return '<div data-i="' + i + '" style="padding:9px 8px;border-bottom:1px solid #f0f0f0;cursor:pointer;display:flex;justify-content:space-between;font-size:13px"><b>' + esc(n) + '</b><span style="color:#666;font-size:11px">' + units(n) + ' units</span></div>'; }).join('')
        + '</div><button type="button" class="btn btn-gray btn-sm" style="margin-top:10px" id="smg-pick-x">Cancel</button></div>';
      document.body.appendChild(ov);
      ov.querySelector('#smg-pick-x').onclick = function () { ov.remove(); resolve(''); };
      [].forEach.call(ov.querySelectorAll('[data-i]'), function (el) { el.onclick = function () { ov.remove(); resolve(list[Number(el.getAttribute('data-i'))]); }; });
    });
  }
  window.bmhOpenStoreManager = function (store, tab) {
    var go = function (st) {
      if (!st) return;
      S.store = trimName(st); S.tab = tab || 'details'; S.q = '';
      var old = document.getElementById('smg-ov'); if (old) old.remove();
      var ov = document.createElement('div'); ov.id = 'smg-ov';
      ov.style.cssText = 'position:fixed;inset:0;z-index:4500;background:rgba(10,20,40,.45);display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow:auto';
      ov.innerHTML = '<style>#smg-inner input:not([type=checkbox]):not([type=radio]),#smg-inner select{padding:8px 10px;border:1px solid #cfd6e2;border-radius:8px;font-size:13px;width:100%;box-sizing:border-box;background:#fff}#smg-inner input.smg-qty{width:76px;padding:5px 7px;text-align:right}#smg-inner input:disabled{background:#f4f5f7}#smg-inner .fl{font-size:10.5px;font-weight:900;color:#556;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px;display:block}</style><div id="smg-inner" style="background:#fff;border-radius:14px;max-width:820px;width:100%;padding:16px 18px;box-shadow:0 12px 40px rgba(0,0,0,.3)"></div>';
      ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
      document.body.appendChild(ov);
      draw();
      loadDet().then(function () { if (S.tab === 'details') draw(); });
    };
    if (store) go(store); else pickStore().then(go);
  };
  // "Edit" / "Edit store heading" open the panel instead of the one-line prompt
  if (typeof window.renameInventoryStoreNamePrompt === 'function') {
    window.renameInventoryStoreNamePrompt = function (storeName) { window.bmhOpenStoreManager(storeName || '', 'details'); };
  }
})();
