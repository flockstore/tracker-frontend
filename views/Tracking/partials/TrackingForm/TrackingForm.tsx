'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
import { getOrder } from '@/actions/GetOrder/GetOrder'

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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: 0,
      email: '',
    },
    mode: 'onTouched',
  })

  /**
   * Handles the form submission.
   *
   * @param {z.infer<typeof formSchema>} values - The validated form values.
   */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getOrder({
        orderId: values.orderNumber.toString(),
        email: values.email,
      })

      console.log('API Response:', response)

      if (response.success) {
        console.log('Order Data:', response.data)
        // Store order data and navigate to order details
        sessionStorage.setItem('currentOrder', JSON.stringify(response.data))
        router.push(`/order/${response.data.order_id}`)
      } else {
        console.error('API Error:', response.error)
        setError(response.error.message)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          <Search className="mr-2 h-4 w-4" />
          {isLoading ? 'Searching...' : t('submit')}
        </Button>
      </form>
    </Form>
  )
}
