/* BMH — RTDB download saving, step 3: the full patient list ("changes only").
 * Admin / both-centre logins (and some others) downloaded the WHOLE patient database (~90 MB) on every opening and
 * again whenever the screen came back after 30 minutes, and kept a live connection to the whole list.
 *
 * Part 1 — stamping (on for every computer): every save to patients/<id> (whole record or any field) also writes a
 *   tiny timestamp at patientsChanged/<id>. Nothing about the patient data itself changes.
 * Part 2 — changes-only download (tested on one computer, then on for all from v76):
 *   • the full patient list is kept on this computer (IndexedDB);
 *   • opening / refreshing downloads only the patients whose stamp changed since the last download;
 *   • the live updates follow patientsChanged and fetch just the changed patients (instead of the whole list);
 *   • a full download is still done the first time, if the copy is more than 3 days old, or if very many changed.
 *   On for every computer (v76). Switch off on one computer: localStorage.setItem('bmh_patient_sync','0'), reload.
 */
(function () {
  'use strict';
  if (!window.firebase || !firebase.database || !firebase.database.Reference) return;
  var R = firebase.database.Reference.prototype;
  if (R.__bmhPatientStamp) return;

  // ── Part 1: stamp every patient save ──
  function pathOf(ref) { try { return decodeURIComponent(new URL(ref.toString()).pathname).replace(/^\/+|\/+$/g, ''); } catch (e) { return ''; } }
  function idsFor(path, method, arg) {
    var parts = String(path || '').split('/');
    if (parts[0] === 'patients' && parts[1]) return [parts[1]];
    if (parts[0] === 'patients' && !parts[1] && method === 'update' && arg && typeof arg === 'object') {
      return Object.keys(arg).map(function (k) { return String(k).split('/')[0]; }).filter(Boolean);
    }
    if (path === '' && method === 'update' && arg && typeof arg === 'object') {
      return Object.keys(arg).map(function (k) { var p = String(k).replace(/^\/+/, '').split('/'); return p[0] === 'patients' && p[1] ? p[1] : ''; }).filter(Boolean);
    }
    return [];
  }
  var pend = {}, pendT = null, stampSet = R.set, stampUpdate = R.update;
  function stampIds(ids) {
    ids.forEach(function (id) { if (id && !/[.#$\[\]]/.test(id)) pend[id] = 1; });
    if (pendT || !Object.keys(pend).length) return;
    // same tick: one small write, sent right after the patient save(s)
    pendT = Promise.resolve().then(function () {
      pendT = null; var list = Object.keys(pend); pend = {};
      if (!list.length || !window.FBDB) return;
      var up = {}; list.forEach(function (id) { up[id] = firebase.database.ServerValue.TIMESTAMP; });
      try { stampUpdate.call(window.FBDB.ref('patientsChanged'), up).catch(function () {}); } catch (e) {}
      ownStamp(list);
    });
  }
  ['set', 'update', 'remove', 'transaction', 'setWithPriority'].forEach(function (m) {
    var orig = R[m]; if (typeof orig !== 'function') return;
    R[m] = function (arg) {
      var res = orig.apply(this, arguments);
      try { var ids = idsFor(pathOf(this), m, arg); if (ids.length) stampIds(ids); } catch (e) {}
      return res;
    };
  });
  R.__bmhPatientStamp = true;

  // ── Part 2: changes-only download (switch per computer) ──
  // on for every computer from v76 (it only acts on logins that load the whole patient list: admin / both centres);
  // switch off on one computer with localStorage.setItem('bmh_patient_sync','0') and reload
  var ON = true; try { ON = localStorage.getItem('bmh_patient_sync') !== '0'; } catch (e) {}
  var stats = { on: ON, full: 0, delta: 0, fetched: 0, live: 0, lastMs: 0 };
  window.bmhPatientSync = { stats: function () { return stats; } };
  var recentOwn = {};
  function ownStamp(ids) { var t = Date.now(); ids.forEach(function (id) { recentOwn[id] = t; }); }
  if (!ON) return;

  var MAX_AGE = 3 * 24 * 3600e3, MARGIN = 5 * 60e3, MAX_DELTA = 3000;
  var dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) { try { var q = indexedDB.open('bmh-patients', 1); q.onupgradeneeded = function () { q.result.createObjectStore('c'); }; q.onsuccess = function () { res(q.result); }; q.onerror = function () { rej(q.error); }; } catch (e) { rej(e); } });
    return dbp;
  }
  function idb(mode, fn) { return db().then(function (d) { return new Promise(function (res, rej) { var t = d.transaction('c', mode), r = fn(t.objectStore('c')); t.oncomplete = function () { res(r && r.result); }; t.onerror = function () { rej(t.error); }; t.onabort = function () { rej(t.error); }; }); }); }
  function load() { return idb('readonly', function (s) { return s.get('all'); }).catch(function () { return null; }); }
  // writing the ~90 MB copy briefly busies the screen: right after a full download, otherwise at most every 10 min
  var saveT = null, pendingSave = null, lastSave = 0;
  function save(c, now) {
    pendingSave = c; if (saveT) return;
    var wait = now ? 2000 : Math.max(3000, 10 * 60e3 - (Date.now() - lastSave));
    saveT = setTimeout(function () { saveT = null; var v = pendingSave; pendingSave = null; lastSave = Date.now(); idb('readwrite', function (s) { return s.put(v, 'all'); }).catch(function (e) { console.warn('[patient-sync] save', e); }); }, wait);
  }
  var offset = 0;
  function serverNow() { return Date.now() + offset; }
  function ready() { return !!(window.FBDB && typeof window.applyPatientsPayload === 'function'); }

  var CACHE = null; // { map, syncAt, fullAt }
  function fetchIds(ids) {
    var out = {}, i = 0;
    function next() {
      var part = ids.slice(i, i + 40); i += 40; if (!part.length) return Promise.resolve(out);
      return Promise.all(part.map(function (id) { return window.FBDB.ref('patients/' + id).once('value').then(function (s) { out[id] = s.val(); }); })).then(next);
    }
    return next().then(function () { stats.fetched += ids.length; return out; });
  }
  function full(token) {
    var t0 = Date.now(), at = serverNow() - MARGIN;
    return window.FBDB.ref('patients').once('value').then(function (snap) {
      if (window._bmhPatientsRefreshToken !== token) return;
      var data = snap.val() || {};
      CACHE = { map: data, syncAt: at, fullAt: Date.now() };
      save(CACHE, true); stats.full++; stats.lastMs = Date.now() - t0;
      applyPatientsPayload(data, { fullHistory: true });
    });
  }
  function delta(token, applyFirst) {
    var t0 = Date.now(), since = CACHE.syncAt, at = serverNow() - MARGIN;
    if (applyFirst) applyPatientsPayload(CACHE.map, { fullHistory: true });
    return window.FBDB.ref('patientsChanged').orderByValue().startAt(since).once('value').then(function (s) {
      var ids = Object.keys(s.val() || {});
      if (ids.length > MAX_DELTA) return full(token);
      return fetchIds(ids).then(function (rows) {
        if (window._bmhPatientsRefreshToken !== token) return;
        ids.forEach(function (id) { if (rows[id] == null) delete CACHE.map[id]; else CACHE.map[id] = rows[id]; });
        CACHE.syncAt = at; save(CACHE); stats.delta++; stats.lastMs = Date.now() - t0;
        if (ids.length || applyFirst) applyPatientsPayload(CACHE.map, { fullHistory: true });
      });
    });
  }
  var applied = false;
  function refresh() {
    if (!ready()) return Promise.resolve();
    if (typeof shouldUseScopedPatientBootstrap === 'function' && shouldUseScopedPatientBootstrap()) return origRefresh.apply(this, arguments);
    if (window._bmhPatientsRefreshInFlight && window._bmhPatientsRefreshPromise) return window._bmhPatientsRefreshPromise;
    var token = Date.now() + Math.random();
    window._bmhPatientsRefreshInFlight = true; window._bmhPatientsRefreshScope = 'ALL'; window._bmhPatientsRefreshToken = token;
    var p = (CACHE ? Promise.resolve(CACHE) : load()).then(function (c) {
      if (c && c.map && (Date.now() - Number(c.fullAt || 0)) < MAX_AGE) { CACHE = c; var first = !applied; applied = true; return delta(token, first); }
      applied = true; return full(token);
    }).catch(function (e) {
      console.warn('[patient-sync] falling back to full download', e);
      return full(token).catch(function () {});
    }).finally(function () {
      if (window._bmhPatientsRefreshPromise === p) { window._bmhPatientsRefreshInFlight = false; window._bmhPatientsLastRefreshAt = Date.now(); window._bmhPatientsRefreshPromise = null; }
    });
    window._bmhPatientsRefreshPromise = p;
    return p;
  }
  // live: follow the stamps instead of the whole patient list
  function live() {
    if (window._bmhPatientsRealtimeStarted || !window.FBDB) return;
    if (typeof effectivePatientListCentreScope === 'function' && effectivePatientListCentreScope()) return;
    window._bmhPatientsRealtimeStarted = true;
    var q = window.FBDB.ref('patientsChanged').orderByValue().startAt(serverNow() - 60e3);
    var queue = {}, qt = null;
    var onStamp = function (snap) {
      var id = String(snap.key || ''); if (!id) return;
      queue[id] = 1;
      if (qt) return;
      qt = setTimeout(function () {
        qt = null; var ids = Object.keys(queue); queue = {};
        fetchIds(ids).then(function (rows) {
          ids.forEach(function (id2) {
            stats.live++;
            if (CACHE && CACHE.map) { if (rows[id2] == null) delete CACHE.map[id2]; else CACHE.map[id2] = rows[id2]; }
            if (rows[id2] == null) removeRealtimePatientRecord(id2); else applyRealtimePatientRecord(rows[id2], id2);
          });
          if (CACHE) { CACHE.syncAt = Math.max(Number(CACHE.syncAt || 0), serverNow() - MARGIN); save(CACHE); }
        });
      }, 400);
    };
    q.on('child_added', onStamp); q.on('child_changed', onStamp);
  }
  var origRefresh = null;
  function install() {
    if (typeof window.refreshPatientsFromFirebase !== 'function' || origRefresh) return !!origRefresh;
    origRefresh = window.refreshPatientsFromFirebase;
    window.refreshPatientsFromFirebase = refresh;
    if (typeof window.startPatientsRealtimeUpdates === 'function') window.startPatientsRealtimeUpdates = live;
    try { window.FBDB.ref('.info/serverTimeOffset').on('value', function (s) { offset = Number(s.val() || 0); }); } catch (e) {}
    return true;
  }
  if (!install()) document.addEventListener('DOMContentLoaded', install);
})();
