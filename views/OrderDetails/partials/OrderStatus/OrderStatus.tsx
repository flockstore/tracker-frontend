import { StatusAlert } from '@/components/ui/StatusAlert/StatusAlert'
import type { OrderStatusProps } from '../types'

/**
 * OrderStatus Partial Component
 *
 * Displays the current order status using the StatusAlert component.
 * Shows loading state and INCIDENCE badge when applicable.
 */
export const OrderStatus = ({ status, isLoading, t }: OrderStatusProps) => {
  return (
    <div>
      <h3 className="mb-3 font-semibold">{t('status.title')}</h3>
      <StatusAlert
        status={status}
        subtitle={t(`statusSubtitles.${status}`) || t('statusSubtitles.CREATED')}
        isLoading={isLoading}
        loadingText={t('calculatingStatus')}
        showIncidenceBadge={status === 'RETURN' || status === 'INCIDENCE'}
      />
    </div>
  )
}
