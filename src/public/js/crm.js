/* BMH — Leads / CRM (menu "📣 Leads / CRM").
 *
 *  Tabs
 *   • Leads — enquiries from WhatsApp / phone calls / walk-ins (which ad or post they came from), status
 *     new → contacted → appointment booked → visited → surgery / converted, or lost; follow-up date; activity log.
 *     "Book" creates a normal appointment (shows in the Appointment Book, carrying the lead + source).
 *     A lead is linked to its patient automatically by phone number once registered.
 *   • Social appointments — appointments whose source is social media / online / a lead.
 *   • Ads — the hospital's Meta (Facebook / Instagram) ads as saved by the daily sync (metaAds node):
 *     status, reach, impressions, clicks, CTR, leads; click an ad for its trend, demographics (age, gender, region),
 *     targeting and the HMS funnel of its leads (booked → visited → surgery).
 *   • Dashboard — totals, funnel, leads by source, latest activities.
 *  Money (ad spend, CPC, cost per lead, revenue, ROI) is shown to ADMIN only. Reception sees leads, appointments and ads
 *  without any spending or revenue.
 *  Revenue for ROI = all collected billing of the lead's patient for 90 days from the lead (refunds subtracted), read
 *  only from transactions/<day> (loaded on request, past days cached on this computer).
 */
(function () {
  'use strict';
  var REV_DAYS = 90, LEAD_DAYS = 180;
  var SOURCES = ['WhatsApp', 'Phone call', 'Instagram', 'Facebook', 'Walk-in', 'Website', 'Google', 'Referral', 'Other'];
  var STATUS = [
    { k: 'new', l: 'New', c: '#2563eb' }, { k: 'contacted', l: 'Contacted', c: '#7c3aed' }, { k: 'booked', l: 'Appointment booked', c: '#d97706' },
    { k: 'visited', l: 'Visited', c: '#0891b2' }, { k: 'converted', l: 'Surgery / converted', c: '#16a34a' }, { k: 'lost', l: 'Lost', c: '#6b7280' }
  ];
  var DEPTS = [['ophtho', 'Eye'], ['obg', 'OBG'], ['psych', 'Psychiatry'], ['skin', 'Skin'], ['general', 'General']];
  var DOCS = { ophtho: 'Dr. Varun Baweja', obg: 'Dr. Namrata Baweja', psych: 'Dr. Tarun Baweja', skin: 'Dr. Pooja Baweja' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ja(s) { return esc(String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function role() { try { return String((CURRENT_USER && CURRENT_USER.role) || '').toLowerCase(); } catch (e) { return ''; } }
  function isAdmin() { try { return !!(CURRENT_USER && (CURRENT_USER.isAdmin || role() === 'admin')); } catch (e) { return false; } }
  function canSee() { return isAdmin() || role() === 'reception'; }
  function who() { try { return (CURRENT_USER && CURRENT_USER.name) || 'Staff'; } catch (e) { return 'Staff'; } }
  function digits(s) { return String(s || '').replace(/\D/g, '').slice(-10); }
  function money(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function num(n) { return Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function pct(n) { return (isFinite(n) ? (Math.round(n * 10) / 10) : 0) + '%'; }
  function dkey(d) { try { return localDateKey(d); } catch (e) { var x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0'); } }
  function today() { return dkey(new Date()); }
  function fmtD(v) { var d = new Date(v); return isNaN(d) ? String(v || '') : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }); }
  function fmtDT(v) { var d = new Date(v); return isNaN(d) ? '' : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }
  function stat(k) { return STATUS.find(function (s) { return s.k === k; }) || STATUS[0]; }
  function deptL(k) { var d = DEPTS.find(function (x) { return x[0] === k; }); return d ? d[1] : (k || ''); }
  function centre() { try { var c = getEffectiveCentre(); return c || (CURRENT_USER && CURRENT_USER.centre) || 'CHD'; } catch (e) { return 'CHD'; } }

  var S = { tab: 'leads', leads: {}, leadsOn: false, ads: {}, adsMeta: null, adsOn: false, q: '', status: 'open', src: '', adSel: '', edit: null, rev: null, revLoading: '', links: {}, period: 30 };

  // ───────── data ─────────
  function startLeads() {
    if (S.leadsOn || !window.FBDB) return;
    S.leadsOn = true;
    var q = window.FBDB.ref('crmLeads').orderByKey().startAt('L' + (Date.now() - LEAD_DAYS * 86400e3));
    var on = function (s) { var v = s.val(); if (v) { v.id = v.id || s.key; S.leads[s.key] = v; } schedule(); };
    q.on('child_added', on); q.on('child_changed', on);
    q.on('child_removed', function (s) { delete S.leads[s.key]; schedule(); });
  }
  function startAds() {
    if (S.adsOn || !window.FBDB) return;
    S.adsOn = true;
    window.FBDB.ref('metaAds/meta').on('value', function (s) { S.adsMeta = s.val(); schedule(); });
    window.FBDB.ref('metaAds/ads').on('value', function (s) { S.ads = s.val() || {}; schedule(); });
  }
  function saveLead(l) {
    l.updatedAt = new Date().toISOString();
    S.leads[l.id] = l;
    var clean = l; try { clean = sanitizeFirebaseValue(l); } catch (e) {}
    try { window.FBDB.ref('crmLeads/' + l.id).set(clean).catch(function (e) { console.warn(e); toast('Lead not saved — check connection', 'w'); }); } catch (e) {}
    schedule();
  }
  function act(l, type, text) { l.activities = Array.isArray(l.activities) ? l.activities : []; l.activities.push({ at: new Date().toISOString(), by: who(), type: type, text: text || '' }); }
  function leadList() { return Object.keys(S.leads).map(function (k) { return S.leads[k]; }).filter(Boolean).sort(function (a, b) { return String(b.createdAt || '').localeCompare(String(a.createdAt || '')); }); }
  function adList() { return Object.keys(S.ads || {}).map(function (k) { var a = S.ads[k] || {}; a.id = a.id || k; return a; }).sort(function (a, b) { return (Number(b.spend) || 0) - (Number(a.spend) || 0) || String(b.created || '').localeCompare(String(a.created || '')); }); }

  // link a lead to its patient by phone (registered patients) — small indexed lookups, once per lead per session
  function linkPatients() {
    if (!window.FBDB) return;
    leadList().forEach(function (l) {
      var ph = digits(l.phone); if (l.bmhId || ph.length < 10 || S.links[l.id]) return;
      S.links[l.id] = 1;
      var local = null; try { local = (PATIENTS || []).find(function (p) { return digits(p.phone || p.mobile || p.mob) === ph; }); } catch (e) {}
      var use = function (p, id) {
        if (!p) return;
        var reg = Date.parse(p.regDate || p.createdAt || '') || 0, lv = Date.parse(p.lastVisitDate || p.visitDate || '') || 0, la = Date.parse(l.createdAt || '') || 0;
        l.bmhId = id || p.bmhId; l.patientName = p.name || l.name;
        if (['new', 'contacted', 'booked'].indexOf(l.status) >= 0 && Math.max(reg, lv) >= la - 86400e3) { l.status = 'visited'; act(l, 'auto', 'Registered / visited — ' + (l.bmhId || '')); }
        else act(l, 'auto', 'Linked to patient ' + (l.bmhId || ''));
        saveLead(l);
      };
      if (local) { use(local, local.bmhId); return; }
      window.FBDB.ref('patients').orderByChild('phoneSearch').equalTo(ph).limitToFirst(1).once('value').then(function (s) {
        var v = s.val(); if (!v) return; var id = Object.keys(v)[0]; use(v[id], id);
      }).catch(function () {});
    });
  }
  function otFor(bmhId, sinceIso) {
    var since = Date.parse(sinceIso || '') || 0;
    try { return (window.OT_CASES || OT_CASES || []).filter(function (c) { return c && c.bmhId === bmhId && (Date.parse(c.date || c.surgeryDate || c.createdAt || '') || 0) >= since - 86400e3; }); } catch (e) { return []; }
  }
  function funnel(leads) {
    var f = { leads: leads.length, contacted: 0, booked: 0, visited: 0, converted: 0, lost: 0 };
    leads.forEach(function (l) {
      var s = l.status, rank = { new: 0, contacted: 1, booked: 2, visited: 3, converted: 4, lost: -1 }[s];
      if (s === 'lost') f.lost++;
      if (rank >= 1 || l.contactedAt) f.contacted++;
      if (rank >= 2 || l.appointmentId) f.booked++;
      if (rank >= 3) f.visited++;
      if (rank >= 4 || (l.bmhId && otFor(l.bmhId, l.createdAt).length)) f.converted++;
    });
    return f;
  }

  // ───────── revenue (admin, on request) ─────────
  var idbP = null;
  function idb() { if (idbP) return idbP; idbP = new Promise(function (res) { try { var r = indexedDB.open('bmh-crm-txn', 1); r.onupgradeneeded = function () { r.result.createObjectStore('d'); }; r.onsuccess = function () { res(r.result); }; r.onerror = function () { res(null); }; } catch (e) { res(null); } }); return idbP; }
  function idbGet(k) { return idb().then(function (db) { if (!db) return null; return new Promise(function (res) { try { var q = db.transaction('d').objectStore('d').get(k); q.onsuccess = function () { res(q.result || null); }; q.onerror = function () { res(null); }; } catch (e) { res(null); } }); }); }
  function idbPut(k, v) { return idb().then(function (db) { if (db) try { db.transaction('d', 'readwrite').objectStore('d').put(v, k); } catch (e) {} }); }
  function txAmt(t) { try { return getNetTransactionAmount(t); } catch (e) { return Number(t.amount) || 0; } }
  function loadRevenue() {
    if (!isAdmin() || !window.FBDB || S.revLoading) return;
    var leads = leadList().filter(function (l) { return l.bmhId; });
    if (!leads.length) { S.rev = { byLead: {}, at: Date.now() }; draw(); return; }
    var first = leads.reduce(function (m, l) { var t = Date.parse(l.createdAt || '') || Date.now(); return Math.min(m, t); }, Date.now());
    var days = []; for (var t = new Date(dkey(first) + 'T00:00:00').getTime(); t <= Date.now(); t += 86400e3) days.push(dkey(t));
    var ids = {}; leads.forEach(function (l) { ids[l.bmhId] = 1; });
    var rows = [], i = 0, done = 0, recent = dkey(Date.now() - 2 * 86400e3);
    S.revLoading = '0 / ' + days.length + ' days'; draw();
    var one = function (d) {
      var net = function () { return window.FBDB.ref('transactions/' + d).once('value').then(function (s) { var v = s.val() || {}; var r = Object.keys(v).map(function (k) { var x = v[k] || {}; return { bmhId: x.bmhId || x.patientId || '', amount: txAmt(x), refund: x.isRefund === true, collected: x.collected !== false, day: d }; }); if (d < recent) idbPut(d, r); return r; }); };
      return (d < recent ? idbGet(d).then(function (c) { return c || net(); }) : net()).then(function (r) { rows = rows.concat(r.filter(function (x) { return ids[x.bmhId]; })); });
    };
    var worker = function () { if (i >= days.length) return Promise.resolve(); var d = days[i++]; return one(d).catch(function () {}).then(function () { done++; if (done % 10 === 0) { S.revLoading = done + ' / ' + days.length + ' days'; draw(); } return worker(); }); };
    Promise.all([0, 1, 2, 3].map(worker)).then(function () {
      var by = {};
      leads.forEach(function (l) {
        var from = dkey(l.createdAt || Date.now()), to = dkey((Date.parse(l.createdAt || '') || Date.now()) + REV_DAYS * 86400e3);
        by[l.id] = rows.filter(function (x) { return x.bmhId === l.bmhId && x.day >= from && x.day <= to && x.collected; }).reduce(function (s, x) { return s + (x.refund ? -Math.abs(x.amount) : x.amount); }, 0);
      });
      S.rev = { byLead: by, at: Date.now() }; S.revLoading = ''; draw();
    });
  }
  function revOf(leads) { if (!S.rev) return null; return leads.reduce(function (s, l) { return s + (S.rev.byLead[l.id] || 0); }, 0); }

  // ───────── helpers for ads ─────────
  function adOf(l) { return l.adId && S.ads[l.adId] ? S.ads[l.adId] : null; }
  function leadsForAd(ad) { return leadList().filter(function (l) { return l.adId === ad.id; }); }
  function metaLeads(a) { return Number(a.leads) || 0; }
  function bars(rows, max, color, fmt) {
    max = max || Math.max.apply(null, rows.map(function (r) { return r[1]; }).concat([1]));
    return rows.map(function (r) { var w = max ? Math.max(1, Math.round(r[1] / max * 100)) : 0; return '<div style="display:grid;grid-template-columns:120px 1fr 70px;gap:6px;align-items:center;margin:3px 0;font-size:11.5px"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(r[0]) + '</span><div style="background:#eef2f7;border-radius:5px;height:12px"><div style="width:' + w + '%;height:12px;border-radius:5px;background:' + (r[2] || color || '#1A3C6E') + '"></div></div><b style="text-align:right">' + (fmt ? fmt(r[1]) : num(r[1])) + '</b></div>'; }).join('');
  }
  function line(points, key, color, h) {
    h = h || 90; if (!points.length) return '<div class="crm-mut">No daily figures yet.</div>';
    var W = 520, max = Math.max.apply(null, points.map(function (p) { return Number(p[key]) || 0; }).concat([1]));
    var step = points.length > 1 ? W / (points.length - 1) : W;
    var path = points.map(function (p, i) { return (i ? 'L' : 'M') + (i * step).toFixed(1) + ' ' + (h - (Number(p[key]) || 0) / max * (h - 10)).toFixed(1); }).join(' ');
    return '<svg viewBox="0 0 ' + W + ' ' + (h + 16) + '" style="width:100%;height:auto"><path d="' + path + '" fill="none" stroke="' + color + '" stroke-width="2.2"/>'
      + '<text x="0" y="' + (h + 13) + '" font-size="10" fill="#667085">' + esc(fmtD(points[0].date)) + '</text><text x="' + W + '" y="' + (h + 13) + '" font-size="10" fill="#667085" text-anchor="end">' + esc(fmtD(points[points.length - 1].date)) + '</text>'
      + '<text x="2" y="10" font-size="10" fill="#667085">max ' + esc(num(max)) + '</text></svg>';
  }

  // ───────── page ─────────
  var CSS = '<style id="crm-css">#pg-crm .crm-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}#pg-crm .crm-tab{padding:7px 14px;border-radius:20px;border:1px solid #d6dce8;background:#fff;font-weight:800;font-size:12.5px;cursor:pointer}#pg-crm .crm-tab.on{background:#1A3C6E;color:#fff;border-color:#1A3C6E}'
    + '#pg-crm .crm-card{background:#fff;border:1px solid #e3e8f2;border-radius:14px;padding:12px;margin-bottom:12px}#pg-crm .crm-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-bottom:12px}#pg-crm .crm-kpi{background:#fff;border:1px solid #e3e8f2;border-radius:12px;padding:10px}#pg-crm .crm-kpi b{display:block;font-size:20px;color:#1A3C6E}#pg-crm .crm-kpi span{font-size:11px;color:#667085;font-weight:700}'
    + '#pg-crm table{width:100%;border-collapse:collapse;font-size:12px}#pg-crm th{text-align:left;font-size:10.5px;color:#52627a;background:#f4f7fb;padding:6px;border-bottom:1px solid #e3e8f2}#pg-crm td{padding:6px;border-bottom:1px solid #f0f2f6;vertical-align:top}#pg-crm tr.crm-click{cursor:pointer}#pg-crm tr.crm-click:hover{background:#f8fafc}'
    + '#pg-crm .crm-mut{font-size:11px;color:#667085}#pg-crm .crm-pill{display:inline-block;padding:1px 8px;border-radius:10px;font-size:10.5px;font-weight:800;color:#fff}#pg-crm .crm-in{padding:7px 8px;border:1px solid #d6dce8;border-radius:8px;font-size:12.5px;box-sizing:border-box}'
    + '#pg-crm .crm-bar select.crm-in{width:auto;flex:0 0 auto}#pg-crm .crm-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}@media(max-width:900px){#pg-crm .crm-grid2{grid-template-columns:1fr}}</style>';
  function ensurePage() {
    var pg = document.getElementById('pg-crm');
    if (!pg) { pg = document.createElement('div'); pg.className = 'page'; pg.id = 'pg-crm'; var any = document.getElementById('pg-reports') || document.querySelector('.page'); if (any && any.parentNode) any.parentNode.insertBefore(pg, any); else document.body.appendChild(pg); }
    if (!document.getElementById('crm-css')) document.head.insertAdjacentHTML('beforeend', CSS);
    return pg;
  }
  var t0 = null;
  function schedule() { clearTimeout(t0); t0 = setTimeout(draw, 120); }
  function tabs() {
    var t = [['leads', '📇 Leads'], ['appts', '📅 Social appointments'], ['ads', '📣 Ads'], ['dash', '📊 Dashboard']];
    return '<div class="crm-tabs">' + t.map(function (x) { return '<button type="button" class="crm-tab' + (S.tab === x[0] ? ' on' : '') + '" onclick="bmhCrm.tab(\'' + x[0] + '\')">' + x[1] + '</button>'; }).join('') + '</div>';
  }
  function draw() {
    var pg = document.getElementById('pg-crm'); if (!pg || !pg.classList.contains('active')) return;
    if (!canSee()) { pg.innerHTML = '<div class="crm-card">Leads / CRM is available to admin and reception logins.</div>'; return; }
    var h = tabs();
    if (S.tab === 'leads') h += leadsHtml();
    else if (S.tab === 'appts') h += apptsHtml();
    else if (S.tab === 'ads') h += S.adSel ? adDetailHtml(S.adSel) : adsHtml();
    else h += dashHtml();
    var keep = document.activeElement && document.activeElement.id === 'crm-q' ? document.activeElement.selectionStart : null;
    pg.innerHTML = '<div style="padding:12px">' + h + '</div>';
    if (keep != null) { var q = document.getElementById('crm-q'); if (q) { q.focus(); try { q.setSelectionRange(keep, keep); } catch (e) {} } }
  }

  // leads tab
  function filteredLeads() {
    var q = S.q.toLowerCase();
    return leadList().filter(function (l) {
      if (S.status === 'open' && (l.status === 'lost' || l.status === 'converted')) return false;
      if (S.status && S.status !== 'open' && S.status !== 'all' && l.status !== S.status) return false;
      if (S.src && l.source !== S.src) return false;
      if (q && [l.name, l.phone, l.source, l.adName, l.notes, l.bmhId, l.interest].join(' ').toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
  }
  function adOptions(sel) {
    var ads = adList();
    return '<option value="">— none / not known —</option>' + ads.map(function (a) { return '<option value="' + esc(a.id) + '"' + (a.id === sel ? ' selected' : '') + '>' + esc((a.name || a.id) + (a.campaign ? ' · ' + a.campaign : '')) + '</option>'; }).join('');
  }
  function leadsHtml() {
    var rows = filteredLeads(), dueToday = leadList().filter(function (l) { return l.followUp && l.followUp <= today() && ['lost', 'converted'].indexOf(l.status) < 0; }).length;
    var h = '<div class="crm-card"><div class="crm-bar" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">'
      + '<button type="button" class="btn btn-gold btn-sm" onclick="bmhCrm.newLead()">+ New lead</button>'
      + '<input id="crm-q" class="crm-in" style="flex:1;min-width:180px" placeholder="Search name, phone, ad, notes…" value="' + esc(S.q) + '" oninput="bmhCrm.q(this.value)">'
      + '<select class="crm-in" onchange="bmhCrm.f(\'status\',this.value)"><option value="open"' + (S.status === 'open' ? ' selected' : '') + '>Open leads</option><option value="all"' + (S.status === 'all' ? ' selected' : '') + '>All</option>' + STATUS.map(function (s) { return '<option value="' + s.k + '"' + (S.status === s.k ? ' selected' : '') + '>' + s.l + '</option>'; }).join('') + '</select>'
      + '<select class="crm-in" onchange="bmhCrm.f(\'src\',this.value)"><option value="">All sources</option>' + SOURCES.map(function (s) { return '<option' + (S.src === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>'
      + (dueToday ? '<span style="font-size:12px;font-weight:900;color:#b45309">⏰ ' + dueToday + ' follow-up' + (dueToday === 1 ? '' : 's') + ' due</span>' : '')
      + '</div></div>';
    if (S.edit) h += leadForm(S.edit);
    h += '<div class="crm-card" style="overflow:auto"><table><thead><tr><th>Lead</th><th>Source / ad</th><th>Interest</th><th>Status</th><th>Follow-up</th><th>Appointment</th><th></th></tr></thead><tbody>'
      + (rows.length ? rows.map(function (l) {
        var s = stat(l.status), due = l.followUp && l.followUp <= today() && ['lost', 'converted'].indexOf(l.status) < 0;
        return '<tr><td><b>' + esc(l.name || '—') + '</b><div class="crm-mut">' + esc(l.phone || '') + (l.bmhId ? ' · ' + esc(l.bmhId) : '') + '</div><div class="crm-mut">' + esc(fmtDT(l.createdAt)) + '</div></td>'
          + '<td>' + esc(l.source || '') + (l.adName ? '<div class="crm-mut">📣 ' + esc(l.adName) + '</div>' : '') + '</td>'
          + '<td>' + esc(deptL(l.dept)) + (l.interest ? '<div class="crm-mut">' + esc(l.interest) + '</div>' : '') + '</td>'
          + '<td><span class="crm-pill" style="background:' + s.c + '">' + s.l + '</span></td>'
          + '<td' + (due ? ' style="color:#b45309;font-weight:900"' : '') + '>' + esc(l.followUp ? fmtD(l.followUp) : '') + '</td>'
          + '<td>' + (l.appointmentDate ? esc(fmtD(l.appointmentDate)) + (l.appointmentTime ? ' ' + esc(l.appointmentTime) : '') : '') + '</td>'
          + '<td style="white-space:nowrap"><button type="button" class="btn btn-xs btn-outline" onclick="bmhCrm.editLead(\'' + ja(l.id) + '\')">Open</button> '
          + (l.phone ? '<a class="btn btn-xs btn-outline" href="tel:' + esc(digits(l.phone)) + '" onclick="bmhCrm.called(\'' + ja(l.id) + '\')">📞</a> <a class="btn btn-xs btn-outline" target="_blank" rel="noopener" href="https://wa.me/91' + esc(digits(l.phone)) + '" onclick="bmhCrm.called(\'' + ja(l.id) + '\',1)">💬</a> ' : '')
          + (['booked', 'visited', 'converted', 'lost'].indexOf(l.status) < 0 ? '<button type="button" class="btn btn-xs btn-gold" onclick="bmhCrm.book(\'' + ja(l.id) + '\')">Book</button>' : '') + '</td></tr>';
      }).join('') : '<tr><td colspan="7" class="crm-mut" style="padding:14px">No leads here yet. Add WhatsApp / phone enquiries with “+ New lead”.</td></tr>')
      + '</tbody></table></div>';
    return h;
  }
  function leadForm(l) {
    var isNew = !S.leads[l.id];
    var dOpts = DEPTS.map(function (d) { return '<option value="' + d[0] + '"' + (l.dept === d[0] ? ' selected' : '') + '>' + d[1] + '</option>'; }).join('');
    var h = '<div class="crm-card" style="border-color:#f0d68a;background:#fffdf5"><div style="font-weight:900;margin-bottom:8px">' + (isNew ? 'New lead' : 'Lead — ' + esc(l.name || '')) + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px">'
      + '<input id="crm-f-name" class="crm-in" placeholder="Name" value="' + esc(l.name || '') + '">'
      + '<input id="crm-f-phone" class="crm-in" placeholder="Phone" inputmode="tel" value="' + esc(l.phone || '') + '">'
      + '<select id="crm-f-source" class="crm-in">' + SOURCES.map(function (s) { return '<option' + ((l.source || 'WhatsApp') === s ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>'
      + '<select id="crm-f-ad" class="crm-in" title="Which ad / post did they see?">' + adOptions(l.adId) + '</select>'
      + '<input id="crm-f-post" class="crm-in" placeholder="Post / ad seen (if not in the list)" value="' + esc(l.adId ? '' : (l.adName || '')) + '">'
      + '<select id="crm-f-dept" class="crm-in">' + dOpts + '</select>'
      + '<input id="crm-f-interest" class="crm-in" placeholder="Interest (e.g. cataract, LASIK, IVF)" value="' + esc(l.interest || '') + '">'
      + '<select id="crm-f-status" class="crm-in">' + STATUS.map(function (s) { return '<option value="' + s.k + '"' + ((l.status || 'new') === s.k ? ' selected' : '') + '>' + s.l + '</option>'; }).join('') + '</select>'
      + '<label class="crm-mut" style="display:flex;flex-direction:column">Follow-up date<input id="crm-f-fu" type="date" class="crm-in" value="' + esc(l.followUp || '') + '"></label>'
      + '<select id="crm-f-centre" class="crm-in"><option value="CHD"' + ((l.centre || centre()) === 'CHD' ? ' selected' : '') + '>Chandigarh</option><option value="RPR"' + ((l.centre || centre()) === 'RPR' ? ' selected' : '') + '>Ropar</option></select>'
      + '</div><textarea id="crm-f-notes" class="crm-in" style="width:100%;margin-top:8px;min-height:54px" placeholder="Notes (what they asked, when to call back…)">' + esc(l.notes || '') + '</textarea>'
      + '<input id="crm-f-lost" class="crm-in" style="width:100%;margin-top:6px" placeholder="If lost: reason (cost, distance, went elsewhere…)" value="' + esc(l.lostReason || '') + '">'
      + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px"><button type="button" class="btn btn-gray btn-sm" onclick="bmhCrm.cancel()">Close</button><button type="button" class="btn btn-gold btn-sm" onclick="bmhCrm.saveForm()">Save lead</button></div>';
    if (!isNew && Array.isArray(l.activities) && l.activities.length) h += '<div style="margin-top:10px;border-top:1px solid #f0e6c8;padding-top:6px"><div class="crm-mut" style="font-weight:900">Activity</div>' + l.activities.slice().reverse().slice(0, 12).map(function (a) { return '<div style="font-size:11.5px;padding:2px 0">' + esc(fmtDT(a.at)) + ' · <b>' + esc(a.by || '') + '</b> — ' + esc(a.text || a.type) + '</div>'; }).join('') + '</div>';
    return h + '</div>';
  }

  // social appointments tab
  function apptsHtml() {
    var list = []; try { list = (typeof APPOINTMENTS !== 'undefined' ? APPOINTMENTS : (window.APPOINTMENTS || [])).slice(); } catch (e) { list = (window.APPOINTMENTS || []).slice(); }
    var from = dkey(Date.now() - 30 * 86400e3);
    list = list.filter(function (a) {
      var src = ''; try { src = getAppointmentSourceLabel(a); } catch (e) { src = a.source || ''; }
      var d = String(a.date || '').slice(0, 10);
      return d >= from && (a.leadId || /social|website|whatsapp|google|online|instagram|facebook/i.test(src + ' ' + (a.source || '') + ' ' + (a.leadSource || '')));
    }).sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
    return '<div class="crm-card"><div style="font-weight:900;margin-bottom:6px">Appointments from social media / online / leads <span class="crm-mut">(last 30 days and upcoming)</span></div><div style="overflow:auto"><table><thead><tr><th>Date</th><th>Patient</th><th>Doctor</th><th>Source</th><th>Ad / lead</th><th>Status</th></tr></thead><tbody>'
      + (list.length ? list.map(function (a) {
        var src = ''; try { src = getAppointmentSourceLabel(a); } catch (e) { src = a.source || ''; }
        var l = a.leadId && S.leads[a.leadId];
        return '<tr><td>' + esc(fmtD(a.date)) + ' ' + esc(a.time || '') + '</td><td><b>' + esc(a.patient || a.leadName || '') + '</b><div class="crm-mut">' + esc(a.mob || a.leadPhone || '') + (a.bmhId && a.bmhId !== '—' ? ' · ' + esc(a.bmhId) : '') + '</div></td><td>' + esc(a.doctor || '') + '</td><td>' + esc(a.leadSource || src) + '</td><td>' + esc((l && l.adName) || '') + '</td><td>' + esc(a.status || 'booked') + '</td></tr>';
      }).join('') : '<tr><td colspan="6" class="crm-mut" style="padding:14px">No social / online appointments in the last 30 days.</td></tr>') + '</tbody></table></div></div>';
  }

  // ads tab
  function syncNote() {
    var m = S.adsMeta;
    return '<div class="crm-mut" style="margin-bottom:8px">' + (m && m.syncedAt ? 'Meta Ads figures updated ' + esc(fmtDT(m.syncedAt)) + (m.account ? ' · account ' + esc(m.account) : '') : 'Meta Ads are not connected yet — the daily sync fills this list once it is set up. Leads and appointments work already.') + '</div>';
  }
  function adsHtml() {
    var ads = adList(), adm = isAdmin();
    var h = '<div class="crm-card">' + syncNote() + '<div style="overflow:auto"><table><thead><tr><th>Ad</th><th>Status</th><th>Reach</th><th>Impressions</th><th>Clicks</th><th>CTR</th><th>Meta leads</th><th>HMS leads</th><th>Booked</th><th>Visited</th>'
      + (adm ? '<th>Spend</th><th>Cost / lead</th><th>Revenue (90d)</th><th>ROI</th>' : '') + '</tr></thead><tbody>';
    h += ads.length ? ads.map(function (a) {
      var ls = leadsForAd(a), f = funnel(ls), rev = revOf(ls), spend = Number(a.spend) || 0;
      var cpl = (metaLeads(a) || ls.length) ? spend / (metaLeads(a) || ls.length) : 0;
      return '<tr class="crm-click" onclick="bmhCrm.ad(\'' + ja(a.id) + '\')"><td>' + (a.thumb ? '<img src="' + esc(a.thumb) + '" style="width:34px;height:34px;object-fit:cover;border-radius:6px;float:left;margin-right:6px">' : '') + '<b>' + esc(a.name || a.id) + '</b><div class="crm-mut">' + esc(a.campaign || '') + '</div></td>'
        + '<td>' + esc(a.status || '') + '</td><td>' + num(a.reach) + '</td><td>' + num(a.impressions) + '</td><td>' + num(a.clicks) + '</td><td>' + pct(a.ctr) + '</td><td>' + num(metaLeads(a)) + '</td><td>' + ls.length + '</td><td>' + f.booked + '</td><td>' + f.visited + '</td>'
        + (adm ? '<td>' + money(spend) + '</td><td>' + (cpl ? money(cpl) : '—') + '</td><td>' + (rev == null ? '<span class="crm-mut">load</span>' : money(rev)) + '</td><td>' + (rev == null || !spend ? '—' : '<b style="color:' + (rev >= spend ? '#16a34a' : '#b91c1c') + '">' + pct((rev - spend) / spend * 100) + '</b>') + '</td>' : '') + '</tr>';
    }).join('') : '<tr><td colspan="' + (adm ? 14 : 10) + '" class="crm-mut" style="padding:14px">No ads yet.</td></tr>';
    h += '</tbody></table></div>' + (adm ? revButton() : '') + '</div>';
    return h;
  }
  function revButton() {
    return '<div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">' + (S.revLoading ? '<span class="crm-mut">Loading billing… ' + esc(S.revLoading) + '</span>' : '<button type="button" class="btn btn-xs btn-outline" onclick="bmhCrm.rev()">' + (S.rev ? '↻ Recalculate revenue' : '₹ Calculate revenue & ROI') + '</button><span class="crm-mut">Revenue = all billing of the lead’s patient for ' + REV_DAYS + ' days after the lead (read only).</span>') + '</div>';
  }
  function adDetailHtml(id) {
    var a = S.ads[id]; if (!a) { S.adSel = ''; return adsHtml(); }
    var adm = isAdmin(), ls = leadsForAd(a), f = funnel(ls), rev = revOf(ls), spend = Number(a.spend) || 0;
    var daily = Object.keys(a.daily || {}).sort().map(function (d) { var x = a.daily[d] || {}; return { date: d, spend: x.spend, impressions: x.impressions, clicks: x.clicks, leads: x.leads }; });
    var ag = a.ageGender || [], reg = a.regions || [];
    var byAge = {}, byG = {};
    ag.forEach(function (r) { var k = r.age || '?'; byAge[k] = (byAge[k] || 0) + (Number(r.impressions) || 0); var g = r.gender || '?'; byG[g] = (byG[g] || 0) + (Number(r.impressions) || 0); });
    var t = a.targeting || {};
    var kp = function (l, v) { return '<div class="crm-kpi"><b>' + v + '</b><span>' + l + '</span></div>'; };
    var h = '<div style="margin-bottom:8px"><button type="button" class="btn btn-xs btn-outline" onclick="bmhCrm.ad(\'\')">← All ads</button></div>'
      + '<div class="crm-card" style="display:flex;gap:12px;align-items:flex-start">' + (a.thumb ? '<img src="' + esc(a.thumb) + '" style="width:90px;height:90px;object-fit:cover;border-radius:10px">' : '')
      + '<div><div style="font-size:16px;font-weight:900">' + esc(a.name || a.id) + '</div><div class="crm-mut">' + esc([a.campaign, a.adset, a.objective, a.status].filter(Boolean).join(' · ')) + '</div>'
      + (a.body ? '<div style="font-size:12px;margin-top:6px;max-width:640px">' + esc(String(a.body).slice(0, 300)) + '</div>' : '') + (a.created ? '<div class="crm-mut" style="margin-top:4px">Started ' + esc(fmtD(a.created)) + (a.stop ? ' · ends ' + esc(fmtD(a.stop)) : '') + '</div>' : '') + '</div></div>'
      + '<div class="crm-kpis">' + kp('Reach', num(a.reach)) + kp('Impressions', num(a.impressions)) + kp('Frequency', (Number(a.frequency) || 0).toFixed(2)) + kp('Clicks', num(a.clicks)) + kp('CTR', pct(a.ctr)) + kp('Meta leads / messages', num(metaLeads(a))) + kp('HMS leads', ls.length) + kp('Booked', f.booked) + kp('Visited', f.visited) + kp('Surgery', f.converted)
      + (adm ? kp('Spend', money(spend)) + kp('CPC', a.cpc ? money(a.cpc) : '—') + kp('Cost per HMS lead', ls.length ? money(spend / ls.length) : '—') + kp('Revenue (90 d)', rev == null ? '—' : money(rev)) + kp('ROI', rev == null || !spend ? '—' : pct((rev - spend) / spend * 100)) : '') + '</div>'
      + (adm ? revButton() : '')
      + '<div class="crm-grid2" style="margin-top:10px"><div class="crm-card"><div style="font-weight:900;margin-bottom:4px">Daily ' + (adm ? 'spend' : 'clicks') + '</div>' + line(daily, adm ? 'spend' : 'clicks', '#1A3C6E') + '<div style="font-weight:900;margin:8px 0 4px">Daily leads / messages</div>' + line(daily, 'leads', '#16a34a', 60) + '</div>'
      + '<div class="crm-card"><div style="font-weight:900;margin-bottom:4px">Who saw it — age</div>' + (Object.keys(byAge).length ? bars(Object.keys(byAge).sort().map(function (k) { return [k, byAge[k]]; }), 0, '#6b3fa0') : '<div class="crm-mut">No breakdown yet.</div>')
      + '<div style="font-weight:900;margin:8px 0 4px">Gender</div>' + (Object.keys(byG).length ? bars(Object.keys(byG).map(function (k) { return [k, byG[k], k === 'female' ? '#e11d74' : k === 'male' ? '#2563eb' : '#94a3b8']; })) : '<div class="crm-mut">—</div>')
      + '<div style="font-weight:900;margin:8px 0 4px">Region</div>' + (reg.length ? bars(reg.slice().sort(function (x, y) { return (Number(y.impressions) || 0) - (Number(x.impressions) || 0); }).slice(0, 8).map(function (r) { return [r.region || '?', Number(r.impressions) || 0]; }), 0, '#0891b2') : '<div class="crm-mut">—</div>') + '</div></div>'
      + '<div class="crm-grid2"><div class="crm-card"><div style="font-weight:900;margin-bottom:6px">Targeting</div><div style="font-size:12px;line-height:1.7">'
      + '<div><b>Age:</b> ' + esc((t.age_min || '?') + '–' + (t.age_max || '65+')) + '</div><div><b>Gender:</b> ' + esc(t.genders && t.genders.length ? t.genders.map(function (g) { return g == 1 ? 'Men' : g == 2 ? 'Women' : g; }).join(', ') : 'All') + '</div>'
      + '<div><b>Locations:</b> ' + esc((t.locations || []).join(', ') || '—') + '</div><div><b>Interests / audiences:</b> ' + esc((t.interests || []).join(', ') || '—') + '</div>'
      + (t.placements ? '<div><b>Placements:</b> ' + esc([].concat(t.placements).join(', ')) + '</div>' : '') + (adm && (a.dailyBudget || a.lifetimeBudget) ? '<div><b>Budget:</b> ' + (a.dailyBudget ? money(a.dailyBudget) + ' / day' : money(a.lifetimeBudget) + ' total') + '</div>' : '') + '</div></div>'
      + '<div class="crm-card"><div style="font-weight:900;margin-bottom:6px">HMS funnel for this ad</div>' + bars([['Leads', f.leads], ['Contacted', f.contacted], ['Booked', f.booked], ['Visited', f.visited], ['Surgery / converted', f.converted], ['Lost', f.lost, '#9ca3af']], f.leads || 1, '#d97706')
      + (ls.length ? '<div style="margin-top:8px">' + ls.slice(0, 12).map(function (l) { return '<div style="font-size:11.5px;padding:2px 0"><span class="crm-pill" style="background:' + stat(l.status).c + '">' + stat(l.status).l + '</span> ' + esc(l.name || '') + ' <span class="crm-mut">' + esc(fmtD(l.createdAt)) + (adm && S.rev && S.rev.byLead[l.id] ? ' · ' + money(S.rev.byLead[l.id]) : '') + '</span></div>'; }).join('') + '</div>' : '<div class="crm-mut">No HMS leads tagged with this ad yet.</div>') + '</div></div>';
    return h;
  }

  // dashboard tab
  function dashHtml() {
    var adm = isAdmin(), since = Date.now() - S.period * 86400e3;
    var ls = leadList().filter(function (l) { return (Date.parse(l.createdAt || '') || 0) >= since; }), f = funnel(ls);
    var ads = adList(), spend = ads.reduce(function (s, a) { return s + (Number(a.spend) || 0); }, 0), rev = revOf(ls);
    var bySrc = {}; ls.forEach(function (l) { bySrc[l.source || 'Other'] = (bySrc[l.source || 'Other'] || 0) + 1; });
    var byDept = {}; ls.forEach(function (l) { var k = deptL(l.dept) || 'General'; byDept[k] = (byDept[k] || 0) + 1; });
    var acts = []; leadList().forEach(function (l) { (l.activities || []).forEach(function (a) { acts.push({ a: a, l: l }); }); });
    acts.sort(function (x, y) { return String(y.a.at).localeCompare(String(x.a.at)); });
    var kp = function (l, v, c) { return '<div class="crm-kpi"><b' + (c ? ' style="color:' + c + '"' : '') + '>' + v + '</b><span>' + l + '</span></div>'; };
    var h = '<div class="crm-card" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><b>Period</b>' + [7, 30, 90].map(function (d) { return '<button type="button" class="btn btn-xs ' + (S.period === d ? 'btn-gold' : 'btn-outline') + '" onclick="bmhCrm.period(' + d + ')">' + d + ' days</button>'; }).join('') + '<span class="crm-mut">Ad figures are for the whole time each ad has run.</span></div>'
      + '<div class="crm-kpis">' + kp('Leads', f.leads) + kp('Contacted', f.contacted) + kp('Appointments booked', f.booked) + kp('Visited', f.visited) + kp('Surgery / converted', f.converted, '#16a34a') + kp('Lost', f.lost, '#6b7280') + kp('Conversion (visited)', f.leads ? pct(f.visited / f.leads * 100) : '—')
      + kp('Active ads', ads.filter(function (a) { return /active/i.test(a.status || ''); }).length) + kp('Ad reach', num(ads.reduce(function (s, a) { return s + (Number(a.reach) || 0); }, 0)))
      + (adm ? kp('Ad spend', money(spend)) + kp('Revenue from leads (90 d)', rev == null ? '—' : money(rev), '#16a34a') + kp('ROI', rev == null || !spend ? '—' : pct((rev - spend) / spend * 100)) : '') + '</div>'
      + (adm ? '<div class="crm-card">' + revButton() + '</div>' : '')
      + '<div class="crm-grid2"><div class="crm-card"><div style="font-weight:900;margin-bottom:4px">Funnel</div>' + bars([['Leads', f.leads], ['Contacted', f.contacted], ['Booked', f.booked], ['Visited', f.visited], ['Surgery', f.converted]], f.leads || 1, '#1A3C6E')
      + '<div style="font-weight:900;margin:10px 0 4px">Leads by source</div>' + (Object.keys(bySrc).length ? bars(Object.keys(bySrc).sort(function (a, b) { return bySrc[b] - bySrc[a]; }).map(function (k) { return [k, bySrc[k]]; }), 0, '#6b3fa0') : '<div class="crm-mut">No leads in this period.</div>')
      + '<div style="font-weight:900;margin:10px 0 4px">Leads by department</div>' + (Object.keys(byDept).length ? bars(Object.keys(byDept).map(function (k) { return [k, byDept[k]]; }), 0, '#0891b2') : '<div class="crm-mut">—</div>') + '</div>'
      + '<div class="crm-card"><div style="font-weight:900;margin-bottom:4px">Latest activity</div>' + (acts.length ? acts.slice(0, 25).map(function (x) { return '<div style="font-size:11.5px;padding:3px 0;border-bottom:1px solid #f3f4f6">' + esc(fmtDT(x.a.at)) + ' · <b>' + esc(x.l.name || '') + '</b> — ' + esc(x.a.text || x.a.type) + ' <span class="crm-mut">' + esc(x.a.by || '') + '</span></div>'; }).join('') : '<div class="crm-mut">No activity yet.</div>')
      + (ads.length ? '<div style="font-weight:900;margin:10px 0 4px">Top ads by HMS leads</div>' + bars(ads.map(function (a) { return [a.name || a.id, leadsForAd(a).length]; }).sort(function (x, y) { return y[1] - x[1]; }).slice(0, 6), 0, '#d97706') : '') + '</div></div>';
    return h;
  }

  // ───────── actions ─────────
  function val(id) { var e = document.getElementById(id); return e ? String(e.value || '').trim() : ''; }
  var api = {
    tab: function (t) { S.tab = t; S.adSel = ''; draw(); if (t !== 'leads') linkPatients(); },
    q: function (v) { S.q = v; schedule(); },
    f: function (k, v) { S[k] = v; draw(); },
    period: function (d) { S.period = d; draw(); },
    ad: function (id) { S.adSel = id; draw(); },
    rev: function () { S.rev = null; loadRevenue(); },
    newLead: function () { S.edit = { id: 'L' + Date.now() + Math.random().toString(36).slice(2, 5), status: 'new', source: 'WhatsApp', dept: 'ophtho', centre: centre() }; S.tab = 'leads'; draw(); setTimeout(function () { var n = document.getElementById('crm-f-name'); if (n) n.focus(); }, 50); },
    editLead: function (id) { S.edit = JSON.parse(JSON.stringify(S.leads[id] || {})); draw(); try { document.getElementById('pg-crm').scrollTop = 0; window.scrollTo(0, 0); } catch (e) {} },
    cancel: function () { S.edit = null; draw(); },
    saveForm: function () {
      var l = S.edit; if (!l) return;
      var name = val('crm-f-name'), phone = val('crm-f-phone');
      if (!name && !phone) { toast('Enter a name or phone', 'w'); return; }
      var isNew = !S.leads[l.id], before = S.leads[l.id] || {};
      if (isNew) {
        var dup = leadList().find(function (x) { return digits(x.phone) && digits(x.phone) === digits(phone) && ['lost', 'converted'].indexOf(x.status) < 0; });
        if (dup && !confirm('An open lead with this phone already exists (' + (dup.name || '') + ', ' + fmtD(dup.createdAt) + ').\n\nOK = add a new lead anyway\nCancel = open the existing lead')) { S.edit = JSON.parse(JSON.stringify(dup)); draw(); return; }
      }
      var adId = val('crm-f-ad'), ad = adId ? S.ads[adId] : null;
      Object.assign(l, { name: name, phone: phone, phoneDigits: digits(phone), source: val('crm-f-source'), adId: adId, adName: ad ? (ad.name || adId) : val('crm-f-post'), campaign: ad ? (ad.campaign || '') : '', dept: val('crm-f-dept'), interest: val('crm-f-interest'), status: val('crm-f-status') || 'new', followUp: val('crm-f-fu'), centre: val('crm-f-centre'), notes: val('crm-f-notes'), lostReason: val('crm-f-lost') });
      if (isNew) { l.createdAt = new Date().toISOString(); l.createdBy = who(); act(l, 'created', 'Lead added (' + l.source + (l.adName ? ' · ' + l.adName : '') + ')'); }
      else {
        if (before.status !== l.status) { act(l, 'status', stat(before.status).l + ' → ' + stat(l.status).l + (l.status === 'lost' && l.lostReason ? ' (' + l.lostReason + ')' : '')); if (l.status === 'contacted' && !l.contactedAt) l.contactedAt = new Date().toISOString(); }
        if ((before.notes || '') !== (l.notes || '')) act(l, 'note', 'Notes updated');
        if ((before.followUp || '') !== (l.followUp || '') && l.followUp) act(l, 'followup', 'Follow-up set for ' + fmtD(l.followUp));
      }
      saveLead(l); S.edit = null; S.links[l.id] = 0; linkPatients(); toast('Lead saved ✓', 's'); draw();
    },
    called: function (id, wa) {
      var l = S.leads[id]; if (!l) return;
      if (l.status === 'new') { l.status = 'contacted'; l.contactedAt = new Date().toISOString(); }
      act(l, 'contact', wa ? 'WhatsApp opened' : 'Called'); saveLead(l);
    },
    book: function (id) {
      var l = S.leads[id]; if (!l) return;
      var old = document.getElementById('crm-book'); if (old) old.remove();
      var ov = document.createElement('div'); ov.id = 'crm-book';
      ov.style.cssText = 'position:fixed;inset:0;z-index:4900;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:12px';
      var doc = DOCS[l.dept] || 'Dr. Varun Baweja', docs = []; try { Object.keys(DOCTORS).forEach(function (k) { DOCTORS[k].forEach(function (d) { if (docs.indexOf(d) < 0) docs.push(d); }); }); } catch (e) { docs = Object.keys(DOCS).map(function (k) { return DOCS[k]; }); }
      var tm = dkey(Date.now() + 86400e3);
      ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:420px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)"><div style="font-size:15px;font-weight:900;margin-bottom:8px">📅 Book appointment — ' + esc(l.name || '') + '</div>'
        + '<div style="display:grid;gap:8px"><label class="crm-mut">Doctor<select id="crm-b-dr" class="crm-in" style="width:100%">' + docs.map(function (d) { return '<option' + (d === doc ? ' selected' : '') + '>' + esc(d) + '</option>'; }).join('') + '</select></label>'
        + '<label class="crm-mut">Date<input id="crm-b-date" type="date" class="crm-in" style="width:100%" value="' + tm + '" min="' + today() + '"></label>'
        + '<label class="crm-mut">Time<input id="crm-b-time" type="time" class="crm-in" style="width:100%" value="10:00"></label>'
        + '<label class="crm-mut">Centre<select id="crm-b-centre" class="crm-in" style="width:100%"><option value="CHD"' + ((l.centre || centre()) === 'CHD' ? ' selected' : '') + '>Chandigarh</option><option value="RPR"' + ((l.centre || centre()) === 'RPR' ? ' selected' : '') + '>Ropar</option></select></label>'
        + '<input id="crm-b-purpose" class="crm-in" placeholder="Purpose" value="' + esc(l.interest ? 'Consultation — ' + l.interest : 'Consultation') + '"></div>'
        + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px"><button type="button" class="btn btn-gray btn-sm" onclick="document.getElementById(\'crm-book\').remove()">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="crm-b-ok">Book</button></div></div>';
      document.body.appendChild(ov);
      document.getElementById('crm-b-ok').onclick = function () {
        var dr = val('crm-b-dr'), date = val('crm-b-date'), c = val('crm-b-centre');
        if (!date) { toast('Choose a date', 'w'); return; }
        var t = val('crm-b-time') || '10:00', time = t; try { time = normalizeAptTimeLabel(t); } catch (e) {}
        try { var adj = adjustAppointmentDateForSunday(date); if (adj && adj.date) date = adj.date; } catch (e) {}
        try { time = getNextAvailableApptSlotFrom(date, dr, time, c) || time; } catch (e) {}
        var deptK = Object.keys(DOCS).find(function (k) { return DOCS[k] === dr; }) || ({ 'Dr. Geeta Baweja': 'obg' })[dr] || l.dept || 'ophtho';
        var apt = { id: 'A' + Date.now(), patient: l.patientName || l.name || 'New Patient', bmhId: l.bmhId || '—', mob: l.phone || '', date: date, time: time, doctor: dr, dept: deptK, purpose: val('crm-b-purpose') || 'Consultation', centre: c,
          source: String(l.source || 'social').toLowerCase().indexOf('whatsapp') >= 0 ? 'whatsapp' : (/instagram|facebook/i.test(l.source || '') ? 'social media' : String(l.source || 'lead').toLowerCase()),
          leadId: l.id, leadName: l.name || '', leadPhone: l.phone || '', leadSource: (l.source || '') + (l.adName ? ' · ' + l.adName : ''), appointmentMode: 'In person', notes: l.notes || '', status: 'booked', createdBy: (CURRENT_USER && CURRENT_USER.username) || 'crm' };
        try { APPOINTMENTS.push(apt); } catch (e) {}
        try { saveAppointmentToFirebase(apt); } catch (e) { console.warn(e); }
        l.status = 'booked'; l.appointmentId = apt.id; l.appointmentDate = date; l.appointmentTime = time; l.appointmentDoctor = dr;
        act(l, 'booked', 'Appointment booked — ' + fmtD(date) + ' ' + time + ' with ' + dr); saveLead(l);
        ov.remove(); toast('📅 Appointment booked — ' + fmtD(date) + ' at ' + time, 's');
        try { renderAptDay && renderAptDay(); } catch (e) {}
      };
    }
  };
  window.bmhCrm = api;

  // ───────── menu + page wiring ─────────
  var NI = '<div class="ni" data-crm="1" onclick="nav(\'crm\',this)"><div class="ni-ic">📣</div>Leads / CRM</div>';
  function addMenu() {
    var nav = document.getElementById('sbnav'); if (!nav || !canSee() || nav.querySelector('[data-crm]')) return;
    var after = nav.querySelector('.ni[onclick*="\'appointments\'"]') || nav.querySelector('.ni[onclick*="\'reports\'"]');
    var tmp = document.createElement('div'); tmp.innerHTML = NI; var el = tmp.firstChild;
    if (after && after.parentNode) after.parentNode.insertBefore(el, after.nextSibling); else nav.appendChild(el);
  }
  var origBuild = window.buildSidebarForRole;
  if (typeof origBuild === 'function') window.buildSidebarForRole = function () { var r = origBuild.apply(this, arguments); try { addMenu(); } catch (e) {} return r; };
  var origNav = window.nav;
  if (typeof origNav === 'function') {
    window.nav = function (id, el, opts) {
      var key = (typeof id === 'string' && id.indexOf('pg-') === 0) ? id.slice(3) : id;
      if (key === 'crm') ensurePage();
      var r = origNav.apply(this, arguments);
      if (key === 'crm') {
        if (!canSee()) { toast('Leads / CRM is for admin and reception logins', 'w'); }
        var t = document.getElementById('ptitle'); if (t) t.textContent = 'Leads / CRM';
        startLeads(); startAds(); draw(); setTimeout(linkPatients, 1500);
      }
      return r;
    };
  }
  // keep the menu item after login / sidebar rebuilds
  var tries = 0, iv = setInterval(function () { try { addMenu(); } catch (e) {} if (++tries > 40) clearInterval(iv); }, 1500);
  document.addEventListener('click', function () { try { addMenu(); } catch (e) {} }, true);
})();
