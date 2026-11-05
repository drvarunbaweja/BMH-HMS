/* BMH — "Brochure" and "Instructions" drop-downs beside "Save as Template" in every department's prescription.
 * If a brochure and/or instruction sheet is chosen, it is printed after the prescription for the same patient
 * (same print preview). If nothing is chosen, nothing extra is printed. Lists are specific to each department.
 * Nothing is saved; only the printout changes.
 */
(function () {
  'use strict';
  var PAGES = { 'pg-ophtho': 'ophtho', 'pg-obg': 'obg', 'pg-psych': 'psych', 'pg-skin': 'skin' };
  var PRINT_DEPT = { oe: 'ophtho', ophtho: 'ophtho', obg: 'obg', psych: 'psych', skin: 'skin' };

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function PE() { return window.bmhPatientEducation || null; }
  function plain(s) { return String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
  function currentPatientId() { try { return String((window.CURRENT_PATIENT && window.CURRENT_PATIENT.bmhId) || '').trim(); } catch (e) { return ''; } }

  function brochureOptions(dept) {
    var pe = PE(); if (!pe) return [];
    var out = pe.allBrochures().filter(function (b) { return b.dept === dept; }).map(function (b) { return { v: 'b:' + b.id, t: plain(b.en && b.en.title) || b.id }; });
    try { pe.uploadList('brochure', dept).forEach(function (u) { out.push({ v: 'u:' + u.id, t: '📎 ' + u.title }); }); } catch (e) {}
    return out;
  }
  function sheetOptions(dept) {
    var pe = PE(); if (!pe) return [];
    var out = pe.allSheets().filter(function (s) { return s.dept === dept; }).map(function (s) { return { v: 's:' + s.id, t: plain(s.title && s.title[0]).replace(/\s*—\s*(Patient |Aftercare )?Instructions.*$/i, '').replace(/\s*—\s*Instructions.*$/i, '') || s.id }; });
    try { pe.uploadList('instruction', dept).forEach(function (u) { out.push({ v: 'u:' + u.id, t: '📎 ' + u.title }); }); } catch (e) {}
    return out;
  }
  function fill(sel, opts, label) {
    var cur = sel.value;
    sel.innerHTML = '<option value="">' + label + ' — none</option>' + opts.map(function (o) { return '<option value="' + esc(o.v) + '">' + esc(o.t) + '</option>'; }).join('');
    if (cur && opts.some(function (o) { return o.v === cur; })) sel.value = cur;
  }
  function refresh(wrap) {
    var dept = wrap.getAttribute('data-dept');
    var b = wrap.querySelector('.bmh-rx-bro'), s = wrap.querySelector('.bmh-rx-ins');
    if (b) fill(b, brochureOptions(dept), '📰 Brochure');
    if (s) fill(s, sheetOptions(dept), '📋 Instructions');
  }
  function onPick(sel) {
    sel.setAttribute('data-pt', sel.value ? currentPatientId() : '');
    sel.style.borderColor = sel.value ? '#D4A017' : '';
    sel.style.fontWeight = sel.value ? '800' : '';
    var v = sel.value || '';
    if (v.indexOf('u:') === 0 && PE()) { try { PE().getUploadPages(v.slice(2)); } catch (e) {} }
  }
  window.bmhRxExtraPick = onPick;
  window.bmhRxExtraRefresh = function (el) { var w = el && el.closest('.bmh-rx-extras'); if (w) refresh(w); };

  function inject() {
    Object.keys(PAGES).forEach(function (pageId) {
      var page = document.getElementById(pageId);
      if (!page || page.querySelector('.bmh-rx-extras')) return;
      var btn = [].find.call(page.querySelectorAll('button.btn-sm'), function (b) { return /openSaveRxTemplate\(\)/.test(b.getAttribute('onclick') || ''); });
      if (!btn) return;
      var wrap = document.createElement('span');
      wrap.className = 'bmh-rx-extras';
      wrap.setAttribute('data-dept', PAGES[pageId]);
      wrap.style.cssText = 'display:inline-flex;gap:6px;align-items:center;flex-wrap:wrap';
      var st = 'font-size:11.5px;padding:4px 6px;border:1.5px solid var(--g4,#cfd5de);border-radius:7px;max-width:180px;background:#fff';
      wrap.innerHTML = '<select class="bmh-rx-bro" title="Print a brochure with this prescription" style="' + st + '" onfocus="bmhRxExtraRefresh(this)" onmousedown="bmhRxExtraRefresh(this)" onchange="bmhRxExtraPick(this)"></select>'
        + '<select class="bmh-rx-ins" title="Print instructions with this prescription" style="' + st + '" onfocus="bmhRxExtraRefresh(this)" onmousedown="bmhRxExtraRefresh(this)" onchange="bmhRxExtraPick(this)"></select>';
      btn.parentNode.insertBefore(wrap, btn);
      refresh(wrap);
    });
  }

  // ── build the extra pages ──
  function patientStrip(deptKey) {
    var p = window.CURRENT_PATIENT || {};
    var doc = '';
    try { doc = (typeof CURRENT_USER !== 'undefined' && CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) {}
    var date = '';
    try { date = typeof formatDateIN === 'function' ? formatDateIN(new Date()) : new Date().toLocaleDateString('en-IN'); } catch (e) {}
    var id = p.bmhId || '';
    try { if (typeof formatBmhIdForDisplay === 'function') id = formatBmhIdForDisplay(id); } catch (e) {}
    return { name: p.name || '', ageSex: [p.age ? p.age + 'Y' : '', p.sex || ''].filter(Boolean).join(' / '), id: id, mob: p.mob || p.phone || '', date: date, doctor: doc };
  }
  function pickedFor(deptKey) {
    var wrap = document.querySelector('.bmh-rx-extras[data-dept="' + deptKey + '"]');
    if (!wrap) return [];
    var pid = currentPatientId();
    var out = [];
    ['.bmh-rx-bro', '.bmh-rx-ins'].forEach(function (cls) {
      var sel = wrap.querySelector(cls);
      if (!sel || !sel.value) return;
      var forPt = sel.getAttribute('data-pt') || '';
      if (forPt && pid && forPt !== pid) { sel.value = ''; onPick(sel); return; } // chosen for an earlier patient
      out.push({ kind: cls === '.bmh-rx-bro' ? 'brochure' : 'sheet', v: sel.value });
    });
    return out;
  }
  function piecesHtml(deptKey, picks) {
    var pe = PE(); if (!pe || !picks.length) return '';
    var lang = 'en';
    try { lang = (typeof rxLang !== 'undefined' && rxLang === 'pa') ? 'pa' : 'en'; } catch (e) {}
    var pt = patientStrip(deptKey);
    var parts = [];
    picks.forEach(function (pk) {
      var id = pk.v.slice(2), type = pk.v.slice(0, 2);
      try {
        if (type === 'b:') {
          var b = pe.allBrochures().find(function (x) { return x.id === id; });
          if (b) parts.push(pe.brochureHtml(b, lang));
        } else if (type === 's:') {
          var s = pe.allSheets().find(function (x) { return x.id === id; });
          if (s) parts.push(pe.sheetHtml(s, pt));
        } else if (type === 'u:') {
          var meta = pe.store && pe.store.uploads && pe.store.uploads[id];
          var pages = pe.store && pe.store.pages && pe.store.pages[id];
          if (meta && pages && pages.length) pages.forEach(function (src) { parts.push(pe.framedPageHtml(Object.assign({ id: id }, meta), src, pt)); });
          else if (typeof showToast === 'function') showToast('The uploaded file is still loading — print again in a moment', 'w');
        }
      } catch (e) { console.warn('[rx-extras]', e); }
    });
    if (!parts.length) return '';
    var pp = pe.printParts();
    return pp.fonts
      + '<style>@page bmhxp{size:A4 portrait;margin:0}.bmh-xp{page:bmhxp;break-before:page;page-break-before:always;width:210mm;margin:0;padding:0;filter:none!important;background:#fff}'
      + '.bmh-xp .pe-add,.bmh-xp .pe-addrow{display:none!important}.bmh-xp *{-webkit-print-color-adjust:exact;print-color-adjust:exact}' + pp.css + '</style>'
      + parts.map(function (h) { return '<div class="bmh-xp">' + h + '</div>'; }).join('')
      ;
  }

  // Line the extra A4 pages up with the paper edge (cancel the prescription page's body padding).
  function alignExtraPages() {
    try {
      var ifr = document.querySelector('#bmh-print-preview iframe');
      var doc = ifr && (ifr.contentDocument || (ifr.contentWindow && ifr.contentWindow.document));
      if (!doc || !doc.body) return;
      doc.querySelectorAll('.bmh-xp').forEach(function (x) {
        x.style.marginLeft = '0px';
        var left = x.getBoundingClientRect().left + (doc.defaultView.pageXOffset || 0);
        if (left) x.style.marginLeft = (-left) + 'px';
      });
    } catch (e) {}
  }

  // ── hook printing ──
  var origRx = window.printUnifiedRx;
  if (typeof origRx === 'function') {
    window.printUnifiedRx = function (deptId) {
      var deptKey = PRINT_DEPT[deptId] || '';
      window.__bmhRxExtraDept = deptKey;
      try { return origRx.apply(this, arguments); } finally { window.__bmhRxExtraDept = ''; }
    };
  }
  var origSafe = window.safePrint;
  if (typeof origSafe === 'function') {
    window.safePrint = function (html) {
      var deptKey = window.__bmhRxExtraDept;
      if (deptKey && typeof html === 'string') {
        try {
          var extra = piecesHtml(deptKey, pickedFor(deptKey));
          if (extra) {
            var i = html.lastIndexOf('</body>');
            html = i >= 0 ? html.slice(0, i) + extra + html.slice(i) : html + extra;
          }
        } catch (e) { console.warn('[rx-extras] print', e); }
      }
      var r = origSafe.apply(this, [html].concat([].slice.call(arguments, 1)));
      if (deptKey) [50, 400, 1200].forEach(function (ms) { setTimeout(alignExtraPages, ms); });
      return r;
    };
  }

  function start() {
    inject();
    var pe = PE();
    if (pe && pe.loadStore) pe.loadStore().then(function () { document.querySelectorAll('.bmh-rx-extras').forEach(refresh); }).catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  setTimeout(inject, 3000);
})();
