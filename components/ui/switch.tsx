"use client"

import type * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border-2 shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        // Checked state: brand blue background with white border
        "data-[state=checked]:bg-[#6B9DFC] data-[state=checked]:border-[#6B9DFC]",
        // Unchecked state: slate background with visible border
        "data-[state=unchecked]:bg-slate-300 data-[state=unchecked]:border-slate-300",
        "dark:data-[state=unchecked]:bg-slate-600 dark:data-[state=unchecked]:border-slate-600",
        // Focus state
        "focus-visible:ring-[3px] focus-visible:ring-[#6B9DFC]/50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-3.5 rounded-full transition-transform",
          "bg-white shadow-sm",
          "data-[state=checked]:translate-x-[calc(100%+2px)]",
          "data-[state=unchecked]:translate-x-0.5",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
