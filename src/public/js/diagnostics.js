/* BMH — Eye → Diagnostics (was "Biometry"): real IOL power calculation, toric planning chart, refractive maths.
 *
 * IOL power (calculated here, published equations):
 *   • SRK/T      — Retzlaff, Sanders & Kraff 1990 (A-constant)
 *   • Hoffer Q   — Hoffer 1993 with the 2007 errata (pACD; from A-constant if not entered: pACD = 0.58357·A − 63.896)
 *   • Holladay 1 — Holladay 1988 (surgeon factor; from A-constant if not entered: SF = 0.5663·A − 65.6)
 *   • Haigis     — Haigis (a0/a1/a2) — only with the lens's own Haigis constants (no conversion from A is used)
 *   • Barrett Universal II / Barrett Toric are unpublished; their values can be typed in from the biometer printout
 *     (e.g. IOLMaster 700) and are printed alongside.
 * Each formula gives the power for the target refraction and the predicted refraction for the powers around it.
 *
 * Toric: the steep corneal meridian (from K1/K2 + axis), the surgically induced astigmatism (SIA) at the main incision
 * (per eye) → expected corneal astigmatism after surgery (vector sum). The lens cylinder needed at the IOL plane is the
 * difference in IOL power for the flat and steep meridians (same lens position); for each available toric cylinder the
 * residual astigmatism is shown. Anterior keratometry only — posterior corneal astigmatism is not included, so the
 * Barrett Toric result from the biometer (if entered) is shown with it and is the one to follow.
 */
(function () {
  'use strict';
  var DEG = Math.PI / 180;
  function num(v) { var n = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(n) ? n : null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function sgn(v, d) { if (v == null || !isFinite(v)) return '—'; var t = Math.abs(v).toFixed(d == null ? 2 : d); return (v > 0.004 ? '+' : v < -0.004 ? '−' : '') + t; }
  function ax(a) { a = Math.round(((a % 180) + 180) % 180); return a === 0 ? 180 : a; }

  // ───────────────────────── formulas ─────────────────────────
  var F = {};
  F.srkt = function (AL, K, A) {
    var na = 1.336, ncm1 = 0.333, V = 12, r = 337.5 / K;
    var LCOR = AL <= 24.2 ? AL : -3.446 + 1.716 * AL - 0.0237 * AL * AL;
    var Cw = -5.41 + 0.58412 * LCOR + 0.098 * K;
    var H = r - Math.sqrt(Math.max(0, r * r - Cw * Cw / 4));
    var C = H + (0.62467 * A - 68.747) - 3.336;
    var LOPT = AL + 0.65696 - 0.02029 * AL;
    return {
      elp: C,
      power: function (R) { return 1000 * na * (na * r - ncm1 * LOPT - 0.001 * R * (V * (na * r - ncm1 * LOPT) + LOPT * r)) / ((LOPT - C) * (na * r - ncm1 * C - 0.001 * R * (V * (na * r - ncm1 * C) + C * r))); },
      refr: function (P) { return (1000 * na * (na * r - ncm1 * LOPT) - P * (LOPT - C) * (na * r - ncm1 * C)) / (na * (V * (na * r - ncm1 * LOPT) + LOPT * r) - 0.001 * P * (LOPT - C) * (V * (na * r - ncm1 * C) + C * r)); }
    };
  };
  F.hofferq = function (AL, K, pACD) {
    var ALc = Math.min(31, Math.max(18.5, AL)), M = AL <= 23 ? 1 : -1, G = AL <= 23 ? 28 : 23.5;
    var ACD = pACD + 0.3 * (ALc - 23.5) + Math.pow(Math.tan(K * DEG), 2) + (0.1 * M * Math.pow(23.5 - ALc, 2) * Math.tan(0.1 * Math.pow(G - ALc, 2) * DEG)) - 0.99166;
    return {
      elp: ACD,
      power: function (R) { var Rx = R / (1 - 0.012 * R); return 1336 / (AL - ACD - 0.05) - 1.336 / (1.336 / (K + Rx) - (ACD + 0.05) / 1000); },
      refr: function (P) { var x = 1336 / (AL - ACD - 0.05) - P; var Rx = 1.336 / (1.336 / x + (ACD + 0.05) / 1000) - K; return Rx / (1 + 0.012 * Rx); }
    };
  };
  F.holladay1 = function (AL, K, SF) {
    var na = 1.336, nc1 = 1 / 3, V = 12, Rc = 337.5 / K, Rag = Math.max(7, Rc), AG = Math.min(13.5, 12.5 * AL / 23.45);
    var d = 0.56 + Rag - Math.sqrt(Rag * Rag - AG * AG / 4) + SF, L = AL + 0.2;
    return {
      elp: d,
      power: function (R) { return 1000 * na * (na * Rc - nc1 * L - 0.001 * R * (V * (na * Rc - nc1 * L) + L * Rc)) / ((L - d) * (na * Rc - nc1 * d - 0.001 * R * (V * (na * Rc - nc1 * d) + d * Rc))); },
      refr: function (P) { return (1000 * na * (na * Rc - nc1 * L) - P * (L - d) * (na * Rc - nc1 * d)) / (na * (V * (na * Rc - nc1 * L) + L * Rc) - 0.001 * P * (L - d) * (V * (na * Rc - nc1 * d) + d * Rc)); }
    };
  };
  F.haigis = function (AL, K, ACD, a0, a1, a2) {
    var n = 1.336, dx = 0.012, DC = 0.3315 / (337.5 / K / 1000), d = (a0 + a1 * ACD + a2 * AL) / 1000, L = AL / 1000;
    return {
      elp: d * 1000,
      power: function (R) { var z = DC + R / (1 - R * dx); return n / (L - d) - n / (n / z - d); },
      refr: function (P) { var q = n * (n - P * (L - d)) / (n * (L - d) + d * (n - P * (L - d))); return (q - DC) / (1 + dx * (q - DC)); }
    };
  };
  window.bmhIolFormulas = F;

  // ───────────────────────── reading the form ─────────────────────────
  function val(id) { var el = document.getElementById(id); return el ? String(el.value || '').trim() : ''; }
  var DEFAULT_PLACEHOLDERS = {}; // the made-up constants of the old default list are not used as lens constants
  try { (window.BMH_DEFAULT_BIOMETRY_IOLS || BMH_DEFAULT_BIOMETRY_IOLS || []).forEach(function (r) { DEFAULT_PLACEHOLDERS[String(r.name || '').toLowerCase()] = { hoffer: r.hoffer, holladay: r.holladay, haigis: r.haigis, barrett: r.barrett }; }); } catch (e) {}
  function lensConstants(iol) {
    var A = num(iol.opticalA) || num(iol.immersionA) || num(iol.contactA);
    var ph = DEFAULT_PLACEHOLDERS[String(iol.name || '').toLowerCase()] || {};
    var own = function (k) { var v = String(iol[k] || '').trim(); return v && v !== String(ph[k] || '').trim() ? v : ''; };
    var pACD = num(own('hoffer')), SF = num(own('holladay'));
    var hg = String(own('haigis')).split(/[\/,; ]+/).map(num).filter(function (x) { return x != null; });
    return {
      A: A,
      pACD: pACD != null ? pACD : (A != null ? 0.58357 * A - 63.896 : null), pACDfromA: pACD == null,
      SF: SF != null ? SF : (A != null ? 0.5663 * A - 65.6 : null), SFfromA: SF == null,
      haigis: hg.length === 3 ? hg : null
    };
  }
  function eyeData(eye) {
    var p = 'bio-' + eye + '-';
    var k1 = num(val(p + 'k1')), k2 = num(val(p + 'k2'));
    return { al: num(val(p + 'al')), acd: num(val(p + 'acd')), lt: num(val(p + 'lt')), k1: k1, k2: k2, axis: num(val(p + 'axis')), target: num(val(p + 'target')) != null ? num(val(p + 'target')) : -0.25,
      k: (k1 != null && k2 != null) ? (k1 + k2) / 2 : (k1 != null ? k1 : k2) };
  }
  function stepOf(iol) { var s = num(iol.step); return s && s >= 0.25 ? s : 0.5; }
  function roundTo(v, s) { return Math.round(v / s) * s; }

  // results of one formula for one eye/lens: exact power for target, the power to choose and a list around it
  function formulaRow(f, target, step) {
    if (!f) return null;
    var exact = f.power(target);
    if (!isFinite(exact)) return null;
    var c = roundTo(exact, step), list = [];
    for (var i = -2; i <= 2; i++) { var P = Math.round((c + i * step) * 100) / 100; list.push({ p: P, r: f.refr(P) }); }
    // the suggested power: predicted refraction closest to the target; a tie goes to the more myopic one
    var best = list.slice().sort(function (a, b) { var da = Math.abs(a.r - target), db = Math.abs(b.r - target); return Math.abs(da - db) < 0.005 ? a.r - b.r : da - db; })[0];
    return { exact: exact, pick: best.p, pickRef: best.r, list: list, elp: f.elp };
  }
  function calcLens(eye, iol, d) {
    d = d || eyeData(eye);
    var out = { iol: iol, ok: false, msg: '' };
    if (!(d.al > 15 && d.al < 40) || !(d.k > 30 && d.k < 60)) { out.msg = 'Enter AL and K1/K2'; return out; }
    var c = lensConstants(iol), step = stepOf(iol);
    if (c.A == null) { out.msg = 'Enter the lens A-constant'; return out; }
    out.ok = true; out.c = c; out.step = step;
    out.srkt = formulaRow(F.srkt(d.al, d.k, c.A), d.target, step);
    out.hq = formulaRow(F.hofferq(d.al, d.k, c.pACD), d.target, step);
    out.h1 = formulaRow(F.holladay1(d.al, d.k, c.SF), d.target, step);
    out.hg = (c.haigis && d.acd > 1) ? formulaRow(F.haigis(d.al, d.k, d.acd, c.haigis[0], c.haigis[1], c.haigis[2]), d.target, step) : null;
    return out;
  }
  window.bmhIolCalc = calcLens;

  // ───────────────────────── toric ─────────────────────────
  var CYLS_DEFAULT = '1.00, 1.50, 2.25, 3.00, 3.75, 4.50, 5.25, 6.00';
  function axisMode() { return val('dx-axis-mode'); }
  function steepAxis(d, mode) {
    if (d.axis == null || d.k1 == null || d.k2 == null) return null;
    if (mode === 'steep') return ax(d.axis);
    if (mode === 'k1') return d.k2 >= d.k1 ? ax(d.axis + 90) : ax(d.axis);
    return null;
  }
  function toric(eye) {
    var d = eyeData(eye), mode = axisMode();
    var res = { eye: eye, d: d, mode: mode };
    if (d.k1 == null || d.k2 == null) { res.msg = 'Enter K1 and K2'; return res; }
    res.cyl = Math.abs(d.k2 - d.k1);
    if (!mode) { res.msg = 'Choose what the K axis value means (above)'; return res; }
    var st = steepAxis(d, mode); if (st == null) { res.msg = 'Enter the K axis'; return res; }
    res.steep = st;
    var sia = num(val('bio-sia')) || 0, inc = num(val('dx-' + eye + '-inc'));
    if (inc == null) inc = num(val('bio-incision-axis'));
    res.sia = sia; res.inc = inc;
    // double-angle vectors: corneal astigmatism (steep axis) + SIA (flattening at the incision = steepening 90° away)
    var x = res.cyl * Math.cos(2 * st * DEG), y = res.cyl * Math.sin(2 * st * DEG);
    if (sia && inc != null) { x -= sia * Math.cos(2 * inc * DEG); y -= sia * Math.sin(2 * inc * DEG); }
    res.post = Math.sqrt(x * x + y * y); res.postAxis = ax(Math.atan2(y, x) / DEG / 2);
    if (!(d.al > 15) || !(d.k > 30)) { res.msg2 = 'Enter AL for the lens cylinder'; return res; }
    // cylinder needed at the IOL plane: IOL power for the flat minus the steep meridian at the same lens position
    var tl = toricLensIol(eye), c = tl ? lensConstants(tl) : { A: 119.0 };
    var elp = F.srkt(d.al, d.k, c.A || 119.0).elp;
    var P = function (Km) { return 1336 / (d.al - elp) - 1336 / (1336 / Km - elp); };
    var kf = d.k - res.post / 2, ks = d.k + res.post / 2;
    res.iolCyl = res.post > 0.01 ? P(kf) - P(ks) : 0;
    res.ratio = res.post > 0.01 ? res.iolCyl / res.post : 1.46;
    res.lens = tl ? tl.name : '';
    var cyls = val('dx-toric-cyls') || CYLS_DEFAULT;
    res.options = cyls.split(/[,; ]+/).map(num).filter(function (v) { return v != null && v > 0; }).map(function (ci) {
      var atCornea = ci / res.ratio, r = res.post - atCornea;
      return { iol: ci, cornea: atCornea, residual: Math.abs(r), resAxis: r >= 0 ? res.postAxis : ax(res.postAxis + 90), over: r < 0 };
    }).sort(function (a, b) { return a.residual - b.residual; });
    // the suggestion: smallest residual; between close options prefer slight under-correction
    var o = res.options.slice(0, 2);
    res.best = o.length > 1 && Math.abs(o[0].residual - o[1].residual) < 0.15 ? (o[0].over ? o[1] : o[0]) : o[0];
    res.needed = res.post >= 0.75;
    return res;
  }
  function toricLensIol(eye) {
    var rows = []; try { rows = getBiometryIolRowsFromDom(); } catch (e) {}
    var use = rows.filter(function (r) { return /toric/i.test(r.type + ' ' + r.name) && (eye === 'od' ? r.useOd !== false : r.useOs !== false); });
    return use[0] || rows.filter(function (r) { return /toric/i.test(r.type + ' ' + r.name); })[0] || null;
  }
  window.bmhToricCalc = toric;

  // chart (examiner's view, 0° at 3 o'clock, angles anticlockwise — as on the biometer / toric marking)
  function chart(eye, t, size) {
    size = size || 220;
    var cx = 110, cy = 110, R = 84;
    var pt = function (a, r) { return [cx + r * Math.cos(a * DEG), cy - r * Math.sin(a * DEG)]; };
    var line = function (a, r1, color, w, dash) { var p1 = pt(a, r1), p2 = pt(a + 180, r1); return '<line x1="' + p1[0].toFixed(1) + '" y1="' + p1[1].toFixed(1) + '" x2="' + p2[0].toFixed(1) + '" y2="' + p2[1].toFixed(1) + '" stroke="' + color + '" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' stroke-linecap="round"/>'; };
    var s = '<svg viewBox="0 0 220 220" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;font-family:Arial,sans-serif">';
    s += '<circle cx="110" cy="110" r="' + R + '" fill="#fff" stroke="#1A3C6E" stroke-width="2"/><circle cx="110" cy="110" r="40" fill="#f2f6fc" stroke="#9fb3cf" stroke-width="1"/>';
    for (var a = 0; a < 360; a += 10) { var p1 = pt(a, R), p2 = pt(a, R - (a % 30 ? 4 : 8)); s += '<line x1="' + p1[0].toFixed(1) + '" y1="' + p1[1].toFixed(1) + '" x2="' + p2[0].toFixed(1) + '" y2="' + p2[1].toFixed(1) + '" stroke="#1A3C6E" stroke-width="1"/>'; }
    [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].forEach(function (a) { var p = pt(a, R + 12); s += '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 3).toFixed(1) + '" font-size="9" text-anchor="middle" fill="#334">' + (a > 180 ? a - 180 : a) + '</text>'; });
    if (t && t.steep != null) s += line(t.steep, R - 2, '#c62828', 1.6, '5 3');
    if (t && t.post != null && t.postAxis != null && t.needed) {
      s += line(t.postAxis, R + 2, '#D4A017', 4.5);
      var m1 = pt(t.postAxis, R - 6), m2 = pt(t.postAxis + 180, R - 6);
      s += '<circle cx="' + m1[0].toFixed(1) + '" cy="' + m1[1].toFixed(1) + '" r="4" fill="#D4A017"/><circle cx="' + m2[0].toFixed(1) + '" cy="' + m2[1].toFixed(1) + '" r="4" fill="#D4A017"/>';
      s += '<rect x="58" y="96" width="104" height="13" rx="3" fill="#fff" opacity=".9"/>';
    }
    if (t && t.inc != null) {
      var i1 = pt(t.inc - 7, R + 1), i2 = pt(t.inc + 7, R + 1), ip = pt(t.inc, R - 14);
      s += '<path d="M' + i1[0].toFixed(1) + ' ' + i1[1].toFixed(1) + ' A ' + (R + 1) + ' ' + (R + 1) + ' 0 0 0 ' + i2[0].toFixed(1) + ' ' + i2[1].toFixed(1) + '" stroke="#2563eb" stroke-width="6" fill="none" stroke-linecap="round"/>';
      s += '<text x="' + ip[0].toFixed(1) + '" y="' + (ip[1] + 3).toFixed(1) + '" font-size="8" font-weight="700" text-anchor="middle" fill="#2563eb">inc</text>';
    }
    s += '<text x="110" y="' + (t && t.needed ? 106 : 114) + '" font-size="12" font-weight="900" text-anchor="middle" fill="#1A3C6E">' + (eye === 'od' ? 'RE' : 'LE') + '</text>';
    if (t && t.needed && t.postAxis != null) s += '<text x="110" y="118" font-size="8.5" font-weight="800" text-anchor="middle" fill="#8a6400">align ' + t.postAxis + '°</text>';
    s += '</svg>';
    return s;
  }
  function toricText(t, barrett) {
    if (!t) return '';
    if (t.msg) return '<div class="dx-muted">' + esc(t.msg) + '</div>';
    var h = '<div><b>Corneal astigmatism (K):</b> ' + t.cyl.toFixed(2) + ' D, steep axis ' + t.steep + '°</div>';
    if (t.inc != null) h += '<div><b>Main incision:</b> ' + t.inc + '° · SIA ' + (t.sia || 0).toFixed(2) + ' D</div>';
    h += '<div><b>Expected after surgery (cornea):</b> ' + t.post.toFixed(2) + ' D @ ' + t.postAxis + '°</div>';
    if (t.msg2) return h + '<div class="dx-muted">' + esc(t.msg2) + '</div>';
    if (!t.needed) h += '<div style="color:#1a8c3c;font-weight:800">Below 0.75 D — a toric lens is usually not needed.</div>';
    else {
      h += '<div><b>Lens cylinder needed:</b> ' + t.iolCyl.toFixed(2) + ' D at the IOL plane' + (t.lens ? ' (' + esc(t.lens) + ' position)' : '') + '</div>';
      h += '<div style="font-weight:900;color:#8a6400">Align the toric IOL at ' + t.postAxis + '°' + (t.best ? ' — ' + t.best.iol.toFixed(2) + ' D cylinder → residual ' + t.best.residual.toFixed(2) + ' D @ ' + t.best.resAxis + '°' + (t.best.over ? ' (over-correction, axis flips)' : '') : '') + '</div>';
      h += '<div class="dx-opts">' + t.options.slice(0, 3).map(function (o) { return o.iol.toFixed(2) + ' D → ' + o.residual.toFixed(2) + ' D @ ' + o.resAxis + '°'; }).join(' · ') + '</div>';
    }
    if (barrett && (barrett.tmodel || barrett.taxis)) h += '<div style="margin-top:4px;padding:4px 6px;border:1px solid #9bd3ad;background:#eef9f1;border-radius:6px"><b>Barrett Toric (biometer):</b> ' + esc([barrett.tmodel, barrett.taxis ? '@ ' + barrett.taxis + '°' : '', barrett.tres ? 'residual ' + barrett.tres : ''].filter(Boolean).join(' ')) + '</div>';
    h += '<div class="dx-muted">Anterior keratometry + SIA only (posterior cornea not included) — follow the Barrett Toric result when available.</div>';
    return h;
  }
  function barrettOf(eye) { var g = function (k) { return val('dx-' + eye + '-b' + k); }; return { lens: g('lens'), power: g('power'), ref: g('ref'), tmodel: g('tmodel'), taxis: g('taxis'), tres: g('tres') }; }

  // ───────────────────────── screen ─────────────────────────
  var CSS = '<style id="dx-css">.dx-muted{font-size:10.5px;color:#667085}.dx-opts{font-size:11px;color:#444;margin-top:2px}.dx-res table{border-collapse:collapse;width:100%;font-size:11.5px}.dx-res th,.dx-res td{border:1px solid #e3e8f2;padding:4px 6px;text-align:center}.dx-res th{background:#f2f6fc;font-size:10px;color:#52627a}.dx-res td.l{text-align:left;font-weight:800}.dx-pick{font-weight:900;color:#1A3C6E}.dx-eye{border:1px solid #d8e1ef;border-radius:10px;padding:8px;background:#fff}.dx-in{width:100%;font-size:12px;padding:5px 6px;border:1px solid #d8e1ef;border-radius:6px;box-sizing:border-box}</style>';
  function inp(id, ph, w, type) { return '<input id="' + id + '" class="dx-in" ' + (type ? 'type="' + type + '" step="any" ' : '') + 'placeholder="' + esc(ph || '') + '" style="' + (w ? 'width:' + w : '') + '">'; }
  function injectForm() {
    var panel = document.getElementById('bio-calc-panel'); if (!panel || document.getElementById('dx-extra')) return;
    if (!document.getElementById('dx-css')) document.head.insertAdjacentHTML('beforeend', CSS);
    var box = document.createElement('div'); box.id = 'dx-extra';
    box.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-bottom:10px;padding:8px;border:1px solid #f0d68a;background:#fffbf0;border-radius:10px">'
      + '<div><label class="fl">The K "Axis" value is the…</label><select id="dx-axis-mode" class="dx-in"><option value="">— choose (needed for toric) —</option><option value="k1">axis of K1</option><option value="steep">steep axis (of the higher K)</option></select></div>'
      + '<div><label class="fl">Main incision RE (°)</label>' + inp('dx-od-inc', 'e.g. 180 temporal', '', 'number') + '</div>'
      + '<div><label class="fl">Main incision LE (°)</label>' + inp('dx-os-inc', 'e.g. 0 temporal', '', 'number') + '</div>'
      + '<div><label class="fl">Toric cylinders available (IOL plane, D)</label>' + inp('dx-toric-cyls', CYLS_DEFAULT) + '</div></div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' + ['od', 'os'].map(function (e) {
        return '<div style="border:1px dashed #9bd3ad;border-radius:10px;padding:8px;background:#f7fcf8"><div style="font-size:11px;font-weight:900;color:#1a8c3c;margin-bottom:6px">' + (e === 'od' ? 'RE' : 'LE') + ' — Barrett from the biometer printout (optional)</div>'
          + '<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:6px"><select id="dx-' + e + '-blens" class="dx-in dx-blens"><option value="">— lens —</option></select>' + inp('dx-' + e + '-bpower', 'Power D', '', 'number') + inp('dx-' + e + '-bref', 'Pred. refr.', '', 'number') + '</div>'
          + '<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:6px;margin-top:6px">' + inp('dx-' + e + '-btmodel', 'Barrett Toric model / cyl') + inp('dx-' + e + '-btaxis', 'Axis °', '', 'number') + inp('dx-' + e + '-btres', 'Residual') + '</div></div>';
      }).join('') + '</div>';
    var anchor = document.getElementById('bio-sia'); anchor = anchor && anchor.closest('.fg3');
    if (anchor) anchor.parentNode.insertBefore(box, anchor.nextSibling); else panel.appendChild(box);
    var res = document.createElement('div'); res.id = 'dx-results'; res.className = 'dx-res'; res.style.marginTop = '12px';
    var note = Array.prototype.find.call(panel.children, function (c) { return /Planning aid only/.test(c.textContent || ''); });
    if (note) { note.innerHTML = 'SRK/T, Hoffer Q and Holladay 1 are calculated here with the published equations (Haigis when the lens has its own a0/a1/a2). Barrett is not published — type it in from the biometer. Lens constants marked “from A” are converted from the A-constant; check every lens’s constants on IOLCon. Final lens and toric alignment are surgeon confirmed.'; panel.insertBefore(res, note); }
    else panel.appendChild(res);
    var m = null; try { m = localStorage.getItem('bmh_dx_axis_mode'); } catch (e) {}
    if (m) document.getElementById('dx-axis-mode').value = m;
    var sel = document.getElementById('bio-formula');
    if (sel && !/Hoffer Q · Holladay/.test(sel.innerHTML)) sel.innerHTML = '<option>SRK/T · Hoffer Q · Holladay 1 · Haigis</option>';
    panel.addEventListener('input', schedule); panel.addEventListener('change', function (e) { if (e.target && e.target.id === 'dx-axis-mode') { try { localStorage.setItem('bmh_dx_axis_mode', e.target.value); } catch (er) {} } schedule(); });
    applyPending();
  }
  var t0 = null;
  function schedule() { clearTimeout(t0); t0 = setTimeout(renderResults, 250); }
  function lensesFor(eye) {
    var rows = []; try { rows = getBiometryIolRowsFromDom(); } catch (e) {}
    var use = rows.filter(function (r) { return eye === 'od' ? r.useOd !== false : r.useOs !== false; });
    return (use.length ? use : rows).slice(0, 8);
  }
  function cellPick(r) { return r ? '<span class="dx-pick">' + r.pick.toFixed(2) + '</span><div class="dx-muted">' + sgn(r.pickRef) + '</div>' : '<span class="dx-muted">—</span>'; }
  function renderResults() {
    var el = document.getElementById('dx-results'); if (!el) return;
    try { fillBarrettLens(); } catch (e) {}
    var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">';
    ['od', 'os'].forEach(function (eye) {
      var d = eyeData(eye), b = barrettOf(eye);
      html += '<div class="dx-eye"><div style="font-size:12px;font-weight:900;color:' + (eye === 'od' ? '#1A3C6E' : '#1a8c3c') + ';margin-bottom:6px">' + (eye === 'od' ? 'Right Eye' : 'Left Eye') + ' — IOL power for target ' + sgn(d.target) + ' D</div>';
      html += '<table><thead><tr><th>IOL</th><th>SRK/T</th><th>Hoffer Q</th><th>Holladay 1</th><th>Haigis</th><th>Barrett*</th></tr></thead><tbody>';
      lensesFor(eye).forEach(function (iol) {
        var c = calcLens(eye, iol, d);
        var bm = b.power && b.lens && String(b.lens).toLowerCase() === String(iol.name).toLowerCase();
        html += '<tr><td class="l">' + esc(iol.name) + (c.ok && (c.c.pACDfromA || c.c.SFfromA) ? '<div class="dx-muted">constants from A ' + c.c.A + '</div>' : '') + '</td>'
          + (c.ok ? '<td>' + cellPick(c.srkt) + '</td><td>' + cellPick(c.hq) + '</td><td>' + cellPick(c.h1) + '</td><td>' + (c.hg ? cellPick(c.hg) : '<span class="dx-muted">needs a0/a1/a2</span>') + '</td>' : '<td colspan="4" class="dx-muted">' + esc(c.msg) + '</td>')
          + '<td>' + (bm ? '<span class="dx-pick">' + esc(b.power) + '</span><div class="dx-muted">' + esc(b.ref || '') + '</div>' : '<span class="dx-muted">—</span>') + '</td></tr>';
      });
      html += '</tbody></table><div class="dx-muted" style="margin-top:3px">Bold = suggested power · below it the predicted refraction. *Barrett as typed from the biometer' + (b.power && !b.lens ? ' — choose its lens in the Barrett box (' + esc(b.power) + ' D entered)' : '') + '.</div>' + alNote(d);
      var t = toric(eye);
      html += '<div style="display:grid;grid-template-columns:150px 1fr;gap:8px;align-items:center;margin-top:8px;border-top:1px solid #eef0f4;padding-top:8px">' + chart(eye, t, 150) + '<div style="font-size:11.5px;line-height:1.45">' + toricText(t, b) + '</div></div></div>';
    });
    el.innerHTML = html + '</div>';
  }
  window.bmhDiagnosticsRender = renderResults;
  function alNote(d) {
    if (!(d.al > 0)) return '';
    var t = d.al < 22 ? 'Short eye (AL < 22 mm): Hoffer Q (and Haigis / Barrett) are generally preferred over SRK/T.' : d.al > 26 ? 'Long eye (AL > 26 mm): SRK/T and Barrett are generally preferred; Hoffer Q / Holladay 1 tend to leave a hyperopic surprise.' : 'Average eye: the formulas usually agree within 0.5 D.';
    return '<div class="dx-muted" style="color:#7a5b00">' + t + '</div>';
  }
  function fillBarrettLens() {
    var rows = []; try { rows = getBiometryIolRowsFromDom(); } catch (e) {}
    Array.prototype.forEach.call(document.querySelectorAll('.dx-blens'), function (sel) {
      var cur = sel.value || sel.getAttribute('data-want') || '';
      var names = rows.map(function (r) { return r.name; }).filter(Boolean);
      if (cur && names.indexOf(cur) < 0) names.unshift(cur);
      var html = '<option value="">— lens —</option>' + names.map(function (n) { return '<option' + (n === cur ? ' selected' : '') + '>' + esc(n) + '</option>'; }).join('');
      if (sel.innerHTML !== html) sel.innerHTML = html;
    });
  }

  // ───────────────────────── save / restore the new fields with the visit ─────────────────────────
  var EXTRA = ['dx-axis-mode', 'dx-od-inc', 'dx-os-inc', 'dx-toric-cyls'];
  ['od', 'os'].forEach(function (e) { ['blens', 'bpower', 'bref', 'btmodel', 'btaxis', 'btres'].forEach(function (k) { EXTRA.push('dx-' + e + '-' + k); }); });
  var pending = null;
  function applyPending() { if (!pending) return; EXTRA.forEach(function (id) { var el = document.getElementById(id); if (el && pending[id] != null && pending[id] !== '') { if (el.tagName === 'SELECT') { el.setAttribute('data-want', pending[id]); try { fillBarrettLens(); } catch (e) {} } el.value = pending[id]; } }); pending = null; schedule(); }
  var origGet = window.getBiometryPayload;
  if (typeof origGet === 'function') {
    window.getBiometryPayload = function () {
      var p = origGet.apply(this, arguments) || {};
      var x = {}; EXTRA.forEach(function (id) { var el = document.getElementById(id); if (el) x[id] = el.value; });
      p.dx = x; return p;
    };
  }
  var origRestore = window.restoreBiometryPayload;
  if (typeof origRestore === 'function') {
    window.restoreBiometryPayload = function (data) {
      var r = origRestore.apply(this, arguments);
      try {
        injectForm();
        var x = (data && data.dx) || {};
        EXTRA.forEach(function (id) { var el = document.getElementById(id); if (el && id !== 'dx-axis-mode') { if (el.tagName === 'SELECT') { el.setAttribute('data-want', x[id] || ''); try { fillBarrettLens(); } catch (e) {} } el.value = x[id] || ''; } });
        if (x['dx-axis-mode']) { var m = document.getElementById('dx-axis-mode'); if (m) m.value = x['dx-axis-mode']; }
        if (!document.getElementById('dx-extra')) pending = x;
        schedule();
      } catch (e) {}
      return r;
    };
  }
  ['prepareBiometryTab', 'toggleBiometryCalcPanel', 'loadBiometryIolConstants'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { var r = o.apply(this, arguments); try { injectForm(); schedule(); } catch (e) {} return r; };
  });

  // ───────────────────────── print ─────────────────────────
  window.printBiometryIolCalculation = function () {
    try { syncBiometryFromEyeExam(); } catch (e) {}
    try { saveBiometryIolConstants({ silent: true }); } catch (e) {}
    try { if (typeof saveVisit === 'function') saveVisit('ophtho', { silent: true, autosave: true }); } catch (e) {}
    injectForm();
    var pt = window.CURRENT_PATIENT || {};
    var logo = window.LH_SRC ? '<img src="' + window.LH_SRC + '" style="height:50px;width:auto;object-fit:contain">' : '<div style="font-size:17px;font-weight:900;color:#1A3C6E">BAWEJA MULTISPECIALITY HOSPITAL</div>';
    var today = new Date(); var dstr = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
    var page = function (eye) {
      var d = eyeData(eye), b = barrettOf(eye), t = toric(eye), lenses = lensesFor(eye);
      if (!(d.al > 0)) return '';
      var m = function (k, v) { return '<div class="m"><b>' + k + '</b><span>' + esc(v) + '</span></div>'; };
      var skipped = [];
      var blocks = lenses.map(function (iol) {
        var c = calcLens(eye, iol, d);
        if (!c.ok) { skipped.push(iol.name); return ''; }
        var cols = [['SRK/T', c.srkt], ['Hoffer Q', c.hq], ['Holladay 1', c.h1]].concat(c.hg ? [['Haigis', c.hg]] : []);
        var powers = {}; cols.forEach(function (cl) { if (cl[1]) cl[1].list.forEach(function (x) { powers[x.p.toFixed(2)] = 1; }); });
        var plist = Object.keys(powers).map(Number).sort(function (a, b2) { return b2 - a; });
        var fm = function (f, P) { return f ? f.refr(P) : null; };
        var fns = { 'SRK/T': F.srkt(d.al, d.k, c.c.A), 'Hoffer Q': F.hofferq(d.al, d.k, c.c.pACD), 'Holladay 1': F.holladay1(d.al, d.k, c.c.SF), 'Haigis': c.hg ? F.haigis(d.al, d.k, d.acd, c.c.haigis[0], c.c.haigis[1], c.c.haigis[2]) : null };
        var bm = b.power && b.lens && String(b.lens).toLowerCase() === String(iol.name).toLowerCase();
        return '<div class="lens"><div class="ln">' + esc(iol.name) + ' <span class="muted">' + esc([iol.company, iol.type].filter(Boolean).join(' · ')) + '</span></div>'
          + '<div class="muted">A ' + c.c.A + ' · pACD ' + c.c.pACD.toFixed(2) + (c.c.pACDfromA ? '*' : '') + ' · SF ' + c.c.SF.toFixed(2) + (c.c.SFfromA ? '*' : '') + (c.c.haigis ? ' · Haigis ' + c.c.haigis.join('/') : '') + '</div>'
          + '<table><thead><tr><th>IOL (D)</th>' + cols.map(function (cl) { return '<th>' + cl[0] + '</th>'; }).join('') + '</tr></thead><tbody>'
          + plist.map(function (P) {
            return '<tr><td><b>' + P.toFixed(2) + '</b></td>' + cols.map(function (cl) { var r = fm(fns[cl[0]], P), pick = cl[1] && Math.abs(cl[1].pick - P) < 0.001; return '<td' + (pick ? ' class="pk"' : '') + '>' + sgn(r) + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table>'
          + '<div class="sum">For target ' + sgn(d.target) + ': ' + cols.map(function (cl) { return cl[0] + ' <b>' + (cl[1] ? cl[1].pick.toFixed(2) : '—') + '</b>'; }).join(' · ') + (bm ? ' · Barrett* <b>' + esc(b.power) + '</b>' + (b.ref ? ' (' + esc(b.ref) + ')' : '') : '') + '</div></div>';
      }).join('');
      return '<section class="page"><div class="hdr"><div>' + logo + '<div class="muted">' + dstr + '</div></div><div style="text-align:right"><div class="title">IOL Calculation — ' + (eye === 'od' ? 'Right Eye (RE)' : 'Left Eye (LE)') + '</div><div class="pn">' + esc(pt.name || '') + '</div><div class="pid">' + esc(pt.bmhId || '') + (pt.age ? ' · ' + esc(pt.age) + 'Y' : '') + (pt.sex ? ' / ' + esc(pt.sex) : '') + '</div></div></div>'
        + '<div class="top"><div><div class="ms">' + m('AL', d.al != null ? d.al.toFixed(2) + ' mm' : '—') + m('ACD', d.acd != null ? d.acd.toFixed(2) + ' mm' : '—') + m('LT', d.lt != null ? d.lt.toFixed(2) + ' mm' : '—') + m('K1 / K2', (d.k1 != null ? d.k1.toFixed(2) : '—') + ' / ' + (d.k2 != null ? d.k2.toFixed(2) : '—') + ' D') + m('K axis', d.axis != null ? d.axis + '° (' + (t.mode === 'k1' ? 'K1' : t.mode === 'steep' ? 'steep' : '?') + ')' : '—') + m('Mean K', d.k != null ? d.k.toFixed(2) + ' D' : '—') + m('Target', sgn(d.target) + ' D') + m('SIA / incision', (num(val('bio-sia')) || 0).toFixed(2) + ' D @ ' + (t.inc != null ? t.inc + '°' : '—')) + '</div>'
        + '<div class="tor">' + toricText(t, b) + '</div></div><div>' + chart(eye, t, 200) + '<div class="legend"><span style="color:#c62828">- - steep K</span> · <span style="color:#8a6400">━ toric IOL axis</span> · <span style="color:#2563eb">▬ main incision</span></div></div></div>'
        + '<div class="lenses">' + blocks + '</div>' + (skipped.length ? '<div class="muted" style="margin-top:3px">Not calculated (no A-constant entered): ' + esc(skipped.join(', ')) + '</div>' : '') + '<div style="margin-top:3px">' + alNote(d) + '</div>' + (b.power && !b.lens ? '<div style="margin-top:3px"><b>Barrett (biometer):</b> ' + esc(b.power) + ' D' + (b.ref ? ' → ' + esc(b.ref) : '') + '</div>' : '')
        + '<div class="foot">SRK/T (Retzlaff 1990), Hoffer Q (Hoffer 1993/2007), Holladay 1 (1988), Haigis — published equations. Shaded = suggested power for the target. * pACD / SF converted from the A-constant (no lens-specific value entered). Barrett Universal II / Toric: values from the biometer printout. Verify lens constants (IOLCon) and confirm with the biometer before surgery. Surgeon signature: ____________________</div></section>';
    };
    var css = '@page{size:A4 landscape;margin:7mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#172033;font-size:9.5px;margin:0}.page{page-break-after:always}.page:last-child{page-break-after:auto}.hdr{display:flex;justify-content:space-between;border-bottom:2px solid #1A3C6E;padding-bottom:5px;margin-bottom:6px}.title{font-size:17px;font-weight:900;color:#1A3C6E}.pn{font-size:16px;font-weight:900}.pid{font-size:13px;font-weight:900;color:#1A3C6E}.muted{color:#667085;font-size:8.5px}.top{display:grid;grid-template-columns:1fr 230px;gap:8px;margin-bottom:6px}.ms{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}.m{border:1px solid #dde5f2;border-radius:5px;padding:3px 5px;display:flex;justify-content:space-between;gap:4px}.m b{color:#52627a}.m span{font-weight:900}.tor{margin-top:6px;border:1px solid #f0d68a;background:#fffbf0;border-radius:6px;padding:5px 7px;font-size:9.5px;line-height:1.45}.dx-muted{color:#667085;font-size:8.5px}.dx-opts{font-size:9px}.legend{text-align:center;font-size:8px;margin-top:2px}.lenses{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.lens{border:1px solid #cfd7e6;border-radius:6px;padding:4px 5px;break-inside:avoid}.ln{font-weight:900;font-size:10.5px}.lens table{width:100%;border-collapse:collapse;margin-top:3px}.lens th{background:#1A3C6E;color:#fff;font-size:8px;padding:2px}.lens td{border:1px solid #e1e7f0;text-align:center;padding:1.5px 2px;font-size:9px}td.pk{background:#ffe9a8;font-weight:900}.sum{margin-top:3px;font-size:8.8px}.foot{margin-top:6px;border-top:1px solid #d8e1ef;padding-top:4px;font-size:8px;color:#52627a}';
    var body = page('od') + page('os');
    if (!body) { try { showToast('Enter AL and K values first', 'w'); } catch (e) {} return; }
    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>IOL Calculation</title><style>' + css + '</style></head><body>' + body + '</body></html>';
    try { safePrint(html); } catch (e) { var w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); w.focus(); w.print(); } }
  };

  // ───────────────────────── refractive maths ─────────────────────────
  // spectacle → corneal plane (12 mm vertex) for each meridian; ablation = Munnerlyn (OZ²/3 µm per D) on the most
  // myopic meridian; PTA = (flap/cap + ablation) / CCT. SMILE lenticule adds a 15 µm minimum thickness.
  var OZ = 6.5;
  function vtx(F) { return F / (1 - 0.012 * F); }
  function meridians(sph, cyl) { cyl = cyl || 0; return [vtx(sph), vtx(sph + cyl)]; }
  window.bmhRefrCalc = {
    ablation: function (sph, cyl, proc) {
      if (sph == null || !isFinite(sph)) return null;
      var m = meridians(sph, cyl), myop = Math.min(m[0], m[1], 0);
      var depth = Math.abs(myop) * OZ * OZ / 3;
      if (proc === 'SMILE Pro' && depth > 0) depth += 15;
      return Math.round(depth);
    },
    hyperopic: function (sph, cyl) { var m = meridians(sph, cyl || 0); return Math.min(m[0], m[1]) >= 0 && Math.max(m[0], m[1]) > 0; },
    read: function (eye, lastVisit) {
      var lv = lastVisit || {}, E = eye === 'os' ? 'OS' : 'OD';
      var g = function (id, fb) { var el = document.getElementById(id); var v = el && String(el.value || '').trim() !== '' ? el.value : fb; return num(v); };
      return { sph: g('subj-' + eye + '-sph', lv['subj' + E + 'sph']), cyl: g('subj-' + eye + '-cyl', lv['subj' + E + 'cyl']) || 0 };
    },
    rsb: function (pachy, flap, sph, cyl, proc) { var a = this.ablation(sph, cyl, proc); return (pachy != null && a != null) ? Math.round(pachy - (flap || 0) - a) : null; },
    pta: function (pachy, flap, sph, cyl, proc) { var a = this.ablation(sph, cyl, proc); return (pachy > 0 && a != null) ? Math.round(((flap || 0) + a) / pachy * 100) : null; },
    OZ: OZ
  };

  // ───────────────────────── rename: Biometry → Diagnostics ─────────────────────────
  function rename() {
    Array.prototype.forEach.call(document.querySelectorAll('.ptab'), function (t) { if (/oe-biometry/.test(t.getAttribute('onclick') || '') && /Biometry/.test(t.textContent)) t.textContent = 'Diagnostics'; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { rename(); injectForm(); }); else { rename(); injectForm(); }
})();
