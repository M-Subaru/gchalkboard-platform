import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Global Chalkboard | UK Teachers for Gulf Schools',
    template: '%s | Global Chalkboard',
  },
  description:
    'Global Chalkboard connects UK-qualified teachers with international schools across the Gulf region. Free for teachers. Vetted, prepared, placed.',
  metadataBase: new URL('https://gchalkboard.com'),
  openGraph: {
    siteName: 'Global Chalkboard',
    title: 'Global Chalkboard | UK Teachers for Gulf Schools',
    description:
      'Connecting UK-qualified teachers with international schools in Saudi Arabia, Kuwait, Qatar, Bahrain and Oman. Free for teachers. Pay only on placement.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://gchalkboard.com',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Global Chalkboard | UK Teachers for Gulf Schools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Chalkboard | UK Teachers for Gulf Schools',
    description:
      'Connecting UK-qualified teachers with international schools across the Gulf region.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
