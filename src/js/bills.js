// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Bills Module (Firestore-backed, cloud-persistent)
//
// Each finalized bill is stored as a complete document in Firestore /bills.
// This guarantees bills are visible from every terminal, can be reprinted
// at any time, and survive browser cache clears.
// ─────────────────────────────────────────────────────────────────────────────

import { db }                   from './firebase.js'
import {
  collection, doc,
  addDoc, updateDoc, getDocs,
  query, where, orderBy, limit, onSnapshot
}                               from 'firebase/firestore'
import { CURRENT_USER }         from './auth.js'
import { todayKey }             from './utils.js'

// In-memory cache — populated by watchBills real-time listener
export let BILLS = []
if (typeof window !== 'undefined') window.BILLS = BILLS

// ── Real-time watcher for a centre's recent bills ────────────────────────────
export function watchBills(centre) {
  const q = query(
    collection(db, 'bills'),
    where('centre', '==', centre),
    orderBy('createdAt', 'desc'),
    limit(300)
  )
  return onSnapshot(q, snap => {
    BILLS.length = 0
    snap.forEach(d => BILLS.push({ id: d.id, ...d.data() }))
    window.BILLS = BILLS
    window.dispatchEvent(new CustomEvent('bmh:billsUpdated'))
  }, err => {
    console.warn('BMH bills watcher error:', err)
  })
}

// ── One-time fetch for a specific patient's bills (for history search) ────────
export async function fetchBillsByBmhId(bmhId) {
  if (!bmhId) return []
  // First check in-memory cache
  const cached = (window.BILLS || []).filter(b => b.bmhId === bmhId)
  if (cached.length) return cached.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1)
  // Fall back to Firestore query
  try {
    const q = query(
      collection(db, 'bills'),
      where('bmhId', '==', bmhId),
      orderBy('createdAt', 'desc'),
      limit(50)
    )
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.warn('fetchBillsByBmhId error:', e)
    return []
  }
}

// ── Fetch bills for a date range (admin daily view) ──────────────────────────
export async function fetchBillsByDate(centre, dateFrom, dateTo) {
  try {
    const q = query(
      collection(db, 'bills'),
      where('centre', '==', centre),
      where('date', '>=', dateFrom),
      where('date', '<=', dateTo),
      orderBy('date', 'desc'),
      orderBy('createdAt', 'desc'),
      limit(200)
    )
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.warn('fetchBillsByDate error:', e)
    return []
  }
}

// ── Save a finalized bill to Firestore ───────────────────────────────────────
// Returns the saved bill object with its Firestore id.
export async function saveBill(data) {
  const now = new Date().toISOString()
  const centre = data.centre || CURRENT_USER?.centre || 'CHD'
  const billNo = 'BILL-' + centre + '-' + String(Date.now()).slice(-8)

  const bill = {
    billNo,
    bmhId:          data.bmhId         || '',
    patientName:    data.patientName    || '',
    age:            String(data.age     || ''),
    sex:            data.sex            || '',
    dept:           data.dept           || '',
    doctor:         data.doctor         || '',
    mobile:         data.mobile         || '',
    centre,
    date:           data.date           || todayKey(),

    // Line items — array of { desc, qty, rate, amount, cat }
    items:          (data.items || []).map(item => ({
      desc:   String(item.desc   || ''),
      qty:    Number(item.qty)   || 1,
      rate:   Number(item.rate)  || 0,
      amount: Number(item.amount)|| 0,
      cat:    item.cat           || 'other',
    })),

    // Financials
    subtotal:       Number(data.subtotal)       || 0,
    discount:       Number(data.discount)       || 0,
    discountReason: data.discountReason         || '',
    advanceApplied: Number(data.advanceApplied) || 0,
    netPayable:     Number(data.netPayable)     || 0,

    // Payment received from patient (cash/UPI/card portion)
    paymentMode:    data.paymentMode    || 'Cash',
    amountReceived: Number(data.amountReceived) || 0,
    paymentRef:     data.paymentRef     || '',

    // TPA / Cashless fields
    isTPA:          !!data.isTPA,
    tpaAmount:      Number(data.tpaAmount)   || 0,
    tpaCompany:     data.tpaCompany          || '',
    tpaPolicy:      data.tpaPolicy           || '',
    patientPays:    Number(data.patientPays) || 0,   // patient's cash share

    // Status
    status:     'finalized',
    printCount: 0,

    // Audit
    createdAt:  now,
    createdBy:  CURRENT_USER?.name || '',
  }

  const ref = await addDoc(collection(db, 'bills'), bill)
  const saved = { id: ref.id, ...bill }

  // Optimistic cache update so it appears instantly in this session
  if (!window.BILLS) window.BILLS = []
  window.BILLS.unshift(saved)

  return saved
}

// ── Void a bill (admin only) ─────────────────────────────────────────────────
export async function voidBill(billId, reason) {
  await updateDoc(doc(db, 'bills', billId), {
    status:    'void',
    voidReason: reason || '',
    voidedBy:  CURRENT_USER?.name || '',
    voidedAt:  new Date().toISOString(),
  })
  // Update cache
  const cached = (window.BILLS || []).find(b => b.id === billId)
  if (cached) { cached.status = 'void'; cached.voidReason = reason || '' }
}

// ── Increment print count (best-effort, non-blocking) ────────────────────────
export function incrementBillPrintCount(billId) {
  const cached = (window.BILLS || []).find(b => b.id === billId)
  const next = (cached?.printCount || 0) + 1
  if (cached) cached.printCount = next
  updateDoc(doc(db, 'bills', billId), { printCount: next }).catch(() => {})
}
