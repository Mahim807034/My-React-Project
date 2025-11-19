import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

const Contact = ({ darkMode, data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: '+880 1XXX-XXXXXX',
      link: 'tel:+8801XXXXXXXXX'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      details: '+880 1XXX-XXXXXX',
      link: 'https://wa.me/8801XXXXXXXXX'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: 'info@exploretourism.com',
      link: 'mailto:info@exploretourism.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: '123 Travel Street, Dhaka 1212, Bangladesh',
      link: 'https://maps.google.com'
    }
  ];

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Contact Us
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Get in touch with us for any inquiries or to book your next adventure
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Get In Touch
            </h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target={item.title === 'Address' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white hover:bg-green-100 shadow-lg'
                  }`}
                >
                  <div className={`p-3 rounded-full ${
                    darkMode ? 'bg-green-900' : 'bg-green-500'
                  }`}>
                    <item.icon className={`text-lg ${darkMode ? 'text-green-400' : 'text-white'}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {item.title}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.details}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Business Hours
              </h3>
              <div className="space-y-2">
                {[
                  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', time: 'Closed' }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {schedule.day}
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                  placeholder="Tell us about your travel plans or inquiries..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <FaPaperPlane />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className={`mt-16 rounded-2xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Visit Our Office
          </h2>
          <div className={`w-full h-64 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-green-100'
          } flex items-center justify-center`}>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Interactive Map Would Be Here
            </p>
          </div>
          <p className={`text-center mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            123 Travel Street, Dhaka 1212, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;