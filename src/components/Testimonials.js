/* eslint-disable */
import React from "react";
import sampleImage from "../assets/images.jpg";
import Slider from "./Slider";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const testimonials = [
    {
      name: "David Aji",
      role: "Entrepreneur",
      testimonial:
        "Very impressed with Manggen service, very helpful when I wanted to determine the shape of my house.",
      image: sampleImage,
      rating: 5,
    },
    {
      name: "David Aji",
      role: "Entrepreneur",
      testimonial:
        "Very impressed with Manggen service, very helpful when I wanted to determine the shape of my house.",
      image: sampleImage,
      rating: 5,
    },
    {
      name: "David Aji",
      role: "Entrepreneur",
      testimonial:
        "Very impressed with Manggen service, very helpful when I wanted to determine the shape of my house.",
      image: sampleImage,
      rating: 5,
    },
    {
      name: "David Aji",
      role: "Entrepreneur",
      testimonial:
        "Very impressed with Manggen service, very helpful when I wanted to determine the shape of my house.",
      image: sampleImage,
      rating: 5,
    },
    {
      name: "David Aji",
      role: "Entrepreneur",
      testimonial:
        "Very impressed with Manggen service, very helpful when I wanted to determine the shape of my house.",
      image: sampleImage,
      rating: 5,
    },
    {
      name: "David Aji",
      role: "Entrepreneur",
      testimonial:
        "Very impressed with Manggen service, very helpful when I wanted to determine the shape of my house.",
      image: sampleImage,
      rating: 5,
    },
    // More testimonials...
  ];
  return (
    <div
      className="p-8"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #7DAD0D 0%, #C3ECDB 0%, #FFFFFF 57%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
