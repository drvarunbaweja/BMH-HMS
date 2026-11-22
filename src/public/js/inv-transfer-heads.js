/* BMH — Inventory transfers: move stock to a Current Stock heading (department › store), and find items by name.
 * 1. Current Stock → store "✏️ Edit / move stock" → Transfer, and the single-row "Move" pop-up: the "to" list shows only
 *    the headings you see in Current Stock, as "Department › Store" (e.g. "OBG › Labour Room"), with the centre shown
 *    as Ropar / Chandigarh. Old store names that have no stock rows any more are not listed.
 * 2. The moved stock goes under the department of the heading chosen: dinoprostone moved from Eye Central Store CHD to
 *    "OBG › Labour Room" shows under OBG › Labour Room (before, it stayed under Eye with the new store name).
 * 3. Inventory → Stores / Transfers: typing in "Item / barcode" lists matching stock items (name, barcode, batch) with
 *    their store and quantity; picking one fills the item and sets "From store" to the store it is in. The "To store"
 *    list shows the same Department › Store headings.
 * Quantities and the transfer records are unchanged (the existing transfer steps are used).
 * Off switch (this browser): localStorage.setItem('bmh_inv_transfer_heads_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_inv_transfer_heads_off') === '1') return; } catch (e) {}
  var pendingDept = '';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function live(x) { return x && x._deleted !== true && String(x._deleted) !== 'true'; }
  function cmp(s) { try { return normalizeInventoryCompareText(s); } catch (e) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); } }
  function deptName(d) { var k = String(d || 'general'); try { var l = bmhDeptLabel(k.toLowerCase()); if (l && l !== k.toLowerCase()) return l; } catch (e) {} try { var l2 = bmhDeptLabel(k); if (l2) return l2; } catch (e) {} return k; }
  function centreName(store) { var c = ''; try { c = window.bmhInvScope ? bmhInvScope.storeCentre(store) : ''; } catch (e) {} return c === 'CHD' ? 'Chandigarh' : c === 'RPR' ? 'Ropar' : ''; }
  function inScope(store) { try { if (window.bmhInvScope && bmhInvScope.scope && bmhInvScope.scope()) return bmhInvScope.storeInScope(store); } catch (e) {} return true; }
  // the headings shown in Current Stock: department › store of the stock rows
  function heads() {
    var m = {};
    inv().forEach(function (r) {
      if (!live(r)) return;
      var s = String(r.store || '').trim(); if (!s || !inScope(s)) return;
      var d = String(r.dept || 'general');
      var k = d + '||' + s;
      if (!m[k]) m[k] = { dept: d, store: s, label: deptName(d) + ' › ' + s, centre: centreName(s), rows: 0, qty: 0 };
      m[k].rows++; m[k].qty += Math.max(0, Number(r.stock) || 0);
    });
    return Object.keys(m).map(function (k) { return m[k]; }).sort(function (a, b) { return a.label.localeCompare(b.label); });
  }
  function optionsHtml(exclude, placeholder) {
    return (placeholder ? '<option value="">' + esc(placeholder) + '</option>' : '') + heads().filter(function (h) { return !exclude || !exclude(h); }).map(function (h) {
      return '<option value="' + esc(h.store) + '" data-dept="' + esc(h.dept) + '">' + esc(h.label) + (h.centre ? ' — ' + esc(h.centre) : '') + '</option>';
    }).join('');
  }
  function selDept(sel) { var o = sel && sel.options[sel.selectedIndex]; return o ? (o.getAttribute('data-dept') || '') : ''; }

  // moved rows take the department of the chosen heading
  function install() {
    var ok = true;
    if (typeof window.applyInventoryRowsStoreMove === 'function' && !window.applyInventoryRowsStoreMove._ith) {
      var oa = window.applyInventoryRowsStoreMove;
      var a = function (rows, matchedStore, qty) {
        var d = pendingDept;
        if (!d) return oa.apply(this, arguments);
        var before = new Map(); inv().forEach(function (r) { if (r) before.set(r, r.updatedAt); });
        var res = oa.apply(this, arguments);
        try {
          var fix = inv().filter(function (r) { return r && live(r) && String(r.store || '') === String(matchedStore) && (!before.has(r) || before.get(r) !== r.updatedAt) && String(r.dept || '') !== d; });
          if (fix.length) {
            fix.forEach(function (r) { r.dept = d; });
            try { saveInventoryStockToStorage(); } catch (e) {}
            try { bmhSyncInventoryRowsToCloud(fix); } catch (e) { fix.forEach(function (r) { try { saveInventoryItemToFirebase(r); } catch (x) {} }); }
            try { renderStockList(); } catch (e) {}
          }
        } catch (e) { console.warn('[inv-transfer-heads]', e); }
        return res;
      };
      a._ith = true; window.applyInventoryRowsStoreMove = a;
    } else if (typeof window.applyInventoryRowsStoreMove !== 'function') ok = false;
    // Stores / Transfers tab: the new destination line takes the department of the "To" heading
    if (typeof window.bmhInventoryStoreLineFor === 'function' && !window.bmhInventoryStoreLineFor._ith) {
      var ol = window.bmhInventoryStoreLineFor;
      var l = function (item, store) {
        var had = new Set(inv());
        var t = ol.apply(this, arguments);
        try {
          var sel = document.getElementById('inv-tr-to'), d = sel && sel.value === String(store || '').trim() ? selDept(sel) : '';
          if (d && t && t !== item && !had.has(t)) t.dept = d;
        } catch (e) {}
        return t;
      };
      l._ith = true; window.bmhInventoryStoreLineFor = l;
    } else if (typeof window.bmhInventoryStoreLineFor !== 'function') ok = false;
    // store manager → Transfer
    if (typeof window.bmhStoreMgrTransfer === 'function' && !window.bmhStoreMgrTransfer._ith) {
      var ot = window.bmhStoreMgrTransfer;
      var t = function () { pendingDept = selDept(document.getElementById('smg-to')); try { return ot.apply(this, arguments); } finally { pendingDept = ''; } };
      t._ith = true; window.bmhStoreMgrTransfer = t;
    } else if (typeof window.bmhStoreMgrTransfer !== 'function') ok = false;
    // single-row "Move" pop-up
    ['confirmInventoryMoveModal', 'confirmInventoryMoveAndPrintModal'].forEach(function (fn) {
      var o = window[fn]; if (typeof o !== 'function') { ok = false; return; } if (o._ith) return;
      var w = function () { pendingDept = selDept(document.getElementById('inv-move-store')); try { return o.apply(this, arguments); } finally { pendingDept = ''; } };
      w._ith = true; window[fn] = w;
    });
    if (typeof window.openInventoryMoveModal === 'function' && !window.openInventoryMoveModal._ith) {
      var om = window.openInventoryMoveModal;
      var mm = function () {
        var r = om.apply(this, arguments);
        try {
          var st = window._inventoryMoveDialogState || {}, sel = document.getElementById('inv-move-store');
          if (sel) {
            var rows = (st.barcodes || []).map(function (b) { return inv().find(function (x) { return x && String(x.barcode) === String(b); }); }).filter(Boolean);
            var cur = rows[0] ? (String(rows[0].dept || 'general') + '||' + String(rows[0].store || '')) : '';
            sel.innerHTML = optionsHtml(function (h) { return h.dept + '||' + h.store === cur; }, 'Choose heading…');
            var names = {}; heads().forEach(function (h) { names[h.store] = 1; });
            st.stores = Array.from(new Set((st.stores || []).concat(Object.keys(names))));
          }
        } catch (e) { console.warn('[inv-transfer-heads]', e); }
        return r;
      };
      mm._ith = true; window.openInventoryMoveModal = mm;
    } else if (typeof window.openInventoryMoveModal !== 'function') ok = false;
    return ok;
  }
  // store manager's "Transfer to" list and the Stores / Transfers "To store" list
  function fixSelects() {
    var s = document.getElementById('smg-to');
    if (s && !s.querySelector('option[data-dept]')) {
      // the store manager lists every store except the one open; keep the same rule
      var allowed = {}; [].forEach.call(s.options, function (o) { if (o.value) allowed[cmp(o.value)] = 1; });
      s.innerHTML = optionsHtml(function (h) { return !allowed[cmp(h.store)]; }, 'Choose heading…');
    }
    var to = document.getElementById('inv-tr-to');
    if (to && to.options.length && !to.querySelector('option[data-dept]')) {
      var keep = to.value;
      to.innerHTML = optionsHtml(null, '');
      if (keep) to.value = keep;
    }
  }

  // Stores / Transfers: search stock by name
  function searchBox() {
    var input = document.getElementById('inv-tr-item'); if (!input || input.getAttribute('data-ith')) return;
    input.setAttribute('data-ith', '1'); input.setAttribute('autocomplete', 'off');
    var wrap = input.parentNode; wrap.style.position = 'relative';
    var box = document.createElement('div'); box.id = 'ith-res';
    box.style.cssText = 'display:none;position:absolute;left:0;right:0;top:100%;z-index:60;background:#fff;border:1px solid #d0d7e2;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.15);max-height:300px;overflow:auto';
    wrap.appendChild(box);
    var rows = [];
    function draw() {
      var q = cmp(input.value || ''); var toks = q.split(/\s+/).filter(Boolean);
      if (!toks.length || q.length < 2) { box.style.display = 'none'; return; }
      var from = (document.getElementById('inv-tr-from') || {}).value || '';
      rows = inv().filter(function (r) {
        if (!live(r) || !(Number(r.stock) > 0) || !inScope(r.store)) return false;
        var h = cmp([r.name, r.barcode, r.batchNo, r.genericName, r.company].join(' '));
        return toks.every(function (t) { return h.indexOf(t) >= 0; });
      }).sort(function (a, b) { var x = String(a.store) === from ? 0 : 1, y = String(b.store) === from ? 0 : 1; return x - y || String(a.name).localeCompare(String(b.name)); }).slice(0, 30);
      box.innerHTML = rows.length ? rows.map(function (r, i) {
        return '<div data-i="' + i + '" style="padding:7px 10px;border-bottom:1px solid #f0f0f0;cursor:pointer;display:flex;gap:8px"><div style="flex:1;min-width:0"><div style="font-size:12.5px;font-weight:800">' + esc(r.name || r.barcode) + '</div><div style="font-size:10.5px;color:#666">' + esc([deptName(r.dept) + ' › ' + (r.store || ''), r.batchNo ? 'Batch ' + r.batchNo : '', r.exp ? 'Exp ' + r.exp : ''].filter(Boolean).join(' · ')) + '</div></div><div style="font-size:11px;font-weight:900;color:#1a6b34">' + esc(r.stock) + '</div></div>';
      }).join('') : '<div style="padding:8px 10px;font-size:12px;color:#888">No stock item found</div>';
      box.style.display = '';
    }
    input.addEventListener('input', draw);
    input.addEventListener('focus', draw);
    input.addEventListener('blur', function () { setTimeout(function () { box.style.display = 'none'; }, 200); });
    box.addEventListener('mousedown', function (e) {
      var el = e.target.closest && e.target.closest('[data-i]'); if (!el) return;
      e.preventDefault();
      var r = rows[Number(el.getAttribute('data-i'))]; if (!r) return;
      var from = document.getElementById('inv-tr-from');
      if (from) { if (![].some.call(from.options, function (o) { return o.value === r.store; })) { var o = document.createElement('option'); o.value = r.store; o.textContent = r.store; from.appendChild(o); } from.value = r.store; }
      input.value = String(r.barcode || r.name);
      var q = document.getElementById('inv-tr-qty'); if (q) { q.max = String(r.stock); if (Number(q.value) > Number(r.stock)) q.value = String(r.stock); }
      box.style.display = 'none';
      try { showToast((r.name || r.barcode) + ' — ' + r.stock + ' in ' + r.store, 'i'); } catch (x) {}
    });
  }
  var obs = new MutationObserver(function () { try { fixSelects(); searchBox(); } catch (e) {} });
  function start() { try { obs.observe(document.body, { childList: true, subtree: true }); fixSelects(); searchBox(); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
  window.bmhInvTransferHeads = { heads: heads };
})();
