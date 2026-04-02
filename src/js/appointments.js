// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Appointments Module
// ─────────────────────────────────────────────────────────────────────────────

import { db }                   from './firebase.js'
import {
  collection, doc,
  addDoc, updateDoc, deleteDoc,
  query, where, orderBy, onSnapshot
}                               from 'firebase/firestore'
import { showToast }            from './utils.js'
import { CURRENT_USER }         from './auth.js'
import { updateLead }           from './leads.js'

// Share the SAME array as legacy.js — do NOT assign a fresh [] here
export let APPOINTMENTS =
  typeof window !== 'undefined' && Array.isArray(window.APPOINTMENTS)
    ? window.APPOINTMENTS
    : []
if (typeof window !== 'undefined') window.APPOINTMENTS = APPOINTMENTS

// ── Watch today's appointments ────────────────────────────────────────────────
export function watchAppointments(centre, date) {
  const q = query(
    collection(db, 'appointments'),
    where('centre',   '==', centre),
    where('apptDate', '==', date),
    orderBy('apptTime', 'asc')
  )
  return onSnapshot(q, snap => {
    if (snap.empty) return  // Firestore empty — leave RTDB-populated data alone
    APPOINTMENTS.length = 0
    snap.forEach(d => APPOINTMENTS.push({ id: d.id, ...d.data() }))
    window.APPOINTMENTS = APPOINTMENTS
    window.dispatchEvent(new CustomEvent('bmh:appointmentsUpdated'))
  })
}

// ── Book appointment ──────────────────────────────────────────────────────────
export async function bookAppointment(data) {
  // Check for double-booking (same doctor, date, time)
  const clash = APPOINTMENTS.find(a =>
    a.doctorId  === data.doctorId &&
    a.apptDate  === data.apptDate &&
    a.apptTime  === data.apptTime &&
    a.status    !== 'cancelled'
  )
  if (clash) {
    showToast(`Slot already booked for ${data.apptTime}`, 'w')
    return null
  }

  const appt = {
    bmhId:       data.bmhId       || '',
    patientName: data.patientName || '',
    doctorId:    data.doctorId    || '',
    dept:        data.dept        || '',
    centre:      data.centre      || CURRENT_USER?.centre || 'CHD',
    apptDate:    data.apptDate    || '',
    apptTime:    data.apptTime    || '',
    status:      'scheduled',
    notes:       data.notes       || '',
    leadId:      data.leadId      || null,
    createdAt:   new Date().toISOString(),
    createdBy:   CURRENT_USER?.name || '',
  }

  const ref = await addDoc(collection(db, 'appointments'), appt)

  // If this came from a lead, update lead status
  if (data.leadId) {
    await updateLead(data.leadId, { status: 'appointment_booked', apptId: ref.id })
  }

  showToast(`Appointment booked for ${appt.patientName}`, 's')
  return { id: ref.id, ...appt }
}

// ── Update status ─────────────────────────────────────────────────────────────
export async function updateAppointmentStatus(apptId, status) {
  await updateDoc(doc(db, 'appointments', apptId), {
    status,
    updatedAt: new Date().toISOString()
  })
}

// ── Cancel ────────────────────────────────────────────────────────────────────
export async function cancelAppointment(apptId, reason = '') {
  await updateDoc(doc(db, 'appointments', apptId), {
    status:       'cancelled',
    cancelReason: reason,
    cancelledAt:  new Date().toISOString(),
    cancelledBy:  CURRENT_USER?.name || ''
  })
}
