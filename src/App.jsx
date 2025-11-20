import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import TourPackages from './pages/TourPackages';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Login';
import SearchResults from './components/SearchResults';
import DestinationDetails from './pages/DestinationDetails';
import PackageDetails from './pages/PackageDetails';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import BookingHistory from './pages/BookingHistory';
import tourismData from './data/tourismData.json';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('tourBookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load cart from localStorage
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

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tourCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Save bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tourBookings', JSON.stringify(bookings));
    } catch (error) {
      console.error('Error saving bookings to localStorage:', error);
    }
  }, [bookings]);

  // Save login status and user data
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [isLoggedIn, userData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchResults(true);
  };

  const handleLogin = (userData) => {
    const userProfile = {
      ...userData,
      id: Date.now(),
      joinDate: new Date().toLocaleDateString('en-BD'),
      bookings: [],
      favorites: [],
      phone: '',
      address: ''
    };
    
    setIsLoggedIn(true);
    setUserData(userProfile);
    setShowLogin(false);
    localStorage.setItem('userData', JSON.stringify(userProfile));
    
    alert(`Welcome ${userData.name}! 🎉 Your profile has been created successfully.`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setCartItems([]);
    localStorage.removeItem('tourCart');
    localStorage.removeItem('userData');
    localStorage.setItem('isLoggedIn', 'false');
    alert('You have been logged out successfully.');
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
          id: Date.now() + Math.random(),
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
    
    alert(`✅ "${packageItem.name}" added to cart!`);
  };

  const updateCartItemQuantity = (itemId, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeCartItem = (itemId) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    
    if (itemToRemove) {
      alert(`🗑️ "${itemToRemove.name}" removed from cart!`);
    }
  };

  const clearCart = () => {
    if (cartItems.length > 0) {
      if (window.confirm('Are you sure you want to clear your cart?')) {
        setCartItems([]);
        alert('🛒 Cart cleared successfully!');
      }
    }
  };

  // New function to handle booking confirmation
  const handleBookingConfirmation = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      bookingDate: new Date().toLocaleDateString('en-BD'),
      bookingTime: new Date().toLocaleTimeString('en-BD'),
      status: 'Confirmed'
    };
    
    setBookings(prev => [...prev, newBooking]);
    setCartItems([]); // Clear cart after booking
    
    // Update user data with booking
    if (userData) {
      const updatedUserData = {
        ...userData,
        bookings: [...(userData.bookings || []), newBooking]
      };
      setUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
    }
    
    return newBooking;
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Auto-hide search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showSearchResults) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSearchResults]);

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
          userData={userData}
        />
        
        {/* Main Content */}
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
              element={<Home darkMode={darkMode} data={tourismData} />} 
            />
            
            <Route 
              path="/destinations" 
              element={<Destinations darkMode={darkMode} data={tourismData} />} 
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
            
            {/* Gallery route removed */}
            
            <Route 
              path="/about" 
              element={<About darkMode={darkMode} data={tourismData} />} 
            />
            
            <Route 
              path="/contact" 
              element={<Contact darkMode={darkMode} data={tourismData} />} 
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
                  userData={userData}
                  onLoginClick={() => setShowLogin(true)}
                  onBookingConfirm={handleBookingConfirmation}
                />
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <Profile 
                  darkMode={darkMode} 
                  userData={userData} 
                  onLogout={handleLogout}
                />
              } 
            />
            
            {/* Booking History Route */}
            <Route 
              path="/bookings" 
              element={
                <BookingHistory 
                  darkMode={darkMode} 
                  bookings={bookings}
                  userData={userData}
                />
              } 
            />
            
            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
                  <div className="text-center p-8">
                    <div className={`text-9xl font-bold mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                      404
                    </div>
                    <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Page Not Found
                    </h1>
                    <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                      <a
                        href="/destinations"
                        className={`px-6 py-3 rounded-lg font-semibold border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Explore Destinations
                      </a>
                    </div>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className={`border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-green-500' : 'bg-green-600'} flex items-center justify-center`}>
                    <span className={`font-bold text-xl text-white`}>T</span>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {tourismData.siteInfo.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tourismData.siteInfo.slogan}
                    </p>
                  </div>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  {tourismData.siteInfo.description}
                </p>
                <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Your trusted travel partner since 2014
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Quick Links
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Destinations', path: '/destinations' },
                    { name: 'Packages', path: '/packages' },
                    { name: 'About', path: '/about' },
                    { name: 'Contact', path: '/contact' },
                    { name: 'My Bookings', path: '/bookings' }
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.path}
                      className={`block text-sm hover:underline transition-colors ${
                        darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Contact Us
                </h4>
                <div className="space-y-2">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    📞 +880 1XXX-XXXXXX
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    📧 info@tourismbd.com
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    📍 123 Travel Street, Dhaka 1212
                  </p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button className={`p-2 rounded-full transition-colors ${
                    darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}>
                    <span className="text-sm">FB</span>
                  </button>
                  <button className={`p-2 rounded-full transition-colors ${
                    darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}>
                    <span className="text-sm">IG</span>
                  </button>
                  <button className={`p-2 rounded-full transition-colors ${
                    darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}>
                    <span className="text-sm">TW</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-8 border-t text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                © 2024 {tourismData.siteInfo.name}. All rights reserved. | 
                <a href="/privacy" className="hover:underline ml-1">Privacy Policy</a> | 
                <a href="/terms" className="hover:underline ml-1">Terms of Service</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;