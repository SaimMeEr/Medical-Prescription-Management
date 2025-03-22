import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

export const defaultSettings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
    reminderTime: 15,
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  },
  theme: {
    mode: 'light',
    fontSize: 'medium',
    highContrast: false
  },
  privacy: {
    shareData: false,
    analytics: true,
    marketingEmails: false
  },
  language: 'English',
  timezone: 'UTC-5',
  dateFormat: 'MM/DD/YYYY'
}

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  useEffect(() => {
    applyThemeSettings()
  }, [settings.theme])

  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('userSettings')
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyThemeSettings = () => {
    document.documentElement.setAttribute('data-theme', settings.theme.mode)
    document.documentElement.setAttribute('data-font-size', settings.theme.fontSize)
    document.documentElement.setAttribute('data-high-contrast', settings.theme.highContrast)
  }

  const updateSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('userSettings', JSON.stringify(newSettings))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.setItem('userSettings', JSON.stringify(defaultSettings))
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
} 