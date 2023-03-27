import React from "react";
// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOfOG6Tx0gL652QelYZUhXvgu3_2IISwc",
  authDomain: "rijksmuseum-react-project.firebaseapp.com",
  projectId: "rijksmuseum-react-project",
  storageBucket: "rijksmuseum-react-project.appspot.com",
  messagingSenderId: "976236781861",
  appId: "1:976236781861:web:112a92c560742d5636facc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
