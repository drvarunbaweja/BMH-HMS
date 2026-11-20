/* BMH — Billing: warning before the same bill is saved twice.
 * Before "Save (RTDB)" / "Save & Print", the bill being saved is compared with the patient's bills of the last 60 days
 * (saved bills, deleted ones ignored). A warning with the earlier bill, what was paid and any balance appears when
 *   – the same procedure / surgery is in it (by NAME — the amount may differ, e.g. after part payment), or
 *   – any bill was saved for this patient in the last 15 minutes.
 * v174: the warning asks  [Second eye — save]  [Something else — save]  [Cancel — don't save]; the choice goes to the
 * audit log. Cancel = nothing is saved (and the previous-balance box opens if there is a balance).
 * A second press of Save while a save is still running is ignored (bills were being saved twice seconds apart).
 * Reads only. Off switch (this browser): localStorage.setItem('bmh_bill_guard_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_bill_guard_off') === '1') return; } catch (e) {}
  var DAYS = 60, RECENT_MS = 15 * 60 * 1000, inFlight = false;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function isConsult(i) { return /consultation/i.test(String(i.cat || '')) || /consult|follow[- ]?up|registration/i.test(String(i.desc || i.name || '')); }
  function rs(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function fmtD(v) { var d = new Date(v); return isNaN(d) ? String(v || '') : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }
  function selected() { return (document.getElementById('bmh-bill-pt-select') || {}).value || window._bmhSelectedBillPatient || ''; }
  function itemsOf(b) { var it = b && b.items; if (typeof it === 'string') { try { it = JSON.parse(it); } catch (e) { it = []; } } return Array.isArray(it) ? it : (it && typeof it === 'object' ? Object.values(it) : []); }
  function recentBills(bmhId) {
    var since = Date.now() - DAYS * 86400e3, m = {};
    var add = function (b) { if (!b || b.bmhId !== bmhId || String(b.status || '').toLowerCase() === 'void') return; var t = Date.parse(b.createdAt || b.date || '') || 0; if (t && t < since) return; m[b.id || b.billNo] = b; };
    (window.BMH_SAVED_BILLS || []).concat(window.BILLS || []).forEach(add);
    if (!window.FBDB) return Promise.resolve(Object.values(m));
    var p = window.FBDB.ref('savedBills').once('value').then(function (s) { var v = s.val() || {}; Object.keys(v).forEach(function (k) { var b = v[k]; if (b && !b.id) b.id = k; add(b); }); return Object.values(m); });
    return Promise.race([p, new Promise(function (r) { setTimeout(function () { r(Object.values(m)); }, 4000); })]).catch(function () { return Object.values(m); });
  }
  function sameItems(a, b) {
    var keys = function (bill) { return itemsOf(bill).filter(function (i) { return !isConsult(i); }).map(function (i) { return norm(String(i.desc || i.name || '').replace(/^nd:?\s*/i, '')); }).filter(function (k) { return k.length > 2; }); };
    var ka = keys(a), kb = keys(b);
    return ka.some(function (k) { return kb.indexOf(k) >= 0; });
  }
  function billTime(b) { var t = Date.parse(b.createdAt || b.date || ''); if (isNaN(t)) { var m = String(b.id || '').match(/(\d{13})/); t = m ? Number(m[1]) : 0; } return t; }
  function ask(name, lines, sameProc, bal) {
    return new Promise(function (resolve) {
      var ov = document.createElement('div'); ov.id = 'bdg-ov';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:100002;display:flex;align-items:center;justify-content:center';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;padding:18px 20px;width:min(500px,92vw);box-shadow:0 18px 50px rgba(0,0,0,.3)">'
        + '<div style="font-size:15px;font-weight:900;color:#c62828">⚠️ A bill is already saved for ' + esc(name) + '</div>'
        + '<div style="margin:8px 0;padding:7px 9px;background:#f6f8fb;border-radius:8px;font-size:11.5px;line-height:1.6">' + lines.map(esc).join('<br>') + '</div>'
        + '<div style="font-size:12px;color:#333;margin-bottom:10px">' + (sameProc ? '<b style="color:#c62828">The same procedure is in this new bill.</b> ' : '') + 'Saving again will bill it twice. Save only if it is the other eye or something else.'
        + (bal > 0 ? '<br>If the patient is paying the remaining balance (' + esc(rs(bal)) + '), press Cancel and take it in the Previous balance box.' : '') + '</div>'
        + '<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" id="bdg-eye" style="flex:1;background:#1a3c6e;color:#fff;border:none;border-radius:9px;padding:10px;font-weight:900;cursor:pointer">Second eye — save</button>'
        + '<button type="button" id="bdg-else" style="flex:1;background:#1a7a4a;color:#fff;border:none;border-radius:9px;padding:10px;font-weight:900;cursor:pointer">Something else — save</button></div>'
        + '<button type="button" id="bdg-cancel" style="width:100%;margin-top:8px;background:#f2f2f7;color:#333;border:none;border-radius:9px;padding:9px;font-weight:800;cursor:pointer">Cancel — don\'t save</button></div>';
      document.body.appendChild(ov);
      function done(v) { ov.remove(); resolve(v); }
      ov.querySelector('#bdg-eye').onclick = function () { done('second eye'); };
      ov.querySelector('#bdg-else').onclick = function () { done('something else'); };
      ov.querySelector('#bdg-cancel').onclick = function () { done(null); };
    });
  }
  function guard(orig) {
    return function () {
      var self = this, args = arguments, id = selected();
      if (inFlight) { try { showToast('Bill is already being saved…', 'i'); } catch (e) {} return; }
      if (!id || typeof bmhBuildBillPayloadFromUi !== 'function') return orig.apply(self, args);
      var draft = null; try { draft = bmhBuildBillPayloadFromUi(id, { status: 'check' }); } catch (e) { return orig.apply(self, args); }
      inFlight = true;
      var release = function () { setTimeout(function () { inFlight = false; }, 1500); };
      return recentBills(id).then(function (bills) {
        var now = Date.now();
        var dup = bills.filter(function (b) { return sameItems(draft, b) || (now - billTime(b) < RECENT_MS); }).sort(function (a, b) { return billTime(b) - billTime(a); });
        if (!dup.length) return orig.apply(self, args);
        var sameProc = dup.some(function (b) { return sameItems(draft, b); });
        var bal = typeof window.bmhDuesBalance === 'function' ? Number(window.bmhDuesBalance(id)) || 0 : 0;
        var lines = dup.slice(0, 3).map(function (b) {
          var paid = (Number(b.amountReceived) || 0) + (Number(b.advanceApplied) || 0), left = Math.max(0, (Number(b.netPayable) || 0) - (Number(b.tpaAmount) || 0) - paid);
          var its = itemsOf(b).map(function (i) { return i.desc || i.name; }).filter(Boolean).join(', ');
          return (b.billNo || b.id) + ' · ' + fmtD(billTime(b) || b.createdAt || b.date) + ' · bill ' + rs(b.netPayable) + ' · paid ' + rs(paid) + (left > 0 ? ' · balance ' + rs(left) : '') + (its ? ' · ' + its : '');
        });
        return ask(draft.patientName || id, lines, sameProc, bal).then(function (why) {
          if (why) {
            try { fbPush && fbPush('auditLog', { user: (CURRENT_USER && CURRENT_USER.name) || 'Staff', role: (CURRENT_USER && CURRENT_USER.role) || '', action: 'BILL_SAVED_AGAIN_CONFIRMED', item: id + ' — ' + why + ' (earlier ' + (dup[0].billNo || dup[0].id) + ')', timestamp: new Date().toISOString() }); } catch (e) {}
            return orig.apply(self, args);
          }
          try { showToast('Bill not saved', 'w'); } catch (e) {}
          if (bal > 0 && typeof window.bmhDuesOpen === 'function') window.bmhDuesOpen(id);
        });
      }).then(function (r) { release(); return r; }, function (e) { release(); throw e; });
    };
  }
  ['bmhSaveBillToRtdbOnly', 'bmhSaveAndPrintBill'].forEach(function (fn) {
    if (typeof window[fn] === 'function' && !window[fn].__bmhGuard) { var w = guard(window[fn]); w.__bmhGuard = true; window[fn] = w; }
  });
})();
