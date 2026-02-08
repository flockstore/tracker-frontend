import { useTranslations } from 'next-intl'

/**
 * The main page component for the application.
 * Renders the home page content using internationalized messages.
 *
 * @returns {JSX.Element} The rendered home page.
 */
const Page = () => {
  const t = useTranslations('HomePage')
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold font-display">{t('title')}</h1>
    </div>
  )
}

export default Page
