"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, RefreshCw } from "lucide-react"

export default function AccessCodePage() {
  const [accessCode, setAccessCode] = useState("BHS-98274")
  const [copied, setCopied] = useState(false)

  const generateNewCode = () => {
    const prefix = "BHS"
    const randomNum = Math.floor(10000 + Math.random() * 90000)
    setAccessCode(`${prefix}-${randomNum}`)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Student Access Code</h1>
        <p className="text-white/80">
          Students enter this code once in the SKIP IT extension. After that, your school's rules apply automatically.
        </p>
      </div>

      {/* Access Code Card */}
      <Card className="p-8 bg-white rounded-2xl shadow-sm">
        <div className="max-w-md mx-auto space-y-8">
          {/* Code Display */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Current Access Code</p>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 mb-4">
                <div className="text-5xl font-bold text-gray-900 tracking-wider font-mono">{accessCode}</div>
              </div>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                size="sm"
              >
                <Copy className="w-4 h-4" />
              </Button>
              {copied && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded">
                  Copied!
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">How to use:</h3>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>Share this code with your students</li>
              <li>Students enter it once in the SKIP IT extension</li>
              <li>Your school's content filters apply automatically</li>
            </ol>
          </div>

          {/* Generate New Code Button */}
          <Button
            onClick={generateNewCode}
            variant="outline"
            className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl py-6 text-lg font-semibold bg-transparent"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Generate New Code
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Generating a new code will invalidate the previous code for new installations.
          </p>
        </div>
      </Card>
    </div>
  )
}
