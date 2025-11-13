"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Settings, TrendingUp, Shield } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const triggerData = [
  { name: "Sexual content", value: 35, color: "#F97373", minutes: 14 },
  { name: "Violence", value: 25, color: "#A855F7", minutes: 10 },
  { name: "Emotional distress", value: 20, color: "#FBBF24", minutes: 8 },
  { name: "Self-harm", value: 12, color: "#3B82F6", minutes: 6 },
  { name: "Animal harm", value: 10, color: "#22C55E", minutes: 4 },
]

export default function SchoolAdminOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#0D0B3B] dark:text-white mb-2">Overview</h1>
        <p className="text-gray-700 dark:text-gray-300">Monitor your school's content filtering activity</p>
      </div>

      {/* School Info Card */}
      <Card className="p-6 bg-white dark:bg-[#1a1654] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">School Name</p>
              <p className="text-xl font-semibold text-[#0D0B3B] dark:text-white">Demo School District</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
                <p className="text-sm font-medium text-[#0D0B3B] dark:text-white">Filtering Enabled</p>
              </div>
            </div>
          </div>
          <Link href="/school-admin/content-filters">
            <Button className="bg-[#6B9DFC] hover:bg-[#5a8de8] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8de8] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B9DFC] focus:ring-offset-2">
              <Settings className="w-4 h-4 mr-2" />
              Edit Content Filters
            </Button>
          </Link>
        </div>
      </Card>

      {/* Usage & Impact Section */}
      <section aria-labelledby="usage-impact-heading">
        <h2 id="usage-impact-heading" className="text-2xl font-bold text-[#0D0B3B] dark:text-white mb-6">
          Usage & Impact
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Minutes Protected */}
          <Card className="p-6 bg-white dark:bg-[#1a1654] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Minutes Protected</p>
                <p className="text-3xl font-bold text-[#0D0B3B] dark:text-white">42 min</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">This week</p>
            <div
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
              role="progressbar"
              aria-label="Minutes protected progress"
              aria-valuenow={65}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: "65%" }} />
            </div>
          </Card>

          {/* Scenes Skipped */}
          <Card className="p-6 bg-white dark:bg-[#1a1654] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Scenes Skipped</p>
                  <p className="text-3xl font-bold text-[#0D0B3B] dark:text-white">16 scenes</p>
                </div>
              </div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-1 h-12" role="img" aria-label="Weekly activity chart showing 7 days">
                {[4, 3, 5, 2, 6, 4, 7].map((height, i) => (
                  <div
                    key={i}
                    className={`w-2 rounded-t ${i === 6 ? "bg-purple-600 dark:bg-purple-400" : "bg-gray-300 dark:bg-gray-600"}`}
                    style={{ height: `${height * 8}%` }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">This week</p>
          </Card>
        </div>

        {/* Triggers Filtered Donut Chart */}
        <Card className="p-6 bg-white dark:bg-[#1a1654] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#0D0B3B] dark:text-white mb-2">Triggers Filtered</h3>
            <p className="text-gray-600 dark:text-gray-400">Types of scenes SKIP IT skipped or blurred</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Donut Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={triggerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {triggerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        const total = triggerData.reduce((sum, item) => sum + item.value, 0)
                        const percentage = ((data.value / total) * 100).toFixed(1)
                        return (
                          <div
                            className="bg-white dark:bg-[#1a1654] p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                            role="tooltip"
                          >
                            <p className="font-semibold text-[#0D0B3B] dark:text-white">{data.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {percentage}% ({data.value} scenes)
                            </p>
                            <p className="text-sm text-[#6B9DFC] dark:text-[#8BB3FF] font-medium">
                              {data.minutes} minutes skipped
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {triggerData.map((item) => {
                const total = triggerData.reduce((sum, entry) => sum + entry.value, 0)
                const percentage = ((item.value / total) * 100).toFixed(1)
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                        aria-hidden="true"
                      />
                      <span className="text-sm text-[#0D0B3B] dark:text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-[#0D0B3B] dark:text-white">{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
