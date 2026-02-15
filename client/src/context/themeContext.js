import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to dark mode
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'dark'
  })

  // Persist theme to localStorage and update DOM data attribute for CSS styling
  useEffect(() => {
    // Save theme preference for future sessions
    localStorage.setItem('theme', theme)
    // Apply theme to document for CSS media queries and selectors
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  // Toggle between dark and light theme modes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
