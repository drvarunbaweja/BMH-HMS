import fs from 'node:fs/promises';
import path from 'node:path';

const DB = 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app';
const APPLY = process.argv.includes('--apply');
const LIMIT_ARG = process.argv.find((arg) => arg.startsWith('--limit='));
const LIMIT = LIMIT_ARG ? Number(LIMIT_ARG.split('=')[1] || 0) : 0;

function dbUrl(ref) {
  return `${DB}/${ref.replace(/^\/+/, '')}.json`;
}

async function readRef(ref) {
  const res = await fetch(dbUrl(ref));
  if (!res.ok) throw new Error(`Read failed ${ref}: ${res.status}`);
  return res.json();
}

async function patchRoot(updates) {
  const res = await fetch(`${DB}/.json`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error(`Patch failed: ${res.status} ${await res.text()}`);
  return res.json();
}

function cleanName(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function phoneKeys(p) {
  return Array.from(new Set([p?.mob, p?.mobile, p?.mob2, p?.altMobile]
    .map((x) => String(x || '').replace(/\D/g, ''))
    .filter((x) => x.length >= 7)
    .map((x) => x.slice(-10))));
}

function isMerged(p) {
  return !!(p && (p.mergedInto || p.inactive || String(p.status || '').toLowerCase() === 'merged'));
}

function bmhNumber(p) {
  const m = String(p?.bmhId || '').match(/^BMSH-(\d{1,9})$/i);
  return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
}

function ageYears(p) {
  const m = String(p?.age || '').match(/\d+/);
  return m ? Number(m[0]) : null;
}

function agesClose(a, b) {
  if (a == null || b == null) return true;
  return Math.abs(Number(a) - Number(b)) <= 2;
}

function pickNewer(a, b) {
  const at = Date.parse(a?.date || a?.createdAt || a?.updatedAt || '') || 0;
  const bt = Date.parse(b?.date || b?.createdAt || b?.updatedAt || '') || 0;
  return bt > at ? b : a;
}

function mergePatient(canonical, duplicate, dupId) {
  const merged = { ...canonical };
  ['mob', 'mob2', 'email', 'dob', 'addr', 'rel', 'dept', 'doctor', 'assignedDoctor', 'centre', 'color', 'purpose', 'refType', 'refName', 'refMobile', 'referredBy'].forEach((key) => {
    if ((!merged[key] || merged[key] === '-') && duplicate[key]) merged[key] = duplicate[key];
  });
  merged.balance = Math.max(Number(merged.balance || 0), Number(duplicate.balance || 0), 0);
  merged.advance = Math.max(Number(merged.advance || 0), Number(duplicate.advance || 0), 0);
  if (!merged.advancePurpose && duplicate.advancePurpose) merged.advancePurpose = duplicate.advancePurpose;
  merged.visitCount = Math.max(Number(merged.visitCount || 0), Number(duplicate.visitCount || 0), 1);
  merged.prevDxByDept = { ...(duplicate.prevDxByDept || {}), ...(merged.prevDxByDept || {}) };
  merged.crossRefs = { ...(duplicate.crossRefs || {}), ...(merged.crossRefs || {}) };
  merged.investigationOrders = [...(duplicate.investigationOrders || []), ...(merged.investigationOrders || [])].filter(Boolean);
  merged.mergedBmhIds = Array.from(new Set([...(merged.mergedBmhIds || []), ...(duplicate.mergedBmhIds || []), dupId].map((x) => String(x || '').trim()).filter(Boolean)));
  const obgMap = new Map();
  [...(merged.obgDxLedger || []), ...(duplicate.obgDxLedger || [])].forEach((x) => {
    if (!x || !String(x.text || '').trim()) return;
    obgMap.set(String(x.text).toLowerCase(), x);
  });
  merged.obgDxLedger = Array.from(obgMap.values());
  if (duplicate.lastVisit) merged.lastVisit = pickNewer(merged.lastVisit || {}, duplicate.lastVisit || {});
  return merged;
}

function uniqueMergePlan(patients) {
  const rows = Object.values(patients || {}).filter((p) => p && p.bmhId && !isMerged(p));
  const groups = new Map();
  rows.forEach((p) => {
    const name = cleanName(p.name || p.patient);
    if (!name) return;
    phoneKeys(p).forEach((phone) => {
      const key = `${name}|${phone}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    });
  });

  const plan = [];
  const alreadyDup = new Set();
  groups.forEach((items) => {
    const unique = Array.from(new Map(items.map((p) => [String(p.bmhId || ''), p])).values());
    if (unique.length < 2) return;
    unique.sort((a, b) => bmhNumber(a) - bmhNumber(b));
    const canonical = unique[0];
    const canonicalAge = ageYears(canonical);
    unique.slice(1).forEach((candidate) => {
      const dupId = String(candidate.bmhId || '');
      if (alreadyDup.has(dupId)) return;
      if (!agesClose(canonicalAge, ageYears(candidate))) return;
      alreadyDup.add(dupId);
      plan.push({ canonicalId: String(canonical.bmhId), duplicateId: dupId });
    });
  });
  return plan;
}

function copyBucket(updates, bucketName, targetId, dupId, targetItems, sourceItems) {
  const existing = { ...(targetItems || {}) };
  Object.entries(sourceItems || {}).forEach(([rawKey, rawValue]) => {
    let nextKey = rawKey;
    while (Object.prototype.hasOwnProperty.call(existing, nextKey)) {
      nextKey = `${rawKey}-merged-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    }
    existing[nextKey] = rawValue;
    updates[`${bucketName}/${targetId}/${nextKey}`] = rawValue;
  });
  updates[`${bucketName}/${dupId}`] = null;
}

async function main() {
  const patients = await readRef('patients');
  const plan = uniqueMergePlan(patients);
  const selected = LIMIT > 0 ? plan.slice(0, LIMIT) : plan;
  console.log(JSON.stringify({ mode: APPLY ? 'apply' : 'dry-run', patients: Object.keys(patients || {}).length, duplicateRecordsToMerge: plan.length, selected: selected.length }, null, 2));
  if (!APPLY) return;

  const backup = { createdAt: new Date().toISOString(), selected, nodes: {} };
  let applied = 0;
  for (const item of selected) {
    const { canonicalId, duplicateId } = item;
    const canonical = patients[canonicalId];
    const duplicate = patients[duplicateId];
    if (!canonical || !duplicate || isMerged(duplicate)) continue;
    const [targetVisits, dupVisits, targetRx, dupRx] = await Promise.all([
      readRef(`visits/${canonicalId}`).catch(() => null),
      readRef(`visits/${duplicateId}`).catch(() => null),
      readRef(`prescriptions/${canonicalId}`).catch(() => null),
      readRef(`prescriptions/${duplicateId}`).catch(() => null)
    ]);
    backup.nodes[canonicalId] = { patient: canonical, visits: targetVisits, prescriptions: targetRx };
    backup.nodes[duplicateId] = { patient: duplicate, visits: dupVisits, prescriptions: dupRx };

    const nowIso = new Date().toISOString();
    const merged = mergePatient(canonical, duplicate, duplicateId);
    merged.lastUpdated = nowIso;
    merged.updatedBy = 'Duplicate Merge Script';
    const duplicatePatch = {
      ...duplicate,
      mergedInto: canonicalId,
      inactive: true,
      queueRemoved: true,
      status: 'merged',
      seen: true,
      lastUpdated: nowIso,
      updatedBy: 'Duplicate Merge Script'
    };
    const updates = {};
    updates[`patients/${canonicalId}`] = merged;
    updates[`patients/${duplicateId}`] = duplicatePatch;
    copyBucket(updates, 'visits', canonicalId, duplicateId, targetVisits, dupVisits);
    copyBucket(updates, 'prescriptions', canonicalId, duplicateId, targetRx, dupRx);
    await patchRoot(updates);
    patients[canonicalId] = merged;
    patients[duplicateId] = duplicatePatch;
    applied += 1;
    if (applied % 25 === 0) console.log(`applied ${applied}/${selected.length}`);
  }

  const backupDir = path.join(process.cwd(), 'tmp');
  await fs.mkdir(backupDir, { recursive: true });
  const backupFile = path.join(backupDir, `duplicate-merge-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  await fs.writeFile(backupFile, JSON.stringify(backup, null, 2));
  console.log(JSON.stringify({ applied, backupFile }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
