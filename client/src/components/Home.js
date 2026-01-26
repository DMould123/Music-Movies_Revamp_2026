import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import SkeletonCard from './SkeletonCard'

function Home(props) {
  const [name, setName] = useState('')
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

  const filter = (e) => {
    const keyword = e.target.value

    if (keyword !== '') {
      const results = (moviesData || []).filter((movie) => {
        return (
          movie.name &&
          movie.name.toLowerCase().startsWith(keyword.toLowerCase())
        )
      })
      setMovies(results)
    } else {
      setMovies(moviesData || [])
    }

    setName(keyword)
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
    <>
      <div className="Home" style={{ textAlign: 'center' }}>
        <input
          type="search"
          value={name}
          onChange={filter}
          className="movie-input"
          placeholder="Search"
          style={{ fontWeight: 'bold', color: 'black' }}
        />
        {isLoading ? (
          <Slider {...settings} className="Books_container--inner">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </Slider>
        ) : isError ? (
          <div style={{ color: 'red' }}>Failed to load movies.</div>
        ) : (
          <Slider {...settings} className="Books_container--inner">
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <div className="cardClass" key={movie._id}>
                  <img
                    src={movie.image}
                    className="card-image"
                    style={{ width: 300 }}
                    alt=""
                  />
                  <div className="card-body">
                    <h3 className="card-title">{movie.name}</h3>
                    {user && (
                      <button
                        aria-label="Toggle Favorite"
                        onClick={() => toggleFavorite.mutate(movie._id)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          fontSize: 24,
                          cursor: 'pointer',
                          color: favoriteIds.has(movie._id) ? 'gold' : '#aaa',
                          float: 'right'
                        }}
                        title={favoriteIds.has(movie._id) ? 'Unfavorite' : 'Favorite'}
                      >
                        ★
                      </button>
                    )}
                    <p>
                      <small>
                        <b>Release Year: </b> {movie.release}
                      </small>
                    </p>
                    <p>
                      <small>
                        <b>IMDb Rating: </b> {movie.rating}
                      </small>
                    </p>
                    <p className="card-bio">
                      <small>
                        <b>Movie Bio: </b> {movie.bio}
                      </small>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No results found!</h1>
            )}
          </Slider>
        )}
      </div>
    </>
  )
}

export default Home
