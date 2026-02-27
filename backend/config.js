require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV || 'development'
const isProduction = NODE_ENV === 'production'

// Parses comma-separated admin emails from env.
const parseAdminEmails = (value) => {
  if (!value) return []
  return value
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

const defaultAdminEmails = ['david.mould123@yahoo.com']
const adminEmails = parseAdminEmails(process.env.ADMIN_EMAILS)
const resolvedAdminEmails = adminEmails.length > 0 ? adminEmails : defaultAdminEmails

// Centralized runtime config with safe development defaults.
const config = {
  env: NODE_ENV,
  isProduction,
  port: process.env.PORT || 3000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  adminEmails: resolvedAdminEmails,
  // Cookie policy switches for local dev vs production HTTPS.
  cookieOptions: {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}

module.exports = config
