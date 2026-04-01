// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — CSV/TSV Batch Import  (tab-separated export support)
//
// Reads scripts/patients.csv (or .tsv) and imports in daily batches of 18,000.
//
//   Day 1  → node scripts/migrate-batch.mjs 1
//   Day 2  → node scripts/migrate-batch.mjs 2
//   Day 3  → node scripts/migrate-batch.mjs 3
//   Status → node scripts/migrate-batch.mjs status
//
// Columns expected (tab-separated):
//   Name, Age, Sex, DOB, Parent Name, Mobile, Email, Address,
//   Patient UID, Clinic Specific Id, Significant History, Past History,
//   Surgeon Notes, Allergy History, Delivery Notes, Feeding History,
//   Family History, Social History, Foot Notes, Patient Medical History
// ─────────────────────────────────────────────────────────────────────────────

import { createRequire } from 'module'
import { createHash }    from 'crypto'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const require        = createRequire(import.meta.url)
const admin          = require('firebase-admin')
const __dir          = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dir, 'serviceAccountKey.json'), 'utf8'))

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

const BATCH_SIZE = 18000
const CHUNK_SIZE = 200
const PAUSE_MS   = 1200

// ── Default centre for imported patients ─────────────────────────────────────
// Change to 'RPR' if importing Ropar patients separately.
const DEFAULT_CENTRE = process.env.CENTRE || 'CHD'

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ── Parse CSV or TSV (auto-detects delimiter) ─────────────────────────────────
function parseFile(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')
  const firstLine = lines[0]

  // Auto-detect: if the header line has tabs, treat as TSV
  const delim = firstLine.includes('\t') ? '\t' : ','

  const headers = firstLine.split(delim).map(h => h.trim().replace(/^"|"$/g, ''))
  const rows = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue

    let cols
    if (delim === '\t') {
      // TSV — just split on tab, no quote handling needed
      cols = line.split('\t').map(c => c.trim())
    } else {
      // CSV — handle quoted fields that may contain commas
      cols = []
      let cur = '', inQuote = false
      for (const ch of line) {
        if (ch === '"') { inQuote = !inQuote }
        else if (ch === ',' && !inQuote) { cols.push(cur.trim()); cur = '' }
        else cur += ch
      }
      cols.push(cur.trim())
    }

    const row = {}
    headers.forEach((h, j) => {
      row[h] = (cols[j] || '').replace(/^"|"$/g, '').trim()
    })
    rows.push(row)
  }

  return { headers, rows, delim }
}

// ── Generate a stable BMH ID from Patient UID + Clinic Specific Id ───────────
// Same row always produces the same ID, so re-running never creates duplicates.
function generateBmhId(row, rowIndex) {
  const uid      = (row['Patient UID']       || '').trim()
  const clinicId = (row['Clinic Specific Id'] || '').trim()
  const mobile   = (row['Mobile']            || '').replace(/\D/g, '')

  if (uid || clinicId) {
    const hash = createHash('sha256').update(JSON.stringify([uid, clinicId])).digest('hex')
    return 'BMSH-' + hash.slice(0, 10).toUpperCase()
  }
  if (mobile.length >= 6) {
    const hash = createHash('sha256').update(JSON.stringify(['mob', mobile])).digest('hex')
    return 'BMSH-' + hash.slice(0, 10).toUpperCase()
  }
  // Last resort — hash the name + row index
  const name = (row['Name'] || '').trim()
  const hash = createHash('sha256').update(JSON.stringify(['anon', name, rowIndex])).digest('hex')
  return 'BMSH-' + hash.slice(0, 10).toUpperCase()
}

// ── Map one CSV row → Firestore patient document ──────────────────────────────
function rowToPatient(row, rowIndex) {
  const bmhId = generateBmhId(row, rowIndex)
  const name  = (row['Name'] || '').trim()
  const words = name.split(' ').filter(Boolean)
  const initials = words.slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('')

  const colors = ['#1A3C6E','#0B7B8C','#FF2D55','#AF52DE','#34C759','#FF9500','#5856D6','#FF3B30']
  const color  = colors[rowIndex % colors.length]

  return {
    // ── Core demographics ──────────────────────────────────────────────────
    bmhId,
    name,
    initials,
    color,
    age:           row['Age']          || '',
    sex:           row['Sex']          || '',
    dob:           row['DOB']          || '',
    mob:           row['Mobile']       || '',
    mob2:          '',
    email:         row['Email']        || '',
    addr:          row['Address']      || '',
    parentName:    row['Parent Name']  || '',

    // ── Original IDs from old system (kept for reference) ─────────────────
    patientUid:    row['Patient UID']        || '',
    clinicId:      row['Clinic Specific Id'] || '',

    // ── Medical history ───────────────────────────────────────────────────
    sigHx:         row['Significant History']    || '',
    pastHx:        row['Past History']           || '',
    surgeonNotes:  row['Surgeon Notes']          || '',
    allergy:       row['Allergy History']        || '',
    deliveryNotes: row['Delivery Notes']         || '',
    feedingHx:     row['Feeding History']        || '',
    familyHx:      row['Family History']         || '',
    socialHx:      row['Social History']         || '',
    footNotes:     row['Foot Notes']             || '',
    medicalHx:     row['Patient Medical History']|| '',

    // ── HMS fields (defaulted for imported patients) ───────────────────────
    dept:          '',
    doctor:        '',
    centre:        DEFAULT_CENTRE,
    status:        'inactive',
    balance:       0,
    advance:       0,
    seen:          false,
    dilated:       false,
    preRegistered: false,
    createdAt:     new Date().toISOString(),
    createdBy:     'CSV import',
    source:        'existing',
    leadId:        null,
  }
}

// ── Write one commit batch with exponential-backoff retry ────────────────────
async function commitWithRetry(batch, label) {
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      await batch.commit()
      return
    } catch (err) {
      const retryable = err.code === 8 || err.code === 4 ||
        /RESOURCE_EXHAUSTED|DEADLINE_EXCEEDED|unavailable|429/i.test(err.message || '')
      if (!retryable || attempt === 6) throw err
      const wait = Math.min(60000, 2 ** attempt * 1500)
      console.log(`\n  ⏳ Quota hit — waiting ${wait / 1000}s before retry ${attempt}/6…`)
      await sleep(wait)
    }
  }
}

// ── Status command ────────────────────────────────────────────────────────────
async function showStatus() {
  // Count total rows in CSV
  const csvPath = existsSync(join(__dir, 'patients.csv'))
    ? join(__dir, 'patients.csv')
    : existsSync(join(__dir, 'patients.tsv'))
      ? join(__dir, 'patients.tsv') : null

  let csvTotal = 0
  if (csvPath) {
    const { rows } = parseFile(readFileSync(csvPath, 'utf8'))
    csvTotal = rows.filter(r => (r['Name'] || '').trim()).length
  }

  // Count docs in Firestore (uses count aggregation — no quota cost)
  const snap = await db.collection('patients').count().get()
  const inFirestore = snap.data().count

  const pct     = csvTotal ? Math.round((inFirestore / csvTotal) * 100) : 0
  const filled  = Math.round(pct / 5)   // 20-char bar
  const bar     = '█'.repeat(filled) + '░'.repeat(20 - filled)
  const batchDone = Math.floor(inFirestore / BATCH_SIZE)
  const nextBatch = Math.min(batchDone + 1, 3)

  console.log('\n══════════════════════════════════════════════════════')
  console.log('  BMH HMS — Migration Status')
  console.log('══════════════════════════════════════════════════════\n')
  if (csvTotal) {
    console.log(`  CSV total      : ${csvTotal.toLocaleString('en-IN')} patients`)
  }
  console.log(`  In Firestore   : ${inFirestore.toLocaleString('en-IN')} patients`)
  if (csvTotal) {
    console.log(`  Progress       : [${bar}] ${pct}%`)
    console.log(`\n  Day 1 (rows 1–18,000)        : ${inFirestore >= 18000 ? '✓ Done' : inFirestore > 0 ? `⏳ In progress (${inFirestore.toLocaleString('en-IN')} uploaded)` : '⬜ Not started'}`)
    console.log(`  Day 2 (rows 18,001–36,000)   : ${inFirestore >= 36000 ? '✓ Done' : inFirestore >= 18000 ? `⏳ In progress (${(inFirestore - 18000).toLocaleString('en-IN')} of 18,000 uploaded)` : '⬜ Not started'}`)
    console.log(`  Day 3 (rows 36,001–${csvTotal.toLocaleString('en-IN')})  : ${inFirestore >= csvTotal ? '✓ Done' : inFirestore >= 36000 ? `⏳ In progress (${(inFirestore - 36000).toLocaleString('en-IN')} uploaded)` : '⬜ Not started'}`)
    if (inFirestore < csvTotal) {
      console.log(`\n  Next command   : node scripts/migrate-batch.mjs ${nextBatch}`)
    } else {
      console.log('\n  ✅ All patients imported!')
    }
  }
  console.log('\n══════════════════════════════════════════════════════\n')
  process.exit(0)
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const arg = process.argv[2]

  if (arg === 'status') { await showStatus(); return }

  const batchNum = parseInt(arg)
  if (![1, 2, 3].includes(batchNum)) {
    console.error('\nUsage:')
    console.error('  Day 1:   node scripts/migrate-batch.mjs 1')
    console.error('  Day 2:   node scripts/migrate-batch.mjs 2')
    console.error('  Day 3:   node scripts/migrate-batch.mjs 3')
    console.error('  Status:  node scripts/migrate-batch.mjs status\n')
    process.exit(1)
  }

  // ── Find the CSV/TSV file ─────────────────────────────────────────────────
  const csvPath = existsSync(join(__dir, 'patients.csv'))
    ? join(__dir, 'patients.csv')
    : existsSync(join(__dir, 'patients.tsv'))
      ? join(__dir, 'patients.tsv')
      : null

  if (!csvPath) {
    console.error('\n❌  File not found.')
    console.error('    Put your file here:  BMH-HMS/scripts/patients.csv')
    console.error('    Then run again.\n')
    process.exit(1)
  }

  const { headers, rows, delim } = parseFile(readFileSync(csvPath, 'utf8'))
  const totalRows = rows.filter(r => (r['Name'] || '').trim()).length
  const validRows = rows.filter(r => (r['Name'] || '').trim())

  // ── Print file summary ────────────────────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════════')
  console.log(`  BMH HMS — Patient Import  |  Batch ${batchNum} of 3`)
  console.log('══════════════════════════════════════════════════════')
  console.log(`\n  File        : ${csvPath.split('/').pop()}`)
  console.log(`  Format      : ${delim === '\t' ? 'TSV (tab-separated)' : 'CSV (comma-separated)'}`)
  console.log(`  Columns     : ${headers.length}  →  ${headers.slice(0, 5).join(', ')}…`)
  console.log(`  Total rows  : ${totalRows}`)
  console.log(`  Centre      : ${DEFAULT_CENTRE}  (set env CENTRE=RPR to change)`)

  // ── Slice for this batch ──────────────────────────────────────────────────
  const start = (batchNum - 1) * BATCH_SIZE
  const end   = Math.min(start + BATCH_SIZE, totalRows)

  if (start >= totalRows) {
    console.log(`\n  ✓ All ${totalRows} rows already covered by previous batches.\n`)
    process.exit(0)
  }

  const slice = validRows.slice(start, end)
  console.log(`\n  This batch  : rows ${start + 1} – ${end}  (${slice.length} patients)`)
  console.log(`  Writing to Firestore (Chandigarh centre)...\n`)

  // ── Write to Firestore ────────────────────────────────────────────────────
  const col     = db.collection('patients')
  let   written = 0

  for (let i = 0; i < slice.length; i += CHUNK_SIZE) {
    const chunk = slice.slice(i, i + CHUNK_SIZE)
    const batch = db.batch()

    chunk.forEach((row, offset) => {
      const patient = rowToPatient(row, start + i + offset)
      batch.set(col.doc(patient.bmhId), patient)
    })

    await commitWithRetry(batch, `chunk ${Math.floor(i / CHUNK_SIZE) + 1}`)
    written += chunk.length
    process.stdout.write(`\r  Progress: ${written} / ${slice.length} patients written…`)
    await sleep(PAUSE_MS)
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  const remaining = totalRows - end
  console.log(`\n\n══════════════════════════════════════════════════════`)
  console.log(`  ✓ Batch ${batchNum} done — ${written} patients imported`)

  if (remaining > 0) {
    console.log(`\n  ${remaining} patients remaining.`)
    console.log(`  Tomorrow run:  node scripts/migrate-batch.mjs ${batchNum + 1}`)
  } else {
    console.log('\n  All patients from the CSV have been imported!')
  }
  console.log('══════════════════════════════════════════════════════\n')

  process.exit(0)
}

main().catch(err => {
  console.error('\n❌  Import failed:', err.message || err)
  process.exit(1)
})
