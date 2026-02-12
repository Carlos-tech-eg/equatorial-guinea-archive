// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration (env fallbacks for deployment)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyAn9O9pDA4ehNlY2n87YX5Pdu1yfAFkcq0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "admin-panel-archivoseg.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "admin-panel-archivoseg",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "admin-panel-archivoseg.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "741494838923",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:741494838923:web:9b929d228de9428608268e",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "G-F3DF9BHC00",
};

// Initialize Firebase (singleton for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);
// Use default bucket from app config (no second arg) so Storage works reliably
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
