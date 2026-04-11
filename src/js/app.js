// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — App Entry Point
// Boots the app: auth → load data → show correct page
// ─────────────────────────────────────────────────────────────────────────────

import { auth, watchConnectionStatus } from './firebase.js'
import { loginUser as firebaseLoginUser, logoutUser, watchAuthState } from './auth.js'
import { watchPatients, upsertPatientFirestore, updatePatient } from './patients.js'
import { sendPasswordResetEmail } from 'firebase/auth'
import { watchAppointments }    from './appointments.js'
import { watchTransactions,
         watchPayRequests }     from './billing.js'
import { watchLeads }           from './leads.js'
import { todayKey }             from './utils.js'

const SAVED_LOGIN_KEY = 'bmh_saved_login_v1'
const USE_FIRESTORE_REALTIME_AFTER_LOGIN = false

function loadSavedLogin() {
  try {
    const raw = localStorage.getItem(SAVED_LOGIN_KEY)
    if (!raw) return
    const saved = JSON.parse(raw)
    const emailEl = document.getElementById('lg-email')
    const passEl = document.getElementById('lg-pass')
    const rememberEl = document.getElementById('lg-remember')
    if (emailEl && saved.email) emailEl.value = saved.email
    if (passEl && saved.password) passEl.value = saved.password
    if (rememberEl) rememberEl.checked = !!(saved.email || saved.password)
  } catch (_) { /* ignore storage parsing errors */ }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSavedLogin)
} else {
  loadSavedLogin()
}

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
  const remember = !!document.getElementById('lg-remember')?.checked
  const errEl    = document.getElementById('lg-err')

  if (!email || !password) {
    if (errEl) { errEl.textContent = 'Please enter your email and password.'; errEl.style.display = 'block' }
    return
  }
  if (errEl) errEl.style.display = 'none'

  const btn = document.querySelector('#login-gate button[onclick]')
  if (btn) { btn.textContent = 'Signing in…'; btn.disabled = true }

  const looksLikeEmail = /@/.test(email)
  const isHospitalManagedEmail = /@bawejahospital\.com$/i.test(email)
  const isDefaultManagedPassword = password === 'ChangeMe@123'
  const shouldUseLegacyFirst =
    !looksLikeEmail ||
    /^[a-z0-9._,-]+$/i.test(email) ||
    isHospitalManagedEmail ||
    isDefaultManagedPassword

  if (shouldUseLegacyFirst && typeof window.loginUser === 'function') {
    try {
      window.loginUser()
      const gate = document.getElementById('login-gate')
      const legacySucceeded = !gate || gate.style.display === 'none'
      if (legacySucceeded) {
        try {
          if (remember) localStorage.setItem(SAVED_LOGIN_KEY, JSON.stringify({ email, password }))
          else localStorage.removeItem(SAVED_LOGIN_KEY)
        } catch (_) { /* ignore */ }
        if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false }
        return
      }
    } catch (_) { /* noop */ }
  }

  try {
    await firebaseLoginUser(email, password)
    try {
      if (remember) {
        localStorage.setItem(SAVED_LOGIN_KEY, JSON.stringify({ email, password }))
      } else {
        localStorage.removeItem(SAVED_LOGIN_KEY)
      }
    } catch (_) { /* ignore storage errors */ }
    // watchAuthState below will handle the rest
  } catch {
    try {
      if (typeof window.loginUser === 'function') {
        window.loginUser()
        const gate = document.getElementById('login-gate')
        const legacySucceeded = !gate || gate.style.display === 'none'
        if (legacySucceeded) {
          try {
            if (remember) {
              localStorage.setItem(SAVED_LOGIN_KEY, JSON.stringify({ email, password }))
            } else {
              localStorage.removeItem(SAVED_LOGIN_KEY)
            }
          } catch (_) { /* ignore storage errors */ }
          if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false }
          return
        }
      }
    } catch (_) { /* noop */ }
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

    // Set window.CURRENT_USER so legacy.js can read it for centre filtering.
    // Legacy code expects Title-Case role ('Admin','Doctor','Reception','Lab','TPA','Optometrist','Inventory')
    // but Firebase custom claims use lowercase ('admin','doctor','reception'...) — map here.
    const roleMap = {
      admin: 'Admin', doctor: 'Doctor', reception: 'Reception',
      lab: 'Lab', tpa: 'TPA', optometrist: 'Optometrist', inventory: 'Inventory',
    }
    const legacyRole = roleMap[user.role] || 'Reception'
    window.CURRENT_USER = {
      username:          user.email?.split('@')[0] || 'user',
      name:              user.name  || user.email || 'User',
      role:              legacyRole,
      dept:              user.dept  || '',
      centre:            user.centre || 'CHD',
      isAdmin:           user.role === 'admin',
      canSeeAllCentres:  user.role === 'admin' || user.centre === 'BOTH',
    }

    // Sync into legacy.js local CURRENT_USER variable
    if (typeof window.syncLegacyCurrentUserFromFirebase === 'function') {
      try { window.syncLegacyCurrentUserFromFirebase() } catch (_) { /* noop */ }
    }

    if (typeof window.loadDoctorProfilesFromFirebase === 'function') {
      try { window.loadDoctorProfilesFromFirebase() } catch (_) { /* noop */ }
    }
    if (typeof window.loadDrugLibraryFromStorage === 'function') {
      try { window.loadDrugLibraryFromStorage() } catch (_) { /* noop */ }
    }
    if (typeof window.loadConsentDataOverridesFromStorage === 'function') {
      try { window.loadConsentDataOverridesFromStorage() } catch (_) { /* noop */ }
    }

    const centre = user.centre || 'CHD'
    const today  = todayKey()

    // The live HMS pages are still driven by legacy.js + RTDB.
    // Running Firestore realtime listeners in parallel here causes the same
    // patient/billing data to load twice and can freeze the UI after login.
    if (USE_FIRESTORE_REALTIME_AFTER_LOGIN) {
      listeners.push(watchPatients(centre))
      listeners.push(watchAppointments(centre, today))
      listeners.push(watchTransactions(centre, today))
      listeners.push(watchPayRequests(centre))

      if (['admin', 'reception'].includes(user.role)) {
        listeners.push(watchLeads(centre))
      }
    }

    watchConnectionStatus('fb-status')

    // ── Start legacy Realtime DB listeners ──────────────────────────────────
    // These were previously only called from the old username/password login.
    // With Firebase Auth we must call them explicitly after the user is known.
    setTimeout(() => {
      const safe = fn => { try { if (typeof window[fn] === 'function') window[fn]() } catch (_) {} }
      const defer = (fn, delay = 0) => {
        const runner = () => safe(fn)
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(runner, { timeout: Math.max(300, delay || 800) })
          return
        }
        setTimeout(runner, delay)
      }
      safe('loadPatientsFromFirebase')
      defer('listenPayRequests', 120)
      defer('listenAppointments', 120)
      defer('loadTodayTransactions', 120)
      // Non-critical modules are loaded lazily when the user opens those pages.
      if (user.role === 'lab') defer('listenLabOrders', 900)
    }, 300)

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
