import jsQR from 'jsqr';

window.BMH_QR_DECODE = function (imageData) {
  try {
    if (!imageData || !imageData.data || !imageData.width || !imageData.height) return '';
    const result = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'attemptBoth'
    });
    return String(result?.data || '').trim();
  } catch (e) {
    return '';
  }
};

(function installReceptionPatientLookupHotfix() {
  if (window.__bmhReceptionPatientLookupHotfix) return;
  window.__bmhReceptionPatientLookupHotfix = true;

  function normalizePhoneKey(value) {
    const digits = String(value || '').replace(/\D/g, '');
    if (digits.length < 5) return '';
    return digits.length >= 10 ? digits.slice(-10) : digits;
  }

  function phoneKeys(record) {
    return Array.from(new Set([
      record?.mob,
      record?.mobile,
      record?.mob2,
      record?.altMobile
    ].map(normalizePhoneKey).filter(Boolean)));
  }

  function isMerged(record) {
    if (!record || typeof record !== 'object') return false;
    return !!(record.mergedInto || record.inactive || String(record.status || '').toLowerCase() === 'merged');
  }

  function normalizePatient(row, key) {
    const out = Object.assign({}, row || {}, { bmhId: row?.bmhId || key });
    if (typeof window.normalizePatientRecord === 'function') return window.normalizePatientRecord(out);
    return out;
  }

  function addPatientToLocalCache(row, key) {
    if (!row || typeof row !== 'object') return null;
    const patient = normalizePatient(row, key);
    if (!patient.bmhId) return null;
    const source = Array.isArray(window._BMH_ALL_PATIENTS_CACHE)
      ? window._BMH_ALL_PATIENTS_CACHE.slice()
      : (Array.isArray(window.PATIENTS) ? window.PATIENTS.slice() : []);
    const idx = source.findIndex(function (p) {
      return String(p?.bmhId || '').trim() === String(patient.bmhId || '').trim();
    });
    if (idx >= 0) source[idx] = patient;
    else source.push(patient);
    window._BMH_ALL_PATIENTS_CACHE = source;
    if (typeof window.rebuildPatientsArrayFromGlobalCache === 'function') {
      window.rebuildPatientsArrayFromGlobalCache();
    } else if (Array.isArray(window.PATIENTS)) {
      const localIdx = window.PATIENTS.findIndex(function (p) {
        return String(p?.bmhId || '').trim() === String(patient.bmhId || '').trim();
      });
      if (localIdx >= 0) window.PATIENTS[localIdx] = patient;
      else window.PATIENTS.push(patient);
    }
    return patient;
  }

  function phoneVariants(value) {
    const raw = String(value || '').trim();
    const digits = raw.replace(/\D/g, '');
    const last10 = digits.length >= 10 ? digits.slice(-10) : digits;
    return Array.from(new Set([
      raw,
      digits,
      last10,
      last10 ? '+91' + last10 : '',
      last10 ? '+91 ' + last10 : '',
      last10 ? last10.replace(/(\d{5})(\d{5})$/, '$1 $2') : '',
      last10 ? '+91 ' + last10.replace(/(\d{5})(\d{5})$/, '$1 $2') : ''
    ].map(function (x) { return String(x || '').trim(); }).filter(Boolean)));
  }

  async function fetchPatientByBmhId(rawId) {
    if (!window.FBDB) return null;
    const id = String(rawId || '').trim().toUpperCase().replace(/\s+/g, '').replace(/BMSH[-\s]*/i, 'BMSH-');
    if (!/^BMSH-\d{3,9}$/.test(id)) return null;
    try {
      const snap = await window.FBDB.ref('patients/' + id).once('value');
      const row = snap && typeof snap.val === 'function' ? snap.val() : null;
      return row ? addPatientToLocalCache(row, id) : null;
    } catch (err) {
      console.warn('Reception BMSH lookup failed', err);
      return null;
    }
  }

  async function fetchPatientsByPhone(rawPhone) {
    if (!window.FBDB) return [];
    const digits = String(rawPhone || '').replace(/\D/g, '');
    if (digits.length < 5) return [];
    const fields = ['mob', 'mobile', 'mob2', 'altMobile'];
    const values = phoneVariants(rawPhone);
    const found = new Map();
    await Promise.all(fields.map(function (field) {
      return Promise.all(values.map(function (value) {
        return window.FBDB.ref('patients')
          .orderByChild(field)
          .equalTo(value)
          .limitToFirst(12)
          .once('value')
          .then(function (snap) {
            const data = snap && typeof snap.val === 'function' ? (snap.val() || {}) : {};
            Object.keys(data).forEach(function (key) {
              const patient = addPatientToLocalCache(data[key], key);
              if (patient && patient.bmhId && !isMerged(patient)) found.set(patient.bmhId, patient);
            });
          })
          .catch(function () {});
      }));
    }));
    return Array.from(found.values());
  }

  let lookupTimer = null;
  let lastLookupKey = '';
  function scheduleLazyLookup(raw, reason, done) {
    const text = String(raw || '').trim();
    const digits = text.replace(/\D/g, '');
    if (text.length < 3 && digits.length < 5) return;
    const key = String(reason || '') + ':' + text;
    if (key === lastLookupKey) return;
    clearTimeout(lookupTimer);
    lookupTimer = setTimeout(async function () {
      lastLookupKey = key;
      const before = Array.isArray(window.PATIENTS) ? window.PATIENTS.length : 0;
      if (/^BMSH[-\s]*\d{3,9}$/i.test(text)) await fetchPatientByBmhId(text);
      if (digits.length >= 5) await fetchPatientsByPhone(text);
      const after = Array.isArray(window.PATIENTS) ? window.PATIENTS.length : 0;
      if (after !== before && typeof done === 'function') done();
    }, 280);
  }

  async function ensureLookupBeforeRegister() {
    const uid = (document.getElementById('rc-uid')?.textContent || '').trim();
    const mob = (document.getElementById('rc-mob-inp')?.value || document.getElementById('rc-mob')?.value || '').trim();
    const mob2 = (document.getElementById('rc-mob2')?.value || '').trim();
    const jobs = [];
    if (/^BMSH[-\s]*\d{3,9}$/i.test(uid)) jobs.push(fetchPatientByBmhId(uid));
    if (normalizePhoneKey(mob)) jobs.push(fetchPatientsByPhone(mob));
    if (normalizePhoneKey(mob2)) jobs.push(fetchPatientsByPhone(mob2));
    if (jobs.length) await Promise.all(jobs);
  }

  function wrapReceptionFunctions() {
    if (window.__bmhReceptionPatientLookupWrapped) return;
    if (typeof window.registerPatient !== 'function') return;
    window.__bmhReceptionPatientLookupWrapped = true;

    const originalLookupByBMHID = window.lookupByBMHID;
    if (typeof originalLookupByBMHID === 'function') {
      window.lookupByBMHID = function (value) {
        const result = originalLookupByBMHID.apply(this, arguments);
        scheduleLazyLookup(value, 'bmhid', function () { originalLookupByBMHID.call(window, value); });
        return result;
      };
    }

    const originalLookupByPhone = window.lookupByPhone;
    if (typeof originalLookupByPhone === 'function') {
      window.lookupByPhone = function (value) {
        const result = originalLookupByPhone.apply(this, arguments);
        scheduleLazyLookup(value, 'phone-inline', function () { originalLookupByPhone.call(window, value); });
        return result;
      };
    }

    const originalSearchPatientByPhone = window.searchPatientByPhone;
    if (typeof originalSearchPatientByPhone === 'function') {
      window.searchPatientByPhone = function (value) {
        const result = originalSearchPatientByPhone.apply(this, arguments);
        scheduleLazyLookup(value, 'phone-dropdown', function () { originalSearchPatientByPhone.call(window, value); });
        return result;
      };
    }

    const originalRegisterPatient = window.registerPatient;
    window.registerPatient = async function () {
      const forceNew = !!document.getElementById('rc-force-new-bmsh')?.checked;
      if (!forceNew) await ensureLookupBeforeRegister();
      return originalRegisterPatient.apply(this, arguments);
    };
  }

  wrapReceptionFunctions();
  document.addEventListener('DOMContentLoaded', wrapReceptionFunctions);
  setTimeout(wrapReceptionFunctions, 0);
  setTimeout(wrapReceptionFunctions, 1000);
})();
