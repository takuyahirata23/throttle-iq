'use client'
import React from 'react'

import { supabase } from '@/lib/supabase'
import prisma from '@/lib/prisma'
import { fetchTransaction } from '@/actions/estimate'

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
      <ul className="mt-6">
        {allTransactions.map(({ id, bike, estimates, status }: Transaction) => {
          if (status === 'PENDING') {
            return (
              <li key={id}>
                <div>ThrottleIQ AI is working on your estimate...</div>
                <div>
                  {"Your estimates will be shown here as soon as it's ready!"}
                </div>
              </li>
            )
          }
          if (status === 'COMPLETED') {
            return (
              <li key={id}>
                <p>Bike: {bike}</p>
                <ul className="grid gap-y-8">
                  {estimates.map(({ id, track, lapTime, explanation }) => (
                    <li key={id}>
                      <p>Track: {track}</p>
                      <p>Lap Time: {lapTime}</p>
                      <p>{explanation}</p>
                    </li>
                  ))}
                </ul>
              </li>
            )
          }
          if (status === 'ERROR') {
            return (
              <li key={id}>
                <div>Something went wrong.</div>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}
