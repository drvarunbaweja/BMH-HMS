// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — App Entry Point
// Boots the app: auth → load data → show correct page
// ─────────────────────────────────────────────────────────────────────────────

import { auth, watchConnectionStatus } from './firebase.js'
import { loginUser, logoutUser, watchAuthState } from './auth.js'
import { watchPatients, upsertPatientFirestore, updatePatient } from './patients.js'
import { sendPasswordResetEmail } from 'firebase/auth'
import { watchAppointments }    from './appointments.js'
import { watchTransactions,
         watchPayRequests }     from './billing.js'
import { watchLeads }           from './leads.js'
import { todayKey }             from './utils.js'

// Legacy hooks — registration saves to RTDB + must mirror to Firestore for live PATIENTS[]
window.upsertPatientFirestore = upsertPatientFirestore
window.patchPatientFirestore = (bmhId, data) => updatePatient(bmhId, data)

/** Admin: send Firebase password-reset email (works for accounts that sign in with that email). */
window.sendUserPasswordResetEmail = async function (email) {
  const e = (email || '').trim()
  if (!e) { window.showToast?.('Enter an email address', 'w'); return }
  try {
    await sendPasswordResetEmail(auth, e)
    window.showToast?.('Password reset email sent ✓ Check inbox/spam.', 's')
  } catch (err) {
    window.showToast?.(err.message || 'Could not send reset email', 'e')
  }
}

// Active Firestore listeners — stored so they can be unsubscribed on logout
const listeners = []

function stopListeners() {
  listeners.forEach(unsub => unsub())
  listeners.length = 0
}

// ── Login gate DOM helpers ────────────────────────────────────────────────────
function showLoginGate() {
  const gate  = document.getElementById('login-gate')
  const shell = document.getElementById('shell')
  if (gate)  gate.style.display  = 'flex'
  if (shell) shell.style.display = 'none'
}

function showShell(user) {
  const gate  = document.getElementById('login-gate')
  const shell = document.getElementById('shell')
  if (gate)  gate.style.display  = 'none'
  if (shell) shell.style.display = 'flex'

  // Update sidebar user chip
  const av = document.getElementById('sbav')
  const nm = document.getElementById('sbnm')
  const rl = document.getElementById('sbrl')
  if (av) av.textContent = (user.name || '').split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2)
  if (nm) nm.textContent = user.name  || user.email
  if (rl) rl.textContent = `${user.dept || user.role} · ${user.centre}`
}

// ── Expose login/logout to the HTML inline handlers ──────────────────────────
// The login form calls window._loginUser(); logout button calls window.logoutUser()
window._loginUser = async function () {
  const email    = (document.getElementById('lg-email')?.value || '').trim()
  const password = document.getElementById('lg-pass')?.value || ''
  const errEl    = document.getElementById('lg-err')

  if (!email || !password) {
    if (errEl) { errEl.textContent = 'Please enter your email and password.'; errEl.style.display = 'block' }
    return
  }
  if (errEl) errEl.style.display = 'none'

  const btn = document.querySelector('#login-gate button[onclick]')
  if (btn) { btn.textContent = 'Signing in…'; btn.disabled = true }

  try {
    await loginUser(email, password)
    // watchAuthState below will handle the rest
  } catch {
    if (errEl) { errEl.textContent = 'Invalid email or password. Please try again.'; errEl.style.display = 'block' }
    if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false }
  }
}

window.logoutUser = async function () {
  stopListeners()
  await logoutUser()
}

// ── Boot ─────────────────────────────────────────────────────────────────────
watchAuthState(
  // ── On login ──────────────────────────────────────────────────────────────
  user => {
    showShell(user)

    // Legacy code expects username + full USER_DB shape for some panels
    if (window.CURRENT_USER) {
      window.CURRENT_USER.username =
        user.email?.split('@')[0] || window.CURRENT_USER.username || 'user'
    }
    if (typeof window.syncLegacyCurrentUserFromFirebase === 'function') {
      try { window.syncLegacyCurrentUserFromFirebase() } catch (_) { /* noop */ }
    }

    if (typeof window.loadDoctorProfilesFromFirebase === 'function') {
      try { window.loadDoctorProfilesFromFirebase() } catch (_) { /* noop */ }
    }
    if (typeof window.loadDrugLibraryFromStorage === 'function') {
      try { window.loadDrugLibraryFromStorage() } catch (_) { /* noop */ }
    }

    const centre = user.centre || 'CHD'
    const today  = todayKey()

    // Start real-time Firestore listeners
    listeners.push(watchPatients(centre))
    listeners.push(watchAppointments(centre, today))
    listeners.push(watchTransactions(centre, today))
    listeners.push(watchPayRequests(centre))

    if (['admin', 'reception'].includes(user.role)) {
      listeners.push(watchLeads(centre))
    }

    watchConnectionStatus('fb-status')

    // Navigate to role's home page
    const homePages = {
      admin:       'pg-dashboard',
      reception:   'pg-reception',
      doctor:      'pg-doctor-queue',
      optometrist: 'pg-doctor-queue',
      lab:         'pg-lab',
      tpa:         'pg-tpa',
      inventory:   'pg-inventory',
    }
    if (typeof window.nav === 'function') {
      window.nav(homePages[user.role] || 'pg-reception')
    }
  },

  // ── On logout ─────────────────────────────────────────────────────────────
  () => {
    stopListeners()
    showLoginGate()
  }
)
