"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Camera, X } from "lucide-react"
import { uploadProfilePhoto } from "@/lib/firebase/storage"
import { updateUserProfile, type UserProfile } from "@/lib/firebase/auth"
import { isFirebaseConfigured } from "@/lib/firebase/client"

interface ProfileEditorProps {
  profile: UserProfile
  onClose: () => void
  onSave: (updatedProfile: Partial<UserProfile>) => void
}

export function ProfileEditor({ profile, onClose, onSave }: ProfileEditorProps) {
  const [displayName, setDisplayName] = useState(profile.displayName)
  const [email, setEmail] = useState(profile.email)
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber)
  const [photoURL, setPhotoURL] = useState(profile.photoURL)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    setUploading(true)

    try {
      const downloadURL = await uploadProfilePhoto(profile.uid, file)
      setPhotoURL(downloadURL)
      if (!isFirebaseConfigured) {
        console.log("[ProfileEditor] Firebase not configured. Photo preview only (not saved to cloud).")
      }
    } catch (error) {
      console.error("[v0] Error uploading photo:", error)
      alert("Failed to upload photo. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updates: Partial<UserProfile> = {
        displayName,
        email,
        phoneNumber,
        photoURL,
      }

      await updateUserProfile(profile.uid, updates)
      onSave(updates)
      if (!isFirebaseConfigured) {
        console.log("[ProfileEditor] Firebase not configured. Changes saved locally only.")
      }
      onClose()
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-editor-title"
    >
      <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-[#0D0B3B] dark:to-[#1a1654] rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 id="profile-editor-title" className="text-2xl font-bold text-slate-900 dark:text-white">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="text-slate-600 dark:text-blue-200 hover:text-slate-900 dark:hover:text-white transition"
            aria-label="Close profile editor"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isFirebaseConfigured && (
          <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 dark:border-yellow-600 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              <strong>Demo Mode:</strong> Firebase not configured. Changes are temporary and will not persist.
            </p>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-400/30 bg-slate-200 dark:bg-slate-700">
                {photoURL ? (
                  <img src={photoURL || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                    No Photo
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition disabled:opacity-50"
                aria-label="Upload profile photo"
              >
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                aria-label="Choose profile photo"
              />
            </div>
            <p className="text-xs text-slate-600 dark:text-blue-200 mt-2 text-center">
              Click camera icon to upload photo (max 5MB)
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-2 text-slate-900 dark:text-white">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
