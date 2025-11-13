import { storage as getStorage, isFirebaseConfigured } from "./client"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

// Upload profile photo
export async function uploadProfilePhoto(userId: string, file: File): Promise<string> {
  if (!isFirebaseConfigured) {
    console.log("[Firebase] Not configured. Photo upload simulated.")
    // Return a placeholder data URL for the uploaded file
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  const storage = getStorage()
  if (!storage) {
    throw new Error("Firebase storage not initialized")
  }

  // Create a unique filename
  const timestamp = Date.now()
  const filename = `${timestamp}-${file.name}`
  const storageRef = ref(storage, `profile-photos/${userId}/${filename}`)

  // Upload the file
  await uploadBytes(storageRef, file)

  // Get the download URL
  const downloadURL = await getDownloadURL(storageRef)

  return downloadURL
}

// Delete profile photo
export async function deleteProfilePhoto(photoURL: string) {
  if (!isFirebaseConfigured) {
    console.log("[Firebase] Not configured. Photo deletion simulated.")
    return
  }

  const storage = getStorage()
  if (!storage) {
    console.warn("[Firebase] Storage not initialized")
    return
  }

  const photoRef = ref(storage, photoURL)
  await deleteObject(photoRef)
}
