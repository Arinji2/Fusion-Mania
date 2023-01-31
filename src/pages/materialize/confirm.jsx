import React, { useState, useEffect, useRef } from "react";
import User from "../../components/navbars/user";
import Materialize from "../../assets/MaterializePage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRandom } from "@fortawesome/fontawesome-free-solid";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
function Confirm() {
  const [seed, setSeed] = useState("");
  const [name, setName] = useState("");
  const [cards, setCards] = useState(0);
  const container = useRef(null);

  const getFirebaseData = () => {
    const docRef = doc(db, "fusionmania", auth.currentUser.uid);
    getDoc(docRef).then((res) => {
      setCards(res.data().deck);
    });
  };
  const generateRating = () => {
    const num = Math.floor(Math.random() * 5);
    console.log(num);
  };
  useEffect(() => {
    const flag = localStorage.getItem("completed");
    if (flag === true) window.location.assign("/materialize");
    setName(localStorage.getItem("name"));
    setSeed(localStorage.getItem("seed"));
    onAuthStateChanged(auth, getFirebaseData);
    generateRating();
  }, []);

  useEffect(() => {
    if (seed.length > 0) {
      const svg = createAvatar(personas, {
        seed: seed,
      });

      container.current.innerHTML = svg;
    }
  }, [seed]);
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
                  {name.length > 0 ? name : "Loading.."}
                </span>
              </p>
              <p className="z-30 text-[30px] text-white">
                Cards:{" "}
                <span className="ml-10 text-theme-40">
                  {cards > 0 ? cards : "Loading.."}
                </span>
              </p>

              <div className="z-20 mt-20  mb-10 flex h-[80px] w-fit flex-col items-center justify-center rounded-lg bg-theme-30  shadow-xl shadow-black transition-all duration-300 ease-in-out hover:scale-90 hover:cursor-pointer hover:shadow-md hover:shadow-black md:h-[100px]">
                <p className="p-4 text-[40px] text-white">Back to Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Confirm;
