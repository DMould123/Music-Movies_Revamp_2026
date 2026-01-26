import React from 'react'

const SkeletonCard = () => (
  <div className="cardClass" style={{ opacity: 0.6 }}>
    <div
      className="card-image"
      style={{
        width: 300,
        height: 400,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'loading 1.5s infinite'
      }}
    />
    <div className="card-body">
      <div style={{ height: 24, background: '#e0e0e0', marginBottom: 8, borderRadius: 4 }} />
      <div style={{ height: 16, background: '#f0f0f0', marginBottom: 4, borderRadius: 4, width: '60%' }} />
      <div style={{ height: 16, background: '#f0f0f0', borderRadius: 4, width: '40%' }} />
    </div>
    <style>
      {`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}
    </style>
  </div>
)

export default SkeletonCard
