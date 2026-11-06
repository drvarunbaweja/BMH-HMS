/* BMH — staff lists.
 * 1) IPD nursing staff names are shared by every computer and phone (saved in the cloud at ipdNurseNames), so a name
 *    added on one device shows up everywhere. "Delete" on the monitoring sheet / progress note opens the full list
 *    with tick-boxes to remove one or several names. Removed names stay removed (they no longer come back).
 * 2) Settings → Logins (admin): each login gets a 🗑 Delete button. A deleted login is switched off (it can no longer
 *    sign in) and is hidden from the list; its past records stay as they are.
 * 3) Attendance: disabled or deleted logins are not listed.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function isAdmin() { try { return !!(CURRENT_USER && CURRENT_USER.isAdmin); } catch (e) { return false; } }
  function me() { try { return CURRENT_USER || {}; } catch (e) { return {}; } }
  function clean(list) { return Array.from(new Set((list || []).map(function (n) { return String(n || '').trim(); }).filter(Boolean))); }

  // ── 1) shared nurse names ──
  var LS = 'bmh_ipd_nurse_names', LS_SHARED = 'bmh_ipd_nurse_names_shared_v1';
  var shared = null; // array once the shared list is known
  try { var c = JSON.parse(localStorage.getItem(LS_SHARED) || 'null'); if (Array.isArray(c)) shared = clean(c); } catch (e) {}
  var origGet = window.getIPDNurseNames;
  function legacyNames() { try { return origGet ? origGet() : []; } catch (e) { return []; } }
  window.getIPDNurseNames = function () { return shared ? shared.slice() : legacyNames(); };
  function pushShared(list) {
    shared = clean(list);
    try { localStorage.setItem(LS_SHARED, JSON.stringify(shared)); localStorage.setItem(LS, JSON.stringify(shared)); } catch (e) {}
    if (window.FBDB) { try { window.FBDB.ref('ipdNurseNames').set({ names: shared, updatedAt: new Date().toISOString(), by: me().name || '' }).catch(function () {}); } catch (e) {} }
  }
  window.saveIPDNurseNames = function (names) { pushShared(names); };
  function refreshSelects() {
    try { refreshIPDNurseSelects(); } catch (e) {}
    try { populateIPDNursePinResetSelect(); } catch (e) {}
  }
  var listening = false;
  function listen() {
    if (listening || !window.FBDB) return !!listening;
    listening = true;
    try {
      window.FBDB.ref('ipdNurseNames').on('value', function (snap) {
        var v = snap.val();
        if (v && Array.isArray(v.names)) {
          shared = clean(v.names);
          try { localStorage.setItem(LS_SHARED, JSON.stringify(shared)); } catch (e) {}
          refreshSelects();
        } else if (!shared) {
          // first time: start the shared list from the names on this device
          pushShared(legacyNames());
        }
      });
    } catch (e) { listening = false; }
    return listening;
  }
  if (!listen()) { var tries = 0, t = setInterval(function () { if (listen() || ++tries > 60) clearInterval(t); }, 3000); }

  window.addIPDNurseName = function () {
    var name = String(prompt('Add nursing staff name') || '').trim();
    if (!name) return;
    var list = window.getIPDNurseNames();
    if (list.some(function (n) { return n.toLowerCase() === name.toLowerCase(); })) { toast(name + ' is already in the list', 'i'); }
    else { list.push(name); pushShared(list); }
    try { refreshIPDNurseSelects(name); } catch (e) {}
    try { populateIPDNursePinResetSelect(); } catch (e) {}
    ['ipdm-nurse-select', 'pn-nurse'].forEach(function (id) { var el = document.getElementById(id); if (el && [].some.call(el.options, function (o) { return o.value === name; })) { el.value = name; try { onIPDNurseSelected(el); } catch (e) {} } });
    toast(name + ' added to the nursing staff list ✓', 's');
  };
  window.deleteSelectedIPDNurseName = function () {
    var list = window.getIPDNurseNames();
    var old = document.getElementById('nsd-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'nsd-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:10050;background:rgba(15,23,42,.45);display:flex;align-items:center;justify-content:center;padding:14px';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:420px;width:100%;max-height:86vh;display:flex;flex-direction:column;box-shadow:0 18px 50px rgba(0,0,0,.3)">'
      + '<div style="padding:14px 16px 8px"><div style="font-size:15px;font-weight:900">Remove nursing staff</div><div style="font-size:12px;color:#666">Tick the names to remove from the list. Their past entries are not changed.</div></div>'
      + '<div style="overflow:auto;padding:4px 16px;flex:1">' + (list.length ? list.map(function (n, i) { return '<label style="display:flex;align-items:center;gap:10px;padding:8px 4px;border-bottom:1px solid #f0f0f0;font-size:13.5px;cursor:pointer"><input type="checkbox" class="nsd-c" data-i="' + i + '" style="width:18px;height:18px;margin:0"> ' + esc(n) + '</label>'; }).join('') : '<div style="padding:12px;color:#888">No names in the list.</div>') + '</div>'
      + '<div style="display:flex;justify-content:space-between;gap:8px;padding:12px 16px;border-top:1px solid #eee"><button type="button" class="btn btn-gray btn-sm" id="nsd-cancel">Cancel</button><button type="button" class="btn btn-red btn-sm" id="nsd-ok" disabled>Remove selected</button></div></div>';
    document.body.appendChild(ov);
    var ok = ov.querySelector('#nsd-ok');
    var picked = function () { return [].filter.call(ov.querySelectorAll('.nsd-c'), function (c) { return c.checked; }).map(function (c) { return list[Number(c.getAttribute('data-i'))]; }); };
    [].forEach.call(ov.querySelectorAll('.nsd-c'), function (c) { c.onchange = function () { var n = picked().length; ok.disabled = !n; ok.textContent = n ? 'Remove ' + n + ' selected' : 'Remove selected'; }; });
    ov.querySelector('#nsd-cancel').onclick = function () { ov.remove(); };
    ok.onclick = function () {
      var rm = picked(); if (!rm.length) return;
      if (!confirm('Remove ' + rm.join(', ') + ' from the nursing staff list?')) return;
      pushShared(list.filter(function (n) { return rm.indexOf(n) < 0; }));
      ov.remove();
      refreshSelects();
      try { setIPDNursingEntryEnabled(false); } catch (e) {}
      toast(rm.length + ' name' + (rm.length === 1 ? '' : 's') + ' removed ✓', 's');
    };
  };

  // ── 2) delete logins (admin) ──
  function db() { try { return USER_DB; } catch (e) { return {}; } }
  function keyOf(u) { try { return sanitizeFirebaseKey(u); } catch (e) { return String(u || '').replace(/[.#$\[\]/]/g, '_'); } }
  function flag(uname, f) {
    var a = db()[uname] || {}, b = db()[keyOf(uname)] || {};
    return a[f] === true || b[f] === true;
  }
  window.bmhIsLoginInactive = function (uname) { return flag(uname, 'disabled') || flag(uname, 'deleted'); };
  function ident(u) { try { return attendanceSafeKey(String(u.name || '') + '__' + patientCentreKey(u.centre || '')); } catch (e) { return String(u.name || '').toLowerCase() + '__' + String(u.centre || '').toUpperCase(); } }
  // the same person can have a short alias login (e.g. "fiza" for "rpr_fiza"): treat them together
  function aliasesOf(uname) {
    var u = db()[uname]; if (!u || !u.name) return [];
    var id = ident(u);
    return Object.keys(db()).filter(function (k) { var x = db()[k]; return k !== uname && x && x.name === u.name && String(x.role || '') === String(u.role || '') && ident(x) === id; });
  }
  function applyAll(uname, patch) {
    [uname].concat(aliasesOf(uname)).forEach(function (k) {
      [k, keyOf(k)].forEach(function (kk) { if (db()[kk]) Object.assign(db()[kk], patch); });
      if (k !== uname) { try { fbUpdate(userSettingsPath(k), patch).catch(function () {}); } catch (e) {} }
    });
  }
  // Disable / Enable also covers the alias login, so the person cannot still sign in or appear under the other name
  var origDis = window.setUserDisabled;
  if (typeof origDis === 'function') {
    window.setUserDisabled = function (uname, disabled) {
      var r = origDis.apply(this, arguments);
      try { if (isAdmin() && db()[uname] && db()[uname].disabled === !!disabled) { applyAll(uname, { disabled: !!disabled, updatedBy: me().name || '', updatedAt: new Date().toISOString() }); renderAdminUsersList(); } } catch (e) {}
      return r;
    };
  }
  window.bmhDeleteLogin = function (uname) {
    if (!isAdmin()) { toast('Admin access required', 'w'); return; }
    if (uname === me().username) { toast('You cannot delete your own login', 'w'); return; }
    var u = db()[uname]; if (!u) return;
    if (!confirm('Delete the login "' + (u.name || uname) + '" (@' + uname + ')?\n\nThey will no longer be able to sign in, and the login is removed from this list and from attendance. Past records (bills, notes, attendance history) stay as they are.')) return;
    var patch = { disabled: true, deleted: true, deletedAt: new Date().toISOString(), deletedBy: me().name || '' };
    applyAll(uname, patch);
    try { fbUpdate(userSettingsPath(uname), patch).catch(function (e) { console.warn('Delete login error:', e); }); } catch (e) { console.warn(e); }
    toast('Login deleted ✓', 's');
    try { renderAdminUsersList(); } catch (e) {}
  };
  window.bmhRestoreLogin = function (uname) {
    if (!isAdmin()) return;
    var patch = { deleted: false, disabled: false, restoredAt: new Date().toISOString(), restoredBy: me().name || '' };
    applyAll(uname, patch);
    try { fbUpdate(userSettingsPath(uname), patch).catch(function () {}); } catch (e) {}
    toast('Login restored ✓', 's');
    try { renderAdminUsersList(); } catch (e) {}
  };
  var showDeleted = false;
  window.bmhToggleDeletedLogins = function () { showDeleted = !showDeleted; try { renderAdminUsersList(); } catch (e) {} };
  var origUsers = window.renderAdminUsersList;
  if (typeof origUsers === 'function') {
    window.renderAdminUsersList = function () {
      var r = origUsers.apply(this, arguments);
      try {
        var el = document.getElementById('admin-users-list'); if (!el || !isAdmin()) return r;
        var hidden = 0;
        [].forEach.call(el.children, function (row) {
          var tag = [].find.call(row.querySelectorAll('div'), function (d) { return /^@/.test((d.textContent || '').trim()) && d.children.length === 0; });
          if (!tag) return;
          var uname = tag.textContent.trim().slice(1);
          var deleted = flag(uname, 'deleted');
          if (deleted && !showDeleted) { row.style.display = 'none'; hidden++; return; }
          var col = row.lastElementChild; if (!col || col.querySelector('.sa-del')) return;
          if (deleted) col.insertAdjacentHTML('beforeend', '<button class="btn btn-xs btn-green sa-del" onclick="bmhRestoreLogin(\'' + esc(uname).replace(/'/g, '') + '\')">↩ Restore</button>');
          else if (uname !== me().username) col.insertAdjacentHTML('beforeend', '<button class="btn btn-xs btn-gray sa-del" onclick="bmhDeleteLogin(\'' + esc(uname).replace(/'/g, '') + '\')">🗑 Delete</button>');
        });
        var foot = document.getElementById('sa-del-foot');
        if (!foot) { foot = document.createElement('div'); foot.id = 'sa-del-foot'; foot.style.cssText = 'font-size:11.5px;color:#666;padding:6px 2px'; el.parentNode.insertBefore(foot, el.nextSibling); }
        var nDel = Object.keys(db()).filter(function (k) { return db()[k] && db()[k].deleted === true; }).length;
        foot.innerHTML = nDel ? (showDeleted ? 'Showing deleted logins · <a href="#" onclick="bmhToggleDeletedLogins();return false">Hide them</a>' : hidden + ' deleted login' + (hidden === 1 ? '' : 's') + ' hidden · <a href="#" onclick="bmhToggleDeletedLogins();return false">Show</a>') : '';
      } catch (e) { console.warn('[staff-admin]', e); }
      return r;
    };
  }

  // ── 3) attendance: leave out disabled / deleted logins ──
  var origEmp = window.attendanceStaffEmployees;
  if (typeof origEmp === 'function') {
    window.attendanceStaffEmployees = function () {
      var rows = origEmp.apply(this, arguments) || [];
      // people whose login is switched off (under any of their login names)
      var off = {};
      Object.keys(db()).forEach(function (k) { var u = db()[k]; if (u && u.name && !u.isAdmin && (u.disabled === true || u.deleted === true)) off[ident(u) + '|' + String(u.role || '')] = 1; });
      var on = {};
      Object.keys(db()).forEach(function (k) { var u = db()[k]; if (u && u.name && !u.isAdmin && !(u.disabled === true || u.deleted === true) && !aliasesOf(k).some(function (a) { return db()[a].disabled === true || db()[a].deleted === true; })) on[ident(u) + '|' + String(u.role || '')] = 1; });
      return rows.filter(function (emp) {
        if (!emp) return false;
        if (emp.username && window.bmhIsLoginInactive(emp.username)) return false;
        if (emp.username && db()[emp.username]) { var u = db()[emp.username]; var kk = ident(u) + '|' + String(u.role || ''); if (off[kk] && !on[kk]) return false; }
        return true;
      });
    };
  }
})();
