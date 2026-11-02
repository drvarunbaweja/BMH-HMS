/* BMH — Bills & History (find, reprint, patient billing history)
 * Add-on for Billing → Bills & History. READS transactions/<day>, savedBills and the
 * patient lookup. The only WRITE: a copy of each newly saved bill to savedBills/<id>.
 * Off switch (this browser): localStorage.setItem('bmh_disable_bills_history_v2','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_disable_bills_history_v2') === '1') return; } catch (e) {}

  var S = { days: null, cache: new Map(), saved: {}, savedLoaded: false, loading: null, progress: '', lastQuery: '', patient: null, seq: 0 };
  var IDB_NAME = 'bmh-bills-history', IDB_STORE = 'days';

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function jsArg(s) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
  function money(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function today() { try { return todayKey(); } catch (e) { return new Date().toISOString().slice(0, 10); } }
  function dayOf(v) { try { return localDateKey(v); } catch (e) { return String(v || '').slice(0, 10); } }
  function fmtDate(v) { var d = new Date(v); return isNaN(d) ? String(v || '').slice(0, 10) : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  function fmtTime(v) { var d = new Date(v); return isNaN(d) ? '' : d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function dbUrl() { try { return window.firebase.app().options.databaseURL.replace(/\/$/, ''); } catch (e) { return 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app'; } }
  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function deptLabel(d) { var s = String(d || '').toLowerCase(); if (/oph|eye/.test(s)) return 'Eye'; if (/obg|gyn/.test(s)) return 'OBG'; if (/psych|neuro/.test(s)) return 'Psych'; if (/skin|derm/.test(s)) return 'Skin'; return d || ''; }

  // ── Browser cache of past days (IndexedDB) ───────────────────────────────
  function idb() {
    if (S._idb) return S._idb;
    S._idb = new Promise(function (resolve) {
      try {
        var r = indexedDB.open(IDB_NAME, 1);
        r.onupgradeneeded = function () { r.result.createObjectStore(IDB_STORE); };
        r.onsuccess = function () { resolve(r.result); };
        r.onerror = function () { resolve(null); };
      } catch (e) { resolve(null); }
    });
    return S._idb;
  }
  function idbGet(key) { return idb().then(function (db) { if (!db) return null; return new Promise(function (res) { try { var q = db.transaction(IDB_STORE).objectStore(IDB_STORE).get(key); q.onsuccess = function () { res(q.result || null); }; q.onerror = function () { res(null); }; } catch (e) { res(null); } }); }); }
  function idbPut(key, val) { return idb().then(function (db) { if (!db) return; try { db.transaction(IDB_STORE, 'readwrite').objectStore(IDB_STORE).put(val, key); } catch (e) {} }); }

  // ── Loading ──────────────────────────────────────────────────────────────
  function listDays() {
    return fetch(dbUrl() + '/transactions.json?shallow=true').then(function (r) { return r.json(); }).then(function (o) { return Object.keys(o || {}).filter(function (k) { return /^\d{4}-\d{2}-\d{2}$/.test(k); }).sort(); });
  }
  function fetchDay(day) {
    var toRows = function (v) { v = v || {}; return Object.keys(v).map(function (k) { return Object.assign({}, v[k], { id: (v[k] && v[k].id) || k, _day: day }); }); };
    return fetch(dbUrl() + '/transactions/' + encodeURIComponent(day) + '.json').then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }).then(toRows)
      .catch(function () { return window.FBDB.ref('transactions/' + day).once('value').then(function (snap) { return toRows(snap.val()); }); });
  }
  function loadDay(day, force) {
    var recent = day >= dayOf(Date.now() - 2 * 86400000);
    if (!force && S.cache.has(day) && !recent) return Promise.resolve(S.cache.get(day));
    var fromNet = function () { return fetchDay(day).then(function (rows) { S.cache.set(day, rows); if (!recent) idbPut(day, rows); return rows; }); };
    if (recent || force) return fromNet();
    return idbGet(day).then(function (rows) { if (rows) { S.cache.set(day, rows); return rows; } return fromNet(); });
  }
  function loadSaved() {
    if (!window.FBDB) return Promise.resolve();
    return window.FBDB.ref('savedBills').once('value').then(function (snap) { S.saved = snap.val() || {}; S.savedLoaded = true; }).catch(function () {});
  }
  // Loads everything once per session (past days from the browser cache); today is refreshed on every search.
  function ensureLoaded(onStep) {
    if (!window.FBDB) return Promise.reject(new Error('Not connected'));
    if (S.days && !S.loading) return Promise.all([loadDay(today(), true).catch(function () {}), loadSaved()]);
    if (S.loading) return S.loading;
    S.loading = listDays().then(function (days) {
      if (days.indexOf(today()) === -1) days.push(today());
      var order = days.slice().reverse(); var i = 0, done = 0;
      var worker = function () {
        if (i >= order.length) return Promise.resolve();
        var d = order[i++];
        return loadDay(d).catch(function () { S.cache.set(d, S.cache.get(d) || []); }).then(function () { done++; S.progress = done + ' / ' + order.length + ' days'; if (onStep && done % 15 === 0) onStep(); return worker(); });
      };
      return Promise.all([loadSaved()].concat([0, 1, 2, 3, 4, 5].map(worker))).then(function () { S.days = days; S.progress = ''; });
    }).finally(function () { S.loading = null; });
    return S.loading;
  }

  // ── Building bills & receipts from the records ───────────────────────────
  function allTxns() { var out = []; S.cache.forEach(function (rows) { rows.forEach(function (r) { if (r) out.push(r); }); }); return out; }
  function localSaved() {
    var m = {};
    (window.BMH_SAVED_BILLS || []).concat(window.BILLS || []).forEach(function (b) { if (b && b.id) m[b.id] = b; });
    Object.keys(S.saved || {}).forEach(function (k) { var b = S.saved[k]; if (b && b.id) m[b.id] = b; });
    return m;
  }
  function buildEntries() {
    var saved = localSaved(); var byBill = {}; var out = [];
    allTxns().forEach(function (t) {
      if (t.billId || t.billNo) {
        var key = String(t.billId || t.billNo);
        (byBill[key] = byBill[key] || []).push(t);
      } else {
        out.push({ kind: 'receipt', key: 'T:' + t.id, at: t.createdAt || t.date || t._day, bmhId: t.bmhId || '', name: t.patient || t.patientName || '', centre: t.centre || '', dept: t.dept || '', amount: Number(t.amount || 0), mode: t.mode || '', label: t.service || (t.type === 'advance' ? 'Advance deposit' : 'Payment'), no: t.id, txns: [t], type: t.type || '' });
      }
    });
    Object.keys(byBill).forEach(function (key) {
      var ts = byBill[key].sort(function (a, b) { return String(a.date || '').localeCompare(String(b.date || '')); });
      var t0 = ts[0]; var full = saved[key] || null;
      var paid = ts.reduce(function (s, t) { return s + Number(t.amount || 0); }, 0);
      out.push({ kind: 'bill', key: 'B:' + key, at: (full && full.createdAt) || t0.createdAt || t0.date, bmhId: t0.bmhId || (full && full.bmhId) || '', name: t0.patient || (full && full.patientName) || '', centre: t0.centre || '', dept: t0.dept || '', amount: full ? Number(full.netPayable || paid) : paid, paid: paid, mode: ts.map(function (t) { return t.mode; }).filter(Boolean).filter(function (v, i, a) { return a.indexOf(v) === i; }).join(' + '), label: billLabel(ts, full), no: t0.billNo || (full && full.billNo) || key, billId: key, txns: ts, full: full });
      delete saved[key];
    });
    // Saved bills with no payment record (e.g. fully TPA / unpaid)
    Object.keys(saved).forEach(function (key) {
      var b = saved[key]; if (!b || b.status === 'void') return;
      out.push({ kind: 'bill', key: 'B:' + key, at: b.createdAt || b.date, bmhId: b.bmhId || '', name: b.patientName || '', centre: b.centre || '', dept: b.dept || '', amount: Number(b.netPayable || 0), paid: Number(b.amountReceived || 0), mode: b.paymentMode || '', label: billLabel([], b), no: b.billNo || key, billId: key, txns: [], full: b });
    });
    return out.sort(function (a, b) { return String(b.at || '').localeCompare(String(a.at || '')); });
  }
  function billLabel(ts, full) {
    var items = full && full.items ? (Array.isArray(full.items) ? full.items : Object.values(full.items)) : [];
    var names = items.length ? items.map(function (i) { return i.desc || i.name; }) : [];
    if (!names.length) ts.forEach(function (t) { (t.chargeAllocations || []).forEach(function (c) { if (c && c.desc && names.indexOf(c.desc) === -1) names.push(c.desc); }); });
    if (!names.length) ts.forEach(function (t) { if (t.service && names.indexOf(t.service) === -1) names.push(t.service); });
    return names.filter(Boolean).join(', ') || 'Bill';
  }
  function billObject(e) {
    if (e.full) return e.full;
    var items = []; var seen = {};
    e.txns.forEach(function (t) { (t.chargeAllocations || []).forEach(function (c) { if (!c) return; var k = c.lineId || c.desc; if (seen[k]) { seen[k].amount += Number(c.amount || 0); seen[k].rate = seen[k].amount; return; } var it = { desc: c.desc || 'Charge', qty: 1, rate: Number(c.amount || 0), amount: Number(c.amount || 0) }; seen[k] = it; items.push(it); }); });
    if (!items.length) e.txns.forEach(function (t) { items.push({ desc: t.service || 'Charge', qty: 1, rate: Number(t.amount || 0), amount: Number(t.amount || 0) }); });
    var sub = items.reduce(function (s, i) { return s + i.amount; }, 0);
    var t0 = e.txns[0] || {}; var p = patientInfo(e.bmhId);
    var tpa = e.txns.filter(function (t) { return t.ins; })[0];
    return { id: e.billId, billNo: e.no, bmhId: e.bmhId, patientName: e.name, age: p.age || '', sex: p.sex || '', dept: e.dept, doctor: p.doctor || '', mobile: p.mob || '', centre: e.centre, date: dayOf(e.at), createdAt: t0.createdAt || t0.date || e.at, items: items, subtotal: sub, discount: 0, advanceApplied: 0, netPayable: sub, amountReceived: e.paid, patientPays: e.paid, paymentMode: e.mode || 'Cash', paymentRef: e.txns.map(function (t) { return t.paymentRef; }).filter(Boolean).join(', '), isTPA: !!tpa, tpaCompany: tpa ? tpa.ins : '', tpaPolicy: tpa ? (tpa.policy || '') : '', tpaAmount: 0, _rebuilt: true };
  }
  function patientInfo(id) {
    var p = null;
    try { p = (window.PATIENTS || []).find(function (x) { return x.bmhId === id; }) || (window._BMH_ALL_PATIENTS_CACHE || []).find(function (x) { return x.bmhId === id; }); } catch (e) {}
    return p || {};
  }

  // ── Search ───────────────────────────────────────────────────────────────
  function idsForQuery(q) {
    var ids = new Set(); var dg = digits(q);
    var add = function (rows) { (rows || []).forEach(function (p) { if (p && p.bmhId) ids.add(String(p.bmhId)); }); };
    try { if (dg.length >= 7 && typeof findReceptionPatientsByPhone === 'function') add(findReceptionPatientsByPhone(q)); } catch (e) {}
    if (dg.length >= 7 && typeof fetchReceptionPatientsFromFirebase === 'function') {
      return fetchReceptionPatientsFromFirebase(q).then(function (rows) { add(rows); return ids; }).catch(function () { return ids; });
    }
    return Promise.resolve(ids);
  }
  function matches(e, sq, ids) {
    if (ids.has(String(e.bmhId))) return true;
    var bmh = String(e.bmhId || '').toLowerCase();
    if (/^(bmsh)?[-\s]*\d{3,9}$/.test(sq)) { var n = digits(sq); if (bmh === 'bmsh-' + n) return true; }
    return bmh.indexOf(sq) !== -1 || String(e.name || '').toLowerCase().indexOf(sq) !== -1 || String(e.no || '').toLowerCase().indexOf(sq) !== -1;
  }

  function resultEl() { return document.getElementById('bmh-bill-history-results'); }
  function setMsg(html) { var el = resultEl(); if (el) el.innerHTML = '<div style="text-align:center;color:var(--g1);padding:24px;font-size:13px">' + html + '</div>'; }

  function search(q, forceList) {
    var el = resultEl(); if (!el) return;
    var my = ++S.seq;
    var sq = String(q || '').trim().toLowerCase();
    var date = (document.getElementById('bmh-bill-history-date') || {}).value || '';
    S.lastQuery = sq; S.patient = null;
    if (!S.days) setMsg('Loading billing records… ' + esc(S.progress));
    ensureLoaded(function () { if (my === S.seq && !S.days) setMsg('Loading billing records… ' + esc(S.progress)); }).then(function () {
      return sq.length >= 2 ? idsForQuery(sq) : new Set();
    }).then(function (ids) {
      if (my !== S.seq) return;
      var list = buildEntries();
      if (sq.length >= 2) list = list.filter(function (e) { return matches(e, sq, ids); });
      else list = list.filter(function (e) { return dayOf(e.at) === (date || today()); });
      render(list, sq, date, forceList);
    }).catch(function (e) { if (my === S.seq) setMsg('Could not load billing records — ' + esc(e && e.message || 'please check the connection') + '. <button class="btn btn-outline btn-sm" onclick="bmhSearchBillHistory(document.getElementById(\'bmh-bill-history-search\').value)">Retry</button>'); });
  }

  function row(e) {
    var k = jsArg(e.key);
    var tag = e.kind === 'bill' ? '<span style="font-size:9px;background:#e8f0fd;color:#153A73;padding:1px 6px;border-radius:4px;font-weight:800">BILL</span>' : (e.type === 'advance' ? '<span style="font-size:9px;background:#fff4dc;color:#8a5a00;padding:1px 6px;border-radius:4px;font-weight:800">ADVANCE</span>' : '<span style="font-size:9px;background:#eef6ee;color:#2d6a2d;padding:1px 6px;border-radius:4px;font-weight:800">RECEIPT</span>');
    var due = e.kind === 'bill' && e.amount > e.paid ? '<div style="font-size:9.5px;color:#b00;font-weight:700">Due ' + money(e.amount - e.paid) + '</div>' : '';
    return '<div style="display:grid;grid-template-columns:minmax(0,1.5fr) 110px 110px auto;gap:8px;align-items:center;padding:9px 12px;border-bottom:1px solid var(--g5);font-size:12px">'
      + '<div style="min-width:0"><div style="font-weight:800">' + esc(e.name || '—') + ' ' + tag + '</div>'
      + '<div style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal)"><a href="javascript:void 0" onclick="bmhBillHistoryPatient(\'' + jsArg(e.bmhId) + '\')" title="Full billing history">' + esc(e.bmhId) + '</a> · ' + esc(e.no) + '</div>'
      + '<div style="font-size:10.5px;color:var(--g1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(e.label) + (e.dept ? ' · ' + esc(deptLabel(e.dept)) : '') + (e.centre ? ' · ' + esc(e.centre) : '') + '</div></div>'
      + '<div style="font-size:10.5px;color:var(--g1)">' + esc(fmtDate(e.at)) + '<div>' + esc(fmtTime(e.at)) + '</div></div>'
      + '<div style="font-weight:900;color:var(--bmh-blue)">' + money(e.kind === 'bill' ? e.amount : e.amount) + '<div style="font-size:9.5px;font-weight:400;color:var(--g1)">' + esc(e.mode) + '</div>' + due + '</div>'
      + '<div style="display:flex;gap:5px;justify-content:flex-end;flex-wrap:wrap">'
      + (e.kind === 'bill' ? '<button type="button" class="btn btn-blue btn-sm" onclick="bmhBillHistoryReprint(\'' + k + '\',\'bill\')">🖨 Bill</button>' : '')
      + ((e.kind === 'bill' ? e.paid : e.amount) > 0 ? '<button type="button" class="btn btn-outline btn-sm" onclick="bmhBillHistoryReprint(\'' + k + '\',\'receipt\')">🧾 Receipt</button>' : '')
      + '<button type="button" class="btn btn-outline btn-sm" onclick="bmhBillHistoryPatient(\'' + jsArg(e.bmhId) + '\')">History</button>'
      + '</div></div>';
  }
  function render(list, sq, date, forceList) {
    var el = resultEl(); if (!el) return;
    S.view = list;
    if (!list.length) { setMsg(sq ? 'No bills or receipts found for “' + esc(sq) + '”. Try the BMSH ID, mobile number or part of the name.' : 'No bills or receipts on ' + esc(fmtDate(date || today())) + '.'); return; }
    var pids = list.map(function (e) { return e.bmhId; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; });
    if (sq && pids.length === 1 && !forceList) { patientView(pids[0]); return; }
    var total = list.reduce(function (s, e) { return s + (e.kind === 'bill' ? e.paid : e.amount); }, 0);
    var shown = list.slice(0, 300);
    el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 12px;background:var(--g6);border-radius:8px;margin-bottom:6px;font-size:12px;flex-wrap:wrap">'
      + '<div><strong>' + list.length + '</strong> record' + (list.length > 1 ? 's' : '') + (sq ? ' for “' + esc(sq) + '” · ' + pids.length + ' patient' + (pids.length > 1 ? 's' : '') : ' on ' + esc(fmtDate(date || today()))) + ' · collected <strong>' + money(total) + '</strong></div>'
      + (sq ? '<div style="font-size:11px;color:var(--g1)">Click <b>History</b> for a patient\'s full billing history</div>' : '') + '</div>'
      + shown.map(row).join('')
      + (list.length > shown.length ? '<div style="padding:10px;text-align:center;font-size:11px;color:var(--g1)">Showing the latest 300 — narrow the search to see more.</div>' : '');
  }

  // ── One patient's full billing history ───────────────────────────────────
  function patientView(bmhId) {
    var el = resultEl(); if (!el) return;
    var list = buildEntries().filter(function (e) { return String(e.bmhId) === String(bmhId); });
    S.patient = bmhId; S.view = list;
    var p = patientInfo(bmhId); var name = (list[0] && list[0].name) || p.name || '';
    var paid = list.reduce(function (s, e) { return s + (e.kind === 'bill' ? e.paid : e.amount); }, 0);
    var billed = list.filter(function (e) { return e.kind === 'bill'; }).reduce(function (s, e) { return s + e.amount; }, 0);
    var due = list.filter(function (e) { return e.kind === 'bill'; }).reduce(function (s, e) { return s + Math.max(0, e.amount - e.paid); }, 0);
    var first = list.length ? list[list.length - 1].at : '';
    el.innerHTML = '<div style="padding:12px;background:var(--blue-lt,#eef4fd);border-radius:10px;margin-bottom:8px">'
      + '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:flex-start"><div><div style="font-size:16px;font-weight:900">' + esc(name || bmhId) + '</div>'
      + '<div style="font-family:var(--mono);font-size:11px;color:var(--bmh-teal)">' + esc(bmhId) + (p.mob ? ' · ' + esc(p.mob) : '') + '</div>'
      + '<div style="font-size:11px;color:var(--g1);margin-top:2px">' + list.length + ' record' + (list.length === 1 ? '' : 's') + (first ? ' since ' + esc(fmtDate(first)) : '') + '</div></div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap"><button type="button" class="btn btn-gold btn-sm" onclick="bmhBillHistoryPrintPatient(\'' + jsArg(bmhId) + '\')">🖨 Print history</button>'
      + (S.lastQuery ? '<button type="button" class="btn btn-outline btn-sm" onclick="bmhSearchBillHistory(document.getElementById(\'bmh-bill-history-search\').value,\'list\')">← All results</button>' : '') + '</div></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:7px;margin-top:10px">'
      + [['Total paid', paid], ['Bills raised', billed], ['Outstanding on bills', due]].map(function (r) { return '<div style="background:#fff;padding:8px 10px;border-radius:8px"><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">' + r[0] + '</div><div style="font-size:14px;font-weight:900">' + money(r[1]) + '</div></div>'; }).join('')
      + '</div></div>'
      + (list.length ? list.map(row).join('') : '<div style="text-align:center;color:var(--g1);padding:20px;font-size:13px">No bills or receipts found for this patient.</div>');
  }

  function findEntry(key) { return (S.view || []).find(function (e) { return e.key === key; }) || buildEntries().find(function (e) { return e.key === key; }); }
  function reprint(key, what) {
    var e = findEntry(key); if (!e) { toast('Record not found', 'w'); return; }
    if (e.kind === 'bill') {
      var b = billObject(e);
      if (what === 'receipt') { try { bmhPrintReceiptFromBill(Object.assign({}, b, { amountReceived: e.paid, patientPays: e.paid })); } catch (x) { toast('Could not print receipt', 'w'); } return; }
      try { bmhPrintSavedBill(b); } catch (x) { toast('Could not print bill', 'w'); }
      return;
    }
    try { printPaymentReceipt(Object.assign({}, e.txns[0])); } catch (x) { toast('Could not print receipt', 'w'); }
  }

  function printPatient(bmhId) {
    var list = buildEntries().filter(function (e) { return String(e.bmhId) === String(bmhId); });
    if (!list.length) { toast('Nothing to print', 'w'); return; }
    var p = patientInfo(bmhId); var name = list[0].name || p.name || '';
    var rows = list.slice().reverse(); var paid = 0;
    var body = rows.map(function (e, i) { var amt = e.kind === 'bill' ? e.paid : e.amount; paid += amt; return '<tr><td>' + (i + 1) + '</td><td>' + esc(fmtDate(e.at)) + '</td><td>' + esc(e.no) + '</td><td>' + esc(e.label) + (e.kind === 'bill' && e.amount !== e.paid ? '<br><small>Bill ' + money(e.amount) + '</small>' : '') + '</td><td>' + esc(deptLabel(e.dept)) + ' ' + esc(e.centre) + '</td><td>' + esc(e.mode) + '</td><td class="r">' + money(amt) + '</td></tr>'; }).join('');
    var hosp = 'Baweja Multispeciality Hospital';
    try { if (typeof getHospitalDetailValue === 'function') hosp = getHospitalDetailValue('Hospital Name', hosp); } catch (x) {}
    var w = window.open('', '_blank', 'width=900,height=760'); if (!w) { toast('Allow pop-ups to print', 'w'); return; }
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Billing history — ' + esc(name) + '</title><style>@page{size:A4;margin:12mm}body{font-family:Arial,sans-serif;color:#111;font-size:11.5px}h1{font-size:17px;margin:0;color:#1A3C6E}.hd{border-bottom:2px solid #1A3C6E;padding-bottom:6px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:flex-end}table{width:100%;border-collapse:collapse}th,td{border:1px solid #bbb;padding:5px 6px;text-align:left;vertical-align:top}th{background:#eef2f8;font-size:10.5px}.r{text-align:right}tfoot td{font-weight:800}small{color:#555}</style></head><body>'
      + '<div class="hd"><div><h1>' + esc(hosp) + '</h1><div>Patient billing history</div></div><div style="text-align:right">Printed ' + esc(fmtDate(Date.now())) + '</div></div>'
      + '<p><b>' + esc(name) + '</b> · ' + esc(bmhId) + (p.mob ? ' · ' + esc(p.mob) : '') + '</p>'
      + '<table><thead><tr><th>#</th><th>Date</th><th>Bill / receipt no.</th><th>Details</th><th>Dept</th><th>Mode</th><th class="r">Paid</th></tr></thead><tbody>' + body + '</tbody><tfoot><tr><td colspan="6" class="r">Total paid</td><td class="r">' + money(paid) + '</td></tr></tfoot></table>'
      + '</body></html>');
    w.document.close(); setTimeout(function () { try { w.focus(); w.print(); } catch (x) {} }, 400);
  }

  // ── Multi-patient charge view (Bills & History tab) ──────────────────────
  function renderMulti() {
    var box = document.getElementById('bmh-bill-pt-list-hist'); if (!box) return;
    if (window._bmhBillingTab !== 'search') return;
    var hd = box.parentNode && box.parentNode.querySelector('.card-sub'); if (hd) hd.textContent = 'Patients with bills / receipts — click a patient for full billing history';
    var sc = document.getElementById('bmh-bill-patient-scope');
    if (sc && !S.scopeSet) { S.scopeSet = true; if (sc.value === 'focus' && !window._bmhBillFocusPatient) sc.value = 'date'; var df = document.getElementById('bmh-bill-date-filter'); if (df && !df.value) df.value = today(); }
    var scope = (sc || {}).value || 'date';
    var q = String((document.getElementById('bmh-bill-patient-search') || {}).value || '').trim().toLowerCase();
    var one = (document.getElementById('bmh-bill-date-filter') || {}).value || today();
    var from = (document.getElementById('bmh-bill-date-from') || {}).value || '';
    var to = (document.getElementById('bmh-bill-date-to') || {}).value || '';
    if (!S.days) { box.innerHTML = '<div style="padding:12px;color:var(--g1);font-size:12px">Loading billing records…</div>'; ensureLoaded().then(renderMulti).catch(function () { box.innerHTML = '<div style="padding:12px;color:var(--g1);font-size:12px">Could not load billing records.</div>'; }); return; }
    var list = buildEntries();
    if (scope === 'date') list = list.filter(function (e) { return dayOf(e.at) === one; });
    else if (scope === 'range') list = list.filter(function (e) { var d = dayOf(e.at); return (!from || d >= from) && (!to || d <= to); });
    else if (scope === 'admitted') { var adm = new Set((window.IPD_PATIENTS || []).filter(function (p) { return (p.status || 'admitted') !== 'discharged'; }).map(function (p) { return String(p.bmhId); })); list = list.filter(function (e) { return adm.has(String(e.bmhId)); }); }
    else if (scope === 'focus') { var f = window._bmhBillFocusPatient || window._bmhSelectedBillPatient; list = f ? list.filter(function (e) { return e.bmhId === f; }) : []; }
    var by = {};
    list.forEach(function (e) { var k = e.bmhId || e.name; var r = by[k] = by[k] || { bmhId: e.bmhId, name: e.name, n: 0, paid: 0, due: 0, last: '' }; r.n++; r.paid += e.kind === 'bill' ? e.paid : e.amount; if (e.kind === 'bill') r.due += Math.max(0, e.amount - e.paid); if (String(e.at) > r.last) r.last = String(e.at); });
    var rows = Object.keys(by).map(function (k) { return by[k]; });
    if (q) { var dq = digits(q); var phoneIds = new Set(); try { if (dq.length >= 7) (findReceptionPatientsByPhone(q) || []).forEach(function (p) { phoneIds.add(p.bmhId); }); } catch (x) {} rows = rows.filter(function (r) { return phoneIds.has(r.bmhId) || String(r.name || '').toLowerCase().indexOf(q) !== -1 || String(r.bmhId || '').toLowerCase().indexOf(q) !== -1; }); }
    rows.sort(function (a, b) { return b.last.localeCompare(a.last); });
    if (!rows.length) { box.innerHTML = '<div style="padding:12px;color:var(--g1);font-size:12px">No patients with bills or receipts for this selection.</div>'; return; }
    var tot = rows.reduce(function (s, r) { return s + r.paid; }, 0);
    box.innerHTML = '<div style="padding:7px 10px;font-size:11.5px;background:var(--g6);border-bottom:1px solid var(--g5)"><b>' + rows.length + '</b> patients · collected <b>' + money(tot) + '</b></div>'
      + rows.slice(0, 500).map(function (r) { return '<div onclick="bmhBillHistoryPatient(\'' + jsArg(r.bmhId) + '\')" style="display:grid;grid-template-columns:minmax(0,1fr) 70px 100px 90px;gap:8px;padding:7px 10px;border-bottom:1px solid var(--g5);font-size:12px;cursor:pointer"><div><b>' + esc(r.name || '—') + '</b> <span style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal)">' + esc(r.bmhId) + '</span></div><div style="color:var(--g1);font-size:11px">' + r.n + ' record' + (r.n > 1 ? 's' : '') + '</div><div style="font-weight:800;text-align:right">' + money(r.paid) + '</div><div style="text-align:right;font-size:11px;color:' + (r.due > 0 ? '#b00' : 'var(--g1)') + '">' + (r.due > 0 ? 'Due ' + money(r.due) : esc(fmtDate(r.last))) + '</div></div>'; }).join('');
  }

  // ── Keep a safe copy of every newly saved bill (its own record) ───────────
  function keepCopy(bill) {
    try {
      if (!bill || !bill.id || !window.FBDB) return;
      var key = String(bill.id).replace(/[.#$\[\]\/]/g, '_');
      var clean = JSON.parse(JSON.stringify(Object.assign({}, bill, { keptAt: new Date().toISOString() })));
      S.saved[key] = clean;
      window.FBDB.ref('savedBills/' + key).set(clean).catch(function (e) { console.warn('savedBills copy failed', e); });
    } catch (e) { console.warn('savedBills copy failed', e); }
  }

  // ── Wire into the page ───────────────────────────────────────────────────
  function install() {
    if (typeof window.bmhSearchBillHistory !== 'function' || typeof window.bmhRecordBillingCollection !== 'function' || !document.getElementById('bmh-bill-history-results')) return false;
    window.bmhSearchBillHistory = function (q, mode) { return search(q, mode === 'list'); };
    window.bmhBillHistoryPatient = function (id) { if (!id) return; ensureLoaded().then(function () { patientView(id); var el = resultEl(); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); };
    window.bmhBillHistoryReprint = reprint;
    window.bmhBillHistoryPrintPatient = printPatient;
    var origRec = window.bmhRecordBillingCollection;
    window.bmhRecordBillingCollection = function (savedBill) { var r = origRec.apply(this, arguments); keepCopy(savedBill); return r; };
    var origList = window.bmhRenderBillPatientList;
    if (typeof origList === 'function') window.bmhRenderBillPatientList = function () { var r = origList.apply(this, arguments); try { renderMulti(); } catch (e) {} return r; };
    var inp = document.getElementById('bmh-bill-history-search');
    if (inp) { inp.placeholder = 'BMSH ID, name, mobile number or bill no.…'; var lab = inp.parentNode && inp.parentNode.querySelector('label'); if (lab) lab.textContent = 'BMSH ID, patient name, mobile or bill number'; }
    var sub = document.querySelector('#bmh-bill-tab-history .card-sub'); if (sub) sub.textContent = 'All bills & receipts since March 2026 — reprint, or open a patient\'s full billing history';
    return true;
  }

  var tries = 0;
  (function wait() { if (install()) return; if (++tries < 200) setTimeout(wait, 100); })();
  window.bmhBillsHistory = { state: S, buildEntries: buildEntries, ensureLoaded: ensureLoaded };
})();
