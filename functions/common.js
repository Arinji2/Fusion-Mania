import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { auth, db, store } from "../src/firebase";

export const uploadAvatars = ({ name, seed, props, rateProps }) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = Math.ceil(Math.random() * 1000000);
          props.backgroundColor = rateProps.rateProps;
          const avData = {
            uid: uid,
            seed: seed,
            name: name,
            rating: rateProps.rating,
            props: props,
          };
          const fileRef = ref(
            store,
            `fusionmania/${auth.currentUser.uid}/${uid}.json`
          );
          const jsonBlob = new Blob([JSON.stringify(avData)], {
            type: "application/json",
          });
          uploadBytes(fileRef, jsonBlob)
            .then(() => {
              resolve([true, rateProps]);
            })
            .catch((er) => {
              reject(er);
            });
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

export const generateRating = () => {
  const num = Math.ceil(Math.random() * 5);

  let rating,
    rateProps,
    income = 0,
    upkeep = 0;
  switch (num) {
    case 1:
      rating = 1;
      rateProps = "b6e3f4";
      income = 10;
      break;
    case 2:
      rating = 2;
      rateProps = "c0aede";
      income = 20;
      break;
    case 3:
      rating = 3;
      rateProps = "d1d4f9";
      income = 30;
      upkeep = 20;
      break;
    case 4:
      rating = 4;
      rateProps = "ffd5dc";
      upkeep = 30;
      break;
    case 5:
      rating = 5;
      rateProps = "ffdfbf";
      upkeep = 40;
      break;
  }

  return { rating, rateProps, income, upkeep };
};

export const updateAccount = ({ income, upkeep }) => {
  onAuthStateChanged(auth, () => {
    if (auth) {
      const docRef = doc(db, "fusionmania", auth.currentUser.uid);
      getDoc(docRef).then((res) => {
        updateDoc(docRef, {
          income: res.data().income + income,
          upkeep: res.data().upkeep + upkeep,
          deck: res.data().deck + 1,
        });
      });
    }
  });
};

export const genAvatar = (seed, rateProps) => {
  const svg = createAvatar(personas, {
    seed: seed,
    backgroundColor: [rateProps],
  });
  return svg;
};
