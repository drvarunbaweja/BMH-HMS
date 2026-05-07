import { db } from './firebase.js'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'

// Inventory Collections
const INVENTORY_COLLECTION = 'inventory'
const PURCHASES_COLLECTION = 'inventory_purchases'
const USAGE_COLLECTION = 'inventory_usage'

function getUsageTime(row) {
  const raw = row?.ts || row?.date || row?.createdAt || row?.updatedAt || ''
  if (raw && typeof raw.toMillis === 'function') return raw.toMillis()
  if (raw && typeof raw.seconds === 'number') return raw.seconds * 1000
  const parsed = Date.parse(raw)
  return Number.isNaN(parsed) ? 0 : parsed
}

function inventoryUsageKey(row) {
  if (row?.id) return 'id:' + String(row.id)
  return [
    String(row?.bmhId || '').trim().toLowerCase(),
    String(row?.itemName || row?.desc || row?.name || '').trim().toLowerCase(),
    Math.abs(Number(row?.qty || 0)),
    String(row?.barcode || row?.ref || '').trim().toLowerCase(),
    String(row?.procedureRef || row?.groupId || '').trim().toLowerCase(),
    String(row?.ts || row?.date || '').slice(0, 10)
  ].join('|')
}

function mergeInventoryUsageRows(localRows, firebaseRows) {
  const byKey = new Map()
  const add = (row) => {
    if (!row) return
    const key = inventoryUsageKey(row)
    const existing = byKey.get(key)
    byKey.set(key, existing ? { ...existing, ...row } : row)
  }

  ;(localRows || []).forEach(add)
  ;(firebaseRows || []).forEach(add)

  return Array.from(byKey.values()).sort((a, b) => getUsageTime(b) - getUsageTime(a))
}

function isRecentlyDeletedInventoryBarcode(barcode) {
  if (typeof window === 'undefined') return false
  const key = String(barcode || '').trim()
  if (!key) return false
  const deletedAt = Number(window._bmhInventoryDeletedAt?.[key] || 0)
  if (!deletedAt) return false
  if (Date.now() - deletedAt > 120000) {
    delete window._bmhInventoryDeletedAt[key]
    return false
  }
  return true
}

// Save inventory stock to Firestore
export async function saveInventoryToFirebase(inventoryData) {
  try {
    if (!inventoryData.barcode) {
      console.error('Cannot save inventory without barcode')
      return null
    }
    
    const docRef = doc(db, INVENTORY_COLLECTION, inventoryData.barcode)
    const { id, _localAddedAt, ...cleanInventoryData } = inventoryData
    const dataToSave = {
      ...cleanInventoryData,
      updatedAt: serverTimestamp()
    }
    
    await setDoc(docRef, dataToSave, { merge: true })
    console.log('Inventory saved to Firebase:', inventoryData.barcode)
    return inventoryData.barcode
  } catch (error) {
    console.error('Error saving inventory to Firebase:', error)
    throw error
  }
}

export async function deleteInventoryFromFirebase(barcode) {
  try {
    const key = String(barcode || '').trim()
    if (!key) return false

    await deleteDoc(doc(db, INVENTORY_COLLECTION, key))
    console.log('Inventory deleted from Firebase:', key)
    return true
  } catch (error) {
    console.error('Error deleting inventory from Firebase:', error)
    throw error
  }
}

// Load inventory stock from Firestore
export async function loadInventoryFromFirebase() {
  try {
    const q = query(collection(db, INVENTORY_COLLECTION), orderBy('updatedAt', 'desc'))
    const snapshot = await getDocs(q)
    
    const inventory = []
    snapshot.forEach(doc => {
      inventory.push({ id: doc.id, ...doc.data() })
    })
    
    console.log('Loaded', inventory.length, 'inventory items from Firebase')
    return inventory
  } catch (error) {
    console.error('Error loading inventory from Firebase:', error)
    return []
  }
}

// Watch inventory changes in real-time
export function watchInventory(callback) {
  const q = query(collection(db, INVENTORY_COLLECTION), orderBy('updatedAt', 'desc'))
  
  return onSnapshot(q, (snapshot) => {
    const inventory = []
    snapshot.forEach(doc => {
      inventory.push({ id: doc.id, ...doc.data() })
    })
    
    callback(inventory)
  }, (error) => {
    console.error('Error watching inventory:', error)
  })
}

// Save purchase record to Firestore
export async function savePurchaseToFirebase(purchaseData) {
  try {
    const dataToSave = {
      ...purchaseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    
    const docRef = await addDoc(collection(db, PURCHASES_COLLECTION), dataToSave)
    console.log('Purchase saved to Firebase:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error saving purchase to Firebase:', error)
    throw error
  }
}

// Load purchases from Firestore
export async function loadPurchasesFromFirebase() {
  try {
    const q = query(collection(db, PURCHASES_COLLECTION), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    
    const purchases = []
    snapshot.forEach(doc => {
      purchases.push({ id: doc.id, ...doc.data() })
    })
    
    console.log('Loaded', purchases.length, 'purchases from Firebase')
    return purchases
  } catch (error) {
    console.error('Error loading purchases from Firebase:', error)
    return []
  }
}

// Watch purchases changes in real-time
export function watchPurchases(callback) {
  const q = query(collection(db, PURCHASES_COLLECTION), orderBy('createdAt', 'desc'))
  
  return onSnapshot(q, (snapshot) => {
    const purchases = []
    snapshot.forEach(doc => {
      purchases.push({ id: doc.id, ...doc.data() })
    })
    
    callback(purchases)
  }, (error) => {
    console.error('Error watching purchases:', error)
  })
}

// Save usage record to Firestore
export async function saveUsageToFirebase(usageData) {
  try {
    const dataToSave = {
      ...usageData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    if (usageData?.id) {
      const docRef = doc(db, USAGE_COLLECTION, String(usageData.id))
      await setDoc(docRef, dataToSave, { merge: true })
      console.log('Usage saved to Firebase:', usageData.id)
      return usageData.id
    }

    const docRef = await addDoc(collection(db, USAGE_COLLECTION), dataToSave)
    console.log('Usage saved to Firebase:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Error saving usage to Firebase:', error)
    throw error
  }
}

// Load usage from Firestore
export async function loadUsageFromFirebase() {
  try {
    const q = query(collection(db, USAGE_COLLECTION), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    
    const usage = []
    snapshot.forEach(doc => {
      usage.push({ id: doc.id, ...doc.data() })
    })
    
    console.log('Loaded', usage.length, 'usage records from Firebase')
    return usage
  } catch (error) {
    console.error('Error loading usage from Firebase:', error)
    return []
  }
}

// Watch usage changes in real-time
export function watchUsage(callback) {
  const q = query(collection(db, USAGE_COLLECTION), orderBy('createdAt', 'desc'))
  
  return onSnapshot(q, (snapshot) => {
    const usage = []
    snapshot.forEach(doc => {
      usage.push({ id: doc.id, ...doc.data() })
    })
    
    callback(usage)
  }, (error) => {
    console.error('Error watching usage:', error)
  })
}

// Sync local inventory with Firebase
export async function syncInventoryWithFirebase() {
  try {
    // Load from Firebase
    const firebaseInventory = await loadInventoryFromFirebase()
    const firebasePurchases = await loadPurchasesFromFirebase()
    const firebaseUsage = await loadUsageFromFirebase()
    
    // Update global variables
    if (window.INVENTORY) {
      window.INVENTORY.length = 0
      firebaseInventory.forEach(item => {
        if (isRecentlyDeletedInventoryBarcode(item.barcode)) return
        window.INVENTORY.push(item)
      })
    }
    
    if (window.BMH_PURCHASES) {
      window.BMH_PURCHASES.length = 0
      firebasePurchases.forEach(purchase => {
        window.BMH_PURCHASES.push(purchase)
      })
    }
    
    if (window.BMH_INVENTORY_USAGE) {
      const mergedUsage = mergeInventoryUsageRows(window.BMH_INVENTORY_USAGE, firebaseUsage)
      window.BMH_INVENTORY_USAGE.length = 0
      mergedUsage.forEach(usage => {
        window.BMH_INVENTORY_USAGE.push(usage)
      })
    }
    
    // Update localStorage as backup
    if (typeof saveInventoryStockToStorage === 'function') {
      saveInventoryStockToStorage()
    }
    if (typeof saveBmhFinancials === 'function') {
      saveBmhFinancials()
    }
    
    console.log('Inventory synced with Firebase')
    return true
  } catch (error) {
    console.error('Error syncing inventory with Firebase:', error)
    return false
  }
}

// Initialize inventory Firebase sync
export function initializeInventoryFirebaseSync() {
  // Watch inventory changes — merge instead of replace to avoid flickering optimistic adds
  watchInventory((inventory) => {
    if (window.INVENTORY) {
      const now = Date.now()
      const firebaseBarSet = new Set(inventory.map(item => item.barcode).filter(Boolean))

      // Update existing items in-place from Firebase (preserves array references)
      inventory.forEach(fbItem => {
        if (!fbItem.barcode) return
        if (isRecentlyDeletedInventoryBarcode(fbItem.barcode)) return
        const existing = window.INVENTORY.find(x => x.barcode === fbItem.barcode)
        if (existing) {
          Object.assign(existing, fbItem)
          delete existing._localAddedAt // confirmed by Firebase, no longer optimistic
        } else {
          window.INVENTORY.push(fbItem)
        }
      })

      // Remove items Firebase no longer has, but keep optimistic adds < 60 s old
      for (let i = window.INVENTORY.length - 1; i >= 0; i--) {
        const item = window.INVENTORY[i]
        if (isRecentlyDeletedInventoryBarcode(item.barcode)) {
          window.INVENTORY.splice(i, 1)
          continue
        }
        if (!item.barcode || firebaseBarSet.has(item.barcode)) continue
        if (now - (item._localAddedAt || 0) < 60000) continue // keep until Firebase confirms
        window.INVENTORY.splice(i, 1)
      }

      if (typeof saveInventoryStockToStorage === 'function') {
        saveInventoryStockToStorage()
      }
      if (typeof renderStockList === 'function') {
        renderStockList()
      }
    }
  })
  
  // Watch purchases changes
  watchPurchases((purchases) => {
    if (window.BMH_PURCHASES) {
      window.BMH_PURCHASES.length = 0
      purchases.forEach(purchase => {
        window.BMH_PURCHASES.push(purchase)
      })
      if (typeof saveBmhFinancials === 'function') {
        saveBmhFinancials()
      }
      if (typeof renderInventoryPurchaseLog === 'function') {
        renderInventoryPurchaseLog()
      }
    }
  })
  
  // Watch usage changes
  watchUsage((usage) => {
    if (window.BMH_INVENTORY_USAGE) {
      const mergedUsage = mergeInventoryUsageRows(window.BMH_INVENTORY_USAGE, usage)
      window.BMH_INVENTORY_USAGE.length = 0
      mergedUsage.forEach(u => {
        window.BMH_INVENTORY_USAGE.push(u)
      })
      if (typeof saveBmhFinancials === 'function') {
        saveBmhFinancials()
      }
      if (typeof renderInventoryUsageLog === 'function') {
        renderInventoryUsageLog()
      }
    }
  })
  
  console.log('Inventory Firebase sync initialized')
}

// Expose functions to window for legacy.js access
if (typeof window !== 'undefined') {
  window.saveInventoryToFirebase = saveInventoryToFirebase
  window.deleteInventoryFromFirebase = deleteInventoryFromFirebase
  window.savePurchaseToFirebase = savePurchaseToFirebase
  window.saveUsageToFirebase = saveUsageToFirebase
  window.loadInventoryFromFirebase = loadInventoryFromFirebase
  window.loadPurchasesFromFirebase = loadPurchasesFromFirebase
  window.loadUsageFromFirebase = loadUsageFromFirebase
  window.syncInventoryWithFirebase = syncInventoryWithFirebase
}
