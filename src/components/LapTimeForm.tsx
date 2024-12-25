'use client'

import * as React from 'react'

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

import { fetchTracks, fetchTrackLayouts } from '@/actions/tracks'
import { saveLapTime } from '@/actions/lapTime'

type Country = {
  id: string
  name: string
  code: string
}

type Track = {
  id: string
  name: string
  isMotoGP: boolean
  countryId: string
}

type TrackLayout = {
  id: string
  name: string
  length: number
  trackId: string
}

type Motorcycle = {
  id: string
  year: number
  model: any
}

type Props = {
  countries: Country[]
  motorcycles: Motorcycle[]
  userId: string
}

export function LapTimeForm({ countries, motorcycles, userId }: Props) {
  const [state, formAction, pending] = React.useActionState(
    saveLapTime.bind(null, userId),
    null
  )
  const [isFetching, setIsFetching] = React.useState(false)
  const [tracks, setTracks] = React.useState<Track[]>([])
  const [trackLayouts, setTrackLayouts] = React.useState<TrackLayout[]>([])
  const [lapTime, setLapTime] = React.useState({
    minutes: '',
    seconds: '',
    trackLayout: '',
    motorcycleId: ''
  })

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

  console.log(state)

  return (
    <div>
      <form action={formAction}>
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
        <div>
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
            placeholder="ss:ms"
            step="0.01"
            min="0"
            max="59.99"
          />
        </div>
        <Button type="submit" disabled={pending}>
          Save
        </Button>
      </form>
    </div>
  )
}
