// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const DOCTORS = {ophtho:['Dr. Varun Baweja'],psych:['Dr. Tarun Baweja'],skin:['Dr. Pooja Baweja'],obg:['Dr. Geeta Baweja','Dr. Namrata Baweja']};
const DOCTOR_PROFILES = {
  'Dr. Varun Baweja':   {name:'Dr. Varun Baweja',   degrees:'MS (Ophthalmology), DNB',  dept:'Ophthalmology',  reg:'PMC-12345', centre:'CHD & RPR', color:'#1A3C6E'},
  'Dr. Tarun Baweja':   {name:'Dr. Tarun Baweja',   degrees:'MD (Psychiatry), DPM',     dept:'Neuropsychiatry',reg:'PMC-12346', centre:'CHD & RPR', color:'#FF9500'},
  'Dr. Geeta Baweja':   {name:'Dr. Geeta Baweja',   degrees:'MS (OBG), FICOG',          dept:'Obstetrics & Gynaecology', reg:'PMC-12347', centre:'CHD', color:'#FF2D55'},
  'Dr. Namrata Baweja': {name:'Dr. Namrata Baweja', degrees:'MS (OBG), Fellowship Fertility', dept:'OBG & Fertility', reg:'PMC-12348', centre:'RPR', color:'#AF52DE'},
  'Dr. Pooja Baweja':   {name:'Dr. Pooja Baweja',   degrees:'MD (Dermatology), FRGUHS', dept:'Skin & Cosmetology', reg:'PMC-12349', centre:'CHD & RPR', color:'#5856D6'},
};

const USER_DB = {
  // ── ADMINS ───────────────────────────────────────────────
  'drvarun':   { pw:'BMH@Varun25',  name:'Dr. Varun Baweja',   role:'Admin',     dept:'Ophthalmology',      centre:'BOTH', degrees:'MS (Ophthalmology), DNB, Ex Cons Cambridgeshire (UK)', canSeeAllCentres:true,  isAdmin:true  },
  'drbaweja':  { pw:'BMH@Admin25',  name:'Dr. Baweja',         role:'Admin',     dept:'Ophthalmology',      centre:'BOTH', degrees:'',                                                      canSeeAllCentres:true,  isAdmin:true  },
  // ── DOCTORS — CHD logins ────────────────────────────────
  'drtarun_chd':  { pw:'BMH@PsychCHD25', name:'Dr. Tarun Baweja',   role:'Doctor', dept:'Neuropsychiatry', centre:'CHD', degrees:'MD (Psychiatry), DPM',             canSeeAllCentres:false, isAdmin:false },
  'drgeeta':      { pw:'BMH@OBG125',     name:'Dr. Geeta Baweja',   role:'Doctor', dept:'OBG',             centre:'CHD', degrees:'MS (OBG), FICOG',                   canSeeAllCentres:false, isAdmin:false },
  'drnamrata_chd':{ pw:'BMH@OBGNameCHD', name:'Dr. Namrata Baweja', role:'Doctor', dept:'OBG',             centre:'CHD', degrees:'MS (OBG), Fellowship Fertility',    canSeeAllCentres:false, isAdmin:false },
  'drpooja_chd':  { pw:'BMH@SkinCHD25',  name:'Dr. Pooja Baweja',   role:'Doctor', dept:'Skin',            centre:'CHD', degrees:'MD (Dermatology), FRGUHS',          canSeeAllCentres:false, isAdmin:false },
  // ── DOCTORS — RPR logins (earlier logins reassigned to Ropar) ──
  'drtarun':   { pw:'BMH@Psych25',  name:'Dr. Tarun Baweja',   role:'Doctor', dept:'Neuropsychiatry', centre:'RPR', degrees:'MD (Psychiatry), DPM',             canSeeAllCentres:false, isAdmin:false },
  'drnamrata': { pw:'BMH@OBG225',   name:'Dr. Namrata Baweja', role:'Doctor', dept:'OBG',             centre:'RPR', degrees:'MS (OBG), Fellowship Fertility',    canSeeAllCentres:false, isAdmin:false },
  'drpooja':   { pw:'BMH@Skin25',   name:'Dr. Pooja Baweja',   role:'Doctor', dept:'Skin',            centre:'RPR', degrees:'MD (Dermatology), FRGUHS',          canSeeAllCentres:false, isAdmin:false },
  // ── RECEPTION ────────────────────────────────────────────
  'rec_chd':   { pw:'BMHRec@CHD25', name:'Reception CHD',      role:'Reception', dept:'Reception',          centre:'CHD',  degrees:'',                                                      canSeeAllCentres:false, isAdmin:false },
  'rec_rpr':   { pw:'BMHRec@RPR25', name:'Reception Ropar',    role:'Reception', dept:'Reception',          centre:'RPR',  degrees:'',                                                      canSeeAllCentres:false, isAdmin:false },
  // ── LAB ─────────────────────────────────────────────────
  'lab_chd':   { pw:'BMHLab@CHD25', name:'Lab Tech CHD',       role:'Lab',       dept:'Lab',                centre:'CHD',  degrees:'',                                                      canSeeAllCentres:false, isAdmin:false },
  'lab_rpr':   { pw:'BMHLab@RPR25', name:'Lab Tech Ropar',     role:'Lab',       dept:'Lab',                centre:'RPR',  degrees:'',                                                      canSeeAllCentres:false, isAdmin:false },
  // ── TPA ─────────────────────────────────────────────────
  'tpa_chd':   { pw:'BMHTPA@CHD25', name:'TPA Executive CHD',  role:'TPA',       dept:'Insurance/TPA',      centre:'CHD',  degrees:'',                                                      canSeeAllCentres:false, isAdmin:false },
  // ── OPTOMETRIST ─────────────────────────────────────────
  'optometrist': { pw:'BMHOpto@25',  name:'Optometrist RPR',     role:'Optometrist', dept:'Ophthalmology',    centre:'RPR',  degrees:'B.Optom',                                                   canSeeAllCentres:false, isAdmin:false },
  // ── OPTOMETRIST RPR ─────────────────────────────
  'opto_rpr':   { pw:'BMHOpto@RPR25', name:'Optometrist RPR',    role:'Optometrist', dept:'Ophthalmology',    centre:'RPR',  degrees:'B.Optom',                                                   canSeeAllCentres:false, isAdmin:false },
  // ── INVENTORY PER CENTRE ────────────────────────
  'inv_chd':    { pw:'BMHInv@CHD25',  name:'Inventory CHD',      role:'Inventory',   dept:'Pharmacy / Store', centre:'CHD',  degrees:'',                                                          canSeeAllCentres:false, isAdmin:false },
  'inv_rpr':    { pw:'BMHInv@RPR25',  name:'Inventory RPR',      role:'Inventory',   dept:'Pharmacy / Store', centre:'RPR',  degrees:'',                                                          canSeeAllCentres:false, isAdmin:false },
  // ── TPA RPR ─────────────────────────────────────
  'tpa_rpr':    { pw:'BMHTPA@RPR25',  name:'TPA Executive RPR',  role:'TPA',         dept:'Insurance/TPA',    centre:'RPR',  degrees:'',                                                          canSeeAllCentres:false, isAdmin:false },
  // ── DR VARUN — CENTRE-SPECIFIC LOGINS ───────────
  'drvarun_chd':{ pw:'BMH@VarunCHD25',name:'Dr. Varun Baweja',  role:'Doctor',      dept:'Ophthalmology',    centre:'CHD',  degrees:'MS (Ophthalmology), DNB',                                   canSeeAllCentres:false, isAdmin:false },
  'drvarun_rpr':{ pw:'BMH@VarunRPR25',name:'Dr. Varun Baweja',  role:'Doctor',      dept:'Ophthalmology',    centre:'RPR',  degrees:'MS (Ophthalmology), DNB',                                   canSeeAllCentres:false, isAdmin:false },
};
let CURRENT_USER = null; // set on login

/** Firebase Auth (app.js) sets window.CURRENT_USER; legacy login sets this var — keep in sync. */
window.syncLegacyCurrentUserFromFirebase = function () {
  const u = window.CURRENT_USER;
  if (!u) return;
  CURRENT_USER = {
    username: (u.email || '').split('@')[0] || u.username || 'user',
    name: u.name || u.email || 'User',
    role: u.role || 'reception',
    dept: u.dept || '',
    centre: u.centre || 'CHD',
    isAdmin: !!u.isAdmin,
    canSeeAllCentres: !!u.isAdmin || u.centre === 'BOTH',
  };
};

// Must be the same array object as firebase/patients.js (module loads after this script).
window.PATIENTS = window.PATIENTS || [];
let PATIENTS = window.PATIENTS;
// Same array as billing.js / Firestore transaction listener (GitHub Pages dashboard totals).
window.TRANSACTIONS = window.TRANSACTIONS || [];
const TRANSACTIONS = window.TRANSACTIONS;
window.PAY_REQUESTS = window.PAY_REQUESTS || [];
const PAY_REQUESTS = window.PAY_REQUESTS;
const APPOINTMENTS = [];
const CENTRE_CHARGES = {
  CHD:{
    'Consultation':800,'Follow-up':500,
    'Biometry IOL Master':1200,'OCT Macula OU':1800,'HVF Visual Fields':1500,
    'Fundus Photography':600,'Corneal Topography':1500,'Specular Microscopy':1200,
    'ERG / VEP':2500,'Pre-op Package':3500,
    'PMICS + IOL Implantation':38000,'Trabeculectomy':42000,
    'IVT Injection (Anti-VEGF)':8000,'LASIK (per eye)':45000,
    'Pterygium Excision + Graft':8000,'Nd:YAG Capsulotomy':3000,
    'Laser Peripheral Iridotomy':4000,
    'ANC Consultation':500,'LSCS (Elective)':45000,'Normal Delivery':25000,
    'Diagnostic Laparoscopy':20000,
    'Psychiatry Consultation':800,'Psychotherapy Session':1200,'ECT (per session)':8000,
    'Dermatology Consultation':800,'Chemical Peel':1500,'Microneedling':2000,
    'PRP Treatment':3500,'Botox Injection':8000,'Dermal Filler':12000,'Laser Hair Removal':5000,
    'CBC':400,'HbA1c':600,'Lipid Profile':700,'Thyroid Profile':800,'Urine Routine':200
  },
  RPR:{
    'Consultation':600,'Follow-up':400,
    'Biometry IOL Master':1000,'OCT Macula OU':1500,'HVF Visual Fields':1200,
    'Fundus Photography':500,'Corneal Topography':1200,'Specular Microscopy':1000,
    'ERG / VEP':2000,'Pre-op Package':3000,
    'PMICS + IOL Implantation':34000,'Trabeculectomy':38000,
    'IVT Injection (Anti-VEGF)':7000,'LASIK (per eye)':40000,
    'Pterygium Excision + Graft':7000,'Nd:YAG Capsulotomy':2500,
    'Laser Peripheral Iridotomy':3500,
    'ANC Consultation':400,'LSCS (Elective)':40000,'Normal Delivery':22000,
    'Diagnostic Laparoscopy':18000,
    'Psychiatry Consultation':600,'Psychotherapy Session':1000,'ECT (per session)':7000,
    'Dermatology Consultation':600,'Chemical Peel':1200,'Microneedling':1800,
    'PRP Treatment':3000,'Botox Injection':7000,'Dermal Filler':10000,'Laser Hair Removal':4500,
    'CBC':350,'HbA1c':500,'Lipid Profile':600,'Thyroid Profile':700,'Urine Routine':180
  }
};
const INVENTORY = [
  {name:'Moxifloxacin 0.5% Eye Drop (Vigamox)',barcode:'MFX-001',cat:'Eye Drops',mrp:280,stock:24,min:10,exp:'12/2026'},
  {name:'Prednisolone 1% Eye Drop (Pred Forte)',barcode:'PDN-002',cat:'Eye Drops',mrp:180,stock:3,min:10,exp:'06/2026'},
  {name:'Carboxymethylcellulose 0.5% (Refresh)',barcode:'CMC-003',cat:'Eye Drops',mrp:95,stock:18,min:8,exp:'09/2026'},
  {name:'Timolol 0.5% Eye Drop',barcode:'TIM-004',cat:'Eye Drops',mrp:65,stock:2,min:10,exp:'03/2027'},
  {name:'AcrySof SN60WF IOL +21.0D',barcode:'IOL-021',cat:'IOL',mrp:18500,stock:8,min:3,exp:'12/2028'},
  {name:'AcrySof SN60WF IOL +22.5D',barcode:'IOL-023',cat:'IOL',mrp:18500,stock:5,min:3,exp:'12/2028'},
  {name:'Disposable OT Pack (Phaco)',barcode:'OTP-001',cat:'Surgical',mrp:1200,stock:15,min:5,exp:'06/2027'},
  {name:'Bevacizumab 1.25mg (Avastin)',barcode:'BEV-001',cat:'IVT',mrp:1800,stock:4,min:3,exp:'08/2025'},
  {name:'IV Mannitol 20% 300mL',barcode:'MAN-001',cat:'IV Fluids',mrp:85,stock:20,min:10,exp:'09/2026'},
  {name:'Ringer Lactate 500mL',barcode:'RL-001',cat:'IV Fluids',mrp:45,stock:30,min:15,exp:'06/2027'},
];
const BCMAP = {};
INVENTORY.forEach(i=>{BCMAP[i.barcode]=i;BCMAP[i.name.toLowerCase().substring(0,15)]=i;});
/** Editable IOL / implant catalogue (Settings → Surgery Packs) */
let IOL_CATALOG = [
  { name:'AcrySof SN60WF +21.0 D', type:'Monofocal aspheric', mfr:'Alcon Vision', price:18500, barcode:'IOL-021' },
  { name:'AcrySof SN60WF +22.5 D', type:'Monofocal aspheric', mfr:'Alcon Vision', price:18500, barcode:'IOL-023' },
  { name:'AcrySof IQ +20.5 D', type:'Monofocal (yellow)', mfr:'Alcon Vision', price:19500, barcode:'' },
  { name:'AcrySof IQ PanOptix +21.0 D', type:'Trifocal', mfr:'Alcon Vision', price:55000, barcode:'' },
  { name:'Tecnis ZCB00 +21.0 D', type:'Monofocal', mfr:'Johnson & Johnson Vision', price:16000, barcode:'' },
  { name:'ZEISS AT TORBI 709M +21.0 D', type:'Toric', mfr:'Carl Zeiss Meditec', price:38000, barcode:'' },
  { name:'Hoya iSert 250 +21.0 D', type:'Preloaded hydrophobic', mfr:'Hoya', price:22000, barcode:'' },
];
function saveIolCatalogToStorage() {
  try { localStorage.setItem('bmh_iol_catalog', JSON.stringify(IOL_CATALOG)); } catch (e) { /* noop */ }
  if (window.FBDB) window.FBDB.ref('iolCatalog').set(IOL_CATALOG).catch(function () {});
}
function loadIolCatalogFromStorage() {
  try {
    const ls = localStorage.getItem('bmh_iol_catalog');
    if (ls) {
      const arr = JSON.parse(ls);
      if (Array.isArray(arr) && arr.length) {
        IOL_CATALOG.length = 0;
        arr.forEach(function (x) { IOL_CATALOG.push(x); });
      }
    }
  } catch (e) { /* noop */ }
  if (!window.FBDB) { renderIolCatalogList && renderIolCatalogList(); return; }
  window.FBDB.ref('iolCatalog').once('value').then(function (snap) {
    const arr = snap.val();
    if (Array.isArray(arr) && arr.length) {
      IOL_CATALOG.length = 0;
      arr.forEach(function (x) { IOL_CATALOG.push(x); });
      try { localStorage.setItem('bmh_iol_catalog', JSON.stringify(IOL_CATALOG)); } catch (e) { /* noop */ }
    }
    renderIolCatalogList && renderIolCatalogList();
  }).catch(function () { renderIolCatalogList && renderIolCatalogList(); });
}
function renderIolCatalogList() {
  const el = document.getElementById('set-iol-list');
  if (!el) return;
  el.innerHTML = '<div style="font-size:11px;color:var(--g1);margin-bottom:8px">IOLs entered here are available in OT scheduling, OT list editing, and surgery planning from reception. Default powers are available from +0.00D to +30.00D.</div>' +
    IOL_CATALOG.map(function (row, i) {
      return '<div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--g6);border-radius:8px;margin-bottom:6px;font-size:12px">' +
        '<div style="flex:1"><div style="font-weight:800">' + row.name + '</div>' +
        '<div style="font-size:10.5px;color:var(--g1)">' + (row.type || '—') + ' · ' + (row.mfr || '—') + (row.barcode ? ' · ' + row.barcode : '') + '</div></div>' +
        '<div style="text-align:right;white-space:nowrap"><div style="font-weight:900;color:var(--blue)">MRP ₹' + Number(row.price || 0).toLocaleString('en-IN') + '</div></div>' +
        '<button type="button" class="btn btn-xs btn-gray" onclick="deleteIolCatalogRow(' + i + ')">✕</button></div>';
    }).join('');
}
function deleteIolCatalogRow(i) {
  if (i < 0 || i >= IOL_CATALOG.length) return;
  if (!confirm('Remove this IOL from the catalogue?')) return;
  IOL_CATALOG.splice(i, 1);
  saveIolCatalogToStorage();
  renderIolCatalogList();
}
function addIolFromModal() {
  const name = document.getElementById('iol-add-name')?.value?.trim();
  const type = document.getElementById('iol-add-type')?.value?.trim() || 'Monofocal';
  const mfr = document.getElementById('iol-add-mfr')?.value?.trim() || '';
  const price = parseInt(document.getElementById('iol-add-price')?.value || '0', 10) || 0;
  const bc = document.getElementById('iol-add-barcode')?.value?.trim() || '';
  if (!name) { showToast('Enter lens name / power', 'w'); return; }
  IOL_CATALOG.push({ name, type, mfr, price, barcode: bc });
  if (!INVENTORY.find(function (item) { return String(item.name || '').toLowerCase() === String(name).toLowerCase(); })) {
    const invRow = { name, barcode: bc || ('IOL-' + Date.now()), cat: 'IOL', mrp: price || 0, cost: price || 0, stock: 0, min: 1, exp: '', dept: 'ophtho', vendor: mfr || '' };
    INVENTORY.push(invRow);
    BCMAP[invRow.barcode] = invRow;
    BCMAP[String(invRow.name).toLowerCase().substring(0, 15)] = invRow;
    saveInventoryStockToStorage && saveInventoryStockToStorage();
    renderStockList && renderStockList();
  }
  saveIolCatalogToStorage();
  renderIolCatalogList();
  populateOTIolOptions && populateOTIolOptions();
  closeM('m-add-iol');
  ['iol-add-name','iol-add-type','iol-add-mfr','iol-add-price','iol-add-barcode'].forEach(function (id) {
    const n = document.getElementById(id); if (n) n.value = '';
  });
  showToast('IOL added to catalogue ✓', 's');
}
function extractIolPower(name) {
  const m = String(name || '').match(/([+-]?\d+(?:\.\d+)?)\s*D\b/i);
  if (!m) return '';
  const raw = String(m[1] || '');
  const signed = raw.startsWith('+') || raw.startsWith('-') ? raw : ('+' + raw);
  return signed + 'D';
}
function normalizeOtProcedureName(name) {
  return String(name || '').replace(/\s+/g, ' ').trim();
}
function getOtProcedureOptions() {
  const fromCharges = CHARGES_DATA
    .filter(function (c) {
      const cat = String(c.cat || '').toLowerCase();
      const name = String(c.name || '').toLowerCase();
      return /sx|surgery|procedure|laser|delivery|lap|operation/.test(cat) || /trabeculectomy|lasik|pmics|iol|capsulotomy|iridotomy|excision|lscs|delivery|laparoscopy|hysteroscopy|chemical peel|prp|dcr|ptosis|squint|vitrectomy|injection|procedure/.test(name);
    })
    .map(function (c) { return normalizeOtProcedureName(c.name); });
  const fallbacks = [
    'PMICS + IOL Implantation (OS)',
    'PMICS + IOL Implantation (OD)',
    'PMICS (Pinhole Micro Incision Cataract Surgery) + IOL (OU)',
    'Trabeculectomy',
    'Pterygium Excision + Graft',
    'DCR (Dacryocystorhinostomy)',
    'Squint Surgery',
    'LASIK',
    'Eyelid Surgery / Ptosis Repair',
    'LSCS (Elective)',
    'LSCS (Emergency)',
    'Diagnostic Laparoscopy',
    'D&C / Hysteroscopy',
    'Chemical Peel',
    'PRP Treatment',
    'Other — specify in notes'
  ];
  return Array.from(new Set(fromCharges.concat(fallbacks).filter(Boolean)));
}
function populateOTProcedureOptions(selected) {
  const sel = document.getElementById('ot-add-proc');
  if (!sel) return;
  const options = getOtProcedureOptions();
  sel.innerHTML = options.map(function (name) {
    return '<option' + (normalizeOtProcedureName(selected) === normalizeOtProcedureName(name) ? ' selected' : '') + '>' + name.replace(/</g, '&lt;') + '</option>';
  }).join('');
  if (selected && !options.some(function (name) { return normalizeOtProcedureName(name) === normalizeOtProcedureName(selected); })) {
    sel.innerHTML += '<option selected>' + String(selected).replace(/</g, '&lt;') + '</option>';
  }
}
window.OT_DIAGNOSIS_OPTIONS = window.OT_DIAGNOSIS_OPTIONS || [];
function getOtDiagnosisOptions() {
  const defaults = [
    'Cataract',
    'Cataract Right Eye',
    'Cataract Left Eye',
    'Cataract Both Eyes',
    'Posterior subcapsular cataract',
    'Nuclear sclerosis cataract',
    'Primary open-angle glaucoma',
    'Angle-closure glaucoma',
    'Pterygium',
    'Nasolacrimal duct obstruction',
    'Retinal pathology requiring procedure',
    'Uterine fibroid',
    'Ovarian cyst',
    'Need for LSCS',
    'Skin lesion for procedure'
  ];
  return Array.from(new Set([].concat(window.OT_DIAGNOSIS_OPTIONS || [], defaults).filter(Boolean)));
}
function populateOTDiagnosisOptions(selected) {
  const sel = document.getElementById('ot-add-dx');
  if (!sel) return;
  const options = getOtDiagnosisOptions();
  sel.innerHTML = ['<option value="">— Select diagnosis —</option>'].concat(options.map(function (name) {
    return '<option value="' + String(name).replace(/"/g, '&quot;') + '"' + (String(selected || '').trim() === String(name).trim() ? ' selected' : '') + '>' + String(name).replace(/</g, '&lt;') + '</option>';
  })).join('');
  if (selected && !options.some(function (name) { return String(name).trim() === String(selected).trim(); })) {
    sel.innerHTML += '<option value="' + String(selected).replace(/"/g, '&quot;') + '" selected>' + String(selected).replace(/</g, '&lt;') + '</option>';
  }
}
function loadOTDiagnosisOptions() {
  if (!window.fbOnce) return;
  fbOnce('settings/otDiagnoses').then(function (data) {
    if (Array.isArray(data) && data.length) {
      window.OT_DIAGNOSIS_OPTIONS = data.filter(Boolean);
      populateOTDiagnosisOptions(document.getElementById('ot-add-dx')?.value || '');
    }
  }).catch(function () {});
}
function addOTDiagnosisOption() {
  const val = window.prompt('Enter a pre-operative diagnosis to reuse in OT cases:')?.trim();
  if (!val) return;
  if (!(window.OT_DIAGNOSIS_OPTIONS || []).includes(val)) {
    window.OT_DIAGNOSIS_OPTIONS.push(val);
    fbSet && fbSet('settings/otDiagnoses', window.OT_DIAGNOSIS_OPTIONS);
  }
  populateOTDiagnosisOptions(val);
  showToast('OT diagnosis added ✓', 's');
}
function getOtIolChoices() {
  const catalog = (IOL_CATALOG || []).map(function (row) {
    return { name: row.name, type: row.type || 'IOL', price: Number(row.price || 0), barcode: row.barcode || '', power: extractIolPower(row.name) };
  });
  const inventoryIols = (INVENTORY || []).filter(function (item) {
    const cat = String(item.cat || '').toLowerCase();
    const nm = String(item.name || '').toLowerCase();
    return cat.includes('iol') || /\biol\b|acrysof|tecnis|panoptix|toric|trifocal/.test(nm);
  }).map(function (item) {
    return { name: item.name, type: item.cat || 'IOL', price: Number(item.mrp || 0), barcode: item.barcode || '', power: extractIolPower(item.name) };
  });
  const seen = {};
  return catalog.concat(inventoryIols).filter(function (row) {
    const key = String(row.name || '').toLowerCase();
    if (!key || seen[key]) return false;
    seen[key] = true;
    return true;
  });
}
function populateOTIolOptions(selectedName, selectedPower) {
  const modelSel = document.getElementById('ot-add-iol-model');
  const powerSel = document.getElementById('ot-add-iol-power');
  if (!modelSel || !powerSel) return;
  const choices = getOtIolChoices();
  modelSel.innerHTML = ['<option value="">— Select IOL / implant —</option>'].concat(choices.map(function (row) {
    const meta = [row.type, row.price ? ('₹' + Number(row.price).toLocaleString('en-IN')) : '', row.barcode].filter(Boolean).join(' · ');
    return '<option value="' + String(row.name).replace(/"/g, '&quot;') + '"' + (selectedName === row.name ? ' selected' : '') + '>' + String(row.name).replace(/</g, '&lt;') + (meta ? ' — ' + meta.replace(/</g, '&lt;') : '') + '</option>';
  })).join('');
  const defaultPowers = [];
  for (let i = 0; i <= 300; i += 5) defaultPowers.push('+' + (i / 10).toFixed(2) + 'D');
  const powerOptions = ['— Select power —'].concat(Array.from(new Set(defaultPowers.concat(choices.map(function (row) { return row.power; }).filter(Boolean)))).sort(function (a, b) {
    return parseFloat(a) - parseFloat(b);
  }));
  powerSel.innerHTML = powerOptions.map(function (power) {
    const value = power === '— Select power —' ? '' : power;
    return '<option value="' + value + '"' + ((selectedPower || '') === value ? ' selected' : '') + '>' + power + '</option>';
  }).join('');
  syncOTIolSummary();
}
function syncOTIolSummary() {
  const model = document.getElementById('ot-add-iol-model')?.value || '';
  const power = document.getElementById('ot-add-iol-power')?.value || '';
  const input = document.getElementById('ot-add-iol');
  if (!input) return;
  if (!model) {
    input.value = '';
    return;
  }
  const hasPowerInName = extractIolPower(model);
  input.value = power && !hasPowerInName ? (model + ' ' + power) : model;
}
function openOTAddIolModal() {
  openM('m-add-iol');
}
const AUTO_BILL = [];
window.BMH_PATIENT_CHARGES = window.BMH_PATIENT_CHARGES || {};
window.BMH_VENDOR_BILLS = window.BMH_VENDOR_BILLS || [];
window.BMH_EXPENSES = window.BMH_EXPENSES || [];
window.BMH_LEDGER = window.BMH_LEDGER || [];
window.BMH_PURCHASES = window.BMH_PURCHASES || [];
window.BMH_INVENTORY_USAGE = window.BMH_INVENTORY_USAGE || [];
window.BMH_BILL_PRINT_SIZE = window.BMH_BILL_PRINT_SIZE || 'A4';
window._bmhBillDeptFilter = window._bmhBillDeptFilter || 'all';
window._bmhPO_DRAFT = window._bmhPO_DRAFT || '';

const LAB_PANELS = {
  haem:[{n:'Haemoglobin',u:'g/dL',lo:11.5,hi:17.5,v:'',id:'hb'},{n:'WBC Count',u:'×10³/μL',lo:4.5,hi:11,v:'',id:'wbc'},{n:'Platelets',u:'×10³/μL',lo:150,hi:400,v:'',id:'plt'},{n:'PCV',u:'%',lo:36,hi:52,v:'',id:'pcv'}],
  bio:[{n:'Sodium',u:'mEq/L',lo:136,hi:146,v:'',id:'na'},{n:'Potassium',u:'mEq/L',lo:3.5,hi:5.1,v:'',id:'k'},{n:'Creatinine',u:'mg/dL',lo:0.6,hi:1.3,v:'',id:'cr'},{n:'SGPT/ALT',u:'U/L',lo:7,hi:56,v:'',id:'alt'}],
  diab:[{n:'Fasting Blood Sugar',u:'mg/dL',lo:70,hi:100,v:'142',id:'fbs'},{n:'HbA1c',u:'%',lo:4.0,hi:5.6,v:'8.2',id:'hba1c'},{n:'PP Blood Sugar',u:'mg/dL',lo:70,hi:140,v:'',id:'ppbs'}],
  thyroid:[{n:'TSH',u:'mIU/L',lo:0.4,hi:4.0,v:'',id:'tsh'},{n:'Free T4',u:'ng/dL',lo:0.8,hi:1.8,v:'',id:'ft4'}]
};
const IPD_PATIENTS = [];
window.IPD_PATIENTS = IPD_PATIENTS; // expose globally
window.XREF_LOG = window.XREF_LOG || [];
let activeIPDPatient = null;
const ALL_DOCS = [
  {id:'case-sheet',name:'Initial Case Sheet',icon:'📋',dept:'all'},
  {id:'biometry',name:'Biometry Form',icon:'📐',dept:'ophtho'},
  {id:'consent-cataract',name:'Cataract Consent (Bilingual)',icon:'📝',dept:'ophtho'},
  {id:'consent-ivt',name:'IVT Injection Consent (Bilingual)',icon:'📝',dept:'ophtho'},
  {id:'consent-lasik',name:'LASIK Consent (Bilingual)',icon:'📝',dept:'ophtho'},
  {id:'consent-anaes',name:'Anaesthesia Consent (Bilingual)',icon:'📝',dept:'all'},
  {id:'preop-checklist',name:'Pre-operative Checklist',icon:'✅',dept:'ophtho'},
  {id:'op-checklist',name:'Operative Checklist',icon:'🔲',dept:'ophtho'},
  {id:'op-notes',name:'Operative Notes',icon:'📄',dept:'ophtho'},
  {id:'postop-checklist',name:'Post-operative Checklist',icon:'✔️',dept:'ophtho'},
  {id:'discharge',name:'Discharge Card',icon:'🏠',dept:'all'},
  {id:'rx',name:'Prescription',icon:'℞',dept:'all'},
  {id:'lab-request',name:'Lab Request Form',icon:'🧪',dept:'all'},
];
const TEMPLATES = [
  {id:'cataract',name:'Cataract Surgery Pack',icon:'👁️',dept:'ophtho',docs:['case-sheet','biometry','consent-cataract','consent-anaes','preop-checklist','op-checklist','op-notes','postop-checklist','discharge']},
  {id:'glaucoma',name:'Glaucoma Surgery Pack',icon:'👁️',dept:'ophtho',docs:['case-sheet','consent-cataract','preop-checklist','op-checklist','op-notes','postop-checklist','discharge']},
  {id:'ivt',name:'IVT Injection Pack',icon:'💉',dept:'ophtho',docs:['case-sheet','consent-ivt','rx']},
  {id:'lasik',name:'LASIK Pack',icon:'✨',dept:'ophtho',docs:['case-sheet','biometry','consent-lasik','preop-checklist','op-notes','discharge']},
  {id:'opd',name:'OPD Visit Pack',icon:'🩺',dept:'all',docs:['case-sheet','rx']},
];

const CONSENT_DATA = {
  cataract: {
    title: 'CONSENT FOR CATARACT SURGERY (PHACOEMULSIFICATION + IOL)',
    paras: [
      {en:"I, the undersigned, hereby voluntarily consent to undergo cataract surgery (PMICS (Pinhole Micro Incision Cataract Surgery) with Intraocular Lens implantation) as advised by Dr. Varun Baweja, Baweja Multispeciality Hospital.",
       pa:"ਮੈਂ, ਹੇਠਾਂ ਦਸਤਖਤ ਕਰਨ ਵਾਲਾ/ਵਾਲੀ, ਡਾ. ਵਰੁਣ ਬਾਵੇਜਾ, ਬਾਵੇਜਾ ਮਲਟੀਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਦੀ ਸਲਾਹ 'ਤੇ ਮੋਤੀਆਬਿੰਦ ਦੇ ਓਪਰੇਸ਼ਨ (ਫੈਕੋਇਮਲਸੀਫਿਕੇਸ਼ਨ ਅਤੇ ਨਕਲੀ ਲੈਂਸ ਇਮਪਲਾਂਟੇਸ਼ਨ) ਲਈ ਆਪਣੀ ਮਰਜ਼ੀ ਨਾਲ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",
       hi:"मैं, नीचे हस्ताक्षरकर्ता, डॉ. वरुण बावेजा, बावेजा मल्टीस्पेशिएलिटी हॉस्पिटल की सलाह पर मोतियाबिंद की सर्जरी के लिए स्वेच्छा से सहमति देता/देती हूँ।"},
      {en:"I understand that cataract surgery involves removal of the clouded natural lens of my eye and replacement with an artificial intraocular lens (IOL). The procedure will be performed under local anaesthesia (eye drops / injection around the eye).",
       pa:"ਮੈਨੂੰ ਸਮਝਾਇਆ ਗਿਆ ਹੈ ਕਿ ਮੋਤੀਆਬਿੰਦ ਦੇ ਓਪਰੇਸ਼ਨ ਵਿੱਚ ਅੱਖ ਦੀ ਧੁੰਦਲੀ ਕੁਦਰਤੀ ਲੈਂਸ ਕੱਢ ਕੇ ਨਕਲੀ ਲੈਂਸ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ। ਓਪਰੇਸ਼ਨ ਸਥਾਨਕ ਅਨੱਸਥੀਸੀਆ ਨਾਲ ਕੀਤਾ ਜਾਵੇਗਾ।",
       hi:"मुझे बताया गया है कि मोतियाबिंद सर्जरी में आँख के धुंधले प्राकृतिक लेंस को हटाकर कृत्रिम अंतः-नेत्र लेंस लगाया जाता है। सर्जरी स्थानीय एनेस्थीसिया के तहत की जाएगी।"},
      {en:"I have been informed of the risks including but not limited to: infection (endophthalmitis), bleeding, retinal detachment, raised intraocular pressure, posterior capsule rupture, corneal oedema, and the rare possibility of loss of vision.",
       pa:"ਮੈਨੂੰ ਸੰਭਾਵਿਤ ਖਤਰਿਆਂ ਬਾਰੇ ਦੱਸਿਆ ਗਿਆ ਹੈ: ਇਨਫੈਕਸ਼ਨ, ਖੂਨ ਵਗਣਾ, ਰੈਟਿਨਾ ਦਾ ਵੱਖ ਹੋਣਾ, ਅੱਖ ਦਾ ਦਬਾਅ ਵਧਣਾ, ਅਤੇ ਦੁਰਲੱਭ ਮਾਮਲਿਆਂ ਵਿੱਚ ਨਜ਼ਰ ਖੁੱਸਣ ਦੀ ਸੰਭਾਵਨਾ।",
       hi:"मुझे जोखिमों के बारे में बताया गया है जिनमें शामिल हैं: संक्रमण, रक्तस्राव, रेटिनल डिटेचमेंट, आँख का दबाव बढ़ना, और दुर्लभ मामलों में दृष्टि की हानि।"},
      {en:"I understand that there is no guarantee of perfect vision after surgery. Final visual outcome depends on the health of the retina, optic nerve, and other factors beyond the surgeon's control.",
       pa:"ਮੈਨੂੰ ਪਤਾ ਹੈ ਕਿ ਓਪਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ ਸੰਪੂਰਨ ਨਜ਼ਰ ਦੀ ਗਾਰੰਟੀ ਨਹੀਂ ਦਿੱਤੀ ਜਾ ਸਕਦੀ। ਨਤੀਜਾ ਰੈਟਿਨਾ ਅਤੇ ਆਪਟਿਕ ਨਰਵ ਦੀ ਸਿਹਤ 'ਤੇ ਨਿਰਭਰ ਕਰਦਾ ਹੈ।",
       hi:"मुझे पता है कि ऑपरेशन के बाद आदर्श दृष्टि की गारंटी नहीं दी जा सकती। परिणाम रेटिना और ऑप्टिक तंत्रिका की स्वास्थ्य स्थिति पर निर्भर करता है।"},
      {en:"I consent to receiving blood transfusion or other measures if necessary for my wellbeing during the procedure. I agree to follow all post-operative instructions given by the doctor.",
       pa:"ਮੈਂ ਲੋੜ ਪੈਣ 'ਤੇ ਖੂਨ ਚੜ੍ਹਾਉਣ ਜਾਂ ਹੋਰ ਜ਼ਰੂਰੀ ਇਲਾਜ ਲਈ ਸਹਿਮਤ ਹਾਂ। ਮੈਂ ਡਾਕਟਰ ਦੀਆਂ ਸਾਰੀਆਂ ਹਦਾਇਤਾਂ ਮੰਨਾਂਗਾ/ਮੰਨਾਂਗੀ।",
       hi:"मैं आवश्यकतानुसार रक्त आधान या अन्य आवश्यक उपचार के लिए सहमत हूँ। मैं डॉक्टर के सभी निर्देशों का पालन करूँगा/करूँगी।"},
    ]
  },
  ivt: {
    title: 'CONSENT FOR INTRAVITREAL INJECTION (IVT)',
    paras: [
      {en:"I consent to receive an intravitreal injection (injection directly into the eye) as advised by Dr. Varun Baweja for the treatment of my retinal condition.",
       pa:"ਮੈਂ ਡਾ. ਵਰੁਣ ਬਾਵੇਜਾ ਦੀ ਸਲਾਹ 'ਤੇ ਅੱਖ ਦੇ ਅੰਦਰ ਸੂਈ (ਇੰਟਰਾਵਿਟਰੀਅਲ ਇੰਜੈਕਸ਼ਨ) ਲਗਾਉਣ ਲਈ ਸਹਿਮਤ ਹਾਂ।",
       hi:"मैं डॉ. वरुण बावेजा की सलाह पर रेटिनल स्थिति के इलाज के लिए आँख के अंदर इंजेक्शन (इंट्राविट्रियल इंजेक्शन) के लिए सहमत हूँ।"},
      {en:"I understand the risks include infection, raised eye pressure, retinal detachment, cataract, bleeding, and extremely rarely, loss of vision.",
       pa:"ਮੈਨੂੰ ਪਤਾ ਹੈ ਕਿ ਸੂਈ ਨਾਲ ਇਨਫੈਕਸ਼ਨ, ਦਬਾਅ ਵਧਣਾ, ਰੈਟਿਨਾ ਦਾ ਵੱਖ ਹੋਣਾ ਅਤੇ ਦੁਰਲੱਭ ਮਾਮਲਿਆਂ ਵਿੱਚ ਨਜ਼ਰ ਖੁੱਸ ਸਕਦੀ ਹੈ।",
       hi:"मुझे पता है कि इंजेक्शन से संक्रमण, दबाव वृद्धि, रेटिनल डिटेचमेंट और दुर्लभ मामलों में दृष्टि हानि हो सकती है।"},
      {en:"I understand that multiple injections may be required over several months to achieve the best outcome. The injection will be given under sterile conditions and local anaesthetic eye drops.",
       pa:"ਮੈਨੂੰ ਪਤਾ ਹੈ ਕਿ ਕਈ ਮਹੀਨਿਆਂ ਤੱਕ ਕਈ ਵਾਰ ਸੂਈ ਲਾਉਣੀ ਪੈ ਸਕਦੀ ਹੈ। ਸੂਈ ਸਾਫ਼-ਸੁਥਰੇ ਮਾਹੌਲ ਵਿੱਚ ਲੱਗੇਗੀ।",
       hi:"मुझे पता है कि कई महीनों तक कई बार इंजेक्शन लग सकते हैं। इंजेक्शन बाँझ परिस्थितियों में दिया जाएगा।"},
    ]
  },

  /* ─── OBG ─── */
  'obg-lscs': { title:'Consent for Lower Segment Caesarean Section (LSCS)', paras:[
    {en:"I consent to Caesarean Section (LSCS) as explained to me by my doctor. I understand it is a major abdominal surgery performed under spinal or general anaesthesia.", pa:"ਮੈਂ ਆਪਣੇ ਡਾਕਟਰ ਵੱਲੋਂ ਸਮਝਾਏ ਅਨੁਸਾਰ ਸੀਜ਼ੇਰੀਅਨ ਆਪ੍ਰੇਸ਼ਨ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",hi:"मैं अपने डॉक्टर द्वारा समझाए गए सीज़ेरियन ऑपरेशन के लिए सहमति देता/देती हूँ।"},
    {en:"I have been informed of risks including haemorrhage, infection, injury to bladder/ureter, need for blood transfusion, and in rare cases hysterectomy.", pa:"ਮੈਨੂੰ ਖੂਨ ਵਹਿਣਾ, ਇਨਫੈਕਸ਼ਨ, ਮਸਾਨੇ/ਯੂਰੇਟਰ ਸੱਟ, ਖੂਨ ਚੜ੍ਹਾਉਣ ਅਤੇ ਬੱਚੇਦਾਨੀ ਕੱਢਣ ਦੇ ਜੋਖਮਾਂ ਬਾਰੇ ਦੱਸਿਆ ਗਿਆ ਹੈ।",hi:"मुझे खून बहने, संक्रमण, मूत्राशय की चोट, खून चढ़ाने और गर्भाशय निकालने के जोखिमों के बारे में बताया गया है।"},
    {en:"I understand the baby may require neonatal intensive care depending on gestational age and condition.", pa:"ਮੈਂ ਸਮਝਦਾ/ਸਮਝਦੀ ਹਾਂ ਕਿ ਬੱਚੇ ਨੂੰ ਨਵਜਾਤ ਗਹਿਰੀ ਸੰਭਾਲ ਦੀ ਲੋੜ ਹੋ ਸਕਦੀ ਹੈ।",hi:"मैं समझता/समझती हूँ कि बच्चे को नवजात गहन देखभाल की जरूरत हो सकती है।"},
    {en:"I consent to blood transfusion or any other lifesaving measures deemed necessary during surgery.", pa:"ਮੈਂ ਆਪ੍ਰੇਸ਼ਨ ਦੌਰਾਨ ਖੂਨ ਚੜ੍ਹਾਉਣ ਜਾਂ ਕਿਸੇ ਹੋਰ ਜ਼ਰੂਰੀ ਕਦਮ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",hi:"मैं ऑपरेशन के दौरान खून चढ़ाने या किसी अन्य आवश्यक उपाय के लिए सहमति देता/देती हूँ।"},
    {en:"I have had all my questions answered satisfactorily and I give my free and informed consent for LSCS.", pa:"ਮੇਰੇ ਸਾਰੇ ਸਵਾਲਾਂ ਦੇ ਸੰਤੋਸ਼ਜਨਕ ਜਵਾਬ ਮਿਲੇ ਹਨ ਅਤੇ ਮੈਂ ਆਪਣੀ ਮਰਜ਼ੀ ਨਾਲ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",hi:"मेरे सभी सवालों के संतोषजनक जवाब मिले हैं और मैं अपनी स्वतंत्र सहमति देता/देती हूँ।"},
  ]},
  'obg-normal': { title:'Consent for Normal Vaginal Delivery', paras:[
    {en:"I understand that normal vaginal delivery is a natural process and consent to obstetric care and management during labour.", pa:"ਮੈਂ ਸਧਾਰਨ ਜਣੇਪੇ ਲਈ ਡਾਕਟਰੀ ਦੇਖਭਾਲ ਅਤੇ ਪ੍ਰਬੰਧਨ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",hi:"मैं प्रसव के दौरान प्रसूति देखभाल और प्रबंधन के लिए सहमति देता/देती हूँ।"},
    {en:"I consent to episiotomy, forceps, or vacuum application if required during delivery for the safety of mother and baby.", pa:"ਮੈਂ ਲੋੜ ਪੈਣ ਤੇ ਏਪੀਸੀਓਟੋਮੀ, ਫੋਰਸੈਪਸ ਜਾਂ ਵੈਕਿਊਮ ਦੀ ਵਰਤੋਂ ਲਈ ਸਹਿਮਤ ਹਾਂ।",hi:"जरूरत पड़ने पर एपीसियोटॉमी, फोर्सेप्स या वैक्यूम के उपयोग के लिए सहमत हूँ।"},
    {en:"If complications arise necessitating emergency LSCS, I consent to conversion to caesarean section.", pa:"ਜੇ ਐਮਰਜੈਂਸੀ ਸੀਜ਼ੇਰੀਅਨ ਦੀ ਲੋੜ ਹੋਵੇ, ਮੈਂ ਉਸ ਲਈ ਵੀ ਸਹਿਮਤ ਹਾਂ।",hi:"आपात स्थिति में सिज़ेरियन के लिए भी सहमत हूँ।"},
  ]},
  'obg-mtp': { title:'Consent for Medical Termination of Pregnancy (MTP)', paras:[
    {en:"I voluntarily request termination of pregnancy as per MTP Act 1971 (amended 2021). I confirm this is my free and informed decision.", pa:"ਮੈਂ MTP ਐਕਟ ਅਧੀਨ ਆਪਣੀ ਮਰਜ਼ੀ ਨਾਲ ਗਰਭਪਾਤ ਦੀ ਬੇਨਤੀ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ।",hi:"मैं MTP अधिनियम के तहत स्वेच्छा से गर्भसमापन की अनुरोध करता/करती हूँ।"},
    {en:"I understand risks including incomplete evacuation, infection, haemorrhage, uterine perforation, and failure requiring repeat procedure.", pa:"ਮੈਨੂੰ ਅਧੂਰੇ ਖਾਲੀਕਰਨ, ਇਨਫੈਕਸ਼ਨ, ਖੂਨ ਵਹਿਣਾ, ਅਤੇ ਦੁਬਾਰਾ ਪ੍ਰਕਿਰਿਆ ਦੇ ਜੋਖਮਾਂ ਬਾਰੇ ਦੱਸਿਆ ਗਿਆ ਹੈ।",hi:"अधूरी निकासी, संक्रमण, रक्तस्राव और दोबारा प्रक्रिया के जोखिमों के बारे में जानकारी दी गई है।"},
    {en:"Confidentiality will be maintained as per MTP Act provisions.", pa:"MTP ਐਕਟ ਅਨੁਸਾਰ ਗੁਪਤਤਾ ਰੱਖੀ ਜਾਵੇਗੀ।",hi:"MTP अधिनियम के प्रावधानों के अनुसार गोपनीयता बनाए रखी जाएगी।"},
  ]},
  'obg-lap': { title:'Consent for Diagnostic Laparoscopy', paras:[
    {en:"I consent to diagnostic laparoscopy (keyhole surgery) to evaluate my abdominal/pelvic condition as recommended.", pa:"ਮੈਂ ਆਪਣੀ ਪੇਟ/ਪੇਲਵਿਕ ਸਥਿਤੀ ਦੇ ਮੁਲਾਂਕਣ ਲਈ ਲੈਪਰੋਸਕੋਪੀ ਲਈ ਸਹਿਮਤ ਹਾਂ।",hi:"पेट/पेल्विक स्थिति के मूल्यांकन के लिए लेप्रोस्कोपी के लिए सहमत हूँ।"},
    {en:"I understand that if findings necessitate, the procedure may be converted to open laparotomy.", pa:"ਜੇ ਜ਼ਰੂਰੀ ਹੋਵੇ ਤਾਂ ਖੁੱਲ੍ਹੇ ਆਪ੍ਰੇਸ਼ਨ ਵਿੱਚ ਬਦਲਿਆ ਜਾ ਸਕਦਾ ਹੈ, ਮੈਂ ਇਸ ਲਈ ਵੀ ਸਹਿਮਤ ਹਾਂ।",hi:"जरूरत पड़ने पर खुले ऑपरेशन में बदला जा सकता है, मैं उसके लिए भी सहमत हूँ।"},
  ]},
  /* ─── PSYCH ─── */
  'psych-gen': { title:'Consent for Psychiatric Evaluation & Treatment', paras:[
    {en:"I voluntarily consent to psychiatric evaluation, diagnosis, and treatment including medications, psychotherapy, and investigations.", pa:"ਮੈਂ ਮਨੋਚਿਕਿਤਸਾ ਜਾਂਚ, ਨਿਦਾਨ ਅਤੇ ਇਲਾਜ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",hi:"मनोचिकित्सा मूल्यांकन, निदान और उपचार के लिए स्वेच्छा से सहमति देता/देती हूँ।"},
    {en:"I understand that psychiatric medicines may require weeks to show effect and must not be stopped abruptly without medical advice.", pa:"ਮੈਂ ਸਮਝਦਾ/ਸਮਝਦੀ ਹਾਂ ਕਿ ਮਨੋਚਿਕਿਤਸਾ ਦਵਾਈਆਂ ਅਚਾਨਕ ਬੰਦ ਨਹੀਂ ਕਰਨੀਆਂ।",hi:"मनोचिकित्सा दवाएँ अचानक बंद नहीं करनी चाहिए, यह मैं समझता/समझती हूँ।"},
    {en:"Confidentiality of psychiatric records will be maintained except where disclosure is required by law.", pa:"ਮਾਨਸਿਕ ਸਿਹਤ ਰਿਕਾਰਡ ਗੁਪਤ ਰੱਖੇ ਜਾਣਗੇ, ਕਾਨੂੰਨੀ ਜ਼ਰੂਰਤ ਤੋਂ ਇਲਾਵਾ।",hi:"मानसिक स्वास्थ्य रिकॉर्ड गोपनीय रहेंगे, कानूनी आवश्यकता को छोड़कर।"},
    {en:"I give consent for family members / caregivers to be involved in treatment planning with my permission.", pa:"ਮੈਂ ਆਪਣੀ ਇਜਾਜ਼ਤ ਨਾਲ ਪਰਿਵਾਰ ਨੂੰ ਇਲਾਜ ਯੋਜਨਾ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰਨ ਦੀ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",hi:"अपनी अनुमति से परिवार को उपचार योजना में शामिल करने की सहमति देता/देती हूँ।"},
  ]},
  'psych-ect': { title:'Consent for Electroconvulsive Therapy (ECT)', paras:[
    {en:"I consent to Electroconvulsive Therapy (ECT) as recommended by my psychiatrist. I understand it is performed under general anaesthesia.", pa:"ਮੈਂ ਆਪਣੇ ਮਨੋਚਿਕਿਤਸਕ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ECT ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",hi:"अपने मनोचिकित्सक की सलाह पर ECT के लिए सहमति देता/देती हूँ।"},
    {en:"I have been informed that side effects may include short-term memory loss, headache, muscle ache, and confusion after sessions.", pa:"ਮੈਨੂੰ ਦੱਸਿਆ ਗਿਆ ਹੈ ਕਿ ਅਸਥਾਈ ਯਾਦਦਾਸ਼ਤ ਨੁਕਸਾਨ, ਸਿਰਦਰਦ, ਮਾਸਪੇਸ਼ੀਆਂ ਵਿੱਚ ਦਰਦ ਹੋ ਸਕਦਾ ਹੈ।",hi:"मुझे बताया गया है कि अल्पकालिक स्मृति हानि, सिरदर्द, मांसपेशी दर्द हो सकता है।"},
    {en:"I understand typically 6–12 sessions are needed. The number may be adjusted based on clinical response.", pa:"ਆਮ ਤੌਰ ਤੇ 6–12 ਸੈਸ਼ਨ ਲੋੜੀਂਦੇ ਹਨ, ਜੋ ਕਿ ਜਵਾਬ ਅਨੁਸਾਰ ਬਦਲ ਸਕਦੇ ਹਨ।",hi:"आमतौर पर 6–12 सत्रों की जरूरत होती है, जो प्रतिक्रिया के आधार पर बदल सकती है।"},
    {en:"I consent to general anaesthesia and muscle relaxants required during the procedure.", pa:"ਮੈਂ ECT ਦੌਰਾਨ ਜਨਰਲ ਅਨੈਸਥੀਸੀਆ ਅਤੇ ਮਾਸਪੇਸ਼ੀ ਢਿੱਲੀ ਕਰਨ ਵਾਲੀਆਂ ਦਵਾਈਆਂ ਲਈ ਸਹਿਮਤ ਹਾਂ।",hi:"ECT के दौरान जनरल एनेस्थीसिया और मांसपेशी शिथिलकारक के लिए सहमत हूँ।"},
  ]},
  /* ─── SKIN ─── */
  'skin-peel': { title:'Consent for Chemical Peel Procedure', paras:[
    {en:"I consent to chemical peel treatment for my skin condition as recommended. I understand it involves application of a chemical agent to exfoliate skin.", pa:"ਮੈਂ ਆਪਣੀ ਚਮੜੀ ਦੀ ਸਥਿਤੀ ਲਈ ਕੈਮੀਕਲ ਪੀਲ ਇਲਾਜ ਲਈ ਸਹਿਮਤ ਹਾਂ।",hi:"अपनी त्वचा की स्थिति के लिए केमिकल पील उपचार के लिए सहमत हूँ।"},
    {en:"I have been informed of potential side effects: redness, swelling, peeling, temporary darkening (PIH), scarring, and infection (rare).", pa:"ਮੈਨੂੰ ਲਾਲੀ, ਸੋਜ, ਛਿੱਲਣਾ, ਅਸਥਾਈ ਕਾਲਾਪਣ, ਦਾਗ ਅਤੇ ਇਨਫੈਕਸ਼ਨ ਦੇ ਜੋਖਮਾਂ ਬਾਰੇ ਦੱਸਿਆ ਗਿਆ ਹੈ।",hi:"मुझे लालिमा, सूजन, छीलना, अस्थायी कालापन, निशान और संक्रमण के जोखिमों के बारे में बताया गया है।"},
    {en:"I agree to strictly follow post-procedure instructions including sun protection for 4 weeks.", pa:"ਮੈਂ ਪ੍ਰਕਿਰਿਆ ਤੋਂ ਬਾਅਦ ਦੀਆਂ ਹਦਾਇਤਾਂ ਅਤੇ 4 ਹਫ਼ਤੇ ਧੁੱਪ ਤੋਂ ਬਚਾਅ ਦੇਣ ਦਾ ਵਾਅਦਾ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ।",hi:"पोस्ट-प्रोसीजर निर्देशों और 4 हफ्ते सूर्य सुरक्षा का पालन करने का वादा करता/करती हूँ।"},
    {en:"I understand that multiple sessions may be required and results vary based on skin type and condition.", pa:"ਮੈਂ ਸਮਝਦਾ/ਸਮਝਦੀ ਹਾਂ ਕਿ ਕਈ ਸੈਸ਼ਨ ਲੋੜੀਂਦੇ ਹੋ ਸਕਦੇ ਹਨ ਅਤੇ ਨਤੀਜੇ ਵੱਖ-ਵੱਖ ਹੋ ਸਕਦੇ ਹਨ।",hi:"मैं समझता/समझती हूँ कि कई सत्रों की जरूरत हो सकती है और परिणाम भिन्न हो सकते हैं।"},
  ]},
  'skin-laser': { title:'Consent for Laser Skin Procedure', paras:[
    {en:"I consent to laser treatment for my skin condition as indicated. I understand the laser targets specific chromophores to improve skin texture/pigmentation.", pa:"ਮੈਂ ਆਪਣੀ ਚਮੜੀ ਲਈ ਲੇਜ਼ਰ ਇਲਾਜ ਲਈ ਸਹਿਮਤ ਹਾਂ।",hi:"अपनी त्वचा के लिए लेजर उपचार के लिए सहमत हूँ।"},
    {en:"I understand risks: temporary redness, swelling, blistering, hypo/hyperpigmentation (especially in dark skin), and scarring (rare).", pa:"ਮੈਨੂੰ ਅਸਥਾਈ ਲਾਲੀ, ਸੋਜ, ਛਾਲੇ, ਰੰਗ ਬਦਲਣਾ ਅਤੇ ਦਾਗ਼ ਦੇ ਜੋਖਮਾਂ ਬਾਰੇ ਦੱਸਿਆ ਗਿਆ ਹੈ।",hi:"मुझे अस्थायी लालिमा, सूजन, छाले, रंग परिवर्तन और निशान के जोखिमों के बारे में बताया गया है।"},
    {en:"I will wear protective eyewear during the procedure and comply with all pre- and post-care instructions.", pa:"ਮੈਂ ਪ੍ਰਕਿਰਿਆ ਦੌਰਾਨ ਸੁਰੱਖਿਆਤਮਕ ਐਨਕਾਂ ਪਹਿਨਾਂਗਾ/ਪਹਿਨਾਂਗੀ।",hi:"प्रक्रिया के दौरान सुरक्षात्मक चश्मा पहनूँगा/पहनूँगी।"},
  ]},
  'skin-prp': { title:'Consent for PRP / Mesotherapy', paras:[
    {en:"I consent to Platelet-Rich Plasma (PRP) or Mesotherapy injections for hair loss / skin rejuvenation as recommended.", pa:"ਮੈਂ ਵਾਲਾਂ ਦੇ ਝੜਨ / ਚਮੜੀ ਲਈ PRP ਜਾਂ ਮੇਸੋਥੈਰੇਪੀ ਲਈ ਸਹਿਮਤ ਹਾਂ।",hi:"बालों के झड़ने / त्वचा के लिए PRP या मेसोथेरेपी के लिए सहमत हूँ।"},
    {en:"I understand the procedure involves drawing my blood, processing it, and re-injecting into the scalp/skin. Possible side effects: bruising, swelling, pain at injection sites.", pa:"ਮੈਂ ਸਮਝਦਾ/ਸਮਝਦੀ ਹਾਂ ਕਿ ਖੂਨ ਖਿੱਚ ਕੇ ਦੁਬਾਰਾ ਟੀਕਾ ਲਗਾਇਆ ਜਾਵੇਗਾ। ਨੀਲੇ ਧੱਬੇ ਅਤੇ ਦਰਦ ਹੋ ਸਕਦਾ ਹੈ।",hi:"खून खींचकर दोबारा इंजेक्ट किया जाएगा। नील पड़ना और दर्द हो सकता है।"},
    {en:"Multiple sessions (typically 3–6) are required at 4-week intervals for best results.", pa:"ਵਧੀਆ ਨਤੀਜਿਆਂ ਲਈ ਆਮ ਤੌਰ ਤੇ 3–6 ਸੈਸ਼ਨ 4 ਹਫ਼ਤੇ ਦੇ ਅੰਤਰਾਲ ਤੇ ਲੋੜੀਂਦੇ ਹਨ।",hi:"बेहतर परिणामों के लिए आमतौर पर 3–6 सत्र 4 सप्ताह के अंतर पर जरूरी होते हैं।"},
  ]},
  /* ─── Additional Ophtho ─── */
  'pterygium': { title:'Consent for Pterygium Excision', paras:[
    {en:"I consent to surgical removal of pterygium (wing-shaped growth on the eye) under local anaesthesia.", pa:"ਮੈਂ ਅੱਖ ਦੇ ਟੈਰੀਜੀਅਮ (ਖੰਭ-ਆਕਾਰ ਵਾਧੇ) ਨੂੰ ਹਟਾਉਣ ਲਈ ਸਹਿਮਤ ਹਾਂ।",hi:"आँख के टेरीजियम (पंख के आकार की वृद्धि) को हटाने के लिए सहमत हूँ।"},
    {en:"I understand risks include recurrence (especially in younger patients), dryness, infection, and minor suture-related discomfort.", pa:"ਮੈਨੂੰ ਦੁਬਾਰਾ ਹੋਣ, ਖੁਸ਼ਕੀ, ਇਨਫੈਕਸ਼ਨ ਅਤੇ ਟਾਂਕੇ ਨਾਲ ਤਕਲੀਫ਼ ਦੇ ਜੋਖਮਾਂ ਬਾਰੇ ਦੱਸਿਆ ਗਿਆ ਹੈ।",hi:"दोबारा होने, सूखापन, संक्रमण और टाँके संबंधी असुविधा के जोखिमों के बारे में बताया गया है।"},
    {en:"I will comply with post-operative eye drop regime and follow-up schedule.", pa:"ਮੈਂ ਆਪ੍ਰੇਸ਼ਨ ਤੋਂ ਬਾਅਦ ਅੱਖਾਂ ਦੀਆਂ ਬੂੰਦਾਂ ਅਤੇ ਫਾਲੋ-ਅਪ ਸਮਾਂ-ਸੂਚੀ ਦੀ ਪਾਲਣਾ ਕਰਾਂਗਾ/ਕਰਾਂਗੀ।",hi:"ऑपरेशन के बाद आई ड्रॉप और अनुवर्ती कार्यक्रम का पालन करूँगा/करूँगी।"},
  ]},
};

const CONSENT_LIBRARY = [
  {id:'consent-cataract-hi',dept:'ophtho',name:'Cataract Consent — English + Hindi',icon:'📝',docType:'consent',lang:'hi',structuredKey:'cataract'},
  {id:'consent-cataract-pa',dept:'ophtho',name:'Cataract Consent — English + Punjabi',icon:'📝',docType:'consent',lang:'pa',structuredKey:'cataract'},
  {id:'preop-nursing-checklist',dept:'ophtho',name:'Pre-operative Nursing Checklist',icon:'✅',docType:'form',
   body:`Identity confirmed with BMSH ID, patient name, age, sex, and operative eye/site.\n\nWritten informed consent checked and matching planned procedure verified.\n\nAllergy history, systemic diseases, current medications, blood thinners, diabetes, hypertension, and anaesthesia concerns reviewed.\n\nFasting status, blood sugar if indicated, blood pressure, pulse, temperature, and relevant investigations checked and documented.\n\nOperative eye marked where applicable, jewellery / dentures / contact lenses removed, and patient changed into OT clothing.\n\nBiometry / IOL selection / lens power cross-checked with OT plan and surgeon confirmation.\n\nRequired eye drops / dilatation / antibiotic / anaesthesia preparation completed and documented with time.\n\nEscort counselling completed, valuables handed over, and final nursing sign-off done before shifting to OT.`},
  {id:'c-phaco',dept:'ophtho',name:'Cataract Surgery (PMICS + IOL)',icon:'👁️',
   body:`I, the undersigned, hereby give my voluntary consent for Phacoemulsification (PMICS - Pinhole Micro Incision Cataract Surgery) with intraocular lens (IOL) implantation.\n\nNature of Procedure: The cloudy natural lens (cataract) will be removed through a small incision using ultrasound energy and replaced with an artificial foldable IOL.\n\nRisks Explained: I have been informed of risks including: posterior capsule rupture, dropped nucleus, endophthalmitis (infection), corneal oedema, raised intraocular pressure, cystoid macular oedema, retinal detachment (rare), and the extremely rare risk of loss of vision or the eye. Most complications are treatable.\n\nAlternatives: Spectacles (for mild cataract), observation, or surgery at a later date.\n\nNo Guarantees: I understand that no guarantee of outcome has been made. Vision improvement depends on the health of other eye structures (retina, optic nerve, cornea).\n\nI consent to use of local (topical, peribulbar) or general anaesthesia as deemed necessary by the doctor.\n\nPhotographs/Videos: I consent to intraoperative photographs for medical records/teaching purposes (identifiable information will not be disclosed without consent).`},
  {id:'c-ivt-vegf',dept:'ophtho',name:'IVT Injection — Anti-VEGF (Ranibizumab / Bevacizumab / Aflibercept)',icon:'💉',
   body:`I consent to receive an intravitreal injection (injection directly into the eye) with an anti-VEGF agent as advised by my ophthalmologist.\n\nIndications: Wet age-related macular degeneration, diabetic macular oedema, retinal vein occlusion, or other neovascular conditions.\n\nProcedure: The eye is anaesthetised with drops, cleaned with antiseptic solution (povidone-iodine), and the drug is injected into the vitreous cavity using a fine needle.\n\nRisks Explained: Endophthalmitis (infection — 1 in 1000), raised intraocular pressure, subconjunctival haemorrhage, retinal detachment, lens injury (rare), and systemic cardiovascular events (rare with systemic leakage).\n\nI understand that multiple injections may be required and that the treatment may slow/stop disease progression rather than fully restore vision.`},
  {id:'c-ivt-steroid',dept:'ophtho',name:'IVT Injection — Steroid (Triamcinolone / Ozurdex)',icon:'💉',
   body:`I consent to receive an intravitreal injection of a corticosteroid (triamcinolone acetonide or dexamethasone implant) for the treatment of my retinal/uveitic condition.\n\nRisks: Raised intraocular pressure (requiring drops or surgery in some cases), cataract formation (accelerated), endophthalmitis, and other injection-related risks as above.\n\nI understand steroid-related side effects (IOP rise, cataract) may develop over time.`},
  {id:'c-trab',dept:'ophtho',name:'Trabeculectomy (Glaucoma Filtration Surgery)',icon:'👁️',
   body:`I consent to trabeculectomy surgery for control of intraocular pressure in glaucoma.\n\nProcedure: A small drainage channel is created in the sclera and covered with a conjunctival flap to allow aqueous humour to drain from the eye, thereby lowering eye pressure.\n\nRisks: Hypotony (very low eye pressure), shallow anterior chamber, failure of the bleb (drainage opening), infection, cataract progression, vision loss, and extremely rarely, loss of the eye. Antimetabolites (MMC/5-FU) may be used to improve success — these carry additional risks.`},
  {id:'c-lasik',dept:'ophtho',name:'LASIK Laser Eye Surgery',icon:'✨',
   body:`I consent to LASIK (Laser-Assisted In-Situ Keratomileusis) for correction of my refractive error.\n\nProcedure: A corneal flap is created (microkeratome or femtosecond laser), and excimer laser reshapes the underlying corneal tissue. The flap is repositioned.\n\nRisks: Dry eyes (very common, usually temporary), halos/glare around lights, undercorrection/overcorrection (requiring enhancement), flap complications, epithelial ingrowth, ectasia (weakening of cornea — rare, screened for preoperatively), and loss of best corrected visual acuity (rare).\n\nI understand: LASIK does not prevent age-related reading spectacles (presbyopia). Reading glasses will likely be needed after age 40-45.`},
  {id:'c-pteryg',dept:'ophtho',name:'Pterygium Excision with Conjunctival Autograft',icon:'👁️',
   body:`I consent to excision of pterygium (fleshy overgrowth on the cornea) with conjunctival autografting.\n\nRisks: Recurrence (especially in younger patients or without graft), restricted eye movement, infection, dryness, minor suture-related discomfort, and rarely, corneal scarring.`},
  {id:'c-dcr',dept:'ophtho',name:'DCR Surgery (Dacryocystorhinostomy)',icon:'👁️',
   body:`I consent to DCR surgery for treatment of blocked nasolacrimal duct causing watering from the eye.\n\nProcedure: A new drainage passage is created between the lacrimal sac and the nasal cavity, under general or local anaesthesia.\n\nRisks: Failure to relieve epiphora, bleeding, infection, scarring, injury to nasal structures, and rarely, damage to surrounding orbital structures.`},
  {id:'c-squint',dept:'ophtho',name:'Squint Surgery (Strabismus Correction)',icon:'👁️',
   body:`I consent to strabismus (squint) correction surgery on one or both eyes.\n\nProcedure: The muscles controlling eye movement are surgically weakened (recession) or strengthened (resection) under general or local anaesthesia.\n\nRisks: Undercorrection/overcorrection (may require further surgery), infection, double vision (usually temporary), red eye (subconjunctival haemorrhage), anterior segment ischaemia (very rare, with multiple muscle surgery).`},
  {id:'c-ptosis',dept:'ophtho',name:'Ptosis Repair Surgery',icon:'👁️',
   body:`I consent to surgical correction of drooping eyelid (ptosis). Depending on the type and severity, this may involve levator resection, levator advancement, or frontalis sling procedure.\n\nRisks: Undercorrection/overcorrection, lagophthalmos (inability to fully close the eye — may require artificial tears), corneal exposure, wound infection, asymmetry.`},
  {id:'c-yag',dept:'ophtho',name:'Nd:YAG Laser Capsulotomy (PCO)',icon:'🔬',
   body:`I consent to Nd:YAG laser posterior capsulotomy for treatment of posterior capsule opacification (clouding behind the IOL after cataract surgery).\n\nProcedure: A laser beam creates an opening in the thickened posterior capsule to restore clear vision.\n\nRisks: Transient raised intraocular pressure (routine drops given), IOL pitting/damage (minor), retinal detachment (rare — < 1%), macular oedema (rare).`},
  {id:'c-lpi',dept:'ophtho',name:'Laser Peripheral Iridotomy (LPI)',icon:'🔬',
   body:`I consent to laser peripheral iridotomy for prevention/treatment of angle-closure glaucoma.\n\nProcedure: A small hole is made in the iris using argon/Nd:YAG laser to equalise pressure between the anterior and posterior chambers.\n\nRisks: Transient blurring, linear dysphotopsia (visual disturbance from the opening), raised IOP immediately after, bleeding, rarely incomplete penetration.`},
  {id:'c-alt',dept:'ophtho',name:'Argon Laser Trabeculoplasty (ALT / SLT)',icon:'🔬',
   body:`I consent to selective laser trabeculoplasty (SLT) / argon laser trabeculoplasty for reduction of intraocular pressure in open-angle glaucoma.\n\nRisks: Temporary IOP spike, mild inflammation, failure to achieve target IOP, need for repeat procedure or continued medications.`},
  {id:'c-fa',dept:'ophtho',name:'Fluorescein Angiography (FFA)',icon:'💉',
   body:`I consent to fluorescein angiography for retinal assessment.\n\nProcedure: Fluorescein dye is injected intravenously and retinal photographs are taken to assess blood vessel health.\n\nRisks: Nausea/vomiting (10-15%), yellow skin/urine discolouration for 24 hours, localised extravasation if vein is missed, and very rarely, allergic reaction.`},
  {id:'c-eua',dept:'ophtho',name:'Examination Under Anaesthesia (EUA — Paediatric)',icon:'👁️',
   body:`I, as parent/legal guardian, consent to examination of my child's eyes under general anaesthesia.\n\nReason: An adequate ophthalmic examination is not possible in an uncooperative or very young child without anaesthesia.\n\nRisks: Risks of general anaesthesia (airway management, medication reactions), and standard examination-related risks.`},
  {id:'c-lscs',dept:'obg',name:'LSCS — Caesarean Section',icon:'🤰',
   body:`I consent to Caesarean Section (Lower Segment Caesarean Section — LSCS) for delivery of my baby.\n\nIndications have been explained to me. I understand this is a major abdominal operation carried out under spinal or general anaesthesia.\n\nRisks: Haemorrhage (may require blood transfusion or, rarely, hysterectomy), infection (wound, uterine, urinary), injury to bladder/ureter/bowel (rare), deep vein thrombosis, repeat caesarean/uterine scar complications in future pregnancies, and anaesthesia risks.\n\nFoetal Risks: Respiratory distress (transient tachypnoea of newborn), NICU admission if indicated.\n\nI understand this may affect options for future deliveries.`},
  {id:'c-nd',dept:'obg',name:'Normal Vaginal Delivery',icon:'🤰',
   body:`I consent to vaginal delivery under the care of the obstetric team at Baweja Multispeciality Hospital.\n\nI understand that episiotomy may be performed if needed, and that assisted delivery (forceps/vacuum) may be required in an emergency. I have been informed of the risks of perineal tears, postpartum haemorrhage, and neonatal complications, and that LSCS may be necessary.`},
  {id:'c-lap',dept:'obg',name:'Diagnostic / Operative Laparoscopy',icon:'🤰',
   body:`I consent to diagnostic/operative laparoscopy under general anaesthesia.\n\nProcedure: Thin telescopic instruments are introduced through small incisions in the abdomen to visualise the pelvic/abdominal organs and perform surgical procedures as necessary.\n\nRisks: Injury to bowel, bladder, ureter, or blood vessels; bleeding; infection; risk of conversion to open surgery (laparotomy) if complications arise; anaesthesia risks; port-site hernia (rare).`},
  {id:'c-hysteroscopy',dept:'obg',name:'Hysteroscopy & D&C',icon:'🤰',
   body:`I consent to hysteroscopy with or without dilatation and curettage (D&C) under general/spinal anaesthesia.\n\nRisks: Uterine perforation, cervical trauma, bleeding, infection, incomplete evacuation (requiring repeat procedure), and anaesthesia risks.`},
  {id:'c-tubectomy',dept:'obg',name:'Tubectomy (Bilateral Tubal Ligation)',icon:'🤰',
   body:`I voluntarily consent to bilateral tubal ligation (tubectomy) for permanent sterilisation. I understand this is intended to be permanent and may not always be reversible. Risks include failure (rare — 1 in 200 over 10 years), ectopic pregnancy if it fails, infection, bleeding, and anaesthesia risks.`},
  {id:'c-iucd',dept:'obg',name:'IUCD Insertion',icon:'🤰',
   body:`I consent to insertion of an intrauterine contraceptive device (IUCD/IUD). I have been counselled on the type of device, its duration, and alternative contraceptive options.\n\nRisks: Cramping/pain during and after insertion, spotting, expulsion, failure (rare), infection (especially if pre-existing PID), and uterine perforation (rare).`},
  {id:'c-biopsy',dept:'obg',name:'Cervical Biopsy / Colposcopy',icon:'🤰',
   body:`I consent to colposcopy and/or cervical biopsy for further assessment of an abnormal cervical smear or suspected cervical lesion. Risks include minor bleeding, mild discomfort, infection, and incomplete sampling.`},
  {id:'c-blood',dept:'obg',name:'Blood Transfusion Consent',icon:'🩸',
   body:`I consent to receive blood or blood products if deemed medically necessary during my treatment/surgery. I have been informed of the risks: transfusion reactions, fever, allergic reactions, and extremely rare risk of transfusion-transmitted infections (hepatitis B/C, HIV — all blood is screened). I understand refusal may increase risk of anaemia and related complications.`},
  {id:'c-anaes',dept:'obg',name:'Anaesthesia Consent (Spinal / General)',icon:'💉',
   body:`I consent to spinal or general anaesthesia as required for my surgical procedure. I have been assessed by the anaesthetist. Risks of spinal anaesthesia: headache (post-dural puncture), failed block, hypotension, urinary retention. Risks of general anaesthesia: airway difficulties, aspiration, nausea/vomiting, awareness (very rare), drug reactions. Both carry very rare risks of cardiovascular or neurological complications.`},
  {id:'c-psych-eval',dept:'psych',name:'Psychiatric Evaluation & Treatment',icon:'🧠',
   body:`I voluntarily consent to psychiatric evaluation, diagnosis, and treatment including medications, psychotherapy, psychological testing, and other investigations recommended by Dr. Tarun Baweja.\n\nConfidentiality: Information disclosed will be kept strictly confidential except where required by law (risk of harm to self or others, court order).\n\nMedications: I have been informed that psychotropic medications may cause side effects and that response to treatment varies. I will report any unexpected effects promptly.`},
  {id:'c-ect',dept:'psych',name:'ECT — Electroconvulsive Therapy',icon:'🧠',
   body:`I/the responsible person voluntarily consent to Electroconvulsive Therapy (ECT).\n\nIndications: Severe depression, mania, catatonia, or other psychiatric conditions not adequately responding to medications.\n\nProcedure: Brief electrical stimulation is applied to the brain under general anaesthesia and muscle relaxants. A controlled seizure is induced.\n\nRisks: Short-term memory loss (usually resolves over weeks), headache, muscle aches, disorientation after sessions, anaesthesia risks, rare cardiovascular events.`},
  {id:'c-psych-admit',dept:'psych',name:'Voluntary Psychiatric Admission',icon:'🧠',
   body:`I voluntarily consent to inpatient psychiatric admission for assessment, stabilisation, and treatment.\n\nI understand I may request discharge at any time unless clinically or legally advised otherwise. I consent to a structured ward environment and participation in the treatment programme.`},
  {id:'c-antipsych',dept:'psych',name:'Consent for Antipsychotic Medication',icon:'💊',
   body:`I consent to treatment with antipsychotic medication as prescribed. I have been informed of common side effects including sedation, weight gain, metabolic effects, extrapyramidal symptoms (muscle stiffness, restlessness), tardive dyskinesia (with prolonged use), and rare serious effects including neuroleptic malignant syndrome.\n\nThe benefits and risks of alternative medications and of not treating have been explained.`},
  {id:'c-peel',dept:'skin',name:'Chemical Peel',icon:'💆',
   body:`I consent to chemical peel treatment using alpha-hydroxy acids (AHA), trichloroacetic acid (TCA), or other peeling agents.\n\nIndications: Acne, hyperpigmentation, melasma, photoageing, or uneven skin tone.\n\nRisks: Temporary redness, peeling, dryness, mild burning sensation during treatment, post-inflammatory hyperpigmentation (especially in darker skin tones), infection, scarring (rare with superficial peels).\n\nI agree to strictly follow post-peel instructions: daily sun protection SPF 50+ for minimum 4 weeks, avoiding direct sun exposure.`},
  {id:'c-prp',dept:'skin',name:'PRP / Microneedling Treatment',icon:'💆',
   body:`I consent to Platelet-Rich Plasma (PRP) therapy and/or microneedling (dermapen/dermaroller).\n\nIndications: Hair loss, acne scars, skin rejuvenation.\n\nFor PRP: Blood is drawn, centrifuged, and injected/applied to the skin. Risks: bruising, swelling, temporary redness, infection at injection sites.\n\nFor Microneedling: Fine needles create micro-injuries to stimulate collagen. Risks: temporary redness, swelling, bruising, infection, post-inflammatory pigmentation.`},
  {id:'c-botox',dept:'skin',name:'Botox / Dermal Fillers',icon:'💆',
   body:`I consent to botulinum toxin (Botox) injection and/or hyaluronic acid dermal filler treatment.\n\nBotox Risks: Temporary bruising, headache, drooping eyelid/brow (ptosis — resolves within weeks), resistance with repeated use, flu-like symptoms.\n\nFiller Risks: Bruising, swelling, asymmetry, lumpiness, granuloma, vascular occlusion (very rare but serious — risk of skin necrosis or visual changes if ophthalmic vessels affected).\n\nI understand results are temporary and maintenance treatment may be required.`},
  {id:'c-laser-hair',dept:'skin',name:'Laser Hair Removal',icon:'💆',
   body:`I consent to laser hair removal treatment.\n\nRisks: Temporary redness/swelling, pigment changes (hypo- or hyperpigmentation, especially in darker skin), blistering (rare), paradoxical hair stimulation. Results vary with hair colour and thickness. Multiple sessions required.\n\nI agree to avoid sun exposure and use SPF protection before and after treatments.`},
  {id:'c-mnrf',dept:'skin',name:'MNRF — Microneedling Radiofrequency',icon:'💆',
   body:`I consent to Microneedling Radiofrequency (MNRF) treatment for skin tightening, scar reduction, or rejuvenation.\n\nRisks: Temporary redness, swelling, bruising, pin-point bleeding, post-inflammatory hyperpigmentation, infection, rare burns/scarring. Downtime of 3-7 days expected.`},
  {id:'c-co2',dept:'skin',name:'CO2 Laser Resurfacing',icon:'💆',
   body:`I consent to fractional/ablative CO2 laser treatment. This procedure removes damaged skin layers and stimulates new collagen formation.\n\nRisks: Temporary redness lasting weeks, swelling, crusting, post-inflammatory hyperpigmentation, hypopigmentation, infection (antiviral prophylaxis given if history of cold sores), scarring (rare).`},
  {id:'c-sclerotherapy',dept:'skin',name:'Sclerotherapy (Varicose/Spider Veins)',icon:'💆',
   body:`I consent to sclerotherapy for treatment of spider veins or small varicose veins.\n\nProcedure: A sclerosant solution is injected into the targeted vessels, causing them to collapse and fade.\n\nRisks: Bruising, temporary skin staining (haemosiderin), matting (fine new vessels), allergic reaction, deep vein thrombosis (rare), ulceration at injection site.`},
];

// ── Consent text DB (overrides built-in CONSENT_DATA / library — no runtime translation) ──
let CONSENT_DATA_OVERRIDES = {};
let CONSENT_LIBRARY_OVERRIDES = {};
function loadConsentDataOverridesFromStorage() {
  try {
    const ls = localStorage.getItem('bmh_consent_data_db');
    if (ls) {
      const o = JSON.parse(ls);
      if (o && typeof o === 'object') CONSENT_DATA_OVERRIDES = o;
    }
  } catch (e) { /* noop */ }
  try {
    const ls2 = localStorage.getItem('bmh_consent_library_db');
    if (ls2) {
      const o2 = JSON.parse(ls2);
      if (o2 && typeof o2 === 'object') CONSENT_LIBRARY_OVERRIDES = o2;
    }
  } catch (e) { /* noop */ }
  if (window.FBDB) {
    window.FBDB.ref('consentDataDb').once('value').then(function (snap) {
      const v = snap.val();
      if (v && typeof v === 'object') {
        CONSENT_DATA_OVERRIDES = v;
        try { localStorage.setItem('bmh_consent_data_db', JSON.stringify(v)); } catch (e) {}
      }
    }).catch(function () {});
    window.FBDB.ref('consentLibraryDb').once('value').then(function (snap) {
      const v = snap.val();
      if (v && typeof v === 'object') {
        CONSENT_LIBRARY_OVERRIDES = v;
        try { localStorage.setItem('bmh_consent_library_db', JSON.stringify(v)); } catch (e) {}
      }
    }).catch(function () {});
  }
}
window.loadConsentDataOverridesFromStorage = loadConsentDataOverridesFromStorage;
function saveConsentDataOverridesToStorage() {
  try { localStorage.setItem('bmh_consent_data_db', JSON.stringify(CONSENT_DATA_OVERRIDES)); } catch (e) {}
  if (window.FBDB) window.FBDB.ref('consentDataDb').set(CONSENT_DATA_OVERRIDES).catch(function () {});
}
function saveConsentLibraryOverridesToStorage() {
  try { localStorage.setItem('bmh_consent_library_db', JSON.stringify(CONSENT_LIBRARY_OVERRIDES)); } catch (e) {}
  if (window.FBDB) window.FBDB.ref('consentLibraryDb').set(CONSENT_LIBRARY_OVERRIDES).catch(function () {});
}
function getMergedConsentData() {
  const out = {};
  Object.keys(CONSENT_DATA).forEach(function (k) {
    out[k] = JSON.parse(JSON.stringify(CONSENT_DATA[k]));
  });
  Object.keys(CONSENT_DATA_OVERRIDES).forEach(function (k) {
    const ov = CONSENT_DATA_OVERRIDES[k];
    if (!ov) return;
    if (!out[k]) out[k] = { title: ov.title || k, paras: Array.isArray(ov.paras) ? JSON.parse(JSON.stringify(ov.paras)) : [] };
    else {
      if (ov.title) out[k].title = ov.title;
      if (Array.isArray(ov.paras)) out[k].paras = JSON.parse(JSON.stringify(ov.paras));
    }
  });
  return out;
}
function getConsentEntry(key) {
  return getMergedConsentData()[key] || CONSENT_DATA[key];
}
/** Resolve consent key for printing: built-in data, uploaded template id, or library item id. */
function resolveConsentDataForPrint(key) {
  const merged = getMergedConsentData();
  if (merged[key] && merged[key].paras && merged[key].paras.length) return merged[key];
  if (typeof CONSENT_TEMPLATES !== 'undefined') {
    const t = CONSENT_TEMPLATES.find(function (c) { return c.id === key; });
    if (t && t.content && String(t.content).trim()) {
      return libraryMergedToConsentData({ name: t.name, body: t.content, bodyPa: t.contentPa || '', bodyHi: t.contentHi || '' });
    }
  }
  const lib = getMergedLibraryItem(key);
  if (lib && (lib.body || lib.text)) {
    return libraryMergedToConsentData({
      name: lib.name,
      body: lib.body || lib.text || '',
      bodyPa: lib.bodyPa || '',
      bodyHi: lib.bodyHi || ''
    });
  }
  return null;
}
function getMergedLibraryItem(id) {
  const base = CONSENT_LIBRARY.find(function (x) { return x.id === id; });
  if (!base) return null;
  const ov = CONSENT_LIBRARY_OVERRIDES[id] || {};
  return Object.assign({}, base, ov);
}
function escapeHtmlConsent(s) {
  return (s == null ? '' : String(s)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function resolvePrintHeaderSrc() {
  if (window.PRINT_HEADER_SRC && String(window.PRINT_HEADER_SRC).trim()) return window.PRINT_HEADER_SRC;
  if (window.LH_SRC && String(window.LH_SRC).trim()) return window.LH_SRC;
  const tag = document.querySelector('.lh-img-tag');
  if (tag && tag.src) return tag.src;
  try {
    const base = document.querySelector('base')?.href || window.location.href;
    const local = new URL('assets/hospital-header.jpg', base).href;
    if (local) return local;
  } catch (e) { /* noop */ }
  return 'https://bawejahospital.com/img/logo.png';
}
function resolvePrintLogoSrc() {
  const explicitLogo = document.querySelector('.bmh-logo-img');
  if (explicitLogo && explicitLogo.src) return explicitLogo.src;
  const anyLogo = document.querySelector('img[src*="logo.png"], img[src*="logo-white.png"]');
  if (anyLogo && anyLogo.src) return anyLogo.src;
  return 'https://bawejahospital.com/img/logo.png';
}
function buildConsentParasHtml(cd, variant) {
  const paras = cd.paras || [];
  return paras.map(function (p, i) {
    const en = escapeHtmlConsent(p.en).replace(/\n/g, '<br>');
    const n = i + 1;
    if (variant === 'en') {
      return '<p style="margin-bottom:10px;font-size:12.5px;line-height:1.85"><strong>' + n + '. </strong>' + en + '</p>';
    }
    if (variant === 'en-pa') {
      const pa = escapeHtmlConsent(p.pa || '').replace(/\n/g, '<br>');
      return '<div style="margin-bottom:14px"><p style="margin-bottom:6px;font-size:12.5px;line-height:1.85"><strong>' + n + '. </strong>' + en + '</p>'
        + '<p style="color:#333;font-size:11.5px;line-height:1.85;padding-left:12px;border-left:3px solid #D4A017">' + pa + '</p></div>';
    }
    const hi = escapeHtmlConsent(p.hi || '').replace(/\n/g, '<br>');
    return '<div style="margin-bottom:14px"><p style="margin-bottom:6px;font-size:12.5px;line-height:1.85"><strong>' + n + '. </strong>' + en + '</p>'
      + '<p style="color:#333;font-size:11.5px;line-height:1.85;padding-left:12px;border-left:3px solid #b85c00">' + hi + '</p></div>';
  }).join('');
}
function consentVariantSubtitle(variant) {
  if (variant === 'en') return '';
  if (variant === 'en-pa') return 'English + ਪੰਜਾਬੀ';
  return 'English + हिंदी';
}
function getPreferredConsentVariant(cd, preferredLang) {
  const paras = Array.isArray(cd?.paras) ? cd.paras : [];
  const hasPa = paras.some(function (p) { return String(p?.pa || '').trim(); });
  const hasHi = paras.some(function (p) { return String(p?.hi || '').trim(); });
  const pref = String(preferredLang || '').toLowerCase();
  if (pref === 'pa' && hasPa) return 'en-pa';
  if (pref === 'hi' && hasHi) return 'en-hi';
  const centre = String(window.CURRENT_PATIENT?.centre || CURRENT_USER?.centre || '').toUpperCase();
  if (centre === 'RPR' && hasPa) return 'en-pa';
  if (hasHi) return 'en-hi';
  if (hasPa) return 'en-pa';
  return 'en';
}
function buildCompactDocumentHeader(title, ctx, subtitle) {
  const esc = escapeHtmlConsent;
  const logoSrc = resolvePrintLogoSrc();
  const proc = String(ctx?.procLine || '').trim();
  return '<div style="border:1px solid #222;border-radius:10px;padding:8px 10px;margin-bottom:8px">'
    + '<div style="display:grid;grid-template-columns:minmax(0,1.2fr) repeat(4,minmax(86px,1fr));gap:8px;align-items:stretch">'
    + '<div style="display:flex;align-items:center;gap:8px;min-width:0;padding-right:6px;border-right:1px solid #d7dce5">'
    + '<img src="' + esc(logoSrc) + '" style="height:30px;width:auto;object-fit:contain" alt="BMH">'
    + '<div><div style="font-size:15px;font-weight:900;color:#111;line-height:1.25">' + esc(title) + '</div>'
    + (subtitle ? '<div style="font-size:10px;font-weight:800;color:#555;margin-top:2px">' + esc(subtitle) + '</div>' : '')
    + '</div></div>'
    + '<div style="display:grid;gap:2px"><span style="font-size:8.5px;color:#666;text-transform:uppercase;font-weight:800">Patient</span><span style="font-size:11.5px;font-weight:900;color:#111;line-height:1.3">' + esc(ctx?.ptNm || '—') + '</span></div>'
    + '<div style="display:grid;gap:2px"><span style="font-size:8.5px;color:#666;text-transform:uppercase;font-weight:800">BMSH ID</span><span style="font-size:11px;font-weight:900;font-family:ui-monospace,monospace;color:#1A3C6E;line-height:1.3">' + esc(ctx?.ptId || '—') + '</span></div>'
    + '<div style="display:grid;gap:2px"><span style="font-size:8.5px;color:#666;text-transform:uppercase;font-weight:800">Procedure</span><span style="font-size:10.5px;font-weight:800;color:#111;line-height:1.35">' + esc(proc || '—') + '</span></div>'
    + '<div style="display:grid;gap:2px"><span style="font-size:8.5px;color:#666;text-transform:uppercase;font-weight:800">Doctor</span><span style="font-size:10.5px;font-weight:800;color:#111;line-height:1.35">' + esc(ctx?.doctorName || '—') + '</span></div>'
    + '<div style="display:grid;gap:2px"><span style="font-size:8.5px;color:#666;text-transform:uppercase;font-weight:800">Date</span><span style="font-size:10.5px;font-weight:800;color:#111;line-height:1.35">' + esc(ctx?.today || '—') + '</span></div>'
    + '</div>'
    + '<div style="padding-top:7px;text-align:center"><div style="font-size:14px;font-weight:900;color:#111;line-height:1.25">' + esc(title) + '</div>' + (subtitle ? '<div style="font-size:10px;font-weight:800;color:#555;margin-top:2px">' + esc(subtitle) + '</div>' : '') + '</div>'
    + '</div>';
}
function buildCompactDocumentShell(title, ctx, bodyHtml, opts) {
  opts = opts || {};
  const sigHtml = opts.signatures === false ? '' : '<div style="display:flex;justify-content:space-between;gap:18px;margin-top:28px">'
    + '<div style="flex:1;text-align:center"><div style="border-bottom:1px solid #333;height:34px"></div><div style="font-size:10px;color:#555;margin-top:4px">Patient / Guardian Signature</div></div>'
    + '<div style="flex:1;text-align:center"><div style="border-bottom:1px solid #333;height:34px"></div><div style="font-size:10px;color:#555;margin-top:4px">Witness Signature</div></div>'
    + '<div style="flex:1;text-align:center"><div style="border-bottom:1px solid #333;height:34px"></div><div style="font-size:10px;color:#555;margin-top:4px">Doctor Signature</div></div>'
    + '</div>';
  return '<section style="padding:7mm 7mm 6mm;font-family:Arial,sans-serif;color:#111;page-break-after:always;page-break-inside:avoid;overflow:hidden">'
    + buildCompactDocumentHeader(title, ctx, opts.subtitle || '')
    + '<div style="font-size:10.8px;line-height:1.55">' + bodyHtml + '</div>'
    + sigHtml
    + '</section>';
}
function buildConsentPageShell(cd, ctx, variant) {
  return buildCompactDocumentShell(cd.title, ctx, buildConsentParasHtml(cd, variant), {
    subtitle: variant === 'en' ? '' : consentVariantSubtitle(variant)
  });
}
function buildConsentPatientStripHtml(ptNm, ptId, ptAge, ptSex, ptMob, today, procLine, doctorName) {
  const esc = escapeHtmlConsent;
  const sx = (ptSex || '?')[0] || '?';
  return '<div style="background:linear-gradient(135deg,#1A3C6E,#0B7B8C);border-radius:6px;padding:8px 14px;color:#fff;font-size:11.5px;display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px">'
    + '<span style="font-weight:900;font-size:13px;color:#FFD600">' + esc(ptNm) + '</span>'
    + '<span>🪪 ' + esc(ptId) + '</span>'
    + (ptAge ? '<span>👤 ' + esc(ptAge) + '/' + esc(sx) + '</span>' : '')
    + (ptMob ? '<span>📞 ' + esc(ptMob) + '</span>' : '')
    + '<span>📅 ' + esc(today) + '</span>'
    + '<span>🩺 ' + esc(doctorName) + '</span>'
    + (procLine ? '<span style="flex-basis:100%;font-size:11px;opacity:.95;border-top:1px solid rgba(255,255,255,.25);padding-top:6px;margin-top:2px">🔬 ' + esc(procLine) + '</span>' : '')
    + '</div>';
}
function collectConsentPrintContext() {
  const ptIds = ['ophtho-pt-uid', 'obg-pt-uid', 'psych-pt-uid', 'skin-pt-uid'];
  const ptNms = ['ophtho-pt-nm', 'obg-pt-nm', 'psych-pt-nm', 'skin-pt-nm'];
  let ptId = window._CONSENT_PRINT_BMH_ID || '—'; let ptNm = '_______________';
  const forcedOt = window._CONSENT_PRINT_OT_ID ? OT_CASES.find(function (c) { return c.id === window._CONSENT_PRINT_OT_ID; }) : null;
  if (forcedOt && forcedOt.patient) ptNm = forcedOt.patient;
  for (let i = 0; i < ptIds.length; i++) {
    if (ptId && ptId !== '—') break;
    const v = document.getElementById(ptIds[i])?.textContent?.trim();
    if (v && v !== '—' && v.startsWith('BMSH-')) { ptId = v; ptNm = document.getElementById(ptNms[i])?.textContent || ptNm; break; }
  }
  const pt = (typeof PATIENTS !== 'undefined' && PATIENTS.find) ? PATIENTS.find(function (p) { return p.bmhId === ptId; }) || {} : {};
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const otList = (typeof OT_CASES !== 'undefined' && OT_CASES.length)
    ? OT_CASES.filter(function (c) { return c.bmhId === ptId; }).sort(function (a, b) { return (b.scheduledTime || b.date || '').localeCompare(a.scheduledTime || a.date || ''); })
    : [];
  const ot = forcedOt || otList[0] || null;
  const procLine = ot ? (String(ot.procedure || 'Procedure') + ' · ' + String(ot.site || 'Eye/ Site') + ' · OT ' + String(ot.scheduledTime || ot.date || '')) : '';
  const doctorName = window.CURRENT_USER?.name || 'Dr. Varun Baweja';
  return {
    ptId: ptId, ptNm: ptNm, ptAge: pt.age || '', ptSex: pt.sex || '', ptMob: pt.mob || pt.phone || '',
    today: today, procLine: procLine, doctorName: doctorName,
    stripHtml: buildConsentPatientStripHtml(ptNm, ptId, pt.age || '', pt.sex || '', pt.mob || pt.phone || '', today, procLine, doctorName),
  };
}
function printStructuredConsentThreeVariants(cd) {
  if (!cd || !cd.paras || !cd.paras.length) { showToast('No consent text to print', 'w'); return; }
  const ctx = collectConsentPrintContext();
  const variant = getPreferredConsentVariant(cd, window._CONSENT_PRINT_LANG || '');
  const pages = buildConsentPageShell(cd, ctx, variant);
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:12px}@page{size:A4;margin:0}</style></head><body>' + pages + '</body></html>';
  safePrint(html);
  showToast('Bilingual consent ready to print ✓', 's');
}

function renderConsentLibrary(filterDept) {
  const el = document.getElementById('consent-library-list'); if(!el) return;
  const items = (filterDept && filterDept!=='all' ? CONSENT_LIBRARY.filter(c=>c.dept===filterDept) : CONSENT_LIBRARY)
    .map(function (c) { return getMergedLibraryItem(c.id) || c; })
    .filter(function (c) { return !c.hidden; });
  const deptColors = {ophtho:'var(--blue)',obg:'#c0004e',psych:'var(--orange)',skin:'#5e00c0'};
  const deptBgs = {ophtho:'var(--blue-lt)',obg:'#ffe5f0',psych:'var(--orange-lt)',skin:'#f0e5ff'};
  const deptLabels = {ophtho:'Ophthalmology',obg:'OBG',psych:'Psychiatry',skin:'Skin'};
  el.innerHTML = items.length ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px">${
    items.map(c=>`
      <div style="padding:12px;border-radius:10px;border:1px solid var(--g5);background:#fff;display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;align-items:flex-start;gap:10px">
          <div style="font-size:22px;line-height:1;flex-shrink:0">${c.icon||'📄'}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12.5px;font-weight:800;line-height:1.35">${c.name}</div>
            <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:5px">
              <span style="font-size:9px;font-weight:800;padding:2px 7px;border-radius:12px;background:${deptBgs[c.dept]||'var(--g6)'};color:${deptColors[c.dept]||'var(--g1)'}">${deptLabels[c.dept]||c.dept}</span>
              <span style="font-size:9px;font-weight:800;padding:2px 7px;border-radius:12px;background:var(--g6);color:var(--g1)">${c.docType==='form'?'Form':'Consent'}</span>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn-xs btn-blue" onclick="openConsentFromLibrary('${c.id}')">👁️ Open</button>
          <button class="btn btn-xs btn-gold" onclick="printConsentFromLibrary('${c.id}')">🖨️ Print</button>
          <button class="btn btn-xs btn-outline" onclick="editConsentLibraryItem('${c.id}')">✏️ Edit</button>
          <button class="btn btn-xs btn-gray" onclick="deleteConsentLibraryItem('${c.id}')">🗑️ Delete</button>
        </div>
      </div>`).join('')
  }</div>` : '<div style="padding:18px;text-align:center;color:var(--g1);font-size:12px">No consents found for this department.</div>';
}

function filterConsents(dept) {
  renderConsentLibrary(dept);
}

function openConsentFromLibrary(id) {
  const c = CONSENT_LIBRARY.find(x=>x.id===id); if(!c) return;
  printConsentFromLibrary(id);
}
function editConsentLibraryItem(id) {
  const item = getMergedLibraryItem(id);
  if (!item) return;
  if (item.structuredKey || getMergedConsentData()[id] || item.body || item.bodyPa || item.bodyHi || item.text) {
    openEditConsentDataModal(item.structuredKey || id);
    return;
  }
  const newName = prompt('Edit document name', item.name || '');
  if (newName === null) return;
  const newDept = prompt('Department key: ophtho / obg / psych / skin / all', item.dept || 'all');
  if (newDept === null) return;
  CONSENT_LIBRARY_OVERRIDES[id] = Object.assign({}, CONSENT_LIBRARY_OVERRIDES[id] || {}, {
    name: newName.trim() || item.name,
    dept: normalizeSurgeryPackDeptKey(newDept) || item.dept || 'all',
    hidden: false
  });
  saveConsentLibraryOverridesToStorage();
  renderConsentLibrary(filterDeptActiveForSettings && filterDeptActiveForSettings() || 'all');
  showToast('Consent updated ✓', 's');
}
function deleteConsentLibraryItem(id) {
  const item = getMergedLibraryItem(id);
  if (!item) return;
  if (!confirm('Hide "' + (item.name || id) + '" from the consent library?')) return;
  CONSENT_LIBRARY_OVERRIDES[id] = Object.assign({}, CONSENT_LIBRARY_OVERRIDES[id] || {}, { hidden: true });
  saveConsentLibraryOverridesToStorage();
  renderConsentLibrary(filterDeptActiveForSettings && filterDeptActiveForSettings() || 'all');
  showToast('Consent removed from library ✓', 's');
}
function filterDeptActiveForSettings() {
  const btn = Array.from(document.querySelectorAll('#set-consents button')).find(function (b) {
    return b.className.includes('btn-outline') === false && /All|Ophthalmology|OBG|Psychiatry|Skin/.test(b.textContent || '');
  });
  const txt = (btn?.textContent || 'All').toLowerCase();
  if (txt.includes('oph')) return 'ophtho';
  if (txt.includes('obg')) return 'obg';
  if (txt.includes('psych')) return 'psych';
  if (txt.includes('skin')) return 'skin';
  return 'all';
}

function libraryMergedToConsentData(merged) {
  const enParts = String(merged.body || '').split(/\n\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
  const paParts = String(merged.bodyPa || '').split(/\n\n+/).map(function (s) { return s.trim(); });
  const hiParts = String(merged.bodyHi || '').split(/\n\n+/).map(function (s) { return s.trim(); });
  const paras = enParts.map(function (en, i) {
    return { en: en, pa: paParts[i] || '', hi: hiParts[i] || '' };
  });
  return { title: (merged.name || 'Consent').toUpperCase(), paras: paras };
}
function getConsentTemplateItem(id) {
  return (typeof CONSENT_TEMPLATES !== 'undefined' ? CONSENT_TEMPLATES.find(function (c) { return c.id === id; }) : null) || null;
}
function getPackDocumentTitle(key) {
  if (key === '__discharge__') return 'Discharge Summary & Fitness Certificate';
  const cd = getConsentEntry(key);
  if (cd && cd.title) return cd.title;
  const lib = getMergedLibraryItem(key);
  if (lib && lib.name) return lib.name;
  const tpl = getConsentTemplateItem(key);
  if (tpl && tpl.name) return tpl.name;
  return key;
}
function renderGenericDocumentPage(title, text, ctx, opts) {
  const body = '<div style="white-space:pre-wrap;font-size:12px;line-height:1.9">' + escapeHtmlConsent(text || '').replace(/\n/g, '<br>') + '</div>';
  return buildCompactDocumentShell(title, ctx, body, opts);
}
function renderImageDocumentPage(title, imgSrc, ctx) {
  const esc = escapeHtmlConsent;
  const body = imgSrc
    ? '<div style="display:flex;align-items:center;justify-content:center;min-height:230mm"><img src="' + esc(imgSrc) + '" style="max-width:100%;max-height:228mm;object-fit:contain;border:1px solid #ddd"></div>'
    : '<div style="font-size:12px;color:#666;padding:22mm 0;text-align:center">No image saved for this document.</div>';
  return buildCompactDocumentShell(title, ctx, body, { signatures: false });
}
function renderPackDocumentPages(key, ctx) {
  if (key === '__discharge__') return buildDischargePrintSection();
  const lib = getMergedLibraryItem(key);
  const tpl = getConsentTemplateItem(key);
  const title = getPackDocumentTitle(key);
  const mergedEntry = getConsentEntry(key);
  if (mergedEntry && mergedEntry.paras && mergedEntry.paras.length) {
    const variant = getPreferredConsentVariant(mergedEntry, lib?.lang || tpl?.lang || window._CONSENT_PRINT_LANG || '');
    return buildConsentPageShell(mergedEntry, ctx, variant);
  }
  if (lib && lib.docType === 'consent' && (lib.body || lib.bodyPa || lib.bodyHi || lib.structuredKey)) {
    const cd = lib.structuredKey ? resolveConsentDataForPrint(lib.structuredKey) : libraryMergedToConsentData(lib);
    if (cd && cd.paras && cd.paras.length) {
      const variant = getPreferredConsentVariant(cd, lib.lang || window._CONSENT_PRINT_LANG || '');
      return buildConsentPageShell(cd, ctx, variant);
    }
  }
  const resolved = resolveConsentDataForPrint(key);
  if (resolved && resolved.paras && resolved.paras.length) {
    const variant = getPreferredConsentVariant(resolved, lib?.lang || tpl?.lang || window._CONSENT_PRINT_LANG || '');
    return buildConsentPageShell(resolved, ctx, variant);
  }
  if (lib && lib.type === 'image') return renderImageDocumentPage(title, lib.imgSrc, ctx);
  if (lib && (lib.text || lib.body)) return renderGenericDocumentPage(title, lib.text || lib.body, ctx, { signatures: lib.docType !== 'form' });
  if (tpl && tpl.content) return renderGenericDocumentPage(title, tpl.content, ctx, { signatures: false });
  return '';
}
function printConsentFromLibrary(id) {
  const merged = getMergedLibraryItem(id);
  if (!merged) { showToast('Consent not found', 'w'); return; }
  window._CONSENT_PRINT_LANG = merged.lang || '';
  const ctx = collectConsentPrintContext();
  const pageHtml = renderPackDocumentPages(id, ctx);
  if (!pageHtml) { showToast('Nothing to print for this document', 'w'); return; }
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif}@page{size:A4;margin:0}</style></head><body>' + pageHtml + '</body></html>';
  safePrint(html);
}

function clearSharedPrescriptionEditor() {
  if (typeof RX_DRUGS !== 'undefined') RX_DRUGS.length = 0;
  const quick = document.querySelector('.tab-content.active [id="rx-quick-search"]') || document.getElementById('rx-quick-search');
  if (quick) quick.value = '';
  const dd = document.querySelector('.tab-content.active [id="rx-quick-dropdown"]') || document.getElementById('rx-quick-dropdown');
  if (dd) dd.style.display = 'none';
  renderRxDrugs && renderRxDrugs();
}

function updateDepartmentRailVisibility(pageKey, activeTabId) {
  const activePageKey = pageKey || document.querySelector('.page.active')?.id?.replace(/^pg-/, '') || '';
  const activeTab = activeTabId || document.querySelector(`#pg-${activePageKey} .tab-content.active`)?.id || '';
  const railMap = {
    ophtho: 'ophtho-recap-panel',
    obg: 'obg-summary-rail',
    psych: 'psych-summary-rail',
    skin: 'skin-summary-rail'
  };
  const layoutMap = {
    obg: { id: 'obg-layout', withRail: 'minmax(0,1fr) 300px' },
    psych: { id: 'psych-layout', withRail: 'minmax(0,1fr) 320px' }
  };
  Object.entries(railMap).forEach(([dept, id]) => {
    const rail = document.getElementById(id);
    if (!rail) return;
    const isCurrentDept = dept === activePageKey;
    const hideForRx = isCurrentDept && activeTab === (dept === 'ophtho' ? 'oe-rx' : `${dept}-rx`);
    rail.style.display = isCurrentDept && !hideForRx ? '' : 'none';
  });
  Object.entries(layoutMap).forEach(([dept, cfg]) => {
    const layout = document.getElementById(cfg.id);
    if (!layout) return;
    const isCurrentDept = dept === activePageKey;
    const hideForRx = isCurrentDept && activeTab === `${dept}-rx`;
    layout.style.gridTemplateColumns = isCurrentDept && hideForRx ? 'minmax(0,1fr)' : cfg.withRail;
  });
}

// ═══════════════════════════════════════
// NAV
// ═══════════════════════════════════════
function nav(id, el) {
  // Sidebar passes short ids ('reception'); app.js may pass full ids ('pg-reception').
  const pageKey = (typeof id === 'string' && id.startsWith('pg-')) ? id.slice(3) : id;
  // Show the correct page
  document.querySelectorAll('[id^="pg-"]').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
  const pg = document.getElementById('pg-' + pageKey);
  if(pg) pg.classList.add('active');
  // Update title
  const titles = {dashboard:'Dashboard','doctor-queue':'My Patient Queue',ophtho:'Eye Examination',
    appointments:'Appointment Book','print-templates':'Print Templates',consents:'Consent Forms',
    discharge:'Discharge Card',lab:'Lab Module',reception:'Reception',billing:'Billing',
    payments:'Payments',obg:'OBG Clinic',psych:'Neuropsychiatry',skin:'Skin & Cosmetology',
    inventory:'Inventory',tpa:'TPA / Cashless',centres:'Two-Centre View',settings:'Settings',
    ipd:'IPD Ward',brochures:'Surgery Brochures',ot:'OT Module',reports:'Reports'};
  const ptEl = document.getElementById('ptitle');
  if(ptEl) ptEl.textContent = titles[pageKey] || pageKey;
  // Highlight nav item
  if(el) { el.classList.add('active'); }
  else { const ni = document.querySelector(`.ni[onclick*="'${pageKey}'"]`); if(ni) ni.classList.add('active'); }
  // Close mobile menu
  if(typeof closeMob==='function') closeMob();
  // Set today date on rx tabs
  const today = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  ['oe','obg','psych','skin'].forEach(d => {
    const e2 = document.getElementById(d+'-rx-date'); if(e2) e2.textContent = today;
  });
  // Page-specific init
  if(pageKey==='dashboard')            renderDashboard && renderDashboard();
  else if(pageKey==='doctor-queue')    renderDocQueue && renderDocQueue();
  else if(pageKey==='appointments')    { const d=document.getElementById('apt-date-inp'); if(d)d.value=new Date().toISOString().split('T')[0]; renderAptDay && renderAptDay(); }
  else if(pageKey==='print-templates') renderPrintTemplates && renderPrintTemplates();
  else if(pageKey==='consents')        { renderConsent && renderConsent(); updateConsentPatientHeader(); refreshConsentLibrary && refreshConsentLibrary(); }
  else if(pageKey==='ophtho')          { initQR && initQR(); renderRxDrugs && renderRxDrugs(); buildRefractionDropdowns && buildRefractionDropdowns(); renderOphthoPayList && renderOphthoPayList(); typeof initDiagnosisRowsIfEmpty==='function'&&initDiagnosisRowsIfEmpty(); typeof refreshRxTemplateSelects==='function'&&refreshRxTemplateSelects(); }
  else if(pageKey==='obg')             { renderRxDrugs && renderRxDrugs(); typeof refreshRxTemplateSelects==='function'&&refreshRxTemplateSelects(); initObgSelects && initObgSelects(); toggleObgWorkflow && toggleObgWorkflow(); populateObgPatientFromCurrent && populateObgPatientFromCurrent(); updateObgComputedFields && updateObgComputedFields(); }
  else if(pageKey==='psych')           { renderRxDrugs && renderRxDrugs(); typeof refreshRxTemplateSelects==='function'&&refreshRxTemplateSelects(); togglePsychTracks && togglePsychTracks(); renderPsychRail && renderPsychRail(); }
  else if(pageKey==='skin')            { renderRxDrugs && renderRxDrugs(); typeof refreshRxTemplateSelects==='function'&&refreshRxTemplateSelects(); renderSkinRail && renderSkinRail(); }
  else if(pageKey==='reception')       { renderReceptionPage && renderReceptionPage(); setTimeout(()=>{renderCollectionDashboard&&renderCollectionDashboard();loadCustomPurposes&&loadCustomPurposes();},100); }
  else if(pageKey==='lab')             { initLab && initLab(); renderLabOrders && renderLabOrders(); }
  else if(pageKey==='ipd')             renderIPD && renderIPD();
  else if(pageKey==='ot')              { renderOTList && renderOTList(); setTimeout(()=>{ const w=document.getElementById('who-signin-list'); const t=document.getElementById('ot-t-in'); if(w) w.style.display=''; if(t&&t.closest('.card')) t.closest('.card').style.display=''; },100); }
  else if(pageKey==='inventory')       initInventory && initInventory();
  else if(pageKey==='billing')         renderBillingPage && renderBillingPage();
  else if(pageKey==='tpa')             renderTpaPage && renderTpaPage();
  else if(pageKey==='payments')        renderPaymentsPage && renderPaymentsPage();
  else if(pageKey==='reports')         renderReports && renderReports();
  else if(pageKey==='brochures')       renderBrochures && renderBrochures();
  else if(pageKey==='centres')         renderCentresView && renderCentresView();
  else if(pageKey==='settings')        { renderSettingsPage && renderSettingsPage(); setTimeout(()=>renderConsentLibrary&&renderConsentLibrary('all'),100); }
  else if(pageKey==='discharge')       { renderDischargeBuilder && renderDischargeBuilder(); }
  if(['obg','psych','skin'].includes(pageKey)) clearSharedPrescriptionEditor();
  if(pageKey==='ophtho') renderOphthoRecap && renderOphthoRecap();
  if(pageKey==='obg') renderObgSummaryRail && renderObgSummaryRail();
  if(pageKey==='psych') renderPsychRail && renderPsychRail();
  if(pageKey==='skin') renderSkinRail && renderSkinRail();
  updateDepartmentRailVisibility(pageKey);
}

// ═══════════════════════════════════════
// RENDERS
// ═══════════════════════════════════════
function qCard(p, sno) {
  const dilMin = p.dilated && p.dilatedTime ? Math.floor((Date.now()-p.dilatedTime)/60000) : 0;
  const dilHtml = p.dilated ? `<div class="dil-badge w" id="dt-${p.bmhId.replace(/-/g,'')}">💧 ${dilMin}m</div>` : '';
  const payHtml = p.balance>0 ? `<div class="pay-badge-r">⚠️ Due ₹${p.balance.toLocaleString('en-IN')}</div>` : p.advance>0 ? `<div class="adv-badge">💙 Adv ₹${p.advance.toLocaleString('en-IN')}</div>` : '';
  const deptLabel = {ophtho:'Ophthalmology',obg:'OBG',psych:'Psychiatry',skin:'Skin'}[p.dept]||p.dept;
  const snoDiv = sno!==undefined ? `<div style="font-size:10px;font-weight:900;color:var(--g2);width:20px;text-align:center;flex-shrink:0;padding-top:2px">${sno}</div>` : '';
  return `<div class="q-card ${p.status}${p.balance>0?' pay-pending':''}" onclick="openPatient('${p.bmhId}')">
    ${snoDiv}
    <div class="q-av" style="background:${p.color}">${p.initials}</div>
    <div style="flex:1;min-width:0">
      <div class="q-name">${p.name}</div>
      <div class="q-uid">${p.bmhId}</div>
      <div class="q-sub">${deptLabel} · ${p.doctor}</div>
      <div style="font-size:10px;color:var(--g1)">${p.purpose}${p.ins?' · '+p.ins:''}</div>
      ${dilHtml}
      ${payHtml ? `<div style="margin-top:3px">${payHtml}</div>` : ''}
    </div>
    <div class="q-meta">
      <div class="q-token">${p.token}</div>
      <span class="badge ${p.status==='in-room'?'bd-blue':p.status==='done'?'bd-green':'bd-orange'}" style="margin-top:4px;font-size:9px">${p.status==='in-room'?'In Room':p.status==='done'?'Done':'Waiting'}</span>
      <div style="display:flex;flex-direction:column;gap:3px;margin-top:5px">
        <button class="btn btn-xs ${p.seen?'btn-green':'btn-gray'}" onclick="event.stopPropagation();toggleSeen('${p.bmhId}')">${p.seen?'✓ Seen':'Mark Seen'}</button>
        ${!p.dilated&&p.dept==='ophtho'?`<button class="btn btn-xs" style="background:var(--purple-lt);color:var(--purple)" onclick="event.stopPropagation();markDilated('${p.bmhId}','${p.name}')">💧</button>`:''}
      </div>
    </div>
  </div>`;
}

function payCardHtml(pr) {
  const isp = pr.status==='pending';
  const pid = pr.id.replace(/[^a-z0-9]/gi,'');
  return `<div class="pay-card ${isp?'pending':'received'}" style="margin-bottom:6px;border-radius:var(--r);overflow:hidden">
    <div style="display:flex;align-items:center;gap:9px;padding:10px 12px">
      <div style="flex:1;cursor:pointer" onclick="togglePayCard('${pid}')">
        <div style="font-size:13px;font-weight:800">${pr.patient}</div>
        <div style="font-size:11px;color:var(--tx3);margin-top:1px">${pr.for}</div>
        ${pr.from?`<div style="font-size:10px;color:var(--g1);margin-top:1px">&#128203; From: ${pr.from}</div>`:''}
      </div>
      <div style="text-align:right;flex-shrink:0;cursor:pointer" onclick="togglePayCard('${pid}')">
        <div style="font-size:16px;font-weight:900;color:${isp?'var(--orange)':'var(--green)'}">&#8377;${pr.amount.toLocaleString('en-IN')}</div>
        <span class="badge ${isp?'bd-orange':'bd-green'}" style="font-size:9.5px">${isp?'&#9203; Pending':'&#9989; Collected'}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;flex-shrink:0">
        <button title="Delete charge" style="background:var(--red-lt);color:var(--red);border:1px solid rgba(255,59,48,.3);border-radius:6px;padding:3px 8px;font-size:10px;cursor:pointer;line-height:1.4;font-weight:700" onclick="deletePayRequest('${pr.id}')">🗑️</button>
        <div style="font-size:16px;color:var(--g1);text-align:center;cursor:pointer" id="pay-chevron-${pid}" onclick="togglePayCard('${pid}')">&#8964;</div>
      </div>
    </div>
    <div id="pay-detail-${pid}" style="display:none;background:var(--g6);padding:10px 14px;border-top:1px solid var(--g4)">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;font-size:12px">
        <div><div style="font-size:9px;color:var(--g1);font-weight:700;text-transform:uppercase">BMSH ID</div><div style="font-family:monospace;font-weight:700;color:var(--bmh-teal)">${pr.bmhId||'—'}</div></div>
        <div><div style="font-size:9px;color:var(--g1);font-weight:700;text-transform:uppercase">Request ID</div><div style="font-family:monospace;font-weight:700">${pr.id}</div></div>
        <div><div style="font-size:9px;color:var(--g1);font-weight:700;text-transform:uppercase">Service</div><div style="font-weight:700">${pr.for}</div></div>
        <div><div style="font-size:9px;color:var(--g1);font-weight:700;text-transform:uppercase">Amount</div><div style="font-weight:900;color:var(--orange)">&#8377;${pr.amount.toLocaleString('en-IN')}</div></div>
      </div>
      ${isp?`<div style="display:flex;gap:7px;flex-wrap:wrap">
        <div style="flex:1"><div style="font-size:9.5px;font-weight:700;color:var(--g1);margin-bottom:4px">Payment Mode</div>
          <select id="pay-mode-${pid}" style="font-size:12px;width:100%">
            <option>Cash</option><option>UPI / PhonePe / GPay</option>
            <option>Card (Debit/Credit)</option><option>NEFT / RTGS</option>
            <option>Insurance / TPA</option><option>Cheque</option>
          </select>
        </div>
        <button class="btn btn-green" style="align-self:flex-end;padding:8px 16px;font-size:12px;font-weight:800"
          onclick="collectPayment('${pr.id}','${pid}')">&#9989; Collect &#8377;${pr.amount.toLocaleString('en-IN')}</button>
      </div>
      <div style="display:flex;gap:6px;margin-top:6px">
        <button class="btn btn-xs btn-outline" onclick="printPaymentReceipt(PAY_REQUESTS.find(r=>r.id==='${pr.id}')||{})">&#128424; Print Receipt</button>
        <button class="btn btn-xs btn-gray" onclick="cancelPayReq('${pr.id}')">Cancel</button>
      </div>`:`<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px">
        <div style="color:#1a8c3c;font-size:12px;font-weight:700">&#9989; Payment collected</div>
        <div style="display:flex;gap:5px">
          <button class="btn btn-xs btn-gold" onclick="printPaymentReceipt(PAY_REQUESTS.find(r=>r.id==='${pr.id}')||{})">&#128424; Receipt</button>
        </div>
      </div>`}
    </div>
  </div>`;
}

function togglePayCard(pid) {
  const detail = document.getElementById('pay-detail-'+pid);
  const chevron = document.getElementById('pay-chevron-'+pid);
  if(!detail) return;
  const open = detail.style.display !== 'none';
  detail.style.display = open ? 'none' : 'block';
  if(chevron) chevron.innerHTML = open ? '&#8964;' : '&#8963;';
}

function collectPayment(reqId, pid) {
  // Set mode from UI selector, then delegate to markPaid
  const modeEl = document.getElementById('pay-mode-'+pid);
  const mode = modeEl ? modeEl.value : 'Cash';
  const req = PAY_REQUESTS.find(r=>r.id===reqId);
  if(req) req.mode = mode;
  markPaid(reqId);
  // After small delay, offer receipt
  setTimeout(()=>{
    if(req && confirm(`✅ ₹${req.amount.toLocaleString('en-IN')} collected from ${req.patient}\n\nPrint receipt?`)) {
      printPaymentReceipt(req);
    }
  }, 300);
}

function cancelPayReq(reqId) {
  const idx = PAY_REQUESTS.findIndex(r=>r.id===reqId);
  if(idx>-1) PAY_REQUESTS.splice(idx,1);
  showToast('Pay request cancelled','i');
  renderReceptionPage();
}

function printPaymentReceipt(pr) {
  // pr can be a PAY_REQUEST or a TRANSACTION object
  const pt = PATIENTS.find(p=>p.bmhId===pr.bmhId)||{};
  const today = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  const time  = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  const receiptNo = 'RCP-'+(pr.id||'').slice(-6).toUpperCase()||('RCP-'+Math.floor(Math.random()*999999));
  const amount = pr.amount || 0;
  const mode   = pr.mode || 'Cash';
  const service = pr.for || pr.service || 'Consultation';
  const patName = pr.patient || pt.name || '—';
  const bmhId   = pr.bmhId || '—';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Receipt</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Arial,sans-serif;font-size:12px;color:#111;background:#fff;width:280px;margin:0 auto;padding:8px}
    .hdr{text-align:center;border-bottom:2px solid #1A3C6E;padding-bottom:8px;margin-bottom:10px}
    .hdr h1{font-size:15px;color:#1A3C6E;font-weight:900}
    .hdr p{font-size:10px;color:#666;margin-top:2px}
    .badge{display:inline-block;background:#D4A017;color:#1A3C6E;font-weight:900;padding:2px 10px;border-radius:20px;font-size:11px;margin:6px 0}
    .row{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px dashed #eee;font-size:11.5px}
    .row.total{font-size:14px;font-weight:900;border-bottom:2px solid #1A3C6E;border-top:2px solid #1A3C6E;padding:6px 0;margin-top:4px}
    .row.total span:last-child{color:#1A3C6E}
    .footer{text-align:center;font-size:9.5px;color:#888;margin-top:12px;line-height:1.6}
    @media print{button{display:none!important}}
  </style></head><body>
  <div class="hdr">
    <h1>Baweja Multispeciality Hospital</h1>
    <p>Chandigarh · Ropar · +91-81466 22802</p>
  </div>
  <div style="text-align:center"><div class="badge">RECEIPT</div></div>
  <div class="row"><span style="color:#888">Receipt No.</span><span style="font-family:monospace;font-weight:700">${receiptNo}</span></div>
  <div class="row"><span style="color:#888">Date &amp; Time</span><span>${today} ${time}</span></div>
  <div class="row"><span style="color:#888">Patient</span><span style="font-weight:800">${patName}</span></div>
  <div class="row"><span style="color:#888">BMSH ID</span><span style="font-family:monospace;color:#0B7B8C">${bmhId}</span></div>
  ${pt.age?`<div class="row"><span style="color:#888">Age / Sex</span><span>${pt.age}Y / ${pt.sex||'—'}</span></div>`:''}
  <div class="row"><span style="color:#888">Service</span><span>${service}</span></div>
  <div class="row"><span style="color:#888">Payment Mode</span><span>${mode}</span></div>
  <div class="row total"><span>Total Amount</span><span>₹${Math.abs(amount).toLocaleString('en-IN')}</span></div>
  <div class="footer">
    Thank you for choosing Baweja Multispeciality Hospital<br>
    This is a computer-generated receipt · No GST applicable<br>
    <button onclick="window.print()" style="margin-top:8px;padding:4px 14px;background:#1A3C6E;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:11px">🖨️ Print</button>
  </div>
  <script>window.onload=()=>window.print()<\/script>
  </body></html>`;
  const w = window.open('','_blank','width=340,height=500');
  if(w) { w.document.write(html); w.document.close(); }
}

// Alias for backward compat
function printReceiptForPR(prId) {
  const pr = PAY_REQUESTS.find(r=>r.id===prId) || TRANSACTIONS.find(t=>t.id===prId);
  if(pr) printPaymentReceipt(pr); else showToast('Receipt not found','w');
}





function aptCard(a) {
  const typeColor = {new:'bd-blue',followup:'bd-green','post-op':'bd-orange',anc:'bd-purple',surgery:'bd-red'};
  return `<div class="apt-slot booked" style="font-size:12px">
    <div style="font-size:16px">${a.type==='surgery'?'⚕️':a.type==='post-op'?'👁️':a.type==='anc'?'🤰':'🩺'}</div>
    <div style="flex:1"><div style="font-weight:800">${a.patient}</div><div style="font-size:10px;font-family:var(--mono);color:var(--bmh-teal)">${a.bmhId}</div><div style="font-size:10.5px;color:var(--g1);margin-top:1px">${a.purpose}</div></div>
    <div style="text-align:right;flex-shrink:0"><div style="font-weight:900;color:var(--bmh-blue)">${a.time}</div><span class="badge ${typeColor[a.type]||'bd-gray'}" style="font-size:9.5px">${a.centre}</span></div>
  </div>`;
}

function renderAppointments() {
  document.getElementById('apt-date-inp').value = new Date().toISOString().split('T')[0];
  renderAptDay();
  const tl = document.getElementById('apt-today-list'); if (tl) tl.innerHTML = APPOINTMENTS.filter(a=>a.date===new Date().toISOString().split('T')[0]).map(aptCard).join('') || '<div style="padding:12px;text-align:center;color:var(--g1);font-size:12px">No appointments today</div>';
  const ul = document.getElementById('apt-upcoming'); if (ul) ul.innerHTML = APPOINTMENTS.slice(0,4).map(a=>`<div style="display:flex;align-items:center;gap:9px;padding:8px;border-bottom:1px solid var(--g5);font-size:12px;cursor:pointer"><span style="font-size:14px">📅</span><div style="flex:1"><div style="font-weight:800">${a.patient}</div><div style="font-size:10.5px;color:var(--g1)">${a.purpose} · ${a.date}</div></div><span class="badge bd-blue">${a.time}</span></div>`).join('');
}





function loadTplDocs() {
  const sel = document.getElementById('tpl-sel')?.value;
  const tpl = TEMPLATES.find(t => t.id === sel);
  if (!tpl) return;
  const el = document.getElementById('tpl-doc-checklist'); if (!el) return;
  el.innerHTML = tpl.docs.map(d => {
    const doc = ALL_DOCS.find(x => x.id === d);
    return doc ? `<div class="tpl-doc-item checked" id="tpl-d-${d}" onclick="this.classList.toggle('checked');this.querySelector('.tpl-check').textContent=this.classList.contains('checked')?'✓':''"><div class="tpl-check">✓</div><span style="font-size:16px">${doc.icon}</span><div style="flex:1"><div style="font-size:12.5px;font-weight:800">${doc.name}</div></div></div>` : '';
  }).join('');
}

function openPrintPack(tplId) {
  document.getElementById('tpl-sel').value = tplId;
  loadTplDocs();
  openM('m-print-tpl');
}

function printSelectedDocs() {
  const checked = document.querySelectorAll('#tpl-doc-checklist .tpl-doc-item.checked');
  const names = Array.from(checked).map(el => el.querySelector('.tpl-doc-item div:nth-child(3) div:first-child')?.textContent || 'Doc');
  showToast(`🖨️ Printing ${checked.length} documents for Test Patient A ✓`, 's');
  setTimeout(() => window.print(), 400);
}

function renderConsent() {
  const type = document.getElementById('consent-type-sel')?.value || 'cataract';
  const lang = document.getElementById('consent-lang-sel')?.value || 'pa';
  const data = getConsentEntry(type) || getConsentEntry('cataract');
  const el = document.getElementById('consent-content'); if (!el) return;
  el.innerHTML = buildConsentHTML(data, lang);
}

function _getConsentPatientHeaderUpload() {
  const ptIds = ['ophtho-pt-uid', 'obg-pt-uid', 'psych-pt-uid', 'skin-pt-uid'];
  const ptNms = ['ophtho-pt-nm', 'obg-pt-nm', 'psych-pt-nm', 'skin-pt-nm'];
  let ptId = '—'; let ptNm = '— Select Patient —';
  for (let i = 0; i < ptIds.length; i++) {
    const v = document.getElementById(ptIds[i])?.textContent?.trim();
    if (v && v !== '—' && v.startsWith('BMSH-')) { ptId = v; ptNm = document.getElementById(ptNms[i])?.textContent || ptNm; break; }
  }
  const pt = (typeof PATIENTS !== 'undefined' && PATIENTS.find) ? PATIENTS.find(function (p) { return p.bmhId === ptId; }) || {} : {};
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  return { name: ptNm, id: ptId, age: pt.age || '—', sex: pt.sex || '—', mob: pt.mob || '', date: today, doctor: window.CURRENT_USER?.name || '—' };
}
function buildConsentHTML(data, lang, pt) {
  const localKey = lang === 'pa' ? 'pa' : 'hi';
  const p = pt || _getConsentPatientHeader();
  const ptName = p.name || document.getElementById('ophtho-pt-nm')?.textContent || '—';
  const ptId = p.id || document.getElementById('ophtho-pt-uid')?.textContent || '—';
  const today = p.date || new Date().toLocaleDateString('en-IN');
  const doc = p.doctor || window.CURRENT_USER?.name || '—';
  const paras = data.paras || [];
  return '<div style="margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--bmh-gold)">'
    + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">'
    + '<img src="https://bawejahospital.com/img/logo.png" style="height:32px;object-fit:contain" alt="BMH" onerror="this.style.display=\'none\'">'
    + '<div><div style="font-size:15px;font-weight:900;color:var(--bmh-blue)">Baweja Multispeciality Hospital</div>'
    + '<div style="font-size:11px;color:var(--g1)">Chandigarh & Ropar · +91-81466 22802</div></div></div>'
    + '<div style="font-size:14px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px">' + String(data.title || '') + '</div>'
    + '<div style="margin-top:6px;background:linear-gradient(135deg,#1A3C6E,#0B7B8C);border-radius:7px;padding:7px 12px;color:#fff;font-size:11px;display:flex;gap:14px;flex-wrap:wrap;align-items:center">'
    + '<span style="font-weight:900;font-size:13px;color:#FFD600">' + String(ptName) + '</span>'
    + '<span>🪪 ' + String(ptId) + '</span>'
    + (p.age ? '<span>👤 ' + String(p.age) + ' / ' + String(p.sex || '—') + '</span>' : '')
    + (p.mob ? '<span>📞 ' + String(p.mob) + '</span>' : '')
    + '<span>📅 ' + String(today) + '</span><span>🩺 ' + String(doc) + '</span></div></div>'
    + paras.map(function (p0, i) {
      return '<div class="consent-para"><div class="consent-eng" style="font-size:12.5px;line-height:1.7;color:var(--tx)">' + (i + 1) + '. ' + String(p0.en || '') + '</div>'
        + '<div class="consent-local" style="font-size:12px;color:var(--g1);margin-top:2px">' + String(p0[localKey] || '') + '</div></div>';
    }).join('')
    + '<div style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">'
    + '<div><div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;margin-bottom:24px">Patient / Attendant Signature</div><div style="border-bottom:1px solid var(--tx);margin-bottom:4px"></div><div style="font-size:10px;color:var(--g1)">Name, Relationship & Date</div></div>'
    + '<div><div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;margin-bottom:24px">Witness Signature</div><div style="border-bottom:1px solid var(--tx);margin-bottom:4px"></div><div style="font-size:10px;color:var(--g1)">Name & Date</div></div>'
    + '<div><div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;margin-bottom:24px">Doctor\'s Signature</div><div style="border-bottom:1px solid var(--tx);margin-bottom:4px"></div><div style="font-size:10px;color:var(--g1)">' + String(doc) + ' · ' + String(today) + '</div></div></div>';
}
function renderConsentModal() {
  const ptIds = ['ophtho-pt-uid', 'obg-pt-uid', 'psych-pt-uid', 'skin-pt-uid'];
  const ptNms = ['ophtho-pt-nm', 'obg-pt-nm', 'psych-pt-nm', 'skin-pt-nm'];
  let ptId = '—'; let ptNm = '—';
  for (let i = 0; i < ptIds.length; i++) {
    const v = document.getElementById(ptIds[i])?.textContent?.trim();
    if (v && v !== '—' && v.startsWith('BMSH-')) { ptId = v; ptNm = document.getElementById(ptNms[i])?.textContent || ptNm; break; }
  }
  const pt = (typeof PATIENTS !== 'undefined' && PATIENTS.find) ? PATIENTS.find(function (p) { return p.bmhId === ptId; }) || {} : {};
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const nb = document.getElementById('cmb-name'); if (nb) nb.textContent = ptNm;
  const ib = document.getElementById('cmb-id'); if (ib) ib.textContent = ptId;
  const ab = document.getElementById('cmb-age'); if (ab) ab.textContent = pt.age || '—';
  const sb = document.getElementById('cmb-sex'); if (sb) sb.textContent = pt.sex || '—';
  const mb = document.getElementById('cmb-mob'); if (mb) mb.textContent = pt.mob || '—';
  const db = document.getElementById('cmb-date'); if (db) db.textContent = today;
  const xb = document.getElementById('cmb-doc'); if (xb) xb.textContent = window.CURRENT_USER?.name || '—';
  const type = document.getElementById('mc-type')?.value || 'cataract';
  const lang = document.getElementById('mc-lang')?.value || 'pa';
  const data = getConsentEntry(type) || getConsentEntry('cataract');
  const el = document.getElementById('modal-consent-content'); if (!el) return;
  el.innerHTML = buildConsentHTML(data, lang, { name: ptNm, id: ptId, age: pt.age || '—', sex: pt.sex || '—', mob: pt.mob || '—', date: today, doctor: window.CURRENT_USER?.name || '—' });
}
function printConsentModal() {
  const type = document.getElementById('mc-type')?.value || 'cataract';
  const data = getConsentEntry(type) || getConsentEntry('cataract');
  printStructuredConsentThreeVariants(data);
}

// renderConsentModal and buildConsentHTML defined below (upgraded versions)
function editConsentPara(idx) { showToast('Paragraph editor opened — type to edit text ✓','i'); }

// ═══════════════════════════════════════
// PRESCRIPTION / RX
// ═══════════════════════════════════════
const RX_DRUGS = [];
let rxLang = 'en';
function setRxLang(lang) {
  rxLang = lang || 'en';
  renderRxDrugs && renderRxDrugs();
}
function setLang(lang, btn) {
  rxLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRxDrugs();
}

function addRxDrug() {
  RX_DRUGS.push({name:'New Drop / Drug',brand:'',eye:['OU'],freq:'',dur:'',lang:{en:'Enter instructions…',hi:'',pa:''}});
  renderRxDrugs();
  showToast('Drug added — edit name and instructions ✓','s');
}
function removeDrug(i) { RX_DRUGS.splice(i,1); renderRxDrugs(); }
function toggleEye(drugIdx, eye, el) {
  const d = RX_DRUGS[drugIdx]; if (!d) return;
  if (d.eye.includes(eye)) d.eye = d.eye.filter(e=>e!==eye);
  else d.eye.push(eye);
  renderRxDrugs();
}

// ═══════════════════════════════════════
// IOP
// ═══════════════════════════════════════


// ═══════════════════════════════════════
// SLIT LAMP
// ═══════════════════════════════════════
function toggleChip(el) { el.classList.toggle('sl-chip'); el.classList.toggle('sl-chip sel'); }
// Normal chip labels per section — selecting any non-normal chip auto-removes these
const SL_NORMAL_CHIPS = ['Normal','Clear','Deep & Clear','Round & Reacting'];
function toggleChipEye(el, eye) {
  const chipText = el.textContent.trim();
  const isNormal = SL_NORMAL_CHIPS.includes(chipText);
  const container = el.closest('[style*="display:flex;gap:4px"]') || el.parentElement;
  const wasSelected = el.classList.contains('sel');

  if(!wasSelected) {
    // Selecting this chip
    el.classList.add('sel');
    // If this is a NORMAL chip, deselect all other chips in same container
    if(isNormal) {
      container.querySelectorAll('.sl-chip.sel').forEach(c=>{
        if(c !== el) { c.classList.remove('sel'); c.style.background=''; c.style.color=''; c.style.borderColor=''; }
      });
    } else {
      // If this is an ABNORMAL chip, deselect any normal chips in same container
      container.querySelectorAll('.sl-chip.sel').forEach(c=>{
        if(c !== el && SL_NORMAL_CHIPS.includes(c.textContent.trim())) {
          c.classList.remove('sel'); c.style.background=''; c.style.color=''; c.style.borderColor='';
        }
      });
    }
    el.style.background = eye==='od' ? 'var(--blue)' : 'var(--green)';
    el.style.color = '#fff';
    el.style.borderColor = eye==='od' ? 'var(--blue)' : 'var(--green)';
  } else {
    // Deselecting
    el.classList.remove('sel');
    el.style.background=''; el.style.color=''; el.style.borderColor='';
  }
}
function addSlitLampRow() {
  const label = prompt('Enter finding label (e.g. Corneal Guttata, Angle, Other):');
  if(!label) return;
  const container = document.getElementById('sl-extra-rows');
  if(!container) return;
  const id = 'sl-extra-' + Date.now();
  const d = document.createElement('div');
  d.style.cssText = 'display:grid;grid-template-columns:90px 1fr 1fr;gap:8px;margin-bottom:10px;align-items:start';
  d.innerHTML = `
    <div style="display:flex;align-items:center;gap:4px">
      <span style="font-size:9.5px;font-weight:900;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.8px">${label}</span>
      <button onclick="this.closest('div').closest('div').remove()" style="background:rgba(255,60,60,.4);color:#fff;border:none;border-radius:3px;padding:1px 4px;font-size:9px;cursor:pointer">✕</button>
    </div>
    <div style="background:rgba(30,80,200,.2);border-radius:6px;padding:6px 8px">
      <div style="font-size:8.5px;font-weight:800;color:rgba(100,180,255,.8);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">OD</div>
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        <span class="sl-chip sel" onclick="toggleChipEye(this,'od')">Normal</span>
        <span class="sl-chip" onclick="toggleChipEye(this,'od')">Abnormal</span>
        <span class="sl-chip" onclick="addCustomChip(this,'od')">+ Add</span>
      </div>
      <input type="text" placeholder="Free text OD…" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:5px;padding:3px 6px;font-size:11px;width:100%;margin-top:5px">
    </div>
    <div style="background:rgba(30,160,80,.15);border-radius:6px;padding:6px 8px">
      <div style="font-size:8.5px;font-weight:800;color:rgba(100,220,140,.8);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">OS</div>
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        <span class="sl-chip sel" onclick="toggleChipEye(this,'os')">Normal</span>
        <span class="sl-chip" onclick="toggleChipEye(this,'os')">Abnormal</span>
        <span class="sl-chip" onclick="addCustomChip(this,'os')">+ Add</span>
      </div>
      <input type="text" placeholder="Free text OS…" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;border-radius:5px;padding:3px 6px;font-size:11px;width:100%;margin-top:5px">
    </div>`;
  container.appendChild(d);
  showToast('Row "'+label+'" added ✓','s');
}
function addCustomChip(triggerEl, eye) {
  const val = prompt('Add finding:');
  if(!val) return;
  const container = triggerEl.closest('div[style*="flex-wrap"]');
  const newChip = document.createElement('span');
  newChip.className = 'sl-chip sel';
  newChip.textContent = val;
  newChip.onclick = function(){ toggleChipEye(this, eye); };
  toggleChipEye(newChip, eye);
  container.insertBefore(newChip, triggerEl);
  showToast('"'+val+'" added ✓','i');
}

// ═══════════════════════════════════════
// QR
// ═══════════════════════════════════════
function initQR() {
  // Replace canvas with a real QR code image that encodes the patient's BMSH ID
  const canvas = document.getElementById('qr-canvas');
  if (!canvas) return;
  const bmhId = window.CURRENT_PATIENT?.bmhId || document.getElementById('ophtho-pt-uid')?.textContent || 'BMSH';
  // Use qrserver.com API — renders a real scannable QR code
  const img = document.createElement('img');
  img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=' + encodeURIComponent(bmhId) + '&color=1A3C6E&bgcolor=ffffff&margin=2';
  img.width = 80; img.height = 80;
  img.style.cssText = 'display:block;border-radius:4px';
  img.alt = bmhId;
  canvas.parentNode.replaceChild(img, canvas);
}

// ═══════════════════════════════════════
// INTERACTIONS
// ═══════════════════════════════════════
function openPatient(bmhId) {
  const p = PATIENTS.find(x => x.bmhId === bmhId);
  if(!p) return;

  // ── Set global current patient for printOphthoSheet etc. ───────
  window.CURRENT_PATIENT = p;

  // ── 1. Stamp patient name & ID into every dept header ──────────
  ['ophtho-pt-nm','obg-pt-nm','psych-pt-nm','skin-pt-nm','ophtho-rp-nm'].forEach(id => {
    const e = document.getElementById(id); if(e) e.textContent = p.name;
  });
  ['ophtho-pt-uid','obg-pt-uid','psych-pt-uid','skin-pt-uid'].forEach(id => {
    const e = document.getElementById(id); if(e) e.textContent = p.bmhId;
  });
  ['obg-rx-ptname','psych-rx-ptname','skin-rx-ptname','oe-rx-ptname'].forEach(id => {
    const e = document.getElementById(id); if(e) e.textContent = p.name;
  });
  ['obg-rx-ptid','psych-rx-ptid','skin-rx-ptid','oe-rx-ptid'].forEach(id => {
    const e = document.getElementById(id); if(e) e.textContent = p.bmhId;
  });
  ['obg-rx-agesex','psych-rx-agesex','skin-rx-agesex','oe-rx-agesex'].forEach(id => {
    const e = document.getElementById(id); if(e) e.textContent = (p.age||'—') + 'Y / ' + (p.sex||'—');
  });

  // ── 2. Complete clean slate — every input/select/textarea reset ─
  // All text/number/date inputs in exam pages
  document.querySelectorAll('#pg-ophtho input, #pg-obg input, #pg-psych input, #pg-skin input')
    .forEach(el => { if(el.type!=='checkbox' && el.type!=='button') el.value = ''; });
  // All textareas
  document.querySelectorAll('#pg-ophtho textarea, #pg-obg textarea, #pg-psych textarea, #pg-skin textarea')
    .forEach(el => { el.value = ''; });
  // All selects — reset to index 0 (blank/first option)
  document.querySelectorAll('#pg-ophtho select, #pg-obg select, #pg-psych select, #pg-skin select')
    .forEach(el => { el.selectedIndex = 0; });
  // Personal history selects — default to "N" (No)
  document.querySelectorAll('[id^="phx-"]').forEach(el => { if(el.tagName === 'SELECT') el.value = 'N'; });
  // All checkboxes unchecked
  document.querySelectorAll('#pg-ophtho input[type=checkbox], #pg-obg input[type=checkbox], #pg-psych input[type=checkbox], #pg-skin input[type=checkbox]')
    .forEach(el => { el.checked = false; });
  // Slit lamp chips — deselect all, then re-select defaults (Normal chips)
  document.querySelectorAll('.sl-chip').forEach(c => {
    c.classList.remove('sel');
    if(c.textContent.trim() === 'Normal' || c.textContent.trim() === 'Clear' ||
       c.textContent.trim() === 'Deep & Clear' || c.textContent.trim() === 'Round & Reacting') {
      c.classList.add('sel');
    }
  });
  // DX list — clear all including tags
  const dxList = document.getElementById('rx-diagnosis-list');
  if(dxList) dxList.innerHTML = '';
  // Procedures/surgery list — clear
  const procList = document.getElementById('rx-proc-advised');
  if(procList) procList.innerHTML = '';
  // CC rows — clear all inputs/selects to show 3 blank rows
  const ccContainer = document.getElementById('cc-rows');
  if(ccContainer) {
    ccContainer.querySelectorAll('.cc-row').forEach((row, idx) => {
      const inp = row.querySelector('.cc-inp'); if(inp) inp.value = '';
      const dur = row.querySelector('.cc-dur'); if(dur) dur.value = '';
      const eye = row.querySelector('.cc-eye'); if(eye) eye.selectedIndex = 0;
      // Hide rows beyond the first 3; keep at least 3 visible
      row.style.display = idx < 3 ? '' : 'none';
    });
  }
  // IOP badges — reset to blank state
  const iopOdVal = document.getElementById('iop-od-val'); if(iopOdVal) iopOdVal.textContent = '—';
  const iopOsVal = document.getElementById('iop-os-val'); if(iopOsVal) iopOsVal.textContent = '—';
  const iopOdNote = document.getElementById('iop-od-note'); if(iopOdNote) iopOdNote.textContent = 'mmHg';
  const iopOsNote = document.getElementById('iop-os-note'); if(iopOsNote) iopOsNote.textContent = 'mmHg';
  const eOd = document.getElementById('iop-od-ehlers'); if(eOd) eOd.textContent='';
  const eOs = document.getElementById('iop-os-ehlers'); if(eOs) eOs.textContent='';
  const iodBox = document.getElementById('iop-od-box');
  if(iodBox){ iodBox.style.background='var(--green-lt)'; iodBox.style.borderColor='var(--green)';
    iodBox.querySelectorAll('span').forEach(s=>s.style.color='#1a8c3c'); }
  const iosBox = document.getElementById('iop-os-box');
  if(iosBox){ iosBox.style.background='var(--green-lt)'; iosBox.style.borderColor='var(--green)';
    iosBox.querySelectorAll('span').forEach(s=>s.style.color='#1a8c3c'); }
  const corrOd = document.getElementById('iop-corr-od'); if(corrOd) corrOd.textContent='';
  const corrOs = document.getElementById('iop-corr-os'); if(corrOs) corrOs.textContent='';
  // IOP alert banner
  const iab = document.getElementById('iop-alert-banner'); if(iab) iab.style.display='none';

  // ── 3. Reset prescription ──────────────────────────────────────
  if(typeof RX_DRUGS !== 'undefined') RX_DRUGS.length = 0;
  if(typeof SELECTED_INVESTIGATIONS !== 'undefined') SELECTED_INVESTIGATIONS.length = 0;
  typeof renderRxDrugs === 'function' && renderRxDrugs();
  const rxAdvice = document.getElementById('rx-advice-text'); if(rxAdvice) rxAdvice.value='';
  syncCurrentPatientInvestigationOrders();
  syncSelectedInvestigationCheckboxes && syncSelectedInvestigationCheckboxes();
  renderOeInvOrderedList && renderOeInvOrderedList();
  renderInvestigationOrders && renderInvestigationOrders();
  renderCurrentPatientInvestigationUploads && renderCurrentPatientInvestigationUploads();
  renderOphthoRecap && renderOphthoRecap();
  initObgSelects && initObgSelects();
  populateObgPatientFromCurrent && populateObgPatientFromCurrent();

  // ── 4. Navigate to dept ────────────────────────────────────────
  const deptPage = { ophtho:'ophtho', obg:'obg', psych:'psych', skin:'skin' }[p.dept] || 'ophtho';
  nav(deptPage, null);

  if(p.dept === 'ophtho' && p.lastVisit && typeof p.lastVisit === 'object') {
    populateOphthoForm(p.lastVisit);
  } else if(p.dept === 'obg') {
    populateObgForm && populateObgForm(p.lastVisit || {});
  } else if(p.dept === 'psych') {
    populatePsychForm && populatePsychForm(p.lastVisit || {});
  } else if(p.dept === 'skin') {
    populateSkinForm && populateSkinForm(p.lastVisit || {});
  }

  // ── 5. Load past visits list + try to reload today's visit ─────
  setTimeout(() => {
    loadPastVisits(p.bmhId, p.dept);
    if(p.dept === 'ophtho') loadTodayVisitIntoForm(p.bmhId);
    renderCurrentPatientInvestigationUploads && renderCurrentPatientInvestigationUploads();
    renderOphthoRecap && renderOphthoRecap();
    if(p.dept === 'psych') renderPsychRail && renderPsychRail();
    if(p.dept === 'skin') renderSkinRail && renderSkinRail();
  }, 300);
}

/** Reception queue: open patient finances & visits — does not navigate to doctor examination. */
function openReceptionPatient(bmhId) {
  const p = PATIENTS.find(x => x.bmhId === bmhId);
  if(!p) { showToast('Patient not found', 'w'); return; }
  window.CURRENT_PATIENT = p;
  nav('reception', null);
  let m = document.getElementById('m-rc-patient');
  if(!m) {
    m = document.createElement('div');
    m.id = 'm-rc-patient';
    m.className = 'modal-ov';
    document.body.appendChild(m);
  }
  const txns = (TRANSACTIONS || []).filter(t => t.bmhId === bmhId).slice().reverse();
  const prs = (PAY_REQUESTS || []).filter(r => r.bmhId === bmhId);
  const pend = prs.filter(r => r.status === 'pending');
  const pendAmt = pend.reduce((s, r) => s + (Number(r.amount) || 0), 0);
  const adv = Number(p.advance) || 0;
  const bal = Number(p.balance) || 0;
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const chargeOpts = (CHARGES_DATA || []).slice().sort(function (a, b) { return String(a.name||'').localeCompare(String(b.name||'')); }).map(function (c) {
    const amt = getChargeForProcedure(c.name, p.centre || CURRENT_USER?.centre || 'CHD');
    return '<option value="' + esc(c.name) + '|' + String(amt) + '">' + esc(c.name) + ' — ₹' + Number(amt || 0).toLocaleString('en-IN') + '</option>';
  }).join('');
  m.innerHTML = '<div class="modal" style="max-width:520px;max-height:90vh;overflow:auto">'
    + '<div class="modal-hd"><div class="modal-title">🏥 ' + esc(p.name) + '</div><button type="button" class="modal-close" onclick="closeM(\'m-rc-patient\')">✕</button></div>'
    + '<div style="padding:14px 16px;font-size:12px;line-height:1.5">'
    + '<div style="font-family:var(--mono);color:var(--bmh-teal);font-weight:800;margin-bottom:6px">' + esc(p.bmhId) + '</div>'
    + '<div style="color:var(--g1);margin-bottom:10px">' + esc(p.age || '—') + ' · ' + esc(p.sex || '—') + ' · ' + esc(p.mob || '—') + '</div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">'
    + '<span class="badge bd-gray">Purpose: ' + esc(p.purpose || '—') + '</span>'
    + (adv > 0 ? '<span class="badge bd-blue">Advance ₹' + adv.toLocaleString('en-IN') + '</span>' : '')
    + (pendAmt > 0 ? '<span class="badge bd-orange">Due ₹' + pendAmt.toLocaleString('en-IN') + '</span>' : '')
    + (bal > 0 ? '<span class="badge bd-orange">Balance ₹' + bal.toLocaleString('en-IN') + '</span>' : '')
    + '</div>'
    + '<div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;margin-bottom:6px">Payment history</div>'
    + (txns.length ? '<div style="max-height:200px;overflow:auto;border:1px solid var(--g5);border-radius:8px;padding:8px;background:var(--g6)">' + txns.map(t => {
      const tag = t.type === 'advance' ? '<span class="badge bd-blue" style="font-size:8px">Adv</span>' : '';
      return '<div style="display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--g5);font-size:11.5px">'
        + '<div><div style="font-weight:700">' + esc(t.service || '—') + '</div><div style="font-size:10px;color:var(--g1)">' + esc(t.time || '') + ' · ' + esc(t.mode || '') + '</div></div>'
        + '<div style="text-align:right;font-weight:800">' + tag + ' ₹' + (Number(t.amount) || 0).toLocaleString('en-IN') + '</div></div>';
    }).join('') + '</div>' : '<div style="color:var(--g1);font-size:12px">No transactions recorded.</div>')
    + '<div style="margin-top:14px;padding:10px;border:1px solid var(--g5);border-radius:8px;background:var(--g6)">'
    + '<label style="display:flex;align-items:center;gap:8px;font-size:12px;font-weight:800;color:var(--bmh-blue);cursor:pointer"><input type="checkbox" id="rc-more-charge-toggle" onchange="document.getElementById(\'rc-more-charge-wrap\').style.display=this.checked?\'block\':\'none\'"> Add more charges</label>'
    + '<div id="rc-more-charge-wrap" style="display:none;margin-top:10px">'
    + '<div style="display:flex;gap:8px;align-items:end;flex-wrap:wrap">'
    + '<div style="flex:1"><label class="fl">Charge from settings</label><select id="rc-more-charge-select" style="font-size:12px"><option value="">— Select charge —</option>' + chargeOpts + '</select></div>'
    + '<button type="button" class="btn btn-gold btn-sm" onclick="addReceptionPatientCharge(\'' + String(bmhId).replace(/'/g, "\\'") + '\')">+ Add to final bill</button>'
    + '</div></div></div>'
    + '<div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:8px">'
    + '<button type="button" class="btn btn-gold btn-sm" onclick="rcOpenBillingFor(\'' + String(bmhId).replace(/'/g, "\\'") + '\')">💳 Billing / charges</button>'
    + '<button type="button" class="btn btn-outline btn-sm" onclick="closeM(\'m-rc-patient\');openPatient(\'' + String(bmhId).replace(/'/g, "\\'") + '\')">👁️ Open doctor record</button>'
    + '</div></div></div>';
  openM('m-rc-patient');
}
window.openReceptionPatient = openReceptionPatient;
function addReceptionPatientCharge(bmhId) {
  const sel = document.getElementById('rc-more-charge-select');
  if (!sel || !sel.value) { showToast('Select a charge first', 'w'); return; }
  const parts = sel.value.split('|');
  const desc = parts[0] || 'Charge';
  const amt = Number(parts[1] || 0);
  addBmhPatientCharge(bmhId, { id: 'rcx' + Date.now(), cat: inferChargeCategoryFromService(desc), desc: desc, qty: 1, rate: amt, amount: amt, source: 'reception-extra', ts: new Date().toISOString() });
  const pt = PATIENTS.find(function (x) { return x.bmhId === bmhId; });
  if (pt) {
    pt.balance = Number(pt.balance || 0) + amt;
    fbUpdate && fbUpdate('patients/' + bmhId, { balance: pt.balance }).catch(function () {});
  }
  renderReceptionPage && renderReceptionPage();
  renderBillingPageIfActive && renderBillingPageIfActive();
  showToast(desc + ' added to final bill ✓', 's');
}
window.addReceptionPatientCharge = addReceptionPatientCharge;

function rcOpenBillingFor(bmhId) {
  closeM('m-rc-patient');
  nav('billing', null);
  const tab = Array.from(document.querySelectorAll('#pg-billing .ptab')).find(x => x.textContent.includes('Patients'));
  if(tab) ptab(tab, 'bmh-bill-tab-patients');
  window._bmhBillFocusPatient = bmhId;
  const scopeEl = document.getElementById('bmh-bill-patient-scope');
  if (scopeEl) scopeEl.value = 'focus';
  const sel = document.getElementById('bmh-bill-pt-select');
  if(sel) sel.value = bmhId;
  window._bmhSelectedBillPatient = bmhId;
  if(typeof bmhSelectBillPatient === 'function') bmhSelectBillPatient(bmhId);
}
window.rcOpenBillingFor = rcOpenBillingFor;

// ═══════════════════════════════════════════════════════════════════
// loadTodayVisitIntoForm — if a visit was saved TODAY for this patient,
// reload it into the form. Next day → form stays blank (fresh start).
// ═══════════════════════════════════════════════════════════════════
function loadTodayVisitIntoForm(bmhId) {
  if(!bmhId || bmhId==='—') return;
  const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  fbOnce('visits/' + bmhId, data => {
    if(!data) return;
    // Find the most recent visit saved TODAY for ophtho
    const todayVisits = Object.values(data)
      .filter(v => v.dept === 'ophtho' && v.date && v.date.startsWith(todayStr))
      .sort((a,b) => b.date.localeCompare(a.date));
    if(!todayVisits.length) return; // No visit today → leave form blank
    const v = todayVisits[0];
    populateOphthoForm(v);
    showToast("Today's visit data restored ✓", 'i');
  });
}

function populateOphthoForm(v) {
  function setV(id, val) { const el=document.getElementById(id); if(el&&val!==undefined&&val!==null) el.value=val; }
  function setSel(id, val) { const el=document.getElementById(id); if(el&&val){ for(let i=0;i<el.options.length;i++){if(el.options[i].value===val||el.options[i].text===val){el.selectedIndex=i;break;}} } }

  // Visual Acuity
  setSel('ucva-od-dist', v.vaOD);    setSel('ucva-os-dist', v.vaOS);
  setSel('ucva-od-near', v.vaODNear); setSel('ucva-os-near', v.vaOSNear);

  // IOP
  setV('iop-gat-od', v.iopGatOD); setV('iop-gat-os', v.iopGatOS);
  setV('iop-nct-od', v.iopNctOD); setV('iop-nct-os', v.iopNctOS);
  setV('pachy-od', v.pachyOD);    setV('pachy-os', v.pachyOS);
  setSel('gonio-od', v.gonioOD);  setSel('gonio-os', v.gonioOS);
  // Trigger IOP badge update
  if(v.iopGatOD) { typeof updIOP==='function' && updIOP('od', v.iopGatOD); }
  if(v.iopGatOS) { typeof updIOP==='function' && updIOP('os', v.iopGatOS); }
  if(v.pachyOD || v.pachyOS) { typeof updIOPWithPachy==='function' && updIOPWithPachy(); }

  // Refraction — Current Spectacles
  setSel('rf-od-sph2', v.rfODsph); setSel('rf-od-cyl2', v.rfODcyl); setSel('rf-od-ax2', v.rfODax);
  setSel('rf-os-sph2', v.rfOSsph); setSel('rf-os-cyl2', v.rfOScyl); setSel('rf-os-ax2', v.rfOSax);
  // Refraction — Cycloplegic
  setSel('cyc-od-sph', v.cycODsph); setSel('cyc-od-cyl', v.cycODcyl); setSel('cyc-od-ax', v.cycODax);
  setSel('cyc-os-sph', v.cycOSsph); setSel('cyc-os-cyl', v.cycOScyl); setSel('cyc-os-ax', v.cycOSax);
  // Refraction — Subjective
  setSel('subj-od-sph', v.subjODsph); setSel('subj-od-cyl', v.subjODcyl); setSel('subj-od-ax', v.subjODax);
  setSel('subj-os-sph', v.subjOSsph); setSel('subj-os-cyl', v.subjOScyl); setSel('subj-os-ax', v.subjOSax);

  // Fundus
  setSel('fund-od-disc', v.fundODdisc); setSel('fund-od-cd', v.fundODcd);
  setSel('fund-od-mac',  v.fundODmac);  setSel('fund-od-ves', v.fundODves);
  setSel('fund-od-per',  v.fundODper);  setV('fundus-od', v.fundODtext);
  setSel('fund-os-disc', v.fundOSdisc); setSel('fund-os-cd', v.fundOScd);
  setSel('fund-os-mac',  v.fundOSmac);  setSel('fund-os-ves', v.fundOSves);
  setSel('fund-os-per',  v.fundOSper);  setV('fundus-os', v.fundOStext);

  // Slit lamp chips
  if(v.slChips && typeof v.slChips === 'object') {
    // First reset all to deselected
    document.querySelectorAll('.sl-chip').forEach(c => c.classList.remove('sel'));
    // Restore saved chip state per structure/eye
    document.querySelectorAll('#oe-slitlamp .sl-sl-row, #oe-slitlamp [style*="grid-template-columns:90px"]').forEach(row => {
      const label = row.querySelector('[style*="9.5px"]')?.textContent?.trim();
      if(!label || !v.slChips[label]) return;
      const cols = row.querySelectorAll('[style*="background:rgba"]');
      ['od','os'].forEach((eye, i) => {
        const saved = v.slChips[label][eye] || [];
        if(!cols[i]) return;
        cols[i].querySelectorAll('.sl-chip').forEach(chip => {
          chip.classList.toggle('sel', saved.includes(chip.textContent.trim()));
        });
      });
    });
  }
  setV('sl-notes-text', v.slNotes);

  setV('rx-diagnosis-text', v.diagnosisText || '');
  const dxRows = document.getElementById('rx-diagnosis-rows');
  if(dxRows) {
    dxRows.innerHTML = '';
    if(Array.isArray(v.diagnoses) && v.diagnoses.length) v.diagnoses.forEach(dx => addDiagnosisRow(dx));
    else initDiagnosisRowsIfEmpty();
  }
  const postSurgeryRx = document.getElementById('rx-post-surgery');
  if (postSurgeryRx) postSurgeryRx.checked = !!v.postSurgeryRx;
  toggleRxPostSurgeryNote();
  const PHX_IDS = ['phx-allergy','phx-diabetes_mellit','phx-hypertension','phx-heart_disease__','phx-asthma___copd','phx-headache___migr','phx-thyroid_disease','phx-renal_disease','phx-previous_surger','phx-bleeding_disord'];
  if(v.phxExtra && typeof v.phxExtra === 'object') {
    PHX_IDS.forEach(id => {
      setV(id+'-dur', v.phxExtra[id]?.dur || '');
      setV(id+'-rx', v.phxExtra[id]?.rx || '');
    });
  }
  setV('poh-od-text', v.pohOdText || '');
  setV('poh-os-text', v.pohOsText || '');
  if(v.hxSpectacles) setSel('hx-spectacles', v.hxSpectacles);
  setV('hx-last-spec', v.hxLastSpec || '');
  setV('hx-ocular-meds', v.hxOcularMeds || '');
  setV('hx-family', v.familyHx || '');
  setV('hx-other-systemic', v.otherSystemic || '');
  setV('drug-allergy-spec', v.drugAllergySpec || '');
  if(v.drugAllergy) setSel('drug-allergy', v.drugAllergy);
  ['refr-enable','refr-age','refr-stable','refr-occupation','refr-topo','refr-dryeye','refr-preg','refr-autoimmune','refr-kc','refr-allergy','refr-flap','refr-od-pachy','refr-os-pachy']
    .forEach(id => {
      const val = v[id];
      const el = document.getElementById(id);
      if(!el || val == null) return;
      if(el.type === 'checkbox') el.checked = !!val;
      else if(el.tagName === 'SELECT') setSel(id, val);
      else setV(id, val);
    });
  toggleRefractivePanel && toggleRefractivePanel();

  // Prescription drugs
  if(Array.isArray(v.rx) && v.rx.length) {
    if(typeof RX_DRUGS !== 'undefined') { RX_DRUGS.length = 0; v.rx.forEach(d=>RX_DRUGS.push(d)); }
    typeof renderRxDrugs === 'function' && renderRxDrugs();
  }
  if(window.CURRENT_PATIENT) {
    window.CURRENT_PATIENT.lastVisit = JSON.parse(JSON.stringify(v || {}));
  }
  renderCurrentPatientInvestigationUploads && renderCurrentPatientInvestigationUploads(Array.isArray(v.investigations) ? v.investigations : []);
  renderOphthoRecap && renderOphthoRecap();

  // Advice text
  setV('rx-advice-text', v.advice || '');

  // Chief complaints — restore rows
  if(Array.isArray(v.ccRows) && v.ccRows.length) {
    const ccContainer = document.getElementById('cc-rows');
    if(ccContainer) {
      ccContainer.innerHTML = '';
      v.ccRows.forEach(cc => {
        if(typeof addCC === 'function') {
          addCC();
          const rows = ccContainer.querySelectorAll('.cc-row');
          const last = rows[rows.length-1];
          if(last) {
            const inp = last.querySelector('.cc-inp'); if(inp) inp.value = cc.text||'';
            const dur = last.querySelector('.cc-dur'); if(dur) dur.value = cc.dur||'';
            const eye = last.querySelector('.cc-eye'); if(eye) eye.value = cc.eye||'';
          }
        }
      });
    }
  }
}

function toggleSeen(id) {
  const p = PATIENTS.find(x=>x.bmhId===id); if (!p) return;
  p.seen = !p.seen; if(p.seen) p.status='done';
  showToast(p.seen?p.name+' marked as Seen ✓':p.name+' unmarked','s');
  renderDocQueue(); renderDashboard();
}
function markDilated(id, name) {
  const p = PATIENTS.find(x=>x.bmhId===id); if (!p) return;
  p.dilated = true; p.dilatedTime = Date.now();
  fbUpdate && fbUpdate('patients/'+id,{dilated:true,dilatedTime:p.dilatedTime}).catch(()=>{});
  showToast((name||p.name)+' 💧 Dilation recorded — timer started ✓','s');
  renderDocQueue && renderDocQueue();
}
function markCurrentPatientDilated() {
  const p = window.CURRENT_PATIENT || PATIENTS.find(x=>x.bmhId === (document.getElementById('ophtho-pt-uid')?.textContent || '').trim());
  if(!p) {
    showToast('Open the patient record first','w');
    return;
  }
  markDilated(p.bmhId, p.name);
}
function markPaid(id) {
  const pr = PAY_REQUESTS.find(x=>x.id===id); if (!pr) return;
  pr.status = 'paid';
  // Record as collected transaction
  const txnId = 'TXN'+Date.now();
  const txn = {
    id:txnId, patient:pr.patient, bmhId:pr.bmhId, service:pr.for||'Service',
    amount:pr.amount, mode:pr.mode||'Cash', collected:true,
    dept:pr.dept||PATIENTS.find(x=>x.bmhId===pr.bmhId)?.dept||'ophtho',
    time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
    date:new Date().toISOString(), centre:pr.centre||CURRENT_USER?.centre||'CHD',
    createdBy:CURRENT_USER?.name||'Reception'
  };
  TRANSACTIONS.push(txn);
  saveTransactionToFirebase&&saveTransactionToFirebase(txn);
  bmhAppendLedger({ date: new Date().toISOString(), type: 'Receipt', narration: 'Payment: ' + (pr.for || 'Service'), dr: 0, cr: pr.amount, party: pr.patient, ref: (pr.mode || 'Cash') + (pr.paymentRef ? ' ' + pr.paymentRef : '') });
  saveBmhFinancials();
  // Deduct from advance if applicable
  const pt = PATIENTS.find(x=>x.bmhId===pr.bmhId);
  if(pt && pt.advance > 0) {
    const deduct = Math.min(pt.advance, pr.amount);
    pt.advance = Math.max(0, pt.advance - deduct);
    fbUpdate&&fbUpdate('patients/'+pr.bmhId,{advance:pt.advance});
    if(deduct>0) showToast(`💙 Advance ₹${deduct.toLocaleString('en-IN')} deducted from ${pr.patient}'s advance balance`,'i');
  }
  const p = PATIENTS.find(x=>x.bmhId===pr.bmhId);
  if(p) {
    p.balance=0;
    // If this was a cross-refer payment — now route patient to target dept
    if(pr.xref && pr.xrefDept) {
      p.dept = pr.xrefDept;
      p.doctor = pr.xrefDoctor || p.doctor;
      p.status = 'waiting';
      p.xrefPaid = true;
      // Mark xref as paid in log
      if(window.XREF_LOG) {
        const xr = window.XREF_LOG.find(x=>x.bmhId===pr.bmhId&&x.toDept===pr.xrefDept);
        if(xr) xr.paid=true;
      }
      showToast('💳 Payment cleared — '+p.name+' sent to '+pr.xrefDoctor+"'s queue ✓",'s');
    } else {
      showToast('💳 ₹'+pr.amount.toLocaleString('en-IN')+' received from '+pr.patient+' ✓','s');
    }
  }
  fbUpdate && fbUpdate('payRequests/'+id,{status:'paid'}).catch(()=>{});
  renderDocQueue && renderDocQueue();
  renderDashboard && renderDashboard();
  renderReceptionPage && renderReceptionPage();
}
function sendCharge() {
  const pt = document.getElementById('sp-pt')?.value; const fr = document.getElementById('sp-proc')?.value || '';
  const amt = parseInt(fr.match(/\d+/)?.[0]||0);
  if (!pt) return;
  const _pt2 = PATIENTS.find(x=>x.bmhId===pt);
  const _prId2 = 'PR'+Date.now();
  const _pr2 = {id:_prId2,patient:_pt2?.name||pt,bmhId:pt,for:fr.split(' ₹')[0],amount:amt,status:'pending',from:document.getElementById('sbnm').textContent,dept:_pt2?.dept||'ophtho',centre:_pt2?.centre||CURRENT_USER?.centre||'CHD',date:new Date().toISOString()};
  PAY_REQUESTS.push(_pr2);
  syncPayRequestToPatientCharges(_pr2);
  fbSet&&fbSet('payRequests/'+_prId2,_pr2);
  if(_pt2){_pt2.balance=(_pt2.balance||0)+amt;fbUpdate&&fbUpdate('patients/'+pt,{balance:_pt2.balance});}
  renderReceptionPage&&renderReceptionPage();
  renderBillingPageIfActive && renderBillingPageIfActive();
  showToast('📤 Charge sent to Reception — pulsing now ✓','s');
}
function sendQuickCharge(name, amount, bmhIdOverride) {
  const pt = window.CURRENT_PATIENT || PATIENTS.find(p=>p.bmhId===bmhIdOverride);
  const ptName = pt?.name || 'Unknown Patient';
  const ptId = pt?.bmhId || bmhIdOverride || 'BMSH-000000';
  const dept = pt?.dept || CURRENT_USER?.dept || 'ophtho';
  const centre = pt?.centre || CURRENT_USER?.centre || 'CHD';
  const prId = 'PR'+Date.now()+Math.floor(Math.random()*1000);
  const pr = {id:prId, patient:ptName, bmhId:ptId, for:name, amount:parseInt(amount)||0, status:'pending', from:CURRENT_USER?.name||'Doctor', dept, centre, date:new Date().toISOString()};
  PAY_REQUESTS.push(pr);
  syncPayRequestToPatientCharges(pr);
  fbSet&&fbSet('payRequests/'+prId, pr);
  // Update patient balance
  if(pt) { pt.balance=(pt.balance||0)+parseInt(amount); fbUpdate&&fbUpdate('patients/'+ptId,{balance:pt.balance}); }
  renderReceptionPage&&renderReceptionPage();
  renderDashboard&&renderDashboard();
  renderBillingPageIfActive && renderBillingPageIfActive();
  // Update sent-charges-log display (both in ophtho and generic)
  ['sent-charges-log-oe','sent-charges-log'].forEach(logId=>{
    const log = document.getElementById(logId);
    if(log) {
      const badge = document.createElement('span');
      badge.style.cssText='display:inline-flex;align-items:center;gap:3px;background:var(--orange-lt);color:#8a4200;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;border:1px solid rgba(255,149,0,.4);animation:pulse 2s infinite';
      badge.textContent = `⏳ ${name} ₹${parseInt(amount).toLocaleString('en-IN')}`;
      badge.id = 'slc-'+prId;
      log.appendChild(badge);
    }
  });
  const nb = document.getElementById('nb-pay'); if(nb) nb.textContent = PAY_REQUESTS.filter(r=>r.status==='pending').length;
  showToast('📤 '+name+' ₹'+parseInt(amount).toLocaleString('en-IN')+' → Reception pulsing ✓','s');
}
function bookFollowup() {
  const d = document.getElementById('rx-fu-date')?.value;
  if(!d) { showToast('Please select a follow-up date first','w'); return; }
  const fuDate = new Date(d);
  const formatted = fuDate.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
  const ptName = document.getElementById('ophtho-pt-nm')?.textContent ||
                 document.getElementById('obg-pt-nm')?.textContent ||
                 document.getElementById('psych-pt-nm')?.textContent ||
                 document.getElementById('skin-pt-nm')?.textContent || 'Patient';
  const ptId   = document.getElementById('ophtho-pt-uid')?.textContent || '—';
  const ptMob  = PATIENTS.find(p=>p.bmhId===ptId)?.mob || '';
  const doc    = CURRENT_USER?.name || 'Doctor';
  const dept   = CURRENT_USER?.dept || 'Ophthalmology';
  const nearestSlot = getNearestAppointmentSlot(d);

  // Add to APPOINTMENTS array
  // Double-booking check
  const conflict = APPOINTMENTS.find(a=>a.date===d && a.doctor===doc && a.status!=='cancelled');
  if(conflict){
    showToast('⚠️ '+doc+' already has an appointment on '+formatted+'. Booking saved but please verify slot.','w');
  }
  const apt = {
    id: 'A'+Date.now(),
    patient: ptName,
    bmhId: ptId,
    mob: ptMob,
    date: d,
    dateFormatted: formatted,
    time: nearestSlot,
    doctor: doc,
    dept: dept,
    purpose: 'Follow-up',
    status: 'booked',
    centre: CURRENT_USER?.centre || 'CHD'
  };
  APPOINTMENTS.push(apt);
  // Save to Firebase
  if(typeof saveAppointmentToFirebase==='function') saveAppointmentToFirebase(apt);

  // Update UI
  const fuDisplay = document.getElementById('rx-fu-display');
  if(fuDisplay) {
    fuDisplay.textContent = '📅 ' + formatted;
    fuDisplay.style.color = 'var(--green)';
    fuDisplay.style.fontWeight = '800';
  }
  showToast('📅 Follow-up booked for ' + formatted + ' ✓', 's');
  // Refresh appointments page if visible
  renderAptDay && renderAptDay();
}


function openBookApt(slot) {
  document.getElementById('book-date').value = document.getElementById('apt-date-inp')?.value || '';
  const timeEl = document.getElementById('book-time');
  if (timeEl) timeEl.value = normalizeAptTimeLabel(slot || getNearestAppointmentSlot(document.getElementById('book-date')?.value));
  // Populate patient dropdown with live PATIENTS
  const sel = document.getElementById('book-patient');
  if(sel && PATIENTS && PATIENTS.length) {
    const cur = window.CURRENT_PATIENT;
    sel.innerHTML = '<option value="">— Select Patient —</option>' +
      PATIENTS.map(p=>`<option value="${p.name} — ${p.bmhId}"${cur&&cur.bmhId===p.bmhId?' selected':''}>${p.name} — ${p.bmhId}</option>`).join('');
  }
  // Set centre to current user's centre
  const centreEl = document.getElementById('book-centre');
  if(centreEl && window.CURRENT_USER?.centre) {
    centreEl.value = window.CURRENT_USER.centre === 'RPR' ? 'Ropar' : 'Chandigarh';
  }
  openM('m-book-apt');
}
function normalizeAptTimeLabel(slot) {
  const s = String(slot || '').trim();
  if (!s) return '9:00 AM';
  if (/am|pm/i.test(s)) return s.replace(/^0/,'');
  const [hh, mm] = s.split(':').map(Number);
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return s;
  const suffix = hh >= 12 ? 'PM' : 'AM';
  const hr12 = ((hh + 11) % 12) + 1;
  return `${hr12}:${String(mm).padStart(2,'0')} ${suffix}`;
}
function getNearestAppointmentSlot(dateStr) {
  const TIMES = ['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
  if (!dateStr) return '9:00 AM';
  const todayStr = new Date().toISOString().split('T')[0];
  if (dateStr !== todayStr) return '9:00 AM';
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const next = TIMES.find(t => {
    const [h,m] = t.split(':').map(Number);
    return (h * 60 + m) >= mins;
  });
  return normalizeAptTimeLabel(next || TIMES[TIMES.length - 1]);
}
function bookApt() {
  const dateEl   = document.getElementById('book-date');
  const timeEl   = document.getElementById('book-time');
  const drEl     = document.getElementById('book-dr');
  const ptEl     = document.getElementById('book-patient');
  const purposeEl= document.getElementById('book-purpose');
  const centreEl = document.getElementById('book-centre');
  const notesEl  = document.getElementById('book-notes');
  const date   = dateEl?.value;
  const time   = timeEl?.value || timeEl?.querySelector?.('[selected]')?.textContent || '9:00 AM';
  const doctor = drEl?.value || '';
  if(!date){ showToast('Please select a date','w'); return; }
  // Double-booking check: same doctor, same date, same time
  const conflict = APPOINTMENTS.find(a=>a.date===date && a.doctor===doctor && a.time===time && a.status!=='cancelled');
  if(conflict){
    showToast('⚠️ '+doctor+' already has an appointment at '+time+' on this date. Choose a different slot.','w');
    return;
  }
  const patient = ptEl?.value || 'New Patient';
  const apt = {
    id: 'A'+Date.now(),
    patient, bmhId: '—',
    date, time, doctor,
    dept: ({
      'Dr. Varun Baweja':'ophtho','Dr. Geeta Baweja':'obg','Dr. Namrata Baweja':'obg',
      'Dr. Tarun Baweja':'psych','Dr. Pooja Baweja':'skin'
    })[doctor] || 'ophtho',
    purpose: purposeEl?.value || 'Consultation',
    centre: centreEl?.value || window.CURRENT_USER?.centre || 'CHD',
    notes: notesEl?.value || '',
    status: 'booked',
    createdBy: window.CURRENT_USER?.username || 'reception'
  };
  APPOINTMENTS.push(apt);
  if(typeof saveAppointmentToFirebase==='function') saveAppointmentToFirebase(apt);
  showToast('📅 Appointment booked — '+patient+' at '+time+' ✓','s');
  closeM('m-book-apt');
  renderAptDay && renderAptDay();
}

/** Numbered diagnosis lines (same UX pattern as medicines) + optional notes textarea. */
function initDiagnosisRowsIfEmpty() {
  const wrap = document.getElementById('rx-diagnosis-rows');
  if(!wrap || wrap.querySelector('.rx-dx-row')) return;
  addDiagnosisRow(); addDiagnosisRow(); addDiagnosisRow();
}
function normalizeRxDiagnosisEyeLabel(eye) {
  const val = String(eye || '').trim().toLowerCase();
  if (!val) return '';
  if (/(right|od)/.test(val)) return 'Right Eye';
  if (/(left|os)/.test(val)) return 'Left Eye';
  if (/(both|ou|bilateral)/.test(val)) return 'Both Eyes';
  return String(eye || '').trim();
}
function getOphthoDiagnosisRows() {
  return [...document.querySelectorAll('#rx-diagnosis-rows .rx-dx-row')].map(function (row) {
    return {
      eye: normalizeRxDiagnosisEyeLabel(row.querySelector('.rx-dx-eye')?.value || ''),
      text: (row.querySelector('.rx-dx-line')?.value || '').trim()
    };
  }).filter(function (item) { return item.text; });
}
function formatDxLineForPrint(item) {
  if (!item) return '';
  if (typeof item === 'string') return item.trim();
  const eye = normalizeRxDiagnosisEyeLabel(item.eye || '');
  const text = String(item.text || item.label || '').trim();
  if (!text) return '';
  return eye ? (eye + ' - ' + text) : text;
}
function renumberDiagnosisRows() {
  document.querySelectorAll('#rx-diagnosis-rows .rx-dx-row').forEach((row,i)=>{
    const sp = row.querySelector('span');
    if(sp) sp.textContent = String(i+1);
    const inp = row.querySelector('.rx-dx-line');
    if(inp && !inp.value.trim()) inp.placeholder = 'Diagnosis '+(i+1);
  });
}
function addDiagnosisRow(prefill) {
  const wrap = document.getElementById('rx-diagnosis-rows');
  if(!wrap) return;
  const esc = (s='') => String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  const prefillObj = (prefill && typeof prefill === 'object' && !Array.isArray(prefill))
    ? prefill
    : { text: String(prefill || ''), eye: '' };
  const prefillText = String(prefillObj.text || prefillObj.label || '').trim();
  const prefillEye = normalizeRxDiagnosisEyeLabel(prefillObj.eye || '');
  const n = wrap.querySelectorAll('.rx-dx-row').length + 1;
  const uid = 'rx-dx-' + Date.now() + '-' + n;
  const d = document.createElement('div');
  d.className = 'rx-dx-row';
  d.style.cssText = 'display:grid;grid-template-columns:28px 88px minmax(0,1fr) 36px;gap:5px;padding:6px 8px;border-bottom:1px solid var(--g5);align-items:start';
  d.innerHTML = `<span style="font-weight:900;color:var(--blue);text-align:center;padding-top:6px">${n}</span>
    <select class="rx-dx-eye" style="font-size:11px;padding:5px 7px;border:1.5px solid var(--g4);border-radius:6px;width:100%;box-sizing:border-box">
      <option value=""${!prefillEye?' selected':''}>General</option>
      <option value="Right Eye"${prefillEye==='Right Eye'?' selected':''}>Right</option>
      <option value="Left Eye"${prefillEye==='Left Eye'?' selected':''}>Left</option>
      <option value="Both Eyes"${prefillEye==='Both Eyes'?' selected':''}>Both</option>
    </select>
    <div style="position:relative;min-width:0">
    <input type="text" class="rx-dx-line" id="${uid}" value="${esc(prefillText)}" placeholder="ICD-10 / diagnosis — type to search" autocomplete="off" style="font-size:12px;padding:5px 8px;border:1.5px solid var(--g4);border-radius:6px;width:100%;box-sizing:border-box" oninput="rxDxSuggest(this)" onfocus="rxDxSuggest(this)" onkeydown="if(event.key==='Enter'){event.preventDefault();addDiagnosisRow();}">
    <div class="rx-dx-drop" style="display:none;position:absolute;left:0;right:0;top:100%;z-index:500;background:#fff;border:1.5px solid var(--blue);border-top:none;border-radius:0 0 8px 8px;max-height:200px;overflow-y:auto;box-shadow:0 6px 16px rgba(0,0,0,.12)"></div>
    </div>
    <button type="button" class="btn btn-xs btn-gray" onclick="this.closest('.rx-dx-row').remove();renumberDiagnosisRows()" title="Remove" style="margin-top:2px">✕</button>`;
  wrap.appendChild(d);
}
function collectOphthoDiagnosesForPrint() {
  const lines = getOphthoDiagnosisRows().map(formatDxLineForPrint).filter(Boolean);
  const notes = (document.getElementById('rx-diagnosis-text')?.value||'').trim();
  const legacyTags = [...document.querySelectorAll('#rx-diagnosis-list .dx-tag')].map(e=>e.textContent.replace(/[×✕]/g,'').trim()).filter(Boolean);
  const merged = [...lines];
  legacyTags.forEach(t => { if(t && !merged.includes(t)) merged.push(t); });
  return { lines: merged, notes };
}
function buildOphthoPositiveFindingsList() {
  const lines = [];
  const addLine = function (label, value, eye) {
    const text = String(value || '').trim();
    if (!text || /^normal$/i.test(text) || /^pink\s*&?\s*healthy$/i.test(text) || /^normal calibre$/i.test(text) || /^clear$/i.test(text)) return;
    const eyeLabel = normalizeRxDiagnosisEyeLabel(eye);
    lines.push(eyeLabel ? (label + ' ' + eyeLabel.toLowerCase() + ' - ' + text) : (label + ' - ' + text));
  };
  const slRows = (typeof window.collectSlitLampDataForPrint === 'function')
    ? window.collectSlitLampDataForPrint()
    : (() => {
      const data = {};
      document.querySelectorAll('#oe-slitlamp .sl-sl-row, #oe-slitlamp [style*="grid-template-columns:90px"]').forEach(function (row) {
        const label = row.querySelector('[style*="9.5px"]')?.textContent?.trim();
        const cols = row.querySelectorAll('[style*="background:rgba"]');
        if (!label || cols.length < 2) return;
        data[label] = {
          od: [...cols[0].querySelectorAll('.sl-chip.sel')].map(c => c.textContent.trim()).filter(Boolean),
          os: [...cols[1].querySelectorAll('.sl-chip.sel')].map(c => c.textContent.trim()).filter(Boolean)
        };
      });
      return data;
    })();
  Object.entries(slRows || {}).forEach(function ([label, val]) {
    const odVals = (val?.od || []).filter(v => !/^clear$/i.test(v));
    const osVals = (val?.os || []).filter(v => !/^clear$/i.test(v));
    if (odVals.length && osVals.length && odVals.join(', ') === osVals.join(', ')) addLine(label, odVals.join(', '), 'Both Eyes');
    else {
      if (odVals.length) addLine(label, odVals.join(', '), 'Right Eye');
      if (osVals.length) addLine(label, osVals.join(', '), 'Left Eye');
    }
  });
  addLine('Disc', document.getElementById('fund-od-disc')?.value || '', 'Right Eye');
  addLine('Disc', document.getElementById('fund-os-disc')?.value || '', 'Left Eye');
  addLine('C/D Ratio', document.getElementById('fund-od-cd')?.value || '', 'Right Eye');
  addLine('C/D Ratio', document.getElementById('fund-os-cd')?.value || '', 'Left Eye');
  addLine('Macula', document.getElementById('fund-od-mac')?.value || '', 'Right Eye');
  addLine('Macula', document.getElementById('fund-os-mac')?.value || '', 'Left Eye');
  addLine('Vessels', document.getElementById('fund-od-ves')?.value || '', 'Right Eye');
  addLine('Vessels', document.getElementById('fund-os-ves')?.value || '', 'Left Eye');
  addLine('Periphery', document.getElementById('fund-od-per')?.value || '', 'Right Eye');
  addLine('Periphery', document.getElementById('fund-os-per')?.value || '', 'Left Eye');
  addLine('Fundus', document.getElementById('fundus-od')?.value || '', 'Right Eye');
  addLine('Fundus', document.getElementById('fundus-os')?.value || '', 'Left Eye');
  const slNotes = (document.getElementById('sl-notes-text')?.value || '').trim();
  if (slNotes) lines.push('Slit Lamp Notes - ' + slNotes);
  return [...new Set(lines.filter(Boolean))];
}
function toggleRxPostSurgeryNote() {
  const note = document.getElementById('rx-post-surgery-note');
  const checked = !!document.getElementById('rx-post-surgery')?.checked;
  if (note) note.style.display = checked ? 'block' : 'none';
}

/** Diagnosis lines for prescription print — Ophthalmology uses numbered rows; other depts use *-dx-list */
function collectDeptDiagnosesForPrint(deptId) {
  if (deptId === 'oe') return collectOphthoDiagnosesForPrint();
  const listEl = document.getElementById(deptId + '-dx-list');
  const lines = listEl ? [...listEl.querySelectorAll('.dx-inp')].map(e => e.value.trim()).filter(Boolean) : [];
  return { lines, notes: '' };
}

function rxDrugTradeName(d) {
  if (!d) return '';
  const s = (d.trade || d.brand || d.name || '').trim();
  return s ? String(s) : '';
}
function rxDrugGenericName(d) {
  if (!d) return '';
  const s = (d.generic || d.name || '').trim();
  const t = (d.trade || d.brand || '').trim();
  if (s && t && s.toLowerCase() === t.toLowerCase()) return '';
  return s ? String(s) : '';
}
function getRxDoctorDisplayName() {
  const active = document.querySelector('.page.active')?.id || '';
  if (active.includes('obg')) return document.getElementById('obg-rx-doctor')?.textContent?.trim() || window.CURRENT_USER?.name || 'Dr. Geeta Baweja';
  if (active.includes('psych')) return document.getElementById('psych-rx-doctor')?.textContent?.trim() || window.CURRENT_USER?.name || 'Dr. Tarun Baweja';
  if (active.includes('skin')) return document.getElementById('skin-rx-doctor')?.textContent?.trim() || window.CURRENT_USER?.name || 'Dr. Pooja Baweja';
  return document.getElementById('ophtho-rx-doctor')?.textContent?.trim() || window.CURRENT_USER?.name || document.getElementById('sbnm')?.textContent?.trim() || 'Dr. Varun Baweja';
}

function buildOphthoCaseSheetHtml() {
  // ── collect patient info ──────────────────────────────────────────────
  const currentPt = window.CURRENT_PATIENT || PATIENTS.find(p => p.bmhId === document.getElementById('ophtho-pt-uid')?.textContent?.trim()) || {};
  const ptName   = currentPt.name || document.getElementById('ophtho-pt-nm')?.textContent?.trim() || 'Patient';
  const ptId     = currentPt.bmhId || document.getElementById('ophtho-pt-uid')?.textContent?.trim() || '';
  const today    = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  const printDate = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});
  const drName   = window.CURRENT_USER?.name || 'Dr. Varun Baweja';
  const centre   = window.CURRENT_USER?.centre || 'CHD';

  // ── Age/Sex/Address from patient record ──────────────────────────────
  const pt = currentPt.bmhId ? currentPt : ((window.PATIENTS||[]).find(p=>p.bmhId===ptId)||{});
  const ptAge  = pt.age  || '';
  const ptSex  = pt.sex  || pt.gender || '';
  const ptMob  = pt.mob  || pt.phone  || '';
  const ptAddr = (pt.address || pt.addr || pt.addressLine || '').trim();

  // ── chief complaints ──────────────────────────────────────────────────
  const ccRows = [];
  document.querySelectorAll('.cc-row').forEach(row=>{
    const txt = row.querySelector('.cc-inp')?.value?.trim();
    if(txt) ccRows.push({text:txt, dur:row.querySelector('.cc-dur')?.value||'', eye:row.querySelector('.cc-eye')?.value||''});
  });

  // ── visual acuity (merged VA tab + prescription tab) ───────────────────
  const ucvaOD = document.getElementById('va-od-uc')?.value || document.getElementById('ucva-od-dist')?.value || '—';
  const ucvaOS = document.getElementById('va-os-uc')?.value || document.getElementById('ucva-os-dist')?.value || '—';
  const bcvaOD = document.getElementById('va-od-bc')?.value || '—';
  const bcvaOS = document.getElementById('va-os-bc')?.value || '—';
  const phOD = document.getElementById('va-od-ph')?.value || '—';
  const phOS = document.getElementById('va-os-ph')?.value || '—';

  // ── refraction ────────────────────────────────────────────────────────
  const rf = {
    // Current spectacles
    odSph2: document.getElementById('rf-od-sph2')?.value || '—',
    odCyl2: document.getElementById('rf-od-cyl2')?.value || '—',
    odAx2:  document.getElementById('rf-od-ax2')?.value  || '—',
    osSph2: document.getElementById('rf-os-sph2')?.value || '—',
    osCyl2: document.getElementById('rf-os-cyl2')?.value || '—',
    osAx2:  document.getElementById('rf-os-ax2')?.value  || '—',
    // Cycloplegic / AR
    cycODsph: document.getElementById('cyc-od-sph')?.value || '—',
    cycODcyl: document.getElementById('cyc-od-cyl')?.value || '—',
    cycODax:  document.getElementById('cyc-od-ax')?.value  || '—',
    cycOSsph: document.getElementById('cyc-os-sph')?.value || '—',
    cycOScyl: document.getElementById('cyc-os-cyl')?.value || '—',
    cycOSax:  document.getElementById('cyc-os-ax')?.value  || '—',
    // Subjective
    subjODsph: document.getElementById('subj-od-sph')?.value || '—',
    subjODcyl: document.getElementById('subj-od-cyl')?.value || '—',
    subjODax:  document.getElementById('subj-od-ax')?.value  || '—',
    subjOSsph: document.getElementById('subj-os-sph')?.value || '—',
    subjOScyl: document.getElementById('subj-os-cyl')?.value || '—',
    subjOSax:  document.getElementById('subj-os-ax')?.value  || '—',
  };

  // ── IOP ───────────────────────────────────────────────────────────────
  const gatOD  = document.getElementById('iop-gat-od')?.value  || '—';
  const gatOS  = document.getElementById('iop-gat-os')?.value  || '—';
  const gatTOD = document.getElementById('iop-gat-od-t')?.value || '—';
  const gatTOS = document.getElementById('iop-gat-os-t')?.value || '—';
  const nctOD  = document.getElementById('iop-nct-od')?.value  || '—';
  const nctOS  = document.getElementById('iop-nct-os')?.value  || '—';
  const nctTOD = document.getElementById('iop-nct-od-t')?.value || '—';
  const nctTOS = document.getElementById('iop-nct-os-t')?.value || '—';
  const pachOD = document.getElementById('pachy-od')?.value    || '—';
  const pachOS = document.getElementById('pachy-os')?.value    || '—';
  const gonioOD = document.getElementById('gonio-od')?.value   || '—';
  const gonioOS = document.getElementById('gonio-os')?.value   || '—';
  const corrOD = document.getElementById('iop-corr-od')?.textContent?.trim() || '—';
  const corrOS = document.getElementById('iop-corr-os')?.textContent?.trim() || '—';

  // ── slit lamp chips ───────────────────────────────────────────────────
  const slData = {};
  document.querySelectorAll('#oe-slitlamp .sl-sl-row').forEach(row=>{
    const label = row.querySelector('[style*="9.5px"]')?.textContent?.trim();
    if(!label) return;
    const cols = row.querySelectorAll('[style*="background:rgba"]');
    if(cols.length<2) return;
    slData[label] = {
      od: [...cols[0].querySelectorAll('.sl-chip.sel')].map(c=>c.textContent.trim()),
      os: [...cols[1].querySelectorAll('.sl-chip.sel')].map(c=>c.textContent.trim())
    };
  });
  const slNotes = document.getElementById('sl-notes-text')?.value?.trim() || '';

  // ── fundus ────────────────────────────────────────────────────────────
  const fund = {
    odDisc: document.getElementById('fund-od-disc')?.value || '',
    odCD:   document.getElementById('fund-od-cd')?.value   || '',
    odMac:  document.getElementById('fund-od-mac')?.value  || '',
    odVes:  document.getElementById('fund-od-ves')?.value  || '',
    odPer:  document.getElementById('fund-od-per')?.value  || '',
    odTxt:  document.getElementById('fundus-od')?.value?.trim() || '',
    osDisc: document.getElementById('fund-os-disc')?.value || '',
    osCD:   document.getElementById('fund-os-cd')?.value   || '',
    osMac:  document.getElementById('fund-os-mac')?.value  || '',
    osVes:  document.getElementById('fund-os-ves')?.value  || '',
    osPer:  document.getElementById('fund-os-per')?.value  || '',
    osTxt:  document.getElementById('fundus-os')?.value?.trim() || '',
  };

  // ── personal history ──────────────────────────────────────────────────
  const PHX_MAP = [
    ['phx-allergy','Allergy'],['phx-diabetes_mellit','Diabetes Mellitus'],['phx-hypertension','Hypertension'],
    ['phx-heart_disease__','Heart Disease / IHD'],['phx-asthma___copd','Asthma / COPD'],['phx-headache___migr','Headache / Migraine'],
    ['phx-thyroid_disease','Thyroid Disease'],['phx-renal_disease','Renal Disease'],
    ['phx-previous_surger','Previous Surgery'],['phx-bleeding_disord','Bleeding Disorder']
  ];

  // ── past ocular history ───────────────────────────────────────────────
  const pohOD = document.getElementById('poh-od-type')?.value || '—';
  const pohOS = document.getElementById('poh-os-type')?.value || '—';
  const pohOdTxt = (document.getElementById('poh-od-text')?.value || '').trim();
  const pohOsTxt = (document.getElementById('poh-os-text')?.value || '').trim();
  const hxSpec = document.getElementById('hx-spectacles')?.value || '—';
  const hxLastSpec = (document.getElementById('hx-last-spec')?.value || '').trim() || '—';
  const hxOcularMeds = (document.getElementById('hx-ocular-meds')?.value || '').trim() || '—';
  const drugAl = document.getElementById('drug-allergy')?.value || '—';
  const drugAlSpec = (document.getElementById('drug-allergy-spec')?.value || '').trim();
  const famHx = (document.getElementById('hx-family')?.value || '').trim();
  const othHx = (document.getElementById('hx-other-systemic')?.value || '').trim();

  // ── colour vision ─────────────────────────────────────────────────────
  const cvOD = document.getElementById('cv-od')?.value || '—';
  const cvOS = document.getElementById('cv-os')?.value || '—';

  // ── diagnosis (numbered lines + optional notes) ─────────────────────
  const dxPack = collectOphthoDiagnosesForPrint();
  const dxLines = dxPack.lines || [];
  const dxNotes = dxPack.notes || '';
  const chiefComplaintsEnabled = document.getElementById('oe-inc-cc')?.checked ?? true;
  const positiveFindingsEnabled = document.getElementById('oe-inc-posfind')?.checked ?? true;

  // ── drugs (for case sheet medicines section) ──────────────────────────
  const drugs = typeof RX_DRUGS !== 'undefined' ? RX_DRUGS : [];

  const escHtml = (s) => (s == null ? '' : String(s)).replace(/</g, '&lt;');
  const PHX_SHORT = ['Allerg','DM','HTN','IHD','Asthma','Migr','Thyroid','Renal','Surg','Bleed'];
  const ccStr = ccRows.map(c => c.text + (c.dur ? ' (' + c.dur + ')' : '') + (c.eye ? ' ' + c.eye : '')).join('; ') || '—';
  const phxRowsHtml = PHX_MAP.map(([id], i) => {
    const yn = document.getElementById(id)?.value || '—';
    const dur = (document.getElementById(id + '-dur')?.value || '').trim() || '—';
    const rx = (document.getElementById(id + '-rx')?.value || '').trim() || '—';
    const shortL = PHX_SHORT[i] || '—';
    return `<tr>
      <td style="border:1px solid #aaa;padding:2px 3px;font-weight:700;white-space:nowrap;font-size:7px;line-height:1.18">${escHtml(shortL)}</td>
      <td style="border:1px solid #aaa;padding:2px;text-align:center;font-weight:900;font-size:7px;color:${yn === 'Y' ? '#000' : '#666'}">${escHtml(yn)}</td>
      <td style="border:1px solid #aaa;padding:2px 3px;font-size:7px;line-height:1.18">${escHtml(dur)}</td>
      <td style="border:1px solid #aaa;padding:2px 3px;font-size:7px;line-height:1.18">${escHtml(rx)}</td>
    </tr>`;
  }).join('');
  const examHead = (label, bg, fg) => `<th style="border:1px solid #555;padding:5px 3px;font-size:8.6px;background:${bg};color:${fg};text-transform:uppercase;letter-spacing:.2px">${label}</th>`;
  const examCell = (v) => `<td style="text-align:center;padding:6px 4px;border:1px solid #777;font-size:9.3px;font-weight:700;line-height:1.2">${escHtml(v)}</td>`;
  const examBlank = () => `<td style="text-align:center;padding:8px 4px;border:1px solid #777;font-size:8.8px;font-weight:700;line-height:1.2;color:#666">____________</td>`;
  const examTableHtml = `<table style="width:100%;border-collapse:collapse;table-layout:fixed;margin-top:3px">
<colgroup>
  <col style="width:6.5%"><col style="width:6.5%"><col style="width:6.5%"><col style="width:6.5%">
  <col style="width:7.5%"><col style="width:7.5%"><col style="width:6.5%">
  <col style="width:7.5%"><col style="width:7.5%"><col style="width:6.5%">
  <col style="width:7.5%"><col style="width:7.5%"><col style="width:6.5%"><col style="width:8%">
</colgroup>
<thead>
<tr>
  <th rowspan="2" style="border:1px solid #555;padding:5px 3px;font-size:8px;background:#e9edf3">Eye</th>
  <th colspan="4" style="border:1px solid #555;padding:5px 3px;font-size:8.5px;background:#dfeeff;color:#0f4c81">VA</th>
  <th colspan="3" style="border:1px solid #555;padding:5px 3px;font-size:8.5px;background:#e8f5e9;color:#165b2f">Current Glasses</th>
  <th colspan="3" style="border:1px solid #555;padding:5px 3px;font-size:8.5px;background:#efe6ff;color:#5c2a9d">AR / Cycloplegic</th>
  <th colspan="4" style="border:1px solid #555;padding:5px 3px;font-size:8.5px;background:#fff1df;color:#8a4200">Subjective Refraction</th>
</tr>
<tr>
  ${examHead('UCVA','#dfeeff','#0f4c81')}
  ${examHead('BCVA','#dfeeff','#0f4c81')}
  ${examHead('PH','#dfeeff','#0f4c81')}
  ${examHead('Near','#dfeeff','#0f4c81')}
  ${examHead('Sph','#e8f5e9','#165b2f')}
  ${examHead('Cyl','#e8f5e9','#165b2f')}
  ${examHead('Axis','#e8f5e9','#165b2f')}
  ${examHead('Sph','#efe6ff','#5c2a9d')}
  ${examHead('Cyl','#efe6ff','#5c2a9d')}
  ${examHead('Axis','#efe6ff','#5c2a9d')}
  ${examHead('Sph','#fff1df','#8a4200')}
  ${examHead('Cyl','#fff1df','#8a4200')}
  ${examHead('Axis','#fff1df','#8a4200')}
  ${examHead('VA','#fff1df','#8a4200')}
</tr>
</thead>
<tbody>
<tr>
  <td style="font-weight:900;text-align:center;border:1px solid #555;padding:6px 3px;font-size:9px;background:#eef5ff;color:#0f4c81">OD</td>
  ${examCell(ucvaOD)}${examCell(bcvaOD)}${examCell(phOD)}${examCell(document.getElementById('ucva-od-near')?.value || '—')}
  ${examCell(rf.odSph2)}${examCell(rf.odCyl2)}${examCell(rf.odAx2)}
  ${examCell(rf.cycODsph)}${examCell(rf.cycODcyl)}${examCell(rf.cycODax)}
  ${examCell(rf.subjODsph)}${examCell(rf.subjODcyl)}${examCell(rf.subjODax)}${examBlank()}
</tr>
<tr>
  <td style="font-weight:900;text-align:center;border:1px solid #555;padding:6px 3px;font-size:9px;background:#edf9f0;color:#165b2f">OS</td>
  ${examCell(ucvaOS)}${examCell(bcvaOS)}${examCell(phOS)}${examCell(document.getElementById('ucva-os-near')?.value || '—')}
  ${examCell(rf.osSph2)}${examCell(rf.osCyl2)}${examCell(rf.osAx2)}
  ${examCell(rf.cycOSsph)}${examCell(rf.cycOScyl)}${examCell(rf.cycOSax)}
  ${examCell(rf.subjOSsph)}${examCell(rf.subjOScyl)}${examCell(rf.subjOSax)}${examBlank()}
</tr>
</tbody>
</table>
<div style="font-size:8.2px;margin-top:5px;line-height:1.35"><b>Colour vision:</b> OD ${escHtml(cvOD)} · OS ${escHtml(cvOS)}</div>`;
  const tdIop = (v) => `<td style="text-align:center;padding:6px 4px;border:1px solid #777;font-size:9px;font-weight:700;line-height:1.2">${escHtml(v)}</td>`;
  const iopTableHtml = `<table style="width:100%;border-collapse:collapse;table-layout:fixed;font-size:8.8px;line-height:1.18;margin-top:3px">
<thead><tr style="background:#eef1f6">
  <th style="border:1px solid #777;padding:4px 5px;width:20%">Method</th>
  <th style="border:1px solid #777;padding:4px 5px">OD</th>
  <th style="border:1px solid #777;padding:4px 5px">OS</th>
  <th style="border:1px solid #777;padding:4px 5px">Time OD</th>
  <th style="border:1px solid #777;padding:4px 5px">Time OS</th>
</tr></thead>
<tbody>
<tr>
  <td style="border:1px solid #777;padding:5px 4px;font-weight:800;background:#fff7e0;color:#8a4200">GAT</td>
  ${tdIop(gatOD)}${tdIop(gatOS)}${tdIop(gatTOD)}${tdIop(gatTOS)}
</tr>
<tr>
  <td style="border:1px solid #777;padding:5px 4px;font-weight:800;background:#e8f0fe;color:#0f4c81">NCT</td>
  ${tdIop(nctOD)}${tdIop(nctOS)}${tdIop(nctTOD)}${tdIop(nctTOS)}
</tr>
</tbody>
</table>`;
  const gonioPachyHtml = `<table style="width:100%;border-collapse:collapse;table-layout:fixed;margin-top:3px">
<thead><tr style="background:#f4edff">
  <th style="border:1px solid #777;padding:4px 5px;font-size:8px">Item</th>
  <th style="border:1px solid #777;padding:4px 5px;font-size:8px">OD</th>
  <th style="border:1px solid #777;padding:4px 5px;font-size:8px">OS</th>
</tr></thead>
<tbody>
<tr>
  <td style="border:1px solid #777;padding:5px 4px;font-weight:800;background:#f7f2ff;color:#5c2a9d">Pachymetry</td>
  ${tdIop(pachOD)}
  ${tdIop(pachOS)}
</tr>
<tr>
  <td style="border:1px solid #777;padding:5px 4px;font-weight:800;background:#f7f2ff;color:#5c2a9d">Corrected IOP</td>
  ${tdIop(corrOD)}
  ${tdIop(corrOS)}
</tr>
<tr>
  <td style="border:1px solid #777;padding:5px 4px;font-weight:800;background:#f7f2ff;color:#5c2a9d">Gonioscopy</td>
  ${tdIop(gonioOD)}
  ${tdIop(gonioOS)}
</tr>
</tbody>
</table>`;
  const ocularField = (label, val) => `<tr><td style="font-size:8px;font-weight:700;padding:3px 4px;border:1px solid #bbb;width:19%;vertical-align:top;background:#f2f2f2;line-height:1.2">${escHtml(label)}</td><td style="font-size:8.6px;padding:3px 4px;border:1px solid #bbb;word-break:break-word;line-height:1.24">${escHtml(val) || '—'}</td></tr>`;
  const fieldLinePrint = (label, val) => ocularField(label, val);
  const slJoin = (struct, eye) => (slData[struct]?.[eye] || []).join(', ');
  const anteriorPrint = (eye) => `<table style="border-collapse:collapse;width:100%">${fieldLinePrint('Lids/Lashes', slJoin('Lids/Lashes', eye))}${fieldLinePrint('Conjunctiva', slJoin('Conjunctiva', eye))}${fieldLinePrint('Cornea', slJoin('Cornea', eye))}${fieldLinePrint('Iris / Pupil', [slJoin('Iris', eye), slJoin('Pupil', eye)].filter(Boolean).join(' · '))}${fieldLinePrint('A/C', slJoin('AC', eye))}${fieldLinePrint('Lens', slJoin('Lens', eye))}</table>`;
  const posteriorPrint = (eye) => {
    const disc = eye === 'od' ? fund.odDisc : fund.osDisc;
    const cd = eye === 'od' ? fund.odCD : fund.osCD;
    const mac = eye === 'od' ? fund.odMac : fund.osMac;
    const ves = eye === 'od' ? fund.odVes : fund.osVes;
    const per = eye === 'od' ? fund.odPer : fund.osPer;
    const fundTxt = eye === 'od' ? fund.odTxt : fund.osTxt;
    const vit = slJoin('Vitreous', eye);
    return `<table style="border-collapse:collapse;width:100%;table-layout:fixed">${fieldLinePrint('Media (vitreous)', vit)}${fieldLinePrint('C/D', cd)}${fieldLinePrint('Disc', disc)}${fieldLinePrint('Macula', mac)}${fieldLinePrint('Vessels (A/V)', ves)}${fieldLinePrint('Periphery', per)}</table>${fundTxt ? `<div style="font-size:7px;color:#333;margin-top:2px;white-space:pre-wrap;line-height:1.18">${escHtml(fundTxt)}</div>` : ''}`;
  };
  const lblEye = (e) => (e === 'od' ? 'OD' : 'OS');
  const smallLogoSrc = typeof getLetterheadImgSrc === 'function' ? getLetterheadImgSrc() : 'https://bawejahospital.com/img/logo.png';
  let ocularDiagramPrintSrc = 'assets/ocular-health-exam.png';
  try {
    ocularDiagramPrintSrc = new URL('assets/ocular-health-exam.png', document.querySelector('base')?.href || window.location.href).href;
  } catch (e) { /* keep relative */ }
  const ocularDiagramsHtml = '<div style="width:100%;max-width:204px;margin:0 auto;text-align:center">'
    + '<img src="' + ocularDiagramPrintSrc + '" alt="Ocular health examination diagram" style="width:100%;height:auto;display:block;border:1px solid #333;border-radius:4px;background:#fff" onerror="this.style.display=\'none\'"/>'
    + '<div style="font-size:6.4px;color:#555;margin-top:2px;line-height:1.1">Ocular health (diagram)</div></div>';
  const ocularBlock = `
<div style="margin-top:3px;page-break-inside:avoid">
<h2 style="font-size:10.6px;margin:2px 0 1px;padding:0">Slit lamp &amp; fundus</h2>
<div style="display:grid;grid-template-columns:minmax(0,.74fr) 298px minmax(0,.74fr);grid-template-rows:auto auto;gap:3px 4px;align-items:start;width:100%">
  <div style="grid-column:1;grid-row:1;min-width:0">
    <div style="font-size:9.4px;font-weight:900;margin:0 0 1px;color:#1a4a8c">${lblEye('od')} — Ant.</div>
    ${anteriorPrint('od')}
  </div>
  <div style="grid-column:3;grid-row:1;min-width:0">
    <div style="font-size:9.4px;font-weight:900;margin:0 0 1px;color:#1a4a8c">${lblEye('od')} — Post.</div>
    ${posteriorPrint('od')}
  </div>
  <div style="grid-column:1;grid-row:2;min-width:0">
    <div style="font-size:9.4px;font-weight:900;margin:0 0 1px;color:#1a7a4a">${lblEye('os')} — Ant.</div>
    ${anteriorPrint('os')}
  </div>
  <div style="grid-column:3;grid-row:2;min-width:0">
    <div style="font-size:9.4px;font-weight:900;margin:0 0 1px;color:#1a7a4a">${lblEye('os')} — Post.</div>
    ${posteriorPrint('os')}
  </div>
  <div style="grid-column:2;grid-row:1 / span 2;align-self:center;justify-self:center;padding:4px;border:1px solid #333;border-radius:3px;background:#fff;max-width:304px;width:100%">
    <div style="font-size:8.8px;font-weight:900;text-align:center;margin-bottom:2px;line-height:1.18">Lids · Cornea · Lens · Fundus</div>
    ${ocularDiagramsHtml}
    ${slNotes ? `<div style="font-size:7.9px;color:#222;margin-top:3px;text-align:left;line-height:1.2;white-space:pre-wrap;border-top:1px solid #ddd;padding-top:2px">${escHtml(slNotes)}</div>` : ''}
  </div>
</div>
</div>`;

  // ── build HTML ────────────────────────────────────────────────────────
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Case Sheet — ${ptName}</title><style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Arial,Helvetica,sans-serif;color:#111;padding:1mm 1.5mm;font-size:10.7px;line-height:1.24}
@page{size:A4 portrait;margin:1.5mm}
@media print{body{padding:0}}
h1{font-size:13.6px;font-weight:900;text-align:center;letter-spacing:.45px;text-transform:uppercase;border-bottom:1.5px solid #111;padding-bottom:2px;margin-bottom:3px}
h2{font-size:10.4px;font-weight:900;text-transform:uppercase;letter-spacing:.3px;border-bottom:1px solid #111;padding-bottom:1px;margin-bottom:2px;margin-top:4px}
table{width:100%;border-collapse:collapse;font-size:9.4px}
th,td{border:1px solid #555;padding:2px 3px}
th{background:#eee;font-weight:900;text-align:center;font-size:8.8px}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:4px}
.label{font-weight:700;font-size:6.9px;color:#555;text-transform:uppercase}
.val{font-size:8px;font-weight:900}
.circles{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;margin:2px 0}
.phx-table td{padding:1px 3px;font-size:6.6px;border:1px solid #aaa}
.dx{display:inline-block;border:1px solid #333;border-radius:8px;padding:1px 5px;margin:1px;font-size:6.8px;font-weight:700}
.sig-line{border-bottom:1px solid #555;margin-top:8px;width:120px;display:inline-block}
</style></head><body>

<!-- HEADER: compact single-page layout -->
<div style="border-bottom:1.5px solid #111;padding-bottom:3px;margin-bottom:3px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px">
    <div style="display:flex;align-items:flex-start;gap:6px;flex:1;min-width:0">
      <div style="flex-shrink:0;width:46px;display:flex;justify-content:center;padding-top:1px">
        <img src="${escHtml(smallLogoSrc)}" alt="Baweja Hospital" style="width:40px;height:40px;object-fit:contain" onerror="this.style.display='none'">
      </div>
      <div style="flex:1;min-width:0;text-align:center">
        <h1 style="font-size:12.4px;font-weight:900;letter-spacing:.45px;text-transform:uppercase;margin:0 0 3px 0;padding:0;border:none">Baweja Multispeciality Hospital — OPD</h1>
        <div style="font-size:10px;line-height:1.42"><b>Today:</b> ${escHtml(today)} · <b>Pt:</b> ${escHtml(ptName)} · <b>Age/Sex:</b> ${escHtml(String(ptAge || '—'))}${ptSex ? '/' + escHtml(ptSex) : ''} · <b>Centre:</b> ${centre === 'CHD' ? 'CHD' : 'RPR'} · <b>Dr:</b> ${escHtml(drName)}</div>
        <div style="font-size:9.2px;line-height:1.35;margin-top:2px"><b>Ph:</b> ${escHtml(ptMob || '—')} · <b>Addr:</b> ${escHtml(ptAddr || '—')} · <b>Printed:</b> ${escHtml(printDate)}</div>
      </div>
    </div>
    <div style="text-align:right;flex-shrink:0;padding:1px 2px 1px 8px;border-left:2px solid #1A3C6E;min-width:92px">
      <div style="font-size:15.8px;font-weight:900;font-family:Consolas,ui-monospace,monospace;letter-spacing:.04em;line-height:1">${escHtml(ptId || '—')}</div>
      <div style="font-size:7px;font-weight:800;color:#1A3C6E;text-transform:uppercase;margin-top:2px">BMH ID</div>
    </div>
  </div>
</div>

<!-- Personal history | Chief complaints -->
<div style="display:grid;grid-template-columns:minmax(0,30%) minmax(0,70%);gap:5px;align-items:stretch;margin-bottom:4px">
  <div style="border:1px solid #bbb;border-radius:4px;padding:4px 5px;background:#f8f8f8;display:flex;flex-direction:column">
    <div style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.2px;border-bottom:1px solid #ccc;margin-bottom:2px;padding-bottom:2px;color:#333">Personal history (systemic)</div>
    <table style="width:100%;border-collapse:collapse;line-height:1.1;flex:1">
      <thead><tr style="background:#eaeaea"><th style="border:1px solid #aaa;padding:2px;text-align:left;font-size:7.7px">C</th><th style="border:1px solid #aaa;padding:2px;font-size:7.7px">?</th><th style="border:1px solid #aaa;padding:2px;text-align:left;font-size:7.7px">Dur</th><th style="border:1px solid #aaa;padding:2px;text-align:left;font-size:7.7px">Rx</th></tr></thead>
      <tbody>${phxRowsHtml}</tbody>
    </table>
    <div style="font-size:8.9px;line-height:1.34;margin-top:4px;color:#222">
      <b>Past ocular</b> OD ${escHtml(pohOD)}${pohOdTxt ? ' — ' + escHtml(pohOdTxt) : ''} · OS ${escHtml(pohOS)}${pohOsTxt ? ' — ' + escHtml(pohOsTxt) : ''}<br/>
      <b>Allergy</b> ${escHtml(drugAl)}${drugAlSpec ? ' (' + escHtml(drugAlSpec) + ')' : ''} · <b>Family</b> ${escHtml(famHx || '—')} · <b>Other</b> ${escHtml(othHx || '—')}
    </div>
  </div>
  <div style="border:1px solid #b8c8dc;border-radius:4px;padding:8px 10px;background:#f2f6fc;font-size:10.4px;line-height:1.5;display:flex;flex-direction:column;min-height:100%">
    <div style="font-size:10.7px;font-weight:900;color:#1A3C6E;text-transform:uppercase;margin-bottom:6px;letter-spacing:.2px;border-bottom:1px solid rgba(26,60,110,.2);padding-bottom:4px">Chief complaints &amp; spectacle history</div>
    ${chiefComplaintsEnabled ? `<div style="margin-bottom:6px"><b>CC:</b> ${escHtml(ccStr)}</div>` : ''}
    <div><b>Spectacles:</b> ${escHtml(hxSpec)}</div>
    <div><b>Last spectacle change:</b> ${escHtml(hxLastSpec)}</div>
    <div><b>Ocular meds (history):</b> ${escHtml(hxOcularMeds)}</div>
  </div>
</div>

<div style="margin-top:3px">
  <h2 style="margin:0 0 2px;font-size:10.1px">VA / refraction</h2>
  ${examTableHtml}
</div>

<div style="margin-top:4px;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:6px;align-items:start">
  <div>
    <h2 style="margin:0 0 2px;font-size:10.1px">IOP</h2>
    ${iopTableHtml}
  </div>
  <div>
    <h2 style="margin:0 0 2px;font-size:10.1px">Gonioscopy & pachymetry</h2>
    ${gonioPachyHtml}
  </div>
</div>

${ocularBlock}

<!-- DIAGNOSIS & PLAN -->
<h2 style="font-size:10px;margin-top:3px">Diagnosis</h2>
${dxLines.length ? `<table style="font-size:8.4px">
<thead><tr style="background:#eee"><th style="width:24px;text-align:center;border:1px solid #555">#</th><th style="text-align:left;border:1px solid #555">Diagnosis (ICD-10)</th></tr></thead>
<tbody>${dxLines.map((d,i)=>`<tr><td style="text-align:center;border:1px solid #aaa;font-weight:900;padding:2px">${i+1}</td><td style="border:1px solid #aaa;padding:3px 5px;font-weight:600;line-height:1.22">${escHtml(d)}</td></tr>`).join('')}</tbody>
</table>` : '<div style="font-size:6.5px;color:#666">—</div>'}
${dxNotes ? `<div style="margin-top:3px;font-size:8.1px;line-height:1.3;border:1px dashed #aaa;border-radius:4px;padding:4px;background:#fafafa"><span style="font-weight:900;font-size:7px;color:#555">Notes</span><div style="margin-top:2px;white-space:pre-wrap">${escHtml(dxNotes)}</div></div>` : ''}

${drugs.length?`
<h2 style="font-size:10px;margin-top:3px">Rx</h2>
<table style="font-size:8px">
<thead><tr style="background:#1A3C6E;color:#fff">
  <th style="width:16px;text-align:center;border:1px solid #1A3C6E;padding:2px">#</th>
  <th style="border:1px solid #1A3C6E;padding:2px">Drug</th>
  <th style="text-align:center;width:58px;border:1px solid #1A3C6E;padding:2px">Eye</th>
  <th style="text-align:center;width:80px;border:1px solid #1A3C6E;padding:2px">Freq</th>
  <th style="text-align:center;width:54px;border:1px solid #1A3C6E;padding:2px">Dur</th>
</tr></thead>
<tbody>${drugs.map((d,i)=>`<tr style="background:${i%2?'#f9f9f9':'#fff'}">
  <td style="text-align:center;padding:2px 3px;border:1px solid #e0e0e0">${i+1}</td>
  <td style="padding:2px 4px;border:1px solid #e0e0e0;line-height:1.18"><b>${d.name||''}</b>${d.brand&&d.brand!==d.name?` (${d.brand})`:''}</td>
  <td style="text-align:center;padding:2px 3px;border:1px solid #e0e0e0">${(d.eye||[]).join(', ')||'—'}</td>
  <td style="text-align:center;padding:2px 3px;border:1px solid #e0e0e0">${d.freq||'—'}</td>
  <td style="text-align:center;padding:2px 3px;border:1px solid #e0e0e0">${d.dur||'—'}</td>
</tr>`).join('')}</tbody>
</table>`:''}

${(()=>{
  const fuDate = document.getElementById('rx-fu-date')?.value;
  const fuFmt = fuDate ? new Date(fuDate).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'long',year:'numeric'}) : '';
  return fuFmt ? `<div style="background:#EBF3FF;border-radius:4px;padding:3px 8px;display:inline-block;font-size:6.5px;font-weight:800;color:#1A3C6E;border:1px solid rgba(26,60,110,.25);margin:2px 0 4px">Next: ${fuFmt}</div>` : '';
})()}

<!-- SIGNATURE -->
<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:6px;border-top:1px solid #aaa;padding-top:4px">
  <div>
    <div class="label" style="font-size:6px">Patient / Guardian</div>
    <div class="sig-line" style="margin-top:4px"></div>
  </div>
  <div style="text-align:right">
    <div style="font-size:7.5px;font-weight:900">${drName}</div>
    <div style="font-size:6px;color:#555">Ophthalmology</div>
    <div class="sig-line" style="width:130px"></div>
    <div class="label" style="font-size:6px">Date: ${today}</div>
  </div>
</div>

</body></html>`;

  return html;
}
function printCaseSheet(opts) {
  const html = buildOphthoCaseSheetHtml();
  if(opts && opts.preview) {
    const w = window.open('', '_blank', 'width=980,height=920');
    if(w) { w.document.write(html); w.document.close(); w.focus(); }
    showToast('Preview opened — review layout, then Print from browser if needed', 'i');
    return;
  }
  if(typeof safePrint==='function') safePrint(html);
  else {
    const w = window.open('','_blank','width=900,height=750');
    if(w){ w.document.write(html); w.document.close(); setTimeout(()=>w.print(),400); }
  }
  showToast('Case sheet ready to print ✓','s');
}
function previewCaseSheet() { printCaseSheet({ preview: true }); }
function printPsychSheet() { if(typeof window.printUnifiedRx === 'function') { window.printUnifiedRx('psych'); } else { showToast('Psychiatry summary printing ✓','s'); setTimeout(()=>window.print(),300); } }
function printSkinSheet() { if(typeof window.printUnifiedRx === 'function') { window.printUnifiedRx('skin'); } else { showToast('Skin summary printing ✓','s'); setTimeout(()=>window.print(),300); } }
function printDischarge() {
  const html = buildDischargeCardPrintHtml();
  if (!html) { showToast('Select a patient first', 'w'); return; }
  safePrint(html);
  showToast('Discharge card ready to print ✓', 's');
}
function printRx() { if (typeof window.printUnifiedRx === 'function') window.printUnifiedRx('oe'); }

function doPrint(type) {
  const titles = {'case-sheet':'Ophthalmology Case Sheet','ophtho':'Eye Examination Sheet','rx':'Prescription','obg-anc-card':'ANC Card','psych-summary':'Psychiatry Summary','skin-summary':'Skin & Cosmetology Summary'};
  safePrint(html);
  showToast('Printed ✓','s');
}

function generatePrintHTML(type) {
  const today = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  const header = `<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding-bottom:12px;border-bottom:2.5px solid #1A3C6E;margin-bottom:15px"><div style="margin-bottom:14px;page-break-inside:avoid"><img src="" class="lh-img-tag" data-lhsrc="1" alt="Baweja Multispeciality Hospital" style="width:100%;max-width:720px;height:auto;display:block"></div><div style="text-align:right;flex-shrink:0"><div style="font-size:9px;color:#444;margin-bottom:6px">&#9993; info&#64;bawejahospital.com</div><div style="font-size:9px;color:#333;margin-top:4px;line-height:2">&#127760; www.bawejahospital.com<br>&#127760; www.bmhchandigarh.com</div></div></div>`;
  const ptBlock = `<div style="background:#f0f4ff;border-radius:8px;padding:10px;margin-bottom:14px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;font-size:12px">
    <div><div style="font-size:9px;font-weight:800;color:#888;text-transform:uppercase">Patient</div><div style="font-weight:800">Test Patient A</div></div>
    <div><div style="font-size:9px;font-weight:800;color:#888;text-transform:uppercase">BMH ID</div><div style="font-family:monospace;font-weight:800;color:#0B7B8C">BMSH-000001</div></div>
    <div><div style="font-size:9px;font-weight:800;color:#888;text-transform:uppercase">Age / Sex</div><div style="font-weight:800">34Y / Male</div></div>
    <div><div style="font-size:9px;font-weight:800;color:#888;text-transform:uppercase">Doctor</div><div style="font-weight:800">Dr. Varun Baweja</div></div>
  </div>`;

  let body = '';
  if (type === 'rx') {
    const drugs = RX_DRUGS.map((d,i) => `<div style="padding:9px 12px;margin-bottom:8px;border-left:3px solid #007AFF;background:#f5f8ff;border-radius:0 7px 7px 0">
      <div style="font-size:13px;font-weight:800">${i+1}. ${d.name} (${d.brand})</div>
      <div style="font-size:11px;color:#555;margin-top:3px">Eye: ${d.eye.join(', ')} · ${d.freq} · ${d.dur}</div>
      <div style="font-size:11px;color:#5856D6;font-style:italic;margin-top:3px">${d.lang.pa}</div>
    </div>`).join('');
    body = `<div style="font-size:28px;color:#1A3C6E;font-weight:300;margin-bottom:10px">℞ Prescription</div>${drugs}
    <div style="margin-top:14px;padding:10px;background:#fff3e0;border-radius:8px;border-left:3px solid #FF9500;font-size:11.5px">
      <strong>Instructions:</strong> Always leave 10 minutes between different drops. Wear dark glasses outdoors.
    </div>
    <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div><div style="font-size:9px;font-weight:800;color:#888;text-transform:uppercase;margin-bottom:25px">Patient Signature</div><div style="border-bottom:1px solid #333"></div></div>
      <div style="text-align:right"><div style="font-size:12px;font-weight:800;color:#1A3C6E">Dr. Varun Baweja, MS (Ophth)</div><div style="border-bottom:1px solid #333;margin-top:25px"></div><div style="font-size:9px;color:#888;margin-top:3px">Doctor's Signature & Date</div></div>
    </div>`;
  } else if (type === 'ophtho') {
    const vaOd = document.getElementById('va-od-uc')?.value || '6/12';
    const vaOs = document.getElementById('va-os-uc')?.value || '6/60';
    body = `<div style="font-size:14px;font-weight:900;color:#1A3C6E;border-bottom:2px solid #D4A017;padding-bottom:6px;margin-bottom:12px">👁️ Eye Examination Record</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
      <div style="background:#e3eeff;border-radius:8px;padding:10px">
        <div style="font-weight:800;color:#007AFF;margin-bottom:8px">Right Eye (OD)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;font-size:12px">
          <div><div style="font-size:9px;color:#888;font-weight:700">UCVA</div><div style="font-weight:900;font-size:14px">${document.getElementById('va-od-uc')?.value||''}</div></div>
          <div><div style="font-size:9px;color:#888;font-weight:700">BCVA</div><div style="font-weight:900;font-size:14px">${document.getElementById('va-od-bc')?.value||''}</div></div>
          <div><div style="font-size:9px;color:#888;font-weight:700">IOP</div><div style="font-weight:900;font-size:14px">${document.getElementById('iop-od-val')?.textContent||'14'} mmHg</div></div>
        </div>
      </div>
      <div style="background:#e6f9ed;border-radius:8px;padding:10px">
        <div style="font-weight:800;color:#1a8c3c;margin-bottom:8px">Left Eye (OS)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;font-size:12px">
          <div><div style="font-size:9px;color:#888;font-weight:700">UCVA</div><div style="font-weight:900;font-size:14px">${document.getElementById('va-os-uc')?.value||''}</div></div>
          <div><div style="font-size:9px;color:#888;font-weight:700">BCVA</div><div style="font-weight:900;font-size:14px">${document.getElementById('va-os-bc')?.value||''}</div></div>
          <div><div style="font-size:9px;color:#888;font-weight:700">IOP</div><div style="font-weight:900;font-size:14px">${document.getElementById('iop-os-val')?.textContent||'24'} mmHg</div></div>
        </div>
      </div>
    </div>
    <div style="background:#f5f5f7;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-weight:800;color:#1A3C6E;margin-bottom:6px;font-size:12px">Slit Lamp (Selected Findings)</div>
      <div style="font-size:12px;color:#333;line-height:1.8">Cornea: Clear &nbsp;|&nbsp; AC: Deep & Clear &nbsp;|&nbsp; Lens: NSC III &nbsp;|&nbsp; Pupil: Round & Reacting</div>
    </div>
    <div style="background:#f5f5f7;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-weight:800;color:#1A3C6E;margin-bottom:6px;font-size:12px">Fundus</div>
      <div style="font-size:12px;color:#333"><strong>OD:</strong> ${document.getElementById('fundus-od')?.value||'Normal'}<br><strong>OS:</strong> ${document.getElementById('fundus-os')?.value||'Normal'}</div>
    </div>
    <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div><div style="border-bottom:1px solid #333;margin-top:30px"></div><div style="font-size:9px;color:#888;margin-top:3px">Patient Signature</div></div>
      <div style="text-align:right"><div style="font-size:12px;font-weight:800;color:#1A3C6E">Dr. Varun Baweja, MS (Ophth)</div><div style="border-bottom:1px solid #333;margin-top:20px"></div><div style="font-size:9px;color:#888;margin-top:3px">Signature & Date</div></div>
    </div>`;
  } else if (type === 'obg-anc-card') {
    body = `<div style="font-size:14px;font-weight:900;color:#1A3C6E;border-bottom:2px solid #D4A017;padding-bottom:6px;margin-bottom:12px">🤰 ANC Card — Baweja Multispeciality Hospital</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;font-size:12px">
      <div><b>Patient:</b> Test Patient E</div><div><b>BMH ID:</b> BMSH-000005</div>
      <div><b>Age:</b> 26 Years</div><div><b>GPAL:</b> G2P1A0L1</div>
      <div><b>LMP:</b> 15 Aug 2024</div><div><b>EDD:</b> 22 May 2025</div>
      <div><b>Blood Group:</b> O+ve</div><div><b>Doctor:</b> Dr. Geeta Baweja</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:11px;margin-bottom:14px">
      <thead><tr style="background:#1A3C6E;color:#fff"><th style="padding:6px 8px;text-align:left">Visit</th><th style="padding:6px 8px">Date</th><th style="padding:6px 8px">GA</th><th style="padding:6px 8px">Wt</th><th style="padding:6px 8px">BP</th><th style="padding:6px 8px">FHR</th><th style="padding:6px 8px">FH</th><th style="padding:6px 8px">Presentation</th></tr></thead>
      <tbody>
        <tr style="border-bottom:1px solid #eee"><td style="padding:6px 8px">ANC 3</td><td>01 Feb 25</td><td>28w</td><td>59kg</td><td>114/74</td><td>142</td><td>26cm</td><td>Cephalic</td></tr>
        <tr style="border-bottom:1px solid #eee;background:#f9f9f9"><td style="padding:6px 8px">ANC 4</td><td>15 Mar 25</td><td>32+3w</td><td>62kg</td><td>118/76</td><td>146</td><td>30cm</td><td>Cephalic</td></tr>
      </tbody>
    </table>
    <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div><div style="border-bottom:1px solid #333;margin-top:30px"></div><div style="font-size:9px;color:#888;margin-top:3px">Patient Signature</div></div>
      <div style="text-align:right"><div style="font-size:12px;font-weight:800;color:#1A3C6E">Dr. Geeta Baweja, MS (OBG)</div><div style="border-bottom:1px solid #333;margin-top:20px"></div><div style="font-size:9px;color:#888;margin-top:3px">Signature & Date</div></div>
    </div>`;
  } else if (type === 'psych-summary') {
    body = `<div style="font-size:14px;font-weight:900;color:#1A3C6E;border-bottom:2px solid #D4A017;padding-bottom:6px;margin-bottom:12px">🧠 Psychiatry Summary — Test Patient D</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;font-size:12px">
      <div><b>Patient:</b> Test Patient D</div><div><b>BMH ID:</b> BMH-CHD-2025-0901</div>
      <div><b>Diagnosis:</b> F32.1 — MDE Moderate</div><div><b>Doctor:</b> Dr. Tarun Baweja</div>
    </div>
    <div style="background:#f0eeff;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-weight:800;margin-bottom:6px;font-size:12px">Rating Scales</div>
      <div style="font-size:12px">PHQ-9: <strong>17</strong> (Moderately Severe Depression) &nbsp;|&nbsp; GAD-7: <strong>8</strong> (Moderate Anxiety)</div>
    </div>
    <div style="background:#f5f5f7;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-weight:800;margin-bottom:6px;font-size:12px">Current Medications</div>
      <div style="font-size:12px;line-height:1.8">1. Escitalopram 10mg — 1 tablet at night (SSRI)<br>2. Clonazepam 0.5mg — bedtime (2 weeks only)</div>
    </div>
    <div style="background:#f5f5f7;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-weight:800;margin-bottom:6px;font-size:12px">Risk Assessment</div>
      <div style="font-size:12px">Suicidal Ideation: Absent &nbsp;|&nbsp; Self Harm: Absent &nbsp;|&nbsp; Substance Use: Monitor</div>
    </div>
    <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div><div style="border-bottom:1px solid #333;margin-top:30px"></div><div style="font-size:9px;color:#888;margin-top:3px">Patient Signature</div></div>
      <div style="text-align:right"><div style="font-size:12px;font-weight:800;color:#1A3C6E">Dr. Tarun Baweja, MD (Psychiatry)</div><div style="border-bottom:1px solid #333;margin-top:20px"></div><div style="font-size:9px;color:#888;margin-top:3px">Signature & Date</div></div>
    </div>`;
  } else if (type === 'skin-summary') {
    body = `<div style="font-size:14px;font-weight:900;color:#1A3C6E;border-bottom:2px solid #D4A017;padding-bottom:6px;margin-bottom:12px">💆 Skin & Cosmetology Record — Test Patient F</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;font-size:12px">
      <div><b>Patient:</b> Test Patient F</div><div><b>BMH ID:</b> BMSH-000006</div>
      <div><b>Diagnosis:</b> Melasma (Epidermal)</div><div><b>Doctor:</b> Dr. Pooja Baweja</div>
      <div><b>Skin Type:</b> Fitzpatrick IV</div><div><b>Treatment:</b> Chemical Peel + Microneedling</div>
    </div>
    <div style="background:#f5f5f7;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-weight:800;margin-bottom:6px;font-size:12px">Procedures Done</div>
      <div style="font-size:12px">Chemical Peel (Glycolic 30%) — Session 1 of 4 · 15 Mar 2025</div>
    </div>
    <div style="background:#f0eeff;border-radius:8px;padding:10px;margin-bottom:10px">
      <div style="font-weight:800;margin-bottom:6px;font-size:12px">Medications</div>
      <div style="font-size:12px;line-height:1.8">1. Tretinoin 0.025% — at night<br>2. Hydroquinone 2% + Kojic Acid — morning<br>3. SPF 50+ Sunscreen — mandatory daily</div>
    </div>
    <div style="margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div><div style="border-bottom:1px solid #333;margin-top:30px"></div><div style="font-size:9px;color:#888;margin-top:3px">Patient Signature</div></div>
      <div style="text-align:right"><div style="font-size:12px;font-weight:800;color:#1A3C6E">Dr. Pooja Baweja, MD (Dermatology)</div><div style="border-bottom:1px solid #333;margin-top:20px"></div><div style="font-size:9px;color:#888;margin-top:3px">Signature & Date</div></div>
    </div>`;
  } else {
    body = `<div style="padding:20px;text-align:center;color:#888">Document: ${type}</div>`;
  }

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    body{font-family:'Nunito',sans-serif;color:#1C1C1E;padding:18mm;font-size:12px;line-height:1.5}
    @page{size:A4 portrait;margin:12mm}
    @media print{body{padding:0}}
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  </head><body>${header}${ptBlock}${body}</body></html>`;
}


function updateNPDr() { const d=document.getElementById('np-dept')?.value; const s=document.getElementById('np-dr'); if(s) s.innerHTML=(DOCTORS[d]||['Dr. Varun Baweja']).map(x=>`<option>${x}</option>`).join(''); }
function calcNPAge() { const d=document.getElementById('np-dob')?.value; const el=document.getElementById('np-age'); if(!d||!el) return; const today=new Date(),bd=new Date(d); let age=today.getFullYear()-bd.getFullYear(); if(today.getMonth()<bd.getMonth()||(today.getMonth()===bd.getMonth()&&today.getDate()<bd.getDate())) age--; el.value=age+' years'; }
function regPt() { const fn=document.getElementById('np-fn')?.value||'New'; const ln=document.getElementById('np-ln')?.value||'Patient'; showToast('🆔 '+fn+' '+ln+' registered — '+document.getElementById('m-uid').textContent+' ✓','s'); closeM('m-np'); }
function doLogin(name, dept, role, centre) {
  document.getElementById('sbnm').textContent=name;
  document.getElementById('sbrl').textContent=dept+' · '+centre;
  document.getElementById('sbav').textContent=name.replace('Dr. ','').split(' ').map(n=>n[0]).join('').substring(0,2);
  closeM('m-login');
  showToast('Logged in as '+name,'i');
  // Build role-specific sidebar
  buildSidebarForRole(role, dept, name);
  if(role==='Doctor') nav('doctor-queue',null);
  else if(role==='Reception') nav('reception',null);
  else if(role==='Lab') nav('lab',null);
  else nav('dashboard',null);
}

function buildSidebarForRole(role, dept, name) {
  const nav_el = document.getElementById('sbnav'); if(!nav_el) return;
  if(role==='Doctor') {
    const deptNav = {
      'Ophthalmology': '<div class="ni" onclick="nav(\'ophtho\',this)"><div class="ni-ic">👁️</div>Eye Examination</div>',
      'OBG': '<div class="ni" onclick="nav(\'obg\',this)"><div class="ni-ic">🤰</div>OBG Clinic</div>',
      'Neuropsychiatry': '<div class="ni" onclick="nav(\'psych\',this)"><div class="ni-ic">🧠</div>Neuropsychiatry</div>',
      'Skin & Cosmetology': '<div class="ni" onclick="nav(\'skin\',this)"><div class="ni-ic">💆</div>Skin & Cosmetology</div>',
    };
    nav_el.innerHTML = `
      <div class="ngrp">My Patients</div>
      <div class="ni active" onclick="nav('doctor-queue',this)"><div class="ni-ic">🩺</div>My Queue<span class="nbadge pulse" id="nb-dq">0</span></div>
      ${deptNav[dept]||''}
      <div class="ni" onclick="nav('appointments',this)"><div class="ni-ic">📅</div>Appointments</div>
      <div class="ngrp">IPD / OT</div>
      <div class="ni" onclick="nav('ipd',this)"><div class="ni-ic">🛏️</div>IPD Patients<span class="nbadge" id="nb-ipd"></span></div>
      <div class="ni" onclick="nav('ot',this)"><div class="ni-ic">🔬</div>OT Module</div>
      <div class="ngrp">Finance</div>
      <div class="ni" onclick="nav('billing',this)"><div class="ni-ic">💳</div>My Payments<span class="nbadge pulse" id="nb-pay"></span></div>
      <div class="ngrp">Other</div>
      <div class="ni" onclick="nav('reports',this)"><div class="ni-ic">📊</div>Reports</div>
      <div class="ni" onclick="nav('settings',this)"><div class="ni-ic">⚙️</div>Settings</div>`;
  } else if(role==='Optometrist') {
    nav_el.innerHTML = `
      <div class="ngrp">My Queue</div>
      <div class="ni active" onclick="nav('doctor-queue',this)"><div class="ni-ic">🩺</div>Patient Queue<span class="nbadge pulse" id="nb-dq">0</span></div>
      <div class="ni" onclick="nav('ophtho',this)"><div class="ni-ic">👁️</div>Eye Examination</div>
      <div class="ni" onclick="nav('appointments',this)"><div class="ni-ic">📅</div>Appointments</div>
      <div class="ngrp">Other</div>
      <div class="ni" onclick="nav('reports',this)"><div class="ni-ic">📊</div>Reports</div>
      <div class="ni" onclick="nav('settings',this)"><div class="ni-ic">⚙️</div>Settings</div>`;
  } else if(role==='Reception') {
    nav_el.innerHTML = `
      <div class="ngrp">Reception</div>
      <div class="ni active" onclick="nav('reception',this)"><div class="ni-ic">🧾</div>Reception<span class="nbadge pulse" id="nb-rec">0</span></div>
      <div class="ni" onclick="nav('appointments',this)"><div class="ni-ic">📅</div>Appointments</div>
      <div class="ngrp">IPD / OT</div>
      <div class="ni" onclick="nav('ipd',this)"><div class="ni-ic">🛏️</div>IPD Patients<span class="nbadge" id="nb-ipd"></span></div>
      <div class="ni" onclick="nav('ot',this)"><div class="ni-ic">🔬</div>OT Module</div>
      <div class="ngrp">Finance</div>
      <div class="ni" onclick="nav('billing',this)"><div class="ni-ic">💳</div>Billing<span class="nbadge pulse" id="nb-pay"></span></div>
      <div class="ni" onclick="nav('tpa',this)"><div class="ni-ic">🏦</div>TPA / Cashless</div>
      <div class="ngrp">Reports</div>
      <div class="ni" onclick="nav('reports',this)"><div class="ni-ic">📊</div>Reports</div>`;
  } else if(role==='Lab') {
    nav_el.innerHTML = `
      <div class="ngrp">Lab</div>
      <div class="ni active" onclick="nav('lab',this)"><div class="ni-ic">🧪</div>Lab Module</div>
      <div class="ni" onclick="nav('reports',this)"><div class="ni-ic">📊</div>Reports</div>`;
  } else if(role==='Inventory') {
    nav_el.innerHTML = `
      <div class="ngrp">Inventory</div>
      <div class="ni active" onclick="nav('inventory',this)"><div class="ni-ic">📦</div>Inventory<span class="nbadge" id="nb-inv"></span></div>
      <div class="ni" onclick="nav('reports',this)"><div class="ni-ic">📊</div>Reports</div>
      <div class="ni" onclick="nav('settings',this)"><div class="ni-ic">⚙️</div>Settings</div>`;
  } else if(role==='TPA') {
    nav_el.innerHTML = `
      <div class="ngrp">Insurance / TPA</div>
      <div class="ni active" onclick="nav('tpa',this)"><div class="ni-ic">🏦</div>TPA / Cashless</div>
      <div class="ni" onclick="nav('billing',this)"><div class="ni-ic">💳</div>Billing</div>
      <div class="ni" onclick="nav('reports',this)"><div class="ni-ic">📊</div>Reports</div>`;
  }
  // Admin role keeps the full default sidebar — no change needed
}
function setCentre(c, btn) {
  // Only admin/BOTH users can switch — centre-locked users are blocked
  const uc = getUserCentre ? getUserCentre() : null;
  if(uc) { showToast('Centre is locked to '+uc+' for your login','w'); return; }
  document.querySelectorAll('.c-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tb-cp').textContent='📍 '+(c==='CHD'?'Chandigarh':'Ropar');
  showToast('Switched to '+(c==='CHD'?'Chandigarh':'Ropar')+' Centre','i');
  syncReceptionConsultationFee && syncReceptionConsultationFee();
  // Refresh all views after centre switch
  renderReceptionPage && renderReceptionPage();
  renderDocQueue && renderDocQueue();
  renderIPD && renderIPD();
}
function renderPaymentsPage() { const el=document.getElementById('pg-pay-content'); if(el) el.innerHTML='<div style="display:flex;flex-direction:column;gap:8px">'+PAY_REQUESTS.map(payCardHtml).join('')+'</div>'; }
function editTemplate(id) { showToast('Template editor opened ✓','i'); }

// TABS / MODAL / TOAST / MOB
function ptab(el, cId) {
  if (!el) return;
  const ptabsEl = el.closest('.ptabs');
  if (ptabsEl) {
    ptabsEl.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    const container = ptabsEl.parentElement;
    if (container) {
      container.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    }
  }
  el.classList.add('active');
  const tgt = document.getElementById(cId); if (tgt) tgt.classList.add('active');
  const page = el.closest('.page');
  const pageKey = page?.id?.replace(/^pg-/, '') || '';
  updateDepartmentRailVisibility(pageKey, cId);
}
function openM(id){
  const m=document.getElementById(id);
  if(m)m.classList.add('open');
  if(id==='m-print-tpl')loadTplDocs();
  if(id==='m-consents')renderConsentModal();
  if(id==='m-new-tpl')populateNewPackModal();
  if(id==='m-order-invest') {
    const modal = document.getElementById('m-order-invest');
    modal?.querySelectorAll('.ptabs .ptab').forEach((tab, idx) => tab.classList.toggle('active', idx === 0));
    modal?.querySelectorAll('.tab-content').forEach((tab, idx) => tab.classList.toggle('active', tab.id === 'inv-blood'));
    refreshInvestigationTemplateSelect && refreshInvestigationTemplateSelect();
    syncSelectedInvestigationCheckboxes && syncSelectedInvestigationCheckboxes();
  }
}
function closeM(id){const m=document.getElementById(id);if(m)m.classList.remove('open')}
document.addEventListener('click',e=>{document.querySelectorAll('.modal-ov').forEach(m=>{if(e.target===m)m.classList.remove('open')})});
function showToast(msg,type){const t=document.getElementById('toast'),tm=document.getElementById('t-msg'),ti=document.getElementById('t-ic');if(!t||!tm)return;t.className='toast '+(type||'');ti.textContent=type==='s'?'✅':type==='w'?'⚠️':'ℹ️';tm.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3200);}
function toggleMob(){document.getElementById('sidebar').classList.toggle('mob-open');document.getElementById('sbov').style.display=document.getElementById('sidebar').classList.contains('mob-open')?'block':'none'}
function closeMob(){document.getElementById('sidebar').classList.remove('mob-open');document.getElementById('sbov').style.display='none'}





function addPsychNote() {
  showToast('Progress note added ✓','s');
  const list = document.getElementById('psych-note-list'); if (!list) return;
  const today = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  const div = document.createElement('div');
  div.style.cssText='border-left:3px solid var(--blue);padding-left:12px;margin-bottom:12px';
  div.innerHTML = `<div style="font-size:12px;font-weight:900;color:var(--bmh-blue);margin-bottom:4px">${today} — New Note</div>
    <textarea style="width:100%;font-size:12px;min-height:70px;border:1.5px solid var(--g4);border-radius:8px;padding:7px;font-family:var(--font)" placeholder="Progress note…"></textarea>
    <div style="margin-top:5px;display:flex;gap:5px"><button class="btn btn-gold btn-xs" onclick="showToast('Note saved ✓','s')">Save</button><button class="btn btn-gray btn-xs" onclick="this.closest('div[style]').remove()">Cancel</button></div>`;
  list.prepend(div);
}

function addSkinProcedure() {
  showToast('Procedure added — fill details above ✓','i');
}

// ── Chief Complaint Autocomplete ─────────────────────────────────────────────
const CC_SUGGESTIONS = [
  'Decreased vision','Blurred vision','Double vision (Diplopia)','Loss of vision','Sudden loss of vision',
  'Pain in eye','Redness of eye','Watering of eye (Epiphora)','Discharge from eye','Itching in eye',
  'Foreign body sensation','Photophobia (light sensitivity)','Halos around lights','Night blindness',
  'Flashes of light (Photopsia)','Floaters in vision','Distorted vision (Metamorphopsia)','Field defect',
  'Drooping of eyelid (Ptosis)','Swelling of eyelid','Headache','Eyestrain (Asthenopia)',
  'Difficulty reading','Glare','Coloured halos','Eye fatigue','Squint (Strabismus)','Nystagmus',
  'Dry eyes','Eye injury / trauma','Post-operative follow-up','Spectacle change','Routine check-up'
];
function ccSuggest(inp) {
  const val = inp.value.toLowerCase().trim();
  const drop = inp.nextElementSibling; // the .cc-drop div
  if(!drop) return;
  if(!val || val.length < 2) { drop.style.display='none'; return; }
  const matches = CC_SUGGESTIONS.filter(s => s.toLowerCase().includes(val));
  if(!matches.length) { drop.style.display='none'; return; }
  drop.innerHTML = matches.slice(0,8).map(s =>
    `<div style="padding:7px 12px;cursor:pointer;font-size:12px;border-bottom:1px solid var(--g5)"
      onmousedown="event.preventDefault();document.getElementById('${inp.id}').value='${s.replace(/'/g,"\\'")}';this.closest('.cc-drop').style.display='none'"
      onmouseover="this.style.background='var(--g6)'" onmouseout="this.style.background=''">${s}</div>`
  ).join('');
  drop.style.display='block';
}
document.addEventListener('click', e=>{
  document.querySelectorAll('.cc-drop').forEach(d=>{
    if(!d.previousElementSibling?.contains(e.target)) d.style.display='none';
  });
});

// ── Ehlers et al. Pachymetry-corrected IOP ──
const EHLERS_TABLE = {445:7,455:6,465:6,475:5,485:4,495:4,505:3,515:2,525:1,535:1,545:0,555:-1,565:-1,575:-2,585:-3,595:-4,605:-4,615:-5,625:-6,635:-6,645:-7};
function getEhlersFactor(pachy) {
  if(!pachy) return null;
  // Round to nearest 10, clamp to table range
  let rounded = Math.round((pachy - 445) / 10) * 10 + 445;
  if(rounded < 445) rounded = 445;
  if(rounded > 645) rounded = 645;
  return EHLERS_TABLE[rounded] !== undefined ? EHLERS_TABLE[rounded] : null;
}
function updIOPWithPachy() {
  const gatOD   = parseFloat(document.getElementById('iop-gat-od')?.value)||0;
  const gatOS   = parseFloat(document.getElementById('iop-gat-os')?.value)||0;
  const pachyOD = parseFloat(document.getElementById('pachy-od')?.value)||0;
  const pachyOS = parseFloat(document.getElementById('pachy-os')?.value)||0;
  const corrEl_OD  = document.getElementById('iop-corr-od');
  const corrEl_OS  = document.getElementById('iop-corr-os');
  const ehlersOD_el = document.getElementById('iop-od-ehlers');
  const ehlersOS_el = document.getElementById('iop-os-ehlers');

  if(corrEl_OD && gatOD && pachyOD) {
    const factor = getEhlersFactor(pachyOD);
    if(factor !== null) {
      const corr = (gatOD + factor).toFixed(0);
      const sign = factor >= 0 ? '+' : '';
      corrEl_OD.textContent = `Ehlers corr: ${corr} mmHg (${sign}${factor})`;
      corrEl_OD.style.color = parseFloat(corr) > 21 ? 'var(--red)' : 'var(--purple)';
      if(ehlersOD_el) {
        ehlersOD_el.textContent = `(${sign}${factor})`;
        ehlersOD_el.style.color = factor > 0 ? '#c53030' : factor < 0 ? '#1a7a3c' : '#888';
      }
    }
  } else {
    if(corrEl_OD) corrEl_OD.textContent = '';
    if(ehlersOD_el) ehlersOD_el.textContent = '';
  }

  if(corrEl_OS && gatOS && pachyOS) {
    const factor = getEhlersFactor(pachyOS);
    if(factor !== null) {
      const corr = (gatOS + factor).toFixed(0);
      const sign = factor >= 0 ? '+' : '';
      corrEl_OS.textContent = `Ehlers corr: ${corr} mmHg (${sign}${factor})`;
      corrEl_OS.style.color = parseFloat(corr) > 21 ? 'var(--red)' : 'var(--purple)';
      if(ehlersOS_el) {
        ehlersOS_el.textContent = `(${sign}${factor})`;
        ehlersOS_el.style.color = factor > 0 ? '#c53030' : factor < 0 ? '#1a7a3c' : '#888';
      }
    }
  } else {
    if(corrEl_OS) corrEl_OS.textContent = '';
    if(ehlersOS_el) ehlersOS_el.textContent = '';
  }
}

// Refraction dropdown builder
function buildRefractionDropdowns() {
  const sphs = ['','Plano','+0.25','+0.50','+0.75','+1.00','+1.25','+1.50','+1.75','+2.00','+2.25','+2.50','+3.00','+3.50','+4.00','+4.50','+5.00','+5.50','+6.00','+7.00','+8.00','+9.00','+10.00','-0.25','-0.50','-0.75','-1.00','-1.25','-1.50','-1.75','-2.00','-2.25','-2.50','-3.00','-3.50','-4.00','-4.50','-5.00','-5.50','-6.00','-7.00','-8.00','-9.00','-10.00'];
  const cyls = ['','Plano','-0.25','-0.50','-0.75','-1.00','-1.25','-1.50','-1.75','-2.00','-2.25','-2.50','-3.00','-3.50','-4.00','+0.25','+0.50','+0.75','+1.00','+1.25','+1.50','+2.00','+2.50','+3.00'];
  const axes = [''].concat(Array.from({length:180},(_,i)=>(i+1)+'°'));
  // All rf- selects (old dropdowns + new spectacle ones)
  ['rf-od-sph','rf-os-sph','rf-od-sph2','rf-os-sph2','cyc-od-sph','cyc-os-sph','subj-od-sph','subj-os-sph'].forEach(id=>{
    const s=document.getElementById(id); if(s) s.innerHTML=sphs.map(v=>`<option>${v||'—'}</option>`).join('');
  });
  ['rf-od-cyl','rf-os-cyl','rf-od-cyl2','rf-os-cyl2','cyc-od-cyl','cyc-os-cyl','subj-od-cyl','subj-os-cyl'].forEach(id=>{
    const s=document.getElementById(id); if(s) s.innerHTML=cyls.map(v=>`<option>${v||'—'}</option>`).join('');
  });
  ['rf-od-ax','rf-os-ax','rf-od-ax2','rf-os-ax2','cyc-od-ax','cyc-os-ax','subj-od-ax','subj-os-ax'].forEach(id=>{
    const s=document.getElementById(id); if(s) s.innerHTML=axes.map(v=>`<option>${v||'—'}</option>`).join('');
  });
  // Also populate any .rf-sph-sel/.rf-cyl-sel/.rf-ax-sel dynamically added
  document.querySelectorAll('.rf-sph-sel').forEach(s=>{ if(!s.options.length) s.innerHTML=sphs.map(v=>`<option>${v||'—'}</option>`).join(''); });
  document.querySelectorAll('.rf-cyl-sel').forEach(s=>{ if(!s.options.length) s.innerHTML=cyls.map(v=>`<option>${v||'—'}</option>`).join(''); });
  document.querySelectorAll('.rf-ax-sel').forEach(s=>{  if(!s.options.length) s.innerHTML=axes.map(v=>`<option>${v||'—'}</option>`).join(''); });
}

// PHQ-9 / GAD-7 rating scale builder
function buildRatingScales() {
  const phq = ['Little interest or pleasure in doing things','Feeling down, depressed, or hopeless','Trouble sleeping or sleeping too much','Feeling tired or having little energy','Poor appetite or overeating','Feeling bad about yourself','Trouble concentrating','Moving or speaking slowly / being fidgety','Thoughts of self-harm'];
  const gad = ['Feeling nervous, anxious, or on edge','Not being able to stop worrying','Worrying too much about different things','Trouble relaxing','Being so restless it is hard to sit still','Becoming easily annoyed or irritable','Feeling afraid something awful might happen'];
  const phqEl = document.getElementById('phq-items'); const gadEl = document.getElementById('gad-items');
  const defaults_phq = [2,3,2,2,2,2,1,1,2]; const defaults_gad = [1,1,2,1,1,1,1];
  if (phqEl) phqEl.innerHTML = phq.map((q,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:5px;background:#fff;border-radius:6px">
    <div style="flex:1;font-size:11.5px">${q}</div>
    <select onchange="updateScale('phq')" style="width:110px;font-size:11px;padding:3px 5px"><option value="0">0 — Not at all</option><option value="1">1 — Several days</option><option value="2"${defaults_phq[i]===2?' selected':''}>2 — More than half</option><option value="3"${defaults_phq[i]===3?' selected':''}>3 — Nearly every day</option></select>
  </div>`).join('');
  if (gadEl) gadEl.innerHTML = gad.map((q,i)=>`<div style="display:flex;align-items:center;gap:8px;padding:5px;background:#fff;border-radius:6px">
    <div style="flex:1;font-size:11.5px">${q}</div>
    <select onchange="updateScale('gad')" style="width:110px;font-size:11px;padding:3px 5px"><option value="0">0 — Not at all</option><option value="1"${defaults_gad[i]===1?' selected':''}>1 — Several days</option><option value="2"${defaults_gad[i]===2?' selected':''}>2 — More than half</option><option value="3">3 — Nearly every day</option></select>
  </div>`).join('');
}

function updateScale(type) {
  const items = document.querySelectorAll(`#${type}-items select`);
  let total = 0; items.forEach(s=>total+=parseInt(s.value||0));
  const el = document.getElementById(type+'-total'); if(el) el.textContent=total;
  const res = document.getElementById(type+'-result');
  if (type==='phq') {
    const levels=['Minimal','Mild','Moderate','Moderately Severe','Severe'];
    const idx = total<5?0:total<10?1:total<15?2:total<20?3:4;
    if(res) res.textContent=`Score: ${total} — ${levels[idx]} Depression`;
    if(el) el.style.color=['#1a8c3c','#b55a00','#FF9500','var(--red)','var(--red)'][idx];
  } else {
    const levels=['Minimal','Mild','Moderate','Severe'];
    const idx=total<5?0:total<10?1:total<15?2:3;
    if(res) res.textContent=`Score: ${total} — ${levels[idx]} Anxiety`;
    if(el) el.style.color=['#1a8c3c','#b55a00','#FF9500','var(--red)'][idx];
  }
}

// Ophtho pay list rendering
function renderOphthoPayList() {
  const el = document.getElementById('ophtho-pay-list'); if (!el) return;
  const myPay = PAY_REQUESTS.filter(p => p.bmhId === 'BMSH-000001');
  el.innerHTML = myPay.length ? myPay.map(payCardHtml).join('') : `<div style="font-size:12px;color:var(--g1);padding:8px 0;text-align:center">No pending charges</div>`;
}
setInterval(()=>PATIENTS.filter(p=>p.dilated&&p.dilatedTime).forEach(p=>{const el=document.getElementById('dt-'+p.bmhId.replace(/-/g,''));if(el){const m=Math.floor((Date.now()-p.dilatedTime)/60000);el.textContent='💧 '+m+'m';}}),15000);

// ═══ OBG ═══
const OBG_SELECT_DIGITS = Array.from({length: 10}, (_, i) => String(i));
const OBG_SUMMARY_LABELS = {
  anc: 'Antenatal Care',
  gynae: 'Gynaecology',
  infertility: 'Infertility'
};

function obgFmtDate(value, blank = '—') {
  if(!value) return blank;
  const d = new Date(value);
  return isNaN(d.getTime()) ? blank : d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}
function obgVal(id) {
  return document.getElementById(id)?.value?.trim?.() || '';
}
function obgSetSelectOptions(id, opts) {
  const el = document.getElementById(id);
  if(!el) return;
  const current = el.value;
  el.innerHTML = ['<option value="">0</option>'].concat(opts.map(v => `<option value="${v}">${v}</option>`)).join('');
  el.value = current && opts.includes(current) ? current : '';
}
function initObgSelects() {
  ['obg-g','obg-p','obg-a','obg-l'].forEach(id => obgSetSelectOptions(id, OBG_SELECT_DIGITS));
}
function obgChecked(id) {
  return !!document.getElementById(id)?.checked;
}
function toggleObgGuidedSections() {
  const mapping = {
    'obg-anc-warning':'obg-anc-guided-warning',
    'obg-anc-highrisk':'obg-anc-guided-highrisk',
    'obg-anc-fetal':'obg-anc-guided-fetal',
    'obg-gyn-aub':'obg-gyn-guided-aub',
    'obg-gyn-discharge':'obg-gyn-guided-discharge',
    'obg-gyn-pain':'obg-gyn-guided-pain'
  };
  Object.entries(mapping).forEach(([chkId, panelId]) => {
    const panel = document.getElementById(panelId);
    if(panel) panel.style.display = obgChecked(chkId) ? '' : 'none';
  });
}
function toggleObgWorkflow() {
  const anc = document.getElementById('obg-track-anc')?.checked;
  const gyn = document.getElementById('obg-track-gynae')?.checked;
  const inf = document.getElementById('obg-track-infertility')?.checked;
  const ancPanel = document.getElementById('obg-anc-panel');
  const gynPanel = document.getElementById('obg-gynae-panel');
  const infPanel = document.getElementById('obg-infertility-panel');
  if(ancPanel) ancPanel.style.display = anc ? '' : 'none';
  if(gynPanel) gynPanel.style.display = gyn ? '' : 'none';
  if(infPanel) infPanel.style.display = inf ? '' : 'none';
  toggleObgGuidedSections();
  updateObgComputedFields();
}
function calcEDD(){
  const lmpVal = document.getElementById('obg-lmp')?.value;
  const eddDisp = document.getElementById('obg-edd');
  const eddInp = document.getElementById('obg-edd-inp');
  const gaDisp = document.getElementById('obg-ga');
  const triEl = document.getElementById('obg-tri');
  if(!lmpVal){
    if(eddDisp) eddDisp.textContent = '—';
    if(eddInp) eddInp.value = '';
    if(gaDisp) gaDisp.textContent = '—';
    return { gaText:'', weeks:0, edd:'' };
  }
  const lmp = new Date(lmpVal);
  const edd = new Date(lmp);
  edd.setDate(edd.getDate() + 280);
  const eddStr = obgFmtDate(edd);
  if(eddDisp) eddDisp.textContent = eddStr;
  if(eddInp) eddInp.value = eddStr;
  const diffDays = Math.max(0, Math.floor((new Date() - lmp)/(1000*60*60*24)));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  const gaStr = `${weeks}w ${days}d`;
  if(gaDisp) gaDisp.textContent = gaStr;
  const autoTri = weeks < 13 ? '1st Trimester' : weeks < 28 ? '2nd Trimester' : '3rd Trimester';
  if(triEl && (!triEl.value || triEl.value === 'Auto' || /Trimester/.test(triEl.value))) triEl.value = autoTri;
  return { gaText:gaStr, weeks, edd:eddStr };
}
function computeObgLivingIssueAge() {
  const lastDelivery = obgVal('obg-last-delivery');
  const liveBirths = Number(obgVal('obg-l') || '0');
  if(!lastDelivery || liveBirths < 1) return 'Living issue age: —';
  const d = new Date(lastDelivery);
  const now = new Date();
  let years = now.getFullYear() - d.getFullYear();
  let months = now.getMonth() - d.getMonth();
  if(months < 0) { years--; months += 12; }
  if(years < 0) return 'Living issue age: —';
  return years > 0 ? `Living issue age: ${years}y ${months}m` : `Living issue age: ${months} months`;
}
function computeObgPresumptiveDx() {
  const guidance = computeObgGuidance();
  return guidance.diagnoses;
}
function computeObgGuidance() {
  const findings = [];
  const ask = [];
  const lookFor = [];
  const investigations = [];
  const management = [];
  const procedures = [];
  const anc = document.getElementById('obg-track-anc')?.checked;
  const gyn = document.getElementById('obg-track-gynae')?.checked;
  const inf = document.getElementById('obg-track-infertility')?.checked;
  const bp = obgVal('obg-bp');
  const protein = obgVal('obg-urine-protein');
  const warning = obgVal('obg-warning');
  const movement = obgVal('obg-fetal-movement');
  const mainComplaint = obgVal('obg-main-complaint');
  const risk = obgVal('obg-risk');
  const cycle = obgVal('obg-cycle');
  const pelvicPain = obgVal('obg-pelvic-pain');
  const discharge = obgVal('obg-discharge');
  const impression = obgVal('obg-clinical-impression');
  const infertilityType = obgVal('obg-infertility-type');
  const ovulation = obgVal('obg-ovulation');
  const semen = obgVal('obg-semen');
  const tubal = obgVal('obg-tubal-risk');
  if(anc) {
    ask.push('Ask for bleeding, leaking, headache/vision, pain abdomen, reduced fetal movement, fever, swelling.');
    lookFor.push('BP trend, urine protein, oedema, fundal height, fetal heart, presentation, anaemia and scar tenderness where relevant.');
    investigations.push('CBC / Hb, blood group & Rh, urine routine / culture, blood sugar / GTT, TSH at booking if indicated.');
    management.push('Advise danger signs, iron-folic acid / calcium as appropriate, TT / Tdap, and schedule guideline-based ANC follow-up.');
    if((bp === '140/90' || bp === '150/100' || bp === '160/110') && ['1+','2+','3+'].includes(protein)) findings.push('Hypertensive disorder / pre-eclampsia risk');
    else if((bp === '140/90' || bp === '150/100' || bp === '160/110')) findings.push('Gestational hypertension risk');
    if(movement === 'Reduced' || mainComplaint === 'Decreased fetal movements') findings.push('Reduced fetal movement for urgent surveillance');
    if(warning === 'Bleeding PV') findings.push('Antepartum bleeding evaluation');
    if(warning === 'Leaking PV') findings.push('Rule out PROM / PPROM');
    if(risk) findings.push(`High-risk pregnancy: ${risk}`);
    if(obgChecked('obg-redflag-bleeding')) {
      investigations.push('Ultrasound for placental location / fetal wellbeing and haemoglobin assessment.');
      management.push('Urgent obstetric review if active bleeding or unstable vitals.');
    }
    if(obgChecked('obg-redflag-leak')) {
      lookFor.push('Pooling / leaking history, fetal heart, uterine activity, fever and tenderness.');
      management.push('Assess for PROM / PPROM and refer for admission if confirmed or suspected.');
    }
    if(obgChecked('obg-redflag-headache') || obgChecked('obg-redflag-swelling') || obgChecked('obg-redflag-convulsions')) {
      findings.push('Severe-feature hypertensive disorder to rule out');
      investigations.push('CBC, LFT, RFT, urine protein quantification as indicated.');
      management.push('Urgent BP control / admission pathway if severe features are present.');
    }
    if(obgChecked('obg-redflag-decreasedfm') || obgChecked('obg-anc-fetal')) {
      investigations.push('NST / CTG, ultrasound for AFI / BPP / Doppler if decreased movements or growth concern.');
      management.push('Escalate same day if fetal movements are reduced or absent.');
    }
    if(obgChecked('obg-hr-prevlscs')) {
      findings.push('Previous caesarean pregnancy surveillance');
      lookFor.push('Scar tenderness, placental location, inter-delivery interval and prior operative notes.');
      procedures.push('Delivery planning: TOLAC candidacy vs elective repeat LSCS as appropriate.');
    }
    if(obgChecked('obg-hr-gdm')) {
      findings.push('GDM / dysglycaemia review');
      investigations.push('Fasting / post-prandial sugars or GTT as indicated.');
      management.push('Dietary counselling and glucose monitoring; insulin referral if uncontrolled.');
    }
    if(obgChecked('obg-hr-pih')) {
      findings.push('Pregnancy-induced hypertension review');
      management.push('Tighter BP follow-up and maternal-fetal surveillance.');
    }
    if(obgChecked('obg-hr-multiple')) {
      investigations.push('Serial growth scans and cervical length review if clinically indicated.');
      management.push('High-risk ANC schedule and nutrition counselling.');
    }
    if(obgChecked('obg-fetal-growthlag') || obgChecked('obg-hr-iugr')) {
      findings.push('Fetal growth restriction concern');
      investigations.push('Growth scan with Doppler and serial fundal height monitoring.');
      management.push('Increase surveillance frequency and refer if Dopplers abnormal.');
    }
    if(obgChecked('obg-fetal-postdates')) {
      findings.push('Post-dated pregnancy surveillance');
      management.push('Plan induction / delivery review based on gestation and cervix.');
      procedures.push('Induction of labour discussion where appropriate.');
    }
  }
  if(gyn) {
    ask.push('Ask about cycle pattern, amount of bleeding, intermenstrual or post-coital bleeding, discharge, pelvic pain and contraception.');
    lookFor.push('Anaemia, thyroid / endocrine clues, abdominal mass, speculum findings and bimanual tenderness or uterine enlargement.');
    if(impression) findings.push(impression);
    if(cycle === 'Oligomenorrhoea' || ovulation === 'PCOS features') findings.push('PCOS / ovulatory dysfunction');
    if(discharge === 'White discharge') findings.push('Leucorrhoea / vaginitis');
    if(pelvicPain === 'Dyspareunia' || tubal === 'Endometriosis risk') findings.push('Endometriosis to consider');
    if(obgChecked('obg-gyn-aub')) {
      findings.push('Abnormal uterine bleeding workup');
      investigations.push('CBC, pregnancy test, TSH and pelvic ultrasound; endometrial sampling when indicated by age / risk.');
      management.push('Stabilise heavy bleeding, treat anaemia, and classify likely PALM-COEIN cause clinically.');
      if(obgChecked('obg-aub-postcoital')) lookFor.push('Cervical lesion / cervicitis and need for speculum assessment.');
    }
    if(obgChecked('obg-gyn-discharge')) {
      findings.push('Vaginal discharge / cervicitis / vaginitis evaluation');
      investigations.push('pH / wet mount / culture or STI tests if risk factors or persistent symptoms.');
      management.push('Treat likely vaginitis / cervicitis and advise partner management where STI suspected.');
    }
    if(obgChecked('obg-gyn-pain')) {
      investigations.push('Pelvic ultrasound and consider endometriosis / PID workup based on history.');
      management.push('Analgesia, evaluate need for hormonal suppression or laparoscopy referral.');
      if(obgChecked('obg-pain-severe') || obgChecked('obg-pain-bowel')) findings.push('Endometriosis / deep infiltrating disease concern');
    }
    if(obgChecked('obg-gyn-menopause')) {
      findings.push('Perimenopausal / postmenopausal symptom review');
      investigations.push('Pelvic ultrasound and endometrial evaluation if postmenopausal bleeding.');
      management.push('Counsel on red flags, non-hormonal vs hormonal options as appropriate.');
    }
  }
  if(inf) {
    ask.push('Ask duration trying to conceive, cycle regularity, coital frequency, prior pelvic infection / TB, surgeries, prior treatment and male evaluation.');
    lookFor.push('BMI, hirsutism / acne, thyroid / galactorrhoea, pelvic pain, prior operative scars and semen report availability.');
    investigations.push('Male semen analysis, ovulation assessment, ovarian reserve tests and tubal patency assessment as indicated.');
    management.push('Counsel on timing of intercourse, weight optimisation, folic acid, and couple-based evaluation.');
    if(infertilityType) findings.push(infertilityType);
    if(ovulation === 'Oligo/anovulation likely') findings.push('Ovulatory factor infertility');
    if(tubal && tubal !== 'Low') findings.push('Tubal factor infertility risk');
    if(semen === 'Abnormal' || semen === 'Severely abnormal') findings.push('Male factor infertility to address');
    if(obgChecked('obg-inf-ovulatory') || obgChecked('obg-inf-hirsutism') || ovulation === 'PCOS features') {
      findings.push('Likely ovulatory dysfunction / PCOS pathway');
      investigations.push('TSH, prolactin, AMH and TVS pelvis / follicular monitoring where indicated.');
      management.push('Ovulation induction counselling after full couple evaluation if appropriate.');
    }
    if(obgChecked('obg-inf-tubal') || obgChecked('obg-inf-pastpid') || obgChecked('obg-inf-priorsurgery')) {
      findings.push('Tubal factor infertility to rule out');
      investigations.push('HSG / SSG and infection / TB workup if clinically suspected.');
      procedures.push('Diagnostic laparoscopy / hysteroscopy discussion if imaging or symptoms justify it.');
    }
    if(obgChecked('obg-inf-endo') || obgChecked('obg-pain-infertility')) {
      findings.push('Endometriosis-associated infertility to consider');
      management.push('Pain + fertility counselling and consider laparoscopy referral based on severity / duration.');
    }
    if(obgChecked('obg-inf-male') || obgChecked('obg-inf-maleabn') || semen === 'Abnormal' || semen === 'Severely abnormal') {
      findings.push('Male factor evaluation required');
      management.push('Andrology / urology referral and repeat semen analysis if needed.');
    }
    if(obgChecked('obg-inf-lowreserve')) {
      findings.push('Diminished ovarian reserve concern');
      management.push('Early fertility specialist referral.');
    }
  }
  const unique = arr => Array.from(new Set(arr.filter(Boolean)));
  return {
    diagnoses: unique(findings).slice(0, 4),
    ask: unique(ask).slice(0, 5),
    lookFor: unique(lookFor).slice(0, 5),
    investigations: unique(investigations).slice(0, 6),
    management: unique(management).slice(0, 6),
    procedures: unique(procedures).slice(0, 4)
  };
}
function renderObgInvestigationSummary() {
  const el = document.getElementById('obg-investigation-summary');
  if(!el) return;
  const items = [...document.querySelectorAll('.obg-lab:checked')].map(x => x.value);
  el.textContent = items.length ? items.join(' • ') : 'No investigations selected yet.';
}
function renderObgSummaryRail() {
  const el = document.getElementById('obg-summary-content');
  if(!el) return;
  const pt = window.CURRENT_PATIENT || {};
  if(!pt.bmhId) {
    el.textContent = 'Open a patient to view ANC / Gynae / Infertility recap.';
    return;
  }
  const gpal = document.getElementById('obg-gpal-chip')?.textContent || '—';
  const ga = document.getElementById('obg-ga')?.textContent || '—';
  const edd = document.getElementById('obg-edd')?.textContent || '—';
  const guidance = computeObgGuidance();
  const presumptive = guidance.diagnoses.join(' • ') || document.getElementById('obg-presumptive-chip')?.textContent || '—';
  const systemic = obgVal('obg-systemic') || 'None declared';
  const usgDue = obgFmtDate(obgVal('obg-usg-due') || obgVal('obg-usg-due-inline'));
  const ttDue = obgFmtDate(obgVal('obg-tt-due') || obgVal('obg-tt-due-inline'));
  const txns = (TRANSACTIONS || []).filter(t => t.bmhId === pt.bmhId).slice().sort((a,b)=>new Date(b.date || 0)-new Date(a.date || 0)).slice(0,8);
  const requests = (PAY_REQUESTS || []).filter(r => r.bmhId === pt.bmhId).slice().sort((a,b)=>new Date(b.date || 0)-new Date(a.date || 0)).slice(0,8);
  const paymentHtml = txns.length ? txns.map(t => `<div style="display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--g5)"><div><div style="font-weight:800">${t.service || 'Payment'}</div><div style="font-size:10px;color:var(--g1)">${obgFmtDate(t.date)} · ${t.mode || '—'}</div></div><div style="font-weight:900;color:var(--bmh-blue)">₹${Number(t.amount||0).toLocaleString('en-IN')}</div></div>`).join('') : '<div style="font-size:10.5px;color:var(--g1)">No payments recorded.</div>';
  const reqHtml = requests.length ? requests.map(r => `<div style="padding:7px 0;border-bottom:1px solid var(--g5)"><div style="font-weight:800">${r.for || r.service || 'Request'}</div><div style="display:flex;justify-content:space-between;gap:8px;font-size:10px;color:var(--g1);margin-top:2px"><span>${obgFmtDate(r.date)}</span><span>${r.status || 'pending'}</span></div></div>`).join('') : '<div style="font-size:10.5px;color:var(--g1)">No reception requests sent.</div>';
  el.innerHTML = `
    <div style="padding:9px 10px;border-radius:10px;background:var(--purple-lt);margin-bottom:8px">
      <div style="font-size:10px;font-weight:900;color:#6a0091;text-transform:uppercase;margin-bottom:5px">OBS history</div>
      <div style="font-size:11px;font-weight:800;color:#3c1361">${gpal}</div>
      <div style="font-size:10.5px;margin-top:4px;color:#5f5874">Systemic: ${systemic}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:var(--blue-lt);margin-bottom:8px">
      <div style="font-size:10px;font-weight:900;color:var(--blue);text-transform:uppercase;margin-bottom:5px">ANC milestones</div>
      <div style="font-size:11px"><b>GA:</b> ${ga}</div>
      <div style="font-size:11px"><b>EDD:</b> ${edd}</div>
      <div style="font-size:11px"><b>USG due:</b> ${usgDue}</div>
      <div style="font-size:11px"><b>TT due:</b> ${ttDue}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:var(--orange-lt);margin-bottom:8px">
      <div style="font-size:10px;font-weight:900;color:#8a4200;text-transform:uppercase;margin-bottom:5px">Presumptive diagnosis</div>
      <div style="font-size:11px;font-weight:800;color:#8a4200;line-height:1.45">${presumptive || 'Routine assessment'}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:#fff8e6;margin-bottom:8px;border:1px solid rgba(255,149,0,.18)">
      <div style="font-size:10px;font-weight:900;color:#8a4200;text-transform:uppercase;margin-bottom:5px">What to ask</div>
      <div style="font-size:10.7px;line-height:1.45">${guidance.ask.length ? guidance.ask.join('<br>') : 'Use ANC / Gynae / Infertility checkboxes to open the relevant proforma.'}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:#eef8ff;margin-bottom:8px;border:1px solid rgba(0,122,255,.14)">
      <div style="font-size:10px;font-weight:900;color:var(--blue);text-transform:uppercase;margin-bottom:5px">What to look for</div>
      <div style="font-size:10.7px;line-height:1.45">${guidance.lookFor.length ? guidance.lookFor.join('<br>') : 'Focused examination prompts will appear here.'}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:#f2fff6;margin-bottom:8px;border:1px solid rgba(40,167,69,.16)">
      <div style="font-size:10px;font-weight:900;color:#1a8c3c;text-transform:uppercase;margin-bottom:5px">Investigations & management</div>
      <div style="font-size:10.7px;line-height:1.45"><b>Investigations:</b><br>${guidance.investigations.length ? guidance.investigations.join('<br>') : 'Guideline-based tests will appear here.'}<br><br><b>Management:</b><br>${guidance.management.length ? guidance.management.join('<br>') : 'Conservative / medical plan will appear here.'}${guidance.procedures.length ? `<br><br><b>Procedures / injections:</b><br>${guidance.procedures.join('<br>')}` : ''}</div>
    </div>
    <details open style="margin-bottom:8px;background:#fff;border:1px solid var(--g5);border-radius:10px;padding:8px 10px">
      <summary style="font-size:11px;font-weight:800;color:var(--bmh-blue);cursor:pointer">Payment history</summary>
      <div style="margin-top:8px">${paymentHtml}</div>
    </details>
    <details open style="background:#fff;border:1px solid var(--g5);border-radius:10px;padding:8px 10px">
      <summary style="font-size:11px;font-weight:800;color:var(--bmh-blue);cursor:pointer">Reception requests</summary>
      <div style="margin-top:8px">${reqHtml}</div>
    </details>`;
}
function updateObgComputedFields() {
  const calc = calcEDD();
  const g = Number(obgVal('obg-g') || 0);
  const p = Number(obgVal('obg-p') || 0);
  const a = Number(obgVal('obg-a') || 0);
  const l = Number(obgVal('obg-l') || 0);
  const gpal = `G${g}P${p}A${a}L${l}`;
  const gpalEl = document.getElementById('obg-gpal-chip');
  if(gpalEl) gpalEl.textContent = gpal;
  const livingAge = document.getElementById('obg-living-age');
  if(livingAge) livingAge.textContent = computeObgLivingIssueAge();
  if(!obgVal('obg-usg-due') && calc.weeks) {
    const base = new Date();
    if(calc.weeks < 14) base.setDate(base.getDate() + 14);
    else if(calc.weeks < 22) base.setDate(base.getDate() + 21);
    else if(calc.weeks < 32) base.setDate(base.getDate() + 28);
    else base.setDate(base.getDate() + 7);
    const v = base.toISOString().split('T')[0];
    const usg = document.getElementById('obg-usg-due'); if(usg) usg.value = v;
    const usg2 = document.getElementById('obg-usg-due-inline'); if(usg2) usg2.value = v;
  }
  if(!obgVal('obg-tt-due') && calc.weeks) {
    const d = new Date();
    d.setDate(d.getDate() + (calc.weeks < 20 ? 14 : 28));
    const v = d.toISOString().split('T')[0];
    const tt = document.getElementById('obg-tt-due'); if(tt) tt.value = v;
    const tt2 = document.getElementById('obg-tt-due-inline'); if(tt2) tt2.value = v;
  }
  const guidance = computeObgGuidance();
  const presumptive = guidance.diagnoses;
  const presumptiveEl = document.getElementById('obg-presumptive-chip');
  if(presumptiveEl) presumptiveEl.textContent = presumptive.length ? presumptive.join(' • ') : 'Routine assessment';
  renderObgInvestigationSummary();
  renderObgSummaryRail();
}
function populateObgPatientFromCurrent() {
  const pt = window.CURRENT_PATIENT || {};
  const nameEl = document.getElementById('obg-name');
  const ageEl = document.getElementById('obg-age');
  if(nameEl) nameEl.value = pt.name || '';
  if(ageEl) ageEl.value = pt.age ? `${pt.age} Years` : '';
  const blood = document.getElementById('obg-blood-grp');
  if(blood && pt.bloodGroup && !blood.value) blood.value = pt.bloodGroup;
  const rxDoc = document.getElementById('obg-rx-doctor');
  if(rxDoc) rxDoc.textContent = window.CURRENT_USER?.name || 'Dr. Geeta Baweja';
  renderObgSummaryRail();
}
function populateObgForm(visit) {
  populateObgPatientFromCurrent();
  const data = visit || window.CURRENT_PATIENT?.lastVisit || {};
  if(!data || typeof data !== 'object') {
    toggleObgWorkflow();
    updateObgComputedFields();
    return;
  }
  const mappings = {
    'obg-lmp':'lmp','obg-blood-grp':'bloodGroup','obg-risk':'riskTag','obg-main-complaint':'mainComplaint','obg-systemic':'systemicDisease',
    'obg-g':'g','obg-p':'p','obg-a':'a','obg-l':'l','obg-last-delivery':'lastDeliveryDate','obg-last-mode':'lastDeliveryMode',
    'obg-tri':'trimester','obg-anc-visit':'ancVisitType','obg-bp':'bp','obg-weight':'weight','obg-fhr':'fhr','obg-fh':'fundalHeight',
    'obg-present':'presentation','obg-urine-protein':'urineProtein','obg-urine-sugar':'urineSugar','obg-fetal-movement':'fetalMovement',
    'obg-warning':'warningSign','obg-usg-due':'usgDue','obg-usg-due-inline':'usgDue','obg-tt-due':'ttDue','obg-tt-due-inline':'ttDue',
    'obg-anc-notes':'ancNotes','obg-cycle':'cyclePattern','obg-flow':'flow','obg-discharge':'discharge','obg-pelvic-pain':'pelvicPain',
    'obg-cervix':'cervix','obg-uterus':'uterus','obg-adnexa':'adnexa','obg-clinical-impression':'clinicalImpression','obg-gyn-notes':'gynNotes',
    'obg-infertility-duration':'infertilityDuration','obg-infertility-type':'infertilityType','obg-ovulation':'ovulation','obg-tubal-risk':'tubalRisk',
    'obg-semen':'semen','obg-ovarian-reserve':'ovarianReserve','obg-endo':'endoSuspicion','obg-infertility-next':'infertilityNext','obg-infertility-notes':'infertilityNotes',
    'obg-visit-date':'visitDate','obg-next-review':'nextReview','obg-followup-plan':'followupPlan'
  };
  Object.entries(mappings).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if(el && data[key] != null) el.value = data[key];
  });
  const ancChk = document.getElementById('obg-track-anc'); if(ancChk) ancChk.checked = data.workflowAnc !== false;
  const gynChk = document.getElementById('obg-track-gynae'); if(gynChk) gynChk.checked = data.workflowGynae !== false;
  const infChk = document.getElementById('obg-track-infertility'); if(infChk) infChk.checked = !!data.workflowInfertility;
  ['obg-anc-booking','obg-anc-warning','obg-anc-highrisk','obg-anc-fetal','obg-gyn-aub','obg-gyn-discharge','obg-gyn-pain','obg-gyn-menopause','obg-inf-ovulatory','obg-inf-tubal','obg-inf-endo','obg-inf-male','obg-redflag-bleeding','obg-redflag-leak','obg-redflag-headache','obg-redflag-pain','obg-redflag-fever','obg-redflag-decreasedfm','obg-redflag-swelling','obg-redflag-convulsions','obg-hr-prevlscs','obg-hr-gdm','obg-hr-pih','obg-hr-iugr','obg-hr-multiple','obg-hr-rhneg','obg-hr-placenta','obg-hr-anemia','obg-fetal-growthlag','obg-fetal-malpresentation','obg-fetal-lowliquor','obg-fetal-postdates','obg-aub-clots','obg-aub-intermenstrual','obg-aub-postcoital','obg-aub-anemia','obg-vag-pruritus','obg-vag-foul','obg-vag-dyspareunia','obg-vag-pidrisk','obg-pain-cyclical','obg-pain-severe','obg-pain-bowel','obg-pain-infertility','obg-inf-coital','obg-inf-pastpid','obg-inf-priorsurgery','obg-inf-galactorrhoea','obg-inf-hirsutism','obg-inf-maleabn','obg-inf-lowreserve','obg-inf-rpl']
    .forEach(id => { const el = document.getElementById(id); if(el && data[id] != null) el.checked = !!data[id]; });
  const labs = Array.isArray(data.investigationChecklist) ? data.investigationChecklist : [];
  document.querySelectorAll('.obg-lab').forEach(box => { box.checked = labs.includes(box.value); });
  toggleObgWorkflow();
  updateObgComputedFields();
}
function addANCVisit(){
  const today = new Date().toISOString().split('T')[0];
  const visitDate = document.getElementById('obg-visit-date'); if(visitDate && !visitDate.value) visitDate.value = today;
  const nextReview = document.getElementById('obg-next-review'); if(nextReview && !nextReview.value) nextReview.value = today;
  ptab(document.querySelector('.ptab[onclick*="obg-anc"]'), 'obg-anc');
  showToast('Update visit fields and press Save to store this OBG review.', 'i');
}
function saveANCVisit(){ saveVisit('obg'); }
function openANCVisit(n){ showToast('Open saved OBG visit from the list below.', 'i'); }
function printOBGSheet(){
  document.querySelectorAll('.print-section').forEach(s=>s.style.display='none');
  document.getElementById('print-obg-sheet').style.display='block';
  setTimeout(()=>{window.print();setTimeout(()=>{document.getElementById('print-obg-sheet').style.display='none';},500);},200);
}
function printOBGRx(){printOBGSheet();}

// ═══ PSYCH SCALES ═══
const PHQ9=[
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure',
  'Trouble concentrating on things, such as reading the newspaper or watching television',
  'Moving or speaking so slowly that other people could have noticed',
  'Thoughts that you would be better off dead or of hurting yourself in some way'
];
const GAD7=[
  'Feeling nervous, anxious or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it is hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen'
];
let phq9Scores=new Array(9).fill(0);
let gad7Scores=new Array(7).fill(0);

function renderScales(){
  const p9=document.getElementById('phq9-items');
  if(p9) p9.innerHTML=PHQ9.map((q,i)=>`<div class="scale-item">
    <div class="scale-q">${i+1}. ${q}</div>
    <div class="scale-opts">${[0,1,2,3].map(v=>`<button class="scale-opt${phq9Scores[i]===v?' sel':''}" onclick="setScale('phq9',${i},${v},this)">${v}</button>`).join('')}</div>
  </div>`).join('');
  updateScaleScore('phq9');

  const g7=document.getElementById('gad7-items');
  if(g7) g7.innerHTML=GAD7.map((q,i)=>`<div class="scale-item">
    <div class="scale-q">${i+1}. ${q}</div>
    <div class="scale-opts">${[0,1,2,3].map(v=>`<button class="scale-opt${gad7Scores[i]===v?' sel':''}" onclick="setScale('gad7',${i},${v},this)">${v}</button>`).join('')}</div>
  </div>`).join('');
  updateScaleScore('gad7');
}
function setScale(type,idx,val,el){
  if(type==='phq9') phq9Scores[idx]=val;
  else gad7Scores[idx]=val;
  el.closest('.scale-opts').querySelectorAll('.scale-opt').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  updateScaleScore(type);
}
function updateScaleScore(type){
  if(type==='phq9'){
    const total=phq9Scores.reduce((a,b)=>a+b,0);
    const el=document.getElementById('phq9-score');if(el)el.textContent=total;
    const cat=document.getElementById('phq9-cat');if(cat)cat.textContent=total<=4?'Minimal Depression':total<=9?'Mild Depression':total<=14?'Moderate Depression':total<=19?'Moderately Severe':'Severe Depression';
    const ps=document.getElementById('ps-phq');if(ps)ps.textContent=total;
  } else {
    const total=gad7Scores.reduce((a,b)=>a+b,0);
    const el=document.getElementById('gad7-score');if(el)el.textContent=total;
    const cat=document.getElementById('gad7-cat');if(cat)cat.textContent=total<=4?'Minimal Anxiety':total<=9?'Mild Anxiety':total<=14?'Moderate Anxiety':'Severe Anxiety';
    const pg=document.getElementById('ps-gad');if(pg)pg.textContent=total;
  }
}

function psychVal(id) {
  return document.getElementById(id)?.value?.trim?.() || '';
}
function togglePsychTracks() {
  const map = {
    'psych-track-addiction':'psych-panel-addiction',
    'psych-track-stroke':'psych-panel-stroke',
    'psych-track-epilepsy':'psych-panel-epilepsy',
    'psych-track-child':'psych-panel-child',
    'psych-track-adult':'psych-panel-adult'
  };
  Object.entries(map).forEach(([chkId, panelId]) => {
    const chk = document.getElementById(chkId);
    const panel = document.getElementById(panelId);
    if(panel) panel.style.display = chk?.checked ? '' : 'none';
  });
}
function computePsychGuidance() {
  const tags = [];
  const ask = [];
  const inv = [];
  const tx = [];
  const therapy = [];
  const syndrome = psychVal('psych-core-syndrome');
  const risk = psychVal('psych-risk');
  const sleep = psychVal('psych-sleep');
  const appetite = psychVal('psych-appetite');
  const psychosis = psychVal('psych-psychosis');
  const polarity = psychVal('psych-polarity');
  const anxiety = psychVal('psych-anxiety');
  const suicidality = psychVal('psych-suicidality');
  if(/Depressive/.test(syndrome) || /Very low|low/i.test(psychVal('psych-chief'))) {
    tags.push('Depressive disorder likely');
    ask.push('Screen severity, anhedonia, hopelessness, suicidality, sleep, appetite, bipolar history');
    inv.push('PHQ-9, CBC, TSH, B12 / Vit D if clinically indicated');
    tx.push('SSRI / SNRI if not bipolar, sleep hygiene, safety review');
    therapy.push('CBT / behavioural activation');
  }
  if(/Anxiety|panic/i.test(syndrome) || /Panic/.test(anxiety)) {
    tags.push('Anxiety spectrum disorder likely');
    ask.push('Clarify panic attacks, avoidance, autonomic symptoms, caffeine / substance triggers');
    inv.push('GAD-7; rule out thyroid / substance contributors');
    tx.push('SSRI first-line, short-term benzodiazepine only if needed');
    therapy.push('CBT, relaxation, breathing retraining');
  }
  if(/Psychosis/.test(syndrome) || /Hallucinations|Delusions|Both/.test(psychosis)) {
    tags.push('Psychotic disorder to rule out');
    ask.push('Onset, first-rank symptoms, substance use, delirium / organic red flags, family history');
    inv.push('CBC, LFT, RFT, glucose, thyroid, urine toxicology; neuroimaging if atypical');
    tx.push('Antipsychotic initiation / urgent stabilization if risk present');
    therapy.push('Family psychoeducation, social support');
  }
  if(/Manic/.test(syndrome) || /Manic|Mixed/.test(polarity)) {
    tags.push('Bipolar spectrum likely');
    ask.push('Reduced need for sleep, spending / grandiosity, episodicity, antidepressant switch history');
    inv.push('CBC, LFT, RFT, thyroid before mood stabilizer');
    tx.push('Mood stabilizer / atypical antipsychotic review');
    therapy.push('Sleep-wake stabilization, family education');
  }
  if(document.getElementById('psych-track-addiction')?.checked) {
    tags.push('Substance use disorder screen positive');
    ask.push('Quantity, frequency, last use, withdrawal, craving, overdose risk, family / legal harm');
    inv.push('LFT, RFT, viral markers / toxicology as indicated');
    tx.push('Motivational enhancement, withdrawal-risk assessment, de-addiction plan');
    therapy.push('Relapse prevention, group support');
  }
  if(document.getElementById('psych-track-stroke')?.checked) {
    tags.push('Neuropsychiatric sequelae of stroke to evaluate');
    ask.push('Stroke subtype, deficit timeline, mood/cognition change, swallow / falls, secondary prevention');
    inv.push('MRI / CT review, cognition screen, vascular risk profile');
    tx.push('Secondary prevention review, mood / cognition management');
    therapy.push('Neuro-rehab, caregiver counselling');
  }
  if(document.getElementById('psych-track-epilepsy')?.checked) {
    tags.push('Epilepsy follow-up / breakthrough seizure review');
    ask.push('Semiology, adherence, sleep deprivation, missed doses, injury, pregnancy plans');
    inv.push('Drug levels if available, EEG / MRI if indicated');
    tx.push('ASM adherence review and trigger avoidance');
    therapy.push('Seizure safety counselling');
  }
  if(document.getElementById('psych-track-child')?.checked) {
    tags.push('Child / adolescent mental health evaluation');
    ask.push('Perinatal/developmental history, school concerns, autism/ADHD red flags, safeguarding');
    inv.push('Developmental history, school feedback, Vanderbilt / ASD screen as indicated');
    tx.push('Parent guidance and multimodal management');
    therapy.push('Behaviour therapy, remedial input, parent training');
  }
  if(/Self-harm|attempt|Plan/.test(suicidality) || /Violence/.test(risk)) {
    tags.push('High-risk safety assessment required');
    tx.unshift('Do not leave unattended; consider urgent referral / admission');
  }
  if(sleep === 'Reduced need for sleep') tags.push('Mania / hypomania should be ruled out');
  if(appetite === 'Reduced' && syndrome.includes('Depressive')) tags.push('Biological symptoms support depressive syndrome');
  return {
    tags: Array.from(new Set(tags)).slice(0, 4),
    ask: Array.from(new Set(ask)).slice(0, 5),
    investigations: Array.from(new Set(inv)).slice(0, 4),
    plan: Array.from(new Set(tx)).slice(0, 4),
    therapy: Array.from(new Set(therapy)).slice(0, 4)
  };
}
function renderPsychRail() {
  const el = document.getElementById('psych-summary-content');
  if(!el) return;
  togglePsychTracks();
  const pt = window.CURRENT_PATIENT || {};
  if(!pt.bmhId) {
    el.textContent = 'Open a patient to view neuropsychiatry guidance, past history, payments, and pending requests.';
    return;
  }
  const g = computePsychGuidance();
  const presEl = document.getElementById('psych-presumptive-chip');
  if(presEl) presEl.textContent = g.tags[0] || 'Clinical review';
  const riskChip = document.getElementById('psych-risk-chip');
  if(riskChip) riskChip.textContent = /High-risk/.test(g.tags.join(' ')) ? 'High' : (psychVal('psych-risk') || 'Low');
  const planChip = document.getElementById('psych-plan-chip');
  if(planChip) planChip.textContent = g.plan[0] || 'Clinical review';
  const invChip = document.getElementById('psych-invest-chip');
  if(invChip) invChip.textContent = g.investigations[0] || 'As indicated';
  const txns = (TRANSACTIONS || []).filter(t => t.bmhId === pt.bmhId).slice().sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).slice(0,8);
  const reqs = (PAY_REQUESTS || []).filter(r => r.bmhId === pt.bmhId).slice().sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).slice(0,8);
  const payHtml = txns.length ? txns.map(t => `<div style="display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--g5)"><div><div style="font-weight:800">${t.service || 'Payment'}</div><div style="font-size:10px;color:var(--g1)">${obgFmtDate(t.date)} · ${t.mode || '—'}</div></div><div style="font-weight:900;color:var(--bmh-blue)">₹${Number(t.amount||0).toLocaleString('en-IN')}</div></div>`).join('') : '<div style="font-size:10.5px;color:var(--g1)">No payments recorded.</div>';
  const dueHtml = reqs.length ? reqs.map(r => `<div style="padding:7px 0;border-bottom:1px solid var(--g5)"><div style="font-weight:800">${r.for || 'Request'}</div><div style="display:flex;justify-content:space-between;gap:8px;font-size:10px;color:var(--g1)"><span>${obgFmtDate(r.date)}</span><span>${r.status || 'pending'}</span></div></div>`).join('') : '<div style="font-size:10.5px;color:var(--g1)">No pending reception requests.</div>';
  el.innerHTML = `
    <div style="padding:9px 10px;border-radius:10px;background:var(--orange-lt);margin-bottom:8px">
      <div style="font-size:10px;font-weight:900;color:#8a4200;text-transform:uppercase;margin-bottom:5px">Presumptive diagnosis</div>
      <div style="font-size:11px;font-weight:800;color:#8a4200;line-height:1.45">${g.tags.join(' • ') || 'Awaiting structured inputs'}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:#fff7e8;margin-bottom:8px;border:1px solid rgba(212,160,23,.28)">
      <div style="font-size:10px;font-weight:900;color:#8a4200;text-transform:uppercase;margin-bottom:5px">Guided history prompts</div>
      <div style="font-size:11px;line-height:1.5">${g.ask.join('<br>') || 'Symptom chronology, risk, functioning, substance use, and family history.'}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:var(--blue-lt);margin-bottom:8px">
      <div style="font-size:10px;font-weight:900;color:var(--blue);text-transform:uppercase;margin-bottom:5px">Initial management</div>
      <div style="font-size:11px;line-height:1.5">${g.plan.join('<br>') || 'Clinical interview, MSE, and safety review first.'}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:var(--green-lt);margin-bottom:8px">
      <div style="font-size:10px;font-weight:900;color:#1a8c3c;text-transform:uppercase;margin-bottom:5px">Investigations & therapies</div>
      <div style="font-size:11px;line-height:1.5"><b>Investigations:</b><br>${g.investigations.join('<br>') || 'As clinically indicated'}<br><br><b>Therapies:</b><br>${g.therapy.join('<br>') || 'Psychoeducation and supportive therapy'}</div>
    </div>
    <div style="padding:9px 10px;border-radius:10px;background:var(--g6);margin-bottom:8px">
      <div style="font-size:10px;font-weight:900;color:var(--g1);text-transform:uppercase;margin-bottom:5px">Past / systemic</div>
      <div style="font-size:11px;line-height:1.45"><b>Family:</b> ${psychVal('psych-family') || '—'}<br><b>Past psych:</b> ${psychVal('psych-pastpsych') || '—'}<br><b>Medical:</b> ${psychVal('psych-medical') || psychVal('psych-systemic') || '—'}</div>
    </div>
    <details open style="margin-bottom:8px;background:#fff;border:1px solid var(--g5);border-radius:10px;padding:8px 10px">
      <summary style="font-size:11px;font-weight:800;color:var(--bmh-blue);cursor:pointer">Payments made</summary>
      <div style="margin-top:8px">${payHtml}</div>
    </details>
    <details open style="background:#fff;border:1px solid var(--g5);border-radius:10px;padding:8px 10px">
      <summary style="font-size:11px;font-weight:800;color:var(--bmh-blue);cursor:pointer">Payments / requests pending</summary>
      <div style="margin-top:8px">${dueHtml}</div>
    </details>`;
}
function populatePsychForm(visit) {
  const data = visit || window.CURRENT_PATIENT?.lastVisit || {};
  const ids = ['psych-chief','psych-duration','psych-onset','psych-trigger','psych-core-syndrome','psych-risk','psych-systemic','psych-sleep','psych-appetite','psych-function','psych-diagnosis','psych-family','psych-personal','psych-pastpsych','psych-medical','psych-substance','psych-suicidality','psych-anxiety','psych-psychosis','psych-polarity','psych-addiction-substance','psych-addiction-pattern','psych-addiction-lastuse','psych-addiction-readiness','psych-stroke-deficit','psych-stroke-timing','psych-stroke-mood','psych-epilepsy-type','psych-epilepsy-last','psych-epilepsy-adherence','psych-epilepsy-trigger','psych-child-concern','psych-child-development','psych-child-school','psych-child-parent','psych-appearance','psych-behaviour','psych-psychomotor','psych-eyecontact','psych-speech-rate','psych-speech-volume','psych-speech-tone','psych-subjective-mood','psych-affect','psych-thought-form','psych-thought-content','psych-hallucinations','psych-orientation','psych-memory','psych-insight','psych-judgement'];
  ids.forEach(id => { const el = document.getElementById(id); if(el && data[id] != null) el.value = data[id]; });
  ['psych-track-addiction','psych-track-stroke','psych-track-epilepsy','psych-track-child','psych-track-adult'].forEach(id => {
    const el = document.getElementById(id);
    if(el && data[id] != null) el.checked = !!data[id];
  });
  togglePsychTracks();
  renderPsychRail();
}
function printPsychRx(){printPsychSheet();}

// ═══ SKIN ═══
function skinVal(id) {
  const el = document.getElementById(id);
  if(!el) return '';
  if(el.type === 'checkbox') return !!el.checked;
  return el.value || '';
}
function computeSkinGuidance() {
  const diagnoses = [];
  const investigations = [];
  const management = [];
  const procedures = [];
  const fit = skinVal('skin-fit');
  const primary = skinVal('skin-primary-dx');
  const hormonal = skinVal('skin-hormonal');
  const pihRisk = skinVal('skin-cosm-pih');
  const sensitivity = skinVal('skin-cosm-sensitivity');
  const isotret = skinVal('skin-cosm-isotret');
  const pregnant = skinVal('skin-cosm-preg');
  const tan = skinVal('skin-cosm-tan');
  const fitDark = /IV|V|VI/.test(fit);
  if(primary) diagnoses.push(primary.replace(/^[A-Z0-9.]+\s+—\s+/, ''));
  if(skinVal('skin-cosm-melasma') || /Melasma|Chloasma/i.test(primary)) {
    diagnoses.push('Pigmentary disorder needing strict photoprotection and trigger review');
    management.push('Daily broad-spectrum tinted sunscreen, barrier repair, and depigmenting topical priming before procedures');
    procedures.push('Prefer superficial peels only after 2-4 weeks of priming; usually repeat every 3-4 weeks');
  }
  if(skinVal('skin-cosm-acne') || /Acne/i.test(primary)) {
    diagnoses.push('Acne pathway with adjunct cosmetology planning');
    management.push('Topical retinoid + benzoyl peroxide backbone; reserve oral antibiotics/isotretinoin by severity');
    procedures.push('Hydrafacial / salicylic or mandelic peel can be adjunctive once inflammation is controlled; review in 4-6 weeks');
    if(/Moderate|Severe/.test(skinVal('skin-cosm-acne-grade'))) investigations.push('Assess menstrual irregularity / hyperandrogenism; endocrine work-up only if clinically indicated');
  }
  if(skinVal('skin-cosm-scar')) {
    diagnoses.push('Texture / acne scar concern');
    procedures.push('Microneedling or fractional resurfacing only after acne is controlled; usually spaced 4-6 weeks apart');
  }
  if(skinVal('skin-cosm-ageing')) {
    diagnoses.push('Photoaging / rejuvenation pathway');
    procedures.push('Hydrating facials monthly; peels every 3-4 weeks if barrier and pigmentation risk allow');
  }
  if(skinVal('skin-cosm-sensitive')) {
    diagnoses.push('Sensitive / rosacea-prone barrier');
    management.push('Prioritize barrier repair and anti-inflammatory skincare before any peel or device session');
  }
  if(/PCOD|On OCP/.test(hormonal)) investigations.push('If acne/hirsutism persists, consider hormonal evaluation with gynecology/endocrine correlation');
  if(/Alopecia/.test(skinVal('skin-hair'))) investigations.push('CBC, ferritin, TSH, vitamin D / B12 as clinically indicated for hair loss');
  if(fitDark || /High/.test(pihRisk)) {
    management.push('Use conservative settings because Fitzpatrick IV-VI / PIH-prone skin needs slower escalation');
    procedures.push('Avoid aggressive medium/deep peels or high-fluence laser until risk is optimized');
  }
  if(/High/.test(sensitivity) || /Heavy/.test(tan)) {
    management.push('Defer stronger peels/lasers until tan settles and barrier symptoms improve');
  }
  if(/Yes/.test(isotret)) {
    management.push('Avoid resurfacing / medium-depth procedures until adequate post-isotretinoin interval and clinical review');
  }
  if(/Yes/.test(pregnant)) {
    management.push('Limit to pregnancy-safe topicals and conservative facials; avoid teratogenic drugs and aggressive cosmetic interventions');
  }
  investigations.push('Routine cosmetic investigations are not required unless systemic/hormonal clues are present');
  return {
    diagnoses: Array.from(new Set(diagnoses)).slice(0, 4),
    investigations: Array.from(new Set(investigations)).slice(0, 4),
    management: Array.from(new Set(management)).slice(0, 5),
    procedures: Array.from(new Set(procedures)).slice(0, 5)
  };
}
function renderSkinRail() {
  const el = document.getElementById('skin-summary-rail');
  if(!el) return;
  const pt = window.CURRENT_PATIENT || {};
  if(!pt.bmhId) {
    el.innerHTML = '<div style="padding:10px;color:var(--g1);font-size:11px">Open a patient to see cosmetology guidance, billing, and pending requests.</div>';
    return;
  }
  const g = computeSkinGuidance();
  const txns = (TRANSACTIONS || []).filter(t => t.bmhId === pt.bmhId).slice().sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).slice(0,8);
  const reqs = (PAY_REQUESTS || []).filter(r => r.bmhId === pt.bmhId).slice().sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).slice(0,8);
  const payHtml = txns.length ? txns.map(t => `<div style="display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid var(--g5)"><div><div style="font-weight:800">${t.service || 'Payment'}</div><div style="font-size:10px;color:var(--g1)">${obgFmtDate(t.date)} · ${t.mode || '—'}</div></div><div style="font-weight:900;color:var(--bmh-blue)">₹${Number(t.amount||0).toLocaleString('en-IN')}</div></div>`).join('') : '<div style="font-size:10.5px;color:var(--g1)">No payments recorded.</div>';
  const reqHtml = reqs.length ? reqs.map(r => `<div style="padding:7px 0;border-bottom:1px solid var(--g5)"><div style="font-weight:800">${r.for || 'Request'}</div><div style="display:flex;justify-content:space-between;gap:8px;font-size:10px;color:var(--g1)"><span>${obgFmtDate(r.date)}</span><span>${r.status || 'pending'}</span></div></div>`).join('') : '<div style="font-size:10.5px;color:var(--g1)">No pending reception requests.</div>';
  el.innerHTML = `<div style="position:sticky;top:12px;width:100%">
    <div style="font-size:10px;font-weight:900;color:var(--g1);text-transform:uppercase;letter-spacing:.45px;margin-bottom:6px">Cosmetology rail</div>
    <div style="max-height:74vh;overflow:auto;padding-right:4px">
      <div style="padding:9px 10px;border-radius:10px;background:#fff0f7;margin-bottom:8px;border:1px solid rgba(196,76,124,.18)">
        <div style="font-size:10px;font-weight:900;color:#a12f61;text-transform:uppercase;margin-bottom:5px">Presumptive diagnosis</div>
        <div style="font-size:11px;font-weight:800;line-height:1.45;color:#8d2556">${g.diagnoses.join(' • ') || 'Select skin concern, diagnosis, and cosmetology risk factors.'}</div>
      </div>
      <div style="padding:9px 10px;border-radius:10px;background:#f7fbff;margin-bottom:8px;border:1px solid rgba(26,60,110,.12)">
        <div style="font-size:10px;font-weight:900;color:var(--blue);text-transform:uppercase;margin-bottom:5px">Evidence-based next steps</div>
        <div style="font-size:11px;line-height:1.5">${g.management.join('<br>') || 'Photoprotection, diagnosis confirmation, barrier care, and conservative escalation.'}</div>
      </div>
      <div style="padding:9px 10px;border-radius:10px;background:#eefaf1;margin-bottom:8px;border:1px solid rgba(26,140,60,.16)">
        <div style="font-size:10px;font-weight:900;color:#1a8c3c;text-transform:uppercase;margin-bottom:5px">Investigations / procedure cadence</div>
        <div style="font-size:11px;line-height:1.5"><b>Investigations:</b><br>${g.investigations.join('<br>') || 'Usually clinical unless systemic clues are present.'}<br><br><b>Procedures:</b><br>${g.procedures.join('<br>') || 'Choose procedure after barrier, PIH risk, and diagnosis review.'}</div>
      </div>
      <div style="padding:9px 10px;border-radius:10px;background:var(--g6);margin-bottom:8px">
        <div style="font-size:10px;font-weight:900;color:var(--g1);text-transform:uppercase;margin-bottom:5px">Patient factors</div>
        <div style="font-size:11px;line-height:1.45"><b>Fitzpatrick:</b> ${skinVal('skin-fit') || '—'}<br><b>Hormonal:</b> ${skinVal('skin-hormonal') || '—'}<br><b>Medical:</b> ${skinVal('skin-medical') || '—'}</div>
      </div>
      <details open style="margin-bottom:8px;background:#fff;border:1px solid var(--g5);border-radius:10px;padding:8px 10px">
        <summary style="font-size:11px;font-weight:800;color:var(--bmh-blue);cursor:pointer">Payments made</summary>
        <div style="margin-top:8px">${payHtml}</div>
      </details>
      <details open style="background:#fff;border:1px solid var(--g5);border-radius:10px;padding:8px 10px">
        <summary style="font-size:11px;font-weight:800;color:var(--bmh-blue);cursor:pointer">Reception requests / pending</summary>
        <div style="margin-top:8px">${reqHtml}</div>
      </details>
    </div>
  </div>`;
}
function populateSkinForm(visit) {
  const data = visit || window.CURRENT_PATIENT?.lastVisit || {};
  ['skin-chief','skin-duration','skin-site','skin-fit','skin-primary-dx','skin-secondary-dx','skin-routine','skin-medical','skin-hormonal','skin-lesion','skin-secondary-change','skin-distribution','skin-configuration','skin-hair','skin-nail','skin-dermoscopy','skin-cosm-acne-grade','skin-cosm-sensitivity','skin-cosm-pih','skin-cosm-isotret','skin-cosm-tan','skin-cosm-preg']
    .forEach(id => {
      const el = document.getElementById(id);
      if(!el || data[id] == null) return;
      if(el.tagName === 'SELECT') {
        for(let i=0;i<el.options.length;i++) {
          if(el.options[i].value === data[id] || el.options[i].text === data[id]) { el.selectedIndex = i; break; }
        }
      } else {
        el.value = data[id];
      }
    });
  ['skin-cosm-melasma','skin-cosm-acne','skin-cosm-scar','skin-cosm-ageing','skin-cosm-sensitive','skin-cosm-hair']
    .forEach(id => {
      const el = document.getElementById(id);
      if(el && data[id] != null) el.checked = !!data[id];
    });
  renderSkinRail();
}
function selectProc(el,name){
  document.querySelectorAll('.procedure-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  const nm=document.getElementById('proc-name');if(nm)nm.textContent=name;
  showToast(name+' selected ✓','i');
}

function printSkinRx(){printSkinSheet();}

// ═══ OPHTHO PRINT ═══


// ═══════════════════════════════════════
// RECEPTION PAGE
// ═══════════════════════════════════════


function quickBillItem(name, price) {
  const bmhId = document.getElementById('bill-pt-sel')?.value || document.getElementById('bmh-bill-pt-select')?.value || PATIENTS[0]?.bmhId;
  if (bmhId) {
    addBmhPatientCharge(bmhId, { id: 'qb' + Date.now(), cat: 'other', desc: name, qty: 1, rate: price, amount: price, source: 'reception', ts: new Date().toISOString() });
    renderBillingPage && renderBillingPage();
  }
  openM('m-rec-bill');
  renderBillItems();
  showToast(`${name} added to bill ✓`, 's');
}



// ═══════════════════════════════════════
// IPD MODULE
// ═══════════════════════════════════════

function ipdMonitoringSlots(freqKey, fromIso) {
  const hours = { '1h':1, '2h':2, '4h':4, '6h':6 }[freqKey] || 6;
  const start = new Date(fromIso || Date.now());
  const slots = [];
  for (let i = 0; i < Math.max(4, Math.floor(24 / hours)); i += 1) {
    const due = new Date(start.getTime() + (hours * (i + 1) * 60 * 60 * 1000));
    slots.push({ id:'slot-' + i + '-' + due.getTime(), dueAt: due.toISOString(), recordedAt:'', status:'pending' });
  }
  return slots;
}
function ipdDeptTemplate(deptKey) {
  const map = {
    ophtho:['Vision / pain status','Eye dressing / patch','Eye drops given','IOP / nausea / vomiting','Doctor instructions'],
    obg:['Bleeding / lochia','Uterine tone','Foetal / baby status','Feeding / lactation','Doctor instructions'],
    psych:['Mood / behaviour','Sleep','Medication compliance','Risk / supervision','Doctor instructions'],
    skin:['Rash / lesion change','Itching / pain','Dressing / topical therapy','Drug reaction watch','Doctor instructions'],
    general:['Pain / comfort','Fluids / diet','Urine / stool','Mobility / fall risk','Doctor instructions']
  };
  return (map[deptKey] || map.general).map(label => ({ label, value:'', checked:false }));
}
function ipdVitalsStatus(vitals) {
  const flags = [];
  const pulse = Number(vitals?.pulse || 0);
  const temp = Number(vitals?.temp || 0);
  const spo2 = Number(vitals?.spo2 || 0);
  const rr = Number(vitals?.rr || 0);
  if (pulse && (pulse < 50 || pulse > 110)) flags.push({ label:'Pulse out of range', tone:'var(--red)' });
  if (temp && temp >= 38) flags.push({ label:'Fever', tone:'var(--orange)' });
  if (spo2 && spo2 < 94) flags.push({ label:'Low SpO2', tone:'var(--red)' });
  if (rr && (rr < 10 || rr > 24)) flags.push({ label:'Respiratory rate abnormal', tone:'var(--orange)' });
  return flags;
}
function ipdEvaluateAlerts(p) {
  const alerts = [];
  const lastVitals = (p.vitalSigns || [])[0];
  ipdVitalsStatus(lastVitals || {}).forEach(f => alerts.push({ tone:f.tone, text:f.label + (lastVitals?.recordedAt ? ' · ' + new Date(lastVitals.recordedAt).toLocaleString('en-IN') : '') }));
  (p.monitoringPlan || []).forEach(slot => {
    if (slot.status !== 'done' && new Date(slot.dueAt).getTime() < Date.now()) alerts.push({ tone:'var(--red)', text:'Observation overdue since ' + new Date(slot.dueAt).toLocaleString('en-IN') });
  });
  if (!alerts.length) alerts.push({ tone:'var(--green)', text:'No active IPD alerts right now' });
  return alerts;
}
function renderIPDAlerts(p) {
  const el = document.getElementById('ipd-alerts-panel');
  if (!el) return;
  if (!p) {
    el.innerHTML = 'Select a patient to load alerts.';
    return;
  }
  const alerts = ipdEvaluateAlerts(p);
  el.innerHTML = alerts.map(a => `<div style="padding:9px 10px;border-radius:8px;margin-bottom:7px;background:${a.tone === 'var(--green)' ? 'var(--green-lt)' : a.tone === 'var(--orange)' ? 'var(--orange-lt)' : 'var(--red-lt)'};color:${a.tone};font-weight:${a.tone === 'var(--green)' ? '700' : '900'}">${a.text}</div>`).join('');
}
function ipdChartSummary(p) {
  const chart = p.chartRows || [];
  if (!chart.length) return '<div style="color:var(--g1);font-size:12px">No structured chart items yet.</div>';
  return chart.map(row => `<div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid var(--g5);font-size:12px"><span>${row.label}</span><strong style="color:${row.checked ? '#1a8c3c' : 'var(--g1)'}">${row.value || (row.checked ? 'Done' : 'Pending')}</strong></div>`).join('');
}

function openIPDPatient(id) {
  const p = IPD_PATIENTS.find(x=>x.id===id);
  if (!p) return;
  activeIPDPatient = p;
  const el = document.getElementById('ipd-detail');
  if (!el) return;
  const nb = p.isNewborn && p.babyNotes;
  const lastVitals = (p.vitalSigns || [])[0] || p.vitals || {};
  const alerts = ipdEvaluateAlerts(p);
  el.innerHTML = `
    <div class="card-hd">
      <div>
        <div class="card-title">${p.name}</div>
        <div class="card-sub" style="font-family:var(--mono);color:var(--bmh-teal)">${p.id} · ${p.ward} · ${bmhDeptLabel(p.dept)}</div>
      </div>
      <span class="badge ${p.status==='critical'?'bd-red':p.isNewborn?'bd-purple':'bd-green'}">${p.status==='critical'?'🔴 Critical':p.isNewborn?'👶 Newborn':'🟢 Stable'}</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">
      <div style="background:var(--g6);border-radius:8px;padding:10px"><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">Diagnosis</div><div style="font-size:13px;font-weight:900">${p.dx || '—'}</div></div>
      <div style="background:var(--g6);border-radius:8px;padding:10px"><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">Doctor</div><div style="font-size:13px;font-weight:900">${p.doctor || '—'}</div></div>
      <div style="background:var(--g6);border-radius:8px;padding:10px"><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">Monitoring</div><div style="font-size:13px;font-weight:900">${p.monitoringLabel || 'Every 6 hours'}</div></div>
      <div style="background:var(--g6);border-radius:8px;padding:10px"><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">Allergies / alerts</div><div style="font-size:12px;font-weight:800">${p.allergies || 'None recorded'}</div></div>
    </div>
    <div style="background:${alerts.some(a=>a.tone!=='var(--green)') ? 'var(--red-lt)' : 'var(--green-lt)'};border-radius:10px;padding:10px;margin-bottom:12px">
      <div style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.5px;color:${alerts.some(a=>a.tone!=='var(--green)') ? 'var(--red)' : '#1a8c3c'};margin-bottom:6px">Live ward alerts</div>
      ${alerts.map(a=>`<div style="font-size:12px;color:${a.tone};font-weight:${a.tone==='var(--green)' ? '700' : '900'};margin-bottom:4px">${a.text}</div>`).join('')}
    </div>
    ${nb?`<div style="background:linear-gradient(135deg,#fce4ff,#ede4ff);border-radius:var(--r);padding:13px;border-left:5px solid var(--purple);margin-bottom:12px">
      <div style="font-size:13px;font-weight:900;color:var(--purple);margin-bottom:8px">👶 NEWBORN SPECIAL NOTES</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11.5px">
        <div><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">Birth Weight</div><div style="font-weight:900">${nb.birthWeight}</div></div>
        <div><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">APGAR (1/5 min)</div><div style="font-weight:900">${nb.apgar1}/${nb.apgar5}</div></div>
        <div class="full" style="grid-column:1/-1"><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">Feeding</div><div style="font-weight:700">${nb.feedingStatus}</div></div>
        <div class="full" style="grid-column:1/-1"><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">Jaundice</div><div style="font-weight:700;color:var(--orange)">${nb.jaundice}</div></div>
        <div class="full" style="grid-column:1/-1"><div style="font-size:9px;color:var(--g1);font-weight:800;text-transform:uppercase">Vaccinations</div><div style="font-weight:700;color:#1a8c3c">${nb.vaccinations}</div></div>
        <div class="full" style="grid-column:1/-1;background:#fff;border-radius:8px;padding:8px"><div style="font-size:9px;color:var(--purple);font-weight:800;text-transform:uppercase;margin-bottom:3px">Special Notes</div><div style="font-size:11.5px">${nb.specialNotes}</div></div>
      </div>
    </div>`:''}
    <div style="font-size:11px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Vitals</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:14px">
      ${[['BP','bp','mmHg',lastVitals.bp,'ok'],['Pulse','pulse','bpm',lastVitals.pulse,parseInt(lastVitals.pulse)>100?'warn':'ok'],['Temp','temp','°C',lastVitals.temp,parseFloat(lastVitals.temp)>37.5?'warn':'ok'],['SpO2','spo2','%',lastVitals.spo2,parseInt(lastVitals.spo2)<95?'high':'ok'],['RR','rr','brpm',lastVitals.rr,'ok'],['Weight','weight','',lastVitals.weight || p.weight || '—','ok']].map(([l,k,u,v,cls])=>`<div style="background:var(--g6);border-radius:8px;padding:9px;text-align:center"><div style="font-size:9px;font-weight:800;color:var(--g1);text-transform:uppercase;letter-spacing:.4px">${l}</div><div style="font-size:17px;font-weight:900;margin-top:3px;color:${cls==='warn'?'var(--orange)':cls==='high'?'var(--red)':'#1a8c3c'}">${v||'—'}</div><div style="font-size:9px;color:var(--g1)">${u}</div></div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
      <div style="background:var(--g6);border-radius:10px;padding:12px">
        <div style="font-size:10px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Structured chart</div>
        ${ipdChartSummary(p)}
      </div>
      <div style="background:var(--g6);border-radius:10px;padding:12px">
        <div style="font-size:10px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Monitoring schedule</div>
        ${(p.monitoringPlan || []).slice(0, 8).map(slot => `<div style="display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-bottom:1px solid var(--g5);font-size:12px"><span>${new Date(slot.dueAt).toLocaleString('en-IN')}</span><strong style="color:${slot.status==='done' ? '#1a8c3c' : new Date(slot.dueAt).getTime() < Date.now() ? 'var(--red)' : 'var(--orange)'}">${slot.status === 'done' ? 'Recorded' : new Date(slot.dueAt).getTime() < Date.now() ? 'Overdue' : 'Due'}</strong></div>`).join('') || '<div style="color:var(--g1);font-size:12px">No schedule set.</div>'}
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="font-size:11px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px">Progress Notes</div>
      <button class="btn btn-gold btn-xs" onclick="openM('m-ipd-note')">+ Add Note</button>
    </div>
    <div id="ipd-notes-list">
      ${(p.notes || []).map(n=>`<div style="background:var(--g6);border-radius:var(--rsm);padding:12px;margin-bottom:8px;border-left:3px solid var(--blue)">
        <div style="font-size:11px;font-weight:900;color:var(--bmh-blue);margin-bottom:4px">${n.date} · ${n.time}</div>
        ${n.vitals ? `<div style="font-size:10px;color:var(--g1);margin-bottom:6px">BP ${n.vitals.bp||'—'} · Pulse ${n.vitals.pulse||'—'} · Temp ${n.vitals.temp||'—'} · SpO2 ${n.vitals.spo2||'—'} · RR ${n.vitals.rr||'—'} · Pain ${n.vitals.pain||'—'}</div>` : ''}
        <div style="font-size:12px;color:var(--tx3);line-height:1.7">${n.note}</div>
        <div style="font-size:10px;color:var(--g1);margin-top:6px">👩‍⚕️ ${n.nurse} · 👨‍⚕️ ${n.doctor}</div>
      </div>`).join('')}
    </div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px">
      <button class="btn btn-outline btn-sm" onclick="printIPDSummary('${p.id}')">🖨️ Print Summary</button>
      <button class="btn btn-gold btn-sm" onclick="showToast('Discharge card generated ✓','s')">🏠 Discharge</button>
      <button class="btn btn-gray btn-sm" onclick="showToast('Vitals updated ✓','s')">📊 Update Vitals</button>
    </div>`;
  renderIPDAlerts(p);
}

function saveProgressNote() {
  if (!activeIPDPatient) return;
  const note = document.getElementById('pn-text')?.value;
  const nurse = document.getElementById('pn-nurse')?.value||'Staff Nurse';
  const doctor = document.getElementById('pn-doctor')?.value||'Dr. Varun Baweja';
  const date = document.getElementById('pn-date')?.value || new Date().toISOString().slice(0,10);
  const time = document.getElementById('pn-time')?.value || new Date().toTimeString().slice(0,5);
  const vitals = {
    bp: document.getElementById('pn-bp')?.value || '',
    pulse: document.getElementById('pn-pulse')?.value || '',
    temp: document.getElementById('pn-temp')?.value || '',
    spo2: document.getElementById('pn-spo2')?.value || '',
    rr: document.getElementById('pn-rr')?.value || '',
    pain: document.getElementById('pn-pain')?.value || ''
  };
  if (!note) { showToast('Please enter a note','w'); return; }
  if (!Array.isArray(activeIPDPatient.notes)) activeIPDPatient.notes = [];
  if (!Array.isArray(activeIPDPatient.vitalSigns)) activeIPDPatient.vitalSigns = [];
  activeIPDPatient.notes.unshift({date:new Date(date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),time,note,nurse,doctor,vitals,recordedAt:new Date(date + 'T' + time).toISOString()});
  if (Object.values(vitals).some(Boolean)) activeIPDPatient.vitalSigns.unshift(Object.assign({ recordedAt:new Date(date + 'T' + time).toISOString(), by:nurse }, vitals));
  const nextDue = (activeIPDPatient.monitoringPlan || []).find(slot => slot.status !== 'done');
  if (nextDue) {
    nextDue.status = 'done';
    nextDue.recordedAt = new Date(date + 'T' + time).toISOString();
  }
  if (fbUpdate) fbUpdate('ipdPatients/' + activeIPDPatient.id, activeIPDPatient).catch(()=>{});
  showToast('Progress note saved ✓','s');
  closeM('m-ipd-note');
  openIPDPatient(activeIPDPatient.id);
}

function printIPDSummary(id) { showToast('IPD Summary printing ✓','s'); setTimeout(()=>window.print(),300); }

// ═══════════════════════════════════════
// BMH FINANCIALS — billing, vendors, ledger, inventory sync
// ═══════════════════════════════════════
function loadBmhFinancials() {
  try {
    const pc = localStorage.getItem('bmh_patient_charges');
    if (pc) { const o = JSON.parse(pc); Object.keys(window.BMH_PATIENT_CHARGES).forEach(k=>delete window.BMH_PATIENT_CHARGES[k]); Object.assign(window.BMH_PATIENT_CHARGES, o); }
    const vb = localStorage.getItem('bmh_vendor_bills'); if (vb) { window.BMH_VENDOR_BILLS.length = 0; JSON.parse(vb).forEach(x=>window.BMH_VENDOR_BILLS.push(x)); }
    const ex = localStorage.getItem('bmh_expenses'); if (ex) { window.BMH_EXPENSES.length = 0; JSON.parse(ex).forEach(x=>window.BMH_EXPENSES.push(x)); }
    const lg = localStorage.getItem('bmh_ledger'); if (lg) { window.BMH_LEDGER.length = 0; JSON.parse(lg).forEach(x=>window.BMH_LEDGER.push(x)); }
    const pu = localStorage.getItem('bmh_purchases'); if (pu) { window.BMH_PURCHASES.length = 0; JSON.parse(pu).forEach(x=>window.BMH_PURCHASES.push(x)); }
    const iu = localStorage.getItem('bmh_inventory_usage'); if (iu) { window.BMH_INVENTORY_USAGE.length = 0; JSON.parse(iu).forEach(x=>window.BMH_INVENTORY_USAGE.push(x)); }
  } catch (e) { /* noop */ }
}
function saveBmhFinancials() {
  try {
    localStorage.setItem('bmh_patient_charges', JSON.stringify(window.BMH_PATIENT_CHARGES));
    localStorage.setItem('bmh_vendor_bills', JSON.stringify(window.BMH_VENDOR_BILLS));
    localStorage.setItem('bmh_expenses', JSON.stringify(window.BMH_EXPENSES));
    localStorage.setItem('bmh_ledger', JSON.stringify(window.BMH_LEDGER));
    localStorage.setItem('bmh_purchases', JSON.stringify(window.BMH_PURCHASES));
    localStorage.setItem('bmh_inventory_usage', JSON.stringify(window.BMH_INVENTORY_USAGE));
  } catch (e) { /* noop */ }
}
function loadInventoryStockFromStorage() {
  try {
    const s = localStorage.getItem('bmh_inventory_stock');
    if (!s) return;
    const arr = JSON.parse(s);
    if (!Array.isArray(arr)) return;
    arr.forEach(row => {
      const it = INVENTORY.find(x => x.barcode === row.barcode);
      if (it) Object.assign(it, row);
    });
  } catch (e) { /* noop */ }
}
function saveInventoryStockToStorage() {
  try { localStorage.setItem('bmh_inventory_stock', JSON.stringify(INVENTORY.map(i => ({ barcode: i.barcode, stock: i.stock, name: i.name, cat: i.cat, mrp: i.mrp, exp: i.exp, dept: i.dept, vendor: i.vendor, cost: i.cost, qr: i.qr })))); } catch (e) { /* noop */ }
}
function bmhNowISO() { return new Date().toISOString(); }
function bmhDeptLabel(k) {
  const map = { ophtho:'Ophthalmology', obg:'OBG', psych:'Psychiatry', skin:'Skin', general:'General / Shared', ot:'OT / Procedure', ipd:'IPD / Ward' };
  return map[k] || k || 'General';
}
function bmhInventoryDeptValue() { return document.getElementById('inv-in-dept')?.value || 'general'; }
function bmhInventoryUseDeptValue() { return document.getElementById('inv-use-dept')?.value || 'general'; }
function bmhCompressFileToData(file, cb) {
  if (!file) { cb(null); return; }
  if (/^image\//.test(file.type || '')) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const max = 1200;
        const scale = Math.min(1, max / Math.max(img.width || 1, img.height || 1));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round((img.width || 1) * scale);
        canvas.height = Math.round((img.height || 1) * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        cb({
          name: file.name,
          type: 'image/jpeg',
          sizeKB: Math.round((canvas.toDataURL('image/jpeg', 0.72).length * 0.75) / 1024),
          data: canvas.toDataURL('image/jpeg', 0.72)
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
    return;
  }
  const reader = new FileReader();
  reader.onload = e => cb({
    name: file.name,
    type: file.type || 'application/octet-stream',
    sizeKB: Math.round((file.size || 0) / 1024),
    data: e.target.result
  });
  reader.readAsDataURL(file);
}
function bmhDefaultInventoryDeptForPatient(bmhId) {
  const pt = PATIENTS.find(x => x.bmhId === bmhId);
  if (!pt) return 'general';
  if (pt.status === 'ipd' || pt.ipdAdmitted) return 'ipd';
  return pt.dept || 'general';
}
function inferChargeCategoryFromService(forStr) {
  const s = (forStr || '').toLowerCase();
  if (/oct|hvf|fundus|biomet|visual field|cbc|hb|thyroid|lipid|lab|investigation|diagnostic|erg|vep|topograph|specular/.test(s)) return 'diagnostic';
  if (/surgery|phaco|trab|lasik|iol|pmics|injection|ivt|pack|procedure/.test(s)) return 'surgery';
  if (/consult|follow/.test(s)) return 'consultation';
  return 'other';
}
function addBmhPatientCharge(bmhId, row) {
  if (!bmhId) return;
  if (!window.BMH_PATIENT_CHARGES[bmhId]) window.BMH_PATIENT_CHARGES[bmhId] = [];
  if (!row.amount && row.rate != null) row.amount = (Number(row.qty) || 1) * (Number(row.rate) || 0);
  window.BMH_PATIENT_CHARGES[bmhId].push(row);
  saveBmhFinancials();
  bmhSyncPatientRunningBalance(bmhId);
}
function syncPayRequestToPatientCharges(pr) {
  if (!pr || !pr.bmhId) return;
  const arr = window.BMH_PATIENT_CHARGES[pr.bmhId] || [];
  if (arr.some(x => x.ref === pr.id)) return;
  addBmhPatientCharge(pr.bmhId, {
    id: 'pr-' + pr.id,
    cat: inferChargeCategoryFromService(pr.for),
    desc: pr.for || 'Service',
    qty: 1,
    rate: pr.amount,
    amount: pr.amount,
    source: 'doctor',
    ref: pr.id,
    ts: pr.date || new Date().toISOString()
  });
}
/** Quick total for patient list (does not use another patient’s discount inputs). */
function bmhBillPreviewTotal(bmhId) {
  const lines = window.BMH_PATIENT_CHARGES[bmhId] || [];
  const sub = lines.reduce((s, x) => s + (Number(x.amount) || 0), 0);
  return sub;
}

function bmhTotalReceivedForPatient(bmhId) {
  return (TRANSACTIONS || [])
    .filter(t => t.bmhId === bmhId && t.collected !== false)
    .reduce((s, t) => s + Math.max(0, Number(t.amount) || 0), 0);
}

function bmhComputeBalanceDue(bmhId, totalOverride) {
  const targetTotal = totalOverride != null ? Number(totalOverride) || 0 : bmhTotalsForPatient(bmhId).total;
  const received = bmhTotalReceivedForPatient(bmhId);
  return Math.max(0, targetTotal - received);
}

function bmhSyncPatientRunningBalance(bmhId) {
  const pt = PATIENTS.find(x => x.bmhId === bmhId);
  if (!pt) return 0;
  const due = bmhComputeBalanceDue(bmhId);
  pt.balance = due;
  fbUpdate && fbUpdate('patients/' + bmhId, { balance: due });
  return due;
}

function bmhTotalsForPatient(bmhId) {
  const lines = window.BMH_PATIENT_CHARGES[bmhId] || [];
  const sub = lines.reduce((s, x) => s + (Number(x.amount) || 0), 0);
  const disc = Math.max(0, parseFloat(document.getElementById('bmh-bill-discount')?.value) || 0);
  const afterDisc = Math.max(0, sub - disc);
  const p = PATIENTS.find(x => x.bmhId === bmhId);
  const advAvail = Math.max(0, Number(p?.advance) || 0);
  const applyAdv = document.getElementById('bmh-apply-advance')?.checked;
  const advanceApplied = applyAdv ? Math.min(advAvail, afterDisc) : 0;
  const taxable = Math.max(0, afterDisc - advanceApplied);
  const gst = 0;
  const total = taxable;
  return { sub, gst, total, discount: disc, advanceApplied, taxable };
}
function bmhCatLabel(cat) {
  const m = { investigation: 'Investigation', diagnostic: 'Diagnostic', surgery: 'Surgery / procedure', consumable: 'Consumable', pharmacy: 'Pharmacy / injection', ot: 'OT', reception: 'Reception', consultation: 'Consultation', billing: 'Billing', inventory: 'Inventory', doctor: 'Doctor', other: 'Other' };
  return m[cat] || cat || 'Other';
}
function bmhGetTodayBillPatients() {
  const today = new Date().toISOString().slice(0, 10);
  const isToday = (p) => {
    if (p.createdAt && String(p.createdAt).startsWith(today)) return true;
    if (p.checkinAt && new Date(p.checkinAt).toISOString().startsWith(today)) return true;
    if (p.preRegistered) return true;
    if (!p.createdAt && !p.checkinAt) return true;
    return false;
  };
  let pts = PATIENTS.filter(p => (p.status === 'waiting' || p.status === 'pre-registered' || p.seen || p.dilated) && isToday(p));
  if (typeof centreMatch === 'function') pts = pts.filter(centreMatch);
  const df = window._bmhBillDeptFilter || 'all';
  if (df !== 'all') pts = pts.filter(p => p.dept === df);
  return pts;
}
function bmhGetBillPatientsForView() {
  const scope = document.getElementById('bmh-bill-patient-scope')?.value || (window._bmhBillFocusPatient ? 'focus' : 'today');
  const dateFilter = document.getElementById('bmh-bill-date-filter')?.value || new Date().toISOString().slice(0, 10);
  const search = (document.getElementById('bmh-bill-patient-search')?.value || '').trim().toLowerCase();
  let pts = [];

  if (scope === 'focus' && window._bmhBillFocusPatient) {
    pts = PATIENTS.filter(p => p.bmhId === window._bmhBillFocusPatient);
  } else if (scope === 'admitted') {
    const admittedIds = new Set((window.IPD_PATIENTS || []).filter(p => (p.status || 'admitted') !== 'discharged' && centreMatch(p)).map(p => p.bmhId));
    pts = PATIENTS.filter(p => admittedIds.has(p.bmhId));
  } else if (scope === 'all') {
    pts = PATIENTS.filter(p => centreMatch(p));
  } else if (scope === 'date') {
    pts = PATIENTS.filter(p => {
      if (!centreMatch(p)) return false;
      if (p.createdAt && String(p.createdAt).startsWith(dateFilter)) return true;
      if (p.checkinAt && new Date(p.checkinAt).toISOString().startsWith(dateFilter)) return true;
      return false;
    });
  } else {
    pts = bmhGetTodayBillPatients();
  }

  if (search) {
    pts = pts.filter(p =>
      String(p.name || '').toLowerCase().includes(search) ||
      String(p.bmhId || '').toLowerCase().includes(search) ||
      String(p.mob || '').toLowerCase().includes(search)
    );
  }
  return pts;
}
function bmhSetBillDeptFilter(k) { window._bmhBillDeptFilter = k; renderBillingPage(); }
window._bmhQuickChargeDept = window._bmhQuickChargeDept || 'all';
function bmhRefreshQuickChargeDeptButtons() {
  document.querySelectorAll('[data-bmh-quick-dept]').forEach(function (btn) {
    const active = btn.getAttribute('data-bmh-quick-dept') === (window._bmhQuickChargeDept || 'all');
    btn.className = active ? 'btn btn-xs btn-gold' : 'btn btn-xs btn-outline';
  });
}
function bmhSetQuickChargeDeptFilter(k) {
  window._bmhQuickChargeDept = k || 'all';
  bmhRefreshQuickChargeDeptButtons();
  bmhRenderQuickChargePanels();
}
window.bmhSetQuickChargeDeptFilter = bmhSetQuickChargeDeptFilter;
function bmhSelectBillPatient(bmhId) {
  if (!bmhId) return;
  window._bmhSelectedBillPatient = bmhId;
  const p = PATIENTS.find(x => x.bmhId === bmhId);
  const t = document.getElementById('bmh-bill-card-title');
  const s = document.getElementById('bmh-bill-card-sub');
  if (t) t.textContent = p ? '💳 ' + p.name : '💳 Billing';
  const advHint = p && (p.advance > 0) ? ' · Adv ₹' + (Number(p.advance) || 0).toLocaleString('en-IN') + ' (tick below to deduct)' : '';
  if (s) s.textContent = p ? p.bmhId + ' · ' + (p.dept || '') + ' · ' + (p.doctor || '') + advHint : '';
  const aa = document.getElementById('bmh-apply-advance');
  const al = document.getElementById('bmh-advance-available');
  if (p && al) al.textContent = '₹' + (Number(p.advance) || 0).toLocaleString('en-IN') + ' available';
  if (aa && p) { aa.checked = (p.advance > 0); aa.disabled = !(p.advance > 0); }
  const tog = document.getElementById('bmh-pay-received-toggle');
  if (tog && tog.checked) bmhTogglePaymentForm(true);
  bmhRenderQuickChargePanels();
  bmhRenderPatientFinancialSummary();
  bmhRenderBillLines();
  bmhUpdateBillTotals();
}
function bmhRenderBillPatientList() {
  const el = document.getElementById('bmh-bill-pt-list'); if (!el) return;
  const pts = bmhGetBillPatientsForView();
  const sel = document.getElementById('bmh-bill-pt-select');
  if (sel) {
    sel.innerHTML = pts.map(p => `<option value="${p.bmhId}">${p.name} — ${p.bmhId}</option>`).join('');
    if (window._bmhSelectedBillPatient && pts.some(p => p.bmhId === window._bmhSelectedBillPatient)) sel.value = window._bmhSelectedBillPatient;
    else if (pts.length) { sel.value = pts[0].bmhId; window._bmhSelectedBillPatient = sel.value; }
  }
  if (!pts.length) { el.innerHTML = '<div style="padding:12px;color:var(--g1);font-size:12px">No patients for today in this filter — register or check in from Reception.</div>'; return; }
  el.innerHTML = pts.map(p => {
    const tot = bmhBillPreviewTotal(p.bmhId);
    const bal = p.balance > 0 ? ' · Due ₹' + p.balance.toLocaleString('en-IN') : '';
    const adv = (p.advance > 0) ? ' · Adv ₹' + (Number(p.advance) || 0).toLocaleString('en-IN') : '';
    return `<button type="button" class="btn btn-outline btn-sm" style="width:100%;justify-content:space-between;margin-bottom:4px;text-align:left" onclick="document.getElementById('bmh-bill-pt-select').value='${p.bmhId}';bmhSelectBillPatient('${p.bmhId}')">
      <span><strong>${p.name}</strong> <span style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal)">${p.bmhId}</span>${adv ? '<span style="font-size:10px;color:var(--blue);font-weight:800">' + adv + '</span>' : ''}</span>
      <span style="font-size:11px;color:var(--g1)">Bill ₹${tot.toLocaleString('en-IN')}${bal}</span>
    </button>`;
  }).join('');
}
function bmhRenderBillLines() {
  const el = document.getElementById('bmh-bill-lines'); if (!el) return;
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
  if (!bmhId) { el.innerHTML = '<div style="color:var(--g1);font-size:12px">Select a patient.</div>'; return; }
  const lines = window.BMH_PATIENT_CHARGES[bmhId] || [];
  if (!lines.length) { el.innerHTML = '<div style="color:var(--g1);font-size:12px">No charge lines yet — add from doctor, reception, OT, inventory, or manual.</div>'; return; }
  const byCat = {};
  lines.forEach(l => { const c = l.cat || 'other'; if (!byCat[c]) byCat[c] = []; byCat[c].push(l); });
  el.innerHTML = Object.keys(byCat).map(cat => `<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:800;color:var(--bmh-teal);text-transform:uppercase;margin-bottom:4px">${bmhCatLabel(cat)}</div>${byCat[cat].map(l => {
    const amt = Number(l.amount) || 0;
    return `<div style="display:grid;grid-template-columns:minmax(0,1.6fr) 66px 88px 88px auto;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid var(--g5);font-size:12px">
      <div style="min-width:0">
        <input type="text" value="${String(l.desc || '—').replace(/"/g,'&quot;')}" onchange="bmhUpdateChargeLine('${bmhId}','${l.id}','desc',this.value)" style="width:100%;font-size:12px;font-weight:700;border:none;background:transparent;padding:0">
        <div style="font-size:10px;color:var(--g1)">${l.source || '—'}</div>
      </div>
      <input type="number" min="1" step="1" value="${Number(l.qty)||1}" onchange="bmhUpdateChargeLine('${bmhId}','${l.id}','qty',this.value)" style="font-size:11px;padding:6px;border-radius:6px;border:1px solid var(--g4);width:100%">
      <input type="number" min="0" step="1" value="${Number(l.rate)||amt}" onchange="bmhUpdateChargeLine('${bmhId}','${l.id}','rate',this.value)" style="font-size:11px;padding:6px;border-radius:6px;border:1px solid var(--g4);width:100%">
      <span style="font-weight:800;text-align:right">₹${amt.toLocaleString('en-IN')}</span>
      <button type="button" class="btn btn-xs btn-gray" onclick="bmhRemoveChargeLine('${bmhId}','${l.id}')">✕</button>
    </div>`;
  }).join('')}</div>`).join('');
}
function bmhUpdateChargeLine(bmhId, lineId, field, value) {
  const arr = window.BMH_PATIENT_CHARGES[bmhId] || [];
  const row = arr.find(function (x) { return x.id === lineId; });
  if (!row) return;
  if (field === 'desc') row.desc = String(value || '').trim() || row.desc;
  if (field === 'qty') row.qty = Math.max(1, Number(value) || 1);
  if (field === 'rate') row.rate = Math.max(0, Number(value) || 0);
  row.amount = (Number(row.qty) || 1) * (Number(row.rate) || 0);
  saveBmhFinancials();
  bmhSyncPatientRunningBalance(bmhId);
  bmhRenderBillLines();
  bmhUpdateBillTotals();
  bmhRenderBillPatientList();
  bmhRenderPatientFinancialSummary();
}

function bmhGetPatientFinancialSummary(bmhId) {
  const patient = PATIENTS.find(x => x.bmhId === bmhId) || {};
  const lines = window.BMH_PATIENT_CHARGES[bmhId] || [];
  const txns = (TRANSACTIONS || []).filter(t => t.bmhId === bmhId).slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  const payRequests = (PAY_REQUESTS || []).filter(r => r.bmhId === bmhId).slice().sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  const chargeTotal = lines.reduce((s, x) => s + (Number(x.amount) || 0), 0);
  const paidTotal = txns.filter(t => t.collected !== false).reduce((s, t) => s + Math.max(0, Number(t.amount) || 0), 0);
  const advanceTotal = txns.filter(t => t.type === 'advance' || /advance/i.test(t.service || '')).reduce((s, t) => s + Math.max(0, Number(t.amount) || 0), 0);
  const pendingTotal = payRequests.filter(r => r.status === 'pending').reduce((s, r) => s + Math.max(0, Number(r.amount) || 0), 0);
  const balance = Math.max(Math.max(0, Number(patient.balance) || 0), Math.max(0, chargeTotal - paidTotal));
  const timeline = [];

  lines.forEach(l => {
    timeline.push({
      ts: l.ts || l.date || new Date().toISOString(),
      kind: 'charge',
      label: l.desc || 'Charge',
      meta: [bmhCatLabel(l.cat), l.source].filter(Boolean).join(' · '),
      amount: Number(l.amount) || 0
    });
  });
  txns.forEach(t => {
    timeline.push({
      ts: t.date || new Date().toISOString(),
      kind: 'payment',
      label: t.service || 'Payment',
      meta: [t.mode, t.paymentRef].filter(Boolean).join(' · '),
      amount: Number(t.amount) || 0
    });
  });
  payRequests.forEach(r => {
    timeline.push({
      ts: r.date || new Date().toISOString(),
      kind: r.status === 'pending' ? 'pending' : 'payment',
      label: r.for || 'Billing request',
      meta: [r.mode || r.status, r.ins].filter(Boolean).join(' · '),
      amount: Number(r.amount) || 0
    });
  });
  timeline.sort((a, b) => new Date(b.ts || 0) - new Date(a.ts || 0));

  return { patient, lines, txns, payRequests, chargeTotal, paidTotal, advanceTotal, pendingTotal, balance, timeline };
}

function bmhRenderPatientFinancialSummary() {
  const el = document.getElementById('bmh-bill-summary');
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
  if (!el) return;
  if (!bmhId) {
    el.innerHTML = '<div style="padding:12px;background:var(--g6);border-radius:8px;color:var(--g1);font-size:12px">Select a patient to view the financial summary.</div>';
    return;
  }
  const info = bmhGetPatientFinancialSummary(bmhId);
  const fmt = n => '₹' + (Number(n) || 0).toLocaleString('en-IN');
  const timelineHtml = info.timeline.length ? info.timeline.slice(0, 14).map(item => {
    const tone = item.kind === 'charge' ? 'var(--bmh-blue)' : item.kind === 'pending' ? 'var(--orange)' : 'var(--green)';
    const badge = item.kind === 'charge' ? 'Charge' : item.kind === 'pending' ? 'Pending' : 'Payment';
    return `<div style="display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid var(--g5);font-size:12px">
      <div style="flex:1">
        <div style="font-weight:800">${item.label}</div>
        <div style="font-size:10px;color:var(--g1)">${new Date(item.ts).toLocaleString('en-IN')} ${item.meta ? '· ' + item.meta : ''}</div>
      </div>
      <div style="text-align:right;min-width:110px">
        <div style="font-size:10px;font-weight:800;color:${tone};text-transform:uppercase">${badge}</div>
        <div style="font-weight:900;color:${tone}">${fmt(item.amount)}</div>
      </div>
    </div>`;
  }).join('') : '<div style="color:var(--g1);font-size:12px">No financial activity recorded yet.</div>';

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px">
      <div style="background:var(--g6);border-radius:8px;padding:10px"><div style="font-size:10px;color:var(--g1);font-weight:800;text-transform:uppercase">Charge total</div><div style="font-size:18px;font-weight:900;color:var(--bmh-blue)">${fmt(info.chargeTotal)}</div></div>
      <div style="background:var(--green-lt);border-radius:8px;padding:10px"><div style="font-size:10px;color:#1a8c3c;font-weight:800;text-transform:uppercase">Received</div><div style="font-size:18px;font-weight:900;color:#1a8c3c">${fmt(info.paidTotal)}</div></div>
      <div style="background:var(--blue-lt);border-radius:8px;padding:10px"><div style="font-size:10px;color:var(--blue);font-weight:800;text-transform:uppercase">Advance</div><div style="font-size:18px;font-weight:900;color:var(--blue)">${fmt(info.advanceTotal)}</div></div>
      <div style="background:var(--orange-lt);border-radius:8px;padding:10px"><div style="font-size:10px;color:#8a4200;font-weight:800;text-transform:uppercase">Outstanding</div><div style="font-size:18px;font-weight:900;color:#8a4200">${fmt(Math.max(info.pendingTotal, info.balance))}</div></div>
    </div>
    <div style="background:var(--g6);border-radius:8px;padding:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div style="font-size:10px;font-weight:800;color:var(--bmh-blue);text-transform:uppercase">Financial timeline</div>
        <button type="button" class="btn btn-outline btn-xs" onclick="printBmhPatientBill('${bmhId}')">🖨️ Print statement</button>
      </div>
      ${timelineHtml}
    </div>`;
}
function bmhQuickChargeGroups() {
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
  const pt = PATIENTS.find(x => x.bmhId === bmhId) || {};
  const deptKey = window._bmhQuickChargeDept || pt.dept || 'all';
  const deptCats = {
    ophtho: /^eye/i,
    obg: /^obg/i,
    psych: /^psych/i,
    skin: /^skin/i
  };
  const deptCharges = deptCats[deptKey] ? CHARGES_DATA.filter(c => deptCats[deptKey].test(String(c.cat || ''))) : CHARGES_DATA.slice();
  const usageCountFor = function (name) {
    const key = String(name || '').trim().toLowerCase();
    if (!key) return 0;
    let count = 0;
    Object.keys(window.BMH_PATIENT_CHARGES || {}).forEach(function (bid) {
      (window.BMH_PATIENT_CHARGES[bid] || []).forEach(function (row) {
        if (String(row.desc || '').trim().toLowerCase() === key) count += Number(row.qty) || 1;
      });
    });
    return count;
  };
  const sortByUsage = function (items) {
    return items.slice().sort(function (a, b) {
      const diff = usageCountFor(b.name) - usageCountFor(a.name);
      if (diff) return diff;
      return String(a.name || '').localeCompare(String(b.name || ''));
    });
  };
  const investigations = deptCharges.filter(c => /oct|biometry|hvf|fundus|topography|specular|cbc|hba1c|thyroid|lipid|urine|x-ray|ecg|scan|test|profile|angiography/i.test(c.name));
  const surgeries = deptCharges.filter(c => /surgery|lscs|delivery|laparoscopy|trabeculectomy|lasik|pmics|implantation|capsulotomy|iridotomy|excision/i.test(c.name) || /sx/i.test(c.cat));
  const procedures = deptCharges.filter(c => !investigations.includes(c) && !surgeries.includes(c) && !/consultation|follow-up/i.test(c.name));
  const medicines = (INVENTORY || []).filter(i => (i.stock || 0) > 0).slice(0, 8).map(i => ({ name: i.name, chd: i.mrp || 0, rpr: i.mrp || 0 }));
  const admittedIds = new Set((window.IPD_PATIENTS || []).filter(p => (p.status || 'admitted') !== 'discharged').map(p => p.bmhId));
  const showStay = !!(bmhId && admittedIds.has(bmhId));
  const stay = [
    { name: 'IPD Bed Charges (per day)', chd: 1500, rpr: 1200 },
    { name: 'Private Room Charges (per day)', chd: 3000, rpr: 2500 },
    { name: 'Nursing Charges', chd: 500, rpr: 400 }
  ];
  const groups = [
    { label: 'Investigations', items: sortByUsage(investigations).slice(0, 12), cat: 'diagnostic' },
    { label: 'Procedures', items: sortByUsage(procedures).slice(0, 12), cat: 'procedure' },
    { label: 'Surgeries', items: sortByUsage(surgeries).slice(0, 12), cat: 'surgery' },
    { label: 'Medicines / Consumables', items: medicines, cat: 'pharmacy' }
  ];
  if (showStay) groups.push({ label: 'Stay / Inpatient', items: stay, cat: 'stay' });
  return groups.filter(group => group.items && group.items.length);
}
function bmhQuickAddCharge(name, amount, cat) {
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
  if (!bmhId) { showToast('Select a patient first', 'w'); return; }
  const amt = Number(amount) || 0;
  addBmhPatientCharge(bmhId, { id: 'q' + Date.now() + Math.random().toString(36).slice(2, 5), cat: cat || inferChargeCategoryFromService(name), desc: name, qty: 1, rate: amt, amount: amt, source: 'billing-quick', ts: new Date().toISOString() });
  bmhRenderBillLines();
  bmhUpdateBillTotals();
  bmhRenderBillPatientList();
  bmhRenderPatientFinancialSummary();
  showToast(name + ' added to bill ✓', 's');
}
window.bmhQuickAddCharge = bmhQuickAddCharge;
function bmhRenderQuickChargePanels() {
  const el = document.getElementById('bmh-quick-charge-panels');
  if (!el) return;
  bmhRefreshQuickChargeDeptButtons();
  const centre = getEffectiveCentre();
  const groups = bmhQuickChargeGroups();
  const rawQ = String(document.getElementById('bmh-charge-search')?.value || '').trim().toLowerCase();
  const q = rawQ.length >= 2 ? rawQ : '';
  const deptKey = window._bmhQuickChargeDept || 'all';
  const deptMatcher = {
    ophtho: /eye|ophth|cataract|phaco|pmics|lasik|trabec|pteryg|retina|glaucoma|optic/i,
    obg: /obg|gyn|obs|delivery|lscs|preg|uter|ovar|fertility|lapar/i,
    psych: /psych|mental|depress|anxiety|ect|neuro|brain|seizure|stroke|addiction/i,
    skin: /skin|derm|cosmet|laser|peel|prp|botox|filler|hair/i
  };
  const matchesQuickDept = function (item) {
    if (deptKey === 'all') return true;
    const hay = (String(item.name || '') + ' ' + String(item.cat || '')).toLowerCase();
    return deptMatcher[deptKey] ? deptMatcher[deptKey].test(hay) : true;
  };
  const searchMatches = q ? (CHARGES_DATA || []).filter(function (item) {
    if (!matchesQuickDept(item)) return false;
    return String(item.name || '').toLowerCase().includes(q);
  }).slice(0, 24) : [];
  const cardHtml = function (item, amount, cat, accent) {
    return `<button type="button" class="btn btn-xs btn-outline" style="display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;min-height:78px;padding:10px;border-radius:10px;text-align:left;background:${accent || '#fff'};border:1px solid var(--g5)" onclick="bmhQuickAddCharge('${String(item.name).replace(/'/g, "\\'")}', ${Number(amount) || 0}, '${cat}')"><span style="font-size:11.5px;font-weight:800;line-height:1.35">${item.name}</span><span style="font-size:9px;color:var(--g1)">${item.cat || cat || 'charge'}</span><span style="font-size:12px;font-weight:900;color:var(--bmh-blue)">₹${(Number(amount) || 0).toLocaleString('en-IN')}</span></button>`;
  };
  const searchHtml = q ? `<div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;color:var(--bmh-blue);text-transform:uppercase;margin-bottom:6px">Search results</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">
      ${searchMatches.length ? searchMatches.map(item => {
        const amount = item[centre?.toLowerCase?.()] ?? item[centre] ?? item.chd ?? 0;
        return cardHtml(item, amount, inferChargeCategoryFromService(item.name), 'var(--g6)');
      }).join('') : '<div style="font-size:12px;color:var(--g1)">No matching charges</div>'}
      </div>
    </div>` : '';
  el.innerHTML = searchHtml + groups.map(group => {
    const items = group.items.map(item => {
      const amount = item[centre?.toLowerCase?.()] ?? item[centre] ?? item.chd ?? 0;
      return cardHtml(item, amount, group.cat, '#fff');
    }).join('');
    return `<div style="margin-bottom:10px">
      <div style="font-size:10px;font-weight:800;color:var(--bmh-blue);text-transform:uppercase;margin-bottom:6px">${group.label}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px">${items || '<div style="font-size:12px;color:var(--g1)">No items</div>'}</div>
    </div>`;
  }).join('');
}
function bmhFindChargeAndAdd() {
  const q = String(document.getElementById('bmh-charge-search')?.value || '').trim().toLowerCase();
  if (q.length < 2) { showToast('Type at least 2 letters', 'w'); return; }
  const centre = getEffectiveCentre();
  const item = (CHARGES_DATA || []).find(function (c) { return String(c.name || '').toLowerCase().includes(q); });
  if (!item) { showToast('No matching charge found', 'w'); return; }
  const amount = item[centre?.toLowerCase?.()] ?? item[centre] ?? item.chd ?? 0;
  bmhQuickAddCharge(item.name, amount, inferChargeCategoryFromService(item.name));
}
function renderTpaPage() {
  const body = document.getElementById('tpa-case-body');
  if (!body) return;
  const claims = (PAY_REQUESTS || []).filter(function (r) {
    return /Insurance|TPA|PMJAY|CGHS|ECHS/i.test(String(r.mode || r.ins || ''));
  }).sort(function (a, b) { return new Date(b.date || 0) - new Date(a.date || 0); });
  const totalClaimed = claims.reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0);
  const received = (TRANSACTIONS || []).filter(function (t) {
    return /Insurance|TPA|PMJAY|CGHS|ECHS/i.test(String(t.mode || t.ins || ''));
  }).reduce(function (s, t) { return s + (Number(t.amount) || 0); }, 0);
  const pending = claims.filter(function (r) { return r.status === 'pending'; }).reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0);
  const rejected = claims.filter(function (r) { return r.status === 'rejected'; }).reduce(function (s, r) { return s + (Number(r.amount) || 0); }, 0);
  const set = function (id, val) { const el = document.getElementById(id); if (el) el.textContent = '₹' + Number(val || 0).toLocaleString('en-IN'); };
  set('tpa-total-claimed', totalClaimed);
  set('tpa-total-received', received);
  set('tpa-total-pending', pending);
  set('tpa-total-rejected', rejected);
  body.innerHTML = claims.length ? claims.map(function (r) {
    const receivedAmt = (TRANSACTIONS || []).filter(function (t) { return t.bmhId === r.bmhId && /Insurance|TPA|PMJAY|CGHS|ECHS/i.test(String(t.mode || t.ins || '')); }).reduce(function (s, t) { return s + (Number(t.amount) || 0); }, 0);
    const approvedAmt = Math.max(Number(r.approvedAmount) || 0, Number(r.amount) || 0);
    const pendingAmt = Math.max(0, approvedAmt - receivedAmt);
    return `<tr>
      <td><div style="font-weight:800;font-size:12px">${r.patient || '—'}</div><div style="font-family:var(--mono);font-size:9px;color:var(--bmh-teal)">${r.bmhId || '—'}</div></td>
      <td><span class="badge bd-blue">${r.ins || r.mode || 'Insurance'}</span></td>
      <td style="font-family:var(--mono);font-size:10px">${r.policy || '—'}</td>
      <td>${r.for || 'Hospital bill'}</td>
      <td>₹${(Number(r.amount) || 0).toLocaleString('en-IN')}</td>
      <td>₹${approvedAmt.toLocaleString('en-IN')}</td>
      <td>₹${receivedAmt.toLocaleString('en-IN')}</td>
      <td style="font-weight:900;color:${pendingAmt > 0 ? 'var(--orange)' : 'var(--green)'}">₹${pendingAmt.toLocaleString('en-IN')}</td>
      <td><span class="badge ${r.status === 'pending' ? 'bd-orange' : r.status === 'rejected' ? 'bd-red' : 'bd-green'}">${r.status || 'pending'}</span></td>
    </tr>`;
  }).join('') : '<tr><td colspan="9" style="text-align:center;color:var(--g1);padding:20px">No TPA / cashless cases yet</td></tr>';
}
function bmhRemoveChargeLine(bmhId, lineId) {
  const arr = window.BMH_PATIENT_CHARGES[bmhId]; if (!arr) return;
  const i = arr.findIndex(x => x.id === lineId); if (i > -1) arr.splice(i, 1);
  saveBmhFinancials();
  bmhSyncPatientRunningBalance(bmhId);
  bmhRenderBillLines();
  bmhUpdateBillTotals();
  bmhRenderBillPatientList();
}
function bmhAddManualBillLine() {
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
  if (!bmhId) { showToast('Select a patient', 'w'); return; }
  const desc = prompt('Description'); if (!desc) return;
  const rate = parseFloat(prompt('Amount ₹') || '0'); if (!(rate > 0)) return;
  const cat = prompt('Category (diagnostic / surgery / consumable / pharmacy / other)', 'other') || 'other';
  addBmhPatientCharge(bmhId, { id: 'm' + Date.now(), cat, desc, qty: 1, rate, amount: rate, source: 'billing', ts: new Date().toISOString() });
  bmhRenderBillLines();
  bmhUpdateBillTotals();
  bmhRenderBillPatientList();
  showToast('Line added ✓', 's');
}
function bmhUpdateBillTotals() {
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
  const z = bmhId ? bmhTotalsForPatient(bmhId) : { sub: 0, gst: 0, total: 0, discount: 0, advanceApplied: 0, taxable: 0 };
  const { sub, gst, total, discount, advanceApplied, taxable } = z;
  const received = bmhId ? bmhTotalReceivedForPatient(bmhId) : 0;
  const due = Math.max(0, total - received);
  const a = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = '₹' + v.toLocaleString('en-IN'); };
  a('bill-sub', sub);
  const bd = document.getElementById('bill-discount-line');
  if (bd) { bd.style.display = discount > 0 ? 'flex' : 'none'; bd.style.justifyContent = 'space-between'; }
  a('bill-discount-amt', discount);
  const ba = document.getElementById('bill-advance-line');
  if (ba) { ba.style.display = advanceApplied > 0 ? 'flex' : 'none'; ba.style.justifyContent = 'space-between'; }
  a('bill-advance-amt', advanceApplied);
  const tx = document.getElementById('bill-taxable');
  if (tx) tx.textContent = '₹' + (taxable || 0).toLocaleString('en-IN');
  a('bill-received', received);
  a('bill-balance-due', due);
  a('bill-total', total);
  if (bmhId) bmhSyncPatientRunningBalance(bmhId);
}

function bmhTogglePaymentForm(on) {
  const wrap = document.getElementById('bmh-pay-form');
  if (wrap) wrap.style.display = on ? 'block' : 'none';
  if (!on) return;
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
  const amtEl = document.getElementById('bmh-pay-amt');
  if (bmhId && amtEl && !amtEl.value) amtEl.value = String(bmhComputeBalanceDue(bmhId));
}
window.bmhTogglePaymentForm = bmhTogglePaymentForm;
function bmhAppendLedger(row) {
  window.BMH_LEDGER.push(Object.assign({ id: 'L' + Date.now() + Math.random().toString(36).slice(2, 6) }, row));
  saveBmhFinancials();
}
function bmhRenderVendorTables() {
  const el = document.getElementById('bmh-vendor-table');
  if (el) {
    const rows = window.BMH_VENDOR_BILLS.slice().reverse();
    el.innerHTML = rows.length ? `<table class="rc-queue-table" style="width:100%"><thead><tr><th>Vendor</th><th>Inv</th><th>₹</th><th>Status</th><th>Bill</th><th></th></tr></thead><tbody>${rows.map(v => `<tr><td>${v.vendor}</td><td style="font-family:var(--mono);font-size:10px">${v.invoiceNo || '—'}</td><td>₹${v.amount.toLocaleString('en-IN')}</td><td><span class="badge ${v.status === 'paid' ? 'bd-green' : 'bd-orange'}">${v.status}</span></td><td style="font-size:10px">${v.billFile?.name || v.uploadedName || '—'}</td><td>${v.status === 'pending' ? `<button type="button" class="btn btn-xs btn-gold" onclick="bmhMarkVendorPaid('${v.id}')">Mark paid</button>` : (v.paidRef || '—')}</td></tr>`).join('')}</tbody></table>` : '<div style="color:var(--g1);font-size:12px">No vendor bills.</div>';
  }
  const mini = document.getElementById('inv-vendor-mini');
  if (mini) {
    const pend = window.BMH_VENDOR_BILLS.filter(v => v.status === 'pending');
    mini.innerHTML = pend.length ? pend.map(v => `<div style="padding:6px;border-bottom:1px solid var(--g5);font-size:12px">${v.vendor} · ₹${v.amount.toLocaleString('en-IN')} <span class="badge bd-orange">due</span><div style="font-size:10px;color:var(--g1)">${v.invoiceNo || '—'} · ${v.billFile?.name || v.uploadedName || 'No bill file'}</div></div>`).join('') : '<div style="color:var(--g1);font-size:12px">No pending vendor bills.</div>';
  }
}
function bmhAddVendorBill() {
  const vendor = document.getElementById('bmh-vend-name')?.value?.trim();
  const inv = document.getElementById('bmh-vend-inv')?.value?.trim();
  const amt = parseFloat(document.getElementById('bmh-vend-amt')?.value || '0');
  const due = document.getElementById('bmh-vend-due')?.value || '';
  const f = document.getElementById('bmh-vend-file')?.files?.[0];
  if (!vendor || !(amt > 0)) { showToast('Vendor and amount required', 'w'); return; }
  window.BMH_VENDOR_BILLS.push({ id: 'VB' + Date.now(), vendor, invoiceNo: inv, amount: amt, dueDate: due, status: 'pending', uploadedName: f ? f.name : '', createdAt: new Date().toISOString() });
  saveBmhFinancials();
  bmhRenderVendorTables();
  showToast('Vendor bill recorded ✓', 's');
}
function bmhMarkVendorPaid(id) {
  const ref = prompt('Cheque no. / UTR / reference:');
  if (ref === null) return;
  const v = window.BMH_VENDOR_BILLS.find(x => x.id === id); if (!v) return;
  v.status = 'paid';
  v.paidRef = ref || '';
  v.paidAt = new Date().toISOString();
  bmhAppendLedger({ date: new Date().toISOString(), type: 'Payment', narration: 'Vendor ' + v.vendor + ' — Inv ' + (v.invoiceNo || ''), dr: v.amount, cr: 0, party: v.vendor, ref: v.paidRef });
  saveBmhFinancials();
  bmhRenderVendorTables();
  renderBillingPage();
  showToast('Payment recorded ✓', 's');
}
function bmhAddExpense() {
  const desc = document.getElementById('bmh-exp-desc')?.value?.trim();
  const amt = parseFloat(document.getElementById('bmh-exp-amt')?.value || '0');
  const cat = document.getElementById('bmh-exp-cat')?.value?.trim() || 'General';
  if (!desc || !(amt > 0)) { showToast('Description and amount required', 'w'); return; }
  window.BMH_EXPENSES.push({ id: 'EX' + Date.now(), date: new Date().toISOString(), desc, amount: amt, cat });
  bmhAppendLedger({ date: new Date().toISOString(), type: 'Expense', narration: desc + ' (' + cat + ')', dr: amt, cr: 0, party: '—', ref: '' });
  saveBmhFinancials();
  document.getElementById('bmh-exp-desc').value = '';
  document.getElementById('bmh-exp-amt').value = '';
  bmhRenderExpenseList();
  showToast('Expense posted ✓', 's');
}
function bmhRenderExpenseList() {
  const el = document.getElementById('bmh-exp-list'); if (!el) return;
  el.innerHTML = window.BMH_EXPENSES.slice().reverse().map(e => `<div style="padding:6px;border-bottom:1px solid var(--g5);font-size:12px;display:flex;justify-content:space-between"><span>${e.desc}</span><strong>₹${e.amount.toLocaleString('en-IN')}</strong></div>`).join('') || '<div style="color:var(--g1)">No expenses.</div>';
}
function bmhRenderLedgerBody() {
  const el = document.getElementById('bmh-ledger-body'); if (!el) return;
  const rows = window.BMH_LEDGER.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  el.innerHTML = rows.map(l => `<tr><td style="white-space:nowrap;font-size:11px">${(l.date || '').slice(0, 10)}</td><td>${l.type || ''}</td><td>${l.narration || ''}</td><td>${l.party || ''}</td><td style="text-align:right">${l.dr ? '₹' + l.dr.toLocaleString('en-IN') : '—'}</td><td style="text-align:right">${l.cr ? '₹' + l.cr.toLocaleString('en-IN') : '—'}</td><td style="font-size:10px">${l.ref || ''}</td></tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--g1)">No entries yet.</td></tr>';
}
function bmhExportLedgerCsv() {
  const rows = [['Date', 'Type', 'Narration', 'Party', 'Debit', 'Credit', 'Ref']];
  window.BMH_LEDGER.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(l => { rows.push([l.date, l.type, l.narration, l.party, l.dr || 0, l.cr || 0, l.ref]); });
  const csv = rows.map(r => r.map(x => '"' + String(x).replace(/"/g, '""') + '"').join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'bmh-daybook.csv';
  a.click();
}
function bmhRenderBillingVendorSummary() {
  const el = document.getElementById('bmh-bill-vendor-summary'); if (!el) return;
  const pend = window.BMH_VENDOR_BILLS.filter(v => v.status === 'pending');
  const sum = pend.reduce((s, v) => s + v.amount, 0);
  el.innerHTML = pend.length ? `<div style="font-weight:800;margin-bottom:6px">Pending ₹${sum.toLocaleString('en-IN')} (${pend.length} bills)</div>${pend.slice(0, 5).map(v => `<div style="font-size:11px;color:var(--tx3)">${v.vendor} — ₹${v.amount.toLocaleString('en-IN')}</div>`).join('')}` : '<div style="color:var(--g1)">No pending vendor bills.</div>';
}
function printBmhPatientBill(bmhIdOpt) {
  const bmhId = bmhIdOpt || document.getElementById('bmh-bill-pt-select')?.value;
  if (!bmhId) { showToast('Select a patient', 'w'); return; }
  const info = bmhGetPatientFinancialSummary(bmhId);
  const p = info.patient || {};
  const lines = window.BMH_PATIENT_CHARGES[bmhId] || [];
  const { sub, total, discount, advanceApplied, taxable } = bmhTotalsForPatient(bmhId);
  const invNo = 'INV-' + String(Date.now()).slice(-8);
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const sz = document.getElementById('bmh-print-size')?.value || window.BMH_BILL_PRINT_SIZE || 'A4';
  const pageCss = sz === 'A5' ? 'size: 148mm 210mm' : 'size: A4 portrait';
  const byCat = {};
  lines.forEach(l => { const c = l.cat || 'other'; if (!byCat[c]) byCat[c] = []; byCat[c].push(l); });
  const bodyRows = Object.keys(byCat).map(cat => {
    const hdr = `<tr><td colspan="5" style="background:#eef2f8;font-weight:800;padding:6px">${bmhCatLabel(cat)}</td></tr>`;
    const rs = byCat[cat].map((l, i) => `<tr><td>${i + 1}</td><td>${l.desc || ''}</td><td style="text-align:center">${l.qty || 1}</td><td style="text-align:right">₹${(Number(l.rate) || 0).toLocaleString('en-IN')}</td><td style="text-align:right;font-weight:700">₹${(Number(l.amount) || 0).toLocaleString('en-IN')}</td></tr>`).join('');
    return hdr + rs;
  }).join('');
  const timelineRows = info.timeline.map((item, idx) => `<tr>
    <td>${idx + 1}</td>
    <td>${new Date(item.ts).toLocaleDateString('en-IN')}</td>
    <td>${item.kind === 'charge' ? 'Charge' : item.kind === 'pending' ? 'Pending' : 'Payment'}</td>
    <td>${item.label}</td>
    <td>${item.meta || '—'}</td>
    <td style="text-align:right;font-weight:700">₹${(Number(item.amount) || 0).toLocaleString('en-IN')}</td>
  </tr>`).join('');
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bill</title><style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',system-ui,sans-serif;padding:0 8mm;font-size:12px;width:100%;max-width:100%}
@page{${pageCss};margin:8mm}
.hdr{display:flex;justify-content:space-between;border-bottom:3px solid #1A3C6E;padding-bottom:10px;margin-bottom:12px}
table{width:100%;border-collapse:collapse;margin-bottom:12px} th,td{padding:8px;border-bottom:1px solid #eee;font-size:11.5px}
th{background:#1A3C6E;color:#fff;font-size:10px;text-transform:uppercase}
.tot{display:flex;justify-content:flex-end;gap:16px;margin-top:8px;font-weight:800}
</style></head><body>
<div class="hdr"><div><div style="font-size:18px;font-weight:900;color:#1A3C6E">Baweja Multispeciality Hospital</div><div style="font-size:10px;color:#666">Chandigarh · Ropar · +91-81466 22802</div></div>
<div style="text-align:right"><div style="font-weight:900;color:#1A3C6E">${invNo}</div><div style="font-size:11px;color:#666">${today}</div></div></div>
<div style="background:#f5f5f7;border-radius:8px;padding:10px 14px;margin-bottom:12px;display:flex;justify-content:space-between">
  <div><strong>${p.name || 'Patient'}</strong><div style="font-size:10px;font-family:monospace;color:#0B7B8C">${bmhId}</div><div style="font-size:10px">${p.age ? p.age + 'Y' : ''} ${p.sex || ''} · ${p.doctor || ''}</div></div>
  <div style="text-align:right;font-size:11px">${p.dept || ''}</div>
</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">
  <div style="background:#f5f5f7;padding:8px;border-radius:8px"><div style="font-size:9px;color:#666;text-transform:uppercase;font-weight:800">Charges</div><div style="font-size:16px;font-weight:900;color:#1A3C6E">₹${info.chargeTotal.toLocaleString('en-IN')}</div></div>
  <div style="background:#eef9f0;padding:8px;border-radius:8px"><div style="font-size:9px;color:#1a8c3c;text-transform:uppercase;font-weight:800">Received</div><div style="font-size:16px;font-weight:900;color:#1a8c3c">₹${info.paidTotal.toLocaleString('en-IN')}</div></div>
  <div style="background:#eef4ff;padding:8px;border-radius:8px"><div style="font-size:9px;color:#0B7B8C;text-transform:uppercase;font-weight:800">Advance</div><div style="font-size:16px;font-weight:900;color:#0B7B8C">₹${info.advanceTotal.toLocaleString('en-IN')}</div></div>
  <div style="background:#fff4e8;padding:8px;border-radius:8px"><div style="font-size:9px;color:#b55a00;text-transform:uppercase;font-weight:800">Balance / due</div><div style="font-size:16px;font-weight:900;color:#b55a00">₹${Math.max(info.pendingTotal, info.balance).toLocaleString('en-IN')}</div></div>
</div>
<table><thead><tr><th>#</th><th>Description</th><th>Qty</th><th>Rate ₹</th><th>Amount ₹</th></tr></thead><tbody>${bodyRows || '<tr><td colspan="5">No lines</td></tr>'}</tbody></table>
<div class="tot" style="flex-direction:column;align-items:flex-end;gap:4px">
${discount > 0 ? '<span>Discount ₹' + discount.toLocaleString('en-IN') + '</span>' : ''}
${advanceApplied > 0 ? '<span>Advance adjusted ₹' + advanceApplied.toLocaleString('en-IN') + '</span>' : ''}
<span>Chargeable total ₹${(taxable != null ? taxable : sub - discount - advanceApplied).toLocaleString('en-IN')}</span>
<span style="color:#1A3C6E">Net ₹${total.toLocaleString('en-IN')}</span>
</div>
<div style="margin:16px 0 8px;font-size:11px;font-weight:900;color:#1A3C6E;text-transform:uppercase">Financial transaction history</div>
<table><thead><tr><th>#</th><th>Date</th><th>Type</th><th>Description</th><th>Details</th><th>Amount ₹</th></tr></thead><tbody>${timelineRows || '<tr><td colspan="6">No financial history</td></tr>'}</tbody></table>
<div style="margin-top:24px;font-size:10px;color:#777;text-align:center">Computer-generated bill · BMH</div>
</body></html>`;
  safePrint(html);
  showToast('Print dialog opened ✓', 's');
}
function printBmhPaymentAck(txn) {
  const sz = document.getElementById('bmh-print-size')?.value || window.BMH_BILL_PRINT_SIZE || 'A4';
  const pageCss = sz === 'A5' ? 'size: 148mm 210mm' : 'size: A4 portrait';
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const amt = Number(txn.amount) || 0;
  const ref = txn.paymentRef || txn.ref || '';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box}body{font-family:system-ui,sans-serif;padding:10mm;font-size:13px;width:100%} @page{${pageCss};margin:8mm}
.hdr{text-align:center;border-bottom:3px solid #1A3C6E;padding-bottom:10px;margin-bottom:14px}
.badge{display:inline-block;background:#D4A017;color:#1A3C6E;font-weight:900;padding:4px 14px;border-radius:20px;margin-bottom:8px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0;font-size:12px}
.total{font-size:22px;font-weight:900;color:#1A3C6E;text-align:center;margin:18px 0}
</style></head><body>
<div class="hdr"><div style="font-size:17px;font-weight:900;color:#1A3C6E">Baweja Multispeciality Hospital</div><div style="font-size:11px;color:#666">Payment acknowledgement</div>
<div class="badge">RECEIVED</div></div>
<div class="grid"><div><strong>Patient</strong><br>${txn.patient || ''}</div><div><strong>BMSH ID</strong><br><span style="font-family:monospace">${txn.bmhId || ''}</span></div>
<div><strong>Mode</strong><br>${txn.mode || 'Cash'}</div><div><strong>Date / time</strong><br>${today} ${time}</div>
<div style="grid-column:1/-1"><strong>Ref / UTR / Cheque</strong><br>${ref || '—'}</div></div>
<div class="total">₹${amt.toLocaleString('en-IN')}</div>
<div style="text-align:center;font-size:10.5px;color:#888">This is a system-generated acknowledgement of payment.</div>
<script>window.onload=function(){window.print()}<\/script>
</body></html>`;
  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
}
function bmhRecordPatientPayment() {
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
  if (!bmhId) { showToast('Select a patient', 'w'); return; }
  const amt = parseFloat(document.getElementById('bmh-pay-amt')?.value || '0');
  if (!(amt > 0)) { showToast('Enter amount', 'w'); return; }
  const mode = document.getElementById('bmh-pay-mode')?.value || 'Cash';
  const ref = document.getElementById('bmh-pay-ref')?.value?.trim() || '';
  const insName = document.getElementById('bmh-pay-insurer')?.value?.trim() || '';
  const policy = document.getElementById('bmh-pay-policy')?.value?.trim() || '';
  const insurerDue = Math.max(0, Number(document.getElementById('bmh-pay-insurer-due')?.value || 0));
  const pt = PATIENTS.find(p => p.bmhId === bmhId);
  const txnId = 'TXN' + Date.now();
  const txn = { id: txnId, patient: pt?.name || bmhId, bmhId, service: 'Billing payment', amount: amt, mode, collected: true, paymentRef: ref, ins: insName, policy, dept: pt?.dept || 'ophtho', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), date: new Date().toISOString(), centre: pt?.centre || CURRENT_USER?.centre || 'CHD', createdBy: CURRENT_USER?.name || 'Billing' };
  TRANSACTIONS.push(txn);
  saveTransactionToFirebase && saveTransactionToFirebase(txn);
  if (insurerDue > 0) {
    const existing = (PAY_REQUESTS || []).find(r => r.bmhId === bmhId && r.status === 'pending' && /Insurance|TPA|PMJAY|CGHS|ECHS/i.test(String(r.mode || '')));
    if (existing) {
      existing.amount = insurerDue;
      existing.mode = mode;
      existing.ins = insName || existing.ins || mode;
      existing.policy = policy || existing.policy || '';
      existing.date = new Date().toISOString();
      fbUpdate && fbUpdate('payRequests/' + existing.id, { amount: existing.amount, mode: existing.mode, ins: existing.ins, policy: existing.policy, date: existing.date });
    } else {
      const prIns = { id:'PR' + Date.now(), patient: pt?.name || bmhId, bmhId, for:'Insurance / TPA due', amount: insurerDue, status:'pending', from:'Billing', dept: pt?.dept || 'ophtho', centre: pt?.centre || CURRENT_USER?.centre || 'CHD', mode, ins: insName || mode, policy, date:new Date().toISOString() };
      PAY_REQUESTS.push(prIns);
      fbSet && fbSet('payRequests/' + prIns.id, prIns);
    }
  }
  const updatedDue = bmhSyncPatientRunningBalance(bmhId);
  if (pt) pt.balance = updatedDue;
  bmhAppendLedger({ date: new Date().toISOString(), type: 'Receipt', narration: 'Patient payment (' + mode + ')', dr: 0, cr: amt, party: pt?.name || bmhId, ref: ref || mode });
  saveBmhFinancials();
  const pi = document.getElementById('bmh-pay-amt'); if (pi) pi.value = '';
  const pr = document.getElementById('bmh-pay-ref'); if (pr) pr.value = '';
  const pin = document.getElementById('bmh-pay-insurer'); if (pin) pin.value = '';
  const ppo = document.getElementById('bmh-pay-policy'); if (ppo) ppo.value = '';
  const pdu = document.getElementById('bmh-pay-insurer-due'); if (pdu) pdu.value = '';
  const tog = document.getElementById('bmh-pay-received-toggle'); if (tog) tog.checked = false;
  bmhTogglePaymentForm(false);
  showToast('Payment saved ✓', 's');
  renderBillingPage();
  renderDashboard && renderDashboard();
  printBmhPaymentAck(Object.assign({}, txn, { ref }));
}
function bmhToggleBillingInsuranceFields() {
  const mode = document.getElementById('bmh-pay-mode')?.value || 'Cash';
  const wrap = document.getElementById('bmh-pay-insurance-fields');
  if (!wrap) return;
  wrap.style.display = /Insurance|TPA|PMJAY|CGHS|ECHS/i.test(mode) ? 'grid' : 'none';
}
function bmhUseInventoryItemForPatient(bmhId, item, opts) {
  if (!bmhId || !item) return;
  const qty = Math.max(1, Number(opts?.qty) || 1);
  const descSuffix = opts?.descSuffix ? ' ' + opts.descSuffix : '';
  const usageMode = opts?.mode || 'bill';
  const patient = PATIENTS.find(x => x.bmhId === bmhId);
  if ((item.stock || 0) >= qty) item.stock -= qty;
  else {
    showToast('Stock is lower than requested quantity — recording bill line anyway', 'w');
    item.stock = Math.max(0, Number(item.stock) || 0);
  }
  const mrp = Number(item.mrp) || 0;
  const cat = /IOL|IVT|Eye|Drop|IV|Injection|Glove|Cannula|Syringe/i.test((item.cat || '') + item.name) ? 'pharmacy' : 'consumable';
  if (usageMode !== 'consume') {
    addBmhPatientCharge(bmhId, {
      id: 'inv' + Date.now() + Math.random().toString(36).slice(2, 5),
      cat,
      desc: item.name + descSuffix,
      qty,
      rate: mrp,
      amount: mrp * qty,
      source: 'inventory',
      ref: item.barcode,
      ts: new Date().toISOString()
    });
    AUTO_BILL.push({ item: item.name, mrp, qty, patient: bmhId, time: new Date().toLocaleTimeString() });
  }
  window.BMH_INVENTORY_USAGE.push({
    id:'IU' + Date.now() + Math.random().toString(36).slice(2, 5),
    bmhId,
    patientName: patient?.name || bmhId,
    dept: opts?.dept || patient?.dept || 'general',
    itemName: item.name,
    barcode: item.barcode,
    qty,
    mrp,
    cost: Number(item.cost || 0),
    mode: usageMode,
    ts: bmhNowISO()
  });
  saveBmhFinancials();
  saveInventoryStockToStorage();
  renderStockList();
  renderAutoBillLog();
  renderInventoryUsageLog();
  renderBillingPageIfActive && renderBillingPageIfActive();
}
function bmhGeneratePurchaseOrderDraft() {
  const low = INVENTORY.filter(i => i.stock <= i.min);
  window._bmhPO_DRAFT = 'PURCHASE ORDER — Baweja Multispeciality Hospital\nDate: ' + new Date().toLocaleString('en-IN') + '\n\nPlease supply:\n\n' + low.map((i, n) => `${n + 1}. ${i.name} — barcode ${i.barcode} — order qty suggestion: ${Math.max(i.min * 2 - i.stock, i.min)} (current ${i.stock}, min ${i.min})`).join('\n') + '\n\nAuthorised by: _______________\n';
  const el = document.getElementById('dash-admin-po-preview');
  if (el) el.innerHTML = '<pre style="white-space:pre-wrap;font-size:11px;margin:0">' + window._bmhPO_DRAFT.replace(/</g, '&lt;') + '</pre>';
  if (!low.length) showToast('No low-stock items — PO is empty', 'i');
}
function bmhPrintPurchaseOrder() {
  if (!window._bmhPO_DRAFT) bmhGeneratePurchaseOrderDraft();
  if (!confirm('Print suggested purchase order now?')) return;
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:system-ui;padding:10mm;font-size:12px} @page{margin:8mm}</style></head><body><pre style="white-space:pre-wrap">${window._bmhPO_DRAFT.replace(/</g, '&lt;')}</pre><script>window.onload=function(){window.print()}<\/script></body></html>`;
  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
}
function bmhOcrApplyToStockIn() {
  const ta = document.getElementById('inv-ocr-text')?.value?.trim().split('\n')[0]?.trim();
  if (!ta) { showToast('Paste OCR text first', 'w'); return; }
  const inp = document.getElementById('bc-in'); if (inp) inp.value = ta;
  processBC('in', ta);
}
function bmhOcrApplyToPatientUse() {
  const ta = document.getElementById('inv-ocr-text')?.value?.trim().split('\n')[0]?.trim();
  if (!ta) { showToast('Paste OCR text first', 'w'); return; }
  const inp = document.getElementById('bc-use'); if (inp) inp.value = ta;
  processBC('use', ta);
}
function renderBillingPage() {
  loadBmhFinancials();
  const dateEl = document.getElementById('bmh-bill-date-filter');
  if (dateEl && !dateEl.value) dateEl.value = new Date().toISOString().slice(0, 10);
  const scopeEl = document.getElementById('bmh-bill-patient-scope');
  if (scopeEl && !scopeEl.dataset.initialized) {
    scopeEl.value = window._bmhBillFocusPatient ? 'focus' : 'today';
    scopeEl.dataset.initialized = '1';
  }
  const candidatePatients = bmhGetBillPatientsForView();
  const sel = document.getElementById('bmh-bill-pt-select');
  if (sel) {
    sel.innerHTML = candidatePatients.map(p => `<option value="${p.bmhId}">${p.name} — ${p.bmhId}</option>`).join('');
    if (window._bmhSelectedBillPatient && candidatePatients.some(p => p.bmhId === window._bmhSelectedBillPatient)) sel.value = window._bmhSelectedBillPatient;
    else if (candidatePatients.length) { sel.selectedIndex = 0; window._bmhSelectedBillPatient = sel.value; }
  }
  const ps = document.getElementById('bmh-print-size'); if (ps) { ps.value = window.BMH_BILL_PRINT_SIZE || 'A4'; ps.onchange = function () { window.BMH_BILL_PRINT_SIZE = this.value; }; }
  bmhRenderBillPatientList();
  bmhRenderQuickChargePanels();
  bmhSelectBillPatient(document.getElementById('bmh-bill-pt-select')?.value || candidatePatients[0]?.bmhId);
  bmhRenderVendorTables();
  bmhRenderExpenseList();
  bmhRenderLedgerBody();
  bmhRenderBillingVendorSummary();
  const labSel = document.getElementById('lab-pt-sel');
  if (labSel) labSel.innerHTML = PATIENTS.map(p => `<option value="${p.bmhId}">${p.name} — ${p.bmhId}</option>`).join('');
  const usel = document.getElementById('use-pt');
  if (usel) usel.innerHTML = PATIENTS.map(p => `<option value="${p.bmhId}">${p.name} — ${p.bmhId}</option>`).join('');
}
function renderBillingPageIfActive() {
  const pg = document.getElementById('pg-billing');
  if (pg && pg.classList.contains('active')) renderBillingPage();
}

function renderBillItems() {
  const el = document.getElementById('bill-items-list');
  if (el) {
    const bmhId = document.getElementById('bmh-bill-pt-select')?.value;
    const lines = bmhId ? (window.BMH_PATIENT_CHARGES[bmhId] || []) : [];
    el.innerHTML = lines.length ? lines.map(l => `<div style="font-size:12px;padding:4px 0">${l.desc} — ₹${(Number(l.amount)||0).toLocaleString('en-IN')}</div>`).join('') : '<div style="color:var(--g1);font-size:12px">Use Billing page for line items</div>';
  }
  bmhUpdateBillTotals();
}
function addBillItem() { bmhAddManualBillLine(); }
function removeBillItem() { showToast('Remove lines from Billing screen ✓', 'i'); }
function scanToBill() {
  const inp = document.getElementById('bill-scan-input'); if (!inp) return;
  const code = inp.value.trim(); if (!code) { showToast('Enter barcode or item name', 'w'); return; }
  const bmhId = document.getElementById('bmh-bill-pt-select')?.value || PATIENTS[0]?.bmhId;
  if (!bmhId) { showToast('No patient', 'w'); return; }
  const item = BCMAP[code] || BCMAP[code.toLowerCase().substring(0, 15)];
  const name = item ? item.name : code;
  const mrp = item ? item.mrp : parseFloat(prompt('Enter MRP for this item', '0') || '0') || 0;
  if (item) {
    bmhUseInventoryItemForPatient(bmhId, item, { descSuffix: '(billing scan)' });
  } else {
    const cat = /IOL|IVT|Eye|Drop/i.test(name) ? 'pharmacy' : 'consumable';
    addBmhPatientCharge(bmhId, { id: 'sb' + Date.now(), cat, desc: name + ' (billing scan)', qty: 1, rate: mrp, amount: mrp, source: 'billing', ts: new Date().toISOString() });
    AUTO_BILL.push({ item: name, mrp, patient: bmhId, time: new Date().toLocaleTimeString() });
    renderAutoBillLog();
    bmhRenderBillLines();
    bmhUpdateBillTotals();
    bmhRenderBillPatientList();
  }
  const log = document.getElementById('bill-scan-log');
  if (log) { const d = document.createElement('div'); d.style.cssText = 'display:flex;align-items:center;gap:8px;padding:7px 9px;background:var(--green-lt);border-radius:8px;margin-bottom:5px;font-size:12px;border-left:3px solid var(--green)'; d.innerHTML = `<span>📦</span><span style="flex:1;font-weight:700">${name}</span><span style="font-weight:900;color:var(--green)">₹${mrp.toLocaleString('en-IN')}</span>`; log.prepend(d); }
  showToast(`📦 ${name} → bill ✓`, 's');
  inp.value = '';
}
function printReceipt() { printBmhPatientBill(); }

// ═══════════════════════════════════════
// LAB INIT (from v9)
// ═══════════════════════════════════════
function initLab() {
  const today = new Date().toLocaleDateString('en-IN'); const el=document.getElementById('lab-date'); if(el)el.textContent=today;
  const sel=document.getElementById('lab-pt-sel'); if(sel)sel.innerHTML=PATIENTS.map(p=>`<option>${p.name} — ${p.bmhId}</option>`).join('');
  ['haem','bio','diab','thyroid'].forEach(panel=>{ const el2=document.getElementById('lab-'+panel); if(!el2)return; el2.innerHTML=LAB_PANELS[panel].map(t=>{const hasVal=t.v!==''; const v=parseFloat(t.v); const flag=hasVal?(v<t.lo?'LOW':v>t.hi?'HIGH':'Normal'):'—'; const cls=flag==='HIGH'?'val-high':flag==='LOW'?'val-low':flag==='Normal'?'val-ok':''; return `<div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 70px;gap:6px;padding:8px 10px;background:${flag==='HIGH'||flag==='LOW'?'var(--red-lt)':flag==='Normal'?'var(--green-lt)':'var(--g6)'};border-radius:8px;margin-bottom:5px;align-items:center"><span style="font-size:12px;font-weight:700">${t.n}</span><input type="number" value="${t.v}" class="lab-val-inp ${hasVal?cls:''}" placeholder="—" oninput="checkLabVal(this,${t.lo},${t.hi})"><span style="font-size:11px;color:var(--g1)">${t.u}</span><span style="font-size:11px;color:var(--g1)">${t.lo}–${t.hi}</span><span class="badge ${flag==='HIGH'||flag==='LOW'?'bd-red':flag==='Normal'?'bd-green':'bd-gray'}">${flag}</span></div>`;}).join(''); });
}
function checkLabVal(inp,lo,hi){const v=parseFloat(inp.value)||0;inp.className='lab-val-inp '+(v<lo?'val-low':v>hi?'val-high':'val-ok');}


// ═══════════════════════════════════════
// INVENTORY (from v9)
// ═══════════════════════════════════════
function initInventory() {
  loadInventoryStockFromStorage();
  loadBmhFinancials();
  renderStockList();
  renderAutoBillLog();
  bmhRenderVendorTables();
  renderInventoryPurchaseLog();
  renderInventoryUsageLog();
  const s = document.getElementById('use-pt');
  if (s) {
    s.innerHTML = PATIENTS.map(p => `<option value="${p.bmhId}">${p.name} — ${p.bmhId}</option>`).join('');
    if (s.value) {
      const deptEl = document.getElementById('inv-use-dept');
      if (deptEl) deptEl.value = bmhDefaultInventoryDeptForPatient(s.value);
      s.onchange = function () {
        const deptPick = document.getElementById('inv-use-dept');
        if (deptPick) deptPick.value = bmhDefaultInventoryDeptForPatient(this.value);
      };
    }
  }
  const ilc = document.getElementById('inv-low-cnt');
  if (ilc) ilc.textContent = INVENTORY.filter(i => i.stock <= i.min).length;
}
function renderStockList() {
  const el=document.getElementById('inv-stock-list');if(!el)return;
  el.innerHTML=INVENTORY.map(i=>{
    const pct=Math.min(100,(i.stock/(Math.max(1, i.min)*3))*100);
    const cls=i.stock<=2?'critical':i.stock<=i.min?'low':'';
    return `<div class="inv-row ${cls}">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:800">${i.name}</div>
        <div style="font-family:var(--mono);font-size:9px;color:var(--g1)">${i.barcode} · ${i.cat} · ${bmhDeptLabel(i.dept || 'general')} · Exp:${i.exp || '—'}</div>
        <div class="sb-bar"><div class="sb-fill" style="width:${pct}%;background:${i.stock<=2?'var(--red)':i.stock<=i.min?'var(--orange)':'var(--green)'}"></div></div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:17px;font-weight:900;color:${i.stock<=2?'var(--red)':i.stock<=i.min?'var(--orange)':'var(--green)'}">${i.stock}</div>
        <div style="font-size:11px;font-weight:700;color:var(--g1)">MRP ₹${Number(i.mrp||0).toLocaleString('en-IN')}</div>
        <div style="font-size:10px;color:var(--g1)">Cost ₹${Number(i.cost||0).toLocaleString('en-IN')}</div>
      </div>
    </div>`;
  }).join('');
}
function scanBC(mode) { const demo=INVENTORY.filter(i=>i.stock>0)[Math.floor(Math.random()*5)]; const inp=mode==='in'?document.getElementById('bc-in'):document.getElementById('bc-use'); if(inp)inp.value=demo.barcode; showToast('📷 Barcode scanned: '+demo.barcode,'i'); setTimeout(()=>processBC(mode,demo.barcode),400); }

function renderAutoBillLog(){const el=document.getElementById('auto-bill-log');if(!el)return;if(!AUTO_BILL.length){el.innerHTML='<div style="padding:12px;text-align:center;color:var(--g1);font-size:12px">No items billed yet</div>';return;}el.innerHTML=AUTO_BILL.slice().reverse().map(b=>{const pid=String(b.patient||'');return `<div style="display:flex;align-items:center;gap:9px;padding:9px;background:var(--green-lt);border-radius:8px;margin-bottom:6px;font-size:12px;border-left:3px solid var(--green)"><span style="font-size:14px">📦</span><div style="flex:1"><div style="font-weight:800">${b.item}</div><div style="font-family:var(--mono);font-size:9px;color:var(--bmh-teal)">${pid.slice(0,22)}</div></div><div style="text-align:right"><div style="font-weight:900;color:var(--green)">₹${(b.mrp||0).toLocaleString('en-IN')}</div><div style="font-size:9.5px;color:var(--g1)">${b.time||''}</div></div></div>`;}).join('');}
function renderInventoryPurchaseLog() {
  const el = document.getElementById('inv-purchase-log');
  if (!el) return;
  const rows = (window.BMH_PURCHASES || []).slice().reverse();
  el.innerHTML = rows.length ? rows.map(r => `<div style="padding:10px 0;border-bottom:1px solid var(--g5);font-size:12px">
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
      <div style="font-weight:900">${r.itemName}</div>
      <div style="font-weight:900;color:var(--bmh-blue)">+${r.qty} · ₹${Number(r.totalCost||0).toLocaleString('en-IN')}</div>
    </div>
    <div style="font-size:10px;color:var(--g1);margin-top:4px">${bmhDeptLabel(r.dept)} · ${r.vendor || 'No vendor'} · Inv ${r.invoiceNo || '—'} · ${new Date(r.ts).toLocaleString('en-IN')}</div>
    <div style="font-size:10px;color:var(--g1);margin-top:2px">${r.billFile?.name ? 'Bill: ' + r.billFile.name + ' · ' : ''}Barcode ${r.barcode || '—'} · Cost ₹${Number(r.cost || 0).toLocaleString('en-IN')} · MRP ₹${Number(r.mrp || 0).toLocaleString('en-IN')}</div>
  </div>`).join('') : '<div style="padding:12px;color:var(--g1);font-size:12px">No purchase intake recorded yet.</div>';
}
function renderInventoryUsageLog() {
  const el = document.getElementById('inv-usage-log');
  if (!el) return;
  const rows = (window.BMH_INVENTORY_USAGE || []).slice().reverse();
  el.innerHTML = rows.length ? rows.map(r => `<div style="padding:10px 0;border-bottom:1px solid var(--g5);font-size:12px">
    <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
      <div><strong>${r.itemName}</strong> <span style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal)">${r.bmhId || ''}</span></div>
      <div style="font-weight:900;color:${r.mode === 'bill' ? '#1a8c3c' : '#8a4200'}">${r.mode === 'bill' ? 'Billed' : 'Consumed'} · Qty ${r.qty}</div>
    </div>
    <div style="font-size:10px;color:var(--g1);margin-top:4px">${bmhDeptLabel(r.dept)} · ${r.patientName || 'Ward stock'} · ${new Date(r.ts).toLocaleString('en-IN')}</div>
  </div>`).join('') : '<div style="padding:12px;color:var(--g1);font-size:12px">No patient-linked usage recorded yet.</div>';
}

// ═══════════════════════════════════════
// TPA
// ═══════════════════════════════════════
function calcPend(inp){const row=inp.closest('tr');if(!row)return;const inputs=row.querySelectorAll('input[type=number]');const approved=parseFloat(inputs[1]?.value||0),received=parseFloat(inputs[2]?.value||0);const cell=row.querySelector('.tpa-p');if(cell){const pend=Math.max(0,approved-received);cell.innerHTML=`<span style="font-weight:900;color:${pend<=0?'var(--green)':'var(--orange)'}">₹${pend.toLocaleString('en-IN')}</span>`;}}

// ═══════════════════════════════════════
// CENTRES CHARGES
// ═══════════════════════════════════════
function renderCentresCharges(){
  const el=document.getElementById('centres-charge-list');if(!el)return;
  el.innerHTML=`<div style="display:grid;grid-template-columns:1fr 100px 100px 50px;gap:4px;padding:5px 11px;background:var(--g6);font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;border-radius:6px 6px 0 0">
    <span>Procedure / Service</span><span style="text-align:center">CHD (₹)</span><span style="text-align:center">RPR (₹)</span><span></span>
  </div>`+
  Object.entries(CENTRE_CHARGES.CHD).map(([k,v])=>`
    <div style="display:grid;grid-template-columns:1fr 100px 100px 50px;gap:4px;padding:5px 11px;border-bottom:1px solid var(--g5);font-size:12px;align-items:center">
      <span style="font-weight:600">${k}</span>
      <input type="number" value="${v}" style="text-align:right;font-weight:800;color:var(--bmh-blue);font-size:12px;border:1px solid var(--g4);border-radius:4px;padding:2px 5px;width:100%" onchange="CENTRE_CHARGES.CHD['${k}']=+this.value;saveChargesToFirebase()">
      <input type="number" value="${CENTRE_CHARGES.RPR[k]||v}" style="text-align:right;font-weight:800;color:#8a4200;font-size:12px;border:1px solid var(--g4);border-radius:4px;padding:2px 5px;width:100%" onchange="CENTRE_CHARGES.RPR['${k}']=+this.value;saveChargesToFirebase()">
      <button onclick="deleteCharge('${k}')" style="background:none;border:none;color:var(--red);font-size:14px;cursor:pointer;padding:0">✕</button>
    </div>`).join('')+
  `<div style="padding:8px 11px;display:flex;gap:6px;flex-wrap:wrap">
    <input type="text" id="new-charge-name" placeholder="New service name…" style="flex:2;min-width:140px;font-size:12px">
    <input type="number" id="new-charge-chd" placeholder="CHD ₹" style="width:90px;font-size:12px">
    <input type="number" id="new-charge-rpr" placeholder="RPR ₹" style="width:90px;font-size:12px">
    <button class="btn btn-gold btn-sm" onclick="addNewCharge()">+ Add</button>
  </div>`;
}
function deleteCharge(name){
  delete CENTRE_CHARGES.CHD[name]; delete CENTRE_CHARGES.RPR[name];
  saveChargesToFirebase(); renderCentresCharges();
}
function addNewCharge(){
  const n=document.getElementById('new-charge-name')?.value?.trim();
  const c=parseFloat(document.getElementById('new-charge-chd')?.value||0);
  const r=parseFloat(document.getElementById('new-charge-rpr')?.value||0);
  if(!n){showToast('Enter service name','w');return;}
  CENTRE_CHARGES.CHD[n]=c; CENTRE_CHARGES.RPR[n]=r||c;
  document.getElementById('new-charge-name').value='';
  document.getElementById('new-charge-chd').value='';
  document.getElementById('new-charge-rpr').value='';
  saveChargesToFirebase(); renderCentresCharges();
  showToast('Charge added ✓','s');
}
function saveChargesToLocalStorage() {
  try {
    localStorage.setItem('bmh_charges_schedule', JSON.stringify(CHARGES_DATA));
    localStorage.setItem('bmh_centre_charges', JSON.stringify(CENTRE_CHARGES));
  } catch (e) { /* quota */ }
}
function loadChargesFromLocalStorage() {
  try {
    const sch = localStorage.getItem('bmh_charges_schedule');
    if (sch) {
      const arr = JSON.parse(sch);
      if (Array.isArray(arr) && arr.length) {
        CHARGES_DATA.length = 0;
        arr.forEach(row => CHARGES_DATA.push(row));
        CHARGES_DATA.forEach(c => {
          CENTRE_CHARGES.CHD[c.name] = c.chd;
          CENTRE_CHARGES.RPR[c.name] = c.rpr;
        });
      }
    }
    const cc = localStorage.getItem('bmh_centre_charges');
    if (cc) {
      const d = JSON.parse(cc);
      if (d && d.CHD) Object.assign(CENTRE_CHARGES.CHD, d.CHD);
      if (d && d.RPR) Object.assign(CENTRE_CHARGES.RPR, d.RPR);
    }
  } catch (e) { /* noop */ }
}
function saveChargesToFirebase(){
  saveChargesToLocalStorage();
  if(!window.FBDB) return;
  window.FBDB.ref('centreCharges').set(CENTRE_CHARGES).catch(()=>{});
  window.FBDB.ref('chargesSchedule').set(CHARGES_DATA).catch(()=>{});
}
function loadChargesFromFirebase(){
  loadChargesFromLocalStorage();
  renderChargesList && renderChargesList();
  renderCentresCharges && renderCentresCharges();
  syncReceptionConsultationFee && syncReceptionConsultationFee();
  if(!window.FBDB) return;
  window.FBDB.ref('centreCharges').once('value').then(snap=>{
    const d=snap.val(); if(!d) return;
    if(d.CHD) Object.assign(CENTRE_CHARGES.CHD, d.CHD);
    if(d.RPR) Object.assign(CENTRE_CHARGES.RPR, d.RPR);
    saveChargesToLocalStorage();
    renderCentresCharges && renderCentresCharges();
    syncReceptionConsultationFee && syncReceptionConsultationFee();
  }).catch(()=>{});
  window.FBDB.ref('chargesSchedule').once('value').then(snap => {
    const arr = snap.val();
    if (!Array.isArray(arr) || !arr.length) return;
    CHARGES_DATA.length = 0;
    arr.forEach(row => CHARGES_DATA.push(row));
    CHARGES_DATA.forEach(c => {
      CENTRE_CHARGES.CHD[c.name] = c.chd;
      CENTRE_CHARGES.RPR[c.name] = c.rpr;
    });
    saveChargesToLocalStorage();
    renderChargesList && renderChargesList();
    renderCentresCharges && renderCentresCharges();
    syncReceptionConsultationFee && syncReceptionConsultationFee();
  }).catch(()=>{});
}

// ── Print letterhead / footer (Settings → Hospital) — used on prescription printouts
function persistPrintLetterheadLocalOnly() {
  try {
    localStorage.setItem('bmh_print_letterhead', JSON.stringify({
      header: window.PRINT_HEADER_SRC || '',
      footer: window.PRINT_FOOTER_SRC || ''
    }));
  } catch (e) { /* quota */ }
}
function updatePrintLetterheadPreviews() {
  const h = document.getElementById('print-header-preview');
  const f = document.getElementById('print-footer-preview');
  if (h) {
    if (window.PRINT_HEADER_SRC) { h.src = window.PRINT_HEADER_SRC; h.style.display = 'block'; }
    else { h.removeAttribute('src'); h.style.display = 'none'; }
  }
  if (f) {
    if (window.PRINT_FOOTER_SRC) { f.src = window.PRINT_FOOTER_SRC; f.style.display = 'block'; }
    else { f.removeAttribute('src'); f.style.display = 'none'; }
  }
}
function onPickPrintHeader(inp) {
  const file = inp.files && inp.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    window.PRINT_HEADER_SRC = e.target.result;
    persistPrintLetterheadLocalOnly();
    if (window.FBDB) window.FBDB.ref('printLetterhead').set({ header: window.PRINT_HEADER_SRC, footer: window.PRINT_FOOTER_SRC || '' }).catch(function () {});
    updatePrintLetterheadPreviews();
    showToast('Header image saved ✓', 's');
    inp.value = '';
  };
  reader.readAsDataURL(file);
}
function onPickPrintFooter(inp) {
  const file = inp.files && inp.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    window.PRINT_FOOTER_SRC = e.target.result;
    persistPrintLetterheadLocalOnly();
    if (window.FBDB) window.FBDB.ref('printLetterhead').set({ header: window.PRINT_HEADER_SRC || '', footer: window.PRINT_FOOTER_SRC }).catch(function () {});
    updatePrintLetterheadPreviews();
    showToast('Footer image saved ✓', 's');
    inp.value = '';
  };
  reader.readAsDataURL(file);
}
function clearPrintHeader() {
  window.PRINT_HEADER_SRC = '';
  persistPrintLetterheadLocalOnly();
  if (window.FBDB) window.FBDB.ref('printLetterhead').set({ header: '', footer: window.PRINT_FOOTER_SRC || '' }).catch(function () {});
  updatePrintLetterheadPreviews();
  showToast('Header removed', 'i');
}
function clearPrintFooter() {
  window.PRINT_FOOTER_SRC = '';
  persistPrintLetterheadLocalOnly();
  if (window.FBDB) window.FBDB.ref('printLetterhead').set({ header: window.PRINT_HEADER_SRC || '', footer: '' }).catch(function () {});
  updatePrintLetterheadPreviews();
  showToast('Footer removed', 'i');
}
function loadPrintLetterheadFromStorage() {
  try {
    const ls = localStorage.getItem('bmh_print_letterhead');
    if (ls) {
      const o = JSON.parse(ls);
      if (o.header) window.PRINT_HEADER_SRC = o.header;
      if (o.footer) window.PRINT_FOOTER_SRC = o.footer;
    }
  } catch (e) { /* noop */ }
  if (!window.FBDB) {
    updatePrintLetterheadPreviews();
    return;
  }
  window.FBDB.ref('printLetterhead').once('value').then(function (snap) {
    const v = snap.val();
    if (v) {
      if (v.header) window.PRINT_HEADER_SRC = v.header;
      if (v.footer) window.PRINT_FOOTER_SRC = v.footer;
      persistPrintLetterheadLocalOnly();
    }
    updatePrintLetterheadPreviews();
  }).catch(function () { updatePrintLetterheadPreviews(); });
}

// ═══════════════════════════════════════
// CROSS REFER
// ═══════════════════════════════════════
// ── Cross-refer log ───────────────────────────────
if(!window.XREF_LOG) window.XREF_LOG = [];

function openXRefModal(bmhId) {
  const sel = document.getElementById('xref-pt-sel');
  if(sel) {
    sel.innerHTML = PATIENTS.filter(p=>p.status==='waiting'||p.dilated||p.seen)
      .map(p=>`<option value="${p.bmhId}" ${p.bmhId===bmhId?'selected':''}>${p.name} · ${p.bmhId}</option>`).join('');
  }
  openM('m-xref');
}

function doXRef(){
  const sel = document.getElementById('xref-pt-sel');
  const bmhId = sel?.value || '';
  const p = PATIENTS.find(x=>x.bmhId===bmhId);
  const ptName = p?.name || sel?.options[sel.selectedIndex]?.text || 'Patient';
  const toVal  = document.getElementById('xref-to')?.value || '';
  const toDept = {
    'Dr. Geeta Baweja — OBG':'obg','Dr. Namrata Baweja — OBG':'obg',
    'Dr. Tarun Baweja — Psychiatry':'psych','Dr. Pooja Baweja — Skin':'skin',
    'Dr. Varun Baweja — Ophthalmology':'ophtho'
  }[toVal] || 'ophtho';
  const toDoctor = toVal.split(' — ')[0] || toVal;
  const fee  = document.getElementById('xref-fee-sel')?.value === 'yes';
  const reason = document.getElementById('xref-reason')?.value || '';
  const now  = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});

  // Build log entry
  const xref = {
    id:'XR'+Date.now(), bmhId, ptName, toDoctor, toDept,
    fromDept: p?.dept || CURRENT_USER?.dept || '',
    fee, paid: !fee, reason, time: now,
    createdBy: CURRENT_USER?.name || '—',
    createdAt: new Date().toISOString()
  };
  if(!window.XREF_LOG) window.XREF_LOG = [];
  window.XREF_LOG.unshift(xref);

  // Route patient to referred dept queue
  if(p) {
    p.xrefTo = toDept;
    p.xrefDoctor = toDoctor;
    // If free → immediately put in referred dept queue
    if(!fee) {
      p.dept = toDept;
      p.doctor = toDoctor;
      p.status = 'waiting';
      showToast(`↔️ ${ptName} sent directly to ${toDoctor}'s queue ✓`,'s');
    } else {
      // Paid → send to reception as pulsating payment request
      const xrFee = parseInt(document.getElementById('xref-fee-amt')?.value||'800')||800;
      const xrPR = {
        id:'PR'+Date.now(), patient:ptName, bmhId,
        for:`Cross-refer to ${toDoctor}`, amount:xrFee, status:'pending',
        from: CURRENT_USER?.name||'Doctor',
        dept: p?.dept || toDept,
        date: new Date().toISOString(),
        xref: true, xrefDept: toDept, xrefDoctor: toDoctor
      };
      PAY_REQUESTS.push(xrPR);
      fbSet&&fbSet('payRequests/'+xrPR.id, xrPR);
      showToast(`↔️ ${ptName} → ${toDoctor} — Payment request sent to Reception 💳`,'s');
    }
  }

  // Save to Firebase
  fbPush('crossReferrals', xref).catch(e=>console.warn('XRef save error:',e));

  closeM('m-xref');
  renderDocQueue && renderDocQueue();
  renderDashboard && renderDashboard();
  renderReceptionPage && renderReceptionPage();
}

function crossRefer(withFee){ openXRefModal(); if(withFee){const s=document.getElementById('xref-fee-sel');if(s)s.value='yes';} }

// ── IPD from queue icon ────────────────────────────
function openIPDFromQueue(bmhId) {
  const sel = document.getElementById('ipd-pt-sel');
  if(sel) {
    sel.innerHTML = PATIENTS.map(p=>`<option value="${p.bmhId}" ${p.bmhId===bmhId?'selected':''}>${p.name} · ${p.bmhId}</option>`).join('');
  }
  openM('m-ipd-admit');
}

function openOTFromQueue(bmhId) {
  const p = PATIENTS.find(function (x) { return x.bmhId === bmhId; });
  if (!p) { showToast('Patient not found for OT', 'w'); return; }
  const today = new Date().toISOString().split('T')[0];
  const existing = OT_CASES.find(function (c) {
    const oc = normalizeOTCaseRecord(c);
    return oc.bmhId === bmhId && oc.date === today && (oc.status === 'pending' || oc.status === 'in-progress');
  });
  nav('ot', null);
  setTimeout(function () {
    openOTAddModal({ bmhId: bmhId, caseId: existing?.id || '' });
  }, 120);
  showToast(existing ? 'Loaded existing OT case for editing ✓' : 'OT case form opened for this patient ✓', 's');
}

function deleteOTCase(id) {
  const idx = OT_CASES.findIndex(function (c) { return c.id === id; });
  if (idx < 0) { showToast('OT case not found', 'w'); return; }
  const c = normalizeOTCaseRecord(OT_CASES[idx]);
  if (!confirm('Remove ' + (c.patient || 'this patient') + ' from OT list?')) return;
  OT_CASES.splice(idx, 1);
  if (activeOTCase && activeOTCase.id === id) activeOTCase = null;
  fbRemove('otCases/' + id).catch(function (e) { console.warn('OT delete error:', e); });
  renderOTListSafe && renderOTListSafe();
  const detail = document.getElementById('ot-case-detail');
  if (detail) {
    detail.innerHTML = '<div style="padding:18px;text-align:center;color:var(--g2);font-size:12px">Select an OT case to view details</div>';
  }
  showToast('Removed from OT list ✓', 's');
}
function setCurrentPatientByBmhId(bmhId) {
  const p = PATIENTS.find(function (row) { return row.bmhId === bmhId; });
  if (p) window.CURRENT_PATIENT = p;
  return p;
}
function otQuickAction(action, caseId) {
  const rawCase = OT_CASES.find(function (c) { return c.id === caseId; });
  if (!rawCase) { showToast('OT case not found', 'w'); return; }
  const c = normalizeOTCaseRecord(rawCase);
  setCurrentPatientByBmhId(c.bmhId);
  window._CONSENT_PRINT_BMH_ID = c.bmhId;
  window._CONSENT_PRINT_OT_ID = c.id;
  if (action === 'pack') return printSurgeryPackForCase(c.id);
  if (action === 'bill') {
    window._bmhBillFocusPatient = c.bmhId;
    window._bmhSelectedBillPatient = c.bmhId;
    nav('billing', null);
    setTimeout(function () { printBmhPatientBill(c.bmhId); }, 180);
    return;
  }
  if (action === 'discharge-card') {
    nav('discharge', null);
    setTimeout(function () { printDischarge(); }, 180);
    return;
  }
  if (action === 'discharge-summary') {
    safePrint(buildDischargePrintHtml());
    return;
  }
  if (action === 'ot-notes') {
    activeOTCase = c;
    openOTCase(c.id);
    setTimeout(function () { printOTNotes(); }, 120);
  }
}
function otActionIconsHtml(caseId) {
  const mk = function (title, icon, action) {
    return '<button type="button" title="' + title + '" style="background:#fff;border:1px solid var(--g4);border-radius:999px;padding:4px 8px;font-size:10px;cursor:pointer;display:inline-flex;align-items:center;gap:4px" onclick="event.stopPropagation();otQuickAction(\'' + action + '\',\'' + caseId + '\')">' + icon + '</button>';
  };
  return '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:6px">'
    + mk('Surgery Pack', '📋 Pack', 'pack')
    + mk('Bill', '🧾 Bill', 'bill')
    + mk('Discharge Card', '🪪 Card', 'discharge-card')
    + mk('Discharge Summary', '📄 Summary', 'discharge-summary')
    + mk('OT Notes', '📝 Notes', 'ot-notes')
    + '</div>';
}

function removePatientFromQueue(bmhId) {
  const p = PATIENTS.find(function (x) { return x.bmhId === bmhId; });
  if (!p) { showToast('Patient not found in queue', 'w'); return; }
  if (!confirm('Remove ' + (p.name || 'this patient') + ' from today\'s queue?')) return;
  p.status = 'removed';
  p.queueRemoved = true;
  p.queueRemovedAt = Date.now();
  p.queueRemovedBy = CURRENT_USER?.name || 'System';
  p.preRegistered = false;
  p.dilated = false;
  p.seen = false;
  fbUpdate && fbUpdate('patients/' + bmhId, {
    status: 'removed',
    queueRemoved: true,
    queueRemovedAt: p.queueRemovedAt,
    queueRemovedBy: p.queueRemovedBy,
    preRegistered: false,
    dilated: false,
    seen: false
  }).catch(function (e) { console.warn('Queue remove error:', e); });
  renderDocQueue && renderDocQueue();
  renderReceptionPage && renderReceptionPage();
  renderDashboard && renderDashboard();
  showToast('Removed from queue ✓', 's');
}

// ── Confirm IPD Admission ──────────────────────────
function confirmIPDAdmit() {
  const sel   = document.getElementById('ipd-pt-sel');
  const bmhId = sel?.value || '';
  const p     = PATIENTS.find(x=>x.bmhId===bmhId);
  if(!p) { showToast('Please select a patient','w'); return; }
  const ward   = document.getElementById('ipd-ward')?.value || '';
  const type   = document.getElementById('ipd-type')?.value || 'Surgical';
  const doctor = document.getElementById('ipd-doctor')?.value || CURRENT_USER?.name || '—';
  const room   = document.getElementById('ipd-room')?.value || '';
  const dept   = document.getElementById('ipd-dept')?.value || p.dept || 'general';
  const monitoring = document.getElementById('ipd-monitoring')?.value || '6h';
  const dx     = document.getElementById('ipd-dx')?.value || '';
  const allergies = document.getElementById('ipd-allergies')?.value || '';
  const diet = document.getElementById('ipd-diet')?.value || '';
  const notes  = document.getElementById('ipd-notes')?.value || '';
  const admittedAt = new Date().toISOString();

  const ipdEntry = {
    id:'IPD'+Date.now(), bmhId, name:p.name,
    age:p.age, sex:p.sex, dept,
    ward, type, doctor, room, dx, notes,
    color:p.color||'#1A3C6E', initials:p.initials||p.name[0]||'?',
    admittedDate: new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}),
    admittedAt,
    admittedBy: CURRENT_USER?.name||'System',
    status:'admitted',
    allergies,
    diet,
    monitoringKey: monitoring,
    monitoringLabel: ({'1h':'Hourly','2h':'Every 2 hours','4h':'Every 4 hours','6h':'Every 6 hours'})[monitoring] || 'Every 6 hours',
    monitoringPlan: ipdMonitoringSlots(monitoring, admittedAt),
    vitalSigns:[],
    vitals:{ bp:'', pulse:'', temp:'', spo2:'', rr:'', weight:p.weight || '' },
    notes:[],
    chartRows: ipdDeptTemplate(dept),
    progressNotes:[]
  };

  if(!window.IPD_PATIENTS) window.IPD_PATIENTS = [];
  // Replace if already admitted
  const idx = window.IPD_PATIENTS.findIndex(x=>x.bmhId===bmhId);
  if(idx>=0) window.IPD_PATIENTS[idx]=ipdEntry; else window.IPD_PATIENTS.push(ipdEntry);

  p.ipdAdmitted = true;
  p.status = 'ipd';
  p.dept = dept;

  // Save to Firebase
  fbSet('ipdPatients/'+ipdEntry.id, ipdEntry).catch(e=>console.warn('IPD save error:',e));
  fbPush('auditLog',{user:CURRENT_USER?.name,action:'IPD_ADMIT',patient:p.name,bmhId,at:new Date().toISOString()}).catch(()=>{});

  closeM('m-ipd-admit');
  showToast(`🛏️ ${p.name} admitted to IPD — ${ward||type} ✓`,'s');
  renderDocQueue && renderDocQueue();
  renderIPD && renderIPD();
}

// ═══════════════════════════════════════
// BROCHURES
// ═══════════════════════════════════════
const BROCHURES = [
  {id:'phaco',title:'Cataract Surgery (PMICS (Pinhole Micro Incision Cataract Surgery) + IOL)',icon:'👁️',color:'#1A3C6E',tagline:'Restore your vision with the latest micro-incision cataract surgery',steps:['Detailed pre-operative assessment & biometry','Micro-incision PMICS — Pinhole Micro Incision Cataract Surgery (no stitch surgery)','Premium foldable IOL implantation','Same-day discharge in most cases','Rapid visual recovery'],risks:'Rare risks include infection, raised eye pressure, or posterior capsule rupture (all manageable). Success rate >99%.', followup:'Review at 1 day, 1 week, 1 month, and 3 months post-surgery.',faqs:['Will I need glasses after surgery? Premium IOLs can reduce dependence on glasses.','Is the surgery painful? No — performed under topical (eye drop) anaesthesia.','How long does recovery take? Most patients see well within 24–48 hours.']},
  {id:'glaucoma',title:'Glaucoma Surgery (Trabeculectomy)',icon:'👁️',color:'#0B7B8C',tagline:'Preserve your vision from the silent thief of sight',steps:['IOP measurement & optic nerve evaluation','Trabeculectomy or minimally invasive glaucoma surgery (MIGS)','Anti-scarring agents used (Mitomycin C)','Post-op IOP monitoring & bleb management','Long-term IOP control achieved'],risks:'Risk of hypotony, infection, bleb failure. Requires strict post-op follow-up.',followup:'Review at 1 day, 1 week, 2 weeks, 1 month, 3 months.',faqs:['Can glaucoma be cured? Surgery controls IOP but does not restore lost vision.','Will I need drops after surgery? Possibly fewer drops or none after successful surgery.']},
  {id:'ivt',title:'Intravitreal Injection (Anti-VEGF)',icon:'💉',color:'#5856D6',tagline:'Protecting your retina with targeted therapy',steps:['Retinal evaluation with OCT and fluorescein angiography','Informed consent and pre-injection checklist','Eye prepared with antiseptic drops — local anaesthetic applied','Injection given in sterile OT conditions (30 seconds)','Post-injection IOP check and monitoring'],risks:'Rare risks: infection (endophthalmitis <0.05%), retinal detachment, raised IOP.',followup:'Next injection as per protocol (monthly loading, then PRN).',faqs:['How many injections will I need? Typically 3 loading doses, then as needed.','Is it painful? Mild pressure sensation only — anaesthetic drops are given.']},
  {id:'lasik',title:'LASIK Laser Eye Surgery',icon:'✨',color:'#D4A017',tagline:'See the world clearly — without glasses or contact lenses',steps:['Detailed topography, pachymetry, and eligibility assessment','Corneal flap creation (microkeratome / femtosecond laser)','Excimer laser reshaping of cornea','Flap repositioned — no sutures needed','Vision stabilises over 1–4 weeks'],risks:'Dry eyes, halos, glare (temporary). Regression possible in high powers. Flap complications rare.',followup:'Review at 1 day, 1 week, 1 month, 3 months, 1 year.',faqs:['Am I eligible for LASIK? Requires stable refraction, adequate corneal thickness.','Is LASIK permanent? Results are long-lasting; reading glasses still needed after 40.']},
  {id:'lscs',title:'Caesarean Section (LSCS)',icon:'🤰',color:'#FF2D55',tagline:'Safe delivery for mother and baby at Baweja Hospital',steps:['Pre-operative workup — blood tests, ECG, anaesthesia review','Spinal / epidural anaesthesia administered','Lower uterine segment incision — baby delivered','Uterus and abdomen closed in layers','Skin closure — absorbable sutures, waterproof dressing'],risks:'Bleeding, infection, adjacent organ injury, thromboembolism (all managed with precautions). Scar in subsequent pregnancies.',followup:'Review at 48 hours, 7 days, 6 weeks post-delivery.',faqs:['Can I have a normal delivery after LSCS? Possible in selected cases (VBAC).','When can I eat after LSCS? Liquids after 6 hours, soft diet after 12 hours.']},
];
function renderBrochures() {
  const el = document.getElementById('brochure-list'); if(!el)return;
  el.innerHTML = BROCHURES.map(b=>`
    <div style="background:#fff;border-radius:var(--r);box-shadow:var(--sh);overflow:hidden;margin-bottom:18px">
      <div style="background:linear-gradient(135deg,${b.color},${b.color}cc);padding:16px 20px;color:#fff">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
          <div style="background:rgba(255,255,255,.2);border-radius:10px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${b.icon}</div>
          <div>
            <div style="font-size:16px;font-weight:900">${b.title}</div>
            <div style="font-size:11px;opacity:.8;margin-top:3px">${b.tagline}</div>
          </div>
          <div style="margin-left:auto;background:rgba(255,255,255,.15);border-radius:8px;padding:5px 12px;font-size:10px;font-weight:800">BMH · Dr. Varun Baweja</div>
        </div>
      </div>
      <div style="padding:16px 20px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div>
            <div style="font-size:11px;font-weight:900;color:${b.color};text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;padding-bottom:4px;border-bottom:2px solid ${b.color}22">Procedure Steps</div>
            ${b.steps.map((s,i)=>`<div style="display:flex;gap:8px;padding:6px 0;border-bottom:1px solid var(--g5)"><div style="width:20px;height:20px;border-radius:50%;background:${b.color};color:#fff;font-size:10px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${i+1}</div><div style="font-size:12px;line-height:1.5">${s}</div></div>`).join('')}
          </div>
          <div>
            <div style="font-size:11px;font-weight:900;color:${b.color};text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;padding-bottom:4px;border-bottom:2px solid ${b.color}22">FAQs</div>
            ${b.faqs.map(f=>{const[q,...a]=f.split('?');return `<div style="margin-bottom:10px"><div style="font-size:11.5px;font-weight:800;color:var(--tx)">Q: ${q}?</div><div style="font-size:11px;color:var(--tx3);margin-top:2px;line-height:1.6">${a.join('?')}</div></div>`;}).join('')}
            <div style="background:var(--g6);border-radius:8px;padding:10px;margin-top:8px">
              <div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;margin-bottom:4px">Risks (Rare)</div>
              <div style="font-size:11px;color:var(--tx3)">${b.risks}</div>
            </div>
            <div style="margin-top:8px;background:var(--green-lt);border-radius:8px;padding:8px;border-left:3px solid var(--green)">
              <div style="font-size:10px;font-weight:800;color:#1a8c3c;text-transform:uppercase;margin-bottom:3px">Follow-up Schedule</div>
              <div style="font-size:11px;color:#1a8c3c">${b.followup}</div>
            </div>
          </div>
        </div>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--g5);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          <div style="font-size:11px;color:var(--g1)"><strong>Patient:</strong> Test Patient A · BMSH-000001 · <strong>Surgeon:</strong> Dr. Varun Baweja, MS (Ophth)</div>
          <div style="display:flex;gap:7px">
            <button class="btn btn-gold btn-sm" onclick="printBrochure('${b.id}')">🖨️ Print</button>
            <button class="wa-btn btn-sm" onclick="showToast('Brochure sent via WhatsApp ✓','s')">📱 WhatsApp</button>
          </div>
        </div>
      </div>
    </div>`).join('');
}
function printBrochure(id){showToast('Brochure printing ✓','s');setTimeout(()=>window.print(),300);}

// ═══════════════════════════════════════
// CASE SHEET PRINT (matching uploaded photo)
// ═══════════════════════════════════════
function printOphthoSheet() {
  const p = window.CURRENT_PATIENT || {name:'',bmhId:'',age:'',sex:'',mob:''};
  const today = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});
  const g = id => { const e=document.getElementById(id); return e?(e.value||e.textContent||''):''; };
  const cc=g('cc-text'), dur=g('dur-text');
  // VA — use ucva-od-dist/ucva-os-dist (the refraction table selects) as primary
  const vaODU=g('ucva-od-dist')||g('va-od-uc')||g('va-od-dis');
  const vaOSU=g('ucva-os-dist')||g('va-os-uc')||g('va-os-dis');
  const vaODN=g('ucva-od-near')||g('va-od-near');
  const vaOSN=g('ucva-os-near')||g('va-os-near');
  const iopNOD=g('iop-nct-od'), iopNOS=g('iop-nct-os');
  const iopGOD=g('iop-gat-od'), iopGOS=g('iop-gat-os');
  const pachyOD=g('pachy-od'), pachyOS=g('pachy-os');
  const cvOD=g('cv-od-plates'), cvOS=g('cv-os-plates');
  const cvBlOD=document.getElementById('cv-blind-od')?.checked;
  const cvBlOS=document.getElementById('cv-blind-os')?.checked;
  const cvTypeOD=g('cv-od-type'), cvTypeOS=g('cv-os-type');
  // Auto-refraction — use rf-od-sph etc (auto-refraction fields)
  const arODSph=g('ar-od-sph')||g('rf-od-sph')||'';
  const arODCyl=g('ar-od-cyl')||g('rf-od-cyl')||'';
  const arODAx =g('ar-od-ax') ||g('rf-od-ax') ||'';
  const arOSSph=g('ar-os-sph')||g('rf-os-sph')||'';
  const arOSCyl=g('ar-os-cyl')||g('rf-os-cyl')||'';
  const arOSAx =g('ar-os-ax') ||g('rf-os-ax') ||'';
  // Subjective refraction — use rf-od-sph2 etc (the "Final Rx" row)
  const srODSph=g('rf-od-sph2')||g('cc-od-sph')||g('final-rx-od-sph')||'';
  const srODCyl=g('rf-od-cyl2')||g('cc-od-cyl')||g('final-rx-od-cyl')||'';
  const srODAx =g('rf-od-ax2') ||g('cc-od-axis')||g('final-rx-od-axis')||'';
  const srOSSph=g('rf-os-sph2')||g('cc-os-sph')||g('final-rx-os-sph')||'';
  const srOSCyl=g('rf-os-cyl2')||g('cc-os-cyl')||g('final-rx-os-cyl')||'';
  const srOSAx =g('rf-os-ax2') ||g('cc-os-axis')||g('final-rx-os-axis')||'';
  const srODVA=vaODU, srOSVA=vaOSU;
  const ipd=g('ipd-val'), conv=g('convergence'), pupil=g('pupillary-rx');
  // Slit lamp findings
  const getChips = sel => [...document.querySelectorAll(sel+' .sl-chip.sel')].map(e=>e.textContent.trim()).join(', ');
  const slLids    = getChips('#oe-slitlamp');
  const diagNotes = document.querySelector('#oe-notes textarea')?.value || '';
  // Ocular health diagram field values
  const slFields = {};
  slFields.odLids    = g('oe-od-lids') || '';
  slFields.odConj    = g('oe-od-conj') || '';
  slFields.odSclera  = g('oe-od-sclera') || '';
  slFields.odCornea  = g('oe-od-cornea') || '';
  slFields.odAC      = g('oe-od-ac') || '';
  slFields.odIris    = g('oe-od-iris') || '';
  slFields.odLens    = g('oe-od-lens') || '';
  slFields.osLids    = g('oe-os-lids') || '';
  slFields.osConj    = g('oe-os-conj') || '';
  slFields.osSclera  = g('oe-os-sclera') || '';
  slFields.osCornea  = g('oe-os-cornea') || '';
  slFields.osAC      = g('oe-os-ac') || '';
  slFields.osIris    = g('oe-os-iris') || '';
  slFields.osLens    = g('oe-os-lens') || '';
  slFields.odMedia   = g('oe-od-media') || g('fund-od-media') || '';
  slFields.odCD      = g('oe-od-cd') || g('fund-od-cd') || '';
  slFields.odRimTissue = g('oe-od-rim') || '';
  slFields.odVP      = g('oe-od-vp') || '';
  slFields.odPostPole= g('oe-od-postpole') || g('fund-od-findings') || '';
  slFields.odAV      = g('oe-od-av') || '';
  slFields.odALR     = g('oe-od-alr') || '';
  slFields.odMacula  = g('oe-od-macula') || g('fund-od-macula') || '';
  slFields.odPeriph  = g('oe-od-periph') || '';
  slFields.osMedia   = g('oe-os-media') || g('fund-os-media') || '';
  slFields.osCD      = g('oe-os-cd') || g('fund-os-cd') || '';
  slFields.osRimTissue = g('oe-os-rim') || '';
  slFields.osVP      = g('oe-os-vp') || '';
  slFields.osPostPole= g('oe-os-postpole') || g('fund-os-findings') || '';
  slFields.osAV      = g('oe-os-av') || '';
  slFields.osALR     = g('oe-os-alr') || '';
  slFields.osMacula  = g('oe-os-macula') || g('fund-os-macula') || '';
  slFields.osPeriph  = g('oe-os-periph') || '';
  // Diagnosis
  const dxInputs = document.querySelectorAll('#pg-ophtho .dx-inp, #oe-dx-list .dx-inp');
  const dxList = Array.from(dxInputs).map(e=>e.value).filter(Boolean).join(', ');
  const meds = (RX_DRUGS||[]).map((d,i)=>( i+1+'. '+(d.name||d.brand||'')+' — '+(d.freq||'')+' — '+(d.dur||'')+(d.eye&&d.eye[0]?' ('+d.eye[0]+')':''))).join(', ');
  const fuDate=g('rx-fu-date');
  const fuFmt = fuDate ? new Date(fuDate).toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'}) : '';
  const docName = CURRENT_USER?.name||'Dr. Varun Baweja';
  const initials = docName.replace('Dr. ','').split(' ').map(x=>x[0]).join('').toUpperCase();
  const lhSrc = window.LH_SRC||'';
  const incVA   = document.getElementById('oe-inc-va')?.checked !== false;
  const incIOP  = document.getElementById('oe-inc-iop')?.checked !== false;
  const incRefr = document.getElementById('oe-inc-refr')?.checked !== false;
  const incDiag = document.getElementById('oe-inc-diag')?.checked !== false;
  const incRx   = document.getElementById('oe-inc-rx')?.checked !== false;
  const incProc = document.getElementById('oe-inc-proc')?.checked !== false;
  const procItems = [...document.querySelectorAll('#rx-proc-advised [data-proc-name]')].map(el=>el.getAttribute('data-proc-name')||el.textContent.trim()).filter(Boolean);
  const procsSection = procItems.length ? `<div class="btl"><span class="btlb">Procedures Advised :-</span><span class="btlv" style="font-size:9px">${procItems.join(' | ')}</span></div>` : '';

  const histRows = ['Allergy','Diabetes','Hypertension','Heart Disease','Asthma','Headache']
    .map(function(h){ return '<tr><td>'+h+'</td><td style="text-align:center">&nbsp;</td><td style="min-width:30mm">&nbsp;</td><td style="min-width:40mm">&nbsp;</td></tr>'; }).join('');

  const discRows = ''; // Replaced by new Lids/Cornea/Lens/Fundus diagram above

  const logoHtml = lhSrc ? '<img src="'+lhSrc+'" style="height:30px;width:auto" alt="Baweja">'
    : '<div style="font-size:16px;font-weight:900;color:#cc0000">BAWEJA</div><div style="font-size:8px;font-weight:700;letter-spacing:1px">MULTI SPECIALITY HOSPITAL</div>';

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:9.5px;color:#000;padding:6mm 8mm;line-height:1.3;min-height:285mm}
@page{size:A4 portrait;margin:0}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:3mm}
.title-box{border:1.5px solid #000;background:#e8e8e8;text-align:center;font-weight:900;font-size:10.5px;padding:2px 6px;margin-bottom:2mm}
.cols{display:grid;grid-template-columns:1fr 1fr;border:1px solid #000;margin-bottom:2mm}
.col-l{border-right:1px solid #000;padding:2mm}.col-r{padding:2mm}
.field-row{display:flex;gap:2px;margin-bottom:1.5px;align-items:baseline}
.lbl{font-weight:700;white-space:nowrap;min-width:70px;font-size:9px}
.val{border-bottom:1px dotted #666;flex:1;min-height:11px;font-size:9.5px;padding-bottom:1px}
.sec-title{font-weight:900;text-decoration:underline;margin:3px 0 2px;font-size:9.5px}
.ht{border-collapse:collapse;width:100%;font-size:8.5px;margin:2mm 0}
.ht td,.ht th{border:1px solid #000;padding:1px 3px;text-align:center;min-width:20px}
.ht th{background:#e0e0e0;font-weight:800}
.et{border-collapse:collapse;width:100%;font-size:8px;margin-bottom:2mm}
.et td,.et th{border:1px solid #000;padding:1px 3px;text-align:center}
.et .gh{background:#e0e0e0;font-weight:900;font-size:8px}
.pt{border-collapse:collapse;font-size:9px}
.pt td{border:1px solid #000;padding:2px 5px;min-width:20mm;min-height:10px}
.pt th{border:1px solid #000;background:#e0e0e0;font-weight:800;padding:2px 5px}
.bot{border:1px solid #000;padding:2mm 3mm;margin-bottom:2mm}
.btl{display:flex;align-items:baseline;margin-bottom:3px;gap:4px}
.btlb{font-weight:900;min-width:72px;font-size:9px}
.btlv{border-bottom:1px solid #000;flex:1;min-height:11px}
</style></head><body>
<div class="hdr"><div>${logoHtml}</div>
  <div style="text-align:right"><div style="font-size:13px;font-weight:900;letter-spacing:1px">BMHID: ${p.bmhId}</div><div style="font-size:9px;margin-top:3px">Date : ${today}</div></div>
</div>
<div class="title-box">OUT PATIENT CLINIC</div>
<div class="cols">
  <div class="col-l">
    <div class="field-row"><span class="lbl">Name</span><span class="val" style="font-weight:700">${p.name}</span></div>
    <div class="field-row"><span class="lbl">S/o, D/o, W/o</span><span class="val">${p.rel||''}</span></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:2px">
      <div class="field-row"><span class="lbl">DOB</span><span class="val">${p.dob||''}</span></div>
      <div class="field-row"><span class="lbl">Age/Sex</span><span class="val">${p.age||''}/${p.sex||''}</span></div>
    </div>
    <div class="field-row"><span class="lbl">Address</span><span class="val">${p.addr||''}</span></div>
    <div class="field-row"><span class="lbl">Mobile No.</span><span class="val">${p.mob||''}</span></div>
    <div class="field-row"><span class="lbl">Email</span><span class="val"></span></div>
    <table class="ht"><thead><tr><th>Personal History</th><th>Y/N</th><th>Duration</th><th>Drugs</th></tr></thead>
    <tbody>${histRows}</tbody></table>
    <div style="margin-top:2mm"><div class="sec-title">OTHER SYSTEMICS HISTORY</div><div style="border:1px solid #ccc;min-height:10mm;padding:1mm"></div></div>
    <div style="margin-top:2mm"><div class="sec-title">FAMILY HISTORY</div><div style="border:1px solid #ccc;min-height:10mm;padding:1mm"></div></div>
  </div>
  <div class="col-r">
    <div class="title-box" style="border:1px solid #000;margin-bottom:2mm">OCULAR HISTORY</div>
    <div class="sec-title">Chief Complaints</div>
    <div class="field-row"><span class="lbl">Symptoms</span><span class="val">${cc}</span></div>
    <div class="field-row"><span class="lbl">Duration</span><span class="val">${dur}</span></div>
    <div class="field-row"><span class="lbl">Eye</span><span class="val"></span></div>
    <div style="height:1mm"></div>
    <div class="sec-title">Past History</div><div style="border:1px solid #ccc;min-height:8mm;padding:1mm"></div>
    <div style="margin-top:1.5mm">
      <div class="sec-title">Spectacle History</div>
      <div class="field-row"><span class="lbl" style="min-width:90px">Using Glasses</span><span class="val"></span></div>
      <div class="field-row"><span class="lbl" style="min-width:90px">Duration</span><span class="val"></span></div>
      <div class="field-row"><span class="lbl" style="min-width:90px">Last Change No.</span><span class="val"></span></div>
      <div class="field-row"><span class="lbl" style="min-width:90px">Glasses Type</span><span class="val"></span></div>
      <div class="field-row"><span class="lbl" style="min-width:90px">Ocular Meds</span><span class="val"></span></div>
    </div>
    <div style="margin-top:1.5mm">
      <div class="sec-title">Past Surgery</div>
      <div class="field-row"><span class="lbl">Right Eye</span><span class="val"></span></div>
      <div class="field-row"><span class="lbl">Left Eye</span><span class="val"></span></div>
    </div>
    <div style="margin-top:1.5mm;display:flex;align-items:center;gap:6px">
      <span class="sec-title" style="text-decoration:none">ADVERSE DRUG REACTION :</span><span style="font-size:9px">Yes / No</span>
    </div>
  </div>
</div>
<div style="font-weight:900;font-size:10px;text-decoration:underline;margin-bottom:1.5mm">CLINICAL EXAMINATION</div>
<table class="et">
  <thead>
    <tr><th rowspan="2">Eye</th><th colspan="2">VA Distance</th><th>VA Near</th><th colspan="3">Glasses worn</th><th colspan="3">Auto Refraction</th><th colspan="3">Cycloplegic</th><th colspan="5">Subjective Refraction</th><th rowspan="2">IPD</th></tr>
    <tr><th>Unaided</th><th>Aided</th><th>Unaided</th><th>Sph</th><th>Cyl</th><th>Axis</th><th>Sph</th><th>Cyl</th><th>Axis</th><th>Sph</th><th>Cyl</th><th>Axis</th><th>Sph</th><th>Cyl</th><th>Axis</th><th>VA Dist</th><th>Add Near</th></tr>
  </thead>
  <tbody>
    <tr><td style="font-weight:700;background:#f5f5f5;text-align:left">R eye</td><td>${vaODU}</td><td></td><td>${vaODN}</td><td></td><td></td><td></td><td>${arODSph}</td><td>${arODCyl}</td><td>${arODAx}</td><td></td><td></td><td></td><td>${srODSph}</td><td>${srODCyl}</td><td>${srODAx}</td><td>${srODVA}</td><td></td><td rowspan="2">${ipd}</td></tr>
    <tr><td style="font-weight:700;background:#f5f5f5;text-align:left">L eye</td><td>${vaOSU}</td><td></td><td>${vaOSN}</td><td></td><td></td><td></td><td>${arOSSph}</td><td>${arOSCyl}</td><td>${arOSAx}</td><td></td><td></td><td></td><td>${srOSSph}</td><td>${srOSCyl}</td><td>${srOSAx}</td><td>${srOSVA}</td><td></td></tr>
  </tbody>
</table>
<div style="display:grid;grid-template-columns:auto auto 1fr 1fr;gap:4mm;align-items:start;margin-bottom:2mm">
  <table class="ht" style="width:auto">
    <thead><tr><th>Pin Hole</th><th>TIME</th><th>RE</th><th>LE</th></tr></thead>
    <tbody><tr><td style="font-weight:700;text-align:left">R eye</td><td rowspan="2" style="vertical-align:top;text-align:left;padding:2px 6px"><div>NCT</div><div style="margin-top:6mm">GAT</div></td><td rowspan="2">${iopNOD}<br><br>${iopGOD}</td><td rowspan="2">${iopNOS}<br><br>${iopGOS}</td></tr><tr><td style="font-weight:700;text-align:left">L eye</td></tr></tbody>
  </table>
  <table class="ht" style="width:auto"><tbody><tr><td style="text-align:left;white-space:nowrap">Add Near RE</td><td style="min-width:16mm"></td></tr><tr><td style="text-align:left;white-space:nowrap">Add Near LE</td><td style="min-width:16mm"></td></tr></tbody></table>
  <table class="ht" style="width:auto"><tbody><tr><td style="text-align:left">Axis</td><td style="min-width:20mm"></td></tr><tr><td style="text-align:left">EOM</td><td></td></tr></tbody></table>
  <table class="ht" style="width:auto"><tbody><tr><td style="text-align:left">Convergence</td><td style="min-width:16mm">${conv}</td></tr><tr><td style="text-align:left;white-space:nowrap">Pupillary Reactions</td><td>${pupil}</td></tr></tbody></table>
</div>
<div style="display:grid;grid-template-columns:auto 1fr;gap:4mm;margin-bottom:2mm">
  <div><div style="font-weight:900;font-size:9px;margin-bottom:1.5mm">PACHY</div>
    <table class="pt"><thead><tr><th></th><th>CCT (μm)</th></tr></thead><tbody><tr><td style="font-weight:700">R eye</td><td>${pachyOD}</td></tr><tr><td style="font-weight:700">L eye</td><td>${pachyOS}</td></tr></tbody></table>
  </div>
  <div><div style="font-weight:900;font-size:9px;margin-bottom:1.5mm">COLOUR VISION (Ishihara)</div>
    <table class="pt"><thead><tr><th></th><th>Plates (/17)</th><th>Result</th><th>Type</th></tr></thead>
    <tbody>
      <tr><td style="font-weight:700">R eye</td><td>${cvOD?cvOD+'/17':''}</td><td style="font-size:8px">${cvOD?(cvBlOD?'Colour Blind':'Normal'):''}</td><td style="font-size:8px;max-width:40mm">${cvBlOD?cvTypeOD:''}</td></tr>
      <tr><td style="font-weight:700">L eye</td><td>${cvOS?cvOS+'/17':''}</td><td style="font-size:8px">${cvOS?(cvBlOS?'Colour Blind':'Normal'):''}</td><td style="font-size:8px;max-width:40mm">${cvBlOS?cvTypeOS:''}</td></tr>
    </tbody></table>
  </div>
</div>
<div style="border:1px solid #ccc;padding:2mm;margin-bottom:2mm;font-size:7.5px">
  <div style="font-weight:900;font-size:9px;text-align:center;margin-bottom:2mm;letter-spacing:.5px;text-decoration:underline">OCULAR HEALTH EXAMINATION</div>
  <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:3mm;align-items:start">
    <div style="border:1px solid #ddd;border-radius:3px;padding:2mm">
      <div style="font-weight:900;font-size:8px;text-decoration:underline;margin-bottom:1.5mm;color:#1A3C6E">OD Anterior</div>
      <table style="width:100%;border-collapse:collapse;font-size:7.5px">
        <tr style="background:#eee"><th style="border:1px solid #ccc;padding:1px 2px;text-align:left">Structure</th><th style="border:1px solid #ccc;padding:1px 2px">WNL</th><th style="border:1px solid #ccc;padding:1px 2px">PATH</th><th style="border:1px solid #ccc;padding:1px 2px;min-width:25mm">Finding</th></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Lids/Lashes</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odLids&&slFields.odLids.toLowerCase().includes('wnl')||!slFields.odLids?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odLids&&!slFields.odLids.toLowerCase().includes('wnl')&&slFields.odLids?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odLids||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Conjunctiva</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odConj?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odConj?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odConj||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Sclera</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odSclera?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odSclera?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odSclera||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Angles 1 2 3 4</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px"></td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Cornea</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odCornea?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odCornea?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odCornea||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Iris/Pupil</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odIris?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odIris?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odIris||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">A/C</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odAC?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odAC?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odAC||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Lens/Media</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odLens?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odLens?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odLens||''}</td></tr>
      </table>
    </div>
    <div style="text-align:center;padding:1mm 2mm">
      <div style="font-size:7px;font-weight:800;color:#444;margin-bottom:2mm">Ocular health diagram</div>
      <img src="assets/ocular-health-exam.png" alt="Ocular health" style="width:100%;max-width:120px;height:auto;display:block;margin:0 auto;border:1px solid #ccc;border-radius:4px;background:#fff"/>
      <div style="font-size:6px;color:#666;margin-top:2mm">Use for annotation reference · OD/OS detail in tables</div>
    </div>
    <div style="border:1px solid #ddd;border-radius:3px;padding:2mm">
      <div style="font-weight:900;font-size:8px;text-decoration:underline;margin-bottom:1.5mm;color:#1A3C6E">OD Posterior</div>
      <table style="width:100%;border-collapse:collapse;font-size:7.5px">
        <tr style="background:#eee"><th style="border:1px solid #ccc;padding:1px 2px;text-align:left">Structure</th><th style="border:1px solid #ccc;padding:1px 2px">WNL</th><th style="border:1px solid #ccc;padding:1px 2px">PATH</th><th style="border:1px solid #ccc;padding:1px 2px;min-width:22mm">Finding</th></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Media</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odMedia?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odMedia?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odMedia||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">C/D's /</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odCD||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Shape/Type</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px"></td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Rim Tissue</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odRimTissue?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odRimTissue?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odRimTissue||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">VP + -</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odVP||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Post. Pole</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odPostPole?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odPostPole?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odPostPole||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">A/V</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odAV||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">ALR 1 2 3</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odALR||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Macula/FLR</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odMacula?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odMacula?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odMacula||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Periphery</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.odPeriph?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.odPeriph?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.odPeriph||''}</td></tr>
      </table>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:3mm;align-items:start;margin-top:2mm">
    <div style="border:1px solid #ddd;border-radius:3px;padding:2mm">
      <div style="font-weight:900;font-size:8px;text-decoration:underline;margin-bottom:1.5mm;color:#1a8c3c">OS Anterior</div>
      <table style="width:100%;border-collapse:collapse;font-size:7.5px">
        <tr style="background:#eee"><th style="border:1px solid #ccc;padding:1px 2px;text-align:left">Structure</th><th style="border:1px solid #ccc;padding:1px 2px">WNL</th><th style="border:1px solid #ccc;padding:1px 2px">PATH</th><th style="border:1px solid #ccc;padding:1px 2px;min-width:25mm">Finding</th></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Lids/Lashes</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osLids&&slFields.osLids.toLowerCase().includes('wnl')||!slFields.osLids?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osLids&&!slFields.osLids.toLowerCase().includes('wnl')&&slFields.osLids?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osLids||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Conjunctiva</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osConj?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osConj?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osConj||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Sclera</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osSclera?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osSclera?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osSclera||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Angles 1 2 3 4</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px"></td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Cornea</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osCornea?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osCornea?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osCornea||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Iris/Pupil</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osIris?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osIris?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osIris||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">A/C</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osAC?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osAC?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osAC||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Lens/Media</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osLens?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osLens?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osLens||''}</td></tr>
      </table>
    </div>
    <div style="width:80px"></div>
    <div style="border:1px solid #ddd;border-radius:3px;padding:2mm">
      <div style="font-weight:900;font-size:8px;text-decoration:underline;margin-bottom:1.5mm;color:#1a8c3c">OS Posterior</div>
      <table style="width:100%;border-collapse:collapse;font-size:7.5px">
        <tr style="background:#eee"><th style="border:1px solid #ccc;padding:1px 2px;text-align:left">Structure</th><th style="border:1px solid #ccc;padding:1px 2px">WNL</th><th style="border:1px solid #ccc;padding:1px 2px">PATH</th><th style="border:1px solid #ccc;padding:1px 2px;min-width:22mm">Finding</th></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Media</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osMedia?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osMedia?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osMedia||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">C/D's /</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osCD||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Shape/Type</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px"></td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Rim Tissue</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osRimTissue?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osRimTissue?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osRimTissue||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">VP + -</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osVP||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Post. Pole</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osPostPole?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osPostPole?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osPostPole||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">A/V</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osAV||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">ALR 1 2 3</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center"></td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osALR||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Macula/FLR</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osMacula?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osMacula?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osMacula||''}</td></tr>
        <tr><td style="border:1px solid #ccc;padding:1px 2px">Periphery</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${!slFields.osPeriph?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px;text-align:center">${slFields.osPeriph?'✓':''}</td><td style="border:1px solid #ccc;padding:1px 2px">${slFields.osPeriph||''}</td></tr>
      </table>
    </div>
  </div>
  ${diagNotes?`<div style="font-size:7.5px;color:#444;margin-top:1.5mm;border-top:1px solid #eee;padding-top:1mm"><strong>Notes:</strong> ${diagNotes}</div>`:''}
</div>

<div class="bot">
  <div class="btl"><span class="btlb">Diagnosis :-</span><span class="btlv" style="font-size:9.5px">${dxList}</span></div>
  <div class="btl"><span class="btlb">Test :-</span><span class="btlv"></span></div>
  ${incRx?`<div class="btl"><span class="btlb">Medication :-</span><span class="btlv" style="font-size:9px">${meds}</span></div>`:''}
  ${incProc?procsSection:''}
</div>
<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:2mm">
  <div style="display:flex;align-items:center;gap:8mm">
    <span style="font-weight:900;font-size:9.5px">Next Visit on</span>
    <span style="border-bottom:1px solid #000;min-width:30mm;display:inline-block;font-size:9.5px;padding-bottom:1px">${fuFmt}</span>
    <span style="font-weight:900;font-size:9.5px;margin-left:2mm">at</span>
    <span style="border-bottom:1px solid #000;min-width:24mm;display:inline-block"></span>
  </div>
  <div style="text-align:center">
    <div style="border-bottom:1.5px solid #000;width:35mm;margin:0 auto 2px"></div>
    <div style="font-size:8.5px;font-weight:700">${initials} — ${docName}</div>
    <div style="font-size:7.5px;color:#555">initials &amp; Date</div>
  </div>
</div>
</body></html>`;

  safePrint(html);
}

function printEyeExaminationCaseSheetA4() {
  safePrint(buildOphthoCaseSheetHtml());
  showToast('Eye examination A4 sheet sent to printer ✓', 's');
}

// ANC CARD PRINT
function printOBGCard() {
  const pt = window.CURRENT_PATIENT || {};
  const today=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  // Pull live form values
  const ptName = pt.name || document.getElementById('obg-pt-nm')?.textContent || '—';
  const ptId   = pt.bmhId || document.getElementById('obg-pt-uid')?.textContent || '—';
  const ptAge  = pt.age ? pt.age+' Years' : '—';
  const ptBloodGrp = document.getElementById('obg-blood-grp')?.value || document.getElementById('obg-blood')?.value || pt.bloodGroup || '—';
  const lmpVal = document.getElementById('obg-lmp')?.value || '';
  const lmpFmt = lmpVal ? new Date(lmpVal).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—';
  const edd    = document.getElementById('obg-edd-inp')?.value || document.getElementById('obg-edd')?.textContent || '—';
  const gravida= document.getElementById('obg-gpal-chip')?.textContent || '—';
  const docName= pt.doctor || window.CURRENT_USER?.name || 'Dr. Namrata Baweja';
  const docSig = docName.includes('Geeta')?'Dr. Geeta Baweja · MS (OBG)':docName.includes('Namrata')?'Dr. Namrata Baweja · MS (OBG)':docName+' · MS (OBG)';

  // Build ANC visit rows from live anc-visit-list DOM items
  const ancRows = [];
  document.querySelectorAll('#anc-visit-list .anc-visit-row, #anc-visit-list [data-anc-row]').forEach((row,i)=>{
    const cells = row.querySelectorAll('input,select,[data-val]');
    if(cells.length) ancRows.push({
      num:i+1,
      date:cells[0]?.value||cells[0]?.textContent||'',
      ga:cells[1]?.value||cells[1]?.textContent||'',
      wt:cells[2]?.value||cells[2]?.textContent||'',
      bp:cells[3]?.value||cells[3]?.textContent||'',
      fhr:cells[4]?.value||cells[4]?.textContent||'',
      fh:cells[5]?.value||cells[5]?.textContent||'',
      pres:cells[6]?.value||cells[6]?.textContent||'',
      oedema:cells[7]?.value||cells[7]?.textContent||'Nil',
      urine:cells[8]?.value||cells[8]?.textContent||'Normal',
      next:cells[9]?.value||cells[9]?.textContent||''
    });
  });
  // Fill empty rows up to 8
  while(ancRows.length<8) ancRows.push({num:ancRows.length+1,date:'',ga:'',wt:'',bp:'',fhr:'',fh:'',pres:'',oedema:'',urine:'',next:''});

  const html=`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  *{margin:0;padding:0;box-sizing:border-box;print-color-adjust:exact;-webkit-print-color-adjust:exact}
  body{font-family:'Nunito',sans-serif;font-size:11px;background:#fff}
  @page{size:A4 portrait;margin:8mm}
  .hdr{background:linear-gradient(135deg,#6a0091,#AF52DE);padding:12px 18px;color:#fff;border-radius:4px 4px 0 0}
  table{width:100%;border-collapse:collapse;font-size:10px;margin-top:10px}
  th{padding:5px 7px;background:#6a0091;color:#fff;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.4px;text-align:center;border:1px solid #ccc}
  td{padding:4px 7px;border:1px solid #ddd;text-align:center}
  tr:nth-child(even){background:#fdf4ff}
  .fl{font-size:9px;color:#666;font-weight:800;text-transform:uppercase;letter-spacing:.4px}
  .fv{font-size:12px;font-weight:800;color:#1A3C6E;margin-top:2px}
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  </head><body>
  <div class="hdr">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-size:18px;font-weight:900">Baweja Multispeciality Hospital</div><div style="font-size:10px;opacity:.8">Chandigarh & Ropar · +91-81466 22802</div></div>
      <div style="text-align:right"><div style="font-size:10px;opacity:.7;text-transform:uppercase;letter-spacing:.5px">ANC Card</div><div style="font-size:14px;font-weight:900;color:#D4A017">${ptId}</div></div>
    </div>
    <div style="display:flex;gap:20px;margin-top:10px;font-size:11.5px">
      <div><div style="opacity:.7;font-size:9px;text-transform:uppercase">Patient</div><div style="font-weight:900">${ptName}</div></div>
      <div><div style="opacity:.7;font-size:9px;text-transform:uppercase">Age</div><div style="font-weight:900">${ptAge}</div></div>
      <div><div style="opacity:.7;font-size:9px;text-transform:uppercase">LMP</div><div style="font-weight:900">${lmpFmt}</div></div>
      <div><div style="opacity:.7;font-size:9px;text-transform:uppercase">EDD</div><div style="font-weight:900">${edd}</div></div>
      <div><div style="opacity:.7;font-size:9px;text-transform:uppercase">GPAL</div><div style="font-weight:900">${gravida}</div></div>
      <div><div style="opacity:.7;font-size:9px;text-transform:uppercase">Blood Group</div><div style="font-weight:900">${ptBloodGrp}</div></div>
      <div><div style="opacity:.7;font-size:9px;text-transform:uppercase">Doctor</div><div style="font-weight:900">${docName}</div></div>
    </div>
  </div>
  <div style="padding:10px">
    <div style="font-size:12px;font-weight:900;color:#6a0091;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">ANC Visit Record</div>
    <table>
      <thead><tr><th>Visit</th><th>Date</th><th>GA (Wks)</th><th>Wt (kg)</th><th>BP (mmHg)</th><th>FHR (bpm)</th><th>Fundal Ht</th><th>Presentation</th><th>Oedema</th><th>Urine</th><th>Next Visit</th></tr></thead>
      <tbody>
        ${ancRows.map(r=>`<tr><td>${r.num}</td><td>${r.date}</td><td>${r.ga}</td><td>${r.wt}</td><td>${r.bp}</td><td>${r.fhr}</td><td>${r.fh}</td><td>${r.pres}</td><td>${r.oedema}</td><td>${r.urine}</td><td>${r.next}</td></tr>`).join('')}
      </tbody>
    </table>
    <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:flex-end">
      <div><div style="border-bottom:1px solid #333;width:140px;margin-top:30px"></div><div style="font-size:9px;color:#888;margin-top:3px">Patient Signature</div></div>
      <div style="text-align:right"><div style="font-size:12px;font-weight:900;color:#1A3C6E">${docSig}</div><div style="font-size:10px;color:#888;margin-top:2px">Baweja Multispeciality Hospital · ${today}</div></div>
    </div>
  </div>
  </body></html>`;
  safePrint(html);showToast('ANC Card sent to printer ✓','s');
}


// DRUG LIBRARY
const DRUG_LIBRARY = [
  {type:'Eye Drop',trade:'Vigamox',generic:'Moxifloxacin 0.5%',freq:'QID',dur:'1 Week',dept:'Ophthalmology'},
  {type:'Eye Drop',trade:'Pred Forte',generic:'Prednisolone Acetate 1%',freq:'QID→Taper',dur:'4 Weeks',dept:'Ophthalmology'},
  {type:'Eye Drop',trade:'Refresh Tears',generic:'Carboxymethylcellulose 0.5%',freq:'PRN',dur:'1 Month',dept:'Ophthalmology'},
  {type:'Eye Drop',trade:'Timoptol',generic:'Timolol 0.5%',freq:'BD',dur:'Ongoing',dept:'Ophthalmology'},
  {type:'Eye Drop',trade:'Cosopt',generic:'Timolol+Dorzolamide',freq:'BD',dur:'Ongoing',dept:'Ophthalmology'},
  {type:'Tablet',trade:'Diamox',generic:'Acetazolamide 250mg',freq:'QID',dur:'5 Days',dept:'Ophthalmology'},
  {type:'Tablet',trade:'Escitalopram',generic:'Escitalopram 10mg',freq:'OD',dur:'3 Months',dept:'Neuropsychiatry'},
  {type:'Tablet',trade:'Iron+Folic',generic:'Ferrous Sulphate 60mg + Folic Acid',freq:'OD',dur:'Ongoing',dept:'OBG'},
  {type:'Tablet',trade:'Calcium+D3',generic:'Calcium 500mg + Vit D3',freq:'BD',dur:'Ongoing',dept:'OBG'},
  {type:'Cream',trade:'Retino-A',generic:'Tretinoin 0.025%',freq:'HS',dur:'3 Months',dept:'Skin'},
];

const SELECTED_INVESTIGATIONS = [];
const INVESTIGATION_LIBRARY = {
  blood: [
    ['CBC (Complete Blood Count)', 850],
    ['Fasting Blood Sugar', 250],
    ['HbA1c', 600],
    ['Serum Creatinine', 350],
    ['Urea & Electrolytes', 700],
    ['Liver Function Tests', 900],
    ['Coagulation Profile', 1200],
    ['HIV', 400],
    ['HbsAg', 300],
    ['VDRL', 300]
  ],
  diag: [
    ['Chest X-Ray', 600],
    ['ECG', 350],
    ['Echocardiography', 2500],
    ['USG Abdomen', 1200],
    ['MRI Brain', 8000],
    ['CT Scan Head', 5000]
  ],
  eye: [
    ['Biometry (IOL Master)', 1200],
    ['OCT Macula OU', 1800],
    ['OCT Optic Disc OU', 1800],
    ['HVF Visual Fields', 1500],
    ['Fundus Photography', 600],
    ['Corneal Topography', 1500],
    ['Specular Microscopy', 1200],
    ['ERG / VEP', 2500],
    ['Fluorescein Angiography', 4000]
  ]
};
const RX_FREQ_OPTIONS = ['Half-hourly','Hourly','Every 2 hours','Every 3 hours','Every 4 hours','Six times daily (6x/day)','Four times daily (QID)','Three times daily (TDS)','Twice daily (BD)','Once daily (OD)','At bedtime (HS)','Once weekly','As needed (PRN)'];
const RX_DURATION_OPTIONS = ['½ day','1 day','2 days','3 days','4 days','5 days','6 days','7 days','13 days','1 week','2 weeks','3 weeks','4 weeks','6 weeks','1 month','2 months','3 months','4 months','5 months','6 months','12 months','Ongoing'];
const RX_TYPE_OPTIONS = ['Eye Drop','Tablet','Capsule','Ointment','Cream','Gel','Syrup','Injection','Pessary','Lotion','Spray','Other'];
const RX_SITE_OPTIONS = ['Right Eye (OD)','Left Eye (OS)','Both Eyes (OU)','Oral','Topical','IM / IV','Nasal','Ear','Vaginal'];
function renderInvestigationChooser() {
  const groups = [
    ['inv-blood-list', INVESTIGATION_LIBRARY.blood],
    ['inv-diag-list', INVESTIGATION_LIBRARY.diag],
    ['inv-eye-list', INVESTIGATION_LIBRARY.eye]
  ];
  groups.forEach(([id, items]) => {
    const el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = items.map(([name, price]) => `<div class="invest-option" data-investigation-name="${String(name).replace(/"/g,'&quot;')}" data-price="${price}" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--g6);border-radius:8px;cursor:pointer" onclick="toggleInvestigation(this,${JSON.stringify(name)},${price})"><input type="checkbox" style="width:16px;height:16px;flex-shrink:0"><div style="flex:1"><div style="font-size:12px;font-weight:700">${name}</div><div style="font-size:10px;color:var(--g1)">₹${Number(price).toLocaleString('en-IN')}</div></div></div>`).join('');
  });
}
let INVESTIGATION_TEMPLATES_DATA = {
  'baseline-lab': ['CBC (Complete Blood Count)', 'Fasting Blood Sugar', 'HbA1c', 'Serum Creatinine'],
  'pre-op-eye': ['CBC (Complete Blood Count)', 'Fasting Blood Sugar', 'ECG', 'Chest X-Ray'],
  'retina-workup': ['OCT Macula OU', 'Fundus Photography', 'HbA1c']
};
const INVESTIGATION_TEMPLATES_META = {
  'baseline-lab': { dept: 'all', name: 'Baseline blood work' },
  'pre-op-eye': { dept: 'ophtho', name: 'Eye pre-op workup' },
  'retina-workup': { dept: 'ophtho', name: 'Retina workup' }
};
function getCurrentInvestigationDeptKey() {
  const dept = (window.CURRENT_PATIENT?.dept || CURRENT_USER?.dept || '').toLowerCase();
  if(dept.includes('obg')) return 'obg';
  if(dept.includes('psych')) return 'psych';
  if(dept.includes('skin')) return 'skin';
  return 'ophtho';
}
function saveInvestigationTemplatesToStorage() {
  try {
    localStorage.setItem('bmh_investigation_templates', JSON.stringify({
      data: INVESTIGATION_TEMPLATES_DATA,
      meta: INVESTIGATION_TEMPLATES_META
    }));
  } catch (e) {}
}
function loadInvestigationTemplatesFromStorage() {
  try {
    const raw = localStorage.getItem('bmh_investigation_templates');
    if(!raw) return;
    const parsed = JSON.parse(raw);
    if(parsed?.data && typeof parsed.data === 'object') Object.assign(INVESTIGATION_TEMPLATES_DATA, parsed.data);
    if(parsed?.meta && typeof parsed.meta === 'object') Object.assign(INVESTIGATION_TEMPLATES_META, parsed.meta);
  } catch (e) {}
}
function getCurrentPatientInvestigationOrders() {
  const pt = window.CURRENT_PATIENT || PATIENTS.find(p => p.bmhId === (document.getElementById('ophtho-pt-uid')?.textContent || '').trim());
  if(!pt) return [];
  if(!Array.isArray(pt.investigationOrders)) pt.investigationOrders = [];
  return pt.investigationOrders;
}
function syncCurrentPatientInvestigationOrders() {
  const orders = getCurrentPatientInvestigationOrders();
  INVESTIGATION_ORDERS.length = 0;
  orders.forEach(o => INVESTIGATION_ORDERS.push(o));
  return orders;
}
function persistCurrentPatientInvestigationOrders() {
  const pt = window.CURRENT_PATIENT;
  if(pt?.bmhId) {
    fbUpdate && fbUpdate('patients/' + pt.bmhId, { investigationOrders: pt.investigationOrders || [] }).catch(()=>{});
  }
}
function syncSelectedInvestigationCheckboxes() {
  const selectedNames = new Set(SELECTED_INVESTIGATIONS.map(i => i.name));
  document.querySelectorAll('#m-order-invest .invest-option').forEach(el => {
    const label = el.getAttribute('data-investigation-name')?.trim();
    const cb = el.querySelector('input[type=checkbox]');
    const checked = !!label && selectedNames.has(label);
    if(cb) cb.checked = checked;
    el.style.background = checked ? 'var(--blue-lt)' : 'var(--g6)';
  });
  const sl = document.getElementById('selected-invest-list');
  if(sl) {
    sl.innerHTML = SELECTED_INVESTIGATIONS.length
      ? SELECTED_INVESTIGATIONS.map(i=>`<span style="display:inline-block;margin:2px 4px 2px 0;background:var(--blue-lt);color:var(--blue);padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700">${i.name} ₹${i.price.toLocaleString('en-IN')}</span>`).join('')
      : 'None selected';
  }
}
function clearSelectedInvestigations() {
  SELECTED_INVESTIGATIONS.length = 0;
  syncSelectedInvestigationCheckboxes();
}
function refreshInvestigationTemplateSelect() {
  const sel = document.getElementById('inv-template-sel');
  if(!sel) return;
  const dept = getCurrentInvestigationDeptKey();
  const cur = sel.value;
  sel.innerHTML = '<option value="">— Select template —</option>';
  Object.keys(INVESTIGATION_TEMPLATES_DATA).forEach(key => {
    const meta = INVESTIGATION_TEMPLATES_META[key] || { dept: 'all', name: key };
    if(meta.dept !== 'all' && meta.dept !== dept) return;
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = meta.name || key;
    sel.appendChild(opt);
  });
  if([...sel.options].some(o => o.value === cur)) sel.value = cur;
}
function applyInvestigationTemplate(key) {
  if(!key || !INVESTIGATION_TEMPLATES_DATA[key]) return;
  clearSelectedInvestigations();
  const names = new Set(INVESTIGATION_TEMPLATES_DATA[key] || []);
  document.querySelectorAll('#m-order-invest .invest-option').forEach(el => {
    const label = el.getAttribute('data-investigation-name')?.trim();
    if(!label || !names.has(label)) return;
    const cb = el.querySelector('input[type=checkbox]');
    if(cb && !cb.checked) toggleInvestigation(el, label, Number(el.getAttribute('data-price')) || 0);
  });
}
function saveInvestigationTemplateFromSelection() {
  if(!SELECTED_INVESTIGATIONS.length) {
    showToast('Select investigations first','w');
    return;
  }
  const name = prompt('Template name?');
  if(!name) return;
  const deptSpecific = confirm('Make this template department-specific? Click Cancel to save as a general template.');
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || ('investigation-template-' + Date.now());
  INVESTIGATION_TEMPLATES_DATA[key] = SELECTED_INVESTIGATIONS.map(i => i.name);
  INVESTIGATION_TEMPLATES_META[key] = { dept: deptSpecific ? getCurrentInvestigationDeptKey() : 'all', name: name.trim() };
  saveInvestigationTemplatesToStorage();
  refreshInvestigationTemplateSelect();
  const sel = document.getElementById('inv-template-sel');
  if(sel) sel.value = key;
  showToast('Investigation template saved ✓','s');
}
let RX_TEMPLATES_DATA = {
  'post-phaco': [{trade:'Vigamox',generic:'Moxifloxacin 0.5%',type:'Eye Drop',eye:'OS',freq:'QID',dur:'1 Week'},{trade:'Pred Forte',generic:'Prednisolone 1%',type:'Eye Drop',eye:'OS',freq:'QID→Taper',dur:'4 Weeks'},{trade:'Refresh Tears',generic:'CMC 0.5%',type:'Eye Drop',eye:'OU',freq:'PRN',dur:'1 Month'}],
  'post-ivt': [{trade:'Vigamox',generic:'Moxifloxacin 0.5%',type:'Eye Drop',eye:'OS',freq:'QID',dur:'3 Days'},{trade:'Refresh Tears',generic:'CMC 0.5%',type:'Eye Drop',eye:'OU',freq:'PRN',dur:'1 Month'}],
  'dry-eye': [{trade:'Refresh Tears',generic:'CMC 0.5%',type:'Eye Drop',eye:'OU',freq:'QID',dur:'1 Month'},{trade:'Restasis',generic:'Cyclosporine 0.05%',type:'Eye Drop',eye:'OU',freq:'BD',dur:'3 Months'}],
};
/** Per-template metadata: dept key ophtho|obg|psych|skin|all, display name, notes */
const RX_TEMPLATES_META = {
  'post-phaco': { dept: 'ophtho', name: 'Post Phaco (default)', notes: '' },
  'post-ivt': { dept: 'ophtho', name: 'Post IVT (default)', notes: '' },
  'dry-eye': { dept: 'ophtho', name: 'Dry eye (default)', notes: '' },
};
function saveRxTemplatesToStorage() {
  try { localStorage.setItem('bmh_rx_templates', JSON.stringify({ data: RX_TEMPLATES_DATA, meta: RX_TEMPLATES_META })); } catch (e) { /* quota */ }
  if (window.FBDB) window.FBDB.ref('rxTemplates').set({ data: RX_TEMPLATES_DATA, meta: RX_TEMPLATES_META }).catch(function () {});
}
function loadRxTemplatesFromStorage(cb) {
  try {
    const ls = localStorage.getItem('bmh_rx_templates');
    if (ls) {
      const o = JSON.parse(ls);
      if (o.data && typeof o.data === 'object') Object.assign(RX_TEMPLATES_DATA, o.data);
      if (o.meta && typeof o.meta === 'object') Object.assign(RX_TEMPLATES_META, o.meta);
    }
  } catch (e) { /* noop */ }
  if (!window.FBDB) {
    if (typeof refreshRxTemplateSelects === 'function') refreshRxTemplateSelects();
    if (typeof renderSetRxTplList === 'function') renderSetRxTplList();
    if (typeof cb === 'function') cb();
    return;
  }
  window.FBDB.ref('rxTemplates').once('value').then(function (snap) {
    const v = snap.val();
    if (v && v.data && typeof v.data === 'object') Object.assign(RX_TEMPLATES_DATA, v.data);
    if (v && v.meta && typeof v.meta === 'object') Object.assign(RX_TEMPLATES_META, v.meta);
    if (typeof refreshRxTemplateSelects === 'function') refreshRxTemplateSelects();
    if (typeof renderSetRxTplList === 'function') renderSetRxTplList();
    if (typeof cb === 'function') cb();
  }).catch(function () {
    if (typeof refreshRxTemplateSelects === 'function') refreshRxTemplateSelects();
    if (typeof renderSetRxTplList === 'function') renderSetRxTplList();
    if (typeof cb === 'function') cb();
  });
}
/** Map settings page / current clinic page to template dept key */
function rxDeptKeyFromUi() {
  const pg = document.querySelector('.page.active') || document.querySelector('[id^="pg-"]');
  const id = (pg && pg.id) || '';
  if (id.includes('ophtho')) return 'ophtho';
  if (id.includes('obg')) return 'obg';
  if (id.includes('psych')) return 'psych';
  if (id.includes('skin')) return 'skin';
  if (id.includes('ot')) return 'ot';
  return 'ophtho';
}
function refreshRxTemplateSelects() {
  const dk = rxDeptKeyFromUi();
  const selList = document.querySelectorAll('#rx-tpl-sel, select[onchange*="applyRxTemplate"]');
  selList.forEach(function (sel) {
    const cur = sel.value;
    sel.innerHTML = '<option value="">— Template —</option>';
    Object.keys(RX_TEMPLATES_DATA).forEach(function (k) {
      const meta = RX_TEMPLATES_META[k] || { dept: 'all', name: k };
      const d = meta.dept || 'all';
      if (d !== 'all' && d !== dk) return;
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = meta.name || k;
      sel.appendChild(opt);
    });
    if ([...sel.options].some(function (o) { return o.value === cur; })) sel.value = cur;
  });
  if (typeof refreshOTNotesTemplateSelect === 'function') refreshOTNotesTemplateSelect();
}
function rxDrugMatchesDept(drug, deptKey, deptLabel) {
  const entry = drug || {};
  const rawDept = String(entry.dept || '').trim();
  const normalizedDept = rawDept.toLowerCase();
  const type = String(entry.type || '').trim().toLowerCase();
  const trade = String(entry.trade || entry.brand || '').trim().toLowerCase();
  const generic = String(entry.generic || entry.name || '').trim().toLowerCase();
  const hay = `${trade} ${generic} ${type}`.trim();
  const looksEyeSpecific =
    type.includes('eye drop') ||
    type.includes('ophthalmic') ||
    /\b(drop|od|os|ou)\b/.test(hay) ||
    /\b(pred forte|vigamox|refresh tears|timoptol|cosopt|restasis)\b/.test(hay);

  if (deptKey === 'ophtho') {
    if (!rawDept) return looksEyeSpecific;
    return normalizedDept === 'ophtho' || normalizedDept === 'ophthalmology' || normalizedDept === 'all';
  }

  if (looksEyeSpecific) return false;
  if (!rawDept || normalizedDept === 'all') return true;
  if (deptLabel && rawDept === deptLabel) return true;
  if (deptKey === 'psych' && (normalizedDept === 'psych' || normalizedDept === 'psychiatry' || normalizedDept === 'neuropsychiatry')) return true;
  if (deptKey === 'obg' && (normalizedDept === 'obg' || normalizedDept.includes('gyn') || normalizedDept.includes('fertility'))) return true;
  if (deptKey === 'skin' && (normalizedDept === 'skin' || normalizedDept.includes('derm') || normalizedDept.includes('cosmet'))) return true;
  return normalizedDept === deptKey;
}
function renderSetRxTplList() {
  const el = document.getElementById('set-rx-tpl-list');
  if (!el) return;
  const deptOrder = ['ophtho','obg','psych','skin','ot','all'];
  const deptLabMap = { ophtho: 'Eye', obg: 'OBG', psych: 'Psych', skin: 'Skin', ot: 'OT Notes', all: 'All Departments' };
  const groups = deptOrder.map(function (deptKey) {
    const rows = Object.keys(RX_TEMPLATES_DATA).filter(function (k) {
      return (RX_TEMPLATES_META[k]?.dept || 'all') === deptKey;
    }).map(function (k) {
      const meta = RX_TEMPLATES_META[k] || { dept: 'all', name: k, notes: '' };
      const n = meta.name || k;
      const arr = RX_TEMPLATES_DATA[k] || [];
      const preview = arr.slice(0, 2).map(function (row) {
        const nm = rxDrugTradeName(row) || row.trade || row.name || row.generic || 'Item';
        return nm + (row.freq ? ' · ' + row.freq : '') + (row.dur ? ' · ' + row.dur : '');
      }).join('<br>');
      const cnt = arr.length;
      return '<div style="display:flex;align-items:flex-start;gap:10px;padding:10px;background:var(--g6);border-radius:8px;margin-bottom:6px;font-size:12px">' +
        '<div style="flex:1"><div style="font-weight:800">' + n + '</div>' +
        '<div style="font-size:10.5px;color:var(--g1)">' + cnt + ' line(s) with saved frequency / duration' + '</div>' +
        (preview ? '<div style="font-size:10.5px;color:var(--tx3);margin-top:5px;line-height:1.45">' + preview + '</div>' : '') +
        '</div>' +
        '<button type="button" class="btn btn-xs btn-gold" onclick="openEditRxTemplateModal(' + JSON.stringify(k) + ')">✏️ Edit</button>' +
        '<button type="button" class="btn btn-xs btn-gray" onclick="deleteRxTemplate(' + JSON.stringify(k) + ')">🗑️</button></div>';
    }).join('');
    return rows ? '<div style="margin-bottom:12px"><div style="font-size:10px;font-weight:900;color:var(--bmh-blue);text-transform:uppercase;margin-bottom:6px">' + deptLabMap[deptKey] + '</div>' + rows + '</div>' : '';
  }).join('');
  el.innerHTML = groups || '<div style="padding:16px;color:var(--g1);font-size:12px">No templates yet</div>';
}
function openEditRxTemplateModal(key) {
  if (!key || !RX_TEMPLATES_DATA[key]) return;
  const meta = RX_TEMPLATES_META[key] || { dept: 'all', name: key, notes: '' };
  const kInp = document.getElementById('edit-rx-tpl-key');
  const nInp = document.getElementById('edit-rx-tpl-name');
  const dInp = document.getElementById('edit-rx-tpl-dept');
  const notesInp = document.getElementById('edit-rx-tpl-notes');
  const jInp = document.getElementById('edit-rx-tpl-json');
  if (kInp) kInp.value = key;
  if (nInp) nInp.value = meta.name || key;
  if (dInp) dInp.value = meta.dept || 'all';
  if (notesInp) notesInp.value = meta.notes || '';
  if (jInp) jInp.value = JSON.stringify(RX_TEMPLATES_DATA[key], null, 2);
  openM('m-edit-rx-tpl');
}
function saveRxTemplateFromModal() {
  const key = document.getElementById('edit-rx-tpl-key')?.value;
  if (!key || !RX_TEMPLATES_DATA[key]) { showToast('Invalid template', 'w'); return; }
  const name = document.getElementById('edit-rx-tpl-name')?.value?.trim() || key;
  const dept = document.getElementById('edit-rx-tpl-dept')?.value || 'all';
  const notes = document.getElementById('edit-rx-tpl-notes')?.value?.trim() || '';
  let arr;
  try {
    arr = JSON.parse(document.getElementById('edit-rx-tpl-json')?.value || '[]');
  } catch (e) {
    showToast('Invalid JSON — check drug list', 'w');
    return;
  }
  if (!Array.isArray(arr)) { showToast('Template must be a JSON array', 'w'); return; }
  RX_TEMPLATES_DATA[key] = arr;
  RX_TEMPLATES_META[key] = { dept: dept, name: name, notes: notes };
  saveRxTemplatesToStorage();
  refreshRxTemplateSelects();
  renderSetRxTplList();
  closeM('m-edit-rx-tpl');
  showToast('Rx template saved ✓', 's');
}
function renderStructuredConsentList() {
  const el = document.getElementById('set-consent-data-list');
  if (!el) return;
  const m = getMergedConsentData();
  const keys = Object.keys(m).sort();
  el.innerHTML = keys.map(function (k) {
    const d = m[k];
    const title = d.title || k;
    const n = (d.paras || []).length;
    const hasOv = !!CONSENT_DATA_OVERRIDES[k];
    return '<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--g6);border-radius:8px;margin-bottom:5px;font-size:12px">'
      + '<div style="flex:1;min-width:0"><div style="font-weight:800">' + String(title).replace(/</g, '&lt;') + '</div>'
      + '<div style="font-size:10px;color:var(--g1)">' + n + ' paragraph pair(s)' + (hasOv ? ' · saved override' : '') + '</div></div>'
      + '<button type="button" class="btn btn-xs btn-gold" onclick="openEditConsentDataModal(' + JSON.stringify(k) + ')">✏️</button>'
      + (hasOv ? '<button type="button" class="btn btn-xs btn-gray" onclick="deleteConsentDataOverride(' + JSON.stringify(k) + ')">↺ Reset</button>' : '')
      + '</div>';
  }).join('');
}
function openEditConsentDataModal(key) {
  const d = getConsentEntry(key) || resolveConsentDataForPrint(key);
  if (!d) return;
  const kEl = document.getElementById('edit-cd-key');
  const tEl = document.getElementById('edit-cd-title');
  const enEl = document.getElementById('edit-cd-en');
  const paEl = document.getElementById('edit-cd-pa');
  const hiEl = document.getElementById('edit-cd-hi');
  if (kEl) kEl.value = key;
  if (tEl) tEl.value = d.title || '';
  const paras = d.paras || [];
  if (enEl) enEl.value = paras.map(function (p) { return p.en || ''; }).join('\n\n');
  if (paEl) paEl.value = paras.map(function (p) { return p.pa || ''; }).join('\n\n');
  if (hiEl) hiEl.value = paras.map(function (p) { return p.hi || ''; }).join('\n\n');
  openM('m-edit-consent-data');
}
function saveStructuredConsentFromModal() {
  const key = document.getElementById('edit-cd-key')?.value;
  if (!key) return;
  const title = document.getElementById('edit-cd-title')?.value?.trim() || key;
  const enText = document.getElementById('edit-cd-en')?.value || '';
  const paText = document.getElementById('edit-cd-pa')?.value || '';
  const hiText = document.getElementById('edit-cd-hi')?.value || '';
  const en = String(enText).split(/\n\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
  const pa = String(paText).split(/\n\n+/).map(function (s) { return s.trim(); });
  const hi = String(hiText).split(/\n\n+/).map(function (s) { return s.trim(); });
  const n = Math.max(en.length, pa.length, hi.length);
  const paras = [];
  for (let i = 0; i < n; i++) {
    paras.push({ en: en[i] || '', pa: pa[i] || '', hi: hi[i] || '' });
  }
  if (!paras.length) { showToast('Add at least one English block (paragraphs separated by a blank line)', 'w'); return; }
  CONSENT_DATA_OVERRIDES[key] = { title: title, paras: paras };
  saveConsentDataOverridesToStorage();
  renderStructuredConsentList();
  closeM('m-edit-consent-data');
  showToast('Consent text saved (local + cloud) ✓', 's');
}
function deleteConsentDataOverride(key) {
  if (!key || !CONSENT_DATA_OVERRIDES[key]) { showToast('No saved override to reset', 'w'); return; }
  if (!confirm('Reset “' + key + '” to the built-in default text?')) return;
  delete CONSENT_DATA_OVERRIDES[key];
  saveConsentDataOverridesToStorage();
  renderStructuredConsentList();
  showToast('Restored built-in default ✓', 's');
}
function deleteRxTemplate(key) {
  if (!key || !RX_TEMPLATES_DATA[key]) return;
  if (!confirm('Delete template "' + (RX_TEMPLATES_META[key] && RX_TEMPLATES_META[key].name || key) + '"?')) return;
  delete RX_TEMPLATES_DATA[key];
  delete RX_TEMPLATES_META[key];
  saveRxTemplatesToStorage();
  refreshRxTemplateSelects();
  renderSetRxTplList();
  showToast('Template removed ✓', 's');
}

function rebuildDrugGenericDatalist() {
  const dl = document.getElementById('drug-generic-datalist');
  if(!dl) return;
  const gens = [...new Set(DRUG_LIBRARY.map(d => String(d.generic || '').trim()).filter(Boolean))].sort();
  dl.innerHTML = gens.map(g => `<option value="${String(g).replace(/&/g,'&amp;').replace(/"/g,'&quot;')}">`).join('');
}

function saveDrugLibraryToStorage() {
  try { localStorage.setItem('bmh_drug_library', JSON.stringify(DRUG_LIBRARY)); } catch (e) { /* noop */ }
  if (window.FBDB) window.FBDB.ref('drugLibrary').set(DRUG_LIBRARY).catch(() => {});
}

function loadDrugLibraryFromStorage() {
  try {
    const ls = localStorage.getItem('bmh_drug_library');
    if (ls) {
      const arr = JSON.parse(ls);
      if (Array.isArray(arr) && arr.length) {
        DRUG_LIBRARY.length = 0;
        arr.forEach(x => DRUG_LIBRARY.push(x));
      }
    }
  } catch (e) { /* noop */ }
  if (!window.FBDB) {
    renderSettingsDrugs && renderSettingsDrugs();
    rebuildDrugGenericDatalist();
    return;
  }
  window.FBDB.ref('drugLibrary').once('value').then(snap => {
    const arr = snap.val();
    if (!Array.isArray(arr) || !arr.length) {
      renderSettingsDrugs && renderSettingsDrugs();
      rebuildDrugGenericDatalist();
      return;
    }
    DRUG_LIBRARY.length = 0;
    arr.forEach(x => DRUG_LIBRARY.push(x));
    renderSettingsDrugs && renderSettingsDrugs();
    rebuildDrugGenericDatalist();
  }).catch(() => {
    renderSettingsDrugs && renderSettingsDrugs();
    rebuildDrugGenericDatalist();
  });
}
window.loadDrugLibraryFromStorage = loadDrugLibraryFromStorage;

function normalizeDrugTypeFromCsv(s) {
  const t = String(s || '').toLowerCase().trim();
  if (!t) return 'Tablet';
  if (t.includes('eye drop') || t.includes('eyedrop') || (t.includes('drop') && !t.includes('tablet'))) return 'Eye Drop';
  if (t.includes('ointment') || t.includes('oint')) return 'Ointment';
  if (t.includes('cream')) return 'Cream';
  if (t.includes('gel')) return 'Gel';
  if (t.includes('cap') && !t.includes('eye')) return 'Capsule';
  if (t.includes('inject') || /\binj\b/.test(t) || t.includes('vial')) return 'Injection';
  if (t.includes('syrup') || t.includes('suspension')) return 'Syrup';
  if (t.includes('pessary') || t.includes('pessar')) return 'Pessary';
  if (t.includes('tab') || t === 'tablet' || t.includes('caplet')) return 'Tablet';
  const title = s.trim();
  return title.charAt(0).toUpperCase() + title.slice(1);
}
function handleDrugImportCsv(inp) {
  const file = inp.files && inp.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const text = String(e.target.result || '');
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) { showToast('CSV needs a header row + data rows', 'w'); return; }
    const header = lines[0].split(',').map(x => x.trim().toLowerCase().replace(/^"|"$/g, ''));
    const idx = (pred) => header.findIndex(h => pred(h));
    const ti = idx(h => h.includes('trade') || h.includes('brand') || h === 'name');
    const gi = idx(h => h.includes('generic'));
    const ci = idx(h => h.includes('compan'));
    const tyi = idx(h => h.includes('type') || h.includes('form') || h.includes('category') || h.includes('dosage form') || h === 'form');
    const tCol = ti >= 0 ? ti : 0;
    const gCol = gi >= 0 ? gi : 1;
    const typeCol = tyi >= 0 ? tyi : (header.length > 2 ? 2 : -1);
    let added = 0;
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(x => x.trim().replace(/^"|"$/g, ''));
      const trade = cols[tCol] || '';
      const generic = cols[gCol] || '';
      const company = ci >= 0 ? (cols[ci] || '') : '';
      const rawType = typeCol >= 0 ? (cols[typeCol] || '') : '';
      if (!trade && !generic) continue;
      const drugType = normalizeDrugTypeFromCsv(rawType);
      DRUG_LIBRARY.push({
        type: drugType,
        trade: trade || generic,
        generic: generic || trade,
        freq: 'BD',
        dur: '1 Week',
        dept: 'All',
        company: company || ''
      });
      added++;
    }
    saveDrugLibraryToStorage();
    renderSettingsDrugs();
    rebuildDrugGenericDatalist();
    showToast(added + ' row(s) imported from CSV ✓', 's');
    inp.value = '';
  };
  reader.readAsText(file);
}

function renderSettingsDrugs() {
  const el = document.getElementById('set-drugs-list'); if(!el) return;
  el.innerHTML = DRUG_LIBRARY.map((d,i) => `<div style="display:flex;align-items:center;gap:9px;padding:9px;background:var(--g6);border-radius:8px;margin-bottom:6px">
    <div style="width:28px;height:28px;border-radius:6px;background:${d.type==='Eye Drop'?'var(--blue-lt)':d.type==='Tablet'?'var(--green-lt)':'var(--purple-lt)'};display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">${d.type==='Eye Drop'?'💧':d.type==='Tablet'?'💊':'🧴'}</div>
    <div style="flex:1"><div style="font-size:12.5px;font-weight:800">${d.trade} <span style="font-size:10.5px;color:var(--g1);font-weight:500">(${d.generic})</span>${d.company ? ` <span style="font-size:10px;color:var(--bmh-teal)">${d.company}</span>` : ''}</div>
    <div style="font-size:10.5px;color:var(--g1)">${d.type} · ${d.freq} · ${d.dur} · ${d.dept}</div></div>
    <button type="button" class="btn btn-xs btn-outline" onclick="openEditDrugLibrary(${i})" title="Edit type, form, defaults">✎</button>
    <button class="btn btn-xs btn-gray" onclick="removeDrugLib(${i})">✕</button>
  </div>`).join('');
  rebuildDrugGenericDatalist();
}
function addDrugToLibraryFromModal() {
  const type = document.getElementById('md-add-type')?.value;
  const trade = document.getElementById('md-add-trade')?.value?.trim();
  const generic = document.getElementById('md-add-generic')?.value?.trim();
  const freq = document.getElementById('md-add-freq')?.value;
  const dur = document.getElementById('md-add-dur')?.value;
  const dept = document.getElementById('md-add-dept')?.value;
  if (!trade || !generic) { showToast('Enter trade and generic name', 'w'); return; }
  DRUG_LIBRARY.push({ type, trade, generic, freq, dur, dept });
  saveDrugLibraryToStorage();
  renderSettingsDrugs();
  showToast('💊 ' + trade + ' added to library ✓', 's');
  closeM('m-add-drug');
  ['md-add-trade','md-add-generic'].forEach(id => { const x = document.getElementById(id); if (x) x.value = ''; });
}
function openEditDrugLibrary(i) {
  const d = DRUG_LIBRARY[i];
  if (!d) return;
  document.getElementById('md-edit-idx').value = String(i);
  document.getElementById('md-edit-type').value = d.type || 'Tablet';
  document.getElementById('md-edit-trade').value = d.trade || '';
  document.getElementById('md-edit-generic').value = d.generic || '';
  document.getElementById('md-edit-freq').value = d.freq || 'Twice daily (BD)';
  document.getElementById('md-edit-dur').value = d.dur || '1 Week';
  document.getElementById('md-edit-dept').value = d.dept || 'All';
  openM('m-edit-drug');
}
function saveEditDrugLibrary() {
  const i = parseInt(document.getElementById('md-edit-idx')?.value, 10);
  if (Number.isNaN(i) || !DRUG_LIBRARY[i]) return;
  DRUG_LIBRARY[i].type = document.getElementById('md-edit-type')?.value;
  DRUG_LIBRARY[i].trade = document.getElementById('md-edit-trade')?.value?.trim();
  DRUG_LIBRARY[i].generic = document.getElementById('md-edit-generic')?.value?.trim();
  DRUG_LIBRARY[i].freq = document.getElementById('md-edit-freq')?.value;
  DRUG_LIBRARY[i].dur = document.getElementById('md-edit-dur')?.value;
  DRUG_LIBRARY[i].dept = document.getElementById('md-edit-dept')?.value;
  saveDrugLibraryToStorage();
  renderSettingsDrugs();
  rebuildDrugGenericDatalist();
  closeM('m-edit-drug');
  showToast('Drug library updated ✓', 's');
}

function addDrugToLibrary() {
  const type = document.getElementById('new-drug-type')?.value;
  const trade = document.getElementById('new-drug-trade')?.value;
  const generic = document.getElementById('new-drug-generic')?.value;
  const freq = document.getElementById('new-drug-freq')?.value;
  const dur = document.getElementById('new-drug-dur')?.value;
  const dept = document.getElementById('new-drug-dept')?.value;
  if(!trade||!generic){showToast('Please enter trade and generic name','w');return;}
  DRUG_LIBRARY.push({type,trade,generic,freq,dur,dept});
  saveDrugLibraryToStorage();
  renderSettingsDrugs();
  showToast(`💊 ${trade} added to library ✓`,'s');
  closeM('m-add-drug');
}
function removeDrugLib(i){DRUG_LIBRARY.splice(i,1);saveDrugLibraryToStorage();renderSettingsDrugs();}
function filterDrugs(v) {
  const el = document.getElementById('set-drugs-list'); if (!el) return;
  const q = (v || '').toLowerCase().trim();
  const typeSel = document.querySelector('#set-drugs select');
  const t = typeSel && typeSel.value;
  const rows = DRUG_LIBRARY.map((d, i) => ({ d, i })).filter(({ d }) => {
    if (t && d.type !== t) return false;
    if (!q) return true;
    return d.trade.toLowerCase().includes(q) || d.generic.toLowerCase().includes(q) || (d.company && String(d.company).toLowerCase().includes(q));
  });
  el.innerHTML = rows.map(({ d, i }) => `<div style="display:flex;align-items:center;gap:9px;padding:9px;background:var(--g6);border-radius:8px;margin-bottom:6px">
    <div style="width:28px;height:28px;border-radius:6px;background:${d.type==='Eye Drop'?'var(--blue-lt)':d.type==='Tablet'?'var(--green-lt)':'var(--purple-lt)'};display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0">${d.type==='Eye Drop'?'💧':d.type==='Tablet'?'💊':'🧴'}</div>
    <div style="flex:1"><div style="font-size:12.5px;font-weight:800">${d.trade} <span style="font-size:10.5px;color:var(--g1);font-weight:500">(${d.generic})</span>${d.company ? ` <span style="font-size:10px;color:var(--bmh-teal)">${d.company}</span>` : ''}</div>
    <div style="font-size:10.5px;color:var(--g1)">${d.type} · ${d.freq} · ${d.dur} · ${d.dept}</div></div>
    <button type="button" class="btn btn-xs btn-outline" onclick="openEditDrugLibrary(${i})">✎</button>
    <button class="btn btn-xs btn-gray" onclick="removeDrugLib(${i})">✕</button>
  </div>`).join('');
}
function filterDrugsByType() {
  const inp = document.querySelector('#set-drugs input[placeholder*="Search drugs"]');
  filterDrugs(inp ? inp.value : '');
}
const ICD10_DB = [
  // CATARACT
  {code:'H26.9',desc:'Cataract, unspecified',full:'H26.9 — Cataract, unspecified'},
  {code:'H26.0',desc:'Infantile and juvenile cataract',full:'H26.0 — Infantile and juvenile cataract'},
  {code:'H26.1',desc:'Traumatic cataract',full:'H26.1 — Traumatic cataract'},
  {code:'H25.1',desc:'Age-related nuclear cataract',full:'H25.1 — Age-related nuclear cataract'},
  {code:'H25.0',desc:'Age-related cortical cataract',full:'H25.0 — Age-related cortical cataract'},
  {code:'H25.2',desc:'Age-related posterior subcapsular cataract',full:'H25.2 — Posterior subcapsular cataract'},
  {code:'H26.3',desc:'Drug-induced cataract',full:'H26.3 — Drug-induced cataract'},
  {code:'H28',desc:'Cataract in diseases classified elsewhere (diabetic)',full:'H28 — Diabetic cataract'},
  // GLAUCOMA
  {code:'H40.1',desc:'Open-angle glaucoma',full:'H40.1 — Open-angle glaucoma'},
  {code:'H40.10',desc:'Unspecified open-angle glaucoma',full:'H40.10 — Unspecified open-angle glaucoma'},
  {code:'H40.11',desc:'Primary open-angle glaucoma',full:'H40.11 — Primary open-angle glaucoma (POAG)'},
  {code:'H40.2',desc:'Primary angle-closure glaucoma',full:'H40.2 — Primary angle-closure glaucoma (PACG)'},
  {code:'H40.20',desc:'Unspecified primary angle-closure glaucoma',full:'H40.20 — Acute angle-closure glaucoma'},
  {code:'H40.0',desc:'Glaucoma suspect',full:'H40.0 — Glaucoma suspect'},
  {code:'H40.3',desc:'Glaucoma secondary to eye trauma',full:'H40.3 — Traumatic glaucoma'},
  {code:'H40.4',desc:'Glaucoma secondary to eye inflammation',full:'H40.4 — Inflammatory glaucoma'},
  {code:'H40.5',desc:'Glaucoma secondary to other eye disorders',full:'H40.5 — Secondary glaucoma'},
  {code:'H40.6',desc:'Glaucoma secondary to drugs',full:'H40.6 — Steroid-induced glaucoma'},
  {code:'Q15.0',desc:'Congenital glaucoma / Buphthalmos',full:'Q15.0 — Congenital glaucoma'},
  {code:'H42',desc:'Glaucoma in diseases classified elsewhere',full:'H42 — Glaucoma in systemic disease'},
  // DIABETIC RETINOPATHY
  {code:'H35.0',desc:'Background retinopathy and retinal vascular changes',full:'H35.0 — Non-proliferative diabetic retinopathy (NPDR)'},
  {code:'H35.01',desc:'Mild nonproliferative retinopathy',full:'H35.01 — Mild NPDR'},
  {code:'H35.02',desc:'Moderate nonproliferative retinopathy',full:'H35.02 — Moderate NPDR'},
  {code:'H35.03',desc:'Severe nonproliferative retinopathy',full:'H35.03 — Severe NPDR'},
  {code:'H35.04',desc:'Proliferative diabetic retinopathy',full:'H35.04 — Proliferative diabetic retinopathy (PDR)'},
  {code:'H35.05',desc:'Diabetic macular oedema',full:'H35.05 — Diabetic macular oedema (DME)'},
  // MACULAR DEGENERATION
  {code:'H35.3',desc:'Degeneration of macula and posterior pole',full:'H35.3 — Age-related macular degeneration (ARMD)'},
  {code:'H35.31',desc:'Nonexudative ARMD (dry)',full:'H35.31 — Dry ARMD'},
  {code:'H35.32',desc:'Exudative ARMD (wet)',full:'H35.32 — Wet ARMD / CNV'},
  {code:'H35.33',desc:'Angioid streaks of macula',full:'H35.33 — Angioid streaks'},
  {code:'H35.35',desc:'Cystoid macular degeneration',full:'H35.35 — Cystoid macular oedema (CME)'},
  // CORNEAL CONDITIONS
  {code:'H16.0',desc:'Corneal ulcer',full:'H16.0 — Corneal ulcer'},
  {code:'H16.1',desc:'Other and unspecified superficial keratitis',full:'H16.1 — Superficial punctate keratitis (SPK)'},
  {code:'H18.0',desc:'Corneal pigmentations and deposits',full:'H18.0 — Corneal deposits / KPs'},
  {code:'H18.4',desc:'Corneal degeneration',full:'H18.4 — Corneal degeneration (band keratopathy)'},
  {code:'H18.6',desc:'Keratoconus',full:'H18.6 — Keratoconus'},
  {code:'H18.5',desc:'Hereditary corneal dystrophies',full:'H18.5 — Corneal dystrophy'},
  {code:'H17',desc:'Corneal scars and opacities',full:'H17 — Corneal scar / leukoma / nebula'},
  {code:'H19.3',desc:'Keratitis in viral diseases',full:'H19.3 — Herpetic keratitis (HSV)'},
  // RETINAL CONDITIONS
  {code:'H33.0',desc:'Retinal detachment with retinal break',full:'H33.0 — Rhegmatogenous retinal detachment (RRD)'},
  {code:'H33.4',desc:'Traction retinal detachment',full:'H33.4 — Tractional retinal detachment (TRD)'},
  {code:'H34.1',desc:'Central retinal artery occlusion',full:'H34.1 — CRAO'},
  {code:'H34.2',desc:'Other retinal artery occlusions',full:'H34.2 — Branch retinal artery occlusion (BRAO)'},
  {code:'H34.8',desc:'Other retinal vascular occlusions',full:'H34.8 — Branch retinal vein occlusion (BRVO)'},
  {code:'H34.81',desc:'Central retinal vein occlusion',full:'H34.81 — CRVO'},
  {code:'H35.1',desc:'Retinopathy of prematurity',full:'H35.1 — Retinopathy of prematurity (ROP)'},
  {code:'H47.1',desc:'Papilloedema',full:'H47.1 — Papilloedema'},
  {code:'H47.2',desc:'Optic atrophy',full:'H47.2 — Optic atrophy'},
  {code:'H46',desc:'Optic neuritis',full:'H46 — Optic neuritis'},
  // LENS CONDITIONS
  {code:'H27.0',desc:'Aphakia',full:'H27.0 — Aphakia'},
  {code:'H27.1',desc:'Dislocation of lens',full:'H27.1 — Subluxated / dislocated lens'},
  {code:'Z96.1',desc:'Presence of intraocular lens',full:'Z96.1 — IOL in situ (post-op cataract)'},
  // STRABISMUS
  {code:'H50.0',desc:'Convergent concomitant strabismus (Esotropia)',full:'H50.0 — Esotropia'},
  {code:'H50.1',desc:'Divergent concomitant strabismus (Exotropia)',full:'H50.1 — Exotropia'},
  {code:'H50.2',desc:'Vertical strabismus',full:'H50.2 — Vertical strabismus / hypertropia'},
  {code:'H50.3',desc:'Intermittent heterotropia',full:'H50.3 — Intermittent exotropia'},
  {code:'H50.4',desc:'Other and unspecified heterotropia',full:'H50.4 — Paralytic strabismus'},
  // AMBLYOPIA
  {code:'H53.0',desc:'Amblyopia ex anopsia',full:'H53.0 — Amblyopia'},
  {code:'H53.01',desc:'Deprivation amblyopia',full:'H53.01 — Deprivation amblyopia'},
  {code:'H53.02',desc:'Refractive amblyopia',full:'H53.02 — Refractive amblyopia'},
  {code:'H53.03',desc:'Strabismic amblyopia',full:'H53.03 — Strabismic amblyopia'},
  // REFRACTIVE ERRORS
  {code:'H52.1',desc:'Myopia',full:'H52.1 — Myopia'},
  {code:'H52.0',desc:'Hypermetropia',full:'H52.0 — Hypermetropia'},
  {code:'H52.2',desc:'Astigmatism',full:'H52.2 — Astigmatism'},
  {code:'H52.4',desc:'Presbyopia',full:'H52.4 — Presbyopia'},
  {code:'H52.5',desc:'Disorders of accommodation',full:'H52.5 — Accommodation disorder'},
  // EYELID CONDITIONS
  {code:'H02.4',desc:'Ptosis of eyelid',full:'H02.4 — Ptosis of eyelid'},
  {code:'H02.0',desc:'Entropion and trichiasis of eyelid',full:'H02.0 — Entropion / trichiasis'},
  {code:'H02.1',desc:'Ectropion of eyelid',full:'H02.1 — Ectropion'},
  {code:'H00.0',desc:'Hordeolum (stye)',full:'H00.0 — Hordeolum / Stye'},
  {code:'H00.1',desc:'Chalazion',full:'H00.1 — Chalazion / meibomian cyst'},
  {code:'H01.0',desc:'Blepharitis',full:'H01.0 — Blepharitis'},
  {code:'H02.5',desc:'Other disorders affecting eyelid function',full:'H02.5 — Lagophthalmos / lid retraction'},
  // LACRIMAL CONDITIONS
  {code:'H04.3',desc:'Acute and unspecified dacryocystitis',full:'H04.3 — Dacryocystitis (DCR indication)'},
  {code:'H04.0',desc:'Dacryoadenitis',full:'H04.0 — Dacryoadenitis'},
  {code:'H04.2',desc:'Epiphora',full:'H04.2 — Epiphora / watering eye'},
  {code:'H04.5',desc:'Stenosis and insufficiency of lacrimal passages',full:'H04.5 — Nasolacrimal duct obstruction (NLDO)'},
  // CONJUNCTIVITIS
  {code:'H10.1',desc:'Acute atopic conjunctivitis',full:'H10.1 — Allergic conjunctivitis'},
  {code:'H10.0',desc:'Mucopurulent conjunctivitis',full:'H10.0 — Bacterial conjunctivitis'},
  {code:'H10.2',desc:'Other acute conjunctivitis',full:'H10.2 — Viral conjunctivitis'},
  {code:'H10.3',desc:'Unspecified acute conjunctivitis',full:'H10.3 — Acute conjunctivitis'},
  {code:'H10.4',desc:'Chronic conjunctivitis',full:'H10.4 — Chronic conjunctivitis / VKC'},
  {code:'H11.0',desc:'Pterygium',full:'H11.0 — Pterygium'},
  {code:'H11.1',desc:'Conjunctival degenerations and deposits',full:'H11.1 — Pinguecula / conjunctival degeneration'},
  {code:'H11.3',desc:'Conjunctival haemorrhage',full:'H11.3 — Subconjunctival haemorrhage'},
  // UVEITIS
  {code:'H20.0',desc:'Acute and subacute iridocyclitis',full:'H20.0 — Acute anterior uveitis (AAU)'},
  {code:'H20.1',desc:'Chronic iridocyclitis',full:'H20.1 — Chronic anterior uveitis'},
  {code:'H20.9',desc:'Iridocyclitis, unspecified',full:'H20.9 — Uveitis, unspecified'},
  {code:'H30.0',desc:'Focal chorioretinal inflammation',full:'H30.0 — Focal chorioretinitis'},
  {code:'H30.9',desc:'Unspecified chorioretinal inflammation',full:'H30.9 — Posterior uveitis / panuveitis'},
  // TRAUMA
  {code:'S05.0',desc:'Injury of conjunctiva and corneal abrasion',full:'S05.0 — Conjunctival / corneal injury'},
  {code:'S05.1',desc:'Contusion of eyeball and orbital tissues',full:'S05.1 — Blunt eye trauma'},
  {code:'T26',desc:'Burns and corrosions confined to eye and adnexa',full:'T26 — Chemical / thermal eye burn'},
  // POST-OP / FOLLOW-UP
  {code:'Z01.0',desc:'Examination of eyes and vision',full:'Z01.0 — Routine eye examination'},
  {code:'Z09',desc:'Follow-up examination after completed treatment',full:'Z09 — Post-op follow-up'},
  {code:'Z96.1',desc:'Presence of intraocular lens',full:'Z96.1 — IOL in situ'},
  // SYSTEMIC CONDITIONS AFFECTING EYE
  {code:'E11.3',desc:'Type 2 diabetes with ophthalmic complications',full:'E11.3 — T2DM with eye complications'},
  {code:'E10.3',desc:'Type 1 diabetes with ophthalmic complications',full:'E10.3 — T1DM with eye complications'},
  {code:'I10',desc:'Essential (primary) hypertension',full:'I10 — Hypertension'},
  {code:'E11.9',desc:'Type 2 diabetes mellitus without complications',full:'E11.9 — Type 2 diabetes mellitus'},
  {code:'M32',desc:'Systemic lupus erythematosus',full:'M32 — SLE'},
  {code:'M05',desc:'Rheumatoid arthritis with rheumatoid factor',full:'M05 — Rheumatoid arthritis'},
  {code:'D59',desc:'Acquired haemolytic anaemia',full:'D59 — Haemolytic anaemia'},
  {code:'G35',desc:'Multiple sclerosis',full:'G35 — Multiple sclerosis (optic neuritis)'},
  {code:'A18.5',desc:'Tuberculosis of eye',full:'A18.5 — Ocular tuberculosis'},
  {code:'B00.5',desc:'Herpesviral ocular disease',full:'B00.5 — Herpes simplex eye disease'},
  {code:'B02.3',desc:'Zoster ocular disease',full:'B02.3 — Herpes zoster ophthalmicus (HZO)'},
  // OBG
  {code:'O82',desc:'Caesarean delivery',full:'O82 — LSCS'},
  {code:'O34.2',desc:'Maternal care for scar from previous caesarean',full:'O34.2 — Previous LSCS scar'},
  // PSYCH
  {code:'F32.1',desc:'Moderate depressive episode',full:'F32.1 — Moderate Depression'},
  {code:'F41.1',desc:'Generalised anxiety disorder',full:'F41.1 — Generalised Anxiety'},
  // SKIN
  {code:'L70.0',desc:'Acne vulgaris',full:'L70.0 — Acne Vulgaris'},
  {code:'L81.1',desc:'Chloasma / Melasma',full:'L81.1 — Melasma'},
];

const OT_CASES = [];

let activeOTCase = null;


// INIT
// ═══════════════════════════════════════
// Populate patient selectors used in modals
function populateSelectors() {
  ['sp-pt','apt-pt-sel','ipd-pt-sel','xref-pt-sel'].forEach(id=>{
    const s=document.getElementById(id); if(s) s.innerHTML=PATIENTS.map(p=>`<option value="${p.bmhId}">${p.name} — ${p.bmhId}</option>`).join('');
  });
  ['use-pt'].forEach(id=>{
    const s=document.getElementById(id); if(s) s.innerHTML=PATIENTS.map(p=>`<option value="${p.bmhId}">${p.name} — ${p.bmhId}</option>`).join('');
  });
  updateNPDr();
}
// Deferred init — runs after ALL declarations are parsed
// This prevents "Cannot access X before initialization" TDZ errors
window.addEventListener('DOMContentLoaded', function() {
  try { loadBmhFinancials && loadBmhFinancials(); } catch (e) {}
  try { loadInventoryStockFromStorage && loadInventoryStockFromStorage(); } catch (e) {}
  try { renderDashboard && renderDashboard(); } catch(e) {}
  try { renderIPD && renderIPD(); } catch(e) {}
  try { initQR && initQR(); } catch(e) {}
  try { renderRxDrugs && renderRxDrugs(); } catch(e) {}
  try { renderInvestigationChooser && renderInvestigationChooser(); } catch(e) {}
  try { loadInvestigationTemplatesFromStorage && loadInvestigationTemplatesFromStorage(); } catch(e) {}
  try { refreshInvestigationTemplateSelect && refreshInvestigationTemplateSelect(); } catch(e) {}
  try { buildRefractionDropdowns && buildRefractionDropdowns(); } catch(e) {}
  try { buildRatingScales && buildRatingScales(); } catch(e) {}
  try { initObgSelects && initObgSelects(); } catch(e) {}
  try { calcEDD && calcEDD(); } catch(e) {}
  try { toggleObgWorkflow && toggleObgWorkflow(); } catch(e) {}
  try { toggleObgGuidedSections && toggleObgGuidedSections(); } catch(e) {}
  try { renderObgInvestigationSummary && renderObgInvestigationSummary(); } catch(e) {}
  try { updateObgComputedFields && updateObgComputedFields(); } catch(e) {}
  try { togglePsychTracks && togglePsychTracks(); } catch(e) {}
  try { renderPsychRail && renderPsychRail(); } catch(e) {}
  try { toggleRefractivePanel && toggleRefractivePanel(); } catch(e) {}
  try { renderSkinRail && renderSkinRail(); } catch(e) {}
  try { renderOphthoRecap && renderOphthoRecap(); } catch(e) {}
  try { populateSelectors && populateSelectors(); } catch(e) {}
  const aptInp = document.getElementById('apt-date-inp');
  if(aptInp) aptInp.value = new Date().toISOString().split('T')[0];
  const pnDate = document.getElementById('pn-date');
  if(pnDate) pnDate.value = new Date().toISOString().split('T')[0];
  const pnTime = document.getElementById('pn-time');
  if(pnTime) pnTime.value = new Date().toTimeString().slice(0,5);
  // Restore saved credentials
  try {
    const saved = localStorage.getItem('bmh_creds');
    if(saved) {
      const creds = JSON.parse(saved);
      const ui = document.getElementById('lg-email') || document.getElementById('lg-user');
      const pi = document.getElementById('lg-pass');
      const ri = document.getElementById('lg-remember');
      if(ui && creds.u) ui.value = creds.u;
      if(pi && creds.p) pi.value = creds.p;
      if(ri) ri.checked = true;
    }
  } catch(e) {}
  document.querySelectorAll('.obg-lab').forEach(box => box.addEventListener('change', renderObgInvestigationSummary));
  ['obg-risk','obg-main-complaint','obg-systemic','obg-bp','obg-urine-protein','obg-fetal-movement','obg-warning','obg-cycle','obg-discharge','obg-pelvic-pain','obg-clinical-impression','obg-infertility-type','obg-ovulation','obg-tubal-risk','obg-semen']
    .forEach(id => document.getElementById(id)?.addEventListener('change', updateObgComputedFields));
  ['obg-anc-booking','obg-anc-warning','obg-anc-highrisk','obg-anc-fetal','obg-gyn-aub','obg-gyn-discharge','obg-gyn-pain','obg-gyn-menopause','obg-inf-ovulatory','obg-inf-tubal','obg-inf-endo','obg-inf-male','obg-redflag-bleeding','obg-redflag-leak','obg-redflag-headache','obg-redflag-pain','obg-redflag-fever','obg-redflag-decreasedfm','obg-redflag-swelling','obg-redflag-convulsions','obg-hr-prevlscs','obg-hr-gdm','obg-hr-pih','obg-hr-iugr','obg-hr-multiple','obg-hr-rhneg','obg-hr-placenta','obg-hr-anemia','obg-fetal-growthlag','obg-fetal-malpresentation','obg-fetal-lowliquor','obg-fetal-postdates','obg-aub-clots','obg-aub-intermenstrual','obg-aub-postcoital','obg-aub-anemia','obg-vag-pruritus','obg-vag-foul','obg-vag-dyspareunia','obg-vag-pidrisk','obg-pain-cyclical','obg-pain-severe','obg-pain-bowel','obg-pain-infertility','obg-inf-coital','obg-inf-pastpid','obg-inf-priorsurgery','obg-inf-galactorrhoea','obg-inf-hirsutism','obg-inf-maleabn','obg-inf-lowreserve','obg-inf-rpl']
    .forEach(id => document.getElementById(id)?.addEventListener('change', () => { toggleObgGuidedSections && toggleObgGuidedSections(); updateObgComputedFields && updateObgComputedFields(); }));
  ['psych-chief','psych-duration','psych-onset','psych-trigger','psych-core-syndrome','psych-risk','psych-systemic','psych-sleep','psych-appetite','psych-function','psych-diagnosis','psych-family','psych-personal','psych-pastpsych','psych-medical','psych-substance','psych-suicidality','psych-anxiety','psych-psychosis','psych-polarity','psych-addiction-substance','psych-addiction-pattern','psych-addiction-lastuse','psych-addiction-readiness','psych-stroke-deficit','psych-stroke-timing','psych-stroke-mood','psych-epilepsy-type','psych-epilepsy-last','psych-epilepsy-adherence','psych-epilepsy-trigger','psych-child-concern','psych-child-development','psych-child-school','psych-child-parent','psych-appearance','psych-behaviour','psych-psychomotor','psych-eyecontact','psych-speech-rate','psych-speech-volume','psych-speech-tone','psych-subjective-mood','psych-affect','psych-thought-form','psych-thought-content','psych-hallucinations','psych-orientation','psych-memory','psych-insight','psych-judgement']
    .forEach(id => document.getElementById(id)?.addEventListener('change', renderPsychRail));
  ['psych-chief','psych-trigger','psych-family','psych-personal','psych-pastpsych','psych-medical','psych-substance','psych-child-parent','psych-speech-tone','psych-subjective-mood']
    .forEach(id => document.getElementById(id)?.addEventListener('input', renderPsychRail));
  ['skin-chief','skin-duration','skin-site','skin-fit','skin-primary-dx','skin-secondary-dx','skin-routine','skin-medical','skin-hormonal','skin-lesion','skin-secondary-change','skin-distribution','skin-configuration','skin-hair','skin-nail','skin-dermoscopy','skin-cosm-acne-grade','skin-cosm-sensitivity','skin-cosm-pih','skin-cosm-isotret','skin-cosm-tan','skin-cosm-preg']
    .forEach(id => {
      document.getElementById(id)?.addEventListener('change', renderSkinRail);
      document.getElementById(id)?.addEventListener('input', renderSkinRail);
    });
  ['skin-cosm-melasma','skin-cosm-acne','skin-cosm-scar','skin-cosm-ageing','skin-cosm-sensitive','skin-cosm-hair']
    .forEach(id => document.getElementById(id)?.addEventListener('change', renderSkinRail));
  document.getElementById('refr-enable')?.addEventListener('change', toggleRefractivePanel);
  ['refr-age','refr-stable','refr-occupation','refr-topo','refr-dryeye','refr-preg','refr-autoimmune','refr-kc','refr-allergy','refr-flap','refr-od-pachy','refr-os-pachy','subj-od-sph','subj-od-cyl','subj-os-sph','subj-os-cyl','pachy-od','pachy-os','iop-gat-od','iop-gat-os','phx-diabetes_mellit','phx-hypertension']
    .forEach(id => {
      document.getElementById(id)?.addEventListener('change', renderOphthoRecap);
      document.getElementById(id)?.addEventListener('input', renderOphthoRecap);
    });
  document.querySelectorAll('.cc-inp').forEach(el => el.addEventListener('input', renderOphthoRecap));
  // Set today's date on all date fields
  try { updateRcDr && updateRcDr(); } catch(e) {}
});
// ═══════════════════════════════════════
// V13 NEW FUNCTIONS
// ═══════════════════════════════════════

// DRUG LOOKUP
function lookupGeneric(trade) {
  const drug = DRUG_LIBRARY.find(d=>d.trade.toLowerCase().startsWith(trade.toLowerCase()));
  if(drug) { const g=document.getElementById('new-rx-generic'); if(g) g.value=drug.generic; }
}

// ADD RX DRUG FROM MODAL
function addRxDrugFromModal() {
  const type = document.getElementById('new-rx-type')?.value||'Eye Drop';
  const trade = document.getElementById('new-rx-trade')?.value||'';
  const generic = document.getElementById('new-rx-generic')?.value||'';
  const eye = document.getElementById('new-rx-eye')?.value||'OU';
  const freq = normalizeRxFreqLabel(document.getElementById('new-rx-freq')?.value||'Four times daily (QID)');
  const dur = normalizeRxDurationLabel(document.getElementById('new-rx-dur')?.value||'1 week');
  const inst = document.getElementById('new-rx-inst')?.value||'';
  if(!trade&&!generic){showToast('Enter drug name','w');return;}
  const today = new Date().toISOString().split('T')[0];
  RX_DRUGS.push({
    trade, brand: trade, generic, name: generic,
    drugType: type,
    eye:[eye.replace(/\s.*$/,'')],freq,dur,
    dateFrom: today, dateTo: '',
    taperRows: [],
    lang:{en:inst||''}
  });
  computeRxEndAndTaperDates(RX_DRUGS[RX_DRUGS.length - 1]);
  renderRxDrugs();
  showToast(`💊 ${trade||generic} added to prescription ✓`,'s');
  closeM('m-add-rx-drug');
}

function normalizeEyeLabelForRx(eye) {
  if (eye == null || eye === '') return ['Both Eyes (OU)'];
  const e = Array.isArray(eye) ? eye[0] : eye;
  const s = String(e);
  if (/left|OS/i.test(s) && !/Right/i.test(s)) return ['Left Eye (OS)'];
  if (/right|OD/i.test(s) && !/Left/i.test(s)) return ['Right Eye (OD)'];
  if (/both|OU|both eyes/i.test(s)) return ['Both Eyes (OU)'];
  if (s.includes('Eye (')) return [s];
  return [s];
}
function normalizeRxFreqLabel(freq) {
  const f = String(freq || '').trim();
  if(!f) return 'Twice daily (BD)';
  if (/Half-hourly/i.test(f)) return 'Half-hourly';
  if (/Hourly/i.test(f)) return 'Hourly';
  if (/Every 2 hours/i.test(f)) return 'Every 2 hours';
  if (/Every 3 hours/i.test(f)) return 'Every 3 hours';
  if (/Every 4 hours/i.test(f)) return 'Every 4 hours';
  if (/6x|Six times/i.test(f)) return 'Six times daily (6x/day)';
  if (/QID|Four times/i.test(f)) return 'Four times daily (QID)';
  if (/TDS|Three times/i.test(f)) return 'Three times daily (TDS)';
  if (/BD|Twice/i.test(f)) return 'Twice daily (BD)';
  if (/Once daily|\(OD\)/i.test(f)) return 'Once daily (OD)';
  if (/HS|bedtime/i.test(f)) return 'At bedtime (HS)';
  if (/weekly/i.test(f)) return 'Once weekly';
  if (/PRN|As needed/i.test(f)) return 'As needed (PRN)';
  if (/as\s*directed/i.test(f)) return 'Twice daily (BD)';
  return f;
}
function normalizeRxDurationLabel(dur) {
  const d = String(dur || '').trim();
  if(!d) return '1 week';
  if (/ongoing/i.test(d)) return 'Ongoing';
  if (/12\s*months?/i.test(d)) return '12 months';
  if (/6\s*months?/i.test(d)) return '6 months';
  if (/5\s*months?/i.test(d)) return '5 months';
  if (/4\s*months?/i.test(d)) return '4 months';
  if (/3\s*months?/i.test(d)) return '3 months';
  if (/2\s*months?/i.test(d)) return '2 months';
  if (/1\s*months?/i.test(d)) return '1 month';
  if (/6\s*weeks?/i.test(d)) return '6 weeks';
  if (/4\s*weeks?/i.test(d)) return '4 weeks';
  if (/3\s*weeks?/i.test(d)) return '3 weeks';
  if (/2\s*weeks?/i.test(d)) return '2 weeks';
  if (/1\s*weeks?/i.test(d)) return '1 week';
  if (/13\s*days?/i.test(d)) return '13 days';
  if (/7\s*days?/i.test(d)) return '7 days';
  if (/6\s*days?/i.test(d)) return '6 days';
  if (/5\s*days?/i.test(d)) return '5 days';
  if (/4\s*days?/i.test(d)) return '4 days';
  if (/3\s*days?/i.test(d)) return '3 days';
  if (/2\s*days?/i.test(d)) return '2 days';
  if (/1\s*days?/i.test(d)) return '1 day';
  if (/½|half/i.test(d)) return '½ day';
  return d;
}
// APPLY TEMPLATE
function applyRxTemplate(tplId) {
  if(!tplId) return;
  const tpl = RX_TEMPLATES_DATA[tplId];
  if(!tpl) return;
  tpl.forEach(d => {
    const trade = d.trade;
    const gen = d.generic || d.trade;
    if(!trade || RX_DRUGS.find(r=>r.brand===trade || (gen && r.name===gen))) return;
    const eyeArr = normalizeEyeLabelForRx(d.eye);
    const today = new Date().toISOString().split('T')[0];
    RX_DRUGS.push({
      trade, brand: trade, generic: gen, name: gen,
      drugType: d.type || 'Eye Drop',
      eye: eyeArr,
      freq: normalizeRxFreqLabel(d.freq || 'Twice daily (BD)'),
      dur: normalizeRxDurationLabel(d.dur || '1 week'),
      dateFrom: today,
      dateTo: '',
      taperRows: [],
      lang:{en:gen+' '+(d.freq||'')+' '+eyeArr[0]+' '+(d.dur||''),hi:'',pa:''}
    });
    const taperRows = Array.isArray(d.taperRows) ? d.taperRows : (d.taperRow ? [d.taperRow] : []);
    RX_DRUGS[RX_DRUGS.length - 1].taperRows = taperRows.map(tr => ({
      freq: normalizeRxFreqLabel(tr.freq || suggestTaperFreqFromMain(d.freq || '')),
      dur: normalizeRxDurationLabel(tr.dur || d.dur || '1 week'),
      dateFrom: '',
      dateTo: ''
    }));
    computeRxEndAndTaperDates(RX_DRUGS[RX_DRUGS.length - 1]);
  });
  renderRxDrugs();
  showToast('Template applied ✓','s');
}
function applyLastRx() { showToast('Last visit prescription applied ✓','s'); }
const ICD10_EYE = [
  'H26.9 — Cataract, unspecified','H26.0 — Infantile/Juvenile cataract','H26.1 — Traumatic cataract',
  'H25.1 — Nuclear cataract','H25.0 — Cortical cataract','H25.2 — Posterior subcapsular cataract',
  'H40.1 — Open-angle glaucoma','H40.2 — Closed-angle glaucoma','H40.0 — Glaucoma suspect',
  'H40.3 — Glaucoma secondary to eye trauma',
  'H52.1 — Myopia','H52.0 — Hypermetropia','H52.2 — Astigmatism','H52.4 — Presbyopia',
  'H02.4 — Ptosis of eyelid','H04.0 — Dacryoadenitis','H04.2 — Epiphora',
  'H10.1 — Acute atopic conjunctivitis','H10.3 — Unspecified acute conjunctivitis',
  'H11.0 — Pterygium','H16.0 — Corneal ulcer','H16.1 — Other superficial keratitis',
  'H20.0 — Acute iridocyclitis','H30.9 — Chorioretinal inflammation',
  'H33.0 — Retinal detachment with retinal break',
  'H35.0 — Background retinopathy (DR)','H35.1 — Retinopathy of prematurity',
  'H35.3 — Degeneration of macula and posterior pole',
  'H34.1 — Central retinal artery occlusion','H34.8 — Other retinal vascular occlusions',
  'H47.1 — Papilloedema','H47.2 — Optic atrophy',
  'H50.0 — Convergent concomitant strabismus','H50.1 — Divergent concomitant strabismus',
  'H53.0 — Amblyopia ex anopsia','H54.0 — Blindness, both eyes',
  'S05.0 — Injury of conjunctiva and abrasion','Z01.0 — Routine eye examination',
];
window.ICD10_EYE = ICD10_EYE;
window.ICD10_DB = ICD10_DB;

/** ICD-10 autosuggest for prescription diagnosis rows (#rx-diagnosis-rows .rx-dx-line) */
function rxDxSuggest(inp) {
  const drop = inp.nextElementSibling;
  if (!drop || !drop.classList || !drop.classList.contains('rx-dx-drop')) return;
  const val = (inp.value || '').toLowerCase().trim();
  if (val.length < 1) { drop.style.display = 'none'; drop.innerHTML = ''; return; }
  const allDx = (window.ICD10_EYE || []).concat(window.ICD10_DB || []);
  const matches = [];
  allDx.forEach(function (entry) {
    const label = typeof entry === 'string' ? entry : (entry.full || (entry.code + ' — ' + entry.desc));
    const hay = String(label).toLowerCase();
    const code = entry && entry.code ? String(entry.code).toLowerCase() : '';
    if (hay.includes(val) || code.includes(val)) matches.push(label);
  });
  if (!matches.length) { drop.style.display = 'none'; drop.innerHTML = ''; return; }
  const esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  drop.innerHTML = matches.slice(0, 14).map(function (label) {
    const enc = encodeURIComponent(label);
    return '<div style="padding:5px 8px;cursor:pointer;font-size:11px;border-bottom:1px solid var(--g5);line-height:1.35" data-lbl="' + enc + '" onmousedown="event.preventDefault();rxDxApplyChoice(this)">' + esc(label) + '</div>';
  }).join('');
  drop.style.display = 'block';
}
function rxDxApplyChoice(el) {
  const raw = el && el.getAttribute && el.getAttribute('data-lbl');
  const label = raw ? decodeURIComponent(raw) : '';
  const wrap = el && el.closest && el.closest('div[style*="position:relative"]');
  const inp = wrap ? wrap.querySelector('.rx-dx-line') : null;
  const drop = wrap ? wrap.querySelector('.rx-dx-drop') : null;
  if (inp) inp.value = label;
  if (drop) { drop.style.display = 'none'; drop.innerHTML = ''; }
  if (inp) inp.focus();
}
document.addEventListener('click', function (e) {
  if (e.target.closest && (e.target.closest('.rx-dx-drop') || e.target.closest('.rx-dx-line'))) return;
  document.querySelectorAll('.rx-dx-drop').forEach(function (d) { d.style.display = 'none'; });
});

function addDiagnosis() {
  addDiagnosisRow();
  return;
  const list = document.getElementById('rx-diagnosis-list'); if(!list) return;
  const uid = 'dx-' + Date.now();
  const d = document.createElement('div');
  d.id = uid + '-row';
  d.style.cssText = 'display:flex;align-items:center;gap:7px;margin-bottom:5px;position:relative';
  d.innerHTML = `
    <div style="flex:1;position:relative">
      <input type="text" id="${uid}" placeholder="Type ICD-10 code or diagnosis name…" autocomplete="off"
        oninput="dxSuggest(this)"
        onkeydown="if(event.key==='Enter'){event.preventDefault();dxConfirm(this)}"
        style="width:100%;font-size:11.5px;padding:5px 8px;border:1.5px solid var(--blue);border-radius:6px">
      <div id="${uid}-drop" style="display:none;position:absolute;z-index:400;background:#fff;border:1.5px solid var(--blue);border-top:none;border-radius:0 0 8px 8px;width:100%;max-height:200px;overflow-y:auto;box-shadow:0 4px 12px rgba(0,0,0,.12)"></div>
    </div>
    <button onclick="dxConfirm(document.getElementById('${uid}'))" style="background:var(--blue);color:#fff;border:none;border-radius:6px;padding:5px 10px;font-size:11px;font-weight:800;cursor:pointer">✓ Add</button>
    <button class="btn btn-xs btn-gray" onclick="document.getElementById('${uid}-row').remove()">✕</button>`;
  list.appendChild(d);
  document.getElementById(uid)?.focus();
}
function dxConfirm(inp) {
  const val = inp.value.trim();
  if(!val) return;
  const list = document.getElementById('rx-diagnosis-list');
  if(!list) return;
  const rowId = inp.id + '-row';
  const row = document.getElementById(rowId) || inp.closest('[id$="-row"]');
  // Create tag
  const tag = document.createElement('span');
  tag.className = 'dx-tag';
  tag.style.cssText = 'display:inline-flex;align-items:center;gap:5px;background:var(--blue-lt);color:var(--blue);border:1.5px solid var(--blue);border-radius:20px;padding:3px 11px;font-size:11.5px;font-weight:700;margin:3px 4px 3px 0';
  tag.innerHTML = `${val} <span onclick="this.closest('.dx-tag').remove()" style="cursor:pointer;font-size:13px;opacity:.7;line-height:1">&times;</span>`;
  list.appendChild(tag);
  if(row) row.remove();
  else if(inp.closest('div')) inp.closest('div[id$="-row"]')?.remove() || inp.closest('div').remove();
}
function dxSuggest(inp) {
  const val = inp.value.toLowerCase();
  const dropId = inp.id + '-drop';
  const drop = document.getElementById(dropId); if(!drop) return;
  if(!val || val.length < 2) { drop.style.display='none'; return; }
  const allDx = (window.ICD10_EYE||[]).concat(window.ICD10_DB||[]);
  const matches = allDx.filter(s => {
    if(typeof s === 'string') return s.toLowerCase().includes(val);
    return (s.full||s.desc||'').toLowerCase().includes(val) || (s.code||'').toLowerCase().includes(val);
  }).map(s => typeof s === 'string' ? s : (s.full || s.code + ' — ' + s.desc));
  if(!matches.length) { drop.style.display='none'; return; }
  drop.innerHTML = matches.slice(0,12).map(s =>
    `<div style="padding:6px 12px;cursor:pointer;font-size:11.5px;border-bottom:1px solid var(--g5)"
      onmousedown="event.preventDefault();document.getElementById('${inp.id}').value='${s.replace(/'/g,"\\'").replace(/"/g,'&quot;')}';document.getElementById('${inp.id}-drop').style.display='none';dxConfirm(document.getElementById('${inp.id}'))"
      onmouseover="this.style.background='var(--blue-lt)'" onmouseout="this.style.background=''">${s}</div>`
  ).join('');
  drop.style.display = 'block';
}
document.addEventListener('click', e=>{
  document.querySelectorAll('[id$="-drop"]').forEach(d=>{
    if(d.id.startsWith('dx-') && !d.previousElementSibling?.contains(e.target)) d.style.display='none';
  });
});

function setFollowupDays(n, unit) {
  const d = new Date();
  const u = (unit||'').toLowerCase();
  if(u==='d'||u==='day') d.setDate(d.getDate()+n);
  else if(u==='w'||u==='week') d.setDate(d.getDate()+n*7);
  else if(u==='m'||u==='month') d.setMonth(d.getMonth()+n);
  const v = d.toISOString().split('T')[0];
  document.querySelectorAll('#rx-fu-date').forEach(e=>e.value=v);
  bookFollowupApt(d, n, unit);
}

function bookFollowupApt(date, n, unit) {
  const ptId   = document.querySelector('[id$="-rx-ptid"]')?.textContent||document.getElementById('ophtho-pt-uid')?.textContent||'';
  const ptName = document.querySelector('[id$="-rx-ptname"]')?.textContent||document.getElementById('ophtho-pt-nm')?.textContent||'Patient';
  const unitLabel = unit==='D'?'day':unit==='W'?'week':'month';
  const apt = {
    id:'APT-'+Date.now(), patient:ptName, bmhId:ptId,
    mob:PATIENTS.find(p=>p.bmhId===ptId)?.mob||'',
    date:date.toISOString().split('T')[0], time:normalizeAptTimeLabel(getNearestAppointmentSlot(date.toISOString().split('T')[0])),
    doctor:CURRENT_USER?.name||'Dr. Varun Baweja',
    dept:CURRENT_USER?.dept||'Ophthalmology', centre:CURRENT_USER?.centre||'CHD',
    purpose:'Follow-up ('+n+' '+unitLabel+(n>1?'s':'')+' review)',
    status:'booked', bookedAt:new Date().toISOString()
  };
  APPOINTMENTS.push(apt);
  if(window.FBDB) fbSet('appointments/'+apt.id, apt);
  renderAptDay && renderAptDay();
  showToast('📅 Follow-up booked: '+ptName+' on '+date.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),'s');
}
function filterPastVisits(type) { showToast(`Showing ${type==='all'?'all visits':type+' only'} ✓`,'i'); }

// INVESTIGATIONS
function toggleInvestigation(el, name, price) {
  const cb = el.querySelector('input[type=checkbox]');
  cb.checked = !cb.checked;
  el.style.background = cb.checked ? 'var(--blue-lt)' : 'var(--g6)';
  const idx = SELECTED_INVESTIGATIONS.findIndex(i=>i.name===name);
  if(cb.checked && idx===-1) SELECTED_INVESTIGATIONS.push({name,price});
  else if(!cb.checked && idx>-1) SELECTED_INVESTIGATIONS.splice(idx,1);
  syncSelectedInvestigationCheckboxes();
}
function confirmInvestigations() {
  if(!SELECTED_INVESTIGATIONS.length){showToast('No investigations selected','w');return;}
  const pt = window.CURRENT_PATIENT || PATIENTS.find(p => p.bmhId === (document.getElementById('ophtho-pt-uid')?.textContent || '').trim());
  if(!pt) { showToast('Open the patient record first','w'); return; }
  const orders = getCurrentPatientInvestigationOrders();
  const centre = pt.centre || CURRENT_USER?.centre || 'CHD';
  const doctor = document.getElementById('sbnm')?.textContent || CURRENT_USER?.name || 'Doctor';
  SELECTED_INVESTIGATIONS.forEach((inv, idx) => {
    const existing = orders.find(o => !o.done && o.name === inv.name);
    if(existing) return;
    const order = {
      id: 'INV' + Date.now() + idx,
      name: inv.name,
      notes: '',
      price: Number(inv.price) || 0,
      date: new Date().toLocaleDateString('en-IN'),
      done: false,
      patient: pt.name,
      bmhId: pt.bmhId,
      dept: pt.dept || CURRENT_USER?.dept || 'ophtho',
      centre,
      orderedBy: doctor
    };
    orders.push(order);
    PAY_REQUESTS.push({
      id:'PR'+Date.now()+Math.random(),
      patient:pt.name,
      bmhId:pt.bmhId,
      for:inv.name,
      amount:Number(inv.price)||0,
      status:'pending',
      from:doctor,
      dept:order.dept,
      centre,
      date:new Date().toISOString()
    });
  });
  syncCurrentPatientInvestigationOrders();
  persistCurrentPatientInvestigationOrders();
  showToast(`🧪 ${SELECTED_INVESTIGATIONS.length} investigation(s) ordered & sent to reception ✓`,'s');
  closeM('m-order-invest');
  clearSelectedInvestigations();
  renderOeInvOrderedList && renderOeInvOrderedList();
  renderInvestigationOrders && renderInvestigationOrders();
  renderDashboard();
}

// RECEPTION NEW FUNCTIONS
function toggleInsField() {
  const mode = document.getElementById('rc-pay-mode')?.value;
  const f1 = document.getElementById('rc-ins-field');
  const f2 = document.getElementById('rc-ins-policy');
  const show = mode==='Insurance/TPA'||mode==='PMJAY / Ayushman'||mode==='CGHS/ECHS';
  if(f1) f1.style.display = show?'flex':'none';
  if(f2) f2.style.display = show?'flex':'none';
}
function toggleRecInsField() {
  const mode = document.getElementById('rec-pay-mode-final')?.value;
  const f = document.getElementById('rec-ins-final');
  if(f) f.style.display = (mode==='Insurance/TPA')?'flex':'none';
}
function checkSurgeryPurpose() {
  const purpose = document.getElementById('rc-purpose')?.value || '';
  const panel = document.getElementById('rc-surgery-panel');
  const showSurg = purpose === 'Surgery' || purpose.includes('Surgery') || /cataract|pmics|phaco|iol|trabec|lasik|pteryg|squint|dcr|lscs|delivery|laparoscopy|ect|peel|prp/i.test(purpose);
  if(panel) panel.style.display = showSurg ? 'block' : 'none';
  // Show "pre-register" hint when Not Checked In
  const preHint = document.getElementById('rc-pre-hint');
  if(preHint) preHint.style.display = (purpose==='Not Checked In')?'flex':'none';
  syncReceptionConsultationFee && syncReceptionConsultationFee();
}
function lookupByBMHID(val) {
  const el = document.getElementById('rc-bmhid-result'); if(!el) return;
  if(!val || val.length < 3) { el.innerHTML=''; return; }
  const v = val.trim().toUpperCase();
  const vLow = val.trim().toLowerCase();
  // Search by BMSH ID, phone, or name
  const byId = PATIENTS.find(p => p.bmhId === v || p.bmhId.includes(v.replace('BMSH-','')));
  const byPhone = val.replace(/\s/g,'').length >= 6 ? PATIENTS.find(p => p.mob?.replace(/\s/g,'').includes(val.replace(/\s/g,''))) : null;
  const byName = val.length >= 3 ? PATIENTS.filter(p => p.name?.toLowerCase().includes(vLow)) : [];
  const single = byId || byPhone;
  if(single) {
    el.innerHTML = `<div style="background:var(--green-lt);border-radius:8px;padding:10px;border-left:3px solid var(--green)">
      <div style="display:flex;align-items:center;gap:8px">
        <div style="flex:1">
          <div style="font-size:11px;font-weight:800;color:#1a8c3c;margin-bottom:2px">✅ Found — existing patient</div>
          <div style="font-size:13px;font-weight:900">${single.name} <span style="font-size:10.5px;color:var(--g1);font-weight:500">(${single.age || '—'}Y / ${single.sex || '—'})</span></div>
          <div style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal)">${single.bmhId} · ${single.mob||'—'} · Visits: ${single.visitCount||1}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px">
          <button class="btn btn-xs btn-gold" onclick="prefillExistingPatient('${single.bmhId}')">✏️ Prefill &amp; Register</button>
          <button class="btn btn-xs btn-outline" onclick="openPatient('${single.bmhId}')">👁️ View Record</button>
        </div>
      </div>
    </div>`;
  } else if(byName.length) {
    // Show name search results (up to 5)
    const hits = byName.slice(0,5);
    el.innerHTML = `<div style="background:#fff;border:1.5px solid var(--blue);border-radius:8px;overflow:hidden">
      <div style="padding:5px 10px;background:var(--blue-lt);font-size:10px;font-weight:800;color:var(--blue);text-transform:uppercase">Found ${byName.length} patient${byName.length>1?'s':''} matching "${val}"</div>
      ${hits.map(p=>`<div style="display:flex;align-items:center;gap:9px;padding:8px 12px;cursor:pointer;border-bottom:1px solid var(--g5)" onmouseover="this.style.background='var(--g6)'" onmouseout="this.style.background=''">
        <div style="width:30px;height:30px;border-radius:50%;background:${p.color||'#1A3C6E'};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;flex-shrink:0">${p.initials||p.name[0]||'?'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:800;font-size:12.5px">${p.name}</div>
          <div style="font-size:10px;color:var(--g1);font-family:var(--mono)">${p.bmhId} · ${p.age||'?'}Y/${(p.sex||'?')[0]} · ${p.mob||'—'}</div>
        </div>
        <button class="btn btn-xs btn-gold" onclick="prefillExistingPatient('${p.bmhId}')">✏️ Prefill</button>
        <button class="btn btn-xs btn-outline" onclick="openPatient('${p.bmhId}')">👁️</button>
      </div>`).join('')}
    </div>`;
  } else {
    el.innerHTML = val.length >= 4 ? `<div style="font-size:11px;color:var(--g1);padding:5px 8px;background:var(--g6);border-radius:6px">🆕 No existing patient found — proceed with new registration below</div>` : '';
  }
}

function openQRScanner() {
  const modal = document.getElementById('m-qr-scanner');
  if(modal) { openM('m-qr-scanner'); return; }
  const div = document.createElement('div');
  div.id = 'm-qr-scanner';
  div.className = 'modal-ov';
  div.innerHTML = `<div class="modal" style="max-width:440px">
    <div class="modal-hd"><div class="modal-title">📷 Scan Patient QR Code</div><button class="modal-close" onclick="closeQRScanner()">✕</button></div>
    <div style="padding:16px">
      <div style="background:var(--g6);border-radius:8px;padding:12px;margin-bottom:12px;font-size:12px;color:var(--g1)">
        Point camera at the QR code on the patient's prescription. The BMSH ID will be extracted automatically.
      </div>
      <video id="qr-video" style="width:100%;border-radius:8px;background:#000;max-height:280px" autoplay playsinline></video>
      <div id="qr-scan-result" style="margin-top:10px;font-size:13px;font-weight:700;text-align:center;min-height:24px"></div>
      <div style="margin-top:10px;display:flex;gap:8px">
        <label class="btn btn-outline btn-sm" style="flex:1;justify-content:center;cursor:pointer">
          📁 Upload Image <input type="file" accept="image/*" style="display:none" onchange="readQRFromFile(this)">
        </label>
        <button class="btn btn-gray btn-sm" onclick="closeQRScanner()">Cancel</button>
      </div>
    </div>
  </div>`;
  document.body.appendChild(div);
  openM('m-qr-scanner');
  startQRCamera();
}

function startQRCamera() {
  const video = document.getElementById('qr-video');
  if(!video) return;
  navigator.mediaDevices?.getUserMedia({video:{facingMode:'environment'}}).then(stream=>{
    video._stream = stream;
    video.srcObject = stream;
  }).catch(()=>{ document.getElementById('qr-scan-result').textContent = 'Camera not available — use file upload instead'; });
}

function closeQRScanner() {
  const video = document.getElementById('qr-video');
  if(video?._stream) video._stream.getTracks().forEach(t=>t.stop());
  closeM('m-qr-scanner');
}

function readQRFromFile(input) {
  const file = input.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width=img.width; canvas.height=img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img,0,0);
      const el = document.getElementById('qr-scan-result');
      if(el) el.textContent = 'Processing image — if BMSH ID not detected, type it manually in the search field above.';
      const id = prompt('QR scan: Enter BMSH ID from the prescription if camera decode failed:','BMSH-');
      if(id) { closeQRScanner(); lookupByBMHID(id); const s=document.getElementById('rc-bmhid-search'); if(s) s.value=id; }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function lookupByPhone(val) {
  const matchEl = document.getElementById('rc-phone-match'); if(!matchEl) return;
  if(val.length < 7) { matchEl.innerHTML=''; return; }
  // Find all matches (multiple patients with similar phone)
  const matches = PATIENTS.filter(p=>p.mob&&p.mob.replace(/\s/g,'').includes(val.replace(/\s/g,'').slice(-7)));
  if(matches.length) {
    matchEl.innerHTML = matches.map(match=>`
      <div style="background:var(--green-lt);border-radius:8px;padding:10px;margin-bottom:6px;border-left:3px solid var(--green)">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1">
            <div style="font-size:11px;font-weight:800;color:#1a8c3c;margin-bottom:2px">✅ Existing patient found</div>
            <div style="font-size:12.5px;font-weight:900">${match.name} <span style="font-size:10.5px;color:var(--g1);font-weight:500">(${match.age||'?'}Y / ${match.sex||'?'})</span></div>
            <div style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal)">${match.bmhId} · Visits: ${match.visitCount||1}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            <button class="btn btn-xs btn-gold" onclick="prefillExistingPatient('${match.bmhId}')">✏️ Prefill &amp; Register</button>
            <button class="btn btn-xs btn-outline" onclick="openPatient('${match.bmhId}')">👁️ View Record</button>
          </div>
        </div>
      </div>`).join('');
  } else { matchEl.innerHTML=''; }
}
function prefillExistingPatient(bmhId) {
  const p = PATIENTS.find(x=>x.bmhId===bmhId); if(!p) return;
  const fn = document.getElementById('rc-fn'); if(fn) fn.value = p.name.split(' ')[0]||'';
  const ln = document.getElementById('rc-ln'); if(ln) ln.value = p.name.split(' ').slice(1).join(' ')||'';
  const rel = document.getElementById('rc-rel'); if(rel) rel.value = p.rel||'';
  const mob = document.getElementById('rc-mob-inp')||document.getElementById('rc-mob'); if(mob) mob.value = p.mob||'';
  const mob2 = document.getElementById('rc-mob2'); if(mob2) mob2.value = p.mob2||'';
  const email = document.getElementById('rc-email'); if(email) email.value = p.email||'';
  const addr = document.getElementById('rc-addr'); if(addr) addr.value = p.addr||'';
  const dob = document.getElementById('rc-dob'); if(dob) { dob.value = p.dob||''; calcRcAge && calcRcAge(); }
  const sex = document.getElementById('rc-sex'); if(sex && p.sex) sex.value = p.sex;
  const age = document.getElementById('rc-age'); if(age) age.value = p.age||'';
  const dept = document.getElementById('rc-dept'); if(dept && p.dept) { dept.value = p.dept; updateRcDr&&updateRcDr(); updatePurposeOptions&&updatePurposeOptions(); }
  const dr = document.getElementById('rc-dr'); if(dr && p.doctor) dr.value = p.doctor;
  const uidEl = document.getElementById('rc-uid'); if(uidEl) uidEl.textContent = p.bmhId;
  const advEl = document.getElementById('rc-advance-amt'); if(advEl) advEl.value = p.advance!=null?p.advance:'';
  const adpEl = document.getElementById('rc-advance-purpose'); if(adpEl) adpEl.value = p.advancePurpose||'';
  const nfEl = document.getElementById('rc-no-fee'); if(nfEl) { nfEl.checked = false; toggleRcNoFee(false); }
  // Clear search/match areas
  ['rc-phone-match','rc-bmhid-result'].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML='';});
  const sr = document.getElementById('rc-phone-results'); if(sr) sr.style.display='none';
  // Switch to New Patient tab if on Queue tab
  const newTab = document.querySelector('#pg-reception .ptab');
  if(newTab && !newTab.classList.contains('active')) { ptab(newTab,'rc-new'); }
  showToast(`✏️ ${p.name} prefilled — update details if needed and register ✓`,'s');
}
function calcRcAge() {
  const dob = document.getElementById('rc-dob')?.value;
  const ageEl = document.getElementById('rc-age');
  if(!dob || !ageEl) return;
  const birth = new Date(dob);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if(m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--;
  ageEl.value = years + ' Years';
}
function genRcUID() {
  // Only numeric BMSH-###### IDs participate in the sequence (CSV/hash imports are ignored)
  let maxNum = 55999;
  (window.PATIENTS||[]).forEach(p => {
    const m = p.bmhId && String(p.bmhId).trim().match(/^BMSH-(\d{1,9})$/);
    if(m){ const n=parseInt(m[1],10); if(n>maxNum) maxNum=n; }
  });

  // Also check localStorage so the counter survives page reloads even if RTDB is slow
  try {
    const ls = parseInt(localStorage.getItem('bmh_last_patient_num') || '0', 10);
    if(ls > maxNum) maxNum = ls;
  } catch(_) {}

  let localNext = maxNum + 1;
  window._nextPatientNum = localNext;
  const el = document.getElementById('rc-uid');
  if(el) el.textContent = 'BMSH-' + String(localNext).padStart(6,'0');

  // Also check RTDB in case another device registered a patient (sequence must never lag server)
  if(window.fbOnce) {
    fbOnce('settings/lastPatientNum').then(num => {
      if(typeof num !== 'number' || num < 55999) return;
      const nextFromServer = num + 1;
      if(nextFromServer > (window._nextPatientNum || 0)) {
        window._nextPatientNum = nextFromServer;
        try { localStorage.setItem('bmh_last_patient_num', String(num)); } catch(_) {}
        const el2 = document.getElementById('rc-uid');
        if(el2) el2.textContent = 'BMSH-' + String(nextFromServer).padStart(6,'0');
      }
    }).catch(()=>{});
  }

  return 'BMSH-' + String(window._nextPatientNum || localNext).padStart(6,'0');
}
window.genRcUID = genRcUID;

function reserveNextBmhId() {
  const localId = (typeof genRcUID === 'function' && genRcUID()) || ('BMSH-' + String((window._nextPatientNum || 56000)).padStart(6,'0'));
  if(!window.FBDB) return Promise.resolve(localId);

  return window.FBDB.ref('settings/lastPatientNum').transaction(function(current) {
    const base = (typeof current === 'number' && current >= 55999) ? current : 55999;
    return base + 1;
  }).then(function(result) {
    const committed = result && result.committed;
    const snap = result && result.snapshot;
    const nextNum = committed && snap ? snap.val() : null;
    if(typeof nextNum === 'number' && nextNum >= 56000) {
      window._nextPatientNum = nextNum;
      try { localStorage.setItem('bmh_last_patient_num', String(nextNum)); } catch(_) {}
      const reservedId = 'BMSH-' + String(nextNum).padStart(6,'0');
      const el = document.getElementById('rc-uid');
      if(el) el.textContent = reservedId;
      return reservedId;
    }
    return localId;
  }).catch(function() {
    return localId;
  });
}

window._rcDeptFilter = window._rcDeptFilter || 'all';
window._rcQueueSubtab = window._rcQueueSubtab || 'waiting';

function toggleRcNoFee(on) {
  const fee = document.getElementById('rc-fee');
  if(!fee) return;
  if(on) {
    fee.value = '0';
    fee.disabled = true;
    return;
  }
  fee.disabled = false;
  syncReceptionConsultationFee && syncReceptionConsultationFee();
}

function getReceptionConsultationServiceName() {
  const purpose = document.getElementById('rc-purpose')?.value || 'New Consultation';
  if(purpose === 'Not Checked In') return null;
  if(/follow|post-op/i.test(purpose)) return 'Follow-up';
  return 'New Consultation';
}

function getReceptionConsultationRate(centre) {
  const dept = document.getElementById('rc-dept')?.value || 'ophtho';
  const serviceName = getReceptionConsultationServiceName();
  if(!serviceName) return 0;

  const legacyMap = {
    ophtho: ['Consultation — Eye', 'Consultation'],
    obg: ['ANC Consultation', 'Consultation'],
    psych: ['Psychiatry Consultation', 'Consultation'],
    skin: ['Dermatology Consultation', 'Consultation']
  };
  const names = serviceName === 'Follow-up'
    ? ['Follow-up', 'Follow-up Consultation']
    : ['New Consultation'].concat(legacyMap[dept] || ['Consultation']);

  for(const name of names) {
    const amt = getChargeForProcedure(name, centre);
    if(amt) return amt;
    const direct = CENTRE_CHARGES[centre]?.[name];
    if(direct) return direct;
  }
  return 0;
}

function syncReceptionCentreAndFee() {
  const centreEl = document.getElementById('rc-centre');
  const feeEl = document.getElementById('rc-fee');
  if(!centreEl || !feeEl) return;

  const lockedCentre = getUserCentre();
  const centre = getReceptionSelectedCentre();
  if(lockedCentre) centreEl.value = centre;
  centreEl.disabled = !!lockedCentre;
  centreEl.style.opacity = lockedCentre ? '0.7' : '1';

  if(document.getElementById('rc-no-fee')?.checked) {
    feeEl.value = '0';
    feeEl.disabled = true;
    return;
  }

  feeEl.disabled = false;
  const amount = getReceptionConsultationRate(centre);
  feeEl.value = String(amount);
}
window.syncReceptionConsultationFee = syncReceptionCentreAndFee;

function setRcQueueSubtab(mode, btnEl) {
  window._rcQueueSubtab = mode;
  const wrap = document.getElementById('rc-queue-subtabs');
  if(wrap) wrap.querySelectorAll('button').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-rcq')===mode);
  });
  renderReceptionPage && renderReceptionPage();
}

function ensureDailyReceptionReset() {
  const k = 'bmh_reception_calendar_day';
  const today = new Date().toISOString().slice(0,10);
  try {
    const last = localStorage.getItem(k);
    const banner = document.getElementById('rc-daily-banner');
    if(last && last !== today) {
      genRcUID && genRcUID();
      if(banner) {
        banner.style.display = 'flex';
        banner.innerHTML = '<span style="font-size:16px">📅</span><span><strong>New calendar day</strong> — the queue shows only today\'s check-ins. Full charges stay under <strong>Charges</strong>.</span>';
      }
    } else if(banner) { banner.style.display = 'none'; }
    localStorage.setItem(k, today);
  } catch(e) { /* private mode */ }
}

/** Reception — Register & Generate Token (full-width form) */
async function registerPatient() {
  const fn  = (document.getElementById('rc-fn')?.value  || '').trim();
  const ln  = (document.getElementById('rc-ln')?.value  || '').trim();
  const mob = (document.getElementById('rc-mob-inp')?.value || document.getElementById('rc-mob')?.value || '').trim();
  const dob = document.getElementById('rc-dob')?.value || '';
  const age = document.getElementById('rc-age')?.value || '';
  const sex = document.getElementById('rc-sex')?.value || 'Male';
  const dept= document.getElementById('rc-dept')?.value || 'ophtho';
  const dr  = document.getElementById('rc-dr')?.value   || '';
  const centre = document.getElementById('rc-centre')?.value || CURRENT_USER?.centre || 'CHD';
  const addr= document.getElementById('rc-addr')?.value || '';
  const noFee = document.getElementById('rc-no-fee')?.checked;
  const advAmt = parseFloat(document.getElementById('rc-advance-amt')?.value)||0;
  const advPurpose = (document.getElementById('rc-advance-purpose')?.value||'').trim();

  if(!fn) { showToast('Please enter patient first name','w'); return; }

  const uid = await reserveNextBmhId();
  if(!/^BMSH-\d{6,9}$/.test(uid)) { showToast('Could not generate a valid BMSH ID','e'); return; }

  const name = (fn + ' ' + ln).trim();
  const initials = name.split(' ').map(w=>w[0]||'').join('').toUpperCase().substring(0,2);
  const colors = ['#1A3C6E','#0B7B8C','#FF2D55','#AF52DE','#34C759','#FF9500','#5856D6','#FF3B30'];
  const color = colors[Math.floor(Math.random()*colors.length)];

  const purposeVal = document.getElementById('rc-purpose')?.value||'New Consultation';
  const isPreReg = purposeVal==='Need to Check In' || purposeVal==='Not Checked In';
  const mob2  = document.getElementById('rc-mob2')?.value?.trim() || '';
  const email = document.getElementById('rc-email')?.value?.trim() || '';

  const patient = {
    bmhId: uid, name, initials, color,
    age, sex, mob, mob2, email, dob, addr,
    dept, doctor: dr,
    centre, status: isPreReg ? 'pre-registered' : 'waiting',
    balance:0,
    advance: advAmt > 0 ? advAmt : 0,
    advancePurpose: advPurpose || (advAmt > 0 ? 'Advance on account' : ''),
    consultationNoFee: !!noFee,
    seen:false, dilated:false,
    preRegistered: isPreReg,
    createdAt: new Date().toISOString(),
    createdBy: CURRENT_USER?.name || 'Reception'
  };

  const exists = PATIENTS.findIndex(p=>p.bmhId===uid);
  if(exists >= 0) PATIENTS[exists] = patient; else PATIENTS.push(patient);

  savePatientToFirebase(patient);

  const numFromId = parseInt(String(uid).replace(/^BMSH-/,''),10);
  if(!isNaN(numFromId)) {
    try { localStorage.setItem('bmh_last_patient_num', numFromId); } catch(_) {}
    window._nextPatientNum = numFromId + 1;
  }

  let fee = parseFloat(document.getElementById('rc-fee')?.value || getReceptionConsultationRate(centre) || 0) || 0;
  if(noFee) fee = 0;
  const payMode = document.getElementById('rc-pay-mode')?.value||'Cash';
  const purpose = document.getElementById('rc-purpose')?.value||'New Consultation';
  const insName = document.getElementById('rc-ins-name')?.value||'';
  patient.checkinAt = Date.now();
  patient.purpose = purpose;
  const prevVisits = PATIENTS.filter(p=>p.mob===patient.mob&&p.bmhId!==patient.bmhId).length;
  patient.visitCount = prevVisits + 1;

  const isInsurance = payMode.includes('Insurance')||payMode.includes('PMJAY')||payMode.includes('CGHS')||payMode.includes('TPA');
  const isCreditDue = payMode === 'Credit / Due';

  if(isInsurance) {
    const claimId = 'TPA'+Date.now();
    const claim = {id:claimId, patient:name, bmhId:uid, for:purpose, amount:fee, approvedAmount:fee, status:'pending', mode:payMode, ins:insName||payMode, dept, centre, date:new Date().toISOString(), from:'Reception'};
    PAY_REQUESTS.push(claim);
    fbSet&&fbSet('payRequests/'+claimId, claim);
    addBmhPatientCharge(uid, { id: 'chg-' + claimId, cat: inferChargeCategoryFromService(purpose), desc: purpose, qty: 1, rate: fee, amount: fee, source: 'reception', ref: claimId, ts: claim.date });
    patient.ins = insName||payMode;
    patient.balance = Math.max(Number(patient.balance || 0), Number(fee || 0));
    showToast(`🏦 TPA/Insurance patient — claim pending ₹${fee.toLocaleString('en-IN')}`,'i');
  } else if(isCreditDue) {
    addBmhPatientCharge(uid, { id: 'chg-credit-' + Date.now(), cat: inferChargeCategoryFromService(purpose), desc: purpose, qty: 1, rate: fee, amount: fee, source: 'reception', ts: new Date().toISOString() });
    patient.balance = (patient.balance||0) + fee;
    showToast(`📋 ₹${fee} noted as credit/due for ${name}`,'i');
  } else if(fee > 0 || noFee) {
    const txnId = 'TXN'+Date.now();
    addBmhPatientCharge(uid, { id: 'chg-' + txnId, cat: inferChargeCategoryFromService(purpose), desc: purpose + (noFee?' (no fee)':''), qty: 1, rate: fee, amount: fee, source: 'reception', ref: txnId, ts: new Date().toISOString() });
    const txn = {
      id:txnId, patient:name, bmhId:uid, service: purpose + (noFee?' (no fee)':''), amount:fee,
      mode:payMode, collected:true, dept,
      time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
      date:new Date().toISOString(), centre, createdBy:CURRENT_USER?.name||'Reception',
      noFee: !!noFee
    };
    TRANSACTIONS.push(txn);
    saveTransactionToFirebase&&saveTransactionToFirebase(txn);
  }

  if(advAmt > 0) {
    const txnA = 'TXN'+Date.now()+'A';
    const txna = {
      id:txnA, patient:name, bmhId:uid, service:'Advance — '+(advPurpose||'On account'), amount:advAmt,
      mode:payMode, collected:true, dept,
      time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
      date:new Date().toISOString(), centre, createdBy:CURRENT_USER?.name||'Reception', type:'advance'
    };
    TRANSACTIONS.push(txna);
    saveTransactionToFirebase&&saveTransactionToFirebase(txna);
  }

  fbUpdate&&fbUpdate('patients/'+uid,{
    checkinAt:patient.checkinAt,purpose,visitCount:patient.visitCount,ins:patient.ins||'',
    advance:patient.advance, advancePurpose:patient.advancePurpose, consultationNoFee:patient.consultationNoFee
  });
  if (typeof window.patchPatientFirestore === 'function') {
    window.patchPatientFirestore(uid, {
      checkinAt: patient.checkinAt,
      purpose,
      visitCount: patient.visitCount,
      ins: patient.ins || '',
      advance: patient.advance,
      advancePurpose: patient.advancePurpose,
      consultationNoFee: patient.consultationNoFee
    }).catch(() => {});
  }

  const todayPts = PATIENTS.filter(p=> p.createdAt && p.createdAt.startsWith(new Date().toISOString().slice(0,10)));
  const token = todayPts.length;

  showToast(`✅ ${name} registered — Token #${token}`, 's');

  maybeScheduleSameDaySurgeryOTFromRegistration(patient);

  if(!isInsurance && !isCreditDue && !isPreReg && fee>0) {
    setTimeout(()=>{
      if(confirm(`✅ ${name} registered — Token #${token}\nFee: ₹${fee.toLocaleString('en-IN')} (${payMode})\n\nPrint receipt?`)) {
        printPaymentReceipt({id:'TXN'+Date.now(),patient:name,bmhId:uid,for:purpose,service:purpose,amount:fee,mode:payMode,bmhId:uid});
      }
    },200);
  }

  resetRegistrationForm();
  renderDocQueue && renderDocQueue();
  renderDashboard && renderDashboard();
  renderReceptionPage && renderReceptionPage();
  renderInsuranceTab && renderInsuranceTab();
  renderTpaPage && renderTpaPage();
}
window.registerPatient = registerPatient;

function initReceptionIdSeed() {
  if(typeof genRcUID === 'function') genRcUID();
}

if(document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initReceptionIdSeed);
} else {
  initReceptionIdSeed();
}

window.addEventListener('bmh:patientsUpdated', () => {
  if(typeof genRcUID === 'function') genRcUID();
});

function resetRegistrationForm() {
  ['rc-fn','rc-ln','rc-rel','rc-age','rc-addr','rc-dob','rc-mob-inp','rc-mob2','rc-email','rc-bmhid-search','rc-ref-name','rc-ref-mobile','rc-ins-name','rc-policy','rc-advance-amt','rc-advance-purpose'].forEach(id=>{
    const e=document.getElementById(id);
    if(e){ e.value = ''; }
  });
  const fee=document.getElementById('rc-fee'); if(fee){ fee.value='0'; fee.disabled=false; }
  const nf=document.getElementById('rc-no-fee'); if(nf){ nf.checked=false; }
  const sex=document.getElementById('rc-sex'); if(sex) sex.value='Male';
  const dept=document.getElementById('rc-dept'); if(dept) dept.value='ophtho';
  const payMode=document.getElementById('rc-pay-mode'); if(payMode) payMode.value='Cash';
  const refType=document.getElementById('rc-ref-type'); if(refType) refType.value='';
  ['rc-bmhid-result','rc-phone-match'].forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML='';});
  const phoneResults=document.getElementById('rc-phone-results'); if(phoneResults) phoneResults.style.display='none';
  const refDetail=document.getElementById('rc-ref-detail'); if(refDetail) refDetail.style.display='none';
  const insField=document.getElementById('rc-ins-field'); if(insField) insField.style.display='none';
  const insPolicy=document.getElementById('rc-ins-policy'); if(insPolicy) insPolicy.style.display='none';
  const surgPanel=document.getElementById('rc-surgery-panel'); if(surgPanel) surgPanel.style.display='none';
  updateRcDr && updateRcDr();
  updatePurposeOptions && updatePurposeOptions();
  syncReceptionConsultationFee && syncReceptionConsultationFee();
  genRcUID && genRcUID();
}
window.resetRegistrationForm = resetRegistrationForm;

/** Create OT list entry from reception surgery panel (used by Schedule button and auto after registration). */
function createOTCaseFromReceptionPanel(ptId, patientNameTrim) {
  const sType = document.getElementById('surg-type')?.value || 'Surgery';
  const surgeon = document.getElementById('surg-surgeon')?.value || CURRENT_USER?.name || 'Dr. Varun Baweja';
  const eye = document.getElementById('surg-eye')?.value || 'N/A';
  const fee = parseFloat(document.getElementById('surg-fee')?.value) || 38000;
  const sDate = document.getElementById('surg-date')?.value || new Date().toISOString().split('T')[0];
  const sTime = document.getElementById('surg-time')?.value || '09:00';
  const anaes = document.getElementById('surg-anaes')?.value || 'Topical (Drops)';
  const caseId = 'OT' + Date.now();
  const otCase = {
    id: caseId,
    bmhId: ptId,
    patient: patientNameTrim || 'Pending',
    procedure: sType,
    surgeon: surgeon,
    site: eye,
    anaes: anaes,
    date: sDate,
    scheduledTime: sTime,
    centre: (PATIENTS.find(function (p) { return p.bmhId === ptId; }) || {}).centre || getEffectiveCentre() || CURRENT_USER?.centre || 'CHD',
    room: '1',
    priority: 'Elective',
    status: 'scheduled',
    preop: false, consent: false, fasting: false,
    timings: {},
    signIn: false, signOut: false, timeOut: false,
    createdAt: new Date().toISOString(),
    createdBy: CURRENT_USER?.username || 'reception',
    surgeryFee: fee
  };
  const normalized = normalizeOTCaseRecord(otCase);
  OT_CASES.push(normalized);
  fbSet('otCases/' + caseId, normalized);
  return normalized;
}

/** After Register & Token: if surgery panel is open, date is today, and procedure is same-day cataract-type, add to OT list. */
function maybeScheduleSameDaySurgeryOTFromRegistration(patient) {
  const panel = document.getElementById('rc-surgery-panel');
  if(!panel || panel.style.display === 'none') return;
  const today = new Date().toISOString().slice(0, 10);
  const sDate = (document.getElementById('surg-date')?.value || '').trim() || today;
  if(sDate !== today) return;
  const sType = (document.getElementById('surg-type')?.value || '').trim();
  const purpose = (patient.purpose || '').trim();
  const isCataractLike = /pmics|cataract|phaco|iol/i.test(sType) || /cataract|pmics|phaco/i.test(purpose);
  const purposeOk = purpose === 'Surgery' || /surgery|cataract|pmics|phaco/i.test(purpose);
  if(patient.dept !== 'ophtho' || !isCataractLike || !purposeOk) return;
  const nm = (patient.name || '').trim();
  createOTCaseFromReceptionPanel(patient.bmhId, nm);
  showToast('⚕️ Same-day surgery — added to OT list & queue ✓', 's');
  if(typeof renderOTList === 'function') renderOTList();
}

function scheduleSurgery() {
  const ptName = (document.getElementById('rc-fn')?.value || '') + ' ' + (document.getElementById('rc-ln')?.value || '');
  const ptId = document.getElementById('rc-uid')?.textContent || 'BMSH-000000';
  const fee = parseFloat(document.getElementById('surg-fee')?.value) || 38000;
  const otCase = createOTCaseFromReceptionPanel(ptId, ptName.trim());
  const sType = otCase.procedure;
  const sDate = otCase.date;
  const sTime = otCase.scheduledTime;

  const advanceEl = document.getElementById('surg-advance');
  const advAmt = advanceEl ? parseFloat(advanceEl.value)||0 : 0;
  if(advAmt > 0) {
    // Record as a collected transaction (advance received at time of scheduling)
    const txnId = 'TXN'+Date.now();
    const payMode = document.getElementById('rc-pay-mode')?.value || 'Cash';
    const txn = {
      id:txnId, patient:ptName.trim()||'Pending', bmhId:ptId,
      service:'Surgery Advance — '+sType, amount:advAmt,
      mode:payMode, collected:true,
      dept: PATIENTS.find(p=>p.bmhId===ptId)?.dept || 'ophtho',
      time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
      date:new Date().toISOString(), centre:CURRENT_USER?.centre||'CHD',
      createdBy:CURRENT_USER?.name||'Reception'
    };
    TRANSACTIONS.push(txn);
    saveTransactionToFirebase && saveTransactionToFirebase(txn);
    // Store advance on patient record so it can be deducted at final billing
    const advPt = PATIENTS.find(p=>p.bmhId===ptId);
    if(advPt) {
      advPt.advance = (advPt.advance||0) + advAmt;
      fbUpdate && fbUpdate('patients/'+ptId, {advance:advPt.advance});
    }
    // Also store advance details on the OT case itself
    otCase.advancePaid = advAmt;
    fbUpdate && fbUpdate('otCases/'+otCase.id, {advancePaid:advAmt});
    renderCollectionDashboard && renderCollectionDashboard();
    showToast(`💙 Advance ₹${advAmt.toLocaleString('en-IN')} recorded for ${ptName.trim()||'patient'} ✓`,'s');
  }

  showToast(`⚕️ ${sType} scheduled for ${sDate} at ${sTime} — added to OT module ✓`, 's');
  setTimeout(()=>openM('m-print-tpl'),800);
}
// Custom purpose options — persisted to Firebase settings/customPurposes
window.CUSTOM_PURPOSES = window.CUSTOM_PURPOSES || [];

function addPurposeOption() {
  const val = document.getElementById('new-purpose-inp')?.value?.trim(); if(!val) return;
  // Add to all rc-purpose selects
  document.querySelectorAll('#rc-purpose').forEach(sel=>{
    if(![...sel.options].some(o=>o.textContent===val)) {
      const opt=document.createElement('option'); opt.textContent=val; sel.appendChild(opt);
      sel.value=val;
    }
  });
  // Persist
  if(!window.CUSTOM_PURPOSES.includes(val)) {
    window.CUSTOM_PURPOSES.push(val);
    fbSet&&fbSet('settings/customPurposes', window.CUSTOM_PURPOSES);
  }
  showToast(`Purpose "${val}" added ✓`,'s');
  const inp=document.getElementById('new-purpose-inp'); if(inp) inp.value='';
  closeM('m-add-purpose');
}

function loadCustomPurposes() {
  if(!window.fbOnce) return;
  fbOnce('settings/customPurposes').then(data=>{
    if(!data || !Array.isArray(data) || !data.length) return;
    window.CUSTOM_PURPOSES = data;
    // Append to every #rc-purpose dropdown currently in the DOM
    data.forEach(val=>{
      document.querySelectorAll('#rc-purpose').forEach(sel=>{
        if(![...sel.options].some(o=>o.textContent===val)){
          const opt=document.createElement('option'); opt.textContent=val; sel.appendChild(opt);
        }
      });
    });
    // Also re-run updatePurposeOptions so the active dropdown gets them appended cleanly
    updatePurposeOptions && updatePurposeOptions();
  }).catch(()=>{});
}
function filterRcByDept(dept) {
  window._rcDeptFilter = dept;
  renderReceptionPage && renderReceptionPage();
}
function renderDeptSummary() {
  const el = document.getElementById('rc-dept-summary-list'); if(!el) return;
  const today = new Date().toISOString().slice(0,10);
  // All pending/paid pay requests for today
  const todayPRs = PAY_REQUESTS.filter(r => (r.date||'').startsWith(today) || !r.date);
  const depts = [
    {k:'ophtho',l:'Ophthalmology',icon:'👁️',color:'var(--blue)'},
    {k:'obg',l:'OBG',icon:'🤰',color:'#c0004e'},
    {k:'psych',l:'Neuropsychiatry',icon:'🧠',color:'var(--orange)'},
    {k:'skin',l:'Skin & Cosmetology',icon:'💆',color:'var(--purple)'},
  ];
  if(!todayPRs.length) {
    el.innerHTML = '<div style="padding:20px;text-align:center;color:var(--g1);font-size:12px">No charge requests from doctors today</div>';
    return;
  }
  el.innerHTML = depts.map(d=>{
    const dPRs = todayPRs.filter(r=>r.dept===d.k);
    if(!dPRs.length) return '';
    const pending = dPRs.filter(r=>r.status==='pending');
    const paid = dPRs.filter(r=>r.status==='paid');
    const pendAmt = pending.reduce((s,r)=>s+r.amount,0);
    const paidAmt = paid.reduce((s,r)=>s+r.amount,0);
    const hasSurgery = dPRs.some(r=>(r.for||'').toLowerCase().includes('surg')||PATIENTS.find(p=>p.bmhId===r.bmhId)?.purpose==='Surgery');
    return `<div style="border:1.5px solid ${d.color}44;border-radius:var(--r);overflow:hidden;margin-bottom:8px">
      <div style="background:${d.color}11;padding:10px 14px;display:flex;align-items:center;gap:10px">
        <span style="font-size:18px">${d.icon}</span>
        <div style="flex:1">
          <div style="font-weight:900;font-size:13px;color:${d.color}">${d.l}</div>
          <div style="font-size:10.5px;color:var(--g1)">${pending.length} pending · ${paid.length} cleared</div>
        </div>
        <div style="text-align:right">
          ${pendAmt>0?`<div style="font-size:14px;font-weight:900;color:var(--orange)">₹${pendAmt.toLocaleString('en-IN')} due</div>`:''}
          ${paidAmt>0?`<div style="font-size:11px;color:#1a8c3c;font-weight:700">₹${paidAmt.toLocaleString('en-IN')} paid</div>`:''}
        </div>
        ${hasSurgery?`<button class="btn btn-orange btn-xs" onclick="printSurgeryPack('${d.k}')">📋 Surgery Pack</button>`:''}
      </div>
      <div style="padding:8px 12px">
        ${dPRs.map(r=>{
          const pt = PATIENTS.find(p=>p.bmhId===r.bmhId)||{};
          return `<div style="display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:1px solid var(--g5)">
            <div style="width:30px;height:30px;border-radius:50%;background:${pt.color||d.color};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;flex-shrink:0">${pt.initials||r.patient[0]||'?'}</div>
            <div style="flex:1">
              <div style="font-weight:800;font-size:12.5px">${r.patient}</div>
              <div style="font-size:10.5px;color:var(--g1)">${r.for||'—'} · ${r.from||'Doctor'}</div>
            </div>
            <div style="font-weight:900;font-size:13px;color:${r.status==='paid'?'#1a8c3c':'var(--orange)'}">₹${r.amount.toLocaleString('en-IN')}</div>
            ${r.status==='pending'?`<button class="btn btn-xs" style="background:var(--green);color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:10.5px;font-weight:800;cursor:pointer" onclick="markPaid('${r.id}')">Collect</button>`:`<span style="font-size:10px;background:var(--green-lt);color:#1a8c3c;padding:2px 8px;border-radius:10px;font-weight:700">✓ Paid</span>`}
            <button class="btn btn-xs btn-outline" onclick="openXRefModal('${r.bmhId}')" title="Cross-refer">↔️</button>
            <button class="btn btn-xs" style="background:rgba(175,82,222,.1);color:var(--purple);border:1.5px solid var(--purple);border-radius:6px;padding:3px 6px;font-size:10px;cursor:pointer" onclick="openIPDFromQueue('${r.bmhId}')" title="IPD">🛏️</button>
            <button class="btn btn-xs" style="background:rgba(255,149,0,.1);color:var(--orange);border:1.5px solid var(--orange);border-radius:6px;padding:3px 6px;font-size:10px;cursor:pointer" onclick="openOTFromQueue('${r.bmhId}')" title="OT">🔬</button>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }).join('') || '<div style="padding:20px;text-align:center;color:var(--g1);font-size:12px">No charges sent today</div>';
}

// ── printSurgeryPack — print all relevant consent forms for a dept or custom pack ──────────
const SURGERY_PACK_DEFAULTS = [
  { id:'ophtho', dept:'Ophthalmology', icon:'👁️', label:'Ophthalmology surgery pack', desc:'Bilingual consent forms, related forms, and discharge summary for eye procedures.', color:'var(--blue)', documentKeys:['cataract','ivt','lasik','pterygium','__discharge__'] },
  { id:'obg', dept:'Obstetrics & Gynaecology', icon:'🤰', label:'OBG surgical pack', desc:'Delivery, LSCS, laparoscopy and discharge documents.', color:'#c0004e', documentKeys:['obg-lscs','obg-normal','obg-lap','obg-mtp','__discharge__'] },
  { id:'psych', dept:'Neuropsychiatry', icon:'🧠', label:'Psychiatry pack', desc:'Evaluation, treatment and discharge documents.', color:'var(--orange)', documentKeys:['psych-gen','psych-ect','__discharge__'] },
  { id:'skin', dept:'Skin & Cosmetology', icon:'💆', label:'Dermatology / aesthetics pack', desc:'Procedure consents, forms, and discharge summary.', color:'var(--purple)', documentKeys:['skin-peel','skin-laser','skin-prp','__discharge__'] },
];
let SURGERY_PACK_OVERRIDES = {};
function loadCustomSurgeryPacks() {
  try {
    const ls = localStorage.getItem('bmh_surgery_packs_custom');
    return ls ? JSON.parse(ls) : [];
  } catch (e) { return []; }
}
function loadSurgeryPackOverrides() {
  try {
    const ls = localStorage.getItem('bmh_surgery_pack_overrides');
    SURGERY_PACK_OVERRIDES = ls ? JSON.parse(ls) : {};
  } catch (e) { SURGERY_PACK_OVERRIDES = {}; }
}
function saveSurgeryPackOverrides() {
  try { localStorage.setItem('bmh_surgery_pack_overrides', JSON.stringify(SURGERY_PACK_OVERRIDES)); } catch (e) {}
}
loadSurgeryPackOverrides();
function saveCustomSurgeryPacks(arr) {
  try { localStorage.setItem('bmh_surgery_packs_custom', JSON.stringify(arr)); } catch (e) { /* noop */ }
  if (window.FBDB) window.FBDB.ref('surgeryPacksCustom').set(arr).catch(function () {});
}
window.BMH_UPLOADED_CONSENTS = window.BMH_UPLOADED_CONSENTS || [];
function normalizeSurgeryPackDeptKey(v) {
  const s = String(v || '').toLowerCase().trim();
  if (!s || s === 'all' || s === 'general') return 'all';
  if (s === 'ophtho' || s.includes('oph')) return 'ophtho';
  if (s === 'obg' || s.includes('obstetric') || s.includes('gynae') || s.includes('gynaec')) return 'obg';
  if (s === 'psych' || s.includes('psych')) return 'psych';
  if (s === 'skin' || s.includes('derma') || s.includes('cosmet')) return 'skin';
  return s;
}
function surgeryPackDeptLabelToKey(v) {
  const map = {
    'Ophthalmology': 'ophtho',
    'OBG': 'obg',
    'Neuropsychiatry': 'psych',
    'Skin': 'skin',
    'General': 'all',
    'Obstetrics & Gynaecology': 'obg',
    'Skin & Cosmetology': 'skin',
    'OBG / Obstetrics': 'obg'
  };
  return normalizeSurgeryPackDeptKey(map[v] || v);
}
function getAutoPackDepartmentDocuments(packOrDept) {
  const deptKey = surgeryPackDeptLabelToKey(packOrDept);
  if (!deptKey || deptKey === 'all') return [];
  const keys = [];
  const seen = {};
  (typeof CONSENT_LIBRARY !== 'undefined' ? CONSENT_LIBRARY : []).forEach(function (c) {
    const docDept = normalizeSurgeryPackDeptKey(c.dept);
    if (docDept === deptKey && c.id && !seen[c.id]) {
      seen[c.id] = true;
      keys.push(c.id);
    }
  });
  (typeof CONSENT_TEMPLATES !== 'undefined' ? CONSENT_TEMPLATES : []).forEach(function (t) {
    const docDept = normalizeSurgeryPackDeptKey(t.dept);
    if (docDept === deptKey && t.id && !seen[t.id]) {
      seen[t.id] = true;
      keys.push(t.id);
    }
  });
  return keys;
}
function mergeUniquePackDocumentKeys(baseKeys, extraKeys) {
  const out = [];
  const seen = {};
  (baseKeys || []).concat(extraKeys || []).forEach(function (k) {
    if (!k || seen[k]) return;
    seen[k] = true;
    out.push(k);
  });
  return out;
}
function getAllSurgeryPacks() {
  return SURGERY_PACK_DEFAULTS.concat(loadCustomSurgeryPacks()).map(function (p) {
    const merged = Object.assign({}, p, SURGERY_PACK_OVERRIDES[p.id] || {});
    if (merged.hidden) return null;
    p = merged;
    if (!p.documentKeys && p.consentKeys) p.documentKeys = p.consentKeys.slice();
    if (p.documentKeys && p.documentKeys.indexOf('__discharge__') === -1 && String(p.id || '').startsWith('custom-') === false) p.documentKeys.push('__discharge__');
    return p;
  }).filter(Boolean);
}
function populateReceptionSurgeryPackSelect(selected) {
  const sel = document.getElementById('surg-pack-sel');
  if (!sel) return;
  const cur = selected || sel.value || '';
  const packs = getAllSurgeryPacks();
  const options = ['<option value="">— Select to print consent pack —</option>'].concat(
    packs.map(function (p) {
      const icon = p.icon || '📋';
      const label = p.label || p.dept || p.id;
      return '<option value="' + String(p.id).replace(/"/g, '&quot;') + '">' + icon + ' ' + String(label).replace(/</g, '&lt;') + '</option>';
    })
  );
  sel.innerHTML = options.join('');
  if ([].slice.call(sel.options).some(function (o) { return o.value === cur; })) sel.value = cur;
}
function populateNewPackModal() {
  const host = document.getElementById('new-tpl-docs');
  if (!host || typeof CONSENT_DATA === 'undefined') return;
  const deptSel = document.getElementById('new-pack-dept');
  const deptLabel = deptSel ? deptSel.options[deptSel.selectedIndex].text : 'General';
  const deptMap = { 'Ophthalmology':'ophtho', 'OBG':'obg', 'Neuropsychiatry':'psych', 'Skin':'skin', 'General':'all' };
  const deptKey = deptMap[deptLabel] || 'all';
  const matchesDept = function (v) {
    if (!v || v === 'all' || deptKey === 'all') return true;
    const s = String(v).toLowerCase();
    return s === deptKey || s === String(deptLabel).toLowerCase();
  };
  const keys = Object.keys(getMergedConsentData());
  const block = function (title, rows) {
    return '<div style="margin-top:10px"><div style="font-size:10px;font-weight:800;color:var(--bmh-blue);text-transform:uppercase;margin-bottom:6px">' + title + '</div>' + rows + '</div>';
  };
  const builtIn = keys.filter(function (k) {
    const libHit = (typeof CONSENT_LIBRARY !== 'undefined' ? CONSENT_LIBRARY.find(function (c) { return c.id === k; }) : null);
    return matchesDept(libHit?.dept || (k.startsWith('obg-') ? 'obg' : k.startsWith('psych-') ? 'psych' : k.startsWith('skin-') ? 'skin' : 'ophtho'));
  }).map(function (k) {
    const data = getConsentEntry(k);
    const t = data && data.title ? data.title : k;
    return '<label style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;font-size:11.5px;cursor:pointer;border-bottom:1px solid var(--g5)"><input type="checkbox" name="new-pack-doc" value="' + k + '"><span>' + t + '</span></label>';
  }).join('');
  const libRows = (typeof CONSENT_LIBRARY !== 'undefined' ? CONSENT_LIBRARY : []).filter(function (c) {
    return matchesDept(c.dept);
  }).map(function (c) {
    const kind = c.docType === 'form' ? 'form' : 'consent';
    return '<label style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;font-size:11.5px;cursor:pointer;border-bottom:1px solid var(--g5)"><input type="checkbox" name="new-pack-doc" value="' + String(c.id).replace(/"/g, '&quot;') + '"><span>📚 ' + String(c.name).replace(/</g, '&lt;') + ' <span style="font-size:9px;color:var(--g1)">(' + kind + ' library)</span></span></label>';
  }).join('');
  const tplRows = (typeof CONSENT_TEMPLATES !== 'undefined' ? CONSENT_TEMPLATES : []).filter(function (t) {
    return matchesDept(t.dept);
  }).map(function (t) {
    const kind = t.type === 'template' ? 'form' : 'consent';
    return '<label style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;font-size:11.5px;cursor:pointer;border-bottom:1px solid var(--g5)"><input type="checkbox" name="new-pack-doc" value="' + String(t.id).replace(/"/g, '&quot;') + '"><span>📎 ' + String(t.name || t.id).replace(/</g, '&lt;') + ' <span style="font-size:9px;color:var(--g1)">(' + kind + ' saved)</span></span></label>';
  }).join('');
  const uploadedRows = (window.BMH_UPLOADED_CONSENTS || []).filter(function (c) {
    return matchesDept(c.dept);
  }).map(function (c) {
    const kind = c.docType === 'form' ? 'form' : 'consent';
    return '<label style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;font-size:11.5px;cursor:pointer;border-bottom:1px solid var(--g5)"><input type="checkbox" name="new-pack-doc" value="' + String(c.id).replace(/"/g, '&quot;') + '"><span>📎 ' + String(c.name || c.id).replace(/</g, '&lt;') + ' <span style="font-size:9px;color:var(--g1)">(uploaded ' + kind + ')</span></span></label>';
  }).join('');
  const specialRows = '<label style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;font-size:11.5px;cursor:pointer;border-bottom:1px solid var(--g5)"><input type="checkbox" name="new-pack-doc" value="__discharge__" checked><span>📄 Discharge Summary &amp; Fitness Certificate <span style="font-size:9px;color:var(--g1)">(official document)</span></span></label>';
  host.innerHTML = '<div style="font-size:10px;font-weight:800;color:var(--g1);margin-bottom:6px">Select department-specific consents and forms to include in this pack.</div>'
    + (builtIn ? block('Built-in bilingual consents', builtIn) : '')
    + (libRows ? block('Saved consent / form library', libRows) : '')
    + (tplRows ? block('Saved consent / form templates', tplRows) : '')
    + (uploadedRows ? block('Uploaded / custom documents', uploadedRows) : '')
    + block('Discharge document', specialRows)
    + (!builtIn && !libRows && !tplRows && !uploadedRows ? '<div style="padding:10px;background:var(--g6);border-radius:8px;font-size:11px;color:var(--g1)">No saved items found for this department yet.</div>' : '');
}
function saveSurgeryPackFromModal() {
  const name = document.getElementById('new-pack-name')?.value?.trim();
  const deptSel = document.getElementById('new-pack-dept');
  const deptLabel = deptSel ? deptSel.options[deptSel.selectedIndex].text : 'General';
  if (!name) { showToast('Enter pack name', 'w'); return; }
  const boxes = document.querySelectorAll('#new-tpl-docs input[name="new-pack-doc"]:checked');
  const documentKeys = Array.from(boxes).map(function (b) { return b.value; });
  if (!documentKeys.length) { showToast('Select at least one document', 'w'); return; }
  const id = 'custom-' + Date.now();
  const custom = loadCustomSurgeryPacks();
  custom.push({ id: id, dept: deptLabel, icon: '📦', label: name, desc: 'Custom document pack', color: 'var(--bmh-blue)', documentKeys: documentKeys, consentKeys: documentKeys });
  saveCustomSurgeryPacks(custom);
  closeM('m-new-tpl');
  renderSetPacksList();
  populateReceptionSurgeryPackSelect(id);
  showToast('Pack saved — you can print it from the list ✓', 's');
}
function editSurgeryPack(id) {
  const packs = getAllSurgeryPacks();
  const pack = packs.find(function (p) { return p.id === id; });
  if (!pack) return;
  const name = prompt('Edit pack name', pack.label || '');
  if (name === null) return;
  if (String(pack.id || '').startsWith('custom-')) {
    const custom = loadCustomSurgeryPacks();
    const idx = custom.findIndex(function (p) { return p.id === id; });
    if (idx < 0) return;
    custom[idx].label = name.trim() || custom[idx].label;
    saveCustomSurgeryPacks(custom);
  } else {
    SURGERY_PACK_OVERRIDES[id] = Object.assign({}, SURGERY_PACK_OVERRIDES[id] || {}, { label: name.trim() || pack.label, hidden: false });
    saveSurgeryPackOverrides();
  }
  renderSetPacksList();
  showToast('Pack updated ✓', 's');
}
function deleteSurgeryPack(id) {
  if (!confirm('Delete / hide this surgery pack?')) return;
  if (String(id).startsWith('custom-')) {
    const next = loadCustomSurgeryPacks().filter(function (p) { return p.id !== id; });
    saveCustomSurgeryPacks(next);
  } else {
    SURGERY_PACK_OVERRIDES[id] = Object.assign({}, SURGERY_PACK_OVERRIDES[id] || {}, { hidden: true });
    saveSurgeryPackOverrides();
  }
  renderSetPacksList();
  showToast('Pack deleted ✓', 's');
}
function printSurgeryPackWithKeys(keys, deptLabel) {
  if (!keys || !keys.length) { showToast('No documents selected', 'w'); return; }
  const ctx = collectConsentPrintContext();
  const consentPages = keys.map(function (k) {
    return renderPackDocumentPages(k, ctx);
  }).join('');
  if (!consentPages.trim()) { showToast('No printable documents found for ' + (deptLabel || 'pack'), 'w'); return; }
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:12px}@page{size:A4;margin:0}</style></head><body>' + consentPages + '</body></html>';
  safePrint(html);
  showToast('📋 ' + (deptLabel || 'Pack') + ' ready to print ✓', 's');
}
function parseIolSummary(iol) {
  const raw = String(iol || '').trim();
  if (!raw || raw === 'N/A' || raw === '—') return { display: '—', type: '—', power: '—' };
  const powerMatch = raw.match(/([+-]?\d+(?:\.\d+)?)\s*D\b/i);
  const power = powerMatch ? powerMatch[1] + 'D' : '—';
  let type = raw;
  if (powerMatch) type = raw.replace(powerMatch[0], '').replace(/[(),]/g, ' ').replace(/\s+/g, ' ').trim();
  return { display: raw, type: type || raw, power: power };
}
function normalizeOTCaseRecord(c) {
  const src = c || {};
  const pt = (typeof PATIENTS !== 'undefined' && PATIENTS.find && src.bmhId)
    ? (PATIENTS.find(function (p) { return p.bmhId === src.bmhId; }) || {})
    : {};
  const initials = src.initials || (src.patient || pt.name || '?').split(' ').map(function (n) { return n[0] || ''; }).join('').substring(0, 2).toUpperCase();
  const site = src.site || src.eye || src.operatingEye || src.opEye || src.surgEye || 'N/A';
  const iol = src.iol || src.implant || src.iolImplant || 'N/A';
  const iolSummary = parseIolSummary(iol);
  let status = src.status || 'pending';
  if (status === 'scheduled') status = 'pending';
  return Object.assign({}, src, {
    patient: src.patient || src.name || pt.name || 'Pending',
    age: src.age || pt.age || '—',
    sex: src.sex || pt.sex || '—',
    dx: src.dx || src.diagnosis || pt.dx || '—',
    procedure: src.procedure || src.surgery || src.operation || 'Procedure',
    surgeon: src.surgeon || src.doctor || pt.doctor || CURRENT_USER?.name || '—',
    anaes: src.anaes || src.anaesthesia || '—',
    room: src.room || src.otRoom || 'OT-1',
    centre: src.centre || pt.centre || getEffectiveCentre() || CURRENT_USER?.centre || 'CHD',
    scheduledTime: src.scheduledTime || src.time || '—',
    priority: String(src.priority || 'elective').toLowerCase(),
    status: status,
    site: site,
    eye: site,
    iol: iol,
    iolType: src.iolType || iolSummary.type,
    iolPower: src.iolPower || iolSummary.power,
    timings: Object.assign({ patientIn:'', anaesStart:'', incision:'', procEnd:'', patientOut:'', rrIn:'' }, src.timings || {}),
    preop: src.preop == null ? '—' : src.preop,
    consent: src.consent == null ? '—' : src.consent,
    fasting: src.fasting == null ? '—' : src.fasting,
    complications: src.complications || 'None',
    color: src.color || pt.color || '#1A3C6E',
    initials: initials,
    signIn: !!src.signIn,
    timeOut: !!src.timeOut,
    signOut: !!src.signOut,
  });
}
function resolveSurgeryPackForCase(otCase) {
  const c = normalizeOTCaseRecord(otCase);
  const procedure = String(c.procedure || '').toLowerCase();
  const packs = getAllSurgeryPacks();
  const custom = packs.find(function (p) {
    const label = String(p.label || '').toLowerCase();
    return String(p.id || '').startsWith('custom-') && label && (procedure.includes(label) || label.includes(procedure));
  });
  if (custom) return custom;
  if (/ivt|intravitreal|anti-vegf/.test(procedure)) return packs.find(function (p) { return p.id === 'ivt'; }) || null;
  if (/lasik/.test(procedure)) return packs.find(function (p) { return p.id === 'lasik'; }) || null;
  if (/cataract|phaco|pmics|iol/.test(procedure)) return packs.find(function (p) { return p.id === 'ophtho'; }) || null;
  if (/lscs|caes|delivery|lapar/.test(procedure)) return packs.find(function (p) { return p.id === 'obg'; }) || null;
  if (/ect|psy/.test(procedure)) return packs.find(function (p) { return p.id === 'psych'; }) || null;
  if (/peel|laser|prp|skin/.test(procedure)) return packs.find(function (p) { return p.id === 'skin'; }) || null;
  return packs.find(function (p) { return String(p.dept || '').toLowerCase().includes('oph') || p.id === 'ophtho'; }) || null;
}
function printSurgeryPackForCase(caseId, packId) {
  const rawCase = OT_CASES.find(function (c) { return c.id === caseId; });
  if (!rawCase) { showToast('OT case not found', 'w'); return; }
  const c = normalizeOTCaseRecord(rawCase);
  window._CONSENT_PRINT_BMH_ID = c.bmhId;
  window._CONSENT_PRINT_OT_ID = c.id;
  openSurgeryPackPrintModal(packId || (resolveSurgeryPackForCase(c)?.id || 'ophtho'));
}
function openSurgeryPackPrintModal(packOrDept) {
  const fallbackDeptKeys = {
    ophtho: ['cataract', 'ivt', 'lasik', 'pterygium', '__discharge__'],
    obg: ['obg-lscs', 'obg-normal', 'obg-lap', 'obg-mtp', '__discharge__'],
    psych: ['psych-gen', 'psych-ect', '__discharge__'],
    skin: ['skin-peel', 'skin-laser', 'skin-prp', '__discharge__'],
  };
  const packs = getAllSurgeryPacks();
  const pack = packs.find(function (p) { return p.id === packOrDept; });
  const baseKeys = pack && pack.documentKeys && pack.documentKeys.length
    ? pack.documentKeys.slice()
    : (fallbackDeptKeys[packOrDept] || []);
  const autoDeptDocs = getAutoPackDepartmentDocuments(pack ? pack.dept : packOrDept);
  const keys = mergeUniquePackDocumentKeys(baseKeys, autoDeptDocs);
  const deptLabel = pack
    ? (pack.label || pack.dept)
    : ({ ophtho: 'Ophthalmology', obg: 'OBG / Obstetrics', psych: 'Neuropsychiatry', skin: 'Skin & Cosmetology' }[packOrDept] || packOrDept);
  window._SP_PACK_LABEL = deptLabel;
  const host = document.getElementById('sp-pack-print-checklist');
  if (!host) {
    printSurgeryPackWithKeys(keys, deptLabel);
    return;
  }
  const merged = getMergedConsentData();
  if (!keys.length) {
    host.innerHTML = '<div style="padding:12px;color:var(--g1);font-size:12px">No documents in this pack yet.</div>';
  } else {
    host.innerHTML = keys.map(function (k) {
      const title = getPackDocumentTitle(k);
      const isAuto = autoDeptDocs.indexOf(k) !== -1 && baseKeys.indexOf(k) === -1;
      return '<label style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;font-size:12px;cursor:pointer;border-bottom:1px solid var(--g5)">'
        + '<input type="checkbox" name="sp-pack-k" value="' + String(k).replace(/"/g, '&quot;') + '" checked>'
        + '<span>' + String(title).replace(/</g, '&lt;') + (isAuto ? ' <span style="font-size:9px;color:var(--g1)">(department saved)</span>' : '') + '</span></label>';
    }).join('');
  }
  openM('m-sp-pack-print');
}
function confirmSurgeryPackPrint() {
  const boxes = document.querySelectorAll('#sp-pack-print-checklist input[name="sp-pack-k"]:checked');
  const keys = Array.from(boxes).map(function (b) { return b.value; });
  closeM('m-sp-pack-print');
  printSurgeryPackWithKeys(keys, window._SP_PACK_LABEL || 'Pack');
}
function printSurgeryPack(packOrDept) {
  openSurgeryPackPrintModal(packOrDept);
}

// ── renderInsuranceTab — TPA/cashless pending claims ──────────
function renderInsuranceTab() {
  const el = document.getElementById('rc-insurance-list'); if(!el) return;
  const ins = PAY_REQUESTS.filter(r => {
    const m = (r.mode||r.ins||'').toLowerCase();
    return m.includes('insurance')||m.includes('tpa')||m.includes('cghs')||m.includes('echs')||m.includes('pmjay')||m.includes('ayushman');
  });
  if(!ins.length) {
    el.innerHTML = '<div style="padding:24px;text-align:center;color:var(--g1);font-size:13px">No insurance/TPA patients today</div>'; return;
  }
  const pending = ins.filter(r=>r.status==='pending');
  const cleared = ins.filter(r=>r.status!=='pending');
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
      <div style="background:var(--orange-lt);border-radius:var(--r);padding:10px;text-align:center;border:1.5px solid var(--orange)">
        <div style="font-size:9px;font-weight:800;color:#8a4200;text-transform:uppercase;margin-bottom:3px">Pending Claims</div>
        <div style="font-size:20px;font-weight:900;color:#8a4200">${pending.length}</div>
        <div style="font-size:10px;color:#8a4200">₹${pending.reduce((s,r)=>s+r.amount,0).toLocaleString('en-IN')}</div>
      </div>
      <div style="background:var(--green-lt);border-radius:var(--r);padding:10px;text-align:center;border:1.5px solid var(--green)">
        <div style="font-size:9px;font-weight:800;color:#1a7a4a;text-transform:uppercase;margin-bottom:3px">Cleared Today</div>
        <div style="font-size:20px;font-weight:900;color:#1a7a4a">${cleared.length}</div>
        <div style="font-size:10px;color:#1a7a4a">₹${cleared.reduce((s,r)=>s+r.amount,0).toLocaleString('en-IN')}</div>
      </div>
    </div>
    ${ins.map(r => {
      const isp = r.status==='pending';
      return `<div style="display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:var(--r);border:1.5px solid ${isp?'rgba(255,149,0,.35)':'var(--g4)'};background:${isp?'var(--orange-lt)':'#fff'};margin-bottom:6px">
        <div style="flex:1">
          <div style="font-weight:800;font-size:13px">${r.patient}</div>
          <div style="font-size:10.5px;color:var(--g1)">${r.for||'—'} · <span style="color:var(--blue);font-weight:700">${r.ins||r.mode||'TPA'}</span></div>
          ${r.bmhId?`<div style="font-family:monospace;font-size:10px;color:var(--bmh-teal)">${r.bmhId}</div>`:''}
        </div>
        <div style="text-align:right">
          <div style="font-size:15px;font-weight:900;color:${isp?'var(--orange)':'#1a8c3c'}">₹${r.amount.toLocaleString('en-IN')}</div>
          ${isp
            ? `<button class="btn btn-xs btn-green" style="margin-top:4px" onclick="markPaid('${r.id}')">✅ Mark Received</button>`
            : `<span style="font-size:10px;background:var(--green-lt);color:#1a8c3c;padding:2px 8px;border-radius:10px;font-weight:700">✓ Cleared</span>`}
        </div>
      </div>`;
    }).join('')}`;
}

// RECEIPT FROM RECEPTION
function generateAndPrintReceipt() {
  const bmhId = document.getElementById('bill-pt-sel')?.value;
  if (bmhId) {
    const rows = document.querySelectorAll('#rec-bill-items > div');
    rows.forEach(row => {
      const nums = row.querySelectorAll('input[type=number]');
      const qty = parseFloat(nums[0]?.value || 1);
      const rate = parseFloat(nums[1]?.value || 0);
      const textInp = row.querySelector('input[type=text]');
      const span = row.querySelector('span');
      let desc = '';
      if (textInp) desc = textInp.value.trim();
      else if (span && !span.classList.contains('badge')) desc = span.textContent.trim();
      if (desc && qty * rate > 0) {
        addBmhPatientCharge(bmhId, { id: 'rc' + Date.now() + Math.random().toString(36).slice(2, 5), cat: 'reception', desc, qty, rate, amount: qty * rate, source: 'reception', ts: new Date().toISOString() });
      }
    });
  }
  showToast('Receipt generated ✓', 's');
  closeM('m-rec-bill');
  if (bmhId) printBmhPatientBill(bmhId);
  else printReceipt();
  renderBillingPage && renderBillingPage();
}
function populateBillItems() {
  const type = document.getElementById('bill-type')?.value;
  const el = document.getElementById('rec-bill-items'); if(!el) return;
  const centre = getEffectiveCentre();
  const items = type==='consultation' ? [[getReceptionConsultationServiceName() || 'New Consultation',1,getReceptionConsultationRate(centre)]] :
    type==='investigation' ? [['OCT Macula',1,getChargeForProcedure('OCT Macula OU', centre)],['Biometry',1,getChargeForProcedure('Biometry IOL Master', centre)]] :
    type==='surgery' ? [['PMICS (Pinhole Micro Incision Cataract Surgery) + IOL',1,getChargeForProcedure('PMICS + IOL Implantation', centre)],['Pre-op Package',1,getChargeForProcedure('Pre-op Package', centre)]] :
    [['IPD Bed Charges (per day)',1,1500],['Nursing Charges',1,500]];
  el.innerHTML = items.map((it,i)=>`<div style="display:flex;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid var(--g5);font-size:12px">
    <span style="flex:1;font-weight:600">${it[0]}</span>
    <input type="number" value="${it[1]}" style="width:50px;font-size:11px;text-align:center" onchange="calcRecBill()">
    <input type="number" value="${it[2]}" style="width:70px;font-size:11px;text-align:right" onchange="calcRecBill()">
    <span style="width:80px;text-align:right;font-weight:800">₹${(it[1]*it[2]).toLocaleString('en-IN')}</span>
    <button class="btn btn-xs btn-gray" onclick="this.closest('div').remove();calcRecBill()">✕</button>
  </div>`).join('');
  calcRecBill();
}
function addRecBillItem() {
  const el = document.getElementById('rec-bill-items'); if(!el) return;
  const d = document.createElement('div');
  d.style='display:flex;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid var(--g5);font-size:12px';
  d.innerHTML=`<input type="text" placeholder="Item description" style="flex:1;font-size:11px"><input type="number" value="1" style="width:50px;font-size:11px;text-align:center" onchange="calcRecBill()"><input type="number" value="0" style="width:70px;font-size:11px;text-align:right" onchange="calcRecBill()"><span style="width:80px;text-align:right;font-weight:800">₹0</span><button class="btn btn-xs btn-gray" onclick="this.closest('div').remove();calcRecBill()">✕</button>`;
  el.appendChild(d); calcRecBill();
}
function calcRecBill() {
  const rows = document.querySelectorAll('#rec-bill-items > div');
  let sub = 0;
  rows.forEach(row=>{
    const inputs = row.querySelectorAll('input[type=number]');
    const qty = parseFloat(inputs[0]?.value||1), rate = parseFloat(inputs[1]?.value||0);
    const amt = qty*rate; sub+=amt;
    const last = row.querySelector('span:last-of-type'); if(last) last.textContent='₹'+amt.toLocaleString('en-IN');
  });
  const disc = parseFloat(document.getElementById('rec-bill-discount')?.value||0);
  const total = Math.max(0, sub-disc);
  document.getElementById('rec-bill-sub').textContent='₹'+sub.toLocaleString('en-IN');
  document.getElementById('rec-bill-total').textContent='₹'+total.toLocaleString('en-IN');
}

// FILE UPLOAD
function handleFileUpload(inp) {
  if(!inp.files||!inp.files[0]) return;
  const file = inp.files[0];
  const el = document.getElementById('uploaded-files-list'); if(!el) return;
  const d = document.createElement('div');
  d.style='display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--g6);border-radius:8px;margin-bottom:6px;font-size:12px';
  const icon = file.name.endsWith('.pdf')?'📄':file.name.endsWith('.dcm')?'🔬':'🖼️';
  d.innerHTML=`<span style="font-size:18px">${icon}</span><div style="flex:1"><div style="font-weight:700">${file.name}</div><div style="font-size:10px;color:var(--g1)">${(file.size/1024).toFixed(1)} KB · ${new Date().toLocaleTimeString()}</div></div><button class="btn btn-xs btn-gray" onclick="this.closest('div').remove()">✕</button>`;
  // Remove placeholder
  const placeholder = el.querySelector('div[style*="text-align:center"]');
  if(placeholder) placeholder.remove();
  el.appendChild(d);
  showToast(`📎 ${file.name} uploaded ✓`,'s');
  inp.value='';
}

// SAVE RX TEMPLATE (Settings → Rx Templates → manual lines)
function saveRxTemplate(mode) {
  const suffix = mode === 'modal' ? '-modal' : '';
  const name = document.getElementById('rx-tpl-name' + suffix)?.value?.trim();
  if(!name){showToast('Enter template name','w');return;}
  const deptSel = document.getElementById('rx-tpl-dept-settings' + suffix);
  const deptMap = { 'Ophthalmology':'ophtho','OBG':'obg','Psychiatry':'psych','Skin':'skin','OT':'ot','All':'all' };
  const dept = deptSel ? (deptMap[deptSel.value] || 'all') : 'all';
  const raw = document.getElementById('rx-tpl-drugs' + suffix)?.value || '';
  const lines = raw.split(/\n/).map(l=>l.trim()).filter(Boolean);
  if(!lines.length){showToast('Add one drug per line (e.g. Brand — frequency — duration)','w');return;}
  const key = name.toLowerCase().replace(/\s+/g,'-');
  RX_TEMPLATES_DATA[key] = lines.map(line => {
    const parts = line.split(/[—–-]/).map(s=>s.trim());
    const trade = parts[0] || 'Drug';
    const freq = parts[1] || 'Twice daily (BD)';
    const dur = parts[2] || '1 Week';
    if (dept === 'ot') return { trade, generic: '', eye: '', freq, dur };
    const lib = DRUG_LIBRARY.find(x => x.trade === trade || x.generic === trade);
    const drugType = lib ? lib.type : '';
    const isEye = /drop|eye|ophth|moxiflox|vigamox|pred|tears/i.test(trade + ' ' + (drugType || ''));
    return {
      trade,
      generic: lib ? lib.generic : trade,
      eye: isEye ? 'Both Eyes (OU)' : 'Oral',
      freq,
      dur
    };
  });
  RX_TEMPLATES_META[key] = { dept, name, notes: '' };
  saveRxTemplatesToStorage();
  refreshRxTemplateSelects();
  renderSetRxTplList && renderSetRxTplList();
  if (mode === 'modal') closeM('m-add-rx-tpl');
  showToast('Template "'+name+'" saved ✓','s');
}
function openNewRxTemplateModal() {
  ['rx-tpl-name-modal','rx-tpl-drugs-modal'].forEach(function (id) { const el = document.getElementById(id); if (el) el.value = ''; });
  const deptSel = document.getElementById('rx-tpl-dept-settings-modal');
  if (deptSel) deptSel.value = 'Ophthalmology';
  openM('m-add-rx-tpl');
}

// IOP PACHYMETRY CORRECTION


// BMSH ID generator (unified, no centre suffix)
function genUID() {
  const fallback = Math.max(56000, Number(window._nextPatientNum || 56000));
  const nextId = 'BMSH-' + String(fallback).padStart(6,'0');
  const el = document.getElementById('m-uid'); if(el) el.textContent = nextId;
  return nextId;
}

// IPD BED RENAME
function renameIPDBed(id) {
  const newBed = prompt('Enter new bed/ward name:');
  if(newBed) {
    const p = IPD_PATIENTS.find(x=>x.id===id); if(p) { p.ward=newBed; renderIPD(); showToast('Bed renamed ✓','s'); }
  }
}

// Extended renderIPD to include rename button


// INVENTORY MANUAL ENTRY
function renderInventoryManual() {
  const el = document.getElementById('inv-manual-form'); if(!el) return;
}
function bmhFindOrCreateInventoryItem(rawCode, translated) {
  const lookup = String(rawCode || '').trim();
  let item = BCMAP[lookup] || BCMAP[lookup.toLowerCase().substring(0, 15)] || INVENTORY.find(x => x.barcode === lookup || x.name.toLowerCase() === lookup.toLowerCase());
  if (item) return item;
  item = {
    name: translated || lookup,
    barcode: lookup || ('INV-' + Date.now()),
    qr: lookup || '',
    cat: 'General',
    mrp: Number(document.getElementById('inv-in-mrp')?.value || '0') || 0,
    cost: Number(document.getElementById('inv-in-cost')?.value || '0') || 0,
    stock: 0,
    min: 5,
    exp: document.getElementById('inv-in-exp')?.value || '',
    dept: bmhInventoryDeptValue(),
    vendor: document.getElementById('inv-in-vendor')?.value?.trim() || ''
  };
  INVENTORY.push(item);
  BCMAP[item.barcode] = item;
  return item;
}
function bmhRecordInventoryPurchase(item, qty, billFile) {
  const vendor = document.getElementById('inv-in-vendor')?.value?.trim() || '';
  const invoiceNo = document.getElementById('inv-in-invoice')?.value?.trim() || '';
  const dept = bmhInventoryDeptValue();
  const cost = Number(document.getElementById('inv-in-cost')?.value || item.cost || 0) || 0;
  const mrp = Number(document.getElementById('inv-in-mrp')?.value || item.mrp || 0) || 0;
  item.cost = cost;
  item.mrp = mrp;
  item.dept = dept;
  item.vendor = vendor || item.vendor || '';
  item.exp = document.getElementById('inv-in-exp')?.value || item.exp || '';
  const totalCost = qty * cost;
  const purchase = {
    id:'PO' + Date.now() + Math.random().toString(36).slice(2, 5),
    itemName:item.name,
    barcode:item.barcode,
    dept,
    vendor,
    invoiceNo,
    qty,
    cost,
    mrp,
    totalCost,
    ts:bmhNowISO(),
    billFile: billFile || null
  };
  window.BMH_PURCHASES.push(purchase);
  if (vendor && totalCost > 0) {
    window.BMH_VENDOR_BILLS.push({
      id: 'VB' + Date.now() + Math.random().toString(36).slice(2, 5),
      vendor,
      invoiceNo,
      amount: totalCost,
      dueDate: '',
      status: 'pending',
      uploadedName: billFile?.name || '',
      billFile: billFile || null,
      createdAt: purchase.ts
    });
  }
  saveBmhFinancials();
  renderInventoryPurchaseLog();
  bmhRenderVendorTables();
}
// Extend processBC — stock in / patient use with inventory deduction + patient charge line
function processBC(mode, code) {
  if (!code) return;
  const translated = code.replace(/^MFX/, 'Moxifloxacin Eye Drop').replace(/^PDN/, 'Prednisolone Eye Drop').replace(/^IOL/, 'AcrySof IOL').replace(/^BEV/, 'Bevacizumab Injection').replace(/^MAN/, 'Mannitol IV');
  const item = BCMAP[code] || BCMAP[code.toLowerCase().substring(0, 15)] || INVENTORY.find(x => x.name.toLowerCase() === String(code).toLowerCase());
  if (mode === 'in') {
    const qty = Math.max(1, Number(document.getElementById('inv-in-qty')?.value || '1'));
    const target = item || bmhFindOrCreateInventoryItem(code, translated);
    bmhCompressFileToData(document.getElementById('inv-in-bill-file')?.files?.[0], (billFile) => {
      target.stock = (target.stock || 0) + qty;
      bmhRecordInventoryPurchase(target, qty, billFile);
      saveInventoryStockToStorage();
      renderStockList();
      const log = document.getElementById('stock-in-log');
      if (log) {
        const d = document.createElement('div');
        d.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;background:var(--green-lt);border-radius:8px;margin-bottom:6px;font-size:12px';
        d.innerHTML = `<span><strong>${target.name}</strong> · ${bmhDeptLabel(target.dept || 'general')}</span><span style="font-weight:900;color:#1a8c3c">+${qty}</span>`;
        log.prepend(d);
      }
      showToast('Stock in: ' + target.name + ' (+' + qty + ')', 's');
    });
    return;
  }
  if (mode === 'use') {
    const bmhId = document.getElementById('use-pt')?.value || PATIENTS[0]?.bmhId;
    const qty = Math.max(1, Number(document.getElementById('inv-use-qty')?.value || '1'));
    const useMode = document.getElementById('inv-use-mode')?.value || 'bill';
    const dept = bmhInventoryUseDeptValue();
    if (item) {
      bmhUseInventoryItemForPatient(bmhId, item, { descSuffix: '(inventory use)', qty, mode: useMode, dept });
      const log = document.getElementById('use-log');
      if (log) {
        const d = document.createElement('div');
        d.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;background:var(--orange-lt);border-radius:8px;margin-bottom:6px;font-size:12px';
        d.innerHTML = `<span><strong>${item.name}</strong> · ${bmhId}</span><span style="font-weight:900;color:#8a4200">${useMode === 'bill' ? 'Billed' : 'Consumed'} × ${qty}</span>`;
        log.prepend(d);
      }
      showToast(item.name + (useMode === 'bill' ? ' → patient bill ₹' + (Number(item.mrp) || 0).toLocaleString('en-IN') : ' consumed from stock') , 's');
    } else {
      showToast('Scanned: "' + translated + '" — not in inventory', 'i');
      AUTO_BILL.push({ item: translated, mrp: 0, patient: bmhId, time: new Date().toLocaleTimeString() });
      if (useMode !== 'consume') addBmhPatientCharge(bmhId, { id: 'inv' + Date.now(), cat: 'pharmacy', desc: translated + ' (not in stock / OCR)', qty: qty, rate: 0, amount: 0, source: 'inventory', ts: new Date().toISOString() });
      window.BMH_INVENTORY_USAGE.push({ id:'IU' + Date.now(), bmhId, patientName:(PATIENTS.find(x=>x.bmhId===bmhId)||{}).name || bmhId, dept, itemName:translated, barcode:code, qty, mrp:0, cost:0, mode:useMode, ts:bmhNowISO() });
      saveBmhFinancials();
      renderInventoryUsageLog();
      renderAutoBillLog();
      renderBillingPageIfActive && renderBillingPageIfActive();
    }
    const ilc = document.getElementById('inv-low-cnt'); if (ilc) ilc.textContent = INVENTORY.filter(i => i.stock <= i.min).length;
  }
}

// v13 nav extension merged into base nav


// ═══════════════════════════════════════
// OT MODULE — DATA & FUNCTIONS
// ═══════════════════════════════════════


// ─── RENDER OT LIST ───────────────────


function otCaseCard(c, sno) {
  c = normalizeOTCaseRecord(c);
  const timings = c.timings || { incision:'', procEnd:'', anaesStart:'' };
  const statusStyle = {
    pending:{bg:'var(--g6)',border:'var(--g4)',badge:'bd-gray',label:'⏳ Pending'},
    'in-progress':{bg:'var(--blue-lt)',border:'var(--blue)',badge:'bd-blue',label:'🔄 In Progress'},
    completed:{bg:'var(--green-lt)',border:'var(--green)',badge:'bd-green',label:'✅ Completed'},
    postponed:{bg:'var(--red-lt)',border:'var(--red)',badge:'bd-red',label:'⏸️ Postponed'},
  }[c.status]||{bg:'var(--g6)',border:'var(--g4)',badge:'bd-gray',label:c.status};

  const whoHTML = `<div style="display:flex;gap:4px;margin-top:4px">
    <span style="font-size:9px;padding:2px 5px;border-radius:10px;font-weight:700;background:${c.signIn?'var(--green-lt)':'var(--g5)'};color:${c.signIn?'#1a8c3c':'var(--g1)'}">Sign In ${c.signIn?'✓':''}</span>
    <span style="font-size:9px;padding:2px 5px;border-radius:10px;font-weight:700;background:${c.timeOut?'var(--green-lt)':'var(--g5)'};color:${c.timeOut?'#1a8c3c':'var(--g1)'}">T/O ${c.timeOut?'✓':''}</span>
    <span style="font-size:9px;padding:2px 5px;border-radius:10px;font-weight:700;background:${c.signOut?'var(--green-lt)':'var(--g5)'};color:${c.signOut?'#1a8c3c':'var(--g1)'}">Sign Out ${c.signOut?'✓':''}</span>
  </div>`;

  const priorityBadge = c.priority==='emergency'?'<span class="badge bd-red" style="font-size:9px">🚨 Emergency</span>':c.priority==='urgent'?'<span class="badge bd-orange" style="font-size:9px">⚡ Urgent</span>':'';
  const pack = resolveSurgeryPackForCase(c);
  const surgeryMeta = [
    c.site && c.site !== 'N/A' ? '👁️ ' + c.site : '',
    c.iolType && c.iolType !== '—' && c.iolType !== 'N/A' ? '🔬 ' + c.iolType : '',
    c.iolPower && c.iolPower !== '—' ? '⚡ ' + c.iolPower : ''
  ].filter(Boolean).join(' · ');

  return `<div style="background:${statusStyle.bg};border-radius:var(--r);padding:11px 13px;margin-bottom:8px;border:1.5px solid ${statusStyle.border};cursor:pointer;transition:all .2s" onclick="openOTCase('${c.id}')" onmouseenter="this.style.transform='translateY(-1px)'" onmouseleave="this.style.transform=''">
    <div style="display:flex;align-items:flex-start;gap:10px">
      <div style="font-size:10px;font-weight:900;color:var(--g2);width:20px;text-align:center;flex-shrink:0;padding-top:3px">${sno}</div>
      <div style="width:34px;height:34px;border-radius:50%;background:${c.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#fff;flex-shrink:0">${c.initials}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap">
          <div style="font-size:13px;font-weight:900">${c.patient}</div>
          <div style="font-family:var(--mono);font-size:9px;color:var(--bmh-teal);font-weight:700">${c.bmhId}</div>
          <span class="badge ${statusStyle.badge}" style="font-size:9.5px">${statusStyle.label}</span>
          ${priorityBadge}
        </div>
        <div style="font-size:11px;color:var(--tx3);margin-top:3px;font-weight:600">${c.procedure}</div>
        <div style="font-size:10.5px;color:var(--g1);margin-top:2px">${c.dx}</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:10.5px;color:var(--g1);margin-top:4px">
          <span>👨‍⚕️ ${c.surgeon}</span>
          <span>📅 ${formatDateIN(c.date)}</span>
          <span>🕐 ${c.scheduledTime}</span>
          <span>🏥 ${c.room}</span>
          ${surgeryMeta?`<span>${surgeryMeta}</span>`:''}
        </div>
        ${whoHTML}
        ${otActionIconsHtml(c.id)}
        ${timings.incision&&timings.procEnd?`<div style="font-size:10px;color:${c.status==='completed'?'#1a8c3c':'var(--blue)'};font-weight:700;margin-top:4px">✂️ In: ${timings.incision} → Out: ${timings.procEnd} · Anaes: ${timings.anaesStart||'—'}</div>`:''}
        ${c.complications&&c.complications!=='None'?`<div style="font-size:10px;color:var(--red);font-weight:800;margin-top:3px">⚠️ Complication: ${c.complications}</div>`:''}
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">
        <select style="font-size:10px;padding:3px 5px;border-radius:6px" onchange="updateOTStatus('${c.id}',this.value)" onclick="event.stopPropagation()">
          <option value="pending" ${c.status==='pending'?'selected':''}>Pending</option>
          <option value="in-progress" ${c.status==='in-progress'?'selected':''}>In Progress</option>
          <option value="completed" ${c.status==='completed'?'selected':''}>Completed</option>
          <option value="postponed" ${c.status==='postponed'?'selected':''}>Postponed</option>
        </select>
        <button class="btn btn-xs btn-outline" onclick="event.stopPropagation();openOTAddModal({caseId:'${c.id}'})">✏️ Edit</button>
        ${pack ? `<button class="btn btn-xs btn-gold" onclick="event.stopPropagation();printSurgeryPackForCase('${c.id}','${pack.id}')">📋 Pack</button>` : ''}
        <button class="btn btn-xs btn-outline" onclick="event.stopPropagation();printOTCard('${c.id}')">🖨️</button>
        <button class="btn btn-xs btn-gray" onclick="event.stopPropagation();deleteOTCase('${c.id}')">🗑️</button>
      </div>
    </div>
  </div>`;
}

// ─── OPEN OT CASE DETAIL ─────────────
function openOTCase(id) {
  const idx = OT_CASES.findIndex(x=>x.id===id); if(idx<0) return;
  OT_CASES[idx] = normalizeOTCaseRecord(OT_CASES[idx]);
  const c = OT_CASES[idx];
  activeOTCase = c;

  const timerCase = document.getElementById('ot-timer-case');
  if(timerCase) timerCase.textContent = `${c.patient} · ${c.id}`;

  // Prefill timings
  ['in','anaes','incision','proc-end','out','rr'].forEach((t,i)=>{
    const key = ['patientIn','anaesStart','incision','procEnd','patientOut','rrIn'][i];
    const el = document.getElementById('ot-t-'+t); if(el) el.value = c.timings[key]||'';
  });

  // Prefill notes
  const setVal = (id,val)=>{ const el=document.getElementById(id); if(el) el.value=val; };
  setVal('ot-preop-dx', c.dx);
  setVal('ot-postop-dx', c.dx);
  setVal('ot-procedure', c.procedure);
  setVal('ot-implant', c.iol);
  setVal('ot-anaes-dr', c.anaesDoc);
  setVal('ot-findings', c.findings||'');
  setVal('ot-narrative', c.narrative||'');
  setVal('ot-notes', c.notes||'');
  setVal('ot-blood-loss', c.bloodLoss||'');
  setVal('ot-scrub-nurse', c.scrubNurse||'');
  setVal('ot-circ-nurse', c.circNurse||'');
  if (typeof refreshOTNotesTemplateSelect === 'function') refreshOTNotesTemplateSelect();

  const selAnaes = document.getElementById('ot-anaes-type');
  if(selAnaes) selAnaes.value = c.anaes;

  const selSurg = document.getElementById('ot-notes-surgeon');
  if(selSurg) selSurg.value = c.surgeon;

  const selComp = document.getElementById('ot-complications');
  if(selComp && c.complications) selComp.value = c.complications;

  // Detail panel
  const detail = document.getElementById('ot-case-detail'); if(!detail) return;
  const statusColor = {pending:'var(--g1)','in-progress':'var(--blue)',completed:'#1a8c3c',postponed:'var(--red)'}[c.status]||'var(--g1)';
  detail.innerHTML = `
    <div class="card-hd">
      <div>
        <div class="card-title">${c.patient}</div>
        <div style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal)">${c.bmhId} · ${c.id}</div>
      </div>
      <span class="badge" style="background:${c.status==='completed'?'var(--green-lt)':c.status==='in-progress'?'var(--blue-lt)':'var(--g5)'};color:${statusColor}">${c.status.replace('-',' ').toUpperCase()}</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11.5px;margin-bottom:12px">
      ${[['Age/Sex',`${c.age}Y / ${c.sex}`],['Procedure',c.procedure],['OT Date',formatDateIN(c.date)],['Surgeon',c.surgeon],['Room',c.room],['Time',c.scheduledTime],['Anaesthesia',c.anaes],['IOL/Implant',c.iol],['Priority',c.priority.toUpperCase()]].map(([l,v])=>`<div><div style="font-size:9px;font-weight:800;color:var(--g1);text-transform:uppercase;letter-spacing:.4px">${l}</div><div style="font-weight:700;margin-top:1px">${v}</div></div>`).join('')}
    </div>
    <div style="background:var(--g6);border-radius:var(--rsm);padding:10px;margin-bottom:10px">
      <div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px">Diagnosis</div>
      <div style="font-size:12px;font-weight:700">${c.dx}</div>
    </div>
    ${c.notes?`<div style="background:var(--blue-lt);border-radius:var(--rsm);padding:10px;margin-bottom:10px"><div style="font-size:10px;font-weight:800;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px">Notes / Special Instructions</div><div style="font-size:12px;color:var(--tx3)">${c.notes}</div></div>`:''}
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:12px">
      ${[['Pre-op Workup',c.preop,'#1a8c3c'],['Consent',c.consent,'#1a8c3c'],['Fasting',c.fasting,'#1a8c3c']].map(([l,v,col])=>`<div style="background:var(--green-lt);border-radius:7px;padding:8px;text-align:center"><div style="font-size:9px;font-weight:800;color:${col};text-transform:uppercase;letter-spacing:.4px;margin-bottom:3px">${l}</div><div style="font-size:10.5px;font-weight:700;color:${col}">${v}</div></div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:12px">
      ${[['Sign In',c.signIn,'signin'],['Time Out',c.timeOut,'timeout'],['Sign Out',c.signOut,'signout']].map(([l,done,tab])=>`<button onclick="ptab(document.querySelector('.ptab[onclick*=${tab}]'),\\'who-${tab}\\')">
        <div style="background:${done?'var(--green-lt)':'var(--g6)'};border-radius:8px;padding:9px;text-align:center;cursor:pointer;border:1.5px solid ${done?'var(--green)':'var(--g4)'}">
          <div style="font-size:16px">${done?'✅':'⬜'}</div>
          <div style="font-size:10px;font-weight:800;color:${done?'#1a8c3c':'var(--g1)'};margin-top:3px">${l}</div>
        </div></button>`).join('')}
    </div>
    <div style="display:flex;gap:7px;flex-wrap:wrap">
      <button class="btn btn-gold btn-sm" onclick="printOTCard('${c.id}')">🖨️ Print OT Card</button>
      <button class="btn btn-outline btn-sm" onclick="openOTAddModal({caseId:'${c.id}'})">✏️ Edit OT Case</button>
      <button class="btn btn-outline btn-sm" onclick="printOTNotes()">📝 Operative Notes</button>
      <button class="btn btn-blue btn-sm" onclick="printWHOChecklist()">✅ WHO Checklist</button>
    </div>`;

  calcOTDurations();
  showToast(`OT Case ${c.id} opened ✓`,'i');
}

// ─── OT UTILITY FUNCTIONS ─────────────
function stampTime(id) {
  const el = document.getElementById(id); if(!el) return;
  el.value = new Date().toTimeString().slice(0,5);
  showToast('⏱️ Time stamped: '+el.value,'s');
  // Save to activeOTCase.timings
  if(activeOTCase) {
    const keyMap = {'ot-t-in':'patientIn','ot-t-anaes':'anaesStart','ot-t-incision':'incision','ot-t-proc-end':'procEnd','ot-t-out':'patientOut','ot-t-rr':'rrIn'};
    const key = keyMap[id];
    if(key) {
      activeOTCase.timings[key] = el.value;
      fbUpdate('otCases/'+activeOTCase.id, {'timings':activeOTCase.timings}).catch(()=>{});
    }
  }
  calcOTDurations();
}

function calcOTDurations() {
  const get = id => { const el=document.getElementById(id); return el?.value||''; };
  const toMins = t => { if(!t) return null; const [h,m]=t.split(':').map(Number); return h*60+m; };
  const fmt = mins => { if(mins===null||isNaN(mins)||mins<0) return '—'; return `${Math.floor(mins/60)?Math.floor(mins/60)+'h ':''}${mins%60}m`; };

  const anaes = toMins(get('ot-t-anaes'));
  const incision = toMins(get('ot-t-incision'));
  const procEnd = toMins(get('ot-t-proc-end'));
  const ptIn = toMins(get('ot-t-in'));
  const ptOut = toMins(get('ot-t-out'));

  const el1=document.getElementById('dur-anaes-incision'); if(el1) el1.textContent=fmt(anaes&&incision?incision-anaes:null);
  const el2=document.getElementById('dur-procedure'); if(el2) el2.textContent=fmt(incision&&procEnd?procEnd-incision:null);
  const el3=document.getElementById('dur-total-ot'); if(el3) el3.textContent=fmt(ptIn&&ptOut?ptOut-ptIn:null);
}

function updateOTStatus(id, status) {
  const c = OT_CASES.find(x=>x.id===id); if(!c) return;
  c.status = status;
  c.lastUpdated = new Date().toISOString();
  if (status === 'completed') {
    scheduleDefaultSurgeryFollowups(c);
  }
  fbUpdate('otCases/' + id, { status, lastUpdated: c.lastUpdated }).catch(e => console.warn('OT status save error:', e));
  renderOTList();
  showToast(`${c.patient} — status updated to ${status} ✓`,'s');
  if(activeOTCase?.id===id) openOTCase(id);
}
function scheduleDefaultSurgeryFollowups(otCase) {
  const source = otCase || {};
  const c = normalizeOTCaseRecord(source);
  if (!c.bmhId || !c.date) return;
  const dayOffsets = [
    { days: 1, label: 'Post-op Day 1 review', type: 'post-op' },
    { days: 7, label: 'Post-op 1 week review', type: 'post-op' },
    { days: 14, label: 'Post-op 2 week review', type: 'post-op' }
  ];
  const baseDate = new Date(c.date + 'T09:00:00');
  const made = [];
  dayOffsets.forEach(function (cfg) {
    const dt = new Date(baseDate.getTime() + cfg.days * 24 * 60 * 60 * 1000);
    const iso = dt.toISOString().split('T')[0];
    const time = normalizeAptTimeLabel(getNearestAppointmentSlot(iso));
    const exists = (APPOINTMENTS || []).some(function (a) {
      return a.bmhId === c.bmhId && a.date === iso && a.type === 'post-op' && /post-op/i.test(String(a.purpose || ''));
    });
    if (exists) return;
    const apt = {
      id: 'APT' + Date.now() + Math.random().toString(36).slice(2, 5),
      patient: c.patient,
      bmhId: c.bmhId,
      doctor: c.surgeon || CURRENT_USER?.name || '',
      purpose: cfg.label + ' — ' + (c.procedure || 'Surgery'),
      date: iso,
      time: time,
      type: cfg.type,
      centre: c.centre || CURRENT_USER?.centre || 'CHD',
      status: 'booked'
    };
    APPOINTMENTS.push(apt);
    saveAppointmentToFirebase && saveAppointmentToFirebase(apt);
    made.push(apt);
  });
  c.autoFollowups = made.map(function (a) { return { date: a.date, time: a.time, label: a.purpose }; });
  source.autoFollowups = c.autoFollowups.slice();
  fbUpdate('otCases/' + c.id, { autoFollowups: c.autoFollowups }).catch(function () {});
}

function toggleWHO(el) {
  const checked = el.getAttribute('data-checked') !== '1';
  el.setAttribute('data-checked', checked ? '1' : '0');
  el.style.background = checked ? 'var(--green)' : '#fff';
  el.style.borderColor = checked ? 'var(--green)' : 'var(--g4)';
  el.textContent = checked ? '✓' : '';
  el.style.color = checked ? '#fff' : '';
}

function signOffWHO(phase) {
  if(!activeOTCase){showToast('Select a case first','w');return;}
  const field = phase==='signin'?'signIn':phase==='timeout'?'timeOut':'signOut';
  // Check all checkboxes in the relevant WHO tab are ticked
  const tabId = 'who-'+phase;
  const tab = document.getElementById(tabId);
  const unchecked = tab ? tab.querySelectorAll('.who-cb:not([data-checked="1"])') : [];
  if(unchecked.length>0) {
    showToast('⚠️ Please complete all checklist items before signing off','w'); return;
  }
  activeOTCase[field] = true;
  activeOTCase[field+'Time'] = new Date().toTimeString().slice(0,5);
  activeOTCase[field+'By'] = CURRENT_USER?.name || '—';
  fbUpdate('otCases/' + activeOTCase.id, {
    [field]: true,
    [field+'Time']: activeOTCase[field+'Time'],
    [field+'By']: activeOTCase[field+'By'],
    lastUpdated: new Date().toISOString()
  }).catch(e => console.warn('WHO save error:', e));
  showToast(`✅ WHO ${phase==='signin'?'Sign In':phase==='timeout'?'Time Out':'Sign Out'} completed for ${activeOTCase.patient} ✓`,'s');
  renderOTList();
  openOTCase(activeOTCase.id);
}

function addOTCase() {
  const editId = document.getElementById('ot-add-case-id')?.value || '';
  const ptSel = document.getElementById('ot-pt-sel');
  const ptOpt = ptSel?.options[ptSel.selectedIndex];
  const ptName = ptOpt?.text?.split(' — ')[0]||'New Patient';
  const ptId = document.getElementById('ot-bmsh-id')?.value||'BMSH-'+Math.floor(Math.random()*900000+100000);
  const proc = document.getElementById('ot-add-proc')?.value||'';
  const surgeon = document.getElementById('ot-add-surgeon')?.value||'';
  const anaes = document.getElementById('ot-add-anaes')?.value||'';
  const date = document.getElementById('ot-add-date')?.value||new Date().toISOString().split('T')[0];
  const time = document.getElementById('ot-add-time')?.value||'09:00';
  const room = document.getElementById('ot-add-room')?.value||'OT-1';
  const dx = document.getElementById('ot-add-dx')?.value||'';
  const site = document.getElementById('ot-add-site')?.value||'';
  const iol = document.getElementById('ot-add-iol')?.value||'N/A';
  const iolType = document.getElementById('ot-add-iol-model')?.value || '';
  const iolPower = document.getElementById('ot-add-iol-power')?.value || extractIolPower(iol);
  const priority = document.getElementById('ot-add-priority')?.value||'elective';
  const notes = document.getElementById('ot-add-notes')?.value||'';
  const preop = document.getElementById('ot-add-preop')?.value||'';
  const consent = document.getElementById('ot-add-consent')?.value||'';
  const fasting = document.getElementById('ot-add-fasting')?.value||'';
  const pt = PATIENTS.find(p=>p.bmhId===ptId);

  const existing = editId ? normalizeOTCaseRecord(OT_CASES.find(function (c) { return c.id === editId; }) || {}) : null;
  const newCase = {
    id: editId || ('OT-'+Date.now()), bmhId:ptId, patient:ptName,
    age:pt?.age||'—', sex:pt?.sex||'—',
    dx, procedure:proc, site, surgeon, anaes, anaesDoc:'',
    date, scheduledTime:time, room, iol, iolType, iolPower, priority,
    centre: pt?.centre || getEffectiveCentre() || CURRENT_USER?.centre || 'CHD',
    preop, consent, fasting, status:'pending',
    timings:{patientIn:'',anaesStart:'',incision:'',procEnd:'',patientOut:'',rrIn:''},
    complications:'', bloodLoss:'', notes,
    signIn:false, timeOut:false, signOut:false,
    scrubNurse:'', circNurse:'',
    color:pt?.color||'#1A3C6E', initials:ptName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase(),
    createdAt: new Date().toISOString(),
    createdBy: CURRENT_USER?.name || 'System'
  };
  const normalized = normalizeOTCaseRecord(Object.assign({}, existing || {}, newCase));
  if (editId) {
    const idx = OT_CASES.findIndex(function (c) { return c.id === editId; });
    if (idx >= 0) OT_CASES[idx] = normalized;
    else OT_CASES.push(normalized);
  } else {
    OT_CASES.push(normalized);
  }
  // Save to Firebase
  fbSet('otCases/' + normalized.id, normalized).catch(e => console.warn('OT save error:', e));
  renderOTList();
  showToast(`⚕️ ${ptName} ${editId ? 'updated in' : 'added to'} OT list ✓`,'s');
  closeM('m-ot-add');
  activeOTCase = normalized;
  openOTCase(normalized.id);
}

function lookupOTPatient(val) {
  const el = document.getElementById('ot-pt-lookup-result'); if(!el) return;
  if(!val||val.length<3) { el.innerHTML=''; return; }
  const v = val.trim().toUpperCase();
  const vLow = val.trim().toLowerCase();
  // Search by BMSH ID, phone, or name
  const matches = PATIENTS.filter(x =>
    x.bmhId===v ||
    x.bmhId.includes(v.replace('BMSH-','')) ||
    (x.mob && x.mob.replace(/\s/g,'').includes(val.replace(/\s/g,''))) ||
    (x.name && x.name.toLowerCase().includes(vLow))
  ).slice(0,5);

  if(matches.length===1) {
    const p=matches[0];
    el.innerHTML = `<div style="background:var(--green-lt);border-radius:8px;padding:9px;border-left:3px solid var(--green);display:flex;align-items:center;gap:9px">
      <div style="flex:1;font-size:12.5px"><strong>${p.name}</strong> · ${p.bmhId} · ${p.age||'?'}Y/${p.sex||''}</div>
      <button class="btn btn-xs btn-gold" onclick="fillOTFromPatient('${p.bmhId}')">✅ Prefill</button>
    </div>`;
  } else if(matches.length>1) {
    el.innerHTML = `<div style="border:1.5px solid var(--blue);border-radius:8px;overflow:hidden">
      <div style="padding:5px 10px;background:var(--blue-lt);font-size:10px;font-weight:800;color:var(--blue)">${matches.length} patients found</div>
      ${matches.map(p=>`<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-bottom:1px solid var(--g5)">
        <div style="flex:1;font-size:12px"><strong>${p.name}</strong> · ${p.bmhId} · ${p.age||'?'}Y/${(p.sex||'?')[0]}</div>
        <button class="btn btn-xs btn-gold" onclick="fillOTFromPatient('${p.bmhId}')">Prefill</button>
      </div>`).join('')}
    </div>`;
  } else {
    el.innerHTML = val.length>=4 ? '<div style="font-size:11px;color:var(--g1);padding:5px 8px;background:var(--g6);border-radius:6px">No patient found — check BMSH ID or phone</div>' : '';
  }
}

function fillOTFromPatient(bmhId) {
  const p = PATIENTS.find(x=>x.bmhId===bmhId); if(!p) return;
  // Update the dropdown
  const ptSel = document.getElementById('ot-pt-sel');
  if(ptSel) {
    // Add option if not present
    if(![...ptSel.options].some(o=>o.value===bmhId)) {
      const opt=document.createElement('option'); opt.value=bmhId;
      opt.textContent=`${p.name} — ${p.bmhId} — ${p.age||'?'}Y/${p.sex||''}`;
      ptSel.appendChild(opt);
    }
    ptSel.value=bmhId;
  }
  // Fill all fields
  const setV=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v;};
  const dxGuess = p.dx || p.diagnosis || p.lastVisit?.dx || p.purpose || '';
  setV('ot-bmsh-id', p.bmhId);
  setV('ot-age-sex', `${p.age||'?'}Y / ${p.sex||'—'}`);
  populateOTDiagnosisOptions(dxGuess);
  setV('ot-add-site', p.eye || p.opEye || p.surgEye || p.operatingEye || 'N/A');
  if(p.doctor) { const drSel=document.getElementById('ot-add-surgeon'); if(drSel) drSel.value=p.doctor; }
  const guessedProcedure = /surgery|phaco|pmics|cataract|lasik|ivt|trab|pteryg|delivery|lscs|lapar/i.test(String(p.purpose || ''))
    ? String(p.purpose).trim()
    : (p.dept === 'ophtho' ? 'PMICS + IOL Implantation (OS)' : 'Surgery');
  populateOTProcedureOptions(guessedProcedure);
  populateOTIolOptions(p.iol || p.iolType || '', p.iolPower || extractIolPower(p.iol || p.iolType || ''));
  // Clear lookup
  const el=document.getElementById('ot-pt-lookup-result'); if(el) el.innerHTML='';
  const lkp=document.getElementById('ot-pt-lookup'); if(lkp) lkp.value='';
  showToast(`✅ ${p.name} prefilled into OT case`,'s');
}

function prefillOTCase(bmhId) {
  if(!bmhId) return;
  fillOTFromPatient(bmhId);
}

function openOTAddModal(opts) {
  opts = opts || {};
  // Populate patient dropdown with today's patients + all patients
  const ptSel = document.getElementById('ot-pt-sel');
  if(ptSel) {
    const today = new Date().toISOString().slice(0,10);
    const todayPts = PATIENTS.filter(p=>p.createdAt?.startsWith(today)||p.checkinAt);
    const otherPts = PATIENTS.filter(p=>!todayPts.some(x=>x.bmhId===p.bmhId)).slice(0,50);
    const renderOpts = pts => pts.map(p=>`<option value="${p.bmhId}">${p.name} — ${p.bmhId} — ${p.age||'?'}Y/${p.sex||''}</option>`).join('');
    ptSel.innerHTML = `<option value="">— Search above or select —</option>`;
    if(todayPts.length) ptSel.innerHTML += `<optgroup label="Today's Patients">${renderOpts(todayPts)}</optgroup>`;
    if(otherPts.length) ptSel.innerHTML += `<optgroup label="All Patients">${renderOpts(otherPts)}</optgroup>`;
  }
  // Set today's date as default
  const dateEl=document.getElementById('ot-add-date'); if(dateEl&&!dateEl.value) dateEl.value=new Date().toISOString().split('T')[0];
  const titleEl = document.getElementById('ot-add-modal-title');
  const saveBtn = document.getElementById('ot-add-save-btn');
  const editIdEl = document.getElementById('ot-add-case-id');
  if (editIdEl) editIdEl.value = opts.caseId || '';
  loadOTDiagnosisOptions();
  populateOTDiagnosisOptions();
  populateOTProcedureOptions();
  populateOTIolOptions();
  if (titleEl) titleEl.textContent = opts.caseId ? '⚕️ Edit OT Case' : '⚕️ Add OT Case';
  if (saveBtn) saveBtn.textContent = opts.caseId ? '💾 Update OT Case' : '✅ Add to OT List';
  if (opts.caseId) {
    const existing = normalizeOTCaseRecord(OT_CASES.find(function (c) { return c.id === opts.caseId; }) || {});
    const setV=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v||'';};
    setV('ot-bmsh-id', existing.bmhId);
    setV('ot-age-sex', `${existing.age||'?'}Y / ${existing.sex||'—'}`);
    populateOTDiagnosisOptions(existing.dx);
    populateOTProcedureOptions(existing.procedure);
    setV('ot-add-site', existing.site);
    setV('ot-add-surgeon', existing.surgeon);
    setV('ot-add-anaes', existing.anaes);
    setV('ot-add-date', existing.date);
    setV('ot-add-time', existing.scheduledTime);
    setV('ot-add-room', existing.room);
    setV('ot-add-priority', existing.priority);
    populateOTIolOptions(existing.iolType || existing.iol || '', existing.iolPower || extractIolPower(existing.iol));
    setV('ot-add-iol', existing.iol || '');
    setV('ot-add-preop', existing.preop);
    setV('ot-add-consent', existing.consent);
    setV('ot-add-fasting', existing.fasting);
    setV('ot-add-notes', existing.notes);
    if (ptSel && existing.bmhId && ![...ptSel.options].some(function (o) { return o.value === existing.bmhId; })) {
      const opt = document.createElement('option');
      opt.value = existing.bmhId;
      opt.textContent = `${existing.patient} — ${existing.bmhId} — ${existing.age || '?'}Y/${existing.sex || ''}`;
      ptSel.appendChild(opt);
    }
    if (ptSel && existing.bmhId) ptSel.value = existing.bmhId;
  } else if (opts.bmhId) {
    fillOTFromPatient(opts.bmhId);
  }
  openM('m-ot-add');
}

function saveOTNotes() {
  if(!activeOTCase) { showToast('No case selected','w'); return; }
  const notes = document.getElementById('ot-notes')?.value || '';
  const complications = document.getElementById('ot-complications')?.value || 'None';
  const bloodLoss = document.getElementById('ot-blood-loss')?.value || document.querySelector('#pg-ot input[placeholder*="blood"]')?.value || '';
  const findings = document.getElementById('ot-findings')?.value || '';
  const narrative = document.getElementById('ot-narrative')?.value || '';
  const surgeon = document.getElementById('ot-notes-surgeon')?.value || activeOTCase.surgeon || '';
  const anaesDoc = document.getElementById('ot-anaes-dr')?.value || activeOTCase.anaesDoc || '';
  const scrubNurse = document.getElementById('ot-scrub-nurse')?.value || activeOTCase.scrubNurse || '';
  const circNurse = document.getElementById('ot-circ-nurse')?.value || activeOTCase.circNurse || '';
  const preDx = document.getElementById('ot-preop-dx')?.value || activeOTCase.dx || '';
  const postDx = document.getElementById('ot-postop-dx')?.value || activeOTCase.dx || '';
  const procedure = document.getElementById('ot-procedure')?.value || activeOTCase.procedure || '';
  const implant = document.getElementById('ot-implant')?.value || activeOTCase.iol || '';
  activeOTCase.notes = notes;
  activeOTCase.complications = complications;
  activeOTCase.bloodLoss = bloodLoss;
  activeOTCase.findings = findings;
  activeOTCase.narrative = narrative;
  activeOTCase.surgeon = surgeon;
  activeOTCase.anaesDoc = anaesDoc;
  activeOTCase.scrubNurse = scrubNurse;
  activeOTCase.circNurse = circNurse;
  activeOTCase.dx = postDx || preDx;
  activeOTCase.procedure = procedure || activeOTCase.procedure;
  activeOTCase.iol = implant || activeOTCase.iol;
  // Save to Firebase
  fbSet('otCases/' + activeOTCase.id, { ...activeOTCase, lastUpdated: new Date().toISOString(), updatedBy: CURRENT_USER?.name || 'System' })
    .then(() => showToast('Operative notes saved to database ✓', 's'))
    .catch(e => showToast('Save failed: ' + e.message, 'w'));
  renderOTList();
}
function refreshOTNotesTemplateSelect() {
  const sel = document.getElementById('ot-notes-template');
  if (!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">— Select template —</option>';
  Object.keys(RX_TEMPLATES_DATA || {}).forEach(function (key) {
    const meta = RX_TEMPLATES_META[key] || {};
    if ((meta.dept || '') !== 'ot') return;
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = meta.name || key;
    sel.appendChild(opt);
  });
  if ([].slice.call(sel.options).some(function (o) { return o.value === cur; })) sel.value = cur;
}
function applyOTNotesTemplate(key) {
  if (!key || !RX_TEMPLATES_DATA[key]) return;
  const rows = RX_TEMPLATES_DATA[key] || [];
  const notesText = rows.map(function (row) {
    const bits = [];
    const name = rxDrugTradeName(row) || row.trade || row.name || row.generic || '';
    if (name) bits.push(name);
    if (row.freq) bits.push(row.freq);
    if (row.dur) bits.push(row.dur);
    return bits.join(' — ');
  }).filter(Boolean).join('\n');
  const noteArea = document.getElementById('ot-notes');
  const findings = document.getElementById('ot-findings');
  const narrative = document.getElementById('ot-narrative');
  const meta = RX_TEMPLATES_META[key] || {};
  if (findings && !findings.value.trim()) findings.value = meta.notes || '';
  if (narrative && !narrative.value.trim()) narrative.value = notesText;
  if (noteArea && !noteArea.value.trim()) noteArea.value = notesText;
  showToast('OT note template applied ✓', 's');
}

function printOTNotes() {
  const today = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  const c = activeOTCase;
  const get = id => document.getElementById(id)?.value||'';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>*{margin:0;padding:0;box-sizing:border-box;print-color-adjust:exact;-webkit-print-color-adjust:exact}
  body{font-family:'Nunito',sans-serif;font-size:11.5px;padding:12mm;color:#1C1C1E}
  @page{size:A4 portrait;margin:10mm}
  .hdr{display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:3px solid #1A3C6E;margin-bottom:14px}
  .section{background:#f5f5f7;border-radius:8px;padding:10px 14px;margin-bottom:10px}
  .sec-title{font-size:10px;font-weight:900;color:#1A3C6E;text-transform:uppercase;letter-spacing:.5px;margin-bottom:7px}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
  .field{margin-bottom:7px}.field-lbl{font-size:9px;font-weight:800;color:#636366;text-transform:uppercase;letter-spacing:.4px;margin-bottom:2px}
  .field-val{font-size:12px;font-weight:700;border-bottom:1px solid #d1d1d6;padding-bottom:2px;min-height:20px}
  .sig-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-top:20px}
  .sig-line{border-bottom:1px solid #333;margin-top:30px}.sig-lbl{font-size:9px;color:#888;margin-top:3px}
  table{width:100%;border-collapse:collapse;font-size:11px}
  th{padding:5px 8px;background:#1A3C6E;color:#fff;text-align:left;font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.4px}
  td{padding:6px 8px;border-bottom:1px solid #eee}
  .who-box{display:inline-block;width:18px;height:18px;border-radius:4px;border:1.5px solid #333;margin-right:5px;text-align:center;line-height:16px;font-size:11px}
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  </head><body>
  <div class="hdr">
    <div><div style="font-size:17px;font-weight:900;color:#1A3C6E">Baweja Multispeciality Hospital</div>
    <div style="font-size:10px;color:#666">Chandigarh & Ropar · +91-81466 22802</div></div>
    <div style="text-align:right">
      <div style="background:#D4A017;color:#1A3C6E;font-weight:900;padding:3px 12px;border-radius:20px;font-size:11px;display:inline-block;margin-bottom:4px">OPERATIVE NOTES</div>
      <div style="font-family:monospace;font-size:13px;font-weight:900;color:#1A3C6E">${c?c.id:'OT-'}</div>
      <div style="font-size:10px;color:#666">${today}</div>
    </div>
  </div>

  <div class="section">
    <div class="sec-title">Patient Details</div>
    <div class="grid3">
      <div class="field"><div class="field-lbl">Patient Name</div><div class="field-val">${c?.patient||''}</div></div>
      <div class="field"><div class="field-lbl">BMSH ID</div><div class="field-val" style="font-family:monospace">${c?.bmhId||''}</div></div>
      <div class="field"><div class="field-lbl">Age / Sex</div><div class="field-val">${c?c.age+'Y / '+c.sex:''}</div></div>
    </div>
  </div>

  <div class="section">
    <div class="sec-title">Operative Details</div>
    <div class="grid2">
      <div class="field"><div class="field-lbl">Pre-op Diagnosis</div><div class="field-val">${get('ot-preop-dx')}</div></div>
      <div class="field"><div class="field-lbl">Post-op Diagnosis</div><div class="field-val">${get('ot-postop-dx')}</div></div>
      <div class="field"><div class="field-lbl">Procedure Performed</div><div class="field-val">${get('ot-procedure')}</div></div>
      <div class="field"><div class="field-lbl">Implant / IOL</div><div class="field-val">${get('ot-implant')}</div></div>
      <div class="field"><div class="field-lbl">Anaesthesia</div><div class="field-val">${get('ot-anaes-type')}</div></div>
      <div class="field"><div class="field-lbl">Anaesthesiologist</div><div class="field-val">${get('ot-anaes-dr')||'—'}</div></div>
      <div class="field"><div class="field-lbl">Complications</div><div class="field-val" style="color:${get('ot-complications')&&get('ot-complications')!=='None'?'#FF3B30':'#1a8c3c'}">${get('ot-complications')||'None'}</div></div>
      <div class="field"><div class="field-lbl">Blood Loss</div><div class="field-val">${document.getElementById('ot-blood-loss')?.value||'Minimal'}</div></div>
    </div>
  </div>

  <div class="section">
    <div class="sec-title">OT Timings</div>
    <table>
      <thead><tr><th>Event</th><th>Time</th><th>Event</th><th>Time</th></tr></thead>
      <tbody>
        <tr><td>Patient In OT</td><td>${document.getElementById('ot-t-in')?.value||'—'}</td><td>Procedure End</td><td>${document.getElementById('ot-t-proc-end')?.value||'—'}</td></tr>
        <tr><td>Anaesthesia Start</td><td>${document.getElementById('ot-t-anaes')?.value||'—'}</td><td>Patient Out OT</td><td>${document.getElementById('ot-t-out')?.value||'—'}</td></tr>
        <tr><td>Incision Time</td><td>${document.getElementById('ot-t-incision')?.value||'—'}</td><td>Recovery Room In</td><td>${document.getElementById('ot-t-rr')?.value||'—'}</td></tr>
      </tbody>
    </table>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:10px;font-size:11px">
      <div><strong>Anaes → Incision:</strong> ${document.getElementById('dur-anaes-incision')?.textContent||'—'}</div>
      <div><strong>Procedure Duration:</strong> ${document.getElementById('dur-procedure')?.textContent||'—'}</div>
      <div><strong>Total OT Time:</strong> ${document.getElementById('dur-total-ot')?.textContent||'—'}</div>
    </div>
  </div>

  <div class="section">
    <div class="sec-title">OT Team</div>
    <div class="grid3">
      <div class="field"><div class="field-lbl">Surgeon</div><div class="field-val">${document.getElementById('ot-notes-surgeon')?.value||''}</div></div>
      <div class="field"><div class="field-lbl">Scrub Nurse</div><div class="field-val">${document.getElementById('ot-scrub-nurse')?.value||c?.scrubNurse||''}</div></div>
      <div class="field"><div class="field-lbl">Circulating Nurse</div><div class="field-val">${document.getElementById('ot-circ-nurse')?.value||c?.circNurse||''}</div></div>
    </div>
  </div>

  <div class="section">
    <div class="sec-title">Operative Findings</div>
    <div style="font-size:12px;line-height:1.8;min-height:40px">${get('ot-findings')}</div>
  </div>

  <div class="section">
    <div class="sec-title">Operative Narrative</div>
    <div style="font-size:12px;line-height:1.9;min-height:80px">${get('ot-narrative')}</div>
  </div>

  <div class="section">
    <div class="sec-title">Post-op Instructions</div>
    <div style="font-size:12px;line-height:1.8;min-height:40px">${document.getElementById('ot-notes')?.value||'Standard post-op care.'}</div>
  </div>

  <div class="section">
    <div class="sec-title">WHO Safe Surgery Checklist Status</div>
    <div style="display:flex;gap:20px;font-size:12px">
      <div><span class="who-box">${c?.signIn?'✓':''}</span> Sign In ${c?.signIn?'— COMPLETED':'— PENDING'}</div>
      <div><span class="who-box">${c?.timeOut?'✓':''}</span> Time Out ${c?.timeOut?'— COMPLETED':'— PENDING'}</div>
      <div><span class="who-box">${c?.signOut?'✓':''}</span> Sign Out ${c?.signOut?'— COMPLETED':'— PENDING'}</div>
    </div>
  </div>

  <div class="sig-row">
    <div><div class="field-lbl">Surgeon Signature</div><div class="sig-line"></div><div class="sig-lbl">${document.getElementById('ot-notes-surgeon')?.value||''}</div></div>
    <div><div class="field-lbl">Anaesthesiologist Signature</div><div class="sig-line"></div><div class="sig-lbl">${get('ot-anaes-dr')||'—'}</div></div>
    <div><div class="field-lbl">Nurse In Charge Signature</div><div class="sig-line"></div><div class="sig-lbl">${document.getElementById('ot-scrub-nurse')?.value||c?.scrubNurse||''}</div></div>
  </div>
  </body></html>`;

  safePrint(html);
  showToast('Operative notes sent to printer ✓','s');
}

function printWHOChecklist() {
  showToast('WHO Safe Surgery Checklist printing ✓','s');
  setTimeout(()=>window.print(),300);
}

function printOTCard(id) {
  const c = OT_CASES.find(x=>x.id===id)||activeOTCase;
  if(!c){showToast('Select a case first','w');return;}
  showToast(`OT card for ${c.patient} printing ✓`,'s');
  printOTNotes();
}

// v14 nav extension merged into base nav

// ═══════════════════════════════════════
// V15 NEW FUNCTIONS
// ═══════════════════════════════════════

// ─── ICD-10 DATABASE ─────────────────

function filterDx(inp) {
  const val = inp.value.toLowerCase();
  if(val.length < 2) { hideDxDropdown(); return; }
  const matches = ICD10_DB.filter(d=>d.desc.toLowerCase().includes(val)||d.code.toLowerCase().includes(val)).slice(0,10);
  showDxDropdownList(inp, matches);
}
function showDxDropdown(inp) { if(inp.value.length>=2) filterDx(inp); }
function hideDxDropdown() { const d=document.getElementById('dx-dropdown'); if(d) d.style.display='none'; }
function showDxDropdownList(inp, matches) {
  const d = document.getElementById('dx-dropdown'); if(!d) return;
  if(!matches.length){d.style.display='none';return;}
  d.style.display='block';
  const rect = inp.getBoundingClientRect();
  d.style.position='fixed';
  d.style.top=(rect.bottom+window.scrollY)+'px';
  d.style.left=rect.left+'px';
  d.style.width=Math.max(320,rect.width)+'px';
  d.innerHTML = matches.map(m=>`<div class="dx-dropdown-item" onclick="selectDx('${m.full.replace(/'/g,"\\'")}',event)">
    <span style="font-family:var(--mono);font-size:10px;color:var(--blue);font-weight:700">${m.code}</span>
    <span style="font-size:12px;font-weight:600;margin-left:8px">${m.desc}</span>
  </div>`).join('');
}
function selectDx(fullText, event) {
  // Find the focused input and set its value
  const activeInput = document.querySelector('.dx-inp:focus') || document.querySelector('.dx-inp');
  if(activeInput) {
    activeInput.value = fullText;
    activeInput.style.background='var(--green-lt)';
    activeInput.style.borderColor='var(--green)';
  }
  hideDxDropdown();
  if(event) event.stopPropagation();
}
function addDxRow() {
  const list = document.getElementById('dx-list'); if(!list) return;
  const d = document.createElement('div');
  d.style='display:flex;gap:6px;align-items:center;margin-top:5px';
  d.innerHTML=`<input type="text" class="dx-inp" placeholder="Type diagnosis to search…" oninput="filterDx(this)" onfocus="showDxDropdown(this)" style="flex:1" autocomplete="off">
    <button class="btn btn-xs btn-gray" onclick="this.closest('div').remove()">✕</button>`;
  list.appendChild(d);
}
document.addEventListener('click', function(e) { if(!e.target.classList.contains('dx-inp')) hideDxDropdown(); });

// ─── PRESCRIPTION — NEW DRUG ROW RENDERER ─────────────────


function lookupRxGeneric(idx, tradeName) {
  const drug = DRUG_LIBRARY.find(d=>d.trade.toLowerCase()===tradeName.toLowerCase()||d.trade.toLowerCase().startsWith(tradeName.toLowerCase()));
  if(drug && RX_DRUGS[idx]) {
    RX_DRUGS[idx].trade = drug.trade;
    RX_DRUGS[idx].brand = drug.trade;
    RX_DRUGS[idx].generic = drug.generic;
    RX_DRUGS[idx].name = drug.generic;
    RX_DRUGS[idx].drugType = drug.type || RX_DRUGS[idx].drugType;
    RX_DRUGS[idx].freq = drug.freq;
    RX_DRUGS[idx].dur = drug.dur;
    renderRxDrugs();
  }
}
function normalizePersonNameForMatch(name) {
  return String(name || '').toLowerCase().replace(/\bdr\.?\s*/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}
function normalizeDeptKeyForQueue(dept) {
  const d = String(dept || '').toLowerCase().trim();
  if (!d) return '';
  if (d === 'ophtho' || d.includes('ophthalm')) return 'ophtho';
  if (d === 'obg' || d.includes('gyn') || d.includes('obst')) return 'obg';
  if (d === 'psych' || d.includes('psychi')) return 'psych';
  if (d === 'skin' || d.includes('derma') || d.includes('cosmet')) return 'skin';
  if (d === 'lab' || d.includes('lab')) return 'lab';
  if (d === 'reception') return 'reception';
  return d;
}
function doctorMatchesPatientQueue(patientDoctor, currentDoctor) {
  const p = normalizePersonNameForMatch(patientDoctor);
  const c = normalizePersonNameForMatch(currentDoctor);
  if(!c || !p) return true;
  return p === c || p.includes(c) || c.includes(p);
}

const RX_TAPER_SEGMENT_DURS = ['½ day','1 day','2 days','3 days','5 days','7 days','13 days','14 days'];
function addDaysToIsoDate(iso, days) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}
function durationLabelToDays(label) {
  const s = String(label || '').trim().toLowerCase();
  if (!s) return 7;
  if (s.includes('ongoing')) return 90;
  if (s.includes('12 month')) return 365;
  if (s.includes('6 month')) return 180;
  if (s.includes('5 month')) return 150;
  if (s.includes('4 month')) return 120;
  if (s.includes('3 month')) return 90;
  if (s.includes('2 month')) return 60;
  if (s.includes('1 month')) return 30;
  if (s.includes('6 week')) return 42;
  if (s.includes('4 week')) return 28;
  if (s.includes('3 week')) return 21;
  if (s.includes('2 week')) return 14;
  if (s.includes('1 week')) return 7;
  if (/13\s*days?/.test(s)) return 13;
  if (/6\s*days?/.test(s)) return 6;
  if (/4\s*days?/.test(s)) return 4;
  if (/14\s*days?/.test(s)) return 14;
  if (/7\s*days?/.test(s)) return 7;
  if (/5\s*days?/.test(s)) return 5;
  if (/3\s*days?/.test(s)) return 3;
  if (/2\s*days?/.test(s)) return 2;
  if (/1\s*days?/.test(s) || s === '1 day') return 1;
  if (s.includes('½') || s.includes('half')) return 1;
  const n = parseInt(s, 10);
  if (!isNaN(n)) return n;
  return 7;
}
function ensureRxTaperRows(d) {
  if (!d) return [];
  if (Array.isArray(d.taperRows)) return d.taperRows;
  if (d.taperRow) {
    d.taperRows = [{ ...d.taperRow }];
    delete d.taperRow;
    delete d.taper;
    return d.taperRows;
  }
  d.taperRows = [];
  return d.taperRows;
}
function toggleRefractivePanel() {
  const box = document.getElementById('refr-enable');
  const panel = document.getElementById('refr-panel');
  if (!panel) return;
  panel.style.display = box?.checked ? '' : 'none';
  renderOphthoRecap && renderOphthoRecap();
}
function computeRxEndAndTaperDates(d) {
  if (!d) return;
  if (!d.dateFrom) d.dateFrom = new Date().toISOString().split('T')[0];
  const n = durationLabelToDays(d.dur);
  const half = String(d.dur || '').includes('½') || String(d.dur || '').toLowerCase().includes('half');
  if (n <= 1 && half) {
    d.dateTo = d.dateFrom;
  } else {
    d.dateTo = addDaysToIsoDate(d.dateFrom, Math.max(0, Math.round(n) - 1));
  }
  const mainDurLabel = normalizeRxDurationLabel(d.dur);
  let prevTo = d.dateTo;
  ensureRxTaperRows(d).forEach(tr => {
    if (!tr.dur) tr.dur = mainDurLabel;
    tr.dur = normalizeRxDurationLabel(tr.dur);
    tr.dateFrom = addDaysToIsoDate(prevTo, 1);
    const tn = durationLabelToDays(tr.dur);
    const half = String(tr.dur || '').includes('½') || String(tr.dur || '').toLowerCase().includes('half');
    if (tn <= 1 && half) {
      tr.dateTo = tr.dateFrom;
    } else {
      tr.dateTo = addDaysToIsoDate(tr.dateFrom, Math.max(0, Math.round(tn) - 1));
    }
    prevTo = tr.dateTo;
  });
}
function syncRxDrugDates(idx) {
  const d = RX_DRUGS[idx];
  if (!d) return;
  computeRxEndAndTaperDates(d);
  renderRxDrugs();
}
function suggestTaperFreqFromMain(mainFreq) {
  const order = ['Half-hourly','Hourly','Every 2 hours','Every 3 hours','Every 4 hours','Six times daily (6x/day)','Four times daily (QID)','Three times daily (TDS)','Twice daily (BD)','Once daily (OD)','At bedtime (HS)','Once weekly'];
  const i = order.indexOf(mainFreq);
  if (i >= 0 && i < order.length - 1) return order[i + 1];
  if (/QID/i.test(mainFreq || '')) return 'Three times daily (TDS)';
  if (/TDS|Three times/i.test(mainFreq || '')) return 'Twice daily (BD)';
  return 'Twice daily (BD)';
}
function suggestNextTaperSegment(freq, mainDur) {
  const normalizedFreq = normalizeRxFreqLabel(freq || '');
  const md = normalizeRxDurationLabel(mainDur || '1 week');
  if (/Half-hourly/i.test(normalizedFreq)) return { freq:'Hourly', dur:md };
  if (/Hourly/i.test(normalizedFreq)) return { freq:'Six times daily (6x/day)', dur:md };
  if (/Every 2 hours/i.test(normalizedFreq)) return { freq:'Four times daily (QID)', dur:md };
  if (/Every 3 hours/i.test(normalizedFreq)) return { freq:'Four times daily (QID)', dur:md };
  if (/Every 4 hours/i.test(normalizedFreq)) return { freq:'Three times daily (TDS)', dur:md };
  if (/Six times daily/i.test(normalizedFreq)) return { freq:'Four times daily (QID)', dur:md };
  if (/Four times daily|QID/i.test(normalizedFreq)) return { freq:'Three times daily (TDS)', dur:md };
  if (/Three times daily|TDS/i.test(normalizedFreq)) return { freq:'Twice daily (BD)', dur:md };
  if (/Twice daily|BD/i.test(normalizedFreq)) return { freq:'Once daily (OD)', dur:md };
  if (/Once daily|OD/i.test(normalizedFreq)) return { freq:'At bedtime (HS)', dur:md };
  return { freq:suggestTaperFreqFromMain(normalizedFreq), dur:md };
}
function addTaperRow(idx, taperDur, taperIdx) {
  const orig = RX_DRUGS[idx];
  if (!orig) return;
  if (!orig.dateFrom) orig.dateFrom = new Date().toISOString().split('T')[0];
  const rows = ensureRxTaperRows(orig);
  computeRxEndAndTaperDates(orig);
  const source = (typeof taperIdx === 'number' && rows[taperIdx]) ? rows[taperIdx] : orig;
  const mainDur = normalizeRxDurationLabel(orig.dur || '1 week');
  const next = suggestNextTaperSegment(source.freq || orig.freq || '', mainDur);
  rows.splice(typeof taperIdx === 'number' ? taperIdx + 1 : rows.length, 0, {
    freq: next.freq,
    dur: next.dur,
    dateFrom: '',
    dateTo: ''
  });
  computeRxEndAndTaperDates(orig);
  renderRxDrugs();
  showToast('Taper segment added below — reduced frequency after main course ✓', 'i');
}
function clearTaperRow(idx, taperIdx) {
  const d = RX_DRUGS[idx];
  if (!d) return;
  const rows = ensureRxTaperRows(d);
  if (typeof taperIdx === 'number') rows.splice(taperIdx, 1);
  else rows.length = 0;
  renderRxDrugs();
}
if (typeof window !== 'undefined') {
  window.addTaperRow = addTaperRow;
  window.clearTaperRow = clearTaperRow;
  window.syncRxDrugDates = syncRxDrugDates;
  window.removeDrug = removeDrug;
}

// ─── SURGERY / PROCEDURE SAVE + REPORT ─────────────────
const PROCEDURE_ADVISED_LOG = [];
function saveProcAdvised() {
  const items = document.querySelectorAll('#rx-proc-advised select');
  items.forEach(sel=>{
    const val = sel.value;
    if(val && !PROCEDURE_ADVISED_LOG.find(p=>p.proc===val&&p.bmhId==='BMSH-000001')) {
      PROCEDURE_ADVISED_LOG.push({proc:val, bmhId:'BMSH-000001', patient:'Test Patient', date:new Date().toLocaleDateString('en-IN'), doctor:document.getElementById('sbnm')?.textContent||'Dr. Varun Baweja'});
    }
  });
}

// ─── REPORTS ─────────────────
function generateDailyReport() {
  const el=document.getElementById('rep-daily-result'); if(!el) return;
  const fromVal = document.getElementById('rep-from')?.value;
  const toVal   = document.getElementById('rep-to')?.value;
  const deptFilter = document.getElementById('rep-dept')?.value || '';
  const today = new Date().toISOString().split('T')[0];
  const rangeFrom = fromVal || today;
  const rangeTo   = toVal   || today;
  const todayLabel = new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

  // Filter patients for the date range (use createdAt date)
  const inRange = p => {
    const d = (p.createdAt||'').split('T')[0] || today;
    return d >= rangeFrom && d <= rangeTo;
  };
  const deptMap = {ophtho:'Ophthalmology',obg:'OBG',psych:'Neuropsychiatry',skin:'Skin'};
  const allPts = PATIENTS.filter(p=>(!deptFilter||p.dept===deptFilter));
  // For date range — use today's queue if no filter set (patients in current session)
  const todayPts = allPts.filter(p=>inRange(p)||true); // show all loaded; filter by date if available
  const dateFilteredPts = (fromVal||toVal) ? allPts.filter(inRange) : allPts;

  // Compute totals from TRANSACTIONS array
  const txInRange = TRANSACTIONS.filter(tx=>{
    const d=(tx.date||'').split('T')[0]||today;
    return d>=rangeFrom&&d<=rangeTo;
  });
  const totalCollection = txInRange.reduce((s,t)=>s+(parseFloat(t.amount)||0),0);
  const pendingPay = PAY_REQUESTS.filter(pr=>!pr.collected).reduce((s,pr)=>s+(parseFloat(pr.amount)||0),0);
  const surgeriesDone = OT_CASES.filter(c=>c.status==='completed'||(c.date>=rangeFrom&&c.date<=rangeTo)).length;

  // Per-dept breakdown
  const depts = [['ophtho','Ophthalmology','👁️'],['obg','OBG','🤰'],['psych','Neuropsychiatry','🧠'],['skin','Skin','💆']];
  const deptRows = depts.map(([key,name,icon])=>{
    const pts = dateFilteredPts.filter(p=>p.dept===key);
    const deptTx = txInRange.filter(t=>t.dept===key);
    const consult = deptTx.filter(t=>!(t.mode==='Insurance')).reduce((s,t)=>s+(parseFloat(t.amount)||0),0);
    const ins = deptTx.filter(t=>t.mode==='Insurance').reduce((s,t)=>s+(parseFloat(t.amount)||0),0);
    const surgs = OT_CASES.filter(c=>(c.date>=rangeFrom&&c.date<=rangeTo)).length;
    return `<tr><td>${icon} ${name}</td><td>${pts.length}</td><td>₹${consult.toLocaleString('en-IN')}</td><td>₹0</td><td>₹${ins.toLocaleString('en-IN')}</td><td style="font-weight:900">₹${(consult+ins).toLocaleString('en-IN')}</td></tr>`;
  }).join('');
  const totalPts = depts.reduce((s,[k])=>s+dateFilteredPts.filter(p=>p.dept===k).length,0);

  const rangeLabel = fromVal||toVal ? `${new Date(rangeFrom).toLocaleDateString('en-IN',{day:'numeric',month:'short'})} – ${new Date(rangeTo).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}` : todayLabel;

  el.innerHTML=`<div class="card">
    <div class="card-hd"><div><div class="card-title">📅 Daily Summary — ${rangeLabel}</div><div class="card-sub">All departments · ${window.CURRENT_USER?.centre==='RPR'?'Ropar':'Chandigarh'} Centre</div></div>
    <button class="btn btn-gold btn-xs" onclick="window.print()">🖨️ Print</button></div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
      ${[
        ['Total OPD Patients', totalPts||dateFilteredPts.length, 'blue'],
        ['Total Collection', '₹'+totalCollection.toLocaleString('en-IN'), 'green'],
        ['Pending Payments', '₹'+pendingPay.toLocaleString('en-IN'), 'red'],
        ['Surgeries Done', surgeriesDone, 'orange']
      ].map(([l,v,c])=>`<div style="background:var(--${c}-lt,var(--g6));border-radius:10px;padding:12px;text-align:center"><div style="font-size:10px;color:var(--g1);font-weight:800;text-transform:uppercase">${l}</div><div style="font-size:22px;font-weight:900;color:var(--${c})">${v}</div></div>`).join('')}
    </div>
    <table><thead><tr><th>Department</th><th>Patients</th><th>Consultations ₹</th><th>Investigations ₹</th><th>Insurance ₹</th><th>Total ₹</th></tr></thead>
    <tbody>${deptRows}</tbody></table>
    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
      ${depts.map(([k,d])=>`<button class="btn btn-outline btn-xs" onclick="showDeptDetail('${d}')">📋 ${d} Detail</button>`).join('')}
    </div>
    <div id="dept-detail-panel" style="margin-top:12px"></div>
  </div>`;
}

function showDeptDetail(dept) {
  const el=document.getElementById('dept-detail-panel'); if(!el) return;
  const deptPts = PATIENTS.filter(p=>{const m={Ophthalmology:'ophtho',OBG:'obg',Neuropsychiatry:'psych',Skin:'skin'}; return p.dept===m[dept];});
  el.innerHTML=`<div style="background:var(--g6);border-radius:var(--r);padding:14px">
    <div style="font-size:13px;font-weight:900;color:var(--bmh-blue);margin-bottom:10px">${dept} — Today's Detail</div>
    <table><thead><tr><th>#</th><th>Patient</th><th>BMSH ID</th><th>Doctor</th><th>Purpose</th><th>Amount ₹</th><th>Status</th></tr></thead>
    <tbody>${deptPts.map((p,i)=>`<tr><td>${i+1}</td><td>${p.name}</td><td style="font-family:var(--mono);font-size:10px">${p.bmhId}</td><td>${p.doctor}</td><td>${p.purpose}</td><td style="font-weight:800">₹800</td><td>${p.seen?'<span class="badge bd-green">Done</span>':'<span class="badge bd-orange">Pending</span>'}</td></tr>`).join('')}</tbody>
    </table></div>`;
}

function searchReportPatients(val) {
  const el=document.getElementById('rep-patient-result'); if(!el) return;
  if(!val||val.length<2){el.innerHTML='';return;}
  const matches=PATIENTS.filter(p=>p.name.toLowerCase().includes(val.toLowerCase())||p.bmhId.includes(val)||(p.mob&&p.mob.includes(val)));
  el.innerHTML=matches.length?`<div class="card">
    <div class="card-hd"><div class="card-title">Results (${matches.length})</div><button class="btn btn-gold btn-xs" onclick="window.print()">🖨️</button></div>
    <table><thead><tr><th>#</th><th>Name</th><th>BMSH ID</th><th>Age/Sex</th><th>Mobile</th><th>Doctor</th><th>Last Visit</th><th>Diagnosis</th></tr></thead>
    <tbody>${matches.map((p,i)=>`<tr onclick="openPatient('${p.bmhId}')"><td>${i+1}</td><td style="font-weight:800">${p.name}</td><td style="font-family:var(--mono);font-size:10px">${p.bmhId}</td><td>${p.age}Y/${p.sex[0]}</td><td>${p.mob||'—'}</td><td>${p.doctor}</td><td>${new Date().toLocaleDateString('en-IN')}</td><td><span class="badge bd-orange">Cataract OS</span></td></tr>`).join('')}
    </tbody></table></div>`:
  `<div style="padding:20px;text-align:center;color:var(--g1)">No patients found for "${val}"</div>`;
}

function generateSurgeryReport() {
  const proc=document.getElementById('rep-surg-name')?.value||'';
  const el=document.getElementById('rep-surgery-result'); if(!el) return;
  // Include both OT cases and PROCEDURE_ADVISED_LOG
  const allAdvised = [...PROCEDURE_ADVISED_LOG, ...OT_CASES.map(c=>({proc:c.procedure,bmhId:c.bmhId,patient:c.patient,date:c.date,doctor:c.surgeon,status:c.status}))];
  const filtered = proc ? allAdvised.filter(a=>a.proc.toLowerCase().includes(proc.toLowerCase())) : allAdvised;
  el.innerHTML=`<div class="card">
    <div class="card-hd"><div><div class="card-title">⚕️ ${proc||'All Procedures'} — ${filtered.length} patients</div></div><button class="btn btn-gold btn-xs" onclick="window.print()">🖨️ Print</button></div>
    ${filtered.length?`<table><thead><tr><th>#</th><th>Patient</th><th>BMSH ID</th><th>Procedure</th><th>Date Advised</th><th>Doctor</th><th>Status</th></tr></thead>
    <tbody>${filtered.map((p,i)=>`<tr><td>${i+1}</td><td style="font-weight:800">${p.patient}</td><td style="font-family:var(--mono);font-size:10px">${p.bmhId}</td><td>${p.proc}</td><td>${p.date||'—'}</td><td>${p.doctor}</td><td><span class="badge ${p.status==='completed'?'bd-green':p.status==='in-progress'?'bd-blue':'bd-orange'}">${p.status||'Advised'}</span></td></tr>`).join('')}
    </tbody></table>`:'<div style="padding:20px;text-align:center;color:var(--g1)">No records found</div>'}
  </div>`;
}

function generateInvestigationReport() {
  const inv=document.getElementById('rep-inv-name')?.value||'';
  const el=document.getElementById('rep-investigation-result'); if(!el) return;
  const sample=[{patient:'Test Patient',bmhId:'BMSH-000001',inv:'OCT Macula OU',date:new Date().toLocaleDateString('en-IN'),doctor:'Dr. Varun Baweja',status:'pending'},{patient:'Test Patient',bmhId:'BMSH-000003',inv:'Fundus Photography',date:new Date().toLocaleDateString('en-IN'),doctor:'Dr. Varun Baweja',status:'pending'}];
  const filtered = inv ? sample.filter(a=>a.inv.toLowerCase().includes(inv.toLowerCase())) : sample;
  el.innerHTML=`<div class="card">
    <div class="card-hd"><div class="card-title">🧪 Investigations — ${filtered.length} records</div><button class="btn btn-gold btn-xs" onclick="window.print()">🖨️</button></div>
    <table><thead><tr><th>#</th><th>Patient</th><th>BMSH ID</th><th>Investigation</th><th>Date</th><th>Doctor</th><th>Status</th></tr></thead>
    <tbody>${filtered.map((p,i)=>`<tr><td>${i+1}</td><td style="font-weight:800">${p.patient}</td><td style="font-family:var(--mono);font-size:10px">${p.bmhId}</td><td>${p.inv}</td><td>${p.date}</td><td>${p.doctor}</td><td><span class="badge ${p.status==='completed'?'bd-green':'bd-orange'}">${p.status}</span></td></tr>`).join('')}
    </tbody></table></div>`;
}

function generateFinancialReport() {
  const el=document.getElementById('rep-financial-result'); if(!el) return;
  const fromVal = document.getElementById('rep-fin-from')?.value || new Date().toISOString().split('T')[0];
  const toVal   = document.getElementById('rep-fin-to')?.value   || new Date().toISOString().split('T')[0];
  const txAll = TRANSACTIONS.filter(t=>{const d=(t.date||'').split('T')[0]; return d>=fromVal&&d<=toVal;});
  const cash  = txAll.filter(t=>t.mode==='Cash').reduce((s,t)=>s+(parseFloat(t.amount)||0),0);
  const upi   = txAll.filter(t=>t.mode==='UPI'||t.mode==='Card').reduce((s,t)=>s+(parseFloat(t.amount)||0),0);
  const ins   = txAll.filter(t=>t.mode==='Insurance').reduce((s,t)=>s+(parseFloat(t.amount)||0),0);
  const total = cash+upi+ins;
  const pending = PAY_REQUESTS.filter(pr=>!pr.collected).reduce((s,pr)=>s+(parseFloat(pr.amount)||0),0);
  el.innerHTML=`<div class="card">
    <div class="card-hd"><div class="card-title">💰 Financial Summary</div><button class="btn btn-gold btn-xs" onclick="window.print()">🖨️</button></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
      ${[
        ['Total Billed','₹'+total.toLocaleString('en-IN'),'green'],
        ['Cash Received','₹'+cash.toLocaleString('en-IN'),'blue'],
        ['UPI/Card','₹'+upi.toLocaleString('en-IN'),'blue'],
        ['Insurance/TPA','₹'+ins.toLocaleString('en-IN'),'orange'],
        ['Pending','₹'+pending.toLocaleString('en-IN'),'red'],
        ['Refunds','₹0','gray']
      ].map(([l,v,c])=>`<div style="background:var(--${c==='gray'?'g6':`${c}-lt`});border-radius:10px;padding:10px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:700;color:var(--g1)">${l}</span><span style="font-size:16px;font-weight:900;color:var(--${c==='gray'?'tx':c})">${v}</span></div>`).join('')}
    </div>
    ${txAll.length?`<table><thead><tr><th>Patient</th><th>Mode</th><th>Amount ₹</th><th>Dept</th><th>Date</th></tr></thead>
    <tbody>${txAll.slice(0,50).map(t=>`<tr><td style="font-weight:700">${t.patient||'—'}</td><td><span class="badge ${t.mode==='Cash'?'bd-blue':t.mode==='Insurance'?'bd-orange':'bd-green'}">${t.mode||'Cash'}</span></td><td style="font-weight:900">₹${parseFloat(t.amount||0).toLocaleString('en-IN')}</td><td>${t.dept||'—'}</td><td>${(t.date||'').split('T')[0]}</td></tr>`).join('')}
    </tbody></table>`:'<div style="padding:20px;text-align:center;color:var(--g1);font-size:12.5px">No transactions recorded for this period.<br><span style="font-size:11px">Payments collected at reception will appear here.</span></div>'}
  </div>`;
}

// ─── REFUND SEARCH ─────────────────
const MOCK_INVOICES = [
  {id:'INV-2025-460847-001',patient:'Test Patient',bmhId:'BMSH-000001',date:'07 Aug 2025',amount:42000,desc:'PMICS + IOL OS + Biometry',status:'paid'},
  {id:'INV-2025-460847-002',patient:'Test Patient',bmhId:'BMSH-000001',date:'22 Mar 2025',amount:1800,desc:'OCT Macula OU',status:'paid'},
  {id:'INV-2025-460848-001',patient:'Test Patient',bmhId:'BMSH-000002',date:'22 Mar 2025',amount:800,desc:'Consultation',status:'paid'},
];

function searchRefundPatient(val) {
  const el=document.getElementById('refund-patient-results'); if(!el) return;
  if(!val||val.length<2){el.innerHTML='';return;}
  const matches=PATIENTS.filter(p=>p.name.toLowerCase().includes(val.toLowerCase())||p.bmhId.includes(val)||(p.mob&&p.mob.includes(val)));
  el.innerHTML=matches.map(p=>`<div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--g6);border-radius:8px;margin-bottom:6px;cursor:pointer" onclick="loadPatientInvoices('${p.bmhId}','${p.name}')">
    <div class="q-av" style="background:${p.color};width:34px;height:34px;font-size:11px">${p.initials}</div>
    <div style="flex:1"><div style="font-size:13px;font-weight:800">${p.name}</div><div style="font-family:var(--mono);font-size:9.5px;color:var(--bmh-teal)">${p.bmhId}</div></div>
    <button class="btn btn-blue btn-xs">View Invoices →</button>
  </div>`).join('') || '<div style="padding:12px;color:var(--g1);font-size:12px">No patients found</div>';
}

function loadPatientInvoices(bmhId, name) {
  document.getElementById('refund-pt-name').textContent = name;
  document.getElementById('refund-invoices-section').style.display='block';
  const invEl = document.getElementById('refund-invoice-list'); if(!invEl) return;
  const invoices = MOCK_INVOICES.filter(i=>i.bmhId===bmhId);
  invEl.innerHTML = invoices.length ? invoices.map(inv=>`<div style="display:flex;align-items:center;gap:10px;padding:10px;background:${inv.status==='paid'?'var(--green-lt)':'var(--orange-lt)'};border-radius:8px;margin-bottom:7px;cursor:pointer;border:1.5px solid ${inv.status==='paid'?'var(--green)':'var(--orange)'}" onclick="selectInvoiceForRefund('${inv.id}','${inv.desc.replace(/'/g,"\\'")}',${inv.amount})">
    <div style="font-family:var(--mono);font-size:10px;font-weight:700;color:var(--bmh-teal);min-width:130px">${inv.id}</div>
    <div style="flex:1"><div style="font-size:12.5px;font-weight:800">${inv.desc}</div><div style="font-size:10.5px;color:var(--g1)">${inv.date}</div></div>
    <div style="font-size:15px;font-weight:900;color:${inv.status==='paid'?'#1a8c3c':'var(--orange)'}">₹${inv.amount.toLocaleString('en-IN')}</div>
    <span class="badge ${inv.status==='paid'?'bd-green':'bd-orange'}">${inv.status}</span>
  </div>`).join('') : '<div style="padding:12px;text-align:center;color:var(--g1);font-size:12px">No invoices found for this patient</div>';
}

function selectInvoiceForRefund(invId, desc, amount) {
  document.getElementById('refund-inv-id').textContent = invId;
  document.getElementById('refund-orig-amount').textContent = '₹'+amount.toLocaleString('en-IN');
  document.getElementById('refund-amount').value = amount;
  document.getElementById('refund-form-section').style.display='block';
}

function processRefundConfirm() {
  const amt=document.getElementById('refund-amount')?.value;
  const reason=document.getElementById('refund-reason')?.value;
  showToast(`↩️ Refund ₹${parseInt(amt).toLocaleString('en-IN')} processed — ${reason} ✓`,'s');
  closeM('m-rec-refund');
}

// v15 nav extension merged into base nav

// ═══════════════════════════════════════
// V18 FUNCTIONS
// ═══════════════════════════════════════

// ─── AUTO-STAMP IOP TIME ─────────────
function autoStampTime(inputId) {
  const el = document.getElementById(inputId);
  if (el && !el.value) {
    el.value = new Date().toTimeString().slice(0,5);
    el.style.background = 'var(--green-lt)';
    el.style.borderColor = 'var(--green)';
  }
}

// ─── FILE UPLOAD FOR BIOMETRY TAB ─────────────
const INVESTIGATION_FILES = [];
const INVESTIGATION_ORDERS = [];
function currentPatientVisitInvestigationBucket() {
  const pt = window.CURRENT_PATIENT || PATIENTS.find(p => p.bmhId === (document.getElementById('ophtho-pt-uid')?.textContent || '').trim());
  if(!pt) return null;
  if(!pt.lastVisit || typeof pt.lastVisit !== 'object') pt.lastVisit = {};
  if(!Array.isArray(pt.lastVisit.investigations)) pt.lastVisit.investigations = [];
  return { pt, list: pt.lastVisit.investigations };
}
function renderCurrentPatientInvestigationUploads(entries) {
  const list = document.getElementById('bio-uploads-list');
  if(!list) return;
  const bucket = currentPatientVisitInvestigationBucket();
  const items = Array.isArray(entries) ? entries : (bucket?.list || []);
  if(!items.length) {
    list.innerHTML = '<div style="padding:12px;border:1px dashed var(--g4);border-radius:10px;color:var(--g1);font-size:11px;background:#fff">No investigation files saved yet for this patient.</div>';
    return;
  }
  list.innerHTML = '';
  items.slice().sort((a,b)=>String(b.date||'').localeCompare(String(a.date||''))).forEach(entry => addBioUploadCard(entry, list));
}

function handleInvestigationUpload(input) {
  const files = Array.from(input.files);
  const bmhId = window.CURRENT_PATIENT?.bmhId || document.getElementById('ophtho-pt-uid')?.textContent || 'unknown';
  const visitBucket = currentPatientVisitInvestigationBucket();
  files.forEach(file => {
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|gif|bmp|webp|tiff?)$/i.test(file.name || '');
    if(isImage) {
      // Compress image to max 800px wide, quality 0.7 before storage
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const MAX = 800;
          const scale = Math.min(1, MAX / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressed = canvas.toDataURL('image/jpeg', 0.72);
          const sizKB = Math.round(compressed.length * 0.75 / 1024);
          const key = 'inv_' + Date.now();
          const entry = { key, name: file.name, type: 'image/jpeg', data: compressed, bmhId, date: new Date().toISOString(), sizKB };
          // Save to Firebase
          // Store compressed data in session for display
          window.INV_UPLOADS = window.INV_UPLOADS || {};
          window.INV_UPLOADS[key] = entry;
          const persist = window.fbSet ? fbSet(`investigations/${bmhId}/${key}`, { key, name: file.name, type: 'image/jpeg', bmhId, date: entry.date, sizKB, data: compressed }) : Promise.resolve();
          persist.then(() => {
            if(visitBucket) {
              visitBucket.list = visitBucket.list || [];
              visitBucket.list.unshift({ key, name: file.name, type: 'image/jpeg', date: entry.date, sizKB, bmhId });
              fbUpdate && fbUpdate('patients/' + visitBucket.pt.bmhId, { lastVisit: visitBucket.pt.lastVisit }).catch(()=>{});
            }
            renderCurrentPatientInvestigationUploads && renderCurrentPatientInvestigationUploads();
            showToast(`📎 ${file.name} compressed to ${sizKB} KB ✓`, 's');
          }).catch(() => {
            delete window.INV_UPLOADS[key];
            showToast(`Could not save ${file.name}`, 'w');
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      // PDF/non-image: store as base64 (no compression)
      const reader = new FileReader();
      reader.onload = e => {
        const key = 'inv_' + Date.now();
        const sizKB = Math.round(file.size / 1024);
        const entry = { key, name: file.name, type: file.type, data: e.target.result, bmhId, date: new Date().toISOString(), sizKB };
        window.INV_UPLOADS = window.INV_UPLOADS || {};
        window.INV_UPLOADS[key] = entry;
        const persist = window.fbSet ? fbSet(`investigations/${bmhId}/${key}`, { key, name: file.name, type: file.type, bmhId, date: entry.date, sizKB, data: e.target.result }) : Promise.resolve();
        persist.then(() => {
          if(visitBucket) {
            visitBucket.list = visitBucket.list || [];
            visitBucket.list.unshift({ key, name: file.name, type: file.type, date: entry.date, sizKB, bmhId });
            fbUpdate && fbUpdate('patients/' + visitBucket.pt.bmhId, { lastVisit: visitBucket.pt.lastVisit }).catch(()=>{});
          }
          renderCurrentPatientInvestigationUploads && renderCurrentPatientInvestigationUploads();
          showToast(`📎 ${file.name} (${sizKB} KB) saved ✓`, 's');
        }).catch(() => {
          delete window.INV_UPLOADS[key];
          showToast(`Could not save ${file.name}`, 'w');
        });
      };
      reader.readAsDataURL(file);
    }
  });
  input.value = '';
}
function addBioUploadCard(entry, list) {
  if(!list) list = document.getElementById('bio-uploads-list');
  if(!list) return;
  const d = document.createElement('div');
  d.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid var(--g4);border-radius:8px;margin-bottom:6px;background:#fff';
  const icon = entry.type?.startsWith('image') ? '🖼️' : '📄';
  d.innerHTML = `<span style="font-size:20px">${icon}</span>
    <div style="flex:1"><div style="font-size:12px;font-weight:700">${entry.name}</div><div style="font-size:10px;color:var(--g1)">${entry.sizKB} KB · ${new Date(entry.date).toLocaleDateString('en-IN')}</div></div>
    <button onclick="viewStoredInvestigation('${entry.bmhId || (window.CURRENT_PATIENT?.bmhId || '')}','${entry.key}')" style="background:var(--blue-lt);color:var(--blue);border:1px solid var(--blue);border-radius:5px;padding:3px 8px;font-size:10px;cursor:pointer">👁 View</button>`;
  list.prepend(d);
}
function viewStoredInvestigation(bmhId, key) {
  const cached = window.INV_UPLOADS?.[key];
  if(cached?.data) {
    window.open(cached.data, '_blank');
    return;
  }
  if(window.fbOnce) {
    fbOnce(`investigations/${bmhId}/${key}`).then(data => {
      if(!data?.data) { showToast('File data not found','w'); return; }
      window.INV_UPLOADS = window.INV_UPLOADS || {};
      window.INV_UPLOADS[key] = data;
      window.open(data.data, '_blank');
    }).catch(() => showToast('Could not open investigation','w'));
  }
}
function handleDropUpload(e) {
  e.preventDefault();
  document.getElementById('bio-drop-zone').style.borderColor='var(--blue)';
  Array.from(e.dataTransfer.files).forEach(f => addInvestigationFile(f));
}
function addInvestigationFile(file) {
  const id = 'f-' + Date.now() + Math.random().toString(36).slice(2,6);
  const isImg = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';
  const icon = isPdf ? '📄' : isImg ? '🖼️' : '📁';
  const url = URL.createObjectURL(file);
  INVESTIGATION_FILES.push({id, name: file.name, url, type: file.type, size: file.size, date: new Date().toLocaleTimeString()});
  const grid = document.getElementById('bio-files-grid'); if(!grid) return;
  const div = document.createElement('div');
  div.id = id;
  div.style.cssText = 'background:var(--g6);border-radius:var(--r);overflow:hidden;box-shadow:var(--sh);cursor:pointer;transition:all .2s;position:relative';
  div.innerHTML = `
    <div style="background:var(--bmh-blue);height:80px;display:flex;align-items:center;justify-content:center;font-size:28px">
      ${isImg ? `<img src="${url}" style="width:100%;height:80px;object-fit:cover">` : `<span>${icon}</span>`}
    </div>
    <div style="padding:7px 8px">
      <div style="font-size:10.5px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${file.name}</div>
      <div style="font-size:9.5px;color:var(--g1);margin-top:2px">${(file.size/1024).toFixed(1)} KB</div>
    </div>
    <button onclick="removeInvestFile('${id}')" style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;width:18px;height:18px;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1">&#x2715;</button>
    <div onclick="viewInvestFile('${url}','${file.name}')" style="position:absolute;inset:0;cursor:pointer"></div>`;
  grid.appendChild(div);
  showToast(`&#128206; ${file.name} uploaded ✓`, 's');
}
function removeInvestFile(id) {
  const idx = INVESTIGATION_FILES.findIndex(f=>f.id===id);
  if(idx>-1) INVESTIGATION_FILES.splice(idx,1);
  const el = document.getElementById(id); if(el) el.remove();
}
function viewInvestFile(url, name) {
  window.open(url, '_blank');
}
function addInvestigationOrder() {
  const pt = window.CURRENT_PATIENT || PATIENTS.find(p => p.bmhId === (document.getElementById('ophtho-pt-uid')?.textContent || '').trim());
  if(!pt) { showToast('Open the patient record first','w'); return; }
  const name = document.getElementById('add-inv-name')?.value?.trim();
  const notes = document.getElementById('add-inv-notes')?.value?.trim();
  if(!name) { showToast('Enter investigation name','w'); return; }
  const orders = getCurrentPatientInvestigationOrders();
  orders.push({id:'INV'+Date.now(), name, notes, date: new Date().toLocaleDateString('en-IN'), done: false, patient: pt.name, bmhId: pt.bmhId, dept: pt.dept || 'ophtho', centre: pt.centre || CURRENT_USER?.centre || 'CHD'});
  syncCurrentPatientInvestigationOrders();
  persistCurrentPatientInvestigationOrders();
  renderInvestigationOrders();
  document.getElementById('add-inv-name').value = '';
  document.getElementById('add-inv-notes').value = '';
  // Also add to PAY_REQUESTS so reception can collect
  const centre = pt.centre || CURRENT_USER?.centre || 'CHD';
  PAY_REQUESTS.push({id:'PR'+Date.now(), patient:pt.name, bmhId:pt.bmhId, for:name, amount:(CENTRE_CHARGES[centre]?.[name]||0), status:'pending', from:document.getElementById('sbnm')?.textContent||'Doctor', dept:pt.dept||'ophtho', centre});
  showToast(`🧪 ${name} ordered ✓`, 's');
  renderOeInvOrderedList && renderOeInvOrderedList();
}
function renderOeInvOrderedList() {
  const el = document.getElementById('oe-inv-ordered-list'); if(!el) return;
  const pending = syncCurrentPatientInvestigationOrders().filter(o=>!o.done);
  if(!pending.length) { el.innerHTML = '<span style="color:var(--g1);font-style:italic">None ordered</span>'; return; }
  el.innerHTML = pending.map((o,i) => `<div style="display:inline-flex;align-items:center;gap:5px;background:var(--orange-lt);color:#8a4200;border:1px solid rgba(212,160,23,.5);border-radius:20px;padding:2px 10px;font-size:11px;font-weight:700;margin:2px 4px 2px 0">
    🧪 ${o.name}${o.notes?' ('+o.notes+')':''}
    <span onclick="(function(){const orders=getCurrentPatientInvestigationOrders();const idx=orders.findIndex(x=>x.id===${JSON.stringify(o.id)});if(idx>-1)orders.splice(idx,1);syncCurrentPatientInvestigationOrders();persistCurrentPatientInvestigationOrders();renderOeInvOrderedList();renderInvestigationOrders();})();" style="cursor:pointer;opacity:.6;font-size:12px">&times;</span>
  </div>`).join('');
}
function renderInvestigationOrders() {
  const el = document.getElementById('inv-order-list'); if(!el) return;
  const orders = syncCurrentPatientInvestigationOrders();
  el.innerHTML = orders.map((o,i) => `<div style="display:flex;align-items:center;gap:7px;padding:6px 8px;background:${o.done?'var(--green-lt)':'var(--orange-lt)'};border-radius:7px;margin-top:5px;font-size:12px">
    <span style="font-size:14px">${o.done?'✅':'🧪'}</span>
    <div style="flex:1"><div style="font-weight:700">${o.name}</div>${o.notes?`<div style="font-size:10.5px;color:var(--g1)">${o.notes}</div>`:''}
    <div style="font-size:9.5px;color:var(--g1)">${o.date}</div></div>
    <button class="btn btn-xs ${o.done?'btn-gray':'btn-green'}" onclick="getCurrentPatientInvestigationOrders()[${i}].done=!getCurrentPatientInvestigationOrders()[${i}].done;syncCurrentPatientInvestigationOrders();persistCurrentPatientInvestigationOrders();renderOeInvOrderedList();renderInvestigationOrders()">${o.done?'Undo':'Done ✓'}</button>
    <button class="btn btn-xs btn-gray" onclick="getCurrentPatientInvestigationOrders().splice(${i},1);syncCurrentPatientInvestigationOrders();persistCurrentPatientInvestigationOrders();renderOeInvOrderedList();renderInvestigationOrders()">&#x2715;</button>
  </div>`).join('');
}

// (Legacy duplicate printUnifiedRx removed — use window.printUnifiedRx below.)

// ─── LAB MODULE V18 ─────────────────
const LAB_ORDERS = [];
let activeLabOrder = null;

function renderLabOrders() {
  const el = document.getElementById('lab-ordered-list'); if(!el) return;
  const pending = LAB_ORDERS.filter(o=>o.status==='pending');
  const done = LAB_ORDERS.filter(o=>o.status==='completed');
  const ct = document.getElementById('lab-pending-ct'); if(ct) ct.textContent = pending.length+' pending';

  el.innerHTML = LAB_ORDERS.map(o => `<div style="padding:10px 12px;background:${o.status==='completed'?'var(--green-lt)':'var(--orange-lt)'};border-radius:var(--rsm);margin-bottom:7px;cursor:pointer;border-left:4px solid ${o.status==='completed'?'var(--green)':'var(--orange)'}" onclick="openLabOrder('${o.id}')">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
      <div style="font-size:13px;font-weight:900">${o.patient}</div>
      <span class="badge ${o.status==='completed'?'bd-green':'bd-orange'}" style="font-size:9.5px">${o.status==='completed'?'✅ Done':'⏳ Pending'}</span>
    </div>
    <div style="font-family:var(--mono);font-size:9.5px;color:var(--bmh-teal);margin-bottom:4px">${o.bmhId} · ${o.age}</div>
    <div style="font-size:11px;color:var(--tx3)">Ref: ${o.dr} · ${o.date}</div>
    <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:6px">
      ${o.tests.map(t=>`<span class="badge ${o.status==='completed'?'bd-green':'bd-orange'}" style="font-size:9.5px">${t}</span>`).join('')}
    </div>
  </div>`).join('');

  // Update lab report header
  const p = PATIENTS.find(pt => LAB_ORDERS[0] && pt.bmhId === LAB_ORDERS[0].bmhId);
  if(p) {
    ['lab-rpt-name','lab-rpt-id','lab-rpt-age','lab-rpt-dr'].forEach((id,i) => {
      const el2 = document.getElementById(id);
      if(el2) el2.textContent = [p.name, p.bmhId, p.age+'Y/'+p.sex[0], p.doctor][i];
    });
  }
  const rptDate = document.getElementById('lab-rpt-date'); if(rptDate) rptDate.textContent = new Date().toLocaleDateString('en-IN');
}

function openLabOrder(id) {
  const order = LAB_ORDERS.find(o=>o.id===id); if(!order) return;
  activeLabOrder = order;
  const panel = document.getElementById('lab-entry-panel'); if(!panel) return;
  panel.style.display = 'block';
  document.getElementById('lab-entry-pt-name').textContent = order.patient + ' · ' + order.bmhId;
  document.getElementById('lab-entry-inv-name').textContent = order.tests.join(' · ');

  // Build result entry fields for each test
  const fieldsEl = document.getElementById('lab-entry-fields'); if(!fieldsEl) return;
  fieldsEl.innerHTML = order.tests.map(t => {
    const saved = order.results[t] || {};
    return `<div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 60px;gap:5px;align-items:center;padding:6px 8px;background:var(--g6);border-radius:7px;margin-bottom:5px">
      <span style="font-size:12px;font-weight:800">${t}</span>
      <input type="text" placeholder="Value" value="${saved.val||''}" id="lr-val-${t.replace(/\s+/g,'_')}" style="font-size:12px;font-weight:800;text-align:center" onchange="flagLabVal(this,'${t}')">
      <input type="text" placeholder="Unit" value="${saved.unit||''}" id="lr-unit-${t.replace(/\s+/g,'_')}" style="font-size:11px;text-align:center">
      <input type="text" placeholder="Range" value="${saved.range||''}" id="lr-range-${t.replace(/\s+/g,'_')}" style="font-size:11px;text-align:center">
      <span id="lr-flag-${t.replace(/\s+/g,'_')}" style="font-size:10px;font-weight:800;text-align:center;color:${saved.flag==='HIGH'?'var(--red)':saved.flag==='LOW'?'var(--orange)':'#1a8c3c'}">${saved.flag||'—'}</span>
    </div>`;
  }).join('');
}

function flagLabVal(inp, testName) {
  const key = testName.replace(/\s+/g,'_');
  const rangeEl = document.getElementById('lr-range-'+key);
  const flagEl = document.getElementById('lr-flag-'+key);
  if(!rangeEl || !flagEl) return;
  const range = rangeEl.value;
  const val = parseFloat(inp.value);
  if(range && !isNaN(val)) {
    const parts = range.split(/[-–]/);
    if(parts.length===2) {
      const lo = parseFloat(parts[0]), hi = parseFloat(parts[1]);
      const flag = val < lo ? 'LOW' : val > hi ? 'HIGH' : 'Normal';
      flagEl.textContent = flag;
      flagEl.style.color = flag==='HIGH'?'var(--red)':flag==='LOW'?'var(--orange)':'#1a8c3c';
      inp.style.background = flag==='HIGH'?'var(--red-lt)':flag==='LOW'?'var(--orange-lt)':'var(--green-lt)';
    }
  }
}

function saveLabResults() {
  if(!activeLabOrder) return;
  const tech = document.getElementById('lab-incharge')?.value || 'Lab Technician';
  activeLabOrder.tests.forEach(t => {
    const key = t.replace(/\s+/g,'_');
    activeLabOrder.results[t] = {
      val: document.getElementById('lr-val-'+key)?.value || '',
      unit: document.getElementById('lr-unit-'+key)?.value || '',
      range: document.getElementById('lr-range-'+key)?.value || '',
      flag: document.getElementById('lr-flag-'+key)?.textContent || '—',
    };
  });
  activeLabOrder.status = 'completed';
  activeLabOrder.tech = tech;
  document.getElementById('lab-rpt-tech').textContent = tech;

  // Notify doctor — add a notification badge to doctor queue
  const nb = document.getElementById('nb-dq');
  if(nb) { nb.textContent = parseInt(nb.textContent||0)+1; nb.style.background='var(--green)'; }
  showToast(`✅ Lab results saved for ${activeLabOrder.patient} — Doctor notified ✓`, 's');

  // Flash notification in doctor queue
  setTimeout(() => {
    const notifArea = document.getElementById('dq-active-list');
    if(notifArea) {
      const notif = document.createElement('div');
      notif.style.cssText='background:var(--green-lt);border:2px solid var(--green);border-radius:var(--rsm);padding:10px 12px;margin-bottom:8px;animation:fadeUp .3s ease';
      notif.innerHTML = `<div style="font-size:12px;font-weight:900;color:#1a8c3c">✅ Lab Results Ready</div>
        <div style="font-size:11.5px;color:var(--tx3);margin-top:3px">${activeLabOrder.patient} — ${activeLabOrder.tests.join(', ')}</div>
        <div style="font-size:10.5px;color:#1a8c3c;margin-top:4px">Results entered by ${tech}</div>`;
      notifArea.insertBefore(notif, notifArea.firstChild);
    }
  }, 200);

  renderLabOrders();
  document.getElementById('lab-entry-panel').style.display = 'none';
  initLab();
}

function addCustomLabTest() {
  const name = document.getElementById('custom-test-name')?.value;
  const val = document.getElementById('custom-test-val')?.value;
  const unit = document.getElementById('custom-test-unit')?.value;
  const range = document.getElementById('custom-test-range')?.value;
  if(!name) { showToast('Enter test name','w'); return; }
  const el = document.getElementById('custom-tests-list'); if(!el) return;
  const d = document.createElement('div');
  d.style.cssText='display:grid;grid-template-columns:2fr 1fr 1fr 1fr 60px;gap:5px;align-items:center;padding:7px 8px;background:var(--g6);border-radius:7px;margin-bottom:5px;font-size:12px';
  const hi = parseFloat(range?.split(/[-–]/)[1])||Infinity;
  const lo = parseFloat(range?.split(/[-–]/)[0])||0;
  const v = parseFloat(val);
  const flag = isNaN(v)?'—':v>hi?'HIGH':v<lo?'LOW':'Normal';
  d.innerHTML = `<span style="font-weight:800">${name}</span><span style="font-weight:800;color:${flag==='HIGH'?'var(--red)':flag==='LOW'?'var(--orange)':'#1a8c3c'}">${val}</span><span style="color:var(--g1)">${unit}</span><span style="color:var(--g1)">${range}</span><span class="badge ${flag==='HIGH'||flag==='LOW'?'bd-red':'bd-green'}" style="font-size:9px">${flag}</span>`;
  el.appendChild(d);
  ['custom-test-name','custom-test-val','custom-test-unit','custom-test-range'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  showToast(`Custom test "${name}" added ✓`,'s');
}

// ─── APPOINTMENTS FIX ─────────────────
function renderAptDay() {
  const date = document.getElementById('apt-date-inp')?.value || new Date().toISOString().split('T')[0];
  const drFilter = document.getElementById('apt-dr-filter')?.value || '';
  const timeSortVal = (slot) => {
    const s = normalizeAptTimeLabel(slot);
    const m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if(!m) return 0;
    let h = Number(m[1]) % 12;
    if(String(m[3]).toUpperCase() === 'PM') h += 12;
    return h * 60 + Number(m[2]);
  };
  const dayApts = APPOINTMENTS.filter(a => a.date === date && (!drFilter || a.doctor === drFilter))
    .slice()
    .sort((a,b) => timeSortVal(a.time || a.scheduledTime) - timeSortVal(b.time || b.scheduledTime));
  const slotsEl = document.getElementById('apt-day-slots');
  if(!slotsEl) return;

  const TIMES = ['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
  slotsEl.innerHTML = TIMES.map(t => {
    const booked = dayApts.find(a => normalizeAptTimeLabel(a.time || a.scheduledTime) === normalizeAptTimeLabel(t));
    if(booked) return `<div class="apt-slot booked" onclick="showToast('${booked.patient} — ${booked.purpose}','i')">
      <div style="font-size:11.5px;font-weight:900;color:var(--bmh-blue);min-width:48px">${t}</div>
      <div style="flex:1"><div style="font-size:13px;font-weight:800">${booked.patient}</div>
      <div style="font-size:10.5px;color:var(--tx3)">${booked.doctor} · ${booked.purpose||booked.type||''}</div></div>
      <span class="badge bd-blue" style="font-size:9.5px">${booked.centre||'CHD'}</span>
      <button class="btn btn-xs btn-gray" onclick="event.stopPropagation();showToast('Appointment cancelled ✓','i')">Cancel</button>
    </div>`;
    return `<div class="apt-slot free" onclick="openBookApt('${t}')">
      <div style="font-size:11.5px;font-weight:700;color:var(--g1);min-width:48px">${t}</div>
      <div style="font-size:12px;color:var(--g1)">— Available —</div>
      <button class="btn btn-xs btn-outline" onclick="openBookApt('${t}')">+ Book</button>
    </div>`;
  }).join('');

  // Update today and upcoming lists
  const todayEl = document.getElementById('apt-today-list');
  if(todayEl) todayEl.innerHTML = dayApts.length ? dayApts.map(a=>`<div class="apt-slot booked" style="font-size:12px">
    <div style="font-size:16px">${a.type==='surgery'?'⚕️':a.type==='post-op'?'👁️':a.type==='anc'?'🤰':'🩺'}</div>
    <div style="flex:1"><div style="font-weight:800">${a.patient}</div><div style="font-size:10.5px;color:var(--g1)">${a.doctor} · ${a.purpose||a.type}</div></div>
      <div style="font-size:12px;font-weight:900;color:var(--bmh-blue)">${normalizeAptTimeLabel(a.time)}</div>
  </div>`).join('') : '<div style="padding:14px;text-align:center;color:var(--g1);font-size:12px">No appointments on this date</div>';

  const upcomingEl = document.getElementById('apt-upcoming-list');
  if(upcomingEl) upcomingEl.innerHTML = APPOINTMENTS.slice().sort((a,b)=>{
    const ad = new Date(`${a.date || '1970-01-01'}T00:00:00`).getTime() + (timeSortVal(a.time || a.scheduledTime) * 60000);
    const bd = new Date(`${b.date || '1970-01-01'}T00:00:00`).getTime() + (timeSortVal(b.time || b.scheduledTime) * 60000);
    return ad - bd;
  }).slice(0,5).map(a=>`<div style="display:flex;align-items:center;gap:9px;padding:8px;border-bottom:1px solid var(--g5);font-size:12px;cursor:pointer">
    <div style="font-size:16px">${a.type==='surgery'?'⚕️':a.type==='anc'?'🤰':'🩺'}</div>
    <div style="flex:1"><div style="font-weight:800">${a.patient}</div><div style="font-size:10.5px;color:var(--g1)">${a.purpose||a.type} · ${a.date}</div></div>
    <span class="badge bd-blue">${normalizeAptTimeLabel(a.time)}</span>
  </div>`).join('');
  const ct = document.getElementById('apt-upcoming-ct'); if(ct) ct.textContent = APPOINTMENTS.length;
}

function saveProcTyped(val) {
  if(val && !PROCEDURE_ADVISED_LOG.find(p=>p.proc===val)) {
    PROCEDURE_ADVISED_LOG.push({proc:val, bmhId:'BMSH-000001', patient:'Test Patient', date:new Date().toLocaleDateString('en-IN'), doctor:document.getElementById('sbnm')?.textContent||'Dr. Varun Baweja'});
  }
}

// ─── NAV INIT EXTENSION ─────────────────


// Patch INIT to also call renderLabOrders and renderAptDay
setTimeout(() => {
  renderRxDrugs();
  renderLabOrders();
  populateReceptionSurgeryPackSelect();
  refreshOTNotesTemplateSelect();
  if(document.getElementById('apt-date-inp')) {
    document.getElementById('apt-date-inp').value = new Date().toISOString().split('T')[0];
    renderAptDay();
  }
  ['oe','obg','psych','skin'].forEach(d => {
    const el2 = document.getElementById(d+'-rx-date');
    if(el2) el2.textContent = new Date().toLocaleDateString('en-IN');
  });
}, 100);

// ═══════════════════════════════════════
// V19 FUNCTIONS
// ═══════════════════════════════════════

// ─── SAFE PRINT ─────────────
function safePrint(html) {
  // Show inline full-screen print preview (works in all sandboxed environments)
  // Remove any existing preview
  const existing = document.getElementById('bmh-print-preview');
  if(existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'bmh-print-preview';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#f0f0f0;overflow:auto;display:flex;flex-direction:column';

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.style.cssText = 'background:#1A3C6E;color:#fff;padding:10px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;flex-wrap:wrap';
  toolbar.innerHTML = '<span style="font-weight:900;font-size:14px;flex:1">🖨️ BMH Print Preview</span>'
    + '<button onclick="document.getElementById(\'bmh-print-preview\').querySelector(\'iframe\').contentWindow.print()" style="background:#D4A017;color:#1a1a1a;border:none;border-radius:7px;padding:7px 18px;font-size:13px;font-weight:900;cursor:pointer">🖨️ Print</button>'
    + '<button onclick="document.getElementById(\'bmh-print-preview\').remove()" style="background:rgba(255,255,255,.2);color:#fff;border:none;border-radius:7px;padding:7px 14px;font-size:13px;font-weight:700;cursor:pointer">✕ Close</button>';
  overlay.appendChild(toolbar);

  // A4 preview container
  const preview = document.createElement('div');
  preview.style.cssText = 'flex:1;display:flex;justify-content:center;padding:20px;overflow:auto';

  const iframe = document.createElement('iframe');
  iframe.name = 'bmh-pf';
  iframe.style.cssText = 'width:794px;min-height:1123px;background:#fff;border:none;box-shadow:0 4px 24px rgba(0,0,0,.18);border-radius:4px';
  preview.appendChild(iframe);
  overlay.appendChild(preview);
  document.body.appendChild(overlay);

  // Write content
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open(); doc.write(html); doc.close();
}

// ─── RX QUICK SEARCH ─────────────
let rxQuickSelectedDrug = null;
const RX_COMMON_EXTRA = [
  {type:'Eye Drop',trade:'Vigamox',generic:'Moxifloxacin 0.5%',freq:'Four times (QID)',dur:'1 Week'},
  {type:'Eye Drop',trade:'Pred Forte',generic:'Prednisolone Acetate 1%',freq:'Four times (QID)',dur:'4 Weeks'},
  {type:'Eye Drop',trade:'Refresh Tears',generic:'Carboxymethylcellulose 0.5%',freq:'As needed (PRN)',dur:'1 Month'},
  {type:'Eye Drop',trade:'Timoptol',generic:'Timolol Maleate 0.5%',freq:'Twice daily (BD)',dur:'Ongoing'},
  {type:'Eye Drop',trade:'Cosopt',generic:'Dorzolamide + Timolol',freq:'Twice daily (BD)',dur:'Ongoing'},
  {type:'Eye Drop',trade:'Alphagan',generic:'Brimonidine 0.15%',freq:'Three times (TDS)',dur:'Ongoing'},
  {type:'Eye Drop',trade:'Xalatan',generic:'Latanoprost 0.005%',freq:'At bedtime (HS)',dur:'Ongoing'},
  {type:'Eye Drop',trade:'Cyclopentolate 1%',generic:'Cyclopentolate Hydrochloride 1%',freq:'Twice (for cycloplegia)',dur:'1 Day'},
  {type:'Eye Drop',trade:'Atropine 1%',generic:'Atropine Sulphate 1%',freq:'Twice daily (BD)',dur:'3 Weeks'},
  {type:'Tablet',trade:'Diamox',generic:'Acetazolamide 250mg',freq:'Four times (QID)',dur:'5 Days'},
  {type:'Tablet',trade:'Metformin',generic:'Metformin Hydrochloride 500mg',freq:'Twice daily (BD)',dur:'Ongoing'},
  {type:'Tablet',trade:'Folic Acid',generic:'Folic Acid 5mg',freq:'Once daily (OD)',dur:'Ongoing'},
  {type:'Tablet',trade:'Clonazepam 0.25mg',generic:'Clonazepam 0.25mg',freq:'At bedtime (HS)',dur:'1 Month'},
  {type:'Cream',trade:'Retino-A',generic:'Tretinoin 0.025%',freq:'At bedtime (HS)',dur:'3 Months'},
  {type:'Cream',trade:'Hydroquinone 2%',generic:'Hydroquinone 2% Cream',freq:'Twice daily (BD)',dur:'3 Months'},
];



function addRxFromQuick() {
  let drug = rxQuickSelectedDrug;
  if (!drug) {
    const inp = document.getElementById('rx-quick-search');
    const val = inp?.value?.trim();
    if (!val) { showToast('Type a drug name first', 'w'); return; }
    const v = val.toLowerCase();
    const fromSettings = (typeof DRUG_LIBRARY !== 'undefined' ? DRUG_LIBRARY : []).find(d =>
      String(d.trade).toLowerCase().includes(v) || String(d.generic).toLowerCase().includes(v));
    if (fromSettings) {
      drug = { _from: 'settings', trade: fromSettings.trade, generic: fromSettings.generic, type: fromSettings.type, freq: fromSettings.freq, dur: fromSettings.dur, dept: fromSettings.dept };
    } else {
      const fromFull = (typeof DRUG_LIBRARY_FULL !== 'undefined' ? DRUG_LIBRARY_FULL : []).find(d =>
        d.name.toLowerCase().includes(v) || d.brand.toLowerCase().includes(v));
      if (fromFull) drug = Object.assign({ _from: 'full' }, fromFull);
      else drug = { _from: 'free', name: val, brand: val, type: 'Tablet', freq: 'Twice daily (BD)', dur: '1 Week', eye: 'Oral' };
    }
  }

  const isSettings = drug._from === 'settings';
  let trade, generic, drugType, eyeVal, freq, dur;
  if (isSettings) {
    trade = drug.trade || '';
    generic = drug.generic || '';
    drugType = drug.type || 'Tablet';
    freq = normalizeRxFreqLabel(drug.freq || 'Twice daily (BD)');
    dur = normalizeRxDurationLabel(drug.dur || '1 week');
    eyeVal = drugType === 'Eye Drop' ? 'Both Eyes (OU)' : 'Oral';
  } else if (drug._from === 'full') {
    trade = drug.brand || drug.trade || drug.name || '';
    generic = drug.name || drug.generic || trade;
    drugType = drug.type || 'Drug';
    let ev = drug.eye || 'Oral';
    eyeVal = typeof ev === 'string' ? ev : (Array.isArray(ev) ? ev[0] : 'Oral');
    if (/Eye|OU|OD|OS/i.test(eyeVal) && !eyeVal.includes('(')) {
      if (/both|OU/i.test(eyeVal)) eyeVal = 'Both Eyes (OU)';
      else if (/OS|left/i.test(eyeVal)) eyeVal = 'Left Eye (OS)';
      else if (/OD|right/i.test(eyeVal)) eyeVal = 'Right Eye (OD)';
    }
    freq = normalizeRxFreqLabel(drug.freq || 'Twice daily (BD)');
    dur = normalizeRxDurationLabel(drug.dur || '1 week');
  } else if (drug._from === 'free') {
    trade = drug.brand || '';
    generic = drug.name || trade;
    drugType = drug.type || 'Tablet';
    eyeVal = drugType === 'Eye Drop' ? 'Both Eyes (OU)' : 'Oral';
    freq = normalizeRxFreqLabel(drug.freq || 'Twice daily (BD)');
    dur = normalizeRxDurationLabel(drug.dur || '1 week');
  } else {
    trade = drug.brand || drug.trade || '';
    generic = drug.name || drug.generic || trade;
    drugType = drug.type || 'Tablet';
    let ev = drug.eye || (drugType === 'Eye Drop' ? 'Both Eyes (OU)' : 'Oral');
    eyeVal = typeof ev === 'string' ? ev : (Array.isArray(ev) ? ev[0] : 'Oral');
    freq = normalizeRxFreqLabel(drug.freq || 'Twice daily (BD)');
    dur = normalizeRxDurationLabel(drug.dur || '1 week');
  }

  const today = new Date().toISOString().split('T')[0];
  RX_DRUGS.push({
    trade, brand: trade, generic, name: generic,
    drugType: drugType || 'Tablet',
    eye: [eyeVal],
    freq, dur,
    dateFrom: today,
    dateTo: '',
    taperRows: [],
    lang: { en: '', hi: '', pa: '' }
  });
  computeRxEndAndTaperDates(RX_DRUGS[RX_DRUGS.length - 1]);

  renderRxDrugs();
  const inp2 = document.getElementById('rx-quick-search');
  if (inp2) inp2.value = '';
  rxQuickSelectedDrug = null;
  const dd = document.getElementById('rx-quick-dropdown'); if (dd) dd.style.display = 'none';
  showToast('💊 ' + (trade || generic) + ' added ✓', 's');
}
document.addEventListener('click',e=>{if(!e.target.closest('#rx-quick-search')&&!e.target.closest('#rx-quick-dropdown')){document.querySelectorAll('#rx-quick-dropdown').forEach(dd=>{dd.style.display='none';});}});

// ─── RENDER RX DRUGS (Trade — Generic — route — dates — taper) ─────────────
function renderRxDrugs() {
  const activePage = document.querySelector('.page.active') || document.querySelector('.page');
  const el = activePage ? activePage.querySelector('#rx-drugs') : document.getElementById('rx-drugs');
  if(!el) return;
  if(!RX_DRUGS||!RX_DRUGS.length){
    el.innerHTML='<div style="padding:14px;text-align:center;color:var(--g1);font-size:12px">No drugs added — type above to search (Settings library + built-in list)</div>';
    return;
  }
  const activePageId = activePage?.id || '';
  const isOphtho = activePageId === 'pg-ophtho' || activePageId.includes('ophtho');
  const freqOpts=RX_FREQ_OPTIONS;
  const durOpts=RX_DURATION_OPTIONS;
  const typeOpts=RX_TYPE_OPTIONS;
  const eyeOpts=RX_SITE_OPTIONS;
  const lang = typeof rxLang!=='undefined'?rxLang:'en';

  RX_DRUGS.forEach((d,i)=>{
    if (!d.dateFrom) d.dateFrom = new Date().toISOString().split('T')[0];
    if (!d.drugType && d.type) d.drugType = d.type;
    if (!d.trade && d.brand) d.trade = d.brand;
    if (!d.brand && d.trade) d.brand = d.trade;
    if (!d.generic && d.name) d.generic = d.name;
    if (!d.name && d.generic) d.name = d.generic;
    const tn = String(d.trade || d.brand || '').trim();
    const gn = String(d.generic || d.name || '').trim();
    if (!tn && gn) { d.trade = gn; d.brand = gn; }
    ensureRxTaperRows(d);
    d.freq = normalizeRxFreqLabel(d.freq);
    d.dur = normalizeRxDurationLabel(d.dur);
    d.taperRows.forEach(tr => {
      tr.freq = normalizeRxFreqLabel(tr.freq);
      tr.dur = normalizeRxDurationLabel(tr.dur || d.dur);
    });
  });

  const esc = (s) => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  const inputBase = 'width:100%;box-sizing:border-box;min-height:34px;font-size:12px;padding:6px 8px;border:1.5px solid #c7c7cc;border-radius:8px;background:#fff;color:#111';
  const nameInput = 'width:100%;box-sizing:border-box;min-height:34px;font-size:12.5px;padding:6px 8px;border:1.5px solid #1A3C6E;border-radius:8px;background:#fff;color:#1A3C6E;font-weight:800';
  const subInput = 'width:100%;box-sizing:border-box;min-height:28px;font-size:10.5px;padding:4px 8px;border:1.5px solid #d1d1d6;border-radius:8px;background:#fff;color:#6a6a6a;font-style:italic;margin-top:4px';
  const header = `<div style="display:grid;grid-template-columns:minmax(180px,2.4fr) minmax(100px,1.05fr) minmax(120px,1.15fr) minmax(150px,1.35fr) minmax(110px,1.05fr) minmax(126px,1fr) minmax(126px,1fr) 92px;gap:8px;align-items:end;padding:8px 10px;background:#f2f5fb;border:1px solid #d6dce8;border-radius:10px 10px 0 0;font-size:9.5px;font-weight:900;color:#465066;text-transform:uppercase;letter-spacing:.45px">
    <div>Name</div><div>Type</div><div>${isOphtho ? 'Eye' : 'Route / Site'}</div><div>Frequency</div><div>Duration</div><div>From</div><div>To</div><div>Actions</div>
  </div>`;
  const renderRow = (baseDrug, row, i, prefix, opts = {}) => {
    const isTaper = !!opts.isTaper;
    const rowFreq = row.freq || '';
    const rowDur = row.dur || baseDrug.dur || '';
    const line = buildRxPlainInstructionLine({
      ...baseDrug,
      ...(isTaper ? { trade:'', brand:'', generic:'', name:'' } : {}),
      drugType: row.drugType || row.type || baseDrug.drugType || baseDrug.type || 'Tablet',
      eye: row.eye || baseDrug.eye || ['Oral'],
      freq: rowFreq,
      dur: rowDur,
      dateFrom: row.dateFrom || '',
      dateTo: row.dateTo || ''
    }, lang, (iso)=> {
      if (!iso) return '—';
      const t = Date.parse(iso);
      return Number.isNaN(t) ? String(iso) : new Date(t).toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});
    });
    const tradeName = rxDrugTradeName(baseDrug) || '';
    const genericName = rxDrugGenericName(baseDrug) || '';
    const combinedName = genericName && genericName.toLowerCase() !== tradeName.toLowerCase()
      ? `${tradeName} (${genericName})`
      : tradeName;
    const taperBtn = `<button type="button" class="btn btn-xs" onclick="${opts.taperOnclick}" style="background:#fff7e8;color:#8a4200;border:1px solid rgba(212,160,23,.55);padding:5px 8px;font-size:10px;font-weight:800;width:100%">Taper</button>`;
    const removeBtn = `<button type="button" class="btn btn-xs btn-gray" onclick="${opts.removeOnclick}" style="padding:5px 8px;font-size:10px;font-weight:800;width:100%">✕</button>`;
    return `<div style="border-left:${isTaper ? '3px solid #ff9500' : '3px solid #1A3C6E'};border-right:1px solid #d6dce8;border-bottom:1px solid #d6dce8;border-left-width:${isTaper ? '3px' : '3px'};background:${isTaper ? '#fffaf2' : '#fff'}">
      <div style="display:grid;grid-template-columns:minmax(180px,2.4fr) minmax(100px,1.05fr) minmax(120px,1.15fr) minmax(150px,1.35fr) minmax(110px,1.05fr) minmax(126px,1fr) minmax(126px,1fr) 92px;gap:8px;align-items:start;padding:8px 10px">
        <div>
          ${isTaper
            ? `<div style="min-height:34px;display:flex;align-items:center;padding:6px 8px;background:#fff;border:1.5px solid #1A3C6E;border-radius:8px;font-size:12px;font-weight:800;color:#1A3C6E">${esc(combinedName || 'Medicine')}</div><div style="min-height:28px;display:flex;align-items:center;padding:4px 8px;background:#fff4df;border:1px dashed rgba(212,160,23,.6);border-radius:8px;font-size:10.5px;font-weight:800;color:#8a4200;margin-top:4px">Taper step</div>`
            : `<input value="${esc(combinedName || '')}" onchange="const m=(this.value||'').match(/^(.*?)(?:\\s*\\((.*)\\))?\\s*$/);${prefix}.trade=(m&&m[1]?m[1].trim():this.value.trim());${prefix}.brand=${prefix}.trade;${prefix}.generic=(m&&m[2]?m[2].trim():'');${prefix}.name=${prefix}.generic;renderRxDrugs()" placeholder="Trade name (Generic)" style="${nameInput}"><div style="padding:4px 8px;font-size:10.5px;color:#6a6a6a;line-height:1.25">${genericName ? 'Edit as Trade name (Generic)' : 'Use brackets for generic if needed'}</div>`}
        </div>
        <div><select onchange="${prefix}.drugType=this.value;${prefix}.type=this.value;renderRxDrugs()" style="${inputBase}">${typeOpts.map(t=>`<option${(row.drugType || row.type || baseDrug.drugType || baseDrug.type || 'Tablet')===t?' selected':''}>${t}</option>`).join('')}</select></div>
        <div><select onchange="${prefix}.eye=[this.value];renderRxDrugs()" style="${inputBase}">${eyeOpts.map(e=>`<option${(((row.eye && row.eye[0]) || (baseDrug.eye && baseDrug.eye[0]) || 'Oral')===e)?' selected':''}>${e}</option>`).join('')}</select></div>
        <div><select onchange="${prefix}.freq=this.value;window.syncRxDrugDates(${i})" style="${inputBase}">${freqOpts.map(f=>`<option${rowFreq===f?' selected':''}>${f}</option>`).join('')}</select></div>
        <div><select onchange="${prefix}.dur=this.value;window.syncRxDrugDates(${i})" style="${inputBase}">${durOpts.map(v=>`<option${rowDur===v?' selected':''}>${v}</option>`).join('')}</select></div>
        <div><input type="date" value="${esc(row.dateFrom || '')}" onchange="${prefix}.dateFrom=this.value;window.syncRxDrugDates(${i})" style="${inputBase}"></div>
        <div><input type="date" value="${esc(row.dateTo || '')}" onchange="${prefix}.dateTo=this.value;renderRxDrugs()" style="${inputBase}"></div>
        <div style="display:flex;flex-direction:column;gap:6px">${taperBtn}${removeBtn}</div>
      </div>
    </div>`;
  };
  el.innerHTML = `<div class="rx-drugs-root" style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:100%;min-width:0;box-sizing:border-box">
    ${RX_DRUGS.map((d,i)=>{
      const taperRows = ensureRxTaperRows(d);
      const mainPrefix = `RX_DRUGS[${i}]`;
      return `<div style="border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.05)">
        ${header}
        ${renderRow(d, d, i, mainPrefix, {
          taperOnclick:`window.addTaperRow(${i})`,
          removeOnclick:`window.removeDrug(${i})`
        })}
        ${taperRows.map((tap, tapIdx) => renderRow(d, tap, i, `RX_DRUGS[${i}].taperRows[${tapIdx}]`, {
          isTaper:true,
          taperOnclick:`window.addTaperRow(${i},null,${tapIdx})`,
          removeOnclick:`window.clearTaperRow(${i},${tapIdx})`
        })).join('')}
      </div>`;
    }).join('')}
  </div>`;
}

// ─── TEMPLATE SAVE ─────────────
function openSaveRxTemplate() {
  const preview = document.getElementById('tpl-preview-drugs');
  if(preview) preview.innerHTML = RX_DRUGS.length
    ? RX_DRUGS.map((d,i)=>{
      const taperRows = ensureRxTaperRows(d);
      return `<div style="padding:5px 0;border-bottom:1px solid var(--g5);font-size:11.5px"><strong>${i+1}. ${rxDrugTradeName(d)||d.name}</strong> <em style="color:var(--g1);font-size:10px">${rxDrugGenericName(d)&&rxDrugGenericName(d)!==rxDrugTradeName(d)?'('+rxDrugGenericName(d)+')':''}</em> — ${d.freq} — ${d.dur}${taperRows.length?taperRows.map((tr,idx)=>`<div style="font-size:10px;color:var(--orange);margin-top:3px">Taper ${idx+1}: ${tr.freq} · ${tr.dur}</div>`).join(''):''}</div>`;
    }).join('')
    : '<span style="color:var(--g1)">No drugs in prescription</span>';
  openM('m-save-rx-tpl');
}
function saveRxAsTemplate() {
  const name = document.getElementById('tpl-name-inp')?.value?.trim(); if(!name){showToast('Enter template name','w');return;}
  if(!RX_DRUGS.length){showToast('No drugs to save','w');return;}
  const dept = document.getElementById('tpl-dept-inp')?.value || 'all';
  const notes = document.getElementById('tpl-notes-inp')?.value?.trim() || '';
  const key = name.toLowerCase().replace(/\s+/g,'-');
  if(typeof RX_TEMPLATES_DATA!=='undefined') RX_TEMPLATES_DATA[key] = RX_DRUGS.map(d=>{
    const eyeVal = Array.isArray(d.eye) ? d.eye[0] : d.eye;
    const taperRows = ensureRxTaperRows(d);
    return {
      trade:d.trade||d.brand||d.name,
      generic:d.generic||d.name||'',
      type:d.drugType||d.type||'Tablet',
      eye:eyeVal,
      freq:d.freq,
      dur:d.dur,
      taperRows:taperRows.length ? taperRows.map(tr => ({...tr})) : []
    };
  });
  if (typeof RX_TEMPLATES_META !== 'undefined') RX_TEMPLATES_META[key] = { dept, name, notes };
  saveRxTemplatesToStorage();
  refreshRxTemplateSelects();
  if (typeof renderSetRxTplList === 'function') renderSetRxTplList();
  document.querySelectorAll('[onchange*="applyRxTemplate"],#rx-tpl-sel').forEach(sel=>{
    if(![...sel.options].find(o=>o.value===key)){
      const opt=document.createElement('option'); opt.value=key; opt.textContent=name; sel.appendChild(opt);
    }
  });
  showToast('📋 Template "'+name+'" saved ✓','s');
  closeM('m-save-rx-tpl');
  const ni=document.getElementById('tpl-name-inp'); if(ni)ni.value='';
  const nn=document.getElementById('tpl-notes-inp'); if(nn)nn.value='';
}

// ─── PROFESSIONAL LAB REPORT PRINT ─────────────
function printLabReport() {
  const today = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  const g = id => document.getElementById(id)?.textContent||'—';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box;print-color-adjust:exact}body{font-family:Arial,sans-serif;font-size:11px;padding:12mm}@page{size:A4 portrait;margin:8mm}.hdr{display:flex;justify-content:space-between;padding-bottom:10px;border-bottom:2.5px solid #1A3C6E;margin-bottom:12px}.baweja{font-size:18px;font-weight:900;color:#1A3C6E;letter-spacing:2px;border-bottom:2px solid #CC0000;display:block;margin-bottom:2px}table{width:100%;border-collapse:collapse;margin-top:8px}thead th{background:#1A3C6E;color:#fff;padding:5px 8px;text-align:left;font-size:9.5px;font-weight:800;text-transform:uppercase}td{padding:5px 8px;border-bottom:1px solid #eee}tr:nth-child(even){background:#f9f9f9}.flag-h{color:#CC0000;font-weight:900}.flag-l{color:#FF9500;font-weight:900}.section-hd{font-size:11px;font-weight:900;color:#1A3C6E;text-transform:uppercase;letter-spacing:.5px;margin:12px 0 0;padding:4px 8px;background:#f2f4f8;border-left:4px solid #1A3C6E}.pt-bar{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;background:#f2f4f8;border-radius:6px;padding:8px 12px;font-size:11px;margin-bottom:12px}.pt-lbl{font-size:8.5px;color:#666;font-weight:700;text-transform:uppercase}</style></head><body>
<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding-bottom:12px;border-bottom:2.5px solid #1A3C6E;margin-bottom:15px">
  <div style="margin-bottom:14px;page-break-inside:avoid"><img src="" class="lh-img-tag" data-lhsrc="1" alt="Baweja Multispeciality Hospital" style="width:100%;max-width:720px;height:auto;display:block"></div>
  <div style="text-align:right;flex-shrink:0">
    <div style="font-size:9px;color:#444;margin-bottom:6px;font-family:Arial,sans-serif">&#9993; info&#64;bawejahospital.com</div>
    
    <div style="font-size:9px;color:#333;margin-top:4px;line-height:2;font-family:Arial,sans-serif">&#127760; : www.bawejahospital.com<br>&#127760; : www.bmhchandigarh.com</div>
  </div>
</div>
<div class="pt-bar">
  <div><div class="pt-lbl">Patient</div><div style="font-weight:900">${g('lab-rpt-name')}</div></div>
  <div><div class="pt-lbl">BMSH ID</div><div style="font-family:monospace;color:#1A3C6E;font-weight:700">${g('lab-rpt-id')}</div></div>
  <div><div class="pt-lbl">Age/Sex</div><div style="font-weight:700">${g('lab-rpt-age')}</div></div>
  <div><div class="pt-lbl">Ref. Doctor</div><div style="font-weight:700">${g('lab-rpt-dr')}</div></div>
  <div><div class="pt-lbl">Date</div><div style="font-weight:700">${today}</div></div>
  <div><div class="pt-lbl">Lab Technician</div><div style="font-weight:700">${g('lab-rpt-tech')}</div></div>
</div>
${['haem','bio','diab','thyroid'].map(p=>{
  const rows=document.querySelectorAll('#lab-'+p+' > div');
  if(!rows.length)return'';
  const pName={'haem':'Haematology','bio':'Biochemistry','diab':'Diabetes','thyroid':'Thyroid'}[p];
  return '<div class="section-hd">'+pName+'</div><table><thead><tr><th>Test</th><th>Value</th><th>Unit</th><th>Normal Range</th><th>Flag</th></tr></thead><tbody>'+
    Array.from(rows).map(r=>{
      const inps=r.querySelectorAll('input');
      const spns=r.querySelectorAll('span.badge');
      const name=r.querySelector('span')?.textContent||'';
      const val=inps[0]?.value||'—';
      const flag=spns[spns.length-1]?.textContent||'—';
      return '<tr><td style="font-weight:700">'+name+'</td><td style="font-weight:800;color:'+(flag==='HIGH'?'#CC0000':flag==='LOW'?'#FF9500':'#1a8c3c')+'">'+val+'</td><td></td><td></td><td class="'+(flag==='HIGH'?'flag-h':flag==='LOW'?'flag-l':'')+'">'+flag+'</td></tr>';
    }).join('')+'</tbody></table>';
}).join('')}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:20px">
  <div><div style="border-bottom:1px solid #333;margin-top:28px"></div><div style="font-size:9px;color:#888;margin-top:3px">Lab Technician Signature</div></div>
  <div style="text-align:right"><div style="font-size:11px;font-weight:900;color:#1A3C6E">Baweja Multispeciality Hospital</div><div style="border-bottom:1px solid #333;margin-top:28px"></div><div style="font-size:9px;color:#888;margin-top:3px">Authorised Signatory</div></div>
</div>
<div style="margin-top:12px;padding:7px;background:#f2f4f8;border-radius:6px;font-size:9px;color:#888;text-align:center">This report is generated electronically · Queries: 8146622802 / 6280048805</div>
</body></html>`;
  safePrint(html);
  showToast('Lab report sent to printer ✓','s');
}

// ═══════════════════════════════════════
// V21 FUNCTIONS
// ═══════════════════════════════════════

// ─── PROCEDURE / SURGERY ADVISED ─────────────
const PROC_LOG = [];  // persistent across session

// AI-suggest procedures based on current diagnosis + department
function renderAIProcSuggestions() {
  const deptMap = {ophtho:'ophtho', obg:'obg', psych:'psych', skin:'skin'};
  // Determine current dept from active patient
  const pt = PATIENTS[0]; // default to first patient for demo
  const dept = pt?.dept || 'ophtho';

  const suggestions = {
    ophtho:[
      {label:'PMICS + IOL OS', full:'PMICS + IOL Implantation (Left Eye)', price:38000},
      {label:'PMICS + IOL OD', full:'PMICS + IOL Implantation (Right Eye)', price:38000},
      {label:'IVT Injection', full:'IVT Injection (Anti-VEGF)', price:8000},
      {label:'YAG Caps', full:'Nd:YAG Capsulotomy', price:3000},
      {label:'Laser PI', full:'Laser Peripheral Iridotomy', price:4000},
      {label:'Trab OD', full:'Trabeculectomy OD', price:42000},
    ],
    obg:[
      {label:'LSCS', full:'LSCS (Elective)', price:45000},
      {label:'Laparoscopy', full:'Diagnostic Laparoscopy', price:20000},
      {label:'D&C', full:'D&C / Hysteroscopy', price:12000},
    ],
    psych:[
      {label:'ECT', full:'Electroconvulsive Therapy', price:8000},
    ],
    skin:[
      {label:'Chemical Peel', full:'Chemical Peel', price:1500},
      {label:'PRP', full:'PRP Treatment', price:3500},
      {label:'Microneedling', full:'Microneedling', price:2000},
      {label:'Botox', full:'Botox Injection', price:8000},
    ],
  };

  const s = suggestions[dept] || suggestions.ophtho;
  document.querySelectorAll('#ai-proc-suggestions').forEach(el => {
    el.innerHTML = s.map(p =>
      `<button class="btn btn-xs" style="background:var(--orange-lt);color:#8a4200;border:1.5px solid rgba(255,149,0,.4);padding:4px 10px;font-size:10.5px;font-weight:700;transition:all .15s"
        onmouseenter="this.style.background='var(--orange)';this.style.color='#fff'"
        onmouseleave="this.style.background='var(--orange-lt)';this.style.color='#8a4200'"
        onclick="addProcItem('${p.full}',${p.price})">${p.label}</button>`
    ).join('');
  });
}



function addProcFromDropdown(sel) {
  const val = sel.value;
  if(!val) return;
  if(val === '__custom__') {
    sel.value = '';
    addProcAdvised();
    return;
  }
  // Get price from CENTRE_CHARGES
  const price = Object.entries(CENTRE_CHARGES.CHD).find(([k])=>k.toLowerCase().includes(val.toLowerCase().split(' ')[0]))?.[1] || 0;
  addProcItem(val, price);
  sel.value = '';
}

function addProcAdvised() {
  const val = prompt('Enter procedure / surgery name:');
  if(!val) return;
  addProcItem(val, 0);
}

// ─── SMART SEND ROW ─────────────────
function renderAISuggestedCharges() {
  const el = document.getElementById('ai-suggested-charges'); if(!el) return;
  // Get current patient diagnosis context to suggest relevant charges
  const pt = PATIENTS[0];
  const dept = pt?.dept || 'ophtho';
  const suggestions = {
    ophtho: [
      {label:'Biometry ₹1,200', name:'Biometry IOL Master', amt:1200},
      {label:'OCT ₹1,800', name:'OCT Macula OU', amt:1800},
      {label:'HVF ₹1,500', name:'HVF Visual Fields', amt:1500},
      {label:'Fundus ₹600', name:'Fundus Photography', amt:600},
      {label:'PMICS ₹38K', name:'PMICS (Pinhole Micro Incision Cataract Surgery) + IOL', amt:38000},
    ],
    obg: [
      {label:'ANC ₹500', name:'ANC Visit', amt:500},
      {label:'LSCS ₹45K', name:'LSCS (Elective)', amt:45000},
    ],
    psych: [
      {label:'Consult ₹800', name:'Consultation', amt:800},
    ],
    skin: [
      {label:'Peel ₹1,500', name:'Chemical Peel', amt:1500},
      {label:'PRP ₹3,500', name:'PRP Treatment', amt:3500},
      {label:'Botox ₹8K', name:'Botox Injection', amt:8000},
    ],
  };
  const s = suggestions[dept] || suggestions.ophtho;
  el.innerHTML = s.map(c =>
    `<button class="btn btn-xs" style="background:#fff;color:#b55a00;border:1.5px solid rgba(255,149,0,.4);padding:3px 9px;font-size:10.5px;font-weight:700;transition:all .15s"
      onmouseenter="this.style.background='#b55a00';this.style.color='#fff'"
      onmouseleave="this.style.background='#fff';this.style.color='#b55a00'"
      onclick="sendQuickCharge('${c.name}','${c.amt}')">${c.label}</button>`
  ).join('');
}

function sendFromDropdown(sel) {
  const val = sel.value; if(!val) return;
  const [name, amt] = val.split('|');
  sendQuickCharge(name, amt);
  // Log in sent-charges-log
  const log = document.getElementById('sent-charges-log');
  if(log) {
    const badge = document.createElement('span');
    badge.style.cssText='background:var(--green-lt);color:#1a8c3c;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;border:1px solid var(--green)';
    badge.textContent = `✓ ${name}`;
    log.appendChild(badge);
  }
  sel.value = '';
}

function addCustomCharge() {
  const name = prompt('Procedure / investigation name:'); if(!name) return;
  const amt = prompt('Amount (₹):', '0'); if(amt===null) return;
  sendQuickCharge(name, parseInt(amt)||0);
}

// ─── INIT CALLS ─────────────────
setTimeout(() => {
  renderAIProcSuggestions();
  renderAISuggestedCharges();
}, 200);

// ═══════════════════════════════════════
// V22 — LOGIN + CENTRE SYSTEM
// ═══════════════════════════════════════

function toggleLgPw() {
  const p = document.getElementById('lg-pass');
  p.type = p.type === 'password' ? 'text' : 'password';
}



function loginUser() {
  try {
    var user = ((document.getElementById('lg-email') || document.getElementById('lg-user')) ? (document.getElementById('lg-email') || document.getElementById('lg-user')).value : '').trim().toLowerCase();
    var pass = (document.getElementById('lg-pass') ? document.getElementById('lg-pass').value : '');
    
    if (!user || !pass) {
      showLoginErr('Please enter username and password');
      return;
    }
    
    var profile = USER_DB ? USER_DB[user] : null;
    if (!profile || profile.pw !== pass) {
      if (window.FBDB) {
        window.FBDB.ref('userSettings/' + user).once('value').then(function(snap) {
          const data = snap.val();
          if(!data) {
            showLoginErr('Incorrect username or password');
            var pi = document.getElementById('lg-pass');
            if (pi) pi.value = '';
            return;
          }
          USER_DB[user] = Object.assign({}, USER_DB[user] || {}, data);
          if (USER_DB[user].pw !== pass) {
            showLoginErr('Incorrect username or password');
            var pi2 = document.getElementById('lg-pass');
            if (pi2) pi2.value = '';
            return;
          }
          activateUserSession(user, USER_DB[user], { showToastOnSuccess: true, auditLogin: true });
        }).catch(function() {
          showLoginErr('Incorrect username or password');
          var pi3 = document.getElementById('lg-pass');
          if (pi3) pi3.value = '';
        });
        return;
      }
      showLoginErr('Incorrect username or password');
      var pi = document.getElementById('lg-pass');
      if (pi) pi.value = '';
      return;
    }

    // Block disabled accounts
    if (profile.disabled === true) {
      showLoginErr('This account has been disabled. Please contact the administrator.');
      var pi2 = document.getElementById('lg-pass');
      if (pi2) pi2.value = '';
      return;
    }
    try {
      var rem = document.getElementById('lg-remember');
      if (rem && rem.checked) {
        localStorage.setItem('bmh_creds', JSON.stringify({u: user, p: pass}));
      } else {
        localStorage.removeItem('bmh_creds');
      }
    } catch(storErr) {}

    activateUserSession(user, profile, { showToastOnSuccess: true, auditLogin: true });


  } catch(loginErr) {
    console.error('Login error:', loginErr);
    showLoginErr('Login error: ' + loginErr.message + '. Please refresh and try again.');
  }
}

function activateUserSession(user, profile, opts) {
  opts = opts || {};
  if (String(user || '').toLowerCase() === 'rec_rpr') profile = Object.assign({}, profile, { centre: 'RPR', name: 'Reception Ropar' });
  if (String(user || '').toLowerCase() === 'optometrist') profile = Object.assign({}, profile, { centre: 'RPR', name: 'Optometrist RPR' });
  CURRENT_USER = Object.assign({}, profile, {username: user});
  window.CURRENT_USER = CURRENT_USER;
  try { sessionStorage.setItem('bmh_active_session', JSON.stringify({ u: user })); } catch (e) {}

  var gate = document.getElementById('login-gate');
  if (gate) gate.style.display = 'none';
  var shell = document.getElementById('shell');
  if (shell) shell.style.display = 'flex';

  var cSel = document.getElementById('c-sel-row');
  if(profile.centre === 'CHD' || profile.centre === 'RPR') {
    var cLabel = profile.centre === 'CHD' ? 'Chandigarh' : 'Ropar';
    var tbCp = document.getElementById('tb-cp');
    if(tbCp) tbCp.textContent = '📍 ' + cLabel;
    document.querySelectorAll('.c-btn').forEach(function(b){ b.classList.remove('active'); b.style.opacity = profile.isAdmin ? '1' : '0.5'; b.style.pointerEvents = profile.isAdmin ? '' : 'none'; });
    var activeBtn = document.querySelector('.c-btn[data-centre="' + profile.centre + '"]');
    if(activeBtn) { activeBtn.classList.add('active'); activeBtn.style.opacity='1'; }
    if(cSel && !profile.isAdmin) cSel.style.opacity = '0.6';
  } else {
    if(cSel) cSel.style.opacity = '1';
    document.querySelectorAll('.c-btn').forEach(function(b){ b.style.opacity='1'; b.style.pointerEvents=''; });
  }

  var sbnm = document.getElementById('sbnm'); if (sbnm) sbnm.textContent = profile.name;
  var cDisp = profile.centre === 'BOTH' ? 'Admin' : profile.centre;
  var sbrl = document.getElementById('sbrl'); if (sbrl) sbrl.textContent = profile.role + ' · ' + cDisp;
  var sbav = document.getElementById('sbav');
  if (sbav) sbav.textContent = profile.name.replace('Dr. ','').split(' ').map(function(n){return n[0]||'';}).join('').substring(0,2).toUpperCase();

  if (typeof buildSidebarForRole === 'function') buildSidebarForRole(profile.role, profile.dept, profile.name);

  var pageMap = { Admin:'dashboard', Doctor:'doctor-queue', Reception:'reception', Lab:'lab', TPA:'tpa', Inventory:'inventory', Optometrist:'doctor-queue' };
  var firstPage = pageMap[profile.role] || 'dashboard';
  if (typeof nav === 'function') nav(firstPage, null);

  setTimeout(function() {
    try {
      if (typeof loadPatientsFromFirebase === 'function')  loadPatientsFromFirebase();
      if (typeof listenPayRequests === 'function')         listenPayRequests();
      if (typeof listenAppointments === 'function')        listenAppointments();
      if (typeof loadTodayTransactions === 'function')     loadTodayTransactions();
      if (typeof loadCustomPurposes === 'function')        loadCustomPurposes();
      if (typeof loadAdviceTemplates === 'function')       loadAdviceTemplates();
      if (typeof loadDeletionRequests === 'function')      loadDeletionRequests();
      if (typeof loadOTCasesFromFirebase === 'function')   loadOTCasesFromFirebase();
      if (typeof loadIPDPatientsFromFirebase === 'function') loadIPDPatientsFromFirebase();
      if (typeof loadDoctorProfilesFromFirebase === 'function') loadDoctorProfilesFromFirebase();
      if (typeof loadChargesFromFirebase === 'function') loadChargesFromFirebase();
      if (typeof renderDocQueue === 'function') renderDocQueue();
      if (typeof renderReceptionPage === 'function') renderReceptionPage();
      if (typeof renderDashboard === 'function') renderDashboard();
      if (profile.role === 'Lab' && typeof listenLabOrders === 'function') listenLabOrders();
      if (window.FBDB) {
        window.FBDB.ref('userSettings').once('value').then(function(snap) {
          const settings = snap.val();
          if(!settings) return;
          Object.entries(settings).forEach(function([uname, data]) {
            if(!USER_DB[uname] && data.name && data.role) {
              USER_DB[uname] = { pw: data.pw||'', name: data.name, role: data.role||'Reception', dept: data.dept||'', centre: data.centre||'CHD', degrees: data.degrees||'', canSeeAllCentres: !!data.canSeeAllCentres, isAdmin: !!data.isAdmin, disabled: !!data.disabled };
            } else if(USER_DB[uname]) {
              if(data.pw) USER_DB[uname].pw = data.pw;
              if(data.disabled !== undefined) USER_DB[uname].disabled = data.disabled;
            }
          });
        }).catch(function(e){ console.warn('userSettings load error:', e); });
      }
      if (opts.auditLogin && typeof fbPush === 'function') {
        fbPush('auditLog', { user: profile.name, role: profile.role, centre: profile.centre, action: 'LOGIN', timestamp: new Date().toISOString() });
      }
    } catch(fbErr) { console.warn('Firebase listener error:', fbErr); }
  }, 250);

  if (opts.showToastOnSuccess && typeof showToast === 'function') showToast('Welcome, ' + profile.name + ' ✓', 's');
}
function preloadUserSettings() {
  if(!window.FBDB) return;
  window.FBDB.ref('userSettings').once('value').then(function(snap) {
    const settings = snap.val();
    if(!settings) return;
    Object.entries(settings).forEach(function([uname, data]) {
      USER_DB[uname] = Object.assign({}, USER_DB[uname] || {}, data);
    });
    if (CURRENT_USER?.isAdmin) renderAdminUsersList && renderAdminUsersList();
  }).catch(function(e){ console.warn('user preload error:', e); });
}

function showLoginErr(msg) {
  const err = document.getElementById('lg-err');
  if(err) { err.textContent = msg; err.style.display = 'block'; }
  const inp = document.getElementById('lg-email') || document.getElementById('lg-user');
  if(inp) { inp.style.borderColor = 'rgba(255,59,48,.6)'; setTimeout(()=>inp.style.borderColor='', 2000); }
}

// ── Centre filtering helpers ─────────────────────────────────────────────────
// Returns null if user sees all centres (admin/BOTH), or 'CHD'/'RPR' for centre-locked users
function getUserCentre() {
  if(!CURRENT_USER) return null;
  if(CURRENT_USER.canSeeAllCentres || CURRENT_USER.isAdmin || CURRENT_USER.centre === 'BOTH') return null;
  return CURRENT_USER.centre;
}
function getEffectiveCentre() {
  const locked = getUserCentre();
  if(locked) return locked;
  const activeBtn = document.querySelector('.c-btn.active[data-centre]');
  return activeBtn?.getAttribute('data-centre') || CURRENT_USER?.centre || 'CHD';
}
function getReceptionSelectedCentre() {
  const locked = getUserCentre();
  if(locked) return locked;
  return document.getElementById('rc-centre')?.value || getEffectiveCentre();
}
// Returns true if an item (patient/IPD/OT/transaction) belongs to the user's visible centres
function centreMatch(item) {
  const uc = getEffectiveCentre();
  if(!uc) return true; // admin/BOTH — see everything
  return (item.centre || 'CHD') === uc;
}
function formatDateIN(value) {
  if(!value) return '—';
  const d = String(value).includes('T') ? new Date(value) : new Date(String(value) + 'T12:00:00');
  if(Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});
}

function filterPatientsForUser() {
  if(!CURRENT_USER) return;
  if(CURRENT_USER.canSeeAllCentres || CURRENT_USER.isAdmin) {
    // Admin/Dr Varun: sees all patients at both centres
    return;
  }
  // For centre-specific users: show own centre patients + cross-centre history
  // Patients at own centre: full access
  // Patients at other centre: visible in search/history only (read-only past visits)
  const myCentre = CURRENT_USER.centre;
  // Update queue badge counts for centre
  const localPts = PATIENTS.filter(p => (p.centre||'CHD') === myCentre);
  const nb = document.getElementById('nb-dq');
  if(nb) nb.textContent = localPts.filter(p=>!p.seen).length;
  // For doctor: filter to own dept too
  if(CURRENT_USER.role === 'Doctor') {
    const deptMap = {Ophthalmology:'ophtho',OBG:'obg',Neuropsychiatry:'psych','Skin':'skin','Skin & Cosmetology':'skin'};
    const myDept = deptMap[CURRENT_USER.dept] || 'ophtho';
    const myPts = PATIENTS.filter(p => (p.centre||'CHD')===myCentre && p.dept===myDept);
    const nb2 = document.getElementById('nb-dq');
    if(nb2) nb2.textContent = myPts.filter(p=>!p.seen).length;
  }
}



// ─── PROCEDURE — DEPT-SPECIFIC DROPDOWN ─────────────
function addProcFromDropdownDept(sel) {
  const val = sel.value; if(!val) return;
  if(val.startsWith('__custom__')) { sel.value=''; addProcAdvised(); return; }
  const parts = val.split('|');
  const name = parts[0], price = parseInt(parts[1])||0;
  // Find the right container - look for nearest rx-proc-advised
  const container = sel.closest('[class*="tab-content"]')?.querySelector('[id^="rx-proc-advised"]')
    || document.getElementById('rx-proc-advised');
  addProcItemToContainer(container, name, price);
  sel.value = '';
}

function addProcItemToContainer(container, procName, price) {
  if(!container || !procName) return;
  const placeholder = container.querySelector('.proc-placeholder');
  if(placeholder) placeholder.remove();
  const existing = Array.from(container.querySelectorAll('[data-proc]')).map(e=>e.dataset.proc);
  if(existing.includes(procName)) { showToast('"'+procName+'" already added','i'); return; }
  const d = document.createElement('div');
  d.dataset.proc = procName;
  d.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 11px;background:var(--orange-lt);border-radius:8px;border-left:3px solid var(--orange);margin-bottom:5px';
  d.innerHTML = '<span style="font-size:14px">⚕️</span>'
    + '<div style="flex:1"><div style="font-size:14px;font-weight:900;color:var(--bmh-blue)">'+procName+'</div>'
    + '</div>'
    + '<button class="btn btn-xs btn-gold" onclick="nav(\'brochures\',null)" title="Patient brochure">📄</button>'
    + '<button class="btn btn-xs" style="background:#CC0000;color:#fff;padding:2px 7px" onclick="this.closest(\'[data-proc]\').remove()">✕</button>';
  container.appendChild(d);
  PROCEDURE_ADVISED_LOG && PROCEDURE_ADVISED_LOG.push({proc:procName, price, date:new Date().toLocaleDateString('en-IN'), patient:'BMSH-000001'});
  showToast('⚕️ "'+procName+'" added ✓','s');
}

// Override addProcItem to use container-based approach
function addProcItem(procName, price) {
  const c = document.getElementById('rx-proc-advised')
    || document.querySelector('[id^="rx-proc-advised"]');
  addProcItemToContainer(c, procName, price);
}

function rxFreqPlainEn(freq) {
  const f = String(freq || '');
  if (/Half-hourly/i.test(f)) return 'every 30 minutes';
  if (/Hourly/i.test(f)) return 'every hour';
  if (/Every 2 hours/i.test(f)) return 'every 2 hours';
  if (/Every 3 hours/i.test(f)) return 'every 3 hours';
  if (/Every 4 hours/i.test(f)) return 'every 4 hours';
  if (/QID|Four times/i.test(f)) return '4 times a day';
  if (/TDS|Three times/i.test(f)) return '3 times a day';
  if (/BD|Twice/i.test(f)) return 'twice a day';
  if (/Once daily|\(OD\)/i.test(f) && !/Overdrive/i.test(f)) return 'once a day';
  if (/6x|Six times/i.test(f)) return '6 times a day';
  if (/PRN|As needed/i.test(f)) return 'as needed';
  if (/HS|bedtime/i.test(f)) return 'at bedtime';
  if (/weekly/i.test(f)) return 'once weekly';
  return f || 'as directed';
}
function rxFreqPlain(freq, lang) {
  const en = rxFreqPlainEn(freq);
  if (lang === 'hi') {
    const map = {
      'every 30 minutes':'हर 30 मिनट',
      'every hour':'हर 1 घंटे',
      'every 2 hours':'हर 2 घंटे',
      'every 3 hours':'हर 3 घंटे',
      'every 4 hours':'हर 4 घंटे',
      '4 times a day':'दिन में 4 बार',
      '3 times a day':'दिन में 3 बार',
      'twice a day':'दिन में 2 बार',
      'once a day':'दिन में 1 बार',
      '6 times a day':'दिन में 6 बार',
      'as needed':'ज़रूरत पड़ने पर',
      'at bedtime':'रात को सोते समय',
      'once weekly':'हफ्ते में 1 बार',
      'as directed':'जैसा बताया गया है'
    };
    return map[en] || en;
  }
  if (lang === 'pa') {
    const map = {
      'every 30 minutes':'ਹਰ 30 ਮਿੰਟ ਬਾਅਦ',
      'every hour':'ਹਰ 1 ਘੰਟੇ ਬਾਅਦ',
      'every 2 hours':'ਹਰ 2 ਘੰਟੇ ਬਾਅਦ',
      'every 3 hours':'ਹਰ 3 ਘੰਟੇ ਬਾਅਦ',
      'every 4 hours':'ਹਰ 4 ਘੰਟੇ ਬਾਅਦ',
      '4 times a day':'ਦਿਨ ਵਿੱਚ 4 ਵਾਰ',
      '3 times a day':'ਦਿਨ ਵਿੱਚ 3 ਵਾਰ',
      'twice a day':'ਦਿਨ ਵਿੱਚ 2 ਵਾਰ',
      'once a day':'ਦਿਨ ਵਿੱਚ 1 ਵਾਰ',
      '6 times a day':'ਦਿਨ ਵਿੱਚ 6 ਵਾਰ',
      'as needed':'ਲੋੜ ਪੈਣ ਤੇ',
      'at bedtime':'ਰਾਤ ਸੌਣ ਵੇਲੇ',
      'once weekly':'ਹਫ਼ਤੇ ਵਿੱਚ 1 ਵਾਰ',
      'as directed':'ਜਿਵੇਂ ਦੱਸਿਆ ਗਿਆ ਹੈ'
    };
    return map[en] || en;
  }
  return en;
}
function rxDurationPlainEn(dur) {
  const d = String(dur || '').trim();
  if(!d) return 'as directed';
  return d.replace(/\bOD\b/gi,'day').replace(/\bBD\b/gi,'day');
}
function rxDurationPlain(dur, lang) {
  const en = rxDurationPlainEn(dur);
  if (lang === 'hi') {
    return en.replace(/(\d+)\s*day/gi, '$1 दिन')
      .replace(/(\d+)\s*week/gi, '$1 सप्ताह')
      .replace(/(\d+)\s*month/gi, '$1 महीना')
      .replace(/as directed/i, 'जैसा बताया गया है');
  }
  if (lang === 'pa') {
    return en.replace(/(\d+)\s*day/gi, '$1 ਦਿਨ')
      .replace(/(\d+)\s*week/gi, '$1 ਹਫ਼ਤਾ')
      .replace(/(\d+)\s*month/gi, '$1 ਮਹੀਨਾ')
      .replace(/as directed/i, 'ਜਿਵੇਂ ਦੱਸਿਆ ਗਿਆ ਹੈ');
  }
  return en;
}
function rxEyePlainEn(eye) {
  const e = String(eye || '');
  if (/Right Eye|\(OD\)/i.test(e)) return 'the right eye';
  if (/Left Eye|\(OS\)/i.test(e)) return 'the left eye';
  if (/Both Eyes|\(OU\)/i.test(e)) return 'both eyes';
  if (/Oral/i.test(e)) return 'by mouth';
  if (/Topical/i.test(e)) return 'topically';
  return (e || 'as directed').toLowerCase();
}
function rxEyePlain(eye, lang) {
  const en = rxEyePlainEn(eye);
  if (lang === 'hi') {
    const map = {
      'the right eye':'दाहिनी आंख',
      'the left eye':'बाईं आंख',
      'both eyes':'दोनों आंखें',
      'by mouth':'मुंह से',
      'topically':'बाहरी रूप से',
      'as directed':'जैसा बताया गया है'
    };
    return map[en] || en;
  }
  if (lang === 'pa') {
    const map = {
      'the right eye':'ਸੱਜੀ ਅੱਖ',
      'the left eye':'ਖੱਬੀ ਅੱਖ',
      'both eyes':'ਦੋਵਾਂ ਅੱਖਾਂ',
      'by mouth':'ਮੂੰਹ ਰਾਹੀਂ',
      'topically':'ਬਾਹਰੋਂ',
      'as directed':'ਜਿਵੇਂ ਦੱਸਿਆ ਗਿਆ ਹੈ'
    };
    return map[en] || en;
  }
  return en;
}
function buildRxPlainInstructionLine(d, lang, fmtIN) {
  const eye = Array.isArray(d.eye) ? d.eye[0] : d.eye;
  const freq = rxFreqPlain(d.freq, lang);
  const dur = rxDurationPlain(d.dur, lang);
  const eyeTxt = rxEyePlain(eye, lang);
  const df = fmtIN(d.dateFrom);
  const dt = fmtIN(d.dateTo);
  const form = String(d.drugType || d.type || '').toLowerCase();
  let action = 'Take';
  if (/drop|eye/i.test(form)) action = 'Instill one drop';
  else if (/ointment|gel|cream|lotion/i.test(form)) action = 'Apply';
  else if (/spray/i.test(form)) action = 'Use';
  else if (/injection/i.test(form)) action = 'Administer';
  else if (/pessary/i.test(form)) action = 'Insert';
  let line = '';
  if (lang === 'hi') {
    if (/drop|eye/i.test(form)) line = eyeTxt + ' में 1 बूंद ' + freq + ', ' + dur + ', ' + df + ' से ' + dt + ' तक।';
    else if (/ointment|gel|cream|lotion/i.test(form)) line = eyeTxt + ' पर लगाएं, ' + freq + ', ' + dur + ', ' + df + ' से ' + dt + ' तक।';
    else if (/injection/i.test(form)) line = 'निर्देशानुसार दें, ' + freq + ', ' + dur + ', ' + df + ' से ' + dt + ' तक।';
    else line = eyeTxt + ' के लिए ' + freq + ', ' + dur + ', ' + df + ' से ' + dt + ' तक।';
  } else if (lang === 'pa') {
    if (/drop|eye/i.test(form)) line = eyeTxt + ' ਵਿੱਚ 1 ਬੂੰਦ ' + freq + ', ' + dur + ', ' + df + ' ਤੋਂ ' + dt + ' ਤੱਕ।';
    else if (/ointment|gel|cream|lotion/i.test(form)) line = eyeTxt + ' ਤੇ ਲਗਾਓ, ' + freq + ', ' + dur + ', ' + df + ' ਤੋਂ ' + dt + ' ਤੱਕ।';
    else if (/injection/i.test(form)) line = 'ਨਿਰਦੇਸ਼ ਅਨੁਸਾਰ ਦਿਓ, ' + freq + ', ' + dur + ', ' + df + ' ਤੋਂ ' + dt + ' ਤੱਕ।';
    else line = eyeTxt + ' ਲਈ ' + freq + ', ' + dur + ', ' + df + ' ਤੋਂ ' + dt + ' ਤੱਕ।';
  } else {
    line = action + ' in ' + eyeTxt + ' ' + freq + ' for ' + dur + ', from ' + df + ' to ' + dt + '.';
  }
  return line;
}

// ─── UPDATED printUnifiedRx with doctor degrees + safePrint ─────────────
window.printUnifiedRx = function(deptId) {
  const today = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  const rxDateOe = document.getElementById('rx-date');
  if (rxDateOe) rxDateOe.textContent = today;
  ['obg','psych','skin'].forEach(d=>{const e=document.getElementById(d+'-rx-date');if(e)e.textContent=today;});

  const fmtIN = (iso) => {
    if (!iso) return '—';
    const t = Date.parse(iso);
    return Number.isNaN(t) ? String(iso) : new Date(t).toLocaleDateString('en-IN',{day:'2-digit',month:'2-digit',year:'numeric'});
  };

  // ── Collect checkboxes ──
  const incIOP  = document.getElementById(deptId+'-inc-iop')?.checked ?? true;
  const incVA   = document.getElementById(deptId+'-inc-va')?.checked  ?? true;
  const incGL   = document.getElementById(deptId+'-inc-gl')?.checked  ?? false;
  const incInv  = document.getElementById(deptId+'-inc-inv')?.checked ?? true;
  const incPrc  = document.getElementById(deptId+'-inc-proc')?.checked ?? true;
  const incCC   = document.getElementById('oe-inc-cc')?.checked ?? true;
  const incPos  = document.getElementById('oe-inc-posfind')?.checked ?? true;

  // ── Collect diagnoses — Ophthalmology: numbered rows; other depts: *-dx-list ──
  const dxPack = typeof collectDeptDiagnosesForPrint === 'function' ? collectDeptDiagnosesForPrint(deptId) : { lines: [], notes: '' };
  const dxList = [...(dxPack.lines || [])];
  if(dxPack.notes) dxList.push(dxPack.notes);

  // ── Collect complaints ──
  const cc   = document.getElementById('cc-text')?.value || '';
  const ccDur = document.getElementById('dur-text')?.value || '';

  // ── Collect drugs ──
  const drugs = typeof RX_DRUGS !== 'undefined' ? RX_DRUGS : [];
  const rxPlainLang = typeof rxLang !== 'undefined' ? rxLang : 'en';
  const postSurgeryRx = deptId === 'oe' ? !!document.getElementById('rx-post-surgery')?.checked : false;
  const plainInstrBlocks = drugs.length ? drugs.map(function (d) {
    return buildRxPlainInstructionLine(d, rxPlainLang, fmtIN);
  }).filter(Boolean) : [];

  // ── Collect procedures ──
  const _pc1 = document.getElementById('rx-proc-advised-'+deptId);
  const _pc2 = document.getElementById('rx-proc-advised');
  const _ps  = new Set();
  [_pc1,_pc2].filter(Boolean).forEach(c=>c.querySelectorAll('[data-proc]').forEach(e=>_ps.add(e.dataset.proc)));
  const procs = [..._ps];

  // ── IOP values ──
  const iopGatOD = document.getElementById('iop-gat-od')?.value||'';
  const iopGatOS = document.getElementById('iop-gat-os')?.value||'';
  const iopNctOD = document.getElementById('iop-nct-od')?.value||'';
  const iopNctOS = document.getElementById('iop-nct-os')?.value||'';

  // ── VA values ──
  const vaOD = document.getElementById('ucva-od-dist')?.value || document.getElementById('va-od-uc')?.value||'';
  const vaOS = document.getElementById('ucva-os-dist')?.value || document.getElementById('va-os-uc')?.value||'';

  // ── Refraction (glasses) ──
  const rfODSph = document.getElementById('rf-od-sph2')?.value||'0';
  const rfODCyl = document.getElementById('rf-od-cyl2')?.value||'0';
  const rfODAx  = document.getElementById('rf-od-ax2')?.value||'0°';
  const rfOSSph = document.getElementById('rf-os-sph2')?.value||'0';
  const rfOSCyl = document.getElementById('rf-os-cyl2')?.value||'0';
  const rfOSAx  = document.getElementById('rf-os-ax2')?.value||'0°';
  const addOD = document.querySelector('#oe-va-iop-ref select[id*="add"]')?.value || document.querySelectorAll('#oe-va-iop-ref tbody select')[6]?.value||'';
  const addOS = document.querySelectorAll('#oe-va-iop-ref tbody select')[13]?.value||'';
  const nvOD  = document.getElementById('ucva-od-near')?.value||'';
  const nvOS  = document.getElementById('ucva-os-near')?.value||'';

  // ── Follow-up ──
  const fuDate  = document.getElementById('rx-fu-date')?.value;
  const fuFormatted = fuDate ? new Date(fuDate).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}) : '';
  const advice  = (deptId === 'oe'
    ? (document.getElementById('rx-advice-text')?.value || '')
    : (document.getElementById(deptId+'-advice')?.value || '')) || '';

  // ── Doctor info (logged-in doctor on prescription) ──
  const doctorDisplay = typeof getRxDoctorDisplayName === 'function' ? getRxDoctorDisplayName() : (CURRENT_USER?.name || 'Dr. Varun Baweja');
  const doctorName = String(doctorDisplay).split('·')[0].trim();
  const doctorProfile = (typeof DOCTOR_PROFILES!=='undefined' && DOCTOR_PROFILES[doctorName]) || {};
  const doctorDegrees = doctorProfile.degrees || CURRENT_USER?.degrees || 'MBBS,DO,DNB,Ex Cons Cambridgeshire(UK)';
  const doctorSpec    = {oe:'Ophthalmologist',obg:'Obstetrician & Gynaecologist',psych:'Psychiatrist',skin:'Dermatologist'}[deptId]||'Specialist';
  const doctorReg     = doctorProfile.reg || '';
  const doctorPhone   = '6280048805';

  // ── Patient info ──
  const cpt = window.CURRENT_PATIENT || {};
  const ptName  = cpt.name || document.getElementById(deptId+'-rx-ptname')?.textContent || document.getElementById('ophtho-pt-nm')?.textContent || 'Patient';
  const ptId    = cpt.bmhId || document.getElementById(deptId+'-rx-ptid')?.textContent   || document.getElementById('ophtho-pt-uid')?.textContent || '—';
  const ptAge   = document.getElementById(deptId+'-rx-agesex')?.textContent || ((cpt.age != null && cpt.sex) ? `${cpt.age}Y / ${cpt.sex}` : '—');
  const ptMob   = cpt.mob || PATIENTS?.find(p=>p.bmhId===ptId)?.mob || '';
  const patientInvestigationOrders = (Array.isArray(cpt.investigationOrders) ? cpt.investigationOrders : INVESTIGATION_ORDERS).filter(o => !o.done && (!o.bmhId || o.bmhId === ptId));

  // ── Letterhead: uploaded header, LH, or same-origin asset (fixes missing header on GitHub Pages) ──
  const lhImgSrc = resolvePrintHeaderSrc();
  const footerSrc = window.PRINT_FOOTER_SRC || '';

  const showVA = incVA && deptId==='oe' && (vaOD||vaOS);
  const showGL = incGL && deptId==='oe' && (rfODSph||rfOSSph||rfODCyl||rfOSCyl);
  const showIOP = incIOP && deptId==='oe' && (iopGatOD||iopGatOS||iopNctOD||iopNctOS);

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Playfair+Display:wght@700&display=swap');
*{margin:0;padding:0;box-sizing:border-box;print-color-adjust:exact;-webkit-print-color-adjust:exact}
body{font-family:'Lato',Georgia,serif;font-size:10.7px;color:#1a1a1a;background:#fff;padding:7mm 12mm;line-height:1.4}
@page{size:A4 portrait;margin:0}
.lh-img{width:100%;max-width:100%;height:auto;display:block;margin-bottom:10px}
.pt-line{display:flex;align-items:baseline;justify-content:space-between;border-bottom:2px solid #1A3C6E;padding-bottom:6px;margin-bottom:7px}
.pt-name{font-family:'Playfair Display','Georgia',serif;font-size:18px;font-weight:700;color:#1A3C6E;letter-spacing:.2px}
.pt-meta{font-size:12px;font-weight:300;color:#444;margin-left:10px;font-style:italic}
.pt-date{font-size:11px;color:#555;font-weight:400}
.lbl-row{display:flex;gap:0;margin-bottom:5px;align-items:baseline}
.lbl{font-size:10px;font-weight:700;text-transform:uppercase;min-width:112px;letter-spacing:.7px;color:#1A3C6E}
.lbl-val{font-size:11px;color:#222}
.sec-title{font-family:'Playfair Display','Georgia',serif;font-size:12px;font-weight:700;color:#1A3C6E;margin:11px 0 6px;border-bottom:1.5px solid #1A3C6E;padding-bottom:2px;letter-spacing:.2px}
table{width:100%;border-collapse:collapse;font-size:10.4px;margin-bottom:8px}
th{background:#1A3C6E;color:#fff;border:1px solid #1A3C6E;padding:5px 7px;font-weight:700;text-align:center;font-size:9.6px;letter-spacing:.4px;text-transform:uppercase}
td{border:1px solid #c8d0dc;padding:5px 7px;text-align:center;vertical-align:top}
td.left{text-align:left}
tr:nth-child(even) td{background:#f8f9fc}
.rx-name{font-weight:700;font-size:11.5px;color:#1A3C6E;letter-spacing:.15px}
.rx-gen{font-size:9.4px;color:#666;font-style:italic;margin-top:1px}
.rx-instr{font-size:10px;color:#222;margin-top:5px;padding:5px 8px;background:#f0f4ff;border-left:3px solid #1A3C6E;border-radius:0 4px 4px 0;line-height:1.5}
.proc-item{padding:5px 0;font-size:15px;font-weight:800;border-bottom:1px solid #eee;display:flex;align-items:center;gap:8px}
.fu-box{background:linear-gradient(135deg,#EBF3FF,#daeeff);border-radius:6px;padding:9px 16px;margin:10px 0;font-size:13px;font-weight:700;color:#1A3C6E;display:inline-block;border:1.5px solid rgba(26,60,110,.2)}
.sig-row{display:flex;justify-content:space-between;align-items:flex-end;margin-top:28px;padding-top:12px;border-top:1px solid #eee}
.dr-name{font-family:'Playfair Display','Georgia',serif;font-size:15px;font-weight:700;color:#1A3C6E}
.dr-deg{font-size:11px;color:#444;margin-top:2px;font-style:italic}
.dr-spec{font-size:12px;font-weight:700;color:#333;margin-top:2px}
.dr-reg{font-size:10px;color:#888;margin-top:2px}
.phone-line{font-size:11.5px;color:#444;margin-bottom:8px}
.flag-h{color:#CC0000;font-weight:700}
.flag-n{color:#1a8c3c;font-weight:600}
.watermark{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:80px;font-weight:900;color:rgba(26,60,110,.04);font-family:'Playfair Display','Georgia',serif;white-space:nowrap;pointer-events:none;z-index:0}
.diag-banner{margin:0 auto 7px;max-width:96%;padding:4px 10px;border:1px solid rgba(26,60,110,.18);border-radius:999px;background:#f7faff;text-align:center;font-size:9.6px;font-weight:700;color:#1A3C6E}
</style></head><body>

${lhImgSrc ? `<img src="${lhImgSrc}" class="lh-img" alt="Baweja Multispeciality Hospital">` : '<div style="height:80px;background:#f2f4f8;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#888;font-size:13px;margin-bottom:10px">Baweja Multispeciality Hospital Letterhead</div>'}

<div class="pt-line">
  <div>
    <span class="pt-name">${ptName}</span>
    <span class="pt-meta">${ptAge}</span>
  </div>
  <div class="pt-date">${today}</div>
</div>

${dxList.length ? `<div class="diag-banner">${dxList.join(' · ')}</div>` : ''}

${ptMob ? `<div class="phone-line">&#9990; ${ptMob} &nbsp;&nbsp;|&nbsp;&nbsp; BMSH ID: ${ptId}</div>` : `<div class="phone-line">BMSH ID: ${ptId}</div>`}

${postSurgeryRx ? `<div class="lbl-row" style="margin:4px 0 7px"><span class="lbl"></span><span class="lbl-val" style="font-weight:800;color:#1A3C6E">The medication schedule after surgery</span></div>` : ''}

${incCC && cc ? `<div class="lbl-row" style="margin-top:8px"><span class="lbl">Complaints:</span><span class="lbl-val">${cc}${ccDur?' ('+ccDur+')':''}</span></div>` : ''}

${showVA ? `
<div class="sec-title">Visual Acuity Test:</div>
<table>
  <thead><tr><th>Eye</th><th>UCDVA</th>${showIOP?'<th>IOP (GAT)</th>':''}${showIOP&&(iopNctOD||iopNctOS)?'<th>IOP (NCT)</th>':''}<th>DVA</th><th>NVA</th></tr></thead>
  <tbody>
    <tr><td><b>Right Eye</b></td><td>${vaOD||'—'}</td>${showIOP?`<td class="${parseFloat(iopGatOD)>21?'flag-h':'flag-n'}">${iopGatOD?iopGatOD+' mmHg':'—'}</td>`:''}${showIOP&&(iopNctOD||iopNctOS)?`<td>${iopNctOD?iopNctOD+' mmHg':'—'}</td>`:''}<td>${rfODSph!=='0'||(rfODCyl!=='0')?'6/6':'—'}</td><td>${nvOD||'—'}</td></tr>
    <tr><td><b>Left Eye</b></td><td>${vaOS||'—'}</td>${showIOP?`<td class="${parseFloat(iopGatOS)>21?'flag-h':'flag-n'}">${iopGatOS?iopGatOS+' mmHg':'—'}</td>`:''}${showIOP&&(iopNctOD||iopNctOS)?`<td>${iopNctOS?iopNctOS+' mmHg':'—'}</td>`:''}<td>${rfOSSph!=='0'||(rfOSCyl!=='0')?'6/6':'—'}</td><td>${nvOS||'—'}</td></tr>
  </tbody>
</table>` : ''}

${showGL ? `
<div class="sec-title">Final Glass Prescription:</div>
<table>
  <thead><tr><th>Eye</th><th>SPH</th><th>CYL</th><th>AXIS</th><th>ADD</th><th>DVA</th><th>NVA</th></tr></thead>
  <tbody>
    <tr><td><b>Right Eye</b></td><td>${rfODSph||'0'}</td><td>${rfODCyl||'0'}</td><td>${rfODAx||'0°'}</td><td>${addOD||'—'}</td><td>${vaOD||'—'}</td><td>${nvOD||'—'}</td></tr>
    <tr><td><b>Left Eye</b></td><td>${rfOSSph||'0'}</td><td>${rfOSCyl||'0'}</td><td>${rfOSAx||'0°'}</td><td>${addOS||'—'}</td><td>${vaOS||'—'}</td><td>${nvOS||'—'}</td></tr>
  </tbody>
</table>` : ''}

${incPos && deptId==='oe' ? `<div class="lbl-row" style="margin:6px 0"><span class="lbl">Positive Findings:</span><span class="lbl-val">${(typeof buildOphthoPositiveFindingsList === 'function' ? buildOphthoPositiveFindingsList() : []).join(' ; ') || '—'}</span></div>` : ''}

${drugs.length ? `
<div class="sec-title">Medicine (Rx):</div>
<table>
  <thead><tr><th>#</th><th class="left">Name</th><th>Form</th><th>Route / Eye</th><th>Frequency</th><th>Duration</th><th>From</th><th>To</th></tr></thead>
  <tbody>
    ${drugs.map((d,i)=>{
      const trade = (typeof rxDrugTradeName === 'function' ? rxDrugTradeName(d) : (d.brand||d.trade||'')) || '—';
      const gen = (typeof rxDrugGenericName === 'function' ? rxDrugGenericName(d) : (d.name||d.generic||'')) || '—';
      const form = d.drugType || d.type || '—';
      const route = (d.eye && d.eye[0]) || '—';
      const plainLine = buildRxPlainInstructionLine(d, rxPlainLang, fmtIN);
      const taperRows = Array.isArray(d.taperRows) ? d.taperRows : (d.taperRow ? [d.taperRow] : []);
      let rows = `<tr>
        <td style="font-weight:700;color:#1A3C6E">${i+1}</td>
        <td class="left"><div class="rx-name">${trade}</div><div class="rx-gen">${gen}</div></td>
        <td>${form}</td>
        <td>${route}</td>
        <td>${d.freq||'—'}</td>
        <td>${d.dur||'—'}</td>
        <td>${fmtIN(d.dateFrom)}</td>
        <td>${fmtIN(d.dateTo)}</td>
      </tr>`;
      if (plainLine) {
        rows += `<tr style="background:#f7faff"><td class="left" colspan="8" style="padding-top:7px;padding-bottom:7px;font-size:11px;line-height:1.5"><div style="padding-left:8px">${escapeHtmlConsent(plainLine)}</div></td></tr>`;
      }
      taperRows.forEach((tap, tapIdx) => {
        const taperLine = buildRxPlainInstructionLine({ ...d, freq: tap.freq, dur: tap.dur, dateFrom: tap.dateFrom, dateTo: tap.dateTo, taperRows: [] }, rxPlainLang, fmtIN);
        rows += `<tr style="background:#fff8e6">
          <td style="font-weight:700;color:#8a4200">↳</td>
          <td class="left"><div class="rx-name">${trade}</div><div class="rx-gen">${rxPlainLang === 'hi' ? `धीरे कम करें ${tapIdx + 1}` : rxPlainLang === 'pa' ? `ਹੌਲੀ ਘਟਾਓ ${tapIdx + 1}` : `Taper ${tapIdx + 1}`}</div></td>
          <td>${form}</td>
          <td>${route}</td>
          <td>${rxFreqPlain(tap.freq, rxPlainLang)||'—'}</td>
          <td>${rxDurationPlain(tap.dur, rxPlainLang)||'—'}</td>
          <td>${fmtIN(tap.dateFrom)}</td>
          <td>${fmtIN(tap.dateTo)}</td>
        </tr>`;
        if (taperLine) {
          rows += `<tr style="background:#fffaf0"><td class="left" colspan="8" style="padding-top:7px;padding-bottom:7px;font-size:11px;line-height:1.5"><div style="padding-left:8px">${escapeHtmlConsent(taperLine)}</div></td></tr>`;
        }
      });
      return rows;
    }).join('')}
  </tbody>
</table>` : ''}

${advice ? `<div class="lbl-row" style="margin:6px 0"><span class="lbl">Instructions:</span><span class="lbl-val">${advice}</span></div>` : ''}

${incPrc && procs.length ? `
<div class="sec-title">Procedure / Surgery Advised:</div>
${procs.map(p=>`<div class="proc-item">&#9890; ${p}</div>`).join('')}` : ''}

${incInv && patientInvestigationOrders.length ? `
<div class="sec-title">Investigations Ordered:</div>
${patientInvestigationOrders.map(o=>`<div class="proc-item">&#9514; ${o.name}${o.notes?' — '+o.notes:''}</div>`).join('')}` : ''}

${fuFormatted ? `<div style="margin:10px 0"><span class="fu-box">&#128197; Next Visit: ${fuFormatted}</span></div>` : ''}

<div class="sig-row">
  <div class="qr-side">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(ptId)}&color=1A3C6E&bgcolor=ffffff&margin=2" alt="Patient QR" style="width:70px;height:70px;border:1px solid #ccc;border-radius:4px;display:block">
    <div class="qr-lbl">BMSH ID: ${ptId}</div>
  </div>
  <div class="dr-side">
    <div style="height:40px"></div>
    <div class="dr-name">${doctorName}</div>
    <div class="dr-deg">${doctorDegrees}</div>
    <div class="dr-spec">${doctorSpec}</div>
    ${doctorReg ? `<div class="dr-reg">Reg: ${doctorReg}</div>` : ''}
  </div>
</div>
${footerSrc ? `<div style="margin-top:18px;padding-top:12px;border-top:1px solid #ddd;text-align:center"><img src="${footerSrc}" style="max-width:100%;height:auto;display:block;margin:8px auto 0" alt="Footer"></div>` : ''}

</body></html>`;

  safePrint(html);
  showToast('Prescription sent to print preview ✓','s');
};

// ─── SETTINGS — Doctor profile edit ─────────────
function saveDoctorSettings() {
  const rows = document.querySelectorAll('.dr-settings-row');
  rows.forEach(row => {
    const name = row.dataset.doctor;
    if(!name || !DOCTOR_PROFILES[name]) return;
    const deg = row.querySelector('.dr-deg-inp')?.value;
    const reg = row.querySelector('.dr-reg-inp')?.value;
    if(deg) DOCTOR_PROFILES[name].degrees = deg;
    if(reg)  DOCTOR_PROFILES[name].reg = reg;
  });
  showToast('Doctor profiles updated ✓','s');
}

// Login disabled for testing

// ═══════════════════════════════════════
// V23 FUNCTIONS
// ═══════════════════════════════════════

// ─── TOGGLE REF DETAILS ─────────────
function toggleNpRef(val) {
  const d = document.getElementById('np-ref-name');
  if(d) d.style.display = val ? 'block' : 'none';
}
function toggleRefDetails(val) {
  const d = document.getElementById('rc-ref-detail');
  if(d) d.style.display = val && val !== '' ? 'flex' : 'none';
}
function toggleRefDetails2(val) {
  const d = document.getElementById('rc-exist-ref-detail') || document.getElementById('rc-exist-ref-wrap');
  if(d) d.style.display = val ? 'block' : 'none';
}

// ─── CHARGES SETTINGS ─────────────────
// The editable fee schedule (extends CENTRE_CHARGES)
const CHARGES_DATA = [
  {cat:'Eye',    name:'Consultation — Eye',             chd:800,  rpr:600},
  {cat:'Eye',    name:'Follow-up Consultation',          chd:500,  rpr:400},
  {cat:'Eye',    name:'Biometry IOL Master',             chd:1200, rpr:1000},
  {cat:'Eye',    name:'OCT Macula OU',                   chd:1800, rpr:1500},
  {cat:'Eye',    name:'HVF Visual Fields',               chd:1500, rpr:1200},
  {cat:'Eye',    name:'Fundus Photography',              chd:600,  rpr:500},
  {cat:'Eye',    name:'Corneal Topography',              chd:1500, rpr:1200},
  {cat:'Eye',    name:'Specular Microscopy',             chd:1200, rpr:1000},
  {cat:'Eye',    name:'ERG / VEP',                       chd:2500, rpr:2000},
  {cat:'Eye',    name:'Pre-op Package',                  chd:3500, rpr:3000},
  {cat:'Eye Sx', name:'PMICS + IOL Implantation',        chd:38000,rpr:34000},
  {cat:'Eye Sx', name:'Trabeculectomy',                  chd:42000,rpr:38000},
  {cat:'Eye Sx', name:'IVT Injection (Anti-VEGF)',       chd:8000, rpr:7000},
  {cat:'Eye Sx', name:'LASIK (per eye)',                 chd:45000,rpr:40000},
  {cat:'Eye Sx', name:'Pterygium Excision + Graft',      chd:8000, rpr:7000},
  {cat:'Eye Sx', name:'Nd:YAG Capsulotomy',              chd:3000, rpr:2500},
  {cat:'Eye Sx', name:'Laser Peripheral Iridotomy',      chd:4000, rpr:3500},
  {cat:'OBG',    name:'ANC Consultation',                chd:500,  rpr:400},
  {cat:'OBG',    name:'LSCS (Elective)',                 chd:45000,rpr:40000},
  {cat:'OBG',    name:'Normal Delivery',                 chd:25000,rpr:22000},
  {cat:'OBG',    name:'Diagnostic Laparoscopy',          chd:20000,rpr:18000},
  {cat:'Psych',  name:'Psychiatry Consultation',         chd:800,  rpr:600},
  {cat:'Psych',  name:'Psychotherapy Session',           chd:1200, rpr:1000},
  {cat:'Psych',  name:'ECT (per session)',               chd:8000, rpr:7000},
  {cat:'Skin',   name:'Dermatology Consultation',        chd:800,  rpr:600},
  {cat:'Skin',   name:'Chemical Peel',                   chd:1500, rpr:1200},
  {cat:'Skin',   name:'Microneedling',                   chd:2000, rpr:1800},
  {cat:'Skin',   name:'PRP Treatment',                   chd:3500, rpr:3000},
  {cat:'Skin',   name:'Botox Injection',                 chd:8000, rpr:7000},
  {cat:'Skin',   name:'Dermal Filler',                   chd:12000,rpr:10000},
  {cat:'Skin',   name:'Laser Hair Removal',              chd:5000, rpr:4500},
  {cat:'Lab',    name:'CBC / Complete Blood Count',      chd:400,  rpr:350},
  {cat:'Lab',    name:'HbA1c',                           chd:600,  rpr:500},
  {cat:'Lab',    name:'Lipid Profile',                   chd:700,  rpr:600},
  {cat:'Lab',    name:'Thyroid Profile (T3/T4/TSH)',     chd:800,  rpr:700},
  {cat:'Lab',    name:'Urine Routine & Microscopy',      chd:200,  rpr:180},
  {cat:'Eye Sx', name:'DCR (Lacrimal)',                  chd:52000, rpr:45000},
  {cat:'Eye Sx', name:'Squint / Strabismus Surgery',     chd:35000, rpr:30000},
  {cat:'Eye Sx', name:'Ptosis Repair',                   chd:28000, rpr:24000},
  {cat:'Eye Sx', name:'Vitrectomy (complex)',            chd:95000, rpr:82000},
  {cat:'Eye',    name:'B-Scan Ultrasonography',          chd:900,   rpr:750},
  {cat:'Eye',    name:'UBM / Anterior Segment OCT',      chd:1400,  rpr:1200},
  {cat:'OBG',    name:'Hysteroscopy',                    chd:22000, rpr:19000},
  {cat:'OBG',    name:'IUCD Removal',                    chd:2500,  rpr:2000},
  {cat:'OBG',    name:'Cervical Cerclage',               chd:18000, rpr:15000},
  {cat:'Psych',  name:'EEG',                             chd:2500,  rpr:2000},
  {cat:'Psych',  name:'Psychology Testing',              chd:3500,  rpr:3000},
  {cat:'Skin',   name:'Patch Test (Contact Dermatitis)', chd:3500,  rpr:3000},
  {cat:'Skin',   name:'Excision Biopsy (Small)',         chd:4500,  rpr:3800},
  {cat:'Lab',    name:'LFT / Liver Function',            chd:900,   rpr:750},
  {cat:'Lab',    name:'Renal Function Test',             chd:650,   rpr:550},
  {cat:'Lab',    name:'Vitamin D / B12',                 chd:1200,  rpr:1000},
];

function renderChargesList() {
  const el = document.getElementById('set-procs-list') || document.getElementById('charges-list');
  if(!el) return;
  const cats = [...new Set(CHARGES_DATA.map(c=>c.cat))];
  const canEditDept = function (cat) {
    if (CURRENT_USER?.isAdmin) return true;
    const dept = String(CURRENT_USER?.dept || '').toLowerCase();
    const c = String(cat || '').toLowerCase();
    if (dept.includes('oph') && c.includes('eye')) return true;
    if ((dept.includes('obg') || dept.includes('gyn')) && c.includes('obg')) return true;
    if (dept.includes('psych') && c.includes('psych')) return true;
    if ((dept.includes('skin') || dept.includes('derm') || dept.includes('cosmet')) && c.includes('skin')) return true;
    return false;
  };
  el.innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:center">
    <button type="button" class="btn btn-gold btn-sm" onclick="openAddChargeModal()">+ Add Procedure</button>
    <button type="button" class="btn btn-outline btn-sm" onclick="saveCharges()">💾 Save &amp; sync to cloud</button>
    <span style="font-size:11px;color:var(--g1)">Doctors can edit charges for their own departments. Use main heading + subcategory for grouped surgery packages.</span>
  </div>` + cats.map(cat => {
    const rows = CHARGES_DATA.filter(c=>c.cat===cat);
    const editable = canEditDept(cat);
    const groups = {};
    rows.forEach(function (row) {
      const key = row.parent || '__root__';
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });
    return `<div style="margin-bottom:8px">
      <div style="font-size:9.5px;font-weight:800;color:var(--bmh-blue);text-transform:uppercase;letter-spacing:.5px;padding:4px 8px;background:var(--g6);border-radius:5px;margin-bottom:4px">${cat}</div>
      ${Object.keys(groups).map(function (parentKey) {
        const childRows = groups[parentKey];
        const parentHtml = parentKey !== '__root__'
          ? `<div style="font-size:10px;font-weight:900;color:var(--tx);padding:6px 8px;background:#fff7e8;border:1px solid rgba(212,160,23,.35);border-radius:7px;margin:6px 0 4px">${parentKey}</div>`
          : '';
        return parentHtml + childRows.map((c,i)=>{
        const gIdx = CHARGES_DATA.indexOf(c);
        const disabled = editable ? '' : 'disabled';
        return `<div style="display:grid;grid-template-columns:70px 1fr 90px 90px 40px;gap:5px;padding:4px 8px;border-bottom:1px solid var(--g5);align-items:center;font-size:11.5px">
          <span class="badge bd-gray" style="font-size:9px">${c.cat}</span>
          <input type="text" value="${c.name}" style="font-size:11.5px;font-weight:600" onchange="CHARGES_DATA[${gIdx}].name=this.value" ${disabled}>
          <input type="number" value="${c.chd}" style="font-size:12px;font-weight:800;color:var(--bmh-blue);text-align:right" onchange="CHARGES_DATA[${gIdx}].chd=parseInt(this.value)" ${disabled}>
          <input type="number" value="${c.rpr}" style="font-size:12px;font-weight:800;color:#8a4200;text-align:right" onchange="CHARGES_DATA[${gIdx}].rpr=parseInt(this.value)" ${disabled}>
          ${editable ? `<button class="btn btn-xs btn-gray" onclick="CHARGES_DATA.splice(${gIdx},1);renderChargesList()">✕</button>` : '<span></span>'}
        </div>`;
      }).join(''); }).join('')}
    </div>`;
  }).join('');
}

function openAddChargeModal() {
  const deptMap = { ophtho:'Eye', obg:'OBG', psych:'Psych', skin:'Skin' };
  const catEl = document.getElementById('add-charge-cat');
  if (catEl && !CURRENT_USER?.isAdmin) catEl.value = deptMap[rxDeptKeyFromUi()] || deptMap[normalizeSurgeryPackDeptKey(CURRENT_USER?.dept)] || 'Eye';
  ['add-charge-parent','add-charge-name','add-charge-chd','add-charge-rpr'].forEach(function (id) {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  openM('m-add-proc-charge');
}
function saveChargeFromModal() {
  const cat = document.getElementById('add-charge-cat')?.value || 'Eye';
  const parent = document.getElementById('add-charge-parent')?.value?.trim() || '';
  const name = document.getElementById('add-charge-name')?.value?.trim();
  const chd = parseInt(document.getElementById('add-charge-chd')?.value || '0', 10) || 0;
  const rpr = parseInt(document.getElementById('add-charge-rpr')?.value || '0', 10) || 0;
  if (!name) { showToast('Enter charge name', 'w'); return; }
  CHARGES_DATA.push({cat, parent, name, chd, rpr});
  CENTRE_CHARGES.CHD[name] = chd;
  CENTRE_CHARGES.RPR[name] = rpr;
  renderChargesList();
  closeM('m-add-proc-charge');
  showToast('"' + name + '" added to fee schedule ✓','s');
}

function saveCharges() {
  // Sync back to CENTRE_CHARGES (used by send row)
  CHARGES_DATA.forEach(c => {
    CENTRE_CHARGES.CHD[c.name] = c.chd;
    CENTRE_CHARGES.RPR[c.name] = c.rpr;
  });
  saveChargesToFirebase();
  showToast('Charges saved & synced ✓','s');
}

function getChargeForProcedure(name, centre) {
  // Look up in CHARGES_DATA first, then fall back to CENTRE_CHARGES
  const match = CHARGES_DATA.find(c=>c.name.toLowerCase().includes(name.toLowerCase())||name.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]));
  if(match) return centre==='RPR' ? match.rpr : match.chd;
  return CENTRE_CHARGES[centre||'CHD']?.[name] || 0;
}

// ─── REFERRED BY ─────────────────
const REFERRAL_LOG = [];
function logReferral(type, name, mobile, patient) {
  if(!type || type==='') return;
  REFERRAL_LOG.push({type, name, mobile, patient, date:new Date().toLocaleDateString('en-IN'), centre:CURRENT_USER?.centre||'CHD'});
}

// ─── RENDER SETTINGS ─────────────────


// Extend nav to render charges and dr settings when settings opens


// Auto-render charges after load (local fee schedule restores without waiting for Firebase)
setTimeout(() => {
  if (typeof loadChargesFromLocalStorage === 'function') loadChargesFromLocalStorage();
  if(document.getElementById('set-procs-list') || document.getElementById('charges-list')) renderChargesList();
  if(document.getElementById('dr-credentials-list')) renderDrCredentials();
  if (typeof loadDoctorProfilesFromLocalStorage === 'function') loadDoctorProfilesFromLocalStorage();
  if (typeof loadPrintLetterheadFromStorage === 'function') loadPrintLetterheadFromStorage();
  if (typeof loadRxTemplatesFromStorage === 'function') loadRxTemplatesFromStorage();
  if (typeof loadConsentTemplatesFromStorage === 'function') loadConsentTemplatesFromStorage();
  if (typeof loadIolCatalogFromStorage === 'function') loadIolCatalogFromStorage();
}, 300);

document.addEventListener('bmh:patientsUpdated', () => {
  try {
    if (typeof genRcUID === 'function') genRcUID();
    renderReceptionPage && renderReceptionPage();
    renderDocQueue && renderDocQueue();
    renderDashboard && renderDashboard();
  } catch (e) { console.warn('bmh:patientsUpdated', e); }
});

document.addEventListener('bmh:transactionsUpdated', () => {
  try {
    renderDashboard && renderDashboard();
    renderCollectionDashboard && renderCollectionDashboard();
  } catch (e) { console.warn('bmh:transactionsUpdated', e); }
});

function updateRcDr() {
  const d = document.getElementById('rc-dept')?.value || 'ophtho';
  const s = document.getElementById('rc-dr');
  if(!s) return;
  s.innerHTML = '<option value="">— Select Doctor —</option>' +
    (DOCTORS[d]||['Dr. Varun Baweja']).map(x=>'<option value="'+x+'">'+x+'</option>').join('');
}
function updatePurposeOptions() {
  const d=document.getElementById('rc-dept')?.value;
  const purp=document.getElementById('rc-purpose');
  if(!purp) return;
  const eye=['New Consultation','Follow-up','Cataract Surgery','Glaucoma Review','Post-op','Retina Check','IVT Injection','Laser Treatment','Glasses','Emergency','Surgery','Need to Check In'];
  const obg=['New Consultation','Follow-up','ANC Visit','LSCS','Normal Delivery','Scan','Emergency','Surgery','Need to Check In'];
  const psych=['New Consultation','Follow-up','Therapy Session','ECT','Emergency','Surgery','Need to Check In'];
  const skin=['New Consultation','Follow-up','Chemical Peel','PRP','Laser','Botox','Emergency','Surgery','Need to Check In'];
  const opts={ophtho:eye,obg:obg,psych:psych,skin:skin};
  purp.innerHTML=(opts[d]||eye).map(o=>`<option>${o}</option>`).join('');
  // Re-append any saved custom purposes so they survive dept changes
  (window.CUSTOM_PURPOSES||[]).forEach(v=>{
    if(![...purp.options].some(o=>o.textContent===v)){
      const opt=document.createElement('option'); opt.textContent=v; purp.appendChild(opt);
    }
  });
  checkSurgeryPurpose && checkSurgeryPurpose();
}

// ═══════════════════════════════════════
// V32: COLLECTION DASHBOARD
// ═══════════════════════════════════════

// TRANSACTIONS declared at top of DATA section

const DEPT_COLORS = {
  ophtho:{label:'👁️ Ophthalmology',bg:'var(--blue-lt)',border:'var(--blue)',text:'var(--blue)'},
  obg:{label:'🤰 OBG',bg:'var(--purple-lt)',border:'var(--purple)',text:'var(--purple)'},
  psych:{label:'🧠 Neuropsychiatry',bg:'var(--orange-lt)',border:'var(--orange)',text:'var(--orange)'},
  skin:{label:'💆 Skin',bg:'var(--green-lt)',border:'var(--green)',text:'var(--green)'},
};

function renderCollectionDashboard() {
  const allTxn = TRANSACTIONS.filter(t => (t.centre || 'CHD') === getEffectiveCentre());
  const collected = allTxn.filter(t=>t.collected);

  // Update summary cards
  const total = collected.reduce((s,t)=>s+t.amount,0);
  const cash  = collected.filter(t=>t.mode==='Cash').reduce((s,t)=>s+t.amount,0);
  const upi   = collected.filter(t=>t.mode!=='Cash').reduce((s,t)=>s+t.amount,0);
  const pending = allTxn.filter(t=>!t.collected).reduce((s,t)=>s+t.amount,0);

  const fmt = n => '₹'+n.toLocaleString('en-IN');
  const setEl = (id,v) => { const e=document.getElementById(id); if(e) e.textContent=v; };
  setEl('rc-total-collected', fmt(total));
  setEl('rc-total-txn', collected.length+' transactions');
  setEl('rc-cash-total', fmt(cash));
  setEl('rc-upi-total', fmt(upi));
  setEl('rc-upi-total2', fmt(upi));
  setEl('rc-pending-total', fmt(pending));
  setEl('rc-pending-total2', fmt(pending));
  setEl('rc-ins-total', fmt(collected.filter(t=>t.mode==='Insurance').reduce((s,t)=>s+t.amount,0)));

  // Dept breakdown
  const deptEl = document.getElementById('rc-dept-collection');
  if(deptEl) {
    const depts = ['ophtho','obg','psych','skin'];
    deptEl.innerHTML = depts.map(dept => {
      const dTxn = collected.filter(t=>t.dept===dept);
      const dPending = allTxn.filter(t=>!t.collected&&t.dept===dept);
      const dTotal = dTxn.reduce((s,t)=>s+t.amount,0);
      const dPendAmt = dPending.reduce((s,t)=>s+t.amount,0);
      const dc = DEPT_COLORS[dept];
      const did = 'dept-txn-'+dept;
      if(!dTxn.length && !dPending.length) return '';
      return `<div style="border:1.5px solid ${dc.border};border-radius:var(--r);overflow:hidden;background:#fff">
        <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:${dc.bg};cursor:pointer" onclick="toggleDeptDetail('${did}')">
          <div style="flex:1">
            <div style="font-size:13px;font-weight:800;color:${dc.text}">${dc.label}</div>
            <div style="font-size:10.5px;color:var(--g1);margin-top:2px">${dTxn.length} collected · ${dPending.length} pending</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:18px;font-weight:900;color:${dc.text}">${fmt(dTotal)}</div>
            ${dPendAmt>0?`<div style="font-size:10.5px;color:var(--orange);font-weight:700">+ ${fmt(dPendAmt)} pending</div>`:''}
          </div>
          <div id="chev-${did}" style="font-size:16px;color:${dc.text}">⌄</div>
        </div>
        <div id="${did}" style="display:none;padding:8px 12px">
          ${dTxn.length ? dTxn.map(t=>`
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--g5);font-size:12px">
              <div style="flex:1"><div style="font-weight:700;display:flex;align-items:center;gap:6px;flex-wrap:wrap">${t.patient}${t.type==='advance' ? '<span class="badge" style="font-size:8px;background:var(--blue-lt);color:var(--blue);border:1px solid var(--blue)">Advance</span>' : ''}</div><div style="font-size:10.5px;color:var(--g1)">${t.service||'—'} · ${t.time||'—'}</div></div>
              <span class="badge bd-gray" style="font-size:9.5px">${t.mode||'—'}</span>
              <div style="font-weight:800;color:#1a8c3c">${fmt(t.amount)}</div>
              <button title="Delete" onclick="deleteTransaction('${t.id}')" style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--red);padding:0 2px">🗑️</button>
            </div>`).join('') : '<div style="padding:8px;color:var(--g1);font-size:11.5px">No collected payments yet</div>'}
          ${dPending.length ? `<div style="margin-top:6px;font-size:10px;font-weight:800;color:var(--orange);text-transform:uppercase">Pending (${dPending.length}):</div>`+dPending.map(t=>`
            <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--g5);font-size:12px;opacity:.75">
              <div style="flex:1"><div style="font-weight:700">${t.patient}</div><div style="font-size:10.5px;color:var(--g1)">${t.service||'—'}</div></div>
              <span class="badge bd-orange" style="font-size:9.5px">Pending</span>
              <div style="font-weight:800;color:var(--orange)">${fmt(t.amount)}</div>
              <button title="Delete" onclick="deleteTransaction('${t.id}')" style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--red);padding:0 2px">🗑️</button>
            </div>`).join('') : ''}
        </div>
      </div>`;
    }).join('');
  }

  // All transactions
  const allEl = document.getElementById('rc-all-txn');
  if(allEl) {
    allEl.innerHTML = allTxn.length ? allTxn.slice().reverse().map(t=>`
      <div style="display:flex;align-items:center;gap:9px;padding:8px 12px;background:${t.collected?'#fff':'var(--orange-lt)'};border-radius:var(--rsm);border:1px solid ${t.collected?'var(--g5)':'rgba(255,149,0,.3)'}">
        <div style="font-size:16px">${DEPT_COLORS[t.dept]?.label?.split(' ')[0]||'🏥'}</div>
        <div style="flex:1">
          <div style="font-size:12.5px;font-weight:700;display:flex;align-items:center;gap:6px;flex-wrap:wrap">${t.patient}${t.type==='advance' ? '<span class="badge" style="font-size:8px;background:var(--blue-lt);color:var(--blue)">Advance</span>' : ''} <span style="font-family:monospace;font-size:10px;color:var(--bmh-teal)">${t.bmhId||''}</span></div>
          <div style="font-size:11px;color:var(--g1)">${t.service||'—'} · ${t.time||'—'}</div>
        </div>
        <span class="badge bd-gray" style="font-size:9.5px">${t.mode||'—'}</span>
        <div style="font-weight:900;color:${t.collected?'#1a8c3c':'var(--orange)'};font-size:13px">₹${t.amount.toLocaleString('en-IN')}</div>
        <span class="badge ${t.collected?'bd-green':'bd-orange'}" style="font-size:9.5px">${t.collected?'✅':'⏳'}</span>
        <button title="Delete this transaction" onclick="deleteTransaction('${t.id}')" style="background:var(--red-lt);color:var(--red);border:1px solid rgba(255,59,48,.3);border-radius:5px;padding:2px 6px;font-size:11px;cursor:pointer;flex-shrink:0">🗑️</button>
      </div>`).join('')
    : '<div style="padding:16px;text-align:center;color:var(--g1);font-size:12px">No transactions today</div>';
  }
}

function toggleDeptDetail(id) {
  const el = document.getElementById(id);
  const ch = document.getElementById('chev-'+id);
  if(!el) return;
  const open = el.style.display!=='none';
  el.style.display = open?'none':'block';
  if(ch) ch.textContent = open?'⌄':'⌃';
}

function printDayCollection() {
  const today = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  const collected = TRANSACTIONS.filter(t=>t.collected);
  const total = collected.reduce((s,t)=>s+t.amount,0);
  const fmt = n=>'₹'+n.toLocaleString('en-IN');
  const lhSrc = window.LH_SRC||'';

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Lato',Arial,sans-serif;font-size:11.5px;padding:10mm 14mm}
@page{size:A4 portrait;margin:0}
table{width:100%;border-collapse:collapse}th{background:#1A3C6E;color:#fff;padding:6px 9px;font-size:10px;text-transform:uppercase;letter-spacing:.5px}
td{border:1px solid #ddd;padding:6px 9px}tr:nth-child(even){background:#f8f9fc}
.total-row{background:#EBF3FF!important;font-weight:900;font-size:13px}
</style></head><body>
${lhSrc?`<img src="${lhSrc}" style="width:100%;height:auto;margin-bottom:12px">`:''}
<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;border-bottom:2px solid #1A3C6E;padding-bottom:8px">
  <div style="font-size:18px;font-weight:900;color:#1A3C6E">Daily Collection Summary</div>
  <div style="font-size:12px;color:#555">${today}</div>
</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">
  <div style="background:#EBF3FF;border-radius:6px;padding:10px;text-align:center"><div style="font-size:8.5px;font-weight:700;color:#666;text-transform:uppercase;margin-bottom:4px">Total</div><div style="font-size:20px;font-weight:900;color:#1A3C6E">${fmt(total)}</div></div>
  <div style="background:#EBF3FF;border-radius:6px;padding:10px;text-align:center"><div style="font-size:8.5px;font-weight:700;color:#666;text-transform:uppercase;margin-bottom:4px">Cash</div><div style="font-size:20px;font-weight:900;color:#1a8c3c">${fmt(collected.filter(t=>t.mode==='Cash').reduce((s,t)=>s+t.amount,0))}</div></div>
  <div style="background:#EBF3FF;border-radius:6px;padding:10px;text-align:center"><div style="font-size:8.5px;font-weight:700;color:#666;text-transform:uppercase;margin-bottom:4px">UPI/Card</div><div style="font-size:20px;font-weight:900;color:#1A3C6E">${fmt(collected.filter(t=>t.mode!=='Cash').reduce((s,t)=>s+t.amount,0))}</div></div>
  <div style="background:#EBF3FF;border-radius:6px;padding:10px;text-align:center"><div style="font-size:8.5px;font-weight:700;color:#666;text-transform:uppercase;margin-bottom:4px">Transactions</div><div style="font-size:20px;font-weight:900;color:#1A3C6E">${collected.length}</div></div>
</div>
<table>
  <thead><tr><th>#</th><th>Time</th><th>Patient</th><th>BMSH ID</th><th>Department</th><th>Service</th><th>Mode</th><th>Amount</th></tr></thead>
  <tbody>
    ${collected.map((t,i)=>`<tr><td>${i+1}</td><td>${t.time}</td><td style="font-weight:700">${t.patient}</td><td style="font-family:monospace;font-size:10px">${t.bmhId}</td><td>${{ophtho:'Ophthalmology',obg:'OBG',psych:'Psychiatry',skin:'Skin'}[t.dept]||t.dept}</td><td>${t.service}</td><td>${t.mode}</td><td style="font-weight:700;text-align:right">${fmt(t.amount)}</td></tr>`).join('')}
    <tr class="total-row"><td colspan="7" style="text-align:right;border:1px solid #1A3C6E">TOTAL COLLECTED</td><td style="text-align:right;border:1px solid #1A3C6E">${fmt(total)}</td></tr>
  </tbody>
</table>
<div style="margin-top:24px;display:flex;justify-content:space-between">
  <div><div style="border-bottom:1px solid #333;width:160px;margin-bottom:4px"></div><div style="font-size:10px;color:#888">Cashier / Receptionist</div></div>
  <div style="text-align:right"><div style="border-bottom:1px solid #333;width:160px;margin-bottom:4px"></div><div style="font-size:10px;color:#888">Supervisor / In-charge</div></div>
</div>
</body></html>`;
  safePrint(html);
  showToast('Collection summary sent to printer ✓','s');
}

// collectPayment delegates to markPaid — no override needed here

// Extend nav to render dashboard when charges tab opens


// Also render when ptab clicks rc-charges
document.addEventListener('click', function(e) {
  if(e.target.textContent && e.target.textContent.includes('Collection') && e.target.classList.contains('ptab')) {
    setTimeout(renderCollectionDashboard, 50);
  }
});
setTimeout(renderCollectionDashboard, 500);

// ═══════════════════════════════════════════════════════════
// FIREBASE DATA LAYER
// ═══════════════════════════════════════════════════════════

// ── PATIENTS ─────────────────────────────────────────────────
function savePatientToFirebase(patient) {
  if(!patient || !patient.bmhId) return;
  const centre = (CURRENT_USER?.centre==='RPR' || patient.centre==='RPR') ? 'RPR' : 'CHD';
  const payload = {
    ...patient,
    centre,
    lastUpdated: new Date().toISOString(),
    updatedBy: CURRENT_USER?.name || 'System'
  };
  const rt = fbSet(`patients/${patient.bmhId}`, payload);
  const fs = typeof window.upsertPatientFirestore === 'function'
    ? window.upsertPatientFirestore(payload).catch(err => { console.warn('Firestore patient sync:', err); })
    : Promise.resolve();
  return Promise.all([rt, fs]).then(() => showToast('Patient saved to database ✓', 's'))
    .catch(e => showToast('Save failed: ' + e.message, 'w'));
}

let _fbPatientsLoaded = false;
let _renderDashTimer = null;
function _debouncedRenderDash() {
  if(_renderDashTimer) clearTimeout(_renderDashTimer);
  _renderDashTimer = setTimeout(() => {
    const active = document.querySelector('.page.active');
    if(active && (active.id==='pg-dashboard' || active.id==='pg-reception' || active.id==='pg-doctor-queue')) {
      renderDashboard && renderDashboard();
      renderReceptionPage && renderReceptionPage();
      renderDocQueue && renderDocQueue();
    }
  }, 300);
}

function loadPatientsFromFirebase() {
  if(window._bmhRtdbPatientsListening) return;
  window._bmhRtdbPatientsListening = true;
  const cu = (typeof CURRENT_USER !== 'undefined' && CURRENT_USER) || window.CURRENT_USER;
  const centre = cu?.centre;
  const isAdmin = cu?.isAdmin || cu?.canSeeAllCentres || cu?.role === 'admin';
  fbOn('patients', data => {
    const all = data ? Object.values(data) : [];
    if(isAdmin || cu?.canSeeAllCentres) {
      PATIENTS.length = 0;
      all.forEach(p => PATIENTS.push(p));
    } else {
      PATIENTS.length = 0;
      all.forEach(p => {
        const pc = p.centre || 'CHD';
        if(!centre || pc === centre) PATIENTS.push(p);
      });
    }
    if(!_fbPatientsLoaded) {
      _fbPatientsLoaded = true;
      showToast('Connected to database ✓','s');
    }
    genRcUID && genRcUID();
    _debouncedRenderDash();
  });
}

// ── PAY REQUESTS (real-time sync) ────────────────────────────
function savePayRequestToFirebase(pr) {
  fbSet(`payRequests/${pr.id}`, {
    ...pr,
    date: new Date().toISOString(),
    centre: CURRENT_USER?.centre || 'CHD'
  });
}

function listenPayRequests() {
  const centre = CURRENT_USER?.isAdmin ? null : (CURRENT_USER?.centre || 'CHD');
  fbOn('payRequests', data => {
    if(!data) return;
    PAY_REQUESTS.length = 0;
    Object.values(data).forEach(r => {
      if(!centre || r.centre === centre || CURRENT_USER?.isAdmin) PAY_REQUESTS.push(r);
    });
    renderReceptionPage && renderReceptionPage();
    // Update badge
    const nb = document.getElementById('nb-pay');
    if(nb) nb.textContent = PAY_REQUESTS.filter(r=>r.status==='pending').length;
  });
}

// ── APPOINTMENTS ─────────────────────────────────────────────
function saveAppointmentToFirebase(apt) {
  const key = apt.id || fbKey();
  fbSet(`appointments/${key}`, { ...apt, id: key });
}

function listenAppointments() {
  fbOn('appointments', data => {
    if(!data) return;
    APPOINTMENTS.length = 0;
    Object.values(data).forEach(a => APPOINTMENTS.push(a));
    renderAptDay && renderAptDay();
  });
}

// ── TRANSACTIONS / COLLECTIONS ───────────────────────────────
function saveTransactionToFirebase(txn) {
  const key = txn.id || fbKey();
  fbSet(`transactions/${todayKey()}/${key}`, { ...txn, id: key });
}

function deleteTransaction(txnId) {
  const t = TRANSACTIONS.find(x=>x.id===txnId);
  if(!t) { showToast('Transaction not found','w'); return; }
  const label = `₹${t.amount?.toLocaleString('en-IN')||'?'} — ${t.patient||'?'} (${t.service||'—'}, ${t.mode||'—'})`;
  if(CURRENT_USER?.isAdmin) {
    if(!confirm(`Delete this transaction?\n${label}\nThis cannot be undone.`)) return;
    const idx = TRANSACTIONS.findIndex(x=>x.id===txnId);
    TRANSACTIONS.splice(idx,1);
    try { if(window.firebase&&firebase.database) firebase.database().ref(`transactions/${todayKey()}/${txnId}`).remove(); } catch(e){}
    fbPush&&fbPush('auditLog',{user:CURRENT_USER.name,role:'Admin',action:'DELETE_TXN',item:label,timestamp:new Date().toISOString()});
    showToast(`🗑️ Deleted: ${label}`,'i');
    renderCollectionDashboard&&renderCollectionDashboard(); renderReceptionPage&&renderReceptionPage();
  } else {
    requestDeletion('transaction', txnId, label);
  }
}

// ══════════════════════════════════════════════════════════════
// DELETION APPROVAL SYSTEM — non-admins request, admins approve
// ══════════════════════════════════════════════════════════════
window.PENDING_DELETE_REQUESTS = window.PENDING_DELETE_REQUESTS || [];

function requestDeletion(type, itemId, label) {
  window._delReqType  = type;
  window._delReqId    = itemId;
  window._delReqLabel = label;
  const lbl = document.getElementById('del-req-item-label');
  if(lbl) lbl.textContent = label;
  const inp = document.getElementById('del-req-reason'); if(inp) inp.value='';
  openM('m-delete-req');
}

function submitDeleteRequest() {
  const reason = document.getElementById('del-req-reason')?.value?.trim();
  if(!reason) { showToast('Please enter a reason for deletion','w'); return; }
  const reqId = 'DELREQ'+Date.now();
  const req = {
    id: reqId,
    type: window._delReqType,
    itemId: window._delReqId,
    label: window._delReqLabel,
    reason,
    requestedBy: CURRENT_USER?.name||'Reception',
    requestedByRole: CURRENT_USER?.role||'Reception',
    centre: CURRENT_USER?.centre||'CHD',
    requestedAt: new Date().toISOString(),
    status: 'pending'
  };
  PENDING_DELETE_REQUESTS.push(req);
  fbSet && fbSet('deletionRequests/'+reqId, req);
  fbPush && fbPush('auditLog',{user:req.requestedBy, role:req.requestedByRole, action:'DELETE_REQUESTED', item:req.label, reason, timestamp:req.requestedAt});
  showToast('🔔 Deletion request sent to admin for approval','i');
  closeM('m-delete-req');
}

// ── Advice Templates ──────────────────────────────────────────────────────────
window.ADVICE_TEMPLATES = window.ADVICE_TEMPLATES || [];
function toggleAdvChip(el) {
  const active = el.classList.toggle('active');
  if(active) { el.style.background='var(--orange)'; el.style.color='#fff'; el.style.borderColor='var(--orange)'; }
  else { el.style.background='var(--g5)'; el.style.color=''; el.style.borderColor='var(--g4)'; }
  // Update advice textarea with all active chips
  const chips = [...document.querySelectorAll('#adv-chips .adv-chip.active')].map(c=>c.textContent.trim());
  const ta = document.getElementById('rx-advice-text');
  if(ta) {
    const existing = ta.value.split('\n').filter(l=>!document.querySelectorAll('#adv-chips .adv-chip').length||true);
    // Only prepend chip lines
    const manualText = ta.value.replace(/^• .+(\n|$)/gm,'').trim();
    ta.value = chips.map(c=>'• '+c).join('\n') + (manualText ? '\n'+manualText : '');
  }
}
function openSaveAdviceTemplate() {
  const ta = document.getElementById('rx-advice-text');
  const text = ta?.value?.trim(); if(!text) { showToast('Nothing to save — type advice first','w'); return; }
  const name = prompt('Template name (e.g. "Post-cataract advice"):'); if(!name) return;
  const tpl = {id:'adv_'+Date.now(), name, text};
  window.ADVICE_TEMPLATES.push(tpl);
  fbSet && fbSet('adviceTemplates/'+tpl.id, tpl);
  showToast(`✅ Template "${name}" saved`,'s');
}
function openLoadAdviceTemplate() {
  if(!window.ADVICE_TEMPLATES.length) {
    // Try loading from Firebase first
    fbOnce && fbOnce('adviceTemplates').then(data=>{
      if(!data) { showToast('No saved templates yet','i'); return; }
      window.ADVICE_TEMPLATES = Object.values(data);
      _showAdviceTemplatePicker();
    }).catch(()=>showToast('No saved templates','i'));
  } else { _showAdviceTemplatePicker(); }
}
function _showAdviceTemplatePicker() {
  const tpls = window.ADVICE_TEMPLATES;
  if(!tpls.length) { showToast('No saved templates','i'); return; }
  const names = tpls.map((t,i)=>`${i+1}. ${t.name}`).join('\n');
  const choice = prompt(`Select template number:\n${names}`);
  const idx = parseInt(choice)-1;
  if(isNaN(idx)||idx<0||idx>=tpls.length) return;
  const ta = document.getElementById('rx-advice-text');
  if(ta) ta.value = tpls[idx].text;
  showToast(`📋 "${tpls[idx].name}" loaded`,'s');
}
// Load advice templates on login
function loadAdviceTemplates() {
  if(!window.fbOnce) return;
  fbOnce('adviceTemplates').then(data=>{
    if(data) window.ADVICE_TEMPLATES = Object.values(data);
  }).catch(()=>{});
}

// ── Load OT Cases from Firebase on login ─────────────────────────────────────
function loadOTCasesFromFirebase() {
  if(!window.FBDB) return;
  window.FBDB.ref('otCases').once('value').then(snap => {
    const data = snap.val();
    if(!data) return;
    const arr = window.OT_CASES || OT_CASES;
    arr.length = 0; // clear first to avoid duplicates on reload
    Object.values(data).forEach(c => arr.push(normalizeOTCaseRecord(c)));
    renderOTListSafe && renderOTListSafe();
  }).catch(e => console.warn('OT load error:', e));
}
// ── Load IPD Patients from Firebase on login ──────────────────────────────────
function loadIPDPatientsFromFirebase() {
  if(!window.FBDB) return;
  window.FBDB.ref('ipdPatients').once('value').then(snap => {
    const data = snap.val();
    if(!data) return;
    const arr = window.IPD_PATIENTS || IPD_PATIENTS;
    Object.values(data).forEach(p => { if(!arr.find(x=>x.id===p.id||x.bmhId===p.bmhId)) arr.push(p); });
    renderIPD && renderIPD();
  }).catch(e => console.warn('IPD load error:', e));
}

function loadDeletionRequests() {
  if(!window.fbOnce || !CURRENT_USER?.isAdmin) return;
  fbOnce('deletionRequests').then(data=>{
    if(!data) { updateDelReqBadge(); return; }
    window.PENDING_DELETE_REQUESTS = Object.values(data).filter(r=>r.status==='pending');
    updateDelReqBadge();
    renderDeletionRequests();
  }).catch(()=>{});
}

function updateDelReqBadge() {
  const cnt = (window.PENDING_DELETE_REQUESTS||[]).filter(r=>r.status==='pending').length;
  const badge = document.getElementById('del-req-count'); if(badge) { badge.textContent=cnt; badge.style.display=cnt>0?'inline-flex':'none'; }
}

function renderDeletionRequests() {
  const el = document.getElementById('set-del-req-list'); if(!el) return;
  const pending = (window.PENDING_DELETE_REQUESTS||[]).filter(r=>r.status==='pending');
  if(!pending.length) { el.innerHTML='<div style="padding:24px;text-align:center;color:var(--g1);font-size:13px">✅ No pending deletion requests</div>'; return; }
  el.innerHTML = pending.map(r=>`
    <div style="border:1.5px solid rgba(255,59,48,.3);border-radius:var(--r);overflow:hidden;margin-bottom:10px;background:#fff">
      <div style="background:rgba(255,59,48,.06);padding:10px 14px;border-bottom:1px solid rgba(255,59,48,.15)">
        <div style="font-size:12px;font-weight:900;color:var(--red)">${r.type==='transaction'?'💳 Transaction':'⚠️ Charge'} Deletion Request</div>
        <div style="font-size:10.5px;color:var(--g1);margin-top:2px">${new Date(r.requestedAt).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</div>
      </div>
      <div style="padding:10px 14px">
        <div style="font-size:12.5px;font-weight:800;margin-bottom:4px">${r.label||r.itemId}</div>
        <div style="font-size:11.5px;color:var(--g1);margin-bottom:8px">Requested by: <strong>${r.requestedBy}</strong> · ${r.requestedByRole} · ${r.centre}</div>
        <div style="background:var(--orange-lt);border-left:3px solid var(--orange);border-radius:0 6px 6px 0;padding:7px 10px;font-size:12px;margin-bottom:10px"><span style="font-weight:800;color:#8a4200">Reason:</span> ${r.reason}</div>
        <div style="display:flex;gap:8px">
          <button onclick="approveDeleteRequest('${r.id}')" style="flex:1;background:var(--green);color:#fff;border:none;border-radius:6px;padding:8px 12px;font-size:12px;font-weight:800;cursor:pointer">✅ Approve &amp; Delete</button>
          <button onclick="rejectDeleteRequest('${r.id}')" style="flex:1;background:var(--g4);color:var(--tx1);border:none;border-radius:6px;padding:8px 12px;font-size:12px;font-weight:800;cursor:pointer">❌ Reject</button>
        </div>
      </div>
    </div>`).join('');
}

function approveDeleteRequest(reqId) {
  const req = (window.PENDING_DELETE_REQUESTS||[]).find(r=>r.id===reqId);
  if(!req) return;
  if(!confirm(`Approve deletion?\n"${req.label}"\nRequested by: ${req.requestedBy}\nReason: ${req.reason}\n\nThis will permanently delete the record.`)) return;

  if(req.type==='transaction') {
    const idx=TRANSACTIONS.findIndex(t=>t.id===req.itemId);
    if(idx>-1){ TRANSACTIONS.splice(idx,1); try{ if(window.firebase&&firebase.database) firebase.database().ref(`transactions/${todayKey()}/${req.itemId}`).remove(); }catch(e){} }
  } else if(req.type==='payRequest') {
    const idx=PAY_REQUESTS.findIndex(r=>r.id===req.itemId);
    if(idx>-1){ PAY_REQUESTS.splice(idx,1); try{ if(window.firebase&&firebase.database) firebase.database().ref('payRequests/'+req.itemId).remove(); }catch(e){} }
  } else if(req.type==='patientCharges') {
    PAY_REQUESTS.filter(r=>r.bmhId===req.itemId&&r.status==='pending').forEach(r=>{
      const i=PAY_REQUESTS.indexOf(r); if(i>-1) PAY_REQUESTS.splice(i,1);
      try{ if(window.firebase&&firebase.database) firebase.database().ref('payRequests/'+r.id).remove(); }catch(e){}
    });
  }

  req.status='approved'; req.approvedBy=CURRENT_USER?.name||'Admin'; req.approvedAt=new Date().toISOString();
  fbUpdate&&fbUpdate('deletionRequests/'+reqId,{status:'approved',approvedBy:req.approvedBy,approvedAt:req.approvedAt});
  fbPush&&fbPush('auditLog',{user:CURRENT_USER?.name,role:'Admin',action:'DELETE_APPROVED',item:req.label,reason:req.reason,requestedBy:req.requestedBy,timestamp:req.approvedAt});

  const pi=PENDING_DELETE_REQUESTS.indexOf(req); if(pi>-1) PENDING_DELETE_REQUESTS.splice(pi,1);
  showToast('✅ Deletion approved — record permanently removed','s');
  renderDeletionRequests(); updateDelReqBadge();
  renderCollectionDashboard&&renderCollectionDashboard(); renderReceptionPage&&renderReceptionPage();
}

function rejectDeleteRequest(reqId) {
  const req=(window.PENDING_DELETE_REQUESTS||[]).find(r=>r.id===reqId);
  if(!req) return;
  const note = prompt('Reason for rejection (shown in audit log):','Rejected by admin')||'Rejected by admin';
  req.status='rejected'; req.rejectedBy=CURRENT_USER?.name||'Admin'; req.rejectedAt=new Date().toISOString(); req.rejectionNote=note;
  fbUpdate&&fbUpdate('deletionRequests/'+reqId,{status:'rejected',rejectedBy:req.rejectedBy,rejectedAt:req.rejectedAt,rejectionNote:note});
  fbPush&&fbPush('auditLog',{user:CURRENT_USER?.name,role:'Admin',action:'DELETE_REJECTED',item:req.label,reason:req.reason,requestedBy:req.requestedBy,rejectionNote:note,timestamp:req.rejectedAt});
  const pi=PENDING_DELETE_REQUESTS.indexOf(req); if(pi>-1) PENDING_DELETE_REQUESTS.splice(pi,1);
  showToast('❌ Deletion request rejected','i');
  renderDeletionRequests(); updateDelReqBadge();
}

function loadTodayTransactions() {
  fbOnce(`transactions/${todayKey()}`, data => {
    if(!data) return;
    TRANSACTIONS.length = 0;
    Object.values(data).forEach(t => TRANSACTIONS.push(t));
    renderCollectionDashboard && renderCollectionDashboard();
  });
}

// ── LAB ORDERS ───────────────────────────────────────────────
function saveLabOrderToFirebase(order) {
  fbSet(`labOrders/${order.id}`, order);
}

function listenLabOrders() {
  fbOn('labOrders', data => {
    if(!data) return;
    LAB_ORDERS.length = 0;
    Object.values(data).forEach(o => LAB_ORDERS.push(o));
    renderLabOrders && renderLabOrders();
  });
}

// ── PRESCRIPTIONS ─────────────────────────────────────────────
function savePrescriptionToFirebase(bmhId, rxData) {
  const key = fbKey();
  fbSet(`prescriptions/${bmhId}/${key}`, {
    ...rxData,
    date: new Date().toISOString(),
    doctor: CURRENT_USER?.name,
    centre: CURRENT_USER?.centre
  }).then(() => showToast('Prescription saved ✓','s'));
}

// ── INVENTORY ─────────────────────────────────────────────────
function saveInventoryItemToFirebase(item) {
  fbSet(`inventory/${item.barcode}`, item);
}

function loadInventoryFromFirebase() {
  fbOnce('inventory', data => {
    if(!data) return;
    INVENTORY.length = 0;
    Object.values(data).forEach(i => INVENTORY.push(i));
  });
}

// ══════════════════════════════════════════════════════════════
// AUTO-SAVE HOOKS — patch existing functions
// ══════════════════════════════════════════════════════════════

// Patch registerPatient to save to Firebase
const _origRegPt = window.regPt || function(){};
window.regPt = function() {
  _origRegPt();
  // Build patient object from form
  const bmhId = document.getElementById('rc-uid')?.textContent || 'BMSH-'+Math.floor(Math.random()*900000+100000);
  const patient = {
    bmhId,
    name: (document.getElementById('rc-fn')?.value||'') + ' ' + (document.getElementById('rc-ln')?.value||''),
    age:  document.getElementById('rc-age')?.value || '',
    sex:  document.querySelector('#m-np select[name]')?.value || 'Male',
    mob:  document.querySelector('#m-np input[type=tel]')?.value || '',
    dept: document.getElementById('np-dept')?.value || 'ophtho',
    doctor: document.getElementById('np-dr')?.value || '',
    centre: CURRENT_USER?.centre || 'CHD',
    status: 'waiting',
    balance: 0,
    advance: 0,
    seen: false,
    createdAt: new Date().toISOString(),
    createdBy: CURRENT_USER?.name || 'Reception'
  };
  if(patient.name.trim()) savePatientToFirebase(patient);
};

// collectPayment delegates to markPaid which saves to Firebase


function toggleCVBlindness(eye, checked) {
  const el = document.getElementById('cv-type-' + eye);
  if(el) el.style.display = checked ? 'block' : 'none';
}
function closePrintPreview() {
  const el = document.getElementById('bmh-print-preview');
  if(el) el.remove();
}



// ════════════════════════════════════════════════════════════════
// DISCHARGE BROCHURE — per-specialty editable template
// ════════════════════════════════════════════════════════════════

const DISCHARGE_TEMPLATES = {
  ophtho: {
    label:'👁️ Ophthalmology / Cataract', color:'#1A3C6E',
    surgeryLabel:'PMICS + IOL (Cataract Surgery)',
    instructions:[
      'Do NOT rub the operated eye under any circumstances',
      'Wear dark glasses outdoors for 4 weeks — protect from dust & wind',
      'Avoid bending forward, lifting >5 kg, or straining for 2 weeks',
      'Do NOT let water enter the eye while bathing for 2 weeks — use a dry cloth',
      'Sleep on the non-operated side. Avoid sleeping face-down',
      'Do not apply any kajal, surma, or eye makeup for 1 month',
      'If you notice sudden severe pain, redness, or loss of vision — come immediately',
      'Attend all follow-up appointments even if vision feels good',
    ],
    medicines:[
      { name:'Moxifloxacin 0.5% Eye Drops (Vigamox / Zymar)', freq:'3 times/day  —  8am · 2pm · 8pm', duration:'7 days', note:'Antibiotic — prevent infection, continue full course', local:'ਅੱਖ ਵਿੱਚ ਇਨਫੈਕਸ਼ਨ ਤੋਂ ਬਚਾਓ / संक्रमण से बचाव', times:['8am','2pm','8pm'] },
      { name:'Prednisolone Acetate 1% Eye Drops (Pred Forte)', freq:'Week 1: 4x/day → Week 2: 3x → Week 3: 2x → Week 4: 1x', duration:'4 weeks (taper)', note:'Anti-inflammatory — MUST taper as shown, do not stop abruptly', local:'ਹੌਲੀ ਹੌਲੀ ਘਟਾਓ, ਅਚਾਨਕ ਬੰਦ ਨਾ ਕਰੋ / धीरे-धीरे कम करें', times:['6am','12pm','6pm','10pm'] },
      { name:'Ketorolac 0.5% / Bromfenac Eye Drops (Acular / Yellox)', freq:'2 times/day  —  9am · 9pm', duration:'4 weeks', note:'Anti-inflammatory (NSAID) — reduces swelling', local:'ਸੋਜ ਘਟਾਉਣ ਲਈ / सूजन कम करने के लिए', times:['9am','9pm'] },
      { name:'Carboxymethylcellulose 0.5% (Refresh Tears / Genteal)', freq:'Every 2–4 hours as needed', duration:'Ongoing', note:'Lubricant — use whenever eye feels dry or irritated', local:'ਖੁਸ਼ਕੀ ਮਹਿਸੂਸ ਹੋਣ ਤੇ / जब सूखापन महसूस हो', times:[] },
    ],
    followup:['Day 1 review (next morning)', '1 Week — wound check & IOP', '1 Month — glasses prescription', '3 Months — final visual assessment'],
  },
  obg: {
    label:'🤰 OBG / LSCS', color:'#FF2D55',
    surgeryLabel:'Lower Segment Caesarean Section (LSCS)',
    instructions:[
      'Take complete bed rest for 48 hours — get up only with support',
      'Keep the wound clean and dry for 7 days — no water contact',
      'Avoid lifting anything heavier than your baby for 6 weeks',
      'Diet: high protein, iron-rich foods — continue iron supplements for 3 months',
      'Breastfeed within 30 minutes of delivery if possible — feeds on demand',
      'Watch for danger signs: fever >38°C, foul-smelling discharge, increasing pain, wound opening',
      'Avoid intercourse for 6 weeks and until cleared by doctor',
      'No driving for 4–6 weeks until able to react normally',
    ],
    medicines:[
      { name:'Amoxicillin + Clavulanate 625mg (Augmentin)', freq:'Twice daily  —  8am · 8pm', duration:'5 days', note:'Antibiotic — take with food to avoid nausea, complete full course', local:'ਖਾਣੇ ਨਾਲ ਲਓ, ਪੂਰਾ ਕੋਰਸ ਕਰੋ / खाने के साथ लें', times:['8am','8pm'] },
      { name:'Diclofenac Sodium 50mg + Paracetamol 500mg (Voveran Plus)', freq:'3 times/day  —  8am · 2pm · 8pm', duration:'5 days', note:'Pain relief — do NOT take on empty stomach, avoid if breastfeeding', local:'ਖਾਲੀ ਪੇਟ ਨਾ ਲਓ / खाली पेट न लें', times:['8am','2pm','8pm'] },
      { name:'Ferrous Sulphate + Folic Acid (Feronia F / Livogen Z)', freq:'1 tablet daily — after lunch', duration:'3 months', note:'Iron supplement — essential for recovery, may cause dark stools (normal)', local:'ਟੱਟੀ ਕਾਲੀ ਹੋ ਸਕਦੀ ਹੈ — ਆਮ ਗੱਲ ਹੈ / मल काला हो सकता है — सामान्य है', times:['1pm'] },
      { name:'Calcium Carbonate + Vitamin D3 (Shelcal / Calcimax)', freq:'1 tablet twice daily — 8am · 8pm', duration:'3 months', note:'Calcium — important for bone strength and breastfeeding', local:'ਦੁੱਧ ਚੁੰਘਾਉਣ ਲਈ ਜ਼ਰੂਰੀ / दूध पिलाने के लिए जरूरी', times:['8am','8pm'] },
    ],
    followup:['48 hours — wound check & dressing', '7 days — suture / staple removal', '6 weeks — postnatal check, contraception counselling'],
  },
  psych: {
    label:'🧠 Neuropsychiatry', color:'#FF9500',
    surgeryLabel:'Psychiatric Treatment',
    instructions:[
      'Take ALL medicines EXACTLY as prescribed — never skip or double a dose',
      'Do NOT stop medicines suddenly — always taper under doctor supervision',
      'Avoid alcohol completely — it dangerously interacts with psychiatric medicines',
      'Maintain regular sleep times — sleep at same time every night',
      'Do not drive or operate heavy machinery if feeling drowsy or sedated',
      'Medicines take 2–4 weeks for full effect — do not stop thinking they are not working',
      'Keep all follow-up appointments — blood tests may be needed',
      'Emergency: call doctor or come immediately if thoughts of self-harm arise',
    ],
    medicines:[
      { name:'Escitalopram 10mg (Nexito / Feliz S)', freq:'Once daily — morning after breakfast', duration:'As directed (minimum 6 months)', note:'Antidepressant — takes 2–4 weeks to feel full effect, do not stop abruptly', local:'ਸਵੇਰੇ ਖਾਣੇ ਬਾਅਦ ਲਓ / सुबह नाश्ते के बाद लें', times:['9am'] },
      { name:'Clonazepam 0.5mg (Rivotril / Lonazep)', freq:'Twice daily  —  9am · 10pm', duration:'2 weeks then taper as directed', note:'Do NOT stop suddenly — taper over weeks as instructed', local:'ਅਚਾਨਕ ਬੰਦ ਨਾ ਕਰੋ / अचानक बंद न करें', times:['9am','10pm'] },
      { name:'Olanzapine 5mg (Oleanz / Olexar)', freq:'Once daily — bedtime', duration:'As directed', note:'May cause drowsiness and weight gain — take at night', local:'ਰਾਤ ਨੂੰ ਲਓ, ਨੀਂਦ ਆ ਸਕਦੀ ਹੈ / रात को लें, नींद आ सकती है', times:['10pm'] },
    ],
    followup:['1 week review', '1 month — dose assessment', '3 months — full evaluation', 'Ongoing as needed'],
  },
  skin: {
    label:'💆 Skin & Cosmetology', color:'#5856D6',
    surgeryLabel:'Dermatology Procedure',
    instructions:[
      'Apply sunscreen SPF 30+ EVERY morning — reapply every 2–3 hours if outdoors',
      'Do NOT pick, scratch, or peel the treated area — it will worsen scarring',
      'Avoid direct sun exposure for 4 weeks after any procedure or peel',
      'Use only the prescribed gentle cleanser — avoid regular soap on treated areas',
      'Do not use any other skin products unless approved by your doctor',
      'Tretinoin / retinol may cause initial dryness and peeling — this is normal',
      'Report immediately if: severe redness, blistering, oozing, or allergic reaction',
      'Stay well-hydrated — drink 8–10 glasses of water daily',
    ],
    medicines:[
      { name:'Tretinoin 0.025% Cream (Retino-A / Deriva CMS)', freq:'At night — thin layer, avoid eye area', duration:'As directed (start 2x/week → increase)', note:'May cause initial dryness/peeling — normal, reduce frequency if severe', local:'ਰਾਤ ਨੂੰ ਪਤਲੀ ਪਰਤ — ਅੱਖਾਂ ਤੋਂ ਦੂਰ ਰੱਖੋ / रात में पतली परत लगाएं', times:['10pm'] },
      { name:'Hydroquinone 2–4% Cream (Melalite / Lustra)', freq:'Twice daily — 9am · 9pm', duration:'3 months maximum', note:'Skin lightening — avoid sun exposure immediately after applying', local:'ਲਗਾਉਣ ਤੋਂ ਬਾਅਦ ਧੁੱਪ ਤੋਂ ਬਚੋ / लगाने के बाद धूप से बचें', times:['9am','9pm'] },
      { name:'Moisturiser + SPF 50 PA+++ (Sebamed / Cetaphil SPF)', freq:'Every morning — before going out', duration:'Ongoing (daily essential)', note:'Do not skip — non-negotiable for any skin condition', local:'ਰੋਜ਼ਾਨਾ ਸਵੇਰੇ ਲਾਓ, ਕਦੇ ਨਾ ਛੱਡੋ / रोज सुबह लगाएं, कभी न छोड़ें', times:['8am'] },
      { name:'Topical Antibiotic / Azelaic Acid (Aziderm / Finacea)', freq:'Once daily at night', duration:'8–12 weeks', note:'For acne / redness — apply after cleanser, before moisturiser', local:'ਕਲੀਨਜ਼ਰ ਤੋਂ ਬਾਅਦ ਲਾਓ / क्लींजर के बाद लगाएं', times:['10pm'] },
    ],
    followup:['2–4 weeks — early response check', '3 months — progress review', 'Annual skin health assessment'],
  },
};

function getDischargePrintData(sel) {
  const specialty = sel || document.getElementById('dc-specialty-sel')?.value || 'ophtho';
  const ptObj = window.CURRENT_PATIENT || PATIENTS.find(function (p) {
    const ids = ['ophtho-pt-uid', 'obg-pt-uid', 'psych-pt-uid', 'skin-pt-uid'];
    const id = ids.map(function (i) { return document.getElementById(i)?.textContent?.trim(); }).find(function (v) { return v && v !== '—'; });
    return id && p.bmhId === id;
  }) || {};
  const ptId = ptObj.bmhId || '—';
  const ptNm = ptObj.name || document.getElementById('ophtho-pt-nm')?.textContent || document.getElementById('obg-pt-nm')?.textContent || '— Select Patient —';
  const tmpl = DISCHARGE_TEMPLATES[specialty] || DISCHARGE_TEMPLATES.ophtho;
  const lastOtCase = OT_CASES.slice().reverse().map(normalizeOTCaseRecord).find(c => c.bmhId === ptObj.bmhId) || null;
  const ipdStay = (window.IPD_PATIENTS || []).slice().reverse().find(x => x.bmhId === ptObj.bmhId) || null;
  const livePostSurgeryRx = !!document.getElementById('rx-post-surgery')?.checked;
  const savedPostSurgeryRx = !!ptObj.lastVisit?.postSurgeryRx;
  const lastRxData = (livePostSurgeryRx && RX_DRUGS && RX_DRUGS.length)
    ? JSON.parse(JSON.stringify(RX_DRUGS))
    : (savedPostSurgeryRx && Array.isArray(ptObj.lastVisit?.rx) && ptObj.lastVisit.rx.length)
      ? JSON.parse(JSON.stringify(ptObj.lastVisit.rx))
      : (RX_DRUGS && RX_DRUGS.length)
        ? JSON.parse(JSON.stringify(RX_DRUGS))
        : (Array.isArray(ptObj.lastVisit?.rx) && ptObj.lastVisit.rx.length ? JSON.parse(JSON.stringify(ptObj.lastVisit.rx)) : []);
  const visitDate = ptObj.lastVisit?.date || ptObj.createdAt || new Date().toISOString();
  const opDate = lastOtCase?.date || lastOtCase?.scheduledDate || ipdStay?.admittedAt || visitDate;
  const dischargeDate = ipdStay?.dischargedAt || new Date().toISOString();
  const findings = [ptObj.lastVisit?.positiveFindings, ptObj.positiveFindings, ptObj.lastVisit?.chiefComplaints].filter(Boolean).join('; ') || 'clinical findings noted in the case sheet';
  const diagnosis = lastOtCase?.dx || ptObj.lastVisit?.dx || ptObj.dx || ptObj.lastVisit?.clinicalImpression || tmpl.procedure || 'the diagnosed condition';
  const procedureName = lastOtCase?.procedure || ptObj.lastVisit?.procedure || ptObj.surgery || ptObj.surgeryAdvised || tmpl.procedure || 'the planned procedure';
  const joinDate = new Date(new Date(opDate).getTime() + (14 * 24 * 60 * 60 * 1000)).toISOString();
  const followups = Array.isArray(lastOtCase?.autoFollowups) ? lastOtCase.autoFollowups.slice() : [];
  return {
    sel: specialty,
    tmpl: DISCHARGE_TEMPLATES[specialty] || DISCHARGE_TEMPLATES.ophtho,
    ptObj: ptObj,
    ptId: ptId,
    ptNm: ptNm,
    lastOtCase: lastOtCase,
    ipdStay: ipdStay,
    lastRxData: lastRxData,
    visitDate: visitDate,
    opDate: opDate,
    dischargeDate: dischargeDate,
    findings: findings,
    diagnosis: diagnosis,
    procedureName: procedureName,
    joinDate: joinDate,
    followups: followups,
    postSurgeryRx: livePostSurgeryRx || savedPostSurgeryRx
  };
}
function flattenDischargeRxRows(rows) {
  return (rows || []).reduce(function (acc, row) {
    if (!row) return acc;
    acc.push(Object.assign({}, row, { _taperStep: null }));
    const tapers = Array.isArray(row.taperRows) ? row.taperRows : (row.taperRow ? [row.taperRow] : []);
    tapers.forEach(function (tap, idx) {
      acc.push(Object.assign({}, row, tap || {}, { taperRows: [], _taperStep: idx + 1 }));
    });
    return acc;
  }, []);
}
function getDischargeFreqOptionsHtml(selected) {
  const value = String(selected || '');
  return RX_FREQ_OPTIONS.map(function (opt) {
    return '<option value="' + String(opt).replace(/"/g, '&quot;') + '"' + (value === opt ? ' selected' : '') + '>' + opt + '</option>';
  }).join('');
}
function getDischargeDurOptionsHtml(selected) {
  const value = String(selected || '');
  return RX_DURATION_OPTIONS.map(function (opt) {
    return '<option value="' + String(opt).replace(/"/g, '&quot;') + '"' + (value === opt ? ' selected' : '') + '>' + opt + '</option>';
  }).join('');
}
function dischargeFrequencyToTimes(freq) {
  const f = String(freq || '').toLowerCase();
  if (/hourly|every hour/.test(f)) return ['Every hour'];
  if (/6 times|6x/.test(f)) return ['6am', '10am', '2pm', '6pm', '8pm', '10pm'];
  if (/4 times|qid/.test(f)) return ['6am', '12pm', '6pm', '10pm'];
  if (/3 times|tds/.test(f)) return ['8am', '2pm', '8pm'];
  if (/twice|bd/.test(f)) return ['8am', '8pm'];
  if (/bedtime|hs/.test(f)) return ['10pm'];
  return ['8am'];
}
function buildDischargePrintSection(sel) {
  const data = getDischargePrintData(sel);
  if (!data.ptId || data.ptId === '—') return '';
  const esc = escapeHtmlConsent;
  const headerSrc = resolvePrintHeaderSrc();
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const fmt = function (v) { return v ? new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'; };
  const meds = flattenDischargeRxRows(data.lastRxData && data.lastRxData.length ? data.lastRxData : []).map(function (d, i) {
    const trade = rxDrugTradeName(d) || d.name || d.brand || 'Medicine';
    const generic = rxDrugGenericName(d);
    const times = dischargeFrequencyToTimes(d.freq).join(' · ');
    const title = d._taperStep ? (trade + ' · Taper step ' + d._taperStep) : trade;
    return '<tr>'
      + '<td style="padding:6px 8px;border:1px solid #cfd5de;font-size:11px">' + (i + 1) + '</td>'
      + '<td style="padding:6px 8px;border:1px solid #cfd5de;font-size:11px;font-weight:800">' + esc(title) + (generic && generic !== trade ? '<div style="font-weight:500;color:#555;font-size:10px">' + esc(generic) + '</div>' : '') + '</td>'
      + '<td style="padding:6px 8px;border:1px solid #cfd5de;font-size:11px">' + esc(d.freq || '—') + '</td>'
      + '<td style="padding:6px 8px;border:1px solid #cfd5de;font-size:11px">' + esc(d.dur || '—') + '</td>'
      + '<td style="padding:6px 8px;border:1px solid #cfd5de;font-size:11px">' + esc(times) + '</td>'
      + '</tr>';
  }).join('');
  const followupRows = (data.followups || []).map(function (f, idx) {
    const dateText = f?.date ? fmt(f.date) : '—';
    const timeText = f?.time || '';
    const labelText = f?.label || ('Follow-up ' + (idx + 1));
    return '<div style="display:flex;justify-content:space-between;gap:10px;padding:7px 10px;border:1px solid #d7dce5;border-radius:8px;margin-top:6px;font-size:11px"><strong>' + esc(labelText) + '</strong><span>' + esc(dateText + (timeText ? ' · ' + timeText : '')) + '</span></div>';
  }).join('');
  const summary = 'This is to certify that ' + data.ptNm + ' visited our hospital on ' + fmt(data.visitDate) + '. On examination, it was found that the patient had '
    + data.findings + ' with diagnosis of ' + data.diagnosis + '. The patient was advised ' + data.procedureName + ', which was subsequently performed on '
    + fmt(data.opDate) + '. The operative and post-operative periods were uneventful. The patient was admitted to the inpatient ward on '
    + fmt(data.ipdStay?.admittedAt || data.opDate) + ' and discharged on ' + fmt(data.dischargeDate)
    + '. The patient is advised to continue the medications and bed rest for 2 weeks. The patient is fit to join duties from ' + fmt(data.joinDate) + '.';
  return '<section class="page" style="page-break-after:always;padding:10mm 12mm 9mm">'
    + (headerSrc ? '<img src="' + esc(headerSrc) + '" style="width:100%;height:auto;display:block">' : '<div style="font-size:18px;font-weight:900;color:#1A3C6E">Baweja Multispeciality Hospital</div>')
    + '<div class="title">DISCHARGE SUMMARY &amp; FITNESS CERTIFICATE</div>'
    + '<div class="grid">'
    + '<div class="box"><div class="label">Patient Name</div><div class="val">' + esc(data.ptNm) + '</div></div>'
    + '<div class="box"><div class="label">BMSH ID</div><div class="val" style="font-family:ui-monospace,monospace">' + esc(data.ptId) + '</div></div>'
    + '<div class="box"><div class="label">Age / Sex</div><div class="val">' + esc((data.ptObj.age || '—') + ' / ' + (data.ptObj.sex || '—')) + '</div></div>'
    + '<div class="box"><div class="label">Procedure</div><div class="val">' + esc(data.procedureName) + '</div></div>'
    + '<div class="box"><div class="label">Eye / Site</div><div class="val">' + esc(data.lastOtCase?.site || data.lastOtCase?.eye || data.ptObj.eye || '—') + '</div></div>'
    + '<div class="box"><div class="label">Doctor</div><div class="val">' + esc(data.ptObj.doctor || CURRENT_USER?.name || 'Dr. Varun Baweja') + '</div></div>'
    + '<div class="box"><div class="label">OT Date</div><div class="val">' + esc(fmt(data.opDate)) + '</div></div>'
    + '<div class="box"><div class="label">Admitted On</div><div class="val">' + esc(fmt(data.ipdStay?.admittedAt || data.opDate)) + '</div></div>'
    + '<div class="box"><div class="label">Discharged On</div><div class="val">' + esc(fmt(data.dischargeDate)) + '</div></div>'
    + '</div>'
    + '<div class="sec"><div class="sec-h">Summary</div><div class="summary">' + esc(summary) + '</div></div>'
    + '<div class="sec"><div class="sec-h">Medication Schedule</div>'
    + '<table><thead><tr><th class="th" style="padding:6px 8px;border:1px solid #cfd5de">#</th><th class="th" style="padding:6px 8px;border:1px solid #cfd5de">Medicine</th><th class="th" style="padding:6px 8px;border:1px solid #cfd5de">Frequency</th><th class="th" style="padding:6px 8px;border:1px solid #cfd5de">Duration</th><th class="th" style="padding:6px 8px;border:1px solid #cfd5de">Timings</th></tr></thead><tbody>'
    + (meds || '<tr><td colspan="5" style="padding:12px;border:1px solid #cfd5de;font-size:11px;color:#666;text-align:center">No prescription found for this patient.</td></tr>')
    + '</tbody></table></div>'
    + (followupRows ? '<div class="sec"><div class="sec-h">Default Follow-ups</div>' + followupRows + '</div>' : '')
    + '<div class="sign"><div><div class="line"></div><div class="small">Patient / Attendant Signature</div></div><div><div class="line"></div><div class="small">Doctor Signature</div></div><div><div class="line"></div><div class="small">Printed on ' + esc(today) + '</div></div></div>'
    + '</section>';
}
function buildDischargePrintHtml(sel) {
  const section = buildDischargePrintSection(sel);
  if (!section) return '';
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;color:#111}@page{size:A4;margin:0}.page{padding:10mm 12mm 9mm}.title{font-size:15px;font-weight:900;color:#1A3C6E;text-align:center;margin:8px 0 10px}.label{font-size:9px;font-weight:800;color:#555;text-transform:uppercase}.val{font-size:11.5px;font-weight:800;color:#111}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px 14px}.box{border:1px solid #d7dce5;border-radius:8px;padding:8px 10px}.sec{margin-top:10px}.sec-h{font-size:10px;font-weight:900;color:#1A3C6E;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}.summary{font-size:11.2px;line-height:1.75;border:1px solid #d7dce5;border-radius:8px;padding:10px 12px;min-height:124px}table{width:100%;border-collapse:collapse}.th{background:#eef3fb;color:#1A3C6E;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.4px}.sign{display:flex;justify-content:space-between;gap:16px;margin-top:14px}.sign>div{flex:1;text-align:center}.line{border-bottom:1px solid #222;height:32px;margin-bottom:4px}.small{font-size:9.5px;color:#555}</style></head><body>' + section + '</body></html>';
}
function buildDischargeCardPrintHtml() {
  renderDischargeBuilder();
  const card = document.getElementById('discharge-card');
  if (!card) return '';
  const clone = card.cloneNode(true);
  clone.querySelectorAll('[contenteditable]').forEach(function (node) {
    node.removeAttribute('contenteditable');
    node.style.borderBottom = 'none';
    node.style.outline = 'none';
  });
  clone.querySelectorAll('button').forEach(function (btn) { btn.remove(); });
  clone.querySelectorAll('.drop-time').forEach(function (el) {
    el.style.border = '1px solid #d7dce5';
    el.style.borderRadius = '10px';
    el.style.padding = '2px 7px';
    el.style.fontSize = '10px';
    el.style.background = el.classList.contains('active') ? '#1A3C6E' : '#fff';
    el.style.color = el.classList.contains('active') ? '#fff' : '#1A3C6E';
  });
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#111;background:#fff;margin:0;padding:0}@page{size:A4;margin:8mm}.discharge-card{border:1px solid #d7dce5;border-radius:12px;overflow:hidden}.dc-header{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;background:#1A3C6E;padding:14px 18px}.dc-field-lbl{font-size:9px;font-weight:800;color:#666;text-transform:uppercase;letter-spacing:.4px}.dc-field-val{font-size:12px;font-weight:800;color:#111}.g2{display:grid;grid-template-columns:1fr 1fr}.drop-item{border-left:4px solid #1A3C6E;padding:8px 10px;border-radius:8px;background:#f7f9ff}.drop-freq{display:flex;gap:4px}.drop-time.active{background:#1A3C6E;color:#fff}.drop-time{display:inline-flex;align-items:center;justify-content:center}</style></head><body>'
    + clone.outerHTML + '</body></html>';
}

// Render the discharge page with per-specialty selector + editable medicines
function renderDischargeBuilder() {
  const pg = document.getElementById('pg-discharge'); if(!pg) return;
  const ctrl = document.getElementById('dc-specialty-ctrl');
  if(!ctrl) return;
  const sel = document.getElementById('dc-specialty-sel')?.value || 'ophtho';
  const data = getDischargePrintData(sel);
  const ptObj = data.ptObj;
  const ptId = data.ptId;
  const ptNm = data.ptNm;
  const tmpl = data.tmpl;

  document.getElementById('dc-pt-name').textContent = ptNm;
  document.getElementById('dc-pt-id').textContent   = ptId;
  document.getElementById('dc-pt-age').textContent  = ptObj.age || '—';
  document.getElementById('dc-pt-sex').textContent  = ptObj.sex || '—';
  document.getElementById('dc-pt-mob').textContent  = ptObj.mob || '—';
  document.getElementById('dc-date').textContent    = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  const procDxEl = document.getElementById('dc-procedure');
  if (procDxEl) {
    const procDx = [data.lastOtCase?.dx || data.diagnosis || '', data.lastOtCase?.procedure || data.procedureName || ''].filter(Boolean).join(' · ');
    procDxEl.textContent = procDx || '—';
  }
  // Set discharge date to today if blank
  const ddEl = document.getElementById('dc-discharge-date');
  if(ddEl) ddEl.textContent = new Date(data.dischargeDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  // Doctor from CURRENT_USER
  const surgeonEl = document.getElementById('dc-surgeon');
  if(surgeonEl && (surgeonEl.textContent==='Dr. Varun Baweja'||!surgeonEl.textContent.trim())) {
    surgeonEl.textContent = ptObj.doctor || window.CURRENT_USER?.name || 'Dr. Varun Baweja';
  }
  const docSigEl = document.getElementById('dc-doc-sig');
  if(docSigEl) {
    const dName = ptObj.doctor || window.CURRENT_USER?.name || 'Dr. Varun Baweja';
    const deptSig = {ophtho:'MS (Ophth)', obg:'MS (OBG)', psych:'MD (Psychiatry)', skin:'MD (Dermatology)'}[sel] || 'MS';
    docSigEl.textContent = dName + ' · ' + deptSig;
  }

  // Instructions
  const instrEl = document.getElementById('dc-instructions-list');
  if(instrEl) {
    instrEl.innerHTML = tmpl.instructions.map((ins,i)=>
      `<div class="dc-instr-row" style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid var(--g5)">
        <span style="font-size:13px;margin-top:1px">⚠️</span>
        <div contenteditable="true" spellcheck="false"
          style="flex:1;font-size:11.5px;color:#8a4200;line-height:1.7;outline:none;min-height:18px"
          data-instr-idx="${i}">${ins}</div>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:12px;padding:0;flex-shrink:0">✕</button>
      </div>`
    ).join('') +
    `<button onclick="addDcInstruction()" style="margin-top:6px;width:100%"
      class="btn btn-xs btn-outline">+ Add Instruction</button>`;
  }

  // Medicines — prefer live RX_DRUGS, fallback to template
  const medEl = document.getElementById('dc-medicine-list');
  if(medEl) {
    let meds;
    if(data.lastRxData && data.lastRxData.length) {
      meds = flattenDischargeRxRows(data.lastRxData).map((d,i)=>renderDcMedRow({
        name: (rxDrugTradeName(d) || d.name || d.brand || '') + ((rxDrugGenericName(d) && rxDrugGenericName(d)!==rxDrugTradeName(d)) ? ' ('+rxDrugGenericName(d)+')' : ''),
        note: d._taperStep ? ('Taper step ' + d._taperStep) : '',
        local: (d.lang&&d.lang.pa) ? d.lang.pa : (d.lang&&d.lang.hi ? d.lang.hi : ''),
        freq: d.freq, duration: d.dur
      }, i, tmpl.color));
    } else {
      meds = tmpl.medicines.map((m,i)=>renderDcMedRow(m,i,tmpl.color));
    }
    medEl.innerHTML = meds.join('') +
      `<button onclick="addDcMedicine('${sel}')" class="btn btn-xs btn-outline" style="margin-top:6px;width:100%">+ Add Medicine</button>`;
  }

  // Follow-up — try to read from rx-fu-date first
  const fuEl = document.getElementById('dc-followup-list');
  if(fuEl) {
    const fuDateVal = document.getElementById('rx-fu-date')?.value;
    let followupList = (data.followups && data.followups.length)
      ? data.followups.map(function (f) {
          const dt = f?.date ? new Date(f.date).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'}) : '';
          return (f?.label || 'Follow-up') + (dt ? ': ' + dt : '') + (f?.time ? ' · ' + f.time : '');
        })
      : [...tmpl.followup];
    if(fuDateVal && !(data.followups && data.followups.length)) {
      const fuFormatted = new Date(fuDateVal).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
      followupList = ['Review: ' + fuFormatted, ...followupList.slice(1)];
    }
    fuEl.innerHTML = followupList.map((f,i)=>
      `<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--g6);border-radius:8px;margin-bottom:5px">
        <span>📅</span>
        <div contenteditable="true" spellcheck="false" style="flex:1;font-size:12.5px;font-weight:800;outline:none">${f}</div>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:12px">✕</button>
      </div>`
    ).join('') +
    `<button onclick="addDcFollowup()" class="btn btn-xs btn-outline" style="margin-top:4px;width:100%">+ Add Follow-up</button>`;
  }

  const surgeryDetailsEl = document.getElementById('dc-surgery-details');
  if (surgeryDetailsEl) {
    const rows = [
      ['Surgery / procedure', data.procedureName],
      ['OT date', new Date(data.opDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})],
      ['Eye / site', data.lastOtCase?.site || data.lastOtCase?.eye || ptObj.eye || '—'],
      ['IOL type / power', [data.lastOtCase?.iolType, data.lastOtCase?.iolPower].filter(Boolean).join(' / ') || '—'],
      ['Admitted on', data.ipdStay?.admittedAt ? new Date(data.ipdStay.admittedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '—'],
      ['Discharged on', new Date(data.dischargeDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})]
    ];
    surgeryDetailsEl.innerHTML = rows.map(r => `<div style="display:grid;grid-template-columns:145px 1fr;gap:10px;padding:6px 0;border-bottom:1px solid var(--g5)"><div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase">${r[0]}</div><div style="font-size:12px;font-weight:800;color:var(--tx)">${r[1] || '—'}</div></div>`).join('');
  }

  const sumEl = document.getElementById('dc-summary-text');
  if (sumEl) {
    const vDate = new Date(data.visitDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
    const oDate = new Date(data.opDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
    const aDate = data.ipdStay?.admittedAt ? new Date(data.ipdStay.admittedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : oDate;
    const dDate = new Date(data.dischargeDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
    const fitDate = new Date(data.joinDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
    sumEl.innerHTML = `
      <div contenteditable="true" spellcheck="false" style="outline:none">
        This is to certify that <strong>${ptNm}</strong> visited our hospital on <strong>${vDate}</strong>. On examination, it was found that the patient had <strong>${data.findings}</strong> with diagnosis of <strong>${data.diagnosis}</strong>.<br><br>
        The patient was advised <strong>${data.procedureName}</strong>, which was subsequently performed on <strong>${oDate}</strong>. The operative and post-operative periods were uneventful.<br><br>
        The patient was admitted to the inpatient ward on <strong>${aDate}</strong> and discharged on <strong>${dDate}</strong>. The patient is advised to continue the prescribed medications and remain on bed rest for <strong>2 weeks</strong>.<br><br>
        The patient is fit to join his/her duties from <strong>${fitDate}</strong>.
      </div>`;
  }
}

function renderDcMedRow(m,i,color) {
  const TIMES = ['12am','6am','8am','10am','12pm','2pm','4pm','6pm','8pm','10pm'];
  const freq = String(m.freq || '').toLowerCase();
  const activeTimes = /every hour|hourly/.test(freq) ? TIMES
    : /6 times|6x/.test(freq) ? ['6am','10am','2pm','6pm','8pm','10pm']
    : /4 times|qid/.test(freq) ? ['6am','12pm','6pm','10pm']
    : /3 times|tds/.test(freq) ? ['8am','2pm','8pm']
    : /twice|bd/.test(freq) ? ['8am','8pm']
    : /bedtime|hs/.test(freq) ? ['10pm']
    : ['8am'];
  return `<div class="drop-item dc-med-row" style="border-left-color:${color};background:${color}11;margin-bottom:8px;position:relative">
    <button onclick="this.closest('.dc-med-row').remove()" style="position:absolute;top:6px;right:6px;background:none;border:none;cursor:pointer;color:var(--red);font-size:12px">✕</button>
    <div contenteditable="true" spellcheck="false" style="font-weight:900;font-size:13px;outline:none;padding-right:20px">${m.name}</div>
    <div contenteditable="true" spellcheck="false" style="font-size:11px;color:var(--g1);outline:none;margin:3px 0">${m.note}</div>
    <div contenteditable="true" spellcheck="false" style="font-size:11.5px;color:#555;outline:none;margin-bottom:4px">${m.local}</div>
    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:5px">
      <label style="font-size:10px;font-weight:800;color:var(--g1)">FREQ:</label>
      <select style="font-size:11px;border:1px solid var(--g4);border-radius:5px;padding:2px 6px;width:170px">${getDischargeFreqOptionsHtml(m.freq)}</select>
      <label style="font-size:10px;font-weight:800;color:var(--g1)">DURATION:</label>
      <select style="font-size:11px;border:1px solid var(--g4);border-radius:5px;padding:2px 6px;width:130px">${getDischargeDurOptionsHtml(m.duration)}</select>
    </div>
    <div class="drop-freq" style="flex-wrap:wrap;gap:3px">
      ${TIMES.map(t=>`<div class="drop-time ${activeTimes.includes(t)?'active':''}" onclick="this.classList.toggle('active')">${t}</div>`).join('')}
    </div>
  </div>`;
}

function addDcInstruction() {
  const list = document.getElementById('dc-instructions-list');
  const addBtn = list.querySelector('button');
  const div = document.createElement('div');
  div.className = 'dc-instr-row';
  div.style.cssText = 'display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid var(--g5)';
  div.innerHTML = `<span style="font-size:13px;margin-top:1px">⚠️</span>
    <div contenteditable="true" spellcheck="false" style="flex:1;font-size:11.5px;color:#8a4200;outline:none;min-height:18px">Type instruction here…</div>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:12px">✕</button>`;
  list.insertBefore(div, addBtn);
  div.querySelector('[contenteditable]').focus();
}

function addDcMedicine(dept) {
  const list = document.getElementById('dc-medicine-list');
  const addBtn = list.querySelector('button:last-child');
  const color = DISCHARGE_TEMPLATES[dept]?.color || '#1A3C6E';
  const div = document.createElement('div');
  div.innerHTML = renderDcMedRow({name:'New Medicine', note:'Note', local:'ਸਹੀ ਸਮੇਂ ਤੇ ਲਓ / सही समय पर लें', freq:'3x/day', duration:'5 days'},0,color);
  list.insertBefore(div.firstElementChild, addBtn);
}

function addDcFollowup() {
  const list = document.getElementById('dc-followup-list');
  const addBtn = list.querySelector('button:last-child');
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 10px;background:var(--g6);border-radius:8px;margin-bottom:5px';
  div.innerHTML = `<span>📅</span>
    <div contenteditable="true" spellcheck="false" style="flex:1;font-size:12.5px;font-weight:800;outline:none">New follow-up…</div>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:var(--red);font-size:12px">✕</button>`;
  list.insertBefore(div, addBtn);
  div.querySelector('[contenteditable]').focus();
}

// ════════════════════════════════════════════════════════════════
// CONSENT UPLOAD — text or image with patient details header
// ════════════════════════════════════════════════════════════════

// ── MyMemory translation (free, no API key) ───────────────────────────────────
async function _translateText(text, lang) {
  if(!text || !lang) return text;
  const MAX = 450;
  const chunks = [];
  if(text.length <= MAX) {
    chunks.push(text);
  } else {
    const parts = text.split(/(?<=[.!?।])\s+/);
    let cur = '';
    for(const p of parts) {
      if(cur && (cur + ' ' + p).length > MAX) { chunks.push(cur); cur = p; }
      else { cur = cur ? cur + ' ' + p : p; }
    }
    if(cur) chunks.push(cur);
  }
  const out = [];
  for(const chunk of chunks) {
    try {
      const r = await fetch('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(chunk) + '&langpair=en|' + lang);
      const d = await r.json();
      out.push(d?.responseData?.translatedText || chunk);
    } catch(_) { out.push(chunk); }
  }
  return out.join(' ');
}

// ── Interleave English paragraphs with translated paragraphs ─────────────────
async function _buildBilingualHTML(text, lang) {
  const paras = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  const parts = [];
  for(const para of paras) {
    const translated = await _translateText(para, lang);
    parts.push(
      '<div style="margin-bottom:11px;padding-bottom:9px;border-bottom:1px dotted #bbb">' +
        '<div style="font-size:11.5px;line-height:1.75">' + para.replace(/\n/g, '<br>') + '</div>' +
        '<div style="font-size:11.5px;line-height:1.75;margin-top:4px;padding-left:8px;border-left:2px solid #888">' + translated + '</div>' +
      '</div>'
    );
  }
  return parts.join('');
}
async function buildStructuredConsentFromText(name, text) {
  const paras = text.split(/\n{2,}/).map(function (p) { return p.trim(); }).filter(Boolean);
  const out = [];
  for (const para of paras) {
    const pa = await _translateText(para, 'pa');
    const hi = await _translateText(para, 'hi');
    out.push({ en: para, pa: pa || para, hi: hi || para });
  }
  return { title: String(name || 'Consent').toUpperCase(), paras: out };
}

function openConsentUploadModal() {
  // Always rebuild — ensures latest fields are present every time
  const prev = document.getElementById('m-consent-upload');
  if(prev) prev.remove();

  const SS  = 'width:100%;font-size:13px;padding:8px;border-radius:8px;border:1.5px solid var(--g4)';
  const LBL = (t) => `<div style="font-size:11px;font-weight:800;color:var(--blue);margin-bottom:5px;text-transform:uppercase">${t}</div>`;
  const deptOpts = `
    <option value="ophtho">Ophthalmology</option>
    <option value="obg">OBG</option>
    <option value="psych">Psychiatry / Neurology</option>
    <option value="skin">Skin &amp; Cosmetology</option>
    <option value="all">All Departments</option>`;
  const typeOpts = `<option value="consent">Consent</option><option value="form">Form</option>`;
  const el = document.createElement('div');
  el.className = 'modal-ov'; el.id = 'm-consent-upload';
  el.innerHTML = `
<div class="modal modal-lg">
  <div class="modal-hd">
    <div class="modal-title">📎 Upload / Create Consent or Form</div>
    <button class="modal-close" onclick="closeM('m-consent-upload')">✕</button>
  </div>
  <div class="ptabs" style="margin-bottom:12px">
    <div class="ptab active" onclick="ptab(this,'cup-text')">📝 Type / Paste Text</div>
    <div class="ptab" onclick="ptab(this,'cup-image')">🖼️ Upload Image / PDF</div>
  </div>

  <!-- TEXT TAB -->
  <div class="tab-content active" id="cup-text">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px">
      <div>${LBL('Type')}
        <select id="cup-consent-type" style="${SS}" onchange="_cupTypeChange('text')">${typeOpts}</select>
      </div>
      <div>${LBL('Department')}
        <select id="cup-consent-dept" style="${SS}">${deptOpts}</select>
      </div>
      <div>${LBL('Name')}
        <input id="cup-consent-name" type="text" placeholder="e.g. Cataract Surgery Consent" style="${SS}">
      </div>
    </div>
    ${LBL('Consent / Form Text')}
    <textarea id="cup-consent-text" style="width:100%;min-height:180px;font-size:12px;line-height:1.7"
      placeholder="Paste or type the full text here…&#10;&#10;I, the undersigned, hereby give my consent for the procedure…"></textarea>
    <div style="display:flex;gap:8px;margin-top:10px">
      <button class="btn btn-gold" onclick="saveConsentFromText()">💾 Save to Library</button>
      <button class="btn btn-outline" onclick="previewConsentWithHeader()">👁️ Preview &amp; Print</button>
    </div>
  </div>

  <!-- IMAGE TAB -->
  <div class="tab-content" id="cup-image">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px">
      <div>${LBL('Type')}
        <select id="cup-img-type" style="${SS}">${typeOpts}</select>
      </div>
      <div>${LBL('Department')}
        <select id="cup-img-dept" style="${SS}">${deptOpts}</select>
      </div>
      <div>${LBL('Name')}
        <input id="cup-img-name" type="text" placeholder="e.g. Cataract Surgery Consent" style="${SS}">
      </div>
    </div>
    <div style="border:2px dashed var(--g4);border-radius:10px;padding:20px;text-align:center;margin-bottom:10px;cursor:pointer;background:var(--g6)" onclick="document.getElementById('cup-file-inp').click()">
      <div style="font-size:28px;margin-bottom:6px">🖼️</div>
      <div style="font-size:13px;font-weight:800;color:var(--bmh-blue)">Click to upload image or PDF</div>
      <div style="font-size:11px;color:var(--g1);margin-top:3px">JPG, PNG — 1 image = 1 page · max 10MB</div>
      <input id="cup-file-inp" type="file" accept="image/*,.pdf" style="display:none" onchange="handleConsentFileUpload(this)">
    </div>
    <div id="cup-file-preview" style="display:none">
      <div id="cup-img-thumb" style="text-align:center;margin-bottom:10px"></div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-gold" onclick="saveConsentFromImage()">💾 Save to Library</button>
        <button class="btn btn-outline" onclick="printConsentWithHeader()">🖨️ Print with Patient Header</button>
      </div>
    </div>
  </div>
</div>`;
  document.body.appendChild(el);
  el.classList.add('open');
}

// Show/hide translation language row based on Type selection
function _cupTypeChange(tab) {
  if(tab !== 'text') return;
}

function handleConsentFileUpload(inp) {
  const file = inp.files[0]; if(!file) return;
  const preview = document.getElementById('cup-file-preview');
  const thumb = document.getElementById('cup-img-thumb');
  const nameInp = document.getElementById('cup-img-name');
  if(!preview || !thumb) return;

  nameInp.value = file.name.replace(/\.[^.]+$/,'');
  preview.style.display = 'block';

  if(file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = e => {
      thumb.innerHTML = `<img src="${e.target.result}" style="max-width:100%;max-height:300px;border-radius:8px;border:1px solid var(--g4)">`;
      thumb._dataUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    thumb.innerHTML = `<div style="padding:20px;background:var(--g6);border-radius:8px;font-size:13px">📄 PDF: ${file.name}</div>`;
    thumb._dataUrl = null;
  }
}

function _getConsentPatientHeader() {
  const ptNm = document.getElementById('ophtho-pt-nm')?.textContent || document.getElementById('obg-pt-nm')?.textContent || '—';
  const ptId = document.getElementById('ophtho-pt-uid')?.textContent?.trim() || '—';
  const ptObj = PATIENTS.find(p=>p.bmhId===ptId) || window.CURRENT_PATIENT || {};
  const today = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  return {
    name:    ptNm,
    id:      ptId,
    age:     ptObj.age    || '—',
    sex:     ptObj.sex    || '—',
    mob:     ptObj.mob    || '—',
    date:    today,
    doctor:  CURRENT_USER?.name || '—',
    surgery: ptObj.surgery || ptObj.surgeryAdvised || ptObj.procedure || '—',
    eye:     ptObj.eye    || ptObj.opEye || ptObj.surgEye || ptObj.operatingEye || '—',
  };
}

async function previewConsentWithHeader() {
  const text    = document.getElementById('cup-consent-text')?.value?.trim();
  const name    = document.getElementById('cup-consent-name')?.value?.trim() || 'Consent';
  const docType = document.getElementById('cup-consent-type')?.value || 'consent';
  if(!text) { showToast('Please enter consent text first','w'); return; }
  const pt  = _getConsentPatientHeaderUpload();
  // Open window synchronously (before any async work) to satisfy popup blockers
  const win = window.open('','_blank','width=900,height=700');
  if(!win) { showToast('Allow popups to preview / print','w'); return; }
  win.document.write('<html><body style="font-family:Arial,sans-serif;padding:40px;text-align:center;color:#555"><p style="font-size:16px">Translating… ⏳ please wait</p></body></html>');
  const bodyHTML = `<pre>${text}</pre>`;
  win.document.open();
  win.document.write(_consentPrintHTML(pt, name, bodyHTML, null, false));
  win.document.close();
}

function printConsentWithHeader() {
  const name = document.getElementById('cup-img-name')?.value?.trim() || 'Consent';
  const thumb = document.getElementById('cup-img-thumb');
  const imgSrc = thumb?._dataUrl;
  const pt = _getConsentPatientHeaderUpload();
  const win = window.open('','_blank','width=900,height=700');
  const imgHTML = imgSrc
    ? `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:contain;display:block">`
    : '<p style="color:#888;padding:20mm;text-align:center">[PDF — attach separately]</p>';
  win.document.write(_consentPrintHTML(pt, name, imgHTML, null, true));
  win.document.close();
}

function _consentPrintHTML(pt, consentName, bodyHTML, sigBlock, isImageMode) {
  const logoSrc = resolvePrintLogoSrc();
  const logoHtml = `<img src="${logoSrc}" style="height:24px;width:auto;display:block" alt="BMH">`;

  // Compact patient detail line — skip '—' fields for surgery/eye to save space
  const ptParts = [
    `<div><span class="meta-lbl">Patient</span><div class="meta-val">${pt.name}</div></div>`,
    `<div><span class="meta-lbl">BMSH ID</span><div class="meta-val mono">${pt.id}</div></div>`,
    pt.surgery !== '—' ? `<div><span class="meta-lbl">Procedure</span><div class="meta-val">${pt.surgery}${pt.eye !== '—' ? ' · ' + pt.eye : ''}</div></div>` : '',
    `<div><span class="meta-lbl">Date</span><div class="meta-val">${pt.date}</div></div>`
  ].filter(Boolean).join('');

  const pageStyle = isImageMode
    ? `@page{size:A4 portrait;margin:0}`
    : `@page{size:A4 portrait;margin:5mm 7mm 6mm 7mm}`;

  const imgBodyCSS = isImageMode ? `
    .body-wrap{height:calc(297mm - 24mm);overflow:hidden}
    .body-wrap img{width:100%;height:100%;object-fit:contain;display:block}` : `
    .body-wrap{padding-top:8px;max-height:248mm;overflow:hidden}
    .body-wrap pre{font-family:Arial,sans-serif;white-space:pre-wrap;font-size:10.8px;line-height:1.55}`;

  const sigHTML = (!isImageMode && !sigBlock) ? `
  <div class="sig-row">
    <div class="sig-box"><div class="sig-line"></div><div class="sig-label">Patient / Guardian Signature</div><div class="sig-label">Name &amp; Relationship</div></div>
    <div class="sig-box"><div class="sig-line"></div><div class="sig-label">Witness Signature</div></div>
    <div class="sig-box"><div class="sig-line"></div><div class="sig-label">Doctor / ${pt.doctor}</div></div>
  </div>` : (sigBlock || '');

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>${consentName}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Arial Unicode MS','Noto Sans','Noto Sans Devanagari','Noto Sans Gurmukhi',Arial,sans-serif;color:#000;filter:grayscale(1)}
${pageStyle}
.hdr{display:flex;justify-content:space-between;align-items:stretch;gap:8px;padding:3mm 4mm;border:1px solid #000;border-radius:10px;background:#fff}
.hdr-info{display:flex;align-items:center;gap:8px;min-width:0}
.hdr-title{font-size:12.5px;font-weight:900;color:#111;line-height:1.25}
.pt-meta{min-width:330px;display:grid;grid-template-columns:repeat(4,minmax(70px,1fr));gap:8px}
.meta-lbl{display:block;font-size:7.5px;font-weight:800;color:#666;text-transform:uppercase}
.meta-val{font-size:9.8px;font-weight:800;color:#111;line-height:1.3}
.mono{font-family:ui-monospace,monospace;color:#1A3C6E}
.sig-row{display:flex;justify-content:space-between;margin-top:22px;padding-top:8px;border-top:1px solid #aaa}
.sig-box{text-align:center;min-width:140px}
.sig-line{border-bottom:1px solid #444;height:30px;margin-bottom:3px}
.sig-label{font-size:8.5px;color:#444}
${imgBodyCSS}
@media print{button{display:none}}
</style></head><body>
<div class="hdr">
  <div class="hdr-info">
    ${logoHtml}
    <div class="hdr-title">${consentName}</div>
  </div>
  <div class="pt-meta">${ptParts}</div>
</div>
<div class="body-wrap">
  ${bodyHTML}
</div>
${sigHTML}
<script>window.onload=()=>window.print()<\/script>
</body></html>`;
}

async function saveConsentFromText() {
  const text    = document.getElementById('cup-consent-text')?.value?.trim();
  const name    = document.getElementById('cup-consent-name')?.value?.trim();
  const dept    = document.getElementById('cup-consent-dept')?.value || 'all';
  const docType = document.getElementById('cup-consent-type')?.value || 'consent';
  if(!text || !name) { showToast('Please enter both name and text','w'); return; }
  const key = fbKey();
  const createdAt = new Date().toISOString();
  try {
    await fbSet('consentLibrary/' + key, { id:key, name, text, type:'text', dept, docType, createdAt, createdBy:CURRENT_USER?.name||'Admin' });
    showToast((docType==='form'?'Form':'Consent') + ' "' + name + '" saved ✓','s');
    closeM('m-consent-upload');
    refreshConsentLibrary && refreshConsentLibrary();
    loadCustomConsentsForSettings && loadCustomConsentsForSettings();
    renderStructuredConsentList && renderStructuredConsentList();
  } catch(e) {
    showToast('Save failed: ' + e.message,'w');
  }
}

function saveConsentFromImage() {
  const name    = document.getElementById('cup-img-name')?.value?.trim();
  const dept    = document.getElementById('cup-img-dept')?.value || 'all';
  const docType = document.getElementById('cup-img-type')?.value || 'consent';
  const thumb   = document.getElementById('cup-img-thumb');
  const imgSrc  = thumb?._dataUrl;
  if(!name) { showToast('Please enter name','w'); return; }
  const key = fbKey();
  fbSet('consentLibrary/' + key, { id:key, name, dept, docType, imgSrc:imgSrc||null, type:'image', createdAt:new Date().toISOString(), createdBy:CURRENT_USER?.name||'Admin' })
    .then(() => {
      showToast((docType==='form'?'Form':'Consent') + ' "' + name + '" saved ✓','s');
      closeM('m-consent-upload');
      refreshConsentLibrary && refreshConsentLibrary();
      loadCustomConsentsForSettings && loadCustomConsentsForSettings();
    })
    .catch(e => showToast('Save failed: ' + e.message,'w'));
}

function updateConsentPatientHeader() {
  const ptId  = document.getElementById('ophtho-pt-uid')?.textContent?.trim() || '—';
  const ptObj = PATIENTS.find(p=>p.bmhId===ptId) || {};
  const ptNm  = ptObj.name || document.getElementById('ophtho-pt-nm')?.textContent || '— Select a patient first —';
  const today = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
  const set = (id, val) => { const e=document.getElementById(id); if(e) e.textContent=val; };
  set('cph-name',   ptNm);
  set('cph-id',     ptId);
  set('cph-age',    (ptObj.age||'—') + ' / ' + (ptObj.sex||'—'));
  set('cph-mob',    ptObj.mob||'—');
  set('cph-doctor', CURRENT_USER?.name || '—');
  set('cph-date',   today);
}

function printConsentPageWithHeader() {
  const pt = _getConsentPatientHeader();
  const sel = document.getElementById('consent-type-sel');
  const consentType = sel?.options[sel?.selectedIndex]?.text || 'Consent Form';
  const bodyEl = document.getElementById('consent-content');
  const bodyHTML = bodyEl ? bodyEl.innerHTML : '';
  const win = window.open('','_blank','width=900,height=700');
  win.document.write(_consentPrintHTML(pt, consentType, bodyHTML, null));
  win.document.close();
}

function refreshConsentLibrary() {
  fbOnce('consentLibrary', data => {
    if(!data) return;
    const list = document.getElementById('consent-forms-list');
    if(!list) return;
    const items = Object.values(data).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
    // Prepend to existing content without destroying built-in consents
    const existingCustom = list.querySelector('.custom-consents-section');
    const sec = existingCustom || document.createElement('div');
    sec.className = 'custom-consents-section';
    sec.innerHTML = '<div style="font-size:10px;font-weight:800;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin:10px 0 6px">Custom / Uploaded Consents</div>' +
      items.map(c => {
        const icon   = c.type==='image' ? '🖼️' : '📝';
        const dtBadge = c.docType==='form'
          ? '<span style="font-size:9px;background:#e8e8e8;color:#555;border-radius:4px;padding:1px 5px;font-weight:700">FORM</span>'
          : '<span style="font-size:9px;background:#e8f0ff;color:#1A3C6E;border-radius:4px;padding:1px 5px;font-weight:700">CONSENT</span>';
        return `<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--g6);border-radius:8px;margin-bottom:5px">
          <span>${icon}</span>
          <span style="flex:1;font-size:12.5px;font-weight:700">${c.name}</span>
          ${dtBadge}
          <button class="btn btn-xs btn-gold" onclick="editUploadedConsent('${c.id}')">✏️ Edit</button>
          <button class="btn btn-xs btn-outline" onclick="printCustomConsent('${c.id}')">🖨️ Print</button>
          <button class="btn btn-xs btn-gray" onclick="deleteCustomConsent('${c.id}')">🗑️</button>
        </div>`;
      }).join('');
    if(!existingCustom) list.appendChild(sec);
  });
}
function editUploadedConsent(id) {
  fbOnce('consentLibrary/' + id, function (data) {
    if (!data) { showToast('Consent not found', 'w'); return; }
    const newName = prompt('Edit document name', data.name || '');
    if (newName === null) return;
    const newDept = prompt('Department key: ophtho / obg / psych / skin / all', data.dept || 'all');
    if (newDept === null) return;
    if (data.type === 'image') {
      fbUpdate('consentLibrary/' + id, { name: newName.trim() || data.name, dept: normalizeSurgeryPackDeptKey(newDept) || data.dept || 'all' }).then(function () {
        showToast('Document updated ✓', 's');
        refreshConsentLibrary();
        loadCustomConsentsForSettings && loadCustomConsentsForSettings();
      });
      return;
    }
    const newText = prompt('Edit wording', data.text || data.body || '');
    if (newText === null) return;
    fbUpdate('consentLibrary/' + id, {
      name: newName.trim() || data.name,
      dept: normalizeSurgeryPackDeptKey(newDept) || data.dept || 'all',
      text: newText
    }).then(function () {
      showToast('Document updated ✓', 's');
      refreshConsentLibrary();
      loadCustomConsentsForSettings && loadCustomConsentsForSettings();
    });
  });
}

function printCustomConsent(id) {
  fbOnce('consentLibrary/' + id, async data => {
    if(!data) { showToast('Consent not found','w'); return; }
    const ctx = collectConsentPrintContext();
    const pageHtml = renderPackDocumentPages(id, ctx);
    if (!pageHtml) { showToast('Nothing to print for this document', 'w'); return; }
    safePrint('<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif}@page{size:A4;margin:0}</style></head><body>' + pageHtml + '</body></html>');
  });
}

function deleteCustomConsent(id) {
  if(!confirm('Delete this consent from the library?')) return;
  fbRemove('consentLibrary/' + id).then(()=>{
    showToast('Deleted ✓','s');
    refreshConsentLibrary();
    loadCustomConsentsForSettings && loadCustomConsentsForSettings();
  });
}


// ── Safe Firebase helpers ────────────────────────────────────
function fbSet(path, data)    { return window.FBDB ? window.FBDB.ref(path).set(data)    : Promise.resolve(); }
function fbPush(path, data)   { return window.FBDB ? window.FBDB.ref(path).push(data)   : Promise.resolve(); }
function fbUpdate(path, data) { return window.FBDB ? window.FBDB.ref(path).update(data) : Promise.resolve(); }
function fbRemove(path)       { return window.FBDB ? window.FBDB.ref(path).remove()     : Promise.resolve(); }
function fbOn(path, cb)       { if (window.FBDB) window.FBDB.ref(path).on('value', function(s){ cb(s.val()); }); }
function fbOnce(path, cb) {
  // Supports BOTH callback: fbOnce(path, fn)  AND  promise: fbOnce(path).then(fn)
  if (!window.FBDB) { if (typeof cb === 'function') cb(null); return Promise.resolve(null); }
  var p = window.FBDB.ref(path).once('value').then(function(s){ return s.val(); });
  if (typeof cb === 'function') { p.then(cb).catch(function(){}); }
  return p;
}
function fbKey()              { return window.FBDB ? window.FBDB.ref().push().key : 'local-' + Date.now(); }
function todayKey()           { return new Date().toISOString().split('T')[0]; }
// ═══════════════════════════════════════════════════════════
// V35 ADDITIONS
// ═══════════════════════════════════════════════════════════

// ── REMEMBER ME — save/load credentials ────────────────────
(function initRememberMe() {
  try {
    const saved = localStorage.getItem('bmh_saved_creds');
    if(saved) {
      const {u, p} = JSON.parse(saved);
      const ui = document.getElementById('lg-email') || document.getElementById('lg-user');
      const pi = document.getElementById('lg-pass');
      const ri = document.getElementById('lg-remember');
      if(ui) ui.value = u || '';
      if(pi) pi.value = p || '';
      if(ri) ri.checked = true;
    }
  } catch(e){}
})();

// Patch loginUser to save credentials

// Remember-me handled in main loginUser


// ── PHONE NUMBER PATIENT LOOKUP ──────────────────────────────
function filterRcExist(val) {
  const list = document.getElementById('rc-exist-list');
  const phoneMatches = document.getElementById('rc-phone-matches');
  if(!val) {
    if(phoneMatches) phoneMatches.style.display = 'none';
    renderReceptionPage && renderReceptionPage();
    return;
  }
  const v = val.toLowerCase().trim();
  const isPhone = /^[6-9]\d{4,}$/.test(val.replace(/\s/g,''));

  const pool = typeof getReceptionBasePts === 'function' ? getReceptionBasePts() : PATIENTS;
  const matched = pool.filter(p =>
    p.name?.toLowerCase().includes(v) ||
    p.bmhId?.toLowerCase().includes(v) ||
    p.mob?.replace(/\s/g,'').includes(val.replace(/\s/g,''))
  );

  if(isPhone && phoneMatches) {
    const phoneHits = PATIENTS.filter(p => p.mob?.replace(/\s/g,'').includes(val.replace(/\s/g,'')));
    if(phoneHits.length > 0) {
      phoneMatches.style.display = 'block';
      phoneMatches.innerHTML = phoneHits.map(p => `
        <div onclick="selectFollowUpPatient('${p.bmhId}')"
          style="display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--g5)"
          onmouseover="this.style.background='var(--blue-lt)'" onmouseout="this.style.background=''">
          <div style="width:34px;height:34px;border-radius:50%;background:${p.color||'var(--bmh-blue)'};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;flex-shrink:0">${p.initials||p.name[0]}</div>
          <div style="flex:1">
            <div style="font-weight:800;font-size:13px">${p.name}</div>
            <div style="font-size:10.5px;color:var(--g1)">${p.bmhId} · ${p.dept} · ${p.mob||'—'}</div>
          </div>
          <div style="font-size:10px;background:var(--blue);color:#fff;border-radius:5px;padding:3px 8px;font-weight:700">Select →</div>
        </div>`).join('');
    } else {
      phoneMatches.style.display = 'none';
    }
  } else {
    if(phoneMatches) phoneMatches.style.display = 'none';
  }

  if(list) {
    if(typeof buildQTableRow === 'function') {
      list.innerHTML = matched.length
        ? matched.map((p,i)=>buildQTableRow(p,i+1)).join('')
        : '<tr><td colspan="10" style="text-align:center;padding:20px;color:var(--g1);font-size:13px">No patients found</td></tr>';
    } else {
      list.innerHTML = matched.length ? renderExistingPatients(matched) :
        '<div style="padding:20px;text-align:center;color:var(--g1);font-size:13px">No patients found</div>';
    }
  }
}

function selectFollowUpPatient(bmhId) {
  const p = PATIENTS.find(x => x.bmhId === bmhId);
  if(!p) return;
  // Close dropdown
  const pm = document.getElementById('rc-phone-matches');
  if(pm) pm.style.display = 'none';
  // Show confirmation toast
  showToast('✅ ' + p.name + ' selected for follow-up', 's');
  // Pre-fill the existing patient form context
  const si = document.getElementById('rc-search-inp');
  if(si) si.value = p.name;
  // Add to today's queue
  p.status = 'waiting';
  p.seen = false;
  renderReceptionPage && renderReceptionPage();
  // Show the patient detail
  openPatient(bmhId);
}

function renderExistingPatients(pts) {
  if(!pts || !pts.length) return '<div style="padding:20px;text-align:center;color:var(--g1)">No patients registered yet</div>';
  return pts.map(p => `
    <div onclick="openPatient('${p.bmhId}')" style="display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:8px;cursor:pointer;margin-bottom:4px;border:1px solid var(--g5)"
      onmouseover="this.style.background='var(--g6)'" onmouseout="this.style.background=''">
      <div style="width:32px;height:32px;border-radius:50%;background:${p.color||'#1A3C6E'};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px;flex-shrink:0">${p.initials||p.name[0]}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:800;font-size:13px">${p.name}</div>
        <div style="font-size:10.5px;color:var(--g1)">${p.bmhId} · ${p.mob||'—'}</div>
      </div>
      <span class="badge bd-gray" style="font-size:9.5px">${p.dept||'—'}</span>
    </div>`).join('');
}

// ── DRUG LIBRARY — 200+ common medicines ────────────────────
const DRUG_LIBRARY_FULL = [
  // EYE DROPS
  {name:'Vigamox Eye Drops',brand:'Moxifloxacin 0.5%',type:'Eye Drop',dept:'ophtho',freq:'Four times (QID)',dur:'1 Week',eye:'Both Eyes (OU)'},
  {name:'Pred Forte Eye Drops',brand:'Prednisolone Acetate 1%',type:'Eye Drop',dept:'ophtho',freq:'Four times (QID)',dur:'4 Weeks (taper)',eye:'Both Eyes (OU)'},
  {name:'Refresh Tears Eye Drops',brand:'Carboxymethylcellulose 0.5%',type:'Eye Drop',dept:'ophtho',freq:'As needed (PRN)',dur:'1 Month',eye:'Both Eyes (OU)'},
  {name:'Timoptol Eye Drops',brand:'Timolol Maleate 0.5%',type:'Eye Drop',dept:'ophtho',freq:'Twice daily (BD)',dur:'Ongoing',eye:'Both Eyes (OU)'},
  {name:'Cosopt Eye Drops',brand:'Dorzolamide 2% + Timolol 0.5%',type:'Eye Drop',dept:'ophtho',freq:'Twice daily (BD)',dur:'Ongoing',eye:'Both Eyes (OU)'},
  {name:'Alphagan P Eye Drops',brand:'Brimonidine 0.1%',type:'Eye Drop',dept:'ophtho',freq:'Three times (TDS)',dur:'Ongoing',eye:'Both Eyes (OU)'},
  {name:'Xalatan Eye Drops',brand:'Latanoprost 0.005%',type:'Eye Drop',dept:'ophtho',freq:'At bedtime (HS)',dur:'Ongoing',eye:'Both Eyes (OU)'},
  {name:'Cyclopentolate 1% Eye Drops',brand:'Cyclopentolate HCl 1%',type:'Eye Drop',dept:'ophtho',freq:'Twice (for cycloplegia)',dur:'1 Day',eye:'Both Eyes (OU)'},
  {name:'Atropine 1% Eye Drops',brand:'Atropine Sulphate 1%',type:'Eye Drop',dept:'ophtho',freq:'Twice daily (BD)',dur:'3 Weeks',eye:'Both Eyes (OU)'},
  {name:'Tobramycin Eye Drops',brand:'Tobramycin 0.3%',type:'Eye Drop',dept:'ophtho',freq:'Four times (QID)',dur:'1 Week',eye:'Both Eyes (OU)'},
  {name:'Moxicip Eye Drops',brand:'Moxifloxacin 0.5%',type:'Eye Drop',dept:'ophtho',freq:'Four times (QID)',dur:'1 Week',eye:'Both Eyes (OU)'},
  {name:'Flurometholone 0.1% Eye Drops',brand:'FML Eye Drops',type:'Eye Drop',dept:'ophtho',freq:'Four times (QID)',dur:'2 Weeks (taper)',eye:'Both Eyes (OU)'},
  {name:'Ketorolac 0.5% Eye Drops',brand:'Acular Eye Drops',type:'Eye Drop',dept:'ophtho',freq:'Four times (QID)',dur:'2 Weeks',eye:'Both Eyes (OU)'},
  {name:'Nepafenac 0.1% Eye Drops',brand:'Nevanac Eye Drops',type:'Eye Drop',dept:'ophtho',freq:'Three times (TDS)',dur:'4 Weeks',eye:'Both Eyes (OU)'},
  {name:'Cyclosporine 0.05% Eye Drops',brand:'Restasis Eye Drops',type:'Eye Drop',dept:'ophtho',freq:'Twice daily (BD)',dur:'Ongoing',eye:'Both Eyes (OU)'},
  {name:'Tropicamide 1% Eye Drops',brand:'Mydriacyl Eye Drops',type:'Eye Drop',dept:'ophtho',freq:'Once (for dilation)',dur:'1 Day',eye:'Both Eyes (OU)'},
  {name:'Lubricating Eye Drops',brand:'Hypromellose 0.3%',type:'Eye Drop',dept:'ophtho',freq:'Four times (QID)',dur:'1 Month',eye:'Both Eyes (OU)'},
  {name:'Sodium Hyaluronate Eye Drops',brand:'Oxyal Eye Drops',type:'Eye Drop',dept:'ophtho',freq:'As needed (PRN)',dur:'1 Month',eye:'Both Eyes (OU)'},
  // OBG
  {name:'Folic Acid 5mg',brand:'Folvite',type:'Tablet',dept:'obg',freq:'Once daily (OD)',dur:'3 Months',eye:'Oral'},
  {name:'Ferrous Sulphate + Folic Acid',brand:'Orofer-XT',type:'Tablet',dept:'obg',freq:'Once daily (OD)',dur:'3 Months',eye:'Oral'},
  {name:'Calcium + Vitamin D3',brand:'Shelcal 500',type:'Tablet',dept:'obg',freq:'Twice daily (BD)',dur:'3 Months',eye:'Oral'},
  {name:'Progesterone 200mg',brand:'Susten / Duphaston',type:'Capsule/Tablet',dept:'obg',freq:'At bedtime (HS)',dur:'12 Weeks',eye:'Oral'},
  {name:'Dydrogesterone 10mg',brand:'Duphaston',type:'Tablet',dept:'obg',freq:'Twice daily (BD)',dur:'As directed',eye:'Oral'},
  {name:'Isoxsuprine 10mg',brand:'Duvadilan',type:'Tablet',dept:'obg',freq:'Three times (TDS)',dur:'2 Weeks',eye:'Oral'},
  {name:'Methyldopa 250mg',brand:'Aldomet',type:'Tablet',dept:'obg',freq:'Three times (TDS)',dur:'Ongoing',eye:'Oral'},
  {name:'Labetalol 100mg',brand:'Labetalol',type:'Tablet',dept:'obg',freq:'Twice daily (BD)',dur:'Ongoing',eye:'Oral'},
  {name:'Nifedipine 10mg (SR)',brand:'Depin Retard',type:'Tablet',dept:'obg',freq:'Twice daily (BD)',dur:'As directed',eye:'Oral'},
  {name:'Ondansetron 4mg',brand:'Emeset / Zofran',type:'Tablet',dept:'obg',freq:'Twice daily (BD)',dur:'1 Week',eye:'Oral'},
  {name:'Metformin 500mg',brand:'Glyciphage',type:'Tablet',dept:'obg',freq:'Twice daily (BD)',dur:'Ongoing',eye:'Oral'},
  // PSYCH
  {name:'Sertraline 50mg',brand:'Zoloft / Serlift',type:'Tablet',dept:'psych',freq:'Once daily (OD)',dur:'3 Months',eye:'Oral'},
  {name:'Escitalopram 10mg',brand:'Nexito / Cipralex',type:'Tablet',dept:'psych',freq:'Once daily (OD)',dur:'3 Months',eye:'Oral'},
  {name:'Olanzapine 5mg',brand:'Oleanz / Zyprexa',type:'Tablet',dept:'psych',freq:'At bedtime (HS)',dur:'As directed',eye:'Oral'},
  {name:'Risperidone 2mg',brand:'Sizodon / Risperdal',type:'Tablet',dept:'psych',freq:'Twice daily (BD)',dur:'As directed',eye:'Oral'},
  {name:'Clonazepam 0.5mg',brand:'Clonotril',type:'Tablet',dept:'psych',freq:'At bedtime (HS)',dur:'1 Month',eye:'Oral'},
  {name:'Lorazepam 1mg',brand:'Ativan',type:'Tablet',dept:'psych',freq:'At bedtime (HS)',dur:'2 Weeks',eye:'Oral'},
  {name:'Quetiapine 25mg',brand:'Seroquel / Quetipin',type:'Tablet',dept:'psych',freq:'At bedtime (HS)',dur:'As directed',eye:'Oral'},
  {name:'Lithium Carbonate 300mg',brand:'Lithosun',type:'Tablet',dept:'psych',freq:'Twice daily (BD)',dur:'Ongoing',eye:'Oral'},
  {name:'Valproate 500mg (CR)',brand:'Valparin CR',type:'Tablet',dept:'psych',freq:'Twice daily (BD)',dur:'Ongoing',eye:'Oral'},
  {name:'Buspirone 10mg',brand:'Buspin',type:'Tablet',dept:'psych',freq:'Twice daily (BD)',dur:'1 Month',eye:'Oral'},
  // SKIN
  {name:'Tretinoin 0.025% Cream',brand:'Retino-A',type:'Cream',dept:'skin',freq:'At bedtime (HS)',dur:'3 Months',eye:'Topical'},
  {name:'Clindamycin 1% Gel',brand:'Clindac-A',type:'Gel',dept:'skin',freq:'Twice daily (BD)',dur:'6 Weeks',eye:'Topical'},
  {name:'Clindamycin + Nicotinamide Gel',brand:'Clindac A-B',type:'Gel',dept:'skin',freq:'Once daily (OD)',dur:'6 Weeks',eye:'Topical'},
  {name:'Mometasone 0.1% Cream',brand:'Elocon',type:'Cream',dept:'skin',freq:'Once daily (OD)',dur:'2 Weeks',eye:'Topical'},
  {name:'Tacrolimus 0.1% Ointment',brand:'Tacromus / Protopic',type:'Ointment',dept:'skin',freq:'Twice daily (BD)',dur:'3 Months',eye:'Topical'},
  {name:'Miconazole + Hydrocortisone Cream',brand:'Canflu-HC',type:'Cream',dept:'skin',freq:'Twice daily (BD)',dur:'2 Weeks',eye:'Topical'},
  {name:'Ketoconazole 2% Shampoo',brand:'Nizoral',type:'Shampoo',dept:'skin',freq:'Twice weekly',dur:'4 Weeks',eye:'Topical'},
  {name:'Azelaic Acid 20% Cream',brand:'Aziderm',type:'Cream',dept:'skin',freq:'Twice daily (BD)',dur:'3 Months',eye:'Topical'},
  {name:'Isotretinoin 20mg',brand:'Isotroin / Accutane',type:'Capsule',dept:'skin',freq:'Once daily (OD)',dur:'6 Months',eye:'Oral'},
  {name:'Doxycycline 100mg',brand:'Doxt-SL',type:'Capsule',dept:'skin',freq:'Once daily (OD)',dur:'6 Weeks',eye:'Oral'},
  {name:'Hydroxychloroquine 200mg',brand:'HCQ / Plaquenil',type:'Tablet',dept:'skin',freq:'Once daily (OD)',dur:'3 Months',eye:'Oral'},
  // COMMON / GENERAL
  {name:'Paracetamol 500mg',brand:'Crocin / Dolo',type:'Tablet',dept:'all',freq:'Three times (TDS)',dur:'5 Days',eye:'Oral'},
  {name:'Ibuprofen 400mg',brand:'Brufen',type:'Tablet',dept:'all',freq:'Three times (TDS)',dur:'5 Days',eye:'Oral'},
  {name:'Amoxicillin 500mg',brand:'Mox',type:'Capsule',dept:'all',freq:'Three times (TDS)',dur:'7 Days',eye:'Oral'},
  {name:'Azithromycin 500mg',brand:'Azee / Zithromax',type:'Tablet',dept:'all',freq:'Once daily (OD)',dur:'3 Days',eye:'Oral'},
  {name:'Cetirizine 10mg',brand:'Zyrtec / Allecet',type:'Tablet',dept:'all',freq:'At bedtime (HS)',dur:'2 Weeks',eye:'Oral'},
  {name:'Pantoprazole 40mg',brand:'Pan / Pantodac',type:'Tablet',dept:'all',freq:'Once daily (OD)',dur:'4 Weeks',eye:'Oral'},
];

// ── Drug quick search: Settings DRUG_LIBRARY + built-in DRUG_LIBRARY_FULL ───────
let rxQuickPickList = [];
function rxQuickSearch(val) {
  val = (val || '').trim();
  const activeRxTab = document.querySelector('.tab-content.active[id$="-rx"], .tab-content.active[id="oe-rx"]');
  const dd = activeRxTab ? activeRxTab.querySelector('[id="rx-quick-dropdown"]') : null;
  const targetDd = dd || document.getElementById('rx-quick-dropdown');
  if (!targetDd) return;

  if (val.length < 2) { targetDd.style.display = 'none'; rxQuickPickList = []; return; }

  const v = val.toLowerCase();
  const tabId = activeRxTab?.id?.replace('-rx', '') || 'oe';
  const deptMap = { oe: 'ophtho', obg: 'obg', psych: 'psych', skin: 'skin' };
  const deptKey = deptMap[tabId] || 'ophtho';
  const deptLabel = { oe: 'Ophthalmology', obg: 'OBG', psych: 'Neuropsychiatry', skin: 'Skin' }[tabId] || '';

  const libSettings = typeof DRUG_LIBRARY !== 'undefined' ? DRUG_LIBRARY : [];
  const fromSettings = libSettings.filter(d => {
    if (!rxDrugMatchesDept(d, deptKey, deptLabel)) return false;
    return String(d.trade || '').toLowerCase().includes(v) || String(d.generic || '').toLowerCase().includes(v);
  }).slice(0, 8);

  const fromFull = (typeof DRUG_LIBRARY_FULL !== 'undefined' ? DRUG_LIBRARY_FULL : []).filter(d =>
    rxDrugMatchesDept(d, deptKey, deptLabel) &&
    (d.name.toLowerCase().includes(v) || d.brand.toLowerCase().includes(v))
  ).slice(0, 8);

  rxQuickPickList = [
    ...fromSettings.map(d => ({ kind: 'settings', d })),
    ...fromFull.map(d => ({ kind: 'full', d }))
  ].slice(0, 14);

  if (!rxQuickPickList.length) { targetDd.style.display = 'none'; return; }

  targetDd.style.display = 'block';
  targetDd.innerHTML = rxQuickPickList.map((item, i) => {
    if (item.kind === 'settings') {
      const d = item.d;
      return `<div onclick="selectRxQuickPick(${i})" style="padding:8px 12px;cursor:pointer;border-bottom:1px solid var(--g5)" onmouseover="this.style.background='var(--blue-lt)'" onmouseout="this.style.background=''">
        <div style="font-size:10px;font-weight:800;color:var(--green);text-transform:uppercase">Settings</div>
        <div style="font-size:13px;font-weight:900;color:#1A3C6E">${d.trade}</div>
        <div style="font-size:10.5px;color:var(--g1);font-style:italic">${d.generic ? '('+d.generic+')' : ''}</div>
        <div style="font-size:10.5px;color:var(--g1)">${d.type} · ${d.freq} · ${d.dur}</div>
      </div>`;
    }
    const d = item.d;
    return `<div onclick="selectRxQuickPick(${i})" style="padding:8px 12px;cursor:pointer;border-bottom:1px solid var(--g5)" onmouseover="this.style.background='var(--blue-lt)'" onmouseout="this.style.background=''">
      <div style="font-size:10px;font-weight:800;color:var(--bmh-teal);text-transform:uppercase">Built-in</div>
      <div style="font-size:13px;font-weight:900;color:#1A3C6E">${d.brand || d.name}</div>
      <div style="font-size:10.5px;color:var(--g1);font-style:italic">${d.name ? '('+d.name+')' : ''}</div>
      <div style="font-size:10.5px;color:var(--g1)">${d.type} · ${d.freq} · ${d.dur}</div>
    </div>`;
  }).join('');
}

function selectRxQuickPick(i) {
  const item = rxQuickPickList[i];
  if (!item) return;
  if (item.kind === 'settings') {
    const d = item.d;
    rxQuickSelectedDrug = { _from: 'settings', trade: d.trade, generic: d.generic, type: d.type, freq: d.freq, dur: d.dur, dept: d.dept };
    const inp = document.getElementById('rx-quick-search');
    if (inp) inp.value = d.trade;
  } else {
    rxQuickSelectedDrug = Object.assign({ _from: 'full' }, item.d);
    const inp = document.getElementById('rx-quick-search');
    if (inp) inp.value = item.d.brand || item.d.name;
  }
  const activeRxTab = document.querySelector('.tab-content.active[id$="-rx"], .tab-content.active[id="oe-rx"]');
  const dd = activeRxTab ? activeRxTab.querySelector('[id="rx-quick-dropdown"]') : document.getElementById('rx-quick-dropdown');
  if (dd) dd.style.display = 'none';
  addRxFromQuick();
}

function selectRxQuickDrug(idx) {
  const lib = typeof DRUG_LIBRARY_FULL !== 'undefined' ? DRUG_LIBRARY_FULL : [];
  const d = lib[idx];
  if (!d) return;
  rxQuickSelectedDrug = Object.assign({ _from: 'full' }, d);
  const inp = document.getElementById('rx-quick-search');
  if (inp) inp.value = d.brand || d.name;
  const activeRxTab = document.querySelector('.tab-content.active[id$="-rx"], .tab-content.active[id="oe-rx"]');
  const dd = activeRxTab ? activeRxTab.querySelector('[id="rx-quick-dropdown"]') : document.getElementById('rx-quick-dropdown');
  if (dd) dd.style.display = 'none';
  addRxFromQuick();
}

// ── AUTO-COMPLETE for reception phone search ─────────────────
// Override filterRcExist to handle the phone lookup
// (function defined above in V35 additions block)

// ═══════════════════════════════════════════════════════════════
// V36 ADDITIONS — Points 1, 1a, 1b, 4, 8, 10 (print apts)
// ═══════════════════════════════════════════════════════════════

// ── POINT 4: Print Templates — patient selector ───────────────
function renderPrintTemplates() {
  const el = document.getElementById('pg-print-templates') || document.getElementById('print-template-content');
  if(!el) return;
  // Populate patient selector if it exists
  const sel = document.getElementById('pt-print-sel');
  if(sel && PATIENTS.length) {
    sel.innerHTML = '<option value="">— Select Patient —</option>' +
      PATIENTS.slice(0,200).map(p=>`<option value="${p.bmhId}">${p.name} · ${p.bmhId}</option>`).join('');
  }
}

// ── POINT 8: AI ASSISTANT (calls Claude API) ─────────────────
let aiChatOpen = false;
let aiMessages = [];



function injectAIPanel() {
  const panel = document.createElement('div');
  panel.id = 'ai-panel';
  panel.style.cssText = 'position:fixed;bottom:80px;right:16px;width:360px;max-height:520px;z-index:9000;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.18);display:flex;flex-direction:column;border:1.5px solid var(--bmh-blue);overflow:hidden';
  panel.innerHTML = `
    <div style="background:var(--bmh-blue);color:#fff;padding:12px 16px;display:flex;align-items:center;gap:8px;flex-shrink:0">
      <div style="font-size:18px">🤖</div>
      <div style="flex:1"><div style="font-weight:800;font-size:13px">BMH AI Assistant</div><div style="font-size:10px;opacity:.7">Powered by Claude</div></div>
      <button onclick="toggleAI()" style="background:rgba(255,255,255,.2);border:none;color:#fff;border-radius:6px;padding:4px 8px;cursor:pointer;font-size:12px">✕</button>
    </div>
    <div id="ai-msgs" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;min-height:200px;max-height:340px"></div>
    <div style="padding:10px;border-top:1px solid var(--g5);flex-shrink:0">
      <div style="display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap">
        <button onclick="aiQuick('Summarise current patient')" class="btn btn-xs btn-outline" style="font-size:10px">Patient Summary</button>
        <button onclick="aiQuick('Write a referral letter')" class="btn btn-xs btn-outline" style="font-size:10px">Referral Letter</button>
        <button onclick="aiQuick('Generate discharge summary')" class="btn btn-xs btn-outline" style="font-size:10px">Discharge</button>
        <button onclick="aiQuick('List today appointments')" class="btn btn-xs btn-outline" style="font-size:10px">Appointments</button>
      </div>
      <div style="display:flex;gap:6px">
        <input id="ai-inp" type="text" placeholder="Ask anything about this patient…" 
          style="flex:1;font-size:12px;border:1.5px solid var(--g4);border-radius:8px;padding:7px 10px;font-family:var(--font)"
          onkeydown="if(event.key==='Enter')sendAI()">
        <button onclick="sendAI()" class="btn btn-gold" style="font-size:12px;padding:7px 12px">Send</button>
      </div>
    </div>`;
  document.body.appendChild(panel);
  aiChatOpen = true;
  const page = document.getElementById('ptitle')?.textContent || 'Dashboard';
  aiMessages.push({role:'assistant', content:`Hi! I'm your BMH HMS AI assistant. You're on **${page}**. How can I help?`});
  renderAIChat();
}

function renderAIChat() {
  const el = document.getElementById('ai-msgs'); if(!el) return;
  el.innerHTML = aiMessages.map(m => `
    <div style="display:flex;gap:7px;align-items:flex-start;${m.role==='user'?'flex-direction:row-reverse':''}">
      <div style="width:28px;height:28px;border-radius:50%;background:${m.role==='user'?'var(--bmh-blue)':'var(--bmh-gold)'};display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">${m.role==='user'?'👤':'🤖'}</div>
      <div style="max-width:85%;background:${m.role==='user'?'var(--bmh-blue)':'var(--g6)'};color:${m.role==='user'?'#fff':'var(--tx1)'};border-radius:${m.role==='user'?'12px 2px 12px 12px':'2px 12px 12px 12px'};padding:9px 12px;font-size:12px;line-height:1.6;white-space:pre-wrap">${m.content}</div>
    </div>`).join('');
  el.scrollTop = el.scrollHeight;
}



async function sendAI() {
  const inp = document.getElementById('ai-inp'); if(!inp) return;
  const msg = inp.value.trim(); if(!msg) return;
  inp.value = '';

  // Build context from current page
  const page    = document.getElementById('ptitle')?.textContent || '';
  const ptName  = document.querySelector('[id$="-pt-nm"]')?.textContent || document.getElementById('ophtho-pt-nm')?.textContent || '';
  const ptId    = document.getElementById('ophtho-pt-uid')?.textContent || '';
  const cc      = document.getElementById('cc-text')?.value || '';
  const advice  = document.querySelector('textarea[id$="-advice"]')?.value || '';
  const drugs   = RX_DRUGS.map(d=>d.name+' '+d.freq+' '+d.dur).join('; ') || '';
  const dxEls   = document.querySelectorAll('[id$="-dx-list"] .dx-inp');
  const dx      = Array.from(dxEls).map(e=>e.value).filter(Boolean).join('; ');

  const systemCtx = `You are a medical AI assistant for Baweja Multispeciality Hospital (BMH), Chandigarh & Ropar. 
Current page: ${page}. Patient: ${ptName} (${ptId}). 
Chief complaint: ${cc}. Diagnosis: ${dx}. Medications: ${drugs}. Advice: ${advice}.
Respond concisely in bullet points. Always recommend consulting the doctor for clinical decisions.`;

  aiMessages.push({role:'user', content: msg});
  renderAIChat();

  // Show typing indicator
  aiMessages.push({role:'assistant', content:'…'});
  renderAIChat();

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system: systemCtx,
        messages: aiMessages.filter(m=>m.content!=='…').slice(-10)
      })
    });
    const data = await res.json();
    aiMessages.pop(); // remove typing indicator
    const reply = data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.';
    aiMessages.push({role:'assistant', content: reply});
  } catch(e) {
    aiMessages.pop();
    aiMessages.push({role:'assistant', content:'Connection error. Please check your internet and try again.'});
  }
  renderAIChat();
}

// Inject AI floating button on load
setTimeout(() => {
  if(!document.getElementById('ai-fab')) {
    const fab = document.createElement('button');
    fab.id = 'ai-fab';
    fab.onclick = toggleAI;
    fab.title = 'BMH AI Assistant';
    fab.style.cssText = 'position:fixed;bottom:16px;right:16px;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--bmh-blue),var(--bmh-teal));color:#fff;border:none;font-size:22px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.25);z-index:8999;display:flex;align-items:center;justify-content:center;transition:transform .2s';
    fab.innerHTML = '🤖';
    fab.onmouseover = ()=>fab.style.transform='scale(1.1)';
    fab.onmouseout  = ()=>fab.style.transform='scale(1)';
    document.body.appendChild(fab);
  }
}, 800);

// ── POINT 10: Print Appointments by date with phone numbers ──


// Add print appointments button to appointments page on nav
const _navV36 = window.nav;
window.nav = function(id, el) {
  _navV36(id, el);
  const _nk = (typeof id === 'string' && id.startsWith('pg-')) ? id.slice(3) : id;
  if(_nk === 'appointments') {
    setTimeout(() => {
      const hd = document.querySelector('#pg-appointments .card-hd');
      if(hd && !document.getElementById('apt-print-btn')) {
        const btn = document.createElement('button');
        btn.id = 'apt-print-btn';
        btn.className = 'btn btn-sm btn-outline';
        btn.innerHTML = '🖨️ Print List';
        btn.onclick = printAppointments;
        hd.appendChild(btn);
      }
    }, 100);
  }
};

// ── POINT 1: Settings - CSV Import ───────────────────────────
function importPatientsCSV(file) {
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h=>h.trim().replace(/"/g,''));
    
    let imported = 0, skipped = 0;
    const colors = ['#1A3C6E','#AF52DE','#34C759','#FF9500','#FF2D55','#5856D6'];
    
    for(let i=1; i<lines.length; i++) {
      const line = lines[i];
      if(!line.trim()) continue;
      
      // Parse CSV row (handle quoted fields)
      const cols = [];
      let cur = '', inQ = false;
      for(let ch of line) {
        if(ch==='"') inQ=!inQ;
        else if(ch===',' && !inQ) { cols.push(cur); cur=''; }
        else cur+=ch;
      }
      cols.push(cur);
      
      const row = {};
      headers.forEach((h,j) => row[h] = (cols[j]||'').trim());
      
      const name = row['Name']||'';
      const mob  = row['Mobile']||'';
      const uid  = row['Patient UID']||'';
      if(!name) { skipped++; continue; }
      
      // Generate BMSH ID from UID
      const digits = uid.replace(/\D/g,'');
      const bmhId = digits ? 'BMSH-'+digits.slice(0,6).padStart(6,'0') : 'BMSH-'+String(Date.now()).slice(-6);
      
      // Check if already exists
      if(PATIENTS.find(p=>p.bmhId===bmhId||p.mob===mob)) { skipped++; continue; }
      
      const ageMatch = (row['Age']||'').match(/(\d+)/);
      const pt = {
        bmhId, name,
        initials: name.split(' ').slice(0,2).map(w=>w[0]?.toUpperCase()||'').join(''),
        color: colors[imported%6],
        age: ageMatch?ageMatch[1]:'—',
        sex: (row['Sex']||'').charAt(0).toUpperCase()+(row['Sex']||'').slice(1),
        dob: row['DOB']||'',
        mob: mob,
        email: row['Email']||'',
        address: row['Address']||'',
        uid: uid,
        dept: 'ophtho',
        centre: CURRENT_USER?.centre||'CHD',
        status: 'inactive',
        balance:0, advance:0, seen:false, dilated:false,
        sigHx: row['Significant History']||'',
        pastHx: row['Past History']||'',
        allergy: row['Allergy History']||''
      };
      
      PATIENTS.push(pt);
      if(window.FBDB) savePatientToFirebase(pt);
      imported++;
    }
    
    showToast(`✅ Imported ${imported} patients, skipped ${skipped} duplicates`, 's');
    renderDashboard && renderDashboard();
    renderReceptionPage && renderReceptionPage();
  };
  reader.readAsText(file);
}

// ── POINT 10: Follow-up date in prescription printout ─────────
// Patch printUnifiedRx to always show follow-up date
// (already reads fuDate — ensure it's displayed even if fuFormatted is blank)


function setPrintPatient(bmhId) {
  const p = PATIENTS.find(x=>x.bmhId===bmhId);
  const disp = document.getElementById('pt-print-display');
  if(disp) disp.textContent = p ? p.name+' · '+p.age+'Y · '+p.mob : '';
}

// ═══════════════════════════════════════════════════
// V37 FUNCTIONS
// ═══════════════════════════════════════════════════

// ── AI ASSISTANT ──────────────────────────────────
let aiPanelOpen = false;
function toggleAI() {
  const p = document.getElementById('ai-panel');
  if(!p) return;
  const isOpen = p.style.display === 'flex';
  p.style.display = isOpen ? 'none' : 'flex';
  if(!isOpen) { const inp=document.getElementById('ai-inp'); if(inp) inp.focus(); }
}

async function sendAIMessage() {
  const inp = document.getElementById('ai-inp');
  const msg = inp?.value?.trim(); if(!msg) return;
  inp.value = '';
  addAIMessage(msg, 'user');
  addAIMessage('Thinking…', 'ai', 'ai-thinking');

  // Build context from current patient
  const ptName = document.querySelector('[id$="-pt-nm"]')?.textContent || 'Patient';
  const ptId   = document.getElementById('ophtho-pt-uid')?.textContent || '—';
  const cc     = document.getElementById('cc-text')?.value || '';
  const dx     = Array.from(document.querySelectorAll('.dx-tag')).map(e=>e.textContent).join(', ');
  const drugs  = RX_DRUGS.map(d=>d.name+' '+d.freq).join(', ');
  const iop    = `OD ${document.getElementById('iop-gat-od')?.value||'—'} OS ${document.getElementById('iop-gat-os')?.value||'—'} mmHg`;

  const context = `Patient: ${ptName} (${ptId})
Current complaint: ${cc}
Diagnosis: ${dx || 'not set'}
Current medications: ${drugs || 'none'}
IOP: ${iop}
Module: ${document.getElementById('ptitle')?.textContent || 'unknown'}`;

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        system: `You are a clinical AI assistant for Baweja Multispeciality Hospital, Chandigarh & Ropar. 
You assist doctors with ophthalmology, OBG, psychiatry and dermatology cases.
Always respond with clear, numbered point-wise summaries. Be concise and clinically precise.
Patient context: ${context}`,
        messages: [{ role: 'user', content: msg }]
      })
    });
    const data = await resp.json();
    const thinking = document.getElementById('ai-thinking');
    if(thinking) thinking.remove();
    const reply = data?.content?.[0]?.text || 'Sorry, I could not get a response.';
    addAIMessage(reply, 'ai');
  } catch(e) {
    const thinking = document.getElementById('ai-thinking');
    if(thinking) thinking.remove();
    addAIMessage('⚠️ Could not connect. Check your internet connection.', 'ai');
  }
}

function addAIMessage(text, role, id) {
  const msgs = document.getElementById('ai-messages'); if(!msgs) return;
  const div = document.createElement('div');
  if(id) div.id = id;
  div.style.cssText = `border-radius:10px;padding:10px 12px;font-size:12px;line-height:1.7;white-space:pre-wrap;`
    + (role==='user' 
        ? 'background:var(--blue-lt);margin-left:20px;color:var(--bmh-blue);font-weight:600;text-align:right;'
        : 'background:var(--g6);margin-right:20px;');
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function aiQuick(prompt) {
  const inp = document.getElementById('ai-inp');
  if(inp) { inp.value = prompt; sendAIMessage(); }
}

// ── CSV IMPORT ────────────────────────────────────
function handleCsvImport(input) {
  const file = input.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = e => processCsvData(e.target.result);
  reader.readAsText(file, 'UTF-8');
}

function handleCsvDrop(e) {
  e.preventDefault();
  const file = e.dataTransfer.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => processCsvData(ev.target.result);
  reader.readAsText(file, 'UTF-8');
}

function processCsvData(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h=>h.replace(/"/g,'').trim());
  const nameCol = document.getElementById('csv-col-name')?.value||'Name';
  const mobCol  = document.getElementById('csv-col-mob')?.value||'Mobile';
  const ageCol  = document.getElementById('csv-col-age')?.value||'Age';
  const idCol   = document.getElementById('csv-col-id')?.value||'Clinic Specific Id';
  const colors  = ['#1A3C6E','#AF52DE','#34C759','#FF9500','#FF2D55','#5856D6'];

  const nameIdx = headers.indexOf(nameCol);
  const mobIdx  = headers.indexOf(mobCol);
  const ageIdx  = headers.indexOf(ageCol);
  const idIdx   = headers.indexOf(idCol);

  if(nameIdx < 0) { showToast('Name column not found in CSV','w'); return; }

  const progress = document.getElementById('csv-import-progress');
  const bar = document.getElementById('csv-progress-bar');
  const txt = document.getElementById('csv-progress-text');
  if(progress) progress.style.display = 'block';

  const newPts = [];
  for(let i=1; i<lines.length; i++) {
    const cols = lines[i].split(',').map(c=>c.replace(/"/g,'').trim());
    const name = cols[nameIdx]||'';
    if(!name) continue;
    const age = cols[ageIdx]||'';
    const ageMatch = age.match(/(\d+)/);
    const clinicId = idIdx>=0 ? cols[idIdx] : '';
    const pt = {
      bmhId: clinicId ? 'BMSH-'+clinicId : 'BMSH-'+Math.floor(Math.random()*900000+100000),
      name, age: ageMatch?ageMatch[1]+'Y':'',
      sex: '', mob: mobIdx>=0?cols[mobIdx]:'',
      initials: name.split(' ').slice(0,2).map(w=>w[0]||'').join('').toUpperCase(),
      color: colors[i%colors.length],
      dept:'ophtho', doctor:'Dr. Varun Baweja', status:'inactive',
      balance:0, advance:0, seen:false, centre:'CHD', dilated:false
    };
    newPts.push(pt);
    // Update progress every 500
    if(i%500===0 && bar && txt) {
      const pct = Math.round(i/lines.length*100);
      bar.style.width = pct+'%';
      txt.textContent = `Importing… ${i}/${lines.length-1} patients`;
    }
  }

  // Merge into PATIENTS (avoid duplicates by bmhId)
  const existingIds = new Set(PATIENTS.map(p=>p.bmhId));
  let added=0;
  newPts.forEach(p => { if(!existingIds.has(p.bmhId)) { PATIENTS.push(p); added++; } });
  
  if(bar) bar.style.width='100%';
  if(txt) txt.textContent = `✅ Done! ${added} new patients added (${newPts.length-added} already existed)`;
  
  const statusEl = document.getElementById('import-status-count');
  if(statusEl) statusEl.textContent = PATIENTS.length.toLocaleString('en-IN') + ' patients in database';

  // Push to Firebase in batches
  if(window.FBDB) {
    let fbCount=0;
    const BATCH=200;
    for(let b=0; b<newPts.length; b+=BATCH) {
      const chunk = newPts.slice(b,b+BATCH);
      const updates={};
      chunk.forEach(p=>{ updates[p.bmhId]=p; });
      window.FBDB.ref('patients').update(updates).then(()=>{ fbCount+=chunk.length; });
    }
    showToast('Pushing to Firebase database…','i');
  }

  showToast(`✅ ${added} patients imported successfully`,'s');
}

// ── DOCTOR CREDENTIALS ────────────────────────────
function renderDrCredentials() {
  const el = document.getElementById('dr-credentials-list'); if(!el) return;
  el.innerHTML = Object.entries(DOCTOR_PROFILES||{}).map(([name,dr])=>`
    <div style="border:1.5px solid var(--g4);border-radius:var(--r);padding:12px;margin-bottom:8px">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;align-items:center">
        <div class="form-group" style="margin:0"><label class="fl">Name</label><input type="text" value="${name}" style="font-size:12px" readonly></div>
        <div class="form-group" style="margin:0"><label class="fl">Degrees</label><input type="text" id="dr-deg-${name.replace(/\s/g,'_')}" value="${dr.degrees||''}" placeholder="MBBS, MS, DNB…" style="font-size:12px"></div>
        <div class="form-group" style="margin:0"><label class="fl">Reg No.</label><input type="text" id="dr-reg-${name.replace(/\s/g,'_')}" value="${dr.reg||''}" placeholder="PMC-XXXXX" style="font-size:12px"></div>
        <div class="form-group" style="margin:0"><label class="fl">Specialty</label><input type="text" id="dr-spec-${name.replace(/\s/g,'_')}" value="${dr.dept||''}" placeholder="Ophthalmology…" style="font-size:12px"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">
        <div class="form-group" style="margin:0"><label class="fl">Signature (upload)</label>
          <input type="file" accept="image/*" onchange="uploadDrSignature('${name}',this)" style="font-size:11px">
        </div>
        <div class="form-group" style="margin:0"><label class="fl">Centre</label>
          <select id="dr-centre-${name.replace(/\s/g,'_')}" style="font-size:12px">
            <option ${dr.centre==='CHD'?'selected':''}>CHD</option>
            <option ${dr.centre==='RPR'?'selected':''}>RPR</option>
            <option ${dr.centre==='CHD & RPR'?'selected':''}>CHD & RPR</option>
          </select>
        </div>
      </div>
    </div>`).join('');
}

function saveDoctorProfilesToLocalStorage() {
  try {
    localStorage.setItem('bmh_doctor_profiles', JSON.stringify(DOCTOR_PROFILES));
  } catch (e) {
    showToast('Could not save credentials locally (data too large?)', 'w');
  }
}
function loadDoctorProfilesFromLocalStorage() {
  try {
    const ls = localStorage.getItem('bmh_doctor_profiles');
    if (!ls) return;
    const data = JSON.parse(ls);
    if (!data || typeof data !== 'object') return;
    Object.keys(data).forEach(name => {
      if (!DOCTOR_PROFILES[name]) DOCTOR_PROFILES[name] = {};
      Object.assign(DOCTOR_PROFILES[name], data[name]);
    });
  } catch (e) { /* noop */ }
}
function saveDoctorCredentials() {
  Object.keys(DOCTOR_PROFILES||{}).forEach(name => {
    const key = name.replace(/\s/g,'_');
    const deg  = document.getElementById('dr-deg-'+key)?.value;
    const reg  = document.getElementById('dr-reg-'+key)?.value;
    const spec = document.getElementById('dr-spec-'+key)?.value;
    const ctr  = document.getElementById('dr-centre-'+key)?.value;
    if(DOCTOR_PROFILES[name]) {
      if(deg !== undefined)  DOCTOR_PROFILES[name].degrees = deg;
      if(reg !== undefined)  DOCTOR_PROFILES[name].reg     = reg;
      if(spec !== undefined) DOCTOR_PROFILES[name].dept    = spec;
      if(ctr !== undefined)  DOCTOR_PROFILES[name].centre  = ctr;
    }
  });
  saveDoctorProfilesToLocalStorage();
  // Save entire DOCTOR_PROFILES to Firebase for persistence
  if(window.FBDB) {
    window.FBDB.ref('doctorProfiles').set(DOCTOR_PROFILES)
      .then(() => showToast('Doctor credentials saved & synced ✓','s'))
      .catch(() => showToast('Saved on this device (cloud sync failed)','w'));
  } else {
    showToast('Doctor credentials saved on this device ✓','s');
  }
}

function loadDoctorProfilesFromFirebase() {
  loadDoctorProfilesFromLocalStorage();
  renderDrCredentials && renderDrCredentials();
  if(!window.FBDB) return;
  window.FBDB.ref('doctorProfiles').once('value').then(snap => {
    const data = snap.val();
    if(!data) return;
    // Merge Firebase data into DOCTOR_PROFILES
    Object.keys(data).forEach(name => {
      if(!DOCTOR_PROFILES[name]) DOCTOR_PROFILES[name] = {};
      Object.assign(DOCTOR_PROFILES[name], data[name]);
    });
    saveDoctorProfilesToLocalStorage();
    typeof renderDrCredentials === 'function' && renderDrCredentials();
  }).catch(()=>{});
}
window.loadDoctorProfilesFromFirebase = loadDoctorProfilesFromFirebase;

function loadCustomConsentsForSettings() {
  const host = document.getElementById('consent-library-list');
  if(!host || !window.FBDB) return;
  window.FBDB.ref('consentLibrary').once('value').then(snap => {
    const data = snap.val();
    window.BMH_UPLOADED_CONSENTS = data ? Object.values(data) : [];
    let box = document.getElementById('consent-custom-uploaded-list');
    if(!box) {
      box = document.createElement('div');
      box.id = 'consent-custom-uploaded-list';
      box.style.marginTop = '12px';
      host.appendChild(box);
    }
    if(!data) { box.innerHTML = ''; return; }
    const items = Object.values(data).sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''));
    const lab = {ophtho:'Eye',obg:'OBG',psych:'Psych',skin:'Skin',all:'All'};
    box.innerHTML = '<div style="font-size:10px;font-weight:800;color:var(--blue);text-transform:uppercase;margin-bottom:6px">Uploaded / custom consents (by department)</div>' +
      items.map(c => {
        const dl = lab[c.dept] || c.dept || '—';
        return `<div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--g6);border-radius:8px;margin-bottom:5px;font-size:12px">
          <span>${c.type==='image'?'🖼️':'📝'}</span>
          <div style="flex:1"><strong>${c.name}</strong> <span style="font-size:10px;color:var(--g1);margin-left:6px">${dl}</span></div>
          <button type="button" class="btn btn-xs btn-gold" onclick="editUploadedConsent('${c.id}')">✏️</button>
          <button type="button" class="btn btn-xs btn-outline" onclick="printCustomConsent('${c.id}')">🖨️</button>
          <button type="button" class="btn btn-xs btn-gray" onclick="deleteCustomConsent('${c.id}')">🗑️</button>
        </div>`;
      }).join('');
  }).catch(()=>{});
}

function addDoctorRow() {
  const name = prompt('Doctor full name:'); if(!name) return;
  DOCTOR_PROFILES[name] = {degrees:'',reg:'',dept:'',centre:'CHD'};
  saveDoctorProfilesToLocalStorage();
  renderDrCredentials();
}

function uploadDrSignature(name, inp) {
  const file = inp.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    if(DOCTOR_PROFILES[name]) DOCTOR_PROFILES[name].signature = e.target.result;
    saveDoctorProfilesToLocalStorage();
    if (window.FBDB) window.FBDB.ref('doctorProfiles').set(DOCTOR_PROFILES).catch(function(){});
    showToast('Signature uploaded for '+name+' ✓','s');
  };
  reader.readAsDataURL(file);
}

// ── CONSENT FORMS MANAGER ─────────────────────────
const CONSENT_TEMPLATES = [
  {id:'C001',type:'consent',name:'Cataract Surgery (PMICS) Consent',dept:'ophtho',content:'I hereby consent to undergo PMICS + IOL Implantation…'},
  {id:'C002',type:'consent',name:'IVT Injection Consent',dept:'ophtho',content:'I consent to intravitreal injection of anti-VEGF…'},
  {id:'C003',type:'consent',name:'LASIK Surgery Consent',dept:'ophtho',content:'I consent to LASIK refractive surgery…'},
  {id:'C004',type:'consent',name:'LSCS Consent',dept:'obg',content:'I consent to Lower Segment Caesarean Section…'},
  {id:'C005',type:'consent',name:'Anaesthesia Consent',dept:'all',content:'I consent to administration of anaesthesia…'},
  {id:'T001',type:'template',name:'Post-PMICS Discharge Template',dept:'ophtho',content:'Patient discharged after uncomplicated PMICS…'},
  {id:'T002',type:'template',name:'Post-LSCS Discharge Template',dept:'obg',content:'Patient discharged after LSCS, both mother and baby well…'},
];
function saveConsentTemplatesToStorage() {
  try { localStorage.setItem('bmh_consent_templates', JSON.stringify(CONSENT_TEMPLATES)); } catch (e) { /* noop */ }
  if (window.FBDB) window.FBDB.ref('consentTemplatesStub').set(CONSENT_TEMPLATES).catch(function () {});
}
function loadConsentTemplatesFromStorage() {
  try {
    const ls = localStorage.getItem('bmh_consent_templates');
    if (ls) {
      const arr = JSON.parse(ls);
      if (Array.isArray(arr) && arr.length) {
        CONSENT_TEMPLATES.length = 0;
        arr.forEach(function (x) { CONSENT_TEMPLATES.push(x); });
      }
    }
  } catch (e) { /* noop */ }
  if (!window.FBDB) return;
  window.FBDB.ref('consentTemplatesStub').once('value').then(function (snap) {
    const arr = snap.val();
    if (Array.isArray(arr) && arr.length) {
      CONSENT_TEMPLATES.length = 0;
      arr.forEach(function (x) { CONSENT_TEMPLATES.push(x); });
      try { localStorage.setItem('bmh_consent_templates', JSON.stringify(CONSENT_TEMPLATES)); } catch (e) { /* noop */ }
    }
  }).catch(function () {});
}

function renderConsentForms(filter='all') {
  const el=document.getElementById('set-consent-stub-list'); if(!el) return;
  const items = CONSENT_TEMPLATES.filter(c=>filter==='all'||c.type===filter);
  el.innerHTML = items.map(c=>`
    <div style="border:1.5px solid var(--g4);border-radius:var(--r);padding:11px;margin-bottom:7px;display:flex;align-items:center;gap:10px">
      <div style="font-size:20px">${c.type==='consent'?'📄':'📋'}</div>
      <div style="flex:1"><div style="font-weight:700;font-size:12.5px">${c.name}</div>
        <div style="font-size:10.5px;color:var(--g1)">${c.type==='consent'?'Consent Form':'Surgery Template'} · ${c.dept}</div></div>
      <button class="btn btn-xs btn-outline" onclick="editConsentTemplate('${c.id}')">✏️ Edit</button>
      <button class="btn btn-xs btn-outline" onclick="printConsentTemplate('${c.id}')">🖨️ Print</button>
      <button class="btn btn-xs btn-gray" onclick="deleteConsentTemplate('${c.id}')">🗑️</button>
    </div>`).join('')
  || '<div style="padding:20px;text-align:center;color:var(--g1)">No forms found</div>';
}

function filterConsentType(type) {
  ['all','consent','template'].forEach(t=>{
    const b=document.getElementById('cf-'+t);
    if(b) b.className='btn '+(t===type?'btn-gold':'btn-outline');
  });
  renderConsentForms(type);
}

function addConsentTemplate() {
  const name = prompt('Template name:'); if(!name) return;
  const type = confirm('Is this a Consent form? (Cancel = Surgery Template)') ? 'consent' : 'template';
  CONSENT_TEMPLATES.push({id:'CT'+Date.now(),type,name,dept:'all',content:''});
  saveConsentTemplatesToStorage();
  renderConsentForms();
  showToast(name+' added ✓','s');
}

function deleteConsentTemplate(id) {
  const t = CONSENT_TEMPLATES.find(c=>c.id===id); if(!t) return;
  if (!confirm('Delete “' + t.name + '”? This cannot be undone.')) return;
  const i = CONSENT_TEMPLATES.findIndex(c=>c.id===id);
  if (i >= 0) CONSENT_TEMPLATES.splice(i, 1);
  saveConsentTemplatesToStorage();
  renderConsentForms();
  showToast('Removed ✓', 's');
}

function editConsentTemplate(id) {
  const t = CONSENT_TEMPLATES.find(c=>c.id===id); if(!t) return;
  const newContent = prompt('Edit content:\n(Note: full editor coming soon)', t.content);
  if(newContent !== null) { t.content = newContent; saveConsentTemplatesToStorage(); showToast('Saved ✓','s'); }
}

function printConsentTemplate(id) {
  const ctx = collectConsentPrintContext();
  const pageHtml = renderPackDocumentPages(id, ctx);
  if (!pageHtml) { showToast('Template not found', 'w'); return; }
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif}@page{size:A4;margin:0}</style></head><body>' + pageHtml + '</body></html>';
  safePrint(html);
}

// ── APPOINTMENTS PRINT ────────────────────────────
function printAppointments(dateFilter) {
  const date = dateFilter || document.getElementById('apt-date-inp')?.value || new Date().toISOString().split('T')[0];
  const apts = APPOINTMENTS.filter(a=>a.date===date);
  const formatted = new Date(date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const lhSrc = window.LH_SRC||'';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Lato',Arial,sans-serif;font-size:11.5px;padding:10mm 14mm}
@page{size:A4;margin:0}table{width:100%;border-collapse:collapse}
th{background:#1A3C6E;color:#fff;padding:7px 10px;font-size:10px;text-transform:uppercase;letter-spacing:.5px;text-align:left}
td{border:1px solid #ddd;padding:7px 10px}tr:nth-child(even){background:#f8f9fc}
.title{font-size:17px;font-weight:900;color:#1A3C6E;margin-bottom:4px}
</style></head><body>
${lhSrc?`<img src="${lhSrc}" style="width:100%;height:auto;margin-bottom:12px">`:''}
<div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #1A3C6E;padding-bottom:8px;margin-bottom:16px">
  <div><div class="title">Appointment Schedule</div>
  <div style="font-size:12px;color:#555">${formatted}</div></div>
  <div style="font-size:13px;font-weight:700;color:#1A3C6E">${apts.length} appointments</div>
</div>
${apts.length ? `<table>
  <thead><tr><th>#</th><th>Time</th><th>Patient</th><th>Phone</th><th>BMSH ID</th><th>Doctor</th><th>Purpose</th><th>Status</th></tr></thead>
  <tbody>${apts.map((a,i)=>`<tr>
    <td>${i+1}</td>
    <td style="font-weight:700">${a.time||'—'}</td>
    <td style="font-weight:700">${a.patient}</td>
    <td style="font-family:monospace">${a.mob||PATIENTS.find(p=>p.bmhId===a.bmhId)?.mob||'—'}</td>
    <td style="font-family:monospace;font-size:10.5px">${a.bmhId||'—'}</td>
    <td>${a.doctor||'—'}</td>
    <td>${a.purpose||'—'}</td>
    <td style="color:${a.status==='booked'?'#1a8c3c':'#FF9500'};font-weight:700">${a.status||'—'}</td>
  </tr>`).join('')}</tbody>
</table>` : '<div style="padding:30px;text-align:center;color:#888">No appointments for this date</div>'}
</body></html>`;
  safePrint(html);
}

// ── SETTINGS INIT ─────────────────────────────────
function renderSettingsPage() {
  loadPrintLetterheadFromStorage && loadPrintLetterheadFromStorage();
  loadConsentDataOverridesFromStorage && loadConsentDataOverridesFromStorage();
  loadRxTemplatesFromStorage && loadRxTemplatesFromStorage(function () {});
  loadConsentTemplatesFromStorage && loadConsentTemplatesFromStorage();
  loadIolCatalogFromStorage && loadIolCatalogFromStorage();
  if (window.FBDB) {
    window.FBDB.ref('surgeryPacksCustom').once('value').then(function (snap) {
      const v = snap.val();
      if (Array.isArray(v) && v.length) {
        try { localStorage.setItem('bmh_surgery_packs_custom', JSON.stringify(v)); } catch (e) { /* noop */ }
      }
      renderSetPacksList && renderSetPacksList();
    }).catch(function () { renderSetPacksList && renderSetPacksList(); });
  } else {
    renderSetPacksList && renderSetPacksList();
  }
  renderDrCredentials && renderDrCredentials();
  renderConsentForms && renderConsentForms();
  renderChargesList && renderChargesList();
  renderSettingsDrugs && renderSettingsDrugs();
  renderSetRxTplList && renderSetRxTplList();
  renderIolCatalogList && renderIolCatalogList();
  renderConsentLibrary && renderConsentLibrary('all');
  renderStructuredConsentList && renderStructuredConsentList();
  loadCustomConsentsForSettings && loadCustomConsentsForSettings();
  const sc = document.getElementById('import-status-count');
  if(sc) sc.textContent = PATIENTS.length.toLocaleString('en-IN') + ' patients in database';
}

// ═══════════════════════════════════════════════════
// V38 FUNCTIONS — clean production mode
// ═══════════════════════════════════════════════════

// ── PHONE SEARCH IN RECEPTION ────────────────────────────────


function fillPatientFromPhone(bmhId) {
  const p = PATIENTS.find(x=>x.bmhId===bmhId);
  if(!p) return;
  const dropdown = document.getElementById('rc-mob-matches');
  if(dropdown) dropdown.style.display='none';
  // Fill new patient form fields
  const fields = {
    'rc-fn': p.name.split(' ')[0] || '',
    'rc-ln': p.name.split(' ').slice(1).join(' ') || '',
    'rc-mob': p.mob || '',
    'rc-age': p.age?.replace('Y','') || '',
    'rc-uid': p.bmhId,
  };
  Object.entries(fields).forEach(([id,val])=>{
    const el=document.getElementById(id); if(el) el.value=val;
    if(id==='rc-uid' && el) el.textContent = p.bmhId; // span not input
  });
  // Set sex if there's a select
  const sexSel = document.querySelector('#m-np select[id="rc-sex"]');
  if(sexSel) sexSel.value = p.sex || '';
  showToast('Returning patient found: '+p.name+' ✓','s');
  // Do NOT auto-register — just pre-fill the form. User must click Register button.
  showToast('Patient found: '+p.name+' — verify details and click Register ✓','i');
}

// ── IMPROVED LOGOUT ───────────────────────────────────────────
function logoutUser() {
  if(window.FBDB) window.FBDB.ref().off();
  _fbPatientsLoaded = false;
  window._bmhRtdbPatientsListening = false; // allow listener to re-attach on next login
  CURRENT_USER = null;
  window.CURRENT_USER = null;
  try { sessionStorage.removeItem('bmh_active_session'); } catch (e) {}
  // Clear form data
  RX_DRUGS && (RX_DRUGS.length = 0);
  // Show login gate
  const gate = document.getElementById('login-gate');
  if(gate) gate.style.display = 'flex';
  const shell = document.getElementById('shell');
  if(shell) shell.style.display = 'none';
  // Clear saved session (but keep "remember me" credentials)
  showToast('Logged out successfully','i');
}

// ═══════════════════════════════════════════════════════════════
// LOGIN MANAGEMENT — Change Password, Admin User Panel
// ═══════════════════════════════════════════════════════════════

// ── Change My Password (all users) ────────────────────────────
function changeMyPassword() {
  if(!CURRENT_USER) { showToast('Not logged in','w'); return; }
  const cur    = document.getElementById('cpw-current')?.value || '';
  const nw     = document.getElementById('cpw-new')?.value || '';
  const conf   = document.getElementById('cpw-confirm')?.value || '';
  const uname  = CURRENT_USER.username;
  if(!cur || !nw || !conf) { showToast('Please fill all password fields','w'); return; }
  if(USER_DB[uname]?.pw !== cur) { showToast('❌ Current password is incorrect','w'); return; }
  if(nw.length < 6) { showToast('New password must be at least 6 characters','w'); return; }
  if(nw !== conf) { showToast('New passwords do not match','w'); return; }
  USER_DB[uname].pw = nw;
  CURRENT_USER.pw = nw;
  // Persist to Firebase
  fbUpdate('userSettings/' + uname, { pw: nw, pwChangedAt: new Date().toISOString(), pwChangedBy: CURRENT_USER.name })
    .catch(e => console.warn('Password save error:', e));
  document.getElementById('cpw-current').value = '';
  document.getElementById('cpw-new').value = '';
  document.getElementById('cpw-confirm').value = '';
  // Update remember-me if active
  try {
    const saved = JSON.parse(localStorage.getItem('bmh_creds') || 'null');
    if(saved && saved.u === uname) localStorage.setItem('bmh_creds', JSON.stringify({u: uname, p: nw}));
  } catch(e) {}
  showToast('✅ Password changed successfully','s');
}

// ── Render Admin Users List ────────────────────────────────────
function renderAdminUsersList() {
  const card = document.getElementById('admin-logins-card');
  const el   = document.getElementById('admin-users-list');
  if(!el) return;
  // Only admins see this
  if(!CURRENT_USER?.isAdmin) { if(card) card.style.display='none'; return; }
  if(card) card.style.display='block';

  const roleColors = {
    Admin:'bd-red', Doctor:'bd-blue', Reception:'bd-teal',
    Lab:'bd-purple', Optometrist:'bd-indigo', Inventory:'bd-orange', TPA:'bd-gold'
  };

  const rows = Object.entries(USER_DB).map(([uname, u]) => {
    const disabled = u.disabled === true;
    const roleBadge = roleColors[u.role] || 'bd-gray';
    return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:${disabled?'var(--red-lt)':'var(--g6)'};border-radius:var(--rsm);margin-bottom:6px;border:1.5px solid ${disabled?'rgba(255,59,48,.2)':'transparent'};transition:all .2s">
      <div style="width:34px;height:34px;border-radius:50%;background:${disabled?'var(--g3)':'var(--bmh-blue)'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:#fff;flex-shrink:0">
        ${(u.name||uname).replace('Dr. ','').split(' ').map(n=>n[0]||'').join('').toUpperCase().substring(0,2)}
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:800;${disabled?'color:var(--g2);text-decoration:line-through':''}">${u.name||uname}</div>
        <div style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal);font-weight:700">@${uname}</div>
        <div style="font-size:10.5px;color:var(--g1);margin-top:1px">${u.dept||'—'} · ${u.centre||'—'}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0">
        <span class="badge ${roleBadge}">${u.role}</span>
        <span class="badge ${disabled?'bd-red':'bd-green'}">${disabled?'🔴 Disabled':'🟢 Active'}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;flex-shrink:0">
        <button class="btn btn-xs btn-outline" onclick="openEditUser('${uname}')">✏️ Edit</button>
        ${disabled
          ? `<button class="btn btn-xs btn-green" onclick="setUserDisabled('${uname}',false)">Enable</button>`
          : `<button class="btn btn-xs btn-red" style="${uname===CURRENT_USER?.username?'opacity:.4;pointer-events:none':''}" onclick="setUserDisabled('${uname}',true)">Disable</button>`
        }
      </div>
    </div>`;
  }).join('');

  el.innerHTML = rows || '<div style="padding:20px;text-align:center;color:var(--g2)">No users found</div>';
}

// ── Enable / Disable a user ────────────────────────────────────
function setUserDisabled(uname, disabled) {
  if(!CURRENT_USER?.isAdmin) { showToast('Admin access required','w'); return; }
  if(uname === CURRENT_USER?.username && disabled) { showToast('You cannot disable your own account','w'); return; }
  if(!USER_DB[uname]) { showToast('User not found','w'); return; }
  USER_DB[uname].disabled = disabled;
  fbUpdate('userSettings/' + uname, { disabled, updatedBy: CURRENT_USER.name, updatedAt: new Date().toISOString() })
    .catch(e => console.warn('Disable user error:', e));
  showToast(disabled ? `🔴 ${USER_DB[uname].name} disabled` : `🟢 ${USER_DB[uname].name} enabled`, disabled?'w':'s');
  renderAdminUsersList();
}

// ── Open Add User Modal ────────────────────────────────────────
function openAddUserModal() {
  if(!CURRENT_USER?.isAdmin) { showToast('Admin access required','w'); return; }
  ['nu-username','nu-name','nu-pw','nu-pw2','nu-dept'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  openM('m-add-user');
}

// ── Save New User ──────────────────────────────────────────────
function saveNewUser() {
  if(!CURRENT_USER?.isAdmin) { showToast('Admin access required','w'); return; }
  const uname  = (document.getElementById('nu-username')?.value||'').trim().toLowerCase().replace(/\s+/g,'_');
  const name   = (document.getElementById('nu-name')?.value||'').trim();
  const pw     = document.getElementById('nu-pw')?.value||'';
  const pw2    = document.getElementById('nu-pw2')?.value||'';
  const role   = document.getElementById('nu-role')?.value||'Reception';
  const centre = document.getElementById('nu-centre')?.value||'CHD';
  const dept   = (document.getElementById('nu-dept')?.value||'').trim();

  if(!uname) { showToast('Username is required','w'); return; }
  if(USER_DB[uname]) { showToast(`Username "@${uname}" already exists — choose another`,'w'); return; }
  if(pw.length < 6) { showToast('Password must be at least 6 characters','w'); return; }
  if(pw !== pw2) { showToast('Passwords do not match','w'); return; }
  if(!name) { showToast('Full name is required','w'); return; }

  const newUser = {
    pw, name, role, dept, centre,
    degrees: '',
    canSeeAllCentres: (centre==='BOTH' || role==='Admin'),
    isAdmin: (role==='Admin'),
    disabled: false,
    createdAt: new Date().toISOString(),
    createdBy: CURRENT_USER.name
  };
  USER_DB[uname] = newUser;
  // Persist to Firebase
  fbSet('userSettings/' + uname, { ...newUser, username: uname })
    .catch(e => console.warn('Add user error:', e));
  closeM('m-add-user');
  showToast(`✅ User @${uname} (${name}) created successfully`, 's');
  renderAdminUsersList();
}

// ── Open Edit User Modal ────────────────────────────────────────
function openEditUser(uname) {
  if(!CURRENT_USER?.isAdmin) { showToast('Admin access required','w'); return; }
  const u = USER_DB[uname]; if(!u) return;
  document.getElementById('eu-username').value = uname;
  document.getElementById('eu-title').textContent = `✏️ Edit User: @${uname}`;
  document.getElementById('eu-name').value  = u.name || '';
  document.getElementById('eu-role').value  = u.role || 'Reception';
  document.getElementById('eu-centre').value= u.centre || 'CHD';
  document.getElementById('eu-dept').value  = u.dept || '';
  document.getElementById('eu-newpw').value = '';
  openM('m-edit-user');
}

// ── Save Edited User ────────────────────────────────────────────
function saveEditUser() {
  if(!CURRENT_USER?.isAdmin) { showToast('Admin access required','w'); return; }
  const uname  = document.getElementById('eu-username')?.value||'';
  const name   = (document.getElementById('eu-name')?.value||'').trim();
  const role   = document.getElementById('eu-role')?.value||'Reception';
  const centre = document.getElementById('eu-centre')?.value||'CHD';
  const dept   = (document.getElementById('eu-dept')?.value||'').trim();
  const newpw  = document.getElementById('eu-newpw')?.value||'';

  if(!USER_DB[uname]) { showToast('User not found','w'); return; }
  if(!name) { showToast('Full name is required','w'); return; }
  if(newpw && newpw.length < 6) { showToast('New password must be at least 6 characters','w'); return; }

  USER_DB[uname].name   = name;
  USER_DB[uname].role   = role;
  USER_DB[uname].centre = centre;
  USER_DB[uname].dept   = dept;
  USER_DB[uname].canSeeAllCentres = (centre==='BOTH'||role==='Admin');
  USER_DB[uname].isAdmin = (role==='Admin');
  if(newpw) USER_DB[uname].pw = newpw;

  const updateData = { name, role, centre, dept, canSeeAllCentres: USER_DB[uname].canSeeAllCentres, isAdmin: USER_DB[uname].isAdmin, updatedBy: CURRENT_USER.name, updatedAt: new Date().toISOString() };
  if(newpw) updateData.pw = newpw;
  fbUpdate('userSettings/' + uname, updateData).catch(e => console.warn('Edit user error:', e));

  // If editing own account, update CURRENT_USER too
  if(uname === CURRENT_USER?.username) {
    CURRENT_USER.name = name; CURRENT_USER.role = role; CURRENT_USER.centre = centre;
    if(newpw) CURRENT_USER.pw = newpw;
    const sbnm = document.getElementById('sbnm'); if(sbnm) sbnm.textContent = name;
    const sbrl = document.getElementById('sbrl'); if(sbrl) sbrl.textContent = role+' · '+centre;
    // Update remember-me if active
    try {
      const saved = JSON.parse(localStorage.getItem('bmh_creds')||'null');
      if(saved && saved.u===uname && newpw) localStorage.setItem('bmh_creds', JSON.stringify({u:uname,p:newpw}));
    } catch(e) {}
  }
  closeM('m-edit-user');
  showToast(`✅ User @${uname} updated successfully`,'s');
  renderAdminUsersList();
}



// ── OT EMPTY STATE ────────────────────────────────────────────


// ── LAB EMPTY STATE ───────────────────────────────────────────
function initLabSafe() {
  initLab && initLab();
  const el = document.getElementById('lab-order-list') || document.getElementById('lab-orders-list');
  if(!el) return;
  if(!LAB_ORDERS || !LAB_ORDERS.length) {
    el.innerHTML = '<div style="padding:20px;text-align:center;color:var(--g1)"><div style="font-size:28px;margin-bottom:6px">🧪</div><div style="font-size:13px;font-weight:700">No lab orders pending</div></div>';
  }
}

// ── RECEPTION EMPTY STATE ─────────────────────────────────────
// Patch renderReceptionPage to handle empty data gracefully
const _origRenderRcPage = window.renderReceptionPage;
window.renderReceptionPage = function() {
  if(_origRenderRcPage) _origRenderRcPage();
  // Ensure pay list shows empty state
  const payEl = document.getElementById('rc-pay-list');
  if(payEl && !PAY_REQUESTS.length) {
    payEl.innerHTML = '<div style="padding:16px;text-align:center;color:var(--g1);font-size:12.5px">No payment requests yet today</div>';
  }
};

// ── UPDATE NAV FOR OT/LAB SAFE VERSIONS ──────────────────────
// renderOTListSafe — safe wrapper around renderOTList
function renderOTListSafe() {
  try { if(typeof renderOTList === 'function') renderOTList(); } catch(e) { console.warn('OT list render error:', e); }
}
const _navV38 = window.nav;
window.nav = function(id, el) {
  _navV38(id, el);
  const _nk = (typeof id === 'string' && id.startsWith('pg-')) ? id.slice(3) : id;
  if(_nk==='ot') renderOTListSafe();
  else if(_nk==='lab') { try { if(typeof initLabSafe==='function') initLabSafe(); } catch(e){} }
};

// ── RE-REGISTER SETTINGS RENDER ──────────────────────────────
// Extend nav to render settings sub-tabs on open
const _navV38b = window.nav;
window.nav = function(id, el) {
  _navV38b(id, el);
  const _nk = (typeof id === 'string' && id.startsWith('pg-')) ? id.slice(3) : id;
  if(_nk==='settings') {
    setTimeout(()=>{
      renderDrCredentials && renderDrCredentials();
      renderConsentForms && renderConsentForms();
      renderChargesList && renderChargesList();
      renderSettingsDrugs && renderSettingsDrugs();
      renderAdminUsersList && renderAdminUsersList();
      if(CURRENT_USER?.isAdmin) { loadDeletionRequests&&loadDeletionRequests(); }
      const sc = document.getElementById('import-status-count');
      if(sc) sc.textContent = PATIENTS.length.toLocaleString('en-IN')+' patients in database';
    }, 80);
  }
};

// ═══════════════════════════════════════════════════
// V38: CLEAN PRODUCTION FUNCTIONS
// ═══════════════════════════════════════════════════

// ── Auto-load saved credentials on page load ─────
(function() {
  try {
    const saved = localStorage.getItem('bmh_creds');
    if(saved) {
      const {u,p} = JSON.parse(saved);
      const ui = document.getElementById('lg-email') || document.getElementById('lg-user');
      const pi = document.getElementById('lg-pass');
      const ri = document.getElementById('lg-remember');
      if(ui) ui.value = u||'';
      if(pi) pi.value = p||'';
      if(ri) ri.checked = true;
    }
  } catch(e){}
})();

// ── Phone search in reception new patient ────────
function searchPatientByPhone(val) {
  const results = document.getElementById('rc-phone-results');
  const list    = document.getElementById('rc-phone-matches-list');
  if(!results || !list) return;

  const v = (val||'').replace(/\s/g,'');
  if(v.length < 5) { results.style.display='none'; return; }

  const matches = PATIENTS.filter(p => p.mob && p.mob.replace(/\s/g,'').includes(v)).slice(0,8);
  if(!matches.length) { results.style.display='none'; return; }

  results.style.display = 'block';
  list.innerHTML = matches.map(p => `
    <div style="display:flex;align-items:center;gap:9px;padding:9px 12px;border-bottom:1px solid var(--g5)">
      <div style="width:32px;height:32px;border-radius:50%;background:${p.color||'#1A3C6E'};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px;flex-shrink:0">${p.initials||p.name[0]||'?'}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:800;font-size:13px">${p.name}</div>
        <div style="font-size:10.5px;color:var(--g1)">${p.bmhId} · ${p.age||'?'}Y/${(p.sex||'?')[0]} · ${p.mob||'—'} · Visits:${p.visitCount||1}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px">
        <button class="btn btn-xs btn-gold" onclick="prefillExistingPatient('${p.bmhId}');document.getElementById('rc-phone-results').style.display='none'">✏️ Prefill</button>
        <button class="btn btn-xs btn-outline" onclick="openPatient('${p.bmhId}')">👁️ View</button>
      </div>
    </div>`).join('');
}

function selectExistingPatient(bmhId) {
  const p = PATIENTS.find(x => x.bmhId === bmhId);
  if(!p) return;
  // Close dropdown
  const r = document.getElementById('rc-phone-results');
  if(r) r.style.display='none';
  // Mark as waiting for today
  p.status = 'waiting';
  p.seen   = false;
  // Show in queue
  showToast('✅ ' + p.name + ' checked in for visit', 's');
  renderReceptionPage && renderReceptionPage();
  // Close modal if open
  const m = document.getElementById('m-np');
  if(m) m.style.display='none';
}

// ── renderDashboard — admin (finance/stock) vs clinical (doctors) ────
function renderDashboard() {
  loadBmhFinancials();
  const today = new Date().toISOString().split('T')[0];
  const todaySeen = PATIENTS.filter(p => p.seen).length;
  const waiting = PATIENTS.filter(p => p.status === 'waiting' && !p.seen).length;
  const checkedIn = PATIENTS.filter(p => p.status === 'waiting' || p.seen || p.dilated).length;

  const todayApts = APPOINTMENTS.filter(a => a.date === today);
  const txnDay = (t) => {
    const d = (t.date || t.createdAt || '').toString();
    return d.includes('T') ? d.split('T')[0] : d.slice(0, 10);
  };
  const txnOk = (t) => {
    if (t.isRefund === true) return false;
    const amt = Number(t.amount) || 0;
    if (amt <= 0) return false;
    if (t.collected === false) return false;
    return true;
  };
  const todayCollection = TRANSACTIONS.filter(t => txnDay(t) === today && txnOk(t)).reduce((s, t) => s + (Number(t.amount) || 0), 0);
  const pendingAmt = PAY_REQUESTS.filter(r => r.status === 'pending').reduce((s, r) => s + (r.amount || 0), 0);

  const setEl = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const u = window.CURRENT_USER || CURRENT_USER;
  const isAdminDash = !!(u && (u.isAdmin || String(u.role || '').toLowerCase() === 'admin'));
  const adm = document.getElementById('dash-view-admin');
  const cln = document.getElementById('dash-view-clinical');
  if (adm) adm.style.display = isAdminDash ? 'block' : 'none';
  if (cln) cln.style.display = isAdminDash ? 'none' : 'block';
  const tbd = document.getElementById('tb-date2');
  if (tbd) tbd.textContent = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const subEl = document.getElementById('dash-subtitle');
  if (subEl) subEl.textContent = (isAdminDash ? 'Admin · overdue & stock · ' : 'Clinical · ') + (document.getElementById('tb-cp')?.textContent || '') + ' · ' + new Date().toLocaleDateString('en-IN');

  let diagToday = 0;
  try {
    Object.keys(window.BMH_PATIENT_CHARGES || {}).forEach(bid => {
      (window.BMH_PATIENT_CHARGES[bid] || []).forEach(l => {
        if ((l.cat === 'diagnostic' || l.cat === 'investigation') && (l.ts || '').startsWith(today)) diagToday++;
      });
    });
  } catch (e) { /* noop */ }

  setEl('db-opd', String(todaySeen + waiting));
  setEl('db-collection', '₹' + todayCollection.toLocaleString('en-IN'));

  if (isAdminDash) {
    const overduePts = PATIENTS.filter(p => (p.balance || 0) > 0);
    const overdueAmt = overduePts.reduce((s, p) => s + (p.balance || 0), 0);
    setEl('db-admin-overdue-amt', '₹' + overdueAmt.toLocaleString('en-IN'));
    setEl('db-admin-overdue-ct', String(overduePts.length));
    const low = INVENTORY ? INVENTORY.filter(i => i.stock <= i.min).length : 0;
    setEl('db-stock', String(low));
    const vendPend = (window.BMH_VENDOR_BILLS || []).filter(v => v.status === 'pending');
    const vendSum = vendPend.reduce((s, v) => s + v.amount, 0);
    setEl('db-admin-vendor-pend', '₹' + vendSum.toLocaleString('en-IN'));
    const listEl = document.getElementById('dash-admin-overdue-list');
    if (listEl) {
      listEl.innerHTML = overduePts.length ? overduePts.slice(0, 14).map(p => `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid var(--g5);font-size:12px"><span><strong>${p.name}</strong> <span style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal)">${p.bmhId}</span></span><span style="color:var(--orange);font-weight:800">Due ₹${(p.balance || 0).toLocaleString('en-IN')}</span></div>`).join('') : '<div style="padding:16px;color:var(--g1);font-size:13px">No patient balances due — great.</div>';
    }
    bmhGeneratePurchaseOrderDraft();
  } else {
    setEl('db-cl-opd', String(todaySeen + waiting));
    setEl('db-cl-ipd', String(typeof IPD_PATIENTS !== 'undefined' ? IPD_PATIENTS.length : 0));
    setEl('db-cl-diag', String(diagToday));
    setEl('db-cl-checked', String(checkedIn));
    setEl('db-cl-collection', '₹' + todayCollection.toLocaleString('en-IN'));
    setEl('db-pending', '₹' + pendingAmt.toLocaleString('en-IN'));
    setEl('db-stock-dup', String(INVENTORY ? INVENTORY.filter(i => i.stock <= i.min).length : 0));

    const modes = {};
    TRANSACTIONS.filter(t => txnDay(t) === today && txnOk(t)).forEach(t => {
      const m = t.mode || 'Cash';
      modes[m] = (modes[m] || 0) + (Number(t.amount) || 0);
    });
    const modeEl = document.getElementById('dash-cl-modes');
    if (modeEl) {
      modeEl.innerHTML = Object.keys(modes).length ? Object.entries(modes).map(([k, v]) => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--g5);font-size:12px"><span>${k}</span><strong>₹${v.toLocaleString('en-IN')}</strong></div>`).join('') : '<div style="color:var(--g1);font-size:12px">No collections recorded today</div>';
    }

    const chart = document.getElementById('dash-cl-chart-week');
    if (chart) {
      const dayTotal = (daysAgo) => {
        const d = new Date();
        d.setDate(d.getDate() - daysAgo);
        const ds = d.toISOString().slice(0, 10);
        return TRANSACTIONS.filter(t => txnDay(t) === ds && txnOk(t)).reduce((s, t) => s + (Number(t.amount) || 0), 0);
      };
      let mx = 1;
      for (let i = 0; i < 14; i++) mx = Math.max(mx, dayTotal(i));
      let html = '<div style="display:flex;align-items:flex-end;justify-content:space-between;height:120px;gap:3px">';
      for (let i = 6; i >= 0; i--) {
        const a = dayTotal(i);
        const b = dayTotal(i + 7);
        const ha = mx > 0 ? Math.round((a / mx) * 100) : 0;
        const hb = mx > 0 ? Math.round((b / mx) * 100) : 0;
        html += `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px"><div style="display:flex;align-items:flex-end;justify-content:center;gap:1px;height:88px;width:100%"><div title="This week" style="flex:1;background:var(--bmh-blue);height:${Math.max(ha, 2)}%;min-height:${a ? 4 : 0}px;border-radius:3px 3px 0 0"></div><div title="Prev week" style="flex:1;background:var(--g4);height:${Math.max(hb, 2)}%;min-height:${b ? 3 : 0}px;border-radius:3px 3px 0 0;opacity:.55"></div></div><div style="font-size:8px;color:var(--g1)">-${6 - i}d</div></div>`;
      }
      html += '</div>';
      chart.innerHTML = html;
    }
  }

  const payHtml = PAY_REQUESTS.filter(r => r.status === 'pending').slice(0, 8).map(pr => `<div style="font-size:12px;padding:7px;border-bottom:1px solid var(--g5)"><strong>${pr.patient}</strong> · ₹${(pr.amount || 0).toLocaleString('en-IN')}<div style="font-size:10px;color:var(--g1)">${pr.for || ''}</div></div>`).join('') || '<div style="color:var(--g1);font-size:12px;padding:8px">No pending payment requests</div>';
  const dp = document.getElementById('dash-pay'); if (dp) dp.innerHTML = payHtml;
  const dpc = document.getElementById('dash-pay-clinical'); if (dpc) dpc.innerHTML = payHtml;

  setEl('db-apts', String(todayApts.length));
  const aptList = document.getElementById('dash-apts');
  if (aptList) {
    aptList.innerHTML = todayApts.slice(0, 8).map(a => `<div style="font-size:12px;padding:5px 0;border-bottom:1px solid var(--g5)"><span style="font-weight:700">${a.patient || ''}</span> · ${a.time || ''} · ${a.doctor || ''}</div>`).join('') || '<div style="color:var(--g1);font-size:12px">No appointments today</div>';
  }
}

// ── Today’s reception queue (dept filter, no sub-tab) ─────────
function getReceptionBasePts() {
  const today = new Date().toISOString().slice(0,10);
  const isToday0 = (p) => {
    if(!p.createdAt && !p.checkinAt) return true;
    if(p.createdAt?.startsWith(today)) return true;
    if(p.checkinAt && new Date(p.checkinAt).toISOString().startsWith(today)) return true;
    if(p.preRegistered) return true;
    return false;
  };
  let pts = PATIENTS.filter(p => (p.status==='waiting'||p.status==='pre-registered'||p.seen||p.dilated) && isToday0(p) && centreMatch(p));
  const df = window._rcDeptFilter || 'all';
  if(df !== 'all') pts = pts.filter(p=>p.dept===df);
  return pts;
}

function computeReceptionQueuePts() {
  let pts = getReceptionBasePts();
  const sub = window._rcQueueSubtab || 'waiting';
  if(sub === 'seen') pts = pts.filter(p=>p.seen);
  else if(sub === 'waiting') pts = pts.filter(p=>!p.seen);
  return pts;
}

// ── renderReceptionPage — live computed ──────────
function renderReceptionPage() {
  ensureDailyReceptionReset && ensureDailyReceptionReset();
  syncReceptionConsultationFee && syncReceptionConsultationFee();

  const list = document.getElementById('rc-exist-list');
  if(list) {
    const basePts = getReceptionBasePts();
    const summaryEl = document.getElementById('rc-queue-summary');
    if(summaryEl) {
      const depts = [{k:'all',l:'All',icon:'🏥'},{k:'ophtho',l:'Eye',icon:'👁️'},{k:'obg',l:'OBG',icon:'🤰'},{k:'psych',l:'Psych',icon:'🧠'},{k:'skin',l:'Skin',icon:'💆'}];
      summaryEl.innerHTML = depts.map(d=>{
        const cnt = d.k==='all' ? basePts.length : basePts.filter(p=>p.dept===d.k).length;
        const waiting = d.k==='all' ? basePts.filter(p=>!p.seen).length : basePts.filter(p=>p.dept===d.k&&!p.seen).length;
        return `<button onclick="filterRcByDept('${d.k}')" style="flex:1;min-width:60px;background:#fff;border:1.5px solid var(--g4);border-radius:8px;padding:6px 8px;cursor:pointer;text-align:center">
          <div style="font-size:13px">${d.icon}</div>
          <div style="font-size:11px;font-weight:800">${cnt}</div>
          <div style="font-size:9px;color:var(--g1)">${d.l}</div>
          ${waiting>0?`<div style="font-size:8px;color:var(--orange);font-weight:800">${waiting} wait</div>`:''}
        </button>`;
      }).join('');
    }
    const pts = computeReceptionQueuePts();
    if(!pts.length) {
      list.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:20px;color:var(--g1);font-size:13px">No patients in this view</td></tr>';
    } else {
      list.innerHTML = pts.map((p,i)=>buildQTableRow(p,i+1,{receptionQueue:true})).join('');
    }
  }

  const prEl = document.getElementById('rc-pay-list');
  const visiblePayRequests = PAY_REQUESTS.filter(r => (r.centre || 'CHD') === getEffectiveCentre());
  if(prEl) {
    if(!visiblePayRequests.length) {
      prEl.innerHTML = '<div style="padding:16px;text-align:center;color:var(--g1);font-size:12px">No payment requests</div>';
    } else {
      prEl.innerHTML = visiblePayRequests.map(pr => payCardHtml(pr)).join('');
    }
  }

  const badge = document.getElementById('rc-pr-ct');
  if(badge) {
    const pending = visiblePayRequests.filter(r=>r.status==='pending').length;
    badge.textContent = pending + ' pending';
  }

  renderRcDeptDues && renderRcDeptDues();
  renderCollectionDashboard && renderCollectionDashboard();

  if(document.getElementById('rc-dept-summary')?.classList.contains('active')) renderDeptSummary && renderDeptSummary();
  if(document.getElementById('rc-insurance')?.classList.contains('active')) renderInsuranceTab && renderInsuranceTab();
}

// ── Settings surgery packs list renderer ──────────────────────────────────
function renderSetPacksList() {
  const el = document.getElementById('set-packs-list'); if(!el) return;
  populateReceptionSurgeryPackSelect();
  const packs = getAllSurgeryPacks();
  el.innerHTML = packs.map(function (p) {
    const keyLines = (p.documentKeys || p.consentKeys || []).map(function (k) {
      const title = getPackDocumentTitle(k);
      return '<li style="margin:2px 0;font-size:11px">' + title + '</li>';
    }).join('');
    const actions = '<button type="button" class="btn btn-xs btn-outline" onclick="editSurgeryPack(\'' + p.id + '\')">✏️</button><button type="button" class="btn btn-xs btn-gray" onclick="deleteSurgeryPack(\'' + p.id + '\')">🗑️</button>';
    return '<div style="padding:12px;border:1.5px solid ' + p.color + '33;border-radius:var(--r);margin-bottom:10px;background:' + p.color + '09">' +
      '<div style="display:flex;align-items:flex-start;gap:12px">' +
      '<span style="font-size:28px;flex-shrink:0">' + p.icon + '</span>' +
      '<div style="flex:1;min-width:0">' +
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">' +
      '<span style="font-weight:900;font-size:13.5px;color:' + p.color + '">' + p.label + '</span>' +
      '<span style="font-size:9px;font-weight:800;padding:2px 8px;border-radius:10px;background:' + p.color + '22;color:' + p.color + '">' + p.dept + '</span>' +
      '</div>' +
      '<div style="font-size:11px;color:var(--g1);margin-top:4px">' + (p.desc || '') + '</div>' +
      '<div style="margin-top:8px;padding:8px 10px;background:#fff;border-radius:8px;border:1px solid var(--g5)">' +
      '<div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;margin-bottom:4px">Documents in this pack</div>' +
      '<ul style="margin:0;padding-left:18px;color:var(--tx);max-height:140px;overflow-y:auto">' + (keyLines || '<li style="font-size:11px;color:var(--g1)">No keys</li>') + '</ul>' +
      '<div style="font-size:10px;color:var(--g1);margin-top:6px">Printing uses the active patient and latest OT case when available. Consents/forms use the compact logo header; discharge summary prints as the official hospital document.</div>' +
      '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px;flex-shrink:0">' +
      '<button type="button" class="btn btn-xs" style="background:' + p.color + ';color:#fff;border:none;border-radius:6px;padding:6px 12px;font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap" onclick="printSurgeryPack(\'' + p.id + '\')">🖨️ Print pack</button>' +
      actions +
      '</div></div></div>';
  }).join('');
}

// ── Dept dues pulsating panel (right column of reception) ──────────────────
function renderRcDeptDues() {
  const el = document.getElementById('rc-dept-dues-panel'); if(!el) return;
  const depts = [
    {k:'ophtho',l:'Eye',icon:'👁️',color:'var(--blue)'},
    {k:'obg',l:'OBG',icon:'🤰',color:'#c0004e'},
    {k:'psych',l:'Psych',icon:'🧠',color:'var(--orange)'},
    {k:'skin',l:'Skin',icon:'💆',color:'var(--purple)'},
  ];
  const pending = PAY_REQUESTS.filter(r=>r.status==='pending' && (r.centre || 'CHD') === getEffectiveCentre());
  const hasDues = pending.length > 0;
  if(!hasDues) { el.innerHTML='<div style="font-size:11px;color:var(--g1);padding:8px;text-align:center">No pending dues</div>'; return; }
  el.innerHTML = depts.map(d=>{
    const dPend = pending.filter(r=>r.dept===d.k);
    if(!dPend.length) return '';
    const amt = dPend.reduce((s,r)=>s+r.amount,0);
    return `<div onclick="(function(){const t=Array.from(document.querySelectorAll('#pg-reception .ptab')).find(x=>x.textContent.includes('Dept Summary'));if(t){ptab(t,'rc-dept-summary');renderDeptSummary&&renderDeptSummary();}})()"
      style="display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;border:1.5px solid ${d.color}44;background:${d.color}0d;cursor:pointer;margin-bottom:5px"
      title="Click to view dept charges">
      <span style="font-size:15px">${d.icon}</span>
      <div style="flex:1">
        <div style="font-size:11px;font-weight:800;color:${d.color}">${d.l}</div>
        <div style="font-size:10px;color:var(--g1)">${dPend.length} charge${dPend.length>1?'s':''} pending</div>
      </div>
      <div style="font-size:13px;font-weight:900;color:var(--orange);animation:pulse 2s infinite">₹${amt.toLocaleString('en-IN')}</div>
      <span style="font-size:9px;background:var(--orange-lt);color:#8a4200;padding:2px 6px;border-radius:8px;font-weight:800;animation:pulse 2s infinite">DUE</span>
    </div>`;
  }).join('');
}

// ── renderIPD — from live IPD_PATIENTS ───────────
function renderIPD() {
  // Sync window.IPD_PATIENTS -> local array
  if(window.IPD_PATIENTS && window.IPD_PATIENTS !== IPD_PATIENTS) {
    IPD_PATIENTS.length=0; window.IPD_PATIENTS.forEach(p=>IPD_PATIENTS.push(p));
  }
  const visibleIPD = IPD_PATIENTS.filter(p => centreMatch(p));
  const el = document.getElementById('ipd-list'); if(!el) return;
  if(!visibleIPD.length) {
    el.innerHTML = '<div style="padding:30px;text-align:center;color:var(--g1)"><div style="font-size:36px;margin-bottom:8px">🛏️</div><div style="font-size:13px;font-weight:700">No patients admitted</div><div style="font-size:11px;margin-top:4px">Use the + Admit button to add a patient</div></div>';
    return;
  }
  el.innerHTML = visibleIPD.map(p => `
    <div onclick="openIPDPatient('${p.id}')"
      style="display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:var(--r);cursor:pointer;margin-bottom:6px;border:1.5px solid ${p.status==='critical'?'var(--red)':'var(--g4)'};background:${p.status==='critical'?'var(--red-lt)':'#fff'}"
      onmouseover="this.style.background='var(--g6)'" onmouseout="this.style.background='${p.status==='critical'?'var(--red-lt)':'#fff'}'">
      <div style="width:38px;height:38px;border-radius:50%;background:#1A3C6E;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:13px;flex-shrink:0">${p.initials||p.name[0]||'?'}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:800;font-size:13px">${p.name}</div>
        <div style="font-size:10.5px;color:var(--g1)">${p.ward||'—'} · ${p.dx||p.diagnosis||'—'} · ${bmhDeptLabel(p.dept)}</div>
      </div>
      <span class="badge ${ipdEvaluateAlerts(p).some(a=>a.tone==='var(--red)') ? 'bd-red' : p.status==='stable'?'bd-green':'bd-gray'}">${ipdEvaluateAlerts(p).some(a=>a.tone==='var(--red)') ? 'alert' : (p.status||'admitted')}</span>
    </div>`).join('');
  if (activeIPDPatient && visibleIPD.some(p => p.id === activeIPDPatient.id)) openIPDPatient(activeIPDPatient.id);
}

// ── renderOTList — renders into ot-all-list + tab sub-lists ──────────────
function renderOTList() {
  // Support both old 'ot-list' and new tab-based layout
  const hasTabLayout = !!document.getElementById('ot-all-list');
  const emptyHTML = '<div style="padding:30px;text-align:center;color:var(--g1)"><div style="font-size:36px;margin-bottom:8px">🏥</div><div style="font-size:13px;font-weight:700">No OT cases scheduled</div><div style="font-size:11px;color:var(--g2);margin-top:4px">Click + Add Case to schedule a procedure</div></div>';

  // Load from Firebase if empty
  if(!OT_CASES.length && window.fbOnce) {
    fbOnce('otCases').then(data=>{
      if(data) {
        Object.values(data).forEach(c=>{ if(!OT_CASES.find(x=>x.id===c.id)) OT_CASES.push(c); });
        renderOTList();
      }
    }).catch(()=>{});
  }

  const dateFilter = document.getElementById('ot-date-inp')?.value || '';
  const surgeonFilter = document.getElementById('ot-surgeon-sel')?.value || '';
  OT_CASES.forEach(function (c, idx) { OT_CASES[idx] = normalizeOTCaseRecord(c); });
  let cases = OT_CASES.filter(c => centreMatch(c));
  if(dateFilter) cases = cases.filter(c => (c.date||c.scheduledDate||'') === dateFilter);
  if(surgeonFilter && surgeonFilter !== 'All Surgeons') cases = cases.filter(c => c.surgeon === surgeonFilter);

  const buildCard = (c,i) => {
    try {
      return typeof otCaseCard==='function' ? otCaseCard(c,i+1) : `<div style="border:1.5px solid var(--g4);border-radius:var(--r);padding:12px;margin-bottom:8px"><div style="font-weight:800;font-size:13px">${c.patient}</div><div style="font-size:11px;color:var(--g1)">${c.procedure||'—'} · ${c.scheduledTime||'—'} · ${c.surgeon||'—'}</div></div>`;
    } catch (e) {
      console.warn('OT case fallback render:', c?.id, e);
      const safe = normalizeOTCaseRecord(c || {});
      return `<div style="border:1.5px solid var(--orange);border-radius:var(--r);padding:12px;margin-bottom:8px;background:var(--orange-lt)">
        <div style="font-weight:800;font-size:13px">${safe.patient||'OT Case'}</div>
        <div style="font-size:11px;color:var(--g1)">${safe.procedure||'—'} · ${safe.scheduledTime||'—'} · ${safe.surgeon||'—'}</div>
      </div>`;
    }
  };

  if(hasTabLayout) {
    const noMatch = '<div style="padding:20px;text-align:center;color:var(--g2);font-size:12px">No cases</div>';
    const setEl=(id,html)=>{const e=document.getElementById(id);if(e)e.innerHTML=html;};
    setEl('ot-all-list', cases.length ? cases.map(buildCard).join('') : emptyHTML);
    setEl('ot-pending-list', (()=>{const f=cases.filter(c=>c.status==='pending'||!c.status); return f.length?f.map(buildCard).join(''):noMatch;})());
    setEl('ot-inprog-list', (()=>{const f=cases.filter(c=>c.status==='in-progress'); return f.length?f.map(buildCard).join(''):noMatch;})());
    setEl('ot-done-list', (()=>{const f=cases.filter(c=>c.status==='completed'); return f.length?f.map(buildCard).join(''):noMatch;})());
    setEl('ot-post-list', (()=>{const f=cases.filter(c=>c.status==='postponed'); return f.length?f.map(buildCard).join(''):noMatch;})());
  } else {
    const el = document.getElementById('ot-list'); if(!el) return;
    el.innerHTML = cases.length ? cases.map(buildCard).join('') : emptyHTML;
  }
}

// ── updIOP — live update right panel ─────────────
function updIOP(eye, val) {
  const n = parseFloat(val);
  const boxId = 'iop-'+eye+'-box';
  const valId = 'iop-'+eye+'-val';
  const noteId = 'iop-'+eye+'-note';
  const box = document.getElementById(boxId);
  const valEl = document.getElementById(valId);
  const noteEl = document.getElementById(noteId);
  const rpId = eye==='od' ? 'rp-iop-od' : 'rp-iop-os';
  const rpEl = document.getElementById(rpId);

  if(!isNaN(n) && n > 0) {
    const high = n > 21;
    if(box)  { box.style.background = high?'var(--red-lt)':'var(--green-lt)'; box.style.borderColor = high?'var(--red)':'var(--green)'; }
    if(valEl){ valEl.textContent=n; valEl.style.color = high?'var(--red)':'#1a8c3c'; }
    if(noteEl){ noteEl.textContent = n+' mmHg '+(high?'⚠️ HIGH':'Normal'); noteEl.style.color = high?'var(--red)':'#1a8c3c'; }
    if(rpEl)  rpEl.textContent = n;
    // Show alert banner if high
    const alert = document.getElementById('iop-alert-banner');
    if(alert && high) {
      alert.style.display='flex';
      const txt=document.getElementById('iop-alert-txt');
      if(txt) txt.textContent='IOP '+(eye==='od'?'OD':'OS')+' elevated at '+n+' mmHg — review management';
    }
  } else {
    if(rpEl) rpEl.textContent='—';
  }
}

// ── buildQCard — patient queue card ─────────────
function buildQCard(p, sno) {
  const deptLabel = {ophtho:'Eye',obg:'OBG',psych:'Psych',skin:'Skin',lab:'Lab'}[p.dept]||p.dept||'—';
  const deptColor = {ophtho:'var(--blue)',obg:'#c0004e',psych:'var(--orange)',skin:'var(--purple)',lab:'var(--teal)'}[p.dept]||'var(--g2)';
  const isOphtho = p.dept==='ophtho';
  const now = Date.now();
  // Waiting time
  const waitMin = p.checkinAt ? Math.floor((now - p.checkinAt)/60000) : 0;
  const waitStr = waitMin < 60 ? waitMin+'m' : Math.floor(waitMin/60)+'h '+( waitMin%60)+'m';
  // Dilation time
  const dilMin = p.dilated && p.dilatedTime ? Math.floor((now - p.dilatedTime)/60000) : 0;
  const dilLongWait = p.dilated && dilMin >= 30;
  const dilStr = p.dilated ? `💧${dilMin}m` : '';
  // Visit number (count past visits)
  const visitNo = (p.visitCount||1);
  const isNew = visitNo <= 1;
  // Charge status
  const pendingPRs = PAY_REQUESTS.filter(r=>r.bmhId===p.bmhId&&r.status==='pending');
  const pendingAmt = pendingPRs.reduce((s,r)=>s+r.amount,0);
  const runningDue = Math.max(Number(p.balance) || 0, pendingAmt);
  const paidPRs = PAY_REQUESTS.filter(r=>r.bmhId===p.bmhId&&r.status==='paid');
  const pendingPRIds = pendingPRs.map(r=>r.id);
  const chargeHtml = runningDue>0
    ? `<span onclick="event.stopPropagation()" style="display:inline-flex;align-items:center;gap:3px;background:rgba(255,149,0,.15);color:#8a4200;border:1px solid rgba(255,149,0,.4);border-radius:10px;padding:1px 6px;font-size:9px;font-weight:800;animation:pulse 2s infinite">⚠️ Surgery due ₹${runningDue.toLocaleString('en-IN')}${pendingAmt>0?`<button title="Delete all pending charges for this patient" onclick="event.stopPropagation();deletePatientPendingCharges('${p.bmhId}')" style="background:none;border:none;cursor:pointer;padding:0 0 0 2px;font-size:10px;color:#c0392b;line-height:1">🗑</button>`:''}</span>`
    : paidPRs.length
    ? `<span style="background:var(--green-lt);color:#1a8c3c;border:1px solid var(--green);border-radius:10px;padding:1px 6px;font-size:9px;font-weight:800">✓ Paid</span>`
    : p.advance>0 ? `<span style="background:var(--blue-lt);color:var(--blue);border:1px solid rgba(0,122,255,.3);border-radius:10px;padding:1px 6px;font-size:9px;font-weight:800">💙 Adv ₹${p.advance.toLocaleString('en-IN')}</span>` : '';
  const statusBadge = p.preRegistered
    ? `<span style="background:#f0f0f0;color:#888;border-radius:10px;padding:1px 7px;font-size:9px;font-weight:800;border:1px dashed #bbb">⏳ Need to Check In</span>`
    : p.seen
    ? `<span style="background:var(--green-lt);color:#1a8c3c;border-radius:10px;padding:1px 7px;font-size:9px;font-weight:800">Seen</span>`
    : p.dilated
    ? `<span style="background:var(--blue-lt);color:var(--blue);border-radius:10px;padding:1px 7px;font-size:9px;font-weight:800">💧Dilated</span>`
    : `<span style="background:var(--orange-lt);color:#8a4200;border-radius:10px;padding:1px 7px;font-size:9px;font-weight:800">Waiting</span>`;

  const cardBg = p.preRegistered ? '#f8f8f8' : '#fff';
  const cardBorder = p.preRegistered ? '1px dashed #ccc' : '1px solid var(--g5)';
  return `<div class="q-card compact ${p.status}" onclick="${p.preRegistered?`checkInPatient('${p.bmhId}')`:`openPatient('${p.bmhId}')`}" style="cursor:pointer;padding:6px 9px;margin-bottom:4px;border-radius:8px;border:${cardBorder};background:${cardBg};display:flex;align-items:center;gap:7px;opacity:${p.preRegistered?'.75':'1'}"
    onmouseover="this.style.background='var(--g6)'" onmouseout="this.style.background='${cardBg}'">
    ${sno!==undefined?`<div style="font-size:10px;font-weight:900;color:var(--g2);width:16px;text-align:center;flex-shrink:0">${sno}</div>`:''}
    <div style="width:30px;height:30px;border-radius:50%;background:${p.color||'#1A3C6E'};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;flex-shrink:0">${p.initials||p.name[0]||'?'}</div>
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap">
        <span style="font-weight:800;font-size:12.5px;white-space:nowrap">${p.name}</span>
        <span style="font-size:9px;padding:1px 5px;border-radius:8px;background:${deptColor}22;color:${deptColor};font-weight:800;border:1px solid ${deptColor}44">${deptLabel}</span>
        ${isNew?'<span style="font-size:9px;padding:1px 5px;border-radius:8px;background:#e8f5e9;color:#1a8c3c;font-weight:800;border:1px solid #a5d6a7">NEW</span>':'<span style="font-size:9px;padding:1px 5px;border-radius:8px;background:#e3f2fd;color:var(--blue);font-weight:800;border:1px solid #bbdefb">V'+visitNo+'</span>'}
        ${chargeHtml}
      </div>
      <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:2px">
        <span style="font-size:10px;color:var(--g1);font-family:var(--mono)">${p.bmhId}</span>
        <span style="font-size:10px;color:var(--g1)">${p.age||'?'}Y/${(p.sex||'?')[0]}</span>
        ${p.doctor?`<span style="font-size:10px;color:var(--teal);font-weight:700">🩺${p.doctor.replace('Dr. ','Dr.')}</span>`:''}
        ${p.purpose?`<span style="font-size:10px;color:var(--g1)">${p.purpose}</span>`:''}
        ${!p.preRegistered?`<span style="font-size:10px;color:var(--g2)">⏱${waitStr}</span>`:''}
        ${dilStr?`<span style="font-size:10px;color:var(--blue);${dilLongWait?'animation:pulse 1.35s infinite;font-weight:900;':''}">${dilStr}</span>`:''}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0">
      ${p.dilated && dilLongWait ? statusBadge.replace('">💧Dilated',';animation:pulse 1.35s infinite">💧Dilated') : statusBadge}
      <div style="display:flex;gap:3px" onclick="event.stopPropagation()">
        ${p.preRegistered
          ? `<button title="Check In & Collect Fee" style="background:var(--blue);color:#fff;border:none;border-radius:5px;padding:2px 8px;font-size:9px;font-weight:800;cursor:pointer;line-height:1.6;animation:pulse 2s infinite" onclick="checkInPatient('${p.bmhId}')">✅ Check In</button>`
          : `${!p.seen?`<button title="Mark Seen" style="background:var(--green);color:#fff;border:none;border-radius:5px;padding:2px 6px;font-size:9px;font-weight:800;cursor:pointer;line-height:1.4" onclick="markSeen('${p.bmhId}')">✓</button>`:''}
        ${isOphtho&&!p.dilated?`<button title="Dilate" style="background:var(--blue-lt);color:var(--blue);border:1.5px solid var(--blue);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="markDilated('${p.bmhId}','${p.name.replace(/'/g,"\\'")}')">💧</button>`:''}
        <button title="Cross-Refer" style="background:rgba(11,123,140,.1);color:var(--teal);border:1.5px solid var(--teal);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="openXRefModal('${p.bmhId}')">↔️</button>
        <button title="IPD" style="background:rgba(175,82,222,.1);color:var(--purple);border:1.5px solid var(--purple);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="openIPDFromQueue('${p.bmhId}')">🛏️</button>
        <button title="Add to OT" style="background:rgba(255,149,0,.1);color:var(--orange);border:1.5px solid var(--orange);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="openOTFromQueue('${p.bmhId}')">🔬</button>
        <button title="Remove from Queue" style="background:rgba(204,0,0,.08);color:#c0392b;border:1.5px solid rgba(192,57,43,.45);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="removePatientFromQueue('${p.bmhId}')">🗑️</button>`
        }
      </div>
    </div>
  </div>`;
}

function parsePatientAgeYears(ageStr) {
  if(ageStr==null||ageStr==='') return null;
  const m = String(ageStr).match(/(\d+)/);
  return m ? parseInt(m[1],10) : null;
}
function isPatientVulnerable(p) {
  if(p.vulnerable===true || p.highRisk===true) return true;
  const y = parsePatientAgeYears(p.age);
  if(y!==null && y>=65) return true;
  return false;
}
/** Ophthalmology dilation elapsed (— if not eye / not dilated yet). */
function dilationCellHtml(p) {
  if(p.dept!=='ophtho') return '<span style="color:var(--g2);font-size:10px">—</span>';
  if(!p.dilated || !p.dilatedTime) {
    return '<span style="font-size:10px;color:var(--g2)">—</span>';
  }
  const now = Date.now();
  const dilMin = Math.floor((now - p.dilatedTime)/60000);
  return `<span style="font-size:10px;font-weight:800;padding:3px 8px;border-radius:8px;background:var(--purple-lt);color:var(--purple);${dilMin>=30?'animation:pulse 1.35s infinite;':''}">${dilMin}m elapsed</span>`;
}

/** Table row for Reception Queue tab and Doctor My Queue (valid <tbody> HTML). */
function buildQTableRow(p, sno, opts) {
  opts = opts || {};
  const receptionQueue = !!opts.receptionQueue;
  const deptLabel = {ophtho:'Eye',obg:'OBG',psych:'Psych',skin:'Skin',lab:'Lab'}[p.dept]||p.dept||'—';
  const deptColor = {ophtho:'var(--blue)',obg:'#c0004e',psych:'var(--orange)',skin:'var(--purple)',lab:'var(--teal)'}[p.dept]||'var(--g2)';
  const isOphtho = p.dept==='ophtho';
  const now = Date.now();
  const waitMin = p.checkinAt ? Math.floor((now - p.checkinAt)/60000) : 0;
  const waitStr = waitMin < 60 ? waitMin+'m' : Math.floor(waitMin/60)+'h '+(waitMin%60)+'m';
  const dilMin = p.dilated && p.dilatedTime ? Math.floor((now - p.dilatedTime)/60000) : 0;
  const dilLongWait = p.dilated && dilMin >= 30;
  const vuln = isPatientVulnerable(p);
  const pendingPRs = PAY_REQUESTS.filter(r=>r.bmhId===p.bmhId&&r.status==='pending');
  const pendingAmt = pendingPRs.reduce((s,r)=>s+r.amount,0);
  const runningDue = Math.max(Number(p.balance) || 0, pendingAmt);
  const paidPRs = PAY_REQUESTS.filter(r=>r.bmhId===p.bmhId&&r.status==='paid');
  const advLbl = (p.advance > 0) ? `<span style="font-size:9px;color:var(--blue);font-weight:800">Adv ₹${(p.advance||0).toLocaleString('en-IN')}</span>` : '';
  const chargeHint = runningDue>0
    ? `<span style="font-size:9px;color:#8a4200;font-weight:800">Surgery due ₹${runningDue.toLocaleString('en-IN')}</span>${advLbl ? ' · ' + advLbl : ''}`
    : paidPRs.length
    ? `<span style="font-size:9px;color:#1a8c3c">Paid</span>${advLbl ? ' · ' + advLbl : ''}`
    : (advLbl || '');
  const statusTxt = p.preRegistered ? 'Pre-reg' : p.seen ? 'Seen' : p.dilated ? 'Dilated' : 'Waiting';
  const statusBg = p.preRegistered ? '#f0f0f0' : p.seen ? 'var(--green-lt)' : p.dilated ? 'var(--blue-lt)' : 'var(--orange-lt)';
  const onRow = p.preRegistered ? `checkInPatient('${p.bmhId}')` : (receptionQueue ? `openReceptionPatient('${p.bmhId}')` : `openPatient('${p.bmhId}')`);
  const nmEsc = (p.name||'').replace(/'/g,"\\'");
  const docShort = (p.doctor||'—').replace(/^Dr\.\s*/,'');
  const vulnBadge = vuln ? '<span class="q-vuln-badge" title="Vulnerable — elderly (≥65) or flagged">⚠ VUL</span>' : '';
  return `<tr class="${vuln ? 'row-vulnerable' : ''}" onclick="${onRow}" style="cursor:pointer;${dilLongWait?'animation:pulse 1.45s infinite;':''}">
    <td style="font-weight:900;color:var(--g2)">${sno}</td>
    <td><div style="display:flex;align-items:center;gap:6px"><span style="width:28px;height:28px;border-radius:50%;background:${p.color||'#1A3C6E'};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:10px;flex-shrink:0">${p.initials||p.name[0]||'?'}</span>
      <div><div style="font-weight:800;font-size:12.5px;display:flex;align-items:center;flex-wrap:wrap;gap:4px">${p.name}${vulnBadge}</div>
      <div style="font-size:10px;color:var(--g1)">${p.age||'?'}Y · ${(p.sex||'?')[0]} · ${p.mob||'—'}</div>${chargeHint?`<div style="margin-top:2px">${chargeHint}</div>`:''}</div></div></td>
    <td style="font-family:var(--mono);font-size:10px;color:var(--bmh-teal);font-weight:700">${p.bmhId}</td>
    <td><span style="font-size:9px;padding:2px 6px;border-radius:6px;background:${deptColor}22;color:${deptColor};font-weight:800">${deptLabel}</span></td>
    <td style="font-size:10px;max-width:88px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${p.doctor||''}">${docShort}</td>
    <td style="font-size:10px;color:var(--g1);max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${p.purpose||''}">${p.purpose||'—'}</td>
    <td>${dilationCellHtml(p)}</td>
    <td style="font-size:10px;color:var(--g2)">${p.preRegistered?'—':waitStr}</td>
    <td><span style="font-size:9px;padding:2px 6px;border-radius:6px;background:${statusBg};font-weight:800;${dilLongWait?'box-shadow:0 0 0 1px rgba(88,86,214,.18);':''}">${statusTxt}</span></td>
    <td class="q-actions" onclick="event.stopPropagation()">
      ${p.preRegistered
        ? `<button type="button" title="Check In" style="background:var(--blue);color:#fff;border:none;border-radius:5px;padding:3px 8px;font-size:9px;font-weight:800;cursor:pointer" onclick="checkInPatient('${p.bmhId}')">Check in</button>`
        : `${!p.seen?`<button type="button" title="Seen" style="background:var(--green);color:#fff;border:none;border-radius:5px;padding:3px 6px;font-size:9px;font-weight:800;cursor:pointer" onclick="markSeen('${p.bmhId}')">✓</button>`:''}
      ${isOphtho&&!p.dilated&&!p.seen?`<button type="button" title="Dilate" style="background:var(--blue-lt);color:var(--blue);border:1.5px solid var(--blue);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="markDilated('${p.bmhId}','${nmEsc}')">💧</button>`:''}
      <button type="button" title="Cross-ref" style="background:rgba(11,123,140,.1);color:var(--teal);border:1.5px solid var(--teal);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="openXRefModal('${p.bmhId}')">↔️</button>
      <button type="button" title="IPD" style="background:rgba(175,82,222,.1);color:var(--purple);border:1.5px solid var(--purple);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="openIPDFromQueue('${p.bmhId}')">🛏️</button>
      <button type="button" title="OT" style="background:rgba(255,149,0,.1);color:var(--orange);border:1.5px solid var(--orange);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="openOTFromQueue('${p.bmhId}')">🔬</button>
      <button type="button" title="Remove" style="background:rgba(204,0,0,.08);color:#c0392b;border:1.5px solid rgba(192,57,43,.45);border-radius:5px;padding:2px 5px;font-size:10px;cursor:pointer" onclick="removePatientFromQueue('${p.bmhId}')">🗑️</button>`
      }
    </td>
  </tr>`;
}

function markSeen(bmhId) {
  const p = PATIENTS.find(x=>x.bmhId===bmhId);
  if(p) { p.seen=true; p.status='seen'; p.dilated=false; }
  fbUpdate && fbUpdate('patients/'+bmhId,{seen:true,status:'seen'}).catch(()=>{});
  renderDocQueue && renderDocQueue();
  renderReceptionPage && renderReceptionPage();
  renderDashboard && renderDashboard();
}

function checkInPatient(bmhId) {
  // Collect fee and change status from pre-registered → waiting
  const p = PATIENTS.find(x=>x.bmhId===bmhId);
  if(!p) return;
  const fee = parseFloat(prompt(`Check in ${p.name}\nConsultation fee (₹):`, '200')||'200')||200;
  if(fee > 0) {
    const txnId = 'TXN'+Date.now();
    const txn = {
      id:txnId, patient:p.name, bmhId, service: p.purpose||'Consultation', amount:fee,
      mode:'Cash', collected:true, dept:p.dept,
      time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
      date:new Date().toISOString(), centre:p.centre||'CHD',
      createdBy:CURRENT_USER?.name||'Reception'
    };
    TRANSACTIONS.push(txn);
    saveTransactionToFirebase&&saveTransactionToFirebase(txn);
  }
  p.status='waiting'; p.preRegistered=false; p.checkinAt=Date.now();
  fbUpdate&&fbUpdate('patients/'+bmhId,{status:'waiting',preRegistered:false,checkinAt:p.checkinAt});
  showToast(`✅ ${p.name} checked in — Token issued`,'s');
  renderDocQueue && renderDocQueue();
  renderReceptionPage && renderReceptionPage();
  renderDashboard && renderDashboard();
}

function deletePayRequest(prId) {
  const pr = PAY_REQUESTS.find(r=>r.id===prId);
  if(!pr) { showToast('Charge not found','w'); return; }
  const label = `₹${pr.amount?.toLocaleString('en-IN')||'?'} charge — ${pr.patient||'?'} (${pr.for||'—'})`;
  if(CURRENT_USER?.isAdmin) {
    if(!confirm(`Delete this charge request?\n${label}\nThis cannot be undone.`)) return;
    const idx = PAY_REQUESTS.findIndex(r=>r.id===prId);
    if(idx>-1) { PAY_REQUESTS.splice(idx,1); try { if(window.firebase&&firebase.database) firebase.database().ref('payRequests/'+prId).remove(); } catch(e){} }
    fbPush&&fbPush('auditLog',{user:CURRENT_USER.name,role:'Admin',action:'DELETE_CHARGE',item:label,timestamp:new Date().toISOString()});
    showToast(`🗑️ Charge deleted: ${label}`,'i');
    renderReceptionPage&&renderReceptionPage(); renderDeptSummary&&renderDeptSummary();
  } else {
    requestDeletion('payRequest', prId, label);
  }
}

// Delete ALL pending charges for a patient (called from queue card charge badge)
function deletePatientPendingCharges(bmhId) {
  const pending = PAY_REQUESTS.filter(r=>r.bmhId===bmhId&&r.status==='pending');
  if(!pending.length) return;
  const pt = PATIENTS.find(x=>x.bmhId===bmhId);
  const label = `All ${pending.length} pending charge(s) for ${pt?.name||bmhId} — total ₹${pending.reduce((s,r)=>s+r.amount,0).toLocaleString('en-IN')}`;
  if(CURRENT_USER?.isAdmin) {
    if(!confirm(`Delete ${pending.length} pending charge(s) for this patient?\n${label}\nThis cannot be undone.`)) return;
    pending.forEach(pr=>{ const idx=PAY_REQUESTS.indexOf(pr); if(idx>-1) PAY_REQUESTS.splice(idx,1); try { if(window.firebase&&firebase.database) firebase.database().ref('payRequests/'+pr.id).remove(); } catch(e){} });
    fbPush&&fbPush('auditLog',{user:CURRENT_USER.name,role:'Admin',action:'DELETE_PT_CHARGES',item:label,timestamp:new Date().toISOString()});
    showToast(`🗑️ Deleted ${pending.length} charge(s)`,'i');
    renderReceptionPage&&renderReceptionPage(); renderDeptSummary&&renderDeptSummary();
  } else {
    requestDeletion('patientCharges', bmhId, label);
  }
}

// ── Edit Patient Details ─────────────────────────────────────────────────────
function openEditPatientModal(bmhId) {
  const bid = bmhId || document.getElementById('rc-uid')?.textContent?.trim();
  if(!bid) { showToast('No patient selected','w'); return; }
  const p = PATIENTS.find(x=>x.bmhId===bid);
  if(!p) { showToast('Patient not found','w'); return; }
  window._editingBmhId = bid;
  const nameParts = (p.name||'').trim().split(' ');
  const setVal = (id,v) => { const e=document.getElementById(id); if(e) e.value=v||''; };
  setVal('upd-fn', nameParts[0]||'');
  setVal('upd-ln', nameParts.slice(1).join(' ')||'');
  setVal('upd-age', p.age||'');
  const sexEl=document.getElementById('upd-sex'); if(sexEl) sexEl.value=p.sex||'Male';
  setVal('upd-dob', p.dob||'');
  setVal('upd-mob', p.mobile||p.mob||'');
  setVal('upd-mob2', p.mob2||p.altMobile||'');
  setVal('upd-email', p.email||'');
  setVal('upd-addr', p.address||p.addr||'');
  setVal('upd-rel', p.relation||p.rel||'');
  setVal('upd-ref-name', p.refName||p.referredBy||'');
  const disp=document.getElementById('upd-bmhid-display'); if(disp) disp.textContent='BMSH ID: '+bid;
  openM('m-update-details');
}

function saveUpdatedPatientDetails() {
  const bid = window._editingBmhId;
  if(!bid) { showToast('No patient selected','w'); return; }
  const p = PATIENTS.find(x=>x.bmhId===bid);
  if(!p) { showToast('Patient not found','w'); return; }
  const fn = document.getElementById('upd-fn')?.value?.trim()||'';
  const ln = document.getElementById('upd-ln')?.value?.trim()||'';
  if(!fn) { showToast('First name is required','w'); return; }
  const updates = {
    name: (fn+' '+ln).trim(),
    age: document.getElementById('upd-age')?.value?.trim()||p.age||'',
    sex: document.getElementById('upd-sex')?.value||p.sex||'Male',
    dob: document.getElementById('upd-dob')?.value||p.dob||'',
    mobile: document.getElementById('upd-mob')?.value?.trim()||p.mobile||p.mob||'',
    mob: document.getElementById('upd-mob')?.value?.trim()||p.mob||p.mobile||'',
    mob2: document.getElementById('upd-mob2')?.value?.trim()||'',
    email: document.getElementById('upd-email')?.value?.trim()||'',
    address: document.getElementById('upd-addr')?.value?.trim()||'',
    addr: document.getElementById('upd-addr')?.value?.trim()||'',
    relation: document.getElementById('upd-rel')?.value?.trim()||'',
    rel: document.getElementById('upd-rel')?.value?.trim()||'',
    refName: document.getElementById('upd-ref-name')?.value?.trim()||''
  };
  // Update initials too
  updates.initials = (fn[0]||(ln[0]||'')).toUpperCase();
  Object.assign(p, updates);
  fbUpdate && fbUpdate('patients/'+bid, updates).catch(()=>{});
  showToast(`✅ ${updates.name} — details updated`,'s');
  closeM('m-update-details');
  renderReceptionPage && renderReceptionPage();
  // Refresh open patient card if visible
  if(typeof renderPatientCard==='function') renderPatientCard(bid);
}

function issueRefundAtReception() {
  const amt = parseFloat(document.getElementById('rc-refund-amt')?.value||'0');
  const reason = document.getElementById('rc-refund-reason')?.value||'Patient request';
  const bmhId = document.getElementById('rc-uid')?.textContent||'';
  const fn = document.getElementById('rc-fn')?.value||'';
  const ln = document.getElementById('rc-ln')?.value||'';
  const ptName = (fn+' '+ln).trim()||'Unknown';
  if(amt<=0) { showToast('Enter refund amount','w'); return; }
  const txnId = 'TXN'+Date.now();
  const txn = {
    id:txnId, patient:ptName, bmhId, service:'Refund — '+reason, amount:-Math.abs(amt),
    mode:document.getElementById('rc-refund-mode')?.value||'Cash',
    collected:true, dept:'reception',
    time:new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
    date:new Date().toISOString(), centre:CURRENT_USER?.centre||'CHD',
    createdBy:CURRENT_USER?.name||'Reception', isRefund:true
  };
  TRANSACTIONS.push(txn);
  saveTransactionToFirebase&&saveTransactionToFirebase(txn);
  // Update patient balance
  const pt = PATIENTS.find(p=>p.bmhId===bmhId);
  if(pt) { pt.balance=(pt.balance||0)-amt; fbUpdate&&fbUpdate('patients/'+bmhId,{balance:pt.balance}); }
  showToast(`↩️ Refund ₹${amt.toLocaleString('en-IN')} issued to ${ptName} ✓`,'s');
  // Reset refund fields
  const ra=document.getElementById('rc-refund-amt'); if(ra) ra.value='';
  const rr=document.getElementById('rc-refund-reason'); if(rr) rr.value='';
  renderCollectionDashboard&&renderCollectionDashboard();
}

// ── renderDocQueue — dept-filtered + sub-lists ───
function renderDocQueue() {
  // Map doctor dept name to patient dept key
  const deptMap = {
    Ophthalmology:'ophtho', OBG:'obg', Neuropsychiatry:'psych',
    Psychiatry:'psych', Skin:'skin', Cosmetology:'skin', Dermatology:'skin',
    'Skin & Cosmetology':'skin', Lab:'lab', Reception:'reception'
  };
  const userDept = normalizeDeptKeyForQueue(deptMap[CURRENT_USER?.dept] || CURRENT_USER?.dept || '');

  // Filter: admin/reception sees all; doctor sees own dept (and optionally own name)
  const validStatuses = p => p.status==='waiting'||p.status==='seen'||p.status==='pre-registered'||p.dilated;
  const myPts = (() => {
    if (CURRENT_USER?.isAdmin || CURRENT_USER?.role === 'Reception') {
      return PATIENTS.filter(p => validStatuses(p) && centreMatch(p));
    }
    const deptPts = PATIENTS.filter(p => {
      const ptDept = normalizeDeptKeyForQueue(p.dept || p.department || '');
      const deptMatch = !userDept || ptDept === userDept || (!ptDept && userDept === 'ophtho');
      return deptMatch && validStatuses(p) && centreMatch(p);
    });
    const strict = deptPts.filter(p => !CURRENT_USER?.name || !p.doctor || doctorMatchesPatientQueue(p.doctor, CURRENT_USER.name));
    return strict.length ? strict : deptPts;
  })();

  // Active list keeps all waiting patients visible; dilated patients also remain in dedicated dilated queue.
  const active  = myPts.filter(p => !p.seen);
  const dilated = myPts.filter(p => p.dilated && !p.seen);
  const done    = myPts.filter(p => p.seen);
  const xrefs   = (window.XREF_LOG||[]).filter(x => !userDept || x.fromDept===userDept || x.toDept===userDept);
  const ipdPts  = (window.IPD_PATIENTS||[]).filter(p => !userDept || p.dept===userDept || CURRENT_USER?.isAdmin);

  const emptyRow = label => `<tr><td colspan="10" style="text-align:center;padding:24px;color:var(--g2);font-size:12.5px">No ${label} patients</td></tr>`;

  const ae = document.getElementById('dq-active-list');
  if(ae) ae.innerHTML = active.length ? active.map((p,i)=>buildQTableRow(p,i+1)).join('') : emptyRow('active');

  const de = document.getElementById('dq-dil-list');
  if(de) de.innerHTML = dilated.length ? dilated.map((p,i)=>buildQTableRow(p,i+1)).join('') : emptyRow('dilated');

  const dne = document.getElementById('dq-done-list');
  if(dne) dne.innerHTML = done.length ? done.map((p,i)=>buildQTableRow(p,i+1)).join('') : emptyRow('done');

  // Dilated tab visibility — only show for ophtho
  const dilTab = document.getElementById('dq-tab-dil');
  if(dilTab) dilTab.style.display = (userDept==='ophtho'||CURRENT_USER?.isAdmin) ? '' : 'none';

  // Cross-refer log
  const xe = document.getElementById('dq-xref-log');
  if(xe) xe.innerHTML = xrefs.length ? xrefs.map(x => `
    <div style="display:flex;align-items:center;gap:9px;padding:9px 11px;background:${x.fee?'var(--orange-lt)':'var(--green-lt)'};border-radius:var(--rsm);margin-bottom:6px;border-left:3px solid ${x.fee?'var(--orange)':'var(--green)'}">
      <div style="flex:1">
        <div style="font-size:12.5px;font-weight:800">${x.ptName}</div>
        <div style="font-size:10.5px;color:var(--tx3);margin-top:2px">→ ${x.toDoctor} · ${x.reason||'No reason given'}</div>
        <div style="font-size:10px;color:var(--g1);margin-top:1px">${x.time||''}</div>
      </div>
      <span class="badge ${x.fee?'bd-orange':'bd-green'}">${x.fee?'💳 Paid Ref':'✓ Free Ref'}</span>
      <span class="badge ${x.paid?'bd-green':x.fee?'bd-red':'bd-gray'}">${x.paid?'Cleared':x.fee?'Awaiting Payment':'No Fee'}</span>
    </div>`).join('') : '<div style="padding:20px;text-align:center;color:var(--g2);font-size:12px">No cross-referrals today</div>';

  // IPD list in queue
  const ie = document.getElementById('dq-ipd-list');
  if(ie) ie.innerHTML = ipdPts.length ? ipdPts.map(ip => `
    <div style="display:flex;align-items:center;gap:9px;padding:10px 12px;background:var(--purple-lt);border-radius:var(--rsm);margin-bottom:6px;border-left:3px solid var(--purple)">
      <div style="width:32px;height:32px;border-radius:50%;background:${ip.color||'var(--purple)'};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:11px;flex-shrink:0">${ip.initials||ip.name[0]||'?'}</div>
      <div style="flex:1">
        <div style="font-size:12.5px;font-weight:800">${ip.name}</div>
        <div style="font-size:10.5px;color:var(--tx3);margin-top:1px">🛏️ ${ip.ward||'—'} · ${ip.type||'—'}</div>
        <div style="font-size:10px;color:var(--g1);margin-top:1px">Dr. ${ip.doctor||'—'} · Admitted ${ip.admittedDate||'—'}</div>
      </div>
      <button class="btn btn-xs btn-outline" onclick="openIPDPatient('${ip.id}')">View</button>
    </div>`).join('') : '<div style="padding:20px;text-align:center;color:var(--g2);font-size:12px">No IPD patients</div>';
}

// ── Setting: Doctor credentials render ──────────
function renderDrSettings() {
  renderDrCredentials && renderDrCredentials();
}

// ── Init remember-me restore on load ────────────
// ════════════════════════════════════════════════════════════════════════════
// saveVisit — persists dept visit to Firebase (visits/{bmhId}/{visitKey})
// ════════════════════════════════════════════════════════════════════════════
function saveVisit(dept) {
  const uidMap = { ophtho:'ophtho-pt-uid', obg:'obg-pt-uid', psych:'psych-pt-uid', skin:'skin-pt-uid' };
  const nmMap  = { ophtho:'ophtho-pt-nm',  obg:'obg-pt-nm',  psych:'psych-pt-nm',  skin:'skin-pt-nm'  };
  const bmhId  = document.getElementById(uidMap[dept])?.textContent?.trim();
  const ptName = document.getElementById(nmMap[dept])?.textContent?.trim();
  if(!bmhId || bmhId === '—') {
    showToast('No patient selected — open a patient first','w'); return;
  }
  const now = new Date();
  const visitKey = 'V' + now.getTime();
  const visit = {
    id: visitKey,
    bmhId, ptName, dept,
    date: now.toISOString(),
    dateLabel: now.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}),
    doctor: CURRENT_USER?.name || '—',
    centre: CURRENT_USER?.centre || 'CHD',
    savedBy: CURRENT_USER?.name || 'System',
  };
  if(dept === 'ophtho') {
    visit.vaOD   = document.getElementById('ucva-od-dist')?.value || '';
    visit.vaOS   = document.getElementById('ucva-os-dist')?.value || '';
    visit.vaODNear = document.getElementById('ucva-od-near')?.value || '';
    visit.vaOSNear = document.getElementById('ucva-os-near')?.value || '';
    visit.iopGatOD = document.getElementById('iop-gat-od')?.value || '';
    visit.iopGatOS = document.getElementById('iop-gat-os')?.value || '';
    visit.iopNctOD = document.getElementById('iop-nct-od')?.value || '';
    visit.iopNctOS = document.getElementById('iop-nct-os')?.value || '';
    visit.pachyOD  = document.getElementById('pachy-od')?.value   || '';
    visit.pachyOS  = document.getElementById('pachy-os')?.value   || '';
    visit.gonioOD  = document.getElementById('gonio-od')?.value   || '';
    visit.gonioOS  = document.getElementById('gonio-os')?.value   || '';
    visit.rfODsph  = document.getElementById('rf-od-sph2')?.value || '';
    visit.rfODcyl  = document.getElementById('rf-od-cyl2')?.value || '';
    visit.rfODax   = document.getElementById('rf-od-ax2')?.value  || '';
    visit.rfOSsph  = document.getElementById('rf-os-sph2')?.value || '';
    visit.rfOScyl  = document.getElementById('rf-os-cyl2')?.value || '';
    visit.rfOSax   = document.getElementById('rf-os-ax2')?.value  || '';
    visit.cycODsph = document.getElementById('cyc-od-sph')?.value || '';
    visit.cycODcyl = document.getElementById('cyc-od-cyl')?.value || '';
    visit.cycODax  = document.getElementById('cyc-od-ax')?.value  || '';
    visit.cycOSsph = document.getElementById('cyc-os-sph')?.value || '';
    visit.cycOScyl = document.getElementById('cyc-os-cyl')?.value || '';
    visit.cycOSax  = document.getElementById('cyc-os-ax')?.value  || '';
    visit.subjODsph = document.getElementById('subj-od-sph')?.value || '';
    visit.subjODcyl = document.getElementById('subj-od-cyl')?.value || '';
    visit.subjODax  = document.getElementById('subj-od-ax')?.value  || '';
    visit.subjOSsph = document.getElementById('subj-os-sph')?.value || '';
    visit.subjOScyl = document.getElementById('subj-os-cyl')?.value || '';
    visit.subjOSax  = document.getElementById('subj-os-ax')?.value  || '';
    visit.fundODdisc = document.getElementById('fund-od-disc')?.value || '';
    visit.fundODcd   = document.getElementById('fund-od-cd')?.value   || '';
    visit.fundODmac  = document.getElementById('fund-od-mac')?.value  || '';
    visit.fundODves  = document.getElementById('fund-od-ves')?.value  || '';
    visit.fundODper  = document.getElementById('fund-od-per')?.value  || '';
    visit.fundODtext = document.getElementById('fundus-od')?.value    || '';
    visit.fundOSdisc = document.getElementById('fund-os-disc')?.value || '';
    visit.fundOScd   = document.getElementById('fund-os-cd')?.value   || '';
    visit.fundOSmac  = document.getElementById('fund-os-mac')?.value  || '';
    visit.fundOSves  = document.getElementById('fund-os-ves')?.value  || '';
    visit.fundOSper  = document.getElementById('fund-os-per')?.value  || '';
    visit.fundOStext = document.getElementById('fundus-os')?.value    || '';
    const slChips = {};
    document.querySelectorAll('#oe-slitlamp .sl-sl-row, #oe-slitlamp [style*="grid-template-columns:90px"]').forEach(row => {
      const label = row.querySelector('[style*="9.5px"]')?.textContent?.trim();
      if(!label) return;
      const cols = row.querySelectorAll('[style*="background:rgba"]');
      if(cols.length < 2) return;
      slChips[label] = {
        od: [...cols[0].querySelectorAll('.sl-chip.sel')].map(c=>c.textContent.trim()),
        os: [...cols[1].querySelectorAll('.sl-chip.sel')].map(c=>c.textContent.trim())
      };
    });
    visit.slChips = slChips;
    visit.slNotes = document.getElementById('sl-notes-text')?.value || '';
    const dxRows = getOphthoDiagnosisRows();
    visit.diagnoses = dxRows;
    visit.diagnosisText = document.getElementById('rx-diagnosis-text')?.value?.trim() || '';
    visit.dx = dxRows.map(formatDxLineForPrint).filter(Boolean).join(' · ') || visit.diagnosisText || '';
    visit.postSurgeryRx = !!document.getElementById('rx-post-surgery')?.checked;
    visit.positiveFindings = buildOphthoPositiveFindingsList().join('; ');
    visit.procedures = [...document.querySelectorAll('#rx-proc-advised [data-proc]')].map(e=>e.dataset.proc).filter(Boolean);
    const ccRows = [];
    document.querySelectorAll('.cc-row').forEach(row=>{
      const txt = row.querySelector('.cc-inp')?.value?.trim();
      if(txt) ccRows.push({text:txt, dur:row.querySelector('.cc-dur')?.value||'', eye:row.querySelector('.cc-eye')?.value||''});
    });
    visit.ccRows = ccRows;
    visit.rx = JSON.parse(JSON.stringify(RX_DRUGS || []));
    visit.investigations = JSON.parse(JSON.stringify(window.CURRENT_PATIENT?.lastVisit?.investigations || []));
    visit.hxSpectacles = document.getElementById('hx-spectacles')?.value || '';
    visit.hxLastSpec = document.getElementById('hx-last-spec')?.value || '';
    visit.hxOcularMeds = document.getElementById('hx-ocular-meds')?.value || '';
    visit.familyHx = document.getElementById('hx-family')?.value || '';
    visit.otherSystemic = document.getElementById('hx-other-systemic')?.value || '';
    visit.drugAllergy = document.getElementById('drug-allergy')?.value || '';
    visit.drugAllergySpec = document.getElementById('drug-allergy-spec')?.value || '';
    visit['refr-enable'] = !!document.getElementById('refr-enable')?.checked;
    ['refr-age','refr-stable','refr-occupation','refr-topo','refr-dryeye','refr-preg','refr-autoimmune','refr-kc','refr-allergy','refr-flap','refr-od-pachy','refr-os-pachy']
      .forEach(id => { visit[id] = document.getElementById(id)?.value || ''; });
    visit.pohOdText = document.getElementById('poh-od-text')?.value || '';
    visit.pohOsText = document.getElementById('poh-os-text')?.value || '';
    const PHX_IDS = ['phx-allergy','phx-diabetes_mellit','phx-hypertension','phx-heart_disease__','phx-asthma___copd','phx-headache___migr','phx-thyroid_disease','phx-renal_disease','phx-previous_surger','phx-bleeding_disord'];
    visit.phxExtra = {};
    PHX_IDS.forEach(id => {
      visit.phxExtra[id] = {
        dur: document.getElementById(id+'-dur')?.value || '',
        rx: document.getElementById(id+'-rx')?.value || ''
      };
    });
    visit.advice = document.getElementById('rx-advice-text')?.value || '';
  } else if(dept === 'obg') {
    const obgCheckboxIds = ['obg-anc-booking','obg-anc-warning','obg-anc-highrisk','obg-anc-fetal','obg-gyn-aub','obg-gyn-discharge','obg-gyn-pain','obg-gyn-menopause','obg-inf-ovulatory','obg-inf-tubal','obg-inf-endo','obg-inf-male','obg-redflag-bleeding','obg-redflag-leak','obg-redflag-headache','obg-redflag-pain','obg-redflag-fever','obg-redflag-decreasedfm','obg-redflag-swelling','obg-redflag-convulsions','obg-hr-prevlscs','obg-hr-gdm','obg-hr-pih','obg-hr-iugr','obg-hr-multiple','obg-hr-rhneg','obg-hr-placenta','obg-hr-anemia','obg-fetal-growthlag','obg-fetal-malpresentation','obg-fetal-lowliquor','obg-fetal-postdates','obg-aub-clots','obg-aub-intermenstrual','obg-aub-postcoital','obg-aub-anemia','obg-vag-pruritus','obg-vag-foul','obg-vag-dyspareunia','obg-vag-pidrisk','obg-pain-cyclical','obg-pain-severe','obg-pain-bowel','obg-pain-infertility','obg-inf-coital','obg-inf-pastpid','obg-inf-priorsurgery','obg-inf-galactorrhoea','obg-inf-hirsutism','obg-inf-maleabn','obg-inf-lowreserve','obg-inf-rpl'];
    visit.lmp = obgVal('obg-lmp');
    visit.edd = document.getElementById('obg-edd')?.textContent || '';
    visit.ga = document.getElementById('obg-ga')?.textContent || '';
    visit.g = obgVal('obg-g');
    visit.p = obgVal('obg-p');
    visit.a = obgVal('obg-a');
    visit.l = obgVal('obg-l');
    visit.gravida = `G${visit.g || 0}P${visit.p || 0}A${visit.a || 0}L${visit.l || 0}`;
    visit.workflowAnc = !!document.getElementById('obg-track-anc')?.checked;
    visit.workflowGynae = !!document.getElementById('obg-track-gynae')?.checked;
    visit.workflowInfertility = !!document.getElementById('obg-track-infertility')?.checked;
    visit.bloodGroup = obgVal('obg-blood-grp');
    visit.riskTag = obgVal('obg-risk');
    visit.mainComplaint = obgVal('obg-main-complaint');
    visit.systemicDisease = obgVal('obg-systemic');
    visit.lastDeliveryDate = obgVal('obg-last-delivery');
    visit.lastDeliveryMode = obgVal('obg-last-mode');
    visit.trimester = obgVal('obg-tri');
    visit.ancVisitType = obgVal('obg-anc-visit');
    visit.bp = obgVal('obg-bp');
    visit.weight = obgVal('obg-weight');
    visit.fhr = obgVal('obg-fhr');
    visit.fundalHeight = obgVal('obg-fh');
    visit.presentation = obgVal('obg-present');
    visit.urineProtein = obgVal('obg-urine-protein');
    visit.urineSugar = obgVal('obg-urine-sugar');
    visit.fetalMovement = obgVal('obg-fetal-movement');
    visit.warningSign = obgVal('obg-warning');
    visit.usgDue = obgVal('obg-usg-due') || obgVal('obg-usg-due-inline');
    visit.ttDue = obgVal('obg-tt-due') || obgVal('obg-tt-due-inline');
    visit.ancNotes = obgVal('obg-anc-notes');
    visit.cyclePattern = obgVal('obg-cycle');
    visit.flow = obgVal('obg-flow');
    visit.discharge = obgVal('obg-discharge');
    visit.pelvicPain = obgVal('obg-pelvic-pain');
    visit.cervix = obgVal('obg-cervix');
    visit.uterus = obgVal('obg-uterus');
    visit.adnexa = obgVal('obg-adnexa');
    visit.clinicalImpression = obgVal('obg-clinical-impression');
    visit.gynNotes = obgVal('obg-gyn-notes');
    visit.infertilityDuration = obgVal('obg-infertility-duration');
    visit.infertilityType = obgVal('obg-infertility-type');
    visit.ovulation = obgVal('obg-ovulation');
    visit.tubalRisk = obgVal('obg-tubal-risk');
    visit.semen = obgVal('obg-semen');
    visit.ovarianReserve = obgVal('obg-ovarian-reserve');
    visit.endoSuspicion = obgVal('obg-endo');
    visit.infertilityNext = obgVal('obg-infertility-next');
    visit.infertilityNotes = obgVal('obg-infertility-notes');
    visit.visitDate = obgVal('obg-visit-date');
    visit.nextReview = obgVal('obg-next-review');
    visit.followupPlan = obgVal('obg-followup-plan');
    visit.investigationChecklist = [...document.querySelectorAll('.obg-lab:checked')].map(x => x.value);
    obgCheckboxIds.forEach(id => { visit[id] = obgChecked(id); });
    const obgGuidance = computeObgGuidance();
    visit.presumptiveDx = obgGuidance.diagnoses;
    visit.askChecklist = obgGuidance.ask;
    visit.lookForChecklist = obgGuidance.lookFor;
    visit.planInvestigations = obgGuidance.investigations;
    visit.planManagement = obgGuidance.management;
    visit.planProcedures = obgGuidance.procedures;
    visit.notes = [visit.ancNotes, visit.gynNotes, visit.infertilityNotes].filter(Boolean).join(' | ');
    visit.dx = Array.isArray(visit.presumptiveDx) ? visit.presumptiveDx.join(' · ') : (visit.clinicalImpression || '');
    visit.rx = JSON.parse(JSON.stringify(RX_DRUGS || []));
  } else if(dept === 'psych') {
    ['psych-chief','psych-duration','psych-onset','psych-trigger','psych-core-syndrome','psych-risk','psych-systemic','psych-sleep','psych-appetite','psych-function','psych-diagnosis','psych-family','psych-personal','psych-pastpsych','psych-medical','psych-substance','psych-suicidality','psych-anxiety','psych-psychosis','psych-polarity','psych-addiction-substance','psych-addiction-pattern','psych-addiction-lastuse','psych-addiction-readiness','psych-stroke-deficit','psych-stroke-timing','psych-stroke-mood','psych-epilepsy-type','psych-epilepsy-last','psych-epilepsy-adherence','psych-epilepsy-trigger','psych-child-concern','psych-child-development','psych-child-school','psych-child-parent','psych-appearance','psych-behaviour','psych-psychomotor','psych-eyecontact','psych-speech-rate','psych-speech-volume','psych-speech-tone','psych-subjective-mood','psych-affect','psych-thought-form','psych-thought-content','psych-hallucinations','psych-orientation','psych-memory','psych-insight','psych-judgement']
      .forEach(id => { visit[id] = psychVal(id); });
    ['psych-track-addiction','psych-track-stroke','psych-track-epilepsy','psych-track-child','psych-track-adult']
      .forEach(id => { visit[id] = !!document.getElementById(id)?.checked; });
    const guidance = computePsychGuidance();
    visit.chiefComplaint = psychVal('psych-chief');
    visit.mse = [psychVal('psych-affect'), psychVal('psych-thought-content'), psychVal('psych-insight')].filter(Boolean).join(' | ');
    visit.notes = document.querySelector('#psych-notes textarea')?.value || '';
    visit.psychPresumptive = guidance.tags;
    visit.psychPlan = guidance.plan;
    visit.psychInvestigations = guidance.investigations;
    visit.psychTherapy = guidance.therapy;
    visit.dx = Array.isArray(guidance.tags) ? guidance.tags.join(' · ') : (psychVal('psych-diagnosis') || '');
    visit.rx = JSON.parse(JSON.stringify(RX_DRUGS || []));
  } else if(dept === 'skin') {
    ['skin-chief','skin-duration','skin-site','skin-fit','skin-primary-dx','skin-secondary-dx','skin-routine','skin-medical','skin-hormonal','skin-lesion','skin-secondary-change','skin-distribution','skin-configuration','skin-hair','skin-nail','skin-dermoscopy','skin-cosm-acne-grade','skin-cosm-sensitivity','skin-cosm-pih','skin-cosm-isotret','skin-cosm-tan','skin-cosm-preg']
      .forEach(id => { visit[id] = document.getElementById(id)?.value || ''; });
    ['skin-cosm-melasma','skin-cosm-acne','skin-cosm-scar','skin-cosm-ageing','skin-cosm-sensitive','skin-cosm-hair']
      .forEach(id => { visit[id] = !!document.getElementById(id)?.checked; });
    const skinGuidance = computeSkinGuidance();
    visit.chiefComplaint = document.getElementById('skin-chief')?.value || '';
    visit.exam = document.getElementById('skin-dermoscopy')?.value || '';
    visit.procedures = document.querySelector('#skin-procedures textarea')?.value || '';
    visit.skinPresumptive = skinGuidance.diagnoses;
    visit.skinInvestigations = skinGuidance.investigations;
    visit.skinPlan = skinGuidance.management;
    visit.skinProcedural = skinGuidance.procedures;
    visit.dx = [document.getElementById('skin-primary-dx')?.value || '', document.getElementById('skin-secondary-dx')?.value || ''].filter(Boolean).join(' · ');
    visit.rx = JSON.parse(JSON.stringify(RX_DRUGS || []));
  }
  if(typeof fbSet !== 'function') { showToast('Save not available (offline)', 'w'); return; }
  const patientPatch = { lastVisit: visit, lastVisitKey: visitKey, lastVisitDate: visit.date, lastDeptVisit: dept };
  if (visit.dx) patientPatch.dx = visit.dx;
  const localPt = window.CURRENT_PATIENT || PATIENTS.find(p => p.bmhId === bmhId);
  if(localPt) {
    localPt.lastVisit = JSON.parse(JSON.stringify(visit));
    localPt.lastVisitKey = visitKey;
    localPt.lastVisitDate = visit.date;
    if (visit.dx) localPt.dx = visit.dx;
  }
  Promise.all([
    fbSet(`visits/${bmhId}/${visitKey}`, visit),
    fbSet(`patients/${bmhId}/lastVisit`, visit),
    typeof fbUpdate === 'function' ? fbUpdate('patients/' + bmhId, patientPatch).catch(()=>{}) : Promise.resolve()
  ])
    .then(() => {
      showToast(`✅ ${ptName} — visit saved (${visit.dateLabel})`, 's');
      if(typeof loadPastVisits === 'function') loadPastVisits(bmhId, dept);
      renderCurrentPatientInvestigationUploads && renderCurrentPatientInvestigationUploads(Array.isArray(visit.investigations) ? visit.investigations : []);
      renderOphthoRecap && renderOphthoRecap();
      renderSkinRail && renderSkinRail();
    })
    .catch(e => showToast('Save failed: ' + e.message, 'w'));
}

function loadPastVisits(bmhId, dept) {
  const container = document.getElementById(dept === 'ophtho' ? 'past-visits-ophtho' : `past-visits-${dept}`);
  if(!container) return;
  const renderVisits = (visitsObj) => {
    const visits = Object.entries(visitsObj || {}).map(([id, v]) => ({ id, ...(v||{}) }))
      .sort((a,b) => String(b.date || b.createdAt || '').localeCompare(String(a.date || a.createdAt || '')));
    if(!visits.length) {
      container.innerHTML = `<div style="text-align:center;padding:30px;color:var(--g2);font-size:12px"><div style="font-size:28px;margin-bottom:8px">📋</div>No past visits saved yet</div>`;
      return;
    }
    container.innerHTML = visits.map(v => {
      const invs = Array.isArray(v.investigations) ? v.investigations : [];
      const cc = Array.isArray(v.ccRows) ? v.ccRows.map(r => r.text).filter(Boolean).join(', ') : '';
      const dx = Array.isArray(v.diagnoses) ? v.diagnoses.map(formatDxLineForPrint).filter(Boolean).join(', ') : (v.diagnosisText || '');
      const obgDx = Array.isArray(v.presumptiveDx) ? v.presumptiveDx.join(', ') : '';
      const obgMeta = dept === 'obg'
        ? `<div style="font-size:11px;margin-bottom:5px"><strong>Summary:</strong> ${(v.gravida || '—')} · ${v.ga || 'GA —'} · EDD ${v.edd || '—'}</div>
           ${obgDx ? `<div style="font-size:11px;margin-bottom:5px"><strong>Presumptive Dx:</strong> ${obgDx}</div>` : ''}
           ${v.nextReview ? `<div style="font-size:11px;margin-bottom:5px"><strong>Next review:</strong> ${obgFmtDate(v.nextReview)}</div>` : ''}`
        : '';
      return `<div style="border:1px solid var(--g5);border-radius:10px;background:#fff;padding:12px;margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:8px">
          <div style="font-size:13px;font-weight:900;color:var(--bmh-blue)">${v.dateLabel || new Date(v.date || Date.now()).toLocaleDateString('en-IN')}</div>
          <div style="font-size:10px;color:var(--g1)">${v.savedBy || v.doctor || ''}</div>
        </div>
        ${obgMeta}
        ${cc ? `<div style="font-size:11px;margin-bottom:5px"><strong>Chief complaints:</strong> ${cc}</div>` : ''}
        ${dx ? `<div style="font-size:11px;margin-bottom:5px"><strong>Diagnosis:</strong> ${dx}</div>` : ''}
        ${invs.length ? `<div style="margin-top:8px"><div style="font-size:10px;font-weight:800;color:var(--g1);text-transform:uppercase;margin-bottom:5px">Investigations</div>${invs.map(inv => `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 8px;background:var(--g6);border-radius:8px;margin-bottom:5px"><div><div style="font-size:11px;font-weight:700">${inv.name}</div><div style="font-size:10px;color:var(--g1)">${Math.round((inv.sizKB||0))} KB · ${new Date(inv.date||Date.now()).toLocaleDateString('en-IN')}</div></div><button class="btn btn-xs btn-outline" onclick="viewStoredInvestigation('${bmhId}','${inv.key}')">Open</button></div>`).join('')}</div>` : ''}
      </div>`;
    }).join('');
  };
  if(typeof fbOnce === 'function') {
    fbOnce(`visits/${bmhId}`).then(renderVisits).catch(() => renderVisits({}));
  } else {
    renderVisits({});
  }
}
function renderOphthoRecap() {
  const el = document.getElementById('ophtho-recap-panel');
  if(!el) return;
  const pt = window.CURRENT_PATIENT || PATIENTS.find(p => p.bmhId === (document.getElementById('ophtho-pt-uid')?.textContent || '').trim());
  if(!pt?.bmhId) {
    el.innerHTML = '<div style="padding:10px;color:var(--g1);font-size:11px">Open a patient to see quick recap.</div>';
    return;
  }
  const numVal = (id, fallback) => {
    const raw = document.getElementById(id)?.value;
    const val = Number(raw);
    if(Number.isFinite(val) && raw !== '') return val;
    return Number.isFinite(Number(fallback)) ? Number(fallback) : null;
  };
  const seFrom = (sphId, cylId, sphFallback, cylFallback) => {
    const sph = numVal(sphId, sphFallback);
    const cyl = numVal(cylId, cylFallback) || 0;
    if(!Number.isFinite(sph)) return null;
    return sph + (cyl / 2);
  };
  const computeOphthoGuidance = () => {
    const dx = [];
    const inv = [];
    const followup = [];
    const systemic = [];
    const refractive = [];
    const cc = [...document.querySelectorAll('.cc-inp')].map(e => e.value.trim()).filter(Boolean).join(' ').toLowerCase();
    const phx = (id) => document.getElementById(id)?.value || pt.lastVisit?.[id] || '';
    const hasDm = phx('phx-diabetes_mellit') === 'Y';
    const hasHtn = phx('phx-hypertension') === 'Y';
    if(hasDm) systemic.push('Diabetes mellitus');
    if(hasHtn) systemic.push('Hypertension');
    const iopOd = numVal('iop-gat-od', pt.lastVisit?.iopGatOD);
    const iopOs = numVal('iop-gat-os', pt.lastVisit?.iopGatOS);
    if((iopOd && iopOd > 21) || (iopOs && iopOs > 21)) {
      dx.push('Glaucoma / ocular hypertension work-up needed');
      inv.push('Repeat applanation IOP, gonioscopy, pachymetry, optic disc + RNFL/OCT, and visual fields');
      followup.push('Glaucoma review within 1-4 weeks depending on pressure and disc status');
    }
    if(/decreased vision|blur|cataract/.test(cc)) {
      dx.push('Media opacity / refractive or retinal cause of visual loss to localize');
      inv.push('Dilated fundus evaluation and biometry if cataract surgery planning');
      followup.push('Procedure counselling after cause and visual potential are documented');
    }
    if(/pain|redness|photophobia/.test(cc)) {
      dx.push('Painful red eye pathway');
      inv.push('Check cornea/anterior chamber, IOP, staining, and fundus if view permits');
      followup.push('Urgent same-day review if pain/redness is significant');
    }
    if(hasDm) {
      inv.push('Dilated retinal examination, OCT macula if vision reduced, and systemic sugar optimization advice');
      followup.push('Retina / diabetic eye screening interval based on retinopathy status');
    }
    const refrAge = numVal('refr-age', pt.age);
    const topo = document.getElementById('refr-topo')?.value || pt.lastVisit?.['refr-topo'] || '';
    const dry = document.getElementById('refr-dryeye')?.value || pt.lastVisit?.['refr-dryeye'] || '';
    const preg = document.getElementById('refr-preg')?.value || pt.lastVisit?.['refr-preg'] || '';
    const autoimmune = document.getElementById('refr-autoimmune')?.value || pt.lastVisit?.['refr-autoimmune'] || '';
    const kc = document.getElementById('refr-kc')?.value || pt.lastVisit?.['refr-kc'] || '';
    const allergy = document.getElementById('refr-allergy')?.value || pt.lastVisit?.['refr-allergy'] || '';
    const stable = document.getElementById('refr-stable')?.value || pt.lastVisit?.['refr-stable'] || '';
    const occupation = document.getElementById('refr-occupation')?.value || pt.lastVisit?.['refr-occupation'] || '';
    const flap = numVal('refr-flap', pt.lastVisit?.['refr-flap'] || 110) || 110;
    const pachyOd = numVal('refr-od-pachy', pt.lastVisit?.['refr-od-pachy']) ?? numVal('pachy-od', pt.lastVisit?.pachyOD);
    const pachyOs = numVal('refr-os-pachy', pt.lastVisit?.['refr-os-pachy']) ?? numVal('pachy-os', pt.lastVisit?.pachyOS);
    const seOd = seFrom('subj-od-sph','subj-od-cyl', pt.lastVisit?.subjODsph, pt.lastVisit?.subjODcyl);
    const seOs = seFrom('subj-os-sph','subj-os-cyl', pt.lastVisit?.subjOSsph, pt.lastVisit?.subjOScyl);
    const ablationFor = (se) => Number.isFinite(se) ? Math.max(0, Math.round(Math.abs(se) * 14)) : null;
    const rsbFor = (pachy, se) => Number.isFinite(pachy) && Number.isFinite(se) ? Math.round(pachy - flap - ablationFor(se)) : null;
    const rsbOd = rsbFor(pachyOd, seOd);
    const rsbOs = rsbFor(pachyOs, seOs);
    const rsbNodes = { od: document.getElementById('refr-od-rsb'), os: document.getElementById('refr-os-rsb') };
    if(rsbNodes.od) rsbNodes.od.textContent = Number.isFinite(rsbOd) ? `${rsbOd} µm estimated residual bed` : 'Need pachymetry + subjective refraction';
    if(rsbNodes.os) rsbNodes.os.textContent = Number.isFinite(rsbOs) ? `${rsbOs} µm estimated residual bed` : 'Need pachymetry + subjective refraction';
    const refrEnabled = !!document.getElementById('refr-enable')?.checked || !!pt.lastVisit?.['refr-enable'];
    if(refrEnabled && (topo || dry || stable || pachyOd || pachyOs)) {
      inv.push('For refractive work-up: stable refraction, topography/tomography, pachymetry, ocular surface review, and dilated fundus exam');
      if(refrAge != null && refrAge < 18) refractive.push('Not eligible yet because age is below standard refractive surgery threshold');
      else if(/Abnormal/.test(topo) || /Known KC|ectasia/.test(kc)) refractive.push('Avoid corneal laser now; ectasia / keratoconus risk needs specialist review');
      else if(/Yes/.test(preg) || /Yes/.test(autoimmune)) refractive.push('Defer refractive surgery until systemic status is suitable and refraction is stable');
      else if(/No \/ changing/.test(stable)) refractive.push('Defer surgery until refraction is stable for at least 1 year');
      else if(/Severe/.test(dry) || /Active VKC/.test(allergy)) refractive.push('Treat ocular surface / allergy first before deciding refractive procedure');
      else if((Number.isFinite(rsbOd) && rsbOd < 300) || (Number.isFinite(rsbOs) && rsbOs < 300)) refractive.push('Corneal laser is not preferred with low estimated residual bed; consider alternative like ICL opinion');
      else if(/Moderate/.test(dry) || /Contact sports/.test(occupation)) refractive.push('SMILE Pro is generally preferred if topography is normal and thickness is adequate');
      else if((Number.isFinite(rsbOd) && rsbOd < 320) || (Number.isFinite(rsbOs) && rsbOs < 320)) refractive.push('PRK / surface ablation may be safer than flap-based surgery if topography is normal');
      else refractive.push('FemtoLASIK or SMILE Pro likely suitable if tomography, tear film, and counselling remain favorable');
    }
    return {
      diagnoses: Array.from(new Set(dx)).slice(0, 4),
      investigations: Array.from(new Set(inv)).slice(0, 4),
      followup: Array.from(new Set(followup)).slice(0, 4),
      systemic: Array.from(new Set(systemic)).slice(0, 4),
      refractive: Array.from(new Set(refractive)).slice(0, 3)
    };
  };
  const txns = (TRANSACTIONS || []).filter(t => t.bmhId === pt.bmhId).slice().sort((a,b)=>new Date(b.date || 0) - new Date(a.date || 0));
  const prs = (PAY_REQUESTS || []).filter(r => r.bmhId === pt.bmhId).slice().sort((a,b)=>new Date(b.date || 0) - new Date(a.date || 0));
  const renderWithVisits = (visitsObj) => {
    const g = computeOphthoGuidance();
    const visits = Object.values(visitsObj || {})
      .filter(v => v && v.dept === 'ophtho')
      .sort((a,b)=>String(b.date || '').localeCompare(String(a.date || '')))
      .slice(0, 5);
    const visitHtml = visits.length ? visits.map(v => {
      const dx = Array.isArray(v.diagnoses) && v.diagnoses.length ? v.diagnoses.slice(0,2).map(formatDxLineForPrint).filter(Boolean).join(', ') : (v.diagnosisText || '—');
      const rx = Array.isArray(v.rx) && v.rx.length ? v.rx.slice(0,2).map(d => rxDrugTradeName(d) || d.trade || d.name || 'Drug').join(', ') : 'No prescription';
      const spec = [v.hxSpectacles, v.hxLastSpec].filter(Boolean).join(' · ') || 'No glasses note';
      return `<div style="padding:9px 10px;border:1px solid var(--g5);border-radius:10px;background:#fff;margin-bottom:7px">
        <div style="display:flex;justify-content:space-between;gap:6px;align-items:flex-start;margin-bottom:4px">
          <div style="font-size:11px;font-weight:800;color:var(--bmh-blue)">${v.dateLabel || new Date(v.date || Date.now()).toLocaleDateString('en-IN')}</div>
          <div style="font-size:10px;color:var(--g1)">${v.doctor || ''}</div>
        </div>
        <div style="font-size:10.5px;line-height:1.42"><b>Dx:</b> ${dx}</div>
        <div style="font-size:10.5px;line-height:1.42;margin-top:3px"><b>Rx:</b> ${rx}</div>
        <div style="font-size:10px;color:var(--g1);line-height:1.36;margin-top:3px"><b>Glasses:</b> ${spec}</div>
      </div>`;
    }).join('') : '<div style="padding:10px;border:1px dashed var(--g4);border-radius:10px;background:#fff;color:var(--g1);font-size:11px">No previous ophthalmology visits saved yet.</div>';
    const paymentHtml = [...txns, ...prs].sort((a,b)=>new Date(b.date || 0) - new Date(a.date || 0)).slice(0, 10).map(item => {
      const isReq = Object.prototype.hasOwnProperty.call(item, 'status');
      return `<div style="display:flex;justify-content:space-between;gap:7px;padding:6px 0;border-bottom:1px solid var(--g5);font-size:10.5px">
        <div style="min-width:0">
          <div style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${isReq ? (item.for || 'Billing request') : (item.service || 'Payment')}</div>
          <div style="font-size:9.5px;color:var(--g1)">${new Date(item.date || Date.now()).toLocaleDateString('en-IN')} · ${(isReq ? item.status : item.mode) || '—'}</div>
        </div>
        <div style="font-weight:800;color:${isReq && item.status==='pending' ? '#8a4200' : 'var(--bmh-blue)'}">₹${(Number(item.amount) || 0).toLocaleString('en-IN')}</div>
      </div>`;
    }).join('') || '<div style="font-size:10.5px;color:var(--g1)">No payments recorded yet.</div>';
    el.innerHTML = `<div style="position:sticky;top:12px;width:100%">
      <div style="font-size:10px;font-weight:900;color:var(--g1);text-transform:uppercase;letter-spacing:.45px;margin-bottom:6px">Quick recap</div>
      <div style="max-height:70vh;overflow:auto;padding-right:4px">
        <div style="padding:9px 10px;border-radius:10px;background:#eef7ff;margin-bottom:8px;border:1px solid rgba(26,60,110,.12)">
          <div style="font-size:10px;font-weight:900;color:var(--blue);text-transform:uppercase;margin-bottom:5px">Diagnostic evaluation</div>
          <div style="font-size:11px;line-height:1.5">${g.diagnoses.join('<br>') || 'Enter symptoms, IOP, fundus, and systemic history to generate guidance.'}</div>
        </div>
        <div style="padding:9px 10px;border-radius:10px;background:#eefaf1;margin-bottom:8px;border:1px solid rgba(26,140,60,.14)">
          <div style="font-size:10px;font-weight:900;color:#1a8c3c;text-transform:uppercase;margin-bottom:5px">Investigations & follow-up</div>
          <div style="font-size:11px;line-height:1.5"><b>Investigations:</b><br>${g.investigations.join('<br>') || 'Biometry / imaging as clinically indicated'}<br><br><b>Follow-up:</b><br>${g.followup.join('<br>') || 'Follow-up depends on diagnosis, IOP, retina, and surgical planning.'}</div>
        </div>
        <div style="padding:9px 10px;border-radius:10px;background:#fff8e8;margin-bottom:8px;border:1px solid rgba(212,160,23,.24)">
          <div style="font-size:10px;font-weight:900;color:#8a4200;text-transform:uppercase;margin-bottom:5px">Refractive suitability</div>
          <div style="font-size:11px;line-height:1.5">${g.refractive.join('<br>') || 'Enable the refractive suitability checkbox in Biometry to assess candidacy and residual bed.'}</div>
        </div>
        <div style="padding:9px 10px;border-radius:10px;background:var(--g6);margin-bottom:8px">
          <div style="font-size:10px;font-weight:900;color:var(--g1);text-transform:uppercase;margin-bottom:5px">Systemic history</div>
          <div style="font-size:11px;line-height:1.45">${g.systemic.join(' • ') || 'No major systemic flags entered yet.'}</div>
        </div>
        ${visitHtml}
        <details style="margin-top:8px;background:#fff;border:1px solid var(--g5);border-radius:10px;padding:8px 10px">
          <summary style="cursor:pointer;font-size:11px;font-weight:800;color:var(--bmh-blue)">Payments & billing</summary>
          <div style="margin-top:8px">${paymentHtml}</div>
        </details>
      </div>
    </div>`;
  };
  if(typeof fbOnce === 'function') fbOnce(`visits/${pt.bmhId}`).then(renderWithVisits).catch(()=>renderWithVisits({}));
  else renderWithVisits({});
}

window.addEventListener('DOMContentLoaded', function() {
  preloadUserSettings && preloadUserSettings();
  // Load saved creds
  try {
    const saved = localStorage.getItem('bmh_creds');
    if(saved) {
      const {u,p} = JSON.parse(saved);
      const ui=document.getElementById('lg-email') || document.getElementById('lg-user');
      const pi=document.getElementById('lg-pass');
      const ri=document.getElementById('lg-remember');
      if(ui&&u) ui.value=u;
      if(pi&&p) pi.value=p;
      if(ri) ri.checked=true;
    }
  } catch(e){}
  try {
    const sessionRaw = sessionStorage.getItem('bmh_active_session');
    if(sessionRaw && !CURRENT_USER) {
      const session = JSON.parse(sessionRaw);
      const profile = session?.u ? USER_DB?.[String(session.u).toLowerCase()] : null;
      if (profile && profile.disabled !== true) {
        activateUserSession(String(session.u).toLowerCase(), profile, { showToastOnSuccess:false, auditLogin:false });
      }
    }
  } catch(e){}
});
