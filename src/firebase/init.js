import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAnjGrRMUeHro4NNKDqR1IbBzVkCSHWN4Y",
  authDomain: "week7-yiwei-48067.firebaseapp.com",
  projectId: "week7-yiwei-48067",
  storageBucket: "week7-yiwei-48067.appspot.com",
  messagingSenderId: "342743216861",
  appId: "1:342743216861:web:be62f31b7547a0aa5ba134"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db