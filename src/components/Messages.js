import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { request } from "../util/fetchAPI";
import { setSelectedConversation, addNewMessage } from "../redux/chatSlice";
import { useSocketContext } from "../context/SocketContext";

const Messages = () => {
  const { messages, receiverId, newMessage } = useSelector(
    (state) => state.chat
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(addNewMessage(newMessage));
    });

    return () => socket?.off("newMessage");
  }, [socket, dispatch]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!messages) {
        setLoading(true);
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const res = await request(
            `/conversations/getConvByUsers/${receiverId}`,
            "GET",
            headers
          );
          if (res) {
            dispatch(setSelectedConversation(res));
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMessages();
  }, [receiverId, token, messages, dispatch]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <div>Loading...</div>}
      {!loading && (!messages || messages.length === 0) && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
      {!loading &&
        messages &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message messageId={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
