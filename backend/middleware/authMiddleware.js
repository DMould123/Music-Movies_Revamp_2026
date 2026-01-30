const jwt = require('jsonwebtoken')
const config = require('../config')

const isAdminEmail = (email) => {
  if (!email) return false
  return config.adminEmails.includes(email.toLowerCase())
}

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
