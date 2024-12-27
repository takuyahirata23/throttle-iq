//@ts-nocheck
'use server'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import { request } from '@/lib/openai'

import { formatTime } from '@/lib/utils'

import type { LapTime, Track, Motorcycle } from '@/types/data'

const stripe = new Stripe(process.env.STRIPE_SECRET!)

type Payload = {
  tracks: string[]
  motorcycleId: string
  userId: string
  stripeTransactionId: string
}

export async function createSession({ tracks, motorcycleId, userId }: Payload) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_ESTIMATE_PRICE_ID!,
        quantity: tracks.length
      }
    ],
    metadata: {
      tracks: JSON.stringify(tracks),
      motorcycleId,
      userId
    },
    mode: 'payment',
    success_url: `${process.env.DOMAIN_URL}/estimate/result`,
    cancel_url: `${process.env.DOMAIN_URL}/estimate`
  })

  redirect(session.url!)
}

export async function estimate({
  tracks,
  motorcycleId,
  userId,
  stripeTransactionId
}: Payload) {
  const data = await fetchUserData({ tracks, motorcycleId })
  const prompt = await createPrompt(data)

  const res = await request(prompt)

  const { bike, estimates } = JSON.parse(res.choices[0].message.content)

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      stripeTransactionId,
      bike,
      estimates: {
        create: estimates
      }
    }
  })

  return transaction
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
  const trackNames = gpTracks.map(track => `- ${track.name}\n`).join('')
  return `**Track to Estimate**:\n${trackNames}`
}

function insertPerformance(motorcycle: Motorcycle) {
  const model = motorcycle.model.name
  const make = motorcycle.model.make.name
  const year = motorcycle.year

  const lapTimes = motorcycle.lapTimes
    .map(
      (lapTime: LapTime) =>
        `${lapTime.trackLayout.track.name}: ${formatTime(lapTime.time)}\n`
    )
    .join('')

  const bikePrompt = `**Bike**:\n${make} ${model} ${year}\n`
  const performancePrompt = `**Track**:\n${lapTimes}`

  return bikePrompt.concat(performancePrompt)
}

const basePrompt =
  'Generate detailed lap time estimations for the tracks I want analyzed based on my performance as a less-experienced trackday rider. Each response should be realistic and justify the lap time by comparing it to my existing times on similar tracks, while considering my bike’s performance and the track’s features. Use the following format::\n#### User Data:'

const requirementsPrompt = `\n####Requirements:\n1. Provide a realistic lap time range for each requested track based on the my performance data and the track's characteristics.\n2. Keep estimations realistic, avoiding professional-level expectations.\n3. Explain the estimation in detail, highlighting specific track features (e.g., elevation changes, straights, technical sections) and how they relate to the my past performance.\n3. Format the response as JSON with this structure:\n {"bike": "string", "estimates": [{"track": "string", "lapTime": "string", "explanation": "string"}]}`

export async function createPrompt({
  tracks,
  motorcycle
}: {
  tracks: Track[]
  motorcycle: Motorcycle
}) {
  const motorcyclePrompt = insertPerformance(motorcycle)
  const trackPrompt = insertListOfTracks(tracks)

  return basePrompt
    .concat(motorcyclePrompt)
    .concat(trackPrompt)
    .concat(requirementsPrompt)
}
