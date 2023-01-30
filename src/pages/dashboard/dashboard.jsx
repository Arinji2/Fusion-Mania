import React, { useState, useEffect } from "react";
import User from "../../components/navbars/user";
import Bg from "../../assets/Account.png";
function Dashboard() {
  return (
    <React.Fragment>
      <User />

      <div className="w-full md:h-[87vh] h-fit bg-theme-10">
        <div className="flex flex-col items-center justify-center relative w-full h-full min-h-screen md:min-h-[87vh]">
          <img src={Bg} className="w-full h-full absolute object-cover top-0" />
          <div className="absolute w-full h-full top-0 bg-theme-0 opacity-50"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
