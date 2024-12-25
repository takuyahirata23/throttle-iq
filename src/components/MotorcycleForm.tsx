'use client'

import * as React from 'react'

import { fetchModels, saveMotorcycle } from '@/actions/motorcycle'
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

type Make = {
  id: string
  name: string
}

type Model = {
  id: string
  name: string
}

interface Props {
  makes: Make[]
  userId: string
}

const currentYear = new Date().getFullYear()

export function MotorcycleForm({ makes, userId }: Props) {
  const [isFetchingModel, setIsFetchingModel] = React.useState(false)
  const [models, setModels] = React.useState<Model[] | []>([])
  const [motorcycle, setMotorcycle] = React.useState({
    year: '',
    modelId: ''
  })

  const onMakeChange = async (id: string) => {
    setIsFetchingModel(true)
    const res = await fetchModels(id)
    setModels(res)
    setIsFetchingModel(false)
  }

  const handleModelIdChange = (value: string) =>
    setMotorcycle(prev => ({ ...prev, modelId: value }))

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotorcycle(prev => ({ ...prev, year: e.target.value }))
  }

  const onSubmit = saveMotorcycle.bind(null, userId)

  return (
    <div>
      <form action={onSubmit}>
        <Select onValueChange={onMakeChange} disabled={isFetchingModel}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select Make" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {makes.map(({ name, id }: Make) => (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={handleModelIdChange}
          disabled={models.length === 0}
          name="modelId"
          required
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select Make" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              {models.map(({ name, id }: Model) => (
                <SelectItem value={id} key={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          required
          placeholder="Year"
          value={motorcycle.year}
          onChange={handleYearChange}
          name="year"
          type="number"
          min="1900"
          max={currentYear + 1}
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}
