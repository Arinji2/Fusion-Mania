import React, { useState, useEffect } from "react";
import User from "../../components/navbars/user";
import Materialize from "../../assets/MaterializePage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/fontawesome-free-solid";
function Main() {
  return (
    <React.Fragment>
      <User />
      <div className="w-full md:h-[87vh] h-fit relative">
        <img
          src={Materialize}
          className="absolute top-0 h-full md:min-h-full min-h-screen w-full object-cover"
        />
        <div className="absolute top-0 h-full md:min-h-full min-h-screen w-full bg-theme-0 opacity-60 z-10"></div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-theme-40 text-[60px] z-20 mt-10 font-bold">
            Materialize
          </h1>
          <div className="w-[90vw] h-full flex md:flex-row flex-col items-center justify-evenly gap-10">
            <div className="md:w-[50%] w-[90vw] z-30  mt-10 flex flex-col items-center justify-center">
              <div className="w-[300px] h-[420px] md:w-[380px] md:h-[500px] bg-black z-20 rounded-3xl flex flex-col items-center justify-center">
                <div></div>
              </div>
            </div>
            <div className="md:w-[50%] w-[90vw]  z-20 gap-5 mt-10 flex flex-col items-center justify-center">
              <p className="text-[40px] text-white z-30">NickName:</p>
              <input
                type={"text"}
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                className="w-[90vw] md:w-[350px] h-[71px] text-white text-center text-[40px] rounded-lg outline-none  bg-[#29596B] p-4"
              />
              <div className="w-[40vw] md:w-[120px] h-[80px] md:h-[100px] rounded-lg flex flex-col items-center justify-center bg-theme-30 z-20 mt-20 shadow-xl shadow-black hover:shadow-md hover:shadow-black hover:scale-90 transition-all ease-in-out duration-300 hover:cursor-pointer mb-10">
                <FontAwesomeIcon
                  icon={faRandom}
                  className="text-[40px] md:text-[50px] z-30 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
