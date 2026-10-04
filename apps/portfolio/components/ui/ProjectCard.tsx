'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import type { Project } from '../../lib/data'
import { cn } from '../../lib/utils'

interface ProjectCardProps {
	project: Project
	index?: number
	priorityImage?: boolean
}

export default function ProjectCard({ project, index = 0, priorityImage = false }: ProjectCardProps) {
	const shouldReduce = useReducedMotion()
	const displayTags = project.tags.slice(0, 4)

	return (
		<motion.div
			initial={shouldReduce ? false : { opacity: 0, y: 16 }}
			whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.35, delay: index * 0.05 }}
			className={cn(
				'group relative flex flex-col rounded-2xl bg-slate-900/60 border border-white/[0.08] shadow-sm overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]',
				!shouldReduce &&
					'hover:shadow-xl hover:border-white/[0.16] hover:bg-slate-900/80 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200'
			)}
		>
			{/* Project Image Header */}
			<Link
				href={project.href}
				target='_blank'
				rel='noopener noreferrer'
				className='relative aspect-[16/10] w-full overflow-hidden block bg-slate-950 border-b border-white/[0.06]'
			>
				<Image
					src={project.imageUrl}
					alt={project.title}
					fill
					priority={priorityImage}
					className={cn(
						'object-cover',
						!shouldReduce &&
							'transition-transform duration-500 ease-out group-hover:scale-105'
					)}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>

				{/* Hover Overlay */}
				<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 bg-slate-950/40 backdrop-blur-[2px]'>
					<span className='px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-slate-900/90 border border-white/[0.12] flex items-center gap-1.5 shadow-lg'>
						Visit project
						<ArrowTopRightOnSquareIcon className='w-3.5 h-3.5 text-indigo-400' />
					</span>
				</div>
			</Link>

			{/* Card Body */}
			<div className='p-5 sm:p-6 flex-1 flex flex-col justify-between'>
				<div>
					{/* Title & Action Links */}
					<div className='flex items-center justify-between gap-3 mb-2.5'>
						<h3 className='text-lg font-bold text-white group-hover:text-indigo-300 transition-colors'>
							<Link href={project.href} target='_blank' rel='noopener noreferrer'>
								{project.title}
							</Link>
						</h3>
						<div className='flex items-center gap-1.5 shrink-0'>
							{project.githubUrl && (
								<a
									href={project.githubUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5'
									aria-label={`Source code for ${project.title}`}
									title='View source code'
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
								className='text-slate-400 hover:text-indigo-400 transition-colors p-1 rounded-lg hover:bg-white/5'
								aria-label={`Visit ${project.title}`}
							>
								<ArrowTopRightOnSquareIcon className='w-4 h-4' />
							</a>
						</div>
					</div>

					{/* Description */}
					<p className='text-sm text-slate-400 leading-relaxed font-light mb-5'>
						{project.description}
					</p>
				</div>

				{/* Tech Stack Pills */}
				<div className='flex flex-wrap gap-1.5 pt-3.5 border-t border-white/[0.06]'>
					{displayTags.map((tag) => (
						<span
							key={tag}
							className='text-xs text-slate-300 bg-slate-800/50 border border-white/[0.06] px-2.5 py-0.5 rounded-md'
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</motion.div>
	)
}
