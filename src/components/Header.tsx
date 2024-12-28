import Link from 'next/link'
import { Menu } from './Menu'

export async function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow">
      <div className="mx-auto max-w-6xl w-11/12 py-4 flex justify-between items-center">
        <Link href="/" className="flex gap-x-2">
          <strong className="text-lg">ThrottleIQ</strong>
          🏍️
        </Link>
        <div className="flex gap-x-2">
          <Menu />
        </div>
      </div>
    </header>
  )
}
