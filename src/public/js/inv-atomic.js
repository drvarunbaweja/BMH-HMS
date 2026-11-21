/* BMH — Inventory: stock changes are added to the shared record, never written over it.
 * Before: saving a stock row wrote this computer's whole copy of the row, so a computer holding an older quantity put
 * back stock that another computer had just used (IOLs used in OT came back into stock).
 * Now each save works out how much THIS computer changed the quantity since it last read the row (used −1, received +5,
 * transfer, return …) and applies only that change to the quantity currently in the shared record, in one step
 * (database transaction). Two computers using the same item at the same time both count. The other details of the row
 * (name, vendor, store, expiry …) are saved as before. After the save the screen shows the shared quantity.
 * Applies to every department and store. A row this computer has never read from the shared record is saved as before.
 * Off switch (this browser): localStorage.setItem('bmh_inv_atomic_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_inv_atomic_off') === '1') return; } catch (e) {}
  var base = {}; // barcode → quantity last read from / written to the shared record
  function key(bc) { return String(bc).replace(/[.#$/\[\]]/g, '_'); }
  function num(v) { var n = Number(v); return isFinite(n) ? n : 0; }
  function clean(o) { var c = {}; Object.keys(o || {}).forEach(function (k) { if (k.charAt(0) !== '_' || k === '_deleted') { var v = o[k]; if (v !== undefined && typeof v !== 'function') c[k] = v; } }); return c; }
  function install() {
    var ok = true;
    if (typeof window.bmhApplyInventoryMergedRow === 'function' && !window.bmhApplyInventoryMergedRow._ia) {
      var oa = window.bmhApplyInventoryMergedRow;
      var a = function (row) { var r = oa.apply(this, arguments); try { if (row && row.barcode && !row._deleted) base[String(row.barcode)] = num(row.stock); } catch (e) {} return r; };
      a._ia = true; window.bmhApplyInventoryMergedRow = a;
    } else if (typeof window.bmhApplyInventoryMergedRow !== 'function') ok = false;
    var orig = window.saveInventoryItemToFirebase || window.saveInventoryToFirebase;
    if (typeof orig === 'function' && !orig._ia) {
      var s = function (item) {
        try { normalizeInventoryRecord(item); } catch (e) {}
        if (!item || !item.barcode || !window.FBDB) return orig.apply(this, arguments);
        var bc = String(item.barcode);
        if (!(bc in base) || item._deleted) return orig.apply(this, arguments).then(function (r) { base[bc] = num(item.stock); return r; });
        var delta = num(item.stock) - base[bc];
        item.updatedAt = new Date().toISOString();
        var fields = clean(item);
        return window.FBDB.ref('inventory/' + key(bc)).transaction(function (cur) {
          if (!cur || cur._deleted) return fields;
          var next = Object.assign({}, cur, fields);
          next.stock = Math.max(0, num(cur.stock) + delta);
          return next;
        }).then(function (res) {
          var v = res && res.snapshot && res.snapshot.val();
          if (v && !v._deleted) { item.stock = num(v.stock); base[bc] = num(v.stock); try { saveInventoryStockToStorage(); } catch (e) {} }
          return res;
        }).catch(function (err) { console.warn('[inventory] add-change save failed, saving the row', err); return orig.call(null, item); });
      };
      s._ia = true;
      window.saveInventoryItemToFirebase = s; window.saveInventoryToFirebase = s;
    } else if (typeof orig !== 'function') ok = false;
    return ok;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
  window.bmhInvAtomicBase = function () { return Object.keys(base).length; };
})();
