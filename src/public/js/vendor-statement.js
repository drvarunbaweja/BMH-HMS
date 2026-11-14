/* BMH — Vendor year statement (Billing → Vendors).
 * Adds a "📒 Statement" button against each vendor. The statement shows, for one financial year (April–March):
 *   1. Carried over from earlier years — an opening amount you can type in (old dues not in the system), plus any
 *      older bills that were still unpaid at the start of the year.
 *   2. This year's bills — date, invoice, amount, paid, paid date, due.
 *   3. Payments made this year (from the ledger), and the total due now.
 * Unpaid bills automatically appear under "carried over" in the next year's statement.
 * The opening amount is saved as an ordinary vendor bill row marked "Opening balance", so the existing outstanding
 * totals, Pay buttons and payment order (oldest first) all include it.
 * Also in the statement: Pay (one bill, or vendor total / part), Return (full or part of a bill's amount),
 * duplicate-invoice warnings, and a summary print for this financial year, all years, or chosen dates.
 * Nothing else is changed.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function inr(n) { return '₹' + (Number(n) || 0).toLocaleString('en-IN'); }
  function norm(s) { try { return normalizeInventoryCompareText(String(s || '')); } catch (e) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); } }
  function due(v) { try { return bmhVendorBillOutstanding(v); } catch (e) { return Math.max(0, (Number(v.amount) || 0) - (Number(v.paidAmount) || 0)); } }
  function bills() { return window.BMH_VENDOR_BILLS || []; }
  // bill date (entered / corrected on the bill), else the day it was entered
  function dateOf(v) { return String(v.invoiceDate || v.billDateKey || v.createdAt || '').slice(0, 10); }
  function hasBillDate(v) { return !!(v.invoiceDate || v.billDateKey || v.opening); }
  function dateCell(v, forPrint) {
    if (hasBillDate(v)) return fmtDate(dateOf(v));
    var ent = fmtDate(String(v.createdAt || '').slice(0, 10));
    if (forPrint) return ent;
    var idA = esc(String(v.id || '').replace(/'/g, ''));
    return '<span title="Bill date not entered — shown by the date it was entered in the computer">' + ent + '</span>' + (typeof window.bmhSetVendorBillDate === 'function' ? '<div><a href="javascript:void 0" style="font-size:10px;font-weight:800;color:#d35400" onclick="bmhSetVendorBillDate(\'' + idA + '\')">📅 set bill date</a></div>' : '<div style="font-size:10px;color:#d35400">entered date</div>');
  }
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
  function invKey(v) { return String(v.invoiceNo || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function dupIds(vendor) {
    var seen = {}, ids = {};
    vendorRows(vendor).forEach(function (v) { if (v.opening) return; var k = invKey(v); if (!k || /^ocr/.test(k)) return; (seen[k] = seen[k] || []).push(v.id); });
    Object.keys(seen).forEach(function (k) { if (seen[k].length > 1) seen[k].forEach(function (id) { ids[id] = 1; }); });
    return ids;
  }
  function creditOf(vendor) { return vendorRows(vendor).reduce(function (t, v) { return t + (Number(v.creditBalance) || 0); }, 0); }
  function returnedOf(v) { return Number(v.returnAdjusted) || 0; }
  function isAdmin() { try { return typeof isAdminUser === 'function' ? isAdminUser() : !!(CURRENT_USER && CURRENT_USER.isAdmin); } catch (e) { return false; } }
  function build(vendor, fy) {
    var s = fyStart(fy), e = fyEnd(fy);
    var rows = vendorRows(vendor).slice().sort(function (a, b) { return dateOf(a).localeCompare(dateOf(b)); });
    var carried = rows.filter(function (v) { var d = dateOf(v); return d < s && (due(v) > 0 || String(v.paidAt || '').slice(0, 10) >= s); });
    var current = rows.filter(function (v) { var d = dateOf(v); return d >= s && d <= e; });
    var sum = function (list, f) { return list.reduce(function (t, v) { return t + f(v); }, 0); };
    return {
      vendor: vendor, fy: fy, carried: carried, current: current, opening: openingRow(vendor, fy), payments: ledgerPayments(vendor, fy),
      carriedDue: sum(carried, due), curAmt: sum(current, function (v) { return Number(v.amount) || 0; }),
      curPaid: sum(current, function (v) { return Number(v.paidAmount) || 0; }), curDue: sum(current, due),
      curRet: sum(current, returnedOf), dups: dupIds(vendor), credit: creditOf(vendor),
      advance: (function () { try { return typeof window.bmhVendorAdvance === 'function' ? Number(window.bmhVendorAdvance(vendor)) || 0 : 0; } catch (e) { return 0; } })()
    };
  }
  function rowsHtml(list, empty, st, forPrint) {
    var cols = forPrint ? 6 : 7;
    if (!list.length) return '<tr><td colspan="' + cols + '" style="text-align:center;color:#888;padding:8px">' + empty + '</td></tr>';
    return list.map(function (v) {
      var d = due(v), dup = st && st.dups[v.id], idA = esc(String(v.id || '').replace(/'/g, ''));
      var acts = forPrint ? '' : '<td style="white-space:nowrap">' + (d > 0 ? '<button type="button" class="btn btn-xs btn-gold" onclick="bmhVendorStmtPayBill(\'' + idA + '\')">Pay</button> ' : '') + (!v.opening && Number(v.amount) > 0 ? '<button type="button" class="btn btn-xs btn-outline" onclick="bmhVendorStmtReturn(\'' + idA + '\')">Return</button>' : '') + (!v.opening && typeof window.bmhEditVendorBill === 'function' ? ' <button type="button" class="btn btn-xs btn-outline" title="Edit this bill (same invoice number)" onclick="bmhEditVendorBill(\'' + idA + '\',{lockInvoice:true})">✏️ Edit</button>' : '') + (dup && isAdmin() ? ' <button type="button" class="btn btn-xs btn-red" onclick="bmhVendorStmtDelete(\'' + idA + '\')">Delete</button>' : '') + '</td>';
      var ret = returnedOf(v) > 0 ? '<div style="font-size:10px;color:#6a1b9a">Returned ' + inr(returnedOf(v)) + (v.originalAmount ? ' of ' + inr(v.originalAmount) : '') + '</div>' : '';
      var cred = Number(v.creditBalance) > 0 ? '<div style="font-size:10px;color:#1a8c3c">Credit ' + inr(v.creditBalance) + '</div>' : '';
      return '<tr' + (dup ? ' style="background:#fff3f3"' : '') + '><td>' + dateCell(v, forPrint) + '</td><td>' + esc(v.opening ? (v.invoiceNo || 'Opening balance') : (v.invoiceNo || 'No invoice')) + (dup ? ' <span style="font-size:10px;font-weight:800;color:#c62828">⚠ duplicate invoice</span>' : '') + (v.opening && v.note ? '<div style="font-size:10px;color:#777">' + esc(v.note) + '</div>' : '') + '</td><td style="text-align:right">' + inr(v.amount) + ret + cred + '</td><td style="text-align:right">' + inr(v.paidAmount) + '</td><td>' + (Number(v.paidAmount) > 0 ? fmtDate(String(v.paidAt || '').slice(0, 10)) + (v.paymentMode ? '<div style="font-size:10px;color:#777">' + esc(v.paymentMode) + (v.paidRef ? ' · ' + esc(v.paidRef) : '') + '</div>' : '') : '—') + '</td><td style="text-align:right;font-weight:800;color:' + (d > 0 ? '#b55a00' : '#1a8c3c') + '">' + (d > 0 ? inr(d) : 'Paid') + '</td>' + acts + '</tr>';
    }).join('');
  }
  function tableHtml(title, list, empty, foot, st, forPrint) {
    return '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue,#1A3C6E);text-transform:uppercase;letter-spacing:.4px;margin:12px 0 4px">' + title + '</div>'
      + '<table class="vst"><thead><tr><th>Bill date</th><th>Invoice</th><th style="text-align:right">Amount</th><th style="text-align:right">Paid</th><th>Paid on</th><th style="text-align:right">Due</th>' + (forPrint ? '' : '<th></th>') + '</tr></thead><tbody>' + rowsHtml(list, empty, st, forPrint) + '</tbody>' + (foot ? foot.replace('</tr></tfoot>', (forPrint ? '' : '<td></td>') + '</tr></tfoot>') : '') + '</table>';
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
    var nd = Object.keys(st.dups).length;
    var dupBox = nd ? '<div style="background:#fdecea;border:1px solid #f5b5b0;border-radius:10px;padding:9px 12px;margin-top:10px;font-size:12px;color:#8e1c1c"><b>⚠ ' + nd + ' bills share an invoice number with another bill</b> (marked in red below). The same invoice may have been entered twice — check them' + (isAdmin() ? ' and delete the extra one.' : ' and ask the admin to delete the extra one.') + ' If the extra one was paid, its payment entry stays in the ledger.</div>' : '';
    var totalDue = Math.max(0, st.carriedDue + st.curDue - st.credit - (st.advance || 0));
    var advBox = st.advance > 0 ? '<div style="background:#e9f7ec;border:1px solid #9bd3ad;border-radius:10px;padding:9px 12px;margin-top:10px;font-size:12px">Advance paid to this vendor (more than was due): <b>' + inr(st.advance) + '</b>' + (forPrint ? '' : ' <span style="color:#555">— used first the next time you pay this vendor (Pay vendor).</span>') + '</div>' : '';
    var creditBox = st.credit > 0 ? '<div style="background:#e9f7ec;border:1px solid #9bd3ad;border-radius:10px;padding:9px 12px;margin-top:10px;font-size:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap"><div style="flex:1">Credit with this vendor (from returns after payment): <b>' + inr(st.credit) + '</b></div>' + (!forPrint && (st.carriedDue + st.curDue) > 0 ? '<button type="button" class="btn btn-xs btn-gold" onclick="bmhVendorStmtUseCredit()">Adjust credit against dues</button>' : '') + '</div>' : '';
    return (forPrint ? '' : dupBox) + openingBox + creditBox + advBox
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:12px">'
      + box('Carried over — due now', inr(st.carriedDue), '#b55a00')
      + box(st.fy + ' bills', inr(st.curAmt) + '<div style="font-size:10.5px;font-weight:600;color:#555">Paid ' + inr(st.curPaid) + '</div>', '#1A3C6E')
      + box(st.fy + ' bills — due', inr(st.curDue), '#b55a00')
      + box('Total due now', inr(totalDue), totalDue > 0 ? '#b71c1c' : '#1a8c3c')
      + '</div>'
      + tableHtml('1. Carried over from earlier years', st.carried, 'Nothing carried over', '<tfoot><tr><td colspan="5">Carried over — due now</td><td style="text-align:right">' + inr(st.carriedDue) + '</td></tr></tfoot>', st, forPrint)
      + tableHtml('2. Bills in ' + st.fy + ' (1 Apr ' + st.fy.slice(0, 4) + ' – 31 Mar ' + (Number(st.fy.slice(0, 4)) + 1) + ')', st.current, 'No bills this year', '<tfoot><tr><td colspan="2">Total' + (st.curRet ? ' <span style="font-weight:600;color:#6a1b9a;font-size:10.5px">(after returns of ' + inr(st.curRet) + ')</span>' : '') + '</td><td style="text-align:right">' + inr(st.curAmt) + '</td><td style="text-align:right">' + inr(st.curPaid) + '</td><td></td><td style="text-align:right">' + inr(st.curDue) + '</td></tr></tfoot>', st, forPrint)
      + '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue,#1A3C6E);text-transform:uppercase;letter-spacing:.4px;margin:12px 0 4px">3. Payments made in ' + st.fy + '</div>'
      + '<table class="vst"><thead><tr><th>Date</th><th colspan="4">Details</th><th style="text-align:right">Amount</th></tr></thead><tbody>' + payRows + '</tbody></table>'
      + '<div style="margin-top:10px;font-size:13px;font-weight:900;text-align:right;color:' + (totalDue > 0 ? '#b71c1c' : '#1a8c3c') + '">Total due now: ' + inr(totalDue) + (st.credit > 0 || st.advance > 0 ? ' <span style="font-size:11px;color:#1a8c3c">(after ' + [st.credit > 0 ? 'credit ' + inr(st.credit) : '', st.advance > 0 ? 'advance ' + inr(st.advance) : ''].filter(Boolean).join(' and ') + ')</span>' : '') + '</div>'
      + '<div style="font-size:10.5px;color:#777;margin-top:4px">Anything still due at 31 March is carried over automatically into the next year\'s statement.</div>'
      + usageHtml(st, forPrint);
  }
  // ── "bill when used" stock (IOLs / consignment): due as per usage ──
  function isOnUseMode(m) { return String(m || '').toLowerCase() === 'on-use'; }
  function usageIndex() {
    var inv = {}, pur = {};
    try { (INVENTORY || []).forEach(function (i) { if (i && i.barcode) inv[i.barcode] = i; }); } catch (e) { (window.INVENTORY || []).forEach(function (i) { if (i && i.barcode) inv[i.barcode] = i; }); }
    (window.BMH_PURCHASES || []).forEach(function (p) { if (p && p.barcode && p.vendor && !/^RET/.test(String(p.id || ''))) pur[p.barcode] = p; });
    return { inv: inv, pur: pur };
  }
  function usageFor(vendor) {
    var k = norm(vendor), ix = usageIndex();
    return (window.BMH_INVENTORY_USAGE || []).filter(function (u) { return u && !/return/i.test(String(u.mode || '')) && Number(u.qty) > 0; }).map(function (u) {
      var it = ix.inv[u.barcode] || {}, p = ix.pur[u.barcode] || {};
      var onUse = isOnUseMode(u.vendorBillingMode) || isOnUseMode(p.billMode) || isOnUseMode(it.vendorBillingMode);
      var v = p.vendor || it.vendor || '';
      if (!onUse || norm(v) !== k) return null;
      var cost = Number(u.cost) || Number(p.cost) || Number(it.cost) || 0;
      return { ts: u.ts || '', date: String(u.ts || '').slice(0, 10), patient: u.patientName || u.bmhId || '', bmhId: u.bmhId || '', item: u.itemName || it.name || '', power: it.power || '', serial: u.serialNo || it.serialNo || '', batch: u.batchNo || it.batchNo || '', qty: Number(u.qty) || 1, cost: cost, value: Math.round(cost * (Number(u.qty) || 1) * 100) / 100, noCost: !cost };
    }).filter(Boolean).sort(function (a, b) { return String(a.ts).localeCompare(String(b.ts)); });
  }
  function onUseBills(vendor) { return vendorRows(vendor).filter(function (v) { return isOnUseMode(v.billMode) || v.usageLinked; }); }
  function usageStats(vendor) {
    var used = usageFor(vendor), bl = onUseBills(vendor);
    var usedVal = used.reduce(function (t, u) { return t + u.value; }, 0);
    var billed = bl.reduce(function (t, v) { return t + (Number(v.amount) || 0); }, 0);
    var paid = bl.reduce(function (t, v) { return t + (Number(v.paidAmount) || 0); }, 0);
    return { used: used, bills: bl, usedVal: usedVal, billed: billed, paid: paid, due: Math.max(0, Math.round((usedVal - paid) * 100) / 100), unused: Math.max(0, billed - usedVal), noCost: used.filter(function (u) { return u.noCost; }).length, any: used.length > 0 || bl.length > 0 };
  }
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function usageHtml(st, forPrint) {
    var u = usageStats(st.vendor); if (!u.any) return '';
    var s = fyStart(st.fy), e = fyEnd(st.fy), months = {};
    u.used.forEach(function (r) { if (r.date >= s && r.date <= e) { var m = r.date.slice(0, 7); (months[m] = months[m] || []).push(r); } });
    var mrows = Object.keys(months).sort().map(function (m) {
      var list = months[m], val = list.reduce(function (t, r) { return t + r.value; }, 0);
      var items = list.map(function (r) { return '<tr><td>' + fmtDate(r.date) + '</td><td>' + esc(r.patient) + (r.bmhId && r.bmhId !== r.patient ? ' <span style="color:#888">' + esc(r.bmhId) + '</span>' : '') + '</td><td>' + esc(r.item) + (r.power ? ' · ' + esc(r.power) + ' D' : '') + (r.serial ? ' · SN ' + esc(r.serial) : '') + '</td><td style="text-align:right">' + r.qty + '</td><td style="text-align:right">' + (r.noCost ? '<span style="color:#c62828">cost not entered</span>' : inr(r.value)) + '</td></tr>'; }).join('');
      var label = MONTHS[Number(m.slice(5, 7)) - 1] + ' ' + m.slice(0, 4);
      return forPrint
        ? '<tr style="background:#f6f7fa"><td colspan="3"><b>' + label + '</b> — ' + list.length + ' used</td><td></td><td style="text-align:right"><b>' + inr(val) + '</b></td></tr>' + items
        : '<details style="border-top:1px solid #eee;padding:5px 2px"><summary style="cursor:pointer;display:flex;gap:8px;font-size:12px"><b style="flex:1">' + label + '</b><span>' + list.length + ' used</span><b style="min-width:90px;text-align:right">' + inr(val) + '</b></summary><table class="vst" style="margin-top:4px"><thead><tr><th>Date</th><th>Patient</th><th>Item</th><th style="text-align:right">Qty</th><th style="text-align:right">Cost</th></tr></thead><tbody>' + items + '</tbody></table></details>';
    }).join('');
    var monthsBlock = forPrint
      ? '<table class="vst"><thead><tr><th>Date</th><th>Patient</th><th>Item</th><th style="text-align:right">Qty</th><th style="text-align:right">Cost</th></tr></thead><tbody>' + (mrows || '<tr><td colspan="5" style="text-align:center;color:#888">Nothing used in ' + st.fy + '</td></tr>') + '</tbody></table>'
      : (mrows || '<div style="font-size:12px;color:#888;padding:6px 2px">Nothing used in ' + st.fy + '</div>');
    return '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue,#1A3C6E);text-transform:uppercase;letter-spacing:.4px;margin:14px 0 4px">4. Bill-when-used stock (IOLs / consignment) — due as per usage</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px">'
      + box('Billed (bill when used)', inr(u.billed), '#1A3C6E') + box('Used so far', inr(u.usedVal) + '<div style="font-size:10.5px;font-weight:600;color:#555">' + u.used.length + ' item' + (u.used.length === 1 ? '' : 's') + '</div>', '#6a1b9a')
      + box('Paid', inr(u.paid), '#1a8c3c') + box('Due as per usage', inr(u.due), u.due > 0 ? '#b71c1c' : '#1a8c3c') + box('Stock not yet used', inr(u.unused), '#555') + '</div>'
      + (u.noCost ? '<div style="font-size:11px;color:#c62828;margin-top:5px">⚠ ' + u.noCost + ' used item' + (u.noCost === 1 ? ' has' : 's have') + ' no cost entered in the stock, so ' + (u.noCost === 1 ? 'it is' : 'they are') + ' counted as ₹0. Enter the cost in Inventory to include ' + (u.noCost === 1 ? 'it' : 'them') + '.</div>' : '')
      + (!forPrint && u.due > 0 ? '<div style="margin-top:8px"><button type="button" class="btn btn-gold btn-sm" onclick="bmhVendorStmtPayUsage()">💳 Pay as per usage (' + inr(u.due) + ')</button></div>' : '')
      + '<div style="font-size:11px;font-weight:800;color:#555;margin:10px 0 2px">Used in ' + st.fy + ', month by month' + (forPrint ? '' : ' (tap a month for the list)') + '</div>' + monthsBlock
      + '<div style="font-size:10.5px;color:#777;margin-top:4px">Due as per usage = cost of everything used so far − amount already paid on the bill-when-used bills. The full bill above still shows the total supplied.</div>';
  }
  window.bmhVendorStmtPayUsage = function () {
    var u = usageStats(state.vendor); if (!(u.due > 0)) return;
    var amtStr = prompt('Amount being paid to ' + state.vendor + ' as per usage', String(u.due)); if (amtStr === null) return;
    var amt = Math.max(0, Number(amtStr || 0)); if (!(amt > 0)) { showToast('Enter payment amount', 'w'); return; }
    var mode = prompt('Payment mode (Cheque / Bank Transfer / NEFT):', 'Bank Transfer') || 'Bank Transfer';
    var ref = prompt('Cheque no. / UTR / reference:') || '';
    var rows = u.bills.filter(function (v) { return due(v) > 0; }).sort(function (a, b) { return String(a.createdAt || '').localeCompare(String(b.createdAt || '')); });
    var left = amt;
    try { left = bmhApplyVendorPaymentToBills(rows, amt, mode, ref); } catch (e) { console.warn(e); return; }
    var paid = amt - left;
    if (paid > 0) { try { bmhAppendLedger({ date: new Date().toISOString(), type: 'Payment', narration: 'Vendor ' + state.vendor + ' — payment as per usage (' + u.used.length + ' items used)', dr: paid, cr: 0, party: state.vendor, ref: (mode ? mode + ' · ' : '') + ref }); } catch (e) {} }
    try { saveBmhFinancials(); } catch (e) {}
    try { bmhRenderVendorTables(); } catch (e) {}
    try { if (typeof renderBillingPageIfActive === 'function') renderBillingPageIfActive(); } catch (e) {}
    showToast('Payment of ' + inr(paid) + ' recorded ✓' + (left > 0 ? ' — ' + inr(left) + ' was more than the bills due and was not applied' : ''), left > 0 ? 'w' : 's');
    render();
  };
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
      + '<button type="button" class="btn btn-gold btn-sm" onclick="bmhVendorStmtPayVendor()">💳 Pay vendor (full / part)</button>'
      + '<button type="button" class="btn btn-outline btn-sm" onclick="bmhVendorStmtPrint()">🖨️ Print statement</button><button type="button" class="btn btn-outline btn-sm" onclick="bmhVendorStmtSummaryBox()">🧾 Summary print</button><button type="button" class="btn btn-gray btn-sm" onclick="document.getElementById(\'vst-ov\').remove()">Close</button></div>'
      + '<div id="vst-sumbox" style="display:none;margin-top:10px;background:#f2f5fa;border:1px solid #dde3ee;border-radius:10px;padding:10px 12px;font-size:12px"><div style="font-weight:800;margin-bottom:6px">Summary print — totals, amounts paid, reference numbers and dates</div><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">'
      + '<label><input type="radio" name="vst-per" value="fy" checked style="width:auto"> This financial year</label><label><input type="radio" name="vst-per" value="all" style="width:auto"> All years (history)</label><label><input type="radio" name="vst-per" value="dates" style="width:auto"> Dates</label>'
      + '<input type="date" id="vst-from" style="width:auto;padding:4px 6px"> to <input type="date" id="vst-to" style="width:auto;padding:4px 6px"><button type="button" class="btn btn-blue btn-sm" onclick="bmhVendorStmtSummaryPrint()">Print summary</button></div></div>'
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
  function findBill(id) { return bills().find(function (v) { return String(v.id) === String(id); }); }
  function saved() { try { saveBmhFinancials(); } catch (e) {} try { bmhRenderVendorTables(); } catch (e) { render(); } try { if (typeof renderBillingPageIfActive === 'function') renderBillingPageIfActive(); } catch (e) {} render(); }
  window.bmhVendorStmtPayBill = function (id) { try { bmhMarkVendorPaid(id); } catch (e) { console.warn(e); } render(); };
  window.bmhVendorStmtPayVendor = function () { try { bmhPayVendorOutstanding(state.vendor); } catch (e) { console.warn(e); } render(); };
  window.bmhVendorStmtDelete = function (id) { try { bmhDeleteVendorBill(id); } catch (e) { console.warn(e); } render(); };
  function creditOrder(v) { return (v.opening ? '0' : '1') + String(v.invoiceDate || v.billDateKey || v.createdAt || '9999').slice(0, 10) + String(v.createdAt || ''); }
  // apply a credit amount to this vendor's outstanding bills, oldest first; returns what is left
  function applyCredit(amount, fromLabel, skipId) {
    var left = amount;
    vendorRows(state.vendor).filter(function (v) { return String(v.id) !== String(skipId) && due(v) > 0; })
      .sort(function (a, b) { return creditOrder(a).localeCompare(creditOrder(b)); }) // oldest invoice first (opening balance first)
      .forEach(function (v) {
        if (left <= 0) return;
        var use = Math.min(due(v), left);
        v.paidAmount = (Number(v.paidAmount) || 0) + use;
        v.status = due(v) <= 0 ? 'paid' : 'partial';
        v.paidAt = new Date().toISOString(); v.paymentMode = 'Credit note'; v.paidRef = fromLabel;
        (v.creditAdjustments = v.creditAdjustments || []).push({ date: v.paidAt, amount: use, from: fromLabel });
        left -= use;
      });
    return Math.round(left * 100) / 100;
  }
  window.bmhVendorStmtUseCredit = function () {
    var withCredit = vendorRows(state.vendor).filter(function (v) { return Number(v.creditBalance) > 0; });
    var total = withCredit.reduce(function (t, v) { return t + Number(v.creditBalance); }, 0);
    if (!(total > 0)) return;
    if (!confirm('Adjust credit of ' + inr(total) + ' against ' + state.vendor + '\'s unpaid bills (oldest first)?')) return;
    withCredit.forEach(function (v) { var c = Number(v.creditBalance); v.creditBalance = applyCredit(c, 'Credit from return on ' + (v.invoiceNo || 'bill'), v.id); });
    saved(); showToast('Credit adjusted ✓', 's');
  };
  window.bmhVendorStmtReturn = function (id) {
    var v = findBill(id); if (!v) return;
    var old = document.getElementById('vst-ret'); if (old) old.remove();
    var amt = Number(v.amount) || 0;
    var box = document.createElement('div'); box.id = 'vst-ret';
    box.style.cssText = 'position:fixed;inset:0;z-index:4700;background:rgba(10,20,40,.35);display:flex;align-items:center;justify-content:center;padding:14px';
    box.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:440px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3);font-size:12.5px">'
      + '<div style="font-size:15px;font-weight:900">Return against bill ' + esc(v.invoiceNo || '') + '</div>'
      + '<div style="color:#666;margin:2px 0 10px">' + esc(v.vendor || '') + ' · Bill amount ' + inr(amt) + ' · Paid ' + inr(v.paidAmount) + ' · Due ' + inr(due(v)) + (returnedOf(v) ? ' · Already returned ' + inr(returnedOf(v)) : '') + '</div>'
      + '<div style="display:flex;gap:8px;margin-bottom:10px"><label style="flex:1;border:1px solid #ccc;border-radius:8px;padding:8px;cursor:pointer"><input type="radio" name="vst-rt" value="full" style="width:auto"> <b>Full return</b><div style="font-size:11px;color:#666">' + inr(amt) + '</div></label><label style="flex:1;border:1px solid #ccc;border-radius:8px;padding:8px;cursor:pointer"><input type="radio" name="vst-rt" value="part" checked style="width:auto"> <b>Part return</b><div style="font-size:11px;color:#666">enter amount</div></label></div>'
      + '<input id="vst-rt-amt" type="number" min="1" step="0.01" placeholder="Return amount ₹" style="width:100%;padding:7px 9px;border:1px solid #ccc;border-radius:8px;margin-bottom:8px">'
      + '<input id="vst-rt-note" type="text" placeholder="Reason / credit note no. (e.g. expired, damaged, CN-123)" style="width:100%;padding:7px 9px;border:1px solid #ccc;border-radius:8px">'
      + '<div style="font-size:10.5px;color:#777;margin-top:8px">This reduces the amount payable on this bill. If the bill was already paid, the extra becomes a credit that is adjusted against this vendor\'s other unpaid bills. Stock is not changed here — use Inventory → Return for the items.</div>'
      + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" class="btn btn-gray btn-sm" id="vst-rt-cancel">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="vst-rt-ok">Save return</button></div></div>';
    document.body.appendChild(box);
    var amtEl = box.querySelector('#vst-rt-amt');
    Array.prototype.forEach.call(box.querySelectorAll('input[name=vst-rt]'), function (r) { r.onchange = function () { if (r.value === 'full' && r.checked) amtEl.value = amt; else if (r.checked) { amtEl.value = ''; amtEl.focus(); } }; });
    box.querySelector('#vst-rt-cancel').onclick = function () { box.remove(); };
    box.querySelector('#vst-rt-ok').onclick = function () {
      var r = Math.round(Number(amtEl.value || 0) * 100) / 100;
      if (!(r > 0)) { showToast('Enter the return amount', 'w'); return; }
      if (r > amt) { showToast('Return cannot be more than the bill amount (' + inr(amt) + ')', 'w'); return; }
      var note = String(box.querySelector('#vst-rt-note').value || '').trim();
      if (v.originalAmount == null) v.originalAmount = amt;
      v.amount = Math.round((amt - r) * 100) / 100;
      v.returnAdjusted = (Number(v.returnAdjusted) || 0) + r;
      var by = ''; try { by = (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) {}
      (v.returns = v.returns || []).push({ date: new Date().toISOString(), amount: r, note: note, by: by });
      var excess = (Number(v.paidAmount) || 0) - v.amount;
      if (excess > 0) {
        v.paidAmount = v.amount;
        var left = applyCredit(excess, 'Credit from return on ' + (v.invoiceNo || 'bill'), v.id);
        if (left > 0) v.creditBalance = Math.round(((Number(v.creditBalance) || 0) + left) * 100) / 100;
      }
      v.status = due(v) <= 0 ? 'paid' : ((Number(v.paidAmount) || 0) > 0 ? 'partial' : 'pending');
      box.remove();
      saved();
      showToast('Return of ' + inr(r) + ' saved ✓', 's');
    };
  };
  // ── summary print: totals, paid, reference numbers and dates for this FY / all years / chosen dates ──
  window.bmhVendorStmtSummaryBox = function () { var b = document.getElementById('vst-sumbox'); if (b) b.style.display = b.style.display === 'none' ? '' : 'none'; };
  window.bmhVendorStmtSummaryHtml = function (per, fromIn, toIn) {
    var from = '', to = '', label = '';
    if (per === 'fy') { from = fyStart(state.fy); to = fyEnd(state.fy); label = 'Financial year ' + state.fy; }
    else if (per === 'dates') {
      from = fromIn || ''; to = toIn || '';
      if (!from || !to) return '';
      if (from > to) { var x = from; from = to; to = x; }
      label = fmtDate(from) + ' to ' + fmtDate(to);
    } else label = 'All years (complete history)';
    var inRange = function (d) { return (!from || d >= from) && (!to || d <= to); };
    var rows = vendorRows(state.vendor).filter(function (v) { return inRange(dateOf(v)); }).sort(function (a, b) { return dateOf(a).localeCompare(dateOf(b)); });
    var before = from ? vendorRows(state.vendor).filter(function (v) { return dateOf(v) < from && due(v) > 0; }) : [];
    var k = norm(state.vendor);
    var pays = (window.BMH_LEDGER || []).filter(function (l) { return l && norm(l.party) === k && Number(l.dr) > 0 && /payment/i.test(String(l.type || 'Payment')) && inRange(String(l.date || '').slice(0, 10)); }).sort(function (a, b) { return String(a.date).localeCompare(String(b.date)); });
    var t = { billed: 0, ret: 0, net: 0, paid: 0, due: 0 };
    var body = rows.map(function (v) {
      var orig = v.originalAmount != null ? Number(v.originalAmount) : Number(v.amount) || 0, rt = returnedOf(v), d = due(v);
      t.billed += orig; t.ret += rt; t.net += Number(v.amount) || 0; t.paid += Number(v.paidAmount) || 0; t.due += d;
      var retNotes = (v.returns || []).map(function (r) { return fmtDate(String(r.date).slice(0, 10)) + ' ' + inr(r.amount) + (r.note ? ' (' + esc(r.note) + ')' : ''); }).join('<br>');
      return '<tr><td>' + fmtDate(dateOf(v)) + '</td><td>' + esc(v.invoiceNo || '—') + '</td><td class="r">' + inr(orig) + '</td><td class="r">' + (rt ? inr(rt) + (retNotes ? '<div class="s">' + retNotes + '</div>' : '') : '—') + '</td><td class="r">' + inr(v.amount) + '</td><td class="r">' + inr(v.paidAmount) + '</td><td>' + (Number(v.paidAmount) > 0 ? fmtDate(String(v.paidAt || '').slice(0, 10)) : '—') + '</td><td>' + esc([v.paymentMode, v.paidRef].filter(Boolean).join(' · ') || '—') + '</td><td class="r"><b>' + (d > 0 ? inr(d) : 'Paid') + '</b></td></tr>';
    }).join('') || '<tr><td colspan="9" style="text-align:center;color:#888">No bills in this period</td></tr>';
    var payTotal = pays.reduce(function (s2, l) { return s2 + Number(l.dr); }, 0);
    var payBody = pays.map(function (l) { return '<tr><td>' + fmtDate(String(l.date).slice(0, 10)) + '</td><td class="r"><b>' + inr(l.dr) + '</b></td><td>' + esc(l.ref || '—') + '</td><td>' + esc(l.narration || '') + '</td></tr>'; }).join('') || '<tr><td colspan="4" style="text-align:center;color:#888">No payments in this period</td></tr>';
    var beforeDue = before.reduce(function (s2, v) { return s2 + due(v); }, 0);
    var credit = creditOf(state.vendor);
    var hosp = ''; try { hosp = getHospitalDetailValue('Hospital Name', 'Baweja Multispeciality Hospital'); } catch (e) { hosp = 'Baweja Multispeciality Hospital'; }
    var cell = function (l, v2) { return '<div class="c"><div class="l">' + l + '</div><div class="v">' + v2 + '</div></div>'; };
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Vendor summary — ' + esc(state.vendor) + '</title><style>body{font-family:Arial,sans-serif;font-size:10.5px;padding:11mm;color:#111}@page{size:A4;margin:0}h1{font-size:15px;margin:0}h2{font-size:13px;margin:2px 0 2px}h3{font-size:11px;text-transform:uppercase;margin:12px 0 4px;color:#1A3C6E}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:4px 6px;text-align:left;vertical-align:top}th{background:#eef1f6;font-size:9.5px;text-transform:uppercase}td.r,th.r{text-align:right}.s{font-size:9px;color:#555}.g{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:10px}.c{border:1px solid #ccc;border-radius:6px;padding:6px 8px}.l{font-size:8.5px;text-transform:uppercase;color:#555;font-weight:700}.v{font-size:13px;font-weight:800;margin-top:2px}tfoot td{font-weight:800;background:#f6f7fa}</style></head><body>'
      + '<h1>' + esc(hosp) + '</h1><h2>Vendor summary: ' + esc(state.vendor) + '</h2><div style="font-size:10px;color:#555">' + esc(label) + ' · Printed ' + fmtDate(todayKey()) + '</div>'
      + '<div class="g">' + cell('Total billed', inr(t.billed)) + cell('Returns', inr(t.ret)) + cell('Net payable', inr(t.net)) + cell('Paid', inr(t.paid)) + cell('Due on these bills', inr(t.due)) + '</div>'
      + (from ? '<div style="margin-top:8px;font-size:11px">Due on bills from before ' + fmtDate(from) + ': <b>' + inr(beforeDue) + '</b>' + (credit > 0 ? ' · Credit with vendor: <b>' + inr(credit) + '</b>' : '') + ' · <b>Total due now: ' + inr(Math.max(0, beforeDue + t.due - credit)) + '</b></div>' : (credit > 0 ? '<div style="margin-top:8px;font-size:11px">Credit with vendor: <b>' + inr(credit) + '</b> · <b>Total due now: ' + inr(Math.max(0, t.due - credit)) + '</b></div>' : ''))
      + '<h3>Bills</h3><table><thead><tr><th>Bill date</th><th>Invoice</th><th class="r">Billed</th><th class="r">Returned</th><th class="r">Net</th><th class="r">Paid</th><th>Paid on</th><th>Mode / Ref no.</th><th class="r">Due</th></tr></thead><tbody>' + body + '</tbody><tfoot><tr><td colspan="2">Total (' + rows.length + ' bills)</td><td class="r">' + inr(t.billed) + '</td><td class="r">' + inr(t.ret) + '</td><td class="r">' + inr(t.net) + '</td><td class="r">' + inr(t.paid) + '</td><td></td><td></td><td class="r">' + inr(t.due) + '</td></tr></tfoot></table>'
      + usagePrint(from, to)
      + '<h3>Payments made</h3><table><thead><tr><th>Date</th><th class="r">Amount</th><th>Mode / Ref no.</th><th>Details</th></tr></thead><tbody>' + payBody + '</tbody><tfoot><tr><td>Total</td><td class="r">' + inr(payTotal) + '</td><td colspan="2"></td></tr></tfoot></table>'
      + '</body></html>';
  };
  function usagePrint(from, to) {
    var u = usageStats(state.vendor); if (!u.any) return '';
    var list = u.used.filter(function (r) { return (!from || r.date >= from) && (!to || r.date <= to); });
    var val = list.reduce(function (t, r) { return t + r.value; }, 0);
    return '<h3>Bill-when-used stock (IOLs / consignment)</h3><div style="font-size:11px;margin-bottom:4px">Used in this period: <b>' + list.length + ' items, ' + inr(val) + '</b> · Running totals now — billed ' + inr(u.billed) + ', used ' + inr(u.usedVal) + ', paid ' + inr(u.paid) + ', <b>due as per usage ' + inr(u.due) + '</b>, stock not yet used ' + inr(u.unused) + '</div>'
      + '<table><thead><tr><th>Date</th><th>Patient</th><th>Item</th><th>Serial / batch</th><th class="r">Qty</th><th class="r">Cost</th></tr></thead><tbody>' + (list.map(function (r) { return '<tr><td>' + fmtDate(r.date) + '</td><td>' + esc(r.patient) + '</td><td>' + esc(r.item) + (r.power ? ' · ' + esc(r.power) + ' D' : '') + '</td><td>' + esc([r.serial, r.batch].filter(Boolean).join(' / ') || '—') + '</td><td class="r">' + r.qty + '</td><td class="r">' + (r.noCost ? 'not entered' : inr(r.value)) + '</td></tr>'; }).join('') || '<tr><td colspan="6" style="text-align:center;color:#888">Nothing used in this period</td></tr>') + '</tbody><tfoot><tr><td colspan="5">Total used</td><td class="r">' + inr(val) + '</td></tr></tfoot></table>';
  }
  window.bmhVendorStmtSummaryPrint = function () {
    var per = (document.querySelector('input[name=vst-per]:checked') || {}).value || 'fy';
    var html = window.bmhVendorStmtSummaryHtml(per, (document.getElementById('vst-from') || {}).value, (document.getElementById('vst-to') || {}).value);
    if (!html) { showToast('Choose both dates', 'w'); return; }
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
        try {
          var us = usageStats(nm.textContent.trim());
          if (us.any && !row.querySelector('.vst-use')) nm.parentNode.insertAdjacentHTML('beforeend', '<div class="vst-use" style="font-size:10.5px;color:#6a1b9a;margin-top:2px">Bill when used: used ' + inr(us.usedVal) + ' · paid ' + inr(us.paid) + ' · <b>due as per usage ' + inr(us.due) + '</b></div>');
        } catch (e) {}
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
      try { if (document.getElementById('vst-ov')) render(); } catch (e) {}
      return r;
    };
  }
  window.bmhVendorStatement = { build: build, fyOf: fyOf, dupIds: dupIds, usageStats: usageStats };
})();
