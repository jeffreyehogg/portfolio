'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Socials from './Socials'
import Experience from './Experience'
import { skillsData, educationData } from '../../lib/data'
import BackgroundBlobs from '../ui/BackgroundBlobs'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
	ArrowDownTrayIcon,
	EnvelopeIcon,
	AcademicCapIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'

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
	const [showExtendedBio, setShowExtendedBio] = useState(false)

	return (
		<div className='min-h-screen bg-slate-950 relative overflow-hidden'>
			<div className='absolute inset-0 pointer-events-none opacity-20'>
				<BackgroundBlobs />
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 relative z-10'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16'>
					{/* Left Column: Bio & Image */}
					<div className='lg:col-span-5 space-y-8 lg:sticky lg:top-32 self-start'>
						{/* Profile Image with Glow */}
						<motion.div
							initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
							animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
							transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
							className='relative w-48 h-48 sm:w-56 sm:h-56 mx-auto lg:mx-0'
						>
							<div className='absolute -inset-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-xl opacity-20' />
							<Image
								className='relative rounded-2xl shadow-xl object-cover border border-white/[0.1]'
								fill
								src='/images/headshots/me.jpg'
								alt='Jeff Hogg headshot'
								sizes='224px'
								priority
							/>
						</motion.div>

						<motion.div
							initial={shouldReduce ? false : { opacity: 0, y: 15 }}
							animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
							transition={{ type: 'spring', bounce: 0.2, duration: 0.5, delay: 0.1 }}
						>
							<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3'>
								Engineering profile
							</div>
							<h1 className='text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-4 text-balance'>
								Built for{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-300'>
									systems & scale
								</span>
							</h1>

							{/* Scannable Executive Summary */}
							<div className='space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-light'>
								<p>
									Full-stack developer at <strong className='text-white font-medium'>LGI Homes</strong>, leading legacy infrastructure modernization, Docker/Nginx containerization, automated GitHub Actions CI/CD pipelines, and high-throughput Node.js/TypeScript middleware for distributed MS SQL Server and MySQL databases.
								</p>
								<p>
									Previously engineered enterprise administration features for Webex Calling at <strong className='text-white font-medium'>Cisco</strong> (Control Hub) with TypeScript, Angular, and Cypress end-to-end regression suites.
								</p>

								{/* Progressive Disclosure: Deep Architectural Details */}
								<div className='pt-1'>
									<button
										type='button'
										onClick={() => setShowExtendedBio(!showExtendedBio)}
										className='inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-1 cursor-pointer active:scale-[0.98]'
										aria-expanded={showExtendedBio}
									>
										<span>{showExtendedBio ? 'Hide detailed background' : 'Show full engineering background'}</span>
										{showExtendedBio ? (
											<ChevronUpIcon className='w-3.5 h-3.5' />
										) : (
											<ChevronDownIcon className='w-3.5 h-3.5' />
										)}
									</button>

									<AnimatePresence>
										{showExtendedBio && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: 'auto' }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.3 }}
												className='overflow-hidden mt-3 space-y-3.5 text-xs sm:text-sm text-slate-400 border-l-2 border-indigo-500/30 pl-3.5'
											>
												<p>
													At LGI Homes, migrated manually deployed on-premise servers into a disciplined, automated Git workflow. Containerized core applications with Docker and automated SSL/DNS routing, eliminating deployment downtime.
												</p>
												<p>
													Designed custom Node.js and TypeScript integration services to bridge distributed MS SQL Server and MySQL databases with third-party enterprise APIs, implementing schema sanitization and profiling stored procedures.
												</p>
												<p>
													My engineering approach leverages agentic IDE workflows and Model Context Protocol (MCP) tooling as collaborative pair programmers—accelerating query profiling, de-risking deep refactors, and maintaining high delivery velocity.
												</p>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>

							{/* Core Capabilities Checklist */}
							<div className='mt-7 pt-6 border-t border-white/[0.08]'>
								<h3 className='text-xs font-semibold text-slate-300 mb-3.5'>
									Key competencies
								</h3>
								<ul className='space-y-2.5'>
									{coreCapabilities.map((item) => (
										<li key={item} className='flex items-start gap-2.5 text-xs sm:text-sm text-slate-300'>
											<CheckCircleIcon className='w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5' />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Actions: Resume & Contact */}
							<div className='mt-7 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3'>
								<a
									href='/Jeff_Hogg_Resume.pdf'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] shadow-sm transition-all duration-200'
								>
									<ArrowDownTrayIcon className='w-4 h-4' />
									Download resume (PDF)
								</a>
								<Link
									href='/contact'
									className='inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 bg-slate-900/80 border border-white/[0.08] hover:bg-slate-800 hover:text-white active:scale-[0.98] transition-all duration-200'
								>
									<EnvelopeIcon className='w-4 h-4 text-indigo-400' />
									Get in touch
								</Link>
							</div>

							<div className='mt-6 pt-5 border-t border-white/[0.06]'>
								<Socials />
							</div>
						</motion.div>
					</div>

					{/* Right Column: Experience & Skills */}
					<div className='lg:col-span-7 space-y-12 sm:space-y-14'>
						<Experience />

						{/* Skills Section */}
						<div>
							<h3 className='text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2.5'>
								<WrenchScrewdriverIcon className='w-5 h-5 text-indigo-400' />
								Technical stack & tooling
							</h3>
							<div className='grid gap-3.5'>
								{skillsData.map((skill, index) => (
									<motion.div
										key={skill.category}
										initial={shouldReduce ? false : { opacity: 0, x: 15 }}
										whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
										transition={{ delay: index * 0.08 }}
										viewport={{ once: true }}
										className='group bg-slate-900/60 p-5 rounded-2xl border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-200 backdrop-blur-sm hover:bg-slate-900/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]'
									>
										<h4 className='font-semibold text-indigo-300 mb-1.5 text-sm'>
											{skill.category}
										</h4>
										<p className='text-slate-300 leading-relaxed text-sm font-light'>
											{skill.list}
										</p>
									</motion.div>
								))}
							</div>
						</div>

						{/* Education */}
						<div>
							<h3 className='text-xl sm:text-2xl font-bold text-white mb-5 flex items-center gap-2.5'>
								<AcademicCapIcon className='w-5 h-5 text-indigo-400' />
								Education
							</h3>
							<div className='grid gap-3.5'>
								{educationData.map((edu, index) => (
									<motion.div
										key={edu.school}
										initial={shouldReduce ? false : { opacity: 0, x: 15 }}
										whileInView={shouldReduce ? undefined : { opacity: 1, x: 0 }}
										transition={{ delay: index * 0.08 }}
										viewport={{ once: true }}
										className='group bg-slate-900/60 p-5 rounded-2xl border border-white/[0.08] hover:border-indigo-500/30 transition-all duration-200 backdrop-blur-sm hover:bg-slate-900/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]'
									>
										<h4 className='font-bold text-white text-base mb-1'>
											{edu.school}
										</h4>
										<p className='text-indigo-300 text-sm'>
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
