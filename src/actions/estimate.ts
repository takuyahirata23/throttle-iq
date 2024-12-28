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

type SessionPayload = {
  tracks: string[]
  motorcycleId: string
  userId: string
}

export async function fetchTransaction(id) {
  const newTransaction = await prisma.transaction.findUnique({
    where: {
      id
    },
    include: {
      estimates: true
    }
  })
  return newTransaction
}

export async function createSession({
  tracks,
  motorcycleId,
  userId
}: SessionPayload) {
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
  const pendingTransaction = await prisma.transaction.create({
    data: {
      userId,
      stripeTransactionId,
      status: 'PENDING'
    }
  })
  console.log('Pending transaction created', pendingTransaction)

  const data = await fetchUserData({ tracks, motorcycleId })
  const prompt = await createPrompt(data)

  try {
    const res = await request(prompt)
    console.log('result from openai', res)

    const { bike, estimates } = JSON.parse(res.choices[0].message.content)

    const transaction = await prisma.transaction.update({
      where: {
        id: pendingTransaction.id
      },
      data: {
        bike,
        status: 'COMPLETED',
        estimates: {
          create: estimates
        }
      }
    })

    console.log('transaction', transaction)

    return transaction
  } catch (e) {
    console.log(e)
    const errorTransaction = await prisma.transaction.update({
      where: {
        id: pendingTransaction.id
      },
      data: {
        bike,
        status: 'ERROR',
        estimates: {
          create: estimates
        }
      }
    })

    return errorTransaction
  }
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
  'Generate realistic lap time estimations for the tracks I want analyzed based on my performance as a less-experienced trackday rider. Focus on practical and achievable lap times by comparing my performance on similar tracks, taking into account the Yamaha YZF-R1 2023’s characteristics and each track’s specific features. Ensure the response avoids professional-level expectations or overly optimistic times. Use the following format:\n#### User Data:'

const requirementsPrompt = `\n####Requirements:\n1. Provide realistic lap time ranges for the requested tracks based on my current performance, emphasizing my skill level as a less-experienced rider.\n2. Consider track characteristics (e.g., elevation changes, corner types, technical sections, straights) and how they compare to tracks I’ve ridden.\n3. Justify the estimations in detail, clearly explaining why each range is achievable for someone of my skill level.\n4. Avoid suggesting professional-level lap times.\n5. Format the response as JSON with this structure:\n {"bike": "string", "estimates": [{"track": "string", "lapTime": "string", "explanation": "string"}]}`

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
