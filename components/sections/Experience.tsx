import { MapPinIcon } from '@heroicons/react/24/outline'
import { experienceData } from '../../lib/data'

export default function Experience() {
	return (
		<div id='experience' className='scroll-mt-28 sm:scroll-mt-32'>
			<div className='mb-8'>
				<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-teal-800 mb-2'>
					02 / Career timeline
				</div>
				<h2 className='text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight'>
					Experience &amp;{' '}
					<span className='font-serif italic font-normal text-teal-800'>
						leadership
					</span>
				</h2>
			</div>

			<div className='space-y-10'>
				{experienceData.map((job) => (
					<div
						key={job.company + job.period}
						className='group relative pl-7 sm:pl-9 border-l border-stone-300/90 hover:border-teal-700/60 transition-colors duration-200'
					>
						{/* Timeline Dot */}
						<div
							className={`absolute top-1.5 -left-[5.5px] w-2.5 h-2.5 rounded-full ring-4 ring-[#FAFAF8] transition-colors duration-200 ${
								job.current
									? 'bg-emerald-600'
									: 'bg-stone-400 group-hover:bg-teal-700'
							}`}
						/>

						{/* Header Row */}
						<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2'>
							<div className='min-w-0'>
								<h3 className='text-lg sm:text-xl font-semibold text-stone-950 tracking-tight'>
									{job.role}
								</h3>
								<div className='text-teal-800 font-medium text-sm sm:text-base flex flex-wrap items-center gap-x-2 gap-y-1 mt-1'>
									<span>{job.company}</span>
									<span className='text-stone-300 text-xs' aria-hidden='true'>•</span>
									<span className='text-xs font-normal text-stone-500 inline-flex items-center gap-1 whitespace-nowrap'>
										<MapPinIcon className='w-3.5 h-3.5 text-stone-400 shrink-0' />
										{job.location}
									</span>
								</div>
							</div>

							<span className='text-[11px] font-mono text-stone-600 bg-white border border-stone-200/90 px-3 py-1 rounded-full w-fit shrink-0 flex items-center gap-2 whitespace-nowrap shadow-[0_1px_2px_rgba(17,17,16,0.03)]'>
								{job.current && (
									<span className='relative flex h-2 w-2'>
										<span className='motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75' />
										<span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-600' />
									</span>
								)}
								{job.period}
							</span>
						</div>

						{/* Role Summary */}
						<p className='text-stone-700 text-sm sm:text-base leading-relaxed mb-4'>
							{job.summary}
						</p>

						{/* Bulleted Accomplishments */}
						<ul className='space-y-2 mb-4 text-xs sm:text-sm text-stone-600'>
							{job.highlights.map((highlight, hIdx) => {
								const [category, ...rest] = highlight.split(': ')
								const detail = rest.join(': ')

								return (
									<li key={hIdx} className='flex items-start gap-2.5 leading-relaxed'>
										<span className='text-teal-700 text-xs mt-1'>—</span>
										<span>
											{detail ? (
												<>
													<strong className='text-stone-900 font-medium'>
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
									className='text-xs text-stone-600 bg-white border border-stone-200/90 px-2.5 py-0.5 rounded-md'
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
