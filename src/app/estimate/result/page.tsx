// @ts-nocheck
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Transactions } from '@/components'
import { auth } from '@/auth'

export default async function Result() {
  const session = await auth()

  if (!session) {
    return redirect('/')
  }

  const { transactions, id } = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    },
    include: {
      transactions: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          estimates: true
        }
      }
    }
  })
  return (
    <div>
      <Transactions transactions={transactions} userId={id} />
    </div>
  )
}
