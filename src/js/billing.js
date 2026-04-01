// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Billing & Transactions Module
// ─────────────────────────────────────────────────────────────────────────────

import { db }                   from './firebase.js'
import {
  collection, doc,
  addDoc, updateDoc, deleteDoc,
  query, where, orderBy, onSnapshot, getDocs
}                               from 'firebase/firestore'
import { showToast, todayKey }  from './utils.js'
import { CURRENT_USER }         from './auth.js'
import { updatePatient }        from './patients.js'

export let TRANSACTIONS  = []
export let PAY_REQUESTS  = []
window.TRANSACTIONS = TRANSACTIONS
window.PAY_REQUESTS = PAY_REQUESTS

// ── Watch today's transactions ────────────────────────────────────────────────
export function watchTransactions(centre, date) {
  const q = query(
    collection(db, 'transactions'),
    where('centre', '==', centre),
    where('date',   '==', date),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, snap => {
    TRANSACTIONS.length = 0
    snap.forEach(d => TRANSACTIONS.push({ id: d.id, ...d.data() }))
    window.TRANSACTIONS = TRANSACTIONS
    window.dispatchEvent(new CustomEvent('bmh:transactionsUpdated'))
  })
}

// ── Watch pending pay-requests ────────────────────────────────────────────────
export function watchPayRequests(centre) {
  const q = query(
    collection(db, 'payRequests'),
    where('centre', '==', centre),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, snap => {
    PAY_REQUESTS.length = 0
    snap.forEach(d => PAY_REQUESTS.push({ id: d.id, ...d.data() }))
    window.PAY_REQUESTS = PAY_REQUESTS
    window.dispatchEvent(new CustomEvent('bmh:payRequestsUpdated'))
  })
}

// ── Add transaction ───────────────────────────────────────────────────────────
export async function addTransaction(data) {
  const txn = {
    bmhId:       data.bmhId       || '',
    patientName: data.patientName || '',
    centre:      data.centre      || CURRENT_USER?.centre || 'CHD',
    date:        data.date        || todayKey(),
    type:        data.type        || 'payment',   // payment | advance | refund | writeoff
    amount:      Number(data.amount) || 0,
    mode:        data.mode        || 'cash',       // cash | card | upi | insurance
    description: data.description || '',
    doctorId:    data.doctorId    || '',
    receiptNo:   data.receiptNo   || '',
    createdAt:   new Date().toISOString(),
    createdBy:   CURRENT_USER?.name || '',
  }
  const ref = await addDoc(collection(db, 'transactions'), txn)

  // Update patient balance
  if (data.bmhId) {
    const delta = txn.type === 'refund' ? -txn.amount : txn.amount
    await updatePatient(data.bmhId, { balance: (data.currentBalance || 0) + delta })
  }

  showToast(`Payment recorded: ₹${txn.amount.toLocaleString('en-IN')}`, 's')
  return { id: ref.id, ...txn }
}

// ── Daily collection summary ──────────────────────────────────────────────────
export function dailySummary() {
  const cash = TRANSACTIONS.filter(t => t.mode === 'cash' && t.type !== 'refund')
    .reduce((s, t) => s + (t.amount || 0), 0)
  const upi  = TRANSACTIONS.filter(t => t.mode === 'upi'  && t.type !== 'refund')
    .reduce((s, t) => s + (t.amount || 0), 0)
  const card = TRANSACTIONS.filter(t => t.mode === 'card' && t.type !== 'refund')
    .reduce((s, t) => s + (t.amount || 0), 0)
  const total = cash + upi + card
  return { cash, upi, card, total }
}
