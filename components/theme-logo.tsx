"use client"

import { useTheme } from "@/hooks/use-theme"
import Image from "next/image"

interface ThemeLogoProps {
  className?: string
  width?: number
  height?: number
}

export function ThemeLogo({ className = "h-8 w-auto", width = 150, height = 40 }: ThemeLogoProps) {
  const { theme } = useTheme()

  return (
    <Image
      src={theme === "light" ? "/skipit-logo-light.png" : "/skipit-logo.png"}
      alt="SKIP IT."
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
