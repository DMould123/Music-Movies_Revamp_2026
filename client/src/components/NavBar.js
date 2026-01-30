import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap'
import { UserContext } from '../context/userContext'
import api from '../api'
import '../styles/navbar.css'

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
  const Styles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'italic'
    }
  }

  return (
    <div>
      <Navbar className="navbar-y2k" expand="lg">
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavItem>
                <NavLink style={Styles} className="nav-link" to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={Styles} className="nav-link" to="/albums">
                  Albums
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={Styles} className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </NavItem>
              {!user && (
                <NavItem>
                  <NavLink style={Styles} className="nav-link" to="/login">
                    Login
                  </NavLink>
                </NavItem>
              )}
              {!user && (
                <NavItem>
                  <NavLink style={Styles} className="nav-link" to="/register">
                    Register
                  </NavLink>
                </NavItem>
              )}
              {user && (
                <NavItem>
                  <NavLink style={Styles} className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </NavItem>
              )}
              {user && (
                <NavItem>
                  <NavLink style={Styles} className="nav-link" to="/favorites">
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
