// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmBsMTdG8moO5loyDCWgWWHkmK_9IQIkI",
  authDomain: "edupathsa-a5764.firebaseapp.com",
  projectId: "edupathsa-a5764",
  storageBucket: "edupathsa-a5764.firebasestorage.app",
  messagingSenderId: "543142695312",
  appId: "1:543142695312:web:1bd84740ef5f11cdef6315",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);