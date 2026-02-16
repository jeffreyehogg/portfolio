'use client'

import { motion } from 'framer-motion'
import { BriefcaseIcon } from '@heroicons/react/24/outline'

const experience = [
	{
		company: 'Vision Integrated Systems',
		role: 'Solutions Engineer',
		period: 'Aug 2025 - Present',
		description:
			'Bridging technical execution with business needs. I lead data migrations (Python/SQL) and manage project lifecycles for enterprise systems, ensuring rigorous design specifications are met during commissioning.',
		current: true,
	},
	{
		company: 'Cisco',
		role: 'Software Engineer',
		period: 'Dec 2021 - Jun 2024',
		description:
			'Engineered features for the Webex Control Hub platform using Angular and TypeScript. Focused on enterprise-grade scalability, security, and reducing post-deployment bugs by 30% through comprehensive Cypress testing.',
		current: false,
	},
	{
		company: 'Program Productions / Freelance',
		role: 'Camera Operator & Technical Director',
		period: 'Apr 2012 - Present',
		description:
			'Delivered live, high-pressure broadcasts for major sporting events including the Super Bowl, World Series, and NBA Finals. Directed technical aspects of productions and operated cameras to capture defining moments for millions of viewers.',
		current: true,
	},
]

export default function Experience() {
	return (
		<div className='py-12'>
			<h3 className='text-2xl font-bold text-white mb-10 flex items-center gap-3'>
				<BriefcaseIcon className='w-6 h-6 text-indigo-400' />
				Career Timeline
			</h3>
			<div className='space-y-10'>
				{experience.map((job, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.15 }}
						viewport={{ once: true }}
						className='group relative pl-8 border-l-2 border-indigo-500/20 hover:border-indigo-500/50 transition-colors duration-300'
					>
						{/* Timeline Dot */}
						<div
							className={`absolute top-1 -left-[7px] w-3 h-3 rounded-full ring-4 ring-slate-950 transition-colors duration-300 ${
								job.current
									? 'bg-emerald-500 group-hover:bg-emerald-400'
									: 'bg-indigo-500 group-hover:bg-indigo-400'
							}`}
						/>

						<div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2 gap-2'>
							<div>
								<h4 className='text-lg font-bold text-slate-100 group-hover:text-white transition-colors'>
									{job.role}
								</h4>
								<div className='text-indigo-400 font-medium'>
									{job.company}
								</div>
							</div>
							<span className='text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full w-fit flex items-center gap-2'>
								{job.current && (
									<span className='relative flex h-1.5 w-1.5'>
										<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
										<span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500' />
									</span>
								)}
								{job.period}
							</span>
						</div>
						<p className='text-slate-400 mt-2 max-w-3xl leading-relaxed'>
							{job.description}
						</p>
					</motion.div>
				))}
			</div>
		</div>
	)
}
