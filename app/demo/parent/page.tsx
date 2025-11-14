"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus, Info } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { HiddenTriggersCard } from "@/components/hidden-triggers-card"
import type { TriggerKey } from "@/lib/types/settings"

const kids = [
  {
    id: "1",
    name: "Emma",
    age: 8,
    grade: "3rd Grade",
    avatar: "🐰",
    status: "Protected" as const,
    device: "iPad",
    skipEnabled: true,
    allowBlur: true,
    showWarnings: true,
    comfortLevel: "extra-gentle" as const,
    customFilters: {
      violence: false,
      scary: false,
      bullying: false,
      grief: false,
    },
    minutesSkipped: 127,
    scenesAdjusted: 34,
    mostWatchedTime: "After school (3-5pm)",
    favoriteGenre: "Feel-good stories",
  },
  {
    id: "2",
    name: "Lucas",
    age: 11,
    grade: "6th Grade",
    avatar: "🐻",
    status: "Protected" as const,
    device: "iPhone",
    skipEnabled: true,
    allowBlur: false,
    showWarnings: true,
    comfortLevel: "standard" as const,
    customFilters: {
      violence: false,
      scary: false,
      bullying: true,
      grief: false,
    },
    minutesSkipped: 89,
    scenesAdjusted: 21,
    mostWatchedTime: "Evening (7-9pm)",
    favoriteGenre: "Adventure",
  },
]

export default function ParentControlPage() {
  const [selectedKidId, setSelectedKidId] = useState(kids[0].id)
  const selectedKid = kids.find((k) => k.id === selectedKidId) || kids[0]

  const [kidSettings, setKidSettings] = useState(
    kids.reduce(
      (acc, kid) => ({
        ...acc,
        [kid.id]: {
          skipEnabled: kid.skipEnabled,
          allowBlur: kid.allowBlur,
          showWarnings: kid.showWarnings,
          comfortLevel: kid.comfortLevel,
          customFilters: kid.customFilters,
        },
      }),
      {} as Record<
        string,
        {
          skipEnabled: boolean
          allowBlur: boolean
          showWarnings: boolean
          comfortLevel: "extra-gentle" | "standard" | "custom"
          customFilters: Record<string, boolean>
        }
      >,
    ),
  )
  
  const [kidHiddenTriggersEnabled, setKidHiddenTriggersEnabled] = useState<Record<string, boolean>>(
    kids.reduce((acc, kid) => ({ ...acc, [kid.id]: false }), {})
  )
  const [kidHiddenTriggers, setKidHiddenTriggers] = useState<Record<string, TriggerKey[]>>(
    kids.reduce((acc, kid) => ({ ...acc, [kid.id]: [] }), {})
  )

  const updateKidSetting = <K extends keyof typeof kidSettings[string]>(key: K, value: typeof kidSettings[string][K]) => {
    setKidSettings({
      ...kidSettings,
      [selectedKidId]: {
        ...kidSettings[selectedKidId],
        [key]: value,
      },
    })
  }

  const updateCustomFilter = (filter: string, value: boolean) => {
    setKidSettings({
      ...kidSettings,
      [selectedKidId]: {
        ...kidSettings[selectedKidId],
        customFilters: {
          ...kidSettings[selectedKidId].customFilters,
          [filter]: value,
        },
      },
    })
  }

  const toggleTriggerForKid = (trigger: TriggerKey) => {
    setKidHiddenTriggers((prev) => {
      const currentTriggers = prev[selectedKidId] || []
      const newTriggers = currentTriggers.includes(trigger)
        ? currentTriggers.filter((t) => t !== trigger)
        : [...currentTriggers, trigger]
      return { ...prev, [selectedKidId]: newTriggers }
    })
  }

  const currentSettings = kidSettings[selectedKidId]
  const currentHiddenTriggersEnabled = kidHiddenTriggersEnabled[selectedKidId] || false
  const currentHiddenTriggers = kidHiddenTriggers[selectedKidId] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] to-[#F0E8FF] dark:from-[#0D0B3B] dark:to-[#1A1654]">
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Parent Controls</h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 ml-8">
              Manage how SKIP IT. protects your family while you watch.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1.5">
              Parent account
            </Badge>
            <Link
              href="/"
              className="text-sm font-medium text-[#4A5FBA] hover:text-[#3d4e9d] dark:text-[#6B9DFC] dark:hover:text-[#8fb3fc] transition"
            >
              Switch to viewer mode
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Left Column - Kids & Filters */}
          <div className="space-y-6">
            {/* Kids Overview Card */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Kids</h2>
              <div className="space-y-3 mb-4">
                {kids.map((kid) => (
                  <button
                    key={kid.id}
                    onClick={() => setSelectedKidId(kid.id)}
                    className={`w-full p-4 rounded-xl border-2 transition text-left ${
                      selectedKidId === kid.id
                        ? "border-[#4A5FBA] dark:border-[#6B9DFC] bg-[#4A5FBA]/5 dark:bg-[#6B9DFC]/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl" role="img" aria-label={`${kid.name}'s avatar`}>
                        {kid.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white">{kid.name}</p>
                          <Badge
                            variant={kid.status === "Protected" ? "default" : "secondary"}
                            className="shrink-0 text-xs"
                          >
                            {kid.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                          {kid.age} years • {kid.grade}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] text-white font-medium transition">
                <Plus className="w-4 h-4" />
                Add Child Profile
              </button>
            </Card>

            {/* Selected Kid Detail */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Settings for {selectedKid.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                {selectedKid.age} years • {selectedKid.grade}
                {selectedKid.device && ` • ${selectedKid.device}`}
              </p>

              {/* Toggle Group */}
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label htmlFor="skip-enabled" className="font-medium text-gray-900 dark:text-white block">
                      Skip upsetting scenes
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      SKIP IT. will quietly skip or blur scenes that may feel overwhelming.
                    </p>
                  </div>
                  <Switch
                    id="skip-enabled"
                    checked={currentSettings.skipEnabled}
                    onCheckedChange={(checked) => updateKidSetting("skipEnabled", checked)}
                    aria-describedby="skip-enabled-description"
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label htmlFor="allow-blur" className="font-medium text-gray-900 dark:text-white block">
                      Allow blur instead of skip when possible
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Show blurred scenes so they can choose to look away or continue watching.
                    </p>
                  </div>
                  <Switch
                    id="allow-blur"
                    checked={currentSettings.allowBlur}
                    onCheckedChange={(checked) => updateKidSetting("allowBlur", checked)}
                    aria-describedby="allow-blur-description"
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <label htmlFor="show-warnings" className="font-medium text-gray-900 dark:text-white block">
                      Show gentle content warnings before intense scenes
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      A brief, calm message appears before potentially intense moments.
                    </p>
                  </div>
                  <Switch
                    id="show-warnings"
                    checked={currentSettings.showWarnings}
                    onCheckedChange={(checked) => updateKidSetting("showWarnings", checked)}
                    aria-describedby="show-warnings-description"
                  />
                </div>
              </div>

              {/* Content Comfort Level */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Content Comfort Level</h3>
                <div className="space-y-2">
                  {[
                    { value: "extra-gentle", label: "Extra gentle", desc: "Mostly calm, light stories" },
                    { value: "standard", label: "Standard", desc: "Age-appropriate with mild intensity" },
                    { value: "custom", label: "Custom", desc: "Choose specific content types to filter" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() =>
                        updateKidSetting("comfortLevel", option.value as "extra-gentle" | "standard" | "custom")
                      }
                      className={`w-full p-4 rounded-xl border-2 transition text-left ${
                        currentSettings.comfortLevel === option.value
                          ? "border-[#4A5FBA] dark:border-[#6B9DFC] bg-[#4A5FBA]/5 dark:bg-[#6B9DFC]/10"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                      role="radio"
                      aria-checked={currentSettings.comfortLevel === option.value}
                    >
                      <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{option.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Custom Filters */}
                {currentSettings.comfortLevel === "custom" && (
                  <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-[#0D0B3B]/50 space-y-3">
                    {[
                      { key: "violence", label: "Violence or fighting", desc: "Physical conflicts and combat scenes" },
                      { key: "scary", label: "Scary or intense scenes", desc: "Suspenseful or frightening moments" },
                      { key: "bullying", label: "Bullying or meanness", desc: "Unkind behavior between characters" },
                      { key: "grief", label: "Loss or grief", desc: "Scenes dealing with loss or sadness" },
                    ].map((filter) => (
                      <div key={filter.key} className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <label
                            htmlFor={`filter-${filter.key}`}
                            className="text-sm font-medium text-gray-900 dark:text-white block"
                          >
                            {filter.label}
                          </label>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{filter.desc}</p>
                        </div>
                        <Switch
                          id={`filter-${filter.key}`}
                          checked={currentSettings.customFilters[filter.key]}
                          onCheckedChange={(checked) => updateCustomFilter(filter.key, checked)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Hidden Triggers Card */}
            <HiddenTriggersCard
              title={`Extra Content Hidden for ${selectedKid.name}`}
              description="We'll hide titles with these themes on this account. School or therapist settings may hide additional content."
              note="You can adjust these at any time. These settings give you extra control beyond school policies."
              enabled={currentHiddenTriggersEnabled}
              onToggleEnabled={() => {
                setKidHiddenTriggersEnabled((prev) => ({
                  ...prev,
                  [selectedKidId]: !prev[selectedKidId],
                }))
              }}
              hiddenTriggers={currentHiddenTriggers}
              onToggleTrigger={toggleTriggerForKid}
              level="parent"
            />
          </div>

          {/* Right Column - Insights & Safety */}
          <div className="space-y-6">
            {/* This Week's Protection Card */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">This Week's Protection</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-bold text-[#4A5FBA] dark:text-[#6B9DFC]">{selectedKid.minutesSkipped}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Minutes of upsetting content adjusted</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#4A5FBA] dark:text-[#6B9DFC]">{selectedKid.scenesAdjusted}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Scenes SKIP IT. helped with</p>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const value = [18, 25, 12, 30, 22, 8, 12][i]
                    return (
                      <div key={day} className="flex items-center gap-3">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8">{day}</p>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-[#4A5FBA] dark:bg-[#6B9DFC] h-2 rounded-full transition-all"
                            style={{ width: `${(value / 30) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8 text-right">
                          {value}m
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mt-6 italic">
                We share this so you can understand patterns, not to judge your child's choices.
              </p>
            </Card>

            {/* Viewing Patterns Card */}
            <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Viewing Patterns</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Most watched time of day</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                    {selectedKid.mostWatchedTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Most watched type of story</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white mt-1">
                    {selectedKid.favoriteGenre}
                  </p>
                </div>
              </div>
            </Card>

            {/* Conversation Tips Card */}
            <Card className="p-6 bg-gradient-to-br from-[#E8F0FF] to-[#F0E8FF] dark:from-[#1a1654] dark:to-[#2d1f5e] border-[#4A5FBA]/20 dark:border-[#6B9DFC]/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#4A5FBA] dark:text-[#6B9DFC] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Talking about tough scenes</h3>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                    <li>Ask how a scene made them feel.</li>
                    <li>Remind them it's okay to pause or stop.</li>
                    <li>Let them know you're here if they want to talk.</li>
                    <li>Avoid pressuring them to explain or "get over it."</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
