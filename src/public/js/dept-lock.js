/* BMH — Inventory: stock stays in its own department.
 *  • A department inventory login (e.g. OBG Ropar) can only save stock in Stock In under its own department; the other
 *    clinical departments are greyed out in the Department box.
 *  • A store belongs to one department ("OBG …" / Labour Room → OBG, "Eye …" → Ophthalmology, "PSY …", "Skin …", or the
 *    department admin set for it). A stock line saved into that store always takes that department, whatever the
 *    Department box says; choosing the store sets the box to match.
 *  • Admin (Inventory → Stock In → ✏️ next to Store):
 *      – "🏷 Department" on a store: move the store (and all its stock lines) to another department;
 *      – "🏷 Fix stock lines in the wrong department": puts back stock lines whose department does not match their
 *        store's department (e.g. OBG Ropar stock saved under Ophthalmology), after a confirmation.
 *  Only Ophthalmology / OBG / Psychiatry / Skin are enforced; "General / Shared", "OT", "IPD" lines are left as they are.
 */
(function () {
  'use strict';
  var CLIN = ['ophtho', 'obg', 'psych', 'skin'];
  var LABEL = { ophtho: 'Ophthalmology', obg: 'OBG', psych: 'Psychiatry', skin: 'Skin' };
  function key(s) { return String(s || '').trim().replace(/\s+/g, ' ').toLowerCase(); }
  function fbKey(s) { return key(s).replace(/[.#$\[\]\/]/g, '_') || '_'; }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function inv() { try { return INVENTORY || []; } catch (e) { return []; } }
  function isAdmin() { var u = null; try { u = CURRENT_USER; } catch (e) {} try { return !!(u && (u.isAdmin || (typeof isAdminUser === 'function' && isAdminUser()))); } catch (e) { return !!(u && u.isAdmin); } }
  function S() { return window.bmhInvScope || null; }
  function scopeDept() { try { var sc = S() && S().scope && S().scope(); return (sc && CLIN.indexOf(sc.dept) >= 0) ? sc.dept : ''; } catch (e) { return ''; } }
  function deptLabel(d) { try { var r = loadInventoryDeptRows().find(function (x) { return x.value === d; }); if (r) return r.label; } catch (e) {} return LABEL[d] || d || 'No department'; }

  // admin-set departments for stores (settings/inventory/storeDeptMap)
  var OVR = {};
  window.__bmhStoreDeptOverride = function (store) { var v = OVR[fbKey(store)]; return v && v.dept ? v.dept : ''; };
  function storeD(store) { try { return S() ? S().storeDept(store) || '' : ''; } catch (e) { return ''; } }
  var listening = false;
  function listen() {
    if (listening || !window.FBDB) return listening;
    listening = true;
    window.FBDB.ref('settings/inventory/storeDeptMap').on('value', function (s) {
      OVR = s.val() || {};
      try { var el = document.getElementById('inv-stock'); if (el && el.offsetParent !== null && typeof renderStockList === 'function') renderStockList(); } catch (e) {}
    }, function () {});
    return true;
  }
  if (!listen()) { var lt = 0, liv = setInterval(function () { if (listen() || ++lt > 120) clearInterval(liv); }, 1000); }

  // a stock line's department follows its store
  var wrong = new Set();
  // saved lines carry the department as "Obg" / "Ophtho" (title case) — compare by key, write back in the same style
  function dkey(v) { var s = String(v || '').trim(); if (!s) return ''; try { var k = normalizeDeptKeyForQueue(s); if (k) return k; } catch (e) {} try { var k2 = S() && S().deptKey(s); if (k2) return k2; } catch (e) {} return s.toLowerCase(); }
  function styled(d, like) { return /^[A-Z]/.test(String(like || '')) ? d.charAt(0).toUpperCase() + d.slice(1) : d; }
  function fixRow(r) {
    if (!r || !r.store) return false;
    var d = storeD(r.store); if (CLIN.indexOf(d) < 0) return false;
    var cur = dkey(r.dept);
    if (cur === d) return false;
    if (cur && CLIN.indexOf(cur) < 0) return false; // General / OT / IPD lines stay as they are
    r.dept = styled(d, r.dept); return true;
  }
  function fixAll() { inv().forEach(function (r) { if (fixRow(r)) wrong.add(r); }); }
  var origNorm = window.normalizeInventoryRecord;
  if (typeof origNorm === 'function') {
    window.normalizeInventoryRecord = function (item) { var r = origNorm.apply(this, arguments); try { fixRow(item); } catch (e) {} return r; };
  }
  ['renderStockList', 'renderInventoryStoreStock'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { try { fixAll(); } catch (e) {} return o.apply(this, arguments); };
  });

  // Stock In form: department box locked for department logins, and follows the chosen store
  function lockForm() {
    var sel = document.getElementById('inv-in-dept'), st = document.getElementById('inv-in-store');
    if (!sel) return;
    var sd = scopeDept();
    Array.prototype.forEach.call(sel.options, function (o) { var k = dkey(o.value); o.disabled = !!sd && CLIN.indexOf(k) >= 0 && k !== sd; });
    var want = (st && storeD(st.value)) || sd;
    if (want && CLIN.indexOf(want) >= 0 && dkey(sel.value) !== want) { var hit = Array.prototype.find.call(sel.options, function (o) { return dkey(o.value) === want && !o.disabled; }); if (hit) sel.value = hit.value; }
    if (st && !st.__bmhDeptLock) {
      st.__bmhDeptLock = 1;
      st.addEventListener('change', function () { lockForm(); });
    }
    if (!sel.__bmhDeptLock) {
      sel.__bmhDeptLock = 1;
      sel.addEventListener('change', function () {
        var d = (st && storeD(st.value)) || scopeDept();
        if (d && CLIN.indexOf(d) >= 0 && CLIN.indexOf(dkey(sel.value)) >= 0 && dkey(sel.value) !== d) {
          toast('"' + ((st && st.value) || 'This store') + '" belongs to ' + deptLabel(d) + ' — department kept as ' + deptLabel(d), 'w');
          var hit = Array.prototype.find.call(sel.options, function (o) { return dkey(o.value) === d; }); if (hit) sel.value = hit.value;
        }
      });
    }
  }
  ['bmhPopulateInventoryDeptSelects', 'bmhPopulateInventorySelectors'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { var r = o.apply(this, arguments); try { lockForm(); } catch (e) {} return r; };
  });
  var origDeptVal = window.bmhInventoryDeptValue;
  if (typeof origDeptVal === 'function') {
    window.bmhInventoryDeptValue = function () {
      var v = origDeptVal.apply(this, arguments);
      try {
        var st = document.getElementById('inv-in-store'), d = (st && storeD(st.value)) || scopeDept();
        if (d && CLIN.indexOf(d) >= 0 && CLIN.indexOf(dkey(v)) >= 0 && dkey(v) !== d) return d;
      } catch (e) {}
      return v;
    };
  }

  // ── admin tools ──
  function syncRows(rows) {
    if (!rows.length) return;
    var ts = new Date().toISOString(); rows.forEach(function (r) { r.updatedAt = ts; });
    try { bmhSyncInventoryRowsToCloud(rows); } catch (e) { rows.forEach(function (r) { try { saveInventoryToFirebase(r); } catch (e2) {} }); }
    try { saveInventoryStockToStorage(); } catch (e) {}
  }
  function refresh() { ['bmhPopulateInventorySelectors', 'renderStockList', 'renderInventoryStoreStock'].forEach(function (f) { try { if (typeof window[f] === 'function') window[f](); } catch (e) {} }); }
  window.bmhStoreDeptOf = function (store) { return storeD(store); };
  window.bmhFixStoreDeptMismatch = function () {
    if (!isAdmin()) { toast('Only admin can do this', 'w'); return; }
    fixAll();
    var rows = Array.from(wrong);
    if (!rows.length) { toast('All stock lines are in their store’s department ✓', 's'); return; }
    var g = {}; rows.forEach(function (r) { var k = r.store + ' → ' + deptLabel(dkey(r.dept)); g[k] = (g[k] || 0) + 1; });
    if (!confirm('Put these stock lines back in their store’s department?\n\n' + Object.keys(g).map(function (k) { return '• ' + k + ' — ' + g[k] + ' stock line' + (g[k] === 1 ? '' : 's'); }).join('\n') + '\n\nOnly the department changes; quantities stay the same.')) return;
    syncRows(rows); wrong.clear(); refresh();
    toast(rows.length + ' stock line' + (rows.length === 1 ? '' : 's') + ' put back in the right department ✓', 's');
  };
  window.bmhMoveStoreToDept = function (store) {
    if (!isAdmin()) { toast('Only admin can move a store to another department', 'w'); return; }
    var rows; try { rows = loadInventoryDeptRows(); } catch (e) { rows = CLIN.map(function (d) { return { value: d, label: LABEL[d] }; }); }
    var cur = storeD(store);
    var old = document.getElementById('dl-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'dl-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4900;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:14px';
    var lines = inv().filter(function (r) { return r && key(r.store) === key(store); });
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:400px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="font-size:15px;font-weight:900;margin-bottom:6px">🏷 Department of “' + String(store).replace(/</g, '&lt;') + '”</div>'
      + '<div style="font-size:12px;color:#555;margin-bottom:10px">Now: <b>' + deptLabel(cur) + '</b> · ' + lines.length + ' stock line' + (lines.length === 1 ? '' : 's') + '. Moving it moves all its stock lines; department logins then see it in the new department.</div>'
      + '<select id="dl-sel" style="width:100%;padding:8px;border:1px solid #cfd6e2;border-radius:8px;margin-bottom:12px"><option value="">— choose the department —</option>' + rows.map(function (r) { return '<option value="' + r.value + '"' + (dkey(r.value) === cur ? ' selected' : '') + '>' + r.label + '</option>'; }).join('') + '</select>'
      + '<div style="display:flex;justify-content:flex-end;gap:8px"><button type="button" class="btn btn-gray btn-sm" id="dl-x">Cancel</button><button type="button" class="btn btn-blue btn-sm" id="dl-ok">Move store</button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#dl-x').onclick = function () { ov.remove(); };
    ov.querySelector('#dl-ok').onclick = function () {
      var d = ov.querySelector('#dl-sel').value;
      if (!d) { toast('Choose the department', 'w'); return; }
      if (dkey(d) === cur) { ov.remove(); return; }
      if (!confirm('Move “' + store + '” and its ' + lines.length + ' stock line' + (lines.length === 1 ? '' : 's') + ' to ' + deptLabel(d) + '?')) return;
      OVR[fbKey(store)] = { dept: d, store: store, by: (CURRENT_USER && CURRENT_USER.name) || '', at: new Date().toISOString() };
      try { window.FBDB.ref('settings/inventory/storeDeptMap/' + fbKey(store)).set(OVR[fbKey(store)]); } catch (e) {}
      lines.forEach(function (r) { r.dept = styled(d, r.dept); });
      syncRows(lines); ov.remove(); refresh();
      toast('“' + store + '” moved to ' + deptLabel(d) + ' ✓', 's');
    };
  };
})();
