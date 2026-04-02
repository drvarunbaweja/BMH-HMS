// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Firebase Initialisation
// Modular SDK v11 · Firestore + Auth + Realtime DB (kept during migration)
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp, getApps, getApp }   from 'firebase/app'
import { getAuth, onAuthStateChanged }      from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
}                                           from 'firebase/firestore'
import { getDatabase, ref, onValue }        from 'firebase/database'   // remove after migration

const firebaseConfig = {
  apiKey:            'AIzaSyDl8RD0l5yy3YjWJWXhdKetDPnFSa37IVQ',
  authDomain:        'bmh-hms.firebaseapp.com',
  databaseURL:       'https://bmh-hms-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId:         'bmh-hms',
  storageBucket:     'bmh-hms.firebasestorage.app',
  messagingSenderId: '675093131811',
  appId:             '1:675093131811:web:669ea0eafd0a27bc73f796'
}

// ── Initialise ───────────────────────────────────────────────────────────────
// The compat SDK (index.html inline script) may have already initialised the
// default app before this module runs.  Re-use it to share the same Auth instance.
const app  = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const rtdb = getDatabase(app)   // Realtime DB — only used by migration script

// ── Firestore with offline persistence ──────────────────────────────────────
// persistentMultipleTabManager allows offline cache across multiple browser tabs.
const db = initializeFirestore(app, {
  cache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
})

// ── Connection status helper ─────────────────────────────────────────────────
// Call this after DOM is ready to wire up the green/red dot in the header.
export function watchConnectionStatus(dotElementId = 'fb-status') {
  // Firestore doesn't expose a simple connected flag, so we use Realtime DB
  // .info/connected which is instantaneous.
  onValue(ref(rtdb, '.info/connected'), snap => {
    const dot = document.getElementById(dotElementId)
    if (!dot) return
    dot.style.background = snap.val() ? '#34C759' : '#FF3B30'
    dot.title = snap.val() ? 'Database connected' : 'Offline'
  })
}

export { app, auth, db, rtdb }
