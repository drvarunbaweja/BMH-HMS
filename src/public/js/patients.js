// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Patients Module
// CRUD for /patients collection. Mirrors old PATIENTS array + openPatient().
// ─────────────────────────────────────────────────────────────────────────────

import { db }                         from './firebase.js'
import {
  collection, doc,
  addDoc, setDoc, updateDoc, deleteDoc,
  getDocs, getDoc,
  query, where, orderBy, limit,
  onSnapshot
}                                     from 'firebase/firestore'
import { showToast, initials, avatarColor, newBmhId } from './utils.js'
import { CURRENT_USER }               from './auth.js'

// ── In-memory cache — MUST share the same array as legacy.js (loaded before this module) ──
export let PATIENTS =
  typeof window !== 'undefined' && Array.isArray(window.PATIENTS)
    ? window.PATIENTS
    : []
if (typeof window !== 'undefined') window.PATIENTS = PATIENTS

// ── Real-time listener ───────────────────────────────────────────────────────
// Call once after login. Keeps PATIENTS in sync with Firestore.
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
  }, err => {
    console.error('watchPatients error:', err)
    // Fallback: Realtime Database (legacy bridge) if Firestore query/listener fails
    if (typeof window.loadPatientsFromFirebase === 'function') {
      try { window.loadPatientsFromFirebase() } catch (e) { console.warn('RTDB patient fallback:', e) }
    }
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
  const bmhId = data.bmhId || newBmhId()
  const patient = {
    bmhId,
    name:          (data.firstName + ' ' + (data.lastName || '')).trim(),
    initials:      initials((data.firstName + ' ' + (data.lastName || '')).trim()),
    color:         avatarColor(data.firstName),
    age:           data.age    || '',
    sex:           data.sex    || 'Male',
    mob:           data.mob    || '',
    mob2:          data.mob2   || '',
    email:         data.email  || '',
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
    // CRM
    leadId:        data.leadId || null,
    source:        data.source || 'walk-in',
  }

  await setDoc(doc(db, 'patients', bmhId), patient)
  showToast(`Patient registered: ${patient.name}`, 's')
  return patient
}

// ── Update ───────────────────────────────────────────────────────────────────
export async function updatePatient(bmhId, updates) {
  await updateDoc(doc(db, 'patients', bmhId), {
    ...updates,
    updatedAt: new Date().toISOString(),
    updatedBy: CURRENT_USER?.name || ''
  })
}

// ── Get one patient ──────────────────────────────────────────────────────────
export async function getPatient(bmhId) {
  const snap = await getDoc(doc(db, 'patients', bmhId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// ── Open patient (navigate to their record) ───────────────────────────────────
export function openPatient(bmhId) {
  const p = PATIENTS.find(x => x.bmhId === bmhId)
  if (!p) { showToast('Patient not found', 'e'); return }
  window.CURRENT_PATIENT = p
  window.dispatchEvent(new CustomEvent('bmh:openPatient', { detail: p }))
  window.nav('patient-detail')
}
window.openPatient = openPatient  // legacy global

// ── Search ───────────────────────────────────────────────────────────────────
export function searchPatients(query_) {
  if (!query_) return PATIENTS
  const q = query_.toLowerCase()
  return PATIENTS.filter(p =>
    p.name?.toLowerCase().includes(q) ||
    p.bmhId?.toLowerCase().includes(q) ||
    p.mob?.includes(q)
  )
}
