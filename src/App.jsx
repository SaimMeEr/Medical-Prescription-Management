import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Reminders from './components/Reminders'
import Prescriptions from './components/Prescriptions'
import History from './components/History'
import Settings from './components/Settings'
import Profile from './components/Profile'
import Progress from './components/Progress'
import Support from './components/Support'
import { SettingsProvider } from './context/SettingsContext'
import { initializeData } from './utils/localStorage'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    // Initialize localStorage data when the app starts
    initializeData()
  }, [])

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'reminders':
        return <Reminders />
      case 'prescriptions':
        return <Prescriptions />
      case 'history':
        return <History />
      case 'settings':
        return <Settings />
      case 'profile':
        return <Profile />
      case 'progress':
        return <Progress />
      case 'support':
        return <Support />
      default:
        return <Dashboard />
    }
  }

  return (
    <SettingsProvider>
      <div className="app">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </SettingsProvider>
  )
}

export default App
