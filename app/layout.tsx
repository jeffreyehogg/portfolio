import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoogleAnalytics from '../components/GoogleAnalytics'
import '../styles/globals.css'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
	title: 'Jeff Hogg - Software Developer',
	description: 'A personal portfolio Website. Built with Next.js and Tailwind',
	openGraph: {
		title: 'Jeff Hogg',
		description:
			'A personal portfolio Website. Built with Next.js and Tailwind',
		url: 'https://jeffhogg.com/',
		type: 'website',
		images: [
			{
				url: 'https://jeffhogg.com/images/portfolio.png',
			},
		],
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className={inter.className}>
			<Suspense fallback={null}>
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
			</Suspense>

			<body>
				<div className='flex flex-col h-screen'>
					<Navbar />
					<main className='flex-1'>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}
