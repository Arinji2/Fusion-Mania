import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/auth.png";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { auth, db, store } from "../../firebase";
function Verify() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const sendVerify = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      setSent(true);
      setError(false);
    });
  };

  const checkVerify = () => {
    if (auth.currentUser.emailVerified && sent != true)
      window.location.assign("/dashboard");
    else if (auth.currentUser.emailVerified && sent === true) makeAcct();
    else setError(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      checkVerify();
    });
  }, []);

  const makeAcct = () => {
    const docRef = doc(db, "fusionmania", auth.currentUser.uid);
    setDoc(docRef, {
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
      verified: auth.currentUser.emailVerified,
      startPrim: 0,
      startSecond: 0,
    }).then(() => {
      const fileRef = ref(
        store,
        `fusionmania/${auth.currentUser.uid}/initial.txt`
      );
      uploadBytes(fileRef).then(() => {
        window.location.assign("/setup/name");
      });
    });
  };
  return (
    <React.Fragment>
      <NavBarMain />
      <NavBarMain mode={1} />
      <div className="w-full h-screen relative overflow-hidden">
        <div className="absolute flex flex-col items-center justify-center w-full h-screen md:h-screen overflow-hidden">
          <img src={LoginPic} className="absolute object-cover h-full w-full" />
          <div className="w-full h-full bg-theme-0 opacity-70 absolute"></div>
        </div>
        <div className="w-full h-screen flex flex-col items-center justify-end z-10">
          <div className="w-full h-[75vh] flex flex-col items-center justify-start z-10 gap-10">
            <h1 className="text-[60px] text-theme-50">Verify your Account</h1>
            <p
              className={`text-white text-[30px] p-2 rounded-lg bg-[#29596B] hover:bg-white hover:text-[#29596B] border-2 border-[#29596B] transition-all ease-in-out duration-300 hover:cursor-pointer`}
              onClick={sendVerify}
            >
              Send Verification
            </p>
            <p
              className={`text-white text-[30px] p-2 rounded-lg bg-[#29596B] hover:bg-white hover:text-[#29596B] border-2 border-[#29596B] transition-all ease-in-out duration-300 hover:cursor-pointer`}
              onClick={checkVerify}
            >
              Check Verification
            </p>
            <p
              className={
                sent
                  ? "text-white text-[30px] p-2 rounded-lg bg-theme-30 absolute bottom-10"
                  : "hidden"
              }
            >
              Mail Sent Successfully
            </p>
            <p
              className={
                error
                  ? "text-white text-[30px] p-2 rounded-lg bg-theme-50 absolute bottom-10"
                  : "hidden"
              }
            >
              Account Not Verified
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Verify;
