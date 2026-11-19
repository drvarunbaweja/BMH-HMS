/* BMH — a patient the doctor has already seen, or whose history / examination is saved today, is never taken out of
 * My patient queue by a delete at Reception.
 *   – Queue "delete" (remove from today's queue and charges): only today's reception consultation charges of that
 *     department are removed (and the visit set to no-fee so no ₹ row comes back); the entry stays in the queue.
 *   – Charges → deleting a "recovered OPD collection" row (₹ worked out from the patient's fee, no saved receipt):
 *     the visit is set to no-fee (₹0) instead, so the row goes away and the patient stays in the queue.
 * "Seen / saved today" = marked seen today in that department, or a visit record for today in that department.
 * Patients not yet seen and with nothing saved are deleted exactly as before.
 * Off switch (this browser): localStorage.setItem('bmh_queue_protect_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_queue_protect_off') === '1') return; } catch (e) {}
  function day() { try { return localDateKey(new Date()); } catch (e) { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } }
  function dk(v) { try { return normalizeDeptKeyForQueue(v || ''); } catch (e) { return String(v || '').toLowerCase(); } }
  function ldk(v) { try { return localDateKey(v); } catch (e) { return ''; } }
  function pt(id) { try { return (PATIENTS || []).find(function (x) { return x && String(x.bmhId) === String(id); }) || null; } catch (e) { return null; } }
  function toast(m, t) { try { showToast(m, t || 'w'); } catch (e) { alert(m); } }
  function seenToday(p, dept) {
    var sb = (p && (p.seenByDept || p.deptSeenAt)) || {};
    if (dept && sb[dept] && ldk(sb[dept]) === day()) return true;
    if (p && p.seen && p.seenAt && ldk(p.seenAt) === day() && (!dept || dk(p.dept || p.department) === dept)) return true;
    try {
      var v = (typeof getCachedPatientVisits === 'function' ? getCachedPatientVisits(p.bmhId) : null) || {};
      if (Object.keys(v).some(function (k) { var x = v[k] || {}; return ldk(x.date || x.visitDate || x.savedAt) === day() && (!dept || !x.dept || dk(x.dept) === dept); })) return true;
    } catch (e) {}
    return false;
  }
  // also ask the database for a visit saved today (another computer may have saved it)
  function visitToday(p, dept) {
    if (!p || !window.FBDB) return Promise.resolve(false);
    var start = new Date(); start.setHours(0, 0, 0, 0);
    var q = window.FBDB.ref('visits/' + p.bmhId).orderByKey().startAt('V' + start.getTime()).once('value').then(function (s) {
      var v = s.val() || {}; return Object.keys(v).some(function (k) { var x = v[k] || {}; return ldk(x.date || x.visitDate || x.savedAt || start) === day() && (!dept || !x.dept || dk(x.dept) === dept); });
    }).catch(function () { return false; });
    var t = new Promise(function (res) { setTimeout(function () { res(false); }, 4000); });
    return Promise.race([q, t]);
  }
  function isProtected(p, dept) { if (!p) return Promise.resolve(false); if (seenToday(p, dept)) return Promise.resolve(true); return visitToday(p, dept); }

  // seen / history entered: remove only today's reception consultation charges of this department; the visit stays
  function removeChargesOnly(p, dept, by) {
    var id = String(p.bmhId), day = (typeof todayKey === 'function') ? todayKey() : localDateKey(new Date()), nowIso = new Date().toISOString();
    var nT = 0, nR = 0, nC = 0;
    try {
      for (var i = TRANSACTIONS.length - 1; i >= 0; i -= 1) {
        var t = TRANSACTIONS[i];
        if (!bmhIsTodayReceptionConsultationTxn(t, id, day) || !bmhRowIsDept(t, dept, dept)) continue;
        TRANSACTIONS.splice(i, 1); nT++;
        try { if (window.firebase && firebase.database) firebase.database().ref('transactions/' + day + '/' + t.id).remove(); } catch (e) {}
      }
      for (var j = PAY_REQUESTS.length - 1; j >= 0; j -= 1) {
        var pr = PAY_REQUESTS[j];
        if (!bmhIsTodayReceptionConsultationRequest(pr, id, day) || !bmhRowIsDept(pr, dept, dept)) continue;
        PAY_REQUESTS.splice(j, 1); nR++;
        try { if (window.firebase && firebase.database) firebase.database().ref('payRequests/' + pr.id).remove(); } catch (e) {}
      }
      try { var rc = bmhRemoveTodayReceptionOpdChargeRows(id, day, dept); nC = Array.isArray(rc) ? rc.length : (Number(rc) || 0); } catch (e) {}
    } catch (e) {}
    // no fee left on today's visit, so no ₹ row is worked out again from the patient's fee
    var patch = { consultationNoFee: true, consultationFee: 0, consultationFeeType: 'no-fee', consultationFeeLabel: 'No Fee Consultation', consultationPaymentMode: 'No Fee', updatedAt: nowIso };
    Object.assign(p, patch);
    try { if (window.firebase && firebase.database) firebase.database().ref('patients/' + id).update(patch); } catch (e) {}
    try { saveTodayTransactionsToLocal && saveTodayTransactionsToLocal(); } catch (e) {}
    try { saveBmhFinancials && saveBmhFinancials(); } catch (e) {}
    try { if (typeof bmhSyncPatientRunningBalance === 'function') bmhSyncPatientRunningBalance(id); } catch (e) {}
    try { fbPush && fbPush('auditLog', { user: (CURRENT_USER && CURRENT_USER.name) || by || 'Staff', role: (CURRENT_USER && CURRENT_USER.role) || '', action: 'QUEUE_DELETE_CHARGES_ONLY_SEEN', item: (p.name || '') + ' · ' + id, details: { dept: dept, receipts: nT, requests: nR, chargeRows: nC }, timestamp: nowIso }); } catch (e) {}
    try { renderDocQueue && renderDocQueue(); renderReceptionPage && renderReceptionPage(); renderCollectionDashboard && renderCollectionDashboard(); renderChargesList && renderChargesList(); renderDeptSummary && renderDeptSummary(); renderDashboard && renderDashboard(); } catch (e) {}
    toast((p.name || id) + ': today\'s charges removed — already seen / history entered, so the entry stays in My patient queue ✓', 's');
  }
  function install() {
    var ok = true;
    if (typeof window.bmhRemovePatientFromTodayQueueAndCharges === 'function' && !window.bmhRemovePatientFromTodayQueueAndCharges._qp) {
      var origRemove = window.bmhRemovePatientFromTodayQueueAndCharges;
      var r = function (bmhId, opts) {
        var p = pt(bmhId), self = this, args = arguments; if (!p) return origRemove.apply(self, args);
        var dept = dk(p.dept || p.department);
        return isProtected(p, dept).then(function (yes) {
          if (yes) { removeChargesOnly(p, dept, (opts && opts.by) || ''); return true; }
          return origRemove.apply(self, args);
        });
      };
      r._qp = true; window.bmhRemovePatientFromTodayQueueAndCharges = r;
    } else if (typeof window.bmhRemovePatientFromTodayQueueAndCharges !== 'function') ok = false;

    if (typeof window.bmhDeleteSyntheticCollectionTxn === 'function' && !window.bmhDeleteSyntheticCollectionTxn._qp) {
      var origSyn = window.bmhDeleteSyntheticCollectionTxn;
      var s = function (txnId) {
        var row = null; try { row = bmhFindSyntheticCollectionTxn(txnId); } catch (e) {}
        var synthetic = row && (row.type === 'consultation-synthetic' || String(row.id || '').indexOf('SYNOPD-') === 0) && !(row.source === 'pay-request' || row.payRequestId) && !(row.source === 'saved-bill' || row.billId);
        var p = synthetic ? pt(row.bmhId) : null, self = this, args = arguments;
        if (!p) return origSyn.apply(self, args);
        var dept = dk(row.dept || p.dept || p.department);
        return isProtected(p, dept).then(function (yes) {
          if (!yes) return origSyn.apply(self, args);
          if (!confirm((p.name || p.bmhId) + ' has already been seen / history entered today.\n\nThis ₹' + Number(row.amount || 0).toLocaleString('en-IN') + ' row has no saved receipt. Mark today\'s visit as no-fee (₹0) instead?\nThe patient stays in My patient queue.')) return true;
          var nowIso = new Date().toISOString();
          var patch = { consultationNoFee: true, consultationFee: 0, consultationFeeType: 'no-fee', consultationFeeLabel: 'No Fee Consultation', consultationPaymentMode: 'No Fee', updatedAt: nowIso };
          Object.assign(p, patch);
          try { if (window.firebase && firebase.database) firebase.database().ref('patients/' + p.bmhId).update(patch); } catch (e) {}
          try { fbPush && fbPush('auditLog', { user: (CURRENT_USER && CURRENT_USER.name) || 'Staff', role: (CURRENT_USER && CURRENT_USER.role) || '', action: 'SYNTHETIC_OPD_SET_NO_FEE_SEEN', item: (p.name || '') + ' · ' + p.bmhId, timestamp: nowIso }); } catch (e) {}
          toast((p.name || p.bmhId) + ': today\'s visit set to no-fee — stays in My patient queue ✓', 's');
          try { renderCollectionDashboard && renderCollectionDashboard(); renderReceptionPage && renderReceptionPage(); renderDocQueue && renderDocQueue(); } catch (e) {}
          return true;
        });
      };
      s._qp = true; window.bmhDeleteSyntheticCollectionTxn = s;
    } else if (typeof window.bmhDeleteSyntheticCollectionTxn !== 'function') ok = false;
    return ok;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
