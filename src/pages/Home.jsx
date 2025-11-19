import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaArrowRight } from 'react-icons/fa';

const Home = ({ darkMode, data }) => {
  const featuredDestinations = data.destinations.slice(0, 3);
  const featuredPackages = data.tourPackages.slice(0, 3);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      {/* Hero Section */}
      <section className={`relative py-20 ${darkMode ? 'bg-gray-800' : 'bg-green-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {data.siteInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
            {data.siteInfo.slogan}
          </p>
          <p className="text-lg text-green-200 mb-12 max-w-2xl mx-auto">
            {data.siteInfo.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-100 transition-colors"
            >
              Explore Destinations
            </Link>
            <Link
              to="/packages"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Featured Destinations
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover amazing places in Bangladesh and around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map(destination => (
              <div
                key={destination.id}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {destination.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-400" />
                      <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {destination.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <FaMapMarkerAlt className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {destination.country} • {destination.type}
                    </span>
                  </div>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {destination.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {destination.priceRange}
                    </span>
                    <Link
                      to="/destinations"
                      className={`flex items-center space-x-1 text-sm font-semibold ${
                        darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
                      }`}
                    >
                      <span>Explore</span>
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                darkMode 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              <span>View All Destinations</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-green-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Popular Tour Packages
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Handpicked tours for the best travel experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map(pkg => {
              const destination = data.destinations.find(d => d.id === pkg.destinationId);
              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}
                >
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {pkg.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                      }`}>
                        {pkg.duration}
                      </span>
                    </div>
                    {destination && (
                      <div className="flex items-center space-x-2 mb-3">
                        <FaMapMarkerAlt className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {destination.country}
                        </span>
                      </div>
                    )}
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {pkg.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ৳{pkg.price.toLocaleString()}
                      </span>
                      <Link
                        to="/packages"
                        className={`flex items-center space-x-1 text-sm font-semibold ${
                          darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'
                        }`}
                      >
                        <span>Details</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/packages"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                darkMode 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              <span>View All Packages</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;