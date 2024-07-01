/* eslint-disable */
import React,{useState, useEffect} from "react";
import { FaStar } from "react-icons/fa";
import { imageDb } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const TestimonialCard = ({ name, feedback, profileImg, rating }) => {
  const [imgSrc, setImgSrc] = useState("");
  const storageRef = ref(imageDb, "images");
  useEffect(()=>{
    const setProfileImg = async () => {
      profileImg.includes("https://lh3.googleusercontent.com")
        ? setImgSrc(profileImg)
        : setImgSrc(await getDownloadURL(ref(storageRef, profileImg)));
    };
    setProfileImg();
  },[])
  
    return (
      <div className="w-3/4 rounded shadow-lg bg-white p-4 block object-cover ">
        <img
          className="w-12 h-12 rounded-full mx-auto mb-4"
          src={imgSrc}
          alt={name}
        />
        <div className="text-center">
          <p className="text-gray-900 leading-none text-lg font-bold">{name}</p>
          <div className="flex justify-center mt-2">
            {Array.from({ length: rating }, (_, i) => (
              <span className="text-yellow-500 text-3xl">&#9733;</span>
              
            ))}
          </div>
          <hr className=" w-[75%] mx-auto mt-4 bg-gray-100 h-1 border-0 rounded dark:bg-gray-700" />
          <p className="mt-4 text-gray-700 text-base">{feedback}</p>
        </div>
      </div>
    );
};

export default TestimonialCard;
