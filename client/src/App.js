import React from 'react'
import './App.css'
import './styles/theme.css'
import './styles/responsive.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Home from './components/Home'
import Albums from './components/Albums'
import Contact from './components/Contact'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'
import MovieDetails from './components/pages/MovieDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './context/userContext'
import { ThemeProvider } from './context/themeContext'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
  const queryClient = new QueryClient()
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <div className="App">
                <NavBar />
                <Toaster
                  position="bottom-right"
                  toastOptions={{ duration: 2000, className: 'toast-y2k' }}
                />
                <Routes>
                  <Route element={<PageTransition><Home /></PageTransition>} path="/" />
                  <Route element={<PageTransition><Albums /></PageTransition>} path="/albums" />
                  <Route element={<PageTransition><Contact /></PageTransition>} path="/contact" />
                  <Route element={<PageTransition><Login /></PageTransition>} path="/login" />
                  <Route element={<PageTransition><Register /></PageTransition>} path="/register" />
                  <Route element={<PageTransition><MovieDetails /></PageTransition>} path="/movies/:id" />
                  <Route
                    element={
                      <PageTransition>
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      </PageTransition>
                    }
                    path="/dashboard"
                  />
                </Routes>
                <Footer />
              </div>
            </Router>
          </QueryClientProvider>
        </UserContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
