import React from 'react'

const SkeletonCard = () => (
  <div className="skeleton-card-wrapper">
    <div
      className="skeleton-card-image"
      style={{
        width: '100%',
        height: 350,
        background: 'linear-gradient(90deg, rgba(220, 20, 60, 0.2) 0%, rgba(255, 215, 0, 0.3) 50%, rgba(220, 20, 60, 0.2) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s infinite, pulse-glow 1.5s ease-in-out infinite',
        borderRadius: '8px 8px 0 0'
      }}
    />
    <div className="skeleton-card-body">
      <div style={{ 
        height: 24, 
        background: 'linear-gradient(90deg, rgba(220, 20, 60, 0.15) 0%, rgba(255, 215, 0, 0.25) 50%, rgba(220, 20, 60, 0.15) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s infinite, pulse-glow 1.5s ease-in-out infinite',
        marginBottom: 12,
        borderRadius: 4,
        width: '85%'
      }} />
      <div style={{ 
        height: 16, 
        background: 'linear-gradient(90deg, rgba(220, 20, 60, 0.15) 0%, rgba(255, 215, 0, 0.25) 50%, rgba(220, 20, 60, 0.15) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s infinite, pulse-glow 1.5s ease-in-out infinite',
        marginBottom: 8,
        borderRadius: 4,
        width: '70%'
      }} />
      <div style={{ 
        height: 14, 
        background: 'linear-gradient(90deg, rgba(220, 20, 60, 0.15) 0%, rgba(255, 215, 0, 0.25) 50%, rgba(220, 20, 60, 0.15) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s infinite, pulse-glow 1.5s ease-in-out infinite',
        borderRadius: 4,
        width: '45%'
      }} />
    </div>
    <style>
      {`
        .skeleton-card-wrapper {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 8px;
          animation: smooth-fade-in 0.3s ease-in;
        }

        .skeleton-card-body {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: rgba(255, 255, 255, 0.02);
        }

        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 8px rgba(255, 215, 0, 0.1);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 16px rgba(255, 215, 0, 0.3);
          }
        }

        @keyframes smooth-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
    </style>
  </div>
)

export default SkeletonCard
