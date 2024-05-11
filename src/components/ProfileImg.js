/* eslint-disable */
import React from "react";

const ProfileImg = ({ src }) => {
  return (
    <img
      src={src}
      alt="Profile Img"
      className={`rounded-full object-cover h-8 w-8`}
    />
  );
};

export default ProfileImg;
