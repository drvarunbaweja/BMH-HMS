/* BMH — every computer picks up a new version by itself (both centres the same day).
 * Every 5 minutes this page checks the live index.html. When a newer version has gone live, the page reloads itself —
 * but only at a safe moment, so nothing being typed is lost:
 *   – no key / mouse / touch for 3 minutes, and
 *   – the screen is the Dashboard, My patient queue, Two-Centre View, or Reception with the registration form empty, and
 *   – no pop-up window is open and no box is being typed in.
 * Patient files, billing, OT, IPD, lab and every other screen are never reloaded; they update as soon as the user is back
 * on one of the screens above and idle. The page comes back on the same screen it was on (made sure of after login,
 * so the Two-Centre View stays the Two-Centre View).
 * Also after midnight: a page left open from the day before switches its live receipts to today at once and reloads at
 * the next safe moment (1 idle minute), so the Two-Centre View and Charges show today's totals, not yesterday's.
 * Off switch (this browser): localStorage.setItem('bmh_auto_reload_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_auto_reload_off') === '1') return; } catch (e) {}
  var CHECK_MS = 5 * 60 * 1000, IDLE_MS = 3 * 60 * 1000;
  var SAFE = { 'pg-dashboard': 1, 'pg-doctor-queue': 1, 'pg-reception': 1, 'pg-centres': 1 };
  // a new day: the page was opened on an earlier date (left open overnight) → reload at the next safe moment, and
  // straight away switch the live receipts to today's list so totals are for today (Two-Centre View, Charges …)
  function dayKey() { try { return localDateKey(new Date()); } catch (e) { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); } }
  var startDay = dayKey(), dayPending = false;
  setInterval(function () {
    if (dayPending || dayKey() === startDay) return;
    dayPending = true; pending = true;
    try { if (typeof loadTodayTransactions === 'function') loadTodayTransactions(); } catch (e) {}
    try { var cd = document.getElementById('centres-date'); if (cd) { cd.dataset.manualDay = ''; cd.value = ''; } if (activePage() === 'pg-centres' && typeof renderCentresView === 'function') setTimeout(renderCentresView, 4000); } catch (e) {}
  }, 60000);
  var lastAct = Date.now(), pending = false;
  function tagOf(text) { var m = String(text || '').match(/js\/legacy\.js\?v=([^"'&\s>]+)/); return m ? m[1] : ''; }
  function myTag() { var s = document.querySelector('script[src*="js/legacy.js?v="]'); return s ? tagOf(s.getAttribute('src')) : ''; }
  ['keydown', 'mousedown', 'mousemove', 'touchstart', 'wheel', 'input'].forEach(function (ev) {
    window.addEventListener(ev, function () { lastAct = Date.now(); }, { capture: true, passive: true });
  });
  function visible(el) { if (!el) return false; var cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && el.offsetWidth > 0 && el.offsetHeight > 0; }
  function popupOpen() {
    return Array.prototype.some.call(document.querySelectorAll('[class*="modal"],[id*="modal"],[class*="overlay"],[id*="popup"],[class*="popup"]'), function (el) {
      if (!visible(el)) return false; var cs = getComputedStyle(el); return cs.position === 'fixed' || cs.position === 'absolute' && el.offsetHeight > 200;
    });
  }
  function typing() { var a = document.activeElement; return !!(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && String(a.value || '').trim()); }
  function activePage() { var p = document.querySelector('.page.active'); return p ? p.id : ''; }
  function safeNow() {
    if (Date.now() - lastAct < IDLE_MS) return false;
    var gate = document.getElementById('login-gate');
    if (gate && visible(gate)) return !typing();
    var pg = activePage();
    if (!SAFE[pg]) return false;
    if (popupOpen() || typing()) return false;
    if (pg === 'pg-reception') {
      var busy = ['rc-fn', 'rc-ln', 'rc-mob-inp', 'rc-mob'].some(function (id) { var el = document.getElementById(id); return el && String(el.value || '').trim(); });
      if (busy || window._bmhReceptionRegistrationInFlight) return false;
    }
    return true;
  }
  // after midnight the Two-Centre View, dashboard etc. may reload after 1 idle minute
  function safeDayNow() {
    if (Date.now() - lastAct < 60000) return false;
    var pg = activePage(); if (!SAFE[pg] || popupOpen() || typing()) return false;
    if (pg === 'pg-reception') { var busy = ['rc-fn', 'rc-ln', 'rc-mob-inp', 'rc-mob'].some(function (id) { var el = document.getElementById(id); return el && String(el.value || '').trim(); }); if (busy || window._bmhReceptionRegistrationInFlight) return false; }
    return true;
  }
  function check() {
    var mine = myTag(); if (!mine) return;
    var url = location.origin + location.pathname + '?_v=' + Date.now();
    fetch(url, { cache: 'no-store' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
      var live = tagOf(html);
      if (live && live !== mine) pending = true;
    }).catch(function () {});
  }
  setInterval(function () {
    if (pending && (safeNow() || (dayPending && safeDayNow()))) { try { sessionStorage.setItem('bmh_auto_reloaded_at', new Date().toISOString()); sessionStorage.setItem('bmh_reload_return', JSON.stringify({ page: activePage(), at: Date.now() })); } catch (e) {} location.reload(); }
  }, 20000);
  // after an automatic reload: come back to the same screen (e.g. the Two-Centre View), not the Dashboard
  (function returnToPage() {
    var want = null; try { want = JSON.parse(sessionStorage.getItem('bmh_reload_return') || 'null'); sessionStorage.removeItem('bmh_reload_return'); } catch (e) { want = null; }
    if (!want || !want.page || Date.now() - Number(want.at || 0) > 5 * 60 * 1000) return;
    var key = String(want.page).replace(/^pg-/, ''), tries = 0, okFor = 0, act0 = lastAct;
    var t = setInterval(function () {
      if (++tries > 90 || okFor >= 8) { clearInterval(t); return; }
      var gate = document.getElementById('login-gate'); if (gate && visible(gate)) return;
      var u = null; try { u = CURRENT_USER; } catch (e) {} if (!u) return;
      if (activePage() === want.page) { okFor += 1; return; }
      okFor = 0;
      if (lastAct > act0 + 1500) { clearInterval(t); return; } // someone has started using the screen — leave it
      try { var navEl = document.querySelector('#sbnav .ni[onclick*="nav(\'' + key + '\'"]'); if (navEl || key === 'dashboard') nav(key, navEl || null); else clearInterval(t); } catch (e) { clearInterval(t); }
    }, 1000);
  })();
  setTimeout(check, 60000);
  setInterval(check, CHECK_MS);
  window.bmhAutoReloadStatus = function () { return { mine: myTag(), pending: pending, idleSec: Math.round((Date.now() - lastAct) / 1000), page: activePage(), popup: popupOpen(), typing: typing(), safe: safeNow() }; };
})();
