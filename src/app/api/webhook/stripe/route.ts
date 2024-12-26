import { NextResponse } from 'next/server'
import Stripe from 'stripe'

//import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET!)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

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
    const { id, amount_total, created, customer_details } = event.data.object

    // await prisma.transaction.create({
    //   data: {
    //     transactionId: id,
    //     createdAt: created,
    //     name: customer_details?.name || '',
    //     email: customer_details?.email || '',
    //     phone: customer_details?.phone,
    //     photoIds: lineItems.data.map((x: any) => x.description)
    //   }
    // })

    return NextResponse.json({
      message: 'OK',
      transaction: {
        id,
        amountTotal: amount_total,
        createdAt: created,
        email: customer_details?.email,
        name: customer_details?.name,
        phone: customer_details?.phone,
        photoIds: lineItems.data.map((x: any) => x.description)
      }
    })
  }

  return new Response('', { status: 200 })
}
