// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJCWruXDBl8V1g2Yn34cpDn7tMDgSKbmI",
  authDomain: "insta-clone-c0eac.firebaseapp.com",
  projectId: "insta-clone-c0eac",
  storageBucket: "insta-clone-c0eac.appspot.com",
  messagingSenderId: "114302837448",
  appId: "1:114302837448:web:373fcb036f62392169bbfd",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
