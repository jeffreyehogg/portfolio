'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EnvelopeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { githubUrl, linkedInUrl, twitterUrl } from '../../lib/data'

const navigation = {
	main: [
		{ name: 'Home', href: '/' },
		{ name: 'Projects', href: '/portfolio' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' },
	],
	social: [
		{
			name: 'LinkedIn',
			href: linkedInUrl,
			icon: (props: React.SVGProps<SVGSVGElement>) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path
						fillRule='evenodd'
						d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
						clipRule='evenodd'
					/>
				</svg>
			),
		},
		{
			name: 'GitHub',
			href: githubUrl,
			icon: (props: React.SVGProps<SVGSVGElement>) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path
						fillRule='evenodd'
						d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
						clipRule='evenodd'
					/>
				</svg>
			),
		},
		{
			name: 'X',
			href: twitterUrl,
			icon: (props: React.SVGProps<SVGSVGElement>) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
				</svg>
			),
		},
	],
}

export default function Footer() {
	const pathname = usePathname()
	const isContactPage = pathname === '/contact'

	return (
		<footer className='bg-[#F3F2EE] border-t border-stone-200/90 relative z-10'>
			<div className='max-w-7xl mx-auto py-14 sm:py-16 px-4 sm:px-6 lg:px-8'>
				{/* Editorial Pre-Footer CTA Card (hidden on /contact) */}
				{!isContactPage && (
					<div className='mb-14 rounded-2xl bg-white border border-stone-200/90 p-7 sm:p-10 shadow-[0_1px_2px_rgba(17,17,16,0.04)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6'>
						<div className='max-w-2xl'>
							<div className='flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gblue-600 mb-3'>
								<span className='h-1.5 w-1.5 rounded-full bg-emerald-600 motion-safe:animate-pulse shrink-0' />
								<span>Open to engineering discussions</span>
							</div>
							<h2 className='text-2xl sm:text-3xl font-semibold text-stone-950 tracking-[-0.025em] text-balance'>
								Let&apos;s build something{' '}
								<span className='font-serif italic font-normal text-gblue-600'>
									together.
								</span>
							</h2>
							<p className='mt-2.5 text-sm sm:text-base text-stone-600 leading-relaxed text-pretty'>
								Have a web app, native iOS project, or API integration in mind? Send a message directly through my contact form.
							</p>
						</div>

						<div className='flex flex-wrap items-center gap-3 shrink-0'>
							<Link
								href='/contact'
								className='inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium text-white bg-stone-950 hover:bg-gblue-600 transition-colors duration-200 active:scale-[0.98]'
							>
								<EnvelopeIcon className='w-4 h-4' />
								Send a message
							</Link>
							<a
								href='/Jeff_Hogg_Resume.pdf'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium text-stone-700 bg-[#FAFAF8] hover:bg-stone-100 hover:border-stone-300 hover:text-stone-950 border border-stone-200/90 transition-colors duration-200 active:scale-[0.98]'
							>
								<ArrowDownTrayIcon className='w-4 h-4 text-stone-500' />
								Resume PDF
							</a>
						</div>
					</div>
				)}

				{/* Bottom Footer Bar */}
				<div className='flex flex-col sm:flex-row items-center justify-between gap-6'>
					<nav
						className='flex flex-wrap justify-center sm:justify-start gap-x-7 gap-y-2'
						aria-label='Footer'
					>
						{navigation.main.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='text-sm text-stone-600 hover:text-stone-950 transition-colors duration-200 font-medium'
							>
								{item.name}
							</Link>
						))}
					</nav>

					<div className='flex items-center gap-2.5'>
						{navigation.social.map((item) => (
							<a
								key={item.name}
								href={item.href}
								aria-label={item.name}
								target='_blank'
								rel='noreferrer'
								className='p-2.5 rounded-full bg-white border border-stone-200/90 text-stone-600 hover:text-stone-950 hover:border-stone-400 transition-colors duration-200'
							>
								<item.icon className='h-4 w-4' aria-hidden='true' />
							</a>
						))}
					</div>
				</div>

				{/* Copyright */}
				<div className='mt-8 border-t border-stone-200/90 pt-6 pb-10 sm:pb-0 sm:pr-14 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500'>
					<p>&copy; {new Date().getFullYear()} Jeff Hogg. All rights reserved.</p>
					<p className='font-mono text-[11px] text-stone-500'>
						Built with Next.js, TypeScript &amp; Tailwind CSS.
					</p>
				</div>
			</div>
		</footer>
	)
}
