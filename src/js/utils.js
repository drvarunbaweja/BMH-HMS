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
  // Base starting ID. If no patients exist, it starts at BMSH-461001
  const BASE_ID = 461000;
  let maxId = BASE_ID;

  // Scan all existing patients to find the highest chronological number
  if (typeof window !== 'undefined' && Array.isArray(window.PATIENTS)) {
    for (const p of window.PATIENTS) {
      if (p.bmhId && p.bmhId.startsWith('BMSH-')) {
        const num = parseInt(p.bmhId.replace('BMSH-', ''), 10);
        if (!isNaN(num) && num > maxId) {
          maxId = num;
        }
      }
    }
  }
  
  // Return the absolute highest ID + 1
  return 'BMSH-' + (maxId + 1);
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