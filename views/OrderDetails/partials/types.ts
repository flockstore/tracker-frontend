import type { OrderItem } from '@/types/domain/Order'

/**
 * Props for the OrderStatus partial component
 */
export interface OrderStatusProps {
  status: string
  isLoading: boolean
  t: (key: string) => string
}

/**
 * Props for the OrderItems partial component
 */
export interface OrderItemsProps {
  items: OrderItem[]
  t: (key: string) => string
}

/**
 * Props for the CustomerInfo partial component
 */
export interface CustomerInfoProps {
  name: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  t: (key: string) => string
}

/**
 * Props for the PaymentMethod partial component
 */
export interface PaymentMethodProps {
  paymentMethod: string
  t: (key: string) => string
}
