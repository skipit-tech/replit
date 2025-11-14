import type { TriggerKey, OrganizationSettings, SchoolSettings, TherapistSettings, UserSettings, Movie } from "@/lib/types/settings"

export function getEffectiveHiddenTriggers(opts: {
  organization?: OrganizationSettings
  school?: SchoolSettings
  therapist?: TherapistSettings
  user?: UserSettings
}): TriggerKey[] {
  const set = new Set<TriggerKey>()

  // Organization settings take top priority (cannot be overridden)
  if (opts.organization?.enableHiddenTriggers) {
    ;(opts.organization?.hiddenTriggers ?? []).forEach((t) => set.add(t))
  }
  // School settings take second priority
  if (opts.school?.enableHiddenTriggers) {
    ;(opts.school?.hiddenTriggers ?? []).forEach((t) => set.add(t))
  }
  // Therapist settings third
  if (opts.therapist?.enableHiddenTriggers) {
    ;(opts.therapist?.hiddenTriggers ?? []).forEach((t) => set.add(t))
  }
  // User settings last
  if (opts.user?.enableHiddenTriggers) {
    ;(opts.user?.hiddenTriggers ?? []).forEach((t) => set.add(t))
  }

  return Array.from(set)
}

export function filterVisibleMovies(movies: Movie[], hiddenTriggers: TriggerKey[]): Movie[] {
  if (hiddenTriggers.length === 0) return movies

  return movies.filter((movie) => {
    if (!movie.triggers || movie.triggers.length === 0) return true
    return !movie.triggers.some((trigger) => hiddenTriggers.includes(trigger))
  })
}

export const triggerLabels: Record<TriggerKey, { label: string; description: string }> = {
  gun_violence: {
    label: "Gun Violence",
    description: "Content depicting firearms or gun-related violence",
  },
  sexual_content: {
    label: "Sexual Content",
    description: "Scenes with sexual themes or situations",
  },
  self_harm: {
    label: "Self-Harm",
    description: "Depictions or discussions of self-injury",
  },
  animal_harm: {
    label: "Animal Harm",
    description: "Violence or cruelty involving animals",
  },
  emotional_distress: {
    label: "Intense Emotional Distress",
    description: "Scenes with overwhelming emotional content",
  },
  substance_use: {
    label: "Substance Use",
    description: "Drug or alcohol use and related themes",
  },
}
