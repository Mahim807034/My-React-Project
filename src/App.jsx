import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import TourPackages from './pages/TourPackages';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Login';
import SearchResults from './components/SearchResults';
import DestinationDetails from './pages/DestinationDetails';
import PackageDetails from './pages/PackageDetails';
import Cart from './pages/Cart';
import tourismData from './data/tourismData.json';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference for dark mode
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user was previously logged in
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [cartItems, setCartItems] = useState([]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('tourCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
        localStorage.removeItem('tourCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    try {
      localStorage.setItem('tourCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Save login status
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchResults(true);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    // You can store user data if needed
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]);
    localStorage.removeItem('tourCart');
    localStorage.removeItem('userData');
    localStorage.setItem('isLoggedIn', 'false');
  };

  const addToCart = (packageItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.packageId === packageItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.packageId === packageItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const destination = tourismData.destinations.find(d => d.id === packageItem.destinationId);
        const newItem = {
          id: Date.now() + Math.random(), // Unique ID
          packageId: packageItem.id,
          name: packageItem.name,
          price: packageItem.price,
          quantity: 1,
          duration: packageItem.duration,
          image: packageItem.image,
          destination: destination?.name || 'Unknown Destination',
          inclusions: packageItem.inclusions || []
        };
        return [...prev, newItem];
      }
    });
    
    // Show success notification
    alert(`✅ "${packageItem.name}" added to cart!`);
  };

  const updateCartItemQuantity = (itemId, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  const removeCartItem = (itemId) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.id !== itemId);
      return newCart;
    });
  };

  const clearCart = () => {
    if (cartItems.length > 0) {
      if (window.confirm('Are you sure you want to clear your cart?')) {
        setCartItems([]);
      }
    }
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          onLoginClick={() => setShowLogin(true)}
          onSearch={handleSearch}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          siteInfo={tourismData.siteInfo}
          cartItemsCount={cartItemsCount}
        />
        
        {/* Main Content with proper spacing */}
        <main className="min-h-screen pt-16">
          {showSearchResults && (
            <SearchResults 
              query={searchQuery}
              darkMode={darkMode}
              onClose={() => setShowSearchResults(false)}
              data={tourismData}
            />
          )}

          {showLogin && (
            <Login 
              darkMode={darkMode}
              onClose={() => setShowLogin(false)}
              onLogin={handleLogin}
            />
          )}

          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  darkMode={darkMode} 
                  data={tourismData} 
                />
              } 
            />
            
            <Route 
              path="/destinations" 
              element={
                <Destinations 
                  darkMode={darkMode} 
                  data={tourismData} 
                />
              } 
            />
            
            <Route 
              path="/packages" 
              element={
                <TourPackages 
                  darkMode={darkMode} 
                  data={tourismData} 
                  addToCart={addToCart} 
                />
              } 
            />
            
            <Route 
              path="/gallery" 
              element={
                <Gallery 
                  darkMode={darkMode} 
                  data={tourismData} 
                />
              } 
            />
            
            <Route 
              path="/about" 
              element={
                <About 
                  darkMode={darkMode} 
                  data={tourismData} 
                />
              } 
            />
            
            <Route 
              path="/contact" 
              element={
                <Contact 
                  darkMode={darkMode} 
                  data={tourismData} 
                />
              } 
            />
            
            <Route 
              path="/destination/:id" 
              element={
                <DestinationDetails 
                  darkMode={darkMode} 
                  data={tourismData} 
                  addToCart={addToCart} 
                />
              } 
            />
            
            <Route 
              path="/package/:id" 
              element={
                <PackageDetails 
                  darkMode={darkMode} 
                  data={tourismData} 
                  addToCart={addToCart} 
                />
              } 
            />
            
            <Route 
              path="/cart" 
              element={
                <Cart 
                  darkMode={darkMode} 
                  data={tourismData} 
                  cartItems={cartItems} 
                  updateCartItemQuantity={updateCartItemQuantity}
                  removeCartItem={removeCartItem}
                  clearCart={clearCart}
                />
              } 
            />
            
            {/* 404 Page - Catch all route */}
            <Route 
              path="*" 
              element={
                <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
                  <div className="text-center">
                    <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      404 - Page Not Found
                    </h1>
                    <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      The page you're looking for doesn't exist.
                    </p>
                    <a
                      href="/"
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        darkMode 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      Go Back Home
                    </a>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className={`border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {tourismData.siteInfo.name}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {tourismData.siteInfo.slogan}
                </p>
              </div>
              <div className="flex space-x-4">
                <a href="/about" className={`text-sm hover:underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                  About
                </a>
                <a href="/contact" className={`text-sm hover:underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                  Contact
                </a>
                <a href="/packages" className={`text-sm hover:underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}>
                  Packages
                </a>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t text-center">
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                © 2024 {tourismData.siteInfo.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;