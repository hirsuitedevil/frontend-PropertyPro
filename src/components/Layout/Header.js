/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import { FaCommentDots } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogout, CiEdit } from "react-icons/ci";
import NotificationButton from "../NotificationButton";
import SearchBox from "../SearchBox";
import ProfileImg from "../ProfileImg";
import DropdownItem from "../DropdownItem";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null); // Timeout reference
  const { user } = useSelector((state) => state.auth);
  const notificationCount = 5;
  const msgCount = 2;
  let profileImgSrc;
  if (user) {
    profileImgSrc = user.profileImg.includes(
      "https://lh3.googleusercontent.com"
    )
      ? user.profileImg
      : `http://localhost:5000/images/${user.profileImg}`;
  }
  const handleHover = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setDropdownVisible(true);
  };

  const handleLeave = () => {
    setDropdownTimeout(
      setTimeout(() => {
        setDropdownVisible(false);
      }, 200)
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow-sm">
      <Logo />

      <SearchBox />
      <div className="flex items-center space-x-4">
        <NotificationButton
          icon={FaCommentDots}
          count={msgCount}
          onClick={() => console.log("Comments clicked")}
        />
        <NotificationButton
          icon={IoNotifications}
          count={notificationCount}
          onClick={() => console.log("Notifications clicked")}
        />
        <div className="border-l border-gray-300 h-8 mx-3" />

        <div
          className="relative"
          onMouseEnter={handleHover} // Trigger hover effect
          onMouseLeave={handleLeave} // Trigger delayed leave effect
        >
          <ProfileImg src={profileImgSrc} />
          {isDropdownVisible && (
            <ul className="absolute z-10 min-w-[180px] bg-white p-3 rounded-md border shadow-lg right-0 mt-2">
              <DropdownItem icon={CgProfile} name="Profile" link="/profile" />
              <DropdownItem
                icon={CiLogout}
                name="Logout"
                link="/logout"
                onClick={handleLogout}
              />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
