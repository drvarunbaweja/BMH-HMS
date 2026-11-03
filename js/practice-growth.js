/* BMH — Practice Growth (Reports → 🚀 Practice Growth)
 * Add-on, visible only on Dr Varun Baweja's admin login.
 * Reads transactions/<day> (through the Bills & History cache when present), otCases,
 * procedureFollowups, payRequests, iolCatalog and practiceGrowth/*. PIN-locked (15 minutes).
 * Writes ONLY when you press a button: "Mark OT completed"/"Undo" (otCases/<id> status fields +
 * practiceGrowth/otMarks), "✏️ amount" (practiceGrowth/amounts) and the PIN (practiceGrowth/pin).
 * Nothing is read until "Show report" is pressed. Tick-box choices are kept in this browser only.
 * Off switch (this browser): localStorage.setItem('bmh_disable_practice_growth','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_disable_practice_growth') === '1') return; } catch (e) {}

  var G = { data: null, loading: null, last: null };
  var DEPTS = [['ophtho', 'Eye'], ['obg', 'OBG'], ['psych', 'Neuropsych'], ['skin', 'Skin']];
  var STREAMS = [
    ['opd', 'OPD consultations'], ['surgery', 'Surgeries / packages'], ['investigation', 'Investigations'],
    ['minor', 'Minor procedures'], ['injection', 'Injections (IVT)'], ['advance', 'Advances on account'], ['other', 'Other']
  ];

  // ── small helpers ─────────────────────────────────────────────────────────
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function money(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function num(n) { return Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function pct(a, b) { return b ? Math.round(a * 1000 / b) / 10 : null; }
  function pctTxt(a, b) { var p = pct(a, b); return p == null ? '–' : p + '%'; }
  function dayOf(v) { try { return localDateKey(v); } catch (e) { return String(v || '').slice(0, 10); } }
  function todayKey_() { try { return todayKey(); } catch (e) { return dayOf(new Date()); } }
  function dbUrl() { try { return window.firebase.app().options.databaseURL.replace(/\/$/, ''); } catch (e) { return 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app'; } }
  function getJson(path, ms) {
    var p = fetch(dbUrl() + path).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
    return Promise.race([p, new Promise(function (_, rej) { setTimeout(function () { rej(new Error('timeout')); }, ms || 30000); })]);
  }
  function monthName(m) { var p = m.split('-'); return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(p[1]) - 1] + ' ' + p[0].slice(2); }
  function addMonth(m, n) { var p = m.split('-'); var d = new Date(Number(p[0]), Number(p[1]) - 1 + n, 1); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
  function monthsBetween(a, b) { var out = []; var m = a; var guard = 0; while (m <= b && guard++ < 120) { out.push(m); m = addMonth(m, 1); } return out; }
  function daysInMonth(m) { var p = m.split('-'); return new Date(Number(p[0]), Number(p[1]), 0).getDate(); }
  function shiftDay(d, n) { var x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return dayOf(x); }
  function deptKey(v) {
    var s = String(v || '').toLowerCase();
    if (/oph|eye/.test(s)) return 'ophtho';
    if (/obg|gyn|obst/.test(s)) return 'obg';
    if (/psych|neuro/.test(s)) return 'psych';
    if (/skin|derm|cosm/.test(s)) return 'skin';
    return '';
  }
  function centreKey(v) { var s = String(v || '').toUpperCase(); if (/CHD|CHANDI/.test(s)) return 'CHD'; if (/RPR|ROPAR|RUPNAGAR/.test(s)) return 'RPR'; return ''; }

  // ── who may see it ────────────────────────────────────────────────────────
  function allowed() {
    var u = window.CURRENT_USER || (typeof CURRENT_USER !== 'undefined' ? CURRENT_USER : null);
    if (!u) return false;
    var uname = String(u.username || '').toLowerCase().split('@')[0];
    var admin = u.isAdmin === true || String(u.role || '').toLowerCase() === 'admin';
    return admin && (uname === 'drvarun' || /varun/i.test(String(u.name || '')));
  }

  // ── classification of money received ─────────────────────────────────────
  var RX = {
    adjust: /^advance used|advance[\s-]*adjust/i,
    injection: /avastin|bevacizumab|ranibizumab|accentrix|razumab|aflibercept|eylea|ozurdex|intravitreal|\bivt\b|anti[\s-]*v\s*e\s*g\s*f|faricimab|vabysmo|triamcinolone|brolucizumab|pagenax/i,
    minor: /\byag\b|capsulotomy|iridotomy|\blpi\b|\bprp\b|barrage|photocoagul|foreign\s*body|\bfb\b|epilat|syring|lasik\s*work|suture\s*removal|chalazion|punctoplast|probing|incision\s*(and|&)\s*(curettage|drainage)|\bi\s*&\s*[cd]\b|cauter|botox|chemical\s*peel|\bpeel\b|microneedl|cryo|copper\s*t|\bcu[\s-]*t\b|iucd|mirena|pap\s*smear|biopsy|dressing|laser\s*hair|prp\s*(therapy|treatment)|bandage\s*contact|\bbcl\b|plug|therapy\s*session|counsell?ing|\bect\b|\br?tms\b/i,
    investigation: /\boct\b|\bhvf\b|visual\s*field|perimetr|topograph|pentacam|biometr|iol\s*master|a[\s-]*scan|b[\s-]*scan|fundus\s*(photo|exam)|\bffa\b|angiograph|pachy|specular|\berg\b|\bvep\b|\beeg\b|\becg\b|\busg\b|ultrasound|sonograph|\bncs\b|\bemg\b|\bcbc\b|blood|urine|\blab\b|thyroid|lipid|sugar|glaucoma\s*work|investigation|gonioscop|schirmer|tbut|dry\s*eye\s*(test|eval)|\bnst\b|\bctg\b|psychometr|\biq\b|mmse|\bmri\b|\bct\s*scan|x[\s-]*ray|\btests?\b/i,
    surgery: /\biol\b|implant|cataract|pmics|phaco|\bsics\b|surgery|surgical|\bicl\b|collamer|vitrectomy|\bppv\b|squint|strabism|trab|keratoplast|pterygium|\bdcr\b|ptosis|entropion|ectropion|lscs|caesar|cesar|delivery|\bnvd\b|\bmtp\b|termination|hysterect|\bd\s*&\s*c\b|dilatation|laparo|hydrus|istent|ahmed|\bot\b|o\.t\.|anaesth|anesth|package|lasik|smile|\bprk\b|\brle\b|lens\s*exchange|cross[\s-]*link|\bc3r\b|buckl|silicone\s*oil|\bsoi\b|macular\s*hole|membrane\s*peel/i,
    opd: /consult|follow[\s-]*up|registration|cross[\s-]*ref|review|post[\s-]*op|\bopd\b|check\s*in/i
  };
  function classifyText(text, txn, amount) {
    var s = String(text || '');
    if (RX.injection.test(s)) return 'injection';
    if (/lasik\s*work/i.test(s)) return 'minor';
    if (RX.investigation.test(s) && !/\b(pmics|cataract|implantation)\b/i.test(s)) return 'investigation';
    if (RX.minor.test(s)) return 'minor';
    if (RX.surgery.test(s)) return 'surgery';
    if (RX.opd.test(s)) return 'opd';
    var cats = txn && txn.billCats ? (Array.isArray(txn.billCats) ? txn.billCats : Object.values(txn.billCats)) : [];
    cats = cats.map(function (c) { return String(c || '').toLowerCase(); });
    if (cats.indexOf('surgery') >= 0) return 'surgery';
    if (cats.indexOf('diagnostic') >= 0) return 'investigation';
    if (cats.indexOf('consultation') >= 0) return 'opd';
    if (/^(billing payment|bill\b)/i.test(s) && amount >= 10000) return 'surgery';
    return 'other';
  }
  // Splits one transaction into [{stream, label, amount}]
  function txnLines(t) {
    var amount = Number(t.amount || 0);
    var type = String(t.type || '').toLowerCase();
    var svc = String(t.service || t.for || t.desc || '').replace(/\s+/g, ' ').trim();
    if (t.collected === false || type === 'advance-adjustment' || String(t.source || '') === 'advance-adjustment' || RX.adjust.test(svc)) return [];
    if (type === 'advance' || /^advance\b/i.test(svc) || /^surgery advance/i.test(svc)) {
      var isSurg = /surg|pmics|cataract|lscs|caesar|deliver|nvd|package|iol|vitrect|icl|lens|phaco|mtp/i.test(svc);
      return [{ stream: isSurg ? 'surgery' : 'advance', label: isSurg ? 'Surgery advance' : 'Advance on account', amount: amount }];
    }
    var allocs = Array.isArray(t.chargeAllocations) ? t.chargeAllocations : (t.chargeAllocations && typeof t.chargeAllocations === 'object' ? Object.values(t.chargeAllocations) : []);
    allocs = allocs.filter(function (a) { return a && Number(a.amount || 0) !== 0; });
    var allocSum = allocs.reduce(function (s, a) { return s + Number(a.amount || 0); }, 0);
    if (allocs.length && Math.abs(allocSum - amount) < 1) {
      return allocs.map(function (a) {
        var d = String(a.desc || svc || '').trim();
        var st = classifyText(d, t, Number(a.amount || 0));
        if (st === 'other') st = classifyText(svc, t, Number(a.amount || 0));
        return { stream: st, label: d, amount: Number(a.amount || 0) };
      });
    }
    return [{ stream: classifyText(svc, t, amount), label: svc || 'Payment', amount: amount }];
  }
  function cleanLabel(s) {
    var x = String(s || '').replace(/\s*\((no fee|both eyes|ou|od|os)\)\s*/ig, ' ').replace(/\s+(right|left|both)\s+eyes?\b.*$/i, '').replace(/\s+/g, ' ').trim();
    if (!x) return 'Unnamed';
    return x.charAt(0).toUpperCase() + x.slice(1);
  }
  function itemFamily(label, stream) {
    var s = String(label || '').toLowerCase();
    if (stream === 'investigation') {
      if (/\boct\b/.test(s) && /rnfl|disc|glauc/.test(s)) return 'OCT (RNFL / disc)';
      if (/\boct\b/.test(s)) return 'OCT (macula)';
      if (/hvf|visual field|perimetr/.test(s)) return 'Visual fields (HVF)';
      if (/glaucoma work/.test(s)) return 'Glaucoma work-up';
      if (/topograph|pentacam/.test(s)) return 'Corneal topography';
      if (/biometr|iol master|a[\s-]*scan/.test(s)) return 'Biometry / IOL Master';
      if (/b[\s-]*scan/.test(s)) return 'B-scan';
      if (/fundus/.test(s)) return 'Fundus examination / photo';
      if (/\beeg\b/.test(s)) return 'EEG';
      if (/\berg\b|\bvep\b/.test(s)) return 'ERG / VEP';
      if (/usg|ultrasound|sonograph|nst|ctg/.test(s)) return 'Ultrasound / NST';
      if (/specular|pachy/.test(s)) return 'Pachymetry / specular';
      return cleanLabel(label);
    }
    if (stream === 'minor') {
      if (/yag|capsulotomy/.test(s)) return 'YAG capsulotomy';
      if (/iridotomy|\blpi\b/.test(s)) return 'Laser iridotomy';
      if (/prp|barrage|photocoag/.test(s)) return 'Retinal laser (PRP / barrage)';
      if (/foreign body|\bfb\b/.test(s)) return 'Foreign body removal';
      if (/lasik work/.test(s)) return 'LASIK work-up';
      if (/chalazion|i\s*&\s*c|incision/.test(s)) return 'Chalazion I&C';
      if (/punctoplast/.test(s)) return 'Punctoplasty';
      if (/epilat/.test(s)) return 'Epilation';
      if (/syring|probing/.test(s)) return 'Syringing / probing';
      if (/copper|cu[\s-]*t|iucd/.test(s)) return 'Copper-T insertion';
      if (/mirena/.test(s)) return 'Mirena insertion';
      return cleanLabel(label);
    }
    if (stream === 'injection') {
      if (/avastin|bevaciz/.test(s)) return 'Bevacizumab (Avastin)';
      if (/raniz|accentrix|razumab/.test(s)) return 'Ranibizumab';
      if (/aflibercept|eylea|pagenax/.test(s)) return 'Aflibercept';
      if (/ozurdex/.test(s)) return 'Ozurdex';
      if (/faricimab|vabysmo/.test(s)) return 'Faricimab';
      return 'Intravitreal injection (other)';
    }
    return cleanLabel(label);
  }

  // ── surgeries (completed OT entries only) ─────────────────────────────────
  function otDone(c) { var s = String(c.status || '').toLowerCase(); return s === 'completed' || s === 'done'; }
  function surgeryGroup(proc, hasIol, dept) {
    var s = String(proc || '').toLowerCase();
    if (dept === 'obg' || /lscs|caesar|cesar|delivery|\bnvd\b|mtp|termination|hysterect|d\s*&\s*c|laparo|cerclage|tubectomy|ligation/.test(s)) {
      if (/lscs|caesar|cesar/.test(s)) return 'LSCS / Caesarean';
      if (/delivery|nvd/.test(s)) return 'Normal delivery';
      if (/mtp|termination/.test(s)) return 'MTP';
      return 'Other OBG procedure';
    }
    if (/icl|collamer|lasik|smile|\bprk\b|refractive/.test(s)) return 'ICL / refractive';
    if (/intravitreal|\bivt\b|anti[\s-]*v\s*e\s*g\s*f|avastin|ranibiz|ozurdex|aflibercept|injection/.test(s)) return 'Intravitreal injection';
    if (/vitrectomy|\bppv\b|buckl|macular hole|retina|silicone oil|\bsoi\b|membrane/.test(s)) return 'Vitreo-retina';
    if (/trab|glaucoma|hydrus|istent|ahmed|valve|migs|stent/.test(s)) return 'Glaucoma';
    if (/cataract|pmics|phaco|sics|\biol\b|lens exchange|\brle\b/.test(s) || hasIol) return 'Cataract (IOL)';
    if (/pterygium|kerato|cornea|tattoo|tallo|cross[\s-]*link/.test(s)) return 'Cornea / pterygium';
    if (/squint|strabism/.test(s)) return 'Squint';
    if (/chalazion|punctoplast|dcr|ptosis|entropion|ectropion|lid|oculoplast|probing/.test(s)) return 'Lids / oculoplasty';
    return 'Other eye procedure';
  }
  function hasRealIol(c) {
    var v = String(c.iolType || c.iol || '').trim();
    return !!v && !/^(n\/?a|—|-|none|nil|na|0)$/i.test(v);
  }
  function normKey(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function iolName(c, catalog) {
    var raw = String(hasRealIol(c) ? (c.iolType && !/^(—|-)$/.test(String(c.iolType).trim()) ? c.iolType : c.iol) : '').trim();
    if (!raw) return null;
    var base = raw.replace(/\s*[+-]\s*\d+(\.\d+)?\s*D?\b.*$/i, '').replace(/\s+\d+(\.\d+)?\s*D\b.*$/i, '').trim() || raw;
    var nk = normKey(base);
    var best = null;
    (catalog || []).forEach(function (it) { if (normKey(it.name) === nk) best = it; });
    if (!best) {
      (catalog || []).forEach(function (it) {
        var ck = normKey(it.name);
        if (ck.length >= 3 && nk.indexOf(ck) === 0 && (!best || ck.length > normKey(best.name).length)) best = it;
      });
    }
    if (best) return { name: best.name, type: best.type || 'Type not set' };
    var pretty = base.replace(/\s+/g, ' ');
    return { name: pretty.charAt(0).toUpperCase() + pretty.slice(1), type: 'Not in IOL catalogue' };
  }
  function iolTier(type, name) {
    var s = (String(type || '') + ' ' + String(name || '')).toLowerCase();
    if (/toric/.test(s)) return 'Toric';
    if (/trifocal|multifocal|edof|extended|lisa|diff|gemetric/.test(s)) return 'Multifocal / trifocal / EDOF';
    if (/premium|preloaded/.test(s)) return 'Premium monofocal';
    if (/hydrophobic/.test(s)) return 'Hydrophobic monofocal';
    if (/monofocal|hydrophilic/.test(s)) return 'Standard monofocal';
    return 'Other / not classified';
  }

  // ── loading (read-only) ───────────────────────────────────────────────────
  function loadTransactions(onStep) {
    var bh = window.bmhBillsHistory;
    if (bh && typeof bh.ensureLoaded === 'function') {
      return bh.ensureLoaded(onStep).then(function () {
        var out = [];
        bh.state.cache.forEach(function (rows, day) { (rows || []).forEach(function (r) { if (r) out.push(Object.assign({ _day: r._day || day }, r)); }); });
        if (out.length) return out;
        return loadTxnsDirect(onStep);
      });
    }
    return loadTxnsDirect(onStep);
  }
  function loadTxnsDirect(onStep) {
    return getJson('/transactions.json?shallow=true').then(function (o) {
      var days = Object.keys(o || {}).filter(function (k) { return /^\d{4}-\d{2}-\d{2}$/.test(k); }).sort();
      var out = [], i = 0, done = 0;
      function worker() {
        if (i >= days.length) return Promise.resolve();
        var d = days[i++];
        return getJson('/transactions/' + d + '.json').then(function (v) {
          Object.keys(v || {}).forEach(function (k) { var r = v[k]; if (r && typeof r === 'object') out.push(Object.assign({ id: r.id || k, _day: d }, r)); });
        }).catch(function () {}).then(function () { done++; if (onStep && done % 20 === 0) onStep(done + ' / ' + days.length + ' days'); return worker(); });
      }
      return Promise.all([0, 1, 2, 3, 4, 5].map(worker)).then(function () { return out; });
    });
  }
  function load(onStep, force) {
    if (G.data && !force) return Promise.resolve(G.data);
    if (G.loading) return G.loading;
    G.loading = Promise.all([
      loadTransactions(onStep),
      getJson('/otCases.json').catch(function () { return {}; }),
      getJson('/procedureFollowups.json').catch(function () { return {}; }),
      getJson('/iolCatalog.json').catch(function () { return []; }),
      getJson('/payRequests.json').catch(function () { return {}; }),
      getJson('/practiceGrowth/amounts.json').catch(function () { return {}; }),
      getJson('/practiceGrowth/otMarks.json').catch(function () { return {}; })
    ]).then(function (r) {
      var cat = r[3]; cat = Array.isArray(cat) ? cat : Object.values(cat || {});
      var obj = function (o, key) { return Object.keys(o || {}).map(function (k) { return Object.assign({}, o[k], key ? { _key: k } : {}); }).filter(function (x) { return x && typeof x === 'object'; }); };
      G.data = { txns: r[0], ot: obj(r[1], true).map(function (c) { if (!c.id) c.id = c._key; return c; }), pf: obj(r[2], true), catalog: cat.filter(function (x) { return x && x.name; }), pr: obj(r[4], true), amounts: r[5] || {}, marks: r[6] || {}, at: new Date() };
      G.recon = reconcile(G.data);
      return G.data;
    }).finally(function () { G.loading = null; });
    return G.loading;
  }

  // ── OT entries checked against bills / cashless claims ────────────────────
  var INS_RX = /echs|cghs|\btpa\b|insur|cashless|ayushman|pmjay|esic?\b|bajaj|star\s*health|hdfc\s*ergo|icici\s*lomb|niva|care\s*health|tata\s*aig|sbi\s*gen|united\s*india|oriental|national\s*insur|new\s*india|reliance\s*gen|cholamandal|medi\s*assist|paramount|vidal|heritage|raksha|ericson|fhpl|md\s*india|good\s*health|park\s*mediclaim|health\s*india|future\s*generali|iffco|universal\s*sompo|royal\s*sundaram|aditya\s*birla|manipal\s*cigna|digit|acko/i;
  var SURG_TXT = /\biol\b|implant|cataract|pmics|phaco|surg|\bicl\b|vitrect|\bppv\b|squint|trab|pterygium|lscs|caesar|deliver|\bnvd\b|\bmtp\b|package|inject|avastin|ranibiz|ozurdex|punctoplast|chalazion|hydrus|kerato|\bot\b/i;
  function isIns(x) { return INS_RX.test(String(x || '')); }
  var ECHS_CATARACT = 14500;
  function caseValue(r) { return r.override != null ? r.override : r.paid + r.claim; }
  function reconcile(data) {
    var today = todayKey_();
    var insPatients = {}, campPatients = {};
    data.txns.forEach(function (t) { if (t.bmhId && /\bcamp\b/i.test(String(t.service || '') + ' ' + String(t.purpose || ''))) campPatients[t.bmhId] = true; });
    data.txns.forEach(function (t) { if (t.bmhId && isIns((t.mode || '') + ' ' + (t.ins || ''))) insPatients[t.bmhId] = String(t.ins || t.mode || 'ECHS / TPA'); });
    data.pr.forEach(function (r) { if (r.bmhId && String(r.status || '').toLowerCase() !== 'cancelled' && isIns((r.mode || '') + ' ' + (r.ins || ''))) insPatients[r.bmhId] = String(r.ins || r.mode || 'ECHS / TPA'); });
    var rows = data.ot.map(function (c) {
      var day = dayOf(c.date || c.scheduledDate || c.otDate || c.surgeryDate || c.completedAt || c.createdAt);
      var dk = c.caseKind === 'obg' ? 'obg' : (deptKey(c.dept || c.department) || 'ophtho');
      var proc = String(c.procedureMain || c.procedure || c.surgery || '').trim();
      var st = String(c.status || 'pending').toLowerCase(); if (st === 'scheduled') st = 'pending';
      return { c: c, id: c.id, bmhId: String(c.bmhId || '').trim(), patient: c.patient || c.name || '', day: day, dept: dk, centre: centreKey(c.centre), proc: proc || 'Procedure',
        group: surgeryGroup(proc + ' ' + String(c.procedure || ''), hasRealIol(c), dk), done: otDone(c), status: st, cancelled: st === 'cancelled',
        paid: 0, paidItems: [], claim: 0, claimStatus: '', insurer: '', unpaidBill: 0, cls: '' };
    }).filter(function (r) { return r.day; });
    var byPt = {};
    rows.forEach(function (r) { if (r.bmhId && !r.cancelled) (byPt[r.bmhId] = byPt[r.bmhId] || []).push(r); });
    function nearest(id, day, lo, hi) {
      var list = byPt[id]; if (!list) return null;
      var best = null, bestScore = 1e9;
      list.forEach(function (r) {
        var diff = (new Date(r.day + 'T12:00:00') - new Date(day + 'T12:00:00')) / 864e5; // OT date minus bill date
        if (diff < lo || diff > hi) return;
        var score = Math.abs(diff) + (diff < 0 ? 0.25 : 0) - (r.done ? 0.5 : 0) + (r._hit ? 3 : 0);
        if (score < bestScore) { bestScore = score; best = r; }
      });
      return best;
    }
    // Cash / UPI / card payments for surgery-type work: OT up to 45 days after or 10 days before the payment
    data.txns.forEach(function (t) {
      if (!t.bmhId || !byPt[t.bmhId]) return;
      var day = String(t._day || dayOf(t.date || t.createdAt));
      var lines = txnLines(t).filter(function (l) { return (l.stream === 'surgery' || l.stream === 'injection') && l.amount > 0; });
      var amt = lines.reduce(function (s, l) { return s + l.amount; }, 0);
      var insTxt = isIns((t.mode || '') + ' ' + (t.ins || ''));
      if (insTxt && SURG_TXT.test(String(t.service || ''))) {
        var r0 = nearest(t.bmhId, day, -90, 60);
        if (r0) { r0._hit = true; r0.claim += Math.max(0, Number(t.amount || 0)); r0.insurer = r0.insurer || String(t.ins || t.mode || ''); r0.claimStatus = r0.claimStatus || 'recorded at billing'; }
        return;
      }
      if (amt < 1000) return;
      var r = nearest(t.bmhId, day, -90, 60);
      if (r) { r._hit = true; r.paid += amt; r.paidItems.push(lines.map(function (l) { return l.label; }).join(', ') + ' ' + money(amt) + ' (' + day + ')'); }
    });
    // Payment requests: ECHS / TPA claims, and bills raised but not yet paid
    data.pr.forEach(function (p) {
      var st = String(p.status || '').toLowerCase();
      if (!p.bmhId || !byPt[p.bmhId] || st === 'cancelled') return;
      var day = dayOf(p.date || p.updatedAt);
      var txt = (p.for || '') + ' ' + (p.procedure || '') + ' ' + (p.diagnosis || '');
      var ins = isIns((p.mode || '') + ' ' + (p.ins || ''));
      if (ins) {
        var claimAmt = Number(p.claimedAmount || p.cashlessApprovedAmount || p.approvedAmount || p.amount || 0);
        if (!SURG_TXT.test(txt) && !(claimAmt > 0)) return;
        var r = nearest(p.bmhId, day, -90, 60);
        if (!r) return;
        r._hit = true;
        r.claimFromRequest = true;
        r.claim += claimAmt;
        r.insurer = r.insurer || String(p.ins || p.mode || '');
        var recv = Number(p.receivedAmount || 0);
        r.claimStatus = st === 'paid' || (recv > 0 && recv >= claimAmt) ? 'received' : recv > 0 ? 'part received' : 'pending';
        r.claimPending = (r.claimPending || 0) + Math.max(0, claimAmt - recv);
      } else if (st === 'pending' && SURG_TXT.test(txt) && Number(p.amount || 0) > 0) {
        var r2 = nearest(p.bmhId, day, -90, 60);
        if (r2) r2.unpaidBill += Number(p.amount || 0);
      }
    });
    rows.forEach(function (r) {
      if (r.cancelled) { r.cls = 'cancelled'; return; }
      if (r.paid > 0) r.cls = 'paid';
      else if (r.claim > 0 || r.claimStatus) r.cls = 'cashless';
      else if (r.unpaidBill > 0) r.cls = 'unpaid';
      else if (insPatients[r.bmhId]) { r.cls = 'ins-noclaim'; r.insurer = insPatients[r.bmhId]; }
      else if (campPatients[r.bmhId]) r.cls = 'camp';
      else if (!r.done && (byPt[r.bmhId] || []).some(function (o) { return o !== r && o.done && Math.abs((new Date(o.day) - new Date(r.day)) / 864e5) <= 3; })) r.cls = 'duplicate';
      else r.cls = 'none';
      r.future = r.day >= today;
      // ECHS / CGHS cataract: ₹14,500 claim per surgery unless a received claim is on record
      var insName = String(r.insurer || insPatients[r.bmhId] || '');
      if (r.group === 'Cataract (IOL)' && /echs|cghs/i.test(insName) && (r.cls === 'cashless' || r.cls === 'ins-noclaim')) {
        r.insurer = /cghs/i.test(insName) && !/echs/i.test(insName) ? 'CGHS' : 'ECHS';
        r.echs = true;
        if (r.claimStatus !== 'received') { r.claim = ECHS_CATARACT; r.claimPending = ECHS_CATARACT; r.claimStatus = r.claimStatus && r.claimStatus !== 'recorded at billing' ? r.claimStatus : 'pending'; }
        r.cls = 'cashless';
      }
      var ov = data.amounts && data.amounts[r.id];
      r.override = ov && ov.amount != null && ov.amount !== '' ? Number(ov.amount) : null;
      r.mark = data.marks && data.marks[r.id] || null;
    });
    return { rows: rows, insPatients: insPatients };
  }
  var CLS = {
    paid: ['Payment found', '#1a8c3c'], cashless: ['ECHS / TPA claim', '#6b3fa0'], 'ins-noclaim': ['ECHS / TPA patient, no claim entered', '#b45309'],
    unpaid: ['Bill raised, unpaid', '#c2410c'], camp: ['Camp / free patient, no bill', '#0e7490'], duplicate: ['Duplicate of a completed entry', '#64748b'], none: ['No bill or claim found', '#c0392b'], cancelled: ['Cancelled', '#94a3b8']
  };
  function countsAsSurgery(r, opt) {
    if (r.cancelled || r.future && !r.done) return false;
    if (r.done) return true;
    if (opt.countPaid && r.cls === 'paid') return true;
    if (opt.countCashless && (r.cls === 'cashless')) return true;
    return false;
  }

  // ── computation ───────────────────────────────────────────────────────────
  function compute(data, opt) {
    var recon = G.recon || reconcile(data);
    var fromM = opt.from, toM = opt.to;
    var months = monthsBetween(fromM, toM);
    var depts = opt.depts && opt.depts.length ? opt.depts : DEPTS.map(function (d) { return d[0]; });
    var centres = opt.centres && opt.centres.length ? opt.centres : ['RPR', 'CHD'];
    var streams = opt.streams && opt.streams.length ? opt.streams : STREAMS.map(function (s) { return s[0]; });
    var inRange = function (day) { var m = String(day || '').slice(0, 7); return m >= fromM && m <= toM; };
    var passDept = function (d) { return depts.indexOf(d) >= 0; };
    var passCentre = function (c) { return !c || centres.indexOf(c) >= 0; };
    var streamOn = function (s) { return streams.indexOf(s) >= 0; };
    var M = {};
    months.forEach(function (m) {
      M[m] = { opd: 0, newV: 0, fu: 0, uniq: new Set(), workDays: new Set(), byDept: {}, rev: { total: 0 }, revCentre: {}, opdCentre: {}, surg: 0, surgDone: 0, surgGroups: {}, iol: {}, iolTier: {}, iolCount: 0, items: { investigation: {}, minor: {}, injection: {} }, tpa: 0, recon: {} };
      STREAMS.forEach(function (s) { M[m].rev[s[0]] = 0; });
      DEPTS.forEach(function (d) { M[m].byDept[d[0]] = { opd: 0, newV: 0, fu: 0, surg: 0, rev: 0 }; });
    });
    var today = todayKey_();
    var weekday = [0, 0, 0, 0, 0, 0, 0], weekdayDays = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()];
    var visits = {}, firstNew = {};
    data.txns.forEach(function (t) {
      var day = String(t._day || dayOf(t.date || t.createdAt) || '');
      var dk = deptKey(t.dept) || 'ophtho';
      var ck = centreKey(t.centre);
      var svc = String(t.service || '');
      var lines = txnLines(t);
      var isOpd = lines.length && lines.every(function (l) { return l.stream === 'opd'; }) && !/cross[\s-]*ref/i.test(svc);
      if (isOpd && Number(t.amount || 0) >= 0) {
        var vk = (t.bmhId || ('x' + t.id)) + '|' + day + '|' + dk;
        var v = visits[vk] || (visits[vk] = { day: day, dept: dk, centre: ck, bmhId: t.bmhId || '', isNew: false });
        if (/\bnew\b/i.test(svc)) v.isNew = true;
        if (!v.centre && ck) v.centre = ck;
      }
      if (!inRange(day) || !passDept(dk) || !passCentre(ck)) return;
      var mm = M[day.slice(0, 7)];
      lines.forEach(function (l) {
        if (!streamOn(l.stream)) return;
        mm.rev[l.stream] += l.amount; mm.rev.total += l.amount;
        mm.byDept[dk].rev += l.amount;
        if (ck) mm.revCentre[ck] = (mm.revCentre[ck] || 0) + l.amount;
        if (mm.items[l.stream] && l.amount > 0) {
          var fam = itemFamily(l.label, l.stream);
          var it = mm.items[l.stream][fam] || (mm.items[l.stream][fam] = { n: 0, amt: 0 });
          it.n++; it.amt += l.amount;
        }
      });
      if (isIns((t.mode || '') + ' ' + (t.ins || '')) && Number(t.amount || 0) > 0) mm.tpa += Number(t.amount || 0);
    });
    Object.keys(visits).forEach(function (k) {
      var v = visits[k];
      if (v.isNew && v.bmhId && (!firstNew[v.bmhId] || v.day < firstNew[v.bmhId].day)) firstNew[v.bmhId] = { day: v.day, dept: v.dept, centre: v.centre };
      if (!inRange(v.day) || !passDept(v.dept) || !passCentre(v.centre)) return;
      var mm = M[v.day.slice(0, 7)];
      mm.opd++; mm.byDept[v.dept].opd++;
      if (v.isNew) { mm.newV++; mm.byDept[v.dept].newV++; } else { mm.fu++; mm.byDept[v.dept].fu++; }
      if (v.bmhId) mm.uniq.add(v.bmhId);
      mm.workDays.add(v.day);
      if (v.centre) mm.opdCentre[v.centre] = (mm.opdCentre[v.centre] || 0) + 1;
      var wd = new Date(v.day + 'T12:00:00').getDay(); weekday[wd]++; weekdayDays[wd].add(v.day);
    });
    // Surgeries
    var counted = [];
    var tierPay = {};
    recon.rows.forEach(function (r) {
      var inR = inRange(r.day) && passDept(r.dept) && passCentre(r.centre);
      if (inR && !r.cancelled && !r.future) { var mmr = M[r.day.slice(0, 7)].recon; var key = (r.done ? 'done:' : 'pend:') + r.cls; mmr[key] = (mmr[key] || 0) + 1; }
      if (!countsAsSurgery(r, opt)) return;
      counted.push(r);
      if (!inR) return;
      var mm = M[r.day.slice(0, 7)];
      mm.surg++; if (r.done) mm.surgDone++; mm.byDept[r.dept].surg++;
      mm.surgGroups[r.group] = (mm.surgGroups[r.group] || 0) + 1;
      if (r.group === 'Cataract (IOL)' || hasRealIol(r.c)) {
        var io = iolName(r.c, data.catalog);
        var nm = io ? io.name : 'IOL not recorded';
        mm.iol[nm] = (mm.iol[nm] || 0) + 1;
        if (io) {
          mm.iolCount++; var tier = iolTier(io.type, io.name); mm.iolTier[tier] = (mm.iolTier[tier] || 0) + 1;
          var val = caseValue(r);
          if (val >= 5000) { var tp = tierPay[tier] || (tierPay[tier] = { n: 0, amt: 0 }); tp.n++; tp.amt += val; }
        }
      }
    });
    var otByPt = {}, otAnyByPt = {};
    counted.forEach(function (o) { if (o.bmhId) (otByPt[o.bmhId] = otByPt[o.bmhId] || []).push(o); });
    recon.rows.forEach(function (o) { if (o.bmhId && !o.cancelled && !countsAsSurgery(o, opt)) (otAnyByPt[o.bmhId] = otAnyByPt[o.bmhId] || []).push(o); });
    var minorByPt = {};
    data.txns.forEach(function (t) {
      if (!t.bmhId) return;
      txnLines(t).forEach(function (l) { if ((l.stream === 'minor' || l.stream === 'injection' || l.stream === 'investigation') && l.amount > 0) (minorByPt[t.bmhId] = minorByPt[t.bmhId] || []).push({ day: String(t._day || ''), text: String(l.label || '').toLowerCase() }); });
    });
    // Conversion A: advised → done
    var conv = {}, openPipeline = [];
    months.forEach(function (m) { conv[m] = { sAdv: 0, sDone: 0, sSched: 0, sDrop: 0, mAdv: 0, mDone: 0, mDrop: 0 }; });
    var advisedPts = {};
    data.pf.forEach(function (r) {
      var proc = String(r.proc || '');
      if (!proc || /admit|ipd|review|investigat|\boct\b|field|scan|biometr|follow/i.test(proc) && !/lasik\s*work/i.test(proc)) return;
      var day = String(r.advisedDate || '').slice(0, 10);
      var dk = deptKey(r.dept) || 'ophtho';
      if (r.bmhId) advisedPts[r.bmhId] = true;
      if (!inRange(day) || !passDept(dk) || !passCentre(centreKey(r.centre))) return;
      var isMinor = RX.minor.test(proc) && !/chalazion|punctoplast/i.test(proc) || /lasik\s*work|copper|mirena|iucd/i.test(proc);
      var earliest = shiftDay(day, -2);
      var done = false, sched = false;
      if (isMinor) {
        var fam = /yag|capsulotomy/i.test(proc) ? /yag|capsulotomy/ : /lasik/i.test(proc) ? /lasik/ : /copper|cu[\s-]*t|iucd/i.test(proc) ? /copper|cu[\s-]*t|iucd/ : /mirena/i.test(proc) ? /mirena/ : /prp|laser/i.test(proc) ? /prp|laser|barrage/ : null;
        done = (minorByPt[r.bmhId] || []).some(function (p) { return p.day >= earliest && (!fam || fam.test(p.text)); });
      } else {
        var grp = surgeryGroup(proc, false, dk);
        var same = function (o) { return (!o.day || o.day >= earliest) && (o.group === grp || grp.indexOf('Other') === 0 || o.group.indexOf('Other') === 0); };
        done = (otByPt[r.bmhId] || []).some(same);
        if (!done && /chalazion|punctoplast|inject|ivt|vegf/i.test(proc)) done = (minorByPt[r.bmhId] || []).some(function (p) { return p.day >= earliest; });
        if (!done) sched = (otAnyByPt[r.bmhId] || []).some(same);
      }
      var c = conv[day.slice(0, 7)];
      if (isMinor) { c.mAdv++; if (done) c.mDone++; else if (r.dropped) c.mDrop++; }
      else {
        c.sAdv++;
        if (done) c.sDone++; else if (sched) c.sSched++; else if (r.dropped) c.sDrop++;
        else openPipeline.push({ bmhId: r.bmhId, patient: r.patient, proc: proc, day: day, mobile: r.mobile || '', group: surgeryGroup(proc, false, dk) });
      }
    });
    // Conversion B: new-patient cohorts
    var cohort = {};
    months.forEach(function (m) { cohort[m] = { n: 0, advised: 0, operated: 0 }; });
    Object.keys(firstNew).forEach(function (id) {
      var f = firstNew[id];
      if (!inRange(f.day) || !passDept(f.dept) || !passCentre(f.centre)) return;
      var c = cohort[f.day.slice(0, 7)];
      c.n++;
      if (advisedPts[id]) c.advised++;
      if ((otByPt[id] || []).some(function (o) { return o.day >= f.day; })) c.operated++;
    });
    var reconRows = recon.rows.filter(function (r) { return inRange(r.day) && passDept(r.dept) && passCentre(r.centre) && !r.future; });
    // Claims outstanding (all ECHS / TPA requests not fully received), filtered by centre/department only
    var claimsOut = [];
    data.pr.forEach(function (p) {
      var st = String(p.status || '').toLowerCase();
      if (st === 'cancelled' || st === 'paid' || !isIns((p.mode || '') + ' ' + (p.ins || ''))) return;
      var amt = Number(p.claimedAmount || p.cashlessApprovedAmount || p.approvedAmount || p.amount || 0) - Number(p.receivedAmount || 0);
      if (!(amt > 0)) return;
      var dk = deptKey(p.dept) || 'ophtho';
      if (!passDept(dk) || !passCentre(centreKey(p.centre))) return;
      claimsOut.push({ bmhId: p.bmhId, patient: p.patient, insurer: p.ins || p.mode, for: p.procedure || p.for, day: dayOf(p.date), amount: amt, patientDue: Number(p.patientDue || 0) });
    });
    recon.rows.forEach(function (r) {
      if (!r.echs || r.claimStatus === 'received' || r.cancelled || r.future || !(r.done)) return;
      if (r.claimFromRequest) return;
      if (!passDept(r.dept) || !passCentre(r.centre)) return;
      claimsOut.push({ bmhId: r.bmhId, patient: r.patient, insurer: r.insurer + ' (no claim entered yet)', for: r.proc, day: r.day, amount: r.override != null ? r.override : ECHS_CATARACT, patientDue: 0 });
    });
    claimsOut.sort(function (a, b) { return String(a.day).localeCompare(String(b.day)); });
    return { months: months, M: M, conv: conv, cohort: cohort, opt: opt, today: today, recon: reconRows, claimsOut: claimsOut, openPipeline: openPipeline,
      weekday: weekday.map(function (n, i) { return weekdayDays[i].size ? n / weekdayDays[i].size : 0; }), tierPay: tierPay, depts: depts, centres: centres, streams: streams };
  }

  // ── growth plan (rule-based, from the numbers above) ──────────────────────
  function sumBy(res, fn, months) { return (months || res.months).reduce(function (s, m) { return s + fn(res.M[m], m); }, 0); }
  function plan(res) {
    var cur = res.today.slice(0, 7);
    var full = res.months.filter(function (m) { return m < cur; });
    var nFull = Math.max(1, full.length);
    var items = [];
    var add = function (pri, title, finding, action, impact) { items.push({ pri: pri, title: title, finding: finding, action: action, impact: impact || 0 }); };
    var surgRevAll = sumBy(res, function (x) { return x.rev.surgery; }, full);
    var surgCnt = sumBy(res, function (x) { return x.surg; }, full);
    var paidRows = res.recon.filter(function (r) { return caseValue(r) >= 5000 && r.group === 'Cataract (IOL)' && !r.echs; });
    var vals = paidRows.map(function (r) { return caseValue(r); }).sort(function (x, y) { return x - y; });
    var avgCataract = vals.length ? vals[Math.floor(vals.length / 2)] : 18000;

    // 1. OT entries paid but not marked completed
    var paidPending = res.recon.filter(function (r) { return !r.done && r.cls === 'paid'; });
    if (paidPending.length) add(1, 'Mark operated cases as Completed in the OT module',
      paidPending.length + ' OT entries have a surgery payment on record but are still marked pending, so they are missing from surgery, IOL and conversion figures.',
      'Ask the OT nurse to close each case (Completed + IOL) the same day. A 2-minute end-of-list check by the OT in-charge keeps every figure honest.', 0);
    // 2. Completed but no bill
    var noBill = res.recon.filter(function (r) { return r.done && r.cls === 'none'; });
    if (noBill.length) add(1, 'Check completed surgeries with no payment or claim',
      noBill.length + ' completed OT entries have no surgery payment, bill or ECHS/TPA claim for the same patient around that date. Some may be free/camp cases or paid under another ID, but each unbilled case is lost revenue (~' + money(avgCataract) + ' for a typical cataract on your own billing).',
      'Billing to reconcile this list weekly (it is below in the "OT entries vs bills" table). Make "bill raised" a required step before discharge.', Math.round(noBill.length / nFull * avgCataract * 0.3));
    // 3. Claims outstanding
    var claimTot = res.claimsOut.reduce(function (s, c) { return s + c.amount; }, 0);
    var old = res.claimsOut.filter(function (c) { return c.day && c.day < shiftDay(res.today, -30); });
    if (res.claimsOut.length) add(1, 'Recover pending ECHS / TPA / cashless money',
      res.claimsOut.length + ' claims worth ' + money(claimTot) + ' are not yet received' + (old.length ? ' (' + old.length + ' older than 30 days, ' + money(old.reduce(function (s, c) { return s + c.amount; }, 0)) + ')' : '') + '. Also ' + res.recon.filter(function (r) { return r.cls === 'ins-noclaim'; }).length + ' OT cases are for ECHS/TPA patients with no claim entered.',
      'Weekly claims meeting with the TPA desk: submit within 7 days of discharge, chase queries, and enter every ECHS/cashless surgery as a claim so nothing is forgotten.', 0);
    // 4. Advised but not operated
    var openN = res.openPipeline.length;
    if (openN) add(1, 'Convert advised surgeries still waiting',
      openN + ' patients advised surgery in this period have no OT entry yet. At ~' + money(avgCataract) + ' per case that is about ' + money(openN * avgCataract) + ' of potential surgery revenue.',
      'Use the Advised Procedures call list: call within 7 days of advice, offer a fixed date and EMI/cashless help, and record the reason when a patient declines. Even 1 in 4 converting adds ' + money(openN * avgCataract / 4) + '.', Math.round(openN * avgCataract / 4 / nFull));
    // 5. Conversion rate
    var ca = res.months.reduce(function (s, m) { s.a += res.conv[m].sAdv; s.d += res.conv[m].sDone; return s; }, { a: 0, d: 0 });
    var convPct = pct(ca.d, ca.a);
    if (ca.a >= 10 && convPct != null && convPct < 60) add(2, 'Lift surgery conversion with counselling',
      'Only ' + convPct + '% of advised surgeries are recorded as done (well-run cataract practices typically convert 60–70%).',
      'A dedicated surgical counsellor right after the doctor (same visit), a printed package sheet with IOL options and prices, and same-week OT dates. Track counsellor conversion monthly in this report.', 0);
    // 6. Premium IOL mix
    var tiers = {}; var iolTot = 0;
    full.forEach(function (m) { var t = res.M[m].iolTier; Object.keys(t).forEach(function (k) { tiers[k] = (tiers[k] || 0) + t[k]; iolTot += t[k]; }); });
    var prem = (tiers['Premium monofocal'] || 0) + (tiers['Multifocal / trifocal / EDOF'] || 0) + (tiers['Toric'] || 0);
    var std = res.tierPay['Standard monofocal'], pr = res.tierPay['Premium monofocal'] || res.tierPay['Multifocal / trifocal / EDOF'];
    var diff = std && pr && std.n && pr.n ? (pr.amt / pr.n - std.amt / std.n) : 0;
    if (iolTot >= 10) add(2, 'Grow the premium IOL share',
      'Premium IOLs (premium monofocal, multifocal/trifocal, toric) are ' + pctTxt(prem, iolTot) + ' of IOLs. ' + (diff > 0 ? 'On your own billing, a premium case brings about ' + money(diff) + ' more than a standard one.' : ''),
      'Show every cataract patient an IOL options chart (with the brochure), do routine topography/keratometry to identify toric candidates, and offer trifocals to working-age patients. Each 10% shift of cases to premium adds about ' + (diff > 0 ? money(iolTot / nFull * 0.1 * diff) + ' a month.' : 'noticeably to surgery revenue.'), diff > 0 ? Math.round(iolTot / nFull * 0.1 * diff) : 0);
    // 7. New-patient trend
    if (full.length >= 4) {
      var l3 = full.slice(-3), p3 = full.slice(-6, -3);
      if (p3.length) {
        var trend = [];
        res.depts.forEach(function (d) {
          var a = sumBy(res, function (x) { return x.byDept[d].newV; }, l3) / l3.length, b = sumBy(res, function (x) { return x.byDept[d].newV; }, p3) / p3.length;
          if (b >= 10) trend.push({ d: d, a: a, b: b, ch: (a - b) * 100 / b });
        });
        var down = trend.filter(function (t) { return t.ch <= -8; });
        if (down.length) add(1, 'Reverse the fall in new patients',
          down.map(function (t) { return (DEPTS.filter(function (x) { return x[0] === t.d; })[0] || [0, t.d])[1] + ': ' + Math.round(t.b) + ' → ' + Math.round(t.a) + ' a month (' + Math.round(t.ch) + '%)'; }).join('; ') + ' — last 3 months against the 3 before.',
          'Restart outreach: monthly screening camps in nearby villages/towns, a referral thank-you programme for GPs and opticians, Google reviews after every visit, and Meta/Google ads aimed at "cataract surgery near me". Track new patients weekly.', 0);
      }
    }
    // 8. Investigations per eye OPD
    if (res.depts.indexOf('ophtho') >= 0) {
      var eyeOpd = sumBy(res, function (x) { return x.byDept.ophtho.opd; }, full);
      var octN = 0, fieldsN = 0, invRev = sumBy(res, function (x) { return x.rev.investigation; }, full);
      full.forEach(function (m) { var it = res.M[m].items.investigation; Object.keys(it).forEach(function (k) { if (/OCT/.test(k)) octN += it[k].n; if (/field/i.test(k)) fieldsN += it[k].n; }); });
      if (eyeOpd > 100) add(2, 'Use diagnostics consistently (OCT, fields)',
        'Only ' + num(octN) + ' OCTs and ' + num(fieldsN) + ' visual fields were billed against ' + num(eyeOpd) + ' eye OPD visits (' + (Math.round(octN * 1000 / eyeOpd) / 10) + ' OCT per 100 visits). Investigations are ' + pctTxt(invRev, sumBy(res, function (x) { return x.rev.total; }, full)) + ' of revenue.',
        'Agree simple protocols: OCT for every diabetic and macular complaint, OCT RNFL + fields for glaucoma suspects and all patients on glaucoma drops yearly, and pre-op OCT for premium IOL candidates. Bill the tests at the same visit.', Math.round(eyeOpd / nFull * 0.03 * 1500));
    }
    // 9. Chandigarh centre
    var opdC = { RPR: 0, CHD: 0 };
    full.forEach(function (m) { Object.keys(res.M[m].opdCentre).forEach(function (k) { opdC[k] = (opdC[k] || 0) + res.M[m].opdCentre[k]; }); });
    if (res.centres.length === 2 && opdC.RPR > 0 && opdC.CHD < opdC.RPR * 0.25) add(3, 'Build up the Chandigarh centre',
      'Chandigarh has ' + num(opdC.CHD) + ' OPD visits against ' + num(opdC.RPR) + ' at Rupnagar in this period.',
      'Fixed, advertised Chandigarh OPD days, local Google Business profile and reviews, tie-ups with nearby clinics and RWAs, and routing Chandigarh-area enquiries from ads there.', 0);
    // 10. Quiet weekdays
    var wdNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var wmax = Math.max.apply(null, res.weekday.concat([0]));
    var wds = res.weekday.map(function (v, i) { return { i: i, v: v }; }).filter(function (x) { return x.v > wmax * 0.2; }).sort(function (a, b) { return a.v - b.v; });
    if (wds.length >= 4) add(3, 'Fill the quiet days',
      'Average OPD per working day: ' + wds.slice().sort(function (a, b) { return ((a.i + 6) % 7) - ((b.i + 6) % 7); }).map(function (x) { return wdNames[x.i] + ' ' + Math.round(x.v); }).join(' · ') + '. Quietest: ' + wdNames[wds[0].i] + ', busiest: ' + wdNames[wds[wds.length - 1].i] + '.',
      'Put follow-up recalls, camp patients and planned surgeries on the quiet days, and keep the busiest day for new consultations.', 0);
    // 11. YAG / review recalls
    var cat = res.recon.filter(function (r) { return r.group === 'Cataract (IOL)' && (r.done || r.cls === 'paid') && r.day < shiftDay(res.today, -90); }).length;
    if (cat >= 10) add(3, 'Recall past cataract patients',
      num(cat) + ' cataract patients were operated more than 3 months ago in this period.',
      'Send a WhatsApp/SMS reminder for the 3-month and 1-year review: catches posterior capsule opacification (YAG), gets the second eye done, and brings family members in.', 0);
    // 12. Follow-up ratio
    var nv = sumBy(res, function (x) { return x.newV; }, full), fu = sumBy(res, function (x) { return x.fu; }, full);
    if (nv > 50) add(3, 'Keep patients returning',
      'There are ' + (Math.round(fu * 10 / nv) / 10) + ' follow-up visits for every new patient.',
      'Give every patient a written next-visit date (the prescription follow-up field), send a reminder the day before, and call no-shows. Chronic patients (glaucoma, diabetes, psychiatry) are the backbone of steady OPD revenue.', 0);
    items.sort(function (a, b) { return a.pri - b.pri || b.impact - a.impact; });
    return items;
  }

  // ── rendering ─────────────────────────────────────────────────────────────
  function change(cur, prev) {
    if (!prev) return '<span style="opacity:.6">–</span>';
    var p = Math.round((cur - prev) * 1000 / prev) / 10;
    var col = p > 0 ? '#1a8c3c' : p < 0 ? '#c0392b' : 'inherit';
    return '<span style="color:' + col + ';font-weight:700">' + (p > 0 ? '▲ ' : p < 0 ? '▼ ' : '') + Math.abs(p) + '%</span>';
  }
  function bars(values, labels, fmt, color) {
    var max = Math.max.apply(null, values.concat([1]));
    return '<div style="display:flex;align-items:flex-end;gap:4px;height:120px;padding:6px 0;border-bottom:1px solid var(--g5)">'
      + values.map(function (v, i) {
        var h = Math.max(2, Math.round(v * 100 / max));
        return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:0" title="' + esc(labels[i] + ': ' + fmt(v)) + '">'
          + '<div style="font-size:9px;color:var(--g1);white-space:nowrap">' + fmt(v) + '</div>'
          + '<div style="width:70%;height:' + h + 'px;background:' + (color || 'linear-gradient(180deg,#e52e71,#ff8a00)') + ';border-radius:4px 4px 0 0"></div></div>';
      }).join('') + '</div><div style="display:flex;gap:4px">' + labels.map(function (l) { return '<div style="flex:1;text-align:center;font-size:9.5px;color:var(--g1);min-width:0">' + esc(l) + '</div>'; }).join('') + '</div>';
  }
  function table(head, rows, opts) {
    opts = opts || {};
    return '<div style="overflow-x:auto"><table class="pg-table" style="width:100%;font-size:11.5px;border-collapse:collapse">'
      + '<thead><tr>' + head.map(function (h, i) { return '<th style="text-align:' + ((opts.leftCols ? i < opts.leftCols : !i) ? 'left' : 'right') + ';padding:5px 7px;border-bottom:2px solid var(--g4);white-space:nowrap">' + h + '</th>'; }).join('') + '</tr></thead><tbody>'
      + rows.map(function (r, ri) {
        var strong = opts.boldLast && ri === rows.length - 1;
        return '<tr' + (strong ? ' style="font-weight:800;background:var(--g6)"' : '') + '>' + r.map(function (c, i) { var left = opts.leftCols ? i < opts.leftCols : !i; return '<td style="text-align:' + (left ? 'left' : 'right') + ';padding:4px 7px;border-bottom:1px solid var(--g5);' + (opts.wrap && left ? '' : 'white-space:nowrap') + '">' + c + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }
  function section(key, title, body, note) {
    return '<div class="card pg-sec" data-sec="' + key + '" style="margin-bottom:12px;break-inside:avoid;border-top:3px solid #ff8a00"><div class="card-hd"><div class="card-title">' + title + '</div></div>'
      + (note ? '<div style="font-size:11px;color:var(--g1);margin:-4px 0 8px">' + note + '</div>' : '') + body + '</div>';
  }
  function hero(label, val, sub) {
    return '<div style="flex:1;min-width:150px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);border-radius:14px;padding:12px 14px">'
      + '<div style="font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;opacity:.9">' + label + '</div>'
      + '<div style="font-size:24px;font-weight:900;margin:3px 0;line-height:1.1">' + val + '</div><div style="font-size:11px;opacity:.95">' + (sub || '&nbsp;') + '</div></div>';
  }
  function chip(html) { return '<span style="display:inline-block;background:#fff;border-radius:999px;padding:1px 7px;margin-left:4px">' + html + '</span>'; }
  function matrix(months, M, getMap, opts) {
    opts = opts || {};
    var keys = {};
    months.forEach(function (m) { var o = getMap(M[m]) || {}; Object.keys(o).forEach(function (k) { keys[k] = (keys[k] || 0) + (opts.val ? opts.val(o[k]) : o[k]); }); });
    var names = Object.keys(keys).sort(function (a, b) { return keys[b] - keys[a]; });
    if (!names.length) return '<div style="color:var(--g1);font-size:12px;padding:6px">Nothing recorded in this period.</div>';
    var rows = names.map(function (n) {
      return [esc(n)].concat(months.map(function (m) { var o = getMap(M[m]) || {}; var v = o[n] ? (opts.val ? opts.val(o[n]) : o[n]) : 0; return v ? (opts.fmt ? opts.fmt(v) : num(v)) : '<span style="color:var(--g4)">–</span>'; }))
        .concat([opts.fmt ? opts.fmt(keys[n]) : num(keys[n])]);
    });
    var totals = months.map(function (m) { var o = getMap(M[m]) || {}; return Object.keys(o).reduce(function (s, k) { return s + (opts.val ? opts.val(o[k]) : o[k]); }, 0); });
    var gt = totals.reduce(function (a, b) { return a + b; }, 0);
    rows.push(['Total'].concat(totals.map(function (v) { return opts.fmt ? opts.fmt(v) : num(v); })).concat([opts.fmt ? opts.fmt(gt) : num(gt)]));
    return table([opts.first || 'Item'].concat(months.map(monthName)).concat(['Total']), rows, { boldLast: true });
  }
  function ptLink(id, name) {
    var safe = String(id || '').replace(/[^A-Za-z0-9-]/g, '');
    var label = esc(name || id || '—');
    return safe && typeof window.bmhShowPatientVisitHistory === 'function'
      ? '<a href="javascript:void(0)" onclick="bmhShowPatientVisitHistory(\'' + safe + '\')" style="color:#1A3C6E;font-weight:700;text-decoration:underline">' + label + '</a> <span style="font-size:10px;color:var(--g1)">' + esc(id) + '</span>'
      : label + ' <span style="font-size:10px;color:var(--g1)">' + esc(id || '') + '</span>';
  }
  function fmtDay(d) { try { return formatDateIN(d); } catch (e) { return d; } }

  function render(res) {
    var months = res.months, M = res.M, cur = res.today.slice(0, 7), S = res.opt.sections || {};
    var on = function (k) { return S[k] !== false; };
    var full = months.filter(function (m) { return m < cur; });
    var last = full[full.length - 1], prev = full[full.length - 2];
    var tot = months.reduce(function (s, m) { var x = M[m]; s.opd += x.opd; s.n += x.newV; s.f += x.fu; s.s += x.surg; s.r += x.rev.total; s.iol += x.iolCount; return s; }, { opd: 0, n: 0, f: 0, s: 0, r: 0, iol: 0 });
    var deptTxt = res.depts.length === 4 ? 'All departments' : res.depts.map(function (d) { return (DEPTS.filter(function (x) { return x[0] === d; })[0] || [0, d])[1]; }).join(' + ');
    var centreTxt = res.centres.length === 2 ? 'Both centres' : res.centres[0] === 'CHD' ? 'Chandigarh' : 'Rupnagar';
    var a = last ? M[last] : null, b = prev ? M[prev] : null;
    var h = '';
    // Hero
    h += '<div style="background:linear-gradient(135deg,#1A3C6E 0%,#6b3fa0 55%,#e52e71 100%);color:#fff;border-radius:16px;padding:16px;margin-bottom:12px;box-shadow:0 6px 20px rgba(107,63,160,.25)">'
      + '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;align-items:baseline"><div style="font-size:17px;font-weight:900">🚀 Practice Growth</div>'
      + '<div style="font-size:11.5px;opacity:.9">' + esc(deptTxt) + ' · ' + esc(centreTxt) + ' · ' + monthName(months[0]) + ' – ' + monthName(months[months.length - 1]) + '</div></div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">'
      + hero('Revenue', money(tot.r), a ? monthName(last) + ' ' + money(a.rev.total) + (b ? chip(change(a.rev.total, b.rev.total)) : '') : '')
      + hero('OPD visits', num(tot.opd), a ? monthName(last) + ' ' + num(a.opd) + (b ? chip(change(a.opd, b.opd)) : '') : '')
      + hero('New patients', num(tot.n), a ? monthName(last) + ' ' + num(a.newV) + (b ? chip(change(a.newV, b.newV)) : '') : '')
      + hero('Surgeries', num(tot.s), a ? monthName(last) + ' ' + num(a.surg) + (b ? chip(change(a.surg, b.surg)) : '') : '')
      + hero('IOLs', num(tot.iol), tot.s ? pctTxt(tot.iol, tot.s) + ' of surgeries' : '')
      + hero('Revenue / OPD visit', tot.opd ? money(tot.r / tot.opd) : '–', tot.n ? (Math.round(tot.s * 1000 / tot.n) / 10) + ' surgeries per 100 new' : '')
      + '</div>';
    if (months.indexOf(cur) >= 0) {
      var c = M[cur], dn = Number(res.today.slice(8, 10)), dim = daysInMonth(cur);
      var proj = function (v) { return dn ? Math.round(v * dim / dn) : 0; };
      h += '<div style="font-size:11.5px;margin-top:10px;background:rgba(0,0,0,.18);border-radius:10px;padding:7px 10px"><b>' + monthName(cur) + ' so far (' + dn + '/' + dim + ' days):</b> '
        + num(c.opd) + ' OPD · ' + num(c.newV) + ' new · ' + num(c.surg) + ' surgeries · ' + money(c.rev.total)
        + ' → <b>on pace for</b> ~' + num(proj(c.opd)) + ' OPD, ~' + num(proj(c.newV)) + ' new, ~' + money(proj(c.rev.total)) + '</div>';
    }
    h += '</div><!--PG-HERO-END-->';

    // Plan
    if (on('plan')) {
      var items = plan(res);
      var priCol = { 1: '#c0392b', 2: '#b45309', 3: '#1A3C6E' }, priTxt = { 1: 'Do first', 2: 'Next', 3: 'Also' };
      h += section('plan', '🎯 Plan to grow revenue — from your own numbers', items.length ? '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:10px">' + items.map(function (it, i) {
        return '<div style="border:1px solid var(--g5);border-left:4px solid ' + priCol[it.pri] + ';border-radius:10px;padding:10px 12px;background:var(--g6)">'
          + '<div style="display:flex;justify-content:space-between;gap:6px;align-items:baseline"><div style="font-weight:800;font-size:13px">' + (i + 1) + '. ' + esc(it.title) + '</div><span style="font-size:10px;font-weight:800;color:' + priCol[it.pri] + ';white-space:nowrap">' + priTxt[it.pri] + '</span></div>'
          + '<div style="font-size:11.5px;margin:5px 0"><b>Finding:</b> ' + esc(it.finding) + '</div>'
          + '<div style="font-size:11.5px"><b>Action:</b> ' + esc(it.action) + '</div>'
          + (it.impact ? '<div style="font-size:11px;margin-top:5px;color:#1a8c3c;font-weight:700">Possible gain: ~' + money(it.impact) + ' a month (rough estimate)</div>' : '') + '</div>';
      }).join('') + '</div>' : '<div style="font-size:12px;color:var(--g1)">Not enough data in this period for suggestions.</div>',
        'Suggestions are worked out from the figures in this report for the options you have ticked; estimates are rough guides, not forecasts.');
    }

    // Overview
    if (on('overview')) {
      var ov = months.map(function (m, i) {
        var x = M[m], p = i ? M[months[i - 1]] : null, wd = x.workDays.size;
        return [monthName(m) + (m === cur ? ' *' : ''), num(x.opd), num(x.newV), num(x.fu), pctTxt(x.newV, x.opd), x.newV ? (Math.round(x.fu * 10 / x.newV) / 10) + '' : '–', num(x.uniq.size), wd ? num(x.opd / wd) : '–',
          num(x.surg), money(x.rev.total), (p && m !== cur) ? change(x.rev.total, p.rev.total) : '–', x.opd ? money(x.rev.total / x.opd) : '–'];
      });
      ov.push(['Total', num(tot.opd), num(tot.n), num(tot.f), pctTxt(tot.n, tot.opd), tot.n ? (Math.round(tot.f * 10 / tot.n) / 10) + '' : '–', '', '', num(tot.s), money(tot.r), '', tot.opd ? money(tot.r / tot.opd) : '–']);
      h += section('overview', '📈 Month on month overview', table(['Month', 'OPD visits', 'New', 'Follow-up', 'New %', 'FU per new', 'Unique patients', 'OPD / working day', 'Surgeries', 'Revenue', 'Revenue change', 'Revenue per OPD visit'], ov, { boldLast: true })
        + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:12px">'
        + '<div><div style="font-size:11px;font-weight:800;color:var(--g1)">New patients</div>' + bars(months.map(function (m) { return M[m].newV; }), months.map(monthName), num) + '</div>'
        + '<div><div style="font-size:11px;font-weight:800;color:var(--g1)">Surgeries</div>' + bars(months.map(function (m) { return M[m].surg; }), months.map(monthName), num, 'linear-gradient(180deg,#6b3fa0,#1A3C6E)') + '</div>'
        + '<div><div style="font-size:11px;font-weight:800;color:var(--g1)">Revenue (₹ lakh)</div>' + bars(months.map(function (m) { return M[m].rev.total / 100000; }), months.map(monthName), function (v) { return v.toFixed(1); }, 'linear-gradient(180deg,#22a06b,#1a8c3c)') + '</div>'
        + '<div><div style="font-size:11px;font-weight:800;color:var(--g1)">Average OPD by weekday</div>' + bars(res.weekday.slice(1).concat(res.weekday.slice(0, 1)), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], num, 'linear-gradient(180deg,#0ea5e9,#1A3C6E)') + '</div></div>',
        (months.indexOf(cur) >= 0 ? '* current month, still running. ' : '') + 'A visit = one patient checked in at reception for one department on one day. "New" follows the reception choice (New Consultation).');
    }
    // Departments
    if (on('depts') && res.depts.length > 1) {
      var drows = res.depts.map(function (d) {
        var s = months.reduce(function (acc, m) { var x = M[m].byDept[d]; acc.opd += x.opd; acc.n += x.newV; acc.f += x.fu; acc.s += x.surg; acc.r += x.rev; return acc; }, { opd: 0, n: 0, f: 0, s: 0, r: 0 });
        return [(DEPTS.filter(function (x) { return x[0] === d; })[0] || [0, d])[1], num(s.opd), num(s.n), num(s.f), num(s.s), money(s.r), pctTxt(s.r, tot.r), s.opd ? money(s.r / s.opd) : '–'];
      });
      var dm = function (f) { return function (x) { var o = {}; res.depts.forEach(function (d) { o[(DEPTS.filter(function (y) { return y[0] === d; })[0] || [0, d])[1]] = f(x.byDept[d]); }); return o; }; };
      h += section('depts', '🏥 Departments', table(['Department', 'OPD visits', 'New', 'Follow-up', 'Surgeries', 'Revenue', 'Share', 'Revenue / visit'], drows)
        + '<div style="font-size:11px;font-weight:800;color:var(--g1);margin-top:10px">New patients, month on month</div>' + matrix(months, M, dm(function (x) { return x.newV; }), { first: 'Department' })
        + '<div style="font-size:11px;font-weight:800;color:var(--g1);margin-top:10px">Revenue, month on month</div>' + matrix(months, M, dm(function (x) { return x.rev; }), { first: 'Department', fmt: money }));
    }
    if (on('centres') && res.centres.length > 1) {
      var cm = function (f) { return function (x) { var o = {}; Object.keys(f(x)).forEach(function (k) { o[k === 'CHD' ? 'Chandigarh' : 'Rupnagar'] = f(x)[k]; }); return o; }; };
      h += section('centres', '📍 Centres', '<div style="font-size:11px;font-weight:800;color:var(--g1)">OPD visits</div>' + matrix(months, M, cm(function (x) { return x.opdCentre; }), { first: 'Centre' })
        + '<div style="font-size:11px;font-weight:800;color:var(--g1);margin-top:10px">Revenue</div>' + matrix(months, M, cm(function (x) { return x.revCentre; }), { first: 'Centre', fmt: money }));
    }
    // Revenue streams
    if (on('revenue')) {
      var srows = STREAMS.filter(function (s) { return res.streams.indexOf(s[0]) >= 0; }).map(function (s) {
        var t = months.reduce(function (acc, m) { return acc + M[m].rev[s[0]]; }, 0);
        return [s[1]].concat(months.map(function (m) { return M[m].rev[s[0]] ? money(M[m].rev[s[0]]) : '<span style="color:var(--g4)">–</span>'; })).concat([money(t), pctTxt(t, tot.r)]);
      });
      srows.push(['Total'].concat(months.map(function (m) { return money(M[m].rev.total); })).concat([money(tot.r), '100%']));
      h += section('revenue', '💰 Revenue by stream', table(['Stream'].concat(months.map(monthName)).concat(['Total', 'Share']), srows, { boldLast: true })
        + '<div style="font-size:11px;color:var(--g1);margin-top:6px">Recorded through Insurance / TPA / ECHS at billing: ' + months.map(function (m) { return monthName(m) + ' ' + money(M[m].tpa); }).join(' · ') + '</div>',
        'Money received, by the date it was received (refunds subtracted). Surgery advances count under surgeries when received; "advance used" entries are not counted twice. Only the streams ticked in Options are included.');
    }
    // Surgeries
    if (on('surgery')) {
      var basis = 'Counting: completed OT entries' + (res.opt.countPaid ? ' + pending entries with a surgery payment' : '') + (res.opt.countCashless ? ' + pending entries with an ECHS/TPA claim' : '') + '.';
      h += section('surgery', '⚕️ Surgeries', matrix(months, M, function (x) { return x.surgGroups; }, { first: 'Surgery' }), basis + ' Change this under Options → Surgery counting.');
    }
    // OT vs bills
    if (on('otbills')) {
      var R = res.recon.filter(function (r) { return !r.cancelled; });
      var sumCls = function (done) { var o = {}; R.filter(function (r) { return r.done === done; }).forEach(function (r) { o[r.cls] = (o[r.cls] || 0) + 1; }); return o; };
      var sd = sumCls(true), sp = sumCls(false);
      var order = ['paid', 'cashless', 'ins-noclaim', 'unpaid', 'camp', 'duplicate', 'none'];
      var rowsC = order.map(function (k) { return ['<span style="color:' + CLS[k][1] + ';font-weight:800">●</span> ' + CLS[k][0], num(sd[k] || 0), num(sp[k] || 0), num((sd[k] || 0) + (sp[k] || 0))]; });
      rowsC.push(['Total', num(R.filter(function (r) { return r.done; }).length), num(R.filter(function (r) { return !r.done; }).length), num(R.length)]);
      var flt = G.otFilter || 'attention';
      var list = R.filter(function (r) {
        if (flt === 'all') return true;
        if (flt === 'attention') return (!r.done && (r.cls === 'paid' || r.cls === 'cashless' || r.cls === 'unpaid')) || (r.done && (r.cls === 'none' || r.cls === 'ins-noclaim' || r.cls === 'unpaid'));
        if (flt === 'pendpaid') return !r.done && (r.cls === 'paid' || r.cls === 'cashless');
        if (flt === 'donenobill') return r.done && (r.cls === 'none' || r.cls === 'ins-noclaim' || r.cls === 'camp');
        if (flt === 'cashless') return r.cls === 'cashless' || r.cls === 'ins-noclaim';
        if (flt === 'pendnone') return !r.done && (r.cls === 'none' || r.cls === 'duplicate');
        return true;
      }).sort(function (x, y) { return String(y.day).localeCompare(String(x.day)); });
      var fbtn = function (k, label) { return '<button type="button" class="btn btn-sm ' + (flt === k ? 'btn-gold' : 'btn-outline') + '" style="margin:2px" onclick="bmhPracticeGrowth.otFilter(\'' + k + '\')">' + label + '</button>'; };
      var shown = list.slice(0, 300);
      h += section('otbills', '🧾 OT entries vs bills & ECHS / cashless claims',
        table(['What was found for the same patient', 'OT marked Completed', 'OT still pending', 'Total'], rowsC, { boldLast: true })
        + '<div style="margin:10px 0 6px">' + fbtn('attention', 'Needs attention') + fbtn('pendpaid', 'Pending but paid / claimed') + fbtn('donenobill', 'Completed, no bill') + fbtn('cashless', 'ECHS / TPA') + fbtn('pendnone', 'Pending, no bill') + fbtn('all', 'All') + '</div>'
        + (shown.length ? table(['Date', 'Patient', 'Procedure', 'OT status', 'Found', 'Paid', 'Claim', 'Case amount', 'Action', 'Details'], shown.map(function (r) {
          var sid = String(r.id || '').replace(/[^A-Za-z0-9_-]/g, '');
          var status = r.done ? '<span style="color:#1a8c3c;font-weight:700">Completed</span>' + (r.c.completedVia === 'practice-growth' ? '<div style="font-size:9.5px;color:var(--g1)">marked here</div>' : '') : '<span style="color:#b45309;font-weight:700">' + esc(r.status) + '</span>';
          var action = !sid ? '' : !r.done
            ? '<button type="button" class="btn btn-sm" id="pg-mk-' + sid + '" style="background:#1a8c3c;color:#fff;border:0;white-space:nowrap" onclick="bmhPracticeGrowth.markDone(\'' + sid + '\')">✓ Mark OT completed</button>'
            : (r.c.completedVia === 'practice-growth' && r.mark ? '<button type="button" class="btn btn-outline btn-sm" style="white-space:nowrap" onclick="bmhPracticeGrowth.undoDone(\'' + sid + '\')">↶ Undo</button>' : '');
          var amtCell = '<span id="pg-amt-' + sid + '">' + (r.override != null ? '<b>' + money(r.override) + '</b> <span style="font-size:9.5px;color:#6b3fa0">edited</span>' : (caseValue(r) ? money(caseValue(r)) : '–'))
            + (sid ? ' <a href="javascript:void(0)" title="Correct the amount for this surgery" onclick="bmhPracticeGrowth.editAmount(\'' + sid + '\')">✏️</a>' : '') + '</span>';
          return [fmtDay(r.day), ptLink(r.bmhId, r.patient), esc(r.proc).slice(0, 60), status,
            '<span style="color:' + CLS[r.cls][1] + ';font-weight:700">' + CLS[r.cls][0] + '</span>', r.paid ? money(r.paid) : '–', r.claim ? money(r.claim) + (r.echs && !r.claimFromRequest ? '<div style="font-size:9.5px;color:var(--g1)">ECHS rate</div>' : '') : (r.cls === 'ins-noclaim' ? '—' : '–'),
            amtCell, action,
            esc([r.insurer ? r.insurer + (r.claimStatus ? ' (' + r.claimStatus + ')' : '') : '', r.unpaidBill ? 'Unpaid bill ' + money(r.unpaidBill) : '', r.paidItems.join('; ')].filter(Boolean).join(' · ')).slice(0, 160)];
        }), { leftCols: 5, wrap: true }) : '<div style="font-size:12px;color:var(--g1);padding:6px">Nothing in this view.</div>')
        + (list.length > shown.length ? '<div style="font-size:11px;color:var(--g1);margin-top:4px">Showing the latest 300 of ' + num(list.length) + '.</div>' : ''),
        'Each OT entry dated before today is matched to the same patient\'s surgery payments (cash/UPI/card, including advances), ECHS/TPA/cashless claims and unpaid bills, from up to 60 days before to 90 days after the OT date; each payment goes to the nearest OT entry only. ECHS/CGHS cataracts are taken at ₹14,500 each. Click a name to open the patient file. "✓ Mark OT completed" changes only that OT entry\'s status (no stock deduction, no follow-up booking) and can be undone here; "✏️" stores a corrected case amount for this report only — bills are not touched.');
      if (res.claimsOut.length) {
        var ctot = res.claimsOut.reduce(function (s, c) { return s + c.amount; }, 0);
        h += section('otbills', '⏳ ECHS / TPA / cashless claims not yet received — ' + money(ctot), table(['Date', 'Patient', 'Insurer', 'For', 'Claim due', 'Patient due'], res.claimsOut.map(function (c) {
          return [fmtDay(c.day), ptLink(c.bmhId, c.patient), esc(c.insurer), esc(c.for || '').slice(0, 50), money(c.amount), c.patientDue ? money(c.patientDue) : '–'];
        }), { leftCols: 4, wrap: true }));
      }
    }
    // IOLs
    if (on('iol')) {
      h += section('iol', '🔬 IOLs implanted, month on month', matrix(months, M, function (x) { return x.iol; }, { first: 'IOL' })
        + '<div style="font-size:11px;font-weight:800;color:var(--g1);margin-top:10px">IOL mix by type</div>'
        + matrix(months, M, function (x) { return x.iolTier; }, { first: 'IOL type' })
        + '<div style="font-size:11px;color:var(--g1);margin-top:6px">Premium share (premium monofocal + multifocal/trifocal + toric): '
        + months.map(function (m) { var t = M[m].iolTier; var p = (t['Premium monofocal'] || 0) + (t['Multifocal / trifocal / EDOF'] || 0) + (t['Toric'] || 0); return monthName(m) + ' ' + pctTxt(p, M[m].iolCount); }).join(' · ') + '</div>'
        + (Object.keys(res.tierPay).length ? '<div style="font-size:11px;color:var(--g1);margin-top:4px">Average billed per case (payment + claim found): ' + Object.keys(res.tierPay).map(function (k) { var t = res.tierPay[k]; return esc(k) + ' ' + money(t.amt / t.n) + ' (' + t.n + ')'; }).join(' · ') + '</div>' : ''),
        'From the IOL entered on the counted cataract OT entries; names matched to your IOL catalogue, power ignored.');
    }
    if (on('inv')) h += section('inv', '🧪 Investigations', matrix(months, M, function (x) { return x.items.investigation; }, { first: 'Number done', val: function (v) { return v.n; } })
      + '<div style="font-size:11px;font-weight:800;color:var(--g1);margin-top:10px">Revenue</div>' + matrix(months, M, function (x) { return x.items.investigation; }, { first: 'Investigation', val: function (v) { return v.amt; }, fmt: money }));
    if (on('minor')) h += section('minor', '✨ Minor procedures', matrix(months, M, function (x) { return x.items.minor; }, { first: 'Number done', val: function (v) { return v.n; } })
      + '<div style="font-size:11px;font-weight:800;color:var(--g1);margin-top:10px">Revenue</div>' + matrix(months, M, function (x) { return x.items.minor; }, { first: 'Procedure', val: function (v) { return v.amt; }, fmt: money }));
    if (on('inj')) h += section('inj', '💉 Intravitreal injections billed', matrix(months, M, function (x) { return x.items.injection; }, { first: 'Drug', val: function (v) { return v.n; } }));
    if (on('conv')) {
      var crow = months.map(function (m) { var c = res.conv[m]; return [monthName(m), num(c.sAdv), num(c.sDone), pctTxt(c.sDone, c.sAdv), num(c.sSched), num(c.sDrop), num(c.sAdv - c.sDone - c.sSched - c.sDrop), num(c.mAdv), num(c.mDone), pctTxt(c.mDone, c.mAdv)]; });
      var ct = months.reduce(function (s, m) { var c = res.conv[m]; ['sAdv', 'sDone', 'sSched', 'sDrop', 'mAdv', 'mDone'].forEach(function (k) { s[k] += c[k]; }); return s; }, { sAdv: 0, sDone: 0, sSched: 0, sDrop: 0, mAdv: 0, mDone: 0 });
      crow.push(['Total', num(ct.sAdv), num(ct.sDone), pctTxt(ct.sDone, ct.sAdv), num(ct.sSched), num(ct.sDrop), num(ct.sAdv - ct.sDone - ct.sSched - ct.sDrop), num(ct.mAdv), num(ct.mDone), pctTxt(ct.mDone, ct.mAdv)]);
      var co = months.map(function (m) { var c = res.cohort[m]; return [monthName(m), num(c.n), num(c.advised), pctTxt(c.advised, c.n), num(c.operated), pctTxt(c.operated, c.n), pctTxt(c.operated, c.advised)]; });
      var cot = months.reduce(function (s, m) { var c = res.cohort[m]; s.n += c.n; s.a += c.advised; s.o += c.operated; return s; }, { n: 0, a: 0, o: 0 });
      co.push(['Total', num(cot.n), num(cot.a), pctTxt(cot.a, cot.n), num(cot.o), pctTxt(cot.o, cot.n), pctTxt(cot.o, cot.a)]);
      h += section('conv', '🎯 Conversion — advised to done', table(['Month advised', 'Surgeries advised', 'Operated', 'Conversion', 'In OT list, not counted', 'Declined', 'Still open', 'Minor proc. advised', 'Done', 'Conversion'], crow, { boldLast: true }),
        'From the Advised Procedures list. A surgery counts as done when a counted OT entry exists for that patient after the advice; a minor procedure when it was paid for after the advice. Recent months are naturally lower.');
      h += section('conv', '🎯 Conversion — new patients to surgery', table(['Month first seen', 'New patients', 'Advised a procedure', '% advised', 'Operated so far', '% of new', '% of advised'], co, { boldLast: true }),
        'Each new patient is counted in the month of their first "New" visit and followed to today. April 2026 includes many existing patients registered as new when the software started.');
    }
    return h;
  }

  // ── CSV / print ───────────────────────────────────────────────────────────
  function csv(res) {
    var head = ['Month', 'OPD visits', 'New', 'Follow-up', 'Unique patients', 'Surgeries'].concat(STREAMS.map(function (s) { return 'Revenue - ' + s[1]; })).concat(['Revenue total', 'Surgeries advised', 'Operated (of advised)', 'New patients cohort', 'Cohort operated']);
    var lines = [head];
    res.months.forEach(function (m) {
      var x = res.M[m], c = res.conv[m], k = res.cohort[m];
      lines.push([monthName(m), x.opd, x.newV, x.fu, x.uniq.size, x.surg].concat(STREAMS.map(function (s) { return Math.round(x.rev[s[0]]); })).concat([Math.round(x.rev.total), c.sAdv, c.sDone, k.n, k.operated]));
    });
    lines.push([]);
    lines.push(['OT entry date', 'BMSH ID', 'Patient', 'Procedure', 'OT status', 'Found', 'Paid', 'Claim', 'Insurer']);
    res.recon.forEach(function (r) { if (!r.cancelled) lines.push([r.day, r.bmhId, r.patient, r.proc, r.done ? 'Completed' : r.status, CLS[r.cls][0], Math.round(r.paid), Math.round(r.claim), r.insurer]); });
    var body = lines.map(function (r) { return r.map(function (v) { var s = String(v == null ? '' : v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }).join(','); }).join('\n');
    var blob = new Blob(['﻿' + body], { type: 'text/csv' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'BMH-practice-growth-' + res.months[0] + '-to-' + res.months[res.months.length - 1] + '.csv';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function printReport() {
    var el = document.getElementById('rep-growth-result'), hero = document.getElementById('rep-growth-hero');
    if (!el || !el.innerHTML.trim()) return;
    var w = window.open('', '_blank');
    if (!w) { try { showToast('Please allow pop-ups to print', 'w'); } catch (e) {} return; }
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>BMH Practice Growth</title><style>'
      + ':root{--g1:#555;--g3:#999;--g4:#ccc;--g5:#e5e5e5;--g6:#f6f6f6}'
      + 'body{font-family:Arial,sans-serif;margin:14px;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact}.card{border:1px solid #ddd;border-radius:8px;padding:10px;margin-bottom:10px;break-inside:avoid}'
      + '.card-title{font-weight:800;font-size:13px;margin-bottom:6px}table{font-size:10px}button{display:none}@page{size:A4 landscape;margin:10mm}</style></head><body>'
      + '<h2 style="margin:0 0 6px">Baweja Multispeciality Hospital — Practice Growth</h2>' + (hero ? hero.innerHTML : '') + el.innerHTML + '</body></html>');
    w.document.close();
    setTimeout(function () { w.focus(); w.print(); }, 400);
  }

  // ── options panel ─────────────────────────────────────────────────────────
  var SECTIONS = [['plan', 'Growth plan'], ['overview', 'Overview'], ['depts', 'Departments'], ['centres', 'Centres'], ['revenue', 'Revenue'], ['surgery', 'Surgeries'], ['otbills', 'OT vs bills / claims'],
    ['iol', 'IOLs'], ['inv', 'Investigations'], ['minor', 'Minor procedures'], ['inj', 'Injections'], ['conv', 'Conversion']];
  function savedPrefs() { try { return JSON.parse(localStorage.getItem('bmh_pg_prefs') || '{}') || {}; } catch (e) { return {}; } }
  function savePrefs(p) { try { localStorage.setItem('bmh_pg_prefs', JSON.stringify(p)); } catch (e) {} }
  function box(group, val, label, checked) {
    return '<label style="display:inline-flex;align-items:center;gap:4px;margin:2px 8px 2px 0;font-size:12px;cursor:pointer;white-space:nowrap"><input type="checkbox" data-pg="' + group + '" value="' + val + '"' + (checked ? ' checked' : '') + ' onchange="bmhPracticeGrowth.refresh()"> ' + label + '</label>';
  }
  function optionsHtml() {
    var p = savedPrefs();
    var has = function (arr, v, def) { return Array.isArray(arr) ? arr.indexOf(v) >= 0 : def; };
    var cur = todayKey_().slice(0, 7);
    var start = addMonth(cur, -11) < '2026-04' ? '2026-04' : addMonth(cur, -11);
    var row = function (title, inner) { return '<div style="display:flex;gap:8px;align-items:flex-start;padding:5px 0;border-top:1px dashed var(--g5);flex-wrap:wrap"><div style="min-width:120px;font-size:11px;font-weight:800;color:var(--g1);text-transform:uppercase;padding-top:3px">' + title + '</div><div style="flex:1;min-width:200px">' + inner + '</div></div>'; };
    return '<div class="card" style="margin-bottom:12px;border:2px solid #ff8a00">'
      + '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:end;margin-bottom:6px">'
      + '<div class="form-group" style="margin:0"><label class="fl">From month</label><input type="month" id="rep-growth-from" value="' + start + '" onchange="bmhPracticeGrowth.refresh()"></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">To month</label><input type="month" id="rep-growth-to" value="' + cur + '" onchange="bmhPracticeGrowth.refresh()"></div>'
      + '<div style="display:flex;gap:4px;flex-wrap:wrap">'
      + ['3', '6', '12'].map(function (n) { return '<button type="button" class="btn btn-outline btn-xs" onclick="bmhPracticeGrowth.preset(' + n + ')">Last ' + n + ' months</button>'; }).join('')
      + '<button type="button" class="btn btn-outline btn-xs" onclick="bmhPracticeGrowth.preset(\'fy\')">This financial year</button></div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-left:auto">'
      + '<button type="button" class="btn btn-gold" style="background:linear-gradient(135deg,#ff8a00,#e52e71);color:#fff;border:0" onclick="bmhPracticeGrowth.generate()">🚀 Show report</button>'
      + '<button type="button" class="btn btn-outline btn-sm" onclick="bmhPracticeGrowth.generate(true)" title="Read the latest records again">↻ Latest data</button>'
      + '<button type="button" class="btn btn-outline btn-sm" onclick="bmhPracticeGrowth.print()">🖨 Print</button>'
      + '<button type="button" class="btn btn-outline btn-sm" onclick="bmhPracticeGrowth.csv()">⬇ CSV</button></div></div>'
      + row('Departments', DEPTS.map(function (d) { return box('dept', d[0], d[1], has(p.depts, d[0], true)); }).join(''))
      + row('Centres', box('centre', 'RPR', 'Rupnagar', has(p.centres, 'RPR', true)) + box('centre', 'CHD', 'Chandigarh', has(p.centres, 'CHD', true)))
      + row('Revenue streams', STREAMS.map(function (s) { return box('stream', s[0], s[1], has(p.streams, s[0], true)); }).join(''))
      + row('Surgery counting', '<label style="display:inline-flex;align-items:center;gap:4px;margin:2px 8px 2px 0;font-size:12px;white-space:nowrap;opacity:.8"><input type="checkbox" checked disabled> Completed OT entries</label>'
        + box('count', 'paid', 'Also pending OT entries with a surgery payment', !!p.countPaid) + box('count', 'cashless', 'Also pending OT entries with an ECHS / TPA claim', !!p.countCashless))
      + row('Show sections', SECTIONS.map(function (s) { return box('sec', s[0], s[1], has(p.sections, s[0], true)); }).join('')
        + '<span style="font-size:11px;white-space:nowrap"><a href="javascript:void(0)" onclick="bmhPracticeGrowth.allSections(true)">all</a> · <a href="javascript:void(0)" onclick="bmhPracticeGrowth.allSections(false)">none</a></span>')
      + '<div style="font-size:11px;color:var(--g1);margin-top:4px">Visible only on your login, behind your PIN. Ticks apply instantly and are remembered on this computer. Nothing is changed unless you press ✓ Mark OT completed, ↶ Undo or ✏️ Save.</div></div>';
  }
  function readOpts() {
    var f = document.getElementById('rep-growth-from'), t = document.getElementById('rep-growth-to');
    var cur = todayKey_().slice(0, 7);
    var from = (f && f.value) || addMonth(cur, -11), to = (t && t.value) || cur;
    if (from > to) { var x = from; from = to; to = x; }
    var vals = function (g) { return [].slice.call(document.querySelectorAll('#rep-growth input[data-pg="' + g + '"]:checked')).map(function (i) { return i.value; }); };
    var secs = {}; SECTIONS.forEach(function (s) { secs[s[0]] = false; }); vals('sec').forEach(function (k) { secs[k] = true; });
    var count = vals('count');
    var o = { from: from, to: to, depts: vals('dept'), centres: vals('centre'), streams: vals('stream'), countPaid: count.indexOf('paid') >= 0, countCashless: count.indexOf('cashless') >= 0, sections: secs };
    savePrefs({ depts: o.depts, centres: o.centres, streams: o.streams, countPaid: o.countPaid, countCashless: o.countCashless, sections: vals('sec') });
    return o;
  }
  function draw() {
    var out = document.getElementById('rep-growth-result');
    if (!out || !G.data || !isUnlocked()) return;
    var t0 = Date.now();
    var res = compute(G.data, readOpts());
    G.last = res;
    var html = render(res), cut = html.indexOf('<!--PG-HERO-END-->');
    var heroEl = document.getElementById('rep-growth-hero');
    if (heroEl && cut > 0) { heroEl.innerHTML = html.slice(0, cut); html = html.slice(cut); }
    out.innerHTML = html + '<div style="font-size:10.5px;color:var(--g3);text-align:right">Data read at ' + G.data.at.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' · worked out in ' + (Date.now() - t0) + ' ms</div>';
    updateLockBar();
  }
  function generate(force) {
    if (!allowed()) return;
    if (!isUnlocked()) { lockNow(); return; }
    var out = document.getElementById('rep-growth-result');
    if (!out) return;
    out.innerHTML = '<div style="text-align:center;padding:30px;color:var(--g1);font-size:13px">⏳ Reading records… <span id="rep-growth-prog"></span></div>';
    load(function (p) { var s = document.getElementById('rep-growth-prog'); if (s) s.textContent = typeof p === 'string' ? p : ''; }, force).then(draw).catch(function (e) {
      out.innerHTML = '<div style="text-align:center;padding:24px;color:#c0392b;font-size:13px">Could not read the records (' + esc(e && e.message || 'connection') + '). <button class="btn btn-outline btn-sm" onclick="bmhPracticeGrowth.generate(true)">Retry</button></div>';
    });
  }
  function refresh() { if (G.data) draw(); else readOpts(); }
  function preset(n) {
    var cur = todayKey_().slice(0, 7), f = document.getElementById('rep-growth-from'), t = document.getElementById('rep-growth-to');
    var from = n === 'fy' ? (Number(cur.slice(5)) >= 4 ? cur.slice(0, 4) : String(Number(cur.slice(0, 4)) - 1)) + '-04' : addMonth(cur, -(Number(n) - 1));
    if (f) f.value = from; if (t) t.value = cur;
    refresh();
  }

  // ── actions from the report (only these write, and only when you press them) ──
  function who() { var u = window.CURRENT_USER || {}; return String(u.name || u.username || 'Admin'); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function dbRef(path) { if (!window.FBDB || typeof window.FBDB.ref !== 'function') throw new Error('Not connected to the database'); return window.FBDB.ref(path); }
  function findRow(id) { return G.recon && G.recon.rows.filter(function (r) { return String(r.id) === String(id); })[0]; }
  function syncLocalOt(id, fields) {
    try {
      var list = (typeof OT_CASES !== 'undefined' && Array.isArray(OT_CASES)) ? OT_CASES : null;
      var c = list && list.filter(function (x) { return String(x.id) === String(id); })[0];
      if (c) Object.keys(fields).forEach(function (k) { if (fields[k] === null) delete c[k]; else c[k] = fields[k]; });
    } catch (e) {}
  }
  function rebuild() { G.recon = reconcile(G.data); draw(); }
  function markDone(id) {
    if (!allowed() || !isUnlocked()) { lockNow(); return; }
    var r = findRow(id); if (!r || r.done) return;
    var btn = document.getElementById('pg-mk-' + id);
    if (btn && btn.dataset.armed !== '1') {
      btn.dataset.armed = '1'; btn.textContent = 'Tap again to confirm'; btn.style.background = '#c0392b';
      setTimeout(function () { if (btn && btn.isConnected) { btn.dataset.armed = ''; btn.textContent = '✓ Mark OT completed'; btn.style.background = '#1a8c3c'; } }, 4000);
      return;
    }
    var now = new Date().toISOString();
    var setCompletedAt = !r.c.completedAt;
    var fields = { status: 'completed', lastUpdated: now, completedVia: 'practice-growth', completedBy: who(), completedMarkedAt: now };
    if (setCompletedAt) fields.completedAt = r.day + 'T12:00:00+05:30';
    if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }
    var prev = String(r.c.status || 'pending');
    var mark = { prevStatus: prev, setCompletedAt: setCompletedAt, otDate: r.day, bmhId: r.bmhId, patient: r.patient, by: who(), at: now };
    try {
      dbRef('practiceGrowth/otMarks/' + id).set(mark).then(function () {
        return dbRef('otCases/' + id).update(fields);
      }).then(function () {
        Object.assign(r.c, fields); syncLocalOt(id, fields);
        G.data.marks[id] = mark;
        toast((r.patient || 'Patient') + ' — OT marked completed ✓', 's');
        rebuild();
      }).catch(function (e) { toast('Could not save: ' + (e && e.message || 'error'), 'e'); if (btn) { btn.disabled = false; btn.textContent = '✓ Mark OT completed'; } });
    } catch (e) { toast(e.message, 'e'); }
  }
  function undoDone(id) {
    if (!allowed() || !isUnlocked()) { lockNow(); return; }
    var r = findRow(id), m = G.data && G.data.marks[id];
    if (!r || !m || r.c.completedVia !== 'practice-growth') return;
    var prev = m.prevStatus && m.prevStatus !== 'completed' ? m.prevStatus : 'pending';
    var fields = { status: prev, lastUpdated: new Date().toISOString(), completedVia: null, completedBy: null, completedMarkedAt: null };
    if (m.setCompletedAt) fields.completedAt = null;
    try {
      dbRef('otCases/' + id).update(fields).then(function () { return dbRef('practiceGrowth/otMarks/' + id).remove(); }).then(function () {
        Object.keys(fields).forEach(function (k) { if (fields[k] === null) delete r.c[k]; else r.c[k] = fields[k]; });
        syncLocalOt(id, fields);
        delete G.data.marks[id];
        toast('Undone — OT entry is back to ' + prev, 's');
        rebuild();
      }).catch(function (e) { toast('Could not undo: ' + (e && e.message || 'error'), 'e'); });
    } catch (e) { toast(e.message, 'e'); }
  }
  function editAmount(id) {
    if (!allowed() || !isUnlocked()) { lockNow(); return; }
    var r = findRow(id), el = document.getElementById('pg-amt-' + id);
    if (!r || !el) return;
    var curV = r.override != null ? r.override : caseValue(r);
    el.innerHTML = '<input type="number" min="0" step="100" id="pg-amt-in-' + id + '" value="' + Math.round(curV || 0) + '" style="width:90px;padding:2px 4px"> '
      + '<button type="button" class="btn btn-gold btn-xs" onclick="bmhPracticeGrowth.saveAmount(\'' + id + '\')">Save</button> '
      + (r.override != null ? '<button type="button" class="btn btn-outline btn-xs" onclick="bmhPracticeGrowth.saveAmount(\'' + id + '\',true)">Use found amount</button> ' : '')
      + '<button type="button" class="btn btn-outline btn-xs" onclick="bmhPracticeGrowth.refresh()">✕</button>';
    var inp = document.getElementById('pg-amt-in-' + id); if (inp) { inp.focus(); inp.select(); inp.onkeydown = function (e) { if (e.key === 'Enter') saveAmount(id); }; }
  }
  function saveAmount(id, clear) {
    if (!allowed() || !isUnlocked()) { lockNow(); return; }
    var inp = document.getElementById('pg-amt-in-' + id);
    var v = clear ? null : Math.round(Number(inp && inp.value));
    if (!clear && !(v >= 0)) { toast('Enter an amount', 'w'); return; }
    try {
      var ref = dbRef('practiceGrowth/amounts/' + id);
      (clear ? ref.remove() : ref.set({ amount: v, by: who(), at: new Date().toISOString() })).then(function () {
        if (clear) delete G.data.amounts[id]; else G.data.amounts[id] = { amount: v };
        toast(clear ? 'Amount reset to what was found' : 'Amount saved for this report ✓', 's');
        rebuild();
      }).catch(function (e) { toast('Could not save: ' + (e && e.message || 'error'), 'e'); });
    } catch (e) { toast(e.message, 'e'); }
  }

  // ── PIN lock ──────────────────────────────────────────────────────────────
  var UNLOCK_MS = 15 * 60 * 1000;
  var PIN_PATH = 'practiceGrowth/pin';
  function isUnlocked() { return G.unlockedUntil && Date.now() < G.unlockedUntil; }
  function hex(buf) { return [].map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join(''); }
  function derive(pin, saltHex, iter) {
    var enc = new TextEncoder();
    var salt = new Uint8Array(saltHex.match(/../g).map(function (h) { return parseInt(h, 16); }));
    return crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveBits']).then(function (key) {
      return crypto.subtle.deriveBits({ name: 'PBKDF2', salt: salt, iterations: iter, hash: 'SHA-256' }, key, 256);
    }).then(hex);
  }
  function readPin() { return getJson('/' + PIN_PATH + '.json', 15000); }
  function lockHtml(mode, msg) {
    var inp = function (id, ph) { return '<input type="password" inputmode="numeric" autocomplete="off" maxlength="8" id="' + id + '" placeholder="' + ph + '" style="font-size:20px;letter-spacing:6px;text-align:center;width:180px;padding:8px;border-radius:10px;border:2px solid #6b3fa0;margin:4px">'; };
    var body = mode === 'set'
      ? '<div style="font-size:13px;margin-bottom:8px">Choose a PIN of 4 to 8 digits for Practice Growth.</div>' + inp('pg-pin1', 'New PIN') + inp('pg-pin2', 'Repeat PIN')
        + '<div><button type="button" class="btn btn-gold" style="margin-top:8px;background:linear-gradient(135deg,#ff8a00,#e52e71);color:#fff;border:0" onclick="bmhPracticeGrowth.setPin()">Save PIN</button>'
        + (G.changingPin ? ' <button type="button" class="btn btn-outline btn-sm" style="margin-top:8px" onclick="bmhPracticeGrowth.cancelChange()">Cancel</button>' : '') + '</div>'
      : '<div style="font-size:13px;margin-bottom:8px">Enter your Practice Growth PIN.</div>' + inp('pg-pin', 'PIN')
        + '<div><button type="button" class="btn btn-gold" style="margin-top:8px;background:linear-gradient(135deg,#ff8a00,#e52e71);color:#fff;border:0" onclick="bmhPracticeGrowth.unlock()">🔓 Unlock</button></div>';
    return '<div style="max-width:420px;margin:30px auto;text-align:center;background:linear-gradient(135deg,#1A3C6E 0%,#6b3fa0 55%,#e52e71 100%);color:#fff;border-radius:18px;padding:22px;box-shadow:0 8px 24px rgba(107,63,160,.3)">'
      + '<div style="font-size:30px">🔒</div><div style="font-size:18px;font-weight:900;margin-bottom:6px">Practice Growth</div>'
      + '<div style="background:#fff;color:#111;border-radius:12px;padding:14px">' + body + '<div id="pg-pin-msg" style="font-size:12px;color:#c0392b;margin-top:6px;min-height:16px">' + esc(msg || '') + '</div></div>'
      + '<div style="font-size:11px;opacity:.85;margin-top:8px">Stays open for 15 minutes after unlocking.</div></div>';
  }
  function showLock(msg) {
    var lock = document.getElementById('rep-growth-lock'), main = document.getElementById('rep-growth-main');
    if (!lock || !main) return;
    main.style.display = 'none';
    var hero = document.getElementById('rep-growth-hero'), res = document.getElementById('rep-growth-result');
    if (hero && G.heroIdle) hero.innerHTML = G.heroIdle;
    if (res) res.innerHTML = '';
    lock.style.display = '';
    lock.innerHTML = '<div style="text-align:center;padding:30px;color:var(--g1)">Checking…</div>';
    readPin().then(function (pin) {
      G.pinRec = pin && pin.hash ? pin : null;
      lock.innerHTML = lockHtml(G.pinRec && !G.changingPin ? 'enter' : 'set', msg);
      var f = document.getElementById(G.pinRec && !G.changingPin ? 'pg-pin' : 'pg-pin1'); if (f) f.focus();
      [].slice.call(lock.querySelectorAll('input')).forEach(function (i) { i.onkeydown = function (e) { if (e.key === 'Enter') { if (G.pinRec && !G.changingPin) unlock(); else if (i.id === 'pg-pin1') document.getElementById('pg-pin2').focus(); else setPin(); } }; });
    }).catch(function () { lock.innerHTML = '<div style="text-align:center;padding:30px;color:#c0392b">Could not reach the database. <button class="btn btn-outline btn-sm" onclick="bmhPracticeGrowth.opened()">Retry</button></div>'; });
  }
  function showMain() {
    var lock = document.getElementById('rep-growth-lock'), main = document.getElementById('rep-growth-main');
    if (lock) { lock.style.display = 'none'; lock.innerHTML = ''; }
    if (main) main.style.display = '';
    updateLockBar();
  }
  function updateLockBar() {
    var bar = document.getElementById('rep-growth-lockbar');
    if (!bar) return;
    var t = new Date(G.unlockedUntil || 0);
    bar.innerHTML = '🔓 Unlocked until ' + t.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      + ' · <a href="javascript:void(0)" onclick="bmhPracticeGrowth.lock()">🔒 Lock now</a> · <a href="javascript:void(0)" onclick="bmhPracticeGrowth.changePin()">Change PIN</a>';
  }
  function pinMsg(m) { var el = document.getElementById('pg-pin-msg'); if (el) el.textContent = m; }
  function unlock() {
    if (G.waitUntil && Date.now() < G.waitUntil) { pinMsg('Too many tries — wait ' + Math.ceil((G.waitUntil - Date.now()) / 1000) + ' s'); return; }
    var v = (document.getElementById('pg-pin') || {}).value || '';
    if (!G.pinRec) { showLock(); return; }
    derive(v, G.pinRec.salt, Number(G.pinRec.iter) || 150000).then(function (h) {
      if (h === G.pinRec.hash) { G.tries = 0; G.unlockedUntil = Date.now() + UNLOCK_MS; showMain(); if (G.afterUnlock) { var fn = G.afterUnlock; G.afterUnlock = null; fn(); } }
      else { G.tries = (G.tries || 0) + 1; if (G.tries >= 5) { G.waitUntil = Date.now() + 60000; G.tries = 0; } pinMsg('Wrong PIN'); var f = document.getElementById('pg-pin'); if (f) { f.value = ''; f.focus(); } }
    }).catch(function () { pinMsg('This browser cannot check the PIN'); });
  }
  function setPin() {
    var a = (document.getElementById('pg-pin1') || {}).value || '', b = (document.getElementById('pg-pin2') || {}).value || '';
    if (!/^\d{4,8}$/.test(a)) { pinMsg('Use 4 to 8 digits'); return; }
    if (a !== b) { pinMsg('The two PINs do not match'); return; }
    if (G.pinRec && !G.changingPin) { pinMsg('A PIN is already set'); return; }
    var salt = hex(crypto.getRandomValues(new Uint8Array(16))), iter = 150000;
    derive(a, salt, iter).then(function (h) {
      return dbRef(PIN_PATH).set({ salt: salt, hash: h, iter: iter, setAt: new Date().toISOString(), setBy: who() });
    }).then(function () { G.changingPin = false; G.unlockedUntil = Date.now() + UNLOCK_MS; toast('PIN saved ✓', 's'); showMain(); })
      .catch(function (e) { pinMsg('Could not save the PIN: ' + (e && e.message || 'error')); });
  }
  function lockNow() { G.unlockedUntil = 0; G.changingPin = false; showLock(); }
  function changePin() { if (!isUnlocked()) { lockNow(); return; } G.changingPin = true; showLock(); }
  function checkExpiry() {
    var tab = document.getElementById('rep-growth');
    if (!tab) return;
    var main = document.getElementById('rep-growth-main');
    if (main && main.style.display !== 'none' && !isUnlocked()) lockNow();
  }
  function opened() { if (isUnlocked()) showMain(); else lockNow(); }

  // ── Reports → Surgery / Procedure → "💰 Total Eye" (PIN protected, read-only) ──
  var EYE = { xrefCache: {}, busy: false };
  function median(arr) { var a = arr.filter(function (x) { return x > 0; }).sort(function (x, y) { return x - y; }); return a.length ? a[Math.floor(a.length / 2)] : 0; }
  function eyeFee(centre, isNew, fallback) {
    try {
      var v = resolveConsultationChargeAmountForVisit({ centre: centre || 'RPR', dept: 'ophtho', purpose: isNew ? 'New Consultation' : 'Follow-up' });
      if (v > 0) return v;
    } catch (e) {}
    return fallback || 0;
  }
  // Cross-referrals live on each patient record, so they are read per patient and kept in this
  // browser (IndexedDB) — only patients seen again since the last check are read the next time.
  function xrefDb() {
    if (EYE._db) return EYE._db;
    EYE._db = new Promise(function (resolve) {
      try { var r = indexedDB.open('bmh-practice-growth', 1); r.onupgradeneeded = function () { r.result.createObjectStore('xref'); }; r.onsuccess = function () { resolve(r.result); }; r.onerror = function () { resolve(null); }; } catch (e) { resolve(null); }
    });
    return EYE._db;
  }
  function xrefLoadAll() {
    return xrefDb().then(function (db) {
      if (!db) return {};
      return new Promise(function (res) {
        var out = {};
        try {
          var cur = db.transaction('xref').objectStore('xref').openCursor();
          cur.onsuccess = function () { var c = cur.result; if (c) { out[c.key] = c.value; c.continue(); } else res(out); };
          cur.onerror = function () { res(out); };
        } catch (e) { res(out); }
      });
    });
  }
  function xrefSave(id, val) { return xrefDb().then(function (db) { if (!db) return; try { db.transaction('xref', 'readwrite').objectStore('xref').put(val, id); } catch (e) {} }); }
  function fetchCrossRefs(ids, lastSeen, onStep) {
    return (EYE.loadedIdb ? Promise.resolve({}) : xrefLoadAll()).then(function (stored) {
      Object.keys(stored).forEach(function (id) { if (!(id in EYE.xrefCache)) EYE.xrefCache[id] = stored[id]; });
      EYE.loadedIdb = true;
      var todo = ids.filter(function (id) { var c = EYE.xrefCache[id]; return !c || !c.at || (lastSeen[id] && lastSeen[id] >= String(c.at).slice(0, 10)); });
      var i = 0, done = 0;
      function worker() {
        if (i >= todo.length) return Promise.resolve();
        var id = todo[i++];
        return getJson('/patients/' + encodeURIComponent(id) + '/crossRefs.json', 10000).then(function (v) {
          var rec = { at: new Date().toISOString(), refs: (Array.isArray(v) ? v : Object.values(v || {})).filter(Boolean).map(function (x) { return { toDept: x.toDept || '', fromDept: x.fromDept || '', createdAt: x.createdAt || x.at || '', seenAt: x.seenAt || '', fee: x.fee, paid: x.paid }; }) };
          EYE.xrefCache[id] = rec; xrefSave(id, rec);
        }).catch(function () {}).then(function () { done++; if (onStep && done % 50 === 0) onStep(done + ' / ' + todo.length + ' patients checked for referrals (first time only)'); return worker(); });
      }
      var n = []; for (var k = 0; k < 16; k++) n.push(worker());
      return Promise.all(n);
    });
  }
  function eyeRange() {
    var f = (document.getElementById('rep-surg-from') || {}).value || '', t = (document.getElementById('rep-surg-to') || {}).value || '';
    var cur = todayKey_();
    var from = f || ((addMonth(cur.slice(0, 7), -11) < '2026-04' ? '2026-04' : addMonth(cur.slice(0, 7), -11)) + '-01');
    var to = t || cur;
    if (from > to) { var x = from; from = to; to = x; }
    return { from: from, to: to };
  }
  function computeEyeTotal(data, rg, onStep) {
    var inR = function (d) { return d && d >= rg.from && d <= rg.to; };
    var months = monthsBetween(rg.from.slice(0, 7), rg.to.slice(0, 7));
    var M = {};
    months.forEach(function (m) { M[m] = { newV: 0, fu: 0, opdPot: 0, opdPaid: 0, refN: 0, refPaidN: 0, refPot: 0, refPaid: 0, refOther: 0, refFree: 0, refSeen: 0, otN: 0, otDone: 0, otPot: 0, otPaid: 0, otEst: 0 }; });
    // OPD visits (eye) — potential at the standard fee, collected as received
    var paidAmts = { 'RPR|1': [], 'RPR|0': [], 'CHD|1': [], 'CHD|0': [] };
    var visits = {};
    data.txns.forEach(function (t) {
      var dk = deptKey(t.dept) || 'ophtho';
      if (dk !== 'ophtho') return;
      var svc = String(t.service || ''), day = String(t._day || dayOf(t.date || t.createdAt));
      var lines = txnLines(t);
      if (!lines.length || !lines.every(function (l) { return l.stream === 'opd'; }) || /cross[\s-]*ref/i.test(svc) || t.collected === false) return;
      var ck = centreKey(t.centre) || 'RPR', isNew = /\bnew\b/i.test(svc);
      var amt = Math.max(0, Number(t.amount || 0));
      if (amt > 0 && paidAmts[ck + '|' + (isNew ? 1 : 0)]) paidAmts[ck + '|' + (isNew ? 1 : 0)].push(amt);
      var vk = (t.bmhId || ('x' + t.id)) + '|' + day;
      var v = visits[vk] || (visits[vk] = { day: day, centre: ck, isNew: false, paid: 0 });
      if (isNew) v.isNew = true;
      v.paid += amt;
    });
    var fees = {};
    ['RPR', 'CHD'].forEach(function (c) { [1, 0].forEach(function (n) { fees[c + '|' + n] = eyeFee(c, !!n, median(paidAmts[c + '|' + n]) || median(paidAmts['RPR|' + n]) || 200); }); });
    Object.keys(visits).forEach(function (k) {
      var v = visits[k]; if (!inR(v.day)) return;
      var mm = M[v.day.slice(0, 7)];
      if (v.isNew) mm.newV++; else mm.fu++;
      mm.opdPot += Math.max(fees[v.centre + '|' + (v.isNew ? 1 : 0)] || 0, v.paid);
      mm.opdPaid += v.paid;
    });
    // Surgeries: every eye OT entry booked in the period (not cancelled / not a duplicate)
    var recon = G.recon || reconcile(data);
    var eyeRows = recon.rows.filter(function (r) { return r.dept === 'ophtho' && !r.cancelled && r.cls !== 'duplicate'; });
    var known = eyeRows.filter(function (r) { return r.override != null || r.paid + r.claim >= 5000; });
    var byIol = {}, byTier = {}, byGroup = {};
    known.forEach(function (r) {
      var v = caseValue(r);
      var io = iolName(r.c, data.catalog);
      if (io) { (byIol[io.name] = byIol[io.name] || []).push(v); var tr = iolTier(io.type, io.name); (byTier[tr] = byTier[tr] || []).push(v); }
      (byGroup[r.group] = byGroup[r.group] || []).push(v);
    });
    var allMed = median(known.map(caseValue)) || 18000;
    var surgRows = [];
    eyeRows.forEach(function (r) {
      if (!inR(r.day)) return;
      var mm = M[r.day.slice(0, 7)];
      var val, est = false;
      if (r.override != null) val = r.override;
      else if (r.paid + r.claim >= 5000) val = r.paid + r.claim;
      else if (r.echs && r.group === 'Cataract (IOL)') val = ECHS_CATARACT;
      else {
        est = true;
        var io = iolName(r.c, data.catalog);
        val = (io && median(byIol[io.name] || [])) || (io && median(byTier[iolTier(io.type, io.name)] || [])) || median(byGroup[r.group] || []) || allMed;
      }
      mm.otN++; if (r.done) mm.otDone++;
      mm.otPot += val; mm.otPaid += Math.min(val, r.paid + (r.claimStatus === 'received' ? r.claim : 0));
      if (est) mm.otEst++;
      surgRows.push({ r: r, val: val, est: est });
    });
    // Referrals to the eye department (psych and others), from the patients' cross-referral records
    var ids = {}, lastSeen = {};
    data.txns.forEach(function (t) { var d = String(t._day || ''); if (t.bmhId && inR(d) && (deptKey(t.dept) === 'psych' || /cross[\s-]*ref.*varun/i.test(String(t.service || '')))) { ids[t.bmhId] = true; if (!lastSeen[t.bmhId] || d > lastSeen[t.bmhId]) lastSeen[t.bmhId] = d; } });
    var refAmts = [];
    data.pr.forEach(function (p) { if (p.xref && /ophtho/.test(String(p.xrefDept || '')) && p.bmhId) { ids[p.bmhId] = true; if (Number(p.amount) > 0) refAmts.push(Number(p.amount)); } });
    var refFee = median(refAmts) || 200;
    return fetchCrossRefs(Object.keys(ids), lastSeen, onStep).then(function () {
      var refList = [];
      Object.keys(ids).forEach(function (id) {
        ((EYE.xrefCache[id] || {}).refs || []).forEach(function (x) {
          if (!/ophtho/.test(String(x.toDept || ''))) return;
          var d = dayOf(x.createdAt || x.at || x.seenAt);
          if (!inR(d)) return;
          var mm = M[d.slice(0, 7)];
          if (String(x.fromDept || '') !== 'psych') { mm.refOther++; return; }
          mm.refN++; mm.refPot += refFee;
          var paidRef = x.fee === true && x.paid === true;
          if (paidRef) { mm.refPaidN++; mm.refPaid += refFee; }
          if (x.fee !== true) mm.refFree = (mm.refFree || 0) + 1;
          if (x.seenAt) mm.refSeen = (mm.refSeen || 0) + 1;
          refList.push({ bmhId: id, day: d, paid: paidRef, fee: x.fee === true, seen: !!x.seenAt });
        });
      });
      return { months: months, M: M, fees: fees, refFee: refFee, surgRows: surgRows, refList: refList, rg: rg };
    });
  }
  function renderEyeTotal(res) {
    var M = res.M, months = res.months;
    var T = months.reduce(function (s, m) { Object.keys(M[m]).forEach(function (k) { s[k] = (s[k] || 0) + M[m][k]; }); return s; }, {});
    var tot = function (x) { return x.opdPot + x.refPot + x.otPot; }, got = function (x) { return x.opdPaid + x.refPaid + x.otPaid; };
    var rows = months.map(function (m) {
      var x = M[m];
      return [monthName(m), num(x.newV + x.fu), money(x.opdPot), num(x.refN), money(x.refPot), num(x.otN) + (x.otEst ? ' <span style="font-size:9.5px;color:var(--g1)">(' + x.otEst + ' est.)</span>' : ''), money(x.otPot), '<b>' + money(tot(x)) + '</b>', money(got(x)), '<span style="color:#c0392b">' + money(tot(x) - got(x)) + '</span>'];
    });
    rows.push(['Total', num(T.newV + T.fu), money(T.opdPot), num(T.refN), money(T.refPot), num(T.otN), money(T.otPot), money(tot(T)), money(got(T)), money(tot(T) - got(T))]);
    var heroBox = function (l, v, s) { return '<div style="flex:1;min-width:150px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);border-radius:14px;padding:12px 14px"><div style="font-size:10.5px;font-weight:800;text-transform:uppercase;opacity:.9">' + l + '</div><div style="font-size:22px;font-weight:900">' + v + '</div><div style="font-size:11px;opacity:.95">' + (s || '&nbsp;') + '</div></div>'; };
    var h = '<div style="background:linear-gradient(135deg,#1A3C6E 0%,#0e7490 60%,#22a06b 100%);color:#fff;border-radius:16px;padding:16px;margin-bottom:12px">'
      + '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px"><div style="font-size:17px;font-weight:900">👁️ Total Eye — value if everything were paid</div><div style="font-size:11.5px;opacity:.9">' + fmtDay(res.rg.from) + ' – ' + fmtDay(res.rg.to) + ' · both centres</div></div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">'
      + heroBox('Total Eye', money(tot(T)), 'collected ' + money(got(T)))
      + heroBox('Eye OPD', money(T.opdPot), num(T.newV + T.fu) + ' visits · collected ' + money(T.opdPaid))
      + heroBox('Referred from Psych', money(T.refPot), num(T.refN) + ' referrals · ' + num(T.refFree) + ' sent with no fee · ' + num(T.refPaidN) + ' paid')
      + heroBox('OT booked (eye)', money(T.otPot), num(T.otN) + ' cases · ' + num(T.otDone) + ' marked completed')
      + heroBox('Not yet collected', money(tot(T) - got(T)), pctTxt(got(T), tot(T)) + ' collected so far')
      + '</div></div>';
    h += '<div class="card" style="margin-bottom:12px"><div class="card-hd"><div class="card-title">💰 Total Eye — month by month</div></div>'
      + table(['Month', 'Eye OPD visits', 'OPD if all paid', 'Psych → Eye referrals', 'Referrals if all paid', 'OT booked (eye)', 'Surgeries if all paid', 'Total Eye', 'Collected', 'Difference'], rows, { boldLast: true })
      + '<div style="font-size:11px;color:var(--g1);margin-top:8px;line-height:1.5">'
      + '<b>OPD:</b> every eye OPD visit (including no-fee ones) valued at the standard fee — New ' + money(res.fees['RPR|1']) + ' / Follow-up ' + money(res.fees['RPR|0']) + ' at Rupnagar, New ' + money(res.fees['CHD|1']) + ' / Follow-up ' + money(res.fees['CHD|0']) + ' at Chandigarh. '
      + '<b>Referrals:</b> each Psychiatry → Eye cross-referral at ' + money(res.refFee) + ' (' + num(T.refSeen) + ' of ' + num(T.refN) + ' marked seen by Eye; referrals from other departments: ' + num(T.refOther) + ', not included). '
      + '<b>Surgeries:</b> every eye OT entry booked in the month (completed or pending — pending ones may include patients who did not come; cancelled and duplicate entries left out), at the amount found or edited in Practice Growth; ECHS cataracts at ' + money(ECHS_CATARACT) + '; where nothing is billed yet, the usual amount for that IOL (or that type of surgery) from your own billing — shown as "est.". '
      + '<b>Collected</b> = consultation fees received + referral fees paid + surgery payments and received claims.</div></div>';
    var est = res.surgRows.filter(function (s) { return s.est; }).sort(function (a, b) { return String(b.r.day).localeCompare(String(a.r.day)); });
    var bySurg = {};
    res.surgRows.forEach(function (s) { var g = s.r.group; var o = bySurg[g] || (bySurg[g] = { n: 0, v: 0 }); o.n++; o.v += s.val; });
    h += '<div class="card" style="margin-bottom:12px"><div class="card-hd"><div class="card-title">⚕️ Eye OT bookings by surgery</div></div>'
      + table(['Surgery', 'Cases', 'Value if all paid', 'Average'], Object.keys(bySurg).sort(function (a, b) { return bySurg[b].v - bySurg[a].v; }).map(function (g) { return [esc(g), num(bySurg[g].n), money(bySurg[g].v), money(bySurg[g].v / bySurg[g].n)]; }))
      + (est.length ? '<div style="font-size:11px;font-weight:800;color:var(--g1);margin-top:10px">Cases valued by estimate (nothing billed yet) — ' + num(est.length) + '</div>'
        + table(['Date', 'Patient', 'Procedure', 'IOL', 'OT status', 'Estimated'], est.slice(0, 200).map(function (s) {
          return [fmtDay(s.r.day), ptLink(s.r.bmhId, s.r.patient), esc(s.r.proc).slice(0, 50), esc(String(s.r.c.iolType || s.r.c.iol || '–')).slice(0, 30), s.r.done ? 'Completed' : esc(s.r.status), money(s.val)];
        }), { leftCols: 5, wrap: true }) + (est.length > 200 ? '<div style="font-size:11px;color:var(--g1)">Showing the latest 200.</div>' : '') : '')
      + '</div>';
    return h;
  }
  function eyeTotalGenerate() {
    var el = document.getElementById('rep-surgery-result');
    if (!el) return;
    if (!allowed()) { el.innerHTML = ''; return; }
    if (!isUnlocked()) {
      el.innerHTML = '<div style="text-align:center;padding:24px;color:var(--g1)">Checking…</div>';
      readPin().then(function (pin) {
        G.pinRec = pin && pin.hash ? pin : null;
        if (!G.pinRec) { el.innerHTML = '<div class="card" style="padding:16px;text-align:center">Set your PIN first in <b>🚀 Practice Growth</b>, then come back.</div>'; return; }
        G.afterUnlock = eyeTotalGenerate;
        el.innerHTML = lockHtml('enter');
        var f = document.getElementById('pg-pin'); if (f) { f.focus(); f.onkeydown = function (e) { if (e.key === 'Enter') unlock(); }; }
      }).catch(function () { el.innerHTML = '<div class="card" style="padding:16px;color:#c0392b">Could not reach the database.</div>'; });
      return;
    }
    if (EYE.busy) return;
    EYE.busy = true;
    el.innerHTML = '<div class="card" style="padding:18px;text-align:center;color:var(--g1);font-size:13px">⏳ Working out Total Eye… <span id="pg-eye-prog"></span></div>';
    var step = function (p) { var s = document.getElementById('pg-eye-prog'); if (s) s.textContent = typeof p === 'string' ? p : ''; };
    load(step).then(function (data) { return computeEyeTotal(data, eyeRange(), step); }).then(function (res) {
      EYE.last = res;
      if (isUnlocked()) el.innerHTML = renderEyeTotal(res);
    }).catch(function (e) {
      el.innerHTML = '<div class="card" style="padding:16px;color:#c0392b">Could not work out Total Eye (' + esc(e && e.message || 'error') + ').</div>';
    }).finally(function () { EYE.busy = false; });
  }
  function eyeTotalPrint(openOnly) {
    if (!EYE.last || !isUnlocked()) { eyeTotalGenerate(); return; }
    var w = window.open('', '_blank', openOnly ? 'width=1200,height=800' : '');
    if (!w) { toast('Please allow pop-ups', 'w'); return; }
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Total Eye</title><style>:root{--g1:#555;--g3:#999;--g4:#ccc;--g5:#e5e5e5;--g6:#f6f6f6}body{font-family:Arial,sans-serif;margin:14px;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact}.card{border:1px solid #ddd;border-radius:8px;padding:10px;margin-bottom:10px}.card-title{font-weight:800;font-size:13px;margin-bottom:6px}table{font-size:10px}a{color:inherit;text-decoration:none}@page{size:A4 landscape;margin:10mm}</style></head><body><h2 style="margin:0 0 6px">Baweja Multispeciality Hospital — Total Eye</h2>' + renderEyeTotal(EYE.last) + '</body></html>');
    w.document.close();
    if (!openOnly) setTimeout(function () { w.focus(); w.print(); }, 400);
  }
  function ensureEyeOption() {
    var sel = document.getElementById('rep-surg-source');
    if (!sel) return;
    var opt = sel.querySelector('option[value="eye-total"]');
    if (!allowed()) {
      if (opt) { if (sel.value === 'eye-total') { sel.value = 'ot'; var el = document.getElementById('rep-surgery-result'); if (el) el.innerHTML = ''; } opt.remove(); }
      return;
    }
    if (!opt) { opt = document.createElement('option'); opt.value = 'eye-total'; opt.textContent = '💰 Total Eye'; sel.appendChild(opt); }
    if (!window._bmhEyeTotalWrapped) {
      var wrap = function (name, mine) {
        var orig = window[name];
        if (typeof orig !== 'function') return;
        window[name] = function () {
          var s = document.getElementById('rep-surg-source');
          if (s && s.value === 'eye-total') return mine();
          return orig.apply(this, arguments);
        };
      };
      wrap('generateSurgeryReport', eyeTotalGenerate);
      wrap('openSurgeryReportWindow', function () { eyeTotalPrint(true); });
      wrap('printSurgeryReportCurrent', function () { eyeTotalPrint(false); });
      window._bmhEyeTotalWrapped = true;
    }
  }

  // ── tab wiring ────────────────────────────────────────────────────────────
  function ensureStyle() {
    if (document.getElementById('rep-growth-style')) return;
    var st = document.createElement('style');
    st.id = 'rep-growth-style';
    st.textContent = '#rep-growth-tab{background:linear-gradient(135deg,#ff8a00,#e52e71)!important;color:#fff!important;font-weight:800!important;border-radius:10px!important;box-shadow:0 2px 10px rgba(229,46,113,.35);animation:bmhPgGlow 2.4s ease-in-out infinite}'
      + '#rep-growth-tab.active{background:linear-gradient(135deg,#1A3C6E,#6b3fa0)!important;animation:none}'
      + '@keyframes bmhPgGlow{0%,100%{box-shadow:0 2px 10px rgba(229,46,113,.35)}50%{box-shadow:0 2px 18px rgba(255,138,0,.65)}}';
    document.head.appendChild(st);
  }
  function ensureTab() {
    var page = document.getElementById('pg-reports');
    if (!page) return;
    var tab = document.getElementById('rep-growth-tab');
    if (!allowed()) {
      if (tab) { var c0 = document.getElementById('rep-growth'); if (tab.classList.contains('active')) { var first = page.querySelector('.ptabs .ptab:not(#rep-growth-tab)'); if (first) first.click(); } tab.remove(); if (c0) c0.remove(); }
      return;
    }
    if (tab) return;
    var bar = page.querySelector('.ptabs');
    var anyContent = page.querySelector('.tab-content');
    if (!bar || !anyContent) return;
    ensureStyle();
    tab = document.createElement('div');
    tab.className = 'ptab';
    tab.id = 'rep-growth-tab';
    tab.setAttribute('onclick', "ptab(this,'rep-growth');bmhPracticeGrowth.opened()");
    tab.textContent = '🚀 Practice Growth';
    bar.insertBefore(tab, bar.firstChild);
    var content = document.createElement('div');
    content.className = 'tab-content';
    content.id = 'rep-growth';
    G.heroIdle = '<div style="background:linear-gradient(135deg,#1A3C6E 0%,#6b3fa0 55%,#e52e71 100%);color:#fff;border-radius:16px;padding:18px;margin-bottom:12px"><div style="font-size:18px;font-weight:900">🚀 Practice Growth</div><div style="font-size:12px;opacity:.9;margin-top:4px">Revenue, OPD, new patients, surgeries, IOLs, conversion and a growth plan — tick the options below and press Show report.</div></div>';
    content.innerHTML = '<div id="rep-growth-lock"></div><div id="rep-growth-main" style="display:none"><div id="rep-growth-lockbar" style="text-align:right;font-size:11.5px;margin-bottom:6px"></div><div id="rep-growth-hero"><div style="background:linear-gradient(135deg,#1A3C6E 0%,#6b3fa0 55%,#e52e71 100%);color:#fff;border-radius:16px;padding:18px;margin-bottom:12px"><div style="font-size:18px;font-weight:900">🚀 Practice Growth</div><div style="font-size:12px;opacity:.9;margin-top:4px">Revenue, OPD, new patients, surgeries, IOLs, conversion and a growth plan — tick the options below and press Show report.</div></div></div>'
      + optionsHtml() + '<div id="rep-growth-result"><div style="text-align:center;padding:30px;color:var(--g1);font-size:13px">Press <b>🚀 Show report</b> to read the figures (takes a few seconds the first time).</div></div></div>';
    anyContent.parentNode.appendChild(content);
  }

  window.bmhPracticeGrowth = {
    generate: generate, refresh: refresh, preset: preset, print: printReport,
    opened: opened, lock: lockNow, unlock: unlock, setPin: setPin, changePin: changePin, cancelChange: function () { G.changingPin = false; if (isUnlocked()) showMain(); else lockNow(); },
    markDone: markDone, undoDone: undoDone, editAmount: editAmount, saveAmount: saveAmount,
    csv: function () { if (G.last) csv(G.last); else { try { showToast('Show the report first', 'i'); } catch (e) {} } },
    otFilter: function (k) { G.otFilter = k; draw(); },
    allSections: function (v) { [].slice.call(document.querySelectorAll('#rep-growth input[data-pg="sec"]')).forEach(function (i) { i.checked = v; }); refresh(); },
    compute: compute, load: load, txnLines: txnLines, iolName: iolName, reconcile: reconcile, plan: plan
  };
  function tick() { try { ensureTab(); checkExpiry(); ensureEyeOption(); checkEyeExpiry(); } catch (e) {} }
  function checkEyeExpiry() { if (EYE.last && !isUnlocked()) { var s = document.getElementById('rep-surg-source'), el = document.getElementById('rep-surgery-result'); EYE.last = null; if (s && s.value === 'eye-total' && el) el.innerHTML = ''; } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick); else tick();
  setInterval(tick, 3000);
})();
