"use client"

import Image from "next/image"
import { useTheme } from "next-themes"

export function AppLogo() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const src = isDark
    ? "/branding/skipit-logo-light.png"   // white logo for dark mode
    : "/branding/skipit-logo-dark.png"    // blue/dark logo for light mode

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt="SKIP IT. logo"
      width={150}
      height={40}
      priority
      className="h-10 w-auto"
    />
  )
}
