import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card'
import { TrackingForm } from './partials/TrackingForm/TrackingForm'
import { useTranslations } from 'next-intl'

/**
 * Tracking View Component
 *
 * The main view for the tracking page. It renders a centered card containing
 * the tracking form and descriptive text.
 *
 * @returns {JSX.Element} The rendered tracking view.
 */
export const Tracking = () => {
  const t = useTranslations('Tracking')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-display text-2xl font-bold">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <TrackingForm />
        </CardContent>
      </Card>
    </div>
  )
}
