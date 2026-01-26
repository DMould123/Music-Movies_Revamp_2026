const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    release: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    bio: { type: String, required: true }
  },
  { timestamps: true }
)

const Movie = mongoose.model('Movie', movieSchema, 'movies')

module.exports = Movie
