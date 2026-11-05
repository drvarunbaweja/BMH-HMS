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
  window.bmhIpdRxOpen = function (id) {
    var p = findPt(id); if (!p) return;
    var old = document.getElementById('ipdm-rx-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'ipdm-rx-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,20,40,.5);z-index:4500;display:flex;align-items:flex-start;justify-content:center;padding:24px 12px;overflow:auto';
    var freqOpts = Object.keys(FREQ).map(function (f) { return '<option>' + esc(f) + '</option>'; }).join('');
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:760px;width:100%;padding:16px 18px">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><div style="font-size:15px;font-weight:900;color:#1A3C6E;flex:1">💊 IPD medicines — ' + esc(p.name || '') + '</div><button class="btn btn-gray btn-sm" onclick="document.getElementById(\'ipdm-rx-ov\').remove()">Close</button></div>'
      + '<div id="ipdm-rx-list">' + listHtml(p) + '</div>'
      + '<div style="margin-top:14px;background:var(--g6);border-radius:10px;padding:10px">'
      + '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;margin-bottom:8px">Add medicine</div>'
      + '<datalist id="ipdm-rx-drugs">' + drugOptions() + '</datalist>'
      + '<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px">'
      + '<div class="form-group" style="margin:0"><label class="fl">Medicine</label><input type="text" id="ipdm-rx-name" list="ipdm-rx-drugs" placeholder="e.g. Inj Ceftriaxone"></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">Dose</label><input type="text" id="ipdm-rx-dose" placeholder="1 g"></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">Route</label><select id="ipdm-rx-route">' + ROUTES.map(function (r) { return '<option>' + r + '</option>'; }).join('') + '</select></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">Frequency</label><select id="ipdm-rx-freq" onchange="document.getElementById(\'ipdm-rx-times\').value=(window.bmhIpdMeds.FREQ[this.value]||[]).join(\', \')">' + freqOpts + '</select></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">Times (edit if needed)</label><input type="text" id="ipdm-rx-times" value="08:00"></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">Days</label><input type="number" id="ipdm-rx-days" value="3" min="1"></div>'
      + '<div class="form-group" style="margin:0"><label class="fl">Start date</label><input type="date" id="ipdm-rx-start" value="' + today() + '"></div>'
      + '<div class="form-group" style="margin:0;grid-column:span 2"><label class="fl">Note (optional)</label><input type="text" id="ipdm-rx-note" placeholder="e.g. after test dose, slow IV"></div>'
      + '</div><div style="margin-top:8px"><button class="btn btn-gold btn-sm" onclick="bmhIpdRxAdd(\'' + esc(p.id) + '\')">+ Add to chart</button></div></div>'
      + '<div style="margin-top:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap"><select id="ipdm-rx-tpl" style="flex:1;min-width:200px"><option value="">— Apply a template —</option></select>'
      + '<button class="btn btn-outline btn-sm" onclick="bmhIpdRxApplyTpl(\'' + esc(p.id) + '\')">Apply</button>'
      + '<button class="btn btn-outline btn-sm" onclick="bmhIpdRxSaveTpl(\'' + esc(p.id) + '\')">💾 Save current list as template</button></div>'
      + '</div>';
    document.body.appendChild(ov);
    var fillTpl = function () {
      var sel = document.getElementById('ipdm-rx-tpl'); if (!sel) return;
      sel.innerHTML = '<option value="">— Apply a template —</option>' + allTemplates().map(function (t, i) { return '<option value="' + i + '">' + esc(t.name) + ' (' + (t.items || []).length + ')</option>'; }).join('');
    };
    fillTpl(); loadCloudTpl().then(fillTpl);
  };
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
  window.bmhIpdRxAdd = function (id) {
    var p = findPt(id); if (!p) return;
    var g = function (x) { return String((document.getElementById('ipdm-rx-' + x) || {}).value || '').trim(); };
    var name = g('name'); if (!name) { toast('Enter the medicine name', 'w'); return; }
    var freq = g('freq');
    var times = g('times').split(/[,\s]+/).map(function (t) { var m = t.match(/^(\d{1,2})(?::?(\d{2}))?$/); return m ? String(Math.min(23, +m[1])).padStart(2, '0') + ':' + (m[2] || '00') : ''; }).filter(Boolean);
    if (/sos|stat|continuous/i.test(freq)) times = [];
    var r = makeRx(name, g('dose'), g('route'), freq, times, g('start') || today(), g('days'), g('note'));
    if (!Array.isArray(p.ipdRx)) p.ipdRx = [];
    p.ipdRx.push(r);
    docNote(p, 'Rx started: ' + rxLine(r) + (r.times.length ? ' at ' + r.times.join(', ') : '') + ' — ' + fmtDay(r.start) + ' to ' + fmtDay(r.stop) + (r.note ? ' (' + r.note + ')' : ''));
    save(p, { ipdRx: p.ipdRx, doctorNotes: p.doctorNotes }).then(function () { toast(name + ' added to the IPD chart ✓', 's'); }).catch(function () { toast('Saved here; could not reach the server — check connection', 'w'); });
    ['name', 'dose', 'note'].forEach(function (x) { var el = document.getElementById('ipdm-rx-' + x); if (el) el.value = ''; });
    afterChange(p);
  };
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
  window.bmhIpdRxApplyTpl = function (id) {
    var p = findPt(id); if (!p) return;
    var i = (document.getElementById('ipdm-rx-tpl') || {}).value; if (i === '') { toast('Choose a template', 'w'); return; }
    var tpl = allTemplates()[+i]; if (!tpl) return;
    var start = (document.getElementById('ipdm-rx-start') || {}).value || today();
    if (!Array.isArray(p.ipdRx)) p.ipdRx = [];
    var added = [];
    (tpl.items || []).forEach(function (it) {
      var name = it[0], freq = it[3];
      if (active(p, start).some(function (r) { return r.name.toLowerCase() === String(name).toLowerCase(); })) return;
      var times = /sos|stat|continuous/i.test(freq) ? [] : (it[6] || FREQ[freq] || []).slice();
      var r = makeRx(name, it[1], it[2], freq, times, start, it[4], '', it[5]);
      p.ipdRx.push(r); added.push(rxLine(r));
    });
    if (!added.length) { toast('All medicines in this template are already on the chart', 'i'); return; }
    docNote(p, 'Rx started (' + tpl.name + '): ' + added.join('; '));
    save(p, { ipdRx: p.ipdRx, doctorNotes: p.doctorNotes }).then(function () { toast(added.length + ' medicines added ✓', 's'); }).catch(function () {});
    afterChange(p);
  };
  window.bmhIpdRxSaveTpl = function (id) {
    var p = findPt(id); if (!p) return;
    var list = active(p); if (!list.length) { toast('No active medicines to save', 'w'); return; }
    var name = window.prompt('Template name', 'My template'); if (!name) return;
    var t = { name: name, by: userName(), at: new Date().toISOString(), items: list.map(function (r) { return [r.name, r.dose, r.route, r.freq, Math.max(1, Math.round((Date.parse(r.stop || r.start) - Date.parse(r.start)) / 864e5) + 1), r.group, r.times]; }) };
    var done = function () { cloudTpl = (cloudTpl || []).concat([t]); toast('Template saved ✓', 's'); window.bmhIpdRxOpen(id); };
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
      return '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:6px 0;border-bottom:1px solid var(--g5)"><div style="flex:1;min-width:180px;font-size:12px"><b>' + esc(r.name) + '</b> ' + esc([r.dose, r.route].filter(Boolean).join(' · ')) + '<div style="font-size:10.5px;color:var(--g1)">' + esc(r.freq || '') + (r.note ? ' · ' + esc(r.note) : '') + '</div></div><div>' + slots + '</div></div>';
    }).join('');
  }
  function cardHtml(p) {
    return '<div id="ipdm-due" data-id="' + esc(p.id) + '" style="background:#fff;border:1px solid var(--g5);border-radius:12px;padding:12px;margin-bottom:12px">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><div style="font-size:11px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px;flex:1">💊 Medicines due today</div><button class="btn btn-outline btn-xs" onclick="bmhIpdRxOpen(\'' + esc(p.id) + '\')">Medicine chart</button></div>'
      + dueHtml(p) + '</div>';
  }
  var busy = false;
  window.bmhIpdGive = function (id, rxId, slot) {
    var p = findPt(id); if (!p || busy) return;
    var r = (p.ipdRx || []).find(function (x) { return x.id === rxId; }); if (!r) return;
    var g = window.bmhIpdNursing && window.bmhIpdNursing.gate;
    busy = true;
    (g ? g('ipdm-nurse-select') : Promise.resolve(String((document.getElementById('ipdm-nurse-select') || {}).value || ''))).then(function (nurse) {
      if (!nurse) { if (!g) toast('Select nursing staff first', 'w'); return; }
      var at = new Date().toISOString(), t = today();
      if (slot && given(p, r.id, t, slot)) { toast('Already given', 'i'); return; }
      if (!Array.isArray(p.medAdmin)) p.medAdmin = [];
      p.medAdmin.push({ rxId: r.id, name: r.name, dose: r.dose, route: r.route, date: t, slot: slot || '', at: at, by: nurse });
      if (!Array.isArray(p.notes)) p.notes = [];
      var d = new Date(at);
      p.notes.unshift({ date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), time: hhmm(at), note: 'Given: ' + rxLine(r) + (slot ? ' (' + slot + ' dose)' : ''), nurse: nurse, doctor: '', recordedAt: at, kind: 'med', rxId: r.id });
      return save(p, { medAdmin: p.medAdmin, notes: p.notes }).then(function () {
        toast(r.name + ' given by ' + nurse + ' ✓', 's');
        if (window.bmhIpdNursing && window.bmhIpdNursing.deviceNurse() !== nurse) window._ipdAuthenticatedNurse = '';
        var box = document.getElementById('ipdm-due'); if (box) box.outerHTML = cardHtml(p);
        try { openIPDPatient(p.id); } catch (e) {}
      });
    }).catch(function (e) { console.warn('[ipd-meds]', e); toast('Could not save — try again', 'w'); }).then(function () { busy = false; });
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
              var i = slotOf(a); cells[i] += (cells[i] ? '<br>' : '') + '✓ ' + esc(hhmm(a.at)) + '<br><span class="in">' + esc(initials(a.by)) + '</span>';
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
        + '<div style="font-size:9px;color:#444;margin-top:2mm">✓ = given, with time and the initials of the nurse who gave it (recorded with her PIN). Grey = not prescribed that day. Empty white box = dose due.</div>'
        + (sigFn ? sigFn() : '') + '</section>';
    }).join('');
  }

  window.bmhIpdMeds = { FREQ: FREQ, TEMPLATES: TEMPLATES, chartPage: chartPage, active: active };
})();
