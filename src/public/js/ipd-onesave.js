/* BMH — IPD monitoring sheet: one Save button for everything.
 * Everything typed on the monitoring sheet (vitals, mother / baby / post-op checks, phototherapy, checklist, labour)
 * is kept in memory while the nurse moves between tabs, and the single "💾 Save monitoring sheet" button at the
 * bottom saves all of it together after one PIN. The separate Save buttons are hidden.
 * Unsaved entries stay filled in if the sheet is closed and reopened, with a note at the top, until they are saved
 * or cleared. Medicine "Give" buttons, doctor-instruction "Done" and "+ Add Vitals / Note" work as before.
 */
(function () {
  'use strict';
  var drafts = {}; // patient id → { at, f: { elementId: value } }
  var curPid = '';
  var busy = false;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function pts() { try { return window.IPD_PATIENTS || IPD_PATIENTS || []; } catch (e) { return window.IPD_PATIENTS || []; } }
  function findPt(id) {
    var a = null; try { a = activeIPDPatient; } catch (e) { a = window.activeIPDPatient || null; }
    if (a && a.id === id) return a;
    return pts().find(function (x) { return x && x.id === id; }) || null;
  }
  function host() { return document.getElementById('ipd-monitor-body'); }
  function forms() { return (window.bmhIpdCare && window.bmhIpdCare.FORMS) || {}; }
  function hhmm(iso) { var d = new Date(iso); return isNaN(d) ? '' : String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  function fmtDT(iso) { try { var d = new Date(iso); return isNaN(d) ? '' : d.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }
  function fields() {
    var h = host(); if (!h) return [];
    return [].filter.call(h.querySelectorAll('input[id],select[id],textarea[id]'), function (el) {
      return /^(ipdm-|ipdc-)/.test(el.id) && el.id !== 'ipdm-nurse-select' && !/^ipdm-src/.test(el.id);
    });
  }
  function valOf(el) { return el.type === 'checkbox' ? (el.checked ? (el.getAttribute('value') || '1') : '') : String(el.value || ''); }
  function capture() {
    if (!curPid || !host()) return;
    var d = drafts[curPid] || { at: '', f: {}, base: {} };
    fields().forEach(function (el) {
      var v = valOf(el);
      if (!(el.id in d.base)) d.base[el.id] = v;
      if (v !== d.base[el.id]) { if (!d.at) d.at = new Date().toISOString(); }
      d.f[el.id] = v;
    });
    drafts[curPid] = d;
  }
  // remember each field's value as first shown (blank, "now" times, saved labour values) so we can tell what was typed
  function baseline() {
    if (!curPid) return;
    var d = drafts[curPid] || (drafts[curPid] = { at: '', f: {}, base: {} });
    fields().forEach(function (el) { if (!(el.id in d.base)) d.base[el.id] = valOf(el); });
  }
  var suppress = false;
  function dirty(d) { return !!(d && Object.keys(d.f).some(function (k) { return d.f[k] !== (d.base[k] == null ? '' : d.base[k]); })); }
  function restore() {
    var d = drafts[curPid]; if (!d) return;
    fields().forEach(function (el) {
      if (!(el.id in d.f)) return;
      var v = d.f[el.id];
      if (el.type === 'checkbox') { if (el.checked !== !!v) { el.checked = !!v; try { el.dispatchEvent(new Event('change')); } catch (e) {} } }
      else if (String(el.value) !== v) { el.value = v; try { el.dispatchEvent(new Event('change')); } catch (e) {} }
    });
  }
  // replace the phototherapy Start / Stop button with a tick-box that is saved with the sheet
  function photoToggle() {
    var box = document.getElementById('ipdc-photo'); if (!box) return;
    var btn = box.querySelector('button[onclick^="bmhIpdPhoto"]'); if (!btn) return;
    var act = /'stop'/.test(btn.getAttribute('onclick') || '') ? 'stop' : 'start';
    var wrap = document.createElement('label');
    wrap.style.cssText = 'display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:800;cursor:pointer';
    wrap.innerHTML = '<input type="checkbox" id="ipdc-ph-act" value="' + act + '" style="width:auto;margin:0"> ' + (act === 'start' ? '▶ Start phototherapy' : '⏹ Stop phototherapy') + ' <span style="font-weight:500;color:#8a6500">(saved with the sheet)</span>';
    btn.parentNode.replaceChild(wrap, btn);
  }
  function tidy() {
    var h = host(); if (!h) return;
    ['saveIPDMonitorVitals', 'bmhIpdSaveCheck'].forEach(function (fn) {
      [].forEach.call(h.querySelectorAll('button[onclick^="' + fn + '"]'), function (b) { b.style.display = 'none'; });
    });
    var old = h.querySelector('button[onclick^="saveIPDMonitoringSheet"]');
    if (old && old.parentNode) old.parentNode.style.display = 'none';
    photoToggle();
    if (!document.getElementById('ipdos-bar')) {
      var bar = document.createElement('div'); bar.id = 'ipdos-bar';
      bar.style.cssText = 'position:sticky;bottom:0;z-index:5;margin-top:12px;background:#fff;border-top:2px solid #D4A017;padding:10px 4px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;box-shadow:0 -6px 14px rgba(0,0,0,.06)';
      bar.innerHTML = '<div style="flex:1;min-width:160px;font-size:11.5px;color:#555">Vitals, nursing checks, phototherapy, checklist and labour details are all saved together.</div>'
        + '<button type="button" class="btn btn-gray btn-sm" onclick="closeM(\'m-ipd-monitor\')">Close</button>'
        + '<button type="button" class="btn btn-gold" id="ipdos-save" onclick="bmhIpdSaveAll()">💾 Save monitoring sheet</button>';
      h.appendChild(bar);
    }
    var d = drafts[curPid];
    var note = document.getElementById('ipdos-unsaved');
    if (dirty(d)) {
      if (!note) {
        note = document.createElement('div'); note.id = 'ipdos-unsaved';
        note.style.cssText = 'background:#fff8e1;border:1px solid #f0d68a;border-radius:10px;padding:8px 12px;margin-bottom:10px;font-size:12px;display:flex;gap:8px;align-items:center;flex-wrap:wrap';
        h.insertBefore(note, h.firstChild);
      }
      note.innerHTML = '<div style="flex:1">✏️ <b>Unsaved entries' + (d.at ? ' from ' + esc(hhmm(d.at)) : '') + '</b> are filled in below — press <b>Save monitoring sheet</b> at the bottom to keep them.</div><button type="button" class="btn btn-xs btn-outline" onclick="bmhIpdClearDraft()">Clear</button>';
    } else if (note) note.remove();
  }
  window.bmhIpdClearDraft = function () {
    if (!confirm('Clear the unsaved entries?')) return;
    delete drafts[curPid];
    suppress = true;
    try { renderIPDMonitoringSheet(curPid); } catch (e) {}
    suppress = false;
  };

  // keep typed values when switching Mother / Baby / Post-op tabs
  var origTab = window.bmhIpdCheckTab;
  if (typeof origTab === 'function') {
    window.bmhIpdCheckTab = function (id) {
      capture();
      var r = origTab.apply(this, arguments);
      try { baseline(); restore(); tidy(); } catch (e) { console.warn('[ipd-onesave]', e); }
      return r;
    };
  }
  // keep typed values when the sheet redraws (e.g. after a medicine is given)
  var origRender = window.renderIPDMonitoringSheet;
  if (typeof origRender === 'function') {
    window.renderIPDMonitoringSheet = function (id) {
      if (curPid === id && !suppress) capture();
      var r = origRender.apply(this, arguments);
      curPid = id;
      try { baseline(); restore(); tidy(); } catch (e) { console.warn('[ipd-onesave]', e); }
      return r;
    };
  }

  function summary(kind, values) {
    var f = forms()[kind]; if (!f) return '';
    return f.fields.filter(function (x) { return String(values[x[0]] || '').trim(); }).map(function (x) { return x[1].replace(/\s*\(.*\)$/, '') + ': ' + values[x[0]]; }).join(' · ');
  }
  function addNote(p, text, nurse, at) {
    if (!Array.isArray(p.notes)) p.notes = [];
    var d = new Date(at);
    p.notes.unshift({ date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), time: hhmm(at), note: text, nurse: nurse, doctor: '', recordedAt: at, kind: 'check' });
  }
  function gate() {
    var g = window.bmhIpdNursing && window.bmhIpdNursing.gate;
    if (g) return g('ipdm-nurse-select');
    try { return Promise.resolve(requireIPDNurseAuth('ipdm-nurse-select') || ''); } catch (e) { return Promise.resolve(String((document.getElementById('ipdm-nurse-select') || {}).value || '')); }
  }

  window.bmhIpdSaveAll = function () {
    if (busy || !curPid) return;
    var p = findPt(curPid); if (!p) return;
    capture();
    var d = drafts[curPid] || { f: {}, base: {} };
    var F = d.f;
    var g = function (id) { return String(F[id] == null ? '' : F[id]).trim(); };
    var changed = function (id) { return g(id) !== String(d.base[id] == null ? '' : d.base[id]).trim(); };
    // what was entered
    var vit = { bp: g('ipdm-bp'), pulse: g('ipdm-pulse'), temp: g('ipdm-temp'), spo2: g('ipdm-spo2'), rr: g('ipdm-rr'), pain: g('ipdm-pain') };
    var hasVitals = Object.keys(vit).some(function (k) { return vit[k]; });
    var checks = [];
    Object.keys(forms()).forEach(function (kind) {
      var vals = {};
      forms()[kind].fields.forEach(function (x) { var v = g('ipdc-' + kind + '-' + x[0]); if (v) vals[x[0]] = v; });
      if (Object.keys(vals).length) checks.push({ kind: kind, values: vals });
    });
    var photoAct = g('ipdc-ph-act');
    busy = true;
    var btn = document.getElementById('ipdos-save'); if (btn) btn.disabled = true;
    gate().then(function (nurse) {
      if (!nurse) return;
      var at = new Date().toISOString();
      var patch = {}, done = [];
      if (hasVitals) {
        p.vitals = Object.assign({}, p.vitals || {}, vit);
        if (!Array.isArray(p.vitalSigns)) p.vitalSigns = [];
        p.vitalSigns.unshift(Object.assign({ recordedAt: at, by: nurse }, vit));
        var nextDue = (p.monitoringPlan || []).find(function (slot) { return slot.status !== 'done'; });
        if (nextDue) { nextDue.status = 'done'; nextDue.recordedAt = at; nextDue.by = nurse; }
        patch.vitals = p.vitals; patch.vitalSigns = p.vitalSigns; patch.monitoringPlan = p.monitoringPlan || [];
        done.push('vitals');
      }
      if (checks.length) {
        if (!Array.isArray(p.nursingChecks)) p.nursingChecks = [];
        checks.forEach(function (c) {
          p.nursingChecks.unshift({ kind: c.kind, at: at, by: nurse, values: c.values });
          addNote(p, forms()[c.kind].label + ' check — ' + summary(c.kind, c.values), nurse, at);
          done.push(forms()[c.kind].label.toLowerCase() + ' check');
        });
        if (p.nursingChecks.length > 400) p.nursingChecks.length = 400;
        patch.nursingChecks = p.nursingChecks; patch.notes = p.notes;
      }
      if (photoAct) {
        if (!Array.isArray(p.phototherapy) ) p.phototherapy = [];
        var tsb = g('ipdc-ph-tsb'), pnote = g('ipdc-ph-note'), text = '';
        var open = p.phototherapy.find(function (s) { return s && s.start && !s.end; });
        if (photoAct === 'start' && !open) {
          var st = g('ipdc-ph-start'); var start = st ? new Date(st).toISOString() : at; var type = g('ipdc-ph-type');
          p.phototherapy.unshift({ start: start, end: '', type: type, tsb: tsb, note: pnote, by: nurse });
          text = 'Phototherapy started ' + fmtDT(start) + (type ? ' (' + type + ')' : '') + (tsb ? ' · TSB ' + tsb + ' mg/dL' : '') + (pnote ? ' · ' + pnote : '');
        } else if (photoAct === 'stop' && open) {
          var en = g('ipdc-ph-end'); open.end = en ? new Date(en).toISOString() : at; open.endBy = nurse; if (tsb) open.endTsb = tsb; if (pnote) open.endNote = pnote;
          var hrs = Math.round((Date.parse(open.end) - Date.parse(open.start)) / 36e5 * 10) / 10;
          text = 'Phototherapy stopped ' + fmtDT(open.end) + (isFinite(hrs) ? ' (total ' + hrs + ' h)' : '') + (tsb ? ' · TSB ' + tsb + ' mg/dL' : '') + (pnote ? ' · ' + pnote : '');
        }
        if (text) { addNote(p, text, nurse, at); patch.phototherapy = p.phototherapy; patch.notes = p.notes; done.push('phototherapy'); }
      }
      // checklist + labour (same as the old "Save Monitoring Sheet")
      var obg = false; try { obg = normalizeDeptKeyForQueue(p.dept || '') === 'obg'; } catch (e) {}
      if (obg && ('ipdm-in-labour' in F)) {
        p.inLabour = !!g('ipdm-in-labour');
        p.labourContractions = g('ipdm-contractions'); p.labourFhr = g('ipdm-fhr'); p.labourLiquor = g('ipdm-liquor');
        p.labourCervix = g('ipdm-cervix'); p.labourBleeding = g('ipdm-bleeding'); p.labourMedicine = g('ipdm-labour-med');
        if (['ipdm-in-labour', 'ipdm-contractions', 'ipdm-fhr', 'ipdm-liquor', 'ipdm-cervix', 'ipdm-bleeding', 'ipdm-labour-med'].some(changed)) done.push('labour details');
      }
      patch.chartRows = p.chartRows || [];
      patch.inLabour = !!p.inLabour;
      ['labourContractions', 'labourFhr', 'labourLiquor', 'labourCervix', 'labourBleeding', 'labourMedicine'].forEach(function (k) { patch[k] = p[k] || ''; });
      patch.lastNursingStaff = nurse; patch.lastNursingCheckAt = at;
      if (!done.length) done.push('checklist');
      return Promise.resolve(bmhUpdateActiveIpdAdmission(p.id, patch)).then(function () {
        delete drafts[p.id];
        suppress = true;
        try { if (window.bmhIpdNursing && window.bmhIpdNursing.deviceNurse() !== nurse) window._ipdAuthenticatedNurse = ''; } catch (e) {}
        try { openIPDPatient(p.id); } catch (e) {}
        try { renderIPDMonitoringSheet(p.id); } catch (e) {}
        try { if (typeof renderIPD === 'function') renderIPD(); } catch (e) {}
        suppress = false;
        toast('Saved by ' + nurse + ': ' + done.join(', ') + ' ✓', 's');
      });
    }).catch(function (e) { console.warn('[ipd-onesave]', e); toast('Could not save — check connection and try again. Your entries are still on the sheet.', 'w'); })
      .then(function () { busy = false; var b = document.getElementById('ipdos-save'); if (b) b.disabled = false; });
  };
  window.bmhIpdOneSave = { drafts: function () { return drafts; }, capture: capture };
})();
