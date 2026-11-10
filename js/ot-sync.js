/* BMH — OT cases: keep a copy on each computer and download only the changes; new / changed OT cases appear live.
 *  • Every save to otCases/<id> (whole case or any field, from any screen) also writes a tiny time stamp at
 *    otCasesChanged/<id>. Nothing about the OT case itself changes.
 *  • A full read of the OT list (opening the OT page, reports, discharge) is answered from this computer's copy after
 *    fetching only the cases whose stamp changed. A full download is still done the first time, when the copy is more
 *    than 12 hours old, or when very many cases changed.
 *  • Live: when an OT case is added or changed on another computer, this computer fetches just that case and updates
 *    its OT list within a second or two (the OT page redraws if it is open) — no refresh needed.
 *  Switch off on one computer: localStorage.setItem('bmh_ot_sync','0') then reload.
 */
(function () {
  'use strict';
  if (!window.firebase || !firebase.database || !firebase.database.Reference) return;
  var R = firebase.database.Reference.prototype;
  if (R.__bmhOtSync) return;
  R.__bmhOtSync = true;

  function pathOf(ref) { try { return decodeURIComponent(new URL(ref.toString()).pathname).replace(/^\/+|\/+$/g, ''); } catch (e) { return ''; } }
  function okId(id) { return id && !/[.#$\[\]\/]/.test(id); }

  // ── stamping (always on) ──
  function idsFor(path, method, arg) {
    var parts = String(path || '').split('/');
    if (parts[0] === 'otCases' && parts[1]) return [parts[1]];
    if (parts[0] === 'otCases' && !parts[1] && arg && typeof arg === 'object' && (method === 'update' || method === 'set')) {
      return Object.keys(arg).map(function (k) { return String(k).split('/')[0]; });
    }
    if (path === '' && method === 'update' && arg && typeof arg === 'object') {
      return Object.keys(arg).map(function (k) { var p = String(k).replace(/^\/+/, '').split('/'); return p[0] === 'otCases' && p[1] ? p[1] : ''; });
    }
    return [];
  }
  var origUpdate = R.update, origOnce = R.once;
  var pend = {}, pendT = null, recentOwn = {};
  function stamp(ids) {
    ids.forEach(function (id) { if (okId(id)) pend[id] = 1; });
    if (pendT || !Object.keys(pend).length) return;
    pendT = Promise.resolve().then(function () {
      pendT = null; var list = Object.keys(pend); pend = {};
      if (!list.length || !window.FBDB) return;
      var up = {}, t = Date.now();
      list.forEach(function (id) { up[id] = firebase.database.ServerValue.TIMESTAMP; recentOwn[id] = t; });
      try { origUpdate.call(window.FBDB.ref('otCasesChanged'), up).catch(function () {}); } catch (e) {}
    });
  }
  ['set', 'update', 'remove', 'transaction', 'setWithPriority'].forEach(function (m) {
    var orig = R[m]; if (typeof orig !== 'function') return;
    R[m] = function (arg) {
      var res = orig.apply(this, arguments);
      try { var p = pathOf(this); if (p === 'otCases' || p.indexOf('otCases/') === 0 || (p === '' && m === 'update')) { var ids = idsFor(p, m, arg); if (ids.length) stamp(ids); } } catch (e) {}
      return res;
    };
  });

  var ON = true; try { ON = localStorage.getItem('bmh_ot_sync') !== '0'; } catch (e) {}
  var stats = { on: ON, full: 0, delta: 0, fetched: 0, live: 0 };
  window.bmhOtSync = { stats: function () { return stats; }, forgetOwn: function () { recentOwn = {}; } };
  if (!ON) return;

  var MAX_AGE = 12 * 3600e3, MARGIN = 5 * 60e3, MAX_DELTA = 400;
  var offset = 0, offsetOn = false;
  function serverNow() { return Date.now() + offset; }
  function startOffset() { if (offsetOn || !window.FBDB) return; offsetOn = true; try { window.FBDB.ref('.info/serverTimeOffset').on('value', function (s) { offset = Number(s.val() || 0); }); } catch (e) {} }

  // copy on this computer (IndexedDB)
  var dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) { try { var q = indexedDB.open('bmh-otcases', 1); q.onupgradeneeded = function () { q.result.createObjectStore('c'); }; q.onsuccess = function () { res(q.result); }; q.onerror = function () { rej(q.error); }; } catch (e) { rej(e); } });
    return dbp;
  }
  function idb(mode, fn) { return db().then(function (d) { return new Promise(function (res, rej) { var t = d.transaction('c', mode), r = fn(t.objectStore('c')); t.oncomplete = function () { res(r && r.result); }; t.onerror = function () { rej(t.error); }; t.onabort = function () { rej(t.error); }; }); }); }
  var saveT = null;
  function save() { if (saveT) return; saveT = setTimeout(function () { saveT = null; if (CACHE) idb('readwrite', function (s) { return s.put(CACHE, 'all'); }).catch(function () {}); }, 1500); }
  function load() { return idb('readonly', function (s) { return s.get('all'); }).catch(function () { return null; }); }

  var CACHE = null; // { map, syncAt, fullAt }
  function fetchIds(ids) {
    var out = {}, i = 0;
    function next() {
      var part = ids.slice(i, i + 40); i += 40; if (!part.length) return Promise.resolve(out);
      return Promise.all(part.map(function (id) { return origOnce.call(window.FBDB.ref('otCases/' + id), 'value').then(function (s) { out[id] = s.val(); }); })).then(next);
    }
    return next().then(function () { stats.fetched += ids.length; return out; });
  }
  function full() {
    var at = serverNow() - MARGIN;
    return origOnce.call(window.FBDB.ref('otCases'), 'value').then(function (snap) {
      CACHE = { map: snap.val() || {}, syncAt: at, fullAt: Date.now() }; stats.full++; save();
      return snap;
    });
  }
  function clone(v) { return v == null ? null : JSON.parse(JSON.stringify(v)); }
  function fakeSnap(ref, data) {
    return {
      key: 'otCases', ref: ref,
      val: function () { return clone(data); },
      exportVal: function () { return clone(data); },
      exists: function () { return data != null && Object.keys(data).length > 0; },
      numChildren: function () { return data ? Object.keys(data).length : 0; },
      hasChildren: function () { return !!data && Object.keys(data).length > 0; },
      hasChild: function (k) { return !!data && Object.prototype.hasOwnProperty.call(data, k); },
      child: function (k) { var v = data ? data[k] : null; return { key: k, val: function () { return clone(v); }, exists: function () { return v != null; } }; },
      forEach: function (fn) { if (!data) return false; var ks = Object.keys(data); for (var i = 0; i < ks.length; i++) { var k = ks[i], v = data[k]; if (fn({ key: k, val: function () { return clone(v); }, exists: function () { return v != null; } }) === true) return true; } return false; }
    };
  }
  var inflight = null;
  function read(ref) {
    if (inflight) return inflight.then(function () { return fakeSnap(ref, CACHE.map); });
    startOffset();
    inflight = (CACHE ? Promise.resolve(CACHE) : load()).then(function (c) {
      if (!c || !c.map || Date.now() - Number(c.fullAt || 0) > MAX_AGE) return full();
      CACHE = c;
      var since = c.syncAt, at = serverNow() - MARGIN;
      return origOnce.call(window.FBDB.ref('otCasesChanged').orderByValue().startAt(since), 'value').then(function (s) {
        var ids = Object.keys(s.val() || {});
        if (ids.length > MAX_DELTA) return full();
        return fetchIds(ids).then(function (rows) {
          ids.forEach(function (id) { if (rows[id] == null) delete CACHE.map[id]; else CACHE.map[id] = rows[id]; });
          CACHE.syncAt = at; stats.delta++; save();
        });
      });
    }).catch(function (e) { console.warn('[ot-sync] full download instead', e); return full(); });
    var p = inflight;
    p.then(function () { inflight = null; }, function () { inflight = null; });
    return p.then(function () { return fakeSnap(ref, CACHE.map); });
  }
  R.once = function (evt, success, failure) {
    var ref = this;
    if (evt !== 'value' || pathOf(ref) !== 'otCases' || (ref.queryIdentifier && ref.queryIdentifier() !== 'default') || !window.FBDB) return R.__otPrevOnce.apply(ref, arguments);
    var p = read(ref).catch(function () { return R.__otPrevOnce.call(ref, 'value'); });
    if (typeof success === 'function') p.then(function (s) { success(s); }, function (e) { if (typeof failure === 'function') failure(e); });
    return p;
  };
  R.__otPrevOnce = origOnce;

  // ── live: other computers' OT changes appear here ──
  function applyLive(id, row) {
    var arr; try { arr = OT_CASES; } catch (e) { arr = window.OT_CASES; }
    if (!Array.isArray(arr)) return false;
    var act = null; try { act = activeOTCase; } catch (e) {}
    var idx = arr.findIndex(function (c) { return c && c.id === id; });
    if (row == null) {
      if (idx < 0 || arr[idx] === act) return false;
      arr.splice(idx, 1); return true;
    }
    var n; try { n = normalizeOTCaseRecord(row); } catch (e) { n = row; }
    if (!n || !n.id) return false;
    if (idx < 0) { arr.push(n); return true; }
    var t = function (c) { try { return getOTCaseLastTouchedAt(c); } catch (e) { return 0; } };
    if (t(n) < t(arr[idx])) return false;
    if (arr[idx] === act) Object.assign(arr[idx], n); else arr[idx] = n;
    return true;
  }
  var liveOn = false;
  function live() {
    if (liveOn || !window.FBDB) return liveOn;
    liveOn = true; startOffset();
    var started = Date.now(), queue = {}, qt = null;
    var onStamp = function (snap) {
      var id = String(snap.key || ''); if (!okId(id)) return;
      if (recentOwn[id] && Date.now() - recentOwn[id] < 30000) return; // own save
      queue[id] = 1; if (qt) return;
      qt = setTimeout(function () {
        qt = null; var ids = Object.keys(queue); queue = {};
        fetchIds(ids).then(function (rows) {
          var changed = false;
          ids.forEach(function (id2) {
            stats.live++;
            if (CACHE && CACHE.map) { if (rows[id2] == null) delete CACHE.map[id2]; else CACHE.map[id2] = rows[id2]; }
            if (applyLive(id2, rows[id2])) changed = true;
          });
          if (CACHE) { CACHE.syncAt = Math.max(Number(CACHE.syncAt || 0), serverNow() - MARGIN); save(); }
          if (!changed) return;
          try { saveOTCasesToLocalStorage(); } catch (e) {}
          try { var pg = document.getElementById('pg-ot'); if (pg && pg.offsetParent !== null && typeof renderOTListSafe === 'function') renderOTListSafe(); } catch (e) {}
          try { window.dispatchEvent(new CustomEvent('bmh:ot-cases-changed', { detail: { ids: ids } })); } catch (e) {}
        }).catch(function () {});
      }, 400);
    };
    var q = window.FBDB.ref('otCasesChanged').orderByValue().startAt(serverNow() - 60e3);
    q.on('child_added', onStamp); q.on('child_changed', onStamp);
    return true;
  }
  if (!live()) { var n = 0, iv = setInterval(function () { if (live() || ++n > 120) clearInterval(iv); }, 1000); }
})();
