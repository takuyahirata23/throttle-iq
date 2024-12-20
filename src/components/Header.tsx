import * as React from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <div>ThrottleIQ</div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
