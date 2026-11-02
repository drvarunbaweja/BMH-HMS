// BMH HMS — default black-and-white patient instruction sheets (English + Punjabi).
// Staff edits are saved separately (Firebase: patientEducation/instructions) and take priority.
(function () {
  function S(en, pa, rows) { return { h: [en, pa], rows: rows }; }
  var B = '<span class="pe-blank"></span>';
  window.BMH_PE_SHEETS = [
    { id: 'cataract', dept: 'ophtho', extra: 'eye', title: ['Cataract Surgery — Patient Instructions', 'ਮੋਤੀਆਬਿੰਦ ਦਾ ਆਪ੍ਰੇਸ਼ਨ — ਮਰੀਜ਼ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests needed before surgery', '1. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਟੈਸਟ', [
        ['Blood sugar (fasting / random); HbA1c if you are diabetic', 'ਬਲੱਡ ਸ਼ੂਗਰ (ਖਾਲੀ ਪੇਟ / ਰੈਂਡਮ); ਸ਼ੂਗਰ ਦੇ ਮਰੀਜ਼ਾਂ ਲਈ HbA1c'],
        ['Blood pressure check; ECG if above 40 years or heart problem', 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਦੀ ਜਾਂਚ; 40 ਸਾਲ ਤੋਂ ਵੱਧ ਉਮਰ ਜਾਂ ਦਿਲ ਦੀ ਬਿਮਾਰੀ ਹੋਵੇ ਤਾਂ ਈ.ਸੀ.ਜੀ.'],
        ['Blood tests as advised: CBC, HIV, HBsAg, HCV', 'ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ਖੂਨ ਦੇ ਟੈਸਟ: CBC, HIV, HBsAg, HCV'],
        ['Eye tests: lens power (biometry / A-scan), keratometry, eye pressure, tear-duct wash (syringing); OCT or B-scan if advised', 'ਅੱਖ ਦੇ ਟੈਸਟ: ਲੈਂਜ਼ ਦੀ ਪਾਵਰ (ਬਾਇਓਮੈਟਰੀ / ਏ-ਸਕੈਨ), ਕੈਰਾਟੋਮੈਟਰੀ, ਅੱਖ ਦਾ ਦਬਾਅ, ਅੱਥਰੂ ਨਲੀ ਦੀ ਸਫ਼ਾਈ (ਸਰਿੰਜਿੰਗ); ਲੋੜ ਹੋਵੇ ਤਾਂ OCT ਜਾਂ ਬੀ-ਸਕੈਨ']]),
      S('2. What happens during surgery', '2. ਆਪ੍ਰੇਸ਼ਨ ਦੌਰਾਨ ਕੀ ਹੁੰਦਾ ਹੈ', [
        ['Drops are put to widen the pupil and the eye is numbed. You stay awake.', 'ਪੁਤਲੀ ਖੋਲ੍ਹਣ ਲਈ ਬੂੰਦਾਂ ਪਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ ਅਤੇ ਅੱਖ ਸੁੰਨ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਤੁਸੀਂ ਜਾਗਦੇ ਰਹਿੰਦੇ ਹੋ।'],
        ['Through a tiny opening the cloudy lens is removed and a new artificial lens (IOL) is placed. Usually no stitches.', 'ਇੱਕ ਛੋਟੇ ਚੀਰੇ ਰਾਹੀਂ ਧੁੰਦਲਾ ਲੈਂਜ਼ ਕੱਢ ਕੇ ਨਵਾਂ ਨਕਲੀ ਲੈਂਜ਼ (IOL) ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ। ਆਮ ਤੌਰ \'ਤੇ ਟਾਂਕੇ ਨਹੀਂ ਲੱਗਦੇ।'],
        ['It takes 15–20 minutes. Keep still and look at the light as told.', 'ਇਸ ਵਿੱਚ 15–20 ਮਿੰਟ ਲੱਗਦੇ ਹਨ। ਹਿੱਲੋ ਨਾ ਅਤੇ ਦੱਸੇ ਅਨੁਸਾਰ ਰੌਸ਼ਨੀ ਵੱਲ ਦੇਖਦੇ ਰਹੋ।']]),
      S('3. Before surgery (pre-op)', '3. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ', [
        ['Start the antibiotic eye drops ' + B + ' days before surgery, as prescribed.', 'ਐਂਟੀਬਾਇਓਟਿਕ ਬੂੰਦਾਂ ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ' + B + ' ਦਿਨ ਪਹਿਲਾਂ ਪਰਚੀ ਅਨੁਸਾਰ ਸ਼ੁਰੂ ਕਰੋ।'],
        ['Take BP and sugar medicines as usual. Tell us if you take blood thinners (aspirin, clopidogrel, warfarin).', 'BP ਅਤੇ ਸ਼ੂਗਰ ਦੀਆਂ ਦਵਾਈਆਂ ਆਮ ਵਾਂਗ ਲਓ। ਖੂਨ ਪਤਲਾ ਕਰਨ ਵਾਲੀ ਦਵਾਈ (ਐਸਪਰੀਨ, ਕਲੋਪੀਡੋਗਰੇਲ, ਵਾਰਫਰਿਨ) ਲੈਂਦੇ ਹੋ ਤਾਂ ਸਾਨੂੰ ਦੱਸੋ।'],
        ['Wash your hair the day before. No kajal, make-up or face cream on the day of surgery.', 'ਇੱਕ ਦਿਨ ਪਹਿਲਾਂ ਸਿਰ ਧੋ ਲਓ। ਆਪ੍ਰੇਸ਼ਨ ਵਾਲੇ ਦਿਨ ਕਾਜਲ, ਮੇਕਅੱਪ ਜਾਂ ਕਰੀਮ ਨਾ ਲਗਾਓ।'],
        ['Have a light breakfast, wear loose clean clothes, bring all reports and medicines, and come with one attendant.', 'ਹਲਕਾ ਨਾਸ਼ਤਾ ਕਰੋ, ਖੁੱਲ੍ਹੇ ਸਾਫ਼ ਕੱਪੜੇ ਪਾਓ, ਸਾਰੀਆਂ ਰਿਪੋਰਟਾਂ ਤੇ ਦਵਾਈਆਂ ਨਾਲ ਲਿਆਓ ਅਤੇ ਇੱਕ ਸਾਥੀ ਨਾਲ ਆਓ।']]),
      S('4. After surgery (post-op)', '4. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ', [
        ['Put the drops exactly as written on your prescription, with clean hands. Keep 5 minutes between two different drops.', 'ਬੂੰਦਾਂ ਪਰਚੀ ਅਨੁਸਾਰ ਸਾਫ਼ ਹੱਥਾਂ ਨਾਲ ਪਾਓ। ਦੋ ਵੱਖ-ਵੱਖ ਬੂੰਦਾਂ ਵਿਚਕਾਰ 5 ਮਿੰਟ ਦਾ ਫ਼ਰਕ ਰੱਖੋ।'],
        ['Wear the eye shield at night for 2 weeks and dark glasses outdoors.', '2 ਹਫ਼ਤੇ ਰਾਤ ਨੂੰ ਅੱਖ \'ਤੇ ਸ਼ੀਲਡ ਲਗਾਓ ਅਤੇ ਬਾਹਰ ਕਾਲੀਆਂ ਐਨਕਾਂ ਪਾਓ।'],
        ['Do not rub or press the eye. Keep water out of the eye; no head bath for 1 week (you may bathe below the neck).', 'ਅੱਖ ਨੂੰ ਨਾ ਮਲੋ ਅਤੇ ਨਾ ਦਬਾਓ। ਅੱਖ ਵਿੱਚ ਪਾਣੀ ਨਾ ਜਾਣ ਦਿਓ; 1 ਹਫ਼ਤਾ ਸਿਰ ਨਾ ਨਹਾਓ (ਗਰਦਨ ਤੋਂ ਹੇਠਾਂ ਨਹਾ ਸਕਦੇ ਹੋ)।'],
        ['Avoid lifting heavy weights, bending and dust or smoke for 2 weeks. Reading and watching TV are allowed.', '2 ਹਫ਼ਤੇ ਭਾਰੀ ਭਾਰ ਨਾ ਚੁੱਕੋ, ਨਾ ਝੁਕੋ ਅਤੇ ਧੂੜ-ਧੂੰਏਂ ਤੋਂ ਬਚੋ। ਪੜ੍ਹਨਾ ਅਤੇ ਟੀਵੀ ਦੇਖਣਾ ਠੀਕ ਹੈ।'],
        ['Check-ups: next day, after 1 week and after 1 month. New glasses after about 4 weeks.', 'ਚੈੱਕਅੱਪ: ਅਗਲੇ ਦਿਨ, 1 ਹਫ਼ਤੇ ਬਾਅਦ ਅਤੇ 1 ਮਹੀਨੇ ਬਾਅਦ। ਨਵੀਆਂ ਐਨਕਾਂ ਲਗਭਗ 4 ਹਫ਼ਤਿਆਂ ਬਾਅਦ।']])],
      urgent: ['COME IMMEDIATELY if pain increases, vision suddenly drops, redness or discharge increases, or you see flashes or a curtain.', 'ਤੁਰੰਤ ਆਓ ਜੇ ਦਰਦ ਵਧੇ, ਨਜ਼ਰ ਅਚਾਨਕ ਘਟੇ, ਲਾਲੀ ਜਾਂ ਗਿੱਡ ਵਧੇ, ਜਾਂ ਚਮਕਾਂ ਜਾਂ ਨਜ਼ਰ ਅੱਗੇ ਪਰਦਾ ਦਿਸੇ।'] },

    { id: 'trab', dept: 'ophtho', extra: 'eye', title: ['Trabeculectomy (Glaucoma Surgery) — Patient Instructions', 'ਟ੍ਰੈਬੇਕੂਲੈਕਟੋਮੀ (ਕਾਲੇ ਮੋਤੀਏ ਦਾ ਆਪ੍ਰੇਸ਼ਨ) — ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests needed before surgery', '1. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਟੈਸਟ', [
        ['Eye pressure, gonioscopy (drainage angle), visual field test and OCT of the optic nerve', 'ਅੱਖ ਦਾ ਦਬਾਅ, ਗੋਨੀਓਸਕੋਪੀ (ਪਾਣੀ ਨਿਕਲਣ ਦਾ ਕੋਣ), ਨਜ਼ਰ ਦੇ ਘੇਰੇ ਦਾ ਟੈਸਟ ਅਤੇ ਨਜ਼ਰ ਦੀ ਨਸ ਦਾ OCT'],
        ['Blood sugar, BP check; ECG if above 40 years; CBC, HIV, HBsAg, HCV as advised', 'ਬਲੱਡ ਸ਼ੂਗਰ, BP ਦੀ ਜਾਂਚ; 40 ਸਾਲ ਤੋਂ ਵੱਧ ਹੋਵੇ ਤਾਂ ਈ.ਸੀ.ਜੀ.; ਸਲਾਹ ਅਨੁਸਾਰ CBC, HIV, HBsAg, HCV'],
        ['Bring a list of all eye drops and medicines you use', 'ਆਪਣੀਆਂ ਸਾਰੀਆਂ ਬੂੰਦਾਂ ਅਤੇ ਦਵਾਈਆਂ ਦੀ ਸੂਚੀ ਨਾਲ ਲਿਆਓ']]),
      S('2. What happens during surgery', '2. ਆਪ੍ਰੇਸ਼ਨ ਦੌਰਾਨ ਕੀ ਹੁੰਦਾ ਹੈ', [
        ['The eye is numbed with a small injection; you stay awake.', 'ਛੋਟੇ ਟੀਕੇ ਨਾਲ ਅੱਖ ਸੁੰਨ ਕੀਤੀ ਜਾਂਦੀ ਹੈ; ਤੁਸੀਂ ਜਾਗਦੇ ਰਹਿੰਦੇ ਹੋ।'],
        ['A tiny new drainage channel is made under the upper eyelid so that fluid can leave the eye and pressure falls. It takes 30–45 minutes.', 'ਉੱਪਰਲੀ ਪਲਕ ਹੇਠਾਂ ਪਾਣੀ ਨਿਕਲਣ ਦਾ ਛੋਟਾ ਨਵਾਂ ਰਸਤਾ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ ਤਾਂ ਜੋ ਦਬਾਅ ਘਟੇ। ਇਸ ਵਿੱਚ 30–45 ਮਿੰਟ ਲੱਗਦੇ ਹਨ।']]),
      S('3. Before surgery (pre-op)', '3. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ', [
        ['Continue your glaucoma drops unless the doctor says otherwise. Stop blood thinners only if the doctor tells you.', 'ਕਾਲੇ ਮੋਤੀਏ ਦੀਆਂ ਬੂੰਦਾਂ ਜਾਰੀ ਰੱਖੋ ਜਦੋਂ ਤੱਕ ਡਾਕਟਰ ਹੋਰ ਨਾ ਕਹੇ। ਖੂਨ ਪਤਲਾ ਕਰਨ ਵਾਲੀ ਦਵਾਈ ਸਿਰਫ਼ ਡਾਕਟਰ ਦੇ ਕਹਿਣ \'ਤੇ ਬੰਦ ਕਰੋ।'],
        ['Take BP and sugar medicines as usual; light breakfast; wash hair the day before; no kajal or make-up.', 'BP ਅਤੇ ਸ਼ੂਗਰ ਦੀਆਂ ਦਵਾਈਆਂ ਆਮ ਵਾਂਗ ਲਓ; ਹਲਕਾ ਨਾਸ਼ਤਾ; ਇੱਕ ਦਿਨ ਪਹਿਲਾਂ ਸਿਰ ਧੋ ਲਓ; ਕਾਜਲ ਜਾਂ ਮੇਕਅੱਪ ਨਹੀਂ।'],
        ['Come with one attendant, your reports and all your drops.', 'ਇੱਕ ਸਾਥੀ, ਰਿਪੋਰਟਾਂ ਅਤੇ ਸਾਰੀਆਂ ਬੂੰਦਾਂ ਨਾਲ ਆਓ।']]),
      S('4. After surgery (post-op)', '4. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ', [
        ['Use the new drops exactly as written. Do NOT use old glaucoma drops in the operated eye unless told. Continue drops in the other eye.', 'ਨਵੀਆਂ ਬੂੰਦਾਂ ਲਿਖੇ ਅਨੁਸਾਰ ਪਾਓ। ਆਪ੍ਰੇਸ਼ਨ ਵਾਲੀ ਅੱਖ ਵਿੱਚ ਪੁਰਾਣੀਆਂ ਬੂੰਦਾਂ ਬਿਨਾਂ ਕਹੇ ਨਾ ਪਾਓ। ਦੂਜੀ ਅੱਖ ਦੀਆਂ ਬੂੰਦਾਂ ਜਾਰੀ ਰੱਖੋ।'],
        ['Wear the eye shield at night for 2 weeks; dark glasses outdoors. Do not rub or press the eye.', '2 ਹਫ਼ਤੇ ਰਾਤ ਨੂੰ ਸ਼ੀਲਡ ਲਗਾਓ; ਬਾਹਰ ਕਾਲੀਆਂ ਐਨਕਾਂ। ਅੱਖ ਨੂੰ ਨਾ ਮਲੋ ਨਾ ਦਬਾਓ।'],
        ['No heavy lifting, bending or straining (including constipation) for 2 weeks; no water in the eye for 2 weeks.', '2 ਹਫ਼ਤੇ ਭਾਰ ਨਾ ਚੁੱਕੋ, ਨਾ ਝੁਕੋ, ਜ਼ੋਰ ਨਾ ਲਗਾਓ (ਕਬਜ਼ ਤੋਂ ਵੀ ਬਚੋ); 2 ਹਫ਼ਤੇ ਅੱਖ ਵਿੱਚ ਪਾਣੀ ਨਾ ਜਾਵੇ।'],
        ['Vision may be blurred for a few weeks. Frequent check-ups are needed: next day, 1 week, 2 weeks, 1 month and then as advised.', 'ਕੁਝ ਹਫ਼ਤੇ ਨਜ਼ਰ ਧੁੰਦਲੀ ਰਹਿ ਸਕਦੀ ਹੈ। ਵਾਰ-ਵਾਰ ਚੈੱਕਅੱਪ ਜ਼ਰੂਰੀ: ਅਗਲੇ ਦਿਨ, 1 ਹਫ਼ਤੇ, 2 ਹਫ਼ਤੇ, 1 ਮਹੀਨੇ ਅਤੇ ਫਿਰ ਸਲਾਹ ਅਨੁਸਾਰ।']])],
      urgent: ['COME IMMEDIATELY if there is increasing pain, sudden drop in vision, a red sticky eye, or watery leakage from the eye.', 'ਤੁਰੰਤ ਆਓ ਜੇ ਦਰਦ ਵਧੇ, ਨਜ਼ਰ ਅਚਾਨਕ ਘਟੇ, ਅੱਖ ਲਾਲ ਤੇ ਚਿਪਚਿਪੀ ਹੋਵੇ, ਜਾਂ ਅੱਖ ਵਿੱਚੋਂ ਪਾਣੀ ਰਿਸੇ।'] },

    { id: 'lasik', dept: 'ophtho', extra: 'eye', title: ['LASIK — Patient Instructions', 'ਲੇਸਿਕ — ਮਰੀਜ਼ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests needed before LASIK', '1. ਲੇਸਿਕ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਟੈਸਟ', [
        ['Glasses power check (stable for at least 1 year), with dilated refraction', 'ਐਨਕ ਦੇ ਨੰਬਰ ਦੀ ਜਾਂਚ (ਘੱਟੋ-ਘੱਟ 1 ਸਾਲ ਤੋਂ ਸਥਿਰ), ਪੁਤਲੀ ਖੋਲ੍ਹ ਕੇ ਨੰਬਰ'],
        ['Corneal topography (shape map), pachymetry (thickness), tear test and full retina check', 'ਕੋਰਨੀਆ ਦੀ ਟੋਪੋਗ੍ਰਾਫੀ (ਸ਼ਕਲ ਦਾ ਨਕਸ਼ਾ), ਪੈਕੀਮੈਟਰੀ (ਮੋਟਾਈ), ਅੱਥਰੂਆਂ ਦਾ ਟੈਸਟ ਅਤੇ ਪਰਦੇ ਦੀ ਪੂਰੀ ਜਾਂਚ'],
        ['Stop soft contact lenses 1 week and hard (RGP) lenses 3 weeks before the tests and surgery', 'ਟੈਸਟਾਂ ਅਤੇ ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ ਨਰਮ ਲੈਂਜ਼ 1 ਹਫ਼ਤਾ ਅਤੇ ਸਖ਼ਤ (RGP) ਲੈਂਜ਼ 3 ਹਫ਼ਤੇ ਬੰਦ ਕਰੋ']]),
      S('2. What happens during LASIK', '2. ਲੇਸਿਕ ਦੌਰਾਨ ਕੀ ਹੁੰਦਾ ਹੈ', [
        ['Numbing drops are put; a clip holds the lids open. You look at a blinking light.', 'ਸੁੰਨ ਕਰਨ ਵਾਲੀਆਂ ਬੂੰਦਾਂ ਪਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ; ਕਲਿੱਪ ਨਾਲ ਪਲਕਾਂ ਖੁੱਲ੍ਹੀਆਂ ਰਹਿੰਦੀਆਂ ਹਨ। ਤੁਸੀਂ ਟਿਮਟਿਮਾਉਂਦੀ ਰੌਸ਼ਨੀ ਵੱਲ ਦੇਖਦੇ ਹੋ।'],
        ['A thin corneal flap is made, the laser reshapes the cornea for a few seconds and the flap is replaced. Both eyes take about 20–30 minutes.', 'ਕੋਰਨੀਆ ਦੀ ਪਤਲੀ ਪਰਤ ਚੁੱਕੀ ਜਾਂਦੀ ਹੈ, ਲੇਜ਼ਰ ਕੁਝ ਸਕਿੰਟ ਸ਼ਕਲ ਠੀਕ ਕਰਦਾ ਹੈ ਅਤੇ ਪਰਤ ਵਾਪਸ ਰੱਖੀ ਜਾਂਦੀ ਹੈ। ਦੋਵਾਂ ਅੱਖਾਂ ਲਈ ਲਗਭਗ 20–30 ਮਿੰਟ।']]),
      S('3. Before LASIK (pre-op)', '3. ਲੇਸਿਕ ਤੋਂ ਪਹਿਲਾਂ', [
        ['No eye make-up, face cream or perfume on the day. Wash your face and hair the day before.', 'ਉਸ ਦਿਨ ਅੱਖਾਂ ਦਾ ਮੇਕਅੱਪ, ਕਰੀਮ ਜਾਂ ਖ਼ੁਸ਼ਬੂ ਨਹੀਂ। ਇੱਕ ਦਿਨ ਪਹਿਲਾਂ ਚਿਹਰਾ ਅਤੇ ਸਿਰ ਧੋ ਲਓ।'],
        ['Eat a light meal; come with someone who can take you home. Do not drive yourself.', 'ਹਲਕਾ ਭੋਜਨ ਕਰੋ; ਘਰ ਲਿਜਾਣ ਲਈ ਕਿਸੇ ਨੂੰ ਨਾਲ ਲਿਆਓ। ਆਪ ਗੱਡੀ ਨਾ ਚਲਾਓ।']]),
      S('4. After LASIK (post-op)', '4. ਲੇਸਿਕ ਤੋਂ ਬਾਅਦ', [
        ['Rest with eyes closed for a few hours. Watering, grittiness and haze on the first day are normal.', 'ਕੁਝ ਘੰਟੇ ਅੱਖਾਂ ਬੰਦ ਕਰਕੇ ਆਰਾਮ ਕਰੋ। ਪਹਿਲੇ ਦਿਨ ਪਾਣੀ ਆਉਣਾ, ਰੜਕ ਅਤੇ ਧੁੰਦਲਾਪਣ ਆਮ ਹੈ।'],
        ['Use drops exactly as advised, including lubricating drops for some weeks.', 'ਬੂੰਦਾਂ ਦੱਸੇ ਅਨੁਸਾਰ ਪਾਓ, ਨਮੀ ਵਾਲੀਆਂ ਬੂੰਦਾਂ ਕੁਝ ਹਫ਼ਤੇ ਤੱਕ।'],
        ['Do not rub the eyes. Wear the shield at night for 1 week and dark glasses outdoors.', 'ਅੱਖਾਂ ਨਾ ਮਲੋ। 1 ਹਫ਼ਤਾ ਰਾਤ ਨੂੰ ਸ਼ੀਲਡ ਅਤੇ ਬਾਹਰ ਕਾਲੀਆਂ ਐਨਕਾਂ ਪਾਓ।'],
        ['No swimming for 2 weeks; no eye make-up for 1 week; avoid dust and smoke. Screen work is fine after 1–2 days, with breaks.', '2 ਹਫ਼ਤੇ ਤੈਰਾਕੀ ਨਹੀਂ; 1 ਹਫ਼ਤਾ ਅੱਖਾਂ ਦਾ ਮੇਕਅੱਪ ਨਹੀਂ; ਧੂੜ-ਧੂੰਏਂ ਤੋਂ ਬਚੋ। 1–2 ਦਿਨਾਂ ਬਾਅਦ ਆਰਾਮ ਲੈ-ਲੈ ਕੇ ਸਕਰੀਨ ਦੇਖ ਸਕਦੇ ਹੋ।'],
        ['Check-ups: next day, 1 week and 1 month.', 'ਚੈੱਕਅੱਪ: ਅਗਲੇ ਦਿਨ, 1 ਹਫ਼ਤੇ ਅਤੇ 1 ਮਹੀਨੇ ਬਾਅਦ।']])],
      urgent: ['COME IMMEDIATELY if there is increasing pain, sudden drop in vision, or increasing redness or discharge.', 'ਤੁਰੰਤ ਆਓ ਜੇ ਦਰਦ ਵਧੇ, ਨਜ਼ਰ ਅਚਾਨਕ ਘਟੇ, ਜਾਂ ਲਾਲੀ ਜਾਂ ਗਿੱਡ ਵਧੇ।'] },

    { id: 'icl', dept: 'ophtho', extra: 'eye', title: ['ICL (Implantable Contact Lens) — Patient Instructions', 'ICL (ਅੱਖ ਦੇ ਅੰਦਰ ਲੈਂਜ਼) — ਮਰੀਜ਼ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests needed before surgery', '1. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਟੈਸਟ', [
        ['Glasses power (stable for 1 year), corneal topography and white-to-white measurement', 'ਐਨਕ ਦਾ ਨੰਬਰ (1 ਸਾਲ ਤੋਂ ਸਥਿਰ), ਕੋਰਨੀਆ ਦੀ ਟੋਪੋਗ੍ਰਾਫੀ ਅਤੇ ਅੱਖ ਦੀ ਚੌੜਾਈ ਦਾ ਮਾਪ'],
        ['Anterior chamber depth scan and specular microscopy (corneal cell count) to choose the lens size', 'ਲੈਂਜ਼ ਦਾ ਸਾਈਜ਼ ਚੁਣਨ ਲਈ ਅੱਖ ਦੇ ਅਗਲੇ ਹਿੱਸੇ ਦੀ ਡੂੰਘਾਈ ਦਾ ਸਕੈਨ ਅਤੇ ਸਪੈਕੂਲਰ ਮਾਈਕ੍ਰੋਸਕੋਪੀ (ਕੋਰਨੀਆ ਦੇ ਸੈੱਲ)'],
        ['Eye pressure and full retina check; blood sugar and BP as advised', 'ਅੱਖ ਦਾ ਦਬਾਅ ਅਤੇ ਪਰਦੇ ਦੀ ਪੂਰੀ ਜਾਂਚ; ਸਲਾਹ ਅਨੁਸਾਰ ਸ਼ੂਗਰ ਅਤੇ BP'],
        ['Stop contact lenses 1 week (soft) or 3 weeks (hard) before the tests', 'ਟੈਸਟਾਂ ਤੋਂ ਪਹਿਲਾਂ ਨਰਮ ਲੈਂਜ਼ 1 ਹਫ਼ਤਾ ਜਾਂ ਸਖ਼ਤ ਲੈਂਜ਼ 3 ਹਫ਼ਤੇ ਬੰਦ ਕਰੋ']]),
      S('2. What happens during surgery', '2. ਆਪ੍ਰੇਸ਼ਨ ਦੌਰਾਨ ਕੀ ਹੁੰਦਾ ਹੈ', [
        ['Drops widen the pupil and numb the eye; you stay awake.', 'ਬੂੰਦਾਂ ਨਾਲ ਪੁਤਲੀ ਖੋਲ੍ਹੀ ਅਤੇ ਅੱਖ ਸੁੰਨ ਕੀਤੀ ਜਾਂਦੀ ਹੈ; ਤੁਸੀਂ ਜਾਗਦੇ ਰਹਿੰਦੇ ਹੋ।'],
        ['The folded lens is placed through a tiny opening behind the iris. About 15–20 minutes per eye; usually one eye at a time.', 'ਮੁੜਿਆ ਲੈਂਜ਼ ਛੋਟੇ ਚੀਰੇ ਰਾਹੀਂ ਪੁਤਲੀ ਦੇ ਪਿੱਛੇ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ। ਹਰ ਅੱਖ ਲਈ ਲਗਭਗ 15–20 ਮਿੰਟ; ਆਮ ਤੌਰ \'ਤੇ ਇੱਕ ਵਾਰ ਇੱਕ ਅੱਖ।']]),
      S('3. Before surgery (pre-op)', '3. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ', [
        ['Start antibiotic drops ' + B + ' days before, as prescribed. Light breakfast on the day.', 'ਐਂਟੀਬਾਇਓਟਿਕ ਬੂੰਦਾਂ ' + B + ' ਦਿਨ ਪਹਿਲਾਂ ਪਰਚੀ ਅਨੁਸਾਰ ਸ਼ੁਰੂ ਕਰੋ। ਉਸ ਦਿਨ ਹਲਕਾ ਨਾਸ਼ਤਾ।'],
        ['Wash hair the day before; no kajal or make-up; come with one attendant.', 'ਇੱਕ ਦਿਨ ਪਹਿਲਾਂ ਸਿਰ ਧੋ ਲਓ; ਕਾਜਲ ਜਾਂ ਮੇਕਅੱਪ ਨਹੀਂ; ਇੱਕ ਸਾਥੀ ਨਾਲ ਆਓ।']]),
      S('4. After surgery (post-op)', '4. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ', [
        ['Eye pressure is checked a few hours after surgery and again the next day.', 'ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਕੁਝ ਘੰਟੇ ਬਾਅਦ ਅਤੇ ਅਗਲੇ ਦਿਨ ਅੱਖ ਦਾ ਦਬਾਅ ਚੈੱਕ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।'],
        ['Use drops exactly as advised, with clean hands. Wear the shield at night for 1 week and dark glasses outdoors.', 'ਬੂੰਦਾਂ ਸਾਫ਼ ਹੱਥਾਂ ਨਾਲ ਦੱਸੇ ਅਨੁਸਾਰ ਪਾਓ। 1 ਹਫ਼ਤਾ ਰਾਤ ਨੂੰ ਸ਼ੀਲਡ ਅਤੇ ਬਾਹਰ ਕਾਲੀਆਂ ਐਨਕਾਂ।'],
        ['Do not rub the eye. No head bath for 1 week; no swimming or eye make-up for 2 weeks.', 'ਅੱਖ ਨਾ ਮਲੋ। 1 ਹਫ਼ਤਾ ਸਿਰ ਨਾ ਨਹਾਓ; 2 ਹਫ਼ਤੇ ਤੈਰਾਕੀ ਜਾਂ ਅੱਖਾਂ ਦਾ ਮੇਕਅੱਪ ਨਹੀਂ।'],
        ['Check-ups: next day, 1 week, 1 month, then every year.', 'ਚੈੱਕਅੱਪ: ਅਗਲੇ ਦਿਨ, 1 ਹਫ਼ਤੇ, 1 ਮਹੀਨੇ ਅਤੇ ਫਿਰ ਹਰ ਸਾਲ।']])],
      urgent: ['COME IMMEDIATELY if you have eye pain with headache or vomiting, coloured haloes around lights, or vision becomes blurred.', 'ਤੁਰੰਤ ਆਓ ਜੇ ਅੱਖ ਦੇ ਦਰਦ ਨਾਲ ਸਿਰ ਦਰਦ ਜਾਂ ਉਲਟੀ ਹੋਵੇ, ਰੌਸ਼ਨੀਆਂ ਦੁਆਲੇ ਰੰਗਦਾਰ ਘੇਰੇ ਦਿਸਣ, ਜਾਂ ਨਜ਼ਰ ਧੁੰਦਲੀ ਹੋ ਜਾਵੇ।'] },

    { id: 'antivegf', dept: 'ophtho', extra: 'eye', title: ['Intravitreal Anti-VEGF Injection — Patient Instructions', 'ਅੱਖ ਵਿੱਚ ਐਂਟੀ-VEGF ਟੀਕਾ — ਮਰੀਜ਼ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests needed before the injection', '1. ਟੀਕੇ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਟੈਸਟ', [
        ['OCT scan of the retina; FFA (dye test) if advised', 'ਪਰਦੇ ਦਾ OCT ਸਕੈਨ; ਸਲਾਹ ਹੋਵੇ ਤਾਂ FFA (ਰੰਗ ਵਾਲਾ ਟੈਸਟ)'],
        ['Blood sugar and BP check; tell us about any recent heart attack or stroke', 'ਬਲੱਡ ਸ਼ੂਗਰ ਅਤੇ BP ਦੀ ਜਾਂਚ; ਹਾਲ ਹੀ ਵਿੱਚ ਦਿਲ ਦਾ ਦੌਰਾ ਜਾਂ ਅਧਰੰਗ ਹੋਇਆ ਹੋਵੇ ਤਾਂ ਦੱਸੋ'],
        ['Tell us if the eye is red, sticky or has an infection on the injection day', 'ਟੀਕੇ ਵਾਲੇ ਦਿਨ ਅੱਖ ਲਾਲ, ਚਿਪਚਿਪੀ ਜਾਂ ਇਨਫੈਕਸ਼ਨ ਵਾਲੀ ਹੋਵੇ ਤਾਂ ਦੱਸੋ']]),
      S('2. What happens during the injection', '2. ਟੀਕੇ ਦੌਰਾਨ ਕੀ ਹੁੰਦਾ ਹੈ', [
        ['Numbing drops are put and the eye and lids are cleaned with antiseptic.', 'ਸੁੰਨ ਕਰਨ ਵਾਲੀਆਂ ਬੂੰਦਾਂ ਪਾ ਕੇ ਅੱਖ ਅਤੇ ਪਲਕਾਂ ਐਂਟੀਸੈਪਟਿਕ ਨਾਲ ਸਾਫ਼ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।'],
        ['A small clip keeps the lids open; the medicine is injected into the eye in a few seconds. You feel only slight pressure.', 'ਛੋਟੀ ਕਲਿੱਪ ਨਾਲ ਪਲਕਾਂ ਖੁੱਲ੍ਹੀਆਂ ਰੱਖ ਕੇ ਕੁਝ ਸਕਿੰਟਾਂ ਵਿੱਚ ਦਵਾਈ ਅੱਖ ਵਿੱਚ ਪਾਈ ਜਾਂਦੀ ਹੈ। ਸਿਰਫ਼ ਹਲਕਾ ਦਬਾਅ ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ।']]),
      S('3. Before the injection', '3. ਟੀਕੇ ਤੋਂ ਪਹਿਲਾਂ', [
        ['Eat normally and take all your usual medicines. No kajal or eye make-up.', 'ਆਮ ਵਾਂਗ ਖਾਓ ਅਤੇ ਆਪਣੀਆਂ ਸਾਰੀਆਂ ਦਵਾਈਆਂ ਲਓ। ਕਾਜਲ ਜਾਂ ਅੱਖਾਂ ਦਾ ਮੇਕਅੱਪ ਨਹੀਂ।'],
        ['Use antibiotic drops before the injection only if prescribed. Come with one attendant.', 'ਐਂਟੀਬਾਇਓਟਿਕ ਬੂੰਦਾਂ ਟੀਕੇ ਤੋਂ ਪਹਿਲਾਂ ਸਿਰਫ਼ ਲਿਖੀਆਂ ਹੋਣ ਤਾਂ ਪਾਓ। ਇੱਕ ਸਾਥੀ ਨਾਲ ਆਓ।']]),
      S('4. After the injection', '4. ਟੀਕੇ ਤੋਂ ਬਾਅਦ', [
        ['Mild grittiness, a small red patch or floating spots for 1–2 days are normal.', '1–2 ਦਿਨ ਹਲਕੀ ਰੜਕ, ਛੋਟਾ ਲਾਲ ਧੱਬਾ ਜਾਂ ਤੈਰਦੇ ਧੱਬੇ ਆਮ ਹਨ।'],
        ['Use drops exactly as advised. Do not rub the eye. No water in the eye, swimming or eye make-up for 3 days.', 'ਬੂੰਦਾਂ ਦੱਸੇ ਅਨੁਸਾਰ ਪਾਓ। ਅੱਖ ਨਾ ਮਲੋ। 3 ਦਿਨ ਅੱਖ ਵਿੱਚ ਪਾਣੀ, ਤੈਰਾਕੀ ਜਾਂ ਮੇਕਅੱਪ ਨਹੀਂ।'],
        ['Keep sugar, BP and cholesterol controlled. Next injection / review date: ' + B, 'ਸ਼ੂਗਰ, BP ਅਤੇ ਕੋਲੈਸਟ੍ਰੋਲ ਕਾਬੂ ਵਿੱਚ ਰੱਖੋ। ਅਗਲਾ ਟੀਕਾ / ਚੈੱਕਅੱਪ ਦੀ ਤਾਰੀਖ਼: ' + B]])],
      urgent: ['COME IMMEDIATELY (within 24 hours) if pain increases, vision falls, the eye becomes more red or sensitive to light, or there is discharge.', 'ਤੁਰੰਤ ਆਓ (24 ਘੰਟਿਆਂ ਵਿੱਚ) ਜੇ ਦਰਦ ਵਧੇ, ਨਜ਼ਰ ਘਟੇ, ਅੱਖ ਹੋਰ ਲਾਲ ਹੋਵੇ ਜਾਂ ਰੌਸ਼ਨੀ ਚੁਭੇ, ਜਾਂ ਗਿੱਡ ਆਵੇ।'] },

    { id: 'delivery', dept: 'obg', extra: 'obg', title: ['Normal Delivery — Instructions for the Mother', 'ਨਾਰਮਲ ਜਣੇਪਾ — ਮਾਂ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests during pregnancy (before delivery)', '1. ਗਰਭ ਦੌਰਾਨ ਟੈਸਟ (ਜਣੇਪੇ ਤੋਂ ਪਹਿਲਾਂ)', [
        ['Haemoglobin, blood group & Rh, blood sugar (OGTT), thyroid, urine test', 'ਹੀਮੋਗਲੋਬਿਨ, ਬਲੱਡ ਗਰੁੱਪ ਤੇ Rh, ਬਲੱਡ ਸ਼ੂਗਰ (OGTT), ਥਾਇਰਾਇਡ, ਪਿਸ਼ਾਬ ਦਾ ਟੈਸਟ'],
        ['HIV, HBsAg, VDRL; ultrasound scans as advised; CTG (baby heart tracing) near term', 'HIV, HBsAg, VDRL; ਸਲਾਹ ਅਨੁਸਾਰ ਅਲਟਰਾਸਾਊਂਡ; ਆਖ਼ਰੀ ਦਿਨਾਂ ਵਿੱਚ CTG (ਬੱਚੇ ਦੀ ਧੜਕਣ ਦੀ ਜਾਂਚ)']]),
      S('2. Come to hospital at once if', '2. ਤੁਰੰਤ ਹਸਪਤਾਲ ਆਓ ਜੇ', [
        ['Regular pains every 5 minutes or less, water breaks (leaking fluid), or any bleeding', 'ਹਰ 5 ਮਿੰਟ ਜਾਂ ਘੱਟ ਸਮੇਂ ਬਾਅਦ ਨਿਯਮਤ ਦਰਦ, ਪਾਣੀ ਪੈ ਜਾਵੇ, ਜਾਂ ਕੋਈ ਵੀ ਖ਼ੂਨ ਆਵੇ'],
        ["Baby moves less than usual, severe headache, blurred vision, swelling of face or hands, or fits", 'ਬੱਚੇ ਦੀ ਹਿਲਜੁਲ ਆਮ ਨਾਲੋਂ ਘੱਟ, ਤੇਜ਼ ਸਿਰ ਦਰਦ, ਧੁੰਦਲੀ ਨਜ਼ਰ, ਚਿਹਰੇ ਜਾਂ ਹੱਥਾਂ ਦੀ ਸੋਜ, ਜਾਂ ਦੌਰਾ']]),
      S('3. During labour', '3. ਜਣੇਪੇ ਦੌਰਾਨ', [
        ["Your progress and baby's heartbeat are checked regularly. Walk and change position as advised; keep sipping fluids.", 'ਤੁਹਾਡੀ ਤਰੱਕੀ ਅਤੇ ਬੱਚੇ ਦੀ ਧੜਕਣ ਵਾਰ-ਵਾਰ ਚੈੱਕ ਹੁੰਦੀ ਹੈ। ਸਲਾਹ ਅਨੁਸਾਰ ਤੁਰੋ ਅਤੇ ਪਾਸਾ ਬਦਲੋ; ਥੋੜ੍ਹਾ-ਥੋੜ੍ਹਾ ਪਾਣੀ ਪੀਂਦੇ ਰਹੋ।'],
        ['Bring your file, reports, ID, clothes and pads for you, clothes for baby, and one female attendant.', 'ਆਪਣੀ ਫ਼ਾਈਲ, ਰਿਪੋਰਟਾਂ, ਪਛਾਣ ਪੱਤਰ, ਆਪਣੇ ਕੱਪੜੇ ਤੇ ਪੈਡ, ਬੱਚੇ ਦੇ ਕੱਪੜੇ ਅਤੇ ਇੱਕ ਔਰਤ ਸਾਥੀ ਨਾਲ ਲਿਆਓ।']]),
      S('4. After delivery', '4. ਜਣੇਪੇ ਤੋਂ ਬਾਅਦ', [
        ['Start breastfeeding within 1 hour; feed often (8–12 times a day). Give only breast milk for 6 months — no honey, water or ghutti.', '1 ਘੰਟੇ ਅੰਦਰ ਦੁੱਧ ਪਿਲਾਉਣਾ ਸ਼ੁਰੂ ਕਰੋ; ਵਾਰ-ਵਾਰ ਪਿਲਾਓ (ਦਿਨ ਵਿੱਚ 8–12 ਵਾਰ)। 6 ਮਹੀਨੇ ਸਿਰਫ਼ ਮਾਂ ਦਾ ਦੁੱਧ — ਸ਼ਹਿਦ, ਪਾਣੀ ਜਾਂ ਗੁੜ੍ਹਤੀ ਨਹੀਂ।'],
        ['Keep the stitch area clean and dry; wash after toilet; change pads often. Bleeding reduces over 4–6 weeks.', 'ਟਾਂਕਿਆਂ ਵਾਲੀ ਥਾਂ ਸਾਫ਼ ਤੇ ਸੁੱਕੀ ਰੱਖੋ; ਪਖ਼ਾਨੇ ਤੋਂ ਬਾਅਦ ਧੋਵੋ; ਪੈਡ ਵਾਰ-ਵਾਰ ਬਦਲੋ। ਖ਼ੂਨ 4–6 ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਘਟਦਾ ਜਾਂਦਾ ਹੈ।'],
        ['Eat a balanced diet, drink plenty of water, continue iron and calcium. No intercourse or heavy lifting for 6 weeks.', 'ਸੰਤੁਲਿਤ ਭੋਜਨ, ਖ਼ੂਬ ਪਾਣੀ, ਆਇਰਨ ਤੇ ਕੈਲਸ਼ੀਅਮ ਜਾਰੀ ਰੱਖੋ। 6 ਹਫ਼ਤੇ ਸੰਬੰਧ ਜਾਂ ਭਾਰੀ ਭਾਰ ਨਹੀਂ।'],
        ["Baby's vaccinations as per card; your check-up at 6 weeks and family planning advice.", 'ਬੱਚੇ ਦੇ ਟੀਕੇ ਕਾਰਡ ਅਨੁਸਾਰ; ਤੁਹਾਡਾ ਚੈੱਕਅੱਪ 6 ਹਫ਼ਤਿਆਂ \'ਤੇ ਅਤੇ ਪਰਿਵਾਰ ਨਿਯੋਜਨ ਦੀ ਸਲਾਹ।']])],
      urgent: ['COME IMMEDIATELY if there is heavy bleeding (soaking a pad every hour), fever, foul-smelling discharge, severe headache, breathlessness, or leg pain/swelling.', 'ਤੁਰੰਤ ਆਓ ਜੇ ਜ਼ਿਆਦਾ ਖ਼ੂਨ ਆਵੇ (ਹਰ ਘੰਟੇ ਪੈਡ ਭਰ ਜਾਵੇ), ਬੁਖ਼ਾਰ, ਬਦਬੂਦਾਰ ਪਾਣੀ, ਤੇਜ਼ ਸਿਰ ਦਰਦ, ਸਾਹ ਚੜ੍ਹਨਾ, ਜਾਂ ਲੱਤ ਵਿੱਚ ਦਰਦ/ਸੋਜ ਹੋਵੇ।'] },

    { id: 'lscs', dept: 'obg', extra: 'obg', title: ['Caesarean Section (LSCS) — Patient Instructions', 'ਵੱਡਾ ਆਪ੍ਰੇਸ਼ਨ (ਸੀਜ਼ੇਰੀਅਨ) — ਮਰੀਜ਼ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests needed before surgery', '1. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ ਜ਼ਰੂਰੀ ਟੈਸਟ', [
        ['Haemoglobin, blood group & Rh, cross-match (blood arranged), blood sugar, urine test', 'ਹੀਮੋਗਲੋਬਿਨ, ਬਲੱਡ ਗਰੁੱਪ ਤੇ Rh, ਕਰਾਸ-ਮੈਚ (ਖ਼ੂਨ ਦਾ ਪ੍ਰਬੰਧ), ਬਲੱਡ ਸ਼ੂਗਰ, ਪਿਸ਼ਾਬ ਦਾ ਟੈਸਟ'],
        ['HIV, HBsAg, HCV; ultrasound; anaesthesia check-up; ECG and other tests if advised', 'HIV, HBsAg, HCV; ਅਲਟਰਾਸਾਊਂਡ; ਬੇਹੋਸ਼ੀ ਵਾਲੇ ਡਾਕਟਰ ਦੀ ਜਾਂਚ; ਸਲਾਹ ਹੋਵੇ ਤਾਂ ਈ.ਸੀ.ਜੀ. ਤੇ ਹੋਰ ਟੈਸਟ']]),
      S('2. What happens during surgery', '2. ਆਪ੍ਰੇਸ਼ਨ ਦੌਰਾਨ ਕੀ ਹੁੰਦਾ ਹੈ', [
        ['A drip and urine tube are put. Spinal anaesthesia numbs the lower body; you stay awake and feel no pain.', 'ਡਰਿੱਪ ਅਤੇ ਪਿਸ਼ਾਬ ਦੀ ਨਲੀ ਲਗਾਈ ਜਾਂਦੀ ਹੈ। ਰੀੜ੍ਹ ਵਾਲੇ ਟੀਕੇ ਨਾਲ ਹੇਠਲਾ ਸਰੀਰ ਸੁੰਨ ਹੁੰਦਾ ਹੈ; ਤੁਸੀਂ ਜਾਗਦੇ ਹੋ ਤੇ ਦਰਦ ਨਹੀਂ ਹੁੰਦਾ।'],
        ['A cut is made low on the abdomen. Baby is born in about 10 minutes; the whole operation takes 45–60 minutes.', 'ਪੇਟ ਦੇ ਹੇਠਲੇ ਹਿੱਸੇ \'ਤੇ ਚੀਰਾ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ। ਲਗਭਗ 10 ਮਿੰਟ ਵਿੱਚ ਬੱਚਾ ਪੈਦਾ ਹੁੰਦਾ ਹੈ; ਪੂਰਾ ਆਪ੍ਰੇਸ਼ਨ 45–60 ਮਿੰਟ।']]),
      S('3. Before surgery (pre-op)', '3. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ', [
        ['Nothing to eat or drink for ' + B + ' hours before surgery (usually 6–8 hours), as advised.', 'ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ' + B + ' ਘੰਟੇ ਪਹਿਲਾਂ (ਆਮ ਤੌਰ \'ਤੇ 6–8 ਘੰਟੇ) ਕੁਝ ਨਾ ਖਾਓ-ਪੀਓ, ਜਿਵੇਂ ਦੱਸਿਆ ਜਾਵੇ।'],
        ['Bathe, remove jewellery, nail polish and make-up. Tell us about all your medicines and allergies.', 'ਨਹਾ ਲਓ, ਗਹਿਣੇ, ਨੇਲ ਪਾਲਿਸ਼ ਅਤੇ ਮੇਕਅੱਪ ਉਤਾਰੋ। ਆਪਣੀਆਂ ਸਾਰੀਆਂ ਦਵਾਈਆਂ ਅਤੇ ਐਲਰਜੀ ਬਾਰੇ ਦੱਸੋ।']]),
      S('4. After surgery (post-op)', '4. ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ', [
        ['Sips of water after a few hours, then a light diet. Get up and walk on the next day — this prevents clots.', 'ਕੁਝ ਘੰਟਿਆਂ ਬਾਅਦ ਪਾਣੀ ਦੇ ਘੁੱਟ, ਫਿਰ ਹਲਕਾ ਭੋਜਨ। ਅਗਲੇ ਦਿਨ ਉੱਠ ਕੇ ਤੁਰੋ — ਇਸ ਨਾਲ ਖ਼ੂਨ ਦੇ ਥੱਕੇ ਨਹੀਂ ਬਣਦੇ।'],
        ['Breastfeed early and often. Keep the wound clean and dry; support it with a hand or pillow when you cough.', 'ਜਲਦੀ ਅਤੇ ਵਾਰ-ਵਾਰ ਦੁੱਧ ਪਿਲਾਓ। ਜ਼ਖ਼ਮ ਸਾਫ਼ ਤੇ ਸੁੱਕਾ ਰੱਖੋ; ਖੰਘਣ ਵੇਲੇ ਹੱਥ ਜਾਂ ਸਿਰਹਾਣੇ ਨਾਲ ਸਹਾਰਾ ਦਿਓ।'],
        ['Stitch removal / wound check on: ' + B + '. Continue iron and calcium; eat a high-protein diet.', 'ਟਾਂਕੇ ਖੋਲ੍ਹਣ / ਜ਼ਖ਼ਮ ਦੀ ਜਾਂਚ: ' + B + '। ਆਇਰਨ ਤੇ ਕੈਲਸ਼ੀਅਮ ਜਾਰੀ ਰੱਖੋ; ਪ੍ਰੋਟੀਨ ਵਾਲਾ ਭੋਜਨ ਖਾਓ।'],
        ['No heavy lifting (more than your baby) or intercourse for 6 weeks. Plan contraception; wait at least 18 months before the next pregnancy.', '6 ਹਫ਼ਤੇ ਭਾਰੀ ਭਾਰ (ਬੱਚੇ ਤੋਂ ਵੱਧ) ਜਾਂ ਸੰਬੰਧ ਨਹੀਂ। ਪਰਿਵਾਰ ਨਿਯੋਜਨ ਕਰੋ; ਅਗਲੇ ਗਰਭ ਲਈ ਘੱਟੋ-ਘੱਟ 18 ਮਹੀਨੇ ਉਡੀਕ ਕਰੋ।']])],
      urgent: ['COME IMMEDIATELY if there is fever, wound redness, pus or opening, heavy bleeding, severe pain, breathlessness, or pain/swelling in a leg.', 'ਤੁਰੰਤ ਆਓ ਜੇ ਬੁਖ਼ਾਰ, ਜ਼ਖ਼ਮ ਵਿੱਚ ਲਾਲੀ, ਪੀਕ ਜਾਂ ਖੁੱਲ੍ਹਣਾ, ਜ਼ਿਆਦਾ ਖ਼ੂਨ, ਤੇਜ਼ ਦਰਦ, ਸਾਹ ਚੜ੍ਹਨਾ, ਜਾਂ ਲੱਤ ਵਿੱਚ ਦਰਦ/ਸੋਜ ਹੋਵੇ।'] },

    { id: 'gdm', dept: 'obg', extra: 'obg', title: ['Pregnancy with Diabetes — Instructions for the Mother', 'ਗਰਭ ਅਵਸਥਾ ਵਿੱਚ ਸ਼ੂਗਰ — ਮਾਂ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests and check-ups', '1. ਟੈਸਟ ਅਤੇ ਚੈੱਕਅੱਪ', [
        ['Sugar test (OGTT) as advised; HbA1c, kidney function and urine tests; eye check if you had diabetes before pregnancy', 'ਸਲਾਹ ਅਨੁਸਾਰ ਸ਼ੂਗਰ ਦਾ ਟੈਸਟ (OGTT); HbA1c, ਗੁਰਦਿਆਂ ਅਤੇ ਪਿਸ਼ਾਬ ਦੇ ਟੈਸਟ; ਗਰਭ ਤੋਂ ਪਹਿਲਾਂ ਸ਼ੂਗਰ ਸੀ ਤਾਂ ਅੱਖਾਂ ਦੀ ਜਾਂਚ'],
        ['Growth scans of the baby and more frequent visits; BP and weight checked at every visit', 'ਬੱਚੇ ਦੇ ਵਾਧੇ ਦੇ ਸਕੈਨ ਅਤੇ ਵੱਧ ਵਾਰ ਚੈੱਕਅੱਪ; ਹਰ ਵਾਰ BP ਅਤੇ ਭਾਰ ਦੀ ਜਾਂਚ']]),
      S('2. Check your sugar at home', '2. ਘਰ ਵਿੱਚ ਸ਼ੂਗਰ ਚੈੱਕ ਕਰੋ', [
        ['Check fasting sugar and 2 hours after main meals, as advised. Write every reading in a diary and bring it to each visit.', 'ਸਲਾਹ ਅਨੁਸਾਰ ਖਾਲੀ ਪੇਟ ਅਤੇ ਮੁੱਖ ਭੋਜਨ ਤੋਂ 2 ਘੰਟੇ ਬਾਅਦ ਸ਼ੂਗਰ ਚੈੱਕ ਕਰੋ। ਹਰ ਰੀਡਿੰਗ ਡਾਇਰੀ ਵਿੱਚ ਲਿਖੋ ਅਤੇ ਹਰ ਵਾਰ ਨਾਲ ਲਿਆਓ।'],
        ['Usual targets: fasting below 95 mg/dL; 2 hours after meals below 120 mg/dL — or as your doctor writes: ' + B, 'ਆਮ ਟੀਚਾ: ਖਾਲੀ ਪੇਟ 95 mg/dL ਤੋਂ ਘੱਟ; ਭੋਜਨ ਤੋਂ 2 ਘੰਟੇ ਬਾਅਦ 120 mg/dL ਤੋਂ ਘੱਟ — ਜਾਂ ਡਾਕਟਰ ਦੇ ਲਿਖੇ ਅਨੁਸਾਰ: ' + B]]),
      S('3. Diet and exercise', '3. ਖ਼ੁਰਾਕ ਅਤੇ ਕਸਰਤ', [
        ['Eat 3 small meals and 2–3 small snacks; do not skip meals. Prefer whole grains, dals, vegetables, salad, curd and paneer.', '3 ਛੋਟੇ ਭੋਜਨ ਅਤੇ 2–3 ਹਲਕੇ ਨਾਸ਼ਤੇ ਕਰੋ; ਭੋਜਨ ਨਾ ਛੱਡੋ। ਸਾਬਤ ਅਨਾਜ, ਦਾਲਾਂ, ਸਬਜ਼ੀਆਂ, ਸਲਾਦ, ਦਹੀਂ ਅਤੇ ਪਨੀਰ ਖਾਓ।'],
        ['Avoid sugar, sweets, juices, cold drinks, white bread, maida and fried food. Eat whole fruit in small portions.', 'ਖੰਡ, ਮਿਠਾਈਆਂ, ਜੂਸ, ਕੋਲਡ ਡਰਿੰਕ, ਚਿੱਟੀ ਬ੍ਰੈੱਡ, ਮੈਦਾ ਅਤੇ ਤਲੇ ਭੋਜਨ ਤੋਂ ਬਚੋ। ਸਾਬਤ ਫਲ ਥੋੜ੍ਹੀ ਮਾਤਰਾ ਵਿੱਚ ਖਾਓ।'],
        ['Walk for 15–30 minutes after meals, unless your doctor has told you to rest.', 'ਭੋਜਨ ਤੋਂ ਬਾਅਦ 15–30 ਮਿੰਟ ਤੁਰੋ, ਜਦੋਂ ਤੱਕ ਡਾਕਟਰ ਨੇ ਆਰਾਮ ਕਰਨ ਲਈ ਨਾ ਕਿਹਾ ਹੋਵੇ।']]),
      S('4. Medicines and low sugar', '4. ਦਵਾਈਆਂ ਅਤੇ ਘੱਟ ਸ਼ੂਗਰ', [
        ['Take tablets or insulin exactly as prescribed. Keep insulin in the fridge door (not the freezer).', 'ਗੋਲੀਆਂ ਜਾਂ ਇੰਸੁਲਿਨ ਬਿਲਕੁਲ ਲਿਖੇ ਅਨੁਸਾਰ ਲਓ। ਇੰਸੁਲਿਨ ਫ਼ਰਿੱਜ ਦੇ ਦਰਵਾਜ਼ੇ ਵਿੱਚ ਰੱਖੋ (ਫ਼ਰੀਜ਼ਰ ਵਿੱਚ ਨਹੀਂ)।'],
        ['Low sugar (sweating, shaking, dizziness, sugar below 70): take 3 teaspoons of sugar or glucose in water, recheck after 15 minutes, then eat a snack.', 'ਘੱਟ ਸ਼ੂਗਰ (ਪਸੀਨਾ, ਕੰਬਣੀ, ਚੱਕਰ, ਸ਼ੂਗਰ 70 ਤੋਂ ਘੱਟ): 3 ਚਮਚ ਖੰਡ ਜਾਂ ਗਲੂਕੋਜ਼ ਪਾਣੀ ਵਿੱਚ ਲਓ, 15 ਮਿੰਟ ਬਾਅਦ ਦੁਬਾਰਾ ਚੈੱਕ ਕਰੋ, ਫਿਰ ਕੁਝ ਖਾਓ।']]),
      S('5. Delivery and after', '5. ਜਣੇਪਾ ਅਤੇ ਬਾਅਦ ਵਿੱਚ', [
        ["Delivery is usually planned around 38–39 weeks. The baby's sugar is checked after birth; breastfeed early and often.", 'ਜਣੇਪਾ ਆਮ ਤੌਰ \'ਤੇ 38–39 ਹਫ਼ਤਿਆਂ ਦੇ ਆਸ-ਪਾਸ ਤੈਅ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਜਨਮ ਤੋਂ ਬਾਅਦ ਬੱਚੇ ਦੀ ਸ਼ੂਗਰ ਚੈੱਕ ਹੁੰਦੀ ਹੈ; ਜਲਦੀ ਅਤੇ ਵਾਰ-ਵਾਰ ਦੁੱਧ ਪਿਲਾਓ।'],
        ['If diabetes started in pregnancy, have a sugar test (OGTT) 6–12 weeks after delivery and then every year.', 'ਜੇ ਸ਼ੂਗਰ ਗਰਭ ਦੌਰਾਨ ਸ਼ੁਰੂ ਹੋਈ ਸੀ, ਤਾਂ ਜਣੇਪੇ ਤੋਂ 6–12 ਹਫ਼ਤੇ ਬਾਅਦ ਅਤੇ ਫਿਰ ਹਰ ਸਾਲ ਸ਼ੂਗਰ ਦਾ ਟੈਸਟ (OGTT) ਕਰਵਾਓ।']])],
      urgent: ["COME IMMEDIATELY if sugar stays below 70 after treatment or above 250, there is vomiting, baby moves less, severe headache, swelling, blurred vision, bleeding or leaking water.", 'ਤੁਰੰਤ ਆਓ ਜੇ ਇਲਾਜ ਤੋਂ ਬਾਅਦ ਵੀ ਸ਼ੂਗਰ 70 ਤੋਂ ਘੱਟ ਜਾਂ 250 ਤੋਂ ਵੱਧ ਰਹੇ, ਉਲਟੀਆਂ, ਬੱਚੇ ਦੀ ਹਿਲਜੁਲ ਘਟੇ, ਤੇਜ਼ ਸਿਰ ਦਰਦ, ਸੋਜ, ਧੁੰਦਲੀ ਨਜ਼ਰ, ਖ਼ੂਨ ਜਾਂ ਪਾਣੀ ਪਵੇ।'] },
    { id: 'infertility', dept: 'obg', extra: 'obg', title: ['Infertility Treatment — Instructions for the Couple', 'ਬੇਔਲਾਦੀ ਦਾ ਇਲਾਜ — ਪਤੀ-ਪਤਨੀ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests for both partners', '1. ਦੋਵਾਂ ਲਈ ਟੈਸਟ', [
        ['Wife: hormone tests on day 2–3 of periods (FSH, LH, AMH, TSH, prolactin), ultrasound of uterus and ovaries', 'ਪਤਨੀ: ਮਾਹਵਾਰੀ ਦੇ ਦੂਜੇ-ਤੀਜੇ ਦਿਨ ਹਾਰਮੋਨ ਟੈਸਟ (FSH, LH, AMH, TSH, ਪ੍ਰੋਲੈਕਟਿਨ), ਬੱਚੇਦਾਨੀ ਅਤੇ ਅੰਡੇਦਾਨੀਆਂ ਦਾ ਅਲਟਰਾਸਾਊਂਡ'],
        ['Tube test (HSG or sono-HSG) after periods end; blood sugar, haemoglobin, rubella and other tests as advised', 'ਮਾਹਵਾਰੀ ਖ਼ਤਮ ਹੋਣ ਤੋਂ ਬਾਅਦ ਨਲੀਆਂ ਦਾ ਟੈਸਟ (HSG ਜਾਂ ਸੋਨੋ-HSG); ਸਲਾਹ ਅਨੁਸਾਰ ਸ਼ੂਗਰ, ਹੀਮੋਗਲੋਬਿਨ, ਰੂਬੈਲਾ ਤੇ ਹੋਰ ਟੈਸਟ'],
        ['Husband: semen analysis after 2–5 days of abstinence', 'ਪਤੀ: 2–5 ਦਿਨ ਸੰਬੰਧ ਨਾ ਬਣਾਉਣ ਤੋਂ ਬਾਅਦ ਵੀਰਜ ਦੀ ਜਾਂਚ']]),
      S('2. What happens during treatment', '2. ਇਲਾਜ ਦੌਰਾਨ ਕੀ ਹੁੰਦਾ ਹੈ', [
        ['Tablets or injections help the eggs grow. Follicle scans on set days show when the egg is ready.', 'ਗੋਲੀਆਂ ਜਾਂ ਟੀਕਿਆਂ ਨਾਲ ਅੰਡੇ ਵਧਦੇ ਹਨ। ਤੈਅ ਦਿਨਾਂ \'ਤੇ ਫੌਲੀਕਲ ਸਕੈਨ ਨਾਲ ਪਤਾ ਲੱਗਦਾ ਹੈ ਕਿ ਅੰਡਾ ਕਦੋਂ ਤਿਆਰ ਹੈ।'],
        ['A trigger injection is given; timed intercourse or IUI (washed sperm placed in the womb) is advised. IUI is painless and takes a few minutes.', 'ਟ੍ਰਿਗਰ ਟੀਕਾ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ; ਸਮੇਂ ਸਿਰ ਸੰਬੰਧ ਜਾਂ IUI (ਸਾਫ਼ ਕੀਤੇ ਸ਼ੁਕਰਾਣੂ ਬੱਚੇਦਾਨੀ ਵਿੱਚ) ਦੀ ਸਲਾਹ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ। IUI ਵਿੱਚ ਦਰਦ ਨਹੀਂ ਹੁੰਦਾ ਅਤੇ ਕੁਝ ਮਿੰਟ ਲੱਗਦੇ ਹਨ।']]),
      S('3. Before treatment / IUI', '3. ਇਲਾਜ / IUI ਤੋਂ ਪਹਿਲਾਂ', [
        ['Start folic acid daily. Keep a healthy weight; stop smoking and alcohol (both partners).', 'ਰੋਜ਼ ਫੋਲਿਕ ਐਸਿਡ ਸ਼ੁਰੂ ਕਰੋ। ਸਿਹਤਮੰਦ ਭਾਰ ਰੱਖੋ; ਸਿਗਰਟ ਅਤੇ ਸ਼ਰਾਬ ਬੰਦ ਕਰੋ (ਦੋਵੇਂ)।'],
        ['Come on day ' + B + ' of your periods for the scan. Take medicines and injections exactly on time.', 'ਸਕੈਨ ਲਈ ਮਾਹਵਾਰੀ ਦੇ ' + B + ' ਦਿਨ ਆਓ। ਦਵਾਈਆਂ ਅਤੇ ਟੀਕੇ ਬਿਲਕੁਲ ਸਮੇਂ ਸਿਰ ਲਓ।']]),
      S('4. After IUI / during the waiting time', '4. IUI ਤੋਂ ਬਾਅਦ / ਉਡੀਕ ਦੌਰਾਨ', [
        ['Normal daily activity is fine; no need for bed rest. Continue the prescribed support medicines.', 'ਆਮ ਰੋਜ਼ਾਨਾ ਕੰਮ ਠੀਕ ਹਨ; ਬਿਸਤਰੇ \'ਤੇ ਆਰਾਮ ਦੀ ਲੋੜ ਨਹੀਂ। ਲਿਖੀਆਂ ਦਵਾਈਆਂ ਜਾਰੀ ਰੱਖੋ।'],
        ['Do a pregnancy test (urine or blood) on: ' + B + '. If periods come, inform us to plan the next cycle.', 'ਗਰਭ ਦਾ ਟੈਸਟ (ਪਿਸ਼ਾਬ ਜਾਂ ਖ਼ੂਨ) ਇਸ ਤਾਰੀਖ਼ ਨੂੰ ਕਰੋ: ' + B + '। ਮਾਹਵਾਰੀ ਆ ਜਾਵੇ ਤਾਂ ਅਗਲੇ ਚੱਕਰ ਲਈ ਦੱਸੋ।']])],
      urgent: ['COME IMMEDIATELY if there is severe abdominal pain or swelling, vomiting, breathlessness, fainting, or heavy bleeding.', 'ਤੁਰੰਤ ਆਓ ਜੇ ਪੇਟ ਵਿੱਚ ਤੇਜ਼ ਦਰਦ ਜਾਂ ਫੁੱਲਣਾ, ਉਲਟੀਆਂ, ਸਾਹ ਚੜ੍ਹਨਾ, ਬੇਹੋਸ਼ੀ ਜਾਂ ਜ਼ਿਆਦਾ ਖ਼ੂਨ ਹੋਵੇ।'] },

    { id: 'pcos', dept: 'obg', extra: 'obg', title: ['PCOS (Polycystic Ovary Syndrome) — Patient Instructions', 'PCOS (ਅੰਡੇਦਾਨੀ ਵਿੱਚ ਗੰਢਾਂ) — ਮਰੀਜ਼ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. What is PCOS?', '1. PCOS ਕੀ ਹੈ?', [
        ['A common hormone imbalance causing irregular periods, acne, extra hair growth, weight gain and difficulty in conceiving.', 'ਆਮ ਹਾਰਮੋਨ ਦੀ ਗੜਬੜ ਜਿਸ ਨਾਲ ਮਾਹਵਾਰੀ ਬੇਨਿਯਮੀ, ਕਿੱਲ-ਮੁਹਾਸੇ, ਵਾਧੂ ਵਾਲ, ਭਾਰ ਵਧਣਾ ਅਤੇ ਗਰਭ ਧਾਰਨ ਵਿੱਚ ਮੁਸ਼ਕਲ ਹੁੰਦੀ ਹੈ।'],
        ['It can be well controlled with lifestyle changes and treatment.', 'ਜੀਵਨ-ਸ਼ੈਲੀ ਵਿੱਚ ਬਦਲਾਅ ਅਤੇ ਇਲਾਜ ਨਾਲ ਇਹ ਚੰਗੀ ਤਰ੍ਹਾਂ ਕਾਬੂ ਹੋ ਸਕਦਾ ਹੈ।']]),
      S('2. Tests', '2. ਟੈਸਟ', [
        ['Ultrasound of ovaries; hormone tests (LH, FSH, testosterone, TSH, prolactin) on day 2–3 of periods', 'ਅੰਡੇਦਾਨੀਆਂ ਦਾ ਅਲਟਰਾਸਾਊਂਡ; ਮਾਹਵਾਰੀ ਦੇ ਦੂਜੇ-ਤੀਜੇ ਦਿਨ ਹਾਰਮੋਨ ਟੈਸਟ (LH, FSH, ਟੈਸਟੋਸਟੀਰੋਨ, TSH, ਪ੍ਰੋਲੈਕਟਿਨ)'],
        ['Blood sugar / OGTT, HbA1c, lipid profile; weight, BMI and waist measurement', 'ਬਲੱਡ ਸ਼ੂਗਰ / OGTT, HbA1c, ਲਿਪਿਡ ਪ੍ਰੋਫਾਈਲ; ਭਾਰ, BMI ਅਤੇ ਕਮਰ ਦਾ ਮਾਪ']]),
      S('3. Lifestyle — the most important treatment', '3. ਜੀਵਨ-ਸ਼ੈਲੀ — ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ ਇਲਾਜ', [
        ['Losing even 5–10% of body weight can bring periods back to normal.', 'ਸਰੀਰ ਦਾ ਸਿਰਫ਼ 5–10% ਭਾਰ ਘਟਾਉਣ ਨਾਲ ਵੀ ਮਾਹਵਾਰੀ ਠੀਕ ਹੋ ਸਕਦੀ ਹੈ।'],
        ['Exercise at least 30 minutes, 5 days a week (brisk walk, cycling, yoga).', 'ਹਫ਼ਤੇ ਵਿੱਚ 5 ਦਿਨ ਘੱਟੋ-ਘੱਟ 30 ਮਿੰਟ ਕਸਰਤ ਕਰੋ (ਤੇਜ਼ ਤੁਰਨਾ, ਸਾਈਕਲ, ਯੋਗਾ)।'],
        ['Eat more vegetables, salads, dals and whole grains; cut sugar, sweets, cold drinks, fried and bakery food.', 'ਸਬਜ਼ੀਆਂ, ਸਲਾਦ, ਦਾਲਾਂ ਅਤੇ ਸਾਬਤ ਅਨਾਜ ਵੱਧ ਖਾਓ; ਖੰਡ, ਮਿਠਾਈਆਂ, ਕੋਲਡ ਡਰਿੰਕ, ਤਲਿਆ ਅਤੇ ਬੇਕਰੀ ਵਾਲਾ ਭੋਜਨ ਘਟਾਓ।'],
        ['Sleep 7–8 hours and manage stress.', '7–8 ਘੰਟੇ ਸੌਂਵੋ ਅਤੇ ਤਣਾਅ ਘਟਾਓ।']]),
      S('4. Medicines and follow-up', '4. ਦਵਾਈਆਂ ਅਤੇ ਚੈੱਕਅੱਪ', [
        ['Take medicines exactly as prescribed (to regulate periods, control sugar, or help ovulation if planning pregnancy).', 'ਦਵਾਈਆਂ ਬਿਲਕੁਲ ਲਿਖੇ ਅਨੁਸਾਰ ਲਓ (ਮਾਹਵਾਰੀ ਨਿਯਮਤ ਕਰਨ, ਸ਼ੂਗਰ ਕਾਬੂ ਕਰਨ ਜਾਂ ਗਰਭ ਲਈ ਅੰਡਾ ਬਣਾਉਣ ਲਈ)।'],
        ['Keep a period calendar and bring it to every visit. Next visit: ' + B, 'ਮਾਹਵਾਰੀ ਦਾ ਕੈਲੰਡਰ ਰੱਖੋ ਅਤੇ ਹਰ ਵਾਰ ਨਾਲ ਲਿਆਓ। ਅਗਲੀ ਵਾਰੀ: ' + B]])],
      urgent: ['SEE THE DOCTOR SOON if periods do not come for 3 months, bleeding is very heavy or prolonged, or you have severe abdominal pain.', 'ਜਲਦੀ ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਓ ਜੇ 3 ਮਹੀਨੇ ਮਾਹਵਾਰੀ ਨਾ ਆਵੇ, ਖ਼ੂਨ ਬਹੁਤ ਜ਼ਿਆਦਾ ਜਾਂ ਲੰਬਾ ਸਮਾਂ ਆਵੇ, ਜਾਂ ਪੇਟ ਵਿੱਚ ਤੇਜ਼ ਦਰਦ ਹੋਵੇ।'] },

    { id: 'mtp', dept: 'obg', extra: 'obg', title: ['MTP (Medical Termination of Pregnancy) — Patient Instructions', 'MTP (ਗਰਭਪਾਤ) — ਮਰੀਜ਼ ਲਈ ਹਦਾਇਤਾਂ'], sections: [
      S('1. Tests before MTP', '1. MTP ਤੋਂ ਪਹਿਲਾਂ ਟੈਸਟ', [
        ['Urine pregnancy test and ultrasound to confirm the pregnancy is in the womb and how many weeks it is', 'ਪਿਸ਼ਾਬ ਨਾਲ ਗਰਭ ਦਾ ਟੈਸਟ ਅਤੇ ਅਲਟਰਾਸਾਊਂਡ — ਪੱਕਾ ਕਰਨ ਲਈ ਕਿ ਗਰਭ ਬੱਚੇਦਾਨੀ ਵਿੱਚ ਹੈ ਅਤੇ ਕਿੰਨੇ ਹਫ਼ਤਿਆਂ ਦਾ ਹੈ'],
        ['Haemoglobin and blood group with Rh (Rh-negative mothers need an anti-D injection)', 'ਹੀਮੋਗਲੋਬਿਨ ਅਤੇ ਬਲੱਡ ਗਰੁੱਪ ਤੇ Rh (Rh-ਨੈਗੇਟਿਵ ਮਾਵਾਂ ਨੂੰ ਐਂਟੀ-D ਟੀਕਾ ਲੱਗਦਾ ਹੈ)']]),
      S('2. What happens', '2. ਕੀ ਹੁੰਦਾ ਹੈ', [
        ['Medical method (early pregnancy): tablets are taken as prescribed; bleeding and cramps start within hours and the pregnancy passes like a heavy period.', 'ਦਵਾਈ ਵਾਲਾ ਤਰੀਕਾ (ਸ਼ੁਰੂਆਤੀ ਗਰਭ): ਗੋਲੀਆਂ ਲਿਖੇ ਅਨੁਸਾਰ ਲਈਆਂ ਜਾਂਦੀਆਂ ਹਨ; ਕੁਝ ਘੰਟਿਆਂ ਵਿੱਚ ਖ਼ੂਨ ਅਤੇ ਮਰੋੜ ਸ਼ੁਰੂ ਹੁੰਦੇ ਹਨ ਅਤੇ ਭਾਰੀ ਮਾਹਵਾਰੀ ਵਾਂਗ ਗਰਭ ਨਿਕਲ ਜਾਂਦਾ ਹੈ।'],
        ['Surgical method: under anaesthesia the pregnancy is removed by gentle suction in about 10–15 minutes; you go home the same day.', 'ਆਪ੍ਰੇਸ਼ਨ ਵਾਲਾ ਤਰੀਕਾ: ਬੇਹੋਸ਼ੀ ਵਿੱਚ ਹਲਕੀ ਸਕਸ਼ਨ ਨਾਲ 10–15 ਮਿੰਟ ਵਿੱਚ ਗਰਭ ਕੱਢਿਆ ਜਾਂਦਾ ਹੈ; ਉਸੇ ਦਿਨ ਘਰ ਜਾ ਸਕਦੇ ਹੋ।'],
        ['Your information is kept confidential as per law.', 'ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਕਾਨੂੰਨ ਅਨੁਸਾਰ ਗੁਪਤ ਰੱਖੀ ਜਾਂਦੀ ਹੈ।']]),
      S('3. Before the procedure', '3. ਪ੍ਰਕਿਰਿਆ ਤੋਂ ਪਹਿਲਾਂ', [
        ['For the surgical method: nothing to eat or drink for 6 hours; come with an attendant.', 'ਆਪ੍ਰੇਸ਼ਨ ਵਾਲੇ ਤਰੀਕੇ ਲਈ: 6 ਘੰਟੇ ਕੁਝ ਨਾ ਖਾਓ-ਪੀਓ; ਸਾਥੀ ਨਾਲ ਆਓ।'],
        ['Take tablets only as prescribed by the doctor and at the times written.', 'ਗੋਲੀਆਂ ਸਿਰਫ਼ ਡਾਕਟਰ ਦੇ ਲਿਖੇ ਅਨੁਸਾਰ ਅਤੇ ਲਿਖੇ ਸਮੇਂ \'ਤੇ ਲਓ।']]),
      S('4. After the procedure', '4. ਪ੍ਰਕਿਰਿਆ ਤੋਂ ਬਾਅਦ', [
        ['Bleeding like a period can continue for up to 2 weeks. Use pads, not tampons. Take pain medicine as prescribed.', 'ਮਾਹਵਾਰੀ ਵਰਗਾ ਖ਼ੂਨ 2 ਹਫ਼ਤੇ ਤੱਕ ਆ ਸਕਦਾ ਹੈ। ਪੈਡ ਵਰਤੋ, ਟੈਂਪੋਨ ਨਹੀਂ। ਦਰਦ ਦੀ ਦਵਾਈ ਲਿਖੇ ਅਨੁਸਾਰ ਲਓ।'],
        ['No intercourse for 2 weeks. You can become pregnant again soon — start contraception as advised.', '2 ਹਫ਼ਤੇ ਸੰਬੰਧ ਨਾ ਬਣਾਓ। ਜਲਦੀ ਦੁਬਾਰਾ ਗਰਭ ਠਹਿਰ ਸਕਦਾ ਹੈ — ਸਲਾਹ ਅਨੁਸਾਰ ਗਰਭ-ਰੋਕੂ ਤਰੀਕਾ ਸ਼ੁਰੂ ਕਰੋ।'],
        ['Follow-up with ultrasound after 2 weeks on: ' + B, '2 ਹਫ਼ਤਿਆਂ ਬਾਅਦ ਅਲਟਰਾਸਾਊਂਡ ਨਾਲ ਚੈੱਕਅੱਪ: ' + B]])],
      urgent: ['COME IMMEDIATELY if bleeding soaks 2 pads an hour for 2 hours, there is fever, foul-smelling discharge, severe pain, or fainting.', 'ਤੁਰੰਤ ਆਓ ਜੇ 2 ਘੰਟੇ ਲਗਾਤਾਰ ਹਰ ਘੰਟੇ 2 ਪੈਡ ਭਰ ਜਾਣ, ਬੁਖ਼ਾਰ, ਬਦਬੂਦਾਰ ਪਾਣੀ, ਤੇਜ਼ ਦਰਦ ਜਾਂ ਬੇਹੋਸ਼ੀ ਹੋਵੇ।'] },

    { id: 'kegel', dept: 'obg', extra: null, title: ['Kegel (Pelvic Floor) Exercises — Instructions', 'ਕੀਗਲ (ਪੇਡੂ ਦੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ) ਦੀਆਂ ਕਸਰਤਾਂ — ਹਦਾਇਤਾਂ'], sections: [
      S('1. Why do these exercises?', '1. ਇਹ ਕਸਰਤਾਂ ਕਿਉਂ?', [
        ['They strengthen the muscles that support the bladder, womb and bowel.', 'ਇਹ ਮਸਾਨੇ, ਬੱਚੇਦਾਨੀ ਅਤੇ ਅੰਤੜੀ ਨੂੰ ਸਹਾਰਾ ਦੇਣ ਵਾਲੀਆਂ ਮਾਸਪੇਸ਼ੀਆਂ ਨੂੰ ਮਜ਼ਬੂਤ ਕਰਦੀਆਂ ਹਨ।'],
        ['Helpful in pregnancy, after delivery, for urine leakage on coughing or sneezing, and for mild prolapse.', 'ਗਰਭ ਦੌਰਾਨ, ਜਣੇਪੇ ਤੋਂ ਬਾਅਦ, ਖੰਘਣ ਜਾਂ ਛਿੱਕਣ \'ਤੇ ਪਿਸ਼ਾਬ ਨਿਕਲਣ ਅਤੇ ਹਲਕੇ ਪ੍ਰੋਲੈਪਸ ਵਿੱਚ ਮਦਦਗਾਰ।']]),
      S('2. Finding the right muscles', '2. ਸਹੀ ਮਾਸਪੇਸ਼ੀਆਂ ਲੱਭੋ', [
        ['Imagine stopping urine midstream or holding back gas — the muscles you squeeze are the pelvic floor. (Do not practise while passing urine.)', 'ਸੋਚੋ ਕਿ ਪਿਸ਼ਾਬ ਵਿਚਕਾਰ ਰੋਕ ਰਹੇ ਹੋ ਜਾਂ ਹਵਾ ਰੋਕ ਰਹੇ ਹੋ — ਜੋ ਮਾਸਪੇਸ਼ੀਆਂ ਘੁੱਟਦੇ ਹੋ ਉਹੀ ਪੇਡੂ ਦੀਆਂ ਹਨ। (ਪਿਸ਼ਾਬ ਕਰਦੇ ਸਮੇਂ ਅਭਿਆਸ ਨਾ ਕਰੋ।)'],
        ['Keep tummy, thighs and buttocks relaxed; breathe normally.', 'ਪੇਟ, ਪੱਟਾਂ ਅਤੇ ਚਿੱਤੜਾਂ ਨੂੰ ਢਿੱਲਾ ਰੱਖੋ; ਆਮ ਵਾਂਗ ਸਾਹ ਲਓ।']]),
      S('3. How to do them', '3. ਕਿਵੇਂ ਕਰੀਏ', [
        ['Empty your bladder. Sit or lie comfortably.', 'ਪਹਿਲਾਂ ਪਿਸ਼ਾਬ ਕਰ ਲਓ। ਆਰਾਮ ਨਾਲ ਬੈਠੋ ਜਾਂ ਲੇਟੋ।'],
        ['Squeeze and lift the muscles, hold for 3–5 seconds, then relax for 3–5 seconds. Repeat 10 times.', 'ਮਾਸਪੇਸ਼ੀਆਂ ਘੁੱਟ ਕੇ ਉੱਪਰ ਖਿੱਚੋ, 3–5 ਸਕਿੰਟ ਰੋਕੋ, ਫਿਰ 3–5 ਸਕਿੰਟ ਢਿੱਲਾ ਛੱਡੋ। 10 ਵਾਰ ਦੁਹਰਾਓ।'],
        ['Then do 10 quick squeezes (1 second each).', 'ਫਿਰ 10 ਤੇਜ਼ ਘੁੱਟ (ਹਰ ਇੱਕ 1 ਸਕਿੰਟ) ਕਰੋ।'],
        ['Do this 3 times a day. Slowly build up to holding for 10 seconds.', 'ਦਿਨ ਵਿੱਚ 3 ਵਾਰ ਕਰੋ। ਹੌਲੀ-ਹੌਲੀ 10 ਸਕਿੰਟ ਤੱਕ ਰੋਕਣਾ ਸਿੱਖੋ।']]),
      S('4. Tips', '4. ਸੁਝਾਅ', [
        ['Results take 6–12 weeks — keep going daily, and continue for life to keep the benefit.', 'ਨਤੀਜੇ 6–12 ਹਫ਼ਤਿਆਂ ਵਿੱਚ ਆਉਂਦੇ ਹਨ — ਰੋਜ਼ ਕਰਦੇ ਰਹੋ, ਅਤੇ ਫ਼ਾਇਦਾ ਬਣਾਈ ਰੱਖਣ ਲਈ ਹਮੇਸ਼ਾ ਜਾਰੀ ਰੱਖੋ।'],
        ['Squeeze before you cough, sneeze or lift. Avoid constipation and lifting heavy weights.', 'ਖੰਘਣ, ਛਿੱਕਣ ਜਾਂ ਭਾਰ ਚੁੱਕਣ ਤੋਂ ਪਹਿਲਾਂ ਘੁੱਟੋ। ਕਬਜ਼ ਅਤੇ ਭਾਰੀ ਭਾਰ ਚੁੱਕਣ ਤੋਂ ਬਚੋ।']])],
      urgent: ['SEE THE DOCTOR if leakage does not improve after 3 months, or you feel a lump or heaviness in the vagina.', 'ਡਾਕਟਰ ਨੂੰ ਦਿਖਾਓ ਜੇ 3 ਮਹੀਨਿਆਂ ਬਾਅਦ ਵੀ ਪਿਸ਼ਾਬ ਨਿਕਲਣਾ ਨਾ ਸੁਧਰੇ, ਜਾਂ ਯੋਨੀ ਵਿੱਚ ਗੰਢ ਜਾਂ ਭਾਰੀਪਣ ਮਹਿਸੂਸ ਹੋਵੇ।'] }
  ];
})();
