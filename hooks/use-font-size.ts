"use client"

import { useState, useEffect } from "react"

type FontSize = "small" | "medium" | "large" | "x-large"

const FONT_SIZE_KEY = "skipit-font-size"

const fontSizeMap: Record<FontSize, string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
  "x-large": "text-xl",
}

const fontSizeScaleMap: Record<FontSize, number> = {
  small: 0.875, // 14px
  medium: 1, // 16px
  large: 1.125, // 18px
  "x-large": 1.25, // 20px
}

export function useFontSize() {
  const [fontSize, setFontSizeState] = useState<FontSize>("medium")

  useEffect(() => {
    // Load saved font size from localStorage
    const saved = localStorage.getItem(FONT_SIZE_KEY)
    if (saved && (saved === "small" || saved === "medium" || saved === "large" || saved === "x-large")) {
      setFontSizeState(saved as FontSize)
      applyFontSize(saved as FontSize)
    }
  }, [])

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size)
    localStorage.setItem(FONT_SIZE_KEY, size)
    applyFontSize(size)
  }

  const applyFontSize = (size: FontSize) => {
    // Apply font size scale to the document root
    const scale = fontSizeScaleMap[size]
    document.documentElement.style.fontSize = `${scale * 16}px`
  }

  return {
    fontSize,
    setFontSize,
    fontSizeClass: fontSizeMap[fontSize],
  }
}
