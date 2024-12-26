import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number) {
  // Extract minutes, seconds, and milliseconds
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  // Pad with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(secs).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}
