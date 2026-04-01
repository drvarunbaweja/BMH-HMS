// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Bulk import patients from CSV (Admin SDK)
//
// For large files (50k+ rows) use this instead of the browser UI — avoids tab
// memory limits, timeouts, and client write throttling.
//
//   node scripts/import-patients-from-csv.mjs /path/to/patients.csv
//   CSV_PATH=./data.csv npm run import:csv
//
// Env (optional):
//   CSV_CENTRE=CHD|RPR
//   FORCE_OVERWRITE=true — when checking existing, still write all (see below)
//   MIGRATE_SKIP_EXISTENCE_CHECK=true — force skip read phase
//   CSV_CHECK_EXISTING=true — slow: ~1 read per ID to skip docs already in Firestore (large imports: leave OFF)
//   BULK_INITIAL_OPS / BULK_MAX_OPS — BulkWriter throttle (default 80 / 400 ops/s)
//
// IDs: Third-party UID and clinic id are stored exactly as in the CSV (two fields).
// The single canonical patient key is bmhId (BMSH-…), derived from both so there is
// one internal id without renaming your source values.
// ─────────────────────────────────────────────────────────────────────────────

import { createRequire } from 'module'
import { createHash } from 'node:crypto'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve, isAbsolute, basename } from 'path'

const require        = createRequire(import.meta.url)
const admin          = require('firebase-admin')
const __dir          = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dir, 'serviceAccountKey.json'), 'utf8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
db.settings({ ignoreUndefinedProperties: true })

const FORCE_OVERWRITE = process.env.FORCE_OVERWRITE === 'true'
/** Legacy: force no read phase */
const MIGRATE_SKIP_EXISTENCE = process.env.MIGRATE_SKIP_EXISTENCE_CHECK === 'true'
/** Default false — do not run 50k+ Firestore reads (causes quota/timeouts). Set true only to dedupe. */
const CSV_CHECK_EXISTING = process.env.CSV_CHECK_EXISTING === 'true'
const GETALL_CHUNK = 10
const GETALL_CONCURRENCY = Number(process.env.MIGRATE_GETALL_CONCURRENCY) || 20
const CSV_CENTRE = process.env.CSV_CENTRE || 'CHD'
const BULK_INITIAL_OPS = Number(process.env.BULK_INITIAL_OPS) || 80
const BULK_MAX_OPS = Number(process.env.BULK_MAX_OPS) || 400

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
    // eslint-disable-next-line no-await-in-loop
    await sleep(15)
  }
  return existing
}

function parseCsvRows(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  if (!lines.length) return { headers: [], rows: [] }
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    const cols = []
    let cur = ''
    let inQ = false
    for (const ch of line) {
      if (ch === '"') inQ = !inQ
      else if (ch === ',' && !inQ) {
        cols.push(cur)
        cur = ''
      } else cur += ch
    }
    cols.push(cur)
    const row = {}
    headers.forEach((h, j) => {
      row[h] = (cols[j] || '').trim().replace(/^"|"$/g, '')
    })
    rows.push(row)
  }
  return { headers, rows }
}

/** Exact strings from CSV — column names your export may use. */
function rawThirdPartyUid(row) {
  return String(
    row['Patient UID'] ??
      row['Third Party UID'] ??
      row['PatientUID'] ??
      row.patientUid ??
      row.uid ??
      ''
  ).trim()
}

function rawClinicSpecificId(row) {
  return String(
    row['Clinic Specific Id'] ??
      row['Clinic Specific ID'] ??
      row['Clinic Id'] ??
      row['Clinic ID'] ??
      row.clinicSpecificId ??
      ''
  ).trim()
}

/**
 * One canonical BMSH id for Firestore — stable hash of (thirdPartyUid, clinicSpecificId).
 * Original values are not modified; they are stored separately on the document.
 */
function deriveBmhId(thirdPartyUid, clinicSpecificId, mob, rowIndex) {
  const a = String(thirdPartyUid ?? '').trim()
  const b = String(clinicSpecificId ?? '').trim()
  if (a || b) {
    const h = createHash('sha256').update(JSON.stringify([a, b]), 'utf8').digest('hex')
    return `BMSH-${h.slice(0, 10).toUpperCase()}`
  }
  const digits = String(mob ?? '').replace(/\D/g, '')
  if (digits.length >= 4) {
    const h = createHash('sha256').update(JSON.stringify(['mob', digits]), 'utf8').digest('hex')
    return `BMSH-${h.slice(0, 10).toUpperCase()}`
  }
  const h = createHash('sha256').update(JSON.stringify(['anon', rowIndex, String(mob)]), 'utf8').digest('hex')
  return `BMSH-${h.slice(0, 10).toUpperCase()}`
}

function rowToPatient(row, colorIdx, rowIndex) {
  const thirdPartyUid = rawThirdPartyUid(row)
  const clinicSpecificId = rawClinicSpecificId(row)
  const mob = row.Mobile || row.mob || ''
  const bmhId = deriveBmhId(thirdPartyUid, clinicSpecificId, mob, rowIndex)

  const colors = ['#1A3C6E', '#AF52DE', '#34C759', '#FF9500', '#FF2D55', '#5856D6']
  const name = row.Name || row.name || ''
  const ageMatch = String(row.Age || row.age || '').match(/(\d+)/)
  return {
    bmhId,
    name,
    initials: name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join(''),
    color: colors[colorIdx % colors.length],
    age: ageMatch ? ageMatch[1] : '—',
    sex: row.Sex || row.sex || '',
    mob,
    mob2: row.mob2 || '',
    /** Unchanged from CSV — third-party system patient id */
    thirdPartyUid,
    /** Unchanged from CSV — clinic-specific id */
    clinicSpecificId,
    /** Legacy: same as thirdPartyUid (older screens may read `uid`) */
    uid: thirdPartyUid,
    email: row.Email || row.email || '',
    dob: row.DOB || row.dob || '',
    addr: row.Address || row.addr || '',
    dept: row.dept || 'ophtho',
    doctor: row.doctor || '',
    centre: CSV_CENTRE,
    status: 'inactive',
    balance: 0,
    advance: 0,
    seen: false,
    dilated: false,
    preRegistered: false,
    createdAt: new Date().toISOString(),
    createdBy: 'CSV import',
    leadId: null,
    source: 'csv-import',
    sigHx: row['Significant History'] || '',
    pastHx: row['Past History'] || '',
    allergy: row['Allergy History'] || '',
  }
}

async function batchWritePatients(items) {
  const colName = 'patients'
  if (!items.length) {
    console.log('  [patients] nothing to import')
    return 0
  }

  let toWrite = items
  let skipped = 0

  const shouldCheckExisting =
    CSV_CHECK_EXISTING && !FORCE_OVERWRITE && !MIGRATE_SKIP_EXISTENCE

  if (shouldCheckExisting) {
    // eslint-disable-next-line no-await-in-loop
    const probe = await db.collection(colName).limit(1).get()
    if (probe.empty) {
      console.log(`  [patients] collection is empty — skipping existence checks`)
    } else {
      const ids = items.map((x) => x.id)
      console.log(`  [patients] CSV_CHECK_EXISTING: checking ${ids.length} IDs (parallel reads, slow)...`)
      // eslint-disable-next-line no-await-in-loop
      const existing = await getExistingIdsParallel(colName, ids)
      toWrite = items.filter((x) => {
        if (existing.has(x.id)) {
          skipped++
          return false
        }
        return true
      })
    }
  } else {
    console.log(
      `  [patients] skipping Firestore existence check — writing ${items.length} rows (use CSV_CHECK_EXISTING=true only if you must skip IDs already in DB)`
    )
  }

  if (!toWrite.length) {
    console.log(`  [patients] nothing new to write (${skipped} already present)`)
    return 0
  }

  console.log(
    `  [patients] BulkWriter ${BULK_INITIAL_OPS}–${BULK_MAX_OPS} ops/s — this may take many minutes for large files…`
  )

  const col = db.collection(colName)
  const stamp = () => new Date().toISOString()

  const bulkWriter = db.bulkWriter({
    throttling: {
      initialOpsPerSecond: BULK_INITIAL_OPS,
      maxOpsPerSecond: BULK_MAX_OPS,
    },
  })

  bulkWriter.onWriteError((err) => {
    if (err.failedAttempts < 25) return true
    console.error('  [patients] BulkWriter failed permanently:', err.documentRef?.path, err.message)
    return false
  })

  let queued = 0
  for (const { id, data } of toWrite) {
    bulkWriter.set(col.doc(id), { ...data, _migratedAt: stamp() })
    queued++
    if (queued % 8000 === 0) {
      console.log(`  … queued ${queued} / ${toWrite.length}`)
    }
  }

  await bulkWriter.close()

  console.log(`  [patients] ✓ ${toWrite.length} written, ${skipped} skipped as already present`)
  return toWrite.length
}

/** Resolve CSV path: cwd, next to this script, project root; fixes ./bmh-hms/... mistakes. */
function resolveCsvPath(raw) {
  if (!raw) return null
  const candidates = []
  const push = (p) => {
    if (!p) return
    const n = isAbsolute(p) ? p : resolve(p)
    candidates.push(n)
  }
  push(raw)
  if (!isAbsolute(raw)) {
    push(join(process.cwd(), raw))
    push(join(__dir, raw))
    push(join(__dir, '..', raw))
    // e.g. patients.csv sitting in scripts/ next to this file
    push(join(__dir, basename(raw)))
    // ./bmh-hms/scripts/... while cwd is already the BMH-HMS repo (there is no inner bmh-hms folder)
    const noDot = raw.replace(/^\.\//, '')
    const stripped = noDot.replace(/^bmh-hms\//i, '').replace(/^BMH-HMS\//i, '')
    if (stripped !== noDot) {
      push(join(process.cwd(), stripped))
      push(join(__dir, '..', stripped))
    }
  }
  const seen = new Set()
  for (const p of candidates) {
    if (seen.has(p)) continue
    seen.add(p)
    if (existsSync(p)) return p
  }
  return null
}

async function main() {
  const rawPath = process.argv[2] || process.env.CSV_PATH
  if (!rawPath) {
    console.error('Usage: node scripts/import-patients-from-csv.mjs <file.csv>')
    console.error('   or: CSV_PATH=./file.csv npm run import:csv')
    process.exit(1)
  }

  const csvPath = resolveCsvPath(rawPath)
  if (!csvPath) {
    console.error(`\nCSV not found: "${rawPath}"`)
    console.error('Put patients.csv in the project folder or in scripts/, then from project root run:')
    console.error('  node scripts/import-patients-from-csv.mjs scripts/patients.csv')
    console.error('  node scripts/import-patients-from-csv.mjs ./patients.csv')
    process.exit(1)
  }

  console.log('\nReading CSV:', csvPath)
  const text = readFileSync(csvPath, 'utf8')
  const { headers, rows } = parseCsvRows(text)
  console.log('Columns:', headers.slice(0, 12).join(', '), headers.length > 12 ? '…' : '')
  console.log('Rows:', rows.length, '\n')

  const seenIds = new Set()
  const items = []
  let dupInFile = 0
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const name = row.Name || row.name || ''
    if (!name.trim()) continue
    const data = rowToPatient(row, items.length, i)
    if (seenIds.has(data.bmhId)) {
      dupInFile++
      continue
    }
    seenIds.add(data.bmhId)
    items.push({ id: data.bmhId, data })
  }

  if (dupInFile) console.log(`Note: ${dupInFile} duplicate rows in CSV (same generated bmhId) skipped\n`)

  await batchWritePatients(items)
  console.log('\nDone.\n')
  process.exit(0)
}

main().catch((err) => {
  console.error('\nImport failed:', err)
  process.exit(1)
})
