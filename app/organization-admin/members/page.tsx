"use client"

import { Card } from "@/components/ui/card"
import { Users, UserCheck } from 'lucide-react'

const mockMembers = [
  { id: 1, name: "Sarah Johnson", role: "Admin", joinedDate: "Jan 15, 2024", status: "Active" },
  { id: 2, name: "Michael Chen", role: "Member", joinedDate: "Jan 20, 2024", status: "Active" },
  { id: 3, name: "Emily Rodriguez", role: "Member", joinedDate: "Feb 3, 2024", status: "Active" },
  { id: 4, name: "David Kim", role: "Member", joinedDate: "Feb 10, 2024", status: "Active" },
  { id: 5, name: "Jessica Williams", role: "Member", joinedDate: "Feb 15, 2024", status: "Active" },
]

export default function OrganizationMembers() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-[#4A5FBA] dark:text-[#6B9DFC]" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Members</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          View all members connected to your organization
        </p>
      </header>

      {/* Members List */}
      <Card className="p-6 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
        <div className="space-y-4">
          {mockMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-[#0D0B3B]/50 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#6B9DFC]/20 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-[#4A5FBA] dark:text-[#6B9DFC]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role} • Joined {member.joinedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          All members listed here are protected by your organization's content filters. 
          They cannot override or disable organization-level settings.
        </p>
      </Card>
    </div>
  )
}
