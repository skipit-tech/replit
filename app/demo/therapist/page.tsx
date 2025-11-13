"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, FileText, Send } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

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

export default function TherapistControlPage() {
  const [selectedClientId, setSelectedClientId] = useState(clients[0].id)
  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0]

  const [profile, setProfile] = useState<"high" | "moderate" | "exposure">("moderate")
  const [allowMildTension, setAllowMildTension] = useState(true)
  const [preferBlur, setPreferBlur] = useState(true)
  const [showReminder, setShowReminder] = useState(true)
  const [sessionNotes, setSessionNotes] = useState("")

  const generateSummary = () => {
    const summary = [
      "SKIP IT. will " + (profile === "high" ? "skip most intense content" : profile === "moderate" ? "skip strong content" : "support guided exposure"),
      allowMildTension ? "Allow mild tension but skip graphic scenes" : "Skip all intense moments",
      preferBlur ? "Prefer blur over hard skip when possible" : "Use hard skips for intense content",
      showReminder ? 'Show a gentle on-screen reminder: "You can pause and take a break."' : "No on-screen reminders",
    ]
    return summary
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654]">
      {/* Header */}
      <header className="bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
              Set SKIP IT. preferences to match your client's treatment plan.
            </p>
          </div>
          <div className="flex items-center gap-3">
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Left Column - Client Profile & Plan */}
          <div className="space-y-6">
            {/* Client Snapshot Card */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Client Profile</h2>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#4A5FBA] dark:bg-[#6B9DFC] text-white flex items-center justify-center text-xl font-bold">
                  {selectedClient.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Age range</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{selectedClient.ageRange}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedClient.focusTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 italic p-3 bg-gray-50 dark:bg-[#0D0B3B]/50 rounded-lg">
                This information is for planning viewing support, not a diagnosis.
              </p>
            </Card>

            {/* Therapeutic Settings */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Session-Aligned Settings</h2>

              {/* Preset Profiles */}
              <div className="space-y-2 mb-6">
                {[
                  { value: "high", label: "High protection", desc: "Skips most intense content" },
                  { value: "moderate", label: "Moderate protection", desc: "Age-appropriate filtering" },
                  {
                    value: "exposure",
                    label: "Exposure-supported",
                    desc: "Use only as part of a guided exposure plan",
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setProfile(option.value as "high" | "moderate" | "exposure")}
                    className={`w-full p-4 rounded-xl border-2 transition text-left ${
                      profile === option.value
                        ? "border-[#4A5FBA] dark:border-[#6B9DFC] bg-[#4A5FBA]/5 dark:bg-[#6B9DFC]/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    role="radio"
                    aria-checked={profile === option.value}
                  >
                    <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{option.desc}</p>
                  </button>
                ))}
              </div>

              {/* Fine-tuning Options */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label htmlFor="mild-tension" className="text-sm font-medium text-gray-900 dark:text-white block">
                      Allow mild tension but skip graphic scenes
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Permits age-appropriate suspense while filtering intense moments.
                    </p>
                  </div>
                  <Switch
                    id="mild-tension"
                    checked={allowMildTension}
                    onCheckedChange={setAllowMildTension}
                    aria-describedby="mild-tension-description"
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label htmlFor="prefer-blur" className="text-sm font-medium text-gray-900 dark:text-white block">
                      Prefer blur over hard skip when possible
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Gives client more control over their viewing experience.
                    </p>
                  </div>
                  <Switch
                    id="prefer-blur"
                    checked={preferBlur}
                    onCheckedChange={setPreferBlur}
                    aria-describedby="prefer-blur-description"
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label htmlFor="show-reminder" className="text-sm font-medium text-gray-900 dark:text-white block">
                      Show a gentle on-screen reminder
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      "You can pause and take a break."
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

            {/* Session Notes Link */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <label htmlFor="session-notes" className="text-sm font-semibold text-gray-900 dark:text-white block mb-2">
                Notes for this client's SKIP IT. settings (optional)
              </label>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Visible only to you. Not shown in the app.</p>
              <Textarea
                id="session-notes"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder="Add any clinical notes about these settings..."
                className="min-h-[100px] text-sm"
                aria-describedby="session-notes-description"
              />
            </Card>
          </div>

          {/* Right Column - Shared Plan & Export */}
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What your client will see</h2>
              <div className="space-y-3">
                {generateSummary().map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4A5FBA] dark:bg-[#6B9DFC] mt-2 shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] text-white font-medium transition">
                  <FileText className="w-4 h-4" />
                  Generate client-friendly summary
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[#4A5FBA] dark:border-[#6B9DFC] text-[#4A5FBA] dark:text-[#6B9DFC] hover:bg-[#4A5FBA]/5 dark:hover:bg-[#6B9DFC]/10 font-medium transition">
                  <Send className="w-4 h-4" />
                  Apply to client's SKIP IT. account
                </button>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mt-4 italic">
                This tool supports therapy; it does not replace clinical judgment.
              </p>
            </Card>

            {/* Enhanced Info Cards */}
            <Card className="p-6 bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#1a1654] dark:to-[#2d1f5e] border-[#4A5FBA]/20 dark:border-[#6B9DFC]/20">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Using SKIP IT. in Treatment</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                <li>Settings can be adjusted as treatment progresses.</li>
                <li>Discuss media choices as part of coping skill development.</li>
                <li>Use viewing patterns as conversation starters in sessions.</li>
                <li>Encourage client autonomy in their viewing choices.</li>
              </ul>
            </Card>

            {/* Data & Privacy Notice */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Data & Privacy</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                By default, no scene-level details are shared back with the therapist in this concept. SKIP IT. is
                designed to respect privacy and autonomy while supporting emotional safety.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                Settings and preferences are stored securely and can only be accessed by authorized clinicians.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
