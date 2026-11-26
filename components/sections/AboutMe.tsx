'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Socials from './Socials'
import Experience from './Experience'
import { skillsData, educationData } from '../../lib/data'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
	ArrowDownTrayIcon,
	EnvelopeIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from '@heroicons/react/24/outline'

const coreCapabilities = [
	'Full-stack web apps (TypeScript, Angular, React, Next.js, Node.js)',
	'Native iOS applications (Swift 6, SwiftUI, SwiftData)',
	'REST APIs, backend services & third-party integrations (TypeScript, Python)',
	'Relational databases & SQL (MS SQL Server, MySQL, PostgreSQL)',
	'Automated deployments & tooling (GitHub Actions, Docker, Nginx, Vercel)',
	'Custom Claude MCP extensions, connectors & AI developer workflows',
]

export default function AboutMe() {
	const [showExtendedBio, setShowExtendedBio] = useState(false)

	return (
		<div className='w-full min-h-screen bg-[#FAFAF8] relative overflow-x-clip'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16'>
					{/* Left Column: Sticky Profile & Bio */}
					<div className='lg:col-span-5 space-y-8 lg:sticky lg:top-28 self-start'>
						<div className='relative w-44 h-44 sm:w-52 sm:h-52 mx-auto lg:mx-0 animate-fade-up'>
							<Image
								className='rounded-2xl shadow-[0_8px_28px_-12px_rgba(17,17,16,0.2)] object-cover border border-stone-200/90'
								fill
								src='/images/headshots/me.jpg'
								alt='Jeff Hogg headshot'
								sizes='208px'
								priority
								fetchPriority='high'
							/>
						</div>

						<div className='animate-fade-up animation-delay-100'>
							<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-gblue-600 mb-2.5'>
								01 / Profile
							</div>
							<h1 className='text-3xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-4xl mb-4 text-balance'>
								Building software for{' '}
								<span className='font-serif italic font-normal text-gblue-600'>
									web &amp; iOS.
								</span>
							</h1>

							{/* Scannable Executive Summary */}
							<div className='space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed'>
								<p>
									Software Engineer at{' '}
									<strong className='text-stone-950 font-semibold'>
										TWFG Insurance (The Woodlands Financial Group)
									</strong>
									, building internal web applications and backend services with Angular, TypeScript, and Python. Previously at{' '}
									<strong className='text-stone-950 font-semibold'>LGI Homes</strong> as{' '}
									<strong className='text-stone-950 font-semibold'>
										Web &amp; Data Administrator
									</strong>
									, where I modernized internal web apps, built Node.js/TypeScript API integrations, and worked with MS SQL Server and MySQL.
								</p>
								<p>
									Earlier, engineered enterprise administration features for Webex Calling at{' '}
									<strong className='text-stone-950 font-semibold'>Cisco</strong> (Control Hub) with TypeScript, Angular, and Cypress end-to-end suites. Outside of work, I build native Swift iOS apps like{' '}
									<strong className='text-stone-950 font-semibold'>Aura</strong>,{' '}
									<strong className='text-stone-950 font-semibold'>Tend</strong>, and{' '}
									<strong className='text-stone-950 font-semibold'>AlgoQuest</strong>, and shoot live pro sports broadcasts.
								</p>

								{/* Progressive Disclosure */}
								<div className='pt-1'>
									<button
										type='button'
										onClick={() => setShowExtendedBio(!showExtendedBio)}
										className='inline-flex items-center gap-1.5 text-xs font-medium text-gblue-600 hover:text-stone-950 transition-colors py-1 cursor-pointer active:scale-[0.98]'
										aria-expanded={showExtendedBio}
									>
										<span>
											{showExtendedBio
												? 'Hide detailed background'
												: 'Show full engineering background'}
										</span>
										{showExtendedBio ? (
											<ChevronUpIcon className='w-3.5 h-3.5' />
										) : (
											<ChevronDownIcon className='w-3.5 h-3.5' />
										)}
									</button>

									{showExtendedBio && (
										<div className='mt-3 space-y-3.5 text-xs sm:text-sm text-stone-600 border-l-2 border-gblue-600/30 pl-4 animate-fade-up'>
											<p>
												At LGI Homes, migrated manually deployed on-premise servers into a disciplined, automated Git workflow. Containerized core applications with Docker and automated SSL/DNS routing, eliminating deployment downtime.
											</p>
											<p>
												Designed custom Node.js and TypeScript integration services to bridge distributed MS SQL Server and MySQL databases with third-party enterprise APIs, implementing schema sanitization and profiling stored procedures.
											</p>
											<p>
												My engineering approach leverages agentic IDE workflows and Model Context Protocol (MCP) tooling as collaborative pair programmers—accelerating query profiling, de-risking deep refactors, and maintaining high delivery velocity.
											</p>
										</div>
									)}
								</div>
							</div>

							{/* Core Capabilities Checklist */}
							<div className='mt-7 pt-6 border-t border-stone-200/90'>
								<h3 className='font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500 mb-3.5'>
									Key competencies
								</h3>
								<ul className='space-y-2.5'>
									{coreCapabilities.map((item) => (
										<li
											key={item}
											className='flex items-start gap-2.5 text-xs sm:text-sm text-stone-700'
										>
											<CheckCircleIcon className='w-4 h-4 text-gblue-600 flex-shrink-0 mt-0.5' />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>

							{/* Actions: Resume & Contact */}
							<div className='mt-7 pt-6 border-t border-stone-200/90 flex flex-col sm:flex-row gap-3'>
								<a
									href='/Jeff_Hogg_Resume.pdf'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-white bg-stone-950 hover:bg-gblue-600 active:scale-[0.98] shadow-sm transition-colors duration-200'
								>
									<ArrowDownTrayIcon className='w-4 h-4' />
									Download resume (PDF)
								</a>
								<Link
									href='/contact'
									className='inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-stone-700 bg-white border border-stone-300/90 hover:bg-stone-100 hover:border-stone-400 hover:text-stone-950 active:scale-[0.98] transition-colors duration-200'
								>
									<EnvelopeIcon className='w-4 h-4 text-gblue-600' />
									Get in touch
								</Link>
							</div>

							<div className='mt-6 pt-5 border-t border-stone-200/80'>
								<Socials />
							</div>
						</div>
					</div>

					{/* Right Column: Experience, Skills & Education */}
					<div className='lg:col-span-7 space-y-14 sm:space-y-16'>
						<Experience />

						{/* Skills Section */}
						<div className='pt-10 border-t border-stone-200/90'>
							<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-gblue-600 mb-2'>
								03 / Technical stack
							</div>
							<h3 className='text-2xl font-semibold text-stone-950 tracking-tight mb-6'>
								Languages, databases &amp;{' '}
								<span className='font-serif italic font-normal text-gblue-600'>
									tooling
								</span>
							</h3>
							<div className='grid gap-3.5'>
								{skillsData.map((skill) => (
									<div
										key={skill.category}
										className='bg-white p-5 rounded-2xl border border-stone-200/90 hover:border-stone-300 transition-colors duration-200 shadow-[0_1px_2px_rgba(17,17,16,0.03)]'
									>
										<h4 className='font-mono text-xs uppercase tracking-wider text-gblue-600 mb-1.5'>
											{skill.category}
										</h4>
										<p className='text-stone-700 leading-relaxed text-sm'>
											{skill.list}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Education */}
						<div className='pt-10 border-t border-stone-200/90'>
							<div className='font-mono text-[11px] uppercase tracking-[0.16em] text-gblue-600 mb-2'>
								04 / Education
							</div>
							<h3 className='text-2xl font-semibold text-stone-950 tracking-tight mb-6'>
								Academic{' '}
								<span className='font-serif italic font-normal text-gblue-600'>
									background
								</span>
							</h3>
							<div className='grid gap-3.5'>
								{educationData.map((edu) => (
									<div
										key={edu.school}
										className='bg-white p-5 rounded-2xl border border-stone-200/90 hover:border-stone-300 transition-colors duration-200 shadow-[0_1px_2px_rgba(17,17,16,0.03)]'
									>
										<h4 className='font-semibold text-stone-950 text-base mb-1'>
											{edu.school}
										</h4>
										<p className='text-stone-600 text-sm'>
											{edu.degree}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
