import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/auth.png";
function Verify() {
  const [textColor, setTextColor] = useState("#e5e7eb");
  const [bgColor, setBgColor] = useState("#29596B");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(true);
  return (
    <React.Fragment>
      <NavBarMain />
      <NavBarMain mode={1} />
      <div className="w-full h-screen relative overflow-hidden">
        <div className="absolute flex flex-col items-center justify-center w-full h-screen md:h-screen overflow-hidden">
          <img src={LoginPic} className="absolute object-cover h-full w-full" />
          <div className="w-full h-full bg-theme-0 opacity-70 absolute"></div>
        </div>
        <div className="w-full h-screen flex flex-col items-center justify-end z-10">
          <div className="w-full h-[75vh] flex flex-col items-center justify-start z-10 gap-10">
            <h1 className="text-[60px] text-theme-50">Verify your Account</h1>
            <p
              className={`text-white text-[30px] p-2 rounded-lg bg-[#29596B] hover:bg-white hover:text-[#29596B] border-2 border-[#29596B] transition-all ease-in-out duration-300 hover:cursor-pointer`}
            >
              Send Verification
            </p>
            <p
              className={`text-white text-[30px] p-2 rounded-lg bg-[#29596B] hover:bg-white hover:text-[#29596B] border-2 border-[#29596B] transition-all ease-in-out duration-300 hover:cursor-pointer`}
            >
              Check Verification
            </p>
            <p
              className={
                sent
                  ? "text-white text-[30px] p-2 rounded-lg bg-theme-30 absolute bottom-10"
                  : "hidden"
              }
            >
              Mail Sent Successfully
            </p>
            <p
              className={
                error
                  ? "text-white text-[30px] p-2 rounded-lg bg-theme-50 absolute bottom-10"
                  : "hidden"
              }
            >
              Account Not Verified
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Verify;
