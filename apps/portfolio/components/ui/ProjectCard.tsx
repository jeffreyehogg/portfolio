'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon, CommandLineIcon } from '@heroicons/react/24/outline'
import type { Project } from '../../lib/data'

interface ProjectCardProps {
	project: Project
	index?: number
	priorityImage?: boolean
}

export default function ProjectCard({ project, index = 0, priorityImage = false }: ProjectCardProps) {
	// Keep up to 4 tags to preserve clean alignment and prevent erratic height wrapping
	const displayTags = project.tags.slice(0, 4)

	return (
		<motion.div
			initial={{ opacity: 0, y: 25 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: index * 0.08 }}
			className='group relative flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800/80 shadow-xl hover:shadow-2xl hover:border-indigo-500/40 hover:bg-slate-900/95 hover:-translate-y-1 transition-all duration-300 overflow-hidden'
		>
			{/* Project Image Header with Hover Reveal */}
			<Link
				href={project.href}
				target='_blank'
				rel='noopener noreferrer'
				className='relative aspect-[16/10] w-full overflow-hidden block bg-slate-950 border-b border-slate-800/60'
			>
				<div className='absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors z-10' />
				<Image
					src={project.imageUrl}
					alt={project.title}
					fill
					priority={priorityImage}
					className='object-cover transform transition-transform duration-700 ease-out group-hover:scale-105'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>

				{/* Subtle Hover Reveal */}
				<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-slate-950/40 backdrop-blur-[2px]'>
					<span className='px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-slate-900/90 border border-slate-700 flex items-center gap-1.5 shadow-lg'>
						View Live System
						<ArrowTopRightOnSquareIcon className='w-3.5 h-3.5 text-indigo-400' />
					</span>
				</div>
			</Link>

			{/* Card Content */}
			<div className='p-6 sm:p-7 flex-1 flex flex-col justify-between'>
				<div>
					{/* Telemetry Metric Pill (cleanly positioned above title without image overflow) */}
					{project.metrics && (
						<div className='flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-medium mb-2.5'>
							<span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0' />
							<span className='truncate'>{project.metrics}</span>
						</div>
					)}

					{/* Title & Action Links */}
					<div className='flex items-center justify-between mb-2.5'>
						<h3 className='text-xl font-bold text-white group-hover:text-indigo-300 transition-colors'>
							<Link href={project.href} target='_blank' rel='noopener noreferrer'>
								{project.title}
							</Link>
						</h3>
						<div className='flex items-center gap-1.5'>
							{project.githubUrl && (
								<a
									href={project.githubUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='text-slate-400 hover:text-white transition-colors p-1'
									aria-label={`Source code for ${project.title}`}
									title='View Source Code'
								>
									<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
										/>
									</svg>
								</a>
							)}
							<a
								href={project.href}
								target='_blank'
								rel='noopener noreferrer'
								className='text-slate-400 hover:text-indigo-400 transition-colors p-1'
								aria-label={`Visit ${project.title}`}
							>
								<ArrowTopRightOnSquareIcon className='w-4 h-4' />
							</a>
						</div>
					</div>

					{/* Description */}
					<p className='text-sm text-slate-400 leading-relaxed font-light line-clamp-3 mb-4'>
						{project.description}
					</p>

					{/* Architectural Telemetry Insight */}
					{project.learnings && (
						<div className='mb-5 rounded-xl bg-slate-950/80 border border-slate-800/90 overflow-hidden text-xs text-slate-300'>
							<div className='flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800/80'>
								<div className='flex items-center gap-1.5'>
									<span className='w-2 h-2 rounded-full bg-rose-500/70' />
									<span className='w-2 h-2 rounded-full bg-amber-500/70' />
									<span className='w-2 h-2 rounded-full bg-emerald-500/70' />
									<span className='text-[10px] font-mono text-slate-500 ml-1.5'>arch.telemetry</span>
								</div>
								<span className='text-[10px] font-mono text-indigo-400 flex items-center gap-1 uppercase tracking-wider'>
									<CommandLineIcon className='w-3 h-3' />
									Insight
								</span>
							</div>
							<p className='p-3.5 text-slate-400 font-light text-xs leading-relaxed'>
								{project.learnings}
							</p>
						</div>
					)}
				</div>

				{/* Tech Stack Pills */}
				<div className='flex flex-wrap gap-2 pt-4 border-t border-slate-800/80'>
					{displayTags.map((tag) => (
						<span
							key={tag}
							className='text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full'
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</motion.div>
	)
}
