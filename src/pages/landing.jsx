import React, { useState, useEffect, useRef } from "react";
import HeroPicMob from "../assets/hero.png";
import HeroPicPc from "../assets/heroEdit.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import EndPic from "../assets/End.png";
import NavBarMain from "../components/navbars/main";

function Landing() {
  return (
    <React.Fragment>
      <Hero />
      <What />
      <End />
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

function What() {
  return (
    <div className="w-full h-screen bg-theme-10 flex flex-col items-center justify-start gap-10 overflow-hidden relative">
      <h2 className="mt-10 text-white text-[50px] md:text-[60px] m-2">
        What is Fusion Mania
      </h2>
      <p className="text-theme-40 text-[20px]  md:text-[30px] mt-20 m-2">
        Fusion Mania is a Online RNG Game, with Avatars of different rarities
        and appearances. You can choose between merging existing avatars or
        generating new ones, with each avatar being unique.
      </p>
      <div className="absolute -bottom-10  flex-row items-center justify-evenly w-full hidden md:flex">
        <img src={icon1} />
        <img src={icon2} />
        <img src={icon3} />
      </div>
      <div className="bottom-10 flex md:hidden flex-row items-center justify-evenly w-full">
        <img
          src={icon1}
          className="w-[100px] aspect-auto shadow-md shadow-black pl-2 rounded-lg"
        />
        <img
          src={icon2}
          className="w-[100px] aspect-auto shadow-md shadow-black  rounded-lg"
        />
        <img
          src={icon3}
          className="w-[100px] aspect-auto shadow-md shadow-black pr-2 rounded-lg"
        />
      </div>
    </div>
  );
}

function End() {
  return (
    <div className="w-full h-screen bg-white relative">
      <div className="w-full h-screen absolute overflow-hidden">
        <img
          src={EndPic}
          alt={"Hero Picture"}
          className="w-full h-screen absolute object-cover object-center"
        />
        <div className="absolute w-full h-screen opacity-60 bg-theme-0"></div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="md:w-[85vw] text-[40px] md:text-[70px] text-theme-50 z-10 mt-10 md:block hidden">
          What are you Waiting For?
        </h1>
        <h1 className="md:w-[85vw] text-[40px] md:text-[70px] text-theme-50 z-10 mt-10 md:mt-0">
          Your Destiny Awaits you
        </h1>
        <p
          className="p-4 bg-theme-40 rounded-lg text-white text-[20px]  md:text-[30px] absolute bottom-[40%] hover:cursor-pointer hover:bg-white hover:text-theme-40 transition-all ease-in-out duration-300 z-10"
          onClick={() => {
            window.location.assign("/login");
          }}
        >
          Start your Journey
        </p>
        <p className="z-10 text-white text-[40px] absolute bottom-10">
          Powered By: Dicebear Avatars
        </p>
      </div>
    </div>
  );
}
export default Landing;
