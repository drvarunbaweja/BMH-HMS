/* BMH — Settings → Reports → 💸 Pending Dues: every amount still owed, not only today's.
 *   1. TPA / Cashless dues — every open insurance / ECHS / CGHS / PMJAY / cashless claim (pending or part-received, any
 *      date). The total and each claim open the TPA / Cashless screen.
 *   2. Patients who owe the hospital — balances left on saved bills (any date), per patient with each bill. Clicking a
 *      patient opens Billing for that patient, where the balance can be collected.
 *   3. Charges sent to reception and not collected yet (any date) — as before, with Delete.
 * Centre filter (Reports → centre) applies. Reads only; writes nothing (Delete is the existing button).
 * Off switch (this browser): localStorage.setItem('bmh_pending_dues_report_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_pending_dues_report_off') === '1') return; } catch (e) {}
  var orig = window.generatePendingDuesReport;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ja(s) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
  function rs(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function num(v) { var n = Number(v); return isFinite(n) ? n : 0; }
  function cen(v) { try { return normalizeAppointmentCentreValue(v || 'CHD'); } catch (e) { return String(v || 'CHD').toUpperCase(); } }
  function fd(v) { try { return formatDateIN(v) || ''; } catch (e) { return String(v || '').slice(0, 10); } }
  function dl(d) { return ({ ophtho: 'Eye', obg: 'OBG', psych: 'Neuropsychiatry', skin: 'Skin' })[String(d || '').toLowerCase()] || d || ''; }
  function insLike(v) { try { return isInsuranceLikeMode(v); } catch (e) { return /Insurance|TPA|PMJAY|CGHS|ECHS|Ayushman|Cashless|Star Health/i.test(String(v || '')); } }
  function pt(id) { try { return (PATIENTS || []).find(function (p) { return p && p.bmhId === id; }) || null; } catch (e) { return null; } }
  var OLDREQ = null, oldLoading = false;
  function loadOldRequests(cb) {
    if (OLDREQ || oldLoading || !window.FBDB) return;
    oldLoading = true;
    window.FBDB.ref('payRequests').orderByChild('status').equalTo('pending').once('value').then(function (s) {
      var v = s.val() || {}; OLDREQ = Object.keys(v).map(function (k) { var r = v[k] || {}; r.id = r.id || k; return r; }); oldLoading = false; cb();
    }).catch(function () { oldLoading = false; OLDREQ = []; cb(); });
  }
  var wait = null, tries = 0;
  function again() { if (wait) return; wait = setTimeout(function () { wait = null; var el = document.getElementById('rep-dues-result'); if (el && el.offsetParent !== null) report(); }, 700); }
  function box(title, sub, color, body) {
    return '<div class="card" style="margin-bottom:12px"><div class="card-hd"><div><div class="card-title">' + title + '</div><div class="card-sub">' + sub + '</div></div></div>' + body + '</div>';
  }
  function report() {
    var el = document.getElementById('rep-dues-result'); if (!el) return;
    var cf = (document.getElementById('rep-centre') || {}).value || '';
    var okC = function (c) { return !cf || cen(c) === cf; };
    // 1. TPA / cashless
    var claims = [];
    try { claims = (typeof window.getDisplayTpaClaims === 'function' ? window.getDisplayTpaClaims() : []) || []; } catch (e) { claims = []; }
    var seen = {};
    claims = claims.filter(function (r) {
      if (!r || !r.id || seen[r.id]) return false; seen[r.id] = 1;
      var st = String(r.status || '').toLowerCase();
      return (st === 'pending' || st === 'partial') && insLike(r.mode || r.ins || '') && String(r.from || '').toLowerCase() !== 'tpa patient share' && okC(r.centre);
    }).map(function (r) { r._left = Math.max(0, num(r.approvedAmount || r.cashlessApprovedAmount || r.claimedAmount || r.amount) - num(r.receivedAmount)); return r; })
      .sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
    var tpaTotal = claims.reduce(function (s, r) { return s + r._left; }, 0);
    var tpaHtml = box('🏥 TPA / Cashless dues — ' + claims.length + ' claim' + (claims.length === 1 ? '' : 's'),
      'Outstanding from insurers / ECHS / CGHS / PMJAY: <b style="cursor:pointer;color:var(--bmh-blue);text-decoration:underline" onclick="nav(\'tpa\',null)">' + rs(tpaTotal) + ' → open TPA / Cashless</b>', '',
      claims.length ? '<table><thead><tr><th>#</th><th>Patient</th><th>Scheme / insurer</th><th>For</th><th>Date</th><th>Centre</th><th class="r">Due ₹</th></tr></thead><tbody>'
        + claims.map(function (r, i) {
          return '<tr style="cursor:pointer" title="Open TPA / Cashless" onclick="nav(\'tpa\',null)"><td>' + (i + 1) + '</td><td style="font-weight:800">' + esc(r.patient || '—') + '<div style="font-family:var(--mono);font-size:10px;color:var(--g1)">' + esc(r.bmhId || '') + '</div></td>'
            + '<td>' + esc(r.ins && r.ins !== r.mode ? r.ins : (r.mode || '')) + '</td><td>' + esc(r.procedure || r.for || '') + '</td><td style="font-size:10.5px">' + esc(fd(r.date || r.createdAt)) + '</td><td>' + esc(cen(r.centre)) + '</td>'
            + '<td style="font-weight:900;color:var(--orange);text-align:right">' + rs(r._left) + (num(r.receivedAmount) > 0 ? '<div style="font-size:9.5px;font-weight:600;color:var(--g1)">part received ' + rs(r.receivedAmount) + '</div>' : '') + '</td></tr>';
        }).join('') + '</tbody></table>'
        : '<div style="padding:14px;text-align:center;color:var(--g1);font-size:12px">' + (window.bmhTpaDues ? 'No open TPA / cashless claims' : 'Loading…') + '</div>');
    // 2. patients who owe on bills
    var owe = [];
    try { owe = typeof window.bmhDuesList === 'function' ? window.bmhDuesList() : []; } catch (e) { owe = []; }
    owe = owe.map(function (x) { var rows = x.rows.filter(function (r) { return okC(r.centre || (pt(x.id) || {}).centre); }); return { id: x.id, name: x.name, rows: rows, bal: rows.reduce(function (s, r) { return s + r.left; }, 0) }; })
      .filter(function (x) { return x.bal > 0; }).sort(function (a, b) { return b.bal - a.bal; });
    var oweTotal = owe.reduce(function (s, x) { return s + x.bal; }, 0);
    var loadingDues = typeof window.bmhDuesLoaded === 'function' && !window.bmhDuesLoaded();
    var oweHtml = box('💸 Patients who owe the hospital — ' + owe.length + ' patient' + (owe.length === 1 ? '' : 's'),
      'Balance left on bills: <b>' + rs(oweTotal) + '</b> · click a patient to open Billing and collect', '',
      owe.length ? '<table><thead><tr><th>#</th><th>Patient</th><th>Bill(s)</th><th class="r">Balance ₹</th></tr></thead><tbody>'
        + owe.map(function (x, i) {
          var p = pt(x.id) || {};
          return '<tr style="cursor:pointer" title="Open Billing for this patient" onclick="bmhPendingDuesOpenBilling(\'' + ja(x.id) + '\')"><td>' + (i + 1) + '</td>'
            + '<td style="font-weight:800;color:var(--bmh-blue);text-decoration:underline">' + esc(x.name || p.name || x.id) + '<div style="font-family:var(--mono);font-size:10px;color:var(--g1);font-weight:400">' + esc(x.id) + (p.mob ? ' · ' + esc(p.mob) : '') + '</div></td>'
            + '<td style="font-size:11px">' + x.rows.map(function (r) { return esc(fd(r.date)) + ' · ' + esc(r.desc || 'Bill') + (r.billNo ? ' <span style="color:var(--g1)">(' + esc(r.billNo) + ')</span>' : '') + (r.dept ? ' · ' + esc(dl(r.dept)) : '') + ' — <b>' + rs(r.left) + '</b>'; }).join('<br>') + '</td>'
            + '<td style="font-weight:900;color:#b42318;text-align:right">' + rs(x.bal) + '</td></tr>';
        }).join('') + '</tbody></table>'
        : '<div style="padding:14px;text-align:center;color:var(--g1);font-size:12px">' + (loadingDues ? 'Loading…' : 'No patient balances outstanding') + '</div>');
    // 3. charges sent to reception, not collected (any date)
    var today = []; try { today = PAY_REQUESTS || []; } catch (e) {}
    var reqs = {}; (OLDREQ || []).concat(today).forEach(function (r) { if (r && r.id) reqs[r.id] = r; });
    var pend = Object.keys(reqs).map(function (k) { return reqs[k]; }).filter(function (r) {
      if (r.collected || /^(paid|cancelled|collected)$/i.test(String(r.status || ''))) return false;
      if (insLike(r.mode || r.ins || '')) return false;
      if (!(num(r.amount) > 0)) return false;
      return okC(r.centre);
    }).sort(function (a, b) { return String(b.date || b.createdAt || '').localeCompare(String(a.date || a.createdAt || '')); });
    var pendTotal = pend.reduce(function (s, r) { return s + num(r.amount); }, 0);
    var pendHtml = box('🧾 Charges sent to reception, not collected — ' + pend.length, 'Total: <b>' + rs(pendTotal) + '</b> · click a patient to open Billing', '',
      pend.length ? '<table><thead><tr><th>#</th><th>Patient</th><th>For</th><th>Dept</th><th>Centre</th><th>Date</th><th class="r">Amount ₹</th><th></th></tr></thead><tbody>'
        + pend.map(function (r, i) {
          return '<tr><td>' + (i + 1) + '</td><td style="font-weight:800;cursor:pointer;color:var(--bmh-blue);text-decoration:underline" onclick="bmhPendingDuesOpenBilling(\'' + ja(r.bmhId || '') + '\')">' + esc(r.patient || '—') + '<div style="font-family:var(--mono);font-size:10px;color:var(--g1);font-weight:400">' + esc(r.bmhId || '') + '</div></td>'
            + '<td>' + esc(r.for || r.service || r.desc || '—') + '</td><td>' + esc(dl(r.dept)) + '</td><td>' + esc(cen(r.centre)) + '</td><td style="font-size:10.5px">' + esc(fd(r.date || r.createdAt)) + '</td>'
            + '<td style="font-weight:900;color:var(--orange);text-align:right">' + rs(r.amount) + '</td>'
            + '<td><button class="btn btn-xs btn-gray" onclick="deletePayRequest(\'' + ja(r.id) + '\');setTimeout(generatePendingDuesReport,600)" title="Delete due">🗑️ Delete</button></td></tr>';
        }).join('') + '</tbody></table>'
        : '<div style="padding:14px;text-align:center;color:var(--g1);font-size:12px">' + (OLDREQ ? 'None' : 'Loading…') + '</div>');
    el.innerHTML = '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">'
      + '<div style="cursor:pointer;background:var(--blue-lt);border:1px solid rgba(26,60,110,.2);border-radius:10px;padding:10px 14px" onclick="nav(\'tpa\',null)"><div style="font-size:10px;font-weight:800;color:var(--bmh-blue);text-transform:uppercase">TPA / Cashless due</div><div style="font-size:20px;font-weight:900">' + rs(tpaTotal) + '</div></div>'
      + '<div style="background:#fff5f4;border:1px solid #f1d0cc;border-radius:10px;padding:10px 14px"><div style="font-size:10px;font-weight:800;color:#b42318;text-transform:uppercase">Patients owe (bills)</div><div style="font-size:20px;font-weight:900">' + rs(oweTotal) + '</div></div>'
      + '<div style="background:var(--orange-lt);border:1px solid rgba(255,149,0,.35);border-radius:10px;padding:10px 14px"><div style="font-size:10px;font-weight:800;color:#8a4200;text-transform:uppercase">Charges not collected</div><div style="font-size:20px;font-weight:900">' + rs(pendTotal) + '</div></div>'
      + '</div>' + tpaHtml + oweHtml + pendHtml;
    if (!OLDREQ) loadOldRequests(again);
    // the claim list and dues list arrive a moment after the first open — redraw a few times while they load
    if ((loadingDues || !claims.length) && tries++ < 6) again(); 
  }
  window.bmhPendingDuesOpenBilling = function (id) {
    if (!id) { try { nav('billing', null); } catch (e) {} return; }
    try { if (typeof rcOpenBillingFor === 'function') { rcOpenBillingFor(id); return; } } catch (e) {}
    try { if (typeof bmhOpenPatientBillHistory === 'function') bmhOpenPatientBillHistory(id); } catch (e) {}
  };
  window.generatePendingDuesReport = function () { tries = 0; try { report(); } catch (e) { console.warn('[pending dues]', e); if (typeof orig === 'function') orig(); } };
})();
