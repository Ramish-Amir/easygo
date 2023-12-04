// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxtJtTwov9YZc9gkAF3uf7E4Xm2E04J3U",
  authDomain: "easy-go-mobile.firebaseapp.com",
  projectId: "easy-go-mobile",
  storageBucket: "easy-go-mobile.appspot.com",
  messagingSenderId: "720531951266",
  appId: "1:720531951266:web:dbad587d098ddf2ac791fb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
