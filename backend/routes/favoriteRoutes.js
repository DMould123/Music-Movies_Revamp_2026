const express = require('express')
const { requireAuth } = require('../middleware/authMiddleware')
const { getFavorites, toggleFavorite } = require('../controllers/favoriteControllers')

const router = express.Router()

router.get('/', requireAuth, getFavorites)
router.post('/:movieId/toggle', requireAuth, toggleFavorite)

module.exports = router
