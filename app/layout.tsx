import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import '../styles/globals.css'

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
			<body className='bg-white'>
				<div className='flex flex-col min-h-screen'>
					<Navbar />
					<main className='flex-1 flex flex-col'>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}
