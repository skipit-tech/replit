"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Shield, Key, Users } from "lucide-react"
import { ThemeLogo } from "@/components/theme-logo"

const navItems = [
  { href: "/school-admin", label: "Overview", icon: LayoutDashboard },
  { href: "/school-admin/content-filters", label: "Content Filters", icon: Shield },
  { href: "/school-admin/access-code", label: "Access Code", icon: Key },
  { href: "/school-admin/kids-profiles", label: "Kids Profiles", icon: Users },
]

export default function SchoolAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className="w-64 bg-card border-r border-border text-card-foreground flex flex-col"
        role="navigation"
        aria-label="School admin navigation"
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="block" aria-label="Return to SKIP IT home">
            <ThemeLogo width={120} height={40} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4" aria-label="School admin sections">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
