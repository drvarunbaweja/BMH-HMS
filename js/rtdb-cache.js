/* BMH — keep rarely-changing libraries on each device (RTDB download saving, step 1).
 * Drug list, print letterhead, consent libraries and templates used to be downloaded in full on every login /
 * page load, and the drug list was re-sent in full to every open screen whenever anyone edited it.
 * Now:
 *  • Every save to one of these (from any screen) also writes a tiny version stamp at bmhCacheMeta/<name>
 *    (sent right after the save itself).
 *  • A full read of one of these is answered from this device's saved copy when the stamp has not changed
 *    (and the copy is less than 12 hours old); otherwise it is downloaded as before and the copy refreshed.
 *  • The live drug-list listener now watches only the stamp (and drugLibraryMeta); when it changes, the list is
 *    downloaded once and handed to the same code as before.
 * Nothing about what is saved changes. Reads of single entries (e.g. one consent) still go to the server.
 * If anything goes wrong with the saved copy, it simply downloads as before.
 */
(function () {
  'use strict';
  if (!window.firebase || !firebase.database || !firebase.database.Reference) return;
  var R = firebase.database.Reference.prototype;
  if (R.__bmhCache) return;
  var ROOTS = ['drugLibrary', 'printLetterhead', 'rxTemplates', 'consentDataDb', 'consentLibraryDb', 'consentLibrary', 'consentTemplatesStub', 'deptPlanTemplates', 'ipdRxTemplates'];
  var MAX_AGE = 12 * 3600e3;
  var orig = { once: R.once, on: R.on, off: R.off, set: R.set, update: R.update, remove: R.remove, push: R.push, transaction: R.transaction, setWithPriority: R.setWithPriority };
  var stats = { hit: 0, miss: 0, saved: 0 };

  function pathOf(ref) { try { return decodeURIComponent(new URL(ref.toString()).pathname).replace(/^\/+|\/+$/g, ''); } catch (e) { return ''; } }
  function rootOf(path) { var r = String(path || '').split('/')[0]; return ROOTS.indexOf(r) >= 0 ? r : ''; }

  // ── version stamps (tiny, kept live) ──
  var VER = null, DLM = 0, verWaiters = [];
  function ver(root) { var v = (VER && Number(VER[root])) || 0; if (root === 'drugLibrary') v = Math.max(v, DLM); return v; }
  function verReady() { return VER !== null; }
  function whenVer() {
    if (verReady()) return Promise.resolve();
    return new Promise(function (res) { verWaiters.push(res); setTimeout(res, 4000); });
  }
  var metaListeners = [];
  function metaChanged() { verWaiters.splice(0).forEach(function (f) { try { f(); } catch (e) {} }); metaListeners.forEach(function (f) { try { f(); } catch (e) {} }); }
  var metaOn = false;
  function startMeta() {
    if (metaOn || !window.FBDB) return metaOn;
    metaOn = true;
    try {
      orig.on.call(window.FBDB.ref('bmhCacheMeta'), 'value', function (s) { VER = (s && s.val()) || {}; metaChanged(); }, function () { VER = VER || {}; metaChanged(); });
      orig.on.call(window.FBDB.ref('drugLibraryMeta'), 'value', function (s) { var v = s && s.val(); DLM = Number((v && v.updatedAt) || 0) || 0; if (verReady()) metaChanged(); }, function () {});
    } catch (e) { metaOn = false; }
    return metaOn;
  }

  // ── this device's saved copies (IndexedDB, so the small browser storage box is not used) ──
  var dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      try {
        var q = indexedDB.open('bmh-rtdb-cache', 1);
        q.onupgradeneeded = function () { q.result.createObjectStore('c'); };
        q.onsuccess = function () { res(q.result); };
        q.onerror = function () { rej(q.error); };
      } catch (e) { rej(e); }
    });
    return dbp;
  }
  function idb(mode, fn) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var t = d.transaction('c', mode), st = t.objectStore('c'), r = fn(st);
        t.oncomplete = function () { res(r && r.result); }; t.onerror = function () { rej(t.error); }; t.onabort = function () { rej(t.error); };
      });
    });
  }
  function getCopy(root) { return idb('readonly', function (s) { return s.get(root); }).catch(function () { return null; }); }
  function putCopy(root, v, data) { return idb('readwrite', function (s) { return s.put({ ver: v, at: Date.now(), data: data }, root); }).catch(function () {}); }
  function dropCopy(root) { return idb('readwrite', function (s) { return s.delete(root); }).catch(function () {}); }

  // a snapshot made from the saved copy behaves like the one from the server for the usual uses
  function fakeSnap(ref, key, data) {
    var v = data === undefined ? null : data;
    var snap = {
      key: key, ref: ref,
      val: function () { return v == null ? null : JSON.parse(JSON.stringify(v)); },
      exportVal: function () { return snap.val(); }, toJSON: function () { return snap.val(); },
      exists: function () { return v != null; },
      hasChildren: function () { return !!v && typeof v === 'object' && Object.keys(v).length > 0; },
      numChildren: function () { return v && typeof v === 'object' ? Object.keys(v).length : 0; },
      hasChild: function (p) { return snap.child(p).exists(); },
      child: function (p) { var cur = v; String(p).split('/').filter(Boolean).forEach(function (k) { cur = cur && typeof cur === 'object' ? cur[k] : undefined; }); var last = String(p).split('/').filter(Boolean).pop(); return fakeSnap(ref && ref.child ? ref.child(p) : null, last, cur === undefined ? null : cur); },
      forEach: function (cb) { if (!v || typeof v !== 'object') return false; var ks = Object.keys(v); if (Array.isArray(v)) ks = ks.sort(function (a, b) { return a - b; }); for (var i = 0; i < ks.length; i++) { if (cb(snap.child(ks[i])) === true) return true; } return false; }
    };
    return snap;
  }

  // full read of a library: saved copy if unchanged, otherwise download and keep
  var inflight = {};
  function cachedRead(ref, root) {
    if (inflight[root]) return inflight[root].then(function (d) { return fakeSnap(ref, root, d); });
    var p = whenVer().then(function () {
      if (!verReady()) return null; // stamps unknown: download as before
      var v = ver(root);
      return getCopy(root).then(function (c) {
        if (c && c.ver === v && (Date.now() - Number(c.at || 0)) < MAX_AGE) { stats.hit++; return { data: c.data }; }
        return null;
      });
    }).then(function (hit) {
      if (hit) return hit.data;
      var v0 = ver(root);
      return orig.once.call(ref, 'value').then(function (snap) {
        stats.miss++;
        var data = snap.val();
        if (verReady() && ver(root) === v0) putCopy(root, v0, data);
        return data;
      });
    });
    inflight[root] = p;
    var clear = function () { delete inflight[root]; };
    p.then(clear, clear);
    return p.then(function (d) { return fakeSnap(ref, root, d); });
  }

  R.once = function (evt, success, failure) {
    var ref = this, path = pathOf(ref), root = rootOf(path);
    if (evt !== 'value' || !root || path !== root || this.queryIdentifier && this.queryIdentifier() !== 'default') return orig.once.apply(this, arguments);
    startMeta();
    var p = cachedRead(ref, root).catch(function () { return orig.once.call(ref, 'value'); });
    if (typeof success === 'function') p.then(function (s) { success(s); }, function (e) { if (typeof failure === 'function') failure(e); });
    return p;
  };

  // live listener on a whole library → follow the stamp, read (cached) when it changes
  var liveSubs = []; // { path, cb, last }
  R.on = function (evt, cb) {
    var path = pathOf(this), root = rootOf(path);
    if (evt !== 'value' || !root || path !== root || typeof cb !== 'function' || this.queryIdentifier && this.queryIdentifier() !== 'default') return orig.on.apply(this, arguments);
    if (!startMeta()) return orig.on.apply(this, arguments);
    var ref = this, sub = { root: root, cb: cb, last: -1, ref: ref };
    var fire = function () {
      if (!verReady()) return;
      var v = ver(root); if (v === sub.last) return; sub.last = v;
      cachedRead(ref, root).then(function (s) { if (liveSubs.indexOf(sub) >= 0) cb(s); }, function () {});
    };
    sub.fire = fire; liveSubs.push(sub); metaListeners.push(fire);
    fire();
    return cb;
  };
  R.off = function (evt, cb) {
    var path = pathOf(this), root = rootOf(path);
    if (root && path === root) {
      for (var i = liveSubs.length - 1; i >= 0; i--) {
        var s = liveSubs[i];
        if (s.root === root && (!cb || s.cb === cb)) { liveSubs.splice(i, 1); var j = metaListeners.indexOf(s.fire); if (j >= 0) metaListeners.splice(j, 1); }
      }
    }
    return orig.off.apply(this, arguments);
  };

  // any save to a library → stamp it (after the save), so every device knows to fetch the new version
  function stamp(root) {
    stats.saved++;
    dropCopy(root);
    try { orig.set.call(window.FBDB.ref('bmhCacheMeta/' + root), firebase.database.ServerValue.TIMESTAMP).catch(function () {}); } catch (e) {}
  }
  ['set', 'update', 'remove', 'setWithPriority', 'transaction', 'push'].forEach(function (m) {
    if (typeof orig[m] !== 'function') return;
    R[m] = function () {
      var res = orig[m].apply(this, arguments);
      var root = rootOf(pathOf(this));
      // stamped straight after the save is sent: one device's writes reach the server in order, so anyone who
      // sees the new stamp reads the new data (a failed save only costs one extra download)
      if (root && !(m === 'push' && arguments.length === 0)) stamp(root);
      return res;
    };
  });
  R.__bmhCache = true;
  if (!startMeta()) { var tries = 0, iv = setInterval(function () { if (startMeta() || ++tries > 40) clearInterval(iv); }, 500); }
  window.bmhRtdbCache = { stats: function () { return Object.assign({ ver: VER, drugLibraryMeta: DLM }, stats); }, clear: function () { return Promise.all(ROOTS.map(dropCopy)); } };
})();
