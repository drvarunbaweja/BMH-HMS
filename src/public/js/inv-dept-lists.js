/* BMH — Stock lists show the patient's department stock first; other departments' stock needs a staff PIN.
 * Procedure done (doctor panel / reception) and Inventory → Patient Usage list only the stock of the department the
 * patient is in: its own stores (e.g. OBG → OBG OT, Labour Room, OBG stores) and shared stores without a department
 * (Minor OT, Procedure Room, central pharmacy …). Other departments' stores are hidden.
 * "🔓 Show other departments' stock" → staff name + PIN → all stores show for the next 10 minutes on that screen. Taking
 * one of those items still shows the warning "This is an OBG patient — are you taking … from Eye OT?" (no second PIN
 * within the 10 minutes).
 * Admin logins see all stores as before. Barcode scanning and stock deduction are unchanged.
 * Off switch (this browser): localStorage.setItem('bmh_inv_dept_lists_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_inv_dept_lists_off') === '1') return; } catch (e) {}
  var LABEL = { ophtho: 'Eye', obg: 'OBG', psych: 'Psychiatry', skin: 'Skin' };
  var UNLOCK_MS = 10 * 60 * 1000;
  var unlock = { name: '', until: 0 };
  var filtering = '';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function admin() { try { return !!(CURRENT_USER && (CURRENT_USER.isAdmin || (typeof isAdminUser === 'function' && isAdminUser()))); } catch (e) { return false; } }
  function dkey(v) {
    var k = String(v || '').toLowerCase().trim();
    if (/^(eye|ophth|optom)/.test(k)) return 'ophtho';
    if (/^(obg|obs|gyn|labou?r)/.test(k)) return 'obg';
    if (/^(psych|neuro)/.test(k)) return 'psych';
    if (/^(skin|derm|cosm)/.test(k)) return 'skin';
    return '';
  }
  function storeDept(store) {
    try { if (window.bmhInvScope && bmhInvScope.storeDept) return bmhInvScope.storeDept(store) || ''; } catch (e) {}
    var s = String(store || '').toLowerCase();
    return /^eye|eye ot/.test(s) ? 'ophtho' : /^obg|labou?r room/.test(s) ? 'obg' : /^psy/.test(s) ? 'psych' : /^skin/.test(s) ? 'skin' : '';
  }
  function unlocked() { return admin() || (unlock.name && Date.now() < unlock.until); }
  function own(item, dept) { var sd = storeDept(item && item.store); return !sd || sd === dept; }
  function useDept() {
    var id = (document.getElementById('use-pt') || {}).value || '';
    var p = null; try { p = (PATIENTS || []).find(function (x) { return x && String(x.bmhId) === String(id); }); } catch (e) {}
    return dkey(p && p.dept) || dkey((document.getElementById('inv-use-dept') || {}).value);
  }
  function askUnlock(dept, after) {
    var pin = window.bmhStockStaff && bmhStockStaff.pin;
    if (!pin) { try { showToast('Staff PIN not available', 'w'); } catch (e) {} return; }
    pin(true, 'To see other departments\' stock (' + (LABEL[dept] || 'this') + ' patient) — enter your staff PIN.').then(function (name) {
      if (!name) return;
      unlock = { name: name, until: Date.now() + UNLOCK_MS };
      try { fbPush('auditLog', { user: (CURRENT_USER || {}).name || '', role: (CURRENT_USER || {}).role || '', action: 'STOCK_OTHER_DEPT_UNLOCKED', item: (LABEL[dept] || dept) + ' patient · by ' + name, timestamp: new Date().toISOString() }); } catch (e) {}
      after && after();
    });
  }
  function moreRow(n, dept, fn) {
    return '<div class="idl-more" style="padding:7px 10px;font-size:11px;color:#8a4200;background:#fff8e1;border-top:1px solid #f1e3b5">'
      + (n ? n + ' more item' + (n === 1 ? '' : 's') + ' in other departments\' stores. ' : 'Showing ' + esc(LABEL[dept] || dept) + ' and shared stores only. ')
      + '<a href="#" onclick="' + fn + ';return false" style="font-weight:900;color:#1a3c6e">🔓 Show other departments\' stock</a> (staff PIN)</div>';
  }
  function install() {
    var ok = true;
    // ── Procedure done ──
    if (typeof window.bmhProcedureStockRows === 'function' && !window.bmhProcedureStockRows._idl) {
      var orows = window.bmhProcedureStockRows;
      var r = function (dept) {
        var rows = orows.apply(this, arguments) || [];
        var d = dkey(dept);
        if (!d || unlocked() || filtering === 'off') return rows;
        return rows.filter(function (it) { return own(it, d); });
      };
      r._idl = true; window.bmhProcedureStockRows = r;
    } else if (typeof window.bmhProcedureStockRows !== 'function') ok = false;
    if (typeof window.renderProcedureStockSearch === 'function' && !window.renderProcedureStockSearch._idl) {
      var ors = window.renderProcedureStockSearch;
      var s = function (dept, query) {
        var res = ors.apply(this, arguments);
        try {
          var d = dkey(dept), host = document.getElementById('proc-done-stock-results');
          if (d && host && !unlocked()) {
            filtering = 'off'; var all = []; try { all = window.bmhProcedureStockRows(dept) || []; } finally { filtering = ''; }
            var q = String(query || '').trim().toLowerCase(), tokens = q.split(/\s+/).filter(Boolean);
            var hidden = all.filter(function (it) { if (own(it, d)) return false; if (!tokens.length) return true; var hay = ''; try { hay = bmhInventoryItemSearchHaystack(it); } catch (e) {} return tokens.every(function (t) { return hay.indexOf(t) >= 0; }); }).length;
            host.insertAdjacentHTML('beforeend', moreRow(hidden, d, 'bmhInvDeptLists.unlockProc()'));
          }
        } catch (e) {}
        return res;
      };
      s._idl = true; window.renderProcedureStockSearch = s;
    } else if (typeof window.renderProcedureStockSearch !== 'function') ok = false;
    // ── Inventory → Patient Usage search ──
    if (typeof window.bmhFindInventoryUseItems === 'function' && !window.bmhFindInventoryUseItems._idl) {
      var of = window.bmhFindInventoryUseItems;
      var f = function () {
        var rows = of.apply(this, arguments) || [];
        if (!filtering || filtering === 'off' || unlocked()) return rows;
        var d = filtering;
        return rows.filter(function (it) { return own(it, d); });
      };
      f._idl = true; window.bmhFindInventoryUseItems = f;
    } else if (typeof window.bmhFindInventoryUseItems !== 'function') ok = false;
    if (typeof window.renderInventoryUseItemResults === 'function' && !window.renderInventoryUseItemResults._idl) {
      var ou = window.renderInventoryUseItemResults;
      var u = function (query) {
        var d = useDept();
        if (!d || unlocked()) return ou.apply(this, arguments);
        var res; filtering = d; try { res = ou.apply(this, arguments); } finally { filtering = ''; }
        try {
          var box = document.getElementById('inv-use-item-results');
          if (box && box.style.display !== 'none' && String(query || '').trim().length >= 2) {
            filtering = 'off'; var all = []; try { all = of(query) || []; } finally { filtering = ''; }
            var hidden = all.filter(function (it) { return !own(it, d); }).length;
            if (hidden) {
              var none = box.textContent.indexOf('No stock item found') >= 0;
              if (none) box.innerHTML = '<div style="padding:10px 12px;font-size:12px;color:var(--g1)">No ' + esc(LABEL[d] || d) + ' stock found</div>';
              box.insertAdjacentHTML('beforeend', moreRow(hidden, d, 'bmhInvDeptLists.unlockUse()'));
            }
          }
        } catch (e) {}
        return res;
      };
      u._idl = true; window.renderInventoryUseItemResults = u;
    } else if (typeof window.renderInventoryUseItemResults !== 'function') ok = false;
    return ok;
  }
  window.bmhInvDeptLists = {
    unlockProc: function () {
      var dept = (document.getElementById('proc-done-dept') || {}).value || '';
      askUnlock(dkey(dept), function () { var sEl = document.getElementById('proc-done-stock-search'); try { renderProcedureDeptStoreChips(dept); } catch (e) {} try { renderProcedureStockSearch(dept, sEl ? sEl.value : ''); } catch (e) {} });
    },
    unlockUse: function () {
      askUnlock(useDept(), function () { var i = document.getElementById('inv-use-item-search'); try { renderInventoryUseItemResults(i ? i.value : ''); } catch (e) {} });
    },
    // used by inv-dept-guard.js: the staff who unlocked in the last 10 minutes (no second PIN)
    unlockedBy: function () { return unlock.name && Date.now() < unlock.until ? unlock.name : ''; }
  };
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
