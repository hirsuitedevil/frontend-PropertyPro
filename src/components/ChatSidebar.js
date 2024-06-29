import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { request } from "../util/fetchAPI";
import ConversationItem from "./conversationItem";

const ChatSidebar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { selectedChatId, newMessage } = useSelector((state) => state.chat);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  const [allConversations, setAllConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      const headers = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const response = await request("/conversations/all", "GET", headers);

      const conversationsWithLastMessage = await Promise.all(
        response.map(async (conversation) => {
          const lastMessageId =
            conversation.messages[conversation.messages.length - 1];
          const lastMessage = await request(
            `/messages/getMsgById/${lastMessageId}`,
            "GET",
            headers
          );
          return { ...conversation, lastMessage };
        })
      );

      conversationsWithLastMessage.sort(
        (a, b) =>
          new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
      );

      setAllConversations(conversationsWithLastMessage);
    };

    getConversations();
  }, [user, token, selectedChatId, newMessage]);

  return (
    <div className="flex flex-col bg-white w-1/4 p-4 border-r border-t h-screen">
      {allConversations.length>0 ? allConversations.map((conversation, index) => (
        <ConversationItem
          key={index}
          conversationUser={conversation.participants.find(
            (participant) => participant !== user._id
          )}
          lastMessage={conversation.lastMessage}
        />
      )): "No Conversations Yet"}
    </div>
  );
};

export default ChatSidebar;
