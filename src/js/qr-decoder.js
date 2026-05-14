import jsQR from 'jsqr';

window.BMH_QR_DECODE = function (imageData) {
  try {
    if (!imageData || !imageData.data || !imageData.width || !imageData.height) return '';
    const result = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'attemptBoth' });
    return String(result?.data || '').trim();
  } catch (e) {
    return '';
  }
};

(function installReceptionPatientBackgroundHydrator() {
  if (window.__bmhReceptionPatientBackgroundHydratorV2) return;
  window.__bmhReceptionPatientBackgroundHydratorV2 = true;

  const DB_NAME = 'bmh-reception-cache';
  const STORE = 'patients';
  const CACHE_META = 'bmh_patient_cache_meta_v2';
  const TWO_MONTHS_MS = 62 * 24 * 60 * 60 * 1000;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const bmhNum = v => { const m = String(v || '').trim().match(/^BMSH-(\d{1,9})$/i); return m ? parseInt(m[1], 10) : 0; };
  const stamp = p => String(p?.updatedAt || p?.lastUpdated || p?.registeredAt || p?.createdAt || p?.checkinAt || p?.queueDate || '');
  const cutoffIso = () => new Date(Date.now() - TWO_MONTHS_MS).toISOString();

  function openCache() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) { reject(new Error('IndexedDB unavailable')); return; }
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'bmhId' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
    });
  }

  async function cachePutMany(patients) {
    if (!patients.length) return;
    try {
      const db = await openCache();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        const store = tx.objectStore(STORE);
        patients.forEach(p => { if (p?.bmhId) store.put(p); });
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error || new Error('IndexedDB write failed'));
      });
      db.close();
      try { localStorage.setItem(CACHE_META, JSON.stringify({ ts: Date.now(), count: patients.length })); } catch (_) {}
    } catch (e) { console.warn('Reception patient cache write skipped', e); }
  }

  async function cacheReadAll() {
    try {
      const db = await openCache();
      const rows = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error || new Error('IndexedDB read failed'));
      });
      db.close();
      return rows;
    } catch (_) { return []; }
  }

  function normalize(row, key) {
    const p = Object.assign({}, row || {}, { bmhId: row?.bmhId || key });
    return typeof window.normalizePatientRecord === 'function' ? window.normalizePatientRecord(p) : p;
  }

  function upsertPatient(row, key) {
    if (!row || typeof row !== 'object') return null;
    const p = normalize(row, key);
    if (!p.bmhId) return null;
    if (!Array.isArray(window.PATIENTS)) window.PATIENTS = [];
    const id = String(p.bmhId || '').trim().toUpperCase();
    const idx = window.PATIENTS.findIndex(x => String(x?.bmhId || '').trim().toUpperCase() === id);
    if (idx >= 0) window.PATIENTS[idx] = Object.assign({}, window.PATIENTS[idx], p);
    else window.PATIENTS.push(p);
    const n = bmhNum(p.bmhId);
    if (n > 0) {
      window._nextPatientNum = Math.max(Number(window._nextPatientNum || 0), n + 1);
      try { localStorage.setItem('bmh_last_patient_num', String(n)); } catch (_) {}
    }
    return p;
  }

  function refreshReceptionSearchUi() {
    try { window.dispatchEvent(new CustomEvent('bmh:patientsUpdated')); } catch (_) {}
    try { if (typeof window.genRcUID === 'function') window.genRcUID(); } catch (_) {}
    try { const b = document.getElementById('rc-bmhid-search'); if (b?.value && typeof window.lookupByBMHID === 'function') window.lookupByBMHID(b.value); } catch (_) {}
    try { const m = document.getElementById('rc-mob-inp'); if (m?.value && typeof window.searchPatientByPhone === 'function') window.searchPatientByPhone(m.value); } catch (_) {}
    try { const q = document.getElementById('rc-search-inp'); if (q?.value && typeof window.filterRcExist === 'function') window.filterRcExist(q.value); } catch (_) {}
  }

  async function feedRows(rows, opts = {}) {
    const chunk = opts.chunk || 20;
    const gap = opts.gap || 260;
    const cacheRows = [];
    for (let i = 0; i < rows.length; i += chunk) {
      rows.slice(i, i + chunk).forEach(item => {
        const p = upsertPatient(item.row || item, item.key || item.bmhId);
        if (p) cacheRows.push(p);
      });
      refreshReceptionSearchUi();
      await sleep(gap);
    }
    await cachePutMany(cacheRows);
    refreshReceptionSearchUi();
  }

  async function replayLocalCache() {
    const cached = await cacheReadAll();
    if (!cached.length) return;
    cached.sort((a, b) => bmhNum(b.bmhId) - bmhNum(a.bmhId));
    window.__bmhReceptionLocalCacheCount = cached.length;
    await feedRows(cached, { chunk: 35, gap: 80 });
  }

  function mergeSnapshot(map, snap) {
    const data = snap && snap.val ? (snap.val() || {}) : {};
    Object.keys(data).forEach(key => {
      const row = data[key];
      const p = normalize(row, key);
      if (p?.bmhId) map.set(String(p.bmhId).trim().toUpperCase(), { key, row: p });
    });
  }

  async function fetchRecentTwoMonths() {
    if (!window.FBDB) return [];
    const since = cutoffIso();
    const map = new Map();
    const reads = [
      () => window.FBDB.ref('patients').orderByKey().limitToLast(500).once('value'),
      () => window.FBDB.ref('patients').orderByChild('createdAt').startAt(since).limitToFirst(900).once('value'),
      () => window.FBDB.ref('patients').orderByChild('registeredAt').startAt(since).limitToFirst(900).once('value'),
      () => window.FBDB.ref('patients').orderByChild('updatedAt').startAt(since).limitToFirst(700).once('value'),
      () => window.FBDB.ref('patients').orderByChild('checkinAt').startAt(since).limitToFirst(700).once('value'),
      () => window.FBDB.ref('patients').orderByChild('queueDate').startAt(since).limitToFirst(700).once('value')
    ];
    for (const read of reads) {
      try { mergeSnapshot(map, await read()); } catch (_) {}
      await sleep(650);
    }
    return Array.from(map.values()).sort((a, b) => {
      const an = bmhNum(a.row?.bmhId || a.key), bn = bmhNum(b.row?.bmhId || b.key);
      if (an || bn) return bn - an;
      return String(stamp(b.row)).localeCompare(String(stamp(a.row)));
    });
  }

  async function hydratePatients() {
    if (window.__bmhReceptionHydratingPatients || !window.FBDB) return;
    window.__bmhReceptionHydratingPatients = true;
    try {
      await replayLocalCache();
      await sleep(500);
      const recent = await fetchRecentTwoMonths();
      window.__bmhReceptionHydratedPatientCount = recent.length;
      await feedRows(recent, { chunk: 20, gap: 280 });
    } catch (e) {
      console.warn('Reception background patient hydration failed', e);
    } finally {
      window.__bmhReceptionHydratingPatients = false;
    }
  }

  function scheduleHydration() {
    if (!window.FBDB) { setTimeout(scheduleHydration, 500); return; }
    setTimeout(hydratePatients, 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleHydration);
  else scheduleHydration();
  window.addEventListener('bmh:receptionOpened', hydratePatients);
})();
