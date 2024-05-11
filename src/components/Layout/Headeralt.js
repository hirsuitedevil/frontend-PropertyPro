/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
const Headeralt = () => {
  return (
    <header className="bg-white py-1 px-3">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <nav>
          <ul className="hidden sm:flex items-center space-x-8">
            <li>
              <Link to="/" className="text-gray-800 hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-800 hover:text-gray-600">
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/how-it-works"
                className="text-gray-800 hover:text-gray-600"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="text-gray-800 hover:text-gray-600"
              >
                Feature
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-gray-800 hover:text-gray-600">
                FAQ
              </Link>
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
