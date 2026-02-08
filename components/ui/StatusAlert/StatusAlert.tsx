import {
  CheckCircle2,
  Truck,
  XCircle,
  AlertCircle,
  RotateCcw,
  PackageCheck,
  Loader2,
} from 'lucide-react'

export interface StatusAlertProps {
  status: string
  title?: string
  subtitle?: string
  isLoading?: boolean
  loadingText?: string
  showIncidenceBadge?: boolean
}

/**
 * StatusAlert Component
 *
 * Displays a non-collapsible status alert with an icon, badge, and subtitle.
 * Matches the design of tracking information cards.
 */
export const StatusAlert = ({
  status,
  subtitle,
  title,
  isLoading = false,
  loadingText = 'Loading...',
  showIncidenceBadge = false,
}: StatusAlertProps) => {
  const getStatusIcon = () => {
    if (isLoading) {
      return <Loader2 className="h-5 w-5 animate-spin" />
    }

    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'SHIPPED':
        return <Truck className="h-5 w-5 text-blue-600" />
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'RETURN':
        return <RotateCcw className="h-5 w-5 text-orange-600" />
      case 'INCIDENCE':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <PackageCheck className="h-5 w-5 text-green-600" />
    }
  }

  const getStatusBadgeClasses = () => {
    switch (status) {
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800'
      case 'CREATED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'RETURN':
        return 'bg-orange-100 text-orange-800'
      case 'INCIDENCE':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="rounded-lg border">
      <div className="flex items-center gap-3 p-4">
        {getStatusIcon()}
        <div className="flex-1">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">{loadingText}</p>
          ) : (
            <>
              <p className="font-medium">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClasses()}`}
                >
                  {title || status}
                </span>
                {showIncidenceBadge && (
                  <span className="ml-2 inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                    INCIDENCE
                  </span>
                )}
              </p>
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
