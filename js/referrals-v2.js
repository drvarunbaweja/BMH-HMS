/* BMH — Referrals, redesigned.
 * Reports → Referrals (shown only after the 6-digit reports PIN): each referrer with the patients they referred indented
 * under them, a tick box per patient (saved for everyone at referralTicks/), and for each patient only the surgeries and
 * investigations with their cost (consultations / follow-ups left out). The old incentive-payment boxes are removed.
 * Settings → Referrers: every referral name already used at reception, with address, phone, e-mail and alternate mobile
 * (saved at referrerDirectory/).
 * Off switch (this browser): localStorage.setItem('bmh_referrals_v2_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_referrals_v2_off') === '1') return; } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function rs(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function key(s) { try { return sanitizeFirebaseKey(String(s || '').trim().toLowerCase()); } catch (e) { return String(s || '').trim().toLowerCase().replace(/[.#$\[\]\/]/g, '_'); } }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function me() { try { return CURRENT_USER || {}; } catch (e) { return {}; } }
  function ref(p) { return window.FBDB ? window.FBDB.ref(p) : null; }
  var DIR = {}, TICKS = {}, SOURCES = [];
  function loadShared() {
    var a = ref('referrerDirectory'), b = ref('referralTicks'), c = ref('settings/referralSources');
    return Promise.all([a ? a.once('value').then(function (s) { DIR = s.val() || {}; }).catch(function () {}) : null, b ? b.once('value').then(function (s) { TICKS = s.val() || {}; }).catch(function () {}) : null,
      c ? c.once('value').then(function (s) { var v = s.val(); SOURCES = v && Array.isArray(v.list) ? v.list : []; }).catch(function () {}) : null]);
  }

  // ── what each referred patient had done: surgeries and investigations only ──
  function lineCat(desc) {
    var d = String(desc || '');
    var c = 'other'; try { c = inferChargeCategoryFromService(d); } catch (e) {}
    try { if (c !== 'diagnostic' && isLikelySurgeryChargeLabel(d)) c = 'surgery'; } catch (e) {}
    if (c === 'diagnostic') return 'Investigation';
    if (c === 'surgery') return 'Surgery';
    if (c === 'consultation' || /consult|follow|registration|review|camp patient|post-?op|no fee|check in/i.test(d)) return '';
    return 'Procedure';
  }
  function itemsOf(txns) {
    var by = {};
    txns.forEach(function (t) {
      var allocs = Array.isArray(t.chargeAllocations) ? t.chargeAllocations.filter(function (a) { return a && Number(a.amount) > 0; }) : [];
      var lines = allocs.length ? allocs.map(function (a) { return { desc: a.desc || a.name || '', amount: Number(a.amount) || 0 }; })
        : [{ desc: t.service || t.for || t.desc || '', amount: (function () { try { return getNetTransactionAmount(t); } catch (e) { return Number(t.amount) || 0; } })() }];
      lines.forEach(function (l) {
        var cat = lineCat(l.desc); if (!cat || !(l.amount > 0)) return;
        var k = cat + '|' + String(l.desc).trim().toLowerCase();
        var o = by[k] || (by[k] = { cat: cat, desc: String(l.desc).trim() || cat, amount: 0 });
        o.amount += l.amount;
      });
    });
    var order = { Surgery: 0, Investigation: 1, Procedure: 2 };
    return Object.keys(by).map(function (k) { return by[k]; }).sort(function (a, b) { return order[a.cat] - order[b.cat] || b.amount - a.amount; });
  }
  // rows from the existing report filters, each with its own surgery / investigation lines
  function rowsWithItems() {
    var rows = getReferralReportRows();
    var fromVal = (document.getElementById('rep-ref-from') || {}).value || '', toVal = (document.getElementById('rep-ref-to') || {}).value || '';
    var pool = Array.isArray(window._bmhReferralTxns) ? window._bmhReferralTxns : (window.TRANSACTIONS || []);
    rows.forEach(function (r) {
      var tx = pool.filter(function (t) {
        if (!t || t.bmhId !== r.bmhId || t.collected === false) return false;
        if (t.type === 'advance-adjustment' || t.source === 'advance-adjustment') return false;
        var d = String(t._day || ''); if (!d) { try { d = localDateKey(t.date || t.createdAt); } catch (e) {} }
        return (!fromVal || d >= fromVal) && (!toVal || d <= toVal);
      });
      r.items = itemsOf(tx);
      r.surg = r.items.filter(function (i) { return i.cat === 'Surgery'; }).reduce(function (s, i) { return s + i.amount; }, 0);
      r.inv = r.items.filter(function (i) { return i.cat === 'Investigation'; }).reduce(function (s, i) { return s + i.amount; }, 0);
      r.proc = r.items.filter(function (i) { return i.cat === 'Procedure'; }).reduce(function (s, i) { return s + i.amount; }, 0);
    });
    var groups = {};
    rows.forEach(function (r) { var g = groups[r.referredBy] || (groups[r.referredBy] = { name: r.referredBy, rows: [], surg: 0, inv: 0, proc: 0 }); g.rows.push(r); g.surg += r.surg; g.inv += r.inv; g.proc += r.proc; });
    return Object.keys(groups).sort(function (a, b) { return a.localeCompare(b); }).map(function (k) { return groups[k]; });
  }
  function contact(name) { var d = DIR[key(name)] || {}; return [d.phone, d.phone2, d.email, d.address].filter(Boolean).join(' · '); }
  function ticked(name, id) { var t = TICKS[key(name)]; return !!(t && t[key(id)]); }
  window.bmhReferralTick = function (enc, id, on) {
    var name = decodeURIComponent(enc), k = key(name), pk = key(id), r = ref('referralTicks/' + k + '/' + pk); if (!r) { toast('Not connected', 'w'); return; }
    var p = on ? r.set({ by: me().name || '', at: new Date().toISOString() }) : r.remove();
    p.then(function () { TICKS[k] = TICKS[k] || {}; if (on) TICKS[k][pk] = true; else delete TICKS[k][pk]; }).catch(function () { toast('Could not save the tick', 'w'); });
  };
  function itemsHtml(r) {
    if (!r.items.length) return '<span style="color:var(--g1)">No surgery or investigation billed in these dates</span>';
    return r.items.map(function (i) { return '<span style="display:inline-block;margin:1px 10px 1px 0"><b style="color:' + (i.cat === 'Surgery' ? '#1a8c3c' : i.cat === 'Investigation' ? '#0b6bcb' : '#8a5a00') + '">' + i.cat + ':</b> ' + esc(i.desc) + ' <b>' + rs(i.amount) + '</b></span>'; }).join('');
  }
  function screenHtml(groups) {
    var n = groups.reduce(function (s, g) { return s + g.rows.length; }, 0);
    var S = groups.reduce(function (s, g) { return s + g.surg; }, 0), I = groups.reduce(function (s, g) { return s + g.inv; }, 0), P = groups.reduce(function (s, g) { return s + g.proc; }, 0);
    var card = function (l, v, c) { return '<div style="background:' + c + ';border-radius:10px;padding:10px;text-align:center"><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--g1)">' + l + '</div><div style="font-size:20px;font-weight:900">' + v + '</div></div>'; };
    return '<div class="card"><div class="card-hd"><div><div class="card-title">👨‍⚕️ Referral Report</div><div class="card-sub">' + groups.length + ' referrers · ' + n + ' patients · consultations and follow-ups are not counted</div></div><button class="btn btn-outline btn-xs" type="button" onclick="printReferralReportCurrent()">🖨️ Print</button></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:12px">' + card('Referred patients', n, 'var(--blue-lt)') + card('Surgery', rs(S), 'var(--green-lt)') + card('Investigations', rs(I), '#e8f1fb') + (P ? card('Other procedures', rs(P), '#fff4e0') : '') + '</div>'
      + (groups.length ? groups.map(function (g) {
        var enc = encodeURIComponent(g.name), c = contact(g.name);
        return '<div style="border:1px solid var(--g4);border-radius:12px;margin-bottom:10px;overflow:hidden">'
          + '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline;padding:9px 12px;background:var(--g6)"><div><span style="font-size:14.5px;font-weight:900;color:var(--blue)">' + esc(g.name) + '</span>' + (c ? '<span style="font-size:11px;color:var(--g1);margin-left:8px">' + esc(c) + '</span>' : '') + '</div>'
          + '<div style="font-size:12px"><b>' + g.rows.length + '</b> patient' + (g.rows.length === 1 ? '' : 's') + ' · Surgery <b>' + rs(g.surg) + '</b> · Investigations <b>' + rs(g.inv) + '</b>' + (g.proc ? ' · Other <b>' + rs(g.proc) + '</b>' : '') + '</div></div>'
          + g.rows.map(function (r) {
            return '<label style="display:flex;gap:10px;align-items:flex-start;padding:7px 12px 7px 34px;border-top:1px solid var(--g5);cursor:pointer"><input type="checkbox" style="width:auto;margin-top:3px" ' + (ticked(g.name, r.bmhId) ? 'checked ' : '') + 'onchange="bmhReferralTick(\'' + enc + '\',\'' + esc(r.bmhId) + '\',this.checked)">'
              + '<div style="flex:1;min-width:0"><div style="font-size:12.5px"><b>' + esc(r.patient) + '</b> <span style="color:var(--g1);font-size:11px">' + esc(r.bmhId) + (r.mobile ? ' · ' + esc(r.mobile) : '') + ' · ' + esc(r.deptLabel) + ' · ' + esc(r.date) + (r.source && r.source !== g.name ? ' · ' + esc(r.source) : '') + '</span></div>'
              + '<div style="font-size:12px;margin-top:2px">' + itemsHtml(r) + '</div></div></label>';
          }).join('') + '</div>';
      }).join('') : '<div style="padding:20px;text-align:center;color:var(--g1)">No referral records found for the selected filters.</div>') + '</div>';
  }
  function printHtml(groups) {
    var f = (document.getElementById('rep-ref-from') || {}).value || '', t = (document.getElementById('rep-ref-to') || {}).value || '';
    var fd = function (k) { try { return formatDateDDMMYYYY(k); } catch (e) { return k; } };
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Referral Report</title><style>@page{size:A4;margin:12mm}body{font-family:Arial,sans-serif;color:#111;font-size:11px}h1{font-size:17px;margin:0 0 3px}.sub{color:#555;margin-bottom:10px}.g{border:1px solid #bbb;border-radius:8px;margin-bottom:9px;break-inside:avoid}.gh{display:flex;justify-content:space-between;gap:8px;padding:6px 9px;background:#f1f3f6;font-weight:800}.gh small{font-weight:400;color:#555}.p{display:flex;gap:8px;padding:5px 9px 5px 26px;border-top:1px solid #ddd}.bx{font-size:13px;line-height:1}.it{display:inline-block;margin-right:10px}</style></head><body>'
      + '<h1>Referral Report</h1><div class="sub">' + esc((f ? fd(f) : 'Beginning') + ' to ' + (t ? fd(t) : 'today')) + ' · surgeries and investigations only (consultations not included)</div>'
      + groups.map(function (g) {
        var c = contact(g.name);
        return '<div class="g"><div class="gh"><span>' + esc(g.name) + (c ? ' <small>' + esc(c) + '</small>' : '') + '</span><span>' + g.rows.length + ' pt · Surgery ' + rs(g.surg) + ' · Inv ' + rs(g.inv) + (g.proc ? ' · Other ' + rs(g.proc) : '') + '</span></div>'
          + g.rows.map(function (r) {
            return '<div class="p"><span class="bx">' + (ticked(g.name, r.bmhId) ? '☑' : '☐') + '</span><div><b>' + esc(r.patient) + '</b> · ' + esc(r.bmhId) + (r.mobile ? ' · ' + esc(r.mobile) : '') + ' · ' + esc(r.date) + '<br>'
              + (r.items.length ? r.items.map(function (i) { return '<span class="it">' + i.cat + ': ' + esc(i.desc) + ' <b>' + rs(i.amount) + '</b></span>'; }).join('') : '<i style="color:#777">No surgery or investigation billed</i>') + '</div></div>';
          }).join('') + '</div>';
      }).join('') + '</body></html>';
  }
  // replace the screen and the print of the referral report (the filters and data stay as they were)
  var origGen = window.generateReferralReport;
  if (typeof origGen === 'function') {
    window.generateReferralReport = function (skipLoad) {
      var el = document.getElementById('rep-referral-result'); if (!el) return;
      try { populateReferralDoctorDatalist(); } catch (e) {}
      el.innerHTML = '<div style="padding:18px;text-align:center;color:var(--g1);font-size:12px">Loading billing records…</div>';
      var ld = (typeof bmhReferralLoadTxns === 'function' && skipLoad !== true) ? bmhReferralLoadTxns() : Promise.resolve();
      Promise.all([ld, loadShared()]).then(function () {
        try { el.innerHTML = screenHtml(rowsWithItems()); } catch (e) { console.warn(e); origGen.call(this, true); }
      });
    };
  }
  window.printReferralReportCurrent = function () {
    loadShared().then(function () { try { safePrint(printHtml(rowsWithItems())); } catch (e) { toast('Could not print', 'w'); } });
  };

  // ── Settings → Referrers ──
  function allNames() {
    var s = {}; try { getReferralDoctorOptions().forEach(function (n) { s[n.toLowerCase()] = n; }); } catch (e) {}
    try { var l = JSON.parse(localStorage.getItem('bmh_ref_sources_v1') || '[]'); (l || []).forEach(function (n) { if (n) s[String(n).toLowerCase()] = n; }); } catch (e) {}
    SOURCES.forEach(function (n) { if (n) s[String(n).toLowerCase()] = n; });
    Object.keys(DIR).forEach(function (k) { var d = DIR[k]; if (d && d.name) s[String(d.name).toLowerCase()] = d.name; });
    return Object.keys(s).map(function (k) { return s[k]; }).sort(function (a, b) { return a.localeCompare(b); });
  }
  window.bmhRenderReferrerDirectory = function () {
    var box = document.getElementById('set-referrers-body'); if (!box) return;
    box.innerHTML = '<div style="padding:12px;color:var(--g1);font-size:12px">Loading…</div>';
    loadShared().then(function () {
      var q = String((document.getElementById('set-ref-q') || {}).value || '').toLowerCase();
      var names = allNames().filter(function (n) { return !q || n.toLowerCase().indexOf(q) >= 0; });
      var inp = function (cls, v, ph, type) { return '<input type="' + (type || 'text') + '" class="' + cls + '" value="' + esc(v || '') + '" placeholder="' + ph + '" style="width:100%;font-size:12px;padding:5px 7px">'; };
      box.innerHTML = '<div style="overflow:auto"><table style="min-width:980px"><thead><tr><th style="width:190px">Name</th><th>Address</th><th style="width:140px">Phone</th><th style="width:190px">E-mail</th><th style="width:140px">Alternate mobile</th><th style="width:70px"></th></tr></thead><tbody>'
        + (names.length ? names.map(function (n) {
          var d = DIR[key(n)] || {};
          return '<tr data-name="' + esc(n) + '"><td style="font-weight:800">' + esc(n) + '</td><td>' + inp('rd-addr', d.address, 'Address') + '</td><td>' + inp('rd-ph', d.phone, 'Phone', 'tel') + '</td><td>' + inp('rd-em', d.email, 'E-mail', 'email') + '</td><td>' + inp('rd-ph2', d.phone2, 'Alternate mobile', 'tel') + '</td>'
            + '<td><button type="button" class="btn btn-xs btn-gold" onclick="bmhSaveReferrerRow(this)">Save</button></td></tr>';
        }).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--g1);padding:14px">No referral names yet</td></tr>') + '</tbody></table></div>';
    });
  };
  window.bmhSaveReferrerRow = function (btn) {
    var tr = btn.closest('tr'), name = tr.getAttribute('data-name'), g = function (c) { return String(tr.querySelector('.' + c).value || '').trim(); };
    var rec = { name: name, address: g('rd-addr'), phone: g('rd-ph'), email: g('rd-em'), phone2: g('rd-ph2'), updatedAt: new Date().toISOString(), updatedBy: me().name || '' };
    var r = ref('referrerDirectory/' + key(name)); if (!r) { toast('Not connected', 'w'); return; }
    btn.disabled = true;
    r.set(rec).then(function () { DIR[key(name)] = rec; btn.textContent = '✓ Saved'; setTimeout(function () { btn.textContent = 'Save'; btn.disabled = false; }, 1500); })
      .catch(function () { btn.disabled = false; toast('Could not save', 'w'); });
  };
})();
