/* BMH — Billing → Bills & History: review the bills of a day, and delete wrong ones (admin + 4-digit report PIN).
 * "🗂 Review / delete bills" (admin logins only) asks the 4-digit report PIN; after one correct PIN it stays open
 * for 30 minutes on this computer. Choose a date, or From–To dates (up to 92 days), and a department (or All): the bills and receipts are grouped by department, then
 * Consultations / Investigations / Surgeries / Procedures / Balance payments / Advances & other, each a roll-down list
 * with sub-headings by name inside (e.g. Investigations → OCT, VF; Psych → EEG; Surgeries → Phaco + IOL)
 * with a tick box per bill (and a tick-all per group). "Delete selected" removes them from billing, collection totals,
 * day summaries, dues, reports and every computer — only money records (the patient, visit and prescription stay).
 * A hidden copy of everything removed is kept at deletedBillRecords/ — shown only after the 6-digit report PIN
 * ("🗑 Deleted bills"), where each can be restored or erased, or all emptied for good.
 * Off switch (this browser): localStorage.setItem('bmh_bill_day_review_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_bill_day_review_off') === '1') return; } catch (e) {}
  var SK = 'bmh_bill_del', SK_BIN = 'bmh_bill_bin', MS = 30 * 60e3, REC = 'deletedBillRecords', EDT = 'billEditRecords';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function rs(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function me() { try { return CURRENT_USER || null; } catch (e) { return window.CURRENT_USER || null; } }
  function uname() { var u = me(); return String(u && (u.username || u.name) || '').toLowerCase(); }
  function isAdmin() { var u = me(); return !!(u && (u.isAdmin || String(u.role || '').toLowerCase() === 'admin')); }
  function BH() { return window.bmhBillsHistory || null; }
  function dayOf(v) { var b = BH(); return b ? b.dayOf(v) : String(v || '').slice(0, 10); }
  function sk(id) { return String(id == null ? '' : id).replace(/[.#$\[\]\/]/g, '_'); }
  function ref(p) { return window.FBDB ? window.FBDB.ref(p) : null; }
  function finOk() { return (typeof window.bmhReportFinUnlocked === 'function' && window.bmhReportFinUnlocked()) || sess(SK_BIN); }
  function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function fmtT(v) { var d = new Date(v); return isNaN(d) ? '' : d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }
  function fmtDT(v) { var d = new Date(v); return isNaN(d) ? String(v || '') : d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }

  // ── 4-digit PIN: open for 30 minutes on this computer ──
  function sess(k) { try { var o = JSON.parse(sessionStorage.getItem(k) || 'null'); return !!(o && o.user === uname() && o.until > Date.now()); } catch (e) { return false; } }
  function unlocked() { return sess(SK); }
  function grant(k) { try { sessionStorage.setItem(k, JSON.stringify({ user: uname(), until: Date.now() + MS })); } catch (e) {} }
  function pinBox(title, sub, len) {
    return new Promise(function (resolve) {
      var old = document.getElementById('bdr-pin'); if (old) old.remove();
      var ov = document.createElement('div'); ov.id = 'bdr-pin';
      ov.style.cssText = 'position:fixed;inset:0;z-index:99995;background:rgba(10,20,40,.55);display:flex;align-items:center;justify-content:center;padding:14px';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:320px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.35)">'
        + '<div style="font-size:15px;font-weight:900">🔐 ' + esc(title) + '</div><div style="font-size:12px;color:#555;margin:4px 0 10px">' + esc(sub) + '</div>'
        + '<input id="bdr-pin-in" type="password" inputmode="numeric" autocomplete="off" maxlength="6" placeholder="____" style="width:100%;box-sizing:border-box;font-size:22px;letter-spacing:10px;text-align:center;padding:9px;border:1.5px solid #cfd6e2;border-radius:10px">'
        + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" class="btn btn-gray btn-sm" id="bdr-pin-no">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="bdr-pin-ok">OK</button></div></div>';
      document.body.appendChild(ov);
      var inp = document.getElementById('bdr-pin-in');
      var done = function (v) { ov.remove(); resolve(v); };
      document.getElementById('bdr-pin-no').onclick = function () { done(null); };
      document.getElementById('bdr-pin-ok').onclick = function () { done(String(inp.value || '').replace(/\D/g, '')); };
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') document.getElementById('bdr-pin-ok').click(); });
      setTimeout(function () { inp.focus(); }, 30);
    });
  }
  // the PIN box shows 4 spaces but takes 6: 4 digits opens review / edit / delete for 30 minutes;
  // 6 digits also shows the deleted bills and old versions of edited bills (30 minutes, this computer)
  function askPin(sub) {
    if (typeof window.bmhReportPinVerify !== 'function') { toast('The report PINs are not available', 'w'); return Promise.resolve(false); }
    return pinBox('PIN', sub, 6).then(function (pin) {
      if (pin == null) return false;
      var len = pin.length === 6 ? 6 : 4;
      return window.bmhReportPinVerify(pin, len).then(function (ok) {
        if (!ok) return false;
        grant(SK);
        if (len === 6) { grant(SK_BIN); toast('Bills open · deleted bills shown (30 minutes)', 's'); } else toast('Bills open for 30 minutes', 's');
        try { buttons(); } catch (e) {}
        return true;
      });
    });
  }
  function needPin() {
    if (!isAdmin()) { toast('Only admin can review bills', 'w'); return Promise.resolve(false); }
    if (unlocked()) return Promise.resolve(true);
    return askPin('Needed to review, edit and delete bills. It stays open for 30 minutes on this computer.');
  }
  function delPin() {
    if (!isAdmin()) { toast('Only admin can delete bills', 'w'); return Promise.resolve(0); }
    if (typeof window.bmhReportPinVerify !== 'function') { toast('The PIN check is not available', 'w'); return Promise.resolve(0); }
    return pinBox('PIN', 'Enter the PIN to delete.', 6).then(function (pin) {
      if (pin == null || !pin) return 0;
      var len = pin.length === 6 ? 6 : 4;
      return window.bmhReportPinVerify(pin, len).then(function (ok) { if (!ok) return 0; grant(SK); return len; });
    });
  }
  function needBin() {
    if (!isAdmin()) return Promise.resolve(false);
    if (finOk()) return Promise.resolve(true);
    return askPin('Enter the PIN.').then(function () { return finOk(); });
  }

  // ── what kind of bill it is ──
  function lineKind(desc) {
    var d = String(desc || ''), c = 'other';
    try { c = inferChargeCategoryFromService(d); } catch (e) {}
    try { if (c !== 'diagnostic' && isLikelySurgeryChargeLabel(d)) c = 'surgery'; } catch (e) {}
    if (c === 'surgery') return 3;
    if (c === 'diagnostic') return 2;
    if (c === 'consultation' || /consult|follow|registration|review|check.?in|no fee/i.test(d)) return 0;
    return 1;
  }
  var CATS = ['Consultations', 'Procedures', 'Investigations', 'Surgeries', 'Balance payments', 'Advances, refunds & other'];
  var CAT_ORDER = ['Consultations', 'Investigations', 'Surgeries', 'Procedures', 'Balance payments', 'Advances, refunds & other'];
  function catOf(e) {
    if (e.balance || e.type === 'due-payment') return 'Balance payments';
    if (e.adj || e.refund || e.type === 'advance' || /advance|refund/i.test(e.label || '')) return 'Advances, refunds & other';
    var lines = [];
    if (e.full && e.full.items) (Array.isArray(e.full.items) ? e.full.items : Object.values(e.full.items)).forEach(function (i) { if (i) lines.push(i.desc || i.name); });
    (e.txns || []).forEach(function (t) { (t.chargeAllocations || []).forEach(function (a) { if (a) lines.push(a.desc || a.name); }); if (!lines.length && t.service) lines.push(t.service); });
    if (!lines.length) lines.push(e.label);
    var k = lines.reduce(function (m, l) { return Math.max(m, lineKind(l)); }, 0);
    return CATS[k];
  }
  function cashOf(e) { return e.adj ? 0 : (e.kind === 'bill' ? (Number(e.paid) || 0) - (Number(e.paidLater) || 0) : Number(e.amount) || 0); }

  // ── deleting (with a hidden copy) ──
  function txnDay(t) { return t._day || dayOf(t.date || t.createdAt); }
  function plan(entries) {
    var paths = {}, days = {}, bills = {}, pays = [];
    entries.forEach(function (e) {
      (e.txns || []).forEach(function (t) {
        var d = txnDay(t); if (!d || !(t._key || t.id)) return;
        paths['transactions/' + d + '/' + (t._key || sk(t.id))] = 1; days[d] = 1;
        if (t.type === 'due-payment' && t.duePaymentId && (t.bmhId || e.bmhId)) pays.push({ bmhId: t.bmhId || e.bmhId, id: t.duePaymentId });
      });
      if (e.kind === 'bill' && e.billId) {
        paths['savedBills/' + sk(e.billId)] = 1; bills[sk(e.billId)] = 1;
        if (e.bmhId) paths['patientDues/' + sk(e.bmhId) + '/items/' + sk(e.billId)] = 1;
        var d0 = dayOf(e.at); if (d0) days[d0] = 1;
      }
    });
    // a deleted bill that had replaced an older bill in the dues ledger: the older one shows again (restore hides it again);
    // and its TPA claim goes with it
    var deps = [];
    entries.forEach(function (e) {
      if (e.kind !== 'bill' || !e.billId) return;
      var bid = sk(e.billId);
      try { (window.PAY_REQUESTS || []).forEach(function (r) { if (r && r.id && String(r.billId || '') === String(e.billId) && /insur|tpa|cashless/i.test(String(r.mode || r.ins || ''))) paths['payRequests/' + sk(r.id)] = 1; }); } catch (x) {}
      if (!e.bmhId) return;
      var r0 = ref('patientDues/' + sk(e.bmhId) + '/items');
      if (r0) deps.push(r0.once('value').then(function (s) { var it = s.val() || {}; Object.keys(it).forEach(function (k) { if (it[k] && sk(it[k].supersededBy) === bid) paths['patientDues/' + sk(e.bmhId) + '/items/' + k + '/supersededBy'] = 1; }); }).catch(function () {}));
    });
    // a balance payment that also paid other bills goes as a whole (all its payment rows)
    return Promise.all(deps.concat(pays.map(function (p) {
      var pth = 'patientDues/' + sk(p.bmhId) + '/payments/' + sk(p.id); paths[pth] = 1;
      var r = ref(pth); if (!r) return null;
      return r.once('value').then(function (s) { var v = s.val(); if (v && Array.isArray(v.txnIds)) { var d = dayOf(v.at); if (d) { days[d] = 1; v.txnIds.forEach(function (id) { paths['transactions/' + d + '/' + sk(id)] = 1; }); } } }).catch(function () {});
    }))).then(function () { return { paths: Object.keys(paths), days: Object.keys(days), bills: Object.keys(bills) }; });
  }
  function deleteEntries(entries, opts) {
    opts = opts || {};
    entries = (entries || []).filter(Boolean);
    if (!entries.length) { toast('Tick the bills to delete first', 'w'); return Promise.resolve(false); }
    if (!window.FBDB) { toast('Not connected', 'w'); return Promise.resolve(false); }
    // every delete asks the PIN: the 4-digit PIN deletes with a hidden copy, the 6-digit PIN deletes for good
    return delPin().then(function (mode) {
      if (!mode) return false;
      var purge = mode === 6;
      var total = entries.reduce(function (s, e) { return s + (e.kind === 'bill' ? Number(e.amount) || 0 : Number(e.amount) || 0); }, 0);
      var later = entries.filter(function (e) { return e.kind === 'bill' && e.later && e.later.length; }).length;
      var reason = opts.reason;
      if (reason == null) { reason = window.prompt('Delete ' + entries.length + ' bill' + (entries.length === 1 ? '' : 's') + ' / receipt' + (entries.length === 1 ? '' : 's') + ' (' + rs(total) + ')?\n\nReason:', 'Entered wrongly'); if (reason === null) return false; }
      if (!window.confirm('Delete ' + entries.length + ' record' + (entries.length === 1 ? '' : 's') + ' totalling ' + rs(total) + '?\n\n'
        + 'They will be removed from billing, collection totals, day summaries, dues and reports on every computer.'
        + (later ? '\n' + later + ' of these bills had balance payments made later — those payments go too.' : '')
        + '\nThe patient, visit and prescription are not touched.')) return false;
      var at = new Date().toISOString(), u = me() || {}, by = u.name || u.username || 'Admin';
      return plan(entries).then(function (p) {
        return Promise.all(p.paths.map(function (pth) { return ref(pth).once('value').then(function (s) { return { p: pth, v: s.val() }; }).catch(function () { return { p: pth, v: null }; }); })).then(function (orig) {
          var restore = orig.filter(function (o) { return o.v != null; });
          var rid = 'DEL' + Date.now() + Math.floor(Math.random() * 1000);
          var up = {};
          p.paths.forEach(function (pth) { up[pth] = null; });
          p.days.forEach(function (d) { up['billingDeletions/days/' + d] = at; });
          p.bills.forEach(function (b) { up['billingDeletions/bills/' + b] = at; });
          if (!purge) up[REC + '/' + rid] = { id: rid, at: at, by: by, reason: String(reason || ''), days: p.days, total: total,
            items: entries.map(function (e) { return { kind: e.kind, no: String(e.no || ''), name: e.name || '', bmhId: e.bmhId || '', amount: Number(e.amount) || 0, label: String(e.label || '').slice(0, 160), dept: e.dept || '', at: e.at || '' }; }),
            restore: JSON.parse(JSON.stringify(restore)) };
          return window.FBDB.ref().update(up).then(function () {
            localDrop(p);
            try { fbPush && fbPush('auditLog', { user: by, role: 'Admin', action: purge ? 'DELETE_BILLS_PERMANENT' : 'DELETE_BILLS', item: entries.length + ' records ' + rs(total) + ' · ' + (reason || ''), timestamp: at }); } catch (e) {}
            toast(entries.length + ' record' + (entries.length === 1 ? '' : 's') + ' deleted ✓', 's');
            return true;
          }, function (err) { console.warn('[bill delete]', err); toast('Could not delete — check the connection', 'w'); return false; });
        });
      });
    });
  }
  window.bmhBillDeleteEntries = deleteEntries;
  function localDrop(p) {
    var ids = {}; p.paths.forEach(function (pth) { var m = pth.match(/^transactions\/[^/]+\/(.+)$/); if (m) ids[m[1]] = 1; });
    var b = BH(), S = b && b.state;
    if (S) {
      S.cache.forEach(function (rows, d) { S.cache.set(d, (rows || []).filter(function (r) { return !(r && (ids[r._key] || ids[sk(r.id)])); })); });
      p.bills.forEach(function (id) { if (S.saved) delete S.saved[id]; if (S.del) S.del.bills[id] = 1; });
      if (b.syncDeletions) b.syncDeletions(true);
    }
    try { var n = TRANSACTIONS.length; for (var i = TRANSACTIONS.length - 1; i >= 0; i--) if (TRANSACTIONS[i] && ids[sk(TRANSACTIONS[i].id)]) TRANSACTIONS.splice(i, 1); if (n !== TRANSACTIONS.length && typeof saveTodayTransactionsToLocal === 'function') saveTodayTransactionsToLocal(); } catch (e) {}
    try {
      var bs = {}; p.bills.forEach(function (id) { bs[id] = 1; });
      if (window.BMH_SAVED_BILLS) { var keep = window.BMH_SAVED_BILLS.filter(function (x) { return !(x && bs[sk(x.id)]); }); if (keep.length !== window.BMH_SAVED_BILLS.length) { window.BMH_SAVED_BILLS.length = 0; keep.forEach(function (x) { window.BMH_SAVED_BILLS.push(x); }); localStorage.setItem('bmh_saved_bills', JSON.stringify(window.BMH_SAVED_BILLS)); } }
    } catch (e) {}
    try { renderCollectionDashboard && renderCollectionDashboard(); } catch (e) {}
    try { b && b.rerender(); } catch (e) {}
  }

  // ── the day review ──
  var V = { day: '', to: '', centre: '', dept: '', list: [] };
  var MAX_DAYS = 92;
  function addDay(k, n) { var p = k.split('-').map(Number); var d = new Date(p[0], p[1] - 1, p[2] + n); return ymd(d); }
  function daysIn(a, b) { var out = []; if (!a) return out; if (!b || b < a) b = a; for (var k = a; k <= b && out.length < MAX_DAYS; k = addDay(k, 1)) out.push(k); return out; }
  function fmtD(k) { var m = String(k || '').match(/^(\d{4})-(\d{2})-(\d{2})$/); return m ? m[3] + '/' + m[2] + '/' + m[1] : k; }
  // the names under a heading: the bill lines of that kind (e.g. Investigations → OCT, VF; Neuro → EEG)
  function linesOf(e) {
    var lines = [];
    if (e.full && e.full.items) (Array.isArray(e.full.items) ? e.full.items : Object.values(e.full.items)).forEach(function (i) { if (i) lines.push(i.desc || i.name); });
    (e.txns || []).forEach(function (t) { (t.chargeAllocations || []).forEach(function (a) { if (a) lines.push(a.desc || a.name); }); if (!lines.length && t.service) lines.push(t.service); });
    if (!lines.length) lines.push(e.label);
    return lines.map(function (l) { return String(l || '').replace(/\s+/g, ' ').trim(); }).filter(Boolean);
  }
  function subOf(e, cat) {
    if (cat === 'Balance payments') return 'Balance payments';
    if (cat === 'Advances, refunds & other') return /refund/i.test(e.label || '') || e.refund ? 'Refunds' : /advance/i.test(e.label || '') || e.type === 'advance' ? 'Advances' : (e.label || 'Other');
    var k = CATS.indexOf(cat), lines = linesOf(e), mine = lines.filter(function (l) { return lineKind(l) === k; });
    if (!mine.length) mine = lines;
    var seen = {}, names = [];
    mine.forEach(function (l) { var n = l.replace(/\s*[x×]\s*\d+\s*$/i, ''); var key = n.toLowerCase(); if (!seen[key]) { seen[key] = 1; names.push(n); } });
    return names.sort().join(' + ') || 'Other';
  }
  function modal(id, title, inner) {
    var ov = document.getElementById(id);
    if (!ov) { ov = document.createElement('div'); ov.id = id; ov.style.cssText = 'position:fixed;inset:0;z-index:9000;background:rgba(10,20,40,.5);display:flex;align-items:flex-start;justify-content:center;padding:24px 12px;overflow:auto'; document.body.appendChild(ov); }
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:980px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.35)"><div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #e5e7eb"><div style="font-size:15px;font-weight:900;flex:1">' + title + '</div><button type="button" class="btn btn-gray btn-sm" onclick="document.getElementById(\'' + id + '\').remove()">✕ Close</button></div><div style="padding:12px 16px" class="bdr-body">' + inner + '</div></div>';
    return ov;
  }
  window.bmhBillDayReview = function () {
    needPin().then(function (ok) {
      if (!ok) return;
      if (!V.day) { var y = new Date(); y.setDate(y.getDate() - 1); V.day = ymd(y); }
      if (!V.to || V.to < V.day) V.to = V.day;
      var ov = modal('bdr-ov', '🗂 Review bills',
        '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:end;margin-bottom:10px">'
        + '<label style="font-size:11px;font-weight:800;color:#555">From<br><input type="date" id="bdr-day" value="' + esc(V.day) + '" style="font-size:13px"></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555">To<br><input type="date" id="bdr-to" value="' + esc(V.to || V.day) + '" style="font-size:13px"></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555">Department<br><select id="bdr-dept" style="font-size:13px"><option value="">All</option></select></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555">Centre<br><select id="bdr-centre" style="font-size:13px"><option value="">Both</option><option value="RPR"' + (V.centre === 'RPR' ? ' selected' : '') + '>Ropar</option><option value="CHD"' + (V.centre === 'CHD' ? ' selected' : '') + '>Chandigarh</option></select></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555;flex:1;min-width:180px">Reason for deleting<br><input type="text" id="bdr-reason" value="Entered wrongly" style="font-size:13px;width:100%"></label>'
        + '<button type="button" class="btn btn-sm" id="bdr-del" style="background:#c62828;color:#fff">🗑 Delete selected (0)</button>'
        + (finOk() ? '<button type="button" class="btn btn-sm btn-outline" onclick="bmhDeletedBills()">🗑 Deleted bills</button>' : '') + '</div>'
        + '<div id="bdr-list"><div style="padding:18px;text-align:center;color:#777">Loading…</div></div>');
      ov.querySelector('#bdr-day').onchange = function () { V.day = this.value; if (!V.to || V.to < V.day) { V.to = V.day; ov.querySelector('#bdr-to').value = V.to; } load(); };
      ov.querySelector('#bdr-to').onchange = function () { V.to = this.value < V.day ? V.day : this.value; this.value = V.to; load(); };
      ov.querySelector('#bdr-dept').onchange = function () { V.dept = this.value; draw(); };
      ov.querySelector('#bdr-centre').onchange = function () { V.centre = this.value; draw(); };
      ov.querySelector('#bdr-del').onclick = function () {
        var keys = Array.prototype.map.call(ov.querySelectorAll('.bdr-ck:checked'), function (c) { return c.getAttribute('data-k'); });
        var ents = V.list.filter(function (e) { return keys.indexOf(e.key) >= 0; });
        deleteEntries(ents, { reason: (ov.querySelector('#bdr-reason') || {}).value || '' }).then(function (done) { if (done) load(); });
      };
      ov.addEventListener('change', function (e) {
        var t = e.target;
        if (t.classList.contains('bdr-all')) { var g = t.closest('details'); Array.prototype.forEach.call(g.querySelectorAll('.bdr-ck'), function (c) { c.checked = t.checked; }); }
        var n = ov.querySelectorAll('.bdr-ck:checked').length; ov.querySelector('#bdr-del').textContent = '🗑 Delete selected (' + n + ')';
      });
      load();
    });
  };
  function load() {
    var b = BH(), box = document.getElementById('bdr-list'); if (!b || !box) return;
    var days = daysIn(V.day, V.to), one = days.length === 1, set = {};
    days.forEach(function (d) { set[d] = 1; });
    var over = V.to && daysIn(V.day, '9999-12-31').length && V.to > days[days.length - 1];
    box.innerHTML = '<div style="padding:18px;text-align:center;color:#777">Loading ' + esc(one ? fmtD(V.day) : fmtD(days[0]) + ' – ' + fmtD(days[days.length - 1])) + '…</div>';
    b.ensureLoaded().then(function () {
      var i = 0;
      var next = function () { if (i >= days.length) return Promise.resolve(); var d = days[i++]; var el = document.getElementById('bdr-list'); if (el && !one && i % 5 === 0) el.innerHTML = '<div style="padding:18px;text-align:center;color:#777">Loading… ' + i + ' / ' + days.length + ' days</div>'; return b.loadDay(d, one).catch(function () {}).then(next); };
      return next();
    }).then(function () {
      V.list = b.buildEntries().filter(function (e) { return set[dayOf(e.at)]; });
      V.over = over ? days[days.length - 1] : '';
      draw();
    }).catch(function () { box.innerHTML = '<div style="padding:18px;text-align:center;color:#c62828">Could not load the bills — check the connection</div>'; });
  }
  function draw() {
    var box = document.getElementById('bdr-list'); if (!box) return;
    var b = BH(), byCentre = V.list.filter(function (e) { return !V.centre || String(e.centre || '').toUpperCase() === V.centre; });
    var dl = function (e) { return ((b && b.deptLabel(e.dept)) || 'Other') || 'Other'; };
    var sel = document.getElementById('bdr-dept');
    if (sel) { var have = {}; byCentre.forEach(function (e) { have[dl(e)] = 1; }); if (V.dept) have[V.dept] = 1; sel.innerHTML = '<option value="">All</option>' + Object.keys(have).sort().map(function (d) { return '<option' + (d === V.dept ? ' selected' : '') + '>' + esc(d) + '</option>'; }).join(''); }
    var list = byCentre.filter(function (e) { return !V.dept || dl(e) === V.dept; });
    var multi = V.to && V.to !== V.day;
    var del = document.getElementById('bdr-del'); if (del) del.textContent = '🗑 Delete selected (0)';
    if (!list.length) { box.innerHTML = '<div style="padding:18px;text-align:center;color:#777">No bills or receipts ' + (multi ? 'in these dates' : 'on this date') + (V.dept ? ' for ' + esc(V.dept) : '') + '.</div>'; return; }
    var depts = {};
    list.forEach(function (e) { var d = (b && b.deptLabel(e.dept)) || 'Other'; d = d || 'Other'; var c = catOf(e); ((depts[d] = depts[d] || {})[c] = depts[d][c] || []).push(e); });
    var totalAll = list.reduce(function (s, e) { return s + cashOf(e); }, 0);
    box.innerHTML = (V.over ? '<div style="font-size:12px;color:#b45309;margin-bottom:6px">Showing up to ' + MAX_DAYS + ' days at a time — to ' + esc(fmtD(V.over)) + '.</div>' : '')
      + '<div style="font-size:12px;color:#555;margin-bottom:8px"><b>' + list.length + '</b> bills / receipts · collected <b>' + rs(totalAll) + '</b>' + (multi ? ' · ' + esc(fmtD(V.day)) + ' – ' + esc(fmtD(V.to)) : '') + '. Open a group, tick the wrong ones, then Delete selected.</div>'
      + Object.keys(depts).sort().map(function (d) {
        var cats = depts[d], n = 0, tot = 0;
        Object.keys(cats).forEach(function (c) { n += cats[c].length; cats[c].forEach(function (e) { tot += cashOf(e); }); });
        return '<div style="border:1px solid #e5e7eb;border-radius:10px;margin-bottom:10px;overflow:hidden"><div style="background:#f3f6fb;padding:8px 12px;font-weight:900;font-size:13px">' + esc(d) + ' <span style="font-weight:600;color:#555;font-size:12px">· ' + n + ' · ' + rs(tot) + '</span></div>'
          + CAT_ORDER.filter(function (c) { return cats[c]; }).map(function (c) {
            var rows = cats[c].slice().sort(function (x, y) { return String(x.at).localeCompare(String(y.at)); });
            var ct = rows.reduce(function (s, e) { return s + cashOf(e); }, 0);
            var subs = {}; rows.forEach(function (e) { var n = subOf(e, c); (subs[n] = subs[n] || []).push(e); });
            var subNames = Object.keys(subs).sort(function (x, y) { return subs[y].length - subs[x].length || x.localeCompare(y); });
            return '<details style="border-top:1px solid #eef0f4"><summary style="padding:8px 12px;cursor:pointer;font-size:12.5px;font-weight:800">' + esc(c) + ' <span style="font-weight:600;color:#555">· ' + rows.length + ' · ' + rs(ct) + '</span></summary>'
              + '<div style="padding:0 12px 8px"><label style="font-size:11px;font-weight:700;color:#555;display:inline-flex;gap:5px;align-items:center;margin:4px 0"><input type="checkbox" class="bdr-all"> Tick all in this group</label>'
              + '<table style="width:100%;font-size:12px;border-collapse:collapse"><tbody>' + subNames.map(function (sn) {
                var srows = subs[sn], st = srows.reduce(function (s, e) { return s + cashOf(e); }, 0);
                return '<tr><td colspan="7" style="padding:7px 4px 3px;font-size:11.5px;font-weight:900;color:#1a3c6e;border-top:1px solid #dbe3ef">' + esc(sn) + ' <span style="font-weight:600;color:#666">· ' + srows.length + ' · ' + rs(st) + '</span></td></tr>' + srows.map(function (e) {
                return '<tr style="border-top:1px solid #f1f2f5"><td style="width:26px;padding:5px 2px"><input type="checkbox" class="bdr-ck" data-k="' + esc(e.key) + '"></td>'
                  + '<td style="width:' + (multi ? '84' : '52') + 'px;color:#666">' + (multi ? esc(fmtD(dayOf(e.at)).slice(0, 5)) + ' ' : '') + esc(fmtT(e.at)) + '</td>'
                  + '<td><b>' + esc(e.name || '—') + '</b> <span style="color:#777;font-size:11px">' + esc(e.bmhId) + '</span><div style="color:#555;font-size:11px">' + esc(e.label) + '</div></td>'
                  + '<td style="width:120px;color:#666;font-size:11px">' + (e.kind === 'bill' ? 'Bill ' : 'Receipt ') + esc(e.no) + (e.centre ? '<br>' + esc(e.centre) : '') + '</td>'
                  + '<td style="width:80px;color:#666;font-size:11px">' + esc(e.mode || '') + '</td>'
                  + '<td style="width:110px;text-align:right;font-weight:800">' + rs(e.amount) + (e.kind === 'bill' && Number(e.paid) !== Number(e.amount) ? '<div style="font-weight:600;color:#777;font-size:10.5px">paid ' + rs(e.paid) + '</div>' : '') + '</td>'
                  + '<td style="width:40px;text-align:right"><button type="button" class="btn btn-xs btn-outline" title="Edit details" onclick="bmhBillEdit(\'' + esc(e.key).replace(/'/g, '') + '\')">✏️</button></td></tr>';
              }).join(''); }).join('') + '</tbody></table></div></details>';
          }).join('') + '</div>';
      }).join('');
  }

  // ── edit the details of a bill / receipt (never the amounts); the old version is kept at billEditRecords/ ──
  var DEPTS = [['ophtho', 'Ophthalmology'], ['obg', 'OBG'], ['psych', 'Neuropsychiatry'], ['skin', 'Skin & Cosmetology']];
  var MODES = ['Cash', 'UPI', 'Card', 'Online / NEFT', 'Cheque', 'Insurance', 'TPA'];
  function localTime(v) { var d = new Date(v); return isNaN(d) ? null : d; }
  function moveDate(iso, newDay) {
    var d = localTime(iso) || new Date(); var p = newDay.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2], d.getHours(), d.getMinutes(), d.getSeconds()).toISOString();
  }
  window.bmhBillEdit = function (key) {
    needPin().then(function (ok) {
      if (!ok) return;
      var e = V.list.filter(function (x) { return x.key === key; })[0]; if (!e) { toast('Bill not found — reload the day', 'w'); return; }
      // the payment rows this edit changes: a bill's own rows (not balance payments made later), or the receipt's rows
      var rows = (e.txns || []).filter(function (t) { return e.kind !== 'bill' || t.type !== 'due-payment'; });
      var items = [];
      if (e.kind === 'bill' && e.full && e.full.items) items = (Array.isArray(e.full.items) ? e.full.items : Object.values(e.full.items)).map(function (i) { return (i && (i.desc || i.name)) || ''; });
      else if (rows.length === 1) { var al = (rows[0].chargeAllocations || []).filter(Boolean); items = al.length ? al.map(function (a) { return a.desc || a.name || ''; }) : [rows[0].service || '']; }
      var modes = rows.map(function (t) { return t.mode || ''; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
      var oneMode = modes.length <= 1;
      var cur = { name: e.name || '', dept: e.dept || (rows[0] || {}).dept || '', centre: String(e.centre || '').toUpperCase(), mode: oneMode ? (modes[0] || e.mode || '') : '', day: dayOf(e.at), items: items };
      var fld = 'display:block;font-size:11px;font-weight:800;color:#555;margin-top:8px';
      var inp = 'width:100%;box-sizing:border-box;font-size:13px;padding:6px 8px';
      var deptOpts = DEPTS.slice(); if (cur.dept && !DEPTS.some(function (d) { return d[0] === cur.dept; })) deptOpts.push([cur.dept, cur.dept]);
      var ov = modal('bdr-edit', '✏️ Edit ' + (e.kind === 'bill' ? 'bill ' : 'receipt ') + esc(e.no) + ' · ' + esc(e.name || '') + ' ' + esc(e.bmhId),
        '<div style="font-size:12px;color:#555;margin-bottom:6px">Amount ' + rs(e.amount) + (e.kind === 'bill' ? ' · paid ' + rs(e.paid) : '') + ' — amounts cannot be changed here.</div>'
        + '<label style="' + fld + '">Patient name<input id="be-name" style="' + inp + '" value="' + esc(cur.name) + '"></label>'
        + (items.length ? '<div style="' + fld + '">Particulars</div>' + items.map(function (d, i) { return '<input class="be-item" data-i="' + i + '" style="' + inp + ';margin-top:4px" value="' + esc(d) + '">'; }).join('') : '')
        + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'
        + '<label style="' + fld + '">Department<select id="be-dept" style="' + inp + '">' + deptOpts.map(function (d) { return '<option value="' + esc(d[0]) + '"' + (d[0] === cur.dept ? ' selected' : '') + '>' + esc(d[1]) + '</option>'; }).join('') + '</select></label>'
        + '<label style="' + fld + '">Centre<select id="be-centre" style="' + inp + '"><option value="RPR"' + (cur.centre === 'RPR' ? ' selected' : '') + '>Ropar</option><option value="CHD"' + (cur.centre === 'CHD' ? ' selected' : '') + '>Chandigarh</option>' + (cur.centre && cur.centre !== 'RPR' && cur.centre !== 'CHD' ? '<option value="' + esc(cur.centre) + '" selected>' + esc(cur.centre) + '</option>' : '') + '</select></label>'
        + (oneMode ? '<label style="' + fld + '">Payment mode<input id="be-mode" list="be-modes" style="' + inp + '" value="' + esc(cur.mode) + '"><datalist id="be-modes">' + MODES.map(function (m) { return '<option value="' + m + '">'; }).join('') + '</datalist></label>' : '<div style="' + fld + '">Payment mode<div style="font-weight:600;color:#777;margin-top:6px">' + esc(modes.join(' + ')) + ' (split payment — not editable)</div></div>')
        + '<label style="' + fld + '">Date<input id="be-day" type="date" style="' + inp + '" value="' + esc(cur.day) + '"></label></div>'
        + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px"><button type="button" class="btn btn-gray btn-sm" onclick="document.getElementById(\'bdr-edit\').remove()">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="be-save">Save changes</button></div>');
      ov.style.zIndex = '9100';
      ov.querySelector('#be-save').onclick = function () {
        var g = function (id) { var el = ov.querySelector('#' + id); return el ? String(el.value || '').replace(/\s+/g, ' ').trim() : null; };
        var nx = { name: g('be-name'), dept: g('be-dept'), centre: g('be-centre'), mode: oneMode ? g('be-mode') : null, day: g('be-day'),
          items: Array.prototype.map.call(ov.querySelectorAll('.be-item'), function (x) { return String(x.value || '').replace(/\s+/g, ' ').trim(); }) };
        saveEdit(e, rows, cur, nx).then(function (done) { if (done) { ov.remove(); load(); } });
      };
    });
  };
  function saveEdit(e, rows, cur, nx) {
    var changes = [];
    var ch = function (f, a, b) { if (b != null && String(a || '') !== String(b || '')) changes.push({ field: f, from: String(a || ''), to: String(b || '') }); };
    ch('Patient name', cur.name, nx.name); ch('Department', cur.dept, nx.dept); ch('Centre', cur.centre, nx.centre);
    if (nx.mode != null) ch('Payment mode', cur.mode, nx.mode);
    ch('Date', cur.day, nx.day);
    var itemMap = {}; cur.items.forEach(function (d, i) { if (nx.items[i] != null && nx.items[i] !== d) { if (!nx.items[i]) return; itemMap[d] = nx.items[i]; ch('Particulars', d, nx.items[i]); } });
    if (!nx.name) { toast('Patient name cannot be empty', 'w'); return Promise.resolve(false); }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(nx.day || '')) { toast('Choose a date', 'w'); return Promise.resolve(false); }
    if (!changes.length) { toast('Nothing changed', 'i'); return Promise.resolve(true); }
    if (!window.confirm('Save these changes?\n\n' + changes.map(function (c) { return c.field + ': ' + c.from + ' → ' + c.to; }).join('\n') + '\n\nAmounts stay the same.')) return Promise.resolve(false);
    var at = new Date().toISOString(), u = me() || {}, by = u.name || u.username || 'Admin';
    var tPaths = rows.map(function (t) { return { t: t, p: 'transactions/' + txnDay(t) + '/' + (t._key || sk(t.id)) }; });
    var bPath = e.kind === 'bill' && e.billId ? 'savedBills/' + sk(e.billId) : null;
    var reads = tPaths.map(function (x) { return ref(x.p).once('value').then(function (s) { return { p: x.p, v: s.val(), t: x.t }; }); });
    if (bPath) reads.push(ref(bPath).once('value').then(function (s) { return { p: bPath, v: s.val(), bill: true }; }));
    return Promise.all(reads).then(function (orig) {
      var up = {}, days = {}, before = [];
      var mapDesc = function (d) { return itemMap.hasOwnProperty(d) ? itemMap[d] : d; };
      orig.forEach(function (o) {
        if (o.v == null) return;
        before.push({ p: o.p, v: o.v });
        var v = JSON.parse(JSON.stringify(o.v));
        if (o.bill) {
          v.patientName = nx.name; v.dept = nx.dept; v.centre = nx.centre; if (nx.mode != null) v.paymentMode = nx.mode;
          if (cur.day !== nx.day) { if (v.createdAt) v.createdAt = moveDate(v.createdAt, nx.day); if (v.date) v.date = moveDate(v.date, nx.day); }
          if (v.items) Object.keys(v.items).forEach(function (k) { var it = v.items[k]; if (it) { if (it.desc != null) it.desc = mapDesc(it.desc); if (it.name != null) it.name = mapDesc(it.name); } });
          v.editedAt = at; v.editedBy = by;
          up[o.p] = v; return;
        }
        var oldDay = o.p.split('/')[1];
        v.patient = nx.name; if (v.patientName != null) v.patientName = nx.name; v.dept = nx.dept; v.centre = nx.centre; if (nx.mode != null) v.mode = nx.mode;
        if (v.service != null) v.service = mapDesc(v.service);
        (v.chargeAllocations || []).forEach(function (a) { if (a) { if (a.desc != null) a.desc = mapDesc(a.desc); if (a.name != null) a.name = mapDesc(a.name); } });
        v.editedAt = at; v.editedBy = by;
        days[oldDay] = 1;
        if (cur.day !== nx.day && oldDay === cur.day) {
          if (v.date) v.date = moveDate(v.date, nx.day); if (v.createdAt) v.createdAt = moveDate(v.createdAt, nx.day);
          up[o.p] = null; up['transactions/' + nx.day + '/' + o.p.split('/')[2]] = v; days[nx.day] = 1;
        } else up[o.p] = v;
      });
      if (!before.length) { toast('Record not found on the server — reload the day', 'w'); return false; }
      Object.keys(days).forEach(function (d) { up['billingDeletions/days/' + d] = at; });
      var rid = 'EDIT' + Date.now() + Math.floor(Math.random() * 1000);
      up[EDT + '/' + rid] = { id: rid, at: at, by: by, kind: e.kind, no: String(e.no || ''), name: cur.name, bmhId: e.bmhId || '', changes: changes, before: before };
      return window.FBDB.ref().update(up).then(function () {
        var b = BH(), S = b && b.state;
        if (S && bPath && up[bPath]) { S.saved = S.saved || {}; S.saved[sk(e.billId)] = up[bPath]; }
        try { (window.BMH_SAVED_BILLS || []).forEach(function (x) { if (x && bPath && sk(x.id) === sk(e.billId)) Object.assign(x, up[bPath]); }); localStorage.setItem('bmh_saved_bills', JSON.stringify(window.BMH_SAVED_BILLS)); } catch (x) {}
        try { if (b) { b.syncDeletions(true); } } catch (x) {}
        try { fbPush && fbPush('auditLog', { user: by, role: 'Admin', action: 'EDIT_BILL', item: (e.no || '') + ' · ' + changes.map(function (c) { return c.field; }).join(', '), timestamp: at }); } catch (x) {}
        toast('Changes saved ✓', 's');
        return Promise.all(Object.keys(days).map(function (d) { return b ? b.loadDay(d, true).catch(function () {}) : null; })).then(function () { return true; });
      }, function () { toast('Could not save — check the connection', 'w'); return false; });
    });
  }

  // ── the hidden copies (6-digit PIN) ──
  window.bmhDeletedBills = function () {
    needBin().then(function (ok) { if (ok) openBin(); });
  };
  function openBin() {
    var ov = modal('bdr-bin', '🗑 Deleted bills (hidden copies)', '<div id="bdr-bin-list"><div style="padding:18px;text-align:center;color:#777">Loading…</div></div>');
    drawBin(ov);
  }
  function drawBin(ov) {
    var box = ov.querySelector('#bdr-bin-list');
    Promise.all([ref(REC).once('value'), ref('deletedTransactions').once('value'), ref(EDT).once('value')]).then(function (r) {
      var recs = r[0].val() || {}, oldT = r[1].val() || {}, eds = r[2].val() || {};
      var elist = Object.keys(eds).map(function (k) { return eds[k]; }).filter(Boolean).sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); });
      var oldN = 0; Object.keys(oldT).forEach(function (d) { oldN += Object.keys(oldT[d] || {}).length; });
      var list = Object.keys(recs).map(function (k) { return recs[k]; }).filter(Boolean).sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); });
      box.innerHTML = '<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap"><div style="flex:1;font-size:12px;color:#555">' + list.length + ' deletion' + (list.length === 1 ? '' : 's') + (oldN ? ' · plus ' + oldN + ' payment rows from the earlier "Delete bill" button' : '') + '. Restore puts a record back everywhere; Erase removes the copy for good.</div>'
        + ((list.length || oldN || elist.length) ? '<button type="button" class="btn btn-sm" id="bdr-empty" style="background:#7f1d1d;color:#fff">Empty all copies for good</button>' : '') + '</div>'
        + (list.length ? list.map(function (x) {
          return '<div style="border:1px solid #e5e7eb;border-radius:10px;padding:9px 12px;margin-bottom:8px"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><div style="flex:1;font-size:12px"><b>Deleted ' + esc(fmtDT(x.at)) + '</b> by ' + esc(x.by) + (x.reason ? ' · “' + esc(x.reason) + '”' : '') + ' · <b>' + rs(x.total) + '</b></div>'
            + '<button type="button" class="btn btn-xs btn-gold" data-restore="' + esc(x.id) + '">↩ Restore</button> <button type="button" class="btn btn-xs btn-outline" data-erase="' + esc(x.id) + '">Erase</button></div>'
            + '<div style="font-size:11.5px;color:#444;margin-top:4px">' + (x.items || []).map(function (i) { return '• ' + esc(i.name) + ' ' + esc(i.bmhId) + ' · ' + (i.kind === 'bill' ? 'Bill ' : 'Receipt ') + esc(i.no) + ' · ' + esc(i.label) + ' · ' + rs(i.amount) + (i.at ? ' · ' + esc(String(i.at).slice(0, 10)) : ''); }).join('<br>') + '</div></div>';
        }).join('') : '<div style="padding:18px;text-align:center;color:#777">No deleted bills.</div>')
        + '<div style="font-size:14px;font-weight:900;margin:16px 0 8px">✏️ Edited bills — old versions (' + elist.length + ')</div>'
        + (elist.length ? elist.map(function (x) {
          return '<div style="border:1px solid #e5e7eb;border-radius:10px;padding:9px 12px;margin-bottom:8px"><div style="display:flex;gap:8px;align-items:center"><div style="flex:1;font-size:12px"><b>Edited ' + esc(fmtDT(x.at)) + '</b> by ' + esc(x.by) + ' · ' + esc(x.name) + ' ' + esc(x.bmhId) + ' · ' + (x.kind === 'bill' ? 'Bill ' : 'Receipt ') + esc(x.no) + '</div>'
            + '<button type="button" class="btn btn-xs btn-outline" data-erase-edit="' + esc(x.id) + '">Erase</button></div>'
            + '<div style="font-size:11.5px;color:#444;margin-top:4px">' + (x.changes || []).map(function (c) { return '• ' + esc(c.field) + ': <s style="color:#999">' + esc(c.from) + '</s> → <b>' + esc(c.to) + '</b>'; }).join('<br>') + '</div></div>';
        }).join('') : '<div style="padding:10px;text-align:center;color:#777;font-size:12px">No edits yet.</div>');
      box.onclick = function (e) {
        var t = e.target; if (!t || !t.getAttribute) return;
        var rid = t.getAttribute('data-restore'), eid = t.getAttribute('data-erase'), xid = t.getAttribute('data-erase-edit');
        if (xid) { if (window.confirm('Erase this old version for good?')) ref(EDT + '/' + xid).remove().then(function () { toast('Old version erased', 's'); drawBin(ov); }); return; }
        if (rid) restore(recs[rid]).then(function () { drawBin(ov); });
        else if (eid && window.confirm('Erase this hidden copy for good? It cannot be restored afterwards.')) ref(REC + '/' + eid).remove().then(function () { toast('Copy erased', 's'); drawBin(ov); });
        else if (t.id === 'bdr-empty') emptyAll().then(function () { drawBin(ov); });
      };
    }).catch(function () { box.innerHTML = '<div style="padding:18px;text-align:center;color:#c62828">Could not load — check the connection</div>'; });
  }
  function restore(x) {
    if (!x || !finOk()) return Promise.resolve();
    if (!window.confirm('Restore ' + (x.items || []).length + ' record(s) (' + rs(x.total) + ')? They come back in billing, totals, dues and reports.')) return Promise.resolve();
    var at = new Date().toISOString(), up = {};
    (x.restore || []).forEach(function (o) { if (o && o.p) up[o.p] = o.v; });
    (x.days || []).forEach(function (d) { up['billingDeletions/days/' + d] = at; });
    (x.restore || []).forEach(function (o) { var m = o && String(o.p).match(/^savedBills\/(.+)$/); if (m) up['billingDeletions/bills/' + m[1]] = null; });
    up[REC + '/' + x.id] = null;
    return window.FBDB.ref().update(up).then(function () {
      var b = BH(), S = b && b.state;
      if (S) { (x.restore || []).forEach(function (o) { var m = o && String(o.p).match(/^savedBills\/(.+)$/); if (m) { S.saved = S.saved || {}; S.saved[m[1]] = o.v; if (S.del) delete S.del.bills[m[1]]; } }); (x.days || []).forEach(function (d) { b.loadDay(d, true).catch(function () {}); }); }
      toast('Restored ✓', 's');
    }, function () { toast('Could not restore — check the connection', 'w'); });
  }
  function emptyAll() {
    if (!finOk()) return Promise.resolve();
    if (!window.confirm('Empty ALL hidden copies of deleted bills (and old versions of edited bills) for good?\nThey cannot be restored afterwards.')) return Promise.resolve();
    if (!window.confirm('Are you sure? This erases every deleted-bill copy permanently.')) return Promise.resolve();
    return ref('savedBills').orderByChild('status').equalTo('void').once('value').then(function (s) { return s.val() || {}; }).catch(function () { return {}; }).then(function (voids) {
      var up = {}; up[REC] = null; up[EDT] = null; up['deletedTransactions'] = null;
      Object.keys(voids).forEach(function (k) { up['savedBills/' + k] = null; });
      return window.FBDB.ref().update(up).then(function () { toast('All deleted-bill copies erased', 's'); }, function () { toast('Could not empty — check the connection', 'w'); });
    });
  }

  // ── buttons in Bills & History (admin only; Deleted bills only after the 6-digit PIN) ──
  function buttons() {
    var res = document.getElementById('bmh-bill-history-results'); if (!res) return;
    var bar = document.getElementById('bdr-bar');
    if (!isAdmin()) { if (bar) bar.remove(); return; }
    if (!bar) { bar = document.createElement('div'); bar.id = 'bdr-bar'; bar.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin:-2px 0 10px'; res.parentNode.insertBefore(bar, res); }
    var html = '<button type="button" class="btn btn-sm btn-outline" onclick="bmhBillDayReview()">🗂 Review bills</button>'
      + (finOk() ? '<button type="button" class="btn btn-sm btn-outline" onclick="bmhDeletedBills()">🗑 Deleted bills</button>' : '');
    if (bar.innerHTML !== html) bar.innerHTML = html;
  }
  setInterval(function () { try { buttons(); } catch (e) {} }, 3000);
  if (document.readyState !== 'loading') buttons(); else document.addEventListener('DOMContentLoaded', buttons);
})();
