'use client'

import { useState, useMemo, useTransition } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projectsData, Project } from '../../lib/data'
import ProjectCard from '../ui/ProjectCard'
import BackgroundBlobs from '../ui/BackgroundBlobs'
import { cn } from '../../lib/utils'

type CategoryFilter = 'all' | 'systems' | 'fullstack'

const categories: { id: CategoryFilter; label: string }[] = [
	{ id: 'all', label: 'All Projects' },
	{ id: 'systems', label: 'Systems & DevOps' },
	{ id: 'fullstack', label: 'Full-Stack SaaS' },
]

export default function ProjectList() {
	const shouldReduce = useReducedMotion()
	const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
	const [, startTransition] = useTransition()

	const filteredProjects = useMemo(() => {
		if (activeCategory === 'all') return projectsData
		if (activeCategory === 'systems') {
			return projectsData.filter((p) =>
				p.tags.some((t) =>
					[
						'Enterprise SaaS',
						'PostgreSQL JSONB',
						'Cypress',
						'Jenkins',
						'PapaParse',
						'Angular',
						'Turborepo',
						'pnpm Workspaces',
					].includes(t)
				)
			)
		}
		if (activeCategory === 'fullstack') {
			return projectsData.filter((p) =>
				p.tags.some((t) =>
					['Next.js', 'Nuxt', 'Neon Postgres', 'Drizzle ORM', 'React 19'].includes(t)
				)
			)
		}
		return projectsData
	}, [activeCategory])

	return (
		<section className='relative pt-32 sm:pt-40 pb-24 bg-slate-950 overflow-hidden min-h-screen'>
			{/* Ambient background lighting */}
			<div className='absolute inset-0 pointer-events-none opacity-20'>
				<BackgroundBlobs />
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				{/* Clean Header */}
				<div className='text-center max-w-3xl mx-auto mb-12 sm:mb-16'>
					<motion.div
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-4'
					>
						Systems & Applications
					</motion.div>
					<motion.h1
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className='text-3xl sm:text-5xl font-extrabold text-white tracking-tight'
					>
						Selected Engineering Work
					</motion.h1>
					<motion.p
						initial={shouldReduce ? false : { opacity: 0, y: 15 }}
						animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className='mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed'
					>
						A curated showcase of enterprise architectures, data migration middleware,
						and modern full-stack web platforms.
					</motion.p>
				</div>

				{/* Minimal 3-Segment Category Switcher */}
				<div className='flex justify-center mb-12 sm:mb-16'>
					<div className='inline-flex p-1 rounded-full bg-slate-900/90 border border-slate-800 shadow-inner backdrop-blur-md'>
						{categories.map((cat) => {
							const isActive = activeCategory === cat.id
							return (
								<button
									key={cat.id}
									onClick={() => startTransition(() => setActiveCategory(cat.id))}
									className={cn(
										'relative px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer',
										isActive
											? 'text-white'
											: 'text-slate-400 hover:text-slate-200'
									)}
								>
									{isActive && (
										<motion.span
											layoutId='active-category-pill'
											className='absolute inset-0 bg-indigo-600 rounded-full shadow-md'
											transition={
												shouldReduce
													? { duration: 0 }
													: { type: 'spring', bounce: 0.2, duration: 0.5 }
											}
										/>
									)}
									<span className='relative z-10'>{cat.label}</span>
								</button>
							)
						})}
					</div>
				</div>

				{/* Elegant Project Cards Grid */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeCategory}
						initial={shouldReduce ? false : { opacity: 0, y: 20 }}
						animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
						exit={shouldReduce ? undefined : { opacity: 0, y: -15 }}
						transition={{ duration: 0.4 }}
						className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
					>
						{filteredProjects.map((project: Project, idx: number) => (
							<ProjectCard key={project.title} project={project} index={idx} />
						))}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	)
}
