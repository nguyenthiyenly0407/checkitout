
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBpMz4zSFMb6gFzN0bcAR7Zm_gAHGTMb8Q",
    authDomain: "shaped-approach-443217-q1.firebaseapp.com",
    projectId: "shaped-approach-443217-q1",
    storageBucket: "shaped-approach-443217-q1.firebasestorage.app",
    messagingSenderId: "1060354404200",
    appId: "1:1060354404200:web:46c8232d7011b1e73930dd",
    measurementId: "G-Z7F2R3SJPB"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
