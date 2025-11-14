"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { ChevronRight, ChevronLeft, Check, Play, X, Eye, EyeOff } from 'lucide-react'
import type { UserRole, TriggerKey } from "@/lib/types/settings"

export default function GuidedSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userRole, setUserRole] = useState<UserRole>("general")
  const [demoAction, setDemoAction] = useState<"skip" | "blur" | null>(null)
  const [selectedTriggers, setSelectedTriggers] = useState<TriggerKey[]>([])
  const [sensitivity, setSensitivity] = useState<"extra_gentle" | "standard" | "custom">("standard")
  const [showCustomFilters, setShowCustomFilters] = useState(false)
  const [selfSootheEnabled, setSelfSootheEnabled] = useState(false)

  const totalSteps = 7

  const getRoleBasedText = (role: UserRole): string => {
    const texts: Record<UserRole, string> = {
      therapist: "You'll set safety settings and self-soothe tools for your clients.",
      parent: "You'll set content controls and visibility for your child's profile.",
      teacher: "You'll manage graded profiles and classroom safety preferences.",
      admin: "You'll manage graded profiles and classroom safety preferences.",
      organization_admin: "You'll manage network-wide content safety for your organization.",
      general: "Customize what you want to skip or blur to make streaming feel safer.",
      child: "We'll help you set up SKIP IT. to watch shows safely.",
      teen: "We'll help you choose what feels right for you.",
      patient: "Your therapist will help set up tools to support your well-being.",
      creator: "Customize how SKIP IT. works for your creative workflow.",
    }
    return texts[role]
  }

  const getNavigationText = (role: UserRole): string => {
    const texts: Record<UserRole, string> = {
      therapist: "You can customize these controls for each patient.",
      parent: "You can create and manage profiles for each child.",
      teacher: "You can organize students by grade and set class-wide filters.",
      admin: "You can organize students by grade and set class-wide filters.",
      organization_admin: "You can manage settings across your entire organization network.",
      general: "You stay fully in control of your safety settings.",
      child: "Your parent or teacher is here to help keep you safe.",
      teen: "Your trusted adult can help if you need it.",
      patient: "Your therapist helps set these up to support you.",
      creator: "You control exactly how content filtering works for your needs.",
    }
    return texts[role]
  }

  const hasRestrictedPermissions = (role: UserRole): boolean => {
    return ["child", "teen", "patient"].includes(role)
  }

  const canEditSettings = (role: UserRole): boolean => {
    return !["child", "teen", "patient"].includes(role)
  }

  const triggers: { key: TriggerKey; label: string; description: string }[] = [
    {
      key: "gun_violence",
      label: "Violence or fighting",
      description: "Scenes depicting physical conflict or weapons",
    },
    {
      key: "sexual_content",
      label: "Sexual themes",
      description: "Content with sexual situations or themes",
    },
    {
      key: "self_harm",
      label: "Self-harm or loss",
      description: "Depictions of self-injury or grief",
    },
    {
      key: "animal_harm",
      label: "Animal distress",
      description: "Scenes showing animals in danger or pain",
    },
    {
      key: "emotional_distress",
      label: "Emotional intensity",
      description: "Highly emotional or overwhelming scenes",
    },
    {
      key: "substance_use",
      label: "Substance use",
      description: "Depictions of drugs or alcohol use",
    },
  ]

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      router.push("/settings")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    router.push("/settings")
  }

  const toggleTrigger = (key: TriggerKey) => {
    if (!canEditSettings(userRole)) return

    setSelectedTriggers((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {["child", "teen"].includes(userRole) ? `Step ${step} of ${totalSteps}` : `Step ${step} of ${totalSteps}`}
            </span>
            <button
              onClick={handleSkip}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition"
            >
              Skip Setup
            </button>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  {["child", "teen"].includes(userRole) ? "Welcome! 👋" : "Welcome to SKIP IT."}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                  {["child", "teen"].includes(userRole)
                    ? "Let's set up SKIP IT. together. It only takes a minute!"
                    : "A quick setup will help tailor your experience."}
                </p>
                <p className="text-slate-600 dark:text-slate-400">{getRoleBasedText(userRole)}</p>
              </div>

              {/* Role Selector (for demo purposes) */}
              <div className="bg-blue-50 dark:bg-slate-700 rounded-2xl p-6">
                <label htmlFor="role-select" className="block text-sm font-semibold mb-3 text-slate-900 dark:text-white">
                  I am a... (Demo: Select your role)
                </label>
                <select
                  id="role-select"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as UserRole)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-600 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="general">General User</option>
                  <option value="parent">Parent/Guardian</option>
                  <option value="child">Child</option>
                  <option value="teen">Teen</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">School Admin</option>
                  <option value="therapist">Therapist</option>
                  <option value="patient">Patient/Client</option>
                  <option value="organization_admin">Organization Admin</option>
                  <option value="creator">Creator</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Get Started
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: How to Navigate */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {["child", "teen"].includes(userRole) ? "How It Helps You" : "How SKIP IT. Works"}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-slate-700 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {["child", "teen"].includes(userRole) ? "We watch with you" : "We analyze scenes in real time"}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {["child", "teen"].includes(userRole)
                        ? "SKIP IT. looks for parts that might be scary or upsetting."
                        : "SKIP IT. monitors content as you watch for potential difficult moments."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-slate-700 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {["child", "teen"].includes(userRole) ? "We help you skip hard parts" : "You choose what to skip or blur"}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {["child", "teen"].includes(userRole)
                        ? "If something feels too much, we can skip it or make it blurry."
                        : "Select which types of scenes you'd prefer to avoid or soften."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-pink-50 dark:bg-slate-700 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {["child", "teen"].includes(userRole) ? "You're always safe" : "Update settings anytime"}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {["child", "teen"].includes(userRole)
                        ? "You can change these anytime with a trusted adult."
                        : "Your preferences can be adjusted whenever you need."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                <p className="text-sm text-slate-700 dark:text-slate-300">{getNavigationText(userRole)}</p>
              </div>
            </div>
          )}

          {/* Step 3: Interactive Demo */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {["child", "teen"].includes(userRole) ? "Let's Try It! 🎬" : "Try It Out"}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {["child", "teen"].includes(userRole)
                    ? "Click the buttons to see what happens"
                    : "See how filters work with a safe demo scene"}
                </p>
              </div>

              {/* Demo Video Area */}
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
                {!demoAction && (
                  <div className="text-center p-8">
                    <Play className="w-16 h-16 text-white mb-4 mx-auto opacity-50" />
                    <p className="text-white text-sm">
                      {["child", "teen"].includes(userRole) ? "Your show plays here" : "Demo scene plays here"}
                    </p>
                  </div>
                )}

                {demoAction === "skip" && (
                  <div className="text-center p-8">
                    <div className="text-white text-6xl mb-4">⏭️</div>
                    <p className="text-white font-semibold">
                      {["child", "teen"].includes(userRole) ? "Skipped!" : "Scene Skipped"}
                    </p>
                    <p className="text-white/70 text-sm mt-2">
                      {["child", "teen"].includes(userRole)
                        ? "The show jumped to a better part"
                        : "Content jumped ahead smoothly"}
                    </p>
                  </div>
                )}

                {demoAction === "blur" && (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 backdrop-blur-3xl bg-slate-900/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <EyeOff className="w-16 h-16 text-white mb-4 mx-auto" />
                        <p className="text-white font-semibold">
                          {["child", "teen"].includes(userRole) ? "Blurred!" : "Scene Blurred"}
                        </p>
                        <p className="text-white/70 text-sm mt-2">
                          {["child", "teen"].includes(userRole)
                            ? "You can still hear, but you don't have to see"
                            : "Content softened but audio continues"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Warning Banner */}
                <div className="absolute top-4 left-4 right-4 bg-yellow-500/90 backdrop-blur rounded-xl p-3 shadow-lg">
                  <p className="text-sm font-semibold text-slate-900">
                    {["child", "teen"].includes(userRole)
                      ? "⚠️ Heads up: Something might feel too much"
                      : "⚠️ Possible Difficult Moment Ahead"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setDemoAction("skip")}
                  className={`p-4 rounded-xl border-2 transition ${
                    demoAction === "skip"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
                      : "border-slate-300 dark:border-slate-600 hover:border-blue-400"
                  }`}
                >
                  <div className="text-2xl mb-2">⏭️</div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">
                    {["child", "teen"].includes(userRole) ? "Skip It" : "Skip Scene"}
                  </p>
                </button>

                <button
                  onClick={() => setDemoAction("blur")}
                  className={`p-4 rounded-xl border-2 transition ${
                    demoAction === "blur"
                      ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30"
                      : "border-slate-300 dark:border-slate-600 hover:border-purple-400"
                  }`}
                >
                  <div className="text-2xl mb-2">🌫️</div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">
                    {["child", "teen"].includes(userRole) ? "Make Blurry" : "Blur Scene"}
                  </p>
                </button>

                <button
                  onClick={() => setDemoAction(null)}
                  className={`p-4 rounded-xl border-2 transition ${
                    demoAction === null
                      ? "border-green-600 bg-green-50 dark:bg-green-900/30"
                      : "border-slate-300 dark:border-slate-600 hover:border-green-400"
                  }`}
                >
                  <div className="text-2xl mb-2">▶️</div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">
                    {["child", "teen"].includes(userRole) ? "Keep Playing" : "Continue"}
                  </p>
                </button>
              </div>

              {hasRestrictedPermissions(userRole) && (
                <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {userRole === "child"
                      ? "Your parent or teacher helps choose these settings."
                      : "Some settings may be managed by your adult/teacher/therapist."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Safety Settings */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {["child", "teen"].includes(userRole) ? "What Do You Want to Skip?" : "Choose Your Safety Settings"}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {canEditSettings(userRole)
                    ? ["child", "teen"].includes(userRole)
                      ? "Pick the kinds of things that feel too hard"
                      : "Select which types of content you'd like to filter"
                    : ["child", "teen"].includes(userRole)
                    ? "Your trusted adult picked these to help you"
                    : "These settings are managed to support your well-being"}
                </p>
              </div>

              {/* Content Comfort Level */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {["child", "teen"].includes(userRole) ? "How Much Help?" : "Content Comfort Level"}
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      value: "extra_gentle",
                      label: ["child", "teen"].includes(userRole) ? "Extra help" : "Extra gentle",
                      desc: ["child", "teen"].includes(userRole) ? "Only calm, happy shows" : "Mostly calm, light stories",
                    },
                    {
                      value: "standard",
                      label: ["child", "teen"].includes(userRole) ? "Some help" : "Standard",
                      desc: ["child", "teen"].includes(userRole)
                        ? "Skip the really hard parts"
                        : "Age-appropriate with mild intensity",
                    },
                    {
                      value: "custom",
                      label: ["child", "teen"].includes(userRole) ? "I'll choose" : "Custom",
                      desc: ["child", "teen"].includes(userRole) ? "Pick what to skip yourself" : "Choose specific categories",
                    },
                  ].map(({ value, label, desc }) => (
                    <label
                      key={value}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                        sensitivity === value
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30"
                          : "border-slate-300 dark:border-slate-600 hover:border-blue-400"
                      } ${!canEditSettings(userRole) ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      <input
                        type="radio"
                        name="sensitivity"
                        value={value}
                        checked={sensitivity === value}
                        onChange={(e) => {
                          if (canEditSettings(userRole)) {
                            setSensitivity(e.target.value as typeof sensitivity)
                            setShowCustomFilters(e.target.value === "custom")
                          }
                        }}
                        disabled={!canEditSettings(userRole)}
                        className="mt-1 w-5 h-5 accent-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 dark:text-white">{label}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Filters */}
              {showCustomFilters && (
                <div className="space-y-4 mt-6 p-6 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                    {["child", "teen"].includes(userRole) ? "What Should We Skip?" : "Select Categories to Filter"}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {triggers.map(({ key, label, description }) => (
                      <label
                        key={key}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition ${
                          selectedTriggers.includes(key)
                            ? "border-blue-600 bg-white dark:bg-slate-600"
                            : "border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-600 hover:border-blue-400"
                        } ${!canEditSettings(userRole) ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTriggers.includes(key)}
                          onChange={() => toggleTrigger(key)}
                          disabled={!canEditSettings(userRole)}
                          className="mt-1 w-4 h-4 rounded accent-blue-600"
                          aria-describedby={`desc-${key}`}
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-slate-900 dark:text-white">{label}</div>
                          <div id={`desc-${key}`} className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {!canEditSettings(userRole) && (
                <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Your safety settings are managed to support your well-being.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Self-Soothe Tools */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {["child", "teen"].includes(userRole) ? "Calming Tools 🧘" : "Self-Soothe Tools"}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {userRole === "therapist" && "Add grounding skills to help your clients during difficult moments"}
                  {userRole === "parent" && "Enable supportive tools for your child when they feel overwhelmed"}
                  {["child", "teen"].includes(userRole) &&
                    "If something feels too much, these can help you feel better"}
                  {!["therapist", "parent", "child", "teen", "patient"].includes(userRole) &&
                    "Access supportive techniques during intense scenes"}
                </p>
              </div>

              <div className="space-y-4">
                {userRole === "therapist" && (
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Play className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">Build Your Client's Toolkit</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Add custom grounding techniques and coping skills
                        </p>
                      </div>
                    </div>
                    <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg">
                      Add Self-Soothe Skills
                    </button>
                  </div>
                )}

                {userRole === "parent" && (
                  <div className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border-2 border-pink-200 dark:border-pink-800">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">Enable Self-Soothe Section</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          Show calming tools to your child during intense moments
                        </p>
                      </div>
                      <button
                        onClick={() => setSelfSootheEnabled(!selfSootheEnabled)}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          selfSootheEnabled
                            ? "bg-blue-600"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                        aria-label="Toggle self-soothe tools"
                        aria-pressed={selfSootheEnabled}
                      >
                        <span
                          className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all shadow-md ${
                            selfSootheEnabled ? "left-[calc(100%-1.625rem)]" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                    {selfSootheEnabled && (
                      <div className="mt-4 pt-4 border-t border-pink-200 dark:border-pink-700">
                        <p className="text-sm text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Self-soothe tools will be shown to your child
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {["child", "teen"].includes(userRole) && (
                  <div className="space-y-3">
                    {[
                      { icon: "🫁", title: "Take Deep Breaths", desc: "Breathe in slowly, breathe out slowly" },
                      { icon: "🤲", title: "Look Around", desc: "Name 5 things you can see right now" },
                      { icon: "💭", title: "Remember", desc: "You are safe. You are okay." },
                    ].map((skill, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 rounded-xl"
                      >
                        <div className="text-3xl">{skill.icon}</div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{skill.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{skill.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!["therapist", "parent", "child", "teen", "patient"].includes(userRole) && (
                  <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border-2 border-green-200 dark:border-green-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
                      SKIP IT. Self-Soothe Library
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                      Pre-built grounding techniques available during intense moments
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1.5 bg-white dark:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300">
                        Deep Breathing
                      </span>
                      <span className="px-3 py-1.5 bg-white dark:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300">
                        5-4-3-2-1 Grounding
                      </span>
                      <span className="px-3 py-1.5 bg-white dark:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300">
                        Progressive Relaxation
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Privacy & Safety */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {["child", "teen"].includes(userRole) ? "You're Safe Here 🔒" : "Privacy & Safety"}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {["child", "teen"].includes(userRole)
                    ? "Here's how SKIP IT. keeps you safe"
                    : "Understanding how SKIP IT. protects you"}
                </p>
              </div>

              <div className="space-y-4">
                {["child", "teen"].includes(userRole) && (
                  <>
                    <div className="p-6 bg-blue-50 dark:bg-slate-700 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">👍</div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">You're In Control</h3>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            You can turn SKIP IT. on or off anytime. You can always ask a trusted adult for help.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-purple-50 dark:bg-slate-700 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">🤐</div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Your Privacy</h3>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            We don't tell anyone what shows you watch. That's just for you.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-green-50 dark:bg-slate-700 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">🆘</div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Need Help?</h3>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            If something really upsets you, talk to a parent, teacher, or trusted adult right away.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!["child", "teen"].includes(userRole) && (
                  <>
                    <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">⚠️</div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Important Notice</h3>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            <strong>SKIP IT. does not replace therapy or crisis support.</strong> If you're experiencing
                            distress or need help, please contact a qualified professional or crisis hotline.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-blue-50 dark:bg-slate-700 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">🔒</div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Your Control</h3>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            You control what feels safe for you. Settings can be adjusted anytime to match your comfort
                            level.
                          </p>
                        </div>
                      </div>
                    </div>

                    {["parent", "teacher", "admin", "organization_admin"].includes(userRole) && (
                      <div className="p-6 bg-purple-50 dark:bg-slate-700 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="text-2xl">👁️</div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Privacy Protection</h3>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              You will not see your {userRole === "parent" ? "child's" : "student's"} personal data, only
                              safety settings and usage metrics.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {userRole === "therapist" && (
                      <div className="p-6 bg-green-50 dark:bg-slate-700 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="text-2xl">🩺</div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Clinical Use</h3>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              SKIP IT. is not a clinical tool and does not collect Protected Health Information (PHI).
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {!["parent", "teacher", "admin", "therapist", "organization_admin"].includes(userRole) && (
                      <div className="p-6 bg-green-50 dark:bg-slate-700 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="text-2xl">🔐</div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Your Data</h3>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              We do not collect identifying personal data about what you watch.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 7: Finish */}
          {step === 7 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-white" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  {["child", "teen"].includes(userRole) ? "All Done! 🎉" : "You're All Set!"}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                  {["child", "teen"].includes(userRole)
                    ? "SKIP IT. is ready to help you watch safely!"
                    : "You're ready to start using SKIP IT."}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {["child", "teen"].includes(userRole)
                    ? "You can change these anytime with a trusted adult."
                    : "You can revisit the guided setup anytime in Settings."}
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/settings"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition shadow-lg hover:shadow-xl"
                >
                  Go to Settings
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step !== 7 && (
            <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-700">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                  step === 1
                    ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg"
              >
                {step === 6 ? "Finish" : "Next"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
