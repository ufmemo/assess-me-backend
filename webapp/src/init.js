/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPnOEMIIT_8SL5L7QqBNlIjLarMaY3yrU",
  authDomain: "assess-me-45967.firebaseapp.com",
  projectId: "assess-me-45967",
  storageBucket: "assess-me-45967.appspot.com",
  messagingSenderId: "459723990949",
  appId: "1:459723990949:web:26cc0e5e206d0d768bea4c",
  measurementId: "G-KMDLYJGZX0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

// const analytics = getAnalytics(app);

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:3000/login2",
  // This must be true.
  handleCodeInApp: true,
  // dynamicLinkDomain: "example.page.link",
};

const auth = getAuth();

export const getUser = () => {
  return auth.currentUser;
};

export default app;
