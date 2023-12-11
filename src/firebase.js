// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJZBUt4T73zi763W7WfkzEgBpXyOObCUk",
  authDomain: "daily-deal-405900.firebaseapp.com",
  projectId: "daily-deal-405900",
  storageBucket: "daily-deal-405900.appspot.com",
  messagingSenderId: "59652633299",
  appId: "1:59652633299:web:cbcfdbd1572bd9ecde9a26",
  measurementId: "G-GDKN1YP3DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);