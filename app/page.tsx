"use client"

import type React from "react"
import { Home, Search, User, EyeOff, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/i18n/I18nProvider"
import SearchCombobox from "@/components/SearchCombobox"

import { useMemo, useRef, useState, useEffect } from "react"

type Trailer = { type: "youtube"; id: string } | { type: "mp4"; src: string }

type Movie = {
  id: string
  title: string
  year: number
  poster: string
  backdrop: string
  provider: string
  tagline?: string
  triggers?: string[]
  link?: string
  trailer?: Trailer
  trailerMp4?: string
  focal?: string
  focalMobile?: string
  focalDesktop?: string
  genres?: string[]
  summary?: string
  type: "movie" | "tv"
}

function useIsDesktop() {
  const [is, setIs] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches,
  )
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)")
    const fn = () => setIs(m.matches)
    m.addEventListener?.("change", fn)
    return () => m.removeEventListener?.("change", fn)
  }, [])
  return is
}

const realMovies: Movie[] = [
  {
    id: "carry-on",
    title: "Carry-On",
    year: 2024,
    type: "movie",
    triggers: ["Criminal Activity", "Pregnancy Discussion", "Gun Violence Reference", "Career Disappointment"],
    provider: "Netflix",
    poster: "/movies/carry-on.jpg",
    backdrop:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-DOMEq29KKXCP9E3j3C3qTSbRwpAQm0.png",
    tagline: "A TSA agent is blackmailed into letting a dangerous package slip through security.",
    link: "https://www.netflix.com/search?q=carry%20on&jbv=81476963",
    trailer: { type: "youtube", id: "KS0XacjMmOc" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Thriller", "Crime", "Action"],
    summary:
      "A young TSA agent fights to outsmart a mysterious traveler who blackmails him into letting a dangerous package slip onto a Christmas Eve flight.",
  },
  {
    id: "despicable-me-4",
    title: "Despicable Me 4",
    year: 2024,
    type: "movie",
    triggers: ["Bullying", "Weapon Display", "Death Threats", "Parental Rejection"],
    provider: "Netflix",
    poster: "/movies/despicable-me-4.jpeg",
    backdrop: "/movies/despicable-me-4.jpeg",
    tagline: "Gru and his family face their biggest threat yet.",
    link: "https://www.netflix.com/search?q=desp&jbv=81776693",
    trailer: { type: "youtube", id: "qQlr9-rF32A" },
    genres: ["Animation", "Comedy", "Family"],
    summary:
      "Gru, Lucy, Margo, Edith, and Agnes welcome a new member to the family, Gru Jr., who is intent on tormenting his dad. Gru faces a new nemesis in Maxime Le Mal and his girlfriend Valentina, and the family is forced to go on the run.",
  },
  {
    id: "woman-of-the-hour",
    title: "Woman Of The Hour",
    year: 2024,
    type: "movie",
    triggers: ["Violence", "Trauma", "Strangulation", "Dismissive Behavior"],
    provider: "Netflix",
    poster: "/movies/woman-of-the-hour.jpg",
    backdrop:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%283%29-8EGi3iGFYt25sn30GNtFer0yT9aWZ6.png",
    tagline: "Based on the shocking true story of The Dating Game's deadliest bachelor.",
    link: "https://www.netflix.com/search?q=woman%20of%20the%20&jbv=81728818",
    trailer: { type: "youtube", id: "qeVkVI0hH0g" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Thriller", "Crime", "Drama"],
    summary:
      "The stranger-than-fiction story of an aspiring actress in 1970s Los Angeles and a serial killer in the midst of a years-long murder spree, whose lives intersect when they're cast on an episode of The Dating Game.",
  },
  {
    id: "how-to-train-your-dragon",
    title: "How to Train Your Dragon",
    year: 2010,
    type: "movie",
    triggers: ["Self-Deprecation", "Reference to Violence", "Destructive Technology", "Parental Conflict"],
    provider: "Netflix",
    poster: "/movies/how-to-train-your-dragon.png",
    backdrop:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-VQuanII143hJlbIeAHya1lfx3BtPsp.png",
    tagline: "One adventure will change two worlds.",
    link: "https://www.netflix.com/title/70117095",
    trailer: { type: "youtube", id: "oKiYuIsPxYk" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Animation", "Family", "Adventure"],
    summary:
      "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.",
  },
  {
    id: "criminal-minds-s1e1",
    title: "Criminal Minds S1E1",
    year: 2005,
    type: "tv",
    triggers: ["Violence", "Abuse", "Substance Use", "SABA"],
    provider: "Paramount+",
    poster: "/movies/criminal-minds.webp",
    backdrop: "/movies/criminal-minds.webp",
    tagline: "The way to a criminal is through his mind.",
    link: "https://www.paramountplus.com/shows/criminal_minds/?searchReferral=desktop-web&source=google-organic&ftag=PPM-23-10bfh8c",
    trailer: { type: "youtube", id: "0A2CIoDwCAs" },
    genres: ["Crime", "Drama", "Thriller"],
    summary:
      "An elite team of FBI profilers analyze the country's most twisted criminal minds, anticipating their next moves before they strike again. The Behavioral Analysis Unit's most experienced agent is David Rossi.",
  },
  {
    id: "the-substitute",
    title: "The Substitute",
    year: 1996,
    type: "movie",
    triggers: ["Intimidation", "Weapons", "Gun Violence", "War Violence"],
    provider: "The CW",
    poster: "/movies/the-substitute.jpg",
    backdrop: "/movies/the-substitute.jpg",
    tagline: "Mercenary goes undercover as a substitute teacher.",
    link: "https://www.cwtv.com/shows/the-substitute/the-substitute/?play=2aab4956-f062-4eed-b014-eb88ed5bbf19&utm_source=google&utm_medium=search&utm_campaign=google_kp_watch",
    trailer: { type: "youtube", id: "bPqRpar4PyE" },
    genres: ["Action", "Thriller", "Crime"],
    summary:
      "After a botched mission in Cuba, professional mercenary Shale and his crew Joey Six, Hollan, Rem, and Wellman head home to Miami, Florida, where Shale is reunited with his fiance Jane Hetzko, who works as a teacher at Columbus High School.",
  },
]

const heroSlides: Movie[] = [
  {
    id: "carry-on",
    title: "Carry-On",
    year: 2024,
    type: "movie",
    triggers: ["Criminal Activity", "Pregnancy Discussion", "Gun Violence Reference", "Career Disappointment"],
    provider: "Netflix",
    poster: "/movies/carry-on.jpg",
    backdrop:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-DOMEq29KKXCP9E3j3C3qTSbRwpAQm0.png",
    tagline: "A TSA agent is blackmailed into letting a dangerous package slip through security.",
    link: "https://www.netflix.com/search?q=carry%20on&jbv=81476963",
    trailer: { type: "youtube", id: "KS0XacjMmOc" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Thriller", "Crime", "Action"],
    summary:
      "A young TSA agent fights to outsmart a mysterious traveler who blackmails him into letting a dangerous package slip onto a Christmas Eve flight.",
  },
  {
    id: "woman-of-the-hour",
    title: "Woman Of The Hour",
    year: 2024,
    type: "movie",
    triggers: ["Violence", "Trauma", "Strangulation", "Dismissive Behavior"],
    provider: "Netflix",
    poster: "/movies/woman-of-the-hour.jpg",
    backdrop:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%283%29-8EGi3iGFYt25sn30GNtFer0yT9aWZ6.png",
    tagline: "Based on the shocking true story of The Dating Game's deadliest bachelor.",
    link: "https://www.netflix.com/search?q=woman%20of%20the%20&jbv=81728818",
    trailer: { type: "youtube", id: "qeVkVI0hH0g" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Thriller", "Crime", "Drama"],
    summary:
      "The stranger-than-fiction story of an aspiring actress in 1970s Los Angeles and a serial killer in the midst of a years-long murder spree, whose lives intersect when they're cast on an episode of The Dating Game.",
  },
  {
    id: "how-to-train-your-dragon",
    title: "How to Train Your Dragon",
    year: 2010,
    type: "movie",
    triggers: ["Self-Deprecation", "Reference to Violence", "Destructive Technology", "Parental Conflict"],
    provider: "Netflix",
    poster: "/movies/how-to-train-your-dragon.png",
    backdrop:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-VQuanII143hJlbIeAHya1lfx3BtPsp.png",
    tagline: "One adventure will change two worlds.",
    link: "https://www.netflix.com/title/70117095",
    trailer: { type: "youtube", id: "oKiYuIsPxYk" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Animation", "Family", "Adventure"],
    summary:
      "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.",
  },
]

const providers = ["All", "Netflix", "Hulu", "Disney+", "Prime Video", "HBO Max", "Apple TV+"] as const

const POSTER_FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600'><rect width='100%' height='100%' fill='%23131a4a'/><text x='50%' y='50%' dominantBaseline='middle' textAnchor='middle' fill='white' fontSize='20'>Poster unavailable</text></svg>"

export default function Page() {
  const { t } = useI18n()
  const isDesktop = useIsDesktop()
  const [provider, setProvider] = useState<string | undefined>(undefined)
  const [genre, setGenre] = useState<string | undefined>(undefined)
  const [contentType, setContentType] = useState<"movie" | "tv" | undefined>(undefined)
  const [slide, setSlide] = useState(0)
  const [showHeroTrailer, setShowHeroTrailer] = useState(false)
  const [heroMuted, setHeroMuted] = useState(true)
  const [overlayMovie, setOverlayMovie] = useState<Movie | null>(null)
  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set())
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const heroIframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const watched = localStorage.getItem("skipit_watched")
    const hidden = localStorage.getItem("skipit_hidden")
    if (watched) setWatchedIds(new Set(JSON.parse(watched)))
    if (hidden) setHiddenIds(new Set(JSON.parse(hidden)))
  }, [])

  useEffect(() => {
    setShowHeroTrailer(false)
  }, [slide])

  const items: Movie[] = realMovies

  const filtered = useMemo(() => {
    return items.filter((m) => {
      if (hiddenIds.has(m.id)) return false
      const okProvider = !provider || m.provider === provider
      const okGenre = !genre || (m.genres?.includes(genre) ?? false)
      const okType = !contentType || m.type === contentType
      return okProvider && okGenre && okType
    })
  }, [items, provider, genre, contentType, hiddenIds])

  const continueWatching = useMemo(() => {
    return filtered.filter((m) => watchedIds.has(m.id))
  }, [filtered, watchedIds])

  const heroNext = () => setSlide((s) => (s + 1) % heroSlides.length)
  const heroPrev = () => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)

  const playTrailer = () => {
    const current = heroSlides[slide]
    if (current.trailer) {
      const url =
        current.trailer.type === "youtube"
          ? `https://www.youtube.com/watch?v=${current.trailer.id}`
          : current.trailer.src
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const toYouTubeAutoplay = (trailer: Trailer) => {
    if (trailer.type === "youtube") {
      return `https://www.youtube.com/embed/${trailer.id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${trailer.id}&enablejsapi=1`
    }
    return ""
  }

  const handleMovieClick = (movieId: string) => {
    const newWatched = new Set(watchedIds)
    newWatched.add(movieId)
    setWatchedIds(newWatched)
    localStorage.setItem("skipit_watched", JSON.stringify(Array.from(newWatched)))
  }

  const handleHideMovie = (movieId: string) => {
    const newHidden = new Set(hiddenIds)
    newHidden.add(movieId)
    setHiddenIds(newHidden)
    localStorage.setItem("skipit_hidden", JSON.stringify(Array.from(newHidden)))
  }

  const currentSlide = heroSlides[slide]
  const objectPos = isDesktop
    ? (currentSlide.focalDesktop ?? currentSlide.focal ?? "center 62%")
    : (currentSlide.focalMobile ?? currentSlide.focal ?? "center 62%")

  const toggleHeroMute = () => {
    const newMuted = !heroMuted
    setHeroMuted(newMuted)

    if (heroVideoRef.current) {
      heroVideoRef.current.muted = newMuted
    }

    if (heroIframeRef.current) {
      const command = newMuted ? "mute" : "unMute"
      heroIframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*",
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0B3B] text-white">
      <Header contentType={contentType} setContentType={setContentType} items={items} />
      <main id="main" className="max-w-6xl mx-auto px-4 pb-24 font-dm-sans">
        <section
          className="mt-6 relative overflow-hidden rounded-3xl ring-1 ring-white/10"
          aria-roledescription="carousel"
          aria-label={t("rows.trending")}
        >
          <button
            onClick={heroPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur border border-white/20 transition"
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={heroNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur border border-white/20 transition"
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div role="group" aria-live="polite" aria-atomic="true" className="relative">
            <div
              onClick={() => {
                handleMovieClick(currentSlide.id)
                if (currentSlide.link) {
                  window.open(currentSlide.link, "_blank", "noopener,noreferrer")
                }
              }}
              className="cursor-pointer relative"
            >
              {currentSlide.backdrop === "#000000" ? (
                <div className="w-full aspect-[23/9] bg-black" />
              ) : (
                <img
                  src={currentSlide.backdrop || "/placeholder.svg"}
                  alt={`${currentSlide.title} backdrop`}
                  className="w-full aspect-[23/9] object-cover"
                  style={{ objectPosition: objectPos }}
                />
              )}

              {showHeroTrailer && currentSlide.trailer && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  {currentSlide.trailerMp4 ? (
                    <video
                      ref={heroVideoRef}
                      src={currentSlide.trailerMp4}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: objectPos }}
                      autoPlay
                      muted={heroMuted}
                      loop
                      playsInline
                    />
                  ) : currentSlide.trailer?.type === "youtube" ? (
                    <iframe
                      ref={heroIframeRef}
                      key={currentSlide.id}
                      className="w-full h-full"
                      src={toYouTubeAutoplay(currentSlide.trailer)}
                      title={`${currentSlide.title} trailer`}
                      allow="autoplay; encrypted-media"
                      style={{ pointerEvents: "none" }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              )}
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none">
              <div
                className="max-w-2xl space-y-3 md:space-y-4 pointer-events-auto"
                onMouseEnter={() => setShowHeroTrailer(true)}
                onMouseLeave={() => setShowHeroTrailer(false)}
                onFocus={() => setShowHeroTrailer(true)}
                onBlur={() => setShowHeroTrailer(false)}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-balance">
                  {currentSlide.id === "how-to-train-your-dragon" ? (
                    <>
                      How to Train
                      <br />
                      Your Dragon
                    </>
                  ) : (
                    currentSlide.title
                  )}
                </h2>
                {currentSlide.tagline && (
                  <p className="text-sm md:text-base text-white/90 text-pretty">{currentSlide.tagline}</p>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={playTrailer}
                    className="px-6 py-2.5 rounded-xl bg-[#d0e3ff] text-[#0D0B3B] font-semibold hover:brightness-95 transition pointer-events-auto"
                  >
                    {t("hero.play")}
                  </button>
                  <button
                    onClick={() => setOverlayMovie(currentSlide)}
                    className="px-6 py-2.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 transition backdrop-blur font-semibold pointer-events-auto"
                  >
                    {t("hero.details")}
                  </button>
                  {showHeroTrailer && currentSlide.trailer && (
                    <button
                      onClick={toggleHeroMute}
                      className="p-2.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 transition backdrop-blur pointer-events-auto"
                      aria-label={heroMuted ? "Unmute trailer" : "Mute trailer"}
                    >
                      {heroMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-2">
          {providers.map((p) => (
            <button
              key={p}
              onClick={() => setProvider(p === "All" ? undefined : p)}
              className={`px-4 py-2 rounded-2xl border transition ${
                provider === p || (!provider && p === "All")
                  ? "bg-white/10 border-white/20"
                  : "bg-transparent border-white/10 hover:bg-white/5"
              }`}
            >
              {p === "All" ? t("filters.all") : p}
            </button>
          ))}
        </div>

        <GenreFilters items={items} genre={genre} setGenre={setGenre} />

        <Rows
          filtered={filtered}
          continueWatching={continueWatching}
          setOverlayMovie={setOverlayMovie}
          onMovieClick={handleMovieClick}
          onHideMovie={handleHideMovie}
        />
      </main>
      <BottomNav />
      {overlayMovie && <DetailsOverlay movie={overlayMovie} onClose={() => setOverlayMovie(null)} />}
    </div>
  )
}

function DetailsOverlay({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const { t } = useI18n()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="detailsTitle"
    >
      <div
        className="bg-white/90 text-black rounded-3xl max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black/60 hover:text-black text-2xl leading-none"
          aria-label={t("details.close") || "Close"}
        >
          ✕
        </button>
        <h2 id="detailsTitle" className="text-2xl font-bold mb-2">
          {movie.title}
        </h2>
        {movie.triggers && movie.triggers.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">{t("details.triggerWarnings")}</p>
            <div className="flex flex-wrap gap-2">
              {movie.triggers.map((trigger, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-black/10 border border-black/20">
                  {trigger}
                </span>
              ))}
            </div>
          </div>
        )}
        <p className="text-base leading-relaxed">{movie.summary || t("details.noSummary")}</p>
      </div>
    </div>
  )
}

function GenreFilters({
  items,
  genre,
  setGenre,
}: {
  items: Movie[]
  genre: string | undefined
  setGenre: (g: string | undefined) => void
}) {
  const { t } = useI18n()
  const allGenres = Array.from(new Set(items.flatMap((m) => m.genres ?? []))).sort()
  const chips = ["All", ...allGenres]

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((g) => (
        <button
          key={g}
          onClick={() => setGenre(g === "All" ? undefined : g)}
          className={`px-3 py-1.5 rounded-2xl border text-sm transition ${
            genre === g || (!genre && g === "All")
              ? "bg-white/10 border-white/20"
              : "bg-transparent border-white/10 hover:bg-white/5"
          }`}
        >
          {g === "All" ? t("filters.all") : g}
        </button>
      ))}
    </div>
  )
}

function Header({
  contentType,
  setContentType,
  items,
}: {
  contentType: "movie" | "tv" | undefined
  setContentType: (type: "movie" | "tv" | undefined) => void
  items: Movie[]
}) {
  const { t } = useI18n()

  return (
    <header role="banner" className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0D0B3B]/70">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setContentType(undefined)}>
          <img src="/skipit-logo.png" alt="SKIP IT." className="h-8 w-auto" />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 ml-6 text-sm text-white/80">
          <button
            onClick={() => setContentType(contentType === "movie" ? undefined : "movie")}
            className={`hover:text-white ${contentType === "movie" ? "text-white font-semibold" : ""}`}
          >
            {t("nav.movies")}
          </button>
          <button
            onClick={() => setContentType(contentType === "tv" ? undefined : "tv")}
            className={`hover:text-white ${contentType === "tv" ? "text-white font-semibold" : ""}`}
          >
            {t("nav.tvShows")}
          </button>
          <a className="hover:text-white" href="/how-it-works">
            {t("nav.how")}
          </a>
          <a className="hover:text-white" href="/hidden">
            {t("nav.hidden")}
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none md:w-[340px]">
            <SearchCombobox
              data={items.map((m) => ({
                id: m.id,
                title: m.title,
                provider: m.provider,
                tags: m.tagline ? m.tagline.split(/[.,]/).map((s) => s.trim()) : [],
              }))}
            />
          </div>
          <Link href="/settings" className="text-white/70 hover:text-white transition" aria-label="Profile">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}

function Rows({
  filtered,
  continueWatching,
  setOverlayMovie,
  onMovieClick,
  onHideMovie,
}: {
  filtered: Movie[]
  continueWatching: Movie[]
  setOverlayMovie: (m: Movie) => void
  onMovieClick: (id: string) => void
  onHideMovie: (id: string) => void
}) {
  const { t } = useI18n()

  return (
    <div className="mt-6 space-y-10">
      <Row
        title={t("rows.trending")}
        items={filtered.slice(0, 10)}
        setOverlayMovie={setOverlayMovie}
        onMovieClick={onMovieClick}
        onHideMovie={onHideMovie}
      />
      {continueWatching.length > 0 && (
        <Row
          title={t("rows.continue")}
          items={continueWatching}
          setOverlayMovie={setOverlayMovie}
          onMovieClick={onMovieClick}
          onHideMovie={onHideMovie}
        />
      )}
      <Row
        title={t("rows.new")}
        items={filtered.slice(0, 10)}
        setOverlayMovie={setOverlayMovie}
        onMovieClick={onMovieClick}
        onHideMovie={onHideMovie}
      />
    </div>
  )
}

function Row({
  title,
  items,
  setOverlayMovie,
  onMovieClick,
  onHideMovie,
}: {
  title: string
  items: Movie[]
  setOverlayMovie: (m: Movie) => void
  onMovieClick: (id: string) => void
  onHideMovie: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const go = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.9), behavior: "smooth" })

  return (
    <section aria-label={title}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex gap-2">
          <SmallArrow onClick={() => go(-1)} ariaLabel="Scroll left" />
          <SmallArrow right onClick={() => go(1)} ariaLabel="Scroll right" />
        </div>
      </div>
      <div ref={ref} className="relative overflow-x-auto scrollbar-none snap-x snap-mandatory flex gap-4 pr-2">
        {items.map((m) => (
          <Card
            key={m.id}
            movie={m}
            setOverlayMovie={setOverlayMovie}
            onMovieClick={onMovieClick}
            onHideMovie={onHideMovie}
          />
        ))}
      </div>
    </section>
  )
}

function Card({
  movie,
  setOverlayMovie,
  onMovieClick,
  onHideMovie,
}: {
  movie: Movie
  setOverlayMovie: (m: Movie) => void
  onMovieClick: (id: string) => void
  onHideMovie: (id: string) => void
}) {
  const { t } = useI18n()
  const [hover, setHover] = useState(false)
  const [cardMuted, setCardMuted] = useState(true)
  const [posterSrc, setPosterSrc] = useState(movie.poster || "/placeholder.svg")
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCardMuted(!cardMuted)
    if (videoRef.current) {
      videoRef.current.muted = !cardMuted
    }
  }

  const playTrailer = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (movie.trailer) {
      const url =
        movie.trailer.type === "youtube" ? `https://www.youtube.com/watch?v=${movie.trailer.id}` : movie.trailer.src
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const openDetails = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOverlayMovie(movie)
  }

  const handleHide = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onHideMovie(movie.id)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    onMovieClick(movie.id)
    if (movie.link) {
      window.open(movie.link, "_blank", "noopener,noreferrer")
    }
  }

  const cardContent = (
    <div
      id={`card-${movie.id}`}
      className="shrink-0 w-[176px] sm:w-[184px] md:w-[196px] lg:w-[208px] xl:w-[224px] snap-start cursor-pointer group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={handleCardClick}
      tabIndex={0}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
        <img
          src={posterSrc || "/placeholder.svg"}
          alt={movie.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            hover && movie.trailer ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
          onError={() => setPosterSrc(POSTER_FALLBACK)}
        />

        {hover && movie.trailer && (
          <HoverPreview trailer={movie.trailer} title={movie.title} muted={cardMuted} videoRef={videoRef} />
        )}

        <div className="absolute left-2 top-2 text-[10px] px-2 py-1 rounded-full bg-black/60 z-10">
          {movie.provider}
        </div>

        <div className="absolute right-2 top-2 flex gap-1.5 z-10">
          {hover && movie.trailer && (
            <button
              onClick={toggleMute}
              className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur grid place-items-center transition"
              aria-label={cardMuted ? "Unmute" : "Mute"}
            >
              {cardMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={handleHide}
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur grid place-items-center transition"
            aria-label="Hide movie"
            title="Hide / Archive"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>

        {hover && (
          <div className="absolute bottom-2 left-2 right-2 flex gap-2 z-20">
            <button
              onClick={playTrailer}
              className="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-[#d0e3ff] text-[#0D0B3B] hover:brightness-95 transition"
            >
              {t("hero.play")}
            </button>
            <button
              onClick={openDetails}
              className="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition backdrop-blur"
            >
              {t("hero.details")}
            </button>
          </div>
        )}
      </div>

      <div className="mt-2 text-xs sm:text-sm leading-tight text-white/90 line-clamp-2 transition-transform duration-300 group-hover:translate-y-[-2px]">
        {movie.title} <span className="text-white/60">({movie.year})</span>
      </div>

      {movie.triggers && movie.triggers.length > 0 && <TriggerTicker items={movie.triggers} />}
    </div>
  )

  return cardContent
}

function HoverPreview({
  trailer,
  title,
  muted,
  videoRef,
}: {
  trailer: NonNullable<Movie["trailer"]>
  title: string
  muted: boolean
  videoRef?: React.RefObject<HTMLVideoElement>
}) {
  return (
    <>
      <style>{`
        @keyframes kbZoom { 
          0% { transform: scale(1.04); } 
          100% { transform: scale(1.12); } 
        }
        @media (prefers-reduced-motion: reduce) {
          .kb-anim { animation: none !important; }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        {trailer.type === "mp4" ? (
          <video
            ref={videoRef}
            className="h-full w-auto mx-auto object-cover kb-anim"
            style={{ animation: "kbZoom 12s ease-in-out infinite alternate" }}
            src={trailer.src}
            autoPlay
            muted={muted}
            loop
            playsInline
          />
        ) : (
          <div className="absolute inset-0 pointer-events-none">
            <iframe
              key={trailer.id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[115%] w-[205%] kb-anim pointer-events-none"
              style={{ animation: "kbZoom 12s linear infinite" }}
              src={`https://www.youtube.com/embed/${trailer.id}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${trailer.id}&showinfo=0&disablekb=1&fs=0&iv_load_policy=3`}
              title={`${title} trailer`}
              allow="autoplay; encrypted-media"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>
    </>
  )
}

function TriggerTicker({ items }: { items: string[] }) {
  const list = [...items, ...items]

  return (
    <div className="mt-1 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex gap-2 whitespace-nowrap"
        style={{
          width: "200%",
          animation: "marquee 12s linear infinite",
        }}
      >
        {list.map((t, i) => (
          <span key={i} className="text-[11px] text-white/75 px-2 py-1 rounded-full bg-white/10 border border-white/10">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function SmallArrow({ right, onClick, ariaLabel }: { right?: boolean; onClick: () => void; ariaLabel?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || (right ? "Next" : "Previous")}
      className="grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={right ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
      </svg>
    </button>
  )
}

function BottomNav() {
  const { t } = useI18n()

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 bg-[#0D0B3B]/95 backdrop-blur border-t border-white/10 z-50 md:hidden"
    >
      <div className="max-w-md mx-auto flex justify-around py-3 text-sm text-white/70">
        <a href="/" className="flex flex-col items-center gap-1 hover:text-white transition" aria-label={t("nav.home")}>
          <Home className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs">{t("nav.home")}</span>
        </a>
        <a
          href="/explore"
          className="flex flex-col items-center gap-1 hover:text-white transition"
          aria-label={t("nav.explore")}
        >
          <Search className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs">{t("nav.explore")}</span>
        </a>
        <a
          href="/settings"
          className="flex flex-col items-center gap-1 hover:text-white transition"
          aria-label={t("nav.profile")}
        >
          <User className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs">{t("nav.profile")}</span>
        </a>
      </div>
    </nav>
  )
}
