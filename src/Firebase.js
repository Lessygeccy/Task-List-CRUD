// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVfeaEJdbIgrN1j_QOH8WjfBEZdPhlG30",
  authDomain: "to-do-web-c2fca.firebaseapp.com",
  projectId: "to-do-web-c2fca",
  storageBucket: "to-do-web-c2fca.appspot.com",
  messagingSenderId: "698247256920",
  appId: "1:698247256920:web:7633fe206adee19a27232d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)