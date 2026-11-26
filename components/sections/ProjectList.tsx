'use client'

import { useMemo, useTransition } from 'react'
import { useQueryState, parseAsString, parseAsStringLiteral } from 'nuqs'
import {
	MagnifyingGlassIcon,
	XMarkIcon,
	FunnelIcon,
} from '@heroicons/react/24/outline'
import { projectsData, Project } from '../../lib/data'
import ProjectCard from '../ui/ProjectCard'
import { cn } from '../../lib/utils'

const categoryOptions = ['all', 'apps', 'tools'] as const
type CategoryFilter = (typeof categoryOptions)[number]

export default function ProjectList() {
	const [activeCategory, setActiveCategory] = useQueryState(
		'category',
		parseAsStringLiteral(categoryOptions).withDefault('all')
	)
	const [searchQuery, setSearchQuery] = useQueryState(
		'q',
		parseAsString.withDefault('')
	)
	const [, startTransition] = useTransition()

	const categories = useMemo(
		() => [
			{ id: 'all' as CategoryFilter, label: 'All', shortLabel: 'All', count: projectsData.length },
			{
				id: 'apps' as CategoryFilter,
				label: 'Web & mobile apps',
				shortLabel: 'Apps',
				count: projectsData.filter((p) => p.category === 'apps').length,
			},
			{
				id: 'tools' as CategoryFilter,
				label: 'Tools & systems',
				shortLabel: 'Tools',
				count: projectsData.filter((p) => p.category === 'tools').length,
			},
		],
		[]
	)

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
		void setActiveCategory('all')
		void setSearchQuery('')
	}

	// When showing all projects with no search query, spotlight the first project (1 + 6 = symmetrical 3-col grid)
	const showSpotlight = activeCategory === 'all' && !searchQuery.trim() && filteredProjects.length > 3
	const spotlightProject = showSpotlight ? filteredProjects[0] : null
	const gridProjects = showSpotlight ? filteredProjects.slice(1) : filteredProjects

	return (
		<section className='w-full pt-28 sm:pt-36 pb-24 bg-[#FAFAF8] min-h-screen'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Editorial Header */}
				<div className='max-w-3xl mb-10 sm:mb-12 animate-fade-up'>
					<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-600 mb-2.5'>
						01 / Directory
					</div>
					<h1 className='text-3xl sm:text-5xl font-semibold text-stone-950 tracking-[-0.03em] text-balance'>
						Systems &amp;{' '}
						<span className='font-serif italic font-normal text-indigo-600'>
							applications
						</span>
					</h1>
					<p className='mt-3.5 text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed text-pretty'>
						Production web platforms, native iOS apps, API middleware services, and database utilities architected for enterprise and client scale.
					</p>
				</div>

				{/* Controls Bar: Category Pills + Search Input */}
				<div className='mb-10 sm:mb-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-fade-up animation-delay-100'>
					<div className='inline-flex p-1 rounded-full bg-[#F3F2EE] border border-stone-200/90 w-full sm:w-auto shrink-0'>
						{categories.map((cat) => {
							const isActive = activeCategory === cat.id
							return (
								<button
									key={cat.id}
									type='button'
									onClick={() => startTransition(() => { void setActiveCategory(cat.id) })}
									className={cn(
										'relative flex-1 sm:flex-initial justify-center whitespace-nowrap px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-1.5 active:scale-[0.98]',
										isActive
											? 'bg-stone-950 text-white shadow-sm'
											: 'text-stone-600 hover:text-stone-950'
									)}
								>
									<span className='sm:hidden'>{cat.shortLabel}</span>
									<span className='hidden sm:inline'>{cat.label}</span>
									<span
										className={cn(
											'text-[11px] font-mono px-1.5 py-0.5 rounded-full transition-colors leading-none',
											isActive
												? 'bg-stone-800 text-stone-200'
												: 'bg-white text-stone-500 border border-stone-200/80'
										)}
									>
										{cat.count}
									</span>
								</button>
							)
						})}
					</div>

					<div className='relative w-full sm:max-w-md sm:ml-auto'>
						<MagnifyingGlassIcon className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400' />
						<input
							type='text'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder='Search projects or tech...'
							aria-label='Search projects or technologies'
							className='w-full pl-10 pr-10 py-2 rounded-full bg-white border border-stone-200/90 text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors'
						/>
						{searchQuery && (
							<button
								type='button'
								onClick={() => setSearchQuery('')}
								className='absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-950 p-1 rounded-md'
								aria-label='Clear search'
							>
								<XMarkIcon className='w-4 h-4' />
							</button>
						)}
					</div>
				</div>

				{/* Results Meta */}
				{(searchQuery || activeCategory !== 'all') && (
					<div className='flex items-center justify-between mb-6 text-xs text-stone-500 px-1'>
						<span>
							Showing <strong className='text-stone-950 font-mono'>{filteredProjects.length}</strong> of{' '}
							<span className='font-mono'>{projectsData.length}</span> projects
						</span>
						<button
							type='button'
							onClick={clearFilters}
							className='text-indigo-600 hover:text-stone-950 transition-colors font-medium cursor-pointer'
						>
							Reset filters
						</button>
					</div>
				)}

				{/* Project Cards */}
				{filteredProjects.length > 0 ? (
					<div className='space-y-7'>
						{spotlightProject && (
							<ProjectCard
								project={spotlightProject}
								index={0}
								variant='spotlight'
								priorityImage
							/>
						)}
						<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{gridProjects.map((project: Project, idx: number) => (
								<ProjectCard
									key={project.title}
									project={project}
									index={idx}
									priorityImage={!spotlightProject && idx === 0}
								/>
							))}
						</div>
					</div>
				) : (
					<div className='rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center max-w-lg mx-auto'>
						<div className='w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4 text-indigo-600'>
							<FunnelIcon className='w-6 h-6' />
						</div>
						<h3 className='text-base font-semibold text-stone-950 mb-1.5'>No matching projects</h3>
						<p className='text-sm text-stone-600 mb-6'>
							No projects found matching &ldquo;{searchQuery}&rdquo;. Try another term or reset your filters.
						</p>
						<button
							type='button'
							onClick={clearFilters}
							className='px-5 py-2 rounded-full bg-stone-950 hover:bg-indigo-600 text-white text-xs font-medium active:scale-[0.98] transition-colors'
						>
							Reset filters
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
