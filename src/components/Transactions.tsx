'use client'
import React from 'react'

import { supabase } from '@/lib/supabase'

import type { Transaction } from '@/types/data'
type Props = {
  transactions: Transaction[]
  userId
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
        payload => {
          if (
            payload.eventType === 'INSERT' ||
            payload.eventType === 'UPDATE'
          ) {
            console.log(payload)
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
        {allTransactions.map(({ id, bike, estimates }: Transaction) => (
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
        ))}
      </ul>
    </div>
  )
}
