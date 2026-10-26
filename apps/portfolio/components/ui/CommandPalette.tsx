'use client'

import { Fragment, useState, useMemo } from 'react'
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
	CpuChipIcon,
} from '@heroicons/react/24/outline'
import { githubUrl, linkedInUrl, projectsData } from '../../lib/data'

interface CommandItem {
	id: string
	title: string
	subtitle?: string
	category: 'Quick Actions' | 'Navigation' | 'Projects & Systems' | 'Experience'
	href?: string
	external?: boolean
	icon: any
	shortcut?: string
	keywords?: string
}

const baseCommandItems: CommandItem[] = [
	{
		id: 'act-contact',
		title: 'Send a Message',
		subtitle: 'Open contact & inquiry form',
		category: 'Quick Actions',
		href: '/contact',
		icon: EnvelopeIcon,
		shortcut: 'Form',
		keywords: 'email message contact hire consultation inquiry',
	},
	{
		id: 'act-resume',
		title: 'Download Resume (PDF)',
		subtitle: 'View or save full engineering resume',
		category: 'Quick Actions',
		href: '/Jeff_Hogg_Resume.pdf',
		external: true,
		icon: DocumentTextIcon,
		shortcut: 'PDF',
		keywords: 'cv resume pdf download',
	},
	{
		id: 'nav-home',
		title: 'Home',
		category: 'Navigation',
		href: '/',
		icon: HomeIcon,
	},
	{
		id: 'nav-projects',
		title: 'Systems & Projects Directory',
		category: 'Navigation',
		href: '/portfolio',
		icon: CommandLineIcon,
	},
	{
		id: 'nav-about',
		title: 'About & Career Timeline',
		category: 'Navigation',
		href: '/about',
		icon: BriefcaseIcon,
	},
	{
		id: 'exp-lgi',
		title: 'LGI Homes — Full-Stack Developer',
		subtitle: 'Docker, GitHub Actions CI/CD, Node.js, MS SQL & MySQL',
		category: 'Experience',
		href: '/about#experience',
		icon: ServerStackIcon,
		keywords: 'lgi homes devops sql docker nginx',
	},
	{
		id: 'exp-cisco',
		title: 'Cisco — Software Engineer',
		subtitle: 'Webex Calling Control Hub, Angular, TypeScript, Cypress',
		category: 'Experience',
		href: '/about#experience',
		icon: ServerStackIcon,
		keywords: 'cisco webex angular cypress jenkins',
	},
	{
		id: 'exp-freelance',
		title: 'Freelance — Software Developer',
		subtitle: 'Next.js, Vercel, Python/SQL Data Migrations',
		category: 'Experience',
		href: '/about#experience',
		icon: ServerStackIcon,
		keywords: 'freelance nextjs python etl',
	},
	{
		id: 'act-github',
		title: 'GitHub Profile',
		category: 'Quick Actions',
		href: githubUrl,
		external: true,
		icon: ArrowTopRightOnSquareIcon,
		keywords: 'github source code repositories',
	},
	{
		id: 'act-linkedin',
		title: 'LinkedIn Profile',
		category: 'Quick Actions',
		href: linkedInUrl,
		external: true,
		icon: ArrowTopRightOnSquareIcon,
		keywords: 'linkedin social network connect',
	},
]

const projectCommandItems: CommandItem[] = projectsData.map((project) => ({
	id: `proj-${project.title.toLowerCase().replace(/\s+/g, '-')}`,
	title: project.title,
	subtitle: project.tags.slice(0, 4).join(' • '),
	category: 'Projects & Systems',
	href: project.href,
	external: true,
	icon: CpuChipIcon,
	shortcut: project.category === 'tools' ? 'System' : 'App',
	keywords: `${project.tags.join(' ')} ${project.description} ${project.metrics ?? ''}`,
}))

const allCommandItems: CommandItem[] = [...baseCommandItems, ...projectCommandItems]

interface CommandPaletteProps {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
}

export default function CommandPalette({ isOpen, setIsOpen }: CommandPaletteProps) {
	const router = useRouter()
	const [query, setQuery] = useState('')

	const filteredItems = useMemo(() => {
		const trimmed = query.trim().toLowerCase()
		if (!trimmed) return allCommandItems

		return allCommandItems.filter(
			(item) =>
				item.title.toLowerCase().includes(trimmed) ||
				item.category.toLowerCase().includes(trimmed) ||
				(item.subtitle && item.subtitle.toLowerCase().includes(trimmed)) ||
				(item.keywords && item.keywords.toLowerCase().includes(trimmed))
		)
	}, [query])

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

				<div className='fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start pt-20 sm:pt-24'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-200'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<Dialog.Panel className='w-full max-w-xl transform divide-y divide-white/[0.08] overflow-hidden rounded-2xl bg-slate-900/95 border border-white/[0.1] shadow-2xl shadow-black/70 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all'>
							<Combobox onChange={handleSelect}>
								<div className='relative'>
									<MagnifyingGlassIcon
										className='pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-indigo-400'
										aria-hidden='true'
									/>
									<Combobox.Input
										className='h-12 w-full border-0 bg-transparent pl-11 pr-14 text-white placeholder:text-slate-400 focus:ring-0 sm:text-sm focus:outline-none'
										placeholder='Search projects, tech (MCP, WASM, Docker), or actions...'
										onChange={(event) => setQuery(event.target.value)}
										autoFocus
									/>
									<kbd className='absolute right-3.5 top-3.5 hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 rounded border border-white/[0.08]'>
										ESC
									</kbd>
								</div>

								{filteredItems.length > 0 ? (
									<Combobox.Options
										static
										className='max-h-80 scroll-py-2 overflow-y-auto p-2 focus:outline-none space-y-0.5'
									>
										{filteredItems.map((item) => (
											<Combobox.Option
												key={item.id}
												value={item}
												className={({ active }) =>
													`group flex cursor-pointer select-none items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
														active
															? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
															: 'text-slate-300 hover:text-white'
													}`
												}
											>
												{({ active }) => (
													<>
														<div className='flex items-center gap-3 min-w-0 pr-3'>
															<item.icon
																className={`h-4 w-4 flex-shrink-0 ${
																	active ? 'text-white' : 'text-indigo-400'
																}`}
																aria-hidden='true'
															/>
															<div className='truncate'>
																<span className='font-medium'>{item.title}</span>
																{item.subtitle && (
																	<span
																		className={`ml-2 text-xs font-normal ${
																			active ? 'text-indigo-100' : 'text-slate-500'
																		}`}
																	>
																		{item.subtitle}
																	</span>
																)}
															</div>
														</div>
														<div className='flex items-center gap-2 shrink-0'>
															<span
																className={`text-[11px] font-normal hidden sm:inline ${
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
																			: 'bg-slate-800/80 text-slate-400 border border-white/[0.08]'
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
											Try searching for &ldquo;AutoDBA&rdquo;, &ldquo;WASM&rdquo;, &ldquo;Docker&rdquo;, or &ldquo;resume&rdquo;.
										</p>
									</div>
								)}

								<div className='flex items-center justify-between px-4 py-2.5 text-xs text-slate-400 bg-slate-950/50 border-t border-white/[0.06] font-mono'>
									<div className='flex items-center gap-1.5'>
										<span>Navigate</span>
										<span className='px-1.5 py-0.5 rounded bg-slate-800 border border-white/[0.08] text-slate-300'>↑</span>
										<span className='px-1.5 py-0.5 rounded bg-slate-800 border border-white/[0.08] text-slate-300'>↓</span>
									</div>
									<div className='flex items-center gap-1.5'>
										<span>Open</span>
										<span className='px-1.5 py-0.5 rounded bg-slate-800 border border-white/[0.08] text-slate-300'>↵</span>
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
