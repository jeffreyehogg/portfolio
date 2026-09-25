'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { projectsData } from '../../lib/data'
import ProjectCard from '../ui/ProjectCard'

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
						<ProjectCard key={project.title} project={project} index={idx} />
					))}
				</div>
			</div>
		</section>
	)
}
