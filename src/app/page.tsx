import { Bike, BookOpen, Calculator, Timer } from 'lucide-react'
import Link from 'next/link'
import { auth, signIn } from '@/auth'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const session = await auth()

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="space-y-4">
        <h1 className="font-bold text-xl">
          Estimate Your Lap Times on Legendary MotoGP Tracks.
        </h1>
        <h2>Personalized Lap Time Predictions for Every Rider.</h2>
        <p className="text-sm">
          Upload Your Lap Times, Choose Your Track, and Let ThrottleIQ Estimate.
        </p>
      </div>
      <div className="mt-6">
        {!session ? (
          <form
            action={async () => {
              'use server'
              await signIn('github')
            }}
          >
            <button type="submit">Signin with Google</button>
          </form>
        ) : (
          <div className="grid gap-y-4">
            <Button asChild>
              <Link href="/motorcycles">
                <Bike />
                Motorcycles
              </Link>
            </Button>
            <Button asChild>
              <Link href="/laptimes">
                <Timer />
                Lap Times
              </Link>
            </Button>
            <Button asChild>
              <Link href="/estimate">
                <Calculator />
                Estimate
              </Link>
            </Button>
            <Button asChild>
              <Link href="/estimate/result">
                <BookOpen />
                Your estimations
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
