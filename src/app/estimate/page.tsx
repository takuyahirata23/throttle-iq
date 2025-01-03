//@ts-nocheck
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

import { EstimateForm } from '@/components'

export default async function Estimate() {
  const session = await auth()

  if (!session) {
    return redirect('/')
  }

  const { motorcycles, id, lapTimes } = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true,
      lapTimes: {
        select: {
          id: true
        }
      },
      motorcycles: {
        select: {
          id: true,
          year: true,
          model: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  if (motorcycles.length === 0) {
    return redirect('/motorcycles')
  }

  if (lapTimes.length === 0) {
    return redirect('/laptimes')
  }

  const motoGPTracks = await prisma.track.findMany({
    where: {
      isMotoGP: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  const trackOptions = motoGPTracks.map(x => ({
    id: x.id,
    label: x.name
  }))

  return (
    <div className="grid gap-y-8">
      <EstimateForm
        motorcycles={motorcycles}
        trackOptions={trackOptions}
        userId={id}
      />
      <Button asChild>
        <Link href="/estimate/result">
          <BookOpen />
          Your estimations
        </Link>
      </Button>
    </div>
  )
}
