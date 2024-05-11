/* eslint-disable */
import { React, useState, useEffect } from "react";
import Layoutalt from "../components/Layout/Layoutalt";
import FilterBar from "../components/FilterBar";
import PageHeader from "../components/PageHeader";
import CategorySelector from "../components/CategorySelector";
import ListingItem from "../components/ListingItem";
import { useSelector } from "react-redux";
import { request } from "../util/fetchAPI";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [listing, setListing] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchListings = async () => {
      setLoading(true);
      try {
        const allListingsResponse = await request(
          `/property/find/${activeCategory}`,
          "GET",
          options
        );
        const ownedListingsResponse = await request(
          `/property/getByOwner/${activeCategory}?ownerId=${user._id}`,
          "GET",
          options
        );
        const ownedIds = new Set(ownedListingsResponse.map((item) => item._id));
        const unownedListings = allListingsResponse.filter(
          (item) => !ownedIds.has(item._id)
        );

        setListing(unownedListings);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [activeCategory, user._id]);

  const handleLocationChange = () => {
    console.log("Location change triggered");
  };

  const handleFilterChange = () => {
    console.log("Filter change triggered");
  };

  const handleSortChange = () => {
    console.log("Sort change triggered");
  };
  return (
    <Layoutalt>
      <div>
        <div className="flex justify-between w-full items-center">
          <PageHeader
            title={"Overview"}
            subtitle={
              "Overview and find a comfortable real estate for your life"
            }
          />
          <FilterBar
            onLocationChange={handleLocationChange}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </div>
        <CategorySelector
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      <div className="mt-4 ml-2">
        {loading ? (
          <Spinner />
        ) : listing.length > 0 ? (
          <div className="flex flex-wrap">
            {listing.map((list) => (
              <ListingItem listing={list} id={list._id} key={list._id} />
            ))}
          </div>
        ) : (
          <p>No listings for {activeCategory || "the selected category"}</p>
        )}
      </div>
    </Layoutalt>
  );
};

export default Dashboard;
