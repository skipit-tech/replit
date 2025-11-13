"use client"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"

type Props = {
  valueSec: number // current value in seconds
  onChange: (sec: number) => void
  minSec?: number // default 1s
  maxSec?: number // default 59s
  stepSec?: number // default 1s
  size?: number // px, default 240
}

export default function CircularTimer({ valueSec, onChange, minSec = 1, maxSec = 59, stepSec = 1, size = 240 }: Props) {
  const stroke = 12 // even number to avoid subpixel blur
  const ringR = size / 2 - stroke // single radius for both ring and knob
  const center = useRef<{ x: number; y: number } | null>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  // clamp + step
  const clampStep = (v: number) => {
    const clamped = Math.max(minSec, Math.min(maxSec, v))
    const stepped = Math.round(clamped / stepSec) * stepSec
    return Math.max(minSec, Math.min(maxSec, stepped))
  }

  // value -> angle (0..360)
  const angle = useMemo(() => {
    const t = (valueSec - minSec) / (maxSec - minSec)
    return t * 360
  }, [valueSec, minSec, maxSec])

  // angle -> seconds
  const angleToSec = (a: number) => {
    const norm = ((a % 360) + 360) % 360 // 0..360
    const t = norm / 360
    return clampStep(minSec + t * (maxSec - minSec))
  }

  const format = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const getValueText = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    if (m > 0) {
      return `${m} minute${m !== 1 ? "s" : ""} ${s} second${s !== 1 ? "s" : ""}`
    }
    return `${s} second${s !== 1 ? "s" : ""}`
  }

  // handle pointer math
  const updateFromPointer = (clientX: number, clientY: number) => {
    if (!wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = clientX - cx
    const dy = clientY - cy
    // screen y is down, so angle is atan2(dy, dx) in radians, convert to deg
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI
    deg = deg + 90 // start top (12 o'clock)
    const sec = angleToSec(deg)
    onChange(sec)
  }

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      updateFromPointer(e.clientX, e.clientY)
    }
    const onUp = () => setDragging(false)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [dragging])

  // keyboard support
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault()
      onChange(clampStep(valueSec + stepSec))
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault()
      onChange(clampStep(valueSec - stepSec))
    } else if (e.key === "Home") {
      e.preventDefault()
      onChange(minSec)
    } else if (e.key === "End") {
      e.preventDefault()
      onChange(maxSec)
    }
  }

  // knob position
  const rad = ((angle - 90) * Math.PI) / 180
  const kx = size / 2 + ringR * Math.cos(rad)
  const ky = size / 2 + ringR * Math.sin(rad)

  const circumference = 2 * Math.PI * ringR
  const progress = (valueSec - minSec) / (maxSec - minSec)
  const dashoffset = circumference * (1 - progress)

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center justify-center select-none mx-auto"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* background ring */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={ringR}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={stroke}
          fill="none"
        />
        {/* progress ring (light blue) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={ringR}
          stroke="#d0e3ff"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-100"
        />
      </svg>

      {/* center label */}
      <div className="text-center">
        <div className="text-4xl font-bold">{format(valueSec)}</div>
        <div className="text-white/60 text-sm mt-1">Trigger Timer</div>
      </div>

      {/* knob */}
      <div
        role="slider"
        aria-label="Trigger timer"
        aria-valuemin={minSec}
        aria-valuemax={maxSec}
        aria-valuenow={valueSec}
        aria-valuetext={getValueText(valueSec)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute w-5 h-5 rounded-full bg-[#d0e3ff] shadow ring-2 ring-[#0D0B3B] cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4 focus:ring-[#d0e3ff]/50"
        style={{ left: kx - 10, top: ky - 10 }}
        onPointerDown={(e) => {
          ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
          setDragging(true)
          updateFromPointer(e.clientX, e.clientY)
        }}
      />

      {/* click/drag anywhere on ring */}
      <div
        className="absolute inset-0 rounded-full cursor-pointer"
        onPointerDown={(e) => {
          setDragging(true)
          updateFromPointer(e.clientX, e.clientY)
        }}
      />
    </div>
  )
}
