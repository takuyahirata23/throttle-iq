import { auth, signIn, signOut } from '@/auth'
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
    </div>
  )
}
