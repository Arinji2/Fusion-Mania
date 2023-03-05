import React, { useState, useEffect, useContext } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/auth.png";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { authContext } from "../../App";

function Forgot() {
  const authLoc = useContext(authContext);
  return (
    <React.Fragment>
      <NavBarMain />
      <NavBarMain mode={1} />
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute flex h-screen w-full flex-col items-center justify-center overflow-hidden md:h-screen">
          <img src={LoginPic} className="absolute h-full w-full object-cover" />
          <div className="absolute h-full w-full bg-theme-0 opacity-70"></div>
        </div>
        <div className="z-10 flex h-screen w-full flex-col items-center justify-end">
          <div className="z-10 flex h-[75vh] w-full flex-col items-center justify-start gap-10">
            <h1 className="text-[60px] text-theme-50">
              Reset your Account Password
            </h1>
            <p
              className={`rounded-lg border-2 border-[#29596B] bg-[#29596B] p-2 text-[30px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-[#29596B]`}
              onClick={() => {
                sendPasswordResetEmail(auth, authLoc.email);
              }}
            >
              Send Email Reset
            </p>
            <Link to="/login">
              <p
                className={`rounded-lg border-2 border-[#29596B] bg-[#29596B] p-2 text-[30px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-[#29596B]`}
              >
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Forgot;
