import axios from 'axios'

const api = axios.create({
  // Use REACT_APP_API_URL when provided; otherwise, same-origin so dev server proxy can route to backend
  baseURL: process.env.REACT_APP_API_URL || '',
  withCredentials: true
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API error:', error.response.status, error.response.data)
    } else {
      console.error('API error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
