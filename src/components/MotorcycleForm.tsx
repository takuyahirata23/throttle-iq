'use client'

import * as React from 'react'

import { fetchModels, saveMotorcycle } from '@/actions/motorcycle'
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
import { FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'

import type { Make, Model, Motorcycle } from '@/types/data'

interface Props {
  makes: Make[]
  userId: string
  motorcycles: Motorcycle[]
}

const currentYear = new Date().getFullYear()

const iv = {
  year: '',
  modelId: ''
}

export function MotorcycleForm({ makes, userId, motorcycles }: Props) {
  const [state, formAction, pending] = React.useActionState(
    saveMotorcycle.bind(null, userId),
    null
  )
  const [isFetchingModel, setIsFetchingModel] = React.useState(false)
  const [models, setModels] = React.useState<Model[] | []>([])
  const [motorcycle, setMotorcycle] = React.useState(iv)
  const [newMotorcycles, setNewMotorcycles] = React.useState<Motorcycle[]>([])
  const { toast } = useToast()

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

  React.useEffect(() => {
    if (!state?.error && state?.motorcycle) {
      setMotorcycle(iv)
      setNewMotorcycles(prev => [...prev, state.motorcycle])
      toast({
        title: 'Saved new motorcycle!',
        description: `${state.motorcycle.model.name}`
      })
    }
  }, [state])

  return (
    <div>
      <ul className="grid gap-y-4">
        {motorcycles
          .concat(newMotorcycles)
          .map(({ id, year, model }: Motorcycle) => (
            <li key={id} className="bg-secondary p-4 rounded-md flex shadow">
              <span className="font-motorcycle">{model.make.name} </span>
              <span>&nbsp;- &nbsp;{model.name}</span>
              <span className="text-sm ml-1">({year})</span>
            </li>
          ))}
      </ul>
      <form action={formAction} className="space-y-6">
        <FormItem>
          <Label>Make</Label>
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
        </FormItem>
        <FormItem>
          <Label>Model</Label>
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
        </FormItem>
        <FormItem>
          <Label>Year</Label>
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
        </FormItem>
        <Button type="submit" className="w-full" disabled={pending}>
          Save
        </Button>
      </form>
    </div>
  )
}
