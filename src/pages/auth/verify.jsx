import React, { useState, useEffect } from "react";
import NavBarMain from "../../components/navbars/main";
import LoginPic from "../../assets/auth.png";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
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
    auth.currentUser.reload();
    if (auth.currentUser.emailVerified && sent != true) {
      const docRef = doc(db, "fusionmania", auth.currentUser.uid);
      getDoc(docRef).then((res) => {
        if (res.exists() === false) makeAcct();
        else window.location.assign("/dashboard");
      });
    } else if (auth.currentUser.emailVerified && sent === true) makeAcct();
    else {
      setError(true);
    }
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
      deck: 0,
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
      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute flex h-screen w-full flex-col items-center justify-center overflow-hidden md:h-screen">
          <img src={LoginPic} className="absolute h-full w-full object-cover" />
          <div className="absolute h-full w-full bg-theme-0 opacity-70"></div>
        </div>
        <div className="z-10 flex h-screen w-full flex-col items-center justify-end">
          <div className="z-10 flex h-[75vh] w-full flex-col items-center justify-start gap-10">
            <h1 className="text-[60px] text-theme-50">Verify your Account</h1>
            <p
              className={`rounded-lg border-2 border-[#29596B] bg-[#29596B] p-2 text-[30px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-[#29596B]`}
              onClick={sendVerify}
            >
              Send Verification
            </p>
            <p
              className={`rounded-lg border-2 border-[#29596B] bg-[#29596B] p-2 text-[30px] text-white transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-white hover:text-[#29596B]`}
              onClick={checkVerify}
            >
              Check Verification
            </p>
            <p
              className={
                sent
                  ? "absolute bottom-10 rounded-lg bg-theme-30 p-2 text-[30px] text-white"
                  : "hidden"
              }
            >
              Mail Sent Successfully
            </p>
            <p
              className={
                error
                  ? "absolute bottom-10 rounded-lg bg-theme-50 p-2 text-[30px] text-white"
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
