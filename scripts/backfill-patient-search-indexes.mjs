import { readFileSync, writeFileSync } from 'node:fs'
import { initializeApp, deleteApp } from 'firebase/app'
import { getDatabase, ref, update } from 'firebase/database'

const DATABASE_URL = 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app'
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDl8RD0l5yy3YjWJWXhdKetDPnFSa37IVQ',
  authDomain: 'bmh-hms.firebaseapp.com',
  databaseURL: DATABASE_URL,
  projectId: 'bmh-hms',
  appId: '1:675093131811:web:669ea0eafd0a27bc73f796'
}
const args = process.argv.slice(2)
const shouldApply = args.includes('--apply')
const rollbackIndex = args.indexOf('--rollback')

async function fetchPatients() {
  const response = await fetch(`${DATABASE_URL}/patients.json`)
  if (!response.ok) throw new Error(`Could not read patients: HTTP ${response.status}`)
  return (await response.json()) || {}
}

function normalizeName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '').slice(-10)
}

async function applyInBatches(entries, label) {
  const app = initializeApp(FIREBASE_CONFIG, `bmh-patient-search-${Date.now()}`)
  try {
    const db = getDatabase(app)
    for (let offset = 0; offset < entries.length; offset += 1500) {
      const batch = Object.fromEntries(entries.slice(offset, offset + 1500))
      await update(ref(db), batch)
      console.log(`${label}: ${Math.min(entries.length, offset + 1500).toLocaleString('en-IN')} / ${entries.length.toLocaleString('en-IN')}`)
    }
  } finally {
    await deleteApp(app)
  }
}

async function rollback(path) {
  const saved = JSON.parse(readFileSync(path, 'utf8'))
  const entries = Object.entries(saved.rollback || {})
  if (!entries.length) throw new Error('Rollback file contains no changes')
  await applyInBatches(entries, 'Rolled back')
}

async function main() {
  if (rollbackIndex >= 0) {
    const path = args[rollbackIndex + 1]
    if (!path) throw new Error('Usage: node scripts/backfill-patient-search-indexes.mjs --rollback <backup.json>')
    await rollback(path)
    return
  }

  const patients = await fetchPatients()
  const changes = {}
  const rollbackValues = {}
  let names = 0
  let phones = 0
  Object.entries(patients).forEach(([id, row]) => {
    if (!row || typeof row !== 'object') return
    const nameSearch = normalizeName(row.name || row.patient)
    const phoneSearch = normalizePhone(row.mob || row.mobile || row.phone)
    if (nameSearch && row.nameSearch !== nameSearch) {
      changes[`patients/${id}/nameSearch`] = nameSearch
      rollbackValues[`patients/${id}/nameSearch`] = row.nameSearch === undefined ? null : row.nameSearch
      names += 1
    }
    if (phoneSearch && row.phoneSearch !== phoneSearch) {
      changes[`patients/${id}/phoneSearch`] = phoneSearch
      rollbackValues[`patients/${id}/phoneSearch`] = row.phoneSearch === undefined ? null : row.phoneSearch
      phones += 1
    }
  })
  console.log(JSON.stringify({ patients: Object.keys(patients).length, nameSearchUpdates: names, phoneSearchUpdates: phones, fieldUpdates: Object.keys(changes).length }, null, 2))
  if (!shouldApply || !Object.keys(changes).length) {
    console.log(shouldApply ? 'No updates required.' : 'Dry run only. Re-run with --apply to write the indexes.')
    return
  }

  const createdAt = new Date().toISOString()
  const backupPath = `/private/tmp/bmh-patient-search-${createdAt.replace(/[:.]/g, '-')}-rollback.json`
  writeFileSync(backupPath, JSON.stringify({ createdAt, rollback: rollbackValues }))
  console.log(`Rollback data written before update: ${backupPath}`)
  await applyInBatches(Object.entries(changes), 'Applied')

  const remaining = Object.values(await fetchPatients()).filter((row) => {
    const expectedName = normalizeName(row?.name || row?.patient)
    const expectedPhone = normalizePhone(row?.mob || row?.mobile || row?.phone)
    return (expectedName && row?.nameSearch !== expectedName) || (expectedPhone && row?.phoneSearch !== expectedPhone)
  }).length
  if (remaining) throw new Error(`Backfill incomplete: ${remaining} patient records still need search keys`)
  console.log(`Verified: all eligible patients have search keys. Rollback: node scripts/backfill-patient-search-indexes.mjs --rollback ${backupPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
