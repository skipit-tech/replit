"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from 'lucide-react'

export function DemoDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open demo views menu"
      >
        Demo Views
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#1a1654] shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <Link
            href="/demo/parent"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-xl">👨‍👩‍👧‍👦</span>
            <span className="font-medium">Parent Controls</span>
          </Link>
          <Link
            href="/demo/therapist"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-xl">🩺</span>
            <span className="font-medium">Therapist Controls</span>
          </Link>
          <Link
            href="/school-admin"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-xl">🏫</span>
            <span className="font-medium">School Admin</span>
          </Link>
        </div>
      )}
    </div>
  )
}
