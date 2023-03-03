import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../src/firebase";

export const getSetupAvatars = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "fusionmania", user.uid);
          const data = await getDoc(docRef);
          const av1 = data.data().startPrim;
          const av2 = data.data().startSecond;
          resolve({ av1, av2 });
        } catch (error) {
          console.error(error);
          reject(error);
        }
      } else {
        resolve(null);
      }
    });
  });
};

export const genSetupAvatars = ({ mode, seed }) => {
  let svg;
  if (mode === 1) {
    svg = createAvatar(personas, {
      seed: seed,
      clothingColor: ["456dff"],
      eyes: ["happy"],
      body: ["rounded"],
      skinColor: ["623d36"],
    });
  } else {
    svg = createAvatar(personas, {
      seed: seed,
      clothingColor: ["54d7c7"],
      eyes: ["glasses"],
      body: ["rounded"],
      skinColor: ["b16a5b"],
    });
  }

  return svg;
};

export const chooseSetupAvatars = ({ mode, auth }) => {
  return new Promise((resolve) => {
    let seed = Math.random();

    let svg = genSetupAvatars({ mode: mode, seed: seed });

    const docRef = doc(db, "fusionmania", auth.uid);
    if (mode === 1)
      updateDoc(docRef, {
        startPrim: seed,
      }).then(() => {
        resolve(svg);
      });
    else
      updateDoc(docRef, {
        startSecond: seed,
      }).then(() => {
        resolve(svg);
      });
  });
};
