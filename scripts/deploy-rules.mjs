// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Deploy Realtime Database rules
//
// Usage:
//   node scripts/deploy-rules.mjs --secure   → deploys database.rules.secure.json (auth required)
//   node scripts/deploy-rules.mjs --open     → deploys database.rules.open-backup.json (ROLLBACK to old open rules)
//   node scripts/deploy-rules.mjs --current  → deploys database.rules.json
//
// Prerequisite: scripts/serviceAccountKey.json (gitignored)
//   Firebase Console → Project Settings → Service Accounts → Generate new private key
// ─────────────────────────────────────────────────────────────────────────────
import { createRequire } from 'module'
import { readFileSync }  from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const require = createRequire(import.meta.url)
const { GoogleAuth } = require('google-auth-library')

const __dir = dirname(fileURLToPath(import.meta.url))
const DB_URL = 'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app'

const mode = process.argv[2] || ''
const fileByMode = {
  '--secure':  'database.rules.secure.json',
  '--open':    'database.rules.open-backup.json',
  '--current': 'database.rules.json',
}
const rulesFile = fileByMode[mode]
if (!rulesFile) {
  console.error('Usage: node scripts/deploy-rules.mjs --secure | --open | --current')
  process.exit(1)
}

const rules = readFileSync(join(__dir, '..', rulesFile), 'utf8')
JSON.parse(rules) // validate

const auth = new GoogleAuth({
  keyFile: join(__dir, 'serviceAccountKey.json'),
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/firebase.database',
  ],
})

const client = await auth.getClient()
const token  = (await client.getAccessToken()).token

const res = await fetch(`${DB_URL}/.settings/rules.json`, {
  method: 'PUT',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: rules,
})
if (!res.ok) {
  console.error('Rules deploy FAILED:', res.status, await res.text())
  process.exit(1)
}
console.log(`✅ Deployed ${rulesFile} to ${DB_URL}`)
if (mode === '--secure') console.log('Database now requires Firebase Auth. Rollback anytime: node scripts/deploy-rules.mjs --open')
