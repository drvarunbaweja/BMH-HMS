/* BMH — Inventory: the stock quantity of a stock row can't be changed by hand without admin + PIN.
 * Inventory → a stock row (e.g. an IOL code IOL-1900D-…) → Edit Stock Item: the "Stock Qty" box is locked for every
 * login except admin. An admin who changes the quantity must enter the 4-digit PIN, and the change — old and new quantity, who, when — is written to the
 * audit log (INVENTORY_STOCK_QTY_EDIT).
 * The PIN is the 4-digit Reports PIN (checked each time a quantity is changed). All other details (name, vendor, batch, expiry …) can be edited as before.
 * Stock still goes down by itself when items are used for a patient / in OT, and up when stock is received.
 * Off switch (this browser): localStorage.setItem('bmh_inv_stock_lock_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_inv_stock_lock_off') === '1') return; } catch (e) {}
  var pass = false;
  function admin() { try { return !!(CURRENT_USER && (CURRENT_USER.isAdmin || (typeof isAdminUser === 'function' && isAdminUser()))); } catch (e) { return false; } }
  function lockBox(item) {
    var q = document.getElementById('inv-stock-edit-qty'); if (!q || q.dataset.locked) return;
    q.dataset.locked = '1'; q.dataset.orig = String(Number(item && item.stock || 0));
    var note = document.createElement('div'); note.style.cssText = 'font-size:10px;color:#b42318;font-weight:700;margin-top:3px';
    if (!admin()) { q.readOnly = true; q.style.background = '#f2f2f7'; q.style.cursor = 'not-allowed'; note.textContent = '🔒 Only admin (with PIN) can change the stock quantity'; }
    else note.textContent = '🔒 Changing the quantity needs the 4-digit PIN';
    q.parentNode.appendChild(note);
  }
  function install() {
    var ok = true;
    if (typeof window.openInventoryStockEdit === 'function' && !window.openInventoryStockEdit._isl) {
      var oo = window.openInventoryStockEdit;
      var w = function (barcode) { var r = oo.apply(this, arguments); try { lockBox(bmhFindInventoryStockItem(barcode)); } catch (e) {} return r; };
      w._isl = true; window.openInventoryStockEdit = w;
    } else if (typeof window.openInventoryStockEdit !== 'function') ok = false;
    if (typeof window.saveInventoryStockEdit === 'function' && !window.saveInventoryStockEdit._isl) {
      var os = window.saveInventoryStockEdit;
      var s = function (barcode) {
        var item = null; try { item = bmhFindInventoryStockItem(barcode); } catch (e) {}
        var q = document.getElementById('inv-stock-edit-qty');
        if (item && q) {
          var oldQ = Math.max(0, Number(item.stock || 0)), newQ = Math.max(0, Number(q.value || 0));
          if (newQ !== oldQ) {
            if (!admin()) { q.value = oldQ; try { showToast('Only admin (with PIN) can change the stock quantity — other details saved', 'w'); } catch (e) {} }
            else if (!pass) {
              var pin = window.prompt('Stock quantity ' + oldQ + ' → ' + newQ + ' for ' + (item.name || item.barcode) + '.\n\nEnter the 4-digit PIN:', '');
              q.value = oldQ;
              if (!pin) return;
              if (typeof window.bmhReportPinVerify !== 'function') { try { showToast('PIN check not available', 'w'); } catch (e) {} return; }
              var self = this, args = arguments;
              window.bmhReportPinVerify(pin, 4).then(function (okPin) {
                if (!okPin) return;
                var q2 = document.getElementById('inv-stock-edit-qty'); if (q2) q2.value = newQ;
                try { fbPush && fbPush('auditLog', { user: CURRENT_USER.name || 'Admin', role: 'Admin', action: 'INVENTORY_STOCK_QTY_EDIT', item: (item.name || '') + ' [' + (item.barcode || '') + '] ' + oldQ + ' → ' + newQ + (item.store ? ' · ' + item.store : ''), timestamp: new Date().toISOString() }); } catch (e) {}
                pass = true; try { s.apply(self, args); } finally { pass = false; }
              });
              return;
            }
          }
        }
        return os.apply(this, arguments);
      };
      s._isl = true; window.saveInventoryStockEdit = s;
    } else if (typeof window.saveInventoryStockEdit !== 'function') ok = false;
    return ok;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
