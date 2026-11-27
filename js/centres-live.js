/* BMH — Two-Centre View updates itself like My patient queue: new figures appear as soon as reception records
 * something (a receipt, a check-in, a patient), without the page reloading or leaving the screen.
 * Every 15 s, while the Two-Centre View is open and on today's date, it compares what the figures are built from
 * (receipts, payment requests, patients checked in) and redraws only when something changed. The 2-minute redraw stays.
 * Reads only; writes nothing.
 * Off switch (this browser): localStorage.setItem('bmh_centres_live_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_centres_live_off') === '1') return; } catch (e) {}
  var last = '';
  function today() { try { return localDateKey(new Date()); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  function sig() {
    var t = [], pr = [], p = [];
    try { t = TRANSACTIONS || []; } catch (e) {}
    try { pr = PAY_REQUESTS || []; } catch (e) {}
    try { p = PATIENTS || []; } catch (e) {}
    var tSum = 0; for (var i = 0; i < t.length; i++) { var x = t[i]; if (x) tSum += Number(x.amount || 0); }
    var prs = 0; for (var j = 0; j < pr.length; j++) { var y = pr[j]; if (y) prs += (y.status === 'paid' || y.collected ? 1 : 0); }
    var latest = 0; for (var k = 0; k < p.length; k++) { var z = p[k]; if (z && z.checkinAt) { var c = typeof z.checkinAt === "number" ? z.checkinAt : (Date.parse(z.checkinAt) || 0); if (c > latest) latest = c; } }
    return [t.length, Math.round(tSum), pr.length, prs, p.length, latest, Number(window._bmhReceptionFinancialDataVersion || 0)].join('|');
  }
  setInterval(function () {
    try {
      var page = document.getElementById('pg-centres');
      if (!page || !page.classList.contains('active') || document.hidden) { last = ''; return; }
      var d = document.getElementById('centres-date');
      if (d && d.value && d.value !== today()) return; // a past date picked by hand — leave it as it is
      var s = sig();
      if (!last) { last = s; return; }
      if (s !== last) { last = s; if (typeof renderCentresView === 'function') renderCentresView(); }
    } catch (e) {}
  }, 15000);
})();
