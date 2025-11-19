import React, { useState } from "react";
import { FaTimes, FaExpand, FaMapMarkerAlt, FaImages } from "react-icons/fa";

const Gallery = ({ darkMode, data }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ["All", ...new Set(data.gallery.map((item) => item.category))];

  const filteredImages =
    selectedCategory === "All"
      ? data.gallery
      : data.gallery.filter((item) => item.category === selectedCategory);

  const fallbackImage =
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=500&h=400&fit=crop";

  return (
    <div className={`min-h-screen py-8 ${darkMode ? "bg-gray-900" : "bg-green-50"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              darkMode ? "bg-green-600" : "bg-green-500"
            }`}
          >
            <FaImages className="text-white text-2xl" />
          </div>

          <h1
            className={`text-4xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Travel Gallery
          </h1>

          <p
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover stunning visuals from our travel destinations
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category
                  ? darkMode
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-green-500 text-white shadow-lg"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  : "bg-white text-gray-700 hover:bg-green-100 hover:text-green-700 shadow"
              }`}
            >
              <FaMapMarkerAlt className="text-sm" />
              <span>{category}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedCategory === category
                    ? "bg-white bg-opacity-20"
                    : darkMode
                    ? "bg-gray-600"
                    : "bg-green-100"
                }`}
              >
                {category === "All"
                  ? data.gallery.length
                  : data.gallery.filter((item) => item.category === category).length}
              </span>
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 group ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
              onClick={() => setSelectedImage(item)}
            >
              {/* IMAGE without overlay */}
              <div className="w-full h-64 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
              </div>

              {/* Info section */}
              <div
                className={`p-4 border-t ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`font-semibold text-lg mb-1 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm flex items-center ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    <FaMapMarkerAlt className="mr-1 text-xs" />
                    {item.category}
                  </span>

                  <span
                    className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <FaExpand className="text-xs" />
                    <span>View</span>
                  </span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="bg-black bg-opacity-70 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <FaExpand className="text-white text-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NO RESULTS */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div
              className={`p-8 rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg max-w-md mx-auto`}
            >
              <FaImages
                className={`text-4xl mx-auto mb-4 ${
                  darkMode ? "text-gray-600" : "text-gray-400"
                }`}
              />

              <p
                className={`text-xl mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                No images found in this category
              </p>

              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-300 ${
                  darkMode
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                Show All Images
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Showing {filteredImages.length} of {data.gallery.length} images
          </p>
        </div>

        {/* MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white text-2xl p-2 hover:text-green-400 transition-colors z-10 bg-black bg-opacity-50 rounded-full"
              >
                <FaTimes />
              </button>

              <div
                className={`rounded-2xl overflow-hidden shadow-2xl ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-center bg-black">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[70vh] object-contain"
                    onError={(e) => (e.target.src = fallbackImage)}
                  />
                </div>

                <div className={`p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {selectedImage.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span
                      className={`flex items-center space-x-2 font-semibold ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      <FaMapMarkerAlt />
                      <span>{selectedImage.category}</span>
                    </span>

                    <button
                      onClick={() => setSelectedImage(null)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        darkMode
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;
