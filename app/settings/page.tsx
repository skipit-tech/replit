"use client"

import type React from "react"
import { useState, useCallback, memo, useEffect } from "react"
import { Home, Search, User, ChevronDown, LogOut, Mail, Sun, Moon } from "lucide-react"
import CircularTimer from "@/components/circular-timer"
import { useI18n } from "@/i18n/I18nProvider"
import type { Locale } from "@/i18n/translations"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useTheme } from "@/hooks/use-theme"
import { ThemeLogo } from "@/components/theme-logo"
import { ProfileEditor } from "@/components/ProfileEditor"
import { onAuthChange, getUserProfile, type UserProfile } from "@/lib/firebase/auth"

const ActivityDashboard = dynamic(() => import("@/components/ActivityDashboard"), {
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-[#d0e3ff]/20 border-t-[#d0e3ff] rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
})

type Tab = "trigger" | "plans" | "data"
type Plan = "starter" | "single" | "family" | "org"

const ProfileSidebar = memo(function ProfileSidebar({
  locale,
  setLocale,
  theme,
  toggleTheme,
  onContactClick,
  userProfile,
  onEditProfile,
}: {
  locale: string
  setLocale: (locale: Locale) => void
  theme: string
  toggleTheme: () => void
  onContactClick: () => void
  userProfile: UserProfile | null
  onEditProfile: () => void
}) {
  const { t } = useI18n()

  return (
    <aside
      aria-label="Profile information"
      className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-[#0D0B3B] dark:to-[#1a1654] rounded-3xl p-6 h-fit shadow-lg"
    >
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-blue-400/30">
          <img
            src={userProfile?.photoURL || "/placeholder-user.jpg"}
            alt="Profile picture of Jane Doe"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{userProfile?.displayName || "JANE DOE"}</h2>
        <p className="text-sm text-slate-600 dark:text-blue-200 mt-1">Premium</p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900 dark:text-white">{t("settings.contact")}</h3>
            <button
              onClick={onEditProfile}
              className="text-slate-600 dark:text-blue-200 hover:text-slate-900 dark:hover:text-white"
              aria-label="Edit contact information"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-700 dark:text-blue-100">
            {t("settings.phone")}: {userProfile?.phoneNumber || "(000)-000-000"}
          </p>
          <p className="text-sm text-slate-700 dark:text-blue-100">
            {t("settings.email")}: {userProfile?.email || "janedoe@hello.com"}
          </p>
        </div>

        <div>
          <label htmlFor="language-select" className="block font-semibold mb-2 text-slate-900 dark:text-white">
            {t("settings.language")}
          </label>
          <div className="relative">
            <select
              id="language-select"
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-sm appearance-none cursor-pointer border border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="zh">中文 (Chinese)</option>
              <option value="tl">Tagalog</option>
              <option value="vi">Tiếng Việt (Vietnamese)</option>
              <option value="ar">العربية (Arabic)</option>
              <option value="ko">한국어 (Korean)</option>
              <option value="fr">Français</option>
              <option value="ru">Русский (Russian)</option>
              <option value="pt">Português (Portuguese)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-600 dark:text-blue-200"
              aria-hidden="true"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t("settings.theme")}</h3>
              <p className="text-sm text-slate-600 dark:text-blue-200 mt-1" id="theme-status">
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Sun
                className={`w-5 h-5 ${theme === "light" ? "text-slate-900" : "text-slate-400 dark:text-blue-300"}`}
                aria-hidden="true"
              />
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  theme === "dark" ? "bg-blue-600" : "bg-slate-300"
                }`}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                aria-pressed={theme === "dark"}
                role="switch"
                aria-describedby="theme-status"
              >
                <span
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all shadow-md ${
                    theme === "dark" ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
              <Moon
                className={`w-5 h-5 ${theme === "dark" ? "text-slate-900 dark:text-white" : "text-slate-400"}`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-300 dark:border-slate-600">
          <button
            onClick={onContactClick}
            className="w-full py-3 px-4 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </button>
          <p className="text-xs text-slate-600 dark:text-blue-200 text-center mt-2">We're here if you need help.</p>
        </div>
      </div>
    </aside>
  )
})

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [tab, setTab] = useState<Tab>("data")
  const [selectedPlan, setSelectedPlan] = useState<Plan>("family")
  const [showContactModal, setShowContactModal] = useState(false)
  const [showProfileEditor, setShowProfileEditor] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "janedoe@hello.com",
    message: "",
  })

  const [triggers, setTriggers] = useState({
    abuse: false,
    violence: false,
    mentalIllness: false,
    substanceAbuse: false,
    illnessInjury: false,
    discrimination: false,
  })
  const [toggles, setToggles] = useState({
    turnOn: true,
    instantSkip: false,
    skipSummary: true,
  })
  const [timerSeconds, setTimerSeconds] = useState(30)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [pendingPlan, setPendingPlan] = useState<Plan | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid)
        setUserProfile(profile)
        setContactForm((prev) => ({ ...prev, email: profile?.email || prev.email }))
      } else {
        setUserProfile(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleContactSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "info@skipit.tech",
            from: contactForm.email,
            name: contactForm.name,
            message: contactForm.message,
          }),
        })

        if (response.ok) {
          console.log("[v0] Contact form sent successfully to info@skipit.tech")
          setShowContactModal(false)
          setContactForm((prev) => ({ ...prev, name: "", message: "" }))
        } else {
          console.error("[v0] Failed to send contact form")
        }
      } catch (error) {
        console.error("[v0] Error sending contact form:", error)
      }
    },
    [contactForm],
  )

  const handlePlanChange = useCallback((plan: Plan) => {
    setSelectedPlan((current) => {
      if (plan !== current) {
        setPendingPlan(plan)
        setShowUpgradeModal(true)
        return current
      }
      return current
    })
  }, [])

  const confirmPlanUpgrade = useCallback(() => {
    if (pendingPlan) {
      setSelectedPlan(pendingPlan)
      setShowUpgradeModal(false)
      setPendingPlan(null)
    }
  }, [pendingPlan])

  const cancelPlanUpgrade = useCallback(() => {
    setShowUpgradeModal(false)
    setPendingPlan(null)
  }, [])

  const handleLogout = useCallback(() => {
    console.log("Logout clicked")
    setIsSignedIn(false)
  }, [])

  const handleContactClick = useCallback(() => {
    setShowContactModal(true)
  }, [])

  const handleEditProfile = useCallback(() => {
    setShowProfileEditor(true)
  }, [])

  const handleSaveProfile = useCallback((updatedProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => (prev ? { ...prev, ...updatedProfile } : null))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header
        role="banner"
        className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ThemeLogo />
          </Link>
          <div className="flex items-center gap-3">
            {isSignedIn && (
              <>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
                <div className="text-sm text-right hidden md:block">
                  <div className="text-foreground">{userProfile?.displayName || "Jane Doe"}</div>
                  <div className="text-muted-foreground text-xs">Premium</div>
                </div>
                <button className="w-10 h-10 rounded-full bg-muted hover:bg-accent grid place-items-center">
                  <User className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main role="main" id="main" className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[320px_1fr] gap-6">
          {/* Profile Sidebar */}
          <ProfileSidebar
            locale={locale}
            setLocale={setLocale}
            theme={theme}
            toggleTheme={toggleTheme}
            onContactClick={handleContactClick}
            userProfile={userProfile}
            onEditProfile={handleEditProfile}
          />

          {/* Main Content */}
          <section
            className="flex-1 px-10 py-8 bg-[#E5F0FF] text-slate-900 dark:bg-[#050821] dark:text-white transition-colors rounded-3xl"
            aria-label="Settings content"
          >
            <h1 className="text-4xl font-semibold text-slate-900 dark:text-white mb-6">{t("settings.title")}</h1>

            <nav
              className="mt-4 mb-6 flex gap-8 border-b border-slate-200 dark:border-slate-700"
              role="tablist"
              aria-label="Settings sections"
            >
              <button
                onClick={() => setTab("trigger")}
                role="tab"
                aria-selected={tab === "trigger"}
                aria-controls="trigger-panel"
                id="trigger-tab"
                className={`pb-3 text-sm ${
                  tab === "trigger" ? "font-semibold" : "font-medium"
                } border-b-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC] ${
                  tab === "trigger"
                    ? "text-slate-900 dark:text-white border-[#6B9DFC]"
                    : "text-slate-700 dark:text-slate-100 border-transparent hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t("settings.triggersTab")}
              </button>
              <button
                onClick={() => setTab("plans")}
                role="tab"
                aria-selected={tab === "plans"}
                aria-controls="plans-panel"
                id="plans-tab"
                className={`pb-3 text-sm ${
                  tab === "plans" ? "font-semibold" : "font-medium"
                } border-b-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC] ${
                  tab === "plans"
                    ? "text-slate-900 dark:text-white border-[#6B9DFC]"
                    : "text-slate-700 dark:text-slate-100 border-transparent hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t("settings.plansTab")}
              </button>
              <button
                onClick={() => setTab("data")}
                role="tab"
                aria-selected={tab === "data"}
                aria-controls="data-panel"
                id="data-tab"
                className={`pb-3 text-sm ${
                  tab === "data" ? "font-semibold" : "font-medium"
                } border-b-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC] ${
                  tab === "data"
                    ? "text-slate-900 dark:text-white border-[#6B9DFC]"
                    : "text-slate-700 dark:text-slate-100 border-transparent hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t("settings.dataTab")}
              </button>
            </nav>

            {/* Trigger Settings Tab */}
            {tab === "trigger" && (
              <div role="tabpanel" id="trigger-panel" aria-labelledby="trigger-tab" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t("settings.triggersSelected")}</h2>
                  <fieldset className="p-6 rounded-2xl border-2 border-accent/30 bg-accent/5">
                    <legend className="sr-only">Select content triggers to filter</legend>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { key: "abuse", label: t("settings.categories.Abuse") },
                        { key: "violence", label: t("settings.categories.Violence") },
                        { key: "mentalIllness", label: t("settings.categories.Mental Illness") },
                        { key: "substanceAbuse", label: t("settings.categories.Substance Abuse") },
                        { key: "illnessInjury", label: t("settings.categories.Illness/Injury") },
                        { key: "discrimination", label: t("settings.categories.Discrimination") },
                      ].map(({ key, label }) => (
                        <label
                          key={key}
                          className="flex items-center gap-3 cursor-pointer group p-4 rounded-xl bg-muted/50 hover:bg-muted transition shadow-md hover:shadow-lg"
                        >
                          <input
                            type="checkbox"
                            checked={triggers[key as keyof typeof triggers]}
                            onChange={(e) => setTriggers({ ...triggers, [key]: e.target.checked })}
                            className="w-5 h-5 rounded border-2 border-border bg-transparent checked:bg-accent checked:border-accent cursor-pointer"
                            aria-label={`Filter ${label} content`}
                          />
                          <span className="group-hover:text-foreground/90">{label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {[
                      { key: "turnOn", label: t("settings.toggles.onoff") },
                      { key: "instantSkip", label: t("settings.toggles.instant") },
                      { key: "skipSummary", label: t("settings.toggles.summary") },
                    ].map(({ key, label }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50 shadow-md hover:shadow-lg transition"
                      >
                        <span className="font-medium">{label}</span>
                        <button
                          onClick={() => setToggles({ ...toggles, [key]: !toggles[key as keyof typeof toggles] })}
                          className={`relative w-12 h-6 rounded-full transition ${
                            toggles[key as keyof typeof toggles] ? "bg-blue-500" : "bg-muted"
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                              toggles[key as keyof typeof toggles] ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Adjust Trigger Timer</h3>
                    <div className="flex flex-col items-center gap-4">
                      <CircularTimer valueSec={timerSeconds} onChange={setTimerSeconds} size={240} />
                      <p className="text-xs text-slate-600 dark:text-slate-300 text-center max-w-xs mt-4">
                        Drag the knob to adjust skip duration. Use arrow keys for precise control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Plans & Billing Tab */}
            {tab === "plans" && (
              <div role="tabpanel" id="plans-panel" aria-labelledby="plans-tab" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t("settings.plans")}</h2>
                  <div className="space-y-3">
                    {[
                      {
                        key: "starter",
                        name: t("settings.planNames.starter"),
                        desc: t("settings.planNames.starterDesc"),
                      },
                      { key: "single", name: t("settings.planNames.single"), desc: t("settings.planNames.singleDesc") },
                      { key: "family", name: t("settings.planNames.family"), desc: t("settings.planNames.familyDesc") },
                      { key: "org", name: t("settings.planNames.org"), desc: t("settings.planNames.orgDesc") },
                    ].map(({ key, name, desc }) => (
                      <label
                        key={key}
                        className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition shadow-md hover:shadow-lg ${
                          selectedPlan === key ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === key}
                          onChange={() => handlePlanChange(key as Plan)}
                          className="mt-1 w-5 h-5 accent-accent"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{name}</div>
                          <div className="text-sm text-muted-foreground mt-1">{desc}</div>
                          {key === "org" && selectedPlan === "org" && (
                            <div className="mt-4 space-y-2">
                              <Link href="/school-admin">
                                <button className="w-full py-3 px-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl transition shadow-md hover:shadow-lg">
                                  Request SKIP IT for Your Organization
                                </button>
                              </Link>
                              <Link href="/school-admin">
                                <button className="w-full py-2 text-sm text-accent hover:text-accent/80 transition underline">
                                  Already an organization? Sign in
                                </button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">{t("settings.cardDetails")}</h2>
                  <p className="text-muted-foreground text-sm">{t("settings.updateCard")}</p>
                </div>
              </div>
            )}

            {/* Data Tab - Only render ActivityDashboard when tab is active */}
            {tab === "data" && (
              <div role="tabpanel" id="data-panel" aria-labelledby="data-tab">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  {t("settings.dataPrivacy")}
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-200 mb-8">{t("settings.dataPrivacyDesc")}</p>
                <ActivityDashboard />
              </div>
            )}
          </section>
        </div>
      </main>

      {showUpgradeModal && pendingPlan && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Confirm Plan Change</h2>
              <button onClick={cancelPlanUpgrade} className="text-muted-foreground hover:text-foreground transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-muted-foreground mb-6">
              Are you sure you want to upgrade your membership to{" "}
              <span className="font-semibold text-foreground">{t(`settings.planNames.${pendingPlan}`)}</span>?
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelPlanUpgrade}
                className="flex-1 py-3 px-4 bg-muted hover:bg-muted/80 text-foreground font-semibold rounded-xl transition shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmPlanUpgrade}
                className="flex-1 py-3 px-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl transition shadow-md hover:shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showContactModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 id="contact-modal-title" className="text-2xl font-bold text-slate-900">
                Contact Support
              </h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-slate-600 hover:text-slate-900 transition"
                aria-label="Close contact support dialog"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-semibold mb-2 text-slate-900">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-900 border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold mb-2 text-slate-900">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-900 border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold mb-2 text-slate-900">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-900 border border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                  required
                  aria-required="true"
                />
              </div>

              <p className="text-xs text-slate-600 text-center" aria-live="polite">
                We typically respond within 24 hours.
              </p>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#4A5FBA] hover:bg-[#3d4f9f] text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ProfileEditor Modal */}
      {showProfileEditor && userProfile && (
        <ProfileEditor profile={userProfile} onClose={() => setShowProfileEditor(false)} onSave={handleSaveProfile} />
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border z-50 md:hidden">
        <div className="max-w-md mx-auto flex justify-around py-3 text-sm text-muted-foreground">
          <a href="/" className="flex flex-col items-center gap-1 hover:text-foreground transition">
            <Home className="w-5 h-5" />
            <span className="text-xs">{t("nav.home")}</span>
          </a>
          <a href="/explore" className="flex flex-col items-center gap-1 hover:text-foreground transition">
            <Search className="w-5 h-5" />
            <span className="text-xs">{t("nav.explore")}</span>
          </a>
          <a href="/settings" className="flex flex-col items-center gap-1 text-accent transition">
            <User className="w-5 h-5" />
            <span className="text-xs">{t("nav.profile")}</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
