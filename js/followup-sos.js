/* BMH — Prescription → Next Appointment: an "S.O.S." button after the D / W / M buttons (every department).
 * S.O.S. clears the follow-up date and the prescription prints "S.O.S. / Whenever required" where the next visit
 * date would be (and in the eye case sheet). Picking a date or a D / W / M button afterwards replaces it.
 * It applies to the patient on screen only; opening another patient starts without it.
 * Off switch (this browser): localStorage.setItem('bmh_followup_sos_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_followup_sos_off') === '1') return; } catch (e) {}
  var TEXT = 'S.O.S. / Whenever required';
  var SOS = {}; // dept → bmhId
  var WRAP = { oe: '#pg-ophtho #oe-rx', obg: '#pg-obg #obg-rx', psych: '#pg-psych #psych-rx', skin: '#pg-skin #skin-rx' };
  function pid() { try { return (window.CURRENT_PATIENT && CURRENT_PATIENT.bmhId) || ''; } catch (e) { return ''; } }
  function deptOf(el) {
    if (el.closest('#pg-ophtho')) return 'oe'; if (el.closest('#pg-obg')) return 'obg'; if (el.closest('#pg-psych')) return 'psych'; if (el.closest('#pg-skin')) return 'skin';
    try { var d = activeClinicDeptKey(); return d === 'ophtho' ? 'oe' : d; } catch (e) { return 'oe'; }
  }
  function norm(d) { d = String(d || '').toLowerCase(); return d === 'ophtho' || d === 'eye' ? 'oe' : d; }
  window.bmhFollowupSos = function (dept) { var d = norm(dept); return !!SOS[d] && SOS[d] === pid(); };
  window.bmhFollowupSosText = function (dept) { return window.bmhFollowupSos(dept) ? TEXT : ''; };
  function input(d) { try { return getDeptFollowUpDateInput(d); } catch (e) { return null; } }
  function display(d) { try { return getDeptFollowUpDisplayEl(d); } catch (e) { return null; } }
  function mark(d, on) {
    if (on) SOS[d] = pid(); else delete SOS[d];
    Array.prototype.forEach.call(document.querySelectorAll('.fus-btn[data-d="' + d + '"]'), function (b) { b.className = 'btn btn-xs fus-btn ' + (on ? 'btn-blue' : 'btn-gray'); });
  }
  window.bmhFollowupSosSet = function (btn) {
    var d = deptOf(btn), on = !window.bmhFollowupSos(d);
    mark(d, on);
    if (on) {
      var i = input(d); if (i) { i.value = ''; i.dispatchEvent(new Event('input', { bubbles: true })); i.dispatchEvent(new Event('change', { bubbles: true })); }
      mark(d, true); // the change event above clears it — set again
      var s = display(d); if (s) { s.textContent = '🆘 ' + TEXT; s.style.color = 'var(--bmh-blue)'; s.style.fontWeight = '800'; }
    } else { var s2 = display(d); if (s2) s2.textContent = ''; }
  };
  // a date chosen afterwards replaces S.O.S.
  document.addEventListener('change', function (e) { var t = e.target; if (t && t.id === 'rx-fu-date' && t.value) mark(deptOf(t), false); }, true);
  function wrapSet() {
    var o = window.setFollowupDays; if (typeof o !== 'function' || o._fus) return typeof o === 'function';
    var w = function () { try { var d = activeClinicDeptKey(); mark(d === 'ophtho' ? 'oe' : d, false); } catch (e) {} return o.apply(this, arguments); };
    w._fus = true; window.setFollowupDays = w; return true;
  }
  function addButtons() {
    Array.prototype.forEach.call(document.querySelectorAll('button[onclick*="setFollowupDays("][onclick*="month"]'), function (b) {
      var row = b.parentNode; if (!row || row.querySelector('.fus-btn')) return;
      var last = [].filter.call(row.querySelectorAll('button[onclick*="month"]'), function () { return true; }).pop();
      var x = document.createElement('button'); x.type = 'button'; x.className = 'btn btn-xs btn-gray fus-btn'; x.textContent = 'S.O.S.'; x.title = 'Follow-up: ' + TEXT;
      x.setAttribute('data-d', deptOf(row)); x.style.marginLeft = '4px'; x.setAttribute('onclick', 'bmhFollowupSosSet(this)');
      (last || b).insertAdjacentElement('afterend', x);
    });
  }
  var n = 0; (function tick() { addButtons(); var ok = wrapSet(); if (++n < 40 && (!ok || n < 6)) setTimeout(tick, 1500); })();
  // the button shows as on only for the patient it was set for
  setInterval(function () { Object.keys(WRAP).forEach(function (d) { var on = window.bmhFollowupSos(d); Array.prototype.forEach.call(document.querySelectorAll('.fus-btn[data-d="' + d + '"]'), function (b) { var want = 'btn btn-xs fus-btn ' + (on ? 'btn-blue' : 'btn-gray'); if (b.className !== want) b.className = want; }); }); addButtons(); }, 3000);
})();
