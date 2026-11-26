'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Avatar from '../ui/Avatar'
import { githubUrl, linkedInUrl } from '../../lib/data'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '../../lib/utils'

const CommandPalette = dynamic(() => import('../ui/CommandPalette'), {
	ssr: false,
})

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
		const onScroll = () => setScrolled(window.scrollY > 24)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault()
				setCommandPaletteOpen((prev) => !prev)
			}
		}
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [])

	return (
		<>
			<div className='fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none p-3.5 sm:p-5'>
				<Disclosure as='nav' className='pointer-events-auto w-full max-w-4xl'>
					{({ open }) => (
						<div
							className={cn(
								'mx-auto transition-[background-color,border-color,box-shadow] duration-200 border px-3 sm:px-5 py-2',
								open ? 'rounded-2xl' : 'rounded-full',
								scrolled || open
									? 'bg-white/95 backdrop-blur-xl border-stone-200/95 shadow-[0_8px_30px_-12px_rgba(17,17,16,0.14)]'
									: 'bg-[#FAFAF8]/90 backdrop-blur-md border-stone-200/80 shadow-[0_2px_10px_-4px_rgba(17,17,16,0.06)]'
							)}
						>
							<div className='flex items-center justify-between h-10 sm:h-11'>
								{/* Left: Brand Identity */}
								<Link
									href='/'
									className='flex items-center gap-2.5 text-stone-950 hover:text-indigo-600 transition-colors group'
								>
									<div className='h-8 w-8 overflow-hidden rounded-full border border-stone-200 group-hover:border-stone-400 transition-colors flex-shrink-0'>
										<Avatar />
									</div>
									<span className='font-semibold text-sm sm:text-[15px] tracking-tight hidden sm:inline'>
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
														? 'text-white bg-stone-950 shadow-sm'
														: 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
												)}
												aria-current={isCurrent ? 'page' : undefined}
											>
												{item.name}
											</Link>
										)
									})}
								</div>

								{/* Right: Quick Search, Socials & Mobile Toggle */}
								<div className='flex items-center gap-1.5 sm:gap-2'>
									<button
										type='button'
										onClick={() => setCommandPaletteOpen(true)}
										className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs text-stone-600 bg-stone-100/90 hover:text-stone-950 hover:bg-stone-200/70 border border-stone-200/90 active:scale-[0.98] transition-colors cursor-pointer'
										aria-label='Quick Search (Press ⌘K)'
										title='Quick Search (⌘K)'
									>
										<MagnifyingGlassIcon className='w-3.5 h-3.5 text-stone-500' />
										<span className='hidden md:inline font-medium'>Search</span>
										<kbd className='px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-white text-stone-600 border border-stone-200'>
											⌘K
										</kbd>
									</button>

									{/* Social Icons for Desktop */}
									<div className='hidden sm:flex items-center gap-0.5 border-l border-stone-200 pl-2 ml-1'>
										<a
											href={githubUrl}
											target='_blank'
											rel='noreferrer'
											aria-label='GitHub Profile'
											className='p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-100 transition-colors'
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
											className='p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-100 transition-colors'
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
										<DisclosureButton className='inline-flex items-center justify-center p-1.5 rounded-full text-stone-600 hover:text-stone-950 hover:bg-stone-100 focus:outline-none'>
											<span className='sr-only'>Open main menu</span>
											{open ? (
												<XMarkIcon className='block h-5 w-5' aria-hidden='true' />
											) : (
												<Bars3Icon className='block h-5 w-5' aria-hidden='true' />
											)}
										</DisclosureButton>
									</div>
								</div>
							</div>

							{/* Mobile Menu Panel */}
							<DisclosurePanel className='md:hidden border-t border-stone-200/80 mt-3 pt-3'>
								<div className='space-y-1 pb-2'>
									{navigation.map((item) => {
										const isCurrent =
											item.href === '/'
												? pathname === '/'
												: pathname.startsWith(item.href)

										return (
											<DisclosureButton
												key={item.name}
												as={Link}
												href={item.href}
												className={cn(
													isCurrent
														? 'bg-stone-950 text-white'
														: 'text-stone-700 hover:bg-stone-100 hover:text-stone-950',
													'block rounded-xl px-4 py-2 text-sm font-medium transition-colors'
												)}
												aria-current={isCurrent ? 'page' : undefined}
											>
												{item.name}
											</DisclosureButton>
										)
									})}
								</div>
								<div className='flex items-center gap-4 pt-3 border-t border-stone-200/80 px-4'>
									<a
										href={githubUrl}
										target='_blank'
										rel='noreferrer'
										className='text-xs font-medium text-stone-600 hover:text-stone-950 flex items-center gap-1 py-1'
									>
										GitHub ↗
									</a>
									<a
										href={linkedInUrl}
										target='_blank'
										rel='noreferrer'
										className='text-xs font-medium text-stone-600 hover:text-stone-950 flex items-center gap-1 py-1'
									>
										LinkedIn ↗
									</a>
								</div>
							</DisclosurePanel>
						</div>
					)}
				</Disclosure>
			</div>

			{commandPaletteOpen && (
				<CommandPalette
					isOpen={commandPaletteOpen}
					setIsOpen={setCommandPaletteOpen}
				/>
			)}
		</>
	)
}
