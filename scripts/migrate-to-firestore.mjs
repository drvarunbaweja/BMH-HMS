// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Realtime DB → Firestore Migration Script (Admin SDK version)
//
// Uses Firebase Admin SDK so it bypasses all security rules.
// Run ONCE with:  npm run migrate
// ─────────────────────────────────────────────────────────────────────────────

import { createRequire } from 'module'
import { readFileSync }  from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const require        = createRequire(import.meta.url)
const admin          = require('firebase-admin')
const __dir          = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dir, 'serviceAccountKey.json'), 'utf8'))

admin.initializeApp({
  credential:  admin.credential.cert(serviceAccount),
  databaseURL: 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app'
})

const rtdb = admin.database()
const db   = admin.firestore()

const FORCE_OVERWRITE = process.env.FORCE_OVERWRITE === 'true'
/** Skip all existence reads — fastest; only if Firestore is empty or you accept overwrites. */
const SKIP_EXISTENCE_CHECK = process.env.MIGRATE_SKIP_EXISTENCE_CHECK === 'true'
/** Parallel getAll calls per wave (each call = up to 10 doc refs). */
const GETALL_CONCURRENCY = Number(process.env.MIGRATE_GETALL_CONCURRENCY) || 40

/** Firestore allows max 500 ops/batch; stay under for headroom. */
const WRITE_CHUNK = Number(process.env.MIGRATE_WRITE_CHUNK) || 200
/** Pause between successful commits to avoid RESOURCE_EXHAUSTED (ms). */
const PAUSE_MS = Number(process.env.MIGRATE_PAUSE_MS) || 800
/** Max 10 refs per getAll call. */
const GETALL_CHUNK = 10

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function commitChunk(colName, chunk, label) {
  const maxAttempts = 8
  const col = db.collection(colName)
  const stamp = () => new Date().toISOString()

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const batch = db.batch()
    for (const { id, data } of chunk) {
      batch.set(col.doc(id), { ...data, _migratedAt: stamp() })
    }
    try {
      // eslint-disable-next-line no-await-in-loop
      await batch.commit()
      return
    } catch (err) {
      const msg = String(err.message || err)
      const retryable =
        err.code === 8 ||
        err.code === 4 ||
        /RESOURCE_EXHAUSTED|DEADLINE_EXCEEDED|unavailable|429/i.test(msg)
      if (!retryable || attempt >= maxAttempts) throw err
      const wait = Math.min(60_000, 2 ** attempt * 1000)
      console.warn(`  [${label}] commit retry ${attempt}/${maxAttempts} in ${wait}ms — ${msg.slice(0, 120)}`)
      // eslint-disable-next-line no-await-in-loop
      await sleep(wait)
    }
  }
}

/** Parallel existence check — many getAll(10) calls per wave instead of one-by-one. */
async function getExistingIdsParallel(colName, ids) {
  if (!ids.length) return new Set()
  const existing = new Set()
  const col = db.collection(colName)
  const slices = []
  for (let i = 0; i < ids.length; i += GETALL_CHUNK) {
    slices.push(ids.slice(i, i + GETALL_CHUNK))
  }
  for (let i = 0; i < slices.length; i += GETALL_CONCURRENCY) {
    const wave = slices.slice(i, i + GETALL_CONCURRENCY)
    // eslint-disable-next-line no-await-in-loop
    const results = await Promise.all(
      wave.map((slice) => {
        const refs = slice.map((id) => col.doc(id))
        return db.getAll(...refs)
      })
    )
    for (const snaps of results) {
      for (const s of snaps) {
        if (s.exists) existing.add(s.id)
      }
    }
    // tiny breath between waves to reduce 429s on huge collections
    // eslint-disable-next-line no-await-in-loop
    await sleep(15)
  }
  return existing
}

// ── Batch writer (Admin SDK — limit 500 per batch) ───────────────────────────
async function batchWrite(colName, items) {
  if (!items.length) { console.log(`  [${colName}] nothing to migrate`); return 0 }

  let written = 0
  let skipped = 0

  let toWrite = items
  if (!FORCE_OVERWRITE && !SKIP_EXISTENCE_CHECK) {
    // eslint-disable-next-line no-await-in-loop
    const probe = await db.collection(colName).limit(1).get()
    if (probe.empty) {
      console.log(`  [${colName}] collection is empty — skipping ${items.length} existence checks`)
    } else {
      const ids = items.map((x) => x.id)
      console.log(`  [${colName}] checking ${ids.length} docs for existing (parallel reads)...`)
      // eslint-disable-next-line no-await-in-loop
      const existing = await getExistingIdsParallel(colName, ids)
      toWrite = items.filter((x) => {
        if (existing.has(x.id)) { skipped++; return false }
        return true
      })
    }
  } else if (SKIP_EXISTENCE_CHECK && !FORCE_OVERWRITE) {
    console.log(`  [${colName}] MIGRATE_SKIP_EXISTENCE_CHECK — writing all ${items.length} (no read phase)`)
  }

  for (let i = 0; i < toWrite.length; i += WRITE_CHUNK) {
    const chunk = toWrite.slice(i, i + WRITE_CHUNK)
    written += chunk.length
    // eslint-disable-next-line no-await-in-loop
    await commitChunk(colName, chunk, colName)
    // eslint-disable-next-line no-await-in-loop
    await sleep(PAUSE_MS)
  }

  console.log(`  [${colName}] ✓ ${written} written, ${skipped} skipped`)
  return written
}

// ── Reshape helpers ──────────────────────────────────────────────────────────

function reshapePatient(bmhId, p) {
  return {
    bmhId,
    name:          p.name        || '',
    initials:      p.initials    || '',
    color:         p.color       || '#1A3C6E',
    age:           p.age         || '',
    sex:           p.sex         || '',
    mob:           p.mob         || '',
    mob2:          p.mob2        || '',
    email:         p.email       || '',
    dob:           p.dob         || '',
    addr:          p.addr        || '',
    dept:          p.dept        || '',
    doctor:        p.doctor      || '',
    centre:        p.centre      || 'CHD',
    status:        p.status      || 'waiting',
    balance:       p.balance     || 0,
    advance:       p.advance     || 0,
    seen:          p.seen        || false,
    dilated:       p.dilated     || false,
    preRegistered: p.preRegistered || false,
    createdAt:     p.createdAt   || new Date().toISOString(),
    createdBy:     p.createdBy   || 'Migration',
    leadId:        p.leadId      || null,
    source:        p.source      || 'existing',
  }
}

function reshapeTransaction(txnId, t, dateKey) {
  return {
    txnId,
    bmhId:       t.patientId   || t.bmhId  || '',
    patientName: t.patientName || t.name   || '',
    centre:      t.centre      || 'CHD',
    date:        t.date        || dateKey  || '',
    type:        t.type        || 'payment',
    amount:      t.amount      || 0,
    mode:        t.mode        || 'cash',
    description: t.description || t.desc  || '',
    doctorId:    t.doctorId    || '',
    receiptNo:   t.receiptNo   || '',
    createdBy:   t.createdBy   || '',
    createdAt:   t.createdAt   || new Date().toISOString(),
  }
}

function reshapeAppointment(apptId, a) {
  return {
    apptId,
    bmhId:       a.patientId  || a.bmhId  || '',
    patientName: a.patientName|| a.name   || '',
    doctorId:    a.doctorId   || a.doctor || '',
    dept:        a.dept       || '',
    centre:      a.centre     || 'CHD',
    apptDate:    a.date       || a.apptDate || '',
    apptTime:    a.time       || a.apptTime || '',
    status:      a.status     || 'scheduled',
    notes:       a.notes      || '',
    leadId:      a.leadId     || null,
    createdAt:   a.createdAt  || new Date().toISOString(),
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function migrate() {
  console.log('\n══════════════════════════════════════════════')
  console.log('  BMH HMS — Realtime DB → Firestore Migration')
  console.log('══════════════════════════════════════════════\n')

  const snap = await rtdb.ref('/').once('value')
  if (!snap.exists()) { console.error('ERROR: Realtime DB is empty or unreachable.'); process.exit(1) }

  const root = snap.val()
  console.log('Realtime DB keys found:', Object.keys(root).join(', '), '\n')

  let total = 0

  // Patients
  if (root.patients) {
    console.log('Migrating patients...')
    const items = Object.entries(root.patients).map(([id, p]) => ({ id, data: reshapePatient(id, p) }))
    total += await batchWrite('patients', items)
  }

  // Transactions (nested by date key)
  if (root.transactions) {
    console.log('Migrating transactions...')
    const items = []
    for (const [dateKey, txns] of Object.entries(root.transactions)) {
      if (typeof txns !== 'object') continue
      for (const [txnId, t] of Object.entries(txns)) {
        items.push({ id: txnId, data: reshapeTransaction(txnId, t, dateKey) })
      }
    }
    total += await batchWrite('transactions', items)
  }

  // Pay requests
  if (root.payRequests) {
    console.log('Migrating payRequests...')
    const items = Object.entries(root.payRequests).map(([id, r]) => ({
      id, data: { ...r, reqId: id, status: r.status || 'pending', createdAt: r.createdAt || new Date().toISOString() }
    }))
    total += await batchWrite('payRequests', items)
  }

  // Appointments
  if (root.appointments) {
    console.log('Migrating appointments...')
    const items = Object.entries(root.appointments).map(([id, a]) => ({ id, data: reshapeAppointment(id, a) }))
    total += await batchWrite('appointments', items)
  }

  // Drug library
  if (root.drugLibrary || root.drugs) {
    console.log('Migrating drug library...')
    const drugs = root.drugLibrary || root.drugs
    await db.collection('settings').doc('drugs').set({ items: drugs, updatedAt: new Date().toISOString() })
    console.log('  [settings/drugs] ✓')
    total++
  }

  // User settings — STRIP ALL PASSWORDS
  if (root.userSettings) {
    console.log('Migrating user settings (passwords stripped)...')
    const safe = {}
    for (const [uid, u] of Object.entries(root.userSettings)) {
      const { password, pass, pwd, ...rest } = u
      safe[uid] = rest
    }
    await db.collection('settings').doc('users').set({ items: safe, updatedAt: new Date().toISOString() })
    console.log('  [settings/users] ✓ (passwords removed)')
    total++
  }

  // Consent library
  if (root.consentLibrary) {
    console.log('Migrating consent library...')
    const items = Object.entries(root.consentLibrary).map(([id, c]) => ({
      id, data: typeof c === 'string' ? { text: c } : c
    }))
    total += await batchWrite('consentLibrary', items)
  }

  // OT cases
  if (root.otCases) {
    console.log('Migrating OT cases...')
    total += await batchWrite('otCases', Object.entries(root.otCases).map(([id, c]) => ({ id, data: c })))
  }

  // IPD patients
  if (root.ipdPatients) {
    console.log('Migrating IPD patients...')
    total += await batchWrite('ipdPatients', Object.entries(root.ipdPatients).map(([id, p]) => ({ id, data: p })))
  }

  console.log(`\n══════════════════════════════════════════════`)
  console.log(`  ✓ Migration complete — ${total} documents written`)
  console.log(`══════════════════════════════════════════════\n`)
  console.log('Next steps:')
  console.log('  1. Open Firebase Console → Firestore and confirm your data is there')
  console.log('  2. Run: npx firebase deploy --only firestore:rules,firestore:indexes')
  console.log('  3. Push to GitHub to go live\n')

  process.exit(0)
}

migrate().catch(err => {
  console.error('\nMigration failed:', err)
  process.exit(1)
})
