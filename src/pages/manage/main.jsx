import React, { useState, useEffect, useRef } from "react";
import User from "../../components/navbars/user";
import Manage from "../../assets/ManagePage.png";
import { auth, db, store } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
function Main() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser !== null) listFiles();
    });
  }, []);

  const listFiles = async () => {
    console.log("run");
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

  useEffect(() => {
    console.log(data);
    console.log(typeof data);
  }, [data]);
  return (
    <React.Fragment>
      <User />
      <div className="relative h-fit w-full md:h-[87vh]">
        <img
          src={Manage}
          className="fixed top-10 h-full min-h-screen w-full object-cover md:min-h-full"
        />
        <div className="fixed top-10 z-10 h-full min-h-screen w-full bg-theme-0 opacity-60 md:min-h-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-center md:mt-10">
          <h1 className="z-20 mt-36 text-[60px] font-bold text-theme-40">
            Manage
          </h1>
          <div className="mb-10 flex w-full flex-row flex-wrap items-center justify-evenly gap-10">
            {data.length > 0
              ? data.map((item, i) => {
                  return <Card data={item} key={i} />;
                })
              : "Loading"}
          </div>
        </div>
        <div
          className={
            loaded
              ? "fixed top-0 left-0 z-30 h-screen w-full bg-theme-0 opacity-0 transition-all duration-1000 ease-in-out"
              : "fixed top-0 left-0 z-30 h-screen w-full bg-theme-0 opacity-100 transition-all duration-1000 ease-in-out"
          }
        ></div>
      </div>
    </React.Fragment>
  );
}

function Card({ data }) {
  const [rateProps, setRateProps] = useState("");
  const generateRating = (num) => {
    switch (num) {
      case 1:
        setRateProps("b6e3f4");

        break;
      case 2:
        setRateProps("c0aede");

        break;
      case 3:
        setRateProps("d1d4f9");

        break;
      case 4:
        setRateProps("ffd5dc");

        break;
      case 5:
        setRateProps("ffdfbf");

        break;
    }
  };
  const container = useRef(null);
  useEffect(() => {
    generateRating(data.rating);
  }, []);

  useEffect(() => {
    if (rateProps === "") return;
    const svg = createAvatar(personas, {
      seed: data.seed,
      backgroundColor: [rateProps],
    });
    container.current.innerHTML = svg;
  }, [rateProps]);
  return (
    <div
      className="group z-40 flex h-[300px] w-[230px] flex-col items-center justify-start gap-5 overflow-hidden bg-theme-10 transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
      onClick={() => {
        window.location.assign(`/manage/${data.uid}`);
      }}
    >
      <div
        className="h-[78%] w-full overflow-hidden rounded-lg p-2"
        ref={container}
      ></div>
      <p className="text-2xl text-theme-40">{data.name}</p>
    </div>
  );
}
export default Main;
