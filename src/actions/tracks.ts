'use server'
import prisma from '@/lib/prisma'

export async function fetchTracks(countryId: string) {
  return prisma.track.findMany({
    where: {
      countryId
    },
    orderBy: {
      name: 'asc'
    }
  })
}

export async function fetchTrackLayouts(trackId: string) {
  return prisma.trackLayout.findMany({
    where: {
      trackId
    },
    orderBy: {
      name: 'asc'
    }
  })
}
