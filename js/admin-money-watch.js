/* BMH — Admin only: payment changes made today, at a glance.
 * Dashboard (admin login): a red "N payment changes today" count next to the OPD / collection figures, and a list of
 * every change above Admin Overview. Reception → Charges: the same list in a "Payment changes today" panel.
 * Shown only to admin logins. Reads the log written by money-change-log.js (moneyChanges/<today>): receipts deleted,
 * amount / mode changed, marked not collected, refunds — with the login and time. Read-only.
 * Off switch (this browser): localStorage.setItem('bmh_admin_money_watch_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_admin_money_watch_off') === '1') return; } catch (e) {}
  var DN = { ophtho: 'Eye', obg: 'OBG', psych: 'Psych', skin: 'Skin' };
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function me() { try { return CURRENT_USER || null; } catch (e) { return window.CURRENT_USER || null; } }
  function isAdmin() { var u = me(); return !!(u && (u.isAdmin || String(u.role || '').toLowerCase() === 'admin')); }
  function rows() { try { return typeof window.bmhMoneyChangesToday === 'function' ? window.bmhMoneyChangesToday('') : []; } catch (e) { return []; } }
  function tm(v) { var d = new Date(v); return isNaN(d) ? '' : d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }
  function dept(v) { var k = String(v || ''); try { k = normalizeDeptKeyForQueue(k); } catch (e) {} return DN[k] || k || '—'; }
  function listHtml(list) {
    if (!list.length) return '<div style="padding:10px 12px;font-size:12px;color:var(--g1,#666)">No receipt has been changed or deleted today.</div>';
    return '<div style="overflow:auto"><table style="width:100%;font-size:12px;border-collapse:collapse"><tbody>' + list.slice().reverse().map(function (r) {
      return '<tr style="border-top:1px solid #f0f1f4"><td style="padding:6px 8px;white-space:nowrap;color:#666;width:64px">' + esc(tm(r.at)) + '</td>'
        + '<td style="padding:6px 8px;white-space:nowrap;font-weight:800">' + esc(r.by || '—') + '</td>'
        + '<td style="padding:6px 8px">' + esc(r.patient || '—') + ' <span style="color:#888;font-size:11px">' + esc(r.bmhId || '') + '</span><div style="color:#666;font-size:11px">' + esc(r.service || '') + '</div></td>'
        + '<td style="padding:6px 8px;white-space:nowrap;color:#666">' + esc(dept(r.dept)) + (r.centre ? ' · ' + esc(r.centre) : '') + '</td>'
        + '<td style="padding:6px 8px;color:#c62828;font-weight:700">' + esc((r.what || []).join('; ')) + '</td></tr>';
    }).join('') + '</tbody></table></div>';
  }
  function card(id, list) {
    return '<div class="card" id="' + id + '" style="margin-bottom:14px;border:1.5px solid ' + (list.length ? '#e57373' : 'var(--g4,#ddd)') + '">'
      + '<div class="card-hd"><div><div class="card-title">🔎 Payment changes today ' + (list.length ? '<span style="background:#c62828;color:#fff;border-radius:999px;padding:1px 8px;font-size:11px;margin-left:4px">' + list.length + '</span>' : '') + '</div>'
      + '<div class="card-sub">Receipts deleted, amount or mode changed, marked not collected, refunds — with the login and time. Only admins see this.</div></div></div>'
      + listHtml(list) + '</div>';
  }
  var last = '';
  function render() {
    var admin = isAdmin(), list = admin ? rows() : [], sig = admin + '|' + JSON.stringify(list.map(function (r) { return r.at + r.txnId; }));
    var ids = ['amw-dash', 'amw-charges', 'amw-badge'];
    if (!admin) { ids.forEach(function (i) { var el = document.getElementById(i); if (el) el.remove(); }); last = ''; return; }
    var admEl = document.getElementById('dash-view-admin'), dEl = document.getElementById('amw-dash');
    var need = (dEl && admEl && (admEl.style.display !== 'none') !== (dEl.parentNode === admEl)) || !document.getElementById('amw-dash') || !document.getElementById('amw-charges') || !document.getElementById('amw-badge');
    if (sig === last && !need) return;
    last = sig;
    // dashboard: red count beside OPD / collection, and the list above Admin Overview
    var hero = document.getElementById('dash-hero-stats');
    if (hero) {
      var b = document.getElementById('amw-badge');
      if (!b) { b = document.createElement('div'); b.id = 'amw-badge'; b.style.cssText = 'text-align:center;border-radius:8px;padding:7px 12px;cursor:pointer'; b.title = 'Payment changes today'; b.onclick = function () { var c = document.getElementById('amw-dash'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' }); }; hero.appendChild(b); }
      b.style.background = list.length ? '#c62828' : 'rgba(255,255,255,.12)';
      b.innerHTML = '<div style="font-size:20px;font-weight:900">' + list.length + '</div><div style="font-size:9px;opacity:.85">Payment changes</div>';
    }
    var adm = document.getElementById('dash-view-admin'), pg = document.getElementById('pg-dashboard');
    if (pg) {
      var d = document.getElementById('amw-dash'), html = card('amw-dash', list);
      var admShown = adm && adm.style.display !== 'none';
      var wantParent = admShown ? adm : pg;
      if (d && d.parentNode !== wantParent) { d.remove(); d = null; }
      if (d) d.outerHTML = html;
      else if (admShown) adm.insertAdjacentHTML('afterbegin', html);
      else if (pg.firstElementChild) pg.firstElementChild.insertAdjacentHTML('afterend', html);
    }
    // Reception → Charges: the same list, under the department print buttons
    var anchor = document.getElementById('ddp-bar') || document.getElementById('rc-dept-collection');
    if (anchor && anchor.parentNode) {
      var c = document.getElementById('amw-charges'); var h2 = card('amw-charges', list).replace('margin-bottom:14px', 'margin:10px 0 14px');
      if (c) c.outerHTML = h2; else anchor.insertAdjacentHTML('afterend', h2);
    }
  }
  setInterval(function () { try { render(); } catch (e) {} }, 4000);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
