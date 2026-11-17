/* BMH — Keratometry (K1 / K2 / axis) in Past visits and on the case sheet print, labelled pre-op / post-op per eye.
 * The K values already saved with each eye-examination visit are compared with that eye's surgery date in the OT list:
 * a visit up to and including the surgery day is "pre-op"; a visit after it is "post-op" (e.g. the 2-week K readings).
 * The case sheet also prints the eye's pre-op K (last K before its surgery; else the "Pre-op K" popup; else biometry).
 * Read-only: nothing new is saved. Audits keep reading the same values.
 * Off switch (this browser): localStorage.setItem('bmh_kerat_phase_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_kerat_phase_off') === '1') return; } catch (e) {}
  function dkey(v) { try { return auditKeyDate(v || ''); } catch (e) { return String(v || '').slice(0, 10); } }
  function fmt(d) { try { return formatDateIN(d); } catch (e) { return d; } }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function side(v, s) {
    if (!v) return null;
    var up = s === 'od' ? 'Od' : 'Os', k = v.keratometry && v.keratometry[s] || {};
    var k1 = v['kerat' + up + 'K1'] || k.k1 || '', k2 = v['kerat' + up + 'K2'] || k.k2 || '', ax = v['kerat' + up + 'Axis'] || k.axis || '';
    return (k1 || k2) ? { k1: k1, k2: k2, axis: ax } : null;
  }
  function txt(k) { return k ? ['K1 ' + (k.k1 || '—'), 'K2 ' + (k.k2 || '—')].join(' / ') + (k.axis !== '' && k.axis != null ? ' × ' + k.axis + '°' : '') : ''; }
  // surgery dates (OT list) for one eye of this patient, oldest first
  function opDates(pt, s) {
    var id = String(pt && pt.bmhId || ''); if (!id) return [];
    var want = s === 'od' ? 'Right' : 'Left';
    return (window.OT_CASES || []).filter(function (c) {
      if (!c || String(c.bmhId || '') !== id || c.caseKind === 'obg' || /cancel/i.test(String(c.status || ''))) return false;
      var e = ''; try { e = auditEye(c); } catch (x) {}
      return e === want || /both|\bbe\b|\bou\b/i.test(String(c.eye || c.site || ''));
    }).map(function (c) { var d = ''; try { d = getOTCaseDateKey(c); } catch (x) {} return dkey(d || c.date || c.otDate || c.surgeryDate || ''); })
      .filter(Boolean).sort();
  }
  function phase(pt, s, visitDate) {
    var d = dkey(visitDate), ops = opDates(pt, s); if (!d || !ops.length) return '';
    return ops.some(function (o) { return o < d; }) ? 'post-op' : 'pre-op';
  }
  function visitsOf(pt) { try { return auditVisits(pt, 'ophtho'); } catch (e) { return []; } }
  // pre-op K for an eye: last K before its (first) surgery; else the Pre-op K popup; else biometry
  function preop(pt, s) {
    var ops = opDates(pt, s); if (!ops.length) return null;
    var op = ops[0];
    var v = visitsOf(pt).filter(function (x) { var d = dkey(x.date || x.createdAt || x.updatedAt); return d && d <= op && side(x, s); })[0];
    if (v) return { k: side(v, s), date: dkey(v.date || v.createdAt), op: op, src: '' };
    var eye = s === 'od' ? 'Right' : 'Left', m = {};
    try { m = { k1: auditManualPreopKPart(pt, eye, 'k1'), k2: auditManualPreopKPart(pt, eye, 'k2'), axis: auditManualPreopKPart(pt, eye, 'axis') }; } catch (e) {}
    if (m.k1 || m.k2) return { k: m, date: '', op: op, src: 'entered' };
    var b = visitsOf(pt).map(function (x) { return x.biometryCalc && x.biometryCalc[s]; }).filter(function (x) { return x && (x.k1 || x.k2); })[0];
    return b ? { k: { k1: b.k1, k2: b.k2, axis: b.axis || '' }, date: '', op: op, src: 'biometry' } : null;
  }
  // Past visits row
  window.bmhKeratLine = function (pt, v) {
    var out = [];
    [['od', 'RE'], ['os', 'LE']].forEach(function (x) {
      var k = side(v, x[0]); if (!k) return;
      var ph = phase(pt, x[0], v.date || v.createdAt || v.updatedAt);
      out.push(x[1] + ' ' + txt(k) + (ph ? ' (' + ph + ')' : ''));
    });
    return out.join(' · ');
  };
  // case sheet print block
  window.bmhKeratPrintHtml = function (pt, cur, visitDate) {
    var rows = [];
    [['od', 'RE / OD'], ['os', 'LE / OS']].forEach(function (x) {
      var k = cur && (cur[x[0]].k1 || cur[x[0]].k2) ? cur[x[0]] : null;
      var ph = phase(pt, x[0], visitDate);
      var pre = preop(pt, x[0]);
      var preTxt = '';
      if (pre && pre.k && (pre.k.k1 || pre.k.k2) && !(ph !== 'post-op' && k)) preTxt = txt(pre.k) + ' <span style="color:#666">(before surgery ' + esc(fmt(pre.op)) + (pre.src ? ', ' + pre.src : '') + ')</span>';
      if (!k && !preTxt) return;
      rows.push('<tr><td style="border:1px solid #bbb;padding:2px 4px;font-weight:800;width:16%">' + x[1] + '</td>'
        + '<td style="border:1px solid #bbb;padding:2px 4px">' + (k ? esc(txt(k)) + (ph ? ' <b>(' + ph + ')</b>' : '') : '—') + '</td>'
        + '<td style="border:1px solid #bbb;padding:2px 4px">' + (preTxt || (ph === 'pre-op' && k ? 'same as today' : '—')) + '</td></tr>');
    });
    if (!rows.length) return '';
    return '<div style="margin-top:4px"><h2 style="margin:0 0 2px;font-size:10.1px">Keratometry</h2><table style="width:100%;border-collapse:collapse;font-size:8.8px;line-height:1.2"><thead><tr style="background:#eaeaea"><th style="border:1px solid #bbb;padding:2px 4px;text-align:left">Eye</th><th style="border:1px solid #bbb;padding:2px 4px;text-align:left">This visit</th><th style="border:1px solid #bbb;padding:2px 4px;text-align:left">Pre-op K</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
  };
  window.bmhKeratPhase = phase;
})();
