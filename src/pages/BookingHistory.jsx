import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaCheck, FaClock, FaUser, FaEdit, FaTrash, FaDownload, FaShare } from 'react-icons/fa';

const BookingHistory = ({ darkMode, bookings, userData, onUpdateBooking, onDeleteBooking }) => {
  const [editingBooking, setEditingBooking] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Edit booking function
  const handleEdit = (booking) => {
    setEditingBooking(booking.id);
    setEditForm({
      travelers: booking.travelers,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone
    });
  };

  const handleSaveEdit = (bookingId) => {
    if (onUpdateBooking) {
      onUpdateBooking(bookingId, editForm);
    }
    setEditingBooking(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
    setEditForm({});
  };

  const handleDelete = (bookingId) => {
    if (onDeleteBooking) {
      onDeleteBooking(bookingId);
    }
    setShowDeleteConfirm(null);
  };

  // Download booking as PDF
  const handleDownload = (booking) => {
    const bookingDetails = `
      Booking Confirmation
      ====================
      Booking ID: ${booking.bookingId}
      Package: ${booking.packageName}
      Date: ${booking.bookingDate}
      Time: ${booking.bookingTime}
      Travelers: ${booking.travelers}
      Total Price: ৳${booking.totalPrice?.toLocaleString()}
      Status: ${booking.status}
      
      Customer Details:
      Name: ${booking.customerName}
      Email: ${booking.customerEmail}
      Phone: ${booking.customerPhone}
    `;
    
    const blob = new Blob([bookingDetails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-${booking.bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Share booking
  const handleShare = async (booking) => {
    const shareText = `I've booked ${booking.packageName} for ${booking.bookingDate}. Booking ID: ${booking.bookingId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Travel Booking',
          text: shareText,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Booking details copied to clipboard!');
      });
    }
  };

  return (
    <div className={`min-h-screen py-8 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link
          to="/"
          className={`inline-flex items-center mb-6 transition-colors duration-300 ${
            darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            My Bookings
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage all your travel bookings - view, edit, or cancel
          </p>
        </div>

        {/* User Info */}
        {userData && (
          <div className={`rounded-2xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-green-600' : 'bg-green-500'} flex items-center justify-center`}>
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userData.name}
                  </h2>
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{userData.email}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {bookings.length} booking(s) total
                  </p>
                </div>
              </div>
              <div className={`text-right ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="text-sm">Total Spent</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  ৳{bookings.reduce((total, booking) => total + (booking.totalPrice || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className={`rounded-2xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="p-6">
                  {/* Header with Actions */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {booking.packageName}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <FaCalendarAlt />
                          <span>{booking.bookingDate} at {booking.bookingTime}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${
                          booking.status === 'Confirmed' 
                            ? darkMode ? 'text-green-400' : 'text-green-600'
                            : darkMode ? 'text-yellow-400' : 'text-yellow-600'
                        }`}>
                          <FaCheck />
                          <span className="font-semibold">{booking.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                      <button
                        onClick={() => handleDownload(booking)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        title="Download"
                      >
                        <FaDownload />
                      </button>
                      <button
                        onClick={() => handleShare(booking)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        title="Share"
                      >
                        <FaShare />
                      </button>
                      <button
                        onClick={() => handleEdit(booking)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-blue-700 text-white hover:bg-blue-600' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(booking.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-red-700 text-white hover:bg-red-600' 
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className={`text-2xl font-bold mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    ৳{booking.totalPrice?.toLocaleString()}
                  </div>

                  {/* Edit Form or Display Details */}
                  {editingBooking === booking.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Number of Travelers
                          </label>
                          <input
                            type="number"
                            value={editForm.travelers || ''}
                            onChange={(e) => setEditForm({...editForm, travelers: parseInt(e.target.value)})}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-800'
                            }`}
                            min="1"
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Contact Phone
                          </label>
                          <input
                            type="tel"
                            value={editForm.customerPhone || ''}
                            onChange={(e) => setEditForm({...editForm, customerPhone: e.target.value})}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              darkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-white border-gray-300 text-gray-800'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleSaveEdit(booking.id)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            darkMode 
                              ? 'bg-green-600 text-white hover:bg-green-700' 
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
                            darkMode 
                              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Booking Details */}
                      <div>
                        <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          Booking Details
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Booking ID:</span>
                            <span className={`font-mono ${darkMode ? 'text-white' : 'text-gray-800'}`}>{booking.bookingId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Duration:</span>
                            <span className={darkMode ? 'text-white' : 'text-gray-800'}>{booking.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Travelers:</span>
                            <span className={darkMode ? 'text-white' : 'text-gray-800'}>{booking.travelers} person(s)</span>
                          </div>
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div>
                        <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          Contact Information
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Name:</span>
                            <span className={darkMode ? 'text-white' : 'text-gray-800'}>{booking.customerName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Email:</span>
                            <span className={darkMode ? 'text-white' : 'text-gray-800'}>{booking.customerEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Phone:</span>
                            <span className={darkMode ? 'text-white' : 'text-gray-800'}>{booking.customerPhone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Package Inclusions */}
                  {booking.inclusions && booking.inclusions.length > 0 && (
                    <div className="mt-4">
                      <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Package Includes:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {booking.inclusions.map((inclusion, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs ${
                              darkMode 
                                ? 'bg-green-900 text-green-200' 
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {inclusion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className={`px-6 py-3 border-t ${
                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Booking ID: {booking.bookingId}
                    </span>
                    <div className="flex space-x-2">
                      <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        darkMode 
                          ? 'bg-gray-600 text-white hover:bg-gray-500' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}>
                        View Invoice
                      </button>
                      <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        darkMode 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}>
                        Get Help
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`rounded-2xl shadow-lg p-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <FaCalendarAlt className={`text-6xl mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                No Bookings Yet
              </h3>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                You haven't made any bookings yet. Start exploring our amazing tour packages!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/packages"
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Browse Packages
                </Link>
                <Link
                  to="/destinations"
                  className={`px-6 py-3 rounded-lg font-semibold border transition-colors ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl p-6 max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Confirm Cancellation
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Yes, Cancel Booking
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
                    darkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Keep Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;