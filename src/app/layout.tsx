import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header } from '@/components'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import Head from 'next/head'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'ThrottleIQ',
  description: 'Personalized Calculations Based on Your Bike and Performance',
  openGraph: {
    title: 'ThrottleIQ',
    description: 'Personalized Calculations Based on Your Bike and Performance',
    images: ['/og.png']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <script
          defer
          data-domain="throttle-iq.vercel.app"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="mx-auto max-w-6xl w-11/12 py-6">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
