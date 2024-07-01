/* eslint-disable */
import React, { useState } from "react";
import Layoutalt from "../components/Layout/Layoutalt";
import PageHeader from "../components/PageHeader";
import StarRating from "../components/StarRating";
import { useSelector } from "react-redux";
import { request } from "../util/fetchAPI";
const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const {user} = useSelector((state)=>state.auth);
  const {name, profileImg} = user;
  const message = "Feedback sent successfully!"
  const [showMessage, setShowMessage] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
        "content-type":"application/json"
    }
    const res = await request("/feedback/send", "POST", headers, {
      feedback,
      rating,
      name,
      profileImg,
    });
    setShowMessage(true);
    setRating(0);
    setFeedback("");
  };

  return (
    <Layoutalt>
      <PageHeader
        title={"Feedback"}
        subtitle={"Provide your honest feedback to help us improve"}
      />
      <div className="justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg p-4 flex flex-col"
          onSubmit={handleSubmit}
        >
          {showMessage && (
            <span className="justify-center text-green-500 ml-20">{message}</span>
          )}
          <StarRating rating={rating} setRating={setRating} />
          <textarea
            className="border rounded-md p-2 mt-2"
            onChange={(e) => setFeedback(e.target.value)}
            value={feedback}
            rows="5"
            placeholder="Enter your feedback here..."
          />

          <button
            type="submit"
            className="mt-2 w-40 bg-green-500 hover:bg-green-600 shadow-md text-white font-semibold rounded-lg self-center"
          >
            Send
          </button>
        </form>
      </div>
    </Layoutalt>
  );
};

export default Feedback;
