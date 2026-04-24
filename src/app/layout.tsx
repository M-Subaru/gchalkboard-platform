import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Global Chalkboard -- UK Teachers for Gulf Schools',
    template: '%s | Global Chalkboard',
  },
  description:
    'Global Chalkboard connects UK-qualified teachers with international schools across the Gulf region. Free for teachers. Vetted, prepared, placed.',
  metadataBase: new URL('https://gchalkboard.com'),
  openGraph: {
    siteName: 'Global Chalkboard',
    type: 'website',
    locale: 'en_GB',
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
