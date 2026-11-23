/* BMH — OT: correcting the IOL of a completed case puts the wrong IOL back in stock and takes out the right one.
 * ✏️ Edit OT Case on a case that is already completed (or started):
 *  • the case stays completed — its completion time, complications, timings, sign-in / time-out / sign-out, nurses and
 *    blood loss are kept; only the fields on the edit form change (before, saving the edit set it back to pending and
 *    cleared these);
 *  • if the IOL model or power is changed and an IOL had already been taken from stock for this case, that IOL goes back
 *    to the same stock line (+1), its usage entry is marked "returned — IOL corrected in OT", and the correct IOL is
 *    taken from stock (expiry choice as usual). The case keeps the new IOL's batch / expiry. Written to the audit log
 *    (OT_IOL_CORRECTED) and Inventory corrections.
 * Pending cases are edited as before.
 * Off switch (this browser): localStorage.setItem('bmh_ot_iol_correct_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_ot_iol_correct_off') === '1') return; } catch (e) {}
  var KEEP = ['status', 'completedAt', 'dischargeDate', 'timings', 'complications', 'bloodLoss', 'signIn', 'timeOut', 'signOut', 'scrubNurse', 'circNurse', 'anaesDoc'];
  function cases() { try { return OT_CASES || []; } catch (e) { return window.OT_CASES || []; } }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function clone(o) { try { return JSON.parse(JSON.stringify(o)); } catch (e) { return Object.assign({}, o); } }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function blank(v) { var s = String(v == null ? '' : v).trim(); return !s || /^(—|-|n\/a|na|none)$/i.test(s); }
  function power(c) { var p = c && (c.iolPower || ''); if (blank(p)) { try { p = extractIolPower(c.iol || c.iolType || ''); } catch (e) { p = ''; } } try { return normalizeIolPowerValue(p) || ''; } catch (e) { return String(p || '').replace(/d$/i, '').trim(); } }
  function model(c) { var m = c && !blank(c.iolType) ? c.iolType : (c && !blank(c.iol) ? String(c.iol).replace(/[+-]?\d+(\.\d+)?\s*d?\s*$/i, '') : ''); return String(m || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function iolChanged(a, b) {
    var pa = power(a), pb = power(b), ma = model(a), mb = model(b);
    if (!pb && !mb) return false;          // form left the IOL empty — not a correction
    if (pb && pa && pb !== pa) return true;
    if (mb && ma && mb !== ma) return true;
    return false;
  }
  function audit(action, item) { try { fbPush('auditLog', { user: (CURRENT_USER || {}).name || '', role: (CURRENT_USER || {}).role || '', action: action, item: item, timestamp: new Date().toISOString() }); } catch (e) {} }
  function restoreOld(prev, c) {
    var bc = String(prev.iolInventoryBarcode || '');
    var it = bc ? inv().find(function (x) { return x && String(x.barcode) === bc; }) : null;
    if (!it) return { ok: false, why: bc ? 'stock line ' + bc + ' not found' : 'no stock line recorded' };
    it.stock = Math.max(0, Number(it.stock) || 0) + 1;
    it.updatedAt = new Date().toISOString();
    try { saveInventoryStockToStorage(); } catch (e) {}
    try { saveInventoryItemToFirebase(it); } catch (e) {}
    // mark the usage entry
    try {
      var u = (window.BMH_INVENTORY_USAGE || []).slice().reverse().find(function (r) { return r && String(r.bmhId) === String(c.bmhId) && String(r.barcode) === bc && !r.returnedAt; });
      if (u) { u.returnedAt = new Date().toISOString(); u.returnedReason = 'IOL corrected in OT'; u.returnedBy = (CURRENT_USER || {}).name || ''; try { saveBmhFinancials(); } catch (e) {} }
    } catch (e) {}
    return { ok: true, item: it };
  }
  function install() {
    var o = window.addOTCase; if (typeof o !== 'function') return false; if (o._oic) return true;
    var w = function () {
      var editId = (document.getElementById('ot-add-case-id') || {}).value || '';
      var prev = null;
      if (editId) { var p = cases().find(function (x) { return x && x.id === editId; }); if (p) prev = clone(p); }
      var r = o.apply(this, arguments);
      if (!prev || String(prev.status || 'pending') === 'pending') return r;
      try {
        var c = cases().find(function (x) { return x && x.id === editId; });
        if (!c) return r;
        // keep what the edit form does not carry
        KEEP.forEach(function (k) { if (prev[k] !== undefined && prev[k] !== '' && prev[k] !== null) c[k] = prev[k]; });
        var msg = '';
        if (iolChanged(prev, c)) {
          var was = [prev.iolType || prev.iol, prev.iolPower].filter(function (x) { return !blank(x); }).join(' '), now = [c.iolType || c.iol, c.iolPower].filter(function (x) { return !blank(x); }).join(' ');
          var back = null;
          if (prev.iolInventoryConsumed) {
            back = restoreOld(prev, c);
            c.iolInventoryConsumed = false; c.iolInventoryBarcode = ''; c.iolSerial = ''; c.iolBatch = ''; c.iolExpiry = '';
          }
          var took = null;
          if (String(c.status) === 'completed') {
            c.iolInventoryPending = false;
            var res = null; try { res = consumeIolForOtCase(c); } catch (e) { res = null; }
            if (res && res.updates) { Object.assign(c, res.updates); took = res.updates.iolInventoryBarcode || 'yes'; }
            else if (res && res.pending) { c.iolInventoryPending = true; msg = res.reason || ''; }
          }
          var line = (c.patient || '') + ' [' + (c.bmhId || '') + '] OT ' + (c.date || '') + ': ' + (was || '—') + ' → ' + (now || '—')
            + (back ? (back.ok ? ' · returned to stock: ' + (back.item.name || '') + ' (' + back.item.barcode + ')' : ' · old IOL not returned: ' + back.why) : ' · old IOL had not been taken from stock')
            + (took ? ' · taken from stock: ' + took : ' · new IOL not taken from stock' + (msg ? ' (' + msg + ')' : ''));
          audit('OT_IOL_CORRECTED', line);
          try { fbPush('inventoryCorrections', { at: new Date().toISOString(), by: (CURRENT_USER || {}).name || '', kind: 'OT_IOL_CORRECTED', caseId: c.id, bmhId: c.bmhId, text: line }); } catch (e) {}
          toast('IOL corrected — ' + (back && back.ok ? 'old IOL returned to stock, ' : '') + (took ? 'new IOL taken from stock ✓' : 'new IOL not in stock' + (msg ? ': ' + msg : '')), took ? 's' : 'w');
        }
        c.lastUpdated = new Date().toISOString();
        try { saveOTCasesToLocalStorage(); } catch (e) {}
        try { persistOTCaseToCloud(c); } catch (e) {}
        try { renderOTList(); } catch (e) {}
        try { if (typeof activeOTCase !== 'undefined' && activeOTCase && activeOTCase.id === c.id) openOTCase(c.id); } catch (e) {}
      } catch (e) { console.warn('[ot-iol-correct]', e); }
      return r;
    };
    w._oic = true; window.addOTCase = w; return true;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
