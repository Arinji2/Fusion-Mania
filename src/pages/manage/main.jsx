import React, { useState, useEffect, useRef, useContext } from "react";
import User from "../../components/navbars/user";
import Manage from "../../assets/ManagePage.png";

import { authContext } from "../../App";
import { listFiles, propsAvatar } from "../../../functions/common";
function Main() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const auth = useContext(authContext);
  useEffect(() => {
    if (loaded) return;
    if (auth)
      listFiles({ auth: auth }).then((res) => {
        setData(res);
        setLoaded(true);
      });
  }, [auth, data]);

  return (
    <React.Fragment>
      <User />
      <div className="relative h-fit w-full md:min-h-[87vh]">
        <img
          src={Manage}
          className="fixed top-10 h-full min-h-screen w-full object-cover md:min-h-full"
        />
        <div className="fixed top-10 z-10 h-full min-h-screen w-full bg-theme-0 opacity-60 md:min-h-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-center md:mt-10">
          <h1 className="z-20  text-[60px] font-bold text-theme-40">Manage</h1>
          <div className="mb-10 flex w-full flex-row flex-wrap items-center justify-evenly gap-10">
            {loaded
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
  const container = useRef(null);
  useEffect(() => {
    if (data)
      container.current.innerHTML = propsAvatar({
        seed: data.seed,
        props: data.props,
      });
  }, [data]);

  return (
    <div
      className="group z-40 flex h-[300px] w-[230px] flex-col items-center justify-start gap-5 overflow-hidden rounded-lg bg-theme-10 transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
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
