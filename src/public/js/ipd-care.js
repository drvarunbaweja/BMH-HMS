/* BMH — IPD phase 2: quick drop-down nursing checks and the progress-notes printout.
 *  • Monitoring sheet gets a "Nursing checks" card with tabs:
 *      Mother (after delivery / LSCS) · Baby (feeds, stools, fever, jaundice + phototherapy log) · Post-op (hysterectomy & other procedures)
 *    Each save asks for the nurse PIN (same rules as vitals), shows the previous entry, and also adds a line to the progress notes.
 *  • "🖨️ Print IPD file" prints, for a chosen date range:
 *      Progress notes (staff notes left, doctor notes right — blank space left for the doctor),
 *      Post-operative record (vitals and checks table), Baby & phototherapy chart, Lab results during the stay.
 *  Data is added to the same IPD admission record (ipdPatients / activeIpdPatients): nursingChecks[], phototherapy[], notes[].
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function pts() { try { return window.IPD_PATIENTS || IPD_PATIENTS || []; } catch (e) { return window.IPD_PATIENTS || []; } }
  function findPt(id) { return pts().find(function (x) { return x && x.id === id; }) || null; }
  function activePt() { try { return activeIPDPatient || null; } catch (e) { return null; } }
  function otFor(p) {
    try {
      var list = typeof OT_CASES !== 'undefined' ? OT_CASES : [];
      var c = p.otCaseId ? list.find(function (x) { return x.id === p.otCaseId; }) : list.slice().reverse().find(function (x) { return x.bmhId === p.bmhId; });
      return c ? (typeof normalizeOTCaseRecord === 'function' ? normalizeOTCaseRecord(c) : c) : {};
    } catch (e) { return {}; }
  }
  function procOf(p) { var o = otFor(p); return String(o.procedure || p.surgery || p.type || p.dx || '').trim(); }
  function deptOf(p) { try { return normalizeDeptKeyForQueue(p.dept || '') || 'ophtho'; } catch (e) { return p.dept || ''; } }
  function isDelivery(p) { return /lscs|caes|cesar|delivery|labou?r|nvd|vaginal birth|normal birth/i.test(procOf(p) + ' ' + (p.type || '')); }
  function fmtDT(iso) { try { var d = new Date(iso); if (isNaN(d)) return ''; return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }
  function dayKey(iso) { try { return localDateKey(iso); } catch (e) { return String(iso || '').slice(0, 10); } }
  function fmtDay(key) { var m = String(key || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3] + '/' + m[2] + '/' + m[1] : key; }
  function hhmm(iso) { try { var d = new Date(iso); return isNaN(d) ? '' : String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); } catch (e) { return ''; } }
  function nowLocalInput() { var d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 16); }

  var PAIN = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  var FORMS = {
    mother: { label: 'Mother', fields: [
      ['uterus', 'Uterus', ['Well contracted', 'Boggy — massaged', 'Fundus above umbilicus', 'Tender']],
      ['lochia', 'Bleeding PV (lochia)', ['Normal', 'Moderate', 'Heavy', 'Clots', 'Foul smelling']],
      ['breastfeed', 'Breastfeeding', ['Started well', 'Difficulty latching', 'Not started', 'Expressing milk']],
      ['breasts', 'Breasts', ['Soft', 'Engorged', 'Cracked nipples']],
      ['urine', 'Urine', ['Passed', 'Catheter in situ — clear', 'Catheter removed', 'Not passed (> 6 h)']],
      ['bowel', 'Bowel / flatus', ['Flatus passed', 'Stool passed', 'Not yet']],
      ['wound', 'Wound / perineum', ['Dry & clean', 'Soakage', 'Swelling', 'Redness', 'Gaping', 'Re-dressed']],
      ['pain', 'Pain (0–10)', PAIN],
      ['ambulation', 'Ambulation', ['In bed', 'Sitting up', 'Walking with support', 'Walking']],
      ['diet', 'Diet', ['NBM', 'Sips', 'Liquids', 'Soft', 'Normal']],
      ['mood', 'Mood', ['Normal', 'Weepy', 'Anxious', 'Withdrawn']]
    ] },
    baby: { label: 'Baby', fields: [
      ['feeding', 'Feeding', ['Breastfeeding well', 'Breast + top feed', 'Top feed only', 'Poor sucking', 'Not feeding']],
      ['feeds24', 'Feeds in last 24 h', ['0', '1–3', '4–6', '7–9', '10–12', '> 12']],
      ['urine', 'Urine', ['Passed', 'Not passed']],
      ['stools', 'Stools', ['Meconium passed', 'Transitional', 'Yellow', 'Not passed (> 24 h)', 'Loose / frequent']],
      ['temp', 'Temperature', ['Normal', 'Fever (> 37.5 °C)', 'Cold (< 36.5 °C)']],
      ['activity', 'Activity / cry', ['Active, good cry', 'Lethargic', 'Irritable / high-pitched cry']],
      ['colour', 'Colour', ['Pink', 'Jaundiced', 'Pale', 'Blue / dusky']],
      ['jaundice', 'Jaundice (extent)', ['No', 'Face only', 'Up to chest', 'Up to abdomen', 'Up to legs', 'Palms & soles']],
      ['cord', 'Cord', ['Dry & clean', 'Bleeding', 'Redness', 'Discharge']],
      ['eyes', 'Eyes', ['Clean', 'Sticky / discharge']],
      ['vomit', 'Vomiting', ['None', 'Occasional', 'Repeated', 'Bile-stained']],
      ['weight', 'Weight (kg)', null]
    ] },
    postop: { label: 'Post-op', fields: [
      ['conscious', 'Consciousness', ['Fully conscious', 'Drowsy', 'Sedated']],
      ['wound', 'Wound / dressing', ['Dry', 'Soakage', 'Bleeding', 'Re-dressed']],
      ['drain', 'Drain', ['No drain', 'Serous', 'Haemoserous', 'Blood', 'Removed']],
      ['drainMl', 'Drain output (ml)', null],
      ['urine', 'Catheter / urine', ['Voided', 'Catheter — clear urine', 'Catheter — haematuria', 'Catheter removed', 'Not passed']],
      ['urineMl', 'Urine output (ml)', null],
      ['bleeding', 'Bleeding PV', ['None', 'Spotting', 'Moderate', 'Heavy']],
      ['abdomen', 'Abdomen', ['Soft', 'Distended', 'Tender']],
      ['pain', 'Pain (0–10)', PAIN],
      ['nausea', 'Nausea / vomiting', ['None', 'Nausea', 'Vomiting']],
      ['intake', 'Oral intake', ['NBM', 'Sips', 'Liquids', 'Soft', 'Normal']],
      ['flatus', 'Flatus', ['Passed', 'Not yet']],
      ['ambulation', 'Ambulation', ['In bed', 'Sitting', 'Walking with support', 'Walking']]
    ] }
  };
  var UNUSUAL = /boggy|above umbilicus|tender|heavy|clots|foul|not passed|gaping|redness|swelling|soakage|lethargic|irritable|fever|cold|pale|blue|bleeding|discharge|repeated|bile|poor sucking|not feeding|haematuria|distended|vomiting|sedated|palms|legs|abdomen$/i;

  function lastCheck(p, kind) { return (Array.isArray(p.nursingChecks) ? p.nursingChecks : []).find(function (c) { return c && c.kind === kind; }) || null; }
  function summary(kind, values) {
    var f = FORMS[kind]; if (!f) return '';
    return f.fields.filter(function (x) { return String(values[x[0]] || '').trim(); }).map(function (x) { return x[1].replace(/\s*\(.*\)$/, '') + ': ' + values[x[0]]; }).join(' · ');
  }
  function babyJaundiced(p) {
    var last = lastCheck(p, 'baby');
    var j = last && last.values && last.values.jaundice;
    if (j && j !== 'No') return true;
    if (last && last.values && /jaundic/i.test(String(last.values.colour || ''))) return true;
    return /jaundice|hyperbilirubin/i.test(String(p.dx || '') + ' ' + String(p.babyDx || ''));
  }
  function openPhoto(p) { return (Array.isArray(p.phototherapy) ? p.phototherapy : []).find(function (s) { return s && s.start && !s.end; }) || null; }

  function formHtml(p, kind) {
    var f = FORMS[kind];
    var prev = lastCheck(p, kind);
    var prevLine = prev ? '<div style="font-size:11.5px;color:#333;background:#f4f6fa;border:1px dashed #c9d3e3;border-radius:8px;padding:7px 10px;margin-bottom:10px"><b style="color:#1A3C6E">Previous:</b> ' + esc(summary(kind, prev.values || {})) + ' <span style="color:#666">— ' + esc([prev.by, fmtDT(prev.at)].filter(Boolean).join(', ')) + '</span></div>'
      : '<div style="font-size:11.5px;color:#666;background:#f4f6fa;border:1px dashed #c9d3e3;border-radius:8px;padding:7px 10px;margin-bottom:10px">No ' + esc(f.label.toLowerCase()) + ' checks recorded yet.</div>';
    var grid = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">' + f.fields.map(function (x) {
      var id = 'ipdc-' + kind + '-' + x[0];
      var ctl = x[2] ? '<select id="' + id + '" style="width:100%"><option value="">—</option>' + x[2].map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select>'
        : '<input type="text" id="' + id + '" style="width:100%" placeholder="' + esc(x[1]) + '">';
      return '<div class="form-group" style="margin:0"><label class="fl">' + esc(x[1]) + '</label>' + ctl + '</div>';
    }).join('') + '</div>';
    var extra = '';
    if (kind === 'baby') {
      var open = openPhoto(p);
      var sessions = Array.isArray(p.phototherapy) ? p.phototherapy : [];
      // Phototherapy only appears once jaundice is recorded / diagnosed, or while a session is running.
      extra = '<div id="ipdc-photo" data-jaundiced="' + (babyJaundiced(p) ? '1' : '') + '" style="margin-top:12px;background:#fffbea;border:1px solid #f0d77a;border-radius:10px;padding:10px;display:' + (open || babyJaundiced(p) ? 'block' : 'none') + '">'
        + '<div style="font-size:11px;font-weight:900;color:#8a6500;text-transform:uppercase;margin-bottom:6px">☀️ Phototherapy monitoring</div>'
        + (open ? '<div style="font-size:12px;margin-bottom:8px"><b>Running since ' + esc(fmtDT(open.start)) + '</b>' + (open.type ? ' · ' + esc(open.type) : '') + (open.tsb ? ' · TSB ' + esc(open.tsb) : '') + ' — started by ' + esc(open.by || '') + '</div>' : '')
        + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px">'
        + (open ? '' : '<div class="form-group" style="margin:0"><label class="fl">Started (date & time)</label><input type="datetime-local" id="ipdc-ph-start" value="' + nowLocalInput() + '"></div>'
          + '<div class="form-group" style="margin:0"><label class="fl">Type</label><select id="ipdc-ph-type"><option>Single surface</option><option>Double surface</option><option>Intensive</option></select></div>')
        + (open ? '<div class="form-group" style="margin:0"><label class="fl">Stopped (date & time)</label><input type="datetime-local" id="ipdc-ph-end" value="' + nowLocalInput() + '"></div>' : '')
        + '<div class="form-group" style="margin:0"><label class="fl">Serum bilirubin (TSB mg/dL)</label><input type="text" id="ipdc-ph-tsb" placeholder="e.g. 14.2"></div>'
        + '<div class="form-group" style="margin:0"><label class="fl">Note</label><input type="text" id="ipdc-ph-note" placeholder="eyes covered, turning 2-hourly…"></div>'
        + '</div><div style="margin-top:8px"><button class="btn btn-sm ' + (open ? 'btn-outline' : 'btn-gold') + '" onclick="bmhIpdPhoto(\'' + esc(p.id) + '\',\'' + (open ? 'stop' : 'start') + '\')">' + (open ? '⏹ Stop phototherapy' : '▶ Start phototherapy') + '</button></div>'
        + (sessions.length ? '<div style="font-size:11px;color:#555;margin-top:8px">' + sessions.map(function (s) { return esc(fmtDT(s.start)) + ' → ' + (s.end ? esc(fmtDT(s.end)) : '<b>running</b>') + (s.tsb ? ' · TSB ' + esc(s.tsb) : '') + (s.endTsb ? ' → ' + esc(s.endTsb) : ''); }).join('<br>') + '</div>' : '')
        + '</div>';
    }
    return prevLine + grid + extra
      + '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-gold btn-sm" onclick="bmhIpdSaveCheck(\'' + esc(p.id) + '\',\'' + kind + '\')">💾 Save ' + esc(f.label.toLowerCase()) + ' check</button></div>';
  }
  function cardHtml(p, kind) {
    var obg = deptOf(p) === 'obg';
    var tabs = obg ? ['mother', 'baby', 'postop'] : ['postop'];
    return '<div id="ipdc-card" data-id="' + esc(p.id) + '" style="background:#fff;border:1px solid var(--g5);border-radius:12px;padding:12px;margin-bottom:12px">'
      + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px"><div style="font-size:11px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px;flex:1">Nursing checks</div>'
      + tabs.map(function (k) { return '<button class="btn btn-xs ' + (k === kind ? 'btn-blue' : 'btn-outline') + '" onclick="bmhIpdCheckTab(\'' + esc(p.id) + '\',\'' + k + '\')">' + (k === 'mother' ? '🤱 ' : k === 'baby' ? '👶 ' : '🩺 ') + esc(FORMS[k].label) + '</button>'; }).join('')
      + '</div><div id="ipdc-body">' + formHtml(p, kind) + '</div></div>';
  }
  function defaultKind(p) { return deptOf(p) === 'obg' && isDelivery(p) ? 'mother' : 'postop'; }
  function wireJaundice() {
    var j = document.getElementById('ipdc-baby-jaundice'), box = document.getElementById('ipdc-photo');
    var c = document.getElementById('ipdc-baby-colour');
    var upd = function () {
      var yes = (j && j.value && j.value !== 'No') || (c && /jaundic/i.test(c.value)) || box.getAttribute('data-jaundiced') === '1' || !!openPhoto(findPt((document.getElementById('ipdc-card') || {}).getAttribute && document.getElementById('ipdc-card').getAttribute('data-id')) || {});
      box.style.display = yes ? 'block' : 'none';
    };
    if (box) { if (j) j.addEventListener('change', upd); if (c) c.addEventListener('change', upd); }
  }
  window.bmhIpdCheckTab = function (id, kind) {
    var p = findPt(id); var host = document.getElementById('ipdc-card'); if (!p || !host) return;
    host.outerHTML = cardHtml(p, kind); wireJaundice();
    try { setIPDNursingEntryEnabled(!!(document.getElementById('ipdm-nurse-select') || {}).value); } catch (e) {}
  };

  function gate() {
    var g = window.bmhIpdNursing && window.bmhIpdNursing.gate;
    return g ? g('ipdm-nurse-select') : Promise.resolve(String((document.getElementById('ipdm-nurse-select') || {}).value || ''));
  }
  function addNote(p, text, nurse, at) {
    if (!Array.isArray(p.notes)) p.notes = [];
    var d = new Date(at);
    p.notes.unshift({ date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), time: hhmm(at), note: text, nurse: nurse, doctor: '', recordedAt: at, kind: 'check' });
  }
  function save(p, patch) {
    try { return bmhUpdateActiveIpdAdmission(p.id, patch); } catch (e) { return Promise.reject(e); }
  }
  function rerender(p) {
    try { if (typeof renderIPDMonitoringSheet === 'function') renderIPDMonitoringSheet(p.id); } catch (e) {}
    try { if (typeof openIPDPatient === 'function') openIPDPatient(p.id); } catch (e) {}
  }
  var busy = false;
  window.bmhIpdSaveCheck = function (id, kind) {
    var p = findPt(id); if (!p || busy) return;
    var f = FORMS[kind]; var values = {};
    f.fields.forEach(function (x) { var el = document.getElementById('ipdc-' + kind + '-' + x[0]); var v = el ? String(el.value || '').trim() : ''; if (v) values[x[0]] = v; });
    if (!Object.keys(values).length) { toast('Choose at least one item', 'w'); return; }
    busy = true;
    gate().then(function (nurse) {
      if (!nurse) return;
      var at = new Date().toISOString();
      if (!Array.isArray(p.nursingChecks)) p.nursingChecks = [];
      p.nursingChecks.unshift({ kind: kind, at: at, by: nurse, values: values });
      if (p.nursingChecks.length > 400) p.nursingChecks.length = 400;
      addNote(p, f.label + ' check — ' + summary(kind, values), nurse, at);
      return save(p, { nursingChecks: p.nursingChecks, notes: p.notes, lastNursingStaff: nurse, lastNursingCheckAt: at }).then(function () {
        toast(f.label + ' check saved by ' + nurse + ' ✓', 's');
        if (window.bmhIpdNursing && window.bmhIpdNursing.deviceNurse() !== nurse) window._ipdAuthenticatedNurse = '';
        rerender(p);
        window.bmhIpdCheckTab(p.id, kind);
      });
    }).catch(function (e) { console.warn('[ipd-care]', e); toast('Could not save — check connection and try again', 'w'); }).then(function () { busy = false; });
  };
  window.bmhIpdPhoto = function (id, action) {
    var p = findPt(id); if (!p || busy) return;
    var tsb = String((document.getElementById('ipdc-ph-tsb') || {}).value || '').trim();
    var note = String((document.getElementById('ipdc-ph-note') || {}).value || '').trim();
    busy = true;
    gate().then(function (nurse) {
      if (!nurse) return;
      if (!Array.isArray(p.phototherapy)) p.phototherapy = [];
      var text;
      if (action === 'start') {
        var st = (document.getElementById('ipdc-ph-start') || {}).value;
        var start = st ? new Date(st).toISOString() : new Date().toISOString();
        var type = (document.getElementById('ipdc-ph-type') || {}).value || '';
        p.phototherapy.unshift({ start: start, end: '', type: type, tsb: tsb, note: note, by: nurse });
        text = 'Phototherapy started ' + fmtDT(start) + (type ? ' (' + type + ')' : '') + (tsb ? ' · TSB ' + tsb + ' mg/dL' : '') + (note ? ' · ' + note : '');
      } else {
        var open = openPhoto(p); if (!open) return;
        var en = (document.getElementById('ipdc-ph-end') || {}).value;
        open.end = en ? new Date(en).toISOString() : new Date().toISOString();
        open.endBy = nurse; if (tsb) open.endTsb = tsb; if (note) open.endNote = note;
        var hrs = Math.round((Date.parse(open.end) - Date.parse(open.start)) / 36e5 * 10) / 10;
        text = 'Phototherapy stopped ' + fmtDT(open.end) + (isFinite(hrs) ? ' (total ' + hrs + ' h)' : '') + (tsb ? ' · TSB ' + tsb + ' mg/dL' : '') + (note ? ' · ' + note : '');
      }
      var at = new Date().toISOString();
      addNote(p, text, nurse, at);
      return save(p, { phototherapy: p.phototherapy, notes: p.notes }).then(function () {
        toast('Phototherapy ' + (action === 'start' ? 'started' : 'stopped') + ' ✓', 's');
        rerender(p); window.bmhIpdCheckTab(p.id, 'baby');
      });
    }).catch(function (e) { console.warn('[ipd-care]', e); toast('Could not save — try again', 'w'); }).then(function () { busy = false; });
  };

  // ── add the card to the monitoring sheet and the print button to the patient view ──
  var prevRender = window.renderIPDMonitoringSheet;
  if (typeof prevRender === 'function') {
    window.renderIPDMonitoringSheet = function (id) {
      var r = prevRender.apply(this, arguments);
      try {
        var p = findPt(id); var host = document.getElementById('ipd-monitor-body');
        if (p && host && !document.getElementById('ipdc-card')) {
          var vit = host.querySelector('[data-ipdm-vitals]');
          var anchor = vit && vit.parentElement;
          var html = cardHtml(p, defaultKind(p));
          if (anchor) anchor.insertAdjacentHTML('afterend', html); else host.insertAdjacentHTML('beforeend', html);
          wireJaundice();
          var bar = host.querySelector('[data-ipdm-head]');
          if (bar && !host.querySelector('.ipdc-printbtn')) bar.insertAdjacentHTML('beforebegin', '<div class="ipdc-printbtn" style="text-align:right;margin:-4px 0 8px"><button class="btn btn-outline btn-sm" onclick="bmhIpdPrintDialog(\'' + esc(p.id) + '\')">🖨️ Print IPD file</button></div>');
          try { setIPDNursingEntryEnabled(!!(document.getElementById('ipdm-nurse-select') || {}).value); } catch (e) {}
        }
      } catch (e) { console.warn('[ipd-care] render', e); }
      return r;
    };
  }
  var prevOpen = window.openIPDPatient;
  if (typeof prevOpen === 'function') {
    window.openIPDPatient = function (id) {
      var r = prevOpen.apply(this, arguments);
      try {
        var el = document.getElementById('ipd-detail');
        var btn = el && [].find.call(el.querySelectorAll('button'), function (b) { return /printIPDSummary/.test(b.getAttribute('onclick') || ''); });
        if (btn) { btn.setAttribute('onclick', "bmhIpdPrintDialog('" + String(id).replace(/'/g, '') + "')"); btn.textContent = '🖨️ Print IPD file'; }
      } catch (e) {}
      return r;
    };
  }

  // ── print dialog ──
  window.bmhIpdPrintDialog = function (id) {
    var p = findPt(id); if (!p) return;
    var old = document.getElementById('ipdc-print-ov'); if (old) old.remove();
    var from = dayKey(p.admittedAt || new Date()), to = dayKey(new Date());
    var hasBaby = (p.nursingChecks || []).some(function (c) { return c.kind === 'baby'; }) || (p.phototherapy || []).length;
    var ov = document.createElement('div'); ov.id = 'ipdc-print-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,20,40,.5);z-index:5000;display:flex;align-items:center;justify-content:center;padding:16px';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:380px;width:100%;padding:16px 18px">'
      + '<div style="font-size:15px;font-weight:900;color:#1A3C6E;margin-bottom:10px">🖨️ Print IPD file — ' + esc(p.name || '') + '</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px"><div class="form-group" style="margin:0"><label class="fl">From</label><input type="date" id="ipdc-pf" value="' + from + '"></div><div class="form-group" style="margin:0"><label class="fl">To</label><input type="date" id="ipdc-pt" value="' + to + '"></div></div>'
      + [['notes', 'Progress notes (staff left · doctor right)', true], ['chart', 'Treatment chart (medicines given, ticked)', !!(p.ipdRx && p.ipdRx.length)], ['por', 'Post-operative record (vitals table)', true], ['baby', 'Baby chart & phototherapy', !!hasBaby], ['labs', 'Lab results during the stay', true]].map(function (x) {
        return '<label style="display:flex;gap:8px;align-items:center;font-size:12.5px;margin:5px 0"><input type="checkbox" class="ipdc-pp" value="' + x[0] + '"' + (x[2] ? ' checked' : '') + '> ' + x[1] + '</label>';
      }).join('')
      + '<div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-gray" style="flex:1" onclick="document.getElementById(\'ipdc-print-ov\').remove()">Cancel</button><button class="btn btn-gold" style="flex:1" id="ipdc-print-go">Print</button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#ipdc-print-go').onclick = function () {
      var opts = { from: ov.querySelector('#ipdc-pf').value || from, to: ov.querySelector('#ipdc-pt').value || to, pages: [].filter.call(ov.querySelectorAll('.ipdc-pp'), function (c) { return c.checked; }).map(function (c) { return c.value; }) };
      ov.remove();
      buildPrint(p, opts).then(function (html) { safePrint(html); }).catch(function (e) { console.warn('[ipd-care] print', e); toast('Could not prepare the printout', 'w'); });
    };
  };

  function inRange(iso, o) { var k = dayKey(iso); return k && k >= o.from && k <= o.to; }
  function ctxFor(p) {
    var ot = otFor(p);
    var id = p.bmhId || '';
    try { id = formatBmhIdForDisplay(id); } catch (e) {}
    var dept = deptOf(p);
    return { ptNm: p.name || '', ptId: id, procedure: procOf(p), today: p.admittedAt ? 'Adm. ' + fmtDay(dayKey(p.admittedAt)) : '', dept: dept, eye: dept === 'ophtho' ? (ot.site || p.surgeryEye || '') : '' };
  }
  function header(p, title) {
    var h = '';
    try { h = buildCompactDocumentHeader(title, ctxFor(p), [p.ward, p.room ? 'Bed ' + p.room : '', p.doctor ? 'Consultant: ' + p.doctor : ''].filter(Boolean).join(' · ')); } catch (e) { h = '<h2>' + esc(title) + '</h2>'; }
    return h;
  }
  function sigRow() {
    return '<div style="display:flex;justify-content:space-between;gap:16px;margin-top:10mm;font-size:10px;color:#333">'
      + ['Signature', 'Printed name — ID', 'Date'].map(function (t) { return '<div style="flex:1;text-align:center"><div style="border-top:1px solid #333;padding-top:3px">' + t + '</div></div>'; }).join('') + '</div>';
  }
  function notesPage(p, o) {
    var rows = [];
    (p.notes || []).forEach(function (n) {
      var at = n.recordedAt || '';
      if (!at || !inRange(at, o)) return;
      var bits = [];
      if (n.vitals && Object.keys(n.vitals).some(function (k) { return n.vitals[k]; })) bits.push('Vitals: ' + [['BP', n.vitals.bp], ['P', n.vitals.pulse], ['T', n.vitals.temp], ['SpO₂', n.vitals.spo2], ['RR', n.vitals.rr], ['Pain', n.vitals.pain]].filter(function (x) { return x[1]; }).map(function (x) { return x[0] + ' ' + x[1]; }).join(', '));
      if (n.note) bits.push(n.note);
      if (n.medicine || n.dose) bits.push('Given: ' + [n.medicine, n.dose ? '(' + n.dose + ')' : ''].filter(Boolean).join(' '));
      if (n.orders) bits.push('Orders followed: ' + n.orders);
      rows.push({ at: at, staff: bits.join(' — '), staffBy: n.nurse || '', doc: '', docBy: '' });
    });
    var noted = {};
    rows.forEach(function (r) { noted[r.at] = 1; });
    (p.vitalSigns || []).forEach(function (v) {
      if (!v.recordedAt || noted[v.recordedAt] || !inRange(v.recordedAt, o)) return;
      var t = [['BP', v.bp], ['P', v.pulse], ['T', v.temp], ['SpO₂', v.spo2], ['RR', v.rr], ['Pain', v.pain]].filter(function (x) { return x[1]; }).map(function (x) { return x[0] + ' ' + x[1]; }).join(', ');
      if (t) rows.push({ at: v.recordedAt, staff: 'Vitals: ' + t, staffBy: v.by || '', doc: '', docBy: '' });
    });
    (p.ipdInstructions || []).forEach(function (d) {
      if (!d.createdAt || !inRange(d.createdAt, o)) return;
      rows.push({ at: d.createdAt, staff: '', staffBy: '', doc: [d.medicine, d.dose, d.note].filter(Boolean).join(' — ') + (d.status === 'done' && d.doneBy ? ' (done by ' + d.doneBy + ')' : ''), docBy: d.createdBy || '' });
    });
    (p.doctorNotes || []).forEach(function (d) {
      if (!d.at || !inRange(d.at, o)) return;
      rows.push({ at: d.at, staff: '', staffBy: '', doc: d.text || '', docBy: d.by || '' });
    });
    rows.sort(function (a, b) { return String(a.at).localeCompare(String(b.at)); });
    var days = {};
    rows.forEach(function (r) { var k = dayKey(r.at); (days[k] = days[k] || []).push(r); });
    var keys = Object.keys(days).sort();
    if (!keys.length) keys = [o.from];
    var body = keys.map(function (k) {
      var list = days[k] || [];
      var hasDoc = list.some(function (r) { return r.doc; });
      return list.map(function (r, i) {
        return '<tr><td class="d">' + (i === 0 ? fmtDay(k) : '') + '</td><td class="t">' + hhmm(r.at) + '</td>'
          + '<td>' + (r.staff ? esc(r.staff) + (r.staffBy ? '<div class="by">— ' + esc(r.staffBy) + '</div>' : '') : '') + '</td>'
          + '<td>' + (r.doc ? esc(r.doc) + (r.docBy ? '<div class="by">— ' + esc(r.docBy) + '</div>' : '') : '') + '</td></tr>';
      }).join('') + '<tr class="blank"><td class="d">' + (list.length ? '' : fmtDay(k)) + '</td><td></td><td></td><td>' + (hasDoc ? '' : '<span class="hint">Doctor’s notes</span>') + '</td></tr>';
    }).join('');
    return '<section class="pg">' + header(p, 'Patient Progress Notes')
      + '<table class="pn"><colgroup><col style="width:17mm"><col style="width:12mm"><col><col></colgroup><thead><tr><th>Date</th><th>Time</th><th>Nursing staff notes</th><th>Doctor’s notes / orders</th></tr></thead><tbody>' + body + '</tbody></table>'
      + sigRow() + '</section>';
  }
  function nearestCheck(p, at, kinds) {
    var t = Date.parse(at); var best = null, bd = 45 * 60e3;
    (p.nursingChecks || []).forEach(function (c) { if (kinds.indexOf(c.kind) < 0) return; var d = Math.abs(Date.parse(c.at) - t); if (d <= bd) { bd = d; best = c; } });
    return best;
  }
  function porPage(p, o) {
    var list = (p.vitalSigns || []).filter(function (v) { return v.recordedAt && inRange(v.recordedAt, o); }).slice().sort(function (a, b) { return String(a.recordedAt).localeCompare(String(b.recordedAt)); });
    var used = {};
    var rows = list.map(function (v) {
      var c = nearestCheck(p, v.recordedAt, ['mother', 'postop']); if (c) used[c.at] = 1;
      var cv = (c && c.values) || {};
      return [fmtDay(dayKey(v.recordedAt)).slice(0, 5) + ' ' + hhmm(v.recordedAt), v.pulse, v.bp, v.temp, v.rr, v.spo2, cv.uterus || cv.abdomen || '', cv.wound || '', cv.lochia || cv.bleeding || '', cv.urineMl || cv.urine || '', v.by || (c && c.by) || ''];
    });
    (p.nursingChecks || []).forEach(function (c) {
      if (used[c.at] || (c.kind !== 'mother' && c.kind !== 'postop') || !inRange(c.at, o)) return;
      var cv = c.values || {};
      rows.push([fmtDay(dayKey(c.at)).slice(0, 5) + ' ' + hhmm(c.at), '', '', '', '', '', cv.uterus || cv.abdomen || '', cv.wound || '', cv.lochia || cv.bleeding || '', cv.urineMl || cv.urine || '', c.by || '']);
    });
    rows.sort(function (a, b) { return String(a[0]).localeCompare(String(b[0])); });
    while (rows.length < 18) rows.push(['', '', '', '', '', '', '', '', '', '', '']);
    var head = ['Date / time', 'Pulse', 'BP', 'Temp', 'RR', 'SpO₂', 'Per abd / uterus', 'Dressing', 'BPV', 'Urine output', 'Staff'];
    return '<section class="pg">' + header(p, 'Post-Operative Record')
      + '<table class="por"><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>'
      + rows.map(function (r) { return '<tr>' + r.map(function (x) { return '<td>' + esc(x || '') + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>' + sigRow() + '</section>';
  }
  function babyPage(p, o) {
    var checks = (p.nursingChecks || []).filter(function (c) { return c.kind === 'baby' && inRange(c.at, o); }).slice().sort(function (a, b) { return String(a.at).localeCompare(String(b.at)); });
    var cols = [['feeding', 'Feeding'], ['feeds24', 'Feeds/24 h'], ['urine', 'Urine'], ['stools', 'Stools'], ['temp', 'Temp'], ['activity', 'Activity'], ['jaundice', 'Jaundice'], ['cord', 'Cord'], ['weight', 'Wt']];
    var rows = checks.map(function (c) { var v = c.values || {}; return [fmtDay(dayKey(c.at)).slice(0, 5) + ' ' + hhmm(c.at)].concat(cols.map(function (x) { return v[x[0]] || ''; })).concat([c.by || '']); });
    while (rows.length < 10) rows.push(new Array(cols.length + 2).join('|').split('|'));
    var photo = (p.phototherapy || []).filter(function (s) { return inRange(s.start, o) || (s.end && inRange(s.end, o)); }).slice().sort(function (a, b) { return String(a.start).localeCompare(String(b.start)); });
    var ph = photo.map(function (s) {
      var hrs = s.end ? Math.round((Date.parse(s.end) - Date.parse(s.start)) / 36e5 * 10) / 10 : '';
      return '<tr><td>' + esc(fmtDT(s.start)) + '</td><td>' + (s.end ? esc(fmtDT(s.end)) : 'Running') + '</td><td>' + esc(hrs === '' ? '' : hrs + ' h') + '</td><td>' + esc(s.type || '') + '</td><td>' + esc([s.tsb, s.endTsb].filter(Boolean).join(' → ')) + '</td><td>' + esc([s.by, s.endBy].filter(Boolean).join(' / ')) + '</td><td>' + esc([s.note, s.endNote].filter(Boolean).join(' · ')) + '</td></tr>';
    }).join('');
    for (var i = photo.length; i < 4; i++) ph += '<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
    return '<section class="pg">' + header(p, 'Baby Chart & Phototherapy')
      + '<div class="cap">Baby monitoring</div><table class="por"><thead><tr><th>Date / time</th>' + cols.map(function (x) { return '<th>' + x[1] + '</th>'; }).join('') + '<th>Staff</th></tr></thead><tbody>'
      + rows.map(function (r) { return '<tr>' + r.map(function (x) { return '<td>' + esc(x || '') + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>'
      + '<div class="cap" style="margin-top:6mm">Phototherapy monitoring</div><table class="por"><thead><tr><th>Started</th><th>Stopped</th><th>Duration</th><th>Type</th><th>TSB (mg/dL)</th><th>Staff</th><th>Notes</th></tr></thead><tbody>' + ph + '</tbody></table>'
      + sigRow() + '</section>';
  }
  function labResults(p, o) {
    var out = [];
    var pt = null;
    try { pt = (typeof PATIENTS !== 'undefined' ? PATIENTS : []).find(function (x) { return x.bmhId === p.bmhId; }) || null; } catch (e) {}
    var take = function (orders) {
      (Array.isArray(orders) ? orders : Object.values(orders || {})).forEach(function (o2) {
        if (!o2 || !o2.result) return;
        var when = o2.completedAt || o2.orderedAt || '';
        var from = Date.parse(p.admittedAt || '') ? dayKey(new Date(Date.parse(p.admittedAt) - 864e5 * 3)) : o.from;
        if (when && (dayKey(when) < (from < o.from ? from : o.from) || dayKey(when) > o.to)) return;
        var r = o2.result;
        out.push({ when: when, name: o2.name || '', val: r.val || '', unit: r.unit || '', range: r.range || '', flag: (r.flag && r.flag !== '—') ? r.flag : '' });
      });
    };
    var fromStore = function () { return pt ? pt.investigationOrders : []; };
    var live = window.FBDB ? Promise.race([
      window.FBDB.ref('patients/' + p.bmhId + '/investigationOrders').once('value').then(function (s) { return s.val(); }),
      new Promise(function (r) { setTimeout(function () { r(null); }, 5000); })
    ]).catch(function () { return null; }) : Promise.resolve(null);
    return live.then(function (v) { take(v || fromStore()); var seen = {}; return out.filter(function (x) { var k = x.name + '|' + x.when; if (seen[k]) return false; seen[k] = 1; return true; }).sort(function (a, b) { return String(a.when).localeCompare(String(b.when)); }); });
  }
  function labsPage(p, list) {
    var rows = list.map(function (r) { return '<tr><td>' + esc(fmtDT(r.when)) + '</td><td><b>' + esc(r.name) + '</b></td><td>' + esc(r.val) + '</td><td>' + esc(r.unit) + '</td><td>' + esc(r.range) + '</td><td>' + esc(r.flag) + '</td></tr>'; }).join('');
    if (!rows) rows = '<tr><td colspan="6" style="color:#666;padding:6mm">No lab results found for this stay.</td></tr>';
    return '<section class="pg">' + header(p, 'Lab Results During Admission') + '<table class="por"><thead><tr><th>Date / time</th><th>Test</th><th>Result</th><th>Unit</th><th>Normal range</th><th>Flag</th></tr></thead><tbody>' + rows + '</tbody></table></section>';
  }
  function buildPrint(p, o) {
    var pages = o.pages && o.pages.length ? o.pages : ['notes'];
    var labs = pages.indexOf('labs') >= 0 ? labResults(p, o) : Promise.resolve(null);
    return labs.then(function (labList) {
      var html = '';
      if (pages.indexOf('notes') >= 0) html += notesPage(p, o);
      if (pages.indexOf('chart') >= 0 && window.bmhIpdMeds) { try { html += window.bmhIpdMeds.chartPage(p, o, header, sigRow); } catch (e) { console.warn('[ipd-care] chart', e); } }
      if (pages.indexOf('por') >= 0) html += porPage(p, o);
      if (pages.indexOf('baby') >= 0) html += babyPage(p, o);
      if (labList) html += labsPage(p, labList);
      var css = '*{box-sizing:border-box}body{margin:0;font-family:Arial,Helvetica,sans-serif;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:8mm}'
        + '.pg{page-break-after:always;break-after:page}.pg:last-child{page-break-after:auto;break-after:auto}body>*{filter:grayscale(1)}'
        + 'table{width:100%;border-collapse:collapse}th,td{border:1px solid #333;padding:3px 5px;font-size:10px;vertical-align:top;text-align:left}th{background:#e8e8e8;font-size:9.5px;text-transform:uppercase;letter-spacing:.3px}'
        + 'table.pn{table-layout:fixed}table.pn td{font-size:10.5px;line-height:1.35;word-wrap:break-word}table.pn td.d{font-weight:700;white-space:nowrap}table.pn td.t{white-space:nowrap}table.pn tr.blank td{height:22mm}table.pn .by{font-size:9px;color:#444;margin-top:2px;font-style:italic}.hint{color:#bbb;font-size:9px}'
        + 'table.por td{height:7.5mm;font-size:9.5px}.cap{font-size:11px;font-weight:900;text-transform:uppercase;margin:2mm 0 1.5mm}';
      return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>IPD file — ' + esc(p.name || '') + '</title><style>' + css + '</style></head><body>' + html + '</body></html>';
    });
  }
  window.bmhIpdCare = { FORMS: FORMS, buildPrint: buildPrint };
})();
