const jwt = require('jsonwebtoken')
const config = require('../config')

// Checks whether a user email is in the configured admin allowlist.
const isAdminEmail = (email) => {
  if (!email) return false
  return config.adminEmails.includes(email.toLowerCase())
}

// Requires a valid JWT cookie and attaches decoded user to req.user.
const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid or expired token' })
      }
      req.user = decoded
      next()
    })
  } catch (err) {
    next(err)
  }
}

// Requires valid JWT cookie and admin email before continuing.
const requireAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.token
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid or expired token' })
      }

      if (!isAdminEmail(decoded?.email)) {
        return res.status(403).json({ error: 'Admin access required' })
      }

      req.user = decoded
      next()
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { requireAuth, requireAdmin }
