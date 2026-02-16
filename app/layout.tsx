import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ScrollProgress from '../components/ui/ScrollProgress'
import ScrollToTop from '../components/ui/ScrollToTop'
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
	title: {
		default: 'Jeff Hogg - Software Developer',
		template: '%s | Jeff Hogg',
	},
	description:
		'Software Engineer & Solutions Lead specializing in TypeScript, React, Angular, and Next.js. Previously at Cisco.',
	metadataBase: new URL('https://jeffhogg.com'),
	openGraph: {
		title: 'Jeff Hogg - Software Developer',
		description:
			'Software Engineer & Solutions Lead specializing in TypeScript, React, Angular, and Next.js.',
		url: 'https://jeffhogg.com/',
		siteName: 'Jeff Hogg',
		type: 'website',
		locale: 'en_US',
		images: [
			{
				url: '/images/portfolio.png',
				width: 1200,
				height: 630,
				alt: 'Jeff Hogg Portfolio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Jeff Hogg - Software Developer',
		description:
			'Software Engineer & Solutions Lead specializing in TypeScript, React, Angular, and Next.js.',
		creator: '@jeffreyehogg',
		images: ['/images/portfolio.png'],
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
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className={`${inter.variable}`}>
			<body className='bg-slate-950 font-sans antialiased text-slate-100'>
				<ScrollProgress />
				<div className='flex flex-col min-h-screen'>
					<Navbar />
					<main className='flex-1 flex flex-col'>{children}</main>
					<Footer />
				</div>
				<ScrollToTop />
			</body>
		</html>
	)
}
