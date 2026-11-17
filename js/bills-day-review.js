/* BMH — Billing → Bills & History: review the bills of a day, and delete wrong ones (admin + 4-digit report PIN).
 * "🗂 Review / delete bills of a day" (admin logins only) asks the 4-digit report PIN; after one correct PIN it stays open
 * for 30 minutes on this computer. Choose a date: the bills and receipts of that day are grouped by department, then
 * Consultations / Investigations / Surgeries / Procedures / Balance payments / Advances & other, each a roll-down list
 * with a tick box per bill (and a tick-all per group). "Delete selected" removes them from billing, collection totals,
 * day summaries, dues, reports and every computer — only money records (the patient, visit and prescription stay).
 * A hidden copy of everything removed is kept at deletedBillRecords/ — shown only after the 6-digit report PIN
 * ("🗑 Deleted bills"), where each can be restored or erased, or all emptied for good.
 * Off switch (this browser): localStorage.setItem('bmh_bill_day_review_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_bill_day_review_off') === '1') return; } catch (e) {}
  var SK = 'bmh_bill_del', MS = 30 * 60e3, REC = 'deletedBillRecords';
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
  function finOk() { return typeof window.bmhReportFinUnlocked === 'function' && window.bmhReportFinUnlocked(); }
  function ymd(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function fmtT(v) { var d = new Date(v); return isNaN(d) ? '' : d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }
  function fmtDT(v) { var d = new Date(v); return isNaN(d) ? String(v || '') : d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }

  // ── 4-digit PIN: open for 30 minutes on this computer ──
  function unlocked() { try { var o = JSON.parse(sessionStorage.getItem(SK) || 'null'); return !!(o && o.user === uname() && o.until > Date.now()); } catch (e) { return false; } }
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
  function needPin() {
    if (!isAdmin()) { toast('Only admin can delete bills', 'w'); return Promise.resolve(false); }
    if (unlocked()) return Promise.resolve(true);
    if (typeof window.bmhReportPinVerify !== 'function') { toast('The report PINs are not available', 'w'); return Promise.resolve(false); }
    return pinBox('4-digit PIN', 'Needed to review and delete bills. It stays open for 30 minutes on this computer.', 4).then(function (pin) {
      if (pin == null) return false;
      return window.bmhReportPinVerify(pin, 4).then(function (ok) {
        if (ok) { try { sessionStorage.setItem(SK, JSON.stringify({ user: uname(), until: Date.now() + MS })); } catch (e) {} toast('Bill deletion open for 30 minutes', 's'); }
        return ok;
      });
    });
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
    // a balance payment that also paid other bills goes as a whole (all its payment rows)
    return Promise.all(pays.map(function (p) {
      var pth = 'patientDues/' + sk(p.bmhId) + '/payments/' + sk(p.id); paths[pth] = 1;
      var r = ref(pth); if (!r) return null;
      return r.once('value').then(function (s) { var v = s.val(); if (v && Array.isArray(v.txnIds)) { var d = dayOf(v.at); if (d) { days[d] = 1; v.txnIds.forEach(function (id) { paths['transactions/' + d + '/' + sk(id)] = 1; }); } } }).catch(function () {});
    })).then(function () { return { paths: Object.keys(paths), days: Object.keys(days), bills: Object.keys(bills) }; });
  }
  function deleteEntries(entries, opts) {
    opts = opts || {};
    entries = (entries || []).filter(Boolean);
    if (!entries.length) { toast('Tick the bills to delete first', 'w'); return Promise.resolve(false); }
    if (!window.FBDB) { toast('Not connected', 'w'); return Promise.resolve(false); }
    return needPin().then(function (ok) {
      if (!ok) return false;
      var total = entries.reduce(function (s, e) { return s + (e.kind === 'bill' ? Number(e.amount) || 0 : Number(e.amount) || 0); }, 0);
      var later = entries.filter(function (e) { return e.kind === 'bill' && e.later && e.later.length; }).length;
      var reason = opts.reason;
      if (reason == null) { reason = window.prompt('Delete ' + entries.length + ' bill' + (entries.length === 1 ? '' : 's') + ' / receipt' + (entries.length === 1 ? '' : 's') + ' (' + rs(total) + ')?\n\nReason:', 'Entered wrongly'); if (reason === null) return false; }
      if (!window.confirm('Delete ' + entries.length + ' record' + (entries.length === 1 ? '' : 's') + ' totalling ' + rs(total) + '?\n\n'
        + 'They will be removed from billing, collection totals, day summaries, dues and reports on every computer.'
        + (later ? '\n' + later + ' of these bills had balance payments made later — those payments go too.' : '')
        + '\nThe patient, visit and prescription are not touched. A hidden copy is kept (6-digit PIN to see it).')) return false;
      var at = new Date().toISOString(), u = me() || {}, by = u.name || u.username || 'Admin';
      return plan(entries).then(function (p) {
        return Promise.all(p.paths.map(function (pth) { return ref(pth).once('value').then(function (s) { return { p: pth, v: s.val() }; }).catch(function () { return { p: pth, v: null }; }); })).then(function (orig) {
          var restore = orig.filter(function (o) { return o.v != null; });
          var rid = 'DEL' + Date.now() + Math.floor(Math.random() * 1000);
          var up = {};
          p.paths.forEach(function (pth) { up[pth] = null; });
          p.days.forEach(function (d) { up['billingDeletions/days/' + d] = at; });
          p.bills.forEach(function (b) { up['billingDeletions/bills/' + b] = at; });
          up[REC + '/' + rid] = { id: rid, at: at, by: by, reason: String(reason || ''), days: p.days, total: total,
            items: entries.map(function (e) { return { kind: e.kind, no: String(e.no || ''), name: e.name || '', bmhId: e.bmhId || '', amount: Number(e.amount) || 0, label: String(e.label || '').slice(0, 160), dept: e.dept || '', at: e.at || '' }; }),
            restore: JSON.parse(JSON.stringify(restore)) };
          return window.FBDB.ref().update(up).then(function () {
            localDrop(p);
            try { fbPush && fbPush('auditLog', { user: by, role: 'Admin', action: 'DELETE_BILLS', item: entries.length + ' records ' + rs(total) + ' · ' + (reason || ''), timestamp: at }); } catch (e) {}
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
  var V = { day: '', centre: '', list: [] };
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
      var ov = modal('bdr-ov', '🗂 Bills of a day — review & delete',
        '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:end;margin-bottom:10px">'
        + '<label style="font-size:11px;font-weight:800;color:#555">Date<br><input type="date" id="bdr-day" value="' + esc(V.day) + '" style="font-size:13px"></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555">Centre<br><select id="bdr-centre" style="font-size:13px"><option value="">Both</option><option value="RPR"' + (V.centre === 'RPR' ? ' selected' : '') + '>Ropar</option><option value="CHD"' + (V.centre === 'CHD' ? ' selected' : '') + '>Chandigarh</option></select></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555;flex:1;min-width:180px">Reason for deleting<br><input type="text" id="bdr-reason" value="Entered wrongly" style="font-size:13px;width:100%"></label>'
        + '<button type="button" class="btn btn-sm" id="bdr-del" style="background:#c62828;color:#fff">🗑 Delete selected (0)</button></div>'
        + '<div id="bdr-list"><div style="padding:18px;text-align:center;color:#777">Loading…</div></div>');
      ov.querySelector('#bdr-day').onchange = function () { V.day = this.value; load(); };
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
    box.innerHTML = '<div style="padding:18px;text-align:center;color:#777">Loading ' + esc(V.day) + '…</div>';
    b.ensureLoaded().then(function () { return b.loadDay(V.day, true).catch(function () {}); }).then(function () {
      V.list = b.buildEntries().filter(function (e) { return dayOf(e.at) === V.day; });
      draw();
    }).catch(function () { box.innerHTML = '<div style="padding:18px;text-align:center;color:#c62828">Could not load the bills — check the connection</div>'; });
  }
  function draw() {
    var box = document.getElementById('bdr-list'); if (!box) return;
    var b = BH(), list = V.list.filter(function (e) { return !V.centre || String(e.centre || '').toUpperCase() === V.centre; });
    var del = document.getElementById('bdr-del'); if (del) del.textContent = '🗑 Delete selected (0)';
    if (!list.length) { box.innerHTML = '<div style="padding:18px;text-align:center;color:#777">No bills or receipts on this date.</div>'; return; }
    var depts = {};
    list.forEach(function (e) { var d = (b && b.deptLabel(e.dept)) || 'Other'; d = d || 'Other'; var c = catOf(e); ((depts[d] = depts[d] || {})[c] = depts[d][c] || []).push(e); });
    var totalAll = list.reduce(function (s, e) { return s + cashOf(e); }, 0);
    box.innerHTML = '<div style="font-size:12px;color:#555;margin-bottom:8px"><b>' + list.length + '</b> bills / receipts · collected <b>' + rs(totalAll) + '</b>. Open a group, tick the wrong ones, then Delete selected.</div>'
      + Object.keys(depts).sort().map(function (d) {
        var cats = depts[d], n = 0, tot = 0;
        Object.keys(cats).forEach(function (c) { n += cats[c].length; cats[c].forEach(function (e) { tot += cashOf(e); }); });
        return '<div style="border:1px solid #e5e7eb;border-radius:10px;margin-bottom:10px;overflow:hidden"><div style="background:#f3f6fb;padding:8px 12px;font-weight:900;font-size:13px">' + esc(d) + ' <span style="font-weight:600;color:#555;font-size:12px">· ' + n + ' · ' + rs(tot) + '</span></div>'
          + CAT_ORDER.filter(function (c) { return cats[c]; }).map(function (c) {
            var rows = cats[c].slice().sort(function (x, y) { return String(x.at).localeCompare(String(y.at)); });
            var ct = rows.reduce(function (s, e) { return s + cashOf(e); }, 0);
            return '<details style="border-top:1px solid #eef0f4"><summary style="padding:8px 12px;cursor:pointer;font-size:12.5px;font-weight:800">' + esc(c) + ' <span style="font-weight:600;color:#555">· ' + rows.length + ' · ' + rs(ct) + '</span></summary>'
              + '<div style="padding:0 12px 8px"><label style="font-size:11px;font-weight:700;color:#555;display:inline-flex;gap:5px;align-items:center;margin:4px 0"><input type="checkbox" class="bdr-all"> Tick all in this group</label>'
              + '<table style="width:100%;font-size:12px;border-collapse:collapse"><tbody>' + rows.map(function (e) {
                return '<tr style="border-top:1px solid #f1f2f5"><td style="width:26px;padding:5px 2px"><input type="checkbox" class="bdr-ck" data-k="' + esc(e.key) + '"></td>'
                  + '<td style="width:52px;color:#666">' + esc(fmtT(e.at)) + '</td>'
                  + '<td><b>' + esc(e.name || '—') + '</b> <span style="color:#777;font-size:11px">' + esc(e.bmhId) + '</span><div style="color:#555;font-size:11px">' + esc(e.label) + '</div></td>'
                  + '<td style="width:120px;color:#666;font-size:11px">' + (e.kind === 'bill' ? 'Bill ' : 'Receipt ') + esc(e.no) + (e.centre ? '<br>' + esc(e.centre) : '') + '</td>'
                  + '<td style="width:80px;color:#666;font-size:11px">' + esc(e.mode || '') + '</td>'
                  + '<td style="width:110px;text-align:right;font-weight:800">' + rs(e.amount) + (e.kind === 'bill' && Number(e.paid) !== Number(e.amount) ? '<div style="font-weight:600;color:#777;font-size:10.5px">paid ' + rs(e.paid) + '</div>' : '') + '</td></tr>';
              }).join('') + '</tbody></table></div></details>';
          }).join('') + '</div>';
      }).join('');
  }

  // ── the hidden copies (6-digit PIN) ──
  window.bmhDeletedBills = function () {
    if (!isAdmin() || !finOk()) { toast('Enter the 6-digit PIN in Reports first', 'w'); return; }
    var ov = modal('bdr-bin', '🗑 Deleted bills (hidden copies)', '<div id="bdr-bin-list"><div style="padding:18px;text-align:center;color:#777">Loading…</div></div>');
    drawBin(ov);
  };
  function drawBin(ov) {
    var box = ov.querySelector('#bdr-bin-list');
    Promise.all([ref(REC).once('value'), ref('deletedTransactions').once('value')]).then(function (r) {
      var recs = r[0].val() || {}, oldT = r[1].val() || {};
      var oldN = 0; Object.keys(oldT).forEach(function (d) { oldN += Object.keys(oldT[d] || {}).length; });
      var list = Object.keys(recs).map(function (k) { return recs[k]; }).filter(Boolean).sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); });
      box.innerHTML = '<div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap"><div style="flex:1;font-size:12px;color:#555">' + list.length + ' deletion' + (list.length === 1 ? '' : 's') + (oldN ? ' · plus ' + oldN + ' payment rows from the earlier "Delete bill" button' : '') + '. Restore puts a record back everywhere; Erase removes the copy for good.</div>'
        + ((list.length || oldN) ? '<button type="button" class="btn btn-sm" id="bdr-empty" style="background:#7f1d1d;color:#fff">Empty all copies for good</button>' : '') + '</div>'
        + (list.length ? list.map(function (x) {
          return '<div style="border:1px solid #e5e7eb;border-radius:10px;padding:9px 12px;margin-bottom:8px"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><div style="flex:1;font-size:12px"><b>Deleted ' + esc(fmtDT(x.at)) + '</b> by ' + esc(x.by) + (x.reason ? ' · “' + esc(x.reason) + '”' : '') + ' · <b>' + rs(x.total) + '</b></div>'
            + '<button type="button" class="btn btn-xs btn-gold" data-restore="' + esc(x.id) + '">↩ Restore</button> <button type="button" class="btn btn-xs btn-outline" data-erase="' + esc(x.id) + '">Erase</button></div>'
            + '<div style="font-size:11.5px;color:#444;margin-top:4px">' + (x.items || []).map(function (i) { return '• ' + esc(i.name) + ' ' + esc(i.bmhId) + ' · ' + (i.kind === 'bill' ? 'Bill ' : 'Receipt ') + esc(i.no) + ' · ' + esc(i.label) + ' · ' + rs(i.amount) + (i.at ? ' · ' + esc(String(i.at).slice(0, 10)) : ''); }).join('<br>') + '</div></div>';
        }).join('') : '<div style="padding:18px;text-align:center;color:#777">No deleted bills.</div>');
      box.onclick = function (e) {
        var t = e.target; if (!t || !t.getAttribute) return;
        var rid = t.getAttribute('data-restore'), eid = t.getAttribute('data-erase');
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
    if (!window.confirm('Empty ALL hidden copies of deleted bills for good?\nThey cannot be restored afterwards.')) return Promise.resolve();
    if (!window.confirm('Are you sure? This erases every deleted-bill copy permanently.')) return Promise.resolve();
    return ref('savedBills').orderByChild('status').equalTo('void').once('value').then(function (s) { return s.val() || {}; }).catch(function () { return {}; }).then(function (voids) {
      var up = {}; up[REC] = null; up['deletedTransactions'] = null;
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
    var html = '<button type="button" class="btn btn-sm btn-outline" onclick="bmhBillDayReview()">🗂 Review / delete bills of a day</button>'
      + (finOk() ? '<button type="button" class="btn btn-sm btn-outline" onclick="bmhDeletedBills()">🗑 Deleted bills</button>' : '');
    if (bar.innerHTML !== html) bar.innerHTML = html;
  }
  setInterval(function () { try { buttons(); } catch (e) {} }, 3000);
  if (document.readyState !== 'loading') buttons(); else document.addEventListener('DOMContentLoaded', buttons);
})();
