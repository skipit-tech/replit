"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const avatarOptions = [
  { id: "default", src: "/kids/bunny-default.png", label: "Bunny" },
  { id: "bow", src: "/kids/bunny-bow.png", label: "Bunny with bow" },
  { id: "party", src: "/kids/bunny-party.png", label: "Party bunny" },
  { id: "cap", src: "/kids/bunny-cap.png", label: "Bunny with cap" },
  { id: "pirate", src: "/kids/bunny-pirate.png", label: "Pirate bunny" },
]

const defaultFilters = [
  { id: "sexual-content", label: "Sexual content", recommended: true },
  { id: "nudity", label: "Nudity", recommended: true },
  { id: "violence", label: "Violence", recommended: true },
  { id: "self-harm", label: "Self-harm", recommended: true },
  { id: "language", label: "Strong language", recommended: false },
  { id: "emotional-distress", label: "Emotional distress", recommended: false },
]

function calculateAge(birthday: string): number {
  const birthDate = new Date(birthday)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

interface KidProfile {
  id: string
  name: string
  age: number
  birthday: string // Added birthday field
  grade: string
  avatarUrl: string
  filters: Record<string, boolean>
}

export default function KidsProfilesPage() {
  const [sortBy, setSortBy] = useState<"grade" | "name" | "age">("grade")

  const [profiles, setProfiles] = useState<KidProfile[]>([
    {
      id: "1",
      name: "Sophia",
      age: 10,
      birthday: "2015-03-15",
      grade: "5",
      avatarUrl: "/kids/bunny-bow.png",
      filters: {
        "sexual-content": true,
        nudity: true,
        violence: true,
        "self-harm": true,
        language: false,
        "emotional-distress": false,
      },
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<KidProfile | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    grade: "3",
    avatarUrl: "/kids/bunny-default.png",
    filters: defaultFilters.reduce(
      (acc, filter) => {
        acc[filter.id] = filter.recommended
        return acc
      },
      {} as Record<string, boolean>,
    ),
    useRecommended: true,
  })

  const openModal = (profile?: KidProfile) => {
    if (profile) {
      setEditingProfile(profile)
      setFormData({
        name: profile.name,
        birthday: profile.birthday, // Use birthday instead of age
        grade: profile.grade,
        avatarUrl: profile.avatarUrl,
        filters: profile.filters,
        useRecommended: false,
      })
    } else {
      setEditingProfile(null)
      setFormData({
        name: "",
        birthday: "", // Empty birthday for new profiles
        grade: "3",
        avatarUrl: "/kids/bunny-default.png",
        filters: defaultFilters.reduce(
          (acc, filter) => {
            acc[filter.id] = filter.recommended
            return acc
          },
          {} as Record<string, boolean>,
        ),
        useRecommended: true,
      })
    }
    setIsModalOpen(true)
  }

  const saveProfile = () => {
    const age = formData.birthday ? calculateAge(formData.birthday) : 0

    if (editingProfile) {
      setProfiles(
        profiles.map((p) =>
          p.id === editingProfile.id
            ? {
                ...p,
                name: formData.name,
                age: age,
                birthday: formData.birthday,
                grade: formData.grade,
                avatarUrl: formData.avatarUrl,
                filters: formData.filters,
              }
            : p,
        ),
      )
    } else {
      const newProfile: KidProfile = {
        id: Date.now().toString(),
        name: formData.name,
        age: age,
        birthday: formData.birthday,
        grade: formData.grade,
        avatarUrl: formData.avatarUrl,
        filters: formData.filters,
      }
      setProfiles([...profiles, newProfile])
    }
    setIsModalOpen(false)
  }

  const toggleRecommended = (checked: boolean) => {
    setFormData({
      ...formData,
      useRecommended: checked,
      filters: checked
        ? defaultFilters.reduce(
            (acc, filter) => {
              acc[filter.id] = filter.recommended
              return acc
            },
            {} as Record<string, boolean>,
          )
        : formData.filters,
    })
  }

  const sortedProfiles = [...profiles].sort((a, b) => {
    if (sortBy === "grade") {
      const toNumber = (g: string) => (g === "K" ? 0 : Number.parseInt(g, 10))
      return toNumber(a.grade) - toNumber(b.grade)
    }
    if (sortBy === "age") return a.age - b.age
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="space-y-8">
      {/* Header with Sort Control */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#0D0B3B] dark:text-white mb-2">Kids Profiles</h1>
          <p className="text-gray-700 dark:text-gray-300">Manage child-safe profiles with age-appropriate filters.</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
            <span>Sort by</span>
            <select
              className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-1.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#6B9DFC]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "grade" | "name" | "age")}
            >
              <option value="grade">Grade (low → high)</option>
              <option value="name">Name (A–Z)</option>
              <option value="age">Age (youngest → oldest)</option>
            </select>
          </label>
          <Link href="/kids-portal/whos-watching" target="_blank">
            <Button
              variant="outline"
              className="border-[#6B9DFC] text-[#6B9DFC] hover:bg-[#6B9DFC] hover:text-white dark:border-[#6B9DFC] dark:text-[#6B9DFC] dark:hover:bg-[#6B9DFC] dark:hover:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B9DFC] focus:ring-offset-2 bg-transparent"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Kids Portal Demo
            </Button>
          </Link>
          <Button
            onClick={() => openModal()}
            className="bg-[#6B9DFC] hover:bg-[#5a8de8] dark:bg-[#6B9DFC] dark:hover:bg-[#5a8de8] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B9DFC] focus:ring-offset-2"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Kid Profile
          </Button>
        </div>
      </header>

      {/* Profiles Grid */}
      <section aria-label="Kids profiles list">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {sortedProfiles.map((profile) => {
            const activeFilters = Object.entries(profile.filters).filter(([_, enabled]) => enabled)

            return (
              <Card
                key={profile.id}
                className="p-6 bg-white dark:bg-[#1a1654] rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                role="listitem"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-[#F2F6FF] dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    <img
                      src={profile.avatarUrl || "/placeholder.svg"}
                      alt={`${profile.name}'s avatar`}
                      className="h-12 w-12"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#0D0B3B] dark:text-white mb-1">{profile.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Age {profile.age} · Grade {profile.grade}
                    </p>
                  </div>
                  <Button
                    onClick={() => openModal(profile)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 dark:text-gray-400 hover:text-[#0D0B3B] dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6B9DFC]"
                    aria-label={`Edit ${profile.name}'s profile`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map(([filterId]) => {
                      const filter = defaultFilters.find((f) => f.id === filterId)
                      return (
                        <span
                          key={filterId}
                          className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                        >
                          {filter?.label}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Add/Edit Profile Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0A0E27]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-900 dark:text-white">
              {editingProfile ? "Edit Profile" : "Add New Kid Profile"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Child's Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter child's name"
                className="mt-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <Label htmlFor="birthday" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Birthday
              </Label>
              <Input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                max={new Date().toISOString().split("T")[0]}
                className="mt-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              {formData.birthday && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Age: {calculateAge(formData.birthday)} years old
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="grade" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Grade
              </Label>
              <select
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="K">Kindergarten</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                  <option key={grade} value={grade.toString()}>
                    Grade {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                Choose an avatar
              </Label>
              <div className="flex flex-wrap gap-3">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatarUrl: avatar.src })}
                    className={cn(
                      "h-16 w-16 rounded-full border-2 flex items-center justify-center bg-[#F2F6FF] dark:bg-slate-800 transition-all",
                      avatar.src === formData.avatarUrl
                        ? "border-[#6B9DFC] ring-2 ring-[#6B9DFC] scale-110"
                        : "border-transparent hover:border-slate-300 dark:hover:border-slate-600",
                    )}
                    aria-label={avatar.label}
                  >
                    <img src={avatar.src || "/placeholder.svg"} alt={avatar.label} className="h-12 w-12" />
                  </button>
                ))}
              </div>
            </div>

            {/* Use Recommended Toggle */}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Label htmlFor="recommended" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Use Recommended Filters Based on Age
              </Label>
              <Switch id="recommended" checked={formData.useRecommended} onCheckedChange={toggleRecommended} />
            </div>

            {/* Filter Settings */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                Filter Settings
              </Label>
              <div className="space-y-3">
                {defaultFilters.map((filter) => (
                  <div
                    key={filter.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900 dark:text-gray-100">{filter.label}</span>
                      {filter.recommended && (
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                    <Switch
                      checked={formData.filters[filter.id]}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          filters: { ...formData.filters, [filter.id]: checked },
                          useRecommended: false,
                        })
                      }
                      disabled={formData.useRecommended}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={saveProfile}
              disabled={!formData.name.trim() || !formData.birthday}
              className="w-full bg-[#0A0E27] hover:bg-[#0A0E27]/90 text-white rounded-xl py-6 text-lg font-semibold disabled:opacity-50"
            >
              Save Profile
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
