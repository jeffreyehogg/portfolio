'use client'

import { motion } from 'framer-motion'
import { BriefcaseIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { experienceData } from '../../lib/data'

export default function Experience() {
	return (
		<div id='experience' className='py-12 scroll-mt-32 sm:scroll-mt-36'>
			<div className='flex items-center justify-between mb-10'>
				<h3 className='text-2xl font-bold text-white flex items-center gap-3'>
					<BriefcaseIcon className='w-6 h-6 text-indigo-400' />
					Career Experience & Leadership
				</h3>
			</div>

			<div className='space-y-12'>
				{experienceData.map((job, index) => (
					<motion.div
						key={job.company + job.period}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.15, duration: 0.5 }}
						viewport={{ once: true }}
						className='group relative pl-8 sm:pl-10 border-l-2 border-indigo-500/20 hover:border-indigo-500/50 transition-colors duration-300'
					>
						{/* Timeline Dot */}
						<div
							className={`absolute top-1.5 -left-[7px] w-3 h-3 rounded-full ring-4 ring-slate-950 transition-colors duration-300 ${
								job.current
									? 'bg-emerald-400 group-hover:bg-emerald-300'
									: 'bg-indigo-500 group-hover:bg-indigo-400'
							}`}
						/>

						{/* Header Row */}
						<div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3 gap-2'>
							<div>
								<div className='flex items-center gap-2 flex-wrap'>
									<h4 className='text-xl font-bold text-slate-100 group-hover:text-white transition-colors'>
										{job.role}
									</h4>
								</div>
								<div className='text-indigo-400 font-semibold text-base flex items-center gap-2 mt-0.5'>
									<span>{job.company}</span>
									<span className='text-slate-600 text-xs'>•</span>
									<span className='text-xs font-normal text-slate-400 flex items-center gap-1'>
										<MapPinIcon className='w-3.5 h-3.5 text-slate-500' />
										{job.location}
									</span>
								</div>
							</div>

							<span className='text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full w-fit flex items-center gap-2'>
								{job.current && (
									<span className='relative flex h-2 w-2'>
										<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
										<span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-400' />
									</span>
								)}
								{job.period}
							</span>
						</div>

						{/* Role Summary */}
						<p className='text-slate-300 text-sm sm:text-base leading-relaxed mb-4 font-normal'>
							{job.summary}
						</p>

						{/* Bulleted Accomplishments */}
						<ul className='space-y-2.5 mb-5 text-sm text-slate-400'>
							{job.highlights.map((highlight, hIdx) => {
								const [category, ...rest] = highlight.split(': ')
								const detail = rest.join(': ')

								return (
									<li key={hIdx} className='flex items-start gap-2.5 leading-relaxed'>
										<span className='text-indigo-400 text-xs mt-1.5'>▹</span>
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
						<div className='flex flex-wrap gap-2 pt-2'>
							{job.technologies.map((tech) => (
								<span
									key={tech}
									className='text-xs font-mono text-slate-300 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-md'
								>
									{tech}
								</span>
							))}
						</div>
					</motion.div>
				))}
			</div>
		</div>
	)
}
