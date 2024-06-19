import React, { useState, useEffect } from "react";
import Layoutalt from "../components/Layout/Layoutalt";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../util/fetchAPI";
import { imageDb } from "../firebase/firebase";
import {
  uploadBytesResumable,
  ref,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

const AddProperty = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "Rent",
    title: "",
    desc: "",
    area: 1,
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: [],
    latitude: 0,
    longitude: 0,
    city: "",
    country: "",
  });
  const {
    type,
    title,
    desc,
    area,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
    city,
    country,
  } = formData;

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        useRef: user._id,
      }));
    } else {
      navigate("/signin");
    }
  }, [user, navigate]);

  const handleRemoveImage = (index) => {
    const filteredImages = displayedImages.filter((_, i) => i !== index);
    setDisplayedImages(filteredImages);
    setFormData((prevState) => ({
      ...prevState,
      images: filteredImages.map((img) => img.file),
    }));
  };

  const onChangeHandler = (e) => {
    if (e.target.id === "Sale" || e.target.id === "Rent") {
      setFormData((prevState) => ({
        ...prevState,
        type: e.target.id,
      }));
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.checked,
      }));
    }

    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setDisplayedImages(
        filesArray.map((file) => ({
          file,
          url: URL.createObjectURL(file),
        }))
      );
      setFormData((prevState) => ({
        ...prevState,
        images: filesArray,
      }));
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (images.length < 6) {
      alert("Please upload at least 6 images");
      return;
    }

    setLoading(true);

    let geoLocation = {};
    const loc = `${address}, ${city}, ${country}`;
    try {
      const response = await fetch(
        `https://geocode.search.hereapi.com/v1/geocode?q=${loc}&apiKey=${process.env.REACT_APP_HEREMAPS_APIKEY}`
      );
      const data = await response.json();
      geoLocation.lat = data.items[0].position.lat;
      geoLocation.lng = data.items[0].position.lng;
    } catch (error) {
      console.error("Geocoding error:", error);
      setLoading(false);
      return;
    }

    let filenames = [];
    try {
      for (const file of images) {
        const filename = `${crypto.randomUUID()}${file.name}`;
        const imgRef = ref(imageDb, `images/${filename}`);
        await uploadBytesResumable(imgRef, file);
        filenames.push(filename);
      }
      setUploadedImages(filenames);
    } catch (error) {
      console.error("Image upload error:", error);
      setLoading(false);
      return;
    }

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await request(`/property`, "POST", options, {
        ...formData,
        img: filenames,
        latitude: geoLocation.lat,
        longitude: geoLocation.lng,
      });
      if (response) {
        navigate("/properties");
      }
    } catch (error) {
      console.error("Property creation error:", error);
      for (const img of filenames) {
        const imgRef = ref(imageDb, `images/${img}`);
        await deleteObject(imgRef);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layoutalt>
      <div>
        <PageHeader
          title={"Create Listing"}
          subtitle={"Add all the details about your property"}
        />
        <hr />
        <form className="grid grid-cols-2 gap-4 p-4" onSubmit={onSubmitHandler}>
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Title"
              className="border p-3 rounded-lg"
              id="title"
              maxLength={62}
              minLength={10}
              required
              onChange={onChangeHandler}
              value={title}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="desc"
              required
              onChange={onChangeHandler}
              value={desc}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
              onChange={onChangeHandler}
              value={address}
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="City"
                className="border p-3 rounded-lg"
                id="city"
                required
                onChange={onChangeHandler}
                value={city}
              />
              <input
                type="text"
                placeholder="Country"
                className="border p-3 rounded-lg"
                id="country"
                required
                onChange={onChangeHandler}
                value={country}
              />
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="Sale"
                  className="w-5"
                  onChange={onChangeHandler}
                  checked={type === "Sale"}
                  name="type"
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="Rent"
                  className="w-5"
                  onChange={onChangeHandler}
                  checked={type === "Rent"}
                  name="type"
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={onChangeHandler}
                  checked={parking}
                  name="parking"
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={onChangeHandler}
                  checked={furnished}
                  name="furnished"
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={onChangeHandler}
                  checked={offer}
                  name="offer"
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={onChangeHandler}
                  value={bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={onChangeHandler}
                  value={bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="area"
                  min="1"
                  max="1000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={onChangeHandler}
                  value={area}
                />
                <div className="flex flex-col items-center">
                  <p>Area </p>
                  <span className="text-xs">(sqft)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  name="regularPrice"
                  min="50"
                  max="100000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={onChangeHandler}
                  value={regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {type === "Rent" && (
                    <span className="text-xs">(Rs / month)</span>
                  )}
                </div>
              </div>
              {offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountedPrice"
                    min="0"
                    max={regularPrice}
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                    onChange={onChangeHandler}
                    value={discountedPrice}
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted price</p>
                    {type === "Rent" && (
                      <span className="text-xs">(Rs / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4 ml-24 w-[75%]">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (at least 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300 rounded"
                type="file"
                id="images"
                accept=".jpg,.png,.jpeg"
                multiple
                onChange={onChangeHandler}
                name="images"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {displayedImages.map((image, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center border w-28 h-28"
                >
                  <img
                    src={image.url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              disabled={loading}
              className="p-3 bg-[#b2e3b2] rounded-lg uppercase hover:bg-green-300"
            >
              {loading ? "Creating" : "Create listing"}
            </button>
          </div>
        </form>
      </div>
    </Layoutalt>
  );
};

export default AddProperty;
