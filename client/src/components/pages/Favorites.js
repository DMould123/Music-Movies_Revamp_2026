import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../api'
import { UserContext } from '../../context/userContext'
import { Link } from 'react-router-dom'
import SkeletonMovieCard from '../SkeletonMovieCard'

const Favorites = () => {
  const { user } = useContext(UserContext)
  const { data: movies = [], isLoading, isError } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await api.get('/api/favorites')
      return res.data
    },
    enabled: !!user
  })

  if (!user) return <div style={{ padding: '2rem' }}>Login to see favorites.</div>
  if (isLoading) {
    return (
      <div style={{ maxWidth: 1000, margin: '2rem auto' }}>
        <h2>Your Favorites</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {[...Array(6)].map((_, i) => (
            <SkeletonMovieCard key={i} />
          ))}
        </div>
      </div>
    )
  }
  if (isError) return <div style={{ color: 'red' }}>Failed to load favorites.</div>

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto' }}>
      <h2>Your Favorites</h2>
      {movies.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {movies.map((m) => (
            <Link to={`/movies/${m._id}`} key={m._id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card">
                <img src={m.image} alt={m.name} className="card-image" style={{ width: '100%', height: 250, objectFit: 'cover' }} />
                <div className="card-body">
                  <h4 className="card-title">{m.name}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
