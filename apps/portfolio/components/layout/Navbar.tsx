'use client'

import { useState, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Avatar from '../ui/Avatar'
import CommandPalette from '../ui/CommandPalette'
import { githubUrl, linkedInUrl } from '../../lib/data'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Projects', href: '/portfolio' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' },
]

export default function Navbar() {
	const pathname = usePathname()
	const [scrolled, setScrolled] = useState(false)
	const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 30)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<>
			<div className='fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none p-4 sm:p-5'>
				<Disclosure as='nav' className='pointer-events-auto w-full max-w-4xl'>
				{({ open }) => (
					<motion.div
						layout
						className={cn(
							'mx-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
							open ? 'rounded-2xl' : 'rounded-full',
							scrolled
								? 'bg-slate-900/90 backdrop-blur-xl border-slate-700/60 shadow-2xl shadow-black/30'
								: 'bg-slate-900/70 backdrop-blur-md border-slate-800/80 shadow-lg shadow-black/15',
							'border px-3 sm:px-5 py-2'
						)}
						initial={{ y: -80, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
					>
						<div className='flex items-center justify-between h-10 sm:h-11'>
							{/* Left: Brand Identity */}
							<Link
								href='/'
								className='flex items-center gap-2.5 text-white hover:text-indigo-300 transition-colors group'
							>
								<div className='h-8 w-8 overflow-hidden rounded-full border border-slate-700/80 group-hover:border-indigo-500/50 transition-colors flex-shrink-0'>
									<Avatar />
								</div>
								<span className='font-bold text-sm sm:text-base tracking-tight hidden sm:inline'>
									Jeff Hogg
								</span>
							</Link>

							{/* Center: Desktop Nav Links */}
							<div className='hidden md:flex items-center space-x-1'>
								{navigation.map((item) => {
									const isCurrent =
										item.href === '/'
											? pathname === '/'
											: pathname.startsWith(item.href)

									return (
										<Link
											key={item.name}
											href={item.href}
											className={cn(
												'relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200',
												isCurrent
													? 'text-white'
													: 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
											)}
											aria-current={isCurrent ? 'page' : undefined}
										>
											{isCurrent && (
												<motion.span
													layoutId='nav-pill'
													className='absolute inset-0 bg-indigo-600 rounded-full shadow-sm'
													transition={{
														type: 'spring',
														bounce: 0.2,
														duration: 0.5,
													}}
												/>
											)}
											<span className='relative z-10'>{item.name}</span>
										</Link>
									)
								})}
							</div>

							{/* Right: Quick Search, Socials & Mobile Toggle */}
							<div className='flex items-center gap-1.5 sm:gap-2'>
								{/* Search / Command Palette Trigger */}
								<button
									type='button'
									onClick={() => setCommandPaletteOpen(true)}
									className='flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-800/60 hover:text-white hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/40 transition-all cursor-pointer'
									aria-label='Quick Search (Press ⌘K)'
									title='Quick Search (⌘K)'
								>
									<MagnifyingGlassIcon className='w-3.5 h-3.5 text-indigo-400' />
									<span className='hidden lg:inline'>Search</span>
									<kbd className='px-1 py-0.2 text-[10px] font-sans font-semibold rounded bg-slate-700/60 text-slate-300 border border-slate-600/40'>
										⌘K
									</kbd>
								</button>

								{/* Social Icons for Desktop */}
								<div className='hidden sm:flex items-center gap-1 border-l border-slate-800/80 pl-2 ml-1'>
									<a
										href={githubUrl}
										target='_blank'
										rel='noreferrer'
										aria-label='GitHub Profile'
										className='p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors'
									>
										<svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
											<path
												fillRule='evenodd'
												d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
									<a
										href={linkedInUrl}
										target='_blank'
										rel='noreferrer'
										aria-label='LinkedIn Profile'
										className='p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors'
									>
										<svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
											<path
												fillRule='evenodd'
												d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
												clipRule='evenodd'
											/>
										</svg>
									</a>
								</div>

								{/* Mobile Menu Button */}
								<div className='flex md:hidden'>
									<Disclosure.Button className='inline-flex items-center justify-center p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none'>
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<XMarkIcon className='block h-5 w-5' aria-hidden='true' />
										) : (
											<Bars3Icon className='block h-5 w-5' aria-hidden='true' />
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>

						{/* Mobile Menu Panel */}
						<Disclosure.Panel className='md:hidden border-t border-slate-800/80 mt-3 pt-3'>
							<div className='space-y-1 pb-2'>
								{navigation.map((item) => {
									const isCurrent =
										item.href === '/'
											? pathname === '/'
											: pathname.startsWith(item.href)

									return (
										<Disclosure.Button
											key={item.name}
											as={Link}
											href={item.href}
											className={cn(
												isCurrent
													? 'bg-indigo-600 text-white'
													: 'text-slate-300 hover:bg-slate-800 hover:text-white',
												'block rounded-xl px-4 py-2 text-sm font-medium transition-colors'
											)}
											aria-current={isCurrent ? 'page' : undefined}
										>
											{item.name}
										</Disclosure.Button>
									)
								})}
							</div>
							<div className='flex items-center gap-3 pt-3 border-t border-slate-800/80 px-4'>
								<a
									href={githubUrl}
									target='_blank'
									rel='noreferrer'
									className='text-xs text-slate-400 hover:text-white flex items-center gap-1.5 py-1'
								>
									GitHub ↗
								</a>
								<a
									href={linkedInUrl}
									target='_blank'
									rel='noreferrer'
									className='text-xs text-slate-400 hover:text-white flex items-center gap-1.5 py-1'
								>
									LinkedIn ↗
								</a>
							</div>
						</Disclosure.Panel>
					</motion.div>
				)}
			</Disclosure>
		</div>

		<CommandPalette isOpen={commandPaletteOpen} setIsOpen={setCommandPaletteOpen} />
	</>
	)
}
