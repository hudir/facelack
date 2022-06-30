import { initializeApp } from "firebase/app";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBYXVjObsHSuw-0m18mZD9ROthhxpuHcog",
    authDomain: "facelack-cc75a.firebaseapp.com",
    projectId: "facelack-cc75a",
    storageBucket: "facelack-cc75a.appspot.com",
    messagingSenderId: "119851743588",
    appId: "1:119851743588:web:8e241546e7fc4a21b86271"
  };


  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);

  export {db}