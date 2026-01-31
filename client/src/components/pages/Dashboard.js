import React, { useContext, useState } from 'react'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { UserContext } from '../../context/userContext'
import api from '../../api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import '../../styles/retro.css'
import '../../styles/dashboard.css'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [editingId, setEditingId] = useState(null)
  const fireConfetti = () => {
    const colors = ['#DC143C', '#FFD700', '#9400D3', '#00E5FF', '#FFFFFF']
    confetti({
      particleCount: 160,
      spread: 70,
      origin: { y: 0.6 },
      colors
    })
    confetti({
      particleCount: 90,
      spread: 120,
      origin: { y: 0.55 },
      scalar: 0.9,
      colors
    })
    confetti({
      particleCount: 120,
      spread: 160,
      origin: { y: 0.5 },
      scalar: 0.8,
      colors
    })
  }
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await api.get('/api/movies')
      return res.data
    }
  })

  const schema = z.object({
    name: z.string().min(1, 'Required'),
    release: z.coerce.number().int().min(1888, 'Invalid year'),
    image: z.string().url('Must be a URL'),
    rating: z.coerce.number().min(0).max(10),
    bio: z.string().min(1, 'Required')
  })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) })
  const [isAddingMovie, setIsAddingMovie] = useState(false)

  const addMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/api/movies', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] })
    }
  })

  const handleAddMovie = async (data) => {
    try {
      const created = await addMutation.mutateAsync(data)
      fireConfetti()
      toast.success(`Added "${created?.name || 'movie'}" to your collection`)
      reset()
      setIsAddingMovie(false)
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const deleteMutation = useMutation({
    mutationFn: async ({ id }) => {
      await api.delete(`/api/movies/${id}`)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['movies'] })
      toast.success(`Deleted "${variables?.name || 'movie'}"`)
    }
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { data: updated } = await api.put(`/api/movies/${id}`, data)
      return updated
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['movies'] })
      setEditingId(null)
      toast.success(`Updated "${updated?.name || 'movie'}"`)
    }
  })

  const handleDeleteMovie = async (movieId, movieName) => {
    try {
      await deleteMutation.mutateAsync({ id: movieId, name: movieName })
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div className="dashboard-wrapper">
      <div className="retro-background">
        <div className="y2k-grid"></div>
        <div className="grid-dots"></div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="y2k-title">DIRECTOR'S CUT</h1>
          {!!user && <p className="welcome-text">Welcome back, {user.name}!</p>}
          {!user && (
            <button className="retro-button" onClick={() => navigate('/login')}>
              <span className="button-text">Login to Manage</span>
            </button>
          )}
        </div>

        {user && (
          <div className="action-bar">
            <button 
              className={`retro-button ${isAddingMovie ? 'active' : ''}`}
              onClick={() => setIsAddingMovie(!isAddingMovie)}
            >
              <span className="button-text">{isAddingMovie ? '✕ Cancel' : '+ Add Movie'}</span>
            </button>
          </div>
        )}

        {isAddingMovie && (
          <div className="add-movie-form future-card">
            <div className="chrome-header">
              <h2 className="y2k-title" style={{ fontSize: '1.5rem' }}>NEW FEATURE</h2>
            </div>
            <form className="future-form" onSubmit={handleSubmit(handleAddMovie)}>
              <div className="retro-field">
                <div className="field-chrome">
                  <input
                    type="text"
                    className="retro-input"
                    placeholder="Movie Title"
                    {...register('name')}
                  />
                  <label className="retro-label">Title</label>
                </div>
                {errors.name && <span className="field-error">{errors.name.message}</span>}
              </div>

              <div className="retro-field">
                <div className="field-chrome">
                  <input
                    type="number"
                    className="retro-input"
                    placeholder="Release Year"
                    {...register('release')}
                  />
                  <label className="retro-label">Release Year</label>
                </div>
                {errors.release && <span className="field-error">{errors.release.message}</span>}
              </div>

              <div className="retro-field">
                <div className="field-chrome">
                  <input
                    type="text"
                    className="retro-input"
                    placeholder="Image URL"
                    {...register('image')}
                  />
                  <label className="retro-label">Image URL</label>
                </div>
                {errors.image && <span className="field-error">{errors.image.message}</span>}
              </div>

              <div className="retro-field">
                <div className="field-chrome">
                  <input
                    type="number"
                    step="0.1"
                    className="retro-input"
                    placeholder="Rating (0-10)"
                    {...register('rating')}
                  />
                  <label className="retro-label">Rating</label>
                </div>
                {errors.rating && <span className="field-error">{errors.rating.message}</span>}
              </div>

              <div className="retro-field">
                <div className="field-chrome">
                  <textarea
                    className="retro-input retro-textarea"
                    placeholder="Movie description..."
                    rows="4"
                    {...register('bio')}
                  />
                  <label className="retro-label">Description</label>
                </div>
                {errors.bio && <span className="field-error">{errors.bio.message}</span>}
              </div>

              <button type="submit" className="retro-button" disabled={isSubmitting}>
                <span className="button-text">{isSubmitting ? 'Adding...' : 'Add to Collection'}</span>
              </button>
            </form>
          </div>
        )}

        <div className="movies-section">
          <h2 className="section-title">YOUR COLLECTION</h2>
          {isLoading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading your collection...</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="empty-state">
              <p>No movies in your collection yet.</p>
              {user && <p>Click "Add Movie" to get started!</p>}
            </div>
          ) : (
            <div className="movies-grid">
              {movies.map((movie) => (
                <div key={movie._id} className="movie-card">
                  {editingId === movie._id ? (
                    <div className="edit-mode">
                      <input
                        type="text"
                        defaultValue={movie.name}
                        id={`edit-name-${movie._id}`}
                        className="edit-input"
                        placeholder="Movie name"
                      />
                      <input
                        type="number"
                        defaultValue={movie.release}
                        id={`edit-release-${movie._id}`}
                        className="edit-input"
                        placeholder="Year"
                      />
                      <input
                        type="text"
                        defaultValue={movie.image}
                        id={`edit-image-${movie._id}`}
                        className="edit-input"
                        placeholder="Image URL"
                      />
                      <input
                        type="number"
                        step="0.1"
                        defaultValue={movie.rating}
                        id={`edit-rating-${movie._id}`}
                        className="edit-input"
                        placeholder="Rating (0-10)"
                      />
                      <textarea
                        defaultValue={movie.bio}
                        id={`edit-bio-${movie._id}`}
                        className="edit-input edit-textarea"
                        placeholder="Movie description"
                        rows="3"
                      />
                      <div className="edit-actions">
                        <button
                          className="save-btn"
                          onClick={() => {
                            const name = document.getElementById(`edit-name-${movie._id}`).value
                            const release = Number(document.getElementById(`edit-release-${movie._id}`).value)
                            const image = document.getElementById(`edit-image-${movie._id}`).value
                            const rating = Number(document.getElementById(`edit-rating-${movie._id}`).value)
                            const bio = document.getElementById(`edit-bio-${movie._id}`).value
                            updateMutation.mutate({
                              id: movie._id,
                              data: { name, release, image, rating, bio }
                            })
                          }}
                        >
                          ✓ Save
                        </button>
                        <button className="cancel-btn" onClick={() => setEditingId(null)}>
                          ✕ Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="movie-info">
                        <h3 className="movie-title">{movie.name}</h3>
                        <p className="movie-year">{movie.release}</p>
                        {movie.rating && (
                          <div className="movie-rating">
                            <span className="rating-star">★</span>
                            <span>{movie.rating}/10</span>
                          </div>
                        )}
                      </div>
                      {user && (
                        <div className="movie-actions">
                          <button className="edit-btn" onClick={() => setEditingId(movie._id)}>
                            Edit
                          </button>
                          <button className="delete-btn" onClick={() => handleDeleteMovie(movie._id, movie.name)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
