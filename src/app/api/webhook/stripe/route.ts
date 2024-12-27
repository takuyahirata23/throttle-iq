import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { estimate } from '@/actions/estimate'

//import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET!)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (e) {
    return NextResponse.json({ message: 'Webhook error', error: e })
  }

  const eventType = event.type

  if (eventType === 'checkout.session.completed') {
    const lineItems = await stripe.checkout.sessions.listLineItems(
      event.data.object.id
    )

    console.log(lineItems)
    console.log(event.data)
    const { id, metadata } = event.data.object
    console.log('metadata', metadata)

    const tracks = JSON.parse(metadata.tracks)
    const { userId, motorcycleId } = metadata

    estimate({ tracks, userId, motorcycleId, stripeTransactionId: id })

    return NextResponse.json({
      message: 'OK'
    })
  }

  return new Response('', { status: 200 })
}
