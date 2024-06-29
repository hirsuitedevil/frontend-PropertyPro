/* eslint-disable */
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('./assets/background.png')] bg-cover bg-center p-12">
      <div className="max-w-7xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Explore the Finest Real Estate Listings and Find Your Perfect Haven!
        </h1>
        <p className="mt-4 text-lg leading-6 text-gray-700">
          Find your dream home with the best facilities, strategic location and
          awesome design.
        </p>
        <p>
          Immediately start your search and find the best home that you have
          dreamed of.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="ml-3 inline-flex rounded-md shadow">
            <button
              onClick={()=>navigate('/signin')}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Get Started <FaArrowRight className="ml-2" />
            </button>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border-transparent text-base font-medium  bg-white text-gray-700 rounded hover:bg-gray-400 shadow-lg border-2"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
