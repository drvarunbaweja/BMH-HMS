/* BMH — one invoice = one vendor bill.
 * • "+ Add vendor bill" (Billing → Vendors): if the same vendor already has a bill with that invoice number, a pop-up
 *   says it has already been entered and whether it is paid / part paid / unpaid, and nothing new is saved.
 * • Stock entry (Inventory → stock in, IOL grid): if the invoice was entered on an earlier day, a pop-up shows the
 *   existing bill and its status; staff choose to add this stock to that SAME bill or to stop. When an item already
 *   appears on that invoice, they are asked before entering it a second time.
 *   Either way, a second bill is never created for the same vendor + invoice number: extra items go onto the first bill.
 * Nothing else is changed.
 */
(function () {
  'use strict';
  function norm(s) { try { return normalizeInventoryCompareText(String(s || '')); } catch (e) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); } }
  function invKey(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function inr(n) { return '₹' + (Number(n) || 0).toLocaleString('en-IN'); }
  function due(v) { try { return bmhVendorBillOutstanding(v); } catch (e) { return Math.max(0, (Number(v.amount) || 0) - (Number(v.paidAmount) || 0)); } }
  function dateOf(v) { return String(v.billDateKey || v.createdAt || '').slice(0, 10); }
  function fmtDate(k) { var p = String(k || '').slice(0, 10).split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : (k || '—'); }
  function today() { try { return todayKey(); } catch (e) { try { return localDateKey(new Date()); } catch (er) { return new Date().toISOString().slice(0, 10); } } }
  function findBills(vendor, invoice) {
    var k = invKey(invoice), vn = norm(vendor);
    if (!k || !vn) return [];
    return (window.BMH_VENDOR_BILLS || []).filter(function (v) { return v && !v.opening && norm(v.vendor) === vn && invKey(v.invoiceNo) === k; })
      .sort(function (a, b) { return String(a.createdAt || '').localeCompare(String(b.createdAt || '')); });
  }
  function statusText(v) {
    var d = due(v), paid = Number(v.paidAmount) || 0;
    if (d <= 0) return 'PAID' + (paid ? ' (' + inr(paid) + (v.paidAt ? ' on ' + fmtDate(String(v.paidAt).slice(0, 10)) : '') + (v.paidRef ? ', ref ' + v.paidRef : '') + ')' : '');
    if (paid > 0) return 'PART PAID — paid ' + inr(paid) + (v.paidAt ? ' on ' + fmtDate(String(v.paidAt).slice(0, 10)) : '') + ', ' + inr(d) + ' still due';
    return 'UNPAID — ' + inr(d) + ' due';
  }
  function describe(v) { return 'Bill / invoice "' + (v.invoiceNo || '') + '" of ' + (v.vendor || '') + ' has already been entered on ' + fmtDate(dateOf(v)) + ' for ' + inr(v.amount) + '.\n\nStatus: ' + statusText(v); }
  window.bmhVendorInvoiceCheck = { findBills: findBills, describe: describe };

  // 1) manual "+ Add vendor bill"
  if (typeof window.bmhAddVendorBill === 'function') {
    var origAdd = window.bmhAddVendorBill;
    window.bmhAddVendorBill = function () {
      var g = function (id) { var el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; };
      var vendor = g('inv-vend-name') || g('bmh-vend-name') || g('inv-vendor-filter') || g('inv-vendor-search');
      var inv = g('inv-vend-inv') || g('bmh-vend-inv');
      var ex = findBills(vendor, inv);
      if (ex.length) {
        window.alert(describe(ex[0]) + '\n\nIt cannot be entered again. To pay it, use Pay on that bill or the vendor statement.');
        try { bmhSelectVendorBill(ex[0].id); } catch (e) {}
        return;
      }
      return origAdd.apply(this, arguments);
    };
  }

  // 2) stock entry: ask before re-using an invoice from an earlier day, and before entering the same item twice on one invoice
  var approved = {}; // vendor|invoice → existing bill id the user agreed to add to; vendor|invoice|item → agreed to enter again
  function stockInvoice(item) {
    var g = function (id) { var el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; };
    // same fallbacks the stock-entry code uses when the boxes are empty (the item's last vendor / invoice)
    return { vendor: g('inv-in-vendor') || g('inv-iol-vendor') || String((item && item.vendor) || '').trim(), invoice: g('inv-in-invoice') || String((item && item.invoiceNo) || '').trim() };
  }
  function checkStock(itemName, barcode, item) {
    var si = stockInvoice(item);
    var ex = findBills(si.vendor, si.invoice);
    if (!ex.length) return true;
    var key = norm(si.vendor) + '|' + invKey(si.invoice);
    var t = today();
    var first = ex[0];
    if (dateOf(first) !== t && approved[key] !== first.id) {
      var ok = window.confirm(describe(first) + '\n\nIs this more stock from the SAME bill?\n\nOK = add this stock to that same bill (no new bill is made)\nCancel = stop — do not enter it');
      if (!ok) { try { showToast('Not entered — invoice already exists', 'w'); } catch (e) {} return false; }
      approved[key] = first.id;
    }
    if (itemName || barcode) {
      var vn = norm(si.vendor), ik = invKey(si.invoice), nm = norm(itemName);
      var prev = (window.BMH_PURCHASES || []).filter(function (p) {
        return p && norm(p.vendor) === vn && invKey(p.invoiceNo) === ik && !/^RET/.test(String(p.id || '')) && ((barcode && String(p.barcode || '') === String(barcode)) || (nm && norm(p.itemName) === nm));
      });
      var ik2 = key + '|' + (barcode || nm);
      if (prev.length && !approved[ik2]) {
        var last = prev[prev.length - 1];
        var ok2 = window.confirm('"' + (last.itemName || itemName) + '" has already been entered on invoice "' + si.invoice + '" (qty ' + (last.qty || '?') + ', ' + inr(last.totalCost) + ', ' + fmtDate(String(last.ts || last.billDateKey || '').slice(0, 10)) + ').\n\nEnter it again?\n\nOK = yes, it is extra stock\nCancel = no, it was already entered');
        if (!ok2) { try { showToast('Not entered again', 'w'); } catch (e) {} return false; }
        approved[ik2] = 1;
      }
    }
    return true;
  }
  if (typeof window.processBC === 'function') {
    var origBC = window.processBC;
    window.processBC = function (mode, code) {
      if (mode === 'in' && code) {
        var it = null;
        var bm = null; try { bm = BCMAP; } catch (e) { bm = window.BCMAP || {}; }
        try { it = (bm || {})[code] || (typeof bmhFindInventoryItemForText === 'function' ? bmhFindInventoryItemForText(code) : null); } catch (e) {}
        if (!checkStock(it ? it.name : code, it ? it.barcode : code, it)) return;
      }
      return origBC.apply(this, arguments);
    };
  }
  if (typeof window.saveIolInventoryGrid === 'function') {
    var origIol = window.saveIolInventoryGrid;
    window.saveIolInventoryGrid = function () {
      if (!checkStock('', '')) return;
      return origIol.apply(this, arguments);
    };
  }
  // never keep two bills for the same vendor + invoice: fold a newly made one into the first
  if (typeof window.bmhRecordInventoryPurchase === 'function') {
    var origRec = window.bmhRecordInventoryPurchase;
    window.bmhRecordInventoryPurchase = function () {
      var list = window.BMH_VENDOR_BILLS || [];
      var before = {}; list.forEach(function (v) { if (v && v.id) before[v.id] = 1; });
      var r = origRec.apply(this, arguments);
      try {
        var fresh = (window.BMH_VENDOR_BILLS || []).filter(function (v) { return v && v.id && !before[v.id]; });
        var changed = false;
        fresh.forEach(function (nv) {
          var same = findBills(nv.vendor, nv.invoiceNo).filter(function (v) { return v.id !== nv.id; });
          if (!same.length) return;
          var keep = same[0];
          keep.amount = Math.round(((Number(keep.amount) || 0) + (Number(nv.amount) || 0)) * 100) / 100;
          keep.billFile = keep.billFile || nv.billFile || null;
          keep.uploadedName = keep.uploadedName || nv.uploadedName || '';
          (keep.mergedGroups = keep.mergedGroups || []).push(nv.billGroup || nv.id);
          keep.status = due(keep) <= 0 ? 'paid' : ((Number(keep.paidAmount) || 0) > 0 ? 'partial' : 'pending');
          var i = window.BMH_VENDOR_BILLS.indexOf(nv); if (i >= 0) window.BMH_VENDOR_BILLS.splice(i, 1);
          changed = true;
        });
        if (changed) { try { saveBmhFinancials(); } catch (e) {} try { bmhRenderVendorTables(); } catch (e) {} }
      } catch (e) { console.warn('[vendor-guard]', e); }
      return r;
    };
  }
})();

/* BMH — remove duplicate vendor bills (admin), and make deletions of vendor bills stick.
 * • A deleted / removed bill's id is recorded at Firebase vendorBillsRemoved/<id> together with a full copy of the
 *   bill (so it can be restored), and it is kept out of every device's list from then on. Without this, a phone or
 *   computer that still had the old bill saved locally could bring it back.
 * • "🧹 Remove duplicate bills" (admin, Billing → Vendors): finds bills of the same vendor with the same invoice
 *   number, shows what will happen, and on confirmation keeps ONE bill per invoice:
 *     – same amount  → keep the paid / first copy, remove the extra copies. If more than one copy was marked paid,
 *                      the extra payment is kept as credit with that vendor (nothing paid is lost from the books).
 *     – different amounts → (usually parts of one invoice entered on different days) combined into one bill
 *                      with the amounts and payments added together. This can be changed per invoice before removing.
 */
(function () {
  'use strict';
  var LS = 'bmh_vendor_bill_removed_v1';
  var TOMB = {};
  try { TOMB = JSON.parse(localStorage.getItem(LS) || '{}') || {}; } catch (e) { TOMB = {}; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function inr(n) { return '₹' + (Number(n) || 0).toLocaleString('en-IN'); }
  function norm(s) { try { return normalizeInventoryCompareText(String(s || '')); } catch (e) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); } }
  function invKey(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function due(v) { try { return bmhVendorBillOutstanding(v); } catch (e) { return Math.max(0, (Number(v.amount) || 0) - (Number(v.paidAmount) || 0)); } }
  function dateOf(v) { return String(v.billDateKey || v.createdAt || '').slice(0, 10); }
  function fmtDate(k) { var p = String(k || '').slice(0, 10).split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : (k || '—'); }
  function isAdmin() { try { return typeof isAdminUser === 'function' ? isAdminUser() : !!(CURRENT_USER && CURRENT_USER.isAdmin); } catch (e) { return false; } }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) { return ''; } }
  function bills() { return window.BMH_VENDOR_BILLS || []; }
  function saveTombLocal() { try { localStorage.setItem(LS, JSON.stringify(TOMB)); } catch (e) {} }
  function prune() {
    var list = bills(), changed = false;
    for (var i = list.length - 1; i >= 0; i--) { if (list[i] && list[i].id && TOMB[list[i].id]) { list.splice(i, 1); changed = true; } }
    return changed;
  }
  function afterPrune(changed) {
    if (!changed) return;
    try { if (origSave) origSave({ localOnly: true }); } catch (e) {}
    try { bmhRenderVendorTables(); } catch (e) {}
  }
  // the shared snapshot never carries a removed bill
  var origSnap = window.bmhFinancialsSnapshot;
  if (typeof origSnap === 'function') {
    window.bmhFinancialsSnapshot = function () {
      var s = origSnap.apply(this, arguments);
      try { if (s && Array.isArray(s.vendorBills)) s.vendorBills = s.vendorBills.filter(function (v) { return !(v && v.id && TOMB[v.id]); }); } catch (e) {}
      return s;
    };
  }
  var origSave = window.saveBmhFinancials;
  ['applyBmhFinancialsSnapshot', '_bmhMergeRemoteVendorBills'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { var r = o.apply(this, arguments); try { afterPrune(prune()); } catch (e) {} return r; };
  });
  function mark(id, info) {
    TOMB[id] = 1; saveTombLocal();
    if (window.FBDB) { try { window.FBDB.ref('vendorBillsRemoved/' + id).set(info).catch(function () {}); } catch (e) {} }
  }
  function strip(v) { var o = Object.assign({}, v); delete o.billFile; return JSON.parse(JSON.stringify(o)); }
  // existing admin "Delete" on a bill: make it stick on every device
  if (typeof window.bmhDeleteVendorBill === 'function') {
    var origDel = window.bmhDeleteVendorBill;
    window.bmhDeleteVendorBill = function (id) {
      var row = bills().find(function (v) { return v && v.id === id; });
      var copy = row ? strip(row) : null;
      var r = origDel.apply(this, arguments);
      if (row && !bills().some(function (v) { return v && v.id === id; })) mark(id, { at: new Date().toISOString(), by: who(), reason: 'deleted', row: copy });
      return r;
    };
  }
  // keep the removed list in step with other devices
  var listening = false;
  function listen() {
    if (listening || !window.FBDB) return false;
    listening = true;
    try {
      window.FBDB.ref('vendorBillsRemoved').on('value', function (snap) {
        var v = snap.val() || {}; var added = false;
        Object.keys(v).forEach(function (id) { if (!TOMB[id] && !(v[id] && v[id].restored)) { TOMB[id] = 1; added = true; } if (TOMB[id] && v[id] && v[id].restored) { delete TOMB[id]; } });
        saveTombLocal();
        if (added) afterPrune(prune());
      });
    } catch (e) { listening = false; }
    return listening;
  }
  if (!listen()) { var tries = 0, t = setInterval(function () { if (listen() || ++tries > 60) clearInterval(t); }, 5000); }
  afterPrune(prune());

  // ── duplicate finder ──
  function groups() {
    var m = {};
    bills().forEach(function (v) {
      if (!v || v.opening) return;
      var k = invKey(v.invoiceNo); if (!k || /^ocr/.test(k)) return;
      var key = norm(v.vendor) + '|' + k;
      (m[key] = m[key] || []).push(v);
    });
    return Object.keys(m).filter(function (k) { return m[k].length > 1; }).map(function (k) {
      var rows = m[k].slice().sort(function (a, b) { return String(a.createdAt || '').localeCompare(String(b.createdAt || '')); });
      var gross = function (v) { return (Number(v.amount) || 0) + (Number(v.returnAdjusted) || 0); };
      var same = rows.every(function (v) { return Math.abs(gross(v) - gross(rows[0])) < 1; });
      return { key: k, vendor: rows[0].vendor, invoice: rows[0].invoiceNo, rows: rows, same: same, action: same ? 'keep' : 'combine' };
    });
  }
  function keeper(rows) {
    return rows.slice().sort(function (a, b) {
      return (Number(b.paidAmount) || 0) - (Number(a.paidAmount) || 0) || ((b.billFile || b.uploadedName) ? 1 : 0) - ((a.billFile || a.uploadedName) ? 1 : 0) || String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
    })[0];
  }
  function plan(g) {
    var k = keeper(g.rows), others = g.rows.filter(function (v) { return v !== k; });
    var paidRows = g.rows.filter(function (v) { return Number(v.paidAmount) > 0; });
    var totalPaid = g.rows.reduce(function (t, v) { return t + (Number(v.paidAmount) || 0); }, 0);
    if (g.action === 'combine') {
      var amt = g.rows.reduce(function (t, v) { return t + (Number(v.amount) || 0); }, 0);
      return { keep: k, remove: others, text: 'Combine ' + g.rows.length + ' entries into one bill of ' + inr(amt) + ' (paid ' + inr(totalPaid) + ', due ' + inr(Math.max(0, amt - totalPaid)) + ')' };
    }
    if (g.action === 'leave') return { keep: null, remove: [], text: 'Leave as they are' };
    var amt1 = Number(k.amount) || 0;
    var extra = Math.max(0, totalPaid - amt1);
    return { keep: k, remove: others, extra: extra, text: 'Keep the ' + (Number(k.paidAmount) > 0 ? 'paid' : 'first') + ' copy (' + fmtDate(dateOf(k)) + '), remove ' + others.length + ' extra cop' + (others.length === 1 ? 'y' : 'ies') + (paidRows.length > 1 ? ' — ⚠ ' + paidRows.length + ' copies were marked paid (total ' + inr(totalPaid) + '): the extra ' + inr(extra) + ' is kept as credit with this vendor' : '') };
  }
  function apply(gs) {
    var removed = 0, at = new Date().toISOString();
    gs.forEach(function (g) {
      var pl = plan(g); if (!pl.keep || !pl.remove.length) return;
      var k = pl.keep;
      if (g.action === 'combine') {
        pl.remove.forEach(function (v) {
          k.amount = Math.round(((Number(k.amount) || 0) + (Number(v.amount) || 0)) * 100) / 100;
          k.paidAmount = Math.round(((Number(k.paidAmount) || 0) + (Number(v.paidAmount) || 0)) * 100) / 100;
          if (Number(v.returnAdjusted)) k.returnAdjusted = (Number(k.returnAdjusted) || 0) + Number(v.returnAdjusted);
          if (Number(v.creditBalance)) k.creditBalance = (Number(k.creditBalance) || 0) + Number(v.creditBalance);
          if (v.returns) k.returns = (k.returns || []).concat(v.returns);
          if (!k.paidAt || (v.paidAt && v.paidAt > k.paidAt)) { if (v.paidAt) { k.paidAt = v.paidAt; k.paymentMode = v.paymentMode || k.paymentMode; k.paidRef = v.paidRef || k.paidRef; } }
          k.billFile = k.billFile || v.billFile || null; k.uploadedName = k.uploadedName || v.uploadedName || '';
        });
      } else {
        if (pl.extra > 0) { k.paidAmount = Number(k.amount) || 0; k.creditBalance = Math.round(((Number(k.creditBalance) || 0) + pl.extra) * 100) / 100; k.creditNote = 'Paid more than once on duplicate entries of this invoice'; }
        pl.remove.forEach(function (v) { k.billFile = k.billFile || v.billFile || null; k.uploadedName = k.uploadedName || v.uploadedName || ''; });
      }
      if ((Number(k.paidAmount) || 0) > (Number(k.amount) || 0)) { k.creditBalance = Math.round(((Number(k.creditBalance) || 0) + (Number(k.paidAmount) - Number(k.amount))) * 100) / 100; k.paidAmount = Number(k.amount) || 0; }
      k.status = due(k) <= 0 ? 'paid' : ((Number(k.paidAmount) || 0) > 0 ? 'partial' : 'pending');
      (k.dedupedFrom = k.dedupedFrom || []).push.apply(k.dedupedFrom, pl.remove.map(function (v) { return v.id; }));
      pl.remove.forEach(function (v) {
        mark(v.id, { at: at, by: who(), reason: g.action === 'combine' ? 'combined into ' + k.id : 'duplicate of ' + k.id, keptId: k.id, row: strip(v) });
        var i = bills().indexOf(v); if (i >= 0) bills().splice(i, 1);
        removed++;
      });
    });
    return removed;
  }
  var current = [];
  function draw() {
    var ov = document.getElementById('vdup-ov'); if (!ov) return;
    var body = ov.querySelector('#vdup-body');
    if (!current.length) { body.innerHTML = '<div style="padding:16px;text-align:center;color:#1a8c3c;font-weight:800">No duplicate bills found ✓</div>'; ov.querySelector('#vdup-go').style.display = 'none'; return; }
    var n = 0;
    body.innerHTML = current.map(function (g, gi) {
      var pl = plan(g); n += pl.remove.length;
      return '<div style="border:1px solid #e3e6ee;border-radius:10px;padding:10px;margin-bottom:8px">'
        + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:200px"><b>' + esc(g.vendor) + '</b> · Invoice <b>' + esc(g.invoice) + '</b> · ' + g.rows.length + ' entries' + (g.same ? '' : ' <span style="color:#b55a00;font-weight:700">(different amounts)</span>') + '</div>'
        + '<select data-g="' + gi + '" class="vdup-act" style="width:auto;padding:4px 6px;font-size:12px"><option value="keep"' + (g.action === 'keep' ? ' selected' : '') + '>Keep one, remove the rest</option><option value="combine"' + (g.action === 'combine' ? ' selected' : '') + '>Combine into one bill</option><option value="leave"' + (g.action === 'leave' ? ' selected' : '') + '>Leave as they are</option></select></div>'
        + '<table style="width:100%;border-collapse:collapse;font-size:11.5px;margin-top:6px">' + g.rows.map(function (v) {
          var keep = pl.keep === v, gone = pl.remove.indexOf(v) >= 0;
          return '<tr style="border-top:1px solid #f0f0f0;' + (gone ? 'color:#999;text-decoration:line-through' : '') + '"><td style="padding:3px 4px">' + fmtDate(dateOf(v)) + '</td><td style="padding:3px 4px">' + esc(v.invoiceNo) + '</td><td style="padding:3px 4px;text-align:right">' + inr(v.amount) + '</td><td style="padding:3px 4px;text-align:right">paid ' + inr(v.paidAmount) + '</td><td style="padding:3px 4px">' + (due(v) > 0 ? 'due ' + inr(due(v)) : 'paid') + '</td><td style="padding:3px 4px;font-weight:800;text-decoration:none;color:' + (keep ? '#1a8c3c' : gone ? '#c62828' : '#555') + '">' + (keep ? 'KEEP' : gone ? 'REMOVE' : '') + '</td></tr>';
        }).join('') + '</table><div style="font-size:11px;color:#555;margin-top:4px">' + esc(pl.text) + '</div></div>';
    }).join('');
    Array.prototype.forEach.call(body.querySelectorAll('.vdup-act'), function (s) { s.onchange = function () { current[Number(s.getAttribute('data-g'))].action = s.value; draw(); }; });
    var go = ov.querySelector('#vdup-go'); go.style.display = n ? '' : 'none'; go.textContent = '🧹 Remove ' + n + ' duplicate entr' + (n === 1 ? 'y' : 'ies');
  }
  window.bmhOpenVendorDuplicates = function () {
    if (!isAdmin()) { try { showToast('Only admin can remove duplicate bills', 'w'); } catch (e) {} return; }
    current = groups();
    var old = document.getElementById('vdup-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'vdup-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4600;background:rgba(10,20,40,.45);display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow:auto';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:760px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><div style="flex:1"><div style="font-size:17px;font-weight:900">Duplicate vendor bills</div><div style="font-size:11.5px;color:#666">Same vendor + same invoice number. Check the plan below, then press Remove. A copy of every removed bill is kept so it can be restored.</div></div><button type="button" class="btn btn-gray btn-sm" onclick="document.getElementById(\'vdup-ov\').remove()">Close</button></div>'
      + '<div id="vdup-body"></div><div style="text-align:right;margin-top:8px"><button type="button" class="btn btn-red btn-sm" id="vdup-go"></button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#vdup-go').onclick = function () {
      var n = current.reduce(function (t, g) { return t + plan(g).remove.length; }, 0);
      if (!n || !confirm('Remove ' + n + ' duplicate bill entr' + (n === 1 ? 'y' : 'ies') + ' as shown?')) return;
      var removed = apply(current);
      try { origSave ? origSave() : saveBmhFinancials(); } catch (e) {}
      try { bmhRenderVendorTables(); } catch (e) {}
      try { if (typeof renderBillingPageIfActive === 'function') renderBillingPageIfActive(); } catch (e) {}
      try { showToast(removed + ' duplicate bill entr' + (removed === 1 ? 'y' : 'ies') + ' removed ✓', 's'); } catch (e) {}
      current = groups(); draw();
    };
    draw();
  };
  // admin restore of a removed bill (by id) — for mistakes
  window.bmhRestoreVendorBill = function (id) {
    if (!isAdmin() || !window.FBDB) return Promise.resolve(false);
    return window.FBDB.ref('vendorBillsRemoved/' + id).once('value').then(function (s) {
      var v = s.val(); if (!v || !v.row) return false;
      delete TOMB[id]; saveTombLocal();
      if (!bills().some(function (b) { return b.id === id; })) bills().push(v.row);
      return window.FBDB.ref('vendorBillsRemoved/' + id + '/restored').set(new Date().toISOString()).then(function () { try { saveBmhFinancials(); bmhRenderVendorTables(); } catch (e) {} return true; });
    });
  };
  // admin button next to the vendor statement button
  var origRT = window.bmhRenderVendorTables;
  if (typeof origRT === 'function') {
    window.bmhRenderVendorTables = function () {
      var r = origRT.apply(this, arguments);
      try {
        var sum = document.getElementById('inv-vendor-summary'); var hd = sum && sum.previousElementSibling;
        var old = hd && hd.querySelector('.vdup-btn');
        var n = isAdmin() ? groups().length : 0;
        if (old) old.remove();
        if (hd && n) {
          var b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-red btn-sm vdup-btn';
          b.textContent = '🧹 Remove duplicate bills (' + n + ')'; b.onclick = function () { bmhOpenVendorDuplicates(); };
          var st = hd.querySelector('.vst-hd-btn'); if (st) st.parentNode.insertBefore(b, st); else hd.appendChild(b);
        }
      } catch (e) {}
      return r;
    };
  }
  window.bmhVendorDuplicates = { groups: groups, plan: plan, prune: prune, tomb: function () { return TOMB; } };
})();
