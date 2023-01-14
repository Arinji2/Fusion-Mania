import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/login.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <React.Fragment>
      <NavBarMain mode={1} />
      <div className="w-full h-full">
        <div className="absolute flex flex-col items-center justify-center w-full h-[100%] md:h-screen">
          <img
            src={LoginPic}
            className="absolute object-cover h-full w-full object-center"
          />
          <div className="w-full h-full bg-theme-0 opacity-70 absolute"></div>
        </div>
        <div className="w-full h-fit md:h-screen flex flex-col items-center justify-end">
          <div className="w-full h-[75vh] flex flex-row items-start justify-between z-10">
            <div className="w-[50%] md:block hidden"></div>
            <div className="md:w-[50%] w-full  md:h-full flex flex-col items-center justify-end md:justify-center mt-10 md:mt-0">
              <h1 className="text-5xl md:text-7xl text-theme-40">
                Login to your Account
              </h1>
              <div className="w-full h-full flex flex-col items-center md:items-end justify-center">
                <div className="flex flex-col items-start justify-start text-white mt-10 md:mt-20 w-[90%] md:mr-5">
                  <p className="text-[30px]">Email</p>
                  <input
                    type={"email"}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="false"
                    className="rounded-lg h-[42px] w-full text-[20px] p-4 outline-none  bg-[#29596B] text-left"
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  ></input>
                </div>
                <div className="flex flex-col items-start justify-start text-white mt-10 md:mt-20 w-[90%]  md:w-[90%] md:mr-5">
                  <p className="text-[30px]">Password</p>
                  <div className="flex flex-row items-center justify-evenly w-full">
                    <input
                      type={"password"}
                      autoCapitalize="off"
                      autoComplete="off"
                      spellCheck="false"
                      className="rounded-lg h-[42px] w-[70%] text-[20px] p-4 outline-none  bg-[#29596B] text-left"
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                    ></input>
                    <div className="w-[5%]"></div>
                    <p className="text-white p-2 md:pr-4 md:pl-4 rounded-lg bg-[#29596B] text-[15px] md:text-[20px] hover:text-[#29596B] hover:bg-white border-2 border-[#29596B] transition-all ease-in-out duration-300 hover:cursor-pointer">
                      Forgot Password
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-row items-center justify-evenly mt-10 gap-5">
                  <p className="text-white p-2 md:pr-4 md:pl-4 rounded-lg bg-theme-60 text-[15px] md:text-[25px] hover:text-theme-60 hover:bg-white border-2 border-theme-60 transition-all ease-in-out duration-300 hover:cursor-pointer">
                    Login
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
