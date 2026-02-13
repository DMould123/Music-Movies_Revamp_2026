import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import SkeletonAlbumCard from './SkeletonAlbumCard'
import '../styles/albums.css'
import '../styles/retro.css'

export default function Albums() {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [durationSort, setDurationSort] = useState('none') // 'none', 'longest', 'shortest'
  const [yearSort, setYearSort] = useState('none') // 'none', 'oldest', 'newest'

  useEffect(() => {
    setIsLoading(true)
    fetch('/albums.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAlbums(data.albums)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error loading albums:', error)
        setIsLoading(false)
      })
  }, [])

  // Handles dual-dimensional sorting for albums
  // Supports independent sorting by duration (longest/shortest) and year (oldest/newest)
  const getSortedAlbums = () => {
    let sorted = [...albums]

    // Apply duration sorting: converts MM:SS format to seconds for comparison
    if (durationSort !== 'none') {
      const convertToMinutes = (timeStr) => {
        const [minutes, seconds] = timeStr.split(':').map(Number)
        return minutes * 60 + seconds
      }

      sorted.sort((a, b) => {
        const durationA = convertToMinutes(a.AlbumLength)
        const durationB = convertToMinutes(b.AlbumLength)
        
        // Descending for longest, ascending for shortest
        if (durationSort === 'longest') {
          return durationB - durationA
        } else {
          return durationA - durationB
        }
      })
    }

    // Apply year sorting: filters albums chronologically
    if (yearSort !== 'none') {
      sorted.sort((a, b) => {
        const yearA = parseInt(a.AlbumReleaseYear)
        const yearB = parseInt(b.AlbumReleaseYear)
        
        // Ascending for oldest-to-newest, descending for newest-to-oldest
        if (yearSort === 'oldest') {
          return yearA - yearB
        } else {
          return yearB - yearA
        }
      })
    }

    return sorted
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true
        }
      }
    ]
  }
  return (
    <div className="albums-wrapper">
      <div className="retro-background">
        <div className="y2k-grid"></div>
        <div className="grid-dots"></div>
      </div>

      <div className="albums-header">
        <h1 className="albums-title">VINYL VAULT</h1>
        <p className="albums-subtitle">Classic Albums Collection</p>
      </div>

      <div className="albums-filter-buttons">
        <button 
          className={`filter-btn ${durationSort === 'none' && yearSort === 'none' ? 'active' : ''}`}
          onClick={() => {setDurationSort('none'); setYearSort('none')}}
        >
          All Albums
        </button>
        <button 
          className={`filter-btn ${durationSort === 'longest' ? 'active' : ''}`}
          onClick={() => {setDurationSort('longest'); setYearSort('none')}}
        >
          Longest
        </button>
        <button 
          className={`filter-btn ${durationSort === 'shortest' ? 'active' : ''}`}
          onClick={() => {setDurationSort('shortest'); setYearSort('none')}}
        >
          Shortest
        </button>
        <button 
          className={`filter-btn ${yearSort === 'oldest' ? 'active' : ''}`}
          onClick={() => {setYearSort('oldest'); setDurationSort('none')}}
        >
          Oldest
        </button>
        <button 
          className={`filter-btn ${yearSort === 'newest' ? 'active' : ''}`}
          onClick={() => {setYearSort('newest'); setDurationSort('none')}}
        >
          Newest
        </button>
      </div>

      <div className="albums-slider-container">
        <Slider {...settings}>
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <SkeletonAlbumCard key={i} />
            ))
          ) : getSortedAlbums().length > 0 ? (
            getSortedAlbums().map((album) => (
            <div className="album-card-y2k" key={album.AlbumId}>
              <Card className="album-card-inner">
                <div className="album-image-container">
                  <Card.Img
                    src={album.AlbumArtwork}
                    className="album-card-image"
                    alt={album.AlbumTitle}
                  />
                </div>
                <Card.Body className="album-card-body">
                  <Card.Title className="album-card-title">
                    <b>{album.AlbumArtist}</b> - {album.AlbumTitle}
                  </Card.Title>
                  <div className="album-info-row">
                    <p className="album-release-year">📅 {album.AlbumReleaseYear}</p>
                    <p className="album-length">⏱ {album.AlbumLength}</p>
                  </div>
                  <Popup
                    trigger={<button className="album-details-btn">Album Details</button>}
                    position="center center"
                    modal
                  >
                    <div>
                      <p>
                        <b>Release Year:</b> {album.AlbumReleaseYear}
                      </p>
                      <p>
                        <b>Length:</b> {album.AlbumLength}
                      </p>
                      <p><b>Tracklisting:</b></p>
                      <ol>
                        {album.AlbumTracklisting.map((track, index) => (
                          <li key={index}>{track}</li>
                        ))}
                      </ol>
                    </div>
                  </Popup>
                </Card.Body>
              </Card>
            </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)', padding: '40px' }}>
              <p>No albums available</p>
            </div>
          )}
        </Slider>
      </div>
    </div>
  )
}