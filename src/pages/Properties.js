/* eslint-disable */
import { React, useEffect, useState } from "react";
import Layoutalt from "../components/Layout/Layoutalt";
import FilterBar from "../components/FilterBar";
import PageHeader from "../components/PageHeader";
import CategorySelector from "../components/CategorySelector";
import { BsHouseAdd } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../util/fetchAPI";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { imageDb } from "../firebase/firebase";
import { ref, deleteObject } from "firebase/storage";

const Properties = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const handleLocationChange = () => {
    console.log("Location change triggered");
  };

  const handleFilterChange = () => {
    console.log("Filter change triggered");
  };

  const handleSortChange = () => {
    console.log("Sort change triggered");
  };
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const options = {
          "Content-Type": "application/json",
        };
        const response = await request(
          `/property/getByOwner/${activeCategory}?ownerId=${user._id}`,
          "GET",
          options
        );
        setListing(response);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [activeCategory, user]);
  
  const onDelete = async (listingId) => {
    try {
      if (window.confirm("Are you sure you want to delete this listing?")) {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        let deleteImg = [];
        const data = await request(`/property/find?id=${listingId}`, "GET");
        deleteImg = data.img;
        deleteImg.map((deleteImage)=>{
          const Imgref = ref(imageDb, `images/${deleteImage}`); 
          deleteObject(Imgref)
            .then(() => {
              console.log("Image Deleted");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        await request(`/property/delete/${listingId}`, "DELETE", headers);
        setListing((prevListings) =>
          prevListings.filter((listing) => listing._id !== listingId)
        );
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };
  const onEdit = async (listingId) => {
    navigate(`/edit-property/${listingId}`);
  };
  return (
    <Layoutalt>
      <div>
        <div className="flex justify-between items-center w-full">
          <PageHeader
            title={"Your Properties"}
            subtitle={"Manage and view your properties"}
          />
          <FilterBar
            onLocationChange={handleLocationChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="flex justify-between">
          <CategorySelector
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <Link to={"/addproperties"}>
            <button className="mr-2 gap-2 rounded-md font-semibold border-2 w-36 h-10 flex items-center bg-[#b2e3b2] p-2">
              <BsHouseAdd />
              Add Property
            </button>
          </Link>
        </div>
        <div className="mt-4 ml-2">
          {loading ? (
            <Spinner />
          ) : listing && listing.length > 0 ? (
            <>
              <div className="flex">
                {listing.map((list) => (
                  <ListingItem
                    listing={list}
                    id={list._id}
                    key={list._id}
                    onDelete={() => {
                      onDelete(list._id);
                    }}
                    onEdit={() => {
                      onEdit(list._id);
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <p>No listings for {activeCategory || "the selected category"}</p>
          )}
        </div>
      </div>
    </Layoutalt>
  );
};

export default Properties;
