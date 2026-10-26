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

		// Fallback for browsers without native <dialog closedby="any"> support (e.g. Safari)
		// per modern-web-guidance: light-dismiss-a-dialog
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
			className='m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl bg-slate-900/95 text-slate-100 border border-white/[0.1] shadow-2xl shadow-black/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-0 overflow-hidden focus:outline-none'
		>
			{/* Top Preview Header */}
			<div className='relative aspect-[16/8] w-full bg-slate-950 border-b border-white/[0.08] overflow-hidden'>
				<Image
					src={project.imageUrl}
					alt={project.title}
					fill
					className='object-cover opacity-90'
					sizes='(max-width: 768px) 100vw, 672px'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent' />

				{/* Top Bar: Category Badge & Close Button */}
				<div className='absolute top-3.5 inset-x-4 flex items-center justify-between z-10'>
					<span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-950/85 text-indigo-300 border border-white/[0.12] backdrop-blur-md'>
						<CpuChipIcon className='w-3.5 h-3.5 text-indigo-400' />
						{project.category === 'tools' ? 'System & Developer Tool' : 'Web Application'}
					</span>

					<button
						type='button'
						onClick={() => dialogRef.current?.close()}
						className='p-1.5 rounded-full bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-900 border border-white/[0.12] backdrop-blur-md transition-colors cursor-pointer active:scale-[0.96]'
						aria-label='Close modal'
					>
						<XMarkIcon className='w-4 h-4' />
					</button>
				</div>

				{/* Bottom Overlay Title */}
				<div className='absolute bottom-3.5 inset-x-5 z-10'>
					<h2 id={titleId} className='text-xl sm:text-2xl font-bold text-white tracking-tight'>
						{project.title}
					</h2>
				</div>
			</div>

			{/* Modal Body */}
			<div className='p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto'>
				{/* Metrics Telemetry Bar */}
				{project.metrics && (
					<div className='flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-500/[0.08] border border-indigo-500/20 text-xs font-medium text-indigo-200'>
						<SparklesIcon className='w-4 h-4 text-indigo-400 shrink-0' />
						<span>{project.metrics}</span>
					</div>
				)}

				{/* Summary Description */}
				<p className='text-sm sm:text-base text-slate-300 leading-relaxed font-light text-pretty'>
					{project.description}
				</p>

				{/* System Architecture & Highlights */}
				{project.highlights && project.highlights.length > 0 && (
					<div className='pt-1'>
						<h3 className='text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3'>
							System Architecture & Highlights
						</h3>
						<ul className='space-y-2.5'>
							{project.highlights.map((item, idx) => (
								<li
									key={idx}
									className='flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed text-pretty'
								>
									<CheckCircleIcon className='w-4 h-4 text-emerald-400 shrink-0 mt-0.5' />
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				)}

				{/* Complete Tech Stack */}
				<div className='pt-2 border-t border-white/[0.06]'>
					<h3 className='text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5'>
						Technology Stack
					</h3>
					<div className='flex flex-wrap gap-1.5'>
						{project.tags.map((tag) => (
							<span
								key={tag}
								className='text-xs text-slate-200 bg-slate-800/70 border border-white/[0.08] px-2.5 py-1 rounded-lg'
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Modal Footer Actions */}
			<div className='px-5 sm:px-6 py-4 bg-slate-950/70 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3'>
				<button
					type='button'
					onClick={() => dialogRef.current?.close()}
					className='text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer'
				>
					Press ESC or click outside to close
				</button>

				<div className='flex items-center gap-2.5 ml-auto'>
					{project.githubUrl && (
						<a
							href={project.githubUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-white/[0.08] transition-colors active:scale-[0.98]'
						>
							<svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
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
						className='inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/25 transition-colors active:scale-[0.98]'
					>
						Visit live project
						<ArrowTopRightOnSquareIcon className='w-3.5 h-3.5' />
					</a>
				</div>
			</div>
		</dialog>
	)
}
