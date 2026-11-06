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
