const { getMovies } = require('../controllers/movieControllers')

jest.mock('../models/movie', () => ({
  find: jest.fn().mockReturnThis(),
  sort: jest.fn().mockResolvedValue([
    { _id: '1', name: 'A', release: 2000, image: 'http://x', rating: 8, bio: 'a' }
  ])
}))

describe('movieControllers.getMovies', () => {
  it('returns movies list', async () => {
    const req = {}
    const res = { json: jest.fn() }
    const next = jest.fn()

    await getMovies(req, res, next)

    expect(res.json).toHaveBeenCalledWith([
      { _id: '1', name: 'A', release: 2000, image: 'http://x', rating: 8, bio: 'a' }
    ])
    expect(next).not.toHaveBeenCalled()
  })
})
