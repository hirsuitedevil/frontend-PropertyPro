/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
const Headeralt = () => {
  return (
    <header className="bg-white py-1 px-3">
      <div className="container mx-auto flex justify-between items-center">
        <Logo navigateTo={""} />
        <nav>
          <ul className="hidden sm:flex items-center space-x-8">
            <li>
              <a href="#home" className="text-gray-800 hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#about-us" className="text-gray-800 hover:text-gray-600">
                About us
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-gray-800 hover:text-gray-600"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a href="#faq" className="text-gray-800 hover:text-gray-600">
                FAQ
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          <Link
            to="/signup"
            className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-400 shadow-sm border-2"
          >
            Sign up
          </Link>
          <Link
            to="/signin"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow-md"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Headeralt;
