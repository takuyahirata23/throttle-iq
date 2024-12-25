'use server'
import { redirect } from 'next/navigation'
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

export async function saveMotorcycle(userId: string, formData: FormData) {
  const data = {
    userId: userId,
    modelId: formData.get('modelId') as string,
    year: Number(formData.get('year'))
  }

  await prisma.motorcycle.create({
    data
  })

  redirect('/')
}
