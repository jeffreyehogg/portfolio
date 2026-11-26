'use client'

import { useEffect, useId, useRef } from 'react'
import Image from 'next/image'
import {
	XMarkIcon,
	ArrowTopRightOnSquareIcon,
	CpuChipIcon,
	SparklesIcon,
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import type { Project } from '../../lib/data'

interface ProjectModalProps {
	project: Project
	isOpen: boolean
	onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const titleId = useId()

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		if (isOpen && !dialog.open) {
			dialog.showModal()
		} else if (!isOpen && dialog.open) {
			dialog.close()
		}
	}, [isOpen])

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		const handleClose = () => onClose()
		dialog.addEventListener('close', handleClose)

		const handleBackdropClick = (event: MouseEvent) => {
			if ('closedBy' in HTMLDialogElement.prototype) return
			if (event.target !== dialog) return

			const rect = dialog.getBoundingClientRect()
			const isDialogContent =
				rect.top <= event.clientY &&
				event.clientY <= rect.top + rect.height &&
				rect.left <= event.clientX &&
				event.clientX <= rect.left + rect.width

			if (!isDialogContent) {
				dialog.close()
			}
		}

		dialog.addEventListener('click', handleBackdropClick)
		return () => {
			dialog.removeEventListener('close', handleClose)
			dialog.removeEventListener('click', handleBackdropClick)
		}
	}, [onClose])

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			{...({ closedby: 'any' } as any)}
			className='m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl bg-white text-stone-950 border border-stone-200/90 shadow-2xl shadow-stone-950/20 p-0 overflow-hidden focus:outline-none'
		>
			<div className='flex flex-col max-h-[calc(100dvh-2rem)]'>
				{/* Top Preview Header */}
				<div className='relative aspect-[16/8] w-full shrink-0 bg-[#ECEAE4] border-b border-stone-200/80 overflow-hidden'>
					<Image
						src={project.imageUrl}
						alt={project.title}
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, 672px'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent' />

					<div className='absolute top-3.5 inset-x-4 flex items-center justify-between z-10'>
						<span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-white/95 text-stone-800 border border-stone-200/90 shadow-sm backdrop-blur-sm'>
							<CpuChipIcon className='w-3.5 h-3.5 text-teal-800' />
							{project.badge ?? (project.category === 'tools' ? 'System & Developer Tool' : 'Web Application')}
						</span>

						<button
							type='button'
							onClick={() => dialogRef.current?.close()}
							className='p-1.5 rounded-full bg-white/90 text-stone-700 hover:text-stone-950 hover:bg-white border border-stone-200 shadow-sm transition-colors cursor-pointer active:scale-[0.96]'
							aria-label='Close modal'
						>
							<XMarkIcon className='w-4 h-4' />
						</button>
					</div>

					<div className='absolute bottom-3.5 inset-x-5 z-10'>
						<h2 id={titleId} className='text-xl sm:text-2xl font-semibold text-white tracking-tight'>
							{project.title}
						</h2>
					</div>
				</div>

				{/* Modal Body */}
				<div className='p-5 sm:p-6 space-y-5 flex-1 min-h-0 overflow-y-auto'>
					{project.metrics && (
						<div className='flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-50/90 border border-teal-200/80 text-xs font-mono font-medium text-teal-900'>
							<SparklesIcon className='w-4 h-4 text-teal-700 shrink-0' />
							<span>{project.metrics}</span>
						</div>
					)}

					<p className='text-sm sm:text-base text-stone-600 leading-relaxed text-pretty'>
						{project.description}
					</p>

					{project.highlights && project.highlights.length > 0 && (
						<div className='pt-1'>
							<h3 className='font-mono text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-3'>
								System Architecture &amp; Highlights
							</h3>
							<ul className='space-y-2.5'>
								{project.highlights.map((item, idx) => (
									<li
										key={idx}
										className='flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed text-pretty'
									>
										<CheckCircleIcon className='w-4 h-4 text-gblue-600 shrink-0 mt-0.5' />
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					<div className='pt-3 border-t border-stone-200/80'>
						<h3 className='font-mono text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2.5'>
							Technology Stack
						</h3>
						<div className='flex flex-wrap gap-1.5'>
							{project.tags.map((tag) => (
								<span
									key={tag}
									className='text-xs text-stone-700 bg-[#FAFAF8] border border-stone-200/90 px-3 py-1 rounded-full'
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Modal Footer Actions */}
				<div className='shrink-0 px-5 sm:px-6 py-4 bg-[#FAFAF8] border-t border-stone-200/90 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
					<span className='hidden sm:inline text-xs text-stone-500'>
						Press{' '}
						<kbd className='px-1.5 py-0.5 font-mono text-[10px] rounded bg-white border border-stone-200 text-stone-600'>
							ESC
						</kbd>{' '}
						or click outside to close
					</span>

					<div className='flex flex-wrap items-center justify-end gap-2.5 w-full sm:w-auto sm:ml-auto'>
						{project.githubUrl && (
							<a
								href={project.githubUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='flex-1 sm:flex-initial whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 hover:text-stone-950 border border-stone-200/90 transition-colors active:scale-[0.98]'
							>
								<svg className='w-3.5 h-3.5 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
									/>
								</svg>
								Source code
							</a>
						)}
						<a
							href={project.href}
							target='_blank'
							rel='noopener noreferrer'
							className='flex-1 sm:flex-initial whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-xs font-medium text-white bg-stone-950 hover:bg-gblue-600 transition-colors active:scale-[0.98]'
						>
							{project.appStoreUrl ? 'View on App Store' : 'Visit live project'}
							<ArrowTopRightOnSquareIcon className='w-3.5 h-3.5 shrink-0' />
						</a>
					</div>
				</div>
			</div>
		</dialog>
	)
}
