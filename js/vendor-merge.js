/* BMH — merge similar vendor names (Billing → Vendors, admin).
 * Finds vendor names that are the same supplier written differently, e.g. "Care Group Sight Solutions" /
 * "Care group sight sol", "Optivision Surgicals" / "OPTIVISION SURGICAL PVT LTD", and shows them for a quick check:
 *   • Sure matches (only capitals, spaces, dots, "Pvt Ltd", plural "s" differ) are ticked already.
 *   • Possible matches (short forms, small spelling differences) are NOT ticked — tick them only if they are the same.
 * On "Merge", every bill, payment, purchase, ledger entry and stock item of the merged names is renamed to the chosen
 * name. The merge is remembered, so the old spelling typed later is saved under the chosen name automatically.
 */
(function () {
  'use strict';
  var ALIAS = {}; // normalised old name → chosen name
  try { ALIAS = JSON.parse(localStorage.getItem('bmh_vendor_alias_v1') || '{}') || {}; } catch (e) { ALIAS = {}; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function isAdmin() { try { return typeof isAdminUser === 'function' ? !!isAdminUser() : !!(CURRENT_USER && CURRENT_USER.isAdmin); } catch (e) { return false; } }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || ''; } catch (e) { return ''; } }
  function lower(s) { return String(s || '').trim().replace(/\s+/g, ' ').toLowerCase(); }
  var DROP = { pvt: 1, private: 1, ltd: 1, limited: 1, llp: 1, inc: 1, corp: 1, co: 1, company: 1, the: 1, ms: 1, m: 1, s: 1 };
  function tokens(name) {
    return String(name || '').toLowerCase().replace(/&/g, ' and ').replace(/m\/s\.?/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim().split(' ')
      .filter(function (t) { return t && !DROP[t]; })
      .map(function (t) { return t.length > 3 && /[^s]s$/.test(t) ? t.slice(0, -1) : t; });
  }
  function sureKey(name) { return tokens(name).join(''); }
  function lev(a, b) {
    if (a === b) return 0; var m = a.length, n = b.length; if (!m || !n) return m || n;
    var prev = []; for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) { var cur = [i]; for (var k = 1; k <= n; k++) cur[k] = Math.min(prev[k] + 1, cur[k - 1] + 1, prev[k - 1] + (a[i - 1] === b[k - 1] ? 0 : 1)); prev = cur; }
    return prev[n];
  }
  // "possible" = short form (each word of the shorter name starts the matching word of the longer one) or a small typo
  function possible(a, b) {
    var ta = tokens(a), tb = tokens(b); if (!ta.length || !tb.length) return false;
    var s = (ta.length < tb.length || (ta.length === tb.length && ta.join('').length <= tb.join('').length)) ? ta : tb, l = s === ta ? tb : ta;
    if (s.join('').length >= 5 && (s.length >= 2 || s[0].length >= 6)) {
      var ok = s.every(function (t, i) { return l[i] && l[i].indexOf(t) === 0 && (t.length >= 3 || t === l[i]); });
      if (ok && (s.length >= 2 || l.length <= 2)) return true;
    }
    var ca = ta.join(''), cb = tb.join('');
    if (Math.min(ca.length, cb.length) >= 7) { var d = lev(ca, cb); if (d <= Math.max(1, Math.floor(Math.max(ca.length, cb.length) * 0.12))) return true; }
    return false;
  }
  // every place a vendor name is kept
  function arrays() { return ['BMH_VENDOR_BILLS', 'BMH_PURCHASES', 'BMH_INVENTORY_USAGE', 'BMH_INVENTORY_TRANSFERS', 'BMH_INVENTORY_REMOVALS', 'BMH_INVENTORY_INDENTS', 'BMH_OFFICE_BILLS', 'BMH_EXPENSES'].map(function (k) { return window[k] || []; }); }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function counts() {
    var c = {};
    var add = function (n, w) { n = String(n || '').trim(); if (!n) return; c[n] = (c[n] || 0) + (w || 1); };
    (window.BMH_VENDOR_BILLS || []).forEach(function (v) { if (v) add(v.vendor, 3); });
    (window.BMH_PURCHASES || []).forEach(function (p) { if (p) add(p.vendor, 1); });
    inv().forEach(function (i) { if (i) add(i.vendor, 1); });
    return c;
  }
  var memo = { sig: '', out: null };
  function groups() {
    var c0 = counts(), sig = Object.keys(c0).sort().map(function (k) { return k + ':' + c0[k]; }).join('|');
    if (memo.sig === sig && memo.out) return memo.out.map(function (g) { return Object.assign({}, g, { pick: g.sure }); });
    memo.sig = sig; memo.out = groupsNow(c0);
    return memo.out.map(function (g) { return Object.assign({}, g, { pick: g.sure }); });
  }
  function groupsNow(c) {
    var names = Object.keys(c);
    var parent = {}; names.forEach(function (n) { parent[n] = n; });
    var find = function (x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
    var sureEdge = {};
    var join = function (a, b, sure) { var ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; if (sure) sureEdge[a + '|' + b] = sureEdge[b + '|' + a] = 1; };
    var byKey = {};
    names.forEach(function (n) { var k = sureKey(n); if (!k) return; if (byKey[k]) join(byKey[k], n, true); else byKey[k] = n; });
    for (var i = 0; i < names.length; i++) for (var j = i + 1; j < names.length; j++) {
      if (find(names[i]) === find(names[j])) continue;
      if (possible(names[i], names[j])) join(names[i], names[j], false);
    }
    var g = {};
    names.forEach(function (n) { var r = find(n); (g[r] = g[r] || []).push(n); });
    return Object.keys(g).filter(function (r) { return g[r].length > 1; }).map(function (r) {
      var list = g[r].sort(function (a, b) { return (c[b] - c[a]) || (b.length - a.length) || a.localeCompare(b); });
      var keys = {}; list.forEach(function (n) { keys[sureKey(n)] = 1; });
      var sure = Object.keys(keys).length === 1;
      // suggested name: a full (not shortened) spelling, the most used one, not in ALL CAPS, without "Pvt Ltd" clutter
      var full = Math.max.apply(null, list.map(function (n) { return sureKey(n).length; }));
      var caps = function (n) { return n === n.toUpperCase() && /[A-Z]/.test(n) ? 1 : 0; };
      var canonical = list.filter(function (n) { return sureKey(n).length >= full - 1; })
        .sort(function (a, b) { return (c[b] - c[a]) || (caps(a) - caps(b)) || (a.length - b.length) || a.localeCompare(b); })[0];
      return { names: list, counts: list.map(function (n) { return c[n]; }), sure: sure, pick: sure, canonical: canonical };
    }).sort(function (a, b) { return (b.sure - a.sure) || a.canonical.localeCompare(b.canonical); });
  }
  function ensureFinancials() {
    if (!window.FBDB) return Promise.resolve(true);
    return window.FBDB.ref('financials').once('value').then(function (snap) {
      var remote = snap.val();
      var localTs = Number(localStorage.getItem('bmh_financials_updated_at') || 0);
      if (remote && Number(remote.updatedAt || 0) >= localTs) {
        window._bmhFinancialsHydrating = true;
        try { applyBmhFinancialsSnapshot(remote, { persistLocal: true }); } finally { window._bmhFinancialsHydrating = false; }
      }
      return true;
    }).catch(function () { return false; });
  }
  function renameAll(from, to) {
    var fromL = {}; from.forEach(function (n) { fromL[lower(n)] = 1; });
    var n = 0;
    arrays().forEach(function (arr) {
      arr.forEach(function (o) {
        if (!o || typeof o !== 'object') return;
        if (o.vendor && fromL[lower(o.vendor)] && o.vendor !== to) { o.vendor = to; n++; }
        if (o.party && fromL[lower(o.party)] && o.party !== to) { o.party = to; n++; }
        if (o.supplier && fromL[lower(o.supplier)] && o.supplier !== to) { o.supplier = to; n++; }
      });
    });
    (window.BMH_LEDGER || []).forEach(function (l) {
      if (!l) return;
      if (l.party && fromL[lower(l.party)] && l.party !== to) { l.party = to; n++; }
      from.forEach(function (f) { if (f !== to && l.narration && l.narration.indexOf('Vendor ' + f + ' ') === 0) { l.narration = 'Vendor ' + to + l.narration.slice(('Vendor ' + f).length); } });
    });
    var items = [];
    inv().forEach(function (i) { if (i && i.vendor && fromL[lower(i.vendor)] && i.vendor !== to) { i.vendor = to; items.push(i); n++; } });
    items.forEach(function (i) { try { if (typeof window.saveInventoryToFirebase === 'function') window.saveInventoryToFirebase(i); } catch (e) {} });
    try { saveInventoryStockToStorage(); } catch (e) {}
    return n;
  }
  function saveAlias(from, to) {
    from.forEach(function (f) { if (lower(f) !== lower(to)) ALIAS[lower(f)] = to; });
    // an alias pointing at a name that has now been merged follows it
    Object.keys(ALIAS).forEach(function (k) { if (from.some(function (f) { return lower(f) === lower(ALIAS[k]); }) && lower(ALIAS[k]) !== lower(to)) ALIAS[k] = to; });
    try { localStorage.setItem('bmh_vendor_alias_v1', JSON.stringify(ALIAS)); } catch (e) {}
    if (window.FBDB) { try { window.FBDB.ref('settings/vendorAliases').set({ map: encodeMap(ALIAS), updatedAt: new Date().toISOString(), by: who() }).catch(function () {}); } catch (e) {} }
  }
  function encodeMap(m) { var o = {}; Object.keys(m).forEach(function (k) { o[encodeURIComponent(k).replace(/\./g, '%2E')] = m[k]; }); return o; }
  function decodeMap(m) { var o = {}; Object.keys(m || {}).forEach(function (k) { try { o[decodeURIComponent(k)] = m[k]; } catch (e) {} }); return o; }
  var listening = false;
  function listen() {
    if (listening || !window.FBDB) return listening;
    listening = true;
    try { window.FBDB.ref('settings/vendorAliases').on('value', function (s) { var v = s.val(); if (v && v.map) { ALIAS = decodeMap(v.map); try { localStorage.setItem('bmh_vendor_alias_v1', JSON.stringify(ALIAS)); } catch (e) {} } }); } catch (e) { listening = false; }
    return listening;
  }
  if (!listen()) { var tries = 0, t = setInterval(function () { if (listen() || ++tries > 60) clearInterval(t); }, 4000); }
  function canonicalOf(name) { var a = ALIAS[lower(name)]; return a || name; }
  window.bmhVendorCanonical = canonicalOf;

  // ── merge dialog ──
  var current = [];
  function draw() {
    var ov = document.getElementById('vmg-ov'); if (!ov) return;
    var body = ov.querySelector('#vmg-body');
    if (!current.length) { body.innerHTML = '<div style="padding:16px;text-align:center;color:#1a8c3c;font-weight:800">No similar vendor names found ✓</div>'; ov.querySelector('#vmg-go').style.display = 'none'; return; }
    body.innerHTML = current.map(function (g, gi) {
      return '<div style="border:1px solid ' + (g.sure ? '#cfe8d6' : '#f0d68a') + ';background:' + (g.sure ? '#f6fbf7' : '#fffbf0') + ';border-radius:10px;padding:9px 11px;margin-bottom:8px">'
        + '<label style="display:flex;gap:8px;align-items:center;font-size:12.5px;font-weight:800;cursor:pointer"><input type="checkbox" class="vmg-pick" data-g="' + gi + '"' + (g.pick ? ' checked' : '') + ' style="width:18px;height:18px;margin:0"> '
        + (g.sure ? 'Same vendor — merge' : 'Possibly the same vendor — tick to merge') + '</label>'
        + '<div style="font-size:11.5px;margin:6px 0 4px 26px">Keep this name:</div>'
        + g.names.map(function (n, ni) { return '<label style="display:flex;gap:8px;align-items:center;margin-left:26px;padding:2px 0;font-size:12.5px;cursor:pointer"><input type="radio" name="vmg-c' + gi + '" data-g="' + gi + '" data-n="' + ni + '"' + (n === g.canonical ? ' checked' : '') + ' style="width:auto;margin:0"> ' + esc(n) + ' <span style="color:#888;font-size:11px">(' + g.counts[ni] + ')</span></label>'; }).join('')
        + '</div>';
    }).join('');
    [].forEach.call(body.querySelectorAll('.vmg-pick'), function (c) { c.onchange = function () { current[Number(c.getAttribute('data-g'))].pick = c.checked; count(); }; });
    [].forEach.call(body.querySelectorAll('input[type=radio]'), function (r) { r.onchange = function () { var g = current[Number(r.getAttribute('data-g'))]; g.canonical = g.names[Number(r.getAttribute('data-n'))]; }; });
    count();
  }
  function count() {
    var ov = document.getElementById('vmg-ov'); if (!ov) return;
    var n = current.filter(function (g) { return g.pick; }).length;
    var go = ov.querySelector('#vmg-go'); go.style.display = ''; go.disabled = !n; go.textContent = n ? '🔗 Merge ' + n + ' group' + (n === 1 ? '' : 's') : 'Tick the groups to merge';
  }
  window.bmhOpenVendorMerge = function () {
    if (!isAdmin()) { toast('Only admin can merge vendor names', 'w'); return; }
    current = groups();
    var old = document.getElementById('vmg-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'vmg-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4600;background:rgba(10,20,40,.45);display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow:auto';
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:640px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><div style="flex:1"><div style="font-size:17px;font-weight:900">Merge similar vendor names</div><div style="font-size:11.5px;color:#666">Green = same name written differently (ticked). Yellow = possibly the same — tick only if it is the same supplier. Number in brackets = how often the name is used.</div></div><button type="button" class="btn btn-gray btn-sm" onclick="document.getElementById(\'vmg-ov\').remove()">Close</button></div>'
      + '<div id="vmg-body"></div><div style="text-align:right;margin-top:8px"><button type="button" class="btn btn-gold btn-sm" id="vmg-go"></button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#vmg-go').onclick = function () {
      var sel = current.filter(function (g) { return g.pick; }); if (!sel.length) return;
      if (!confirm('Merge ' + sel.length + ' vendor name group' + (sel.length === 1 ? '' : 's') + '?\n\n' + sel.map(function (g) { return '→ ' + g.canonical + '  (from: ' + g.names.filter(function (n) { return n !== g.canonical; }).join(', ') + ')'; }).join('\n'))) return;
      var btn = ov.querySelector('#vmg-go'); btn.disabled = true; btn.textContent = 'Merging…';
      ensureFinancials().then(function (ok) {
        if (!ok) { toast('Could not reach the server — check internet and try again', 'w'); btn.disabled = false; count(); return; }
        var changed = 0;
        sel.forEach(function (g) { var from = g.names.filter(function (n) { return n !== g.canonical; }); changed += renameAll(from, g.canonical); saveAlias(from, g.canonical); });
        try { saveBmhFinancials(); } catch (e) {}
        try { bmhRenderVendorTables(); } catch (e) {}
        try { if (typeof renderBillingPageIfActive === 'function') renderBillingPageIfActive(); } catch (e) {}
        toast(sel.length + ' vendor name group' + (sel.length === 1 ? '' : 's') + ' merged (' + changed + ' entries updated) ✓', 's');
        current = groups(); draw();
      });
    };
    draw();
  };

  // ── new entries typed with an old spelling are saved under the chosen name ──
  function fixInput(id) { var el = document.getElementById(id); if (el && el.value) { var c = canonicalOf(el.value.trim()); if (c !== el.value.trim()) el.value = c; } }
  ['bmhAddVendorBill', 'processBC', 'saveIolInventoryGrid'].forEach(function (fn) {
    var o = window[fn]; if (typeof o !== 'function') return;
    window[fn] = function () { try { ['inv-vend-name', 'bmh-vend-name', 'inv-in-vendor', 'inv-iol-vendor'].forEach(fixInput); } catch (e) {} return o.apply(this, arguments); };
  });
  var origRec = window.bmhRecordInventoryPurchase;
  if (typeof origRec === 'function') {
    window.bmhRecordInventoryPurchase = function (item) {
      try { if (item && item.vendor) item.vendor = canonicalOf(String(item.vendor).trim()); } catch (e) {}
      return origRec.apply(this, arguments);
    };
  }
  // admin button on the vendor summary card
  var origRT = window.bmhRenderVendorTables;
  if (typeof origRT === 'function') {
    window.bmhRenderVendorTables = function () {
      var r = origRT.apply(this, arguments);
      try {
        var sum = document.getElementById('inv-vendor-summary'); var hd = sum && sum.previousElementSibling;
        var old = hd && hd.querySelector('.vmg-btn'); if (old) old.remove();
        if (hd && isAdmin()) {
          var gs = groups(); if (!gs.length) return r;
          var b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-outline btn-sm vmg-btn';
          b.textContent = '🔗 Merge similar vendor names (' + gs.length + ')'; b.onclick = function () { bmhOpenVendorMerge(); };
          var st = hd.querySelector('.vst-hd-btn'); if (st) st.parentNode.insertBefore(b, st); else hd.appendChild(b);
        }
      } catch (e) {}
      return r;
    };
  }
  window.bmhVendorMerge = { groups: groups, possible: possible, sureKey: sureKey, alias: function () { return ALIAS; } };
})();
