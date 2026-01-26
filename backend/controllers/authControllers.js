const { hashPassword, comparePassword } = require('../helpers/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { registerSchema, loginSchema } = require('../validation/authSchemas')

const formatZodError = (issueList) => issueList.map((i) => i.message).join(', ')

const test = (req, res) => {
  res.json('test working')
}

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: formatZodError(parsed.error.issues) })
    }

    const { name, email, password } = parsed.data

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Server error' })
  }
}

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: formatZodError(parsed.error.issues) })
    }

    const { email, password } = parsed.data
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      config.jwtSecret,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Token generation failed' })
        }
        res
          .cookie('token', token, config.cookieOptions)
          .json({ id: user._id, name: user.name, email: user.email })
      }
    )
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
const getProfile = (req, res) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return res.json(null)
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid or expired token' })
      }
      res.json(user)
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
}

const logoutUser = (req, res) => {
  res
    .clearCookie('token', { ...config.cookieOptions, maxAge: 0 })
    .json({ message: 'Logged out successfully' })
}

module.exports = { test, registerUser, loginUser, getProfile, logoutUser }
