// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "bestproject-244d6.firebaseapp.com",
  projectId: "bestproject-244d6",
  storageBucket: "bestproject-244d6.appspot.com",
  messagingSenderId: "751743634077",
  appId: "1:751743634077:web:80c47300c607efb49d6274",
  measurementId: "G-JF6Q65BJT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();

// firebase deploy --only hosting:moveforward-election

// firebaseConfig.json
// {
//     "hosting": {
//       "site": "moveforward-election",
  
//       "public": "public",
//       ...
//     }
//   }