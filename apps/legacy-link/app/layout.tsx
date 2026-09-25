import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs' // Import ClerkProvider

export const metadata = {
  metadataBase: new URL('https://legacy-link.jeffhogg.com/'),
  title: 'Legacy Link',
  description:
    'Legacy Link',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
        process.env.CLERK_PUBLISHABLE_KEY ||
        'pk_test_cHJvcGVyLWJ1Zy02LmNsZXJrLmFjY291bnRzLmRldiQ'
      }
    >
      <html lang="en">
        <body className={inter.variable}>{children}</body>
      </html>
    </ClerkProvider>
  )
}