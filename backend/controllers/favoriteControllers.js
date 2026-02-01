const Favorite = require('../models/favorite')

const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id }).populate('movieId')
    const movies = favorites
      .filter((f) => f.movieId)
      .map((f) => ({ ...f.movieId.toObject(), _favoriteId: f._id }))
    res.json(movies)
  } catch (err) {
    next(err)
  }
}

const toggleFavorite = async (req, res, next) => {
  try {
    const { movieId } = req.params
    const existing = await Favorite.findOne({ userId: req.user.id, movieId })
    if (existing) {
      await Favorite.deleteOne({ _id: existing._id })
      return res.json({ status: 'removed' })
    }
    await Favorite.create({ userId: req.user.id, movieId })
    res.status(201).json({ status: 'added' })
  } catch (err) {
    // Handle duplicate index error gracefully
    if (err && err.code === 11000) {
      return res.status(200).json({ status: 'added' })
    }
    next(err)
  }
}

module.exports = { getFavorites, toggleFavorite }
