/* BMH — IPD: "Recently discharged" list with Restore to IPD.
 *  • Under the IPD patient list: "🕘 Recently discharged (last 7 days)" — shown on request (loads only the latest
 *    admissions, not the whole IPD history).
 *  • "↩ Restore to IPD" puts the admission back exactly as it was: the same admission record with all doctor notes,
 *    vitals, monitoring, medicines and nursing checks saved until the discharge (nothing is re-created).
 *    The patient's IPD flag and the linked OT case are set back to admitted. Who restored it and when is recorded on the
 *    admission (restoreLog), and an earlier discharge-card print does not discharge it again.
 */
(function () {
  'use strict';
  var DAYS = 7, LAST_N = 60;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || 'Staff'; } catch (e) { return 'Staff'; } }
  function list() { try { return window.IPD_PATIENTS || IPD_PATIENTS || []; } catch (e) { return window.IPD_PATIENTS || []; } }
  function fmt(iso) { var d = new Date(iso); if (isNaN(d)) return ''; return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }
  function centreOk(p) { try { return typeof centreMatch === 'function' ? centreMatch(p) : true; } catch (e) { return true; } }
  var deptLbl = { ophtho: 'Eye', obg: 'OBG', psych: 'Psych', skin: 'Skin', general: 'General' };

  var S = { open: false, rows: null, loading: false, at: 0 };
  function load(force) {
    if (!window.FBDB) return Promise.resolve([]);
    if (!force && S.rows && Date.now() - S.at < 60000) return Promise.resolve(S.rows);
    S.loading = true; draw();
    var since = Date.now() - DAYS * 86400e3;
    // admission ids are 'IPD' + time, so the last keys are the latest admissions
    return window.FBDB.ref('ipdPatients').orderByKey().limitToLast(LAST_N).once('value').then(function (snap) {
      var v = snap.val() || {};
      S.rows = Object.keys(v).map(function (k) { var r = v[k] || {}; r.id = r.id || k; return r; }).filter(function (r) {
        var st = String(r.status || '').toLowerCase();
        var at = Date.parse(r.dischargedAt || r.dischargeDate || '') || 0;
        return (st === 'discharged' || r.dischargedAt) && at >= since && centreOk(r) && !list().some(function (a) { return a && a.id === r.id; });
      }).sort(function (a, b) { return String(b.dischargedAt || '').localeCompare(String(a.dischargedAt || '')); });
      S.at = Date.now(); S.loading = false; draw(); return S.rows;
    }).catch(function (e) { S.loading = false; S.rows = []; draw(); toast('Could not load discharged patients — check connection', 'w'); console.warn(e); return []; });
  }
  function counts(r) {
    var n = function (k) { return Array.isArray(r[k]) ? r[k].length : (r[k] && typeof r[k] === 'object' ? Object.keys(r[k]).length : 0); };
    var parts = [];
    var notes = n('doctorNotes') + n('notes') + n('progressNotes'), vit = n('vitalSigns'), chk = n('nursingChecks'), meds = n('medAdmin') + n('medicationChart') + n('meds');
    if (notes) parts.push(notes + ' notes'); if (vit) parts.push(vit + ' vitals'); if (chk) parts.push(chk + ' nursing checks'); if (meds) parts.push(meds + ' medicine entries');
    return parts.join(' · ');
  }
  function draw() {
    var host = document.getElementById('ipd-recent-dc'); if (!host) return;
    var head = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;cursor:pointer" onclick="bmhIpdRecentToggle()"><div style="font-size:12.5px;font-weight:900;color:var(--bmh-blue,#1A3C6E)">🕘 Recently discharged <span style="font-weight:600;color:#667085;font-size:11px">(last ' + DAYS + ' days · restore if discharged by mistake)</span></div><span style="font-size:12px;font-weight:900;color:#667085">' + (S.open ? '▲' : '▼') + '</span></div>';
    if (!S.open) { host.innerHTML = head; return; }
    var body;
    if (S.loading && !S.rows) body = '<div style="padding:10px;font-size:12px;color:#667085">Loading…</div>';
    else if (!S.rows || !S.rows.length) body = '<div style="padding:10px;font-size:12px;color:#667085">No patients discharged in the last ' + DAYS + ' days.</div>';
    else body = S.rows.map(function (r) {
      return '<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid #e3e8f2;border-radius:10px;margin-top:6px;background:#fafbfd">'
        + '<div style="flex:1;min-width:0"><div style="font-weight:800;font-size:12.5px">' + esc(r.name || 'Patient') + ' <span style="font-size:10.5px;color:#667085;font-weight:600">' + esc(r.bmhId || '') + ' · ' + esc(deptLbl[r.dept] || r.dept || '') + (r.ward ? ' · ' + esc(r.ward) : '') + '</span></div>'
        + '<div style="font-size:10.5px;color:#8a4200">Discharged ' + esc(fmt(r.dischargedAt || r.dischargeDate)) + (r.dischargedBy ? ' by ' + esc(r.dischargedBy) : '') + '</div>'
        + '<div style="font-size:10.5px;color:#667085">Admitted ' + esc(r.admittedDate || fmt(r.admittedAt)) + (counts(r) ? ' · ' + esc(counts(r)) : '') + '</div></div>'
        + '<button type="button" class="btn btn-xs btn-gold" onclick="bmhIpdRestore(\'' + esc(r.id).replace(/'/g, "\\'") + '\')">↩ Restore to IPD</button></div>';
    }).join('');
    host.innerHTML = head + '<div style="margin-top:4px">' + body + '</div>' + (S.rows && S.rows.length ? '<div style="text-align:right;margin-top:6px"><button type="button" class="btn btn-xs btn-outline" onclick="bmhIpdRecentReload()">↻ Refresh</button></div>' : '');
  }
  window.bmhIpdRecentToggle = function () { S.open = !S.open; draw(); if (S.open) load(); };
  window.bmhIpdRecentReload = function () { load(true); };

  window.bmhIpdRestore = function (id) {
    var r = (S.rows || []).find(function (x) { return x.id === id; });
    if (!r || !window.FBDB) return;
    if (list().some(function (a) { return a && a.bmhId && a.bmhId === r.bmhId && String(a.status || '').toLowerCase() !== 'discharged'; })) { toast((r.name || 'This patient') + ' already has an active IPD admission', 'w'); return; }
    if (!confirm('Restore ' + (r.name || 'this patient') + ' to IPD?\n\nThe admission comes back with all notes, vitals, medicines and nursing checks saved until the discharge (' + fmt(r.dischargedAt) + (r.dischargedBy ? ' by ' + r.dischargedBy : '') + ').')) return;
    // fresh copy of the admission (in case anything was added after the list loaded)
    window.FBDB.ref('ipdPatients/' + id).once('value').then(function (snap) {
      var rec = snap.val(); if (!rec) { toast('Admission record not found', 'w'); return; }
      var at = new Date().toISOString(), by = who();
      var log = Array.isArray(rec.restoreLog) ? rec.restoreLog.slice() : [];
      log.push({ at: at, by: by, dischargedAt: rec.dischargedAt || '', dischargedBy: rec.dischargedBy || '' });
      rec.id = rec.id || id;
      rec.status = 'admitted';
      delete rec.dischargedAt; delete rec.dischargedBy; delete rec.dischargeDate;
      rec.restoredAt = at; rec.restoredBy = by; rec.restoreLog = log;
      var clean = rec; try { clean = sanitizeFirebaseValue(rec); } catch (e) {}
      var up = {};
      up['ipdPatients/' + id + '/status'] = 'admitted';
      up['ipdPatients/' + id + '/dischargedAt'] = null;
      up['ipdPatients/' + id + '/dischargedBy'] = null;
      up['ipdPatients/' + id + '/dischargeDate'] = null;
      up['ipdPatients/' + id + '/restoredAt'] = at;
      up['ipdPatients/' + id + '/restoredBy'] = by;
      up['ipdPatients/' + id + '/restoreLog'] = log;
      up['activeIpdPatients/' + id] = clean;
      if (rec.bmhId) {
        up['patients/' + rec.bmhId + '/ipdAdmitted'] = true;
        up['patients/' + rec.bmhId + '/ipdDischargedAt'] = null;
        up['patients/' + rec.bmhId + '/ipdDischargedBy'] = null;
        up['patients/' + rec.bmhId + '/updatedAt'] = at;
      }
      var ot = null;
      if (rec.otCaseId) {
        try { ot = (window.OT_CASES || OT_CASES || []).find(function (c) { return c && String(c.id) === String(rec.otCaseId); }); } catch (e) {}
        up['otCases/' + rec.otCaseId + '/ipdStatus'] = 'admitted';
        up['otCases/' + rec.otCaseId + '/ipdDischargedAt'] = null;
        up['otCases/' + rec.otCaseId + '/ipdDischargedBy'] = null;
        up['otCases/' + rec.otCaseId + '/admitToIpd'] = true;
        up['otCases/' + rec.otCaseId + '/lastTouchedAt'] = at;
      }
      // shown at once; the save is queued by Firebase (also if the connection drops for a moment)
      window.FBDB.ref().update(up).catch(function (e) { console.warn('[ipd-restore] save', e); toast('Restore could not be saved — check connection and try again', 'w'); });
      (function () {
        var arr = list(), i = arr.findIndex(function (a) { return a && a.id === id; });
        if (i >= 0) arr[i] = rec; else arr.push(rec);
        try { var pt = PATIENTS.find(function (p) { return p.bmhId === rec.bmhId; }); if (pt) { pt.ipdAdmitted = true; delete pt.ipdDischargedAt; delete pt.ipdDischargedBy; } } catch (e) {}
        if (ot) { ot.ipdStatus = 'admitted'; ot.admitToIpd = true; delete ot.ipdDischargedAt; delete ot.ipdDischargedBy; ot.lastTouchedAt = at; try { saveOTCasesToLocalStorage(); } catch (e) {} }
        S.rows = (S.rows || []).filter(function (x) { return x.id !== id; });
        try { renderIPD(); } catch (e) {}
        try { renderDocQueue(); } catch (e) {}
        toast((rec.name || 'Patient') + ' restored to IPD ✓', 's');
      })();
    }).catch(function (e) { console.warn('[ipd-restore]', e); toast('Could not restore — check connection and try again', 'w'); });
  };

  function inject() {
    var lst = document.getElementById('ipd-list'); if (!lst) return false;
    if (!document.getElementById('ipd-recent-dc')) {
      var d = document.createElement('div'); d.id = 'ipd-recent-dc';
      d.style.cssText = 'margin-top:12px;padding:10px 12px;border:1px dashed #c9d3e3;border-radius:12px;background:#fff';
      lst.parentNode.insertBefore(d, lst.nextSibling);
    }
    draw(); return true;
  }
  var origRender = window.renderIPD;
  if (typeof origRender === 'function') {
    window.renderIPD = function () { var r = origRender.apply(this, arguments); try { inject(); if (S.open && S.rows) S.rows = S.rows.filter(function (x) { return !list().some(function (a) { return a && a.id === x.id; }); }); } catch (e) {} return r; };
  }
  // a discharge on this computer refreshes the list next time it is opened
  var origDc = window.dischargeIPDPatientById;
  if (typeof origDc === 'function') {
    window.dischargeIPDPatientById = function () { var r = origDc.apply(this, arguments); S.at = 0; if (S.open) setTimeout(function () { load(true); }, 1500); return r; };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject); else inject();
})();
