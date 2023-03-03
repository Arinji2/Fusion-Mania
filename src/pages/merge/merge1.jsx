import React, { useState, useEffect, useRef } from "react";
import User from "../../components/navbars/user";
import { auth, db, store } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { Oval } from "react-loader-spinner";
import Merge from "../../assets/MergePage.png";
function MergeFirst() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    localStorage.removeItem("Merge1");
    localStorage.removeItem("Merge2");
    onAuthStateChanged(auth, () => {
      if (auth.currentUser !== null) listFiles();
    });
  }, []);

  const listFiles = async () => {
    if (loaded) return;
    const storeRef = ref(store, `fusionmania/${auth.currentUser.uid}`);
    listAll(storeRef).then((res) => {
      const results = [];
      res.items.forEach((item) => {
        let refs = ref(store, item.fullPath);
        getDownloadURL(refs).then((items) => {
          fetch(items).then((file) => {
            file.json().then((final) => {
              results.push(final);
              if (results.length === res.items.length) {
                results.sort((a, b) => b.rating - a.rating);
                setData(results);
                setLoaded(true);
              }
            });
          });
        });
      });
    });
  };

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
          <p className="z-20 mt-10 mb-10 text-[40px]  text-white">
            Choose Avatar 1
          </p>
          <div className="mb-10 flex w-full flex-row flex-wrap items-center justify-evenly gap-10">
            {data.length > 0
              ? data.map((item, i) => {
                  return (
                    <Card
                      data={item}
                      key={i}
                      setterFunc={setSelected}
                      setterItem={selected}
                    />
                  );
                })
              : "Loading"}
          </div>
        </div>
        <div
          className={
            loaded
              ? "fixed top-0 left-0 z-0 flex h-screen w-full flex-col items-center justify-center bg-theme-0 opacity-0 transition-all duration-1000 ease-in-out"
              : "fixed top-0 left-0 z-30 flex h-screen w-full flex-col items-center justify-center bg-theme-0 opacity-100 transition-all duration-1000 ease-in-out"
          }
        >
          <Oval
            color="red"
            secondaryColor="transparent"
            height={200}
            width={200}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center pb-10">
          <p
            className={
              loaded
                ? "z-30 w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
                : "hidden"
            }
            onClick={() => {
              if (localStorage.getItem("Merge1") === null) setError(true);
              else window.location.assign("/merge/second");
            }}
          >
            Confirm Selection!
          </p>
        </div>
        <div
          className={
            error
              ? "fixed top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-theme-40 opacity-100"
              : "fixed top-0 z-0 h-full w-full flex-col items-center  justify-center bg-theme-40 opacity-0"
          }
        >
          <p className="z-20 mt-10 mb-10 text-[40px] font-bold text-white md:text-[60px]">
            Uh oh! An Error Occurred
          </p>
          <p className="z-20 mt-10 mb-10 text-[30px] text-white  md:text-[40px]">
            Please select the first Avatar to be able to Continue!!
          </p>
          <p
            className="z-30 w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
            onClick={() => {
              setError(false);
            }}
          >
            Back to Selection!
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

function Card({ data, setterFunc, setterItem }) {
  const [selected, setSelected] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    const svg = createAvatar(personas, {
      seed: data.seed,
    });
    container.current.innerHTML = svg;
  }, []);

  useEffect(() => {
    if (setterItem == data.uid) setSelected(true);
    else setSelected(false);
  }, [setterItem]);
  return (
    <div
      className={`group z-40 flex h-[230px] w-[180px] flex-col items-center justify-start gap-5 overflow-hidden rounded-lg ${
        selected ? "bg-theme-30" : "bg-theme-10"
      }  transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer`}
      onClick={() => {
        setterFunc(data.uid);
        localStorage.setItem("Merge1", data.uid);
      }}
    >
      <div
        className="h-[78%] w-full overflow-hidden rounded-lg  p-2"
        ref={container}
      ></div>
      <p className="text-2xl text-theme-40">{data.name}</p>
    </div>
  );
}
export default MergeFirst;
