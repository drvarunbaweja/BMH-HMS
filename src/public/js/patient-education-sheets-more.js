// BMH HMS — Skin & Cosmetology post-procedure instruction sheets (English + Punjabi).
// Same black-and-white layout as the eye / OBG sheets. Staff edits (Firebase: patientEducation/instructions) take priority.
(function () {
  function S(en, pa, rows) { return { h: [en, pa], rows: rows }; }
  var more = [
    { id: 'skin-laser-hair', dept: 'skin', extra: null, title: ['Laser Hair Reduction — Instructions', 'ਲੇਜ਼ਰ ਨਾਲ ਵਾਲ ਘਟਾਉਣਾ — ਹਦਾਇਤਾਂ'], sections: [
      S('1. Before the next session', '1. ਅਗਲੇ ਸੈਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ', [
        ['Shave the area 1 day before. Do not wax, thread, pluck or bleach between sessions.', '1 ਦਿਨ ਪਹਿਲਾਂ ਸ਼ੇਵ ਕਰੋ। ਸੈਸ਼ਨਾਂ ਵਿਚਕਾਰ ਵੈਕਸ, ਥਰੈਡਿੰਗ, ਪਲੱਕਿੰਗ ਜਾਂ ਬਲੀਚ ਨਾ ਕਰੋ।'],
        ['Avoid sun tanning for 2 weeks before each session.', 'ਹਰ ਸੈਸ਼ਨ ਤੋਂ 2 ਹਫ਼ਤੇ ਪਹਿਲਾਂ ਧੁੱਪ ਨਾਲ ਚਮੜੀ ਕਾਲੀ ਨਾ ਕਰੋ।'],
        ['Come with clean skin — no cream, deodorant or make-up on the area.', 'ਸਾਫ਼ ਚਮੜੀ ਨਾਲ ਆਓ — ਉਸ ਹਿੱਸੇ ਤੇ ਕਰੀਮ, ਡਿਓ ਜਾਂ ਮੇਕਅੱਪ ਨਾ ਹੋਵੇ।']]),
      S('2. After the session', '2. ਸੈਸ਼ਨ ਤੋਂ ਬਾਅਦ', [
        ['Mild redness and small bumps around hairs are normal for a few hours to 2 days.', 'ਕੁਝ ਘੰਟਿਆਂ ਤੋਂ 2 ਦਿਨ ਤੱਕ ਹਲਕੀ ਲਾਲੀ ਅਤੇ ਵਾਲਾਂ ਦੁਆਲੇ ਛੋਟੇ ਦਾਣੇ ਆਮ ਹਨ।'],
        ['Apply the soothing cream given to you; a cold pack wrapped in cloth helps.', 'ਦਿੱਤੀ ਗਈ ਠੰਡਕ ਵਾਲੀ ਕਰੀਮ ਲਗਾਓ; ਕੱਪੜੇ ਵਿੱਚ ਲਪੇਟੀ ਬਰਫ਼ ਮਦਦ ਕਰਦੀ ਹੈ।'],
        ['Apply sunscreen SPF 30+ every day on exposed treated areas.', 'ਖੁੱਲ੍ਹੇ ਇਲਾਜ ਵਾਲੇ ਹਿੱਸਿਆਂ ਤੇ ਰੋਜ਼ SPF 30+ ਸਨਸਕਰੀਨ ਲਗਾਓ।'],
        ['Treated hairs may shed over 1–3 weeks — this is expected.', 'ਇਲਾਜ ਵਾਲੇ ਵਾਲ 1–3 ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਝੜ ਸਕਦੇ ਹਨ — ਇਹ ਆਮ ਹੈ।']]),
      S('3. Avoid for 48 hours', '3. 48 ਘੰਟੇ ਬਚੋ', [
        ['Sun, sauna, steam, hot baths and heavy exercise.', 'ਧੁੱਪ, ਸੌਨਾ, ਭਾਫ਼, ਗਰਮ ਪਾਣੀ ਨਾਲ ਨਹਾਉਣਾ ਅਤੇ ਭਾਰੀ ਕਸਰਤ।'],
        ['Scrubbing, perfumed products, bleach or hair-removal creams.', 'ਰਗੜਨਾ, ਖੁਸ਼ਬੂ ਵਾਲੇ ਉਤਪਾਦ, ਬਲੀਚ ਜਾਂ ਵਾਲ ਹਟਾਉਣ ਵਾਲੀਆਂ ਕਰੀਮਾਂ।']])],
      urgent: ['COME EARLY if there are blisters, burns, crusting or dark / light patches.', 'ਜਲਦੀ ਆਓ ਜੇ ਛਾਲੇ, ਜਲਣ, ਖਰੀਂਡ ਜਾਂ ਕਾਲੇ / ਚਿੱਟੇ ਧੱਬੇ ਬਣਨ।'] },

    { id: 'skin-tattoo', dept: 'skin', extra: null, title: ['Laser Tattoo Removal — Aftercare Instructions', 'ਲੇਜ਼ਰ ਨਾਲ ਟੈਟੂ ਹਟਾਉਣਾ — ਬਾਅਦ ਦੀ ਦੇਖਭਾਲ'], sections: [
      S('1. First 24–48 hours', '1. ਪਹਿਲੇ 24–48 ਘੰਟੇ', [
        ['Whitening, redness, swelling and pinpoint bleeding are expected.', 'ਚਿੱਟਾਪਨ, ਲਾਲੀ, ਸੋਜ ਅਤੇ ਥੋੜ੍ਹਾ ਖੂਨ ਆਮ ਹੈ।'],
        ['Keep the dressing on for the first day; apply a cold pack wrapped in cloth for swelling.', 'ਪਹਿਲੇ ਦਿਨ ਪੱਟੀ ਲੱਗੀ ਰਹਿਣ ਦਿਓ; ਸੋਜ ਲਈ ਕੱਪੜੇ ਵਿੱਚ ਲਪੇਟੀ ਠੰਡੀ ਸਿਕਾਈ ਕਰੋ।'],
        ['Take the pain medicine only if prescribed.', 'ਦਰਦ ਦੀ ਦਵਾਈ ਸਿਰਫ਼ ਪਰਚੀ ਅਨੁਸਾਰ ਲਓ।']]),
      S('2. Daily care until healed (7–14 days)', '2. ਠੀਕ ਹੋਣ ਤੱਕ ਰੋਜ਼ਾਨਾ ਦੇਖਭਾਲ (7–14 ਦਿਨ)', [
        ['Wash gently with mild soap and water; pat dry.', 'ਹਲਕੇ ਸਾਬਣ ਅਤੇ ਪਾਣੀ ਨਾਲ ਹੌਲੀ ਧੋਵੋ; ਥਪਥਪਾ ਕੇ ਸੁਕਾਓ।'],
        ['Apply the antibiotic ointment twice a day.', 'ਐਂਟੀਬਾਇਓਟਿਕ ਮਲ੍ਹਮ ਦਿਨ ਵਿੱਚ 2 ਵਾਰ ਲਗਾਓ।'],
        ['Let blisters and crusts heal on their own — do not pick or burst them.', 'ਛਾਲੇ ਅਤੇ ਖਰੀਂਡ ਆਪਣੇ ਆਪ ਠੀਕ ਹੋਣ ਦਿਓ — ਨਾ ਉਤਾਰੋ ਅਤੇ ਨਾ ਫੋੜੋ।'],
        ['Avoid swimming, sauna and soaking the area for 1 week.', '1 ਹਫ਼ਤਾ ਤੈਰਾਕੀ, ਸੌਨਾ ਅਤੇ ਉਸ ਹਿੱਸੇ ਨੂੰ ਪਾਣੀ ਵਿੱਚ ਡੁਬੋਣ ਤੋਂ ਬਚੋ।']]),
      S('3. After healing', '3. ਠੀਕ ਹੋਣ ਤੋਂ ਬਾਅਦ', [
        ['Use sunscreen SPF 30+ and cover the area from the sun.', 'SPF 30+ ਸਨਸਕਰੀਨ ਲਗਾਓ ਅਤੇ ਹਿੱਸੇ ਨੂੰ ਧੁੱਪ ਤੋਂ ਢੱਕੋ।'],
        ['The tattoo keeps fading for 6–8 weeks; the next session is usually after 6–8 weeks.', 'ਟੈਟੂ 6–8 ਹਫ਼ਤੇ ਫਿੱਕਾ ਹੁੰਦਾ ਰਹਿੰਦਾ ਹੈ; ਅਗਲਾ ਸੈਸ਼ਨ ਆਮ ਤੌਰ ਤੇ 6–8 ਹਫ਼ਤਿਆਂ ਬਾਅਦ।']])],
      urgent: ['COME IMMEDIATELY if there is pus, spreading redness, fever or severe pain.', 'ਤੁਰੰਤ ਆਓ ਜੇ ਪੀਕ, ਫੈਲਦੀ ਲਾਲੀ, ਬੁਖ਼ਾਰ ਜਾਂ ਬਹੁਤ ਦਰਦ ਹੋਵੇ।'] },

    { id: 'skin-lesion', dept: 'skin', extra: null, title: ['Skin Lesion Removal (RF / Laser / Excision) — Instructions', 'ਚਮੜੀ ਦੇ ਮੱਸੇ / ਗੰਢ ਹਟਾਉਣਾ — ਹਦਾਇਤਾਂ'], sections: [
      S('1. Wound care', '1. ਜ਼ਖ਼ਮ ਦੀ ਦੇਖਭਾਲ', [
        ['Keep the dressing clean and dry for 24 hours.', '24 ਘੰਟੇ ਪੱਟੀ ਸਾਫ਼ ਅਤੇ ਸੁੱਕੀ ਰੱਖੋ।'],
        ['Then wash gently, pat dry and apply the ointment twice a day until healed.', 'ਫਿਰ ਹੌਲੀ ਧੋਵੋ, ਸੁਕਾਓ ਅਤੇ ਠੀਕ ਹੋਣ ਤੱਕ ਦਿਨ ਵਿੱਚ 2 ਵਾਰ ਮਲ੍ਹਮ ਲਗਾਓ।'],
        ['A scab forms and falls off in 7–10 days — do not pick it.', '7–10 ਦਿਨਾਂ ਵਿੱਚ ਖਰੀਂਡ ਬਣ ਕੇ ਡਿੱਗ ਜਾਂਦਾ ਹੈ — ਇਸ ਨੂੰ ਨਾ ਉਤਾਰੋ।']]),
      S('2. Stitches and reports', '2. ਟਾਂਕੇ ਅਤੇ ਰਿਪੋਰਟ', [
        ['If you have stitches, keep them dry; removal on day 7–10 as advised.', 'ਜੇ ਟਾਂਕੇ ਹਨ ਤਾਂ ਸੁੱਕੇ ਰੱਖੋ; ਸਲਾਹ ਅਨੁਸਾਰ 7–10ਵੇਂ ਦਿਨ ਖੁਲਵਾਓ।'],
        ['If a biopsy was sent, come for the report on the given date.', 'ਜੇ ਬਾਇਓਪਸੀ ਭੇਜੀ ਗਈ ਹੈ ਤਾਂ ਦਿੱਤੀ ਤਾਰੀਖ ਤੇ ਰਿਪੋਰਟ ਲਈ ਆਓ।']]),
      S('3. Avoid until healed', '3. ਠੀਕ ਹੋਣ ਤੱਕ ਬਚੋ', [
        ['Swimming, heavy exercise and tight clothing over the area.', 'ਤੈਰਾਕੀ, ਭਾਰੀ ਕਸਰਤ ਅਤੇ ਉਸ ਹਿੱਸੇ ਤੇ ਤੰਗ ਕੱਪੜੇ।'],
        ['Make-up or home remedies on the wound.', 'ਜ਼ਖ਼ਮ ਤੇ ਮੇਕਅੱਪ ਜਾਂ ਘਰੇਲੂ ਨੁਸਖੇ।'],
        ['Sun on the healing area — use sunscreen once healed to prevent dark marks.', 'ਠੀਕ ਹੋ ਰਹੇ ਹਿੱਸੇ ਤੇ ਧੁੱਪ — ਕਾਲੇ ਨਿਸ਼ਾਨ ਤੋਂ ਬਚਣ ਲਈ ਠੀਕ ਹੋਣ ਤੇ ਸਨਸਕਰੀਨ ਲਗਾਓ।']])],
      urgent: ['COME EARLY if there is bleeding that does not stop with pressure, pus, increasing pain or fever.', 'ਜਲਦੀ ਆਓ ਜੇ ਦਬਾਉਣ ਤੇ ਵੀ ਖੂਨ ਨਾ ਰੁਕੇ, ਪੀਕ, ਵਧਦਾ ਦਰਦ ਜਾਂ ਬੁਖ਼ਾਰ ਹੋਵੇ।'] },

    { id: 'skin-hydrafacial', dept: 'skin', extra: null, title: ['HydraFacial — Aftercare Instructions', 'ਹਾਈਡ੍ਰਾਫੇਸ਼ੀਅਲ — ਬਾਅਦ ਦੀ ਦੇਖਭਾਲ'], sections: [
      S('1. Today', '1. ਅੱਜ', [
        ['Mild pinkness is normal and settles within a few hours.', 'ਹਲਕੀ ਗੁਲਾਬੀ ਰੰਗਤ ਆਮ ਹੈ ਅਤੇ ਕੁਝ ਘੰਟਿਆਂ ਵਿੱਚ ਠੀਕ ਹੋ ਜਾਂਦੀ ਹੈ।'],
        ['No make-up for 6–12 hours; let the serums absorb.', '6–12 ਘੰਟੇ ਮੇਕਅੱਪ ਨਾ ਕਰੋ; ਸੀਰਮ ਨੂੰ ਜਜ਼ਬ ਹੋਣ ਦਿਓ।'],
        ['Drink plenty of water.', 'ਖੂਬ ਪਾਣੀ ਪੀਓ।']]),
      S('2. Next 48 hours', '2. ਅਗਲੇ 48 ਘੰਟੇ', [
        ['Use only a gentle cleanser, moisturiser and sunscreen SPF 30+.', 'ਸਿਰਫ਼ ਨਰਮ ਕਲੀਂਜ਼ਰ, ਮੌਇਸਚਰਾਈਜ਼ਰ ਅਤੇ SPF 30+ ਸਨਸਕਰੀਨ ਵਰਤੋ।'],
        ['Avoid scrubs, peels, retinoids, waxing and threading of the face.', 'ਚਿਹਰੇ ਤੇ ਸਕ੍ਰਬ, ਪੀਲ, ਰੈਟਿਨੋਇਡ, ਵੈਕਸਿੰਗ ਅਤੇ ਥਰੈਡਿੰਗ ਤੋਂ ਬਚੋ।'],
        ['Avoid sun, steam, sauna and swimming.', 'ਧੁੱਪ, ਭਾਫ਼, ਸੌਨਾ ਅਤੇ ਤੈਰਾਕੀ ਤੋਂ ਬਚੋ।']]),
      S('3. For lasting results', '3. ਲੰਮੇ ਨਤੀਜੇ ਲਈ', [
        ['Repeat every 3–4 weeks and follow your skin-care routine.', 'ਹਰ 3–4 ਹਫ਼ਤੇ ਦੁਹਰਾਓ ਅਤੇ ਆਪਣੀ ਸਕਿਨ ਕੇਅਰ ਜਾਰੀ ਰੱਖੋ।'],
        ['Do not pick or squeeze pimples.', 'ਦਾਣੇ ਨਾ ਨੋਚੋ ਅਤੇ ਨਾ ਦਬਾਓ।']])],
      urgent: ['CONTACT US if there is burning, swelling, rash or itching that does not settle.', 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ ਜੇ ਜਲਣ, ਸੋਜ, ਧੱਫੜ ਜਾਂ ਖਾਰਸ਼ ਠੀਕ ਨਾ ਹੋਵੇ।'] },

    { id: 'skin-microderm', dept: 'skin', extra: null, title: ['Microdermabrasion — Aftercare Instructions', 'ਮਾਈਕ੍ਰੋਡਰਮਾਬ੍ਰੇਜ਼ਨ — ਬਾਅਦ ਦੀ ਦੇਖਭਾਲ'], sections: [
      S('1. First 24 hours', '1. ਪਹਿਲੇ 24 ਘੰਟੇ', [
        ['Mild redness and tightness are normal and settle within hours.', 'ਹਲਕੀ ਲਾਲੀ ਅਤੇ ਖਿਚਾਅ ਆਮ ਹਨ ਅਤੇ ਕੁਝ ਘੰਟਿਆਂ ਵਿੱਚ ਠੀਕ ਹੋ ਜਾਂਦੇ ਹਨ।'],
        ['No make-up for 24 hours.', '24 ਘੰਟੇ ਮੇਕਅੱਪ ਨਾ ਕਰੋ।'],
        ['Use a gentle cleanser and a good moisturiser.', 'ਨਰਮ ਕਲੀਂਜ਼ਰ ਅਤੇ ਵਧੀਆ ਮੌਇਸਚਰਾਈਜ਼ਰ ਵਰਤੋ।']]),
      S('2. Next 5–7 days', '2. ਅਗਲੇ 5–7 ਦਿਨ', [
        ['Apply sunscreen SPF 30+ every morning; reapply when outdoors.', 'ਹਰ ਸਵੇਰ SPF 30+ ਸਨਸਕਰੀਨ ਲਗਾਓ; ਬਾਹਰ ਹੋਵੋ ਤਾਂ ਦੁਬਾਰਾ ਲਗਾਓ।'],
        ['Avoid scrubs, peels, retinoids, AHA / BHA and waxing.', 'ਸਕ੍ਰਬ, ਪੀਲ, ਰੈਟਿਨੋਇਡ, AHA / BHA ਅਤੇ ਵੈਕਸਿੰਗ ਤੋਂ ਬਚੋ।'],
        ['Avoid sun, steam and swimming for 48 hours.', '48 ਘੰਟੇ ਧੁੱਪ, ਭਾਫ਼ ਅਤੇ ਤੈਰਾਕੀ ਤੋਂ ਬਚੋ।']]),
      S('3. Your course', '3. ਤੁਹਾਡਾ ਕੋਰਸ', [
        ['Best results come from 4–6 sessions, 2–4 weeks apart.', 'ਵਧੀਆ ਨਤੀਜੇ 2–4 ਹਫ਼ਤਿਆਂ ਦੇ ਫ਼ਰਕ ਨਾਲ 4–6 ਸੈਸ਼ਨਾਂ ਤੋਂ ਆਉਂਦੇ ਹਨ।'],
        ['Do not rub, pick or scratch the skin.', 'ਚਮੜੀ ਨਾ ਰਗੜੋ, ਨਾ ਨੋਚੋ, ਨਾ ਖੁਰਕੋ।']])],
      urgent: ['CONTACT US if there is blistering, oozing, severe redness or dark patches.', 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ ਜੇ ਛਾਲੇ, ਪਾਣੀ ਰਿਸਣਾ, ਬਹੁਤ ਲਾਲੀ ਜਾਂ ਕਾਲੇ ਧੱਬੇ ਹੋਣ।'] }
  ];
  window.BMH_PE_SHEETS = (window.BMH_PE_SHEETS || []).concat(more);
})();
