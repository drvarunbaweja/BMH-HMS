/* BMH — Vendor year statement (Billing → Vendors).
 * Adds a "📒 Statement" button against each vendor. The statement shows, for one financial year (April–March):
 *   1. Carried over from earlier years — an opening amount you can type in (old dues not in the system), plus any
 *      older bills that were still unpaid at the start of the year.
 *   2. This year's bills — date, invoice, amount, paid, paid date, due.
 *   3. Payments made this year (from the ledger), and the total due now.
 * Unpaid bills automatically appear under "carried over" in the next year's statement.
 * The opening amount is saved as an ordinary vendor bill row marked "Opening balance", so the existing outstanding
 * totals, Pay buttons and payment order (oldest first) all include it. Nothing else is changed.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function inr(n) { return '₹' + (Number(n) || 0).toLocaleString('en-IN'); }
  function norm(s) { try { return normalizeInventoryCompareText(String(s || '')); } catch (e) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); } }
  function due(v) { try { return bmhVendorBillOutstanding(v); } catch (e) { return Math.max(0, (Number(v.amount) || 0) - (Number(v.paidAmount) || 0)); } }
  function bills() { return window.BMH_VENDOR_BILLS || []; }
  function dateOf(v) { return String(v.billDateKey || v.createdAt || '').slice(0, 10); }
  function fmtDate(k) { if (!k) return '—'; var p = String(k).slice(0, 10).split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : k; }
  function todayKey() { try { return localDateKey(new Date()); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  // financial year "2026-27" runs 1 Apr 2026 → 31 Mar 2027
  function fyOf(key) { var y = Number(String(key).slice(0, 4)), m = Number(String(key).slice(5, 7)); if (!y) return ''; var s = m >= 4 ? y : y - 1; return s + '-' + String(s + 1).slice(2); }
  function fyStart(fy) { return fy.slice(0, 4) + '-04-01'; }
  function fyEnd(fy) { return (Number(fy.slice(0, 4)) + 1) + '-03-31'; }
  function prevFy(fy) { var s = Number(fy.slice(0, 4)) - 1; return s + '-' + String(s + 1).slice(2); }
  function vendorRows(vendor) { var k = norm(vendor); return bills().filter(function (v) { return norm(v.vendor) === k; }); }
  function openingRow(vendor, fy) { return vendorRows(vendor).find(function (v) { return v.opening && v.fy === fy; }); }
  function ledgerPayments(vendor, fy) {
    var k = norm(vendor), s = fyStart(fy), e = fyEnd(fy);
    return (window.BMH_LEDGER || []).filter(function (l) {
      var d = String(l.date || '').slice(0, 10);
      return l && norm(l.party) === k && Number(l.dr) > 0 && d >= s && d <= e && /payment/i.test(String(l.type || 'Payment'));
    }).sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
  }
  function build(vendor, fy) {
    var s = fyStart(fy), e = fyEnd(fy);
    var rows = vendorRows(vendor).slice().sort(function (a, b) { return dateOf(a).localeCompare(dateOf(b)); });
    var carried = rows.filter(function (v) { var d = dateOf(v); return d < s && (due(v) > 0 || String(v.paidAt || '').slice(0, 10) >= s); });
    var current = rows.filter(function (v) { var d = dateOf(v); return d >= s && d <= e; });
    var sum = function (list, f) { return list.reduce(function (t, v) { return t + f(v); }, 0); };
    return {
      vendor: vendor, fy: fy, carried: carried, current: current, opening: openingRow(vendor, fy), payments: ledgerPayments(vendor, fy),
      carriedDue: sum(carried, due), curAmt: sum(current, function (v) { return Number(v.amount) || 0; }),
      curPaid: sum(current, function (v) { return Number(v.paidAmount) || 0; }), curDue: sum(current, due)
    };
  }
  function rowsHtml(list, empty) {
    if (!list.length) return '<tr><td colspan="6" style="text-align:center;color:#888;padding:8px">' + empty + '</td></tr>';
    return list.map(function (v) {
      var d = due(v);
      return '<tr><td>' + fmtDate(dateOf(v)) + '</td><td>' + esc(v.opening ? (v.invoiceNo || 'Opening balance') : (v.invoiceNo || 'No invoice')) + (v.opening && v.note ? '<div style="font-size:10px;color:#777">' + esc(v.note) + '</div>' : '') + '</td><td style="text-align:right">' + inr(v.amount) + '</td><td style="text-align:right">' + inr(v.paidAmount) + '</td><td>' + (Number(v.paidAmount) > 0 ? fmtDate(String(v.paidAt || '').slice(0, 10)) + (v.paymentMode ? '<div style="font-size:10px;color:#777">' + esc(v.paymentMode) + (v.paidRef ? ' · ' + esc(v.paidRef) : '') + '</div>' : '') : '—') + '</td><td style="text-align:right;font-weight:800;color:' + (d > 0 ? '#b55a00' : '#1a8c3c') + '">' + (d > 0 ? inr(d) : 'Paid') + '</td></tr>';
    }).join('');
  }
  function tableHtml(title, list, empty, foot) {
    return '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue,#1A3C6E);text-transform:uppercase;letter-spacing:.4px;margin:12px 0 4px">' + title + '</div>'
      + '<table class="vst"><thead><tr><th>Bill date</th><th>Invoice</th><th style="text-align:right">Amount</th><th style="text-align:right">Paid</th><th>Paid on</th><th style="text-align:right">Due</th></tr></thead><tbody>' + rowsHtml(list, empty) + '</tbody>' + (foot || '') + '</table>';
  }
  var CSS = '<style>table.vst{width:100%;border-collapse:collapse;font-size:12px}table.vst th,table.vst td{border:1px solid #e3e6ee;padding:5px 7px;text-align:left;vertical-align:top}table.vst th{background:#f2f5fa;font-size:10.5px;text-transform:uppercase;color:#555}table.vst tfoot td{font-weight:900;background:#fafbfd}</style>';
  function bodyHtml(st, forPrint) {
    var prev = prevFy(st.fy);
    var payRows = st.payments.length ? st.payments.map(function (l) { return '<tr><td>' + fmtDate(String(l.date).slice(0, 10)) + '</td><td colspan="4">' + esc(l.narration || 'Payment') + (l.ref ? ' <span style="color:#777">· ' + esc(l.ref) + '</span>' : '') + '</td><td style="text-align:right;font-weight:800">' + inr(l.dr) + '</td></tr>'; }).join('') : '<tr><td colspan="6" style="text-align:center;color:#888;padding:8px">No payments recorded in the ledger this year</td></tr>';
    var op = st.opening;
    var openingBox = forPrint ? '' : '<div style="background:#fff8e1;border:1px solid #f0d68a;border-radius:10px;padding:10px 12px;margin-top:10px">'
      + '<div style="font-size:12px;font-weight:800;margin-bottom:6px">Amount carried over from ' + prev + ' (old dues not entered in the system)</div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><input id="vst-op-amt" type="number" min="0" step="1" placeholder="₹ amount" value="' + (op ? esc(op.amount) : '') + '" style="width:140px;padding:6px 8px;border:1px solid #ccc;border-radius:8px">'
      + '<input id="vst-op-note" type="text" placeholder="Note (optional)" value="' + (op ? esc(op.note || '') : '') + '" style="flex:1;min-width:140px;padding:6px 8px;border:1px solid #ccc;border-radius:8px">'
      + '<button type="button" class="btn btn-gold btn-sm" onclick="bmhVendorStmtSaveOpening()">' + (op ? 'Update' : 'Save') + '</button></div>'
      + (op ? '<div style="font-size:10.5px;color:#7a5b00;margin-top:5px">Saved as "' + esc(op.invoiceNo) + '"' + (Number(op.paidAmount) > 0 ? ' · ' + inr(op.paidAmount) + ' already paid against it' : '') + '. It is paid off first when you pay this vendor.</div>' : '<div style="font-size:10.5px;color:#7a5b00;margin-top:5px">Leave empty if there is nothing old to add. Unpaid bills already in the system are carried over automatically.</div>')
      + '</div>';
    return openingBox
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:12px">'
      + box('Carried over — due now', inr(st.carriedDue), '#b55a00')
      + box(st.fy + ' bills', inr(st.curAmt) + '<div style="font-size:10.5px;font-weight:600;color:#555">Paid ' + inr(st.curPaid) + '</div>', '#1A3C6E')
      + box(st.fy + ' bills — due', inr(st.curDue), '#b55a00')
      + box('Total due now', inr(st.carriedDue + st.curDue), (st.carriedDue + st.curDue) > 0 ? '#b71c1c' : '#1a8c3c')
      + '</div>'
      + tableHtml('1. Carried over from earlier years', st.carried, 'Nothing carried over', '<tfoot><tr><td colspan="5">Carried over — due now</td><td style="text-align:right">' + inr(st.carriedDue) + '</td></tr></tfoot>')
      + tableHtml('2. Bills in ' + st.fy + ' (1 Apr ' + st.fy.slice(0, 4) + ' – 31 Mar ' + (Number(st.fy.slice(0, 4)) + 1) + ')', st.current, 'No bills this year', '<tfoot><tr><td colspan="2">Total</td><td style="text-align:right">' + inr(st.curAmt) + '</td><td style="text-align:right">' + inr(st.curPaid) + '</td><td></td><td style="text-align:right">' + inr(st.curDue) + '</td></tr></tfoot>')
      + '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue,#1A3C6E);text-transform:uppercase;letter-spacing:.4px;margin:12px 0 4px">3. Payments made in ' + st.fy + '</div>'
      + '<table class="vst"><thead><tr><th>Date</th><th colspan="4">Details</th><th style="text-align:right">Amount</th></tr></thead><tbody>' + payRows + '</tbody></table>'
      + '<div style="margin-top:10px;font-size:13px;font-weight:900;text-align:right;color:' + ((st.carriedDue + st.curDue) > 0 ? '#b71c1c' : '#1a8c3c') + '">Total due now: ' + inr(st.carriedDue + st.curDue) + '</div>'
      + '<div style="font-size:10.5px;color:#777;margin-top:4px">Anything still due at 31 March is carried over automatically into the next year\'s statement.</div>';
  }
  function box(label, val, color) { return '<div style="border:1px solid #e3e6ee;border-radius:10px;padding:8px 10px;background:#fff"><div style="font-size:10px;font-weight:800;color:#666;text-transform:uppercase">' + label + '</div><div style="font-size:15px;font-weight:900;color:' + color + ';margin-top:2px">' + val + '</div></div>'; }
  function fyList(vendor) {
    var set = {}; var cur = fyOf(todayKey()); set[cur] = 1;
    vendorRows(vendor).forEach(function (v) { var f = fyOf(dateOf(v)); if (f) set[f] = 1; });
    return Object.keys(set).sort().reverse();
  }
  var state = { vendor: '', fy: '' };
  function render() {
    var ov = document.getElementById('vst-ov'); if (!ov) return;
    var st = build(state.vendor, state.fy);
    ov.querySelector('#vst-body').innerHTML = CSS + bodyHtml(st, false);
    ov.querySelector('#vst-fy').innerHTML = fyList(state.vendor).map(function (f) { return '<option value="' + f + '"' + (f === state.fy ? ' selected' : '') + '>FY ' + f + (f === fyOf(todayKey()) ? ' (current)' : '') + '</option>'; }).join('');
  }
  window.bmhOpenVendorStatement = function (vendor) {
    vendor = String(vendor || '').trim();
    if (!vendor) { try { vendor = String(document.getElementById('inv-vendor-filter').value || '').trim(); } catch (e) {} }
    if (!vendor) { var names = Array.from(new Set(bills().map(function (v) { return String(v.vendor || '').trim(); }).filter(Boolean))).sort(); vendor = (window.prompt('Vendor name for the statement:' + (names.length ? '\n(e.g. ' + names.slice(0, 4).join(', ') + ')' : ''), '') || '').trim(); }
    if (!vendor) return;
    var match = bills().find(function (v) { return norm(v.vendor) === norm(vendor); }); if (match) vendor = String(match.vendor).trim();
    state.vendor = vendor; state.fy = fyOf(todayKey());
    var old = document.getElementById('vst-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'vst-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4500;background:rgba(10,20,40,.45);display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow:auto';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:860px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:200px"><div style="font-size:11px;font-weight:900;color:#666;text-transform:uppercase">Vendor statement</div><div style="font-size:17px;font-weight:900">' + esc(vendor) + '</div></div>'
      + '<select id="vst-fy" onchange="bmhVendorStmtFy(this.value)" style="width:auto;flex:0 0 auto;padding:6px 8px;border-radius:8px;border:1px solid #ccc"></select>'
      + '<button type="button" class="btn btn-outline btn-sm" onclick="bmhVendorStmtPrint()">🖨️ Print</button><button type="button" class="btn btn-gray btn-sm" onclick="document.getElementById(\'vst-ov\').remove()">Close</button></div>'
      + '<div id="vst-body"></div></div>';
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
    document.body.appendChild(ov);
    render();
  };
  window.bmhVendorStmtFy = function (fy) { state.fy = fy; render(); };
  window.bmhVendorStmtSaveOpening = function () {
    var amt = Math.max(0, Math.round(Number((document.getElementById('vst-op-amt') || {}).value || 0) * 100) / 100);
    var note = String((document.getElementById('vst-op-note') || {}).value || '').trim();
    var op = openingRow(state.vendor, state.fy);
    var prev = prevFy(state.fy);
    if (op) {
      if (amt < (Number(op.paidAmount) || 0)) { showToast('Amount cannot be less than what is already paid against it (' + inr(op.paidAmount) + ')', 'w'); return; }
      if (!amt) {
        if (!confirm('Remove the carried-over amount for ' + state.vendor + '?')) return;
        var i = bills().indexOf(op); if (i >= 0) bills().splice(i, 1);
      } else {
        op.amount = amt; op.note = note;
        op.status = due(op) <= 0 ? 'paid' : (Number(op.paidAmount) > 0 ? 'partial' : 'pending');
        op.updatedAt = new Date().toISOString();
      }
    } else {
      if (!amt) { showToast('Enter the amount carried over', 'w'); return; }
      var startKey = fyStart(state.fy);
      var d = new Date(startKey + 'T00:00:00'); d.setDate(d.getDate() - 1);
      var bdk = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      bills().push({ id: 'VBOPEN' + Date.now(), vendor: state.vendor, invoiceNo: 'Opening balance (carried over from ' + prev + ')', amount: amt, paidAmount: 0, status: 'pending', opening: true, fy: state.fy, note: note, billDateKey: bdk, dueDate: '', createdAt: '2000-01-01T00:00:00.000Z', enteredAt: new Date().toISOString(), enteredBy: (function () { try { return CURRENT_USER && CURRENT_USER.name; } catch (e) { return ''; } })() || '' });
    }
    try { saveBmhFinancials(); } catch (e) {}
    try { bmhRenderVendorTables(); } catch (e) {}
    showToast('Carried-over amount saved ✓', 's');
    render();
  };
  window.bmhVendorStmtPrint = function () {
    var st = build(state.vendor, state.fy);
    var hosp = ''; try { hosp = getHospitalDetailValue('Hospital Name', 'Baweja Multispeciality Hospital'); } catch (e) { hosp = 'Baweja Multispeciality Hospital'; }
    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Vendor statement — ' + esc(st.vendor) + ' — FY ' + st.fy + '</title><style>body{font-family:Arial,sans-serif;font-size:11px;padding:12mm;color:#111}@page{size:A4;margin:0}h1{font-size:15px;margin:0}h2{font-size:13px;margin:2px 0 8px}</style>' + CSS + '</head><body>'
      + '<h1>' + esc(hosp) + '</h1><h2>Vendor statement: ' + esc(st.vendor) + ' — Financial year ' + st.fy + '</h2><div style="font-size:10px;color:#555">Printed ' + fmtDate(todayKey()) + '</div>'
      + bodyHtml(st, true) + '</body></html>';
    try { safePrint(html); } catch (e) { var w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); w.print(); } }
  };
  // ── buttons: on each vendor in the summary and in the bill list, and one on the summary card header ──
  function addButtons() {
    var btn = function (vendor) { return '<button type="button" class="btn btn-xs btn-outline vst-btn" onclick="event.stopPropagation();bmhOpenVendorStatement(this.getAttribute(\'data-v\'))" data-v="' + esc(vendor) + '" title="Opening balance, this year\'s bills, payments and dues">📒 Statement</button>'; };
    var sum = document.getElementById('inv-vendor-summary');
    if (sum) {
      Array.prototype.forEach.call(sum.children, function (row) {
        if (row.querySelector('.vst-btn')) return;
        var nm = row.querySelector('strong'); if (!nm) return;
        var right = row.children[1]; if (!right) return;
        right.insertAdjacentHTML('afterbegin', btn(nm.textContent.trim()));
      });
      var hd = sum.previousElementSibling;
      if (hd && !hd.querySelector('.vst-hd-btn')) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-outline btn-sm vst-hd-btn'; b.textContent = '📒 Vendor statement / carried over';
        b.onclick = function () { bmhOpenVendorStatement(''); };
        var holder = hd.querySelector('button') ? hd.querySelector('button').parentNode : hd;
        if (holder === hd) hd.appendChild(b); else holder.insertBefore(b, holder.querySelector('button'));
      }
    }
    ['inv-vendor-table', 'bmh-vendor-table'].forEach(function (id) {
      var el = document.getElementById(id); if (!el) return;
      Array.prototype.forEach.call(el.querySelectorAll('tr[onclick^="bmhFilterVendorFromSummary"]'), function (tr) {
        if (tr.querySelector('.vst-btn')) return;
        var nm = tr.querySelector('strong'); var out = tr.querySelector('td[colspan] > div > div:last-child');
        if (nm && out) out.insertAdjacentHTML('beforebegin', '<div>' + btn(nm.textContent.trim()) + '</div>');
      });
    });
  }
  if (typeof window.bmhRenderVendorTables === 'function') {
    var orig = window.bmhRenderVendorTables;
    window.bmhRenderVendorTables = function () {
      var r = orig.apply(this, arguments);
      try { addButtons(); } catch (e) { console.warn('[vendor-statement]', e); }
      return r;
    };
  }
  window.bmhVendorStatement = { build: build, fyOf: fyOf };
})();
