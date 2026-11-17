/* BMH — OBG: two doctors (Dr. Namrata Baweja / Dr. Geeta Baweja) alternate. Choose who is seeing the patient:
 *  - My patient queue: OBG rows show a small Doctor dropdown instead of plain text;
 *  - inside the patient (OBG page): the existing "Doctor" dropdown.
 * The choice is saved on the patient (obgDoctor + obgDoctorDate, and assignedDoctor / doctor) and, for that day, the
 * prescription and other OBG prints carry that doctor's name and credentials — even when the other doctor (or admin)
 * is logged in. Other departments and other days work as before. Billing is not touched.
 * Off switch (this browser): localStorage.setItem('bmh_obg_doc_choice_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_obg_doc_choice_off') === '1') return; } catch (e) {}
  var DOCS = ['Dr. Namrata Baweja', 'Dr. Geeta Baweja'];
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function today() { try { return todayKey(); } catch (e) { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } }
  function isObg(p) { try { return normalizeDeptKeyForQueue((p && (p.dept || p.department)) || '') === 'obg'; } catch (e) { return /obg|gyn/i.test(String(p && p.dept || '')); } }
  function fold(n) { return String(n || '').split('·')[0].toLowerCase().replace(/^dr\.?\s*/, '').replace(/[^a-z]/g, ''); }
  function canon(n) { var f = fold(n); return DOCS.filter(function (d) { return fold(d) === f; })[0] || ''; }
  function choiceOf(p) { return p && p.obgDoctor && p.obgDoctorDate === today() ? canon(p.obgDoctor) : ''; }
  function cur() { return window.CURRENT_PATIENT || null; }

  window.bmhObgDoctorSelectHtml = function (p) {
    if (!p || !isObg(p)) return '';
    var now = choiceOf(p) || canon(p.assignedDoctor || p.doctor) || '';
    var id = String(p.bmhId || '').replace(/'/g, "\\'");
    return '<select title="Doctor seeing this patient" onclick="event.stopPropagation()" onchange="event.stopPropagation();bmhSetObgDoctor(\'' + id + '\', this.value)" style="max-width:104px;font-size:10.5px;font-weight:800;padding:2px 3px;border:1.5px solid #c33c69;border-radius:6px;color:#8f294b;background:#fff0f4">'
      + (now ? '' : '<option value="">—</option>') + DOCS.map(function (d) { return '<option value="' + esc(d) + '"' + (d === now ? ' selected' : '') + '>' + esc(d.replace(/^Dr\.\s*/, '').replace(' Baweja', '')) + '</option>'; }).join('') + '</select>';
  };
  window.bmhSetObgDoctor = function (bmhId, name, quiet) {
    name = canon(name); if (!bmhId || !name) return;
    var at = new Date().toISOString(), by = ''; try { by = (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) {}
    var patch = { obgDoctor: name, obgDoctorDate: today(), assignedDoctor: name, doctor: name, obgDoctorSetAt: at, obgDoctorSetBy: by };
    var lists = []; try { lists.push(PATIENTS); } catch (e) {} lists.push(window._BMH_ALL_PATIENTS_CACHE || []);
    lists.forEach(function (l) { (l || []).forEach(function (x) { if (x && String(x.bmhId) === String(bmhId)) Object.assign(x, patch); }); });
    var c = cur(); if (c && String(c.bmhId) === String(bmhId)) Object.assign(c, patch);
    try { fbUpdate && fbUpdate('patients/' + bmhId, patch).catch(function () {}); } catch (e) {}
    try { if (typeof window.patchPatientFirestore === 'function') window.patchPatientFirestore(bmhId, patch).catch(function () {}); } catch (e) {}
    if (c && String(c.bmhId) === String(bmhId)) {
      var sel = document.getElementById('obg-doc-select'); if (sel && sel.value !== name) sel.value = name;
      var sub = document.getElementById('obg-pt-doc'); if (sub) sub.textContent = name;
      var rx = document.getElementById('obg-rx-doctor'); if (rx) rx.textContent = name;
    }
    if (!quiet) { try { showToast(name + ' selected — prints will carry her name ✓', 's'); } catch (e) {} }
  };

  // inside the patient: the OBG page's Doctor dropdown saves the choice too
  document.addEventListener('change', function (e) {
    var t = e.target; if (!t || t.id !== 'obg-doc-select') return;
    var c = cur(); if (c && c.bmhId) window.bmhSetObgDoctor(c.bmhId, t.value, true);
  }, true);

  // opening a patient: show that day's choice in the dropdown
  var origSel = window.getSelectedObgDoctorName;
  if (typeof origSel === 'function') {
    window.getSelectedObgDoctorName = function () {
      var ch = choiceOf(cur());
      if (ch) { var sel = document.getElementById('obg-doc-select'); if (sel && sel.value !== ch) sel.value = ch; return ch; }
      return origSel.apply(this, arguments);
    };
  }
  // prints: today's chosen OBG doctor comes before the logged-in doctor
  var origRes = window.resolveTreatingDoctorForPrint;
  if (typeof origRes === 'function') {
    window.resolveTreatingDoctorForPrint = function (dept, candidates) {
      try {
        var key = normalizeDeptKeyForQueue(dept || '');
        // OT notes / OT prints keep their surgeon exactly as before
        var otPage = false; try { otPage = (typeof getActivePageId === 'function' && getActivePageId() === 'pg-ot') || !!document.querySelector('#m-ot-notes.open, #m-ot-notes[style*="flex"]'); } catch (e) {}
        var c = cur(), ch = key === 'obg' && !otPage ? choiceOf(c) : '';
        if (ch) {
          // an explicitly different OBG doctor passed in (e.g. the OT surgeon) is respected as before
          var me = ''; try { me = (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) {}
          var own = [c.assignedDoctor, c.doctor, c.obgDoctor, me, (document.getElementById('sbnm') || {}).textContent].map(fold);
          var explicit = (candidates || []).map(canon).filter(Boolean).filter(function (n) { return n !== ch && own.indexOf(fold(n)) < 0; })[0];
          if (!explicit) return ch;
        }
      } catch (e) {}
      return origRes.apply(this, arguments);
    };
  }
})();
