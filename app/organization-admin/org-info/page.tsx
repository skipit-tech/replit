"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Info, Copy, CheckCircle } from 'lucide-react'

export default function OrganizationInfo() {
  const [orgName, setOrgName] = useState("Hope Community Center")
  const [orgId] = useState("DEMO-ORG-2024")
  const [copied, setCopied] = useState(false)

  const handleCopyOrgId = () => {
    navigator.clipboard.writeText(orgId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Info className="w-8 h-8 text-[#4A5FBA] dark:text-[#6B9DFC]" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Organization Info</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          View and manage your organization details
        </p>
      </header>

      {/* Organization Details */}
      <Card className="p-8 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Organization Details
        </h2>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="org-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Organization Name
            </Label>
            <Input
              id="org-name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="org-id" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Organization ID
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="org-id"
                value={orgId}
                readOnly
                className="font-mono bg-gray-50 dark:bg-[#0D0B3B]"
              />
              <Button
                variant="outline"
                onClick={handleCopyOrgId}
                className="shrink-0"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Share this ID with members to allow them to join your organization
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button className="bg-[#4A5FBA] hover:bg-[#3d4f9a] text-white">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Instructions Card */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          How Members Join Your Organization
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>Share your Organization ID with members</li>
          <li>They enter the ID during signup or in their account settings</li>
          <li>Once connected, they automatically receive your organization's content filters</li>
          <li>Organization settings cannot be overridden by individual users</li>
        </ol>
      </Card>
    </div>
  )
}
