// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIwr2uT0jTCTHck14G4eraWRCEgBHFHrY",
  authDomain: "finalgen2test.firebaseapp.com",
  projectId: "finalgen2test",
  storageBucket: "finalgen2test.firebasestorage.app",
  messagingSenderId: "266696260429",
  appId: "1:266696260429:web:b86e32d59a2ce2ff501504",
  measurementId: "G-08LQQ6N2DD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);