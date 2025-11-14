"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Check } from 'lucide-react'
import { HiddenTriggersCard } from "@/components/hidden-triggers-card"
import type { TriggerKey } from "@/lib/types/settings"

const contentFilters = [
  // Red circle - Sexual Content
  {
    id: "sexual-content",
    label: "Sexual Content",
    description: "Scenes with sexual themes not appropriate for minors.",
    category: "sexual",
    color: "red",
    defaultOn: true,
  },
  {
    id: "nudity",
    label: "Nudity (Full or Partial)",
    description: "Non-educational nudity of any kind.",
    category: "sexual",
    color: "red",
    defaultOn: true,
  },
  {
    id: "sex-scenes",
    label: "Sex Scenes (Implied or Shown)",
    description: "Romantic or sexual activity, even if not explicit.",
    category: "sexual",
    color: "red",
    defaultOn: true,
  },
  {
    id: "sexual-assault",
    label: "Sexual Assault / Non-consensual Content",
    description: "Any reference or depiction of sexual violence.",
    category: "sexual",
    color: "red",
    defaultOn: true,
  },
  {
    id: "rape-references",
    label: "Rape References (Audio or Dialogue)",
    description: "Verbal content mentioning rape or assault.",
    category: "sexual",
    color: "red",
    defaultOn: true,
  },
  // Blue circle - Violence
  {
    id: "violence",
    label: "Violence",
    description: "General physical harm, fighting, or threatening behavior.",
    category: "violence",
    color: "blue",
    defaultOn: true,
  },
  {
    id: "graphic-violence",
    label: "Graphic Violence",
    description: "More intense or shocking depictions (blood, injury).",
    category: "violence",
    color: "blue",
    defaultOn: true,
  },
  {
    id: "weapons",
    label: "Weapons",
    description: "Scenes involving guns, knives, or other weapons.",
    category: "violence",
    color: "blue",
    defaultOn: true,
  },
  // Purple circle - Mental Health
  {
    id: "self-harm",
    label: "Self-Harm",
    description: "References or depictions of harming oneself.",
    category: "mental-health",
    color: "purple",
    defaultOn: true,
  },
  {
    id: "suicide",
    label: "Suicide / Suicidal Ideation",
    description: "Scenes discussing or portraying suicide.",
    category: "mental-health",
    color: "purple",
    defaultOn: true,
  },
  // Yellow circle - Emotional
  {
    id: "emotional-distress",
    label: "Emotional Distress",
    description:
      "Intense themes: crying, panic, parental conflict, fear, trauma. Teachers LOVE this one because it helps sensitive students.",
    category: "emotional",
    color: "yellow",
    defaultOn: true,
  },
  // Green circle - Social
  {
    id: "bullying",
    label: "Bullying / Harassment",
    description: "Verbal aggression, humiliation, or peer harassment.",
    category: "social",
    color: "green",
    defaultOn: true,
  },
  {
    id: "hate-speech",
    label: "Hate Speech",
    description: "Slurs, discrimination, or targeted insults.",
    category: "social",
    color: "green",
    defaultOn: true,
  },
  // Brown circle - Animal
  {
    id: "animal-harm",
    label: "Animal Harm",
    description: "Violence or cruelty involving animals.",
    category: "animal",
    color: "brown",
    defaultOn: true,
  },
  // White/Gray circle - Language
  {
    id: "profanity",
    label: "Strong Language / Profanity",
    description: "Swearing or offensive language.",
    category: "language",
    color: "gray",
    defaultOn: false,
  },
]

const getCategoryBadgeColor = (color: string) => {
  const colors: Record<string, string> = {
    red: "bg-red-100 text-red-700 border-red-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    green: "bg-green-100 text-green-700 border-green-200",
    brown: "bg-amber-100 text-amber-700 border-amber-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  }
  return colors[color] || colors.gray
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    sexual: "Sexual Content",
    violence: "Violence",
    "mental-health": "Mental Health",
    emotional: "Emotional",
    social: "Social Issues",
    animal: "Animal Welfare",
    language: "Language",
  }
  return labels[category] || category
}

export default function ContentFiltersPage() {
  const [filters, setFilters] = useState(
    contentFilters.reduce(
      (acc, filter) => {
        acc[filter.id] = filter.defaultOn
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )
  const [saved, setSaved] = useState(false)
  
  const [hiddenTriggersEnabled, setHiddenTriggersEnabled] = useState(false)
  const [hiddenTriggers, setHiddenTriggers] = useState<TriggerKey[]>([])

  const toggleFilter = (id: string) => {
    setFilters((prev) => ({ ...prev, [id]: !prev[id] }))
    setSaved(false)
  }

  const toggleTrigger = (trigger: TriggerKey) => {
    setHiddenTriggers((prev) =>
      prev.includes(trigger) ? prev.filter((t) => t !== trigger) : [...prev, trigger]
    )
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const filtersByCategory = contentFilters.reduce(
    (acc, filter) => {
      if (!acc[filter.category]) {
        acc[filter.category] = []
      }
      acc[filter.category].push(filter)
      return acc
    },
    {} as Record<string, typeof contentFilters>,
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold text-[#0D0B3B] dark:text-white mb-2">Content Filters for Your School</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Choose what SKIP IT should automatically skip for your students.
        </p>
      </header>

      {/* HiddenTriggersCard */}
      <HiddenTriggersCard
        title="Hidden Content Triggers (School-wide)"
        description="Titles with these themes will be hidden for all students on school devices."
        note="These settings apply across all grade levels and cannot be overridden by individual users."
        enabled={hiddenTriggersEnabled}
        onToggleEnabled={() => setHiddenTriggersEnabled(!hiddenTriggersEnabled)}
        hiddenTriggers={hiddenTriggers}
        onToggleTrigger={toggleTrigger}
        level="school"
      />

      {/* Filters Card */}
      <Card className="p-8 bg-white dark:bg-[#1a1654] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
          aria-label="Content filter settings"
        >
          {Object.entries(filtersByCategory).map(([category, categoryFilters], categoryIndex) => (
            <fieldset key={category}>
              {/* Category Header */}
              <legend className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeColor(categoryFilters[0].color)}`}
                >
                  {getCategoryLabel(category)}
                </span>
              </legend>

              {/* Category Filters */}
              <div className="space-y-4" role="list">
                {categoryFilters.map((filter, index) => (
                  <div
                    key={filter.id}
                    className={`flex items-start justify-between py-4 ${
                      index !== categoryFilters.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""
                    }`}
                    role="listitem"
                  >
                    <div className="flex-1 mr-6">
                      <h3 className="text-lg font-semibold text-[#0D0B3B] dark:text-white mb-1">{filter.label}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{filter.description}</p>
                    </div>
                    <Switch
                      checked={filters[filter.id]}
                      onCheckedChange={() => toggleFilter(filter.id)}
                      className="data-[state=checked]:bg-[#6B9DFC]"
                      aria-label={`Toggle ${filter.label} filter`}
                    />
                  </div>
                ))}
              </div>

              {/* Separator between categories */}
              {categoryIndex !== Object.keys(filtersByCategory).length - 1 && (
                <div className="mt-8 border-t-2 border-gray-300 dark:border-gray-600" aria-hidden="true" />
              )}
            </fieldset>
          ))}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="submit"
              className="w-full bg-[#6B9DFC] hover:bg-[#5a8de8] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8de8] text-white rounded-xl py-6 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#6B9DFC] focus:ring-offset-2"
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5 mr-2" aria-hidden="true" />
                  Saved Successfully
                </>
              ) : (
                "Save School Rules"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
