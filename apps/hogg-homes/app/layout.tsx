import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import AppShell from '../components/AppShell'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Hogg Homes | Crafted for Living. Built for Life.',
  description:
    'High-craft residential homebuilder platform featuring Sunbelt master-planned communities, customizable elevation floor plans, and move-in ready homes.',
  keywords: [
    'Hogg Homes',
    'Texas Homebuilder',
    'Houston Communities',
    'DFW Homes',
    'Austin Real Estate',
    'Move In Ready Homes',
    'Floor Plans',
    'Modern Farmhouse',
    'Next.js 16 Real Estate',
  ],
  openGraph: {
    title: 'Hogg Homes | Crafted for Living. Built for Life.',
    description:
      'High-craft residential homebuilder platform with sub-second property filtering, interactive elevation toggles, and VIP tour scheduling.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Hogg Homes',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${mono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-950 font-sans antialiased text-slate-100 flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
