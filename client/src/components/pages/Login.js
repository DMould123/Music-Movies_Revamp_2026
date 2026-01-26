import React, { useContext, useState } from 'react'
import api from '../../api'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { UserContext } from '../../context/userContext'
import '../../styles/retro.css'

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const schema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Min 6 characters')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ resolver: zodResolver(schema) })

  const userLogin = async ({ email, password }) => {
    setIsLoading(true)
    try {
      const { data: userData } = await api.post('/api/auth/login', {
        email,
        password
      })
      if (userData.error) {
        toast.error(userData.error)
      } else {
        reset()
        setUser(userData)
        toast.success('Welcome to the Show!')
        setTimeout(() => navigate('/dashboard'), 1000)
      }
    } catch (error) {
      toast.error('Authentication failed')
      console.error('Login error:', error)
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
          <div className="chrome-header">
            <h1 className="y2k-title">BOX OFFICE</h1>
            <p className="retro-subtitle">Get Your All-Access Pass</p>
          </div>

          <form className="future-form" onSubmit={handleSubmit(userLogin)}>
            <div className="retro-field">
              <div className="field-chrome">
                <div className="chrome-border"></div>
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  {...register('email')}
                />
                <label htmlFor="email"><FaEnvelope /> Email Address</label>
                <div className="field-hologram"></div>
              </div>
              {errors.email && (
                <span className="retro-error show">{errors.email.message}</span>
              )}
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
              {errors.password && (
                <span className="retro-error show">{errors.password.message}</span>
              )}
            </div>

            <button 
              type="submit" 
              className="retro-button" 
              disabled={isSubmitting || isLoading}
            >
              <div className="button-chrome"></div>
              <span className="button-text">LIGHTS, CAMERA, ACTION!</span>
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
              New to the show? <span style={{ color: '#ff00ff', cursor: 'pointer' }} onClick={() => navigate('/register')}>Get Your Ticket</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
