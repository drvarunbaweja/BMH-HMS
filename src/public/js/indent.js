/* BMH — Inventory → Indents (new flow; the old indent form stays in the code, hidden).
 *  • Raise an indent: requesting store, "Required from" (Pharmacy by default), urgency, notes, and as many lines as
 *    needed. The item box searches the stock names of that department at that centre (typing "carb" shows
 *    Carboprost); a name not in the list can still be typed.
 *  • A saved indent can be edited freely until it is printed. After printing, editing needs the admin PIN.
 *  • Receiving: the department's own login is asked "Has all the stock been received?" —
 *      Yes → every line's full quantity is added to the requesting store.
 *      Not all → a pop-up lists the lines; enter what came, and only that is added. The rest can be received later.
 *    Stock is only added to the department (Pharmacy stock is not tracked here). If the item is not yet in the
 *    requesting store, a new stock line is made there with the same name, category and details.
 *  • The question appears only on logins of the requesting department and centre (not, e.g., on an eye login).
 * Indents are saved line by line in their own database place (inventoryIndents/<id>) so other saves cannot wipe them;
 * received stock can carry batch, expiry and MRP (a new stock line per batch / expiry). "All saved" shows every indent.
 */
(function () {
  'use strict';
  var PIN = '2080'; // existing admin PIN (same as attendance / inventory deletion)
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function toast(m, t) { try { showToast(m, t || 's'); } catch (e) {} }
  function user() { try { return CURRENT_USER || null; } catch (e) { return null; } }
  function me() { var u = user(); return (u && (u.name || u.username)) || 'Staff'; }
  function isAdmin() { var u = user(); try { return !!(u && (u.isAdmin || (typeof isAdminUser === 'function' && isAdminUser()))); } catch (e) { return !!(u && u.isAdmin); } }
  function inv() { try { return INVENTORY || []; } catch (e) { return window.INVENTORY || []; } }
  function list() { window.BMH_INVENTORY_INDENTS = window.BMH_INVENTORY_INDENTS || []; return window.BMH_INVENTORY_INDENTS; }
  function norm(v) { try { return normalizeInventoryCompareText(v || ''); } catch (e) { return String(v || '').trim().toLowerCase().replace(/\s+/g, ' '); } }
  function S() { return window.bmhInvScope || null; }
  function scope() { try { return S() && S().scope ? S().scope() : null; } catch (e) { return null; } }
  function deptKey(v) { try { return S().deptKey(v) || normalizeDeptKeyForQueue(v || '') || ''; } catch (e) { return String(v || '').toLowerCase(); } }
  function storeCentre(st) { try { return S().storeCentre(st) || 'RPR'; } catch (e) { return /\bCHD\b/i.test(String(st || '')) ? 'CHD' : 'RPR'; } }
  function storeDept(st) {
    var d = ''; try { d = S().storeDept(st) || ''; } catch (e) {}
    if (d) return d;
    // a store whose name does not say the department: use the department of the stock kept there
    var c = {}; inv().forEach(function (r) { if (r && norm(r.store) === norm(st)) { var k = deptKey(r.dept); if (k) c[k] = (c[k] || 0) + 1; } });
    var best = ''; Object.keys(c).forEach(function (k) { if (!best || c[k] > c[best]) best = k; });
    return best;
  }
  var DEPT_LABEL = { ophtho: 'Ophthalmology', obg: 'OBG', psych: 'Psychiatry', skin: 'Skin' };
  var DEMO = /^(MFX-001|PDN-002|CMC-003|TIM-004|IOL-021|IOL-023|OTP-001|BEV-001|MAN-001|RL-001)$/;
  function nowISO() { return new Date().toISOString(); }
  function fmt(iso) { if (!iso) return ''; try { var d = new Date(iso); return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); } catch (e) { return String(iso); } }
  function itemLabel(r) {
    if (String(r.cat || '').toLowerCase() === 'iol') {
      var b = ''; try { b = _iolBrandLabel(r); } catch (e) { b = r.iolBrand || r.name || ''; }
      return [b, r.power].filter(Boolean).join(' ');
    }
    return String(r.name || '').trim();
  }
  function stores() { try { return (window.bmhInventoryStoreOptions ? window.bmhInventoryStoreOptions() : (window.BMH_STORE_LOCATIONS || [])).slice(); } catch (e) { return (window.BMH_STORE_LOCATIONS || []).slice(); } }
  function userCentre() { var u = user() || {}; var c = String(u.centre || '').toUpperCase(); return /CHD|CHANDIGARH/.test(c) ? 'CHD' : /RPR|ROPAR|RUPNAGAR/.test(c) ? 'RPR' : ''; }

  // ── which indents a login sees / is asked about ──
  function isNew(r) { return r && r.v === 2 && r.batchId; }
  function batches(filterFn) {
    var by = {}, order = [];
    list().forEach(function (r) { if (!isNew(r)) return; if (!by[r.batchId]) { by[r.batchId] = []; order.push(r.batchId); } by[r.batchId].push(r); });
    return order.map(function (id) { return by[id]; }).filter(function (lines) { return !filterFn || filterFn(lines[0], lines); })
      .sort(function (a, b) { return String(b[0].createdAt || '').localeCompare(String(a[0].createdAt || '')); });
  }
  function visible(h) {
    if (isAdmin()) return true;
    var sc = scope();
    if (sc) return storeCentre(h.requestStore) === sc.centre && storeDept(h.requestStore) === sc.dept;
    var c = userCentre();
    return !c || storeCentre(h.requestStore) === c || storeCentre(h.sourceStore) === c;
  }
  function askHere(h) { // only the requesting department's own login is asked
    var sc = scope(); if (!sc) return false;
    return storeCentre(h.requestStore) === sc.centre && storeDept(h.requestStore) === sc.dept;
  }
  function statusOf(lines) {
    if (lines[0].status === 'cancelled') return 'cancelled';
    var got = lines.reduce(function (t, l) { return t + (Number(l.receivedQty) || 0); }, 0);
    var all = lines.every(function (l) { return (Number(l.receivedQty) || 0) >= (Number(l.qty) || 0) || l.closed; });
    return all ? 'received' : got > 0 ? 'partial' : 'open';
  }

  // ── item search for a requesting store ──
  function itemsFor(store) {
    var d = storeDept(store), c = storeCentre(store), sc = scope();
    if (sc) { d = d || sc.dept; c = sc.centre; }
    var g = {};
    inv().forEach(function (r) {
      if (!r || DEMO.test(String(r.barcode || ''))) return;
      var rd = storeDept(r.store) || deptKey(r.dept), rc = storeCentre(r.store);
      if (d && rd !== d) return;
      if (c && rc !== c) return;
      var name = itemLabel(r); if (!name) return;
      var k = norm(name);
      var e = g[k] = g[k] || { name: name, cat: r.cat || '', stock: 0, barcode: r.barcode, here: 0 };
      e.stock += Math.max(0, Number(r.stock) || 0);
      if (norm(r.store) === norm(store)) { e.here += Math.max(0, Number(r.stock) || 0); e.barcode = r.barcode; }
    });
    return Object.keys(g).map(function (k) { return g[k]; }).sort(function (a, b) { return a.name.localeCompare(b.name); });
  }

  // ── UI: form ──
  var F = { edit: null, lines: [] }; // edit = batchId being edited
  function css() {
    if (document.getElementById('ind2-css')) return;
    var s = document.createElement('style'); s.id = 'ind2-css';
    s.textContent = '#ind2 .fl{display:block;font-size:10.5px;font-weight:800;color:#556;margin-bottom:3px;text-transform:uppercase}'
      + '#ind2 select,#ind2 input[type=text],#ind2 input[type=number]{width:100%;padding:8px;border:1px solid #cfd6e2;border-radius:8px;font-size:13px;background:#fff;box-sizing:border-box}'
      + '#ind2 .ln{display:grid;grid-template-columns:26px 1fr 90px 34px;gap:8px;align-items:center;margin-bottom:6px;position:relative}'
      + '#ind2 .dd{position:absolute;left:34px;right:132px;top:100%;z-index:50;background:#fff;border:1px solid #cfd6e2;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.15);max-height:240px;overflow:auto}'
      + '#ind2 .dd div{padding:7px 10px;font-size:12.5px;cursor:pointer;display:flex;justify-content:space-between;gap:8px;border-bottom:1px solid #f2f2f2}#ind2 .dd div:hover,#ind2 .dd div.on{background:#eef4ff}'
      + '#ind2 .dd small{color:#777}#ind2 .bt{border:1px solid #e3e7ef;border-radius:10px;padding:10px;margin-bottom:8px;background:#fff}'
      + '#ind2 .bt table{width:100%;border-collapse:collapse;font-size:12px;margin-top:6px}#ind2 .bt td,#ind2 .bt th{padding:4px 6px;border-bottom:1px solid #f0f0f0;text-align:left}#ind2 .bt th{font-size:10.5px;color:#667;text-transform:uppercase}'
      + '.ind2-ov{position:fixed;inset:0;z-index:4900;background:rgba(10,20,40,.45);display:flex;align-items:center;justify-content:center;padding:14px}'
      + '.ind2-box{background:#fff;border-radius:14px;max-width:820px;width:100%;max-height:90vh;overflow:auto;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.3)}'
      + '.ind2-box table{width:100%;border-collapse:collapse;font-size:12.5px}.ind2-box td,.ind2-box th{padding:6px;border-bottom:1px solid #eee;text-align:left}.ind2-box input{width:80px;padding:6px;border:1px solid #cfd6e2;border-radius:6px}'
      + '#ind2-ask{position:fixed;right:14px;bottom:14px;z-index:4700;max-width:360px;background:#fff;border:2px solid #E8901A;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.25);padding:12px;font-size:12.5px}';
    document.head.appendChild(s);
  }
  function host() {
    var tab = document.getElementById('inv-indent'); if (!tab) return null;
    var h = document.getElementById('ind2');
    if (!h) {
      Array.prototype.forEach.call(tab.children, function (c) { c.style.display = 'none'; c.setAttribute('data-ind2-hidden', '1'); });
      h = document.createElement('div'); h.id = 'ind2'; tab.insertBefore(h, tab.firstChild);
    }
    return h;
  }
  function blankLine() { return { item: '', barcode: '', qty: 1 }; }
  function render() {
    css(); var h = host(); if (!h) return;
    if (!F.lines.length) F.lines = [blankLine()];
    var st = stores(), cur = F.store || st[0] || '';
    if (st.indexOf(cur) < 0 && cur) st.unshift(cur);
    var srcs = ['Pharmacy'].concat(stores().filter(function (s) { return norm(s) !== norm(cur); }));
    var src = F.source || 'Pharmacy';
    if (srcs.indexOf(src) < 0) srcs.push(src);
    var form = '<div style="background:var(--g6,#f5f7fb);border-radius:10px;padding:12px;margin-bottom:12px">'
      + '<div style="font-size:11px;font-weight:900;color:var(--bmh-blue,#1A3C6E);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">' + (F.edit ? '✏️ Editing indent ' + esc(F.no || '') : 'Raise indent') + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin-bottom:10px">'
      + '<div><label class="fl">Requesting store</label><select id="ind2-store">' + st.map(function (s) { return '<option' + (s === cur ? ' selected' : '') + '>' + esc(s) + '</option>'; }).join('') + '</select></div>'
      + '<div><label class="fl">Required from</label><select id="ind2-src">' + srcs.map(function (s) { return '<option' + (s === src ? ' selected' : '') + '>' + esc(s) + '</option>'; }).join('') + '</select></div>'
      + '<div><label class="fl">Urgency</label><select id="ind2-urg">' + ['routine', 'priority', 'urgent'].map(function (u) { return '<option value="' + u + '"' + ((F.urgency || 'routine') === u ? ' selected' : '') + '>' + u.charAt(0).toUpperCase() + u.slice(1) + '</option>'; }).join('') + '</select></div></div>'
      + '<label class="fl">Items needed</label><div id="ind2-lines">' + F.lines.map(function (l, i) {
        return '<div class="ln" data-i="' + i + '"><b style="color:#1A3C6E">' + (i + 1) + '</b>'
          + '<input type="text" class="ind2-it" data-i="' + i + '" autocomplete="off" placeholder="Type to search, e.g. carb" value="' + esc(l.item) + '">'
          + '<input type="number" class="ind2-q" data-i="' + i + '" min="1" value="' + esc(l.qty) + '" title="Quantity">'
          + '<button type="button" class="btn btn-xs btn-outline" title="Remove line" onclick="bmhInd2.delLine(' + i + ')">✕</button></div>';
      }).join('') + '</div>'
      + '<button type="button" class="btn btn-outline btn-sm" onclick="bmhInd2.addLine()">+ Add line</button>'
      + '<div style="margin-top:10px"><label class="fl">Notes</label><input type="text" id="ind2-notes" placeholder="Reason / case details / staff note" value="' + esc(F.notes || '') + '"></div>'
      + '<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px">' + (F.edit ? '<button type="button" class="btn btn-gray btn-sm" onclick="bmhInd2.cancelEdit()">Cancel edit</button>' : '')
      + '<button type="button" class="btn btn-gold btn-sm" onclick="bmhInd2.save(true)">💾🖨️ Save &amp; print</button>'
      + '<button type="button" class="btn btn-orange btn-sm" onclick="bmhInd2.save()">' + (F.edit ? '💾 Save changes' : '💾 Save indent') + '</button></div></div>';
    var vw = F.view || 'open';
    h.innerHTML = form + '<div class="card"><div class="card-hd" style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><div class="card-title">Indents</div>'
      + '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">' + [['open', 'Waiting / part'], ['received', 'Received'], ['all', 'All saved']].map(function (x) { return '<button type="button" class="btn btn-xs ' + (vw === x[0] ? 'btn-blue' : 'btn-outline') + '" onclick="bmhInd2.view(\'' + x[0] + '\')">' + x[1] + '</button>'; }).join('')
      + '<input type="text" id="ind2-q" placeholder="🔍 Indent no. / item / store" style="width:200px;padding:6px 8px;border:1px solid #cfd6e2;border-radius:8px;font-size:12px" value="' + esc(F.q || '') + '"></div></div><div id="ind2-list" style="padding:4px 2px"></div></div>';
    bind(); renderList();
    var qEl = document.getElementById('ind2-q'); if (qEl) qEl.oninput = function () { F.q = qEl.value; renderList(); };
  }
  function readTop() {
    var g = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
    F.store = g('ind2-store') || F.store; F.source = g('ind2-src') || F.source; F.urgency = g('ind2-urg') || 'routine'; F.notes = g('ind2-notes');
    Array.prototype.forEach.call(document.querySelectorAll('#ind2 .ind2-q'), function (q) { var i = +q.getAttribute('data-i'); if (F.lines[i]) F.lines[i].qty = Math.max(1, Math.round(Number(q.value) || 1)); });
    Array.prototype.forEach.call(document.querySelectorAll('#ind2 .ind2-it'), function (q) { var i = +q.getAttribute('data-i'); if (F.lines[i] && norm(F.lines[i].item) !== norm(q.value)) { F.lines[i].item = q.value; F.lines[i].barcode = ''; } });
  }
  function bind() {
    var sEl = document.getElementById('ind2-store');
    if (sEl) sEl.onchange = function () { readTop(); F.lines.forEach(function (l) { l.barcode = ''; }); render(); };
    Array.prototype.forEach.call(document.querySelectorAll('#ind2 .ind2-it'), function (inp) {
      var i = +inp.getAttribute('data-i'), dd = null, sel = -1, opts = [];
      var close = function () { if (dd) { dd.remove(); dd = null; } };
      var show = function () {
        close(); var q = norm(inp.value); if (!q) return;
        var all = itemsFor(document.getElementById('ind2-store').value);
        opts = all.filter(function (x) { return norm(x.name).indexOf(q) >= 0; })
          .sort(function (a, b) { var ia = norm(a.name).indexOf(q), ib = norm(b.name).indexOf(q); return (ia === 0 ? 0 : 1) - (ib === 0 ? 0 : 1) || a.name.localeCompare(b.name); }).slice(0, 30);
        dd = document.createElement('div'); dd.className = 'dd';
        dd.innerHTML = opts.length ? opts.map(function (x, k) { return '<div data-k="' + k + '"><span>' + esc(x.name) + (x.cat ? ' <small>' + esc(x.cat) + '</small>' : '') + '</span><small>in stock ' + x.stock + '</small></div>'; }).join('')
          : '<div style="cursor:default;color:#777">Not in this department\'s stock list — it will be added as typed</div>';
        inp.parentNode.appendChild(dd); sel = -1;
        Array.prototype.forEach.call(dd.querySelectorAll('[data-k]'), function (el) { el.onmousedown = function (ev) { ev.preventDefault(); pick(+el.getAttribute('data-k')); }; });
      };
      var pick = function (k) { var x = opts[k]; if (!x) return; inp.value = x.name; F.lines[i].item = x.name; F.lines[i].barcode = x.barcode || ''; close(); var q = inp.parentNode.querySelector('.ind2-q'); if (q) { q.focus(); q.select(); } };
      inp.oninput = function () { F.lines[i].item = inp.value; F.lines[i].barcode = ''; show(); };
      inp.onfocus = show;
      inp.onblur = function () { setTimeout(close, 150); };
      inp.onkeydown = function (ev) {
        if (!dd) return; var items = dd.querySelectorAll('[data-k]'); if (!items.length) return;
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { ev.preventDefault(); sel = (sel + (ev.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; Array.prototype.forEach.call(items, function (el, k) { el.classList.toggle('on', k === sel); }); }
        else if (ev.key === 'Enter') { ev.preventDefault(); pick(sel < 0 ? 0 : sel); }
        else if (ev.key === 'Escape') close();
      };
    });
  }
  function renderList() {
    var el = document.getElementById('ind2-list'); if (!el) return;
    var vw = F.view || 'open', q = norm(F.q || '');
    var bs = batches(visible).filter(function (lines) {
      var st = statusOf(lines);
      if (vw === 'open' && !(st === 'open' || st === 'partial')) return false;
      if (vw === 'received' && st !== 'received') return false;
      if (q) { var h0 = lines[0], hay = norm([h0.indentNo, h0.requestStore, h0.sourceStore, h0.requestedBy, h0.notes].concat(lines.map(function (l) { return l.item; })).join(' ')); if (hay.indexOf(q) < 0) return false; }
      return true;
    });
    if (!bs.length) { el.innerHTML = '<div style="padding:12px;color:#777;font-size:12px">' + (vw === 'open' && !q ? 'No indents waiting. Use "All saved" to see every indent.' : 'No indents found.') + '</div>'; return; }
    var badge = { open: ['Waiting', '#E8901A'], partial: ['Part received', '#B7791F'], received: ['Received', '#2F855A'], cancelled: ['Cancelled', '#888'] };
    el.innerHTML = bs.slice(0, 200).map(function (lines) {
      var h = lines[0], st = statusOf(lines), b = badge[st];
      var btns = [];
      if (st === 'open' || st === 'partial') {
        if (st === 'open') btns.push('<button type="button" class="btn btn-xs btn-outline" onclick="bmhInd2.edit(\'' + h.batchId + '\')">✏️ Edit' + (h.printedAt ? ' (admin PIN)' : '') + '</button>');
        btns.push('<button type="button" class="btn btn-xs btn-green" onclick="bmhInd2.receive(\'' + h.batchId + '\')">📦 ' + (st === 'partial' ? 'Receive rest' : 'Stock received?') + '</button>');
      }
      btns.push('<button type="button" class="btn btn-xs btn-gold" onclick="bmhInd2.print(\'' + h.batchId + '\')">🖨️ Print</button>');
      if (st === 'partial' && isAdmin()) btns.push('<button type="button" class="btn btn-xs btn-gray" onclick="bmhInd2.close(\'' + h.batchId + '\')">Close (rest not coming)</button>');
      if (st === 'open' && isAdmin()) btns.push('<button type="button" class="btn btn-xs btn-gray" onclick="bmhInd2.cancel(\'' + h.batchId + '\')">Cancel indent</button>');
      return '<div class="bt"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center">'
        + '<div><b style="color:#1A3C6E">' + esc(h.indentNo || '') + '</b> · ' + esc(h.requestStore) + ' ← ' + esc(h.sourceStore) + (h.urgency && h.urgency !== 'routine' ? ' · <b style="color:' + (h.urgency === 'urgent' ? '#C53030' : '#B7791F') + '">' + esc(h.urgency) + '</b>' : '')
        + '<div style="font-size:10.5px;color:#666">' + esc(h.requestedBy || '') + ' · ' + esc(fmt(h.createdAt)) + (h.printedAt ? ' · 🖨️ printed ' + esc(fmt(h.printedAt)) : '') + (h.editedAt ? ' · edited ' + esc(fmt(h.editedAt)) : '') + '</div></div>'
        + '<span style="background:' + b[1] + ';color:#fff;border-radius:20px;padding:2px 10px;font-size:11px;font-weight:800">' + b[0] + '</span></div>'
        + '<table><tr><th>#</th><th>Item</th><th style="text-align:right">Asked</th><th style="text-align:right">Received</th></tr>'
        + lines.map(function (l, k) { var rc = (l.receipts || []).filter(function (r) { return r && (r.exp || r.batch); }).map(function (r) { return [r.batch ? 'B ' + r.batch : '', r.exp ? 'exp ' + r.exp : ''].filter(Boolean).join(' '); }).join('; '); return '<tr><td>' + (k + 1) + '</td><td>' + esc(l.item) + (l.closed ? ' <small style="color:#888">(closed)</small>' : '') + (rc ? ' <small style="color:#2F855A">' + esc(rc) + '</small>' : '') + '</td><td style="text-align:right">' + (Number(l.qty) || 0) + '</td><td style="text-align:right">' + (Number(l.receivedQty) || 0) + '</td></tr>'; }).join('') + '</table>'
        + (h.notes ? '<div style="font-size:11px;color:#555;margin-top:4px">📝 ' + esc(h.notes) + '</div>' : '')
        + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">' + btns.join('') + '</div></div>';
    }).join('');
  }

  // ── actions ──
  function persist() {
    try { saveBmhFinancials(); } catch (e) { console.warn('[indent] save', e); }
  }
  // Indents are kept in their own place in the database (inventoryIndents/<line id>), saved line by line.
  // (The shared financial record is rewritten as a whole by every computer, which could wipe a new indent.)
  function fbref(p) { return window.FBDB ? window.FBDB.ref(p) : null; }
  function plain(o) { return JSON.parse(JSON.stringify(o)); }
  function putLines(lines) {
    var r = fbref('inventoryIndents'); if (!r || !lines.length) return;
    var up = {}; lines.forEach(function (l) { up[l.id] = plain(l); });
    r.update(up).catch(function (e) { console.warn('[indent] cloud save', e); toast('Indent not saved to the server — check the internet and save again', 'w'); });
  }
  function dropLines(ids) { var r = fbref('inventoryIndents'); if (!r || !ids.length) return; var up = {}; ids.forEach(function (id) { up[id] = null; }); r.update(up).catch(function () {}); }
  var REMOTE = null, migrated = false, listening = false;
  function mergeRemote() {
    if (!REMOTE) return;
    var arr = list();
    for (var i = arr.length - 1; i >= 0; i--) if (isNew(arr[i])) arr.splice(i, 1);
    Object.keys(REMOTE).forEach(function (k) { var r = REMOTE[k]; if (r && typeof r === 'object') { r.id = r.id || k; arr.push(r); } });
  }
  function listen() {
    var r = fbref('inventoryIndents'); if (!r || listening) return listening;
    listening = true;
    r.on('value', function (snap) {
      var v = snap.val() || {};
      if (!migrated) { // indents saved before this change (still in the financial record): copy them across once
        migrated = true;
        var miss = list().filter(function (x) { return isNew(x) && !v[x.id]; });
        if (miss.length) { miss.forEach(function (x) { v[x.id] = x; }); putLines(miss); }
      }
      REMOTE = v; mergeRemote();
      try { if (document.getElementById('ind2-list')) renderList(); } catch (e) {}
      try { checkAsk(); } catch (e) {}
    });
    return true;
  }
  function linesOf(id) { return list().filter(function (r) { return isNew(r) && r.batchId === id; }); }
  function newNo() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
    var day = String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate());
    var n = list().filter(function (r) { return isNew(r) && String(r.indentNo || '').indexOf('IND-' + day) === 0; }).reduce(function (o, r) { o[r.batchId] = 1; return o; }, {});
    return 'IND-' + day + '-' + String(Object.keys(n).length + 1).padStart(2, '0');
  }
  function save() {
    readTop();
    var lines = F.lines.map(function (l) { return { item: String(l.item || '').trim(), barcode: l.barcode || '', qty: Math.max(1, Math.round(Number(l.qty) || 1)) }; }).filter(function (l) { return l.item; });
    if (!F.store) { toast('Choose the requesting store', 'w'); return; }
    if (!lines.length) { toast('Add at least one item', 'w'); return; }
    if (norm(F.store) === norm(F.source)) { toast('Requesting store and "Required from" are the same', 'w'); return; }
    // the item list: fill a missing barcode from the search list when the typed name matches exactly
    var known = itemsFor(F.store); lines.forEach(function (l) { if (!l.barcode) { var m = known.find(function (x) { return norm(x.name) === norm(l.item); }); if (m) { l.barcode = m.barcode || ''; l.item = m.name; } } });
    var ts = nowISO(), arr = list(), old = F.edit ? linesOf(F.edit) : [], head = old[0] || null;
    var batchId = F.edit || ('INDB' + Date.now()), no = head ? head.indentNo : newNo();
    if (F.edit) {
      if (statusOf(old) !== 'open') { toast('This indent has stock received already; it can no longer be edited', 'w'); return; }
      for (var i = arr.length - 1; i >= 0; i--) if (isNew(arr[i]) && arr[i].batchId === F.edit) arr.splice(i, 1);
    }
    var log = (head && head.editLog) ? head.editLog.slice() : [];
    if (F.edit) log.push({ at: ts, by: me(), was: old.map(function (l) { return l.item + ' × ' + l.qty; }).join('; '), afterPrint: !!(head && head.printedAt) });
    lines.forEach(function (l, idx) {
      arr.push({
        id: batchId + '-' + idx, batchId: batchId, v: 2, indentNo: no,
        requestStore: F.store, sourceStore: F.source || 'Pharmacy', centre: storeCentre(F.store), dept: storeDept(F.store),
        item: l.item, barcode: l.barcode, qty: l.qty, urgency: F.urgency || 'routine', notes: F.notes || '',
        status: 'open', receivedQty: 0,
        requestedBy: head ? head.requestedBy : me(), createdAt: head ? head.createdAt : ts,
        printedAt: head ? (head.printedAt || '') : '', printedBy: head ? (head.printedBy || '') : '',
        editedAt: F.edit ? ts : '', editedBy: F.edit ? me() : '', editLog: log
      });
    });
    var newLines = linesOf(batchId), newIds = newLines.map(function (l) { return l.id; });
    dropLines(old.map(function (l) { return l.id; }).filter(function (id) { return newIds.indexOf(id) < 0; }));
    putLines(newLines);
    persist();
    toast((F.edit ? 'Indent ' + no + ' updated' : 'Indent ' + no + ' saved') + ' ✓', 's');
    var andPrint = F.andPrint;
    F = { edit: null, lines: [], store: F.store, source: 'Pharmacy', view: F.view };
    render(); checkAsk();
    if (andPrint) print(batchId);
  }
  function pinOk() {
    if (Number(window._bmhIndentPinUntil || 0) > Date.now()) return true;
    var p = prompt('This indent has been printed. Enter the admin PIN to edit it.');
    if (p === null) return false;
    if (String(p).trim() !== PIN) { toast('Incorrect admin PIN', 'w'); return false; }
    window._bmhIndentPinUntil = Date.now() + 10 * 60e3;
    return true;
  }
  function edit(id) {
    var lines = linesOf(id); if (!lines.length) return;
    if (statusOf(lines) !== 'open') { toast('Stock has been received on this indent; it can no longer be edited', 'w'); return; }
    if (lines[0].printedAt && !pinOk()) return;
    var h = lines[0];
    F = { edit: id, no: h.indentNo, store: h.requestStore, source: h.sourceStore, urgency: h.urgency, notes: h.notes, lines: lines.map(function (l) { return { item: l.item, barcode: l.barcode, qty: l.qty }; }) };
    render();
    var t = document.getElementById('ind2'); if (t && t.scrollIntoView) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function print(id) {
    var lines = linesOf(id); if (!lines.length) return;
    var h = lines[0], ts = nowISO();
    var hosp = 'Baweja Multispeciality Hospital'; try { hosp = getHospitalDetailValue('Hospital Name', hosp); } catch (e) {}
    var rows = lines.map(function (l, k) { return '<tr><td>' + (k + 1) + '</td><td>' + esc(l.item) + '</td><td class="n">' + (Number(l.qty) || 0) + '</td><td class="n">' + (Number(l.receivedQty) ? Number(l.receivedQty) : '') + '</td><td></td></tr>'; }).join('');
    var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Indent ' + esc(h.indentNo) + '</title><style>@page{size:A4;margin:12mm}body{font-family:Arial,sans-serif;font-size:12px;color:#111}'
      + 'h1{font-size:16px;margin:0}h2{font-size:14px;margin:4px 0 10px;color:#1A3C6E}.m{display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;margin-bottom:10px}'
      + 'table{width:100%;border-collapse:collapse}th,td{border:1px solid #999;padding:6px;text-align:left}th{background:#eef2f8;font-size:11px}.n{text-align:right;width:70px}'
      + '.sg{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-top:50px}.sg div{border-top:1px solid #333;padding-top:4px;text-align:center;font-size:11px}</style></head><body>'
      + '<h1>' + esc(hosp) + '</h1><h2>Store indent ' + esc(h.indentNo) + (h.urgency && h.urgency !== 'routine' ? ' — ' + esc(h.urgency.toUpperCase()) : '') + '</h2>'
      + '<div class="m"><div><b>Requesting store:</b> ' + esc(h.requestStore) + '</div><div><b>Required from:</b> ' + esc(h.sourceStore) + '</div>'
      + '<div><b>Raised by:</b> ' + esc(h.requestedBy) + '</div><div><b>Date:</b> ' + esc(fmt(h.createdAt)) + '</div>'
      + (h.notes ? '<div style="grid-column:1/3"><b>Notes:</b> ' + esc(h.notes) + '</div>' : '') + '</div>'
      + '<table><tr><th style="width:30px">#</th><th>Item</th><th class="n">Qty asked</th><th class="n">Qty issued</th><th style="width:150px">Remarks</th></tr>' + rows + '</table>'
      + '<div class="sg"><div>Requested by</div><div>Issued by (' + esc(h.sourceStore) + ')</div><div>Received by</div></div>'
      + '<div style="margin-top:14px;font-size:10px;color:#666">Printed ' + esc(fmt(ts)) + ' by ' + esc(me()) + '</div></body></html>';
    if (!h.printedAt) { lines.forEach(function (l) { l.printedAt = ts; l.printedBy = me(); }); putLines(lines); persist(); renderList(); }
    try { safePrint(html); } catch (e) { var w = window.open('', '_blank'); if (w) { w.document.write(html + '<script>window.onload=function(){window.print()}<\/script>'); w.document.close(); } }
  }

  // ── receiving: add stock to the requesting store ──
  function addStock(line, qty, h, ts, changed, det) {
    var store = h.requestStore, all = inv();
    det = det || {};
    var hasDet = !!(det.exp || det.batch);
    var sameItem = function (r) { return r && norm(r.store) === norm(store) && ((line.barcode && String(r.barcode) === String(line.barcode)) || norm(itemLabel(r)) === norm(line.item)); };
    var target = hasDet
      // with an expiry / batch: add only to the stock line of that same batch & expiry, otherwise a new stock line
      ? all.find(function (r) { return sameItem(r) && String(r.exp || '') === String(det.exp || '') && norm(r.batchNo || '') === norm(det.batch || ''); })
      : (all.find(function (r) { return r && norm(r.store) === norm(store) && line.barcode && String(r.barcode) === String(line.barcode); })
        || all.find(function (r) { return r && norm(r.store) === norm(store) && norm(itemLabel(r)) === norm(line.item); }));
    if (target) {
      target.stock = Math.max(0, Number(target.stock) || 0) + qty; target.updatedAt = ts;
      if (det.mrp) target.mrp = Number(det.mrp) || target.mrp;
    } else {
      var tpl = (line.barcode && all.find(function (r) { return r && String(r.barcode) === String(line.barcode); }))
        || all.find(function (r) { return r && norm(itemLabel(r)) === norm(line.item) && (storeDept(r.store) || deptKey(r.dept)) === storeDept(store); }) || null;
      var bc = String((tpl && tpl.barcode) || 'IND') + '-IND-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
      target = tpl ? Object.assign({}, tpl) : { name: line.item, cat: 'General', dept: storeDept(store) || '' };
      Object.assign(target, { barcode: bc, stock: qty, store: store, updatedAt: ts, vendor: h.sourceStore || 'Pharmacy', serialNo: '', batchNo: det.batch || '', exp: det.exp || '', invoiceNo: '', billMode: '', vendorBillingMode: '' });
      if (det.mrp) target.mrp = Number(det.mrp) || target.mrp;
      try { normalizeInventoryRecord(target); } catch (e) {}
      all.push(target);
      try { if (BCMAP) { BCMAP[bc] = target; if (target.name) BCMAP[String(target.name).toLowerCase().substring(0, 15)] = target; } } catch (e) {}
    }
    changed.push(target);
    window.BMH_INVENTORY_TRANSFERS = window.BMH_INVENTORY_TRANSFERS || [];
    window.BMH_INVENTORY_TRANSFERS.push({ id: 'TRI' + Date.now() + Math.random().toString(36).slice(2, 5), itemName: line.item, barcode: target.barcode, fromStore: h.sourceStore || 'Pharmacy', toStore: store, qty: qty, ts: ts, user: me(), kind: 'indent-receive', indentNo: h.indentNo, indentBatch: h.batchId });
  }
  function applyReceipt(id, qtyByLine, detByLine) {
    var lines = linesOf(id); if (!lines.length) return;
    var h = lines[0], ts = nowISO(), changed = [], n = 0;
    lines.forEach(function (l) {
      var q = Math.max(0, Math.round(Number(qtyByLine[l.id]) || 0)); if (!q) return;
      var det = (detByLine && detByLine[l.id]) || {};
      addStock(l, q, h, ts, changed, det);
      l.receivedQty = (Number(l.receivedQty) || 0) + q; l.receivedAt = ts; l.receivedBy = me();
      l.receipts = (l.receipts || []).concat([plain({ at: ts, by: me(), qty: q, exp: det.exp || '', batch: det.batch || '', mrp: det.mrp || '' })]); n += q;
    });
    var st = statusOf(lines); lines.forEach(function (l) { l.status = st; });
    putLines(lines);
    try { bmhSyncInventoryRowsToCloud(changed); } catch (e) { changed.forEach(function (r) { try { saveInventoryToFirebase(r); } catch (e2) {} }); }
    try { saveInventoryStockToStorage(); } catch (e) {}
    persist();
    ['renderStockList', 'renderInventoryTransfers', 'renderInventoryStoreStock', 'renderInventoryPoAlerts'].forEach(function (f) { try { if (typeof window[f] === 'function') window[f](); } catch (e) {} });
    toast(n ? n + ' unit' + (n === 1 ? '' : 's') + ' added to ' + h.requestStore + ' ✓' : 'Nothing received yet', n ? 's' : 'w');
    renderList(); checkAsk();
  }
  function receive(id) {
    var lines = linesOf(id); if (!lines.length) return;
    var h = lines[0], st = statusOf(lines);
    if (st === 'received' || st === 'cancelled') return;
    if (st === 'open') {
      ov('<div style="font-size:15px;font-weight:900;margin-bottom:6px">📦 Indent ' + esc(h.indentNo) + '</div>'
        + '<div style="font-size:12.5px;color:#444;margin-bottom:12px">' + esc(h.requestStore) + ' ← ' + esc(h.sourceStore) + ' · ' + lines.length + ' item' + (lines.length === 1 ? '' : 's') + '<br><b>Has all the stock been received?</b></div>'
        + '<div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap"><button type="button" class="btn btn-gray btn-sm" data-a="x">Not yet</button><button type="button" class="btn btn-outline btn-sm" data-a="part">No, part received</button><button type="button" class="btn btn-green btn-sm" data-a="all">Yes, all received</button></div>',
        function (a, close) {
          if (a === 'all') { close(); partial(id, true); }
          else if (a === 'part') { close(); partial(id); }
          else close();
        });
    } else partial(id);
  }
  function partial(id, full) {
    var lines = linesOf(id), h = lines[0];
    ov('<div style="font-size:15px;font-weight:900;margin-bottom:4px">📦 Indent ' + esc(h.indentNo) + ' — stock received</div>'
      + '<div style="font-size:12px;color:#555;margin-bottom:8px">Enter what has come now, with its batch, expiry and MRP (if known). Only this is added to ' + esc(h.requestStore) + '.</div>'
      + '<div style="overflow-x:auto"><table><tr><th>Item</th><th style="text-align:right">Asked</th><th style="text-align:right">Already</th><th>Received now</th><th>Batch no.</th><th>Expiry</th><th>MRP ₹</th></tr>'
      + lines.map(function (l) { var left = Math.max(0, (Number(l.qty) || 0) - (Number(l.receivedQty) || 0)); var open = !(l.closed || !left); return '<tr><td>' + esc(l.item) + '</td><td style="text-align:right">' + (Number(l.qty) || 0) + '</td><td style="text-align:right">' + (Number(l.receivedQty) || 0) + '</td><td>' + (open ? '<input type="number" min="0" max="' + left + '" value="' + (full ? left : 0) + '" data-l="' + esc(l.id) + '">' : '—') + '</td>'
        + '<td>' + (open ? '<input type="text" data-b="' + esc(l.id) + '" placeholder="optional" style="width:90px">' : '') + '</td>'
        + '<td>' + (open ? '<input type="month" data-e="' + esc(l.id) + '" style="width:130px">' : '') + '</td>'
        + '<td>' + (open ? '<input type="number" min="0" step="0.01" data-m="' + esc(l.id) + '" placeholder="optional" style="width:80px">' : '') + '</td></tr>'; }).join('') + '</table></div>'
      + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px"><button type="button" class="btn btn-gray btn-sm" data-a="x">Cancel</button><button type="button" class="btn btn-green btn-sm" data-a="ok">Add received stock</button></div>',
      function (a, close, box) {
        if (a !== 'ok') { close(); return; }
        var m = {}, bad = '';
        Array.prototype.forEach.call(box.querySelectorAll('input[data-l]'), function (inp) {
          var v = Math.round(Number(inp.value) || 0), mx = Number(inp.max) || 0;
          if (v < 0 || v > mx) bad = 'Received quantity must be between 0 and ' + mx; m[inp.getAttribute('data-l')] = v;
        });
        if (bad) { toast(bad, 'w'); return; }
        if (!Object.keys(m).some(function (k) { return m[k] > 0; })) { toast('Enter at least one received quantity', 'w'); return; }
        var det = {};
        Object.keys(m).forEach(function (lid) {
          var g = function (attr) { var el = box.querySelector('[' + attr + '="' + lid.replace(/"/g, '') + '"]'); return el ? String(el.value || '').trim() : ''; };
          det[lid] = { batch: g('data-b'), exp: g('data-e'), mrp: g('data-m') };
        });
        close(); applyReceipt(id, m, det);
      });
  }
  function ov(html, onBtn) {
    css(); var o = document.createElement('div'); o.className = 'ind2-ov';
    o.innerHTML = '<div class="ind2-box">' + html + '</div>'; document.body.appendChild(o);
    var close = function () { o.remove(); };
    Array.prototype.forEach.call(o.querySelectorAll('[data-a]'), function (b) { b.onclick = function () { onBtn(b.getAttribute('data-a'), close, o); }; });
  }
  function setStatus(id, fn, msg) {
    var lines = linesOf(id); if (!lines.length) return;
    if (!confirm(msg)) return;
    lines.forEach(fn); putLines(lines); persist(); renderList(); checkAsk();
  }

  // ── "Has the stock been received?" — only on the requesting department's login ──
  var snooze = {};
  function checkAsk() {
    var old = document.getElementById('ind2-ask');
    var u = user(); if (!u || !scope()) { if (old) old.remove(); return; }
    var due = batches(function (h, lines) { return askHere(h) && statusOf(lines) === 'open' && !(snooze[h.batchId] > Date.now()) && (h.printedAt || (Date.now() - Date.parse(h.createdAt || 0)) > 15 * 60e3); });
    if (!due.length) { if (old) old.remove(); return; }
    css();
    var h = due[0][0], box = old || document.createElement('div'); box.id = 'ind2-ask';
    box.innerHTML = '<div style="font-weight:900;margin-bottom:4px">📦 Indent ' + esc(h.indentNo) + (due.length > 1 ? ' <small style="color:#888">(+' + (due.length - 1) + ' more)</small>' : '') + '</div>'
      + '<div style="color:#444;margin-bottom:8px">' + esc(h.requestStore) + ' ← ' + esc(h.sourceStore) + ' · ' + due[0].length + ' item' + (due[0].length === 1 ? '' : 's') + ' · ' + esc(fmt(h.createdAt)) + '<br><b>Has all the stock been received?</b></div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end"><button type="button" class="btn btn-xs btn-gray" data-a="later">Later</button><button type="button" class="btn btn-xs btn-outline" data-a="part">Not all</button><button type="button" class="btn btn-xs btn-green" data-a="all">Yes, all</button></div>';
    if (!old) document.body.appendChild(box);
    Array.prototype.forEach.call(box.querySelectorAll('[data-a]'), function (b) {
      b.onclick = function () {
        var a = b.getAttribute('data-a'), lines = linesOf(h.batchId);
        if (a === 'later') { snooze[h.batchId] = Date.now() + 60 * 60e3; checkAsk(); return; }
        if (a === 'all') { partial(h.batchId, true); return; }
        partial(h.batchId);
      };
    });
  }

  // ── hooks ──
  window.bmhInd2 = {
    addLine: function () { readTop(); F.lines.push(blankLine()); render(); var all = document.querySelectorAll('#ind2 .ind2-it'); if (all.length) all[all.length - 1].focus(); },
    delLine: function (i) { readTop(); F.lines.splice(i, 1); render(); },
    save: function (andPrint) { F.andPrint = !!andPrint; save(); F.andPrint = false; }, edit: edit, print: print, receive: receive,
    view: function (v) { readTop(); F.view = v; render(); },
    cancelEdit: function () { F = { edit: null, lines: [], store: F.store, source: 'Pharmacy' }; render(); },
    cancel: function (id) { setStatus(id, function (l) { l.status = 'cancelled'; l.cancelledAt = nowISO(); l.cancelledBy = me(); }, 'Cancel this indent? Nothing is added to stock.'); },
    close: function (id) { setStatus(id, function (l) { if ((Number(l.receivedQty) || 0) < (Number(l.qty) || 0)) l.closed = true; l.status = 'received'; l.closedAt = nowISO(); l.closedBy = me(); }, 'Close this indent? The items not received will not be expected any more.'); },
    render: render, check: checkAsk, _items: itemsFor
  };
  var origPtab = window.ptab;
  if (typeof origPtab === 'function') {
    window.ptab = function (el, cId) { var r = origPtab.apply(this, arguments); if (cId === 'inv-indent') { try { render(); } catch (e) { console.warn('[indent]', e); } } return r; };
  }
  var origRender = window.renderInventoryIndents;
  window.renderInventoryIndents = function () {
    var r; try { if (typeof origRender === 'function') r = origRender.apply(this, arguments); } catch (e) {}
    try { if (document.getElementById('ind2-list')) renderList(); } catch (e) {}
    try { checkAsk(); } catch (e) {}
    return r;
  };
  // financial data arrives a little after login, and indents raised on other devices arrive later: check every 30 s
  setInterval(function () { try { checkAsk(); } catch (e) {} }, 30000);
  if (!listen()) { var lt = 0, liv = setInterval(function () { if (listen() || ++lt > 120) clearInterval(liv); }, 1000); }
  var origApply = window.applyBmhFinancialsSnapshot;
  if (typeof origApply === 'function') {
    window.applyBmhFinancialsSnapshot = function () { var r = origApply.apply(this, arguments); try { mergeRemote(); } catch (e) {} return r; };
  }
  setTimeout(function () { try { checkAsk(); } catch (e) {} }, 4000);
})();
