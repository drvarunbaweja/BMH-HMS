/* BMH — Vendor bills: full edit + bill date.
 *  • "Edit" on a vendor bill opens one form with everything used when the bill was entered: vendor, invoice no.,
 *    bill date, amount, amount already paid, due date (or "bill when used"), store and notes. Each change is kept on
 *    the bill (edits: who, when, what changed).
 *  • "Bill date" = the date the bill was raised. It is entered on the bill (new "Bill date" box in Add vendor bill, or
 *    corrected in Edit); bills without one use the day they were entered. Stored as invoiceDate, which the payment
 *    pop-up ("Clear oldest bills first") and the vendor statement already go by.
 *  • Bills of each vendor are listed by bill date, oldest first.
 *  Only vendor bills are touched.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function inr(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function bills() { return window.BMH_VENDOR_BILLS || []; }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) { return ''; } }
  function billDate(v) { return String((v && (v.invoiceDate || v.billDateKey || v.createdAt)) || '').slice(0, 10); }
  window.bmhVendorBillDate = billDate;
  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }

  // ── edit form ──
  window.bmhEditVendorBill = function (id, opts) {
    var v = bills().find(function (r) { return r.id === id; }); if (!v) return;
    var lockInv = !!(opts && opts.lockInvoice);
    var vendors = Array.from(new Set(bills().map(function (b) { return String(b.vendor || '').trim(); }).filter(Boolean))).sort();
    var stores = []; try { stores = (window.bmhInventoryStoreOptions ? window.bmhInventoryStoreOptions() : (window.BMH_STORE_LOCATIONS || [])) || []; } catch (e) {}
    var onUse = v.billMode === 'on-use' || !!v.usageLinked;
    var old = document.getElementById('vbe-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'vbe-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4900;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:12px';
    var inp = 'width:100%;padding:7px 8px;border:1px solid #cfd6e2;border-radius:8px;font-size:13px;box-sizing:border-box;margin-top:3px';
    var lab = 'display:block;font-size:11px;font-weight:800;color:#555';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:560px;width:100%;max-height:92vh;overflow:auto;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><div style="font-size:15px;font-weight:900">✏️ Edit vendor bill</div><button type="button" class="btn btn-xs btn-gray" id="vbe-x">✕</button></div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'
      + '<label style="' + lab + ';grid-column:1/-1">Vendor<input id="vbe-vendor" list="vbe-vendors" style="' + inp + '" value="' + esc(v.vendor || '') + '"><datalist id="vbe-vendors">' + vendors.map(function (n) { return '<option value="' + esc(n) + '">'; }).join('') + '</datalist></label>'
      + '<label style="' + lab + '">Invoice no.' + (lockInv ? ' <span style="font-weight:600;color:#888">(stays the same)</span>' : '') + '<input id="vbe-inv" style="' + inp + (lockInv ? ';background:#f1f3f6;color:#555' : '') + '" value="' + esc(v.invoiceNo || '') + '"' + (lockInv ? ' readonly' : '') + '></label>'
      + '<label style="' + lab + '">Bill date (date the bill was raised)<input id="vbe-date" type="date" style="' + inp + '" value="' + esc(billDate(v)) + '"></label>'
      + '<label style="' + lab + '">Bill amount ₹<input id="vbe-amt" type="number" min="0" step="0.01" style="' + inp + '" value="' + esc(Number(v.amount || 0)) + '"></label>'
      + '<label style="' + lab + '">Amount already paid ₹<input id="vbe-paid" type="number" min="0" step="0.01" style="' + inp + '" value="' + esc(Number(v.paidAmount || 0)) + '"></label>'
      + '<label style="' + lab + '">Due date<input id="vbe-due" type="date" style="' + inp + '" value="' + esc(/^\d{4}-\d{2}-\d{2}/.test(String(v.dueDate || '')) ? String(v.dueDate).slice(0, 10) : '') + '"' + (onUse ? ' disabled' : '') + '></label>'
      + '<label style="' + lab + ';display:flex;align-items:center;gap:6px;margin-top:18px"><input id="vbe-onuse" type="checkbox"' + (onUse ? ' checked' : '') + '> Bill when used (IOL / consignment)</label>'
      + '<label style="' + lab + '">Store<input id="vbe-store" list="vbe-stores" style="' + inp + '" value="' + esc(v.store || '') + '"><datalist id="vbe-stores">' + stores.map(function (n) { return '<option value="' + esc(n) + '">'; }).join('') + '</datalist></label>'
      + '<label style="' + lab + '">Item / category<input id="vbe-item" style="' + inp + '" value="' + esc(v.itemName || v.category || '') + '"></label>'
      + '<label style="' + lab + ';grid-column:1/-1">Notes<textarea id="vbe-notes" style="' + inp + ';min-height:46px">' + esc(v.notes || '') + '</textarea></label>'
      + '</div>'
      + '<div style="font-size:11px;color:#777;margin-top:8px">Entered ' + esc(String(v.createdAt || '').slice(0, 10)) + (v.uploadedName || (v.billFile && v.billFile.name) ? ' · file: ' + esc(v.uploadedName || v.billFile.name) : '') + (Array.isArray(v.payments) && v.payments.length ? ' · ' + v.payments.length + ' payment' + (v.payments.length === 1 ? '' : 's') + ' recorded' : '') + '</div>'
      + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" class="btn btn-gray btn-sm" id="vbe-cancel">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="vbe-save">Save changes</button></div></div>';
    document.body.appendChild(ov);
    var g = function (k) { return document.getElementById(k); };
    g('vbe-x').onclick = g('vbe-cancel').onclick = function () { ov.remove(); };
    g('vbe-onuse').onchange = function () { g('vbe-due').disabled = this.checked; };
    g('vbe-save').onclick = function () {
      var nv = {
        vendor: String(g('vbe-vendor').value || '').trim(), invoiceNo: lockInv ? v.invoiceNo : String(g('vbe-inv').value || '').trim(), invoiceDate: g('vbe-date').value || '',
        amount: Math.max(0, Number(g('vbe-amt').value) || 0), paidAmount: Math.max(0, Number(g('vbe-paid').value) || 0),
        store: String(g('vbe-store').value || '').trim(), notes: String(g('vbe-notes').value || '').trim()
      };
      var item = String(g('vbe-item').value || '').trim();
      var useNow = g('vbe-onuse').checked;
      if (!nv.vendor) { toast('Vendor is required', 'w'); return; }
      if (!(nv.amount > 0)) { toast('Enter the bill amount', 'w'); return; }
      if (nv.paidAmount > nv.amount && !confirm('Amount paid (' + inr(nv.paidAmount) + ') is more than the bill (' + inr(nv.amount) + '). Save anyway?')) return;
      try { if (typeof window.bmhVendorCanonical === 'function') nv.vendor = String(window.bmhVendorCanonical(nv.vendor) || nv.vendor).trim(); } catch (e) {}
      var changes = [];
      var cmp = function (k, label, a, b) { if (String(a == null ? '' : a) !== String(b == null ? '' : b)) changes.push(label + ': ' + (a === '' || a == null ? '—' : a) + ' → ' + (b === '' || b == null ? '—' : b)); };
      cmp('vendor', 'Vendor', v.vendor, nv.vendor); cmp('invoiceNo', 'Invoice', v.invoiceNo, nv.invoiceNo); cmp('invoiceDate', 'Bill date', billDate(v), nv.invoiceDate);
      cmp('amount', 'Amount', Number(v.amount || 0), nv.amount); cmp('paidAmount', 'Paid', Number(v.paidAmount || 0), nv.paidAmount);
      cmp('store', 'Store', v.store || '', nv.store); cmp('notes', 'Notes', v.notes || '', nv.notes); cmp('item', 'Item', v.itemName || v.category || '', item);
      var dueNew = useNow ? 'On use' : (g('vbe-due').value || '');
      var dueOld = (v.billMode === 'on-use' || v.usageLinked) ? 'On use' : String(v.dueDate || '').slice(0, 10);
      cmp('due', 'Due', dueOld, dueNew);
      if (!changes.length) { ov.remove(); return; }
      if (!confirm('Save these changes to the bill?\n\n' + changes.join('\n'))) return;
      Object.keys(nv).forEach(function (k) { if (k === 'invoiceDate' && !nv[k]) return; v[k] = nv[k]; });
      if (item) { if (v.itemName != null || !v.category) v.itemName = item; else v.category = item; }
      if (useNow) { v.billMode = 'on-use'; v.usageLinked = true; v.dueDate = ''; } else { if (v.billMode === 'on-use') v.billMode = 'monthly'; v.usageLinked = false; v.dueDate = dueNew; }
      try { v.status = bmhVendorBillOutstanding(v) <= 0 ? 'paid' : (Number(v.paidAmount) > 0 ? 'partial' : 'pending'); } catch (e) {}
      var at = new Date().toISOString();
      v.updatedAt = at; v.edits = (Array.isArray(v.edits) ? v.edits : []).concat([{ at: at, by: who(), changes: changes }]).slice(-20);
      try { saveBmhFinancials(); } catch (e) {}
      try { bmhRenderVendorTables(); } catch (e) {}
      try { if (typeof renderBillingPageIfActive === 'function') renderBillingPageIfActive(); } catch (e) {}
      ov.remove(); toast('Vendor bill updated ✓', 's');
    };
  };

  // ── "Bill date" in Add vendor bill ──
  function injectDate() {
    [['inv-vend-inv', 'inv-vend-date'], ['bmh-vend-inv', 'bmh-vend-date']].forEach(function (pair) {
      var invBox = document.getElementById(pair[0]); if (!invBox || document.getElementById(pair[1])) return;
      var grp = invBox.closest('.form-group'); if (!grp) return;
      var d = document.createElement('div'); d.className = 'form-group';
      d.innerHTML = '<label class="fl">Bill date</label><input type="date" id="' + pair[1] + '" title="Date the bill was raised">';
      grp.parentNode.insertBefore(d, grp.nextSibling);
    });
  }
  var origAdd = window.bmhAddVendorBill;
  if (typeof origAdd === 'function') {
    window.bmhAddVendorBill = function () {
      var a = document.getElementById('inv-vend-date'), b2 = document.getElementById('bmh-vend-date');
      var el = (a && a.value) ? a : b2, date = el && el.value;
      var before = {}; bills().forEach(function (b) { before[b.id] = 1; });
      var r = origAdd.apply(this, arguments);
      if (date) {
        var n = 0, iv = setInterval(function () {
          var nb = bills().filter(function (b) { return b && !before[b.id]; });
          if (nb.length || ++n > 50) {
            clearInterval(iv);
            nb.forEach(function (b) { if (!b.invoiceDate) { b.invoiceDate = date; b.updatedAt = new Date().toISOString(); } });
            if (nb.length) { try { saveBmhFinancials(); } catch (e) {} try { bmhRenderVendorTables(); } catch (e) {} }
            if (el) el.value = '';
          }
        }, 100);
      }
      return r;
    };
  }

  // ── quick bill date (click the date on a bill row) ──
  window.bmhSetVendorBillDate = function (id) {
    var v = bills().find(function (r) { return r.id === id; }); if (!v) return;
    var old = document.getElementById('vbd-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'vbd-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4900;background:rgba(10,20,40,.35);display:flex;align-items:center;justify-content:center;padding:12px';
    ov.innerHTML = '<div style="background:#fff;border-radius:12px;padding:14px;max-width:340px;width:100%;box-shadow:0 10px 30px rgba(0,0,0,.3)">'
      + '<div style="font-weight:900;font-size:14px">📅 Bill date</div><div style="font-size:11.5px;color:#555;margin:2px 0 8px">' + esc(v.vendor || '') + ' · ' + esc(v.invoiceNo || '') + ' · ' + inr(v.amount) + '<br>Entered in the computer on ' + esc(String(v.createdAt || '').slice(0, 10)) + '</div>'
      + '<input type="date" id="vbd-date" value="' + esc(String(v.invoiceDate || '').slice(0, 10)) + '" style="width:100%;padding:8px;border:1px solid #cfd6e2;border-radius:8px;font-size:14px">'
      + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px"><button type="button" class="btn btn-gray btn-sm" id="vbd-c">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="vbd-s">Save</button></div></div>';
    document.body.appendChild(ov);
    var inp = document.getElementById('vbd-date'); setTimeout(function () { try { inp.focus(); inp.showPicker && inp.showPicker(); } catch (e) {} }, 50);
    document.getElementById('vbd-c').onclick = function () { ov.remove(); };
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    document.getElementById('vbd-s').onclick = function () {
      var d = inp.value; if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) { toast('Choose the date on the bill', 'w'); return; }
      var at = new Date().toISOString();
      if (v.invoiceDate !== d) v.edits = (Array.isArray(v.edits) ? v.edits : []).concat([{ at: at, by: who(), changes: ['Bill date: ' + (billDate(v) || '—') + ' → ' + d] }]).slice(-20);
      v.invoiceDate = d; v.updatedAt = at;
      try { saveBmhFinancials(); } catch (e) {}
      try { bmhRenderVendorTables(); } catch (e) {}
      ov.remove(); toast('Bill date saved ✓', 's');
    };
  };

  // ── bill dates are never lost when another computer's copy (without them) is received ──
  var origApply = window.applyBmhFinancialsSnapshot;
  if (typeof origApply === 'function') {
    window.applyBmhFinancialsSnapshot = function () {
      var keep = {}; bills().forEach(function (b) { if (b && b.id && b.invoiceDate) keep[b.id] = { d: b.invoiceDate, e: b.edits }; });
      var r = origApply.apply(this, arguments);
      var filled = 0;
      bills().forEach(function (b) { var k = b && keep[b.id]; if (k && !b.invoiceDate) { b.invoiceDate = k.d; if (!b.edits && k.e) b.edits = k.e; filled++; } });
      if (filled) setTimeout(function () { if (window._bmhFinancialsHydrating) return; try { saveBmhFinancials(); } catch (e) {} }, 1500);
      return r;
    };
  }

  // ── Billing → Vendors only for Dr Varun (admin) and TPA Ropar ──
  function vendorsAllowed() {
    try {
      var u = CURRENT_USER || {}; var n = String(u.username || '').toLowerCase();
      return ['drvarun', 'tpa_rpr', 'tpa.rpr'].indexOf(n) >= 0 || u.name === 'Dr. Varun Baweja' || u.name === 'TPA Executive RPR';
    } catch (e) { return false; }
  }
  window.bmhVendorsAllowed = vendorsAllowed;
  function applyVendorsAccess() {
    var ok = vendorsAllowed();
    Array.prototype.forEach.call(document.querySelectorAll('#pg-billing .ptab[onclick*="\'vendors\'"]'), function (t) { t.style.display = ok ? '' : 'none'; });
    if (!ok) { var p = document.getElementById('inv-vendor'); if (p) p.style.display = 'none'; }
  }
  var origSwitch = window.bmhBillingTabSwitch;
  if (typeof origSwitch === 'function') {
    window.bmhBillingTabSwitch = function (el, mode) {
      if (mode === 'vendors' && !vendorsAllowed()) { toast('Vendor bills are not available for this login', 'w'); mode = 'current'; el = document.querySelector('#pg-billing .ptab'); }
      var r = origSwitch.call(this, el, mode); applyVendorsAccess(); return r;
    };
  }
  var origNav = window.nav;
  if (typeof origNav === 'function') window.nav = function () { var r = origNav.apply(this, arguments); try { applyVendorsAccess(); } catch (e) {} return r; };
  setInterval(function () { try { if (document.getElementById('pg-billing') && document.getElementById('pg-billing').classList.contains('active')) applyVendorsAccess(); } catch (e) {} }, 3000);

  // ── each vendor's bills by bill date, oldest first ──
  var origGroups = window.bmhVendorBillGroups;
  if (typeof origGroups === 'function') {
    window.bmhVendorBillGroups = function () {
      var gs = origGroups.apply(this, arguments);
      try { (gs || []).forEach(function (g) { (g.rows || []).sort(function (a, b) { var x = billDate(a), y = billDate(b); return x < y ? -1 : x > y ? 1 : String(a.createdAt || '').localeCompare(String(b.createdAt || '')); }); }); } catch (e) {}
      return gs;
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectDate); else injectDate();
  setTimeout(injectDate, 1500);
})();
