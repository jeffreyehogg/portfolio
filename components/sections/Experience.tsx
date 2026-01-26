'use client'
import { motion } from 'framer-motion'

const experience = [
	{
		company: 'Vision Integrated Systems',
		role: 'Solutions Engineer',
		period: 'Aug 2025 - Present',
		logo: '/images/logos/vision.png',
		description:
			'Bridging technical execution with business needs. I lead data migrations (Python/SQL) and manage project lifecycles for enterprise systems, ensuring rigorous design specifications are met during commissioning.',
	},
	{
		company: 'Cisco',
		role: 'Software Engineer',
		period: 'Dec 2021 - Jun 2024',
		logo: '/images/logos/cisco.png',
		description:
			'Engineered features for the Webex Control Hub platform using Angular and TypeScript. Focused on enterprise-grade scalability, security, and reducing post-deployment bugs by 30% through comprehensive Cypress testing.',
	},
	{
		company: 'Program Productions / Freelance',
		role: 'Camera Operator & Technical Director',
		period: 'Apr 2012 - Dec 2022',
		logo: '/images/logos/nfl.png', // You might want to add a generic broadcast logo or specific network logo
		description:
			'Delivered live, high-pressure broadcasts for major sporting events including the Super Bowl, World Series, and NBA Finals. Directed technical aspects of productions and operated cameras to capture defining moments for millions of viewers.',
	},
]

export default function Experience() {
	return (
		<div className='py-12'>
			<h3 className='text-2xl font-bold text-white mb-8'>Career Timeline</h3>
			<div className='space-y-12'>
				{experience.map((job, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.1 }}
						className='relative pl-8 border-l border-indigo-500/30'
					>
						{/* Timeline Dot */}
						<div className='absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-slate-950' />

						<div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2'>
							<div>
								<h4 className='text-lg font-bold text-slate-100'>{job.role}</h4>
								<div className='text-indigo-400 font-medium'>{job.company}</div>
							</div>
							<span className='text-xs font-mono text-slate-500 mt-1 sm:mt-0 bg-slate-900 border border-slate-800 px-2 py-1 rounded'>
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
