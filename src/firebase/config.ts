/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseAppletConfig from '../../firebase-applet-config.json';

// Use environment variables if present (VITE_ prefix is required for client-side)
// Fallback to the JSON file for local dev/preview if config is there (but discouraged for safety)
const getEnv = (key: string, fallback: string) => {
  const value = import.meta.env[key] || fallback;
  return typeof value === 'string' ? value.replace(/^["']|["']$/g, '') : value;
};

const firebaseConfig = {
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID', firebaseAppletConfig.projectId),
  appId: getEnv('VITE_FIREBASE_APP_ID', firebaseAppletConfig.appId),
  apiKey: getEnv('VITE_FIREBASE_API_KEY', firebaseAppletConfig.apiKey),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN', firebaseAppletConfig.authDomain),
  firestoreDatabaseId: getEnv('VITE_FIREBASE_FIRESTORE_DATABASE_ID', firebaseAppletConfig.firestoreDatabaseId),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET', firebaseAppletConfig.storageBucket),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', firebaseAppletConfig.messagingSenderId),
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID', firebaseAppletConfig.measurementId),
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Connectivity check
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or internet connection.");
    }
  }
}
testConnection();
