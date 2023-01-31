import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/auth.png";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
function Create() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.assign("/verify");
      })
      .catch((error) => {
        setError(true);
        if (error.code === "auth/email-already-in-use")
          setErrorText("Email Already Exists");
        else if (error.code === "auth/weak-password")
          setErrorText("Weak Password");
        else if (error.code === "auth/internal-error")
          setErrorText("An Internal Error has Occurred, Try again later");
        else if (error.code === "auth/invalid-email")
          setErrorText("Email Invalid, Please try Again");
        else setErrorText(error.code);
      });
  };
  return (
    <React.Fragment>
      <NavBarMain mode={1} />
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute flex h-screen w-full flex-col items-center justify-center overflow-hidden md:h-screen">
          <img
            src={LoginPic}
            className="absolute h-full w-full object-cover object-center"
          />
          <div className="absolute h-full w-full bg-theme-0 opacity-70"></div>
        </div>
        <div className="flex h-screen w-full flex-col items-center justify-end">
          <div className="z-10 flex min-h-[75vh] w-full flex-col items-start justify-between md:flex-row">
            <div className="mt-10 flex  h-full w-full flex-col items-center justify-end md:mt-0 md:w-[50%] md:justify-center">
              <h1 className="text-5xl text-theme-40 md:text-7xl">
                Create your Account
              </h1>
              <div className="flex h-full w-full flex-col items-center justify-start md:items-end">
                <div className="mt-10 flex w-[90%] flex-col items-start justify-start text-white md:mt-10 md:mr-5">
                  <p className="text-[30px]">Email</p>
                  <input
                    type={"email"}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="false"
                    className="min-h-[42px] w-full rounded-lg bg-[#29596B] p-4 text-left  text-[20px] outline-none"
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  ></input>
                </div>
                <div className="mt-10 flex w-[90%] flex-col items-start justify-start text-white md:mt-20 md:mr-5">
                  <p className="text-[30px]">Password</p>
                  <div className="flex w-full flex-row items-center justify-evenly">
                    <input
                      type={"password"}
                      autoCapitalize="off"
                      autoComplete="off"
                      spellCheck="false"
                      className="min-h-[42px] w-full rounded-lg bg-[#29596B] p-4 text-left  text-[20px] outline-none"
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="mt-10 flex w-full flex-row items-center justify-evenly gap-5">
                  <p
                    className="rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
                    onClick={createUser}
                  >
                    Create
                  </p>
                  <Link to="/login">
                    <p className="rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]">
                      Login Instead
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center md:w-[50%]">
              <div
                className={
                  error
                    ? "mt-2 flex h-fit w-fit flex-col items-center justify-center rounded-lg bg-red-600 p-2 text-white"
                    : "hidden"
                }
              >
                <p className="text-xl md:text-2xl">An Error Occured</p>
                <p className="text-md md:text-xl">{errorText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Create;
