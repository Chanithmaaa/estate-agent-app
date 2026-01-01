import React from 'react';
import { Link } from 'react-router-dom';
import './ContactAgent.css';

const ContactAgent = () => {
  return (
    <div className="contact-container">
      <h1>Contact Our Agents</h1>
      <p className="contact-subtitle">Reach out to our expert real estate professionals</p>
      
      <div className="contact-cards">
        <div className="agent-card">
          <div className="agent-image">
            <img src="agent1.jpg" alt="Agent Sarah" />
          </div>
          <div className="agent-info">
            <h3>Safrina Vanhof</h3>
            <p className="agent-title">Senior Property Consultant</p>
            <p className="agent-contact">
              <span>📞</span> +94 78 123 4567
            </p>
            <p className="agent-contact">
              <span>✉️</span> safrina@dreamestate.com
            </p>
          </div>
        </div>

        <div className="agent-card">
          <div className="agent-image">
            <img src="agent2.jpg" alt="Agent Michael" />
          </div>
          <div className="agent-info">
            <h3>Joel Smith</h3>
            <p className="agent-title">Luxury Home Specialist</p>
            <p className="agent-contact">
              <span>📞</span> +94 71 987 6543
            </p>
            <p className="agent-contact">
              <span>✉️</span> joel@dreamestate.com
            </p>
          </div>
        </div>
      </div>

      <div className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" rows="5" placeholder="How can we help you?"></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactAgent;

