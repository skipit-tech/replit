"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

type LogoProps = {
  variant?: "full" | "icon"
  size?: number
  linkTo?: string
  className?: string
}

export function Logo({ 
  variant = "full", 
  size = 28,
  linkTo = "/",
  className = ""
}: LogoProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const src = isDark
    ? "/branding/skipit-logo-light.png"   // white logo for dark mode
    : "/branding/skipit-logo-dark.png"    // blue/dark logo for light mode

  const altText = variant === "icon" 
    ? "SKIP IT logo - Return to home" 
    : "SKIP IT - Content filtering platform - Return to home"

  const logoElement = (
    <Image
      src={src || "/placeholder.svg"}
      alt={altText}
      width={variant === "full" ? size * 5 : size}
      height={size}
      className={`h-auto w-auto ${className}`}
      priority
    />
  )

  if (linkTo) {
    return (
      <Link 
        href={linkTo} 
        className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-[#4A5FBA] dark:focus:ring-[#6B9DFC] rounded"
        aria-label="Go to SKIP IT homepage"
      >
        {logoElement}
      </Link>
    )
  }

  return logoElement
}
