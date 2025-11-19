import React from 'react';
import { FaUsers, FaGlobe, FaAward, FaHeart } from 'react-icons/fa';

const About = ({ darkMode, data }) => {
  const stats = [
    { icon: FaUsers, number: '5000+', label: 'Happy Travelers' },
    { icon: FaGlobe, number: '50+', label: 'Destinations' },
    { icon: FaAward, number: '10+', label: 'Years Experience' },
    { icon: FaHeart, number: '98%', label: 'Customer Satisfaction' }
  ];

  return (
    <div className={`min-h-screen py-12 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            About {data.siteInfo.name}
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {data.siteInfo.description}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <stat.icon className={`text-3xl mx-auto mb-4 ${
                darkMode ? 'text-green-400' : 'text-green-500'
              }`} />
              <div className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {stat.number}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className={`p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Our Mission
            </h2>
            <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              To provide unforgettable travel experiences that connect people with the beauty of Bangladesh 
              and the world. We believe in sustainable tourism that benefits local communities while 
              offering authentic cultural experiences to our travelers.
            </p>
          </div>
          <div className={`p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Our Vision
            </h2>
            <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              To become the most trusted travel partner in South Asia, known for our exceptional service, 
              innovative tour packages, and commitment to promoting the rich cultural heritage and natural 
              beauty of our destinations.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.teamMembers.map(member => (
              <div
                key={member.id}
                className={`text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-500"
                />
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {member.name}
                </h3>
                <p className={`text-green-500 font-semibold mb-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {member.position}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className={`p-8 rounded-2xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Local Expertise",
                description: "Deep knowledge of Bangladesh and international destinations"
              },
              {
                title: "Best Price Guarantee",
                description: "Competitive prices without compromising quality"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer service during your travels"
              },
              {
                title: "Customized Packages",
                description: "Tailored tours to match your preferences and budget"
              },
              {
                title: "Safety First",
                description: "Prioritizing your safety and comfort in all our services"
              },
              {
                title: "Sustainable Tourism",
                description: "Supporting local communities and eco-friendly practices"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  darkMode ? 'border-gray-700' : 'border-green-200'
                }`}
              >
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;