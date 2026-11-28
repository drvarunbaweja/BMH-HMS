/* BMH — the HMS version shown on screen follows the release itself.
 * Every release tags the page's scripts "?v=<date>-<name>-v<major>.<minor>" (e.g. …-v3.8). This reads that number
 * and shows it in the browser tab title, on the login card, at the top of the sidebar and in Settings → About,
 * so each change shows its own version. Numbering: v3.0, v3.1 … v3.9, then v4.0.
 * Display only; writes nothing.
 */
(function () {
  'use strict';
  function current() {
    var tags = [].map.call(document.querySelectorAll('script[src*="?v="]'), function (s) { return (String(s.getAttribute('src')).split('?v=')[1] || ''); });
    // the release tag is the one most scripts carry
    var count = {}; tags.forEach(function (t) { count[t] = (count[t] || 0) + 1; });
    var tag = Object.keys(count).sort(function (a, b) { return count[b] - count[a]; })[0] || '';
    var m = tag.match(/-v(\d+(?:\.\d+)?)$/);
    return m ? 'v' + m[1] : '';
  }
  function apply() {
    var v = current(); if (!v) return;
    window.BMH_HMS_VERSION = v;
    try { if (/HMS v[\d.]+/.test(document.title)) document.title = document.title.replace(/HMS v[\d.]+/g, 'HMS ' + v); } catch (e) {}
    try {
      document.querySelectorAll('div,span,title').forEach(function (el) {
        if (el.children.length) return;
        if (/HMS v[\d.]+/.test(el.textContent)) el.textContent = el.textContent.replace(/HMS v[\d.]+/g, 'HMS ' + v);
      });
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  setTimeout(apply, 3000);
})();
