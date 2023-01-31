import React, { useState, useEffect, useRef } from "react";
import User from "../../components/navbars/user";
import Materialize from "../../assets/MaterializePage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRandom } from "@fortawesome/fontawesome-free-solid";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { Link } from "react-router-dom";
function Main() {
  const [seed, setSeed] = useState("");
  const [name, setName] = useState("");
  const container = useRef(null);

  const generateAvatar = () => {
    const seed = Math.random();
    const svg = createAvatar(personas, {
      seed: seed,
    });
    localStorage.setItem("seed", seed);
    setSeed(seed);
    container.current.innerHTML = svg;
  };
  const complete = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("completed", false);
    window.location.assign("/materialize/confirm");
  };
  useEffect(() => {
    generateAvatar();
  }, []);
  return (
    <React.Fragment>
      <User />
      <div className="relative h-fit w-full md:h-[87vh]">
        <img
          src={Materialize}
          className="absolute top-0 h-full min-h-screen w-full object-cover md:min-h-full"
        />
        <div className="absolute top-0 z-10 h-full min-h-screen w-full bg-theme-0 opacity-60 md:min-h-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="z-20 mt-10 text-[60px] font-bold text-theme-40">
            Materialize
          </h1>
          <div className="flex h-full w-[90vw] flex-col items-center justify-evenly gap-10 md:flex-row">
            <div className="z-30 mt-10 flex  w-[90vw] flex-col items-center justify-center md:w-[50%]">
              <div className="z-20 flex h-[420px] w-[300px] flex-col items-center justify-center rounded-3xl bg-black md:h-[500px] md:w-[380px]">
                <div
                  ref={container}
                  className="z-30 h-[380px]  w-[340px]"
                ></div>
              </div>
            </div>
            <div className="z-20 mt-10  flex w-[90vw] flex-col items-center justify-center gap-5 md:w-[50%]">
              <p className="z-30 text-[40px] text-white">NickName:</p>
              <input
                type={"text"}
                autoCapitalize="off"
                autoComplete="off"
                spellCheck="false"
                className="h-[71px] w-[90vw] rounded-lg bg-[#29596B] p-4 text-center text-[40px] text-white  outline-none md:w-[350px]"
                onChange={(e) => {
                  e.currentTarget.value = e.currentTarget.value.trim();
                  setName(e.currentTarget.value);
                }}
              />
              <div className="mt-20 flex h-full w-full flex-row items-center justify-evenly">
                <div
                  className="z-20 mb-10 flex h-[80px] w-[40vw] flex-col items-center justify-center rounded-lg bg-theme-30 shadow-xl  shadow-black transition-all duration-300 ease-in-out hover:scale-90 hover:cursor-pointer hover:shadow-md hover:shadow-black md:h-[100px] md:w-[120px]"
                  onClick={generateAvatar}
                >
                  <FontAwesomeIcon
                    icon={faRandom}
                    className="z-30 text-[40px] text-white md:text-[50px]"
                  />
                </div>

                <div
                  className={`z-20 mb-10 flex h-[80px] w-[40vw] flex-col items-center justify-center rounded-lg bg-theme-30 shadow-xl  shadow-black transition-all duration-300 ease-in-out hover:scale-90 hover:cursor-pointer hover:shadow-md hover:shadow-black md:h-[100px] md:w-[120px] ${
                    name.length > 0 ? "visible" : "invisible"
                  }`}
                  onClick={complete}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="z-30 text-[40px] text-white md:text-[50px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Main;
