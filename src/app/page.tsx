import { auth, signIn, signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default async function Home() {
  const session = await auth()

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="space-y-4">
        <h1 className="font-bold text-xl">
          Estimate Your Lap Times on Legendary MotoGP Tracks.
        </h1>
        <h2>Personalized Lap Time Predictions for Trackday Riders.</h2>
        <p className="text-sm">
          Upload Your Lap Times, Choose Your Track, and Let ThrottleIQ Estimate.
        </p>
      </div>
      <div className="mt-6">
        {!session ? (
          <form
            action={async () => {
              'use server'
              await signIn('google')
            }}
          >
            <Button type="submit" className="w-full" variant="secondary">
              Signin with Google
            </Button>
          </form>
        ) : (
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <div className="flex justify-center">
              <Button type="submit" variant="link" className="text-center">
                Sign out
              </Button>
            </div>
          </form>
        )}
      </div>
      <div className="mt-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Please note!</AlertTitle>
          <AlertDescription className="leading-relaxed">
            ThrottleIQ is designed for fun and entertainment! Please note that
            the lap time estimations provided are based on various factors and
            should not be considered perfect or highly precise. They are meant
            to give you a general idea and are not a guarantee of your
            performance on the track. Ride safely and enjoy the thrill of the
            ride!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
