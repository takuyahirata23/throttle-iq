'use client'
import React from 'react'

import { supabase } from '@/lib/supabase'
import { fetchTransaction } from '@/actions/estimate'
import { TransactionCard } from '@/components'

import type { Transaction } from '@/types/data'
type Props = {
  transactions: Transaction[]
  userId: string
}
export function Transactions({ transactions, userId }: Props) {
  const [allTransactions, setAllTransactions] = React.useState(transactions)

  React.useEffect(() => {
    const channel = supabase
      .channel('realtime country')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Transaction',
          filter: `userId=eq.${userId}`
        },
        async payload => {
          if (
            payload.eventType === 'INSERT' ||
            payload.eventType === 'UPDATE'
          ) {
            const newTransaction = await fetchTransaction(payload.new.id)
            console.log(newTransaction)

            if (newTransaction) {
              setAllTransactions((prev: any) => {
                return prev.map((transaction: Transaction) =>
                  transaction.id === newTransaction?.id
                    ? newTransaction
                    : transaction
                )
              })
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return (
    <div>
      <h1 className="font-bold text-xl">My Estimates</h1>
      <ul className="mt-6 space-y-6">
        {allTransactions.map((transaction: Transaction) => (
          <li key={transaction.id}>
            <TransactionCard {...transaction} />
          </li>
        ))}
      </ul>
    </div>
  )
}
