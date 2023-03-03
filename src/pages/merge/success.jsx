import React, { useState, useEffect, useRef } from "react";
import User from "../../components/navbars/user";
import Merge from "../../assets/MergePage.png";
import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, store } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
function Success() {
  const [seedState, setSeedState] = useState(0);
  const [name, setName] = useState("");
  const [cards, setCards] = useState(0);
  const [rating, setRating] = useState(0);
  const [income, setIncome] = useState(0);
  const [upkeep, setUpkeep] = useState(0);
  const [rateProps, setRateProps] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [svgState, setSvgState] = useState({});
  const container = useRef(null);

  useEffect(() => {
    getFirebaseData();
    generateRating();
  }, []);

  useEffect(() => {
    getMergedSvg();
  }, [rateProps]);

  useEffect(() => {
    uploadCard();
  }, [name]);
  const generateRating = () => {
    const num = Math.ceil(Math.random() * 5);
    switch (num) {
      case 1:
        setRating(1);
        setRateProps("b6e3f4");
        setIncome(10);
        setUpkeep(0);
        break;
      case 2:
        setRating(2);
        setRateProps("c0aede");
        setIncome(20);
        setUpkeep(0);
        break;
      case 3:
        setRating(3);
        setRateProps("d1d4f9");
        setIncome(30);
        setUpkeep(20);
        break;
      case 4:
        setRating(4);
        setRateProps("ffd5dc");
        setUpkeep(30);
        break;
      case 5:
        setRating(5);
        setRateProps("ffdfbf");
        setUpkeep(40);
        break;
    }
  };
  const getMergedSvg = () => {
    const dominantSeed = Math.ceil(Math.random() * 2);
    const seed = localStorage.getItem(`Merge${dominantSeed}`);

    let recessiveSeed;
    switch (dominantSeed) {
      case 1:
        recessiveSeed = localStorage.getItem(`Merge2`);
        break;
      case 2:
        recessiveSeed = localStorage.getItem(`Merge1`);
        break;
    }

    let svg = createAvatar(personas, {
      seed: seed,
    });
    let svg2 = createAvatar(personas, {
      seed: recessiveSeed,
    });

    svg = svg.toJson().extra;
    svg2 = svg2.toJson().extra;

    const body = getOption({
      parent1: svg,
      parent2: svg2,
    }).body;

    const clothingColor = getOption({
      parent1: svg,
      parent2: svg2,
    }).clothingColor.substring(1);

    const hair = getOption({
      parent1: svg,
      parent2: svg2,
    }).hair;

    let hairColor = getOption({
      parent1: svg,
      parent2: svg2,
    }).hairColor.substring(1);

    const mouth = getOption({
      parent1: svg,
      parent2: svg2,
    }).mouth;
    const nose = getOption({
      parent1: svg,
      parent2: svg2,
    }).nose;
    const skinColor = getOption({
      parent1: svg,
      parent2: svg2,
    }).skinColor.substring(1);
    const facialHair = getOption({
      parent1: svg,
      parent2: svg2,
    }).facialHair;

    const newSvg = createAvatar(personas, {
      seed: seed,
      body: [body],
      clothingColor: [clothingColor],
      hair: [hair],
      hairColor: [hairColor],
      mouth: [mouth],
      nose: [nose],
      skinColor: [skinColor],
      facialHair: [facialHair],
      facialHairProbability: 100,
      backgroundColor: [rateProps],
    });
    setSvgState(newSvg.toJson());
    container.current.innerHTML = newSvg;
    setSeedState(seed);
    setName(localStorage.getItem("MergeName"));
  };

  const getOption = ({ parent1, parent2 }) => {
    let num = Math.floor(Math.random() * 2) + 1;
    switch (num) {
      case 1:
        return parent1;
      case 2:
        return parent2;
    }
  };

  const getFirebaseData = () => {
    const docRef = doc(db, "fusionmania", auth.currentUser.uid);
    getDoc(docRef).then((res) => {
      setCards(res.data().deck);
    });
  };

  const uploadCard = () => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        const uid = Math.ceil(Math.random() * 1000000);
        const data = {
          uid: uid,
          seed: seedState,
          name: name,
          rating: rating,
          merged: true,
          props: svgState.extra,
        };

        const fileRef = ref(
          store,
          `fusionmania/${auth.currentUser.uid}/${uid}.json`
        );

        const jsonBlob = new Blob([JSON.stringify(data)], {
          type: "application/json",
        });

        uploadBytes(fileRef, jsonBlob).then(() => {
          const docRef = doc(db, "fusionmania", auth.currentUser.uid);
          const docs = doc(db, "fusionmania", auth.currentUser.uid);
          getDoc(docs).then((res) => {
            const updatedItems = {
              deck: res.data().deck + 1,
              income: res.data().income + income,
              upkeep: res.data().upkeep + upkeep,
            };

            updateDoc(docRef, {
              deck: updatedItems.deck,
              income: updatedItems.income,
              upkeep: updatedItems.upkeep,
            });
            setUploaded(true);
          });
        });
      }
    });
  };

  return (
    <React.Fragment>
      <User />
      <div className="relative h-fit w-full md:h-[87vh]">
        <img
          src={Merge}
          className="absolute top-0 h-full min-h-screen w-full object-cover md:min-h-full"
        />
        <div className="absolute top-0 z-10 h-full min-h-screen w-full bg-theme-0 opacity-60 md:min-h-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-center">
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
                <span className="ml-10 text-theme-40">
                  {name.length > 0 ? name : "Loading.."}
                </span>
              </p>
              <p className="z-30 text-[30px] text-white">
                Rating:{" "}
                <span className="ml-10 text-theme-40">
                  {rating > 0 ? rating : "0"}
                </span>
              </p>
              <p className="z-30 text-[30px] text-white">
                Cards:{" "}
                <span className="ml-10 text-theme-40">
                  {cards > 0 ? cards + 1 : "0"}
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

export default Success;