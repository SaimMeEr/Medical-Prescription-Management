import { useState } from 'react'
import './Progress.css'

const Progress = () => {
  const [timeRange, setTimeRange] = useState('week')

  const adherenceData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [100, 95, 100, 90, 100, 85, 95]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [95, 92, 88, 90]
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [92, 95, 90, 88, 92, 95, 90, 92, 95, 90, 92, 95]
    }
  }

  const badges = [
    {
      id: 1,
      name: 'Perfect Week',
      description: '100% adherence for 7 days straight',
      icon: '🌟',
      earned: true
    },
    {
      id: 2,
      name: 'Monthly Master',
      description: '90%+ adherence for 30 days',
      icon: '🏆',
      earned: true
    },
    {
      id: 3,
      name: 'Quarter Champion',
      description: '95%+ adherence for 90 days',
      icon: '👑',
      earned: false
    },
    {
      id: 4,
      name: 'Year Warrior',
      description: '90%+ adherence for 365 days',
      icon: '🎯',
      earned: false
    }
  ]

  const stats = [
    {
      label: 'Current Streak',
      value: '7 days',
      icon: '🔥'
    },
    {
      label: 'Best Streak',
      value: '30 days',
      icon: '⭐'
    },
    {
      label: 'Average Adherence',
      value: '92%',
      icon: '📊'
    },
    {
      label: 'Total Medications',
      value: '5',
      icon: '💊'
    }
  ]

  return (
    <div className="progress">
      <header className="progress-header">
        <h2>Progress Tracking</h2>
        <div className="time-range-selector">
          <button
            className={`time-range-btn ${timeRange === 'week' ? 'active' : ''}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`time-range-btn ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            className={`time-range-btn ${timeRange === 'year' ? 'active' : ''}`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </header>

      <div className="progress-grid">
        <section className="adherence-chart card">
          <h3>Adherence Rate</h3>
          <div className="chart-container">
            <div className="chart-bars">
              {adherenceData[timeRange].data.map((value, index) => (
                <div key={index} className="chart-bar-container">
                  <div 
                    className="chart-bar"
                    style={{ height: `${value}%` }}
                  />
                  <div className="chart-label">
                    {adherenceData[timeRange].labels[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="achievements card">
          <h3>Achievements</h3>
          <div className="badges-grid">
            {badges.map(badge => (
              <div 
                key={badge.id} 
                className={`badge ${badge.earned ? 'earned' : 'locked'}`}
              >
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-info">
                  <h4>{badge.name}</h4>
                  <p>{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-overview card">
          <h3>Statistics</h3>
          <div className="stats-grid">
            {stats.map(stat => (
              <div key={stat.label} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h4>{stat.label}</h4>
                  <p className="stat-value">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="medication-progress card">
          <h3>Medication Progress</h3>
          <div className="medication-list">
            <div className="medication-item">
              <div className="medication-info">
                <h4>Blood Pressure Med</h4>
                <p>95% adherence</p>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '95%' }} />
              </div>
            </div>
            <div className="medication-item">
              <div className="medication-info">
                <h4>Vitamin D</h4>
                <p>100% adherence</p>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '100%' }} />
              </div>
            </div>
            <div className="medication-item">
              <div className="medication-info">
                <h4>Aspirin</h4>
                <p>90% adherence</p>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Progress 