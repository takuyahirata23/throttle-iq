import prisma from '@/lib/prisma'
import { auth } from '@/auth'

import { LapTimeForm } from '@/components'

export default async function LapTimes() {
  const { user } = await auth()

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
      OR: [{ code: 'CA' }, { code: 'JP' }, { code: 'US' }]
    },
    orderBy: { name: 'asc' }
  })

  return (
    <div>
      <LapTimeForm
        countries={countries}
        userId={id}
        motorcycles={motorcycles}
        lapTimes={lapTimes}
      />
    </div>
  )
}
