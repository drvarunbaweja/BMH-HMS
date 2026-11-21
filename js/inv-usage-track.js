/* BMH — Inventory → Patient Usage: track an item, or a patient, with print.
 * A "🔎 Track usage" card at the top of Patient Usage:
 *   • Item: type a stock name (or barcode) → every use of it on every patient and date (date, patient, BMSH, qty, store,
 *     department, procedure), with the total, newest first.
 *   • Patient: type a name / BMSH ID / phone → everything used for that patient, grouped by date, with totals per date.
 *   • Department: All departments, or one (Ophthalmology, OBG, Psychiatry, Skin …).
 *   • Optional From / To dates. "Print" prints exactly what is shown.
 * Reads the same usage records as the rest of Patient Usage (all departments and stores); nothing is changed.
 * Off switch (this browser): localStorage.setItem('bmh_inv_usage_track_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_inv_usage_track_off') === '1') return; } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9.+]+/g, ' ').trim(); }
  function day(v) { try { return localDateKey(v); } catch (e) { return String(v || '').slice(0, 10); } }
  function fmt(d) { try { return formatDateIN(d); } catch (e) { return d; } }
  function dkey(v) {
    var k = String(v || 'general').toLowerCase().trim();
    if (/^(eye|ophth|ophtho|ophthalmology)/.test(k)) return 'ophtho';
    if (/^(obg|obs|gyn|obgyn)/.test(k)) return 'obg';
    if (/^(psych|neuro)/.test(k)) return 'psych';
    if (/^(skin|derm|cosm)/.test(k)) return 'skin';
    return k || 'general';
  }
  function dept(v) { try { return bmhDeptLabel(dkey(v)); } catch (e) { return v || ''; } }
  function store(v) { try { return bmhFormatStoreLabel(v); } catch (e) { return v || ''; } }
  function rows() { try { return getInventoryPatientUsageRows(); } catch (e) { return []; } }
  function $(id) { return document.getElementById(id); }
  var state = { mode: 'item' };

  function card() {
    return '<div class="card" id="iut-card" style="margin-top:12px">'
      + '<div class="card-hd"><div><div class="card-title">🔎 Track usage</div><div class="card-sub">See where a stock item was used (all patients and dates), or everything used for one patient — and print it</div></div></div>'
      + '<div style="display:flex;gap:6px;margin-bottom:8px"><button type="button" class="btn btn-xs btn-blue" id="iut-m-item">By stock item</button><button type="button" class="btn btn-xs btn-outline" id="iut-m-pt">By patient</button></div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:end">'
      + '<div class="form-group" style="margin:0;flex:1;min-width:220px"><label class="fl" id="iut-q-lbl">Stock item name or barcode</label><input type="text" id="iut-q" list="iut-items" placeholder="e.g. Viscolon, Hydrofold +21.50, Gloves 7" autocomplete="off"><datalist id="iut-items"></datalist></div>'
      + '<div class="form-group" style="margin:0;min-width:150px"><label class="fl">Department</label><select id="iut-dept"><option value="">All departments</option></select></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">From</label><input type="date" id="iut-from"></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">To</label><input type="date" id="iut-to"></div>'
      + '<button type="button" class="btn btn-blue btn-sm" id="iut-go">Show</button>'
      + '<button type="button" class="btn btn-gold btn-sm" id="iut-print">🖨️ Print</button></div>'
      + '<div id="iut-out" style="margin-top:10px"></div></div>';
  }
  function filter() {
    var dp = ($('iut-dept') || {}).value || '';
    var q = norm(($('iut-q') || {}).value), from = ($('iut-from') || {}).value || '', to = ($('iut-to') || {}).value || '';
    if (!q) return { q: q, list: null };
    var pts = {};
    if (state.mode === 'pt') {
      try { (PATIENTS || []).forEach(function (p) { if (!p) return; var hay = norm([p.name, p.bmhId, p.mob, p.mobile, p.phone].join(' ')); if (hay.indexOf(q) >= 0) pts[String(p.bmhId)] = 1; }); } catch (e) {}
    }
    var list = rows().filter(function (r) {
      var d = day(r.ts || r.date || r.createdAt); if (from && d < from) return false; if (to && d > to) return false;
      if (dp && dkey(r.dept) !== dp) return false;
      if (state.mode === 'item') return norm(r.itemName).indexOf(q) >= 0 || norm(r.barcode) === q;
      return pts[String(r.bmhId)] || norm(r.patientName).indexOf(q) >= 0 || norm(r.bmhId).indexOf(q) >= 0;
    });
    return { q: q, list: list, from: from, to: to, dept: dp };
  }
  function qtyOf(list) { return list.reduce(function (s, r) { return s + Math.abs(Number(r.qty) || 0); }, 0); }
  function itemTable(list, print) {
    var th = 'style="text-align:left;padding:6px 8px;border-bottom:1px solid #ddd;background:#f1f5f9;font-size:11px"', td = 'style="padding:6px 8px;border-bottom:1px solid #eee;font-size:12px;vertical-align:top"';
    var byItem = {}; list.forEach(function (r) { var k = r.itemName || 'Stock item'; (byItem[k] = byItem[k] || []).push(r); });
    return Object.keys(byItem).sort().map(function (name) {
      var rs = byItem[name];
      return '<div style="border:1px solid #dde2ea;border-radius:10px;overflow:hidden;margin-bottom:10px;background:#fff">'
        + '<div style="padding:8px 10px;background:#eef4ff;font-weight:900;color:#1a3c6e;display:flex;justify-content:space-between"><span>' + esc(name) + '</span><span>Total used: ' + qtyOf(rs) + ' · ' + rs.length + ' patient entr' + (rs.length === 1 ? 'y' : 'ies') + '</span></div>'
        + '<table style="width:100%;border-collapse:collapse"><thead><tr><th ' + th + '>Date</th><th ' + th + '>Patient</th><th ' + th + '>BMSH</th><th ' + th + '>Qty</th><th ' + th + '>Store / Dept</th><th ' + th + '>Details</th></tr></thead><tbody>'
        + rs.map(function (r) {
          var det = [r.procedure ? 'Procedure: ' + r.procedure : '', r.mode === 'bill' ? 'Billed' : '', r.barcode ? r.barcode : '', r.exp ? 'Exp ' + r.exp : '', r.batchNo ? 'Batch ' + r.batchNo : ''].filter(Boolean).join(' · ');
          return '<tr><td ' + td + '>' + esc(fmt(day(r.ts || r.date))) + '</td><td ' + td + '><b>' + esc(r.patientName) + '</b></td><td ' + td + '>' + esc(r.bmhId) + '</td><td ' + td + '><b>' + esc(r.qty) + '</b></td><td ' + td + '>' + esc([store(r.store), dept(r.dept)].filter(Boolean).join(' · ')) + '</td><td ' + td + ' style="font-size:11px;color:#555;padding:6px 8px;border-bottom:1px solid #eee">' + esc(det) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }).join('');
  }
  function patientTable(list) {
    var th = 'style="text-align:left;padding:6px 8px;border-bottom:1px solid #ddd;background:#f1f5f9;font-size:11px"', td = 'style="padding:6px 8px;border-bottom:1px solid #eee;font-size:12px;vertical-align:top"';
    var byPt = {}; list.forEach(function (r) { var k = String(r.bmhId || r.patientName); (byPt[k] = byPt[k] || []).push(r); });
    return Object.keys(byPt).map(function (k) {
      var rs = byPt[k], byDay = {};
      rs.forEach(function (r) { var d = day(r.ts || r.date); (byDay[d] = byDay[d] || []).push(r); });
      return '<div style="border:1px solid #dde2ea;border-radius:10px;overflow:hidden;margin-bottom:10px;background:#fff">'
        + '<div style="padding:8px 10px;background:#eef4ff;font-weight:900;color:#1a3c6e;display:flex;justify-content:space-between"><span>' + esc(rs[0].patientName) + ' · ' + esc(rs[0].bmhId) + '</span><span>' + qtyOf(rs) + ' item' + (qtyOf(rs) === 1 ? '' : 's') + ' used</span></div>'
        + Object.keys(byDay).sort().reverse().map(function (d) {
          var dr = byDay[d];
          return '<div style="padding:6px 10px;font-weight:800;font-size:12px;background:#f8fafc;border-top:1px solid #e5e7eb">' + esc(fmt(d)) + ' — ' + qtyOf(dr) + ' item' + (qtyOf(dr) === 1 ? '' : 's') + '</div>'
            + '<table style="width:100%;border-collapse:collapse"><thead><tr><th ' + th + '>Stock used</th><th ' + th + '>Qty</th><th ' + th + '>Store / Dept</th><th ' + th + '>Details</th></tr></thead><tbody>'
            + dr.map(function (r) {
              var det = [r.procedure ? 'Procedure: ' + r.procedure : '', r.mode === 'bill' ? 'Billed' : '', r.exp ? 'Exp ' + r.exp : '', r.batchNo ? 'Batch ' + r.batchNo : ''].filter(Boolean).join(' · ');
              return '<tr><td ' + td + '><b>' + esc(r.itemName) + '</b></td><td ' + td + '><b>' + esc(r.qty) + '</b></td><td ' + td + '>' + esc([store(r.store), dept(r.dept)].filter(Boolean).join(' · ')) + '</td><td ' + td + '>' + esc(det) + '</td></tr>';
            }).join('') + '</tbody></table>';
        }).join('') + '</div>';
    }).join('');
  }
  function render() {
    var out = $('iut-out'); if (!out) return;
    var f = filter();
    if (!f.list) { out.innerHTML = '<div style="font-size:12px;color:var(--g1)">Type a ' + (state.mode === 'item' ? 'stock item name' : 'patient name / BMSH ID / phone') + ' and press Show.</div>'; return; }
    if (!f.list.length) { out.innerHTML = '<div style="font-size:12px;color:var(--g1)">Nothing used for this search' + (f.from || f.to ? ' in these dates' : '') + '.</div>'; return; }
    out.innerHTML = state.mode === 'item' ? itemTable(f.list) : patientTable(f.list);
  }
  function print() {
    var f = filter(); if (!f.list || !f.list.length) { render(); return; }
    var title = (state.mode === 'item' ? 'Stock usage — ' : 'Patient stock usage — ') + (($('iut-q') || {}).value || '');
    var sub = (f.dept ? dept(f.dept) + ' · ' : 'All departments · ') + 'Printed ' + new Date().toLocaleString('en-IN') + (f.from || f.to ? ' · ' + (f.from ? fmt(f.from) : '…') + ' to ' + (f.to ? fmt(f.to) : 'today') : ' · all dates');
    var html = '<!doctype html><html><head><meta charset="utf-8"><title>' + esc(title) + '</title><style>body{font-family:Arial,sans-serif;color:#111;margin:22px;font-size:12px}h1{font-size:17px;margin:0 0 4px;color:#1a3c6e}.sub{font-size:11px;color:#555;margin-bottom:12px}table{page-break-inside:auto}tr{page-break-inside:avoid}</style></head><body>'
      + '<h1>' + esc(title) + '</h1><div class="sub">Baweja Multispeciality Hospital · ' + esc(sub) + '</div>'
      + (state.mode === 'item' ? itemTable(f.list) : patientTable(f.list)) + '</body></html>';
    try { safePrint(html); } catch (e) { var w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); w.print(); } }
  }
  function setMode(m) {
    state.mode = m;
    var a = $('iut-m-item'), b = $('iut-m-pt'), lbl = $('iut-q-lbl'), q = $('iut-q');
    if (a) a.className = 'btn btn-xs ' + (m === 'item' ? 'btn-blue' : 'btn-outline');
    if (b) b.className = 'btn btn-xs ' + (m === 'pt' ? 'btn-blue' : 'btn-outline');
    if (lbl) lbl.textContent = m === 'item' ? 'Stock item name or barcode' : 'Patient name, BMSH ID or phone';
    if (q) { q.value = ''; q.placeholder = m === 'item' ? 'e.g. Viscolon, Hydrofold +21.50, Gloves 7' : 'e.g. Mangat Singh, BMSH-498496'; q.setAttribute('list', m === 'item' ? 'iut-items' : ''); }
    render();
  }
  function fillDepts() {
    var sel = $('iut-dept'); if (!sel) return;
    var cur = sel.value, keys = { ophtho: 1, obg: 1, psych: 1, skin: 1 };
    rows().forEach(function (r) { keys[dkey(r.dept)] = 1; });
    sel.innerHTML = '<option value="">All departments</option>' + Object.keys(keys).map(function (k) { return '<option value="' + esc(k) + '">' + esc(dept(k)) + '</option>'; }).join('');
    sel.value = cur;
  }
  function fillItems() {
    var dl = $('iut-items'); if (!dl) return;
    var names = {}; rows().forEach(function (r) { if (r.itemName) names[r.itemName] = 1; });
    try { (INVENTORY || []).forEach(function (i) { if (i && i.name && !i._deleted) names[i.name] = 1; }); } catch (e) {}
    dl.innerHTML = Object.keys(names).sort().slice(0, 1500).map(function (n) { return '<option value="' + esc(n) + '">'; }).join('');
  }
  function build() {
    var tab = $('inv-use'); if (!tab || $('iut-card')) return !!tab;
    var anchor = tab.querySelector('#inv-usage-log'); anchor = anchor && anchor.closest('.card');
    var wrap = document.createElement('div'); wrap.innerHTML = card();
    var el = wrap.firstChild;
    if (anchor) anchor.parentNode.insertBefore(el, anchor); else tab.appendChild(el);
    $('iut-m-item').onclick = function () { setMode('item'); };
    $('iut-m-pt').onclick = function () { setMode('pt'); };
    $('iut-go').onclick = render; $('iut-print').onclick = print;
    $('iut-q').addEventListener('keydown', function (e) { if (e.key === 'Enter') render(); });
    $('iut-q').addEventListener('focus', fillItems, { once: true });
    fillDepts(); $('iut-dept').addEventListener('focus', fillDepts); $('iut-dept').addEventListener('change', function () { if (($('iut-q') || {}).value) render(); });
    render();
    return true;
  }
  var n = 0; function tick() { try { if (build()) return; } catch (e) {} if (++n < 40) setTimeout(tick, 1500); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick); else tick();
  window.bmhInvUsageTrack = { render: render, print: print, setMode: setMode };
})();
