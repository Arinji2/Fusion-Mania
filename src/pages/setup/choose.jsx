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
      <div className="w-full h-[110vh] md:h-screen relative md:overflow-hidden">
        <img
          src={SetupPic}
          className="w-full h-full object-cover setup absolute"
        />
        <div className="w-full h-full opacity-70 bg-theme-0 absolute"></div>
        <div className="w-full h-screen flex flex-col items-center justify-start">
          <div className="w-full h-[30vh] mb-36 md:mb-0">EE</div>
          <div className="w-full h-full flex flex-col items-center justify-start z-10 gap-5">
            <h1 className="text-theme-50 text-[40px] md:text-[60px]">
              Welcome Explorer
            </h1>
            <p className="text-white text-[20px] md:text-[50px]">
              Choose your Starter Avatar
            </p>
            <div className="w-[95%] flex flex-row items-center justify-evenly md:gap-0 gap-4 m-2">
              <div className="w-[180px] md:w-[200px] h-[300px] flex flex-col items-center justify-start relative gap-5">
                <div
                  className="bg-theme-10 w-full h-[250px] rounded-lg"
                  ref={avatar1}
                ></div>
                <div
                  className="aspect-square h-[50px] bg-theme-30 rounded-lg text-white text-2xl flex flex-col items-center justify-center hover:cursor-pointer"
                  onClick={generate1}
                >
                  <FontAwesomeIcon icon={faRandom} />
                </div>
              </div>
              <div className="w-[180px] md:w-[200px] h-[300px] flex flex-col items-center justify-start relative gap-5">
                <div
                  className="bg-theme-10 w-full h-[250px] rounded-lg"
                  ref={avatar2}
                ></div>
                <div
                  className="aspect-square h-[50px] bg-theme-30 rounded-lg text-white text-2xl flex flex-col items-center justify-center hover:cursor-pointer"
                  onClick={generate2}
                >
                  <FontAwesomeIcon icon={faRandom} />
                </div>
              </div>
            </div>
            <p
              className=" p-2 bg-theme-30 text-white text-3xl rounded-lg hover:text-theme-30 hover:bg-white transition-all ease-in-out duration-300 hover:cursor-pointer mb-3"
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
