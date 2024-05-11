/* eslint-disable */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { AiFillEye } from "react-icons/ai";
import { request } from "../util/fetchAPI";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import OAuth from "../components/OAuth";
import sideImg from "../assets/signin-house.jpg";
import { FaEyeSlash } from "react-icons/fa6";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const options = {
        "Content-Type": "application/json",
      };
      const data = await request("/auth/login", "POST", options, {
        email,
        password,
      });
      dispatch(login(data));
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid email or password");
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="flex flex-col justify-center">
          <form
            className="max-w-[400px] w-full mx-auto rounded-lg p-8 px-8"
            onSubmit={handleLogin}
          >
            <h3 className="text-4xl font-bold text-center">Sign In</h3>
            {errorMessage && (
              <p className="text-red-600 p-2 text-center">{errorMessage}</p>
            )}
            <div className="flex flex-col py-1">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="rounded-lg bg-[#C3ECDB] p-2 focus:bg-[#8bd8b8] focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col  py-1">
              <label htmlfor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="bg-[#C3ECDB] rounded-lg flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="rounded-lg bg-[#C3ECDB] p-2 focus:bg-[#8bd8b8] focus:outline-none flex-grow"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => {
                    setShowPassword((prevState) => !prevState);
                  }}
                  className="p-2"
                >
                  {showPassword ? <AiFillEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full my-3 py-2 bg-green-500 hover:bg-green-600 shadow-md text-white font-semibold rounded-lg"
            >
              Sign In
            </button>
            <div className="flex justify-between mt-2">
              <p className="hover:underline">
                <Link to="/signup">Sign Up</Link>
              </p>
              <p className="hover:underline">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </p>
            </div>
            <hr className="my-4 border-t-2" />
            <OAuth />
          </form>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-1/4 w-px bg-gray-300 h-1/2"></div>
          <img className="w-3/4 object-cover mt-24 ml-16" src={sideImg} />
        </div>
        <div className=""></div>
      </div>
    </Layout>
  );
};

export default Signin;
