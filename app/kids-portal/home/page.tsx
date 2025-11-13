"use client"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const kidsProfiles = [
  { id: 1, name: "Sophia", grade: 4, avatar: "/kids/bunny-party.png" },
  { id: 2, name: "Jayden", grade: 2, avatar: "/kids/bunny-cap.png" },
  { id: 3, name: "Mia", grade: "K", avatar: "/kids/bunny-bow.png" },
  { id: 4, name: "Lucas", grade: 5, avatar: "/kids/bunny-pirate.png" },
  { id: 5, name: "Emma", grade: 3, avatar: "/kids/bunny-default.png" },
  { id: 6, name: "Noah", grade: 1, avatar: "/kids/bunny-party.png" },
]

const categories = [
  { id: 1, name: "Movies", icon: "🎬", color: "#FF6B9D" },
  { id: 2, name: "Feel-Good Stories", icon: "🧠", color: "#FFA94D" },
  { id: 3, name: "Ocean Friends", icon: "🐠", color: "#4ECDC4" },
  { id: 4, name: "Animals & Nature", icon: "🐼", color: "#95E1D3" },
  { id: 5, name: "Adventure", icon: "⭐", color: "#FFE66D" },
  { id: 6, name: "New & Popular", icon: "🍿", color: "#A8E6CF" },
]

const forYou = [
  { id: 1, title: "Inside Out", poster: "/movie-posters/inside-out.png", desc: "A colorful adventure about feelings!" },
  { id: 2, title: "Moana", poster: "/movie-posters/moana.png", desc: "A brave girl goes on an ocean adventure." },
  { id: 3, title: "Coco", poster: "/movie-posters/coco.png", desc: "A musical journey about family and memories." },
  {
    id: 4,
    title: "Ratatouille",
    poster: "/movie-posters/ratatouille.png",
    desc: "A little chef rat makes amazing food!",
  },
  { id: 5, title: "Finding Nemo", poster: "/movie-posters/nemo.png", desc: "A fish dad searches for his son." },
  {
    id: 6,
    title: "Zootopia",
    poster: "/movie-posters/zootopia.png",
    desc: "Animals work together to solve a mystery.",
  },
]

const adventure = [
  {
    id: 1,
    title: "The Lion King",
    color: "from-yellow-500 to-orange-500",
    desc: "A lion cub grows up to become king.",
  },
  { id: 2, title: "Brave", color: "from-blue-400 to-purple-400", desc: "A princess who's great with a bow and arrow." },
  { id: 3, title: "Up", color: "from-blue-400 to-pink-400", desc: "A house flies with balloons on an adventure." },
  { id: 4, title: "Big Hero 6", color: "from-red-400 to-purple-400", desc: "A boy and his robot save the city." },
  { id: 5, title: "Tarzan", color: "from-green-500 to-yellow-500", desc: "A boy raised by gorillas in the jungle." },
  { id: 6, title: "Frozen", color: "from-blue-300 to-purple-300", desc: "Two sisters and a snowman's icy adventure." },
]

const feelGoodStories = [
  {
    id: 1,
    title: "Toy Story",
    color: "from-blue-400 to-yellow-400",
    desc: "Toys come to life when you're not looking!",
  },
  { id: 2, title: "Paddington", color: "from-orange-400 to-yellow-400", desc: "A friendly bear finds a new home." },
  { id: 3, title: "Encanto", color: "from-purple-400 to-pink-400", desc: "A magical family in a special house." },
  { id: 4, title: "Luca", color: "from-teal-400 to-blue-400", desc: "Sea creatures spend a fun summer on land." },
  { id: 5, title: "Soul", color: "from-blue-500 to-purple-500", desc: "Finding what makes life special and fun." },
  { id: 6, title: "Onward", color: "from-blue-400 to-pink-400", desc: "Two elf brothers go on a magical quest." },
]

const animalsNature = [
  { id: 1, title: "Bluey", color: "from-blue-400 to-blue-300", desc: "A playful puppy and her family." },
  { id: 2, title: "Puffin Rock", color: "from-green-400 to-teal-400", desc: "A puffin explores the island." },
  { id: 3, title: "Octonauts", color: "from-blue-400 to-teal-400", desc: "Underwater animal rescue team." },
  {
    id: 4,
    title: "The Jungle Book",
    color: "from-green-500 to-yellow-500",
    desc: "A boy grows up with jungle animals.",
  },
  { id: 5, title: "Bambi", color: "from-green-400 to-brown-400", desc: "A young deer makes forest friends." },
  {
    id: 6,
    title: "Elinor Wonders Why",
    color: "from-green-400 to-blue-400",
    desc: "A curious bunny learns about nature.",
  },
]

const schoolPicks = [
  {
    id: 1,
    title: "The Magic School Bus",
    color: "from-orange-400 to-red-400",
    desc: "A class takes magical field trips!",
  },
  {
    id: 2,
    title: "Curious George",
    color: "from-yellow-400 to-brown-400",
    desc: "A curious monkey explores and learns.",
  },
  { id: 3, title: "Arthur", color: "from-yellow-400 to-orange-400", desc: "An aardvark and his friends at school." },
  { id: 4, title: "Wild Kratts", color: "from-green-400 to-blue-400", desc: "Brothers discover animal superpowers." },
  { id: 5, title: "Sesame Street", color: "from-red-400 to-yellow-400", desc: "Friends learn letters and numbers." },
  { id: 6, title: "Daniel Tiger", color: "from-red-400 to-orange-400", desc: "A tiger learns about feelings." },
]

function getAgeBand(grade: string | number): "A" | "B" | "C" | "D" {
  const g = grade === "K" ? 0 : Number.parseInt(String(grade), 10)

  if (g <= 1) return "A" // K–1
  if (g <= 3) return "B" // 2–3
  if (g <= 5) return "C" // 4–5
  return "D" // 6+
}

type BandConfig = {
  heroText: string
  tileSize: string
  titleSize: string
  maxRows: number
  showDescriptions: boolean
  categoryCount: number
}

function getBandConfig(band: "A" | "B" | "C" | "D", kidName: string): BandConfig {
  switch (band) {
    case "A": // K-1
      return {
        heroText: `Hi, ${kidName}! Tap a picture to start a show. SKIP IT. helps your shows feel good at school.`,
        tileSize: "w-52 md:w-60", // Bigger tiles
        titleSize: "text-base md:text-lg", // Bigger text
        maxRows: 2, // Only 2 rows
        showDescriptions: false,
        categoryCount: 4, // Fewer categories
      }
    case "B": // 2-3
      return {
        heroText: `Choose something to watch, ${kidName}. SKIP IT. helps your shows feel safe at school.`,
        tileSize: "w-44 md:w-52",
        titleSize: "text-sm md:text-base",
        maxRows: 3, // 3 rows
        showDescriptions: true, // Show 1-line on hover
        categoryCount: 5,
      }
    case "C": // 4-5
      return {
        heroText: `Choose something to watch. Your school uses SKIP IT. to help skip scenes that might feel like too much.`,
        tileSize: "w-44 md:w-52",
        titleSize: "text-sm md:text-base",
        maxRows: 5, // All rows
        showDescriptions: true,
        categoryCount: 6,
      }
    case "D": // 6-8
      return {
        heroText: `Your school has SKIP IT. on this device to help skip scenes that might be too much.`,
        tileSize: "w-44 md:w-52",
        titleSize: "text-sm",
        maxRows: 5, // All rows
        showDescriptions: true,
        categoryCount: 6,
      }
  }
}

export default function KidsHomePage() {
  const searchParams = useSearchParams()
  const kidId = searchParams.get("kid") || "1"
  const [selectedCategory, setSelectedCategory] = useState("Movies")

  const selectedKid = kidsProfiles.find((k) => k.id === Number.parseInt(kidId)) || kidsProfiles[0]

  const band = getAgeBand(selectedKid.grade)
  const config = getBandConfig(band, selectedKid.name)

  const visibleCategories = categories.slice(0, config.categoryCount)

  const allRows = [
    { title: "For You", data: forYou },
    { title: "Adventure", data: adventure },
    { title: "Feel-Good Stories", data: feelGoodStories },
    { title: "Animals & Nature", data: animalsNature },
    { title: "School Picks", data: schoolPicks },
  ]

  const visibleRows = allRows.slice(0, config.maxRows)

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E5F0FF] via-[#F0E5FF] to-[#E5F0FF] dark:bg-gradient-to-br dark:from-[#0A0F2C] dark:via-[#1A1640] dark:to-[#0A0F2C] transition-colors">
      <header className="px-4 md:px-8 py-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`relative ${band === "A" ? "h-24 w-24" : "h-20 w-20"} rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center animate-bounce-slow`}
          >
            <Image
              src={selectedKid.avatar || "/kids/bunny-default.png"}
              alt={`${selectedKid.name}'s bunny avatar`}
              width={band === "A" ? 80 : 64}
              height={band === "A" ? 80 : 64}
              className={band === "A" ? "h-20 w-20" : "h-16 w-16"}
            />
          </div>
          <div>
            <h1
              className={`${band === "A" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"} font-bold text-slate-900 dark:text-white`}
            >
              {band === "A" ? `Hi, ${selectedKid.name}! 👋` : `Hi, ${selectedKid.name}! 👋`}
            </h1>
            <p
              className={`${band === "A" ? "text-base md:text-lg" : "text-sm md:text-base"} text-slate-600 dark:text-slate-300 mt-1`}
            >
              {config.heroText}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-800 dark:text-green-300">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                    clipRule="evenodd"
                  />
                </svg>
                School Safe Mode is On
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/school-admin"
          className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-sm"
          aria-label="Teacher settings"
        >
          <svg
            className="h-5 w-5 text-slate-600 dark:text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </header>

      {band !== "A" && (
        <section className="px-4 md:px-8 mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all shadow-md hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B9DFC] ${
                  selectedCategory === cat.name
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white scale-105"
                    : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
                }`}
                style={{ backgroundColor: selectedCategory === cat.name ? cat.color : undefined }}
              >
                <span className="text-lg" aria-hidden="true">
                  {cat.icon}
                </span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 md:px-8 mt-6">
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-between p-6 md:p-8">
          <div className="z-10 max-w-md space-y-3">
            <h2
              className={`${band === "A" ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl"} font-bold text-white drop-shadow-lg`}
            >
              Inside Out 2
            </h2>
            <p
              className={`${band === "A" ? "text-base md:text-lg" : "text-sm md:text-base"} text-white/90 drop-shadow`}
            >
              {band === "A" ? "Fun movie about feelings!" : "Join Riley's new emotions on an amazing adventure!"}
            </p>
            <button
              className={`flex items-center gap-2 bg-white text-slate-900 ${band === "A" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"} rounded-full font-bold hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white`}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/20 to-transparent" />
        </div>
      </section>

      <div className="px-4 md:px-8 py-6 space-y-8">
        {visibleRows.map((row, idx) => (
          <section key={idx} className="space-y-3">
            <h2
              className={`${band === "A" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-bold text-slate-900 dark:text-white`}
            >
              {row.title}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {row.data.map((item) => (
                <button
                  key={item.id}
                  className={`group relative ${config.tileSize} shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC] transition-all hover:scale-105`}
                >
                  {/* Background gradient image area */}
                  {item.poster ? (
                    <div className={`${band === "A" ? "h-40 md:h-48" : "h-28 md:h-36"} relative`}>
                      <Image src={item.poster || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                      <svg
                        className="absolute inset-0 m-auto h-10 w-10 text-white/90 drop-shadow-lg z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  ) : (
                    // Fallback to gradient if no poster
                    <div
                      className={`${band === "A" ? "h-40 md:h-48" : "h-28 md:h-36"} bg-gradient-to-br ${item.color} flex items-center justify-center relative`}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <svg
                        className="h-10 w-10 text-white/90 drop-shadow-lg relative z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}

                  {/* White title bar */}
                  <div className="bg-white dark:bg-slate-800 p-3 relative z-10">
                    <p className={`${config.titleSize} font-bold text-slate-900 dark:text-white truncate`}>
                      {item.title}
                    </p>
                  </div>

                  {/* Hover overlay covering entire card */}
                  {config.showDescriptions && (
                    <div className="absolute inset-0 bg-slate-900/90 dark:bg-black/90 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 flex items-center justify-center p-4 transition-opacity duration-300 z-20 rounded-2xl">
                      <p className="text-sm md:text-base text-white leading-relaxed text-center font-medium">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
