import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaMoon, FaSun, FaSignOutAlt, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ darkMode, setDarkMode, onLoginClick, onSearch, isLoggedIn, onLogout, siteInfo, cartItemsCount }) => {
  const [searchInput, setSearchInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
      setSearchInput('');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-opacity-95 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-green-600'} shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-green-500'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ FIXED: Reduced padding for smaller navbar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo and Site Name - Left Side */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-green-500' : 'bg-white'} flex items-center justify-center transition-colors duration-300`}>
              <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-green-600'}`}>T</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl block">{siteInfo.name}</span>
              <p className="text-green-200 text-xs">{siteInfo.slogan}</p>
            </div>
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search destinations, packages, hotels..."
                className={`w-full px-4 py-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 text-sm ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white focus:ring-green-400 focus:border-green-400' 
                    : 'bg-white border-green-200 text-gray-800 focus:ring-green-500 focus:border-green-500'
                }`}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                  darkMode 
                    ? 'text-green-400 hover:bg-gray-700' 
                    : 'text-green-500 hover:bg-green-100'
                }`}
              >
                <FaSearch className="text-base" />
              </button>
            </form>
          </div>

          {/* Right Side - Desktop Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop Navigation & Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Navigation Links */}
              <div className="flex items-center space-x-4 mr-3">
                <Link to="/" className="text-white hover:text-green-200 transition-colors duration-300 font-medium text-sm">Home</Link>
                <Link to="/destinations" className="text-white hover:text-green-200 transition-colors duration-300 font-medium text-sm">Destinations</Link>
                <Link to="/packages" className="text-white hover:text-green-200 transition-colors duration-300 font-medium text-sm">Packages</Link>
                <Link to="/gallery" className="text-white hover:text-green-200 transition-colors duration-300 font-medium text-sm">Gallery</Link>
                <Link to="/about" className="text-white hover:text-green-200 transition-colors duration-300 font-medium text-sm">About</Link>
                <Link to="/contact" className="text-white hover:text-green-200 transition-colors duration-300 font-medium text-sm">Contact</Link>
              </div>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className={`relative p-1 rounded-full transition-colors ${
                  darkMode 
                    ? 'text-white hover:bg-gray-700' 
                    : 'text-white hover:bg-green-500'
                }`}
              >
                <FaShoppingCart className="text-base" />
                {cartItemsCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold ${
                    darkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Actions */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
                  </button>
                  <div className="flex items-center space-x-1">
                    <div className={`p-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-green-500'}`}>
                      <FaUser className={`text-sm ${darkMode ? 'text-green-400' : 'text-white'}`} />
                    </div>
                    <button
                      onClick={onLogout}
                      className={`p-1 rounded-full transition-colors ${
                        darkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                          : 'text-green-200 hover:text-white hover:bg-green-500'
                      }`}
                      title="Logout"
                    >
                      <FaSignOutAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
                  </button>
                  <button
                    onClick={onLoginClick}
                    className={`px-3 py-1 rounded-full font-semibold transition-all duration-300 shadow hover:shadow-md text-xs ${
                      darkMode 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-white text-green-600 hover:bg-green-50'
                    }`}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`lg:hidden p-1 rounded-full transition-colors ${
                darkMode 
                  ? 'text-white hover:bg-gray-700' 
                  : 'text-white hover:bg-green-500'
              }`}
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t ${darkMode ? 'border-gray-700' : 'border-green-500'} py-3`}>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-white hover:text-green-200 transition-colors duration-300 font-medium py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/destinations" className="text-white hover:text-green-200 transition-colors duration-300 font-medium py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
              <Link to="/packages" className="text-white hover:text-green-200 transition-colors duration-300 font-medium py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>Packages</Link>
              <Link to="/gallery" className="text-white hover:text-green-200 transition-colors duration-300 font-medium py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
              <Link to="/about" className="text-white hover:text-green-200 transition-colors duration-300 font-medium py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-white hover:text-green-200 transition-colors duration-300 font-medium py-1 text-sm" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/cart" className="text-white hover:text-green-200 transition-colors duration-300 font-medium py-1 flex items-center text-sm" onClick={() => setMobileMenuOpen(false)}>
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              <div className="pt-3 border-t border-green-500 border-opacity-30">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setDarkMode(!darkMode)} className={`p-1 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-green-500 text-white'}`}>
                      {darkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
                    </button>
                    <span className="text-white text-sm">Welcome User!</span>
                  </div>
                ) : (
                  <button onClick={() => { onLoginClick(); setMobileMenuOpen(false); }} className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${darkMode ? 'bg-green-600 text-white' : 'bg-white text-green-600'}`}>
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;