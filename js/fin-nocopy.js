/* BMH — no billing copy in browser storage on logins without billing access (v212, Dr Varun 27 Nov).
 *
 * The older code kept the whole billing record (bills, vendor bills, purchases, stock used, ledger, patient
 * charges…) in this browser's storage on every computer that had opened billing — including doctor, optometrist,
 * lab and OT computers. Since v210 those logins get billing in memory only (fin-delta.js), so the browser copy is
 * not needed there.
 *
 * On a login WITHOUT billing access (see fin-delta.js: not Admin / Reception / TPA / Inventory, no Billing / TPA /
 * Inventory / Reception module):
 *   • the billing copy is removed from this browser's storage at login, and
 *   • it is not written there again, or read from there, while that login is in use.
 * Nothing in the database changes; nothing on the billing computers changes. The screens of these logins already
 * read billing from the database copy (v210), not from this browser copy.
 * The small "last saved at" time (bmh_financials_updated_at) is kept: it holds no billing data.
 *
 * Off switch (this browser only): localStorage.setItem('bmh_fin_nocopy_off','1') then reload.
 */
(function () {
  'use strict';
  var ls; try { ls = window.localStorage; if (ls.getItem('bmh_fin_nocopy_off') === '1') return; } catch (e) { return; }
  if (!window.Storage || !Storage.prototype || Storage.prototype.__bmhFinNoCopy) return;
  Storage.prototype.__bmhFinNoCopy = true;
  var KEYS = ['bmh_patient_charges', 'bmh_vendor_bills', 'bmh_office_bills', 'bmh_saved_bills', 'bmh_office_bill_categories',
    'bmh_expenses', 'bmh_ledger', 'bmh_purchases', 'bmh_inventory_usage', 'bmh_inventory_indents', 'bmh_inventory_transfers',
    'bmh_inventory_removals'];
  var stats = { cleared: 0, blocked: 0 };
  // true only when someone is logged in AND that login has no billing access
  function noCopyLogin() {
    var u = window.CURRENT_USER; if (!u) return false;
    var f = window.BMH_FIN_DELTA && window.BMH_FIN_DELTA.billingLogin;
    if (typeof f !== 'function') return false; // fin-delta.js not running (off switch): keep the old behaviour
    return f() === false;
  }
  var origSet = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {
    if (this === ls && KEYS.indexOf(String(k)) >= 0 && noCopyLogin()) { stats.blocked++; return; }
    return origSet.apply(this, arguments);
  };
  var origGet = Storage.prototype.getItem;
  Storage.prototype.getItem = function (k) {
    if (this === ls && KEYS.indexOf(String(k)) >= 0 && noCopyLogin()) return null;
    return origGet.apply(this, arguments);
  };
  var lastUser = null;
  function check() {
    var u = window.CURRENT_USER, name = u ? String(u.username || u.name || '') : '';
    if (name === lastUser) return;
    lastUser = name;
    if (!noCopyLogin()) return;
    KEYS.forEach(function (k) { try { if (origGet.call(ls, k) != null) { ls.removeItem(k); stats.cleared++; } } catch (e) {} });
  }
  check();
  setInterval(check, 2000);
  window.BMH_FIN_NOCOPY = { stats: function () { return Object.assign({ noCopyLogin: noCopyLogin() }, stats); } };
})();
