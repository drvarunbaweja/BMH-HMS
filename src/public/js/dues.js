/* BMH — Previous balance (dues) after a part-paid bill.
 *  • A bill saved in Billing with a balance (net − TPA − paid − advance used) is put on the patient's dues list:
 *    patientDues/<bmhId>/items/<billId>. A later bill for the same service lines replaces the earlier one
 *    (part payments billed again), so a balance is never counted twice.
 *  • Reception: when an existing patient is filled in for a new entry / follow-up, a box shows the previous balance
 *    (and any advance with the hospital) with "Amount paid today", mode (split allowed) and receipt. A part payment
 *    leaves the rest on the list for next time. "Collect later" just closes it.
 *  • Queue (doctor + reception): a "Balance ₹…" badge against the name, click for details.
 *  • A balance payment is saved as a normal payment of the day (transactions/<day>, type 'due-payment'), so the
 *    day's collection includes it, plus patientDues/<bmhId>/payments/<id>. The original bill is not changed.
 *  • One-time pick-up of balances already sitting in saved bills (Nitishikaa and the test patient left out).
 * Off switch (this browser): localStorage.setItem('bmh_dues_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_dues_off') === '1') return; } catch (e) {}
  var SKIP_BACKFILL = { 'BMSH-498114': 1, 'BMSH-000051': 1 };
  var MODES = ['Cash', 'UPI', 'Card', 'Cheque', 'Bank transfer'];
  var D = {}, loaded = false, started = false;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ja(s) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
  function rs(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function num(v) { var n = Number(v); return isFinite(n) ? n : 0; }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function user() { try { return CURRENT_USER || {}; } catch (e) { return {}; } }
  function who() { return user().name || 'Staff'; }
  function role() { return String(user().role || '').toLowerCase(); }
  function isAdmin() { var u = user(); return !!(u.isAdmin || role() === 'admin'); }
  function canCollect() { return isAdmin() || role() === 'reception' || (typeof bmhCanOpenBilling === 'function' && bmhCanOpenBilling()); }
  function patient(id) { try { return (PATIENTS || []).find(function (p) { return p && p.bmhId === id; }) || null; } catch (e) { return null; } }
  function fmtD(v) { var d = new Date(v); return isNaN(d) ? String(v || '') : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
  function nowIso() { return new Date().toISOString(); }
  function itemsOf(rec) { return Object.keys((rec && rec.items) || {}).map(function (k) { var x = rec.items[k] || {}; x.id = x.id || k; return x; }); }
  function paysOf(rec) { return Object.keys((rec && rec.payments) || {}).map(function (k) { var x = rec.payments[k] || {}; x.id = x.id || k; return x; }).sort(function (a, b) { return String(a.at || '').localeCompare(String(b.at || '')); }); }
  function openItems(rec) { return itemsOf(rec).filter(function (i) { return !i.supersededBy && !i.void; }).sort(function (a, b) { return String(a.createdAt || '').localeCompare(String(b.createdAt || '')); }); }
  // what is still owed on each open bill: its balance at billing minus balance payments allocated to it
  function billRows(rec) {
    var pays = paysOf(rec), paidTo = {};
    pays.forEach(function (p) { var a = p.alloc || {}; Object.keys(a).forEach(function (k) { paidTo[k] = (paidTo[k] || 0) + num(a[k]); }); });
    return openItems(rec).map(function (i) { var start = Math.max(0, num(i.billed) - num(i.paidAtBill)); return { item: i, start: start, paidLater: paidTo[i.id] || 0, left: Math.max(0, start - (paidTo[i.id] || 0)) }; });
  }
  function balanceOf(id) { var rec = D[id]; if (!rec) return 0; return billRows(rec).reduce(function (s, r) { return s + r.left; }, 0); }
  function advanceOf(p) {
    if (!p) return 0;
    var a = 0; try { a = num(getQueueDisplayAdvanceBalance(p)); } catch (e) {}
    return Math.max(a, num(p.advance));
  }
  window.bmhDuesBalance = balanceOf;

  // ── data ──
  function start() {
    if (started || !window.FBDB) return; started = true;
    var ref = window.FBDB.ref('patientDues');
    var put = function (s) { if (s.key === '_meta') return; D[s.key] = s.val() || {}; loaded = true; rerender(); };
    ref.on('child_added', put); ref.on('child_changed', put);
    ref.on('child_removed', function (s) { delete D[s.key]; rerender(); });
    ref.once('value').then(function () { loaded = true; rerender(); backfill(); }).catch(function () {});
  }
  var rt = null;
  function rerender() { clearTimeout(rt); rt = setTimeout(function () { try { renderDocQueue && renderDocQueue({ immediate: true }); } catch (e) {} try { typeof renderReceptionQueue === 'function' && renderReceptionQueue(); } catch (e) {} }, 300); }
  function billBalance(b) { return Math.max(0, num(b.netPayable) - num(b.tpaAmount) - num(b.amountReceived) - num(b.advanceApplied)); }
  function lineKeys(items) { return (Array.isArray(items) ? items : []).map(function (i) { return i && (i.lineId || String(i.desc || '').trim().toLowerCase()); }).filter(Boolean); }
  function itemFromBill(b) {
    var items = Array.isArray(b.items) ? b.items : [];
    return { id: String(b.id || b.billNo), billId: String(b.id || ''), billNo: String(b.billNo || b.id || ''), date: b.createdAt || b.date || nowIso(), createdAt: b.createdAt || nowIso(),
      desc: items.map(function (i) { return i && i.desc; }).filter(Boolean).join(', ').slice(0, 200) || 'Bill', lines: lineKeys(items),
      billed: Math.max(0, num(b.netPayable) - num(b.tpaAmount)), paidAtBill: num(b.amountReceived) + num(b.advanceApplied),
      centre: b.centre || '', dept: b.dept || '', by: b.createdBy || who() };
  }
  // a bill was saved in Billing
  function onBillSaved(b) {
    if (!b || !window.FBDB) return;
    var id = b.bmhId; if (!id || String(b.status || '').toLowerCase() === 'void') return;
    var key = String(b.id || b.billNo || ''); if (!key) return;
    var rec = D[id] || {}, up = {}, lines = lineKeys(b.items);
    // same service lines billed again (part payments taken through Billing) → the newer bill replaces the older one
    openItems(rec).forEach(function (i) { if (i.id !== key && (i.lines || []).some(function (l) { return lines.indexOf(l) >= 0; })) up['patientDues/' + id + '/items/' + i.id + '/supersededBy'] = key; });
    var bal = billBalance(b);
    if (bal > 0 || (rec.items && rec.items[key])) {
      var it = itemFromBill(b);
      up['patientDues/' + id + '/items/' + key] = it;
      up['patientDues/' + id + '/name'] = b.patientName || (patient(id) || {}).name || '';
      up['patientDues/' + id + '/updatedAt'] = nowIso();
    }
    if (Object.keys(up).length) { applyLocal(up); window.FBDB.ref().update(up).catch(function (e) { console.warn('[dues] save', e); }); rerender(); }
  }
  // show at once on this computer (the live listener brings the same values back)
  function applyLocal(up) {
    Object.keys(up).forEach(function (path) {
      var parts = path.split('/').slice(1); if (!parts.length || parts[0] === '_meta') return;
      var o = D; for (var i = 0; i < parts.length - 1; i++) { o[parts[i]] = o[parts[i]] && typeof o[parts[i]] === 'object' ? o[parts[i]] : {}; o = o[parts[i]]; }
      o[parts[parts.length - 1]] = up[path];
    });
  }
  // balances already in saved bills before this was added (once)
  function backfill() {
    if (!window.FBDB) return;
    window.FBDB.ref('patientDues/_meta/backfilledAt').once('value').then(function (s) {
      if (s.val()) return;
      return window.FBDB.ref('savedBills').once('value').then(function (sb) {
        var bills = Object.values(sb.val() || {}).filter(function (b) { return b && b.bmhId && !SKIP_BACKFILL[b.bmhId] && String(b.status || '').toLowerCase() !== 'void'; })
          .sort(function (a, b) { return String(a.createdAt || '').localeCompare(String(b.createdAt || '')); });
        var by = {}; bills.forEach(function (b) { (by[b.bmhId] = by[b.bmhId] || []).push(b); });
        var up = {}, n = 0;
        Object.keys(by).forEach(function (id) {
          var list = by[id], kept = [];
          list.forEach(function (b) { var ls = lineKeys(b.items); kept = kept.filter(function (k) { return !k.lines.some(function (l) { return ls.indexOf(l) >= 0; }); }); kept.push({ b: b, lines: ls }); });
          kept.forEach(function (k) {
            if (billBalance(k.b) <= 0) return;
            var it = itemFromBill(k.b);
            if (D[id] && D[id].items && D[id].items[it.id]) return;
            up['patientDues/' + id + '/items/' + it.id] = it; up['patientDues/' + id + '/name'] = k.b.patientName || ''; up['patientDues/' + id + '/updatedAt'] = nowIso(); n++;
          });
        });
        up['patientDues/_meta/backfilledAt'] = nowIso(); up['patientDues/_meta/backfilledBy'] = who();
        return window.FBDB.ref().update(up).then(function () { if (n) console.info('[dues] picked up ' + n + ' earlier balance(s)'); });
      });
    }).catch(function (e) { console.warn('[dues] backfill', e); });
  }

  // ── queue badge ──
  window.bmhDuesBadge = function (p, compact) {
    if (!p || !p.bmhId) return '';
    var bal = balanceOf(p.bmhId); if (!(bal > 0)) return '';
    var st = compact ? 'display:inline-flex;align-items:center;background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;border-radius:10px;padding:1px 6px;font-size:9px;font-weight:900;cursor:pointer;margin-right:3px'
      : 'font-size:10px;color:#b42318;font-weight:900;cursor:pointer;margin-right:4px';
    return '<span title="Previous balance — click for details" onclick="event.stopPropagation();bmhDuesOpen(\'' + ja(p.bmhId) + '\')" style="' + st + '">⚠ Balance ' + rs(bal) + '</span>';
  };

  // ── pop-up ──
  function close() { var o = document.getElementById('bmh-dues'); if (o) o.remove(); }
  window.bmhDuesOpen = function (id, opts) {
    opts = opts || {};
    var go = function () {
      var rec = D[id] || {}, p = patient(id) || { bmhId: id, name: rec.name || '' };
      var rows = billRows(rec).filter(function (r) { return r.left > 0; }), bal = rows.reduce(function (s, r) { return s + r.left; }, 0), adv = advanceOf(p);
      if (!(bal > 0) && !(adv > 0)) { if (!opts.silent) toast('No previous balance for ' + (p.name || id), 's'); return; }
      close();
      var ov = document.createElement('div'); ov.id = 'bmh-dues';
      ov.style.cssText = 'position:fixed;inset:0;z-index:4950;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:12px';
      var can = canCollect() && bal > 0;
      var modeSel = function (idn, sel) { return '<select id="' + idn + '" style="width:auto;flex:0 0 auto;padding:7px;border:1px solid #cfd6e2;border-radius:8px">' + MODES.map(function (m) { return '<option' + (m === sel ? ' selected' : '') + '>' + m + '</option>'; }).join('') + '</select>'; };
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:520px;width:100%;max-height:90vh;overflow:auto;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
        + '<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div><div style="font-size:16px;font-weight:900;color:' + (bal > 0 ? '#b42318' : '#0B5FA5') + '">' + (bal > 0 ? '⚠ Previous balance' : '💙 Advance with the hospital') + '</div>'
        + '<div style="font-size:12px;color:#555;margin-top:2px"><b>' + esc(p.name || '') + '</b> · ' + esc(id) + '</div></div><button type="button" class="btn btn-xs btn-gray" id="bmh-dues-x">✕</button></div>'
        + (rows.length ? '<div style="margin-top:10px;border:1px solid #f1d0cc;border-radius:10px;overflow:hidden">' + rows.map(function (r) {
          return '<div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;padding:8px 10px;border-bottom:1px solid #f6e3e1;font-size:12px;background:#fffafa">'
            + '<div><div style="font-weight:800">' + esc(r.item.desc) + '</div><div style="font-size:10.5px;color:#777">' + esc([r.item.billNo, fmtD(r.item.date)].filter(Boolean).join(' · ')) + '</div>'
            + '<div style="font-size:10.5px;color:#555">Bill ' + rs(r.item.billed) + ' · paid ' + rs(num(r.item.paidAtBill) + r.paidLater) + '</div></div>'
            + '<div style="font-weight:900;color:#b42318;white-space:nowrap">' + rs(r.left) + '</div></div>';
        }).join('') + '<div style="display:flex;justify-content:space-between;padding:8px 10px;font-weight:900;font-size:13.5px"><span>Total previous balance</span><span style="color:#b42318">' + rs(bal) + '</span></div></div>' : '')
        + (adv > 0 ? '<div style="margin-top:8px;padding:8px 10px;border:1px solid #bfdbfe;background:#eff6ff;border-radius:10px;font-size:12.5px;color:#0B5FA5;font-weight:800">💙 Advance with the hospital: ' + rs(adv) + (bal > 0 ? ' <span style="font-weight:600;color:#555">(can be adjusted in Billing)</span>' : '') + '</div>' : '')
        + (can ? '<div style="margin-top:12px;display:grid;gap:8px">'
          + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><label style="font-size:12px;font-weight:800;min-width:150px">Amount paid today</label><input id="bmh-dues-amt" type="number" min="0" step="1" value="' + Math.round(bal) + '" style="width:120px;padding:7px;border:1px solid #cfd6e2;border-radius:8px;font-weight:900">' + modeSel('bmh-dues-mode', 'Cash') + '<input id="bmh-dues-ref" placeholder="Ref / UTR" style="width:110px;padding:7px;border:1px solid #cfd6e2;border-radius:8px"></div>'
          + '<div id="bmh-dues-split" style="display:none;gap:8px;align-items:center;flex-wrap:wrap"><label style="font-size:12px;font-weight:800;min-width:150px">Second payment mode</label><input id="bmh-dues-amt2" type="number" min="0" step="1" value="0" style="width:120px;padding:7px;border:1px solid #cfd6e2;border-radius:8px;font-weight:900">' + modeSel('bmh-dues-mode2', 'UPI') + '<input id="bmh-dues-ref2" placeholder="Ref / UTR" style="width:110px;padding:7px;border:1px solid #cfd6e2;border-radius:8px"></div>'
          + '<div><a href="#" id="bmh-dues-addsplit" style="font-size:11.5px">+ split between two modes</a></div>'
          + '<div id="bmh-dues-left" style="font-size:13px;font-weight:900"></div></div>'
          + '<div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;margin-top:12px"><button type="button" class="btn btn-gray btn-sm" id="bmh-dues-later">Collect later</button><button type="button" class="btn btn-outline btn-sm" id="bmh-dues-save">Save</button><button type="button" class="btn btn-gold btn-sm" id="bmh-dues-print">Save &amp; print receipt</button></div>'
          : '<div style="display:flex;justify-content:flex-end;margin-top:12px"><button type="button" class="btn btn-gold btn-sm" id="bmh-dues-later">OK</button></div>')
        + '</div>';
      document.body.appendChild(ov);
      var g = function (k) { return document.getElementById(k); };
      g('bmh-dues-x').onclick = close; g('bmh-dues-later').onclick = close;
      ov.onclick = function (e) { if (e.target === ov) close(); };
      if (!can) return;
      var paidNow = function () { return Math.max(0, num(g('bmh-dues-amt').value)) + (g('bmh-dues-split').style.display === 'none' ? 0 : Math.max(0, num(g('bmh-dues-amt2').value))); };
      var upd = function () { var pn = paidNow(), left = bal - pn; g('bmh-dues-left').innerHTML = left > 0 ? '<span style="color:#b45309">Still to pay after today: ' + rs(left) + '</span>' : (left < 0 ? '<span style="color:#b42318">More than the balance by ' + rs(-left) + '</span>' : '<span style="color:#15803d">Balance fully paid ✓</span>'); };
      ['bmh-dues-amt', 'bmh-dues-amt2'].forEach(function (k) { g(k).oninput = upd; });
      g('bmh-dues-addsplit').onclick = function (e) { e.preventDefault(); g('bmh-dues-split').style.display = 'flex'; this.style.display = 'none'; upd(); };
      upd();
      var save = function (print) {
        var parts = [{ amount: Math.max(0, Math.round(num(g('bmh-dues-amt').value))), mode: g('bmh-dues-mode').value, ref: g('bmh-dues-ref').value.trim() }];
        if (g('bmh-dues-split').style.display !== 'none') parts.push({ amount: Math.max(0, Math.round(num(g('bmh-dues-amt2').value))), mode: g('bmh-dues-mode2').value, ref: g('bmh-dues-ref2').value.trim() });
        parts = parts.filter(function (x) { return x.amount > 0; });
        var total = parts.reduce(function (s, x) { return s + x.amount; }, 0);
        if (!(total > 0)) { toast('Enter the amount paid today', 'w'); return; }
        if (total > bal) { toast('Amount is more than the balance (' + rs(bal) + ')', 'w'); return; }
        if (!confirm('Record ' + rs(total) + ' paid today against the previous balance of ' + rs(bal) + '?' + (total < bal ? '\n\n' + rs(bal - total) + ' will remain for next time.' : ''))) return;
        record(id, p, rows, parts, total, bal, print);
        close();
      };
      g('bmh-dues-save').onclick = function () { save(false); };
      g('bmh-dues-print').onclick = function () { save(true); };
    };
    if (loaded || D[id]) go();
    else if (window.FBDB) window.FBDB.ref('patientDues/' + id).once('value').then(function (s) { if (s.val()) D[id] = s.val(); go(); }).catch(go);
    else go();
  };
  function record(id, p, rows, parts, total, bal, print) {
    var at = nowIso(), payId = 'DP' + Date.now() + Math.random().toString(36).slice(2, 5), alloc = {}, rem = total;
    rows.forEach(function (r) { if (rem <= 0) return; var a = Math.min(rem, r.left); if (a > 0) { alloc[r.item.id] = a; rem -= a; } });
    var billNos = rows.filter(function (r) { return alloc[r.item.id]; }).map(function (r) { return r.item.billNo; }).join(', ');
    var desc = rows.filter(function (r) { return alloc[r.item.id]; }).map(function (r) { return r.item.desc; }).join(', ');
    var centre = ''; try { centre = (typeof getEffectiveCentre === 'function' && getEffectiveCentre()) || p.centre || user().centre || ''; } catch (e) { centre = p.centre || ''; }
    if (centre === 'BOTH' || centre === 'ALL') centre = p.centre || '';
    var src = role() === 'reception' ? 'reception' : 'billing';
    // one payment row per (mode, bill), linked to the original bill (billId) so Billing counts it as a payment
    // against that bill — not as a new bill
    var queue = rows.filter(function (r) { return alloc[r.item.id]; }).map(function (r) { return { r: r, left: alloc[r.item.id] }; });
    var txns = [], n = 0, bi = 0;
    parts.forEach(function (x) {
      var amt = x.amount;
      while (amt > 0 && bi < queue.length) {
        var q = queue[bi], use = Math.min(amt, q.left), it = q.r.item;
        txns.push({ id: 'TXNDUE' + Date.now() + (n++), patient: p.name || '', bmhId: id, service: 'Balance payment — ' + (it.desc || 'previous bill'), for: 'Balance payment · Bill ' + it.billNo,
          amount: use, mode: x.mode, paymentRef: x.ref || '', dept: it.dept || p.dept || 'ophtho', centre: centre,
          date: at, createdAt: at, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), source: src, type: 'due-payment',
          billId: it.billId || it.id, billNo: it.billNo, duePaymentId: payId, collected: true, createdBy: who() });
        amt -= use; q.left -= use; if (q.left <= 0) bi++;
      }
    });
    txns.forEach(function (t) { try { saveTransactionToFirebase(t); } catch (e) { console.warn('[dues] txn', e); } });
    var pay = { id: payId, at: at, amount: total, parts: parts, alloc: alloc, by: who(), centre: centre, balanceBefore: bal, balanceAfter: Math.max(0, bal - total), txnIds: txns.map(function (t) { return t.id; }) };
    D[id] = D[id] || {}; D[id].payments = D[id].payments || {}; D[id].payments[payId] = pay;
    var up = {}; up['patientDues/' + id + '/payments/' + payId] = pay; up['patientDues/' + id + '/updatedAt'] = at;
    window.FBDB.ref().update(up).catch(function (e) { console.warn('[dues] pay', e); toast('Balance payment could not be saved — check connection', 'w'); });
    toast('✓ ' + rs(total) + ' received' + (bal - total > 0 ? ' · ' + rs(bal - total) + ' still due' : ' · balance cleared'), 's');
    rerender();
    if (print) {
      try {
        printPaymentReceipt({ id: payId, bmhId: id, patient: p.name || '', amount: total, date: at, mode: parts.map(function (x) { return x.mode + (parts.length > 1 ? ' ' + rs(x.amount) : ''); }).join(' + '),
          paymentRef: parts.map(function (x) { return x.ref; }).filter(Boolean).join(', '), service: 'Balance payment',
          for: 'Balance payment against bill ' + billNos + ' · Previous balance ' + rs(bal) + ' · Paid now ' + rs(total) + ' · Remaining ' + rs(Math.max(0, bal - total)) });
      } catch (e) { console.warn('[dues] receipt', e); }
    }
  }

  // ── wiring ──
  var origRec = window.bmhRecordBillingCollection;
  if (typeof origRec === 'function') window.bmhRecordBillingCollection = function (savedBill, billData) {
    var r = origRec.apply(this, arguments);
    try { var b = Object.assign({}, billData || {}, savedBill || {}); if (!b.items && billData) b.items = billData.items; onBillSaved(b); } catch (e) { console.warn('[dues]', e); }
    return r;
  };
  var origPrefill = window.prefillExistingPatient;
  if (typeof origPrefill === 'function') window.prefillExistingPatient = function (bmhId) {
    var r = origPrefill.apply(this, arguments);
    try { start(); setTimeout(function () { window.bmhDuesOpen(bmhId, { silent: true, from: 'reception' }); }, 350); } catch (e) {}
    return r;
  };
  var tries = 0, iv = setInterval(function () { if (window.FBDB && (function () { try { return !!(CURRENT_USER && CURRENT_USER.name); } catch (e) { return false; } })()) { clearInterval(iv); start(); } else if (++tries > 120) clearInterval(iv); }, 1000);
})();
