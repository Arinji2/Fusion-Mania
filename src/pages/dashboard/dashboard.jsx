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

import { faMoneyBillWave } from "@fortawesome/fontawesome-free-solid";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, store } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import { Link } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState({
    name: "Loading",
    deck: "Loading",
  });
  const [income, setIncome] = useState(0);
  const [upkeep, setUpkeep] = useState(0);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (auth) {
        const docRef = doc(db, "fusionmania", auth.currentUser.uid);
        getDoc(docRef).then((res) => {
          if (res.exists() === false) window.location.assign("/verify");
          setData(res.data());

          setIncome(res.data().income);
          setUpkeep(res.data().upkeep);
          localStorage.setItem("income", res.data().income);
          localStorage.setItem("upkeep", res.data().upkeep);
          unsubscribe();
        });
      }
    });
  }, []);

  return (
    <React.Fragment>
      <User />

      <div className="h-fit  w-full bg-theme-10">
        <div className="relative flex h-full w-full flex-col items-center justify-start ">
          <img src={Bg} className="absolute top-0 h-full w-full object-cover" />
          <div className="absolute top-0 h-full w-full bg-theme-0 opacity-50"></div>
          <div className="z-20 flex h-full w-full flex-col items-center justify-start">
            <h1 className="mt-10 text-[50px] text-theme-40">User Dashboard</h1>
            <div
              className="mt-10 flex h-full w-[95vw] flex-row items-center gap-10 overflow-x-scroll md:justify-evenly"
              id="stats"
            >
              <Stats name={data ? data.name : "Loading.."} icon={faUser} />
              <Stats
                name={data ? `${data.deck}/50` : "Loading.."}
                icon={faChessBoard}
              />
              <StatsNum name={income > 0 ? `+${income}` : 0} icon={fa1} />
              <StatsNum name={upkeep > 0 ? `-${upkeep}` : 0} icon={fa2} />
            </div>
            <div className="mt-10 flex h-fit w-full flex-row flex-wrap items-center justify-evenly gap-y-10 pb-10">
              <Card
                img={Materialize}
                head="Materialize"
                text="Create New Avatars"
                location="/materialize"
                income={income}
                upkeep={upkeep}
              />

              <Card
                img={Merge}
                head="Merge"
                text="Merge Existing Avatars"
                location="/merge/first"
                income={income}
                upkeep={upkeep}
              />
              <Card
                img={Manage}
                head="Manage"
                text="Manage Existing Avatars"
                location="/manage"
                income={income}
                upkeep={upkeep}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function Stats({ name, icon }) {
  return (
    <div className="flex min-h-[190px] min-w-[251px] flex-col items-center justify-between rounded-lg bg-black">
      <div className="mt-5 flex h-[83px] w-[87px] flex-col items-center justify-center rounded-full bg-theme-0">
        <FontAwesomeIcon icon={icon} className="text-[40px] text-theme-40" />
      </div>
      <p className="mb-5 text-[30px] text-white">{name}</p>
    </div>
  );
}
function StatsNum({ name, icon }) {
  return (
    <div className="flex min-h-[190px] min-w-[251px] flex-col items-center justify-between rounded-lg bg-black">
      <div className="mt-5 flex h-[83px] w-[87px] flex-col items-center justify-center rounded-full bg-theme-0">
        <img src={icon} className="h-[40px] w-[40px] text-white" />
      </div>
      <p className="mb-5 text-[30px] text-white">{name}</p>
    </div>
  );
}

function Card({ img, head, text, income, upkeep, location }) {
  if (income <= upkeep && head !== "Manage")
    return (
      <div className="group relative h-[360px] w-[250px] overflow-clip rounded-lg bg-black hover:cursor-pointer">
        <img
          src={img}
          className="absolute h-full w-full rounded-lg object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute z-10 h-full w-full bg-theme-0 opacity-90"></div>
        <div className="flex h-full w-full flex-col items-center justify-start">
          <p className="z-20 mt-20 text-[40px] text-white">{head}</p>
          <p className="absolute bottom-20 z-20 text-[25px] text-theme-40">
            You can not afford this
          </p>
        </div>
      </div>
    );
  else
    return (
      <div
        className="group relative h-[360px] w-[250px] overflow-clip rounded-lg bg-black hover:cursor-pointer"
        onClick={() => {
          window.location.assign(location);
        }}
      >
        <img
          src={img}
          className="absolute h-full w-full rounded-lg object-cover transition-all duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute z-10 h-full w-full bg-theme-0 opacity-50"></div>
        <div className="flex h-full w-full flex-col items-center justify-start">
          <p className="z-20 mt-20 text-[40px] text-theme-40">{head}</p>
          <p className="absolute bottom-10 z-20 text-[20px] text-white">
            {text}
          </p>
        </div>
      </div>
    );
}

export default Dashboard;
