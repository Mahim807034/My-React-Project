import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaStar, FaClock, FaMoneyBillWave, FaCalendarAlt, FaCheck, FaShoppingCart } from 'react-icons/fa';

const DestinationDetails = ({ darkMode, data, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find destination by ID
  const destination = data.destinations.find(d => d.id === parseInt(id));

  if (!destination) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Destination Not Found
          </h1>
          <Link
            to="/destinations"
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              darkMode 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  // Find packages for this destination
  const relatedPackages = data.tourPackages.filter(pkg => pkg.destinationId === destination.id);

  const handleAddToCart = (pkg) => {
    addToCart(pkg);
    alert(`Added to cart: ${pkg.name}`);
  };

  const handleBookNow = (pkg) => {
    navigate('/cart');
  };

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/destinations"
          className={`inline-flex items-center mb-6 transition-colors duration-300 ${
            darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Destinations
        </Link>

        <div className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Hero Image */}
          <div className="relative h-96">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <FaMapMarkerAlt />
                  <span>{destination.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-400" />
                  <span>{destination.rating}</span>
                </div>
                <span className="px-2 py-1 bg-green-500 rounded-full text-sm">
                  {destination.type}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <section className="mb-8">
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    About {destination.name}
                  </h2>
                  <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {destination.description}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Highlights & Attractions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-green-50'
                        }`}
                      >
                        <FaCheck className={`text-green-500 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Travel Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <FaCalendarAlt className={darkMode ? 'text-green-400' : 'text-green-500'} />
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          Best Time to Visit
                        </span>
                      </div>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{destination.bestTime}</p>
                    </div>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <FaMoneyBillWave className={darkMode ? 'text-green-400' : 'text-green-500'} />
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          Price Range
                        </span>
                      </div>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{destination.priceRange}</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar - Related Packages */}
              <div className="lg:col-span-1">
                <div className={`rounded-lg p-6 sticky top-6 ${darkMode ? 'bg-gray-700' : 'bg-green-100'}`}>
                  <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Available Packages
                  </h3>
                  {relatedPackages.length > 0 ? (
                    <div className="space-y-4">
                      {relatedPackages.map(pkg => (
                        <div
                          key={pkg.id}
                          className={`p-4 rounded-lg border transition-all duration-300 ${
                            darkMode 
                              ? 'bg-gray-600 border-gray-500' 
                              : 'bg-white border-green-200'
                          }`}
                        >
                          <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {pkg.name}
                          </h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <FaClock className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {pkg.duration}
                            </span>
                          </div>
                          <p className={`text-lg font-bold mb-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            ৳{pkg.price.toLocaleString()}
                          </p>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleAddToCart(pkg)}
                              className={`flex-1 py-2 rounded-lg font-semibold border transition-colors flex items-center justify-center space-x-1 ${
                                darkMode 
                                  ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white' 
                                  : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                              }`}
                            >
                              <FaShoppingCart className="text-sm" />
                              <span>Cart</span>
                            </button>
                            <button
                              onClick={() => handleBookNow(pkg)}
                              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                                darkMode 
                                  ? 'bg-green-600 text-white hover:bg-green-700' 
                                  : 'bg-green-500 text-white hover:bg-green-600'
                              }`}
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      No packages available for this destination.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;