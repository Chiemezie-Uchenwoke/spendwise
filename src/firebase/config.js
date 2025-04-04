// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfrRQcEj1h2J6Op9_XZANw-3n_Wq1TR9c",
  authDomain: "spendwise-6ac48.firebaseapp.com",
  projectId: "spendwise-6ac48",
  storageBucket: "spendwise-6ac48.firebasestorage.app",
  messagingSenderId: "954016284511",
  appId: "1:954016284511:web:041e2075285656894400ea",
  measurementId: "G-7M7634V348"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);