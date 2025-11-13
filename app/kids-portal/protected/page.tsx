"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ProtectedPage() {
  const [isProtectionEnabled, setIsProtectionEnabled] = useState(true)

  const kidProfile = {
    name: "Sophia",
    grade: 4,
    avatar: "/kids/bunny-party.png",
  }

  return (
    <div className="min-h-screen bg-[#E5F0FF] text-slate-900 dark:bg-[#050821] dark:text-white transition-colors flex items-center justify-center p-6">
      <main className="w-full">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            {/* Avatar and Name */}
            <div className="flex flex-col items-center mb-8">
              <div className="h-24 w-24 rounded-full bg-[#F2F6FF] dark:bg-slate-900 flex items-center justify-center mb-4">
                <Image
                  src={kidProfile.avatar || "/placeholder.svg"}
                  alt={`${kidProfile.name}'s bunny avatar`}
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px]"
                />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                You're protected, {kidProfile.name}.
              </h1>
            </div>

            {/* Safe Message */}
            <div className="text-center mb-8">
              <p className="text-base text-slate-600 dark:text-slate-200">
                If anything upsetting comes on, SKIP IT. will skip it for you.
              </p>
            </div>

            {/* Toggle Card */}
            <div className="bg-[#F2F6FF] dark:bg-slate-900 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="protection-toggle"
                  className="text-base font-medium text-slate-900 dark:text-white cursor-pointer"
                >
                  Skip scary scenes for me
                </label>
                <button
                  id="protection-toggle"
                  role="switch"
                  aria-checked={isProtectionEnabled}
                  onClick={() => setIsProtectionEnabled(!isProtectionEnabled)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC] focus-visible:ring-offset-2 ${
                    isProtectionEnabled ? "bg-[#6B9DFC]" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <span className="sr-only">Toggle protection</span>
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      isProtectionEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Reassurance Text */}
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                You can always ask your teacher if something doesn't feel good.
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <Link
              href="/kids-portal/whos-watching"
              className="text-sm text-slate-600 dark:text-slate-300 hover:text-[#6B9DFC] dark:hover:text-[#8BB3FF] transition-colors"
            >
              Back to profile selection
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
