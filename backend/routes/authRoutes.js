const express = require('express')
const router = express.Router()
const cors = require('cors')
const config = require('../config')
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser
} = require('../controllers/authControllers')

// Restrict auth route CORS to configured frontend origin.
const corsOptions = {
  origin: config.clientOrigin,
  credentials: true
}

router.use(cors(corsOptions))

// Auth API endpoints.
router.get('/test', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)

module.exports = router
