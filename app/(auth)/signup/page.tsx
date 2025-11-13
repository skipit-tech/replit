"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "@/lib/firebase/client"
import { setDoc, doc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  async function emailSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (pass !== confirmPass) {
      setError("Passwords don't match")
      return
    }

    if (!auth || !db) {
      setError("Firebase is not configured. Please add environment variables.")
      return
    }

    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pass)

      await setDoc(doc(db, "profiles", user.uid), {
        id: user.uid,
        email: user.email,
        display_name: user.email?.split("@")[0] || "User",
        plan: "Free",
        language: "en",
        timer_sec: 30,
        avatar_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      })

      router.push("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function googleSignUp() {
    if (!auth || !db) {
      setError("Firebase is not configured. Please add environment variables.")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, provider)

      await setDoc(
        doc(db, "profiles", user.uid),
        {
          id: user.uid,
          email: user.email,
          display_name: user.displayName || user.email?.split("@")[0] || "User",
          plan: "Free",
          language: "en",
          timer_sec: 30,
          avatar_url: user.photoURL,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { merge: true },
      )

      router.push("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#0D0B3B] text-white grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 border border-white/10 bg-white/5">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>

        <button
          onClick={googleSignUp}
          disabled={loading}
          className="w-full rounded-xl bg-white text-[#0D0B3B] py-2.5 font-semibold hover:opacity-90 disabled:opacity-60 transition"
        >
          Continue with Google
        </button>

        <div className="relative my-5 text-center text-white/60 text-sm">
          <span className="px-2 bg-[#0D0B3B] relative z-10">or</span>
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />
        </div>

        <form onSubmit={emailSignUp} className="space-y-3">
          <label className="block">
            <span className="text-sm text-white/80">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-[#d0e3ff]/50"
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/80">Password</span>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              required
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-[#d0e3ff]/50"
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/80">Confirm Password</span>
            <input
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              required
              className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-[#d0e3ff]/50"
            />
          </label>

          {error && (
            <p role="alert" className="text-rose-300 text-sm">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#d0e3ff] text-[#0D0B3B] py-2.5 font-semibold hover:brightness-95 disabled:opacity-60 transition"
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-white/70">
          Already have an account?{" "}
          <Link href="/signin" className="underline hover:text-white transition">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
