import React, { useState, useEffect, useRef } from "react";
import HeroPicMob from "../assets/hero.png";
import HeroPicPc from "../assets/heroEdit.png";
import NavBarMain from "../components/navbars/main";
function Landing() {
  return (
    <React.Fragment>
      <Hero />
      <div className="w-full h-screen"></div>
    </React.Fragment>
  );
}

function Hero() {
  return (
    <React.Fragment>
      <NavBarMain />
      <div className="bg-white w-full h-screen">
        <div className="w-full h-screen absolute overflow-hidden">
          <img
            src={HeroPicMob}
            alt={"Hero Picture"}
            className="w-full h-screen absolute object-cover object-center block md:hidden"
          />
          <img
            src={HeroPicPc}
            alt={"Hero Picture"}
            className="w-full h-screen absolute object-cover hidden md:block"
          />
          <div className="absolute w-full h-screen opacity-60 bg-theme-0"></div>
        </div>
        <div className="relative bg-transparent w-full h-screen z-20 flex flex-col items-center justify-end">
          <div className="w-full h-[80vh] flex flex-col items-center justify-start gap-20">
            <h1 className="text-6xl md:text-[150px]  text-theme-40 text-center">
              Fusion Mania
            </h1>
            <p className="text-white text-[30px] md:text-[40px] pt-20">
              Lead your Destiny
            </p>
            <p
              className="p-4 bg-theme-40 rounded-lg text-white text-[20px]  md:text-[20px] absolute bottom-10 hover:cursor-pointer hover:bg-white hover:text-theme-40 transition-all ease-in-out duration-300"
              onClick={() => {
                window.location.assign("/login");
              }}
            >
              Start your Journey
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Landing;
