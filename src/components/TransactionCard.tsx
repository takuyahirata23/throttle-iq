import { Loader2 } from 'lucide-react'

import { Card } from './Card'

import type { Transaction } from '@/types/data'

export function TransactionCard({ status, bike, estimates }: Transaction) {
  if (status === 'PENDING') {
    return (
      <Card>
        <div>
          <div className="flex gap-x-2">
            <Loader2 className="animate-spin" />
            <div className="font-semibold">
              ThrottleIQ AI is working on your estimate...
            </div>
          </div>
          <div className="mt-4">
            {"Your estimates will be shown here as soon as it's ready!"}
          </div>
        </div>
      </Card>
    )
  }
  if (status === 'ERROR') {
    return <Card>Something went wrong.</Card>
  }
  return (
    <Card>
      <div className="space-y-6">
        <p className="font-bold">Bike: {bike}</p>
        <ul className="grid gap-y-8">
          {estimates.map(({ id, track, lapTime, explanation }) => (
            <li key={id} className="space-y-4">
              <p className="font-semibold">Track: {track}</p>
              <p>Lap Time: {lapTime}</p>
              <p>{explanation}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
