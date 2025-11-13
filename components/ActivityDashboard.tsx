"use client"

import { useState } from "react"

type TimeFilter = "week" | "month" | "all"

interface TriggerData {
  name: string
  color: string
  percentage: number
  scenes: number
}

export default function ActivityDashboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("week")

  // Mock data
  const minutesProtected = 42
  const scenesSkipped = 16
  const weeklyActivity = [3, 1, 4, 2, 5, 0, 1] // Last 7 days
  const dailyGoal = { current: 0, target: 15 }

  const triggerData: TriggerData[] = [
    { name: "Sexual content", color: "#ef4444", percentage: 32, scenes: 6 },
    { name: "Violence", color: "#a855f7", percentage: 25, scenes: 5 },
    { name: "Emotional distress", color: "#eab308", percentage: 19, scenes: 3 },
    { name: "Self-harm", color: "#3b82f6", percentage: 13, scenes: 2 },
    { name: "Animal harm", color: "#22c55e", percentage: 11, scenes: 2 },
  ]

  const maxActivity = Math.max(...weeklyActivity)

  return (
    <div className="space-y-6">
      {/* Time Filter */}
      <div className="flex gap-2 bg-white/5 rounded-xl p-1 w-fit">
        {(["week", "month", "all"] as TimeFilter[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              timeFilter === filter ? "bg-white text-[#0D0B3B]" : "text-white/70 hover:text-white"
            }`}
          >
            {filter === "week" ? "This Week" : filter === "month" ? "This Month" : "All Time"}
          </button>
        ))}
      </div>

      {/* Top Row - Stat Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Minutes Protected Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Minutes Protected</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-gray-900">{minutesProtected}</span>
            <span className="text-xl text-gray-500">min</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">This week</p>
          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#d0e3ff] rounded-full" style={{ width: "70%" }} />
          </div>
        </div>

        {/* Scenes Skipped Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Scenes Skipped</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-bold text-gray-900">{scenesSkipped}</span>
            <span className="text-xl text-gray-500">scenes</span>
          </div>
          <p className="text-sm text-gray-500 mb-3">This week</p>
          {/* Mini 7-day chart */}
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
        </div>
      </div>

      {/* Donut Chart - Triggers Filtered */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Triggers Filtered</h3>
        <p className="text-sm text-gray-500 mb-6">
          A breakdown of the types of scenes SKIP IT skipped or blurred for you.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Donut Chart */}
          <div className="relative w-64 h-64 mx-auto">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {(() => {
                let cumulativePercent = 0
                return triggerData.map((trigger, i) => {
                  const strokeDasharray = `${trigger.percentage} ${100 - trigger.percentage}`
                  const strokeDashoffset = -cumulativePercent
                  cumulativePercent += trigger.percentage
                  return (
                    <circle
                      key={i}
                      cx="50"
                      cy="50"
                      r="15.9155"
                      fill="transparent"
                      stroke={trigger.color}
                      strokeWidth="10"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all hover:stroke-[12]"
                    />
                  )
                })
              })()}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{scenesSkipped}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {triggerData.map((trigger, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: trigger.color }} />
                  <span className="text-sm font-medium text-gray-700">{trigger.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {trigger.percentage}% · {trigger.scenes} scenes
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Daily Goal Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Content Wellness Goal</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">{dailyGoal.current}</span>
          <span className="text-xl text-gray-500">/ {dailyGoal.target} min</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">Goal: {dailyGoal.target} min of protected viewing</p>
        {/* Progress bar */}
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#d0e3ff] to-[#93b8f0] rounded-full transition-all"
            style={{ width: `${(dailyGoal.current / dailyGoal.target) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
