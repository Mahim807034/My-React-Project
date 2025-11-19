import React, { useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Destinations = ({ darkMode, data }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const countries = ['All', ...new Set(data.destinations.map(d => d.country))];

  const filteredDestinations = data.destinations.filter(destination => {
    const matchesCountry = filter === 'All' || destination.country === filter;
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Explore Destinations
          </h1>
        </div>

        <div className={`mb-8 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaFilter className={darkMode ? 'text-green-400' : 'text-green-500'} />
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                }`}>

                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                }`}
              />
            </div>
          </div>
        </div>

        {/* ----- DESTINATION CARDS ----- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(destination => (
            <div
              key={destination.id}
              className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {destination.name}
                  </h3>

                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-400" />
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <FaMapMarkerAlt className={`${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {destination.country} • {destination.type}
                  </span>
                </div>

                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {destination.description}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                  <div>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Best Time: {destination.bestTime}
                    </p>
                    <p className={`${darkMode ? 'text-green-400' : 'text-green-600'} font-bold`}>
                      {destination.priceRange}
                    </p>
                  </div>

                  {/* FIXED VIEW DETAILS BUTTON */}
                  <Link
                    to={`/destination/${destination.id}`}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    View Details
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xl`}>
              No destinations found matching your criteria
            </p>

            <button
              onClick={() => { setFilter('All'); setSearchTerm(''); }}
              className={`mt-4 px-6 py-2 rounded-lg font-semibold text-white ${
                darkMode ? 'bg-green-600' : 'bg-green-500'
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
