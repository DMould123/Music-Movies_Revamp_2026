import React from 'react'
import '../styles/skeleton.css'

const SkeletonMovieCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-body">
        <div className="skeleton-title"></div>
      </div>
    </div>
  )
}

export default SkeletonMovieCard
