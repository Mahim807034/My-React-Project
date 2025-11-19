import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaCreditCard, FaArrowLeft, FaCheck, FaShoppingBag, FaUser, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';

const Cart = ({ darkMode, data, cartItems, updateCartItemQuantity, removeCartItem, clearCart }) => {
  const [bookingStep, setBookingStep] = useState(1);
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const updateQuantity = (id, change) => {
    updateCartItemQuantity(id, change);
  };

  const removeItem = (id) => {
    removeCartItem(id);
  };

  const handlePersonalDetailsChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value
    });
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const BookingSteps = () => (
    <div className={`p-6 rounded-lg mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex justify-between items-center">
        {[1, 2, 3, 4].map(step => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
              step <= bookingStep
                ? 'bg-green-500 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-400'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {step < bookingStep ? <FaCheck /> : step}
            </div>
            <span className={`text-sm mt-2 transition-colors duration-300 ${
              step <= bookingStep
                ? darkMode ? 'text-green-400' : 'text-green-600'
                : darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {step === 1 && 'Cart'}
              {step === 2 && 'Details'}
              {step === 3 && 'Payment'}
              {step === 4 && 'Confirm'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const Step1Cart = () => (
    <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="p-6 border-b border-gray-700">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Shopping Cart ({cartItems.length} items)
        </h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="p-8 text-center">
          <FaShoppingBag className={`text-6xl mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Your cart is empty
          </p>
          <Link
            to="/packages"
            className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
              darkMode 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Browse Packages
          </Link>
        </div>
      ) : (
        <>
          <div className="p-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className={`flex items-center space-x-4 p-4 rounded-lg mb-4 transition-colors duration-300 ${
                  darkMode ? 'bg-gray-700' : 'bg-green-50'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=200&h=200&fit=crop';
                  }}
                />
                <div className="flex-1">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.duration}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.destination}
                  </p>
                  <p className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    ৳{item.price.toLocaleString()} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-600 text-white hover:bg-gray-500' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gray-600 text-white hover:bg-gray-500' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className={`p-2 rounded-full transition-colors duration-300 ${
                    darkMode 
                      ? 'text-red-400 hover:bg-red-900' 
                      : 'text-red-500 hover:bg-red-100'
                  }`}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Total: ৳{totalPrice.toLocaleString()}
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={clearCart}
                  className={`px-4 py-2 rounded-lg font-semibold border transition-colors duration-300 ${
                    darkMode 
                      ? 'border-red-500 text-red-400 hover:bg-red-900' 
                      : 'border-red-500 text-red-500 hover:bg-red-100'
                  }`}
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => setBookingStep(2)}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2 ${
                    darkMode 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <span>Proceed to Booking</span>
                  <FaCreditCard />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const Step2Details = () => (
    <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Personal Details
      </h2>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <FaUser className="inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={personalDetails.name}
              onChange={handlePersonalDetailsChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <FaEnvelope className="inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={personalDetails.email}
              onChange={handlePersonalDetailsChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FaPhone className="inline mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={personalDetails.phone}
            onChange={handlePersonalDetailsChange}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <FaHome className="inline mr-2" />
            Address *
          </label>
          <textarea
            name="address"
            value={personalDetails.address}
            onChange={handlePersonalDetailsChange}
            required
            rows="3"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
            placeholder="Enter your full address"
          ></textarea>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={() => setBookingStep(1)}
            className={`px-6 py-3 rounded-lg font-semibold border transition-colors duration-300 ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Back to Cart
          </button>
          <button
            type="button"
            onClick={() => setBookingStep(3)}
            className={`flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2`}
          >
            <span>Continue to Payment</span>
            <FaCreditCard />
          </button>
        </div>
      </form>
    </div>
  );

  const Step3Payment = () => (
    <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Payment Method
      </h2>
      
      <div className="space-y-4 mb-6">
        <div className={`p-4 border-2 rounded-lg cursor-pointer transition-colors duration-300 ${
          darkMode ? 'border-green-500 bg-green-900 bg-opacity-20' : 'border-green-500 bg-green-50'
        }`}>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="radio" name="payment" defaultChecked className="text-green-500" />
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Credit/Debit Card</span>
          </label>
        </div>

        <div className={`p-4 border rounded-lg cursor-pointer transition-colors duration-300 ${
          darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
        }`}>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="radio" name="payment" className="text-green-500" />
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>bKash / Nagad</span>
          </label>
        </div>

        <div className={`p-4 border rounded-lg cursor-pointer transition-colors duration-300 ${
          darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
        }`}>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="radio" name="payment" className="text-green-500" />
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bank Transfer</span>
          </label>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800 text-sm">
          💡 <strong>Note:</strong> This is a demo payment system. No actual payment will be processed.
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setBookingStep(2)}
          className={`px-6 py-3 rounded-lg font-semibold border transition-colors duration-300 ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Back to Details
        </button>
        <button
          onClick={() => setBookingStep(4)}
          className={`flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300`}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );

  const Step4Confirmation = () => (
    <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-8 text-center`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
        darkMode ? 'bg-green-600' : 'bg-green-500'
      }`}>
        <FaCheck className="text-white text-2xl" />
      </div>
      
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Booking Confirmed!
      </h2>
      
      <p className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Thank you for your booking, <strong>{personalDetails.name}</strong>!
      </p>
      
      <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        We've sent a confirmation email to <strong>{personalDetails.email}</strong>. 
        Our team will contact you within 24 hours to complete the process.
      </p>

      <div className={`p-4 rounded-lg mb-6 text-left ${
        darkMode ? 'bg-gray-700' : 'bg-green-50'
      }`}>
        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Booking Summary:
        </h3>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          <strong>Total Amount:</strong> ৳{totalPrice.toLocaleString()}
        </p>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          <strong>Packages:</strong> {cartItems.length}
        </p>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          <strong>Booking ID:</strong> TOUR-{Date.now().toString().slice(-6)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => {
            setBookingStep(1);
            clearCart();
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
            darkMode 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Book Another Package
        </button>
        <Link
          to="/"
          className={`px-6 py-3 rounded-lg font-semibold border transition-colors duration-300 ${
            darkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <BookingSteps />

        {bookingStep === 1 && <Step1Cart />}
        {bookingStep === 2 && <Step2Details />}
        {bookingStep === 3 && <Step3Payment />}
        {bookingStep === 4 && <Step4Confirmation />}
      </div>
    </div>
  );
};

export default Cart;