'use server'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!)

type Payload = {
  tracks: string[]
  motorcycleId: string
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
