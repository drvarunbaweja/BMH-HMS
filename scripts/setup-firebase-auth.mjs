// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Firebase Auth User Setup (idempotent — safe to re-run)
//
// Usage:  node scripts/setup-firebase-auth.mjs
//
// Creates/updates a Firebase Auth user for every staff login, with custom
// claims { role, centre, dept, name }. Passwords are read from
// scripts/staff-passwords.local.json (GITIGNORED — never commit it), keyed by
// email, so each account keeps its CURRENT password and staff notice nothing.
//
// Prerequisites:
//   1. npm install firebase-admin        (already in devDependencies if listed)
//   2. scripts/serviceAccountKey.json    (Console → Project Settings → Service Accounts)
//   3. scripts/staff-passwords.local.json
// ─────────────────────────────────────────────────────────────────────────────
import { createRequire } from 'module'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const require = createRequire(import.meta.url)
const admin   = require('firebase-admin')

const __dir = dirname(fileURLToPath(import.meta.url))
const serviceAccount = JSON.parse(readFileSync(join(__dir, 'serviceAccountKey.json'), 'utf8'))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const auth = admin.auth()

const pwFile = join(__dir, 'staff-passwords.local.json')
const passwords = existsSync(pwFile) ? JSON.parse(readFileSync(pwFile, 'utf8')) : {}
if (!Object.keys(passwords).length) {
  console.warn('⚠ scripts/staff-passwords.local.json missing/empty — all accounts get ChangeMe@123')
}

// One entry per staff login used in the app (mirrors legacy USER_DB + BMH_LOGIN_EMAIL_MAP)
const STAFF = [
  { email: 'drvarun@bawejahospital.com',       name: 'Dr. Varun Baweja',   role: 'admin',       centre: 'BOTH', dept: 'ophtho' },
  { email: 'drbaweja@bawejahospital.com',      name: 'Dr. Baweja',         role: 'admin',       centre: 'BOTH', dept: '' },
  { email: 'drvarun.chd@bawejahospital.com',   name: 'Dr. Varun Baweja',   role: 'doctor',      centre: 'CHD',  dept: 'ophtho' },
  { email: 'drvarun.rpr@bawejahospital.com',   name: 'Dr. Varun Baweja',   role: 'doctor',      centre: 'RPR',  dept: 'ophtho' },
  { email: 'drtarun.chd@bawejahospital.com',   name: 'Dr. Tarun Baweja',   role: 'doctor',      centre: 'CHD',  dept: 'psych' },
  { email: 'drtarun.rpr@bawejahospital.com',   name: 'Dr. Tarun Baweja',   role: 'doctor',      centre: 'RPR',  dept: 'psych' },
  { email: 'drgeeta@bawejahospital.com',       name: 'Dr. Geeta Baweja',   role: 'doctor',      centre: 'CHD',  dept: 'obg' },
  { email: 'drnamrata.chd@bawejahospital.com', name: 'Dr. Namrata Baweja', role: 'doctor',      centre: 'CHD',  dept: 'obg' },
  { email: 'drnamrata.rpr@bawejahospital.com', name: 'Dr. Namrata Baweja', role: 'doctor',      centre: 'RPR',  dept: 'obg' },
  { email: 'drpooja.chd@bawejahospital.com',   name: 'Dr. Pooja Baweja',   role: 'doctor',      centre: 'CHD',  dept: 'skin' },
  { email: 'drpooja.rpr@bawejahospital.com',   name: 'Dr. Pooja Baweja',   role: 'doctor',      centre: 'RPR',  dept: 'skin' },
  { email: 'reception.chd@bawejahospital.com', name: 'Reception CHD',      role: 'reception',   centre: 'CHD',  dept: 'reception' },
  { email: 'reception.rpr@bawejahospital.com', name: 'Reception Ropar',    role: 'reception',   centre: 'RPR',  dept: 'reception' },
  { email: 'lab.chd@bawejahospital.com',       name: 'Lab Tech CHD',       role: 'lab',         centre: 'CHD',  dept: 'lab' },
  { email: 'lab.rpr@bawejahospital.com',       name: 'Lab Tech Ropar',     role: 'lab',         centre: 'RPR',  dept: 'lab' },
  { email: 'tpa.chd@bawejahospital.com',       name: 'TPA Executive CHD',  role: 'tpa',         centre: 'CHD',  dept: 'tpa' },
  { email: 'tpa.rpr@bawejahospital.com',       name: 'TPA Executive RPR',  role: 'tpa',         centre: 'RPR',  dept: 'tpa' },
  { email: 'inventory.chd@bawejahospital.com', name: 'Inventory CHD',      role: 'inventory',   centre: 'CHD',  dept: 'inventory' },
  { email: 'inventory.rpr@bawejahospital.com', name: 'Inventory RPR',      role: 'inventory',   centre: 'RPR',  dept: 'inventory' },
  { email: 'optometrist@bawejahospital.com',   name: 'Optometrist RPR',    role: 'optometrist', centre: 'RPR',  dept: 'ophtho' },
  { email: 'opto.rpr@bawejahospital.com',      name: 'Optometrist RPR',    role: 'optometrist', centre: 'RPR',  dept: 'ophtho' },
]

for (const s of STAFF) {
  const password = passwords[s.email] || 'ChangeMe@123'
  const claims = { role: s.role, centre: s.centre, dept: s.dept, name: s.name }
  try {
    const existing = await auth.getUserByEmail(s.email).catch(() => null)
    let user
    if (existing) {
      user = await auth.updateUser(existing.uid, { password, displayName: s.name, disabled: false })
      console.log(`↻ updated  ${s.email}`)
    } else {
      user = await auth.createUser({ email: s.email, password, displayName: s.name, emailVerified: true })
      console.log(`✚ created  ${s.email}`)
    }
    await auth.setCustomUserClaims(user.uid, claims)
  } catch (e) {
    console.error(`✗ FAILED   ${s.email}: ${e.message}`)
  }
}
console.log('\nDone. Staff sign in exactly as before — the app now also gets a Firebase Auth session.')
process.exit(0)
