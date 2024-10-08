// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-701e9.firebaseapp.com",
  projectId: "mern-blog-701e9",
  storageBucket: "mern-blog-701e9.appspot.com",
  messagingSenderId: "369557975358",
  appId: "1:369557975358:web:46b241ae51de4f0114fc6f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
