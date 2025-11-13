"use client"
import * as React from "react"

type SearchItem = { id: string; title: string; tags?: string[]; provider?: string }

export default function SearchCombobox({ data }: { data: SearchItem[] }) {
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState("")
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)

  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/\p{Diacritic}/gu, "")

  const stripArticles = (s: string) => s.replace(/^\s*(the|a|an)\s+/i, "")

  const list = React.useMemo(() => {
    const nq = norm(q).trim()
    if (!nq) return []

    return data
      .filter((d) => norm(stripArticles(d.title)).startsWith(nq))
      .sort((a, b) => stripArticles(a.title).length - stripArticles(b.title).length || a.title.localeCompare(b.title))
      .slice(0, 8)
  }, [q, data])

  React.useEffect(() => setActive(0), [q])

  React.useEffect(() => {
    setOpen(q.trim().length > 0 && list.length > 0)
  }, [q, list])

  function onSelect(item: SearchItem) {
    setOpen(false)
    setQ("")
    // find card and scroll
    const el = document.getElementById(`card-${item.id}`)
    if (el) {
      // scroll its row scroller horizontally and page vertically
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
      // quick highlight pulse with light blue
      el.classList.add("ring-2", "ring-[#d0e3ff]")
      setTimeout(() => el.classList.remove("ring-2", "ring-[#d0e3ff]"), 900)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) setOpen(true)
    if (!open) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, list.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = list[active]
      if (item) onSelect(item)
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <div className="relative" role="combobox" aria-expanded={open} aria-owns="search-listbox">
      <input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setOpen(q.trim().length > 0 && list.length > 0)}
        onKeyDown={onKeyDown}
        placeholder="Search movies, series…"
        aria-autocomplete="list"
        aria-controls="search-listbox"
        className="w-full bg-white dark:bg-white border border-[#4A5FBA]/30 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-[#0D0B3B] dark:text-[#0D0B3B] placeholder:text-[#0D0B3B]/60 dark:placeholder:text-[#0D0B3B]/60 outline-none focus:ring-2 focus:ring-[#d0e3ff]/50"
      />

      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0D0B3B]/60 dark:text-white/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
        />
      </svg>

      {open && list.length > 0 && (
        <ul
          id="search-listbox"
          role="listbox"
          ref={listRef}
          className="absolute z-50 mt-2 w-full rounded-xl border border-[#4A5FBA]/30 dark:border-white/10 bg-white dark:bg-[#0d0b3b] shadow-xl overflow-hidden"
        >
          {list.map((item, idx) => (
            <li
              key={item.id}
              role="option"
              aria-selected={idx === active}
              onMouseDown={(e) => e.preventDefault()} // prevent input blur before click
              onClick={() => onSelect(item)}
              className={`px-3 py-2 cursor-pointer flex items-center justify-between text-[#0D0B3B] dark:text-white ${
                idx === active ? "bg-[#4A5FBA]/10 dark:bg-white/10" : "hover:bg-[#4A5FBA]/5 dark:hover:bg-white/5"
              }`}
            >
              <span className="truncate">{item.title}</span>
              {item.provider && (
                <span className="ml-3 text-xs text-[#0D0B3B]/60 dark:text-white/60">{item.provider}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
