import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDrT4y9rkM3OkAm-ltRz2FLdYaIeT2xBPM",
  authDomain: "get-job-today.firebaseapp.com",
  projectId: "get-job-today",
  storageBucket: "get-job-today.appspot.com",
  messagingSenderId: "487731272666",
  appId: "1:487731272666:web:e0ff460c46351ce5fafee3",
  measurementId: "G-WFKMQWR35E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider;