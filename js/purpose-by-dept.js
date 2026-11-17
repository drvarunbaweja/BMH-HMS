/* BMH — Reception → Purpose of visit: each department keeps its own procedures.
 * ＋ (next to "Purpose") adds a procedure to the department chosen at reception (e.g. OBG → MTP, Drip, Iron Sucrose, HCG);
 * － lists that department's purposes: ones added here are removed, built-in / older ones are only hidden for that
 * department (and can be shown again). "Need to Check In" stays in every department, always last.
 * Saved at settings/purposeByDept/<dept> = { add: [...], hide: [...] } — the same on every computer.
 * Only the list of names changes; what a purpose does (surgery panel, check-in, fees) is unchanged.
 * Off switch (this browser): localStorage.setItem('bmh_purpose_dept_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_purpose_dept_off') === '1') return; } catch (e) {}
  var PATH = 'settings/purposeByDept', LS = 'bmh_purpose_by_dept_v1';
  var SEED = { obg: { add: ['MTP', 'Drip', 'Iron Sucrose', 'HCG'], hide: [] } };
  var NAMES = { ophtho: 'Eye', obg: 'OBG', psych: 'Neuropsychiatry', skin: 'Skin' };
  var CHECKIN = 'Need to Check In';
  var DATA = null;
  try { DATA = JSON.parse(localStorage.getItem(LS) || 'null'); } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function low(s) { return String(s || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function arr(a) { return Array.isArray(a) ? a.filter(Boolean).map(String) : (a && typeof a === 'object' ? Object.values(a).filter(Boolean).map(String) : []); }
  function dept() { return (document.getElementById('rc-dept') || {}).value || 'ophtho'; }
  function rec(d) { var r = (DATA || {})[d] || {}; return { add: arr(r.add), hide: arr(r.hide) }; }
  function save(d, r) {
    DATA = DATA || {}; DATA[d] = { add: r.add, hide: r.hide };
    try { localStorage.setItem(LS, JSON.stringify(DATA)); } catch (e) {}
    try { if (window.FBDB) window.FBDB.ref(PATH + '/' + d).set({ add: r.add, hide: r.hide, updatedAt: new Date().toISOString() }).catch(function () { toast('Could not save — check the connection', 'w'); }); } catch (e) {}
    apply();
  }

  // the dropdown: legacy builds the department's built-in list + the shared custom list; then this file
  // hides what the department hid, adds the department's own procedures, and keeps Need to Check In last
  function apply() {
    var sel = document.getElementById('rc-purpose'); if (!sel || !DATA) return;
    var keep = sel.value, r = rec(dept()), hide = {};
    r.hide.forEach(function (x) { hide[low(x)] = 1; });
    Array.prototype.slice.call(sel.options).forEach(function (o) { if (hide[low(o.textContent)] && low(o.textContent) !== low(CHECKIN)) o.remove(); });
    var have = {}; Array.prototype.forEach.call(sel.options, function (o) { have[low(o.textContent)] = 1; });
    var ci = Array.prototype.filter.call(sel.options, function (o) { return low(o.textContent) === low(CHECKIN); })[0];
    r.add.forEach(function (x) { if (have[low(x)]) return; var o = document.createElement('option'); o.textContent = x; sel.insertBefore(o, ci || null); have[low(x)] = 1; });
    if (!ci) { ci = document.createElement('option'); ci.textContent = CHECKIN; }
    sel.appendChild(ci);
    var hit = Array.prototype.filter.call(sel.options, function (o) { return o.textContent === keep; })[0];
    if (hit) sel.value = keep;
  }
  var orig = window.updatePurposeOptions;
  if (typeof orig === 'function' && !orig._byDept) {
    var w = function () {
      var out = orig.apply(this, arguments);   // as before: a department change starts again at the top of the list
      try { apply(); } catch (e) {}
      return out;
    };
    w._byDept = true; window.updatePurposeOptions = w;
  }

  // ＋ / － next to "Purpose"
  function buttons() {
    var sel = document.getElementById('rc-purpose'); if (!sel) return;
    var lab = sel.parentNode && sel.parentNode.querySelector('label'); if (!lab || document.getElementById('pbd-add')) return;
    Array.prototype.forEach.call(lab.querySelectorAll('button'), function (b) { if (/m-add-purpose/.test(b.getAttribute('onclick') || '')) b.style.display = 'none'; });
    var st = 'border:none;border-radius:50%;width:18px;height:18px;font-size:13px;line-height:18px;padding:0;cursor:pointer;color:#fff;font-weight:900;margin-left:4px';
    var box = document.createElement('span'); box.style.cssText = 'display:inline-flex;align-items:center';
    box.innerHTML = '<button type="button" id="pbd-add" title="Add a procedure for this department" style="' + st + ';background:var(--blue,#1a3c6e)">+</button>'
      + '<button type="button" id="pbd-del" title="Remove a procedure from this department" style="' + st + ';background:#c62828">−</button>';
    lab.appendChild(box);
    document.getElementById('pbd-add').onclick = addOne;
    document.getElementById('pbd-del').onclick = removeList;
  }
  function addOne() {
    var d = dept();
    var raw = window.prompt('New procedure / purpose for ' + (NAMES[d] || d) + ':', '');
    var name = String(raw || '').replace(/\s+/g, ' ').trim().slice(0, 60);
    if (!name) return;
    if (low(name) === low(CHECKIN)) { toast('Need to Check In is already there for every department', 'i'); return; }
    var r = rec(d);
    r.hide = r.hide.filter(function (x) { return low(x) !== low(name); });
    if (!r.add.some(function (x) { return low(x) === low(name); })) r.add.push(name);
    save(d, r);
    refresh();
    var sel = document.getElementById('rc-purpose'); var hit = sel && Array.prototype.filter.call(sel.options, function (o) { return low(o.textContent) === low(name); })[0];
    if (hit) { sel.value = hit.textContent; try { checkSurgeryPurpose(); } catch (e) {} }
    toast('"' + name + '" added for ' + (NAMES[d] || d) + ' ✓', 's');
  }
  function removeList() {
    var d = dept(), r = rec(d), sel = document.getElementById('rc-purpose');
    var own = {}; r.add.forEach(function (x) { own[low(x)] = 1; });
    var items = sel ? Array.prototype.map.call(sel.options, function (o) { return o.textContent; }).filter(function (x) { return low(x) !== low(CHECKIN); }) : [];
    var old = document.getElementById('pbd-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'pbd-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9500;background:rgba(10,20,40,.5);display:flex;align-items:center;justify-content:center;padding:14px';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:420px;width:100%;max-height:85vh;overflow:auto;box-shadow:0 12px 40px rgba(0,0,0,.35)">'
      + '<div style="display:flex;align-items:center;padding:12px 14px;border-bottom:1px solid #e5e7eb"><div style="flex:1;font-weight:900;font-size:14px">Purposes — ' + esc(NAMES[d] || d) + '</div><button type="button" class="btn btn-gray btn-sm" id="pbd-x">✕</button></div>'
      + '<div style="padding:8px 14px 14px;font-size:12.5px">'
      + items.map(function (x) { return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f1f2f5"><div style="flex:1">' + esc(x) + (own[low(x)] ? ' <span style="font-size:10px;color:#2f8f4e;font-weight:800">added</span>' : '') + '</div><button type="button" class="btn btn-xs btn-outline" data-rm="' + esc(x) + '">−</button></div>'; }).join('')
      + '<div style="padding:6px 0;color:#777">' + esc(CHECKIN) + ' — stays for every department</div>'
      + (r.hide.length ? '<div style="font-weight:800;margin-top:10px">Hidden for ' + esc(NAMES[d] || d) + '</div>' + r.hide.map(function (x) { return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0"><div style="flex:1;color:#777">' + esc(x) + '</div><button type="button" class="btn btn-xs btn-outline" data-show="' + esc(x) + '">Show again</button></div>'; }).join('') : '')
      + '</div></div>';
    document.body.appendChild(ov);
    document.getElementById('pbd-x').onclick = function () { ov.remove(); };
    ov.onclick = function (e) {
      var t = e.target; if (t === ov) { ov.remove(); return; }
      var rm = t.getAttribute && t.getAttribute('data-rm'), sh = t.getAttribute && t.getAttribute('data-show');
      if (rm) {
        if (!window.confirm('Remove "' + rm + '" from ' + (NAMES[d] || d) + '\'s purposes?\n(Patients already saved with it keep it.)')) return;
        var r2 = rec(d);
        if (r2.add.some(function (x) { return low(x) === low(rm); })) r2.add = r2.add.filter(function (x) { return low(x) !== low(rm); });
        else if (!r2.hide.some(function (x) { return low(x) === low(rm); })) r2.hide.push(rm);
        save(d, r2); refresh(); removeList(); toast('"' + rm + '" removed for ' + (NAMES[d] || d), 's');
      } else if (sh) {
        var r3 = rec(d); r3.hide = r3.hide.filter(function (x) { return low(x) !== low(sh); });
        save(d, r3); refresh(); removeList();
      }
    };
  }
  // list changed (here or on another computer): rebuild, but keep the purpose already chosen
  function refresh() {
    var sel = document.getElementById('rc-purpose'), keep = sel ? sel.value : '';
    try { if (typeof updatePurposeOptions === 'function') updatePurposeOptions(); else apply(); } catch (e) { apply(); }
    if (sel && keep && sel.value !== keep && Array.prototype.some.call(sel.options, function (o) { return o.textContent === keep; })) { sel.value = keep; try { checkSurgeryPurpose(); } catch (e) {} }
  }

  function load() {
    try {
      if (!window.FBDB) return;
      window.FBDB.ref(PATH).on('value', function (s) {
        var v = s.val();
        if (!v) { DATA = JSON.parse(JSON.stringify(SEED)); try { window.FBDB.ref(PATH).set(Object.assign({}, SEED, { seededAt: new Date().toISOString() })).catch(function () {}); } catch (e) {} }
        else DATA = v;
        try { localStorage.setItem(LS, JSON.stringify(DATA)); } catch (e) {}
        refresh();
      }, function () {});
    } catch (e) {}
  }
  if (!DATA) DATA = JSON.parse(JSON.stringify(SEED));
  function boot() { buttons(); refresh(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  var tries = 0, loaded = false, iv = setInterval(function () {
    buttons();
    if (window.FBDB && !loaded) { loaded = true; load(); }
    if (loaded || ++tries > 30) clearInterval(iv);
  }, 2000);
  setInterval(buttons, 5000);
})();
