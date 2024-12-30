// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-3c80e.firebaseapp.com",
  projectId: "car-marketplace-3c80e",
  storageBucket: "car-marketplace-3c80e.firebasestorage.app",
  messagingSenderId: "121882057147",
  appId: "1:121882057147:web:d114bbf50b6e439c848c9e",
  measurementId: "G-GC9J2PG3DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);