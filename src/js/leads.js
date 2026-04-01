// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — CRM / Lead Management Module
//
// A lead is any enquiry before it becomes a patient.
// Sources: website form, Google Ads, Instagram, WhatsApp, phone call, walk-in,
//          referral doctor, camp, other.
//
// Lead lifecycle:  new → contacted → appointment_booked → converted (patient)
//                                                       → lost
// ─────────────────────────────────────────────────────────────────────────────

import { db }                      from './firebase.js'
import {
  collection, doc,
  addDoc, updateDoc, getDoc,
  query, where, orderBy, onSnapshot,
  serverTimestamp
}                                  from 'firebase/firestore'
import { showToast }               from './utils.js'
import { CURRENT_USER }            from './auth.js'

export const LEAD_SOURCES = [
  'website',
  'google-ads',
  'instagram',
  'facebook',
  'whatsapp',
  'phone-call',
  'walk-in',
  'referral-doctor',
  'camp',
  'existing-patient',
  'other'
]

export const LEAD_STATUSES = ['new', 'contacted', 'appointment_booked', 'converted', 'lost']

// ── In-memory cache ───────────────────────────────────────────────────────────
export let LEADS = []
window.LEADS = LEADS

// ── Real-time listener ────────────────────────────────────────────────────────
export function watchLeads(centre) {
  const q = query(
    collection(db, 'leads'),
    where('centre', '==', centre),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, snap => {
    LEADS.length = 0
    snap.forEach(d => LEADS.push({ id: d.id, ...d.data() }))
    window.LEADS = LEADS
    window.dispatchEvent(new CustomEvent('bmh:leadsUpdated'))
  })
}

// ── Create lead ───────────────────────────────────────────────────────────────
export async function createLead(data) {
  const lead = {
    name:         data.name     || '',
    mob:          data.mob      || '',
    email:        data.email    || '',
    age:          data.age      || '',
    sex:          data.sex      || '',
    centre:       data.centre   || CURRENT_USER?.centre || 'CHD',
    dept:         data.dept     || '',
    source:       data.source   || 'other',
    campaign:     data.campaign || '',   // e.g. "Cataract Camp April 2026"
    notes:        data.notes    || '',
    status:       'new',
    assignedTo:   data.assignedTo || '',
    bmhId:        null,   // filled when converted to patient
    apptId:       null,   // filled when appointment is booked
    createdAt:    new Date().toISOString(),
    createdBy:    CURRENT_USER?.name || 'System',
    followUpDate: data.followUpDate || null,
  }
  const ref = await addDoc(collection(db, 'leads'), lead)
  showToast(`Lead created: ${lead.name}`, 's')
  return { id: ref.id, ...lead }
}

// ── Update lead status / notes ────────────────────────────────────────────────
export async function updateLead(leadId, updates) {
  await updateDoc(doc(db, 'leads', leadId), {
    ...updates,
    updatedAt: new Date().toISOString(),
    updatedBy: CURRENT_USER?.name || ''
  })
}

// ── Convert lead → patient ────────────────────────────────────────────────────
// Call this when the lead registers as a patient.
export async function convertLead(leadId, bmhId) {
  await updateDoc(doc(db, 'leads', leadId), {
    status:      'converted',
    bmhId,
    convertedAt: new Date().toISOString(),
    convertedBy: CURRENT_USER?.name || ''
  })
  showToast('Lead converted to patient ✓', 's')
}

// ── Dashboard stats ───────────────────────────────────────────────────────────
// Returns an object suitable for rendering the admin CRM dashboard.
export function leadStats() {
  const total       = LEADS.length
  const byStatus    = {}
  const bySource    = {}
  const byDept      = {}

  for (const l of LEADS) {
    byStatus[l.status]  = (byStatus[l.status]  || 0) + 1
    bySource[l.source]  = (bySource[l.source]  || 0) + 1
    byDept[l.dept]      = (byDept[l.dept]      || 0) + 1
  }

  const converted      = byStatus['converted'] || 0
  const conversionRate = total ? ((converted / total) * 100).toFixed(1) : '0.0'

  return { total, byStatus, bySource, byDept, conversionRate }
}
