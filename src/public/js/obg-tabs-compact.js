/* BMH — OBG tabs made shorter (layout only).
 *   Assessment: fields in four columns instead of two (chief complaint takes two; notes boxes stay full width).
 *   Obstetric history: Conception, Labour details and Post natal fields in two columns (each select beside its description).
 * Nothing is renamed or removed: every field keeps its id and handlers, so saving, past visits and prints are unchanged.
 * Off switch (this browser): localStorage.setItem('bmh_obg_tabs_compact_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_obg_tabs_compact_off') === '1') return; } catch (e) {}
  var CSS = ''
    + '#obg-basic .fg{grid-template-columns:repeat(4,minmax(0,1fr))!important;column-gap:10px}'
    + '#obg-basic .fg>.form-group:has(textarea){grid-column:1 / -1}'
    + '#obg-basic .fg>.form-group:has(#obg-cc-rows){grid-column:span 2;grid-row:span 2}'
    + '#obg-basic .fg:has(#obg-cc-rows){grid-auto-flow:row dense;align-items:start}'
    + '#obg-basic .fg>:not(.form-group){grid-column:1 / -1}'
    + '#obg-delivery .otc-2{display:grid!important;grid-template-columns:1fr 1fr;column-gap:10px;align-content:start}'
    + '#obg-delivery .otc-2>:not(.form-group),#obg-delivery .otc-2>.form-group:has(textarea){grid-column:1 / -1}'
    + '@media(max-width:900px){#obg-basic .fg{grid-template-columns:1fr 1fr!important}#obg-delivery .otc-2{grid-template-columns:1fr}}';
  function build() {
    if (!document.getElementById('otc-css')) { var s = document.createElement('style'); s.id = 'otc-css'; s.textContent = CSS; document.head.appendChild(s); }
    var del = document.getElementById('obg-delivery'); if (!del) return;
    Array.prototype.forEach.call(del.querySelectorAll('div'), function (d) {
      if (d.classList.contains('otc-2')) return;
      var h = d.firstElementChild; if (!h || h.children.length) return;
      if (/^(Conception & complications|Labour details|Post natal period)$/i.test(h.textContent.trim()) && d.querySelectorAll(':scope>.form-group').length >= 3) d.classList.add('otc-2');
    });
  }
  var n = 0; function tick() { try { build(); } catch (e) {} if (++n < 20) setTimeout(tick, 1500); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick); else tick();
})();
