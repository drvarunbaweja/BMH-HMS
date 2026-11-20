/* BMH — Reception logins (Chandigarh and Ropar) can save NEW charges in Procedures & Charges (+ Add Procedure).
 * Before, a reception login got "You can edit charges only for your own department" because reception has no department.
 * Reception can add a new charge for any department (with its CHD and RPR prices). Changing or deleting an existing
 * charge stays with admin / that department as before — if the name already exists, reception is told so and nothing changes.
 * The new charge is saved through the existing save code, so it reaches every computer in both centres as usual.
 * Off switch (this browser): localStorage.setItem('bmh_reception_new_charges_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_reception_new_charges_off') === '1') return; } catch (e) {}
  function isReception() { try { return /reception/i.test(String((CURRENT_USER && CURRENT_USER.role) || '')); } catch (e) { return false; } }
  function install() {
    if (typeof window.saveChargeFromModal !== 'function' || window.saveChargeFromModal._rnc) return typeof window.saveChargeFromModal === 'function';
    var orig = window.saveChargeFromModal;
    var w = function () {
      var admin = false; try { admin = isCurrentUserAdmin(); } catch (e) {}
      if (admin || !isReception()) return orig.apply(this, arguments);
      var rawCat = (document.getElementById('add-charge-cat') || {}).value || 'Eye';
      var kind = (document.getElementById('add-charge-kind') || {}).value || 'procedure';
      var cat = String(kind).toLowerCase() === 'lab' ? 'Lab' : rawCat;
      var parent = String((document.getElementById('add-charge-parent') || {}).value || '').trim();
      var name = String((document.getElementById('add-charge-name') || {}).value || '').trim();
      var finalName = name || parent, finalParent = name ? parent : '';
      if (!finalName) return orig.apply(this, arguments); // existing message: enter a heading or name
      var exists = (CHARGES_DATA || []).some(function (row) {
        return row && row.cat === cat && String(row.name || '').toLowerCase() === finalName.toLowerCase() && (String(row.parent || '') === finalParent || String(row.parent || '').toLowerCase() === finalParent.toLowerCase());
      });
      if (exists) { try { showToast('"' + finalName + '" already exists in ' + cat + ' — only admin or the department can change its price', 'w'); } catch (e) {} return; }
      var had = window.canEditChargeCategory;
      window.canEditChargeCategory = function () { return true; };
      try { return orig.apply(this, arguments); } finally { window.canEditChargeCategory = had; }
    };
    w._rnc = true; window.saveChargeFromModal = w;
    return true;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
})();
