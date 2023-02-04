import React, { useState, useEffect, useRef } from "react";
import User from "../../components/navbars/user";
import Manage from "../../assets/ManagePage.png";
import { useParams } from "react-router-dom";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db, store } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { Oval } from "react-loader-spinner";
import { faSave, faTrash, faUndo } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/fontawesome-free-solid";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Animation from "../animation";

function Card() {
  const params = useParams();
  const [error, setError] = useState(false);
  const [deletionCheck, setDeletionCheck] = useState(false);
  const [editCheck, setEditCheck] = useState(false);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [parent, setParent] = useState({});
  const [income, setIncome] = useState(0);
  const [upkeep, setUpkeep] = useState(0);
  const [rateProps, setRateProps] = useState("");
  const container = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth) getData();
    });
  }, []);

  const getData = () => {
    const storeRef = ref(
      store,
      `fusionmania/${auth.currentUser.uid}/${params.id}.json`
    );
    getDownloadURL(storeRef)
      .catch((er) => {
        if (er.code === "storage/object-not-found") setError(true);
      })
      .then((link) => {
        fetch(link).then((file) => {
          file.json().then((item) => {
            setData(item);
          });
        });
      });
  };
  const generateRating = (num) => {
    switch (num) {
      case 1:
        setRateProps("b6e3f4");
        setIncome(10);
        break;
      case 2:
        setRateProps("c0aede");
        setIncome(20);
        break;
      case 3:
        setRateProps("d1d4f9");
        setIncome(30);
        setUpkeep(20);
        break;
      case 4:
        setRateProps("ffd5dc");
        setUpkeep(30);
        break;
      case 5:
        setRateProps("ffdfbf");
        setUpkeep(40);
        break;
    }
  };

  const getAvatar = () => {
    generateRating(data.rating);
    if (data.seed == undefined) return;
    const svg = createAvatar(personas, {
      seed: data.seed,
      backgroundColor: [rateProps],
    });

    container.current.innerHTML = svg;
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  };

  useEffect(() => {
    if (data == {}) return;
    else getAvatar();
  }, [data]);

  const startDelete = () => {
    const docRef = doc(db, "fusionmania", auth.currentUser.uid);
    getDoc(docRef).then((response) => {
      setParent(response.data());
    });
  };

  useEffect(() => {
    if (parent == {}) return;
    if (deletionCheck !== true) return;

    console.log(parent);
    const storeRef = ref(
      store,
      `fusionmania/${auth.currentUser.uid}/${params.id}.json`
    );
    const docRef = doc(db, "fusionmania", auth.currentUser.uid);
    const updatedDeck = parent.deck - 1;
    const updatedIncome = parent.income - income;
    const updatedUpkeep = parent.upkeep - upkeep;
    console.log(updatedUpkeep);
    updateDoc(docRef, {
      deck: updatedDeck,
      income: updatedIncome,
      upkeep: updatedUpkeep,
    }).then(() => {
      deleteObject(storeRef).then(() => {
        setSuccess(true);
      });
    });
  }, [parent]);
  useEffect(() => {
    console.log("runs");
  }, [success]);
  const saveName = () => {
    const storeRef = ref(
      store,
      `fusionmania/${auth.currentUser.uid}/${params.id}.json`
    );
    const seed = data.seed;
    const rating = data.rating;
    deleteObject(storeRef).then(() => {
      const data = {
        uid: params.id,
        seed: seed,
        name: name,
        rating: rating,
      };
      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });

      uploadBytes(storeRef, jsonBlob).then(() => {
        setSuccess(true);
        return;
      });
    });
  };

  return (
    <React.Fragment>
      <User />
      <div className="relative flex h-fit w-full flex-col items-center justify-center md:min-h-[87vh]">
        <img
          src={Manage}
          className="absolute top-0 h-full min-h-screen w-full object-cover md:min-h-full"
        />
        <div className="absolute top-0 z-10 h-full min-h-screen w-full bg-theme-0 opacity-70 md:min-h-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="z-20 mt-10 mb-10 text-[60px] font-bold text-theme-40">
            Manage
          </h1>
          <div className="z-20 flex w-full flex-row flex-wrap items-center justify-evenly gap-y-10">
            <div className="flex h-fit w-full flex-col items-center justify-center md:h-full md:w-[50%]">
              <div className="relative flex h-[400px] w-[300px] flex-col items-center justify-center overflow-hidden rounded-lg bg-black">
                <div className="relative flex h-[250px] w-[250px] flex-col items-center justify-center overflow-hidden rounded-lg bg-white">
                  <div className="h-full w-full" ref={container}></div>
                  <div
                    className={
                      loaded
                        ? "absolute top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-theme-40 opacity-0 transition-all duration-500 ease-in-out"
                        : "absolute top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-theme-40 opacity-100 transition-all duration-500 ease-in-out"
                    }
                  >
                    <Oval
                      color="white"
                      secondaryColor="transparent"
                      width="150"
                      height="150"
                    ></Oval>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex h-fit w-full flex-col items-center justify-center md:h-full md:w-[50%]">
              <div className="flex h-full w-full flex-row items-center justify-center">
                <div
                  className={
                    editCheck
                      ? "hidden"
                      : "flex h-fit w-[50%] flex-col items-center justify-center gap-10 md:items-start"
                  }
                >
                  <p className="text-left text-[40px] text-white">Name:</p>
                  <p className="text-left text-[40px] text-white">Rating:</p>
                  <p className="text-left text-[40px] text-white">Income:</p>
                  <p className="text-left text-[40px] text-white">Upkeep:</p>
                </div>
                <div
                  className={
                    editCheck
                      ? "hidden"
                      : "flex h-fit w-[50%] flex-col items-center justify-center gap-10 md:items-start"
                  }
                >
                  <p className="text-center text-[40px] text-theme-40">
                    {loaded ? data.name : "Loading"}
                  </p>
                  <p className="text-center text-[40px] text-theme-40">
                    {" "}
                    {loaded ? data.rating : "Loading"}
                  </p>
                  <p className="text-center text-[40px] text-green-500">
                    {" "}
                    {loaded ? `+${income}` : "Loading"}
                  </p>
                  <p className="text-center text-[40px] text-red-500">
                    {" "}
                    {loaded ? `-${upkeep}` : "Loading"}
                  </p>
                </div>
                <div
                  className={
                    editCheck
                      ? "flex h-fit w-[50%] flex-col items-center justify-center gap-10 md:items-start"
                      : "hidden"
                  }
                >
                  <p className="text-left text-[40px] text-white">Old Name:</p>
                  <p className="text-left text-[40px] text-white">New Name:</p>
                </div>
                <div
                  className={
                    editCheck
                      ? "flex h-fit w-[50%] flex-col items-center justify-center gap-10 md:items-start"
                      : "hidden"
                  }
                >
                  <p className="text-center text-[40px] text-theme-40">
                    {loaded ? data.name : "Loading"}
                  </p>
                  <input
                    type={"email"}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="false"
                    className=" flex h-[50px] w-[50%] flex-col items-center justify-center rounded-lg bg-[#29596B] p-4 text-left text-2xl text-white outline-none hover:cursor-pointer"
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                  ></input>
                </div>
              </div>
              <div
                className={
                  editCheck
                    ? "hidden"
                    : "flex h-fit w-full flex-row items-center justify-center gap-5 md:justify-start md:gap-20"
                }
              >
                <p
                  className=" mb-3 mt-20 rounded-lg bg-theme-30 p-4 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
                  onClick={() => {
                    setDeletionCheck(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </p>
                <p
                  className=" mb-3 mt-20 rounded-lg bg-theme-30 p-4 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
                  onClick={() => {
                    setEditCheck(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </p>
              </div>
              <div
                className={
                  editCheck
                    ? "flex h-fit w-full flex-row items-center justify-center gap-5 md:justify-start md:gap-20"
                    : "hidden"
                }
              >
                <p
                  className=" mb-3 mt-20 rounded-lg bg-theme-30 p-4 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
                  onClick={() => {
                    setEditCheck(false);
                  }}
                >
                  <FontAwesomeIcon icon={faUndo} /> Back
                </p>
                <p
                  className=" mb-3 mt-20 rounded-lg bg-theme-30 p-4 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
                  onClick={() => {
                    saveName();
                  }}
                >
                  <FontAwesomeIcon icon={faSave} /> Save
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            error
              ? " fixed top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-theme-40"
              : "fixed top-0 -z-30 flex h-full w-full flex-col items-center justify-center bg-theme-40 opacity-0"
          }
        >
          <h1 className="text-[60px] text-white">
            Requested Content not Found
          </h1>
          <p
            className=" mb-3 mt-20 rounded-lg bg-theme-30 p-2 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
            onClick={() => {
              window.location.assign("/dashboard");
            }}
          >
            Back to Dashboard
          </p>
        </div>
        <div
          className={
            deletionCheck
              ? "fixed top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-theme-40 opacity-100"
              : "fixed top-0 -z-30 flex h-full w-full flex-col items-center justify-center bg-theme-40 opacity-0"
          }
        >
          <h1 className="text-[30px] text-white md:text-[60px]">
            Are you sure you want to delete {data.name} ?
          </h1>
          <p
            className=" mb-3 mt-20 rounded-lg bg-theme-30 p-2 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
            onClick={() => {
              startDelete();
            }}
          >
            Yes, I am Sure!
          </p>
        </div>
        <div
          className={
            success
              ? "fixed top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-black opacity-100"
              : "fixed top-0 -z-30 flex h-full w-full flex-col items-center justify-center bg-black opacity-0"
          }
        >
          <img
            src={Manage}
            className="absolute top-0 h-full min-h-screen w-full object-cover md:min-h-full"
          />
          <div className="absolute top-0 z-10 h-full min-h-screen w-full bg-theme-0 opacity-70 md:min-h-full"></div>
          <div
            id="animation-container"
            className="absolute z-30 h-[400px] w-[400px]"
          >
            <Animation
              container={"animation-container"}
              flag={success}
              location="manage"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Card;
