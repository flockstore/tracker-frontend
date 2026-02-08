import type { PaymentMethodProps } from '../types'

/**
 * PaymentMethod Partial Component
 *
 * Displays the payment method used for the order.
 */
export const PaymentMethod = ({ paymentMethod, t }: PaymentMethodProps) => {
  return (
    <div>
      <h3 className="mb-2 font-semibold">{t('payment.title')}</h3>
      <p className="text-muted-foreground text-sm">{paymentMethod}</p>
    </div>
  )
}
