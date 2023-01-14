import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import SetupPic from "../../assets/setup.png";
import { auth, db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { Link, redirect, useNavigate } from "react-router-dom";
function Name() {
  const [name, setName] = useState("Hunter");
  const updateName = () => {
    const docRef = doc(db, "fusionmania", auth.currentUser.uid);

    updateDoc(docRef, {
      name: name,
    }).then(() => {
      window.location.assign("/setup");
    });
  };
  return (
    <React.Fragment>
      <NavBarMain mode={1} />
      <div className="w-full h-screen relative overflow-hidden">
        <img
          src={SetupPic}
          className="w-full h-full object-cover setup absolute"
        />
        <div className="w-full h-screen opacity-70 bg-theme-0 absolute"></div>
        <div className="w-full h-screen flex flex-col items-center justify-start">
          <div className="w-full h-[30vh]"></div>
          <div className="w-full h-full flex flex-col items-center justify-start z-10 gap-10">
            <h1 className="text-theme-50 text-[40px] md:text-[60px]">
              Welcome Explorer
            </h1>
            <p className="text-white text-[30px] md:text-[50px]">
              Name Yourself
            </p>
            <input
              type={"email"}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              className="rounded-lg h-[42px] w-[95vw] md:w-[50vw] text-[20px] mt-10 p-4 outline-none  bg-[#29596B] text-left text-white"
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
            ></input>
            <p
              className="absolute bottom-10 p-2 bg-theme-30 text-white text-3xl rounded-lg hover:text-theme-30 hover:bg-white transition-all ease-in-out duration-300 hover:cursor-pointer"
              onClick={updateName}
            >
              Lets Roll!
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Name;
