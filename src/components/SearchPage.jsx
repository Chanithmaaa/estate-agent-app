import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash, X, SearchX } from "lucide-react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Drawer,
} from "@mui/material";

// --- 1. IMPORT DATEPICKER ---
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './SearchPage.css';

const SearchPage = () => {
  const [filters, setFilters] = useState({
    propertyType: "Any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    // --- 2. CHANGE INITIAL STATE TO NULL FOR DATES ---
    addedMonth: null,
    addedYear: null,
    postcode: "",
  });

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // DRAG STATES
  const [isDraggingToAdd, setIsDraggingToAdd] = useState(false); 
  const [isDraggingToRemove, setIsDraggingToRemove] = useState(false); 
  
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // --- 3. CONVERT DATE OBJECTS TO STRINGS FOR FILTERING ---
    // If a year is selected in picker, get full year (e.g., "2022"). Else empty string.
    const filterYearString = filters.addedYear ? filters.addedYear.getFullYear().toString() : "";
    
    // If a month is selected, get full month name (e.g., "January"). Else empty string.
    const filterMonthString = filters.addedMonth ? filters.addedMonth.toLocaleString('default', { month: 'long' }) : "";

    const filtered = properties.filter((property) => {
      const matchesType = filters.propertyType === "Any" || property.type.toLowerCase() === filters.propertyType.toLowerCase();
      const matchesMinPrice = !filters.minPrice || property.price >= parseInt(filters.minPrice, 10);
      const matchesMaxPrice = !filters.maxPrice || property.price <= parseInt(filters.maxPrice, 10);
      const matchesMinBedrooms = !filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms, 10);
      const matchesMaxBedrooms = !filters.maxBedrooms || property.bedrooms <= parseInt(filters.maxBedrooms, 10);
      
      // --- 4. UPDATED FILTER LOGIC FOR DATES ---
      // Check if property month includes the selected month string
      const matchesAddedMonth = !filterMonthString || (property.added && property.added.month.toLowerCase().includes(filterMonthString.toLowerCase()));
      // Check if property year matches the selected year string
      const matchesAddedYear = !filterYearString || (property.added && property.added.year.toString() === filterYearString);
      
      const matchesPostcode = !filters.postcode || property.location.toLowerCase().includes(filters.postcode.toLowerCase());

      return matchesType && matchesMinPrice && matchesMaxPrice && matchesMinBedrooms && matchesMaxBedrooms && matchesAddedMonth && matchesAddedYear && matchesPostcode;
    });
    setFilteredProperties(filtered);
  };

  const addToFavourites = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
      setIsDrawerOpen(true);
    }
  };

  const removeFavourite = (propertyId) => {
    setFavourites(favourites.filter((fav) => fav.id !== propertyId));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  // --- DRAG HANDLERS ---
  const handleDragStartAdd = (e, property) => {
    e.dataTransfer.setData("propertyToAdd", JSON.stringify(property));
    setIsDraggingToAdd(true);
  };

  const handleDragStartRemove = (e, propertyId) => {
    e.dataTransfer.setData("propertyIdToRemove", propertyId);
    setIsDraggingToRemove(true);
  };

  const handleDragEnd = () => {
    setIsDraggingToAdd(false);
    setIsDraggingToRemove(false);
  };

  const handleDropAdd = (e) => {
    e.preventDefault();
    setIsDraggingToAdd(false);
    const propertyData = e.dataTransfer.getData("propertyToAdd");
    if (propertyData) {
      const property = JSON.parse(propertyData);
      addToFavourites(property);
    }
  };

  const handleDropRemove = (e) => {
    e.preventDefault();
    setIsDraggingToRemove(false);
    const propertyId = e.dataTransfer.getData("propertyIdToRemove");
    if (propertyId) {
      removeFavourite(propertyId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="search-page-container">
      
      {/* HEADER */}
      <div className="page-header">
        <Typography variant="h4" className="page-title">
          Search Your Dream Home
        </Typography>
        
        {/* DROP TARGET FOR ADDING */}
        <Button 
          variant="contained" 
          onClick={() => setIsDrawerOpen(true)}
          className={`fav-toggle-btn ${isDraggingToAdd ? "drop-target-active" : ""}`}
          startIcon={<Heart fill="white" size={18} />}
          onDrop={handleDropAdd}
          onDragOver={handleDragOver}
        >
          {isDraggingToAdd ? "Drop Here to Save!" : `My Favorites (${favourites.length})`}
        </Button>
      </div>
      
      {/* SEARCH FORM */}
      <form onSubmit={handleSearch} className="search-form-container">
        <div className="form-grid-3-columns">
          <TextField label="Property Type" name="propertyType" value={filters.propertyType} onChange={handleInputChange} select fullWidth size="small" className="search-input">
            <MenuItem value="Any">Any</MenuItem>
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Flat">Flat</MenuItem>
          </TextField>
          <TextField label="Min Price (Rs. M)" name="minPrice" type="number" value={filters.minPrice} onChange={handleInputChange} size="small" className="search-input" />
          <TextField label="Max Price (Rs. M)" name="maxPrice" type="number" value={filters.maxPrice} onChange={handleInputChange} size="small" className="search-input" />
          <TextField label="Min Bedrooms" name="minBedrooms" type="number" value={filters.minBedrooms} onChange={handleInputChange} size="small" className="search-input" />
          <TextField label="Max Bedrooms" name="maxBedrooms" type="number" value={filters.maxBedrooms} onChange={handleInputChange} size="small" className="search-input" />
          
          {/* --- 5. REPLACED MONTH TEXTFIELD WITH DATEPICKER --- */}
          <div className="custom-datepicker-wrapper">
             <DatePicker
                selected={filters.addedMonth}
                onChange={(date) => setFilters({ ...filters, addedMonth: date })}
                showMonthYearPicker
                dateFormat="MMMM"
                placeholderText="Select Month"
                className="green-datepicker"
             />
          </div>

          {/* --- 6. REPLACED YEAR TEXTFIELD WITH DATEPICKER --- */}
          <div className="custom-datepicker-wrapper">
             <DatePicker
                selected={filters.addedYear}
                onChange={(date) => setFilters({ ...filters, addedYear: date })}
                showYearPicker
                dateFormat="yyyy"
                placeholderText="Select Year"
                className="green-datepicker"
             />
          </div>

          <TextField label="Location" name="postcode" value={filters.postcode} onChange={handleInputChange} size="small" className="search-input" />
          <Button type="submit" variant="contained" className="search-button">SEARCH</Button>
        </div>
      </form>

      {/* --- SEARCH RESULTS --- */}
      {filteredProperties.length === 0 ? (
        // --- NO PROPERTIES FOUND MESSAGE ---
        <div className="no-results-container">
          <SearchX size={64} color="#ccc" />
          <Typography variant="h5" style={{ marginTop: '15px', color: '#555', fontWeight: 'bold' }}>
            No Properties Found
          </Typography>
          <Typography variant="body1" style={{ color: '#888' }}>
            We couldn't find any matches for your search. Try adjusting your filters.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => {
              setFilters({
                propertyType: "Any",
                minPrice: "",
                maxPrice: "",
                minBedrooms: "",
                maxBedrooms: "",
                addedMonth: null, // Reset to null
                addedYear: null,  // Reset to null
                postcode: "",
              });
              setFilteredProperties(properties); 
            }}
            style={{ marginTop: '20px', borderColor: '#2E8B57', color: '#2E8B57' }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        // --- GRID OF PROPERTIES ---
        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <div 
              key={property.id}
              draggable 
              onDragStart={(e) => handleDragStartAdd(e, property)}
              onDragEnd={handleDragEnd}
              style={{ height: '100%', cursor: 'grab' }}
            >
              <Card className="property-card">
                <div className="card-image-container">
                    <CardMedia component="img" image={property.picture} alt="Property" />
                </div>
                
                <CardContent>
                  <Typography variant="h6" className="card-price">Rs. {property.price.toLocaleString()}M</Typography>
                  <Typography variant="body2" className="card-location">{property.location}</Typography>
                  <Typography variant="body2" className="card-desc">{property.short}</Typography>
                  
                  <div className="card-actions">
                    <IconButton onClick={() => addToFavourites(property)} 
                      sx={{ color: favourites.some((f) => f.id === property.id) ? "red" : "gray" }}>
                      <Heart size={20} fill={favourites.some((f) => f.id === property.id) ? "red" : "none"} />
                    </IconButton>
                    
                    <Button component={Link} to={`/property/${property.id}`} variant="outlined" className="view-btn">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* --- FAVORITES SIDEBAR (DRAWER) --- */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="favorites-drawer">
          <div className="drawer-header">
            <Typography variant="h6" fontWeight="bold">Saved Properties</Typography>
            <div style={{ display: 'flex', gap: '10px' }}>
              {favourites.length > 0 && (
                <Button onClick={clearFavourites} color="error" size="small">Clear</Button>
              )}
              <IconButton onClick={() => setIsDrawerOpen(false)}>
                <X />
              </IconButton>
            </div>
          </div>

          {isDraggingToRemove && (
             <div 
               className="trash-zone"
               onDrop={handleDropRemove}
               onDragOver={handleDragOver}
             >
               <Trash size={32} />
               <p>Drop here to Remove</p>
             </div>
          )}
          
          <div className="drawer-content">
            {favourites.length === 0 ? (
              <Typography className="empty-msg">
                Drag properties to the "My Favorites" button to save them!
              </Typography>
            ) : (
              favourites.map(fav => (
                <div 
                  key={fav.id} 
                  className="fav-item"
                  draggable 
                  onDragStart={(e) => handleDragStartRemove(e, fav.id)}
                  onDragEnd={handleDragEnd}
                >
                  <img src={fav.picture} alt="" />
                  <div className="fav-info">
                    <Typography variant="subtitle2" fontWeight="bold">Rs. {fav.price.toLocaleString()}M</Typography>
                    <Typography variant="caption">{fav.type}</Typography>
                    <div className="fav-actions">
                      <Link to={`/property/${fav.id}`} className="fav-link">View</Link>
                      <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => removeFavourite(fav.id)}
                          aria-label="remove"
                        >
                        <Trash size={16} />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SearchPage;