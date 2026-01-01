import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import DemoWarning from './DemoWarning'; // <--- 1. Import the file
import './Layout.css';

const Layout = () => {
  const [showWarning, setShowWarning] = useState(true);

  // 2. Function to hide the warning when clicked
  const handleCloseWarning = () => {
    setShowWarning(false);
  };

  return (
    <div className="app-container">
      {/* 3. Show the warning ONLY if showWarning is true */}
      {showWarning && <DemoWarning onClose={handleCloseWarning} />}
      
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} DreamEstates. All rights reserved.</p>
        <p>Created by CHANI.</p>
      </footer>
    </div>
  );
};

export default Layout;