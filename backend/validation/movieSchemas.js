const { z } = require('zod')

const maxReleaseYear = new Date().getFullYear() + 1

const movieSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  release: z.coerce
    .number()
    .int()
    .min(1888, 'Release year must be 1888 or later')
    .max(maxReleaseYear, `Release year cannot be later than ${maxReleaseYear}`),
  runtime: z.string().optional(),
  image: z.string().url('Image must be a valid URL'),
  rating: z.coerce.number().min(0).max(10),
  bio: z.string().trim().min(1, 'Bio is required')
})

module.exports = { movieSchema }
