/* BMH — "Open full patient record" from the patient summary.
 * The patient summary (📋 visit history) opened from Reports → Advised follow-up, Appointments and other lists gets a
 * button that opens the same full patient record the doctor sees from My Queue (all visits, findings, Rx).
 * Shown only to logins that have My Queue (doctors / admin); nothing else changes.
 */
(function () {
  'use strict';
  function canOpen() {
    try { if (CURRENT_USER && CURRENT_USER.isAdmin) return true; } catch (e) {}
    var ni = document.querySelector('.ni[onclick*="nav(\'doctor-queue\'"]');
    return !!(ni && ni.offsetParent !== null);
  }
  function findPatient(id) {
    var list = []; try { list = PATIENTS || []; } catch (e) { list = window.PATIENTS || []; }
    return list.find(function (p) { return p && p.bmhId === id; }) || null;
  }
  function userDept() {
    var d = ''; try { d = normalizeDeptKeyForQueue((CURRENT_USER && CURRENT_USER.dept) || ''); } catch (e) {}
    return ['ophtho', 'obg', 'psych', 'skin'].indexOf(d) >= 0 ? d : '';
  }
  window.bmhOpenFullPatientRecord = function (id) {
    var p = findPatient(id);
    if (!p) { try { showToast('This patient is not in the list for your centre — open them from My Queue search', 'w'); } catch (e) {} return; }
    ['m-adv-history', 'm-adv-followup', 'm-adv-due'].forEach(function (m) { try { closeM(m); } catch (e) {} });
    var d = userDept(), own = '';
    try { own = normalizeDeptKeyForQueue(p.dept || ''); } catch (e) {}
    try {
      if (d && own && d !== own) openPatient(id, { deptOverride: d, freshStart: false });
      else openPatient(id);
    } catch (e) { console.warn('[patient-open]', e); }
  };
  var orig = window.bmhShowPatientVisitHistory;
  if (typeof orig !== 'function') return;
  window.bmhShowPatientVisitHistory = function (bmhId) {
    var r = orig.apply(this, arguments);
    try {
      var id = String(bmhId || '').trim();
      var hd = document.querySelector('#m-adv-history .modal-hd');
      var old = document.getElementById('bmh-open-full'); if (old) old.remove();
      if (hd && id && canOpen() && findPatient(id)) {
        var b = document.createElement('button');
        b.id = 'bmh-open-full'; b.type = 'button'; b.className = 'btn btn-gold btn-sm';
        b.style.cssText = 'margin-left:auto;margin-right:8px;white-space:nowrap';
        b.textContent = '🩺 Open full record';
        b.title = 'Open this patient\'s full record, as in My Queue';
        b.onclick = function () { window.bmhOpenFullPatientRecord(id); };
        var close = hd.querySelector('.modal-close');
        hd.insertBefore(b, close || null);
      }
    } catch (e) { console.warn('[patient-open]', e); }
    return r;
  };
})();
