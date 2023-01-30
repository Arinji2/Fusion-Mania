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
      <div className="h-[13vh] w-full sticky top-0 bg-black z-50  flex-row items-center justify-between md:flex hidden shadow-md shadow-black">
        <div className="h-full w-[60%]  md:w-[30%] flex flex-col items-start justify-center">
          <Link to="/" className="flex flex-col items-center justify-center">
            <p className="text-[25px] text-white nav ml-10">Fusion Mania</p>
          </Link>
        </div>
        <div className="h-full w-[10%] md:w-[50%] flex flex-row items-center justify-between nav ">
          <Link
            to="/materialize"
            className="flex flex-col items-center justify-center"
          >
            <p className="text-[25px] text-theme-40 nav">Materialize</p>
          </Link>
          <Link
            to="/merge"
            className="flex flex-col items-center justify-center"
          >
            <p className="text-[25px] text-theme-40 nav">Merge</p>
          </Link>
          <Link
            to="/manage"
            className="flex flex-col items-center justify-center"
          >
            <p className="text-[25px] text-theme-40 nav">Manage</p>
          </Link>
        </div>
        <div className="h-full w-[60%] md:w-[30%] flex flex-col items-end justify-center">
          <Link
            to="/account"
            className="flex flex-col items-center justify-center"
          >
            <p className="text-[25px] text-theme-30 nav mr-10">Account</p>
          </Link>
        </div>
      </div>
      <div className="h-[13vh] w-full sticky top-0 bg-black z-50  flex-row items-center justify-between md:hidden flex shadow-md shadow-black">
        <p className="text-white text-[25px] nav  w-full text-center">
          Fusion Mania
        </p>
        <p
          className="text-theme-30 text-[25px] absolute right-5"
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
            ? "h-screen fixed bg-black z-50 w-full transition-all ease-in-out duration-1000 flex flex-col items-center justify-start gap-20"
            : "h-0 fixed bg-black z-50 w-full transition-all ease-in-out duration-1000"
        }
      >
        <Link
          to="/materialize"
          className="flex flex-col items-center justify-center"
        >
          <p
            className={`text-[30px] text-theme-40 nav mt-20 ${
              text ? "block" : "hidden"
            }`}
          >
            Materialize
          </p>
        </Link>
        <Link to="/merge" className="flex flex-col items-center justify-center">
          <p
            className={`text-[30px] text-theme-40 nav ${
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
            className={`text-[30px] text-theme-40 nav ${
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
            className={`text-[30px] text-theme-30 nav pb-10 ${
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
