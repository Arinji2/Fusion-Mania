import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB58DNUia7wT_W9oOF-s7l0ZHk7B7SZt8c",
  authDomain: "arinji-9a53b.firebaseapp.com",
  databaseURL:
    "https://arinji-9a53b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arinji-9a53b",
  storageBucket: "arinji-9a53b.appspot.com",
  messagingSenderId: "992504505004",
  appId: "1:992504505004:web:c99ee7b53e8d0e2b897509",
  measurementId: "G-V41MBDNM63",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const store = getStorage(app);
