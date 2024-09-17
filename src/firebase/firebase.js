import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOQ0D6kuk6OanryvzODhIiA3VLkIX78ms",
  authDomain: "fit-it-782e9.firebaseapp.com",
  projectId: "fit-it-782e9",
  storageBucket: "fit-it-782e9.appspot.com",
  messagingSenderId: "846087500602",
  appId: "1:846087500602:web:af177cb0995ba9d4031603"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
