import { useState } from 'react'
import React from 'react'
import Layoutalt from '../components/Layout/Layoutalt'
import PageHeader from '../components/PageHeader'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { request } from '../util/fetchAPI'
import { updateName } from "../redux/authSlice";
import { FaEdit } from 'react-icons/fa';
import { MdDoneOutline } from 'react-icons/md';

const Profile = () => {
  const [changeDetails, setchangeDetails] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [photo, setPhoto] = useState("");
  const [displayedImages, setDisplayedImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setformData] = useState({
    name: user.name,
    email: user.email,
    profileImg: user.profileImg,
  });
  const { name, email, profileImg } = formData;

  const onchange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onChangeHandler = (e) => {
    setDisplayedImages([]);
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setDisplayedImages([{ url: imageUrl }]);
    setPhoto(e.target.files);
  };

  const onsubmit = async () => {
    try {
      let filename = profileImg;
      let flag1 = false;

      if (photo) {
        if (photo[0].type !== "image/jpeg") {
          setErrorMessage("Only .jpg profile pictures are allowed.");
          return;
        }

        const formData = new FormData();
        filename = crypto.randomUUID() + photo[0].name;
        formData.append("image", photo[0], filename);
        const data = await request("/upload/image", "POST", {}, formData, true);
        flag1 = true;
      }

      if (user.name !== name || flag1) {
        const response = await request(
          "/auth/update",
          "PUT",
          {
            "Content-Type": "application/json",
          },
          { name, email, profileImg: filename }
        );

        dispatch(updateName(response));

        setDisplayedImages([]);
        setformData((prevState) => ({
          ...prevState,
          name: response.user.name,
          profileImg: response.user.profileImg,
        }));

        if (
          flag1 &&
          !profileImg.includes("https://lh3.googleusercontent.com")
        ) {
          const headers = {
            "Content-Type": "application/json",
          };
          await request(`/upload/deleteImages`, "DELETE", headers, {
            filenames: [profileImg],
          });
        }
        navigate("/profile");
      }
    } catch (error) {
      setErrorMessage("Something went wrong!");
      console.log("Error during profile update:", error);
    }
  };

  return (
    <Layoutalt>
      <PageHeader
        title={"Profile"}
        subtitle={"View and make changes to your profile"}
      />
      <hr />
          </Layoutalt>
  );
}

export default Profile
