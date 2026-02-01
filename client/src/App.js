import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './components/Home'
import Albums from './components/Albums'
import Contact from './components/Contact'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Dashboard from './components/pages/Dashboard'
import MovieDetails from './components/pages/MovieDetails'
import Favorites from './components/pages/Favorites'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './context/userContext'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
  const queryClient = new QueryClient()
  return (
    <ErrorBoundary>
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
                <Route element={<Home />} path="/" />
                <Route element={<Albums />} path="/albums" />
                <Route element={<Contact />} path="/contact" />
                <Route element={<Login />} path="/login" />
                <Route element={<Register />} path="/register" />
                <Route element={<Favorites />} path="/favorites" />
                <Route element={<MovieDetails />} path="/movies/:id" />
                <Route
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                  path="/dashboard"
                />
              </Routes>
              <Footer />
            </div>
          </Router>
        </QueryClientProvider>
      </UserContextProvider>
    </ErrorBoundary>
  )
}
