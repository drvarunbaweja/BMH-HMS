// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Firebase Auth User Setup Script
//
// Run ONCE with:  node scripts/setup-firebase-auth.mjs
//
// PREREQUISITES:
//   1. Install Firebase Admin SDK:  npm install firebase-admin
//   2. Download a service account key from:
//      Firebase Console → Project Settings → Service Accounts → Generate new private key
//   3. Save it as:  scripts/serviceAccountKey.json
//      (this file is in .gitignore — never commit it)
//
// What it does:
//   Creates Firebase Auth users for every staff member.
//   Sets custom claims: { role, centre, dept, name }
//   Passwords can be changed by each user after first login.
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
  credential: admin.credential.cert(serviceAccount)
})

const auth = admin.auth()

// ── Staff roster ─────────────────────────────────────────────────────────────
// Format: { email, password (temp), displayName, role, centre, dept }
// Staff MUST change their password on first login.
const STAFF = [
  // ── Admins ──────────────────────────────────────────────────────────────
  { email: 'drvarun@bawejahospital.com',    password: 'ChangeMe@123', displayName: 'Dr. Varun Baweja',    role: 'admin',       centre: 'BOTH', dept: 'ophtho'    },
  { email: 'drbaweja@bawejahospital.com',   password: 'ChangeMe@123', displayName: 'Dr. Baweja',          role: 'admin',       centre: 'BOTH', dept: ''          },

  // ── Doctors ─────────────────────────────────────────────────────────────
  { email: 'drgeeta@bawejahospital.com',    password: 'ChangeMe@123', displayName: 'Dr. Geeta Baweja',    role: 'doctor',      centre: 'CHD',  dept: 'obg'       },
  { email: 'drnamrata@bawejahospital.com',  password: 'ChangeMe@123', displayName: 'Dr. Namrata Baweja',  role: 'doctor',      centre: 'RPR',  dept: 'obg'       },
  { email: 'drtarun@bawejahospital.com',    password: 'ChangeMe@123', displayName: 'Dr. Tarun Baweja',    role: 'doctor',      centre: 'BOTH', dept: 'psych'     },
  { email: 'drpooja@bawejahospital.com',    password: 'ChangeMe@123', displayName: 'Dr. Pooja Baweja',    role: 'doctor',      centre: 'BOTH', dept: 'skin'      },

  // ── Reception ────────────────────────────────────────────────────────────
  { email: 'reception.chd@bawejahospital.com', password: 'ChangeMe@123', displayName: 'Reception CHD',   role: 'reception',   centre: 'CHD',  dept: 'reception' },
  { email: 'reception.rpr@bawejahospital.com', password: 'ChangeMe@123', displayName: 'Reception Ropar', role: 'reception',   centre: 'RPR',  dept: 'reception' },

  // ── Lab ──────────────────────────────────────────────────────────────────
  { email: 'lab.chd@bawejahospital.com',    password: 'ChangeMe@123', displayName: 'Lab Tech CHD',        role: 'lab',         centre: 'CHD',  dept: 'lab'       },
  { email: 'lab.rpr@bawejahospital.com',    password: 'ChangeMe@123', displayName: 'Lab Tech Ropar',      role: 'lab',         centre: 'RPR',  dept: 'lab'       },

  // ── TPA ──────────────────────────────────────────────────────────────────
  { email: 'tpa@bawejahospital.com',        password: 'ChangeMe@123', displayName: 'TPA Executive',       role: 'tpa',         centre: 'CHD',  dept: 'tpa'       },

  // ── Optometrist ──────────────────────────────────────────────────────────
  { email: 'optometrist@bawejahospital.com',password: 'ChangeMe@123', displayName: 'Optometrist',         role: 'optometrist', centre: 'CHD',  dept: 'ophtho'    },

  // ── Inventory ────────────────────────────────────────────────────────────
  { email: 'inventory@bawejahospital.com',  password: 'ChangeMe@123', displayName: 'Inventory Manager',   role: 'inventory',   centre: 'CHD',  dept: 'inventory' },
]

async function setupUsers() {
  console.log('\n══════════════════════════════════════════════')
  console.log('  BMH HMS — Firebase Auth User Setup')
  console.log('══════════════════════════════════════════════\n')

  for (const staff of STAFF) {
    const { email, password, displayName, role, centre, dept } = staff

    try {
      // Try to create the user
      let user
      try {
        user = await auth.createUser({ email, password, displayName })
        console.log(`  ✓ Created: ${email}`)
      } catch (err) {
        if (err.code === 'auth/email-already-exists') {
          user = await auth.getUserByEmail(email)
          console.log(`  ~ Exists:  ${email} (updating claims)`)
        } else {
          throw err
        }
      }

      // Set custom claims (role, centre, dept for Firestore security rules)
      await auth.setCustomUserClaims(user.uid, { role, centre, dept, name: displayName })

    } catch (err) {
      console.error(`  ✗ Failed:  ${email} — ${err.message}`)
    }
  }

  console.log('\n══════════════════════════════════════════════')
  console.log('  Done. All users have temporary password: ChangeMe@123')
  console.log('  Share individual emails + temp password with each staff member.')
  console.log('  They can reset their password from the profile settings.')
  console.log('══════════════════════════════════════════════\n')

  process.exit(0)
}

setupUsers().catch(err => {
  console.error('Setup failed:', err)
  process.exit(1)
})
