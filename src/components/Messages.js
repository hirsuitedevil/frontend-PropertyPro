import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { request } from "../util/fetchAPI";
import { setSelectedConversation, addNewMessage } from "../redux/chatSlice";
import { useSocketContext } from "../context/SocketContext";

const Messages = () => {
  const { messages, receiverId, newMessage } = useSelector((state) => state.chat);
  const lastMessageRef = useRef(null);
  const {token} = useSelector((state)=>(state.auth));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(addNewMessage(newMessage));
    });
    return () => socket?.off("newMessage");
  }, [socket, messages]);

  useEffect(() => {
    const MessageControl = async()=>{
      if (messages && messages.length > 0) {
        setTimeout(() => {
          lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else if (!messages) {
        setLoading(true);
        const headers = {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${token}`,
        };
        const res = await request(
          `/conversations/getConvByUsers/${receiverId}`,
          "GET",
          headers
        );
        if(res){
          dispatch(setSelectedConversation(res));
        }
        setLoading(false);
      }
    }
    MessageControl();
  }, [messages, newMessage]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && <div>Loading...</div>}
      {!loading && (!messages || messages.length === 0) && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
      {!loading &&
        messages &&
        messages.length > 0 &&
        messages.map((messageId, index) => (
          <div
            key={messageId}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message messageId={messageId} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
