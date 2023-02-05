import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/fontawesome-free-solid";

function User() {
  const [nav, setNav] = useState(false);
  const [text, setText] = useState(false);
  const toggleNav = () => {
    if (nav) setNav(false);
    else setNav(true);
  };

  useEffect(() => {
    if (nav) {
      setTimeout(() => {
        setText(nav);
      }, 800);
    } else setText(nav);
  }, [nav]);
  return (
    <React.Fragment>
      <div className="sticky top-0 z-50 hidden h-[13vh] w-full  flex-row items-center justify-between bg-black shadow-md shadow-black md:flex">
        <div className="flex h-full  w-[60%] flex-col items-start justify-center md:w-[30%]">
          <Link
            to="/dashboard"
            className="flex flex-col items-center justify-center"
          >
            <p className="nav ml-10 text-[25px] text-white">Fusion Mania</p>
          </Link>
        </div>
        <div className="nav flex h-full w-[10%] flex-row items-center justify-between md:w-[50%] ">
          <Link
            to="/materialize"
            className="flex flex-col items-center justify-center"
          >
            <p className="nav text-[25px] text-theme-40">Materialize</p>
          </Link>
          <Link
            to="/merge/first"
            className="flex flex-col items-center justify-center"
          >
            <p className="nav text-[25px] text-theme-40">Merge</p>
          </Link>
          <Link
            to="/manage"
            className="flex flex-col items-center justify-center"
          >
            <p className="nav text-[25px] text-theme-40">Manage</p>
          </Link>
        </div>
        <div className="flex h-full w-[60%] flex-col items-end justify-center md:w-[30%]">
          <Link
            to="/account"
            className="flex flex-col items-center justify-center"
          >
            <p className="nav mr-10 text-[25px] text-theme-30">Account</p>
          </Link>
        </div>
      </div>
      <div className="sticky top-0 z-50 flex h-[13vh] w-full  flex-row items-center justify-between bg-black shadow-md shadow-black md:hidden">
        <Link to="/dashboard" className="w-full">
          <p className="nav w-full text-center  text-[25px] text-white">
            Fusion Mania
          </p>
        </Link>
        <p
          className="absolute right-5 z-50 text-[25px] text-theme-30"
          onClick={toggleNav}
        >
          <FontAwesomeIcon
            icon={faBars}
            className={nav ? "hidden " : "block "}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={nav ? "block  text-[30px]" : "hidden "}
          />
        </p>
      </div>
      <div
        className={
          nav
            ? "fixed z-50 flex h-screen w-full flex-col items-center justify-start gap-20 bg-black transition-all duration-1000 ease-in-out"
            : "fixed z-50 h-0 w-full bg-black transition-all duration-1000 ease-in-out"
        }
      >
        <Link
          to="/materialize"
          className="flex flex-col items-center justify-center"
        >
          <p
            className={`nav mt-20 text-[30px] text-theme-40 ${
              text ? "block" : "hidden"
            }`}
          >
            Materialize
          </p>
        </Link>
        <Link
          to="/merge/first"
          className="flex flex-col items-center justify-center"
        >
          <p
            className={`nav text-[30px] text-theme-40 ${
              text ? "block" : "hidden"
            }`}
          >
            Merge
          </p>
        </Link>
        <Link
          to="/manage"
          className="flex flex-col items-center justify-center"
        >
          <p
            className={`nav text-[30px] text-theme-40 ${
              text ? "block" : "hidden"
            }`}
          >
            Manage
          </p>
        </Link>
        <Link
          to="/account"
          className="flex flex-col items-center justify-center"
        >
          <p
            className={`nav pb-10 text-[30px] text-theme-30 ${
              text ? "block" : "hidden"
            }`}
          >
            Account
          </p>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default User;
