"use client"

import type React from "react"

import { useState } from "react"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function emailSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, pass)
      router.push("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function googleSignIn() {
    setLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0D0B3B] text-white grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 border border-white/10 bg-white/5">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>

        <button
          onClick={googleSignIn}
          disabled={loading}
          className="w-full rounded-xl bg-white text-[#0D0B3B] py-2.5 font-semibold hover:opacity-90 disabled:opacity-60 transition"
        >
          Continue with Google
        </button>

        <div className="relative my-5 text-center text-white/60 text-sm">
          <span className="px-2 bg-[#0D0B3B] relative z-10">or</span>
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />
        </div>

        <form onSubmit={emailSignIn} className="space-y-3">
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

          {error && (
            <p role="alert" className="text-rose-300 text-sm">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#d0e3ff] text-[#0D0B3B] py-2.5 font-semibold hover:brightness-95 disabled:opacity-60 transition"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-white/70">
          No account?{" "}
          <Link href="/signup" className="underline hover:text-white transition">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}
