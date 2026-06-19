import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const activeClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link active' : 'nav-link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner container">
        <NavLink to="/" className="site-logo">
          BusinessKit
        </NavLink>

        <button
          className="hamburger"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav${menuOpen ? ' open' : ''}`}>
          <NavLink to="/" end className={activeClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/services" className={activeClass} onClick={() => setMenuOpen(false)}>
            Services
          </NavLink>
          <NavLink to="/gallery" className={activeClass} onClick={() => setMenuOpen(false)}>
            Gallery
          </NavLink>
          <NavLink to="/blog" className={activeClass} onClick={() => setMenuOpen(false)}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={activeClass} onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/booking" className="btn-book" onClick={() => setMenuOpen(false)}>
            Book Now
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
