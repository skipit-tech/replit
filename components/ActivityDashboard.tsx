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
      { name: "Sexual content", color: "#ef4444", percentage: 32, scenes: 6, minutes: 13 },
      { name: "Violence", color: "#a855f7", percentage: 25, scenes: 5, minutes: 11 },
      { name: "Emotional distress", color: "#eab308", percentage: 19, scenes: 3, minutes: 8 },
      { name: "Self-harm", color: "#3b82f6", percentage: 13, scenes: 2, minutes: 5 },
      { name: "Animal harm", color: "#22c55e", percentage: 11, scenes: 2, minutes: 5 },
    ],
  },
  month: {
    minutesProtected: 178,
    scenesSkipped: 64,
    weeklyActivity: [8, 12, 9, 15, 11, 13, 10],
    triggerData: [
      { name: "Sexual content", color: "#ef4444", percentage: 30, scenes: 19, minutes: 53 },
      { name: "Violence", color: "#a855f7", percentage: 28, scenes: 18, minutes: 50 },
      { name: "Emotional distress", color: "#eab308", percentage: 20, scenes: 13, minutes: 36 },
      { name: "Self-harm", color: "#3b82f6", percentage: 12, scenes: 8, minutes: 21 },
      { name: "Animal harm", color: "#22c55e", percentage: 10, scenes: 6, minutes: 18 },
    ],
  },
  all: {
    minutesProtected: 892,
    scenesSkipped: 312,
    weeklyActivity: [42, 38, 45, 51, 48, 40, 44],
    triggerData: [
      { name: "Sexual content", color: "#ef4444", percentage: 31, scenes: 97, minutes: 277 },
      { name: "Violence", color: "#a855f7", percentage: 27, scenes: 84, minutes: 241 },
      { name: "Emotional distress", color: "#eab308", percentage: 19, scenes: 59, minutes: 169 },
      { name: "Self-harm", color: "#3b82f6", percentage: 13, scenes: 41, minutes: 116 },
      { name: "Animal harm", color: "#22c55e", percentage: 10, scenes: 31, minutes: 89 },
    ],
  },
}

const DonutChart = memo(function DonutChart({
  triggerData,
  scenesSkipped,
}: { triggerData: TriggerData[]; scenesSkipped: number }) {
  const { t } = useI18n()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

  return (
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
            className="transition-all duration-200 cursor-pointer hover:opacity-80"
            style={{
              stroke: path.color,
              strokeWidth: hoveredIndex === index ? "12" : "10",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{scenesSkipped}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{t("settings.activity.total")}</div>
        </div>
      </div>

      {hoveredIndex !== null && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
          <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-4 min-w-[220px]">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: triggerData[hoveredIndex].color }}
              />
              <span className="font-semibold text-gray-900 dark:text-white text-base">
                {triggerData[hoveredIndex].name}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-6">
              <div>
                {triggerData[hoveredIndex].percentage}% ({triggerData[hoveredIndex].scenes} scenes)
              </div>
              <div className="font-semibold text-[#6B9DFC] text-base">
                {triggerData[hoveredIndex].minutes} min skipped
              </div>
            </div>
          </div>
        </div>
      )}
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

  const currentData = useMemo(() => mockData[timeFilter], [timeFilter])
  const { minutesProtected, scenesSkipped, weeklyActivity, triggerData } = currentData

  const dailyGoal = { current: 0, target: 15 }

  return (
    <div className="space-y-6">
      {/* Time Filter */}
      <div className="flex gap-2 bg-white/20 dark:bg-white/5 rounded-xl p-1 w-fit">
        {(["week", "month", "all"] as TimeFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              timeFilter === filter
                ? "bg-white dark:bg-white text-[#0D0B3B]"
                : "bg-transparent text-white hover:text-white/80"
            }`}
          >
            {t(`settings.activity.timeFilter.${filter}`)}
          </button>
        ))}
      </div>

      {/* Top Row - Stat Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Minutes Protected Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">{t("settings.activity.minutesProtected")}</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-gray-900">{minutesProtected}</span>
            <span className="text-xl text-gray-500">{t("settings.activity.min")}</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">{t(`settings.activity.timeLabel.${timeFilter}`)}</p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#d0e3ff] rounded-full transition-all duration-500" style={{ width: "70%" }} />
          </div>
        </div>

        {/* Scenes Skipped Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">{t("settings.activity.scenesSkipped")}</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-gray-900">{scenesSkipped}</span>
            <span className="text-xl text-gray-500">{t("settings.activity.scenes")}</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">{t(`settings.activity.timeLabel.${timeFilter}`)}</p>
          <ActivityBars weeklyActivity={weeklyActivity} />
        </div>
      </div>

      {/* Donut Chart - Triggers Filtered */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("settings.activity.triggersFiltered")}</h3>
        <p className="text-sm text-gray-500 mb-6">{t("settings.activity.triggersDesc")}</p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <DonutChart triggerData={triggerData} scenesSkipped={scenesSkipped} />

          {/* Legend */}
          <div className="space-y-3">
            {triggerData.map((trigger, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: trigger.color }} />
                  <span className="text-sm font-medium text-gray-700">
                    {t(`settings.activity.triggers.${trigger.name}`)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {trigger.percentage}% · {trigger.scenes} {t("settings.activity.scenes")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Daily Goal Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">{t("settings.activity.wellnessGoal")}</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">{dailyGoal.current}</span>
          <span className="text-xl text-gray-500">
            / {dailyGoal.target} {t("settings.activity.min")}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-3">{t("settings.activity.goalDesc", { target: dailyGoal.target })}</p>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d0e3ff] to-[#93b8f0] rounded-full transition-all duration-500"
            style={{ width: `${(dailyGoal.current / dailyGoal.target) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
