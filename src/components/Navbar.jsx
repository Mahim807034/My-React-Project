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

        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-green-500' : 'bg-white'} flex items-center justify-center`}>
              <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-green-600'}`}>T</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl block">{siteInfo.name}</span>
              <p className="text-green-200 text-xs">{siteInfo.slogan}</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 lg:mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search destinations, packages, hotels..."
                className={`w-full px-4 py-2 rounded-full border-2 text-sm ${
                  darkMode
                    ? 'bg-gray-800 border-gray-600 text-white'
                    : 'bg-white border-green-200 text-gray-800'
                }`}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1">
                <FaSearch className={darkMode ? "text-green-400" : "text-green-500"} />
              </button>
            </form>
          </div>

          {/* Desktop Right Side */}
          <div className="flex items-center space-x-3">

            <div className="hidden lg:flex items-center space-x-4">

              {/* Desktop Menu Links */}
              <div className="flex items-center space-x-4 mr-3">
                <Link to="/" className="text-white hover:text-green-200 text-sm">Home</Link>
                <Link to="/destinations" className="text-white hover:text-green-200 text-sm">Destinations</Link>
                <Link to="/packages" className="text-white hover:text-green-200 text-sm">Packages</Link>
                <Link to="/about" className="text-white hover:text-green-200 text-sm">About</Link>
                <Link to="/contact" className="text-white hover:text-green-200 text-sm">Contact</Link>
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-1 text-white hover:bg-green-500 rounded-full"
              >
                <FaShoppingCart className="text-base" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* User Area */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-green-500 text-white"
                  >
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </button>

                  <div className="flex items-center space-x-1">
                    <div className="p-1 rounded-full bg-green-500">
                      <FaUser className="text-white" />
                    </div>
                    <button onClick={onLogout} className="p-1 text-white">
                      <FaSignOutAlt />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full bg-green-500 text-white"
                  >
                    {darkMode ? <FaSun /> : <FaMoon />}
                  </button>

                  <button
                    onClick={onLoginClick}
                    className="px-3 py-1 rounded-full bg-white text-green-600 text-xs font-semibold"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-white p-1"
            >
              {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-green-500">

            <div className="flex flex-col space-y-3">

              <Link to="/" className="text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/destinations" className="text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
              <Link to="/packages" className="text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Packages</Link>
              <Link to="/about" className="text-white text-sm" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-white text-sm" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

              {/* Cart */}
              <Link to="/cart" className="text-white flex items-center text-sm" onClick={() => setMobileMenuOpen(false)}>
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Login / User Toggle */}
              <div className="pt-3 border-t border-green-500 border-opacity-30">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setDarkMode(!darkMode)} className="p-1 bg-green-500 rounded-full text-white">
                      {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <span className="text-white text-sm">Welcome!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}
                    className="w-full py-2 rounded-lg bg-white text-green-600 text-sm"
                  >
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
