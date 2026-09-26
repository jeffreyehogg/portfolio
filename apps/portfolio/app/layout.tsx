import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/ui/ScrollProgress'
import ScrollToTop from '../components/ui/ScrollToTop'
import StructuredData from '../components/seo/StructuredData'
import '../styles/globals.css'

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})

export const viewport: Viewport = {
	themeColor: '#020617',
	width: 'device-width',
	initialScale: 1,
}

export const metadata: Metadata = {
	metadataBase: new URL('https://www.jeffhogg.com'),
	title: {
		default: 'Jeff Hogg | Full-Stack Developer & Systems Architect',
		template: '%s | Jeff Hogg',
	},
	description:
		'Full-Stack Developer at LGI Homes specializing in DevOps automation, system architecture, API middleware, and modern database tuning.',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'Jeff Hogg | Full-Stack Developer & Systems Architect',
		description:
			'Full-Stack Developer at LGI Homes specializing in DevOps automation, system architecture, API middleware, and modern database tuning.',
		url: 'https://www.jeffhogg.com/',
		siteName: 'Jeff Hogg',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Jeff Hogg | Full-Stack Developer & Systems Architect',
		description:
			'Full-Stack Developer at LGI Homes specializing in DevOps automation, system architecture, API middleware, and modern database tuning.',
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
		<html lang='en' className={`${inter.variable}`}>
			<body className='bg-slate-950 font-sans antialiased text-slate-100'>
				<a
					href='#main-content'
					className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none'
				>
					Skip to main content
				</a>
				<StructuredData />
				<ScrollProgress />
				<div className='flex flex-col min-h-screen'>
					<Navbar />
					<main id='main-content' className='flex-1 flex flex-col'>{children}</main>
					<Footer />
				</div>
				<ScrollToTop />
			</body>
		</html>
	)
}
