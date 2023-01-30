import React, { useState, useEffect, useRef } from "react";
import NavBarMain from "../../components/navbars/main";
import SetupPic from "../../assets/setup.png";
import { auth, db, store } from "../../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { onAuthStateChanged } from "firebase/auth";

import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
function Nick() {
  const [av1, setAv1] = useState(0);
  const [av2, setAv2] = useState(0);
  const [nick1, setNick1] = useState("Starter 1");
  const [nick2, setNick2] = useState("Starter 2");

  const avatar1 = useRef(null);
  const avatar2 = useRef(null);
  const navigate = useNavigate();
  const Uid1 = Math.ceil(Math.random() * 1000000);
  const Uid2 = Math.ceil(Math.random() * 1000000);
  const uploadAv1 = () => {
    const av1Data = {
      uid: Uid1,
      seed: av1,
      name: nick1,
      clothingColor: ["456dff"],
      eyes: ["happy"],
      body: ["rounded"],
      skinColor: ["623d36"],
      backgroundColor: ["b6e3f4"],
    };

    const fileRef = ref(
      store,
      `fusionmania/${auth.currentUser.uid}/${Uid1}.json`
    );

    const jsonBlob = new Blob([JSON.stringify(av1Data)], {
      type: "application/json",
    });

    uploadBytes(fileRef, jsonBlob)
      .then(() => {
        uploadAv2();
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const uploadAv2 = () => {
    const av2Data = {
      uid: Uid2,
      seed: av2,
      name: nick2,
      clothingColor: ["54d7c7"],
      eyes: ["glasses"],
      body: ["rounded"],
      skinColor: ["b16a5b"],
      backgroundColor: ["b6e3f4"],
    };

    const fileRef = ref(
      store,
      `fusionmania/${auth.currentUser.uid}/${Uid2}.json`
    );

    const jsonBlob = new Blob([JSON.stringify(av2Data)], {
      type: "application/json",
    });

    uploadBytes(fileRef, jsonBlob)
      .then(() => {
        const docRef = doc(db, "fusionmania", auth.currentUser.uid);
        updateDoc(docRef, {
          startPrim: Uid1,
          startSecond: Uid2,
          deck: 2,
        }).then(() => {
          navigate("/dashboard");
        });
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const generate1 = () => {
    const svg = createAvatar(personas, {
      seed: av1,
      clothingColor: ["456dff"],
      eyes: ["happy"],
      body: ["rounded"],
      skinColor: ["623d36"],
    });
    avatar1.current.innerHTML = svg;
  };

  const generate2 = () => {
    const svg = createAvatar(personas, {
      seed: av2,
      clothingColor: ["54d7c7"],
      eyes: ["glasses"],
      body: ["rounded"],
      skinColor: ["b16a5b"],
    });

    avatar2.current.innerHTML = svg;
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth) {
        const docRef = doc(db, "fusionmania", auth.currentUser.uid);
        getDoc(docRef).then((data) => {
          setAv1(data.data().startPrim);
          setAv2(data.data().startSecond);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (av1 != 0) generate1();
  }, [av1]);
  useEffect(() => {
    if (av2 != 0) generate2();
  }, [av2]);
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
              Name your Starter Avatars
            </p>
            <div className="w-[95%] flex flex-row items-center justify-evenly md:gap-0 gap-4 m-2">
              <div className="w-[180px] md:w-[200px] h-[300px] flex flex-col items-center justify-start relative gap-5">
                <div
                  className="bg-theme-10 w-full h-[250px] rounded-lg"
                  ref={avatar1}
                ></div>
                <input
                  type={"email"}
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                  className=" outline-none p-2 w-[90%] h-[50px] bg-[#29596B] rounded-lg text-white text-2xl flex flex-col items-center justify-center hover:cursor-pointer text-left"
                  onChange={(e) => {
                    setNick1(e.currentTarget.value);
                  }}
                ></input>
              </div>
              <div className="w-[180px] md:w-[200px] h-[300px] flex flex-col items-center justify-start relative gap-5">
                <div
                  className="bg-theme-10 w-full h-[250px] rounded-lg"
                  ref={avatar2}
                ></div>
                <input
                  type={"email"}
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                  className=" outline-none p-2 w-[90%] h-[50px] bg-[#29596B] rounded-lg text-white text-2xl flex flex-col items-center justify-center hover:cursor-pointer text-left"
                  onChange={(e) => {
                    setNick2(e.currentTarget.value);
                  }}
                ></input>
              </div>
            </div>
            <p
              className=" p-2 bg-theme-30 text-white text-3xl rounded-lg hover:text-theme-30 hover:bg-white transition-all ease-in-out duration-300 hover:cursor-pointer mb-3"
              onClick={uploadAv1}
            >
              Lets Roll!
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Nick;
