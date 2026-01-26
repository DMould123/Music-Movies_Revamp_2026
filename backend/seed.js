require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const config = require('./config')

// Import the Movie model
const Movie = require('./models/movie')

async function seedMovies() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...')
    await mongoose.connect(config.mongoUri)
    console.log('Connected to MongoDB')

    // Read movies.json
    const moviesPath = path.join(__dirname, '../client/public/movies.json')
    const rawData = fs.readFileSync(moviesPath, 'utf-8')
    const { movies } = JSON.parse(rawData)

    // Clear existing movies
    console.log('Clearing existing movies...')
    await Movie.deleteMany({})

    // Transform and insert movies
    const transformedMovies = movies.map((movie) => ({
      name: movie.name,
      release: Number(movie.release),
      // Use the image URL from the source data (e.g., Cloudinary) without forcing a static prefix
      image: movie.image,
      rating: Number(movie.rating),
      bio: movie.bio
    }))

    console.log(`Inserting ${transformedMovies.length} movies...`)
    await Movie.insertMany(transformedMovies)

    console.log('✅ Movies seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding movies:', error)
    process.exit(1)
  }
}

seedMovies()
