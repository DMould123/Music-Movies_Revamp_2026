const { registerUser, loginUser } = require('../controllers/authControllers')
const User = require('../models/user')
const { hashPassword } = require('../helpers/auth')

// Isolate controller logic from DB and hashing implementation.
jest.mock('../models/user')
jest.mock('../helpers/auth')

describe('authControllers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('registerUser', () => {
    // Ensures schema validation rejects missing required fields.
    it('should return error if name is missing', async () => {
      const req = { body: { username: 'test', email: 'test@test.com', password: '123456' } }
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

      await registerUser(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Required') })
    })

    it('should return error if email already exists', async () => {
      const req = {
        body: { name: 'Test', username: 'test', email: 'test@test.com', password: '123456' }
      }
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

      User.findOne.mockResolvedValueOnce({ email: 'test@test.com' })

      await registerUser(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: 'Email already exists' })
    })

    // Happy path: create user and return public fields.
    it('should create user successfully with valid data', async () => {
      const req = {
        body: { name: 'Test', username: 'test', email: 'test@test.com', password: '123456' }
      }
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

      User.findOne.mockResolvedValue(null)
      hashPassword.mockResolvedValue('hashedpassword')
      User.create.mockResolvedValue({
        _id: '123',
        name: 'Test',
        email: 'test@test.com',
        username: 'test'
      })

      await registerUser(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Test', email: 'test@test.com' })
      )
    })
  })

  describe('loginUser', () => {
    // Ensures invalid payloads fail before auth checks.
    it('should return error for invalid email format', async () => {
      const req = { body: { email: 'invalid', password: '123456' } }
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

      await loginUser(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('email') })
    })
  })
})
