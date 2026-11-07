/* BMH — Appointment call sheet (Appointments → 📞 on each appointment)
 * Same idea as the Advised Procedures follow-up sheet: staff log each call, say whether
 * the patient is coming, why not, and can move the appointment to another date.
 * Writes: appointmentCalls/<appointment key> (call log + last call) and, only when a new
 * date is chosen, the appointment's own date/time (the same fields "Change" updates).
 * Off switch (this browser): localStorage.setItem('bmh_disable_appointment_calls','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_disable_appointment_calls') === '1') return; } catch (e) {}

  var calls = {}, listening = false, current = null;
  var OUTCOMES = [
    ['coming', '✅ Confirmed — coming', '#1a8c3c'],
    ['noanswer', '📵 No answer / switched off', '#b45309'],
    ['callback', '🔁 Asked to call back', '#0e7490'],
    ['resched', '📅 Wants another date', '#1A3C6E'],
    ['notcoming', '❌ Not coming', '#c0392b']
  ];
  var REASONS = ['Not well / unable to travel', 'Out of station', 'Feeling better now', 'Financial reasons', 'No one to accompany', 'Will come later on their own',
    'Getting treated elsewhere', 'Busy — work / family', 'Weather / transport problem', 'Wrong number', 'Already came'];

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function jsq(s) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
  function toast(m, t) { try { showToast(m, t || 'i'); } catch (e) {} }
  function fmtD(d) { try { return formatDateDDMMYYYY(d); } catch (e) { return d || ''; } }
  function outcomeOf(k) { return OUTCOMES.filter(function (o) { return o[0] === k; })[0] || null; }
  function user() { return window.CURRENT_USER || (typeof CURRENT_USER !== 'undefined' ? CURRENT_USER : null); }
  function safeKey(k) { return String(k || '').replace(/[.#$\[\]\/]/g, '_'); }

  function ensureListening() {
    if (listening || !window.FBDB || !user()) return;
    listening = true;
    try {
      window.FBDB.ref('appointmentCalls').on('value', function (snap) {
        calls = snap.val() || {};
        var page = document.getElementById('pg-appointments');
        if (page && page.classList.contains('active') && typeof renderAptDay === 'function') { try { renderAptDay(); } catch (e) {} }
      }, function () { listening = false; });
    } catch (e) { listening = false; }
  }

  // Line shown under each appointment in the list (called from appointmentListRow)
  function remarkHtml(aptKey) {
    ensureListening();
    var rec = calls[safeKey(aptKey)];
    var last = rec && rec.last;
    if (!last) return '';
    var o = outcomeOf(last.outcome);
    var when = last.at ? new Date(last.at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
    var n = rec.log ? Object.keys(rec.log).length : 1;
    var text = [last.reason, last.remark].filter(Boolean).join(' — ');
    var moved = last.newDate ? ' · moved from ' + fmtD(last.prevDate) + ' to ' + fmtD(last.newDate) + (last.newTime ? ' ' + last.newTime : '') : '';
    return '<div style="grid-column:1/-1;font-size:10.5px;line-height:1.35;margin-top:3px;padding:3px 6px;border-radius:6px;background:' + (o ? o[2] : '#555') + '12;border-left:3px solid ' + (o ? o[2] : '#555') + ';white-space:normal;cursor:pointer" onclick="event.stopPropagation();bmhOpenAptCall(\'' + jsq(aptKey) + '\')" title="Open call sheet">'
      + '<b style="color:' + (o ? o[2] : '#555') + '">' + esc(o ? o[1] : last.outcome) + '</b>' + (text ? ' · ' + esc(text) : '') + esc(moved)
      + ' <span style="color:var(--g1)">· ' + esc(when) + (last.by ? ' by ' + esc(last.by) : '') + (n > 1 ? ' · ' + n + ' calls' : '') + '</span></div>';
  }
  function buttonHtml(aptKey) {
    ensureListening();
    var rec = calls[safeKey(aptKey)];
    var o = rec && rec.last ? outcomeOf(rec.last.outcome) : null;
    return '<button class="btn btn-xs btn-outline" title="Call sheet" style="font-size:9px;padding:2px 4px;min-height:0' + (o ? ';border-color:' + o[2] + ';color:' + o[2] : '') + '" onclick="event.stopPropagation();bmhOpenAptCall(\'' + jsq(aptKey) + '\')">📞</button>';
  }

  function ensureModal() {
    if (document.getElementById('m-apt-call')) return;
    var ov = document.createElement('div');
    ov.className = 'modal-ov';
    ov.id = 'm-apt-call';
    ov.innerHTML = '<div class="modal" style="max-width:620px;width:100%"><div class="modal-hd"><div class="modal-title">📞 Appointment call</div><button class="modal-close" onclick="closeM(\'m-apt-call\')">✕</button></div>'
      + '<div id="apt-call-head" style="font-size:12.5px;line-height:1.5;margin-bottom:10px"></div>'
      + '<div style="font-size:11px;font-weight:900;color:var(--g1);text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px">Calls so far</div>'
      + '<div id="apt-call-log" style="max-height:150px;overflow-y:auto;border:1px solid var(--g5,#eee);border-radius:8px;padding:6px 8px;margin-bottom:12px;font-size:11.5px"></div>'
      + '<div class="form-group"><label class="fl">Is the patient coming?</label><div id="apt-call-outcomes" style="display:flex;flex-wrap:wrap;gap:6px"></div></div>'
      + '<div class="form-group" id="apt-call-reason-wrap" style="margin-top:8px"><label class="fl">Reason</label><input type="text" id="apt-call-reason" list="apt-call-reasons" placeholder="Pick or type a reason" autocomplete="off"><datalist id="apt-call-reasons">'
      + REASONS.map(function (r) { return '<option value="' + esc(r) + '">'; }).join('') + '</datalist></div>'
      + '<div class="form-group" id="apt-call-new-wrap" style="margin-top:8px"><label class="fl">New appointment (optional — fill to move the appointment)</label>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap"><input type="date" id="apt-call-date" style="max-width:170px"><select id="apt-call-time" style="max-width:150px"></select></div></div>'
      + (typeof window.bmhCallStaffFieldHtml === 'function' ? window.bmhCallStaffFieldHtml('apt-call') : '')
      + '<div class="form-group" style="margin-top:8px"><label class="fl">Notes of the conversation</label><textarea id="apt-call-remark" style="min-height:60px" placeholder="What the patient said"></textarea></div>'
      + '<div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-gold" style="flex:1" id="apt-call-save" onclick="bmhSaveAptCall()">💾 Save call</button><button class="btn btn-gray" onclick="closeM(\'m-apt-call\')">Cancel</button></div></div>';
    document.body.appendChild(ov);
  }
  function renderOutcomes() {
    var host = document.getElementById('apt-call-outcomes');
    if (!host) return;
    host.innerHTML = OUTCOMES.map(function (o) {
      var on = current && current.outcome === o[0];
      return '<button type="button" onclick="bmhAptCallPick(\'' + o[0] + '\')" style="border:1.5px solid ' + o[2] + ';background:' + (on ? o[2] : '#fff') + ';color:' + (on ? '#fff' : o[2]) + ';border-radius:8px;padding:6px 10px;font-size:12px;font-weight:700;cursor:pointer">' + o[1] + '</button>';
    }).join('');
    var k = current && current.outcome;
    var rw = document.getElementById('apt-call-reason-wrap');
    if (rw) rw.style.display = (k === 'coming') ? 'none' : '';
  }
  function pick(k) { if (!current) return; current.outcome = k; renderOutcomes(); if (k === 'resched') { var d = document.getElementById('apt-call-date'); if (d) d.focus(); } }

  function open(aptKey) {
    ensureListening();
    var apt = typeof findAppointmentByKey === 'function' ? findAppointmentByKey(aptKey) : null;
    if (!apt) { toast('Appointment not found', 'w'); return; }
    ensureModal();
    current = { key: aptKey, apt: apt, outcome: '' };
    var name = getAppointmentPatientName(apt), id = getAppointmentBmhId(apt), phone = getAppointmentPhone(apt);
    var idSafe = String(id || '').replace(/[^A-Za-z0-9-]/g, '');
    var date = getAppointmentDate(apt), time = getAppointmentTime(apt);
    document.getElementById('apt-call-head').innerHTML = '<div style="font-size:15px;font-weight:900;color:var(--bmh-blue)">'
      + (idSafe && typeof window.bmhShowPatientVisitHistory === 'function' ? '<a href="javascript:void(0)" onclick="bmhShowPatientVisitHistory(\'' + idSafe + '\')" title="Open patient file" style="color:inherit;text-decoration:underline dotted">' + esc(name) + '</a> <span style="font-size:11px;font-weight:700">📋</span>' : esc(name)) + '</div>'
      + '<div>' + esc(id || '—') + (phone ? ' · <a href="tel:' + esc(String(phone).replace(/[^0-9+]/g, '')) + '">📱 ' + esc(phone) + '</a>' : '') + '</div>'
      + '<div>Appointment <b>' + esc(fmtD(date)) + (time ? ' at ' + esc(time) : '') + '</b> · ' + esc(getAppointmentPurpose(apt) || 'Consultation') + ' · ' + esc(getAppointmentDoctor(apt) || 'Doctor to assign') + ' · 📍 ' + esc(getAppointmentCentre(apt)) + '</div>';
    var rec = calls[safeKey(aptKey)] || {};
    var log = Object.keys(rec.log || {}).map(function (k) { return rec.log[k]; }).sort(function (a, b) { return String(b.at || '').localeCompare(String(a.at || '')); });
    document.getElementById('apt-call-log').innerHTML = log.length ? log.map(function (e) {
      var o = outcomeOf(e.outcome);
      var when = e.at ? new Date(e.at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
      return '<div style="padding:5px 0;border-bottom:1px solid var(--g5,#eee)"><b>' + esc(when) + '</b> · ' + esc(e.by || '') + '<br><span style="color:' + (o ? o[2] : '#333') + ';font-weight:700">' + esc(o ? o[1] : e.outcome) + '</span>'
        + (e.reason ? ' — ' + esc(e.reason) : '') + (e.remark ? '<br><i>' + esc(e.remark) + '</i>' : '')
        + (e.newDate ? '<br><span style="color:var(--g1)">Moved from ' + esc(fmtD(e.prevDate)) + ' to ' + esc(fmtD(e.newDate)) + (e.newTime ? ' ' + esc(e.newTime) : '') + '</span>' : '') + '</div>';
    }).join('') : '<div style="color:var(--g1);padding:4px 0">No calls logged yet.</div>';
    document.getElementById('apt-call-reason').value = '';
    document.getElementById('apt-call-remark').value = '';
    document.getElementById('apt-call-date').value = '';
    try { fillAppointmentTimeSelect(document.getElementById('apt-call-time'), time || '10:00 AM'); } catch (e) {}
    try { if (typeof window.bmhCallStaffReset === 'function') window.bmhCallStaffReset('apt-call'); } catch (e) {}
    renderOutcomes();
    openM('m-apt-call');
  }

  function save() {
    if (!current) return;
    var apt = current.apt, key = current.key;
    if (!current.outcome) { toast('Choose whether the patient is coming', 'w'); return; }
    var reason = (document.getElementById('apt-call-reason').value || '').trim();
    var remark = (document.getElementById('apt-call-remark').value || '').trim();
    var newDate = document.getElementById('apt-call-date').value || '';
    var wantTime = document.getElementById('apt-call-time').value || '';
    if (current.outcome === 'resched' && !newDate) { toast('Pick the new appointment date', 'w'); return; }
    if (newDate && newDate < (typeof todayKey === 'function' ? todayKey() : '')) { toast('The new date is in the past', 'w'); return; }
    if (current.outcome === 'notcoming' && !reason && !remark) { toast('Write why the patient is not coming', 'w'); return; }
    var pickCall = typeof window.bmhCallStaffValue === 'function' ? window.bmhCallStaffValue('apt-call') : null;
    if (pickCall && pickCall.error) { toast(pickCall.error, 'w'); return; }
    if (!window.FBDB) { toast('Not connected to the database — call not saved', 'e'); return; }
    var cu = user() || {};
    var now = new Date().toISOString();
    var prevDate = getAppointmentDate(apt), prevTime = getAppointmentTime(apt);
    var newTime = '';
    if (newDate) {
      try { newTime = getNextAvailableApptSlotFrom(newDate, getAppointmentDoctor(apt), normalizeAptTimeLabel(wantTime || prevTime || '10:00 AM'), getAppointmentCentre(apt), key); } catch (e) { newTime = wantTime || prevTime || '10:00 AM'; }
    }
    var enteredBy = cu.name || cu.username || 'Staff';
    var entry = { at: (pickCall && pickCall.at) || now, by: (pickCall && pickCall.by) || enteredBy, enteredBy: enteredBy, enteredAt: now, outcome: current.outcome, reason: current.outcome === 'coming' ? '' : reason, remark: remark,
      prevDate: prevDate || '', prevTime: prevTime || '', newDate: newDate, newTime: newTime };
    var base = 'appointmentCalls/' + safeKey(key);
    var id = window.FBDB.ref().push().key;
    var updates = {};
    updates[base + '/log/' + id] = entry;
    updates[base + '/last'] = entry;
    updates[base + '/patient'] = getAppointmentPatientName(apt) || '';
    updates[base + '/bmhId'] = getAppointmentBmhId(apt) || '';
    updates[base + '/appointmentKey'] = key;
    var btn = document.getElementById('apt-call-save'); if (btn) btn.disabled = true;
    window.FBDB.ref().update(updates).then(function () {
      var rec = calls[safeKey(key)] = Object.assign({}, calls[safeKey(key)] || {});
      rec.log = Object.assign({}, rec.log || {}); rec.log[id] = entry; rec.last = entry;
      if (newDate) {
        var patch = { date: newDate, apptDate: newDate, time: newTime, apptTime: newTime, updatedAt: now, updatedBy: cu.name || 'Staff' };
        Object.assign(apt, patch);
        if (typeof fbUpdate === 'function') fbUpdate('appointments/' + key, patch).catch(function (e) { console.warn('appointment update failed', e); });
      }
      closeM('m-apt-call');
      toast(newDate ? 'Call saved — appointment moved to ' + fmtD(newDate) + ' at ' + newTime + ' ✓' : 'Call saved ✓', 's');
      try { renderAptDay(); } catch (e) {}
    }).catch(function (e) { console.warn('appointment call save failed', e); toast('Could not save — please try again', 'e'); })
      .then(function () { if (btn) btn.disabled = false; });
  }

  window.bmhAptCallRemark = function (k) { try { return remarkHtml(k); } catch (e) { return ''; } };
  window.bmhAptCallButton = function (k) { try { return buttonHtml(k); } catch (e) { return ''; } };
  window.bmhOpenAptCall = open;
  window.bmhAptCallPick = pick;
  window.bmhSaveAptCall = save;
})();
