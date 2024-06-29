import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { request } from "../util/fetchAPI";
import { imageDb } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { extractTime } from "../util/FormatDate";
const Message = ({ messageId }) => {
  const { user, token } = useSelector((state) => state.auth);
  const { participants } = useSelector((state) => state.chat);
  const otherUserId = participants.find((id) => id !== user._id);
  const [message, setMessage] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState("");
  const [otherUserProfilePic, setOtherUserProfilePic] = useState("");
  const storageRef = ref(imageDb, "images");

  useEffect(() => {
    const getProfilePics = async () => {
      try {
        const headers = {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        };
        const userProfileImg = user.profileImg.includes(
          "https://lh3.googleusercontent.com"
        )
          ? user.profileImg
          : await getDownloadURL(ref(storageRef, user.profileImg));
        setUserProfilePic(userProfileImg);

        const res = await request(
          `/auth/getUserbyId/${otherUserId}`,
          "GET",
          headers
        );
        const otherUserProfileImg = res.user.profileImg.includes(
          "https://lh3.googleusercontent.com"
        )
          ? res.user.profileImg
          : await getDownloadURL(ref(storageRef, res.user.profileImg));
        setOtherUserProfilePic(otherUserProfileImg);
        const resp = await request(
          `/messages/getMsgById/${messageId}`,
          "GET",
          headers
        );
        setMessage(resp);
      } catch (error) {
        console.error("Error fetching profile pictures or messages:", error);
      }
    };
    getProfilePics();
  }, [messageId, otherUserId, token, user.profileImg]);

  if (!message) {
    return <div>Loading...</div>;
  }
  const fromMe = (message.senderId === user._id);
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe ? userProfilePic : otherUserProfilePic;
  return (
    <div
      className={`flex items-start gap-2 p-2 ${
        fromMe ? "justify-end" : ""
      }`}
    >
      {!fromMe && (
        <img
          className="rounded-full object-cover h-12 w-12"
          alt="Profile"
          src={profilePic}
        />
      )}
      <div className={` flex flex-col max-w-md ${fromMe ? "items-end" : "items-start"}`}>
        <div
          className={`text-black rounded-lg p-2 ${
            fromMe
              ? "rounded-br-none bg-blue-200"
              : "rounded-bl-none bg-gray-100"
          }`}
        >
          {message.content}
        </div>
        <div
          className={`opacity-50 text-xs flex gap-1 ${
            fromMe ? "justify-end" : ""
          }`}
        >
          {formattedTime}
        </div>
      </div>
      {fromMe && (
        <img
          className="rounded-full object-cover h-12 w-12"
          alt="Profile"
          src={profilePic}
        />
      )}
    </div>
  );
};

export default Message;
