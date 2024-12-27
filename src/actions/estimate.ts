'use server'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

import { formatTime } from '@/lib/utils'

import type { LapTime, Track, Motorcycle } from '@/types/data'

const stripe = new Stripe(process.env.STRIPE_SECRET!)

type Payload = {
  tracks: string[]
  motorcycleId: string
  userId: string
}

export async function createSession({ tracks, motorcycleId }: Payload) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_ESTIMATE_PRICE_ID!,
        quantity: tracks.length
      }
    ],
    metadata: {
      tracks: JSON.stringify(tracks),
      motorcycleId
    },
    mode: 'payment',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000/estimate'
  })

  redirect(session.url!)
}

export async function estimate({ tracks, motorcycleId, userId }: Payload) {
  const data = await fetchUserData({ tracks, motorcycleId })
  const prompt = await createPrompt(data)

  return prompt
}

export async function fetchUserData({ tracks, motorcycleId }) {
  const trackWhereClause = tracks.map((id: string) => ({ id }))

  const gpTracks = await prisma.track.findMany({
    where: {
      OR: trackWhereClause
    },
    orderBy: { name: 'asc' }
  })

  const motorcycle = await prisma.motorcycle.findUnique({
    where: {
      id: motorcycleId
    },
    select: {
      year: true,
      lapTimes: {
        select: {
          time: true,
          trackLayout: {
            select: {
              name: true,
              track: {
                select: {
                  name: true,
                  trackLayouts: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      },
      model: {
        select: {
          name: true,
          make: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  return { tracks: gpTracks, motorcycle }
}

function insertListOfTracks(gpTracks: Track[]) {
  const trackNames = gpTracks.map(track => `${track.name}`).join(', ')
  return `Estimate my lap time on ${trackNames} based on my bike and performance on the following tracks with the bike:\n`
}

function insertPerformance(motorcycle: Motorcycle) {
  const model = motorcycle.model.name
  const make = motorcycle.model.make.name
  const year = motorcycle.year

  const hintPrompt = `Consider differences in track length, technical complexity, and the bike’s performance characteristics. Provide a single realistic estimated lap time range for the tracks specified. Keep in mind that the official MotoGP lap times will be faster if applicable, but the estimates should be grounded in the capabilities of a ${make}-${model} ${year} on these tracks.\nResponse format:\nEstimate  laptime: [estimate_lap_times]\ntrack: [track]\nExplanation: [Brief explanation]
  `

  const lapTimes = motorcycle.lapTimes.map(
    (lapTime: LapTime) =>
      `Track: ${lapTime.trackLayout.track.name}, Lap Time: ${formatTime(
        lapTime.time
      )}.\n`
  )

  const bikePropt = `Bike: ${make}${model} ${year}\nPerformance: ${lapTimes}\n`
  return bikePropt.concat(hintPrompt)
}

export async function createPrompt({
  tracks,
  motorcycle
}: {
  tracks: Track[]
  motorcycle: Motorcycle
}) {
  const trackPrompt = insertListOfTracks(tracks)
  const motorcyclePrompt = insertPerformance(motorcycle)
  return trackPrompt.concat(motorcyclePrompt)
}
