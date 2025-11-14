"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Shield, Users, CheckCircle } from 'lucide-react'

export default function OrganizationAdminOverview() {
  const [orgSettings] = useState({
    orgId: "DEMO-ORG-2024",
    name: "Hope Community Center",
    enableHiddenTriggers: true,
    activeMembers: 24,
    totalFilters: 3,
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-8 h-8 text-[#4A5FBA] dark:text-[#6B9DFC]" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Organization Admin</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Manage network-wide safety settings for your organization
        </p>
      </header>

      {/* Organization Info Card */}
      <Card className="p-8 bg-gradient-to-br from-[#6B9DFC]/10 to-[#B8A9FF]/10 dark:from-[#6B9DFC]/20 dark:to-[#B8A9FF]/20 border-[#6B9DFC]/20">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Organization Name</p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{orgSettings.name}</h2>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Organization ID</p>
            <p className="text-lg font-mono font-semibold text-[#4A5FBA] dark:text-[#6B9DFC]">
              {orgSettings.orgId}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span>Organization Active</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Members</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{orgSettings.activeMembers}</p>
            </div>
            <Users className="w-8 h-8 text-[#4A5FBA] dark:text-[#6B9DFC]" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Users connected to your organization
          </p>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Content Filters</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{orgSettings.totalFilters}</p>
            </div>
            <Shield className="w-8 h-8 text-[#4A5FBA] dark:text-[#6B9DFC]" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            Organization-wide content restrictions
          </p>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Protection Status</p>
              <p className="text-xl font-bold text-green-700 dark:text-green-400">Active</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            All members protected by org settings
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            onClick={() => (window.location.href = "/organization-admin/content-filters")}
          >
            <div className="text-left">
              <p className="font-semibold">Manage Content Filters</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set organization-wide restrictions</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto p-4"
            onClick={() => (window.location.href = "/organization-admin/members")}
          >
            <div className="text-left">
              <p className="font-semibold">View Members</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">See who's connected to your org</p>
            </div>
          </Button>
        </div>
      </Card>

      {/* Information Card */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Organization-Level Protection
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Settings configured at the organization level apply to all members and cannot be overridden by schools, 
          therapists, or individual users. This ensures consistent content safety across your entire network.
        </p>
      </Card>
    </div>
  )
}
