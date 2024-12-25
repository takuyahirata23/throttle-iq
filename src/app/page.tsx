import { auth } from '../auth'
import { signIn } from '@/auth'

export default async function Home() {
  const session = await auth()
  console.log(session)
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
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
