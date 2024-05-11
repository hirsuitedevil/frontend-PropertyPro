/* eslint-disable */
import React, { useState } from "react";

const NotificationButton = ({ icon: Icon, count, onClick }) => {
  const [hovered, setHovered] = useState(false); // Boolean state

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log("Hello World");
    }
  };

  return (
    <div className="relative">
      <button
        className={`bg-white  border-2 p-2 rounded-lg ${
          hovered ? "shadow-xl" : "shadow-md"
        } flex items-center justify-center `}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon className="w-[20px] h-[20px] text-gray-600" />
      </button>
      {count > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {count}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
