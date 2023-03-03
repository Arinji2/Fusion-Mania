import React, { useState, useEffect, useRef, useContext } from "react";
import NavBarMain from "../../components/navbars/main";
import SetupPic from "../../assets/setup.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/fontawesome-free-solid";
import { chooseSetupAvatars } from "../../../functions/setup";
import { authContext } from "../../App";
function Choose() {
  const [av1, setAv1] = useState(false);
  const [av2, setAv2] = useState(false);
  const avatar1 = useRef(null);
  const avatar2 = useRef(null);
  const auth = useContext(authContext);

  useEffect(() => {
    if (av1) {
      chooseSetupAvatars({ mode: 1, auth: auth }).then((res) => {
        avatar1.current.innerHTML = res;
      });

      setAv1(false);
    }
    if (av2) {
      chooseSetupAvatars({ mode: 2, auth: auth }).then((res) => {
        avatar2.current.innerHTML = res;
      });

      setAv2(false);
    }
  }, [av1, av2, auth]);

  useEffect(() => {
    if (auth !== null) {
      setAv1(true);
      setAv2(true);
    }
  }, [auth]);
  return (
    <React.Fragment>
      <NavBarMain mode={1} />
      <div className="relative h-[110vh] w-full md:h-screen md:overflow-hidden">
        <img
          src={SetupPic}
          className="setup absolute h-full w-full object-cover"
        />
        <div className="absolute h-full w-full bg-theme-0 opacity-70"></div>
        <div className="flex h-screen w-full flex-col items-center justify-start">
          <div className="mb-36 h-[30vh] w-full md:mb-0">EE</div>
          <div className="z-10 flex h-full w-full flex-col items-center justify-start gap-5">
            <h1 className="text-[40px] text-theme-50 md:text-[60px]">
              Welcome Explorer
            </h1>
            <p className="text-[20px] text-white md:text-[50px]">
              Choose your Starter Avatar
            </p>
            <div className="m-2 flex w-[95%] flex-row items-center justify-evenly gap-4 md:gap-0">
              <div className="relative flex h-[300px] w-[180px] flex-col items-center justify-start gap-5 md:w-[200px]">
                <div
                  className="h-[250px] w-full rounded-lg bg-theme-10"
                  ref={avatar1}
                ></div>
                <div
                  className="flex aspect-square h-[50px] flex-col items-center justify-center rounded-lg bg-theme-30 text-2xl text-white hover:cursor-pointer"
                  onClick={() => {
                    setAv1(true);
                  }}
                >
                  <FontAwesomeIcon icon={faRandom} />
                </div>
              </div>
              <div className="relative flex h-[300px] w-[180px] flex-col items-center justify-start gap-5 md:w-[200px]">
                <div
                  className="h-[250px] w-full rounded-lg bg-theme-10"
                  ref={avatar2}
                ></div>
                <div
                  className="flex aspect-square h-[50px] flex-col items-center justify-center rounded-lg bg-theme-30 text-2xl text-white hover:cursor-pointer"
                  onClick={() => {
                    setAv2(true);
                  }}
                >
                  <FontAwesomeIcon icon={faRandom} />
                </div>
              </div>
            </div>
            <p
              className=" mb-3 rounded-lg bg-theme-30 p-2 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
              onClick={() => {
                window.location.assign("/setup/nick");
              }}
            >
              Lets Roll!
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Choose;
