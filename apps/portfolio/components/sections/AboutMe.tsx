'use client'

import Image from 'next/image'
import Link from 'next/link'
import Socials from './Socials'
import Experience from './Experience'
import { skillsData, educationData } from '../../lib/data'
import BackgroundBlobs from '../ui/BackgroundBlobs'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ArrowDownTrayIcon, EnvelopeIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const coreCapabilities = [
	'Modernizing legacy infrastructure to Git & automated CI/CD',
	'Custom Node.js/TypeScript API & middleware engineering',
	'Distributed Microsoft SQL Server & MySQL database tuning (MCP tooling)',
	'Docker containerization, Nginx, and automated SSL/DNS operations',
	'Enterprise frontend architectures (React, Next.js, Angular)',
	'High-velocity delivery using agentic IDE workflows & MCP',
]

export default function AboutMe() {
	const shouldReduce = useReducedMotion()

	return (
		<div className='min-h-screen bg-slate-950 relative overflow-hidden'>
			<div className='absolute inset-0 pointer-events-none opacity-20'>
				<BackgroundBlobs />
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24 relative z-10'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
					{/* Left Column: Bio & Image */}
					<div className='lg:col-span-5 space-y-10 lg:sticky lg:top-36 self-start'>
						{/* Profile Image with Glow */}
						<motion.div
							initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
							animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
							transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
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
							initial={shouldReduce ? false : { opacity: 0, y: 20 }}
							animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
							transition={{ type: 'spring', bounce: 0.2, duration: 0.6, delay: 0.15 }}
						>
							<p className='text-indigo-400 font-semibold tracking-wide uppercase text-xs font-mono mb-2'>
								Engineering Profile
							</p>
							<h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6 text-balance'>
								Built for{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300'>
									Systems & Scale
								</span>
							</h1>

							<div className='space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-light'>
								<p>
									I joined <strong className='text-white font-medium'>LGI Homes</strong> to solve a pivotal engineering challenge: migrating a sprawl of manually deployed, version-control-free codebases on on-premise servers into a disciplined, automated environment. Within months, I containerized the application stack using Docker and Nginx, stood up automated CI/CD pipelines with self-hosted GitHub Runners, and transitioned the engineering workflow to Git for the first time.
								</p>
								<p>
									At the data and middleware layer, I architected custom Node.js and TypeScript integration services to bridge distributed Microsoft SQL Server and MySQL databases with 3rd-party enterprise APIs. By designing dedicated sanitization layers and optimizing high-load stored procedures, I turned fragile, manual synchronization routines into resilient, sub-second pipelines running unattended in production.
								</p>
								<p>
									Prior to LGI Homes, I engineered enterprise administration features for Webex Calling at <strong className='text-white font-medium'>Cisco</strong> within the Cisco Control Hub ecosystem. There, I delivered complex frontend capabilities in TypeScript and Angular, built end-to-end Cypress regression suites in Jenkins, and audited telemetry with Kibana and PagerDuty to safeguard platform uptime across millions of worldwide users.
								</p>
								<p>
									My engineering philosophy is anchored in reducing technical friction. I view technical debt not as an inevitable reality, but as an operational bottleneck to eliminate through containerization, type safety, and automated verification. In my day-to-day work, I leverage <strong className='text-indigo-300 font-medium'>agentic IDE workflows</strong> as collaborative pair programmers—accelerating query profiling, de-risking deep refactors, and maintaining high development velocity.
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

							{/* Actions: Resume & Contact */}
							<div className='mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3'>
								<a
									href='/Jeff_Hogg_Resume.pdf'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5'
								>
									<ArrowDownTrayIcon className='w-4 h-4' />
									Download Resume (PDF)
								</a>
								<Link
									href='/contact'
									className='inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all duration-200 hover:-translate-y-0.5'
								>
									<EnvelopeIcon className='w-4 h-4 text-indigo-400' />
									Get in Touch
								</Link>
							</div>

							<div className='mt-6 pt-6 border-t border-slate-800'>
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
										initial={shouldReduce ? false : { opacity: 0, x: 20 }}
										whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
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

						{/* Education */}
						<div>
							<h3 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
								<AcademicCapIcon className='w-6 h-6 text-indigo-400' />
								Education
							</h3>
							<div className='grid gap-4'>
								{educationData.map((edu, index) => (
									<motion.div
										key={edu.school}
										initial={shouldReduce ? false : { opacity: 0, x: 20 }}
										whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										viewport={{ once: true }}
										className='group bg-slate-900/60 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-sm hover:bg-slate-900/90'
									>
										<h4 className='font-bold text-white text-lg mb-1'>
											{edu.school}
										</h4>
										<p className='text-indigo-300 font-mono text-sm'>
											{edu.degree}
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
