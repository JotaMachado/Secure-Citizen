// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrJb4kn_DiaHc7DRDI93paCiGDhXr1Ci4",
  authDomain: "fir-d0c95.firebaseapp.com",
  databaseURL: "https://fir-d0c95-default-rtdb.firebaseio.com",
  projectId: "fir-d0c95",
  storageBucket: "fir-d0c95.appspot.com",
  messagingSenderId: "534148119603",
  appId: "1:534148119603:web:0374385d0227962ea0b746",
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
