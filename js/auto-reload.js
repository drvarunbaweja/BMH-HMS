/* BMH — every computer picks up a new version by itself (both centres the same day).
 * Every 5 minutes this page checks the live index.html. When a newer version has gone live, the page reloads itself —
 * but only at a safe moment, so nothing being typed is lost:
 *   – no key / mouse / touch for 3 minutes, and
 *   – the screen is the Dashboard, My patient queue, or Reception with the registration form empty, and
 *   – no pop-up window is open and no box is being typed in.
 * Patient files, billing, OT, IPD, lab and every other screen are never reloaded; they update as soon as the user is back
 * on one of the screens above and idle. The page comes back on the same screen (the address keeps it).
 * Off switch (this browser): localStorage.setItem('bmh_auto_reload_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_auto_reload_off') === '1') return; } catch (e) {}
  var CHECK_MS = 5 * 60 * 1000, IDLE_MS = 3 * 60 * 1000;
  var SAFE = { 'pg-dashboard': 1, 'pg-doctor-queue': 1, 'pg-reception': 1 };
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
  function check() {
    var mine = myTag(); if (!mine) return;
    var url = location.origin + location.pathname + '?_v=' + Date.now();
    fetch(url, { cache: 'no-store' }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
      var live = tagOf(html);
      if (live && live !== mine) pending = true;
    }).catch(function () {});
  }
  setInterval(function () {
    if (pending && safeNow()) { try { sessionStorage.setItem('bmh_auto_reloaded_at', new Date().toISOString()); } catch (e) {} location.reload(); }
  }, 20000);
  setTimeout(check, 60000);
  setInterval(check, CHECK_MS);
  window.bmhAutoReloadStatus = function () { return { mine: myTag(), pending: pending, idleSec: Math.round((Date.now() - lastAct) / 1000), page: activePage(), popup: popupOpen(), typing: typing(), safe: safeNow() }; };
})();
