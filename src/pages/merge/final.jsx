import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, store } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import Merge from "../../assets/MergePage.png";
import User from "../../components/navbars/user";
function Final() {
  const [selection1, setSelection1] = useState({});
  const [selection2, setSelection2] = useState({});
  const cont1 = useRef(null);
  const cont2 = useRef(null);
  const cont3 = useRef(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (auth.currentUser == undefined) return;
      storeData({
        uid: localStorage.getItem("Merge1"),
        dataSetter: setSelection1,
      });
      storeData({
        uid: localStorage.getItem("Merge2"),
        dataSetter: setSelection2,
      });
    });

    return unsubscribe();
  }, []);

  const storeData = ({ uid, dataSetter }) => {
    uid = Number.parseInt(uid);
    const storeRef = ref(
      store,
      `fusionmania/${auth.currentUser.uid}/${uid}.json`
    );

    try {
      getDownloadURL(storeRef).then((link) => {
        fetch(link).then((data) => {
          data.json().then((file) => {
            dataSetter(file);
          });
        });
      });
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    if (selection1.seed == undefined) return;
    else
      showSelections({
        seed: selection1.seed,
        name: selection1.name,
        container: cont1,
      });
  }, [selection1]);
  useEffect(() => {
    if (selection2.seed == undefined) return;
    else
      showSelections({
        seed: selection2.seed,
        name: selection2.name,
        container: cont2,
      });
  }, [selection2]);
  const showSelections = ({ seed, name, container }) => {
    const svg = createAvatar(personas, {
      seed: seed,
    });
    container.current.innerHTML = svg;
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
          <div className="absolute bottom-36 flex h-[300px] w-full flex-row items-center justify-evenly">
            <div className="z-20 flex h-[300px] w-[300px] flex-col items-center justify-center gap-5 rounded-lg bg-theme-10 shadow-md shadow-black">
              <div className="z-20 h-[200px] w-[200px]" ref={cont1}></div>
              <p
                className="z-30 w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
                onClick={() => {
                  window.location.assign("/merge/first");
                }}
              >
                Back to Selection!
              </p>
            </div>
            <div className="z-20 flex h-[300px] w-[300px] flex-col items-center justify-center gap-5 rounded-lg bg-theme-10 shadow-md shadow-black">
              <div className="z-20 h-[200px] w-[200px]" ref={cont2}></div>
              <p
                className="z-30 w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
                onClick={() => {
                  window.location.assign("/merge/second");
                }}
              >
                Back to Selection!
              </p>
            </div>
          </div>
          <p
            className="absolute bottom-10 z-30 w-fit rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
            onClick={() => {
              localStorage.setItem("Merge1", selection1.seed);
              localStorage.setItem("Merge2", selection2.seed);
              window.location.assign("/merge/success");
            }}
          >
            Start Merge
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Final;
