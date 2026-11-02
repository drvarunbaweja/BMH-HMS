// ═══════════════════════════════════════════════════════════════════════════
// BMH HMS — PATIENT EDUCATION: magazine brochures + print instructions
// • Surgery Brochures page: colourful one-page A4 brochures (English / ਪੰਜਾਬੀ),
//   editable text, replaceable photos, "+ New brochure", print.
// • Print Instructions (Print Templates page): black-and-white English + Punjabi
//   sheets with the patient's details from today's queue of a department,
//   editable, "+ New sheet", print.
// Edits are saved in Firebase under patientEducation/… only. Nothing else in the
// software is read-modified or written. Switch off on one computer:
//   localStorage.setItem('bmh_disable_patient_education','1')
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  if (window.__bmhPatientEducation) return;
  window.__bmhPatientEducation = true;
  try { if (localStorage.getItem('bmh_disable_patient_education') === '1') return; } catch (e) {}

  var C = window.BMH_PE_COMMON || { hosp: { en: 'Baweja Multispeciality Hospital', pa: 'ਬਵੇਜਾ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ' }, guide: { en: 'Patient guide', pa: 'ਮਰੀਜ਼ ਲਈ ਜਾਣਕਾਰੀ' }, centres: { en: 'Rupnagar & Chandigarh', pa: 'ਰੂਪਨਗਰ ਅਤੇ ਚੰਡੀਗੜ੍ਹ' }, phones: '+91-8146622802 · +91-6280048805' };
  var DEPTS = [['ophtho', 'Eye', 'ਅੱਖਾਂ ਦਾ ਵਿਭਾਗ', 'Eye Department'], ['obg', 'OBG', 'ਇਸਤਰੀ ਰੋਗ ਅਤੇ ਜਣੇਪਾ ਵਿਭਾਗ', 'Obstetrics & Gynaecology'], ['psych', 'Neuropsychiatry', 'ਮਾਨਸਿਕ ਅਤੇ ਨਸਾਂ ਦੇ ਰੋਗ ਵਿਭਾਗ', 'Neuropsychiatry'], ['skin', 'Skin & Cosmetology', 'ਚਮੜੀ ਰੋਗ ਵਿਭਾਗ', 'Skin & Cosmetology']];
  var THEMES = { teal: ['#1A3C6E', '#0B7B8C', '#E6F5F3', '#0B7B8C'], blue: ['#153A73', '#2E6FD8', '#E8F0FD', '#2E6FD8'], violet: ['#3B2A78', '#7B4FC9', '#F0EAFB', '#7B4FC9'], sky: ['#0E4C7A', '#1E9BD7', '#E5F5FD', '#1E9BD7'], indigo: ['#25306E', '#4E5BD0', '#ECEEFC', '#4E5BD0'], rose: ['#7A1F45', '#D64B7F', '#FDEBF2', '#D64B7F'], plum: ['#4A1D5E', '#A0458F', '#F7EAF5', '#A0458F'] };

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function deptName(k, lang) { var d = DEPTS.find(function (x) { return x[0] === k; }); return d ? (lang === 'pa' ? d[2] : d[3]) : ''; }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function userName() { try { return (window.CURRENT_USER && window.CURRENT_USER.name) || (typeof CURRENT_USER !== 'undefined' && CURRENT_USER && CURRENT_USER.name) || 'Staff'; } catch (e) { return 'Staff'; } }
  function normDept(v) { try { if (typeof normalizeDeptKeyForQueue === 'function') return normalizeDeptKeyForQueue(v || ''); } catch (e) {} var s = String(v || '').toLowerCase(); if (/oph|eye/.test(s)) return 'ophtho'; if (/obg|gyn|obst/.test(s)) return 'obg'; if (/psych|neuro/.test(s)) return 'psych'; if (/skin|derm|cosm/.test(s)) return 'skin'; return s; }
  function todayKey() { try { if (typeof localDateKey === 'function') return localDateKey(new Date()); } catch (e) {} var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function dayOf(v) { try { if (typeof localDateKey === 'function') return localDateKey(v); } catch (e) {} return String(v || '').slice(0, 10); }

  // ── Storage (Firebase patientEducation/*, cached in this browser) ─────────────
  var store = { brochures: {}, instructions: {}, loaded: false, loading: null };
  try { var cached = JSON.parse(localStorage.getItem('bmh_pe_cache') || 'null'); if (cached) { store.brochures = cached.brochures || {}; store.instructions = cached.instructions || {}; } } catch (e) {}
  function saveCache() { try { localStorage.setItem('bmh_pe_cache', JSON.stringify({ brochures: store.brochures, instructions: store.instructions })); } catch (e) { /* photos can be large; cache is optional */ } }
  function loadStore() {
    if (store.loading) return store.loading;
    if (!window.FBDB) { store.loaded = true; return Promise.resolve(); }
    store.loading = Promise.all([
      window.FBDB.ref('patientEducation/brochures').once('value').then(function (s) { store.brochures = s.val() || {}; }),
      window.FBDB.ref('patientEducation/instructions').once('value').then(function (s) { store.instructions = s.val() || {}; })
    ]).then(function () { store.loaded = true; saveCache(); }).catch(function (e) { console.warn('patient education load', e); store.loaded = true; });
    return store.loading;
  }
  function saveItem(kind, id, obj) {
    obj = Object.assign({}, obj, { updatedAt: new Date().toISOString(), updatedBy: userName() });
    store[kind][id] = obj; saveCache();
    if (!window.FBDB) return Promise.resolve();
    return window.FBDB.ref('patientEducation/' + kind + '/' + id).set(JSON.parse(JSON.stringify(obj)));
  }
  function removeItem(kind, id) {
    delete store[kind][id]; saveCache();
    if (!window.FBDB) return Promise.resolve();
    return window.FBDB.ref('patientEducation/' + kind + '/' + id).remove();
  }

  function allBrochures() {
    var list = (window.BMH_PE_BROCHURES || []).map(function (d) { var s = store.brochures[d.id]; return s && !s.deleted ? Object.assign(clone(d), s, { _edited: true }) : clone(d); });
    Object.keys(store.brochures).forEach(function (id) { var s = store.brochures[id]; if (s && s.custom && !s.deleted) list.push(clone(s)); });
    return list;
  }
  function allSheets() {
    var list = (window.BMH_PE_SHEETS || []).map(function (d) { var s = store.instructions[d.id]; return s && !s.deleted ? Object.assign(clone(d), s, { _edited: true }) : clone(d); });
    Object.keys(store.instructions).forEach(function (id) { var s = store.instructions[id]; if (s && s.custom && !s.deleted) list.push(clone(s)); });
    return list;
  }
  function defaultBrochure(id) { return (window.BMH_PE_BROCHURES || []).find(function (d) { return d.id === id; }); }
  function defaultSheet(id) { return (window.BMH_PE_SHEETS || []).find(function (d) { return d.id === id; }); }

  // ── Styles ───────────────────────────────────────────────────────────────────
  var FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Inter:wght@400;600;800&family=Noto+Sans:wght@400;700;800&family=Noto+Sans+Gurmukhi:wght@400;600;700;800&display=swap" rel="stylesheet">';
  var BRO_CSS = [
    '.peb{width:210mm;height:297mm;background:#fff;overflow:hidden;position:relative;display:flex;flex-direction:column;font-family:Inter,"Noto Sans Gurmukhi",Arial,sans-serif;color:#1d2433;box-sizing:border-box}',
    '.peb *{box-sizing:border-box}',
    '.peb .mast{background:linear-gradient(120deg,var(--c1) 0%,var(--c2) 100%);color:#fff;padding:7mm 9mm 5mm;position:relative}',
    '.peb .hosp{font-size:8.5pt;letter-spacing:.14em;text-transform:uppercase;opacity:.88;font-weight:800}',
    '.peb h1{font-family:Fraunces,Georgia,serif;font-size:28pt;line-height:1.02;margin:2mm 0 1.5mm;font-weight:800;max-width:150mm}',
    '.peb.pa h1{font-family:"Noto Sans Gurmukhi",sans-serif;font-size:24pt}',
    '.peb .kicker{font-size:10pt;max-width:125mm;opacity:.95;line-height:1.35}',
    '.peb .issue{position:absolute;right:9mm;top:7mm;background:#D4A017;color:#1d2433;font-weight:800;font-size:8pt;padding:2mm 3mm;border-radius:2mm;text-transform:uppercase;letter-spacing:.06em}',
    '.peb .hero{display:grid;grid-template-columns:1.25fr 1fr;gap:4mm;padding:5mm 9mm 0}',
    '.peb figure{margin:0;position:relative;border-radius:3mm;overflow:hidden;background:#dfe6ee}',
    '.peb figure img{display:block;width:100%;height:100%;object-fit:cover}',
    '.peb figcaption{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(transparent,rgba(0,0,0,.75));color:#fff;font-size:6.3pt;padding:5mm 2.5mm 1.4mm;line-height:1.3}',
    '.peb figcaption b{font-size:7.6pt;display:block;margin-bottom:.4mm}',
    '.peb .big{height:58mm}.peb .stack{display:grid;grid-template-rows:1fr 1fr;gap:3mm;height:58mm}',
    '.peb figure.noimg{background:linear-gradient(135deg,var(--c3),#eef1f6)}',
    '.peb figure.noimg img{visibility:hidden}',
    '.peb .grid{display:grid;grid-template-columns:1fr 1fr;gap:4mm;padding:4mm 9mm 3mm;flex:1;align-content:start;overflow:hidden}',
    '.peb h2{font-family:Fraunces,Georgia,serif;font-size:13pt;margin:0 0 1.5mm;color:var(--c1);display:flex;align-items:center;gap:2mm}',
    '.peb.pa h2{font-family:"Noto Sans Gurmukhi",sans-serif;font-size:11.5pt}',
    '.peb h2 .n{width:6mm;height:6mm;flex:0 0 6mm;border-radius:50%;background:#E8654A;color:#fff;font:800 8pt Inter,sans-serif;display:inline-flex;align-items:center;justify-content:center}',
    '.peb p,.peb li{font-size:8.6pt;line-height:1.42;margin:0 0 1.4mm}',
    '.peb.pa p,.peb.pa li{font-size:8.2pt;line-height:1.38}',
    '.peb ul{margin:0;padding-left:4mm}',
    '.peb .card{border-radius:3mm;padding:3mm 3.5mm}',
    '.peb .intro{background:var(--c3)}',
    '.peb .opt{display:flex;gap:2.5mm;align-items:flex-start;margin-bottom:1.6mm}',
    '.peb .tag{flex:0 0 auto;font-size:7pt;font-weight:800;text-transform:uppercase;background:var(--c4);color:#fff;border-radius:1.5mm;padding:.8mm 1.6mm;margin-top:.4mm}',
    '.peb .day{background:#FFF6E3}',
    '.peb ol.steps{list-style:none;padding:0;margin:0;counter-reset:s}',
    '.peb ol.steps li{position:relative;padding-left:7mm}',
    '.peb ol.steps li:before{counter-increment:s;content:counter(s);position:absolute;left:0;top:0;width:5mm;height:5mm;border-radius:50%;background:#D4A017;font-weight:800;font-size:7.5pt;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif}',
    '.peb .q{font-weight:800;font-size:8.6pt;color:var(--c1);margin-top:1.2mm}',
    '.peb .a{font-size:8.4pt;line-height:1.4;margin:0 0 .6mm}',
    '.peb.pa .q{font-size:8.3pt}.peb.pa .a{font-size:8.1pt}',
    '.peb .dd{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:4mm}',
    '.peb .do{background:#E9F7EC;border-left:2mm solid #2F9E55}.peb .dont{background:#FDECE8;border-left:2mm solid #E8654A}',
    '.peb .do h3,.peb .dont h3{margin:0 0 1.2mm;font-size:10.5pt}.peb .do h3{color:#1f7a3d}.peb .dont h3{color:#b23b22}',
    '.peb .do li,.peb .dont li{font-size:8.4pt;line-height:1.38;margin-bottom:.9mm}',
    '.peb.pa .do li,.peb.pa .dont li{font-size:8.1pt}',
    '.peb .foot{margin-top:auto;background:var(--c1);color:#fff;padding:3.5mm 9mm;display:flex;justify-content:space-between;align-items:center;font-size:8pt;gap:4mm}',
    '.peb .foot b{color:#F2C14E}'
  ].join('\n');
  var SHEET_CSS = [
    '.pes{width:210mm;min-height:297mm;background:#fff;padding:8mm 10mm 7mm;box-sizing:border-box;font-family:"Noto Sans",Arial,sans-serif;color:#111}',
    '.pes *{box-sizing:border-box}',
    '.pes .pa{font-family:"Noto Sans Gurmukhi","Noto Sans",sans-serif}',
    '.pes .lh{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #222;padding-bottom:2.5mm}',
    '.pes .lh .h{font-weight:800;font-size:13pt;letter-spacing:.02em}.pes .lh .s{font-size:8pt;color:#555}',
    '.pes .title{text-align:center;margin:2.5mm 0 2mm}.pes .title .en{font-size:13pt;font-weight:800;text-transform:uppercase;letter-spacing:.03em}.pes .title .pa{font-size:12pt;font-weight:700}',
    '.pes .pt{display:grid;grid-template-columns:repeat(4,1fr);border:1.2px solid #222;font-size:8.6pt}',
    '.pes .pt div{padding:1.2mm 2mm;border-right:1px solid #999;border-bottom:1px solid #999;min-height:8mm}',
    '.pes .pt div:nth-child(4n){border-right:0}.pes .pt div:nth-last-child(-n+4){border-bottom:0}',
    '.pes .pt span{display:block;font-size:6.8pt;text-transform:uppercase;color:#555;font-weight:700;letter-spacing:.04em}.pes .pt b{font-size:9.2pt}',
    '.pe-blank{display:inline-block;min-width:22mm;border-bottom:1px solid #000}',
    '.pes table{width:100%;border-collapse:collapse;margin-top:2.5mm;font-size:8.1pt;line-height:1.3}',
    '.pes th{background:#000;color:#fff;text-align:left;padding:1.4mm 2.2mm;font-size:9.2pt}',
    '.pes td{border:1px solid #999;padding:.9mm 2mm;vertical-align:top;width:50%}',
    '.pes td.pa{font-size:8.6pt;line-height:1.34}',
    '.pes tr.sechd td{background:#e6e6e6;font-weight:800;border-color:#777}',
    '.pes tr.urgent td{border:1.6px solid #000;font-weight:700}',
    '.pes .sign{display:flex;justify-content:space-between;margin-top:7mm;font-size:8.4pt}.pes .sign div{border-top:1px solid #000;padding-top:1mm;min-width:55mm;text-align:center}',
    '.pes .foot{margin-top:3mm;font-size:7.4pt;color:#555;text-align:center}',
    '.pes,.pes *{-webkit-print-color-adjust:exact;print-color-adjust:exact}'
  ].join('\n');
  var APP_CSS = [
    '.pe-wrap{margin-bottom:18px}',
    '.pe-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px}',
    '.pe-bar .grow{flex:1}',
    '.pe-bar select{font-size:12px;width:auto;min-width:150px}',
    '.pe-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}',
    '.pe-card{border-radius:12px;padding:12px 14px;color:#fff;cursor:pointer;min-height:84px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 8px rgba(20,30,60,.12)}',
    '.pe-card .t{font-weight:900;font-size:13.5px;line-height:1.25}.pe-card .s{font-size:10.5px;opacity:.9;margin-top:6px}',
    '.pe-card.new{background:#fff;color:var(--bmh-blue,#1A3C6E);border:2px dashed #b8c3d6;box-shadow:none;align-items:center;justify-content:center;font-weight:900}',
    '.pe-view{background:#e9ecf1;border-radius:12px;padding:12px;overflow:hidden}',
    '.pe-scale{transform-origin:top left}',
    '.pe-paper{box-shadow:0 6px 30px rgba(20,30,60,.18);background:#fff;width:210mm}',
    '.pe-editing [data-k]{outline:1.5px dashed rgba(212,160,23,.95);outline-offset:1px;border-radius:2px;cursor:text}',
    '.pe-editing [data-k]:focus{outline:2px solid #D4A017;background:rgba(255,246,227,.7);color:inherit}',
    '.pe-editing figure{cursor:pointer;outline:2px dashed rgba(212,160,23,.95)}',
    '.pe-add{display:none;font:700 10px Inter,sans-serif;margin:2px 0 4px;border:1px dashed #0B7B8C;background:#fff;color:#0B7B8C;border-radius:4px;padding:1px 6px;cursor:pointer}',
    '.pe-editing .pe-add{display:inline-block}',
    '.pe-warn{display:none;background:#FFF4E5;border:1px solid #F0B35B;color:#8a4b00;border-radius:8px;padding:7px 10px;font-size:12px;margin-bottom:8px}',
    '.pe-note{font-size:11px;color:var(--g1,#667);margin:6px 2px 0}',
    '.pe-old>summary{cursor:pointer;font-size:12px;font-weight:800;color:var(--g1,#667);padding:8px 2px}',
    BRO_CSS, SHEET_CSS
  ].join('\n');
  function ensureStyles() {
    if (document.getElementById('pe-styles')) return;
    var st = document.createElement('style'); st.id = 'pe-styles'; st.textContent = APP_CSS; document.head.appendChild(st);
    if (!document.getElementById('pe-fonts')) { var w = document.createElement('div'); w.id = 'pe-fonts'; w.innerHTML = FONTS; Array.prototype.slice.call(w.children).forEach(function (n) { document.head.appendChild(n); }); }
  }

  // ── Brochure page HTML ──────────────────────────────────────────────────────
  function brochureHtml(b, lang) {
    var t = THEMES[b.theme] || THEMES.teal;
    var d = b[lang] || b.en || {};
    var unit = (b.unit && b.unit[lang]) || deptName(b.dept, lang);
    var photos = Array.isArray(b.photos) ? b.photos : [];
    function k(path, html, tag, cls) { return '<' + (tag || 'span') + (cls ? ' class="' + cls + '"' : '') + ' data-k="' + path + '">' + (html == null ? '' : html) + '</' + (tag || 'span') + '>'; }
    function fig(i, cls) {
      var p = photos[i] || {};
      var cap = (p.cap && (p.cap[lang] || p.cap.en)) || '';
      return '<figure class="' + cls + (p.src ? '' : ' noimg') + '" data-photo="' + i + '">' + (p.src ? '<img src="' + esc(p.src) + '" alt="" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add(\'noimg\')">' : '<img alt="">')
        + '<figcaption>' + k('photos.' + i + '.cap.' + lang, esc(cap), 'b') + (lang === 'pa' ? 'ਤਸਵੀਰ: ' : 'Courtesy: ') + k('photos.' + i + '.credit', esc(p.credit || '')) + '</figcaption></figure>';
    }
    function list(key, arr, tag, cls) { return '<' + tag + (cls ? ' class="' + cls + '"' : '') + '>' + (arr || []).map(function (x, i) { return k(lang + '.' + key + '.' + i, x, 'li'); }).join('') + '</' + tag + '><button type="button" class="pe-add" data-add="' + key + '">+ ' + (lang === 'pa' ? 'ਲਾਈਨ ਜੋੜੋ' : 'Add line') + '</button>'; }
    return '<div class="peb ' + (lang === 'pa' ? 'pa' : 'en') + '" style="--c1:' + t[0] + ';--c2:' + t[1] + ';--c3:' + t[2] + ';--c4:' + t[3] + '">'
      + '<header class="mast"><div class="hosp">' + esc(C.hosp[lang] || C.hosp.en) + ' · ' + esc(unit) + '</div>'
      + k(lang + '.title', d.title, 'h1') + k(lang + '.kicker', d.kicker, 'div', 'kicker')
      + '<div class="issue">' + esc(C.guide[lang] || C.guide.en) + '</div></header>'
      + '<section class="hero">' + fig(0, 'big') + '<div class="stack">' + fig(1, '') + fig(2, '') + '</div></section>'
      + '<main class="grid">'
      + '<div class="card intro"><h2><span class="n">1</span>' + k(lang + '.introTitle', d.introTitle) + '</h2>' + (d.intro || []).map(function (x, i) { return k(lang + '.intro.' + i, x, 'p'); }).join('') + '<button type="button" class="pe-add" data-add="intro">+ ' + (lang === 'pa' ? 'ਲਾਈਨ ਜੋੜੋ' : 'Add line') + '</button></div>'
      + '<div class="opts"><h2><span class="n">2</span>' + k(lang + '.optTitle', d.optTitle) + '</h2>' + (d.opts || []).map(function (o, i) { return '<div class="opt">' + k(lang + '.opts.' + i + '.0', o[0], 'span', 'tag') + k(lang + '.opts.' + i + '.1', o[1], 'p') + '</div>'; }).join('') + '<button type="button" class="pe-add" data-add="opts">+ ' + (lang === 'pa' ? 'ਲਾਈਨ ਜੋੜੋ' : 'Add line') + '</button></div>'
      + '<div class="card day"><h2><span class="n">3</span>' + k(lang + '.dayTitle', d.dayTitle) + '</h2>' + list('day', d.day, 'ol', 'steps') + '</div>'
      + '<div class="faq"><h2><span class="n">4</span>' + k(lang + '.faqTitle', d.faqTitle) + '</h2>' + (d.faq || []).map(function (f, i) { return k(lang + '.faq.' + i + '.0', f[0], 'div', 'q') + k(lang + '.faq.' + i + '.1', f[1], 'p', 'a'); }).join('') + '<button type="button" class="pe-add" data-add="faq">+ ' + (lang === 'pa' ? 'ਸਵਾਲ ਜੋੜੋ' : 'Add question') + '</button></div>'
      + '<div class="dd"><div class="card do">' + k(lang + '.doTitle', d.doTitle, 'h3') + list('dos', d.dos, 'ul') + '</div>'
      + '<div class="card dont">' + k(lang + '.dontTitle', d.dontTitle, 'h3') + list('donts', d.donts, 'ul') + '</div></div>'
      + '</main>'
      + '<footer class="foot"><span>' + esc(C.hosp[lang] || C.hosp.en) + ' · ' + esc(C.centres[lang] || C.centres.en) + '</span><span>' + (lang === 'pa' ? 'ਕੋਈ ਸਵਾਲ? ਫ਼ੋਨ ਕਰੋ: ' : 'Questions? Call us: ') + '<b>' + esc(C.phones) + '</b></span></footer>'
      + '</div>';
  }

  // ── Instruction sheet HTML ──────────────────────────────────────────────────
  function sheetHtml(s, pt) {
    pt = pt || {};
    var extra = s.extra === 'eye'
      ? '<div><span>Eye / ਅੱਖ</span><b>Right ☐ &nbsp; Left ☐</b></div><div><span>Surgery date</span><b><span class="pe-blank"></span></b></div>'
      : s.extra === 'obg'
        ? '<div><span>LMP / EDD</span><b><span class="pe-blank"></span></b></div><div><span>Procedure date</span><b><span class="pe-blank"></span></b></div>'
        : '<div><span>Diagnosis</span><b><span class="pe-blank"></span></b></div><div><span>Next visit</span><b><span class="pe-blank"></span></b></div>';
    var rows = '';
    (s.sections || []).forEach(function (sec, si) {
      rows += '<tr class="sechd"><td data-k="sections.' + si + '.h.0">' + (sec.h[0] || '') + '</td><td class="pa" data-k="sections.' + si + '.h.1">' + (sec.h[1] || '') + '</td></tr>';
      (sec.rows || []).forEach(function (r, ri) {
        rows += '<tr><td data-k="sections.' + si + '.rows.' + ri + '.0">' + (r[0] || '') + '</td><td class="pa" data-k="sections.' + si + '.rows.' + ri + '.1">' + (r[1] || '') + '</td></tr>';
      });
      rows += '<tr class="pe-addrow"><td colspan="2" style="border:0;padding:0"><button type="button" class="pe-add" data-addrow="' + si + '">+ Add line / ਲਾਈਨ ਜੋੜੋ</button></td></tr>';
    });
    if (s.urgent) rows += '<tr class="urgent"><td data-k="urgent.0">' + (s.urgent[0] || '') + '</td><td class="pa" data-k="urgent.1">' + (s.urgent[1] || '') + '</td></tr>';
    return '<div class="pes">'
      + '<div class="lh"><div><div class="h">BAWEJA MULTISPECIALITY HOSPITAL</div><div class="s">' + esc(deptName(s.dept, 'en')) + ' · Rupnagar / Chandigarh</div></div><div class="s">Ph: ' + esc(C.phones) + '</div></div>'
      + '<div class="title"><div class="en" data-k="title.0">' + (s.title[0] || '') + '</div><div class="pa" data-k="title.1">' + (s.title[1] || '') + '</div></div>'
      + '<div class="pt">'
      + '<div><span>Patient name</span><b>' + esc(pt.name || '') + '</b></div>'
      + '<div><span>Age / Sex</span><b>' + esc(pt.ageSex || '') + '</b></div>'
      + '<div><span>BMSH ID</span><b>' + esc(pt.id || '') + '</b></div>'
      + '<div><span>Mobile</span><b>' + esc(pt.mob || '') + '</b></div>'
      + '<div><span>Date</span><b>' + esc(pt.date || '') + '</b></div>'
      + '<div><span>Doctor</span><b>' + esc(pt.doctor || '') + '</b></div>'
      + extra + '</div>'
      + '<table><tr><th>English</th><th class="pa">ਪੰਜਾਬੀ</th></tr>' + rows + '</table>'
      + '<button type="button" class="pe-add" data-addsection="1" style="margin-top:6px">+ Add section / ਭਾਗ ਜੋੜੋ</button>'
      + '<div class="sign"><div>Next visit / ਅਗਲੀ ਵਾਰੀ: </div><div>Doctor\'s signature / ਡਾਕਟਰ ਦੇ ਦਸਤਖ਼ਤ</div></div>'
      + '<div class="foot">These are general instructions. Follow your doctor\'s advice if it is different. · ਇਹ ਆਮ ਹਦਾਇਤਾਂ ਹਨ। ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਵੱਖਰੀ ਹੋਵੇ ਤਾਂ ਉਸ ਨੂੰ ਮੰਨੋ।</div>'
      + '</div>';
  }

  // ── Read edited text back into an object by data-k paths ────────────────────
  function setPath(obj, path, val) {
    var parts = path.split('.'); var o = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      var p = parts[i], nextIsIndex = /^\d+$/.test(parts[i + 1]);
      if (o[p] == null) o[p] = nextIsIndex ? [] : {};
      o = o[p];
    }
    o[parts[parts.length - 1]] = val;
  }
  function cleanHtml(el) {
    var h = el.innerHTML.replace(/<div><br><\/div>/g, '').replace(/<br\s*\/?>$/i, '').replace(/&nbsp;/g, ' ').trim();
    // keep only simple formatting
    return h.replace(/<(?!\/?(b|strong|i|em|br|span class="pe-blank")\b)[^>]*>/gi, '');
  }
  function collect(root, base) {
    var obj = clone(base);
    root.querySelectorAll('[data-k]').forEach(function (el) { setPath(obj, el.getAttribute('data-k'), cleanHtml(el)); });
    return obj;
  }
  function plain(s) { return String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
  function tidyBrochure(b) {
    ['en', 'pa'].forEach(function (l) {
      var d = b[l]; if (!d) return;
      ['intro', 'day', 'dos', 'donts'].forEach(function (key) { if (Array.isArray(d[key])) d[key] = d[key].filter(function (x) { return plain(x); }); });
      ['opts', 'faq'].forEach(function (key) { if (Array.isArray(d[key])) d[key] = d[key].filter(function (x) { return x && (plain(x[0]) || plain(x[1])); }); });
    });
    return b;
  }
  function tidySheet(s) {
    s.sections = (s.sections || []).filter(Boolean).map(function (sec) { sec.rows = (sec.rows || []).filter(function (r) { return r && (plain(r[0]) || plain(r[1])); }); return sec; })
      .filter(function (sec) { return plain(sec.h && sec.h[0]) || plain(sec.h && sec.h[1]) || sec.rows.length; });
    return s;
  }

  // ── Fit A4 preview into the available width ─────────────────────────────────
  function fitPreview(view) {
    var paper = view.querySelector('.pe-paper'); var sc = view.querySelector('.pe-scale'); if (!paper || !sc) return;
    var avail = view.clientWidth - 24; var w = paper.offsetWidth; var s = Math.min(1, avail / w);
    sc.style.transform = 'scale(' + s + ')'; sc.style.width = w + 'px'; sc.parentNode.style.height = (paper.offsetHeight * s) + 'px';
  }

  // ── Print in a clean window ─────────────────────────────────────────────────
  function printHtml(inner, title) {
    var w = window.open('', '_blank');
    if (!w) { toast('Please allow pop-ups to print', 'w'); return; }
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>' + esc(title || 'Print') + '</title>' + FONTS
      + '<style>@page{size:A4 portrait;margin:0}html,body{margin:0;padding:0;background:#fff}' + BRO_CSS + SHEET_CSS
      + '.pe-add,.pe-addrow{display:none!important}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}</style></head><body>' + inner + '</body></html>');
    w.document.close();
    var go = function () { try { w.focus(); w.print(); } catch (e) {} };
    var imgs = Array.prototype.slice.call(w.document.images || []);
    var waitImgs = Promise.all(imgs.map(function (im) { return im.complete ? 0 : new Promise(function (r) { im.onload = im.onerror = r; setTimeout(r, 6000); }); }));
    var waitFonts = (w.document.fonts && w.document.fonts.ready) ? w.document.fonts.ready : Promise.resolve();
    Promise.all([waitImgs, waitFonts]).then(function () { setTimeout(go, 250); });
  }

  // ── Photo replace: resize to max 1000px JPEG ────────────────────────────────
  function pickPhoto(cb) {
    var inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
    inp.onchange = function () {
      var f = inp.files && inp.files[0]; if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        var img = new Image();
        img.onload = function () {
          var max = 1000, w = img.width, h = img.height, r = Math.min(1, max / Math.max(w, h));
          var c = document.createElement('canvas'); c.width = Math.round(w * r); c.height = Math.round(h * r);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          cb(c.toDataURL('image/jpeg', 0.82));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(f);
    };
    inp.click();
  }

  // ═══ SURGERY BROCHURES PAGE ═══════════════════════════════════════════════
  var bro = { id: null, lang: 'en', editing: false, draft: null };
  function broRoot() { return document.getElementById('pe-brochures'); }
  function renderBrochureList() {
    var root = broRoot(); if (!root) return;
    var list = allBrochures();
    root.innerHTML = '<div class="pe-wrap"><div class="pe-bar"><div class="grow" style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.5px;color:var(--g1)">📰 Patient brochures — one-page A4, English &amp; ਪੰਜਾਬੀ, editable</div></div>'
      + '<div class="pe-cards">' + list.map(function (b) {
        var t = THEMES[b.theme] || THEMES.teal; var title = (b.en && plain(b.en.title)) || b.id;
        return '<div class="pe-card" style="background:linear-gradient(120deg,' + t[0] + ',' + t[1] + ')" onclick="bmhPeOpenBrochure(\'' + esc(b.id) + '\')"><div class="t">' + esc(title) + '</div><div class="s">' + esc(deptName(b.dept, 'en')) + (b.custom ? ' · added' : '') + (b._edited ? ' · edited' : '') + '</div></div>';
      }).join('') + '<div class="pe-card new" onclick="bmhPeNewBrochure()">+ New brochure</div></div>'
      + '<div class="pe-note">Click a brochure to view, edit or print it. Photos are courtesy of their credited sources; in edit mode you can replace any photo with your own.</div></div>';
  }
  function renderBrochureView() {
    var root = broRoot(); if (!root) return;
    var b = bro.draft || allBrochures().find(function (x) { return x.id === bro.id; });
    if (!b) { bro.id = null; renderBrochureList(); return; }
    var isDefault = !!defaultBrochure(b.id);
    root.innerHTML = '<div class="pe-wrap"><div class="pe-bar">'
      + '<button class="btn btn-outline btn-sm" onclick="bmhPeCloseBrochure()">← All brochures</button>'
      + '<select onchange="bmhPeBrochureLang(this.value)"><option value="en"' + (bro.lang === 'en' ? ' selected' : '') + '>English</option><option value="pa"' + (bro.lang === 'pa' ? ' selected' : '') + '>ਪੰਜਾਬੀ</option></select>'
      + '<span class="grow"></span>'
      + (bro.editing
        ? '<button class="btn btn-gold btn-sm" onclick="bmhPeSaveBrochure()">💾 Save</button><button class="btn btn-outline btn-sm" onclick="bmhPeCancelBrochure()">Cancel</button>'
        : '<button class="btn btn-outline btn-sm" onclick="bmhPeEditBrochure()">✏️ Edit</button>'
          + (isDefault && store.brochures[b.id] ? '<button class="btn btn-outline btn-sm" onclick="bmhPeResetBrochure()">↺ Original</button>' : '')
          + (!isDefault ? '<button class="btn btn-outline btn-sm" onclick="bmhPeDeleteBrochure()">🗑 Delete</button>' : '')
          + '<button class="btn btn-gold btn-sm" onclick="bmhPePrintBrochure()">🖨️ Print A4</button>')
      + '</div>'
      + (bro.editing ? '<div class="pe-note" style="margin-bottom:8px">Click any text to change it. Use “+ Add line” for new points; empty a line to remove it. Click a photo to replace it. Each language is edited separately — switch language to edit the other.</div>' : '')
      + '<div class="pe-warn" id="pe-bro-warn">Some text no longer fits on one A4 page — please shorten a few lines.</div>'
      + '<div class="pe-view"><div><div class="pe-scale"><div class="pe-paper' + (bro.editing ? ' pe-editing' : '') + '" id="pe-bro-paper">' + brochureHtml(b, bro.lang) + '</div></div></div></div></div>';
    var view = root.querySelector('.pe-view');
    var paper = document.getElementById('pe-bro-paper');
    if (bro.editing) paper.querySelectorAll('[data-k]').forEach(function (el) { el.contentEditable = 'true'; });
    paper.addEventListener('click', onBrochureClick);
    var check = function () { fitPreview(view); var g = paper.querySelector('.grid'); var warn = document.getElementById('pe-bro-warn'); if (g && warn) warn.style.display = (g.scrollHeight - g.clientHeight > 2) ? 'block' : 'none'; };
    setTimeout(check, 30); setTimeout(check, 600);
    paper.addEventListener('input', function () { clearTimeout(paper._t); paper._t = setTimeout(check, 200); });
  }
  function syncDraftFromDom() {
    var paper = document.getElementById('pe-bro-paper'); if (!paper || !bro.draft) return;
    bro.draft = collect(paper, bro.draft);
  }
  function onBrochureClick(e) {
    if (!bro.editing) return;
    var add = e.target.closest('.pe-add');
    if (add) {
      syncDraftFromDom();
      var d = bro.draft[bro.lang] || (bro.draft[bro.lang] = {});
      var key = add.getAttribute('data-add'); var nl = bro.lang === 'pa' ? 'ਨਵੀਂ ਲਾਈਨ — ਇੱਥੇ ਲਿਖੋ' : 'New line — type here';
      d[key] = d[key] || [];
      if (key === 'opts') d.opts.push([bro.lang === 'pa' ? 'ਨਵਾਂ' : 'New', nl]);
      else if (key === 'faq') d.faq.push([bro.lang === 'pa' ? 'ਨਵਾਂ ਸਵਾਲ?' : 'New question?', bro.lang === 'pa' ? 'ਜਵਾਬ — ਇੱਥੇ ਲਿਖੋ' : 'Answer — type here']);
      else d[key].push(nl);
      renderBrochureView(); return;
    }
    var fig = e.target.closest('figure');
    if (fig && !e.target.closest('[data-k]')) {
      var i = Number(fig.getAttribute('data-photo'));
      pickPhoto(function (dataUrl) {
        syncDraftFromDom();
        bro.draft.photos = bro.draft.photos || [];
        bro.draft.photos[i] = Object.assign({ cap: { en: '', pa: '' } }, bro.draft.photos[i] || {}, { src: dataUrl, credit: 'Baweja Multispeciality Hospital' });
        renderBrochureView();
      });
    }
  }
  window.bmhPeOpenBrochure = function (id) { bro.id = id; bro.editing = false; bro.draft = null; renderBrochureView(); };
  window.bmhPeCloseBrochure = function () {
    if (bro.editing && !window.confirm('Leave without saving your changes?')) return;
    bro.id = null; bro.editing = false; bro.draft = null; renderBrochureList();
  };
  window.bmhPeBrochureLang = function (l) { if (bro.editing) syncDraftFromDom(); bro.lang = l === 'pa' ? 'pa' : 'en'; renderBrochureView(); };
  window.bmhPeEditBrochure = function () { var b = allBrochures().find(function (x) { return x.id === bro.id; }); if (!b) return; bro.draft = clone(b); delete bro.draft._edited; bro.editing = true; renderBrochureView(); };
  window.bmhPeCancelBrochure = function () { bro.editing = false; bro.draft = null; renderBrochureView(); };
  window.bmhPeSaveBrochure = function () {
    syncDraftFromDom();
    var b = tidyBrochure(bro.draft); var id = b.id; delete b._edited;
    saveItem('brochures', id, b).then(function () { toast('Brochure saved for all computers ✓', 's'); }).catch(function () { toast('Saved on this computer; could not reach the server — please save again later', 'w'); });
    bro.editing = false; bro.draft = null; renderBrochureView();
  };
  window.bmhPeResetBrochure = function () {
    if (!window.confirm('Go back to the original brochure? Your edits to it will be removed.')) return;
    removeItem('brochures', bro.id).then(function () { toast('Original brochure restored ✓', 's'); }).catch(function () {});
    renderBrochureView();
  };
  window.bmhPeDeleteBrochure = function () {
    if (!window.confirm('Delete this brochure for everyone?')) return;
    removeItem('brochures', bro.id).catch(function () {}); bro.id = null; renderBrochureList();
  };
  window.bmhPeNewBrochure = function () {
    var title = window.prompt('Name of the new brochure (English):', ''); if (!title) return;
    var deptAns = window.prompt('Department: type Eye, OBG, Psych or Skin', 'Eye') || 'Eye';
    var dept = normDept(deptAns) || 'ophtho';
    var themes = Object.keys(THEMES);
    var id = 'custom-' + Date.now().toString(36);
    var blank = function (l) {
      var pa = l === 'pa';
      return { title: pa ? title : title, kicker: pa ? 'ਛੋਟੀ ਜਾਣ-ਪਛਾਣ — ਇੱਥੇ ਲਿਖੋ' : 'One-line introduction — type here',
        introTitle: pa ? 'ਬਿਮਾਰੀ ਕੀ ਹੈ?' : 'What is it?', intro: [pa ? 'ਬਿਮਾਰੀ ਬਾਰੇ ਜਾਣਕਾਰੀ ਇੱਥੇ ਲਿਖੋ।' : 'Describe the condition here.'],
        optTitle: pa ? 'ਇਲਾਜ ਦੇ ਤਰੀਕੇ' : 'Treatment options', opts: [[pa ? 'ਤਰੀਕਾ' : 'Option', pa ? 'ਇਲਾਜ ਬਾਰੇ ਲਿਖੋ।' : 'Describe the treatment.']],
        dayTitle: pa ? 'ਪ੍ਰਕਿਰਿਆ ਵਾਲੇ ਦਿਨ' : 'On the day of the procedure', day: [pa ? 'ਪਹਿਲਾ ਕਦਮ' : 'First step'],
        faqTitle: pa ? 'ਮਰੀਜ਼ਾਂ ਦੇ ਆਮ ਸਵਾਲ' : 'Questions patients ask', faq: [[pa ? 'ਸਵਾਲ?' : 'Question?', pa ? 'ਜਵਾਬ' : 'Answer']],
        doTitle: pa ? '✓ ਕੀ ਕਰੋ' : "✓ Do's", dos: [pa ? 'ਲਾਈਨ' : 'Line'], dontTitle: pa ? '✕ ਕੀ ਨਾ ਕਰੋ' : "✕ Don'ts", donts: [pa ? 'ਲਾਈਨ' : 'Line'] };
    };
    var b = { id: id, dept: dept, theme: themes[Math.floor(Math.random() * themes.length)], custom: true, photos: [{ src: '', credit: '', cap: { en: 'Photo', pa: 'ਤਸਵੀਰ' } }, { src: '', credit: '', cap: { en: 'Photo', pa: 'ਤਸਵੀਰ' } }, { src: '', credit: '', cap: { en: 'Photo', pa: 'ਤਸਵੀਰ' } }], en: blank('en'), pa: blank('pa') };
    saveItem('brochures', id, b).catch(function () {});
    bro.id = id; bro.lang = 'en'; bro.draft = clone(b); bro.editing = true; renderBrochureView();
  };
  window.bmhPePrintBrochure = function () {
    var b = allBrochures().find(function (x) { return x.id === bro.id; }); if (!b) return;
    var html = brochureHtml(b, bro.lang).replace(/<button[^>]*class="pe-add"[^>]*>.*?<\/button>/g, '');
    printHtml(html, (b[bro.lang] && plain(b[bro.lang].title)) || 'Brochure');
  };
  function renderBrochuresPage() {
    ensureStyles();
    if (!broRoot()) return;
    var paint = function () { if (bro.id) renderBrochureView(); else renderBrochureList(); };
    paint();
    loadStore().then(function () { if (!bro.editing) paint(); });
  }

  // ═══ PRINT INSTRUCTIONS ═══════════════════════════════════════════════════
  var ins = { dept: null, sheetId: null, ptId: '', editing: false, draft: null };
  function insRoot() { return document.getElementById('pe-instructions'); }
  function defaultDeptForUser() {
    var u = window.CURRENT_USER || {}; var d = normDept(u.dept || '');
    return ['ophtho', 'obg', 'psych', 'skin'].indexOf(d) >= 0 ? d : 'ophtho';
  }
  function todayPatientsForDept(dept) {
    var today = todayKey(); var out = []; var seen = {};
    var base = [];
    try { base = typeof getTodayQueueBasePatients === 'function' ? getTodayQueueBasePatients() : []; } catch (e) { base = []; }
    var pool = base.concat(window.PATIENTS || []);
    pool.forEach(function (p) {
      if (!p || !p.bmhId || seen[p.bmhId]) return;
      var inToday = false, doctor = '';
      try { inToday = typeof patientQueueDateMatchesToday === 'function' ? patientQueueDateMatchesToday(p) : dayOf(p.queueDate) === today; } catch (e) {}
      var hit = inToday && normDept(p.dept || p.department) === dept;
      if (hit) doctor = p.assignedDoctor || p.doctor || '';
      (Array.isArray(p.deptQueueEntries) ? p.deptQueueEntries : []).forEach(function (en) {
        if (en && en.active !== false && normDept(en.dept) === dept && dayOf(en.queueDate || en.createdAt) === today) { hit = true; doctor = doctor || en.doctor || ''; }
      });
      (Array.isArray(p.crossRefs) ? p.crossRefs : []).forEach(function (x) {
        if (x && x.active !== false && normDept(x.toDept) === dept && dayOf(x.createdAt || x.queueDate) === today) { hit = true; doctor = doctor || x.toDoctor || ''; }
      });
      if (!hit) return;
      seen[p.bmhId] = true;
      out.push({ p: p, doctor: doctor, at: Date.parse(p.queueAddedAt || p.checkinAt || '') || Number(p.checkinAt) || 0 });
    });
    out.sort(function (a, b) { return a.at - b.at; });
    return out;
  }
  function patientStrip(entry) {
    if (!entry) return { date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) };
    var p = entry.p;
    var age = String(p.age || '').replace(/\s*years?/i, ' Y');
    return { name: p.name || p.patient || '', ageSex: [age, p.sex ? String(p.sex).charAt(0).toUpperCase() : ''].filter(Boolean).join(' / '), id: p.bmhId || '', mob: p.mob || p.mobile || '', doctor: entry.doctor || p.doctor || '', date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) };
  }
  function renderInstructions() {
    ensureStyles();
    var root = insRoot(); if (!root) return;
    if (!ins.dept) ins.dept = defaultDeptForUser();
    var sheets = allSheets().filter(function (s) { return s.dept === ins.dept; });
    if (!sheets.some(function (s) { return s.id === ins.sheetId; })) ins.sheetId = sheets[0] ? sheets[0].id : null;
    var pts = todayPatientsForDept(ins.dept);
    if (ins.ptId && !pts.some(function (x) { return x.p.bmhId === ins.ptId; })) ins.ptId = '';
    var sheet = ins.draft || sheets.find(function (s) { return s.id === ins.sheetId; });
    var entry = pts.find(function (x) { return x.p.bmhId === ins.ptId; });
    var isDefault = sheet && !!defaultSheet(sheet.id);
    root.innerHTML = '<div class="card" style="margin-bottom:14px"><div class="card-hd"><div><div class="card-title">🖨️ Print Instructions</div><div class="card-sub">Black &amp; white · English + ਪੰਜਾਬੀ · patient details from today\'s queue</div></div></div>'
      + '<div class="pe-bar">'
      + '<select title="Department" onchange="bmhPeInsDept(this.value)"' + (ins.editing ? ' disabled' : '') + '>' + DEPTS.map(function (d) { return '<option value="' + d[0] + '"' + (d[0] === ins.dept ? ' selected' : '') + '>' + d[1] + '</option>'; }).join('') + '</select>'
      + '<select title="Patient from today\'s queue" onchange="bmhPeInsPatient(this.value)" style="min-width:220px"><option value="">— Patient (today\'s queue: ' + pts.length + ') —</option>' + pts.map(function (x) { return '<option value="' + esc(x.p.bmhId) + '"' + (x.p.bmhId === ins.ptId ? ' selected' : '') + '>' + esc((x.p.name || 'Patient') + ' · ' + x.p.bmhId) + '</option>'; }).join('') + '</select>'
      + '<select title="Instruction sheet" onchange="bmhPeInsSheet(this.value)"' + (ins.editing ? ' disabled' : '') + '>' + (sheets.length ? sheets.map(function (s) { return '<option value="' + esc(s.id) + '"' + (s.id === ins.sheetId ? ' selected' : '') + '>' + esc(plain(s.title && s.title[0]).replace(/\s*—.*$/, '')) + '</option>'; }).join('') : '<option value="">No sheets yet</option>') + '</select>'
      + '<span class="grow"></span>'
      + (ins.editing
        ? '<button class="btn btn-gold btn-sm" onclick="bmhPeInsSave()">💾 Save</button><button class="btn btn-outline btn-sm" onclick="bmhPeInsCancel()">Cancel</button>'
        : (sheet ? '<button class="btn btn-outline btn-sm" onclick="bmhPeInsEdit()">✏️ Edit</button>' : '')
          + (sheet && isDefault && store.instructions[sheet.id] ? '<button class="btn btn-outline btn-sm" onclick="bmhPeInsReset()">↺ Original</button>' : '')
          + (sheet && !isDefault ? '<button class="btn btn-outline btn-sm" onclick="bmhPeInsDelete()">🗑 Delete</button>' : '')
          + '<button class="btn btn-outline btn-sm" onclick="bmhPeInsNew()">+ New sheet</button>'
          + (sheet ? '<button class="btn btn-gold btn-sm" onclick="bmhPeInsPrint()">🖨️ Print A4</button>' : ''))
      + '</div>'
      + (ins.editing ? '<div class="pe-note" style="margin-bottom:8px">Click any text to change it. Use “+ Add line” or “+ Add section” for new points; empty a line to remove it. Write ' + esc('___') + ' style blanks by typing them.</div>' : '')
      + '<div class="pe-warn" id="pe-ins-warn">This sheet is now longer than one A4 page — it will print on 2 pages.</div>'
      + (sheet ? '<div class="pe-view"><div><div class="pe-scale"><div class="pe-paper' + (ins.editing ? ' pe-editing' : '') + '" id="pe-ins-paper">' + sheetHtml(sheet, patientStrip(entry)) + '</div></div></div></div>'
        : '<div class="pe-note">No instruction sheets for this department yet. Use “+ New sheet” to add one.</div>')
      + '</div>';
    var paper = document.getElementById('pe-ins-paper'); if (!paper) return;
    var view = root.querySelector('.pe-view');
    if (ins.editing) paper.querySelectorAll('[data-k]').forEach(function (el) { el.contentEditable = 'true'; });
    paper.addEventListener('click', onSheetClick);
    var check = function () { fitPreview(view); var warn = document.getElementById('pe-ins-warn'); var pg = paper.querySelector('.pes'); if (warn && pg) warn.style.display = pg.scrollHeight > pg.offsetWidth * 297 / 210 + 3 ? 'block' : 'none'; };
    setTimeout(check, 30); setTimeout(check, 600);
    paper.addEventListener('input', function () { clearTimeout(paper._t); paper._t = setTimeout(check, 200); });
  }
  function syncSheetFromDom() { var paper = document.getElementById('pe-ins-paper'); if (paper && ins.draft) ins.draft = collect(paper, ins.draft); }
  function onSheetClick(e) {
    if (!ins.editing) return;
    var add = e.target.closest('.pe-add'); if (!add) return;
    syncSheetFromDom();
    if (add.hasAttribute('data-addrow')) { var si = Number(add.getAttribute('data-addrow')); ins.draft.sections[si].rows.push(['New line — type here', 'ਨਵੀਂ ਲਾਈਨ — ਇੱਥੇ ਲਿਖੋ']); }
    if (add.hasAttribute('data-addsection')) ins.draft.sections.push({ h: [(ins.draft.sections.length + 1) + '. New section', (ins.draft.sections.length + 1) + '. ਨਵਾਂ ਭਾਗ'], rows: [['New line — type here', 'ਨਵੀਂ ਲਾਈਨ — ਇੱਥੇ ਲਿਖੋ']] });
    renderInstructions();
  }
  window.bmhPeInsDept = function (d) { ins.dept = d; ins.sheetId = null; ins.ptId = ''; renderInstructions(); };
  window.bmhPeInsPatient = function (id) { if (ins.editing) syncSheetFromDom(); ins.ptId = id; renderInstructions(); };
  window.bmhPeInsSheet = function (id) { ins.sheetId = id; renderInstructions(); };
  window.bmhPeInsEdit = function () { var s = allSheets().find(function (x) { return x.id === ins.sheetId; }); if (!s) return; ins.draft = clone(s); delete ins.draft._edited; ins.editing = true; renderInstructions(); };
  window.bmhPeInsCancel = function () { ins.editing = false; ins.draft = null; renderInstructions(); };
  window.bmhPeInsSave = function () {
    syncSheetFromDom(); var s = tidySheet(ins.draft); delete s._edited;
    saveItem('instructions', s.id, s).then(function () { toast('Instruction sheet saved for all computers ✓', 's'); }).catch(function () { toast('Saved on this computer; could not reach the server — please save again later', 'w'); });
    ins.editing = false; ins.draft = null; renderInstructions();
  };
  window.bmhPeInsReset = function () {
    if (!window.confirm('Go back to the original sheet? Your edits to it will be removed.')) return;
    removeItem('instructions', ins.sheetId).catch(function () {}); renderInstructions();
  };
  window.bmhPeInsDelete = function () {
    if (!window.confirm('Delete this instruction sheet for everyone?')) return;
    removeItem('instructions', ins.sheetId).catch(function () {}); ins.sheetId = null; renderInstructions();
  };
  window.bmhPeInsNew = function () {
    var title = window.prompt('Name of the new instruction sheet (English), e.g. "Pterygium Surgery":', ''); if (!title) return;
    var id = 'custom-' + Date.now().toString(36);
    var s = { id: id, dept: ins.dept, custom: true, extra: ins.dept === 'ophtho' ? 'eye' : (ins.dept === 'obg' ? 'obg' : null),
      title: [title + ' — Patient Instructions', 'ਮਰੀਜ਼ ਲਈ ਹਦਾਇਤਾਂ'],
      sections: [
        { h: ['1. Tests needed', '1. ਜ਼ਰੂਰੀ ਟੈਸਟ'], rows: [['Type here', 'ਇੱਥੇ ਲਿਖੋ']] },
        { h: ['2. What happens during the procedure', '2. ਪ੍ਰਕਿਰਿਆ ਦੌਰਾਨ ਕੀ ਹੁੰਦਾ ਹੈ'], rows: [['Type here', 'ਇੱਥੇ ਲਿਖੋ']] },
        { h: ['3. Before (pre-op)', '3. ਪਹਿਲਾਂ'], rows: [['Type here', 'ਇੱਥੇ ਲਿਖੋ']] },
        { h: ['4. After (post-op)', '4. ਬਾਅਦ ਵਿੱਚ'], rows: [['Type here', 'ਇੱਥੇ ਲਿਖੋ']] }],
      urgent: ['COME IMMEDIATELY if …', 'ਤੁਰੰਤ ਆਓ ਜੇ …'] };
    saveItem('instructions', id, s).catch(function () {});
    ins.sheetId = id; ins.draft = clone(s); ins.editing = true; renderInstructions();
  };
  window.bmhPeInsPrint = function () {
    var s = allSheets().find(function (x) { return x.id === ins.sheetId; }); if (!s) return;
    var entry = todayPatientsForDept(ins.dept).find(function (x) { return x.p.bmhId === ins.ptId; });
    if (!entry && !window.confirm('No patient selected — print without patient details?')) return;
    var html = sheetHtml(s, patientStrip(entry)).replace(/<button[^>]*class="pe-add"[^>]*>.*?<\/button>/g, '');
    printHtml(html, plain(s.title && s.title[0]));
  };
  function renderInstructionsPage() {
    if (!insRoot()) return;
    renderInstructions();
    loadStore().then(function () { if (!ins.editing) renderInstructions(); });
  }

  // ── Hook into the existing page renders (wrap, never replace) ───────────────
  function wrap(name, after) {
    var orig = window[name];
    var wrapped = function () {
      var r;
      try { if (typeof orig === 'function') r = orig.apply(this, arguments); } finally { try { after(); } catch (e) { console.warn('patient education', e); } }
      return r;
    };
    if (orig && orig._bmhPerfWrapped) wrapped._bmhPerfWrapped = true;
    window[name] = wrapped;
  }
  wrap('renderBrochures', renderBrochuresPage);
  wrap('renderPrintTemplates', renderInstructionsPage);
  window.addEventListener('resize', function () { document.querySelectorAll('.pe-view').forEach(fitPreview); });
  // If either page is already open when this loads, paint it.
  if (document.getElementById('pg-brochures') && document.getElementById('pg-brochures').classList.contains('active')) renderBrochuresPage();
  if (document.getElementById('pg-print-templates') && document.getElementById('pg-print-templates').classList.contains('active')) renderInstructionsPage();
  window.bmhPatientEducation = { brochureHtml: brochureHtml, sheetHtml: sheetHtml, allBrochures: allBrochures, allSheets: allSheets, todayPatientsForDept: todayPatientsForDept, store: store };
})();
