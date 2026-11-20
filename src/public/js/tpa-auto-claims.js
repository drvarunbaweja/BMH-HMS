/* BMH — ECHS / CGHS / PMJAY / TPA patients: every new consultation or charge asks for the claim amount and adds it to
 * TPA / Cashless dues.
 * When reception registers or checks in an ECHS / CGHS / PMJAY / insurance patient (including the ₹0 "no fee" entry), or
 * a charge (surgery, procedure, investigation) is added for a patient whose scheme is ECHS / CGHS / PMJAY / insurance,
 * a pop-up asks for the claim NAME (OPD consultation, IPD, Surgery, YAG, Procedure, Investigation, Injection or anything
 * typed — new names are offered next time) and the AMOUNT:  [Add to TPA / Cashless dues]  [Not a claim].
 * The amount can be corrected. The amount entered is remembered for that scheme and claim name (e.g. ECHS · OPD
 * consultation, ECHS · YAG) and is filled in automatically next time, on every computer (settings/tpaClaimDefaults).
 * "Add" creates a pending claim exactly like the existing insurance claims, so it shows in Reception → Insurance/TPA,
 * the TPA page and the TPA / Cashless due totals until the payment is recorded. Receipts are not changed.
 * Doctors' screens get no pop-up: for a charge a doctor adds, the claim is made with the remembered (or charged) amount.
 * No pop-up when a claim for the same patient and item already exists today, or for medicines / inventory use.
 * Off switch (this browser): localStorage.setItem('bmh_tpa_auto_claims_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_tpa_auto_claims_off') === '1') return; } catch (e) {}
  var PATH = 'settings/tpaClaimDefaults', LS = 'bmh_tpa_claim_defaults_v1';
  var defs = {}; try { defs = JSON.parse(localStorage.getItem(LS) || '{}') || {}; } catch (e) { defs = {}; }
  var INS = /Insurance|TPA|PMJAY|CGHS|ECHS|Ayushman|Cashless|Star Health|Health Insurance/i;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function k(s) { return String(s || '').toLowerCase().replace(/\(no fee\)/g, '').replace(/[.#$\/\[\]]/g, ' ').replace(/\s+/g, ' ').trim() || 'item'; }
  function pt(id) { try { return (PATIENTS || []).find(function (x) { return x && String(x.bmhId) === String(id); }) || null; } catch (e) { return null; } }
  function day(v) { try { return localDateKey(v || new Date()); } catch (e) { return String(v || '').slice(0, 10); } }
  function isDoctor() { try { var u = CURRENT_USER || {}; return !u.isAdmin && /doctor/i.test(String(u.role || '')); } catch (e) { return false; } }
  function hydrating() { return !!(window._bmhPatientsHydrating || window._bmhFinancialsHydrating); }
  function itemKey(desc, cat) { return /consult|follow[- ]?up|no fee/i.test(String(desc || '')) || /^consultation$/i.test(String(cat || '')) ? 'consultation' : k(desc); }
  function schemeOf(p, row) {
    var s = String((row && (row.ins || (INS.test(row.mode || '') ? row.mode : ''))) || (p && p.ins) || '').trim();
    if (/^insurance\/tpa$/i.test(s) && p && p.ins && !/^insurance\/tpa$/i.test(p.ins)) s = p.ins;
    return INS.test(s) ? s : '';
  }
  function defaultAmount(scheme, key, fallback) {
    var d = defs[k(scheme)] && defs[k(scheme)][key];
    return Number(d) > 0 ? Number(d) : (Number(fallback) > 0 ? Number(fallback) : '');
  }
  function remember(scheme, key, amt) {
    var s = k(scheme); defs[s] = defs[s] || {}; defs[s][key] = amt;
    try { localStorage.setItem(LS, JSON.stringify(defs)); } catch (e) {}
    try { if (window.FBDB) window.FBDB.ref(PATH + '/' + s + '/' + key.replace(/[.#$\/\[\]]/g, ' ')).set(amt).catch(function () {}); } catch (e) {}
  }
  var BASE_NAMES = ['OPD consultation', 'IPD', 'Surgery', 'YAG', 'Procedure', 'Investigation', 'Injection'];
  var NPATH = 'settings/tpaClaimNames', NLS = 'bmh_tpa_claim_names_v1';
  var names_ = {}; try { names_ = JSON.parse(localStorage.getItem(NLS) || '{}') || {}; } catch (e) { names_ = {}; }
  function rememberName(scheme, n) {
    var s = k(scheme), key = k(n); names_[s] = names_[s] || {}; if (names_[s][key] === n) return; names_[s][key] = n;
    try { localStorage.setItem(NLS, JSON.stringify(names_)); } catch (e) {}
    try { if (window.FBDB) window.FBDB.ref(NPATH + '/' + s + '/' + key).set(n).catch(function () {}); } catch (e) {}
  }
  function claimExists(bmhId, desc) {
    var d = day(), want = k(desc);
    try {
      return (PAY_REQUESTS || []).some(function (r) {
        return r && String(r.bmhId) === String(bmhId) && INS.test(String(r.mode || '') + ' ' + String(r.ins || '')) && String(r.status || '').toLowerCase() !== 'rejected' && day(r.date) === d && k(r.for || r.procedure) === want;
      });
    } catch (e) { return false; }
  }
  // one pop-up at a time
  var queue = [], busy = false;
  function ask(job) { queue.push(job); next(); }
  function next() {
    if (busy || !queue.length) return; busy = true;
    var j = queue.shift();
    if (claimExists(j.bmhId, j.desc)) { busy = false; return next(); }
    var name0 = j.key === 'consultation' ? 'OPD consultation' : j.desc;
    if (claimExists(j.bmhId, name0)) { busy = false; return next(); }
    var amt = defaultAmount(j.scheme, k(name0), '') || defaultAmount(j.scheme, j.key, j.amount);
    // doctors are not interrupted: the claim is made with the remembered (or charged) amount; reception can correct it
    if (isDoctor()) { if (Number(amt) > 0) { j.desc = name0; create(j, Number(amt)); } busy = false; return next(); }
    var names = BASE_NAMES.slice(); var nm = names_[k(j.scheme)] || {};
    Object.keys(nm).forEach(function (key) { if (names.map(k).indexOf(key) < 0) names.push(nm[key]); });
    var ov = document.createElement('div'); ov.id = 'tac-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:100001;display:flex;align-items:center;justify-content:center';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;padding:18px 20px;width:min(460px,92vw);box-shadow:0 18px 50px rgba(0,0,0,.3)">'
      + '<div style="font-size:15px;font-weight:900;color:#1a3c6e">🏦 ' + esc(j.scheme) + ' claim</div>'
      + '<div style="font-size:12px;color:#444;margin:4px 0 12px">' + esc(j.patient) + ' · ' + esc(j.bmhId) + '<br>Entered: <b>' + esc(j.desc) + '</b></div>'
      + '<label style="font-size:11px;font-weight:800;color:#555">Claim for (OPD, IPD, Surgery, YAG, Procedure… — pick or type)</label>'
      + '<input id="tac-name" list="tac-names" value="' + esc(name0) + '" style="width:100%;margin:4px 0 10px;padding:9px;border:1.5px solid #c7c7cc;border-radius:8px;font-size:14px;font-weight:800">'
      + '<datalist id="tac-names">' + names.map(function (n) { return '<option value="' + esc(n) + '">'; }).join('') + '</datalist>'
      + '<label style="font-size:11px;font-weight:800;color:#555">Claim amount (₹) — change it if it is not right; it will be filled in next time</label>'
      + '<input id="tac-amt" type="number" min="0" value="' + esc(amt) + '" style="width:100%;margin:4px 0 12px;padding:9px;border:1.5px solid #c7c7cc;border-radius:8px;font-size:15px;font-weight:900">'
      + '<div style="display:flex;gap:8px"><button type="button" id="tac-add" style="flex:2;background:#1a3c6e;color:#fff;border:none;border-radius:9px;padding:10px;font-weight:900;cursor:pointer">Add to TPA / Cashless dues</button>'
      + '<button type="button" id="tac-no" style="flex:1;background:#f2f2f7;color:#333;border:none;border-radius:9px;padding:10px;font-weight:700;cursor:pointer">Not a claim</button></div></div>';
    document.body.appendChild(ov);
    var inp = ov.querySelector('#tac-amt'), nin = ov.querySelector('#tac-name');
    setTimeout(function () { try { inp.focus(); inp.select(); } catch (e) {} }, 50);
    nin.addEventListener('input', function () { var d = defaultAmount(j.scheme, k(nin.value), ''); if (d !== '') inp.value = d; });
    function close() { ov.remove(); busy = false; setTimeout(next, 50); }
    ov.querySelector('#tac-no').onclick = close;
    ov.querySelector('#tac-add').onclick = function () {
      var a = Number(inp.value), n = String(nin.value || '').trim(); if (!n) { nin.focus(); return; } if (!(a > 0)) { inp.focus(); return; }
      j.desc = n; create(j, a); remember(j.scheme, k(n), a); rememberName(j.scheme, n); close();
    };
  }
  function create(j, amount) {
    var p = pt(j.bmhId) || {};
    var id = 'TPA' + Date.now();
    var claim = { id: id, patient: j.patient, bmhId: j.bmhId, for: j.desc, procedure: j.desc, amount: amount, approvedAmount: amount, claimedAmount: amount, status: 'pending',
      mode: /^(ECHS|CGHS|PMJAY)/i.test(j.scheme) ? j.scheme.toUpperCase().slice(0, 5).trim() : 'Insurance/TPA', ins: j.scheme, policy: p.policy || '', dept: j.dept || p.dept || 'ophtho',
      centre: j.centre || p.centre || (CURRENT_USER && CURRENT_USER.centre) || 'RPR', date: new Date().toISOString(), from: j.from || 'Reception',
      createdBy: (CURRENT_USER && CURRENT_USER.name) || 'Staff', autoClaim: true };
    if (/^ECHS/i.test(j.scheme)) claim.mode = 'ECHS'; else if (/^CGHS/i.test(j.scheme)) claim.mode = 'CGHS'; else if (/PMJAY|Ayushman/i.test(j.scheme)) claim.mode = 'PMJAY';
    try { PAY_REQUESTS.push(claim); } catch (e) {}
    try { fbSet && fbSet('payRequests/' + id, claim); } catch (e) {}
    try { fbPush && fbPush('auditLog', { user: claim.createdBy, role: (CURRENT_USER && CURRENT_USER.role) || '', action: 'TPA_AUTO_CLAIM', item: j.scheme + ' ₹' + amount + ' — ' + j.patient + ' (' + j.desc + ')', timestamp: claim.date }); } catch (e) {}
    try { showToast('🏦 ' + j.scheme + ' claim ₹' + amount.toLocaleString('en-IN') + ' added to TPA / Cashless dues ✓', 's'); } catch (e) {}
    try { renderInsuranceTab && renderInsuranceTab(); } catch (e) {}
    try { renderTpaPage && renderTpaPage(); } catch (e) {}
  }

  function install() {
    var ok = true;
    // 1) reception consultation receipts of insurance-type patients (incl. ₹0 no-fee) → ask
    if (typeof window.saveTransactionToFirebase === 'function' && !window.saveTransactionToFirebase._tac) {
      var origTx = window.saveTransactionToFirebase;
      var t = function (txn) {
        var r = origTx.apply(this, arguments);
        try {
          if (!hydrating() && txn && txn.bmhId && !txn.payRequestId && !/patient share/i.test(String(txn.from || '') + String(txn.service || ''))) {
            var p = pt(txn.bmhId), scheme = schemeOf(p, txn);
            var cons = (txn.billCats || []).indexOf('consultation') >= 0 || /consult|follow/i.test(String(txn.service || ''));
            if (scheme && cons && String(txn.source || '') === 'reception') {
              ask({ bmhId: txn.bmhId, patient: txn.patient || (p && p.name) || txn.bmhId, desc: String(txn.service || 'Consultation').replace(/\s*\(no fee\)/i, ''), key: 'consultation', scheme: scheme, amount: Number(txn.amount) || 0, dept: txn.dept, centre: txn.centre, from: 'Reception' });
            }
          }
        } catch (e) {}
        return r;
      };
      t._tac = true; window.saveTransactionToFirebase = t;
    } else if (typeof window.saveTransactionToFirebase !== 'function') ok = false;
    // 2) charges added for insurance-type patients (surgery, procedure, investigation) → ask
    if (typeof window.addBmhPatientCharge === 'function' && !window.addBmhPatientCharge._tac) {
      var origCh = window.addBmhPatientCharge;
      var c = function (bmhId, row) {
        var r = origCh.apply(this, arguments);
        try {
          if (!hydrating() && bmhId && row && Number(row.amount) > 0 && !/^(TPA|PR)/.test(String(row.ref || '')) && !/^chg-TPA/.test(String(row.id || ''))) {
            var cat = String(row.cat || '');
            var p = pt(bmhId), scheme = schemeOf(p, null);
            if (scheme && !/pharmacy|medicine|inventory|consultation/i.test(cat) && !/inventory/i.test(String(row.source || ''))) {
              var desc = String(row.desc || row.name || 'Charge');
              ask({ bmhId: bmhId, patient: (p && p.name) || bmhId, desc: desc, key: itemKey(desc, cat), scheme: scheme, amount: Number(row.amount) || 0, dept: row.dept, from: /doctor/i.test(String(row.source || '')) ? 'Doctor' : 'Reception' });
            }
          }
        } catch (e) {}
        return r;
      };
      c._tac = true; window.addBmhPatientCharge = c;
    } else if (typeof window.addBmhPatientCharge !== 'function') ok = false;
    return ok;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
  var tries = 0, lv = setInterval(function () {
    if (window.FBDB || ++tries > 30) {
      clearInterval(lv);
      try { if (window.FBDB) window.FBDB.ref(NPATH).once('value').then(function (s) { var v = s.val(); if (v && typeof v === 'object') { names_ = v; try { localStorage.setItem(NLS, JSON.stringify(v)); } catch (e) {} } }).catch(function () {}); } catch (e) {}
      try { if (window.FBDB) window.FBDB.ref(PATH).once('value').then(function (s) { var v = s.val(); if (v && typeof v === 'object') { defs = v; try { localStorage.setItem(LS, JSON.stringify(v)); } catch (e) {} } }).catch(function () {}); } catch (e) {}
    }
  }, 2000);
})();
