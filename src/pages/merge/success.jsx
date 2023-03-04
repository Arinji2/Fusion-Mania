import React, { useState, useEffect, useRef, useContext } from "react";
import User from "../../components/navbars/user";
import Merge from "../../assets/MergePage.png";

import {
  mergeAvatar,
  uidDownload,
  updateAccount,
  uploadAvatars,
} from "../../../functions/common";
import { authContext, userContext } from "../../App";
function Success() {
  const [name, setName] = useState("");

  const [rating, setRating] = useState({});

  const [svgState, setSvgState] = useState({});
  const container = useRef(null);
  const auth = useContext(authContext);
  const data = useContext(userContext);

  useEffect(() => {
    if (auth) {
      uidDownload({ auth: auth, uid: localStorage.getItem("Merge1") }).then(
        (file1) => {
          uidDownload({ auth: auth, uid: localStorage.getItem("Merge2") }).then(
            (file2) => {
              const svg = mergeAvatar({
                parent1: file1.props,
                parent2: file2.props,
              });
              setSvgState(svg);
              setRating(svg.rating);
              container.current.innerHTML = svg.svg;
            }
          );
        }
      );
    }
  }, [auth]);

  return (
    <React.Fragment>
      <User />
      <div className="relative h-fit w-full">
        <img
          src={Merge}
          className="absolute top-0 h-full min-h-screen w-full object-cover md:min-h-full"
        />
        <div className="absolute top-0 z-10 h-full min-h-screen w-full bg-theme-0 opacity-60 md:min-h-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-center pb-10">
          <h1 className="z-20 mt-10 text-[60px] font-bold text-theme-40">
            Merge
          </h1>
          <div className="flex h-full w-[90vw] flex-col items-center justify-evenly gap-10 md:flex-row">
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
                <span className="ml-10">
                  <input
                    type={"email"}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="false"
                    className="mt-10 h-[42px] w-[50%] rounded-lg bg-[#29596B] p-4 text-left text-[20px]  text-white outline-none"
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                  ></input>
                </span>
              </p>
              <p className="z-30 text-[30px] text-white">
                Rating:{" "}
                <span className="ml-10 text-theme-40">
                  {rating?.rating > 0 ? rating.rating : "0"}
                </span>
              </p>
              <p className="z-30 text-[30px] text-white">
                Cards:{" "}
                <span className="ml-10 text-theme-40">
                  {data?.deck > 0 ? data.deck + 1 : "0"}
                </span>
              </p>

              <div
                onClick={() => {
                  updateAccount({
                    income: rating.income,
                    upkeep: rating.upkeep,
                  });
                  uploadAvatars({
                    name: name,
                    seed: 12334,
                    props: svgState.svg.toJson().extra,
                    rateProps: rating,
                  }).then(() => {
                    window.location.assign("/dashboard");
                  });
                }}
                className={`z-20 mt-20  mb-10 flex h-fit w-fit flex-col items-center justify-center rounded-lg bg-theme-30  shadow-xl shadow-black transition-all duration-300 ease-in-out hover:scale-90 hover:cursor-pointer hover:shadow-md hover:shadow-black md:h-[100px] ${
                  name.length > 0 ? "visible" : "invisible"
                }`}
              >
                <p className="p-4 text-[30px] text-white md:text-[40px]">
                  Back to Dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Success;
