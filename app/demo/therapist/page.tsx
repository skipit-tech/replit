"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, FileText, Send, Plus, X, Check, Eye, Copy } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { HiddenTriggersCard } from "@/components/hidden-triggers-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { TriggerKey } from "@/lib/types/settings"

const clients = [
  {
    id: "1",
    initials: "JW",
    ageRange: "10-12",
    focusTags: ["Trauma", "Anxiety"],
  },
  {
    id: "2",
    initials: "SM",
    ageRange: "13-15",
    focusTags: ["Grief", "Depression"],
  },
  {
    id: "3",
    initials: "AL",
    ageRange: "8-10",
    focusTags: ["Anxiety", "ADHD"],
  },
]

type SensitivityLevel = "high" | "medium" | "low"

type SensitizationStep = {
  id: string
  level: SensitivityLevel
  timeframe: string
  notes: string
}

type SelfSoothingSkill = {
  id: string
  text: string
  active: boolean
}

export default function TherapistControlPage() {
  const [selectedClientId, setSelectedClientId] = useState(clients[0].id)
  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0]

  const [profile, setProfile] = useState<"high" | "moderate" | "exposure">("moderate")
  const [allowMildTension, setAllowMildTension] = useState(true)
  const [preferBlur, setPreferBlur] = useState(true)
  const [showReminder, setShowReminder] = useState(true)
  const [sessionNotes, setSessionNotes] = useState("")
  
  const [hiddenTriggersEnabled, setHiddenTriggersEnabled] = useState(false)
  const [hiddenTriggers, setHiddenTriggers] = useState<TriggerKey[]>([])

  const [currentSensitivity, setCurrentSensitivity] = useState<SensitivityLevel>("medium")
  const [sensitizationSteps, setSensitizationSteps] = useState<SensitizationStep[]>([
    { id: "1", level: "high", timeframe: "Next 2 weeks", notes: "" },
    { id: "2", level: "medium", timeframe: "Weeks 3-6", notes: "" },
  ])
  const [selfSoothingSkills, setSelfSoothingSkills] = useState<SelfSoothingSkill[]>([
    { id: "1", text: "Pause and take 3 deep breaths", active: true },
    { id: "2", text: "Use a grounding exercise (5 things you can see, 4 you can touch…)", active: true },
    { id: "3", text: "Remind yourself: I can skip scenes if I feel overwhelmed", active: true },
    { id: "4", text: "Reach out to a trusted person", active: true },
    { id: "5", text: "Journal or write a quick note about how I'm feeling", active: false },
  ])

  const [clientSummary, setClientSummary] = useState<string>("")
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [isApplying, setIsApplying] = useState(false)
  const [applySuccess, setApplySuccess] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleTrigger = (trigger: TriggerKey) => {
    setHiddenTriggers((prev) =>
      prev.includes(trigger) ? prev.filter((t) => t !== trigger) : [...prev, trigger]
    )
  }

  const addSensitizationStep = () => {
    const newStep: SensitizationStep = {
      id: Date.now().toString(),
      level: "medium",
      timeframe: "",
      notes: "",
    }
    setSensitizationSteps([...sensitizationSteps, newStep])
  }

  const removeSensitizationStep = (id: string) => {
    setSensitizationSteps(sensitizationSteps.filter((step) => step.id !== id))
  }

  const updateSensitizationStep = (id: string, updates: Partial<SensitizationStep>) => {
    setSensitizationSteps(
      sensitizationSteps.map((step) => (step.id === id ? { ...step, ...updates } : step))
    )
  }

  const addCustomSkill = () => {
    const newSkill: SelfSoothingSkill = {
      id: Date.now().toString(),
      text: "",
      active: true,
    }
    setSelfSoothingSkills([...selfSoothingSkills, newSkill])
  }

  const removeSkill = (id: string) => {
    setSelfSoothingSkills(selfSoothingSkills.filter((skill) => skill.id !== id))
  }

  const updateSkill = (id: string, updates: Partial<SelfSoothingSkill>) => {
    setSelfSoothingSkills(
      selfSoothingSkills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill))
    )
  }

  const clearSensitizationPlan = () => {
    setSensitizationSteps([])
  }

  const generateSummary = () => {
    const summary = [
      "SKIP IT. will " + (profile === "high" ? "skip most intense content" : profile === "moderate" ? "skip strong content" : "support guided exposure"),
      allowMildTension ? "Allow mild tension but skip graphic scenes" : "Skip all intense moments",
      preferBlur ? "Prefer blur over hard skip when possible" : "Use hard skips for intense content",
      showReminder ? 'Show a gentle on-screen reminder: "You can pause and take a break."' : "No on-screen reminders",
    ]
    
    if (hiddenTriggersEnabled && hiddenTriggers.length > 0) {
      summary.push(`Content with these themes will be hidden: ${hiddenTriggers.join(", ").replace(/_/g, " ")}`)
    }
    
    return summary
  }

  const buildClientSummary = (bullets: string[]): string => {
    const intro = "Here's how SKIP IT. is set up for you right now:"
    const body = bullets.map(b => `• ${b}`).join("\n")
    const outro = "\n\nYou're always in control. You can pause, skip a scene, or take a break whenever you need."
    return `${intro}\n${body}${outro}`
  }

  const handleGenerateSummary = () => {
    const bullets = generateSummary()
    setClientSummary(buildClientSummary(bullets))
    setIsSummaryOpen(true)
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(clientSummary)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const applySettingsToClient = async () => {
    setIsApplying(true)
    setApplySuccess(false)
    try {
      // Demo: simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      setApplySuccess(true)
      setTimeout(() => setApplySuccess(false), 3000)
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654]">
      {/* Header */}
      <header className="bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1600px] mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                aria-label="Go back to main app"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Therapist Controls</h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 ml-8">
              Manage SKIP IT. settings for your clients
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/demo/patient"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#4A5FBA] to-[#6B9DFC] hover:brightness-95 text-white text-sm font-medium transition"
            >
              <Eye className="w-4 h-4" />
              Preview Patient View
            </Link>
            <Badge variant="secondary" className="px-3 py-1.5">
              Clinician account
            </Badge>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1654] text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4A5FBA] dark:focus:ring-[#6B9DFC]"
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  Client: {client.initials}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-8 py-10">
        <div className="grid lg:grid-cols-[480px_1fr] gap-8">
          {/* Left Column - Client Profile & Settings */}
          <div className="space-y-8">
            {/* Client Snapshot Card */}
            <Card className="p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Client Profile</h2>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#4A5FBA] dark:bg-[#6B9DFC] text-white flex items-center justify-center text-xl font-bold">
                  {selectedClient.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Age range</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">{selectedClient.ageRange}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedClient.focusTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-[#0D0B3B]/50 rounded-lg">
                For planning support, not diagnosis
              </p>
            </Card>

            {/* Therapeutic Settings */}
            <Card className="p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Protection Level</h2>

              {/* Preset Profiles */}
              <div className="space-y-3 mb-8">
                {[
                  { value: "high", label: "High", desc: "Skips most intense content" },
                  { value: "moderate", label: "Moderate", desc: "Age-appropriate filtering" },
                  {
                    value: "exposure",
                    label: "Exposure",
                    desc: "For guided exposure plans only",
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setProfile(option.value as "high" | "moderate" | "exposure")}
                    className={`w-full p-5 rounded-xl border-2 transition text-left ${
                      profile === option.value
                        ? "border-[#4A5FBA] dark:border-[#6B9DFC] bg-[#4A5FBA]/5 dark:bg-[#6B9DFC]/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    role="radio"
                    aria-checked={profile === option.value}
                  >
                    <p className="font-medium text-gray-900 dark:text-white text-base">{option.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{option.desc}</p>
                  </button>
                ))}
              </div>

              {/* Fine-tuning Options */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700 space-y-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <label htmlFor="mild-tension" className="text-sm font-medium text-gray-900 dark:text-white block mb-1">
                      Allow mild tension
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Skip only graphic scenes
                    </p>
                  </div>
                  <Switch
                    id="mild-tension"
                    checked={allowMildTension}
                    onCheckedChange={setAllowMildTension}
                    aria-describedby="mild-tension-description"
                  />
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <label htmlFor="prefer-blur" className="text-sm font-medium text-gray-900 dark:text-white block mb-1">
                      Prefer blur over skip
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Gives client more control
                    </p>
                  </div>
                  <Switch
                    id="prefer-blur"
                    checked={preferBlur}
                    onCheckedChange={setPreferBlur}
                    aria-describedby="prefer-blur-description"
                  />
                </div>

                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <label htmlFor="show-reminder" className="text-sm font-medium text-gray-900 dark:text-white block mb-1">
                      Show pause reminder
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      "You can pause and take a break"
                    </p>
                  </div>
                  <Switch
                    id="show-reminder"
                    checked={showReminder}
                    onCheckedChange={setShowReminder}
                    aria-describedby="show-reminder-description"
                  />
                </div>
              </div>
            </Card>

            {/* Hidden Triggers Card */}
            <HiddenTriggersCard
              title="Hidden Content for This Client"
              description="Hide specific themes for this client. School-wide settings still apply."
              note="Use thoughtfully as part of treatment."
              enabled={hiddenTriggersEnabled}
              onToggleEnabled={() => setHiddenTriggersEnabled(!hiddenTriggersEnabled)}
              hiddenTriggers={hiddenTriggers}
              onToggleTrigger={toggleTrigger}
              level="therapist"
            />
          </div>

          {/* Right Column - Summary & Export */}
          <div className="space-y-8">
            {/* Summary Card */}
            <Card className="p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Client Summary</h2>
              <div className="space-y-3">
                {generateSummary().map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A5FBA] dark:bg-[#6B9DFC] mt-2 shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <button
                  onClick={handleGenerateSummary}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] text-white font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5FBA] dark:focus-visible:ring-[#6B9DFC] focus-visible:ring-offset-2"
                >
                  <FileText className="w-4 h-4" />
                  Generate Summary
                </button>
                <button
                  onClick={applySettingsToClient}
                  disabled={isApplying}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border-2 border-[#4A5FBA] dark:border-[#6B9DFC] text-[#4A5FBA] dark:text-[#6B9DFC] hover:bg-[#4A5FBA]/5 dark:hover:bg-[#6B9DFC]/10 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5FBA] dark:focus-visible:ring-[#6B9DFC]"
                >
                  {isApplying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#4A5FBA] dark:border-[#6B9DFC] border-t-transparent rounded-full animate-spin" />
                      Applying...
                    </>
                  ) : applySuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Applied Successfully
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Apply to Account
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mt-5">
                Supports therapy, doesn't replace clinical judgment
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#1a1654] dark:to-[#2d1f5e] border-[#4A5FBA]/20 dark:border-[#6B9DFC]/20">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Tips</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                <li>Adjust settings as treatment progresses</li>
                <li>Discuss media choices in sessions</li>
                <li>Encourage client autonomy</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Privacy</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                No scene details are shared. Settings are secure and private.
              </p>
            </Card>

            <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                SKIP IT. is a support tool, not a replacement for therapy or crisis services.
              </p>
            </Card>

            {/* Self-Soothing Plan */}
            <Card className="p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Self-Soothing Skills
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Show before and after sensitive content
              </p>

              <div className="space-y-3">
                {selfSoothingSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-[#0D0B3B]/30 border border-gray-200 dark:border-gray-700"
                  >
                    <Switch
                      checked={skill.active}
                      onCheckedChange={(checked) => updateSkill(skill.id, { active: checked })}
                      className="mt-1"
                      aria-label={`${skill.active ? "Disable" : "Enable"} this skill`}
                    />
                    <Input
                      value={skill.text}
                      onChange={(e) => updateSkill(skill.id, { text: e.target.value })}
                      className="flex-1 text-sm"
                      placeholder="Enter skill"
                    />
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition mt-2"
                      aria-label="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addCustomSkill}
                className="w-full mt-5 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#4A5FBA] dark:hover:border-[#6B9DFC] hover:text-[#4A5FBA] dark:hover:text-[#6B9DFC] transition"
              >
                <Plus className="w-4 h-4" />
                Add Skill
              </button>
            </Card>

            {/* Sensitization Mode */}
            <Card className="p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sensitization Plan</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                Gradually adjust settings over time
              </p>

              {/* Current Sensitivity Level */}
              <div className="mb-8">
                <label className="text-sm font-medium text-gray-900 dark:text-white block mb-4">
                  Current Level
                </label>
                <div className="flex gap-3">
                  {[
                    { value: "high", label: "High" },
                    { value: "medium", label: "Medium" },
                    { value: "low", label: "Low" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setCurrentSensitivity(option.value as SensitivityLevel)}
                      className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition ${
                        currentSensitivity === option.value
                          ? "bg-[#4A5FBA] dark:bg-[#6B9DFC] text-white"
                          : "bg-gray-100 dark:bg-[#0D0B3B]/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#0D0B3B]"
                      }`}
                      aria-pressed={currentSensitivity === option.value}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plan Over Time */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-5">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">Future Steps</label>
                  <div className="flex gap-2">
                    <button
                      onClick={addSensitizationStep}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4A5FBA] dark:bg-[#6B9DFC] text-white text-sm font-medium hover:brightness-95 transition"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                    {sensitizationSteps.length > 0 && (
                      <button
                        onClick={clearSensitizationPlan}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-[#0D0B3B]/50 transition"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {sensitizationSteps.length === 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-8">
                    No steps yet. Click "Add" to start.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {sensitizationSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className="p-5 rounded-xl bg-gray-50 dark:bg-[#0D0B3B]/30 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            Step {index + 1}
                          </span>
                          <button
                            onClick={() => removeSensitizationStep(step.id)}
                            className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition"
                            aria-label="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-xs text-gray-600 dark:text-gray-400 block mb-2">
                              Level
                            </label>
                            <select
                              value={step.level}
                              onChange={(e) =>
                                updateSensitizationStep(step.id, { level: e.target.value as SensitivityLevel })
                              }
                              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1654] text-gray-900 dark:text-white text-sm"
                            >
                              <option value="high">High (most hidden)</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low (more visible)</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-xs text-gray-600 dark:text-gray-400 block mb-2">
                              Timeframe
                            </label>
                            <Input
                              value={step.timeframe}
                              onChange={(e) => updateSensitizationStep(step.id, { timeframe: e.target.value })}
                              placeholder="e.g., Next 2 weeks"
                              className="text-sm"
                            />
                          </div>

                          <div>
                            <label className="text-xs text-gray-600 dark:text-gray-400 block mb-2">
                              Notes
                            </label>
                            <Textarea
                              value={step.notes}
                              onChange={(e) => updateSensitizationStep(step.id, { notes: e.target.value })}
                              placeholder="Optional details"
                              className="min-h-[60px] text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card className="p-8 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
            <label htmlFor="session-notes" className="text-sm font-semibold text-gray-900 dark:text-white block mb-2">
              Clinical Notes (optional)
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">Private. Not shown to client.</p>
            <Textarea
              id="session-notes"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Add notes about these settings..."
              className="min-h-[100px] text-sm"
              aria-describedby="session-notes-description"
            />
          </Card>
        </div>
      </main>

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="max-w-lg bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Client-friendly summary</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              You can edit this before sharing it with your client.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            value={clientSummary}
            onChange={(e) => setClientSummary(e.target.value)}
            className="mt-3 h-48 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0D0B3B]/50 p-3 text-sm text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5FBA] dark:focus-visible:ring-[#6B9DFC]"
          />

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopyToClipboard}
              className="flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-[#0D0B3B]/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5FBA] dark:focus-visible:ring-[#6B9DFC]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy to clipboard
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsSummaryOpen(false)}
              className="rounded-xl bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] px-4 py-2 text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5FBA] dark:focus-visible:ring-[#6B9DFC]"
            >
              Done
            </button>
          </div>

          <p className="mt-3 text-[11px] text-gray-600 dark:text-gray-400">
            This summary supports your work together. It doesn't replace therapy, crisis services, or medical care.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
