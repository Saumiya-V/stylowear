
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP3ID0YGOA8BTRCNqr3EBiUAYqM8mEOXc",
  authDomain: "stylowears-37104.firebaseapp.com",
  projectId: "stylowears-37104",
  storageBucket: "stylowears-37104.firebasestorage.app",
  messagingSenderId: "166821157112",
  appId: "1:166821157112:web:aeaa998e8768cce1d4030d"
};


export const app = initializeApp(firebaseConfig);


export const auth = getAuth()