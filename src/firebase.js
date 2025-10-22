// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHYEGQ7TMnABtwGzBC01ZcDZSPB0-tQGI",
  authDomain: "instiwise-testing.firebaseapp.com",
  projectId: "instiwise-testing",
  storageBucket: "instiwise-testing.appspot.com",
  messagingSenderId: "758964554716",
  appId: "1:758964554716:web:71070237f29df384e11d19"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;