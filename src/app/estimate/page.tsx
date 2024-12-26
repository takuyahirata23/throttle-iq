import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

import { EstimateForm } from '@/components'

export default async function Estimate() {
  const session = await auth()

  if (!session) {
    return redirect('/')
  }

  const { motorcycles } = await prisma.user.findUnique({
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
              name: true
            }
          }
        }
      }
    }
  })

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
    <div>
      <EstimateForm motorcycles={motorcycles} trackOptions={trackOptions} />
    </div>
  )
}
