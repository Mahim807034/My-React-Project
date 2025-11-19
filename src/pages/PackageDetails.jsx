import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaMoneyBillWave, FaCheck, FaShoppingCart, FaBook, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const PackageDetails = ({ darkMode, data, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find package by ID
  const packageItem = data.tourPackages.find(p => p.id === parseInt(id));

  if (!packageItem) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Package Not Found
          </h1>
          <Link
            to="/packages"
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              darkMode 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  const destination = data.destinations.find(d => d.id === packageItem.destinationId);

  const handleAddToCart = () => {
    addToCart(packageItem);
    alert(`✅ Added to cart: ${packageItem.name}`);
  };

  const handleBookNow = () => {
    addToCart(packageItem);
    navigate('/cart');
  };

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/packages"
          className={`inline-flex items-center mb-6 transition-colors duration-300 ${
            darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Packages
        </Link>

        <div className={`rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Hero Image */}
          <div className="relative h-96">
            <img
              src={packageItem.image}
              alt={packageItem.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=800&h=400&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{packageItem.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <FaClock />
                  <span>{packageItem.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaMoneyBillWave />
                  <span>৳{packageItem.price.toLocaleString()}</span>
                </div>
                {destination && (
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt />
                    <span>{destination.name}</span>
                  </div>
                )}
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
                    Package Overview
                  </h2>
                  <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {packageItem.description}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    What's Included
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packageItem.inclusions.map((inclusion, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-green-50'
                        }`}
                      >
                        <FaCheck className={`text-green-500 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {destination && (
                  <section>
                    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      About {destination.name}
                    </h2>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                      <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{destination.description}</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <FaStar className="text-yellow-400" />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Rating: {destination.rating}</span>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar - Booking Card */}
              <div className="lg:col-span-1">
                <div className={`rounded-lg p-6 sticky top-6 ${darkMode ? 'bg-gray-700' : 'bg-green-100'}`}>
                  <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Book This Package
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Duration:</span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{packageItem.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Price per person:</span>
                      <span className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ৳{packageItem.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      className={`w-full py-3 rounded-lg font-semibold border transition-colors flex items-center justify-center space-x-2 ${
                        darkMode 
                          ? 'border-green-400 text-green-400 hover:bg-green-400 hover:text-white' 
                          : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                      }`}
                    >
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={handleBookNow}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                        darkMode 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      <FaBook />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;