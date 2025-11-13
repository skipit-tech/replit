"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      // TODO: Replace with Firebase authentication
      // const { auth, db } = await import("@/lib/firebase/client")
      // const { createUserWithEmailAndPassword } = await import("firebase/auth")
      // const { doc, setDoc } = await import("firebase/firestore")
      //
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // await setDoc(doc(db, "users", userCredential.user.uid), {
      //   email,
      //   createdAt: new Date().toISOString(),
      //   plan: "free",
      //   language: "en",
      //   timerDuration: 8
      // })

      // Placeholder success - remove when Firebase is integrated
      console.log("Sign up attempted with:", { email, password })
      alert("Firebase integration needed. Check console for credentials.")

      // router.push("/")
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError("")
    setLoading(true)

    try {
      // TODO: Replace with Firebase Google authentication
      // const { auth, db } = await import("@/lib/firebase/client")
      // const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth")
      // const { doc, setDoc, getDoc } = await import("firebase/firestore")
      //
      // const provider = new GoogleAuthProvider()
      // const result = await signInWithPopup(auth, provider)
      //
      // const userDoc = await getDoc(doc(db, "users", result.user.uid))
      // if (!userDoc.exists()) {
      //   await setDoc(doc(db, "users", result.user.uid), {
      //     email: result.user.email,
      //     createdAt: new Date().toISOString(),
      //     plan: "free",
      //     language: "en",
      //     timerDuration: 8
      //   })
      // }

      // Placeholder - remove when Firebase is integrated
      alert("Firebase Google OAuth integration needed")

      // router.push("/")
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0B3B] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex justify-center mb-8">
          <img src="/skipit-logo.png" alt="SKIP IT." className="h-10 w-auto" />
        </Link>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
          <p className="text-white/60 text-center mb-6">Start your journey with SKIP IT</p>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#d0e3ff] focus:outline-none transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#d0e3ff] focus:outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#d0e3ff] focus:outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#d0e3ff] text-[#0D0B3B] font-semibold hover:brightness-95 transition disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0D0B3B] text-white/60">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition font-semibold disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#d0e3ff] hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
