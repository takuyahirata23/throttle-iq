import Link from 'next/link'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { Timer } from 'lucide-react'

import { MotorcycleForm } from '@/components'
import { Button } from '@/components/ui/button'

export default async function Motorcycles() {
  const { user } = await auth()

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

  console.log(motorcycles)

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
      <Button variant="outline" className="w-2/3 mx-auto">
        <Link href="/laptimes">Add lap times</Link>
        <Timer />
      </Button>
    </div>
  )
}
