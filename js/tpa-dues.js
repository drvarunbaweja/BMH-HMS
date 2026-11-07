/* BMH — TPA / Cashless / ECHS / PMJAY dues: show ALL open claims, not only today's.
 * The live payment-request list only keeps today's requests, so older cashless claims (and part-received ones)
 * disappeared from Reception → Insurance/TPA, the TPA page and the totals. This keeps a separate read-only list of
 * every open insurance-type claim (status pending or partial, any date) and adds it to those screens.
 * Opening a claim and saving the receipt updates that same claim (no duplicate is created).
 * Nothing is written by this file except through the existing Save / Delete buttons.
 */
(function () {
  'use strict';
  var OPEN = {}; // id → claim (pending / partial, insurance-like)
  var loaded = false;
  function insLike(v) { try { return isInsuranceLikeMode(v); } catch (e) { return /Insurance|TPA|PMJAY|CGHS|ECHS|Ayushman|Cashless/i.test(String(v || '')); } }
  function isClaim(r) { return r && r.id && insLike(r.mode || r.ins || '') && String(r.from || '').toLowerCase() !== 'tpa patient share'; }
  function centreOk(r) {
    var u = {}; try { u = CURRENT_USER || {}; } catch (e) {}
    if (u.isAdmin) return true;
    var c = u.centre || 'CHD';
    try { return rowMatchesCentre(r, c, { allowUncentredToday: true }); } catch (e) { return true; }
  }
  function refresh() {
    try { if (typeof renderInsuranceTab === 'function' && document.getElementById('rc-insurance-list')) renderInsuranceTab(); } catch (e) {}
    try { if (typeof renderTpaPage === 'function' && document.getElementById('tpa-case-body')) renderTpaPage(); } catch (e) {}
  }
  var listening = false;
  function listen() {
    if (listening || !window.FBDB) return listening;
    listening = true;
    ['pending', 'partial'].forEach(function (st) {
      try {
        window.FBDB.ref('payRequests').orderByChild('status').equalTo(st).on('value', function (snap) {
          var v = (snap && snap.val && snap.val()) || {};
          Object.keys(OPEN).forEach(function (id) { if (OPEN[id].__st === st) delete OPEN[id]; });
          Object.keys(v).forEach(function (k) { var r = v[k]; if (isClaim(r)) { r.id = r.id || k; r.__st = st; OPEN[r.id] = r; } });
          loaded = true;
          refresh();
        }, function () {});
      } catch (e) {}
    });
    return true;
  }
  if (!listen()) { var tries = 0, t = setInterval(function () { if (listen() || ++tries > 90) clearInterval(t); }, 3000); }

  function payReqs() { try { return PAY_REQUESTS || []; } catch (e) { return window.PAY_REQUESTS || []; } }
  var origGet = window.getDisplayTpaClaims;
  if (typeof origGet !== 'function') return;
  window.getDisplayTpaClaims = function () {
    var base = origGet.apply(this, arguments) || [];
    if (!loaded) return base;
    var ids = {}, realBmh = {};
    base.forEach(function (r) { if (r && !r._synthetic) { ids[r.id] = 1; if (r.bmhId) realBmh[String(r.bmhId)] = 1; } });
    var extra = [];
    Object.keys(OPEN).forEach(function (id) {
      var r = OPEN[id];
      if (ids[id] || !centreOk(r)) return;
      var row = Object.assign({ _synthetic: false, _older: true }, r);
      delete row.__st;
      if (String(r.status) === 'partial') { row.status = 'pending'; row._partial = true; }
      extra.push(row);
      if (r.bmhId) realBmh[String(r.bmhId)] = 1;
    });
    // a patient who now has a real claim no longer needs the "from patient record" placeholder
    var out = base.filter(function (r) { return !(r && r._synthetic && realBmh[String(r.bmhId || '')]); }).concat(extra);
    return out.sort(function (a, b) { return new Date(b.date || 0) - new Date(a.date || 0); });
  };
  // Saving / deleting an older claim: put the real claim in the working list for that moment, so the existing
  // code updates it in place instead of creating a copy.
  function withClaim(fn) {
    return function (prId) {
      var list = payReqs(), added = null;
      if (prId && OPEN[prId] && !list.some(function (r) { return r && r.id === prId; })) {
        added = OPEN[prId]; delete added.__st; list.push(added);
      }
      try { return fn.apply(this, arguments); }
      finally {
        if (added) { var i = list.indexOf(added); if (i >= 0 && !(String(added.status) === 'pending' && isTodayish(added))) list.splice(i, 1); }
      }
    };
  }
  function isTodayish(r) { try { return isTodayReceptionPayRequest(r); } catch (e) { return false; } }
  if (typeof window.saveTPAReceipt === 'function') window.saveTPAReceipt = withClaim(window.saveTPAReceipt);
  if (typeof window.deleteTPACase === 'function') {
    var del = withClaim(window.deleteTPACase);
    window.deleteTPACase = function (prId) { var r = del.apply(this, arguments); try { if (OPEN[prId] && !payReqs().some(function (x) { return x && x.id === prId; })) { /* removed by the delete */ } } catch (e) {} return r; };
  }
  window.bmhTpaDues = { open: function () { return OPEN; } };
})();
