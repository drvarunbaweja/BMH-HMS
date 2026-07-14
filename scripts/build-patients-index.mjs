// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Build/refresh the slim patientsIndex from the full patients node
//
// Usage:  node scripts/build-patients-index.mjs
// Safe to re-run anytime (idempotent). Never modifies the `patients` node.
//
// Note: the app can also self-build the index the first time an ADMIN logs in
// after this release — this script is the explicit/CI alternative.
//
// Prerequisite: scripts/serviceAccountKey.json (gitignored)
// ─────────────────────────────────────────────────────────────────────────────
import { createRequire } from 'module'
import { readFileSync }  from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const require = createRequire(import.meta.url)
const admin   = require('firebase-admin')

const __dir = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dir, 'serviceAccountKey.json'), 'utf8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app',
})
const db = admin.database()

const safeKey = id => String(id || '').replace(/[.#$/\[\]]/g, '_')
const entryFromPatient = p => {
  const e = {
    n: p.name || p.patient || '', m: p.mob || p.mobile || '', m2: p.mob2 || p.altMobile || '',
    a: p.age || '', s: p.sex || '', d: p.dept || '', c: p.centre || '',
    dr: p.doctor || p.assignedDoctor || '', vc: Number(p.visitCount || 1),
    qd: p.queueDate || '', vd: p.visitDate || '', st: p.status || '',
    ca: p.createdAt || p.registeredAt || '', db: p.dob || '', r: p.rel || '',
    u: Date.now(),
  }
  if (p.mergedInto) e.mg = String(p.mergedInto)
  if (p.inactive) e.ia = true
  return e
}

console.log('Reading patients node…')
const snap = await db.ref('patients').once('value')
const patients = snap.val() || {}
const ids = Object.keys(patients)
console.log(`Found ${ids.length} patients. Building index…`)

let batch = {}
let count = 0
for (const id of ids) {
  const p = patients[id]
  if (!p || typeof p !== 'object') continue
  batch[safeKey(p.bmhId || id)] = entryFromPatient(p)
  count += 1
  if (count % 1000 === 0) {
    await db.ref('patientsIndex').update(batch)
    batch = {}
    process.stdout.write(`  ${count}/${ids.length}\r`)
  }
}
if (Object.keys(batch).length) await db.ref('patientsIndex').update(batch)
console.log(`\n✅ patientsIndex written: ${count} entries`)
process.exit(0)
