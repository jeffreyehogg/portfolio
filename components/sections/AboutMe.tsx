'use client'

import Image from 'next/image'
import Socials from './Socials'
import Experience from './Experience'
import { skillsData } from '../../lib/data'
import BackgroundBlobs from '../ui/BackgroundBlobs'
import { motion } from 'framer-motion'

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
							<div className='absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-30' />
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
							<h2 className='text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-2'>
								My Story
							</h2>
							<h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6 text-balance'>
								Engineered for{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300'>
									High Performance
								</span>
							</h1>

							<div className='space-y-6 text-lg text-slate-400 leading-relaxed'>
								<p>
									I am a Software Engineer and Solutions Lead who specializes in
									translating complex requirements into reliable, scalable code.
									My expertise spans full-stack development (TypeScript,
									Angular, React) and enterprise data migration (Python, SQL).
								</p>
								<p>
									But my understanding of &ldquo;mission-critical&rdquo;
									didn&apos;t start in a terminal.
								</p>
								<p>
									For over a decade, I worked as a Camera Operator and Technical
									Director for major networks, bringing the
									<span className='text-indigo-200'> World Series</span>,
									<span className='text-indigo-200'> Super Bowl</span>, and
									<span className='text-indigo-200'> NBA Finals</span> to
									millions of viewers live.
								</p>
								<p>
									Whether I&apos;m refactoring a codebase at Cisco or framing a
									live shot for ESPN, my goal is always the same:
									<strong className='text-white font-semibold'>
										{' '}
										clarity, reliability, and excellence.
									</strong>
								</p>
							</div>

							<div className='mt-8 pt-8 border-t border-slate-800'>
								<Socials />
							</div>
						</motion.div>
					</div>

					{/* Right Column: Experience & Skills */}
					<div className='lg:col-span-7 space-y-16'>
						<Experience />

						<div>
							<h3 className='text-2xl font-bold text-white mb-8'>
								Technical Arsenal
							</h3>
							<div className='grid gap-4'>
								{skillsData.map((skill, index) => (
									<motion.div
										key={skill.category}
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										viewport={{ once: true }}
										className='group bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-slate-900/80'
									>
										<h4 className='font-semibold text-indigo-300 mb-3 text-sm uppercase tracking-wider'>
											{skill.category}
										</h4>
										<p className='text-slate-400 leading-relaxed font-mono text-sm'>
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
