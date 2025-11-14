"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { Card } from "@/components/ui/card"

type ContentWarningModalProps = {
  skills: { title: string; description: string }[]
  onClose: () => void
}

export function ContentWarningModal({ skills, onClose }: ContentWarningModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <Card className="max-w-lg w-full bg-white/95 dark:bg-[#1a1654]/95 backdrop-blur border-gray-200 dark:border-gray-700 p-8 max-h-[80vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              This moment may feel activating
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your therapist recommends these grounding techniques:
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mt-6">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200/50 dark:border-blue-800/30"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{skill.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {skill.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] text-white font-medium transition"
          >
            Continue
          </button>
        </div>
      </Card>
    </div>
  )
}
