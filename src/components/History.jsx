import { useState } from 'react'
import './History.css'

const History = () => {
  const [history] = useState([
    {
      id: 1,
      medication: 'Blood Pressure Med',
      date: '2024-03-19',
      time: '08:00',
      status: 'taken',
      notes: 'Taken with breakfast'
    },
    {
      id: 2,
      medication: 'Vitamin D',
      date: '2024-03-19',
      time: '09:00',
      status: 'taken',
      notes: 'Taken with water'
    },
    {
      id: 3,
      medication: 'Aspirin',
      date: '2024-03-19',
      time: '12:00',
      status: 'missed',
      notes: 'Forgot to take'
    }
  ])

  const [filters, setFilters] = useState({
    date: '',
    medication: '',
    status: ''
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const filteredHistory = history.filter(item => {
    if (filters.date && item.date !== filters.date) return false
    if (filters.medication && !item.medication.toLowerCase().includes(filters.medication.toLowerCase())) return false
    if (filters.status && item.status !== filters.status) return false
    return true
  })

  return (
    <div className="history">
      <header className="history-header">
        <h2>Medication History</h2>
        <div className="date-range">
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="input"
          />
        </div>
      </header>

      <div className="history-filters">
        <div className="search-box">
          <input
            type="text"
            name="medication"
            placeholder="Search by medication..."
            value={filters.medication}
            onChange={handleFilterChange}
            className="input"
          />
        </div>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="input"
        >
          <option value="">All Status</option>
          <option value="taken">Taken</option>
          <option value="missed">Missed</option>
          <option value="delayed">Delayed</option>
        </select>
      </div>

      <div className="history-timeline">
        {filteredHistory.map(item => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-date">
              {new Date(item.date).toLocaleDateString()}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h4>{item.medication}</h4>
                <span className={`status-badge ${item.status}`}>
                  {item.status}
                </span>
              </div>
              <div className="timeline-details">
                <p>Time: {item.time}</p>
                {item.notes && <p>Notes: {item.notes}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="no-results">
          <p>No history found for the selected filters</p>
        </div>
      )}
    </div>
  )
}

export default History 