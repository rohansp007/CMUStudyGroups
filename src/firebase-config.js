// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-UfFoRcm1WsRGBuoRmTq1IxlbtDbg0rk",
  authDomain: "cmustudies.firebaseapp.com",
  projectId: "cmustudies",
  storageBucket: "cmustudies.firebasestorage.app",
  messagingSenderId: "901398176265",
  appId: "1:901398176265:web:b5ee3450da2f9e55104ed8",
  measurementId: "G-BVNXN60L0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);