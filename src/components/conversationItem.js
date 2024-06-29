import React, { useState, useEffect } from "react";
import { request } from "../util/fetchAPI";
import { imageDb } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { setSelectedConversation } from "../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTimeAgo } from "../util/FormatDate";

const ConversationItem = ({ conversationUser, lastMessage }) => {
  const [name, setName] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storageRef = ref(imageDb, "images");
  const { selectedChatId, newMessage } = useSelector((state) => state.chat);
  const [currConversation, setCurrConversation] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const headers = {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        };
        const res = await request(
          `/auth/getUserbyId/${conversationUser}`,
          "GET",
          headers
        );
        const convRes = await request(
          `/conversations/getConvByUsers/${conversationUser}`,
          "GET",
          headers
        );
        setCurrConversation(convRes);
        setName(res.user.name);
        const profileImgUrl = res.user.profileImg.includes(
          "https://lh3.googleusercontent.com"
        )
          ? res.user.profileImg
          : await getDownloadURL(ref(storageRef, res.user.profileImg));
        setProfileImg(profileImgUrl);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getUserDetails();
  }, [conversationUser, newMessage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user details.</div>;
  }

  const truncateMessage = (message, maxLength) => {
    if (message.length > maxLength) {
      return message.slice(0, maxLength) + " ...";
    }
    return message;
  };

  return (
    <div
      className={`flex gap-2 items-center hover:bg-slate-400 rounded p-2 py-1 cursor-pointer ${
        selectedChatId === currConversation._id ? "bg-slate-200" : ""
      }`}
      onClick={() => {
        dispatch(setSelectedConversation(currConversation));
      }}
    >
      <div className="avatar">
        <img
          className="rounded-full object-cover h-12 w-12"
          src={profileImg}
          alt="user avatar"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="font-bold text-blue-500">{name}</div>
          <div className="text-sm text-black">
            {getTimeAgo(lastMessage.createdAt)}
          </div>
        </div>
        {lastMessage && <div className="text-sm text-black overflow-hidden overflow-ellipsis">
          {truncateMessage(lastMessage.content, 30)}{" "}
        </div>
        }
      </div>
    </div>
  );
};

export default ConversationItem;
