'use server'
import prisma from '@/lib/prisma'

export async function saveLapTime(userId: string, iv: any, formData: FormData) {
  const minutes = formData.get('minutes')
  const seconds = formData.get('seconds')

  const time = Number(minutes) * 60 + Number(seconds)

  const data = {
    trackLayoutId: formData.get('trackLayoutId') as string,
    motorcycleId: formData.get('motorcycleId') as string,
    userId,
    time
  }

  try {
    const lapTime = await prisma.lapTime.create({
      data,
      include: {
        motorcycle: {
          include: {
            model: true
          }
        },
        trackLayout: {
          include: {
            track: true
          }
        }
      }
    })

    return { error: false, lapTime }
  } catch (e) {
    console.error(e)
    return { error: true }
  }
}
