import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
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

export const propsAvatar = ({ seed, props }) => {
  const svg = createAvatar(personas, {
    seed: seed,
    backgroundColor: [props.backgroundColor],
    backgroundType: [props.backgroundType],
    backgroundRotation: [props.backgroundRotation],
    body: [props.body],
    clothingColor: [props.clothingColor.substring(1)],
    eyes: [props.eyes],
    hair: [props.hair],
    hairColor: [props.hairColor.substring(1)],
    mouth: [props.mouth],
    nose: [props.nose],
    skinColor: [props.skinColor.substring(1)],
    radius: 5,
  });
  return svg;
};

export const listFiles = async ({ auth }) => {
  return new Promise((resolve) => {
    const storeRef = ref(store, `fusionmania/${auth.uid}`);
    listAll(storeRef).then((res) => {
      const results = [];
      res.items.forEach((item) => {
        let refs = ref(store, item.fullPath);
        getDownloadURL(refs).then((items) => {
          fetch(items).then((file) => {
            file.json().then((final) => {
              results.push(final);
              if (results.length === res.items.length) {
                results.sort((a, b) => b.rating - a.rating);
                resolve(results);
              }
            });
          });
        });
      });
    });
  });
};

export const uidDownload = ({ auth, uid }) => {
  return new Promise((resolve) => {
    uid = Number.parseInt(uid);
    const storeRef = ref(store, `fusionmania/${auth.uid}/${uid}.json`);

    try {
      getDownloadURL(storeRef).then((link) => {
        fetch(link).then((data) => {
          data.json().then((file) => {
            resolve(file);
          });
        });
      });
    } catch (er) {
      console.log(er);
    }
  });
};

export const mergeAvatar = ({ parent1, parent2 }) => {
  let props = {},
    data = {};
  let rate = generateRating();
  data.rating = rate;

  function getOption({ option1, option2 }) {
    let num = Math.floor(Math.random() * 2) + 1;
    switch (num) {
      case 1:
        return option1;
      case 2:
        return option2;
    }
  }

  props.body = getOption({
    option1: parent1,
    option2: parent2,
  }).body;

  props.clothingColor = getOption({
    option1: parent1,
    option2: parent2,
  }).clothingColor;

  props.hair = getOption({
    option1: parent1,
    option2: parent2,
  }).hair;

  props.hairColor = getOption({
    option1: parent1,
    option2: parent2,
  }).hairColor;

  props.mouth = getOption({
    option1: parent1,
    option2: parent2,
  }).mouth;
  props.nose = getOption({
    option1: parent1,
    option2: parent2,
  }).nose;
  props.skinColor = getOption({
    option1: parent1,
    option2: parent2,
  }).skinColor;
  props.eyes = getOption({
    option1: parent1,
    option2: parent2,
  }).eyes;
  props.backgroundType = getOption({
    option1: parent1,
    option2: parent2,
  }).backgroundType;
  props.backgroundColor = rate.rateProps;

  data.svg = propsAvatar({ seed: 12334, props: props });

  return data;
};
