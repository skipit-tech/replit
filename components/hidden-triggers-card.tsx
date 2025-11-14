import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Info } from 'lucide-react'
import type { TriggerKey } from "@/lib/types/settings"
import { triggerLabels } from "@/lib/utils/hidden-triggers"

type HiddenTriggersCardProps = {
  title: string
  description: string
  note?: string
  enabled: boolean
  onToggleEnabled: () => void
  hiddenTriggers: TriggerKey[]
  onToggleTrigger: (trigger: TriggerKey) => void
  level: "school" | "therapist" | "parent"
}

export function HiddenTriggersCard({
  title,
  description,
  note,
  enabled,
  onToggleEnabled,
  hiddenTriggers,
  onToggleTrigger,
  level,
}: HiddenTriggersCardProps) {
  const triggerKeys: TriggerKey[] = [
    "gun_violence",
    "sexual_content",
    "self_harm",
    "animal_harm",
    "emotional_distress",
    "substance_use",
  ]

  return (
    <Card className="p-6 bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-3 mb-4">
        <Info className="w-5 h-5 text-[#4A5FBA] dark:text-[#6B9DFC] shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <label
            htmlFor={`enable-triggers-${level}`}
            className="text-sm font-semibold text-gray-900 dark:text-white block cursor-pointer"
          >
            Enable Hidden Content Triggers
          </label>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Hide entire shows/movies based on specific content types
          </p>
        </div>
        <Switch
          id={`enable-triggers-${level}`}
          checked={enabled}
          onCheckedChange={onToggleEnabled}
          aria-label="Enable or disable hidden content triggers"
        />
      </div>

      <div className={`space-y-4 ${!enabled ? 'opacity-50 pointer-events-none' : ''}`}>
        {triggerKeys.map((trigger) => {
          const { label, description } = triggerLabels[trigger]
          const isChecked = hiddenTriggers.includes(trigger)

          return (
            <div
              key={trigger}
              className="flex items-start justify-between gap-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div className="flex-1">
                <label
                  htmlFor={`trigger-${trigger}-${level}`}
                  className="text-sm font-medium text-gray-900 dark:text-white block cursor-pointer"
                >
                  {label}
                </label>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</p>
              </div>
              <Switch
                id={`trigger-${trigger}-${level}`}
                checked={isChecked}
                onCheckedChange={() => onToggleTrigger(trigger)}
                aria-label={`${isChecked ? "Hide" : "Show"} content with ${label.toLowerCase()}`}
                disabled={!enabled}
              />
            </div>
          )
        })}
      </div>

      {note && (
        <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-6 p-3 bg-gray-50 dark:bg-[#0D0B3B]/50 rounded-lg">
          {note}
        </p>
      )}
    </Card>
  )
}
