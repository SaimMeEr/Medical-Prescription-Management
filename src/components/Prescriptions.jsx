import { useState, useEffect } from 'react'
import './Prescriptions.css'
import { 
  getPrescriptions, 
  addPrescription, 
  updatePrescription, 
  deletePrescription 
} from '../utils/localStorage'

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([])
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    startDate: '',
    expiryDate: '',
    doctor: '',
    notes: '',
    status: 'active'
  })
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  })

  useEffect(() => {
    // Load prescriptions from localStorage when component mounts
    const loadedPrescriptions = getPrescriptions()
    setPrescriptions(loadedPrescriptions)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPrescription(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Add new prescription
    const success = addPrescription(newPrescription)
    if (success) {
      // Update local state
      const updatedPrescriptions = getPrescriptions()
      setPrescriptions(updatedPrescriptions)
      
      // Reset form
      setNewPrescription({
        medication: '',
        dosage: '',
        frequency: '',
        startDate: '',
        expiryDate: '',
        doctor: '',
        notes: '',
        status: 'active'
      })
    }
  }

  const handleStatusChange = (id, newStatus) => {
    const prescription = prescriptions.find(p => p.id === id)
    if (prescription) {
      const success = updatePrescription(id, {
        ...prescription,
        status: newStatus
      })
      if (success) {
        const updatedPrescriptions = getPrescriptions()
        setPrescriptions(updatedPrescriptions)
      }
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      const success = deletePrescription(id)
      if (success) {
        const updatedPrescriptions = getPrescriptions()
        setPrescriptions(updatedPrescriptions)
      }
    }
  }

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.medication.toLowerCase().includes(filters.search.toLowerCase())
    const matchesStatus = !filters.status || prescription.status === filters.status
    return matchesSearch && matchesStatus
  })

  return (
    <div className="prescriptions">
      <header className="prescriptions-header">
        <h2>Prescriptions</h2>
      </header>

      <div className="prescriptions-grid">
        <section className="prescription-list card">
          <h3>Current Prescriptions</h3>
          <div className="history-filters">
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="input"
            />
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="input"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="renewed">Renewed</option>
            </select>
          </div>
          <div className="prescription-list">
            {filteredPrescriptions.length === 0 ? (
              <p className="placeholder-text">No prescriptions found</p>
            ) : (
              filteredPrescriptions.map(prescription => (
                <div key={prescription.id} className="prescription-item">
                  <div className="prescription-info">
                    <h4>{prescription.medication}</h4>
                    <p>Dosage: {prescription.dosage}</p>
                    <p>Frequency: {prescription.frequency}</p>
                    <p>Start Date: {new Date(prescription.startDate).toLocaleDateString()}</p>
                    <p>Expiry Date: {new Date(prescription.expiryDate).toLocaleDateString()}</p>
                    <p>Doctor: {prescription.doctor}</p>
                    {prescription.notes && <p>Notes: {prescription.notes}</p>}
                  </div>
                  <div className="prescription-actions">
                    <select
                      value={prescription.status}
                      onChange={(e) => handleStatusChange(prescription.id, e.target.value)}
                      className="input"
                    >
                      <option value="active">Active</option>
                      <option value="expired">Expired</option>
                      <option value="renewed">Renewed</option>
                    </select>
                    <button
                      className="button secondary"
                      onClick={() => handleDelete(prescription.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="prescription-form card">
          <h3>Add New Prescription</h3>
          <form onSubmit={handleSubmit} className="prescription-form">
            <div className="form-group">
              <label>Medication Name</label>
              <input
                type="text"
                name="medication"
                value={newPrescription.medication}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Dosage</label>
              <input
                type="text"
                name="dosage"
                value={newPrescription.dosage}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Frequency</label>
              <input
                type="text"
                name="frequency"
                value={newPrescription.frequency}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newPrescription.startDate}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={newPrescription.expiryDate}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Doctor</label>
              <input
                type="text"
                name="doctor"
                value={newPrescription.doctor}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                name="notes"
                value={newPrescription.notes}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <button type="submit" className="button">
              Add Prescription
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Prescriptions 