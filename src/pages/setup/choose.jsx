import React, { useState, useEffect, useRef } from "react";
import NavBarMain from "../../components/navbars/main";
import SetupPic from "../../assets/setup.png";
import { auth, db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/fontawesome-free-solid";
function Choose() {
  const [av1, setAv1] = useState(0);
  const [av2, setAv2] = useState(0);
  const avatar1 = useRef(null);
  const avatar2 = useRef(null);
  const finish = () => {
    const docRef = doc(db, "fusionmania", auth.currentUser.uid);

    updateDoc(docRef, {
      startPrim: av1,
      startSecond: av2,
    }).then(() => {
      window.location.assign("/setup/nick");
    });
  };

  const generate1 = () => {
    const seed = Math.random();
    setAv1(seed);
    const svg = createAvatar(personas, {
      seed: seed,
      clothingColor: ["456dff"],
      eyes: ["happy"],
      body: ["rounded"],
      skinColor: ["623d36"],
      backgroundColor: ["b6e3f4"],
    });
    avatar1.current.innerHTML = svg;
  };

  const generate2 = () => {
    const seed = Math.random();
    setAv2(seed);
    const svg = createAvatar(personas, {
      seed: seed,
      clothingColor: ["54d7c7"],
      eyes: ["glasses"],
      body: ["rounded"],
      skinColor: ["b16a5b"],
      backgroundColor: ["b6e3f4"],
    });

    avatar2.current.innerHTML = svg;
  };

  useEffect(() => {
    generate1();
    generate2();
  }, []);
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
                  onClick={generate1}
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
                  onClick={generate2}
                >
                  <FontAwesomeIcon icon={faRandom} />
                </div>
              </div>
            </div>
            <p
              className=" mb-3 rounded-lg bg-theme-30 p-2 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
              onClick={finish}
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
