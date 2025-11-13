"use client"

import { useState } from "react"
import { Home, Search, User, ChevronDown, LogOut } from "lucide-react"
import CircularTimer from "@/components/circular-timer"
import { useI18n } from "@/i18n/I18nProvider"
import type { Locale } from "@/i18n/translations"
import Link from "next/link"

type Tab = "trigger" | "plans" | "data"
type Plan = "starter" | "single" | "family" | "org"

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n()

  const [tab, setTab] = useState<Tab>("trigger")
  const [selectedPlan, setSelectedPlan] = useState<Plan>("family")
  const [isSignedIn, setIsSignedIn] = useState(true) // TODO: Replace with actual Firebase auth state
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

  return (
    <div className="min-h-screen bg-[#0D0B3B] text-white pb-20">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0D0B3B]/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/skipit-logo.png" alt="SKIP IT." className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            {isSignedIn && (
              <>
                <button
                  onClick={() => {
                    // TODO: Add Firebase logout functionality here
                    console.log("Logout clicked")
                    setIsSignedIn(false)
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
                <div className="text-sm text-right hidden md:block">
                  <div className="text-white">Jane Doe</div>
                  <div className="text-white/60 text-xs">Premium</div>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center">
                  <User className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[320px_1fr] gap-6">
          {/* Profile Sidebar */}
          <aside className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-6 text-[#0D0B3B] h-fit shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-white/50">
                <img src="/placeholder-user.jpg" alt="Jane Doe" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold">JANE DOE</h2>
              <p className="text-sm text-black/60 mt-1">Premium</p>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{t("settings.contact")}</h3>
                  <button className="text-black/60 hover:text-black">
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
                <p className="text-sm text-black/70">{t("settings.phone")}: (000)-000-000</p>
                <p className="text-sm text-black/70">{t("settings.email")}: janedoe@hello.com</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">{t("settings.language")}</h3>
                <div className="relative">
                  <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value as Locale)}
                    className="w-full bg-white rounded-lg px-3 py-2 text-sm appearance-none cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="hi">हिन्दी</option>
                    <option value="zh">中文</option>
                    <option value="ar">العربية</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{t("settings.theme")}</h3>
                    <p className="text-sm text-black/60">{t("settings.darkMode")}</p>
                  </div>
                  <button className="relative w-12 h-6 bg-blue-500 rounded-full transition">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div>
            <h1 className="text-4xl font-bold mb-6">{t("settings.title")}</h1>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-white/20 mb-8">
              <button
                onClick={() => setTab("trigger")}
                className={`pb-3 font-semibold transition ${
                  tab === "trigger" ? "border-b-2 border-white" : "text-white/60 hover:text-white"
                }`}
              >
                {t("settings.triggersTab")}
              </button>
              <button
                onClick={() => setTab("plans")}
                className={`pb-3 font-semibold transition ${
                  tab === "plans" ? "border-b-2 border-white" : "text-white/60 hover:text-white"
                }`}
              >
                {t("settings.plansTab")}
              </button>
              <button
                onClick={() => setTab("data")}
                className={`pb-3 font-semibold transition ${
                  tab === "data" ? "border-b-2 border-white" : "text-white/60 hover:text-white"
                }`}
              >
                {t("settings.dataTab")}
              </button>
            </div>

            {/* Trigger Settings Tab */}
            {tab === "trigger" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t("settings.triggersSelected")}</h2>
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
                        className="flex items-center gap-3 cursor-pointer group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition shadow-md hover:shadow-lg"
                      >
                        <input
                          type="checkbox"
                          checked={triggers[key as keyof typeof triggers]}
                          onChange={(e) => setTriggers({ ...triggers, [key]: e.target.checked })}
                          className="w-5 h-5 rounded border-2 border-white/30 bg-transparent checked:bg-[#d0e3ff] checked:border-[#d0e3ff] cursor-pointer"
                        />
                        <span className="group-hover:text-white/90">{label}</span>
                      </label>
                    ))}
                  </div>
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
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 shadow-md hover:shadow-lg transition"
                      >
                        <span className="font-medium">{label}</span>
                        <button
                          onClick={() => setToggles({ ...toggles, [key]: !toggles[key as keyof typeof toggles] })}
                          className={`relative w-12 h-6 rounded-full transition ${
                            toggles[key as keyof typeof toggles] ? "bg-blue-500" : "bg-white/20"
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
                    <h3 className="text-xl font-semibold mb-4">{t("settings.adjustTriggerTimer")}</h3>
                    <div className="flex flex-col items-center gap-4">
                      <CircularTimer valueSec={timerSeconds} onChange={setTimerSeconds} size={240} />
                      <p className="text-white/60 text-sm text-center max-w-xs">{t("settings.timerHelp")}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Plans & Billing Tab */}
            {tab === "plans" && (
              <div className="space-y-8">
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
                          selectedPlan === key
                            ? "border-[#d0e3ff] bg-[#d0e3ff]/5"
                            : "border-white/20 hover:border-white/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === key}
                          onChange={() => setSelectedPlan(key as Plan)}
                          className="mt-1 w-5 h-5 accent-[#d0e3ff]"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{name}</div>
                          <div className="text-sm text-white/60 mt-1">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">{t("settings.cardDetails")}</h2>
                  <p className="text-white/60 text-sm">{t("settings.updateCard")}</p>
                </div>
              </div>
            )}

            {/* Data Tab */}
            {tab === "data" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">{t("settings.dataPrivacy")}</h2>
                <p className="text-white/70">{t("settings.dataPrivacyDesc")}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0B3B]/95 backdrop-blur border-t border-white/10 z-50 md:hidden">
        <div className="max-w-md mx-auto flex justify-around py-3 text-sm text-white/70">
          <a href="/" className="flex flex-col items-center gap-1 hover:text-white transition">
            <Home className="w-5 h-5" />
            <span className="text-xs">{t("nav.home")}</span>
          </a>
          <a href="/explore" className="flex flex-col items-center gap-1 hover:text-white transition">
            <Search className="w-5 h-5" />
            <span className="text-xs">{t("nav.explore")}</span>
          </a>
          <a href="/settings" className="flex flex-col items-center gap-1 text-[#d0e3ff] transition">
            <User className="w-5 h-5" />
            <span className="text-xs">{t("nav.profile")}</span>
          </a>
        </div>
      </nav>
    </div>
  )
}
