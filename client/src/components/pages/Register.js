import React, { useState } from 'react'
import api from '../../api'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import '../../styles/retro.css'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const schema = z
    .object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Enter a valid email'),
      password: z.string().min(6, 'Min 6 characters'),
      confirmPassword: z.string().min(6, 'Min 6 characters')
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword']
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ resolver: zodResolver(schema) })

  const registerUser = async (data) => {
    try {
      const { confirmPassword, ...userData } = data
      const responseData = await api.post('/api/auth/register', userData)

      if (responseData.data.error) {
        toast.error(responseData.data.error)
      } else {
        reset()
        toast.success('Registration was successful. Welcome to Music & Movies')
        navigate('/login')
      }
    } catch (error) {}
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
          <div className="chrome-header">
            <h1 className="y2k-title">JOIN THE CAST</h1>
            <p className="retro-subtitle">Become a VIP Member</p>
          </div>

          <form className="future-form" onSubmit={handleSubmit(registerUser)}>
            <div className="retro-field">
              <div className="field-chrome">
                <div className="chrome-border"></div>
                <input type="text" id="name" placeholder=" " {...register('name')} />
                <label htmlFor="name"><FaUserCircle /> Full Name</label>
                <div className="field-hologram"></div>
              </div>
              {errors.name && <span className="retro-error show">{errors.name.message}</span>}
            </div>

            <div className="retro-field">
              <div className="field-chrome">
                <div className="chrome-border"></div>
                <input type="email" id="email" placeholder=" " {...register('email')} />
                <label htmlFor="email"><FaEnvelope /> Email Address</label>
                <div className="field-hologram"></div>
              </div>
              {errors.email && <span className="retro-error show">{errors.email.message}</span>}
            </div>

            <div className="retro-field">
              <div className="field-chrome">
                <div className="chrome-border"></div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder=" "
                  {...register('password')}
                />
                <label htmlFor="password"><FaLock /> Password</label>
                <button
                  type="button"
                  className="retro-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="field-hologram"></div>
              </div>
              {errors.password && <span className="retro-error show">{errors.password.message}</span>}
            </div>

            <div className="retro-field">
              <div className="field-chrome">
                <div className="chrome-border"></div>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder=" "
                  {...register('confirmPassword')}
                />
                <label htmlFor="confirmPassword"><FaLock /> Confirm Password</label>
                <button
                  type="button"
                  className="retro-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="field-hologram"></div>
              </div>
              {errors.confirmPassword && <span className="retro-error show">{errors.confirmPassword.message}</span>}
            </div>

            <button type="submit" className="retro-button" disabled={isSubmitting}>
              <div className="button-chrome"></div>
              <span className="button-text">GET YOUR TICKET</span>
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

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
              Already have a ticket? <span style={{ color: '#ff00ff', cursor: 'pointer' }} onClick={() => navigate('/login')}>Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
