import React from 'react'

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary text-secondary-foreground p-4 rounded-md shadow-md">
      {children}
    </div>
  )
}
