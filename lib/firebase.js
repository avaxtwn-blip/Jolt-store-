// Firebase config for the Jolt Store project.
// Note: this apiKey is not a secret — Firebase web config is meant to be
// public. Real protection comes from your Firestore Security Rules.
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDpN93Za2c0U0-fP7y_p6-WqvHa88qnfGI',
  authDomain: 'jolt-store.firebaseapp.com',
  projectId: 'jolt-store',
  storageBucket: 'jolt-store.firebasestorage.app',
  messagingSenderId: '261104229487',
  appId: '1:261104229487:web:a7375e2faaf9d4317f819a'
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
