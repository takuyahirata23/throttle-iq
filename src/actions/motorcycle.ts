'use server'
import prisma from '@/lib/prisma'

export async function fetchModels(id: string) {
  return prisma.model.findMany({
    where: {
      makeId: id
    },
    orderBy: {
      name: 'asc'
    }
  })
}
