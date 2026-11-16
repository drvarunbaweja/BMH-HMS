/* BMH — Inventory → Current Stock: delete a sub-heading (a store shown under ONE main heading).
 * Only the stock lines that are under THAT main heading AND that store are removed, so the same store name under
 * another main heading (e.g. "Eye OT" under Ophthalmology - CHD) is not touched. The store name also stays in the
 * shared store list. Refused while any of those lines still holds stock (transfer or move it first).
 * Admin + inventory delete PIN. A copy of the removed lines is kept at inventorySubheadingsRemoved/<id>.
 * Off switch (this browser): localStorage.setItem('bmh_subhead_del_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_subhead_del_off') === '1') return; } catch (e) {}
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function me() { try { return CURRENT_USER || {}; } catch (e) { return {}; } }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function label(d) { try { return bmhDeptLabel(d); } catch (e) { return d || 'General'; } }
  function linesOf(dept, store) {
    return inv().filter(function (r) { return r && String(r.dept || 'general') === String(dept) && String(r.store || 'Unassigned store') === String(store); });
  }
  window.bmhDeleteStockSubheading = function (dept, store) {
    if (!me().isAdmin) { toast('Only admin can delete a sub-heading', 'w'); return; }
    var rows = linesOf(dept, store), heading = label(dept);
    if (!rows.length) { toast('Nothing under “' + store + '” in ' + heading, 'i'); return; }
    var withStock = rows.filter(function (r) { return (Number(r.stock) || 0) > 0; });
    if (withStock.length) {
      var units = withStock.reduce(function (s, r) { return s + (Number(r.stock) || 0); }, 0);
      alert('“' + store + '” under ' + heading + ' still holds stock: ' + withStock.length + ' item line' + (withStock.length === 1 ? '' : 's') + ', ' + units + ' unit' + (units === 1 ? '' : 's') + '.\n\nTransfer or move that stock first (Transfer stock, or select items → Move). An empty sub-heading can then be deleted.\n\nNothing was deleted.');
      return;
    }
    var elsewhere = {};
    inv().forEach(function (r) { if (r && String(r.store || '') === String(store) && String(r.dept || 'general') !== String(dept)) elsewhere[label(r.dept || 'general')] = 1; });
    var other = Object.keys(elsewhere);
    if (typeof bmhRequireInventoryDeletePin === 'function' && !bmhRequireInventoryDeletePin()) return;
    if (!confirm('Delete the sub-heading “' + store + '” from ' + heading + '?\n\n' + rows.length + ' empty item line' + (rows.length === 1 ? '' : 's') + ' (0 stock) under it will be removed.'
      + (other.length ? '\n\n“' + store + '” under ' + other.join(', ') + ' is NOT touched.' : '') + '\n\nA copy is kept so it can be restored.')) return;
    var id = 'SHR' + Date.now(), now = new Date().toISOString();
    var copy = rows.map(function (r) { try { return JSON.parse(JSON.stringify(r)); } catch (e) { return { barcode: r.barcode, name: r.name }; } });
    var done = function () {
      try { bmhDeleteInventoryRowsFromCloud(rows.slice()); } catch (e) { toast('Could not delete: ' + (e && e.message || 'error'), 'e'); return; }
      try { var sel = window._inventoryStockBrowserSelection; if (sel && typeof bmhInventoryStockStoreSelectionKey === 'function') delete sel[bmhInventoryStockStoreSelectionKey(dept)]; } catch (e) {}
      ['renderStockList', 'renderInventoryStoreStock', 'bmhPopulateInventorySelectors'].forEach(function (f) { try { if (typeof window[f] === 'function') window[f](); } catch (e) {} });
      toast('“' + store + '” removed from ' + heading + ' ✓', 's');
    };
    var rec = { id: id, dept: dept, deptLabel: heading, store: store, rows: copy, by: me().name || '', at: now };
    try {
      if (window.FBDB) { window.FBDB.ref('inventorySubheadingsRemoved/' + id).set(rec).then(done).catch(function () { toast('Could not save the restore copy — nothing was deleted. Check the internet and try again.', 'w'); }); return; }
    } catch (e) {}
    toast('Not connected — nothing was deleted', 'w');
  };
})();
