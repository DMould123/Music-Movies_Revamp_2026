import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import '../styles/albums.css'
import '../styles/retro.css'

export default function Albums() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    fetch('/albums.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAlbums(data.albums)
      })
  }, [])
  const settings = {
    dots: true,
    infinite: false,
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
          initialSlide: 0
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
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

      <div className="albums-slider-container">
        <Slider {...settings}>
          {albums.map((album) => (
            <div className="album-card-y2k" key={album.AlbumId}>
              <Card className="album-card-inner">
                <div className="album-image-container">
                  <Card.Img
                    src={'/images/' + album.AlbumArtwork}
                    className="album-card-image"
                    alt={album.AlbumTitle}
                  />
                </div>
                <Card.Body className="album-card-body">
                  <Card.Title className="album-card-title">
                    <b>{album.AlbumArtist}</b> - {album.AlbumTitle}
                  </Card.Title>
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
          ))}
        </Slider>
      </div>
    </div>
  )
}
