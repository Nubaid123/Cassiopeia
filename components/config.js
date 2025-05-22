// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAfbhXi_uKksShREIIrrlvwGHIglMF5vLs",
  authDomain: "cassiopeia-4c765.firebaseapp.com",
  projectId: "cassiopeia-4c765",
  storageBucket: "cassiopeia-4c765.appspot.com",  // fixed here
  messagingSenderId: "796482968226",
  appId: "1:796482968226:web:d3c0ffe2f12d39300255fb",
  measurementId: "G-SMENCV1J76"  // optional, used for analytics
};

// Initialize Firebase app (singleton)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore database instance
const db = getFirestore(app);

export { app, db };
