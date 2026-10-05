import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Web config for project "ellt-oxford-prep".
// (Firebase web keys are identifiers, not secrets — your data is protected by
// Firestore security rules, see firestore.rules.)
const firebaseConfig = {
  apiKey: 'AIzaSyAJDyjFRjH2xR5VGoN195u_QPy7Y_Yboq0',
  authDomain: 'ellt-oxford-prep.firebaseapp.com',
  projectId: 'ellt-oxford-prep',
  storageBucket: 'ellt-oxford-prep.firebasestorage.app',
  messagingSenderId: '181207133634',
  appId: '1:181207133634:web:66ac1da5570e7bd6b37a5b',
  measurementId: 'G-PQQ2R7HD1C',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics only works in supported browsers (not in some private modes / SSR).
isSupported()
  .then((ok) => {
    if (ok) getAnalytics(app);
  })
  .catch(() => {});
