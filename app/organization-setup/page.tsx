"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OrganizationSetup() {
  const router = useRouter()
  const [mode, setMode] = useState<"create" | "join" | null>(null)
  
  // Create org state
  const [orgName, setOrgName] = useState("")
  const [newOrgId, setNewOrgId] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  
  // Join org state
  const [joinOrgId, setJoinOrgId] = useState("")

  const handleCreateOrg = () => {
    // In a real app, validate and create organization
    console.log("[v0] Creating organization:", { orgName, newOrgId, adminEmail })
    router.push("/organization-admin")
  }

  const handleJoinOrg = () => {
    // In a real app, validate org ID and join
    console.log("[v0] Joining organization:", joinOrgId)
    router.push("/")
  }

  if (!mode) {
    return (
      <div className="min-h-screen bg-[#E8F0FF] dark:bg-[#0D0B3B] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Organization Setup
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create a new organization or join an existing one
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className="p-8 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setMode("create")}
            >
              <Building2 className="w-12 h-12 text-[#4A5FBA] dark:text-[#6B9DFC] mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Create Organization
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Set up a new organization with custom content filters and invite members to join.
              </p>
              <Button className="w-full bg-[#4A5FBA] hover:bg-[#3d4f9a] text-white">
                Create New Organization
              </Button>
            </Card>

            <Card
              className="p-8 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setMode("join")}
            >
              <UserPlus className="w-12 h-12 text-[#4A5FBA] dark:text-[#6B9DFC] mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Join Organization
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Enter an organization ID to join an existing organization and receive their content filters.
              </p>
              <Button className="w-full bg-[#4A5FBA] hover:bg-[#3d4f9a] text-white">
                Join Existing Organization
              </Button>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (mode === "create") {
    return (
      <div className="min-h-screen bg-[#E8F0FF] dark:bg-[#0D0B3B] flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Your Organization
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Set up network-wide content safety for your community
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="org-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Organization Name
              </Label>
              <Input
                id="org-name"
                placeholder="e.g., Hope Community Center"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="new-org-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Organization ID
              </Label>
              <Input
                id="new-org-id"
                placeholder="e.g., HOPE-CENTER-2024"
                value={newOrgId}
                onChange={(e) => setNewOrgId(e.target.value.toUpperCase())}
                className="mt-2 font-mono"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                This unique ID will be used by members to join your organization
              </p>
            </div>

            <div>
              <Label htmlFor="admin-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Admin Email
              </Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@organization.org"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              onClick={() => setMode(null)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleCreateOrg}
              disabled={!orgName || !newOrgId || !adminEmail}
              className="flex-1 bg-[#4A5FBA] hover:bg-[#3d4f9a] text-white"
            >
              Create Organization
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8F0FF] dark:bg-[#0D0B3B] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join an Organization
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your organization's ID to connect and receive their content filters
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="join-org-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Organization ID
            </Label>
            <Input
              id="join-org-id"
              placeholder="Enter organization ID"
              value={joinOrgId}
              onChange={(e) => setJoinOrgId(e.target.value.toUpperCase())}
              className="mt-2 font-mono"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Contact your organization admin if you don't have this ID
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => setMode(null)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleJoinOrg}
            disabled={!joinOrgId}
            className="flex-1 bg-[#4A5FBA] hover:bg-[#3d4f9a] text-white"
          >
            Join Organization
          </Button>
        </div>
      </Card>
    </div>
  )
}
