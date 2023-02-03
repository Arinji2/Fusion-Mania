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
      rating: 1,
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
      rating: 1,
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
          income: 20,
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
              Name your Starter Avatars
            </p>
            <div className="m-2 flex w-[95%] flex-row items-center justify-evenly gap-4 md:gap-0">
              <div className="relative flex h-[300px] w-[180px] flex-col items-center justify-start gap-5 md:w-[200px]">
                <div
                  className="h-[250px] w-full rounded-lg bg-theme-10"
                  ref={avatar1}
                ></div>
                <input
                  type={"email"}
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                  className=" flex h-[50px] w-[90%] flex-col items-center justify-center rounded-lg bg-[#29596B] p-2 text-left text-2xl text-white outline-none hover:cursor-pointer"
                  onChange={(e) => {
                    setNick1(e.currentTarget.value);
                  }}
                ></input>
              </div>
              <div className="relative flex h-[300px] w-[180px] flex-col items-center justify-start gap-5 md:w-[200px]">
                <div
                  className="h-[250px] w-full rounded-lg bg-theme-10"
                  ref={avatar2}
                ></div>
                <input
                  type={"email"}
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                  className=" flex h-[50px] w-[90%] flex-col items-center justify-center rounded-lg bg-[#29596B] p-2 text-left text-2xl text-white outline-none hover:cursor-pointer"
                  onChange={(e) => {
                    setNick2(e.currentTarget.value);
                  }}
                ></input>
              </div>
            </div>
            <p
              className=" mb-3 rounded-lg bg-theme-30 p-2 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
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
