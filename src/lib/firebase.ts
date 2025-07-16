
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGf25h1-1S-PMqky132BIN4nsXOe6QKG4",
  authDomain: "website-5a18c.firebaseapp.com",
  projectId: "website-5a18c",
  storageBucket: "website-5a18c.appspot.com",
  messagingSenderId: "931617274358",
  appId: "1:931617274358:web:a7525350353c15374a58d4",
  measurementId: "G-R122L4S622"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}


export { app, analytics, db };
