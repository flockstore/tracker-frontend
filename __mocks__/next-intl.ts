import React from 'react'

const useTranslations = () => (key: string) => {
  const messages: Record<string, string> = {
    'fields.orderNumber.label': 'Order Number',
    'fields.orderNumber.placeholder': 'Enter order number',
    'fields.email.label': 'Email',
    'fields.email.placeholder': 'Enter email address',
    submit: 'Track Order',
    title: 'Track Your Order',
    description: 'Enter your order details below to check the status.',
  }
  return messages[key] || key
}

const NextIntlClientProvider = ({ children }: { children: React.ReactNode }) => children

export { useTranslations, NextIntlClientProvider }
