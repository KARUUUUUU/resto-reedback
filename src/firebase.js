import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjuRQwcg9v71o4RX91kBlltcpQJh8TAas",
  authDomain: "customer-feedback-fb3b2.firebaseapp.com",
  projectId: "customer-feedback-fb3b2",
  storageBucket: "customer-feedback-fb3b2.firebasestorage.app",
  messagingSenderId: "272570339560",
  appId: "1:272570339560:web:8b577ba13145a7be2a395d",
  measurementId: "G-X0NM3ZYXX7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
