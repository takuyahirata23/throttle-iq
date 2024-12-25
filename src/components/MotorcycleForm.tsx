'use client'

import * as React from 'react'

import { fetchModels } from '@/actions/motorcycle'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

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

export function MotorcycleForm({ makes }: Props) {
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

  const handleChange = (key: 'year' | 'modelId') => (value: string) =>
    setMotorcycle(prev => ({ ...prev, [key]: value }))

  console.log(motorcycle)

  return (
    <div>
      <Select onValueChange={onMakeChange} disabled={isFetchingModel}>
        <SelectTrigger className="w-[180px]">
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
        onValueChange={handleChange('modelId')}
        disabled={models.length === 0}
      >
        <SelectTrigger className="w-[180px]">
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
    </div>
  )
}
