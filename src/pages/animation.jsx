import React, { useState, useEffect } from "react";
import lottie from "lottie-web";
function Animation() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter(counter + 1);
  }, []);

  useEffect(() => {
    const newAnimation = lottie.loadAnimation({
      container: document.getElementById("animation-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "./complete.json",
      height: 200,
      width: 200,
    });
    return () => newAnimation.destroy();
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      <div id="animation-container"></div>
    </div>
  );
}

export default Animation;
