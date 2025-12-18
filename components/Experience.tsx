'use client'
import { motion } from 'framer-motion'

const experience = [
	{
		company: 'Vision Integrated Systems',
		role: 'Software Engineer',
		period: 'Dec 2021 - Jun 2024',
		logo: '/images/logos/vision.png',
		description:
			'Contributing to the development of the Webex Control Hub enterprise platform. Focusing on scalability, security, and maintaining industry-standard clean code in a large-scale Angular codebase.',
	},
	{
		company: 'Cisco',
		role: 'Software Engineer',
		period: 'Dec 2021 - Jun 2024',
		logo: '/images/logos/cisco.png',
		description:
			'Contributing to the development of the Webex Control Hub enterprise platform. Focusing on scalability, security, and maintaining industry-standard clean code in a large-scale Angular codebase.',
	},
	// Add more roles here if you have them, e.g. "Freelance", "Previous Company"
]

export default function Experience() {
	return (
		<div className='py-12'>
			<h3 className='text-2xl font-bold text-gray-900 mb-8'>
				Professional Experience
			</h3>
			<div className='space-y-8'>
				{experience.map((job, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.2 }}
						className='relative pl-8 border-l-2 border-indigo-100'
					>
						{/* Timeline Dot */}
						<div className='absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white' />

						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2'>
							<div>
								<h4 className='text-lg font-bold text-gray-900'>{job.role}</h4>
								<div className='text-indigo-600 font-medium'>{job.company}</div>
							</div>
							<span className='text-sm text-gray-500 mt-1 sm:mt-0 bg-gray-100 px-3 py-1 rounded-full w-fit'>
								{job.period}
							</span>
						</div>
						<p className='text-gray-600 mt-2 max-w-3xl leading-relaxed'>
							{job.description}
						</p>
					</motion.div>
				))}
			</div>
		</div>
	)
}
