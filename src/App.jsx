import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import PropertyDetails from './components/PropertyDetails';
import ContactAgent from "./components/ContactAgent.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="contact" element={<ContactAgent />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;