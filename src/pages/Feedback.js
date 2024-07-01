/* eslint-disable */
import React, { useState } from "react";
import Layoutalt from "../components/Layout/Layoutalt";
import PageHeader from "../components/PageHeader";
import { useSelector } from "react-redux";
import { request } from "../util/fetchAPI";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { name, profileImg } = user;
  const message = "Feedback sent successfully!";
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "content-type": "application/json",
    };
    await request("/feedback/send", "POST", headers, {
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
            <span className="justify-center text-green-500 ml-20">
              {message}
            </span>
          )}
          <div className="flex flex-row justify-center">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onChange={() => setRating(currentRating)}
                    className="hidden"
                  />
                  <span
                    className={`cursor-pointer text-4xl ${
                      currentRating <= (hover || rating)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setRating(currentRating)}
                  >
                    &#9733;
                  </span>
                </label>
              );
            })}
          </div>
          <textarea
            className="border rounded-md p-2 mt-4"
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
