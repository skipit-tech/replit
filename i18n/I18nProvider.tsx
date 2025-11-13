"use client"
import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { translations, type Locale } from "./translations"

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: (key: string) => string }

const I18nCtx = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale
    if (
      saved &&
      (saved === "en" || saved === "es" || saved === "fr" || saved === "hi" || saved === "zh" || saved === "ar")
    ) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem("locale", l)
    document.documentElement.lang = l
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const dict = translations[locale]

  const t = (path: string) => {
    const parts = path.split(".")
    let cur: any = dict
    for (const p of parts) cur = cur?.[p]
    return (typeof cur === "string" ? cur : path) as string
  }

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, dict])

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

export function useI18nShell() {
  if (typeof window === "undefined") {
    return { locale: "en" as Locale, dir: "ltr" as "ltr" | "rtl" }
  }
  const locale = (localStorage.getItem("locale") || "en") as Locale
  const dir = locale === "ar" ? "rtl" : "ltr"
  return { locale, dir }
}
