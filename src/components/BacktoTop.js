/* eslint-disable */
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BacktoTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
        >
          <FaArrowUp/>
        </button>
      )}
    </div>
  );
};

export default BacktoTop;
