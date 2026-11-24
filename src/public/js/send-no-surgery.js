/* BMH — Doctor screens → "📤 Send to Reception": surgeries are not listed (procedures, investigations and consultations
 * still are). Surgery charges (cataract / PMICS / phaco + IOL, IOL implantation, pterygium, trabeculectomy, vitrectomy,
 * keratoplasty, LSCS, normal delivery, laparoscopy, hysteroscopy, hysterectomy …) are entered directly at reception as before.
 * Procedures stay: YAG capsulotomy, laser iridotomy, intravitreal injections, MTP, chemical peel, ECT, etc.
 * Only the drop-down / suggestion list changes; sending, billing and reception are unchanged.
 * Off switch (this browser): localStorage.setItem('bmh_send_no_surgery_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_send_no_surgery_off') === '1') return; } catch (e) {}
  var SX = /cataract|phaco|pmics|pinhole\s*micro|micro\s*incision|\bsics\b|\becce\b|\biol\b|implant|pterygium|trab|vitrectomy|keratoplasty|corneal\s*graft|squint|strabismus|ptosis|dcr\b|dacryo|enucleation|evisceration|retinal\s*detachment|buckle|lscs|caesarean|cesarean|normal\s*delivery|vaginal\s*delivery|laparoscop|laparotomy|hysteroscop|hysterectom|myomectom|tubectomy|cerclage|ovarian\s*cystectomy/i;
  var KEEP = /yag|iridotomy|\blpi\b|intravitreal|injection|ranibizumab|bevacizumab|avastin|triamcinolone|laser\s*(photo|barrage|hair)|mtp|termination|chemical\s*peel|ect\b|consult|follow|biomet|iol\s*master|\boct\b|scan|topograph|visual\s*field|fundus|workup/i;
  function rows() { try { return (CHARGES_DATA || []).filter(Boolean); } catch (e) { return []; } }
  var cache = { n: -1, set: null };
  function surgeryNames() {
    var r = rows();
    if (cache.set && cache.n === r.length) return cache.set;
    var set = {};
    r.forEach(function (row) {
      var name = String(row.name || ''), blob = name + ' ' + String(row.parent || '');
      if (KEEP.test(name)) return;
      var sx = String(row.kind || '').toLowerCase() === 'surgery' || SX.test(blob) || (/eye\s*sx/i.test(row.cat || '') && !/procedure|laser/i.test(row.kind || '') && !KEEP.test(blob));
      if (sx) set[name.toLowerCase().trim()] = 1;
    });
    cache = { n: r.length, set: set };
    return set;
  }
  function prune(root) {
    if (!root) return;
    var sx = surgeryNames();
    Array.prototype.forEach.call(root.querySelectorAll('select option, datalist option'), function (o) {
      var v = String(o.value || ''); if (!v) return;
      var name = v.split('|')[0].toLowerCase().trim();
      if (sx[name]) o.remove();
    });
    Array.prototype.forEach.call(root.querySelectorAll('select optgroup'), function (g) { if (!g.querySelector('option')) g.remove(); });
  }
  function pruneAll() {
    prune(document.getElementById('ophtho-send-bar'));
    ['obg-top-send-bar', 'psych-top-send-bar', 'skin-top-send-bar', 'obg-rx-send-bar', 'psych-plan-send-bar', 'skin-rx-send-bar'].forEach(function (id) { prune(document.getElementById(id)); });
  }
  function wrap(name) {
    var o = window[name]; if (typeof o !== 'function') return false; if (o._nsx) return true;
    var w = function () { var r = o.apply(this, arguments); try { pruneAll(); } catch (e) {} return r; };
    w._nsx = true; window[name] = w; return true;
  }
  function install() { var a = wrap('renderOphthoSendChargeSelect'), b = wrap('renderDeptSendBar'), c = wrap('renderAllDeptSendBars'); try { pruneAll(); } catch (e) {} return a && b && c; }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
  window.bmhSendNoSurgery = { names: function () { return Object.keys(surgeryNames()); }, prune: pruneAll };
})();
