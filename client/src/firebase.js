// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxnjirat0FVp4i4CZy7yUwKj3j_lf8c_c",
  authDomain: "hanhshop-f57b2.firebaseapp.com",
  projectId: "hanhshop-f57b2",
  storageBucket: "hanhshop-f57b2.appspot.com",
  messagingSenderId: "625914841479",
  appId: "1:625914841479:web:2f883bbb98e156d486eb22",
  measurementId: "G-L7KE07KCB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);