// ─────────────────────────────────────────────────────────────────────────────
// BMH HMS — App Entry Point
// Boots the app: auth → load data → show correct page
// ─────────────────────────────────────────────────────────────────────────────

// ── Historical Queue Functions ───────────────────────────────────────────────
window.loadHistoricalQueue = function() {
  const dateInput = document.getElementById('dq-historical-date');
  if (!dateInput || !dateInput.value) {
    window.showToast?.('Please select a date', 'w');
    return;
  }
  
  const selectedDate = dateInput.value;
  const todayKeyLocal = new Date().toISOString().slice(0, 10);
  
  if (selectedDate === todayKeyLocal) {
    // If today is selected, show current queue
    clearHistoricalDate();
    return;
  }
  
  // Filter patients for the selected historical date
  const historicalPatients = getHistoricalQueuePatients(selectedDate);
  renderHistoricalQueue(historicalPatients, selectedDate);
  
  window.showToast?.(`Showing queue for ${formatDisplayDate(selectedDate)}`, 's');
};

window.clearHistoricalDate = function() {
  const dateInput = document.getElementById('dq-historical-date');
  if (dateInput) {
    dateInput.value = '';
  }
  // Restore normal queue rendering
  if (typeof window.renderDocQueue === 'function') {
    window.renderDocQueue();
  }
  window.showToast?.('Showing current queue', 's');
};

function getHistoricalQueuePatients(targetDate) {
  const patients = window.PATIENTS || [];
  return patients.filter(function(p) {
    if (!p || p.queueRemoved || String(p.status || '').toLowerCase() === 'removed') return false;
    if (!centreMatch(p)) return false;
    
    return patientQueueDateMatches(p, targetDate);
  });
}

function centreMatch(item) {
  if (!item) return false;
  const uc = getEffectiveCentre();
  if(!uc) return true; // admin/BOTH - see everything
  return patientCentreKey(item.centre) === patientCentreKey(uc);
}

function getEffectiveCentre() {
  return document.getElementById('rc-centre')?.value || (window.CURRENT_USER?.centre || 'CHD');
}

function patientCentreKey(c) {
  if (!c) return 'CHD';
  const s = String(c).toLowerCase().trim();
  if (s.includes('chd') || s.includes('chandigarh')) return 'CHD';
  if (s.includes('rop') || s.includes('ropar') || s.includes('rupnagar')) return 'ROP';
  return s;
}

function patientQueueDateMatches(p, targetDate) {
  if (!p || p.queueRemoved) return false;
  
  const stamps = [p.checkinAt, p.createdAt, p.seenAt, p.updatedAt, p.registeredAt, p.visitDate, p.queueDate, p.appointmentDate, p.dischargedAt].filter(Boolean);
  if (!stamps.length) return false;
  
  return stamps.some(function(raw) {
    const s = String(raw || '');
    if (!s) return false;
    if (/^\d+$/.test(s)) {
      try { return localDateKey(new Date(Number(s))) === targetDate; } catch (e) { return false; }
    }
    return localDateKey(s) === targetDate || s.slice(0, 10) === targetDate;
  });
}

function renderHistoricalQueue(patients, selectedDate) {
  const titleEl = document.getElementById('dq-title');
  if (titleEl) {
    titleEl.textContent = `Historical Queue — ${formatDisplayDate(selectedDate)}`;
  }
  
  // Sort patients by checkin time
  const sortedPatients = patients.slice().sort(function(a, b) {
    const timeA = getQueueTimestamp(a);
    const timeB = getQueueTimestamp(b);
    return timeA - timeB;
  });
  
  const serialMap = new Map(sortedPatients.map(function(p, idx) { return [p.bmhId, idx + 1]; }));
  
  // Update all queue tabs with historical data
  const active = sortedPatients.filter(p => !isPatientMarkedSeen(p));
  const done = sortedPatients.filter(p => isPatientMarkedSeen(p));
  
  const emptyRow = label => `<tr><td colspan="10" style="text-align:center;padding:24px;color:var(--g2);font-size:12.5px">No ${label} patients for ${formatDisplayDate(selectedDate)}</td></tr>`;
  
  const ae = document.getElementById('dq-active-list');
  if(ae) ae.innerHTML = active.length ? active.map((p)=>buildQTableRow(p, serialMap.get(p.bmhId) || '')).join('') : emptyRow('active');
  
  const dne = document.getElementById('dq-done-list');
  if(dne) dne.innerHTML = done.length ? done.map((p)=>buildQTableRow(p, serialMap.get(p.bmhId) || '')).join('') : emptyRow('done');
  
  // Clear other tabs for historical view
  const de = document.getElementById('dq-dil-list');
  if(de) de.innerHTML = emptyRow('dilated');
  
  const xe = document.getElementById('dq-xref-list');
  if(xe) xe.innerHTML = emptyRow('cross-refer');
  
  const ie = document.getElementById('dq-ipd-list');
  if(ie) ie.innerHTML = emptyRow('IPD');
}

function getQueueTimestamp(p) {
  const timestamps = [
    p.checkinAt,
    p.createdAt,
    p.registeredAt,
    p.visitDate,
    p.queueDate
  ].filter(Boolean);
  
  if (!timestamps.length) return 0;
  
  for (const ts of timestamps) {
    if (typeof ts === 'number') return ts;
    if (typeof ts === 'string') {
      if (/^\d+$/.test(ts)) return parseInt(ts, 10);
      const parsed = Date.parse(ts);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return 0;
}

function formatDisplayDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

function localDateKey(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return yyyy + '-' + mm + '-' + dd;
}

function isPatientMarkedSeen(p) {
  return p && (p.seen === true || p.status === 'seen' || String(p.status || '').toLowerCase() === 'seen');
}

// ── Patient Search with Visit History Functions ───────────────────────────────
window.searchPatientVisits = function() {
  const nameInput = document.getElementById('patient-search-name');
  const idInput = document.getElementById('patient-search-id');
  const resultsDiv = document.getElementById('patient-search-results');
  
  if (!nameInput || !idInput || !resultsDiv) return;
  
  const nameQuery = String(nameInput.value || '').trim().toLowerCase();
  const idQuery = String(idInput.value || '').trim().toLowerCase();
  
  if (!nameQuery && !idQuery) {
    window.showToast?.('Please enter patient name or BMSH ID', 'w');
    return;
  }
  
  const patients = window.PATIENTS || [];
  const matchedPatients = patients.filter(function(p) {
    if (!p) return false;
    const nameMatch = nameQuery && p.name && p.name.toLowerCase().includes(nameQuery);
    const idMatch = idQuery && p.bmhId && p.bmhId.toLowerCase().includes(idQuery);
    return nameMatch || idMatch;
  });
  
  if (matchedPatients.length === 0) {
    resultsDiv.innerHTML = '<div style="padding:12px;text-align:center;color:var(--g2);font-size:12px;">No patients found matching your search criteria</div>';
    resultsDiv.style.display = 'block';
    return;
  }
  
  // Group visits by patient and collect all visit dates
  const patientVisitHistory = matchedPatients.map(function(p) {
    const visitDates = extractPatientVisitDates(p);
    return {
      patient: p,
      visitDates: visitDates.sort((a, b) => new Date(b) - new Date(a)) // Sort by date descending
    };
  });
  
  renderPatientSearchResults(patientVisitHistory);
  resultsDiv.style.display = 'block';
};

window.clearPatientSearch = function() {
  const nameInput = document.getElementById('patient-search-name');
  const idInput = document.getElementById('patient-search-id');
  const resultsDiv = document.getElementById('patient-search-results');
  
  if (nameInput) nameInput.value = '';
  if (idInput) idInput.value = '';
  if (resultsDiv) {
    resultsDiv.style.display = 'none';
    resultsDiv.innerHTML = '';
  }
};

function extractPatientVisitDates(p) {
  const visitDates = new Set();
  const stamps = [
    p.checkinAt,
    p.createdAt,
    p.seenAt,
    p.updatedAt,
    p.registeredAt,
    p.visitDate,
    p.queueDate,
    p.appointmentDate
  ];
  
  stamps.forEach(function(stamp) {
    if (!stamp) return;
    let date;
    if (typeof stamp === 'number') {
      date = new Date(stamp);
    } else if (typeof stamp === 'string') {
      if (/^\d+$/.test(stamp)) {
        date = new Date(parseInt(stamp, 10));
      } else {
        date = new Date(stamp);
      }
    }
    
    if (date && !isNaN(date.getTime())) {
      visitDates.add(date.toISOString().slice(0, 10));
    }
  });
  
  // Also check visits array if it exists
  if (Array.isArray(p.visits)) {
    p.visits.forEach(function(visit) {
      if (visit && visit.date) {
        const visitDate = new Date(visit.date);
        if (!isNaN(visitDate.getTime())) {
          visitDates.add(visitDate.toISOString().slice(0, 10));
        }
      }
    });
  }
  
  return Array.from(visitDates);
}

function renderPatientSearchResults(patientVisitHistory) {
  const resultsDiv = document.getElementById('patient-search-results');
  if (!resultsDiv) return;
  
  const html = patientVisitHistory.map(function(item) {
    const p = item.patient;
    const visits = item.visitDates;
    
    // Find family members with same phone
    const familyMembers = getFamilyMembersWithSamePhone(p.mob || p.mobile || '');
    const otherFamilyMembers = familyMembers.filter(member => member.bmhId !== p.bmhId);
    
    return `
      <div style="background:#fff;border:1px solid var(--g4);border-radius:8px;padding:12px;margin-bottom:8px;position:relative;">
        ${otherFamilyMembers.length > 0 ? `
          <div style="position:absolute;top:8px;right:8px;background:var(--bmh-gold);color:var(--bmh-blue);font-size:9px;font-weight:700;padding:2px 6px;border-radius:12px;text-transform:uppercase;letter-spacing:0.5px;">
            ? Family: ${otherFamilyMembers.length}
          </div>
        ` : ''}
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
          <div style="flex:1;">
            <div style="font-weight:600;color:var(--g2);font-size:13px;">${p.name || 'Unknown'}</div>
            <div style="color:var(--g1);font-size:11px;">BMSH ID: ${p.bmhId || 'N/A'}</div>
            <div style="color:var(--g1);font-size:11px;">Mobile: ${p.mob || p.mobile || 'N/A'}</div>
            <div style="color:var(--g1);font-size:11px;">Age/Sex: ${p.age || 'N/A'} / ${p.sex || 'N/A'}</div>
          </div>
          <button type="button" class="btn btn-gold btn-xs" onclick="openPatientFromSearch('${p.bmhId}')">Open Patient</button>
        </div>
        
        ${otherFamilyMembers.length > 0 ? `
          <div style="border-top:1px solid var(--g5);padding-top:8px;margin-bottom:8px;">
            <div style="font-size:11px;font-weight:600;color:var(--g2);margin-bottom:4px;">? Family Members with Same Phone:</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px;">
              ${otherFamilyMembers.map(member => `
                <div style="background:var(--g6);border:1px solid var(--g5);border-radius:6px;padding:4px 8px;cursor:pointer;font-size:10px;"
                     onclick="openPatientFromSearch('${member.bmhId}')" title="Open ${member.name}">
                  <div style="font-weight:600;color:var(--g2);">${member.name}</div>
                  <div style="color:var(--g1);font-size:9px;">${member.bmhId} ? ${member.age || '?'}y</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div style="border-top:1px solid var(--g5);padding-top:8px;">
          <div style="font-size:11px;font-weight:600;color:var(--g2);margin-bottom:4px;">Visit History (${visits.length} visits):</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;">
            ${visits.map(date => `
              <span class="visit-date-chip" 
                    onclick="loadHistoricalQueueFromDate('${date}')" title="View queue for this date">
                ${formatDisplayDate(date)}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  resultsDiv.innerHTML = html;
}

window.openPatientFromSearch = function(bmhId) {
  if (typeof window.openPatient === 'function') {
    const patient = window.openPatient(bmhId);
    if (patient) {
      // Navigate to patient details or case sheet
      if (typeof window.nav === 'function') {
        window.nav('patient-details', null);
      }
      window.showToast?.(`Opened patient: ${patient.name}`, 's');
    } else {
      window.showToast?.('Patient not found', 'e');
    }
  }
};

window.loadHistoricalQueueFromDate = function(date) {
  const dateInput = document.getElementById('dq-historical-date');
  if (dateInput) {
    dateInput.value = date;
    loadHistoricalQueue();
    // Scroll to queue section
    const queueSection = document.getElementById('pg-doctor-queue');
    if (queueSection) {
      queueSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

// Enhanced Patient Deduplication System
window.findDuplicatePatients = function() {
  const patients = window.PATIENTS || [];
  const duplicateGroups = [];
  const processed = new Set();
  
  patients.forEach(function(patient) {
    if (!patient || processed.has(patient.bmhId) || patient.mergedInto) return;
    
    const duplicates = findDuplicatesForPatient(patient, patients);
    if (duplicates.length > 0) {
      const group = [patient, ...duplicates];
      duplicateGroups.push(group);
      group.forEach(p => processed.add(p.bmhId));
    }
  });
  
  return duplicateGroups;
};

function findDuplicatesForPatient(targetPatient, allPatients) {
  const duplicates = [];
  const targetNameKey = patientNameIdentityKey(targetPatient.name || '');
  const targetPhones = getPatientPhoneKeys(targetPatient);
  const targetAddress = normalizeAddress(targetPatient.addr || '');
  const targetAge = patientApproxAgeYears(targetPatient);
  
  allPatients.forEach(function(candidate) {
    if (!candidate || candidate.bmhId === targetPatient.bmhId || candidate.mergedInto) return;
    
    // Strict matching criteria - only merge if it's clearly the same person
    const nameMatch = patientNameIdentityKey(candidate.name || '') === targetNameKey;
    const phoneMatch = targetPhones.some(phone => getPatientPhoneKeys(candidate).includes(phone));
    const addressMatch = targetAddress && normalizeAddress(candidate.addr || '') === targetAddress;
    const ageMatch = agesCloseEnough(targetAge, patientApproxAgeYears(candidate), 2); // Reduced age tolerance
    
    // Consider duplicate ONLY if:
    // 1. Same Name + Same Phone + Age Close (primary criteria)
    // 2. Same Name + Same Address + Age Close (secondary criteria)
    // 3. Same Name + Same Phone + Same Address (strongest criteria)
    
    // NOTE: Different names with same phone are NOT considered duplicates (family members)
    if (!nameMatch) return; // Must have same name to be considered duplicate
    
    if ((nameMatch && phoneMatch && ageMatch) || 
        (nameMatch && addressMatch && ageMatch) ||
        (nameMatch && phoneMatch && addressMatch)) {
      duplicates.push(candidate);
    }
  });
  
  return duplicates;
}

function normalizeAddress(address) {
  if (!address) return '';
  return String(address)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

function patientNameIdentityKey(name) {
  if (!name) return '';
  const s = String(name).toLowerCase().trim();
  // Remove spaces, dots, and special characters for matching
  return s.replace(/[^a-z]/g, '');
}

function getPatientPhoneKeys(patient) {
  const phones = [];
  if (patient.mob) phones.push(normalizePatientPhoneKey(patient.mob));
  if (patient.mob2) phones.push(normalizePatientPhoneKey(patient.mob2));
  if (patient.mobile) phones.push(normalizePatientPhoneKey(patient.mobile));
  if (patient.altMobile) phones.push(normalizePatientPhoneKey(patient.altMobile));
  return Array.from(new Set(phones.filter(Boolean)));
}

function normalizePatientPhoneKey(phone) {
  if (!phone) return '';
  const s = String(phone).replace(/\D/g, ''); // Remove all non-digits
  if (s.length >= 10) {
    // Return last 10 digits for Indian mobile numbers
    return s.slice(-10);
  }
  return s;
}

function patientApproxAgeYears(patient) {
  if (!patient) return null;
  // Check DOB first
  if (patient.dob) {
    const dob = new Date(patient.dob);
    if (!isNaN(dob.getTime())) {
      const now = new Date();
      let age = now.getFullYear() - dob.getFullYear();
      const monthDiff = now.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
        age--;
      }
      return Math.max(0, Math.min(120, age));
    }
  }
  // Fall back to age string parsing
  const ageStr = String(patient.age || '');
  const match = ageStr.match(/(\d+)\s*(?:year|yr|yrs|y\.?)\b/i) || ageStr.match(/^(\d{1,3})$/);
  return match ? Math.min(120, Math.max(0, parseInt(match[1], 10))) : null;
}

function agesCloseEnough(age1, age2, maxGap = 2) {
  if (age1 == null || age2 == null) return true;
  return Math.abs(Number(age1) - Number(age2)) <= maxGap;
}

// Comprehensive Patient Merger
window.mergeAllDuplicatePatients = async function() {
  const duplicateGroups = findDuplicatePatients();
  if (duplicateGroups.length === 0) {
    window.showToast?.('No duplicate patients found', 's');
    return;
  }
  
  window.showToast?.(`Found ${duplicateGroups.length} groups of duplicate patients. Merging...`, 'i');
  let mergedCount = 0;
  
  for (const group of duplicateGroups) {
    if (group.length < 2) continue;
    
    // Sort by BMSH ID (lowest is canonical)
    group.sort((a, b) => {
      const idA = parseInt(String(a.bmhId || '').replace(/^BMSH-/i, '')) || 0;
      const idB = parseInt(String(b.bmhId || '').replace(/^BMSH-/i, '')) || 0;
      return idA - idB;
    });
    
    const canonical = group[0];
    const duplicates = group.slice(1);
    
    for (const duplicate of duplicates) {
      try {
        await mergeDuplicatePatientRecord(canonical.bmhId, duplicate.bmhId);
        mergedCount++;
      } catch (error) {
        console.error('Failed to merge patient:', error);
      }
    }
  }
  
  window.showToast?.(`Successfully merged ${mergedCount} duplicate patients!`, 's');
  
  // Refresh the patient list
  if (typeof window.renderDocQueue === 'function') {
    window.renderDocQueue();
  }
};

// Enhanced registration to prevent future duplicates
window.enhancedFindSamePerson = function(formData) {
  const patients = window.PATIENTS || [];
  const name = String(formData.name || '').trim();
  const mob = String(formData.mob || formData.mobile || '').trim();
  const mob2 = String(formData.mob2 || formData.altMobile || '').trim();
  const addr = String(formData.addr || '').trim();
  const age = formData.age || '';
  const dob = formData.dob || '';
  
  if (!name) return null;
  
  const nameKey = patientNameIdentityKey(name);
  const addressKey = normalizeAddress(addr);
  const formAge = patientApproxAgeYears({ age, dob });
  
  let bestMatch = null;
  let bestScore = 0;
  
  // First, check for family members with same phone (to show warning)
  const familyMembers = [];
  const formPhones = [mob, mob2].map(normalizePatientPhoneKey).filter(Boolean);
  
  patients.forEach(function(patient) {
    if (!patient || patient.mergedInto) return;
    
    const patientNameKey = patientNameIdentityKey(patient.name || '');
    const patientAddressKey = normalizeAddress(patient.addr || '');
    const patientAge = patientApproxAgeYears(patient);
    const patientPhones = getPatientPhoneKeys(patient);
    
    // Check for family members (same phone, different name)
    const phoneMatch = formPhones.some(fp => patientPhones.includes(fp));
    const nameDifferent = patientNameKey !== nameKey;
    
    if (phoneMatch && nameDifferent) {
      familyMembers.push(patient);
    }
    
    // Only consider exact name matches for duplicates
    if (patientNameKey !== nameKey) return; // Skip if name is different
    
    let score = 0;
    
    // Name matching (must match - already verified above)
    score += 40;
    
    // Phone matching (high weight)
    if (phoneMatch) {
      score += 30;
    }
    
    // Address matching (medium weight)
    if (addressKey && patientAddressKey === addressKey) {
      score += 20;
    }
    
    // Age matching (low weight)
    if (agesCloseEnough(formAge, patientAge, 2)) { // Reduced tolerance
      score += 10;
    }
    
    // Bonus for exact phone + age match
    if (phoneMatch && agesCloseEnough(formAge, patientAge, 2)) {
      score += 10;
    }
    
    // Only consider as duplicate if score is high enough (same name + phone/addr + age)
    if (score > bestScore && score >= 70) { // Increased threshold
      bestScore = score;
      bestMatch = patient;
    }
  });
  
  // Store family members for UI display
  window._potentialFamilyMembers = familyMembers;
  
  return bestMatch;
};

// Function to get family members with same phone
window.getFamilyMembersWithSamePhone = function(phone) {
  const patients = window.PATIENTS || [];
  const phoneKey = normalizePatientPhoneKey(phone);
  
  return patients.filter(function(patient) {
    if (!patient || patient.mergedInto) return false;
    return getPatientPhoneKeys(patient).includes(phoneKey);
  });
};

// Update the existing registration to use enhanced matching
window.patchRegistrationWithEnhancedMatching = function() {
  const originalFindSame = window.findSamePersonForRegistration;
  
  window.findSamePersonForRegistration = function(opts) {
    // Try enhanced matching first
    const enhancedMatch = window.enhancedFindSamePerson(opts);
    
    // Show family member warning if applicable
    if (window._potentialFamilyMembers && window._potentialFamilyMembers.length > 0) {
      showFamilyMemberWarning(window._potentialFamilyMembers, opts);
    }
    
    if (enhancedMatch) {
      return enhancedMatch;
    }
    
    // Fall back to original logic
    return originalFindSame ? originalFindSame(opts) : null;
  };
  
  window.showToast?.('Enhanced duplicate detection activated for patient registration', 's');
};

// Show family member warning during registration
function showFamilyMemberWarning(familyMembers, formData) {
  const familyList = familyMembers.map(member => 
    `? ${member.name} (${member.bmhId}) - ${member.age || '?'} years`
  ).join('\n');
  
  const message = `Family members with same phone number found:\n\n${familyList}\n\nThis is normal for family registrations. Different names will get different BMSH IDs.`;
  
  // Show a non-blocking info message instead of warning
  if (window.showToast) {
    window.showToast(`? Found ${familyMembers.length} family member(s) with same phone`, 'i');
  }
  
  // Optional: Show detailed family info in console for debugging
  console.log('Family members with same phone:', familyMembers);
}

// Add phone number change handler to registration form
window.setupFamilyMemberDetection = function() {
  // Monitor phone number changes in registration form
  const phoneInputs = ['rc-mob', 'rc-mob2', 'rc-mobile', 'rc-alt-mobile'];
  
  phoneInputs.forEach(function(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('blur', function() {
        const phone = input.value.trim();
        if (phone && phone.length >= 10) {
          checkForFamilyMembers(phone);
        }
      });
    }
  });
};

// Check and display family members for a given phone number
function checkForFamilyMembers(phone) {
  const familyMembers = getFamilyMembersWithSamePhone(phone);
  if (familyMembers.length > 0) {
    // Update family member display in registration form if exists
    const familyDiv = document.getElementById('family-members-display');
    if (familyDiv) {
      familyDiv.innerHTML = `
        <div style="background:var(--bmh-gold);color:var(--bmh-blue);padding:8px;border-radius:6px;margin-top:8px;font-size:11px;">
          <div style="font-weight:700;margin-bottom:4px;">? Family Members with Same Phone:</div>
          ${familyMembers.map(member => `
            <div style="margin:2px 0;">${member.name} (${member.bmhId}) - ${member.age || '?'}y</div>
          `).join('')}
          <div style="margin-top:4px;font-style:italic;">Different names will get separate BMSH IDs</div>
        </div>
      `;
      familyDiv.style.display = 'block';
    }
  } else {
    const familyDiv = document.getElementById('family-members-display');
    if (familyDiv) {
      familyDiv.style.display = 'none';
    }
  }
}

// Inventory visibility helper functions
window.checkInventoryVisibility = function() {
  console.log('=== Inventory System Status ===');
  console.log('Current stock items:', window.INVENTORY ? window.INVENTORY.length : 0);
  console.log('Today\'s purchases:', window.BMH_PURCHASES ? window.BMH_PURCHASES.filter(p => isToday(p.ts)).length : 0);
  console.log('Today\'s usage:', window.BMH_INVENTORY_USAGE ? window.BMH_INVENTORY_USAGE.filter(u => isToday(u.ts)).length : 0);
  
  // Force refresh inventory displays
  if (typeof renderStockList === 'function') {
    renderStockList();
  }
  if (typeof renderInventoryPurchaseLog === 'function') {
    renderInventoryPurchaseLog();
  }
  if (typeof renderInventoryUsageLog === 'function') {
    renderInventoryUsageLog();
  }
  
  // Show today's entries summary
  showTodayInventorySummary();
};

window.showTodayInventorySummary = function() {
  const today = new Date().toISOString().slice(0, 10);
  const todayPurchases = (window.BMH_PURCHASES || []).filter(p => p.ts && p.ts.startsWith(today));
  const todayUsage = (window.BMH_INVENTORY_USAGE || []).filter(u => u.ts && u.ts.startsWith(today));
  
  console.log(`\n=== Today's Inventory Activity (${today}) ===`);
  console.log(`Purchases: ${todayPurchases.length} items`);
  console.log(`Usage: ${todayUsage.length} items`);
  
  if (todayPurchases.length > 0) {
    console.log('\nToday\'s Purchases:');
    todayPurchases.forEach(p => {
      console.log(`- ${p.itemName} (+${p.qty}) - ${p.vendor || 'No vendor'} - Dept: ${p.dept || 'General'}`);
    });
  }
  
  if (todayUsage.length > 0) {
    console.log('\nToday\'s Usage:');
    todayUsage.forEach(u => {
      console.log(`- ${u.itemName} (-${u.qty}) - Patient: ${u.patientName || 'Ward'} - Dept: ${u.dept || 'General'}`);
    });
  }
  
  // Show toast notification
  const totalItems = todayPurchases.length + todayUsage.length;
  if (totalItems > 0) {
    window.showToast?.(`Today: ${todayPurchases.length} purchases, ${todayUsage.length} usage`, 's');
  } else {
    window.showToast?.('No inventory activity recorded today', 'i');
  }
};

window.forceInventoryRefresh = function() {
  // Reload inventory data from storage
  if (typeof loadInventoryStockFromStorage === 'function') {
    loadInventoryStockFromStorage();
  }
  if (typeof loadBmhFinancials === 'function') {
    loadBmhFinancials();
  }
  
  // Re-render all inventory displays
  setTimeout(() => {
    if (typeof renderStockList === 'function') renderStockList();
    if (typeof renderInventoryPurchaseLog === 'function') renderInventoryPurchaseLog();
    if (typeof renderInventoryUsageLog === 'function') renderInventoryUsageLog();
    if (typeof renderInventoryStoreStock === 'function') renderInventoryStoreStock();
    if (typeof renderInventoryPoAlerts === 'function') renderInventoryPoAlerts();
    
    window.showToast?.('Inventory displays refreshed', 's');
  }, 500);
};

// Helper function to check if timestamp is today
function isToday(timestamp) {
  if (!timestamp) return false;
  const today = new Date().toISOString().slice(0, 10);
  return timestamp.startsWith(today);
}

// Page state persistence - maintain current page on refresh
window.saveCurrentPage = function(pageId) {
  try {
    localStorage.setItem('bmh_current_page', pageId);
  } catch (e) {
    console.warn('Failed to save current page:', e);
  }
};

window.restoreCurrentPage = function() {
  try {
    const savedPage = localStorage.getItem('bmh_current_page');
    if (savedPage) {
      const pageElement = document.getElementById(savedPage);
      if (pageElement) {
        // Find the navigation button for this page and click it
        const navButton = document.querySelector(`.ni[onclick*="${savedPage}"]`);
        if (navButton) {
          setTimeout(() => {
            navButton.click();
            console.log('Restored page:', savedPage);
          }, 100);
          return true;
        }
      }
    }
  } catch (e) {
    console.warn('Failed to restore current page:', e);
  }
  return false;
};

// Override the nav function to save page state
const originalNav = window.nav;
window.nav = function(pageKey, btn) {
  const result = originalNav ? originalNav(pageKey, btn) : null;
  saveCurrentPage('pg-' + pageKey);
  return result;
};

// Initialize page state restoration
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(restoreCurrentPage, 500); // Restore page after navigation system loads
  });
} else {
  setTimeout(restoreCurrentPage, 500);
}

// Initialize family member detection when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupFamilyMemberDetection, 1000); // Delay to ensure form is loaded
    setTimeout(checkInventoryVisibility, 2000); // Check inventory after page load
  });
} else {
  setTimeout(setupFamilyMemberDetection, 1000);
  setTimeout(checkInventoryVisibility, 2000);
}

import { auth, watchConnectionStatus } from './firebase.js'
import { loginUser as firebaseLoginUser, logoutUser, watchAuthState } from './auth.js'
import { watchPatients, upsertPatientFirestore, updatePatient } from './patients.js'
import { sendPasswordResetEmail } from 'firebase/auth'
import { watchAppointments }    from './appointments.js'
import { watchTransactions,
         watchPayRequests }     from './billing.js'
import { watchLeads }           from './leads.js'
import { todayKey }             from './utils.js'
import { initializeInventoryFirebaseSync, syncInventoryWithFirebase } from './inventory.js'

const SAVED_LOGIN_KEY = 'bmh_saved_login_v1'
const USE_FIRESTORE_REALTIME_AFTER_LOGIN = false

function loadSavedLogin() {
  try {
    const raw = localStorage.getItem(SAVED_LOGIN_KEY)
    if (!raw) return
    const saved = JSON.parse(raw)
    const emailEl = document.getElementById('lg-email')
    const passEl = document.getElementById('lg-pass')
    const rememberEl = document.getElementById('lg-remember')
    if (emailEl && saved.email) emailEl.value = saved.email
    if (passEl && saved.password) passEl.value = saved.password
    if (rememberEl) rememberEl.checked = !!(saved.email || saved.password)
  } catch (_) { /* ignore storage parsing errors */ }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSavedLogin)
} else {
  loadSavedLogin()
}

// Legacy hooks — registration saves to RTDB + must mirror to Firestore for live PATIENTS[]
window.upsertPatientFirestore = upsertPatientFirestore
window.patchPatientFirestore = (bmhId, data) => updatePatient(bmhId, data)

/** Admin: send Firebase password-reset email (works for accounts that sign in with that email). */
window.sendUserPasswordResetEmail = async function (email) {
  const e = (email || '').trim()
  if (!e) { window.showToast?.('Enter an email address', 'w'); return }
  try {
    await sendPasswordResetEmail(auth, e)
    window.showToast?.('Password reset email sent ✓ Check inbox/spam.', 's')
  } catch (err) {
    window.showToast?.(err.message || 'Could not send reset email', 'e')
  }
}

// Active Firestore listeners — stored so they can be unsubscribed on logout
const listeners = []

function stopListeners() {
  listeners.forEach(unsub => unsub())
  listeners.length = 0
}

// ── Login gate DOM helpers ────────────────────────────────────────────────────
function showLoginGate() {
  const gate  = document.getElementById('login-gate')
  const shell = document.getElementById('shell')
  if (gate)  gate.style.display  = 'flex'
  if (shell) shell.style.display = 'none'
}

function showShell(user) {
  const gate  = document.getElementById('login-gate')
  const shell = document.getElementById('shell')
  if (gate)  gate.style.display  = 'none'
  if (shell) shell.style.display = 'flex'

  // Update sidebar user chip
  const av = document.getElementById('sbav')
  const nm = document.getElementById('sbnm')
  const rl = document.getElementById('sbrl')
  if (av) av.textContent = (user.name || '').split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2)
  if (nm) nm.textContent = user.name  || user.email
  if (rl) rl.textContent = `${user.dept || user.role} · ${user.centre}`
}

// ── Expose login/logout to the HTML inline handlers ──────────────────────────
// The login form calls window._loginUser(); logout button calls window.logoutUser()
window._loginUser = async function () {
  const email    = (document.getElementById('lg-email')?.value || '').trim()
  const password = document.getElementById('lg-pass')?.value || ''
  const remember = !!document.getElementById('lg-remember')?.checked
  const errEl    = document.getElementById('lg-err')

  if (!email || !password) {
    if (errEl) { errEl.textContent = 'Please enter your email and password.'; errEl.style.display = 'block' }
    return
  }
  if (errEl) errEl.style.display = 'none'

  const btn = document.querySelector('#login-gate button[onclick]')
  if (btn) { btn.textContent = 'Signing in…'; btn.disabled = true }

  const looksLikeEmail = /@/.test(email)
  const isHospitalManagedEmail = /@bawejahospital\.com$/i.test(email)
  const isDefaultManagedPassword = password === 'ChangeMe@123'
  const shouldUseLegacyFirst =
    !looksLikeEmail ||
    /^[a-z0-9._,-]+$/i.test(email) ||
    isHospitalManagedEmail ||
    isDefaultManagedPassword

  if (shouldUseLegacyFirst && typeof window.loginUser === 'function') {
    try {
      window.loginUser()
      const gate = document.getElementById('login-gate')
      const legacySucceeded = !gate || gate.style.display === 'none'
      if (legacySucceeded) {
        try {
          if (remember) localStorage.setItem(SAVED_LOGIN_KEY, JSON.stringify({ email, password }))
          else localStorage.removeItem(SAVED_LOGIN_KEY)
        } catch (_) { /* ignore */ }
        if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false }
        return
      }
    } catch (_) { /* noop */ }
  }

  try {
    await firebaseLoginUser(email, password)
    try {
      if (remember) {
        localStorage.setItem(SAVED_LOGIN_KEY, JSON.stringify({ email, password }))
      } else {
        localStorage.removeItem(SAVED_LOGIN_KEY)
      }
    } catch (_) { /* ignore storage errors */ }
    // watchAuthState below will handle the rest
  } catch {
    try {
      if (typeof window.loginUser === 'function') {
        window.loginUser()
        const gate = document.getElementById('login-gate')
        const legacySucceeded = !gate || gate.style.display === 'none'
        if (legacySucceeded) {
          try {
            if (remember) {
              localStorage.setItem(SAVED_LOGIN_KEY, JSON.stringify({ email, password }))
            } else {
              localStorage.removeItem(SAVED_LOGIN_KEY)
            }
          } catch (_) { /* ignore storage errors */ }
          if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false }
          return
        }
      }
    } catch (_) { /* noop */ }
    if (errEl) { errEl.textContent = 'Invalid email or password. Please try again.'; errEl.style.display = 'block' }
    if (btn) { btn.textContent = 'Sign In →'; btn.disabled = false }
  }
}

window.logoutUser = async function () {
  stopListeners()
  await logoutUser()
}

// ── Boot ─────────────────────────────────────────────────────────────────────
watchAuthState(
  // ── On login ──────────────────────────────────────────────────────────────
  user => {
    showShell(user)

    // Set window.CURRENT_USER so legacy.js can read it for centre filtering.
    // Legacy code expects Title-Case role ('Admin','Doctor','Reception','Lab','TPA','Optometrist','Inventory')
    // but Firebase custom claims use lowercase ('admin','doctor','reception'...) — map here.
    const roleMap = {
      admin: 'Admin', doctor: 'Doctor', reception: 'Reception',
      lab: 'Lab', tpa: 'TPA', optometrist: 'Optometrist', inventory: 'Inventory',
    }
    const legacyRole = roleMap[user.role] || 'Reception'
    window.CURRENT_USER = {
      username:          user.email?.split('@')[0] || 'user',
      name:              user.name  || user.email || 'User',
      role:              legacyRole,
      dept:              user.dept  || '',
      centre:            user.centre || 'CHD',
      isAdmin:           user.role === 'admin',
      canSeeAllCentres:  user.role === 'admin' || user.centre === 'BOTH',
    }

    // Sync into legacy.js local CURRENT_USER variable
    if (typeof window.syncLegacyCurrentUserFromFirebase === 'function') {
      try { window.syncLegacyCurrentUserFromFirebase() } catch (_) { /* noop */ }
    }

    if (typeof window.loadDoctorProfilesFromFirebase === 'function') {
      try { window.loadDoctorProfilesFromFirebase() } catch (_) { /* noop */ }
    }
    if (typeof window.loadDrugLibraryFromStorage === 'function') {
      try { window.loadDrugLibraryFromStorage() } catch (_) { /* noop */ }
    }

    // Initialize inventory Firebase sync
    try {
      initializeInventoryFirebaseSync();
      syncInventoryWithFirebase();
    } catch (e) {
      console.warn('Inventory Firebase sync initialization failed:', e);
    }

    setTimeout(() => {
      try { window.loadDrugLibraryFromStorage({ forceRemote: true }) } catch (_) { /* noop */ }
    }, 1500)
    if (typeof window.loadConsentDataOverridesFromStorage === 'function') {
      try { window.loadConsentDataOverridesFromStorage() } catch (_) { /* noop */ }
    }

    const centre = user.centre || 'CHD'
    const today  = todayKey()

    // The live HMS pages are still driven by legacy.js + RTDB.
    // Running Firestore realtime listeners in parallel here causes the same
    // patient/billing data to load twice and can freeze the UI after login.
    if (USE_FIRESTORE_REALTIME_AFTER_LOGIN) {
      listeners.push(watchPatients(centre))
      listeners.push(watchAppointments(centre, today))
      listeners.push(watchTransactions(centre, today))
      listeners.push(watchPayRequests(centre))

      if (['admin', 'reception'].includes(user.role)) {
        listeners.push(watchLeads(centre))
      }
    }

    watchConnectionStatus('fb-status')

    // ── Start legacy Realtime DB listeners ──────────────────────────────────
    // These were previously only called from the old username/password login.
    // With Firebase Auth we must call them explicitly after the user is known.
    setTimeout(() => {
      const safe = fn => { try { if (typeof window[fn] === 'function') window[fn]() } catch (_) {} }
      const defer = (fn, delay = 0) => {
        const runner = () => safe(fn)
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(runner, { timeout: Math.max(300, delay || 800) })
          return
        }
        setTimeout(runner, delay)
      }
      safe('loadPatientsFromFirebase')
      if (['admin', 'reception'].includes(String(user.role || '').toLowerCase())) {
        setTimeout(() => {
          safe('repairDuplicatePatientsByIdentity')
        }, 4000)
      }
      const eagerRoles = ['admin', 'reception', 'tpa']
      if (eagerRoles.includes(String(user.role || '').toLowerCase())) {
        defer('listenPayRequests', 120)
        defer('listenAppointments', 120)
        defer('loadTodayTransactions', 120)
      }
      // Non-critical modules are loaded lazily when the user opens those pages.
      if (user.role === 'lab') defer('listenLabOrders', 900)
    }, 300)

    // Navigate to role home unless the URL hash has a saved in-app route (same tab after F5).
    const homePages = {
      admin:       'pg-dashboard',
      reception:   'pg-reception',
      doctor:      'pg-doctor-queue',
      optometrist: 'pg-doctor-queue',
      lab:         'pg-lab',
      tpa:         'pg-tpa',
      inventory:   'pg-inventory',
    }
    const homeId = homePages[user.role] || 'pg-reception'
    const goHome = () => {
      if (typeof window.nav === 'function') window.nav(homeId)
    }
    if (typeof window.tryScheduleRouteRestoreFromHash === 'function') {
      window.tryScheduleRouteRestoreFromHash(goHome)
    } else {
      goHome()
    }
  },

  // ── On logout ─────────────────────────────────────────────────────────────
  () => {
    stopListeners()
    showLoginGate()
  }
)
