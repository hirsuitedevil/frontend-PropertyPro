/* eslint-disable */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { request } from "../util/fetchAPI";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const options = {
        "Content-Type": "application/json",
      };
      const data = await request("/auth/forgot-password", "POST", options, {
        email,
      });
      console.log(data);
      setMessage("Password reset email sent.");
      setTimeout(() => {
        setMessage("");
        navigate("/signin");
      }, 3000);
    } catch (error) {
      setMessage("Email not found");
    }
  };

  return (
    <Layout>
      <div className="bg-[url('./assets/grid-bg.png')] bg-cover bg-center p-12 h-screen">
        <form
          className="max-w-[400px] mx-auto rounded-lg p-8 px-8 mt-16"
          onSubmit={onsubmitHandler}
        >
          <h3 className="text-4xl font-bold text-center">Forgot Password</h3>
          {message && (
            <p
              className={` p-2 text-center ${
                message.includes("sent") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
          <div className="flex flex-col p-4 font-medium">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              className="rounded-lg bg-[#C3ECDB] p-2 focus:bg-[#8bd8b8] focus:outline-none flex-grow"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full mx-4 p-2 bg-green-500 hover:bg-green-600 shadow-md text-white font-semibold rounded-lg"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
