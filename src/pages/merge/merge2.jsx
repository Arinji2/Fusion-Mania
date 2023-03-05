import React, { useState, useEffect, useRef } from "react";
import User from "../../components/navbars/user";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

import { Oval } from "react-loader-spinner";
import Merge from "../../assets/MergePage.png";
import { listFiles, propsAvatar } from "../../../functions/common";
function MergeSecond() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser !== null)
        listFiles({ auth: auth.currentUser }).then((res) => {
          setData(res);
        });
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) setLoaded(true);
  }, [data]);

  return (
    <React.Fragment>
      <User />
      <div className="relative h-fit w-full">
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
            Choose Avatar 2
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
              if (localStorage.getItem("Merge2") === null) setError(true);
              else window.location.assign("/merge/final");
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
            Please select the second Avatar to be able to Continue!!
          </p>
          <p
            className="z-30 w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[20px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
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
    let svg;

    if (data.props != undefined)
      svg = propsAvatar({ seed: data.seed, props: data.props });
    container.current.innerHTML = svg;
  }, [data]);

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
        localStorage.setItem("Merge2", data.uid);
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
export default MergeSecond;
