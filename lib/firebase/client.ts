import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

/**
 * FIREBASE SETUP INSTRUCTIONS FOR DEVELOPERS
 * ==========================================
 *
 * 1. Create a Firebase project at https://console.firebase.google.com
 *
 * 2. Enable Authentication:
 *    - Go to Authentication > Sign-in method
 *    - Enable Email/Password
 *    - Enable Google (optional)
 *
 * 3. Create Firestore Database:
 *    - Go to Firestore Database > Create database
 *    - Start in production mode or test mode
 *
 * 4. Enable Storage:
 *    - Go to Storage > Get started
 *    - Set up security rules for profile photos
 *
 * 5. Add environment variables to your project:
 *    - Go to Project Settings > General
 *    - Copy your Firebase config values
 *    - Add them to your .env.local file or Vercel environment variables:
 *
 *    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
 *    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
 *    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
 *    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
 *    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
 *    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
 *
 * 6. The app will work with mock data until Firebase is configured.
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const isFirebaseConfigured = Object.values(firebaseConfig).every((value) => value !== undefined)

// Initialize Firebase app only if configured
let app: FirebaseApp | null = null
if (isFirebaseConfigured) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }
  } catch (error) {
    console.warn("[Firebase] Initialization failed:", error)
  }
}

let auth: Auth | undefined
let db: Firestore | undefined
let storage: FirebaseStorage | undefined

const getFirebaseAuth = () => {
  if (!app) return null
  if (!auth) {
    auth = getAuth(app)
  }
  return auth
}

const getFirebaseFirestore = () => {
  if (!app) return null
  if (!db) {
    db = getFirestore(app)
  }
  return db
}

const getFirebaseStorage = () => {
  if (!app) return null
  if (!storage) {
    storage = getStorage(app)
  }
  return storage
}

export {
  app,
  getFirebaseAuth as auth,
  getFirebaseFirestore as db,
  getFirebaseStorage as storage,
  isFirebaseConfigured, // Export flag to check if Firebase is ready
}
