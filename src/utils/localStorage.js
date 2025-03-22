// Local Storage Keys
const STORAGE_KEYS = {
  SETTINGS: 'medication_tracker_settings',
  REMINDERS: 'medication_tracker_reminders',
  PRESCRIPTIONS: 'medication_tracker_prescriptions',
  HISTORY: 'medication_tracker_history',
  PROFILE: 'medication_tracker_profile',
  PROGRESS: 'medication_tracker_progress'
}

// Default Data Structure
const DEFAULT_DATA = {
  settings: {
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    theme: {
      mode: 'light',
      fontSize: 'medium',
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY'
    },
    general: {
      autoSave: true,
      backupFrequency: 'daily',
      dataRetention: '1year'
    }
  },
  reminders: [],
  prescriptions: [],
  history: [],
  profile: {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  },
  progress: {
    streak: 0,
    totalMedications: 0,
    missedMedications: 0,
    lastMedicationDate: null
  }
}

// Helper Functions
const getItem = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('Error writing to localStorage:', error)
    return false
  }
}

const removeItem = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from localStorage:', error)
    return false
  }
}

// Initialize Data
const initializeData = () => {
  Object.entries(STORAGE_KEYS).forEach(([key, value]) => {
    if (!getItem(value)) {
      setItem(value, DEFAULT_DATA[key.toLowerCase()])
    }
  })
}

// Data Management Functions
const getData = (key) => {
  return getItem(STORAGE_KEYS[key])
}

const updateData = (key, data) => {
  return setItem(STORAGE_KEYS[key], data)
}

const addItem = (key, item) => {
  const data = getData(key) || []
  const newItem = {
    id: Date.now().toString(),
    ...item
  }
  data.push(newItem)
  return updateData(key, data) ? newItem : null
}

const updateItem = (key, id, updatedItem) => {
  const data = getData(key) || []
  const index = data.findIndex(item => item.id === id)
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem }
    return updateData(key, data)
  }
  return false
}

const deleteItem = (key, id) => {
  const data = getData(key) || []
  const filteredData = data.filter(item => item.id !== id)
  return updateData(key, filteredData)
}

// Prescriptions Management
const getPrescriptions = () => {
  return getData('PRESCRIPTIONS') || []
}

const addPrescription = (prescription) => {
  return addItem('PRESCRIPTIONS', prescription)
}

const updatePrescription = (id, updatedPrescription) => {
  return updateItem('PRESCRIPTIONS', id, updatedPrescription)
}

const deletePrescription = (id) => {
  return deleteItem('PRESCRIPTIONS', id)
}

// History Management
const getHistory = () => {
  return getData('HISTORY') || []
}

const addHistoryItem = (historyItem) => {
  return addItem('HISTORY', historyItem)
}

const updateHistoryItem = (id, updatedHistoryItem) => {
  return updateItem('HISTORY', id, updatedHistoryItem)
}

const deleteHistoryItem = (id) => {
  return deleteItem('HISTORY', id)
}

// Settings Management
const getSettings = () => {
  return getData('SETTINGS') || DEFAULT_DATA.settings
}

const updateSettings = (settings) => {
  return updateData('SETTINGS', settings)
}

// Profile Management
const getProfile = () => {
  return getData('PROFILE') || DEFAULT_DATA.profile
}

const updateProfile = (profile) => {
  return updateData('PROFILE', profile)
}

// Progress Management
const getProgress = () => {
  return getData('PROGRESS') || DEFAULT_DATA.progress
}

const updateProgress = (progress) => {
  return updateData('PROGRESS', progress)
}

// Reminders Management
const getReminders = () => {
  return getData('REMINDERS') || []
}

const addReminder = (reminder) => {
  return addItem('REMINDERS', reminder)
}

const updateReminder = (id, updatedReminder) => {
  return updateItem('REMINDERS', id, updatedReminder)
}

const deleteReminder = (id) => {
  return deleteItem('REMINDERS', id)
}

export {
  initializeData,
  getPrescriptions,
  addPrescription,
  updatePrescription,
  deletePrescription,
  getHistory,
  addHistoryItem,
  updateHistoryItem,
  deleteHistoryItem,
  getSettings,
  updateSettings,
  getProfile,
  updateProfile,
  getProgress,
  updateProgress,
  getReminders,
  addReminder,
  updateReminder,
  deleteReminder,
  DEFAULT_DATA
} 