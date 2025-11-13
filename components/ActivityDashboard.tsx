"use client"

import { useState, useMemo, memo } from "react"
import { useI18n } from "@/i18n/I18nProvider"

type TimeFilter = "week" | "month" | "all"

interface TriggerData {
  name: string
  color: string
  percentage: number
  scenes: number
  minutes: number
}

const mockData = {
  week: {
    minutesProtected: 42,
    scenesSkipped: 16,
    weeklyActivity: [3, 1, 4, 2, 5, 0, 1],
    triggerData: [
      { name: "Sexual content", color: "#F05252", percentage: 32, scenes: 6, minutes: 13 },
      { name: "Violence", color: "#A855F7", percentage: 25, scenes: 5, minutes: 11 },
      { name: "Emotional distress", color: "#F59E0B", percentage: 19, scenes: 3, minutes: 8 },
      { name: "Self-harm", color: "#3B82F6", percentage: 13, scenes: 2, minutes: 5 },
      { name: "Animal harm", color: "#10B981", percentage: 11, scenes: 2, minutes: 5 },
    ],
  },
  month: {
    minutesProtected: 178,
    scenesSkipped: 64,
    weeklyActivity: [8, 12, 9, 15, 11, 13, 10],
    triggerData: [
      { name: "Sexual content", color: "#F05252", percentage: 30, scenes: 19, minutes: 53 },
      { name: "Violence", color: "#A855F7", percentage: 28, scenes: 18, minutes: 50 },
      { name: "Emotional distress", color: "#F59E0B", percentage: 20, scenes: 13, minutes: 36 },
      { name: "Self-harm", color: "#3B82F6", percentage: 12, scenes: 8, minutes: 21 },
      { name: "Animal harm", color: "#10B981", percentage: 10, scenes: 6, minutes: 18 },
    ],
  },
  all: {
    minutesProtected: 892,
    scenesSkipped: 312,
    weeklyActivity: [42, 38, 45, 51, 48, 40, 44],
    triggerData: [
      { name: "Sexual content", color: "#F05252", percentage: 31, scenes: 97, minutes: 277 },
      { name: "Violence", color: "#A855F7", percentage: 27, scenes: 84, minutes: 241 },
      { name: "Emotional distress", color: "#F59E0B", percentage: 19, scenes: 59, minutes: 169 },
      { name: "Self-harm", color: "#3B82F6", percentage: 13, scenes: 41, minutes: 116 },
      { name: "Animal harm", color: "#10B981", percentage: 10, scenes: 31, minutes: 89 },
    ],
  },
}

const DonutChart = memo(function DonutChart({
  triggerData,
  scenesSkipped,
}: { triggerData: TriggerData[]; scenesSkipped: number }) {
  const { t } = useI18n()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const paths = useMemo(() => {
    let cumulativePercent = 0
    return triggerData.map((trigger, i) => {
      const strokeDasharray = `${trigger.percentage} ${100 - trigger.percentage}`
      const strokeDashoffset = -cumulativePercent
      cumulativePercent += trigger.percentage
      return {
        key: i,
        strokeDasharray,
        strokeDashoffset,
        color: trigger.color,
      }
    })
  }, [triggerData])

  const selectedTrigger = triggerData[selectedIndex ?? 0]

  return (
    <div className="space-y-4">
      {/* Donut Chart */}
      <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {paths.map((path, index) => (
            <circle
              key={path.key}
              cx="50"
              cy="50"
              r="15.9155"
              fill="none"
              stroke={path.color}
              strokeWidth="10"
              strokeDasharray={path.strokeDasharray}
              strokeDashoffset={path.strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-200 cursor-pointer hover:opacity-80 focus:outline-none focus:opacity-80"
              style={{
                stroke: path.color,
                strokeWidth: selectedIndex === index ? "12" : "10",
              }}
              onMouseEnter={() => setSelectedIndex(index)}
              onFocus={() => setSelectedIndex(index)}
              tabIndex={0}
              role="button"
              aria-label={`${triggerData[index].name}: ${triggerData[index].percentage}% (${triggerData[index].scenes} scenes, ${triggerData[index].minutes} minutes skipped)`}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-base font-bold text-gray-900 dark:text-white">{scenesSkipped}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{t("settings.activity.total")}</div>
          </div>
        </div>
      </div>

      <div
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md p-4 max-w-sm mx-auto"
        role="region"
        aria-live="polite"
        aria-atomic="true"
      >
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
          Selected Trigger
        </h4>
        <div className="flex items-start gap-3">
          <div
            className="w-5 h-5 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: selectedTrigger.color }}
            aria-hidden="true"
          />
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-gray-900 dark:text-white text-base mb-2">{selectedTrigger.name}</h5>
            <div className="space-y-1 text-sm">
              <div className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">{selectedTrigger.percentage}%</span> ({selectedTrigger.scenes} scenes)
              </div>
              <div className="font-semibold text-[#6B9DFC] text-base">{selectedTrigger.minutes} min skipped</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const ActivityBars = memo(function ActivityBars({ weeklyActivity }: { weeklyActivity: number[] }) {
  const maxActivity = useMemo(() => Math.max(...weeklyActivity), [weeklyActivity])

  return (
    <div className="flex items-end gap-1 h-12">
      {weeklyActivity.map((count, i) => (
        <div key={i} className="flex-1 flex flex-col justify-end">
          <div
            className={`w-full rounded-t ${i === 6 ? "bg-[#d0e3ff]" : "bg-gray-200"}`}
            style={{ height: `${maxActivity > 0 ? (count / maxActivity) * 100 : 0}%` }}
          />
        </div>
      ))}
    </div>
  )
})

export default function ActivityDashboard() {
  const { t } = useI18n()
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("week")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const currentData = useMemo(() => mockData[timeFilter], [timeFilter])
  const { minutesProtected, scenesSkipped, weeklyActivity, triggerData } = currentData

  const dailyGoal = { current: 0, target: 15 }

  return (
    <div className="space-y-6">
      {/* Time Filter */}
      <div role="tablist" className="flex gap-3 p-1" aria-label="Time period filter">
        {(["week", "month", "all"] as TimeFilter[]).map((filter) => (
          <button
            key={filter}
            role="tab"
            aria-selected={timeFilter === filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-5 py-2 rounded-full text-sm font-medium shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC] ${
              timeFilter === filter
                ? "bg-white dark:bg-white text-slate-900 dark:text-slate-900"
                : "bg-transparent dark:bg-transparent border border-slate-300 dark:border-slate-500 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-[#111827]"
            }`}
          >
            {t(`settings.activity.timeFilter.${filter}`)}
          </button>
        ))}
      </div>

      {/* Top Row - Stat Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Minutes Protected Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-200 mb-3">
            {t("settings.activity.minutesProtected")}
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-gray-900 dark:text-white">{minutesProtected}</span>
            <span className="text-xl text-gray-500 dark:text-slate-300">{t("settings.activity.min")}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-300 mb-3">
            {t(`settings.activity.timeLabel.${timeFilter}`)}
          </p>
          <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d0e3ff] dark:bg-[#6B9DFC] rounded-full transition-all duration-500"
              style={{ width: "70%" }}
            />
          </div>
        </div>

        {/* Scenes Skipped Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-200 mb-3">
            {t("settings.activity.scenesSkipped")}
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-gray-900 dark:text-white">{scenesSkipped}</span>
            <span className="text-xl text-gray-500 dark:text-slate-300">{t("settings.activity.scenes")}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-slate-300 mb-3">
            {t(`settings.activity.timeLabel.${timeFilter}`)}
          </p>
          <ActivityBars weeklyActivity={weeklyActivity} />
        </div>
      </div>

      {/* Donut Chart - Triggers Filtered */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {t("settings.activity.triggersFiltered")}
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-200 mb-6">{t("settings.activity.triggersDesc")}</p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <DonutChart triggerData={triggerData} scenesSkipped={scenesSkipped} />

          {/* Legend */}
          <div className="space-y-3" role="list">
            {triggerData.map((trigger, i) => (
              <button
                key={i}
                role="listitem"
                tabIndex={0}
                onMouseEnter={() => setSelectedIndex(i)}
                onFocus={() => setSelectedIndex(i)}
                className="flex items-center justify-between w-full text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC]"
                aria-label={`${trigger.name}: ${trigger.percentage}% (${trigger.scenes} scenes, ${trigger.minutes} minutes skipped)`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: trigger.color }} />
                  <span className="text-sm font-medium text-gray-700 dark:text-slate-100">
                    {t(`settings.activity.triggers.${trigger.name}`)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-slate-300">
                  {trigger.percentage}% · {trigger.scenes} {t("settings.activity.scenes")}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Daily Goal Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-200 mb-3">
          {t("settings.activity.wellnessGoal")}
        </h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{dailyGoal.current}</span>
          <span className="text-xl text-gray-500 dark:text-slate-300">
            / {dailyGoal.target} {t("settings.activity.min")}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-slate-200 mb-3">
          {t("settings.activity.goalDesc", { target: dailyGoal.target })}
        </p>
        <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d0e3ff] to-[#93b8f0] dark:from-[#6B9DFC] dark:to-[#4A5FBA] rounded-full transition-all duration-500"
            style={{ width: `${(dailyGoal.current / dailyGoal.target) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
