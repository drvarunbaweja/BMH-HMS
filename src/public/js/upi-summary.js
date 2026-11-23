/* BMH — Reception → Charges: "💳 UPI / Online summary" (next to the department summary buttons).
 * Choose a date (or From–To dates, up to 62 days) and a department (or All): lists every UPI / online / card payment —
 * date, time, patient (BMSH ID), department, reason for payment, mode, UPI reference and amount — with totals per
 * department and overall, and prints it (A4). Both centres (Ropar and Chandigarh) are listed, with the centre of each
 * payment; a Centre box can narrow it to one.
 * Cash, no-fee, ECHS / TPA / insurance entries are not included. Read-only.
 * Off switch (this browser): localStorage.setItem('bmh_upi_summary_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_upi_summary_off') === '1') return; } catch (e) {}
  var MAX_DAYS = 62;
  var DEPTS = [['', 'All departments'], ['ophtho', 'Eye'], ['obg', 'OBG'], ['psych', 'Psych'], ['skin', 'Skin']];
  var ONLINE = /upi|g\s*pay|gpay|phone\s*pe|paytm|online|net\s*banking|neft|imps|rtgs|bank|card|debit|credit|pos|qr/i;
  var V = { from: '', to: '', dept: '', rows: [], centre: '' };
  function cKey(t) { var c = String(t.centre || '').trim(); if (!c) return ''; try { return normalizeAppointmentCentreValue(c); } catch (e) { return c.toUpperCase(); } }
  function cName(k) { return k === 'CHD' ? 'Chandigarh' : k === 'RPR' ? 'Ropar' : (k || '—'); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function rs(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function today() { try { return todayKey(); } catch (e) { return ymd(new Date()); } }
  function addDay(k, n) { var p = k.split('-').map(Number); return ymd(new Date(p[0], p[1] - 1, p[2] + n)); }
  function fmtD(k) { var m = String(k || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3] + '/' + m[2] + '/' + m[1] : k; }
  function tm(t) { var v = t.time || ''; if (v) return String(v).slice(0, 5); var d = new Date(t.createdAt || t.ts || t.date); return isNaN(d) ? '' : String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  function dk(v) { try { return normalizeDeptKeyForQueue(v || ''); } catch (e) { var s = String(v || '').toLowerCase(); return /oph|eye/.test(s) ? 'ophtho' : /obg|gyn/.test(s) ? 'obg' : /psych|neuro/.test(s) ? 'psych' : /skin|derm/.test(s) ? 'skin' : s; } }
  function deptName(v) { var k = dk(v); var d = DEPTS.filter(function (x) { return x[0] === k; })[0]; return d ? d[1] : (v || '—'); }
  function isIns(t) { try { return !!isInsuranceLikeMode(t.mode || t.ins || ''); } catch (e) { return /insur|tpa|echs|cghs|cashless|pmjay/i.test(String(t.mode || '')); } }
  function isOnline(t) { var m = String(t.mode || ''); return !!m && !/^cash$/i.test(m) && !/no\s*fee|free/i.test(m) && !isIns(t) && ONLINE.test(m); }
  function amt(t) { try { return Number(getNetTransactionAmount(t)) || 0; } catch (e) { return Number(t.amount) || 0; } }
  function reason(t) {
    var names = [];
    (t.chargeAllocations || []).forEach(function (a) { if (a && (a.desc || a.name)) names.push(String(a.desc || a.name)); });
    var s = names.length ? Array.from(new Set(names)).join(', ') : String(t.service || t.for || t.desc || '');
    if (t.type === 'due-payment' && !/balance/i.test(s)) s = 'Balance payment' + (s ? ' — ' + s : '');
    if (t.type === 'advance' && !/advance/i.test(s)) s = 'Advance' + (s ? ' — ' + s : '');
    return s.replace(/^Balance payment — /, 'Balance: ') || '—';
  }
  function centreWanted() {
    var c = ''; try { c = (typeof getCollectionViewCentre === 'function') ? getCollectionViewCentre() : getEffectiveCentre(); } catch (e) {}
    var list = (Array.isArray(c) ? c : [c]).map(function (x) { var r = String(x || '').trim(); try { return r && !/^(both|all)$/i.test(r) ? normalizeAppointmentCentreValue(r) : ''; } catch (e) { return r.toUpperCase(); } }).filter(Boolean);
    return list;
  }
  function centreOk(t, want) {
    if (!want.length) return true;
    var c = String(t.centre || '').trim(); if (!c) return true;
    try { c = normalizeAppointmentCentreValue(c); } catch (e) { c = c.toUpperCase(); }
    return want.indexOf(c) >= 0;
  }
  function loadDay(day) {
    var b = window.bmhBillsHistory;
    if (b && b.loadDay) return b.loadDay(day, day === today()).catch(function () { return []; });
    try { return Promise.resolve((TRANSACTIONS || []).filter(function (t) { return String(t.date || t.createdAt || '').slice(0, 10) === day; })); } catch (e) { return Promise.resolve([]); }
  }
  function load() {
    var box = document.getElementById('upis-list'); if (!box) return;
    if (!V.from) V.from = today(); if (!V.to || V.to < V.from) V.to = V.from;
    var days = []; for (var k = V.from; k <= V.to && days.length < MAX_DAYS; k = addDay(k, 1)) days.push(k);
    V.over = V.to > days[days.length - 1] ? days[days.length - 1] : '';
    var want = [];
    box.innerHTML = '<div style="padding:16px;text-align:center;color:#777">Loading…</div>';
    var out = [], i = 0;
    var next = function () {
      if (i >= days.length) return Promise.resolve();
      var d = days[i++];
      return loadDay(d).then(function (rows) {
        (rows || []).forEach(function (t) { if (t && isOnline(t) && t.collected !== false && amt(t) > 0 && centreOk(t, want)) out.push(Object.assign({ _d: d }, t)); });
        if (days.length > 3) { var el = document.getElementById('upis-list'); if (el) el.innerHTML = '<div style="padding:16px;text-align:center;color:#777">Loading… ' + i + ' / ' + days.length + ' days</div>'; }
      }).then(next);
    };
    next().then(function () {
      out.sort(function (a, b) { return (a._d + tm(a)).localeCompare(b._d + tm(b)); });
      V.rows = out; draw();
    });
  }
  function shown() { return V.rows.filter(function (t) { return (!V.dept || dk(t.dept) === V.dept) && (!V.centre || cKey(t) === V.centre); }); }
  function tableHtml(rows, print) {
    var multi = V.from !== V.to;
    var byDept = {}; rows.forEach(function (t) { var n = deptName(t.dept); byDept[n] = (byDept[n] || 0) + amt(t); });
    var byC = {}; rows.forEach(function (t) { var n = cName(cKey(t)); byC[n] = (byC[n] || 0) + amt(t); });
    var tot = rows.reduce(function (s, t) { return s + amt(t); }, 0);
    var th = print ? '' : ' style="text-align:left;padding:5px 6px;background:#eef2f7;font-size:11px;position:sticky;top:0"';
    var td = print ? '' : ' style="padding:5px 6px;border-bottom:1px solid #eee;font-size:12px;vertical-align:top"';
    return '<table' + (print ? '' : ' style="width:100%;border-collapse:collapse"') + '><thead><tr>'
      + '<th' + th + '>' + (multi ? 'Date' : 'Time') + '</th><th' + th + '>Patient</th><th' + th + '>Centre</th><th' + th + '>Dept</th><th' + th + '>Reason for payment</th><th' + th + '>Mode / Ref</th><th' + th + ' class="r">Amount</th></tr></thead><tbody>'
      + rows.map(function (t) {
        return '<tr><td' + td + '>' + (multi ? esc(fmtD(t._d).slice(0, 5)) + ' ' : '') + esc(tm(t)) + '</td><td' + td + '><b>' + esc(t.patient || t.patientName || '—') + '</b><br><span class="mut">' + esc(t.bmhId || '') + '</span></td><td' + td + '>' + esc(cName(cKey(t))) + '</td><td' + td + '>' + esc(deptName(t.dept)) + '</td><td' + td + '>' + esc(reason(t)) + (t.billNo ? ' <span class="mut">· ' + esc(t.billNo) + '</span>' : '') + '</td><td' + td + '>' + esc(t.mode || '') + (t.paymentRef ? '<br><span class="mut">' + esc(t.paymentRef) + '</span>' : '') + '</td><td' + td + ' class="r" style="text-align:right;padding:5px 6px;border-bottom:1px solid #eee;font-size:12px;font-weight:800">' + rs(amt(t)) + '</td></tr>';
      }).join('') + '</tbody></table>'
      + '<div class="tots" style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;font-size:12px">' + Object.keys(byDept).sort().map(function (n) { return '<span style="border:1px solid #ccc;border-radius:6px;padding:3px 8px">' + esc(n) + ': <b>' + rs(byDept[n]) + '</b></span>'; }).join('')
      + Object.keys(byC).sort().map(function (n) { return '<span style="border:1px solid #9bb;border-radius:6px;padding:3px 8px;background:#f2f8f8">' + esc(n) + ': <b>' + rs(byC[n]) + '</b></span>'; }).join('') + '<span style="border:1.5px solid #111;border-radius:6px;padding:3px 8px;margin-left:auto">Total UPI / online (' + rows.length + '): <b>' + rs(tot) + '</b></span></div>';
  }
  function draw() {
    var box = document.getElementById('upis-list'); if (!box) return;
    var rows = shown();
    box.innerHTML = (V.over ? '<div style="font-size:12px;color:#b45309;margin-bottom:6px">Up to ' + MAX_DAYS + ' days at a time — shown to ' + esc(fmtD(V.over)) + '.</div>' : '')
      + (rows.length ? tableHtml(rows, false).replace(/class="mut"/g, 'style="color:#777;font-size:10.5px"') : '<div style="padding:16px;text-align:center;color:#777">No UPI / online payments for these dates' + (V.dept ? ' in ' + esc(deptName(V.dept)) : '') + '.</div>');
  }
  function printNow() {
    var rows = shown(); if (!rows.length) { toast('Nothing to print', 'i'); return; }
    var hosp = 'Baweja Multispeciality Hospital'; try { if (typeof getHospitalDetailValue === 'function') hosp = getHospitalDetailValue('Hospital Name', hosp); } catch (e) {}
    var title = 'UPI / Online payments — ' + (V.dept ? deptName(V.dept) : 'All departments');
    var when = V.from === V.to ? fmtD(V.from) : fmtD(V.from) + ' to ' + fmtD(V.over || V.to);
    var html = '<!doctype html><html><head><meta charset="utf-8"><title>' + esc(title) + '</title><style>@page{size:A4 portrait;margin:10mm}body{font-family:Arial,sans-serif;font-size:10.5px;color:#111;margin:0}'
      + 'h1{font-size:14px;margin:0}.sub{display:flex;justify-content:space-between;border-bottom:1.5px solid #111;padding-bottom:4px;margin:2px 0 8px;font-size:10.5px;color:#333}'
      + 'table{width:100%;border-collapse:collapse}th{background:#eef2f7;border:1px solid #999;padding:4px 5px;text-align:left;font-size:10px}td{border:1px solid #bbb;padding:3px 5px;vertical-align:top}.r{text-align:right;white-space:nowrap}.mut{color:#555;font-size:9px}'
      + '.sig{margin-top:18px;display:flex;justify-content:space-between;font-size:10px}</style></head><body>'
      + '<h1>' + esc(title) + '</h1><div class="sub"><span>' + esc(hosp) + ' · ' + esc(V.centre ? cName(V.centre) : 'Ropar + Chandigarh') + '</span><span>' + esc(when) + '</span></div>'
      + tableHtml(rows, true) + '<div class="sig"><span>Reception</span><span>Checked by</span></div>'
      + '<div style="font-size:8.5px;color:#666;margin-top:6px">Printed ' + esc(new Date().toLocaleString('en-IN')) + ' · ' + esc(((window.CURRENT_USER || {}).name) || '') + '</div></body></html>';
    var w = window.open('', '_blank', 'width=900,height=900'); if (!w) { toast('Allow pop-ups to print', 'w'); return; }
    w.document.write(html); w.document.close(); setTimeout(function () { try { w.focus(); w.print(); } catch (e) {} }, 400);
  }
  window.bmhUpiSummaryOpen = function () {
    var old = document.getElementById('upis-ov'); if (old) old.remove();
    if (!V.from) { V.from = today(); V.to = V.from; }
    var ov = document.createElement('div'); ov.id = 'upis-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4600;background:rgba(10,20,40,.45);display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow:auto';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;width:min(980px,100%);padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><div style="flex:1;font-size:15px;font-weight:900;color:#1a3c6e">💳 UPI / Online payment summary</div><button type="button" class="btn btn-xs btn-gray" id="upis-x">✕</button></div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:end;margin-bottom:10px">'
      + '<label style="font-size:11px;font-weight:800;color:#555">From<br><input type="date" id="upis-from" value="' + esc(V.from) + '"></label>'
      + '<label style="font-size:11px;font-weight:800;color:#555">To<br><input type="date" id="upis-to" value="' + esc(V.to) + '"></label>'
      + '<label style="font-size:11px;font-weight:800;color:#555">Department<br><select id="upis-dept">' + DEPTS.map(function (d) { return '<option value="' + d[0] + '"' + (d[0] === V.dept ? ' selected' : '') + '>' + d[1] + '</option>'; }).join('') + '</select></label>'
      + '<label style="font-size:11px;font-weight:800;color:#555">Centre<br><select id="upis-centre"><option value="">Both centres</option><option value="RPR"' + (V.centre === 'RPR' ? ' selected' : '') + '>Ropar</option><option value="CHD"' + (V.centre === 'CHD' ? ' selected' : '') + '>Chandigarh</option></select></label>'
      + '<button type="button" class="btn btn-gold btn-sm" id="upis-print" style="margin-left:auto">🖨️ Print</button></div>'
      + '<div id="upis-list" style="max-height:62vh;overflow:auto"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
    ov.querySelector('#upis-x').onclick = function () { ov.remove(); };
    ov.querySelector('#upis-from').onchange = function () { V.from = this.value || today(); if (V.to < V.from) { V.to = V.from; ov.querySelector('#upis-to').value = V.to; } load(); };
    ov.querySelector('#upis-to').onchange = function () { V.to = this.value < V.from ? V.from : this.value; this.value = V.to; load(); };
    ov.querySelector('#upis-dept').onchange = function () { V.dept = this.value; draw(); };
    ov.querySelector('#upis-centre').onchange = function () { V.centre = this.value; draw(); };
    ov.querySelector('#upis-print').onclick = printNow;
    load();
  };
  function addButton() {
    if (document.getElementById('upis-btn')) return true;
    var bar = document.getElementById('ddp-bar'); if (!bar) return false;
    var b = document.createElement('button'); b.type = 'button'; b.id = 'upis-btn'; b.className = 'btn btn-xs btn-gold';
    b.textContent = '💳 UPI / Online summary'; b.onclick = window.bmhUpiSummaryOpen; b.style.marginLeft = '6px';
    bar.appendChild(b); return true;
  }
  var n = 0; (function tick() { if (addButton()) return; if (++n < 60) setTimeout(tick, 1500); })();
  new MutationObserver(function () { if (!document.getElementById('upis-btn')) addButton(); }).observe(document.documentElement, { childList: true, subtree: true });
})();
