/* eslint-disable */
import { React, useState, useEffect } from "react";
import Header from "../components/Layout/Header";
import NotificationButton from "../components/NotificationButton";
import { IoMdArrowBack, IoMdBed } from "react-icons/io";
import { FaShare, FaHeart, FaChair, FaParking } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../util/fetchAPI";
import Spinner from "../components/Spinner";
import ImgSlider from "../components/ImgSlider";
import ListingImgCard from "../components/ListingImgCard";
import Modal from "../components/Modal";
import { FaBath, FaLocationDot } from "react-icons/fa6";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import MapComponent from "../components/MapComponent";
import ProfileImg from "../components/ProfileImg";
import { MdOutlineMessage } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profileImgSrc, setProfileImgSrc] = useState("");
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await request(
          `/property/find?id=${params.propertyId}`,
          "GET",
          { "Content-Type": "application/json" }
        );
        if (res.success === false) {
          setLoading(false);
          return;
        }
        setListing(res);
        if (res) {
          let profileImageSrc = res.currentOwner.profileImg.includes(
            "https://lh3.googleusercontent.com"
          )
            ? res.currentOwner.profileImg
            : `${process.env.REACT_APP_BACKEND_URL}/images/${res.currentOwner.profileImg}`;
          setProfileImgSrc(profileImageSrc);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.propertyId]);

  const tabs = [
    {
      name: "Overview",
    },
    {
      name: "Location",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      {loading && <Spinner />}
      {listing && !loading && (
        <div className="mx-auto px-4">
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 m-2">
              <NotificationButton
                icon={IoMdArrowBack}
                onClick={() => navigate(-1)}
              />
              <h3 className="text-3xl font-medium px-3">Detail</h3>
            </div>
            <div className="flex gap-4 m-2">
              <NotificationButton
                icon={FaShare}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
              <NotificationButton
                icon={FaHeart}
                onClick={() => {
                  console.log("Heart clicked");
                }}
              />
            </div>
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="grid grid-cols-4 h-96">
            <div className="col-span-2 h-96">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/images/${listing.img[0]}`}
                alt="exterior image"
                className="h-full w-full rounded-2xl"
              />
            </div>
            <div className="h-96">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/images/${listing.img[1]}`}
                alt="interior image"
                className="h-1/2 w-full p-2 rounded-2xl"
              />
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/images/${listing.img[2]}`}
                alt="exterior image"
                className="h-1/2 w-full rounded-2xl p-2"
              />
            </div>
            <div className="h-96">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/images/${listing.img[3]}`}
                alt="exterior image"
                className="h-1/2 w-full rounded-2xl p-2"
              />
              <div className="relative h-1/2 w-full p-2">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${listing.img[4]}`}
                  alt="Bathroom"
                  className="h-full w-full rounded-2xl object-cover"
                />
                <button onClick={handleOpen}>
                  <div className="absolute top-2 left-2 right-2 bottom-2 flex items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-50 rounded-2xl">
                    {listing.img.length - 5}+
                  </div>
                </button>
                {open && (
                  <Modal isOpen={open} close={handleClose}>
                    <ImgSlider
                      items={listing.img.map((src) => ({ src }))}
                      CardComponent={ListingImgCard}
                    />
                  </Modal>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-2/3 mt-4">
              <h3 className="text-3xl font-medium px-3">{listing.title}</h3>
              <div className="flex place-content-between">
                <div className="flex gap-3 items-center text-slate-600">
                  <p className="flex gap-1 items-center font-semibold text-base m-2">
                    <IoMdBed className="h-6 w-6" />
                    {listing.bedrooms}
                    <span>
                      {listing.bedrooms > 1 ? ` bedrooms` : `bedroom`}
                    </span>
                  </p>
                  <p className="flex gap-1 items-center font-semibold text-sm">
                    <FaBath className="h-6 w-6" />
                    {listing.bathrooms}
                    <span>
                      {listing.bathrooms > 1 ? ` bedrooms` : `bedroom`}
                    </span>
                  </p>
                  <p className="flex gap-1 items-center font-semibold text-sm">
                    <HiOutlineArrowsExpand className="h-6 w-6" />
                    {listing.area} ft²
                  </p>
                  <p className="flex gap-1 items-center font-semibold text-sm">
                    <FaParking className="h-6 w-6" />
                    {listing.parking ? "Yes" : "No"}
                  </p>

                  <p className="flex gap-1 items-center font-semibold text-sm">
                    <FaChair className="h-6 w-6" />
                    {listing.furnished ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex gap-1 items-center p-1 mr-2">
                  <FaLocationDot className="h-5 w-5 text-green-500" />
                  <p className="text-slate-500 font-semibold text-lg">
                    {listing.city}, {listing.country}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4 border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`px-4 py-2 text-base font-semibold ${
                        activeTab === tab.name
                          ? "bg-white text-green-500 border-2 border-green-500 rounded-md shadow-lg z-20"
                          : "text-gray-700 border-gray-300"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
                <div>
                  {activeTab === "Overview" ? (
                    <p className="p-2 text-lg text-slate-500">{listing.desc}</p>
                  ) : (
                    <div>
                      <p className="mb-4 font-semibold text-base">
                        Address:{" "}
                        <span className="text-slate-500">
                          {listing.address}
                        </span>
                      </p>
                      <MapComponent
                        latitude={listing.latitude}
                        longitude={listing.longitude}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/3 m-4">
              <div className="p-4 border-2 rounded-lg">
                <p className="text-slate-500 font-medium m-2 text-xl">
                  {listing.type === "Rent" ? "Rent" : "Buy"} with the price
                </p>
                <span className="text-3xl font-semibold text-green-500 m-2">
                  Rs{" "}
                  {listing.offer
                    ? listing.discountedPrice
                    : listing.regularPrice}
                </span>
                <span className="text-xs font-semibold text-green-500">
                  {listing.type === "Rent" ? "/Month" : ""}
                </span>
                <hr className="w-[98%] border-1 mt-2" />
                {listing.offer ? (
                  <div>
                    <p className="text-slate-500 font-medium m-2 text-xl">
                      Market Price based on location
                    </p>
                    <div className="flex place-items-center">
                      <span className="text-2xl font-semibold m-2">
                        Rs {listing.offer ? listing.regularPrice : ""}
                      </span>
                      <span className="text-xs font-semibold">
                        {listing.type === "Rent" ? "/Month" : ""}
                      </span>
                      <div className="flex ml-4 place-items-center">
                        <BiSolidOffer className="text-green-500 h-5 w-5" />
                        <span className="ml-2 text-green-500 font-semibold">
                          {Math.round(
                            (100 *
                              (+listing.regularPrice -
                                listing.discountedPrice)) /
                              listing.regularPrice
                          )}
                          % cheaper
                        </span>
                      </div>
                    </div>

                    <hr className="w-[98%] border-1 mt-2" />
                  </div>
                ) : (
                  ""
                )}
                <div className="mt-4 rounded-lg border-2 p-2 flex justify-between place-content-center w-[98%]">
                  <div className="flex place-items-center">
                    <ProfileImg src={profileImgSrc} />
                    <div className="ml-4">
                      <p className="text-base font-semibold">
                        {listing.currentOwner.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {listing.type === "Rent" ? "Landlord" : "Seller"}
                      </p>
                    </div>
                  </div>
                  <NotificationButton
                    icon={MdOutlineMessage}
                    onClick={() => console.log("Text Message clicked")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
