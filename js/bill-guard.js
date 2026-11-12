/* BMH — Billing: warning before the same bill is saved twice.
 * Before "Save (RTDB)" / "Save & Print", the bill being saved is compared with the patient's bills of the last 30 days
 * (saved bills, deleted ones ignored). Same service (name and amount) → a warning with the earlier bill, what was paid
 * and any balance. Cancel = nothing is saved (and the previous-balance box opens if there is a balance).
 * Reads only. Off switch (this browser): localStorage.setItem('bmh_bill_guard_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_bill_guard_off') === '1') return; } catch (e) {}
  var DAYS = 30;
  function rs(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function fmtD(v) { var d = new Date(v); return isNaN(d) ? String(v || '') : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }
  function selected() { return (document.getElementById('bmh-bill-pt-select') || {}).value || window._bmhSelectedBillPatient || ''; }
  function itemsOf(b) { var it = b && b.items; return Array.isArray(it) ? it : (it && typeof it === 'object' ? Object.values(it) : []); }
  function recentBills(bmhId) {
    var since = Date.now() - DAYS * 86400e3, m = {};
    var add = function (b) { if (!b || b.bmhId !== bmhId || String(b.status || '').toLowerCase() === 'void') return; var t = Date.parse(b.createdAt || b.date || '') || 0; if (t && t < since) return; m[b.id || b.billNo] = b; };
    (window.BMH_SAVED_BILLS || []).concat(window.BILLS || []).forEach(add);
    if (!window.FBDB) return Promise.resolve(Object.values(m));
    var p = window.FBDB.ref('savedBills').once('value').then(function (s) { var v = s.val() || {}; Object.keys(v).forEach(function (k) { var b = v[k]; if (b && !b.id) b.id = k; add(b); }); return Object.values(m); });
    return Promise.race([p, new Promise(function (r) { setTimeout(function () { r(Object.values(m)); }, 4000); })]).catch(function () { return Object.values(m); });
  }
  function sameItems(a, b) {
    var keys = function (bill) { return itemsOf(bill).map(function (i) { return norm(i.desc || i.name) + '|' + Math.round(Number(i.amount) || 0); }).filter(function (k) { return k.length > 2; }); };
    var ka = keys(a), kb = keys(b);
    return ka.some(function (k) { return kb.indexOf(k) >= 0; });
  }
  function guard(orig) {
    return function () {
      var self = this, args = arguments, id = selected();
      if (!id || typeof bmhBuildBillPayloadFromUi !== 'function') return orig.apply(self, args);
      var draft = null; try { draft = bmhBuildBillPayloadFromUi(id, { status: 'check' }); } catch (e) { return orig.apply(self, args); }
      return recentBills(id).then(function (bills) {
        var dup = bills.filter(function (b) { return sameItems(draft, b); }).sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); });
        if (!dup.length) return orig.apply(self, args);
        var bal = typeof window.bmhDuesBalance === 'function' ? Number(window.bmhDuesBalance(id)) || 0 : 0;
        var lines = dup.slice(0, 3).map(function (b) {
          var paid = (Number(b.amountReceived) || 0) + (Number(b.advanceApplied) || 0), left = Math.max(0, (Number(b.netPayable) || 0) - (Number(b.tpaAmount) || 0) - paid);
          return '• ' + (b.billNo || b.id) + ' · ' + fmtD(b.createdAt || b.date) + ' · bill ' + rs(b.netPayable) + ' · paid ' + rs(paid) + (left > 0 ? ' · balance ' + rs(left) : '');
        }).join('\n');
        var msg = '⚠ This looks like a bill already saved for ' + (draft.patientName || id) + ':\n\n' + lines
          + '\n\nSaving now will bill the same service again.'
          + (bal > 0 ? '\nIf the patient is paying the remaining balance (' + rs(bal) + '), press Cancel and take it in the Previous balance box.' : '')
          + '\n\nOK = save this bill anyway\nCancel = don\'t save';
        if (confirm(msg)) return orig.apply(self, args);
        try { showToast('Bill not saved', 'w'); } catch (e) {}
        if (bal > 0 && typeof window.bmhDuesOpen === 'function') window.bmhDuesOpen(id);
      });
    };
  }
  ['bmhSaveBillToRtdbOnly', 'bmhSaveAndPrintBill'].forEach(function (fn) {
    if (typeof window[fn] === 'function' && !window[fn].__bmhGuard) { var w = guard(window[fn]); w.__bmhGuard = true; window[fn] = w; }
  });
})();
