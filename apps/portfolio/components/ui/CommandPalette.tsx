'use client'

import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import {
	MagnifyingGlassIcon,
	CommandLineIcon,
	BriefcaseIcon,
	DocumentTextIcon,
	EnvelopeIcon,
	HomeIcon,
	ArrowTopRightOnSquareIcon,
	ServerStackIcon,
} from '@heroicons/react/24/outline'
import { githubUrl, linkedInUrl } from '../../lib/data'

interface CommandItem {
	id: string
	title: string
	category: 'Navigation' | 'Experience' | 'Actions'
	href?: string
	external?: boolean
	icon: any
	shortcut?: string
}

const commandItems: CommandItem[] = [
	{
		id: 'nav-home',
		title: 'Home',
		category: 'Navigation',
		href: '/',
		icon: HomeIcon,
	},
	{
		id: 'nav-projects',
		title: 'Systems & Projects',
		category: 'Navigation',
		href: '/portfolio',
		icon: CommandLineIcon,
	},
	{
		id: 'nav-about',
		title: 'About Me & Background',
		category: 'Navigation',
		href: '/about',
		icon: BriefcaseIcon,
	},
	{
		id: 'nav-contact',
		title: 'Contact Form (Protected by reCAPTCHA)',
		category: 'Navigation',
		href: '/contact',
		icon: EnvelopeIcon,
	},
	{
		id: 'exp-lgi',
		title: 'LGI Homes — Full-Stack Developer',
		category: 'Experience',
		href: '/about#experience',
		icon: ServerStackIcon,
	},
	{
		id: 'exp-freelance',
		title: 'Freelance — Software Developer',
		category: 'Experience',
		href: '/about#experience',
		icon: ServerStackIcon,
	},
	{
		id: 'exp-cisco',
		title: 'Cisco — Software Engineer',
		category: 'Experience',
		href: '/about#experience',
		icon: ServerStackIcon,
	},
	{
		id: 'act-resume',
		title: 'Download Resume (PDF)',
		category: 'Actions',
		href: '/Jeff_Hogg_Resume.pdf',
		external: true,
		icon: DocumentTextIcon,
		shortcut: 'PDF',
	},
	{
		id: 'act-github',
		title: 'GitHub Profile',
		category: 'Actions',
		href: githubUrl,
		external: true,
		icon: ArrowTopRightOnSquareIcon,
	},
	{
		id: 'act-linkedin',
		title: 'LinkedIn Profile',
		category: 'Actions',
		href: linkedInUrl,
		external: true,
		icon: ArrowTopRightOnSquareIcon,
	},
]

interface CommandPaletteProps {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
}

export default function CommandPalette({ isOpen, setIsOpen }: CommandPaletteProps) {
	const router = useRouter()
	const [query, setQuery] = useState('')

	// Global keyboard shortcut listener: Cmd+K / Ctrl+K
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault()
				setIsOpen(!isOpen)
			}
		}
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [isOpen, setIsOpen])

	const filteredItems =
		query === ''
			? commandItems
			: commandItems.filter(
					(item) =>
						item.title.toLowerCase().includes(query.toLowerCase()) ||
						item.category.toLowerCase().includes(query.toLowerCase())
			  )

	const handleSelect = (item: CommandItem) => {
		setIsOpen(false)
		if (!item.href) return

		if (item.external) {
			window.open(item.href, '_blank', 'noopener,noreferrer')
		} else {
			router.push(item.href)
		}
	}

	return (
		<Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
			<Dialog as='div' className='relative z-50' onClose={setIsOpen}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-200'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-150'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start pt-20 sm:pt-28'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-200'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<Dialog.Panel className='w-full max-w-xl transform divide-y divide-slate-800 overflow-hidden rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl shadow-black/60 transition-all'>
							<Combobox onChange={handleSelect}>
								<div className='relative'>
									<MagnifyingGlassIcon
										className='pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-indigo-400'
										aria-hidden='true'
									/>
									<Combobox.Input
										className='h-12 w-full border-0 bg-transparent pl-11 pr-12 text-white placeholder:text-slate-400 focus:ring-0 sm:text-sm focus:outline-none'
										placeholder='Search commands, pages, or actions... (⌘K)'
										onChange={(event) => setQuery(event.target.value)}
										autoFocus
									/>
									<kbd className='absolute right-3.5 top-3.5 hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700'>
										ESC
									</kbd>
								</div>

								{filteredItems.length > 0 ? (
									<Combobox.Options
										static
										className='max-h-80 scroll-py-2 overflow-y-auto p-2 focus:outline-none'
									>
										{filteredItems.map((item) => (
											<Combobox.Option
												key={item.id}
												value={item}
												className={({ active }) =>
													`group flex cursor-pointer select-none items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
														active
															? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
															: 'text-slate-300 hover:text-white'
													}`
												}
											>
												{({ active }) => (
													<>
														<div className='flex items-center gap-3'>
															<item.icon
																className={`h-5 w-5 flex-shrink-0 ${
																	active ? 'text-white' : 'text-indigo-400'
																}`}
																aria-hidden='true'
															/>
															<span className='font-medium'>{item.title}</span>
														</div>
														<div className='flex items-center gap-2'>
															<span
																className={`text-[11px] font-mono uppercase tracking-wider ${
																	active ? 'text-indigo-200' : 'text-slate-500'
																}`}
															>
																{item.category}
															</span>
															{item.shortcut && (
																<kbd
																	className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
																		active
																			? 'bg-indigo-700 text-white'
																			: 'bg-slate-800 text-slate-400 border border-slate-700'
																	}`}
																>
																	{item.shortcut}
																</kbd>
															)}
														</div>
													</>
												)}
											</Combobox.Option>
										))}
									</Combobox.Options>
								) : (
									<div className='py-12 px-6 text-center text-sm text-slate-400'>
										<p>No results found for &ldquo;{query}&rdquo;.</p>
										<p className='mt-1 text-xs text-slate-500'>
											Try searching for &ldquo;projects&rdquo;, &ldquo;resume&rdquo;, or &ldquo;experience&rdquo;.
										</p>
									</div>
								)}

								<div className='flex items-center justify-between px-4 py-2.5 text-xs text-slate-500 bg-slate-950/40 border-t border-slate-800/80 font-mono'>
									<div className='flex items-center gap-2'>
										<span>Navigate with</span>
										<span className='px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300'>↑</span>
										<span className='px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300'>↓</span>
									</div>
									<div className='flex items-center gap-1.5'>
										<span>Select with</span>
										<span className='px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300'>↵</span>
									</div>
								</div>
							</Combobox>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}
