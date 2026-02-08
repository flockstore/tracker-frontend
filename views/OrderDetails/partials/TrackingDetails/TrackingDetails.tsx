'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Package2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import type { TrackingInfo } from '@/types/domain/Order'
import type { TrackingHistory } from '@/types/domain/Tracking'
import { useTranslations } from 'next-intl'
import { getCarrierLogo } from '@/lib/utils/carrierLogo'

/**
 * TrackingDetails Component Props
 */
interface TrackingDetailsProps {
  tracking: TrackingInfo[]
  preloadedData: Record<string, TrackingHistory>
  isLoading: boolean
}

/**
 * TrackingDetails Component
 *
 * Displays tracking information with pre-loaded tracking history
 * for each shipment. Shows carrier logos when available.
 */
export const TrackingDetails = ({ tracking, preloadedData, isLoading }: TrackingDetailsProps) => {
  const t = useTranslations('TrackingDetails')
  const tCarriers = useTranslations('Carriers')
  const [expandedTracking, setExpandedTracking] = useState<string | null>(null)

  const handleToggleTracking = (trackingNumber: string) => {
    if (expandedTracking === trackingNumber) {
      setExpandedTracking(null)
    } else {
      setExpandedTracking(trackingNumber)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl font-bold">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-muted-foreground">{t('loading')}</span>
          </div>
        ) : (
          tracking.map((track, index) => {
            const trackingHistory = preloadedData[track.tracking_number]

            return (
              <div key={index} className="rounded-lg border">
                <button
                  onClick={() => handleToggleTracking(track.tracking_number)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      const carrierLogo = getCarrierLogo(track.tracking_provider)
                      return carrierLogo ? (
                        <Image
                          src={carrierLogo}
                          alt={track.tracking_provider}
                          width={20}
                          height={20}
                          className="h-5 w-5"
                        />
                      ) : (
                        <Package2 className="h-5 w-5" />
                      )
                    })()}
                    <div>
                      <p className="font-medium">{track.tracking_number}</p>
                      <p className="text-muted-foreground text-sm">
                        {tCarriers(track.tracking_provider) || track.tracking_provider}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {trackingHistory && (
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          trackingHistory.global_status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : trackingHistory.global_status === 'PROCESSING'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {trackingHistory.global_status}
                      </span>
                    )}
                    {expandedTracking === track.tracking_number ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </button>

                {expandedTracking === track.tracking_number && (
                  <div className="border-t p-4">
                    {trackingHistory ? (
                      <div className="space-y-3">
                        {trackingHistory.history.map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            className="flex gap-3 border-l-2 border-primary pl-4"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{event.text}</p>
                              <p className="text-muted-foreground text-sm">
                                {event.city} • {new Date(event.date).toLocaleString()}
                              </p>
                              {event.code && (
                                <p className="text-muted-foreground text-xs">
                                  {t('code')}: {event.code}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">{t('failed')}</p>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
