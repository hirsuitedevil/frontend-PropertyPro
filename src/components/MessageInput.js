import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { request } from "../util/fetchAPI";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const { participants, receiverId } = useSelector((state) => state.chat);
  let receiverIdcpy;
  if (!receiverId && participants) {
    receiverIdcpy = participants.find((id) => id !== user._id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    setLoading(true);
    setError(null);

    const headers = {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`,
    };
    try {
      if(receiverId){
        await request(
          `/messages/send/${receiverId}`,
          "POST",
          headers,
          { content: message }
        );
      }else{
        await request(
          `/messages/send/${receiverIdcpy}`,
          "POST",
          headers,
          { content: message }
        );
      }      
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          disabled={loading}
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

export default MessageInput;
