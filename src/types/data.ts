export type User = {
  id: string
  name: string
  motorcycles: Motorcycle[]
}

export type Country = {
  id: string
  name: string
  code: string
}

export type Track = {
  id: string
  name: string
  isMotoGP: boolean
  countryId: string
}

export type TrackLayout = {
  id: string
  name: string
  length: number
  trackId: string
  track: Track
}

export type Make = {
  id: string
  name: string
}

export type Model = {
  id: string
  name: string
  make: Make
}

export type Motorcycle = {
  id: string
  year: number
  model: Model
  lapTimes: LapTime[]
}

export type LapTime = {
  id: string
  time: number
  motorcycle: Motorcycle
  trackLayout: TrackLayout
}
