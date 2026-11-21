/* BMH — Settings → Logins: add staff for the staff PIN (IPD nursing + stock).
 * Admin types a staff name and presses "Add staff". The name appears on every computer and phone (shared staff list).
 * The staff member creates their own 4-digit PIN the first time they choose their name (stock, procedure done, IPD
 * entries). The list shows who has made a PIN; "Remove staff" and "Reset PIN" work as before.
 * Staff can no longer add their own name from the stock PIN pop-up — it says to ask admin.
 * Off switch (this browser): localStorage.setItem('bmh_staff_pin_admin_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_staff_pin_admin_off') === '1') return; } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function slug(n) { return String(n || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
  function names() { try { return getIPDNurseNames(); } catch (e) { return []; } }
  var pins = {};
  function loadPins() {
    if (!window.FBDB) return;
    try { FBDB.ref('ipdNursePins').once('value').then(function (s) { var v = s.val() || {}; pins = {}; Object.keys(v).forEach(function (k) { if (v[k] && v[k].hash) pins[k] = 1; }); renderList(); }); } catch (e) {}
  }
  function renderList() {
    var el = document.getElementById('spa-list'); if (!el) return;
    var list = names();
    el.innerHTML = list.length ? list.map(function (n) {
      var has = pins[slug(n)];
      return '<span style="display:inline-flex;align-items:center;gap:5px;padding:4px 9px;margin:0 6px 6px 0;border-radius:14px;font-size:12px;font-weight:700;background:' + (has ? '#e8f5e9;color:#1a6b34' : '#fff8e1;color:#8a5a00') + '">' + esc(n) + ' <span style="font-size:10px;font-weight:600">' + (has ? '· PIN set' : '· PIN on first use') + '</span></span>';
    }).join('') : '<span style="font-size:12px;color:#888">No staff yet</span>';
  }
  function add() {
    var inp = document.getElementById('spa-name'); var n = String(inp && inp.value || '').trim().replace(/\s+/g, ' ');
    if (!n) { toast('Type the staff name', 'w'); return; }
    var list = names();
    if (list.some(function (x) { return x.toLowerCase() === n.toLowerCase(); })) { toast(n + ' is already in the list', 'i'); return; }
    list.push(n);
    try { saveIPDNurseNames(list); } catch (e) { toast('Could not save', 'w'); return; }
    try { fbPush('auditLog', { user: (CURRENT_USER || {}).name || 'Admin', role: 'Admin', action: 'STAFF_PIN_NAME_ADDED', item: n, timestamp: new Date().toISOString() }); } catch (e) {}
    inp.value = '';
    try { populateIPDNursePinResetSelect(); } catch (e) {}
    try { refreshIPDNurseSelects(); } catch (e) {}
    renderList();
    toast(n + ' added ✓ — they create their PIN the first time they choose their name', 's');
  }
  function build() {
    var card = document.getElementById('admin-nurse-pin-card'); if (!card) return false;
    if (document.getElementById('spa-box')) { renderList(); return true; }
    var t = card.querySelector('.card-title'); if (t) t.textContent = '🔐 Staff PINs (IPD nursing + stock)';
    var sub = card.querySelector('.card-sub'); if (sub) sub.textContent = 'Admin only — add staff here. Each staff member creates their own 4-digit PIN the first time they choose their name (stock, procedure done, IPD entries). Reset a PIN if they forget it.';
    var box = document.createElement('div'); box.id = 'spa-box'; box.style.cssText = 'margin-bottom:12px';
    box.innerHTML = '<div class="fg" style="max-width:520px;align-items:end;margin-bottom:8px">'
      + '<div class="form-group"><label class="fl">New staff name</label><input type="text" id="spa-name" placeholder="e.g. Jaspreet Kaur" autocomplete="off"></div>'
      + '<div style="display:flex;gap:6px"><button type="button" class="btn btn-blue" id="spa-add">+ Add staff</button><button type="button" class="btn btn-gray" id="spa-rm">Remove staff</button></div></div>'
      + '<div id="spa-list"></div>';
    var hd = card.querySelector('.card-hd'); hd.parentNode.insertBefore(box, hd.nextSibling);
    box.querySelector('#spa-add').onclick = add;
    box.querySelector('#spa-name').addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
    box.querySelector('#spa-rm').onclick = function () { try { deleteSelectedIPDNurseName(); } catch (e) {} setTimeout(function wait() { if (document.getElementById('nsd-ov')) return setTimeout(wait, 500); renderList(); }, 500); };
    renderList(); loadPins();
    return true;
  }
  // refresh when Settings → Logins is opened
  document.addEventListener('click', function (e) { var t = e.target && e.target.closest && e.target.closest('[onclick*="set-logins"]'); if (t) setTimeout(function () { build(); loadPins(); }, 300); }, true);
  var n = 0; (function tick() { if (build() && n > 3) return; if (++n < 40) setTimeout(tick, 1500); })();
  window.bmhStaffPinAdmin = { add: add, render: renderList };
})();
