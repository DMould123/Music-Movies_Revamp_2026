import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import api from '../api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import SkeletonCard from './SkeletonCard'
import '../styles/home.css'
import '../styles/retro.css'

function Home(props) {
  const sliderRef = React.useRef(null)
  const [name, setName] = useState('')
  const [sortOrder, setSortOrder] = useState('default')
  const {
    data: moviesData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await api.get('/api/movies')
      return res.data
    }
  })
  const [movies, setMovies] = useState([])

  React.useEffect(() => {
    if (!moviesData) return
    setMovies(moviesData)
  }, [moviesData])

  const applyFiltersAndSort = (data, keyword, sort) => {
    let results = data || []

    const normalizeForSearch = (value) => {
      if (!value) return ''
      const normalized = value.trim().toLowerCase()
      return normalized.startsWith('the ') ? normalized.replace(/^the\s+/, '') : normalized
    }

    // Apply search filter (ignore leading "the")
    if (keyword !== '') {
      const searchTerm = normalizeForSearch(keyword)
      results = results.filter((movie) => {
        const title = normalizeForSearch(movie.name)
        return title.startsWith(searchTerm)
      })
    }

    // Apply sort
    if (sort === 'oldest') {
      results = [...results].sort((a, b) => a.release - b.release)
    } else if (sort === 'newest') {
      results = [...results].sort((a, b) => b.release - a.release)
    } else if (sort === 'highest-rating') {
      results = [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (sort === 'lowest-rating') {
      results = [...results].sort((a, b) => (a.rating || 0) - (b.rating || 0))
    }

    return results
  }

  const filter = (e) => {
    const keyword = e.target.value
    setName(keyword)
    const filtered = applyFiltersAndSort(moviesData, keyword, sortOrder)
    setMovies(filtered)
    // Reset slider to first slide
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0)
    }
  }

  const handleSort = (e) => {
    // Reset slider to first slide
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0)
    }
    const newSort = e.target.value
    setSortOrder(newSort)
    const filtered = applyFiltersAndSort(moviesData, name, newSort)
    setMovies(filtered)
  }

  const { user } = useContext(UserContext)
  const queryClient = useQueryClient()
  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await api.get('/api/favorites')
      return res.data
    },
    enabled: !!user
  })

  const favoriteIds = new Set(favorites.map((m) => m._id))

  const toggleFavorite = useMutation({
    mutationFn: async (movieId) => {
      await api.post(`/api/favorites/${movieId}/toggle`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] })
  })

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className="home-wrapper">
      <div className="retro-background">
        <div className="y2k-grid"></div>
        <div className="grid-dots"></div>
      </div>

      <div className="home-header">
        <h1 className="home-title">NOW SHOWING</h1>
        <p className="home-subtitle">Your Cinematic Journey Starts Here</p>
      </div>

      <div className="search-container">
        <input
          type="search"
          value={name}
          onChange={filter}
          className="movie-search-input"
          placeholder="🔍 Search Movies..."
        />
        <select 
          value={sortOrder} 
          onChange={handleSort}
          className="sort-select"
        >
          <option value="default">Default Order</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="newest">Newest to Oldest</option>
          <option value="highest-rating">Highest Rating</option>
          <option value="lowest-rating">Lowest Rating</option>
        </select>
      </div>

      {isLoading ? (
        <div className="movies-slider-container">
          <Slider {...settings}>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </Slider>
        </div>
      ) : isError ? (
        <div className="error-message">Failed to load movies. Please try again.</div>
      ) : (
        <div className="movies-slider-container">
          <Slider {...settings}>
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <div className="movie-card-wrapper" key={movie._id}>
                  <div className="movie-card-y2k">
                    <div className="movie-card-image-container">
                      <img
                        src={movie.image}
                        className="movie-card-image"
                        alt={movie.name}
                      />
                      {user && (
                        <button
                          aria-label="Toggle Favorite"
                          onClick={() => toggleFavorite.mutate(movie._id)}
                          className={`favorite-btn-y2k ${favoriteIds.has(movie._id) ? 'is-favorite' : ''}`}
                          title={favoriteIds.has(movie._id) ? 'Unfavorite' : 'Favorite'}
                        >
                          ★
                        </button>
                      )}
                    </div>
                    <div className="movie-card-content">
                      <h3 className="movie-card-title">{movie.name}</h3>
                      <div className="movie-card-info">
                        <span className="movie-card-year">{movie.release}</span>
                        {movie.runtime && (
                          <span className="movie-card-runtime">⏱ {movie.runtime}</span>
                        )}
                        {movie.rating && (
                          <div className="movie-card-rating">
                            <span className="rating-star">★</span>
                            <span>{movie.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="movie-card-bio">{movie.bio}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No Movies Found!</div>
            )}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default Home
