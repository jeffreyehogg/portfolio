'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { projectsData } from '../../lib/data'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import BackgroundBlobs from '../ui/BackgroundBlobs'
import { cn } from '../../lib/utils'

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
}

const itemVariants: Variants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { type: 'spring', stiffness: 60, damping: 20 },
	},
	exit: { y: -20, opacity: 0 },
}

// Extract unique tags from all projects
const allTags = Array.from(
	new Set(projectsData.flatMap((p) => p.tags))
).sort()

export default function ProjectList() {
	const [activeFilter, setActiveFilter] = useState<string | null>(null)

	const filteredProjects = useMemo(
		() =>
			activeFilter
				? projectsData.filter((p) => p.tags.includes(activeFilter))
				: projectsData,
		[activeFilter]
	)

	return (
		<section className='relative py-24 bg-slate-950 overflow-hidden'>
			<div className='absolute inset-0 pointer-events-none opacity-20'>
				<BackgroundBlobs />
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h2 className='text-indigo-400 font-semibold tracking-wide uppercase text-sm'>
						My Work
					</h2>
					<h3 className='mt-2 text-3xl font-extrabold text-white sm:text-4xl text-balance'>
						Featured Projects
					</h3>
					<p className='mt-4 text-xl text-slate-400'>
						A selection of enterprise work and personal applications.
					</p>
				</div>

				{/* Tag Filter Bar */}
				<div className='flex flex-wrap justify-center gap-2 mb-12'>
					<button
						onClick={() => setActiveFilter(null)}
						className={cn(
							'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer',
							!activeFilter
								? 'bg-indigo-600 text-white border-indigo-500'
								: 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-indigo-500/50 hover:text-white'
						)}
					>
						All
					</button>
					{allTags.map((tag) => (
						<button
							key={tag}
							onClick={() =>
								setActiveFilter(activeFilter === tag ? null : tag)
							}
							className={cn(
								'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer',
								activeFilter === tag
									? 'bg-indigo-600 text-white border-indigo-500'
									: 'bg-slate-900/50 text-slate-400 border-slate-700 hover:border-indigo-500/50 hover:text-white'
							)}
						>
							{tag}
						</button>
					))}
				</div>

				<AnimatePresence mode='wait'>
					<motion.div
						key={activeFilter ?? 'all'}
						className='grid gap-10 lg:grid-cols-3'
						variants={containerVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
					>
						{filteredProjects.map((project) => (
							<motion.div
								key={project.title}
								variants={itemVariants}
								layout
								className='group relative flex flex-col bg-slate-900 rounded-2xl border border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/5 hover:border-indigo-500/30 transition-all duration-300 overflow-hidden'
							>
								{/* Clickable Image Section */}
								<Link
									href={project.href}
									target='_blank'
									rel='noopener noreferrer'
									className='relative h-64 overflow-hidden cursor-pointer block'
								>
									<div className='absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/20 transition-colors duration-300 z-10' />

									<Image
										className='object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110'
										src={project.imageUrl}
										alt={project.title}
										fill
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
									/>

									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'>
										<span className='bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2'>
											View Project{' '}
											<ArrowTopRightOnSquareIcon className='w-4 h-4' />
										</span>
									</div>
								</Link>

								{/* Content Section */}
								<div className='flex-1 p-8 flex flex-col'>
									<div className='flex-1'>
										<div className='flex justify-between items-start'>
											<h4 className='text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors'>
												<Link
													href={project.href}
													target='_blank'
													rel='noopener noreferrer'
												>
													{project.title}
												</Link>
											</h4>
											<a
												href={project.href}
												target='_blank'
												rel='noopener noreferrer'
												className='text-slate-500 hover:text-indigo-400 transition-colors flex-shrink-0 ml-2'
												aria-label={`Visit ${project.title}`}
											>
												<ArrowTopRightOnSquareIcon className='h-5 w-5' />
											</a>
										</div>

										<p className='mt-4 text-base text-slate-400 leading-relaxed'>
											{project.description}
										</p>

										<div className='mt-6 flex flex-wrap gap-2'>
											{project.tags.map((tag) => (
												<span
													key={tag}
													className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</AnimatePresence>

				{/* Empty state */}
				{filteredProjects.length === 0 && (
					<div className='text-center py-16'>
						<p className='text-slate-500 text-lg'>
							No projects match that filter.
						</p>
					</div>
				)}
			</div>
		</section>
	)
}
