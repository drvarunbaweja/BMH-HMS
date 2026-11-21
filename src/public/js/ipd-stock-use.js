/* BMH — IPD: record stock used for an admitted patient (injections, drips, cannulas, consumables …), any day of the stay.
 * "🧴 Stock used" on the IPD patient screen and a "Stock used" card on the monitoring sheet:
 *  • pick the date (any day from admission to today) and time, search the stock and add items with quantity
 *    (the patient's department stores and shared stores first; other departments after the staff PIN, with the warning);
 *  • Save → the staff member picks her name and enters her PIN → each item is deducted from its store, saved in the
 *    inventory history for that date and patient (Inventory → Patient Usage / Track usage), and a line is added to the
 *    nursing side of the progress notes at that date and time (it prints in the IPD file). An entry for an earlier day
 *    says when it was actually entered.
 *  • The same window lists everything used so far for this admission, day by day, with "Print".
 * Not billed — stock is recorded as consumed (billing is unchanged).
 * Off switch (this browser): localStorage.setItem('bmh_ipd_stock_use_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_ipd_stock_use_off') === '1') return; } catch (e) {}
  var LABEL = { ophtho: 'Eye', obg: 'OBG', psych: 'Psychiatry', skin: 'Skin' };
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function pts() { try { return window.IPD_PATIENTS || IPD_PATIENTS || []; } catch (e) { return window.IPD_PATIENTS || []; } }
  function findPt(id) { return pts().find(function (x) { return x && x.id === id; }) || null; }
  function dayKey(v) { try { return localDateKey(v); } catch (e) { var d = new Date(v); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } }
  function hhmm(iso) { var d = new Date(iso); return isNaN(d) ? '' : String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  function fmtDay(k) { var m = String(k || '').match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3] + '/' + m[2] + '/' + m[1] : k; }
  function inv() { try { return INVENTORY || window.INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function dkey(v) {
    var k = String(v || '').toLowerCase().trim();
    if (/^(eye|ophth|optom)/.test(k)) return 'ophtho';
    if (/^(obg|obs|gyn|labou?r)/.test(k)) return 'obg';
    if (/^(psych|neuro)/.test(k)) return 'psych';
    if (/^(skin|derm|cosm)/.test(k)) return 'skin';
    return '';
  }
  function storeDept(s) { try { if (window.bmhInvScope) return bmhInvScope.storeDept(s) || ''; } catch (e) {} return ''; }
  function storeCentre(s) { try { if (window.bmhInvScope) return bmhInvScope.storeCentre(s); } catch (e) {} var x = String(s || ''); return /\bCHD\b/i.test(x) ? 'CHD' : /\bRPR\b/i.test(x) ? 'RPR' : (x ? 'RPR' : ''); }
  function centreOf(p) {
    var c = String((p && p.centre) || '').toUpperCase();
    if (!c) { try { c = String(getEffectiveCentre() || '').toUpperCase(); } catch (e) { c = ''; } }
    return /CHD|CHANDIGARH/.test(c) ? 'CHD' : /RPR|ROPAR|RUPNAGAR/.test(c) ? 'RPR' : '';
  }
  function admitDay(p) { var a = p && (p.admittedAt || p.admittedDate || p.admitDate); var k = a ? dayKey(a) : ''; return /^\d{4}-\d{2}-\d{2}$/.test(k) ? k : dayKey(new Date()); }
  function save(p, patch) { try { return bmhUpdateActiveIpdAdmission(p.id, patch); } catch (e) { return Promise.reject(e); } }
  function hay(it) { try { return bmhInventoryItemSearchHaystack(it); } catch (e) { return [it.name, it.genericName, it.company, it.store, it.barcode, it.batchNo].join(' ').toLowerCase(); } }

  // the usage entry gets the chosen date/time and the staff name before it is saved
  var override = null;
  function hookUsage() {
    var o = window.saveUsageToFirebase; if (typeof o !== 'function' || o._isu) return typeof o === 'function';
    var w = function (row) { if (row && override) { Object.assign(row, override); } return o.apply(this, arguments); };
    w._isu = true; window.saveUsageToFirebase = w; return true;
  }
  function ensureFinancials() {
    if (!window.FBDB) return Promise.resolve(true);
    return window.FBDB.ref('financials').once('value').then(function (snap) {
      var remote = snap.val(), localTs = Number(localStorage.getItem('bmh_financials_updated_at') || 0);
      if (remote && Number(remote.updatedAt || 0) >= localTs) {
        window._bmhFinancialsHydrating = true;
        try { applyBmhFinancialsSnapshot(remote, { persistLocal: true }); } finally { window._bmhFinancialsHydrating = false; }
      }
      return true;
    }).catch(function () { return false; });
  }
  function freshStock(it) {
    if (!window.FBDB || !it || !it.barcode) return Promise.resolve();
    var k = String(it.barcode).replace(/[.#$/\[\]]/g, '_');
    return window.FBDB.ref('inventory/' + k).once('value').then(function (s) { var v = s.val(); if (v && v.stock != null) it.stock = Number(v.stock) || 0; }).catch(function () {});
  }

  var st = null; // { p, items:[{item, qty}], unlocked:'' }
  function matches(q) {
    var p = st.p, c = centreOf(p), d = dkey(p.dept), toks = String(q || '').toLowerCase().split(/\s+/).filter(Boolean);
    var all = inv().filter(function (it) {
      if (!it || !(Number(it.stock) > 0) || it._deleted) return false;
      var sc = storeCentre(it.store); if (c && sc && sc !== c) return false;
      if (!toks.length) return false;
      var h = hay(it); return toks.every(function (t) { return h.indexOf(t) >= 0; });
    });
    var own = function (it) { var sd = storeDept(it.store); return !d || !sd || sd === d; };
    var shown = st.unlocked ? all : all.filter(own);
    shown.sort(function (a, b) { var x = own(a) ? 0 : 1, y = own(b) ? 0 : 1; if (x !== y) return x - y; return String(a.exp || '9999').localeCompare(String(b.exp || '9999')); });
    return { rows: shown.slice(0, 25), hidden: all.length - shown.length };
  }
  function historyHtml(p) {
    var list = (p.ipdStockUse || []).slice().sort(function (a, b) { return String(b.at).localeCompare(String(a.at)); });
    if (!list.length) return '<div style="font-size:12px;color:#888;padding:6px 0">Nothing recorded yet for this admission.</div>';
    var days = {}; list.forEach(function (e) { var k = dayKey(e.at); (days[k] = days[k] || []).push(e); });
    return Object.keys(days).sort().reverse().map(function (k) {
      return '<div style="margin-bottom:6px"><div style="font-size:11px;font-weight:900;color:#1a3c6e;background:#eef4ff;padding:4px 8px;border-radius:6px">' + fmtDay(k) + '</div>'
        + days[k].map(function (e) {
          return '<div style="font-size:12px;padding:4px 8px;border-bottom:1px solid #f0f0f0"><b>' + esc(hhmm(e.at)) + '</b> · ' + e.items.map(function (i) { return esc(i.name) + ' ×' + esc(i.qty); }).join(', ')
            + ' <span style="color:#777;font-size:11px">— ' + esc(e.by || '') + (dayKey(e.recordedAt) !== k ? ' (entered ' + esc(fmtDay(dayKey(e.recordedAt)).slice(0, 5) + ' ' + hhmm(e.recordedAt)) + ')' : '') + '</span></div>';
        }).join('') + '</div>';
    }).join('');
  }
  function draftHtml() {
    if (!st.items.length) return '<div style="font-size:12px;color:#888;padding:6px 2px">No items added yet — search above and tap an item.</div>';
    return st.items.map(function (r, i) {
      return '<div style="display:flex;gap:8px;align-items:center;padding:6px 8px;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:5px"><div style="flex:1;min-width:0"><div style="font-size:12.5px;font-weight:800">' + esc(r.item.name) + '</div><div style="font-size:10.5px;color:#666">' + esc([r.item.store, r.item.exp ? 'Exp ' + r.item.exp : '', r.item.batchNo ? 'Batch ' + r.item.batchNo : '', r.item.stock + ' in stock'].filter(Boolean).join(' · ')) + '</div></div>'
        + 'Qty <input type="number" min="1" value="' + r.qty + '" data-q="' + i + '" style="width:60px;padding:4px 6px;border:1px solid #ccc;border-radius:6px"><button type="button" data-rm="' + i + '" class="btn btn-xs btn-gray">✕</button></div>';
    }).join('');
  }
  function draw() {
    var ov = document.getElementById('isu-ov'); if (!ov) return;
    var q = ov.querySelector('#isu-q').value, m = matches(q), d = dkey(st.p.dept);
    ov.querySelector('#isu-res').innerHTML = !String(q).trim() ? '<div style="padding:8px;font-size:12px;color:#888">Type at least a few letters of the item (e.g. cannula, RL, inj).</div>'
      : (m.rows.length ? m.rows.map(function (it, i) { return '<div data-pick="' + i + '" style="padding:7px 10px;border-bottom:1px solid #f0f0f0;cursor:pointer;display:flex;gap:8px"><div style="flex:1;min-width:0"><div style="font-size:12.5px;font-weight:800">' + esc(it.name) + '</div><div style="font-size:10.5px;color:#666">' + esc([it.store, it.exp ? 'Exp ' + it.exp : '', it.batchNo ? 'Batch ' + it.batchNo : ''].filter(Boolean).join(' · ')) + '</div></div><div style="font-size:11px;font-weight:900;color:' + (Number(it.stock) <= 2 ? '#c0392b' : '#27ae60') + '">' + esc(it.stock) + ' left</div></div>'; }).join('') : '<div style="padding:8px;font-size:12px;color:#888">No matching stock' + (d && !st.unlocked ? ' in ' + esc(LABEL[d] || d) + ' / shared stores' : '') + '.</div>')
      + (m.hidden ? '<div style="padding:7px 10px;font-size:11px;color:#8a4200;background:#fff8e1">' + m.hidden + ' more in other departments\' stores. <a href="#" id="isu-unlock" style="font-weight:900;color:#1a3c6e">🔓 Show them</a> (staff PIN)</div>' : '');
    ov.querySelector('#isu-draft').innerHTML = draftHtml();
    ov._rows = m.rows;
  }
  window.bmhIpdStockUseOpen = function (id) {
    var p = findPt(id); if (!p) { toast('IPD patient not found', 'w'); return; }
    hookUsage();
    st = { p: p, items: [], unlocked: '' };
    var old = document.getElementById('isu-ov'); if (old) old.remove();
    var now = new Date(), t = dayKey(now), a = admitDay(p);
    var ov = document.createElement('div'); ov.id = 'isu-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:5000;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:14px';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:620px;width:100%;max-height:92vh;overflow:auto;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="display:flex;align-items:center;gap:8px"><div style="flex:1"><div style="font-size:15px;font-weight:900;color:#1a3c6e">🧴 Stock used — ' + esc(p.name || '') + '</div><div style="font-size:11.5px;color:#666">' + esc([p.bmhId, p.ward, p.room ? 'Bed ' + p.room : '', 'Admitted ' + fmtDay(a)].filter(Boolean).join(' · ')) + '</div></div><button type="button" class="btn btn-xs btn-gray" id="isu-x">✕</button></div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 8px"><div><label class="fl">Date used</label><input type="date" id="isu-date" min="' + a + '" max="' + t + '" value="' + t + '"></div><div><label class="fl">Time</label><input type="time" id="isu-time" value="' + hhmm(now.toISOString()) + '"></div></div>'
      + '<input type="text" id="isu-q" placeholder="Search stock — injection, drip, cannula, IV set…" autocomplete="off" style="width:100%;padding:8px 10px;border:1px solid #ccc;border-radius:8px;font-size:13px">'
      + '<div id="isu-res" style="max-height:30vh;overflow:auto;border:1px solid #eee;border-radius:8px;margin:6px 0 10px"></div>'
      + '<div style="font-size:11px;font-weight:900;text-transform:uppercase;color:#666;margin-bottom:4px">Items used</div><div id="isu-draft"></div>'
      + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px"><button type="button" class="btn btn-gray" id="isu-cancel">Close</button><button type="button" class="btn btn-gold" id="isu-save">Save — staff PIN</button></div>'
      + '<div style="display:flex;align-items:center;margin:16px 0 6px;border-top:1px solid #eee;padding-top:10px"><div style="flex:1;font-size:12px;font-weight:900;color:#1a3c6e">Used during this admission</div><button type="button" class="btn btn-xs btn-outline" id="isu-print">🖨️ Print</button></div>'
      + '<div id="isu-hist">' + historyHtml(p) + '</div></div>';
    document.body.appendChild(ov);
    var q = ov.querySelector('#isu-q');
    q.oninput = draw;
    ov.addEventListener('click', function (e) {
      var el = e.target;
      var pick = el.closest && el.closest('[data-pick]');
      if (pick) { var it = ov._rows[Number(pick.getAttribute('data-pick'))]; if (it) { var ex = st.items.find(function (r) { return r.item === it; }); if (ex) ex.qty++; else st.items.push({ item: it, qty: 1 }); draw(); } return; }
      if (el.getAttribute && el.getAttribute('data-rm') != null) { st.items.splice(Number(el.getAttribute('data-rm')), 1); draw(); return; }
      if (el.id === 'isu-unlock') { e.preventDefault(); var pin = window.bmhStockStaff && bmhStockStaff.pin; if (!pin) return; pin(true, 'To see other departments\' stock — enter your staff PIN.').then(function (n) { if (n) { st.unlocked = n; draw(); } }); return; }
      if (el.id === 'isu-x' || el.id === 'isu-cancel') { ov.remove(); return; }
      if (el.id === 'isu-save') { saveNow(); return; }
      if (el.id === 'isu-print') { printUse(st.p); return; }
    });
    ov.addEventListener('change', function (e) { var i = e.target.getAttribute && e.target.getAttribute('data-q'); if (i != null && st.items[i]) st.items[i].qty = Math.max(1, parseInt(e.target.value, 10) || 1); });
    draw(); setTimeout(function () { try { q.focus(); } catch (e) {} }, 50);
  };
  var busy = false;
  function saveNow() {
    if (busy || !st) return;
    var ov = document.getElementById('isu-ov'), p = st.p;
    if (!st.items.length) { toast('Add at least one item', 'w'); return; }
    var dk = ov.querySelector('#isu-date').value, tm = ov.querySelector('#isu-time').value || '12:00';
    var at = new Date(dk + 'T' + tm + ':00');
    if (!dk || isNaN(at)) { toast('Choose the date and time', 'w'); return; }
    if (dk < admitDay(p) || at.getTime() > Date.now() + 5 * 60e3) { toast('The date must be during this admission and not in the future', 'w'); return; }
    var short = st.items.filter(function (r) { return Number(r.item.stock || 0) < r.qty; });
    if (short.length) { toast('Not enough stock: ' + short.map(function (r) { return r.item.name + ' (' + r.item.stock + ' left)'; }).join(', '), 'w'); return; }
    var bmhId = p.bmhId || p.id, rows = st.items.map(function (r) { return { item: r.item, qty: r.qty }; });
    busy = true;
    var warn = window.bmhStockStaff && bmhStockStaff.gate ? bmhStockStaff.gate(bmhId, p.dept || '', rows, { noPin: 'IPD staff (PIN next)' }) : Promise.resolve('ok');
    warn.then(function (okk) {
      if (!okk) return '';
      if (st.unlocked) return st.unlocked;
      var pin = window.bmhStockStaff && bmhStockStaff.pin;
      return pin ? pin(true, 'IPD stock used — select your name and enter your PIN.') : '';
    }).then(function (staff) {
      if (!staff) return;
      return ensureFinancials().then(function (online) {
        if (!online) throw new Error('offline');
        return Promise.all(rows.map(function (r) { return freshStock(r.item); }));
      }).then(function () {
        var low = rows.filter(function (r) { return Number(r.item.stock || 0) < r.qty; });
        if (low.length) { toast('Stock changed — not enough: ' + low.map(function (r) { return r.item.name + ' (' + r.item.stock + ' left)'; }).join(', '), 'w'); draw(); return; }
        var atIso = at.toISOString(), nowIso = new Date().toISOString();
        var items = [];
        rows.forEach(function (r) {
          override = { ts: atIso, takenBy: staff, recordedAt: nowIso, ipdAdmissionId: p.id };
          try { bmhUseInventoryItemForPatient(bmhId, r.item, { qty: r.qty, mode: 'consume', dept: p.dept || '', source: 'ipd', procedure: 'IPD stock used', procedureRef: p.id }); }
          finally { override = null; }
          items.push({ name: r.item.name || '', barcode: r.item.barcode || '', store: r.item.store || '', qty: r.qty, batchNo: r.item.batchNo || '', exp: r.item.exp || '' });
        });
        var late = dayKey(at) !== dayKey(new Date());
        var entry = { id: 'ISU' + Date.now().toString(36), at: atIso, by: staff, recordedAt: nowIso, recordedByLogin: (window.CURRENT_USER && CURRENT_USER.name) || '', items: items };
        if (!Array.isArray(p.ipdStockUse)) p.ipdStockUse = [];
        p.ipdStockUse.push(entry);
        if (!Array.isArray(p.notes)) p.notes = [];
        p.notes.unshift({ date: at.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), time: hhmm(atIso), note: 'Stock used: ' + items.map(function (i) { return i.name + ' ×' + i.qty; }).join(', ') + (late ? ' (entered on ' + fmtDay(dayKey(nowIso)).slice(0, 5) + ' ' + hhmm(nowIso) + ')' : ''), nurse: staff, doctor: '', recordedAt: atIso, kind: 'stock' });
        try { fbPush('auditLog', { user: (CURRENT_USER || {}).name || '', role: (CURRENT_USER || {}).role || '', action: 'IPD_STOCK_USED', item: (p.name || '') + ' [' + bmhId + '] ' + fmtDay(dayKey(atIso)) + ' ' + hhmm(atIso) + ' · ' + items.map(function (i) { return i.name + ' ×' + i.qty + ' (' + i.store + ')'; }).join('; ') + ' · by ' + staff, timestamp: nowIso }); } catch (e) {}
        return save(p, { ipdStockUse: p.ipdStockUse, notes: p.notes }).then(function () {
          toast(items.length + ' item' + (items.length === 1 ? '' : 's') + ' recorded for ' + (p.name || 'patient') + ' by ' + staff + ' ✓', 's');
          st.items = []; draw();
          var h = document.getElementById('isu-hist'); if (h) h.innerHTML = historyHtml(p);
          refreshCard(p);
          try { renderInventoryUsageLog && renderInventoryUsageLog(); } catch (e) {}
          try { renderStockList && renderStockList(); } catch (e) {}
        });
      });
    }).catch(function (e) {
      console.warn('[ipd-stock-use]', e);
      toast(e && e.message === 'offline' ? 'Could not reach the server to update stock — check internet and try again' : 'Could not save — try again', 'w');
    }).then(function () { busy = false; });
  }
  function printUse(p) {
    var list = (p.ipdStockUse || []).slice().sort(function (a, b) { return String(a.at).localeCompare(String(b.at)); });
    var rows = [];
    list.forEach(function (e) { e.items.forEach(function (i) { rows.push({ e: e, i: i }); }); });
    var tot = {}; rows.forEach(function (r) { tot[r.i.name] = (tot[r.i.name] || 0) + Number(r.i.qty || 0); });
    var td = 'style="border:1px solid #bbb;padding:4px 6px;font-size:11px;vertical-align:top"';
    var head = '';
    try { head = buildCompactDocumentHeader('IPD Stock Used', null, [p.name, p.bmhId, p.ward, p.room ? 'Bed ' + p.room : '', p.doctor ? 'Consultant: ' + p.doctor : '', 'Admitted ' + fmtDay(admitDay(p))].filter(Boolean).join(' · ')); } catch (e) { head = ''; }
    if (!head) head = '<h2 style="margin:0 0 4px">IPD Stock Used</h2><div style="font-size:12px;margin-bottom:8px">' + esc([p.name, p.bmhId, p.ward, p.room ? 'Bed ' + p.room : '', 'Admitted ' + fmtDay(admitDay(p))].filter(Boolean).join(' · ')) + '</div>';
    var html = '<!doctype html><html><head><meta charset="utf-8"><title>IPD Stock Used — ' + esc(p.name || '') + '</title><style>body{font-family:Arial,sans-serif;margin:14mm;color:#111}table{border-collapse:collapse;width:100%}th{background:#eef2f7;border:1px solid #bbb;padding:4px 6px;font-size:11px;text-align:left}</style></head><body>' + head
      + '<table><thead><tr><th>Date</th><th>Time</th><th>Item</th><th>Qty</th><th>Store</th><th>Batch / Exp</th><th>By (PIN)</th><th>Entered</th></tr></thead><tbody>'
      + (rows.length ? rows.map(function (r) { return '<tr><td ' + td + '>' + fmtDay(dayKey(r.e.at)) + '</td><td ' + td + '>' + hhmm(r.e.at) + '</td><td ' + td + '><b>' + esc(r.i.name) + '</b></td><td ' + td + '>' + esc(r.i.qty) + '</td><td ' + td + '>' + esc(r.i.store) + '</td><td ' + td + '>' + esc([r.i.batchNo, r.i.exp ? 'Exp ' + r.i.exp : ''].filter(Boolean).join(' · ')) + '</td><td ' + td + '>' + esc(r.e.by) + '</td><td ' + td + '>' + fmtDay(dayKey(r.e.recordedAt)).slice(0, 5) + ' ' + hhmm(r.e.recordedAt) + '</td></tr>'; }).join('') : '<tr><td colspan="8" ' + td + '>Nothing recorded.</td></tr>')
      + '</tbody></table>'
      + (rows.length ? '<h3 style="font-size:13px;margin:12px 0 4px">Total for the admission</h3><table><tbody>' + Object.keys(tot).sort().map(function (n) { return '<tr><td ' + td + '>' + esc(n) + '</td><td ' + td + ' style="border:1px solid #bbb;padding:4px 6px;font-size:11px;width:60px"><b>' + tot[n] + '</b></td></tr>'; }).join('') + '</tbody></table>' : '')
      + '<div style="font-size:10px;color:#555;margin-top:8mm">Printed ' + new Date().toLocaleString('en-IN') + '</div></body></html>';
    try { safePrint(html); } catch (e) { var w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); w.print(); } }
  }
  window.bmhIpdStockUsePrint = function (id) { var p = findPt(id); if (p) printUse(p); };
  function cardHtml(p) {
    var t = dayKey(new Date());
    var todays = (p.ipdStockUse || []).filter(function (e) { return dayKey(e.at) === t; });
    return '<div id="isu-card" data-id="' + esc(p.id) + '" style="background:#fff;border:1px solid var(--g5);border-radius:12px;padding:12px;margin-bottom:12px">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><div style="font-size:11px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px;flex:1">🧴 Stock used today</div><button class="btn btn-xs btn-gold" onclick="bmhIpdStockUseOpen(\'' + esc(p.id) + '\')">+ Add stock used</button></div>'
      + (todays.length ? todays.map(function (e) { return '<div style="font-size:12px;padding:3px 0;border-bottom:1px solid var(--g5)"><b>' + esc(hhmm(e.at)) + '</b> · ' + e.items.map(function (i) { return esc(i.name) + ' ×' + esc(i.qty); }).join(', ') + ' <span style="color:var(--g1);font-size:11px">— ' + esc(e.by) + '</span></div>'; }).join('') : '<div style="font-size:12px;color:var(--g1)">Nothing recorded today. Earlier days can be added from "+ Add stock used" (choose the date).</div>')
      + '</div>';
  }
  function refreshCard(p) { var c = document.getElementById('isu-card'); if (c) c.outerHTML = cardHtml(p); }
  function install() {
    var ok = true;
    if (typeof window.renderIPDMonitoringSheet === 'function' && !window.renderIPDMonitoringSheet._isu) {
      var orm = window.renderIPDMonitoringSheet;
      var m = function (id) {
        var r = orm.apply(this, arguments);
        try {
          var p = findPt(id), host = document.getElementById('ipd-monitor-body');
          if (p && host && !document.getElementById('isu-card')) {
            var due = document.getElementById('ipdm-due');
            if (due) due.insertAdjacentHTML('afterend', cardHtml(p)); else host.insertAdjacentHTML('afterbegin', cardHtml(p));
          }
        } catch (e) {}
        return r;
      };
      m._isu = true; window.renderIPDMonitoringSheet = m;
    } else if (typeof window.renderIPDMonitoringSheet !== 'function') ok = false;
    if (typeof window.openIPDPatient === 'function' && !window.openIPDPatient._isu) {
      var oo = window.openIPDPatient;
      var w = function (id) {
        var r = oo.apply(this, arguments);
        try {
          var el = document.getElementById('ipd-detail'), p = findPt(id);
          if (el && p && !el.querySelector('.isu-btn')) {
            var n = (p.ipdStockUse || []).length;
            var html = '<button class="btn btn-outline btn-sm isu-btn" onclick="bmhIpdStockUseOpen(\'' + esc(p.id) + '\')">🧴 Stock used' + (n ? ' (' + n + ')' : '') + '</button>';
            var rx = el.querySelector('.ipdm-rxbtn');
            var bar = rx || [].find.call(el.querySelectorAll('button'), function (b) { return /openIPDWorkflow/.test(b.getAttribute('onclick') || ''); });
            if (bar) bar.insertAdjacentHTML(rx ? 'afterend' : 'beforebegin', ' ' + html);
          }
        } catch (e) {}
        return r;
      };
      w._isu = true; window.openIPDPatient = w;
    } else if (typeof window.openIPDPatient !== 'function') ok = false;
    hookUsage();
    return ok;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
