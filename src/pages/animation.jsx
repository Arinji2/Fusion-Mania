import React, { useState, useEffect } from "react";
import lottie from "lottie-web";
function Animation({ container, flag, location }) {
  useEffect(() => {
    if (flag !== true) return;
    console.log(flag);
    const newAnimation = lottie.loadAnimation({
      container: document.getElementById(container),
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/complete.json",
    });
    newAnimation.addEventListener("complete", () => {
      window.location.assign(`/${location}`);
    });
    return () => newAnimation.destroy();
  }, [flag]);
  return (
    <div className=" absolute h-full w-full ">
      <div id={container}></div>
    </div>
  );
}

export default Animation;
