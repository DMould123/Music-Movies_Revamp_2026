import React from 'react'
import '../styles/albums.css'

const SkeletonAlbumCard = () => (
  <div className="album-card-y2k">
    <div className="album-card-inner skeleton-album">
      <div className="album-image-container">
        <div 
          className="skeleton-image"
          style={{
            width: '100%',
            paddingTop: '100%',
            background: 'linear-gradient(90deg, rgba(255, 215, 0, 0.1) 25%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 215, 0, 0.1) 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-loading 1.5s infinite',
            borderRadius: '12px'
          }}
        />
      </div>
      <div className="album-card-body">
        <div 
          className="skeleton-text skeleton-title"
          style={{
            height: '20px',
            background: 'linear-gradient(90deg, rgba(255, 215, 0, 0.1) 25%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 215, 0, 0.1) 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-loading 1.5s infinite',
            borderRadius: '4px',
            marginBottom: '12px'
          }}
        />
        <div 
          className="skeleton-text skeleton-button"
          style={{
            height: '36px',
            background: 'linear-gradient(90deg, rgba(255, 215, 0, 0.1) 25%, rgba(255, 215, 0, 0.2) 50%, rgba(255, 215, 0, 0.1) 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-loading 1.5s infinite',
            borderRadius: '25px'
          }}
        />
      </div>
      <style>
        {`
          @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          
          .skeleton-album {
            opacity: 0.6;
          }
        `}
      </style>
    </div>
  </div>
)

export default SkeletonAlbumCard
