import React, { useState, useEffect, useRef } from "react";
import HeroPicMob from "../assets/hero.png";
import HeroPicPc from "../assets/heroEdit.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import EndPic from "../assets/End.png";
import NavBarMain from "../components/navbars/main";
import { BrowserRouter, Link } from "react-router-dom";

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
      <div className="h-screen w-full bg-white">
        <div className="absolute h-screen w-full overflow-hidden">
          <img
            src={HeroPicMob}
            alt={"Hero Picture"}
            className="absolute block h-screen w-full object-cover object-center md:hidden"
          />
          <img
            src={HeroPicPc}
            alt={"Hero Picture"}
            className="absolute hidden h-screen w-full object-cover md:block"
          />
          <div className="absolute h-screen w-full bg-theme-0 opacity-60"></div>
        </div>
        <div className="relative z-20 flex h-screen w-full flex-col items-center justify-end bg-transparent">
          <div className="flex h-[80vh] w-full flex-col items-center justify-start gap-20">
            <h1 className="text-center text-6xl  text-theme-40 md:text-[150px]">
              Fusion Mania
            </h1>
            <p className="pt-20 text-[30px] text-white md:text-[40px]">
              Lead your Destiny
            </p>
            <Link
              to="/create"
              className="flex flex-col items-center justify-center"
            >
              <p className="absolute bottom-10 block rounded-lg bg-theme-40  p-4 text-[20px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-40 md:text-[20px]">
                Start your Journey
              </p>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function What() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start gap-10 overflow-hidden bg-theme-10">
      <h2 className="m-2 mt-10 text-[50px] text-white md:text-[60px]">
        What is Fusion Mania
      </h2>
      <p className="m-2 mt-20  text-[20px] text-theme-40 md:text-[30px]">
        Fusion Mania is a Online RNG Game, with Avatars of different rarities
        and appearances. You can choose between merging existing avatars or
        generating new ones, with each avatar being unique.
      </p>
      <div className="absolute -bottom-10  hidden w-full flex-row items-center justify-evenly md:flex">
        <img src={icon1} />
        <img src={icon2} />
        <img src={icon3} />
      </div>
      <div className="bottom-10 flex w-full flex-row items-center justify-evenly md:hidden">
        <img
          src={icon1}
          className="aspect-auto w-[100px] rounded-lg pl-2 shadow-md shadow-black"
        />
        <img
          src={icon2}
          className="aspect-auto w-[100px] rounded-lg shadow-md  shadow-black"
        />
        <img
          src={icon3}
          className="aspect-auto w-[100px] rounded-lg pr-2 shadow-md shadow-black"
        />
      </div>
    </div>
  );
}

function End() {
  return (
    <div className="relative h-screen w-full bg-white">
      <div className="absolute h-screen w-full overflow-hidden">
        <img
          src={EndPic}
          alt={"Hero Picture"}
          className="absolute h-screen w-full object-cover object-center"
        />
        <div className="absolute h-screen w-full bg-theme-0 opacity-60"></div>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="z-10 mt-10 hidden text-[40px] text-theme-50 md:block md:w-[85vw] md:text-[70px]">
          What are you Waiting For?
        </h1>
        <h1 className="z-10 mt-10 text-[40px] text-theme-50 md:mt-0 md:w-[85vw] md:text-[70px]">
          Your Destiny Awaits you
        </h1>
        <Link
          to="/create"
          className="flex flex-col items-center justify-center"
        >
          <p className="absolute bottom-[40%] z-10 rounded-lg bg-theme-40  p-4 text-[20px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-40 md:text-[30px]">
            Start your Journey
          </p>
        </Link>
        <p className="absolute bottom-10 z-10 m-2 text-[20px] text-white md:text-[40px]">
          Powered By: Dicebear Avatars
        </p>
      </div>
    </div>
  );
}
export default Landing;
