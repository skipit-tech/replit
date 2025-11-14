"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Shield, Info, Users } from 'lucide-react'
import { AppLogo } from "@/components/app-logo"

const navItems = [
  { href: "/organization-admin", label: "Overview", icon: LayoutDashboard },
  { href: "/organization-admin/content-filters", label: "Content Filters", icon: Shield },
  { href: "/organization-admin/org-info", label: "Org Info", icon: Info },
  { href: "/organization-admin/members", label: "Members", icon: Users },
]

export default function OrganizationAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#E8F0FF] dark:bg-[#0D0B3B]">
      {/* Sidebar */}
      <aside
        className="w-64 bg-white dark:bg-[#1a1654] border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-sm"
        role="navigation"
        aria-label="Organization admin navigation"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="block" aria-label="Return to SKIP IT home">
            <AppLogo />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4" aria-label="Organization admin sections">
          <ul className="space-y-2" role="list">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B9DFC] ${
                      isActive
                        ? "bg-[#d0e3ff]/30 dark:bg-[#6B9DFC]/20 text-[#0D0B3B] dark:text-white font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#0D0B3B] dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#6B9DFC] rounded"
          >
            Back to Main App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto" role="main">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  )
}
