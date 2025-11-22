// lib/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";
import { getDatabase, ref, set, get, update, onValue, remove } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8sm6ZnLvHF3oHjUvWA5bCcLWJBtHZULA",
  authDomain: "ecobox-jii.firebaseapp.com",
  databaseURL: "https://ecobox-jii-default-rtdb.firebaseio.com",
  projectId: "ecobox-jii",
  storageBucket: "ecobox-jii.firebasestorage.app",
  messagingSenderId: "141770386004",
  appId: "1:141770386004:web:f5d50ca505bb61f5df5bc1",
  measurementId: "G-H75XWY1XHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);

// Configure providers
const googleProvider = new GoogleAuthProvider();

// Export everything for use in other components and files
export { 
  app,
  auth, 
  database,
  analytics,
  googleProvider,
  // Authentication functions
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  // Realtime Database functions
  ref,
  set,
  get,
  update,
  onValue,
  remove
};