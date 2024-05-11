/* eslint-disable */
import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-cover bg-center p-12">
      <button className="rounded-full bg-green-100 p-3 px-4 text-lime-800 font-semibold">
        About Us
      </button>
      <h1 className="text-4xl font-bold text-gray-900 mt-4">
        Your Partner in Every Step
      </h1>
      <h1 className="text-4xl font-bold text-gray-900 ">of the journey</h1>
      <div className="flex flex-col md:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mt-6">37K+</div>
            <div className="text-base text-gray-500">User Active</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mt-6">40K+</div>
            <div className="text-base text-gray-500">Lender</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mt-6">50K+</div>
            <div className="text-base text-gray-500">Rent House</div>
          </div>
        </div>
        <div className=" text-gray-700 p-2 w-3/5 ml-12">
          <p className="p-2">
            PropertyPro is a platform specifically designed to make it easier
            for people who want to buy a house or rent a house in mutually
            beneficial conditions by using PropertyPro's services. PropertyPro
            with AI technology will make it easier for users and sellers to
            achieve their goals. PropertyPro with AI features will make it
            easier for all user roles.
          </p>
          <p className="p-2">
            From users who want to buy, it will be made easy for those who want
            to find a house according to their criteria by entering the keywords
            they want, besides that users who want to build a house can consult
            with our AI which provides the best solution. In terms of sellers,
            they will also benefit from easy sales traffic because it will be
            suggested by AI for buyers who are looking for a house.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
