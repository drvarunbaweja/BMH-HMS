/* BMH — IPD phase 4: in-app round reminders.
 * For anyone logged in with access to the IPD ward (doctors, nursing staff, admin), while the app is open on a
 * computer or phone: a small alert card appears when a patient's vitals round is due / overdue, or a medicine dose
 * from the IPD medicine chart is due in the next 15 minutes or overdue. A short beep / vibration plays when a new
 * alert appears. "Open" goes straight to that patient's monitoring sheet; "Later" hides that alert for 15 minutes.
 * Read-only: it only reads the active IPD admissions; nothing is saved.
 */
(function () {
  'use strict';
  var SNOOZE_MS = 15 * 60e3, POLL_MS = 60e3, FETCH_MS = 120e3;
  var snoozed = {}, seen = {}, cache = { at: 0, list: [] }, timer = null;
  try { snoozed = JSON.parse(sessionStorage.getItem('bmh_ipd_rem_snooze') || '{}'); } catch (e) {}
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function user() { try { return CURRENT_USER || window.CURRENT_USER || null; } catch (e) { return window.CURRENT_USER || null; } }
  function hasIpdAccess() {
    var u = user(); if (!u || !u.name) return false;
    if (/reception|billing|account|lab/i.test(String(u.role || '')) && !u.isAdmin) return false;
    if (window.localStorage && localStorage.getItem('bmh_ipd_reminders_off') === '1') return false;
    return !!document.querySelector('.ni[onclick*="nav(\'ipd\'"]');
  }
  function dayKey(v) { try { return localDateKey(v); } catch (e) { var d = new Date(v); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } }
  function centreOk(p) {
    var u = user() || {};
    if (u.isAdmin || u.canSeeAllCentres) return true;
    var c = ''; try { c = (typeof getEffectiveCentre === 'function' && getEffectiveCentre()) || u.centre || ''; } catch (e) { c = u.centre || ''; }
    return !c || !p.centre || String(p.centre).toUpperCase() === String(c).toUpperCase();
  }
  function fetchList() {
    var local = []; try { local = (window.IPD_PATIENTS || IPD_PATIENTS || []).slice(); } catch (e) { local = (window.IPD_PATIENTS || []).slice(); }
    if (!window.FBDB || Date.now() - cache.at < FETCH_MS) return Promise.resolve(merge(cache.list, local));
    return window.FBDB.ref('activeIpdPatients').once('value').then(function (s) {
      var v = s.val() || {};
      cache.list = Object.keys(v).map(function (k) { return Object.assign({ id: k }, v[k]); }).filter(function (p) {
        try { return typeof isActiveIpdAdmission === 'function' ? isActiveIpdAdmission(p) : p.status !== 'discharged'; } catch (e) { return true; }
      });
      cache.at = Date.now();
      return merge(cache.list, local);
    }).catch(function () { return merge(cache.list, local); });
  }
  function merge(remote, local) {
    var byId = {};
    remote.forEach(function (p) { byId[p.id] = p; });
    local.forEach(function (p) { if (p && p.id && (byId[p.id] || !remote.length)) byId[p.id] = Object.assign({}, byId[p.id] || {}, p); });
    return Object.keys(byId).map(function (k) { return byId[k]; }).filter(function (p) { return p && p.status !== 'discharged' && centreOk(p); });
  }
  function hoursOf(p) { return ({ '1h': 1, '2h': 2, '4h': 4, '6h': 6 })[p.monitoringKey] || (String(p.dept || '').indexOf('oph') >= 0 ? 2 : 6); }
  function alertsFor(p) {
    var now = Date.now(), out = [];
    var bed = [p.ward, p.room ? 'Bed ' + p.room : ''].filter(Boolean).join(' · ');
    // vitals round: next due = last vitals (or admission) + monitoring interval
    var last = (p.vitalSigns || [])[0];
    var lastAt = Date.parse((last && last.recordedAt) || p.admittedAt || '') || 0;
    if (lastAt) {
      var due = lastAt + hoursOf(p) * 3600e3;
      var mins = Math.round((due - now) / 60e3);
      if (mins <= 15 && mins > -24 * 60) out.push({ key: p.id + '|round|' + due, p: p, bed: bed, late: mins < -15, text: mins < 0 ? 'Vitals round overdue by ' + human(-mins) : 'Vitals round due ' + (mins <= 0 ? 'now' : 'in ' + mins + ' min'), sort: due });
    }
    // medicine doses from the IPD chart
    var t = dayKey(new Date());
    (p.ipdRx || []).forEach(function (r) {
      if (!r || r.cancelled || r.start > t || (r.stop && r.stop < t)) return;
      (r.times || []).forEach(function (s) {
        if (r.start === t && r.addedAt && dayKey(r.addedAt) === t && s < new Date(r.addedAt).toTimeString().slice(0, 2) + ':00') return;
        var due2 = Date.parse(t + 'T' + s + ':00');
        var m = Math.round((due2 - now) / 60e3);
        if (m > 15 || m < -240) return;
        var givenAlready = (p.medAdmin || []).some(function (a) { return a.rxId === r.id && a.date === t && a.slot === s; });
        if (givenAlready) return;
        out.push({ key: p.id + '|med|' + r.id + '|' + t + '|' + s, p: p, bed: bed, late: m < -30, text: r.name + ' ' + [r.dose, r.route].filter(Boolean).join(' ') + ' — ' + s + (m < 0 ? ' dose overdue by ' + human(-m) : ' dose due ' + (m <= 0 ? 'now' : 'in ' + m + ' min')), sort: due2 });
      });
    });
    return out;
  }
  function human(m) { return m >= 60 ? Math.floor(m / 60) + ' h ' + (m % 60) + ' min' : m + ' min'; }
  function beep() {
    try { if (navigator.vibrate) navigator.vibrate([180, 80, 180]); } catch (e) {}
    try {
      var C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      var ctx = window.__bmhRemCtx || (window.__bmhRemCtx = new C());
      [0, 0.22].forEach(function (d) { var o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = 880; g.gain.value = 0.08; o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime + d); o.stop(ctx.currentTime + d + 0.15); });
    } catch (e) {}
  }
  function render(alerts) {
    var box = document.getElementById('bmh-ipd-rem');
    if (!alerts.length) { if (box) box.remove(); return; }
    if (!box) {
      box = document.createElement('div'); box.id = 'bmh-ipd-rem';
      box.style.cssText = 'position:fixed;right:14px;bottom:14px;z-index:4000;width:min(360px,calc(100vw - 28px));max-height:60vh;overflow:auto;background:#fff;border-radius:14px;box-shadow:0 10px 34px rgba(10,20,40,.28);border:2px solid #D4A017;font-family:inherit';
      document.body.appendChild(box);
    }
    var late = alerts.filter(function (a) { return a.late; }).length;
    box.style.borderColor = late ? '#d32f2f' : '#D4A017';
    box.innerHTML = '<div style="display:flex;align-items:center;gap:8px;padding:9px 12px;background:' + (late ? '#fdecea' : '#fff8e1') + ';border-radius:12px 12px 0 0"><div style="font-weight:900;font-size:13px;flex:1;color:' + (late ? '#b71c1c' : '#8a6500') + '">🔔 IPD rounds — ' + alerts.length + ' due</div><button class="btn btn-xs btn-outline" onclick="bmhIpdRemHide()">Hide all 15 min</button></div>'
      + alerts.slice(0, 8).map(function (a) {
        return '<div style="padding:8px 12px;border-top:1px solid #eee;display:flex;gap:8px;align-items:center"><div style="flex:1;min-width:0"><div style="font-size:12.5px;font-weight:800">' + esc(a.p.name || 'Patient') + '</div><div style="font-size:10.5px;color:#666">' + esc(a.bed) + '</div><div style="font-size:12px;color:' + (a.late ? '#b71c1c' : '#333') + ';font-weight:' + (a.late ? 800 : 600) + '">' + esc(a.text) + '</div></div>'
          + '<div style="display:flex;flex-direction:column;gap:4px"><button class="btn btn-xs btn-gold" onclick="bmhIpdRemOpen(\'' + esc(a.p.id) + '\')">Open</button><button class="btn btn-xs btn-gray" onclick="bmhIpdRemSnooze(\'' + esc(a.key) + '\')">Later</button></div></div>';
      }).join('') + (alerts.length > 8 ? '<div style="padding:6px 12px;font-size:11px;color:#666;border-top:1px solid #eee">+' + (alerts.length - 8) + ' more</div>' : '');
  }
  function saveSnooze() { try { sessionStorage.setItem('bmh_ipd_rem_snooze', JSON.stringify(snoozed)); } catch (e) {} }
  window.bmhIpdRemSnooze = function (key) { snoozed[key] = Date.now() + SNOOZE_MS; saveSnooze(); tick(); };
  window.bmhIpdRemHide = function () { var b = document.getElementById('bmh-ipd-rem'); snoozed.__all = Date.now() + SNOOZE_MS; saveSnooze(); if (b) b.remove(); };
  window.bmhIpdRemOpen = function (id) {
    try { if (typeof nav === 'function') nav('ipd', document.querySelector('.ni[onclick*="nav(\'ipd\'"]')); } catch (e) {}
    var go = function () {
      try {
        if (typeof openIPDNursingWorkflow === 'function' && (window.IPD_PATIENTS || []).some(function (x) { return x.id === id; })) openIPDNursingWorkflow(id);
        else if (typeof loadIPDPatientsFromFirebase === 'function') loadIPDPatientsFromFirebase({ force: true }).then(function () { try { openIPDNursingWorkflow(id); } catch (e) {} });
      } catch (e) {}
    };
    setTimeout(go, 300);
  };
  var busy = false;
  function tick() {
    if (busy) return;
    if (!hasIpdAccess()) { var b = document.getElementById('bmh-ipd-rem'); if (b) b.remove(); return; }
    if (snoozed.__all && Date.now() < snoozed.__all) return;
    busy = true;
    fetchList().then(function (list) {
      var now = Date.now(), all = [];
      list.forEach(function (p) { all = all.concat(alertsFor(p)); });
      all = all.filter(function (a) { return !(snoozed[a.key] && now < snoozed[a.key]); }).sort(function (a, b) { return a.sort - b.sort; });
      var fresh = all.some(function (a) { return !seen[a.key]; });
      all.forEach(function (a) { seen[a.key] = 1; });
      render(all);
      if (fresh && document.visibilityState === 'visible') beep();
      if (fresh && document.visibilityState !== 'visible' && window.Notification && Notification.permission === 'granted') {
        try { new Notification('BMH — IPD rounds', { body: all.slice(0, 3).map(function (a) { return (a.p.name || '') + ': ' + a.text; }).join('\n'), tag: 'bmh-ipd-rem' }); } catch (e) {}
      }
    }).catch(function () {}).then(function () { busy = false; });
  }
  function start() { if (timer) return; setTimeout(tick, 8000); timer = setInterval(tick, POLL_MS); document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') tick(); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.bmhIpdReminders = { tick: tick, alertsFor: alertsFor };
})();
