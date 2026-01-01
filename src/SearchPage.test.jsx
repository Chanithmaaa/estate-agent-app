import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './components/SearchPage';

// Helper to render component with Router (needed because you use Link)
const renderSearchPage = () => {
  render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
};

// --- TEST 1: Check if the Main Title Renders ---
test('renders the main search page title', () => {
  renderSearchPage();
  const titleElement = screen.getByText(/Search Your Dream Home/i);
  expect(titleElement).toBeInTheDocument();
});

// --- TEST 2: Check if Filter Inputs are present ---
test('renders critical filter inputs (Price and Bedrooms)', () => {
  renderSearchPage();
  // Check for Min Price input
  const minPriceInput = screen.getByLabelText(/Min Price/i);
  expect(minPriceInput).toBeInTheDocument();
  
  // Check for Max Bedrooms input
  const maxBedInput = screen.getByLabelText(/Max Bedrooms/i);
  expect(maxBedInput).toBeInTheDocument();
});

// --- TEST 3: Check if React DatePicker Widgets are rendering ---
test('renders the DatePicker widgets for Month and Year', () => {
  renderSearchPage();
  // We search by placeholder text we defined in the DatePicker component
  const monthPicker = screen.getByPlaceholderText(/Select Month/i);
  const yearPicker = screen.getByPlaceholderText(/Select Year/i);
  
  expect(monthPicker).toBeInTheDocument();
  expect(yearPicker).toBeInTheDocument();
});

// --- TEST 4: Check if Favourites Button starts at 0 ---
test('renders favorites button with initial count of 0', () => {
  renderSearchPage();
  // Regex looks for "My Favorites (0)"
  const favButton = screen.getByText(/My Favorites \(0\)/i);
  expect(favButton).toBeInTheDocument();
});

// --- TEST 5: Check if the Search Button exists ---
test('renders the Search submit button', () => {
  renderSearchPage();
  // Look for the button with name "SEARCH"
  const searchButton = screen.getByRole('button', { name: /SEARCH/i });
  expect(searchButton).toBeInTheDocument();
});