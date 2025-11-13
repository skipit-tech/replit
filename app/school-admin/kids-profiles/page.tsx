"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, User, Users, Baby, Heart, Star, Smile } from "lucide-react"

const avatarIcons = [
  { id: "user", icon: User, color: "bg-blue-100 text-blue-600" },
  { id: "users", icon: Users, color: "bg-purple-100 text-purple-600" },
  { id: "baby", icon: Baby, color: "bg-pink-100 text-pink-600" },
  { id: "heart", icon: Heart, color: "bg-red-100 text-red-600" },
  { id: "star", icon: Star, color: "bg-yellow-100 text-yellow-600" },
  { id: "smile", icon: Smile, color: "bg-green-100 text-green-600" },
]

const defaultFilters = [
  { id: "sexual-content", label: "Sexual content", recommended: true },
  { id: "nudity", label: "Nudity", recommended: true },
  { id: "violence", label: "Violence", recommended: true },
  { id: "self-harm", label: "Self-harm", recommended: true },
  { id: "language", label: "Strong language", recommended: false },
  { id: "emotional-distress", label: "Emotional distress", recommended: false },
]

interface KidProfile {
  id: string
  name: string
  age: number
  avatar: string
  filters: Record<string, boolean>
}

export default function KidsProfilesPage() {
  const [profiles, setProfiles] = useState<KidProfile[]>([
    {
      id: "1",
      name: "Sophia",
      age: 10,
      avatar: "heart",
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
    age: 8,
    avatar: "user",
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
        age: profile.age,
        avatar: profile.avatar,
        filters: profile.filters,
        useRecommended: false,
      })
    } else {
      setEditingProfile(null)
      setFormData({
        name: "",
        age: 8,
        avatar: "user",
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
    if (editingProfile) {
      setProfiles(
        profiles.map((p) =>
          p.id === editingProfile.id
            ? { ...p, name: formData.name, age: formData.age, avatar: formData.avatar, filters: formData.filters }
            : p,
        ),
      )
    } else {
      const newProfile: KidProfile = {
        id: Date.now().toString(),
        name: formData.name,
        age: formData.age,
        avatar: formData.avatar,
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Kids Profiles</h1>
          <p className="text-white/80">Manage child-safe profiles with age-appropriate filters.</p>
        </div>
        <Button onClick={() => openModal()} className="bg-[#0A0E27] hover:bg-[#0A0E27]/90 text-white rounded-xl">
          <Plus className="w-5 h-5 mr-2" />
          Add New Kid Profile
        </Button>
      </div>

      {/* Profiles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => {
          const avatarConfig = avatarIcons.find((a) => a.id === profile.avatar) || avatarIcons[0]
          const AvatarIcon = avatarConfig.icon
          const activeFilters = Object.entries(profile.filters).filter(([_, enabled]) => enabled)

          return (
            <Card key={profile.id} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 ${avatarConfig.color} rounded-full flex items-center justify-center`}>
                  <AvatarIcon className="w-8 h-8" />
                </div>
                <Button
                  onClick={() => openModal(profile)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{profile.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Age {profile.age}</p>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map(([filterId]) => {
                    const filter = defaultFilters.find((f) => f.id === filterId)
                    return (
                      <span key={filterId} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
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

      {/* Add/Edit Profile Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{editingProfile ? "Edit Profile" : "Add New Kid Profile"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                Child's Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter child's name"
                className="mt-2"
              />
            </div>

            {/* Age */}
            <div>
              <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                Age
              </Label>
              <select
                id="age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) })}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 13 }, (_, i) => i + 5).map((age) => (
                  <option key={age} value={age}>
                    {age} years old
                  </option>
                ))}
              </select>
            </div>

            {/* Avatar */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Profile Avatar</Label>
              <div className="grid grid-cols-6 gap-3">
                {avatarIcons.map((avatar) => {
                  const Icon = avatar.icon
                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: avatar.id })}
                      className={`w-full aspect-square ${avatar.color} rounded-xl flex items-center justify-center transition-transform hover:scale-110 ${
                        formData.avatar === avatar.id ? "ring-2 ring-offset-2 ring-blue-500" : ""
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Use Recommended Toggle */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <Label htmlFor="recommended" className="text-sm font-semibold text-gray-700">
                Use Recommended Filters Based on Age
              </Label>
              <Switch id="recommended" checked={formData.useRecommended} onCheckedChange={toggleRecommended} />
            </div>

            {/* Filter Settings */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">Filter Settings</Label>
              <div className="space-y-3">
                {defaultFilters.map((filter) => (
                  <div key={filter.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900">{filter.label}</span>
                      {filter.recommended && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Recommended</span>
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

            {/* Save Button */}
            <Button
              onClick={saveProfile}
              disabled={!formData.name.trim()}
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
