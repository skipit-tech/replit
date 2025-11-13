"use client"
import type React from "react"
import { I18nProvider, useI18nShell } from "@/i18n/I18nProvider"
import { useEffect, useState } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { locale, dir } = useI18nShell()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang={mounted ? locale : "en"} dir={mounted ? dir : "ltr"}>
      <head>
        <title>My App</title>
      </head>
      <body className="font-dm-sans bg-[#0D0B3B] text-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] bg-white text-[#0D0B3B] px-3 py-1 rounded"
        >
          Skip to content
        </a>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
