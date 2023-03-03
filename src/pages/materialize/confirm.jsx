import React, { useState, useEffect, useRef, useContext } from "react";
import User from "../../components/navbars/user";
import Materialize from "../../assets/MaterializePage.png";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import {
  genAvatar,
  generateRating,
  updateAccount,
  uploadAvatars,
} from "../../../functions/common";
function Confirm() {
  const [name, setName] = useState("");

  const [rate, setRate] = useState({});

  const [uploaded, setUploaded] = useState(false);

  const container = useRef(null);
  const data = useContext(userContext);

  useEffect(() => {
    if (data !== null) console.log(data);
  }, [data]);

  useEffect(() => {
    const flag = localStorage.getItem("completed");
    if (flag === "true") window.location.assign("/materialize");
    setName(localStorage.getItem("name"));
    const nameLoc = localStorage.getItem("name");
    const seedLoc = localStorage.getItem("seed");

    const rateLoc = generateRating();
    console.log(rateLoc.rateProps);
    const svg = genAvatar(seedLoc, rateLoc.rateProps);
    container.current.innerHTML = svg;
    setRate(rateLoc);
    uploadAvatars({
      name: nameLoc,
      seed: seedLoc,
      props: svg.toJson().extra,
      rateProps: rateLoc,
    }).then(([response, rateProps]) => {
      updateAccount({
        income: rateProps.income,
        upkeep: rateProps.upkeep,
      });
      if (response)
        setTimeout(() => {
          localStorage.setItem("completed", true);
          setUploaded(true);
        }, 1000);
    });
  }, []);

  return (
    <React.Fragment>
      <User />
      <div className="relative h-fit w-full">
        <img
          src={Materialize}
          className="absolute top-0 h-full min-h-screen w-full object-cover md:min-h-full"
        />
        <div className="absolute top-0 z-10 h-full min-h-screen w-full bg-theme-0 opacity-60 md:min-h-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="z-20 mt-10 text-[60px] font-bold text-theme-40">
            Materialize
          </h1>
          <div className="flex h-full w-[90vw] flex-col items-center justify-evenly gap-10 pb-10 md:flex-row">
            <div className="z-30 mt-10 flex  w-[90vw] flex-col items-center justify-center md:w-[50%]">
              <div className="z-20 flex h-[420px] w-[300px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-black md:h-[500px] md:w-[380px]">
                <div
                  ref={container}
                  className="z-30 h-fit w-[250px] overflow-hidden rounded-lg md:w-[340px]"
                ></div>
              </div>
            </div>
            <div className="z-20 mt-10  flex w-[90vw] flex-col items-center justify-center gap-5 md:w-[50%]">
              <p className="z-30 text-[40px] text-white">Congratulations!!!</p>
              <p className="z-30 text-[30px] text-white">
                Name:{" "}
                <span className="ml-10 text-theme-40">
                  {name.length > 0 ? name : "Loading.."}
                </span>
              </p>
              <p className="z-30 text-[30px] text-white">
                Rating:{" "}
                <span className="ml-10 text-theme-40">
                  {rate.rating > 0 ? rate.rating : "0"}
                </span>
              </p>
              <p className="z-30 text-[30px] text-white">
                Cards:{" "}
                <span className="ml-10 text-theme-40">
                  {data?.deck > 0 ? data.deck + 1 : "0"}
                </span>
              </p>
              <Link
                to="/dashboard"
                className="flex flex-col items-center justify-center"
              >
                <div
                  className={`z-20 mt-20  mb-10 flex h-fit w-fit flex-col items-center justify-center rounded-lg bg-theme-30  shadow-xl shadow-black transition-all duration-300 ease-in-out hover:scale-90 hover:cursor-pointer hover:shadow-md hover:shadow-black md:h-[100px] ${
                    uploaded ? "visible" : "invisible"
                  }`}
                >
                  <p className="p-4 text-[30px] text-white md:text-[40px]">
                    Back to Dashboard
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Confirm;
