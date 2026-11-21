/* BMH — Investigations (all departments): advised → send to lab, and choose the tests of a panel.
 * 1. An investigation that was "Advised" can now be sent to the lab when the patient decides to get it done here:
 *    – in the Advised list each test has "→ Lab" and there is "Send all to lab", and
 *    – ordering the same test again with "Order & Send to Lab" moves it from Advised to Send to Lab (before, nothing happened).
 *    It then behaves exactly like a test sent to the lab from the start.
 * 2. Panels (CBC, RFT, LFT, Thyroid, Lipid …): on "Advise Only" or "Order & Send to Lab" a pop-up lists each ticked panel's
 *    tests with tick boxes, all ticked. Untick the ones not wanted: only the ticked tests are ordered / sent to the lab, and
 *    the printout shows the panel with only those tests (e.g. "LFT: Total Bilirubin, S.G.P.T. (ALT)"). With all ticked the
 *    printout shows just the panel name as before. "All tests" ticks / unticks a whole panel.
 * Off switch (this browser): localStorage.setItem('bmh_lab_order_extras_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_lab_order_extras_off') === '1') return; } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function rerender() {
    try { renderOeInvOrderedList && renderOeInvOrderedList(); } catch (e) {}
    try { renderInvestigationOrders && renderInvestigationOrders(); } catch (e) {}
    try { renderReceptionPage && renderReceptionPage(); } catch (e) {}
  }
  // ── 1. advised → send to lab ──
  function sendToLab(orders, list) {
    if (!list.length) return 0;
    var at = new Date().toISOString(), names = [];
    list.forEach(function (o) { o.mode = 'send'; o.sentToLabAt = at; o.sentToLabBy = (window.CURRENT_USER && CURRENT_USER.name) || ''; names.push(o.name); });
    var bmhId = list[0].bmhId || (getCurrentPatientForInvestigationContext() || {}).bmhId;
    try { if (bmhId) removePendingInvestigationPayRequestsForPatient(bmhId, names); } catch (e) {}
    return names.length;
  }
  window.bmhInvSendAdvisedToLab = function (orderId) {
    var orders = getCurrentPatientInvestigationOrders();
    var list = orders.filter(function (o) { return o && !o.done && String(o.mode || 'send') === 'advise' && (orderId === 'all' || o.id === orderId); });
    var n = sendToLab(orders, list); if (!n) return;
    syncCurrentPatientInvestigationOrders(); persistCurrentPatientInvestigationOrders();
    rerender(); toast('🧪 ' + n + ' investigation' + (n === 1 ? '' : 's') + ' sent to lab ✓');
  };
  function installCards() {
    if (typeof window.buildInvestigationOrderCards !== 'function' || window.buildInvestigationOrderCards._loe) return typeof window.buildInvestigationOrderCards === 'function';
    var orig = window.buildInvestigationOrderCards;
    var w = function (mode, empty) {
      var html = orig.apply(this, arguments);
      if (mode !== 'advise') return html;
      var pending = syncCurrentPatientInvestigationOrders().filter(function (o) { return !o.done && String(o.mode || 'send') === 'advise'; });
      if (!pending.length) return html;
      // a "→ Lab" button on each advised card (cards are in the same order), plus "Send all to lab"
      var i = 0;
      html = html.replace(/<span onclick="cancelInvestigationReceptionRequest\(/g, function (m) {
        var o = pending[i++]; if (!o) return m;
        return '<span onclick="bmhInvSendAdvisedToLab(' + esc(JSON.stringify(o.id)) + ')" title="Patient will get this test done here — send to lab" style="cursor:pointer;font-size:9.5px;font-weight:900;color:#fff;background:var(--teal,#0b7b8c);border-radius:10px;padding:1px 7px">→ Lab</span>' + m;
      });
      return '<div style="margin-bottom:6px"><button type="button" class="btn btn-xs btn-gold" onclick="bmhInvSendAdvisedToLab(\'all\')">🧪 Send all to lab</button></div>' + html;
    };
    w._loe = true; window.buildInvestigationOrderCards = w;
    try { rerender(); } catch (e) {}
    return true;
  }
  // ── 2. choose the tests of each ticked panel ──
  function panelSelections() { return (window.CURRENT_INVESTIGATION_TEMPLATE_SELECTIONS || []).filter(function (t) { return t && String(t.key || '').indexOf('panel-') === 0 && (t.names || []).length; }); }
  function askPanels(panels) {
    return new Promise(function (resolve) {
      var ov = document.createElement('div'); ov.id = 'loe-ov';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:100003;display:flex;align-items:center;justify-content:center';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;padding:16px 18px;width:min(560px,94vw);max-height:86vh;overflow:auto;box-shadow:0 18px 50px rgba(0,0,0,.3)">'
        + '<div style="font-size:15px;font-weight:900;color:#1a3c6e;margin-bottom:2px">🧪 Tests in the panel' + (panels.length > 1 ? 's' : '') + '</div>'
        + '<div style="font-size:11.5px;color:#555;margin-bottom:10px">Untick any test not needed — only the ticked tests are ordered and printed.</div>'
        + panels.map(function (p, pi) {
          return '<div style="border:1px solid #e3e6ec;border-radius:10px;padding:8px 10px;margin-bottom:8px">'
            + '<label style="display:flex;align-items:center;gap:7px;font-weight:900;font-size:13px;color:#1a3c6e;cursor:pointer"><input type="checkbox" class="loe-all" data-p="' + pi + '" checked style="width:16px;height:16px"> ' + esc(p.name) + ' — all tests</label>'
            + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:3px 10px;margin-top:6px">'
            + p.names.map(function (n, ni) { return '<label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer"><input type="checkbox" class="loe-t" data-p="' + pi + '" data-n="' + ni + '" checked style="width:14px;height:14px"> ' + esc(n) + '</label>'; }).join('')
            + '</div></div>';
        }).join('')
        + '<div style="display:flex;gap:8px;margin-top:6px"><button type="button" id="loe-ok" style="flex:2;background:#1a3c6e;color:#fff;border:none;border-radius:9px;padding:10px;font-weight:900;cursor:pointer">Continue with ticked tests</button>'
        + '<button type="button" id="loe-cancel" style="flex:1;background:#f2f2f7;color:#333;border:none;border-radius:9px;padding:10px;font-weight:700;cursor:pointer">Back</button></div></div>';
      document.body.appendChild(ov);
      ov.addEventListener('change', function (e) {
        var t = e.target, pi = t.getAttribute('data-p');
        if (t.classList.contains('loe-all')) Array.prototype.forEach.call(ov.querySelectorAll('.loe-t[data-p="' + pi + '"]'), function (c) { c.checked = t.checked; });
        else if (t.classList.contains('loe-t')) { var all = ov.querySelectorAll('.loe-t[data-p="' + pi + '"]'), on = ov.querySelectorAll('.loe-t[data-p="' + pi + '"]:checked'); ov.querySelector('.loe-all[data-p="' + pi + '"]').checked = all.length === on.length; }
      });
      ov.querySelector('#loe-cancel').onclick = function () { ov.remove(); resolve(null); };
      ov.querySelector('#loe-ok').onclick = function () {
        var keep = panels.map(function (p, pi) { return p.names.filter(function (n, ni) { var c = ov.querySelector('.loe-t[data-p="' + pi + '"][data-n="' + ni + '"]'); return c && c.checked; }); });
        ov.remove(); resolve(keep);
      };
    });
  }
  function applyPanelChoice(panels, keep) {
    var tpl = window.CURRENT_INVESTIGATION_TEMPLATE_SELECTIONS;
    var dropped = {};
    panels.forEach(function (p, pi) {
      var k = keep[pi];
      p.names.forEach(function (n) { if (k.indexOf(n) < 0) dropped[n] = 1; });
      if (!k.length) { var idx = tpl.indexOf(p); if (idx > -1) tpl.splice(idx, 1); return; }
      if (k.length < p.names.length) {
        var short = String(p.name || '').replace(/\s*:.*$/, '');
        p.names = k.slice(); p.name = short + ': ' + k.join(', ');
      }
    });
    // a test still wanted by another selection, or ticked on its own, stays
    var needed = {};
    tpl.forEach(function (t) { (t && t.names || []).forEach(function (n) { needed[n] = 1; }); });
    for (var i = SELECTED_INVESTIGATIONS.length - 1; i >= 0; i--) {
      var n = SELECTED_INVESTIGATIONS[i].name;
      if (dropped[n] && !needed[n]) SELECTED_INVESTIGATIONS.splice(i, 1);
    }
  }
  function installConfirm() {
    if (typeof window.confirmInvestigations !== 'function' || window.confirmInvestigations._loe) return typeof window.confirmInvestigations === 'function';
    var orig = window.confirmInvestigations;
    var w = function (modeArg) {
      var self = this, args = arguments;
      var go = function () {
        // the same test already advised + now "send" → move it to Send to Lab
        var mode = modeArg === 'advise' ? 'advise' : (modeArg === 'send' ? 'send' : (window.CURRENT_INVESTIGATION_ORDER_MODE === 'advise' ? 'advise' : 'send'));
        if (mode === 'send') {
          try {
            var orders = getCurrentPatientInvestigationOrders(), sel = {};
            SELECTED_INVESTIGATIONS.forEach(function (i) { sel[i.name] = 1; });
            sendToLab(orders, orders.filter(function (o) { return o && !o.done && String(o.mode || 'send') === 'advise' && sel[o.name]; }));
          } catch (e) {}
        }
        return orig.apply(self, args);
      };
      var panels = panelSelections();
      if (!panels.length || !SELECTED_INVESTIGATIONS.length) return go();
      return askPanels(panels).then(function (keep) {
        if (!keep) return;
        applyPanelChoice(panels, keep);
        try { syncSelectedInvestigationCheckboxes && syncSelectedInvestigationCheckboxes(); } catch (e) {}
        if (!SELECTED_INVESTIGATIONS.length) { toast('No tests left ticked', 'w'); return; }
        return go();
      });
    };
    w._loe = true; window.confirmInvestigations = w;
    return true;
  }
  function install() { var a = installCards(), b = installConfirm(); return a && b; }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
