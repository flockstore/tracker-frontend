'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card'
import { Button } from '@/components/ui/Button/Button'
import { ArrowLeft, Package } from 'lucide-react'
import type { Order } from '@/types/domain/Order'
import { TrackingDetails } from './partials/TrackingDetails/TrackingDetails'

/**
 * OrderDetails View Component
 *
 * Displays complete order information including customer details,
 * order items, and tracking information.
 *
 * @returns {JSX.Element} The rendered order details view.
 */
export const OrderDetails = () => {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const orderData = sessionStorage.getItem('currentOrder')
    if (orderData) {
      setOrder(JSON.parse(orderData))
    } else {
      router.push('/')
    }
  }, [router])

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl font-bold">
              Order #{order.order_id}
            </CardTitle>
            <CardDescription>
              Placed on {new Date(order.create_date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="mb-2 font-semibold">Customer Information</h3>
              <div className="text-muted-foreground space-y-1 text-sm">
                <p>
                  {order.name} {order.last_name}
                </p>
                <p>{order.email}</p>
                <p>{order.address}</p>
                <p>
                  {order.city}, {order.state}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="mb-3 font-semibold">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
                    {item.picture ? (
                      <img
                        src={item.picture}
                        alt={item.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                    ) : (
                      <div className="bg-muted flex h-16 w-16 items-center justify-center rounded">
                        <Package className="text-muted-foreground h-8 w-8" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-sm">SKU: {item.sku}</p>
                    </div>
                    <div className="text-muted-foreground text-sm">Qty: {item.quantity}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="mb-2 font-semibold">Payment Method</h3>
              <p className="text-muted-foreground text-sm">{order.payment_method}</p>
            </div>

            {/* Order Status */}
            <div>
              <h3 className="mb-2 font-semibold">Order Status</h3>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  order.status === 'SHIPPED'
                    ? 'bg-blue-100 text-blue-800'
                    : order.status === 'CREATED'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'CANCELLED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.status}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Information */}
        {order.tracking && order.tracking.length > 0 && (
          <TrackingDetails tracking={order.tracking} />
        )}
      </div>
    </div>
  )
}
