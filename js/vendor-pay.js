/* BMH — Vendor payments (Billing / Inventory → Vendors only).
 *  • "Part payment / vendor total", "Pay selected bills" and a bill's "Pay" open one pop-up instead of the one-line boxes:
 *      – amount, mode, UTR / cheque no., payment date;
 *      – "Clear oldest bills first" goes by INVOICE DATE (the bill's invoice date if entered, else its bill date),
 *        oldest first; opening balances come first. Or "Choose bills" to tick the bills yourself;
 *      – a preview of what the amount clears (paid / partly paid / remaining due) before anything is saved;
 *      – each bill's invoice date can be corrected in the pop-up (saved with the payment);
 *      – vendors with "bill when used" (IOL / consignment) bills: a tick box decides whether the payment may clear them.
 *  • Paying more than is due keeps the extra as an ADVANCE with that vendor (saved at vendorAdvances/<vendor>). The
 *    advance is shown in the vendor list and offered ("Use advance") the next time that vendor is paid.
 *  • Every payment is kept on the bill it cleared (date, amount, mode, ref, who) — shown under the selected bill.
 *  Only vendor bills, vendor payments and the matching ledger line are touched; patient billing / reception are not.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function inr(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function bills() { return window.BMH_VENDOR_BILLS || []; }
  function out(v) { try { return bmhVendorBillOutstanding(v); } catch (e) { return Math.max(0, (Number(v && v.amount) || 0) - (Number(v && v.paidAmount) || 0)); } }
  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) { return ''; } }
  function canon(name) { var n = String(name || '').trim(); try { if (typeof window.bmhVendorCanonical === 'function') n = String(window.bmhVendorCanonical(n) || n).trim(); } catch (e) {} return n; }
  function same(a, b) { return canon(a).replace(/\s+/g, ' ').toLowerCase() === canon(b).replace(/\s+/g, ' ').toLowerCase(); }
  function vkey(name) { return String(name || '').trim().replace(/\s+/g, ' ').toLowerCase().replace(/[.#$\[\]\/]/g, '_') || '_'; }
  function invDate(v) { return String((v && (v.invoiceDate || v.billDateKey || v.createdAt)) || '').slice(0, 10); }
  function orderKey(v) { return (v.opening ? '0' : '1') + (invDate(v) || '9999-99-99') + String(v.createdAt || ''); }
  function onUse(v) { return v && (v.billMode === 'on-use' || v.usageLinked); }
  function rerender() {
    try { bmhRenderVendorTables(); } catch (e) {}
    try { if (typeof renderBillingPageIfActive === 'function') renderBillingPageIfActive(); else if (typeof renderBillingPage === 'function') renderBillingPage(); } catch (e) {}
  }

  // ── payment history on each bill (covers every way a vendor bill gets paid) ──
  var meta = null; // { date, payId } set while this pop-up records a payment
  var origApply = window.bmhApplyVendorPaymentToBills;
  if (typeof origApply === 'function') {
    window.bmhApplyVendorPaymentToBills = function (rows, amount, mode, ref) {
      var before = (rows || []).map(function (v) { return Number(v && v.paidAmount) || 0; });
      var left = origApply.apply(this, arguments);
      try {
        var m = meta || {}, at = new Date().toISOString();
        (rows || []).forEach(function (v, i) {
          var got = (Number(v && v.paidAmount) || 0) - before[i];
          if (!(got > 0)) return;
          if (!Array.isArray(v.payments)) v.payments = [];
          v.payments.push({ amount: Math.round(got * 100) / 100, date: m.date || at.slice(0, 10), at: at, mode: mode || '', ref: ref || '', by: who(), payId: m.payId || '' });
          if (m.date) v.paidAt = m.date + 'T' + at.slice(11);
        });
      } catch (e) {}
      return left;
    };
  }

  // ── advances (vendorAdvances/<vendor>/entries) ──
  var ADV = {};
  // advances of merged / differently written names of the same vendor count together
  function advBalance(vendor) {
    var t = 0;
    Object.keys(ADV).forEach(function (k) { var a = ADV[k]; if (!a || !a.entries || !same(a.vendor || k, vendor)) return; Object.keys(a.entries).forEach(function (e) { t += Number(a.entries[e].amount) || 0; }); });
    return Math.max(0, Math.round(t * 100) / 100);
  }
  window.bmhVendorAdvance = advBalance;
  function advAdd(vendor, amount, info) {
    vendor = canon(vendor);
    var k = vkey(vendor), id = 'A' + Date.now() + Math.random().toString(36).slice(2, 5);
    var e = Object.assign({ amount: Math.round(amount * 100) / 100, at: new Date().toISOString(), by: who() }, info || {});
    ADV[k] = ADV[k] || { vendor: vendor, entries: {} }; ADV[k].vendor = vendor; ADV[k].entries = ADV[k].entries || {}; ADV[k].entries[id] = e;
    try { if (window.FBDB) { var u = {}; u['vendor'] = vendor; u['entries/' + id] = e; window.FBDB.ref('vendorAdvances/' + k).update(u).catch(function (er) { console.warn('[vendor-pay] advance save', er); }); } } catch (er) {}
  }
  var advOn = false;
  function listenAdv() {
    if (advOn || !window.FBDB) return advOn;
    advOn = true;
    window.FBDB.ref('vendorAdvances').on('value', function (s) { ADV = s.val() || {}; try { decorate(); } catch (e) {} }, function () {});
    return true;
  }
  if (!listenAdv()) { var ln = 0, liv = setInterval(function () { if (listenAdv() || ++ln > 120) clearInterval(liv); }, 1000); }

  // ── the pop-up ──
  var S = null;
  function openPay(opts) {
    var vendor = String(opts.vendor || '').trim();
    if (!vendor) { toast('Choose the vendor first', 'w'); return; }
    var rows = bills().filter(function (v) { return same(v.vendor, vendor) && out(v) > 0; });
    if (rows.length) { var cnt = {}; rows.forEach(function (v) { var n = String(v.vendor || '').trim(); cnt[n] = (cnt[n] || 0) + 1; }); vendor = Object.keys(cnt).sort(function (x, y) { return cnt[y] - cnt[x]; })[0] || vendor; }
    var adv = advBalance(vendor);
    if (!rows.length) { toast('No pending bills for ' + vendor + (adv > 0 ? ' (advance ' + inr(adv) + ' kept)' : ''), 'i'); return; }
    var picked = {}; (opts.ids || []).forEach(function (id) { picked[id] = true; });
    var hasUse = rows.some(onUse), hasReg = rows.some(function (v) { return !onUse(v); });
    S = { vendor: vendor, rows: rows, picked: picked, mode: (opts.ids && opts.ids.length) ? 'choose' : 'oldest', dates: {}, adv: adv, useAdv: adv > 0,
      incUse: !(hasUse && hasReg) || (opts.ids || []).some(function (id) { var b = rows.find(function (v) { return v.id === id; }); return b && onUse(b); }), hasUse: hasUse && hasReg };
    var total = S.mode === 'choose' ? rows.filter(function (v) { return picked[v.id]; }).reduce(function (s, v) { return s + out(v); }, 0) : rows.filter(function (v) { return S.incUse || !onUse(v); }).reduce(function (s, v) { return s + out(v); }, 0);
    var amt0 = Math.max(0, Math.round((total - (S.useAdv ? adv : 0)) * 100) / 100);
    var old = document.getElementById('vp-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'vp-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4900;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:12px';
    var inp = 'padding:7px 8px;border:1px solid #cfd6e2;border-radius:8px;font-size:13px;box-sizing:border-box;width:100%';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:760px;width:100%;max-height:92vh;display:flex;flex-direction:column;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="padding:14px 16px 8px;border-bottom:1px solid #eef0f4"><div style="font-size:15px;font-weight:900">💳 Pay ' + esc(vendor) + '</div>'
      + '<div style="font-size:11.5px;color:#555;margin-top:2px">Due ' + inr(rows.reduce(function (s, v) { return s + out(v); }, 0)) + ' on ' + rows.length + ' bill' + (rows.length === 1 ? '' : 's') + (adv > 0 ? ' · <b style="color:#1a8c3c">Advance with vendor ' + inr(adv) + '</b>' : '') + '</div></div>'
      + '<div style="padding:10px 16px;overflow:auto">'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:8px">'
      + '<label style="font-size:11px;font-weight:800;color:#555">Amount paid now ₹<input id="vp-amt" type="number" min="0" step="0.01" value="' + amt0 + '" style="' + inp + ';margin-top:3px"></label>'
      + '<label style="font-size:11px;font-weight:800;color:#555">Mode<select id="vp-mode" style="' + inp + ';margin-top:3px">' + ['Bank Transfer', 'NEFT', 'RTGS', 'UPI', 'Cheque', 'Cash'].map(function (m) { return '<option>' + m + '</option>'; }).join('') + '</select></label>'
      + '<label style="font-size:11px;font-weight:800;color:#555">UTR / cheque no.<input id="vp-ref" type="text" style="' + inp + ';margin-top:3px"></label>'
      + '<label style="font-size:11px;font-weight:800;color:#555">Payment date<input id="vp-date" type="date" value="' + today() + '" max="' + today() + '" style="' + inp + ';margin-top:3px"></label></div>'
      + (adv > 0 ? '<label style="display:flex;gap:6px;align-items:center;font-size:12.5px;margin:2px 0 6px"><input type="checkbox" id="vp-useadv" checked> Also use the advance with vendor (' + inr(adv) + ')</label>' : '')
      + (S.hasUse ? '<label style="display:flex;gap:6px;align-items:flex-start;font-size:12.5px;margin:2px 0 6px"><input type="checkbox" id="vp-incuse"' + (S.incUse ? ' checked' : '') + ' style="margin-top:2px"> <span>Include “bill when used” (IOL / consignment) bills<br><span style="font-size:11px;color:#777">Leave unticked to pay only the regular bills. To pay for lenses actually used, use “Pay as per usage” in the vendor statement.</span></span></label>' : '')
      + '<div style="display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px;font-weight:800;margin:4px 0 6px"><label><input type="radio" name="vp-m" value="oldest"' + (S.mode === 'oldest' ? ' checked' : '') + '> Clear oldest bills first (by invoice date)</label><label><input type="radio" name="vp-m" value="choose"' + (S.mode === 'choose' ? ' checked' : '') + '> Choose bills</label></div>'
      + '<div id="vp-table"></div><div id="vp-sum" style="margin-top:8px;font-size:12.5px"></div></div>'
      + '<div style="padding:10px 16px;border-top:1px solid #eef0f4;display:flex;justify-content:flex-end;gap:8px"><button type="button" class="btn btn-gray btn-sm" id="vp-x">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="vp-ok">Record payment</button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#vp-x').onclick = function () { ov.remove(); S = null; };
    ['vp-amt'].forEach(function (id) { ov.querySelector('#' + id).oninput = draw; });
    var ua = ov.querySelector('#vp-useadv'); if (ua) ua.onchange = function () { S.useAdv = ua.checked; draw(); };
    var iu = ov.querySelector('#vp-incuse'); if (iu) iu.onchange = function () { S.incUse = iu.checked; draw(); };
    Array.prototype.forEach.call(ov.querySelectorAll('input[name="vp-m"]'), function (r) { r.onchange = function () { S.mode = r.value; draw(); }; });
    ov.querySelector('#vp-ok').onclick = commit;
    draw();
  }
  function plan() {
    var amt = Math.max(0, Number((document.getElementById('vp-amt') || {}).value) || 0);
    var avail = Math.round((amt + (S.useAdv ? S.adv : 0)) * 100) / 100;
    var list = S.rows.filter(function (v) { return S.incUse || !onUse(v) || (S.mode === 'choose' && S.picked[v.id]); })
      .map(function (v) { return { v: v, date: S.dates[v.id] != null ? S.dates[v.id] : invDate(v) }; })
      .sort(function (a, b) { var ka = (a.v.opening ? '0' : '1') + (a.date || '9999') + String(a.v.createdAt || ''), kb = (b.v.opening ? '0' : '1') + (b.date || '9999') + String(b.v.createdAt || ''); return ka < kb ? -1 : ka > kb ? 1 : 0; });
    var left = avail;
    list.forEach(function (r) {
      r.due = out(r.v); r.on = S.mode === 'oldest' || !!S.picked[r.v.id];
      r.apply = r.on ? Math.min(r.due, Math.max(0, left)) : 0; r.apply = Math.round(r.apply * 100) / 100; left = Math.round((left - r.apply) * 100) / 100;
    });
    // the advance is used first; whatever of today's amount is not needed for the bills becomes a new advance
    var applied = Math.round((avail - left) * 100) / 100;
    var advUsed = S.useAdv ? Math.min(S.adv, applied) : 0;
    var extra = Math.max(0, Math.round((amt - Math.max(0, applied - advUsed)) * 100) / 100);
    return { amt: amt, avail: avail, list: list, extra: extra, advUsed: advUsed };
  }
  function draw() {
    if (!S) return;
    var p = plan(), tb = document.getElementById('vp-table'), sm = document.getElementById('vp-sum');
    var th = 'padding:5px 6px;text-align:left;font-size:10.5px;color:#666;border-bottom:1px solid #e3e6ee';
    tb.innerHTML = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>' + (S.mode === 'choose' ? '<th style="' + th + '"></th>' : '') + '<th style="' + th + '">Invoice</th><th style="' + th + '">Invoice date</th><th style="' + th + ';text-align:right">Due</th><th style="' + th + ';text-align:right">This payment</th><th style="' + th + '">After</th></tr></thead><tbody>'
      + p.list.map(function (r) {
        var after = r.apply <= 0 ? (r.on ? 'unpaid' : '—') : (r.apply >= r.due - 0.005 ? '<b style="color:#1a8c3c">paid</b>' : '<b style="color:#b55a00">part paid · ' + inr(r.due - r.apply) + ' due</b>');
        return '<tr style="border-bottom:1px solid #f0f2f6' + (r.apply > 0 ? ';background:#f3fbf5' : '') + '">'
          + (S.mode === 'choose' ? '<td style="padding:4px 6px"><input type="checkbox" data-pick="' + esc(r.v.id) + '"' + (S.picked[r.v.id] ? ' checked' : '') + '></td>' : '')
          + '<td style="padding:4px 6px"><div style="font-weight:800">' + esc(r.v.invoiceNo || 'No invoice') + '</div><div style="font-size:10.5px;color:#777">' + inr(r.v.amount) + (onUse(r.v) ? ' · bill when used' : '') + (r.v.opening ? ' · opening balance' : '') + '</div></td>'
          + '<td style="padding:4px 6px">' + (r.v.opening ? esc(r.date) : '<input type="date" data-date="' + esc(r.v.id) + '" value="' + esc(r.date) + '" style="padding:3px 4px;border:1px solid #cfd6e2;border-radius:6px;font-size:12px">') + '</td>'
          + '<td style="padding:4px 6px;text-align:right">' + inr(r.due) + '</td><td style="padding:4px 6px;text-align:right;font-weight:800">' + (r.apply > 0 ? inr(r.apply) : '—') + '</td><td style="padding:4px 6px">' + after + '</td></tr>';
      }).join('') + '</tbody></table>';
    Array.prototype.forEach.call(tb.querySelectorAll('[data-pick]'), function (c) { c.onchange = function () { S.picked[c.getAttribute('data-pick')] = c.checked; draw(); }; });
    Array.prototype.forEach.call(tb.querySelectorAll('[data-date]'), function (c) { c.onchange = function () { S.dates[c.getAttribute('data-date')] = c.value; draw(); }; });
    var full = p.list.filter(function (r) { return r.apply > 0 && r.apply >= r.due - 0.005; }).length, part = p.list.filter(function (r) { return r.apply > 0 && r.apply < r.due - 0.005; }).length;
    var applied = p.list.reduce(function (s, r) { return s + r.apply; }, 0);
    var remaining = S.rows.reduce(function (s, v) { return s + out(v); }, 0) - applied;
    sm.innerHTML = (p.avail > 0 ? inr(applied) + ' clears <b>' + full + '</b> bill' + (full === 1 ? '' : 's') + (part ? ' fully and <b>1</b> partly' : '') : 'Enter the amount paid')
      + (p.advUsed > 0 ? ' (including ' + inr(p.advUsed) + ' from the advance)' : '') + ' · remaining due with ' + esc(S.vendor) + ' <b>' + inr(remaining) + '</b>'
      + (p.extra > 0 ? '<div style="margin-top:4px;color:#1a8c3c;font-weight:800">' + inr(p.extra) + ' is more than ' + (S.mode === 'choose' ? 'the chosen bills' : 'the bills') + ' due — it will be kept as an advance with ' + esc(S.vendor) + ' and offered next time.</div>' : '')
      + (S.mode === 'choose' && !p.list.some(function (r) { return r.on; }) ? '<div style="margin-top:4px;color:#b55a00">Tick the bills to pay.</div>' : '');
  }
  function commit() {
    if (!S) return;
    var p = plan();
    if (!(p.amt > 0) && !(p.advUsed > 0)) { toast('Enter the amount paid', 'w'); return; }
    if (S.mode === 'choose' && !p.list.some(function (r) { return r.on; }) && p.amt > 0 && !confirm('No bills are ticked. Keep the whole ' + inr(p.amt) + ' as an advance with ' + S.vendor + '?')) return;
    var mode = document.getElementById('vp-mode').value, ref = String(document.getElementById('vp-ref').value || '').trim(), date = document.getElementById('vp-date').value || today();
    var applied = p.list.filter(function (r) { return r.apply > 0; });
    var msg = 'Record ' + inr(p.amt) + ' paid to ' + S.vendor + ' (' + mode + (ref ? ' · ' + ref : '') + ', ' + date + ')?\n\n'
      + applied.map(function (r) { return '• ' + (r.v.invoiceNo || 'Bill') + ' (' + (r.date || 'no date') + '): ' + inr(r.apply) + (r.apply >= r.due - 0.005 ? ' → paid' : ' → part paid'); }).join('\n')
      + (p.advUsed > 0 ? '\n\nAdvance used: ' + inr(p.advUsed) : '') + (p.extra > 0 ? '\nKept as advance: ' + inr(p.extra) : '');
    if (!confirm(msg)) return;
    var payId = 'VP' + Date.now();
    // invoice dates corrected in the pop-up
    Object.keys(S.dates).forEach(function (id) { var b = S.rows.find(function (v) { return v.id === id; }); if (b && S.dates[id] && S.dates[id] !== invDate(b)) { b.invoiceDate = S.dates[id]; b.updatedAt = new Date().toISOString(); } });
    meta = { date: date, payId: payId };
    try { applied.forEach(function (r) { window.bmhApplyVendorPaymentToBills([r.v], r.apply, mode, ref); }); } finally { meta = null; }
    if (p.advUsed > 0) advAdd(S.vendor, -p.advUsed, { note: 'Used against bills', payId: payId, date: date, bills: applied.map(function (r) { return r.v.invoiceNo || r.v.id; }).join(', ') });
    if (p.extra > 0) advAdd(S.vendor, p.extra, { note: 'Paid more than due', payId: payId, date: date, mode: mode, ref: ref });
    if (p.amt > 0) {
      var nar = (S.mode === 'choose' ? 'Vendor bills — ' + applied.map(function (r) { return r.v.invoiceNo || 'Bill'; }).join(', ') : 'Vendor account clearance — ' + S.vendor) + (p.extra > 0 ? ' (' + inr(p.extra) + ' kept as advance)' : '');
      try { bmhAppendLedger({ date: date + 'T' + new Date().toISOString().slice(11), type: 'Payment', narration: nar, dr: p.amt, cr: 0, party: S.vendor, ref: (mode ? mode + ' · ' : '') + ref }); } catch (e) { console.warn(e); }
    }
    try { saveBmhFinancials(); } catch (e) {}
    var v = S.vendor;
    document.getElementById('vp-ov').remove(); S = null;
    rerender();
    toast('Payment recorded ✓' + (p.extra > 0 ? ' — ' + inr(p.extra) + ' kept as advance with ' + v : ''), 's');
  }

  // ── buttons ──
  function vendorFromFilter() { return String((document.getElementById('inv-vendor-filter') || {}).value || '').trim(); }
  window.bmhPayVendorOutstanding = function (vendorName) {
    var vendor = String(vendorName || '').trim() || vendorFromFilter();
    if (!vendor) { toast('Choose the vendor first (vendor filter)', 'w'); return; }
    openPay({ vendor: vendor });
  };
  window.bmhPaySelectedVendorBills = function () {
    var ids = []; try { ids = bmhSelectedVendorBillIds(); } catch (e) {}
    if (!ids.length) { toast('Select bills first', 'w'); return; }
    var rows = bills().filter(function (v) { return ids.indexOf(String(v.id || '')) >= 0; });
    var vendors = []; rows.forEach(function (v) { var n = String(v.vendor || '').trim(); if (n && !vendors.some(function (x) { return same(x, n); })) vendors.push(n); });
    if (vendors.length > 1) { toast('Selected bills are from ' + vendors.length + ' vendors — pay one vendor at a time', 'w'); return; }
    openPay({ vendor: vendors[0], ids: ids });
  };
  window.bmhMarkVendorPaid = function (id) {
    var v = bills().find(function (x) { return x.id === id; }); if (!v) return;
    openPay({ vendor: v.vendor, ids: [id] });
  };

  // ── show advances and payment history in the vendor screens ──
  function decorate() {
    var names = {};
    bills().forEach(function (v) { var n = String(v.vendor || '').trim(); if (n) names[n] = 1; });
    Object.keys(ADV).forEach(function (k) { if (ADV[k] && ADV[k].vendor) names[ADV[k].vendor] = 1; });
    ['bmh-vendor-table', 'inv-vendor-table', 'inv-vendor-summary'].forEach(function (id) {
      var el = document.getElementById(id); if (!el) return;
      Array.prototype.forEach.call(el.querySelectorAll('strong'), function (st) {
        var n = st.textContent.trim(), a = names[n] ? advBalance(n) : 0;
        var tag = st.parentNode.querySelector('.vp-adv');
        if (a > 0) { if (!tag) { tag = document.createElement('span'); tag.className = 'vp-adv'; tag.style.cssText = 'margin-left:6px;font-size:10.5px;font-weight:800;color:#1a8c3c;background:#e8f6ec;border-radius:8px;padding:1px 6px'; st.after(tag); } tag.textContent = 'Advance ' + inr(a); }
        else if (tag) tag.remove();
      });
    });
    var det = document.getElementById('inv-vendor-detail'), sel = window._bmhVendorBillSel;
    if (det && sel && !det.querySelector('.vp-hist')) {
      var v = bills().find(function (x) { return x.id === sel; });
      if (v) {
        var box = document.createElement('div'); box.className = 'vp-hist'; box.style.cssText = 'padding:0 12px 12px;font-size:11.5px';
        var pays = Array.isArray(v.payments) ? v.payments : [];
        var a = advBalance(v.vendor);
        box.innerHTML = '<div style="font-size:11px;font-weight:900;color:var(--g1,#666);text-transform:uppercase;margin-bottom:4px">Invoice date: ' + esc(invDate(v) || '—') + (v.invoiceDate ? '' : ' <span style="font-weight:600;text-transform:none">(bill date)</span>') + ' <button type="button" class="btn btn-xs btn-outline" style="margin-left:6px" id="vp-setdate">Set invoice date</button></div>'
          + '<div style="font-size:11px;font-weight:900;color:var(--g1,#666);text-transform:uppercase;margin:8px 0 4px">Payments on this bill</div>'
          + (pays.length ? pays.map(function (p) { return '<div style="display:flex;justify-content:space-between;gap:8px;padding:3px 0;border-bottom:1px solid #f0f2f6"><span>' + esc(p.date || '') + ' · ' + esc(p.mode || '') + (p.ref ? ' · ' + esc(p.ref) : '') + (p.by ? ' · ' + esc(p.by) : '') + '</span><b>' + inr(p.amount) + '</b></div>'; }).join('')
            : '<div style="color:#777">' + ((Number(v.paidAmount) || 0) > 0 ? inr(v.paidAmount) + ' paid earlier' + (v.paidRef ? ' (last ref ' + esc(v.paidRef) + ')' : '') + ' — before payment history was kept' : 'No payments yet') + '</div>')
          + (a > 0 ? '<div style="margin-top:6px;color:#1a8c3c;font-weight:800">Advance with ' + esc(v.vendor) + ': ' + inr(a) + '</div>' : '');
        det.appendChild(box);
        box.querySelector('#vp-setdate').onclick = function () {
          var d = prompt('Invoice date of ' + (v.invoiceNo || 'this bill') + ' (YYYY-MM-DD)', invDate(v)); if (d === null) return;
          d = String(d).trim(); if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) { toast('Use the format YYYY-MM-DD', 'w'); return; }
          v.invoiceDate = d; v.updatedAt = new Date().toISOString();
          try { saveBmhFinancials(); } catch (e) {}
          rerender(); toast('Invoice date saved ✓', 's');
        };
      }
    }
  }
  var origRender = window.bmhRenderVendorTables;
  if (typeof origRender === 'function') {
    window.bmhRenderVendorTables = function () { var r = origRender.apply(this, arguments); try { decorate(); } catch (e) {} return r; };
  }
})();
