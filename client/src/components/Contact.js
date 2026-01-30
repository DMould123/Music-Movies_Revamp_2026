import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa'
import axios from 'axios'
import '../styles/retro.css'

const Contact = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { name, email, message } = data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('message', message)

    try {
      const response = await axios.post(
        'https://formspree.io/f/mjvdqpav',
        formData
      )

      if (response.status === 200) {
        setIsSuccess(true)
        setData({ name: '', email: '', message: '' })
        setTimeout(() => setIsSuccess(false), 4000)
      }
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="retro-page">
      <div className="retro-background">
        <div className="y2k-grid">
          <div className="grid-dots"></div>
          <div className="scanner-lines">
            <div className="scan-line scan-1"></div>
            <div className="scan-line scan-2"></div>
            <div className="scan-line scan-3"></div>
          </div>
        </div>
        <div className="floating-orbs">
          <div className="retro-orb orb-1"></div>
          <div className="retro-orb orb-2"></div>
          <div className="retro-orb orb-3"></div>
        </div>
      </div>

      <div className="retro-container">
        <div className="future-card">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dele4dvi9/image/upload/v1769813010/movies%20and%20music/music/logo_t4iunx.png"
              alt="Music & Movies Logo"
              className="card-logo"
            />
          </div>
          <div className="chrome-header">
            <h1 className="y2k-title">YOUR REVIEW</h1>
            <p className="retro-subtitle">Share Your Experience</p>
          </div>

          {!isSuccess ? (
            <form className="future-form" onSubmit={handleSubmit}>
              <div className="retro-field">
                <div className="field-chrome">
                  <div className="chrome-border"></div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=" "
                    value={name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name"><FaUser /> Your Name</label>
                  <div className="field-hologram"></div>
                </div>
              </div>

              <div className="retro-field">
                <div className="field-chrome">
                  <div className="chrome-border"></div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder=" "
                    value={email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email"><FaEnvelope /> Email Address</label>
                  <div className="field-hologram"></div>
                </div>
              </div>

              <div className="retro-field">
                <div className="field-chrome">
                  <div className="chrome-border"></div>
                  <textarea
                    id="message"
                    name="message"
                    placeholder=" "
                    value={message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label htmlFor="message"><FaComment /> Your Message</label>
                  <div className="field-hologram"></div>
                </div>
              </div>

              <button type="submit" className="retro-button" disabled={isLoading}>
                <div className="button-chrome"></div>
                <span className="button-text">SEND YOUR REVIEW</span>
                <div className="button-loader">
                  <div className="y2k-spinner">
                    <div className="spinner-ring ring-1"></div>
                    <div className="spinner-ring ring-2"></div>
                    <div className="spinner-ring ring-3"></div>
                  </div>
                </div>
                <div className="button-hologram"></div>
              </button>
            </form>
          ) : (
            <div className="retro-success show">
              <h3 className="success-title">REVIEW SUBMITTED</h3>
              <p className="success-desc">Thanks for sharing your thoughts with us!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
