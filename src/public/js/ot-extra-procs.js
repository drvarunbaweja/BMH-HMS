/* BMH — OT module: second / third procedure on one OT entry (record only — no charges are raised from OT;
 * charges continue to come from the doctor's panel and reception).
 * e.g. PMICS + IOL  +  Intravitreal injection  +  CTR implantation.
 * Saved on the OT entry as extraProcedures: ['…','…']; shown after the main procedure in the OT list and case sheet;
 * Practice Growth counts each one. Nothing else in the OT flow changes.
 * Off switch (this browser): localStorage.setItem('bmh_ot_extra_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_ot_extra_off') === '1') return; } catch (e) {}
  var MAX = 4;
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function cases() { try { return OT_CASES || []; } catch (e) { return window.OT_CASES || []; } }
  function clean(a) { var seen = {}; return (Array.isArray(a) ? a : []).map(function (x) { return String(x || '').replace(/\s+/g, ' ').trim(); }).filter(function (x) { var k = x.toLowerCase(); if (!x || seen[k]) return false; seen[k] = 1; return true; }).slice(0, MAX); }
  function box() {
    var b = document.getElementById('ot-extra-box'); if (b) return b;
    var proc = document.getElementById('ot-add-proc'); if (!proc) return null;
    var grp = proc.closest('.form-group') || proc.parentNode; if (!grp || !grp.parentNode) return null;
    // after the sub-heading selects, if present
    var after = document.getElementById('ot-add-proc-sub-wrap-2') || document.getElementById('ot-add-proc-sub-wrap') || grp;
    b = document.createElement('div'); b.id = 'ot-extra-box'; b.className = 'form-group';
    b.innerHTML = '<label class="fl">Additional procedures in the same sitting <span style="font-weight:600;color:var(--g1);text-transform:none">(record only — charges are raised from the doctor\'s panel / reception)</span></label>'
      + '<div id="ot-extra-rows"></div><button type="button" class="btn btn-xs btn-outline" id="ot-extra-add" style="margin-top:4px">➕ Add another procedure</button>';
    after.parentNode.insertBefore(b, after.nextSibling);
    b.querySelector('#ot-extra-add').onclick = function () { addRow(''); };
    return b;
  }
  function addRow(val) {
    var b = box(); if (!b) return;
    var rows = b.querySelector('#ot-extra-rows');
    if (rows.children.length >= MAX) { try { showToast('Up to ' + MAX + ' additional procedures', 'i'); } catch (e) {} return; }
    var d = document.createElement('div'); d.style.cssText = 'display:flex;gap:6px;margin-top:4px';
    d.innerHTML = '<input type="text" class="ot-extra-inp" list="ot-proc-list" placeholder="Type procedure to search or add" value="' + esc(val) + '" style="flex:1"><button type="button" class="btn btn-xs btn-gray" title="Remove">✕</button>';
    d.querySelector('button').onclick = function () { d.remove(); };
    d.querySelector('input').addEventListener('focus', function () { try { populateOTProcedureOptions(''); } catch (e) {} });
    rows.appendChild(d);
  }
  function setRows(list) { var b = box(); if (!b) return; b.querySelector('#ot-extra-rows').innerHTML = ''; clean(list).forEach(addRow); }
  function readRows() { return clean(Array.prototype.map.call(document.querySelectorAll('#ot-extra-rows .ot-extra-inp'), function (i) { return i.value; })); }

  // open: blank for a new entry, filled for an edit
  var origOpen = window.openOTAddModal;
  if (typeof origOpen === 'function') {
    window.openOTAddModal = function (opts) {
      var r = origOpen.apply(this, arguments);
      var fill = function () { try { var id = (document.getElementById('ot-add-case-id') || {}).value || (opts && opts.caseId) || ''; var c = id ? cases().filter(function (x) { return x && x.id === id; })[0] : null; setRows(c ? c.extraProcedures : []); } catch (e) {} };
      fill(); setTimeout(fill, 250);
      return r;
    };
  }
  // save: let the normal save run, then record the extra procedures on that entry
  var origAdd = window.addOTCase;
  if (typeof origAdd === 'function') {
    window.addOTCase = function () {
      var extras = [], editId = '', before = {};
      try { extras = readRows(); editId = (document.getElementById('ot-add-case-id') || {}).value || ''; cases().forEach(function (c) { if (c && c.id) before[c.id] = 1; }); } catch (e) {}
      var r = origAdd.apply(this, arguments);
      try {
        var c = editId ? cases().filter(function (x) { return x && x.id === editId; })[0] : cases().filter(function (x) { return x && x.id && !before[x.id]; })[0];
        if (c) {
          var prev = clean(c.extraProcedures);
          if (JSON.stringify(prev) !== JSON.stringify(extras)) {
            c.extraProcedures = extras; c.lastUpdated = new Date().toISOString();
            try { saveOTCasesToLocalStorage(); } catch (e) {}
            try { persistOTCaseToCloud(c); } catch (e) {}
            try { renderOTList(); } catch (e) {}
            try { if (typeof activeOTCase !== 'undefined' && activeOTCase && activeOTCase.id === c.id) { activeOTCase.extraProcedures = extras; openOTCase(c.id); } } catch (e) {}
          }
        }
      } catch (e) { try { console.warn('extra procedures not saved', e); } catch (x) {} }
      return r;
    };
  }
})();
