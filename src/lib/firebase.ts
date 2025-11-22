import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Suas credenciais Firebase
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
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;