import { AlertTriangle, Info, AlertOctagon } from 'lucide-react'
import type { Banner } from '@/types/domain/Banner'

export interface SystemBannerProps {
  banner: Banner | null
}

/**
 * SystemBanner Component
 *
 * Displays a site-wide banner alert based on the Banner type.
 * - INFO: Blue
 * - WARNING: Yellow
 * - DANGER: Red
 */
export const SystemBanner = ({ banner }: SystemBannerProps) => {
  if (!banner) return null

  const getStyles = () => {
    switch (banner.type) {
      case 'INFO':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: <Info className="h-5 w-5 text-blue-600" />,
        }
      case 'WARNING':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
        }
      case 'DANGER':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: <AlertOctagon className="h-5 w-5 text-red-600" />,
        }
      default:
        return {
          container: 'bg-gray-50 border-gray-200 text-gray-800',
          icon: <Info className="h-5 w-5 text-gray-600" />,
        }
    }
  }

  const styles = getStyles()

  return (
    <div className={`mb-6 rounded-lg border p-4 ${styles.container}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{styles.icon}</div>
        <div>
          <h3 className="font-semibold">{banner.title}</h3>
          <p className="text-sm opacity-90">{banner.subtitle}</p>
        </div>
      </div>
    </div>
  )
}
