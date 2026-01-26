import React, { createContext, useState, useEffect } from 'react'
import api from '../api'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  // Initialize user as null - assuming no user is logged in initially
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the user data from the server when the component mounts
    api
      .get('/api/auth/profile')
      .then(({ data }) => {
        setUser(data)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
