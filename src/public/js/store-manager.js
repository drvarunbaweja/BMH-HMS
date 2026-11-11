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
  function canEdit() {
    if (isAdmin()) return true;
    var ni = document.querySelector('.ni[onclick*="nav(\'inventory\'"]');
    return !!ni || !!(document.getElementById('pg-inventory') && document.getElementById('pg-inventory').classList.contains('active'));
  }
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
    var d = DET[dkey(S.store)] || {}, adm = canEdit(), dis = adm ? '' : ' disabled';
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
      + (adm ? '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" class="btn btn-gold btn-sm" onclick="bmhStoreMgrSaveDetails()">💾 Save details</button></div>' : '<div style="font-size:11.5px;color:#b55a00;margin-top:10px">You can view these details; ask the admin to change them.</div>');
  }
  window.bmhStoreMgrSaveDetails = function () {
    if (!canEdit()) return;
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
    var cats = Array.from(new Set(rows.map(catOf))).sort(function (a, b) { return (a.toLowerCase() === 'iol' ? -1 : b.toLowerCase() === 'iol' ? 1 : a.localeCompare(b)); });
    if (S.cat && cats.indexOf(S.cat) < 0) S.cat = '';
    var shown = rows.filter(function (r) { return !S.cat || catOf(r) === S.cat; });
    if (S.cat && S.cat.toLowerCase() === 'iol') shown.sort(function (a, b) { return String(a.name || '').localeCompare(String(b.name || '')) || (parseFloat(a.power) || 0) - (parseFloat(b.power) || 0); });
    shown = q ? shown.filter(function (r) { return cmp([r.name, r.barcode, r.batchNo, r.cat, r.vendor, r.power, r.serialNo].join(' ')).indexOf(q) >= 0; }) : shown;
    // ticked items stay listed (at the top) while you search / change category, so several can be picked one by one
    S.picked = S.picked || {};
    var pinned = rows.filter(function (r) { return S.picked[String(r.barcode)] != null; });
    shown = pinned.concat(shown.filter(function (r) { return S.picked[String(r.barcode)] == null; }));
    var catBar = cats.length > 1 ? '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' + ['' ].concat(cats).map(function (c) { var on = (S.cat || '') === c; var n = rows.filter(function (r) { return !c || catOf(r) === c; }).reduce(function (t, r) { return t + (Number(r.stock) || 0); }, 0); return '<button type="button" onclick="bmhStoreMgrCat(\'' + esc(c).replace(/'/g, '') + '\')" class="btn btn-xs ' + (on ? 'btn-blue' : 'btn-outline') + '">' + esc(c || 'All') + ' (' + n + ')</button>'; }).join('') + '</div>' : '';
    var targets = allStores().filter(function (n) { return cmp(n) !== cmp(S.store); });
    if (!rows.length) return '<div style="padding:16px;text-align:center;color:#888">No stock in this store.</div>' + historyHtml();
    var today = new Date().toISOString().slice(0, 7);
    var body = shown.map(function (r) {
      var exp = String(r.exp || ''), soon = exp && exp.slice(0, 7) <= today;
      var pk = S.picked[String(r.barcode)];
      return '<tr style="border-bottom:1px solid #f0f0f0' + (pk != null ? ';background:#fff8e1' : '') + '"><td style="padding:5px"><input type="checkbox" class="smg-c" data-b="' + esc(r.barcode) + '"' + (pk != null ? ' checked' : '') + ' onchange="bmhStoreMgrPick(this)" style="width:17px;height:17px;margin:0"></td>'
        + '<td style="padding:5px"><b>' + esc(r.name || r.barcode) + '</b><div style="font-size:10.5px;color:#666">' + esc([r.cat, r.power ? r.power + ' D' : '', r.serialNo ? 'SN ' + r.serialNo : '', r.batchNo ? 'Batch ' + r.batchNo : '', r.vendor].filter(Boolean).join(' · ')) + '</div></td>'
        + '<td style="padding:5px;white-space:nowrap;color:' + (soon ? '#c62828;font-weight:800' : '#333') + '">' + esc(exp || '—') + '</td>'
        + '<td style="padding:5px;text-align:right;font-weight:800">' + esc(r.stock) + '</td>'
        + '<td style="padding:5px;text-align:right"><input type="number" class="smg-qty" data-b="' + esc(r.barcode) + '" min="1" max="' + esc(r.stock) + '" value="' + esc(pk != null && pk !== '' ? pk : r.stock) + '" oninput="bmhStoreMgrPickQty(this)"></td></tr>';
    }).join('');
    return catBar + '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px"><input id="smg-q" value="' + esc(S.q || '') + '" placeholder="Search item / batch / vendor" oninput="bmhStoreMgrSearch(this.value)" style="flex:1;min-width:180px"><label style="font-size:12px;display:flex;gap:6px;align-items:center;cursor:pointer"><input type="checkbox" id="smg-all" style="width:auto;margin:0" onchange="document.querySelectorAll(\'.smg-c\').forEach(function(c){c.checked=document.getElementById(\'smg-all\').checked;bmhStoreMgrPick(c,1)})"> Select all shown</label>' + '<span id="smg-pickn" style="font-size:11.5px;color:#8a6400' + (Object.keys(S.picked).length ? '' : ';display:none') + '"><b>' + Object.keys(S.picked).length + ' ticked</b> (kept while you search) <button type="button" class="btn btn-xs btn-outline" onclick="bmhStoreMgrClearPicks()">Clear ticks</button></span>' + '</div>'
      + '<div style="max-height:44vh;overflow:auto;border:1px solid #eee;border-radius:8px"><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr style="background:#f3f5f9;position:sticky;top:0"><th></th><th style="text-align:left;padding:5px">Item</th><th style="text-align:left;padding:5px">Expiry</th><th style="text-align:right;padding:5px">In stock</th><th style="text-align:right;padding:5px">Qty to move</th></tr></thead><tbody>' + (body || '<tr><td colspan="5" style="padding:10px;text-align:center;color:#888">Nothing matches</td></tr>') + '</tbody></table></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px;margin-top:12px">'
      + '<div style="border:1px solid #dfe5ef;border-radius:10px;padding:10px"><div style="font-weight:900;font-size:12.5px;margin-bottom:6px">➡️ Transfer ticked items</div><select id="smg-to" style="margin-bottom:8px"><option value="">Choose store…</option>' + targets.map(function (n) { return '<option value="' + esc(n) + '">' + esc(n) + (centreOf(n) && centreOf(n) !== centreOf(S.store) ? ' (other centre)' : '') + '</option>'; }).join('') + '</select><button type="button" class="btn btn-blue btn-sm" style="width:100%" onclick="bmhStoreMgrTransfer()">Transfer</button></div>'
      + '<div style="border:1px solid #f0d9c0;border-radius:10px;padding:10px"><div style="font-weight:900;font-size:12.5px;margin-bottom:6px">↩️ Return ticked items to vendor</div><input id="smg-reason" placeholder="Reason — expired / damaged / excess / wrong supply" style="margin-bottom:8px"><button type="button" class="btn btn-sm" style="width:100%;background:#b55a00;color:#fff" onclick="bmhStoreMgrReturn()">Return to vendor</button><div style="font-size:10.5px;color:#666;margin-top:5px">Reduces the vendor\'s bill, same as Inventory → Return.</div></div>'
      + '</div>' + historyHtml();
  }
  function catOf(r) { return String(r.cat || 'General').trim() || 'General'; }
  window.bmhStoreMgrPick = function (c, quiet) {
    S.picked = S.picked || {};
    var b = String(c.getAttribute('data-b'));
    if (c.checked) { var q = [].find.call(document.querySelectorAll('.smg-qty'), function (x) { return x.getAttribute('data-b') === b; }); S.picked[b] = q ? q.value : ''; }
    else delete S.picked[b];
    var n = Object.keys(S.picked).length, el = document.getElementById('smg-pickn');
    if (el) { el.style.display = n ? '' : 'none'; var t = el.querySelector('b'); if (t) t.textContent = n + ' ticked'; }
    var tr = c.closest('tr'); if (tr) tr.style.background = c.checked ? '#fff8e1' : '';
  };
  window.bmhStoreMgrPickQty = function (el) { S.picked = S.picked || {}; var b = String(el.getAttribute('data-b')); if (S.picked[b] != null) S.picked[b] = el.value; };
  window.bmhStoreMgrClearPicks = function () { S.picked = {}; var box = document.getElementById('smg-body'); if (box) box.innerHTML = stockHtml(); };
  window.bmhStoreMgrCat = function (c) { S.cat = c; var box = document.getElementById('smg-body'); if (box) box.innerHTML = stockHtml(); };
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
    var ok = 0, noteNo = noteNumber('TN'), moved = [];
    list.forEach(function (x) {
      var meta = { name: x.row.name || x.row.barcode, batchNo: x.row.batchNo || '', exp: x.row.exp || '', power: x.row.power || '', serialNo: x.row.serialNo || '', cat: catOf(x.row) };
      try { var r = applyInventoryRowsStoreMove([x.row], to, x.qty); if (r && r.ok) { ok++; (r.transferRows || []).forEach(function (t) { t.noteNo = noteNo; t.batchNo = t.batchNo || meta.batchNo; t.exp = t.exp || meta.exp; t.power = t.power || meta.power; t.serialNo = t.serialNo || meta.serialNo; moved.push(t); }); } } catch (e) { console.warn(e); }
    });
    if (moved.length) { try { saveBmhFinancials(); } catch (e) {} }
    toast(ok + ' item' + (ok === 1 ? '' : 's') + ' transferred to ' + to + ' ✓', ok ? 's' : 'w');
    S.last = moved.length ? { type: 'TN', noteNo: noteNo } : null;
    S.picked = {};
    draw();
  };
  window.bmhStoreMgrReturn = function () {
    var list = picked(); if (!check(list)) return;
    var reason = trimName((document.getElementById('smg-reason') || {}).value || '');
    if (!reason) { toast('Enter the reason for the return', 'w'); return; }
    if (!confirm('Return to vendor from "' + S.store + '"?\n\n' + list.map(function (x) { return '• ' + (x.row.name || x.row.barcode) + ' × ' + x.qty + (x.row.vendor ? ' → ' + x.row.vendor : ''); }).join('\n') + '\n\nReason: ' + reason)) return;
    var sel = document.getElementById('inv-ret-store'), item = document.getElementById('inv-ret-item'), qty = document.getElementById('inv-ret-qty'), ven = document.getElementById('inv-ret-vendor'), rea = document.getElementById('inv-ret-reason');
    if (!sel || !item || !qty || !rea) { toast('Return screen not available here', 'w'); return; }
    var ok = 0, noteNo = noteNumber('RN'), tagged = 0;
    list.forEach(function (x) {
      var store = String(x.row.store || '');
      var nBefore = (window.BMH_PURCHASES || []).length;
      if (![].some.call(sel.options, function (o) { return o.value === store; })) { var o = document.createElement('option'); o.value = store; o.textContent = store; sel.appendChild(o); }
      var before = Number(x.row.stock) || 0;
      sel.value = store; item.value = String(x.row.barcode || x.row.name); qty.value = String(x.qty); if (ven) ven.value = ''; rea.value = reason;
      try { saveInventoryReturn(); } catch (e) { console.warn(e); }
      if ((Number(x.row.stock) || 0) < before) {
        ok++;
        (window.BMH_PURCHASES || []).slice(nBefore).forEach(function (p) { if (p && /^RET/.test(String(p.id || ''))) { p.noteNo = noteNo; p.batchNo = p.batchNo || x.row.batchNo || ''; p.exp = p.exp || x.row.exp || ''; p.power = p.power || x.row.power || ''; p.serialNo = p.serialNo || x.row.serialNo || ''; tagged++; } });
      }
    });
    if (tagged) { try { saveBmhFinancials(); } catch (e) {} }
    toast(ok + ' item' + (ok === 1 ? '' : 's') + ' returned to vendor ✓', ok ? 's' : 'w');
    S.last = tagged ? { type: 'RN', noteNo: noteNo } : null;
    S.picked = {};
    draw();
  };

  // ── Merge tab ──
  function mergeHtml() {
    if (!canEdit()) return '<div style="padding:12px;color:#b55a00">You cannot merge stores from this login.</div>';
    var others = allStores().filter(function (n) { return cmp(n) !== cmp(S.store); });
    var sim = others.filter(function (n) { return similar(n, S.store); });
    var rest = others.filter(function (n) { return sim.indexOf(n) < 0; });
    var row = function (n, hint) { return '<label style="display:flex;gap:10px;align-items:center;padding:7px 6px;border-bottom:1px solid #f0f0f0;cursor:pointer;font-size:12.5px"><input type="checkbox" class="smg-m" value="' + esc(n) + '" style="width:17px;height:17px;margin:0"> <span style="flex:1"><b>' + esc(n) + '</b>' + (hint ? ' <span style="font-size:10.5px;color:#b55a00;font-weight:800">looks like a duplicate</span>' : '') + '</span><span style="font-size:11px;color:#666">' + (centreOf(n) || '') + ' · ' + units(n) + ' units</span></label>'; };
    return '<div style="font-size:12px;color:#555;margin-bottom:8px">Tick the store heads that are the same as <b>' + esc(S.store) + '</b>. Their stock and all records (purchases, usage, transfers) move under one name.</div>'
      + '<div style="max-height:38vh;overflow:auto;border:1px solid #eee;border-radius:8px">' + (sim.length ? sim.map(function (n) { return row(n, true); }).join('') : '') + rest.map(function (n) { return row(n, false); }).join('') + '</div>'
      + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px"><label class="fl" style="margin:0">Keep the name</label><input id="smg-keep" value="' + esc(S.store) + '" style="flex:1;min-width:200px"><button type="button" class="btn btn-gold btn-sm" onclick="bmhStoreMgrMerge()">🔗 Merge ticked</button></div>';
  }
  window.bmhStoreMgrMerge = function () {
    if (!canEdit()) return;
    var pick = [].filter.call(document.querySelectorAll('.smg-m'), function (c) { return c.checked; }).map(function (c) { return c.value; });
    if (!pick.length) { toast('Tick the store heads to merge', 'w'); return; }
    var keep = trimName((document.getElementById('smg-keep') || {}).value || S.store);
    var all = [S.store].concat(pick);
    var centres = Array.from(new Set(all.map(centreOf).filter(Boolean)));
    if (centres.length > 1 && !isAdmin()) { toast('Stores of Chandigarh and Ropar can only be merged by the admin', 'w'); return; }
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

  // ── transfer / return notes for signatures ──
  function noteNumber(prefix) { var d = new Date(); var p2 = function (n) { return String(n).padStart(2, '0'); }; return prefix + '-' + String(d.getFullYear()).slice(2) + p2(d.getMonth() + 1) + p2(d.getDate()) + '-' + p2(d.getHours()) + p2(d.getMinutes()) + p2(d.getSeconds()); }
  function noteRows(type, noteNo) {
    if (type === 'TN') return (window.BMH_INVENTORY_TRANSFERS || []).filter(function (t) { return t && t.noteNo === noteNo; });
    return (window.BMH_PURCHASES || []).filter(function (p) { return p && p.noteNo === noteNo; });
  }
  function historyHtml() {
    var k = cmp(S.store), notes = {};
    (window.BMH_INVENTORY_TRANSFERS || []).forEach(function (t) {
      if (!t || (cmp(t.fromStore) !== k && cmp(t.toStore) !== k)) return;
      var key = t.noteNo ? 'TN|' + t.noteNo : 'TX|' + String(t.batchId || t.id);
      var n = notes[key] || (notes[key] = { type: t.noteNo ? 'TN' : 'TX', noteNo: t.noteNo || '', ids: [], ts: t.ts, from: t.fromStore, to: t.toStore, qty: 0, items: 0 });
      n.ids.push(t.id); n.qty += Number(t.qty) || 0; n.items++;
    });
    (window.BMH_PURCHASES || []).forEach(function (p) {
      if (!p || !/^RET/.test(String(p.id || '')) || cmp(p.store) !== k) return;
      var key = p.noteNo ? 'RN|' + p.noteNo : 'RX|' + p.id;
      var n = notes[key] || (notes[key] = { type: p.noteNo ? 'RN' : 'RX', noteNo: p.noteNo || '', ids: [], ts: p.ts, vendor: p.vendor, qty: 0, items: 0 });
      n.ids.push(p.id); n.qty += Math.abs(Number(p.qty) || 0); n.items++;
    });
    var list = Object.keys(notes).map(function (x) { return notes[x]; }).sort(function (a, b) { return String(b.ts).localeCompare(String(a.ts)); }).slice(0, 12);
    if (!list.length) return '';
    return '<div style="margin-top:14px"><div style="font-size:11px;font-weight:900;color:#1A3C6E;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px">Recent transfers & returns — reprint for signatures</div>'
      + list.map(function (n) {
        var isT = n.type === 'TN' || n.type === 'TX';
        var label = isT ? (cmp(n.from) === k ? '➡️ To ' + esc(n.to) : '⬅️ From ' + esc(n.from)) : '↩️ Returned to ' + esc(n.vendor || 'vendor');
        var arg = n.noteNo ? '\'' + n.type + '\',\'' + esc(n.noteNo) + '\'' : '\'' + n.type + '\',\'\',\'' + esc(n.ids.join(',')) + '\'';
        return '<div style="display:flex;gap:8px;align-items:center;padding:6px 4px;border-bottom:1px solid #f0f0f0;font-size:12px"><span style="color:#666;white-space:nowrap">' + esc(new Date(n.ts).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })) + '</span><span style="flex:1">' + label + ' · ' + n.items + ' item' + (n.items === 1 ? '' : 's') + ', ' + n.qty + ' units' + (n.noteNo ? ' <span style="color:#888">(' + esc(n.noteNo) + ')</span>' : '') + '</span><button type="button" class="btn btn-xs btn-outline" onclick="bmhStoreMgrPrintNote(' + arg + ')">🖨️ Print</button></div>';
      }).join('') + '</div>';
  }
  window.bmhStoreMgrPrintNote = function (type, noteNo, ids) {
    var rows;
    if (noteNo) rows = noteRows(type, noteNo);
    else { var set = {}; String(ids || '').split(',').forEach(function (i) { set[i] = 1; }); rows = (type === 'TX' ? (window.BMH_INVENTORY_TRANSFERS || []) : (window.BMH_PURCHASES || [])).filter(function (r) { return r && set[r.id]; }); }
    if (!rows.length) { toast('Nothing to print', 'w'); return; }
    var isT = type === 'TN' || type === 'TX';
    var hosp = 'Baweja Multispeciality Hospital'; try { hosp = getHospitalDetailValue('Hospital Name', hosp); } catch (e) {}
    var ts = rows[0].ts ? new Date(rows[0].ts) : new Date();
    var from = isT ? rows[0].fromStore : rows[0].store, to = isT ? rows[0].toStore : (rows[0].vendor || 'Vendor');
    var dF = DET[dkey(from)] || {}, dT = isT ? (DET[dkey(to)] || {}) : {};
    var total = rows.reduce(function (t, r) { return t + Math.abs(Number(r.qty) || 0); }, 0);
    var value = isT ? 0 : rows.reduce(function (t, r) { return t + Math.abs(Number(r.totalCost) || 0); }, 0);
    var reason = !isT ? Array.from(new Set(rows.map(function (r) { return r.reason; }).filter(Boolean))).join('; ') : '';
    var sig = function (title, name) { return '<div class="sg"><div class="sl"></div><b>' + esc(title) + '</b><div>Name: ' + esc(name || '______________________') + '</div><div>Date & time: ____________________</div></div>'; };
    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>' + (isT ? 'Stock transfer note' : 'Stock return note') + '</title><style>'
      + '@page{size:A4;margin:12mm}body{font-family:Arial,sans-serif;font-size:11.5px;color:#111;margin:0}'
      + '.hd{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #1A3C6E;padding-bottom:6px;margin-bottom:10px}.t{font-size:18px;font-weight:900;color:#1A3C6E}.h{font-size:13px;font-weight:800}'
      + '.m{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}.c{border:1px solid #d7dfef;border-radius:8px;padding:7px 9px;background:#f8fbff}.c b{display:block;font-size:9.5px;color:#5b6b86;text-transform:uppercase;letter-spacing:.4px}'
      + 'table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccd5e4;padding:6px 7px;vertical-align:top}th{background:#eef4ff;color:#1A3C6E;text-align:left;font-size:10.5px}.n{text-align:right;font-weight:800}'
      + '.sgs{display:flex;gap:24px;margin-top:40px}.sg{flex:1;font-size:11px;line-height:1.7}.sl{border-top:1px solid #111;margin-bottom:4px;height:34px;border-top:0;border-bottom:1px solid #111}'
      + '</style></head><body>'
      + '<div class="hd"><div><div class="h">' + esc(hosp) + '</div><div class="t">' + (isT ? 'Stock Transfer Note' : 'Stock Return Note (to vendor)') + '</div></div><div style="text-align:right;font-size:11px">Note no. <b>' + esc(noteNo || rows[0].id) + '</b><br>' + esc(ts.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })) + '</div></div>'
      + '<div class="m"><div class="c"><b>From store</b>' + esc(from || '') + (dF.inCharge ? '<div style="font-size:10.5px;color:#555">In-charge: ' + esc(dF.inCharge) + '</div>' : '') + '</div><div class="c"><b>' + (isT ? 'To store' : 'Returned to vendor') + '</b>' + esc(to || '') + (dT.inCharge ? '<div style="font-size:10.5px;color:#555">In-charge: ' + esc(dT.inCharge) + '</div>' : '') + '</div>'
      + '<div class="c"><b>Entered by</b>' + esc(rows[0].user || who() || '') + '</div><div class="c"><b>Total</b>' + total + ' units' + (value ? ' · ₹' + value.toLocaleString('en-IN') : '') + '</div>' + (reason ? '<div class="c" style="grid-column:1/-1"><b>Reason</b>' + esc(reason) + '</div>' : '') + '</div>'
      + '<table><thead><tr><th style="width:28px">#</th><th>Item</th><th>Batch / serial</th><th>Expiry</th>' + (isT ? '' : '<th style="text-align:right">Rate</th>') + '<th style="text-align:right;width:60px">Qty</th></tr></thead><tbody>'
      + rows.map(function (r, i) { return '<tr><td>' + (i + 1) + '</td><td>' + esc(r.itemName || '') + (r.power && String(r.itemName || '').indexOf(String(r.power)) < 0 ? ' · ' + esc(r.power) + ' D' : '') + '<div style="font-size:9.5px;color:#666">' + esc(r.barcode || '') + '</div></td><td>' + esc([r.batchNo, r.serialNo].filter(Boolean).join(' / ') || '—') + '</td><td>' + esc(r.exp || '—') + '</td>' + (isT ? '' : '<td class="n">' + (r.cost ? '₹' + Number(r.cost).toLocaleString('en-IN') : '—') + '</td>') + '<td class="n">' + Math.abs(Number(r.qty) || 0) + '</td></tr>'; }).join('')
      + '<tr><td colspan="' + (isT ? 4 : 5) + '" class="n">Total</td><td class="n">' + total + '</td></tr></tbody></table>'
      + '<div class="sgs">' + (isT ? sig('Issued by (from store)', dF.inCharge) + sig('Received by (to store in-charge)', dT.inCharge) : sig('Returned by (store in-charge)', dF.inCharge) + sig('Received by (vendor representative)', '') ) + '</div>'
      + '<div style="font-size:10px;color:#666;margin-top:16px">' + (isT ? 'Received the above items in good condition.' : 'Received the above items back from the hospital. Credit to be adjusted against our bill.') + '</div>'
      + '</body></html>';
    try { safePrint(html); } catch (e) { var w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); w.print(); } }
  };

  // ── panel ──
  function draw() {
    var ov = document.getElementById('smg-ov'); if (!ov) return;
    var inner = ov.querySelector('#smg-inner');
    var lastBox = S.last && S.tab === 'stock' ? '<div style="background:#eef7f0;border:1px solid #b9dfc4;border-radius:10px;padding:9px 12px;margin-bottom:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap"><div style="flex:1;font-size:12.5px">✅ ' + (S.last.type === 'TN' ? 'Transfer' : 'Return') + ' saved — note <b>' + esc(S.last.noteNo) + '</b>. Print it for signatures' + (S.last.type === 'TN' ? ' of the receiving store in-charge.' : ' of the vendor.') + '</div><button type="button" class="btn btn-gold btn-sm" onclick="bmhStoreMgrPrintNote(\'' + S.last.type + '\',\'' + esc(S.last.noteNo) + '\')">🖨️ Print ' + (S.last.type === 'TN' ? 'transfer' : 'return') + ' note</button></div>' : '';
    inner.innerHTML = header() + lastBox + '<div id="smg-body">' + (S.tab === 'stock' ? stockHtml() : S.tab === 'merge' ? mergeHtml() : detailsHtml()) + '</div>';
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
  window.bmhOpenStoreManager = function (store, tab, opts) {
    var go = function (st) {
      if (!st) return;
      S.store = trimName(st); S.tab = tab || 'details'; S.q = ''; S.last = null; S.cat = (opts && opts.cat) || ''; S.picked = {};
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

/* Store manager — open it from the stock list for every login with inventory access:
 * • "✏️ Edit / move stock" next to each store name (admin's own "Edit" stays as it is),
 * • clicking a category (e.g. IOL) opens the panel on that category's stock, ready to transfer / return.
 */
(function () {
  'use strict';
  function addButtons() {
    var host = document.getElementById('pg-inventory'); if (!host) return;
    [].forEach.call(host.querySelectorAll('button[onclick^="bmhSelectInventoryStockCategory("]'), function (b) {
      var box = b.closest('div[style*="border:1px solid var(--g4)"]'); if (!box || box.getAttribute('data-smg')) return;
      box.setAttribute('data-smg', '1');
      var m = (b.getAttribute('onclick') || '').match(/^bmhSelectInventoryStockCategory\((.*)\)$/); if (!m) return;
      var args; try { args = JSON.parse('[' + m[1].replace(/'/g, '"') + ']'); } catch (e) { args = null; }
      if (!args || !args[1]) return;
      var title = box.querySelector('div[style*="font-weight:900"]'); if (!title) return;
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn btn-xs btn-gold';
      btn.textContent = '✏️ Edit / move stock'; btn.title = 'Details, transfer / return stock, merge duplicates';
      btn.onclick = function () { window.bmhOpenStoreManager(args[1], 'stock'); };
      title.parentNode.appendChild(btn);
    });
  }
  ['_renderStockListNow', 'renderStockList'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { var r = o.apply(this, arguments); try { setTimeout(addButtons, 0); } catch (e) {} return r; };
  });
  var origCat = window.bmhSelectInventoryStockCategory;
  if (typeof origCat === 'function') {
    window.bmhSelectInventoryStockCategory = function (dept, store, cat) {
      var r = origCat.apply(this, arguments);
      try { if (store && window.bmhOpenStoreManager) window.bmhOpenStoreManager(store, 'stock', { cat: String(cat || '') }); } catch (e) { console.warn('[store-manager]', e); }
      return r;
    };
  }
})();
