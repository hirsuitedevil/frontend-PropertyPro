
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apikey,
  authDomain: "property-pro-hirsuite.firebaseapp.com",
  projectId: "property-pro-hirsuite",
  storageBucket: "property-pro-hirsuite.appspot.com",
  messagingSenderId: "556867948456",
  appId: "1:556867948456:web:58584dfe7b8ad863f7179d",
  measurementId: "G-XBWCHXE6S0",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);