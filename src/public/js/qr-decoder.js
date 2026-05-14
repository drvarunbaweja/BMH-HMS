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
  if (window.__bmhReceptionPatientBackgroundHydratorV1) return;
  window.__bmhReceptionPatientBackgroundHydratorV1 = true;

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const bmhNum = v => {
    const m = String(v || '').trim().match(/^BMSH-(\d{1,9})$/i);
    return m ? parseInt(m[1], 10) : 0;
  };

  function normalize(row, key) {
    const p = Object.assign({}, row || {}, { bmhId: row?.bmhId || key });
    return typeof window.normalizePatientRecord === 'function' ? window.normalizePatientRecord(p) : p;
  }

  function upsertPatient(row, key) {
    if (!row || typeof row !== 'object') return false;
    const p = normalize(row, key);
    if (!p.bmhId) return false;
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
    return true;
  }

  function refreshReceptionSearchUi() {
    try { window.dispatchEvent(new CustomEvent('bmh:patientsUpdated')); } catch (_) {}
    try { if (typeof window.genRcUID === 'function') window.genRcUID(); } catch (_) {}
    try {
      const b = document.getElementById('rc-bmhid-search');
      if (b && b.value && typeof window.lookupByBMHID === 'function') window.lookupByBMHID(b.value);
    } catch (_) {}
    try {
      const m = document.getElementById('rc-mob-inp');
      if (m && m.value && typeof window.searchPatientByPhone === 'function') window.searchPatientByPhone(m.value);
    } catch (_) {}
    try {
      const q = document.getElementById('rc-search-inp');
      if (q && q.value && typeof window.filterRcExist === 'function') window.filterRcExist(q.value);
    } catch (_) {}
  }

  async function hydrateLatestPatients() {
    if (window.__bmhReceptionHydratingPatients || !window.FBDB) return;
    window.__bmhReceptionHydratingPatients = true;
    try {
      const snap = await window.FBDB.ref('patients').orderByKey().limitToLast(200).once('value');
      const data = snap && snap.val ? (snap.val() || {}) : {};
      const rows = Object.keys(data)
        .map(key => ({ key, row: data[key], n: Math.max(bmhNum(key), bmhNum(data[key]?.bmhId)) }))
        .sort((a, b) => b.n - a.n);
      for (let i = 0; i < rows.length; i += 20) {
        rows.slice(i, i + 20).forEach(item => upsertPatient(item.row, item.key));
        refreshReceptionSearchUi();
        await sleep(260);
      }
      window.__bmhReceptionHydratedPatientCount = rows.length;
      refreshReceptionSearchUi();
    } catch (e) {
      console.warn('Reception background patient hydration failed', e);
    } finally {
      window.__bmhReceptionHydratingPatients = false;
    }
  }

  function scheduleHydration() {
    if (!window.FBDB) { setTimeout(scheduleHydration, 500); return; }
    setTimeout(hydrateLatestPatients, 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleHydration);
  else scheduleHydration();
  window.addEventListener('bmh:receptionOpened', hydrateLatestPatients);
})();
