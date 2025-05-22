import React from "react";
import Navigationbar from "./Navigationbar";
import Navigationbar1 from "./Navigationbar1";
import Carousels from "./Carousels";
import PetList from "./PetList";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Hero from "./Hero";
import {useLocation} from 'react-router-dom'
const Home = () => {

  const location = useLocation();
  const { isUser } = location.state || {};
  return (
    <>
      <Navigationbar />
      <Navigationbar1 />
      <Carousels />
      <HeroSection />
      <PetList />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;
