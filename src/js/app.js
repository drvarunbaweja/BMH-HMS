// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — App Entry Point
// Boots the app: auth → load data → show correct page
// ─────────────────────────────────────────────────────────────────────────────

// ── Historical Queue Functions ───────────────────────────────────────────────
window.loadHistoricalQueue = function() {
  const dateInput = document.getElementById('dq-historical-date');
  if (!dateInput || !dateInput.value) {
    window.showToast?.('Please select a date', 'w');
    return;
  }
  
  const selectedDate = dateInput.value;
  const todayKeyLocal = new Date().toISOString().slice(0, 10);
  
  if (selectedDate === todayKeyLocal) {
    // If today is selected, show current queue
    clearHistoricalDate();
    return;
  }
  
  // Filter patients for the selected historical date
  const historicalPatients = getHistoricalQueuePatients(selectedDate);
  renderHistoricalQueue(historicalPatients, selectedDate);
  
  window.showToast?.(`Showing queue for ${formatDisplayDate(selectedDate)}`, 's');
};

window.clearHistoricalDate = function() {
  const dateInput = document.getElementById('dq-historical-date');
  if (dateInput) {
    dateInput.value = '';
  }
  // Restore normal queue rendering
  if (typeof window.renderDocQueue === 'function') {
    window.renderDocQueue();
  }
  window.showToast?.('Showing current queue', 's');
};

function getHistoricalQueuePatients(targetDate) {
  const patients = window.PATIENTS || [];
  return patients.filter(function(p) {
    if (!p || p.queueRemoved || String(p.status || '').toLowerCase() === 'removed') return false;
    if (!window.centreMatch?.(p)) return false;
    
    return patientQueueDateMatches(p, targetDate);
  });
}

function patientQueueDateMatches(p, targetDate) {
  if (!p || p.queueRemoved) return false;
  
  const stamps = [p.checkinAt, p.createdAt, p.seenAt, p.updatedAt, p.registeredAt, p.visitDate, p.queueDate, p.appointmentDate, p.dischargedAt].filter(Boolean);
  if (!stamps.length) return false;
  
  return stamps.some(function(raw) {
    const s = String(raw || '');
    if (!s) return false;
    if (/^\d+$/.test(s)) {
      try { return localDateKey(new Date(Number(s))) === targetDate; } catch (e) { return false; }
    }
    return localDateKey(s) === targetDate || s.slice(0, 10) === targetDate;
  });
}

function renderHistoricalQueue(patients, selectedDate) {
  const titleEl = document.getElementById('dq-title');
  if (titleEl) {
    titleEl.textContent = `Historical Queue — ${formatDisplayDate(selectedDate)}`;
  }
  
  // Sort patients by checkin time
  const sortedPatients = patients.slice().sort(function(a, b) {
    const timeA = getQueueTimestamp(a);
    const timeB = getQueueTimestamp(b);
    return timeA - timeB;
  });
  
  const serialMap = new Map(sortedPatients.map(function(p, idx) { return [p.bmhId, idx + 1]; }));
  
  // Update all queue tabs with historical data
  const active = sortedPatients.filter(p => !isPatientMarkedSeen(p));
  const done = sortedPatients.filter(p => isPatientMarkedSeen(p));
  
  const emptyRow = label => `<tr><td colspan="10" style="text-align:center;padding:24px;color:var(--g2);font-size:12.5px">No ${label} patients for ${formatDisplayDate(selectedDate)}</td></tr>`;
  
  const ae = document.getElementById('dq-active-list');
  if(ae) ae.innerHTML = active.length ? active.map((p)=>buildQTableRow(p, serialMap.get(p.bmhId) || '')).join('') : emptyRow('active');
  
  const dne = document.getElementById('dq-done-list');
  if(dne) dne.innerHTML = done.length ? done.map((p)=>buildQTableRow(p, serialMap.get(p.bmhId) || '')).join('') : emptyRow('done');
  
  // Clear other tabs for historical view
  const de = document.getElementById('dq-dil-list');
  if(de) de.innerHTML = emptyRow('dilated');
  
  const xe = document.getElementById('dq-xref-list');
  if(xe) xe.innerHTML = emptyRow('cross-refer');
  
  const ie = document.getElementById('dq-ipd-list');
  if(ie) ie.innerHTML = emptyRow('IPD');
}

function getQueueTimestamp(p) {
  const timestamps = [
    p.checkinAt,
    p.createdAt,
    p.registeredAt,
    p.visitDate,
    p.queueDate
  ].filter(Boolean);
  
  if (!timestamps.length) return 0;
  
  for (const ts of timestamps) {
    if (typeof ts === 'number') return ts;
    if (typeof ts === 'string') {
      if (/^\d+$/.test(ts)) return parseInt(ts, 10);
      const parsed = Date.parse(ts);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return 0;
}

function formatDisplayDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

function localDateKey(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return yyyy + '-' + mm + '-' + dd;
}

function isPatientMarkedSeen(p) {
  return p && (p.seen === true || p.status === 'seen' || String(p.status || '').toLowerCase() === 'seen');
}

// ── Patient Search with Visit History Functions ───────────────────────────────
window.searchPatientVisits = function() {
  const nameInput = document.getElementById('patient-search-name');
  const idInput = document.getElementById('patient-search-id');
  const resultsDiv = document.getElementById('patient-search-results');
  
  if (!nameInput || !idInput || !resultsDiv) return;
  
  const nameQuery = String(nameInput.value || '').trim().toLowerCase();
  const idQuery = String(idInput.value || '').trim().toLowerCase();
  
  if (!nameQuery && !idQuery) {
    window.showToast?.('Please enter patient name or BMSH ID', 'w');
    return;
  }
  
  const patients = window.PATIENTS || [];
  const matchedPatients = patients.filter(function(p) {
    if (!p) return false;
    const nameMatch = nameQuery && p.name && p.name.toLowerCase().includes(nameQuery);
    const idMatch = idQuery && p.bmhId && p.bmhId.toLowerCase().includes(idQuery);
    return nameMatch || idMatch;
  });
  
  if (matchedPatients.length === 0) {
    resultsDiv.innerHTML = '<div style="padding:12px;text-align:center;color:var(--g2);font-size:12px;">No patients found matching your search criteria</div>';
    resultsDiv.style.display = 'block';
    return;
  }
  
  // Group visits by patient and collect all visit dates
  const patientVisitHistory = matchedPatients.map(function(p) {
    const visitDates = extractPatientVisitDates(p);
    return {
      patient: p,
      visitDates: visitDates.sort((a, b) => new Date(b) - new Date(a)) // Sort by date descending
    };
  });
  
  renderPatientSearchResults(patientVisitHistory);
  resultsDiv.style.display = 'block';
};

window.clearPatientSearch = function() {
  const nameInput = document.getElementById('patient-search-name');
  const idInput = document.getElementById('patient-search-id');
  const resultsDiv = document.getElementById('patient-search-results');
  
  if (nameInput) nameInput.value = '';
  if (idInput) idInput.value = '';
  if (resultsDiv) {
    resultsDiv.style.display = 'none';
    resultsDiv.innerHTML = '';
  }
};

function extractPatientVisitDates(p) {
  const visitDates = new Set();
  const stamps = [
    p.checkinAt,
    p.createdAt,
    p.seenAt,
    p.updatedAt,
    p.registeredAt,
    p.visitDate,
    p.queueDate,
    p.appointmentDate
  ];
  
  stamps.forEach(function(stamp) {
    if (!stamp) return;
    let date;
    if (typeof stamp === 'number') {
      date = new Date(stamp);
    } else if (typeof stamp === 'string') {
      if (/^\d+$/.test(stamp)) {
        date = new Date(parseInt(stamp, 10));
      } else {
        date = new Date(stamp);
      }
    }
    
    if (date && !isNaN(date.getTime())) {
      visitDates.add(date.toISOString().slice(0, 10));
    }
  });
  
  // Also check visits array if it exists
  if (Array.isArray(p.visits)) {
    p.visits.forEach(function(visit) {
      if (visit && visit.date) {
        const visitDate = new Date(visit.date);
        if (!isNaN(visitDate.getTime())) {
          visitDates.add(visitDate.toISOString().slice(0, 10));
        }
      }
    });
  }
  
  return Array.from(visitDates);
}

function renderPatientSearchResults(patientVisitHistory) {
  const resultsDiv = document.getElementById('patient-search-results');
  if (!resultsDiv) return;
  
  const html = patientVisitHistory.map(function(item) {
    const p = item.patient;
    const visits = item.visitDates;
    
    return `
      <div style="background:#fff;border:1px solid var(--g4);border-radius:8px;padding:12px;margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
          <div>
            <div style="font-weight:600;color:var(--g2);font-size:13px;">${p.name || 'Unknown'}</div>
            <div style="color:var(--g1);font-size:11px;">BMSH ID: ${p.bmhId || 'N/A'}</div>
            <div style="color:var(--g1);font-size:11px;">Mobile: ${p.mob || p.mobile || 'N/A'}</div>
          </div>
          <button type="button" class="btn btn-gold btn-xs" onclick="openPatientFromSearch('${p.bmhId}')">Open Patient</button>
        </div>
        <div style="border-top:1px solid var(--g5);padding-top:8px;">
          <div style="font-size:11px;font-weight:600;color:var(--g2);margin-bottom:4px;">Visit History (${visits.length} visits):</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;">
            ${visits.map(date => `
              <span style="background:var(--g6);border:1px solid var(--g5);border-radius:4px;padding:2px 6px;font-size:10px;color:var(--g1);cursor:pointer;" 
                    onclick="loadHistoricalQueueFromDate('${date}')" title="View queue for this date">
                ${formatDisplayDate(date)}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  resultsDiv.innerHTML = html;
}

window.openPatientFromSearch = function(bmhId) {
  if (typeof window.openPatient === 'function') {
    const patient = window.openPatient(bmhId);
    if (patient) {
      // Navigate to patient details or case sheet
      if (typeof window.nav === 'function') {
        window.nav('patient-details', null);
      }
      window.showToast?.(`Opened patient: ${patient.name}`, 's');
    } else {
      window.showToast?.('Patient not found', 'e');
    }
  }
};

window.loadHistoricalQueueFromDate = function(date) {
  const dateInput = document.getElementById('dq-historical-date');
  if (dateInput) {
    dateInput.value = date;
    loadHistoricalQueue();
    // Scroll to queue section
    const queueSection = document.getElementById('pg-doctor-queue');
    if (queueSection) {
      queueSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

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
      setTimeout(() => {
        try { window.loadDrugLibraryFromStorage({ forceRemote: true }) } catch (_) { /* noop */ }
      }, 1500)
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
      if (['admin', 'reception'].includes(String(user.role || '').toLowerCase())) {
        setTimeout(() => {
          safe('repairDuplicatePatientsByIdentity')
        }, 4000)
      }
      const eagerRoles = ['admin', 'reception', 'tpa']
      if (eagerRoles.includes(String(user.role || '').toLowerCase())) {
        defer('listenPayRequests', 120)
        defer('listenAppointments', 120)
        defer('loadTodayTransactions', 120)
      }
      // Non-critical modules are loaded lazily when the user opens those pages.
      if (user.role === 'lab') defer('listenLabOrders', 900)
    }, 300)

    // Navigate to role home unless the URL hash has a saved in-app route (same tab after F5).
    const homePages = {
      admin:       'pg-dashboard',
      reception:   'pg-reception',
      doctor:      'pg-doctor-queue',
      optometrist: 'pg-doctor-queue',
      lab:         'pg-lab',
      tpa:         'pg-tpa',
      inventory:   'pg-inventory',
    }
    const homeId = homePages[user.role] || 'pg-reception'
    const goHome = () => {
      if (typeof window.nav === 'function') window.nav(homeId)
    }
    if (typeof window.tryScheduleRouteRestoreFromHash === 'function') {
      window.tryScheduleRouteRestoreFromHash(goHome)
    } else {
      goHome()
    }
  },

  // ── On logout ─────────────────────────────────────────────────────────────
  () => {
    stopListeners()
    showLoginGate()
  }
)
