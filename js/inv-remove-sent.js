/* BMH — Investigations (all departments): remove some or all tests already sent to the lab.
 * In the "Send to Lab" list each test now has a clear red ✕ (before: a faint ×), and there is "🗑 Remove tests…",
 * which lists the tests sent to the lab with tick boxes (all / a few) and removes the ticked ones after a confirm.
 * A removed test goes from the lab's list and from reception's pending charges (the same as the ✕ always did).
 * Tests that already have a result are not listed. Every removal is written to the audit log.
 * Off switch (this browser): localStorage.setItem('bmh_inv_remove_sent_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_inv_remove_sent_off') === '1') return; } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function sent() { try { return syncCurrentPatientInvestigationOrders().filter(function (o) { return o && !o.done && String(o.mode || 'send') === 'send'; }); } catch (e) { return []; } }
  function audit(names) {
    try { var p = getCurrentPatientForInvestigationContext() || {}; fbPush('auditLog', { user: (CURRENT_USER || {}).name || '', role: (CURRENT_USER || {}).role || '', action: 'LAB_TESTS_REMOVED', item: (p.name || '') + ' [' + (p.bmhId || '') + '] ' + names.join(', '), timestamp: new Date().toISOString() }); } catch (e) {}
  }
  function removeIds(ids) {
    var list = sent().filter(function (o) { return ids.indexOf(o.id) >= 0; }), names = list.map(function (o) { return o.name; });
    var orig = window.showToast; window.showToast = function () {};
    try { list.forEach(function (o) { try { cancelInvestigationReceptionRequest(o.id); } catch (e) {} }); } finally { window.showToast = orig; }
    if (names.length) { audit(names); try { showToast(names.length + ' test' + (names.length === 1 ? '' : 's') + ' removed from the lab ✓', 's'); } catch (e) {} }
  }
  window.bmhInvRemoveOne = function (id) {
    var o = sent().find(function (x) { return x.id === id; }); if (!o) return;
    if (!window.confirm('Remove "' + o.name + '" from the lab?')) return;
    removeIds([id]);
  };
  window.bmhInvRemovePick = function () {
    var list = sent(); if (!list.length) return;
    var old = document.getElementById('irs-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'irs-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:100003;display:flex;align-items:center;justify-content:center;padding:14px';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;padding:16px 18px;width:min(480px,94vw);max-height:86vh;overflow:auto;box-shadow:0 18px 50px rgba(0,0,0,.3)">'
      + '<div style="font-size:15px;font-weight:900;color:#1a3c6e">🗑 Remove tests sent to the lab</div><div style="font-size:11.5px;color:#555;margin:2px 0 10px">Tick the tests to remove.</div>'
      + '<label style="display:flex;align-items:center;gap:7px;font-weight:900;font-size:13px;margin-bottom:6px;cursor:pointer"><input type="checkbox" id="irs-all" style="width:16px;height:16px"> All tests</label>'
      + list.map(function (o) { return '<label style="display:flex;align-items:center;gap:7px;font-size:12.5px;padding:4px 0;cursor:pointer"><input type="checkbox" class="irs-ck" value="' + esc(o.id) + '" style="width:15px;height:15px"> ' + esc(o.name) + (o.notes ? ' <span style="color:#777">(' + esc(o.notes) + ')</span>' : '') + '</label>'; }).join('')
      + '<div style="display:flex;gap:8px;margin-top:12px"><button type="button" id="irs-go" style="flex:2;background:#c62828;color:#fff;border:none;border-radius:9px;padding:10px;font-weight:900;cursor:pointer">Remove ticked (0)</button><button type="button" id="irs-no" style="flex:1;background:#f2f2f7;border:none;border-radius:9px;padding:10px;font-weight:700;cursor:pointer">Cancel</button></div></div>';
    document.body.appendChild(ov);
    var count = function () { var n = ov.querySelectorAll('.irs-ck:checked').length; ov.querySelector('#irs-go').textContent = 'Remove ticked (' + n + ')'; ov.querySelector('#irs-all').checked = n === list.length; };
    ov.addEventListener('change', function (e) { if (e.target.id === 'irs-all') Array.prototype.forEach.call(ov.querySelectorAll('.irs-ck'), function (c) { c.checked = e.target.checked; }); count(); });
    ov.querySelector('#irs-no').onclick = function () { ov.remove(); };
    ov.querySelector('#irs-go').onclick = function () {
      var ids = Array.prototype.map.call(ov.querySelectorAll('.irs-ck:checked'), function (c) { return c.value; });
      if (!ids.length) return;
      if (!window.confirm('Remove ' + ids.length + ' test' + (ids.length === 1 ? '' : 's') + ' from the lab?')) return;
      ov.remove(); removeIds(ids);
    };
  };
  function install() {
    var o = window.buildInvestigationOrderCards; if (typeof o !== 'function') return false; if (o._irs) return true;
    var w = function (mode) {
      var html = o.apply(this, arguments);
      if (mode !== 'send') return html;
      var list = sent(); if (!list.length) return html;
      var i = 0;
      html = html.replace(/<span onclick="cancelInvestigationReceptionRequest\([^)]*\)" style="cursor:pointer;opacity:\.6;font-size:12px">&times;<\/span>/g, function (m) {
        var x = list[i++]; if (!x) return m;
        return '<span onclick="bmhInvRemoveOne(' + esc(JSON.stringify(x.id)) + ')" title="Remove this test from the lab" style="cursor:pointer;font-size:11px;font-weight:900;color:#fff;background:#c62828;border-radius:10px;padding:0 6px;line-height:16px">✕</span>';
      });
      return '<div style="margin-bottom:6px"><button type="button" class="btn btn-xs btn-outline" style="color:#c62828;border-color:#f1b3b3" onclick="bmhInvRemovePick()">🗑 Remove tests…</button></div>' + html;
    };
    w._irs = true; window.buildInvestigationOrderCards = w;
    try { renderOeInvOrderedList && renderOeInvOrderedList(); } catch (e) {}
    return true;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
