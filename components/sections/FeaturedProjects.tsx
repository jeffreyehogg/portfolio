import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { projectsData } from '../../lib/data'
import ProjectCard from '../ui/ProjectCard'

export default function FeaturedProjects() {
	const featured = projectsData.filter((p) => p.featured)
	const [spotlight, ...secondary] = featured

	return (
		<section className='cv-auto relative py-20 sm:py-24 bg-[#F3F2EE] border-b border-stone-200/80'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-4'>
					<div>
						<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-indigo-600 mb-2.5'>
							01 / Selected work
						</div>
						<h2 className='text-3xl sm:text-4xl font-semibold text-stone-950 tracking-[-0.025em]'>
							Featured{' '}
							<span className='font-serif italic font-normal text-indigo-600'>
								projects
							</span>
						</h2>
						<p className='mt-2.5 text-base sm:text-lg text-stone-600 max-w-2xl text-pretty'>
							Production web platforms, native iOS applications, and developer tools built for scale.
						</p>
					</div>

					<Link
						href='/portfolio'
						className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200/90 text-sm font-medium text-stone-800 hover:text-indigo-600 hover:border-indigo-200 transition-colors group active:scale-[0.98] shrink-0 shadow-[0_1px_2px_rgba(17,17,16,0.03)]'
					>
						View all projects
						<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>

				{/* Editorial Spotlight + 2-Column Pair */}
				<div className='space-y-6 sm:space-y-7'>
					{spotlight && (
						<ProjectCard
							project={spotlight}
							index={0}
							variant='spotlight'
							priorityImage
						/>
					)}
					{secondary.length > 0 && (
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7'>
							{secondary.map((project, idx) => (
								<ProjectCard
									key={project.title}
									project={project}
									index={idx + 1}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
