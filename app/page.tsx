"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/i18n/I18nProvider"
import SearchCombobox from "@/components/SearchCombobox"
import { ThemeLogo } from "@/components/theme-logo"
import { DemoDropdown } from "@/components/demo-dropdown"

import { useMemo, useRef, useState, useEffect, memo, useCallback } from "react"

const HomeIcon = () => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const UserIcon = () => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
)

const Volume2Icon = () => (
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
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)

const VolumeXIcon = () => (
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
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="22" y1="9" x2="16" y2="15" />
    <line x1="16" y1="9" x2="22" y2="15" />
  </svg>
)

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
  addedDate?: string // ISO date string
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
    backdrop: "/images/untitled-20design-20-282-29.png",
    tagline: "A TSA agent is blackmailed into letting a dangerous package slip through security.",
    link: "https://www.netflix.com/search?q=carry%20on&jbv=81476963",
    trailer: { type: "youtube", id: "KS0XacjMmOc" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Thriller", "Crime", "Action"],
    summary:
      "A young TSA agent fights to outsmart a mysterious traveler who blackmails him into letting a dangerous package slip onto a Christmas Eve flight.",
    addedDate: "2025-01-05",
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
    addedDate: "2025-01-08",
  },
  {
    id: "inside-out",
    title: "Inside Out",
    year: 2015,
    type: "movie",
    triggers: ["Depression", "Emotional Distress", "Family Conflict", "Identity Crisis"],
    provider: "Disney+",
    poster: "/movies/inside-out.jpg",
    backdrop: "/movies/inside-out.jpg",
    tagline: "Meet the little voices inside your head.",
    link: "https://www.disneyplus.com/movies/inside-out/uzQ2ycVDi2IE",
    trailer: { type: "youtube", id: "yRUAzGQ3nSY" },
    genres: ["Animation", "Family", "Comedy", "Adventure"],
    summary:
      "Growing up can be a bumpy road, and it's no exception for Riley, who is uprooted from her Midwest life when her father starts a new job in San Francisco. Riley's guiding emotions—Joy, Fear, Anger, Disgust and Sadness—live in Headquarters, the control center inside Riley's mind.",
    addedDate: "2024-09-15",
  },
  {
    id: "woman-of-the-hour",
    title: "Woman Of The Hour",
    year: 2024,
    type: "movie",
    triggers: ["Violence", "Trauma", "Strangulation", "Dismissive Behavior"],
    provider: "Netflix",
    poster: "/movies/woman-of-the-hour.jpg",
    backdrop: "/images/untitled-20design-20-283-29.png",
    tagline: "Based on the shocking true story of The Dating Game's deadliest bachelor.",
    link: "https://www.netflix.com/search?q=woman%20of%20the%20&jbv=81728818",
    trailer: { type: "youtube", id: "qeVkVI0hH0g" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Thriller", "Crime", "Drama"],
    summary:
      "The stranger-than-fiction story of an aspiring actress in 1970s Los Angeles and a serial killer in the midst of a years-long murder spree, whose lives intersect when they're cast on an episode of The Dating Game.",
    addedDate: "2024-11-15",
  },
  {
    id: "how-to-train-your-dragon",
    title: "How to Train Your Dragon",
    year: 2010,
    type: "movie",
    triggers: ["Self-Deprecation", "Reference to Violence", "Destructive Technology", "Parental Conflict"],
    provider: "Netflix",
    poster: "/movies/how-to-train-your-dragon.png",
    backdrop: "/images/untitled-20design-20-281-29.png",
    tagline: "One adventure will change two worlds.",
    link: "https://www.netflix.com/title/70117095",
    trailer: { type: "youtube", id: "oKiYuIsPxYk" },
    focalMobile: "center center",
    focalDesktop: "center center",
    genres: ["Animation", "Family", "Adventure"],
    summary:
      "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.",
    addedDate: "2024-10-20",
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
    addedDate: "2025-01-10",
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
    addedDate: "2025-01-12",
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
    backdrop: "/images/untitled-20design-20-282-29.png",
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
    backdrop: "/images/untitled-20design-20-283-29.png",
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
    backdrop: "/images/untitled-20design-20-281-29.png",
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

  useEffect(() => {
    heroSlides.forEach((slide) => {
      if (slide.backdrop && slide.backdrop !== "#000000") {
        const link = document.createElement("link")
        link.rel = "preload"
        link.as = "image"
        link.href = slide.backdrop
        document.head.appendChild(link)
      }
    })
  }, [])

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

  const newReleases = useMemo(() => {
    const now = new Date()
    const thirtyOneDaysAgo = new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000)

    return filtered.filter((m) => {
      if (!m.addedDate) return false
      const addedDate = new Date(m.addedDate)
      return addedDate >= thirtyOneDaysAgo && addedDate <= now
    })
  }, [filtered])

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
      return `https://www.youtube.com/embed/${trailer.id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${trailer.id}&enablejsapi=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&autohide=1`
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
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#0D0B3B] focus:rounded-lg focus:font-semibold focus:ring-2 focus:ring-[#4A5FBA]"
      >
        Skip to main content
      </a>

      <Header contentType={contentType} setContentType={setContentType} items={items} />

      <main id="main-content" className="max-w-6xl mx-auto px-4 pb-24 font-dm-sans">
        <section
          className="mt-6 relative overflow-hidden rounded-3xl ring-1 ring-white/10"
          aria-roledescription="carousel"
          aria-label="Featured content"
        >
          <div role="region" aria-live="polite" aria-atomic="true" className="sr-only">
            Featured: {currentSlide.title}. Slide {slide + 1} of {heroSlides.length}
          </div>

          <div className="relative">
            <div
              onClick={() => {
                handleMovieClick(currentSlide.id)
                if (currentSlide.link) {
                  window.open(currentSlide.link, "_blank", "noopener,noreferrer")
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleMovieClick(currentSlide.id)
                  if (currentSlide.link) {
                    window.open(currentSlide.link, "_blank", "noopener,noreferrer")
                  }
                }
              }}
              className="cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-white/50 rounded-3xl"
              role="button"
              tabIndex={0}
              aria-label={`${currentSlide.title} (${currentSlide.year}). ${currentSlide.tagline}. Press enter to watch on ${currentSlide.provider}.`}
            >
              {currentSlide.backdrop === "#000000" ? (
                <div className="w-full aspect-[23/9] bg-black" />
              ) : (
                <div className="relative w-full aspect-[23/9]">
                  <Image
                    src={currentSlide.backdrop || "/placeholder.svg"}
                    alt={`${currentSlide.title} backdrop`}
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                    style={{ objectPosition: objectPos }}
                  />
                </div>
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
                      style={{ pointerEvents: "none", border: "none" }}
                    />
                  ) : null}
                  <style>{`
                    iframe {
                      border: none;
                    }
                    /* Hide YouTube logo and controls overlay */
                    .ytp-chrome-top,
                    .ytp-show-cards-title,
                    .ytp-title,
                    .ytp-title-text,
                    .ytp-title-link,
                    .ytp-watermark,
                    .ytp-gradient-top,
                    .ytp-chrome-top-buttons {
                      display: none !important;
                      opacity: 0 !important;
                      pointer-events: none !important;
                    }
                  `}</style>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />
                </div>
              )}
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 bg-gradient-to-t from-[#0D0B3B] via-[#0D0B3B]/50 to-transparent z-10 pointer-events-none">
              <div
                className="max-w-2xl space-y-3 md:space-y-4 pointer-events-auto"
                onMouseEnter={() => setShowHeroTrailer(true)}
                onMouseLeave={() => setShowHeroTrailer(false)}
                onFocus={() => setShowHeroTrailer(true)}
                onBlur={() => setShowHeroTrailer(false)}
              >
                <h1 className="text-3xl md:text-5xl font-bold text-balance text-white">
                  {currentSlide.id === "how-to-train-your-dragon" ? (
                    <>
                      How to Train
                      <br />
                      Your Dragon
                    </>
                  ) : (
                    currentSlide.title
                  )}
                </h1>
                {currentSlide.tagline && (
                  <p className="text-sm md:text-base text-white/90 text-pretty">{currentSlide.tagline}</p>
                )}

                <div className="flex gap-3" role="group" aria-label="Featured content actions">
                  <button
                    onClick={playTrailer}
                    className="px-6 py-2.5 rounded-xl bg-[#d0e3ff] text-[#0D0B3B] font-semibold hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white/50 transition pointer-events-auto"
                    aria-label={`Play trailer for ${currentSlide.title}`}
                  >
                    {t("hero.play")}
                  </button>
                  <button
                    onClick={() => setOverlayMovie(currentSlide)}
                    className="px-6 py-2.5 rounded-xl border-2 border-white/90 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white transition backdrop-blur font-semibold pointer-events-auto"
                    aria-label={`View details for ${currentSlide.title}`}
                  >
                    {t("hero.details")}
                  </button>
                  {showHeroTrailer && currentSlide.trailer && (
                    <button
                      onClick={toggleHeroMute}
                      className="p-2.5 rounded-xl border-2 border-white/90 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white transition backdrop-blur pointer-events-auto"
                      aria-label={heroMuted ? "Unmute trailer" : "Mute trailer"}
                      aria-pressed={!heroMuted}
                    >
                      {heroMuted ? <VolumeXIcon /> : <Volume2Icon />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div
              className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-20"
              role="group"
              aria-label="Carousel navigation"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  heroPrev()
                }}
                className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur border border-white/20 text-white grid place-items-center transition"
                aria-label={`Previous featured title. Currently showing ${currentSlide.title}.`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  heroNext()
                }}
                className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur border border-white/20 text-white grid place-items-center transition"
                aria-label={`Next featured title. Currently showing ${currentSlide.title}.`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        <nav aria-label="Filter by streaming service" className="mt-6">
          <div className="flex flex-wrap gap-2" role="group">
            {providers.map((p) => (
              <button
                key={p}
                onClick={() => setProvider(p === "All" ? undefined : p)}
                className={`px-4 py-2 rounded-2xl border transition font-medium focus:outline-none focus:ring-2 focus:ring-[#4A5FBA]/50 ${
                  provider === p || (!provider && p === "All")
                    ? "bg-[#4A5FBA] border-[#4A5FBA] text-white hover:bg-[#3d4e9d]"
                    : "bg-white border-white/20 text-[#0D0B3B] hover:bg-[#4A5FBA] hover:border-[#4A5FBA] hover:text-white"
                }`}
                aria-pressed={provider === p || (!provider && p === "All")}
                aria-label={`${p === "All" ? "Show all streaming services" : `Filter by ${p}`}`}
              >
                {p === "All" ? t("filters.all") : p}
              </button>
            ))}
          </div>
        </nav>

        <GenreFilters items={items} genre={genre} setGenre={setGenre} />

        <div className="mt-4 text-sm text-foreground/60 italic text-center" role="status" aria-live="polite">
          You're in control. You can pause, leave, or adjust settings anytime.
        </div>

        <Rows
          filtered={filtered}
          continueWatching={continueWatching}
          newReleases={newReleases}
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
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEscape)

    closeButtonRef.current?.focus()

    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-details-title"
      aria-describedby="movie-details-description"
    >
      <div
        className="bg-white/90 text-black rounded-3xl max-w-lg w-full p-6 relative focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 text-black/60 hover:text-black focus:outline-none focus:ring-2 focus:ring-[#4A5FBA] rounded text-2xl leading-none w-8 h-8 flex items-center justify-center"
          aria-label={`Close details dialog for ${movie.title}`}
        >
          <span aria-hidden="true">✕</span>
        </button>

        <h2 id="movie-details-title" className="text-2xl font-bold mb-2 pr-8">
          {movie.title}
        </h2>

        {movie.triggers && movie.triggers.length > 0 && (
          <div className="mb-4" role="region" aria-label="Content warnings">
            <p className="text-sm font-semibold mb-2">{t("details.triggerWarnings")}</p>
            <div className="flex flex-wrap gap-2" role="list" aria-label="List of content warnings">
              {movie.triggers.map((trigger, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-black/10 border border-black/20"
                  role="listitem"
                >
                  {trigger}
                </span>
              ))}
            </div>
          </div>
        )}

        <p id="movie-details-description" className="text-base leading-relaxed">
          {movie.summary || t("details.noSummary")}
        </p>
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
    <nav aria-label="Filter by genre" className="mt-3">
      <div className="flex flex-wrap gap-2" role="group">
        {chips.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g === "All" ? undefined : g)}
            className={`px-3 py-1.5 rounded-2xl border text-sm transition font-medium focus:outline-none focus:ring-2 focus:ring-[#4A5FBA]/50 ${
              genre === g || (!genre && g === "All")
                ? "bg-[#4A5FBA] border-[#4A5FBA] text-white hover:bg-[#3d4e9d]"
                : "bg-white border-white/20 text-[#0D0B3B] hover:bg-[#4A5FBA] hover:border-[#4A5FBA] hover:text-white"
            }`}
            aria-pressed={genre === g || (!genre && g === "All")}
            aria-label={`${g === "All" ? "Show all genres" : `Filter by ${g} genre`}`}
          >
            {g === "All" ? t("filters.all") : g}
          </button>
        ))}
      </div>
    </nav>
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
    <header
      role="banner"
      className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
          onClick={() => setContentType(undefined)}
          aria-label="SKIP IT home - Return to homepage"
        >
          <ThemeLogo />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 ml-6 text-sm text-foreground/80"
        >
          <button
            onClick={() => setContentType(contentType === "movie" ? undefined : "movie")}
            className={`hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition ${contentType === "movie" ? "text-white font-semibold" : ""}`}
            aria-pressed={contentType === "movie"}
            aria-label={contentType === "movie" ? "Currently viewing movies" : "Filter to show movies only"}
          >
            {t("nav.movies")}
          </button>
          <button
            onClick={() => setContentType(contentType === "tv" ? undefined : "tv")}
            className={`hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition ${contentType === "tv" ? "text-white font-semibold" : ""}`}
            aria-pressed={contentType === "tv"}
            aria-label={contentType === "tv" ? "Currently viewing TV shows" : "Filter to show TV shows only"}
          >
            {t("nav.tvShows")}
          </button>
          <Link
            href="/hidden"
            className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition"
            aria-label="View hidden content"
          >
            {t("nav.hidden")}
          </Link>
          <Link
            href="/how-it-works"
            className="hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition"
            aria-label="Learn how SKIP IT works"
          >
            {t("nav.how")}
          </Link>
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
          <DemoDropdown />
          <Link
            href="/settings"
            className="text-foreground/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition"
            aria-label="Go to profile and settings"
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}

function Rows({
  filtered,
  continueWatching,
  newReleases,
  setOverlayMovie,
  onMovieClick,
  onHideMovie,
}: {
  filtered: Movie[]
  continueWatching: Movie[]
  newReleases: Movie[]
  setOverlayMovie: (m: Movie) => void
  onMovieClick: (id: string) => void
  onHideMovie: (id: string) => void
}) {
  const { t } = useI18n()

  return (
    <div className="mt-12 space-y-10">
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
        items={newReleases}
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

  const rowId = `row-${title.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <section aria-labelledby={rowId}>
      <div className="flex items-center justify-between mb-3">
        <h2 id={rowId} className="text-xl font-semibold">
          {title}
        </h2>
        <div className="flex gap-2" role="group" aria-label={`${title} navigation controls`}>
          <SmallArrow onClick={() => go(-1)} ariaLabel={`Scroll ${title} left`} />
          <SmallArrow right onClick={() => go(1)} ariaLabel={`Scroll ${title} right`} />
        </div>
      </div>
      <div
        ref={ref}
        className="relative overflow-x-auto scrollbar-none snap-x snap-mandatory flex gap-4 pr-2 focus-within:ring-2 focus-within:ring-white/20 rounded-lg"
        role="list"
        aria-label={`${title} content`}
      >
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

const Card = memo(function Card({
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
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setCardMuted((prev) => {
      const newMuted = !prev

      // Handle HTML5 video
      if (videoRef.current) {
        videoRef.current.muted = newMuted
      }

      // Handle YouTube iframe with postMessage API
      if (iframeRef.current?.contentWindow) {
        try {
          const command = newMuted ? "mute" : "unMute"
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: command,
              args: [],
            }),
            "*",
          )
        } catch (error) {
          console.error("[v0] Failed to toggle mute:", error)
        }
      }

      return newMuted
    })
  }, [])

  const playTrailer = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (movie.trailer) {
        const url =
          movie.trailer.type === "youtube" ? `https://www.youtube.com/watch?v=${movie.trailer.id}` : movie.trailer.src
        window.open(url, "_blank", "noopener,noreferrer")
      }
    },
    [movie.trailer],
  )

  const openDetails = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setOverlayMovie(movie)
    },
    [movie, setOverlayMovie],
  )

  const handleHide = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onHideMovie(movie.id)
    },
    [movie.id, onHideMovie],
  )

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      onMovieClick(movie.id)
      if (movie.link) {
        window.open(movie.link, "_blank", "noopener,noreferrer")
      }
    },
    [movie.id, movie.link, onMovieClick],
  )

  const handleMouseEnter = useCallback(() => {
    setHover(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHover(false)
  }, [])

  const handleCardKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        onMovieClick(movie.id)
        if (movie.link) {
          window.open(movie.link, "_blank", "noopener,noreferrer")
        }
      }
    },
    [movie.id, movie.link, onMovieClick],
  )

  const cardContent = (
    <div
      id={`card-${movie.id}`}
      className="shrink-0 w-[176px] sm:w-[184px] md:w-[196px] lg:w-[208px] xl:w-[224px] snap-start cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white/50 rounded-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="listitem"
      aria-label={`${movie.title} (${movie.year}). ${movie.triggers?.length ? `Content warnings: ${movie.triggers.join(", ")}. ` : ""}Available on ${movie.provider}. Press enter to watch.`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
        <Image
          src={posterSrc || "/placeholder.svg"}
          alt={`Movie poster for ${movie.title}`}
          fill
          sizes="(max-width: 640px) 176px, (max-width: 768px) 184px, (max-width: 1024px) 196px, (max-width: 1280px) 208px, 224px"
          className="object-cover"
          onError={() => setPosterSrc(POSTER_FALLBACK)}
          loading="lazy"
        />

        {hover && movie.trailer && (
          <div className="absolute inset-0 z-[5]">
            <HoverPreview
              trailer={movie.trailer}
              title={movie.title}
              muted={cardMuted}
              videoRef={videoRef}
              iframeRef={iframeRef}
            />
          </div>
        )}

        <div
          className="absolute left-2 top-2 text-[10px] px-2 py-1 rounded-full bg-[#0D0B3B] text-white font-medium z-10"
          role="note"
          aria-label={`Available on ${movie.provider}`}
        >
          {movie.provider}
        </div>

        <div
          className="absolute right-2 top-2 flex gap-1.5 z-10"
          role="group"
          aria-label={`Quick actions for ${movie.title}`}
        >
          {hover && movie.trailer && (
            <button
              onClick={toggleMute}
              className="w-7 h-7 rounded-full bg-[#0D0B3B] hover:bg-[#1a1654] focus:outline-none focus:ring-2 focus:ring-white/50 text-white backdrop-blur grid place-items-center transition"
              aria-label={cardMuted ? `Unmute preview for ${movie.title}` : `Mute preview for ${movie.title}`}
              aria-pressed={!cardMuted}
            >
              {cardMuted ? <VolumeXIcon /> : <Volume2Icon />}
            </button>
          )}
          <button
            onClick={handleHide}
            className="w-7 h-7 rounded-full bg-[#0D0B3B] hover:bg-[#1a1654] focus:outline-none focus:ring-2 focus:ring-white/50 text-white backdrop-blur grid place-items-center transition"
            aria-label={`Hide ${movie.title} from your feed`}
          >
            <EyeOffIcon />
          </button>
        </div>

        {hover && (
          <div
            className="absolute bottom-2 left-2 right-2 flex gap-2 z-20"
            role="group"
            aria-label={`${movie.title} actions`}
          >
            <button
              onClick={playTrailer}
              className="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg bg-[#d0e3ff] text-[#0D0B3B] hover:brightness-95 transition"
              aria-label={`Play trailer for ${movie.title}`}
            >
              {t("hero.play")}
            </button>
            <button
              onClick={openDetails}
              className="flex-1 px-2 py-1.5 text-xs font-semibold rounded-lg border-2 border-white bg-white/10 hover:bg-white/20 text-white transition backdrop-blur"
              aria-label={`View details for ${movie.title}`}
            >
              {t("hero.details")}
            </button>
          </div>
        )}
      </div>

      <div className="mt-2 h-[34px] text-xs sm:text-sm leading-tight text-foreground/90 line-clamp-2 transition-transform duration-300 group-hover:translate-y-[-2px]">
        {movie.title} <span className="text-foreground/60">({movie.year})</span>
      </div>

      {movie.triggers && movie.triggers.length > 0 && <TriggerTicker items={movie.triggers} />}
    </div>
  )

  return cardContent
})

function TriggerTicker({ items }: { items: string[] }) {
  const list = [...items, ...items]

  return (
    <div className="mt-1.5 overflow-hidden min-h-[28px] flex items-center" role="region" aria-label="Content warnings">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .trigger-marquee { animation: none !important; }
        }
      `}</style>
      <div
        className="trigger-marquee flex gap-2 whitespace-nowrap"
        style={{
          width: "200%",
          animation: "marquee 20s linear infinite",
        }}
        aria-hidden="true"
      >
        {list.map((t, i) => (
          <span
            key={i}
            className="text-[11px] text-[#0D0B3B] dark:text-white px-2 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-[#4A5FBA]/30 dark:border-white/10"
          >
            {t}
          </span>
        ))}
      </div>
      <span className="sr-only">Content warnings: {items.join(", ")}</span>
    </div>
  )
}

function HoverPreview({
  trailer,
  title,
  muted,
  videoRef,
  iframeRef,
}: {
  trailer: NonNullable<Movie["trailer"]>
  title: string
  muted: boolean
  videoRef?: React.RefObject<HTMLVideoElement>
  iframeRef?: React.RefObject<HTMLIFrameElement>
}) {
  return (
    <>
      <style>{`
        @keyframes kbZoom { 
          0% { transform: scale(1.05); } 
          100% { transform: scale(1.08); } 
        }
        @media (prefers-reduced-motion: reduce) {
          .kb-anim { animation: none !important; transform: scale(1.05); }
        }
        /* Hide YouTube UI elements */
        .ytp-chrome-top,
        .ytp-show-cards-title,
        .ytp-title,
        .ytp-title-text,
        .ytp-title-link,
        .ytp-watermark,
        .ytp-gradient-top,
        .ytp-chrome-top-buttons,
        .ytp-pause-overlay {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        {trailer.type === "mp4" ? (
          <video
            ref={videoRef}
            className="h-full w-auto mx-auto object-cover kb-anim"
            style={{ animation: "kbZoom 8s ease-in-out infinite alternate" }}
            src={trailer.src}
            autoPlay
            muted={muted}
            loop
            playsInline
          />
        ) : (
          <div className="absolute inset-0 pointer-events-none">
            <iframe
              ref={iframeRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[115%] w-[205%] kb-anim pointer-events-none"
              style={{ animation: "kbZoom 8s linear infinite", border: "none" }}
              src={`https://www.youtube.com/embed/${trailer.id}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${trailer.id}&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&autohide=1&enablejsapi=1`}
              title={`${title} trailer`}
              allow="autoplay; encrypted-media"
              aria-hidden="true"
              loading="lazy"
            />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>
    </>
  )
}

function SmallArrow({ right, onClick, ariaLabel }: { right?: boolean; onClick: () => void; ariaLabel?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel || (right ? "Scroll right" : "Scroll left")}
      className="grid place-items-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/10 transition"
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
        aria-hidden="true"
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
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border z-50 md:hidden"
    >
      <div className="max-w-md mx-auto flex justify-around py-3 text-sm text-foreground/70">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition"
          aria-label="Home"
          aria-current="page"
        >
          <HomeIcon />
          <span className="text-xs">{t("nav.home")}</span>
        </Link>
        <Link
          href="/explore"
          className="flex flex-col items-center gap-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition"
          aria-label="Explore content"
        >
          <SearchIcon />
          <span className="text-xs">{t("nav.explore")}</span>
        </Link>
        <Link
          href="/settings"
          className="flex flex-col items-center gap-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded transition"
          aria-label="Profile and settings"
        >
          <UserIcon />
          <span className="text-xs">{t("nav.profile")}</span>
        </Link>
      </div>
    </nav>
  )
}
