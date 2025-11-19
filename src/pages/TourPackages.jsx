import React, { useState } from 'react';
import { FaClock, FaMapMarkerAlt, FaCheck, FaFilter, FaEye, FaBook, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TourPackages = ({ darkMode, data, addToCart }) => {
  const [filter, setFilter] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const navigate = useNavigate();

  const countries = ['All', ...new Set(data.destinations.map(d => d.country))];
  const priceRanges = [
    'All',
    'Budget (৳5,000 - ৳10,000)',
    'Standard (৳10,000 - ৳25,000)',
    'Premium (৳25,000+)'
  ];

  const filteredPackages = data.tourPackages.filter(pkg => {
    const destination = data.destinations.find(d => d.id === pkg.destinationId);
    const matchesCountry = filter === 'All' || (destination && destination.country === filter);
    
    let matchesPrice = true;
    if (priceRange === 'Budget (৳5,000 - ৳10,000)') {
      matchesPrice = pkg.price >= 5000 && pkg.price <= 10000;
    } else if (priceRange === 'Standard (৳10,000 - ৳25,000)') {
      matchesPrice = pkg.price >= 10000 && pkg.price <= 25000;
    } else if (priceRange === 'Premium (৳25,000+)') {
      matchesPrice = pkg.price >= 25000;
    }
    
    return matchesCountry && matchesPrice;
  });

  const getDestination = (destinationId) => {
    return data.destinations.find(d => d.id === destinationId);
  };

  // ✅ FIXED: Correct navigation path
  const handleViewDetails = (packageId) => {
    navigate(`/package/${packageId}`);
  };

  const handleBookNow = (pkg) => {
    addToCart(pkg);
    navigate('/cart');
  };

  const handleAddToCart = (pkg, e) => {
    e.stopPropagation();
    addToCart(pkg);
    alert(`✅ Added to cart: ${pkg.name}`);
  };

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Tour Packages
          </h1>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Handpicked tours for the best travel experience at affordable prices
          </p>
        </div>

        {/* Filters */}
        <div className={`mb-8 p-6 rounded-2xl transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaFilter className={darkMode ? 'text-green-400' : 'text-green-500'} />
              <span className={`font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filter Packages:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPackages.map(pkg => {
            const destination = getDestination(pkg.destinationId);
            
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full md:w-1/3 h-48 md:h-auto object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=400&h=250&fit=crop';
                    }}
                  />
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`text-xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {pkg.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300 ${
                        darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                      }`}>
                        {pkg.duration}
                      </span>
                    </div>

                    {destination && (
                      <div className="flex items-center space-x-2 mb-3">
                        <FaMapMarkerAlt className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                        <span className={`text-sm transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {destination.country}
                        </span>
                      </div>
                    )}

                    <p className={`mb-4 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {pkg.description}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <h4 className={`text-sm font-semibold mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Package Includes:
                        </h4>
                        <div className="space-y-1">
                          {pkg.inclusions.map((inclusion, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <FaCheck className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                              <span className={`text-sm transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {inclusion}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <p className={`text-2xl font-bold transition-colors duration-300 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            ৳{pkg.price.toLocaleString()}
                          </p>
                          <p className={`text-sm transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            per person
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={(e) => handleAddToCart(pkg, e)}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-semibold border transition-colors duration-300 ${
                              darkMode 
                                ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white' 
                                : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                            }`}
                          >
                            <FaShoppingCart className="text-sm" />
                            <span>Cart</span>
                          </button>
                          <button 
                            onClick={() => handleViewDetails(pkg.id)}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-semibold border transition-colors duration-300 ${
                              darkMode 
                                ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white' 
                                : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                            }`}
                          >
                            <FaEye className="text-sm" />
                            <span>Details</span>
                          </button>
                          <button 
                            onClick={() => handleBookNow(pkg)}
                            className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                              darkMode 
                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                : 'bg-green-500 text-white hover:bg-green-600'
                            }`}
                          >
                            <FaBook className="text-sm" />
                            <span>Book</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-xl transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No packages found matching your criteria
            </p>
            <button
              onClick={() => {
                setFilter('All');
                setPriceRange('All');
              }}
              className={`mt-4 px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                darkMode 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourPackages;