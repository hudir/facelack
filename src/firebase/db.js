// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "facelack-e2fc0.firebaseapp.com",
  projectId: "facelack-e2fc0",
  storageBucket: "facelack-e2fc0.appspot.com",
  messagingSenderId: "292873487269",
  appId: "1:292873487269:web:7feda318d397223ece9e4c",
  measurementId: "G-L789GPQPXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)