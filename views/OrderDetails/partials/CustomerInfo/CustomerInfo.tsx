import type { CustomerInfoProps } from '../types'

/**
 * CustomerInfo Partial Component
 *
 * Displays customer information including name, email, and address.
 */
export const CustomerInfo = ({
  name,
  lastName,
  email,
  address,
  city,
  state,
  t,
}: CustomerInfoProps) => {
  return (
    <div>
      <h3 className="mb-2 font-semibold">{t('customerInfo.title')}</h3>
      <div className="text-muted-foreground space-y-1 text-sm">
        <p>
          {name} {lastName}
        </p>
        <p>{email}</p>
        <p>{address}</p>
        <p>
          {city}, {state}
        </p>
      </div>
    </div>
  )
}
