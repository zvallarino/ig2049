import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCfG8zu1gXaFeFZpqaUSbIVI9nj_fUXmkQ",
    authDomain: "instagram2049-aef00.firebaseapp.com",
    projectId: "instagram2049-aef00",
    storageBucket: "instagram2049-aef00.appspot.com",
    messagingSenderId: "651519530258",
    appId: "1:651519530258:web:64d00e987b460136494fcb",
    measurementId: "G-RR5E2ESQ3E"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);




export  { db, auth, storage } 