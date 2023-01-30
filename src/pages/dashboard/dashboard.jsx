import React, { useState, useEffect } from "react";
import User from "../../components/navbars/user";
import Bg from "../../assets/Account.png";
import Materialize from "../../assets/Materialize.png";
import Merge from "../../assets/Merge.png";
import Manage from "../../assets/Manage.png";
import { faUser } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChessBoard } from "@fortawesome/fontawesome-free-solid";
import fa1 from "../../assets/1-solid.svg";
import fa2 from "../../assets/2-solid.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, store } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getBlob, getBytes, getDownloadURL, ref } from "firebase/storage";

function Dashboard() {
  const [data, setData] = useState({
    name: "Loading",
    deck: "Loading",
  });
  const [starter1, setStarter1] = useState("");
  const [starter2, setStarter2] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (auth) {
        const docRef = doc(db, "fusionmania", auth.currentUser.uid);
        getDoc(docRef).then((res) => {
          setData(res.data());

          getStarter(setStarter1, res.data().startPrim);
          getStarter(setStarter2, res.data().startSecond);
          unsubscribe();
        });
      }
    });
  }, []);

  const getStarter = (dataMethod, number) => {
    const fileRef = ref(
      store,
      `fusionmania/${auth.currentUser.uid}/${number}.json`
    );
    getBytes(fileRef).then((res) => {
      const string = new TextDecoder().decode(res);
      const obj = JSON.parse(string);
      dataMethod(obj.name);
    });
  };
  return (
    <React.Fragment>
      <User />

      <div className="w-full  h-fit bg-theme-10">
        <div className="flex flex-col items-center justify-start relative w-full h-full ">
          <img src={Bg} className="w-full h-full absolute object-cover top-0" />
          <div className="absolute w-full h-full top-0 bg-theme-0 opacity-50"></div>
          <div className="w-full h-full flex flex-col items-center justify-start z-20">
            <h1 className="text-[50px] text-theme-40 mt-10">User Dashboard</h1>
            <div
              className="flex flex-row items-center md:justify-evenly overflow-x-scroll w-[95vw] h-full gap-10 mt-10"
              id="stats"
            >
              <Stats name={data ? data.name : "Loading.."} icon={faUser} />
              <Stats
                name={data ? data.deck : "Loading.."}
                icon={faChessBoard}
              />
              <StatsNum
                name={starter1.length > 0 ? starter1 : "Loading"}
                icon={fa1}
              />
              <StatsNum
                name={starter2.length > 0 ? starter2 : "Loading"}
                icon={fa2}
              />
            </div>
            <div className="w-full h-fit flex flex-row items-center justify-evenly flex-wrap pb-10 mt-10 gap-y-10">
              <Card
                img={Materialize}
                head="Materialize"
                text="Create New Avatars"
              />
              <Card img={Merge} head="Merge" text="Merge Existing Avatars" />
              <Card img={Manage} head="Manage" text="Manage Existing Avatars" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function Stats({ name, icon }) {
  return (
    <div className="min-w-[251px] min-h-[190px] bg-black rounded-lg flex flex-col items-center justify-between">
      <div className="w-[87px] h-[83px] rounded-full bg-theme-0 mt-5 flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={icon} className="text-theme-40 text-[40px]" />
      </div>
      <p className="text-white text-[30px] mb-5">{name}</p>
    </div>
  );
}
function StatsNum({ name, icon }) {
  return (
    <div className="min-w-[251px] min-h-[190px] bg-black rounded-lg flex flex-col items-center justify-between">
      <div className="w-[87px] h-[83px] rounded-full bg-theme-0 mt-5 flex flex-col items-center justify-center">
        <img src={icon} className="text-white w-[40px] h-[40px]" />
      </div>
      <p className="text-white text-[30px] mb-5">{name}</p>
    </div>
  );
}

function Card({ img, head, text }) {
  return (
    <div className="h-[360px] w-[250px] rounded-lg bg-black overflow-clip relative group hover:cursor-pointer">
      <img
        src={img}
        className="w-full h-full object-cover rounded-lg absolute group-hover:scale-110 transition-all ease-in-out duration-300"
      />
      <div className="w-full h-full bg-theme-0 opacity-60 z-10 absolute"></div>
      <div className="flex flex-col items-center justify-start w-full h-full">
        <p className="z-20 text-theme-40 text-[40px] mt-20">{head}</p>
        <p className="absolute bottom-10 text-white text-[20px] z-20">{text}</p>
      </div>
    </div>
  );
}

export default Dashboard;
