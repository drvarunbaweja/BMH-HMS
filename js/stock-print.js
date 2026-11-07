/* BMH — Inventory "🖨️ Print current stock": choose department and centre, then print every store's stock for that
 * department at that centre in 3 columns per A4 page, starting on the first page (no page per heading).
 * Category / store filters already set on the stock list are still respected.
 */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var DEPTS = [['ophtho', 'Ophthalmology'], ['obg', 'OBG'], ['psych', 'Psychiatry'], ['skin', 'Skin'], ['general', 'General / other']];
  function dk(v) { try { return normalizeDeptKeyForQueue(v || '') || ''; } catch (e) { return String(v || '').toLowerCase(); } }
  function deptOf(r) {
    var d = '';
    try { if (window.bmhInvScope) d = bmhInvScope.storeDept(r.store || ''); } catch (e) {}
    if (!d) d = dk(r.dept);
    return ['ophtho', 'obg', 'psych', 'skin'].indexOf(d) >= 0 ? d : 'general';
  }
  function centreOf(r) {
    try { if (window.bmhInvScope) return bmhInvScope.storeCentre(r.store || '') || 'RPR'; } catch (e) {}
    return /\bCHD\b/i.test(String(r.store || '')) ? 'CHD' : 'RPR';
  }
  function filt(id) { try { return bmhInventoryFilterValue(id); } catch (e) { var el = document.getElementById(id); return (el && el.value) || 'all'; } }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function label(r) {
    if (String(r.cat || '').toLowerCase() === 'iol') {
      var b = ''; try { b = _iolBrandLabel(r); } catch (e) { b = r.iolBrand || r.name || ''; }
      var pw = r.power; if (!pw) { try { pw = extractIolPower(r.name || ''); } catch (e) {} }
      return [b, pw].filter(Boolean).join(' ');
    }
    return String(r.name || 'Unnamed item');
  }
  var DEMO = /^(MFX-001|PDN-002|CMC-003|TIM-004|IOL-021|IOL-023|OTP-001|BEV-001|MAN-001|RL-001)$/;
  function rowsFor(dept, centre, cat, store) {
    return inv().filter(function (r) {
      if (!r || DEMO.test(String(r.barcode || ''))) return false;
      if (!(Number(r.stock) > 0)) return false;
      if (cat !== 'all' && String(r.cat || '') !== cat) return false;
      if (store !== 'all' && String(r.store || '') !== store) return false;
      if (dept !== 'all' && deptOf(r) !== dept) return false;
      if (centre !== 'all' && centreOf(r) !== centre) return false;
      return true;
    });
  }
  function printNow(dept, centre) {
    var cat = filt('inv-stock-cat-filter'), store = filt('inv-stock-store-filter');
    var rows = rowsFor(dept, centre, cat, store);
    if (!rows.length) { try { showToast('No stock for this department and centre', 'w'); } catch (e) {} return; }
    var g = {};
    rows.forEach(function (r) {
      var d = deptOf(r), s = String(r.store || 'Unassigned store'), c = String(r.cat || 'General').trim() || 'General', n = label(r);
      g[d] = g[d] || {}; g[d][s] = g[d][s] || {}; g[d][s][c] = g[d][s][c] || {};
      var it = g[d][s][c][n] = g[d][s][c][n] || { qty: 0, exp: '' };
      it.qty += Math.max(0, Number(r.stock) || 0);
      var e = String(r.exp || ''); if (e && (!it.exp || e < it.exp)) it.exp = e;
    });
    var total = rows.reduce(function (t, r) { return t + Math.max(0, Number(r.stock) || 0); }, 0);
    var dn = {}; DEPTS.forEach(function (x) { dn[x[0]] = x[1]; });
    var body = '';
    Object.keys(g).sort().forEach(function (d) {
      if (dept === 'all') body += '<div class="d">' + esc(dn[d] || d) + '</div>';
      Object.keys(g[d]).sort().forEach(function (s) {
        var stTotal = 0; Object.keys(g[d][s]).forEach(function (c) { Object.keys(g[d][s][c]).forEach(function (n) { stTotal += g[d][s][c][n].qty; }); });
        body += '<div class="s">' + esc(s) + ' <span>' + stTotal + '</span></div>';
        Object.keys(g[d][s]).sort(function (a, b) { return a.toLowerCase() === 'iol' ? -1 : b.toLowerCase() === 'iol' ? 1 : a.localeCompare(b); }).forEach(function (c) {
          body += '<div class="c">' + esc(c) + '</div>';
          Object.keys(g[d][s][c]).sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); }).forEach(function (n) {
            var it = g[d][s][c][n];
            body += '<div class="i"><span class="n">' + esc(n) + (it.exp ? ' <small>exp ' + esc(it.exp) + '</small>' : '') + '</span><b>' + it.qty + '</b><span class="ck"></span></div>';
          });
        });
      });
    });
    var title = (dept === 'all' ? 'All departments' : dn[dept]) + ' · ' + (centre === 'all' ? 'Both centres' : centre === 'CHD' ? 'Chandigarh' : 'Ropar');
    var hosp = 'Baweja Multispeciality Hospital'; try { hosp = getHospitalDetailValue('Hospital Name', hosp); } catch (e) {}
    var printed = ''; try { printed = formatDateIN(new Date()); } catch (e) { printed = new Date().toLocaleDateString('en-IN'); }
    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Stock — ' + esc(title) + '</title><style>'
      + '@page{size:A4;margin:8mm}*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;font-size:9.5px;color:#111}'
      + '.hd{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:1.5px solid #1A3C6E;padding-bottom:3px;margin-bottom:5px}.hd b{font-size:12.5px}.hd span{font-size:9px;color:#444}'
      + '.cols{column-count:3;column-gap:5mm;column-rule:1px solid #ddd}'
      + '.d{font-size:11px;font-weight:900;background:#1A3C6E;color:#fff;padding:2px 4px;margin:3px 0 2px;break-after:avoid}'
      + '.s{font-size:10.5px;font-weight:900;color:#1A3C6E;border-bottom:1px solid #1A3C6E;margin:5px 0 1px;padding-bottom:1px;break-after:avoid;display:flex;justify-content:space-between}.s span{color:#555;font-size:9px}'
      + '.c{font-size:8.5px;font-weight:800;text-transform:uppercase;color:#666;margin:3px 0 1px;break-after:avoid}'
      + '.i{display:flex;gap:4px;align-items:baseline;padding:1px 0;border-bottom:1px dotted #ccc;break-inside:avoid;line-height:1.2}.i .n{flex:1}.i small{color:#888;font-size:7.5px}.i b{min-width:18px;text-align:right}.ck{display:inline-block;width:20px;border-bottom:1px solid #999;height:9px}'
      + '</style></head><body><div class="hd"><b>' + esc(hosp) + ' — Current stock: ' + esc(title) + '</b><span>' + esc(printed) + ' · ' + rows.length + ' lines · ' + total + ' units' + (cat !== 'all' ? ' · ' + esc(cat) : '') + (store !== 'all' ? ' · ' + esc(store) : '') + ' · last column for physical count</span></div><div class="cols">' + body + '</div></body></html>';
    try { safePrint(html); } catch (e) { var w = window.open('', '_blank'); if (w) { w.document.write(html + '<script>window.onload=function(){window.print()}<\/script>'); w.document.close(); } }
  }
  window.printInventoryCurrentStockReport = function () {
    var sc = null; try { sc = window.bmhInvScope && bmhInvScope.scope && bmhInvScope.scope(); } catch (e) {}
    var old = document.getElementById('spr-ov'); if (old) old.remove();
    var ov = document.createElement('div'); ov.id = 'spr-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4800;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:14px';
    var deptOpts = (sc ? DEPTS.filter(function (x) { return x[0] === sc.dept; }) : [['all', 'All departments']].concat(DEPTS)).map(function (x) { return '<option value="' + x[0] + '">' + x[1] + '</option>'; }).join('');
    var cOpts = (sc && sc.centre !== 'ALL' ? [[sc.centre, sc.centre === 'CHD' ? 'Chandigarh' : 'Ropar']] : [['RPR', 'Ropar'], ['CHD', 'Chandigarh'], ['all', 'Both centres']]).map(function (x) { return '<option value="' + x[0] + '">' + x[1] + '</option>'; }).join('');
    ov.innerHTML = '<div style="background:#fff;border-radius:14px;max-width:380px;width:100%;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)">'
      + '<div style="font-size:15px;font-weight:900;margin-bottom:10px">🖨️ Print current stock</div>'
      + '<label style="font-size:11px;font-weight:800;color:#556;display:block;margin-bottom:3px">DEPARTMENT</label><select id="spr-dept" style="width:100%;padding:8px;border:1px solid #cfd6e2;border-radius:8px;margin-bottom:10px">' + deptOpts + '</select>'
      + '<label style="font-size:11px;font-weight:800;color:#556;display:block;margin-bottom:3px">CENTRE</label><select id="spr-centre" style="width:100%;padding:8px;border:1px solid #cfd6e2;border-radius:8px;margin-bottom:8px">' + cOpts + '</select>'
      + '<div id="spr-count" style="font-size:11.5px;color:#555;margin-bottom:10px"></div>'
      + '<div style="display:flex;justify-content:flex-end;gap:8px"><button type="button" class="btn btn-gray btn-sm" id="spr-x">Cancel</button><button type="button" class="btn btn-gold btn-sm" id="spr-go">Print (3 columns)</button></div></div>';
    document.body.appendChild(ov);
    var dSel = ov.querySelector('#spr-dept'), cSel = ov.querySelector('#spr-centre');
    var upd = function () { var n = rowsFor(dSel.value, cSel.value, filt('inv-stock-cat-filter'), filt('inv-stock-store-filter')); var u = n.reduce(function (t, r) { return t + (Number(r.stock) || 0); }, 0); ov.querySelector('#spr-count').textContent = n.length + ' stock lines · ' + u + ' units'; };
    dSel.onchange = upd; cSel.onchange = upd; upd();
    ov.querySelector('#spr-x').onclick = function () { ov.remove(); };
    ov.querySelector('#spr-go').onclick = function () { var d = dSel.value, c = cSel.value; ov.remove(); printNow(d, c); };
  };
})();
