/* BMH — Eye: VA/IOP/Refraction, Slit lamp, Plan and Prescription tabs made shorter (layout only).
 * VA / IOP / Refraction:
 *   – the separate UCVA / BCVA boxes are hidden; the heading shows them read-only from the refraction table
 *     (UCVA = Refraction → UCVA Dist, BCVA = Subjective VA). PH stays as a small box in the heading.
 *     The hidden boxes are kept filled from the refraction table, so saving, past visits and prints read the same fields as before.
 *   – Keratometry, Colour vision and Pupil dilation sit in one row; IPD, Glasses, Near vision OD / OS in one row.
 * Slit lamp: light background like the other tabs, and a "+" under every heading to add a finding chip.
 *   Added findings are kept at settings/slitLampChips (the same on every computer) and show every time.
 * Plan: Instructions and Surgery / Procedure side by side under Diagnosis. Prescription: Next appointment on one line.
 * Nothing is renamed: every field keeps its id, label text and inline style, so save / restore / print are unchanged.
 * Off switch (this browser): localStorage.setItem('bmh_eye_tabs_compact_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_eye_tabs_compact_off') === '1') return; } catch (e) {}
  var SL_PATH = 'settings/slitLampChips', SL_LS = 'bmh_sl_chips_v1';
  var slExtra = {};
  try { slExtra = JSON.parse(localStorage.getItem(SL_LS) || '{}') || {}; } catch (e) { slExtra = {}; }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function key(label) { return String(label || '').trim().replace(/[.#$\/\[\]]/g, '_'); }

  var CSS = ''
    // VA heading strip
    + '#etc-va{display:flex;gap:8px;flex:1;justify-content:center;flex-wrap:wrap;text-transform:none;letter-spacing:0}'
    + '#etc-va .etc-eye{display:flex;align-items:center;gap:8px;border-radius:999px;padding:3px 6px 3px 12px;font-size:11px;font-weight:700}'
    + '#etc-va .etc-od{background:var(--blue-lt);color:var(--blue)} #etc-va .etc-os{background:var(--green-lt);color:#1a8c3c}'
    + '#etc-va b{font-size:13px;font-weight:900;color:inherit;min-width:28px;display:inline-block}'
    + '#etc-va .etc-lbl{font-size:9px;font-weight:800;color:var(--g1)}'
    + '#etc-va select{width:72px!important;padding:2px!important;font-size:12px!important;height:24px}'
    + '#oe-va-iop-ref .etc-row3{display:grid!important;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr) minmax(200px,.75fr)!important;gap:10px}'
    + '#oe-va-iop-ref .etc-row3>div{margin-bottom:0!important}'
    + '#oe-va-iop-ref .etc-row3 .etc-cv{padding:8px 10px!important}'
    + '#oe-va-iop-ref .etc-dil{flex-direction:column;align-items:stretch!important;justify-content:center;text-align:center}'
    + '#oe-va-iop-ref .etc-fg4{display:grid!important;grid-template-columns:90px 1.4fr 1fr 1fr;gap:10px}'
    + '#oe-va-iop-ref .etc-fg4 .form-group{margin-bottom:0}'
    + '#oe-va-iop-ref .etc-iop td,#oe-va-iop-ref .etc-iop th{padding-top:3px!important;padding-bottom:3px!important}'
    // Slit lamp: light theme (inline styles are left alone; the save code reads them)
    + '#oe-slitlamp>div:first-child{background:#fff!important;border:1px solid var(--g4,#dde2ea)}'
    + '#oe-slitlamp [style*="color:#fff"],#oe-slitlamp [style*="color:rgba(255,255,255"]{color:var(--bmh-blue,#1a3c6e)!important}'
    + '#oe-slitlamp [style*="9.5px"]{color:var(--bmh-blue,#1a3c6e)!important}'
    + '#oe-slitlamp [style*="rgba(255,255,255,.05)"]{background:#f6f8fb!important;border-color:var(--g4,#dde2ea)!important;color:#555!important}'
    + '#oe-slitlamp [style*="border-bottom:1px solid rgba(255,255,255"]{border-bottom-color:var(--g4,#dde2ea)!important}'
    + '#oe-slitlamp [style*="background:rgba(30,80,200"]{background:#eef4ff!important}'
    + '#oe-slitlamp [style*="background:rgba(30,160,80"]{background:#eefaf2!important}'
    + '#oe-slitlamp .sl-chip{background:#fff;color:#334;border:1px solid #d5dbe5}'
    + '#oe-slitlamp .sl-chip.sel{background:var(--blue);color:#fff;border-color:var(--blue)}'
    + '#oe-slitlamp input[type=text],#oe-slitlamp textarea{background:#fff!important;color:#222!important;border:1px solid var(--g4,#d5dbe5)!important}'
    + '#oe-slitlamp button[onclick^="addSlitLampRow"]{background:#f3f6fb!important;color:var(--bmh-blue,#1a3c6e)!important;border-color:#b9c4d6!important}'
    + '#oe-slitlamp .etc-sl-add{position:absolute;left:0;top:22px;background:var(--blue,#1d6fe0);color:#fff;border:none;border-radius:999px;font-size:10px;font-weight:800;padding:1px 8px;cursor:pointer;line-height:16px}'
    // Plan: Diagnosis on top, Instructions | Procedure side by side
    + '#oe-plan .oe-plan-grid{grid-template-columns:1fr!important}'
    + '#oe-plan .plan-stack{grid-template-columns:1fr 1fr}'
    + '#oe-plan #oe-plan-diagnosis{grid-column:1 / -1}'
    // Prescription: next appointment on one line
    + '#oe-rx .etc-fu{display:flex;align-items:center;gap:10px;flex-wrap:wrap}'
    + '#oe-rx .etc-fu>div{margin-bottom:0!important}'
    + '#oe-rx .etc-fu>div:last-child{flex:0 0 280px}'
    // Prescription medicines: one column heading for all, rows close together, Taper / ✕ side by side
    + '#oe-rx .rx-drugs-root{gap:0!important}'
    + '#oe-rx .rx-drugs-root>div[style*="overflow:hidden"]{border-radius:0!important;box-shadow:none!important}'
    + '#oe-rx .rx-drugs-root>div[style*="overflow:hidden"]:first-of-type{border-radius:10px 10px 0 0!important}'
    + '#oe-rx .rx-drugs-root>div[style*="overflow:hidden"]~div[style*="overflow:hidden"]>div:first-child{display:none!important}'
    + '#oe-rx .rx-drugs-root [style*="padding:8px 10px"][style*="align-items:start"]{padding:5px 10px!important}'
    + '#oe-rx .rx-drugs-root [style*="flex-direction:column;gap:6px"]{flex-direction:row!important;gap:4px!important}'
    + '@media(max-width:900px){#oe-va-iop-ref .etc-row3,#oe-va-iop-ref .etc-fg4,#oe-plan .plan-stack{grid-template-columns:1fr!important}}';

  function addCss() { if ($('etc-css')) return; var s = document.createElement('style'); s.id = 'etc-css'; s.textContent = CSS; document.head.appendChild(s); }

  // ── VA / IOP / Refraction ─────────────────────────────────────────────
  function setSelVal(sel, v) {
    if (!sel) return;
    v = String(v || '').trim();
    if (v && !Array.prototype.some.call(sel.options, function (o) { return o.value === v; })) { var o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o); }
    if (sel.value !== v) sel.value = v;
  }
  function buildVa() {
    var tab = $('oe-va-iop-ref'), uc = $('va-od-uc'); if (!tab || !uc || $('etc-va')) return;
    var boxes = uc.closest('.g2'); if (!boxes) return;
    var head = boxes.previousElementSibling; if (!head) return;
    var strip = document.createElement('div'); strip.id = 'etc-va';
    strip.innerHTML = ['od', 'os'].map(function (e) {
      return '<span class="etc-eye etc-' + e + '">' + e.toUpperCase() + ' <span class="etc-lbl">UCVA</span> <b id="etc-' + e + '-uc">—</b> <span class="etc-lbl">BCVA</span> <b id="etc-' + e + '-bc">—</b> <span class="etc-lbl">PH</span> <span id="etc-' + e + '-ph"></span></span>';
    }).join('');
    head.insertBefore(strip, head.lastElementChild);
    ['od', 'os'].forEach(function (e) { var ph = $('va-' + e + '-ph'); if (ph) $('etc-' + e + '-ph').appendChild(ph); });
    boxes.style.display = 'none';
    // keep the hidden UCVA / BCVA boxes filled when the refraction table is changed
    tab.addEventListener('change', function (ev) {
      var id = ev.target && ev.target.id || '', m;
      if ((m = id.match(/^ucva-(od|os)-dist$/))) setSelVal($('va-' + m[1] + '-uc'), ev.target.value);
      else if ((m = id.match(/^subj-(od|os)-va$/))) setSelVal($('va-' + m[1] + '-bc'), ev.target.value);
      paintVa();
    });
    // Keratometry · Colour vision · Dilation in one row
    var kgrid = $('kerat-od-k1') && $('kerat-od-k1').closest('[style*="grid-template-columns:minmax(0,2fr)"]');
    var cvHead = Array.prototype.find.call(tab.querySelectorAll('div'), function (d) { return /Colour Vision \(Ishihara\)/.test(d.textContent) && d.children.length === 0; });
    var cv = cvHead && cvHead.parentNode;
    if (kgrid && cv) {
      var dil = kgrid.children[1];
      kgrid.classList.add('etc-row3'); cv.classList.add('etc-cv');
      kgrid.insertBefore(cv, dil); if (dil) dil.classList.add('etc-dil');
    }
    var fg = $('ipd-val') && $('ipd-val').closest('.fg3'); if (fg) fg.classList.add('etc-fg4');
    var gat = tab.querySelector('table'); if (gat) gat.classList.add('etc-iop');
    paintVa();
  }
  function paintVa() {
    ['od', 'os'].forEach(function (e) {
      var u = $('etc-' + e + '-uc'), b = $('etc-' + e + '-bc'); if (!u) return;
      var uv = ($('ucva-' + e + '-dist') || {}).value || ($('va-' + e + '-uc') || {}).value || '';
      var bv = ($('subj-' + e + '-va') || {}).value || ($('va-' + e + '-bc') || {}).value || '';
      if (u.textContent !== (uv || '—')) u.textContent = uv || '—';
      if (b.textContent !== (bv || '—')) b.textContent = bv || '—';
    });
  }

  // ── Slit lamp: "+" under each heading, findings remembered ────────────
  function slRows() { return Array.prototype.filter.call(document.querySelectorAll('#oe-slitlamp .sl-sl-row'), function (r) { return r.querySelector('[style*="9.5px"]'); }); }
  function chipBox(col) { return col && col.querySelector('div[style*="flex-wrap"]'); }
  function addChipTo(col, eye, text) {
    var box = chipBox(col); if (!box) return;
    var has = Array.prototype.some.call(box.querySelectorAll('.sl-chip'), function (c) { return c.textContent.trim().toLowerCase() === text.toLowerCase(); });
    if (has) return;
    var c = document.createElement('span'); c.className = 'sl-chip'; c.dataset.saved = '1'; c.textContent = text;
    c.setAttribute('onclick', "toggleChipEye(this,'" + eye + "')");
    box.appendChild(c);
  }
  function applySl() {
    slRows().forEach(function (row) {
      var label = row.querySelector('[style*="9.5px"]').textContent.trim();
      var list = (slExtra[key(label)] || {}).items || [];
      var cols = row.querySelectorAll('[style*="background:rgba"]');
      list.forEach(function (t) { addChipTo(cols[0], 'od', t); addChipTo(cols[1], 'os', t); });
    });
  }
  function buildSl() {
    slRows().forEach(function (row) {
      if (row.querySelector('.etc-sl-add')) return;
      var label = row.querySelector('[style*="9.5px"]').textContent.trim();
      row.style.position = 'relative';
      var b = document.createElement('button'); b.type = 'button'; b.className = 'etc-sl-add'; b.textContent = '+ Add'; b.title = 'Add a finding to ' + label + ' (stays for next time)';
      b.onclick = function () {
        var v = String(window.prompt('Add a finding to "' + label + '" (it will stay for next time):', '') || '').trim();
        if (!v) return;
        try { v = toDisplayTitleCase(v); } catch (e) {}
        var k = key(label), cur = slExtra[k] || { label: label, items: [] };
        if (cur.items.map(function (x) { return x.toLowerCase(); }).indexOf(v.toLowerCase()) < 0) cur.items.push(v);
        slExtra[k] = cur; saveSl(); applySl();
      };
      row.appendChild(b);
    });
    applySl();
  }
  function saveSl() {
    try { localStorage.setItem(SL_LS, JSON.stringify(slExtra)); } catch (e) {}
    try { if (window.FBDB) window.FBDB.ref(SL_PATH).set(slExtra).catch(function () {}); } catch (e) {}
  }
  function loadSl() {
    try { if (window.FBDB) window.FBDB.ref(SL_PATH).once('value').then(function (s) { var v = s.val(); if (v && typeof v === 'object') { slExtra = v; try { localStorage.setItem(SL_LS, JSON.stringify(v)); } catch (e) {} applySl(); } }).catch(function () {}); } catch (e) {}
  }

  // ── Prescription: next appointment box ────────────────────────────────
  function buildRx() {
    var d = $('rx-fu-date'); if (!d) return;
    var box = d.closest('[style*="padding:8px"]'); if (box && !box.classList.contains('etc-fu')) box.classList.add('etc-fu');
  }

  function boot() { addCss(); buildVa(); buildSl(); buildRx(); setInterval(paintVa, 1000); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  var t = 0, iv = setInterval(function () { if (window.FBDB || ++t > 30) { clearInterval(iv); loadSl(); } }, 2000);
})();
