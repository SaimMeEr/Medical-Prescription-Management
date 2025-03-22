import './Sidebar.css'

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'reminders', label: 'Reminders', icon: '⏰' },
    { id: 'prescriptions', label: 'Prescriptions', icon: '💊' },
    { id: 'history', label: 'History', icon: '📅' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'progress', label: 'Progress', icon: '📈' },
    { id: 'support', label: 'Support', icon: '❓' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>MedManager</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>Version 1.0.0</p>
      </div>
    </aside>
  )
}

export default Sidebar 