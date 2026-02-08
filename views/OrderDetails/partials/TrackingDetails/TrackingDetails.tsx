'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card'
import { Package2, ChevronDown, ChevronUp } from 'lucide-react'
import type { TrackingInfo } from '@/types/domain/Order'
import { getTracking } from '@/actions/GetTracking/GetTracking'
import type { TrackingHistory } from '@/types/domain/Tracking'

/**
 * TrackingDetails Component Props
 */
interface TrackingDetailsProps {
  tracking: TrackingInfo[]
}

/**
 * TrackingDetails Component
 *
 * Displays tracking information and allows users to view detailed
 * tracking history for each shipment.
 *
 * @param {TrackingDetailsProps} props - Component props
 * @returns {JSX.Element} The rendered tracking details.
 */
export const TrackingDetails = ({ tracking }: TrackingDetailsProps) => {
  const [expandedTracking, setExpandedTracking] = useState<string | null>(null)
  const [trackingHistory, setTrackingHistory] = useState<Record<string, TrackingHistory>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const handleToggleTracking = async (trackingNumber: string, courier: string) => {
    if (expandedTracking === trackingNumber) {
      setExpandedTracking(null)
      return
    }

    setExpandedTracking(trackingNumber)

    if (!trackingHistory[trackingNumber]) {
      setLoading({ ...loading, [trackingNumber]: true })

      const response = await getTracking({
        trackingNumber,
        courier,
      })

      if (response.success) {
        setTrackingHistory({
          ...trackingHistory,
          [trackingNumber]: response.data,
        })
      }

      setLoading({ ...loading, [trackingNumber]: false })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl font-bold">Tracking Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tracking.map((track, index) => (
          <div key={index} className="rounded-lg border">
            <button
              onClick={() => handleToggleTracking(track.tracking_number, track.tracking_provider)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Package2 className="h-5 w-5" />
                <div>
                  <p className="font-medium">{track.tracking_number}</p>
                  <p className="text-muted-foreground text-sm">{track.tracking_provider}</p>
                </div>
              </div>
              {expandedTracking === track.tracking_number ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            {expandedTracking === track.tracking_number && (
              <div className="border-t p-4">
                {loading[track.tracking_number] ? (
                  <p className="text-muted-foreground text-sm">Loading tracking history...</p>
                ) : trackingHistory[track.tracking_number] ? (
                  <div className="space-y-4">
                    <div>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          trackingHistory[track.tracking_number].global_status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : trackingHistory[track.tracking_number].global_status === 'PROCESSING'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {trackingHistory[track.tracking_number].global_status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {trackingHistory[track.tracking_number].history.map((event, eventIndex) => (
                        <div key={eventIndex} className="flex gap-3 border-l-2 border-primary pl-4">
                          <div className="flex-1">
                            <p className="font-medium">{event.text}</p>
                            <p className="text-muted-foreground text-sm">
                              {event.city} • {new Date(event.date).toLocaleString()}
                            </p>
                            {event.code && (
                              <p className="text-muted-foreground text-xs">Code: {event.code}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Failed to load tracking history</p>
                )}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
