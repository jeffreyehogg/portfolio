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

const baseUrl = 'https://legacy-link.jeffhogg.com'

export const viewport: Viewport = {
  themeColor: '#020617',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Legacy Link | Physical Security PACS Data Migration Middleware',
    template: '%s | Legacy Link',
  },
  description:
    'Automated physical access control (PACS) migration middleware. Transform legacy cardholder, badge, and clearance exports from Lenel OnGuard, DNA Fusion, AMAG, and C•CURE into verified Genetec Security Center schemas with zero corrupted badge IDs.',
  applicationName: 'Legacy Link',
  authors: [{ name: 'Jeff Hogg', url: 'https://jeffhogg.com' }],
  creator: 'Jeff Hogg',
  publisher: 'Jeff Hogg',
  keywords: [
    'Physical Security Migration',
    'PACS Middleware',
    'Genetec Security Center Import',
    'Lenel OnGuard Migration',
    'DNA Fusion Cardholder Export',
    'AMAG Symmetry Data Migration',
    'Software House CCURE 9000',
    'Wiegand 26-bit Credential Mapping',
    'Badge Number Standardization',
    'Access Control ETL',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Legacy Link | Physical Security PACS Data Migration Middleware',
    description:
      'Transform legacy access control datasets into clean Genetec schemas in under 90 seconds. Universal CSV ingestion, visual schema mapping, and automated field transformation.',
    url: baseUrl,
    siteName: 'Legacy Link',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Legacy Link - Enterprise PACS Data Migration Middleware',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legacy Link | Physical Security PACS Data Migration Middleware',
    description:
      'Enterprise middleware for physical security migrations (Lenel, DNA Fusion, AMAG to Genetec Security Center).',
    creator: '@jeffehogg',
    images: ['/opengraph-image.png'],
  },
}

function LegacyLinkJsonLd() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Legacy Link',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Web Browser / Cloud Middleware',
    url: baseUrl,
    description:
      'Enterprise physical security ETL middleware designed to sanitize, map, and migrate badge credentials and cardholder identities from legacy PACS into Genetec Security Center schemas.',
    author: {
      '@type': 'Person',
      name: 'Jeff Hogg',
      url: 'https://jeffhogg.com',
      jobTitle: 'Solo Technical Lead & Full-Stack Architect',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Universal CSV Ingestion for Physical Access Control Systems',
      'Interactive Column to Attribute Schema Mapper',
      'Multi-Field Concatenation and Wiegand Bit Normalizer',
      'Genetec Security Center Standardized CSV Exporter',
      '26-bit Wiegand Birthday Paradox Collision Probability Estimator',
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Migrate Legacy Access Control Records to Genetec Security Center',
    description: 'A 3-step automated data sanitization and schema mapping pipeline.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Export Legacy Access Records',
        text: 'Export raw cardholder, badge ID, and access level data from Lenel OnGuard, DNA Fusion, AMAG Symmetry, or C•CURE 9000 as a CSV file.',
      },
      {
        '@type': 'HowToStep',
        name: 'Map and Transform Attributes',
        text: 'Upload CSV to Legacy Link and map legacy column headers to standard Genetec target attributes, applying concatenation rules and Wiegand formatting.',
      },
      {
        '@type': 'HowToStep',
        name: 'Export Standardized Genetec CSV',
        text: 'Download the sanitized, validated CSV file ready for immediate 1-click ingestion into Genetec Security Center Config Tool.',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  )
}

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
      appearance={{
        variables: {
          colorPrimary: '#6366f1',
          colorBackground: '#090d16',
          colorText: '#f8fafc',
          colorInputBackground: '#020617',
          colorInputText: '#f8fafc',
        },
      }}
    >
      <html lang="en" className="dark">
        <head>
          <LegacyLinkJsonLd />
        </head>
        <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-slate-950 text-slate-100 antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}