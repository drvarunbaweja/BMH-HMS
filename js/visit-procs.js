/* BMH — procedures and tests done, shown in Past visits and in the patient summary (📋 from My Queue).
 * Besides what the doctor marked "Procedure done", the visit now also lists the procedures / investigations / surgeries
 * charged to the patient that day (YAG capsulotomy, OCT macula, foreign body removal, injections …), taken from the
 * patient's charges. Consultations, medicines and lab tests are left out. A charge not paid yet is marked "(not paid)".
 * Display only: READS the patient's charges; WRITES nothing.
 * Off switch (this browser): localStorage.setItem('bmh_visit_procs_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_visit_procs_off') === '1') return; } catch (e) {}
  function dayKey(v) {
    if (!v) return '';
    try { var k = localDateKey(v); if (k) return k; } catch (e) {}
    var m = String(v).match(/^(\d{4}-\d{2}-\d{2})/); return m ? m[1] : '';
  }
  function dk(d) { try { return normalizeDeptKeyForQueue(d || ''); } catch (e) { return String(d || '').toLowerCase(); } }
  function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  var loading = {};
  function linesOf(id) {
    var all = window.BMH_PATIENT_CHARGES || {}, ls = all[id];
    if (!ls && !loading[id] && window.FBDB) {
      // not in memory on this computer yet — fetch this one patient's charges once, then redraw what is open
      loading[id] = 1;
      window.FBDB.ref('financials/patientCharges/' + id).once('value').then(function (s) {
        var v = s.val(); if (!v) return;
        window.BMH_PATIENT_CHARGES = window.BMH_PATIENT_CHARGES || {};
        if (!window.BMH_PATIENT_CHARGES[id]) window.BMH_PATIENT_CHARGES[id] = v;
        try { var ov = document.getElementById('m-adv-history'); if (ov && ov.classList.contains('open') && typeof window.bmhShowPatientVisitHistory === 'function') window.bmhShowPatientVisitHistory(id); } catch (e) {}
      }).catch(function () {});
    }
    return Array.isArray(ls) ? ls : Object.values(ls || {});
  }
  function isLabRow(desc) {
    var rows = []; try { rows = (typeof CHARGES_DATA !== 'undefined' ? CHARGES_DATA : window.CHARGES_DATA) || []; } catch (e) {}
    var n = norm(desc);
    return rows.some(function (r) { return r && norm(r.name) === n && /^lab$/i.test(String(r.cat || '')) && String(r.kind || '').toLowerCase() !== 'diagnostic' && String(r.kind || '').toLowerCase() !== 'investigation'; });
  }
  // [{ day, label, paid }] — newest first, one per name per day
  function billed(id) {
    id = String(id || '').trim(); if (!id) return [];
    var seen = {}, out = [];
    linesOf(id).forEach(function (l) {
      if (!l || !l.desc) return;
      if (/inventory/i.test(String(l.source || '')) || l.deleted || l.removed || l.cancelled) return;
      var c = String(l.cat || '').toLowerCase();
      if (c === 'consultation' || c === 'medicine' || c === 'pharmacy' || c === 'lab' || String(l.dept || '').toLowerCase() === 'lab') return;
      var head = typeof window.bmhReportHead === 'function' ? window.bmhReportHead(l.desc) : '';
      if (head && head !== 'procedure' && head !== 'investigation' && head !== 'surgery') return;
      if (isLabRow(l.desc)) return;
      var day = dayKey(l.ts || l.date); if (!day) return;
      var label = typeof window.bmhChargeLabel === 'function' ? window.bmhChargeLabel(l.desc, l.dept) : String(l.desc);
      var key = day + '|' + norm(label);
      var paid = !!l.noFee || Number(l.paidAmount || 0) >= Number(l.amount || 0) - 0.5 || Number(l.amount || 0) <= 0;
      if (seen[key] != null) { if (paid) out[seen[key]].paid = true; return; }
      seen[key] = out.length; out.push({ day: day, label: label, paid: paid, dept: dk(l.dept) });
    });
    return out.sort(function (a, b) { return b.day.localeCompare(a.day); });
  }
  function text(items) { return items.map(function (x) { return x.label + (x.paid ? '' : ' (not paid)'); }).join(', '); }
  // what was charged on the day of this visit and is not already in the "procedure done" text
  function forVisit(id, v, alreadyText) {
    var d = dayKey(v && (v.date || v.visitDate || v.createdAt || v.dateLabel)); if (!d) return '';
    var have = norm(alreadyText), vd = dk(v && v.dept);
    // a visit of one department shows that department's charges (charges without a department are shown with any visit)
    return text(billed(id).filter(function (x) { return x.day === d && !(vd && x.dept && x.dept !== vd) && !(have && have.indexOf(norm(x.label)) >= 0); }));
  }
  function join(a, b) { return [a, b].filter(function (x) { return x && x !== '—'; }).join('; '); }
  window.bmhBilledProcs = billed;
  window.bmhBilledProcsText = text;
  window.bmhVisitBilledDone = forVisit;
  window.bmhJoinDone = join;
})();
