"use client"
import { useSearchParams } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import type { TriggerKey } from "@/lib/types/settings"
import { filterVisibleMovies, getEffectiveHiddenTriggers } from "@/lib/utils/hidden-triggers"

const kidsProfiles = [
  { id: 1, name: "Sophia", grade: 4, avatar: "/kids/bunny-party.png" },
  { id: 2, name: "Jayden", grade: 2, avatar: "/kids/bunny-cap.png" },
  { id: 3, name: "Mia", grade: "K", avatar: "/kids/bunny-bow.png" },
  { id: 4, name: "Lucas", grade: 5, avatar: "/kids/bunny-pirate.png" },
  { id: 5, name: "Emma", grade: 3, avatar: "/kids/bunny-default.png" },
  { id: 6, name: "Noah", grade: 1, avatar: "/kids/bunny-party.png" },
]

type CategoryId =
  | "movies"
  | "feel-good"
  | "ocean-friends"
  | "animals-nature"
  | "adventure"
  | "new-popular"

type Movie = {
  id: number
  title: string
  poster?: string
  color?: string
  desc: string
  tags: CategoryId[]
}

const categories = [
  { id: "movies" as CategoryId, name: "Movies", icon: "🎬", color: "#FF6B9D" },
  { id: "feel-good" as CategoryId, name: "Feel-Good Stories", icon: "🧠", color: "#FFA94D" },
  { id: "ocean-friends" as CategoryId, name: "Ocean Friends", icon: "🐠", color: "#4ECDC4" },
  { id: "animals-nature" as CategoryId, name: "Animals & Nature", icon: "🐼", color: "#95E1D3" },
  { id: "adventure" as CategoryId, name: "Adventure", icon: "⭐", color: "#FFE66D" },
  { id: "new-popular" as CategoryId, name: "New & Popular", icon: "🍿", color: "#A8E6CF" },
]

const allMovies: Movie[] = [
  { id: 1, title: "Inside Out", poster: "/movie-posters/inside-out.png", desc: "A colorful adventure about feelings!", tags: ["movies", "feel-good", "new-popular"] },
  { id: 2, title: "Moana", poster: "/movie-posters/moana.png", desc: "A brave girl goes on an ocean adventure.", tags: ["movies", "ocean-friends", "adventure", "new-popular"] },
  { id: 3, title: "Coco", poster: "/movie-posters/coco.png", desc: "A musical journey about family and memories.", tags: ["movies", "feel-good", "new-popular"] },
  { id: 4, title: "Ratatouille", poster: "/movie-posters/ratatouille.png", desc: "A little chef rat makes amazing food!", tags: ["movies", "animals-nature"] },
  { id: 5, title: "Finding Nemo", poster: "/movie-posters/nemo.png", desc: "A fish dad searches for his son.", tags: ["movies", "ocean-friends", "adventure"] },
  { id: 6, title: "Zootopia", poster: "/movie-posters/zootopia.png", desc: "Animals work together to solve a mystery.", tags: ["movies", "animals-nature", "adventure"] },
  { id: 7, title: "The Lion King", poster: "/movie-posters/lion-king.png", desc: "A lion cub grows up to become king.", tags: ["movies", "adventure", "animals-nature"] },
  { id: 8, title: "Brave", poster: "/movie-posters/brave.png", desc: "A princess who's great with a bow and arrow.", tags: ["movies", "adventure"] },
  { id: 9, title: "Up", poster: "/movie-posters/up.png", desc: "A house flies with balloons on an adventure.", tags: ["movies", "adventure", "feel-good"] },
  { id: 10, title: "Big Hero 6", poster: "/movie-posters/big-hero-6.png", desc: "A boy and his robot save the city.", tags: ["movies", "adventure", "feel-good"] },
  { id: 11, title: "Tarzan", poster: "/movie-posters/tarzan.png", desc: "A boy raised by gorillas in the jungle.", tags: ["movies", "adventure", "animals-nature"] },
  { id: 12, title: "Frozen", poster: "/movie-posters/frozen.png", desc: "Two sisters and a snowman's icy adventure.", tags: ["movies", "adventure", "feel-good", "new-popular"] },
  { id: 13, title: "Soul", poster: "/movie-posters/soul.png", desc: "A musician finds his spark in life.", tags: ["movies", "feel-good", "new-popular"] },
  { id: 14, title: "Paddington", poster: "/movie-posters/paddington.png", desc: "A kind bear finds a loving family.", tags: ["movies", "animals-nature"] },
  { id: 15, title: "Toy Story", poster: "/movie-posters/toy-story.png", desc: "Toys come to life when you're away.", tags: ["movies", "feel-good", "adventure"] },
  { id: 16, title: "Encanto", poster: "/movie-posters/encanto.png", desc: "A magical family in Colombia.", tags: ["movies", "feel-good", "new-popular"] },
  { id: 17, title: "Onward", poster: "/movie-posters/onward.png", desc: "Two brothers go on a magical quest.", tags: ["movies", "feel-good", "adventure"] },
  { id: 18, title: "Luca", poster: "/movie-posters/luca.png", desc: "Two sea monsters become best friends.", tags: ["movies", "feel-good", "ocean-friends", "new-popular"] },
  { id: 19, title: "Bluey", color: "from-blue-400 to-blue-300", desc: "A playful puppy and her family.", tags: ["movies", "animals-nature", "feel-good"] },
  { id: 20, title: "Puffin Rock", poster: "/kids-shows/elinor-wonders-why.png", desc: "A puffin explores the island.", tags: ["movies", "animals-nature", "ocean-friends"] },
  { id: 21, title: "Octonauts", poster: "/kids-shows/octonauts.png", desc: "Underwater animal rescue team.", tags: ["movies", "ocean-friends", "animals-nature", "adventure"] },
  { id: 22, title: "The Jungle Book", poster: "/kids-shows/jungle-book.png", desc: "A boy grows up with jungle animals.", tags: ["movies", "animals-nature", "adventure"] },
  { id: 23, title: "Bambi", poster: "/kids-shows/bambi.png", desc: "A young deer makes forest friends.", tags: ["movies", "animals-nature"] },
  { id: 24, title: "Elinor Wonders Why", color: "from-green-400 to-blue-400", desc: "A curious bunny learns about nature.", tags: ["movies", "animals-nature"] },
  { id: 25, title: "The Magic School Bus", color: "from-orange-400 to-red-400", desc: "A class takes magical field trips!", tags: ["movies", "adventure"] },
  { id: 26, title: "Curious George", poster: "/kids-shows/curious-george.png", desc: "A curious monkey explores and learns.", tags: ["movies", "animals-nature"] },
  { id: 27, title: "Arthur", color: "from-yellow-400 to-orange-400", desc: "An aardvark and his friends at school.", tags: ["movies", "feel-good"] },
  { id: 28, title: "Wild Kratts", poster: "/kids-shows/wild-kratts.png", desc: "Brothers discover animal superpowers.", tags: ["movies", "animals-nature", "adventure"] },
  { id: 29, title: "Sesame Street", color: "from-red-400 to-yellow-400", desc: "Friends learn letters and numbers.", tags: ["movies", "feel-good"] },
  { id: 30, title: "Daniel Tiger", poster: "/kids-shows/daniel-tiger.png", desc: "A tiger learns about feelings.", tags: ["movies", "feel-good", "animals-nature"] },
]

const forYou = [
  { id: 1, title: "Inside Out", poster: "/movie-posters/inside-out.png", desc: "A colorful adventure about feelings!", tags: ["movies", "feel-good", "new-popular"] },
  { id: 2, title: "Moana", poster: "/movie-posters/moana.png", desc: "A brave girl goes on an ocean adventure.", tags: ["movies", "ocean-friends", "adventure", "new-popular"] },
  { id: 3, title: "Coco", poster: "/movie-posters/coco.png", desc: "A musical journey about family and memories.", tags: ["movies", "feel-good", "new-popular"] },
  { id: 4, title: "Ratatouille", poster: "/movie-posters/ratatouille.png", desc: "A little chef rat makes amazing food!", tags: ["movies", "animals-nature"] },
  { id: 5, title: "Finding Nemo", poster: "/movie-posters/nemo.png", desc: "A fish dad searches for his son.", tags: ["movies", "ocean-friends", "adventure"] },
  { id: 6, title: "Zootopia", poster: "/movie-posters/zootopia.png", desc: "Animals work together to solve a mystery.", tags: ["movies", "animals-nature", "adventure"] },
]

const adventure = [
  { id: 7, title: "The Lion King", poster: "/movie-posters/lion-king.png", desc: "A lion cub grows up to become king.", tags: ["movies", "adventure", "animals-nature"] },
  { id: 8, title: "Brave", poster: "/movie-posters/brave.png", desc: "A princess who's great with a bow and arrow.", tags: ["movies", "adventure"] },
  { id: 9, title: "Up", poster: "/movie-posters/up.png", desc: "A house flies with balloons on an adventure.", tags: ["movies", "adventure", "feel-good"] },
  { id: 10, title: "Big Hero 6", poster: "/movie-posters/big-hero-6.png", desc: "A boy and his robot save the city.", tags: ["movies", "adventure", "feel-good"] },
  { id: 11, title: "Tarzan", poster: "/movie-posters/tarzan.png", desc: "A boy raised by gorillas in the jungle.", tags: ["movies", "adventure", "animals-nature"] },
  { id: 12, title: "Frozen", poster: "/movie-posters/frozen.png", desc: "Two sisters and a snowman's icy adventure.", tags: ["movies", "adventure", "feel-good", "new-popular"] },
]

const feelGoodStories = [
  { id: 13, title: "Soul", poster: "/movie-posters/soul.png", desc: "A musician finds his spark in life.", tags: ["movies", "feel-good", "new-popular"] },
  { id: 14, title: "Paddington", poster: "/movie-posters/paddington.png", desc: "A kind bear finds a loving family.", tags: ["movies", "animals-nature"] },
  { id: 15, title: "Toy Story", poster: "/movie-posters/toy-story.png", desc: "Toys come to life when you're away.", tags: ["movies", "feel-good", "adventure"] },
  { id: 16, title: "Encanto", poster: "/movie-posters/encanto.png", desc: "A magical family in Colombia.", tags: ["movies", "feel-good", "new-popular"] },
  { id: 17, title: "Onward", poster: "/movie-posters/onward.png", desc: "Two brothers go on a magical quest.", tags: ["movies", "feel-good", "adventure"] },
  { id: 18, title: "Luca", poster: "/movie-posters/luca.png", desc: "Two sea monsters become best friends.", tags: ["movies", "feel-good", "ocean-friends", "new-popular"] },
]

const animalsNature = [
  { id: 19, title: "Bluey", color: "from-blue-400 to-blue-300", desc: "A playful puppy and her family.", tags: ["movies", "animals-nature", "feel-good"] },
  { id: 20, title: "Puffin Rock", poster: "/kids-shows/elinor-wonders-why.png", desc: "A puffin explores the island.", tags: ["movies", "animals-nature", "ocean-friends"] },
  { id: 21, title: "Octonauts", poster: "/kids-shows/octonauts.png", desc: "Underwater animal rescue team.", tags: ["movies", "ocean-friends", "animals-nature", "adventure"] },
  { id: 22, title: "The Jungle Book", poster: "/kids-shows/jungle-book.png", desc: "A boy grows up with jungle animals.", tags: ["movies", "animals-nature", "adventure"] },
  { id: 23, title: "Bambi", poster: "/kids-shows/bambi.png", desc: "A young deer makes forest friends.", tags: ["movies", "animals-nature"] },
  { id: 24, title: "Elinor Wonders Why", color: "from-green-400 to-blue-400", desc: "A curious bunny learns about nature.", tags: ["movies", "animals-nature"] },
]

const schoolPicks = [
  { id: 25, title: "The Magic School Bus", color: "from-orange-400 to-red-400", desc: "A class takes magical field trips!", tags: ["movies", "adventure"] },
  { id: 26, title: "Curious George", poster: "/kids-shows/curious-george.png", desc: "A curious monkey explores and learns.", tags: ["movies", "animals-nature"] },
  { id: 27, title: "Arthur", color: "from-yellow-400 to-orange-400", desc: "An aardvark and his friends at school.", tags: ["movies", "feel-good"] },
  { id: 28, title: "Wild Kratts", poster: "/kids-shows/wild-kratts.png", desc: "Brothers discover animal superpowers.", tags: ["movies", "animals-nature", "adventure"] },
  { id: 29, title: "Sesame Street", color: "from-red-400 to-yellow-400", desc: "Friends learn letters and numbers.", tags: ["movies", "feel-good"] },
  { id: 30, title: "Daniel Tiger", poster: "/kids-shows/daniel-tiger.png", desc: "A tiger learns about feelings.", tags: ["movies", "feel-good", "animals-nature"] },
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
  const [activeFilter, setActiveFilter] = useState<CategoryId>("movies")

  const selectedKid = kidsProfiles.find((k) => k.id === Number.parseInt(kidId)) || kidsProfiles[0]

  const band = getAgeBand(selectedKid.grade)
  const config = getBandConfig(band, selectedKid.name)

  const visibleCategories = categories.slice(0, config.categoryCount)

  const schoolSettings = { hiddenTriggers: [] as TriggerKey[] }
  const therapistSettings = { hiddenTriggers: [] as TriggerKey[] }
  const userSettings = { hiddenTriggers: [] as TriggerKey[] }

  const effectiveHiddenTriggers = getEffectiveHiddenTriggers({
    school: schoolSettings,
    therapist: therapistSettings,
    user: userSettings,
  })

  const filteredByCategory = useMemo(
    () =>
      activeFilter === "movies"
        ? allMovies
        : allMovies.filter((movie) => movie.tags.includes(activeFilter)),
    [activeFilter]
  )

  const visibleMovies = useMemo(
    () => filterVisibleMovies(filteredByCategory, effectiveHiddenTriggers),
    [filteredByCategory, effectiveHiddenTriggers]
  )

  const heroMovie = visibleMovies[0] ?? allMovies[0]

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
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
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
                type="button"
                role="tab"
                aria-pressed={activeFilter === cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all shadow-md hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B9DFC] ${
                  activeFilter === cat.id
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white scale-105"
                    : "bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
                }`}
                style={{ backgroundColor: activeFilter === cat.id ? cat.color : undefined }}
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
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-between p-6 md:p-8">
          {heroMovie.poster ? (
            <Image 
              src={heroMovie.poster || "/placeholder.svg"} 
              alt={heroMovie.title} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${heroMovie.color}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          <div className="relative z-10 max-w-md space-y-3">
            <h2
              className={`${band === "A" ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl"} font-bold text-white drop-shadow-lg`}
            >
              {heroMovie.title}
            </h2>
            <p
              className={`${band === "A" ? "text-base md:text-lg" : "text-sm md:text-base"} text-white/90 drop-shadow`}
            >
              {heroMovie.desc}
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
        </div>
      </section>

      <div className="px-4 md:px-8 py-6 space-y-8">
        <section className="space-y-3">
          <h2
            className={`${band === "A" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} font-bold text-slate-900 dark:text-white`}
          >
            {activeFilter === "movies" ? "For You" : categories.find(c => c.id === activeFilter)?.name}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {visibleMovies.slice(1).map((item) => (
              <button
                key={item.id}
                className={`group relative ${config.tileSize} shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC] transition-all hover:scale-105`}
              >
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

                <div className="bg-white dark:bg-slate-800 p-3 relative z-10">
                  <p className={`${config.titleSize} font-bold text-slate-900 dark:text-white truncate`}>
                    {item.title}
                  </p>
                </div>

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
      </div>
    </main>
  )
}
