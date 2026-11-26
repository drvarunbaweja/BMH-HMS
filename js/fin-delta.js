/* BMH — billing record: download once, then only the changes (RTDB download saving, step 2, v210).
 *
 * Before: the whole billing record (`financials`, about 1.1 MB: bills, vendor bills, purchases, stock used, ledger,
 * patient charges…) was downloaded on every login, and again by every open computer each time ANY computer saved
 * a bill or a stock entry.
 *
 * Now:
 *  • Each computer keeps the whole billing record permanently in its own storage (IndexedDB 'bmh-fin-delta').
 *  • Every save also adds a small change note to `finLog` holding ONLY the rows that were added, changed or
 *    removed (one entry per save). Other computers download just those notes and apply them to their copy.
 *  • The whole `financials` record is still written on every save exactly as before (uploads are free), so
 *      – rolling back to the previous version is instant and loses nothing, and
 *      – a computer still on the old version keeps working and stays correct.
 *  • A computer on the old version that saves is noticed through the tiny `financials/updatedAt` value; one
 *    updated computer then reads the record once, takes the rows it changed, and adds them to `finLog`
 *    so every other computer (including ones switched off now) gets them.
 *  • Nothing is removed unless this computer's screens had the row and removed it themselves (e.g. a bill
 *    deleted with the PIN). A save that would remove more than half of a list of 10+ rows removes nothing.
 *    A removal note keeps the removed row's content, so it can be put back.
 *  • The billing screens see exactly the same record as before; nothing on screen changes.
 *  • A computer that has never had the record (or whose copy is over 30 days old) downloads it once, as before.
 *  • Logins with billing access (Admin, Reception, TPA, Inventory roles, or a login given the Billing, TPA, Inventory
 *    or Reception module) keep the copy permanently, so they download the whole record only once.
 *  • Every other login (doctors, optometrists, lab, OT…) keeps NO billing copy on the computer (Dr Varun, 26 Nov):
 *    the first time a screen needs billing (e.g. a charge added or stock used for a patient) the record is downloaded
 *    once into memory for that page, and from then on only the change notes. Before, such a screen received the
 *    whole record again every time anyone anywhere saved a bill.
 *
 * Off switch (this browser only): localStorage.setItem('bmh_fin_delta_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_fin_delta_off') === '1') return; } catch (e) {}
  if (!window.firebase || !firebase.database || !firebase.database.Reference) return;
  var R = firebase.database.Reference.prototype;
  if (R.__bmhFinDelta) return;
  R.__bmhFinDelta = true;

  var ROOT = 'financials', LOG = 'finLog';
  var MAX_COPY_AGE = 30 * 24 * 3600e3;
  var prev = { once: R.once, on: R.on, off: R.off, set: R.set, update: R.update };
  var stats = { boot: 0, fromCopy: 0, logIn: 0, logOut: 0, rowsOut: 0, foreign: 0, held: 0 };

  // ── helpers ──
  function pathOf(ref) { try { return decodeURIComponent(new URL(ref.toString()).pathname).replace(/^\/+|\/+$/g, ''); } catch (e) { return ''; } }
  function clone(x) { return x === undefined ? undefined : JSON.parse(JSON.stringify(x)); }
  // what the database would keep (no null / undefined / empty arrays or objects), keys sorted, for comparing
  function norm(x) {
    if (x === null || x === undefined || typeof x === 'function') return undefined;
    if (typeof x === 'number') return isFinite(x) ? x : undefined;
    if (typeof x !== 'object') return x;
    if (Array.isArray(x)) { var a = x.map(norm).filter(function (v) { return v !== undefined; }); return a.length ? a : undefined; }
    var o = {}, ks = Object.keys(x).sort(), any = false;
    ks.forEach(function (k) { var v = norm(x[k]); if (v !== undefined) { o[k] = v; any = true; } });
    return any ? o : undefined;
  }
  function same(a, b) { return JSON.stringify(norm(a)) === JSON.stringify(norm(b)); }
  function db() { return window.FBDB || firebase.database(); }
  function newKey() { return db().ref(LOG).push().key; }

  // ── the record, kept as parts → rows ──
  // M.parts[part] = { mode: 'rows', order: [key…], rows: {key: row} }  (arrays whose rows all have a unique id,
  //                   and patientCharges, keyed by patient)
  //               | { mode: 'whole', value: any }                      (anything else, e.g. officeBillCategories)
  // M.meta = { updatedAt, updatedBy }
  // RK[part + '\u0001' + key] = push key of the last change note applied to that row ('' = from the whole record)
  var M = null, RK = {}, LASTKEY = '', KNOWN_T = {}, COPY_AT = 0;
  var DELIVERED = {};   // part -> {key: 1} rows the billing screens have been handed
  function rk(part, key) { return part + '\u0001' + key; }
  function rowKeyOf(r) { return r && typeof r === 'object' && r.id != null && r.id !== '' ? 'id:' + String(r.id) : null; }
  function splitPart(part, v) {
    if (part === 'patientCharges' && v && typeof v === 'object' && !Array.isArray(v)) {
      var p = { mode: 'rows', order: [], rows: {} };
      Object.keys(v).forEach(function (k) { if (v[k] == null) return; p.order.push(k); p.rows[k] = v[k]; });
      return p;
    }
    if (Array.isArray(v)) {
      var rows = {}, order = [], ok = true;
      v.forEach(function (r) { if (!ok || r == null) return; var k = rowKeyOf(r); if (!k || rows[k]) { ok = false; return; } rows[k] = r; order.push(k); });
      if (ok) return { mode: 'rows', order: order, rows: rows, arr: true };
    }
    return { mode: 'whole', value: v };
  }
  function joinPart(p) {
    if (!p) return undefined;
    if (p.mode === 'whole') return clone(p.value);
    if (!p.arr) { var o = {}; p.order.forEach(function (k) { if (p.rows[k] != null) o[k] = p.rows[k]; }); return clone(o); }
    return clone(p.order.map(function (k) { return p.rows[k]; }).filter(function (r) { return r != null; }));
  }
  function fromRecord(rec) {
    var m = { parts: {}, meta: {} };
    Object.keys(rec || {}).forEach(function (k) {
      if (k === 'updatedAt' || k === 'updatedBy' || k === 'restoredFrom') { m.meta[k] = rec[k]; return; }
      m.parts[k] = splitPart(k, rec[k]);
    });
    return m;
  }
  function toRecord(m, forScreens) {
    var o = {};
    Object.keys(m.parts).forEach(function (k) { var v = joinPart(m.parts[k]); if (v !== undefined) o[k] = v; });
    Object.keys(m.meta).forEach(function (k) { o[k] = m.meta[k]; });
    // the screens apply a record only when it is newer than their own last save, so hand it over as "now"
    if (forScreens) o.updatedAt = Date.now();
    return o;
  }
  function markDelivered() {
    DELIVERED = {};
    Object.keys(M.parts).forEach(function (part) {
      var p = M.parts[part]; if (p.mode !== 'rows') return;
      var d = DELIVERED[part] = {}; p.order.forEach(function (k) { if (p.rows[k] != null) d[k] = 1; });
    });
  }
  function partsCount(p) { return p && p.mode === 'rows' ? p.order.filter(function (k) { return p.rows[k] != null; }).length : 0; }

  // apply one row change; returns true if the copy changed
  function applyRow(part, key, row, removed, pkey) {
    var p = M.parts[part];
    if (key === '*') { // whole part
      if (pkey && (RK[rk(part, '*')] || '') > pkey) return false;
      RK[rk(part, '*')] = pkey || '';
      var np = splitPart(part, row);
      if (p && same(joinPart(p), joinPart(np))) return false;
      M.parts[part] = np; return true;
    }
    if (!p || (p.mode === 'whole' && p.value == null)) {
      p = M.parts[part] = { mode: 'rows', order: [], rows: {}, arr: part !== 'patientCharges' };
    } else if (p.mode !== 'rows') {
      var sp = splitPart(part, p.value);
      if (sp.mode === 'rows') p = M.parts[part] = sp;
      else return applyInWhole(p, part, key, row, removed, pkey);
    }
    var id = rk(part, key);
    if (pkey && (RK[id] || '') > pkey) return false; // a later change of this row is already applied
    RK[id] = pkey || RK[id] || '';
    if (removed) {
      if (p.rows[key] == null) return false;
      delete p.rows[key]; p.order = p.order.filter(function (k) { return k !== key; }); return true;
    }
    if (p.rows[key] != null && same(p.rows[key], row)) return false;
    if (p.rows[key] == null) p.order.push(key);
    p.rows[key] = clone(row); return true;
  }

  // a row change for a list that is kept whole (some rows without an id): change it inside the list
  function applyInWhole(p, part, key, row, removed, pkey) {
    var id = rk(part, key);
    if (pkey && (RK[id] || '') > pkey) return false;
    RK[id] = pkey || RK[id] || '';
    if (!Array.isArray(p.value)) p.value = [];
    var i = -1; p.value.forEach(function (r, j) { if (i < 0 && rowKeyOf(r) === key) i = j; });
    if (removed) { if (i < 0) return false; p.value.splice(i, 1); return true; }
    if (i >= 0 && same(p.value[i], row)) return false;
    if (i >= 0) p.value[i] = clone(row); else p.value.push(clone(row));
    return true;
  }

  // ── saved copy on this computer ──
  var IDB = null;
  function idb() {
    if (IDB) return IDB;
    IDB = new Promise(function (res) {
      try {
        var rq = indexedDB.open('bmh-fin-delta', 1);
        rq.onupgradeneeded = function () { rq.result.createObjectStore('kv'); };
        rq.onsuccess = function () { res(rq.result); };
        rq.onerror = function () { res(null); };
      } catch (e) { res(null); }
    });
    return IDB;
  }
  function idbGet(k) { return idb().then(function (d) { if (!d) return null; return new Promise(function (res) { try { var r = d.transaction('kv').objectStore('kv').get(k); r.onsuccess = function () { res(r.result || null); }; r.onerror = function () { res(null); }; } catch (e) { res(null); } }); }); }
  function idbPut(k, v) { return idb().then(function (d) { if (!d) return; return new Promise(function (res) { try { var t = d.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = res; t.onerror = res; } catch (e) { res(); } }); }); }
  var saveT = null;
  function saveSoon() {
    clearTimeout(saveT);
    saveT = setTimeout(function () {
      if (!M || !PERSIST) return;
      var ks = Object.keys(KNOWN_T); if (ks.length > 1000) { ks.sort(function (a, b) { return Number(a) - Number(b); }).slice(0, ks.length - 500).forEach(function (k) { delete KNOWN_T[k]; }); }
      idbPut('copy', { v: 1, at: COPY_AT, lastKey: LASTKEY, rec: toRecord(M), rk: RK, known: KNOWN_T });
    }, 1500);
  }

  // ── start: saved copy, or one full download; then follow the change notes ──
  var READY = null;
  function start() {
    if (READY) return READY;
    PERSIST = billingLogin();
    READY = (PERSIST ? idbGet('copy') : Promise.resolve(null)).then(function (c) {
      if (c && c.v === 1 && c.rec && c.at && Date.now() - c.at < MAX_COPY_AGE) {
        M = fromRecord(c.rec); RK = c.rk || {}; LASTKEY = c.lastKey || ''; KNOWN_T = c.known || {}; COPY_AT = c.at;
        stats.fromCopy++;
        return true;
      }
      return boot();
    }).then(function () {
      follow(); watchStamp(); return true;
    });
    return READY;
  }
  function boot() {
    stats.boot++;
    // note where the change notes stand BEFORE reading the record, so nothing saved in between is missed
    return firebase.database.Query.prototype.once.call(db().ref(LOG).orderByKey().limitToLast(1), 'value').then(function (s) {
      var k = ''; s.forEach(function (c) { k = c.key; });
      return prev.once.call(db().ref(ROOT), 'value').then(function (snap) {
        M = fromRecord(snap.val() || {}); RK = {}; KNOWN_T = {}; LASTKEY = k; COPY_AT = Date.now();
        if (M.meta.updatedAt) KNOWN_T[String(M.meta.updatedAt)] = 1;
        saveSoon();
      });
    });
  }
  var FOLLOWING = false;
  function follow() {
    if (FOLLOWING) return; FOLLOWING = true;
    var q = db().ref(LOG).orderByKey();
    if (LASTKEY) q = q.startAfter(LASTKEY);
    firebase.database.Query.prototype.on.call(q, 'child_added', function (s) {
      var e = s.val() || {}, key = s.key, changed = false;
      if (key > LASTKEY) LASTKEY = key;
      if (e.t) KNOWN_T[String(e.t)] = 1;
      if (e.ft) KNOWN_T[String(e.ft)] = 1;
      (Array.isArray(e.c) ? e.c : []).forEach(function (c) {
        if (!c || !c.p || c.k == null) return;
        if (applyRow(c.p, String(c.k), c.d, !!c.x, key)) changed = true;
      });
      if (e.t && Number(e.t) > Number(M.meta.updatedAt || 0)) { M.meta.updatedAt = e.t; if (e.by) M.meta.updatedBy = e.by; }
      stats.logIn++;
      saveSoon();
      if (changed) deliverSoon();
    }, function (err) { console.warn('[fin-delta] change notes', err); });
  }

  // ── computers still on the old version: they write only the whole record ──
  var foreignT = null;
  function watchStamp() {
    prev.on.call(db().ref(ROOT + '/updatedAt'), 'value', function (s) {
      var t = s.val(); if (!t) return;
      if (KNOWN_T[String(t)]) return; // (not compared by time: computer clocks differ)
      clearTimeout(foreignT);
      // give its change note (if it came from an updated computer) time to arrive; spread computers out
      foreignT = setTimeout(function () { checkForeign(t); }, 4000 + Math.floor(Math.random() * 6000));
    }, function () {});
  }
  function checkForeign(t) {
    if (KNOWN_T[String(t)]) return;
    stats.foreign++;
    prev.once.call(db().ref(ROOT), 'value').then(function (snap) {
      if (KNOWN_T[String(t)]) return;
      var rec = snap.val() || {}; var fm = fromRecord(rec), out = [];
      KNOWN_T[String(rec.updatedAt || t)] = 1;
      Object.keys(fm.parts).forEach(function (part) {
        var fp = fm.parts[part], p = M.parts[part];
        if (fp.mode === 'rows' && (!p || p.mode === 'rows')) {
          fp.order.forEach(function (k) {
            var r = fp.rows[k]; if (p && p.rows[k] != null && same(p.rows[k], r)) return;
            if (p && p.rows[k] == null && RK[rk(part, k)] && RK[rk(part, k)] !== '') {
              // removed here after a change note: a stale copy elsewhere must not bring it back
              return;
            }
            out.push({ p: part, k: k, d: r });
          });
        } else if (!p || !same(joinPart(p), joinPart(fp))) {
          out.push({ p: part, k: '*', d: joinPart(fp) });
        }
        // rows missing from that record are kept (never removed because a stale copy lacks them)
      });
      if (!out.length) return;
      var key = newKey(), te = Date.now(), upd = {};
      upd[LOG + '/' + key] = clean({ t: te, by: rec.updatedBy || 'old-version computer', src: 'old-version save', ft: t, c: out });
      KNOWN_T[String(te)] = 1;
      out.forEach(function (c) { applyRow(c.p, c.k, c.d, false, key); });
      stats.logOut++; stats.rowsOut += out.length;
      prev.update.call(db().ref(), upd).catch(function (e) { console.warn('[fin-delta] old-version merge', e); });
      saveSoon(); deliverSoon();
    }).catch(function (e) { console.warn('[fin-delta] old-version check', e); });
  }
  function clean(x) { return JSON.parse(JSON.stringify(x, function (k, v) { return (typeof v === 'number' && !isFinite(v)) ? null : v; })); }

  // ── handing the record to the billing screens ──
  var LISTENERS = []; // {cb, ctx}
  function snapOf(rec, key) {
    return {
      key: key, val: function () { return clone(rec); }, exportVal: function () { return clone(rec); },
      exists: function () { return rec != null; },
      child: function (p) { var v = rec; String(p).split('/').forEach(function (s) { v = v == null ? undefined : v[s]; }); return snapOf(v === undefined ? null : v, String(p).split('/').pop()); },
      forEach: function (fn) { if (!rec || typeof rec !== 'object') return false; return Object.keys(rec).some(function (k) { return fn(snapOf(rec[k], k)) === true; }); },
      hasChildren: function () { return !!rec && typeof rec === 'object' && Object.keys(rec).length > 0; },
      numChildren: function () { return rec && typeof rec === 'object' ? Object.keys(rec).length : 0; },
      ref: db().ref(key === ROOT ? ROOT : ROOT + '/' + key)
    };
  }
  function current(part) {
    var rec = toRecord(M, true);
    if (!part) { markDelivered(); return snapOf(rec, ROOT); }
    var v = rec[part]; if (part === 'updatedAt' || part === 'updatedBy') v = M.meta[part] == null ? null : M.meta[part];
    return snapOf(v === undefined ? null : v, part);
  }
  var delT = null;
  function deliverSoon() {
    clearTimeout(delT);
    delT = setTimeout(function () {
      if (!LISTENERS.length) return;
      var s = current();
      LISTENERS.slice().forEach(function (l) { try { l.cb.call(l.ctx || null, s); } catch (e) { console.warn('[fin-delta] screen', e); } });
    }, 300);
  }

  // ── a save from the billing screens: send only what changed ──
  function save(value, by) {
    var v = value || {}, changes = [], held = false, extra = false;
    Object.keys(v).forEach(function (part) {
      if (part === 'updatedAt' || part === 'updatedBy' || part === 'restoredFrom') return;
      var np = splitPart(part, clone(v[part])), p = M.parts[part];
      if (np.mode === 'rows' && (!p || p.mode === 'rows')) {
        np.order.forEach(function (k) { if (!p || p.rows[k] == null || !same(p.rows[k], np.rows[k])) changes.push({ p: part, k: k, d: np.rows[k] }); });
        if (p) {
          if (p.order.some(function (k) { return p.rows[k] != null && np.rows[k] == null && !(DELIVERED[part] && DELIVERED[part][k]); })) extra = true;
          var gone = p.order.filter(function (k) { return p.rows[k] != null && np.rows[k] == null && DELIVERED[part] && DELIVERED[part][k]; });
          var n = partsCount(p);
          if (gone.length && n >= 10 && gone.length > n * 0.5) {
            held = true; stats.held++;
            console.warn('[fin-delta] ' + part + ': ' + gone.length + ' of ' + n + ' rows missing from this save — not removed');
          } else {
            gone.forEach(function (k) { changes.push({ p: part, k: k, x: 1, d: p.rows[k] }); });
          }
        }
      } else if (!p || !same(joinPart(p), joinPart(np))) {
        if (p && p.mode === 'rows' && np.mode !== 'rows' && partsCount(p) >= 10 && (Array.isArray(v[part]) ? v[part].length : 0) < partsCount(p) * 0.5) {
          held = true; stats.held++; return;
        }
        changes.push({ p: part, k: '*', d: joinPart(np) });
      }
    });
    var key = newKey(), t = Date.now();
    changes.forEach(function (c) {
      applyRow(c.p, c.k, c.x ? null : c.d, !!c.x, key);
      if (c.x && DELIVERED[c.p]) delete DELIVERED[c.p][c.k];
      if (!c.x && c.k !== '*') (DELIVERED[c.p] = DELIVERED[c.p] || {})[c.k] = 1;
    });
    M.meta.updatedAt = t; M.meta.updatedBy = by || v.updatedBy || M.meta.updatedBy || '';
    KNOWN_T[String(t)] = 1;
    var upd = {};
    upd[ROOT] = clean(toRecord(M)); // the whole record, as before (with every row this computer knows of)
    if (changes.length) {
      upd[LOG + '/' + key] = clean({ t: t, by: M.meta.updatedBy, c: changes });
      if (key > LASTKEY) LASTKEY = key;
      stats.logOut++; stats.rowsOut += changes.length;
    }
    saveSoon();
    if (held || extra || changes.length) deliverSoon();
    return prev.update.call(db().ref(), upd);
  }

  // ── which logins use this: those with billing access ──
  var BILLING_ROLES = ['admin', 'reception', 'tpa', 'inventory'];
  var BILLING_MODULES = ['billing', 'tpa', 'inventory', 'reception', 'payments'];
  function billingLogin() {
    var u = window.CURRENT_USER; if (!u) return false;
    if (u.isAdmin === true) return true;
    if (BILLING_ROLES.indexOf(String(u.role || '').trim().toLowerCase()) >= 0) return true;
    var mods = u.access && Array.isArray(u.access.modules) ? u.access.modules.map(function (m) { return String(m || '').toLowerCase(); }) : [];
    return mods.some(function (m) { return BILLING_MODULES.indexOf(m) >= 0; });
  }
  function useDelta() { return !!READY || !!window.CURRENT_USER; }
  var PERSIST = true; // decided when billing is first needed on this page

  // ── wrap the database calls for `financials` ──
  function partOf(path) {
    if (path === ROOT) return '';
    if (path.indexOf(ROOT + '/') !== 0) return null;
    var rest = path.slice(ROOT.length + 1);
    return rest.indexOf('/') >= 0 ? null : rest; // deeper reads go to the server as before
  }
  function args(a) { // once/on(eventType, cb?, cancelOrCtx?, ctx?)
    var cb = typeof a[1] === 'function' ? a[1] : null, cancel = null, ctx = null;
    if (typeof a[2] === 'function') { cancel = a[2]; ctx = a[3] || null; } else if (a[2] && typeof a[2] === 'object') ctx = a[2];
    return { type: a[0], cb: cb, cancel: cancel, ctx: ctx };
  }

  R.once = function () {
    var part = partOf(pathOf(this)), a = args(arguments);
    if (part === null || a.type !== 'value' || !useDelta()) return prev.once.apply(this, arguments);
    var self = this, rawArgs = arguments;
    return start().then(function () {
      var s = current(part);
      if (a.cb) { try { a.cb.call(a.ctx, s); } catch (e) { console.warn('[fin-delta]', e); } }
      return s;
    }, function (err) {
      console.warn('[fin-delta] start failed; reading the whole record as before', err);
      return prev.once.apply(self, rawArgs);
    });
  };
  R.on = function () {
    var path = pathOf(this), part = partOf(path), a = args(arguments);
    if (part !== '' || a.type !== 'value' || !a.cb || !useDelta()) return prev.on.apply(this, arguments);
    var l = { cb: a.cb, ctx: a.ctx };
    LISTENERS.push(l);
    start().then(function () {
      if (LISTENERS.indexOf(l) < 0) return;
      try { l.cb.call(l.ctx, current()); } catch (e) { console.warn('[fin-delta] screen', e); }
    }, function (err) {
      console.warn('[fin-delta] start failed; listening to the whole record as before', err);
      var i = LISTENERS.indexOf(l); if (i >= 0) LISTENERS.splice(i, 1);
      prev.on.call(db().ref(ROOT), 'value', l.cb, a.cancel, l.ctx);
    });
    return a.cb;
  };
  R.off = function (type, cb) {
    if (pathOf(this) === ROOT) {
      LISTENERS = LISTENERS.filter(function (l) { return (type && type !== 'value') || (cb && l.cb !== cb); });
    }
    return prev.off.apply(this, arguments);
  };
  R.set = function (value, onComplete) {
    if (pathOf(this) !== ROOT || !value || typeof value !== 'object' || !useDelta()) return prev.set.apply(this, arguments);
    var self = this, rawArgs = arguments;
    var p = start().then(function () { return save(value, value.updatedBy); }, function (err) {
      console.warn('[fin-delta] start failed; saving the whole record as before', err);
      return prev.set.apply(self, rawArgs);
    });
    if (typeof onComplete === 'function') p.then(function () { onComplete(null); }, function (e) { onComplete(e); });
    return p;
  };

  window.BMH_FIN_DELTA = {
    stats: function () { return Object.assign({ on: !!READY, keepsCopy: !!READY && PERSIST, billingLogin: billingLogin(), lastKey: LASTKEY, copyAt: COPY_AT ? new Date(COPY_AT).toISOString() : null, rows: M ? Object.keys(M.parts).reduce(function (n, k) { return n + (partsCount(M.parts[k]) || 1); }, 0) : 0 }, stats); },
    // for checking: the record as this computer holds it
    record: function () { return M ? toRecord(M) : null; },
    ready: function () { return start(); }
  };
})();
