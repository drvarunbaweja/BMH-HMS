/* BMH — OBG discharge card: "Date of discharge" is the day the card is printed (or the recorded IPD discharge time,
 * if the patient has been discharged in IPD), not the day of the procedure.
 * The OT case stores the procedure-completion time as its discharge date, which the OBG card used to show.
 * Ophthalmology discharge cards are unchanged.
 */
(function () {
  'use strict';
  function obgDate(data) {
    var d = data && data.ipdStay && data.ipdStay.dischargedAt;
    return d || new Date().toISOString();
  }
  var origData = window.getDischargePrintData;
  if (typeof origData === 'function') {
    window.getDischargePrintData = function () {
      var data = origData.apply(this, arguments);
      try { if (data && data.sel === 'obg') data.dischargeDate = obgDate(data); } catch (e) {}
      return data;
    };
  }
  var origCtx = window.getObgDischargeContext;
  if (typeof origCtx === 'function') {
    window.getObgDischargeContext = function (data) {
      var ctx = origCtx.apply(this, arguments);
      try { if (ctx && data) ctx.dischargeDate = data.dischargeDate || obgDate(data); } catch (e) {}
      return ctx;
    };
  }
})();
