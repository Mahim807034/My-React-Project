import React from 'react';
import { FaTimes, FaMapMarkerAlt, FaStar, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ query, darkMode, onClose, data }) => {
  const navigate = useNavigate();

  // Filter destinations based on search query
  const filteredDestinations = data.destinations.filter(destination =>
    destination.name.toLowerCase().includes(query.toLowerCase()) ||
    destination.country.toLowerCase().includes(query.toLowerCase()) ||
    destination.type.toLowerCase().includes(query.toLowerCase()) ||
    destination.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPackages = data.tourPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(query.toLowerCase()) ||
    pkg.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleDestinationClick = (destinationId) => {
    navigate(`/destination/${destinationId}`);
    onClose();
  };

  const handlePackageClick = (packageId) => {
    navigate('/packages');
    onClose();
  };

  const handleBookNow = (pkg, e) => {
    e.stopPropagation();
    alert(`Booking package: ${pkg.name}\nThis would open booking form.`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 pt-20">
      <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl m-4 max-h-[80vh] overflow-hidden`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Search Results for "{query}"
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaTimes />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4">
          {/* Destinations Results */}
          {filteredDestinations.length > 0 && (
            <div className="mb-6">
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Destinations ({filteredDestinations.length})
              </h3>
              <div className="space-y-3">
                {filteredDestinations.map(destination => (
                  <div
                    key={destination.id}
                    onClick={() => handleDestinationClick(destination.id)}
                    className={`flex items-center space-x-4 p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                        : 'bg-green-50 border-green-200 hover:bg-green-100'
                    }`}
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {destination.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <FaMapMarkerAlt className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {destination.country} • {destination.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <FaStar className="text-yellow-400" />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {destination.rating}
                        </span>
                      </div>
                    </div>
                    <FaArrowRight className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages Results */}
          {filteredPackages.length > 0 && (
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Tour Packages ({filteredPackages.length})
              </h3>
              <div className="space-y-3">
                {filteredPackages.map(pkg => {
                  const destination = data.destinations.find(d => d.id === pkg.destinationId);
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => handlePackageClick(pkg.id)}
                      className={`flex items-center space-x-4 p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                          : 'bg-green-50 border-green-200 hover:bg-green-100'
                      }`}
                    >
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {pkg.name}
                        </h4>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {pkg.duration} • ৳{pkg.price.toLocaleString()}
                        </p>
                        {destination && (
                          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {destination.country}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={(e) => handleBookNow(pkg, e)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                            darkMode 
                              ? 'bg-green-600 text-white hover:bg-green-700' 
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          Book
                        </button>
                        <FaArrowRight className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} self-center`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredDestinations.length === 0 && filteredPackages.length === 0 && (
            <div className="text-center py-8">
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No results found for "{query}"
              </p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;