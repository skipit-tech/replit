export type TriggerKey =
  | "gun_violence"
  | "sexual_content"
  | "self_harm"
  | "animal_harm"
  | "emotional_distress"
  | "substance_use"

export type OrganizationSettings = {
  orgId: string // Required unique identifier
  name?: string
  enableHiddenTriggers?: boolean
  hiddenTriggers?: TriggerKey[]
}

export type SchoolSettings = {
  schoolName?: string
  filteringEnabled?: boolean
  enableHiddenTriggers?: boolean
  hiddenTriggers?: TriggerKey[]
}

export type TherapistSettings = {
  clientId?: string
  protectionLevel?: "high" | "moderate" | "exposure"
  enableHiddenTriggers?: boolean
  hiddenTriggers?: TriggerKey[]
}

export type UserSettings = {
  userId?: string
  parentalControlsEnabled?: boolean
  enableHiddenTriggers?: boolean
  hiddenTriggers?: TriggerKey[]
}

export type Movie = {
  id: number
  title: string
  poster?: string
  color?: string
  desc: string
  tags: string[]
  triggers?: TriggerKey[]
}

export type UserRole =
  | "parent"
  | "child"
  | "teen"
  | "teacher"
  | "admin"
  | "therapist"
  | "patient"
  | "general"
  | "creator"
  | "organization_admin"
