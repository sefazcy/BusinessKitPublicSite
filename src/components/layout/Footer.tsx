import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <span className="footer-logo">BusinessKit</span>
          <p className="footer-tagline">Professional services, delivered with care.</p>
        </div>

        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/booking">Book Now</Link>
        </nav>

        <div className="footer-copy">
          &copy; {year} BusinessKit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
