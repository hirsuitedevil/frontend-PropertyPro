/* eslint-disable */
import React,{useState, useEffect} from "react";
import sampleImage from "../assets/images.jpg";
import Slider from "./Slider";
import TestimonialCard from "./TestimonialCard";
import { request } from "../util/fetchAPI";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      const headers = {
        "content-type": "application/json",
      };
      try {
        const res = await request("/feedback/get", "GET", headers);
        console.log(res);
        setTestimonials(res);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);
  return (
    <div
      className="p-8"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #7DAD0D 0%, #C3ECDB 0%, #FFFFFF 57%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id = "testimonials"
    >
      <div className="max-w-7xl mx-auto text-center py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Those who have realized their dream
        </h1>
        <h1 className="text-4xl font-bold text-gray-900 p-2">
          home with PropertyPro
        </h1>
        <p className="mt-2 text-lg leading-6 text-gray-700">
          As a platform specifically designed for people who want to buy or rent
          a house, we provide services that
        </p>
        <p className="mt-2 text-lg leading-6 text-gray-700">
          can help serve the idea of the house you want.
        </p>
      </div>

      <Slider items={testimonials} CardComponent={TestimonialCard} />
    </div>
  );
};

export default Testimonials;
