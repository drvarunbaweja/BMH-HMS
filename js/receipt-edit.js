/* BMH — Billing → Bills & History: "✏️ Edit" on a receipt collected from Charges (no bill) — admin logins only.
 * E.g. ₹1,500 collected for OCT, later a ₹300 discount: enter the discount (or the new amount) and a reason.
 * Saving updates, in one step:
 *   • the receipt (transactions/<day>/<id>): amount, mode, discount, the first amount kept as originalAmount, and an
 *     edit history (who, when, reason, before → after); its item allocation follows the new amount;
 *   • the patient's charge line paid by it (financials/patientCharges): paid amount, and a discount lowers the charge
 *     too, so nothing is left due;
 *   • the doctor's charge request it paid (payRequests/<id>): the discount and final amount are noted;
 *   • a line in today's "Changes made to payments" (moneyChanges) — prints on the department day summary — and the
 *     audit log (RECEIPT_EDITED).
 * Receipts on a saved bill are edited through the bill's own ✏️ Edit. Advance adjustments and refunds can't be edited.
 * Off switch (this browser): localStorage.setItem('bmh_receipt_edit_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_receipt_edit_off') === '1') return; } catch (e) {}
  var MODES = ['Cash', 'UPI', 'UPI/GPay', 'Card', 'Cheque', 'Bank transfer'];
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function rs(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function num(v) { var n = Number(v); return isFinite(n) ? n : 0; }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function me() { try { return CURRENT_USER || {}; } catch (e) { return window.CURRENT_USER || {}; } }
  function isAdmin() { var u = me(); return !!(u.isAdmin || String(u.role || '').toLowerCase() === 'admin'); }
  function today() { try { return todayKey(); } catch (e) { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } }
  function dayOf(v) { try { return localDateKey(v); } catch (e) { return String(v || '').slice(0, 10); } }
  function db() { return window.FBDB || null; }
  var E = null;
  function close() { var o = document.getElementById('re-ov'); if (o) o.remove(); E = null; }
  function vals() {
    var orig = E.orig, disc = Math.max(0, Math.round(num((document.getElementById('re-disc') || {}).value)));
    var recEl = document.getElementById('re-rec'), rec = Math.round(num(recEl && recEl.value));
    return { disc: disc, rec: rec, mode: (document.getElementById('re-mode') || {}).value || E.t.mode || 'Cash', reason: String((document.getElementById('re-reason') || {}).value || '').trim(), orig: orig };
  }
  function paint() {
    var v = vals(), el = document.getElementById('re-tot'); if (!el) return;
    var diff = v.rec - num(E.t.amount);
    el.innerHTML = 'Charged ' + rs(E.orig) + (v.disc ? ' − discount ' + rs(v.disc) : '') + ' = <b>' + rs(E.orig - v.disc) + '</b><br>Received: <b>' + rs(v.rec) + '</b> ' + esc(v.mode)
      + (diff ? '<br><span style="color:' + (diff < 0 ? '#b42318' : '#1a8c3c') + ';font-weight:800">' + (diff < 0 ? 'Return ' + rs(-diff) + ' to the patient' : 'Collect ' + rs(diff) + ' more') + '</span>' : '')
      + (v.rec < E.orig - v.disc ? '<br><span style="color:#8a4200;font-weight:700">' + rs(E.orig - v.disc - v.rec) + ' will remain due</span>' : '');
  }
  window.bmhReceiptEditCan = isAdmin;
  window.bmhReceiptEditOpen = function (key) {
    if (!isAdmin()) { toast('Only admin can edit a receipt', 'w'); return; }
    var BH = window.bmhBillsHistory; if (!BH || !BH.findEntry) return;
    var e = BH.findEntry(key); if (!e || e.kind !== 'receipt' || e.adj || e.balance || !(e.txns || []).length) { toast('This receipt cannot be edited here', 'w'); return; }
    var t = e.txns[0];
    if (num(t.amount) < 0) { toast('Refunds cannot be edited', 'w'); return; }
    E = { e: e, t: t, day: String(t._day || dayOf(t.date || t.createdAt)), orig: num(t.originalAmount != null ? t.originalAmount : t.amount) + 0 };
    E.orig = num(t.originalAmount != null ? t.originalAmount : num(t.amount) + num(t.discount));
    var old = document.getElementById('re-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 're-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4700;background:rgba(10,20,40,.5);display:flex;align-items:flex-start;justify-content:center;padding:30px 12px;overflow:auto';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;width:min(520px,100%);padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="display:flex;align-items:center;gap:8px"><div style="flex:1"><div style="font-size:15px;font-weight:900;color:#1a3c6e">✏️ Edit receipt</div><div style="font-size:11.5px;color:#666">' + esc([t.patient, t.bmhId, E.day, t.service].filter(Boolean).join(' · ')) + '</div></div><button type="button" class="btn btn-outline btn-sm" onclick="bmhReceiptEditClose()">✕</button></div>'
      + '<div style="margin:10px 0;font-size:12.5px">Collected: <b>' + rs(t.amount) + '</b> ' + esc(t.mode || '') + (num(t.discount) ? ' · discount already ' + rs(t.discount) : '') + '</div>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:end">'
      + '<label style="font-size:11px;font-weight:800;color:#555">Discount ₹<br><input id="re-disc" type="number" min="0" value="' + esc(num(t.discount)) + '" style="width:110px"></label>'
      + '<label style="font-size:11px;font-weight:800;color:#555">Amount received ₹<br><input id="re-rec" type="number" min="0" value="' + esc(num(t.amount)) + '" style="width:120px"></label>'
      + '<label style="font-size:11px;font-weight:800;color:#555">Mode<br><select id="re-mode">' + MODES.concat(MODES.indexOf(t.mode) < 0 && t.mode ? [t.mode] : []).map(function (m) { return '<option' + (m === t.mode ? ' selected' : '') + '>' + esc(m) + '</option>'; }).join('') + '</select></label></div>'
      + '<div id="re-tot" style="margin:12px 0;padding:10px;background:#f6f8fb;border-radius:8px;font-size:12.5px;line-height:1.7"></div>'
      + '<label style="font-size:11px;font-weight:800;color:#555;display:block">Reason (required)<br><input id="re-reason" placeholder="e.g. ₹300 discount on OCT, approved by Dr Varun" style="width:100%"></label>'
      + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button type="button" class="btn btn-outline" onclick="bmhReceiptEditClose()">Cancel</button><button type="button" class="btn btn-gold" id="re-save" onclick="bmhReceiptEditSave()">💾 Save</button></div></div>';
    document.body.appendChild(ov);
    var d = document.getElementById('re-disc'), r = document.getElementById('re-rec');
    // a discount sets the amount received (charged − discount); the received amount can still be changed by hand
    d.oninput = function () { r.value = Math.max(0, E.orig - Math.max(0, Math.round(num(d.value)))); paint(); };
    r.oninput = paint; document.getElementById('re-mode').onchange = paint;
    paint();
  };
  window.bmhReceiptEditClose = close;
  window.bmhReceiptEditSave = function () {
    if (!E || !isAdmin() || !db()) return;
    var v = vals(), t = E.t;
    if (!v.reason) { toast('Enter the reason for the edit', 'w'); return; }
    if (v.disc > E.orig) { toast('Discount is more than the charge', 'w'); return; }
    var oldAmt = num(t.amount), oldDisc = num(t.discount), delta = v.rec - oldAmt, discDelta = v.disc - oldDisc;
    if (!delta && !discDelta && v.mode === t.mode) { toast('Nothing changed', 'i'); return; }
    var at = new Date().toISOString(), by = me().name || me().username || 'Admin', u = me();
    var tp = 'transactions/' + E.day + '/' + t.id, up = {};
    var patch = { amount: v.rec, mode: v.mode, discount: v.disc, originalAmount: E.orig, editedAt: at, editedBy: by, editReason: v.reason };
    var al = Array.isArray(t.chargeAllocations) ? t.chargeAllocations : (t.chargeAllocations ? Object.values(t.chargeAllocations) : []);
    if (al.length) {
      var sum = al.reduce(function (s, a) { return s + num(a && a.amount); }, 0) || 1, left = v.rec;
      patch.chargeAllocations = al.map(function (a, i) { var x = i === al.length - 1 ? left : Math.round(num(a.amount) * v.rec / sum); left -= x; return Object.assign({}, a, { amount: x }); });
    }
    Object.keys(patch).forEach(function (k) { up[tp + '/' + k] = patch[k]; });
    var hk = db().ref(tp + '/editHistory').push().key;
    up[tp + '/editHistory/' + hk] = { at: at, by: by, reason: v.reason, before: { amount: oldAmt, mode: t.mode || '', discount: oldDisc }, after: { amount: v.rec, mode: v.mode, discount: v.disc } };
    if (t.payRequestId) { up['payRequests/' + t.payRequestId + '/discount'] = v.disc; up['payRequests/' + t.payRequestId + '/finalAmount'] = E.orig - v.disc; up['payRequests/' + t.payRequestId + '/updatedAt'] = at; }
    var mc = db().ref('moneyChanges/' + today()).push().key;
    up['moneyChanges/' + today() + '/' + mc] = { at: at, by: by, role: u.role || '', txnId: String(t.id), receiptDay: E.day, bmhId: t.bmhId || '', patient: t.patient || '', service: String(t.service || '').slice(0, 120), dept: t.dept || '', centre: t.centre || '',
      what: ['Receipt edited (' + v.reason + ')'].concat(discDelta ? ['Discount ' + rs(oldDisc) + ' → ' + rs(v.disc)] : [], delta ? ['Received ' + rs(oldAmt) + ' → ' + rs(v.rec)] : [], v.mode !== t.mode ? ['Mode ' + (t.mode || '—') + ' → ' + v.mode] : []), from: oldAmt, to: v.rec, kind: 'receipt-edit' };
    var ak = db().ref('auditLog').push().key;
    up['auditLog/' + ak] = { user: by, role: u.role || '', action: 'RECEIPT_EDITED', item: (t.patient || '') + ' [' + (t.bmhId || '') + '] ' + t.id + ' · ' + (t.service || '') + ' · ' + rs(oldAmt) + ' → ' + rs(v.rec) + (v.disc ? ' (discount ' + rs(v.disc) + ')' : '') + ' · reason: ' + v.reason, timestamp: at };
    var btn = document.getElementById('re-save'); if (btn) { btn.disabled = true; btn.textContent = '⏳ Saving…'; }
    // the patient's charge line paid by this receipt
    var cp = t.bmhId ? 'financials/patientCharges/' + String(t.bmhId).replace(/[.#$\[\]\/]/g, '_') : '';
    (cp ? db().ref(cp).once('value').then(function (s) { return s.val(); }) : Promise.resolve(null)).then(function (lines) {
      if (lines) {
        Object.keys(lines).forEach(function (k) {
          var l = lines[k]; if (!l) return;
          var pa = Array.isArray(l.paymentAllocations) ? l.paymentAllocations : (l.paymentAllocations ? Object.values(l.paymentAllocations) : []);
          var ai = pa.findIndex(function (a) { return a && String(a.txnId) === String(t.id); });
          if (ai < 0 && String(l.ref || '') !== String(t.id)) return;
          var base = cp + '/' + k;
          if (ai >= 0) { var na = num(pa[ai].amount) + delta; up[base + '/paymentAllocations/' + ai + '/amount'] = Math.max(0, na); up[base + '/paymentAllocations/' + ai + '/mode'] = v.mode; }
          up[base + '/paidAmount'] = Math.max(0, num(l.paidAmount) + delta);
          if (discDelta) { up[base + '/discount'] = Math.max(0, num(l.discount) + discDelta); up[base + '/amount'] = Math.max(0, num(l.amount) - discDelta); }
          delta = 0; discDelta = 0; // only the first matching line
        });
      }
      return db().ref().update(up);
    }).then(function () {
      Object.assign(t, patch);
      try { var S = window.bmhBillsHistory.state; var rows = S && S.cache && S.cache.get(E.day); (rows || []).forEach(function (r) { if (r && r.id === t.id) Object.assign(r, patch); }); } catch (e) {}
      try { (window.TRANSACTIONS || []).forEach(function (r) { if (r && r.id === t.id) Object.assign(r, patch); }); } catch (e) {}
      try { if (E.day === today()) saveTodayTransactionsToLocal(); } catch (e) {}
      try { window._bmhReceptionFinancialDataDirty = true; } catch (e) {}
      toast('Receipt updated ✓ ' + rs(v.rec) + (v.disc ? ' (discount ' + rs(v.disc) + ')' : ''), 's');
      close();
      try { window.bmhBillsHistory.rerender(); } catch (e) {}
    }).catch(function (er) { toast('Could not save: ' + (er && er.message || 'error'), 'e'); if (btn) { btn.disabled = false; btn.textContent = '💾 Save'; } });
  };
})();
