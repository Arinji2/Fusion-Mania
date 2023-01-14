import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/auth.png";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
function Forgot() {
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
            <h1 className="text-[60px] text-theme-50">
              Reset your Account Password
            </h1>
            <p
              className={`text-white text-[30px] p-2 rounded-lg bg-[#29596B] hover:bg-white hover:text-[#29596B] border-2 border-[#29596B] transition-all ease-in-out duration-300 hover:cursor-pointer`}
              onClick={() => {
                sendPasswordResetEmail(auth, auth.currentUser.email);
              }}
            >
              Send Email Reset
            </p>
            <Link to="/login">
              <p
                className={`text-white text-[30px] p-2 rounded-lg bg-[#29596B] hover:bg-white hover:text-[#29596B] border-2 border-[#29596B] transition-all ease-in-out duration-300 hover:cursor-pointer`}
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
