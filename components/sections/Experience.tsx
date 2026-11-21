import { BriefcaseIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { experienceData } from '../../lib/data'

export default function Experience() {
	return (
		<div id='experience' className='py-6 scroll-mt-28 sm:scroll-mt-32'>
			<div className='flex items-center justify-between mb-8'>
				<h3 className='text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5'>
					<BriefcaseIcon className='w-5 h-5 text-indigo-400' />
					Career experience & leadership
				</h3>
			</div>

			<div className='space-y-10'>
				{experienceData.map((job) => (
					<div
						key={job.company + job.period}
						className='group relative pl-7 sm:pl-9 border-l-2 border-indigo-500/20 hover:border-indigo-500/50 transition-colors duration-200'
					>
						{/* Timeline Dot */}
						<div
							className={`absolute top-1.5 -left-[7px] w-3 h-3 rounded-full ring-4 ring-slate-950 transition-colors duration-200 ${
								job.current
									? 'bg-emerald-400 group-hover:bg-emerald-300'
									: 'bg-indigo-500 group-hover:bg-indigo-400'
							}`}
						/>

						{/* Header Row */}
						<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2'>
							<div className='min-w-0'>
								<h4 className='text-lg sm:text-xl font-bold text-slate-100 group-hover:text-white transition-colors tracking-tight'>
									{job.role}
								</h4>
								<div className='text-indigo-400 font-medium text-sm sm:text-base flex flex-wrap items-center gap-x-2 gap-y-1 mt-1'>
									<span>{job.company}</span>
									<span className='text-slate-600 text-xs' aria-hidden='true'>•</span>
									<span className='text-xs font-normal text-slate-400 inline-flex items-center gap-1 whitespace-nowrap'>
										<MapPinIcon className='w-3.5 h-3.5 text-slate-500 shrink-0' />
										{job.location}
									</span>
								</div>
							</div>

							<span className='text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-white/[0.08] px-3 py-1 rounded-full w-fit shrink-0 flex items-center gap-2 whitespace-nowrap'>
								{job.current && (
									<span className='relative flex h-2 w-2'>
										<span className='motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
										<span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-400' />
									</span>
								)}
								{job.period}
							</span>
						</div>

						{/* Role Summary */}
						<p className='text-slate-300 text-sm sm:text-base leading-relaxed mb-4 font-light'>
							{job.summary}
						</p>

						{/* Bulleted Accomplishments */}
						<ul className='space-y-2 mb-4 text-xs sm:text-sm text-slate-400'>
							{job.highlights.map((highlight, hIdx) => {
								const [category, ...rest] = highlight.split(': ')
								const detail = rest.join(': ')

								return (
									<li key={hIdx} className='flex items-start gap-2.5 leading-relaxed'>
										<span className='text-indigo-400 text-xs mt-1'>▹</span>
										<span>
											{detail ? (
												<>
													<strong className='text-slate-200 font-medium'>
														{category}:
													</strong>{' '}
													{detail}
												</>
											) : (
												highlight
											)}
										</span>
									</li>
								)
							})}
						</ul>

						{/* Tech stack badges */}
						<div className='flex flex-wrap gap-1.5 pt-2'>
							{job.technologies.map((tech) => (
								<span
									key={tech}
									className='text-xs text-slate-300 bg-slate-900/80 border border-white/[0.06] px-2.5 py-0.5 rounded-md'
								>
									{tech}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
