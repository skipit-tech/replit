"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Settings, TrendingUp, Shield } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const triggerData = [
  { name: "Sexual content", value: 35, color: "#EF4444" },
  { name: "Violence", value: 25, color: "#8B5CF6" },
  { name: "Emotional distress", value: 20, color: "#F59E0B" },
  { name: "Self-harm", value: 12, color: "#3B82F6" },
  { name: "Animal harm", value: 8, color: "#10B981" },
]

export default function SchoolAdminOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Overview</h1>
        <p className="text-white/80">Monitor your school's content filtering activity</p>
      </div>

      {/* School Info Card */}
      <Card className="p-6 bg-white rounded-2xl shadow-sm">
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">School Name</p>
              <p className="text-xl font-semibold text-gray-900">Demo School District</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-sm font-medium text-gray-900">Filtering Enabled</p>
              </div>
            </div>
          </div>
          <Link href="/school-admin/content-filters">
            <Button className="bg-[#0A0E27] hover:bg-[#0A0E27]/90 text-white rounded-xl">
              <Settings className="w-4 h-4 mr-2" />
              Edit Content Filters
            </Button>
          </Link>
        </div>
      </Card>

      {/* Usage & Impact Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage & Impact</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Minutes Protected */}
          <Card className="p-6 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Minutes Protected</p>
                <p className="text-3xl font-bold text-gray-900">42 min</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-3">This week</p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }} />
            </div>
          </Card>

          {/* Scenes Skipped */}
          <Card className="p-6 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scenes Skipped</p>
                  <p className="text-3xl font-bold text-gray-900">16 scenes</p>
                </div>
              </div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-1 h-12">
                {[4, 3, 5, 2, 6, 4, 7].map((height, i) => (
                  <div
                    key={i}
                    className={`w-2 rounded-t ${i === 6 ? "bg-purple-600" : "bg-gray-300"}`}
                    style={{ height: `${height * 8}%` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500">This week</p>
          </Card>
        </div>

        {/* Triggers Filtered Donut Chart */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Triggers Filtered</h3>
            <p className="text-gray-600">Types of scenes SKIP IT skipped or blurred</p>
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
                  >
                    {triggerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0]
                        const total = triggerData.reduce((sum, item) => sum + item.value, 0)
                        const percentage = ((data.value / total) * 100).toFixed(1)
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border">
                            <p className="font-semibold text-gray-900">{data.name}</p>
                            <p className="text-sm text-gray-600">
                              {percentage}% ({data.value} scenes)
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
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
