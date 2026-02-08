import { useState } from 'react'
import Image from 'next/image'
import { Package, ChevronDown, ChevronUp } from 'lucide-react'
import type { OrderItemsProps } from '../types'

/**
 * OrderItems Partial Component
 *
 * Displays order items with responsive behavior:
 * - Mobile: Collapsible tracking-style card with item count
 * - Desktop: Always visible list
 */
export const OrderItems = ({ items, t }: OrderItemsProps) => {
  const [expandedItems, setExpandedItems] = useState(true)

  return (
    <div>
      <h3 className="mb-3 font-semibold md:block hidden">{t('items.title')}</h3>

      {/* Mobile: Collapsible tracking-style card */}
      <div className="md:hidden">
        <div className="rounded-lg border">
          <button
            onClick={() => setExpandedItems(!expandedItems)}
            className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5" />
              <div>
                <p className="font-medium">{t('items.title')}</p>
                <p className="text-muted-foreground text-sm">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {expandedItems ? (
                <ChevronUp className="text-muted-foreground h-5 w-5" />
              ) : (
                <ChevronDown className="text-muted-foreground h-5 w-5" />
              )}
            </div>
          </button>
          {expandedItems && (
            <div className="border-t p-4">
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
                    {item.picture ? (
                      <Image
                        src={item.picture}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded object-cover"
                      />
                    ) : (
                      <div className="bg-muted flex h-16 w-16 items-center justify-center rounded">
                        <Package className="text-muted-foreground h-8 w-8" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {t('items.sku')}: {item.sku}
                      </p>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {t('items.qty')}: {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
              {item.picture ? (
                <Image
                  src={item.picture}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded object-cover"
                />
              ) : (
                <div className="bg-muted flex h-16 w-16 items-center justify-center rounded">
                  <Package className="text-muted-foreground h-8 w-8" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground text-sm">
                  {t('items.sku')}: {item.sku}
                </p>
              </div>
              <div className="text-muted-foreground text-sm">
                {t('items.qty')}: {item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
