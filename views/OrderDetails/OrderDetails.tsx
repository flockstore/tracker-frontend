'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card'
import { Button } from '@/components/ui/Button/Button'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import type { Order } from '@/types/domain/Order'
import { getBanner } from '@/actions/GetBanner/GetBanner'
import type { Banner } from '@/types/domain/Banner'
import { SystemBanner } from '@/components/ui/SystemBanner/SystemBanner'
import { TrackingDetails } from './partials/TrackingDetails/TrackingDetails'
import { OrderStatus } from './partials/OrderStatus/OrderStatus'
import { OrderItems } from './partials/OrderItems/OrderItems'
import { CustomerInfo } from './partials/CustomerInfo/CustomerInfo'
import { PaymentMethod } from './partials/PaymentMethod/PaymentMethod'
import { useTranslations } from 'next-intl'
import { getTracking } from '@/actions/GetTracking/GetTracking'
import type { TrackingHistory } from '@/types/domain/Tracking'

/**
 * OrderDetails View Component
 *
 * Displays complete order information including customer details,
 * order items, and tracking information.
 *
 * Features:
 * - Fetches and displays order details from session storage
 * - Fetches and displays real-time tracking information
 * - Shows system banner if available
 * - Handles loading and error states
 */
export const OrderDetails = () => {
  const router = useRouter()
  const t = useTranslations('OrderDetails')
  const [order, setOrder] = useState<Order | null>(null)
  const [trackingData, setTrackingData] = useState<Record<string, TrackingHistory>>({})
  const [isLoadingTracking, setIsLoadingTracking] = useState(true)
  const [computedStatus, setComputedStatus] = useState<string>('')
  const [banner, setBanner] = useState<Banner | null>(null)

  const fetchBanner = useCallback(async () => {
    const response = await getBanner()
    if (response.success && response.data) {
      setBanner(response.data)
    }
  }, [])

  useEffect(() => {
    fetchBanner()
  }, [fetchBanner])

  const fetchAllTrackingData = useCallback(
    async (trackingInfo: Order['tracking'], orderStatus: string) => {
      setIsLoadingTracking(true)
      const trackingPromises = trackingInfo.map(async (track) => {
        const response = await getTracking({
          trackingNumber: track.tracking_number,
          courier: track.tracking_provider,
        })
        return {
          trackingNumber: track.tracking_number,
          data: response.success ? response.data : null,
        }
      })

      const results = await Promise.all(trackingPromises)
      const trackingMap: Record<string, TrackingHistory> = {}
      let hasCompleted = false
      let hasIncident = false
      let hasReturn = false

      results.forEach((result) => {
        if (result.data) {
          trackingMap[result.trackingNumber] = result.data
          const status = result.data.global_status
          if (status === 'COMPLETED') {
            hasCompleted = true
          } else if (status === 'INCIDENCE') {
            hasIncident = true
          } else if (status === 'RETURN') {
            hasReturn = true
          }
        }
      })

      setTrackingData(trackingMap)

      let finalStatus = orderStatus || ''
      if (hasIncident) {
        finalStatus = 'INCIDENCE'
      } else if (hasReturn) {
        finalStatus = 'RETURN'
      } else if (hasCompleted) {
        finalStatus = 'COMPLETED'
      }

      setComputedStatus(finalStatus)
      setIsLoadingTracking(false)
    },
    []
  )

  useEffect(() => {
    const orderData = sessionStorage.getItem('currentOrder')
    if (orderData) {
      const parsedOrder = JSON.parse(orderData)
      setOrder(parsedOrder)

      // Pre-fetch all tracking data
      if (parsedOrder.tracking && parsedOrder.tracking.length > 0) {
        fetchAllTrackingData(parsedOrder.tracking, parsedOrder.status)
      } else {
        setIsLoadingTracking(false)
      }
    } else {
      router.push('/')
    }
  }, [router, fetchAllTrackingData])

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">{t('loading')}</div>
      </div>
    )
  }

  const displayStatus = computedStatus || order.status

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToSearch')}
        </Button>

        {/* 2-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left column: Order Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl font-bold">
                  {t('orderTitle', { orderId: order.order_id })}
                </CardTitle>
                <CardDescription>
                  {t('placedOn', {
                    date: new Date(order.create_date).toLocaleDateString(),
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* System Banner */}
                <SystemBanner banner={banner} />

                {/* Order Status */}
                <OrderStatus status={displayStatus} isLoading={isLoadingTracking} t={t} />

                {/* Order Items */}
                <OrderItems items={order.items} t={t} />

                {/* Customer Info & Payment Method - 6:6 grid on desktop */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CustomerInfo
                    name={order.name}
                    lastName={order.last_name}
                    email={order.email}
                    address={order.address}
                    city={order.city}
                    state={order.state}
                    t={t}
                  />
                  <PaymentMethod paymentMethod={order.payment_method} t={t} />
                </div>

                {/* Support Button */}
                <div className="flex justify-center pt-2">
                  <Button
                    className="w-full gap-2 md:w-auto"
                    onClick={() => {
                      const phoneNumber =
                        process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_NUMBER || '573104314990'
                      const message = t('support.whatsappMessage', {
                        order: order.order_id,
                      })
                      window.open(
                        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
                        '_blank'
                      )
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t('support.buttonText')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Tracking Information */}
          <div>
            {order.tracking && order.tracking.length > 0 && (
              <TrackingDetails
                tracking={order.tracking}
                preloadedData={trackingData}
                isLoading={isLoadingTracking}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
