/* BMH — Money change log: every change to a receipt after it was made is written down, with who and when.
 * When a receipt (transactions/<day>/<id>) is deleted, its amount changes, its payment mode changes, it is marked not
 * collected or marked as a refund — on any screen — the computer that made the change writes a line at
 * moneyChanges/<today>/: who, when, patient, what changed (old → new). New refunds are written down too.
 * The department day summary print (Reception → Charges) lists that department's lines, so reception knows every
 * change is visible. This file only watches and writes the log: the change itself goes through exactly as before.
 * Off switch (this browser): localStorage.setItem('bmh_money_log_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_money_log_off') === '1') return; } catch (e) {}
  var RE = /^transactions\/(\d{4}-\d{2}-\d{2})(?:\/([^/]+))?(?:\/(.+))?$/;
  var LOCAL = {}, PREV = {}, ADDED = {}, TODAY_LOG = {}, curDay = '', dayRef = null, logRef = null;
  function today() { try { return todayKey(); } catch (e) { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); } }
  function me() { try { return CURRENT_USER || {}; } catch (e) { return window.CURRENT_USER || {}; } }
  function clone(v) { try { return v == null ? null : JSON.parse(JSON.stringify(v)); } catch (e) { return null; } }
  function net(t) { if (!t) return 0; try { return Number(getNetTransactionAmount(t)) || 0; } catch (e) { return Number(t.amount) || 0; } }
  function rs(n) { return '₹' + Math.round(Number(n || 0)).toLocaleString('en-IN'); }
  function recent(day, id) { var n = Date.now(); return (LOCAL[day + '/' + id] && n - LOCAL[day + '/' + id] < 60000) || (LOCAL[day + '/*'] && n - LOCAL[day + '/*'] < 60000); }

  // what changed between two copies of a receipt (null = deleted)
  function diff(a, b) {
    if (!a) return [];
    if (!b) return ['Deleted receipt of ' + rs(net(a))];
    var w = [], na = net(a), nb = net(b);
    if (Math.round(na) !== Math.round(nb)) w.push('Amount ' + rs(na) + ' → ' + rs(nb));
    if (String(a.mode || '') !== String(b.mode || '')) w.push('Mode ' + (a.mode || '—') + ' → ' + (b.mode || '—'));
    if (a.collected !== false && b.collected === false) w.push('Marked not collected');
    if (a.collected === false && b.collected !== false) w.push('Marked collected');
    if (!a.isRefund && b.isRefund) w.push('Marked as refund');
    return w;
  }
  function write(a, b, what, day, id) {
    if (!what.length || !window.FBDB) return;
    var t = b || a || {}, u = me(), at = new Date().toISOString();
    var row = { at: at, by: u.name || u.username || '', role: u.role || '', txnId: String(id || t.id || ''), receiptDay: day,
      bmhId: t.bmhId || '', patient: t.patient || t.patientName || '', service: String(t.service || t.for || '').slice(0, 120),
      dept: (a || b || {}).dept || '', centre: (a || b || {}).centre || '', what: what, from: a ? net(a) : 0, to: b ? net(b) : 0 };
    try { window.FBDB.ref('moneyChanges/' + today()).push(row).catch(function () {}); } catch (e) {}
  }

  // every save in the HMS goes through these three methods: note which receipts this computer is changing
  function pathOf(ref) { try { var u = ref.toString(), r = ref.root.toString(); return decodeURIComponent(u.slice(r.length)).replace(/^\/+|\/+$/g, ''); } catch (e) { return ''; } }
  function note(path, op, data) {
    if (path === '' && op === 'update' && data && typeof data === 'object') { Object.keys(data).forEach(function (k) { note(k.replace(/^\/+|\/+$/g, ''), 'set', data[k]); }); return; }
    var m = path.match(RE); if (!m) return;
    var day = m[1], id = m[2], field = m[3];
    if (!id) {
      LOCAL[day + '/*'] = Date.now();
      if (op === 'update' && data && typeof data === 'object') Object.keys(data).forEach(function (k) { note('transactions/' + day + '/' + k.replace(/^\/+/, ''), 'set', data[k]); });
      return;
    }
    LOCAL[day + '/' + id] = Date.now();
    if (day !== curDay) pastDay(day, id, field, op, data);
  }
  // a receipt of an earlier day: compare with the copy Bills & History already holds
  function pastDay(day, id, field, op, data) {
    setTimeout(function () {
      try {
        var S = window.bmhBillsHistory && window.bmhBillsHistory.state, rows = S && S.cache && S.cache.get(day);
        var a = (rows || []).filter(function (r) { return r && (r._key === id || String(r.id) === id); })[0];
        if (!a) { if (op === 'remove' || (op === 'set' && data == null && !field)) write({ id: id, dept: '', amount: 0 }, null, ['Deleted a receipt of ' + day], day, id); return; }
        var b;
        if (op === 'remove' && !field) b = null;
        else if (!field) b = op === 'update' ? Object.assign(clone(a), data || {}) : (data == null ? null : clone(data));
        else { b = clone(a); var ks = field.split('/'), o = b; for (var i = 0; i < ks.length - 1; i++) { o = o[ks[i]] = o[ks[i]] && typeof o[ks[i]] === 'object' ? o[ks[i]] : {}; } if (op === 'remove' || data == null) delete o[ks[ks.length - 1]]; else if (op === 'update') o[ks[ks.length - 1]] = Object.assign({}, o[ks[ks.length - 1]] || {}, data); else o[ks[ks.length - 1]] = clone(data); }
        var w = diff(a, b); if (w.length) write(a, b, w.map(function (x) { return x + ' (receipt of ' + day + ')'; }), day, id);
      } catch (e) {}
    }, 0);
  }
  function patch() {
    try {
      var P = window.firebase && firebase.database && firebase.database.Reference && firebase.database.Reference.prototype;
      if (!P || P._bmhMoneyLog) return !!P;
      ['set', 'update', 'remove'].forEach(function (name) {
        var orig = P[name]; if (typeof orig !== 'function') return;
        P[name] = function (data) { try { note(pathOf(this), name, data); } catch (e) {} return orig.apply(this, arguments); };
      });
      P._bmhMoneyLog = true; return true;
    } catch (e) { return false; }
  }

  // today's receipts: keep the last confirmed copy of each, and log changes this computer made
  function watchDay() {
    var d = today(); if (d === curDay || !window.FBDB) return;
    try { if (dayRef) dayRef.off(); if (logRef) logRef.off(); } catch (e) {}
    curDay = d; PREV = {}; ADDED = {}; TODAY_LOG = {};
    dayRef = window.FBDB.ref('transactions/' + d);
    var ready = false;
    dayRef.once('value').then(function () { ready = true; }).catch(function () { ready = true; });
    dayRef.on('child_added', function (s) {
      var v = s.val(); PREV[s.key] = clone(v); if (ready) ADDED[s.key] = Date.now();
      if (ready && v && (v.isRefund || net(v) < 0) && recent(d, s.key)) write(null, v, ['Refund of ' + rs(Math.abs(net(v)))], d, s.key);
    }, function () {});
    dayRef.on('child_changed', function (s) {
      var v = s.val(), a = PREV[s.key]; PREV[s.key] = clone(v);
      // a receipt still being completed in its first minute (split / concession while saving) is not a later change
      if (a && recent(d, s.key) && !(ADDED[s.key] && Date.now() - ADDED[s.key] < 60000)) write(a, v, diff(a, v), d, s.key);
    }, function () {});
    dayRef.on('child_removed', function (s) {
      var a = PREV[s.key] || s.val(); delete PREV[s.key];
      if (a && recent(d, s.key)) write(a, null, diff(a, null), d, s.key);
    }, function () {});
    logRef = window.FBDB.ref('moneyChanges/' + d);
    logRef.on('value', function (s) { TODAY_LOG = s.val() || {}; }, function () {});
  }
  // for the department day summary print
  window.bmhMoneyChangesToday = function (dept) {
    var dk = function (v) { try { return normalizeDeptKeyForQueue(v || ''); } catch (e) { return String(v || '').toLowerCase(); } };
    return Object.keys(TODAY_LOG).map(function (k) { return TODAY_LOG[k]; }).filter(function (r) { return r && (!dept || dk(r.dept) === dept || !r.dept); })
      .sort(function (a, b) { return String(a.at).localeCompare(String(b.at)); });
  };
  patch();
  var tries = 0, iv = setInterval(function () {
    var ok = patch();
    if (window.FBDB) watchDay();
    if ((ok && window.FBDB) || ++tries > 60) clearInterval(iv);
  }, 1000);
  setInterval(function () { try { watchDay(); } catch (e) {} }, 60000);
})();
