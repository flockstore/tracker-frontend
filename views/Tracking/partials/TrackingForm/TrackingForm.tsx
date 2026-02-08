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

/**
 * TrackingForm Component
 *
 * A form component that allows users to input their order number and email
 * to track their order status. Uses react-hook-form for state management
 * and zod for validation.
 */
export const TrackingForm = () => {
  const t = useTranslations('TrackingForm')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formSchema = z.object({
    orderNumber: z.coerce.number().min(1, {
      message: t('validation.orderNumberRequired'),
    }),
    email: z.string().email(t('validation.emailInvalid')),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: 0,
      email: '',
    },
    mode: 'onTouched',
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await getOrder({
        orderId: values.orderNumber.toString(),
        email: values.email,
      })

      if (response.success) {
        // Store order data and navigate to order details
        sessionStorage.setItem('currentOrder', JSON.stringify(response.data))
        router.push(`/order/${response.data.order_id}`)
      } else {
        // Use translated error message or fallback to API error
        setError(response.error.message || t('errors.notFound'))
      }
    } catch {
      setError(t('errors.unexpected'))
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
          {isLoading ? t('searching') : t('submit')}
        </Button>
      </form>
    </Form>
  )
}
