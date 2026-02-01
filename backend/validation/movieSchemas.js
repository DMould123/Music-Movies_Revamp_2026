const { z } = require('zod')

const movieSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  release: z.coerce.number().int().min(1888, 'Release year is required'),
  runtime: z.string().optional(),
  image: z.string().url('Image must be a valid URL'),
  rating: z.coerce.number().min(0).max(10),
  bio: z.string().min(1, 'Bio is required')
})

module.exports = { movieSchema }
