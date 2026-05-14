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

(function installReceptionTargetedPatientLookup() {
  if (window.__bmhReceptionTargetedPatientLookupV4) return;
  window.__bmhReceptionTargetedPatientLookupV4 = true;

  const SEQ_DAY_KEY = 'bmh_patient_sequence_boot_day';
  const SEQ_LOCAL_KEY = 'bmh_last_patient_num';
  const BMSH_PREFIX = 'BMSH-';

  const bmhNum = v => { const m = String(v || '').trim().match(/^BMSH-(\d{1,9})$/i); return m ? parseInt(m[1], 10) : 0; };
  const bmhId = v => { const s = String(v || '').trim().toUpperCase().replace(/\s+/g, '').replace(/BMSH[-\s]*/i, BMSH_PREFIX); return /^BMSH-\d{3,9}$/.test(s) ? s : ''; };
  const bmhFromNum = n => BMSH_PREFIX + String(Number(n || 0)).padStart(6, '0');
  const phoneKey = v => { const d = String(v || '').replace(/\D/g, ''); return d.length < 5 ? '' : (d.length >= 10 ? d.slice(-10) : d); };
  const isMerged = p => !!(p && (p.mergedInto || p.inactive || String(p.status || '').toLowerCase() === 'merged'));
  const todayKey = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  };

  let sequenceFloor = Number(localStorage.getItem(SEQ_LOCAL_KEY) || 0) || 0;
  let sequenceReady = false;
  let sequencePromise = null;
  let lookupTimer = null;
  let lastLookupKey = '';

  function setStatus(text) {
    const el = document.getElementById('rc-uid');
    if (el) el.textContent = text;
  }

  function applySequenceFloor(num) {
    const n = Number(num || 0);
    if (!Number.isFinite(n) || n <= 0) return;
    sequenceFloor = Math.max(sequenceFloor, n);
    window._nextPatientNum = Math.max(Number(window._nextPatientNum || 0), sequenceFloor + 1);
    try { localStorage.setItem(SEQ_LOCAL_KEY, String(sequenceFloor)); } catch (_) {}
    const el = document.getElementById('rc-uid');
    if (el && (!bmhId(el.textContent) || bmhNum(el.textContent) <= sequenceFloor)) el.textContent = bmhFromNum(sequenceFloor + 1);
  }

  function normalizePatient(row, key) {
    const p = Object.assign({}, row || {}, { bmhId: row?.bmhId || key });
    return typeof window.normalizePatientRecord === 'function' ? window.normalizePatientRecord(p) : p;
  }

  function upsertLocalPatient(row, key) {
    if (!row || typeof row !== 'object') return null;
    const p = normalizePatient(row, key);
    if (!p.bmhId) return null;
    const cache = Array.isArray(window._BMH_ALL_PATIENTS_CACHE) ? window._BMH_ALL_PATIENTS_CACHE.slice() : (Array.isArray(window.PATIENTS) ? window.PATIENTS.slice() : []);
    const idx = cache.findIndex(x => String(x?.bmhId || '').trim() === String(p.bmhId || '').trim());
    if (idx >= 0) cache[idx] = Object.assign({}, cache[idx], p); else cache.push(p);
    window._BMH_ALL_PATIENTS_CACHE = cache;
    applySequenceFloor(bmhNum(p.bmhId));
    if (typeof window.rebuildPatientsArrayFromGlobalCache === 'function') window.rebuildPatientsArrayFromGlobalCache();
    else if (Array.isArray(window.PATIENTS)) {
      const i = window.PATIENTS.findIndex(x => String(x?.bmhId || '').trim() === String(p.bmhId || '').trim());
      if (i >= 0) window.PATIENTS[i] = Object.assign({}, window.PATIENTS[i], p); else window.PATIENTS.push(p);
    }
    return p;
  }

  function hasLocalPatient(id) {
    const key = bmhId(id);
    if (!key) return false;
    return [window.PATIENTS, window._BMH_ALL_PATIENTS_CACHE].some(list => Array.isArray(list) && list.some(p => String(p?.bmhId || '').trim().toUpperCase() === key));
  }

  function valuesByDate(data) {
    return Object.keys(data || {}).map(k => {
      const row = data[k];
      return row && typeof row === 'object' ? Object.assign({ id: row.id || k }, row) : row;
    }).filter(Boolean).sort((a, b) => (Date.parse(b?.date || b?.createdAt || b?.updatedAt || b?.ts || '') || 0) - (Date.parse(a?.date || a?.createdAt || a?.updatedAt || a?.ts || '') || 0));
  }

  function attachHistory(id, h) {
    const key = bmhId(id);
    if (!key || !h) return;
    [window.PATIENTS, window._BMH_ALL_PATIENTS_CACHE].filter(Array.isArray).forEach(list => {
      const i = list.findIndex(p => String(p?.bmhId || '').trim().toUpperCase() === key);
      if (i < 0) return;
      list[i] = Object.assign({}, list[i], {
        visits: h.visits || list[i].visits || [],
        prescriptions: h.prescriptions || list[i].prescriptions || [],
        surgeryHistory: h.surgeryHistory || list[i].surgeryHistory || [],
        lastVisit: h.lastVisit || list[i].lastVisit || null,
        lastPrescription: h.lastPrescription || list[i].lastPrescription || null,
        _historyLoadedAt: new Date().toISOString()
      });
    });
  }

  async function fetchHistory(id) {
    const key = bmhId(id);
    if (!key || !window.FBDB) return null;
    try {
      const [v, r, o] = await Promise.all([
        window.FBDB.ref('visits/' + key).limitToLast(20).once('value').catch(() => null),
        window.FBDB.ref('prescriptions/' + key).limitToLast(20).once('value').catch(() => null),
        window.FBDB.ref('otCases').orderByChild('bmhId').equalTo(key).limitToLast(20).once('value').catch(() => null)
      ]);
      const h = {
        visits: valuesByDate(v && v.val ? v.val() : {}),
        prescriptions: valuesByDate(r && r.val ? r.val() : {}),
        surgeryHistory: valuesByDate(o && o.val ? o.val() : {})
      };
      h.lastVisit = h.visits[0] || null;
      h.lastPrescription = h.prescriptions[0] || null;
      window._BMH_PATIENT_HISTORY_CACHE = window._BMH_PATIENT_HISTORY_CACHE || {};
      window._BMH_PATIENT_HISTORY_CACHE[key] = h;
      attachHistory(key, h);
      return h;
    } catch (e) {
      console.warn('Reception history lookup failed', e);
      return null;
    }
  }

  function collectSequenceNums(data, nums) {
    Object.keys(data || {}).forEach(k => {
      const row = data[k] || {};
      const n = Math.max(bmhNum(k), bmhNum(row.bmhId));
      if (n > 0) nums.push(n);
    });
  }

  async function repairSequenceFromLatestKeys() {
    if (!window.FBDB) return 0;
    const nums = [];
    try {
      const snap = await window.FBDB.ref('patients').orderByKey().limitToLast(40).once('value');
      collectSequenceNums(snap && snap.val ? (snap.val() || {}) : {}, nums);
    } catch (_) {}
    const max = Math.max(0, ...nums);
    if (max > 0) {
      applySequenceFloor(max);
      try {
        await window.FBDB.ref('settings/lastPatientNum').transaction(cur => Math.max(Number(cur || 0), max));
      } catch (_) {}
    }
    return max;
  }

  async function initialiseSequence(opts = {}) {
    if (!window.FBDB) return 0;
    if (sequencePromise && !opts.force) return sequencePromise;
    sequencePromise = (async function () {
      const nums = [];
      try {
        const s = await window.FBDB.ref('settings/lastPatientNum').once('value');
        const n = Number(s && s.val ? s.val() : 0);
        if (n > 0) nums.push(n);
      } catch (_) {}
      const day = todayKey();
      let repaired = 0;
      try {
        if (opts.forceDailyRepair || localStorage.getItem(SEQ_DAY_KEY) !== day) {
          repaired = await repairSequenceFromLatestKeys();
          localStorage.setItem(SEQ_DAY_KEY, day);
        }
      } catch (_) {}
      const max = Math.max(repaired, sequenceFloor, ...nums);
      if (max > 0) applySequenceFloor(max);
      sequenceReady = max > 0;
      return max;
    })().finally(() => { sequencePromise = null; });
    return sequencePromise;
  }

  async function reserveNextPatientId() {
    if (!window.FBDB) return '';
    await initialiseSequence();
    try {
      const res = await window.FBDB.ref('settings/lastPatientNum').transaction(cur => {
        const current = Math.max(Number(cur || 0), sequenceFloor || 0);
        return current + 1;
      });
      const n = Number(res && res.snapshot && res.snapshot.val ? res.snapshot.val() : 0);
      if (!n) throw new Error('No patient counter value returned');
      sequenceReady = true;
      sequenceFloor = n;
      window._nextPatientNum = n + 1;
      try { localStorage.setItem(SEQ_LOCAL_KEY, String(n)); } catch (_) {}
      const id = bmhFromNum(n);
      setStatus(id);
      return id;
    } catch (e) {
      console.warn('BMSH counter reservation failed', e);
      return '';
    }
  }

  function phoneVariants(v) {
    const raw = String(v || '').trim();
    const d = raw.replace(/\D/g, '');
    const l = d.length >= 10 ? d.slice(-10) : d;
    return Array.from(new Set([raw, d, l, l ? '+91' + l : '', l ? '+91 ' + l : '', l ? l.replace(/(\d{5})(\d{5})$/, '$1 $2') : '', l ? '+91 ' + l.replace(/(\d{5})(\d{5})$/, '$1 $2') : ''].map(x => String(x || '').trim()).filter(Boolean)));
  }

  async function fetchById(raw) {
    const key = bmhId(raw);
    if (!key || !window.FBDB) return null;
    try {
      const snap = await window.FBDB.ref('patients/' + key).once('value');
      const p = snap && snap.val ? upsertLocalPatient(snap.val(), key) : null;
      if (p && !isMerged(p)) await fetchHistory(p.bmhId);
      return p;
    } catch (e) { console.warn('Reception BMSH lookup failed', e); return null; }
  }

  async function fetchByIdPrefix(raw) {
    if (!window.FBDB) return [];
    const text = String(raw || '').trim().toUpperCase().replace(/\s+/g, '');
    const digits = text.replace(/\D/g, '');
    if (digits.length < 5) return [];
    const found = new Map();
    const exact = bmhId(text) || (digits.length >= 6 ? bmhFromNum(Number(digits.slice(0, 6))) : '');
    if (exact && digits.length >= 6) {
      const p = await fetchById(exact);
      if (p && !isMerged(p)) found.set(p.bmhId, p);
    }
    if (digits.length === 5) {
      const prefix = text.startsWith('BMSH') ? text.replace(/BMSH[-\s]*/i, BMSH_PREFIX) : BMSH_PREFIX + digits;
      if (/^BMSH-\d{5}$/.test(prefix)) {
        try {
          const snap = await window.FBDB.ref('patients').orderByKey().startAt(prefix).endAt(prefix + '\uf8ff').limitToFirst(9).once('value');
          const data = snap && snap.val ? (snap.val() || {}) : {};
          Object.keys(data).forEach(k => {
            const p = upsertLocalPatient(data[k], k);
            if (p && p.bmhId && !isMerged(p)) found.set(p.bmhId, p);
          });
        } catch (_) {}
      }
    }
    await Promise.all(Array.from(found.values()).slice(0, 9).map(p => fetchHistory(p.bmhId)));
    return Array.from(found.values());
  }

  async function fetchPatientsByIds(ids) {
    const keys = Array.from(new Set((ids || []).map(bmhId).filter(Boolean))).slice(0, 12);
    const rows = await Promise.all(keys.map(id => fetchById(id).catch(() => null)));
    return rows.filter(Boolean);
  }

  function idsFromIndexValue(value) {
    if (!value) return [];
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value;
    if (typeof value === 'object') return Object.keys(value).map(k => value[k] === true ? k : value[k]).filter(Boolean);
    return [];
  }

  async function fetchByPhone(raw) {
    if (!window.FBDB || !phoneKey(raw)) return [];
    const key = phoneKey(raw);
    const found = new Map();
    const useExact = key.length >= 10;
    try {
      const idxRef = useExact
        ? window.FBDB.ref('phoneIndex/' + key)
        : window.FBDB.ref('phoneIndex').orderByKey().startAt(key).endAt(key + '\uf8ff').limitToFirst(12);
      const idx = await idxRef.once('value');
      const val = idx && idx.val ? idx.val() : null;
      const ids = useExact ? idsFromIndexValue(val) : Object.keys(val || {}).flatMap(k => idsFromIndexValue(val[k]));
      const indexed = await fetchPatientsByIds(ids);
      indexed.forEach(p => { if (p && p.bmhId && !isMerged(p)) found.set(p.bmhId, p); });
    } catch (_) {}
    await Promise.all(['mob', 'mobile', 'mob2', 'altMobile'].map(field => Promise.all(phoneVariants(raw).map(value => {
      const q = useExact
        ? window.FBDB.ref('patients').orderByChild(field).equalTo(value).limitToFirst(12)
        : window.FBDB.ref('patients').orderByChild(field).startAt(value).endAt(value + '\uf8ff').limitToFirst(12);
      return q.once('value').then(snap => {
        const data = snap && snap.val ? (snap.val() || {}) : {};
        Object.keys(data).forEach(k => {
          const p = upsertLocalPatient(data[k], k);
          if (p && p.bmhId && !isMerged(p)) found.set(p.bmhId, p);
        });
      }).catch(() => {});
    }))));
    await Promise.all(Array.from(found.values()).slice(0, 12).map(p => fetchHistory(p.bmhId)));
    return Array.from(found.values());
  }

  function schedule(raw, reason, done) {
    const text = String(raw || '').trim();
    const digits = text.replace(/\D/g, '');
    const isBmh = reason === 'bmhid' || /BMSH/i.test(text);
    if (isBmh && digits.length < 5) return;
    if (!isBmh && digits.length < 5) return;
    const key = reason + ':' + text;
    if (key === lastLookupKey) return;
    clearTimeout(lookupTimer);
    lookupTimer = setTimeout(async () => {
      lastLookupKey = key;
      const before = Array.isArray(window.PATIENTS) ? window.PATIENTS.length : 0;
      if (isBmh) await fetchByIdPrefix(text);
      if (!isBmh && digits.length >= 5) await fetchByPhone(text);
      const after = Array.isArray(window.PATIENTS) ? window.PATIENTS.length : 0;
      if (after !== before && typeof done === 'function') done();
    }, 320);
  }

  async function ensureBeforeRegister() {
    await initialiseSequence();
    const uid = (document.getElementById('rc-uid')?.textContent || '').trim();
    const mob = (document.getElementById('rc-mob-inp')?.value || document.getElementById('rc-mob')?.value || '').trim();
    const mob2 = (document.getElementById('rc-mob2')?.value || '').trim();
    const jobs = [];
    if (bmhId(uid)) jobs.push(fetchById(uid));
    if (phoneKey(mob)) jobs.push(fetchByPhone(mob));
    if (phoneKey(mob2)) jobs.push(fetchByPhone(mob2));
    if (jobs.length) await Promise.all(jobs);
  }

  async function prepareIdForRegister(forceNew) {
    const floor = await initialiseSequence({ force: true });
    if (!floor) {
      window.showToast?.('Could not verify the BMSH counter. Registration stopped to prevent duplicate IDs.', 'e');
      return '';
    }
    if (!forceNew) await ensureBeforeRegister();
    const current = bmhId(document.getElementById('rc-uid')?.textContent || '');
    if (!forceNew && current && hasLocalPatient(current)) return current;
    const reserved = await reserveNextPatientId();
    if (!reserved) window.showToast?.('Could not reserve the next BMSH number. Registration stopped to prevent duplicate IDs.', 'e');
    return reserved;
  }

  function wrap() {
    if (window.__bmhReceptionTargetedPatientLookupWrappedV4 || typeof window.registerPatient !== 'function') return;
    window.__bmhReceptionTargetedPatientLookupWrappedV4 = true;
    const oldId = window.lookupByBMHID;
    if (typeof oldId === 'function') window.lookupByBMHID = function (v) { const r = oldId.apply(this, arguments); schedule(v, 'bmhid', () => oldId.call(window, v)); return r; };
    const oldPhone = window.lookupByPhone;
    if (typeof oldPhone === 'function') window.lookupByPhone = function (v) { const r = oldPhone.apply(this, arguments); schedule(v, 'phone-inline', () => oldPhone.call(window, v)); return r; };
    const oldSearch = window.searchPatientByPhone;
    if (typeof oldSearch === 'function') window.searchPatientByPhone = function (v) { const r = oldSearch.apply(this, arguments); schedule(v, 'phone-dropdown', () => oldSearch.call(window, v)); return r; };
    const oldGen = window.genRcUID;
    if (typeof oldGen === 'function') window.genRcUID = function () {
      const current = bmhId(document.getElementById('rc-uid')?.textContent || '');
      if (current && sequenceReady) return current;
      if (!sequenceReady) setStatus('Checking BMSH...');
      initialiseSequence().then(max => { if (!max) oldGen.apply(window, arguments); });
      return current || '';
    };
    const oldReg = window.registerPatient;
    window.registerPatient = async function () {
      const forceNew = !!document.getElementById('rc-force-new-bmsh')?.checked;
      const id = await prepareIdForRegister(forceNew);
      if (!id) return;
      return oldReg.apply(this, arguments);
    };
    if (!sequenceReady) setStatus('Checking BMSH...');
    initialiseSequence({ forceDailyRepair: true });
  }

  wrap();
  document.addEventListener('DOMContentLoaded', wrap);
  setTimeout(wrap, 0);
  setTimeout(wrap, 1000);
  setTimeout(wrap, 3000);
})();
