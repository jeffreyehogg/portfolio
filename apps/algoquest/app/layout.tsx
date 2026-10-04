import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

const baseUrl = 'https://algoquest.jeffhogg.com'

export const viewport: Viewport = {
  themeColor: '#030712',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'AlgoQuest | Gamified Coding & Algorithmic Adventure Platform',
    template: '%s | AlgoQuest',
  },
  description:
    'Master algorithms, data structures, and spatial computational logic through interactive visual quests, real-time sandboxed code execution, and dynamic challenges.',
  applicationName: 'AlgoQuest',
  authors: [{ name: 'Jeff Hogg', url: 'https://jeffhogg.com' }],
  creator: 'Jeff Hogg',
  publisher: 'Jeff Hogg',
  keywords: [
    'AlgoQuest',
    'Gamified Coding',
    'Algorithm Challenges',
    'Pyodide WebAssembly',
    'Interactive Code Learning',
    'Data Structures',
    'TypeScript Coding Game',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'AlgoQuest | Gamified Coding & Algorithmic Adventure Platform',
    description:
      'Master algorithms, data structures, and spatial computational logic through interactive visual quests and real-time in-browser code execution.',
    url: baseUrl,
    siteName: 'AlgoQuest',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoQuest | Gamified Coding Platform',
    description: 'Master algorithms through interactive quests and sandboxed code execution.',
    creator: '@jeffehogg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const publishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    process.env.CLERK_PUBLISHABLE_KEY ||
    'pk_test_cHJvcGVyLWJ1Zy02LmNsZXJrLmFjY291bnRzLmRldiQ'

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        variables: {
          colorPrimary: '#10b981',
          colorBackground: '#0b1120',
          colorText: '#f8fafc',
          colorInputBackground: '#030712',
          colorInputText: '#f8fafc',
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-slate-950 text-slate-100 min-h-screen antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
