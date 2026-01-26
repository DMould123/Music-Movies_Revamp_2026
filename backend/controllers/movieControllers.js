const Movie = require('../models/movie')
const { movieSchema } = require('../validation/movieSchemas')

const formatZodError = (issueList) => issueList.map((i) => i.message).join(', ')

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 })
    res.json(movies)
  } catch (err) {
    next(err)
  }
}

const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).json({ error: 'Movie not found' })
    res.json(movie)
  } catch (err) {
    next(err)
  }
}

const createMovie = async (req, res, next) => {
  try {
    const parsed = movieSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: formatZodError(parsed.error.issues) })
    }

    const movie = await Movie.create(parsed.data)
    res.status(201).json(movie)
  } catch (err) {
    next(err)
  }
}

const updateMovie = async (req, res, next) => {
  try {
    const parsed = movieSchema.partial().safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: formatZodError(parsed.error.issues) })
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, parsed.data, {
      new: true
    })

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.json(movie)
  } catch (err) {
    next(err)
  }
}

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' })
    }

    res.json({ message: 'Movie deleted' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie }
