// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUsbEg2TeezvM6Jqzu8AIysqmqdEOzJX0",
  authDomain: "ddock-ple.firebaseapp.com",
  projectId: "ddock-ple",
  storageBucket: "ddock-ple.appspot.com",
  messagingSenderId: "419146557696",
  appId: "1:419146557696:web:ed742ca132e817dad6ebe5",
  measurementId: "G-HGFY9PWT3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics