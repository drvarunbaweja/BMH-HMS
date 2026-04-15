import { db } from './firebase.js'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'

// Inventory Collections
const INVENTORY_COLLECTION = 'inventory'
const PURCHASES_COLLECTION = 'inventory_purchases'
const USAGE_COLLECTION = 'inventory_usage'

// Save inventory stock to Firestore
export async function saveInventoryToFirebase(inventoryData) {
  try {
    if (!inventoryData.barcode) {
      console.error('Cannot save inventory without barcode')
      return null
    }
    
    const docRef = doc(db, INVENTORY_COLLECTION, inventoryData.barcode)
    const dataToSave = {
      ...inventoryData,
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
      window.BMH_INVENTORY_USAGE.length = 0
      firebaseUsage.forEach(usage => {
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
  // Watch inventory changes
  watchInventory((inventory) => {
    if (window.INVENTORY) {
      window.INVENTORY.length = 0
      inventory.forEach(item => {
        window.INVENTORY.push(item)
      })
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
      window.BMH_INVENTORY_USAGE.length = 0
      usage.forEach(u => {
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
