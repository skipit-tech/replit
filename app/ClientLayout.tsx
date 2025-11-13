"use client"
import type React from "react"
import { I18nProvider } from "@/i18n/I18nProvider"
import { ThemeProvider } from "@/hooks/use-theme"
import { useEffect, useState, Suspense } from "react"
import { usePathname } from "next/navigation"

function LoadingBar() {
  return <div className="fixed top-0 left-0 right-0 h-1 bg-[#d0e3ff] z-[100] animate-pulse" />
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {isTransitioning && <LoadingBar />}
      {children}
    </>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0B3B]">
        <div className="w-12 h-12 border-4 border-[#d0e3ff]/20 border-t-[#d0e3ff] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <I18nProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] bg-[#d0e3ff] text-[#0D0B3B] px-3 py-1 rounded"
        >
          Skip to content
        </a>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#0D0B3B]">
              <div className="w-12 h-12 border-4 border-[#d0e3ff]/20 border-t-[#d0e3ff] rounded-full animate-spin" />
            </div>
          }
        >
          <PageTransition>{children}</PageTransition>
        </Suspense>
      </I18nProvider>
    </ThemeProvider>
  )
}
