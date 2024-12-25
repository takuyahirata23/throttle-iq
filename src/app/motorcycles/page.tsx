import prisma from '@/lib/prisma'
import { auth } from '@/auth'

import { MotorcycleForm } from '@/components'

export default async function Motorcycles() {
  const { user } = await auth()

  const { id } = await prisma.user.findUnique({
    where: {
      email: user.email
    },
    select: {
      id: true
    }
  })

  const makes = await prisma.make.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  return (
    <div>
      <div>motorcycles</div>
      <MotorcycleForm makes={makes} userId={id} />
    </div>
  )
}
