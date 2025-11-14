"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Play, Info, Sun, Moon, Smartphone, Monitor } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function DemoModePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [activeTrigger, setActiveTrigger] = useState<"violence" | "loud" | "animal" | null>(null)
  const [demoAction, setDemoAction] = useState<"skip" | "blur" | null>(null)

  const handleTriggerSimulation = (trigger: "violence" | "loud" | "animal") => {
    setActiveTrigger(trigger)
    setDemoAction(null)
    setTimeout(() => {
      setActiveTrigger(null)
    }, 3000)
  }

  const handleAction = (action: "skip" | "blur") => {
    setDemoAction(action)
    setTimeout(() => {
      setActiveTrigger(null)
      setDemoAction(null)
    }, 2000)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B] dark:to-[#1A1654] transition-colors">
        {/* Header */}
        <header className="bg-white/90 dark:bg-[#1a1654]/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Demo Mode</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Interactive SKIP IT. preview for demos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? "Light" : "Dark"}
              </Button>
              <Button
                onClick={() => setIsMobileView(!isMobileView)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {isMobileView ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                {isMobileView ? "Desktop" : "Mobile"}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            {/* Video Player Mock */}
            <div>
              <Card className={`overflow-hidden bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700 ${isMobileView ? 'max-w-sm mx-auto' : ''}`}>
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 dark:from-black dark:to-gray-900 relative">
                  {/* Demo Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4A5FBA] to-[#6B9DFC] opacity-20 animate-pulse" />
                  </div>

                  {/* Trigger Overlay */}
                  {activeTrigger && !demoAction && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
                      <div className="text-center space-y-6">
                        <div className="text-white space-y-3">
                          <div className="text-5xl">⚠️</div>
                          <h3 className="text-2xl font-bold">
                            {activeTrigger === "violence" && "Possible Violence"}
                            {activeTrigger === "loud" && "Possible Loud Noise"}
                            {activeTrigger === "animal" && "Possible Animal Harm"}
                          </h3>
                          <p className="text-sm opacity-80">
                            SKIP IT. detected content that may be difficult
                          </p>
                        </div>
                        <div className="flex gap-3 justify-center">
                          <Button
                            onClick={() => handleAction("skip")}
                            className="bg-[#4A5FBA] hover:bg-[#3d4e9d] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8ceb] text-white"
                          >
                            Skip Scene
                          </Button>
                          <Button
                            onClick={() => handleAction("blur")}
                            variant="outline"
                            className="border-white text-white hover:bg-white/10"
                          >
                            Blur Scene
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Feedback */}
                  {demoAction && (
                    <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
                      <div className="text-center text-white space-y-4">
                        {demoAction === "skip" && (
                          <>
                            <div className="text-6xl">⏭️</div>
                            <p className="text-xl font-semibold">Scene Skipped</p>
                          </>
                        )}
                        {demoAction === "blur" && (
                          <>
                            <div className="text-6xl">🌫️</div>
                            <p className="text-xl font-semibold">Scene Blurred</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Play Button */}
                  {!activeTrigger && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Demo Preview</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Safe simulated content for demonstration purposes
                  </p>
                </div>
              </Card>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <Card className="p-6 bg-white dark:bg-[#1a1654] border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Trigger Simulations
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleTriggerSimulation("violence")}
                    variant="outline"
                    className="w-full justify-start"
                    disabled={activeTrigger !== null}
                  >
                    Violence
                  </Button>
                  <Button
                    onClick={() => handleTriggerSimulation("loud")}
                    variant="outline"
                    className="w-full justify-start"
                    disabled={activeTrigger !== null}
                  >
                    Loud Noises
                  </Button>
                  <Button
                    onClick={() => handleTriggerSimulation("animal")}
                    variant="outline"
                    className="w-full justify-start"
                    disabled={activeTrigger !== null}
                  >
                    Animal Harm
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-[#E8F0FF] to-[#F8F4FF] dark:from-[#0D0B3B]/50 dark:to-[#1A1654]/50 border-[#4A5FBA]/20 dark:border-[#6B9DFC]/20">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Demo Tips</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                  <li>Click triggers to simulate</li>
                  <li>Toggle dark/light mode</li>
                  <li>Switch mobile/desktop view</li>
                  <li>Perfect for presentations</li>
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
