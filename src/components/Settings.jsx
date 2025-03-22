import { useState, useEffect } from 'react'
import './Settings.css'
import { 
  getSettings, 
  updateSettings, 
  DEFAULT_DATA 
} from '../utils/localStorage'

const Settings = () => {
  const [localSettings, setLocalSettings] = useState(DEFAULT_DATA.settings)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState({ message: '', type: '' })

  useEffect(() => {
    // Load settings from localStorage when component mounts
    const settings = getSettings()
    setLocalSettings(settings)
  }, [])

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setLocalSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }))
    setHasChanges(true)
  }

  const handleThemeChange = (e) => {
    const { name, value, type, checked } = e.target
    setLocalSettings(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [name]: type === 'checkbox' ? checked : value
      }
    }))
    setHasChanges(true)
  }

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setLocalSettings(prev => ({
      ...prev,
      [name]: value
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const success = updateSettings(localSettings)
      if (success) {
        setSaveStatus({
          message: 'Settings saved successfully!',
          type: 'success'
        })
        setHasChanges(false)
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      setSaveStatus({
        message: 'Failed to save settings. Please try again.',
        type: 'error'
      })
    } finally {
      setIsSaving(false)
      // Clear save status after 3 seconds
      setTimeout(() => {
        setSaveStatus({ message: '', type: '' })
      }, 3000)
    }
  }

  const handleReset = () => {
    setLocalSettings(DEFAULT_DATA.settings)
    setHasChanges(true)
  }

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(localSettings, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'medmanager-settings.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleImportSettings = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const importedSettings = JSON.parse(event.target.result)
        setLocalSettings(importedSettings)
        setHasChanges(true)
      } catch (error) {
        setSaveStatus({
          message: 'Invalid settings file. Please try again.',
          type: 'error'
        })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="settings">
      <header className="settings-header">
        <div className="header-content">
          <h2>Settings</h2>
          {saveStatus.message && (
            <div className={`save-status ${saveStatus.type}`}>
              {saveStatus.message}
            </div>
          )}
        </div>
        <div className="header-actions">
          <div className="import-export">
            <label className="button button-secondary">
              Import Settings
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                style={{ display: 'none' }}
              />
            </label>
            <button 
              className="button button-secondary"
              onClick={handleExportSettings}
            >
              Export Settings
            </button>
          </div>
          <button 
            className="button button-secondary" 
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Reset to Default
          </button>
          <button 
            className="button" 
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="settings-grid">
        <section className="notification-settings card">
          <h3>Notification Preferences</h3>
          <div className="settings-group">
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="email"
                  checked={localSettings.notifications.email}
                  onChange={handleNotificationChange}
                />
                <span className="checkbox-custom"></span>
                Email Notifications
              </label>
            </div>
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="push"
                  checked={localSettings.notifications.push}
                  onChange={handleNotificationChange}
                />
                <span className="checkbox-custom"></span>
                Push Notifications
              </label>
            </div>
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="sms"
                  checked={localSettings.notifications.sms}
                  onChange={handleNotificationChange}
                />
                <span className="checkbox-custom"></span>
                SMS Notifications
              </label>
            </div>
          </div>

          <div className="settings-group">
            <h4>Reminder Settings</h4>
            <div className="setting-item">
              <label>Reminder Time</label>
              <select
                name="reminderTime"
                value={localSettings.notifications.reminderTime}
                onChange={(e) => {
                  setLocalSettings(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      reminderTime: parseInt(e.target.value)
                    }
                  }))
                  setHasChanges(true)
                }}
                className="input"
              >
                <option value="5">5 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
              </select>
            </div>
          </div>
        </section>

        <section className="theme-settings card">
          <h3>Theme Settings</h3>
          <div className="settings-group">
            <div className="setting-item">
              <label>Theme Mode</label>
              <select
                name="mode"
                value={localSettings.theme.mode}
                onChange={handleThemeChange}
                className="input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Font Size</label>
              <select
                name="fontSize"
                value={localSettings.theme.fontSize}
                onChange={handleThemeChange}
                className="input"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="highContrast"
                  checked={localSettings.theme.highContrast}
                  onChange={handleThemeChange}
                />
                <span className="checkbox-custom"></span>
                High Contrast Mode
              </label>
            </div>
          </div>
        </section>

        <section className="general-settings card">
          <h3>General Settings</h3>
          <div className="settings-group">
            <div className="setting-item">
              <label>Language</label>
              <select
                name="language"
                value={localSettings.language}
                onChange={handleGeneralChange}
                className="input"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Timezone</label>
              <select
                name="timezone"
                value={localSettings.timezone}
                onChange={handleGeneralChange}
                className="input"
              >
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Date Format</label>
              <select
                name="dateFormat"
                value={localSettings.dateFormat}
                onChange={handleGeneralChange}
                className="input"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Settings 