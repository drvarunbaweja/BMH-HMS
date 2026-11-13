/* BMH — Lab module helpers.
 *  • "🧪 Choose tests" (Add Patient to Lab) and "➕ Tests" on each lab patient open the same Order Investigations panel
 *    the doctors use; the ticked tests are sent to the lab for that patient (Advise-only is hidden there).
 *  • Patient search in the lab finds any patient by BMSH ID or phone number — not only today's — also patients that
 *    are not loaded on this computer (looked up by ID / phone).
 *  • × on a test removes that one test; "🗑️ All" removes all of the patient's tests for the date (existing).
 *    A removed test is kept in patients/<id>/investigationOrdersDeleted for the record.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ja(s) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function pts() { try { return PATIENTS || []; } catch (e) { return window.PATIENTS || []; } }
  function cm(p) { try { return typeof centreMatch === 'function' ? centreMatch(p) : true; } catch (e) { return true; } }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || 'Lab'; } catch (e) { return 'Lab'; } }

  // ── patient search: any date, plus lookup in the database ──
  var REMOTE = {}, seq = 0;
  function row(p, remote) {
    return '<div onclick="bmhLabPick(\'' + ja(p.bmhId) + '\')" style="padding:9px 12px;cursor:pointer;border-bottom:1px solid var(--g5);display:flex;justify-content:space-between;gap:8px">'
      + '<div><div style="font-weight:800;font-size:12px">' + esc(p.name || '') + '</div><div style="font-size:10.5px;color:var(--g1);font-family:var(--mono)">' + esc(p.bmhId) + ' · ' + esc(p.mob || p.phone || '') + '</div></div>'
      + '<div style="font-size:10px;color:var(--g1);text-align:right">' + esc([p.age, p.sex].filter(Boolean).join(' / ')) + (p.centre ? '<div>' + esc(p.centre) + '</div>' : '') + (remote ? '<div style="color:var(--blue)">from records</div>' : '') + '</div></div>';
  }
  window.searchLabAddPatient = function (query) {
    var q = String(query || '').trim(), box = document.getElementById('lab-add-pt-results');
    if (!box) return;
    if (q.length < 2) { box.style.display = 'none'; return; }
    var ql = q.toLowerCase(), qd = q.replace(/\D/g, '');
    var local = pts().filter(function (p) {
      if (!p || !p.bmhId) return false;
      var phone = String(p.mob || p.phone || '').replace(/\D/g, '');
      return String(p.bmhId).toLowerCase().indexOf(ql) >= 0 || (qd.length >= 3 && phone.indexOf(qd) >= 0) || (ql.length >= 3 && /[a-z]/.test(ql) && String(p.name || '').toLowerCase().indexOf(ql) >= 0);
    }).slice(0, 10);
    var draw = function (remote) {
      var have = {}; local.forEach(function (p) { have[p.bmhId] = 1; });
      var extra = (remote || []).filter(function (p) { return p && !have[p.bmhId]; });
      // the lab list shows this centre's patients, so others are only counted
      var all = local.concat(extra), mine = all.filter(cm), other = all.length - mine.length;
      box.style.display = 'block';
      box.innerHTML = (mine.length ? mine.map(function (p) { return row(p, !have[p.bmhId]); }).join('') : '<div style="padding:10px;font-size:11.5px;color:var(--g1)">' + (remote ? 'No patient found' : 'Searching…') + '</div>')
        + (other ? '<div style="padding:8px 12px;font-size:10.5px;color:#9a6b00">' + other + ' match' + (other === 1 ? '' : 'es') + ' registered at the other centre — switch centre to add them</div>' : '');
    };
    draw(null);
    var my = ++seq;
    // database lookup by exact BMSH ID or 10-digit phone
    if (!window.FBDB) { draw([]); return; }
    var jobs = [];
    var idq = q.toUpperCase().replace(/\s+/g, '');
    if (/^BMSH-?\d+$/.test(idq)) { var id = idq.indexOf('BMSH-') === 0 ? idq : idq.replace('BMSH', 'BMSH-'); jobs.push(window.FBDB.ref('patients/' + id).once('value').then(function (s) { var v = s.val(); return v ? [Object.assign({ bmhId: id }, v)] : []; })); }
    else if (/^\d{4,}$/.test(qd) && qd.length < 10 && /^\d+$/.test(q)) { jobs.push(window.FBDB.ref('patients/BMSH-' + qd).once('value').then(function (s) { var v = s.val(); return v ? [Object.assign({ bmhId: 'BMSH-' + qd }, v)] : []; })); }
    if (qd.length >= 10) { var last10 = qd.slice(-10); jobs.push(window.FBDB.ref('patients').orderByChild('phoneSearch').equalTo(last10).limitToFirst(10).once('value').then(function (s) { var v = s.val() || {}; return Object.keys(v).map(function (k) { return Object.assign({ bmhId: k }, v[k]); }); })); }
    if (!jobs.length) { if (!local.length) draw([]); return; }
    Promise.all(jobs.map(function (j) { return j.catch(function () { return []; }); })).then(function (lists) {
      if (my !== seq) return;
      var all = [].concat.apply([], lists); all.forEach(function (p) { REMOTE[p.bmhId] = p; });
      draw(all);
    });
  };
  window.bmhLabPick = function (bmhId) {
    var p = pts().find(function (x) { return x && x.bmhId === bmhId; });
    if (!p && REMOTE[bmhId]) {
      p = REMOTE[bmhId];
      try { if (typeof normalizePatientRecord === 'function') p = normalizePatientRecord(p) || p; } catch (e) {}
      pts().push(p);
    }
    if (!p) return;
    try { selectLabAddPatient(p.bmhId, String(p.name || '').replace(/'/g, '')); } catch (e) {}
  };

  // ── doctor's Order Investigations panel, used from the lab ──
  var LAB = null; // { bmhId, saved: [...] }
  function setLabMode(on) {
    var m = document.getElementById('m-order-invest'); if (!m) return;
    Array.prototype.forEach.call(m.querySelectorAll('button[onclick*="confirmInvestigations"]'), function (b) {
      if (/advise/.test(b.getAttribute('onclick'))) b.style.display = on ? 'none' : '';
      else { if (on) { b.dataset.bmhTxt = b.dataset.bmhTxt || b.innerHTML; b.innerHTML = '✅ Add to Lab'; } else if (b.dataset.bmhTxt) b.innerHTML = b.dataset.bmhTxt; }
    });
    var t = m.querySelector('.modal-title'); if (t) { if (on) { t.dataset.bmhTxt = t.dataset.bmhTxt || t.innerHTML; var p = pts().find(function (x) { return x.bmhId === LAB.bmhId; }); t.innerHTML = '🧪 Add tests — ' + esc((p && p.name) || LAB.bmhId); } else if (t.dataset.bmhTxt) t.innerHTML = t.dataset.bmhTxt; }
  }
  function endLab() {
    if (!LAB) return;
    try { SELECTED_INVESTIGATIONS.length = 0; LAB.saved.forEach(function (x) { SELECTED_INVESTIGATIONS.push(x); }); } catch (e) {}
    setLabMode(false); LAB = null;
    try { syncSelectedInvestigationCheckboxes(); } catch (e) {}
  }
  window.bmhLabOpenPanel = function (bmhId) {
    bmhId = bmhId || (document.getElementById('lab-add-pt-bmhid') || {}).value || '';
    if (!bmhId) { toast('Search and select a patient first', 'w'); return; }
    if (!pts().some(function (p) { return p && p.bmhId === bmhId; })) { toast('Patient not loaded — search again', 'w'); return; }
    var saved = []; try { saved = SELECTED_INVESTIGATIONS.slice(); SELECTED_INVESTIGATIONS.length = 0; } catch (e) {}
    LAB = { bmhId: bmhId, saved: saved };
    try { openInvestigationOrderModal('send'); } catch (e) { console.warn(e); }
    try { syncSelectedInvestigationCheckboxes(); } catch (e) {}
    setLabMode(true);
  };
  var origConfirm = window.confirmInvestigations;
  window.confirmInvestigations = function (mode) {
    if (!LAB) return origConfirm.apply(this, arguments);
    var names = []; try { names = SELECTED_INVESTIGATIONS.map(function (x) { return x && x.name; }).filter(Boolean); } catch (e) {}
    if (!names.length) { toast('No investigations selected', 'w'); return; }
    var p = pts().find(function (x) { return x.bmhId === LAB.bmhId; });
    // same order record as "Add Tests", with the test names exactly as in the panel
    var list = Array.isArray(p.investigationOrders) ? p.investigationOrders.slice() : [];
    var key = function (n) { try { return labTestKey(normalizeLabTestName(n)); } catch (e) { return String(n || '').toLowerCase().trim(); } };
    var nowIso = new Date().toISOString(), added = 0;
    names.forEach(function (name, i) {
      if (list.some(function (o) { return o && o.mode === 'send' && !o.done && key(o.name) === key(name); })) return;
      list.push({ id: 'LABMAN' + Date.now() + i, name: name, mode: 'send', date: nowIso.slice(0, 10), orderedAt: nowIso, orderedBy: who(), done: false, labReady: false, doctorSeen: false,
        patient: p.name, bmhId: p.bmhId, dept: p.dept || 'lab', centre: p.centre || '', isManualLabEntry: true });
      added++;
    });
    if (!added) toast('Those tests are already pending for this patient', 'i');
    else {
      p.investigationOrders = list;
      try { fbUpdate('patients/' + p.bmhId, { investigationOrders: list }).catch(function () {}); } catch (e) {}
      try { renderLabOrders(); } catch (e) {}
      toast(added + ' test' + (added === 1 ? '' : 's') + ' added for ' + (p.name || p.bmhId) + ' ✓', 's');
    }
    try { closeM('m-order-invest'); } catch (e) {}
    endLab();
  };
  var origClose = window.closeM;
  if (typeof origClose === 'function') window.closeM = function (id) { var r = origClose.apply(this, arguments); if (id === 'm-order-invest' && LAB) endLab(); return r; };

  // ── delete one test ──
  window.bmhLabDeleteTest = function (orderId, idx) {
    var order = (window.LAB_ORDERS || (typeof LAB_ORDERS !== 'undefined' ? LAB_ORDERS : [])).find(function (o) { return o && o.id === orderId; });
    if (!order) return;
    var test = (order.tests || [])[idx]; if (!test) return;
    var p = pts().find(function (x) { return x && x.bmhId === order.bmhId; }); if (!p) return;
    var day = typeof selectedLabDateKey === 'function' ? selectedLabDateKey() : '';
    var key = function (n) { try { return labTestKey(normalizeLabTestName(n)); } catch (e) { return String(n || '').toLowerCase().trim(); } };
    var list = Array.isArray(p.investigationOrders) ? p.investigationOrders.slice() : [];
    var hit = list.filter(function (r) { return r && r.mode === 'send' && (!day || getLabOrderDateKey(r) === day) && key(r.name) === key(test); });
    if (!hit.length) { toast('Test not found', 'w'); return; }
    var hasResult = hit.some(function (r) { return r.done || r.labReady || (r.results && Object.keys(r.results).length); });
    if (!confirm('Delete "' + test + '" for ' + (p.name || p.bmhId) + '?' + (hasResult ? '\n\nThis test already has results — they will be removed from the lab list too.' : ''))) return;
    p.investigationOrders = list.filter(function (r) { return hit.indexOf(r) < 0; });
    var at = new Date().toISOString(), by = who();
    var del = Array.isArray(p.investigationOrdersDeleted) ? p.investigationOrdersDeleted.slice() : [];
    hit.forEach(function (r) { del.push(Object.assign({}, r, { deletedAt: at, deletedBy: by })); });
    p.investigationOrdersDeleted = del.slice(-50);
    try { fbUpdate('patients/' + p.bmhId, { investigationOrders: p.investigationOrders, investigationOrdersDeleted: p.investigationOrdersDeleted }).catch(function () {}); } catch (e) {}
    try { renderLabOrders(); } catch (e) {}
    toast('"' + test + '" deleted ✓', 's');
  };

  // "🧪 Choose tests" next to Add Tests
  function inject() {
    var btn = document.querySelector('#pg-lab button[onclick="addPatientToLab()"]');
    if (!btn || document.getElementById('lab-choose-tests')) return;
    var b = document.createElement('button'); b.type = 'button'; b.id = 'lab-choose-tests'; b.className = 'btn btn-gold btn-sm'; b.textContent = '🧪 Choose tests';
    b.onclick = function () { window.bmhLabOpenPanel(); };
    btn.parentNode.insertBefore(b, btn);
    var inp = document.getElementById('lab-add-pt-search'); if (inp) inp.placeholder = 'Search by BMSH ID, phone number or name';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject); else inject();
  setTimeout(inject, 1500);
})();
