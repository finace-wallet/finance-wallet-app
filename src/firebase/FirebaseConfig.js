// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6lvNPysKPQAdwcR3y1lyU_wMEPmu1Ww0",
  authDomain: "fin-wallet-12d2c.firebaseapp.com",
  projectId: "fin-wallet-12d2c",
  storageBucket: "fin-wallet-12d2c.appspot.com",
  messagingSenderId: "583562424349",
  appId: "1:583562424349:web:c9137497c86b4fa08896f4",
  measurementId: "G-TSJC1YNHLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getAnalytics(app);
export default storage;