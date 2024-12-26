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

// Estimate my lap time on #{list_of_tracks} based on my bike and performance on the following tracks with the bike:
// Bike: #{model.make.name}-#{model.name} #{year}
// Performance:
//  #{lap_times}

// Consider differences in track length, technical complexity, and the bike’s performance characteristics. Provide a single realistic estimated lap time range for the tracks specified. Keep in mind that the official MotoGP lap times will be faster if applicable, but the estimates should be grounded in the capabilities of a #{model.make.name}-#{model.name} #{year} on these tracks.

// Response format:
// #{estimate_lap_times}
// Explanation: [Brief explanation]
