"use client"

type LoadingAnnouncementProps = {
  message?: string
  isLoading: boolean
}

export function LoadingAnnouncement({ 
  message = "Loading content, please wait",
  isLoading 
}: LoadingAnnouncementProps) {
  if (!isLoading) return null

  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}
