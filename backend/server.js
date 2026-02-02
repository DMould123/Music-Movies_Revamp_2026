const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const config = require('./config')

const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true
  })
)

// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/movies', require('./routes/movieRoutes'))

// health endpoint for quick checks
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// database connection
if (!config.mongoUri) {
  console.warn('Warning: MONGODB_URI is not set. Database connection will fail.')
}

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => console.log('MongoDB connection error:', err.message))

// Serve static files only in production (when build folder exists)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Server error' })
})

const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`)
})
