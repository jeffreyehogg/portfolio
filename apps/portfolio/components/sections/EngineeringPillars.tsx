'use client'

import { motion } from 'framer-motion'
import {
	ServerStackIcon,
	CommandLineIcon,
	CircleStackIcon,
	CpuChipIcon,
	ArrowRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { engineeringPillars } from '../../lib/data'

const iconMap = {
	'devops-cicd': ServerStackIcon,
	'api-middleware': CommandLineIcon,
	'database-systems': CircleStackIcon,
	'agentic-engineering': CpuChipIcon,
}

export default function EngineeringPillars() {
	return (
		<section className='relative py-24 bg-slate-950 overflow-hidden'>
			{/* Background ambient lighting */}
			<div className='absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none' />
			<div className='absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='text-center max-w-3xl mx-auto mb-16'>
					<motion.div
						initial={{ opacity: 0, y: 15 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-4'
					>
						Core Technical Focus
					</motion.div>
					<motion.h2
						initial={{ opacity: 0, y: 15 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'
					>
						Architecting Resilient Systems & Modern Automation
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 15 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className='mt-4 text-base sm:text-lg text-slate-400 leading-relaxed'
					>
						Full-Stack Developer at LGI Homes, bridging web applications,
						distributed database administration, and automated CI/CD DevOps.
					</motion.p>
				</div>

				{/* 4-Pillar Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
					{engineeringPillars.map((pillar, idx) => {
						const Icon = iconMap[pillar.id as keyof typeof iconMap] || ServerStackIcon

						return (
							<motion.div
								key={pillar.id}
								initial={{ opacity: 0, y: 25 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ type: 'spring', bounce: 0.2, duration: 0.6, delay: idx * 0.1 }}
								className='group relative rounded-2xl bg-slate-900/60 border border-slate-800/80 p-7 sm:p-8 backdrop-blur-xl hover:border-indigo-500/40 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between'
							>
								{/* Subtle hover gradient glow */}
								<div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

								<div>
									{/* Terminal Header */}
									<div className='flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80'>
										<div className='flex items-center gap-1.5'>
											<span className='w-2.5 h-2.5 rounded-full bg-rose-500/70' />
											<span className='w-2.5 h-2.5 rounded-full bg-amber-500/70' />
											<span className='w-2.5 h-2.5 rounded-full bg-emerald-500/70' />
											<span className='text-[11px] font-mono text-slate-500 ml-2'>spec/{pillar.id}</span>
										</div>
										<span className='text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20'>
											{pillar.badge}
										</span>
									</div>

									<div className='flex items-center gap-4 mb-4'>
										<div className='p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105 transition-all duration-300'>
											<Icon className='w-6 h-6' />
										</div>
										<h3 className='text-xl font-bold text-white group-hover:text-indigo-200 transition-colors'>
											{pillar.title}
										</h3>
									</div>

									<p className='text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-light'>
										{pillar.description}
									</p>
								</div>

								<div>
									{pillar.stats && (
										<div className='text-xs font-mono text-emerald-400 font-semibold mb-4 flex items-center gap-1.5'>
											<span className='h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse' />
											{pillar.stats}
										</div>
									)}
									<div className='flex flex-wrap gap-2 pt-4 border-t border-slate-800/60'>
										{pillar.technologies.map((tech) => (
											<span
												key={tech}
												className='text-xs font-mono text-slate-300 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/40 group-hover:border-slate-700 transition-colors'
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						)
					})}
				</div>

				{/* CTA to Portfolio and Experience */}
				<div className='mt-12 text-center'>
					<Link
						href='/portfolio'
						className='inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group'
					>
						Explore real-world applications & data systems
						<ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
					</Link>
				</div>
			</div>
		</section>
	)
}
