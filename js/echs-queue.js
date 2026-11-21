/* BMH — Patient queue: ECHS / CGHS / PMJAY / insurance claims are not shown as the patient's due.
 * Claims (ECHS, CGHS, PMJAY, Insurance/TPA, Star Health …) stay in TPA / Cashless dues for reconciliation; in My patient
 * queue and the reception queue they no longer turn into an orange "Due ₹…" badge. The patient's own dues (cash balance,
 * "Credit / Due", TPA patient share) still show as before.
 * An ECHS patient with a no-fee consultation shows "ECHS Patient (No fee consultation)" as it used to.
 * Display only — nothing is saved or changed.
 * Off switch (this browser): localStorage.setItem('bmh_echs_queue_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_echs_queue_off') === '1') return; } catch (e) {}
  var INS = /ECHS|CGHS|PMJAY|Ayushman|Insurance|TPA|Cashless|Star Health/i;
  function isClaim(r) {
    if (!r) return false;
    var m = String(r.mode || '') + ' ' + String(r.ins || '') + ' ' + String(r.tpaCompany || '');
    if (/credit\s*\/\s*due/i.test(String(r.mode || '')) || /patient share/i.test(String(r.for || '') + ' ' + String(r.kind || '') + ' ' + String(r.type || ''))) return false;
    return INS.test(m);
  }
  function install() {
    var ok = true;
    if (typeof window.getQueueDisplayDueState === 'function' && !window.getQueueDisplayDueState._eq) {
      var orig = window.getQueueDisplayDueState;
      var w = function (bmhId) {
        var st = orig.apply(this, arguments);
        try {
          var claims = (st.pendingPRs || []).filter(isClaim);
          if (!claims.length) return st;
          var own = st.pendingPRs.filter(function (r) { return !isClaim(r); });
          var ownAmt = own.reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0);
          var claimAmt = claims.reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0);
          // what the patient owes = the earlier due less what the claims cover
          var due = ownAmt > 0 ? Math.max(ownAmt, Math.max(0, (Number(st.due) || 0) - claimAmt)) : 0;
          return { due: due, pendingPRs: own, paidPRs: st.paidPRs, pendingAmt: ownAmt };
        } catch (e) { return st; }
      };
      w._eq = true; window.getQueueDisplayDueState = w;
    } else if (typeof window.getQueueDisplayDueState !== 'function') ok = false;
    if (typeof window.queueNoFeeConsultationBadge === 'function' && !window.queueNoFeeConsultationBadge._eq) {
      var ob = window.queueNoFeeConsultationBadge;
      var b = function (compact, p) {
        var html = ob.apply(this, arguments);
        try {
          var ins = String((p && (p.ins || p.consultationPaymentMode)) || '');
          if (/ECHS/i.test(ins) || /No fee consultation \([^)]*ECHS/i.test(html)) html = html.replace(/No fee consultation(\s*\([^)]*\))?/, 'ECHS Patient (No fee consultation)');
        } catch (e) {}
        return html;
      };
      b._eq = true; window.queueNoFeeConsultationBadge = b;
    } else if (typeof window.queueNoFeeConsultationBadge !== 'function') ok = false;
    return ok;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
