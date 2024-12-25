import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const milliseconds = Math.floor((seconds % 1) * 1000)

  // Pad with leading zeros if needed
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(secs).padStart(2, '0')
  const formattedMilliseconds = String(milliseconds)
    .padStart(3, '0')
    .slice(0, 2)

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`
}
