"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, BookOpen, Shield, Users, TrendingUp } from 'lucide-react'

type UserRole = "school-admin" | "teacher" | "parent" | "therapist" | "general"

interface GuidedSetupModalProps {
  open: boolean
  onClose: () => void
  userRole: UserRole
}

export function GuidedSetupModal({ open, onClose, userRole }: GuidedSetupModalProps) {
  const [step, setStep] = useState(1)
  const [demoChoice, setDemoChoice] = useState<"skip" | "blur" | "play" | null>(null)

  const getRoleMessage = () => {
    switch (userRole) {
      case "school-admin":
        return "You'll manage district-wide filters, grade-level profiles, and classroom safety settings."
      case "teacher":
        return "You'll control filters for your class and monitor student profiles."
      case "parent":
        return "You can adjust your child's settings, sensitivities, and access."
      case "therapist":
        return "You can create client safety plans and assign custom self-soothe skills."
      default:
        return "You'll customize how you want SKIP IT. to respond to difficult scenes."
    }
  }

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
    else onClose()
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700 p-0">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="p-8">
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4A5FBA]/10 dark:bg-[#6B9DFC]/10 mb-4">
                  <BookOpen className="w-8 h-8 text-[#4A5FBA] dark:text-[#6B9DFC]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to SKIP IT.</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  A quick setup to help you use this dashboard with confidence.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654] border border-[#4A5FBA]/20 dark:border-[#6B9DFC]/20">
                <p className="text-gray-700 dark:text-gray-300">{getRoleMessage()}</p>
              </div>
            </div>
          )}

          {/* Step 2: Dashboard Tour */}
          {step === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Tour</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-[#4A5FBA]/5 dark:bg-[#6B9DFC]/10 border-2 border-[#4A5FBA] dark:border-[#6B9DFC] relative">
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-[#4A5FBA] dark:bg-[#6B9DFC] text-white text-xs font-semibold rounded-full">
                    Highlight
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-[#4A5FBA] dark:text-[#6B9DFC] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Content Filters</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Choose which categories your users should skip or blur and set system-wide defaults.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gray-50 dark:bg-[#0D0B3B]/30 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-gray-600 dark:text-gray-400 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Profiles</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        View or organize student/child profiles and assign filters based on grade or age.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gray-50 dark:bg-[#0D0B3B]/30 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-4">
                    <TrendingUp className="w-6 h-6 text-gray-600 dark:text-gray-400 shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Usage & Impact</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        View minutes protected, scenes skipped, and category trends — all aggregated and de-identified.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Interactive Demo */}
          {step === 3 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Try the Demo</h2>
              <div className="mb-6">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-lg font-semibold mb-2">Example Moment (Demo)</p>
                      <p className="text-sm opacity-80">A scene might look like this when SKIP IT. detects difficult content.</p>
                    </div>
                  </div>
                  
                  {demoChoice && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                      <div className="text-center text-white space-y-4">
                        {demoChoice === "skip" && (
                          <>
                            <div className="text-6xl">⏭️</div>
                            <p className="text-xl font-semibold">Scene Skipped</p>
                            <p className="text-sm opacity-80">The scene was quietly skipped</p>
                          </>
                        )}
                        {demoChoice === "blur" && (
                          <>
                            <div className="text-6xl">🌫️</div>
                            <p className="text-xl font-semibold">Scene Blurred</p>
                            <p className="text-sm opacity-80">The scene is blurred for safety</p>
                          </>
                        )}
                        {demoChoice === "play" && (
                          <>
                            <div className="text-6xl">▶️</div>
                            <p className="text-xl font-semibold">Continuing</p>
                            <p className="text-sm opacity-80">The scene continues playing</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setDemoChoice("skip")}
                  className="bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] text-white"
                >
                  Skip
                </Button>
                <Button
                  onClick={() => setDemoChoice("blur")}
                  variant="outline"
                  className="border-[#4A5FBA] dark:border-[#6B9DFC] text-[#4A5FBA] dark:text-[#6B9DFC]"
                >
                  Blur
                </Button>
                <Button
                  onClick={() => setDemoChoice("play")}
                  variant="outline"
                >
                  Let It Play
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Role-Specific Preview */}
          {step === 4 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Users See This</h2>
              <div className="p-8 rounded-xl bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654] border-2 border-dashed border-[#4A5FBA]/30 dark:border-[#6B9DFC]/30">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#4A5FBA]/10 dark:bg-[#6B9DFC]/10">
                    <Users className="w-10 h-10 text-[#4A5FBA] dark:text-[#6B9DFC]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {userRole === "school-admin" || userRole === "teacher" ? "Student View" :
                     userRole === "parent" ? "Child View" :
                     userRole === "therapist" ? "Patient View" : "User View"}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                    {userRole === "school-admin" || userRole === "teacher" 
                      ? "Students see a clean, friendly interface with filters you've set. They can pause or skip anytime."
                      : userRole === "parent" 
                      ? "Your child sees a safe, age-appropriate interface with the protections you've configured."
                      : userRole === "therapist"
                      ? "Your client sees self-soothing tools and protections based on your therapeutic plan."
                      : "You'll see a personalized experience with your chosen protection level."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Completed */}
          {step === 5 && (
            <div className="p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <div className="text-4xl">✓</div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're all set.</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  You can revisit Guided Setup anytime in the sidebar.
                </p>
                <div className="p-6 rounded-xl bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654]">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Remember: SKIP IT. is here to support you and your users. Adjust settings as needed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress and Navigation */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-[#0D0B3B]/30">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Step {step} of 5</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`h-2 w-8 rounded-full transition-colors ${
                      s <= step ? "bg-[#4A5FBA] dark:bg-[#6B9DFC]" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={step === 1}
                className="disabled:opacity-50"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] text-white"
              >
                {step === 5 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
