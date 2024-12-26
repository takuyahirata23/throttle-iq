'use server'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
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

export async function saveMotorcycle(
  userId: string,
  _: any,
  formData: FormData
) {
  const session = await auth()

  if (!session) {
    return redirect('/')
  }

  const data = {
    userId: userId,
    modelId: formData.get('modelId') as string,
    year: Number(formData.get('year'))
  }

  try {
    const motorcycle = await prisma.motorcycle.create({
      data,
      include: {
        model: {
          include: {
            make: true
          }
        }
      }
    })

    return {
      error: false,
      motorcycle
    }
  } catch (error) {
    return {
      error: true,
      payload: error
    }
  }
}
