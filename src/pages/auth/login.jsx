import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/auth.png";
import { Link, redirect } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [logins, setLogins] = useState(0);

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLogins(logins + 1);
      })
      .catch((error) => {
        setError(true);
        if (error.code === "auth/user-not-found")
          setErrorText("Could Not Find User");
        else if (error.code === "auth/wrong-password")
          setErrorText("Incorrect Password");
        else if (error.code === "auth/internal-error")
          setErrorText("An Internal Error has Occurred, Try again later");
        else if (error.code === "auth/invalid-email")
          setErrorText("Email Invalid, Please try Again");
        else setErrorText(error.code);
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser !== null && logins !== 0) {
        if (auth.currentUser.emailVerified)
          window.location.assign("/dashboard");
        else window.location.assign("/verify");
      }
    });
  }, [logins]);

  return (
    <React.Fragment>
      <NavBarMain mode={1} />
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute flex h-screen w-full flex-col items-center justify-center overflow-hidden md:h-screen">
          <img src={LoginPic} className="absolute h-full w-full object-cover" />
          <div className="absolute h-full w-full bg-theme-0 opacity-70"></div>
        </div>
        <div className="flex h-screen w-full flex-col items-center justify-end">
          <div className="z-10 flex min-h-[80vh] w-full flex-col items-start justify-between md:flex-row">
            <div className="mt-10 flex  h-full w-full flex-col items-center justify-end md:mt-0 md:w-[50%] md:justify-center">
              <h1 className="text-5xl text-theme-40 md:text-7xl">
                Login to your Account
              </h1>
              <div className="flex h-full w-full flex-col items-center justify-start md:items-end">
                <div className="mt-10 flex w-[90%] flex-col items-start justify-start text-white md:mt-20 md:mr-5">
                  <p className="text-[30px]">Email</p>
                  <input
                    type={"email"}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="false"
                    className="h-[42px] w-full rounded-lg bg-[#29596B] p-4 text-left  text-[20px] outline-none"
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  ></input>
                </div>
                <div className="md:mt-15 mt-10 flex w-[90%] flex-col items-start justify-start text-white  md:mr-5 md:w-[90%]">
                  <p className="text-[30px]">Password</p>
                  <div className="flex w-full flex-row items-center justify-evenly">
                    <input
                      type={"password"}
                      autoCapitalize="off"
                      autoComplete="off"
                      spellCheck="false"
                      className="h-[42px] w-[70%] rounded-lg bg-[#29596B] p-4 text-left  text-[20px] outline-none"
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                    ></input>
                    <div className="w-[5%]"></div>
                    <Link to="/forgot">
                      <p className="rounded-lg border-2 border-[#29596B] bg-[#29596B] p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-[#29596B] md:pr-4 md:pl-4 md:text-[20px]">
                        Forgot Password
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="mt-10 flex w-full flex-row items-center justify-evenly gap-5">
                  <p
                    className="rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]"
                    onClick={loginUser}
                  >
                    Login
                  </p>
                  <Link to="/create">
                    <p className="rounded-lg border-2 border-theme-30 bg-theme-30 p-2 text-[15px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-theme-30 md:pr-4 md:pl-4 md:text-[25px]">
                      Create Instead
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

export default Login;
