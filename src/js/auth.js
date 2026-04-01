// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Authentication Module
// Firebase Auth: sign in, sign out, session, role/centre from custom claims
// ─────────────────────────────────────────────────────────────────────────────

import { auth, db }           from './firebase.js'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword
}                             from 'firebase/auth'
import { doc, getDoc }        from 'firebase/firestore'
import { showToast }          from './utils.js'

// ── Current session ──────────────────────────────────────────────────────────
// Mirrors the old window.CURRENT_USER shape so existing code keeps working.
export let CURRENT_USER = null

// ── Login ────────────────────────────────────────────────────────────────────
export async function loginUser(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    // Custom claims (role, centre) are in the ID token.
    const token = await cred.user.getIdTokenResult()

    CURRENT_USER = {
      uid:      cred.user.uid,
      email:    cred.user.email,
      name:     token.claims.name     || cred.user.displayName || email,
      role:     token.claims.role     || 'reception',
      centre:   token.claims.centre   || 'CHD',
      dept:     token.claims.dept     || '',
      isAdmin:  token.claims.role === 'admin',
    }

    // Keep a copy on window so legacy global code can still read it.
    window.CURRENT_USER = CURRENT_USER
    return CURRENT_USER
  } catch (err) {
    const msg = authErrorMessage(err.code)
    showToast(msg, 'e')
    throw err
  }
}

// ── Logout ───────────────────────────────────────────────────────────────────
export async function logoutUser() {
  await signOut(auth)
  CURRENT_USER = null
  window.CURRENT_USER = null
  window.location.reload()
}

// ── Auth state watcher ───────────────────────────────────────────────────────
// Call once on app boot. Calls onLogin(user) or onLogout() as session changes.
export function watchAuthState(onLogin, onLogout) {
  onAuthStateChanged(auth, async firebaseUser => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdTokenResult()
      CURRENT_USER = {
        uid:     firebaseUser.uid,
        email:   firebaseUser.email,
        name:    token.claims.name   || firebaseUser.displayName || firebaseUser.email,
        role:    token.claims.role   || 'reception',
        centre:  token.claims.centre || 'CHD',
        dept:    token.claims.dept   || '',
        isAdmin: token.claims.role === 'admin',
      }
      window.CURRENT_USER = CURRENT_USER
      onLogin(CURRENT_USER)
    } else {
      CURRENT_USER = null
      window.CURRENT_USER = null
      onLogout()
    }
  })
}

// ── Human-readable error messages ────────────────────────────────────────────
function authErrorMessage(code) {
  const map = {
    'auth/invalid-email':          'Invalid email address.',
    'auth/user-not-found':         'No account found for this email.',
    'auth/wrong-password':         'Incorrect password.',
    'auth/too-many-requests':      'Too many failed attempts. Try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/user-disabled':          'This account has been disabled.',
  }
  return map[code] || 'Login failed. Please try again.'
}

// ── Role guards ──────────────────────────────────────────────────────────────
export const isAdmin    = () => CURRENT_USER?.role === 'admin'
export const isDoctor   = () => ['admin', 'doctor', 'optometrist'].includes(CURRENT_USER?.role)
export const isFrontDesk= () => ['admin', 'reception'].includes(CURRENT_USER?.role)
