import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap'
import { UserContext } from '../context/userContext'
import api from '../api'
import '../styles/navbar.css'

const adminEmails = (process.env.REACT_APP_ADMIN_EMAILS || 'david.mould123@yahoo.com')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

function LogoutButton() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout')
      setUser(null)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return <button className="logout-btn-y2k" onClick={handleLogout}>Logout</button>
}

function NavBar() {
  const { user } = useContext(UserContext)
  const [expanded, setExpanded] = useState(false)
  const isAdmin = user?.email && adminEmails.includes(user.email.toLowerCase())
  
  const Styles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'italic'
    }
  }

  const handleToggle = () => {
    setExpanded(!expanded)
  }

  const handleNavLinkClick = () => {
    setExpanded(false)
  }

  return (
    <div>
      <Navbar className="navbar-y2k" expand="lg" expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand
            className="logo"
            href="/"
          >
            <img
              src={'/images/logo.png'}
              alt="Music & Movies"
              className="navbar-logo-img"
              style={{ width: '300px', height: '80px' }}
            />
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className={`navbar-toggler-custom ${expanded ? 'active' : ''}`}
            onClick={handleToggle}
          >
            <span className="toggler-line line-1"></span>
            <span className="toggler-line line-2"></span>
            <span className="toggler-line line-3"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavItem>
                <NavLink 
                  style={Styles} 
                  className="nav-link" 
                  to="/"
                  onClick={handleNavLinkClick}
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  style={Styles} 
                  className="nav-link" 
                  to="/albums"
                  onClick={handleNavLinkClick}
                >
                  Albums
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  style={Styles} 
                  className="nav-link" 
                  to="/contact"
                  onClick={handleNavLinkClick}
                >
                  Contact
                </NavLink>
              </NavItem>
              {!user && (
                <NavItem>
                  <NavLink 
                    style={Styles} 
                    className="nav-link" 
                    to="/login"
                    onClick={handleNavLinkClick}
                  >
                    Login
                  </NavLink>
                </NavItem>
              )}
              {!user && (
                <NavItem>
                  <NavLink 
                    style={Styles} 
                    className="nav-link" 
                    to="/register"
                    onClick={handleNavLinkClick}
                  >
                    Register
                  </NavLink>
                </NavItem>
              )}
              {user && isAdmin && (
                <NavItem>
                  <NavLink 
                    style={Styles} 
                    className="nav-link" 
                    to="/dashboard"
                    onClick={handleNavLinkClick}
                  >
                    Dashboard
                  </NavLink>
                </NavItem>
              )}
              {user && (
                <NavItem>
                  <NavLink 
                    style={Styles} 
                    className="nav-link" 
                    to="/favorites"
                    onClick={handleNavLinkClick}
                  >
                    Favorites
                  </NavLink>
                </NavItem>
              )}
              {user && <LogoutButton />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar
