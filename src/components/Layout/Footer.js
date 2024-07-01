/* eslint-disable */
import React from "react";
import logo from "../../assets/image.png";
const Footer = () => {
  const footerStyle = {
    background: "radial-gradient(circle at left bottom, #24382a  , #000000)",
  };

  const lowerFooterStyle = {
    borderTop: "1px solid rgba(255, 255, 255, 0.2)", // Adjust as needed
    color: "rgba(255, 255, 255, 0.5)", // Adjust as needed
    paddingTop: "20px",
  };
  return (
    <footer style={footerStyle} className="text-sm p-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start text-gray-300">
          <div className="mb-6">
            <img
              src={logo}
              alt="PropertyPro Logo"
              className="h-12 mb-8"
            />
            <div className="mb-2">
              <p className="">Technology Park 9 -12</p>
              <p className="">Marie Curie Street 08987</p>
              <p>United States</p>
            </div>
          </div>
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <h3 className="text-white font-semibold mb-6 mt-3">Platform</h3>
            <ul>
              <li className="my-2">
                <a href="/analytics" className="hover:text-gray-400 ">
                  Analytics
                </a>
              </li>
              <li className="my-2">
                <a href="/planning" className="hover:text-gray-400 ">
                  Planning
                </a>
              </li>
              <li className="my-2">
                <a href="/collaboration" className="hover:text-gray-400 ">
                  Collaboration
                </a>
              </li>
              <li className="my-2">
                <a href="/integration" className="hover:text-gray-400 ">
                  Integration
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <h3 className="text-white font-semibold mb-6 mt-3">Resources</h3>
            <ul>
              <li className="my-2">
                <a href="/customers" className="hover:text-gray-400 ">
                  Customers
                </a>
              </li>
              <li className="my-2">
                <a href="/ebooks" className="hover:text-gray-400 ">
                  Ebooks & Guides
                </a>
              </li>
              <li className="my-2">
                <a href="/webinars" className="hover:text-gray-400 ">
                  Webinars & Events
                </a>
              </li>
              <li className="my-2">
                <a href="/api-reference" className="hover:text-gray-400 ">
                  Web API reference
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-auto mb-6 sm:mb-0">
            <h3 className="text-white font-semibold mb-6 mt-3">Socials</h3>
            <ul>
              <li className="my-2">
                <a
                  href="https://www.linkedin.com"
                  className="hover:text-gray-400 "
                >
                  LinkedIn
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.instagram.com"
                  className="hover:text-gray-400 "
                >
                  Instagram
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.facebook.com"
                  className="hover:text-gray-400 "
                >
                  Facebook
                </a>
              </li>
              <li className="my-2">
                <a
                  href="https://www.youtube.com"
                  className="hover:text-gray-400 "
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-auto">
            <h3 className="text-white font-semibold mb-6 mt-3">Contact</h3>
            <ul>
              <li className="my-2">
                <a
                  href="mailto:hellopropro@estate.com"
                  className="hover:text-gray-400 "
                >
                  helloproppro@estate.com
                </a>
              </li>
              <li className="my-2">
                <p className="">2020 Massachusetts Ave NW,</p>
                <p className="">Washington, DC 20036</p>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={lowerFooterStyle}
          className="text-center mt-8 flex justify-between p-8"
        >
          <p className="hover:text-gray-400 ">
            ©2024 PropertyPro. All rights reserved
          </p>
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="/terms" className="hover:text-gray-400 ">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-400 ">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/sitemap" className="hover:text-gray-400 ">
                Site map
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
