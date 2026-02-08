import { StatusAlert } from '@/components/ui/StatusAlert/StatusAlert'
import type { OrderStatusProps } from '../types'

/**
 * OrderStatus Partial Component
 *
 * Displays the current order status using the StatusAlert component.
 * Shows loading state and INCIDENCE badge when applicable.
 *
 * @param {string} status - The current status of the order
 * @param {boolean} isLoading - Whether the status calculation is in progress
 * @param {function} t - Translation function
 */
export const OrderStatus = ({ status, isLoading, t }: OrderStatusProps) => {
  return (
    <div>
      <h3 className="mb-3 font-semibold">{t('status.title')}</h3>
      <StatusAlert
        status={status}
        title={t(`statusSubtitles.${status}`) || status}
        subtitle={t(`statusMessages.${status}`) || t('statusMessages.CREATED')}
        isLoading={isLoading}
        loadingText={t('calculatingStatus')}
        showIncidenceBadge={status === 'INCIDENCE'}
      />
    </div>
  )
}
