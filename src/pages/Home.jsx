import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = ({ darkMode, data }) => {
  const featuredDestinations = data.destinations.slice(0, 6);
  const featuredPackages = data.tourPackages.slice(0, 6);

  // Banner image - beautiful travel background
  const bannerImage = "https://i.ibb.co.com/j9J4wVrs/Bandarban.jpg";

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-green-50"}`}>

      {/* Hero Section with Banner Image */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerImage})`
          }}
        >
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {data.siteInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8">
            {data.siteInfo.slogan}
          </p>
          <p className="text-lg text-green-200 mb-12 max-w-2xl mx-auto">
            {data.siteInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors duration-300 shadow-lg"
            >
              Explore Destinations
            </Link>
            <Link
              to="/packages"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors duration-300"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations Slider */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Featured Destinations
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Discover amazing places in Bangladesh and around the world
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {featuredDestinations.map(destination => (
              <SwiperSlide key={destination.id}>
                <div className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                        {destination.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400" />
                        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {destination.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <FaMapMarkerAlt className={`${darkMode ? "text-green-400" : "text-green-500"}`} />
                      <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {destination.country} • {destination.type}
                      </span>
                    </div>

                    <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
                      {destination.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className={`font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                        {destination.priceRange}
                      </span>

                      {/* View Details Link - Working */}
                      <Link
                        to={`/destination/${destination.id}`}
                        className={`flex items-center space-x-1 text-sm font-semibold ${
                          darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"
                        }`}
                      >
                        <span>Explore</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Featured Packages Slider */}
      <section className={`py-12 ${darkMode ? "bg-gray-800" : "bg-green-100"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Popular Tour Packages
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Handpicked tours for the best travel experience
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            autoplay={{ delay: 2600, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {featuredPackages.map(pkg => {
              const destination = data.destinations.find(d => d.id === pkg.destinationId);
              return (
                <SwiperSlide key={pkg.id}>
                  <div className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                          {pkg.name}
                        </h3>

                        <span className="px-2 py-1 text-xs rounded-full bg-green-500 text-white">
                          {pkg.duration}
                        </span>
                      </div>

                      {destination && (
                        <div className="flex items-center space-x-2 mb-3">
                          <FaMapMarkerAlt className={`${darkMode ? "text-green-400" : "text-green-500"}`} />
                          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {destination.country}
                          </span>
                        </div>
                      )}

                      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
                        {pkg.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                          ৳{pkg.price.toLocaleString()}
                        </span>

                        {/* View Details Link - Working */}
                        <Link
                          to={`/package/${pkg.id}`}
                          className={`flex items-center space-x-1 text-sm font-semibold ${
                            darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"
                          }`}
                        >
                          <span>Details</span>
                          <FaArrowRight className="text-xs" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

    </div>
  );
};

export default Home;