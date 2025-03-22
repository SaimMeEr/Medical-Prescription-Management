import { useState, useEffect } from 'react'
import './Dashboard.css'
import { 
  getReminders, 
  getPrescriptions, 
  getHistory, 
  getProgress,
  updateProgress 
} from '../utils/localStorage'

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeReminders: 0,
    totalPrescriptions: 0,
    expiringPrescriptions: 0,
    missedMedications: 0,
    streak: 0
  })

  useEffect(() => {
    // Load and calculate dashboard stats
    const loadDashboardData = () => {
      const reminders = getReminders()
      const prescriptions = getPrescriptions()
      const history = getHistory()
      const progress = getProgress()

      // Calculate active reminders
      const activeReminders = reminders.filter(r => r.active).length

      // Calculate prescription stats
      const totalPrescriptions = prescriptions.length
      const today = new Date()
      const expiringPrescriptions = prescriptions.filter(p => {
        const expiryDate = new Date(p.expiryDate)
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0
      }).length

      // Calculate missed medications
      const missedMedications = history.filter(h => h.status === 'missed').length

      // Update stats
      setStats({
        activeReminders,
        totalPrescriptions,
        expiringPrescriptions,
        missedMedications,
        streak: progress.streak
      })

      // Update progress
      updateProgress({
        ...progress,
        totalMedications: totalPrescriptions,
        missed: missedMedications
      })
    }

    loadDashboardData()
  }, [])

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </header>

      <div className="dashboard-grid">
        <section className="stats-overview card">
          <h3>Overview</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <h4>Active Reminders</h4>
              <div className="stat-value">{stats.activeReminders}</div>
            </div>
            <div className="stat-item">
              <h4>Total Prescriptions</h4>
              <div className="stat-value">{stats.totalPrescriptions}</div>
            </div>
            <div className="stat-item">
              <h4>Expiring Soon</h4>
              <div className="stat-value">{stats.expiringPrescriptions}</div>
            </div>
            <div className="stat-item">
              <h4>Missed Medications</h4>
              <div className="stat-value">{stats.missedMedications}</div>
            </div>
            <div className="stat-item">
              <h4>Current Streak</h4>
              <div className="stat-value">{stats.streak} days</div>
            </div>
          </div>
        </section>

        <section className="upcoming-reminders card">
          <h3>Today's Reminders</h3>
          <div className="reminder-list">
            {(() => {
              const reminders = getReminders()
              const today = new Date().getDay()
              const todayReminders = reminders.filter(reminder => {
                const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
                return reminder.active && reminder.days[days[today]]
              })

              if (todayReminders.length === 0) {
                return <p className="placeholder-text">No reminders for today</p>
              }

              return todayReminders.map(reminder => (
                <div key={reminder.id} className="remication-item">
                  <div className="medication-info">
                    <h4>{reminder.medication}</h4>
                    <p>Time: {reminder.time}</p>
                  </div>
                  <button className="button">Mark as Taken</button>
                </div>
              ))
            })()}
          </div>
        </section>

        <section className="expiring-prescriptions card">
          <h3>Expiring Prescriptions</h3>
          <div className="prescription-list">
            {(() => {
              const prescriptions = getPrescriptions()
              const today = new Date()
              const expiringPrescriptions = prescriptions.filter(p => {
                const expiryDate = new Date(p.expiryDate)
                const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
                return daysUntilExpiry <= 30 && daysUntilExpiry > 0
              })

              if (expiringPrescriptions.length === 0) {
                return <p className="placeholder-text">No prescriptions expiring soon</p>
              }

              return expiringPrescriptions.map(prescription => (
                <div key={prescription.id} className="prescription-item">
                  <div className="prescription-info">
                    <h4>{prescription.medication}</h4>
                    <p>Expires: {new Date(prescription.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <button className="button secondary">Renew</button>
                </div>
              ))
            })()}
          </div>
        </section>

        <section className="recent-history card">
          <h3>Recent History</h3>
          <div className="history-list">
            {(() => {
              const history = getHistory()
              const recentHistory = history.slice(0, 5)

              if (recentHistory.length === 0) {
                return <p className="placeholder-text">No recent history</p>
              }

              return recentHistory.map(item => (
                <div key={item.id} className="history-item">
                  <div className="history-info">
                    <h4>{item.medication}</h4>
                    <p>Status: {item.status}</p>
                    <p>Time: {item.time}</p>
                  </div>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </div>
              ))
            })()}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard 