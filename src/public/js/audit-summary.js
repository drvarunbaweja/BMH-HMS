/* BMH — Audits: outcome summary on top of the existing audit tables (read-only; nothing is saved).
 * Cataract tab: complications, refractive outcome against target (per IOL: on / off target), visual outcome and
 * surgically induced astigmatism (SIA, vector method from pre-op and post-op K readings), plus the cases that could
 * not be calculated because readings were not entered.
 * Other surgery tab: cases and complications by procedure group, for quality review.
 * Target refraction: the case's own target when recorded, otherwise plano (0.00 D).
 * Post-op readings: the eye visit 14–28 days after surgery (nearest later visit if none in that window).
 * Off switch (this browser): localStorage.setItem('bmh_audit_summary_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_audit_summary_off') === '1') return; } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function num(v) { if (v == null || v === '') return NaN; var m = String(v).replace(/−/g, '-').match(/[-+]?\d+(\.\d+)?/); return m ? Number(m[0]) : NaN; }
  function r2(n) { return Math.round(n * 100) / 100; }
  function pct(a, b) { return b ? Math.round(a * 1000 / b) / 10 + '%' : '—'; }
  function sgn(n) { return (n > 0 ? '+' : '') + r2(n).toFixed(2); }
  function mean(a) { return a.length ? a.reduce(function (s, x) { return s + x; }, 0) / a.length : NaN; }
  function median(a) { if (!a.length) return NaN; var b = a.slice().sort(function (x, y) { return x - y; }), m = Math.floor(b.length / 2); return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; }
  function hasComp(t) { t = String(t || '').trim(); return !!t && !/^(none|nil|no|n\/?a|-|—|uneventful)$/i.test(t); }
  // Snellen "6/12" → decimal; 6/12 or better = 0.5+
  function snellen(v) { var m = String(v || '').match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/); if (!m) return NaN; var d = Number(m[2]); return d ? Number(m[1]) / d : NaN; }
  function kParts(v, eye) {
    var L = eye === 'Left', k = (v && v.keratometry) || {}, s = L ? (k.os || {}) : (k.od || {});
    var k1 = num(L ? (v.keratOsK1 || s.k1) : (v.keratOdK1 || s.k1)), k2 = num(L ? (v.keratOsK2 || s.k2) : (v.keratOdK2 || s.k2)), ax = num(L ? (v.keratOsAxis || s.axis) : (v.keratOdAxis || s.axis));
    return (isFinite(k1) && isFinite(k2) && isFinite(ax)) ? { k1: k1, k2: k2, ax: ax } : null;
  }
  function preK(pt, pre, eye) {
    var p = kParts(pre || {}, eye); if (p) return p;
    try {
      var k1 = num(auditManualPreopKPart(pt, eye, 'k1')), k2 = num(auditManualPreopKPart(pt, eye, 'k2')), ax = num(auditManualPreopKPart(pt, eye, 'axis'));
      if (isFinite(k1) && isFinite(k2) && isFinite(ax)) return { k1: k1, k2: k2, ax: ax };
    } catch (e) {}
    return null;
  }
  // corneal astigmatism as a double-angle vector; the recorded axis is taken as the axis of K1, so the steep meridian is
  // that axis when K1 is the steeper reading and 90° away when K2 is steeper
  function vec(k) { var steep = k.k1 >= k.k2 ? k.ax : (k.ax + 90) % 180, m = Math.abs(k.k1 - k.k2), a = steep * 2 * Math.PI / 180; return { x: m * Math.cos(a), y: m * Math.sin(a), m: m }; }
  function card(label, value, sub, tone) {
    return '<div style="background:var(--g6);border:1px solid var(--g4);border-radius:10px;padding:10px;text-align:center"><div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase">' + esc(label) + '</div><div style="font-size:20px;font-weight:900;color:' + (tone || 'var(--bmh-blue)') + '">' + esc(value) + '</div>' + (sub ? '<div style="font-size:10px;color:var(--g1)">' + esc(sub) + '</div>' : '') + '</div>';
  }
  function tbl(cols, rows) {
    return '<div style="overflow:auto;border:1px solid var(--g4);border-radius:10px;background:#fff;margin-bottom:10px"><table><thead><tr>' + cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>'
      + (rows.length ? rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') : '<tr><td colspan="' + cols.length + '" style="text-align:center;color:var(--g1);padding:12px">Nothing to show</td></tr>') + '</tbody></table></div>';
  }
  function cataractCases() {
    return auditOtCases().filter(isAuditCataract).filter(function (c) { return !/^cancel/i.test(String(c.status || '')); }).map(function (c) {
      var pt = auditPatient(c) || {}, eye = auditEye(c), op = getOTCaseDateKey(c) || c.date || '';
      var pre = auditVisitBefore(pt, 'ophtho', op) || {}, post = auditVisitAfterWindow(pt, 'ophtho', op, 14, 28) || {};
      var row = {}; try { row = buildCataractAuditRowForCase(c, pt) || {}; } catch (e) {}
      var postSE = num(row['Postoperative spherical equivalent']);
      // an empty refraction must not count as plano
      if (!String(row['Postoperative sphere cylinder and axis'] || '').trim() && !String((auditRefParts(post, eye) || {}).sph || '').trim()) postSE = NaN;
      var target = num(c.targetRefraction != null ? c.targetRefraction : (c.targetSE != null ? c.targetSE : (c.biometry && c.biometry.targetRefraction)));
      if (!isFinite(target)) target = 0;
      var pk = (eye === 'Left' || eye === 'Right') ? preK(pt, pre, eye) : null, qk = (eye === 'Left' || eye === 'Right') ? kParts(post, eye) : null;
      var sia = null; if (pk && qk) { var a = vec(pk), b = vec(qk); sia = { x: b.x - a.x, y: b.y - a.y }; sia.m = Math.sqrt(sia.x * sia.x + sia.y * sia.y); }
      return { c: c, pt: pt, eye: eye, op: op, done: /^(completed|done)$/i.test(String(c.status || '')), iol: String(row['Type of IOL'] || auditIolName(c) || 'Not recorded').trim() || 'Not recorded',
        intra: String(row['Intraoperative complications'] || c.complications || ''), postC: String(row['Postoperative complications'] || ''),
        postSE: postSE, target: target, err: isFinite(postSE) ? postSE - target : NaN,
        bcva: snellen(row['Postoperative best-corrected VA'] || auditVaRaw(post, eye, 'bcva')), ucva: snellen(row['Postoperative unaided VA'] || auditVaRaw(post, eye, 'ucva')),
        sia: sia, hasPreK: !!pk, hasPostK: !!qk, label: (c.patient || pt.name || '') + ' · ' + (c.bmhId || '') + ' · ' + (op ? formatDateIN(op) : '') + (eye ? ' · ' + eye : '') };
    });
  }
  function cataractSummary() {
    var all = cataractCases(), R = all.filter(function (r) { return r.done; });
    var notDone = all.length - R.length;
    var intra = R.filter(function (r) { return hasComp(r.intra); }), postc = R.filter(function (r) { return hasComp(r.postC); });
    var pcr = intra.filter(function (r) { return /pcr|pc rent|pc tear|posterior caps|vitreous loss|capsul(e|ar) (rent|rupture|tear)|zonul|dropped|nucleus drop/i.test(r.intra); });
    var ref = R.filter(function (r) { return isFinite(r.err); }), abs = ref.map(function (r) { return Math.abs(r.err); });
    var w05 = ref.filter(function (r) { return Math.abs(r.err) <= 0.5; }).length, w10 = ref.filter(function (r) { return Math.abs(r.err) <= 1.0; }).length;
    var bc = R.filter(function (r) { return isFinite(r.bcva); }), uc = R.filter(function (r) { return isFinite(r.ucva); });
    var sia = R.filter(function (r) { return r.sia; }), siaM = sia.map(function (r) { return r.sia.m; });
    var cx = mean(sia.map(function (r) { return r.sia.x; })), cy = mean(sia.map(function (r) { return r.sia.y; }));
    var cenM = Math.sqrt(cx * cx + cy * cy), cenA = ((Math.atan2(cy, cx) * 180 / Math.PI) / 2 + 180) % 180;
    var h = '<div class="card" id="audit-summary-cataract"><div class="card-hd"><div><div class="card-title">Cataract audit — outcome summary</div><div class="card-sub">Completed cataract cases in the selected dates'
      + (notDone ? ' (' + notDone + ' more not marked Completed are left out)' : '') + '. Target is plano unless a target was recorded for the case. Post-op readings are from the visit 2–4 weeks after surgery.</div></div></div>';
    var needLoad = R.filter(function (r) { try { var v = getCachedPatientVisits(r.c.bmhId); return !v || !Object.keys(v).length; } catch (e) { return false; } }).length;
    h += '<div style="margin:0 0 10px;font-size:11.5px;color:var(--g1)">Visit records are read from this computer\'s saved copy. '
      + (needLoad ? '<b style="color:#b45309">' + needLoad + ' of these patients have no visit records loaded here yet</b>, so their refraction, VA and K readings show as missing. ' : 'All of these patients have visit records loaded. ')
      + '<button type="button" class="btn btn-outline btn-sm" id="audit-sum-load" onclick="bmhAuditSummary.loadVisits(\'cataract\')">⬇ Load visit records for these ' + R.length + ' cases</button> <span id="audit-sum-load-msg"></span></div>';
    h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:10px;margin-bottom:12px">'
      + card('Completed cases', R.length)
      + card('Intra-op complications', intra.length, pct(intra.length, R.length) + ' of cases', intra.length ? '#c0392b' : '#1a8c3c')
      + card('PCR / vitreous loss', pcr.length, pct(pcr.length, R.length) + ' · benchmark under 2%', pcr.length / (R.length || 1) > 0.02 ? '#c0392b' : '#1a8c3c')
      + card('Post-op complications', postc.length, pct(postc.length, R.length) + ' of cases', postc.length ? '#c0392b' : '#1a8c3c')
      + card('Within ±0.50 D', pct(w05, ref.length), w05 + ' of ' + ref.length + ' · benchmark 55%+')
      + card('Within ±1.00 D', pct(w10, ref.length), w10 + ' of ' + ref.length + ' · benchmark 85%+')
      + card('Mean absolute error', ref.length ? r2(mean(abs)).toFixed(2) + ' D' : '—', ref.length ? 'mean error ' + sgn(mean(ref.map(function (r) { return r.err; }))) + ' D' : 'no post-op refraction')
      + card('BCVA 6/12 or better', pct(bc.filter(function (r) { return r.bcva >= 0.5 - 1e-9; }).length, bc.length), bc.length + ' with BCVA recorded')
      + card('Unaided 6/12 or better', pct(uc.filter(function (r) { return r.ucva >= 0.5 - 1e-9; }).length, uc.length), uc.length + ' with unaided VA recorded')
      + card('Mean SIA', sia.length ? r2(mean(siaM)).toFixed(2) + ' D' : '—', sia.length ? 'median ' + r2(median(siaM)).toFixed(2) + ' D · ' + sia.length + ' eyes' : 'needs pre and post-op K')
      + card('SIA centroid', sia.length ? r2(cenM).toFixed(2) + ' D @ ' + Math.round(cenA) + '°' : '—', sia.length ? 'vector mean' : '')
      + '</div>';
    // per IOL
    var by = {}; R.forEach(function (r) { (by[r.iol] = by[r.iol] || []).push(r); });
    var iolRows = Object.keys(by).sort(function (a, b) { return by[b].length - by[a].length; }).map(function (k) {
      var g = by[k], rf = g.filter(function (r) { return isFinite(r.err); }), e = rf.map(function (r) { return r.err; }), m = mean(e);
      var verdict = !rf.length ? '<span style="color:var(--g1)">No post-op refraction</span>' : rf.length < 5 ? '<span style="color:var(--g1)">Too few eyes to judge (' + rf.length + ')</span>'
        : Math.abs(m) <= 0.25 ? '<b style="color:#1a8c3c">On target</b>' : m < 0 ? '<b style="color:#b45309">Off target — myopic by ' + r2(Math.abs(m)).toFixed(2) + ' D</b>' : '<b style="color:#b45309">Off target — hyperopic by ' + r2(m).toFixed(2) + ' D</b>';
      return [esc(k), g.length, rf.length, rf.length ? sgn(m) + ' D' : '—', rf.length ? r2(mean(e.map(Math.abs))).toFixed(2) + ' D' : '—',
        rf.length ? pct(rf.filter(function (r) { return Math.abs(r.err) <= 0.5; }).length, rf.length) : '—', rf.length ? pct(rf.filter(function (r) { return Math.abs(r.err) <= 1; }).length, rf.length) : '—',
        g.filter(function (r) { return hasComp(r.intra); }).length, verdict];
    });
    h += '<div style="font-size:12px;font-weight:900;margin:4px 0 6px">Each IOL — on / off target</div>' + tbl(['IOL', 'Cases', 'With post-op refraction', 'Mean error (− myopic, + hyperopic)', 'Mean absolute error', 'Within ±0.50 D', 'Within ±1.00 D', 'Intra-op complications', 'Verdict'], iolRows);
    // complications list
    var compBy = {}; intra.forEach(function (r) { var k = r.intra.trim().replace(/\s+/g, ' '); (compBy[k] = compBy[k] || []).push(r); });
    h += '<div style="font-size:12px;font-weight:900;margin:4px 0 6px">Intra-operative complications</div>' + tbl(['Complication', 'Cases', 'Rate', 'Patients'], Object.keys(compBy).sort(function (a, b) { return compBy[b].length - compBy[a].length; }).map(function (k) { return [esc(k), compBy[k].length, pct(compBy[k].length, R.length), compBy[k].map(function (r) { return esc(r.label); }).join('<br>')]; }));
    if (postc.length) h += '<div style="font-size:12px;font-weight:900;margin:4px 0 6px">Post-operative complications</div>' + tbl(['Complication', 'Patient'], postc.map(function (r) { return [esc(r.postC), esc(r.label)]; }));
    // not calculable
    var noRef = R.filter(function (r) { return !isFinite(r.err); }), noK = R.filter(function (r) { return !r.sia; });
    h += '<details style="margin-bottom:10px"><summary style="cursor:pointer;font-size:12px;font-weight:800;color:#b45309">Could not be calculated: ' + noRef.length + ' without post-op refraction, ' + noK.length + ' without both K readings (tap to list)</summary>'
      + tbl(['Patient', 'Missing'], R.filter(function (r) { return !isFinite(r.err) || !r.sia; }).map(function (r) { return [esc(r.label), [!isFinite(r.err) ? 'post-op refraction' : '', !r.hasPreK ? 'pre-op K' : '', !r.hasPostK ? 'post-op K' : ''].filter(Boolean).join(', ')]; })) + '</details>';
    h += '<div style="font-size:10.5px;color:var(--g1);margin-bottom:4px">SIA is the vector difference between post-op and pre-op corneal astigmatism, taking the recorded K axis as the axis of K1. Benchmarks shown are the commonly used cataract standards (refraction within ±0.50 D in 55% and ±1.00 D in 85% of eyes; posterior capsule rupture under 2%).</div></div>';
    return h;
  }
  function groupOf(p) {
    p = String(p || '');
    if (/trab|glaucoma|valve|migs|istent/i.test(p)) return 'Glaucoma surgery';
    if (/vegf|intravitreal|\bivt\b|avastin|bevacizumab|ranibizumab|aflibercept|injection/i.test(p)) return 'Intravitreal injection';
    if (/vitrect|retina|buckl|silicone/i.test(p)) return 'Vitreo-retinal surgery';
    if (/yag|laser|prp|slt|iridotomy|capsulotomy/i.test(p)) return 'Laser';
    if (/pterygium|cornea|kerato|dalk|dsek|graft/i.test(p)) return 'Cornea / pterygium';
    if (/squint|strabismus/i.test(p)) return 'Squint';
    if (/lid|ptosis|entropion|ectropion|chalazion|dcr|oculoplast/i.test(p)) return 'Lids / oculoplasty';
    if (/icl|phakic/i.test(p)) return 'ICL / refractive';
    if (/lscs|caesar|cesar/i.test(p)) return 'LSCS';
    if (/deliver/i.test(p)) return 'Delivery';
    if (/hyster|myomect|laparo|d\s*&\s*c|d and c|tubal/i.test(p)) return 'Gynaecological surgery';
    return 'Other';
  }
  function otherSummary() {
    var R = auditOtCases().filter(function (c) { return !isAuditCataract(c) && !/^cancel/i.test(String(c.status || '')); });
    var by = {};
    R.forEach(function (c) { var g = groupOf(c.procedure || c.procedureMain); (by[g] = by[g] || []).push(c); });
    var comp = function (c) { return String(c.complications || c.intraopComplications || c.operativeComplications || ''); };
    var rows = Object.keys(by).sort(function (a, b) { return by[b].length - by[a].length; }).map(function (g) {
      var l = by[g], done = l.filter(function (c) { return /^(completed|done)$/i.test(String(c.status || '')); }).length, cc = l.filter(function (c) { return hasComp(comp(c)); });
      return [esc(g), l.length, done, cc.length, pct(cc.length, l.length), cc.map(function (c) { return esc((c.patient || '') + ' · ' + (c.bmhId || '') + ' · ' + (getOTCaseDateKey(c) ? formatDateIN(getOTCaseDateKey(c)) : '') + ' — ' + comp(c)); }).join('<br>')];
    });
    var totalC = R.filter(function (c) { return hasComp(comp(c)); }).length;
    return '<div class="card" id="audit-summary-other"><div class="card-hd"><div><div class="card-title">Other surgeries — quality summary</div><div class="card-sub">Every non-cataract OT entry in the selected dates (eye and OBG), by procedure group, with the complications recorded in the OT notes.</div></div></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:10px;margin-bottom:12px">' + card('Cases', R.length) + card('With complications', totalC, pct(totalC, R.length) + ' of cases', totalC ? '#c0392b' : '#1a8c3c') + card('Procedure groups', Object.keys(by).length) + '</div>'
      + tbl(['Procedure group', 'Cases', 'Marked Completed', 'With complications', 'Rate', 'Complications recorded'], rows) + '</div>';
  }
  function wrap(name, id, build) {
    var orig = window[name]; if (typeof orig !== 'function' || orig._sum) return;
    var w = function () {
      var r = orig.apply(this, arguments);
      try { var el = document.getElementById(id); if (el && el.parentNode) { var old = el.parentNode.querySelector('[id^="audit-summary-"]'); if (old) old.remove(); el.insertAdjacentHTML('beforebegin', build()); } } catch (e) { try { console.warn('audit summary failed', e); } catch (x) {} }
      return r;
    };
    w._sum = true; window[name] = w;
  }
  wrap('renderCataractAudit', 'audit-cataract-result', cataractSummary);
  wrap('renderSurgeryAudit', 'audit-surgery-result', otherSummary);
  // fetch the visit records of the audited patients (one small read per patient), then redraw
  function loadVisits() {
    var ids = []; cataractCases().forEach(function (r) { var id = String(r.c.bmhId || ''); if (id && ids.indexOf(id) < 0) ids.push(id); });
    if (!ids.length) return;
    if (ids.length > 150 && !confirm('This will read the visit records of ' + ids.length + ' patients from the database. Narrow the dates for a smaller read, or press OK to continue.')) return;
    var btn = document.getElementById('audit-sum-load'), msg = document.getElementById('audit-sum-load-msg'); if (btn) btn.disabled = true;
    var i = 0, done = 0;
    var next = function () {
      if (i >= ids.length) return Promise.resolve();
      var id = ids[i++];
      var p; try { p = prefetchPatientVisitsInBackground(id); } catch (e) { p = Promise.resolve(); }
      return Promise.resolve(p).catch(function () {}).then(function () { done++; var m = document.getElementById('audit-sum-load-msg'); if (m) m.textContent = 'Loading ' + done + ' / ' + ids.length + '…'; return next(); });
    };
    Promise.all([next(), next(), next(), next()]).then(function () { try { renderCataractAudit(); } catch (e) {} });
  }
  window.bmhAuditSummary = { cataract: cataractSummary, other: otherSummary, loadVisits: loadVisits };
})();
