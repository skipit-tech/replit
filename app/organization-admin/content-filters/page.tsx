"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { HiddenTriggersCard } from "@/components/hidden-triggers-card"
import type { TriggerKey } from "@/lib/types/settings"
import { Shield } from 'lucide-react'

export default function OrganizationContentFilters() {
  const [enableHiddenTriggers, setEnableHiddenTriggers] = useState(true)
  const [hiddenTriggers, setHiddenTriggers] = useState<TriggerKey[]>([
    "sexual_content",
    "gun_violence",
    "substance_use",
  ])

  const handleToggleTrigger = (trigger: TriggerKey) => {
    setHiddenTriggers((prev) =>
      prev.includes(trigger)
        ? prev.filter((t) => t !== trigger)
        : [...prev, trigger]
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8 text-[#4A5FBA] dark:text-[#6B9DFC]" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Filters</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Set organization-wide content restrictions for all members
        </p>
      </header>

      {/* Info Card */}
      <Card className="p-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Organization Authority
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Content filtered at the organization level cannot be unfiltered by schools, therapists, or individual 
          users. These settings provide the highest level of control to ensure consistent safety standards 
          across your entire organization.
        </p>
      </Card>

      {/* Hidden Content Triggers */}
      <HiddenTriggersCard
        title="Hidden Content for Your Organization"
        description="These filters apply to everyone using your organization-wide settings. Schools, therapists, and parents cannot unhide these."
        note="These settings ensure consistent content safety across all users connected to your organization."
        enabled={enableHiddenTriggers}
        onToggleEnabled={() => setEnableHiddenTriggers(!enableHiddenTriggers)}
        hiddenTriggers={hiddenTriggers}
        onToggleTrigger={handleToggleTrigger}
        level="school"
      />
    </div>
  )
}
