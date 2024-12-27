import { AlignJustify, Bike, BookOpen, Calculator, Timer } from 'lucide-react'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="text-black">
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Bike />
            <Link href="/motorcycles">Motorcycles</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Timer />
            <Link href="/laptimes">Lap Times</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calculator />
            <Link href="/estimate">Estimate</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpen />
            <Link href="/estimate/result">Your estimations</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
