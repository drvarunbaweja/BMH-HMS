/* BMH — three prescription print designs for Eye and OBG:
 *   'split_chart'  → Split Chart   (clinical column on the left, Rx on the right)
 *   'eye_card'     → Card          (summary cards + medicine table with dose dots)
 *   'clear_table'  → Clear Table   (boxed tables, bilingual medicines)
 * Called only from printUnifiedRx when one of these layouts is chosen; it only builds the
 * printout HTML from data the print function already gathered. If anything fails, the print
 * function falls back to the standard layout. Nothing is saved or changed.
 */
(function () {
  'use strict';
  var KEYS = ['split_chart', 'eye_card', 'clear_table'];

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function has(v) { var s = String(v == null ? '' : v).trim(); return !!s && s !== '—' && s !== '-' && s !== '/'; }
  function val(v) { return has(v) ? esc(String(v).trim()) : '—'; }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function parseIso(iso) { var m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? { y: m[1], m: Number(m[2]), d: m[3] } : null; }
  function fmtDay(iso) { var p = parseIso(iso); return p ? p.d + ' ' + MON[p.m - 1] + ' ' + p.y : esc(iso || ''); }
  function fmtRange(a, b) {
    var p = parseIso(a), q = parseIso(b);
    if (!p) return '';
    if (!q || a === b) return fmtDay(a);
    if (p.y === q.y) return p.d + ' ' + MON[p.m - 1] + ' → ' + q.d + ' ' + MON[q.m - 1] + ' ' + q.y;
    return fmtDay(a) + ' → ' + fmtDay(b);
  }
  function fmtRangeShort(a, b) {
    var p = parseIso(a), q = parseIso(b);
    if (!p) return '';
    if (!q || a === b) return p.d + ' ' + MON[p.m - 1];
    return p.d + ' ' + MON[p.m - 1] + ' → ' + q.d + ' ' + MON[q.m - 1];
  }
  function g(fnName) { return typeof window[fnName] === 'function' ? window[fnName] : null; }

  // ── medicine wording (uses the software's own Hindi / Punjabi phrases) ──
  var F = {};
  ['rxFreqPlain', 'rxFreqPlainEn', 'rxEyePlain', 'rxEyePlainEn', 'rxDurationPlain', 'rxMealTimingPlain', 'rxOralDosePhrase', 'rxOralDosePhraseEn',
    'rxPlainIsEyeDrop', 'rxPlainIsTopicalCream', 'rxTopicalFormPlain', 'isRxPlainOral', 'getRxSiteLabel', 'getRxTimingsText', 'rxDrugTradeName',
    'rxDrugGenericName', 'rxMealTimingIsDoseNote'].forEach(function (n) { F[n] = function () { var f = g(n); try { return f ? f.apply(null, arguments) : ''; } catch (e) { return ''; } }; });

  function formLabel(d) {
    var t = String(d.drugType || d.type || '').trim();
    if (/eye\s*drop|^drops?$/i.test(t)) return 'eye drops';
    if (/ointment/i.test(t)) return 'ointment';
    if (/gel/i.test(t)) return 'gel';
    return t ? t.toLowerCase() : '';
  }
  function tradeLine(d) {
    var trade = F.rxDrugTradeName(d) || d.name || 'Medicine';
    var t = String(d.drugType || d.type || '');
    var pre = /^tab|tablet/i.test(t) && !/^tab/i.test(trade) ? 'Tab. ' : /capsule|^cap/i.test(t) && !/^cap/i.test(trade) ? 'Cap. ' : /syrup|suspension/i.test(t) && !/^syp/i.test(trade) ? 'Syp. ' : /injection/i.test(t) && !/^inj/i.test(trade) ? 'Inj. ' : '';
    var post = /drop|ointment|gel/i.test(t) && !new RegExp(formLabel(d), 'i').test(trade) ? ' ' + formLabel(d) : '';
    return pre + trade + post;
  }
  function shortInstruction(d, lang) {
    var site = F.getRxSiteLabel(d);
    var freq = F.rxFreqPlain(d.freq, lang) || '';
    var meal = F.rxMealTimingPlain(d.mealTiming, lang) || '';
    var eye = lang === 'en' ? F.rxEyePlainEn(site) : F.rxEyePlain(site, lang);
    var form = String(d.drugType || d.type || '').toLowerCase();
    var line;
    if (F.rxPlainIsEyeDrop(d)) {
      line = lang === 'hi' ? String(eye || 'आंख').replace('दोनों आंखें', 'दोनों आंखों') + ' में 1 बूंद, ' + freq : lang === 'pa' ? (eye || 'ਅੱਖ') + ' ਵਿੱਚ 1 ਬੂੰਦ, ' + freq : '1 drop in ' + (eye || 'the eye') + ', ' + freq;
    } else if (F.rxPlainIsTopicalCream(d)) {
      var tf = F.rxTopicalFormPlain(d, lang);
      line = lang === 'hi' ? (eye || 'प्रभावित जगह') + ' पर ' + tf + ' लगाएं, ' + freq : lang === 'pa' ? (eye || 'ਪ੍ਰਭਾਵਿਤ ਥਾਂ') + ' ਤੇ ' + tf + ' ਲਗਾਓ, ' + freq : 'Apply to ' + (eye || 'the affected area') + ', ' + freq;
    } else if (/injection/.test(form)) {
      line = lang === 'hi' ? 'निर्देशानुसार, ' + freq : lang === 'pa' ? 'ਨਿਰਦੇਸ਼ ਅਨੁਸਾਰ, ' + freq : 'As directed, ' + freq;
    } else {
      var dose = F.rxMealTimingIsDoseNote(meal) ? meal : ((lang === 'en' ? F.rxOralDosePhraseEn(d) : F.rxOralDosePhrase(d, lang)) + (meal ? ' ' + meal : ''));
      line = lang === 'en' ? dose.charAt(0).toUpperCase() + dose.slice(1) + ', ' + freq : dose + ', ' + freq;
    }
    return line.replace(/,\s*$/, '');
  }
  function durLabel(d, lang) { return F.rxDurationPlain(d.dur, lang) || ''; }
  function steps(d) {
    var rows = Array.isArray(d.taperRows) ? d.taperRows : (d.taperRow ? [d.taperRow] : []);
    rows = rows.filter(function (r) { return r && (r.freq || r.dur); });
    if (!rows.length) return [];
    return [{ freq: d.freq, dur: d.dur, dateFrom: d.dateFrom, dateTo: d.dateTo }].concat(rows.map(function (r) { return Object.assign({}, d, r); }));
  }
  function freqShort(freq, lang) { return F.rxFreqPlain(freq, lang) || String(freq || ''); }
  function totalRange(d) {
    var st = steps(d);
    var end = st.length ? (st[st.length - 1].dateTo || d.dateTo) : d.dateTo;
    return { from: d.dateFrom, to: end };
  }
  function totalDur(d, lang) {
    var st = steps(d);
    if (!st.length) return durLabel(d, lang);
    var r = totalRange(d), p = parseIso(r.from), q = parseIso(r.to);
    if (!p || !q) return durLabel(d, lang);
    var days = Math.round((Date.UTC(q.y, q.m - 1, q.d) - Date.UTC(p.y, p.m - 1, p.d)) / 864e5) + 1;
    var en = days % 7 === 0 ? (days / 7) + (days === 7 ? ' week' : ' weeks') : days + ' days';
    return lang === 'en' ? en : F.rxDurationPlain(en, lang);
  }
  // Morning / Noon / Evening / Night dots for the usual frequencies; null = describe in words
  function dots(d) {
    var f = String(d.freq || '').toLowerCase(), meal = String(d.mealTiming || '').toLowerCase();
    if (Array.isArray(d.activeTimes) && d.activeTimes.length) return null;
    if (/qid|four times/.test(f)) return [1, 1, 1, 1];
    if (/tds|three times/.test(f)) return [1, 1, 0, 1];
    if (/\bbd\b|twice/.test(f)) return [1, 0, 0, 1];
    if (/\bhs\b|bedtime/.test(f)) return [0, 0, 0, 1];
    if (/once daily|\(od\)|^od\b/.test(f) && !/overdrive/.test(f)) {
      if (/lunch/.test(meal)) return [0, 1, 0, 0];
      if (/dinner|bedtime|night/.test(meal)) return [0, 0, 0, 1];
      return [1, 0, 0, 0];
    }
    return null;
  }
  function langLabel(lang) { return lang === 'hi' ? { meds: 'दवाइयाँ', next: 'अगली मुलाक़ात', times: 'सुबह · दोपहर · शाम · रात', taper: 'धीरे-धीरे कम करें' } : lang === 'pa' ? { meds: 'ਦਵਾਈਆਂ', next: 'ਅਗਲੀ ਮੁਲਾਕਾਤ', times: 'ਸਵੇਰ · ਦੁਪਹਿਰ · ਸ਼ਾਮ · ਰਾਤ', taper: 'ਹੌਲੀ-ਹੌਲੀ ਘਟਾਓ' } : null; }

  // ── shared bits ──
  function fontLinks(lang) {
    var fam = ['DM+Sans:wght@400;500;700', 'DM+Serif+Display', 'Manrope:wght@400;600;800', 'IBM+Plex+Sans:wght@400;600;700', 'IBM+Plex+Mono:wght@500'];
    if (lang === 'hi') fam.push('Noto+Sans+Devanagari:wght@400;600');
    if (lang === 'pa') fam.push('Noto+Sans+Gurmukhi:wght@400;600');
    return '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?' + fam.map(function (f) { return 'family=' + f; }).join('&') + '&display=swap">';
  }
  function localFont(lang) { return lang === 'hi' ? "'Noto Sans Devanagari',sans-serif" : lang === 'pa' ? "'Noto Sans Gurmukhi',sans-serif" : 'inherit'; }
  var GREY = '';
  function header(c) { return c.headerSrc ? '<div class="lh"><img src="' + esc(c.headerSrc) + '" alt=""></div>' : '<div class="lh-text">Baweja Multispeciality Hospital</div>'; }
  function signature(c, align) {
    var dr = c.doctor || {};
    return '<div class="sig" style="text-align:' + (align || 'right') + '"><div class="sig-line"><b>' + esc(dr.name || '') + '</b></div>'
      + (dr.degrees ? '<div class="sig-deg">' + esc(dr.degrees) + '</div>' : '')
      + '<div class="sig-sub">' + esc([dr.spec, dr.reg ? 'Reg. ' + dr.reg : ''].filter(Boolean).join(' · ')) + '</div></div>';
  }
  function listLines(text) { return String(text || '').split(/\n|;\s*/).map(function (s) { return s.trim(); }).filter(Boolean); }
  function adviceLines(c) { return (c.postSurgeryAdvice ? [c.postSurgeryAdvice] : []).concat(listLines(c.advice)); }
  function eyeRows(c) {
    var e = c.eye || {};
    return {
      showVA: e.showVA, showIOP: e.showIOP, showGL: e.showGL, showCorr: e.showCorrectedIOP,
      od: { ua: e.vaOD, bc: e.subjODva, near: e.nvOD, gat: e.iopGatOD, nct: e.iopNctOD, corr: e.iopCorrOD, cct: e.pachyOD, sph: e.rfODSph, cyl: e.rfODCyl, ax: e.rfODAx, add: e.addOD },
      os: { ua: e.vaOS, bc: e.subjOSva, near: e.nvOS, gat: e.iopGatOS, nct: e.iopNctOS, corr: e.iopCorrOS, cct: e.pachyOS, sph: e.rfOSSph, cyl: e.rfOSCyl, ax: e.rfOSAx, add: e.addOS },
      ipd: e.ipdVal
    };
  }
  function iopText(v) { return has(v) ? esc(String(v).replace(/\s*mm\s*hg/i, '')) : '—'; }
  function obgPresent(c) { return (c.obg && c.obg.present) || null; }

  // ═════════════════════ Design A — Split Chart ═════════════════════
  function designA(c) {
    var lang = c.lang, L = langLabel(lang), loc = localFont(lang);
    var css = ':root{--ink:#111;--teal:#222;--tint:#f2f2f2;--line:#d2d2d2;--muted:#555;--rose:#111}*{box-sizing:border-box}'
      + 'body{margin:0;background:#fff;font-family:"DM Sans",Arial,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:0}'
      + '.loc{font-family:' + loc + '}.page{width:210mm;min-height:297mm;display:grid;grid-template-columns:66mm 1fr;grid-template-rows:auto 1fr auto}'
      + '.top{grid-column:1/-1;padding:6mm 10mm 1.5mm;border-bottom:2px solid var(--teal)}.lh img{width:100%;display:block}.lh-text{font-family:"DM Serif Display",serif;font-size:22pt;color:var(--teal)}'
      + 'aside{background:var(--tint);padding:5mm 6mm 5mm 10mm;border-right:1px solid var(--line)}main{padding:5mm 10mm 4mm 7mm}'
      + '.tag{font-size:7pt;letter-spacing:1px;text-transform:uppercase;color:var(--muted)}.nm{font-family:"DM Serif Display",serif;font-size:16pt;line-height:1.1}.meta{font-size:8.4pt;color:var(--muted);line-height:1.5;margin-top:2px}'
      + 'h3{font-size:7.4pt;letter-spacing:1.5px;text-transform:uppercase;color:var(--teal);margin:3.6mm 0 1.4mm;font-weight:700}main>h3:first-child{margin-top:0}'
      + 'table.t{width:100%;border-collapse:collapse;font-size:8.5pt;background:#fff;border-radius:6px;overflow:hidden}table.t th,table.t td{padding:3.5px 5px;border-bottom:1px solid var(--line);text-align:center}'
      + 'table.t th{background:#e4e4e4;color:#111;font-weight:500;font-size:7.4pt}table.t td:first-child,table.t th:first-child{text-align:left;color:var(--muted)}'
      + '.note{font-size:7.4pt;color:var(--muted);margin-top:2px}.iop{display:flex;gap:6px}.iop div{flex:1;background:#fff;border-radius:6px;text-align:center;padding:5px 0;border:1px solid var(--line)}'
      + '.iop b{display:block;font-size:15pt;font-family:"DM Serif Display",serif;font-weight:400}.iop span{font-size:7.4pt;color:var(--muted)}'
      + '.cor{margin-top:5px;background:#fff;border:1px dashed var(--teal);border-radius:6px;padding:5px 8px;font-size:8.2pt;line-height:1.45}.cor b{color:var(--teal)}'
      + '.ga{background:#fff;color:#111;border:2px solid #222;border-radius:10px;padding:7px 10px}.ga b{font-family:"DM Serif Display",serif;font-weight:400;font-size:19pt;display:block;line-height:1}.ga span{font-size:8pt;opacity:.9}'
      + '.gpal{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:5px}.gpal div{background:#fff;border:1px solid var(--line);border-radius:6px;text-align:center;padding:3px 0;font-size:7pt;color:var(--muted)}.gpal b{display:block;font-size:12pt;color:var(--ink)}'
      + '.kv{width:100%;border-collapse:collapse;font-size:8.4pt;background:#fff;border-radius:6px;overflow:hidden}.kv td{padding:3.5px 6px;border-bottom:1px solid var(--line)}.kv td:first-child{color:var(--muted)}.kv td:last-child{text-align:right;font-weight:700}'
      + '.vit{display:grid;grid-template-columns:1fr 1fr;gap:4px}.vit div{background:#fff;border:1px solid var(--line);border-radius:6px;padding:4px 7px;font-size:7.2pt;color:var(--muted)}.vit b{display:block;font-size:10.5pt;color:var(--ink)}'
      + 'ul.p{margin:0;padding-left:14px;font-size:9.4pt;line-height:1.42}.hx{font-size:8.8pt;line-height:1.4}.hx div{padding:2px 0;border-bottom:1px dashed var(--line)}.hx b{color:var(--teal)}'
      + '.dx{font-size:10.4pt;font-weight:700;padding:5px 10px;background:var(--tint);border-left:3px solid var(--teal);border-radius:0 6px 6px 0}.dx div+div{margin-top:2px}'
      + '.rx{font-family:"DM Serif Display",serif;font-size:19pt;color:var(--teal);line-height:1;margin:2.5mm 0 0}'
      + '.med{display:grid;grid-template-columns:18px 1fr auto;gap:0 8px;padding:4px 0;border-bottom:1px dashed var(--line);break-inside:avoid}.med .n{font-weight:700;color:var(--teal);font-size:10pt}'
      + '.med .b{font-weight:700;font-size:11pt}.med .g{grid-column:2;font-size:8.2pt;color:var(--muted);letter-spacing:.3px;text-transform:uppercase}.med .h{grid-column:2;font-size:9.4pt}.med .l{grid-column:2;font-size:9.4pt;color:var(--teal)}'
      + '.med .d{grid-row:1/span 4;grid-column:3;align-self:start;font-size:9pt;font-weight:700;color:var(--teal);white-space:nowrap;text-align:right}.med .d small{display:block;font-weight:500;color:var(--muted);font-size:8pt}.med .d .loc{display:block;font-weight:600}'
      + '.taper{grid-column:2/span 2;display:grid;grid-template-columns:repeat(auto-fit,minmax(24mm,1fr));gap:3px;margin-top:3px}.taper div{background:var(--tint);border-radius:5px;padding:3px 4px;text-align:center;font-size:7.6pt;line-height:1.3}'
      + '.taper b{display:block;color:var(--teal);font-size:8.4pt}.taper span{display:block;color:var(--muted)}.taper em{font-style:normal;display:block;color:var(--teal)}'
      + '.adv{margin:0;padding-left:14px;font-size:9.2pt;line-height:1.45}.warn{margin-top:2mm;border:1.5px solid var(--rose);border-radius:8px;padding:5px 9px;font-size:8.6pt;line-height:1.45}.warn b{color:var(--rose)}'
      + '.foot{grid-column:1/-1;display:flex;justify-content:space-between;align-items:flex-end;gap:6mm;padding:2mm 10mm 6mm;border-top:1px solid var(--line)}'
      + '.fu{background:#fff;color:#111;border:2px solid #222;padding:5px 12px;border-radius:20px;font-weight:700;font-size:10.5pt;display:inline-block}'
      + '.sig-line{border-top:1px solid var(--ink);padding-top:3px;margin-top:9mm;min-width:58mm;display:inline-block}.sig-deg,.sig-sub{font-size:7.6pt;color:var(--muted);max-width:80mm;margin-left:auto}';
    var p = c.patient, aside = '', main = '';
    aside += '<div class="tag">Patient</div><div class="nm">' + esc(p.name) + '</div><div class="meta">' + esc(p.ageSex) + ' · ' + esc(p.id) + '<br>' + esc(p.date) + (p.centre ? ' · ' + esc(p.centre) : '') + '</div>';
    if (c.dept === 'oe') {
      var e = eyeRows(c);
      if (e.showVA) aside += '<h3>Vision</h3><table class="t"><tr><th></th><th>RE</th><th>LE</th></tr>'
        + (has(e.od.ua) || has(e.os.ua) ? '<tr><td>Unaided</td><td>' + val(e.od.ua) + '</td><td>' + val(e.os.ua) + '</td></tr>' : '')
        + (has(e.od.bc) || has(e.os.bc) ? '<tr><td>Best corr.</td><td>' + val(e.od.bc) + '</td><td>' + val(e.os.bc) + '</td></tr>' : '')
        + (has(e.od.near) || has(e.os.near) ? '<tr><td>Near</td><td>' + val(e.od.near) + '</td><td>' + val(e.os.near) + '</td></tr>' : '') + '</table>';
      if (e.showIOP && (has(e.od.gat) || has(e.os.gat))) {
        aside += '<h3>IOP — GAT</h3><div class="iop"><div><b>' + iopText(e.od.gat) + '</b><span>RE mmHg</span></div><div><b>' + iopText(e.os.gat) + '</b><span>LE mmHg</span></div></div><div class="note">Goldmann applanation</div>';
        if (e.showCorr) aside += '<div class="cor"><b>Corrected IOP</b> (for corneal thickness)<br>RE ' + iopText(e.od.corr) + (has(e.od.corr) ? ' mmHg' : '') + (has(e.od.cct) ? ' · CCT ' + esc(e.od.cct) + ' µm' : '') + '<br>LE ' + iopText(e.os.corr) + (has(e.os.corr) ? ' mmHg' : '') + (has(e.os.cct) ? ' · CCT ' + esc(e.os.cct) + ' µm' : '') + '</div>';
      }
      if (e.showGL) aside += '<h3>Glasses prescription</h3><table class="t"><tr><th></th><th>Sph</th><th>Cyl</th><th>Axis</th><th>Add</th></tr>'
        + '<tr><td>RE</td><td>' + val(e.od.sph) + '</td><td>' + val(e.od.cyl) + '</td><td>' + val(e.od.ax) + '</td><td>' + val(e.od.add) + '</td></tr>'
        + '<tr><td>LE</td><td>' + val(e.os.sph) + '</td><td>' + val(e.os.cyl) + '</td><td>' + val(e.os.ax) + '</td><td>' + val(e.os.add) + '</td></tr></table>'
        + (has(e.ipd) ? '<div class="note">PD ' + esc(e.ipd) + ' mm</div>' : '');
    } else if (c.dept === 'obg') {
      var pr = obgPresent(c);
      if (pr) {
        aside += '<h3>Present pregnancy</h3>';
        if (has(pr.gaDates) || has(pr.gaUsg)) aside += '<div class="ga"><b>' + esc(pr.gaDates || pr.gaUsg) + '</b><span>' + (has(pr.gaDates) ? 'by dates' : 'by USG') + (has(pr.gaDates) && has(pr.gaUsg) ? ' · ' + esc(pr.gaUsg) + ' by USG' : '') + '</span></div>';
        aside += '<div class="gpal"><div><b>' + val(pr.g) + '</b>G</div><div><b>' + val(pr.p) + '</b>P</div><div><b>' + val(pr.a) + '</b>A</div><div><b>' + val(pr.l) + '</b>L</div></div>';
        var kv = [['LMP', pr.lmp], ['EDD (dates)', pr.eddDates], ['EDD (USG)', pr.eddUsg]].filter(function (r) { return has(r[1]); });
        if (kv.length) aside += '<table class="kv" style="margin-top:5px">' + kv.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</table>';
      }
      var vit = (c.obg && c.obg.vitals || []).filter(function (r) { return r[0] !== 'LMP'; });
      if (vit.length) aside += '<h3>Vitals</h3><div class="vit">' + vit.map(function (r) { return '<div>' + esc(r[0]) + '<b>' + esc(r[1]) + '</b></div>'; }).join('') + '</div>';
      var anc = [['Hb', c.obg && c.obg.hb], ['Blood group', c.obg && c.obg.bloodGroup]].filter(function (r) { return has(r[1]); });
      if (anc.length) aside += '<h3>ANC record</h3><table class="kv">' + anc.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</table>';
    }
    var cc = listLines(c.complaint);
    if (cc.length) main += '<h3>Chief complaints</h3><ul class="p">' + cc.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (c.dept === 'obg' && c.obg && c.obg.history.length) main += '<h3>Obstetric history</h3><div class="hx">' + c.obg.history.map(function (h) { return '<div><b>' + esc(h.label) + ':</b> ' + esc(h.text) + '</div>'; }).join('') + '</div>';
    if (c.findings.length) main += '<h3>' + esc(c.findingsTitle || 'Positive findings') + '</h3><ul class="p">' + c.findings.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (c.procDone) main += '<h3>Procedure done</h3><div style="font-size:9.4pt">' + esc(c.procDone) + '</div>';
    if (c.dx.length) main += '<h3>Diagnosis</h3><div class="dx">' + c.dx.map(function (x) { return '<div>' + esc(x) + '</div>'; }).join('') + '</div>';
    if (c.drugs.length) {
      main += '<div class="rx">℞</div>' + c.drugs.map(function (d, i) {
        var st = steps(d), r = totalRange(d);
        var gen = F.rxDrugGenericName(d);
        var html = '<div class="med"><div class="n">' + (i + 1) + '</div><div class="b">' + esc(tradeLine(d)) + (st.length ? ' <span style="font-size:8.4pt;color:var(--teal)">· TAPER</span>' : '') + '</div>'
          + '<div class="d">' + esc(totalDur(d, 'en')) + '<small>' + fmtRange(r.from, r.to) + '</small>' + (L ? '<span class="loc">' + esc(totalDur(d, lang)) + '</span>' : '') + '</div>'
          + (gen ? '<div class="g">' + esc(gen) + '</div>' : '')
          + '<div class="h">' + esc(st.length ? shortInstruction(d, 'en').replace(/,[^,]*$/, '') + ' — reduce step by step' : shortInstruction(d, 'en')) + '</div>'
          + (L ? '<div class="l loc">' + esc(st.length ? shortInstruction(d, lang).replace(/,[^,]*$/, '') + ' — ' + L.taper : shortInstruction(d, lang)) + '</div>' : '');
        if (st.length) html += '<div class="taper">' + st.map(function (s) { return '<div><b>' + esc(freqShort(s.freq, 'en')) + '</b><span>' + fmtRangeShort(s.dateFrom, s.dateTo) + '</span>' + (L ? '<em class="loc">' + esc(freqShort(s.freq, lang)) + '</em>' : '') + '</div>'; }).join('') + '</div>';
        return html + '</div>';
      }).join('');
    } else if (c.rxEmpty) main += '<div style="margin-top:3mm;font-size:9.4pt;color:var(--muted)">' + c.rxEmpty + '</div>';
    if (c.procedures.length) main += '<h3>Procedures advised</h3><div style="font-size:9.3pt">' + c.procedures.map(esc).join(' · ') + '</div>';
    if (c.investigations.length) main += '<h3>Investigations advised</h3><div style="font-size:9.3pt">' + c.investigations.map(esc).join(' · ') + '</div>';
    var adv = adviceLines(c);
    if (adv.length) main += '<h3>Advice</h3><ul class="adv">' + adv.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (c.warning) main += '<div class="warn">' + c.warning + '</div>';
    var foot = '<div>' + (c.followUp ? '<span class="fu">Next visit: ' + esc(c.followUp) + (L ? ' · <span class="loc">' + L.next + '</span>' : '') + '</span>' : '') + '</div>' + signature(c, 'right');
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Prescription</title>' + fontLinks(lang) + '<style>' + css + GREY + '</style></head><body><div class="page"><div class="top">' + header(c) + '</div><aside>' + aside + '</aside><main>' + main + '</main><div class="foot">' + foot + '</div></div></body></html>';
  }

  // ═════════════════════ Design B — Card ═════════════════════
  function designB(c) {
    var lang = c.lang, L = langLabel(lang), loc = localFont(lang);
    var css = ':root{--ink:#111;--indigo:#222;--soft:#f2f2f2;--line:#d4d4d4;--muted:#555;--amber:#888;--rose:#111}*{box-sizing:border-box}'
      + 'body{margin:0;background:#fff;font-family:Manrope,Arial,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:0}'
      + '.loc{font-family:' + loc + '}.page{width:210mm;min-height:297mm;padding:6mm 10mm 7mm;display:flex;flex-direction:column}.lh img{width:100%;display:block}.lh-text{font-size:18pt;font-weight:800;color:var(--indigo)}'
      + '.pt{margin-top:2mm;background:#ececec;color:#111;border:1.5px solid #bbb;border-radius:10px;padding:8px 14px;display:flex;justify-content:space-between;align-items:center}.pt .nm{font-size:14pt;font-weight:800}.pt .mt{font-size:8.6pt;opacity:.92;text-align:right;line-height:1.5}'
      + '.eyes{margin-top:3mm;display:grid;grid-template-columns:1fr 1fr;gap:3mm}.eye{border:1.5px solid var(--line);border-radius:10px;overflow:hidden}.eye h4{margin:0;background:var(--soft);padding:5px 10px;font-size:8.8pt;font-weight:800;display:flex;justify-content:space-between}.eye h4 em{font-style:normal;color:var(--indigo)}'
      + '.grid{display:grid;grid-auto-flow:column;grid-auto-columns:1fr}.grid div{padding:5px 4px;text-align:center;border-right:1px solid var(--line)}.grid div:last-child{border-right:0}.grid small{display:block;font-size:6.8pt;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}.grid b{font-size:11.5pt;font-weight:800}'
      + '.spec{border-top:1px solid var(--line);display:grid;grid-template-columns:repeat(4,1fr);background:#fafafa}.spec div{padding:4px;text-align:center;font-size:9.6pt;font-weight:600}.spec small{display:block;font-size:6.8pt;color:var(--muted)}'
      + '.legend{font-size:7.6pt;color:var(--muted);margin-top:2px}.legend b{color:var(--indigo)}'
      + '.dash{margin-top:3mm;display:grid;grid-template-columns:1.2fr 1.2fr 1fr 1fr;gap:3mm}.card{border:1.5px solid var(--line);border-radius:10px;padding:6px 10px}.card small{display:block;font-size:6.8pt;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);font-weight:600}'
      + '.card b{font-size:13pt;font-weight:800;display:block;line-height:1.2}.card span{font-size:7.8pt;color:var(--muted)}.card.hl{background:var(--soft);border-color:var(--indigo)}.card.hl b{color:var(--indigo)}'
      + '.vit{margin-top:3mm;display:grid;grid-auto-flow:column;grid-auto-columns:1fr;border:1.5px solid var(--line);border-radius:10px;overflow:hidden}.vit div{padding:4px;text-align:center;border-right:1px solid var(--line);font-size:6.8pt;color:var(--muted);text-transform:uppercase}.vit div:last-child{border-right:0}.vit b{display:block;font-size:10pt;color:var(--ink);text-transform:none}'
      + '.two{margin-top:3mm;display:grid;grid-template-columns:1fr 1fr;gap:3mm}.box{background:var(--soft);border-radius:10px;padding:7px 11px}.box h5{margin:0 0 3px;font-size:7.4pt;text-transform:uppercase;letter-spacing:1px;color:var(--indigo)}.box p{margin:0;font-size:9.2pt;line-height:1.5}'
      + '.cap{font-size:7.4pt;text-transform:uppercase;letter-spacing:1px;color:var(--indigo);font-weight:800;margin-top:3mm}table.hx{width:100%;border-collapse:collapse;font-size:8.6pt;margin-top:1mm}table.hx td{padding:3px 6px;border-bottom:1px solid var(--line)}table.hx td:first-child{font-weight:800;color:var(--indigo);white-space:nowrap}'
      + '.dx{margin-top:2.5mm;font-size:10.2pt;font-weight:800}.dx span{color:var(--indigo);font-size:7.4pt;text-transform:uppercase;letter-spacing:1px;margin-right:6px}'
      + 'table.rx{width:100%;border-collapse:collapse;margin-top:2.5mm;font-size:9.2pt}table.rx th{font-size:7.2pt;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);text-align:left;padding:4px 6px;border-bottom:2px solid var(--indigo)}'
      + 'table.rx td{padding:5px 6px;border-bottom:1px solid var(--line);vertical-align:top}table.rx tr{break-inside:avoid}table.rx .b{font-weight:800;font-size:10.2pt}table.rx .g{font-size:8.2pt;color:var(--muted)}table.rx .l{font-size:9pt;color:var(--indigo)}'
      + '.dot{display:inline-block;width:14px;height:14px;border-radius:50%;border:1.6px solid var(--indigo);margin-right:3px;vertical-align:middle}.dot.on{background:var(--indigo)}.dot.night.on{background:var(--amber);border-color:var(--amber)}'
      + '.dates{font-size:7.8pt;color:var(--muted)}.sos{font-size:8.4pt;font-weight:800;color:var(--indigo)}.eyetag{display:inline-block;padding:1px 7px;border-radius:10px;font-size:8pt;font-weight:800;background:#e6e6e6;color:var(--indigo)}'
      + '.tst{display:inline-block;background:var(--soft);border-radius:6px;padding:2px 7px;font-size:8.2pt;margin:2px 0;white-space:nowrap}.tst b{color:var(--indigo)}'
      + '.warn{margin-top:2.5mm;border:1.5px solid var(--rose);border-radius:8px;padding:5px 9px;font-size:8.6pt;line-height:1.45}.warn b{color:var(--rose)}'
      + '.bottom{margin-top:auto;padding-top:3mm;display:grid;grid-template-columns:1.4fr 1fr;gap:5mm;align-items:end}.adv{font-size:8.8pt;line-height:1.5}.adv b{color:var(--indigo)}'
      + '.fu{margin-top:5px;display:inline-block;border:2px solid var(--indigo);border-radius:8px;padding:5px 10px;font-weight:800;font-size:9.6pt}'
      + '.sig{font-size:8pt}.sig-line{border-top:1.5px solid var(--ink);padding-top:3px;margin-top:10mm;font-size:9.5pt}.sig-sub{color:var(--muted)}';
    var p = c.patient, h = header(c);
    h += '<div class="pt"><div class="nm">' + esc(p.name) + ' <span style="font-weight:600;font-size:10pt;opacity:.85">· ' + esc(p.ageSex) + '</span></div><div class="mt">' + esc(p.id) + '<br>' + esc(p.date) + (p.centre ? ' · ' + esc(p.centre) : '') + '</div></div>';
    if (c.dept === 'oe') {
      var e = eyeRows(c);
      var card = function (side, label, code) {
        var cells = [];
        if (e.showVA) { if (has(e.od.ua) || has(e.os.ua)) cells.push(['Unaided', side.ua]); if (has(e.od.bc) || has(e.os.bc)) cells.push(['Best corr.', side.bc]); if (has(e.od.near) || has(e.os.near)) cells.push(['Near', side.near]); }
        if (e.showIOP && (has(e.od.gat) || has(e.os.gat))) cells.push(['IOP GAT', iopText(side.gat)]);
        if (e.showCorr) cells.push(['Corr. IOP', iopText(side.corr)]);
        var html = '<div class="eye"><h4>' + label + ' <em>' + code + '</em></h4>' + (cells.length ? '<div class="grid">' + cells.map(function (x) { return '<div><small>' + x[0] + '</small><b>' + (String(x[1]).indexOf('<') >= 0 ? x[1] : val(x[1])) + '</b></div>'; }).join('') + '</div>' : '');
        if (e.showGL) html += '<div class="spec"><div><small>Sph</small>' + val(side.sph) + '</div><div><small>Cyl</small>' + val(side.cyl) + '</div><div><small>Axis</small>' + val(side.ax) + '</div><div><small>Add</small>' + val(side.add) + '</div></div>';
        return html + '</div>';
      };
      if (e.showVA || e.showIOP || e.showGL) {
        h += '<div class="eyes">' + card(e.od, 'RIGHT EYE', 'RE') + card(e.os, 'LEFT EYE', 'LE') + '</div>';
        var notes = [];
        if (e.showIOP && (has(e.od.gat) || has(e.os.gat))) notes.push('IOP in mmHg by Goldmann applanation (GAT)');
        if (e.showCorr) notes.push('<b>Corrected IOP</b> for corneal thickness' + (has(e.od.cct) || has(e.os.cct) ? ' — CCT RE ' + val(e.od.cct) + ' µm · LE ' + val(e.os.cct) + ' µm' : ''));
        if (e.showGL && has(e.ipd)) notes.push('PD ' + esc(e.ipd) + ' mm');
        if (notes.length) h += '<div class="legend">' + notes.join(' · ') + '</div>';
      }
    } else if (c.dept === 'obg') {
      var pr = obgPresent(c);
      if (pr) {
        var cards = [];
        if (has(pr.gaDates) || has(pr.gaUsg)) cards.push('<div class="card hl"><small>Gestation</small><b>' + val(pr.gaDates || pr.gaUsg) + '</b><span>' + (has(pr.gaDates) ? 'by dates' : 'by USG') + (has(pr.gaDates) && has(pr.gaUsg) ? ' · ' + esc(pr.gaUsg) + ' by USG' : '') + '</span></div>');
        if (has(pr.eddDates) || has(pr.eddUsg)) cards.push('<div class="card hl"><small>EDD</small><b>' + val(pr.eddDates || pr.eddUsg) + '</b><span>' + (has(pr.eddDates) ? 'by dates' : 'by USG') + (has(pr.eddDates) && has(pr.eddUsg) ? ' · ' + esc(pr.eddUsg) + ' by USG' : '') + '</span></div>');
        if (has(pr.lmp)) cards.push('<div class="card"><small>LMP</small><b>' + val(pr.lmp) + '</b></div>');
        cards.push('<div class="card"><small>Obstetric score</small><b>G' + val(pr.g) + ' P' + val(pr.p) + ' A' + val(pr.a) + ' L' + val(pr.l) + '</b></div>');
        h += '<div class="dash" style="grid-template-columns:repeat(' + cards.length + ',1fr)">' + cards.join('') + '</div>';
      }
      var vit = (c.obg && c.obg.vitals || []).filter(function (r) { return r[0] !== 'LMP'; });
      if (c.obg && has(c.obg.hb)) vit.push(['Hb', c.obg.hb]);
      if (vit.length) h += '<div class="vit">' + vit.map(function (r) { return '<div>' + esc(r[0]) + '<b>' + esc(r[1]) + '</b></div>'; }).join('') + '</div>';
    }
    var cc = listLines(c.complaint), boxes = [];
    if (cc.length) boxes.push('<div class="box"><h5>Chief complaints</h5><p>' + cc.map(esc).join('<br>') + '</p></div>');
    if (c.findings.length) boxes.push('<div class="box"><h5>' + esc(c.findingsTitle || 'Positive findings') + '</h5><p>' + c.findings.map(esc).join('<br>') + '</p></div>');
    if (c.procDone) boxes.push('<div class="box"><h5>Procedure done</h5><p>' + esc(c.procDone) + '</p></div>');
    if (c.dept === 'obg' && c.obg && has(c.obg.bloodGroup)) boxes.push('<div class="box"><h5>ANC record</h5><p>Blood group ' + esc(c.obg.bloodGroup) + (has(c.obg.hb) ? ' · Hb ' + esc(c.obg.hb) : '') + '</p></div>');
    if (boxes.length) h += '<div class="two">' + boxes.join('') + '</div>';
    if (c.dept === 'obg' && c.obg && c.obg.history.length) h += '<div class="cap">Obstetric history</div><table class="hx">' + c.obg.history.map(function (x) { return '<tr><td>' + esc(x.label) + '</td><td>' + esc(x.text) + '</td></tr>'; }).join('') + '</table>';
    if (c.dx.length) h += '<div class="dx"><span>Diagnosis</span>' + c.dx.map(esc).join(' · ') + '</div>';
    if (c.drugs.length) {
      var eyeCol = c.dept === 'oe';
      h += '<table class="rx"><tr><th style="width:42%">Medicine' + (L ? ' · <span class="loc">' + L.meds + '</span>' : '') + '</th>' + (eyeCol ? '<th>Eye</th>' : '') + '<th>Morning · Noon · Evening · Night' + (L ? '<br><span class="loc" style="text-transform:none;letter-spacing:0">' + L.times + '</span>' : '') + '</th><th>How long · from → to</th></tr>';
      c.drugs.forEach(function (d) {
        var st = steps(d), r = totalRange(d), gen = F.rxDrugGenericName(d), dt = dots(d);
        var site = F.getRxSiteLabel(d), eyeTag = /OD|Right/i.test(site) ? 'Right' : /OS|Left/i.test(site) ? 'Left' : /OU|Both/i.test(site) ? 'Both' : (site ? esc(String(site).replace(/\(.*\)/, '').trim()) : '');
        var timeCell = dt ? dt.map(function (on, k) { return '<span class="dot' + (k === 3 ? ' night' : '') + (on ? ' on' : '') + '"></span>'; }).join('') + (st.length ? '<div class="dates">first step</div>' : '') : '<span class="sos">' + esc(freqShort(d.freq, 'en')) + '</span>';
        h += '<tr' + (st.length ? ' style="border-bottom:0"' : '') + '><td' + (st.length ? ' style="border-bottom:0"' : '') + '><div class="b">' + esc(tradeLine(d)) + (st.length ? ' <span style="font-size:8pt;color:var(--indigo)">· TAPER</span>' : '') + '</div>'
          + '<div class="g">' + esc([gen, shortInstruction(d, 'en')].filter(Boolean).join(' · ')) + '</div>' + (L ? '<div class="l loc">' + esc(shortInstruction(d, lang)) + '</div>' : '') + '</td>'
          + (eyeCol ? '<td' + (st.length ? ' style="border-bottom:0"' : '') + '>' + (eyeTag ? '<span class="eyetag">' + eyeTag + '</span>' : '') + '</td>' : '')
          + '<td' + (st.length ? ' style="border-bottom:0"' : '') + ' style="white-space:nowrap">' + timeCell + '</td>'
          + '<td' + (st.length ? ' style="border-bottom:0"' : '') + '>' + esc(totalDur(d, 'en')) + (L ? ' <span class="loc" style="color:var(--indigo)">· ' + esc(totalDur(d, lang)) + '</span>' : '') + '<div class="dates">' + fmtRange(r.from, r.to) + '</div></td></tr>';
        if (st.length) h += '<tr><td colspan="' + (eyeCol ? 4 : 3) + '" style="padding-top:0">' + st.map(function (s) { return '<span class="tst"><b>' + esc(freqShort(s.freq, 'en')) + '</b> ' + fmtRangeShort(s.dateFrom, s.dateTo) + '</span>'; }).join(' → ') + '</td></tr>';
      });
      h += '</table>';
    } else if (c.rxEmpty) h += '<div style="margin-top:3mm;font-size:9.4pt;color:var(--muted)">' + c.rxEmpty + '</div>';
    if (c.warning) h += '<div class="warn">' + c.warning + '</div>';
    var adv = adviceLines(c), left = '';
    if (c.procedures.length) left += '<b>Procedures advised:</b> ' + c.procedures.map(esc).join(' · ') + '<br>';
    if (c.investigations.length) left += '<b>Investigations:</b> ' + c.investigations.map(esc).join(' · ') + '<br>';
    if (adv.length) left += '<b>Advice:</b> ' + adv.map(esc).join(' · ') + '<br>';
    if (c.followUp) left += '<span class="fu">Next visit: ' + esc(c.followUp) + (L ? ' · <span class="loc">' + L.next + '</span>' : '') + '</span>';
    h += '<div class="bottom"><div class="adv">' + left + '</div>' + signature(c, 'center') + '</div>';
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Prescription</title>' + fontLinks(lang) + '<style>' + css + GREY + '</style></head><body><div class="page">' + h + '</div></body></html>';
  }

  // ═════════════════════ Design D — Clear Table ═════════════════════
  function designD(c) {
    var lang = c.lang, L = langLabel(lang), loc = localFont(lang);
    var css = ':root{--ink:#111;--green:#222;--pale:#f1f1f1;--line:#d2d2d2;--muted:#555;--rose:#111}*{box-sizing:border-box}'
      + 'body{margin:0;background:#fff;font-family:"IBM Plex Sans",Arial,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:0}'
      + '.loc{font-family:' + loc + '}.mono{font-family:"IBM Plex Mono",monospace}.page{width:210mm;min-height:297mm;padding:6mm 10mm 7mm;display:flex;flex-direction:column}.lh img{width:100%;display:block;margin-bottom:2mm}.lh-text{font-size:17pt;font-weight:700;margin-bottom:2mm}'
      + '.pt{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;border:2px solid var(--ink)}.pt div{padding:5px 10px;border-right:1px solid var(--line);font-size:10pt}.pt div:last-child{border-right:0}.pt small{display:block;font-size:7pt;text-transform:uppercase;letter-spacing:1px;color:var(--muted)}'
      + '.sec{margin-top:2.6mm}.sec h4{margin:0 0 1.6mm;font-size:7.8pt;letter-spacing:1.4px;text-transform:uppercase;display:flex;gap:8px;align-items:center}.sec h4::after{content:"";flex:1;border-top:1px solid var(--ink)}'
      + 'table.d{width:100%;border-collapse:collapse;font-size:9.2pt}table.d th,table.d td{border:1px solid var(--line);padding:3px 6px;text-align:center}table.d th{background:var(--pale);font-weight:600;font-size:7.8pt}table.d .k{background:var(--pale);font-weight:700;text-align:left}table.d.l td{text-align:left}'
      + '.note{font-size:7.8pt;color:var(--muted);margin-top:2px}.cols{display:grid;grid-template-columns:1fr 1fr;gap:6mm;font-size:9.4pt;line-height:1.5}.cols p{margin:0}'
      + '.dx{border:2px solid var(--green);padding:5px 10px;font-weight:700;font-size:10.4pt;color:var(--green)}.dx div+div{margin-top:2px}'
      + '.med{display:grid;grid-template-columns:8mm 1fr 40mm;border-bottom:1px solid var(--line);padding:3px 0;gap:0 6px;break-inside:avoid}.med .n{font-size:13pt;font-weight:700;color:var(--green)}.med .b{font-weight:700;font-size:10.6pt}.med .g{font-size:8.4pt;color:var(--muted)}'
      + '.med .en{font-size:9.3pt;margin-top:1px}.med .l{font-size:9.6pt;color:var(--green)}.med .t{text-align:right;font-size:9pt}.med .t b{display:block;font-size:10.2pt}.med .t small{display:block;color:var(--muted);font-size:8pt}'
      + '.taper{margin-top:3px;border-left:3px solid var(--green);padding-left:7px}.taper div{font-size:8.8pt;line-height:1.5}.taper b{color:var(--green)}'
      + '.warn{margin-top:2.5mm;border:2px solid var(--rose);padding:5px 9px;font-size:8.8pt;line-height:1.45}.warn b{color:var(--rose)}'
      + '.bottom{margin-top:auto;padding-top:3mm;display:grid;grid-template-columns:1fr 64mm;gap:6mm;align-items:end}.adv{font-size:9pt;line-height:1.5}.fu{margin-top:6px;font-weight:700;font-size:14pt;display:block}'
      + '.sig{font-size:8pt}.sig-line{border-top:1.5px solid var(--ink);margin-top:10mm;padding-top:3px;font-size:9.5pt}.sig-sub{color:var(--muted)}';
    var p = c.patient, h = header(c);
    h += '<div class="pt"><div><small>Patient</small><b>' + esc(p.name) + '</b></div><div><small>Age / Sex</small>' + esc(p.ageSex) + '</div><div><small>BMSH ID</small><span class="mono">' + esc(p.id) + '</span></div><div><small>Date</small><span class="mono">' + esc(p.date) + '</span></div></div>';
    var cc = listLines(c.complaint);
    if (c.dept === 'oe') {
      if (cc.length || c.findings.length) h += '<div class="sec"><h4>Complaints &amp; findings</h4><div class="cols">' + (cc.length ? '<p><b>Complaints:</b> ' + cc.map(esc).join(' · ') + '</p>' : '<p></p>') + (c.findings.length ? '<p><b>' + esc(c.findingsTitle || 'Findings') + ':</b> ' + c.findings.map(esc).join(' · ') + '</p>' : '') + '</div></div>';
      var e = eyeRows(c), cols = [];
      if (e.showVA) { if (has(e.od.ua) || has(e.os.ua)) cols.push(['Unaided', 'ua']); if (has(e.od.bc) || has(e.os.bc)) cols.push(['Best corr.', 'bc']); if (has(e.od.near) || has(e.os.near)) cols.push(['Near', 'near']); }
      if (e.showIOP && (has(e.od.gat) || has(e.os.gat))) cols.push(['IOP GAT', 'gat']);
      if (e.showCorr) cols.push(['Corr. IOP', 'corr']);
      if (e.showGL) cols = cols.concat([['Sph', 'sph'], ['Cyl', 'cyl'], ['Axis', 'ax'], ['Add', 'add']]);
      if (cols.length) {
        var cell = function (s, k) { return '<td' + (/sph|cyl|ax|add/.test(k) ? ' class="mono"' : '') + '>' + (k === 'gat' || k === 'corr' ? iopText(s[k]) : val(s[k])) + '</td>'; };
        h += '<div class="sec"><h4>Vision · IOP · Glasses</h4><table class="d"><tr><th></th>' + cols.map(function (x) { return '<th>' + x[0] + '</th>'; }).join('') + '</tr>'
          + '<tr><td class="k">RE</td>' + cols.map(function (x) { return cell(e.od, x[1]); }).join('') + '</tr><tr><td class="k">LE</td>' + cols.map(function (x) { return cell(e.os, x[1]); }).join('') + '</tr></table>';
        var notes = [];
        if (e.showIOP && (has(e.od.gat) || has(e.os.gat))) notes.push('IOP in mmHg by Goldmann applanation (GAT)');
        if (e.showCorr && (has(e.od.cct) || has(e.os.cct))) notes.push('Corrected IOP for corneal thickness: CCT RE ' + val(e.od.cct) + ' µm, LE ' + val(e.os.cct) + ' µm');
        if (e.showGL && has(e.ipd)) notes.push('PD ' + esc(e.ipd) + ' mm');
        h += (notes.length ? '<div class="note">' + notes.join(' · ') + '</div>' : '') + '</div>';
      }
    } else if (c.dept === 'obg') {
      var pr = obgPresent(c);
      if (pr) {
        var pc = [['G P A L', 'G' + (pr.g || 0) + ' P' + (pr.p || 0) + ' A' + (pr.a || 0) + ' L' + (pr.l || 0)], ['LMP', pr.lmp], ['EDD (dates)', pr.eddDates], ['GA (dates)', pr.gaDates], ['EDD (USG)', pr.eddUsg], ['GA (USG)', pr.gaUsg], ['Blood group', c.obg.bloodGroup], ['Hb', c.obg.hb]].filter(function (x) { return has(x[1]); });
        h += '<div class="sec"><h4>Present pregnancy</h4><table class="d"><tr>' + pc.map(function (x) { return '<th>' + x[0] + '</th>'; }).join('') + '</tr><tr>' + pc.map(function (x, i) { return '<td' + (i === 0 || x[0] === 'GA (dates)' ? ' style="font-weight:700"' : '') + '>' + esc(x[1]) + '</td>'; }).join('') + '</tr></table></div>';
      }
      var vit = (c.obg && c.obg.vitals || []).filter(function (r) { return r[0] !== 'LMP'; });
      if (vit.length) h += '<div class="sec"><h4>Vitals</h4><table class="d"><tr>' + vit.map(function (r) { return '<th>' + esc(r[0]) + '</th>'; }).join('') + '</tr><tr>' + vit.map(function (r) { return '<td>' + esc(r[1]) + '</td>'; }).join('') + '</tr></table></div>';
      if (c.obg && c.obg.history.length) h += '<div class="sec"><h4>Obstetric history</h4><table class="d l">' + c.obg.history.map(function (x) { return '<tr><td class="k" style="width:28mm">' + esc(x.label) + '</td><td>' + esc(x.text) + '</td></tr>'; }).join('') + '</table></div>';
      if (cc.length) h += '<div class="sec"><h4>Complaints</h4><div style="font-size:9.4pt">' + cc.map(esc).join(' · ') + '</div></div>';
    } else if (cc.length || c.findings.length) {
      h += '<div class="sec"><h4>Complaints' + (c.findings.length ? ' &amp; findings' : '') + '</h4><div class="cols">' + (cc.length ? '<p><b>Complaints:</b> ' + cc.map(esc).join(' · ') + '</p>' : '<p></p>') + (c.findings.length ? '<p><b>' + esc(c.findingsTitle || 'Findings') + ':</b> ' + c.findings.map(esc).join(' · ') + '</p>' : '') + '</div></div>';
    }
    if (c.procDone) h += '<div class="sec"><h4>Procedure done</h4><div style="font-size:9.4pt">' + esc(c.procDone) + '</div></div>';
    if (c.dx.length) h += '<div class="sec"><h4>Diagnosis</h4><div class="dx">' + c.dx.map(function (x) { return '<div>' + esc(x) + '</div>'; }).join('') + '</div></div>';
    if (c.drugs.length) {
      h += '<div class="sec"><h4>Medicines' + (L ? ' · <span class="loc">' + L.meds + '</span>' : '') + '</h4>' + c.drugs.map(function (d, i) {
        var st = steps(d), r = totalRange(d), gen = F.rxDrugGenericName(d);
        var body = '<div class="b">' + esc(tradeLine(d)) + (st.length ? ' · <span style="color:var(--green)">TAPER</span>' : '') + '</div>' + (gen ? '<div class="g">' + esc(gen) + '</div>' : '')
          + '<div class="en">' + esc(st.length ? shortInstruction(d, 'en').replace(/,[^,]*$/, '') + ' — reduce step by step' : shortInstruction(d, 'en')) + '</div>'
          + (L ? '<div class="l loc">' + esc(st.length ? shortInstruction(d, lang).replace(/,[^,]*$/, '') + ' — ' + L.taper : shortInstruction(d, lang)) + '</div>' : '');
        if (st.length) body += '<div class="taper">' + st.map(function (s) { return '<div><b>' + esc(freqShort(s.freq, 'en')) + '</b> · ' + fmtRangeShort(s.dateFrom, s.dateTo) + (L ? ' · <span class="loc">' + esc(freqShort(s.freq, lang)) + '</span>' : '') + '</div>'; }).join('') + '</div>';
        return '<div class="med"><div class="n">' + (i + 1) + '</div><div>' + body + '</div><div class="t"><b>' + esc(totalDur(d, 'en')) + '</b><small>' + fmtRange(r.from, r.to) + '</small>' + (L ? '<span class="loc" style="color:var(--green)">' + esc(totalDur(d, lang)) + '</span>' : '') + '</div></div>';
      }).join('') + '</div>';
    } else if (c.rxEmpty) h += '<div class="sec" style="font-size:9.4pt;color:var(--muted)">' + c.rxEmpty + '</div>';
    if (c.warning) h += '<div class="warn">' + c.warning + '</div>';
    var adv = adviceLines(c), left = '';
    if (c.procedures.length) left += '<b>Procedures advised:</b> ' + c.procedures.map(esc).join(' · ') + '<br>';
    if (c.investigations.length) left += '<b>Investigations:</b> ' + c.investigations.map(esc).join(' · ') + '<br>';
    if (adv.length) left += '<b>Advice:</b> ' + adv.map(esc).join(' · ');
    if (c.followUp) left += '<span class="fu">Next visit: ' + esc(c.followUp) + (L ? ' · <span class="loc">' + L.next + '</span>' : '') + '</span>';
    h += '<div class="bottom"><div class="adv">' + left + '</div>' + signature(c, 'center') + '</div>';
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Prescription</title>' + fontLinks(lang) + '<style>' + css + GREY + '</style></head><body><div class="page">' + h + '</div></body></html>';
  }

  // Sample (for the Settings → Doctors preview only)
  window.bmhBuildNewRxDesignSample = function (key, doctor, headerSrc) {
    var t = new Date(), iso = function (dd) { var x = new Date(t.getTime() + dd * 864e5); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); };
    return window.bmhBuildNewRxDesign({
      design: key, dept: 'oe', lang: 'hi', headerSrc: headerSrc,
      patient: { name: 'Sample Patient', id: 'BMSH-000000', ageSex: '60Y / F', date: fmtDay(iso(0)) },
      doctor: doctor || {},
      complaint: 'Blurred vision right eye x 3 months', findings: ['RE NS2 cataract', 'LE pseudophakia'],
      eye: { showVA: true, showIOP: true, showGL: true, showCorrectedIOP: true, vaOD: '6/24', vaOS: '6/9', subjODva: '6/12', subjOSva: '6/6', nvOD: 'N8', nvOS: 'N6',
        iopGatOD: '16', iopGatOS: '15', iopCorrOD: '18', iopCorrOS: '15', pachyOD: '520', pachyOS: '545', rfODSph: '-0.75', rfODCyl: '-0.50', rfODAx: '90', rfOSSph: '-0.25', rfOSCyl: '-0.50', rfOSAx: '85', addOD: '+2.50', addOS: '+2.50', ipdVal: '62' },
      dx: ['Cataract RE', 'Pseudophakia LE'],
      drugs: [
        { trade: 'Refresh Tears', generic: 'Carboxymethylcellulose 0.5%', drugType: 'Eye Drop', eye: 'Both Eyes (OU)', freq: 'Four times daily (QID)', dur: '1 month', dateFrom: iso(0), dateTo: iso(29) },
        { trade: 'Pred Forte', generic: 'Prednisolone acetate 1%', drugType: 'Eye Drop', eye: 'Left Eye (OS)', freq: 'Four times daily (QID)', dur: '1 week', dateFrom: iso(0), dateTo: iso(6),
          taperRows: [{ freq: 'Three times daily (TDS)', dur: '1 week', dateFrom: iso(7), dateTo: iso(13) }, { freq: 'Twice daily (BD)', dur: '1 week', dateFrom: iso(14), dateTo: iso(20) }, { freq: 'Once daily (OD)', dur: '1 week', dateFrom: iso(21), dateTo: iso(27) }] }
      ],
      investigations: ['CBC', 'RFT'], advice: 'Do not rub the eyes', followUp: fmtDay(iso(7))
    });
  };

  window.BMH_RX_NEW_DESIGN_KEYS = KEYS;
  window.bmhBuildNewRxDesign = function (c) {
    if (!c || KEYS.indexOf(c.design) < 0 || ['oe', 'obg', 'psych', 'skin'].indexOf(c.dept) < 0) return '';
    c.lang = c.lang === 'hi' || c.lang === 'pa' ? c.lang : 'en';
    c.findings = c.findings || []; c.dx = c.dx || []; c.drugs = c.drugs || []; c.procedures = c.procedures || []; c.investigations = c.investigations || [];
    if (c.obg) c.obg.history = c.obg.history || [];
    if (c.design === 'split_chart') return designA(c);
    if (c.design === 'eye_card') return designB(c);
    return designD(c);
  };
})();
