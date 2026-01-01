import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          
          {/* 1. Title: Slightly bigger (3rem) now that the text is shorter */}
          <h1 style={{ fontSize: '3.5rem' }}>
            Find Your <span>Dream Home</span>
          </h1>
          
          <p style={{ fontSize: '1.1rem' }}>
            Browse our exclusive collection of modern properties. 
            Your next chapter starts here.
          </p>
          
          <div className="hero-buttons">
            <Link to="/search" className="primary-btn">Browse Properties</Link>
            <Link to="/contact" className="secondary-btn">Contact Agent</Link>
          </div>
          
        </div>
        <div className="hero-image">
          {/* 2. FIXED IMAGE: I replaced the broken local file with a working web link */}
          <img 
            src="HomePagePic.jpg" 
            alt="Modern Luxury Home" 
          />
        </div>
      </section>
      
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Quality</h3>
            <p>Every property is hand-picked and verified for excellence.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast Process</h3>
            <p>Move in faster with our streamlined digital paperwork.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Trusted Partners</h3>
            <p>Rated #1 for customer satisfaction and transparent advice.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;