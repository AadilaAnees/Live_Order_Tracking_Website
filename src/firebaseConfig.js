// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEBykHVQdNIZ91JamtL-6YSAMI_5yGn68",
  authDomain: "smartlogix-tracking.firebaseapp.com",
  databaseURL: "https://smartlogix-tracking-default-rtdb.firebaseio.com",
  projectId: "smartlogix-tracking",
  storageBucket: "smartlogix-tracking.firebasestorage.app",
  messagingSenderId: "324321326956",
  appId: "1:324321326956:web:dc37de969a11b53ba82549",
  measurementId: "G-V6NHPMH0N0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);