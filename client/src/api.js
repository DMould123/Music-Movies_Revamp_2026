import axios from 'axios'

// API client configuration with automatic credential handling
const api = axios.create({
  // Use REACT_APP_API_URL when provided; otherwise, same-origin so dev server proxy can route to backend
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true // Automatically include cookies in requests for JWT authentication
})

// Response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log API errors with response data for debugging
    if (error.response) {
      console.error('API error:', error.response.status, error.response.data)
    } else {
      // Handle network or other axios errors
      console.error('API error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
