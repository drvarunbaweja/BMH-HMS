/* BMH — RTDB download saving, step 2: lab orders and appointments.
 *  • Lab: the lab list on screen is built from the patients' own investigation orders; the copy of the whole
 *    "labOrders" history that was downloaded (and re-downloaded after every report) was replaced straight away
 *    by that list. Now only a tiny "a report was saved" signal is followed (the last entry), which redraws the
 *    lab list exactly as before.
 *  • Appointments: instead of the whole appointment history, only appointments from the last 45 days and all
 *    future ones are kept live (the day view only shows today onwards anyway). Printing a list for an older date
 *    loads that one date when asked.
 *    For the database to send only those dates, the rules need: "appointments": { ".indexOn": ["date"] }.
 *    Without it everything still works exactly the same — Firebase just keeps sending the whole list.
 * Saving, editing and deleting appointments / lab reports are unchanged.
 */
(function () {
  'use strict';
  var DAYS_BACK = 45;
  function dayKey(d) { try { return localDateKey(d); } catch (e) { return d.toISOString().slice(0, 10); } }
  function fromKey() { var d = new Date(); d.setDate(d.getDate() - DAYS_BACK); return dayKey(d); }

  // ── lab orders: follow only the newest entry as a "changed" signal ──
  if (typeof window.listenLabOrders === 'function') {
    window.listenLabOrders = function () {
      if (window._bmhLabOrdersListening || !window.FBDB) return;
      window._bmhLabOrdersListening = true;
      var first = true;
      window.FBDB.ref('labOrders').limitToLast(1).on('value', function () {
        if (first) { first = false; }
        try { if (typeof renderLabOrders === 'function') renderLabOrders(); } catch (e) {}
      });
    };
  }

  // ── appointments: last 45 days + all future ──
  var OLD = {}; // older dates loaded on request: date → { key: appointment }
  var FROM = '';
  function push(list, key, a) { a = a || {}; list.push(Object.assign({ _key: key, id: a.id || key }, a)); }
  function rebuild(data) {
    APPOINTMENTS.length = 0;
    var seen = {};
    Object.keys(data || {}).forEach(function (k) { seen[k] = 1; push(APPOINTMENTS, k, data[k]); });
    Object.keys(OLD).forEach(function (d) { var m = OLD[d] || {}; Object.keys(m).forEach(function (k) { if (!seen[k]) { seen[k] = 1; push(APPOINTMENTS, k, m[k]); } }); });
  }
  var last = {};
  if (typeof window.listenAppointments === 'function') {
    window.listenAppointments = function (opts) {
      opts = opts || {};
      if (!window.FBDB) return;
      var centre = ''; try { centre = getLiveDataCentreScope(); } catch (e) {}
      var existing = window._bmhAppointmentsListener;
      if (existing && existing.centre === centre && !opts.force && existing.from === fromKey()) return;
      if (existing && existing.ref && existing.cb) { try { existing.ref.off('value', existing.cb); } catch (e) {} }
      FROM = fromKey();
      var q = window.FBDB.ref('appointments').orderByChild('date').startAt(FROM);
      var cb = function (snap) {
        last = (snap && typeof snap.val === 'function') ? (snap.val() || {}) : (snap || {});
        rebuild(last);
        var activeId = ''; try { activeId = getActivePageId(); } catch (e) {}
        try { if (activeId === 'pg-appointments') renderAptDay && renderAptDay(); else if (activeId === 'pg-dashboard') renderDashboard && renderDashboard(); } catch (e) {}
      };
      window._bmhAppointmentsListener = { ref: q, cb: cb, centre: centre, from: FROM };
      q.on('value', cb);
    };
  }
  function loadOldDate(date) {
    if (!date || !FROM || date >= FROM || OLD[date] || !window.FBDB) return Promise.resolve(false);
    return window.FBDB.ref('appointments').orderByChild('date').equalTo(date).once('value').then(function (s) {
      OLD[date] = s.val() || {}; rebuild(last); return true;
    }).catch(function () { return false; });
  }
  var origPrint = window.printAppointments;
  if (typeof origPrint === 'function') {
    window.printAppointments = function (dateFilter) {
      var self = this, args = arguments;
      var date = dateFilter || ((document.getElementById('apt-date-inp') || {}).value) || '';
      if (date && FROM && date < FROM && !OLD[date]) {
        loadOldDate(date).then(function () { origPrint.apply(self, args); });
        return;
      }
      return origPrint.apply(this, arguments);
    };
  }
  window.bmhRecentData = { from: function () { return FROM; }, loadOldDate: loadOldDate };
})();
