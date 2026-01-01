import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import './Navbar.css';

// IMPORT YOUR LOGO HERE
// If your image is in src/assets/, keep this line:
// We use "../" to go up one folder, then into assets
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* --- LOGO SECTION --- */}
        <Link to="/" className="logo">
          {/* Image */}
          <img src={logoImg} alt="DreamEstates" className="logo-image" />
          
          {/* Text */}
          <span className="logo-text">DreamEstates</span> 
        </Link>
        
        {/* --- NAVIGATION ITEMS --- */}
        <div className={`nav-items ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>Home</span>
          </Link>
          
          <Link to="/search" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            <Search size={18} />
            <span>Browse</span>
          </Link>
          
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>Contact Us</span>
          </Link>
        
          {/* Add more links here if needed */}
        </div>
        
        {/* --- MOBILE MENU BUTTON --- */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;