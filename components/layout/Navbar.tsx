'use client'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Avatar from '../ui/Avatar'
import { githubUrl, linkedInUrl, twitterUrl } from '../../lib/data'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Portfolio', href: '/portfolio' },
	{ name: 'Broadcasting', href: '/broadcasting' },
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' },
]

export default function Navbar() {
	const pathname = usePathname()

	return (
		<div className='fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none p-4 sm:p-6'>
			<Disclosure as='nav' className='pointer-events-auto w-full max-w-5xl'>
				{({ open }) => (
					<motion.div
						layout
						className={cn(
							'mx-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
							open ? 'rounded-3xl' : 'rounded-full',
							'bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-indigo-500/10',
						)}
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6 }}
					>
						<div className='px-4 sm:px-6'>
							<div className='relative flex items-center justify-between h-14 sm:h-16'>
								{/* Mobile menu button */}
								<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
									<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
										) : (
											<Bars3Icon className='block h-6 w-6' aria-hidden='true' />
										)}
									</Disclosure.Button>
								</div>

								{/* Desktop Navigation Links */}
								<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
									<div className='hidden sm:flex space-x-1'>
										{navigation.map((item) => {
											const isCurrent = pathname === item.href
											return (
												<Link
													key={item.name}
													href={item.href}
													className={cn(
														'relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200',
														isCurrent
															? 'text-white'
															: 'text-slate-400 hover:text-white hover:bg-white/5',
													)}
													aria-current={isCurrent ? 'page' : undefined}
												>
													{isCurrent && (
														<motion.span
															layoutId='nav-pill'
															className='absolute inset-0 bg-white/10 rounded-full'
															transition={{
																type: 'spring',
																bounce: 0.2,
																duration: 0.6,
															}}
														/>
													)}
													<span className='relative z-10'>{item.name}</span>
												</Link>
											)
										})}
									</div>
								</div>

								{/* Right Side: Profile */}
								<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-3'>
									{/* Profile Dropdown */}
									<Menu as='div' className='ml-3 relative'>
										<Menu.Button className='flex rounded-full bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 transition-transform hover:scale-105'>
											<span className='sr-only'>Open user menu</span>
											<div className='h-9 w-9 overflow-hidden rounded-full border-2 border-slate-700'>
												<Avatar />
											</div>
										</Menu.Button>

										<Transition
											as={Fragment}
											enter='transition ease-out duration-200'
											enterFrom='transform opacity-0 scale-95'
											enterTo='transform opacity-100 scale-100'
											leave='transition ease-in duration-75'
											leaveFrom='transform opacity-100 scale-100'
											leaveTo='transform opacity-0 scale-95'
										>
											<Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-slate-900 py-1 shadow-lg ring-1 ring-white/10 focus:outline-none border border-slate-800'>
												<div className='px-1 py-1'>
													<Menu.Item>
														{({ active }) => (
															<a
																href={linkedInUrl}
																target='_blank'
																rel='noreferrer'
																className={cn(
																	active
																		? 'bg-indigo-600 text-white'
																		: 'text-slate-300',
																	'group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors',
																)}
															>
																LinkedIn
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href={githubUrl}
																target='_blank'
																rel='noreferrer'
																className={cn(
																	active
																		? 'bg-indigo-600 text-white'
																		: 'text-slate-300',
																	'group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors',
																)}
															>
																Github
															</a>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<a
																href={twitterUrl}
																target='_blank'
																rel='noreferrer'
																className={cn(
																	active
																		? 'bg-indigo-600 text-white'
																		: 'text-slate-300',
																	'group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors',
																)}
															>
																Twitter
															</a>
														)}
													</Menu.Item>
												</div>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</div>
						</div>

						{/* Mobile Menu Panel */}
						<Disclosure.Panel className='sm:hidden border-t border-slate-800/50'>
							<div className='space-y-1 px-4 pb-4 pt-2'>
								{navigation.map((item) => {
									const isCurrent = pathname === item.href
									return (
										<Disclosure.Button
											key={item.name}
											as={Link}
											href={item.href}
											className={cn(
												isCurrent
													? 'bg-indigo-600 text-white'
													: 'text-slate-300 hover:bg-slate-800 hover:text-white',
												'block rounded-xl px-3 py-2 text-base font-medium transition-colors',
											)}
											aria-current={isCurrent ? 'page' : undefined}
										>
											{item.name}
										</Disclosure.Button>
									)
								})}
							</div>
						</Disclosure.Panel>
					</motion.div>
				)}
			</Disclosure>
		</div>
	)
}
