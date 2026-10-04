'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { projectsData } from '../../lib/data'
import ProjectCard from '../ui/ProjectCard'

export default function FeaturedProjects() {
	const featured = projectsData.filter((p) => p.featured)

	return (
		<section className='relative py-20 sm:py-24 bg-slate-900/40 border-y border-white/[0.06] overflow-hidden'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4'>
					<div>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3'>
							Featured work
						</div>
						<h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
							Selected projects
						</h2>
						<p className='mt-2.5 text-base sm:text-lg text-slate-400 max-w-2xl'>
							Real-world web applications and software tools built for enterprise systems and clients.
						</p>
					</div>

					<Link
						href='/portfolio'
						className='inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group active:scale-[0.98]'
					>
						View all projects
						<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7'>
					{featured.map((project, idx) => (
						<ProjectCard key={project.title} project={project} index={idx} />
					))}
				</div>
			</div>
		</section>
	)
}
