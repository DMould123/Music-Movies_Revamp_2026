import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../../api'

const MovieDetails = () => {
  const { id } = useParams()
  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const res = await api.get(`/api/movies/${id}`)
      return res.data
    }
  })

  if (isLoading) return <div className="loading-spinner">Loading...</div>
  if (isError || !movie) return <div style={{ color: 'red' }}>Not found.</div>

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <img src={movie.image} alt={movie.name} style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }} />
      <h2 style={{ marginTop: '1rem' }}>{movie.name}</h2>
      <p><b>Release Year:</b> {movie.release}</p>
      <p><b>IMDb Rating:</b> {movie.rating}</p>
      <p><b>Bio:</b> {movie.bio}</p>
    </div>
  )
}

export default MovieDetails
