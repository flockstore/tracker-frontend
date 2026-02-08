import React from 'react'

const useTranslations = () => (key: string) => key

const NextIntlClientProvider = ({ children }: { children: React.ReactNode }) => children

export { useTranslations, NextIntlClientProvider }
