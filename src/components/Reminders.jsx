import { useState, useEffect } from 'react'
import './Reminders.css'
import { 
  getReminders, 
  addReminder, 
  updateReminder, 
  deleteReminder 
} from '../utils/localStorage'

const Reminders = () => {
  const [reminders, setReminders] = useState([])
  const [newReminder, setNewReminder] = useState({
    medication: '',
    time: '',
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    notes: ''
  })

  useEffect(() => {
    // Load reminders from localStorage when component mounts
    const loadedReminders = getReminders()
    setReminders(loadedReminders)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReminder(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDayChange = (day) => {
    setNewReminder(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [day]: !prev.days[day]
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check if at least one day is selected
    const hasSelectedDays = Object.values(newReminder.days).some(day => day)
    if (!hasSelectedDays) {
      alert('Please select at least one day')
      return
    }

    // Add new reminder
    const success = addReminder(newReminder)
    if (success) {
      // Update local state
      const updatedReminders = getReminders()
      setReminders(updatedReminders)
      
      // Reset form
      setNewReminder({
        medication: '',
        time: '',
        days: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
        },
        notes: ''
      })
    }
  }

  const handleToggleActive = (id) => {
    const reminder = reminders.find(r => r.id === id)
    if (reminder) {
      const success = updateReminder(id, {
        ...reminder,
        active: !reminder.active
      })
      if (success) {
        const updatedReminders = getReminders()
        setReminders(updatedReminders)
      }
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      const success = deleteReminder(id)
      if (success) {
        const updatedReminders = getReminders()
        setReminders(updatedReminders)
      }
    }
  }

  return (
    <div className="reminders">
      <header className="reminders-header">
        <h2>Reminders</h2>
      </header>

      <div className="reminders-grid">
        <section className="reminder-list card">
          <h3>Active Reminders</h3>
          <div className="reminder-list">
            {reminders.length === 0 ? (
              <p className="placeholder-text">No reminders set</p>
            ) : (
              reminders.map(reminder => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-info">
                    <h4>{reminder.medication}</h4>
                    <p>Time: {reminder.time}</p>
                    <p>Days: {Object.entries(reminder.days)
                      .filter(([_, selected]) => selected)
                      .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
                      .join(', ')}
                    </p>
                    {reminder.notes && <p>Notes: {reminder.notes}</p>}
                  </div>
                  <div className="reminder-actions">
                    <button
                      className={`button ${reminder.active ? 'secondary' : ''}`}
                      onClick={() => handleToggleActive(reminder.id)}
                    >
                      {reminder.active ? 'Pause' : 'Activate'}
                    </button>
                    <button
                      className="button secondary"
                      onClick={() => handleDelete(reminder.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="reminder-form card">
          <h3>Add New Reminder</h3>
          <form onSubmit={handleSubmit} className="reminder-form">
            <div className="form-group">
              <label>Medication Name</label>
              <input
                type="text"
                name="medication"
                value={newReminder.medication}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={newReminder.time}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Days</label>
              <div className="days-grid">
                {Object.entries(newReminder.days).map(([day, selected]) => (
                  <label key={day} className="day-checkbox">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleDayChange(day)}
                    />
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                name="notes"
                value={newReminder.notes}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <button type="submit" className="button">
              Add Reminder
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Reminders 