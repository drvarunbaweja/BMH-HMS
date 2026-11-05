/* BMH — centre-restricted stock deduction.
 * 1) Procedure Done: the stock list / store chips show only the stores of the centre where the patient is being
 *    treated (CHD or RPR; stores without a CHD/RPR suffix count as RPR, same rule as the inventory logins).
 *    A "Show other centre's stock too" tick-box lets staff see the other centre if really needed.
 * 2) OT IOL deduction: the IOL is taken from the OT case's centre. If that centre has no matching IOL, staff are
 *    asked before using the other centre's stock; if they say no, the case stays "IOL pending" as before.
 * Nothing else changes: the actual deduction is still done by the existing code.
 */
(function () {
  'use strict';
  var showOther = false;
  function norm(c) {
    var s = String(c || '').toUpperCase().trim();
    if (/CHD|CHANDIGARH/.test(s)) return 'CHD';
    if (/RPR|RAJPURA/.test(s)) return 'RPR';
    return s;
  }
  function storeCentre(store) {
    try { if (window.bmhInvScope && bmhInvScope.storeCentre) return bmhInvScope.storeCentre(store); } catch (e) {}
    var s = String(store || ''); return /\bCHD\b/i.test(s) ? 'CHD' : /\bRPR\b/i.test(s) ? 'RPR' : (s ? 'RPR' : '');
  }
  function patientCentre() {
    var p = window.CURRENT_PATIENT || {};
    var c = p.centre;
    if (!c) { try { c = typeof getEffectiveCentre === 'function' ? getEffectiveCentre() : ''; } catch (e) { c = ''; } }
    return norm(c);
  }
  function sameCentre(item, centre) {
    if (!centre) return true;
    var sc = storeCentre(item && item.store);
    return !sc || sc === centre;
  }
  window.bmhInvCentre = { norm: norm, storeCentre: storeCentre, sameCentre: sameCentre, patientCentre: patientCentre };

  // ---- 1) Procedure Done stock list ----
  if (typeof window.bmhProcedureStockRows === 'function') {
    var origRows = window.bmhProcedureStockRows;
    window.bmhProcedureStockRows = function (dept) {
      var rows = origRows.apply(this, arguments) || [];
      if (showOther) return rows;
      var c = patientCentre();
      return rows.filter(function (it) { return sameCentre(it, c); });
    };
  }
  function addToggle() {
    var search = document.getElementById('proc-done-stock-search');
    if (!search || document.getElementById('bmh-proc-other-centre')) return;
    var c = patientCentre();
    var wrap = document.createElement('label');
    wrap.id = 'bmh-proc-other-centre';
    wrap.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;color:var(--g1);margin:4px 0 2px;cursor:pointer';
    wrap.innerHTML = '<input type="checkbox" style="width:auto;margin:0"' + (showOther ? ' checked' : '') + '> <span>Showing <b>' + (c || 'this centre') + '</b> stock only — tick to show the other centre\'s stock too</span>';
    wrap.querySelector('input').addEventListener('change', function (e) {
      showOther = !!e.target.checked;
      wrap.querySelector('span').innerHTML = showOther ? 'Showing <b>both centres</b> — untick to show only <b>' + (c || 'this centre') + '</b> stock' : 'Showing <b>' + (c || 'this centre') + '</b> stock only — tick to show the other centre\'s stock too';
      var dept = (document.getElementById('proc-done-dept') || {}).value || '';
      try { renderProcedureDeptStoreChips(dept); } catch (er) {}
      try { renderProcedureStockSearch(dept, search.value || ''); } catch (er) {}
    });
    var box = search.parentNode; box.parentNode.insertBefore(wrap, box);
  }
  if (typeof window.openProcedureDoneModalForDept === 'function') {
    var origOpen = window.openProcedureDoneModalForDept;
    window.openProcedureDoneModalForDept = function () {
      showOther = false;
      var old = document.getElementById('bmh-proc-other-centre'); if (old) old.remove();
      var r = origOpen.apply(this, arguments);
      try { addToggle(); } catch (e) {}
      return r;
    };
  }

  // ---- 2) OT IOL deduction ----
  var iolCase = null;
  if (typeof window.consumeIolForOtCase === 'function') {
    var origConsume = window.consumeIolForOtCase;
    window.consumeIolForOtCase = function (otCase) {
      iolCase = otCase || null;
      try { return origConsume.apply(this, arguments); } finally { iolCase = null; }
    };
  }
  if (typeof window.chooseIolInventoryItem === 'function') {
    var origChoose = window.chooseIolInventoryItem;
    window.chooseIolInventoryItem = function (matches, power) {
      var c = iolCase ? norm(iolCase.centre) : '';
      if (!c || !Array.isArray(matches)) return origChoose.apply(this, arguments);
      var here = matches.filter(function (it) { return sameCentre(it, c); });
      if (here.length) return origChoose.call(this, here, power);
      var stores = Array.from(new Set(matches.map(function (it) { return it.store || 'store'; }))).join(', ');
      var ok = window.confirm('No matching IOL (power ' + (power || '') + ') in ' + c + ' stock.\n\nIt is available in: ' + stores + '.\n\nUse the IOL from that stock for this patient?');
      if (!ok) return false;
      return origChoose.call(this, matches, power);
    };
  }
})();
