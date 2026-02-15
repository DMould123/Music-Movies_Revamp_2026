import React, { createContext, useState, useEffect } from 'react'
import api from '../api'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  // Initialize user as null - assuming no user is logged in initially
  const [user, setUser] = useState(null)
  // Track loading state to manage UI feedback during auth verification
  const [loading, setLoading] = useState(true)

  // Verify user authentication on app mount by fetching profile from server
  useEffect(() => {
    // Check if JWT token exists in cookies and retrieve user profile
    api
      .get('/api/auth/profile')
      .then(({ data }) => {
        // User is authenticated - store profile data
        setUser(data)
      })
      .catch((error) => {
        // No valid token or auth failed - user remains null
        console.error('Error fetching user data:', error)
      })
      .finally(() => {
        // Auth check complete regardless of success/failure
        setLoading(false)
      })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
