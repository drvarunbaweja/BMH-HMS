/* BMH — same patient in two departments on the same day.
 * 1) Keep both queue entries: some saves write the whole patient record (e.g. editing details or registering
 *    again at reception). If that device's copy was a little old, the other department's queue entry or a
 *    referral added elsewhere could be overwritten and the patient vanished from that department's My Queue.
 *    Before such a full save, today's department entries and referrals already in the database are merged in.
 * 2) Payment label per department: a "Paid" consultation in one department no longer shows as "Paid" on the
 *    patient's row in the other department where the consultation was "No fee" (and vice versa).
 *    Only applies when the patient is in more than one department today; single-department rows are unchanged.
 */
(function () {
  'use strict';
  function stamp(r) { return Date.parse((r && (r.updatedAt || r.seenAt || r.restoredAt || r.createdAt)) || '') || 0; }
  function mergeById(local, remote) {
    var a = Array.isArray(local) ? local : [], b = Array.isArray(remote) ? remote : (remote && typeof remote === 'object' ? Object.keys(remote).map(function (k) { return remote[k]; }) : []);
    if (!b.length) return null;
    var map = {}, order = [];
    a.forEach(function (r) { if (!r) return; var k = String(r.id || ''); if (!k) { order.push(r); return; } map[k] = r; order.push(k); });
    var changed = false;
    b.forEach(function (r) {
      if (!r) return; var k = String(r.id || ''); if (!k) return;
      if (!(k in map)) { map[k] = r; order.push(k); changed = true; }
      else if (stamp(r) > stamp(map[k])) { map[k] = r; changed = true; }
    });
    return changed ? order.map(function (k) { return typeof k === 'string' ? map[k] : k; }) : null;
  }
  function todayRelevant(p) {
    try { return patientQueueDateMatchesToday(p) || (Array.isArray(p.deptQueueEntries) && p.deptQueueEntries.length) || (Array.isArray(p.crossRefs) && p.crossRefs.length); } catch (e) { return true; }
  }
  var origSave = window.savePatientToFirebase;
  if (typeof origSave === 'function') {
    window.savePatientToFirebase = function (patient) {
      var self = this, args = arguments;
      if (!patient || !patient.bmhId || !window.FBDB || !todayRelevant(patient)) return origSave.apply(self, args);
      var done = false;
      var go = function (remote) {
        if (done) return; done = true;
        try {
          if (remote && typeof remote === 'object') {
            var dq = mergeById(patient.deptQueueEntries, remote.deptQueueEntries);
            if (dq) patient.deptQueueEntries = dq;
            var xr = mergeById(patient.crossRefs, remote.crossRefs);
            if (xr) patient.crossRefs = xr;
          }
        } catch (e) { console.warn('[queue-fix] merge skipped', e); }
        return origSave.apply(self, args);
      };
      return new Promise(function (resolve) {
        var t = setTimeout(function () { resolve(go(null)); }, 1500);
        try {
          window.FBDB.ref('patients/' + patient.bmhId).once('value').then(function (s) { clearTimeout(t); resolve(go(s && s.val ? s.val() : null)); }, function () { clearTimeout(t); resolve(go(null)); });
        } catch (e) { clearTimeout(t); resolve(go(null)); }
      });
    };
  }

  // ── per-department payment label ──
  var rowDept = '', rowBmh = '';
  function dk(v) { try { return normalizeDeptKeyForQueue(v || ''); } catch (e) { return String(v || '').toLowerCase(); } }
  function src(bmhId) { try { return (PATIENTS || []).find(function (p) { return p && p.bmhId === bmhId; }) || null; } catch (e) { return null; } }
  function multiDept(bmhId) {
    var p = src(bmhId); if (!p) return false;
    var n = 0;
    try { n += getDeptQueueEntriesForPatient(p).length; } catch (e) {}
    try { n += getActiveCrossRefsForPatient(p).filter(function (x) { return crossRefQueueDateMatchesToday(x); }).length; } catch (e) {}
    return n > 0;
  }
  function today() { try { return localDateKey(new Date()); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  function txnsFor(bmhId) { try { return (TRANSACTIONS || []).filter(function (t) { return t && t.bmhId === bmhId; }); } catch (e) { return []; } }
  function reqsFor(bmhId) { try { return (PAY_REQUESTS || []).filter(function (r) { return r && r.bmhId === bmhId; }); } catch (e) { return []; } }
  ['buildQCard', 'buildQTableRow'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function (p) {
      var prevD = rowDept, prevB = rowBmh;
      try { rowDept = p ? dk(p._queueDept || p.dept || p.department || '') : ''; rowBmh = p && multiDept(p.bmhId) ? p.bmhId : ''; } catch (e) { rowDept = ''; rowBmh = ''; }
      try { return o.apply(this, arguments); } finally { rowDept = prevD; rowBmh = prevB; }
    };
  });
  var origPaid = window.getQueuePaidServiceEntries;
  if (typeof origPaid === 'function') {
    window.getQueuePaidServiceEntries = function (bmhId) {
      var list = origPaid.apply(this, arguments) || [];
      if (!rowDept || bmhId !== rowBmh) return list;
      var deptOf = {};
      txnsFor(bmhId).forEach(function (t) { deptOf['txn-' + String(t.id || t.date)] = dk(t.dept || t.department || ''); });
      reqsFor(bmhId).forEach(function (r) { deptOf['pr-' + String(r.id || r.date)] = dk(r.dept || r.xrefDept || ''); });
      return list.filter(function (e) { var d = deptOf[e.key]; return !d || d === rowDept; });
    };
  }
  var origNoFee = window.patientHasNoFeeConsultation;
  if (typeof origNoFee === 'function') {
    window.patientHasNoFeeConsultation = function (p) {
      if (!p || !rowDept || p.bmhId !== rowBmh) return origNoFee.apply(this, arguments);
      var t = today();
      var deptTx = txnsFor(p.bmhId).filter(function (x) { return dk(x.dept || x.department || '') === rowDept && String(x.date || x.createdAt || '').slice(0, 10) <= t; });
      if (deptTx.some(function (x) { return x.noFee === true || /\b(no fee|free|waiv)/i.test(String(x.service || x.for || x.desc || x.mode || '')); })) return true;
      var s = src(p.bmhId) || p;
      // the patient-level "no fee" flag belongs to the department of the latest registration
      if ((s.consultationNoFee === true || String(s.consultationFeeType || '').toLowerCase() === 'no-fee') && dk(s.dept || s.department || '') === rowDept) return true;
      return false;
    };
  }
})();
