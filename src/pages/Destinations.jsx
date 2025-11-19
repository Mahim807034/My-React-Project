import React, { useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaFilter } from 'react-icons/fa';

const Destinations = ({ darkMode, data }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const countries = ['All', ...new Set(data.destinations.map(d => d.country))];
  const types = ['All', ...new Set(data.destinations.map(d => d.type))];

  const filteredDestinations = data.destinations.filter(destination => {
    const matchesCountry = filter === 'All' || destination.country === filter;
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Explore Destinations
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover amazing places in Bangladesh and around the world
          </p>
        </div>

        {/* Filters */}
        <div className={`mb-8 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaFilter className={darkMode ? 'text-green-400' : 'text-green-500'} />
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Country Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              {/* Search */}
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-800'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(destination => (
            <div
              key={destination.id}
              className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {destination.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-400" />
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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

                <div className="space-y-3">
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Highlights:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            darkMode 
                              ? 'bg-green-900 text-green-200' 
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Best Time: {destination.bestTime}
                      </p>
                      <p className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        {destination.priceRange}
                      </p>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      darkMode 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No destinations found matching your criteria
            </p>
            <button
              onClick={() => {
                setFilter('All');
                setSearchTerm('');
              }}
              className={`mt-4 px-6 py-2 rounded-lg font-semibold ${
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

export default Destinations;