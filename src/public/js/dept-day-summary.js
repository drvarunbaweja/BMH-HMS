/* BMH — Reception → Charges: per-department day summary print (half A4, two columns).
 * Consultations are shown as counts only (paid / no-fee); investigations, procedures and surgeries are listed with the
 * patient's name and amount; money is split into Cash, UPI / card, cashless (ECHS / TPA) raised and pending dues.
 * One sheet per department, for reconciling with each doctor. Read-only: prints what the Charges screen already holds.
 * Off switch (this browser): localStorage.setItem('bmh_dept_day_print_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_dept_day_print_off') === '1') return; } catch (e) {}
  var DEPTS = [['ophtho', 'Ophthalmology', '👁️ Eye'], ['obg', 'Obstetrics & Gynaecology', '🤰 OBG'], ['psych', 'Neuropsychiatry', '🧠 Psych'], ['skin', 'Skin & Cosmetology', '💆 Skin']];
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function rs(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function dk(v) { try { return normalizeDeptKeyForQueue(v || ''); } catch (e) { return String(v || '').toLowerCase(); } }
  function net(t) { try { return Number(getNetTransactionAmount(t)) || 0; } catch (e) { return Number(t.amount) || 0; } }
  function isIns(t) { try { return !!isInsuranceLikeMode(t.mode || t.ins || ''); } catch (e) { return /insur|tpa|echs|cghs|cashless/i.test(String(t.mode || '')); } }
  function cat(t) {
    try {
      if (transactionHasChargeCategory(t, 'surgery')) return 'surgery';
      if (transactionHasChargeCategory(t, 'diagnostic')) return 'investigation';
      if (transactionHasChargeCategory(t, 'consultation')) return 'consultation';
      var c = inferChargeCategoryFromService(t.service || t.for || t.desc || '');
      if (c === 'surgery') return 'surgery'; if (c === 'diagnostic') return 'investigation'; if (c === 'consultation') return 'consultation';
    } catch (e) {}
    if (t.type === 'due-payment') return 'balance';
    if (t.type === 'advance') return 'advance';
    return 'procedure';
  }
  function build(dept) {
    var day = (typeof todayKey === 'function') ? todayKey() : localDateKey(new Date());
    var centre = (typeof getCollectionViewCentre === 'function') ? getCollectionViewCentre() : '';
    var all = (bmhGetCollectionTransactionsForDate(centre, day) || []).filter(function (t) { return t && dk(t.dept) === dept && t.collected !== false; });
    all = all.filter(function (t) { return !(t.type === 'advance-adjustment' || t.source === 'advance-adjustment'); });
    var cashless = all.filter(isIns), paidRows = all.filter(function (t) { return !isIns(t); });
    var g = { consultation: [], investigation: [], surgery: [], procedure: [], balance: [], advance: [] };
    paidRows.forEach(function (t) { var c = t.type === 'due-payment' ? 'balance' : t.type === 'advance' ? 'advance' : cat(t); (g[c] || g.procedure).push(t); });
    var paidConsult = g.consultation.filter(function (t) { return net(t) > 0; }), freeConsult = g.consultation.filter(function (t) { return net(t) <= 0; });
    var sum = function (a) { return a.reduce(function (s, t) { return s + net(t); }, 0); };
    var cash = sum(paidRows.filter(function (t) { return String(t.mode || '') === 'Cash'; }));
    var upi = sum(paidRows.filter(function (t) { return String(t.mode || '') !== 'Cash'; }));
    var pend = [];
    try { pend = (PAY_REQUESTS || []).filter(function (r) { return r && r.status === 'pending' && dk(getReceptionPayRequestDeptKey ? getReceptionPayRequestDeptKey(r) : r.dept) === dept && isTodayReceptionPayRequest(r, { centre: (typeof getEffectiveCentre === 'function' ? getEffectiveCentre() : centre), today: day }); }); } catch (e) { pend = []; }
    return { day: day, centre: centre, g: g, paidConsult: paidConsult, freeConsult: freeConsult, cashless: cashless, cash: cash, upi: upi, total: sum(paidRows), pend: pend, sum: sum };
  }
  function listBlock(title, rows) {
    if (!rows.length) return '';
    var tot = rows.reduce(function (s, t) { return s + net(t); }, 0);
    return '<div class="blk"><div class="bh"><span>' + esc(title) + ' (' + rows.length + ')</span><span>' + rs(tot) + '</span></div>'
      + rows.map(function (t) { return '<div class="ln"><span class="nm">' + esc(t.patient || t.patientName || '—') + '<i>' + esc(String(t.service || t.for || '').replace(/^Balance payment — /, 'Balance: ')) + (t.billNo ? ' · ' + esc(t.billNo) : '') + '</i></span><span class="md">' + esc(t.mode || '') + '</span><span class="am">' + rs(net(t)) + '</span></div>'; }).join('') + '</div>';
  }
  window.bmhPrintDeptDaySummary = function (dept) {
    var d = DEPTS.filter(function (x) { return x[0] === dept; })[0]; if (!d) return;
    var b; try { b = build(dept); } catch (e) { toast('Could not build the summary: ' + (e && e.message || 'error'), 'w'); return; }
    var nothing = !b.total && !b.cashless.length && !b.pend.length && !b.freeConsult.length;
    if (nothing) { toast('No charges for ' + d[1] + ' today', 'i'); return; }
    var hosp = 'Baweja Multispeciality Hospital';
    try { if (typeof getHospitalDetailValue === 'function') hosp = getHospitalDetailValue('Hospital Name', hosp); } catch (e) {}
    var cTxt = Array.isArray(b.centre) ? b.centre.join(' + ') : String(b.centre || '');
    var dateTxt = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    var cashlessAmt = b.cashless.reduce(function (s, t) { return s + (Number(t.claimedAmount != null ? t.claimedAmount : t.amount) || 0); }, 0);
    var pendAmt = b.pend.reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0);
    var html = '<!doctype html><html><head><meta charset="utf-8"><title>' + esc(d[1]) + ' — day summary</title><style>'
      + '@page{size:A5 portrait;margin:8mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:9.5px;color:#111;margin:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
      + 'h1{font-size:13px;margin:0}.sub{font-size:9.5px;color:#444;margin:1px 0 6px;border-bottom:1.5px solid #111;padding-bottom:4px;display:flex;justify-content:space-between}'
      + '.money{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-bottom:6px}.money div{border:1px solid #999;border-radius:5px;padding:4px 5px;text-align:center}.money b{display:block;font-size:12.5px}.money span{font-size:7.5px;text-transform:uppercase;letter-spacing:.3px;color:#444}'
      + '.cols{column-count:2;column-gap:8px}.blk{break-inside:avoid;margin-bottom:6px;border:1px solid #bbb;border-radius:5px;padding:4px 5px}.bh{display:flex;justify-content:space-between;font-weight:900;font-size:10px;border-bottom:1px solid #bbb;padding-bottom:2px;margin-bottom:2px}'
      + '.ln{display:flex;gap:4px;align-items:baseline;padding:1.5px 0;border-bottom:1px dotted #ddd}.ln:last-child{border-bottom:0}.nm{flex:1;min-width:0;font-weight:700}.nm i{display:block;font-weight:400;font-style:normal;color:#444;font-size:8.5px}.md{font-size:8px;color:#444;white-space:nowrap}.am{font-weight:800;white-space:nowrap}'
      + '.kv{display:flex;justify-content:space-between;padding:1.5px 0}.tot{margin-top:6px;border-top:1.5px solid #111;padding-top:4px;display:flex;justify-content:space-between;font-size:11.5px;font-weight:900}.sig{margin-top:14px;display:flex;justify-content:space-between;font-size:8.5px;color:#444}.sig span{border-top:1px solid #777;padding-top:2px;min-width:38%;text-align:center}'
      + '</style></head><body>'
      + '<h1>' + esc(d[1]) + ' — day summary</h1><div class="sub"><span>' + esc(hosp) + (cTxt ? ' · ' + esc(cTxt) : '') + '</span><span>' + esc(dateTxt) + '</span></div>'
      + '<div class="money"><div><span>Cash</span><b>' + rs(b.cash) + '</b></div><div><span>UPI / card</span><b>' + rs(b.upi) + '</b></div><div><span>Cashless raised</span><b>' + rs(cashlessAmt) + '</b></div><div><span>Pending dues</span><b>' + rs(pendAmt) + '</b></div></div>'
      + '<div class="cols">'
      + '<div class="blk"><div class="bh"><span>Consultations</span><span>' + rs(b.sum(b.paidConsult)) + '</span></div>'
      + '<div class="kv"><span>Paid consultations</span><b>' + b.paidConsult.length + '</b></div><div class="kv"><span>Unpaid / no-fee consultations</span><b>' + b.freeConsult.length + '</b></div></div>'
      + listBlock('Investigations', b.g.investigation) + listBlock('Surgeries & procedures', b.g.surgery) + listBlock('Other charges', b.g.procedure) + listBlock('Balance payments', b.g.balance) + listBlock('Advances', b.g.advance)
      + (b.cashless.length ? '<div class="blk"><div class="bh"><span>Cashless — ECHS / TPA raised (' + b.cashless.length + ')</span><span>' + rs(cashlessAmt) + '</span></div>' + b.cashless.map(function (t) { return '<div class="ln"><span class="nm">' + esc(t.patient || '—') + '<i>' + esc(t.service || t.for || '') + '</i></span><span class="md">' + esc(t.ins || t.mode || '') + '</span><span class="am">' + rs(t.claimedAmount != null ? t.claimedAmount : t.amount) + '</span></div>'; }).join('') + '</div>' : '')
      + (b.pend.length ? '<div class="blk"><div class="bh"><span>Pending dues (' + b.pend.length + ')</span><span>' + rs(pendAmt) + '</span></div>' + b.pend.map(function (r) { return '<div class="ln"><span class="nm">' + esc(r.patient || '—') + '<i>' + esc(r.for || '') + '</i></span><span class="am">' + rs(r.amount) + '</span></div>'; }).join('') + '</div>' : '')
      + '</div>'
      + '<div class="tot"><span>Total collected (cash + UPI / card)</span><span>' + rs(b.total) + '</span></div>'
      + '<div class="sig"><span>Reception</span><span>Doctor</span></div></body></html>';
    var w = window.open('', '_blank', 'width=640,height=820'); if (!w) { toast('Allow pop-ups to print', 'w'); return; }
    w.document.write(html); w.document.close(); setTimeout(function () { try { w.focus(); w.print(); } catch (e) {} }, 400);
  };
  // buttons on the Charges tab, next to the existing print buttons
  function addButtons() {
    if (document.getElementById('ddp-bar')) return;
    var host = document.getElementById('rc-dept-collection'); if (!host || !host.parentNode) return;
    var bar = document.createElement('div'); bar.id = 'ddp-bar';
    bar.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:10px 0 2px;font-size:10px;font-weight:800;color:var(--g1)';
    bar.innerHTML = '<span style="text-transform:uppercase;letter-spacing:.5px">🖨️ Department summary (half A4):</span>' + DEPTS.map(function (d) { return '<button type="button" class="btn btn-xs btn-outline" onclick="bmhPrintDeptDaySummary(\'' + d[0] + '\')">' + d[2] + '</button>'; }).join('');
    host.parentNode.insertBefore(bar, host.nextSibling);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addButtons); else addButtons();
  setTimeout(addButtons, 3000);
})();
