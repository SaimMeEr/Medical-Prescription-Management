import { useState } from 'react'
import './Support.css'

const Support = () => {
  const [activeTab, setActiveTab] = useState('faq')
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      question: 'How do I add a new medication?',
      answer: 'Click on the "Add Medication" button in the Dashboard or go to the Prescriptions section. Fill in the medication details, including name, dosage, frequency, and any special instructions.'
    },
    {
      question: 'How do I set up reminders?',
      answer: 'Go to the Reminders section and click "Add New Reminder". Select the medication, set the time and frequency, and choose your preferred notification method.'
    },
    {
      question: 'Can I share my medication list with my doctor?',
      answer: 'Yes, you can export your medication list as a PDF or share it directly with your healthcare provider through the app.'
    },
    {
      question: 'How do I request a prescription renewal?',
      answer: 'Go to the Prescriptions section, find the medication that needs renewal, and click the "Request Renewal" button. Follow the prompts to complete the request.'
    }
  ]

  const guides = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using MedManager',
      icon: '📚'
    },
    {
      title: 'Managing Medications',
      description: 'How to add, edit, and track your medications',
      icon: '💊'
    },
    {
      title: 'Setting Up Reminders',
      description: 'Configure and customize your medication reminders',
      icon: '⏰'
    },
    {
      title: 'Understanding Reports',
      description: 'How to read and interpret your adherence reports',
      icon: '📊'
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="support">
      <header className="support-header">
        <h2>Help & Support</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
          />
        </div>
      </header>

      <div className="support-tabs">
        <button
          className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
        <button
          className={`tab-btn ${activeTab === 'guides' ? 'active' : ''}`}
          onClick={() => setActiveTab('guides')}
        >
          Guides
        </button>
        <button
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Support
        </button>
      </div>

      <div className="support-content">
        {activeTab === 'faq' && (
          <section className="faq-section">
            <div className="faq-list">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'guides' && (
          <section className="guides-section">
            <div className="guides-grid">
              {guides.map((guide, index) => (
                <div key={index} className="guide-card">
                  <div className="guide-icon">{guide.icon}</div>
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                  <button className="button">Read Guide</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="contact-section">
            <div className="contact-methods">
              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>Live Chat</h3>
                <p>Chat with our support team in real-time</p>
                <button className="button">Start Chat</button>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h3>Email Support</h3>
                <p>Send us an email and we'll get back to you</p>
                <button className="button">Send Email</button>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h3>Phone Support</h3>
                <p>Call us for immediate assistance</p>
                <button className="button">Call Now</button>
              </div>
            </div>

            <div className="contact-form card">
              <h3>Send us a Message</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className="input"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="button">
                  Send Message
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Support 