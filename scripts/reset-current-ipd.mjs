import { readFileSync, writeFileSync } from 'node:fs'
import { initializeApp, deleteApp } from 'firebase/app'
import { getDatabase, ref, set, update } from 'firebase/database'

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
const resetBy = 'IPD baseline reset 2026-09-11'

async function fetchPath(path) {
  const response = await fetch(`${DATABASE_URL}/${path}.json`)
  if (!response.ok) throw new Error(`Could not read ${path}: HTTP ${response.status}`)
  return (await response.json()) || {}
}

function isActiveIpdAdmission(row) {
  if (!row) return false
  const status = String(row.status || 'admitted').toLowerCase()
  return status !== 'discharged' && !row.dischargedAt && !row.dischargeDate
}

function isActiveIpdOtCase(row) {
  if (!row || row.admitToIpd !== true) return false
  const status = String(row.ipdStatus || row.status || '').toLowerCase()
  return !/discharged|completed|done|cancelled|canceled/.test(status)
    && !row.ipdDischargedAt
    && !row.dischargePrintedAt
}

async function applyInBatches(db, entries, batchSize = 1500) {
  for (let offset = 0; offset < entries.length; offset += batchSize) {
    const patch = Object.fromEntries(entries.slice(offset, offset + batchSize))
    await update(ref(db), patch)
    const completed = Math.min(entries.length, offset + batchSize)
    console.log(`Applied ${completed.toLocaleString('en-IN')} / ${entries.length.toLocaleString('en-IN')} field updates`)
  }
}

async function rollbackFromFile(path) {
  const saved = JSON.parse(readFileSync(path, 'utf8'))
  const entries = Object.entries(saved.rollback || {})
  if (!entries.length) throw new Error('Rollback file contains no field values')
  const app = initializeApp(FIREBASE_CONFIG, `bmh-ipd-rollback-${Date.now()}`)
  try {
    const db = getDatabase(app)
    await applyInBatches(db, entries)
    const restoredAdmissions = Object.entries(await fetchPath('ipdPatients')).filter(([, row]) => isActiveIpdAdmission(row))
    const latestByPatient = new Map()
    restoredAdmissions.forEach(([id, row]) => {
      const key = String(row?.bmhId || id)
      const existing = latestByPatient.get(key)
      const currentTime = Date.parse(row?.admittedAt || row?.admittedDate || '') || 0
      const existingTime = Date.parse(existing?.[1]?.admittedAt || existing?.[1]?.admittedDate || '') || 0
      if (!existing || currentTime >= existingTime) latestByPatient.set(key, [id, row])
    })
    await set(ref(db, 'activeIpdPatients'), null)
    await applyInBatches(db, Array.from(latestByPatient.values()).map(([id, row]) => [`activeIpdPatients/${id}`, row]))
    console.log(`Rollback complete using ${path}`)
  } finally {
    await deleteApp(app)
  }
}

async function buildReset() {
  const [ipdPatients, patients, otCases] = await Promise.all([
    fetchPath('ipdPatients'),
    fetchPath('patients'),
    fetchPath('otCases')
  ])
  const activeAdmissions = Object.entries(ipdPatients).filter(([, row]) => isActiveIpdAdmission(row))
  const activeBmhIds = new Set(activeAdmissions.map(([, row]) => String(row?.bmhId || '')).filter(Boolean))
  const patientRows = Object.entries(patients).filter(([key, row]) => activeBmhIds.has(String(row?.bmhId || key)))
  const activeOtCases = Object.entries(otCases).filter(([, row]) => isActiveIpdOtCase(row) && activeBmhIds.has(String(row?.bmhId || '')))
  const changedAt = new Date().toISOString()
  const changes = {}
  const rollback = {}

  const setField = (path, previous, next) => {
    if (previous === next) return
    rollback[path] = previous === undefined ? null : previous
    changes[path] = next
  }

  activeAdmissions.forEach(([id, row]) => {
    setField(`ipdPatients/${id}/status`, row.status, 'discharged')
    setField(`ipdPatients/${id}/dischargedAt`, row.dischargedAt, changedAt)
    setField(`ipdPatients/${id}/dischargedBy`, row.dischargedBy, resetBy)
  })
  patientRows.forEach(([key, row]) => {
    setField(`patients/${key}/ipdAdmitted`, row.ipdAdmitted, false)
    setField(`patients/${key}/ipdDischargedAt`, row.ipdDischargedAt, changedAt)
    setField(`patients/${key}/ipdDischargedBy`, row.ipdDischargedBy, resetBy)
    if (String(row.status || '').toLowerCase() === 'ipd') setField(`patients/${key}/status`, row.status, 'seen')
  })
  activeOtCases.forEach(([id, row]) => {
    setField(`otCases/${id}/admitToIpd`, row.admitToIpd, false)
    setField(`otCases/${id}/ipdStatus`, row.ipdStatus, 'discharged')
    setField(`otCases/${id}/ipdDischargedAt`, row.ipdDischargedAt, changedAt)
    setField(`otCases/${id}/ipdDischargedBy`, row.ipdDischargedBy, resetBy)
    setField(`otCases/${id}/lastTouchedAt`, row.lastTouchedAt, changedAt)
  })

  return {
    changedAt,
    activeAdmissions: activeAdmissions.length,
    distinctPatients: activeBmhIds.size,
    patientRecords: patientRows.length,
    activeOtCases: activeOtCases.length,
    changes,
    rollback
  }
}

async function main() {
  if (rollbackIndex >= 0) {
    const path = args[rollbackIndex + 1]
    if (!path) throw new Error('Usage: node scripts/reset-current-ipd.mjs --rollback <backup.json>')
    await rollbackFromFile(path)
    return
  }

  const plan = await buildReset()
  console.log(JSON.stringify({
    activeAdmissions: plan.activeAdmissions,
    distinctPatients: plan.distinctPatients,
    patientRecords: plan.patientRecords,
    activeOtCases: plan.activeOtCases,
    fieldUpdates: Object.keys(plan.changes).length
  }, null, 2))
  if (!shouldApply) {
    console.log('Dry run only. Re-run with --apply to perform the reset.')
    return
  }

  const backupPath = `/private/tmp/bmh-ipd-reset-${plan.changedAt.replace(/[:.]/g, '-')}-rollback.json`
  writeFileSync(backupPath, JSON.stringify({
    createdAt: plan.changedAt,
    resetBy,
    rollback: plan.rollback
  }))
  console.log(`Rollback data written before update: ${backupPath}`)

  const app = initializeApp(FIREBASE_CONFIG, `bmh-ipd-reset-${Date.now()}`)
  try {
    await applyInBatches(getDatabase(app), Object.entries(plan.changes))
  } finally {
    await deleteApp(app)
  }

  const remaining = Object.values(await fetchPath('ipdPatients')).filter(isActiveIpdAdmission).length
  if (remaining) throw new Error(`Reset incomplete: ${remaining} active IPD admission records remain`)
  console.log(`Verified: 0 active IPD admissions remain. Rollback: node scripts/reset-current-ipd.mjs --rollback ${backupPath}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
