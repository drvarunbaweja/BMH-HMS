/* BMH — Reception: floating alert when a doctor sends charges to reception (pending payment requests).
 * Shows on any page of a reception login: "💳 3 payments to collect — ₹2,400", with the departments.
 *  • Click → opens Reception → Dept Summary showing the pending charges.
 *  • "–" minimises it to a small pulsing bubble with the count (click the bubble to open Dept Summary,
 *    or the small arrow to expand). A new payment request opens it up again.
 *  • Hidden when nothing is pending, and while Dept Summary is already on screen.
 * It only reads the pending list the reception screen already keeps; nothing is saved or changed.
 */
(function () {
  'use strict';
  function user() { try { return CURRENT_USER || null; } catch (e) { return null; } }
  function isReception() { var u = user(); return !!u && String(u.role || '').trim().toLowerCase() === 'reception'; }
  function loggedIn() { var g = document.getElementById('login-gate'); return !!user() && (!g || g.style.display === 'none'); }
  function centre() { try { return getEffectiveCentre(); } catch (e) { return ''; } }
  function pending() {
    var list = []; try { list = PAY_REQUESTS || []; } catch (e) { list = []; }
    var c = centre();
    return list.filter(function (r) {
      if (!r || r.status !== 'pending') return false;
      try { return isTodayReceptionPayRequest(r, { centre: c }); } catch (e) { return true; }
    });
  }
  var LABEL = { ophtho: 'Eye', obg: 'OBG', psych: 'Psych', skin: 'Skin' };
  function deptOf(r) { try { return getReceptionPayRequestDeptKey(r) || ''; } catch (e) { return ''; } }
  function money(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function summaryShown() { var el = document.getElementById('rc-dept-summary'); return !!(el && el.offsetParent !== null && el.classList.contains('active')); }

  function openDeptSummary() {
    try { if (typeof nav === 'function') nav('reception', null); } catch (e) {}
    setTimeout(function () {
      window._rcDeptSummaryFilterDept = '';
      window._rcDeptSummaryPendingOnly = true;
      var t = Array.prototype.find.call(document.querySelectorAll('#pg-reception .ptab'), function (x) { return (x.textContent || '').indexOf('Dept Summary') >= 0; });
      try { if (t) { ptab(t, 'rc-dept-summary'); } if (typeof renderDeptSummary === 'function') renderDeptSummary(); } catch (e) {}
      draw();
    }, 150);
  }

  function css() {
    if (document.getElementById('bmh-payalert-css')) return;
    var s = document.createElement('style'); s.id = 'bmh-payalert-css';
    s.textContent = '@keyframes bmhPayPulse{0%,100%{box-shadow:0 0 0 0 rgba(232,144,26,.55)}50%{box-shadow:0 0 0 10px rgba(232,144,26,0)}}'
      + '#bmh-payalert{position:fixed;right:14px;bottom:14px;z-index:4600;font-family:inherit}'
      + '#bmh-payalert .card{display:flex;align-items:center;gap:10px;background:#fff;border:2px solid #E8901A;border-radius:12px;padding:10px 12px;box-shadow:0 10px 28px rgba(0,0,0,.22);cursor:pointer;max-width:340px;animation:bmhPayPulse 1.6s infinite}'
      + '#bmh-payalert .card b{font-size:13.5px;color:#7a3f00}#bmh-payalert .card small{display:block;font-size:11.5px;color:#555;margin-top:2px}'
      + '#bmh-payalert .min{border:none;background:#f3f3f3;border-radius:6px;width:24px;height:24px;cursor:pointer;font-weight:900;color:#555;flex:none}'
      + '#bmh-payalert .bubble{width:46px;height:46px;border-radius:50%;background:#E8901A;color:#fff;font-weight:900;font-size:15px;border:none;cursor:pointer;animation:bmhPayPulse 1.6s infinite;position:relative}'
      + '#bmh-payalert .bubble i{position:absolute;right:-4px;top:-4px;background:#fff;color:#E8901A;border:1.5px solid #E8901A;border-radius:50%;width:18px;height:18px;font-size:10px;font-style:normal;line-height:15px}';
    document.head.appendChild(s);
  }
  var lastCount = -1;
  function isMin() { try { return sessionStorage.getItem('bmh_payalert_min') === '1'; } catch (e) { return false; } }
  function setMin(v) { try { if (v) sessionStorage.setItem('bmh_payalert_min', '1'); else sessionStorage.removeItem('bmh_payalert_min'); } catch (e) {} }

  function draw() {
    var box = document.getElementById('bmh-payalert');
    if (!loggedIn() || !isReception()) { if (box) box.remove(); return; }
    var list = pending();
    if (list.length > lastCount && lastCount >= 0) setMin(false); // a new payment request: open it up again
    lastCount = list.length;
    if (!list.length || summaryShown()) { if (box) box.style.display = 'none'; return; }
    css();
    if (!box) { box = document.createElement('div'); box.id = 'bmh-payalert'; document.body.appendChild(box); }
    box.style.display = '';
    var total = list.reduce(function (t, r) { return t + (Number(r.amount) || 0); }, 0);
    var by = {}; list.forEach(function (r) { var d = deptOf(r); by[d] = (by[d] || 0) + 1; });
    var parts = Object.keys(by).map(function (d) { return (LABEL[d] || 'Other') + ' ' + by[d]; }).join(' · ');
    var sig = list.length + '|' + total + '|' + parts + '|' + isMin();
    if (box.getAttribute('data-sig') === sig) return;
    box.setAttribute('data-sig', sig);
    if (isMin()) {
      box.innerHTML = '<button type="button" class="bubble" title="' + list.length + ' payment' + (list.length === 1 ? '' : 's') + ' to collect — click to open Dept Summary">💳' + '<i>' + list.length + '</i></button>'
        + '<button type="button" class="min" data-a="expand" title="Show" style="margin-left:6px;vertical-align:middle">▸</button>';
    } else {
      box.innerHTML = '<div class="card" data-a="open" title="Open Reception → Dept Summary"><span style="font-size:22px">💳</span>'
        + '<div style="flex:1"><b>' + list.length + ' payment' + (list.length === 1 ? '' : 's') + ' to collect — ' + esc(money(total)) + '</b>'
        + '<small>' + esc(parts) + ' · tap to open Dept Summary</small></div>'
        + '<button type="button" class="min" data-a="min" title="Minimise">–</button></div>';
    }
    Array.prototype.forEach.call(box.querySelectorAll('[data-a], .bubble'), function (el) {
      el.onclick = function (ev) {
        ev.stopPropagation();
        var a = el.getAttribute('data-a') || 'open';
        if (a === 'min') { setMin(true); box.removeAttribute('data-sig'); draw(); return; }
        if (a === 'expand') { setMin(false); box.removeAttribute('data-sig'); draw(); return; }
        openDeptSummary();
      };
    });
  }
  setInterval(function () { try { draw(); } catch (e) {} }, 2500);
  window.bmhPayAlert = { refresh: draw, open: openDeptSummary };
})();
