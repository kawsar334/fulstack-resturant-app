// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2ZH-uRZocdq1POvxA9ybKk0IUwodHfuA",
    authDomain: "mern-ecommerce-c3931.firebaseapp.com",
    projectId: "mern-ecommerce-c3931",
    storageBucket: "mern-ecommerce-c3931.appspot.com",
    messagingSenderId: "921234479810",
    appId: "1:921234479810:web:989517f90202f3fede395b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app ;