/* eslint-disable */
import { React, useState } from "react";
import Layoutalt from "../components/Layout/Layoutalt";
import PageHeader from "../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { request } from "../util/fetchAPI";
import Spinner from "../components/Spinner";
const EditProperty = () => {
  const API_URL = "http://localhost:5000"
  const { user, token } = useSelector((state) => state.auth);
  const [listing, setListing] = useState(null);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialImages, setInitialImages] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
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
      setFormData({
        ...formData,
        useRef: user._id,
      });
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
  useEffect (() =>{
    setLoading(true);
  const fetchListing = async() =>{
    const options = {
      "Content-Type":"application/json"
    }
    const response  = await request(`/property/find?id=${params.propertyId}`, "GET", options);
    setListing(response);
    setFormData({ ...response });
    setInitialImages(
      response.img.map((img) => ({ url: `${API_URL}/images/${img}` }))
    );
    setDisplayedImages(
      response.img.map((img) => ({ url: `${API_URL}/images/${img}` }))
    );
    setLoading(false);
  }
  fetchListing();
}
,[params.propertyId, navigate]
);

  const onChangeHandler = (e) => {
    if (e.target.id === "Sale" || e.target.id === "Rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    // files
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setDisplayedImages([...newImages]);
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const onChooseFilesClick = () => {
    setDisplayedImages([]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (images < 6) {
      return;
    }
    let geoLocation = {};
    const loc = address + " , " + city + " , " + country
    const response = await fetch(
      `https://geocode.search.hereapi.com/v1/geocode?q=${loc}&apiKey=quhVrdb2B-bvrDCtO1tp14k3VKC4-6nGCh9BuZUBQTA`
    );
    const dat = await response.json();
    geoLocation.lat = dat.items[0].position.lat;
    geoLocation.lng = dat.items[0].position.lng;
    let filenames = [];
    const formData1 = new FormData();
    let deleteImages = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const filename = crypto.randomUUID() + images[i].name;
        formData1.append("images", images[i], filename);
        filenames.push(filename);
        deleteImages = initialImages.map((image) => {
          return image.url.split("/").pop();
        });
      }
    } else {
      filenames = initialImages.map((image) => {
        return image.url.split("/").pop();
      });
    }
    await request(`/upload/image/property`, "POST", {}, formData1, true);
    try {
      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const data = await request(
        `/property/${params.propertyId}`,
        "PUT",
        options,
        {
          ...formData,
          img: filenames,
          latitude: geoLocation.lat,
          longitude: geoLocation.lng,
        }
      );
      if (data) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const res = await request(`/upload/deleteImages`, "DELETE", headers, {
          filenames: deleteImages,
        });
        navigate(`/category/${formData.type}/${data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <Layoutalt>
      <div>
        <PageHeader
          title={"Edit Listing"}
          subtitle={"Edit all the details about your existing property"}
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
                The first image will be the cover (atleast 6)
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
                onClick={onChooseFilesClick}
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
              {loading ? "Editing..." : "Edit listing"}
            </button>
          </div>
        </form>
      </div>
    </Layoutalt>
  );
};

export default EditProperty;