/* BMH — Procedure follow-up call reminder: tuck to the right edge / later.
 * The red "📞 N procedure follow-up calls due" pill used to sit over the page and cover text. Now:
 *  ›  rolls it into a small tab on the right edge (📞 N ‹) — click the tab to roll it out again;
 *  "Later" hides it for 1 hour or for the rest of today;
 *  "Open" opens the list of calls due, as before.
 * Each computer remembers its own choice (this browser only). It only changes how the reminder looks — the list of
 * calls, and what is saved, are unchanged. The original pill (#bmh-adv-banner) is kept hidden and used as the source.
 * Off switch (this browser): localStorage.setItem('bmh_fu_tuck_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_fu_tuck_off') === '1') return; } catch (e) {}
  var LS = 'bmh_fu_rem_v1';
  function st() { try { return JSON.parse(localStorage.getItem(LS) || '{}') || {}; } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} }
  function endOfToday() { var d = new Date(); d.setHours(23, 59, 59, 999); return d.getTime(); }

  var css = document.createElement('style');
  css.textContent = '#bmh-adv-banner{display:none!important}'
    + '#bmh-fu-rem{position:fixed;right:0;bottom:22px;z-index:550;display:none;align-items:center;gap:6px;background:#c62828;color:#fff;'
    + 'border-radius:999px 0 0 999px;padding:6px 8px 6px 14px;font:800 13px/1.2 Arial,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.25);transition:transform .25s ease}'
    + '#bmh-fu-rem button{border:0;cursor:pointer;font:800 12px Arial,sans-serif;border-radius:999px;padding:5px 10px}'
    + '#bmh-fu-rem .fu-open{background:#fff;color:#c62828}'
    + '#bmh-fu-rem .fu-later{background:rgba(255,255,255,.2);color:#fff}'
    + '#bmh-fu-rem .fu-tuck{background:rgba(255,255,255,.2);color:#fff;font-size:15px;padding:3px 9px}'
    + '#bmh-fu-rem.tucked{padding:7px 6px 7px 10px;cursor:pointer}'
    + '#bmh-fu-rem .fu-full{display:inline-flex;align-items:center;gap:6px}'
    + '#bmh-fu-rem.tucked .fu-full{display:none}'
    + '#bmh-fu-rem:not(.tucked) .fu-tab{display:none}'
    + '#bmh-fu-menu{position:fixed;right:10px;z-index:551;background:#fff;color:#222;border-radius:10px;box-shadow:0 8px 26px rgba(0,0,0,.3);padding:6px;display:none}'
    + '#bmh-fu-menu button{display:block;width:100%;text-align:left;border:0;background:none;padding:7px 12px;font:700 12px Arial,sans-serif;cursor:pointer;border-radius:6px}'
    + '#bmh-fu-menu button:hover{background:#f3f4f7}'
    + '@media print{#bmh-fu-rem,#bmh-fu-menu{display:none!important}}';
  (document.head || document.documentElement).appendChild(css);

  function src() { return document.getElementById('bmh-adv-banner'); }
  function count(b) { var m = String(b && b.textContent || '').match(/(\d+)/); return m ? Number(m[1]) : 0; }
  function el() {
    var w = document.getElementById('bmh-fu-rem'); if (w) return w;
    w = document.createElement('div'); w.id = 'bmh-fu-rem'; w.className = 'bmh-adv-flash';
    w.innerHTML = '<span class="fu-tab" title="Show the follow-up call reminder">📞 <b class="fu-n"></b> ‹</span>'
      + '<span class="fu-full"><span class="fu-txt"></span>'
      + '<button type="button" class="fu-open">Open</button><button type="button" class="fu-later">Later ▾</button>'
      + '<button type="button" class="fu-tuck" title="Roll into the right edge">›</button></span>';
    document.body.appendChild(w);
    w.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('button') : null;
      if (w.classList.contains('tucked')) { var s = st(); s.tucked = false; save(s); render(); return; }
      if (!t) return;
      if (t.className === 'fu-open') { var b = src(); if (b) b.click(); }
      else if (t.className === 'fu-tuck') { var s2 = st(); s2.tucked = true; save(s2); render(); }
      else if (t.className === 'fu-later') { e.stopPropagation(); menu(t); }
    });
    return w;
  }
  function menu(anchor) {
    var m = document.getElementById('bmh-fu-menu');
    if (!m) {
      m = document.createElement('div'); m.id = 'bmh-fu-menu';
      m.innerHTML = '<button type="button" data-h="1">Remind me in 1 hour</button><button type="button" data-h="day">Hide for the rest of today</button>';
      document.body.appendChild(m);
      m.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
        var s = st(); s.until = b.getAttribute('data-h') === 'day' ? endOfToday() : Date.now() + 3600e3; save(s);
        m.style.display = 'none'; render();
      });
      document.addEventListener('click', function (e) { if (m.style.display !== 'none' && !m.contains(e.target)) m.style.display = 'none'; });
    }
    var r = anchor.getBoundingClientRect();
    m.style.bottom = (window.innerHeight - r.top + 6) + 'px';
    m.style.display = m.style.display === 'block' ? 'none' : 'block';
  }
  function render() {
    var b = src(), w = document.getElementById('bmh-fu-rem');
    var on = !!(b && b.style.display === 'block' && count(b) > 0);
    var s = st();
    if (s.until && Date.now() >= s.until) { delete s.until; save(s); }
    if (!on || (s.until && Date.now() < s.until)) { if (w) w.style.display = 'none'; var m = document.getElementById('bmh-fu-menu'); if (m) m.style.display = 'none'; return; }
    w = el();
    var n = count(b);
    var txt = '📞 ' + n + ' procedure follow-up call' + (n === 1 ? '' : 's') + ' due';
    if (w.querySelector('.fu-n').textContent !== String(n)) w.querySelector('.fu-n').textContent = n;
    if (w.querySelector('.fu-txt').textContent !== txt) w.querySelector('.fu-txt').textContent = txt;
    if (w.classList.contains('tucked') !== !!s.tucked) w.classList.toggle('tucked', !!s.tucked);
    w.title = s.tucked ? 'Show the follow-up call reminder' : '';
    if (w.style.display !== 'flex') w.style.display = 'flex';
  }
  window.bmhFuReminderRender = render;
  function boot() {
    render();
    var watched = null;
    setInterval(function () {
      var b = src();
      if (b && b !== watched) {
        watched = b;
        try { new MutationObserver(function () { render(); }).observe(b, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['style'] }); } catch (e) {}
      }
      render();
    }, 2000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
