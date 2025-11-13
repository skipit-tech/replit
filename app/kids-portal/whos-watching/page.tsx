"use client"
import Image from "next/image"
import Link from "next/link"

const kidsProfiles = [
  { id: 1, name: "Sophia", grade: 4, avatar: "/kids/bunny-party.png" },
  { id: 2, name: "Jayden", grade: 2, avatar: "/kids/bunny-cap.png" },
  { id: 3, name: "Mia", grade: "K", avatar: "/kids/bunny-bow.png" },
  { id: 4, name: "Lucas", grade: 5, avatar: "/kids/bunny-pirate.png" },
  { id: 5, name: "Emma", grade: 3, avatar: "/kids/bunny-default.png" },
  { id: 6, name: "Noah", grade: 1, avatar: "/kids/bunny-party.png" },
]

export default function WhosWatchingPage() {
  return (
    <div className="min-h-screen bg-[#E5F0FF] text-slate-900 dark:bg-[#050821] dark:text-white transition-colors">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <Image
            src="/logos/skipit-dark.svg"
            alt="SKIP IT. logo"
            width={100}
            height={32}
            className="block dark:hidden"
          />
          <Image
            src="/logos/skipit-light.svg"
            alt="SKIP IT. logo"
            width={100}
            height={32}
            className="hidden dark:block"
          />
        </div>
        <Link
          href="/school-admin"
          className="text-sm text-slate-600 dark:text-slate-300 hover:text-[#6B9DFC] dark:hover:text-[#8BB3FF] transition-colors"
        >
          Back to teacher dashboard
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Who's watching?</h1>
          <p className="text-lg text-slate-600 dark:text-slate-200">
            Choose your bunny so we can use the right filters for you.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {kidsProfiles.map((kid) => (
            <Link
              key={kid.id}
              href={`/kids-portal/home?kid=${kid.id}`}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B9DFC] transition-all"
              aria-label={`Select ${kid.name}, Grade ${kid.grade}`}
            >
              <div className="h-20 w-20 rounded-full bg-[#F2F6FF] dark:bg-slate-900 flex items-center justify-center">
                <Image
                  src={kid.avatar || "/placeholder.svg"}
                  alt={`${kid.name}'s bunny avatar`}
                  width={56}
                  height={56}
                  className="h-14 w-14"
                />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-slate-900 dark:text-white">{kid.name}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Grade {kid.grade}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
