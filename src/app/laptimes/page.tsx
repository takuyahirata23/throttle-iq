import prisma from '@/lib/prisma'
import { auth } from '@/auth'

import { LapTimeForm } from '@/components'

export default async function LapTimes() {
  const { user } = await auth()

  const { id } = await prisma.user.findUnique({
    where: {
      email: user.email
    },
    select: {
      id: true
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

  const countries = await prisma.country.findMany({ orderBy: { name: 'asc' } })

  return (
    <div>
      <LapTimeForm
        countries={countries}
        userId={id}
        motorcycles={motorcycles}
      />
    </div>
  )
}
