import { auth as getAuth, db as getDb, isFirebaseConfigured } from "./client"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL: string
  phoneNumber: string
  createdAt: Date
  updatedAt: Date
}

// Sign up with email and password
export async function signUp(email: string, password: string, displayName: string) {
  if (!isFirebaseConfigured) {
    console.warn("[Firebase] Not configured. Sign up disabled.")
    throw new Error("Firebase not configured. Please add Firebase credentials to enable authentication.")
  }

  const auth = getAuth()
  const db = getDb()

  if (!auth || !db) {
    throw new Error("Firebase services not initialized")
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // Create user profile in Firestore
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email || email,
    displayName: displayName,
    photoURL: "",
    phoneNumber: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await setDoc(doc(db, "users", user.uid), userProfile)

  return user
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  if (!isFirebaseConfigured) {
    console.warn("[Firebase] Not configured. Sign in disabled.")
    throw new Error("Firebase not configured. Please add Firebase credentials to enable authentication.")
  }

  const auth = getAuth()
  if (!auth) {
    throw new Error("Firebase auth not initialized")
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

// Sign in with Google
export async function signInWithGoogle() {
  if (!isFirebaseConfigured) {
    console.warn("[Firebase] Not configured. Google sign in disabled.")
    throw new Error("Firebase not configured. Please add Firebase credentials to enable authentication.")
  }

  const auth = getAuth()
  const db = getDb()

  if (!auth || !db) {
    throw new Error("Firebase services not initialized")
  }

  const provider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, provider)
  const user = userCredential.user

  // Check if user profile exists, if not create one
  const userDoc = await getDoc(doc(db, "users", user.uid))

  if (!userDoc.exists()) {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      phoneNumber: user.phoneNumber || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)
  }

  return user
}

// Sign out
export async function logOut() {
  if (!isFirebaseConfigured) {
    console.warn("[Firebase] Not configured. Logout disabled.")
    return
  }

  const auth = getAuth()
  if (!auth) return

  await signOut(auth)
}

// Get current user
export function getCurrentUser(): User | null {
  if (!isFirebaseConfigured) {
    return null
  }

  const auth = getAuth()
  if (!auth) return null

  return auth.currentUser
}

// Listen to auth state changes
export function onAuthChange(callback: (user: User | null) => void) {
  if (!isFirebaseConfigured) {
    // Call callback once with null user
    callback(null)
    // Return no-op unsubscribe function
    return () => {}
  }

  const auth = getAuth()
  if (!auth) {
    callback(null)
    return () => {}
  }

  return onAuthStateChanged(auth, callback)
}

// Get user profile from Firestore
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const MOCK_USER_PROFILE: UserProfile = {
    uid: "mock-user-123",
    email: "janedoe@hello.com",
    displayName: "Jane Doe",
    photoURL: "/placeholder-user.jpg",
    phoneNumber: "(555) 123-4567",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  if (!isFirebaseConfigured) {
    console.log("[Firebase] Not configured. Returning mock user profile.")
    return MOCK_USER_PROFILE
  }

  const db = getDb()
  if (!db) return MOCK_USER_PROFILE

  const userDoc = await getDoc(doc(db, "users", uid))

  if (userDoc.exists()) {
    return userDoc.data() as UserProfile
  }

  return null
}

// Update user profile
export async function updateUserProfile(uid: string, updates: Partial<UserProfile>) {
  if (!isFirebaseConfigured) {
    console.log("[Firebase] Not configured. Profile update simulated:", updates)
    return
  }

  const db = getDb()
  if (!db) {
    console.warn("[Firebase] Database not initialized")
    return
  }

  await updateDoc(doc(db, "users", uid), {
    ...updates,
    updatedAt: new Date(),
  })
}
