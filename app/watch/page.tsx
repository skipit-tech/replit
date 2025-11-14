"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Check } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const defaultSkills = [
  "Pause and take 3 deep breaths",
  "Use a grounding exercise (5 things you can see, 4 you can touch…)",
  "Remind myself I can always skip scenes",
  "Reach out to someone I trust",
]

export default function WatchPage() {
  const [checkedSkills, setCheckedSkills] = useState<Set<number>>(new Set())
  const [showPostWatch, setShowPostWatch] = useState(false)
  const [notReady, setNotReady] = useState(false)

  const toggleSkill = (index: number) => {
    const newChecked = new Set(checkedSkills)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedSkills(newChecked)
  }

  const handleNotReady = () => {
    setNotReady(true)
  }

  const handleReady = () => {
    setShowPostWatch(true)
  }

  if (notReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654] flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Got it</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We'll keep skipping these scenes for now. You can adjust your settings anytime.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-[#4A5FBA] dark:bg-[#6B9DFC] text-white font-semibold hover:brightness-95 transition"
          >
            Return Home
          </Link>
        </Card>
      </div>
    )
  }

  if (showPostWatch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654] flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Check-In</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            How are you feeling? You can use your coping skills or take a break anytime.
          </p>

          <div className="space-y-3 mb-6">
            {defaultSkills.map((skill, index) => (
              <label
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#0D0B3B]/30 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0D0B3B]/50 transition"
              >
                <Checkbox
                  checked={checkedSkills.has(index)}
                  onCheckedChange={() => toggleSkill(index)}
                  className="mt-0.5"
                />
                <span className="text-sm text-gray-900 dark:text-white flex-1">{skill}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 px-6 py-3 rounded-xl bg-[#4A5FBA] dark:bg-[#6B9DFC] text-white font-semibold hover:brightness-95 transition text-center"
            >
              Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-[#0D0B3B]/50 transition"
            >
              Continue
            </button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654]">
      <header className="bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Before You Watch</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <Card className="p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Before You Watch</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Here are some things that might help if you start to feel overwhelmed.
          </p>

          <div className="space-y-4 mb-8">
            {defaultSkills.map((skill, index) => (
              <label
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#0D0B3B]/30 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0D0B3B]/50 transition border border-gray-200 dark:border-gray-700"
              >
                <Checkbox
                  checked={checkedSkills.has(index)}
                  onCheckedChange={() => toggleSkill(index)}
                  className="mt-0.5"
                />
                <span className="text-base text-gray-900 dark:text-white flex-1">{skill}</span>
              </label>
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleReady}
              className="w-full px-6 py-4 rounded-xl bg-[#4A5FBA] dark:bg-[#6B9DFC] text-white text-lg font-semibold hover:brightness-95 transition"
            >
              I'm Ready
            </button>
            <button
              onClick={handleNotReady}
              className="w-full px-6 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
            >
              I'm Not Ready – Keep Skipping These Scenes
            </button>
          </div>
        </Card>
      </main>
    </div>
  )
}
