'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { projectsData } from '../../lib/data'

export default function FeaturedProjects() {
	const featured = projectsData.filter((p) => p.featured)

	return (
		<section className='relative py-24 bg-slate-900/50 border-y border-slate-800/80 overflow-hidden'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4'>
					<div>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-3'>
							Featured Engineering Work
						</div>
						<h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
							Production Systems & Applications
						</h2>
						<p className='mt-3 text-base sm:text-lg text-slate-400 max-w-2xl'>
							Real-world software built for enterprise scale, data migration, and modern SaaS.
						</p>
					</div>

					<Link
						href='/portfolio'
						className='inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group'
					>
						View all projects
						<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{featured.map((project, idx) => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.15, duration: 0.5 }}
							className='group relative flex flex-col rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300'
						>
							{/* Project Image */}
							<a
								href={project.href}
								target='_blank'
								rel='noopener noreferrer'
								className='relative h-56 w-full overflow-hidden block bg-slate-950'
							>
								<div className='absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors z-10' />
								<Image
									src={project.imageUrl}
									alt={project.title}
									fill
									className='object-cover transform transition-transform duration-700 group-hover:scale-105'
									sizes='(max-width: 1024px) 100vw, 33vw'
								/>
								{project.metrics && (
									<div className='absolute top-4 left-4 z-20'>
										<span className='px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-md'>
											{project.metrics}
										</span>
									</div>
								)}
							</a>

							{/* Content */}
							<div className='p-6 sm:p-8 flex-1 flex flex-col justify-between'>
								<div>
									<div className='flex items-center justify-between mb-3'>
										<h3 className='text-xl font-bold text-white group-hover:text-indigo-400 transition-colors'>
											<a href={project.href} target='_blank' rel='noopener noreferrer'>
												{project.title}
											</a>
										</h3>
										<a
											href={project.href}
											target='_blank'
											rel='noopener noreferrer'
											className='text-slate-500 hover:text-indigo-400 transition-colors p-1'
											aria-label={`Visit ${project.title}`}
										>
											<ArrowTopRightOnSquareIcon className='w-5 h-5' />
										</a>
									</div>

									<p className='text-slate-400 text-sm leading-relaxed mb-6'>
										{project.description}
									</p>
								</div>

								<div>
									<div className='flex flex-wrap gap-2 pt-4 border-t border-slate-800/80'>
										{project.tags.map((tag) => (
											<span
												key={tag}
												className='text-xs font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full'
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
