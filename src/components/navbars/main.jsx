import React, { useState, useEffect } from "react";

function NavBarMain() {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    setScroll(window.scrollY);
    console.log("run");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`h-[19vh] w-full fixed top-0 ${
        scroll > 60 ? "bg-black" : "bg-transparent"
      } z-50 flex flex-row items-center justify-between `}
    >
      <div className="h-full w-[60%]  md:w-[30%] flex flex-col items-start justify-center">
        <p className="text-xl md:text-3xl text-white nav ml-4">Fusion Mania</p>
      </div>
      <div className="h-full w-[10%] md:w-[40%] flex flex-col items-center justify-center">
        <p className="text-theme-40 nav text-4xl  md:block hidden">
          Made by Arinji
        </p>
      </div>
      <div className="h-full w-[60%] md:w-[30%] flex flex-col items-end justify-center">
        <p className="mr-2 md:mr-4 text-theme-40 bg-white p-2 md:pl-4 md:pr-4 text-lg md:text-2xl rounded-lg hover:text-white hover:bg-theme-40 transition-all ease-in-out duration-300">
          Start your Journey
        </p>
      </div>
    </div>
  );
}

export default NavBarMain;
