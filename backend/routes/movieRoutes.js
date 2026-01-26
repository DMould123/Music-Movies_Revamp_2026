const express = require('express')
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieControllers')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovieById)
router.post('/', requireAuth, createMovie)
router.put('/:id', requireAuth, updateMovie)
router.delete('/:id', requireAuth, deleteMovie)

module.exports = router
