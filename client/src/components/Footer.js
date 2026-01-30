import React from 'react'
import { FaLinkedin, FaTwitter, FaGithub, FaXTwitter } from 'react-icons/fa6'
import '../styles/footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-y2k">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">CONNECT WITH US</h3>
          <p className="footer-text">Join the cinematic revolution</p>
        </div>

        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/david-mould-b6731a21a/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link linkedin"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/dm12_51?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link x-twitter"
            title="X (formerly Twitter)"
            aria-label="X"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com/DMould123"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link github"
            title="GitHub"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link x-twitter"
            title="X (formerly Twitter)"
            aria-label="X"
          >
            <FaXTwitter />
          </a>
        </div>

        <div className="footer-bottom">
          <p className="footer-credit">
            © {currentYear} <span className="brand-name">Music & Movies Revamp</span>. All rights reserved.
          </p>
        </div>
      </div>

      <div className="footer-border"></div>
    </footer>
  )
}

export default Footer
