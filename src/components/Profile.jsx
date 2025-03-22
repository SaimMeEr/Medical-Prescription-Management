import { useState } from 'react'
import './Profile.css'

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1980-01-01',
    address: '123 Main St, City, State 12345',
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  })

  const [healthInfo, setHealthInfo] = useState({
    bloodType: 'A+',
    allergies: ['Penicillin', 'Pollen'],
    conditions: ['Hypertension', 'Asthma'],
    height: '175cm',
    weight: '70kg'
  })

  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Smith',
      specialty: 'Cardiologist',
      phone: '+1 (555) 111-2222',
      email: 'dr.smith@hospital.com'
    },
    {
      id: 2,
      name: 'Dr. Johnson',
      specialty: 'Primary Care',
      phone: '+1 (555) 333-4444',
      email: 'dr.johnson@clinic.com'
    }
  ])

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target
    setUserInfo(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }))
  }

  const handleHealthInfoChange = (e) => {
    const { name, value } = e.target
    setHealthInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="profile">
      <header className="profile-header">
        <h2>Profile Information</h2>
        <button className="button">Save Changes</button>
      </header>

      <div className="profile-grid">
        <section className="personal-info card">
          <h3>Personal Information</h3>
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleUserInfoChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleUserInfoChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={userInfo.dateOfBirth}
                onChange={handleUserInfoChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={userInfo.address}
                onChange={handleUserInfoChange}
                className="input"
                rows="3"
              />
            </div>
          </form>
        </section>

        <section className="emergency-contact card">
          <h3>Emergency Contact</h3>
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="emergencyName">Contact Name</label>
              <input
                type="text"
                id="emergencyName"
                name="name"
                value={userInfo.emergencyContact.name}
                onChange={handleEmergencyContactChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="relationship">Relationship</label>
              <input
                type="text"
                id="relationship"
                name="relationship"
                value={userInfo.emergencyContact.relationship}
                onChange={handleEmergencyContactChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyPhone">Phone</label>
              <input
                type="tel"
                id="emergencyPhone"
                name="phone"
                value={userInfo.emergencyContact.phone}
                onChange={handleEmergencyContactChange}
                className="input"
              />
            </div>
          </form>
        </section>

        <section className="health-info card">
          <h3>Health Information</h3>
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="bloodType">Blood Type</label>
              <input
                type="text"
                id="bloodType"
                name="bloodType"
                value={healthInfo.bloodType}
                onChange={handleHealthInfoChange}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="allergies">Allergies</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={healthInfo.allergies.join(', ')}
                onChange={(e) => handleHealthInfoChange({
                  target: {
                    name: 'allergies',
                    value: e.target.value.split(',').map(a => a.trim())
                  }
                })}
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="conditions">Medical Conditions</label>
              <input
                type="text"
                id="conditions"
                name="conditions"
                value={healthInfo.conditions.join(', ')}
                onChange={(e) => handleHealthInfoChange({
                  target: {
                    name: 'conditions',
                    value: e.target.value.split(',').map(c => c.trim())
                  }
                })}
                className="input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="height">Height</label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={healthInfo.height}
                  onChange={handleHealthInfoChange}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={healthInfo.weight}
                  onChange={handleHealthInfoChange}
                  className="input"
                />
              </div>
            </div>
          </form>
        </section>

        <section className="doctors card">
          <h3>Healthcare Providers</h3>
          <div className="doctors-list">
            {doctors.map(doctor => (
              <div key={doctor.id} className="doctor-item">
                <div className="doctor-info">
                  <h4>{doctor.name}</h4>
                  <p>{doctor.specialty}</p>
                  <p>Phone: {doctor.phone}</p>
                  <p>Email: {doctor.email}</p>
                </div>
                <button className="button secondary">Edit</button>
              </div>
            ))}
          </div>
          <button className="button">Add Doctor</button>
        </section>
      </div>
    </div>
  )
}

export default Profile 