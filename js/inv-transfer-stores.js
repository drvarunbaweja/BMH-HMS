/* BMH — Inventory → Transfer stock: the From / To store lists follow Current Stock.
 *  Only the stores shown in Current Stock (stores that hold stock lines) are listed, grouped under the same department
 *  headings as Current Stock (e.g. "Ophthalmology - CHD" → Eye Central Store CHD …). Old / historic store names that
 *  hold no stock are no longer offered. Department logins still see only their own stores.
 *  The same applies to the "Move to store" box (Current Stock → select items → Move).
 *  Nothing is saved or renamed — only the drop-downs change.
 *  Off switch (this browser): localStorage.setItem('bmh_tr_stores_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_tr_stores_off') === '1') return; } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function low(s) { return String(s || '').trim().toLowerCase().replace(/\s+/g, ' '); }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function label(d) { var f = window.bmhDeptLabel || (typeof bmhDeptLabel === 'function' ? bmhDeptLabel : null); if (!f) return d || 'General'; try { var l = f(d); if (l === d && d) { var l2 = f(String(d).toLowerCase()); if (l2) l = l2; } return l; } catch (e) { return d || 'General'; } }
  function live(r) { return r && r._deleted !== true && String(r._deleted) !== 'true'; }

  function groups() {
    // stores the login may use (department scope), as in the other store lists
    var allowed = null;
    try { var opts = (window.bmhInventoryStoreOptions && window.bmhInventoryStoreOptions()) || []; allowed = {}; opts.forEach(function (s) { allowed[low(s)] = 1; }); } catch (e) { allowed = null; }
    var byStore = {}; // store → {name, depts:{dept:count}}
    inv().forEach(function (r) {
      if (!live(r)) return;
      var st = String(r.store || '').trim(); if (!st) return;
      var k = low(st); if (allowed && !allowed[k]) return;
      var s = byStore[k] || (byStore[k] = { name: st, depts: {} });
      var d = String(r.dept || 'general'); s.depts[d] = (s.depts[d] || 0) + 1;
    });
    var out = {};
    Object.keys(byStore).forEach(function (k) {
      // listed under every heading it appears under in Current Stock
      var s = byStore[k];
      Object.keys(s.depts).forEach(function (d) { var h = label(d); out[h] = out[h] || []; if (out[h].indexOf(s.name) < 0) out[h].push(s.name); });
    });
    return Object.keys(out).sort(function (a, b) { return a.localeCompare(b); }).map(function (h) { return { heading: h, stores: out[h].sort(function (a, b) { return a.localeCompare(b); }) }; });
  }
  function fill(only) {
    var g = groups(); if (!g.length) return;
    (only || ['inv-tr-from', 'inv-tr-to']).forEach(function (id) {
      var el = document.getElementById(id); if (!el) return;
      var cur = el.value;
      el.innerHTML = (id === 'inv-move-store' ? '' : '<option value="">— choose store —</option>') + g.map(function (x) {
        return '<optgroup label="' + esc(x.heading) + '">' + x.stores.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + '</option>'; }).join('') + '</optgroup>';
      }).join('');
      var low2 = function (x) { return String(x || '').trim().toLowerCase().replace(/\s+/g, ' '); };
      var hit = cur && Array.prototype.find.call(el.options, function (o) { return low2(o.value) === low2(cur); });
      if (hit) el.value = hit.value;
    });
  }
  window.bmhFillTransferStores = fill;
  var orig = window.bmhPopulateInventorySelectors;
  if (typeof orig === 'function') {
    window.bmhPopulateInventorySelectors = function () { var r = orig.apply(this, arguments); try { fill(); } catch (e) {} return r; };
  }
  var origMove = window.openInventoryMoveModal;
  if (typeof origMove === 'function') {
    window.openInventoryMoveModal = function () { var r = origMove.apply(this, arguments); try { fill(['inv-move-store']); } catch (e) {} return r; };
  }
  // also when the Transfer tab is opened (stock may have changed since the lists were built)
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest && e.target.closest('[onclick*="inv-transfer"],[onclick*="transfer"]');
    if (t) setTimeout(function () { try { fill(); } catch (x) {} }, 50);
  }, true);
})();
