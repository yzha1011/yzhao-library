import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCmu6mB7pAcM2YmDch35f4IGSqLG0715wA",
  authDomain: "week7-yiwei-93078.firebaseapp.com",
  projectId: "week7-yiwei-93078",
  storageBucket: "week7-yiwei-93078.appspot.com",
  messagingSenderId: "292152931895",
  appId: "1:292152931895:web:afbc77f1cae4b569a831b2"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db