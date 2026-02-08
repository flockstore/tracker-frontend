import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card'
import { TrackingForm } from './partials/TrackingForm/TrackingForm'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

/**
 * Tracking View Component
 *
 * The main view for the tracking page. It renders a centered card containing
 * the tracking form and descriptive text.
 */
export const Tracking = () => {
  const t = useTranslations('Tracking')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Card with title and form */}
        {/* Logo - Outside and centered above the card */}
        <div className="flex items-center justify-center">
          <Image
            src="/flock_logo.svg"
            alt="Flock Store"
            width={120}
            height={48}
            className="h-0 w-auto my-5"
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl font-bold">{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <TrackingForm />
          </CardContent>
        </Card>
        {/* Logo - Outside and centered above the card */}
        <div className="flex items-center justify-center">
          <Image
            src="/flock_spiral.svg"
            alt="Flock Store"
            width={120}
            height={48}
            className="h-10 w-auto my-5"
          />
        </div>
      </div>
    </div>
  )
}
