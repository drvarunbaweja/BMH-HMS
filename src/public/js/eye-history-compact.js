/* BMH — Eye → History tab on one screen, positives coloured.
 * Only re-arranges the existing fields (same ids, same values, same saving / printing / audits):
 *  - complaint lines (complaint · number · duration · eye) on the left, past ocular history OD / OS, eye affected and
 *    spectacles on the right; ocular medications on one line;
 *  - personal / systemic history in two columns (condition · Yes/No · duration · treatment);
 *  - drug allergy, family history and other notes side by side.
 * "+" on the heading: No. (add a number), Duration (add a unit), Row (show / add another complaint line).
 * Colours: complaint entered, a "Yes" condition, a past eye surgery, ocular medicines, family history → orange;
 * a drug allergy → red.  Extra numbers / units are saved at settings/eyeCcOptions.
 * Off switch (this browser): localStorage.setItem('bmh_eye_hx_compact_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_eye_hx_compact_off') === '1') return; } catch (e) {}
  var PATH = 'settings/eyeCcOptions', LS = 'bmh_eye_cc_opts_v1';
  var extra = { nums: [], units: [] };
  try { var c = JSON.parse(localStorage.getItem(LS) || 'null'); if (c) extra = { nums: c.nums || [], units: c.units || [] }; } catch (e) {}
  var ORANGE = 'background:#fff4e5;border-color:#f0a24a;', RED = 'background:#fdecea;border-color:#e57373;color:#b71c1c;';
  function $(id) { return document.getElementById(id); }
  function lab(t, color) { var d = document.createElement('div'); d.style.cssText = 'font-size:9px;font-weight:800;text-transform:uppercase;margin:0 0 3px;color:' + (color || 'var(--g1)'); d.textContent = t; return d; }
  function cell(children, css) { var d = document.createElement('div'); if (css) d.style.cssText = css; children.forEach(function (c) { if (c) d.appendChild(c); }); return d; }
  function mark(el, on, red) {
    if (!el) return;
    var want = on ? (red ? 'red' : 'orange') : '';
    if (el.dataset.hxMark === want) return;
    el.dataset.hxMark = want;
    el.style.background = on ? (red ? '#fdecea' : '#fff4e5') : '';
    el.style.borderColor = on ? (red ? '#e57373' : '#f0a24a') : '';
    el.style.color = on && red ? '#b71c1c' : '';
    el.style.fontWeight = on ? '700' : '';
  }
  function addOpt(cls, value) {
    document.querySelectorAll('#pg-ophtho #cc-rows .' + cls).forEach(function (s) {
      if (Array.prototype.some.call(s.options, function (o) { return o.value === value || o.textContent === value; })) return;
      var o = document.createElement('option'); o.value = value; o.textContent = value; s.appendChild(o);
    });
  }
  function applyExtra() { extra.nums.forEach(function (v) { addOpt('cc-dur-num', v); }); extra.units.forEach(function (v) { addOpt('cc-dur-unit', v); }); }
  function saveOpts() {
    try { localStorage.setItem(LS, JSON.stringify(extra)); } catch (e) {}
    try { if (window.FBDB) window.FBDB.ref(PATH).set({ nums: extra.nums, units: extra.units, updatedAt: new Date().toISOString() }).catch(function () {}); } catch (e) {}
  }
  // complaint lines always side by side (the existing code resets a line's inline display when it shows / hides it)
  (function () {
    var st = document.createElement('style'); st.id = 'hxc-style';
    st.textContent = '#pg-ophtho #cc-rows .cc-row{display:grid;grid-template-columns:1fr 150px 100px;gap:5px;align-items:center}'
      + '@media (max-width:768px){#pg-ophtho #hxc-wrap,#pg-ophtho #hxc-phx,#pg-ophtho #hxc-row3{grid-template-columns:1fr!important}}';
    (document.head || document.documentElement).appendChild(st);
  })();
  function build() {
    var hx = $('oe-hx'), cc = $('cc-rows'); if (!hx || !cc || $('hxc-wrap')) return !!$('hxc-wrap');
    var head = cc.previousElementSibling; if (!head) return false;
    // heading "+" buttons
    var pb = 'background:var(--blue);color:#fff;border:none;border-radius:50%;width:17px;height:17px;font-size:12px;line-height:17px;padding:0;cursor:pointer;font-weight:900';
    head.style.display = 'flex'; head.style.justifyContent = 'space-between'; head.style.alignItems = 'center';
    var tools = document.createElement('span'); tools.style.cssText = 'display:flex;gap:5px;align-items:center;font-size:9px;color:var(--g1);text-transform:none;letter-spacing:0';
    tools.innerHTML = 'No. <button type="button" id="hxc-addnum" title="Add a number" style="' + pb + '">+</button> Duration <button type="button" id="hxc-addunit" title="Add a duration" style="' + pb + '">+</button> Row <button type="button" id="hxc-addrow" title="Add a complaint line" style="' + pb + '">+</button>';
    head.appendChild(tools);
    // fields to move
    var ids = ['cc-eye-primary', 'poh-od-type', 'poh-od-text', 'poh-os-type', 'poh-os-text', 'hx-spectacles', 'hx-last-spec', 'hx-ocular-meds'];
    var el = {}; ids.forEach(function (i) { el[i] = $(i); });
    if (ids.some(function (i) { return !el[i]; })) return false;
    var oldFg = el['cc-eye-primary'].closest('.fg');
    // top block: complaints | ocular history
    var wrap = document.createElement('div'); wrap.id = 'hxc-wrap'; wrap.style.cssText = 'display:grid;grid-template-columns:1.25fr 1fr;gap:12px;align-items:start;margin-bottom:6px';
    cc.parentNode.insertBefore(wrap, cc);
    wrap.appendChild(cc); cc.style.marginBottom = '0'; cc.style.gap = '5px';
    ['poh-od-text', 'poh-os-text'].forEach(function (i) { var t = el[i]; t.rows = 1; t.style.minHeight = '32px'; t.style.height = '32px'; t.style.resize = 'vertical'; t.style.marginTop = '3px'; t.placeholder = 'Details, date, surgeon…'; });
    el['poh-od-type'].style.marginBottom = '0'; el['poh-os-type'].style.marginBottom = '0';
    var right = cell([
      cell([lab('Past ocular — OD', 'var(--blue)'), el['poh-od-type'], el['poh-od-text']]),
      cell([lab('Past ocular — OS', '#1a7a4a'), el['poh-os-type'], el['poh-os-text']]),
      cell([lab('Eye affected (primary)'), el['cc-eye-primary']]),
      cell([lab('Spectacles · last change'), cell([el['hx-spectacles'], el['hx-last-spec']], 'display:grid;grid-template-columns:1fr 78px;gap:4px')])
    ], 'display:grid;grid-template-columns:1fr 1fr;gap:6px 8px');
    wrap.appendChild(right);
    el['hx-last-spec'].placeholder = 'e.g. 2 yrs';
    var meds = cell([el['hx-ocular-meds']], 'margin-bottom:4px'); el['hx-ocular-meds'].placeholder = 'Ocular medications — current eye drops / medications';
    wrap.parentNode.insertBefore(meds, wrap.nextSibling);
    if (oldFg) oldFg.style.display = 'none';
    // personal history table → two columns
    var tbl = $('phx-allergy') && $('phx-allergy').closest('table');
    if (tbl) {
      var grid = document.createElement('div'); grid.id = 'hxc-phx'; grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;margin-bottom:6px';
      Array.prototype.forEach.call(tbl.querySelectorAll('tbody tr'), function (tr) {
        var tds = tr.querySelectorAll('td'); if (tds.length < 4) return;
        var sel = tds[1].querySelector('select'), dur = tds[2].querySelector('input'), rx = tds[3].querySelector('input'); if (!sel) return;
        var row = document.createElement('div'); row.className = 'hxc-phx-row';
        row.style.cssText = 'display:grid;grid-template-columns:128px 72px 1fr 1fr;gap:4px;align-items:center;padding:2px 5px;border-radius:7px;border:1px solid transparent';
        var nm = document.createElement('b'); nm.style.cssText = 'font-size:11px'; nm.textContent = tds[0].textContent.trim();
        sel.style.minWidth = '0'; sel.style.fontSize = '12px';
        if (dur) dur.placeholder = 'Duration'; if (rx) rx.placeholder = 'Treatment';
        [nm, sel, dur, rx].forEach(function (x) { if (x) row.appendChild(x); });
        grid.appendChild(row);
      });
      var tblWrap = tbl.parentNode; tblWrap.parentNode.insertBefore(grid, tblWrap); tblWrap.style.display = 'none';
      var ph = tblWrap.previousElementSibling && tblWrap.previousElementSibling.previousElementSibling;
      if (ph && /Personal History/i.test(ph.textContent)) { ph.style.margin = '8px 0 5px'; }
    }
    // drug allergy · family history · other notes side by side
    var da = $('drug-allergy'), das = $('drug-allergy-spec'), fam = $('hx-family'), oth = $('hx-other-systemic');
    if (da && fam && oth) {
      var fg2 = da.closest('.fg');
      [fam, oth].forEach(function (t) { t.rows = 1; t.style.minHeight = '34px'; t.style.height = '34px'; t.style.resize = 'vertical'; });
      if (das) { das.style.marginTop = '3px'; }
      var row3 = cell([
        cell([lab('Drug allergy / ADR'), da, das]),
        cell([lab('Family history'), fam]),
        cell([lab('Other systemic / notes'), oth])
      ], 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px');
      row3.id = 'hxc-row3';
      fg2.parentNode.insertBefore(row3, fg2); fg2.style.display = 'none';
    }
    // "+" actions
    $('hxc-addrow').onclick = function () {
      var rows = cc.querySelectorAll('.cc-row'), hidden = Array.prototype.filter.call(rows, function (r) { return r.style.display === 'none'; })[0];
      if (hidden) { hidden.style.display = ''; var i = hidden.querySelector('.cc-inp'); if (i) i.focus(); return; }
      var src = rows[rows.length - 1], copy = src.cloneNode(true);
      copy.querySelectorAll('input,select').forEach(function (x) { if (x.tagName === 'SELECT') x.selectedIndex = 0; else x.value = ''; x.removeAttribute('id'); });
      copy.querySelectorAll('.cc-drop').forEach(function (d) { d.innerHTML = ''; d.style.display = 'none'; });
      var ph2 = copy.querySelector('.cc-inp'); if (ph2) ph2.placeholder = 'Chief complaint ' + (rows.length + 1) + ' (optional)';
      cc.appendChild(copy); if (ph2) ph2.focus();
    };
    $('hxc-addnum').onclick = function () { var v = String(window.prompt('Add a number for the complaint duration (e.g. 8, 12, 45):', '') || '').trim(); if (!v) return; if (extra.nums.indexOf(v) < 0) { extra.nums.push(v); saveOpts(); } applyExtra(); };
    $('hxc-addunit').onclick = function () { var v = String(window.prompt('Add a duration (e.g. hours, since birth):', '') || '').trim().toLowerCase(); if (!v) return; if (extra.units.indexOf(v) < 0) { extra.units.push(v); saveOpts(); } applyExtra(); };
    applyExtra();
    hx.addEventListener('input', paint, true); hx.addEventListener('change', paint, true);
    paint();
    return true;
  }
  function paint() {
    var hx = $('oe-hx'); if (!hx || !$('hxc-wrap')) return;
    hx.querySelectorAll('#cc-rows .cc-inp').forEach(function (i) { mark(i, !!String(i.value || '').trim()); });
    ['poh-od-type', 'poh-os-type'].forEach(function (i) { var s = $(i); mark(s, s && s.value && !/^no previous/i.test(s.value)); });
    mark($('hx-ocular-meds'), !!String(($('hx-ocular-meds') || {}).value || '').trim());
    mark($('hx-family'), !!String(($('hx-family') || {}).value || '').trim());
    var da = $('drug-allergy'); mark(da, da && da.value && !/^no known/i.test(da.value), true);
    mark($('drug-allergy-spec'), !!String(($('drug-allergy-spec') || {}).value || '').trim(), true);
    hx.querySelectorAll('.hxc-phx-row').forEach(function (r) {
      var s = r.querySelector('select'), on = s && s.value === 'Y', want = on ? '1' : '';
      if (r.dataset.pos === want) return; r.dataset.pos = want;
      r.style.background = on ? '#fff4e5' : ''; r.style.borderColor = on ? '#f0a24a' : 'transparent';
      var b = r.querySelector('b'); if (b) b.style.color = on ? '#a04a00' : '';
    });
  }
  window.bmhEyeHxPaint = paint;
  function boot() { build(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  // values are filled in by code when a patient opens → keep colours right, and rebuild if the tab was re-rendered
  setInterval(function () { try { if (!$('hxc-wrap')) build(); paint(); } catch (e) {} }, 1000);
  var t = 0, iv = setInterval(function () {
    if (window.FBDB || ++t > 30) {
      clearInterval(iv);
      try { if (window.FBDB) window.FBDB.ref(PATH).once('value').then(function (s) { var v = s.val(); if (v) { extra = { nums: v.nums || [], units: v.units || [] }; try { localStorage.setItem(LS, JSON.stringify(extra)); } catch (e) {} applyExtra(); } }).catch(function () {}); } catch (e) {}
    }
  }, 2000);
})();
