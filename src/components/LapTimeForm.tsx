//@ts-nocheck
'use client'

import * as React from 'react'
import { AudioWaveform, Bike, Timer } from 'lucide-react'
import Link from 'next/link'

import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { formatTime } from '@/lib/utils'

import type {
  Country,
  Track,
  TrackLayout,
  Motorcycle,
  LapTime
} from '@/types/data'

import { fetchTracks, fetchTrackLayouts } from '@/actions/tracks'
import { saveLapTime } from '@/actions/lapTime'

type Props = {
  countries: Country[]
  motorcycles: Motorcycle[]
  userId: string
  lapTimes: LapTime[]
}

const iv = {
  minutes: '',
  seconds: '',
  trackLayout: '',
  motorcycleId: ''
}

export function LapTimeForm({
  countries,
  motorcycles,
  userId,
  lapTimes
}: Props) {
  const [state, formAction, pending] = React.useActionState(
    saveLapTime.bind(null, userId),
    null
  )
  const [isFetching, setIsFetching] = React.useState(false)
  const [tracks, setTracks] = React.useState<Track[]>([])
  const [trackLayouts, setTrackLayouts] = React.useState<TrackLayout[]>([])
  const [newLapTimes, setNewLapTimes] = React.useState<LapTime[]>([])
  const [lapTime, setLapTime] = React.useState(iv)
  const { toast } = useToast()

  const onCountryChange = async (countryId: string) => {
    setIsFetching(true)
    const res = await fetchTracks(countryId)
    setTracks(res)
    setIsFetching(false)
  }

  const onTrackChange = async (trackId: string) => {
    setIsFetching(true)
    const res = await fetchTrackLayouts(trackId)
    setTrackLayouts(res)
    setIsFetching(false)
  }

  const onTimeChange =
    (key: 'minutes' | 'seconds') => (e: React.ChangeEvent<HTMLInputElement>) =>
      setLapTime(prev => ({ ...prev, [key]: e.target.value }))

  React.useEffect(() => {
    setLapTime(iv)
    if (!state?.error && state?.lapTime) {
      setLapTime(iv)
      setNewLapTimes(prev => [...prev, state.lapTime])
      toast({
        title: 'Saved new laptime',
        description: 'Lets estimate your lap time on any MotoGP track!',
        action: (
          <ToastAction altText="Got to estimate">
            <Link href="/estimate">Estimate</Link>
          </ToastAction>
        )
      })
    }

    if (state?.error) {
      toast({
        title: 'Fail',
        description: 'Something went wrong...'
      })
    }
  }, [state])

  return (
    <div className="grid gap-y-12">
      {lapTimes.concat(newLapTimes).length > 0 && (
        <div className="space-y-8">
          <ul className="space-y-4">
            {lapTimes
              .concat(newLapTimes)
              .map(({ id, time, motorcycle, trackLayout }: LapTime) => (
                <li
                  key={id}
                  className="bg-secondary p-4 rounded-md shadow space-y-2 flex flex-col text-sm"
                >
                  <div className="flex items-center gap-x-2">
                    <AudioWaveform className="w-5 h-5" />
                    <div className="font-semibold">
                      {trackLayout.track.name}&nbsp;
                      {trackLayout.name}
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="flex gap-x-1 items-center bg-primary px-2 py-1 rounded-md text-primary-foreground self-start">
                      <Timer className="w-5 h-5" />
                      <div className="text-sm">{formatTime(time)}</div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Bike className="w-5 h-5" />
                      <div>
                        {motorcycle.model.name}({motorcycle.year})
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <Button type="button" asChild className="mt-4 w-full">
            <Link href="/estimate">Ride on MotoGP Tracks!</Link>
          </Button>
        </div>
      )}
      <form action={formAction} className="space-y-6">
        <Select onValueChange={onCountryChange} disabled={isFetching}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Country</SelectLabel>
              {countries.map(({ name, id }: Country) => (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={onTrackChange}
          disabled={isFetching || tracks.length === 0}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select Track" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Track</SelectLabel>
              {tracks.map(({ name, id }: Track) => (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          disabled={isFetching || trackLayouts.length === 0}
          name="trackLayoutId"
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Track</SelectLabel>
              {trackLayouts.map(({ name, id }: TrackLayout) => (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select name="motorcycleId">
          <SelectTrigger>
            <SelectValue placeholder="Select Motorcycle" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Motorcycle</SelectLabel>
              {motorcycles.map(({ id, model, year }: Motorcycle) => (
                <SelectItem value={id} key={id}>
                  {model.name}({year})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            required
            onChange={onTimeChange('minutes')}
            value={lapTime.minutes}
            placeholder="mm"
            name="minutes"
            type="number"
            min="0"
            max="3"
          />
          <Input
            onChange={onTimeChange('seconds')}
            value={lapTime.seconds}
            name="seconds"
            type="number"
            placeholder="ss.ms"
            step="0.01"
            min="0"
            max="59.99"
          />
        </div>
        <div className="mt-8">
          <Button type="submit" disabled={pending} className="mt-4 w-full">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
