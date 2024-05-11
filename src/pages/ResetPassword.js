/* eslint-disable */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { request } from "../util/fetchAPI";
import { AiFillEye } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmpassword) {
        setMessage("Passwords do not match");
        return;
      }
      const headers = {
        "Content-Type": "application/json",
      };
      await request(`/auth/reset-password/${id}/${token}`, "POST", headers, {
        password,
      });
      setMessage("Password reset successfully");
      setTimeout(() => {
        setMessage("");
        navigate("/signin");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="bg-[url('./assets/grid-bg.png')] bg-cover bg-center p-12 h-screen">
        <form
          className="max-w-[400px] mx-auto rounded-lg p-8 px-8 mt-16"
          onSubmit={onsubmitHandler}
        >
          <h3 className="text-4xl font-bold text-center">Reset Password</h3>
          {message && <p className="text-red-600 p-2 text-center">{message}</p>}
          <div className="flex flex-col p-4 font-medium">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <div className="bg-[#C3ECDB] rounded-lg flex items-center w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="rounded-lg bg-[#C3ECDB] p-2 focus:bg-[#8bd8b8] focus:outline-none flex-grow"
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }} // Ensure input field fills the container
              />
              <button
                onClick={() => {
                  setShowPassword((prevState) => !prevState);
                }}
                className="p-2"
                style={{ minWidth: "40px" }} // Consistent size for the toggle button
              >
                {showPassword ? <AiFillEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex flex-col p-4 font-medium">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              className="rounded-lg bg-[#C3ECDB] p-2 focus:bg-[#8bd8b8] focus:outline-none flex-grow"
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 shadow-md text-white font-semibold rounded-lg"
          >
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ResetPassword;
