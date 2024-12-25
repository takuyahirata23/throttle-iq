import Link from 'next/link'
import { signIn } from '@/auth'

export default async function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="grid gap-y-4">
        <Link href="/motorcycles">Motorcycles</Link>
        <Link href="/laptimes">Lap Times</Link>
        <Link href="/estimate">Estimate</Link>
      </div>
      <form
        action={async () => {
          'use server'
          await signIn('github')
        }}
      >
        <button type="submit">Signin with Github</button>
      </form>
    </div>
  )
}
