'use client'

import { redirect } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createSession, estimate } from '@/actions/estimate'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import type { Motorcycle } from '@/types/data'

const FormSchema = z.object({
  tracks: z.string().array().min(2, {
    message: 'Please select least 2 tracks'
  }),
  motorcycleId: z.string().min(10, {
    message: 'Please select motorcycle'
  })
})

type Props = {
  motorcycles: Motorcycle[]
  trackOptions: { id: string; label: string }[]
  userId: string
}

export function EstimateForm({ trackOptions, motorcycles, userId }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tracks: [],
      motorcycleId: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createSession({ ...data, userId })
    // const res = await estimate({ ...data, userId })
    // console.log(res)
    // redirect('/estimate/result')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tracks"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">MotoGP Tracks</FormLabel>
                <FormDescription>
                  Select the tracks you want to ride!
                </FormDescription>
              </div>
              {trackOptions.map((item: { id: string; label: string }) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="tracks"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={checked => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      value => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="motorcycleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motorcycle to ride</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select motorcycle to ride on the tracks" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {motorcycles.map(({ id, model }: Motorcycle) => (
                    <SelectItem value={id} key={id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
