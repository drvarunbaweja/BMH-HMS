/* BMH — Billing → Bills & History: "✏️ Edit" a saved bill (reception, billing and admin logins — doctors cannot).
 * Change item names / quantity / rate, add or remove items, the discount, and the amount received with its mode.
 * A reason is required. Saving updates, in one step:
 *   • the bill (savedBills/<id>) — kept with an edit history (who, when, reason, before → after);
 *   • its payment receipt on the day it was paid (transactions/<day>/<id>): amount, mode, reference, item allocation;
 *   • the patient's balance: if the edited bill is more than what was received, the difference is added to his dues
 *     (collected later as a balance payment); if it is now fully paid, the due is cleared;
 *   • a line in today's "Changes made to payments" (moneyChanges) — it prints on the department day summary — and the
 *     audit log (BILL_EDITED).
 * Bills cannot be deleted from here (deleting stays admin-only). TPA / cashless bills and bills paid in more than one
 * receipt / mode keep their payment unchanged (only items and discount can be edited; the difference goes to dues).
 * Off switch (this browser): localStorage.setItem('bmh_bill_edit_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_bill_edit_off') === '1') return; } catch (e) {}
  var MODES = ['Cash', 'UPI', 'UPI/GPay', 'Card', 'Cheque', 'Bank transfer'];
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function rs(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function num(v) { var n = Number(v); return isFinite(n) ? n : 0; }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function me() { try { return CURRENT_USER || {}; } catch (e) { return window.CURRENT_USER || {}; } }
  function role() { return String(me().role || '').toLowerCase(); }
  function canEdit() { var u = me(); if (u.isAdmin || role() === 'admin') return true; if (/doctor|optom/.test(role())) return false; return /reception|billing|account|tpa/.test(role()) || (typeof bmhCanOpenBilling === 'function' && bmhCanOpenBilling() && !/doctor/.test(role())); }
  function sk(s) { return String(s == null ? '' : s).replace(/[.#$\[\]\/]/g, '_'); }
  function today() { try { return todayKey(); } catch (e) { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } }
  function dayOf(v) { try { return localDateKey(v); } catch (e) { return String(v || '').slice(0, 10); } }
  function db() { return window.FBDB || null; }
  function clone(o) { try { return JSON.parse(JSON.stringify(o)); } catch (e) { return o; } }
  var E = null; // { entry, bill, items, txn, multi, tpa }

  function load(key) {
    var BH = window.bmhBillsHistory; if (!BH || !BH.findEntry) { toast('Bills & History not ready — try again', 'w'); return Promise.reject(); }
    var e = BH.findEntry(key); if (!e || e.kind !== 'bill') { toast('Bill not found', 'w'); return Promise.reject(); }
    var id = e.billId || (e.full && e.full.id) || String(key).replace(/^B:/, '');
    var fresh = db() ? db().ref('savedBills/' + sk(id)).once('value').then(function (s) { return s.val(); }).catch(function () { return null; }) : Promise.resolve(null);
    return fresh.then(function (b) {
      b = b || (e.full ? clone(e.full) : null);
      if (!b) { try { b = clone(BH.billObject ? BH.billObject(e) : null); } catch (x) {} }
      if (!b) { toast('Could not open this bill', 'w'); throw new Error('no bill'); }
      b.id = b.id || id;
      var items = (Array.isArray(b.items) ? b.items : Object.values(b.items || {})).filter(Boolean).map(function (i) { var q = num(i.qty) || 1; return { desc: i.desc || i.name || 'Charge', qty: q, rate: num(i.rate != null ? i.rate : num(i.amount) / q), cat: i.cat || '', lineId: i.lineId || '' }; });
      var own = (e.txns || []).filter(function (t) { return t && t.type !== 'due-payment' && t.type !== 'advance-adjustment' && t.source !== 'advance-adjustment'; });
      E = { entry: e, bill: b, before: clone(b), items: items, txn: own.length === 1 ? own[0] : null, multi: own.length > 1, none: own.length === 0, tpa: !!b.isTPA || num(b.tpaAmount) > 0 };
      return E;
    });
  }
  function totals() {
    var sub = E.items.reduce(function (s, i) { return s + num(i.qty) * num(i.rate); }, 0);
    var disc = num((document.getElementById('be-disc') || {}).value);
    var net = Math.max(0, sub - disc);
    var recBox = document.getElementById('be-rec');
    var rec = recBox && !recBox.disabled ? num(recBox.value) : num(E.bill.amountReceived);
    var tpa = num(E.bill.tpaAmount), adv = num(E.bill.advanceApplied);
    var due = Math.max(0, net - tpa - rec - adv);
    return { sub: sub, disc: disc, net: net, rec: rec, tpa: tpa, adv: adv, due: due, extra: Math.max(0, rec + adv + tpa - net) };
  }
  function itemsHtml() {
    return E.items.map(function (i, k) {
      return '<tr><td style="padding:3px"><input data-f="desc" data-k="' + k + '" value="' + esc(i.desc) + '" style="width:100%;font-size:12px"></td>'
        + '<td style="padding:3px;width:60px"><input data-f="qty" data-k="' + k + '" type="number" min="1" value="' + esc(i.qty) + '" style="width:100%;font-size:12px;text-align:center"></td>'
        + '<td style="padding:3px;width:100px"><input data-f="rate" data-k="' + k + '" type="number" min="0" value="' + esc(i.rate) + '" style="width:100%;font-size:12px;text-align:right"></td>'
        + '<td style="padding:3px;width:90px;text-align:right;font-weight:800">' + rs(num(i.qty) * num(i.rate)) + '</td>'
        + '<td style="padding:3px;width:30px"><button type="button" data-rm="' + k + '" class="btn btn-xs btn-gray" title="Remove item">✕</button></td></tr>';
    }).join('');
  }
  function drawTotals() {
    var t = totals(), el = document.getElementById('be-tot'); if (!el) return;
    var b = E.before, wasNet = num(b.netPayable);
    el.innerHTML = '<div>Items <b>' + rs(t.sub) + '</b> − Discount <b>' + rs(t.disc) + '</b> = Bill <b style="font-size:14px">' + rs(t.net) + '</b>' + (Math.round(wasNet) !== Math.round(t.net) ? ' <span style="color:#b45309">(was ' + rs(wasNet) + ')</span>' : '') + '</div>'
      + (t.tpa ? '<div>TPA / cashless ' + rs(t.tpa) + '</div>' : '') + (t.adv ? '<div>Advance used ' + rs(t.adv) + '</div>' : '')
      + '<div>Received <b>' + rs(t.rec) + '</b>' + (Math.round(num(b.amountReceived)) !== Math.round(t.rec) ? ' <span style="color:#b45309">(was ' + rs(b.amountReceived) + ')</span>' : '') + '</div>'
      + (t.due > 0 ? '<div style="color:#b42318;font-weight:900">Due ' + rs(t.due) + ' — will be added to the patient\'s balance</div>' : '<div style="color:#1a6b34;font-weight:800">Fully paid</div>')
      + (t.extra > 0 ? '<div style="color:#b42318;font-weight:800">Received is ' + rs(t.extra) + ' more than the bill — lower the amount received, or refund it.</div>' : '');
  }
  function draw() {
    var ov = document.getElementById('be-ov'); if (!ov) return;
    ov.querySelector('#be-items').innerHTML = itemsHtml();
    drawTotals();
  }
  window.bmhBillEditOpen = function (key) {
    if (!canEdit()) { toast('Only reception / billing / admin can edit a bill', 'w'); return; }
    load(key).then(function () {
      var b = E.bill, old = document.getElementById('be-ov'); if (old) old.remove();
      var lockPay = E.tpa || E.multi || E.none;
      var names = []; try { names = (CHARGES_DATA || []).filter(Boolean).map(function (r) { return r.name; }); } catch (e) {}
      var ov = document.createElement('div'); ov.id = 'be-ov';
      ov.style.cssText = 'position:fixed;inset:0;z-index:4700;background:rgba(10,20,40,.5);display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow:auto';
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;width:min(760px,100%);padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
        + '<div style="display:flex;align-items:center;gap:8px"><div style="flex:1"><div style="font-size:15px;font-weight:900;color:#1a3c6e">✏️ Edit bill ' + esc(b.billNo || b.id) + '</div><div style="font-size:11.5px;color:#666">' + esc([b.patientName, b.bmhId, b.date || dayOf(b.createdAt), b.centre].filter(Boolean).join(' · ')) + (num(b.editCount) ? ' · edited ' + num(b.editCount) + '×' : '') + '</div></div><button type="button" class="btn btn-xs btn-gray" id="be-x">✕</button></div>'
        + '<table style="width:100%;border-collapse:collapse;margin-top:10px"><thead><tr style="font-size:10.5px;color:#666;text-align:left"><th>Item</th><th>Qty</th><th>Rate ₹</th><th style="text-align:right">Amount</th><th></th></tr></thead><tbody id="be-items"></tbody></table>'
        + '<div style="display:flex;gap:6px;margin:6px 0 10px"><input id="be-new" list="be-dl" placeholder="+ Add item (type or pick a charge)" style="flex:1;font-size:12px"><input id="be-new-amt" type="number" min="0" placeholder="₹" style="width:100px;font-size:12px"><button type="button" class="btn btn-xs btn-outline" id="be-add">Add</button><datalist id="be-dl">' + names.slice(0, 600).map(function (n) { return '<option value="' + esc(n) + '">'; }).join('') + '</datalist></div>'
        + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:end">'
        + '<label style="font-size:11px;font-weight:800;color:#555">Discount ₹<br><input id="be-disc" type="number" min="0" value="' + esc(num(b.discount)) + '" style="width:110px"></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555">Amount received ₹<br><input id="be-rec" type="number" min="0" value="' + esc(num(b.amountReceived)) + '" style="width:120px"' + (lockPay ? ' disabled' : '') + '></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555">Mode<br><select id="be-mode"' + (lockPay ? ' disabled' : '') + '>' + MODES.concat(MODES.indexOf(b.paymentMode) < 0 && b.paymentMode ? [b.paymentMode] : []).map(function (m) { return '<option' + (m === (E.txn && E.txn.mode || b.paymentMode) ? ' selected' : '') + '>' + esc(m) + '</option>'; }).join('') + '</select></label>'
        + '<label style="font-size:11px;font-weight:800;color:#555">UPI / card ref<br><input id="be-ref" value="' + esc((E.txn && E.txn.paymentRef) || (b.paymentRef && b.paymentRef !== b.paymentMode ? b.paymentRef : '')) + '" style="width:130px"' + (lockPay ? ' disabled' : '') + '></label></div>'
        + (lockPay ? '<div style="font-size:11px;color:#8a4200;margin-top:4px">' + (E.tpa ? 'TPA / cashless bill' : E.multi ? 'Paid in more than one receipt' : 'No payment receipt on this bill') + ' — the payment stays as it is; any difference goes to the patient\'s dues.</div>' : '')
        + '<div id="be-tot" style="margin:12px 0;padding:10px;background:#f6f8fb;border-radius:8px;font-size:12.5px;line-height:1.7"></div>'
        + '<label style="font-size:11px;font-weight:800;color:#555;display:block">Reason for the edit (required)<br><input id="be-reason" placeholder="e.g. Discount should be ₹1,500 not ₹2,000" style="width:100%"></label>'
        + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button type="button" class="btn btn-gray" id="be-cancel">Cancel</button><button type="button" class="btn btn-gold" id="be-save">Save changes</button></div>'
        + '<div style="font-size:10.5px;color:#777;margin-top:6px">The change is recorded with your login and shows in today\'s department summary under "Changes made to payments".</div></div>';
      document.body.appendChild(ov);
      ov.addEventListener('input', function (ev) {
        var t = ev.target, k = t.getAttribute('data-k'), f = t.getAttribute('data-f');
        if (k != null && f && E.items[k]) { E.items[k][f] = f === 'desc' ? t.value : num(t.value); if (f !== 'desc') { var tr = t.closest('tr'); if (tr) tr.children[3].textContent = rs(num(E.items[k].qty) * num(E.items[k].rate)); } }
        drawTotals();
      });
      ov.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t.getAttribute && t.getAttribute('data-rm') != null) { if (E.items.length <= 1) { toast('A bill needs at least one item', 'w'); return; } E.items.splice(Number(t.getAttribute('data-rm')), 1); draw(); return; }
        if (t.id === 'be-add') { addItem(); return; }
        if (t.id === 'be-x' || t.id === 'be-cancel') { ov.remove(); E = null; return; }
        if (t.id === 'be-save') { save(); return; }
      });
      ov.querySelector('#be-new').addEventListener('change', function () {
        var n = this.value, row = null; try { row = (CHARGES_DATA || []).find(function (r) { return r && r.name === n; }); } catch (e) {}
        if (row) { var c = String(b.centre || '').toUpperCase() === 'CHD' ? num(row.chd) : num(row.rpr); var a = document.getElementById('be-new-amt'); if (a && !a.value) a.value = c || ''; }
      });
      draw();
    }).catch(function () {});
  };
  function addItem() {
    var n = String((document.getElementById('be-new') || {}).value || '').trim(), a = num((document.getElementById('be-new-amt') || {}).value);
    if (!n) { toast('Type the item', 'w'); return; }
    var cat = ''; try { cat = normalizeChargeCollectionCategoryValue(n) || inferChargeCategoryFromService(n) || 'other'; } catch (e) { cat = 'other'; }
    E.items.push({ desc: n, qty: 1, rate: a, cat: cat, lineId: 'e' + Date.now().toString(36) });
    document.getElementById('be-new').value = ''; document.getElementById('be-new-amt').value = '';
    draw();
  }
  function summary(b) {
    return { items: (b.items || []).map(function (i) { return (i.desc || '') + ' ' + rs(i.amount); }).join(', '), subtotal: num(b.subtotal), discount: num(b.discount), net: num(b.netPayable), received: num(b.amountReceived), mode: b.paymentMode || '' };
  }
  var busy = false;
  function save() {
    if (busy || !E) return;
    var reason = String((document.getElementById('be-reason') || {}).value || '').trim();
    if (!reason) { toast('Write the reason for the edit', 'w'); document.getElementById('be-reason').focus(); return; }
    if (E.items.some(function (i) { return !String(i.desc || '').trim() || num(i.qty) <= 0 || num(i.rate) < 0; })) { toast('Each item needs a name, quantity and amount', 'w'); return; }
    var t = totals();
    if (t.disc > t.sub) { toast('Discount is more than the items', 'w'); return; }
    if (t.extra > 0) { toast('Amount received is more than the bill', 'w'); return; }
    if (!db()) { toast('Not connected — try again', 'w'); return; }
    var lockPay = E.tpa || E.multi || E.none;
    var b = E.bill, before = summary(E.before), u = me(), at = new Date().toISOString();
    var items = E.items.map(function (i) { var q = num(i.qty) || 1, r = num(i.rate); return { desc: String(i.desc).trim(), qty: q, rate: r, amount: q * r, cat: i.cat || (function () { try { return inferChargeCategoryFromService(i.desc) || 'other'; } catch (e) { return 'other'; } })(), lineId: i.lineId || ('e' + Math.random().toString(36).slice(2, 9)) }; });
    var mode = lockPay ? (b.paymentMode || '') : (document.getElementById('be-mode') || {}).value || b.paymentMode || 'Cash';
    var ref = lockPay ? (b.paymentRef || '') : String((document.getElementById('be-ref') || {}).value || '').trim();
    var nb = Object.assign({}, b, { items: items, subtotal: t.sub, discount: t.disc, netPayable: t.net, patientPays: Math.max(0, t.net - t.tpa), amountReceived: t.rec, paymentMode: mode, paymentRef: ref || mode,
      editedAt: at, editedBy: u.name || u.username || '', editCount: num(b.editCount) + 1 });
    if (!lockPay) nb.paymentSplits = [{ amount: t.rec, mode: mode, ref: ref }];
    delete nb.edits;
    var after = summary(nb);
    var what = [];
    if (before.items !== after.items) what.push('Items: ' + before.items + ' → ' + after.items);
    if (before.discount !== after.discount) what.push('Discount ' + rs(before.discount) + ' → ' + rs(after.discount));
    if (before.net !== after.net) what.push('Bill ' + rs(before.net) + ' → ' + rs(after.net));
    if (before.received !== after.received) what.push('Received ' + rs(before.received) + ' → ' + rs(after.received));
    if (before.mode !== after.mode) what.push('Mode ' + (before.mode || '—') + ' → ' + (after.mode || '—'));
    if (!what.length) { toast('Nothing was changed', 'i'); return; }
    busy = true;
    var up = {}, id = sk(b.id), bmhId = b.bmhId || '';
    Object.keys(nb).forEach(function (k) { up['savedBills/' + id + '/' + k] = nb[k] === undefined ? null : nb[k]; });
    up['savedBills/' + id + '/edits/' + Date.now().toString(36)] = { at: at, by: nb.editedBy, role: u.role || '', reason: reason, before: before, after: after };
    // the payment receipt of this bill
    var txn = E.txn, txnDay = '', txnPatch = null;
    if (txn && !lockPay) {
      txnDay = txn._day || dayOf(txn.date || txn.createdAt);
      var tk = sk(txn._key || txn.id);
      var left = t.rec, allocs = items.map(function (i, n) { var a = n === items.length - 1 ? left : Math.min(left, Math.round(t.net > 0 ? i.amount * t.rec / Math.max(t.sub, 1) : 0)); left -= a; return { amount: a, desc: i.desc, lineId: i.lineId }; });
      txnPatch = { amount: t.rec, mode: mode, paymentRef: ref, chargeAllocations: allocs, editedAt: at, editedBy: nb.editedBy };
      Object.keys(txnPatch).forEach(function (k) { up['transactions/' + txnDay + '/' + tk + '/' + k] = txnPatch[k]; });
    }
    // patient dues for this bill (written below, after reading what is there)
    var duesPath = bmhId ? 'patientDues/' + sk(bmhId) + '/items/' + id : '';
    // today's change list (prints on the department day summary) + audit
    var mc = db().ref('moneyChanges/' + today()).push().key;
    up['moneyChanges/' + today() + '/' + mc] = { at: at, by: nb.editedBy, role: u.role || '', txnId: txn ? String(txn.id) : '', receiptDay: txnDay || dayOf(b.createdAt || b.date), billId: String(b.id), billNo: String(b.billNo || ''),
      bmhId: bmhId, patient: b.patientName || '', service: items.map(function (i) { return i.desc; }).join(', ').slice(0, 120), dept: b.dept || (txn && txn.dept) || '', centre: b.centre || (txn && txn.centre) || '',
      what: ['Bill edited (' + reason + ')'].concat(what), from: before.received, to: after.received, kind: 'bill-edit' };
    var audit = db().ref('auditLog').push().key;
    up['auditLog/' + audit] = { user: nb.editedBy, role: u.role || '', action: 'BILL_EDITED', item: (b.patientName || '') + ' [' + bmhId + '] ' + (b.billNo || b.id) + ' · ' + what.join('; ') + ' · reason: ' + reason, timestamp: at };
    var btn = document.getElementById('be-save'); if (btn) { btn.disabled = true; btn.textContent = '⏳ Saving…'; }
    (duesPath ? db().ref(duesPath).once('value').then(function (s) { return s.val(); }) : Promise.resolve(null)).then(function (cur) {
      // a due already replaced by a later bill stays as it is; no due item is made for a bill that is fully paid
      if (duesPath && !(cur && cur.supersededBy) && (cur || t.due > 0)) {
        up[duesPath] = Object.assign({}, cur || {}, { id: String(b.id), billId: String(b.id), billNo: String(b.billNo || b.id), date: (cur && cur.date) || b.createdAt || b.date || at, createdAt: (cur && cur.createdAt) || b.createdAt || at,
          desc: items.map(function (i) { return i.desc; }).join(', ').slice(0, 200), lines: items.map(function (i) { return i.lineId || String(i.desc).toLowerCase(); }),
          billed: Math.max(0, t.net - t.tpa), paidAtBill: t.rec + t.adv, centre: b.centre || '', dept: b.dept || '', by: (cur && cur.by) || nb.editedBy, editedAt: at, editedBy: nb.editedBy });
        up['patientDues/' + sk(bmhId) + '/updatedAt'] = at;
        if (b.patientName) up['patientDues/' + sk(bmhId) + '/name'] = b.patientName;
      }
      return db().ref().update(up);
    }).then(function () {
      // this computer's copies
      try { Object.assign(b, nb); } catch (e) {}
      try { (window.BMH_SAVED_BILLS || []).forEach(function (x) { if (x && x.id === b.id) Object.assign(x, nb); }); } catch (e) {}
      try { var S = window.bmhBillsHistory.state; if (S && S.saved) S.saved[b.id] = Object.assign({}, S.saved[b.id] || {}, nb); if (txn && txnPatch) { Object.assign(txn, txnPatch); var rows = S.cache && S.cache.get(txnDay); (rows || []).forEach(function (r) { if (r && r.id === txn.id) Object.assign(r, txnPatch); }); } } catch (e) {}
      try { if (txn && txnPatch) (window.TRANSACTIONS || []).forEach(function (r) { if (r && r.id === txn.id) Object.assign(r, txnPatch); }); } catch (e) {}
      try { if (txnDay === today()) saveTodayTransactionsToLocal(); } catch (e) {}
      try { bmhMarkReceptionFinancialDataDirty && bmhMarkReceptionFinancialDataDirty('bill-edit'); } catch (e) {}
      try { bmhSyncPatientRunningBalance && bmhSyncPatientRunningBalance(bmhId); } catch (e) {}
      var ov = document.getElementById('be-ov'); if (ov) ov.remove();
      toast('Bill ' + (b.billNo || '') + ' updated ✓' + (t.due > 0 ? ' — ' + rs(t.due) + ' added to dues' : ''), 's');
      try { window.bmhBillsHistory.rerender(); } catch (e) {}
      try { var q = document.getElementById('bmh-bill-history-search'); if (typeof bmhSearchBillHistory === 'function') bmhSearchBillHistory(q ? q.value : ''); } catch (e) {}
      try { renderCollectionDashboard && renderCollectionDashboard(); } catch (e) {}
      E = null;
    }).catch(function (err) {
      console.warn('[bill-edit]', err);
      toast('Could not save the edit — nothing was changed. ' + (err && err.message ? err.message : ''), 'w');
      if (btn) { btn.disabled = false; btn.textContent = 'Save changes'; }
    }).then(function () { busy = false; });
  }
  window.bmhBillEditCan = canEdit;
})();
