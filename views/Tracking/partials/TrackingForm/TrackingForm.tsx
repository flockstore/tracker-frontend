'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/Button/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form/Form'
import { Input } from '@/components/ui/Input/Input'
import { useTranslations } from 'next-intl'

const formSchema = z.object({
  orderNumber: z.coerce.number().min(1, {
    message: 'Order number is required.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
})

/**
 * TrackingForm Component
 *
 * A form component that allows users to input their order number and email
 * to track their order status. It uses react-hook-form for state management
 * and zod for validation.
 *
 * @returns {JSX.Element} The rendered tracking form.
 */
export const TrackingForm = () => {
  const t = useTranslations('TrackingForm')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: 0, // Default to 0 or empty string if allowed, but coerce.number handles string input
      email: '',
    },
    mode: 'onTouched', // Validate on touched and dirty as requested
  })

  /**
   * Handles the form submission.
   *
   * @param {z.infer<typeof formSchema>} values - The validated form values.
   */
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="orderNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.orderNumber.label')}</FormLabel>
              <FormControl>
                {/* Use type="number" for browser-level validation constraint, but keep standard input styling */}
                <Input
                  type="number"
                  placeholder={t('fields.orderNumber.placeholder')}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  {...field}
                  onChange={(e) => field.onChange(e)} // react-hook-form handles changes
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('fields.email.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('fields.email.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <Search className="mr-2 h-4 w-4" /> {t('submit')}
        </Button>
      </form>
    </Form>
  )
}
