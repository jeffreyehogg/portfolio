'use client'

import { useState, useMemo, useTransition } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
	MagnifyingGlassIcon,
	XMarkIcon,
	FunnelIcon,
} from '@heroicons/react/24/outline'
import { projectsData, Project } from '../../lib/data'
import ProjectCard from '../ui/ProjectCard'
import BackgroundBlobs from '../ui/BackgroundBlobs'
import { cn } from '../../lib/utils'

type CategoryFilter = 'all' | 'apps' | 'tools'

export default function ProjectList() {
	const shouldReduce = useReducedMotion()
	const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
	const [searchQuery, setSearchQuery] = useState('')
	const [, startTransition] = useTransition()

	const categories = useMemo(() => [
		{ id: 'all' as CategoryFilter, label: 'All', count: projectsData.length },
		{
			id: 'apps' as CategoryFilter,
			label: 'Web applications',
			count: projectsData.filter((p) => p.category === 'apps').length,
		},
		{
			id: 'tools' as CategoryFilter,
			label: 'Tools & systems',
			count: projectsData.filter((p) => p.category === 'tools').length,
		},
	], [])

	const filteredProjects = useMemo(() => {
		return projectsData.filter((p) => {
			const matchesCategory =
				activeCategory === 'all' || p.category === activeCategory
			const query = searchQuery.trim().toLowerCase()
			if (!query) return matchesCategory

			const matchesText =
				p.title.toLowerCase().includes(query) ||
				p.description.toLowerCase().includes(query) ||
				p.tags.some((tag) => tag.toLowerCase().includes(query))

			return matchesCategory && matchesText
		})
	}, [activeCategory, searchQuery])

	const clearFilters = () => {
		setActiveCategory('all')
		setSearchQuery('')
	}

	return (
		<section className='relative pt-28 sm:pt-36 pb-24 bg-slate-950 overflow-hidden min-h-screen'>
			{/* Ambient background lighting */}
			<div className='absolute inset-0 pointer-events-none opacity-20'>
				<BackgroundBlobs />
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				{/* Clean Header */}
				<div className='text-center max-w-3xl mx-auto mb-10 sm:mb-12'>
					<motion.div
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3.5'
					>
						Projects & systems
					</motion.div>
					<motion.h1
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className='text-3xl sm:text-5xl font-extrabold text-white tracking-tight'
					>
						Systems & applications
					</motion.h1>
					<motion.p
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						transition={{ delay: 0.15 }}
						className='mt-3.5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed'
					>
						Production web platforms, API middleware services, and database utilities architected for enterprise and client scale.
					</motion.p>
				</div>

				{/* Instant Controls Bar: Category Pills + Search Input */}
				<motion.div
					initial={shouldReduce ? false : { opacity: 0, y: 15 }}
					animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className='max-w-3xl mx-auto mb-10 sm:mb-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4'
				>
					{/* Category Pill Switcher */}
					<div className='inline-flex p-1 rounded-xl bg-slate-900/80 border border-white/[0.08] shadow-sm backdrop-blur-md w-full sm:w-auto justify-center'>
						{categories.map((cat) => {
							const isActive = activeCategory === cat.id
							return (
								<button
									key={cat.id}
									onClick={() => startTransition(() => setActiveCategory(cat.id))}
									className={cn(
										'relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-[0.98]',
										isActive
											? 'text-white'
											: 'text-slate-400 hover:text-slate-200'
									)}
								>
									{isActive && (
										<motion.span
											layoutId='active-category-pill'
											className='absolute inset-0 bg-indigo-600 rounded-lg shadow-sm shadow-indigo-600/30'
											transition={
												shouldReduce
													? { duration: 0 }
													: { type: 'spring', bounce: 0.2, duration: 0.4 }
											}
										/>
									)}
									<span className='relative z-10'>{cat.label}</span>
									<span
										className={cn(
											'relative z-10 text-[11px] px-1.5 py-0.2 rounded-md transition-colors',
											isActive
												? 'bg-indigo-700/60 text-white'
												: 'bg-slate-800 text-slate-400'
										)}
									>
										{cat.count}
									</span>
								</button>
							)
						})}
					</div>

					{/* Instant Search Bar */}
					<div className='relative w-full sm:flex-1'>
						<MagnifyingGlassIcon className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
						<input
							type='text'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder='Search projects or tech (e.g. Next.js, Docker, SQL)...'
							className='w-full pl-9 pr-9 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 backdrop-blur-md transition-colors'
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery('')}
								className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md'
								aria-label='Clear search'
							>
								<XMarkIcon className='w-4 h-4' />
							</button>
						)}
					</div>
				</motion.div>

				{/* Results Meta / Quick Status */}
				{(searchQuery || activeCategory !== 'all') && (
					<div className='flex items-center justify-between max-w-7xl mx-auto mb-6 text-xs text-slate-400 px-1'>
						<span>
							Showing <strong className='text-white'>{filteredProjects.length}</strong> of{' '}
							{projectsData.length} projects
						</span>
						<button
							onClick={clearFilters}
							className='text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer'
						>
							Reset filters
						</button>
					</div>
				)}

				{/* Project Cards Grid / Empty State */}
				{filteredProjects.length > 0 ? (
					<AnimatePresence mode='wait'>
						<motion.div
							key={`${activeCategory}-${searchQuery}`}
							initial={shouldReduce ? false : { opacity: 0, y: 15 }}
							animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
							exit={shouldReduce ? undefined : { opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
						>
							{filteredProjects.map((project: Project, idx: number) => (
								<ProjectCard key={project.title} project={project} index={idx} />
							))}
						</motion.div>
					</AnimatePresence>
				) : (
					<div className='rounded-2xl border border-dashed border-white/[0.1] bg-slate-900/40 p-12 text-center max-w-lg mx-auto'>
						<div className='w-12 h-12 rounded-xl bg-slate-800/80 border border-white/[0.06] flex items-center justify-center mx-auto mb-4 text-slate-400'>
							<FunnelIcon className='w-6 h-6 text-indigo-400' />
						</div>
						<h3 className='text-base font-semibold text-white mb-1.5'>No matching projects</h3>
						<p className='text-sm text-slate-400 mb-6'>
							No projects found matching &ldquo;{searchQuery}&rdquo;. Try another term or reset your filters.
						</p>
						<button
							onClick={clearFilters}
							className='px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold active:scale-[0.98] transition-all shadow-md shadow-indigo-600/20'
						>
							Reset filters
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
