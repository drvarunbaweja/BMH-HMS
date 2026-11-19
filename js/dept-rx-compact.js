/* BMH — OBG / Psych / Skin → Prescription tab made shorter (layout only, like Eye v161).
 *   – medicines: one column heading for all, rows close together, Taper / ✕ side by side
 *   – "+ Full Drug Form · language · Brochure · Instructions · Save as Template" on one line
 *   – Next appointment: day / week / month buttons, date and Book on one line
 *   – OBG only: Surgery / Procedure advised and Instructions side by side
 * Nothing is renamed or removed: every field keeps its id and handlers, so saving and printing are unchanged.
 * Off switch (this browser): localStorage.setItem('bmh_dept_rx_compact_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_dept_rx_compact_off') === '1') return; } catch (e) {}
  var TABS = ['obg-rx']; // Psych / Skin to be added after their go-ahead: 'psych-rx', 'skin-rx'
  var S = TABS.map(function (t) { return '#' + t; });
  function sel(suffix) { return S.map(function (s) { return s + ' ' + suffix; }).join(','); }
  var CSS = ''
    + sel('.rx-drugs-root') + '{gap:0!important}'
    + sel('.rx-drugs-root>div[style*="overflow:hidden"]') + '{border-radius:0!important;box-shadow:none!important}'
    + sel('.rx-drugs-root>div[style*="overflow:hidden"]:first-of-type') + '{border-radius:10px 10px 0 0!important}'
    + sel('.rx-drugs-root>div[style*="overflow:hidden"]~div[style*="overflow:hidden"]>div:first-child') + '{display:none!important}'
    + sel('.rx-drugs-root [style*="padding:8px 10px"][style*="align-items:start"]') + '{padding:5px 10px!important}'
    + sel('.rx-drugs-root [style*="flex-direction:column;gap:6px"]') + '{flex-direction:row!important;gap:4px!important}'
    + sel('.drc-tools') + '{flex-wrap:nowrap!important;align-items:center!important;gap:8px!important}'
    + sel('.drc-tools>select') + '{width:auto!important;flex:0 0 auto}'
    + sel('.drc-tools>*') + '{align-self:center!important}'
    + sel('.drc-tools .bmh-rx-extras') + '{flex-wrap:nowrap!important}'
    + sel('.drc-fu') + '{display:flex!important;align-items:center;gap:10px;flex-wrap:wrap}'
    + sel('.drc-fu>div') + '{margin:0!important}'
    + sel('.drc-fu>div:last-child') + '{flex:1 1 300px;max-width:520px}'
    + '#obg-rx .drc-two{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:start;margin-bottom:10px}'
    + '#obg-rx .drc-two>.plan-panel{margin:0!important}'
    + '@media(max-width:900px){#obg-rx .drc-two{grid-template-columns:1fr}}';
  function build() {
    if (!document.getElementById('drc-css')) { var s = document.createElement('style'); s.id = 'drc-css'; s.textContent = CSS; document.head.appendChild(s); }
    TABS.forEach(function (t) {
      var tab = document.getElementById(t); if (!tab) return;
      var ex = tab.querySelector('.bmh-rx-extras'); if (ex && ex.parentNode && ex.parentNode !== tab) ex.parentNode.classList.add('drc-tools');
      var d = tab.querySelector('input[type=date][id="rx-fu-date"]') || tab.querySelector('input[type=date]');
      if (d) {
        var box = d.parentNode; while (box && box.parentNode !== tab) box = box.parentNode;
        if (box && /Next Appointment/i.test(box.textContent)) box.classList.add('drc-fu');
      }
    });
    var pr = document.getElementById('obg-rx-procedures'), ins = document.getElementById('obg-rx-instructions');
    if (pr && ins && pr.parentNode === ins.parentNode && !pr.parentNode.classList.contains('drc-two')) {
      var w = document.createElement('div'); w.className = 'drc-two';
      pr.parentNode.insertBefore(w, pr); w.appendChild(ins); w.appendChild(pr);
    }
  }
  var n = 0; function tick() { try { build(); } catch (e) {} if (++n < 20) setTimeout(tick, 1500); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick); else tick();
})();
