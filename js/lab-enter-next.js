/* BMH — Lab → result entry: Enter moves to the next test's value box.
 * Typing a value and pressing Enter (or the number-pad Enter) jumps straight down to the Value box of the next test,
 * skipping the Unit and Range boxes (Tab still works as before). Shift+Enter goes back up one test. On the last test,
 * Enter stays there (results are saved with the Save button as before). Nothing else changes.
 * Off switch (this browser): localStorage.setItem('bmh_lab_enter_next_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_lab_enter_next_off') === '1') return; } catch (e) {}
  function boxes(from) {
    var host = (from && from.closest && from.closest('#lab-entry-fields')) || document.getElementById('lab-entry-fields') || document;
    return Array.prototype.filter.call(host.querySelectorAll('input[id^="lr-val-"]'), function (i) {
      return !i.disabled && !i.readOnly && i.offsetParent !== null;
    });
  }
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (e.key !== 'Enter' || e.isComposing || e.ctrlKey || e.altKey || e.metaKey) return;
    if (!t || t.tagName !== 'INPUT' || !/^lr-val-/.test(t.id || '')) return;
    var list = boxes(t), i = list.indexOf(t);
    if (i < 0) return;
    e.preventDefault();
    try { t.dispatchEvent(new Event('change', { bubbles: true })); } catch (x) {}
    var next = list[i + (e.shiftKey ? -1 : 1)];
    if (next) { next.focus(); try { next.select(); } catch (x) {} try { next.scrollIntoView({ block: 'nearest' }); } catch (x) {} }
  }, true);
})();
