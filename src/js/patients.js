// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Patients Module (CLEAN VERSION)
// ─────────────────────────────────────────────────────────────────────────────

import { db }                         from './firebase.js'
import {
  collection, doc,
  setDoc, updateDoc,
  getDoc,
  query, where, orderBy, limit,
  onSnapshot
}                                     from 'firebase/firestore'
import { showToast, initials, avatarColor, newBmhId } from './utils.js'
import { CURRENT_USER }               from './auth.js'

// ── In-memory cache ──
export let PATIENTS =
  typeof window !== 'undefined' && Array.isArray(window.PATIENTS)
    ? window.PATIENTS
    : []
if (typeof window !== 'undefined') window.PATIENTS = PATIENTS

// ── Helper: Capitalize names properly ──
function formatName(str) {
  if (!str) return '';
  return str.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

// ── Real-time listener ───────────────────────────────────────────────────────
export function watchPatients(centre) {
  const q = query(
    collection(db, 'patients'),
    where('centre', '==', centre),
    orderBy('createdAt', 'desc'),
    limit(2000)
  )

  return onSnapshot(q, snap => {
    PATIENTS.length = 0
    snap.forEach(d => PATIENTS.push({ id: d.id, ...d.data() }))
    window.PATIENTS = PATIENTS
    window.dispatchEvent(new CustomEvent('bmh:patientsUpdated'))

    const uidEl = document.getElementById('rc-uid')
    if (uidEl) {
      uidEl.textContent = newBmhId()
    }

  }, err => {
    console.error('watchPatients error:', err)
    showToast('Error syncing patients with database.', 'e')
  })
}

/** Full document upsert — used by legacy registration (same source of truth as watchPatients). */
export async function upsertPatientFirestore(patient) {
  if (!patient?.bmhId) return
  const centre =
    (CURRENT_USER?.centre === 'RPR' || patient.centre === 'RPR') ? 'RPR' : 'CHD'
  const payload = {
    ...patient,
    centre,
    lastUpdated: new Date().toISOString(),
    updatedBy: CURRENT_USER?.name || 'System',
  }
  await setDoc(doc(db, 'patients', patient.bmhId), payload, { merge: true })
}

// ── Register (create) ────────────────────────────────────────────────────────
export async function registerPatient(data) {
  try {
    if (!data.firstName || data.firstName.trim() === '') {
      showToast('First Name is required.', 'e');
      return null;
    }

    const cleanFirstName = formatName(data.firstName);
    const cleanLastName = formatName(data.lastName);
    const fullName = (cleanFirstName + ' ' + cleanLastName).trim();
    const bmhId = data.bmhId || newBmhId();

    const patient = {
      bmhId,
      name:          fullName,
      initials:      initials(fullName),
      color:         avatarColor(cleanFirstName),
      age:           data.age    || '',
      sex:           data.sex    || 'Male',
      mob:           data.mob    || '',
      mob2:          data.mob2   || '',
      email:         data.email  ? data.email.trim().toLowerCase() : '',
      dob:           data.dob    || '',
      addr:          data.addr   || '',
      dept:          data.dept   || 'ophtho',
      doctor:        data.doctor || '',
      centre:        data.centre || CURRENT_USER?.centre || 'CHD',
      status:        data.preRegistered ? 'pre-registered' : 'waiting',
      balance:       0,
      advance:       0,
      seen:          false,
      dilated:       false,
      preRegistered: !!data.preRegistered,
      createdAt:     new Date().toISOString(),
      createdBy:     CURRENT_USER?.name || 'Reception',
    }

    await setDoc(doc(db, 'patients', bmhId), patient)
    showToast(`Success: ${patient.name} registered!`, 's')
    return patient

  } catch (error) {
    console.error("Error registering patient: ", error);
    showToast('Failed to register patient.', 'e');
    return null;
  }
}

export async function updatePatient(bmhId, updates) {
  try {
    await updateDoc(doc(db, 'patients', bmhId), {
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: CURRENT_USER?.name || ''
    })
  } catch (error) {
    console.error("Error updating patient: ", error);
  }
}

export async function getPatient(bmhId) {
  const snap = await getDoc(doc(db, 'patients', bmhId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export function openPatient(bmhId) {
  const p = PATIENTS.find(x => x.bmhId === bmhId)
  if (!p) return null
  window.CURRENT_PATIENT = p
  return p
}

export function searchPatients(query_) {
  if (!query_) return PATIENTS
  const q = query_.toLowerCase()
  return PATIENTS.filter(p =>
    p.name?.toLowerCase().includes(q) ||
    p.bmhId?.toLowerCase().includes(q) ||
    p.mob?.includes(q)
  )
}
