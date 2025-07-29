
// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWXQHQe_y9R15Kr0GpCuu0pPewc0qmBsU",
  authDomain: "website-5a18c.firebaseapp.com",
  projectId: "website-5a18c",
  storageBucket: "website-5a18c.appspot.com",
  messagingSenderId: "636702053767",
  appId: "1:636702053767:web:98f03ebfa3c6665ebd6f22",
  measurementId: "G-LF6ZR9N3RX"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();
