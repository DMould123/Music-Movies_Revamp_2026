const express = require('express')
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieControllers')
const { requireAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

// Public movie read endpoints.
router.get('/', getMovies)
router.get('/:id', getMovieById)

// Admin-only movie write endpoints.
router.post('/', requireAdmin, createMovie)
router.put('/:id', requireAdmin, updateMovie)
router.delete('/:id', requireAdmin, deleteMovie)

module.exports = router
