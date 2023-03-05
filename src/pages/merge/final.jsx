import React, { useEffect, useRef, useContext } from "react";

import Merge from "../../assets/MergePage.png";
import User from "../../components/navbars/user";
import { authContext } from "../../App";
import { propsAvatar, uidDownload } from "../../../functions/common";
function Final() {
  const cont1 = useRef(null);
  const cont2 = useRef(null);
  const auth = useContext(authContext);
  useEffect(() => {
    if (auth) {
      uidDownload({ auth: auth, uid: localStorage.getItem("Merge1") }).then(
        (res) => {
          cont1.current.innerHTML = propsAvatar({
            seed: res.seed,
            props: res.props,
          });
        }
      );
      uidDownload({ auth: auth, uid: localStorage.getItem("Merge2") }).then(
        (res) => {
          cont2.current.innerHTML = propsAvatar({
            seed: res.seed,
            props: res.props,
          });
        }
      );
    }
  }, [auth]);

  return (
    <React.Fragment>
      <User />
      <div className="relative h-fit w-full md:h-[87vh]">
        <img
          src={Merge}
          className="fixed top-0 h-full min-h-screen w-full object-cover md:min-h-full"
        />
        <div className="fixed top-0 z-10 h-full min-h-screen w-full bg-theme-0 opacity-60 md:min-h-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-start">
          <h1 className="z-20 mt-10 text-[60px] font-bold text-theme-40">
            Merge
          </h1>
          <div className="mb-10 flex h-full w-full flex-col items-center justify-evenly gap-y-10 md:h-[300px] md:flex-row">
            <div className="z-20 flex h-[200px] w-[200px] flex-col items-center justify-center gap-5 rounded-lg bg-theme-10 shadow-md shadow-black md:h-[300px] md:w-[300px]">
              <div
                className="z-20 h-[100px] w-[100px] md:h-[200px] md:w-[200px]"
                ref={cont1}
              ></div>
              <p
                className="z-30 w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
                onClick={() => {
                  window.location.assign("/merge/first");
                }}
              >
                Back to Selection!
              </p>
            </div>
            <div className="z-20 flex h-[200px] w-[200px] flex-col items-center justify-center gap-5 rounded-lg bg-theme-10 shadow-md shadow-black md:h-[300px] md:w-[300px]">
              <div
                className="z-20 h-[100px] w-[100px] md:h-[200px] md:w-[200px]"
                ref={cont2}
              ></div>
              <p
                className="z-30 w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
                onClick={() => {
                  window.location.assign("/merge/second");
                }}
              >
                Back to Selection!
              </p>
            </div>
            <p
              className="z-30 block w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:hidden md:pr-4 md:pl-4 md:text-[25px]"
              onClick={() => {
                window.location.assign("/merge/success");
              }}
            >
              Start Merge
            </p>
          </div>
          <p
            className="absolute bottom-10 z-30 hidden w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:block md:pr-4 md:pl-4 md:text-[25px]"
            onClick={() => {
              window.location.assign("/merge/success");
            }}
          >
            Start Merge
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Final;
