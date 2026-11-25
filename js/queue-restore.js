/* BMH — Reception → Charges: the "↩" arrow puts a patient back in today's queue — for the department of that receipt.
 * The arrow shows on a payment of today whenever that patient is not in today's queue for the receipt's department —
 * removed from the queue by mistake (whole entry or only one department's row, e.g. Psychiatry), or already marked seen.
 * Clicking it brings the patient back to that department's waiting list (doctor queue and reception queue):
 *   • a removed extra-department row (second department the same day) is switched back on;
 *   • a removed main entry is put back as waiting for that department (before, a fully removed patient could not be
 *     brought back from here — the arrow showed "sent back" but nothing changed);
 *   • a patient already seen is sent back to the active list as before.
 * The receipts / charges are not touched. Written to the audit log (QUEUE_RESTORED).
 * Off switch (this browser): localStorage.setItem('bmh_queue_restore_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_queue_restore_off') === '1') return; } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function dk(v) { try { return normalizeDeptKeyForQueue(v || ''); } catch (e) { return String(v || '').toLowerCase(); } }
  function today() { try { return localDateKey(new Date()); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  function dayOf(v) { try { return v ? localDateKey(v) : ''; } catch (e) { return ''; } }
  function findPt(id) { try { return (PATIENTS || []).find(function (p) { return p && String(p.bmhId) === String(id); }) || null; } catch (e) { return null; } }
  function rows(p) { return Array.isArray(p && p.deptQueueEntries) ? p.deptQueueEntries : []; }
  function todayRow(r) { return r && dayOf(r.createdAt || r.queueAddedAt || r.updatedAt) === today(); }
  function txnDept(id) {
    try { var t = (TRANSACTIONS || []).filter(function (x) { return x && String(x.bmhId) === String(id) && dayOf(x.date || x.createdAt) === today(); }).pop(); return t ? dk(t.dept) : ''; } catch (e) { return ''; }
  }
  // is the patient in today's waiting list for this department?
  function waiting(p, dept) {
    if (!p) return false;
    var st = String(p.status || '').toLowerCase();
    if (st === 'ipd' || st === 'discharged') return true; // not for the arrow
    var main = dk(p.dept || p.department);
    if (!dept || main === dept) {
      var mainToday = false; try { mainToday = patientQueueDateMatchesToday(p); } catch (e) {}
      var seen = false; try { seen = isQueueRowMarkedSeen(p); } catch (e) { seen = !!p.seen; }
      if (mainToday && !p.queueRemoved && st !== 'removed' && !seen) return true;
      if (!dept) return false;
    }
    return rows(p).some(function (r) { return todayRow(r) && dk(r.dept) === dept && r.active !== false && !r.removedAt && !r.seenAt; });
  }
  function audit(p, dept, how) { try { fbPush('auditLog', { user: (CURRENT_USER || {}).name || '', role: (CURRENT_USER || {}).role || '', action: 'QUEUE_RESTORED', item: (p.name || '') + ' · ' + p.bmhId + ' · ' + dept + ' · ' + how, timestamp: new Date().toISOString() }); } catch (e) {} }
  function rerender() { try { renderDocQueue && renderDocQueue(); } catch (e) {} try { renderReceptionPage && renderReceptionPage(); } catch (e) {} try { renderDashboard && renderDashboard(); } catch (e) {} try { renderCollectionDashboard && renderCollectionDashboard(); } catch (e) {} }
  function restore(p, dept) {
    var id = p.bmhId, nowIso = new Date().toISOString(), main = dk(p.dept || p.department);
    dept = dept || main;
    // 1. a removed extra-department row of today → back on
    var rr = rows(p), hit = -1;
    rr.forEach(function (r, i) { if (todayRow(r) && dk(r.dept) === dept && (r.active === false || r.removedAt) && !r.seenAt && !r.promotedAt) hit = i; });
    if (hit >= 0 && main !== dept) {
      var next = rr.map(function (r, i) { if (i !== hit) return r; var c = Object.assign({}, r, { active: true, updatedAt: nowIso, restoredAt: nowIso }); delete c.removedAt; return c; });
      p.deptQueueEntries = next;
      try { fbUpdate('patients/' + id, { deptQueueEntries: sanitizeFirebaseValue(next), updatedAt: nowIso }); } catch (e) {}
      audit(p, dept, 'department row back on'); return true;
    }
    // 2. removed main entry → waiting again for this department
    var st = String(p.status || '').toLowerCase();
    if (p.queueRemoved || st === 'removed') {
      var seenByDept = p.seenByDept || {}; try { seenByDept = clearPatientSeenStateForDept(p, dept); } catch (e) {}
      var patch = { status: 'waiting', seen: false, seenAt: null, seenByDept: sanitizeFirebaseValue(seenByDept), queueRemoved: false, queueRemovedAt: null, queueRemovedBy: '',
        checkinAt: Date.now(), queueAddedAt: nowIso, queueDate: today(), visitDate: today(), queueSource: p.queueSource || 'reception', dept: dept, updatedAt: nowIso, queueRestoredAt: nowIso, queueRestoredBy: (CURRENT_USER || {}).name || '' };
      Object.assign(p, patch);
      try { fbUpdate('patients/' + id, patch); } catch (e) {}
      audit(p, dept, 'removed entry put back'); return true;
    }
    // 3. other cases (seen, another day, another department) → the existing restore
    var ok = false;
    try { ok = bmhEnsurePatientInTodayDeptQueue(id, { dept: dept, silentToast: true, allowRestoreRemoved: true }); } catch (e) {}
    if (!ok && main === dept) { try { restorePatientToActiveQueue(id); ok = true; } catch (e) {} }
    if (ok) audit(p, dept, 'sent back to queue');
    return ok;
  }
  window.bmhRestoreQueueForDept = function (id, dept) {
    var go = function (p) {
      if (!p) { toast('Patient not found', 'w'); return; }
      dept = dk(dept) || txnDept(id) || dk(p.dept);
      if (waiting(p, dept)) { toast((p.name || 'Patient') + ' is already in today\'s ' + dept + ' queue', 'i'); return; }
      if (!window.confirm('Put ' + (p.name || id) + ' back in today\'s queue' + (dept ? ' (' + (function () { try { return bmhDeptLabel(dept); } catch (e) { return dept; } })() + ')' : '') + '?')) return;
      if (restore(p, dept)) { toast((p.name || 'Patient') + ' is back in today\'s queue ✓', 's'); rerender(); }
      else toast('Could not put the patient back — open the patient and add to queue from reception', 'w');
    };
    var p = findPt(id);
    if (p) return go(p);
    if (!window.FBDB) return go(null);
    window.FBDB.ref('patients/' + String(id).replace(/[.#$\[\]\/]/g, '_')).once('value').then(function (s) {
      var v = s.val(); if (v) { v.bmhId = v.bmhId || id; try { PATIENTS.push(v); } catch (e) {} }
      go(v);
    }).catch(function () { go(null); });
  };
  function install() {
    var o = window.receptionQueueRestoreButtonHtml; if (typeof o !== 'function') return false; if (o._qr) return true;
    var w = function (bmhId, opts) {
      opts = opts || {};
      var id = String(bmhId || '').trim(); if (!id) return '';
      var dept = dk(opts.dept) || txnDept(id);
      var p = findPt(id);
      if (p && waiting(p, dept)) return '';
      if (!p) return o.apply(this, arguments);
      var style = String(opts.style || 'background:rgba(26,60,110,.1);color:var(--bmh-blue);border:1px solid var(--bmh-blue);border-radius:6px;padding:3px 7px;font-size:10px;font-weight:800;cursor:pointer;flex-shrink:0');
      return '<button type="button" title="' + esc(opts.title || 'Put back in today\'s queue') + '" onclick="event.stopPropagation();bmhRestoreQueueForDept(\'' + id.replace(/'/g, "\\'") + '\',\'' + esc(dept) + '\')" style="' + style + '">' + esc(opts.label || '↩') + '</button>';
    };
    w._qr = true; window.receptionQueueRestoreButtonHtml = w;
    try { renderCollectionDashboard && renderCollectionDashboard(); } catch (e) {}
    return true;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
