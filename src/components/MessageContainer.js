import React,{ useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../util/fetchAPI";

const MessageContainer = () => {
  const { selectedChatId, participants, receiverId, newMessage } = useSelector((state) => state.chat);
  const { user, token } = useSelector((state) => state.auth);
  const [receiverName, setReceiverName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let receiverIdcpy;
  if(!receiverId && participants){
    receiverIdcpy = participants.find((id)=>id!==user._id);
  }

  useEffect(() => {
    const getUserDetails = async () => {
      setLoading(true);
      try {
        const headers = {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`,
        };
        if(receiverId){
          const res = await request(
            `/auth/getUserbyId/${receiverId}`,
            "GET",
            headers
          );
          setReceiverName(res.user.name);
        }else if(receiverIdcpy){
          const res = await request(
             `/auth/getUserbyId/${receiverIdcpy}`,
             "GET",
             headers
          );
          setReceiverName(res.user.name);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
      getUserDetails();
  }, [selectedChatId, receiverId, token, newMessage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    {console.log(error);}
    return <div>Error loading user details: {error.message}</div>;
  }

  return (
    <div className="w-3/4 flex flex-col">
      {!selectedChatId && !receiverId ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{receiverName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-black font-semibold flex flex-col items-center gap-2">
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
