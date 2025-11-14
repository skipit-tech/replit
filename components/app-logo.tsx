"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AppLogoProps {
  className?: string
}

export function AppLogo({ className }: AppLogoProps) {
  const { theme } = useTheme()

  const isDark = theme === "dark"

  const src = isDark
    ? "/branding/skipit-logo-dark.png"
    : "/branding/skipit-logo-light.png"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt="SKIP IT. logo"
        width={140}
        height={32}
        priority
        className="h-8 w-auto"
      />
    </div>
  )
}
