/* BMH — Reception → "Referred By" → Source (PRO / clinic / camp / ECHS …).
 * A shared list of named sources (saved at settings/referralSources, the same on every computer), e.g.
 * PRO · The Clinic · Camp - Sarbat Da Bhala · ECHS Nalagarh · ECHS Ropar. "➕ Add new source…" adds one for everybody;
 * admins can also remove one. The chosen source is saved on the patient (refSource) and on that visit's receipt, and is
 * used by Practice Growth to sort OT cases by agency (camp / ECHS …) for claims.
 * For an existing patient the last source is filled in; change it if this visit is different.
 * Off switch (this browser): localStorage.setItem('bmh_ref_source_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_ref_source_off') === '1') return; } catch (e) {}
  var DEFAULTS = ['PRO', 'The Clinic', 'Camp - Sarbat Da Bhala', 'ECHS Nalagarh', 'ECHS Ropar'];
  var PATH = 'settings/referralSources';
  var LS = 'bmh_ref_sources_v1';
  var list = null;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function me() { try { return CURRENT_USER || {}; } catch (e) { return {}; } }
  function clean(a) { var seen = {}; return (a || []).map(function (x) { return String(x || '').replace(/\s+/g, ' ').trim(); }).filter(function (x) { var k = x.toLowerCase(); if (!x || seen[k]) return false; seen[k] = 1; return true; }); }
  try { var c = JSON.parse(localStorage.getItem(LS) || 'null'); if (Array.isArray(c)) list = clean(c); } catch (e) {}
  function current() { return list && list.length ? list : DEFAULTS.slice(); }
  function save(next) {
    list = clean(next);
    try { localStorage.setItem(LS, JSON.stringify(list)); } catch (e) {}
    try { if (window.FBDB) window.FBDB.ref(PATH).set({ list: list, updatedAt: new Date().toISOString(), by: me().name || '' }).catch(function () {}); } catch (e) {}
    fill();
  }
  function load() {
    try {
      if (!window.FBDB) return;
      window.FBDB.ref(PATH).once('value').then(function (s) {
        var v = s.val();
        if (v && Array.isArray(v.list) && v.list.length) { list = clean(v.list); try { localStorage.setItem(LS, JSON.stringify(list)); } catch (e) {} fill(); }
        else if (!v) save(DEFAULTS.slice());
      }).catch(function () {});
    } catch (e) {}
  }
  function fill(keep) {
    var sel = document.getElementById('rc-ref-source'); if (!sel) return;
    var cur = keep != null ? keep : sel.value;
    var items = current().slice();
    if (cur && items.map(function (x) { return x.toLowerCase(); }).indexOf(cur.toLowerCase()) < 0) items.push(cur);
    var admin = !!me().isAdmin;
    sel.innerHTML = '<option value="">— none —</option>' + items.map(function (x) { return '<option value="' + esc(x) + '">' + esc(x) + '</option>'; }).join('')
      + '<option value="__add">➕ Add new source…</option>' + (admin ? '<option value="__del">🗑 Remove a source…</option>' : '');
    var hit = Array.prototype.filter.call(sel.options, function (o) { return o.value.toLowerCase() === String(cur || '').toLowerCase(); })[0];
    sel.value = hit ? hit.value : '';
    sel.dataset.prev = sel.value;
  }
  document.addEventListener('change', function (e) {
    var sel = e.target; if (!sel || sel.id !== 'rc-ref-source') return;
    if (sel.value === '__add') {
      var name = (window.prompt('New source name (e.g. "Camp - Sarbat Da Bhala", "ECHS Nalagarh", "PRO - Ramesh"):', '') || '').replace(/\s+/g, ' ').trim();
      if (!name) { sel.value = sel.dataset.prev || ''; return; }
      save(current().concat([name])); fill(name); toast('Source added ✓', 's'); return;
    }
    if (sel.value === '__del') {
      var items = current();
      var pick = (window.prompt('Remove which source? Type its number:\n' + items.map(function (x, i) { return (i + 1) + '. ' + x; }).join('\n'), '') || '').trim();
      var i = Number(pick) - 1;
      if (items[i] && window.confirm('Remove "' + items[i] + '" from the list? (Patients already marked with it keep it.)')) { save(items.filter(function (_, j) { return j !== i; })); toast('Source removed', 's'); }
      fill(sel.dataset.prev || ''); return;
    }
    sel.dataset.prev = sel.value;
  }, true);

  // existing patient: fill in the last source
  var origPrefill = window.prefillExistingPatient;
  if (typeof origPrefill === 'function') {
    window.prefillExistingPatient = function (bmhId) {
      var r = origPrefill.apply(this, arguments);
      try {
        var all = (typeof getAllKnownPatientRecords === 'function' ? getAllKnownPatientRecords() : (window.PATIENTS || []));
        var p = all.filter(function (x) { return x && String(x.bmhId || '') === String(bmhId || ''); })[0];
        fill(p && p.refSource ? p.refSource : '');
      } catch (e) {}
      return r;
    };
  }
  // the visit's receipt carries the source too (only the receipt made for that patient right after saving)
  var origSave = window.saveTransactionToFirebase;
  if (typeof origSave === 'function') {
    window.saveTransactionToFirebase = function (txn) {
      try {
        var cur = window._bmhRcRefSource;
        if (txn && cur && !txn.refSource && String(txn.bmhId || '') === cur.bmhId && Date.now() - cur.at < 60000) txn.refSource = cur.src;
      } catch (e) {}
      return origSave.apply(this, arguments);
    };
  }
  document.addEventListener('mousedown', function (e) { if (e.target && e.target.id === 'rc-ref-source') fill(); }, true);
  function boot() { fill(); load(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  var tries = 0, iv = setInterval(function () { if (window.FBDB || ++tries > 30) { clearInterval(iv); load(); } }, 2000);
})();
