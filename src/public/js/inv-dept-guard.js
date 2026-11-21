/* BMH — Stock for a patient: staff PIN, and a warning before taking another department's stock.
 * 1. Staff PIN: saving "Procedure done", Inventory → Patient Usage (Save / scan) and the billing scan ask who is taking
 *    the stock — pick your name, enter your 4-digit staff PIN (the same PIN as the IPD nursing sign-in; new staff create
 *    one the first time; admin can reset it). Once given, the PIN is not asked again on that computer for 30 minutes;
 *    after that it is asked again. Doctors are asked too. The name is saved with each stock entry (takenBy) and the
 *    audit log.
 * 2. Other department's stock: when the stock comes from a store of another department than the patient's (e.g. an
 *    OBG patient and an infusion set from Eye Operation Theatre), a warning asks "This is an OBG patient — are you
 *    taking … from Eye Operation Theatre (Eye)?". Continue → the staff PIN is asked again (even inside the 30 minutes),
 *    then the stock is deducted as before. It is written to the audit log (STOCK_TAKEN_OTHER_DEPT).
 *    Shared stores (Minor OT, Procedure Room, pharmacy / central stores without a department) give no warning.
 * 3. Inventory → Transfer from one department's store to another department's store: the same warning and staff PIN.
 * 4. IPD medicines from stock: the nurse PIN is already asked there; the other-department warning is added.
 * Stock deduction itself is unchanged (same store, same quantity).
 * Off switch (this browser): localStorage.setItem('bmh_inv_dept_guard_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_inv_dept_guard_off') === '1') return; } catch (e) {}
  var VALID_MS = 30 * 60 * 1000, KEY = 'bmh_stock_staff_v1';
  var LABEL = { ophtho: 'Eye', obg: 'OBG', psych: 'Psychiatry', skin: 'Skin' };
  var taker = '';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function user() { try { return CURRENT_USER || {}; } catch (e) { return window.CURRENT_USER || {}; } }
  function dkey(v) {
    var k = String(v || '').toLowerCase().trim();
    if (/^(eye|ophth|optom)/.test(k)) return 'ophtho';
    if (/^(obg|obs|gyn|labou?r)/.test(k)) return 'obg';
    if (/^(psych|neuro)/.test(k)) return 'psych';
    if (/^(skin|derm|cosm)/.test(k)) return 'skin';
    return '';
  }
  function storeDept(store) {
    try { if (window.bmhInvScope && bmhInvScope.storeDept) return bmhInvScope.storeDept(store) || ''; } catch (e) {}
    var s = String(store || '').toLowerCase();
    return /^eye|eye ot/.test(s) ? 'ophtho' : /^obg|labou?r room/.test(s) ? 'obg' : /^psy/.test(s) ? 'psych' : /^skin/.test(s) ? 'skin' : '';
  }
  function patient(bmhId) { try { return (PATIENTS || []).find(function (p) { return p && String(p.bmhId) === String(bmhId); }) || (window.CURRENT_PATIENT && CURRENT_PATIENT.bmhId === bmhId ? CURRENT_PATIENT : null); } catch (e) { return null; } }
  function ptDept(bmhId, ctx) { var d = dkey(ctx); if (d) return d; var p = patient(bmhId); return dkey(p && p.dept); }
  function audit(action, item) { try { fbPush('auditLog', { user: user().name || '', role: user().role || '', action: action, item: item, timestamp: new Date().toISOString() }); } catch (e) {} }

  // ── staff PIN (30 minutes on this computer) ──
  function cached() { try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && o.name && Date.now() < o.until) return o.name; } catch (e) {} return ''; }
  function remember(name) { try { localStorage.setItem(KEY, JSON.stringify({ name: name, until: Date.now() + VALID_MS })); } catch (e) {} }
  function staffNames() {
    var names = [];
    try { names = getIPDNurseNames(); } catch (e) {}
    if (!window.FBDB) return Promise.resolve(names);
    return Promise.race([
      FBDB.ref('ipdNursePins').once('value').then(function (s) { var v = s.val() || {}; Object.keys(v).forEach(function (k) { if (v[k] && v[k].name) names.push(String(v[k].name)); }); return names; }),
      new Promise(function (r) { setTimeout(function () { r(names); }, 2500); })
    ]).then(function (n) { var seen = {}; return n.filter(function (x) { x = String(x || '').trim(); var k = x.toLowerCase(); if (!x || seen[k]) return false; seen[k] = 1; return true; }).sort(); });
  }
  function overlay(html) {
    var old = document.getElementById('idg-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'idg-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,20,40,.55);z-index:100004;display:flex;align-items:center;justify-content:center;padding:16px';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:420px;width:100%;padding:18px;box-shadow:0 12px 40px rgba(0,0,0,.3);font-family:inherit">' + html + '</div>';
    document.body.appendChild(ov); return ov;
  }
  function pickStaff(reason) {
    return staffNames().then(function (names) {
      return new Promise(function (resolve) {
        var last = ''; try { last = (JSON.parse(localStorage.getItem(KEY) || 'null') || {}).name || ''; } catch (e) {}
        var ov = overlay('<div style="font-size:15px;font-weight:900;color:#1A3C6E">🔐 Who is taking the stock?</div>'
          + '<div style="font-size:12px;color:#555;margin:3px 0 10px">' + esc(reason || 'Select your name, then enter your staff PIN.') + '</div>'
          + '<select id="idg-name" style="width:100%;padding:9px;border:1.5px solid #c9d3e3;border-radius:9px;font-size:14px"><option value="">Select your name</option>'
          + names.map(function (n) { return '<option' + (n === last ? ' selected' : '') + '>' + esc(n) + '</option>'; }).join('') + '<option value="__new">+ My name is not in the list</option></select>'
          + '<div id="idg-err" style="font-size:12px;color:#c62828;min-height:16px;margin:6px 0"></div>'
          + '<div style="display:flex;gap:8px"><button type="button" class="btn btn-gray" id="idg-cancel" style="flex:1">Cancel</button><button type="button" class="btn btn-gold" id="idg-ok" style="flex:1">Next — PIN</button></div>');
        var sel = ov.querySelector('#idg-name');
        ov.querySelector('#idg-cancel').onclick = function () { ov.remove(); resolve(''); };
        ov.querySelector('#idg-ok').onclick = function () {
          var n = sel.value;
          if (n === '__new') { n = String(window.prompt('Your name (as staff):', '') || '').trim(); if (!n) return; try { var all = getIPDNurseNames(); all.push(n); saveIPDNurseNames(all); } catch (e) {} }
          if (!n) { ov.querySelector('#idg-err').textContent = 'Select your name'; return; }
          ov.remove(); resolve(n);
        };
      });
    }).then(function (name) {
      if (!name) return '';
      var v = window.bmhIpdNursing && bmhIpdNursing.verifyNurse;
      if (!v) { toast('Staff PIN check not available', 'w'); return ''; }
      return v(name).then(function (ok) { if (!ok) return ''; remember(name); return name; });
    });
  }
  // fresh=true → always ask (other department); otherwise use the PIN given in the last 30 minutes
  function staffPin(fresh, reason) {
    var c = cached();
    if (c && !fresh) return Promise.resolve(c);
    return pickStaff(reason);
  }
  function warnOther(lines, ptD, title) {
    return new Promise(function (resolve) {
      var ov = overlay('<div style="font-size:15px;font-weight:900;color:#b42318">⚠️ ' + esc(title) + '</div>'
        + '<div style="font-size:12.5px;color:#333;margin:8px 0 10px;line-height:1.5">' + lines.map(function (l) { return '• <b>' + esc(l.name) + '</b> from <b>' + esc(l.store) + '</b>' + (l.dept ? ' (' + esc(LABEL[l.dept] || l.dept) + ')' : ''); }).join('<br>') + '</div>'
        + '<div style="font-size:12px;color:#555;margin-bottom:12px">Are you sure you are taking ' + (lines.length === 1 ? 'this' : 'these') + ' from another department' + (ptD ? ' for a ' + esc(LABEL[ptD] || ptD) + ' patient' : '') + '? Your staff PIN will be needed.</div>'
        + '<div style="display:flex;gap:8px"><button type="button" class="btn btn-gray" id="idg-no" style="flex:1">Cancel</button><button type="button" class="btn btn-red" id="idg-yes" style="flex:1;background:#b42318;color:#fff">Continue</button></div>');
      ov.querySelector('#idg-no').onclick = function () { ov.remove(); resolve(false); };
      ov.querySelector('#idg-yes').onclick = function () { ov.remove(); resolve(true); };
    });
  }
  // items: [{item, qty}] → resolves staff name, or '' to stop
  function gate(bmhId, ctxDept, items, opts) {
    opts = opts || {};
    var pd = ptDept(bmhId, ctxDept);
    var other = [];
    (items || []).forEach(function (r) {
      var it = r && r.item; if (!it) return;
      var sd = storeDept(it.store);
      if (pd && sd && sd !== pd) other.push({ name: it.name || it.barcode, store: it.store, dept: sd, qty: r.qty || 1 });
    });
    if (!other.length) return opts.noPin ? Promise.resolve(opts.noPin) : staffPin(false, opts.reason);
    var p = patient(bmhId);
    return warnOther(other, pd, 'This is ' + (pd === 'obg' ? 'an ' : 'a ') + (LABEL[pd] || pd) + ' patient' + (p && p.name ? ' (' + p.name + ')' : '')).then(function (yes) {
      if (!yes) return '';
      var ub = ''; try { ub = window.bmhInvDeptLists ? bmhInvDeptLists.unlockedBy() : ''; } catch (e) {}
      return (opts.noPin ? Promise.resolve(opts.noPin) : ub ? Promise.resolve(ub) : staffPin(true,'Taking stock from another department — enter your staff PIN.')).then(function (name) {
        if (name) audit('STOCK_TAKEN_OTHER_DEPT', (p && p.name ? p.name + ' ' : '') + '[' + (bmhId || '') + '] ' + (LABEL[pd] || pd) + ' patient · ' + other.map(function (o) { return o.name + ' ×' + o.qty + ' from ' + o.store; }).join('; ') + ' · by ' + name);
        return name;
      });
    });
  }
  // run fn with the staff name attached to the stock entries it makes
  function withTaker(name, fn) { taker = name; try { return fn(); } finally { taker = ''; } }

  var busy = false;
  function wrap(name, build) {
    var o = window[name]; if (typeof o !== 'function' || o._idg) return typeof o === 'function';
    var w = build(o); w._idg = true; window[name] = w; return true;
  }
  function install() {
    var ok = true;
    // stock entries carry the staff name
    ok = wrap('saveUsageToFirebase', function (o) { return function (row) { if (row && taker && !row.takenBy) row.takenBy = taker; return o.apply(this, arguments); }; }) && ok;
    // Inventory → Patient Usage: Save list
    ok = wrap('saveInventoryUseDraft', function (o) {
      return function () {
        var self = this, args = arguments;
        var bmhId = (document.getElementById('use-pt') || {}).value || '';
        var rows = (window.BMH_INVENTORY_USE_DRAFT || []).map(function (r) { var it = null; try { it = bmhFindInventoryItemByKey(r.key); } catch (e) {} return { item: it, qty: r.qty }; });
        if (!bmhId || !rows.length || busy) return o.apply(self, args);
        busy = true;
        return gate(bmhId, '', rows).then(function (n) { busy = false; if (n) return withTaker(n, function () { return o.apply(self, args); }); }, function () { busy = false; });
      };
    }) && ok;
    // Inventory → Patient Usage: scan / single item; billing scan
    ok = wrap('processBC', function (o) {
      return function (mode, code) {
        if (mode !== 'use' || !code || busy) return o.apply(this, arguments);
        var self = this, args = arguments, bmhId = (document.getElementById('use-pt') || {}).value || '';
        var it = null; try { it = BCMAP[code] || BCMAP[String(code).toLowerCase().substring(0, 15)] || bmhFindInventoryItemForText(code); } catch (e) {}
        if (!bmhId || !it) return o.apply(self, args);
        busy = true;
        var qty = Number((document.getElementById('inv-use-qty') || {}).value || 1) || 1;
        return gate(bmhId, '', [{ item: it, qty: qty }]).then(function (n) { busy = false; if (n) return withTaker(n, function () { return o.apply(self, args); }); }, function () { busy = false; });
      };
    }) && ok;
    ok = wrap('scanToBill', function (o) {
      return function () {
        var self = this, args = arguments, inp = document.getElementById('bill-scan-input'), code = String(inp && inp.value || '').trim();
        var it = null; try { it = code && (BCMAP[code] || BCMAP[code.toLowerCase().substring(0, 15)]); } catch (e) {}
        var bmhId = (document.getElementById('bmh-bill-pt-select') || {}).value || '';
        if (!it || !bmhId || busy) return o.apply(self, args);
        busy = true;
        return gate(bmhId, '', [{ item: it, qty: 1 }]).then(function (n) { busy = false; if (n) return withTaker(n, function () { return o.apply(self, args); }); }, function () { busy = false; });
      };
    }) && ok;
    // Procedure done (doctor panel / reception): always the staff PIN
    ok = wrap('saveProcedureDoneModal', function (o) {
      return function () {
        var self = this, args = arguments;
        var dept = (document.getElementById('proc-done-dept') || {}).value || (typeof activeClinicDeptKey === 'function' ? activeClinicDeptKey() : '');
        var bmhId = (window.CURRENT_PATIENT && CURRENT_PATIENT.bmhId) || '';
        var st = null; try { st = getProcedureDoneStateForDept(dept); } catch (e) {}
        if (!bmhId || !st || !st.procedure || busy) return o.apply(self, args);
        var rows = (st.items || []).map(function (r) {
          var it = null; try { it = findInventoryItemForProcedureRow(r); } catch (e) {}
          var d = Math.max(0, Number(r.qty || 0) - Number(r.appliedQty || 0));
          return d > 0 ? { item: it, qty: d } : null;
        }).filter(Boolean);
        busy = true;
        return gate(bmhId, dept, rows, { reason: 'Procedure done — select your name, then enter your staff PIN.' }).then(function (n) {
          busy = false; if (!n) return;
          audit('PROCEDURE_DONE_BY', st.procedure + ' · [' + bmhId + '] · by ' + n);
          try { st.doneBy = n; } catch (e) {}
          return withTaker(n, function () { return o.apply(self, args); });
        }, function () { busy = false; });
      };
    }) && ok;
    // Inventory → Transfer between departments
    ok = wrap('saveInventoryTransfer', function (o) {
      return function (opts) {
        var self = this, args = arguments;
        if (opts && opts._idgPass) return o.apply(self, args);
        var draft = (window._bmhInventoryTransferDraft || []).slice();
        if (!draft.length) { try { var l = bmhReadInventoryTransferLine(); if (l && l.fromStore && l.toStore && l.raw) draft.push(l); } catch (e) {} }
        var cross = draft.filter(function (l) { var a = storeDept(l.fromStore), b = storeDept(l.toStore); return a && b && a !== b; });
        if (!cross.length || busy) return o.apply(self, args);
        busy = true;
        var toD = storeDept(cross[0].toStore);
        warnOther(cross.map(function (l) { return { name: (l.raw || '') + ' ×' + (l.qty || 1), store: l.fromStore, dept: storeDept(l.fromStore) }; }), '', 'Transfer to ' + cross[0].toStore + ' (' + (LABEL[toD] || toD) + ')').then(function (yes) {
          if (!yes) { busy = false; return; }
          return staffPin(true, 'Stock transfer between departments — enter your staff PIN.').then(function (n) {
            busy = false; if (!n) return;
            audit('STOCK_TRANSFER_OTHER_DEPT', cross.map(function (l) { return (l.raw || '') + ' ×' + (l.qty || 1) + ' ' + l.fromStore + ' → ' + l.toStore; }).join('; ') + ' · by ' + n);
            var before = (window.BMH_INVENTORY_TRANSFERS || []).length;
            var a = Array.prototype.slice.call(args); a[0] = Object.assign({}, a[0] || {}, { _idgPass: true });
            var r = o.apply(self, a);
            try { (window.BMH_INVENTORY_TRANSFERS || []).slice(before).forEach(function (t) { t.staff = n; }); } catch (e) {}
            return r;
          });
        }, function () { busy = false; });
        return false;
      };
    }) && ok;
    return ok;
  }
  // used by IPD medicines (nurse PIN already given there): warning only
  window.bmhStockDeptCheck = function (bmhId, ctxDept, item, qty, nurse) {
    return gate(bmhId, ctxDept, [{ item: item, qty: qty || 1 }], { noPin: nurse || 'nurse' }).then(function (n) { return !!n; });
  };
  window.bmhStockStaff = { pin: staffPin, gate: gate, current: cached };
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
