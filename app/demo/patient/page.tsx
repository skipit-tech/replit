"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Heart, BookOpen } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SelfSootheSkillCard } from "@/components/self-soothe-skill-card"
import { ContentWarningModal } from "@/components/content-warning-modal"

const defaultSkills = [
  {
    title: "Breathing Reset",
    description: "Inhale for 4. Hold for 4. Exhale for 6. Repeat 4 times.",
  },
  {
    title: "5-4-3-2-1 Grounding",
    description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you can taste.",
  },
  {
    title: "Safe Visualization",
    description: "Imagine your calming place. Focus on details—temperature, sounds, smells.",
  },
  {
    title: "Release & Drop Technique",
    description: "Relax your shoulders. Unclench your jaw. Take one slow breath.",
  },
  {
    title: "Affirmation Reminder",
    description: '"I am safe right now."',
  },
]

export default function PatientDashboard() {
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [showSkillLibrary, setShowSkillLibrary] = useState(false)

  // Therapist-controlled skills (simulated)
  const therapistSkills = defaultSkills
  const hasSkills = therapistSkills.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654]">
      {/* Header */}
      <header className="bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                aria-label="Go back to main app"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 ml-8">
              Your personalized support tools and settings
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1.5">
            Client View
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-10 space-y-8">
        {/* Self-Soothe Skills Section */}
        {hasSkills ? (
          <>
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Heart className="w-6 h-6 text-rose-500" />
                    Self-Soothe Skills
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Created by your therapist
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 italic">
                    Use these if SKIP IT. flags a difficult moment.
                  </p>
                </div>
                <button
                  onClick={() => setShowSkillLibrary(!showSkillLibrary)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1a1654] border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#4A5FBA] dark:hover:border-[#6B9DFC] transition font-medium text-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  {showSkillLibrary ? "Hide" : "View All Skills"}
                </button>
              </div>

              {/* Skill Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(showSkillLibrary ? therapistSkills : therapistSkills.slice(0, 3)).map((skill, index) => (
                  <SelfSootheSkillCard
                    key={index}
                    title={skill.title}
                    description={skill.description}
                  />
                ))}
              </div>

              {!showSkillLibrary && therapistSkills.length > 3 && (
                <div className="mt-5 text-center">
                  <button
                    onClick={() => setShowSkillLibrary(true)}
                    className="text-[#4A5FBA] dark:text-[#6B9DFC] hover:underline text-sm font-medium"
                  >
                    Show {therapistSkills.length - 3} more skills
                  </button>
                </div>
              )}
            </section>

            {/* Demo Trigger Button */}
            <section className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Demo: Content Warning
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Click below to see what appears when SKIP IT. detects potentially activating content:
                </p>
                <button
                  onClick={() => setShowWarningModal(true)}
                  className="px-6 py-3 rounded-xl bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] text-white font-medium transition"
                >
                  Show Content Warning Modal
                </button>
              </Card>
            </section>

            {/* Info Card */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200/50 dark:border-blue-800/30">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    About Your Skills
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    These skills were chosen by your therapist to help you stay grounded. They'll appear
                    automatically when SKIP IT. detects content that might feel overwhelming. You can also
                    access them anytime from this page.
                  </p>
                </div>
              </div>
            </Card>
          </>
        ) : (
          // No Skills State
          <Card className="p-12 text-center bg-white/90 dark:bg-[#1a1654]/90">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Self-Soothe Skills
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your therapist will add tools here to support grounding and safety.
              </p>
            </div>
          </Card>
        )}
      </main>

      {/* Content Warning Modal */}
      {showWarningModal && (
        <ContentWarningModal
          skills={therapistSkills.slice(0, 3)}
          onClose={() => setShowWarningModal(false)}
        />
      )}
    </div>
  )
}
