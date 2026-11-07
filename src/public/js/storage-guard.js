/* BMH — browser storage guard (fixes "QuotaExceededError … exceeded the quota" in the console).
 * The browser gives this site a small local storage box (~5 MB). It filled up with the app's own offline copies,
 * so local saves (and Firebase's own small connection note) failed. Real data is in Firebase and is not touched.
 *
 * 1) On start: day-by-day local logs older than 7 days are removed. Only today's copy is ever read back:
 *      bmh_transactions_<date>, bmh_perf_log_<date>, bmh_perf_summary_<date>
 * 2) Only when a save fails because the box is full: spare copies are removed one at a time, then the save is
 *    retried. Order: older day-by-day logs → "_archive" copies → "_backup" copies (each is an extra copy of a main
 *    item that stays in place). Drug library copies, logins, settings and every main item are never removed.
 * Nothing else changes; if the box still can't fit the item, the original error is passed on exactly as before.
 */
(function () {
  'use strict';
  var ls; try { ls = window.localStorage; } catch (e) { return; }
  if (!ls || !window.Storage || Storage.prototype.__bmhGuard) return;
  var DATED = /^bmh_(transactions|perf_log|perf_summary)_(\d{4}-\d{2}-\d{2})$/;
  var SPARE_BASES = ['bmh_ot_cases', 'bmh_inventory_stock', 'bmh_charges_schedule', 'bmh_doctor_profiles'];
  function pad(n) { return String(n).padStart(2, '0'); }
  function dayKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function keys() { var out = []; try { for (var i = 0; i < ls.length; i++) out.push(ls.key(i)); } catch (e) {} return out; }
  function isQuota(e) {
    return !!e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22 || e.code === 1014);
  }
  var origSet = Storage.prototype.setItem, origRemove = Storage.prototype.removeItem;

  // 1) tidy old day-by-day logs (older than 7 days)
  try {
    var cut = new Date(); cut.setDate(cut.getDate() - 7); var cutKey = dayKey(cut), removed = 0;
    keys().forEach(function (k) { var m = DATED.exec(k || ''); if (m && m[2] < cutKey) { try { origRemove.call(ls, k); removed++; } catch (e) {} } });
    if (removed) console.info('[storage-guard] removed ' + removed + ' old day-by-day local logs');
  } catch (e) {}

  // 2) free space only when a save fails because the box is full
  function spareCandidates(writing) {
    var today = dayKey(new Date());
    var dated = keys().filter(function (k) { var m = DATED.exec(k || ''); return m && m[2] < today; })
      .sort(function (a, b) { return DATED.exec(a)[2] < DATED.exec(b)[2] ? -1 : 1; });
    var arch = SPARE_BASES.map(function (b) { return b + '_archive'; });
    var back = SPARE_BASES.map(function (b) { return b + '_backup'; });
    var all = keys();
    return dated.concat(arch, back).filter(function (k) { return k !== writing && all.indexOf(k) >= 0; });
  }
  var SPARE = {}; SPARE_BASES.forEach(function (b) { SPARE[b + '_archive'] = 1; SPARE[b + '_backup'] = 1; });
  Storage.prototype.setItem = function (key, value) {
    try { return origSet.call(this, key, value); }
    catch (err) {
      if (this !== ls || !isQuota(err)) throw err;
      var k = String(key), spare = !!SPARE[k];
      // a spare copy may only free day-by-day logs and other "_archive" copies, never a "_backup"
      var list = spareCandidates(k).filter(function (c) { return !spare || !/_backup$/.test(c); }), freed = [];
      for (var i = 0; i < list.length; i++) {
        try { origRemove.call(ls, list[i]); freed.push(list[i]); } catch (e) { continue; }
        try { var r = origSet.call(this, key, value); console.info('[storage-guard] storage was full; freed spare copies:', freed.join(', ')); return r; }
        catch (e2) { if (!isQuota(e2)) throw e2; }
      }
      if (spare) {
        // still no room for this extra copy: drop its old value and skip it, so the main save that follows goes ahead
        try { origRemove.call(ls, k); } catch (e) {}
        try { return origSet.call(this, key, value); } catch (e3) { if (!isQuota(e3)) throw e3; }
        try { origRemove.call(ls, k); } catch (e) {}
        console.info('[storage-guard] storage full; skipped spare copy', k);
        return;
      }
      throw err;
    }
  };
  Storage.prototype.__bmhGuard = true;
  window.bmhStorageReport = function () {
    var t = 0, rows = keys().map(function (k) { var n = (k.length + (ls.getItem(k) || '').length) * 2; t += n; return [k, Math.round(n / 1024) + ' KB']; });
    rows.sort(function (a, b) { return parseInt(b[1], 10) - parseInt(a[1], 10); });
    return { totalKB: Math.round(t / 1024), top: rows.slice(0, 15) };
  };
})();
