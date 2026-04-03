// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — Shared Utilities
// showToast, nav(), openModal(), formatDate, todayKey, etc.
// ─────────────────────────────────────────────────────────────────────────────

// ── Toast notifications ──────────────────────────────────────────────────────
// type: 's' success · 'e' error · 'w' warning · 'i' info
export function showToast(msg, type = 'i', duration = 3000) {
  const colours = { s: '#34C759', e: '#FF3B30', w: '#FF9500', i: '#007AFF' }
  const icons   = { s: '✓', e: '✗', w: '⚠', i: 'ℹ' }

  const toast = document.createElement('div')
  toast.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:${colours[type] || colours.i}; color:#fff;
    padding:10px 20px; border-radius:10px; font-size:13px; font-weight:600;
    z-index:99999; box-shadow:0 4px 16px rgba(0,0,0,.25);
    display:flex; align-items:center; gap:8px; max-width:90vw;
    animation: toastIn .2s ease;
  `
  toast.textContent = `${icons[type] || ''} ${msg}`
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), duration)
}
window.showToast = showToast  // legacy global

// ── Modal helpers ────────────────────────────────────────────────────────────
export function openModal(id) {
  const el = document.getElementById(id)
  if (el) el.style.display = 'flex'
}

export function closeModal(id) {
  const el = document.getElementById(id)
  if (el) el.style.display = 'none'
}
window.openM  = openModal
window.closeM = closeModal

// ── Date helpers ─────────────────────────────────────────────────────────────
export function todayKey() {
  return new Date().toISOString().slice(0, 10)   // "YYYY-MM-DD"
}

export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

// ── ID generators (UPGRADED - CHRONOLOGICAL) ─────────────────────────────────
export function newBmhId() {
  const BASE_ID = 55999
  let maxId = BASE_ID

  if (typeof window !== 'undefined' && Array.isArray(window.PATIENTS)) {
    for (const p of window.PATIENTS) {
      const match = String(p?.bmhId || '').trim().match(/^BMSH-(\d{1,9})$/)
      if (!match) continue
      const num = parseInt(match[1], 10)
      if (!Number.isNaN(num) && num > maxId) maxId = num
    }
  }

  if (typeof window !== 'undefined') {
    const nextKnown = parseInt(window._nextPatientNum || '0', 10)
    if (!Number.isNaN(nextKnown) && nextKnown > 0) {
      maxId = Math.max(maxId, nextKnown - 1)
    }
  }

  try {
    const cachedLast = parseInt(localStorage.getItem('bmh_last_patient_num') || '0', 10)
    if (!Number.isNaN(cachedLast) && cachedLast > maxId) maxId = cachedLast
  } catch (_) { /* ignore storage errors */ }

  const nextId = maxId + 1
  if (typeof window !== 'undefined') window._nextPatientNum = nextId
  return 'BMSH-' + String(nextId).padStart(6, '0')
}

// ── String helpers ───────────────────────────────────────────────────────────
export function initials(name = '') {
  return name.split(' ').map(w => w[0] || '').join('').toUpperCase().substring(0, 2)
}

export function avatarColor(name = '') {
  const palette = ['#1A3C6E','#0B7B8C','#FF2D55','#AF52DE','#34C759','#FF9500','#5856D6','#FF3B30']
  let hash = 0
  for (const c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash)
  return palette[Math.abs(hash) % palette.length]
}

// ── Debounce ─────────────────────────────────────────────────────────────────
export function debounce(fn, ms = 300) {
  let timer
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms) }
}
