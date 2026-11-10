/* BMH — one vendor, one name, when vendors are typed in (Stock In, IOL entry, vendor bills).
 *  • Capitals, extra spaces, dots, "Pvt Ltd" or a plural "s" never make a new vendor: "CARE GROUP SIGHT SOLUTIONS",
 *    "care group sight solution" and "Care Group Sight Solutions Pvt Ltd" are saved under the vendor's existing name
 *    (on leaving the box, and again when saving).
 *  • A name that only LOOKS like an existing vendor (short form or small spelling difference, e.g. "Care group sight
 *    sol") asks first: OK = use the existing vendor, Cancel = add it as a new vendor.
 *  • Names already merged in "🔗 Merge similar vendor names" follow the merge (vendor-merge.js).
 */
(function () {
  'use strict';
  var IDS = ['inv-vend-name', 'bmh-vend-name', 'inv-in-vendor', 'inv-iol-vendor'];
  function esc(s) { return String(s == null ? '' : s); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function trim(s) { return String(s || '').trim().replace(/\s+/g, ' '); }
  function VM() { return window.bmhVendorMerge || null; }
  function sureKey(n) { try { return VM().sureKey(n); } catch (e) { return trim(n).toLowerCase(); } }
  function aliasOf(n) { try { return typeof window.bmhVendorCanonical === 'function' ? trim(window.bmhVendorCanonical(n)) : n; } catch (e) { return n; } }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  // existing vendor names and how often each is used
  var memo = { at: 0, c: null };
  function counts() {
    if (memo.c && Date.now() - memo.at < 5000) return memo.c;
    var c = {};
    var add = function (n, w) { n = trim(n); if (!n) return; c[n] = (c[n] || 0) + w; };
    (window.BMH_VENDOR_BILLS || []).forEach(function (v) { if (v) add(v.vendor, 3); });
    (window.BMH_PURCHASES || []).forEach(function (p) { if (p) add(p.vendor, 1); });
    inv().forEach(function (i) { if (i) add(i.vendor, 1); });
    memo = { at: Date.now(), c: c };
    return c;
  }
  function caps(n) { return n === n.toUpperCase() && /[A-Z]/.test(n) ? 1 : 0; }
  function best(list, c) { return list.slice().sort(function (a, b) { return (c[b] - c[a]) || (caps(a) - caps(b)) || a.localeCompare(b); })[0]; }
  // the existing spelling for a typed name that differs only in capitals / spaces / dots / Pvt Ltd / plural s
  function sameName(typed) {
    var t = trim(typed); if (!t) return '';
    var a = aliasOf(t); if (a && a !== t) return a;
    var c = counts(); if (c[t]) return t;
    var k = sureKey(t); if (!k) return '';
    var hits = Object.keys(c).filter(function (n) { return sureKey(n) === k; });
    if (!hits.length) return '';
    var h = best(hits, c); return aliasOf(h) || h;
  }
  function lookAlikes(typed) {
    var t = trim(typed), c = counts(), seen = {};
    if (!VM() || !VM().possible) return [];
    return Object.keys(c).filter(function (n) { return VM().possible(t, n); })
      .map(function (n) { return aliasOf(n) || n; })
      .filter(function (n) { var k = n.toLowerCase(); if (seen[k] || k === t.toLowerCase()) return false; seen[k] = 1; return true; })
      .sort(function (a, b) { return (c[b] || 0) - (c[a] || 0); }).slice(0, 3);
  }
  window.bmhVendorExistingName = sameName;

  // ── while typing: on leaving the vendor box ──
  var declined = {};
  function check(el) {
    var t = trim(el.value); if (!t) return;
    var s = sameName(t);
    if (s) { if (s !== t) { el.value = s; toast('Existing vendor "' + s + '" used (same name)', 's'); } return; }
    if (declined[t.toLowerCase()]) return;
    var la = lookAlikes(t);
    if (!la.length) return;
    var pick = la[0];
    var msg = '"' + t + '" is a new vendor name, but it looks like the existing vendor "' + pick + '"' + (la.length > 1 ? ' (also: ' + la.slice(1).join(', ') + ')' : '') + '.\n\nOK = use "' + pick + '"\nCancel = add "' + t + '" as a NEW vendor';
    if (confirm(msg)) { el.value = pick; toast('Existing vendor "' + pick + '" used', 's'); }
    else declined[t.toLowerCase()] = 1;
  }
  document.addEventListener('change', function (e) {
    var el = e.target; if (!el || IDS.indexOf(el.id) < 0) return;
    try { check(el); } catch (er) { console.warn('[vendor-names]', er); }
  }, true);

  // ── when saving: capitals etc. never create a second vendor ──
  function fixInputs() { IDS.forEach(function (id) { var el = document.getElementById(id); if (el && el.value) { var s = sameName(el.value); if (s && s !== trim(el.value)) el.value = s; } }); }
  ['bmhAddVendorBill', 'processBC', 'saveIolInventoryGrid'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { try { fixInputs(); } catch (e) {} return o.apply(this, arguments); };
  });
  var origRec = window.bmhRecordInventoryPurchase;
  if (typeof origRec === 'function') {
    window.bmhRecordInventoryPurchase = function (item) {
      try { if (item && item.vendor) { var s = sameName(item.vendor); if (s) item.vendor = s; } } catch (e) {}
      return origRec.apply(this, arguments);
    };
  }
})();
