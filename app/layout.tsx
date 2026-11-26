import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Newsreader, JetBrains_Mono } from 'next/font/google'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/ui/ScrollProgress'
import ScrollToTop from '../components/ui/ScrollToTop'
import StructuredData from '../components/seo/StructuredData'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import '../styles/globals.css'

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
})

const newsreader = Newsreader({
	subsets: ['latin'],
	weight: ['400', '500'],
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-serif',
})

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-mono',
})

export const viewport: Viewport = {
	themeColor: '#FAFAF8',
	width: 'device-width',
	initialScale: 1,
}

export const metadata: Metadata = {
	metadataBase: new URL('https://www.jeffhogg.com'),
	title: {
		default: 'Jeff Hogg | Software Engineer',
		template: '%s | Jeff Hogg',
	},
	description:
		'Software Engineer building full-stack web applications (TypeScript, Angular, React, Next.js), native Swift iOS apps, REST APIs, and SQL-backed services.',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'Jeff Hogg | Software Engineer',
		description:
			'Software Engineer building full-stack web applications (TypeScript, Angular, React, Next.js), native Swift iOS apps, REST APIs, and SQL-backed services.',
		url: 'https://www.jeffhogg.com/',
		siteName: 'Jeff Hogg',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Jeff Hogg | Software Engineer',
		description:
			'Software Engineer building full-stack web applications (TypeScript, Angular, React, Next.js), native Swift iOS apps, REST APIs, and SQL-backed services.',
		creator: '@jeffehogg',
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
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='en'
			className={`${plusJakarta.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
		>
			<body className='bg-[#FAFAF8] font-sans antialiased text-[#111110]'>
				<a
					href='#main-content'
					className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-stone-950 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none'
				>
					Skip to main content
				</a>
				<StructuredData />
				<ScrollProgress />
				<div className='flex flex-col min-h-screen'>
					<Navbar />
					<main id='main-content' className='flex-1 flex flex-col'>
						<NuqsAdapter>{children}</NuqsAdapter>
					</main>
					<Footer />
				</div>
				<ScrollToTop />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
