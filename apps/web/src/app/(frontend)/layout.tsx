import React from 'react'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './styles.css'
import { Navbar } from '@/marketing/components/navigation/Navbar'
import Footer from '@/marketing/components/footer/Footer'
import { queryNavigation } from '@/marketing/utils/queries'
import { mergeOpenGraph } from '@/marketing/utils/mergeOpenGraph'
import { getRequestOrigin } from '@/marketing/utils/getRequestOrigin'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

// Every page is read from the CMS at request time. Railway builds can't reach
// the database (private network), so nothing here may be prerendered.
export const dynamic = 'force-dynamic'

// `metadataBase` from the request, not the build-inlined server url, so a
// build promoted between environments resolves preview images on its own host.
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(await getRequestOrigin()),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
    },
    openGraph: mergeOpenGraph(),
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navData = await queryNavigation()

  return (
    <html lang="en" className={display.variable}>
      <body className="bg-paper text-ink antialiased dark:bg-ink dark:text-paper">
        <Navbar navData={navData} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
