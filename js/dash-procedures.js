/* BMH — Admin dashboard: "Procedures" counts only real procedures.
 * Counted: procedures lodged by the doctor from patient details (My patient queue) and procedure charges added at
 * Reception / Billing — e.g. Copper-T, Iron drip, Laser hair removal, I/V Mannitol, YAG.
 * Medicines (pharmacy, stock given, Skin "medicines") are shown on their own line under the Procedures number.
 * Not counted: consultation / follow-up fees (paid or no-fee), investigations / diagnostics / lab, medicines and
 * inventory use, and OT surgeries (those are already in "Surgeries": IOL / phaco / vitrectomy / ICL / LSCS etc., or any
 * charge of a patient who has an OT case that day).
 * Each procedure is counted once per patient per day (advised + marked done is one procedure).
 * Only the numbers in the "Procedures" boxes change; nothing is saved.
 * Off switch (this browser): localStorage.setItem('bmh_dash_procedures_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_dash_procedures_off') === '1') return; } catch (e) {}
  var NOT_CAT = /^(consultation|diagnostic|investigation|lab|pharmacy|medicine|medicines|drug|inventory|registration)$/i;
  var SURGERY_TXT = /iol|phaco|sics|implantation|vitrectomy|\bicl\b|keratoplasty|trabeculectomy|lscs|caesar|hysterectomy|laparoscop|delivery|labour room|surgery|ptosis|dcr\b|squint|retinal detachment/i;
  var DEPTS = ['ophtho', 'obg', 'psych', 'skin'];
  function dk(v) { try { return normalizeDeptKeyForQueue(v || ''); } catch (e) { return String(v || '').toLowerCase(); } }
  function ldk(v) { try { return localDateKey(v); } catch (e) { return String(v || '').slice(0, 10); } }
  function count(day) {
    var byBmh = {}; try { byBmh = getReceptionPatientLookupIndex().byBmh; } catch (e) {}
    var centreOk = function (x) { try { return centreMatch(x); } catch (e) { return true; } };
    var otToday = {};
    ((window.OT_CASES || []) || []).forEach(function (c) {
      if (!c || !c.bmhId) return;
      if ([c.date, c.otDate, c.surgeryDate, c.createdAt].some(function (d) { return d && ldk(d) === day; })) otToday[String(c.bmhId).toUpperCase()] = 1;
    });
    var seen = {}, out = { ophtho: 0, obg: 0, psych: 0, skin: 0, total: 0 }, meds = { ophtho: 0, obg: 0, psych: 0, skin: 0, total: 0 };
    out.meds = meds;
    Object.keys(window.BMH_PATIENT_CHARGES || {}).forEach(function (bid) {
      var key = String(bid || '').toUpperCase();
      var pt = byBmh && byBmh.get ? byBmh.get(key) : null;
      if (pt && !centreOk(pt)) return;
      var lines = window.BMH_PATIENT_CHARGES[bid]; lines = Array.isArray(lines) ? lines : Object.values(lines || {});
      lines.forEach(function (l) {
        if (!l) return;
        var ts = l.ts || l.date; if (!ts || ldk(ts) !== day) return;
        var cat = String(l.cat || '').trim();
        var d = dk(l.dept || (pt && (pt.dept || pt.department)) || '');
        var text = [l.desc, l.name, l.parent].join(' ');
        var hd = typeof window.bmhReportHead === 'function' ? window.bmhReportHead(l.desc || l.name || '') : '';
        var isMed = hd === 'medicine' || /^(pharmacy|medicine|medicines|drug)$/i.test(cat) || /inventory/i.test(String(l.source || ''));
        if (isMed) {
          var ms = key + '|med'; if (!seen[ms]) { seen[ms] = 1; if (meds[d] != null) meds[d] += 1; meds.total += 1; }
          return;
        }
        if (hd && hd !== 'procedure') return;
        if (NOT_CAT.test(cat)) return;
        if (/consult|follow[- ]?up|no fee|registration/i.test(text)) return;
        if (!hd && otToday[key]) return;
        if (!hd && /surgery/i.test(cat) && SURGERY_TXT.test(text)) return;
        var name = String(l.desc || l.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
        var sig = key + '|' + name; if (seen[sig]) return; seen[sig] = 1;
        if (out[d] != null) out[d] += 1;
        out.total += 1;
      });
    });
    return out;
  }
  function paint() {
    var el = document.getElementById('dash-admin-summary-blocks'); if (!el || !el.children.length) return;
    var day = ((document.getElementById('db-admin-date') || {}).value) || ldk(new Date());
    var c = count(day);
    var cards = el.children;
    for (var i = 0; i < cards.length; i += 1) {
      var key = i < DEPTS.length ? DEPTS[i] : 'total';
      Array.prototype.forEach.call(cards[i].querySelectorAll('.sc'), function (sc) {
        var lbl = sc.querySelector('.sc-lbl'), val = sc.querySelector('.sc-val');
        if (lbl && val && /^Procedures$/i.test(lbl.textContent.trim())) {
          val.textContent = String(c[key] || 0); sc.title = 'Procedures lodged by the doctor (patient details) or added at Reception (drips, injections, YAG, MTP, peels …) — consultations, investigations, medicines and surgeries are not counted';
          var m = sc.querySelector('.dp-meds'); if (!m) { m = document.createElement('div'); m.className = 'dp-meds'; m.style.cssText = 'font-size:10px;font-weight:800;margin-top:4px;opacity:.85'; sc.appendChild(m); }
          var mc = (c.meds && c.meds[key]) || 0; m.textContent = mc ? '💊 Medicines: ' + mc + ' patient' + (mc === 1 ? '' : 's') : ''; m.title = 'Patients given medicines — counted separately, not as procedures';
        }
      });
    }
  }
  function install() {
    if (typeof window.renderDashboard !== 'function' || window.renderDashboard._dp) return typeof window.renderDashboard === 'function';
    var orig = window.renderDashboard;
    var w = function () { var r = orig.apply(this, arguments); try { paint(); } catch (e) {} return r; };
    w._dp = true; window.renderDashboard = w;
    try { paint(); } catch (e) {}
    return true;
  }
  if (!install()) { var n = 0, iv = setInterval(function () { if (install() || ++n > 40) clearInterval(iv); }, 500); }
  window.bmhDashProcedureCount = count;
})();
