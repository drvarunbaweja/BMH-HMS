/* BMH — OBG → Assessment: "Chief Complaint" lines (complaint · number · duration) instead of one Primary Complaint box.
 * Each line: complaint (type or pick from the saved list) | number (1–7, 10, 14 …) | duration (hours, days, weeks …).
 * "+" on the heading: No. (add a number), Duration (add a unit), Row (add a complaint line). Filled lines turn orange.
 * The lines are written into the existing (now hidden) #obg-main-complaint box as
 *   "Clots In Menses - 3 months; Pain Abdomen - 10 days"
 * so saving, past visits, presumptive diagnosis and the prescription print (all complaints) work exactly as before.
 * An older visit's single complaint is shown as the first line.
 * Extra numbers / units are saved at settings/obgCcOptions (the same on every computer).
 * Off switch (this browser): localStorage.setItem('bmh_obg_cc_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_obg_cc_off') === '1') return; } catch (e) {}
  var NUMS = ['1', '2', '3', '4', '5', '6', '7', '10', '14', '15', '20', '30'];
  var UNITS = ['hours', 'days', 'weeks', 'months', 'years'];
  var LS = 'bmh_obg_cc_opts_v1', PATH = 'settings/obgCcOptions';
  var extra = { nums: [], units: [] };
  try { var c = JSON.parse(localStorage.getItem(LS) || 'null'); if (c) extra = { nums: c.nums || [], units: c.units || [] }; } catch (e) {}
  var lastComposed = null;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function title(s) { try { return toDisplayTitleCase(s); } catch (e) { return String(s || '').trim(); } }
  function hidden() { return document.getElementById('obg-main-complaint'); }
  function nums() { return NUMS.concat(extra.nums.filter(function (x) { return NUMS.indexOf(x) < 0; })); }
  function units() { return UNITS.concat(extra.units.filter(function (x) { return UNITS.indexOf(x) < 0; })); }
  function saveOpts() {
    try { localStorage.setItem(LS, JSON.stringify(extra)); } catch (e) {}
    try { if (window.FBDB) window.FBDB.ref(PATH).set({ nums: extra.nums, units: extra.units, updatedAt: new Date().toISOString() }).catch(function () {}); } catch (e) {}
  }
  function loadOpts() {
    try { if (window.FBDB) window.FBDB.ref(PATH).once('value').then(function (s) { var v = s.val(); if (v) { extra = { nums: v.nums || [], units: v.units || [] }; try { localStorage.setItem(LS, JSON.stringify(extra)); } catch (e) {} refreshSelects(); } }).catch(function () {}); } catch (e) {}
  }

  // "Clots In Menses - 3 months; Pain Abdomen" ⇄ [{text, num, unit}]
  function parse(str) {
    return String(str || '').split(/\s*;\s*/).map(function (part) {
      part = part.trim(); if (!part) return null;
      var m = part.match(/^(.*?)\s+[-–]\s+(\d+(?:\.\d+)?)\s+([a-z ]+)$/i);
      return m ? { text: m[1].trim(), num: m[2], unit: m[3].trim().toLowerCase() } : { text: part, num: '', unit: '' };
    }).filter(Boolean);
  }
  function compose(rows) {
    return rows.filter(function (r) { return r.text; }).map(function (r) { return r.text + (r.num && r.unit ? ' - ' + r.num + ' ' + r.unit : (r.num ? ' - ' + r.num : (r.unit ? ' - ' + r.unit : ''))); }).join('; ');
  }
  function host() { return document.getElementById('obg-cc-rows'); }
  function readRows() {
    var h = host(); if (!h) return [];
    return Array.prototype.map.call(h.querySelectorAll('.obg-cc-row'), function (row) {
      return { text: title(row.querySelector('.obg-cc-text').value || ''), num: row.querySelector('.obg-cc-num').value || '', unit: row.querySelector('.obg-cc-unit').value || '' };
    });
  }
  function selHtml(cls, opts, v) {
    var list = opts.slice(); if (v && list.indexOf(v) < 0) list.push(v);
    return '<select class="' + cls + '" style="font-size:12px">' + ['<option value="">—</option>'].concat(list.map(function (o) { return '<option value="' + esc(o) + '"' + (o === v ? ' selected' : '') + '>' + esc(o) + '</option>'; })).join('') + '</select>';
  }
  function rowHtml(r) {
    r = r || { text: '', num: '', unit: '' };
    return '<div class="obg-cc-row" style="display:grid;grid-template-columns:1fr 64px 92px;gap:5px;align-items:center">'
      + '<input type="text" class="obg-cc-text" list="obg-main-complaint-list" placeholder="Chief complaint" value="' + esc(r.text) + '" style="font-size:12px">'
      + selHtml('obg-cc-num', nums(), r.num) + selHtml('obg-cc-unit', units(), r.unit) + '</div>';
  }
  function paint() {
    var h = host(); if (!h) return;
    Array.prototype.forEach.call(h.querySelectorAll('.obg-cc-text'), function (el) {
      var on = !!String(el.value || '').trim();
      el.style.background = on ? '#fff4e5' : ''; el.style.borderColor = on ? '#f0a24a' : ''; el.style.fontWeight = on ? '700' : '';
    });
  }
  function render(rows) {
    var h = host(); if (!h) return;
    rows = (rows || []).slice(); while (rows.length < 2) rows.push({ text: '', num: '', unit: '' });
    h.innerHTML = rows.map(rowHtml).join('');
    paint();
  }
  function refreshSelects() { if (host()) render(readRows()); }
  function sync(fromBlur) {
    var inp = hidden(); if (!inp) return;
    var rows = readRows();
    var v = compose(rows);
    lastComposed = v;
    if (inp.value !== v) { inp.value = v; try { updateObgComputedFields(); } catch (e) {} }
    if (fromBlur) {
      // remember new complaint names in the saved list (as the old box did)
      var list = window.OBG_PRIMARY_COMPLAINT_OPTIONS || (window.OBG_PRIMARY_COMPLAINT_OPTIONS = []); var added = false;
      rows.forEach(function (r) { if (r.text && list.indexOf(r.text) < 0) { list.push(r.text); added = true; } });
      if (added) { try { saveObgPrimaryComplaintOptions(); renderObgPrimaryComplaintOptions(); } catch (e) {} }
    }
    paint();
  }
  function build() {
    var inp = hidden(); if (!inp || document.getElementById('obg-cc-rows')) return !!inp;
    var fg = inp.closest('.form-group'); if (!fg) return false;
    var lab = fg.querySelector('label.fl');
    var pb = 'background:var(--blue);color:#fff;border:none;border-radius:50%;width:17px;height:17px;font-size:12px;line-height:17px;padding:0;cursor:pointer;font-weight:900';
    if (lab) lab.innerHTML = 'Chief Complaint <span style="display:flex;gap:5px;align-items:center;font-size:9px;color:var(--g1);font-weight:800">No. <button type="button" id="obg-cc-addnum" title="Add a number" style="' + pb + '">+</button> Duration <button type="button" id="obg-cc-addunit" title="Add a duration" style="' + pb + '">+</button> Row <button type="button" id="obg-cc-addrow" title="Add a complaint line" style="' + pb + '">+</button></span>';
    inp.style.display = 'none';
    var box = document.createElement('div'); box.id = 'obg-cc-rows'; box.style.cssText = 'display:flex;flex-direction:column;gap:5px';
    inp.parentNode.insertBefore(box, inp.nextSibling);
    render(parse(inp.value)); lastComposed = compose(readRows());
    box.addEventListener('input', function (e) { if (e.target.classList.contains('obg-cc-text')) paint(); });
    box.addEventListener('change', function () { sync(false); });
    box.addEventListener('focusout', function (e) { if (e.target.classList.contains('obg-cc-text')) sync(true); });
    document.getElementById('obg-cc-addrow').onclick = function () { var r = readRows(); r.push({ text: '', num: '', unit: '' }); render(r); var t = host().querySelectorAll('.obg-cc-text'); t[t.length - 1].focus(); };
    document.getElementById('obg-cc-addnum').onclick = function () { var v = String(window.prompt('Add a number for the complaint duration (e.g. 8, 12, 45):', '') || '').trim(); if (!v) return; if (nums().indexOf(v) < 0) { extra.nums.push(v); saveOpts(); } refreshSelects(); };
    document.getElementById('obg-cc-addunit').onclick = function () { var v = String(window.prompt('Add a duration (e.g. since birth, cycles):', '') || '').trim().toLowerCase(); if (!v) return; if (units().indexOf(v) < 0) { extra.units.push(v); saveOpts(); } refreshSelects(); };
    // the print "include" tick box label
    var inc = document.getElementById('obg-inc-complaint'); if (inc && inc.parentNode) Array.prototype.forEach.call(inc.parentNode.childNodes, function (n) { if (n.nodeType === 3 && /Primary com/i.test(n.textContent)) n.textContent = n.textContent.replace(/Primary complaint/i, 'Chief complaint'); });
    return true;
  }
  // a patient / visit opened (the old box was filled by the existing code) → show its complaints as lines
  function watch() {
    var inp = hidden(); if (!inp) return;
    if (!document.getElementById('obg-cc-rows')) build();
    if (inp.value !== lastComposed && document.activeElement && !host().contains(document.activeElement)) { render(parse(inp.value)); lastComposed = compose(readRows()); if (lastComposed !== inp.value) inp.value = lastComposed || inp.value; }
  }
  window.bmhObgCcParse = parse; window.bmhObgCcCompose = compose;
  function boot() { build(); setInterval(watch, 700); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  var t = 0, iv = setInterval(function () { if (window.FBDB || ++t > 30) { clearInterval(iv); loadOpts(); } }, 2000);
})();
