/* BMH — "Need to Check In" → checked in: always ask Paid consultation or Free consultation.
 * Wherever a Need to Check In patient is checked in — the Check in button (reception or My patient queue), marking seen,
 * changing the purpose in My patient queue, or entering the same patient again at Reception — a pop-up asks:
 *   Paid consultation ₹[amount]   ·   Free consultation (no fee)   ·   Cancel
 * Nothing is checked in and no receipt is made until one is chosen. If a consultation receipt (paid or no-fee) already
 * (or a ₹0 no-fee one) exists for today, no new receipt is made and the pop-up is not shown.
 * Entering a Need to Check In patient again at Reception (same BMSH ID, same department, today) checks in the existing
 * entry instead of making a second one, so the patient never shows twice.
 * The receipt itself is made by the existing check-in code exactly as before.
 * Off switch (this browser): localStorage.setItem('bmh_checkin_fee_choice_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_checkin_fee_choice_off') === '1') return; } catch (e) {}
  var NEED = /need\s*to\s*check\s*in|not\s*checked\s*in/i;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function pt(id) { try { return (PATIENTS || []).find(function (x) { return x && String(x.bmhId) === String(id); }) || null; } catch (e) { return null; } }
  function paidToday(id) { try { return !!patientHasTodayPaidQueueEvidence(id); } catch (e) { return false; } }
  // a consultation receipt for today already exists (paid, or a ₹0 no-fee one) for this patient and department
  function receiptToday(p) {
    try {
      var day = localDateKey(new Date()), dept = normalizeDeptKeyForQueue(p.dept || p.department || '');
      return (TRANSACTIONS || []).some(function (t) {
        if (!t || String(t.bmhId) !== String(p.bmhId) || t.collected === false) return false;
        if (localDateKey(t.date || t.createdAt || t.ts) !== day) return false;
        if (t.dept && normalizeDeptKeyForQueue(t.dept) !== dept) return false;
        var c = (t.billCats || []).indexOf('consultation') >= 0 || /consult|follow|no fee/i.test(String(t.service || ''));
        return c && (Number(t.amount) > 0 || t.noFee === true || /no fee/i.test(String(t.mode || '')));
      });
    } catch (e) { return false; }
  }
  // check in without a new receipt (one already exists today)
  function checkInNoNewReceipt(orig, id) {
    var had = window.patientHasTodayPaidQueueEvidence;
    window.patientHasTodayPaidQueueEvidence = function () { return true; };
    try { return orig(id); } finally { window.patientHasTodayPaidQueueEvidence = had; }
  }
  function preCheckin(p) { try { return !!isQueuePreCheckinPatient(p); } catch (e) { return !!(p && (p.preRegistered || NEED.test(String(p.purpose || '')))); } }
  function defFee(p) { var f = Number(p && p.consultationFee); return f > 0 ? f : 200; }

  // the pop-up: resolves with the fee (0 = free) or null (cancel)
  function ask(p) {
    return new Promise(function (resolve) {
      var old = document.getElementById('cfc-ov'); if (old) old.remove();
      var ov = document.createElement('div'); ov.id = 'cfc-ov';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:100000;display:flex;align-items:center;justify-content:center';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;padding:18px 20px;width:min(420px,92vw);box-shadow:0 18px 50px rgba(0,0,0,.3);font-family:inherit">'
        + '<div style="font-size:15px;font-weight:900;color:#1a3c6e;margin-bottom:2px">Check in ' + esc(p.name || p.bmhId) + '</div>'
        + '<div style="font-size:11.5px;color:#555;margin-bottom:12px">' + esc(p.bmhId || '') + ' · Is this a paid or a free consultation?</div>'
        + '<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">'
        + '<button type="button" id="cfc-paid" style="flex:1;background:#1a3c6e;color:#fff;border:none;border-radius:9px;padding:10px;font-weight:900;font-size:13px;cursor:pointer">Paid consultation</button>'
        + '<span style="font-size:13px;font-weight:800">₹</span><input id="cfc-amt" type="number" min="1" value="' + defFee(p) + '" style="width:80px;padding:8px;border:1.5px solid #c7c7cc;border-radius:8px;font-size:13px;font-weight:800"></div>'
        + '<button type="button" id="cfc-free" style="width:100%;background:#e8f7ee;color:#1a7a4a;border:1.5px solid #34c759;border-radius:9px;padding:10px;font-weight:900;font-size:13px;cursor:pointer;margin-bottom:8px">Free consultation (no fee)</button>'
        + '<button type="button" id="cfc-cancel" style="width:100%;background:#f2f2f7;color:#333;border:none;border-radius:9px;padding:8px;font-weight:700;font-size:12px;cursor:pointer">Cancel — keep as Need to Check In</button></div>';
      document.body.appendChild(ov);
      function done(v) { ov.remove(); resolve(v); }
      ov.querySelector('#cfc-paid').onclick = function () { var a = Number(ov.querySelector('#cfc-amt').value); if (!(a > 0)) { ov.querySelector('#cfc-amt').focus(); return; } done(a); };
      ov.querySelector('#cfc-free').onclick = function () { done(0); };
      ov.querySelector('#cfc-cancel').onclick = function () { done(null); };
    });
  }
  // run the existing check-in with the chosen fee in place of its old "type the fee" box
  function runCheckIn(orig, id, fee) {
    var savedPrompt = window.prompt;
    window.prompt = function () { return String(fee); };
    try { return orig(id); } finally { window.prompt = savedPrompt; }
  }

  function install() {
    if (typeof window.checkInPatient !== 'function' || window.checkInPatient._cfc) return false;
    var origCheckIn = window.checkInPatient;
    var w = function (bmhId) {
      var p = pt(bmhId); if (!p) return origCheckIn(bmhId);
      if (paidToday(bmhId)) return origCheckIn(bmhId);
      if (receiptToday(p)) return checkInNoNewReceipt(origCheckIn, bmhId);
      return ask(p).then(function (fee) { if (fee === null) return; return runCheckIn(origCheckIn, bmhId, fee); });
    };
    w._cfc = true; window.checkInPatient = w;

    // My patient queue: purpose changed from Need to Check In to a real purpose = check in
    if (typeof window.setQueueVisitPurpose === 'function' && !window.setQueueVisitPurpose._cfc) {
      var origSet = window.setQueueVisitPurpose;
      var s = function (bmhId, purpose) {
        var p = pt(bmhId);
        if (!p || NEED.test(String(purpose || '')) || !preCheckin(p)) return origSet(bmhId, purpose);
        if (paidToday(bmhId)) { origSet(bmhId, purpose); return origCheckIn(bmhId); }
        if (receiptToday(p)) { origSet(bmhId, purpose); return checkInNoNewReceipt(origCheckIn, bmhId); }
        return ask(p).then(function (fee) {
          if (fee === null) { try { renderDocQueue && renderDocQueue(); renderReceptionPage && renderReceptionPage(); } catch (e) {} return; }
          origSet(bmhId, purpose);
          return runCheckIn(origCheckIn, bmhId, fee);
        });
      };
      s._cfc = true; window.setQueueVisitPurpose = s;
    }

    // Reception: the same Need to Check In patient entered again (same BMSH ID, department, today) → check in that entry
    if (typeof window.registerPatient === 'function' && !window.registerPatient._cfc) {
      var origReg = window.registerPatient;
      var r = function () {
        try {
          var uid = String((document.getElementById('rc-uid') || {}).textContent || '').trim();
          var dept = (document.getElementById('rc-dept') || {}).value || '';
          var purpose = (document.getElementById('rc-purpose') || {}).value || '';
          var fn = String((document.getElementById('rc-fn') || {}).value || '').trim().toLowerCase();
          var p = uid ? pt(uid) : null;
          var sameDept = p && normalizeDeptKeyForQueue(p.dept || p.department || '') === normalizeDeptKeyForQueue(dept);
          var sameName = p && fn && String(p.name || '').toLowerCase().indexOf(fn) === 0;
          var today = p && patientQueueDateMatchesToday(p) && !p.queueRemoved;
          if (p && sameDept && sameName && today && preCheckin(p) && !NEED.test(purpose)) {
            return Promise.resolve(w(uid)).then(function () { return p; });
          }
        } catch (e) {}
        return origReg.apply(this, arguments);
      };
      r._cfc = true; window.registerPatient = r;
    }
    return true;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
