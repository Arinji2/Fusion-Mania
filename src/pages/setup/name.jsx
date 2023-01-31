import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import SetupPic from "../../assets/setup.png";
import { auth, db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { Link, redirect, useNavigate } from "react-router-dom";
function Name() {
  const [name, setName] = useState("Hunter");
  const [redirect, setRedirect] = useState(false);
  const naviage = useNavigate();
  const updateName = () => {
    const docRef = doc(db, "fusionmania", auth.currentUser.uid);

    updateDoc(docRef, {
      name: name,
    }).then(() => {
      naviage("/setup/choose");
    });
  };

  return (
    <React.Fragment>
      <NavBarMain mode={1} />
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={SetupPic}
          className="setup absolute h-full w-full object-cover"
        />
        <div className="absolute h-screen w-full bg-theme-0 opacity-70"></div>
        <div className="flex h-screen w-full flex-col items-center justify-start">
          <div className="h-[30vh] w-full"></div>
          <div className="z-10 flex h-full w-full flex-col items-center justify-start gap-10">
            <h1 className="text-[40px] text-theme-50 md:text-[60px]">
              Welcome Explorer
            </h1>
            <p className="text-[30px] text-white md:text-[50px]">
              Name Yourself
            </p>
            <input
              type={"email"}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              className="mt-10 h-[42px] w-[95vw] rounded-lg bg-[#29596B] p-4 text-left text-[20px]  text-white outline-none md:w-[50vw]"
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
            ></input>
            <p
              className="absolute bottom-10 rounded-lg bg-theme-30 p-2 text-3xl text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30"
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
