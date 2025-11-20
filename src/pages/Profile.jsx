import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaEdit, FaHistory, FaHeart, FaSignOutAlt } from 'react-icons/fa';

const Profile = ({ darkMode, userData, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(userData);

  const handleSave = () => {
    // Save profile data to localStorage
    localStorage.setItem('userData', JSON.stringify(profileData));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setProfileData(userData);
    setIsEditing(false);
  };

  if (!userData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Please Login to View Profile
          </h2>
          <Link
            to="/"
            className={`px-6 py-2 rounded-lg font-semibold ${
              darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className={`rounded-2xl shadow-lg overflow-hidden mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`h-32 ${darkMode ? 'bg-green-900' : 'bg-green-600'}`}></div>
          <div className="px-8 pb-8 -mt-16">
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className={`w-32 h-32 rounded-full border-4 ${darkMode ? 'border-gray-800 bg-gray-700' : 'border-white bg-green-100'} flex items-center justify-center`}>
                {userData.image ? (
                  <img 
                    src={userData.image} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className={`text-4xl ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                )}
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {userData.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <FaCalendarAlt />
                    <span>Member since {userData.joinDate}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <FaMapMarkerAlt />
                    <span>{userData.address || 'No address set'}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                  darkMode 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <FaEdit />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Personal Information
              </h2>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone || ''}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Address
                    </label>
                    <textarea
                      value={profileData.address || ''}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      rows="3"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-800'
                      }`}
                      placeholder="Enter your address"
                    ></textarea>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                        darkMode 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`flex-1 py-2 rounded-lg font-semibold border transition-colors ${
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
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaUser className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full Name</p>
                      <p className={darkMode ? 'text-white' : 'text-gray-800'}>{userData.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                      <p className={darkMode ? 'text-white' : 'text-gray-800'}>{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FaPhone className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                      <p className={darkMode ? 'text-white' : 'text-gray-800'}>
                        {userData.phone || 'Not provided'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Address</p>
                      <p className={darkMode ? 'text-white' : 'text-gray-800'}>
                        {userData.address || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Booking History */}
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <FaHistory />
                <span>Booking History</span>
              </h2>
              {userData.bookings && userData.bookings.length > 0 ? (
                <div className="space-y-3">
                  {userData.bookings.map((booking, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'
                    }`}>
                      <p className={darkMode ? 'text-white' : 'text-gray-800'}>{booking.packageName}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Booked on: {booking.date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No booking history yet
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Travel Stats
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Bookings</span>
                  <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {userData.bookings?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Favorites</span>
                  <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {userData.favorites?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Member Since</span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{userData.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/packages"
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-green-100 hover:bg-green-200 text-green-800'
                  }`}
                >
                  <FaMapMarkerAlt />
                  <span>Browse Packages</span>
                </Link>
                
                <button className={`flex items-center space-x-2 p-3 rounded-lg transition-colors w-full text-left ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-green-100 hover:bg-green-200 text-green-800'
                }`}>
                  <FaHeart />
                  <span>My Favorites</span>
                </button>
                
                <button
                  onClick={onLogout}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors w-full text-left ${
                    darkMode 
                      ? 'bg-red-900 hover:bg-red-800 text-white' 
                      : 'bg-red-100 hover:bg-red-200 text-red-800'
                  }`}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;