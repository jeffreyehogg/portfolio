'use client'

import Image from 'next/image'
import Socials from './Socials'
import Experience from './Experience'
import { skillsData } from '../../lib/data'
import BackgroundBlobs from '../ui/BackgroundBlobs'
import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const coreCapabilities = [
	'Modernizing legacy infrastructure to Git & automated CI/CD',
	'Custom Node.js/TypeScript API & middleware engineering',
	'Distributed Microsoft SQL Server & MySQL database tuning',
	'Docker containerization, Nginx, and cloud operations',
	'Enterprise frontend architectures (React, Next.js, Angular)',
	'High-velocity delivery using agentic IDE workflows',
]

export default function AboutMe() {
	return (
		<div className='min-h-screen bg-slate-950 relative overflow-hidden'>
			<div className='absolute inset-0 pointer-events-none opacity-20'>
				<BackgroundBlobs />
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
					{/* Left Column: Bio & Image */}
					<div className='lg:col-span-5 space-y-10'>
						{/* Profile Image with Glow */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6 }}
							className='relative w-64 h-64 mx-auto lg:mx-0'
						>
							<div className='absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-2xl opacity-25' />
							<Image
								className='relative rounded-2xl shadow-2xl object-cover border-2 border-slate-800'
								fill
								src='/images/headshots/me.jpg'
								alt='Jeff Hogg headshot'
								sizes='256px'
								priority
							/>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							<h2 className='text-indigo-400 font-semibold tracking-wide uppercase text-xs font-mono mb-2'>
								Engineering Profile
							</h2>
							<h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6 text-balance'>
								Built for{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300'>
									Systems & Scale
								</span>
							</h1>

							<div className='space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-light'>
								<p>
									As a <strong className='text-white font-medium'>Full-Stack Developer</strong>,
									I specialize in modernizing legacy architectures, building robust API
									layers, and driving end-to-end system automation.
								</p>
								<p>
									Currently, I operate as the <strong className='text-white font-medium'>solo technical lead at LGI Homes</strong>,
									bridging the gap between full-stack development, database administration,
									and DevOps. In this role, I wear multiple hats: from containerizing
									environments with Docker/Nginx and writing custom Node.js/TypeScript
									middleware to managing distributed on-premise Microsoft SQL Server and
									MySQL databases.
								</p>
								<p>
									My foundation includes over a decade in high-pressure technical roles,
									including engineering enterprise features for Webex Calling at <strong className='text-white font-medium'>Cisco</strong>,
									building automated Cypress E2E pipelines in Jenkins, and managing platform
									reliability through Kibana and PagerDuty.
								</p>
								<p>
									I actively leverage <strong className='text-indigo-300 font-medium'>agentic IDE workflows</strong> to
									accelerate stored procedure optimization, complex query debugging, and code
									refactoring—delivering clarity, reliability, and modern technical excellence.
								</p>
							</div>

							{/* Core Capabilities Checklist */}
							<div className='mt-8 pt-6 border-t border-slate-800/80'>
								<h3 className='text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 font-semibold'>
									Key Competencies
								</h3>
								<ul className='space-y-2.5'>
									{coreCapabilities.map((item) => (
										<li key={item} className='flex items-start gap-2.5 text-sm text-slate-300'>
											<CheckCircleIcon className='w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5' />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>

							<div className='mt-8 pt-6 border-t border-slate-800'>
								<Socials />
							</div>
						</motion.div>
					</div>

					{/* Right Column: Experience & Skills */}
					<div className='lg:col-span-7 space-y-16'>
						<Experience />

						<div>
							<h3 className='text-2xl font-bold text-white mb-8'>
								Technical Stack & Tooling
							</h3>
							<div className='grid gap-4'>
								{skillsData.map((skill, index) => (
									<motion.div
										key={skill.category}
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										viewport={{ once: true }}
										className='group bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-sm hover:bg-slate-900/90'
									>
										<h4 className='font-semibold text-indigo-300 mb-2 text-sm uppercase tracking-wider font-mono'>
											{skill.category}
										</h4>
										<p className='text-slate-300 leading-relaxed font-mono text-sm'>
											{skill.list}
										</p>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
