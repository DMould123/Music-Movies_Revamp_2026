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

router.get('/', getMovies)
router.get('/:id', getMovieById)
router.post('/', requireAdmin, createMovie)
router.put('/:id', requireAdmin, updateMovie)
router.delete('/:id', requireAdmin, deleteMovie)

module.exports = router
