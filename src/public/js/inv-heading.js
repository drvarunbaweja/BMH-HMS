/* BMH — Inventory: rename a department heading (OPHTHO, OT, OBG …) in a pop-up.
 *  • "Edit" next to a department heading in Current Stock (and "Edit department heading") opens a small pop-up instead of
 *    the one-line box. Only the heading's name changes: the stores, categories and stock lines under it stay exactly as
 *    they are (they keep the same department code).
 *  • Department headings were saved only on the computer where they were edited; they are now also shared through
 *    settings/inventory/deptRows, so a rename shows on every computer. Departments that exist only on one computer are
 *    kept (lists are combined; the latest name wins).
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function trim(v) { try { return bmhTrimInventoryHeadingValue(v); } catch (e) { return String(v || '').trim().replace(/\s+/g, ' '); } }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function isAdmin() { var u = null; try { u = CURRENT_USER; } catch (e) {} try { return !!(u && (u.isAdmin || (typeof isAdminUser === 'function' && isAdminUser()))); } catch (e) { return !!(u && u.isAdmin); } }
  function rerender() { ['bmhPopulateInventoryDeptSelects', 'renderStockList', 'renderInventoryStoreStock'].forEach(function (f) { try { if (typeof window[f] === 'function') window[f](); } catch (e) {} }); }

  // ── share department headings between computers ──
  var TS_KEY = 'bmh_inventory_depts_at', NODE = 'settings/inventory/deptRows';
  var origSave = window.saveInventoryDeptRows;
  var applying = false;
  if (typeof origSave === 'function') {
    window.saveInventoryDeptRows = function (rows) {
      var r = origSave.apply(this, arguments);
      if (applying) return r;
      var at = Date.now();
      try { localStorage.setItem(TS_KEY, String(at)); } catch (e) {}
      try { if (window.FBDB) window.FBDB.ref(NODE).set({ rows: (rows || []).map(function (x) { return { value: String(x.value), label: String(x.label) }; }), updatedAt: at }).catch(function () {}); } catch (e) {}
      return r;
    };
  }
  function applyRemote(v) {
    if (!v || !Array.isArray(v.rows) || !v.rows.length) return;
    var at = Number(v.updatedAt || 0), mine = 0;
    try { mine = Number(localStorage.getItem(TS_KEY) || 0); } catch (e) {}
    if (at <= mine) return;
    var local = []; try { local = loadInventoryDeptRows(); } catch (e) {}
    var out = v.rows.filter(function (x) { return x && x.value && x.label; }).map(function (x) { return { value: String(x.value), label: String(x.label) }; });
    local.forEach(function (x) { if (x && x.value && !out.some(function (y) { return y.value === x.value; })) out.push({ value: x.value, label: x.label }); });
    applying = true;
    try { window.saveInventoryDeptRows(out); localStorage.setItem(TS_KEY, String(at)); } catch (e) {}
    applying = false;
    rerender();
  }
  var on = false;
  function listen() {
    if (on || !window.FBDB) return on;
    on = true;
    window.FBDB.ref(NODE).on('value', function (s) { try { applyRemote(s.val()); } catch (e) {} }, function () {});
    return true;
  }
  if (!listen()) { var n = 0, iv = setInterval(function () { if (listen() || ++n > 120) clearInterval(iv); }, 1000); }

  // ── Current Stock headings use the saved heading names ──
  // Stock lines carry the department as "Ophtho" / "Obg" / "Ot", which the heading lookup did not match, so the
  // headings showed the raw code and a rename never appeared. Inside the Current Stock views only, the heading now
  // comes from the department list (same names as before unless admin renamed them). Elsewhere nothing changes.
  var inInv = 0, origLabel = window.bmhDeptLabel;
  function rowFor(k) { var key = String(k || '').trim().toLowerCase(); if (!key) return null; try { return loadInventoryDeptRows().find(function (r) { return String(r.value).toLowerCase() === key; }) || null; } catch (e) { return null; } }
  if (typeof origLabel === 'function') {
    window.bmhDeptLabel = function (k) {
      if (inInv) { var r = rowFor(k); if (r && r.label) return r.label; }
      return origLabel.apply(this, arguments);
    };
  }
  ['renderStockList', 'renderInventoryStoreStock'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { inInv++; try { return o.apply(this, arguments); } finally { inInv--; } };
  });

  // ── the pop-up ──
  window.renameInventoryDeptPrompt = function (deptKey) {
    if (!isAdmin()) { toast('Only admin can rename departments', 'w'); return; }
    var rows; try { rows = loadInventoryDeptRows().slice(); } catch (e) { return; }
    if (!rows.length) return;
    var cur = rows.find(function (r) { return String(r.value).toLowerCase() === String(deptKey || '').trim().toLowerCase(); }) || rows[0];
    var old = document.getElementById('dh-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'dh-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4900;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:14px';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:420px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="font-size:15px;font-weight:900;margin-bottom:10px">✏️ Rename department heading</div>'
      + '<label style="font-size:11.5px;font-weight:800;color:#555">Department</label>'
      + '<select id="dh-sel" style="width:100%;padding:8px;border:1px solid #cfd6e2;border-radius:8px;margin:4px 0 10px">' + rows.map(function (r) { return '<option value="' + esc(r.value) + '"' + (r === cur ? ' selected' : '') + '>' + esc(r.label) + '</option>'; }).join('') + '</select>'
      + '<label style="font-size:11.5px;font-weight:800;color:#555">New heading</label>'
      + '<input type="text" id="dh-name" value="' + esc(cur.label) + '" style="width:100%;padding:8px;border:1px solid #cfd6e2;border-radius:8px;margin:4px 0 8px;box-sizing:border-box">'
      + '<div style="font-size:11.5px;color:#555;margin-bottom:12px">Only the heading’s name changes. The stores, categories and stock under it stay exactly as they are.</div>'
      + '<div style="display:flex;justify-content:flex-end;gap:8px"><button type="button" class="btn btn-gray btn-sm" id="dh-x">Cancel</button><button type="button" class="btn btn-blue btn-sm" id="dh-ok">Save</button></div></div>';
    document.body.appendChild(ov);
    var sel = ov.querySelector('#dh-sel'), inp = ov.querySelector('#dh-name');
    sel.onchange = function () { var r = rows.find(function (x) { return String(x.value) === sel.value; }); inp.value = r ? r.label : ''; inp.focus(); inp.select(); };
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    ov.querySelector('#dh-x').onclick = function () { ov.remove(); };
    function saveIt() {
      var r = rows.find(function (x) { return String(x.value) === sel.value; }); if (!r) return;
      var next = trim(inp.value);
      if (!next) { toast('Type the new heading', 'w'); return; }
      if (next === r.label) { ov.remove(); return; }
      if (rows.some(function (x) { return x !== r && String(x.label).trim().toLowerCase() === next.toLowerCase(); })) { toast('Another department already has the heading "' + next + '"', 'w'); return; }
      r.label = next;
      window.saveInventoryDeptRows(rows);
      ov.remove(); rerender();
      toast('Department heading updated ✓', 's');
    }
    ov.querySelector('#dh-ok').onclick = saveIt;
    inp.onkeydown = function (e) { if (e.key === 'Enter') saveIt(); if (e.key === 'Escape') ov.remove(); };
    setTimeout(function () { inp.focus(); inp.select(); }, 30);
  };
})();
