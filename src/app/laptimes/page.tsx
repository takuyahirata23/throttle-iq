//@ts-nocheck
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

import { LapTimeForm } from '@/components'

export default async function LapTimes() {
  const session = await auth()

  if (!session) {
    return redirect('/')
  }
  const { user } = session

  const { id, lapTimes } = await prisma.user.findUnique({
    where: {
      email: user.email
    },
    select: {
      id: true,
      lapTimes: {
        select: {
          id: true,
          time: true,
          motorcycle: {
            select: {
              year: true,
              model: true
            }
          },
          trackLayout: {
            select: {
              name: true,
              track: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })

  const motorcycles = await prisma.motorcycle.findMany({
    where: {
      userId: id
    },
    include: {
      model: true
    }
  })

  const countries = await prisma.country.findMany({
    where: {
      OR: [{ code: 'CA' }, { code: 'JP' }, { code: 'US' }, { code: 'ES' }]
    },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="grid gap-y-8">
      <h1 className="font-semibold text-xl">My Lap Times</h1>
      <p className="text-lg">
        Add your lap times for each track. ThrottleIQ estimates your lap time on
        MotoGP tracks based on your performance
      </p>
      <LapTimeForm
        countries={countries}
        userId={id}
        motorcycles={motorcycles}
        lapTimes={lapTimes}
      />
    </div>
  )
}
