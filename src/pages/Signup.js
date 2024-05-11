/* eslint-disable */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { AiFillEye } from "react-icons/ai";
import { request } from "../util/fetchAPI";
import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";
import OAuth from "../components/OAuth";
import sideImg from "../assets/signin-house.jpg";
import avatar from "../assets/avatar.jpg";
import { FaEyeSlash } from "react-icons/fa6";

const Signup = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [state, setState] = useState({});
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState("");
  const [displayedImages, setDisplayedImages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onChangeHandler = (e) => {
    setDisplayedImages([]);
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setDisplayedImages([{ url: imageUrl }]);
    setPhoto(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let filename = null;
      if (photo) {
        console.log(photo[0]);
        if (photo[0].type !== "image/jpeg") {
          setError("Only .jpg profile pictures are allowed."); // Set error message
          return;
        }
        const formData = new FormData();
        filename = crypto.randomUUID() + photo[0].name;
        formData.append("image", photo[0], filename);
        await request("/upload/image", "POST", {}, formData, true);
      } else {
        return;
      }

      const headers = {
        "Content-Type": "application/json",
      };
      const responseData = await request("/auth/register", "POST", headers, {
        ...state,
        profileImg: filename,
      });
      dispatch(register(responseData));
      navigate("/signin");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="relative">
          <img
            className="w-3/4 object-cover mt-24 ml-16"
            src={sideImg}
            alt="sideImg"
          />
          <div className="absolute right-0 top-1/4 w-px bg-gray-300 h-1/2"></div>
        </div>
        <div className="flex flex-col justify-center">
          <form
            className="max-w-[400px] w-full mx-auto rounded-lg p-4"
            onSubmit={handleSubmit}
          >
            <h3 className="text-4xl font-bold text-center">Sign Up</h3>
            {error && <p className="text-red-600 p-2 text-center">{error}</p>}
            <div className="flex flex-col">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="rounded-lg bg-[#C3ECDB] p-2 focus:bg-[#8bd8b8] focus:outline-none"
                onChange={handleState}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="exampleInputName1" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="rounded-lg bg-[#C3ECDB] p-2 focus:bg-[#8bd8b8] focus:outline-none"
                onChange={handleState}
              />
            </div>
            <div className="flex flex-row items-center py-2 space-x-4">
              <label htmlFor="photo" className="form-label">
                Upload Photo
              </label>
              <input
                type="file"
                id="photo"
                className="hidden"
                onChange={onChangeHandler}
              />
              {displayedImages.length > 0 ? (
                <img
                  src={displayedImages[0].url}
                  className="h-[80px] w-[80px] rounded-full cursor-pointer"
                  alt="Selected"
                  onClick={() => document.getElementById("photo").click()}
                />
              ) : (
                <label htmlFor="photo" className="cursor-pointer">
                  <img
                    src={avatar}
                    className="h-[80px] w-[80px] rounded-full"
                    alt="Avatar"
                  />
                </label>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlfor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <div className="bg-[#C3ECDB] rounded-lg flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="rounded-lg bg-[#C3ECDB] p-2 focus:bg-[#8bd8b8] focus:outline-none flex-grow"
                  onChange={handleState}
                />
                <button
                  onClick={() => {
                    setshowPassword((prevState) => !prevState);
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
              Signup
            </button>
            <div className="flex justify-between mt-2">
              <p className="hover:underline">
                <Link to="/signin">Already a user? Login</Link>
              </p>
            </div>
            <hr className="my-4 border-t-2" />
            <OAuth />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
