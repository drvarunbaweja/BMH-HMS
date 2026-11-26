/* BMH — one set of money heads for the reports: Consultations · Investigations · Surgeries · Procedures · Medicines · Other.
 * Used by Reception → Charges (one centre or both), the admin Dashboard, Review bills and the department day print.
 *   Consultations  — every kind of consultation: new, follow-up, no fee, registration, emergency, ANC.
 *   Investigations — tests and lab (charges marked Investigation / Diagnostic / Lab, OCT, fields, EEG …).
 *   Surgeries      — charges marked "Surgery" in Settings → Charges and the operations in the OT list
 *                    (PMICS / IOL, LSCS, delivery, laparoscopy, hysteroscopy, DCR, squint, vitrectomy …) and intravitreal injections.
 *   Procedures     — everything saved as a Procedure / Laser in Charges: drips, injections, YAG, MTP, Copper-T, peels …
 *   Medicines      — medicines, pharmacy and stock given to the patient (e.g. Skin "medicines").
 * Reports only: what is saved on a bill or receipt does not change.
 * Off switch (this browser): localStorage.setItem('bmh_report_heads_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_report_heads_off') === '1') return; } catch (e) {}
  var CONSULT = /consult|follow[\s-]*up|registration|no[\s-]*fee|\bopd\b|first\s*visit|\banc\s*visit|emergency\s*(?:visit|charge|consult)?$|^emergency$|^review$|^post[\s-]*op\s*(?:review|visit)?$/i;
  var MEDICINE = /medicine|pharmacy|tablet|\btabs?\b|\bcaps?\b|capsule|cream|lotion|ointment|syrup|sunscreen|shampoo|\bsoap\b|serum|\bgel\b|\bdrops?\b|eye\s*drop|consumable|inventory\s*use|\(inventory use\)/i;
  var INVEST = /\boct\b|hvf|fundus|biomet|visual\s*field|perimetry|\bcbc\b|\bhb\b|thyroid|lipid|\blab\b|investigation|diagnostic|\berg\b|\bvep\b|\beeg\b|\becg\b|topograph|specular|pachymetry|gonioscopy|b-?\s*scan|ultra\s*sound|\busg\b|\bscan\b|\bffa\b|\bicg\b|angiograph|schirmer|tbut|aberrometry|i\.?\s*o\.?\s*l\.?\s*master|iol\s*master|lenstar|pentacam|\bubm\b|x-?ray|blood|urine|culture|\btest\b|psychology\s*testing/i;
  var SURGERY = /surgery|surgical|cataract|phaco|pmics|\bsics\b|\biol\b|implantation|vitrectomy|\bicl\b|collamer|keratoplasty|trabeculectomy|pterygium|\bdcr\b|dacryo|ptosis|squint|strabismus|\blscs\b|caesar|c-?\s*section|hysterectomy|laparoscop|hysteroscop|cerclage|delivery|myomectomy|tubectomy|tubal\s*ligation|\bot\s*charges|theatre\s*charges|buckle|retinal\s*detachment/i;
  var IVT = /intravitreal|\bivt\b|anti[\s-]*vegf|ranibizumab|bevacizumab|avastin|aflibercept|eylea|faricimab|brolucizumab|ozurdex|accentrix|razumab/i;
  var OTHER = /certificate|\bfile\b|card\s*charge|\badvance|refund|deposit|balance\s*payment/i;
  function low(s) { return String(s == null ? '' : s).trim(); }
  function norm(s) { return low(s).toLowerCase().replace(/[-–—:+()\/]/g, ' ').replace(/\s+/g, ' ').trim(); }
  var idx = null, idxN = -1, memo = {};
  function index() {
    var rows = []; try { rows = (window.CHARGES_DATA || (typeof CHARGES_DATA !== 'undefined' ? CHARGES_DATA : [])) || []; } catch (e) { rows = []; }
    if (idx && idxN === rows.length) return idx;
    idx = {}; idxN = rows.length; memo = {};
    rows.forEach(function (r) {
      if (!r) return;
      var n = norm(r.name), p = norm(r.parent);
      if (n) { idx[n] = idx[n] || r; if (p) idx[p + ' ' + n] = r; }
      if (p && !idx[p]) idx[p] = { kind: r.kind, cat: r.cat, name: r.parent, parent: '' };
    });
    return idx;
  }
  function kindHead(r) {
    if (!r) return '';
    var k = String(r.kind || '').toLowerCase(), c = String(r.cat || '').toLowerCase();
    if (k === 'surgery') return 'surgery';
    if (k === 'medicine' || k === 'pharmacy') return 'medicine';
    if (k === 'lab' || k === 'diagnostic' || k === 'investigation' || c === 'lab') return 'investigation';
    if (k === 'consultation') return 'consultation';
    if (k === 'procedure' || k === 'laser' || k === 'minor') return 'procedure';
    if (k === 'room') return 'other';
    return ''; // old rows whose kind is just the department — decided by the name
  }
  function head(text) {
    var t = low(text); if (!t) return 'other';
    var I = index(), key = t.toLowerCase(); if (memo[key]) return memo[key];
    var out = (function () {
      var s = t.replace(/\s*\(inventory use\)\s*$/i, '');
      if (/\(inventory use\)/i.test(t)) return 'medicine';
      if (OTHER.test(s)) return 'other';
      if (CONSULT.test(s)) return 'consultation';
      if (IVT.test(s)) return 'surgery'; // intravitreal injections count as surgeries
      if (MEDICINE.test(s) && !/drip|injection|\binj\b/i.test(s)) return 'medicine';
      var n = norm(s), row = I[n];
      if (!row) { var parts = s.split(/\s+[—–-]\s+|\s*:\s+/); if (parts.length > 1) row = I[norm(parts.slice(1).join(' '))] || I[norm(parts[0])]; }
      if (row && IVT.test(String(row.parent || ''))) return 'surgery';
      var k = kindHead(row);
      if (k === 'procedure' && /delivery|\blscs\b|caesar/i.test(s)) return 'surgery';
      if (k) return k;
      if (INVEST.test(s)) return 'investigation';
      if (SURGERY.test(s)) return 'surgery';
      return 'procedure';
    })();
    memo[key] = out;
    return out;
  }
  var RANK = { surgery: 6, procedure: 5, medicine: 4, investigation: 3, consultation: 2, other: 1 };
  function pick(list) { return list.reduce(function (m, h) { return (RANK[h] || 0) > (RANK[m] || 0) ? h : m; }, ''); }
  // a receipt: balance / advance first; then the bill lines it paid; then what it was for
  function txnHead(t) {
    if (!t) return 'other';
    var type = String(t.type || '').toLowerCase();
    if (type === 'due-payment') return 'balance';
    if (type === 'advance' || type === 'advance-adjustment' || t.isRefund) return 'advance';
    var lines = [];
    (Array.isArray(t.chargeAllocations) ? t.chargeAllocations : []).forEach(function (a) { if (a && (a.desc || a.name)) lines.push(a.desc || a.name); });
    var svc = t.service || t.for || t.desc || '';
    var heads = lines.map(head);
    if (!heads.length && svc) heads = String(svc).split(/\s*[,;+]\s*(?=[A-Za-z])/).filter(Boolean).map(head);
    var h = pick(heads);
    if (!h || h === 'other') {
      var bc = Array.isArray(t.billCats) ? t.billCats : (t.billCats && typeof t.billCats === 'object' ? Object.values(t.billCats) : []);
      bc = bc.map(function (c) { return String(c || '').toLowerCase(); });
      if (bc.indexOf('consultation') >= 0) return 'consultation';
      if (bc.indexOf('diagnostic') >= 0) return 'investigation';
    }
    return h || 'other';
  }
  function net(t) { try { return Number(getNetTransactionAmount(t)) || 0; } catch (e) { return Number(t && t.amount) || 0; } }
  // a receipt that paid lines of different heads (e.g. consultation + medicines) is split by what it paid for each line
  function parts(t) {
    var total = net(t), h0 = txnHead(t);
    if (h0 === 'balance' || h0 === 'advance') return [{ head: h0, amount: total }];
    var al = (Array.isArray(t.chargeAllocations) ? t.chargeAllocations : []).filter(function (a) { return a && (a.desc || a.name) && Number(a.amount) > 0; });
    if (al.length < 2 || !(total > 0)) return [{ head: h0, amount: total }];
    var by = {}, sum = 0;
    al.forEach(function (a) { var h = head(a.desc || a.name), v = Number(a.amount) || 0; by[h] = (by[h] || 0) + v; sum += v; });
    var keys = Object.keys(by); if (keys.length < 2 || !(sum > 0)) return [{ head: h0, amount: total }];
    var out = [], left = total;
    keys.sort(function (a, b) { return (RANK[b] || 0) - (RANK[a] || 0); }).forEach(function (h, i) {
      var v = i === keys.length - 1 ? left : Math.round(total * by[h] / sum); left -= v; out.push({ head: h, amount: v });
    });
    return out;
  }
  // receipts as rows per head: a split receipt appears once under each head, with that head's part as its amount
  function splitTxns(list) {
    var out = [];
    (list || []).forEach(function (t) {
      if (!t) return;
      var p = parts(t);
      if (p.length === 1) { var c = Object.assign({}, t); c._head = p[0].head; out.push(c); return; }
      p.forEach(function (x) { var c = Object.assign({}, t); c._head = x.head; c.amount = x.amount; c._recoveredConsultationAmount = 0; c._part = true; out.push(c); });
    });
    return out;
  }
  window.bmhTxnParts = parts;
  window.bmhSplitTxns = splitTxns;
  window.bmhReportHead = head;
  window.bmhTxnHead = txnHead;
  window.bmhReportHeadLabels = { consultation: 'Consultations', investigation: 'Investigations', surgery: 'Surgeries', procedure: 'Procedures', medicine: 'Medicines', other: 'Other', balance: 'Balance payments', advance: 'Advances' };
})();
