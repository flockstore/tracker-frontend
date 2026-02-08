/**
 * Order Status Enum
 *
 * Represents the current state of an order.
 */
export enum OrderStatus {
  CREATED = 'CREATED',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING',
}

/**
 * Order Item
 *
 * Represents a single product in an order.
 */
export interface OrderItem {
  /** SKU is the Stock Keeping Unit identifier for the product */
  sku: string
  /** Name is the descriptive name of the product */
  name: string
  /** Quantity is the number of units purchased */
  quantity: number
  /** Picture is the URL to an image of the product */
  picture: string
}

/**
 * Tracking Info
 *
 * Contains shipment tracking information for an order.
 */
export interface TrackingInfo {
  /** TrackingNumber is the unique tracking identifier provided by the carrier */
  tracking_number: string
  /** TrackingProvider is the name of the shipping carrier (e.g., coordinadora_co, servientrega_co) */
  tracking_provider: string
}

/**
 * Order
 *
 * Represents a complete order with customer and shipping details.
 */
export interface Order {
  /** ID is the unique identifier for the order */
  order_id: string
  /** FirstName is the first name of the customer */
  name: string
  /** LastName is the last name of the customer */
  last_name: string
  /** Email is the contact email for the customer */
  email: string
  /** Address is the shipping address for the order */
  address: string
  /** City is the city of the shipping address */
  city: string
  /** State is the state or province of the shipping address */
  state: string
  /** PaymentMethod is the payment method used for the order */
  payment_method: string
  /** CreatedAt is the timestamp when the order was created */
  create_date: string
  /** Status represents the current state of the order */
  status: OrderStatus
  /** Items contains the list of products included in the order */
  items: OrderItem[]
  /** Tracking contains shipment tracking information */
  tracking: TrackingInfo[]
}
