import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import PlausibleProvider from 'next-plausible'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  openGraph: {
    title: 'ThrottleIQ',
    siteName: 'ThrottleIQ',
    url: 'https://throttle-iq.vercel.app/',
    description: 'Personalized Calculations Based on Your Bike and Performance',
    images: [{ url: 'https://throttle-iq.vercel.app/og.png' }]
  },
  title: 'ThrottleIQ',
  description: 'Personalized Calculations Based on Your Bike and Performance',
  robots: { index: true, follow: true }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <PlausibleProvider domain="throttle-iq.vercel.app/">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <div className="mx-auto max-w-6xl w-11/12 py-6">{children}</div>
          <Toaster />
        </body>
      </PlausibleProvider>
    </html>
  )
}
