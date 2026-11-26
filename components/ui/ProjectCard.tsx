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
	variant?: 'default' | 'spotlight'
}

export default function ProjectCard({
	project,
	priorityImage = false,
	variant = 'default',
}: ProjectCardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const isSpotlight = variant === 'spotlight'
	const displayTags = project.tags.slice(0, isSpotlight ? 7 : 5)
	const remainingCount = project.tags.length - displayTags.length

	if (isSpotlight) {
		return (
			<>
				<article className='group relative grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-white border border-stone-200/90 overflow-hidden shadow-[0_1px_2px_rgba(17,17,16,0.04)] hover:border-stone-300 hover:shadow-[0_12px_32px_-16px_rgba(17,17,16,0.14)] transition-[border-color,box-shadow] duration-200'>
					{/* Left: Large Visual Preview */}
					<div className='relative lg:col-span-6 aspect-[16/10] lg:aspect-auto lg:min-h-[340px] w-full overflow-hidden bg-[#ECEAE4] border-b lg:border-b-0 lg:border-r border-stone-200/80'>
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
								className='object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]'
								sizes='(max-width: 1024px) 100vw, 50vw'
							/>
						</Link>
						{(project.badge || project.category) && (
							<div className='absolute top-3.5 left-3.5 z-10 pointer-events-none'>
								<span className='inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-white/95 text-stone-800 border border-stone-200/90 shadow-sm backdrop-blur-sm'>
									{project.badge ?? (project.category === 'tools' ? 'System & Tool' : 'Web App')}
								</span>
							</div>
						)}
					</div>

					{/* Right: Editorial Story & Actions */}
					<div className='lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between'>
						<div>
							<div className='flex items-start justify-between gap-3 mb-2.5'>
								<div>
									<div className='font-mono text-[11px] uppercase tracking-[0.14em] text-indigo-600 mb-1.5'>
										Featured Spotlight
									</div>
									<h3 className='text-2xl sm:text-3xl font-semibold text-stone-950 group-hover:text-indigo-600 transition-colors tracking-[-0.02em] leading-tight'>
										<Link href={project.href} target='_blank' rel='noopener noreferrer'>
											{project.title}
										</Link>
									</h3>
								</div>
							</div>

							{project.metrics && (
								<div className='text-[11px] font-mono text-stone-600 mb-4 flex items-center gap-2'>
									<span className='h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0' />
									<span>{project.metrics}</span>
								</div>
							)}

							<p className='text-sm sm:text-base text-stone-600 leading-relaxed mb-5 text-pretty'>
								{project.description}
							</p>

							<div className='flex flex-wrap items-center gap-1.5 mb-6'>
								{displayTags.map((tag) => (
									<span
										key={tag}
										className='text-xs text-stone-600 bg-[#FAFAF8] border border-stone-200/80 px-3 py-0.5 rounded-full'
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						<div className='flex flex-wrap items-center gap-2.5 pt-5 border-t border-stone-200/80'>
							<a
								href={project.href}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-white bg-stone-950 hover:bg-indigo-600 transition-colors active:scale-[0.98]'
							>
								{project.appStoreUrl ? 'View on App Store' : 'Visit live project'}
								<ArrowTopRightOnSquareIcon className='w-3.5 h-3.5' />
							</a>
							{project.highlights && project.highlights.length > 0 && (
								<button
									type='button'
									onClick={() => setIsModalOpen(true)}
									className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 bg-[#FAFAF8] hover:bg-stone-100 border border-stone-200/90 transition-colors cursor-pointer active:scale-[0.98]'
									aria-label={`Inspect system architecture for ${project.title}`}
								>
									<CpuChipIcon className='w-4 h-4 text-indigo-600' />
									<span>Architecture &amp; highlights</span>
								</button>
							)}
							{project.githubUrl && (
								<a
									href={project.githubUrl}
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-950 hover:bg-stone-100 transition-colors'
									aria-label={`Source code for ${project.title}`}
								>
									<svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
										<path
											fillRule='evenodd'
											clipRule='evenodd'
											d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
										/>
									</svg>
									<span>Source</span>
								</a>
							)}
						</div>
					</div>
				</article>

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

	return (
		<>
			<article
				className={cn(
					'group relative flex flex-col rounded-2xl bg-white border border-stone-200/90 overflow-hidden shadow-[0_1px_2px_rgba(17,17,16,0.04)]',
					'hover:border-stone-300 hover:shadow-[0_10px_28px_-14px_rgba(17,17,16,0.12)] motion-safe:hover:-translate-y-0.5 transition-[transform,border-color,box-shadow] duration-200'
				)}
			>
				{/* Project Image Header */}
				<div className='relative aspect-[16/10] w-full overflow-hidden bg-[#ECEAE4] border-b border-stone-200/80'>
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

						{/* Subtle Hover Overlay */}
						<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 bg-stone-950/35'>
							<span className='px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-950 bg-white/95 border border-stone-200 flex items-center gap-1.5 shadow-md'>
								{project.appStoreUrl ? 'View on App Store' : 'Visit live project'}
								<ArrowTopRightOnSquareIcon className='w-3.5 h-3.5 text-indigo-600' />
							</span>
						</div>
					</Link>

					{(project.badge || project.category) && (
						<div className='absolute top-3 left-3 z-10 pointer-events-none'>
							<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-white/95 text-stone-800 border border-stone-200/90 shadow-sm backdrop-blur-sm'>
								{project.badge ?? (project.category === 'tools' ? 'System & Tool' : 'Web App')}
							</span>
						</div>
					)}
				</div>

				{/* Card Body */}
				<div className='p-5 sm:p-6 flex-1 flex flex-col justify-between'>
					<div>
						{/* Title & Compact External Links */}
						<div className='flex items-start justify-between gap-2.5 mb-2'>
							<h3 className='text-lg font-semibold text-stone-950 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug'>
								<Link href={project.href} target='_blank' rel='noopener noreferrer'>
									{project.title}
								</Link>
							</h3>
							<div className='flex items-center gap-0.5 shrink-0 -mr-1'>
								{project.githubUrl && (
									<a
										href={project.githubUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='text-stone-400 hover:text-stone-950 transition-colors p-1.5 rounded-full hover:bg-stone-100'
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
									className='text-stone-400 hover:text-indigo-600 transition-colors p-1.5 rounded-full hover:bg-stone-100'
									aria-label={`Visit ${project.title}`}
									title='Open live project'
								>
									<ArrowTopRightOnSquareIcon className='w-4 h-4' />
								</a>
							</div>
						</div>

						{project.metrics && (
							<div className='text-[11px] font-mono text-indigo-600 mb-2.5 flex items-center gap-1.5'>
								<span className='h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0' />
								<span className='truncate'>{project.metrics}</span>
							</div>
						)}

						<p className='text-sm text-stone-600 leading-relaxed mb-5 text-pretty'>
							{project.description}
						</p>
					</div>

					{/* Tech Stack Pills & Architecture Action */}
					<div className='space-y-3.5 pt-3.5 border-t border-stone-200/80'>
						<div className='flex flex-wrap items-center gap-1.5'>
							{displayTags.map((tag) => (
								<span
									key={tag}
									className='text-xs text-stone-600 bg-[#FAFAF8] border border-stone-200/80 px-2.5 py-0.5 rounded-full'
								>
									{tag}
								</span>
							))}
							{remainingCount > 0 && (
								<button
									type='button'
									onClick={() => setIsModalOpen(true)}
									className='text-[11px] font-mono text-stone-500 hover:text-indigo-600 bg-[#FAFAF8] border border-stone-200/80 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer'
								>
									+{remainingCount}
								</button>
							)}
						</div>

						{project.highlights && project.highlights.length > 0 && (
							<button
								type='button'
								onClick={() => setIsModalOpen(true)}
								className='w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-stone-700 hover:text-stone-950 bg-[#FAFAF8] hover:bg-stone-100 border border-stone-200/90 transition-colors cursor-pointer active:scale-[0.98]'
								aria-label={`Inspect system architecture for ${project.title}`}
							>
								<CpuChipIcon className='w-3.5 h-3.5 text-indigo-600' />
								<span>Architecture &amp; highlights</span>
							</button>
						)}
					</div>
				</div>
			</article>

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
