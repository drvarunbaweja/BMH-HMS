/* BMH — IPD phase 3: in-patient prescription (medicine chart) and nurse administration.
 * Only for admitted (IPD) patients; the OPD prescriptions are not touched.
 *  • "💊 IPD medicines" (patient screen, doctor screen, monitoring sheet): add / stop medicines, or apply a template.
 *    Each start / stop is written to the doctor's side of the progress notes.
 *  • Monitoring sheet "Medicines due today": nurse taps Give → PIN → the dose is ticked on the chart and a line is
 *    added to the nursing side of the progress notes.
 *  • "Treatment chart" page in Print IPD file: drugs × dates × 8 am / 2 pm / 8 pm (+ other times), ticked with time and initials.
 * Data lives on the same IPD admission record: ipdRx[], medAdmin[], doctorNotes[] (plus notes[] lines).
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function pts() { try { return window.IPD_PATIENTS || IPD_PATIENTS || []; } catch (e) { return window.IPD_PATIENTS || []; } }
  function findPt(id) { return pts().find(function (x) { return x && x.id === id; }) || null; }
  function userName() { try { return (CURRENT_USER && CURRENT_USER.name) || 'Doctor'; } catch (e) { return 'Doctor'; } }
  function dayKey(v) { try { return localDateKey(v); } catch (e) { var d = new Date(v); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } }
  function today() { return dayKey(new Date()); }
  function addDays(key, n) { var d = new Date(key + 'T12:00:00'); d.setDate(d.getDate() + n); return dayKey(d); }
  function fmtDay(key) { var m = String(key || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3] + '/' + m[2] : key; }
  function hhmm(iso) { var d = new Date(iso); return isNaN(d) ? '' : String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  function initials(n) { return (String(n || '').replace(/^(sister|sr\.?|staff nurse|nurse|dr\.?|mr\.?|ms\.?|mrs\.?)\s+/i, '').split(/\s+/)[0] || '').slice(0, 9); }
  // A dose time on the day the medicine was prescribed counts only if it is after the time it was prescribed.
  function slotApplies(r, d, s) {
    if (!r || !r.addedAt || d !== r.start || dayKey(r.addedAt) !== d) return true;
    return s >= hhmm(r.addedAt).slice(0, 2) + ':00';
  }
  function uid() { return 'RX' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }

  var ROUTES = ['IV', 'IM', 'SC', 'Oral', 'IV infusion', 'PR', 'PV', 'Topical', 'Eye drop', 'Inhaled', 'Nebulisation', 'Other'];
  var FREQ = {
    'OD (once daily)': ['08:00'], 'BD (twice daily)': ['08:00', '20:00'], 'TDS (three times)': ['08:00', '14:00', '20:00'],
    'QID (four times)': ['06:00', '12:00', '18:00', '22:00'], '6-hourly': ['06:00', '12:00', '18:00', '00:00'],
    '8-hourly': ['06:00', '14:00', '22:00'], '12-hourly': ['08:00', '20:00'], 'HS (bedtime)': ['21:00'],
    'SOS (when needed)': [], 'Stat (once now)': [], 'Continuous / drip': []
  };
  var TEMPLATES = [
    { name: 'Post LSCS — standard', items: [
      ['Inj Ceftriaxone', '1 g', 'IV', 'BD (twice daily)', 3, 'Injectable'], ['Inj Metrogyl', '100 ml', 'IV infusion', '8-hourly', 3, 'Injectable'],
      ['Inj Gentamicin', '80 mg', 'IV', '12-hourly', 3, 'Injectable'], ['Inj Rantac', '50 mg', 'IV', 'BD (twice daily)', 3, 'Injectable'],
      ['Inj Voveran', '75 mg', 'IM', 'SOS (when needed)', 2, 'Injectable'], ['RL', '500 ml', 'IV infusion', 'Continuous / drip', 1, 'IV fluids'],
      ['DNS', '500 ml', 'IV infusion', 'Continuous / drip', 1, 'IV fluids'],
      ['Tab Cefixime', '200 mg', 'Oral', 'BD (twice daily)', 5, 'Oral'], ['Tab Metrogyl', '400 mg', 'Oral', 'TDS (three times)', 5, 'Oral'],
      ['Tab Aceclofenac + Paracetamol', '1 tab', 'Oral', 'BD (twice daily)', 5, 'Oral'], ['Tab Chymoral Forte', '1 tab', 'Oral', 'TDS (three times)', 5, 'Oral'],
      ['Tab Rantac', '150 mg', 'Oral', 'BD (twice daily)', 5, 'Oral']] },
    { name: 'Post normal delivery', items: [
      ['Tab Cefixime', '200 mg', 'Oral', 'BD (twice daily)', 5, 'Oral'], ['Tab Paracetamol', '650 mg', 'Oral', 'TDS (three times)', 3, 'Oral'],
      ['Tab Iron + Folic acid', '1 tab', 'Oral', 'OD (once daily)', 30, 'Oral'], ['Tab Calcium', '500 mg', 'Oral', 'BD (twice daily)', 30, 'Oral']] },
    { name: 'Post hysterectomy', items: [
      ['Inj Ceftriaxone', '1 g', 'IV', 'BD (twice daily)', 3, 'Injectable'], ['Inj Metrogyl', '100 ml', 'IV infusion', '8-hourly', 3, 'Injectable'],
      ['Inj Pantoprazole', '40 mg', 'IV', 'OD (once daily)', 3, 'Injectable'], ['Inj Paracetamol', '1 g', 'IV infusion', '8-hourly', 2, 'Injectable'],
      ['Inj Ondansetron', '4 mg', 'IV', 'SOS (when needed)', 2, 'Injectable'], ['RL', '500 ml', 'IV infusion', 'Continuous / drip', 1, 'IV fluids']] }
  ];
  function groupFor(route, name) {
    if (/infusion|drip/i.test(route) && /^(rl|ns|dns|d5|d10|ringer|normal saline)/i.test(name)) return 'IV fluids';
    if (/^(iv|im|sc|iv infusion)$/i.test(route) || /^inj/i.test(name)) return 'Injectable';
    if (/oral/i.test(route) || /^(tab|cap|syp)/i.test(name)) return 'Oral';
    return 'Other';
  }
  function active(p, key) { key = key || today(); return (p.ipdRx || []).filter(function (r) { return r && r.start <= key && (!r.stop || r.stop >= key) && !r.cancelled; }); }
  function given(p, rxId, key, slot) { return (p.medAdmin || []).find(function (a) { return a.rxId === rxId && a.date === key && a.slot === slot; }); }
  function save(p, patch) { try { return bmhUpdateActiveIpdAdmission(p.id, patch); } catch (e) { return Promise.reject(e); } }
  function docNote(p, text) {
    if (!Array.isArray(p.doctorNotes)) p.doctorNotes = [];
    p.doctorNotes.unshift({ at: new Date().toISOString(), by: userName(), text: text });
  }
  function rxLine(r) { return [r.name, r.dose, r.route, r.freq ? r.freq.replace(/\s*\(.*\)$/, '') : ''].filter(Boolean).join(' '); }

  // ── prescription modal (doctor) ──
  function drugOptions() {
    try {
      var lib = typeof DRUG_LIBRARY !== 'undefined' ? DRUG_LIBRARY : [];
      var seen = {};
      return lib.map(function (d) {
        var t = String(d.trade || d.name || '').trim(); if (!t) return '';
        var type = String(d.type || '').toLowerCase();
        var pre = /tablet/.test(type) ? 'Tab ' : /capsule/.test(type) ? 'Cap ' : /injection/.test(type) ? 'Inj ' : /syrup/.test(type) ? 'Syp ' : '';
        var v = pre + t; if (seen[v]) return ''; seen[v] = 1;
        return '<option value="' + esc(v) + '">' + esc(d.generic || '') + '</option>';
      }).join('');
    } catch (e) { return ''; }
  }
  function customTemplates() { try { return JSON.parse(localStorage.getItem('bmh_ipd_rx_tpl') || '[]'); } catch (e) { return []; } }
  var cloudTpl = null;
  function loadCloudTpl() {
    if (cloudTpl || !window.FBDB) return Promise.resolve(cloudTpl || []);
    return window.FBDB.ref('ipdRxTemplates').once('value').then(function (s) { var v = s.val() || {}; cloudTpl = Object.keys(v).map(function (k) { return Object.assign({ key: k }, v[k]); }); return cloudTpl; }).catch(function () { return []; });
  }
  function allTemplates() { return TEMPLATES.concat(cloudTpl || []); }

  function listHtml(p) {
    var list = (p.ipdRx || []).filter(function (r) { return !r.cancelled; });
    if (!list.length) return '<div style="font-size:12px;color:var(--g1);padding:8px 0">No IPD medicines yet. Add below or apply a template.</div>';
    var t = today();
    return '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr style="background:var(--g6)"><th style="text-align:left;padding:5px">Medicine</th><th style="text-align:left;padding:5px">Times</th><th style="text-align:left;padding:5px">From → to</th><th></th></tr></thead><tbody>'
      + list.map(function (r) {
        var stopped = r.stop && r.stop < t;
        return '<tr style="border-bottom:1px solid var(--g5);' + (stopped ? 'opacity:.5' : '') + '"><td style="padding:5px"><b>' + esc(r.name) + '</b> ' + esc([r.dose, r.route].filter(Boolean).join(' · ')) + '<div style="font-size:10.5px;color:var(--g1)">' + esc(r.freq || '') + (r.note ? ' · ' + esc(r.note) : '') + ' · by ' + esc(r.addedBy || '') + '</div></td>'
          + '<td style="padding:5px">' + esc((r.times || []).join(', ') || (/sos/i.test(r.freq) ? 'when needed' : /stat/i.test(r.freq) ? 'once' : 'running')) + '</td>'
          + '<td style="padding:5px">' + esc(fmtDay(r.start)) + ' → ' + (r.stop ? esc(fmtDay(r.stop)) : 'ongoing') + '</td>'
          + '<td style="padding:5px;text-align:right">' + (stopped ? '<span style="font-size:10.5px">stopped</span>' : '<button class="btn btn-xs btn-gray" onclick="bmhIpdRxStop(\'' + esc(p.id) + '\',\'' + esc(r.id) + '\')">Stop</button>') + '</td></tr>';
      }).join('') + '</tbody></table>';
  }
  function refreshModal(p) { var l = document.getElementById('ipdm-rx-list'); if (l) l.innerHTML = listHtml(p); }
  function afterChange(p) {
    refreshModal(p);
    try { if (document.getElementById('ipd-monitor-body') && document.getElementById('m-ipd-monitor') && document.getElementById('m-ipd-monitor').classList.contains('open')) renderIPDMonitoringSheet(p.id); } catch (e) {}
    try { openIPDPatient(p.id); } catch (e) {}
  }
  function makeRx(name, dose, route, freq, times, start, days, note, group) {
    var stop = /stat/i.test(freq) ? start : addDays(start, Math.max(1, Number(days) || 1) - 1);
    return { id: uid(), name: name, dose: dose, route: route, freq: freq, times: times, start: start, stop: stop, note: note || '', group: group || groupFor(route, name), addedBy: userName(), addedAt: new Date().toISOString() };
  }
  window.bmhIpdRxStop = function (id, rxId) {
    var p = findPt(id); if (!p) return;
    var r = (p.ipdRx || []).find(function (x) { return x.id === rxId; }); if (!r) return;
    if (!window.confirm('Stop ' + r.name + ' from today?')) return;
    var t = today();
    if (r.start > t) r.cancelled = true; else r.stop = addDays(t, -0);
    r.stoppedBy = userName(); r.stoppedAt = new Date().toISOString();
    docNote(p, 'Rx stopped: ' + rxLine(r));
    save(p, { ipdRx: p.ipdRx, doctorNotes: p.doctorNotes }).catch(function () {});
    afterChange(p);
  };
  // ── OPD-style prescription editor for the IPD chart ──
  var EXTRA_FREQ = ['6-hourly', '8-hourly', '12-hourly', 'Stat (once now)', 'Continuous / drip'];
  function freqList() { var f = []; try { f = RX_FREQ_OPTIONS.slice(); } catch (e) { f = ['Once daily (OD)', 'Twice daily (BD)', 'Three times daily (TDS)', 'Four times daily (QID)', 'At bedtime (HS)', 'As needed (PRN)']; } return f.concat(EXTRA_FREQ); }
  function durList() { try { return RX_DURATION_OPTIONS.slice(); } catch (e) { return ['1 day', '2 days', '3 days', '5 days', '7 days', '10 days', '2 weeks', '1 month', 'Ongoing']; } }
  function typeList() { var t = []; try { t = RX_TYPE_OPTIONS.slice(); } catch (e) { t = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Other']; } if (t.indexOf('IV Fluid') < 0) t.splice(t.indexOf('Injection') + 1, 0, 'IV Fluid'); return t; }
  var OLDFREQ = { 'OD (once daily)': 'Once daily (OD)', 'BD (twice daily)': 'Twice daily (BD)', 'TDS (three times)': 'Three times daily (TDS)', 'QID (four times)': 'Four times daily (QID)', 'HS (bedtime)': 'At bedtime (HS)', 'SOS (when needed)': 'As needed (PRN)' };
  function normFreq(f) { return OLDFREQ[f] || f || 'Once daily (OD)'; }
  function timesFor(freq) {
    var f = String(freq || '').toLowerCase();
    if (/prn|as needed|sos|stat|continuous|drip/.test(f)) return [];
    if (/half-hourly|every 30/.test(f)) return [];
    if (/^hourly/.test(f)) return ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    if (/every 2 hours/.test(f)) return ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    if (/every 3 hours/.test(f)) return ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    if (/every 4 hours|six times|6x/.test(f)) return ['06:00', '10:00', '14:00', '18:00', '22:00', '02:00'];
    if (/6-hourly/.test(f)) return ['06:00', '12:00', '18:00', '00:00'];
    if (/8-hourly/.test(f)) return ['06:00', '14:00', '22:00'];
    if (/12-hourly/.test(f)) return ['08:00', '20:00'];
    if (/qid|four times/.test(f)) return ['06:00', '12:00', '18:00', '22:00'];
    if (/tds|three times/.test(f)) return ['08:00', '14:00', '20:00'];
    if (/bd|twice/.test(f)) return ['08:00', '20:00'];
    if (/hs|bedtime/.test(f)) return ['21:00'];
    return ['08:00'];
  }
  function routeFromType(type, name) {
    var t = String(type || '').toLowerCase();
    if (/iv fluid/.test(t)) return 'IV infusion';
    if (/injection/.test(t) || /^inj/i.test(name)) return 'IV';
    if (/tablet|capsule|syrup/.test(t)) return 'Oral';
    if (/eye/.test(t)) return 'Eye drop';
    if (/pessary/.test(t)) return 'PV';
    if (/ointment|cream|gel|lotion/.test(t)) return 'Topical';
    return 'Oral';
  }
  function typeFromName(name) { var n = String(name || ''); return /^inj/i.test(n) ? 'Injection' : /^(rl|ns|dns|d5|d10|ringer)/i.test(n) ? 'IV Fluid' : /^cap/i.test(n) ? 'Capsule' : /^syp/i.test(n) ? 'Syrup' : 'Tablet'; }
  function daysToDur(d) { d = Number(d) || 1; return d === 1 ? '1 day' : d < 7 ? d + ' days' : d === 7 ? '7 days' : d === 10 ? '10 days' : d === 14 ? '2 weeks' : d === 30 ? '1 month' : d + ' days'; }
  function durToDays(dur) { if (/ongoing/i.test(dur || '')) return 0; try { return Math.max(1, Math.round(durationLabelToDays(dur))); } catch (e) { var m = String(dur || '').match(/(\d+)/); return m ? +m[1] : 1; } }
  function libHit(name) {
    try {
      var n = String(name || '').replace(/^(tab|cap|inj|syp)\.?\s+/i, '').trim().toLowerCase();
      return (typeof DRUG_LIBRARY !== 'undefined' ? DRUG_LIBRARY : []).find(function (d) { return String(d.trade || '').toLowerCase() === n; }) || null;
    } catch (e) { return null; }
  }
  var draft = [];  // rows being prepared in the editor
  function draftRow(o) {
    var name = o.name || '', type = o.type || typeFromName(name), hit = libHit(name);
    if (hit && !o.type) type = hit.type || type;
    return { name: name, generic: o.generic || (hit && hit.generic) || '', type: type, route: o.route || routeFromType(type, name), dose: o.dose || '', freq: normFreq(o.freq), dur: o.dur || '3 days', start: o.start || today(), note: o.note || '' };
  }
  function opts(list, sel) { return list.map(function (x) { return '<option' + (x === sel ? ' selected' : '') + '>' + esc(x) + '</option>'; }).join(''); }
  function draftHtml() {
    if (!draft.length) return '<div style="font-size:12px;color:var(--g1);padding:8px 2px">Search a medicine above and press Enter, or pick a template. Rows appear here — check them, then add to the chart.</div>';
    var routes = ROUTES.slice();
    return '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:11.5px;min-width:820px"><thead><tr style="background:var(--g6)">'
      + ['#', 'Medicine', 'Type', 'Route', 'Dose', 'Frequency', 'Duration', 'From', ''].map(function (h) { return '<th style="text-align:left;padding:5px">' + h + '</th>'; }).join('') + '</tr></thead><tbody>'
      + draft.map(function (r, i) {
        var st = 'style="width:100%;font-size:11.5px;padding:3px 4px"';
        return '<tr style="border-bottom:1px solid var(--g5)"><td style="padding:4px">' + (i + 1) + '</td>'
          + '<td style="padding:4px;min-width:170px"><input ' + st + ' value="' + esc(r.name) + '" onchange="bmhIpdDraftSet(' + i + ',\'name\',this.value)"><div style="font-size:10px;color:var(--g1)">' + esc(r.generic) + '</div></td>'
          + '<td style="padding:4px"><select ' + st + ' onchange="bmhIpdDraftSet(' + i + ',\'type\',this.value)">' + opts(typeList(), r.type) + '</select></td>'
          + '<td style="padding:4px"><select ' + st + ' onchange="bmhIpdDraftSet(' + i + ',\'route\',this.value)">' + opts(routes.indexOf(r.route) < 0 ? routes.concat([r.route]) : routes, r.route) + '</select></td>'
          + '<td style="padding:4px;width:80px"><input ' + st + ' value="' + esc(r.dose) + '" placeholder="1 g" onchange="bmhIpdDraftSet(' + i + ',\'dose\',this.value)"></td>'
          + '<td style="padding:4px"><select ' + st + ' onchange="bmhIpdDraftSet(' + i + ',\'freq\',this.value)">' + opts(freqList().indexOf(r.freq) < 0 ? freqList().concat([r.freq]) : freqList(), r.freq) + '</select></td>'
          + '<td style="padding:4px"><select ' + st + ' onchange="bmhIpdDraftSet(' + i + ',\'dur\',this.value)">' + opts(durList().indexOf(r.dur) < 0 ? durList().concat([r.dur]) : durList(), r.dur) + '</select></td>'
          + '<td style="padding:4px;width:120px"><input type="date" ' + st + ' value="' + esc(r.start) + '" onchange="bmhIpdDraftSet(' + i + ',\'start\',this.value)"></td>'
          + '<td style="padding:4px"><button class="btn btn-xs btn-gray" onclick="bmhIpdDraftDel(' + i + ')">✕</button></td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  function renderDraft() { var el = document.getElementById('ipdm-rx-draft'); if (el) el.innerHTML = draftHtml(); var b = document.getElementById('ipdm-rx-commit'); if (b) { b.textContent = '✅ Add ' + draft.length + ' medicine' + (draft.length === 1 ? '' : 's') + ' to the chart'; b.disabled = !draft.length; } }
  window.bmhIpdDraftSet = function (i, k, v) {
    var r = draft[i]; if (!r) return; r[k] = v;
    if (k === 'type') r.route = routeFromType(v, r.name);
    if (k === 'name') { var h = libHit(v); if (h) { r.generic = h.generic || ''; r.type = h.type || r.type; r.route = routeFromType(r.type, v); renderDraft(); } }
  };
  window.bmhIpdDraftDel = function (i) { draft.splice(i, 1); renderDraft(); };
  function addFromSearch() {
    var inp = document.getElementById('ipdm-rx-search'); if (!inp) return;
    var v = String(inp.value || '').trim(); if (!v) return;
    draft.push(draftRow({ name: v })); inp.value = ''; renderDraft();
  }
  window.bmhIpdRxOpen = function (id) {
    var p = findPt(id); if (!p) return;
    draft = [];
    var old = document.getElementById('ipdm-rx-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'ipdm-rx-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,20,40,.5);z-index:4500;display:flex;align-items:flex-start;justify-content:center;padding:24px 12px;overflow:auto';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:980px;width:100%;padding:16px 18px">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><div style="font-size:15px;font-weight:900;color:#1A3C6E;flex:1">💊 IPD medicines — ' + esc(p.name || '') + '</div><button class="btn btn-gray btn-sm" onclick="document.getElementById(\'ipdm-rx-ov\').remove()">Close</button></div>'
      + '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;margin-bottom:4px">On the chart now</div>'
      + '<div id="ipdm-rx-list">' + listHtml(p) + '</div>'
      + '<div style="margin-top:14px;background:var(--g6);border-radius:10px;padding:10px">'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px">'
      + '<datalist id="ipdm-rx-drugs">' + drugOptions() + '</datalist>'
      + '<input type="text" id="ipdm-rx-search" list="ipdm-rx-drugs" placeholder="🔍 Type medicine (e.g. Inj Ceftriaxone) and press Enter" style="flex:1;min-width:220px">'
      + '<button class="btn btn-xs btn-blue" onclick="bmhIpdRxSearchAdd()">+ Add</button>'
      + '<button class="btn btn-xs btn-outline" onclick="bmhIpdRxTplPicker(\'' + esc(p.id) + '\')">📋 Templates</button>'
      + '<button class="btn btn-xs btn-gold" onclick="bmhIpdRxSaveTpl(\'' + esc(p.id) + '\')">📋 Save as Template</button></div>'
      + '<div id="ipdm-rx-tplbox"></div>'
      + '<div id="ipdm-rx-draft">' + draftHtml() + '</div>'
      + '<div style="margin-top:8px"><button class="btn btn-gold btn-sm" id="ipdm-rx-commit" onclick="bmhIpdRxCommit(\'' + esc(p.id) + '\')" disabled>✅ Add 0 medicines to the chart</button></div>'
      + '</div></div>';
    document.body.appendChild(ov);
    var inp = ov.querySelector('#ipdm-rx-search');
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); addFromSearch(); } });
    loadCloudTpl();
  };
  window.bmhIpdRxSearchAdd = addFromSearch;
  window.bmhIpdRxCommit = function (id) {
    var p = findPt(id); if (!p || !draft.length) return;
    var bad = draft.filter(function (r) { return !String(r.name || '').trim(); });
    if (bad.length) { toast('Every row needs a medicine name', 'w'); return; }
    if (!Array.isArray(p.ipdRx)) p.ipdRx = [];
    var lines = [];
    draft.forEach(function (r) {
      var days = durToDays(r.dur);
      var x = makeRx(r.name.trim(), r.dose, r.route, r.freq, timesFor(r.freq), r.start || today(), days || 1, r.note, /iv fluid/i.test(r.type) ? 'IV fluids' : groupFor(r.route, r.name));
      if (!days) x.stop = '';
      x.type = r.type; x.generic = r.generic; x.dur = r.dur;
      p.ipdRx.push(x);
      lines.push(rxLine(x) + (x.times.length ? ' at ' + x.times.join(', ') : '') + ' — ' + r.dur);
    });
    docNote(p, 'Rx started: ' + lines.join('; '));
    var n = draft.length; draft = []; renderDraft();
    save(p, { ipdRx: p.ipdRx, doctorNotes: p.doctorNotes }).then(function () { toast(n + ' medicine' + (n === 1 ? '' : 's') + ' added to the IPD chart ✓', 's'); }).catch(function () { toast('Saved here; could not reach the server — check connection', 'w'); });
    afterChange(p);
  };
  function tplItems(t) {
    return (t.items || []).map(function (it) {
      if (Array.isArray(it)) return draftRow({ name: it[0], dose: it[1], route: it[2], freq: it[3], dur: daysToDur(it[4]), type: /iv fluids/i.test(it[5] || '') ? 'IV Fluid' : '' });
      return draftRow(it);
    });
  }
  window.bmhIpdRxTplPicker = function (id) {
    var box = document.getElementById('ipdm-rx-tplbox'); if (!box) return;
    if (box.innerHTML) { box.innerHTML = ''; return; }
    var render = function () {
      var list = allTemplates();
      box.innerHTML = '<div style="background:#fff;border:1px solid var(--g5);border-radius:10px;padding:8px;margin-bottom:8px">'
        + '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue);margin-bottom:6px">Templates — tap one to see its medicines</div>'
        + list.map(function (t, i) { return '<button class="btn btn-xs btn-outline" style="margin:2px" onclick="bmhIpdRxTplShow(' + i + ')">' + esc(t.name) + ' (' + (t.items || []).length + ')</button>'; }).join('')
        + '<div id="ipdm-rx-tplview"></div></div>';
    };
    render(); loadCloudTpl().then(render);
  };
  window.bmhIpdRxTplShow = function (i) {
    var t = allTemplates()[i]; var v = document.getElementById('ipdm-rx-tplview'); if (!t || !v) return;
    var items = tplItems(t);
    v.innerHTML = '<div style="margin-top:8px;border-top:1px solid var(--g5);padding-top:6px"><div style="font-size:12px;font-weight:900;margin-bottom:4px">' + esc(t.name) + '</div>'
      + items.map(function (r, k) { return '<label style="display:flex;gap:8px;align-items:center;font-size:12px;padding:3px 0"><input type="checkbox" class="ipdm-tpl-pick" data-k="' + k + '" checked><span><b>' + esc(r.name) + '</b> ' + esc([r.dose, r.route, r.freq, r.dur].filter(Boolean).join(' · ')) + '</span></label>'; }).join('')
      + '<button class="btn btn-xs btn-gold" style="margin-top:6px" id="ipdm-tpl-addsel">Add ticked medicines to the list</button></div>';
    v.querySelector('#ipdm-tpl-addsel').onclick = function () {
      var start = today();
      v.querySelectorAll('.ipdm-tpl-pick').forEach(function (c) { if (c.checked) { var r = Object.assign({}, items[+c.getAttribute('data-k')]); r.start = start; draft.push(r); } });
      document.getElementById('ipdm-rx-tplbox').innerHTML = '';
      renderDraft();
    };
  };
  window.bmhIpdRxSaveTpl = function (id) {
    var p = findPt(id); if (!p) return;
    var rows = draft.length ? draft.map(function (r) { return { name: r.name, generic: r.generic, type: r.type, route: r.route, dose: r.dose, freq: r.freq, dur: r.dur }; })
      : active(p).map(function (r) { return { name: r.name, generic: r.generic || '', type: r.type || typeFromName(r.name), route: r.route, dose: r.dose, freq: normFreq(r.freq), dur: r.dur || daysToDur(Math.max(1, Math.round((Date.parse(r.stop || r.start) - Date.parse(r.start)) / 864e5) + 1)) }; });
    if (!rows.length) { toast('Add medicines first, then save them as a template', 'w'); return; }
    var name = window.prompt('Template name', 'My template'); if (!name) return;
    var t = { name: name, by: userName(), at: new Date().toISOString(), items: rows };
    var done = function () { cloudTpl = (cloudTpl || []).concat([t]); toast('Template "' + name + '" saved ✓', 's'); };
    if (window.FBDB) window.FBDB.ref('ipdRxTemplates').push(t).then(done, function () { toast('Could not save template — check connection', 'w'); }); else done();
  };


  // ── nurse: medicines due today ──
  function dueHtml(p) {
    var t = today(), now = new Date();
    var list = active(p, t);
    if (!list.length) return '<div style="font-size:12px;color:var(--g1)">No IPD medicines prescribed. <a href="#" onclick="bmhIpdRxOpen(\'' + esc(p.id) + '\');return false">Open the medicine chart</a></div>';
    return list.map(function (r) {
      var slots;
      if (r.times && r.times.length) slots = r.times.map(function (s) {
        var g = given(p, r.id, t, s);
        if (!g && !slotApplies(r, t, s)) return '<span style="display:inline-block;color:#999;font-size:11px;margin:2px 4px">' + esc(s) + ' —</span>';
        if (g) return '<span style="display:inline-block;background:#e9f7ec;border:1px solid #9bd3ad;border-radius:7px;padding:3px 7px;margin:2px;font-size:11px">✓ ' + esc(s) + ' <span style="color:#555">' + esc(hhmm(g.at)) + ' ' + esc(initials(g.by)) + '</span></span>';
        var due = new Date(t + 'T' + s + ':00');
        var late = now - due > 60 * 60e3, soon = !late && Math.abs(now - due) <= 60 * 60e3;
        return '<button class="btn btn-xs ' + (late ? 'btn-red' : soon ? 'btn-gold' : 'btn-outline') + '" style="margin:2px" onclick="bmhIpdGive(\'' + esc(p.id) + '\',\'' + esc(r.id) + '\',\'' + s + '\')">' + (late ? '⚠ ' : '') + 'Give ' + esc(s) + '</button>';
      }).join('');
      else {
        var todays = (p.medAdmin || []).filter(function (a) { return a.rxId === r.id && a.date === t; });
        var done = /stat/i.test(r.freq) && (p.medAdmin || []).some(function (a) { return a.rxId === r.id; });
        slots = todays.map(function (g) { return '<span style="display:inline-block;background:#e9f7ec;border:1px solid #9bd3ad;border-radius:7px;padding:3px 7px;margin:2px;font-size:11px">✓ ' + esc(hhmm(g.at)) + ' ' + esc(initials(g.by)) + '</span>'; }).join('')
          + (done ? '' : '<button class="btn btn-xs btn-outline" style="margin:2px" onclick="bmhIpdGive(\'' + esc(p.id) + '\',\'' + esc(r.id) + '\',\'\')">' + (/continuous/i.test(r.freq) ? 'Start / change bottle' : 'Give now') + '</button>');
      }
      return '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:6px 0;border-bottom:1px solid var(--g5)"><div style="flex:1;min-width:180px;font-size:12px"><b>' + esc(r.name) + '</b> ' + esc([r.dose, r.route].filter(Boolean).join(' · ')) + '<div style="font-size:10.5px;color:var(--g1)">' + esc(r.freq || '') + (r.note ? ' · ' + esc(r.note) : '') + '</div>' + srcSwitch(p, r) + '</div><div>' + slots + '</div></div>';
    }).join('');
  }
  function srcSwitch(p, r) {
    var b = function (k, label) {
      var on = r.src === k;
      return '<button type="button" onclick="bmhIpdSrc(\'' + esc(p.id) + '\',\'' + esc(r.id) + '\',\'' + k + '\')" style="border:1px solid ' + (on ? '#1a3a6b' : '#ccc') + ';background:' + (on ? '#1a3a6b' : '#fff') + ';color:' + (on ? '#fff' : '#555') + ';font-size:10px;font-weight:700;padding:1px 7px;cursor:pointer;border-radius:' + (k === 'stock' ? '9px 0 0 9px' : '0 9px 9px 0') + '">' + label + '</button>';
    };
    return '<div style="display:flex;align-items:center;gap:5px;margin-top:3px"><span style="font-size:10px;color:var(--g1)">Source:</span><span style="display:inline-flex">' + b('stock', 'Hospital stock') + b('own', 'Patient\'s own') + '</span>' + (r.src ? '' : '<span style="font-size:10px;color:#a66">ask at Give</span>') + '</div>';
  }
  window.bmhIpdSrc = function (id, rxId, k) {
    var p = findPt(id); if (!p) return;
    var r = (p.ipdRx || []).find(function (x) { return x.id === rxId; }); if (!r) return;
    r.src = r.src === k ? '' : k;
    save(p, { ipdRx: p.ipdRx }).catch(function () { toast('Could not save — try again', 'w'); });
    var box = document.getElementById('ipdm-due'); if (box) box.outerHTML = cardHtml(p);
  };
  function cardHtml(p) {
    return '<div id="ipdm-due" data-id="' + esc(p.id) + '" style="background:#fff;border:1px solid var(--g5);border-radius:12px;padding:12px;margin-bottom:12px">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><div style="font-size:11px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px;flex:1">💊 Medicines due today</div><button class="btn btn-outline btn-xs" onclick="bmhIpdRxOpen(\'' + esc(p.id) + '\')">Medicine chart</button></div>'
      + dueHtml(p) + '</div>';
  }
  // ── where the dose came from: hospital stock (deducted from the inventory) or the patient's own medicine ──
  function invList() { try { return INVENTORY || window.INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function centreOf(p) {
    var c = String((p && p.centre) || '').toUpperCase();
    if (!c) { try { c = String(getEffectiveCentre() || '').toUpperCase(); } catch (e) { c = ''; } }
    return /CHD|CHANDIGARH/.test(c) ? 'CHD' : /RPR|RAJPURA/.test(c) ? 'RPR' : c;
  }
  function storeCentreOf(store) {
    try { if (window.bmhInvScope) return bmhInvScope.storeCentre(store); } catch (e) {}
    var x = String(store || ''); return /\bCHD\b/i.test(x) ? 'CHD' : /\bRPR\b/i.test(x) ? 'RPR' : (x ? 'RPR' : '');
  }
  function deptOf(p) { try { return window.bmhInvScope ? bmhInvScope.deptKey(p.dept || '') : ''; } catch (e) { return ''; } }
  function storeDeptOf(store) { try { return window.bmhInvScope ? bmhInvScope.storeDept(store) : ''; } catch (e) { return ''; } }
  function nameTokens(name) {
    return String(name || '').toLowerCase().replace(/^(inj\.?|injection|tab\.?|tablet|cap\.?|capsule|syp\.?|syrup|susp\.?|oint\.?|e\/d|eye drops?|drops?|iv)\s+/i, '')
      .split(/[^a-z0-9]+/).filter(function (t) { return t.length >= 3; }).slice(0, 1);
  }
  function stockMatches(p, query) {
    var c = centreOf(p), d = deptOf(p);
    var toks = String(query || '').toLowerCase().split(/\s+/).filter(Boolean);
    var hay = function (it) { try { return bmhInventoryItemSearchHaystack(it); } catch (e) { return [it.name, it.genericName, it.company, it.store, it.barcode, it.batchNo].join(' ').toLowerCase(); } };
    return invList().filter(function (it) {
      if (!it || !(Number(it.stock) > 0)) return false;
      var sc = storeCentreOf(it.store); if (c && sc && sc !== c) return false;
      var h = hay(it); return toks.every(function (t) { return h.indexOf(t) >= 0; });
    }).sort(function (a, b) {
      var da = storeDeptOf(a.store) === d ? 0 : 1, db = storeDeptOf(b.store) === d ? 0 : 1;
      if (da !== db) return da - db;
      return String(a.exp || '9999').localeCompare(String(b.exp || '9999'));
    }).slice(0, 25);
  }
  function ensureInventory() {
    if (invList().length) return Promise.resolve();
    try { loadInventoryStockFromStorage(); } catch (e) {}
    if (invList().length) return Promise.resolve();
    try { return Promise.resolve(loadInventoryFromFirebase()).catch(function () {}); } catch (e) { return Promise.resolve(); }
  }
  // The inventory usage log is saved as one shared record: make sure this device has the latest copy before adding to it.
  function ensureFinancials() {
    if (!window.FBDB) return Promise.resolve(true);
    return window.FBDB.ref('financials').once('value').then(function (snap) {
      var remote = snap.val();
      var localTs = Number(localStorage.getItem('bmh_financials_updated_at') || 0);
      if (remote && Number(remote.updatedAt || 0) >= localTs) {
        window._bmhFinancialsHydrating = true;
        try { applyBmhFinancialsSnapshot(remote, { persistLocal: true }); } finally { window._bmhFinancialsHydrating = false; }
      }
      try { if (!window._bmhFinancialsSyncStarted) startBmhFinancialsFirebaseSync(); } catch (e) {}
      return true;
    }).catch(function () { return false; });
  }
  function freshStock(item) {
    if (!window.FBDB || !item || !item.barcode) return Promise.resolve(true);
    return window.FBDB.ref('inventory/' + item.barcode).once('value').then(function (snap) {
      var v = snap.val(); if (v && v.stock != null) item.stock = Number(v.stock) || 0; return true;
    }).catch(function () { return true; });
  }
  function chooseSource(p, r, mode) {
    return ensureInventory().then(function () {
      return new Promise(function (resolve) {
        var old = document.getElementById('ipdm-src'); if (old) old.remove();
        var c = centreOf(p);
        var ov = document.createElement('div'); ov.id = 'ipdm-src';
        ov.style.cssText = 'position:fixed;inset:0;z-index:5000;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:14px';
        ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:520px;width:100%;max-height:88vh;overflow:auto;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
          + '<div style="font-size:15px;font-weight:900;margin-bottom:2px">Give: ' + esc(rxLine(r)) + '</div>'
          + '<div style="font-size:12px;color:#666;margin-bottom:12px">' + esc(p.name || '') + ' — where is this dose coming from?</div>'
          + '<div style="display:flex;gap:8px;margin-bottom:12px"><button type="button" class="btn btn-gold" data-k="stock" style="flex:1">🏥 From hospital stock</button><button type="button" class="btn btn-outline" data-k="own" style="flex:1">👜 Patient\'s own medicine</button></div>'
          + '<div id="ipdm-src-stock" style="display:none"><div style="font-size:11.5px;color:#555;margin-bottom:6px">Pick the item used (' + esc(c || 'this centre') + ' stock). It will be deducted from that store.</div>'
          + '<input id="ipdm-src-q" type="text" placeholder="Search stock…" style="width:100%;padding:8px 10px;border:1px solid #ccc;border-radius:8px;font-size:13px;margin-bottom:6px">'
          + '<div id="ipdm-src-list" style="max-height:38vh;overflow:auto;border:1px solid #eee;border-radius:8px"></div>'
          + '<div style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:12px">Quantity used <input id="ipdm-src-qty" type="number" min="1" step="1" value="1" style="width:70px;padding:5px 8px;border:1px solid #ccc;border-radius:6px"></div></div>'
          + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" class="btn btn-gray" data-k="cancel">Cancel</button><button type="button" class="btn btn-gold" data-k="ok" id="ipdm-src-ok" style="display:none" disabled>Give &amp; deduct</button></div></div>';
        document.body.appendChild(ov);
        var picked = null, q = ov.querySelector('#ipdm-src-q');
        var done = function (v) { ov.remove(); resolve(v); };
        var draw = function () {
          var rows = stockMatches(p, q.value);
          ov.querySelector('#ipdm-src-list').innerHTML = rows.length ? rows.map(function (it, i) {
            var sel = picked === it;
            return '<div data-i="' + i + '" style="padding:8px 10px;border-bottom:1px solid #f0f0f0;cursor:pointer;display:flex;gap:8px;align-items:center;background:' + (sel ? '#fff8e1' : '#fff') + '"><div style="flex:1;min-width:0"><div style="font-size:12.5px;font-weight:800">' + (sel ? '✔ ' : '') + esc(it.name) + '</div><div style="font-size:10.5px;color:#666">' + esc([it.store, it.exp ? 'Exp ' + it.exp : '', it.batchNo ? 'Batch ' + it.batchNo : ''].filter(Boolean).join(' · ')) + '</div></div><div style="font-size:11px;font-weight:900;color:' + (Number(it.stock) <= 2 ? '#c0392b' : '#27ae60') + '">' + esc(it.stock) + ' left</div></div>';
          }).join('') : '<div style="padding:10px;font-size:12px;color:#888">No matching stock found at ' + esc(c || 'this centre') + '. Try another search word.</div>';
          Array.prototype.forEach.call(ov.querySelectorAll('#ipdm-src-list [data-i]'), function (el) {
            el.onclick = function () { picked = rows[Number(el.getAttribute('data-i'))]; ov.querySelector('#ipdm-src-ok').disabled = false; draw(); };
          });
        };
        var openStock = function () {
          ov.querySelector('#ipdm-src-stock').style.display = ''; ov.querySelector('#ipdm-src-ok').style.display = '';
          if (!q.value) q.value = nameTokens(r.name).join(' ');
          draw(); try { q.focus(); } catch (er) {}
        };
        q.oninput = function () { picked = null; ov.querySelector('#ipdm-src-ok').disabled = true; draw(); };
        ov.addEventListener('click', function (e) {
          var k = e.target && e.target.getAttribute && e.target.getAttribute('data-k');
          if (k === 'cancel') return done(null);
          if (k === 'own') return done({ src: 'own' });
          if (k === 'stock') openStock();
          if (k === 'ok' && picked) return done({ src: 'stock', item: picked, qty: Math.max(1, parseInt(ov.querySelector('#ipdm-src-qty').value, 10) || 1) });
        });
        if (mode === 'stock') {
          var last = r.stockBarcode && invList().find(function (it) { return it && it.barcode === r.stockBarcode && Number(it.stock) > 0; });
          if (last && stockMatches(p, '').indexOf(last) >= 0) { q.value = String(last.barcode); picked = last; ov.querySelector('#ipdm-src-ok').disabled = false; }
          openStock();
        }
      });
    });
  }

  var busy = false;
  window.bmhIpdGive = function (id, rxId, slot) {
    var p = findPt(id); if (!p || busy) return;
    var r = (p.ipdRx || []).find(function (x) { return x.id === rxId; }); if (!r) return;
    var t0 = today();
    if (slot && given(p, r.id, t0, slot)) { toast('Already given', 'i'); return; }
    var g = window.bmhIpdNursing && window.bmhIpdNursing.gate;
    busy = true;
    var choice = null;
    (r.src === 'own' ? Promise.resolve({ src: 'own' }) : chooseSource(p, r, r.src === 'stock' ? 'stock' : '')).then(function (ch) {
      if (!ch) return null;
      choice = ch;
      return g ? g('ipdm-nurse-select') : String((document.getElementById('ipdm-nurse-select') || {}).value || '');
    }).then(function (nurse) {
      if (!choice) return;
      if (!nurse) { if (!g) toast('Select nursing staff first', 'w'); return; }
      var t = today();
      if (slot && given(p, r.id, t, slot)) { toast('Already given', 'i'); return; }
      var pre = choice.src === 'stock' ? ensureFinancials().then(function (ok) {
        if (!ok) throw new Error('offline');
        return freshStock(choice.item);
      }) : Promise.resolve();
      return pre.then(function () {
        var at = new Date().toISOString();
        var entry = { rxId: r.id, name: r.name, dose: r.dose, route: r.route, date: t, slot: slot || '', at: at, by: nurse, src: choice.src };
        var srcText = ' — patient\'s own medicine';
        if (choice.src === 'stock') {
          var it = choice.item;
          var row = bmhUseInventoryItemForPatient(p.bmhId || p.id, it, { qty: choice.qty, mode: 'consume', dept: p.dept || deptOf(p) || '', source: 'ipd', procedure: 'IPD dose: ' + r.name, procedureRef: p.id });
          if (row && p.name && (!row.patientName || row.patientName === row.bmhId)) row.patientName = p.name;
          entry.store = it.store || ''; entry.barcode = it.barcode || ''; entry.qty = choice.qty; entry.item = it.name || '';
          srcText = ' — from hospital stock (' + (it.store || 'store') + (choice.qty > 1 ? ', qty ' + choice.qty : '') + ')';
          r.stockBarcode = it.barcode || '';
        }
        if (!r.src) r.src = choice.src;
        if (!Array.isArray(p.medAdmin)) p.medAdmin = [];
        p.medAdmin.push(entry);
        if (!Array.isArray(p.notes)) p.notes = [];
        var d = new Date(at);
        p.notes.unshift({ date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), time: hhmm(at), note: 'Given: ' + rxLine(r) + (slot ? ' (' + slot + ' dose)' : '') + srcText, nurse: nurse, doctor: '', recordedAt: at, kind: 'med', rxId: r.id });
        return save(p, { medAdmin: p.medAdmin, notes: p.notes, ipdRx: p.ipdRx }).then(function () {
          toast(r.name + ' given by ' + nurse + (choice.src === 'stock' ? ' — deducted from ' + (entry.store || 'stock') : ' (patient\'s own)') + ' ✓', 's');
          if (window.bmhIpdNursing && window.bmhIpdNursing.deviceNurse() !== nurse) window._ipdAuthenticatedNurse = '';
          var box = document.getElementById('ipdm-due'); if (box) box.outerHTML = cardHtml(p);
          try { openIPDPatient(p.id); } catch (e) {}
        });
      });
    }).catch(function (e) {
      console.warn('[ipd-meds]', e);
      toast(e && e.message === 'offline' ? 'Could not reach the server to update stock — check internet and try again' : 'Could not save — try again', 'w');
    }).then(function () { busy = false; });
  };

  // hooks: monitoring sheet card, buttons on patient + doctor screens
  var prevRender = window.renderIPDMonitoringSheet;
  if (typeof prevRender === 'function') {
    window.renderIPDMonitoringSheet = function (id) {
      var r = prevRender.apply(this, arguments);
      try {
        var p = findPt(id); var host = document.getElementById('ipd-monitor-body');
        if (p && host && !document.getElementById('ipdm-due')) {
          var vit = host.querySelector('[data-ipdm-vitals]');
          var anchor = vit && vit.parentElement;
          if (anchor) anchor.insertAdjacentHTML('beforebegin', cardHtml(p)); else host.insertAdjacentHTML('afterbegin', cardHtml(p));
        }
      } catch (e) { console.warn('[ipd-meds] render', e); }
      return r;
    };
  }
  var prevOpen = window.openIPDPatient;
  if (typeof prevOpen === 'function') {
    window.openIPDPatient = function (id) {
      var r = prevOpen.apply(this, arguments);
      try {
        var el = document.getElementById('ipd-detail');
        var p = findPt(id);
        if (el && p && !el.querySelector('.ipdm-rxbtn')) {
          var bar = [].find.call(el.querySelectorAll('button'), function (b) { return /openIPDWorkflow/.test(b.getAttribute('onclick') || ''); });
          var n = active(p).length;
          var html = '<button class="btn btn-outline btn-sm ipdm-rxbtn" onclick="bmhIpdRxOpen(\'' + esc(p.id) + '\')">💊 IPD medicines' + (n ? ' (' + n + ')' : '') + '</button>';
          if (bar) bar.insertAdjacentHTML('beforebegin', html);
        }
      } catch (e) {}
      return r;
    };
  }
  var prevDoc = window.openIPDDoctorInstructionModal;
  if (typeof prevDoc === 'function') {
    window.openIPDDoctorInstructionModal = function (id) {
      var r = prevDoc.apply(this, arguments);
      try {
        var m = document.getElementById('m-ipd-doctor');
        var btn = m && [].find.call(m.querySelectorAll('button'), function (b) { return /saveIPDDoctorInstruction/.test(b.getAttribute('onclick') || ''); });
        if (btn && !m.querySelector('.ipdm-rxbtn')) btn.insertAdjacentHTML('beforebegin', '<button type="button" class="btn btn-outline ipdm-rxbtn" style="margin-bottom:6px" onclick="bmhIpdRxOpen(\'' + String(id).replace(/'/g, '') + '\')">💊 IPD medicine chart (add / stop / templates)</button>');
      } catch (e) {}
      return r;
    };
  }

  // ── treatment chart page for Print IPD file ──
  function slotOf(a) {
    var t = a.slot || hhmm(a.at); var h = +String(t).slice(0, 2);
    if (h >= 5 && h < 11) return 0; if (h >= 11 && h < 17) return 1; if (h >= 17 && h <= 23) return 2; return 3;
  }
  function chartPage(p, o, headerFn, sigFn) {
    var meds = (p.ipdRx || []).filter(function (r) { return !r.cancelled && r.start <= o.to && (!r.stop || r.stop >= o.from); });
    var start = o.from, end = o.to;
    var adm = (p.medAdmin || []);
    var firstGiven = adm.map(function (a) { return a.date; }).sort()[0];
    if (meds.length) { var ms = meds.map(function (r) { return r.start; }).sort()[0]; if (ms > start) start = ms; }
    if (firstGiven && firstGiven < start && firstGiven >= o.from) start = firstGiven;
    var dates = []; for (var k = start, i = 0; k <= end && i < 62; k = addDays(k, 1), i++) dates.push(k);
    if (!dates.length) dates = [o.from];
    var groups = ['Injectable', 'IV fluids', 'Oral', 'Other'];
    var LAB = ['8', '2', '8', '•'];
    var pages = [];
    for (var s = 0; s < dates.length; s += 6) pages.push(dates.slice(s, s + 6));
    return pages.map(function (ds) {
      var head1 = '<tr><th rowspan="2" class="nm">Name of drug</th>' + ds.map(function (d) { return '<th colspan="4">' + fmtDay(d) + '</th>'; }).join('') + '</tr>';
      var head2 = '<tr>' + ds.map(function () { return LAB.map(function (l, i) { return '<th class="sl">' + (i === 0 ? '8 am' : i === 1 ? '2 pm' : i === 2 ? '8 pm' : 'other') + '</th>'; }).join(''); }).join('') + '</tr>';
      var body = groups.map(function (g) {
        var rows = meds.filter(function (r) { return (r.group || 'Other') === g; });
        if (!rows.length) return '';
        return '<tr class="grp"><td colspan="' + (1 + ds.length * 4) + '">' + g + '</td></tr>' + rows.map(function (r) {
          return '<tr><td class="nm"><b>' + esc(r.name) + '</b><div>' + esc([r.dose, r.route, (r.freq || '').replace(/\s*\(.*\)$/, '')].filter(Boolean).join(' · ')) + '</div></td>' + ds.map(function (d) {
            var on = r.start <= d && (!r.stop || r.stop >= d);
            var cells = ['', '', '', ''];
            var planned = [false, false, false, false];
            (r.times || []).forEach(function (t) { if (slotApplies(r, d, t)) planned[slotOf({ slot: t })] = true; });
            adm.filter(function (a) { return a.rxId === r.id && a.date === d; }).forEach(function (a) {
              var i = slotOf(a); cells[i] += (cells[i] ? '<br>' : '') + '✓ ' + esc(hhmm(a.at)) + '<br><span class="in">' + esc(initials(a.by)) + (a.src === 'own' ? ' (P)' : '') + '</span>';
            });
            return cells.map(function (c, i) { return '<td class="c' + (on && (planned[i] || c || !(r.times || []).length) ? (planned[i] && !c ? ' due' : '') : ' off') + '">' + c + '</td>'; }).join('');
          }).join('') + '</tr>';
        }).join('');
      }).join('');
      if (!meds.length) body = '<tr><td colspan="' + (1 + ds.length * 4) + '" style="padding:6mm;color:#666">No IPD medicines on the chart for these dates.</td></tr>';
      var blank = ''; for (var b = 0; b < 3; b++) blank += '<tr><td class="nm">&nbsp;</td>' + ds.map(function () { return '<td class="c"></td><td class="c"></td><td class="c"></td><td class="c"></td>'; }).join('') + '</tr>';
      return '<section class="pg">' + headerFn(p, 'Treatment Chart for Indoor Patients')
        + '<style>table.tc th,table.tc td{text-align:center;font-size:8.6px;padding:2px}table.tc td.nm,table.tc th.nm{text-align:left;width:46mm;font-size:9.5px}table.tc td.nm div{font-size:8.4px;color:#333}table.tc td.c{height:9mm;width:8mm}table.tc td.off{background:#eee}table.tc td.due{background:#fff}table.tc tr.grp td{background:#ddd;font-weight:900;text-align:left;font-size:9.5px}table.tc .in{font-size:7.5px;color:#333}table.tc th.sl{font-size:7.5px}</style>'
        + '<table class="tc">' + head1 + head2 + body + blank + '</table>'
        + '<div style="font-size:9px;color:#444;margin-top:2mm">✓ = given, with time and the initials of the nurse who gave it (recorded with her PIN). (P) = patient\'s own medicine. Grey = not prescribed that day. Empty white box = dose due.</div>'
        + (sigFn ? sigFn() : '') + '</section>';
    }).join('');
  }

  window.bmhIpdMeds = { FREQ: FREQ, TEMPLATES: TEMPLATES, chartPage: chartPage, active: active };
})();
