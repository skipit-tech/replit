"use client"

import { useState, useEffect } from "react"
import { Home, Search, User, Eye } from "lucide-react"

type Movie = {
  id: string
  title: string
  year: number
  poster: string
  provider: string
}

const realMovies = [
  {
    id: "carry-on",
    title: "Carry-On",
    year: 2024,
    provider: "Netflix",
    poster: "/movies/carry-on.jpg",
  },
  {
    id: "despicable-me-4",
    title: "Despicable Me 4",
    year: 2024,
    provider: "Netflix",
    poster: "/movies/despicable-me-4.jpeg",
  },
  {
    id: "woman-of-the-hour",
    title: "Woman Of The Hour",
    year: 2024,
    provider: "Netflix",
    poster: "/movies/woman-of-the-hour.jpg",
  },
  {
    id: "the-menu",
    title: "The Menu",
    year: 2022,
    provider: "Hulu",
    poster: "/movies/the-menu.jpg",
  },
  {
    id: "hereditary",
    title: "Hereditary",
    year: 2018,
    provider: "Hulu",
    poster: "/movies/hereditary.jpg",
  },
  {
    id: "it",
    title: "It",
    year: 2017,
    provider: "Hulu",
    poster: "/movies/it.jpg",
  },
  {
    id: "inside-out",
    title: "Inside Out",
    year: 2015,
    provider: "Disney+",
    poster: "/movies/inside-out.jpg",
  },
  {
    id: "the-babadook",
    title: "The Babadook",
    year: 2014,
    provider: "Hulu",
    poster: "/movies/the-babadook.jpg",
  },
  {
    id: "whiplash",
    title: "Whiplash",
    year: 2014,
    provider: "Tubi",
    poster: "/movies/whiplash.jpg",
  },
  {
    id: "how-to-train-your-dragon",
    title: "How to Train Your Dragon",
    year: 2010,
    provider: "Netflix",
    poster: "/movies/how-to-train-your-dragon.png",
  },
  {
    id: "criminal-minds-s1e1",
    title: "Criminal Minds S1E1",
    year: 2005,
    provider: "Paramount+",
    poster: "/movies/criminal-minds.webp",
  },
  {
    id: "the-substitute",
    title: "The Substitute",
    year: 1996,
    provider: "The CW",
    poster: "/movies/the-substitute.jpg",
  },
]

export default function HiddenPage() {
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const hidden = localStorage.getItem("skipit_hidden")
    if (hidden) setHiddenIds(new Set(JSON.parse(hidden)))
  }, [])

  const hiddenMovies = realMovies.filter((m) => hiddenIds.has(m.id))

  const handleUnhide = (movieId: string) => {
    const newHidden = new Set(hiddenIds)
    newHidden.delete(movieId)
    setHiddenIds(newHidden)
    localStorage.setItem("skipit_hidden", JSON.stringify(Array.from(newHidden)))
  }

  return (
    <div className="min-h-screen bg-[#0D0B3B] text-white pb-24">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Hidden Movies & Shows</h1>

        {hiddenMovies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No hidden content yet.</p>
            <a href="/" className="text-[#d0e3ff] hover:underline mt-2 inline-block">
              Browse movies
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {hiddenMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <div className="aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleUnhide(movie.id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur grid place-items-center transition"
                  aria-label="Unhide movie"
                  title="Unhide"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <div className="mt-2 text-sm leading-tight">
                  {movie.title} <span className="text-white/60">({movie.year})</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0D0B3B]/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <a href="/">
            <img src="/skipit-logo.png" alt="SKIP IT." className="h-8 w-auto" />
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6 ml-6 text-sm text-white/80">
          <a className="hover:text-white" href="/">
            Movies
          </a>
          <a className="hover:text-white" href="/">
            TV Shows
          </a>
          <a className="hover:text-white" href="/hidden">
            Hidden
          </a>
          <a className="hover:text-white text-white" href="/how-it-works">
            How it Works
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none md:w-[340px]">
            <div className="relative">
              <input
                placeholder="Search movies, series…"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#d0e3ff]/50"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                />
              </svg>
            </div>
          </div>

          {!isSignedIn ? (
            <>
              <a href="/signin" className="hidden md:block px-4 py-2 text-sm text-white/80 hover:text-white transition">
                Sign In
              </a>
              <a
                href="/signup"
                className="hidden md:block px-4 py-2 text-sm bg-[#6B9DFC] hover:bg-[#5A8DE8] text-white rounded-lg transition"
              >
                Sign Up
              </a>
            </>
          ) : null}

          <a href="/settings" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6B9DFC] to-[#4A7DD8] flex items-center justify-center ring-2 ring-white/10 hover:ring-white/20 transition">
              <User className="w-5 h-5 text-white" />
            </div>
          </a>
        </div>
      </div>
    </header>
  )
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0B3B]/95 backdrop-blur border-t border-white/10 z-50 md:hidden">
      <div className="max-w-md mx-auto flex justify-around py-3 text-sm text-white/70">
        <a href="/" className="flex flex-col items-center gap-1 hover:text-white transition">
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </a>
        <a href="/explore" className="flex flex-col items-center gap-1 hover:text-white transition">
          <Search className="w-5 h-5" />
          <span className="text-xs">Explore</span>
        </a>
        <a href="/settings" className="flex flex-col items-center gap-1 hover:text-white transition">
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </a>
      </div>
    </nav>
  )
}
