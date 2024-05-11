/* eslint-disable */
import React from "react";
import Layout from "../components/Layout/Layout";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
const Homepage = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutUs />
      <Testimonials />
      <FAQ />
    </Layout>
  );
};

export default Homepage;
