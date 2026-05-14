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
  if (window.__bmhReceptionTargetedPatientLookupV2) return;
  window.__bmhReceptionTargetedPatientLookupV2 = true;

  const bmhNum = v => { const m = String(v || '').trim().match(/^BMSH-(\d{1,9})$/i); return m ? parseInt(m[1], 10) : 0; };
  const bmhId = v => { const s = String(v || '').trim().toUpperCase().replace(/\s+/g, '').replace(/BMSH[-\s]*/i, 'BMSH-'); return /^BMSH-\d{3,9}$/.test(s) ? s : ''; };
  const phoneKey = v => { const d = String(v || '').replace(/\D/g, ''); return d.length < 5 ? '' : (d.length >= 10 ? d.slice(-10) : d); };
  const isMerged = p => !!(p && (p.mergedInto || p.inactive || String(p.status || '').toLowerCase() === 'merged'));

  function applySequenceFloor(num) {
    const n = Number(num || 0);
    if (!Number.isFinite(n) || n <= 0) return;
    window._nextPatientNum = Math.max(Number(window._nextPatientNum || 0), n + 1);
    try { localStorage.setItem('bmh_last_patient_num', String(n)); } catch (_) {}
    const el = document.getElementById('rc-uid');
    if (el) el.textContent = 'BMSH-' + String(window._nextPatientNum).padStart(6, '0');
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
      const i = list.findIndex(p => String(p?.bmhId || '').trim() === key);
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
      const h = { visits: valuesByDate(v && v.val ? v.val() : {}), prescriptions: valuesByDate(r && r.val ? r.val() : {}), surgeryHistory: valuesByDate(o && o.val ? o.val() : {}) };
      h.lastVisit = h.visits[0] || null;
      h.lastPrescription = h.prescriptions[0] || null;
      window._BMH_PATIENT_HISTORY_CACHE = window._BMH_PATIENT_HISTORY_CACHE || {};
      window._BMH_PATIENT_HISTORY_CACHE[key] = h;
      attachHistory(key, h);
      return h;
    } catch (e) { console.warn('Reception history lookup failed', e); return null; }
  }

  async function refreshSequenceFloor() {
    if (!window.FBDB) return 0;
    const nums = [];
    try { const s = await window.FBDB.ref('settings/lastPatientNum').once('value'); const n = Number(s && s.val ? s.val() : 0); if (n > 0) nums.push(n); } catch (_) {}
    try {
      const snap = await window.FBDB.ref('patients').orderByKey().limitToLast(80).once('value');
      const data = snap && snap.val ? (snap.val() || {}) : {};
      Object.keys(data).forEach(k => { const n = Math.max(bmhNum(k), bmhNum(data[k]?.bmhId)); if (n > 0) nums.push(n); });
    } catch (_) {}
    const max = Math.max(0, ...nums);
    if (max > 0) applySequenceFloor(max);
    return max;
  }

  function variants(v) {
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

  async function fetchByPhone(raw) {
    if (!window.FBDB || !phoneKey(raw)) return [];
    const found = new Map();
    await Promise.all(['mob', 'mobile', 'mob2', 'altMobile'].map(field => Promise.all(variants(raw).map(value =>
      window.FBDB.ref('patients').orderByChild(field).equalTo(value).limitToFirst(12).once('value').then(snap => {
        const data = snap && snap.val ? (snap.val() || {}) : {};
        Object.keys(data).forEach(k => { const p = upsertLocalPatient(data[k], k); if (p && p.bmhId && !isMerged(p)) found.set(p.bmhId, p); });
      }).catch(() => {})
    ))));
    await Promise.all(Array.from(found.values()).slice(0, 8).map(p => fetchHistory(p.bmhId)));
    return Array.from(found.values());
  }

  let timer = null, lastKey = '';
  function schedule(raw, reason, done) {
    const text = String(raw || '').trim();
    const digits = text.replace(/\D/g, '');
    if (text.length < 3 && digits.length < 5) return;
    const key = reason + ':' + text;
    if (key === lastKey) return;
    clearTimeout(timer);
    timer = setTimeout(async () => {
      lastKey = key;
      const before = Array.isArray(window.PATIENTS) ? window.PATIENTS.length : 0;
      if (/^BMSH[-\s]*\d{3,9}$/i.test(text)) await fetchById(text);
      if (digits.length >= 5) await fetchByPhone(text);
      const after = Array.isArray(window.PATIENTS) ? window.PATIENTS.length : 0;
      if (after !== before && typeof done === 'function') done();
    }, 280);
  }

  async function ensureBeforeRegister() {
    await refreshSequenceFloor();
    const uid = (document.getElementById('rc-uid')?.textContent || '').trim();
    const mob = (document.getElementById('rc-mob-inp')?.value || document.getElementById('rc-mob')?.value || '').trim();
    const mob2 = (document.getElementById('rc-mob2')?.value || '').trim();
    const jobs = [];
    if (bmhId(uid)) jobs.push(fetchById(uid));
    if (phoneKey(mob)) jobs.push(fetchByPhone(mob));
    if (phoneKey(mob2)) jobs.push(fetchByPhone(mob2));
    if (jobs.length) await Promise.all(jobs);
  }

  function wrap() {
    if (window.__bmhReceptionTargetedPatientLookupWrappedV2 || typeof window.registerPatient !== 'function') return;
    window.__bmhReceptionTargetedPatientLookupWrappedV2 = true;
    const oldId = window.lookupByBMHID;
    if (typeof oldId === 'function') window.lookupByBMHID = function (v) { const r = oldId.apply(this, arguments); schedule(v, 'bmhid', () => oldId.call(window, v)); return r; };
    const oldPhone = window.lookupByPhone;
    if (typeof oldPhone === 'function') window.lookupByPhone = function (v) { const r = oldPhone.apply(this, arguments); schedule(v, 'phone-inline', () => oldPhone.call(window, v)); return r; };
    const oldSearch = window.searchPatientByPhone;
    if (typeof oldSearch === 'function') window.searchPatientByPhone = function (v) { const r = oldSearch.apply(this, arguments); schedule(v, 'phone-dropdown', () => oldSearch.call(window, v)); return r; };
    const oldGen = window.genRcUID;
    if (typeof oldGen === 'function') window.genRcUID = function () { const id = oldGen.apply(this, arguments); refreshSequenceFloor(); return id; };
    const oldReg = window.registerPatient;
    window.registerPatient = async function () {
      const forceNew = !!document.getElementById('rc-force-new-bmsh')?.checked;
      if (!forceNew) await ensureBeforeRegister(); else await refreshSequenceFloor();
      return oldReg.apply(this, arguments);
    };
    refreshSequenceFloor();
  }

  wrap();
  document.addEventListener('DOMContentLoaded', wrap);
  setTimeout(wrap, 0);
  setTimeout(wrap, 1000);
  setTimeout(wrap, 3000);
})();
