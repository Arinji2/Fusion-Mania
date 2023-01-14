import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/auth.png";
import { Link } from "react-router-dom";
function Create() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <React.Fragment>
      <NavBarMain mode={1} />
      <div className="w-full h-screen relative overflow-hidden">
        <div className="absolute flex flex-col items-center justify-center w-full h-screen md:h-screen overflow-hidden">
          <img
            src={LoginPic}
            className="absolute object-cover h-full w-full object-center"
          />
          <div className="w-full h-full bg-theme-0 opacity-70 absolute"></div>
        </div>
        <div className="w-full h-screen flex flex-col items-center justify-end">
          <div className="w-full min-h-[75vh] flex flex-row items-start justify-between z-10">
            <div className="md:w-[50%] w-full  h-full flex flex-col items-center justify-end md:justify-center mt-10 md:mt-0">
              <h1 className="text-5xl md:text-7xl text-theme-40">
                Create your Account
              </h1>
              <div className="w-full h-full flex flex-col items-center md:items-end justify-start">
                <div className="flex flex-col items-start justify-start text-white mt-10 md:mt-20 w-[90%] md:mr-5">
                  <p className="text-[30px]">Email</p>
                  <input
                    type={"email"}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="false"
                    className="rounded-lg min-h-[42px] w-full text-[20px] p-4 outline-none  bg-[#29596B] text-left"
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col items-start justify-start text-white mt-10 md:mt-20 w-[90%] md:mr-5">
                  <p className="text-[30px]">Password</p>
                  <div className="flex flex-row items-center justify-evenly w-full">
                    <input
                      type={"password"}
                      autoCapitalize="off"
                      autoComplete="off"
                      spellCheck="false"
                      className="rounded-lg min-h-[42px] w-full text-[20px] p-4 outline-none  bg-[#29596B] text-left"
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="w-full flex flex-row items-center justify-evenly mt-10 gap-5">
                  <p className="text-white p-2 md:pr-4 md:pl-4 rounded-lg bg-theme-30 text-[15px] md:text-[25px] hover:text-theme-30 hover:bg-white border-2 border-theme-30 transition-all ease-in-out duration-300 hover:cursor-pointer">
                    Create
                  </p>
                  <Link to="/login">
                    <p className="text-white p-2 md:pr-4 md:pl-4 rounded-lg bg-theme-30 text-[15px] md:text-[25px] hover:text-theme-30 hover:bg-white border-2 border-theme-30 transition-all ease-in-out duration-300 hover:cursor-pointer">
                      Login Instead
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Create;