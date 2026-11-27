/* BMH — Download meter (v188). Measures how much data this computer receives from Firebase, so we can see
 * which data areas and which screens use the monthly download allowance. It only watches; it changes nothing
 * about how the HMS reads or saves data.
 *  • Counts every message arriving on the Firebase Realtime Database connection (both the legacy and the newer
 *    SDK use it) and every direct fetch of a ...firebasedatabase.app address (Bills & History, Practice Growth).
 *  • Each message is credited to its data area (first part of the database path, e.g. "patients",
 *    "transactions") and to the screen open at the time (the page name after # in the address).
 *  • Totals are kept per day on this computer and sent every 10 minutes as one tiny record to
 *    security/usage/<date>/<device>. Only Dr Varun's admin login sees them (Settings → "Download meter").
 *  • Figures are close estimates: they count the data as received by the browser, before any compression.
 * v2.2 (27 Nov): patient downloads are also split by kind, with counts — whole list, query (today's queue /
 *   search), queue change, single patient, single field — and each record carries the HMS version this page runs
 *   (app), so computers stuck on an old version show up.
 * Off switch (this browser): localStorage.setItem('bmh_netmeter_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_netmeter_off') === '1') return; } catch (e) {}
  if (window.__bmhNetMeter) return;
  var VER = 'v188';
  var PATH = 'security/usage';
  var OWNER = ['drvarun', 'drvarun@bawejahospital.com'];
  var LS = 'bmh_netmeter_day';
  var FLUSH_MS = 10 * 60 * 1000;

  function low(s) { return String(s || '').trim().toLowerCase(); }
  function dayKey(d) { d = d || new Date(); var m = d.getMonth() + 1, dd = d.getDate(); return d.getFullYear() + '-' + (m < 10 ? '0' : '') + m + '-' + (dd < 10 ? '0' : '') + dd; }
  function safeKey(s) { s = String(s || 'unknown').slice(0, 60); return s.replace(/[.#$\[\]\/]/g, '_') || 'unknown'; }
  function pageName() { try { var h = String(location.hash || '').replace(/^#\/?/, '').split(/[?&\/]/)[0]; return h || 'start'; } catch (e) { return 'start'; } }
  function rootOf(p) { p = String(p || '').replace(/^\/+/, ''); var r = p.split('/')[0]; return r || '(root)'; }

  // ── totals for today (kept across reloads on this computer) ──
  var T = null;
  function fresh() { return { day: dayKey(), total: 0, msgs: 0, roots: {}, pages: {}, rest: {}, pk: {}, pc: {}, since: new Date().toISOString() }; }
  // what kind of patient download: path + whether it belongs to a query (tagged reply)
  function patientKind(path, tagged) {
    var parts = String(path || '').replace(/^\/+/, '').split('/');
    if (parts[0] !== 'patients') return '';
    if (parts.length === 1 || !parts[1]) return tagged ? 'query' : 'wholeList';
    if (parts.length === 2) return tagged ? 'queueChange' : 'single';
    return 'field';
  }
  function appTag() { try { var sc = document.querySelector('script[src*="js/legacy.js?v="]'); var m = sc && /\?v=([^"'&\s>]+)/.exec(sc.getAttribute('src')); return m ? m[1] : ''; } catch (e) { return ''; } }
  function load() {
    try { var o = JSON.parse(localStorage.getItem(LS) || 'null'); if (o && o.day === dayKey()) return o; } catch (e) {}
    return fresh();
  }
  T = load();
  var dirty = false;
  function add(bytes, root, kind, pkind) {
    if (!bytes) return;
    if (T.day !== dayKey()) { flush(true); T = fresh(); }
    if (pkind) { T.pk = T.pk || {}; T.pc = T.pc || {}; T.pk[pkind] = (T.pk[pkind] || 0) + bytes; T.pc[pkind] = (T.pc[pkind] || 0) + 1; }
    var r = safeKey(root), pg = safeKey(pageName());
    T.total += bytes; T.msgs++;
    T.roots[r] = (T.roots[r] || 0) + bytes;
    T.pages[pg] = (T.pages[pg] || 0) + bytes;
    if (kind === 'rest') T.rest[r] = (T.rest[r] || 0) + bytes;
    dirty = true;
  }
  var saveTimer = null;
  function saveLocal() { if (saveTimer) return; saveTimer = setTimeout(function () { saveTimer = null; try { localStorage.setItem(LS, JSON.stringify(T)); } catch (e) {} }, 5000); }

  // ── Realtime Database connection (WebSocket) ──
  // Small replies arrive as one JSON message whose head holds "p":"<path>". Large replies arrive as a message
  // holding only a number N, followed by N pieces; the path is at the head of the first piece.
  var NativeWS = window.WebSocket;
  if (NativeWS) {
    var Wrapped = function (url, protocols) {
      var ws = protocols === undefined ? new NativeWS(url) : new NativeWS(url, protocols);
      try {
        if (/firebasedatabase\.app|firebaseio\.com/i.test(String(url))) {
          var pending = 0, pendBytes = 0, pendRoot = '', pendPath = '';
          var tagRe = /"t":\d+/;
          ws.addEventListener('message', function (ev) {
            try {
              var d = ev.data; var n = typeof d === 'string' ? d.length : (d && (d.byteLength || d.size)) || 0;
              if (typeof d !== 'string') { add(n, '(binary)', 'ws'); saveLocal(); return; }
              if (pending > 0) {
                if (!pendRoot) { var m0 = /"p":"([^"]*)"/.exec(d.slice(0, 400)); if (m0) { pendRoot = rootOf(m0[1]); pendPath = m0[1]; } }
                pendBytes += n; pending--;
                if (pending === 0) { add(pendBytes, pendRoot || '(unknown)', 'ws', patientKind(pendPath, tagRe.test(d.slice(-60)))); pendBytes = 0; pendRoot = ''; pendPath = ''; saveLocal(); }
                return;
              }
              if (n <= 6 && /^\d+$/.test(d)) { pending = parseInt(d, 10) || 0; pendBytes = n; pendRoot = ''; pendPath = ''; return; }
              var m = /"p":"([^"]*)"/.exec(d.slice(0, 400));
              add(n, m ? rootOf(m[1]) : '(connection)', 'ws', m ? patientKind(m[1], tagRe.test(d.slice(-60))) : ''); saveLocal();
            } catch (e) {}
          });
        }
      } catch (e) {}
      return ws;
    };
    Wrapped.prototype = NativeWS.prototype;
    ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'].forEach(function (k) { try { Wrapped[k] = NativeWS[k]; } catch (e) {} });
    window.WebSocket = Wrapped;
  }

  // ── Direct fetches of the database address (Bills & History, Practice Growth) ──
  var nativeFetch = window.fetch;
  if (nativeFetch) {
    window.fetch = function (input, init) {
      var url = ''; try { url = typeof input === 'string' ? input : (input && input.url) || ''; } catch (e) {}
      var p = nativeFetch.apply(this, arguments);
      if (!/firebasedatabase\.app|firebaseio\.com/i.test(url)) return p;
      return p.then(function (res) {
        try {
          var root = '(rest)';
          try { root = rootOf(decodeURIComponent(new URL(url).pathname).replace(/\.json$/, '')); } catch (e) {}
          var len = parseInt(res.headers.get('content-length') || '', 10);
          if (len > 0) { add(len, root, 'rest'); saveLocal(); }
          else res.clone().text().then(function (t) { add(t.length, root, 'rest'); saveLocal(); }).catch(function () {});
        } catch (e) {}
        return res;
      });
    };
  }

  // ── send today's totals (one small record per computer per day) ──
  function me() { try { return window.CURRENT_USER || (typeof CURRENT_USER !== 'undefined' ? CURRENT_USER : null); } catch (e) { return window.CURRENT_USER || null; } }
  function deviceId() {
    try { var d = localStorage.getItem('bmh_device_id'); if (!d) { d = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); localStorage.setItem('bmh_device_id', d); } return d; } catch (e) { return 'unknown'; }
  }
  function deviceLabel() {
    var ua = navigator.userAgent || '';
    var os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad/i.test(ua) ? 'iPhone/iPad' : /Windows/i.test(ua) ? 'Windows' : /Mac/i.test(ua) ? 'Mac' : /Linux/i.test(ua) ? 'Linux' : 'Other';
    var br = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
    return os + ' ' + br;
  }
  function top(obj, n) { var out = {}; Object.keys(obj || {}).sort(function (a, b) { return obj[b] - obj[a]; }).slice(0, n).forEach(function (k) { out[k] = Math.round(obj[k]); }); return out; }
  function flush(force) {
    try {
      saveLocal();
      if (!dirty && !force) return;
      var u = me(); if (!u || !u.username || !window.FBDB) return;
      var row = { login: String(u.username), device: deviceLabel(), host: String(location.host || ''), ver: VER, app: appTag(),
        total: Math.round(T.total), msgs: T.msgs, roots: top(T.roots, 40), pages: top(T.pages, 30), rest: top(T.rest, 20),
        pk: top(T.pk || {}, 10), pc: top(T.pc || {}, 10),
        since: T.since, at: new Date().toISOString() };
      dirty = false;
      window.FBDB.ref(PATH + '/' + T.day + '/' + safeKey(deviceId())).set(row).catch(function () { dirty = true; });
    } catch (e) {}
  }
  setInterval(function () { flush(false); }, FLUSH_MS);
  setTimeout(function () { flush(false); }, 2 * 60 * 1000);
  window.addEventListener('pagehide', function () { try { localStorage.setItem(LS, JSON.stringify(T)); } catch (e) {} flush(false); });

  // ── viewer (Dr Varun's admin login only) ──
  function isOwnerSession() { var u = me(); return !!(u && u.isAdmin && OWNER.indexOf(low(u.username)) >= 0); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function mb(b) { b = Number(b) || 0; return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : (b / 1024).toFixed(0) + ' KB'; }
  function sumInto(acc, obj) { Object.keys(obj || {}).forEach(function (k) { acc[k] = (acc[k] || 0) + (Number(obj[k]) || 0); }); }
  function table(title, obj, n) {
    var keys = Object.keys(obj).sort(function (a, b) { return obj[b] - obj[a]; }).slice(0, n);
    if (!keys.length) return '';
    return '<div style="font-weight:800;margin:12px 0 4px">' + esc(title) + '</div><table style="width:100%;border-collapse:collapse;font-size:12px">' +
      keys.map(function (k) { return '<tr><td style="padding:3px 6px;border-bottom:1px solid #eee">' + esc(k) + '</td><td style="padding:3px 6px;border-bottom:1px solid #eee;text-align:right;font-family:monospace">' + mb(obj[k]) + '</td></tr>'; }).join('') + '</table>';
  }
  function show(day) {
    var old = document.getElementById('bnm-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'bnm-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100050;display:flex;align-items:center;justify-content:center';
    ov.innerHTML = '<div style="background:#fff;color:#111;border-radius:12px;max-width:760px;width:94%;max-height:86vh;overflow:auto;padding:18px;font-family:inherit">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div style="font-size:16px;font-weight:900">📶 Download meter</div>' +
      '<div><input id="bnm-day" type="date" value="' + esc(day) + '" style="padding:4px 6px"> <button id="bnm-close" class="btn btn-outline btn-sm" type="button">Close</button></div></div>' +
      '<div id="bnm-body" style="margin-top:10px;font-size:13px">Loading…</div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#bnm-close').onclick = function () { ov.remove(); };
    ov.querySelector('#bnm-day').onchange = function () { show(this.value || dayKey()); };
    if (day === dayKey()) flush(true);
    window.FBDB.ref(PATH + '/' + day).once('value').then(function (snap) {
      var all = snap.val() || {}; var rows = Object.keys(all).map(function (k) { return all[k]; });
      var body = document.getElementById('bnm-body'); if (!body) return;
      if (!rows.length) { body.innerHTML = 'No figures for this day yet. Computers send their figures every 10 minutes after the meter is live.'; return; }
      var total = 0, roots = {}, pages = {}, rest = {}, byLogin = {};
      rows.forEach(function (r) { total += Number(r.total) || 0; sumInto(roots, r.roots); sumInto(pages, r.pages); sumInto(rest, r.rest); byLogin[r.login] = (byLogin[r.login] || 0) + (Number(r.total) || 0); });
      rows.sort(function (a, b) { return (b.total || 0) - (a.total || 0); });
      body.innerHTML = '<div style="font-size:15px"><b>' + mb(total) + '</b> received by <b>' + rows.length + '</b> computers/phones on ' + esc(day) + ' (close estimate).</div>' +
        table('By data area', roots, 25) + table('By screen open at the time', pages, 20) + table('By login', byLogin, 40) +
        table('Direct fetches (Bills & History, Practice Growth)', rest, 15) +
        '<div style="font-weight:800;margin:12px 0 4px">By computer</div><table style="width:100%;border-collapse:collapse;font-size:12px">' +
        rows.map(function (r) { return '<tr><td style="padding:3px 6px;border-bottom:1px solid #eee">' + esc(r.login) + '</td><td style="padding:3px 6px;border-bottom:1px solid #eee">' + esc(r.device) + ' · ' + esc(r.host || '') + '</td><td style="padding:3px 6px;border-bottom:1px solid #eee;text-align:right;font-family:monospace">' + mb(r.total) + '</td><td style="padding:3px 6px;border-bottom:1px solid #eee;color:#666">' + esc(String(r.at || '').replace('T', ' ').slice(0, 16)) + ' UTC</td></tr>'; }).join('') + '</table>';
    }).catch(function () { var b = document.getElementById('bnm-body'); if (b) b.textContent = 'Could not load the figures.'; });
  }
  window.bmhDownloadMeter = function (day) { if (!isOwnerSession()) return; show(day || dayKey()); };
  function addButton() {
    var cur = document.getElementById('cpw-current'); if (!cur) return;
    var box = cur.closest('.card') || cur.parentNode; if (!box) return;
    var b = document.getElementById('bnm-btn');
    if (!isOwnerSession()) { if (b) b.remove(); return; }
    if (b) return;
    b = document.createElement('button'); b.type = 'button'; b.id = 'bnm-btn'; b.className = 'btn btn-outline btn-sm';
    b.style.marginTop = '8px'; b.style.marginLeft = '6px'; b.textContent = '📶 Download meter';
    b.onclick = function () { window.bmhDownloadMeter(); };
    box.appendChild(b);
  }
  setInterval(function () { try { addButton(); } catch (e) {} }, 3000);
  window.__bmhNetMeter = { totals: function () { return JSON.parse(JSON.stringify(T)); }, flush: flush, ver: VER };
})();
