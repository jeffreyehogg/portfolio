'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	ArrowTopRightOnSquareIcon,
	CpuChipIcon,
} from '@heroicons/react/24/outline'
import type { Project } from '../../lib/data'
import { cn } from '../../lib/utils'
import ProjectModal from './ProjectModal'

interface ProjectCardProps {
	project: Project
	index?: number
	priorityImage?: boolean
}

export default function ProjectCard({ project, priorityImage = false }: ProjectCardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const displayTags = project.tags.slice(0, 5)
	const remainingCount = project.tags.length - displayTags.length

	return (
		<>
			<div
				className={cn(
					'group relative flex flex-col rounded-2xl bg-slate-900/65 border border-white/[0.08] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
					'hover:shadow-xl hover:shadow-black/40 hover:border-white/[0.15] hover:bg-slate-900/90 motion-safe:hover:-translate-y-0.5 transition-[transform,border-color,background-color,box-shadow] duration-200'
				)}
			>
				{/* Project Image Header */}
				<div className='relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-white/[0.06]'>
					<Link
						href={project.href}
						target='_blank'
						rel='noopener noreferrer'
						className='block w-full h-full'
					>
						<Image
							src={project.imageUrl}
							alt={project.title}
							fill
							priority={priorityImage}
							fetchPriority={priorityImage ? 'high' : undefined}
							loading={priorityImage ? undefined : 'lazy'}
							className='object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>

						{/* Subtle bottom gradient for contrast */}
						<div className='absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none' />

						{/* Hover Overlay */}
						<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 bg-slate-950/45'>
							<span className='px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-slate-900/95 border border-white/[0.14] flex items-center gap-1.5 shadow-lg'>
								Visit live project
								<ArrowTopRightOnSquareIcon className='w-3.5 h-3.5 text-indigo-400' />
							</span>
						</div>
					</Link>

					{/* Top-left Category Badge */}
					{project.category && (
						<div className='absolute top-3 left-3 z-10 pointer-events-none'>
							<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-950/85 text-slate-300 border border-white/[0.1] backdrop-blur-md'>
								{project.category === 'tools' ? 'System & Tool' : 'Web App'}
							</span>
						</div>
					)}
				</div>

				{/* Card Body */}
				<div className='p-5 sm:p-6 flex-1 flex flex-col justify-between'>
					<div>
						{/* Title & Action Links */}
						<div className='flex items-center justify-between gap-3 mb-2'>
							<h3 className='text-lg sm:text-xl font-bold text-white group-hover:text-indigo-200 transition-colors tracking-tight'>
								<Link href={project.href} target='_blank' rel='noopener noreferrer'>
									{project.title}
								</Link>
							</h3>
							<div className='flex items-center gap-1 shrink-0'>
								{project.highlights && project.highlights.length > 0 && (
									<button
										type='button'
										onClick={() => setIsModalOpen(true)}
										className='inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-indigo-600/25 border border-white/[0.07] hover:border-indigo-500/40 transition-colors cursor-pointer active:scale-[0.97]'
										aria-label={`Inspect system architecture for ${project.title}`}
										title='Inspect system architecture & highlights'
									>
										<CpuChipIcon className='w-3.5 h-3.5 text-indigo-400' />
										<span>Architecture</span>
									</button>
								)}
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5'
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
									className='text-slate-400 hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-white/5'
									aria-label={`Visit ${project.title}`}
									title='Open live project'
								>
									<ArrowTopRightOnSquareIcon className='w-4 h-4' />
								</a>
							</div>
						</div>

						{/* Key Engineering Metrics Telemetry Pill */}
						{project.metrics && (
							<div className='text-[11px] font-medium text-indigo-300/90 mb-2.5 flex items-center gap-1.5'>
								<span className='h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0' />
								<span className='truncate'>{project.metrics}</span>
							</div>
						)}

						{/* Description */}
						<p className='text-sm text-slate-400 leading-relaxed font-light mb-5 text-pretty'>
							{project.description}
						</p>
					</div>

					{/* Tech Stack Pills */}
					<div className='flex flex-wrap items-center gap-1.5 pt-3.5 border-t border-white/[0.06]'>
						{displayTags.map((tag) => (
							<span
								key={tag}
								className='text-xs text-slate-300 bg-slate-800/50 border border-white/[0.06] px-2.5 py-0.5 rounded-md'
							>
								{tag}
							</span>
						))}
						{remainingCount > 0 && (
							<button
								type='button'
								onClick={() => setIsModalOpen(true)}
								className='text-[11px] text-slate-400 hover:text-indigo-300 bg-slate-800/30 border border-white/[0.06] px-2 py-0.5 rounded-md transition-colors cursor-pointer'
							>
								+{remainingCount} more
							</button>
						)}
					</div>
				</div>
			</div>

			{isModalOpen && (
				<ProjectModal
					project={project}
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</>
	)
}
