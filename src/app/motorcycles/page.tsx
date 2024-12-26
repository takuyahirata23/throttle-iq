import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

import { MotorcycleForm } from '@/components'

export default async function Motorcycles() {
  const session = await auth()

  if (!session) {
    return redirect('/')
  }
  const { user } = session

  const { id, motorcycles } = await prisma.user.findUnique({
    where: {
      email: user.email
    },
    select: {
      id: true,
      motorcycles: {
        select: {
          id: true,
          year: true,
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
      }
    }
  })

  const makes = await prisma.make.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="grid gap-y-8">
      <h1 className="font-semibold text-xl">My Motorcycles</h1>
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">
          Tell us what you ride on tracks!
        </h2>
        <MotorcycleForm makes={makes} userId={id} motorcycles={motorcycles} />
      </div>
    </div>
  )
}
