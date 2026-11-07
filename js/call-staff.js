/* BMH — "Called by" on call sheets (Appointments 📞 and Advised follow-up / Deliveries 📞).
 * Adds a small "Called by" drop-down of staff (active logins; the person logged in is picked by default, "Other…"
 * lets you type a name) and the date & time of the call (now by default, can be changed if the call is entered later).
 * The call history then shows who called and when. The login that typed the entry is still stored as "entered by".
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function me() { try { return (CURRENT_USER && (CURRENT_USER.name || CURRENT_USER.username)) || ''; } catch (e) { return ''; } }
  function staffNames() {
    var db = {}; try { db = USER_DB || {}; } catch (e) { db = {}; }
    var set = {};
    Object.keys(db).forEach(function (k) {
      var u = db[k]; if (!u || !u.name) return;
      if (u.disabled === true || u.deleted === true) return;
      var n = String(u.name).trim(); if (n) set[n.toLowerCase()] = n;
    });
    var list = Object.keys(set).map(function (k) { return set[k]; }).sort(function (a, b) { return a.localeCompare(b); });
    var m = me(); if (m) { list = list.filter(function (n) { return n.toLowerCase() !== m.toLowerCase(); }); list.unshift(m); }
    return list;
  }
  function localNow() { var d = new Date(); d.setSeconds(0, 0); var p = function (n) { return String(n).padStart(2, '0'); }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + 'T' + p(d.getHours()) + ':' + p(d.getMinutes()); }
  window.bmhCallStaffFieldHtml = function (prefix) {
    return '<div class="bmh-callby" data-p="' + prefix + '" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-top:8px">'
      + '<div class="form-group" style="margin:0;flex:1;min-width:170px"><label class="fl">Called by</label><select id="' + prefix + '-callby" onchange="bmhCallStaffOther(\'' + prefix + '\')"></select>'
      + '<input type="text" id="' + prefix + '-callby-other" placeholder="Type the staff name" style="display:none;margin-top:5px"></div>'
      + '<div class="form-group" style="margin:0;min-width:190px"><label class="fl">Call date &amp; time</label><input type="datetime-local" id="' + prefix + '-callat"></div></div>';
  };
  window.bmhCallStaffReset = function (prefix) {
    var sel = document.getElementById(prefix + '-callby'); if (!sel) return;
    sel.innerHTML = staffNames().map(function (n) { return '<option value="' + esc(n) + '">' + esc(n) + '</option>'; }).join('') + '<option value="__other">Other…</option>';
    sel.selectedIndex = 0;
    var o = document.getElementById(prefix + '-callby-other'); if (o) { o.value = ''; o.style.display = 'none'; }
    var at = document.getElementById(prefix + '-callat'); if (at) { at.value = localNow(); at.max = localNow(); }
  };
  window.bmhCallStaffOther = function (prefix) {
    var sel = document.getElementById(prefix + '-callby'), o = document.getElementById(prefix + '-callby-other');
    if (sel && o) { o.style.display = sel.value === '__other' ? '' : 'none'; if (sel.value === '__other') o.focus(); }
  };
  // returns { by, at } or null when the fields are not on screen; { error } if something is missing
  window.bmhCallStaffValue = function (prefix) {
    var sel = document.getElementById(prefix + '-callby'); if (!sel) return null;
    var by = sel.value === '__other' ? String((document.getElementById(prefix + '-callby-other') || {}).value || '').trim() : sel.value;
    if (!by) return { error: 'Choose who made the call' };
    var raw = (document.getElementById(prefix + '-callat') || {}).value || '';
    var at = raw ? new Date(raw) : new Date();
    if (isNaN(at)) at = new Date();
    if (at.getTime() > Date.now() + 5 * 60e3) return { error: 'The call time is in the future' };
    return { by: by, at: at.toISOString() };
  };

  // ── Advised follow-up / Deliveries call sheet ──
  var origOpen = window.bmhOpenAdvisedFollowup;
  if (typeof origOpen === 'function') {
    window.bmhOpenAdvisedFollowup = function () {
      var r = origOpen.apply(this, arguments);
      try {
        var m = document.getElementById('m-adv-followup');
        if (m && !document.getElementById('adv-fu-callby')) {
          var notes = document.getElementById('adv-fu-remark');
          var grp = notes && notes.closest('.form-group');
          if (grp) grp.insertAdjacentHTML('beforebegin', window.bmhCallStaffFieldHtml('adv-fu'));
        }
        window.bmhCallStaffReset('adv-fu');
      } catch (e) { console.warn('[call-staff]', e); }
      return r;
    };
  }
  var origSave = window.bmhSaveAdvisedFollowup;
  if (typeof origSave === 'function') {
    window.bmhSaveAdvisedFollowup = function (mode) {
      if ((mode || 'call') === 'call') {
        var v = window.bmhCallStaffValue('adv-fu');
        if (v && v.error) { try { showToast(v.error, 'w'); } catch (e) {} return; }
        window.__bmhCallPick = v;
      } else window.__bmhCallPick = null;
      try { return origSave.apply(this, arguments); } finally { setTimeout(function () { window.__bmhCallPick = null; }, 0); }
    };
  }
})();
