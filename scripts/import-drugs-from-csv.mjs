// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Bulk import drugs from CSV into Firebase Realtime DB
//
// Usage:
//   node scripts/import-drugs-from-csv.mjs                   # all CSVs in settings/drugs/
//   node scripts/import-drugs-from-csv.mjs path/to/file.csv  # single file
//   DEPT_OVERRIDE=Ophthalmology node scripts/import-drugs-from-csv.mjs
//
// Requires: scripts/serviceAccountKey.json (Firebase Admin SDK credentials)
// ─────────────────────────────────────────────────────────────────────────────

import { createRequire }         from 'module'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { fileURLToPath }         from 'url'
import { dirname, join, resolve } from 'path'

const require        = createRequire(import.meta.url)
const admin          = require('firebase-admin')
const __dir          = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dir, 'serviceAccountKey.json'), 'utf8'))

admin.initializeApp({
  credential:  admin.credential.cert(serviceAccount),
  databaseURL: 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app'
})

const db = admin.database()

// ── helpers ───────────────────────────────────────────────────────────────────
function generateDrugId() {
  return 'dr_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function normalizeDrugType(s) {
  const t = String(s || '').toLowerCase().trim()
  if (!t) return 'Tablet'
  if (t.includes('eye drop') || t.includes('eyedrop') || (t.includes('drop') && !t.includes('tablet'))) return 'Eye Drop'
  if (t.includes('ointment') || t.includes('oint')) return 'Ointment'
  if (t.includes('cream'))  return 'Cream'
  if (t.includes('gel'))    return 'Gel'
  if (t.includes('cap') && !t.includes('eye')) return 'Capsule'
  if (t.includes('inject') || /\binj\b/.test(t) || t.includes('vial')) return 'Injection'
  if (t.includes('syrup') || t.includes('suspension')) return 'Syrup'
  if (t.includes('pessary')) return 'Pessary'
  if (t.includes('tab') || t === 'tablet') return 'Tablet'
  const title = s.trim()
  return title.charAt(0).toUpperCase() + title.slice(1)
}

function parseCsvRow(line) {
  const out = []; let cur = ''; let inQ = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') { if (inQ && line[i+1] === '"') { cur += '"'; i++ } else inQ = !inQ; continue }
    if (ch === ',' && !inQ) { out.push(cur.trim()); cur = ''; continue }
    cur += ch
  }
  out.push(cur.trim())
  return out.map(c => String(c || '').trim().replace(/^"|"$/g, ''))
}

function parseCsvToDrugs(text, deptOverride) {
  const lines = text.split(/\r?\n/).filter(l => l.trim())
  if (lines.length < 2) return []
  const header = parseCsvRow(lines[0]).map(x => x.toLowerCase())
  const idx = pred => header.findIndex(h => pred(h))
  const ti  = idx(h => h.includes('trade') || h.includes('brand') || h === 'name' || h === 'trade name' || h === 'brand name')
  const gi  = idx(h => h.includes('generic') || h === 'generic name' || h === 'salt')
  const ci  = idx(h => h.includes('compan'))
  const tyi = idx(h => h.includes('type') || h.includes('form') || h.includes('category') || h === 'dosage form' || h === 'drug type' || h === 'medicine type')
  const di  = idx(h => h.includes('dept') || h.includes('department') || h.includes('speciality') || h.includes('specialty'))
  const fi  = idx(h => h === 'freq' || h === 'frequency' || h.includes('frequenc'))
  const dui = idx(h => h === 'dur' || h === 'duration')
  const tCol   = ti  >= 0 ? ti  : 0
  const gCol   = gi  >= 0 ? gi  : 1
  const typeCol = tyi >= 0 ? tyi : -1
  const rows = []; const now = Date.now()
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvRow(lines[i])
    const trade   = (cols[tCol] || '').trim()
    const generic = (cols[gCol] || '').trim()
    if (!trade && !generic) continue
    rows.push({
      type:       normalizeDrugType(typeCol >= 0 ? cols[typeCol] : ''),
      trade:      trade || generic,
      generic:    generic || trade,
      freq:       (fi  >= 0 ? cols[fi]  : '') || 'BD',
      dur:        (dui >= 0 ? cols[dui] : '') || '1 Week',
      dept:       deptOverride || (di >= 0 && cols[di] ? cols[di].trim() : 'All'),
      company:    ci  >= 0 ? (cols[ci] || '').trim() : '',
      _id:        generateDrugId(),
      _updatedAt: now + i
    })
  }
  return rows
}

function rowKey(d) {
  return [String(d.trade||'').toLowerCase(), String(d.generic||'').toLowerCase(), String(d.dept||'All').toLowerCase()].join('|')
}

function mergeDrugs(existing, incoming) {
  const byId = {}, byKey = {}, merged = []
  function add(row) {
    if (!row || (!row.trade && !row.generic)) return
    const key = rowKey(row)
    const rowTs = Number(row._updatedAt || 0)
    const rowId = row._id || null
    let ei = rowId && byId[rowId] !== undefined ? byId[rowId] : byKey[key] !== undefined ? byKey[key] : -1
    if (ei >= 0) {
      const cur = merged[ei]
      if (rowTs > Number(cur._updatedAt || 0)) {
        const oldKey = rowKey(cur)
        delete byKey[oldKey]
        byKey[key] = ei
        merged[ei] = { ...row, _id: rowId || cur._id || generateDrugId() }
        if (rowId) byId[rowId] = ei
      }
      return
    }
    const newId = rowId || generateDrugId()
    const idx = merged.length
    merged.push({ ...row, _id: newId })
    byId[newId] = idx
    byKey[key] = idx
  }
  existing.forEach(add)
  incoming.forEach(add)
  return merged
}

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  const csvArg     = process.argv[2]
  const deptOverride = process.env.DEPT_OVERRIDE || ''
  let csvFiles = []

  if (csvArg) {
    const p = resolve(csvArg)
    if (!existsSync(p)) { console.error('File not found:', p); process.exit(1) }
    csvFiles = [p]
  } else {
    const drugsDir = join(__dir, '..', 'settings', 'drugs')
    if (!existsSync(drugsDir)) { console.error('No settings/drugs directory found.'); process.exit(1) }
    csvFiles = readdirSync(drugsDir)
      .filter(f => /\.csv$/i.test(f))
      .map(f => join(drugsDir, f))
  }

  if (!csvFiles.length) { console.log('No CSV files found. Nothing to import.'); process.exit(0) }

  // Load existing library from Firebase
  const snap = await db.ref('drugLibrary').once('value')
  const raw  = snap.val()
  const existing = Array.isArray(raw) ? raw.filter(Boolean)
    : (raw && typeof raw === 'object') ? Object.values(raw).filter(Boolean) : []
  console.log(`Existing drugs in Firebase: ${existing.length}`)

  let incoming = []
  for (const csvPath of csvFiles) {
    const text = readFileSync(csvPath, 'utf8')
    const rows = parseCsvToDrugs(text, deptOverride)
    console.log(`  ${csvPath}: ${rows.length} rows parsed`)
    incoming = incoming.concat(rows)
  }

  const merged = mergeDrugs(existing, incoming)
  const added  = merged.length - existing.length
  console.log(`Merged total: ${merged.length} (${added >= 0 ? '+' : ''}${added} new)`)

  const ts = Date.now()
  await db.ref('drugLibrary').set(merged)
  await db.ref('drugLibraryMeta').set({ updatedAt: ts, importedAt: ts, source: 'csv-import' })

  console.log(`Done. ${merged.length} drugs saved to Firebase RTDB.`)
  process.exit(0)
}

main().catch(err => { console.error(err); process.exit(1) })
